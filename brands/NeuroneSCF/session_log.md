# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-16 (parte 2)_

---

## SESIÓN 2026-05-16 PARTE 2 — Sam

### COMPLETADO HOY

#### 1. LANGUAGE SWITCHER — Rituals & Kits + Moisture EN ✅
- `nc-page-moisture-hero.liquid` — inline `_locale` check, texto EN/ES
- `nc-page-moisture-caracteristicas.liquid` — locale check → `sections.moisture.*`
- `nc-rituals-kits-intro.liquid` — locale check → `sections.ritual_kits.*`
- `locales/en.json` — añadidos `sections.moisture` + `sections.ritual_kits` completos

#### 2. META PIXEL ✅ (instalado y verificado)
- Pixel ID: `1348252664025025` — "Neurone SCF — Web"
- Instalado en `layout/theme.liquid`
- Eventos verificados: `PageView` ✅ · `ViewContent` ✅ · `AddToCart` ✅ · `InitiateCheckout` ✅ · `SubscribedButtonClick` ✅
- Dominio `neuronescflorida.com` verificado vía Cloudflare TXT ✅

#### 3. CHECKOUT BRANDING ✅ (manual Basic)
- Logo NSCF transparente · Button `#0076A8` · Montserrat / Helvetica Neue
- Branding API requiere Plus — Order Status scripts no permitido en Basic

#### 4. JUDGE.ME — IMPLEMENTACIÓN COMPLETA ✅
- `snippets/judgeme_widgets.liquid` v15
- **Badge (product card + PDP):**
  - Con reviews: SSR desde `judgeme.badge` metafield (display:none stripeado con Liquid)
  - Sin reviews: 5 estrellas naranja sólido `#C4622D` + "Sin reseñas aún" / "No reviews yet"
  - Auto-actualiza cuando Judge.me sincroniza primera review
- **Widget reviews tab:**
  - Con reviews: SSR desde `judgeme.widget` (temp-hiding-style stripeado)
  - Sin reviews: HTML puro — ⭐⭐⭐⭐⭐ + "Sin reseñas aún" + botón "Escribir una reseña"
  - Sin `data-auto-install` para estado vacío (evita sobreescritura por Judge.me JS)
- **Dark theme:** `element.style.setProperty()` con `'important'` — beats CDN CSS
- Oculto: `.jdgm-rev-widg__summary`, `.jdgm-histogram`, `.jdgm-rev-widg__sort-wrapper`
- Visible en TODAS las páginas de producto — con o sin reviews

---

## PENDIENTES

### NeuroneSCF — inmediatos
- [ ] **Judge.me** — activar review request emails en Settings → Automations
- [ ] **DY Fazza** — confirmar 200ml vs 400ml con PO (bloquea SOS bundle y Moisture & Shine)
- [ ] **B2B language switcher** — pendiente
- [ ] **Traducciones EN** — re-run batch fallidos
- [ ] **La Ciencia page EN** — auto-translate
- [ ] **Vizos B2B pricing** — cuenta cliente + descuento
- [ ] **DY Fazza foto incorrecta** (NSCF-TR-013)
- [ ] **Shipping zones** — 3/5 pendientes
- [ ] **Meta** — Instagram → Facebook Page vincular
- [ ] **Meta** — añadir payment method para ads
- [ ] **GA4 Measurement ID** — instalar en Shopify
- [ ] **Klaviyo** — instalar antes de ads (alta prioridad)
- [ ] **Kiosko** — test real con embajadora en salón

### Ecosistema
- [ ] **Stripe Atlas LLC Delaware** — P1
- [ ] **Ayra Sprint 0** — antes del 5 Jun
- [ ] **luciensael.com DNS** — 10 min
- [ ] **XMMs** — eliminar proyecto muerto

---

## NOTAS TÉCNICAS

### Judge.me — Claves
- Metafield correcto: `product.metafields.judgeme.badge` (key=`badge`, NO `preview_badge`)
- Stripear `style='display:none'` con Liquid `replace` antes de renderizar
- Stripear `<style class='jdgm-temp-hiding-style'>` del widget
- Dark theme: `element.style.setProperty(prop, value, 'important')` — CSS no puede ganar
- Para sin-reviews: NO usar `data-auto-install='true'` — Judge.me sobreescribe

### Tracking
- TikTok Pixel ID: `D832THJC77UATASL0OO0`
- Meta Pixel ID: `1348252664025025`
- GA4: pendiente instalar

### Shopify B2C Theme `192983662919`
- Snippets: `judgeme_widgets.liquid`, `nc-product-card.liquid`
- Sections: `nc-product-detail.liquid`, `nc-page-moisture-hero.liquid`, `nc-page-moisture-caracteristicas.liquid`, `nc-rituals-kits-intro.liquid`
- Locales: `locales/en.json` — sections.nli, sections.moisture, sections.ritual_kits

### Kiosko
- URL: `nscf-kiosko.vercel.app` · Repo: `unrealvillestudio-hub/NeuroneSCF/kiosko/`
- Supabase: `amlvyycfepwhiindxgzw`

### Bundles
- SOS Kit: bloqueado por DY Fazza 200ml vs 400ml
- Moisture & Shine: bloqueado — Resplander Shine no existe como producto
