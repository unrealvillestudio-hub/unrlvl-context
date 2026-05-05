# UNRLVL Ecosystem — Estado del Sistema
_Actualizado: 2026-05-06-v1 · 2026-05-06_

---

## Studio
**Unrealville Studio** · Owner: Sam / Lucien Sael
- Web: unrealvillestudio.com (LIVE — EN + ES)
- HQ: 12951 Biscayne Blvd · North Miami, FL 33181

---

## Lucien Sael
Seudónimo profesional público de Sam. Tagline: _I build worlds. Some of them survive._
- Web: luciensael.com — GENERATED v3 — PENDING DEPLOY + domain DNS
- Books: ARQUITECTURA FUNDACIONAL COMPLETA — Brief Libro 1 pendiente

---

## Marcas y Proyectos

### 🟢 Diamond Details (`DiamondDetails`)
- Tipo: brand · Mercado: Alicante, Espana · Status: active

### 🟢 Vizos Cosmetics (`VizosCosmetics`)
- Tipo: brand · Mercado: Miami + Espana · Status: active

### 🟢 D7 Herbal (`D7Herbal`)
- Tipo: brand · Mercado: Alicante, Espana · Status: active

### 🟡 Vivose Mask (`VivoseMask`)
- Tipo: brand · Mercado: Espana · Status: active

### 🟢 Patricia Osorio · Personal (`PatriciaOsorioPersonal`)
- Tipo: personal_brand · Mercado: Miami, FL · Status: active

### 🟢 Patricia Osorio · Comunidad (`PatriciaOsorioComunidad`)
- Tipo: personal_brand · Mercado: Miami, FL · Status: active

### 🟢 Patricia Osorio · Vizos Salon (`PatriciaOsorioVizosSalon`)
- Tipo: personal_brand · Mercado: Miami, FL · Status: active

### 🟢 Patricia Osorio · Conectando (`PatriciaOsorioConectando`)
- Tipo: personal_brand · Mercado: Miami + LATAM · Status: active

### 🟡 Neurone South & Central Florida (`NeuroneSCF`)
- Tipo: brand · Mercado: South & Central Florida, USA · Status: active
- **B2C:** 137/200 — ⚠️ 137/200 — 5 critical · 15 important · compliance CLEAN ✅
  - SEO: SEO titles: 5/42 missing (was 12) · descriptions: 29/42 missing · fixer v13 ready · post-write verification active
  - SP: 42/42 productos con SP cards ES+EN · ⚠️ 3 productos con contenido facial incorrecto (DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery) — sp-fix-targeted v1 ready · proxy pending
  - Compliance: ✅ CLEAN — Anti-Caída → Scalp Strength · CAPISSEN drug claims → cosmetic claims
- **B2B:** 133/160 — ✅ 133/160 — fixable:1 (SEO-003 COLOR titles)
- **Gaps:** MANUAL URGENTE: Payment gateway · Policies · Shipping rates FL · Precios $0.00 · WhatsApp field · Páginas contenido · Kit images (12 products sin imagen). AUTOMATED PENDING: SP fix 3 productos (proxy) · SEO descriptions 29 productos (fixer v13)

### 🟢 ForumPHs (`ForumPHs`)
- Tipo: brand · Mercado: Panama · Status: active
- Document Factory: PROD v1.5 READY

### 🟢 Unrealville Studio (`UnrealvilleStudio`)
- Tipo: studio · Mercado: Florida USA + LATAM · Status: active
- Skills: P1-P8 COMPLETOS — P2 shopify-auditor READY FOR BUSINESS v3.5

### 🟢 Unrealville Stores (`UnrealvilleStores`)
- Tipo: ecommerce · Mercado: Florida USA · Status: active

---

## ShopifyAuditor
**v3.5** — READY FOR BUSINESS ✅ — Full Capacity v16.1 + enrichFixPayloads + post-write verification

- App: https://unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html
- Audit Engine: v16.1 · 23 módulos · max 200pts
- Fixer Engine: shopify-fix **v15** · 16 fix_types
- Post-write verification: v13+ — mutation returns written value, compared against sent value. applied=verified only if Shopify confirms persistence.

