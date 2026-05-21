# SESSION LOG — NeuroneSCF / CopyLab Async Sprint
_Sesión: 2026-05-21 | Duración: ~9h | Estado: EN CURSO — pendiente resolver 504 cold start_

---

## RESUMEN EJECUTIVO

Sprint para implementar modo async en CopyLab (jobs procesados en background sin bloquear browser) + arquitectura de brand cache snapshots v2.0 para eliminar las 24 queries de Supabase en cada generación.

Resultados del día:
- ✅ `unrlvl-supabase-mcp` v1.2.1: deploy_edge_function funcionando correctamente
- ✅ `copylab-processor` EF v1.4: pipeline completo Ayra path operacional
- ✅ `brand-cache-builder` EF: pobla brand_cache_snapshots (18 tablas por marca)
- ✅ `brand_cache_snapshots` NeuroneSCF v2.0: built 17:05 UTC
- ✅ `CopyLab` v9.5: zero-query mode con snapshot v2.0
- ✅ `pg_cron` job #30: activo — dispara cada 1 min
- ✅ `copylab_jobs` tabla: operacional con grants correctos
- 🔴 BLOQUEANTE: CopyLab Vercel serverless cold start → 504 en llamadas server-to-server

---

## ESTADO ACTUAL AL CIERRE

### ✅ COMPLETADO

#### unrlvl-supabase-mcp v1.2.1
- **Bug encontrado y resuelto:** `deploy_edge_function` enviaba JSON con files array — la API de Supabase requiere `multipart/form-data` con campo `file` (no `body`), endpoint `/functions/deploy?slug={name}` (no `/functions`), contenido TypeScript raw (no ZIP)
- **Repo:** `unrealvillestudio-hub/unrlvl-supabase-mcp` — commit `5da4bacf`
- **Proceso de fix:** 3 iteraciones: v1.2.0 (ZIP con fflate, endpoint incorrecto) → v1.2.1 (correcto)
- **Lección:** Investigar GitHub Discussion #33720 de Supabase fue clave para el endpoint correcto
- **Estado:** `prj_svtqNxIlwRvzMFYKmnOCAyK7GcQP` READY en Vercel

#### PAT vs service_role token
- `UNRLVL_SB_ACCESS_TOKEN` en `unrlvl-supabase-mcp` Vercel env vars debe ser PAT (`sbp_...`) de `supabase.com/dashboard/account/tokens`
- Antes tenía un valor con caracteres especiales que no era PAT — Management API requería PAT, REST API requería service_role JWT separado
- Fix: PAT correcto + redeploy

#### copylab_jobs tabla
- Tabla existía pero sin GRANT — todos los roles fallaban con 401 aunque hubiera RLS policies
- Fix: `GRANT SELECT, INSERT, UPDATE ON copylab_jobs TO anon, authenticated; GRANT ALL ON copylab_jobs TO service_role;`
- Lección crítica: GRANT (table-level) y RLS (row-level) son capas independientes — ambas necesarias

#### copylab-processor EF — evolución
- v1.0: código del session_log anterior (ya estaba listo)
- v1.1: agregó recovery de stuck jobs (causó race conditions — revertido)
- v1.2: eliminó AbortSignal custom (usaba timeout de Deno nativo)
- v1.3: agregó fetchBrandCache via HTTP antes de llamar CopyLab
- **v1.4 ACTUAL:** lee snapshot v2.0 de `brand_cache_snapshots` directamente (1 query Supabase) — inyecta en `previousOutputs.brandContext` antes de llamar CopyLab
- BATCH_SIZE reducido a 1 para evitar race conditions

#### pg_cron
- Job #30: `copylab-processor-1min` — activo, status `succeeded` cada minuto
- `net._http_response` muestra respuestas del processor correctamente

