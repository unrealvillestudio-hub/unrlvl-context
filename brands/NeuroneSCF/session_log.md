# NeuroneSCF — Session Log

---

## SESIÓN 2026-05-03 — Social Proof Cards × 42 productos + Collections Fix
**Operador:** Sam | **Claude:** Sonnet 4.6

### Resumen ejecutivo
Sesión completa de infraestructura de conversión para la tienda B2C. Se construyó y ejecutó el Social Proof Agent v3 (JSX, pipeline Write→Humanize→AIFE) para generar social cards para los 42 productos del catálogo completo. Se corrigió el bug de collections vacías que rompía los nav links. Se hicieron correcciones QA críticas en 9 productos donde el agente generó quotes de skincare para productos capilares. Todos los productos tienen ahora social proof cards en ES + EN.

### Trabajo realizado

**1. Collections Fix — Bug crítico**
- **Síntoma**: 5 collections existían pero vacías → nav links rotos (sin productos)
- **Fix**: Asignados 29 productos a 5 collections via Shopify `collects` API:
  - `moisture` (668458385735): Humit Shampoo, Humit Mask, DY Fazza x2
  - `restore` (668458418503): Kerasin HB x3, Velvety Control
  - `scalp` (668458549575): Capissen x2, Depura, Menthol Ice
  - `styling` (668458484039): Neurona Gloss x2, Lisothermic, Thermo Dual
  - `color-rescue` (668458516807): Dyfensor SF, Total Violet x2, DY Fazza Color x2, Revenant x5, Dyfensor Serum, Green 100, Hyaloneurine
  - `ritual-kits` (672207995207): ya tenía 13 kits ✅

**2. Social Proof Agent v3 (JSX Artifact)**
- Pipeline: Write → Humanize → AIFE por producto, ES + EN
- Filtrado por línea: Scalp / Moisture / Restore / Color Rescue / Styling / Kits
- Export via textarea click-to-select (no createObjectURL — bloqueado en sandbox)
- Persistencia via window.storage (key: "nscf_v3") — guarda después de cada producto
- Rate limit retry con backoff (429/529)
- **Nota técnica**: JSX artifact tiene API key injection. show_widget HTML NO — calls fallan silently

**3. Social Cards — 42 productos × ES + EN × 5 cards (3 TikTok + 2 Instagram)**

| Línea | Productos | Estado |
|---|---|---|
| Scalp | Capissen Shampoo, Capissen Loción, Shampoo Depura, Menthol Ice | ✅ |
| Moisture | Shampoo Humit, Humit Mask, DY Fazza 200ml, DY Fazza 400ml | ✅ |
| Restore | Shampoo Kerasin HB, Kerasin HB Mask, Kerasin HB Leave-In, Velvety Control | ✅ |
| Color Rescue | Dyfensor SF, Total Violet x2, DY Fazza Color x2, Revenant x5, Dyfensor Serum, Green 100, Hyaloneurine | ✅ |
| Styling | Neurona Gloss x2, Lisothermic, Thermo Dual | ✅ |
| Kits | HUMIT x3, KERASIN x3, TV Color x2, TV Control x3, SOS, Serum Duo | ✅ |

**4. QA Corrections — Contexto skincare detectado y corregido**

| Producto | Problema | Fix |
|---|---|---|
| HUMIT MASK | Quotes sobre piel/cara | Reescrito contexto capilar |
| DY FAZZA 200ml | Quotes sobre piel/cara | Reescrito contexto capilar |
| DY FAZZA 400ml (EN) | Quotes sobre piel/cara | Reescrito contexto capilar |
| HUMIT Hydration Ritual | Quotes sobre piel/poros | Reescrito contexto capilar |
| HUMIT Ritual Plus | Quotes sobre piel/manchas | Reescrito contexto capilar |
| HUMIT Ritual + Finish | Quotes sobre piel/maquillaje | Reescrito contexto capilar |
| TV Control Ritual (EN) | Quotes T-zone/skin | Reescrito contexto cuero cabelludo |
| TV Control Ritual Plus (EN) | Quotes poros/skin | Reescrito contexto frizz/cabello |
| SERUM DUO | Quotes manchas/cara | Reescrito contexto capilar (Hyaloneurine + Dyfensor para cabello) |

**5. EN Translations**
- Todos los 42 productos tienen `translationsRegister` con digest real del body_html actual
- Digestos obtenidos via `translatableResources` query antes de cada push

