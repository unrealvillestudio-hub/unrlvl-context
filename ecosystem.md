# UNRLVL Ecosystem — Narrative Reference
_Versión: 2026-04-26 · Generado desde ecosystem.json_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure. North Miami, FL. Fundador público: **Lucien Sael** (seudónimo de Sam). Web: unrealvillestudio.com (LIVE EN+ES).

---

## IID Network — OPERATIONAL ✅

Sistema de inteligencia que investiga, puntúa y convierte hallazgos en contenido público y mejoras internas.

### Arquitectura two-step (permanente)

```
pg_cron → iid-research (Claude + web_search → iid_research_raw)
        → iid-process  (estructura JSON → iid-core → dos streams)
```

**Stream Ecosystem:** findings ≥70 → `intel.iid_findings` → brief biweekly email Sam.  
**Stream Content:** findings ≥70 (content_score) → `intel.iid_content_queue` → Content Engine → SocialLab.

### 14 agentes, 27 crons

IID-CORE · IMAGE · VIDEO · VOICE · LLM · META · TIKTOK · GOOGLE · LINKEDIN · X · ECOMMERCE · FLORIDA · WHOLESALE · PERSONAL-BRAND

Primer run IID-ECOMMERCE: 2026-04-24. 4 findings reales.

---

## Content Engine — OPERATIONAL ✅

**Primer email de aprobación confirmado recibido: 2026-04-26.**

### Flujo real en producción

```
iid_content_queue (pending)
  ↓ content-dispatcher (Supabase EF)
  ↓ crea content.orchestrator_jobs
content-run-stage v1.10
  ↓ copylab:   Claude directo desde EF (~9s)   ✅
  ↓ aife:      Vercel AIFE EF (~4s)            ✅
  ↓ imagelab:  Vercel 50s AbortSignal skip     ⚠️ fix pendiente
  ↓ sociallab: Claude directo + scheduled_posts ✅
  ↓ content_pieces (awaiting_approval)
  ↓ email Sam: PUBLICAR AHORA / RECHAZAR
  ↓ approve-job → published
```

**Tiempo total pipeline:** ~71 segundos.  
**Bug resuelto:** EdgeRuntime.waitUntil reemplazado por arquitectura síncrona.  
**Cost tracking:** cada lab run se loguea automáticamente en `ops_generation_ledger`.

### Lab contracts

| Lab | Modo pipeline | Costo/run |
|---|---|---|
| CopyLab | Claude directo EF (no Vercel) | ~$0.015 |
| AIFE | Vercel EF | ~$0.008 |
| ImageLab | Vercel 50s skip → fix a EF directo | ~$0.05 |
| SocialLab | Claude directo EF (no Vercel) | ~$0.008/plataforma |
| VideoLab | fal.ai async (Fase 2) | $0.07/seg |

**brandId para IID:** `"UnrealvilleStudio"` (voces unrlvl y lucien).  
**OAuth:** posts en `scheduled_posts` con `pending_oauth`. Conexión real Meta/LinkedIn/TikTok/X = Fase 1.

---

## AI Labs Strategy v1.0

**Documento de referencia permanente:** `docs/UNRLVL_Labs_Strategy.html`

### 8 Labs — Ecosistema completo

| Stage | Lab | Provider | Estado |
|---|---|---|---|
| 01 | CopyLab | Claude Sonnet 4 (directo) | ✅ Live |
| 02 | AIFE | Claude Sonnet 4 (directo) | ✅ Live |
| 03 | ImageLab | fal.ai / Imagen 3 | ⚠️ Fix pendiente |
| 04 | SocialLab | Claude Sonnet 4 (directo) | ✅ Live |
| 05 | VideoLab | fal.ai / Kling 2.5 Turbo Pro | 🔲 Fase 2 |
| 06 | VoiceLab | ElevenLabs API | 🔲 Fase 3 |
| 07 | AvatarLab | HeyGen API | 🔲 Fase 4 |
| 08 | PodcastLab | Multi-lab + Creatomate | 🔲 Fase 5 |

### fal.ai como Media Bus

Una sola API key, 50+ modelos. Cambiar modelo = cambiar string en `lab_configs.default_params`. No hay código nuevo.

**VideoLab — arquitectura async obligatoria:**
Stage runner envía POST a fal.ai → `{request_id}` en 2s, retorna. EF `fal-poller` (cron 30s) consulta y actualiza piece. Resuelve el wall clock de Supabase.

### Árbol de decisión