#### brand-cache-builder EF
- **Nueva EF** deployada en `amlvyycfepwhiindxgzw`
- Actions: `build` (marca específica), `build_all` (todas las marcas), `status`
- 18 tablas por marca: brands, brand_personas, brand_copy_profiles, humanize_profiles, compliance_rules, brand_goals, geomix, keywords, ctas, brand_voice_genome, creative_compatibility_rules, psycho_presets, channel_prompt_rules, creative_vectors, tension_architectures, aggro_presets, pipeline_skills, output_templates
- NeuroneSCF snapshot v2.0 built: `2026-05-21 17:05:28 UTC`

#### brand_cache_snapshots v2.0
- Tabla ya existía (creada 2026-05-20) — vacía hasta hoy
- Schema: brand_id, cache_data (jsonb), built_at, stale_after (TTL 4h), built_by, version, tables_included
- Primary key añadida: `brand_id`
- Grants aplicados: anon/authenticated/service_role
- NeuroneSCF: 18 tablas, version 2.0

#### CopyLab v9.5
- **Commit:** `34916fed` en `unrealvillestudio-hub/CopyLab`
- **Deploy:** `dpl_7KrgtyvHD9sRdPDQghXFkTvwNyGY` — READY
- **Cambios sobre v9.4:**
  1. `fetchBrandCache()`: prioridad Supabase snapshot (1 query) > HTTP endpoint > 24 queries directas
  2. `isV2` detection: `Array.isArray(bc.creative_vectors)` → activa zero-query mode
  3. `selectCreativeComboFromData()`: Creative Engine desde snapshot (sin Supabase)
  4. `assembleVoiceGenomeLayer()`: refactorizado como función pura (sin Supabase)
  5. `buildVoiceGenomeLayer()`: sigue llamando a Supabase cuando no hay snapshot
  6. `resolveAppliedLayersFromData()`: pipeline_skills desde snapshot
  7. `isV2` path: output_templates, voice_genome, layers, creative engine — todo desde snapshot
  8. `kwList` y `ctaList` incluidos desde snapshot v2.0 (antes eran [] en v1.x)
  9. `cache_mode` en respuesta: `v2.0_zero_query` | `v1.x_partial` | `no_cache`
  10. Bug fix: `cache_mode,` shorthand → `cache_mode: cacheMode` (TS2552)
- **Arquitectura explicada a Sam:** dispatcher pre-carga contexto → CopyLab recibe datos listos → solo hace el Claude call → ICR/pipeline completo intacto. CopyLab NO puede estar fuera del loop — ICR + pipeline L0→L7 + AIFE + Humanize son el diferenciador de output.

---

## 🔴 BLOQUEANTE CRÍTICO — próxima sesión PRIORIDAD 1

### CopyLab Vercel 504 en llamadas server-to-server

**Síntoma:** `copylab-processor` v1.4 llama a `https://unrlvl-copy-lab.vercel.app/api/execute`, Vercel devuelve 504 Gateway Timeout antes de que la función responda.

**Runtime log Vercel:** `WARN: default export return... | 504` — handler `export default async function handler(req: Request): Promise<Response>` en Node.js serverless.

**Intentos fallidos:**
- v1.3: AbortSignal.timeout(250_000) → "Signal timed out." instantáneo (Deno issue)
- v1.2: Sin AbortSignal → EF de Supabase espera indefinidamente, wall-clock la mata
- El snapshot v2.0 reduce CopyLab a Claude-only (no Supabase queries), pero el cold start de Vercel Node.js sigue tomando demasiado

**Hipótesis del 504:**
1. Vercel Node.js cold start con 200MB de deps tarda 60-90s independientemente del código
2. El 504 ocurre ANTES de que la función ejecute cualquier código
3. `maxDuration: 300` en `vercel.json` está correctamente configurado pero puede no aplicarse a cold starts