### Decisiones estratégicas

**Social Proof Agent como stack tool:**
- Patrón establecido: para cualquier tienda nueva antes del launch, correr este agente
- Conectado a Supabase; si no existe el cliente, solicitar datos igual que el auditor
- Documentado en ecosystem como "Social Proof Agent v3"

**CRO Audit Layer:**
- Extensión del ShopifyAuditor para detectar ausencia de social proof, urgency/scarcity, trust signals, upsell/cross-sell, above-the-fold ATC, checkout friction
- Buildear en siguiente sesión — deadline martes

### Estado post-sesión

```
B2C Social Proof: 42/42 productos con cards ES + EN ✅
B2C Collections: 5 collections populadas (29 productos) ✅
B2C EN Translations: 42/42 con digests reales ✅
B2C Score: 109/155 (re-audit URGENTE — 20+ fixes aplicados post-audit)
B2B Score: 133/160 ✅
```

### Pendientes manuales — acción requerida Patricia/Sam

**Críticos antes del martes (bloquean ventas):**
- **EUR→USD**: Admin → Settings → General → Store currency
- **Payment gateway**: Admin → Settings → Payments → Shopify Payments → Complete setup
- **Shipping rates FL**: Admin → Settings → Shipping → Vizos Salón → Start shipping + crear tarifa Florida
- **Precios $0.00**: 20 variantes — Patricia en Admin

**Importantes para launch:**
- **Kit images**: 12 productos sin imagen — solicitar a Neurone Cosmética
- **Policies**: pegar texto del NeuroneSCF_Policies.docx en Admin → Settings → Policies
- **WhatsApp in footer**: Customizer → Footer settings
- **Pages content**: about / la-ciencia / faq / contacto → Admin → Pages
- **Product tags cleanup**: B2c, Anti-caida visibles en sidebar → Admin → Products → Tags

### Agenda próxima sesión

1. **PRIORIDAD MARTES**: CRO Audit Layer — extensión del ShopifyAuditor
2. **B2C re-audit**: score 109 muy desactualizado
3. **Kits in main nav menu** + homepage section
4. **"· 0" display bug**: `neurone.size` metafield = "0" visible en product page

---

## SESIÓN 2026-05-02 R3 — ShopifyAuditor v9.12 + Fix nav double-slash B2C
**Operador:** Sam | **Claude:** Sonnet 4.6

### Resumen ejecutivo
Sesión intensiva de evolución del ShopifyAuditor EF y corrección del bug crítico de navegación en el tema B2C. Se deployaron las versiones v9.10→v9.12 del auditor con módulo de tracking, detección de delivery profiles para shipping y filosofía de mensajería constructiva. Se identificó y corrigió el bug `locale_root` double-slash en `nc-header.liquid` del B2C que generaba URLs `//collections/all` en vez de `/collections/all`.

### EF Infrastructure

| EF | Versión Supabase | Semántica | Descripción |
|---|---|---|---|
| shopify-audit | v22 | v9.12 | Tracking module, constructive messaging, delivery profiles |
| shopify-theme-locale | v21 | — | read_nav + fix_nav_links + fix_iso_code_comparisons |
| shopify-debug | v6 | — | Diagnóstico locale_root bug + fix aplicado |

### Trabajo realizado

**ShopifyAuditor v9.10 — Delivery Profiles:**
- Añadido fetch `delivery_profiles.json` al pipeline de audit
- `extractDeliveryProfileInfo()`: parsea `profile_locations[].location_group.location_group_zones[].method_definitions[]`
- `hasZoneRates` movido a scope externo (fix bug ReferenceError)
- SHIP-RATES-SUGGEST: mensaje constructivo cuando zona existe pero tarifas no verificables
- **Diagnóstico confirmado**: el store B2B tiene zona "United States" con tarifa €10.00 en delivery profile; la location "Vizos Salón" debe activarse con "Start shipping" para que se detecte

**ShopifyAuditor v9.11 — Módulo TRACKING:**
- Nuevo módulo `tracking` (max 5pts) → scoreMax sube 155→160
- Detecta: Meta Pixel (`fbq`), TikTok Pixel (`ttq`), Google Analytics/GTM (`gtag`/`dataLayer`), Klaviyo (`_learnq`), Pinterest, Snapchat
- Fuentes de detección: `theme.liquid` + `script_tags.json` + apps instaladas via GraphQL
- `tracking_debug` en response: `{hasMeta, hasTikTok, hasGoogle, hasKlaviyo, scriptTagCount}`
- B2C y B2B confirmados: sin pixels instalados → TRACK-SUGGEST

