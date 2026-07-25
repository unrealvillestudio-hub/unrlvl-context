# Ecosystem Filemap — Unrealville Studio
_Generado desde ecosystem.json v2026-06-24-v1 · No editar manualmente · ImageLab v7 (migración Imagen→Gemini) + BGRemover + labs/ImageLab/ actualizados al 2026-06-24; resto preservado de la versión anterior_

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
  └─ UNREALville ✅ · UnrealvilleStudio ✅ · NeuroneSCF ✅ · LucienSael (fila ✅ — pipeline NO E2E)

Brands con acceso Meta:
  └─ UNREALville / UnrealvilleStudio ✅
  └─ NeuroneSCF ✅
  └─ LucienSael ⏳ fila existe pero NO probada en pipeline — verificar antes del 1er publish (liga 5b)
  └─ DEUDA: normalizar UnrealvilleStudio vs UNREALville (2 filas)
```

### IID Subsystem — Intelligence Insights Developers (OPERACIONAL · R4B EN CURSO)
```
Repo de contexto: unrlvl-context/IID/session_log.md (fundado 2026-06-22 — doc fundacional + session log)
Nombre canónico: IID = Intelligence Insights Developers. UNRLVL-IID = los IID de UNRLVL.
Schema: intel (NO public)

FLUJO COMPLETO:
  CRON (jobids 2-28, trigger_iid_agent) → iid-research → iid_research_raw
    → iid-process → iid_findings → iid_content_queue (brand_id + domain)
    → content-dispatcher v36 (jobid 29, cada 30min, .limit(5) DISPATCH_LIMIT + lee scheduled_for)
    → content-run-stage v52 (deploy 2026-07-25):
         ├─ Builder buildFromGenome (lee brand_topics + brand_voice_genome)
         ├─ AIFE filter
         ├─ ImageLab → Vertex (gemini-2.5-flash-image, migrado 24-jun) → Storage unrlvl-media (CDN)
         ├─ SocialLab (post por plataforma)
         └─ callWatcher → content-watcher v2 / deploy build _14 (8 gates)
    → content_pieces (awaiting_approval) → email content-approval@unrealvillestudio.com
    → Orchestrator (orchestrator-unrlvl.vercel.app, aprobación Sam)
    → approve-piece v14 (publish Meta + move-to-permanent)

AGENTES (intel.iid_agents, 29 = 28 research + 1 sentinela):
  └─ 1 core: IID-CORE
  └─ 13 legacy IID-* (CORRIENDO, last_run reciente): IMAGE, LLM*, VIDEO, VOICE, GOOGLE,
       LINKEDIN*, META, TIKTOK, X*, ECOMMERCE, FLORIDA, PERSONAL-BRAND*, WHOLESALE
       (* = default_voice lucien, legado del encaje a la fuerza — investigan marketing, no filosofía)
  └─ 14 UNRLVL-* (creados 15-jun, last_run NULL — SIN ejecutar aún):
       Tier1 método: CONTEXT-ENGINEERING, BRAND-VOICE-SYSTEMS, AI-INDUSTRIALIZATION, CRO-PSYCHOLOGY, SIGNAL-LEARNING-LOOPS
       Tier2 deep-stack: META-DEEP-STACK, GOOGLE-DEEP-STACK, ALGORITHM-MECHANICS
       Tier3 mercado: ECOMMERCE-DEEP, SHOPIFY-STACK, MARKET-FLORIDA, DROPSHIP-REALITY, WHOLESALE-LOGISTICS-FL, CREATOR-MACRO-ECONOMY
       Hard rule: todo con números + profundidad de código, nada filosófico (eso es Lucien).
  └─ 1 sentinela: IID-SEEDER (ce44ac81, is_active=false — satisface FK agent_id de iid-inbound, NO corre research)

