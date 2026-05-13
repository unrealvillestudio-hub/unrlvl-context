# UNRLVL ECOSYSTEM
_Versión: 2026-05-13-v7 · Derivado de ecosystem.json · Mantenido por Claude_

---

## STUDIO

**Unrealville Studio** · Brand Intelligence Infrastructure · _"Not for everyone."_
Owner: Sam · Founder público: Lucien Sael
HQ: 12951 Biscayne Blvd · North Miami, FL 33181
Web: unrealvillestudio.com (LIVE EN+ES)

**Lucien Sael** — seudónimo profesional público de Sam
luciensael.com · GENERATED v3 — PENDING DEPLOY + domain DNS

---

## MARCAS ACTIVAS

| ID | Nombre | Mercado | Estado |
|---|---|---|---|
| NeuroneSCF | Neurone South & Central Florida | South & Central Florida, USA | 🟡 Active |
| DiamondDetails | Diamond Details | Alicante, España | 🟢 Active |
| VizosCosmetics | Vizos Cosmetics | Miami + España | 🟢 Active |
| D7Herbal | D7 Herbal | Alicante, España | 🟢 Active |
| VivoseMask | Vivose Mask | España | 🟢 Active |
| PatriciaOsorioPersonal | Patricia Osorio · Personal | Miami, FL | 🟢 Active |
| ForumPHs | ForumPHs | Panama | 🟢 Active |
| UnrealvilleStudio | Unrealville Studio | Florida USA + LATAM | 🟢 Active |

### NeuroneSCF — Detalle
- **Dominio:** neuronescflorida.com
- **B2C Shopify:** egdk1n-gt.myshopify.com · Audit score: 137 · 2026-05-06
- **B2B Shopify:** nj5ybc-n1.myshopify.com · Audit score: 133 · 2026-05-02
- **Blog:** LIVE ✅ · 4 artículos ES+EN · Hair Intelligence
- **Tracking:** ❌ 0/10 pixels pendientes (Meta + TikTok + Google)
- **Gaps:** Artículos L0+L3 → Pixels → CRO Checkout → Re-audit → Ads

---

## ECOSISTEMA DE AGENTES

**UNRLVL Agent Infrastructure Standard v1.0** · Definido 2026-05-13

### Stack Universal
- Runtime: Vercel · DB: Supabase multi-tenant · Cache: Hot + Warm (Vercel KV) + Cold
- Brain frontend: claude-sonnet-4-6 · Brain service: claude-haiku-4-5
- Canal: Twilio WhatsApp/SMS · Web widget
- Voz (futuro): ElevenLabs → unrlvl-voicelab.vercel.app

### Tenants de Base de Datos
- `default` — amlvyycfepwhiindxgzw · UNRLVL + brands + agents + sessions
- `forumph` — instancia aislada · owners · accounts · SLA · legal · PII: legal_sensitive

### Sistema de Memoria (estándar)
- T1: últimos 10-15 mensajes sesión anterior
- T2: resúmenes comprimidos 7 días (~150 tokens/sesión)
- T3: resumen consolidado días 8-15
- T4: entity_facts del contacto
- Retención configurable: 7 / 15 / 30 / 365 días

---

### Agentes Existentes

| ID | Nombre | Canal | Estado | Sprint |
|---|---|---|---|---|
| social-media-agent | Social Media Agent | Interno | ✅ Operativo | Registrar S0 |
| ddmv-assistant | DDMV Assistant | WhatsApp | ⚠️ Fix urgente | Sprint 1 |
| forumph-speaks | ForumPH Speaks | Web | ✅ Operativo | Registrar S0 |

**DDMV issues:** memoria no persiste entre sesiones · tono inconsistente · fix en Sprint 1 · target 15 días memoria

### Agentes Planificados

| ID | Nombre | Canal | Sprint | Estado |
|---|---|---|---|---|
| po-faq-appointments | PO Agent | WhatsApp + SMS | Sprint 2 | PLANNED |
| forumph-ops | ForumPHs-OPS | WhatsApp | Sprint 3 | PLANNED |
| compliance-guardian | Compliance Guardian | Interno | Sprint 6 | PLANNED |

