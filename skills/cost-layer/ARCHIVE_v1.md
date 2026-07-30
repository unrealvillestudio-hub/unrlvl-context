> # ⛔ PRECIOS OBSOLETOS — NO USAR ⛔
>
> **Este archivo es la v1.0 del skill cost-layer, preservada VERBATIM por historia (CC_PROTOCOL §0). NO es fuente de nada.**
>
> **Por qué está archivado:**
> - v1 **hardcodeaba precios** de Claude Sonnet 4.6 / Opus 4.6 / Haiku 4.5 en una tabla (Sección 2) **y en todos los ejemplos SQL** (`calc_token_cost('claude-sonnet-4-6', …)`). Ese literal es exactamente el vector por el que un precio caducado se propagaba a cada sesión nueva que cargaba el skill.
> - **M-4** movió la fuente de precio: `ops_model_pricing` pasó a ser **descriptivo** (nombre, tier, ventana), y la **tarifa** vive ahora en `ops_lab_rates`, resuelta por `ops_resolve_rate`. Ya no son la misma cosa.
> - Tarifas **confirmadas contra la factura de julio-2026**: Sonnet 5 input **$2,00**/1M · output **$10,00**/1M; Sonnet 4.6 input **$3,00**/1M · output **$15,00**/1M. (El literal de v1 tenía a Sonnet 4.6 como "el motor" a $3/$15 — correcto para 4.6, pero el pipeline hoy corre Sonnet 5, y ningún precio debe leerse de aquí.)
>
> **Fuente única de tarifas: `ops_lab_rates` vía `ops_resolve_rate`.** La versión activa es [SKILL.md](SKILL.md) (v2). Nada de lo que sigue debe usarse como fuente de precio, de modelo, ni de ejemplo SQL.
>
> ---

# SKILL — cost-layer v1.0
_UNRLVL-OPS · Token Tracking · Margin Calculator · Model Efficiency_
_Versión: 1.0 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa cuando Sam indica:
- "cuánto costó [lab/marca/sesión]"
- "cuál es el margen de [cliente]"
- "estamos usando el modelo correcto en [lab]"
- "registra esta sesión de tokens"
- cualquier análisis de costos o eficiencia de compute

---

## SECCIÓN 1 — ARQUITECTURA

### Qué trackea el Cost Layer

```
Sesiones de Claude (chats, labs, agentes, Edge Functions)
    ↓
ops_token_sessions — registro granular por llamada
    ↓
Agregación mensual por marca/lab
    ↓
ops_client_monthly — margen por cliente
    ↓
ops_model_alerts — alertas de eficiencia
```

### Relación con lo que ya existía

El Cost Layer extiende UNRLVL-OPS sin reemplazarlo:
- `ops_services` + `ops_costs` → costos de servicios (Vercel, Supabase, fal.ai, etc.) — sin cambios
- `ops_token_sessions` → **nuevo** — granularidad de tokens por sesión/llamada
- `ops_client_monthly` → **nuevo** — margen calculado por cliente y mes
- `ops_model_pricing` → **nuevo** — precios actuales por modelo
- `ops_model_alerts` → **nuevo** — alertas de ineficiencia

---

## SECCIÓN 2 — MODELOS Y PRECIOS ACTUALES

### Tabla ops_model_pricing (datos al 2026-04-24)

| Modelo | ID | Input/1M | Output/1M | Cache Write/1M | Cache Read/1M | Tier |
|---|---|---|---|---|---|---|
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | $3.00 | $15.00 | $3.75 | $0.30 | balanced |
| Claude Opus 4.6 | `claude-opus-4-6` | $15.00 | $75.00 | $18.75 | $1.50 | powerful |
| Claude Haiku 4.5 | `claude-haiku-4-5` | $0.80 | $4.00 | $1.00 | $0.08 | fast |

### Cuándo usar cada modelo en UNRLVL

| Tarea | Modelo correcto | Por qué |
|---|---|---|
| CopyLab — copy de marca | Sonnet 4.6 | Calidad suficiente, costo óptimo |
| IID Network — análisis | Sonnet 4.6 | Razonamiento bueno a precio razonable |
| Agentes conversacionales simples | Haiku 4.5 | Respuestas cortas, bajo costo, alta velocidad |
| Document Factory — formalización | Sonnet 4.6 | Precisión sin sobrepagar |
| Análisis complejo / estratégico | Opus 4.6 | Reservar para cuando Sonnet no alcanza |
| Shopify Auditor — queries | Sonnet 4.6 | Procesamiento de datos estructurados |
| Libros Lucien — escritura | Sonnet 4.6 | Calidad literaria, costo sostenible |
| Clasificación / routing | Haiku 4.5 | Tarea simple, máxima eficiencia |

