# SKILL — security v1.1
_UNRLVL Security Standards · Supabase · Vercel · Deployments_
_Versión: 1.1 · 2026-06-03 (actualiza v1.0 del 2026-04-24)_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa en cualquier sesión que involucre:
- Crear o modificar tablas en Supabase
- Deployar Edge Functions o endpoints públicos
- Configurar agentes, webhooks, o APIs externas
- Gestionar secrets y variables de entorno
- Cualquier checklist pre-deployment productivo

**Regla:** Este skill se lee ANTES de escribir cualquier código que toque seguridad. No después.

**Nuevo en v1.1:** la fuente de verdad sobre QUÉ acceso anon es intencional vs agujero ya no vive en este skill (que se desactualiza), sino en `supabase_access_map.json`, generado por el `supabase-auditor`. Antes de marcar cualquier grant anon como "vulnerabilidad", cruzar contra ese mapa.

---

## ⚠️ CAMBIOS v1.1 — CORRECCIÓN DE DRIFT

La sesión de seguridad del 2026-06-03 reveló que la sección "ISSUES ACTIVOS" del v1.0 contenía dos afirmaciones que NO coincidían con la realidad del código:

1. **`ops_costs` anon DELETE/INSERT NO es un "crítico desconocido".** El v1.0 lo marcaba como agujero crítico. La auditoría de código confirmó que es el mecanismo real de la app interna de costos (`unrlvl-ops`, dashboard Vercel) que escribe con anon key. Es **intencional aunque debatible** — no un agujero. Reclasificado abajo.
2. **Los tokens Shopify NO están en `ops.shopify_stores` cifrados.** Están en `shopify.stores` en texto plano, y hasta el 2026-06-03 estaban expuestos a anon vía la vista `public.shopify_stores` (SECURITY DEFINER). Esa fuga se cerró. Corregido en la Sección 4.

Moraleja que justifica el `supabase-auditor`: la documentación manual de seguridad divergió de la realidad en dos puntos en seis semanas. El estado de seguridad debe leerse del código + DB en vivo, no de un doc estático.

---

## ESTADO DE ISSUES (al 2026-06-03)

### RESUELTOS en la sesión 2026-06-03
- ✅ Fuga de access tokens Shopify vía vista `shopify_stores` — cerrada (security_invoker + revoke anon).
- ✅ ~20 funciones SECURITY DEFINER con EXECUTE a PUBLIC — restringidas a service_role (triggers, fire_stage, upsert_shopify_store, dispatch_lab_job, get_shopify_store*, save_*audit*, ops_compute_cost, ops_log_generation, invalidate_*, etc.).
- ✅ `nscf_draft_orders` lectura pública de datos de clientas (SELECT USING true) — policies anon eliminadas.
- ✅ 8 tablas sin RLS (cubeta A) — RLS habilitada.

### INTENCIONALES — NO tocar (dual-mode sync; ver supabase_access_map.json)
- `upsert_brand_cache` (anon) — CopyLab escribe cache desde el browser.
- `rotate_sequence_current` (anon) — dispatcher de recogida del Orchestrator.
- `copylab_jobs` policies permisivas (anon) — encolado dual-mode async/sync.
- Estos aparecerán SIEMPRE como WARN en el advisor. Es ruido de diseño, no bug.

### DEBATABLE — revisión de diseño pendiente (no urgencia)
- `ops_costs` anon INSERT/DELETE — la app interna `unrlvl-ops` lo usa así. Funciona. Discutible que una tabla financiera permita escritura/borrado anon; idealmente migrar a endpoint serverless con service_role o añadir auth a la app. **Coordinar con Sam antes de tocar — rompería el dashboard de costos.**

### WARN COSMÉTICOS PENDIENTES (sin riesgo de explotación hoy)
- `function_search_path_mutable` en ~22 funciones — fijar `search_path`. Fix abajo.
- `pg_net` instalada en schema `public` — mover de schema (requiere cuidado, pg_net es usada por el pipeline).
- Bucket `unrlvl-media` con SELECT policy amplia que permite listar archivos.
- `ops_generation_ledger` policy `service_role_all_ledger` mal nombrada (rol=public; anon sin grants de tabla -> no explotable). Renombrar/recrear.

