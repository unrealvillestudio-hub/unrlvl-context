# Ecosystem Filemap — Unrealville Studio
_Generado desde ecosystem.json v2026-05-31-v1 · No editar manualmente_

---

## Flujos principales

### Copy Pipeline (OPERACIONAL)
```
Sam/Claude → CopyLab UI (Orchestrator)
         → lab_jobs (Supabase)
         → pg_cron job #30 (1 min)
         → copylab-processor EF
         → brand_cache_snapshots (contexto)
         → CopyLab v9.7
         → output → Shopify / Klaviyo
```

### Brand Cache (OPERACIONAL)
```
brand-cache-builder EF
  └─ action=build → brand_cache_snapshots (NeuroneSCF v2.0)
  └─ action=build_all → todas las marcas
  └─ action=status → estado actual

CopyLab detecta: isV2 = Array.isArray(bc.creative_vectors)
Modos: v2.0_zero_query | v1.x_partial | no_cache
```

### Pipeline Orchestrator — End-to-End (OPERACIONAL 2026-05-29)
```
Claude.ai
  └─ INSERT lab_jobs (Supabase)
       └─ pg_net → lab-worker EF
            └─ brand_context (Supabase)
            └─ CopyLab → copy generado
            └─ ImageLab → imagen generada
            └─ assets → Supabase CDN
            └─ status → pending_approval
                 └─ Sam aprueba (UI)
                      └─ Meta MCP
                           └─ IG + FB publicados
```

### Meta MCP (LIVE)
```
Servidor: unrlvl-meta-mcp.vercel.app
  └─ /api/mcp/mcp (JSON-RPC)
  └─ middleware.ts → CORS headers todos los /api/* ✅

Datos: Supabase public.meta_accounts
  └─ brand_id · page_id · ig_user_id · ad_account_id · system_token
  └─ UNREALville ✅ · UnrealvilleStudio ✅ (2026-05-31) · LucienSael ✅ · NeuroneSCF ✅

Brands con acceso Meta:
  └─ UNREALville / UnrealvilleStudio ✅
  └─ LucienSael ✅
  └─ NeuroneSCF ✅ (verificado 2026-05-31)
  └─ DEUDA: normalizar UnrealvilleStudio vs UNREALville (2 filas)
```

### IID Subsystem (RESEARCH VIVO · EJECUCIÓN CONGELADA)
```
Schema: intel (NO public)

Tablas:
  └─ iid_agents (14) — por dominio, dual voice
  └─ iid_content_queue (~150) — tras limpieza 2026-05-31
  └─ iid_findings (218)
  └─ iid_research_raw (54)
  └─ iid_cron_runs (137) — research corre diario ✅
  └─ iid_briefs (1)
  └─ iid_scheduler_config (5)

Edge Functions:
  └─ content-dispatcher (.limit(1) debug — bloquea ejecución)
  └─ content-run-stage v22 (timeout 65s — reescrita, nunca re-corrida en limpio)
  └─ iid-core
  └─ iid-ecommerce
  └─ aife-filter

Diagnóstico: Research OK. Publicación congelada.
Causa raíz: LucienSael SIN brand_voice_genome → fallback genérico.
Fix: crear lucien_editorial v0.5 → remover .limit(1) → re-test content-run-stage v22
```

### Professor (OPERACIONAL)
```
Proxy: unrlvl-context.vercel.app/api/professor
  └─ ping · get-context · checkpoint · evaluate
  └─ log-case · submit-learning · approve-learning

Storage: Supabase amlvyycfepwhiindxgzw
  └─ professor_decision_criteria
  └─ professor_veto_rules
  └─ professor_learnings (60 total · 42 aprobados · 6 pending)
  └─ professor_manuals
  └─ professor_platform_variables

Checkpoint: silencioso cada 10 mensajes
```

### Shopify MCP
```
Servidor: unrlvl-shopify-mcp.vercel.app
  └─ /api/mcp/mcp · write_orders ✅ · OAuth callback live
```

### Supabase MCP (unrlvl)
```
Servidor: unrlvl-supabase-mcp.vercel.app
  └─ /api/mcp/mcp · v1.2.1
```

### OnboardingApp — Voice Genome Gap
```
v1.0 puebla 5 tablas:
  └─ brands
  └─ humanize_profiles
  └─ compliance_rules
  └─ brand_palette
  └─ brand_typography

NO captura: brand_voice_genome (capa editorial)
Fix: Fase 5 — spec lista en VOICE_GENOME_PHASE_SPEC.md
     2 ramas: Voz Extraída / Voz Diseñada
```

---

## Repositorios GitHub (unrealvillestudio-hub)

