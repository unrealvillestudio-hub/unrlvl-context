# Unrealville Studio — Ecosistema
_Generado desde ecosystem.json v2026-05-25-v17 · No editar manualmente_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure
_"Not for everyone."_
Fundador público: Lucien Sael · Owner: Sam
GitHub: unrealvillestudio-hub · Web: unrealvillestudio.com (LIVE EN+ES)
HQ: 12951 Biscayne Blvd · North Miami, FL 33181

**Lucien Sael** — Seudónimo profesional público de Sam
web: luciensael.com — GENERATED v3, PENDING DEPLOY + DNS

---

## Marcas activas

| Marca | Mercado | Estado |
|---|---|---|
| **NeuroneSCF** | South & Central Florida, USA | 🟡 Activo |
| **DiamondDetails** | Alicante, España | ✅ Activo |
| **VizosCosmetics** | Miami + España | ✅ Activo |
| **D7Herbal** | Alicante, España | ✅ Activo |
| **VivoseMask** | España | ✅ Activo |
| **PatriciaOsorioPersonal** | Miami, FL | ✅ Activo |
| **ForumPHs** | Panamá | ✅ Activo |
| **UnrealvilleStudio** | Florida + LATAM | ✅ Activo |

---

## NeuroneSCF — Estado detallado

**Shopify B2C** `egdk1n-gt.myshopify.com` → `neuronescflorida.com`
- 41 productos activos · Theme 192983662919
- Blog LIVE: 4 artículos ES+EN · Hair Intelligence
- Pixel Meta ✅ · GTM+GA4 instalado ✅ · Klaviyo ✅ · Judge.me ✅
- ⚠️ TikTok Pixel DUPLICADO — bloquea ads
- ⚠️ Klaviyo flows pendiente configurar en UI
- ⚠️ Meta MCP: NSCF no está en meta_accounts — pendiente

**Shopify B2B** `nj5ybc-n1.myshopify.com`
- Theme 149164392526 · Audit score 133

**Klaviyo** `UNF8Ee` — 10 templates ES+EN · Plan $20/mes
Flows pendientes: abandoned_cart · post_purchase · review_request · welcome

**Voice Genome** `po_consumer` v0.6 — activo en pipeline
Gap: compatibility_rules para product_description_b2c no definidas → creative_seed null en kits

**Async Pipeline** — OPERACIONAL 2026-05-21
exec: ~23s · wait: 30-90s · total: 52-112s

---

## Labs

| Lab | URL | Estado |
|---|---|---|
| **Orchestrator** v2.2 | orchestrator-unrlvl.vercel.app | ✅ LIVE |
| **CopyLab** v9.6 | unrlvl-copy-lab.vercel.app | ✅ LIVE · async ✅ |
| **ImageLab** | image-lab-unrlvl.vercel.app | 🔴 BUG — Vercel 50s timeout |
| **SocialLab** | social-lab-flame.vercel.app | ✅ LIVE |
| **WebLab** | web-lab-unrlvl.vercel.app | ✅ LIVE |
| **AgentLab** | agent-lab-unrlvl.vercel.app | ✅ LIVE |
| **BlueprintLab** | unrlvl-blueprint-lab.vercel.app | ✅ LIVE |
| **VideoLab** | unrlvl-video-lab.vercel.app | ✅ LIVE |
| **VoiceLab** | unrlvl-voice-lab.vercel.app | ✅ LIVE |
| **OnboardingApp** | unrlvl-onboarding-app.vercel.app | ✅ LIVE |
| **SignalLab** | — | ⏳ No deployado |

---

## Supabase — unrlvl-db `amlvyycfepwhiindxgzw`

ACTIVE_HEALTHY · us-east-1
- **public**: 78 tablas · 67 Edge Functions
- **content**: 6 tablas · 40 jobs activos
- **crm**: 13 tablas
- **fph**: 22 tablas (legacy — migrar a cuenta ForumPHs)
- **intel**: 7 tablas · 117 items en queue
- **shopify**: 6 tablas · 95 audit runs