**ShopifyAuditor v9.12 — Filosofía constructiva:**
- **PAYMENTS**: `PAY-B2B-SUGGEST` y `PAY-SUGGEST` reemplazan alarmas con sugerencias accionables
- **SHIPPING**: `SHIP-RATES-SUGGEST` y `SHIP-SUGGEST` con instrucciones de configuración
- **TRACKING**: `TRACK-SUGGEST` y `TRACK-PARTIAL` con recomendación apps oficiales Shopify App Store
- Todos los módulos: mensajes más descriptivos, `how_to_fix` con paths exactos de Admin
- Campo `suggestion` añadido a findings críticos con contexto y alternativas

**Fix bug navegación B2C — locale_root double-slash:**
- **Síntoma**: links del menú B2C generaban `href="//collections/all"` → DNS_PROBE_FINISHED_NXDOMAIN
- **Root cause**: en `nc-header.liquid`, cuando `request.locale.root_url == '/'` (no blank), el bloque `if/else` asignaba `locale_root = '/' | append: '/' = '//'`
- **Fix aplicado** (via pg_net → shopify-debug EF v6):

```liquid
-- ANTES (buggy) --
{%- if request.locale.root_url == blank -%}
{%- assign locale_root = '/' -%}
{%- else -%}
{%- assign locale_root = request.locale.root_url | append: '/' -%}
{%- endif -%}

-- DESPUÉS (fixed) --
{%- assign locale_root = request.locale.root_url | append: '/' | replace: '//', '/' -%}
```

- Fix verificado post-apply: `locale_block_found: false` (bloque roto eliminado), nueva línea confirmada en `href_sample`
- Cubre todos los casos: `root_url=''` → `/`, `root_url='/'` → `/`, `root_url='/es'` → `/es/`

**Infraestructura pg_net:**
- Descubierto y utilizado `net.http_post()` via `Supabase:execute_sql` para llamar EFs directamente desde SQL
- Timeout configurable via `timeout_milliseconds := 30000`
- Permite invocar EFs sin necesidad de proxy HTTP externo

### Audit B2B — Estado actual (v9.12)

| Módulo | Score | Código/Estado |
|---|---|---|
| settings | 7/20 | SET-002 No Refund Policy (critical) |
| catalog | 20/20 | ✅ 73 productos limpios |
| content_language | 5/5 | ✅ EN |
| theme_language | 10/10 | ✅ Monolingual |
| seo | 9/10 | SEO-003: 5 products short title |
| collections | 10/10 | ✅ |
| theme | 9/15 | THEME-004 cookie, THEME-005 footer links |
| payments | 8/10 | PAY-B2B-SUGGEST |
| orders | 10/10 | ✅ |
| shipping | 3/5 | SHIP-RATES-SUGGEST |
| discounts | 5/5 | DISC-003 opportunity |
| navigation | 7/10 | NAV-002 no Refund page |
| tracking | 0/5 | TRACK-SUGGEST — sin pixels |
| apps | 10/10 | ✅ |
| performance | 5/5 | ✅ |
| b2c_vs_b2b | 5/5 | ✅ |
| strategic_seo | 10/10 | ✅ 100% kw coverage |
| **TOTAL** | **133/160** | |

### Pendientes manuales — acción requerida Patricia/Sam

**Críticos (bloquean operación):**
- **Shopify Payments B2B**: Admin → Settings → Payments → Shopify Payments → Complete setup
- **Shopify Payments B2C**: ídem
- **Shipping "Start shipping"**: Settings → Shipping → "Vizos Salón" → Start shipping (activa location)

**Importantes (para lanzamiento):**
- **Policy pages**: Settings → Policies → crear Refund Policy, Terms of Service, Privacy Policy, Shipping Policy
- **Footer menu**: Online Store → Navigation → Footer → añadir links a Policy pages
- **Tracking pixels**: instalar vía Shopify App Store: "Facebook & Instagram", "Google & YouTube", "TikTok"
- **Cookie consent**: instalar CookieYes desde App Store
- **SEO-003**: 5 COLOR products con SEO title <30 chars (fixable con auditor)

