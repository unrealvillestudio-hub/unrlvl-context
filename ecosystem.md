# ECOSYSTEM — Unrealville Studio
_Generado desde ecosystem.json v8 · 2026-05-13_

---

## STUDIO

**Unrealville Studio** · Brand Intelligence Infrastructure · "Not for everyone."
- Owner: Sam · Founder público: Lucien Sael
- Web: unrealvillestudio.com (LIVE EN+ES)
- GitHub Org: unrealvillestudio-hub
- HQ: 12951 Biscayne Blvd · North Miami, FL 33181

**Lucien Sael:** seudónimo profesional de Sam · luciensael.com (GENERATED v3 — PENDING DEPLOY)

---

## MARCAS (8)

| ID | Nombre | Tipo | Mercado | Estado |
|---|---|---|---|---|
| NeuroneSCF | Neurone South & Central Florida | brand | South & Central Florida, USA | active 🟡 |
| DiamondDetails | Diamond Details | brand | Alicante, España | active |
| VizosCosmetics | Vizos Cosmetics | brand | Miami + España | active |
| D7Herbal | D7 Herbal | brand | Alicante, España | active |
| VivoseMask | Vivose Mask | brand | España | active |
| PatriciaOsorioPersonal | Patricia Osorio · Personal | personal_brand | Miami, FL | active |
| ForumPHs | ForumPHs | brand | Panama | active |
| UnrealvilleStudio | Unrealville Studio | studio | Florida USA + LATAM | active |

### NeuroneSCF — Shopify Detail
- **B2C:** egdk1n-gt.myshopify.com → neuronescflorida.com · Score: 137/200 (audit 2026-05-06)
- **B2B:** nj5ybc-n1.myshopify.com · Score: 133/160 (audit 2026-05-02)
- **Tracking:** ❌ 0/10 pixels pendientes (Meta + TikTok + Google)
- **Blog:** LIVE ✅ · 4 artículos ES+EN · reescritura L0+L3 pendiente
- **Gaps:** Pixels → CRO Checkout → Audit → Ads · DY Fazza imagen · EN descriptions EF bug

---

## LABS (11)

| Lab | URL | AI | Estado |
|---|---|---|---|
| Orchestrator | orchestrator-unrlvl.vercel.app | claude | live |
| CopyLab | unrlvl-copy-lab.vercel.app | gemini | live |
| ImageLab | image-lab-unrlvl.vercel.app | gemini | **bug** — gemini_timeout_50s |
| SocialLab | social-lab-flame.vercel.app | gemini | live |
| WebLab | web-lab-unrlvl.vercel.app | gemini | live |
| AgentLab | agent-lab-unrlvl.vercel.app | claude | live |
| BlueprintLab | unrlvl-blueprint-lab.vercel.app | claude | live |
| VideoLab | unrlvl-video-lab.vercel.app | gemini | live |
| VoiceLab | unrlvl-voice-lab.vercel.app | elevenlabs | live |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | claude | live |
| SignalLab | — | claude | not_deployed |

---

## SUPABASE (3 proyectos)

### unrlvl-db (principal) — amlvyycfepwhiindxgzw
- **Region:** us-east-1 · **Status:** ACTIVE_HEALTHY
- **Schemas:** public(57t) · content(6t) · crm(13t) · fph(22t·LEGACY) · intel(7t) · shopify(6t)
- **Edge Functions:** 53 activas
  - Shopify ecosystem: 22 · NSCF-específicas: 17 · Content/IID: 12 · ForumPHs: 5 · Otros: 4
  - Bug activo: `shopify-auto-translate` (open since 2026-05-06) → bloquea 42 desc EN

### XMMs (personal Sam) — puoybldykxqvhvtnwrld
- Uso: DDMV-Assistant DB + proyecto muerto pendiente eliminar
- ⚠️ Personal — NO patrón de arquitectura · misplaced: nscf_embajadoras, nscf_salones

### ForumPHs (cuenta propia)
- Instancia aislada EXISTENTE · pendiente migración tablas fph + adecuación + carga datos Ivette

---

## AGENTES

### Existentes (4)

| ID | Nombre | Canal | Estado | URL |
|---|---|---|---|---|
| social-media-agent | Social Media Agent | interno | OPERATIONAL | unrlvl-social-media-agent.vercel.app |
| ddmv-assistant | DDMV Assistant | WhatsApp | OPERATIONAL · FIX NEEDED | ddmv-assistant.vercel.app |
| forumph-speaks | ForumPH Speaks | web | OPERATIONAL | forumphs-speaks.vercel.app |
| forumph-document-factory | ForumPH Document Factory | web | OPERATIONAL | forumphs-document-factory.vercel.app |

**DDMV issues:** memoria no persiste entre sesiones · tono inconsistente · Fix Sprint 1 Agent

### Planificados (3)

