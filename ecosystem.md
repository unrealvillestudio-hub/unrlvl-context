# Unreal>ille Ecosystem — Estado General
_Generado automáticamente desde ecosystem.json · 2026-05-02-v2_

---

## Studio
**Unrealville Studio** · Brand Intelligence Infrastructure · "Not for everyone."
HQ: 12951 Biscayne Blvd · North Miami, FL 33181 · Web: unrealvillestudio.com (LIVE EN+ES)
Lucien Sael (seudónimo público de Sam): luciensael.com — GENERATED v3, pending deploy

---

## Marcas activas

| Marca | Mercado | Health |
|---|---|---|
| Diamond Details | Alicante, España | 🟢 |
| Vizos Cosmetics | Miami + España | 🟢 |
| D7 Herbal | Alicante, España | 🟢 |
| Vivose Mask | España | 🟡 |
| Patricia Osorio · Personal | Miami, FL | 🟢 |
| Patricia Osorio · Comunidad | Miami, FL | 🟢 |
| Patricia Osorio · Vizos Salon | Miami, FL | 🟢 |
| Patricia Osorio · Conectando | Miami + LATAM | 🟢 |
| **Neurone South & Central Florida** | South & Central Florida | 🟡 |
| ForumPHs | Panama | 🟢 |
| Unrealville Studio | Florida + LATAM | 🟢 |
| Unrealville Stores | Florida USA | 🟢 |

---

## NeuroneSCF — Estado detallado
**Domain:** neuronescflorida.com | **Health:** 🟡

### Shopify Stores

**B2B** · nj5ybc-n1.myshopify.com
- Score: 130/155 · Fixable: 1 (SEO-003 COLOR titles)
- OAuth: CONNECTED · Last audit: 2026-05-02

**B2C** · egdk1n-gt.myshopify.com
- Score: 109/155 (re-audit pending — múltiples fixes R2 aplicados post-audit)
- OAuth: CONNECTED · Last audit: 2026-05-02
- SEO: 62/62 enriched · 98% kw coverage
- Theme i18n: **COMPLETE R2** — logo NSCF, Pro Portal removed, locale_root fix, product types EN, benefit_claims_en, format mapping, footer locale links, hero animation
- Logo: assets/NSCF_Logo_WT_TC.png en Shopify CDN
- Key Benefits: 7 productos con benefit_claims EN via `neurone.benefit_claims_en` metafield

### Completado (código/infra)
Meta BM · Facebook Page · TikTok · OAuth B2B+B2C · ShopifyAuditor v9.5 · fix-all v4 · theme i18n R1+R2 · GraphQL SEO · Pro Portal removed · NSCF Logo · locale_root fix · product type EN mapping · collection title EN translations · Key Benefits EN batch · format mapping · shipping tab removed · footer locale-aware · hero "WHEN YOUR"

### Pendiente (solo manual — Shopify Admin)
- Páginas 404: about, la-ciencia, faq, contacto
- Policies: Terms of Service, Shipping Policy, Refund Policy
- WhatsApp setting: verificar vacío en Customizer > Footer
- $0.00 prices (20 variantes) · Kit images (12 productos) · Payment gateway · Shipping rates FL zone · Cookie consent

---

## ShopifyAuditor
**v3.3** · READY FOR BUSINESS ✅
URL: unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html

### Edge Functions activas

| EF | Versión Supabase | Estado |
|---|---|---|
| shopify-audit | v14 (v9.5) | ✅ ACTIVE — 15 módulos |
| shopify-fix-all | v4 | ✅ ACTIVE |
| shopify-fix | v6 | ✅ ACTIVE |
| shopify-oauth | v4 | ✅ ACTIVE |
| theme-i18n-fix | v2 | ✅ ACTIVE |
| shopify-theme-locale | v8 | ✅ ACTIVE — fix_v2/v3/v3b + logo + collection titles |
| shopify-fix-benefits | v3 | ✅ ACTIVE — batch benefit_claims EN |

---

## Labs

| Lab | Estado |
|---|---|
| CopyLab | LIVE v8.1 |
| WebLab | PASSED |
| ImageLab | ⚠️ FIX PENDIENTE — timeout |
| AgentLab | PASSED |
| BlueprintLab | PASSED |
| Orchestrator | OR_1.1 LIVE |
| SocialLab | LIVE (bypassed en pipeline) |
| UNRLVL-OPS | LIVE |

**IID Network:** OPERATIONAL · approval_flow pendiente test

---

## Infraestructura

| ID | Nombre | Estado |
|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app |
| INFRA-SB | Supabase amlvyycfepwhiindxgzw | public.* + shopify.* |
| INFRA-TOOLS | unrlvl-tools.vercel.app | LIVE — ShopifyAuditor v3.3 |
| INFRA-WEB | unrealvillestudio.com | LIVE EN+ES |
| INFRA-LUCIEN | luciensael.com | GENERATED — pending deploy |

---

## Agenda próxima sesión

1. **NeuroneSCF B2C:** re-audit para score actualizado post R2 fixes
2. **NeuroneSCF B2C:** Patricia crea páginas (about, la-ciencia, faq, contacto) + policies
3. **NeuroneSCF B2C:** limpiar product tags en Admin (B2c, Anti-caida raw visibles en filtros)
4. **NeuroneSCF B2C:** verificar hero logo sizing en mobile
5. **NeuroneSCF:** precios, imágenes kits, payment gateway, shipping rates FL
6. **ShopifyAuditor:** sales closing (intake form + landing + fix packs pricing)
7. **IID** approval flow test · **ImageLab** fix · **luciensael.com** deploy
