# Unrealville Studio — Ecosystem Overview
_Versión: 2026-05-03-v1 · Mantenido por Claude_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure  
_"Not for everyone."_  
Fundador público: **Lucien Sael** | Owner: Sam  
HQ: 12951 Biscayne Blvd · North Miami, FL 33181  
Web: unrealvillestudio.com (LIVE EN+ES)

---

## Lucien Sael

Seudónimo profesional público de Sam para UNRLVL y proyectos propios.  
_"I build worlds. Some of them survive."_  
Email: iam@luciensael.com | Web: luciensael.com (GENERATED — pending deploy)

**Brand Identity v1.0 COMPLETE**
- Palette: Obsidian #0D0D0B · Carbon #1C1C1A · Smoke #2E2E2B · Ash #4A4A45 · Bone #EDE8DF · Parchment #C4BDB0 · Ember #D4622A · Gold #B8922A
- Typography: Cormorant Garamond (display) · Crimson Pro (body) · JetBrains Mono (system)
- Rule Never: cyan, pure white, blue, Bebas Neue, Space Mono

**Books:** Arquitectura fundacional completa. 5 libros como sistema. Brief Libro 1 pendiente.

---

## Brands

| ID | Nombre | Tipo | Mercado | Estado | Salud |
|---|---|---|---|---|---|
| DiamondDetails | Diamond Details | Brand | Alicante, España | active | 🟢 |
| VizosCosmetics | Vizos Cosmetics | Brand | Miami + España | active | 🟢 |
| D7Herbal | D7 Herbal | Brand | Alicante, España | active | 🟢 |
| VivoseMask | Vivose Mask | Brand | España | active | 🟡 |
| PatriciaOsorioPersonal | Patricia Osorio · Personal | Personal Brand | Miami, FL | active | 🟢 |
| PatriciaOsorioComunidad | Patricia Osorio · Comunidad | Personal Brand | Miami, FL | active | 🟢 |
| PatriciaOsorioVizosSalon | Patricia Osorio · Vizos Salon | Personal Brand | Miami, FL | active | 🟢 |
| PatriciaOsorioConectando | Patricia Osorio · Conectando | Personal Brand | Miami + LATAM | active | 🟢 |
| **NeuroneSCF** | **Neurone South & Central Florida** | Brand | South & Central Florida | active | 🟡 |
| ForumPHs | ForumPHs | Brand | Panama | active | 🟢 |
| UnrealvilleStudio | Unrealville Studio | Studio | Florida USA + LATAM | active | 🟢 |
| UnrealvilleStores | Unrealville Stores | Ecommerce | Florida USA | active | 🟢 |

---

## Neurone South & Central Florida — Detalle

**Dominio:** neuronescflorida.com

### Shopify B2B
- **Store:** nj5ybc-n1.myshopify.com
- **OAuth:** CONNECTED — read_apps + read_locales + write_translations
- **Score:** 133/160 ✅
- **Estado:** fixable:1 (SEO-003 COLOR titles)

### Shopify B2C
- **Store:** egdk1n-gt.myshopify.com
- **OAuth:** CONNECTED — read_apps + read_locales + write_translations
- **Score:** 109/160 ⚠️ (re-audit URGENTE — 20+ fixes + social proof + collections post-audit)
- **SEO:** 62/62 enriched · store SEO aplicado
- **Theme i18n:** COMPLETE R3 — locale_root fix, responsive mobile, header/announcement
- **Social Proof:** ✅ 42/42 productos con cards ES+EN (3 TikTok + 2 Instagram)
- **Collections:** ✅ 6/6 populadas · 5 vacías corregidas 2026-05-03

### Gaps Manuales (URGENTE antes del martes)
- EUR→USD: Admin > Settings > General > Store currency
- Payment gateway: Shopify Payments → Complete setup
- Shipping rates FL: Vizos Salón → Start shipping
- Precios $0.00: 20 variantes (Patricia en Admin)
- Kit images: 12 productos sin imagen
- Policies: pegar texto en Admin > Settings > Policies
- WhatsApp: campo vacío en Customizer > Footer
- Páginas: about / la-ciencia / faq / contacto — contenido + Visible
- Product tags: B2c, Anti-caida visibles en sidebar

### Completado
Meta BM · Facebook Page · TikTok · OAuth B2B+B2C · ShopifyAuditor v9.12 · fix-all v4 · theme i18n R1+R2+R3 · GraphQL SEO · store SEO · Pro Portal removed · NSCF Logo · locale_root root cause fix · product type EN mapping · collection titles EN · Key Benefits EN · format mapping · shipping tab removed · footer locale-aware · hero WHEN YOUR · hero responsive mobile · header 80px · announcement 25px · NeuroneSCF_Policies.docx · nav double-slash fix · tracking module v9.12 · constructive messaging v9.12 · **Collections fix 2026-05-03** · **Social Proof Cards 42/42 ES+EN 2026-05-03** · **EN translations 42/42 con digests reales 2026-05-03**