**B2C pendientes adicionales:**
- Precios $0.00 en 20 variantes
- Imágenes en 12 productos kit
- Tags de filtro visibles en sidebar ("B2c", "Anti-caida")
- Páginas: about, la-ciencia, faq, contacto (Admin → Pages)

---

## SESIÓN 2026-05-02 R2 — B2C: Logo, Pro Portal, i18n Round 2, Key Benefits
**Operador:** Sam | **Claude:** Sonnet 4.6

### Resumen ejecutivo
Segunda ronda intensiva de fixes sobre la tienda B2C. Se completó el logo, la eliminación del Pro Portal, la corrección del bug crítico de `locale_root` (404 en nav EN), las traducciones de product types (HUMEDAD/RESTAURAR/ANTI-CAÍDA), el batch translation de Key Benefits para 7 productos via metafield `benefit_claims_en`, la limpieza del sidebar de colecciones y múltiples correcciones de locale-awareness en footer/hero/product-detail.

### EF Infrastructure

| EF | Versión | Descripción |
|---|---|---|
| shopify-theme-locale | v8 | Action router completo: fix_v2, fix_v3, fix_v3b, fix_logo_asset_url, fix_headline_translation, fix_remaining_logos, upload_logo, put_asset, read_asset |
| shopify-fix-benefits | v3 | Batch job: lee benefit_claims EN→ traduce via Claude → crea metafield benefit_claims_en por producto. Paginación via since_id. |

### Trabajo realizado

**Bug crítico fix — locale_root 404:**
`request.locale.root_url` devuelve `/en` (sin trailing slash) → todos los links del nav EN daban 404. Corregido en `nc-header.liquid`: `locale_root = '/' | append: iso_code | append: '/'`.

**Logo NSCF_Logo_WT_TC.png:**
- Subido como theme asset a la CDN B2C: `cdn.shopify.com/s/files/1/0969/9567/2391/t/8/assets/NSCF_Logo_WT_TC.png`
- Aplicado en: header (reemplaza text "Neurone Cosmética"), footer, hero media placeholder
- Hero: clase `nc-hero-product-img nc-reveal` para animación
- Footer logo: indentación exacta corregida (12 vs 10 spaces — fix con string exacto)

**Pro Portal eliminado:**
- `nc-header.liquid`: nav desktop + mobile menu
- `nc-footer.liquid`: columna de Info
- `nc-product-detail.liquid`: tab Shipping (link + párrafo)

**Hero i18n:**
- CTA buttons URL ahora locale-aware (`locale_root | append: 'collections/all'`)
- Headline: "Cuando Tu" (era "Cuando el") → EN translation registrada: "WHEN YOUR" via `translationsRegister`

**Filtros en colección cleanup:**
- "Ordenar por" sidebar: eliminado
- "Otras Líneas" sidebar: eliminado
- "Tipo de Cabello" / "Hair Type": mejorado visualmente (texto uppercase, border-bottom)
- Sort dropdown en header de grid: eliminado
- Strings hardcodeados ES→EN: eyebrow, empty state, product count

**Product type EN mapping expandido:**

| ES | EN |
|---|---|
| ANTI-CAÍDA / Anti-Caída | Anti-Hair Loss |
| HUMEDAD / Humedad | Moisture |
| RESTAURAR / Restaurar | Restore |
| CUERO CABELLUDO | Scalp |
| TRATAMIENTO | Treatment |
| ALISADO | Smoothing |
| PURIFICANTE | Purifying |

**Collection title EN translations:**
Registradas via `translationsRegister` para 5 colecciones: Moisture, Restore, Styling, Color Rescue, Scalp.

**"Also from COLLECTION" mapping:**
`nc-product-detail.liquid`: case statement que convierte títulos ES a EN en la sección de related products.

**Shipping tab:**
Eliminada de `nc-product-detail.liquid` (botón + panel completo).

**Option name "Presentación" → "Presentation":**
Inline Liquid mapping en `nc-product-detail.liquid` para variant option names en EN.

**Format mapping:**
`pump_bottle` → "Pump Bottle", `spray_bottle` → "Spray Bottle", `capsula` → "Capsule" en EN.