**Fix estándar search_path (aplicar por función, con el schema correcto):**
```sql
ALTER FUNCTION public.[fn]([args]) SET search_path = public;
-- para funciones que tocan otros schemas, listarlos: SET search_path = public, content;
```

---

## SECCIÓN 1 — KEYS Y ROLES DE SUPABASE

### Las tres keys y cuándo se usa cada una

| Key | Scope | Dónde va | Dónde NUNCA va |
|---|---|---|---|
| `anon` (pública) | Usuario final no autenticado | Frontend, artifacts HTML, clients | En Edge Functions con operaciones sensibles |
| `service_role` (secreta) | Bypasea RLS, acceso total | Edge Functions server-side únicamente | Frontend, cliente, código público, outputs |
| JWT de usuario | Usuario autenticado específico | Cuando hay auth de usuario | No aplica a UNRLVL todavía |

**Regla crítica:** `service_role` nunca sale del servidor. Si aparece en un artifact HTML, en un output de Claude, o en código de frontend — es un error grave.

**Nota dual-mode (v1.1):** los labs (CopyLab, ImageLab, Orchestrator) usan anon key desde el browser para el modo sync. Esto es por diseño. La anon key está sujeta a RLS, así que la protección real vive en las policies y grants, no en ocultar la anon key.

### Dónde viven las keys en el stack UNRLVL

```
Vercel Edge/Node Functions → SUPABASE_SERVICE_ROLE_KEY (env var Vercel)
Supabase Edge Functions    → SUPABASE_SERVICE_ROLE_KEY (Supabase secrets)
Labs front (sync dual-mode)→ VITE_SUPABASE_ANON_KEY
Artifacts HTML públicos    → SUPABASE_ANON_KEY únicamente
Agentes web (widget)       → SUPABASE_ANON_KEY únicamente
```

---

## SECCIÓN 2 — RLS: ESTÁNDARES POR TIPO DE TABLA

Row Level Security debe estar activo en TODAS las tablas. Sin excepciones.
(El `supabase-auditor` verifica que la realidad cumpla estos estándares; cuando una desviación es intencional/dual-mode, la registra en el access_map en vez de marcarla violación.)

### Tabla de datos de marca (brand content)
```sql
CREATE POLICY "public_read" ON public.[tabla] FOR SELECT USING (true);
CREATE POLICY "service_write" ON public.[tabla]
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
```

### Tabla de datos de cliente/CRM (sensibles)
```sql
CREATE POLICY "no_anon_access" ON public.[tabla]
  FOR ALL USING (auth.role() = 'service_role');
```
> Lección 2026-06-03: `nscf_draft_orders` (datos de clientas del kiosk) tenía SELECT USING(true) para anon. Las tablas con datos de cliente NUNCA deben ser legibles por anon. El kiosk accede vía Edge Function con service_role, no directo.

### Tabla de jobs dual-mode (labs async/sync)
```sql
-- Patrón legítimo: el front encola/actualiza jobs con anon.
-- copylab_jobs sigue este patrón. Documentar en supabase_access_map.json como intentional.
CREATE POLICY "anon_write_jobs"  ON public.[tabla] FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_read_own"    ON public.[tabla] FOR SELECT USING (true);
CREATE POLICY "anon_update_jobs" ON public.[tabla] FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON public.[tabla] FOR ALL USING (auth.role() = 'service_role');
```
> Mejora opcional: acotar el SELECT a jobs propios en vez de USING(true) si se introduce un identificador de sesión.

### Tabla de ops/costos/financiero
```sql
-- Estándar ideal: solo service_role.
CREATE POLICY "service_only" ON public.[tabla]
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
```
> Realidad 2026-06-03: `ops_costs` permite anon write/delete porque la app interna lo usa así. Es deuda de diseño, no se ajusta al estándar. Migrar a endpoint serverside cuando se priorice.

---

## SECCIÓN 3 — EDGE FUNCTIONS: AUTENTICACIÓN

(sin cambios respecto a v1.0 — patrón de verificación de requests, webhooks Meta/WhatsApp/Shopify con HMAC)

```typescript
function verifyRequest(req: Request): boolean {
  const authHeader = req.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    return token === Deno.env.get('SUPABASE_ANON_KEY') ||
           token === Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  }
  const secret = req.headers.get('x-unrlvl-secret');
  return secret === Deno.env.get('INTERNAL_WEBHOOK_SECRET');
}
```

