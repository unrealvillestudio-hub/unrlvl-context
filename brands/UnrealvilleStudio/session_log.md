# Session Log — Unrealville Studio
_Última actualización: 2026-04-25_

---

## 2026-04-25 — Orchestrator Upgrade + Content Engine Pipeline + IID Intel Tab

### Sesión extensa (~10 horas). Todo lo construido:

---

### 1. GitHub Auditor — Bug Fix

**Bug:** `api/gh.js` en repo `Tools`. La condición `if (path)` atrapaba todas las llamadas con `?path=` antes de que llegara a `if (repo && path)`, resultando en `ghPath = "src/file.ts"` (URL inválida → HTTP error → proxy devolvía 500).

**Fix:** Reordenar condiciones: `repo + (action=tree | sin path)` → tree primero; `repo + path` → file contents segundo; `path solo` → direct API legacy tercero.

**Estado:** DEPLOYED y verificado — tree + file contents funcionan.

---

### 2. Orchestrator Upgrade — Nuevos endpoints (repo: Orchestrator)

**`api/approve-job.ts`** — Edge runtime (no @vercel/node):
- Recibe `?token=xxx&action=approve|reject`
- Busca job por `approval_token` en `content.orchestrator_jobs`
- Approve → llama SocialLab `/api/execute` con `previousOutputs.copylab = aife_filtered_text`
- Devuelve HTML dark-theme con resultado
- Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SOCIALLAB_URL

**`api/trigger-job.ts`** — Edge runtime:
- Recibe POST `{queue_id, job_id}`
- Delega a Supabase `content-dispatcher` EF

**Nota importante:** Edge runtime — NO usar `@vercel/node` ni `@supabase/supabase-js`. Usar `fetch()` raw con REST API Supabase y `declare const process`. Mismo patrón que `interpret-intent.ts` existente.

---

### 3. IID Intel Tab — Orchestrator OR_1.1

**`src/modules/intel/EcosystemIntelModule.tsx`** — Nuevo:
- 3 bandas: TOP (≥70) · WATCHLIST (50-69) · DESCARTADOS (<50) con conteos
- Cards expandibles: título, agente IID, fecha, score ECO + CNT
- Breakdown R1-R6 con barras visuales
- Links a fuentes
- Fetch directo a Supabase `intel.iid_findings` con `Accept-Profile: intel`
- Sin dependencias nuevas

**`src/App.tsx`** — Modificado:
- `View` type añade "intel"
- `NAV_ITEMS` añade `{ id: "intel", label: "IID Intel", icon: Telescope }`
- BUILD_TAG → OR_1.1

---

### 4. FlowExecutorModule — Layer Indicators

**`src/modules/executor/FlowExecutorModule.tsx`** — Modificado:

`STAGE_LAYERS` mapea lab → capas AI:
- `copylab` → Humanize (índigo #6366f1)
- `aife` → AIFE Filter (ámbar #f59e0b)
- `imagelab` → Psycho Layer (violeta #8b5cf6)

`LayerPill` — 3 estados:
- **idle**: punto gris, texto zinc-700
- **running**: pulsa con color del layer + reloj en segundos
- **done**: checkmark verde + tiempo total transcurrido

El reloj del stage aparece en el header de la card (siempre visible).
Los pills aparecen en sección "AI Layers" al expandir el stage.

---

### 5. Supabase — Migraciones aplicadas

```sql
-- lab_configs: supports_iid + iid_stage_order
ALTER TABLE lab_configs
  ADD COLUMN IF NOT EXISTS supports_iid boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS iid_stage_order integer;

-- content.orchestrator_jobs: assets + platforms + approved_by + finding_id
ALTER TABLE content.orchestrator_jobs
  ADD COLUMN IF NOT EXISTS assets jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS platforms text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS approved_by text,
  ADD COLUMN IF NOT EXISTS finding_id uuid REFERENCES intel.iid_findings(id);

-- intel.iid_content_queue: iid_source_tag
ALTER TABLE intel.iid_content_queue
  ADD COLUMN IF NOT EXISTS iid_source_tag text;
-- Backfill desde agent_id vía iid_findings JOIN iid_agents

-- RLS intel.* y content.*: políticas SELECT para authenticated
-- Escritura solo vía service_role (Edge Functions)

-- GRANTs: SELECT/INSERT/UPDATE/DELETE en lab_configs para service_role
-- fire_stage() función SQL (usa pg_net — DNS timeout conocido, no usar para supabase.co)
```

---

### 6. Supabase Edge Functions deployadas

| Función | Versión | Estado |
|---|---|---|
| `aife-filter` | v1.1 | ACTIVE — lee `previousOutputs.copylab` correctamente |
| `content-dispatcher` | v2.3 | ACTIVE — EdgeRuntime.waitUntil(stageFires) |
| `content-run-stage` | v1.2 | ACTIVE — auth: x-cron-secret, VERCEL_BYPASS_SECRET |

**Contratos clave:**
- CopyLab devuelve `{output: string, status: 'ok'}` — dispatcher guarda como `previousOutputs.copylab`
- AIFE lee `previousOutputs.copylab`, devuelve `{output, aife_filtered}` — dispatcher sobreescribe `copylab` con filtrado
- ImageLab devuelve `{output, image_data_url: base64}` — lee `previousOutputs.copylab` automáticamente
- SocialLab lee `previousOutputs.copylab` prioridad 1 — posts van a `scheduled_posts` con `pending_oauth`

---

### 7. Vercel Protection — Desactivada en Labs

CopyLab, ImageLab, SocialLab: **Vercel Authentication OFF** (team level + project level).

El "Host not in allowlist" que aparecía era del proxy de red del sandbox de Claude (x-deny-reason: host_not_allowed), no de Vercel. Los Labs son accesibles desde Supabase Edge Functions (confirmado: `labs_status: {copylab: "running"}` aparece en DB).

**Vercel Bypass Secret configurado:** `3Oll9BRBBXGeR9QGa1iI0uyGDsV1QzeU`  
Header: `x-vercel-protection-bypass` (guardado también en `intel.iid_scheduler_config`)  
**Nota:** El secret existe pero no es necesario con la protection OFF.

---

### 8. BUG ACTIVO — content-run-stage no se dispara desde dispatcher

**Síntoma:** dispatcher v2.3 responde 200 + "kicked: 5" pero `content-run-stage` no aparece en logs de Supabase. Jobs quedan stuck en `labs_status: {copylab: "running"}`.

**Lo que sí funciona (confirmado):**
- Dispatcher crea jobs OK
- Cuando el stage runner SÍ se llama (test directo), pasa auth y llega a CopyLab
- CopyLab responde (labs_status cambia a `copylab: running`)
- La arquitectura stage-by-stage es correcta

**Hipótesis del bug:**
`EdgeRuntime.waitUntil()` en Supabase Deno runtime no mantiene vivas las fetches fire-and-forget de la misma forma que en Cloudflare Workers. El dispatcher termina y Deno cancela los fetches pendientes antes de que lleguen.

**Fix candidato para próxima sesión:**
```typescript
// En lugar de fire-and-forget, await el fetch ANTES de retornar Response
// Esto alarga el dispatcher ~20-30s pero garantiza que el stage se dispara
await fetch(stageUrl, { ... body: {job_id, stage_order: 1} });
return new Response(JSON.stringify({success: true, kicked}), ...);
```

**Alternativa:** Usar `pg_net.http_post()` desde una función SQL intermedia que persiste aunque la EF termine. Pero pg_net tiene DNS timeout para `supabase.co` desde Postgres — verificar si aplica al URL de funciones o solo al URL público.

---

### 9. Decisiones de arquitectura tomadas esta sesión

- **AIFE** como Lab en `lab_configs` (iid_stage_order: 2) — callable igual que CopyLab/ImageLab/SocialLab
- **Orchestrator** (no UNRLVL-OPS) es el hub de Content Engine y Ecosystem Intel
- **Ecosystem Intel Tab** → Orchestrator (no OPS como se había discutido antes)
- **brandId para contenido IID** → `"UnrealvilleStudio"` para voces unrlvl y lucien (ambas viven bajo esa marca en Supabase)
- **Pipeline es síncrono por stage** (no paralelo) — cada EF ejecuta un Lab y encadena el siguiente
- **SocialLab OAuth** es sprint futuro — posts van a `scheduled_posts` con `pending_oauth`
- **pg_net** no puede llamar a Edge Functions desde Postgres (DNS timeout para supabase.co) — debe usarse `fetch()` desde Edge Function context

---

### Pendientes inmediatos (próxima sesión)

1. **FIX BUG dispatcher → stage runner** — probar await síncrono antes de retornar Response
2. **Test pipeline completo** con 1 job (no 5) para aislar
3. **Primer email de aprobación → Sam → PUBLICAR** → verificar en SocialLab
4. Una vez validado: **Actualiza** + cierre sprint Orchestrator
5. LUCIEN-BOOKS: Brief Libro 1
6. NeuroneSCF B2B: brand_ids + acento navy
7. ForumPHs: datos edificios + foto Ivette

---

## 2026-04-24 — IID Network OPERATIONAL + Content Engine diseñado

_Ver session_log anterior o ecosystem.md para detalles del 24 de abril._

**Resumen:** IID Network full build (schemas intel.* + content.*, 14 agentes, 5 EFs, 27 crons). Primer run IID-ECOMMERCE exitoso (4 findings reales, 8 piezas en content_queue). Brief biweekly enviado.
