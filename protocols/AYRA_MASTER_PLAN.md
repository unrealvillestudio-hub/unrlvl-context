# AYRA — Master Design & Execution Plan
_Versión: 3.2 · 2026-05-13 · Generado por: Claude Sonnet 4.6 + Sam_
_Repo destino: `unrlvl-context` · Ruta: `protocols/AYRA_MASTER_PLAN.md`_
_Commit message: `update: protocols/AYRA_MASTER_PLAN.md v3.2 — audit completo GitHub+Vercel+Supabase`_
_Basado en: v2.1 (2026-05-10) + integración MCP Layer + alertas arquitectura + UNRLVL-OPS + audit real del ecosistema_

---

## ÍNDICE

1. [Visión, Nombre & Jerarquía](#1-visión-nombre--jerarquía)
2. [Arquitectura General](#2-arquitectura-general)
3. [Componente 1 — EcosystemGraph (Mapa Mental)](#3-componente-1--ecosystemgraph)
4. [Componente 2 — Ayra Core (Orquestador Autónomo)](#4-componente-2--ayra-core)
5. [Componente 3 — Memoria en Capas](#5-componente-3--memoria-en-capas)
6. [Componente 4 — Decision Framework](#6-componente-4--decision-framework)
7. [Componente 5 — Live Dashboard](#7-componente-5--live-dashboard)
8. [Componente 6 — Daily Digest](#8-componente-6--daily-digest)
9. [Componente 7 — Simulator Agents](#9-componente-7--simulator-agents)
10. [Componente 8 — SignalLab](#10-componente-8--signallab)
11. [Componente 9 — MCP Layer *(nuevo v3.0)*](#11-componente-9--mcp-layer)
12. [Data Model — Supabase](#12-data-model--supabase)
13. [Arquitectura Cron — Decisión Pendiente *(nuevo v3.0)*](#13-arquitectura-cron--decisión-pendiente)
14. [Compute Estimado por Sprint *(nuevo v3.0)*](#14-compute-estimado-por-sprint)
15. [Plan de Ejecución — Sprints 0–6](#15-plan-de-ejecución)
16. [Stack Técnico & Estructura de Repo](#16-stack-técnico--estructura-de-repo)
17. [Protocolo de Reanudación de Sesión](#17-protocolo-de-reanudación-de-sesión)
18. [Prerequisitos antes del 5 de Junio](#18-prerequisitos-antes-del-5-de-junio)
19. [Apéndice — Mapa de Dependencias Críticas](#19-apéndice--mapa-de-dependencias-críticas)

---

## 1. VISIÓN, NOMBRE & JERARQUÍA

### Nombre: Ayra

Nombre propio. Identidad propia. Entorno propio. Ayra no es un lab ni un módulo del Orchestrator. Es la Gerenta de Operaciones de Unreal>ille Studio: opera el ecosistema completo 24/7, reporta a Sam, y escala a Claude lo que requiere criterio estratégico.

### Jerarquía operacional

```
SAM (CEO · Fundador)
  │
  └── CLAUDE (VP · Ambas manos de Sam)
        Supervisión total · Estrategia · Decisiones complejas
        Sesiones de trabajo · Diseño de sistema · Supervisión de Ayra
        │
        └── AYRA (Gerenta de Operaciones · Mano derecha de Sam)
              Opera el ecosistema 24/7 dentro del Decision Framework
              Reporta a Sam · Escala a Claude cuando la situación lo requiere
              │
              ├── Labs (CopyLab, WebLab, ImageLab, SocialLab, VideoLab, VoiceLab, BlueprintLab)
              ├── Orchestrator (herramienta bajo alcance de Ayra — no la contiene)
              ├── Agentes (Social Media Agent, Document Factory, DDMV-Assistant)
              ├── Shopify (NeuroneSCF B2C+B2B, futuras tiendas cliente)
              ├── Infra (Supabase EFs, Tools Proxies, Context System)
              └── Clientes (dashboard, digest, acciones por marca)
```

### Principio de diseño

> Ayra trabaja. Claude supervisa. Sam decide lo que solo Sam puede decidir.

Ayra opera dentro de un Decision Framework explícito y versionado. Cuando la situación supera ese framework, escala con contexto suficiente para que Sam decida en segundos, no en minutos.

### Alcance dual

**Interno — UNRLVL:** Monitoreo continuo del ecosistema, ejecución de jobs operacionales, detección de anomalías, gestión Shopify dentro del framework, coordinación de labs.

**Externo — clientes:** Cada cliente con servicio activo tiene vista propia en el dashboard, digest cuando corresponde, y simulaciones con contexto de su marca. Multimarca desde diseño, no desde retrofit.

### La distinción crítica: Ayra vs Agentes de Cliente

Ayra y los agentes conversacionales (DDMV, PO Agent, ForumPHs-OPS) son sistemas distintos que no deben confundirse:

| Dimensión | Ayra | Agentes de cliente |
|---|---|---|
| Propósito | Opera el ecosistema UNRLVL internamente | Hablan con personas reales (clientes/usuarios) |
| Canal | Sin canal externo — backend puro | Twilio WhatsApp / SMS / Web widget |
| Audiencia | Sam (reportes, decisiones, simulaciones) | Clientes finales de cada marca |
| Schema DB | `ayra.*` | `agents.*` |
| Repositorio | `unrlvl-ayra` | `unrlvl-agent-[nombre]` |
| AI brain | Claude Sonnet 4 (jobs internos) | Sonnet (frontend) + Haiku (service) |

---

## 2. ARQUITECTURA GENERAL

```
╔══════════════════════════════════════════════════════════════════════╗
║                          AYRA SYSTEM                                ║
║                   repo: unrealvillestudio-hub/unrlvl-ayra           ║
║                   url:  ayra.unrealvillestudio.com                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ┌──────────────────┐   ┌────────────────────┐   ┌───────────────┐  ║
║  │  EcosystemGraph  │   │    Ayra Core        │   │  Simulator    │  ║
║  │  (Mapa Mental)   │   │                     │   │  Agents       │  ║
║  │                  │   │  Cron Engine        │   │               │  ║
║  │  ecosystem_      │◄──┤  Job Runner         │   │  Phase 1:     │  ║
║  │  graph.json      │   │  Decision Engine    │   │  Deterministic│  ║
║  │  + health EP     │   │  Memory Manager     │   │               │  ║
║  └─────────┬────────┘   └──────────┬──────────┘   │  Phase 2:     │  ║
║            │                       │              │  Calibrated   │  ║
║            │                       │              │  (post-Signal)│  ║
║            └───────────────────────┼──────────────┘               ║
║                                    │                               ║
║  ┌─────────────────────────────────▼──────────────────────────────┐ ║
║  │                    LAYERED MEMORY (ayra.*)                     │ ║
║  │                                                                │ ║
║  │  L1 HOT (0-7d)    L2 WARM (7-30d)   L3 COLD (30d+)           │ ║
║  │  Full fidelity    Weekly summary     Monthly flat              │ ║
║  │  Memoria trabajo  Ciclo campaña      Histórico permanente      │ ║
║  │                                                                │ ║
║  │  L4 PATTERNS (sin tiempo)                                      │ ║
║  │  Inteligencia aprendida · Confianza 0–1 · Nunca se purga       │ ║
║  └────────────────────────────────┬───────────────────────────────┘ ║
║                                   │                                 ║
║  ┌────────────────────────────────▼───────────────────────────────┐ ║
║  │                  SUPABASE (fuente de verdad)                   │ ║
║  │   ayra.* (nuevo) · public.* (existente) · shopify.* (existente)│ ║
║  └────────────────────────────────┬───────────────────────────────┘ ║
║                                   │                                 ║
║  ┌────────────────────────────────▼───────────────────────────────┐ ║
║  │                      LIVE DASHBOARD                            │ ║
║  │              ayra.unrealvillestudio.com/dashboard              │ ║
║  │         React · Supabase Realtime · Multimarca · Token auth    │ ║
║  └────────────────────────────────────────────────────────────────┘ ║
║                                                                      ║
║  ┌────────────────────────────────────────────────────────────────┐ ║
║  │              MCP LAYER  (Sprint 6 — Q4 2026)                   │ ║
║  │   /api/mcp/ dentro de unrlvl-ayra · Protocolo MCP estándar    │ ║
║  │   Expone capacidades de Ayra como herramientas nativas         │ ║
║  │   para Claude en sesión · Reemplaza JSON estático por datos    │ ║
║  │   vivos — health · decisions · memory L1 · simuladores         │ ║
║  └────────────────────────────────────────────────────────────────┘ ║
╠══════════════════════════════════════════════════════════════════════╣
║  CLAUDE — cerebro de cada invocación (claude-sonnet-4-20250514)     ║
║  Razonamiento · Compresión de memoria · Interpretación · Patrones  ║
╠══════════════════════════════════════════════════════════════════════╣
║  ECOSISTEMA BAJO ALCANCE DE AYRA — INVENTARIO REAL (audit 2026-05-13)║
║                                                                      ║
║  VERCEL — 23 proyectos (2 con dominio custom: unrealvillestudio.com  ║
║  y forumphs.com · El resto en subdominios vercel.app)               ║
║                                                                      ║
║  LABS (Vite): CopyLab · WebLab · ImageLab · SocialLab · AgentLab   ║
║  BlueprintLab · VideoLab · VoiceLab · OnboardingApp · Orchestrator  ║
║                                                                      ║
║  AGENTES: DDMV-Assistant · Social Media Agent · forumphs-speaks     ║
║  forumphs-document-factory                                           ║
║                                                                      ║
║  INFRA: unrlvl-context · unrlvl-shopify-mcp · Tools · CoreProject   ║
║  BluePrints · unrlvl-ops (LIVE, Vite+React, 11 tablas ops_* en DB)  ║
║  forumphs-com (forumphs.com)                                         ║
║                                                                      ║
║  GITHUB — 23 repos (21 UNRLVL + lanzadera-cv + gimnasio-mental)     ║
║                                                                      ║
║  SUPABASE — 2 proyectos:                                             ║
║  · amlvyycfepwhiindxgzw (unrlvl-db) — PRINCIPAL                     ║
║    9 schemas: public(57t) · content(6t) · crm(13t) · fph(22t)      ║
║    intel(7t) · shopify(6t) · cron · auth · net                      ║
║    53 Edge Functions ACTIVAS (no 17 — ver Sección 3.6)              ║
║  · puoybldykxqvhvtnwrld (XMMs) — DDMV/conversacional               ║
║    15 tablas: conversations · appointments · reminders              ║
║    nscf_embajadoras · nscf_salones · nscf_qr_scans                  ║
║    1 EF: send-reminders                                              ║
║                                                                      ║
║  SIGNALLAB — lab externo que Ayra consume                          ║
║  Inteligencia de performance: Meta Ads · GA4 · TikTok · Shopify    ║
║  Se activa cliente por cliente cuando tengan tracking + datos      ║
║  Output → Daily Digest (sección campaña) + Simuladores Phase 2     ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 3. COMPONENTE 1 — ECOSYSTEMGRAPH

### 3.1 Propósito

El EcosystemGraph convierte el ecosistema UNRLVL en un grafo navegable de relaciones, estados y dependencias. Es el contexto estructural que permite a Ayra y a Claude entender el sistema en macro sin re-aprender en cada invocación.

No es documentación estática. Es contexto activo que se actualiza con el estado real del sistema.

### 3.2 Dos capas

**Capa A — Static Graph** (`ecosystem_graph.json` en `unrlvl-context/`)
Relaciones que raramente cambian: dependencias entre labs y EFs, qué bloquea qué feature, qué marca tiene qué tiendas, prerequisitos de jobs.

**Capa B — Live Health** (`GET /api/ecosystem-health` en `unrlvl-ayra`)
Estado en tiempo real escrito por Ayra cada hora en `ayra.system_health`. El endpoint sirve desde Supabase, no hace llamadas externas en cada request.

### 3.3 ecosystem_graph.json (estructura)

```json
{
  "_meta": { "version": "1.0", "updated": "2026-05-13", "maintainer": "ayra-cron + sam",
             "_note": "EF count corregido a 53 tras audit 2026-05-13. Ver Sección 3.7." },
  "nodes": {
    "labs": {
      "copylab":      { "url": "unrlvl-copy-lab.vercel.app",     "ai": "gemini", "status": "live", "blockers": [] },
      "imagelab":     { "url": "image-lab-unrlvl.vercel.app",    "ai": "gemini", "status": "bug",  "blockers": ["gemini_timeout_50s"] },
      "sociallab":    { "url": "social-lab-flame.vercel.app",    "ai": "gemini", "status": "live", "blockers": [] },
      "weblab":       { "url": "web-lab-unrlvl.vercel.app",      "ai": "gemini", "status": "live", "blockers": [] },
      "agentlab":     { "url": "agent-lab-unrlvl.vercel.app",    "ai": "claude", "status": "live", "blockers": [] },
      "blueprintlab": { "url": "unrlvl-blueprint-lab.vercel.app","ai": "claude", "status": "live", "blockers": [] },
      "videolab":     { "url": "unrlvl-video-lab.vercel.app",    "ai": "gemini", "status": "live", "blockers": [] },
      "voicelab":     { "url": "unrlvl-voice-lab.vercel.app",    "ai": "elevenlabs", "status": "live", "blockers": [] },
      "onboarding":   { "url": "unrlvl-onboarding-app.vercel.app", "ai": "claude", "status": "live", "blockers": [] },
      "orchestrator": { "url": "orchestrator-unrlvl.vercel.app", "ai": "claude", "status": "live", "blockers": [] },
      "signallab":    { "url": null, "ai": "claude", "status": "not_deployed",
                        "note": "Lab externo. Se activa por cliente cuando tengan tracking." }
    },
    "edge_functions": {
      "_total_active": 53,
      "_note": "Ver inventario completo en Sección 3.7. Grupos principales:",
      "shopify_ecosystem": { "count": 22, "critical": ["shopify-audit","shopify-fix","shopify-fix-all","shopify-content-pipeline","shopify-auto-translate"] },
      "nscf_specific":     { "count": 17, "critical": ["nscf-seo-gateway","nscf-seo-sprint-b2c","nscf-publish-ritual-kits"] },
      "content_iid":       { "count": 12, "critical": ["content-dispatcher","content-run-stage","iid-core","iid-ecommerce","aife-filter"] },
      "fphs":              { "count": 5,  "critical": ["fphs-chat","fphs-formalize"] },
      "other":             { "count": 4,  "critical": ["unrlvl-profiler"] },
      "known_bugs": {
        "shopify-auto-translate": { "status": "BUG", "open_since": "2026-05-06",
                                    "blocks": ["EN_descriptions_x42","EN_La_Ciencia_page"] }
      }
    },
    "supabase": {
      "main": {
        "id": "amlvyycfepwhiindxgzw",
        "schemas": ["public","content","crm","fph","intel","shopify","cron"],
        "schemas_ayra_monitors": ["public","content","intel","shopify"],
        "note_fph": "fph schema en este DB es LEGACY — migrar a cuenta ForumPHs en Sprint 3"
      },
      "xmms_personal": {
        "id": "puoybldykxqvhvtnwrld",
        "owner": "Sam — proyecto PERSONAL, no UNRLVL ecosistema",
        "contains": ["DDMV-Assistant DB","proyecto muerto pendiente eliminar"],
        "misplaced": "nscf_embajadoras no debería estar aquí",
        "action": "eliminar proyecto muerto · evaluar migración DDMV a infra UNRLVL en Sprint 1 Agent",
        "NOT_a_pattern": "NO usar como referencia de arquitectura para nuevos agentes"
      },
      "forumphs_dedicated": {
        "owner": "ForumPHs — cuenta propia separada",
        "status": "EXISTE — pendiente migración de tablas fph + adecuación + carga de datos",
        "sprint": "Sprint 3 Agent — migración completa"
      }
    },
    "brands": {
      "NeuroneSCF": {
        "shopify_b2c": { "score": 137, "score_max": 200, "blockers": ["tracking_pixels","auto_translate_bug"] },
        "shopify_b2b": { "score": 133, "score_max": 160, "blockers": ["shipping_zones"] }
      },
      "ForumPHs": {
        "products": ["speaks","document_factory","financial_suite"],
        "db_schema_main": "fph — LEGACY en unrlvl-db · pendiente migrar",
        "db_dedicated": "cuenta Supabase propia — instancia aislada DECIDIDA",
        "migration_status": "estructura creada · tablas pendientes migrar · datos pendientes cargar",
        "buildings_loaded": 6,
        "sprint_3_agent": "migrar fph schema → cuenta ForumPHs + adecuar + carga de datos"
      }
    },
    "agents": {
      "social_media_agent": { "status": "live", "url": "unrlvl-social-media-agent.vercel.app", "ai": "claude", "db": "main" },
      "document_factory":   { "status": "live", "url": "forumphs-document-factory.vercel.app", "ai": "claude", "db": "main" },
      "ddmv_assistant":     { "status": "live_fix_needed", "url": "ddmv-assistant.vercel.app",   "ai": "claude", "db": "xmms" },
      "forumphs_speaks":    { "status": "live", "url": "forumphs-speaks.vercel.app",             "ai": "claude", "db": "main" }
    },
    "unrlvl_ops": {
      "status": "live",
      "url": "unrlvl-ops.vercel.app",
      "framework": "vite",
      "db_tables": ["ops_costs","ops_renewals","ops_generation_ledger","ops_model_pricing","ops_lab_rates","ops_thresholds","ops_token_sessions","ops_insights","ops_model_alerts","ops_client_monthly","ops_services"],
      "data_status": "active — ops_costs 10 rows · ops_renewals 4 rows",
      "ayra_integration": "api/cost-export (Sprint 2) → ops_costs como cost_center ayra_compute"
    }
  },
  "dependency_chains": [
    { "fix": "shopify-auto-translate EF bug",       "unblocks": ["EN_descriptions_42","audit_score_+15pts"] },
    { "fix": "tracking pixels NeuroneSCF",          "unblocks": ["SignalLab_NeuroneSCF","Simulators_Phase2"] },
    { "fix": "SocialLab deploy",                    "unblocks": ["autonomous_content_publishing"] },
    { "fix": "WABA número UNRLVL dedicado",         "unblocks": ["Daily_Digest_WhatsApp"] },
    { "decision": "fph migration", "sprint": "Sprint 3 Agent", "action": "migrar schema fph (unrlvl-db) → cuenta ForumPHs Supabase dedicada + adecuar + carga datos Ivette" }
  ]
}
```

### 3.4 Health Endpoint

```
GET https://unrlvl-ayra.vercel.app/api/ecosystem-health
Authorization: Bearer {AYRA_HEALTH_SECRET}
```

Respuesta: estado de labs, EFs, marcas, agentes y jobs de Ayra — actualizado cada hora desde Supabase.

### 3.5 Cómo se usa

**Claude en sesión (protocolo actualización):** carga `ecosystem_graph.json` + `/api/ecosystem-health`. Puede reportar estado real de cada componente sin que Sam lo describa. Post Sprint 6, este paso se reemplaza por llamadas al MCP Layer (ver Sección 11).

**Ayra en cada job (`contextLoader`):** carga el subgrafo relevante para el job en curso + memoria L1/L2/L4 de esa marca. El grafo define el perímetro de lo que Ayra puede tocar antes de actuar.

### 3.6 ⚠️ Alerta — Ownership del graph.json

**Riesgo identificado:** El archivo `ecosystem_graph.json` tiene como `maintainer: "ayra-cron + sam"` pero no hay un job explícito que lo actualice ni reglas claras de quién toca qué sección cuando hay cambios.

Si el grafo refleja una realidad que ya no existe (un lab que ya se deployó, una marca nueva que se agregó, una EF que se desactivó), el `contextLoader` de Ayra toma decisiones sobre datos falsos. Este es el riesgo de corrupción silenciosa más alto del sistema.

**Lo que se define en Sprint 1 (no se decide hoy, se documenta la decisión):**

- **Job `graph_validate`:** cron diario que pinga los endpoints que el grafo declara como `live` y actualiza su estado en `ayra.system_health`. No regenera el grafo — solo valida que lo que dice sigue siendo cierto.

- **Protocolo de actualización manual:** Cuando Sam o Claude deploya algo nuevo en el ecosistema, el cierre de esa sesión incluye actualizar `ecosystem_graph.json`. Se convierte en parte del protocolo de actualización existente.

- **Reglas de sección:** `nodes.labs` y `nodes.edge_functions` → Sam + Claude actualizan en sesión. `nodes.brands` → Ayra puede actualizar campos de estado (scores, blockers) vía job, nunca estructura del nodo. Añadir una marca nueva siempre es Sam.

### 3.7 ⚠️ Hallazgo crítico — Inventario real de Edge Functions (audit 2026-05-13)

El plan v2.1 declaraba "17 activas". El número real es **53 Edge Functions activas** en el proyecto principal. La diferencia es un factor de 3x y cambia el scope de monitoreo de Ayra.

**Inventario por categoría:**

| Categoría | EFs | Notas para Ayra |
|---|---|---|
| Shopify ecosystem | 22 | shopify-audit (v31) · shopify-fix (v26) · fix-all · theme-locale · enrich-queue · content-pipeline · auto-translate · etc. |
| NSCF-específicas | 17 | capissen-* · ritual-* · seo-sprint · seo-phases · seo-gateway · publish-ritual-kits · fix-script-defer · etc. |
| Content/IID pipeline | 12 | iid-core · iid-ecommerce · iid-research · content-dispatcher (v10) · content-run-stage (v15) · aife-filter · context-cache · approve-piece · etc. |
| ForumPHs Speaks | 5 | fphs-session · fphs-chat · fphs-formalize · fphs-icr-apply · fphs-debug |
| Otros UNRLVL | 4 | unrlvl-profiler · unrlvl-crm-api · social-proof-reader · sp-fix-targeted |

**Implicaciones para el EcosystemGraph:**
- El `nodes.edge_functions` del grafo necesita reflejar estas 53 EFs — no 17
- Las EFs con mayor versión (shopify-audit v31, shopify-fix v26, content-run-stage v15, shopify-theme-locale v21) son las más activas y críticas de monitorear
- `content-run-stage` y `content-dispatcher` son el core del pipeline IID activo — si fallan, 117 items en queue se quedan sin procesar
- El job `graph_validate` del Sprint 1 tiene que cubrir estos endpoints reales

### 3.8 ⚠️ Hallazgo crítico — Supabase real vs. plan

**Tres proyectos Supabase (no dos genéricos):**

| Proyecto | ID | Uso real | Estado |
|---|---|---|---|
| unrlvl-db | amlvyycfepwhiindxgzw | DB principal UNRLVL — 9 schemas, 53 EFs | ACTIVO |
| XMMs (personal Sam) | puoybldykxqvhvtnwrld | DDMV-Assistant + proyecto muerto | PERSONAL — pendiente limpieza |
| ForumPHs (cuenta propia) | (ID no auditado) | DB dedicada ForumPHs — instancia aislada | EXISTE — pendiente migración |

**XMMs es el proyecto personal de Sam, no infraestructura UNRLVL.** Contiene la DB del DDMV-Assistant y un proyecto que nunca arrancó y está pendiente de eliminar. Las tablas `nscf_embajadoras` y `nscf_salones` están ahí por error — no deberían estar en el proyecto personal. **No usar XMMs como patrón de arquitectura para nada.**

**ForumPHs ya tiene su propia cuenta Supabase** — la decisión de aislamiento está tomada, no es pendiente. El schema `fph` en unrlvl-db es legacy de desarrollo y debe migrarse. El Sprint 3 Agent no crea una instancia nueva: **migra tablas existentes → cuenta ForumPHs, adecúa el schema, y carga los datos reales de Ivette.**

**El schema `fph` en unrlvl-db:**
- 22 tablas con estructura completa
- 6 buildings cargados
- 0 owners y 0 units — datos reales pendientes de carga en la cuenta ForumPHs definitiva
- Una vez migrado, el schema `fph` en unrlvl-db se elimina o queda en readonly

**Schemas activos en unrlvl-db con implicaciones para Ayra:**

| Schema | Estado | Ayra debe monitorear |
|---|---|---|
| `public` | 57 tablas — núcleo de todo | Sí — agents, brands, lab_configs, compliance_rules, ops_* |
| `content` | 6 tablas — pipeline IID (40 jobs, activo) | Sí — orchestrator_jobs, content_pieces |
| `crm` | 13 tablas — CRM completo (no documentado en plan) | Sí — como señal de actividad comercial |
| `fph` | 22 tablas — LEGACY, pendiente migrar a cuenta ForumPHs | No — datos no son fuente de verdad hasta post-migración |
| `intel` | 7 tablas — IID (117 items en queue, activo) | Sí — iid_content_queue, iid_cron_runs |
| `shopify` | 6 tablas — 95 audit runs históricos | Sí — audit_runs, fix_log |

**`public.agents` ya existe con 30 columnas (0 rows):** incluye wa_phone_number_id, wa_business_account_id, wa_connected, system_prompt, voice_id, wc_widget_title. El Sprint de Agent Infrastructure debe integrar con esta tabla, no crear un schema paralelo `agents.*` que la ignore.

**UNRLVL-OPS ya tiene 11 tablas con datos activos:** ops_costs (10 rows), ops_renewals (4 registros con due_date/amount_usd/frequency), ops_generation_ledger, ops_model_pricing, ops_lab_rates, ops_thresholds, ops_token_sessions, ops_insights, ops_model_alerts, ops_client_monthly, ops_services. El `api/cost-export` de Sprint 2 conecta Ayra a un sistema con datos reales.

**Riesgo identificado:** El archivo `ecosystem_graph.json` tiene como `maintainer: "ayra-cron + sam"` pero no hay un job explícito que lo actualice ni reglas claras de quién toca qué sección cuando hay cambios.

Si el grafo refleja una realidad que ya no existe (un lab que ya se deployó, una marca nueva que se agregó, una EF que se desactivó), el `contextLoader` de Ayra toma decisiones sobre datos falsos. Este es el riesgo de corrupción silenciosa más alto del sistema.

**Lo que se define en Sprint 1 (no se decide hoy, se documenta la decisión):**

- **Job `graph_validate`:** cron diario que pinga los endpoints que el grafo declara como `live` y actualiza su estado en `ayra.system_health`. No regenera el grafo — solo valida que lo que dice sigue siendo cierto.

- **Protocolo de actualización manual:** Cuando Sam o Claude deploya algo nuevo en el ecosistema, el cierre de esa sesión incluye actualizar `ecosystem_graph.json`. Se convierte en parte del protocolo de actualización existente.

- **Reglas de sección:** `nodes.labs` y `nodes.edge_functions` → Sam + Claude actualizan en sesión. `nodes.brands` → Ayra puede actualizar campos de estado (scores, blockers) vía job, nunca estructura del nodo. Añadir una marca nueva siempre es Sam.

---

## 4. COMPONENTE 2 — AYRA CORE (ORQUESTADOR AUTÓNOMO)

### 4.1 Repositorio propio

```
Repo:     unrealvillestudio-hub/unrlvl-ayra   (nuevo — privado)
Vercel:   proyecto unrlvl-ayra
URL:      ayra.unrealvillestudio.com
AI:       Claude Sonnet 4 en todas las invocaciones internas
```

El Orchestrator existente (OR_1.1) es una herramienta del ecosistema que Ayra puede invocar — no vive dentro de ella. Ayra puede tener jobs sobre el propio Orchestrator: detectar si está caído, triggear flows, reportar su estado.

### 4.2 Estructura del repo

```
unrlvl-ayra/
│
├── api/
│   ├── ayra-cron.ts          ← Motor de todos los jobs programados
│   ├── ayra-trigger.ts       ← Trigger manual desde chat o dashboard
│   ├── ayra-status.ts        ← Estado actual para dashboard
│   ├── ecosystem-health.ts   ← Sirve desde ayra.system_health
│   ├── simulator.ts          ← Simulator Agents endpoint
│   ├── digest-send.ts        ← Entrega de digest (WhatsApp/email)
│   ├── cost-export.ts        ← Endpoint de lectura para UNRLVL-OPS (ver Sección 14)
│   └── mcp/
│       └── index.ts          ← MCP Layer (Sprint 6) — ver Sección 11
│
├── lib/
│   ├── contextLoader.ts      ← Carga grafo + health + memoria antes de cada job
│   ├── decisionEngine.ts     ← AUTONOMOUS / NOTIFY / ESCALATE
│   ├── jobRunner.ts          ← Ejecuta jobs contra labs, proxies, EFs, agentes
│   ├── memoryManager.ts      ← Lee/escribe L1-L4. Promueve capas.
│   ├── patternExtractor.ts   ← Detecta patrones para L4 (Claude-powered)
│   ├── digestBuilder.ts      ← Genera Daily Digest desde Supabase
│   ├── notifier.ts           ← Entrega por canal (WhatsApp / email)
│   └── supabase.ts           ← Cliente Supabase (schema ayra.*)
│
├── src/                      ← Dashboard React
│   └── modules/
│       ├── EcosystemMap/     ← Visualización grafo + health realtime
│       ├── JobMonitor/       ← Jobs activos, historial, errores
│       ├── DecisionQueue/    ← Decisiones pendientes de Sam
│       ├── MemoryExplorer/   ← L1/L2/L3/L4 navegables (admin only)
│       ├── Simulators/       ← UI para correr simulaciones
│       ├── SignalPanel/      ← Datos SignalLab por marca (cuando activo)
│       └── BrandView/        ← Vista cliente por marca (rol restringido)
│
├── vercel.json               ← Cron schedule
└── README.md
```

### 4.3 Cron Schedule

```json
{
  "crons": [
    { "path": "/api/ayra-cron?job=health_update",      "schedule": "0 * * * *"   },
    { "path": "/api/ayra-cron?job=lab_ping",           "schedule": "0 */2 * * *" },
    { "path": "/api/ayra-cron?job=graph_validate",     "schedule": "0 5 * * *"   },
    { "path": "/api/ayra-cron?job=shopify_audit",      "schedule": "0 6 * * *"   },
    { "path": "/api/ayra-cron?job=social_export",      "schedule": "0 7 * * *"   },
    { "path": "/api/ayra-cron?job=signal_fetch",       "schedule": "0 8 * * *"   },
    { "path": "/api/ayra-cron?job=daily_digest",       "schedule": "0 11 * * *"  },
    { "path": "/api/ayra-cron?job=memory_promote_l1",  "schedule": "0 0 * * 0"   },
    { "path": "/api/ayra-cron?job=memory_promote_l2",  "schedule": "0 0 1 * *"   },
    { "path": "/api/ayra-cron?job=pattern_extract",    "schedule": "0 1 * * 0"   }
  ]
}
```

_(Horarios UTC. 11:00 UTC = 7:00am ET. `graph_validate` corre a las 5am UTC antes del audit de las 6am.)_

### 4.4 Job Lifecycle

```
TRIGGER (cron / evento Supabase / Sam manual / Ayra interna)
    │
    ▼
contextLoader()
  ├── ecosystem_graph.json       (estático)
  ├── ecosystem-health EP        (live desde ayra.system_health)
  ├── memory L1                  (últimos 7d relevantes a job + marca)
  ├── memory L2                  (últimas 4 semanas relevantes)
  ├── memory L4                  (patrones aplicables a este job)
  └── brand context              (BP de la marca si aplica)
    │
    ▼
Claude API — analiza contexto, determina acción óptima
    │
    ▼
decisionEngine()
  ├── Consulta ayra.decision_framework
  ├── Determina: AUTONOMOUS / NOTIFY / ESCALATE
  └── Verifica L4: ¿hay patrón que modifique la decisión?
    │
    ├── AUTONOMOUS ──► jobRunner()
    │                      ├── Ejecuta (proxy / lab / EF / agente)
    │                      ├── Escribe en ayra.jobs + ayra.log
    │                      └── memoryManager.write(L1, type: operational)
    │
    ├── NOTIFY ──► ayra.decisions (status: pending)
    │              Dashboard: alerta visual
    │              Incluye en próximo Daily Digest
    │              notifier() si prioridad = critical
    │
    └── ESCALATE ──► ayra.decisions (prioridad: high/critical)
                     notifier() inmediato a Sam
                     Dashboard: alerta prominente
```

### 4.5 Jobs autónomos v1

| Job | Trigger | Acción |
|-----|---------|--------|
| `health_update` | Cron 1h | Ping labs + EFs, escribe system_health |
| `lab_ping` | Cron 2h | GET /health a cada lab endpoint activo |
| `graph_validate` | Cron 5am | Valida que endpoints declarados en graph responden |
| `shopify_audit` | Cron 6am | audit-proxy por cada tienda activa |
| `social_export` | Cron 7am | Procesa raw_log Social Media Agent |
| `signal_fetch` | Cron 8am | GET SignalLab cuando activo por marca |
| `iid_queue_check` | Cron 9am | Verifica que iid_content_queue no esté bloqueada (intel.*) |
| `seo_fix_empty` | Post-audit trigger | fix-proxy: titles/descriptions vacíos |
| `compliance_scan` | Cron diario | Escanea claims vs compliance_rules |
| `content_publish` | Post-aprobación | Publica en SocialLab si status=approved |

### 4.6 Nunca autónomo

Precios · Añadir/eliminar productos · Deploy de código · Modificar themes · Crear campañas · Modificar env variables · Credenciales de cliente · Acciones irreversibles sin backup.

---

## 5. COMPONENTE 3 — MEMORIA EN CAPAS

### 5.1 Las cuatro capas

```
╔══════════════╦════════════╦══════════════════╦════════════════════════════╗
║  CAPA        ║ VENTANA    ║ GRANULARIDAD      ║ PROPÓSITO                  ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L1 — HOT     ║ 0–7 días   ║ Full fidelity     ║ Memoria de trabajo.        ║
║              ║            ║ Cada evento       ║ Ayra sabe qué pasó         ║
║              ║            ║                   ║ esta semana.               ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L2 — WARM    ║ 7–30 días  ║ Resumen semanal   ║ Ciclo de campaña.          ║
║              ║            ║ Claude-compressed  ║ 4 semanas = 1 ciclo        ║
║              ║            ║                   ║ completo de cliente.       ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L3 — COLD    ║ 30d+       ║ Resumen mensual   ║ Histórico permanente.      ║
║              ║            ║ Flat append-only  ║ Alinea con cierres         ║
║              ║            ║                   ║ mensuales de campaña.      ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L4 — PATTERNS║ Sin tiempo ║ Condicionales     ║ Inteligencia aprendida.    ║
║              ║            ║ con confianza 0-1 ║ Extraída de L1→L3 por      ║
║              ║            ║                   ║ Claude. Nunca se purga.    ║
╚══════════════╩════════════╩══════════════════╩════════════════════════════╝
```

### 5.2 Tipos de entrada de memoria

| `memory_type` | Qué registra | Capas |
|---|---|---|
| `operational` | Job ejecutado, resultado, duración, tokens | L1, L2, L3 |
| `decision` | Elección de Sam sobre una escalada | L1, L2, L3 |
| `brand_state` | Estado acumulado de marca (score trend, blockers) | L1, L2, L3 |
| `anomaly` | Evento anómalo detectado | L1, L2, L3 |
| `failure` | Error + resolución si ocurrió | L1, L2, L3 |
| `signal` | Performance externo de SignalLab (cuando activo) | L1, L2, L3 |
| `pattern` | Comportamiento aprendido con nivel de confianza | L4 exclusivo |

### 5.3 Promoción entre capas (inteligente, no mecánica)

**L1 → L2 cada domingo 00:00 UTC**
Claude lee L1 de los últimos 7 días. Genera resumen estructurado por marca + tipo. Identifica señales de patrón. Escribe en L2. Pasa señales a `patternExtractor`. Marca L1 como promovido (no borra — conserva para auditoría).

**L2 → L3 el día 1 de cada mes 00:30 UTC**
Claude lee L2 del mes anterior (4 semanas). Genera el resumen mensual: logros, issues resueltos, issues abiertos, tendencias, tokens, decisions tomadas. Escribe en L3 append-only. Genera `monthly_report_{YYYY-MM}.md` disponible en dashboard. Alinea con ciclo de cierre de campañas.

**Extracción de patrones → L4 cada domingo 01:00 UTC**
`patternExtractor` analiza L1 + L2 de las últimas 4 semanas. Busca repeticiones, correlaciones, respuestas de Sam. Para cada patrón con confianza ≥ 0.65: si existe en L4, actualiza confianza; si es nuevo, crea entrada. Notifica a Sam si el patrón es crítico.

**La compresión es inteligente:** un bug resuelto se comprime; un patrón recurrente se extrae a L4 antes de comprimir; una decisión de Sam que establece precedente se conserva y se marca para L4.

### 5.4 Ejemplo de patrón L4

```json
{
  "id": "pat_nscf_001",
  "title": "Score NeuroneSCF baja lunes → theme update el viernes anterior",
  "condition": "brand=NeuroneSCF AND job=shopify_audit AND score_drop>8 AND day=Monday",
  "hypothesis": "Updates de theme del viernes rompen settings SEO que el audit detecta el lunes.",
  "recommended_action": "Antes de audit lunes: verificar si hubo theme update viernes previo.",
  "confidence": 0.78,
  "observed_count": 3,
  "applies_to": ["shopify_audit", "seo_fix_empty"],
  "brand_id": "NeuroneSCF",
  "sam_confirmed": false
}
```

### 5.5 Interacción de Sam con L4 (Memory Explorer en dashboard)

- **Confirmar** patrón → confianza = 1.0, Ayra lo trata como regla fija.
- **Descartar** → confianza = 0, Ayra deja de aplicarlo.
- **Editar** acción recomendada → Ayra actualiza su comportamiento.
- Ayra notifica a Sam cada vez que un patrón nuevo supera confianza 0.75.

---

## 6. COMPONENTE 4 — DECISION FRAMEWORK

### 6.1 Principio

El Decision Framework es el contrato explícito entre Sam y Ayra. Almacenado en `ayra.decision_framework` en Supabase. Versionado. Editable desde el dashboard. Ayra lo ejecuta literalmente — la interpretación de casos ambiguos es responsabilidad de Claude en sesión.

### 6.2 Framework v1.0

| Categoría | Acción | Autonomía | Condición |
|---|---|---|---|
| **SEO** | Fix title vacío o < 10 chars | ✅ AUTÓNOMO | Solo null o claramente roto |
| **SEO** | Fix description vacía | ✅ AUTÓNOMO | Solo null o < 20 chars |
| **SEO** | Reescribir title existente | ❌ ESCALA | Siempre revisión humana |
| **Precios** | Detectar precio $0.00 | ⚠️ NOTIFICA | Alerta inmediata, no toca |
| **Precios** | Cualquier cambio de precio | ❌ ESCALA | Nunca autónomo |
| **Shopify** | Ejecutar audit diario | ✅ AUTÓNOMO | Cron 6am, todas las tiendas |
| **Shopify** | Fix compliance claim conocido | ✅ AUTÓNOMO | Solo claims en lista negra probada |
| **Shopify** | Modificar theme | ❌ ESCALA | Siempre revisión humana |
| **Shopify** | Añadir / eliminar producto | ❌ ESCALA | Siempre revisión humana |
| **Imágenes** | Detectar producto sin imagen | ⚠️ NOTIFICA | Alerta en digest |
| **Imágenes** | Subir o modificar imagen | ❌ ESCALA | Sam decide |
| **Contenido** | Publicar post status=approved | ✅ AUTÓNOMO | Requiere SocialLab deploy |
| **Contenido** | Crear nuevo contenido | ❌ ESCALA | Requiere brief de Sam |
| **Labs** | Ping de salud cada 2h | ✅ AUTÓNOMO | Siempre |
| **Labs** | Reiniciar o redeploy | ❌ ESCALA | Requiere autorización |
| **Infra** | Deploy de código | ❌ ESCALA | Nunca autónomo |
| **Infra** | Modificar env variables | ❌ ESCALA | Nunca autónomo |
| **Campañas** | Detectar quema de budget | ⚠️ NOTIFICA + pausa 30min | Pausa si Sam no responde |
| **Campañas** | Crear o modificar campaña | ❌ ESCALA | Requiere brief aprobado |
| **Memoria** | Escribir L1, L2, L3, L4 | ✅ AUTÓNOMO | Siempre — operación interna |
| **Memoria** | Confirmar / descartar patrón L4 | ⚠️ NOTIFICA | Sam confirma desde dashboard |
| **Compute** | Tokens > threshold semanal | ⚠️ NOTIFICA | Threshold configurable — ver Sección 14. Esta alerta es autoregulación operacional de Ayra. La visión financiera estratégica completa del Studio (subscripciones, todos los servicios) es responsabilidad de UNRLVL-OPS, que lee de Ayra vía `/api/cost-export`. |
| **Signal** | Fetch datos SignalLab | ✅ AUTÓNOMO | Cuando lab activo para esa marca |
| **Signal** | Aplicar rewrite de copy sugerido | ⚠️ NOTIFICA | Sam aprueba antes de publicar |

---

## 7. COMPONENTE 5 — LIVE DASHBOARD

### 7.1 Descripción

React app en `ayra.unrealvillestudio.com/dashboard`. Lectura en tiempo real via Supabase Realtime. Auth token-based con roles: `admin` (Sam — ve todo), `brand_manager` (equipo UNRLVL), `client` (solo su marca).

### 7.2 Layout vista admin (Sam)

```
╔══════════════════════════════════════════════════════════════════════╗
║  AYRA DASHBOARD                              Dom 05 Jun · 07:02am   ║
╠══════════════════════════════════════════════════════════════════════╣
║  ECOSYSTEM HEALTH                                                    ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ ║
║  │ Labs     │  │ EFs      │  │ Brands   │  │ Ayra jobs hoy        │ ║
║  │ 7/9 ✅   │  │ 16/17 ✅ │  │🟢🟢🟡🟢 │  │ 8 done · 0 err      │ ║
║  │ imagelab │  │ translate│  │          │  │ 0 running · 2 queued │ ║
║  │ ⚠️ bug   │  │ 🔴 bug   │  │          │  │                      │ ║
║  └──────────┘  └──────────┘  └──────────┘  └──────────────────────┘ ║
║                                                                      ║
║  PENDING DECISIONS (requieren Sam)                    2 pendientes  ║
║  ┌──────────────────────────────────────────────────────────────┐   ║
║  │ 🔴 NeuroneSCF: auto-translate bug 31d abierto               │   ║
║  │    ¿Autorizo investigar fix?  [Sí] [No] [Ver contexto]      │   ║
║  │                                                              │   ║
║  │ ⚠️ ImageLab: 3 fallos consecutivos                          │   ║
║  │    ¿Investigar o esperar sesión?  [Investigar] [Esperar]    │   ║
║  └──────────────────────────────────────────────────────────────┘   ║
║                                                                      ║
║  LAST 24H ACTIVITY              ECOSYSTEM MAP                        ║
║  ✅ shopify_audit NSCF B2C      [Grafo visual nodos                  ║
║     Score: 157/200 (+3)          con estado en tiempo real]          ║
║  ✅ shopify_audit NSCF B2B                                           ║
║     Score: 133/160 (=)          SIGNAL (por marca)                  ║
║  ✅ social_export: 3 sessions   NeuroneSCF: ⏳ tracking pendiente   ║
║  ⚠️ imagelab: timeout x3        ForumPHs: N/A                       ║
║                                                                      ║
║  [Simulators]  [Memory Explorer]  [Brands]  [Digests]  [Patterns]  ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 7.3 Vista cliente

- Score Shopify actual + trend 30 días
- Últimas 10 acciones de Ayra sobre su cuenta
- Pendientes que requieren acción del cliente
- Historial de simulaciones de su marca
- Sección Signal cuando activo

### 7.4 Ecosystem Map

Visualización D3/Cytoscape del `ecosystem_graph.json` + health live. Nodos coloreados por estado (verde/amarillo/rojo). Click en nodo: status, última actividad, blockers, jobs relacionados.

---

## 8. COMPONENTE 6 — DAILY DIGEST

### 8.1 Mecánica

Cron 11:00 UTC (7:00am ET). `digestBuilder` consulta Supabase (ayra.jobs, ayra.decisions, ayra.log, system_health) del período anterior. Claude genera el digest como informe ejecutivo. Se escribe en dashboard. Se entrega por canal.

### 8.2 Estructura

```markdown
## AYRA DAILY DIGEST — Lun 09 Jun 2026 · 07:00am ET

**HICE ESTO:**
- ✅ Audit NeuroneSCF B2C: 157/200 (+3). Mejora sostenida 3ª semana.
- ✅ Fix SEO: 2 titles vacíos corregidos (Kerasin HB, Humit Moisture Mask).
- ✅ Social Agent: 3 sesiones procesadas. PO completó paso 6.
- ✅ Health: todos los sistemas OK excepto ImageLab.

**ENCONTRÉ:**
- ⚠️ ImageLab: timeout 3 veces consecutivas desde el viernes.
- ℹ️ NeuroneSCF B2C: 4 kits aún sin imagen (~8pts de score bloqueados).
- 🔴 auto-translate: bug abierto 31 días — 42 descripciones EN bloqueadas.

**NECESITO TU DECISIÓN:**
1. ¿Autorizo investigar auto-translate bug? (~2-3h sesión con Claude)
2. ¿Investigamos ImageLab timeout o esperas sesión?

**SISTEMA:** Jobs: 8 · Errores: 1 · Tokens: ~$0.19 · Score NeuroneSCF: ↑ tendencia

[Dashboard] [Responder decisiones]
---
*Ayra · Unreal>ille Studio · Próximo digest mañana 07:00am*
```

### 8.3 Sección Signal (cuando activo por marca)

```markdown
**SIGNAL — NeuroneSCF:**
- Meta Ads: CTR 2.1% (+0.3% vs semana anterior). Kit Kerasin lidera.
- ROAS semana: 3.2x. Dentro del objetivo.
- ⚠️ TikTok: alcance -18% en reels de producto. Ver SignalPanel.
```

### 8.4 Canal de entrega

| Fase | Canal | Prerequisito |
|---|---|---|
| v1 Sprint 3 | Dashboard | Deploy Ayra |
| v2 | Email Sam | `notifier.ts` email setup |
| v3 | WhatsApp Sam | WABA número UNRLVL dedicado |

---

## 9. COMPONENTE 7 — SIMULATOR AGENTS

### 9.1 Propósito

Agentes Claude especializados que producen análisis estructurado de impacto y predicciones dado el contexto de una marca + escenario. Accesibles desde dashboard y desde Claude en sesión.

**Endpoint:** `POST https://unrlvl-ayra.vercel.app/api/simulator`

### 9.2 Fase 1 — Deterministas (desde Sprint 4)

| Simulador | Input | Confianza base |
|---|---|---|
| `margin_calculator` | Catálogo + precios + costos | Alta — cálculo puro |
| `campaign_budget` | Marca + objetivo + budget + benchmarks | Media |
| `onboarding_readiness` | Brand context completo | Alta — análisis estructural |
| `content_calendar` | Marca + plataformas + objetivos | Media |
| `ecosystem_impact` | Cambio propuesto en el stack | Alta — análisis de grafo |
| `lab_dependency` | Tarea objetivo | Alta — análisis de grafo |

### 9.3 Fase 2 — Calibrados (cuando SignalLab tiene 60+ días de datos por marca)

| Simulador | Qué añade |
|---|---|
| `campaign_performance` | ROAS predictivo con intervalo de confianza real |
| `conversion_optimizer` | CRO con impacto estimado desde datos propios |
| `content_impact` | Predicción alcance/conversión por tipo de contenido |
| `budget_optimizer` | Distribución óptima cross-canal basada en historial |

### 9.4 Respuesta tipo

```typescript
interface SimulatorResponse {
  simulator_type: string;
  brand_id: string;
  confidence: number;
  data_source: 'deterministic' | 'industry_benchmarks' | 'signal_calibrated';
  predictions: { metric: string; value: number | string; range?: [number, number] }[];
  recommendations: { priority: 'critical'|'high'|'medium'; action: string; expected_impact: string }[];
  assumptions: string[];
  limitations: string[];
  signal_data_available: boolean;
  signal_data_days?: number;
}
```

### 9.5 Flujo en sesión con Claude

```
Sam: "Simula qué pasa si bajo los kits punta de $89 a $79"
    │
    ▼
Claude llama /api/simulator
  { type: "margin_calculator", brand_id: "NeuroneSCF",
    scenario: { sku_group: "kits_punta", price_change: -10 } }
    │
    ▼
Simulador carga catálogo NeuroneSCF (BluePrints + Supabase)
Calcula márgenes actuales vs propuestos
Analiza impacto en revenue, margen bruto, AOV
    │
    ▼
Claude interpreta + genera recomendación ejecutiva para Sam
Escribe en ayra.simulations para referencia futura
```

---

## 10. COMPONENTE 8 — SIGNALLAB

### 10.1 Qué es SignalLab y qué NO es

**SignalLab es inteligencia de performance externo.** Lo que el mercado respondió a las acciones de cada cliente. Meta Ads API, GA4, TikTok Ads, Shopify Analytics. Analiza qué funcionó. Propone o aplica (con aprobación) rewrites de copy, ajustes de creative brief, optimizaciones de campaña.

**NO es la Memoria de Ayra.** La Memoria L1-L4 registra operaciones internas de UNRLVL. SignalLab registra la respuesta del mercado a esas operaciones. Son capas distintas y complementarias.

```
Ayra Memory (L1-L4)         SignalLab
══════════════════          ══════════════════
"Corrimos audit B2C"  +     "CTR del creativo A fue 2.3%"
"Fix SEO aplicado"    +     "Conversión subió 8% post-fix"
"Publicamos post X"   +     "Post X generó 4x engagement normal"
        │                           │
        └──────────────┬────────────┘
                       │
                  DAILY DIGEST
              + SIMULADORES FASE 2
```

### 10.2 Activación por cliente

SignalLab se activa cliente por cliente cuando ese cliente tiene:
1. Pixels instalados y verificados (Meta, TikTok, Google)
2. Mínimo 30 días de datos acumulados
3. Cuentas de ads conectadas (OAuth por plataforma)

**Orden de activación esperado:**
- NeuroneSCF: primero — launch previsto semana 5, datos suficientes ~semana 9, SignalLab activo ~semana 10
- Cada cliente nuevo: se onboarda con tracking desde día 1

### 10.3 Lo que SignalLab añade cuando está activo

| Área | Sin SignalLab | Con SignalLab activo |
|---|---|---|
| Simuladores | Benchmarks industria (~0.6 confianza) | Datos propios calibrados (~0.85 confianza) |
| Digest | Sin sección campaign performance | ROAS, CTR, tendencias reales |
| Memoria L4 | Patrones operacionales | + Patrones contenido→conversión |
| Autonomía | Escala siempre lo de campaña | Detecta anomalías, notifica proactivamente |

---

## 11. COMPONENTE 9 — MCP LAYER _(nuevo v3.0)_

### 11.1 Por qué existe y por qué es el último componente

El MCP Layer no añade capacidades nuevas a Ayra. Expone las capacidades que Ayra ya tiene como herramientas nativas del protocolo MCP, consumibles directamente por Claude en sesión sin llamadas manuales a endpoints.

**Hoy (sin MCP Layer):**
```
Claude en sesión → carga ecosystem.json (snapshot estático)
                 → carga AYRA_MASTER_PLAN.md (documento)
                 → carga session_log.md (manual)
Resultado: contexto con antigüedad = último commit de Sam
```

**Post Sprint 6 (con MCP Layer):**
```
Claude en sesión → ayra_ecosystem_status()    → health real < 1h
                 → ayra_decisions_pending()   → queue real de decisiones
                 → ayra_memory_recent(brand)  → L1 últimos 7 días real
                 → ayra_simulate(type, ...)   → análisis con datos vivos
                 → ayra_trigger_job(type)     → lanza job desde sesión
Resultado: contexto completamente vivo, sin depender de commits
```

El valor del MCP Layer es **directamente proporcional** a cuánto de Ayra esté construido. Antes de Sprint 3 (Digest + Memoria L1), las herramientas no tendrían nada sustancial que devolver. Después de Sprint 3-4, serían la interfaz más poderosa que Claude puede tener con un ecosistema real.

**Por eso es el Sprint 6, no el Sprint 1.** No es falta de ambición — es orden correcto de construcción.

### 11.2 Arquitectura

Las rutas MCP viven dentro del mismo repo `unrlvl-ayra`. No se crea un repositorio nuevo.

```
unrlvl-ayra/
└── api/
    └── mcp/
        └── index.ts      ← Punto de entrada MCP (protocolo estándar Anthropic)
```

**URL del server:** `https://unrlvl-ayra.vercel.app/api/mcp`

### 11.3 Herramientas MCP v1

| Tool | Descripción | Fuente de datos |
|---|---|---|
| `ayra_ecosystem_status` | Estado de labs, EFs, agentes, jobs recientes | `ayra.system_health` + `ayra.jobs` |
| `ayra_decisions_pending` | Cola de decisiones esperando a Sam | `ayra.decisions` WHERE status=pending |
| `ayra_memory_recent(brand_id, days?)` | Eventos L1 de los últimos N días por marca | `ayra.memory_hot` |
| `ayra_simulate(type, brand_id, scenario)` | Ejecuta un simulador y devuelve análisis | `/api/simulator` interno |
| `ayra_trigger_job(job_type, brand_id?)` | Lanza un job manual desde sesión Claude | `/api/ayra-trigger` interno |
| `ayra_graph` | Grafo + health del ecosistema completo | `ecosystem_graph.json` + health EP |
| `ayra_digest_latest` | Último Daily Digest generado | `ayra.digests` tabla |

### 11.4 Protocolo de sesión post-Sprint 6

El "protocolo actualización" se transforma:

```
HOY:
  1. Vercel:web_fetch ecosystem.json
  2. Vercel:web_fetch AGENDA.md
  3. Vercel:web_fetch skills/INDEX.md

POST SPRINT 6:
  1. ayra_ecosystem_status()       → estado real del ecosistema
  2. ayra_decisions_pending()      → qué espera decisión de Sam
  3. ayra_digest_latest()          → resumen del día / semana
  4. ayra_memory_recent(brand_id)  → si hay marca específica activa
  5. ecosystem.json sigue cargando para metadata estática del Studio
```

Los archivos JSON estáticos no desaparecen — siguen siendo la fuente de verdad para el diseño del ecosistema. El MCP Layer añade el estado vivo encima.

### 11.5 Consideraciones de seguridad

- El MCP endpoint requiere autenticación Bearer token (mismo patrón `AYRA_HEALTH_SECRET`)
- Cada tool tiene permisos declarados explícitamente (read-only vs write)
- `ayra_trigger_job` es la única tool con side effects — requiere confirmación explícita en el prompt del tool antes de ejecutar
- Las tools read-only (ecosystem_status, decisions, memory, graph, digest) no pueden mutar estado

---

## 12. DATA MODEL — SUPABASE

### 12.1 Schema `ayra` — tablas nuevas

```sql
-- Estado de todos los componentes del ecosistema
CREATE TABLE ayra.system_health (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_type  TEXT NOT NULL,  -- 'lab'|'ef'|'agent'|'brand'|'proxy'
  component_id    TEXT NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('ok','warning','error','unknown')),
  detail          TEXT,
  metadata        JSONB,
  last_checked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (component_type, component_id)
);

-- Historial de ejecución de todos los jobs
CREATE TABLE ayra.jobs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type     TEXT NOT NULL,
  brand_id     TEXT,
  status       TEXT NOT NULL CHECK (status IN ('queued','running','completed','failed','skipped')),
  trigger      TEXT NOT NULL,  -- 'cron'|'manual'|'event'|'ayra'
  input        JSONB,
  output       JSONB,
  error        TEXT,
  tokens_used  INTEGER,
  cost_usd     DECIMAL(8,6),   -- costo real en dólares para monitoreo
  started_at   TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Decisiones pendientes de Sam
CREATE TABLE ayra.decisions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type         TEXT NOT NULL,  -- 'approval'|'choice'|'information'
  priority     TEXT NOT NULL CHECK (priority IN ('critical','high','medium','low')),
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  options      JSONB,
  context      JSONB,
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','resolved','dismissed')),
  resolved_by  TEXT,
  resolution   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  resolved_at  TIMESTAMPTZ
);

-- Audit trail completo
CREATE TABLE ayra.log (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id     UUID REFERENCES ayra.jobs(id),
  level      TEXT NOT NULL CHECK (level IN ('info','warning','error','success')),
  message    TEXT NOT NULL,
  brand_id   TEXT,
  component  TEXT,
  metadata   JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- El contrato de autonomía (editable por Sam desde dashboard)
CREATE TABLE ayra.decision_framework (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category              TEXT NOT NULL,
  action                TEXT NOT NULL,
  autonomy              TEXT NOT NULL CHECK (autonomy IN ('autonomous','notify','escalate')),
  condition_description TEXT,
  notify_window_minutes INTEGER,
  active                BOOLEAN DEFAULT true,
  version               TEXT DEFAULT '1.0',
  updated_by            TEXT DEFAULT 'sam',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- L1 — Hot Memory (0-7 días, full fidelity)
CREATE TABLE ayra.memory_hot (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    TEXT,
  memory_type TEXT NOT NULL,
  title       TEXT NOT NULL,
  content     JSONB NOT NULL,
  promoted    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- L2 — Warm Memory (7-30 días, resumen semanal)
CREATE TABLE ayra.memory_warm (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id         TEXT,
  week_start       DATE NOT NULL,
  week_end         DATE NOT NULL,
  summary          TEXT NOT NULL,
  highlights       JSONB,
  pattern_signals  JSONB,
  promoted         BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- L3 — Cold Memory (30d+, mensual append-only)
CREATE TABLE ayra.memory_cold (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id   TEXT,
  month      TEXT NOT NULL,  -- 'YYYY-MM'
  summary    TEXT NOT NULL,
  metrics    JSONB,
  report_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- L4 — Patterns (sin tiempo, inteligencia aprendida)
CREATE TABLE ayra.memory_patterns (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title              TEXT NOT NULL,
  pattern_type       TEXT NOT NULL,  -- 'correlation'|'behavior'|'preference'|'anomaly'
  condition_text     TEXT NOT NULL,
  hypothesis         TEXT NOT NULL,
  recommended_action TEXT NOT NULL,
  confidence         DECIMAL(3,2) NOT NULL CHECK (confidence BETWEEN 0 AND 1),
  observed_count     INTEGER DEFAULT 1,
  applies_to         TEXT[],
  brand_id           TEXT,
  sam_confirmed      BOOLEAN DEFAULT false,
  sam_dismissed      BOOLEAN DEFAULT false,
  first_detected     TIMESTAMPTZ DEFAULT NOW(),
  last_updated       TIMESTAMPTZ DEFAULT NOW()
);

-- Historial de simulaciones
CREATE TABLE ayra.simulations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  simulator_type TEXT NOT NULL,
  brand_id       TEXT NOT NULL,
  input          JSONB NOT NULL,
  output         JSONB NOT NULL,
  confidence     DECIMAL(3,2),
  data_source    TEXT,
  created_by     TEXT DEFAULT 'sam',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Digests (historial navegable en dashboard)
CREATE TABLE ayra.digests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date         DATE NOT NULL,
  content_md   TEXT NOT NULL,
  delivered_at TIMESTAMPTZ,
  channel      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Costos de compute por semana (monitoreo del threshold)
CREATE TABLE ayra.compute_budget (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start   DATE NOT NULL,
  brand_id     TEXT,
  tokens_used  BIGINT DEFAULT 0,
  cost_usd     DECIMAL(8,4) DEFAULT 0,
  threshold    DECIMAL(8,4),
  alert_sent   BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### 12.2 Tablas existentes que Ayra lee (sin modificar schema)

| Tabla | Schema | Uso |
|---|---|---|
| `brands` | public | Contexto de marca para jobs |
| `lab_configs` | public | Endpoints de labs para jobRunner |
| `humanize_profiles` | public | Voz de marca para jobs de contenido |
| `compliance_rules` | public | Reglas para compliance_scan |
| `agents` | public | Estado de agentes (30 cols, 0 rows — integrar en Sprint 0/1) |
| `shopify_stores` (= `shopify.stores`) | shopify | Credenciales tiendas para jobs Shopify |
| `orchestrator_jobs` | content | Estado del pipeline IID para monitoring |
| `iid_content_queue` | intel | Cola IID — Ayra monitorea que no se bloquee |
| `iid_cron_runs` | intel | Historial de runs del pipeline IID |
| `ops_costs` | public | Fuente para api/cost-export → UNRLVL-OPS |
| `ops_renewals` | public | Calendario de renovaciones → alertas proactivas |
| `fph.owners` | fph | Estado propietarios ForumPHs |
| `fph.payments` | fph | Pagos ForumPHs — input para ForumPHs-OPS tone engine |

### 12.3 ForumPHs — Plan de migración (Sprint 3 Agent)

ForumPHs ya tiene su propia cuenta Supabase. El aislamiento está decidido. Lo que queda:

1. **Migrar tablas del schema `fph`** (unrlvl-db) → cuenta ForumPHs dedicada
2. **Adecuar el schema** según los requerimientos del ForumPHs-OPS agent (tone engine, owner states, etc.)
3. **Carga de datos reales** con Ivette — propietarios, unidades, estados financieros actuales
4. **Eliminar o archivar** el schema `fph` en unrlvl-db post-migración

Ayra **no monitoreará** el schema `fph` en unrlvl-db durante el proceso de migración — los datos ahí no son fuente de verdad hasta que la migración complete. Una vez migrado, Ayra monitorea la cuenta ForumPHs directamente via job dedicado.

---

## 13. ARQUITECTURA CRON — DECISIÓN PENDIENTE _(nuevo v3.0)_

### 13.1 El problema

Las Serverless Functions de Vercel tienen un límite de ejecución de **60 segundos** en el plan Pro. Los jobs pesados de Ayra — especialmente los que llaman a la Claude API — exceden ese límite con frecuencia:

| Job | Estimado de duración | ¿Excede 60s? |
|---|---|---|
| `health_update` | ~5-10s | No |
| `lab_ping` | ~15-20s | No |
| `graph_validate` | ~20-30s | No (probablemente) |
| `shopify_audit` | ~30-45s | Borderline |
| `social_export` | ~45-90s | Sí — llama Claude |
| `daily_digest` | ~90-180s | Sí — llama Claude |
| `memory_promote_l1` | ~120-240s | Sí — Claude comprime semana |
| `pattern_extract` | ~180-360s | Sí — Claude analiza L1+L2 |

Si un job se corta a los 60s, Vercel devuelve 504 y el job falla silenciosamente — Ayra no escribe en L1, no detecta el fallo, y el cron no reintenta. Esto es el riesgo de corrupción silenciosa más alto de la arquitectura.

**Esta decisión debe tomarse en Sprint 0/1, antes de escribir `jobRunner.ts`.** La elección afecta cómo se estructura cada job desde el inicio.

### 13.2 Opciones

#### Opción A — Fire-and-forget vía Supabase Edge Functions

El endpoint cron de Vercel devuelve 200 en < 5 segundos y despacha el trabajo real a una Supabase Edge Function en background usando `EdgeRuntime.waitUntil`. Las EFs de Supabase tienen hasta 150 segundos de ejecución y soportan llamadas externas (Claude API, Tools proxies).

```typescript
// api/ayra-cron.ts (Vercel — responde rápido)
export async function GET(req: Request) {
  const job = req.url.searchParams.get('job');
  // Despacha a Supabase EF sin esperar respuesta
  fetch('https://[project].supabase.co/functions/v1/ayra-job-runner', {
    method: 'POST',
    body: JSON.stringify({ job_type: job }),
    headers: { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}` }
  }); // No await — fire and forget
  return Response.json({ status: 'dispatched', job });
}
```

**Pros:**
- Consistente con el stack existente (Supabase EFs ya existen en el ecosistema — 17 activas)
- Sin costo adicional — Supabase EFs incluidas en el plan
- La lógica de negocio vive cerca de los datos (misma plataforma)
- Reintentos manuales posibles desde dashboard

**Contras:**
- Sin retry automático — si la EF falla, nadie lo reintenta salvo el cron del día siguiente
- 150s puede quedar corto para `pattern_extract` con muchas marcas activas en el futuro
- Observabilidad limitada en el tier actual de Supabase

---

#### Opción B — QStash (Upstash)

Cola de mensajes serverless con retry automático, dead letter queue, y TTL configurable. El cron encola el job en QStash; QStash lo ejecuta llamando a un endpoint Vercel con reintentos automáticos hasta N veces.

```typescript
// api/ayra-cron.ts (Vercel — encola en QStash)
import { Client } from '@upstash/qstash';
const qstash = new Client({ token: process.env.QSTASH_TOKEN });

export async function GET(req: Request) {
  const job = req.url.searchParams.get('job');
  await qstash.publishJSON({
    url: `https://unrlvl-ayra.vercel.app/api/ayra-worker?job=${job}`,
    body: { job_type: job },
    retries: 3,
    timeout: 300  // QStash espera hasta 5 min para la respuesta
  });
  return Response.json({ status: 'queued', job });
}
```

**Pros:**
- Retry automático con backoff configurable (crítico para jobs de memoria)
- Dead letter queue — los jobs fallidos no desaparecen, se pueden reinspeccionar
- Timeout de hasta 5 minutos por job (cubre `pattern_extract` incluso con muchas marcas)
- Observabilidad nativa en Upstash console

**Contras:**
- Dependencia externa adicional (nuevo proveedor en el stack)
- Costo: ~$0/mes en el tier free hasta 500 mensajes/día. Con 10 jobs/día = 300 mensajes/mes — gratuito indefinidamente al ritmo actual
- Latencia adicional de 1-5s por el encolamiento (irrelevante para jobs batch)

---

#### Opción C — Vercel Pro con `maxDuration`

Vercel Pro permite extender el timeout hasta 300s por función configurando `maxDuration` en `vercel.json`.

```json
{
  "functions": {
    "api/ayra-cron.ts": { "maxDuration": 300 }
  }
}
```

**Pros:** Zero overhead. Sin cambios de arquitectura. Funciona mañana.

**Contras:**
- Sin retry automático — si el job falla a los 280s, se pierde
- Bloquea la serverless function durante toda la ejecución
- A $20/mes Vercel Pro, las ejecuciones largas consumen GB-hours — con 10 jobs pesados/día puede haber costos adicionales dependiendo del plan exacto
- No escala bien con más marcas (un job de memoria para 5 marcas podría superar 300s)

---

### 13.3 Recomendación documentada (sin decidir)

Para el Sprint 2 inicial (jobs más simples: audit, social_export, health), la Opción C es suficiente y tiene cero overhead. A medida que se construyen los jobs pesados (Sprint 5: memory_promote, pattern_extract), la presión aumenta y la Opción A o B se vuelven necesarias.

**Punto de decisión natural:** cuando se diseñe `memory_promote_l1` en Sprint 5. En ese momento hay datos reales de cuánto tarda el resto de jobs y la decisión es informada.

---

## 14. COMPUTE ESTIMADO POR SPRINT _(nuevo v3.0)_

### 14.1 El problema con el threshold de $5/semana

El threshold definido en v2.1 es correcto para Sprint 1-2 con una sola marca. Se queda corto a partir de Sprint 3 cuando el Daily Digest corre diariamente y hay múltiples marcas activas. Si el threshold es demasiado bajo, Ayra generará alertas de compute constantemente y Sam se desensibilizará a ellas — invalidando el propósito del monitoreo.

### 14.2 Estimado por sprint y marca

| Job | Tokens est. | Costo/ejecución | Frecuencia | Costo/semana |
|---|---|---|---|---|
| `health_update` | ~100 | ~$0.0003 | 24x/día | ~$0.05 |
| `lab_ping` | ~50 | ~$0.0001 | 12x/día | ~$0.02 |
| `graph_validate` | ~200 | ~$0.0006 | 1x/día | ~$0.004 |
| `shopify_audit` (x tienda) | ~800 | ~$0.0024 | 1x/día | ~$0.017 |
| `social_export` | ~1,500 | ~$0.0045 | 1x/día | ~$0.032 |
| `daily_digest` | ~3,000 | ~$0.009 | 1x/día | ~$0.063 |
| `memory_promote_l1` | ~4,000 | ~$0.012 | 1x/semana | ~$0.012 |
| `pattern_extract` | ~6,000 | ~$0.018 | 1x/semana | ~$0.018 |

_Precios basados en claude-sonnet-4 a ~$3/1M tokens input + $15/1M output. Estimados conservadores._

### 14.3 Costo total estimado por escenario

| Sprint | Marcas activas | Jobs activos | Costo est./semana |
|---|---|---|---|
| Sprint 1 | 1 (NSCF) | health + ping + validate | ~$0.08 |
| Sprint 2 | 1 | + audit + social_export | ~$0.23 |
| Sprint 3 | 1 | + daily_digest | ~$0.50 |
| Sprint 3 | 2 marcas (NSCF + PO) | ídem × 2 | ~$0.85 |
| Sprint 4 | 2 marcas | + simulaciones ocasionales (~5/sem) | ~$1.25 |
| Sprint 5 | 3 marcas (+ ForumPHs) | + memory_promote + pattern_extract | ~$2.80 |
| Sprint 5 maduro | 5 marcas | ecosistema completo | ~$6-10 |

### 14.5 UNRLVL-OPS — El nivel estratégico

`ayra.compute_budget` y `ayra.jobs.cost_usd` son datos de Ayra sobre sí misma: cuánto cuesta operar el orquestador. Son necesarios para la autoregulación de Ayra (el threshold del Decision Framework) y para que Sam tenga visibilidad del costo del sistema que construyó.

Pero el costo total de UNRLVL Studio es mucho más amplio: Vercel Pro, Supabase, Twilio, Anthropic API, ElevenLabs (futuro), dominios, herramientas de diseño, tools de terceros. Ninguno de esos aparece en `ayra.*`. Esa visión completa es responsabilidad de **UNRLVL-OPS**.

**La relación arquitectónica:**

```
ayra.jobs.cost_usd
        │
        ▼ (cron semanal: memory_promote_l1 lo agrega)
ayra.compute_budget
        │
        ▼ GET /api/cost-export (endpoint de lectura, Bearer auth)
UNRLVL-OPS
  ├── ops.cost_centers
  │     ├── "ayra_compute"      ← lee de /api/cost-export
  │     ├── "vercel_pro"        ← $20/mes fijo
  │     ├── "supabase_main"     ← $25/mes fijo
  │     ├── "supabase_forumph"  ← $25/mes (cuando activo)
  │     ├── "twilio"            ← variable (agentes activos)
  │     ├── "anthropic_api"     ← variable (labs + agentes)
  │     └── "otros"             ← herramientas, dominios, etc.
  │
  ├── ops.billing_calendar      ← fechas de renovación + montos esperados
  ├── ops.budget_alerts         ← alertas configuradas por Sam
  └── ops.monthly_summary       ← cierre mensual total del Studio
```

**El endpoint `GET /api/cost-export`:**

```typescript
// api/cost-export.ts — endpoint de lectura en unrlvl-ayra
// UNRLVL-OPS lo llama para obtener el costo de compute de Ayra
// Solo lectura. Requiere Bearer token separado del AYRA_HEALTH_SECRET.

interface CostExportResponse {
  period: { start: string; end: string };
  total_cost_usd: number;
  by_brand: { brand_id: string; cost_usd: number; tokens_used: number }[];
  by_job_type: { job_type: string; cost_usd: number; executions: number }[];
  threshold: number;
  threshold_status: 'ok' | 'warning' | 'exceeded';
  source: 'ayra.compute_budget';
}
```

**Lo que Ayra hace:** monitorea su propio compute, notifica a Sam cuando supera el threshold. Punto.

**Lo que UNRLVL-OPS hace:** agrega el compute de Ayra con todos los demás costos del Studio, genera alertas de "en 5 días se renueva Vercel", "este mes el total fue $X vs $Y del mes anterior", "Twilio está por debajo de $20 de balance". Visión financiera completa del Studio.

**Separación de responsabilidades — no duplicar:**

| Alerta | La genera | Canal |
|---|---|---|
| "Compute Ayra superó $X esta semana" | Ayra → Decision Framework | Dashboard + email |
| "Balance Twilio bajo" | UNRLVL-OPS | Dashboard + email |
| "Vercel renueva en 5 días" | UNRLVL-OPS | Dashboard + email |
| "Costo total Studio este mes: $X" | UNRLVL-OPS | Monthly summary |
| "Compute Ayra fue $X del total $Y" | UNRLVL-OPS | Monthly summary |

Ayra no intenta replicar la visión financiera de UNRLVL-OPS. UNRLVL-OPS no intenta reimplementar el monitoring interno de Ayra. Cada sistema hace lo suyo y expone lo necesario al otro.

**Cuándo construir `api/cost-export.ts`:**

El endpoint es trivial de implementar — es una query a `ayra.compute_budget` con formato de respuesta definido. Se construye en Sprint 2 junto con el resto de los jobs de compute, aunque UNRLVL-OPS no lo consuma hasta que esté construido. El costo de construirlo en Sprint 2 es bajo; el costo de dejarlo para después es deuda de integración.

**Lo que UNRLVL-OPS necesita de este plan:**

UNRLVL-OPS no está especificado en detalle en este documento — tiene su propio plan. Lo que este plan garantiza: cuando UNRLVL-OPS se construya, encontrará en `ayra.compute_budget` datos limpios, granulares por marca y por job, con `cost_usd` calculado desde el primer job de Sprint 1. No habrá deuda de retroalimentación de datos.

Los números reales emergen con Sprints 1-2 en producción. Los estimados de arriba son teóricos.

**Opciones para el threshold:**

| Opción | Threshold | Comportamiento |
|---|---|---|
| A | $5/semana | Correcto hoy. Genera alertas falsas desde Sprint 3. |
| B | $15/semana | Cubre escenario Sprint 5 holgado. Único threshold para toda la vida del plan. |
| C | Escalado por sprint | $5 Sprint 1-2 · $10 Sprint 3-4 · $20 Sprint 5+ (se actualiza en decision_framework) |
| D | Por marca | $3/semana/marca activa (escala con el negocio de forma natural) |

**Punto de decisión natural:** al cierre de Sprint 2, cuando hay 2 semanas de datos reales de tokens. En ese momento se configura el threshold definitivo en `ayra.decision_framework` y en el campo `threshold` de `ayra.compute_budget`.

**Lo que sí se decide ahora:** la tabla `ayra.compute_budget` incluye el campo `threshold` y el campo `cost_usd` en `ayra.jobs` desde Sprint 0. Así cuando sea el momento de configurarlo, los datos ya existen.

---

## 15. PLAN DE EJECUCIÓN

### SPRINT 0 — PREREQUISITOS (antes del 5 Jun)

**Decisiones de Sam:**

| Prioridad | Decisión | Recomendación |
|---|---|---|
| 🔴 Alta | Dominio dashboard | `ayra.unrealvillestudio.com` |
| 🔴 Alta | Canal notificación v1 | Email (implementación más directa) |
| 🟡 Media | Primer cliente externo (Agosto) | ForumPHs (más simple de onboardear) |
| 🟡 Media | Threshold compute semanal | Decidir al cierre Sprint 2 con datos reales |
| 🟡 Media | Arquitectura cron jobs pesados | Decidir al inicio Sprint 5 (ver Sección 13) |

**Acciones técnicas antes del 5 Jun:**
- [ ] Crear repo `unrealvillestudio-hub/unrlvl-ayra` (privado)
- [ ] Crear proyecto Vercel `unrlvl-ayra` → conectar al repo
- [ ] Configurar dominio `ayra.unrealvillestudio.com` en DNS + Vercel
- [ ] `CREATE SCHEMA ayra;` en Supabase `amlvyycfepwhiindxgzw`
- [ ] Ejecutar DDL completo de la Sección 12 (11 tablas)
- [ ] Env vars en Vercel: `AYRA_HEALTH_SECRET`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
- [ ] Commit este archivo: `protocols/AYRA_MASTER_PLAN.md` en `unrlvl-context`

---

### SPRINT 1 — FUNDACIÓN: AYRA TIENE OJOS (5–15 Jun)

**Objetivo:** Ayra puede ver el estado real del ecosistema. Claude puede cargarlo en sesión.

- [ ] `ecosystem_graph.json` v1.0 → commit `unrlvl-context/ecosystem_graph.json` (con 53 EFs reales y 2 instancias Supabase)
- [ ] `api/ecosystem-health.ts` → deployado, sirve desde `ayra.system_health`
- [ ] `lib/contextLoader.ts` v1 → carga grafo + health
- [ ] Job `health_update` → cron 1h, escribe `ayra.system_health`
- [ ] Job `lab_ping` → cron 2h, verifica endpoints activos (10 labs + 23 proyectos Vercel)
- [ ] Job `graph_validate` → cron 5am, valida endpoints declarados en graph
- [ ] Job `iid_queue_check` → cron 9am, verifica que `intel.iid_content_queue` no esté bloqueada
- [ ] `ayra.decision_framework` seed → 24 reglas v1.0 insertadas
- [ ] Dashboard v0.1 → pantalla health (solo lectura)
- [ ] Protocolo Claude actualizado: carga graph + health en apertura de sesión Ayra
- [ ] Definir protocolo de actualización manual de `ecosystem_graph.json`
- [ ] Verificar integración con `public.agents` (30 cols, 0 rows) — no crear schema paralelo

**Validación:** Claude reporta estado de cada lab sin que Sam lo describa. Dashboard muestra health < 1h. `graph_validate` detecta un endpoint caído antes de que el audit lo encuentre.

---

### SPRINT 2 — AYRA TRABAJA: PRIMEROS JOBS (16–30 Jun)

**Objetivo:** Ayra ejecuta sus primeros 5 jobs autónomos sin intervención de Sam.

- [ ] `lib/jobRunner.ts` → integra Tools proxies + Shopify MCP
- [ ] `lib/decisionEngine.ts` → consulta `ayra.decision_framework`
- [ ] `lib/memoryManager.ts` v1 → escritura + lectura en L1
- [ ] Job `shopify_audit` → cron 6am, audit-proxy por tienda
- [ ] Job `social_export` → cron 7am, procesa raw_log Social Media Agent
- [ ] Job `seo_fix_empty` → triggereable post-audit si hay títulos vacíos
- [ ] `api/ayra-trigger.ts` → trigger manual desde chat de Sam
- [ ] `ayra.decisions` activo → Ayra escala issues detectados
- [ ] Dashboard v0.2 → jobs 24h + decisions pending + badge contador
- [ ] Revisar datos reales de tokens consumidos → configurar threshold en `ayra.compute_budget`

**Validación:** Ayra corre audit NeuroneSCF sin instrucción de Sam. Issues en `ayra.decisions` antes de que Sam los reporte.

---

### SPRINT 3 — DAILY DIGEST: AYRA REPORTA (1–14 Jul)

**Objetivo:** Sam recibe informe diario automático. "¿Cómo va?" tiene respuesta inmediata.

- [ ] `lib/digestBuilder.ts` → markdown estructurado desde Supabase
- [ ] Job `daily_digest` → cron 7am ET, genera + escribe en `ayra.digests`
- [ ] `lib/notifier.ts` v1 → email setup
- [ ] Dashboard: sección "Digests" con historial navegable
- [ ] Comando en sesión: "Ayra estado" → Claude carga health + decisions + digest
- [ ] Auth dashboard v1: tokens con roles admin + brand_manager
- [ ] `contextLoader.ts` v2 → incluye lectura de L1 en cada job

**Validación:** Sam recibe digest antes de las 7:05am. Incluye: hice / encontré / decido.

---

### SPRINT 4 — SIMULADORES FASE 1 (15–31 Jul)

**Objetivo:** Ayra puede simular escenarios. "¿Qué pasa si...?" en < 30s.

- [ ] `api/simulator.ts` → endpoint deployado con routing por tipo
- [ ] 6 simuladores Fase 1 implementados y testeados
- [ ] Dashboard: panel Simulators con UI + historial de resultados
- [ ] Claude en sesión: llama simuladores y presenta resultado a Sam
- [ ] `ayra.simulations` activo

**Validación:** "Simula campaña Meta $500 NeuroneSCF" → análisis ejecutivo < 30s con supuestos y limitaciones visibles.

---

### SPRINT 5 — MEMORIA & AUTONOMÍA EXPANDIDA (1–31 Ago)

**Objetivo:** Ayra aprende. Ejecuta más jobs. Dashboard listo para cliente.

**⚠️ Decisión de arquitectura cron a tomar al inicio de este sprint (Sección 13).**

- [ ] Decidir arquitectura para jobs pesados: Opción A (Supabase EF), B (QStash) o C (maxDuration)
- [ ] `memoryManager.ts` v3 → promoción L1→L2 (cron dominical)
- [ ] `memoryManager.ts` v4 → promoción L2→L3 (cron día 1 del mes)
- [ ] `patternExtractor.ts` → extracción L4 (cron dominical post-L1→L2)
- [ ] Dashboard: Memory Explorer (L1/L2/L3 navegables, L4 confirm/dismiss)
- [ ] Job `compliance_scan` → autónomo por marca
- [ ] Job `content_publish` → si SocialLab deployado
- [ ] Decision Framework v1.1 → refinado con 30 días de uso real
- [ ] Auth dashboard v2 → rol `client` con vista de marca propia
- [ ] Pilot cliente (ForumPHs o NeuroneSCF) con vista restringida
- [ ] `ecosystem_graph.json` v1.1 → actualizado con nuevas conexiones
- [ ] Signal Panel → placeholder con status SignalLab por marca

**Validación:** L4 tiene ≥ 1 patrón con confianza > 0.65. Un cliente puede ver su dashboard. Sam puede confirmar/descartar un patrón.

---

### MILESTONE — 31 AGOSTO 2026: AYRA v1.0

```
✅ Monitoreo 24/7 del ecosistema completo
✅ 7+ jobs autónomos en cron
✅ Dashboard live multimarca con auth por roles
✅ Daily Digest automático a las 7am ET
✅ 6 simuladores Fase 1 operativos
✅ Decision Framework activo con audit trail
✅ Memoria L1 + L2 + L4 funcionando
✅ ≥ 1 patrón L4 detectado y validado
✅ 1 cliente con vista propia en dashboard

Pendiente v2 (Sep–Dic 2026):
  → L3 activo (primer mes completo en octubre)
  → SignalLab NeuroneSCF (cuando tracking ≥ 30d + 60d de datos)
  → Simuladores Fase 2 calibrados
  → Digest por WhatsApp cuando WABA UNRLVL activo
  → Dashboard white-label para clientes externos
  → Sprint 6: MCP Layer (ver abajo)
```

---

### SPRINT 6 — MCP LAYER (Sep–Oct 2026, post v1.0)

**Objetivo:** Claude en sesión opera con datos vivos de Ayra, sin depender de commits manuales.

**Prerequisito:** Ayra v1.0 completa. Sin Sprint 3-4-5 funcionando, las herramientas MCP no tienen datos sustanciales que exponer. Este sprint no tiene sentido antes de la v1.0.

- [ ] Diseñar spec de las 7 tools MCP (input/output/permisos)
- [ ] `api/mcp/index.ts` → endpoint MCP estándar Anthropic deployado
- [ ] Implementar tools read-only: `ayra_ecosystem_status`, `ayra_decisions_pending`, `ayra_digest_latest`, `ayra_graph`, `ayra_memory_recent`
- [ ] Implementar tools con side effects: `ayra_simulate`, `ayra_trigger_job`
- [ ] Añadir UNRLVL MCP server a Claude.ai (Settings → Connectors)
- [ ] Actualizar SESSION_PROTOCOL.md → protocolo actualización reemplaza web_fetch por tools MCP
- [ ] QA completo: cada tool devuelve datos correctos en sesión real
- [ ] Documentar en `protocols/AYRA_MCP_SPEC.md`

**Validación:** "protocolo actualización" llama tools MCP en lugar de archivos JSON. Claude reporta estado del ecosistema con < 1h de antigüedad sin que Sam haya commiteado nada.

---

## 16. STACK TÉCNICO & ESTRUCTURA DE REPO

| Capa | Tecnología | Justificación |
|---|---|---|
| AI engine | Claude Sonnet 4 (`claude-sonnet-4-20250514`) | Toda Ayra corre en Claude. Consistencia total. |
| Runtime | Vercel Serverless + Vercel Cron | Stack existente del ecosistema. |
| Jobs pesados | A definir en Sprint 5: Supabase EF / QStash / Vercel maxDuration | Ver Sección 13 |
| DB | Supabase `amlvyycfepwhiindxgzw` | Ya existe. Schema `ayra` es aditivo. |
| Realtime | Supabase Realtime (websockets) | Dashboard live sin polling. |
| Frontend | React 18 + TypeScript + Vite + Tailwind | Stack del ecosistema. |
| Charts | Recharts | Ya en AgentLab y unrlvl-ops. |
| Graph viz | D3.js o Cytoscape.js | Para EcosystemMap visual interactivo. |
| Notificaciones | Email v1 → WABA v2 | WABA cuando número UNRLVL dedicado activo. |
| Auth | Token-based (patrón Social Media Agent) | Consistencia. Sin OAuth complejo en v1. |
| MCP Layer | `api/mcp/index.ts` en unrlvl-ayra (Sprint 6) | Mismo repo, nuevas rutas. |
| Estado persistente | Supabase `ayra.*` | KV es solo del Social Media Agent — no compartir. |

---

## 17. PROTOCOLO DE REANUDACIÓN DE SESIÓN

### Protocolo actual (pre-Sprint 6)

Cuando Sam indique trabajo sobre Ayra, Claude ejecuta en este orden:

```
1. Vercel:web_fetch_vercel_url
   → https://unrlvl-context.vercel.app/protocols/AYRA_MASTER_PLAN.md

2. Vercel:web_fetch_vercel_url
   → https://unrlvl-context.vercel.app/ecosystem.json

3. Vercel:web_fetch_vercel_url
   → https://unrlvl-context.vercel.app/ecosystem_graph.json
     (cuando exista — post Sprint 1)

4. Vercel:web_fetch_vercel_url
   → https://unrlvl-ayra.vercel.app/api/ecosystem-health
     (cuando esté deployado — post Sprint 1)

5. Verificar sprint actual vs plan. Último entregable completado.
   Decisiones pendientes de Sam.

6. Confirmar a Sam:
   "Cargado. Estamos en Sprint X. Último completado: [Y].
    Próximo: [Z]. ¿Arrancamos?"
```

### Protocolo post-Sprint 6 (MCP Layer activo)

```
1. ayra_ecosystem_status()
   → Estado real de labs, EFs, agentes, jobs recientes

2. ayra_decisions_pending()
   → Cola de decisiones esperando a Sam

3. ayra_digest_latest()
   → Resumen del período más reciente

4. ayra_memory_recent(brand_id)  [si hay marca específica activa]
   → Eventos L1 últimos 7 días

5. ecosystem.json sigue cargando (vía web_fetch)
   → Metadata estática: studio, brands, skills, infra

6. Confirmar a Sam con contexto completo y vivo.
```

Los archivos JSON estáticos no desaparecen en el protocolo v2 — siguen siendo la fuente de verdad para diseño del ecosistema. El MCP Layer añade estado vivo encima de ellos.

### Archivos de contexto Ayra en `unrlvl-context`

```
protocols/
  AYRA_MASTER_PLAN.md          ← este archivo (siempre cargar primero)
  AYRA_DECISION_FRAMEWORK.md   ← detalle operacional del framework (Sprint 1)
  AYRA_SPRINT_LOG.md           ← registro de avance por sprint (desde Sprint 1)
  AYRA_MCP_SPEC.md             ← spec de tools MCP (Sprint 6)

ecosystem_graph.json            ← raíz del repo (Sprint 1)
```

---

## 18. PREREQUISITOS ANTES DEL 5 DE JUNIO

### Decisiones de Sam (sin código requerido)

| Prioridad | Decisión | Estado |
|---|---|---|
| 🔴 Alta | Dominio del dashboard | `ayra.unrealvillestudio.com` — confirmar |
| 🔴 Alta | Canal notificación v1 | Email — confirmar |
| 🟡 Media | Primer cliente externo (Agosto) | ForumPHs — confirmar |
| 🟡 Media | Threshold compute | Decidir al cierre Sprint 2 con datos reales |
| 🟡 Media | Arquitectura cron jobs pesados | Decidir al inicio Sprint 5 |

### Acciones técnicas (Sam + Claude en una sesión de ~30min)

- [ ] Crear repo `unrealvillestudio-hub/unrlvl-ayra` (privado) en GitHub
- [ ] Crear proyecto Vercel `unrlvl-ayra` → conectar al repo → configurar dominio
- [ ] Ejecutar `CREATE SCHEMA ayra;` + DDL completo en Supabase principal
- [ ] Añadir env vars en Vercel: `AYRA_HEALTH_SECRET`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
- [ ] Commit este archivo: `protocols/AYRA_MASTER_PLAN.md` en `unrlvl-context`

### Tracking pixels (no bloquea Ayra v1 — pero cada día sin datos es historial perdido)

- [ ] Meta pixel NeuroneSCF B2C: instalar antes de activar campañas
- [ ] Google Analytics 4: ídem
- [ ] TikTok pixel: ídem
- [ ] SignalLab repo: push con README de arquitectura aunque el código esté vacío

---

## 19. APÉNDICE — MAPA DE DEPENDENCIAS CRÍTICAS

```
[Sprint 0 — repo + schema ayra]
    └──► [Sprint 1 puede empezar el 5 de Junio]

[Sprint 1 — ecosystem_graph.json + health EP + graph_validate]
    └──► [Claude tiene mapa real en cada sesión desde el día 1]
              └──► [Calidad de análisis mejora inmediatamente]
              └──► [graph_validate detecta desvíos antes de que el audit los encuentre]

[Sprint 2 — shopify_audit cron]
    └──► [Score actualizado diario sin Sam]
              └──► [seo_fix_empty autónomo]
                        └──► [Score NeuroneSCF mejora semana a semana]

[Sprint 2 — datos reales de tokens]
    └──► [Threshold compute configurado con datos reales]
              └──► [Alertas de compute son señales, no ruido]

[Sprint 3 — Daily Digest]
    └──► [Sam recibe informe 7am sin abrir chat]
              └──► [Visibilidad total del ecosistema desde el móvil]

[Sprint 5 — Memoria L4]
    └──► [Ayra detecta su primer patrón]
              └──► [Decisiones mejoran con el tiempo]
                        └──► [Autonomía se expande de forma controlada]

[Tracking pixels NeuroneSCF]
    └──► [SignalLab NeuroneSCF activo]
              └──► [Simuladores Fase 2 calibrados]
                        └──► [ROAS predictivo real]
                                  └──► [Autonomía parcial en campañas]

[shopify-auto-translate EF fix]
    └──► [42 descripciones EN completadas]
              └──► [Score B2C +~15pts]
                        └──► [Catálogo completo EN]

[SocialLab deploy]
    └──► [Job content_publish autónomo]
              └──► [Publicación de contenido aprobado sin intervención de Sam]

[WABA número UNRLVL dedicado]
    └──► [Daily Digest por WhatsApp]
              └──► [Visibilidad desde móvil sin abrir dashboard ni chat]

[AYRA v1.0 — 31 Agosto]
    └──► [Sprint 6: MCP Layer tiene datos reales que exponer]
              └──► [Protocolo de sesión Claude migra a herramientas vivas]
                        └──► [Cada sesión Claude arranca con contexto total y vivo]
                                  └──► [Zero dependencia de commits manuales para estado]

[Sprint 2 — api/cost-export.ts deployado]
    └──► [UNRLVL-OPS puede leer compute de Ayra cuando esté construido]
              └──► [ops.cost_centers tiene fila "ayra_compute" con datos reales]
                        └──► [Visión financiera total del Studio: compute + subscripciones + servicios]
                                  └──► [Sam recibe alerta de renovación Vercel sin abrir nada]
```

---

_AYRA_MASTER_PLAN.md · Unreal>ille Studio · v3.3 · 2026-05-13_
_v2.1 → v3.0: MCP Layer · Arquitectura Cron · Compute Estimado · graph_validate · ayra.digests · ayra.compute_budget_
_v3.0 → v3.1: UNRLVL-OPS cost interface · api/cost-export.ts · separación responsabilidades_
_v3.1 → v3.2: Audit completo GitHub(23 repos)+Vercel(23 proyectos)+Supabase(53 EFs, 9 schemas) · EcosystemGraph con datos reales_
_v3.2 → v3.3: ForumPHs tiene cuenta Supabase propia (no decisión pendiente) · fph schema = legacy pendiente migrar · XMMs = personal Sam (no patrón de arquitectura) · Sprint 3 Agent reencuadrado como migración_
_Próxima revisión: cierre Sprint 1 → `protocols/AYRA_SPRINT_LOG.md`_
_Commit destino: `unrlvl-context/protocols/AYRA_MASTER_PLAN.md`_
