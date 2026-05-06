# SESSION LOG — NeuroneSCF B2C
_Última actualización: 2026-05-07_

---

## SESIÓN 2026-05-07 — Sprint Shopify B2C (continuación de 2026-05-06)

### COMPLETADO EN ESTA SESIÓN

#### ✅ Security Module (shopify-audit v31)
- Módulo security añadido al auditor (10pts, read-only)
- SEC-001: storefront access control
- SEC-002: OAuth scopes sensibles
- SEC-003: scripts externos no verificados
- SEC-004: credenciales hardcodeadas en theme.liquid
- SEC-005: checkout abierto sin payment gateway
- Score_max B2C: 200 → 210

#### ✅ SEO Completo
- SEO-001: 21/21 títulos escritos y verificados (seo-title-batch v1, 3 runs)
- SSEO-001: todos los títulos contienen "Neurone" + keywords
- THEME-LANG-001: 2/2 strings ES→EN Done

#### ✅ CAPISSEN Anti-Caída — CERRADO DEFINITIVAMENTE
- Problema raíz: EN translation tenía drug claims ("reactivate dormant follicles", "natural growth cycle") — NO en ES ni tags
- Fix: nscf-capissen-fix-en v2 con `translatableContentDigest` (requerido por Shopify para persistir)
- Resultado: SHAMPOO 877 chars, LOTION 1021 chars — verificado
- CAPISSEN product_type: "ANTI-CAÍDA" → "Scalp" (nscf-fix-capissen-type v1)

#### ✅ Ritual Kits — CSS/JS Badge
- fix_ritual_style aplicado en theme.liquid "Neurone Custom Theme v1.0"
- CSS: `.unrlvl-ritual-badge` con animated border `#C4622D` pulsing glow
- JS: `<script defer>` con MutationObserver — aplica badge a nav/footer links con "Ritual Kits" text
- fix_script_defer: corregido ParserBlockingScript — `<script>` → `<script defer>`

#### ✅ nc-header.liquid y nc-footer.liquid
- Theme hardcodeado (no usa Shopify Navigation API — `menus:[]` confirmado)
- "Rituals & Kits" posición 2 (después de Home) — desktop nav + mobile menu + footer
- URL: `{{ locale_root }}collections/ritual-kits` — locale-aware (ES: /collections/ritual-kits, EN: /en/collections/ritual-kits)
- Footer: `locale_root` unificado con `| append: '/' | replace: '//', '/'` — fix DNS error //collections
- Dot (nc-kits-dot) eliminado — solo color accent

#### ✅ shopify-fix v26 activo
Delegaciones activas: `capissen_fix_type | capissen_check | capissen_fix | capissen_fix_en | fix_ritual_style | fix_script_defer | ritual_diagnostic | seo_title_batch | seo_desc_batch | sp_scan | sp_fix_targeted | inventory_tracking_on | fix_seo_brand_suffix | fix_seo_combined | fix_compliance_claims | fix_theme_translate | seo_title_from_product`

### PENDIENTE PRÓXIMA SESIÓN

#### 🔴 Ritual & Kits — Colección vacía (404)
- Colección GID: `gid://shopify/Collection/672207995207` handle: `ritual-kits` — EXISTE pero 0 productos
- Shopify devuelve 404 en colecciones vacías
- **Acción Patricia:** Shopify Admin → Collections → Ritual & Kits → Add products
- Modelo: kits tienen SKU propio, componentes se descuentan via Bundles App
- Sprint: llenar campos de kits (SEO, traducción EN, social proof cards) cuando Patricia termine de subir imágenes
- Kits count pendiente confirmar

#### 🔴 Manuales sin resolver (Patricia)
- Payment gateway (PAY-BROKEN — crítico)
- Refund Policy, TOS, Privacy Policy, Shipping Policy
- Shipping zones FL
- Tracking pixels (Meta, Google, TikTok)
- 12+ kits sin imágenes (en proceso)

---

## SESIÓN 2026-05-06 — Sprint Shopify B2C

### SCORE
- Score actual: 142/210
- Score alcanzable solo automation: ~160/210
- Score con Patricia completa: ~190/210

### TRABAJO COMPLETADO

#### ✅ Social Proof Cards — CERRADO
- 42/42 limpios (sp_scan suspicious_count: 0)
- 3 productos corregidos: DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery

#### ✅ SEO base
- 21/21 títulos + 9 descripciones escritas sesión anterior

#### ✅ Theme i18n
- THEME-LANG-001: COMPLETE

#### ✅ Compliance
- 10/10 — sin drug claims

---

## ARQUITECTURA TÉCNICA SHOPIFY — DOCUMENTACIÓN COMPLETA

### ⚠️ DOCUMENTO CRÍTICO — Leer antes de cualquier sprint Shopify

Ver archivo: `brands/NeuroneSCF/SHOPIFY_ARCHITECTURE.md`

---

## ESTADO EFs SUPABASE (amlvyycfepwhiindxgzw)

| EF | Versión | Función |
|---|---|---|
| shopify-audit | v31 (semantic v17) | Auditor completo — 24 módulos, 210pts |
| shopify-fix | v26 | Fix dispatcher — todas las delegaciones |
| seo-title-batch | v1 | 8 productos/call, Claude batch |
| seo-desc-batch | v2 | 5 productos/call, Claude batch |
| sp-fix-targeted | v3 | Social proof cards fix |
| nscf-capissen-check | v3 | Check CAPISSEN (tags array fix) |
| nscf-capissen-fix-en | v2 | Fix EN translations con digest |
| nscf-fix-capissen-type | v1 | Fix product_type CAPISSEN |
| nscf-ritual-diagnostic | v1 | Lee menus + collections kit/ritual |
| nscf-publish-ritual-kits | v1 | Check/publish colección ritual-kits |
| nscf-fix-script-defer | v1 | Fix ParserBlockingScript en theme |
| seo-audit-check | v1 | GraphQL truth checker SEO |
| sp-reader-full | v2 | Lee SP metafields |
| shopify-audit-brief | v2 | Brief condensado |

### URLs operativas
- Auditor HTML: `https://unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html`
- Fix proxy: `https://unrlvl-tools.vercel.app/api/fix-proxy?brand_id=NeuroneSCF&store_type=b2c&fix_type=XXX`
- Audit proxy: `https://unrlvl-tools.vercel.app/api/audit-proxy`
- Context: `https://unrlvl-context.vercel.app`
- Social agent export: `https://unrlvl-social-media-agent.vercel.app/api/export?secret=6lk8yfcMFdv%40L5%243H%5EoT%26AxR`