### Edge Functions activos
- `shopify-audit` v16.1 — ACTIVE
- `shopify-fix` v15 — ACTIVE · v15: sp_scan+sp_fix. v13: post-write verification (verified≠applied). v12: sever...
- `shopify-fix-all` v5.6 — ACTIVE
- `shopify-audit-orchestrator` v1 — ACTIVE
- `shopify-theme-analyzer` v1 — ACTIVE
- `shopify-link-crawler` v1 — ACTIVE
- `shopify-oauth` v4 — ACTIVE
- `shopify-theme-locale` v21 — ACTIVE
- `seo-audit-check` v1 — ACTIVE · NEW 2026-05-06: GraphQL truth checker — reads real SEO state directly from Shopi...
- `sp-reader-full` v2 — ACTIVE · NEW 2026-05-06: reads all 42 SP metafields (ES+EN), scans for facial skincare ke...
- `sp-fix-targeted` v1 — ACTIVE · NEW 2026-05-06: hardcoded fix for 3 products with wrong SP content (DY FAZZA, Hy...
- `nscf-fix-anticaida` v1 — ACTIVE · Applied 2026-05-05.
- `nscf-fix-capissen-descriptions` v1 — ACTIVE
- `nscf-menu-kits` v1 — ACTIVE
- `nscf-kit-seo-revert` v2 — ACTIVE · Applied 2026-05-04. Revisión pendiente con Patricia.

### Tech Debt Activo
- NSCF B2C CRÍTICO: Payment gateway 0/10 — Shopify Payments setup pendiente Patricia
- NSCF B2C CRÍTICO: Policies 0/20 — Refund/TOS/Privacy/Shipping text pending Admin
- NSCF B2C CRÍTICO: 12 kits sin imágenes (CAT-002)
- NSCF B2C: SP fix pendiente — 3 productos con contenido facial (DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery). EF sp-fix-targeted v1 ready. ⚠️ Proxy route en fix-proxy.js no habilitada.
- NSCF B2C: SEO descriptions 29/42 missing — fixer v13 pendiente de run. Inconsistencia entre audit-proxy (v9-fresh) y HTML auditor (v16.1).
- NSCF B2C: Auditor inconsistencia — v9-fresh vs v16.1 cuentan diferente. Unificar a un solo EF.
- NSCF B2C: Tracking 0/5 — Meta + TikTok + Google pixels pendientes
- NSCF B2C: Shipping zones not configured (2/5)
- NSCF B2C: Kit naming 4 punta — revisión pendiente con Patricia
- NSCF B2C: neurone.size metafield = '0' visible en product page
- NSCF B2C: Precios $0.00 en ~20 variantes
- NSCF B2C: Páginas content vacías (about/la-ciencia/faq/contacto)
- NSCF B2B: fix SEO-003 COLOR titles
- read_customer_events scope no concedido → TRACK-CE-SCOPE warning
- ImageLab fix: GEMINI_API_KEY + content-run-stage v1.11
- luciensael.com deploy pendiente

---

## Social Proof Agent
**vv3** — OPERATIONAL ✅

**Scan 2026-05-06:** 39/42 limpios · 3 incorrectos (contenido facial skincare)
- ⚠️ **DY FAZZA** — Reviews about facial moisturizer (mejillas, piel, sequedad facial, skincare routine)
- ⚠️ **Hydra Boost Duo** — Reviews about facial serum (manchas, poros, cara, dark spots, hyperpigmentation)
- ⚠️ **Deep Moisture Recovery** — Reviews about skin care kit (piel seca, piel mixta, poros, dark spots)

⚠️ sp-fix-targeted v1 deployed — proxy route pending (first task tomorrow)

---

## Laboratorios
- **CopyLab** (`LAB-CPL`): LIVE v8.1 · https://unrlvl-copy-lab.vercel.app
- **WebLab** (`LAB-WL`): PASSED
- **ImageLab** (`LAB-IL`): ⚠️ FIX PENDIENTE — Vercel 50s timeout
- **AgentLab** (`LAB-AL`): PASSED
- **BlueprintLab** (`LAB-BPL`): PASSED
- **Orchestrator** (`LAB-ORCH`): OR_1.1 LIVE · https://orchestrator-unrlvl.vercel.app
- **SocialLab** (`LAB-SL`): LIVE — bypassed en pipeline IID
- **UNRLVL-OPS** (`LAB-OPS`): LIVE · https://unrlvl-ops.vercel.app

---

## Infraestructura
- **Context System**: 
- **Supabase amlvyycfepwhiindxgzw**: public.* + shopify.*
- **unrlvl-tools.vercel.app**: LIVE — ShopifyAuditor v3.5 (v16.1 engine + enrichFixPayloads patch 2026-05-06)
- **unrealvillestudio.com**: LIVE EN+ES
- **luciensael.com**: GENERATED — pending deploy

---

## Agenda Próxima Sesión
- PRIORIDAD 1 — NeuroneSCF B2C: SP fix — activar proxy route para sp-fix-targeted en fix-proxy.js (DY FAZZA + Hydra Boost Duo + Deep Moisture Recovery)
- PRIORIDAD 2 — NeuroneSCF B2C: SEO descriptions — ejecutar shopify-fix v13 (fix_seo_description, 29 productos). Resolver inconsistencia audit-proxy vs HTML auditor.
- PRIORIDAD 3 — NeuroneSCF MANUAL Patricia URGENTE: Payment gateway · EUR→USD · Policies (NeuroneSCF_Policies.docx listo) · Shipping rates FL · Precios $0.00 · WhatsApp field
- PRIORIDAD 4 — NeuroneSCF B2C: Kit images (12 kits sin imagen — CAT-002 critical)
- PRIORIDAD 5 — NeuroneSCF B2C: Kit naming revisión con Patricia (4 punta kits)
- PRIORIDAD 6 — NeuroneSCF B2C: Tracking — Meta + TikTok + Google pixels (0/10)
- PRIORIDAD 7 — NeuroneSCF B2B: fix SEO-003 COLOR titles
- PRIORIDAD 8 — ShopifyAuditor: resolver inconsistencia v9-fresh vs v16.1 · unificar audit EF · proxy update (orchestrator endpoint)
- PRIORIDAD 9 — IID approval flow test · ImageLab fix · luciensael.com deploy

---
_Last audit: shopify-audit v16.1 (HTML enrichFixPayloads patch) + shopify-fix v15 (post-write verification + sp_scan/sp_fix). NSCF B2C: 137/200 (was 132). SEO titles: 12→5 missing. 3 SP cards with facial skincare content identified (DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery). sp-fix-targeted v1 deployed — proxy pending._
