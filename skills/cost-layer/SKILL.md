# SKILL — cost-layer v2.0
_UNRLVL-OPS · Costo real desde el ledger · Tarifas con procedencia · Guardián de vencimientos_
_Versión: 2.0 · 2026-07-30 (M-6). Reescritura completa de v1.0 — ver [ARCHIVE_v1.md](ARCHIVE_v1.md)._

---

## REGLA CERO — DE DÓNDE SALE UN PRECIO

**Ninguna tarifa vive en este skill, ni en el código, ni en un ejemplo. La ÚNICA fuente de precio es la tabla `ops_lab_rates`, resuelta por la función `ops_resolve_rate`.** Si necesitás saber cuánto cuesta un `(lab, model_id, unit_type)` a una fecha, se lo preguntás a la función — nunca lo escribís.

```sql
-- La tarifa vigente a una fecha (composite: rate_usd, rate_id, effective_from):
SELECT public.ops_resolve_rate(NULL, 'claude-sonnet-5', 'tokens_in', CURRENT_DATE);
-- p_lab NULL = tarifa genérica; un lab concreto resuelve la específica si existe (ver precedencia).
```

> v1 de este skill tenía una tabla de precios de Sonnet 4.6 / Opus / Haiku hardcodeada y todos sus ejemplos usaban `claude-sonnet-4-6` con números literales. Ese literal ERA el bug: se propagaba a cada sesión que cargaba el skill. Está archivado en [ARCHIVE_v1.md](ARCHIVE_v1.md) — obsoleto, no es fuente de nada.

---

## SECCIÓN 1 — TARIFA vs. CATÁLOGO (cambió en M-4)

Son **dos cosas distintas** desde M-4:

| | Tabla | Qué es | Se usa para |
|---|---|---|---|
| **Tarifa** (precio) | `ops_lab_rates` | Precio por `(lab, model_id, unit_type)` con vigencia | Calcular costo. **Única fuente.** |
| **Catálogo** (descriptivo) | `ops_model_pricing` | Nombre legible, `tier`, `context_window`, notas | Mostrar/elegir modelo. **NO es fuente de precio.** |

`ops_model_pricing` describe el modelo (que Claude Sonnet 5 es `balanced`, ventana 1M, etc.). No lo consultes para cobrar: sus columnas de precio son referencia descriptiva, la tarifa facturable sale de `ops_lab_rates`.

### Precedencia: lab-específico > genérico

`ops_resolve_rate` resuelve la fila **más específica**: si hay una tarifa para el `lab` exacto la usa; si no, cae a la **genérica** (`lab IS NULL`). Es el mismo idioma que `intel.watcher_rules` (brand > sector > gen).

**Por qué:** Anthropic factura **por modelo**, no por nuestro lab interno. El `lab` es nuestro eje de *atribución* de costo, no un eje de precio de Anthropic. Por eso la fila genérica (`lab IS NULL`) de un modelo aplica a copylab, aife, sociallab, watcher por igual — todos pagan el mismo precio de Anthropic por Sonnet 5. Una fila lab-específica sólo existe cuando ese lab tiene un precio propio real (p. ej. un proveedor distinto, como `imagelab/gemini`).

---

## SECCIÓN 2 — PROCEDENCIA DEL COSTO: `rate_source`, `UNSEEDED`, `NULL`

Cada asiento del ledger (`ops_generation_ledger`) congela **su** tarifa y de dónde salió, en `rate_source`:

| `rate_source` | Significa | Auditable |
|---|---|---|
| `ops_lab_rates:<uuid>[+<uuid>]` | Costo derivado de esa(s) fila(s) de tarifa, congeladas al momento del asiento | **Sí** — el uuid apunta a la tarifa exacta |
| `UNSEEDED` | No había tarifa vigente para ese `(lab, model, unit_type, fecha)` → costo 0, a la espera de sembrar la tarifa | **Sí** — estado explícito, no un agujero |
| `NULL` | Fila **anterior a M-4** (antes de que existiera el congelado de tarifa) | **No.** No se rellena nunca con supuestos. |

**`NULL` ≠ `UNSEEDED`.** Un asiento pre-M-4 con `rate_source NULL` no es auditable y **jamás** se completa con una tarifa inferida — su costo se calculó con la lógica vieja y así queda. `UNSEEDED` es un estado nuevo y deliberado: "faltó tarifa, lo dejamos en 0 y visible". El tablero cuenta ambos como "filas sin tarifa" para no mentir en el total.

---

## SECCIÓN 3 — CICLO DE VIDA DE UNA TARIFA (M-6, guardián)

