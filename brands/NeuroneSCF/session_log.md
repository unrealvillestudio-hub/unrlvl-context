# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-16_

---

## SESIÓN 2026-05-16 — Sam

### COMPLETADO HOY

#### 1. LANGUAGE SWITCHER B2C — FIXES ✅
- Bug raíz: `product.url | prepend: request.locale.root_url` duplicaba `/en/` en contextos donde Shopify ya prefija la URL
- Fix: verificación `split: _lr | first != ''` antes de prepend — `nc-product-card.liquid`
- `nc-collection-grid.liquid` — fallback links corregidos con `locale_root`
- `nc-linea-intro.liquid` — locale-aware text: 5 líneas (Color Rescue, Restore, Styling, Scalp, Serums) vía `locales/en.json`
- `nc-page-moisture-hero.liquid` — texto hardcodeado EN/ES con `_locale` check
- `nc-page-moisture-caracteristicas.liquid` — locale check → `sections.moisture.*`
- `nc-rituals-kits-intro.liquid` — locale check → `sections.ritual_kits.*`
- `locales/en.json` — añadidos bloques `sections.nli`, `sections.moisture`, `sections.ritual_kits`
- Product types EN: TRATAMIENTOS, TREATMENTS, CLEANSING, SERUMS, RITUALS & KITS añadidos al case

#### 2. SISTEMA EMBAJADORAS + KIOSKO ✅
- **DB Supabase (main UNRLVL):** `nscf_salones`, `nscf_embajadoras`, `nscf_draft_orders`, `nscf_attribution`
- 4 salones + 16 embajadoras seed con PINs iniciales
- **Edge Functions:**
  - `nscf-kiosko-data` v2 — GET salones/products + POST login/change_pin/request_reset/verify_reset
  - `nscf-kiosko-draft` v1 — crea Draft Orders en Shopify B2C
  - `nscf-attribution` v2 — webhook orders/paid → atribución + email post-venta
  - `nscf-mailer` v1 — emails confirmación venta + recuperación de PIN (Resend)
  - `shopify-translate-batch` v2 — batch traducción EN por grupos de 5
- **Webhook:** `orders/paid` registrado en Shopify B2C → `nscf-attribution`
- **Kiosko app** — React/Vite, deployed en `nscf-kiosko.vercel.app`
  - Login por salón + nombre + PIN
  - Catálogo visual con imágenes Shopify en vivo
  - Carrito + slider descuento 0–15% con precio original/descontado
  - QR checkout — clienta paga desde su celular
  - ⚙️ Cambiar PIN autogestionado
  - "¿Olvidaste tu PIN?" → código por email
  - Logo NSCF (fondo transparente)
- **Repo:** `unrealvillestudio-hub/NeuroneSCF/kiosko/`
- **Emails:** ops@neuronescflorida.com recibe copia de cada venta

#### 3. AUTO-TRANSLATE EN — FIX ✅
- Bug raíz: `sb.schema('shopify').from('stores')` fallaba (PostgREST schema no expuesto)
- Fix: migrado a `sb.rpc('get_shopify_store')` — mismo patrón que content-pipeline
- Bug 2: `GRANT SELECT ON brand_copy_profiles TO service_role` faltaba
- Bug 3: `GRANT` faltante en tablas `nscf_*` — aplicado
- `shopify-auto-translate` v3 — desplegado y operativo
- `shopify-content-pipeline` v5 — añade trigger automático post-write
- Batch de 41 productos relanzado — traducciones EN corriendo

#### 4. META PIXEL ✅
- Pixel ID: `1348252664025025` — "Neurone SCF — Web"
- Instalado en `layout/theme.liquid`
- Eventos activos y verificados en Events Manager:
  - `PageView` ✅
  - `ViewContent` (productos y colecciones) ✅
  - `AddToCart` ✅
  - `InitiateCheckout` ✅
- Dominio `neuronescflorida.com` verificado en Meta Business ✅

#### 5. JUDGE.ME ✅
- `snippets/judgeme_widgets.liquid` — creado manualmente (custom theme)
- Badge de estrellitas en product card (bajo título)
- Badge de estrellitas en product detail (bajo título)
- Tab "Reseñas/Reviews" en product detail con widget completo
- **Pendiente:** Sam activa widget en Judge.me admin → Install en tema