| ID | Nombre | Sprint | Canal |
|---|---|---|---|
| po-faq-appointments | PO Agent | Sprint 2 Agent | WhatsApp + SMS |
| forumph-ops | ForumPHs-OPS | Sprint 3 Agent | WhatsApp |
| compliance-guardian | Compliance Guardian | Sprint 6 Ayra | interno |

---

## AYRA

**Estado:** PLANNED · Sprint 0 pendiente
**Plan:** protocols/AYRA_MASTER_PLAN.md v3.3
**Repo:** unrealvillestudio-hub/unrlvl-ayra — **POR CREAR**
**URL:** ayra.unrealvillestudio.com — **POR CONFIGURAR**

| Sprint | Fechas | Objetivo |
|---|---|---|
| Sprint 0 | antes Jun 5 | Repo + DB schema + prereqs |
| Sprint 1 | Jun 5-15 | EcosystemGraph + health EP + graph_validate |
| Sprint 2 | Jun 16-30 | Primeros jobs autónomos |
| Sprint 3 | Jul 1-14 | Daily Digest 7am ET |
| Sprint 4 | Jul 15-31 | Simuladores Fase 1 |
| Sprint 5 | Ago 1-31 | Memoria L1+L2+L4 → **AYRA v1.0** |
| Sprint 6 | Sep-Oct 2026 | MCP Layer |

**Milestone:** AYRA v1.0 el 31 de agosto de 2026

---

## UNRLVL-OPS

- **URL:** unrlvl-ops.vercel.app (mantener vercel.app — opacidad intencional)
- **Status:** LIVE · framework: Vite · last deploy: 2026-04-22
- **Features live:** Cost Layer · Insights panel
- **DB:** 11 tablas ops_* en public schema · ops_costs: 10 rows · ops_renewals: 4 rows
- **Integración Ayra:** api/cost-export (Sprint 2) → cost_center: ayra_compute

---

## INFRAESTRUCTURA

| ID | Nombre | URL / ID | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | LIVE |
| INFRA-BRAND-CACHE | Brand Cache API | .../api/brand-cache | LIVE ✅ |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ACTIVE |
| INFRA-TOOLS | UNRLVL Tools | unrlvl-tools.vercel.app | LIVE — ShopifyAuditor v3.5 |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | LIVE EN+ES |
| INFRA-BLUEPRINTS | BluePrints | unrlvl-blueprints.vercel.app | LIVE |
| INFRA-FORUMPHS-COM | forumphs.com | forumphs.com | LIVE |
| INFRA-SB-MAIN | Supabase unrlvl-db | amlvyycfepwhiindxgzw | ACTIVE_HEALTHY |
| INFRA-SB-FORUMPH | Supabase ForumPHs | cuenta propia | EXISTE · pendiente migración |
| INFRA-SB-PERSONAL | Supabase XMMs | puoybldykxqvhvtnwrld | personal · pendiente limpieza |
| INFRA-AYRA | AYRA | ayra.unrealvillestudio.com | PLANNED · Sprint 0 |
| INFRA-VERCEL-KV | Vercel KV | — | PLANNED · Sprint 0 Ayra |
| INFRA-AGENT-TEMPLATE | agent-template repo | — | PLANNED · Sprint 0 Agent |

---

## CONTENT PIPELINE v2.1

- Skill: skills/content-pipeline/SKILL.md
- Layers: L0→L7 (AUDIENCE_BRIEF → WRITE → H+AIFE → HUMANIZE_EMOTIONAL → PSYCHO → CRO → SEO → QA)
- IID Pipeline activo: intel.iid_content_queue (117 items) · 7 EFs activas
- Monitorear con Ayra job `iid_queue_check`

---

## SKILLS SYSTEM v1.1

- 15 skills operativos · Index: skills/INDEX.md
- content-pipeline: path canónico · aife: DEPRECATED

---

## AGENDA — PRÓXIMA SESIÓN

1. **PRIORIDAD 0** — NSCF: Follow-up Patricia accesos Meta BM + TikTok + GA4 (48h máximo)
2. **PRIORIDAD 1** — Legal: Iniciar Stripe Atlas LLC Delaware ($500)
3. **PRIORIDAD 2** — NSCF: DNS Cloudflare TXT → Meta domain verification
4. **PRIORIDAD 3** — NSCF: Decisión KT-104 DY Fazza 200ml vs 400ml
5. **PRIORIDAD 4** — Ayra Sprint 0: CREATE SCHEMA ayra + 11 tablas en Supabase main
6. **PRIORIDAD 5** — Ayra Sprint 0: Crear repo unrlvl-ayra + proyecto Vercel
7. **PRIORIDAD 6** — Infra: luciensael.com DNS apuntar (10 min)
8. **PRIORIDAD 7** — XMMs: eliminar proyecto muerto

---

_ecosystem.md · generado desde ecosystem.json v8 · 2026-05-13_
