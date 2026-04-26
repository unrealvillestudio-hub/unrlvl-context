# UNRLVL Ecosystem — File Map
_Versión: 2026-04-25 · Generado desde ecosystem.json_

---

## Estructura del repositorio unrlvl-context

```
unrlvl-context/
├── ecosystem.json                    ← Master. SIEMPRE cargar al inicio.
├── ecosystem.md                      ← Narrativa. Carga junto al JSON.
├── ecosystem_filemap.md              ← Este archivo.
├── TIERS.md                         ← Precios y tiers UNRLVL
│
├── protocols/
│   └── SESSION_PROTOCOL.md          ← Protocolo completo de sesión
│
├── brands/
│   ├── UnrealvilleStudio/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   ├── session_log.md           ← ← ← ACTUALIZADO 2026-04-25
│   │   ├── PLAN_MAESTRO_LABS_SKILLS.md
│   │   ├── CRM_INTEGRATIONS.md
│   │   └── LUCIEN_BOOKS_MASTER.md
│   │
│   ├── NeuroneSCF/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   ├── ForumPHs/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   ├── session_log.md
│   │   ├── DOCUMENT_FACTORY_PLAN.md
│   │   └── FPHSOPS_SPEC.md
│   │
│   ├── DiamondDetails/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   │
│   ├── VizosCosmetics/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   │
│   ├── D7Herbal/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   │
│   ├── VivoseMask/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   │
│   └── PatriciaOsorioConectando/
│       ├── brand.json
│       └── BP_Brand_Context.md
│
└── agents/
    ├── social-media-agent/
    │   └── session_log.md
    └── ddmv-assistant/
        └── session_log.md
```

---

## Repos GitHub activos (org: unrealvillestudio-hub)

| Repo | Estado | Notas |
|---|---|---|
| **Orchestrator** | OR_1.1 LIVE | 4 tabs + approve-job + trigger-job + IID Intel + Layer indicators |
| **CopyLab** | v8.0 LIVE | Vercel protection OFF. /api/execute |
| **ImageLab** | ICR v1.0 LIVE | Vercel protection OFF. Psycho Layer nativo |
| **SocialLab** | LIVE | Vercel protection OFF. OAuth futuro |
| **CoreProject** | LIVE | unrealvillestudio.com EN+ES. Pending: Why UNRLVL v4 commit |
| **DDMV-Assistant** | v1.0 LIVE | WA Personal Care Agent +12602701806 |
| **Tools** | LIVE | GitHub Auditor proxy. Bug fix 2026-04-25 |
| **WebLab** | LIVE | Shopify module completo |
| **BlueprintLab** | LIVE | |
| **AgentLab** | LIVE | |
| **forumphs-document-factory** | v1.5 LIVE | ZIP→DOCX pipeline completo |
| **forumphs-speaks** | LIVE | speaks.forumphs.com. Foto Ivette pendiente |
| **LUCIEN-SAEL** | GENERATED | luciensael.com v2.1 pendiente deploy |
| **unrlvl-context** | LIVE | Este repositorio |
| **unrlvl-social-agent** | LIVE | SMA NeuroneSCF |
| **onboarding-app** | LIVE | Phase 4 |
| **UNRLVL-OPS** | LIVE | Cost Layer activo |

---

## Supabase Schemas

### public.* (principal)
- `brands` — contexto completo de cada marca
- `lab_configs` — registro de labs + iid_stage_order + supports_iid
- `brand_voices` — ICR rules, tone, image_style
- `humanize_profiles` — perfiles de humanización por marca
- `psycho_presets` — presets Psycho Layer para ImageLab
- `scheduled_posts` — cola de publicación (pending_oauth)
- `content_calendar` — (crm.*)

### intel.* (IID Network)
- `iid_agents` — 14 agentes con tier y config
- `iid_findings` — hallazgos puntuados (ecosystem_score, content_score)
- `iid_research_raw` — datos crudos de investigación
- `iid_content_queue` — piezas listas para Content Engine
- `iid_briefs` — briefs biweekly generados
- `iid_cron_runs` — log de ejecuciones
- `iid_scheduler_config` — config global (vercel_bypass_secret, etc.)