> Nota 2026-06-03: `fire_stage` y `dispatch_lab_job` reciben parámetros (p_url, p_service_key) que NO validan internamente. Su seguridad depende de que solo service_role pueda ejecutarlas. Toda función SECURITY DEFINER que haga `net.http_post` a URL parametrizada debe estar cerrada a anon (riesgo SSRF).

---

## SECCIÓN 4 — SECRETS: LO QUE NUNCA VA HARDCODEADO

### Lista negra de hardcoding
`SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, Shopify Admin tokens (`shpat_`), WhatsApp credentials, Fal.ai/ElevenLabs/HeyGen/Kling keys, Resend, Twilio, cualquier JWT.

### Dónde viven los secrets (CORREGIDO v1.1)

| Secret | Dónde | Cómo acceder |
|---|---|---|
| Supabase service_role | Supabase Dashboard → Settings → API | `Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')` |
| Anthropic API key | Vercel + Supabase env vars | `process.env.ANTHROPIC_API_KEY` |
| **Shopify tokens** | **`shopify.stores.access_token` (texto plano). Acceso SOLO service_role vía rpc/get_shopify_store* o la EF.** | Query/RPC con service_role |
| WA credentials | Vercel env vars + `agents` table | Env vars + Supabase |

> **Corrección v1.1:** el v1.0 decía que los tokens Shopify estaban en `ops.shopify_stores` "columna cifrada". Falso: están en `shopify.stores`, texto plano. La vista `public.shopify_stores` los exponía a anon (SECURITY DEFINER) — fuga cerrada el 2026-06-03 con `security_invoker=on` + revoke anon. **Pendiente real:** evaluar cifrado en reposo de `access_token` (hoy no está cifrado).

### Verificación pre-commit
```bash
grep -r "sk-ant-" .          # Anthropic keys
grep -r "shpat_" .           # Shopify admin tokens
grep -r "service_role" .     # Supabase service role en cliente
grep -r "eyJhbGciOiJIUzI" .  # JWT tokens
```

---

## SECCIÓN 5 — VARIABLES DE ENTORNO POR PLATAFORMA
(sin cambios respecto a v1.0)

---

## SECCIÓN 6 — CORS
(sin cambios respecto a v1.0)

---

## SECCIÓN 7 — CHECKLIST PRE-DEPLOYMENT

### Supabase
- [ ] RLS habilitado en la tabla nueva
- [ ] Políticas RLS creadas — no `USING (true)` para escritura salvo patrón dual-mode documentado en el access_map
- [ ] Datos de cliente/financieros: NUNCA legibles por anon
- [ ] Funciones nuevas tienen `SET search_path`
- [ ] Funciones SECURITY DEFINER nuevas: revocar EXECUTE de PUBLIC, otorgar solo a quien la necesite (service_role, o anon si es dual-mode documentado)
- [ ] Funciones que hacen net.http_post a URL parametrizada: cerradas a anon (SSRF)
- [ ] No hay `service_role` key en código de cliente
- [ ] Si el objeto se accede con anon, registrar la entrada en `supabase_access_map.json` con `intentional` y `verified_in`

### Vercel / Edge Functions
- [ ] Keys desde `process.env`/`Deno.env.get()` — nunca hardcodeadas
- [ ] CORS apropiado al tipo de endpoint
- [ ] Webhooks verifican firma/token del origen
- [ ] No secrets en código commiteado (grep)

### General
- [ ] `.env.local` en `.gitignore`
- [ ] No tokens en comentarios
- [ ] Logs no imprimen valores sensibles

---

## SECCIÓN 8 — ADVISORS + AUDITOR

Después de cada sesión con DDL:
```
Supabase:get_advisors (type=security)
```

**Pero (v1.1):** el advisor solo ve la DB. Para interpretar correctamente sus WARN (intencional vs agujero), correr el **supabase-auditor** (protocolo auditor), que cruza con el código y mantiene `supabase_access_map.json`. Un WARN sobre un objeto con `intentional: true` en el map es ruido de diseño esperado.

---

_SKILL security v1.1 · Unrealville Studio · Supabase + Vercel_
_v1.1 corrige drift detectado en sesión de seguridad 2026-06-03. Fuente de verdad de acceso: supabase_access_map.json_
