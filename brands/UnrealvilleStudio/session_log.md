# Session Log — Pipeline Orgánico + Arquitectura Async Claude↔Ecosistema
_infrastructure/meta-mcp/session_log.md_
_Claude Sonnet 4.6 + Opus 4.7 · UNRLVL Sprint 2026-05-27_

---

## 2026-05-27 — Sesión 4+5 · El Sprint más revelador — Pipeline completo + 13 bugs raíz resueltos

### Resumen ejecutivo
Sprint de ~12 horas. Se completó la arquitectura dual-mode del pipeline orgánico, se estableció el canal nativo Claude↔Ecosistema via Supabase bus, se introdujo Opus 4.7 como Tech Lead en Claude Code, y se descubrieron + resolvieron 13 bugs raíz críticos que bloqueaban el pipeline. Estado al cierre: pipeline funcional hasta approval gate validado, ImageLab pendiente nueva GEMINI_API_KEY de cuenta unrealvillestudio.

---

## ESTADO FINAL DE DEPLOYS

| Repo | Commit | Estado |
|---|---|---|
| Orchestrator | `1582eda` (+ `cd21193` local) | ✅ READY |
| SocialLab | `2fac986` | ✅ READY |
| ImageLab | `17b4c24` | ✅ READY |
| VideoLab | `a91eee3` + `f3080ce` + `6421c23` | ✅ READY |
| lab-worker EF | v14 (v3.0) | ✅ ACTIVE |
| Migration lab_jobs | `lab_jobs_orchestrator` | ✅ APPLIED |

---

## BUGS RAÍZ DESCUBIERTOS Y RESUELTOS

### Bug #1 — VITE_* env vars en handlers serverless (CRÍTICO — patrón sistémico)
- **Causa:** Variables con prefijo VITE_ solo existen en build-time Vite. En runtime Vercel serverless devuelven `undefined` → fetch a URL relativa → hang indefinido → FUNCTION_INVOCATION_TIMEOUT
- **Afectó:** ImageLab `api/execute.ts`, SocialLab `api/execute.ts` + `api/publish.ts`
- **Fix:** Renombrar a `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`
- **Regla permanente:** NUNCA usar prefijo VITE_ en directorio `api/`. Solo en `src/`

### Bug #2 — Edge Runtime no recibe env vars del proyecto Vercel
- **Causa:** `export const config = { runtime: 'edge' }` en `approve-job.ts` → process.env devuelve `''` → Supabase 401 → 404 fake al cliente
- **Fix:** Quitar config Edge → Node runtime las recibe correctamente
- **Aprendizaje:** Edge Runtime para waitUntil/streaming. Node Runtime para queries a Supabase

### Bug #3 — pg_net trigger solo disparaba con status='pending'
- **Causa:** `IF NEW.status = 'pending'` — jobs con status='queued' nunca procesados
- **Fix:** `IF NEW.status IN ('pending','queued')`
- **Descubierto por:** Opus durante smoke test autónomo

### Bug #4 — Error reporting silencioso en sbFetch
- **Causa:** sbFetch devolvía null en cualquier error HTTP → handler interpretaba null como "job no existe" → 404 engañoso
- **Fix:** `SbResult<T>` wrapper con `sb_status` + `sb_body` + distinción error técnico vs job ausente

### Bug #5 — Accept-Profile/Content-Profile headers causan 406 en PostgREST
- **Causa:** Header defensivo `Accept-Profile: public` causaba 406 Not Acceptable
- **Fix:** Remover — PostgREST ya usa public por defecto
- **Ironía:** El header "defensivo" introdujo el bug

### Bug #6 — GEMINI_API_KEY de cuenta desactivada (blackout-business)
- **Causa:** API key provenía de cuenta Google desactivada → timeouts silenciosos de 300s
- **Fix pendiente:** Crear nueva key desde cuenta unrealvillestudio + actualizar en Vercel image-lab
- **Acción:** Sam crea key y actualiza `GEMINI_API_KEY` en Vercel image-lab

### Bug #7 — Columnas legacy NOT NULL sin default en lab_jobs
- **Causa:** Columnas `lab` y `pack` tenían NOT NULL del schema original email sequences
- **Fix:** `ALTER COLUMN lab DROP NOT NULL; ALTER COLUMN pack DROP NOT NULL`

### Bug #8 — HubModule sin brand selector
- **Fix:** Dropdown con 14 marcas desde Supabase, default UnrealvilleStudio

### Bug #9 — brandId + previousOutputs no pasaban entre stages
- **Fix:** FlowExecutorModule propaga brandId + previousOutputs acumulados

### Bug #10 — CopyLab recibía prompt genérico, no el del usuario
- **Fix:** interpret-intent post-procesa stages → copylab.description = userPrompt

### Bug #11 — new URL(req.url) crashea en Node runtime (ruta relativa)
- **Fix:** Opus añadió guard en handleLegacyGet — commit cd21193

### Bug #12 — Imagen 3.0 generate-002 tarda 120-300s
- **Fix:** Cambiar a `imagen-3.0-fast-generate-001` (30-60s típico)
- **Commit:** `17b4c24`

### Bug #13 — Trigger-job timeout en Vercel Node.js serverless
- **Causa raíz:** Vercel Node.js mata processes background al responder
- **Fix arquitectural:** Pipeline vive en lab-worker EF (EdgeRuntime.waitUntil) — trigger-job es thin wrapper INSERT + 202

---