EDGE FUNCTIONS:
  └─ content-dispatcher v36 (B2: lee scheduled_for + .or(is.null,lte.now) + order ASC NULLS FIRST; B3: .limit(5) DISPATCH_LIMIT; transporta domain a builder_input)
  └─ content-run-stage v52 (Builder + labs + callWatcher + domain-write jobs/pieces/queue; #95-D bloque CANAL: email_propietarios saltea imagen)
  └─ content-watcher v2 / deploy build _14 (8 gates: los 6 + gate7 objective_stimulus + gate8 visual_sibling, blocking)
  └─ approve-piece v14 (publish Meta + move-to-permanent; reject sin rejected_reason → #5r)
  └─ iid-core v36 (#93 fan-out multimarca: deja de generar copy, brief neutro en aife_output.content.content; Ruta B en fanout.ts: preset derivado del objetivo; mata default_voice; body.domain override) · iid-inbound / deploy build _14 (Sonnet 5; cerebro Sembrador: capture/approve/reject/list, verify_jwt=false)
  └─ aife-filter (deploy build _28, Sonnet 5) · brand-context-builder (deploy build _19, Sonnet 5) · lab-worker v23 · copylab-processor · iid-ecommerce

GOBIERNO (intel.brand_topics):
  La MARCA declara qué consume y con qué voz por destino. El agente investiga neutro.
  angle = territorio (qué/dónde); genoma = ejecución (cómo).
  Cadencia Interpretación A: por-marca-por-plataforma; dominios rotan, NO multiplican.
  Arquitectura híbrida queue: queue lleva brand_id+domain (puente); brand_topics fuente única de platforms/cadence/rollout.

VERTEX (desbloqueado 2026-06-22):
  GOOGLE_SERVICE_ACCOUNT_KEY + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION en Supabase Secrets.
  Proyecto gen-lang-client-0491381650 (SA imagelab-vercel). Embeddings gemini-embedding-001 @768.

R4B (deadline 1ª sem julio):
  HECHO: 5e-5 DDL (domain+pgvector v0.8.0), 5o/5p-a/5q (v36), 5e-4 content-watcher v1 (v37),
         arquitectura híbrida queue, #5i genoma v1.0 Lucien, Vertex desbloqueado.
  PENDIENTE: 5e-1 Scheduler (especificado, desbloqueado), 5e-2/5e-3 embeddings+gates (Chat 2),
         parche dispatcher, 5b publicación real, 5r rejected_reason, 5s limpieza queue, validación v1.0.
```

### Professor (OPERACIONAL)
```
Proxy: unrlvl-context.vercel.app/api/professor
  └─ ping · get-context · checkpoint · evaluate
  └─ log-case · submit-learning · approve-learning

Storage: Supabase amlvyycfepwhiindxgzw
  └─ professor_decision_criteria · professor_veto_rules
  └─ professor_learnings · professor_manuals · professor_platform_variables

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

### Voces de marca (brand_voice_genome)
```
Una marca → varias voces hermanas (mismo temperamento, distinta respiración)
Unique (brand_id, voice_id, version)

LucienSael:
  └─ lucien_editorial v1.0 (919e3707) — blog/ensayo/long-form — respira largo
  └─ lucien_social   v1.0 (5b571b08) — Meta FB/IG + TikTok texto + X — muerde corto ≤280
       core_move v1.0: generativo/constructor (parte de su mirada, aporta) — NO reactivo/léxico
       8 campos nuevos (muestreo #5i): closing_repositions, purpose_and_audience, restraint_as_power,
       the_edge_lands_in, compression_over_explanation, the_accusing_question, elegance_is_the_blade, thematic_gravity
       Exclusiones: luciensael.com (=editorial) · LinkedIn publish (no cuenta) · video/voz (=futuro lucien_video)
       Cita-por-destino: redirect X/Meta/TikTok → social; .com o nativo long-form → editorial

SamPublisher:
  └─ sam_personal v0.5 — Meta(FB) + LinkedIn — personal public voice + vocero Lucien/UNRLVL

UnrealvilleStudio:
  └─ unrlvl_default v1.0 — Defiant precision

Futuros: genoma social UNRLVL · lucien_video
```

### OnboardingApp — Voice Genome Gap
```
v1.0 puebla 5 tablas: brands · humanize_profiles · compliance_rules · brand_palette · brand_typography
NO captura: brand_voice_genome (capa editorial)
Fix: Fase 5 — spec lista en VOICE_GENOME_PHASE_SPEC.md
     2 ramas: Voz Extraída / Voz Diseñada + derivar social desde editorial + modo cita voceros
```

---

## Repositorios GitHub (unrealvillestudio-hub)

| Repo | Deploy | Estado |
|---|---|---|
| Orchestrator | orchestrator-unrlvl.vercel.app | ✅ v4.1 |
| CopyLab | unrlvl-copy-lab.vercel.app | ✅ v9.7 |
| ImageLab | image-lab-unrlvl.vercel.app | ✅ v7 — gemini-2.5-flash-image (migrado 24-jun) + BGRemover |
| SocialLab | social-lab-flame.vercel.app | ✅ live |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | ✅ live |
| unrlvl-context | unrlvl-context.vercel.app | ✅ LIVE |
| unrlvl-meta-mcp | unrlvl-meta-mcp.vercel.app | ✅ LIVE |
| unrlvl-shopify-mcp | unrlvl-shopify-mcp.vercel.app | ✅ LIVE |
| unrlvl-supabase-mcp | unrlvl-supabase-mcp.vercel.app | ✅ v1.2.1 |
| unrlvl-social-media-agent | unrlvl-social-media-agent.vercel.app | ✅ LIVE |
| DDMV-Assistant | ddmv-assistant.vercel.app | ⚠️ FIX NEEDED |
| luciensael-web | — | ⏳ GREENFIELD — paquete listo, deploy pendiente |
| unrlvl-iid-functions | (Supabase deploy) | ✅ fuente de las EFs IID (deploy manual por MCP desde main) |
| unrlvl-ayra | — | ⏳ POR CREAR |

**Staging workflow configurado en 15 repos.** Branch protection activa en 13. Bloqueada en 2 (privados GitHub Free): unrlvl-supabase-mcp, unrlvl-meta-mcp.

---

## Supabase — Schemas y tablas clave

### public (80+ tablas)
```
brands · humanize_profiles · compliance_rules · brand_palette · brand_typography
brand_voice_genome ← clave para pipeline IID + CopyLab
   └─ LucienSael: lucien_editorial (919e3707) + lucien_social (5b571b08) — ambas v1.0 active
   └─ UnrealvilleStudio: unrlvl_default v1.0 · SamPublisher: sam_personal v0.5
brand_cache_snapshots ← zero-query mode
lab_jobs · lab_configs · copylab_jobs
meta_accounts · scheduled_posts
professor_* (decision_criteria, veto_rules, learnings, manuals, platform_variables)
nscf_fulfillment_log · nscf_fulfillment_log_archive
imagelab_presets · person_blueprints · location_blueprints · product_blueprints · brand_copy_profiles
speaks_sessions · speaks_messages · speaks_leads · speaks_golden_pass
```

### intel (IID — Intelligence Insights Developers — NO public)
```
iid_agents (29) · brand_topics · iid_content_queue (+ domain) · iid_findings
iid_research_raw · iid_cron_runs · iid_briefs · iid_scheduler_config · watcher_log
iid_seeds (semillas humanas del Sembrador: source_url/raw_signal/neutral_topic/mapeo/lane/status, 25-jun)
```

### content
```
orchestrator_jobs (+ domain) · content_pieces (+ domain) · content_calendar
content_performance · brand_context_cache · brand_voices
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
├── ecosystem_graph.json              ← grafo nodos+edges (generado via audit) ⚠️ PENDIENTE AUDIT (desactualizado 05-26)
├── AGENDA.md                         ← agenda visual (generado)
├── CAPABILITIES.md                   ← catálogo de capacidades (carga en arranque)
│
├── IID/                              ← NUEVO 2026-06-22 — hogar de contexto del IID
│   └── session_log.md                ← doc fundacional (§1-§8 cuerpo estable) + session log (§9 al tope)
│
├── infrastructure/
│   ├── meta-mcp/ · shopify-mcp/ (futuro) · supabase-mcp/ (futuro)
│
├── labs/                             ← session logs por lab
│   ├── ImageLab/                     ← NUEVO 2026-06-24 — migración Imagen→Gemini v7 + BGRemover
│   │   └── session_log.md
│   └── OnboardingApp/
│       └── session_log.md            ← v1.0 + Voice Genome gap (Fase 5)
│
├── brands/
│   ├── LucienSael/  (BP_Brand_Person_id.md · session_log.md — genoma v1.0)
│   ├── SamPublisher/ (brand.json · session_log.md — sam_personal v0.5)
│   └── [Marca]/ (brand.json · BP_Brand_Context.md · session_log.md)
│
├── agents/
│   ├── social-media-agent/ · ddmv-assistant/ · forumphs-speaks/
│
├── skills/
│   ├── INDEX.md · [nombre]/SKILL.md
│
├── protocols/
│   ├── SESSION_PROTOCOL.md · HRD_PROTOCOL.md · CC_PROTOCOL.md
│   ├── AYRA_MASTER_PLAN.md · VOICE_GENOME_PHASE_SPEC.md
│   ├── IID_OUTPUT_QUALITY_LOTE_A_SPEC.md
│   ├── R4B_HANDOFF_CHAT1.md · R4B_RESPUESTA_CHAT1.md · R4B_MAPEO_CHAT2_CC.md
│   ├── DIAGNOSTICO_ANGLE_READONLY_CC.md
│   └── CONTEXT_SYSTEM_REFACTOR_PLAN.md (pendiente crear)
│
└── knowledge/
    └── ecosystem/ (decision-matrix/ · professor/)
```

**Regla agents/ vs infrastructure/:** `agents/` = conversacionales con canal (WhatsApp/web/SMS); `infrastructure/` = herramientas técnicas (MCPs, proxies, APIs).

---

## Dependencias críticas

```
IID pipeline (OPERACIONAL · R4B en curso):
  brand_voice_genome (lucien_editorial + lucien_social v1.0) ← ✅ generativo/constructor
  brand_topics ← gobierno de voz/tema/cadencia (fuente única de platforms/cadence/rollout)
  iid_content_queue (+ domain) ← puente brand_id+domain para el Scheduler
  content-run-stage v52 ← Builder + labs + callWatcher (#95-D bloque CANAL)
  content-watcher v2 (build _14) ← 8 gates
  content-dispatcher v36 (.limit(5) DISPATCH_LIMIT + lee scheduled_for — B2/B3 2026-07-25)
  Vertex (GOOGLE_SERVICE_ACCOUNT_KEY en Supabase) ← embeddings 5e-2
  Scheduler content-scheduler ← especificado, desbloqueado (write ya en v37)

Pipeline end-to-end (operacional):
  brand_cache_snapshots · lab_jobs · lab-worker EF
  Meta MCP → meta_accounts ← UNREALville/UnrealvilleStudio/NeuroneSCF/LucienSael
  └─ LucienSael ⏳ verificar pipeline E2E antes del 1er publish (liga 5b)

luciensael.com deploy: repo GREENFIELD · Vercel + DNS por crear

ecosystem_graph.json: ⚠️ PENDIENTE ecosystem audit (datos del 05-26 — IID dice frozen/14 agentes/v22, ya falso)
```