**Opciones a explorar en próxima sesión:**
A. **Warm-up automático:** pg_cron adicional que pingue CopyLab cada 5 min para mantenerla caliente
B. **Fluid Compute:** cambiar `vercel.json` de `fluid: false` a `fluid: true` — Fluid Compute mantiene las funciones calientes en Vercel Pro
C. **Cambiar handler format:** `export default async function handler(req: VercelRequest, res: VercelResponse)` — formato Node.js nativo en lugar de Web API — puede afectar al timeout behavior
D. **Llamar `/api/execute` con `keepalive: true`** o headers específicos para evitar timeout proxy
E. **Separar el Claude call:** nuevo endpoint `/api/generate` que solo hace el Claude call con el prompt pre-construido — el processor construye el prompt (usando snapshot) y llama directamente a este endpoint mínimo

**Estado del job de prueba:**
- ID: `cd0b168c-aa7b-40d0-9076-7f8b15fb9ae6`
- Status: `processing` desde 17:31:01 UTC (stuck de nuevo)
- Resetear al inicio de próxima sesión

---

## DECISIONES TÉCNICAS TOMADAS

| Decisión | Razón |
|----------|-------|
| brand_cache_snapshots en Supabase, no CDN | Query directa más rápida que HTTP desde EF; TTL controlado; se actualiza con triggers |
| Snapshot incluye raw data (no prompt pre-armado) | El prompt varía por pack/canal/idioma/persona — solo los datos son invariantes por marca |
| CopyLab NO puede estar fuera del loop async | ICR, pipeline L0→L7, AIFE, Humanize F2.5 son el diferenciador de output. Claude sin pipeline = texto genérico |
| BATCH_SIZE = 1 en processor | Evita race conditions entre múltiples instancias del EF procesando el mismo job |
| build_all pobla todas las marcas en una llamada | Escalable — nuevo cliente = un registro en brands + llamar build_all |
| Invalidación manual por ahora | Triggers automáticos son Sprint 2 — primero validar el flujo end-to-end |

---

## ARQUITECTURA FINAL DEL FLUJO ASYNC (Ayra Path)

```
pg_cron (cada 1min)
  → net.http_post → copylab-processor v1.4 (Supabase EF)
    → fetch brand_cache_snapshots (1 query, ~10ms)
    → inyecta brandContext en job.input
    → POST /api/execute → CopyLab v9.5 (Vercel)
      → detecta snapshot v2.0 → zero-query mode
      → buildPrompt() desde snapshot (sin Supabase)
      → callClaude() → Anthropic API (~15-30s)
      → ICR + pipeline completo ✅
    → patchJob(done, output)
  → job: status=done, output=copy listo

Browser path (dual) — sigue igual via UI:
  → POST /api/execute directo desde browser → CopyLab v9.5
  → mismo pipeline, misma calidad
```

---

## IDs Y REFERENCIAS CLAVE

| Recurso | ID / URL |
|---------|----------|
| Supabase proyecto | `amlvyycfepwhiindxgzw` |
| unrlvl-supabase-mcp Vercel | `prj_svtqNxIlwRvzMFYKmnOCAyK7GcQP` |
| CopyLab Vercel | `prj_5FebBMfTpo4aP5I7iJ98libUkTTe` |
| CopyLab último deploy | `dpl_7KrgtyvHD9sRdPDQghXFkTvwNyGY` |
| pg_cron job copylab-processor | jobid: 30 |
| copylab-processor EF | version: 5 (v1.4) |
| brand-cache-builder EF | `2c569c1d-61e6-4add-9d02-2261c2645716` |
| NeuroneSCF snapshot | brand_id: NeuroneSCF, 18 tablas, v2.0 |
| Job de prueba | `cd0b168c-aa7b-40d0-9076-7f8b15fb9ae6` |
| Vercel team | `team_fEH94Irp6BAI9YGm4btGna5n` |

---

## PRIMER MENSAJE DE PRÓXIMA SESIÓN

"Protocolo actualización — continuar sprint CopyLab async. Cargar este session_log. Primer paso: resetear job cd0b168c a queued. Luego resolver el 504 cold start de CopyLab — explorar opciones A (warm-up ping), B (fluid: true), C (handler format), E (endpoint /api/generate separado). Testear en ese orden."