### content.* (Content Engine)
- `orchestrator_jobs` — jobs por item de queue (assets JSONB + labs_status)
- `content_pieces` — piezas finales con assets completos
- `brand_voices` — (ver public)
- `content_calendar` — programación
- `content_performance` — métricas

---

## Supabase Edge Functions (content pipeline)

| Función | Versión | Propósito |
|---|---|---|
| `content-dispatcher` | v2.3 | Kick-starter ligero: crea jobs + dispara stage 1 |
| `content-run-stage` | v1.2 | Ejecuta un Lab + encadena siguiente stage |
| `aife-filter` | v1.1 | Elimina huella AI del copy |
| `iid-core` | v3 | Orquesta IID per-agent |
| `iid-research` | v1 | Research raw |
| `iid-process` | v1 | Procesamiento JSON → findings |
| `iid-brief-generator` | v2 | Genera brief biweekly |
| `iid-ecommerce` | v4 | Agente especializado e-commerce |
| `iid-ecommerce-research` | v1 | Research e-commerce |
| `unrlvl-profiler` | v11 | Lead profiler |
| `fphs-chat` | v9 | ForumPHs chat |
| `fphs-session` | v9 | ForumPHs session |

---

## Variables de entorno críticas

### Supabase (todas las EFs del content pipeline)
```
SUPABASE_URL=https://amlvyycfepwhiindxgzw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[desde dashboard]
IID_CRON_SECRET=c09bb631891449b83f5cee73476cf5d997c6a5c439b28eb5
RESEND_API_KEY=[desde Resend]
VERCEL_BYPASS_SECRET=3Oll9BRBBXGeR9QGa1iI0uyGDsV1QzeU
ORCHESTRATOR_URL=https://orchestrator-unrlvl.vercel.app
```

### Orchestrator (proyecto Vercel)
```
SUPABASE_URL=https://amlvyycfepwhiindxgzw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[desde dashboard]
IID_CRON_SECRET=c09bb631891449b83f5cee73476cf5d997c6a5c439b28eb5
SOCIALLAB_URL=https://social-lab-flame.vercel.app
RESEND_API_KEY=[desde Resend]
```

---

## Flujos de datos clave

### IID Network (semanal, automático)
```
pg_cron (27 jobs) → iid-research → iid_research_raw
                 → iid-process → iid-core → iid_findings
                                           → iid_content_queue
                                           → iid_briefs → email Sam
```

### Content Engine (cada 30 min, cuando hay pendientes)
```
iid_content_queue [pending]
→ content-dispatcher [Supabase EF]
→ orchestrator_jobs [created]
→ content-run-stage stage=1 [CopyLab]
→ content-run-stage stage=2 [AIFE]
→ content-run-stage stage=3 [ImageLab]
→ content-run-stage stage=4 [SocialLab]
→ content_pieces [assets completos]
→ email Sam [PUBLICAR / RECHAZAR]
→ approve-job → SocialLab publica
```

**BUG ACTIVO (2026-04-25):** El dispatcher v2.3 crea los jobs pero el stage runner no se dispara. `EdgeRuntime.waitUntil()` no mantiene vivas las fetches en Supabase Deno. Fix pendiente próxima sesión.

---

## Próxima sesión — Checklist

- [ ] **FIX #1 BLOQUEANTE:** Dispatcher → Stage runner. Hacer fetch síncrono (await) antes de retornar Response
- [ ] Test 1 solo job para validar
- [ ] Pipeline completo → email aprobación → Sam → PUBLICAR
- [ ] Cerrar sprint Orchestrator + Actualiza final
- [ ] Lucien Books — Brief Libro 1 (Sam trae pensamiento libre)
- [ ] NeuroneSCF B2B — brand_ids + acento navy
- [ ] Shopify-auditor Fase 1 — Admin API tokens
- [ ] ForumPHs — datos 8+ edificios + foto Ivette
- [ ] COMMIT Why UNRLVL v4 → CoreProject
- [ ] DEPLOY luciensael.com v2.1
