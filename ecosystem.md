# ECOSYSTEM — Unrealville Studio
_Generado desde ecosystem.json v9 · 2026-05-17_

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
- **Tracking:** ✅ Meta Pixel 1348252664025025 · ❌ GA4 pendiente · ❌ TikTok pendiente
- **Klaviyo:** ✅ LIVE · Public Key UNF8Ee · 10 templates ES+EN · flows pendiente config manual
- **Judge.me:** ✅ dark theme implementado · badge + widget operativos
- **Gaps:** GA4 → Klaviyo flows UI → CRO Checkout → Audit → Ads · DY Fazza imagen · EN descriptions EF bug

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
- **Schemas:** public(66t) · content(6t) · crm(13t) · fph(22t·LEGACY) · intel(7t) · shopify(6t)
- **Edge Functions: 63 activas**
  - Shopify ecosystem: 22 · NSCF-específicas: 17 · Content/IID: 12 · ForumPHs: 5 · Klaviyo: 5 · **Professor: 6** · Otros: 5
  - Bug activo: `shopify-auto-translate` (open since 2026-05-06) → bloquea 42 desc EN + La Ciencia page

### XMMs (personal Sam) — puoybldykxqvhvtnwrld
- Uso: DDMV-Assistant DB + proyecto muerto pendiente eliminar
- ⚠️ Personal — NO patrón de arquitectura

### ForumPHs (cuenta propia)
- Instancia aislada EXISTENTE · pendiente migración tablas fph + adecuación + carga datos Ivette

---

## PROFESSOR SYSTEM ✅ OPERATIONAL

**Estado:** LIVE desde 2026-05-17 · Plan: `protocols/IMPLEMENTATION_PLAN_MATRIX_PROFESSOR.md v1.1`

### Componentes
- **10 tablas** Supabase: `professor_decision_criteria/veto_rules/decision_cases/weights/manuals/errors_known/learnings/platform_variables/sam_bypasses/cache`
- **6 Edge Functions:** professor-get-context (v3+cache) · professor-evaluate-decision · professor-log-case · professor-submit-learning · professor-approve-learning · professor-checkpoint
- **Cache strategy:** TTL 24h (weights/veto_rules/criteria/platform_vars) · TTL 1h (casos recientes/learnings count) · real-time (bypasses)
- **knowledge/ base:** 5 manuales + 10 errores conocidos · plataformas: Klaviyo · Judge.me · agent-browser · Shopify

### DECISION_MATRIX v1.0
- Documento: `knowledge/ecosystem/decision-matrix/DECISION_MATRIX.md`
- Dimensiones: A (stakeholder) · B (consecuencia) · C (reversibilidad) · D (horizonte)
- Vetos absolutos: V1 LEGAL_IRREVERSIBLE · V2 HARM_VULNERABLE · V3 COMPLIANCE_HARD · V4 SAM_EXPLICIT_LIMIT

### Comandos
- `"Professor, anota"` → captura manual
- Checkpoint automático cada 10 mensajes (silencioso)
- `"Professor"` final de sesión → consolida → Sam aprueba

### ⏳ Pendiente Sam
- `PROFESSOR_SECRET` en Supabase Dashboard → Settings → Edge Functions → Secrets

---

## AGENTES

### Existentes (4)

| ID | Nombre | Canal | Estado | URL |
|---|---|---|---|---|
| social-media-agent | Social Media Agent | interno | OPERATIONAL | unrlvl-social-media-agent.vercel.app |
| ddmv-assistant | DDMV Assistant | WhatsApp | OPERATIONAL · FIX NEEDED | ddmv-assistant.vercel.app |
| forumph-speaks | ForumPH Speaks | web | OPERATIONAL | forumphs-speaks.vercel.app |
| forumph-document-factory | ForumPH Document Factory | web | OPERATIONAL | forumphs-document-factory.vercel.app |

**DDMV issues:** memoria no persiste · tono inconsistente · Fix Sprint 1 Agent

### Planificados (3)

| ID | Nombre | Sprint | Canal |
|---|---|---|---|
| po-faq-appointments | PO Agent | Sprint 2 Agent | WhatsApp + SMS |
| forumph-ops | ForumPHs-OPS | Sprint 3 Agent | WhatsApp |
| compliance-guardian | Compliance Guardian | Sprint 6 Ayra | interno |

---

## AYRA

**Estado:** PLANNED · Sprint 0 pendiente (deadline: 5 Jun 2026)
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

## INFRAESTRUCTURA (14 proyectos)

| ID | Nombre | URL / ID | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | LIVE |
| INFRA-BRAND-CACHE | Brand Cache API | .../api/brand-cache | LIVE ✅ |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ACTIVE |
| INFRA-TOOLS | UNRLVL Tools | unrlvl-tools.vercel.app | LIVE — ShopifyAuditor v3.5 |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | LIVE EN+ES |
| INFRA-BLUEPRINTS | BluePrints | unrlvl-blueprints.vercel.app | LIVE |
| INFRA-FORUMPHS-COM | forumphs.com | forumphs.com | LIVE |
| **INFRA-NSCF-KIOSKO** | **NSCF Kiosko** | **nscf-kiosko.vercel.app** | **LIVE · 2026-05-13** |
| INFRA-SB-MAIN | Supabase unrlvl-db | amlvyycfepwhiindxgzw | ACTIVE_HEALTHY |
| INFRA-SB-FORUMPH | Supabase ForumPHs | cuenta propia | EXISTE · pendiente migración |
| INFRA-SB-PERSONAL | Supabase XMMs | puoybldykxqvhvtnwrld | personal · pendiente limpieza |
| INFRA-AYRA | AYRA | ayra.unrealvillestudio.com | PLANNED · Sprint 0 |
| INFRA-VERCEL-KV | Vercel KV | — | PLANNED · Sprint 0 Ayra |
| INFRA-AGENT-TEMPLATE | agent-template repo | — | PLANNED · Sprint 0 Agent |

---

## AGENDA — PRÓXIMA SESIÓN

1. **PRIORIDAD 0** — PROFESSOR_SECRET en Supabase Dashboard (2 min)
2. **PRIORIDAD 1** — NSCF: GA4 Measurement ID instalar en theme.liquid (5 min)
3. **PRIORIDAD 2** — NSCF: Klaviyo flows 4 bilingüe configurar en UI (manual)
4. **PRIORIDAD 3** — Legal: Iniciar Stripe Atlas LLC Delaware ($500)
5. **PRIORIDAD 4** — NSCF: Decisión KT-104 DY Fazza 200ml vs 400ml
6. **PRIORIDAD 5** — Ayra Sprint 0: CREATE SCHEMA ayra + 11 tablas en Supabase main
7. **PRIORIDAD 6** — Ayra Sprint 0: Crear repo unrlvl-ayra + proyecto Vercel
8. **PRIORIDAD 7** — Infra: luciensael.com DNS apuntar (10 min)
9. **PRIORIDAD 8** — XMMs: eliminar proyecto muerto

---

_ecosystem.md · generado desde ecosystem.json v9 · 2026-05-17_
