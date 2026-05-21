# ECOSYSTEM — Unrealville Studio
_Generado desde ecosystem.json v14 · 2026-05-21_

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
- **Tracking:** ✅ Meta Pixel 1348252664025025 · ✅ GA4 instalado via GTM · ⚠️ TikTok DUPLICADO (resolver antes de ads) · ✅ Klaviyo LIVE
- **Klaviyo:** Public Key UNF8Ee · 10 templates ES+EN · flows pendiente config manual UI
- **CopyLab async:** copylab_jobs tabla activa · dispatcher v9.4.1 ✅ · processor PENDIENTE deploy
- **Gaps:** TikTok pixel fix 🔴 · GTM+GA4 verify · Klaviyo flows UI · Cart A+B ES pendiente

---

## LABS (11)

| Lab | URL | AI | Estado | Versión |
|---|---|---|---|---|
| Orchestrator | orchestrator-unrlvl.vercel.app | claude | live | v2.2 |
| CopyLab | unrlvl-copy-lab.vercel.app | claude+gemini | live | **v9.4.1** — async mode |
| ImageLab | image-lab-unrlvl.vercel.app | gemini | **bug** — gemini_timeout_50s | — |
| SocialLab | social-lab-flame.vercel.app | gemini | live | — |
| WebLab | web-lab-unrlvl.vercel.app | gemini | live | — |
| AgentLab | agent-lab-unrlvl.vercel.app | claude | live | — |
| BlueprintLab | unrlvl-blueprint-lab.vercel.app | claude | live | — |
| VideoLab | unrlvl-video-lab.vercel.app | gemini | live | — |
| VoiceLab | unrlvl-voice-lab.vercel.app | elevenlabs | live | — |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | claude | live | — |
| SignalLab | — | — | not_deployed | — |

---

## SUPABASE (3 proyectos)

### unrlvl-db (principal) — amlvyycfepwhiindxgzw
- **Region:** us-east-1 · **Status:** ACTIVE_HEALTHY
- **Schemas:** public(78t) · content(6t) · crm(13t) · fph(22t·LEGACY) · intel(7t) · shopify(6t)
- **Tablas nuevas 2026-05-21:** `copylab_jobs` (status: queued/processing/done/error · async job queue)
- **Edge Functions: 63 activas** — Shopify: 22 · NSCF: 17 · Content/IID: 12 · ForumPHs: 5 · Klaviyo: 5 · Professor: 6 · Otros: 5
- **EF pendiente:** `copylab-processor` — código listo, bloqueado por UNRLVL_SB_ACCESS_TOKEN (necesita PAT sbp_...)

### XMMs (personal Sam) — puoybldykxqvhvtnwrld
- Uso: DDMV-Assistant DB + proyecto muerto pendiente eliminar · ⚠️ Personal — NO patrón de arquitectura

### ForumPHs (cuenta propia)
- Instancia aislada · pendiente migración tablas fph + adecuación + carga datos Ivette

---

## PROFESSOR SYSTEM ✅ OPERATIONAL

**Estado:** LIVE desde 2026-05-17 · 42 learnings totales · 8 manuales · 15 errores conocidos

### Componentes
- **10 tablas** Supabase: `professor_decision_criteria/veto_rules/decision_cases/weights/manuals/errors_known/learnings/platform_variables/sam_bypasses/cache`
- **6 Edge Functions:** professor-get-context · professor-evaluate-decision · professor-log-case · professor-submit-learning · professor-approve-learning · professor-checkpoint
- **Proxy:** `https://unrlvl-context.vercel.app/api/professor` ✅ LIVE
- **PROFESSOR_SECRET:** ✅ CONFIGURADO 2026-05-20

### Learnings clave capturados 2026-05-21
- pg_net → Vercel incompatibilidad estructural (5/5)
- Arquitectura async correcta: Dispatcher+Processor (5/5)
- Receta MCP custom Vercel sin Next.js (5/5)
- PAT vs service_role en Supabase Management API (5/5)
- Two-Job Pattern, Railway MCP, CopyPromptBuilder, Relay Service (4-5/5)

---

## MCPs CUSTOM (3)

| ID | Nombre | URL | Estado |
|---|---|---|---|
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app/api/mcp/mcp | ACTIVE |
| **INFRA-SB-UNRLVL-MCP** | **Supabase MCP (UNRLVL)** | **unrlvl-supabase-mcp.vercel.app/api/mcp/mcp** | **LIVE ✅ 2026-05-21** |
| INFRA-SB-FORUMPH-MCP | Supabase ForumPHs MCP | fphs-mcp-proxy.vercel.app/api/mcp/mcp | ACTIVE |

**unrlvl-supabase-mcp:** @vercel/node puro · scope amlvyycfepwhiindxgzw · 7 tools · ⚠️ UNRLVL_SB_ACCESS_TOKEN pendiente PAT real

---

## AGENTES