**Regla:** Opus solo cuando Sonnet genuinamente no es suficiente. Cada llamada a Opus cuesta 5x más que Sonnet.

### Cálculo rápido de costo

```sql
-- Costo de una sesión: función calc_token_cost
SELECT public.calc_token_cost('claude-sonnet-4-6', 50000, 8000);
-- Ejemplo: 50K input + 8K output Sonnet = $0.15 + $0.12 = $0.27

-- Comparar si valía usar Opus:
SELECT
  public.calc_token_cost('claude-opus-4-6', 50000, 8000) AS opus_cost,
  public.calc_token_cost('claude-sonnet-4-6', 50000, 8000) AS sonnet_cost;
-- Opus: $0.75 + $0.60 = $1.35 vs Sonnet: $0.27 — 5x más caro
```

---

## SECCIÓN 3 — REGISTRO DE SESIONES

### Insertar una sesión manualmente

```sql
INSERT INTO public.ops_token_sessions (
  session_type, model_id, brand_id, lab,
  input_tokens, output_tokens, notes
) VALUES (
  'claude_chat',             -- tipo de sesión
  'claude-sonnet-4-6',       -- modelo usado
  'NeuroneSCF',              -- marca (null si es interno UNRLVL)
  'copylab',                 -- lab que generó el gasto
  45000,                     -- input tokens
  12000,                     -- output tokens
  'Sesión copy campaña IG NeuroneSCF B2C'
);
-- cost_usd se calcula automáticamente por el trigger
```

### Tipos de sesión

| session_type | Cuándo |
|---|---|
| `claude_chat` | Sesiones de trabajo de Sam con Claude (como esta) |
| `lab_call` | Llamada desde CopyLab, ImageLab, WebLab, etc. |
| `agent_call` | Llamada desde agente deployado (Profiler, Speaks, SMA) |
| `edge_function` | Edge Function que llama a Claude directamente |
| `batch` | Procesamiento batch (Document Factory, etc.) |

### Registro automático desde Edge Functions

```typescript
// Al final de cada Edge Function que llame a Claude:
async function logTokenUsage(
  supabase: SupabaseClient,
  sessionType: string,
  modelId: string,
  brandId: string | null,
  lab: string | null,
  usage: { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number; cache_read_input_tokens?: number }
) {
  await supabase.from('ops_token_sessions').insert({
    session_type: sessionType,
    model_id: modelId,
    brand_id: brandId,
    lab: lab,
    input_tokens: usage.input_tokens,
    output_tokens: usage.output_tokens,
    cache_write_tokens: usage.cache_creation_input_tokens ?? 0,
    cache_read_tokens: usage.cache_read_input_tokens ?? 0
    // cost_usd calculado automáticamente
  });
}

// Uso después de llamar a Claude:
const response = await anthropic.messages.create({ ... });
await logTokenUsage(supabase, 'lab_call', 'claude-sonnet-4-6',
  'NeuroneSCF', 'copylab', response.usage);
```

---

## SECCIÓN 4 — MARGEN POR CLIENTE

### Registrar un mes de cliente

```sql
INSERT INTO public.ops_client_monthly (
  brand_id, period_month, retainer_usd, compute_usd, labor_hours
) VALUES (
  'NeuroneSCF',
  '2026-04-01',   -- primer día del mes
  3500.00,        -- retainer mensual (SIGNAL tier)
  45.00,          -- costo de compute ese mes (desde v_cost_by_brand_lab)
  12.5            -- horas de Sam ese mes (manual)
);
-- margin_usd y margin_pct se calculan automáticamente
```

### Consultar margen

```sql
-- Margen de todos los clientes este mes
SELECT brand_name, retainer_usd, compute_usd,
       labor_cost_usd, margin_usd, margin_pct, margin_status
FROM public.v_client_margin
WHERE period_month = DATE_TRUNC('month', CURRENT_DATE);

-- Margen histórico de un cliente
SELECT period_month, retainer_usd, margin_usd, margin_pct, margin_status
FROM public.v_client_margin
WHERE brand_id = 'NeuroneSCF'
ORDER BY period_month DESC;
```

### Umbrales de margen

| Estado | Margen % | Acción |
|---|---|---|
| `healthy` | ≥ 60% | — |
| `ok` | 40–59% | Monitorear |
| `tight` | 20–39% | Revisar eficiencia o precio |
| `at_risk` | < 20% | Conversación con Sam urgente |