**Footer links locale-aware:**
`nc-footer.liquid`: todos los hrefs hardcodeados de /collections/*, /pages/*, /policies/* ahora con `request.locale.root_url | default: '/'`.

**Key Benefits batch translation:**
- `shopify-fix-benefits` EF desplegado (v3)
- 4 batches: 61 productos total, 7 con benefit_claims en español
- 7 productos tradujeron vía Claude Sonnet 4.6 y crearon `neurone.benefit_claims_en` metafield
- `nc-product-detail.liquid` actualizado: usa `benefit_claims_en` cuando disponible en EN, fallback a `benefit_claims`

**Collection grid locale:**
`nc-collection-grid.liquid`: link "Ver todo el catálogo" ahora locale-aware.

### Estado post-sesión

```
B2C theme: Pro Portal eliminado ✅ | Logo NSCF ✅ | locale_root 404 fix ✅
B2C i18n: Product types EN ✅ | Collection titles registered EN ✅ | Hero "WHEN YOUR" ✅
B2C product detail: Key Benefits EN (7/7 con benefits) ✅ | Format mapping ✅ | Shipping tab removed ✅
B2C footer: Locale-aware links ✅
```

### Pendientes manuales (Shopify Admin)

**Patricia — contenido:**
- Páginas 404: `/pages/about`, `/pages/la-ciencia`, `/pages/faq`, `/pages/contacto` — crear en Admin > Pages
- Policy pages: Terms of Service, Shipping Policy, Refund Policy — Admin > Settings > Policies
- WhatsApp: verificar que el campo WhatsApp en Customizer > Footer settings esté vacío
- Precios $0.00 (20 variantes pendientes)
- Imágenes kits (12 productos sin imagen)
- Payment gateway
- Shipping rates (zona Florida)

**Verificación:**
- Collection tiles "CUERO CABELLUDO/RESTAURAR/HUMEDAD": template tiene nombres EN correctos, es browser cache — hard refresh `Ctrl/Cmd+Shift+R`
- Re-auditar B2C para score actualizado

### Nota técnica
El metafield `neurone.benefit_claims_en` no aparece en `translatableResources` porque no tiene `MetafieldDefinition` registrada. La estrategia elegida fue crear el metafield EN como campo separado. Para futuro: crear la MetafieldDefinition y migrar al enfoque oficial de Shopify Translate & Adapt.

---

## SESIÓN 2026-05-02 — Theme i18n: bilingüismo completo B2C
**Operador:** Sam | **Claude:** Sonnet 4.6

### Resumen ejecutivo
Completamos el trabajo de bilingüismo del tema B2C. Todos los strings hardcodeados en español del tema fueron reemplazados con `{{ 'key' | t }}` Liquid filters + locale files actualizados. La tienda ahora es verdaderamente bilingüe ES/EN via Shopify Markets.

### Trabajo realizado

**OAuth re-auth:** `read_locales` + `write_translations` añadidos a ambas tiendas (B2C y B2B).

**audit v9.5 (EF v14):**
- Apps: GraphQL `appInstallations` reemplaza REST roto → APP-OK muestra 6 apps reales
- Nuevo módulo `theme_language` (max 10pts): detecta gaps de traducción con `shopLocales` + `translatableResources`
- THEME-LANG-001: B2C detectó 23/3870 strings EN faltantes (1% untranslated)
- Translate & Adapt instalado ✅ detectado correctamente

**fix-all v4 (EF v4):**
- Nuevo worker `fix_theme_translate`: lee strings faltantes → Claude traduce UI strings preservando brand names → `translationsRegister` mutation
- B2C: 2 strings ES aplicados, 21 skipped (ya en EN o brand names) ✅

**theme-i18n-fix EF (nuevo, one-shot):**
Actualizó 6 archivos del tema B2C vía PUT a la Shopify Assets API.

**B2B fixes:** fix_seo_combined: 73/73 aplicados. B2B score: 120 → 130/155 (+10pts).

### Estado post-sesión
```
B2C score: 109/155 | fixable: 1 (THEME-LANG-001)
B2B score: 130/155 | fixable: 1 (SEO-003)
Theme i18n: COMPLETE para header/footer/product/featured/collection-grid
```

---

## SESIÓN 2026-05-01 (tarde) — ShopifyAuditor R4B + Language Detection

### Completado
- audit v9.5, fix-all v3, GraphQL SEO read-back
- B2C: 62/62 SEO titles + meta descs, 98% kw coverage, 100pts/155
- fix_theme_translate: 2 strings ES→EN aplicados
- HTML bug fix: sc-discovery crash en saveStrat()

---

## SESIONES ANTERIORES
Ver entradas anteriores en el historial del archivo.