### Existentes (4)
| ID | Nombre | Canal | Estado |
|---|---|---|---|
| social-media-agent | Social Media Agent | interno | OPERATIONAL |
| ddmv-assistant | DDMV Assistant | WhatsApp | OPERATIONAL · FIX NEEDED |
| forumph-speaks | ForumPH Speaks | web | OPERATIONAL |
| forumph-document-factory | ForumPH Document Factory | web | OPERATIONAL |

### Planificados (3)
| ID | Sprint | Canal |
|---|---|---|
| PO Agent | Sprint 2 Agent 🔴 | WhatsApp + SMS |
| ForumPHs-OPS | Sprint 3 Agent | WhatsApp |
| Compliance Guardian | Sprint 6 Ayra | interno |

---

## AYRA

**Estado:** PLANNED · Sprint 0 pendiente (deadline: 5 Jun 2026 🔴)
**Plan:** protocols/AYRA_MASTER_PLAN.md v3.3

| Sprint | Fechas | Objetivo |
|---|---|---|
| Sprint 0 | antes Jun 5 🔴 | Repo + DB schema + prereqs |
| Sprint 1 | Jun 5-15 | EcosystemGraph + health EP |
| Sprint 2 | Jun 16-30 | Primeros jobs autónomos |
| Sprint 3 | Jul 1-14 | Daily Digest 7am ET |
| Sprint 4 | Jul 15-31 | Simuladores Fase 1 |
| Sprint 5 | Ago 1-31 | Memoria → **AYRA v1.0** |
| Sprint 6 | Sep-Oct 2026 | MCP Layer |

---

## INFRAESTRUCTURA (16 proyectos)

| ID | Nombre | URL / ID | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | LIVE |
| INFRA-BRAND-CACHE | Brand Cache API | .../api/brand-cache | v1.2 LIVE · v2.0 PENDIENTE COMMIT |
| INFRA-PROFESSOR-PROXY | Professor Proxy | .../api/professor | LIVE ✅ |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ACTIVE |
| **INFRA-SB-UNRLVL-MCP** | **Supabase MCP (UNRLVL)** | **unrlvl-supabase-mcp.vercel.app** | **LIVE ✅ 2026-05-21** |
| INFRA-TOOLS | UNRLVL Tools | unrlvl-tools.vercel.app | LIVE — ShopifyAuditor v3.5 |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | LIVE EN+ES |
| INFRA-BLUEPRINTS | BluePrints | unrlvl-blueprints.vercel.app | LIVE |
| INFRA-FORUMPHS-COM | forumphs.com | forumphs.com | LIVE |
| INFRA-NSCF-KIOSKO | NSCF Kiosko | nscf-kiosko.vercel.app | LIVE · 2026-05-13 |
| INFRA-SB-MAIN | Supabase unrlvl-db | amlvyycfepwhiindxgzw | ACTIVE_HEALTHY · 78t · 63 EFs |
| INFRA-SB-FORUMPH | Supabase ForumPHs | cuenta propia | EXISTE · pendiente migración |
| INFRA-SB-PERSONAL | Supabase XMMs | puoybldykxqvhvtnwrld | personal · pendiente limpieza |
| INFRA-AYRA | AYRA | ayra.unrealvillestudio.com | PLANNED · Sprint 0 🔴 |
| INFRA-VERCEL-KV | Vercel KV | — | PLANNED · Sprint 0 Ayra |
| INFRA-AGENT-TEMPLATE | agent-template repo | — | PLANNED · Sprint 0 Agent |

---

## AGENDA — PRÓXIMA SESIÓN

0. **🔴 SPRINT ACTIVO** — CopyLab async NeuroneSCF: UNRLVL_SB_ACCESS_TOKEN → PAT `sbp_...` → deploy copylab-processor → pg_cron → Cart A+B ES
1. **PRIORIDAD 1** — brand-cache.js v2.0: commit + deploy + build_all 🔴
2. **PRIORIDAD 2** — Ayra Sprint 0: repo + Vercel + schema (deadline 5 Jun) 🔴
3. **PRIORIDAD 3** — NSCF: TikTok Pixel duplicado — resolver antes de ads 🔴
4. **PRIORIDAD 4** — NSCF: GTM + GA4 verificación
5. **PRIORIDAD 5** — NSCF: Klaviyo flows UI + 10 templates deploy
6. **PRIORIDAD 6** — PO Agent: Sprint 2 Agent (prioridad alta)
7. **PRIORIDAD 7** — Legal: Stripe Atlas LLC Delaware ($500)
8. **PRIORIDAD 8** — Voice Genome: 3-5 audios PO → v1.0 mature
9. **PRIORIDAD 9** — Infra: luciensael.com DNS (10 min)
10. **PRIORIDAD 10** — XMMs: eliminar proyecto muerto

---

_ecosystem.md · generado desde ecosystem.json v14 · 2026-05-21_
