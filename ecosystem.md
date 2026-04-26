# UNRLVL Ecosystem — Narrative Reference
_Versión: 2026-04-25 · Generado desde ecosystem.json_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure. North Miami, FL. Fundador público: **Lucien Sael** (seudónimo de Sam). Web: unrealvillestudio.com (LIVE EN+ES).

---

## IID Network — OPERATIONAL

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

## Content Engine — CONSTRUIDO (pipeline pendiente validación completa)

### Flujo diseñado y construido

```
iid_content_queue (pending)
  ↓ content-dispatcher (Supabase EF, cron cada 30 min)
  ↓ crea content.orchestrator_jobs + dispara content-run-stage(job, stage=1)
content-run-stage: CopyLab → AIFE → ImageLab → SocialLab
  (cada Lab es una invocación Edge Function independiente, ~60s cada una)
  ↓ pipeline completo → content_pieces.assets
Email Sam: preview AIFE-filtered + [PUBLICAR AHORA] + [RECHAZAR]
  ↓ click → Orchestrator /api/approve-job → SocialLab publica
```

### BUG ACTIVO (2026-04-25)

El dispatcher crea los jobs correctamente pero el stage runner no se dispara. Hipótesis: `EdgeRuntime.waitUntil()` en Supabase Deno no mantiene vivas las fetches fire-and-forget. Fix candidato: hacer el fetch síncrono antes de retornar la Response. Próxima sesión.

### Lab contracts (verificados con código real)

| Lab | Envía | Recibe |
|---|---|---|
| CopyLab | `{brandId, stage, params{pack, canal, extra_instructions}, previousOutputs}` | `{output: string, status: 'ok'}` |
| AIFE | `{brandId, stage, params{voice}, previousOutputs.copylab}` | `{output: filtered, aife_filtered: filtered}` |
| ImageLab | `{brandId, stage, params{canal, psycho_preset}, previousOutputs.copylab}` | `{output, image_data_url: base64}` |
| SocialLab | `{brandId, stage, params{platforms}, previousOutputs.copylab}` | `{output, results[{platform, post_id, status}]}` |

**brandId para IID:** `"UnrealvilleStudio"` (voces unrlvl y lucien).  
**Psycho Layer:** nativo en ImageLab vía `psycho_presets` tabla, no construir aparte.  
**SocialLab OAuth:** sprint futuro, posts van a `scheduled_posts` con `pending_oauth`.

---

## Orchestrator — OR_1.1

**URL:** orchestrator-unrlvl.vercel.app  
**Tabs:** Orchestrator · Launchpad · Monitor · **IID Intel** (nuevo)

### Endpoints nuevos (en repo)
- `api/approve-job.ts` — 1-click email approval (Edge runtime)
- `api/trigger-job.ts` — trigger programático IID

### UI upgrades
- **EcosystemIntelModule** — Bands TOP/WATCHLIST/DISCARDED, cards con R1-R6
- **FlowExecutorModule** — Layer indicators: Humanize (CopyLab, índigo), AIFE Filter (AIFE, ámbar), Psycho Layer (ImageLab, violeta). Estados: idle → running (pulsa + reloj) → done (verde + tiempo)

---

## Labs

| Lab | Estado | Notas |
|---|---|---|
| CopyLab | PASSED v8.0 | Vercel protection OFF · brandId requerido · puede tardar >90s |
| ImageLab | PASSED ICR v1.0 | Vercel protection OFF · Psycho Layer nativo |
| SocialLab | PASSED | Vercel protection OFF · OAuth futuro |
| Orchestrator | OR_1.1 LIVE | 4 tabs + approve-job + trigger-job |
| UNRLVL-OPS | LIVE | Cost Layer. Ecosystem Intel → movido al Orchestrator |
| VideoLab | BLOQUEADO | HeyGen + Kling keys |
| VoiceLab | BLOQUEADO | ElevenLabs voice IDs |

---

## GitHub Auditor

**URL:** unrlvl-tools.vercel.app/api/gh  
**Bug fix 2026-04-25:** reordenamiento de condiciones en `api/gh.js`. Tree y file contents funcionan.

```
Tree:  ?repo=NAME&action=tree
File:  ?repo=NAME&path=src/file.ts
```

---

## Supabase

**Project:** amlvyycfepwhiindxgzw  
**Schemas activos:** public · crm · fph · ops · **intel** (IID) · **content** (Content Engine)  
**Exposed a PostgREST:** public, intel, content  
**RLS:** intel.* y content.* → SELECT para authenticated, escritura solo service_role  
**pg_net nota:** DNS timeout para supabase.co desde Postgres. No usar para llamar Edge Functions — usar fetch() desde EF context.

### Edge Functions activas (content pipeline)

```
aife-filter v1.1         — ACTIVE
content-dispatcher v2.3  — ACTIVE (bug: stage no se dispara)
content-run-stage v1.2   — ACTIVE (auth: x-cron-secret)
```

---

## Próxima sesión — Prioridades

1. **FIX BUG dispatcher → stage runner** (awaiting fetch síncrono)
2. **Test pipeline completo con 1 job**
3. **Primer email de aprobación → Sam → PUBLICAR**
4. Lucien Books — Brief Libro 1
5. NeuroneSCF B2B — brand_ids + acento navy
6. ForumPHs — datos edificios + foto Ivette