`ops_lab_rates.status ∈ {vigente, previsto, historico}` + `effective_from` + `valid_to` + `auto_promote`.

- **`vigente`** (`active=true`): la que cobra hoy. `valid_to IS NULL` = no vence; una fecha = vence ese día.
- **`previsto`** (`active=false`): la que entra en el futuro (`effective_from` futuro). No cobra todavía.
- **`historico`**: ya venció; se conserva por trazabilidad.

### El guardián: `ops_promote_rates()` + cron diario

Una función `SECURITY DEFINER` corre por cron a las **06:00 UTC** (`SELECT public.ops_promote_rates();`) y, por cada `(lab, model_id, unit_type)`:
1. archiva a `historico` toda `vigente` cuyo `valid_to < hoy`;
2. promueve a `vigente`+`active=true` toda `previsto` con `effective_from <= hoy` **y `auto_promote=true`**.

`auto_promote` es el discriminador explícito: una fila `previsto` con `auto_promote=false` **nunca** se promueve sola aunque su fecha ya pasó (caso `gemini-2.5-flash-image tokens_out`, congelada hasta confirmar facturación por token). Es idempotente: correrla dos veces el mismo día no cambia nada. Cada transición escribe en `ops_rate_transitions` (auditoría: `rate_id, de_status, a_status, at`).

### La alerta preventiva: `v_rate_gaps` (+ alerta "vence sin reemplazo")

`v_rate_gaps` (creada en M-7) lista toda tarifa `vigente` con `valid_to` no nulo, sus `dias_para_vencer` y si `tiene_reemplazo_previsto`. El guard a vigilar es la fila que **vence pronto y NO tiene reemplazo**:

```sql
-- Tarifas que vencen en <14 días SIN previsto que las reemplace (hoy: vacío = sano):
SELECT * FROM public.v_rate_gaps
WHERE dias_para_vencer < 14 AND NOT tiene_reemplazo_previsto
ORDER BY dias_para_vencer;
```

Por qué existe: el 2026-08-31 vence el introductorio de Sonnet 5 y su `previsto` de reemplazo estaba `active=false`; sin guardián, el 1-sep `ops_resolve_rate` habría devuelto NULL para los cuatro labs de texto → todo `UNSEEDED`, costo 0. Con `ops_promote_rates` + esta alerta, el vencimiento se ve venir y se promueve solo.

---

## SECCIÓN 4 — DÓNDE VIVE EL COSTO REAL: EL LEDGER Y SUS VISTAS

El costo real de generación está en `ops_generation_ledger`, expuesto por vistas M-4 (no en `ops_token_sessions`, que es sólo el registro manual). Cada vista trae **`cost_actual`** y **`cost_projected`** (proyectado con la tarifa `previsto`) donde aplica, y una señal de tarifa incierta.

```sql
-- Costo por marca/lab este mes (asiento real del ledger):
SELECT brand_id, lab, model_id, unit_type, status,
       cost_actual, cost_projected, rate_source
FROM public.v_cost_unified
WHERE period_month = DATE_TRUNC('month', CURRENT_DATE)::date
ORDER BY cost_actual DESC;

-- Embudo por marca: costo por PIEZA PUBLICADA con el denominador visible.
-- Un costo/publicada sin la tasa de PASS al lado engaña:
SELECT brand_id, domain,
       piezas_intentadas, aprobados, rechazados, pass_pct,
       costo_total, costo_por_publicada, contiene_tarifa_incierta
FROM public.v_iid_funnel
WHERE period_month = DATE_TRUNC('month', CURRENT_DATE)::date
ORDER BY costo_total DESC NULLS LAST;

-- Por pieza: generación (Builder/labs) vs juicio (Watcher, stage propio):
SELECT brand_id, platform, veredicto, corte,
       cost_generacion, cost_juicio, cost_total, tarifa_incierta
FROM public.v_iid_piece_cost
WHERE period_month = DATE_TRUNC('month', CURRENT_DATE)::date
ORDER BY cost_total DESC NULLS LAST;

-- Eficiencia por modelo: actual vs proyectado + filas sin tarifa:
SELECT model_id, model_name, tier, lab, brand_id,
       total_calls, total_cost_usd, projected_cost_usd, filas_sin_tarifa
FROM public.v_model_efficiency
WHERE period_month = DATE_TRUNC('month', CURRENT_DATE)::date
ORDER BY total_cost_usd DESC NULLS LAST;
```

