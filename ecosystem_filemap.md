# UNRLVL Ecosystem — File Map
_Versión: 2026-04-26 · Generado desde ecosystem.json_

---

## Estructura del repositorio unrlvl-context

```
unrlvl-context/
├── ecosystem.json                    ← Master. SIEMPRE cargar al inicio.
├── ecosystem.md                      ← Narrativa. Carga junto al JSON.
├── ecosystem_filemap.md              ← Este archivo.
├── TIERS.md                         ← Precios y tiers UNRLVL
│
├── docs/
│   └── UNRLVL_Labs_Strategy.html    ← ← ← NUEVO 2026-04-26 — Estrategia AI Labs
│
├── protocols/
│   └── SESSION_PROTOCOL.md          ← Protocolo completo de sesión
│
├── brands/
│   ├── UnrealvilleStudio/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   ├── session_log.md           ← ← ← ACTUALIZADO 2026-04-26
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
| **Orchestrator** | OR_1.1 LIVE | 4 tabs + approve-job + trigger-job + IID Intel + Layer indicators. OAuth UI pendiente. |
| **CopyLab** | v8.1 LIVE | maxDuration=60. Vercel protection OFF. Pipeline IID lo bypasea (Claude directo EF). |
| **ImageLab** | v1.0 LIVE ⚠️ | maxDuration=60 (warnings). Vercel 50s timeout pendiente fix. Target: direct EF call. |
| **SocialLab** | LIVE | maxDuration=60. Vercel protection OFF. Pipeline IID lo bypasea (Claude directo EF). |
| **CoreProject** | LIVE | unrealvillestudio.com EN+ES. Pending: Why UNRLVL v4 commit. |
| **DDMV-Assistant** | v1.0 LIVE | WA Personal Care Agent +12602701806 |
| **Tools** | LIVE | GitHub Auditor proxy. Bug fix 2026-04-25. |
| **WebLab** | LIVE | Shopify module completo |
| **BlueprintLab** | LIVE | |
| **AgentLab** | LIVE | |
| **forumphs-document-factory** | v1.5 LIVE | ZIP→DOCX pipeline completo |
| **forumphs-speaks** | LIVE | speaks.forumphs.com. Foto Ivette pendiente. |
| **LUCIEN-SAEL** | GENERATED | luciensael.com v2.1 pendiente deploy |
| **unrlvl-context** | LIVE | Este repositorio |
| **unrlvl-social-agent** | LIVE | SMA NeuroneSCF |
| **onboarding-app** | LIVE | Phase 4 |
| **UNRLVL-OPS** | LIVE | Cost Layer + 8 KPI views activas |
| **VideoLab** | PLANNED Fase 2 | Vercel project prj_R0t1QvEnagCNn71Qq4iBLwgxy1MJ — por implementar |

---

## Supabase Schemas

### public.* (principal)
- `brands` — contexto completo de cada marca
- `lab_configs` — registro de labs + iid_stage_order + supports_iid
- `brand_voices` — ICR rules, tone, image_style
- `humanize_profiles` — perfiles de humanización
- `psycho_presets` — presets Psycho Layer para ImageLab
- `scheduled_posts` — cola de publicación (pending_oauth)
- `brand_context_cache` — cache de contexto por marca (dirty flag + TTL)
- `brand_oauth_tokens` — **PENDING crear próxima sesión** — tokens OAuth por plataforma
- `ops_generation_ledger` — **NUEVO 2026-04-26** — ledger de costos por lab run
- `ops_lab_rates` — **NUEVO 2026-04-26** — rate card providers media
- `ops_services` · `ops_costs` · `ops_client_monthly` · `ops_thresholds` · `ops_renewals` · `ops_insights` — infraestructura OPS existente
- `ops_model_pricing` · `ops_token_sessions` · `ops_model_alerts` — token tracking

### intel.* (IID Network)
- `iid_agents` — 14 agentes con tier y config
- `iid_findings` — hallazgos puntuados (ecosystem_score, content_score)
- `iid_research_raw` — datos crudos
- `iid_content_queue` — piezas listas para Content Engine
- `iid_briefs` — briefs biweekly
- `iid_cron_runs` — log de ejecuciones
- `iid_scheduler_config` — config global (vercel_bypass_secret, etc.)

### content.* (Content Engine)
- `orchestrator_jobs` — jobs por item de queue
- `content_pieces` — piezas finales con assets
- `brand_voices` — voces por marca
- `content_calendar` — programación
- `content_performance` — métricas

---

## Supabase Edge Functions (pipeline activo)

| Función | Versión | Propósito |
|---|---|---|
| `content-dispatcher` | v2.3 | Crea jobs + dispara stage 1 (síncrono) |
| `content-run-stage` | v1.10 | Ejecuta labs + encadena stages + auto cost logging |
| `context-cache` | v4 | Brand context cache (11 triggers dirty flag) |
| `aife-filter` | v1.1 | Elimina huella AI del copy |
| `iid-core` | v1.1 | Orquesta IID per-agent |
| `iid-research` | v1 | Research raw |
| `iid-process` | v1 | Procesamiento JSON → findings |
| `iid-brief-generator` | v2 | Brief biweekly |

**Pendientes:**
- `social-publisher` — cron 15min para publicar `scheduled_posts` (Fase 1)
- `fal-poller` — cron 30s para VideoLab async (Fase 2)

---

## KPI Views OPS (todas en schema public)

```sql
v_ops_cost_by_client_month    -- costo por cliente/mes
v_ops_cost_by_lab_month       -- costo por lab/mes
v_ops_cost_by_output_type     -- post vs imagen vs video vs adaptación
v_ops_cost_per_piece          -- costo fully loaded por pieza
v_ops_pipeline_kpis           -- completion rate, publish rate, avg time
v_ops_content_velocity        -- piezas/día por marca y plataforma
v_ops_lab_health              -- failure rates y latencia por lab
v_ops_monthly_dashboard       -- dashboard: compute + infra + retainer + margen
```

---

## Variables de entorno críticas

### Supabase EF secrets (activas)
```
SUPABASE_URL=https://amlvyycfepwhiindxgzw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[desde dashboard]
IID_CRON_SECRET=c09bb631891449b83f5cee73476cf5d997c6a5c439b28eb5
RESEND_API_KEY=[desde Resend]
VERCEL_BYPASS_SECRET=3Oll9BRBBXGeR9QGa1iI0uyGDsV1QzeU
ORCHESTRATOR_URL=https://orchestrator-unrlvl.vercel.app
ANTHROPIC_API_KEY=[desde Anthropic Console]
```

### Supabase EF secrets (pendientes)
```
GEMINI_API_KEY     ← Fase 1 — aistudio.google.com
FAL_API_KEY        ← Fase 1 — fal.ai dashboard
ELEVENLABS_API_KEY ← Fase 3 — elevenlabs.io
HEYGEN_API_KEY     ← Fase 4 — heygen.com
CREATOMATE_API_KEY ← Fase 5 — creatomate.com
```

### Orchestrator (Vercel project)
```
SUPABASE_URL · SUPABASE_SERVICE_ROLE_KEY · IID_CRON_SECRET · SOCIALLAB_URL · RESEND_API_KEY
```

---

## Próxima sesión — Checklist ejecutable

- [ ] **T1 BLOQUEANTE:** Approval flow — `GET /api/approve-job?token=...&action=approve` → piece.status=published
- [ ] **T2:** ImageLab fix — GEMINI_API_KEY + content-run-stage v1.11 con callImagenDirect()
- [ ] **T3:** fal.ai account → FAL_API_KEY en EF secrets
- [ ] **T4:** OAuth — tabla brand_oauth_tokens + flows Meta/LinkedIn/TikTok/X + EF social-publisher
- [ ] **T5-T7:** Labs Tests suite completa
- [ ] **Paralelo:** Lucien Books Libro 1 · NeuroneSCF B2B · ForumPHs · Deploy luciensael.com