**meta_accounts:**
- `UNREALville` ✅ completo (page + ig + ad_account + token)
- `LucienSael` ✅ page + token
- `NeuroneSCF` ❌ pendiente insertar

**pg_cron job #30** — copylab-processor cada 1 min ✅
**lab_jobs migration** — pendiente (parte de Ayra Sprint 0)

---

## Agentes

| Agente | Canal | Estado |
|---|---|---|
| **Social Media Agent** | interno | ✅ OPERATIONAL |
| **DDMV Assistant** | WhatsApp Twilio | ⚠️ FIX NEEDED — memoria no persiste |
| **ForumPH Speaks** | web | ✅ OPERATIONAL |
| **ForumPH Document Factory** | web | ✅ OPERATIONAL |
| **PO Agent** | WhatsApp+SMS | ⏳ Sprint 2 — prioridad alta |
| **ForumPHs-OPS** | WhatsApp | ⏳ Sprint 3 |
| **Compliance Guardian** | interno | ⏳ Sprint 6 Ayra |

---

## AYRA 🔴 DEADLINE 5 JUN

Repo: `unrealvillestudio-hub/unrlvl-ayra` — POR CREAR
URL: `ayra.unrealvillestudio.com` — POR CONFIGURAR
Milestone v1.0: 31 Agosto 2026

| Sprint | Fecha | Contenido |
|---|---|---|
| **Sprint 0** 🔴 | ANTES 5 Jun | PROFESSOR árbol + lab_jobs migration + repo + Vercel |
| Sprint 1 | Jun 5-15 | EcosystemGraph + health EP |
| Sprint 2 | Jun 16-30 | Primeros jobs autónomos |
| Sprint 3 | Jul 1-14 | Daily Digest 7am ET |
| Sprint 4 | Jul 15-31 | Simuladores Fase 1 |
| Sprint 5 | Ago 1-31 | Memoria L1+L2+L4 → v1.0 |
| Sprint 6 | Sep-Oct | MCP Layer |

---

## Professor

OPERATIONAL 2026-05-17 · v1.0
Proxy: `https://unrlvl-context.vercel.app/api/professor` ✅ LIVE

Seed: 16 criterios · 4 veto rules · 29 learnings aprobados · 1 manual
Manual activo: ASYNC_LAB_PIPELINE v1.0

---

## Infraestructura

| ID | Nombre | URL | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | ✅ LIVE |
| INFRA-META-MCP | **Meta MCP** 🆕 | unrlvl-meta-mcp.vercel.app | ✅ LIVE · 23 tools · CORS ✅ · audit page ✅ · list_brands ❌ RLS |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ✅ ACTIVE |
| INFRA-SB-MCP | Supabase MCP | unrlvl-supabase-mcp.vercel.app | ✅ ACTIVE v1.2.1 |
| INFRA-TOOLS | UNRLVL Tools | unrlvl-tools.vercel.app | ✅ LIVE |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | ✅ LIVE EN+ES |
| INFRA-AYRA | Ayra | — | ⏳ PLANNED Sprint 0 |
| INFRA-VERCEL-KV | Vercel KV Redis | — | ⏳ PLANNED Sprint 0 |

---

## Content Pipeline v2.6

Layers: L0→L7 + Creative Engine L14-L16
Content types activos: `email_sequence` · `product_description_b2c`
Voice Genome activo: NeuroneSCF `po_consumer` v0.6
Snapshot activo: NeuroneSCF v2.0 (78 tablas · 2026-05-21)

---

## Skills System v2.6 — 15 skills LIVE

ads-mcp · agent-browser · agent-builder · content-pipeline · copylab-reference · cost-layer · ecosystem-auditor · github-auditor · higgsfield · image-processing · security · shopify-auditor · shopify-mcp · ui-ux-layer · vercel