#### 6. CHECKOUT BRANDING ✅ (parcial)
- Plan Basic — Branding API requiere Plus
- Sam configuró logo, colores y tipografía manualmente:
  - Logo: NSCF transparente
  - Button color: #0076A8
  - Headings: Montserrat
  - Body: Helvetica Neue
- Order Status page scripts: no permitido en Basic

#### 7. BUNDLES — ESTADO ACTUALIZADO
| Kit | Estado |
|---|---|
| 10 kits principales | ✅ Configurados |
| Moisture & Shine | ❌ Resplander Shine no existe como producto |
| S.O.S Rescue System | ⏳ Pendiente confirmar DY Fazza 200ml vs 400ml — NSCF-BTP-003 o NSCF-TR-013 |

---

## PENDIENTES

### NeuroneSCF — inmediatos
- [ ] **Judge.me** — activar widget en admin → Install en tema
- [ ] **DY Fazza** — confirmar 200ml vs 400ml con PO (bloquea SOS bundle y Moisture & Shine)
- [ ] **B2B language switcher** — pendiente implementar (confirmado: debe ser bilingüe)
- [ ] **Traducciones EN** — re-run batch para productos fallidos (algunos 500 del batch original)
- [ ] **La Ciencia page EN** — lanzar auto-translate para esa página
- [ ] **Vizos B2B pricing** — cuenta cliente + descuento en Shopify B2B
- [ ] **DY Fazza foto incorrecta** (NSCF-TR-013) — Sam sube foto correcta
- [ ] **Shipping zones** — 3/5 pendientes (admin manual)
- [ ] **Meta** — Instagram → Facebook Page vincular en Meta Business Manager
- [ ] **Meta** — añadir payment method para ads
- [ ] **GA4 Measurement ID** — instalar en Shopify (Sam tiene el ID)
- [ ] **Klaviyo** — instalar antes de ads (alta prioridad)
- [ ] **Kiosko** — test real con embajadora en salón

### Ecosistema
- [ ] **Stripe Atlas LLC Delaware** — P1 (Sam desde ordenador)
- [ ] **Ayra Sprint 0** — antes del 5 Jun
- [ ] **luciensael.com DNS** — 10 min
- [ ] **XMMs** — eliminar proyecto muerto

---

## NOTAS TÉCNICAS

### Tracking
- TikTok Pixel ID: `D832THJC77UATASL0OO0`
- Meta Pixel ID: `1348252664025025`
- GA4 Measurement ID: pendiente instalar

### Kiosko
- URL: `nscf-kiosko.vercel.app`
- Repo: `unrealvillestudio-hub/NeuroneSCF/kiosko/`
- EFs: `nscf-kiosko-data` v2, `nscf-kiosko-draft` v1, `nscf-mailer` v1, `nscf-attribution` v2
- Emails: `ops@neuronescflorida.com` copia de todas las ventas
- PINs iniciales en Supabase → `nscf_embajadoras`

### Shopify B2C Theme
- Theme ID: `192983662919`
- Locale check: `request.locale.iso_code == 'en'`
- Product URL fix: `split: _lr | first != ''` antes de prepend
- Locale file: `locales/en.json` — sections.nli, sections.moisture, sections.ritual_kits

### Supabase (main UNRLVL — amlvyycfepwhiindxgzw)
- Tablas nuevas: `nscf_salones`, `nscf_embajadoras`, `nscf_draft_orders`, `nscf_attribution`, `nscf_pin_reset_tokens`
- GRANTs aplicados: `service_role` en `brand_copy_profiles` y tablas `nscf_*`
- Webhook Shopify B2C: `gid://shopify/WebhookSubscription/2204969894215`

### Resend (email)
- API Key: en EF `nscf-mailer`
- FROM: `noreply@neuronescflorida.com`
- CC siempre: `ops@neuronescflorida.com`

### Bundles
- Shampoo Dyfensor SF: solo 12 unidades — cuello de botella SOS Kit
- Moisture & Shine: bloqueado hasta que exista Resplander Shine como producto