```
¿Genera texto/copy?          → Claude (Anthropic directo)
¿Genera imagen estática?     → fal.ai (Imagen 3 o FLUX)
¿Genera video <30s social?   → fal.ai / Kling Turbo Pro
¿Talking head / presenter?   → HeyGen API
¿Voz de marca?               → ElevenLabs API
¿Composición multi-modal?    → PodcastLab + Creatomate
¿Nuevo tipo de contenido?    → verificar en fal.ai primero
```

### Costo por pieza (fullstack)

| Tier | Labs | Costo/pieza |
|---|---|---|
| Básico | Copy + AIFE + Image + Social | ~$0.08 |
| Estándar | + VideoLab (10s) | ~$0.77 |
| Premium | + VoiceLab + AvatarLab | ~$3.17 |
| Flagship | + PodcastLab (episodio 5min) | ~$4.00 |

### Infraestructura total Fase 5 completa: ~$255-340/mes

---

## OPS Cost Tracking — LIVE ✅

### Schema en Supabase (desde 2026-04-26)

**`ops_generation_ledger`** — una fila por lab run. Auto-logueado desde content-run-stage v1.10.

**`ops_lab_rates`** — rate card activa:
- Imagen 3: $0.05/image · FLUX Schnell: $0.025/image
- Kling 2.5 Turbo Pro: $0.07/seg · Veo 3.1 Lite: $0.05/seg
- ElevenLabs multilingual v2: $0.15/1K chars
- HeyGen avatar v2: $0.08/seg
- Creatomate: $0.10/render

**KPI Views disponibles:**

```sql
SELECT * FROM v_ops_cost_by_client_month;   -- costo total por cliente
SELECT * FROM v_ops_cost_by_lab_month;      -- qué labs cuestan más
SELECT * FROM v_ops_cost_per_piece;         -- costo fully loaded por pieza
SELECT * FROM v_ops_pipeline_kpis;          -- completion rate, publish rate
SELECT * FROM v_ops_content_velocity;       -- piezas/día por marca
SELECT * FROM v_ops_lab_health;             -- failure rates y latencia
SELECT * FROM v_ops_monthly_dashboard;      -- dashboard con margen
```

---

## Orchestrator — OR_1.1

**URL:** orchestrator-unrlvl.vercel.app  
**Tabs:** Orchestrator · Launchpad · Monitor · IID Intel

- `api/approve-job.ts` — 1-click email approval
- `api/trigger-job.ts` — trigger programático IID
- **OAuth UI pendiente** — `/oauth` page para conectar cuentas sociales

---

## GitHub Auditor

**URL:** unrlvl-tools.vercel.app/api/gh

```
Tree:  ?repo=NAME&action=tree
File:  ?repo=NAME&path=src/file.ts
```

---

## Supabase

**Project:** amlvyycfepwhiindxgzw  
**Plan:** Free (150s EF wall clock) — upgrade a Pro al activar VideoLab  
**Schemas:** public · intel (IID) · content (Content Engine)

### Edge Functions activas (content pipeline)

```
content-dispatcher   v2.3  — ACTIVE (síncrono)
content-run-stage    v1.10 — ACTIVE (direct EF calls + cost logging)
context-cache        v4    — ACTIVE (brand context cache, 11 triggers)
aife-filter          v1.1  — ACTIVE
```

### Secrets activos en EF
`ANTHROPIC_API_KEY` · `RESEND_API_KEY` · `IID_CRON_SECRET` · `SUPABASE_SERVICE_ROLE_KEY` · `ORCHESTRATOR_URL` · `VERCEL_BYPASS_SECRET`

### Secrets pendientes
`GEMINI_API_KEY` (Fase 1) · `FAL_API_KEY` (Fase 1) · `ELEVENLABS_API_KEY` (Fase 3) · `HEYGEN_API_KEY` (Fase 4) · `CREATOMATE_API_KEY` (Fase 5)

---

## Próxima sesión — Ejecución inmediata

1. **BLOQUEANTE** — Test approval flow: piece `e75bdb73` → botón PUBLICAR → verificar `piece.status = published`
2. **ImageLab fix** — `GEMINI_API_KEY` en EF secrets → deploy v1.11 con `callImagenDirect()`
3. **fal.ai account** — crear cuenta, `FAL_API_KEY` a EF secrets
4. **OAuth social** — `brand_oauth_tokens` tabla + flows Meta/LinkedIn/TikTok/X para Unrealville + Lucien + EF `social-publisher`
5. **Labs Tests T1-T7**

**Paralelo:** Lucien Books Libro 1 · NeuroneSCF B2B · ForumPHs edificios · Deploy luciensael.com