> Nota: `v_model_efficiency` fue recreada en M-4 **sin** las columnas `sonnet_equivalent_cost` / `overspend_vs_sonnet` (que v1 usaba). La comparación hoy es `total_cost_usd` (actual) vs `projected_cost_usd` (tarifa previsto) + `filas_sin_tarifa`.

---

## SECCIÓN 5 — REGISTRO MANUAL DE SESIÓN

Para sesiones que aún no se auto-registran (chats de Sam, llamadas no instrumentadas):

```sql
-- El model_id sale del CATÁLOGO (ops_model_pricing), no de un literal:
INSERT INTO public.ops_token_sessions (session_type, model_id, brand_id, lab, input_tokens, output_tokens, notes)
VALUES (
  'claude_chat',
  (SELECT id FROM public.ops_model_pricing WHERE active AND tier = 'balanced' ORDER BY input_per_1m LIMIT 1),
  'NeuroneSCF', 'copylab', 45000, 12000, 'Sesión copy campaña IG'
);
-- cost_usd lo calcula el trigger contra la tarifa vigente.
```

Los Edge Functions ya registran automáticamente en el ledger vía `ops_log_generation` (que resuelve y congela la tarifa por asiento — ver el skill del pipeline IID). Este formulario es el respaldo manual.

---

## SECCIÓN 6 — VERIFICAR UNA TARIFA CONTRA LA FACTURA (método, no tabla)

Cuando llega la factura de Anthropic, se **reconcilia** la tarifa sembrada dividiendo el importe por los tokens facturados y comparando contra `ops_resolve_rate`. Los números abajo son el **método aplicado a jul-2026**, no una tabla de precios a copiar — la tarifa canónica sigue viviendo en `ops_lab_rates`.

| Modelo · dirección | Tokens factura jul-2026 | Importe | Implica tarifa | ¿Coincide con `ops_lab_rates`? |
|---|---|---|---|---|
| Sonnet 5 · input | 221.493 | $0,44 | $2,00 / 1M | Sí (introductorio vigente) |
| Sonnet 5 · output | 24.074 | $0,24 | $10,00 / 1M | Sí |
| Sonnet 5 · cache_write_5m | — | — | $2,50 / 1M | referencia |
| Sonnet 5 · cache_read | — | — | $0,20 / 1M | referencia |
| Sonnet 4.6 · input | 1.114.620 | $3,34 | $3,00 / 1M | Sí |

Procedimiento: `importe / (tokens / 1e6)` → tarifa implícita → comparar con `ops_resolve_rate(...)` a la fecha de la factura. Si no coincide, se corrige la fila en `ops_lab_rates` (o se siembra la que falte); **nunca** se ajusta un literal en un skill o en el código.

---

## SECCIÓN 7 — SCHEMA (referencia)

```
FUENTE DE TARIFA (precio):
  ops_lab_rates            — tarifa por (lab, model_id, unit_type) con status/effective_from/valid_to/auto_promote
  ops_resolve_rate()       — resuelve la tarifa vigente a una fecha, precedencia lab-específico > genérico
  ops_promote_rates()      — [M-6] guardián: archiva vencidas, promueve previstas (cron 06:00 UTC)
  ops_rate_transitions     — [M-6] auditoría de cada promoción/archivado
  v_rate_gaps              — [M-7] tarifas que vencen + si tienen reemplazo previsto

CATÁLOGO (descriptivo, NO precio):
  ops_model_pricing        — nombre, tier, ventana de contexto, notas

COSTO REAL (ledger):
  ops_generation_ledger    — asiento por generación, con tarifa congelada (rate_in/out/source/effective_at)
  v_cost_unified           — costo por asiento: cost_actual + cost_projected + rate_source
  v_iid_funnel             — embudo por marca: intentadas/aprobados/pass_pct/costo_por_publicada
  v_iid_piece_cost         — por pieza: generación vs juicio (Watcher stage propio)
  v_model_efficiency       — por modelo: actual vs proyectado + filas_sin_tarifa

REGISTRO / SERVICIOS (sin cambios):
  ops_token_sessions       — registro manual de tokens
  ops_services / ops_costs — costos de servicios (Vercel, Supabase, fal.ai…)
  ops_client_monthly / v_client_margin — margen por cliente (fuera de alcance activo)
  ops_model_alerts         — alertas de eficiencia
```

---

_SKILL cost-layer v2.0 · Unrealville Studio · M-6 guardián de tarifas._
_Fuente única de tarifas: `ops_lab_rates` vía `ops_resolve_rate`. Cero precios literales en este archivo._
_Historia: ver [ARCHIVE_v1.md](ARCHIVE_v1.md) (v1.0, obsoleto — no usar como fuente)._
