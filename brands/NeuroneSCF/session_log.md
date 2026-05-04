# SESSION LOG — NeuroneSCF
_Última actualización: 2026-05-04_

---

## 2026-05-04 — SESIÓN PRINCIPAL

### Contexto
Brand: NeuroneSCF · Stores: B2C + B2B · Operator: Sam

### Trabajo completado

#### ShopifyAuditor Full Capacity Upgrade (v11 → v13)

**Auditor v12 — Full Capacity (22 módulos, 180pts max):**
- IMAGES: alt text coverage + image count (5pts)
- COLLECTION HEALTH real: replaces always-10/10 fake — checks desc, image, productCount, handle (10pts)
- CATALOG QUALITY: URL handles con patrones internos, vendor, product_type (5pts)
- INVENTORY QUALITY: tracking, weight, barcode/GTIN (5pts)
- PERFORMANCE real: script_tags >5, sitemap, robots.txt (5pts)
- PRICE PSYCHOLOGY: price endings consistency, compare_at_price (5pts)
- CRO-007: post-purchase upsell detection
- Congruence engine: isDigitalStore · isNewStore · isSmallCatalog · isB2BModel — severity adapts per store model
- Products fetch: añade vendor + product_type fields
- Collections: via GQL con productCount real
- Sitemap + robots.txt via HTTP público paralelo
- PAY-BROKEN: distingue tienda con órdenes previas sin gateway vs tienda nueva

**Auditor v13 — Customer Events / Web Pixels:**
- fetchWebPixels: queries `{webPixels(first:20){edges{node{id settings}}}}` con scope guard
- hasMeta/hasTikTok/hasGoogle cross-reference con Customer Events pixel settings
- TRACK-CE-SCOPE: warning cuando read_customer_events no granted (potential false negatives)
- TRACK-CE-OK: confirma cuántos pixels via Customer Events y qué plataformas
- tracking_debug expandido: customerEventsScope, webPixelCount, detectedViaCustomerEvents

**shopify-fix v7 — 3 nuevos fix_types determinísticos (sin LLM):**
- fix_seo_title_structure: regex swap inverted prefix ("Kit Name" → "Name Kit")
- fix_seo_brand_suffix: extractBrandName(shop.name) at runtime, brand-agnostic
- fix_seo_title_trim: trim >60ch preservando " | Brand" suffix
- Fix types disponibles v7: inventory_tracking_on | seo_title_from_product | fix_seo_title_enriched | fix_seo_description | fix_description_enrich | theme_add_canonical | theme_add_og_tags | fix_theme_json_ld | fix_seo_title_structure | fix_seo_brand_suffix | fix_seo_title_trim

#### Kit Naming — Punta Kits (NeuroneSCF B2C)
- nscf-kit-seo-revert v2 deployed y ejecutado
- 4 punta kits actualizados: product.title + seo.title + EN translation
  - KT-101P: HUMIT Hydration Ritual Plus → **Deep Moisture Recovery**
  - KT-SDUO: SERUM DUO → **Hydra Boost Duo**
  - KT-103V: TOTAL VIOLET Control Ritual → **Perfect Blonde**
  - KT-102P: KERASIN Repair Ritual Plus → **Extreme Repair**
- ⚠️ Sam dice "los nombres no quedaron bien" — revisión pendiente con Patricia 2026-05-05
- Taglines 13 kits: APROBADOS (no se tocaron)

#### Discusiones de arquitectura
- Analytics: Customer Events vs script_tags vs theme.liquid — 3 detección layers
- GA4 vs UA migration check: identificado como mejora futura del auditor
- Pixel duplicados (tema + script_tag): identificado como oportunidad de check v14+
- Fixer congruencia: todos los nuevos checks adaptan severidad al modelo de tienda

### EFs activos hoy
| EF | Supabase v | Semantic v | Estado |
|---|---|---|---|
| shopify-audit | 26 | v13.0 | ACTIVE |
| shopify-fix | 7 | v7 | ACTIVE |
| shopify-fix-all | 11 | v5.6 | ACTIVE |
| nscf-kit-seo-revert | 2 | v2 | ACTIVE |

### Pendientes para mañana
1. Revisar kit naming 4 punta kits con Patricia
2. Re-audit NeuroneSCF B2C (score muy desactualizado, nuevo max=180)
3. Manual Patricia: EUR→USD, payment gateway, precios $0.00
4. read_customer_events scope para NeuroneSCF

---

## 2026-05-03 — SESIÓN ANTERIOR (resumen)

### Trabajo completado
- Social Proof Cards: 42/42 productos B2C con cards ES+EN · 9 QA corrections
- EN translations: 42/42 con digests reales via GraphQL translationsRegister
- Collections fix: 5 colecciones vacías → 29 productos asignados via collects API
- ShopifyAuditor v9.12 → v10 → v11: SEO-004/005/006/007 multi-marca

---

## ESTADO INFRAESTRUCTURA

### NeuroneSCF B2C
- OAuth: CONNECTED (read_apps + read_locales + write_translations)
- Last audit score: 109/160 (muy desactualizado — nuevo max 180 con auditor v12)
- SEO: 62/62 products con título+descripción
- Social proof: 42/42 ES+EN
- Theme i18n: COMPLETE R3
- Kit naming: 4 punta titles aplicados (revisión pendiente)

### NeuroneSCF B2B
- OAuth: CONNECTED
- Last audit score: 133/160
- Pending: fix SEO-003 COLOR titles

### Manual pendiente (Patricia)
- EUR → USD en Admin>Settings>General
- Payment gateway: Shopify Payments → Complete setup
- Shipping rates FL
- Precios $0.00 en 20 variantes
- Policies texto en Admin
- WhatsApp field en Customizer>Footer
- Páginas content (about/la-ciencia/faq/contacto)