## ARQUITECTURA CANAL NATIVO CLAUDE↔ECOSISTEMA

```
Claude → INSERT lab_jobs {job_type, brand_id, prompt, status:'pending'}
  → pg_net trigger (IF status IN ('pending','queued'))
  → lab-worker EF v14 (EdgeRuntime.waitUntil)
  → processOrchestratorJob:
      Stage 1: PromptBuilder → brand_cache_snapshots → stage_outputs.brand_context
      Stage 2: CopyLab (~14-16s) → stage_outputs.copylab
      Stage 3: ImageLab child job async → poll 5s/300s → stage_outputs.imagelab
      Stage 4: VideoLab child job async → poll 5s/300s → stage_outputs.videolab
      APPROVAL GATE → status='pending_approval' + approval_payload completo
  → Claude lee SELECT lab_jobs WHERE status='pending_approval'
  → Claude presenta copy + image_preview a Sam
  → Sam: "aprueba" → Claude POST /api/approve-job {job_id, decision:'approved'}
  → approve-job: UPDATE padre + INSERT orchestrator_publish child
  → lab-worker: processOrchestratorPublishJob:
      Stage 5: SocialLab → scheduled_posts
      Stage 6: Meta MCP /api/publish → platform_post_ids
  → UPDATE lab_jobs padre: status='completed' + output_parsed
  → Claude lee resultado final
```

---

## WORKFLOW OPUS 4.7 COMO TECH LEAD

**Establecido en esta sesión:**
1. Claude Chat: diagnóstica root cause + diseña arquitectura + genera instrucciones
2. Opus en Claude Code: lee repos completos, ejecuta con autonomía, diagnostica bugs colaterales, corre smoke tests propios
3. Claude Chat: verifica deploys via Vercel MCP + corre smoke tests finales via Supabase MCP

**Capacidades confirmadas de Opus:**
- Detecta bugs no mencionados en el prompt (VITE_* patrón, pack NOT NULL, trigger status)
- Corre smoke tests end-to-end autónomos con Supabase MCP
- Hace push y verifica estado del deploy
- Diagnostica desde logs de Vercel

---

## PENDIENTES PARA PRÓXIMA SESIÓN

### 🔴 BLOQUEANTE — GEMINI_API_KEY
- Sam crea nueva API key de Google en cuenta unrealvillestudio
- Actualizar en Vercel → image-lab → `GEMINI_API_KEY` (sin prefijo VITE_)
- Re-correr smoke test con imagen: INSERT lab_jobs con prompt que incluya imagen

### 🟡 PENDIENTE — Smoke test final completo
- Una vez GEMINI_API_KEY actualizada:
  1. INSERT job_type=orchestrator con imagen
  2. Esperar pending_approval con image_url real
  3. POST /api/approve-job → verificar orchestrator_publish → SocialLab → Meta MCP
  4. Confirmar platform_post_ids en output_parsed

### 🟡 PENDIENTE — approve-job commit cd21193
- Opus hizo push de cd21193 pero el deploy Vercel no lo recogió
- Verificar si está en production o si hay que re-push

### 🔵 PENDIENTE — NeuroneSCF IG (Laura)
- Asignar instagram account al system user UNRLVL

### 🔵 PENDIENTE — Privacy/data-deletion pages
- unrealvillestudio.com para Meta App Review

### 🔵 PENDIENTE — VideoLab multi-frame stitching
- Hoy /api/execute solo manda frames[0].prompt
- Follow-up cuando Kling exponga capacidad multi-frame

### 🔵 PENDIENTE — ecosystem.json actualización
- Registrar todos los cambios de esta sesión: nuevas columnas lab_jobs, lab-worker v3.0, triggers, commits

---

## REGLAS OPERATIVAS ESTABLECIDAS (permanentes)

1. **NUNCA VITE_* en api/**: Solo en src/ (cliente Vite)
2. **Node Runtime para Supabase**: Edge Runtime no recibe env vars del proyecto Vercel
3. **Service Role en handlers serverless**: Bypasa RLS, necesario para INSERT/PATCH
4. **pg_net trigger**: Siempre verificar que filtra por todos los status relevantes
5. **Error reporting**: sbFetch siempre debe exponer sb_status + sb_body al cliente
6. **Auditoría de repos nuevos**: Buscar process.env.VITE_* en api/ antes de cualquier deploy

---

## ESTADO FINAL ECOSISTEMA AL CIERRE

### lab_jobs schema (nuevas columnas)
`job_type`, `prompt`, `platforms`, `aspect_ratio`, `auto_publish`, `parent_job_id`, `approval_payload`, `approved_at`, `approved_by`, `rejected_reason`, `decision_notes`, `failed_at_stage`, `stage_outputs`, `output_parsed`

### lab_jobs status válidos
`pending`, `queued`, `processing`, `running`, `completed`, `error`, `failed`, `pending_approval`, `approved`, `rejected`

### lab-worker v3.0 (v14) — dispatchers
`copylab` (original), `orchestrator`, `imagelab`, `videolab`, `orchestrator_publish`

### Vercel env vars estado
| Proyecto | SUPABASE_URL | SUPABASE_SERVICE_ROLE_KEY | GEMINI_API_KEY |
|---|---|---|---|
| orchestrator | ✅ | ✅ | N/A |
| social-lab | ✅ | ✅ | N/A |
| image-lab | ✅ | ✅ | ⚠️ PENDIENTE nueva key |
| video-lab | N/A | N/A | N/A (Kling keys ✅) |