---

## SECCIÓN 5 — EFICIENCIA DE MODELOS

### Ver si estamos usando el modelo correcto

```sql
-- ¿Dónde estamos usando Opus cuando Sonnet sería suficiente?
SELECT model_name, tier, lab, brand_id, period_month,
       total_calls, total_cost_usd,
       sonnet_equivalent_cost,
       overspend_vs_sonnet
FROM public.v_model_efficiency
WHERE tier = 'powerful'  -- solo Opus
  AND overspend_vs_sonnet > 1.00  -- sobrepagando más de $1
ORDER BY overspend_vs_sonnet DESC;

-- Costo por lab este mes
SELECT lab, brand_id, total_calls, total_tokens, total_cost_usd,
       avg_cost_per_call
FROM public.v_cost_by_brand_lab
WHERE period_month = DATE_TRUNC('month', CURRENT_DATE)
ORDER BY total_cost_usd DESC;
```

### Alertas automáticas

```sql
-- Ver alertas activas
SELECT alert_type, brand_id, lab, detail, cost_impact_usd, created_at
FROM public.ops_model_alerts
WHERE resolved = false
ORDER BY created_at DESC;

-- Registrar una alerta manualmente
INSERT INTO public.ops_model_alerts (alert_type, brand_id, lab, detail, cost_impact_usd)
VALUES ('wrong_model', 'NeuroneSCF', 'copylab',
        'Se usó Opus en 12 calls de copylab — Sonnet habría sido suficiente',
        8.40);
```

---

## SECCIÓN 6 — QUERIES DE DIAGNÓSTICO RÁPIDO

### Costo total del mes actual

```sql
SELECT
  SUM(cost_usd) AS total_mes_usd,
  SUM(input_tokens + output_tokens) AS total_tokens,
  COUNT(*) AS total_llamadas
FROM public.ops_token_sessions
WHERE recorded_at >= DATE_TRUNC('month', CURRENT_DATE);
```

### Top 5 sesiones más caras (detectar outliers)

```sql
SELECT session_type, model_id, brand_id, lab,
       input_tokens, output_tokens, cost_usd, notes, recorded_at
FROM public.ops_token_sessions
WHERE recorded_at >= DATE_TRUNC('month', CURRENT_DATE)
ORDER BY cost_usd DESC NULLS LAST
LIMIT 5;
```

### Costo estimado de esta sesión de chat

```sql
-- Estimación manual — Claude chats no se auto-registran todavía
-- Registrar al final de una sesión larga:
SELECT public.calc_token_cost('claude-sonnet-4-6',
  [input_tokens],   -- reemplazar con valor real
  [output_tokens]   -- reemplazar con valor real
) AS estimated_cost_usd;
```

---

## SECCIÓN 7 — INTEGRACIÓN CON IID NETWORK

Cuando UNRLVL-IID detecta un hallazgo de ahorro (ej: "Cartesia Sonic = 60% ahorro en TTS"), Cost Layer confirma el ROI real:

```sql
-- ¿Cuánto gastamos en ElevenLabs el mes pasado?
SELECT SUM(cost_usd) FROM public.ops_costs
WHERE service_id = 'elevenlabs'
  AND period_month = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month');

-- Si el resultado es $X, el ahorro proyectado con Cartesia es X * 0.60
-- IID puede generar el sprint sugerido con ROI calculado
```

---

## SECCIÓN 8 — SCHEMA COMPLETO (referencia)

```
ops_model_pricing     — precios por modelo (Anthropic, future: otros)
ops_token_sessions    — registro granular de cada llamada a Claude
ops_client_monthly    — margen calculado por cliente y mes
ops_model_alerts      — alertas de ineficiencia

Tablas existentes (sin cambios):
ops_services          — catálogo de servicios
ops_costs             — costos mensuales por servicio
ops_thresholds        — alertas de gasto
ops_renewals          — renovaciones
ops_insights          — insights manuales

Vistas (nuevas):
v_cost_by_brand_lab   — costo agregado por marca/lab/mes
v_model_efficiency    — eficiencia por modelo, sobrecosto vs Sonnet
v_client_margin       — margen por cliente con status

Función:
calc_token_cost()     — calcula costo dado modelo + tokens

Trigger:
trg_auto_calc_session_cost — auto-calcula cost_usd al insertar sesión
```

---

_SKILL cost-layer v1.0 · Unreal>ille Studio · UNRLVL-OPS extension_
_Schema deployado en Supabase public.* al 2026-04-24_