---

## ShopifyAuditor v3.3

**URL:** https://unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html  
**Status:** READY FOR BUSINESS ✅  
**Supabase:** amlvyycfepwhiindxgzw

### Edge Functions

| EF | Versión | Status |
|---|---|---|
| shopify-audit | v22 (v9.12) | ACTIVE |
| shopify-fix-all | v4 | ACTIVE |
| shopify-fix | v6 | ACTIVE |
| shopify-oauth | v4 | ACTIVE |
| theme-i18n-fix | v2 | ACTIVE |
| shopify-theme-locale | v21 | ACTIVE |
| shopify-fix-benefits | v3 | ACTIVE |
| shopify-debug | v6 | ACTIVE |

### CRO Audit Layer (ROADMAP — deadline martes)
Extensión del ShopifyAuditor que detecta ausencia de señales de conversión:
- Social proof presence (quotes/reviews por product page)
- Urgency/scarcity signals (stock countdown, bestseller badges)
- Trust signals (garantía, política devolución, badges pago seguro)
- Upsell/cross-sell (combina con, completa tu ritual)
- Above-the-fold ATC (precio + botón sin scroll en mobile)
- Checkout friction (pasos, abandono carrito)

### Connected Stores

| Brand | Tipo | Dominio | Score |
|---|---|---|---|
| NeuroneSCF | B2B | nj5ybc-n1.myshopify.com | 133/160 ✅ |
| NeuroneSCF | B2C | egdk1n-gt.myshopify.com | 109/160 ⚠️ |

---

## Social Proof Agent v3

**Status:** OPERATIONAL ✅  
**Pipeline:** Write → Humanize → AIFE (Claude Sonnet 4.6)  
**Output:** 5 cards por producto (3 TikTok + 2 Instagram) × ES + EN  
**Supabase:** Conectado. Si no existe el cliente, solicitar datos como el auditor.  
**Patrón:** Para cualquier tienda nueva antes del launch — correr este agente.  
**QA Rule:** Verificar contexto del producto. NSCF es marca CAPILAR — quotes de skincare son error.

**Completado:**
- NeuroneSCF B2C: 42 productos (Scalp x4, Moisture x4, Restore x4, Color Rescue x13, Styling x4, Kits x13) — 2026-05-03

---

## Labs

| ID | Nombre | Status |
|---|---|---|
| LAB-CPL | CopyLab | LIVE v8.1 |
| LAB-WL | WebLab | PASSED |
| LAB-IL | ImageLab | ⚠️ FIX PENDIENTE (Vercel 50s timeout) |
| LAB-AL | AgentLab | PASSED |
| LAB-BPL | BlueprintLab | PASSED |
| LAB-ORCH | Orchestrator | OR_1.1 LIVE |
| LAB-SL | SocialLab | LIVE — bypassed en pipeline IID |
| LAB-OPS | UNRLVL-OPS | LIVE |

---

## IID Network

**Status:** OPERATIONAL  
Pipeline: CopyLab ✅ · AIFE ✅ · ImageLab ⚠️ SKIP · SocialLab ✅ · Approval Flow PENDIENTE TEST

---

## Infraestructura

| ID | Nombre | Status |
|---|---|---|
| INFRA-CTX | Context System | https://unrlvl-context.vercel.app |
| INFRA-SB | Supabase amlvyycfepwhiindxgzw | public.* + shopify.* |
| INFRA-TOOLS | unrlvl-tools.vercel.app | LIVE — ShopifyAuditor v3.3 |
| INFRA-WEB | unrealvillestudio.com | LIVE EN+ES |
| INFRA-LUCIEN | luciensael.com | GENERATED — pending deploy |

---

## Agenda Próxima Sesión

1. **PRIORIDAD 1** — NeuroneSCF B2C: CRO Audit Layer — DEADLINE MARTES
2. **PRIORIDAD 2** — NeuroneSCF B2C: re-audit (score 109/160 desactualizado)
3. **PRIORIDAD 3** — NeuroneSCF MANUAL Patricia: EUR→USD · Payment gateway · Shipping · $0.00 prices · Policies · WhatsApp · Páginas
4. **PRIORIDAD 4** — NeuroneSCF B2C: Kits in main nav + homepage section
5. **PRIORIDAD 5** — NeuroneSCF B2C: product tags cleanup · neurone.size '0' bug
6. **PRIORIDAD 6** — NeuroneSCF B2B: fix SEO-003 COLOR titles
7. **PRIORIDAD 7** — ShopifyAuditor: sales closing
8. **PRIORIDAD 8** — IID approval flow test · ImageLab fix · luciensael.com deploy