**PO Agent:** FAQ + citas + ventas proactivas · voz de Patricia · memoria 15 días · multiidioma · pre-requisito: workshop 30min con Patricia
**ForumPHs-OPS:** 1,500→3,000 propiedades · tone engine dinámico (4 perfiles) · DB tenant aislado · cache invalidation por cambio de estado financiero
**Compliance Guardian:** vigilancia Meta/Google/TikTok + resolución de baneos · case library con aprendizaje reciclado · NO conectado a Meta.ai/Google.ai/TikTok.ai

### Labs

| Lab | Estado |
|---|---|
| AgentLab | PASSED · Spec pendiente · Sprint 4 |
| VoiceLab | Wishlist · Sprint 5 · ElevenLabs · voces: PO + Ivette |

---

## CONTENT PIPELINE v2.1

Capas: L0 AUDIENCE_BRIEF → L1 WRITE → L2 H+AIFE → L3 HUMANIZE_EMOTIONAL → L4 PSYCHO → L5 CRO → L6 SEO → L7 QA
Skill: skills/content-pipeline/SKILL.md
Brand Cache: /api/brand-cache?brand_id={brand_id}
Supabase pipeline skills: 8 rows v2.0
Deprecated: skills/CONTENT_PIPELINE_SKILLS.md · skills/aife/SKILL.md

---

## INFRAESTRUCTURA

| ID | Nombre | Estado |
|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app |
| INFRA-BRAND-CACHE | Brand Cache API | LIVE ✅ |
| INFRA-SHOPIFY-MCP | Shopify MCP | ACTIVE |
| INFRA-SB | Supabase UNRLVL | ✅ RLS 4 tablas secured |
| INFRA-SB-FORUMPH | Supabase ForumPHs | PLANNED · Sprint 3 |
| INFRA-VERCEL-KV | Vercel KV (Redis) | PLANNED · Sprint 0 |
| INFRA-AGENT-TEMPLATE | unrlvl-agent-template repo | PLANNED · Sprint 0 |
| INFRA-TOOLS | unrlvl-tools.vercel.app | LIVE · ShopifyAuditor v3.5 |
| INFRA-WEB | unrealvillestudio.com | LIVE EN+ES |

---

## SKILLS SYSTEM v1.1

Operativo ✅ · 15 skills · Index: skills/INDEX.md

---

## ROADMAP — AGENT INFRASTRUCTURE SPRINTS

| Sprint | Nombre | Sesiones | Entregable |
|---|---|---|---|
| S0 | Foundation | 2-3 | Schema Supabase agents.* · DB Router · agent.json spec · Vercel KV · repo template |
| S1 | DDMV Fix | 1-2 | Memoria 15 días · tono bloqueado · primera validación del estándar |
| S2 | PO Agent | 3-4 | Primer agente nuevo desde estándar · Patricia facturando |
| S3 | ForumPHs-OPS | 4-5 | 1,500 propietarios · multi-tenant · cache invalidation |
| S4 | AgentLab | 3-4 | Fábrica operativa · Industrial Consistency alcanzada |
| S5 | VoiceLab | 2-3 | PO e Ivette responden con su propia voz |
| S6 | Compliance Guardian | 3-4 | Protección activa · case library · learning loop |

**Total:** 18-24 sesiones · 8-12 semanas · Costo final ~$200-222/mes

---

## AGENDA PRÓXIMA SESIÓN

1. **P0** — MCP Server propio UNRLVL (exploración arquitectura — próxima sesión)
2. **P1** — Sprint 0 S0.1 — Schema Supabase `agents.*` + DB Router multi-tenant
3. **P2** — NeuroneSCF: Reescritura 4 artículos blog con L0+L3
4. **P3** — NeuroneSCF: Tracking pixels Meta + TikTok + Google (0/10)
5. **P4** — NeuroneSCF: API Tokens Orchestrator — desbloquear con BM ID de UNRLVL
6. **P5** — NeuroneSCF: CRO Checkout — Bundle configurar
7. **P6** — Brand cache otras marcas del ecosistema

---
_Regenerado: 2026-05-13 · Claude Sonnet 4.6_