| Repo | Deploy | Estado |
|---|---|---|
| Orchestrator | orchestrator-unrlvl.vercel.app | ✅ v4.1 |
| CopyLab | unrlvl-copy-lab.vercel.app | ✅ v9.7 |
| ImageLab | image-lab-unrlvl.vercel.app | ✅ v6 |
| SocialLab | social-lab-flame.vercel.app | ✅ live |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | ✅ live |
| unrlvl-context | unrlvl-context.vercel.app | ✅ LIVE |
| unrlvl-meta-mcp | unrlvl-meta-mcp.vercel.app | ✅ LIVE |
| unrlvl-shopify-mcp | unrlvl-shopify-mcp.vercel.app | ✅ LIVE |
| unrlvl-supabase-mcp | unrlvl-supabase-mcp.vercel.app | ✅ v1.2.1 |
| unrlvl-social-media-agent | unrlvl-social-media-agent.vercel.app | ✅ LIVE |
| DDMV-Assistant | ddmv-assistant.vercel.app | ⚠️ FIX NEEDED |
| luciensael-web | — | ⏳ GREENFIELD — paquete listo, deploy pendiente |
| unrlvl-ayra | — | ⏳ POR CREAR |

**Staging workflow configurado en 15 repos** — PR template + WORKFLOW.md + CLAUDE.md.
Branch protection activa en 13. Bloqueada en 2 (privados GitHub Free): unrlvl-supabase-mcp, unrlvl-meta-mcp.

---

## Supabase — Schemas y tablas clave

### public (80 tablas)
```
brands · humanize_profiles · compliance_rules · brand_palette · brand_typography
brand_voice_genome ← clave para pipeline IID + CopyLab
brand_cache_snapshots ← zero-query mode
lab_jobs · lab_configs · copylab_jobs (→ migrar a lab_jobs)
meta_accounts · scheduled_posts
professor_decision_criteria · professor_veto_rules · professor_learnings
professor_manuals · professor_platform_variables
nscf_fulfillment_log · nscf_fulfillment_log_archive
imagelab_presets · person_blueprints · location_blueprints
product_blueprints · brand_copy_profiles
speaks_sessions · speaks_messages · speaks_leads · speaks_golden_pass
```

### intel (IID — NO public)
```
iid_agents · iid_content_queue · iid_findings · iid_research_raw
iid_cron_runs · iid_briefs · iid_scheduler_config
```

### content
```
orchestrator_jobs
```

### shopify
```
stores · audit_runs · fix_log + otras
```

---

## Protocolo de archivos — unrlvl-context repo

```
/
├── ecosystem.json                    ← fuente de verdad
├── ecosystem.md                      ← render narrativo (generado)
├── ecosystem_filemap.md              ← este archivo (generado)
├── ecosystem_graph.json              ← grafo nodos+edges (generado via audit)
├── AGENDA.md                         ← agenda visual (generado)
│
├── infrastructure/
│   ├── meta-mcp/
│   │   ├── session_log.md
│   │   └── CONFIG.md (futuro)
│   ├── shopify-mcp/ (futuro)
│   └── supabase-mcp/ (futuro)
│
├── brands/
│   └── [Marca]/
│       ├── brand.json
│       ├── BP_Brand_Context.md
│       └── session_log.md
│
├── agents/
│   ├── social-media-agent/
│   ├── ddmv-assistant/
│   └── forumphs-speaks/
│
├── skills/
│   ├── INDEX.md
│   └── [nombre]/SKILL.md
│
├── protocols/
│   ├── SESSION_PROTOCOL.md
│   ├── HRD_PROTOCOL.md
│   ├── AYRA_MASTER_PLAN.md
│   └── CONTEXT_SYSTEM_REFACTOR_PLAN.md ← (pendiente crear)
│
└── knowledge/
    └── ecosystem/
        ├── decision-matrix/
        └── professor/
```

**Regla de separación agents/ vs infrastructure/:**
- `agents/` → agentes conversacionales con canal (WhatsApp, web, SMS)
- `infrastructure/` → herramientas técnicas — MCPs, proxies, APIs internas

---

## Dependencias críticas

```
IID pipeline (congelado):
  brand_voice_genome (lucien_editorial) ← NO CREADO → causa raíz del congelamiento
  └─ iid_content_queue (lucien/psychological seeds #7/#8/#14)
  └─ content-run-stage v22 (timeout 65s — necesita re-test limpio)
  └─ content-dispatcher (.limit(1) debe removerse)

Pipeline end-to-end (operacional):
  brand_cache_snapshots ← zero-query mode
  lab_jobs ← async jobs
  lab-worker EF ← disparo
  Meta MCP → meta_accounts ← todos con token ✅

OnboardingApp Fase 5:
  brand_voice_genome ← tabla existe, onboarding no la puebla aún
  spec: VOICE_GENOME_PHASE_SPEC.md (lista)

luciensael.com deploy:
  repo GREENFIELD ← no existe aún en GitHub org
  Vercel project ← por crear
  DNS ← por configurar
```
