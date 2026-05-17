# NeuroneSCF — Platform Notes
_Categoría: client_
_Versión: v1.0 · 2026-05-17 · Estado: approved_

---

## QUÉ ES
Notas de configuración y variaciones específicas de NeuroneSCF que difieren del comportamiento estándar de las plataformas. No reemplaza los manuales de plataforma — los complementa con las particularidades de esta marca.

---

## SHOPIFY

**B2C** — `egdk1n-gt.myshopify.com` → `neuronescflorida.com`
- Plan: Basic
- Theme ID: `192983662919`
- Locale check: `request.locale.iso_code == 'en'`
- Checkout branding configurado manualmente: Logo NSCF · Button `#0076A8` · Montserrat/Helvetica Neue

**B2B** — `nj5ybc-n1.myshopify.com`
- Theme ID: `149164392526`
- Language switcher: pendiente implementación

---

## KLAVIYO

- Public API Key: `UNF8Ee`
- Private API Key: `pk_UNF8Ee_cbb0f530b9ab65ce7358756994fefe53bd`
- Dominio verificado: `neuronescflorida.com`
- Integración Shopify: activa ✅
- 10 templates activos (5 EN + 5 ES) — IDs completos en `brands/NeuroneSCF/session_log.md`
- Flows pendientes: 4 flows bilingüe (Abandoned Cart · Post Purchase · Review · Welcome) — configuración manual en UI pendiente

---

## JUDGE.ME

- Implementación: dark theme con color naranja `#C4622D`
- Badge: metafield `judgeme.badge` (con strip `display:none`)
- Widget: metafield `judgeme.widget` (con strip `jdgm-temp-hiding-style`)
- Sin reviews: 5 estrellas sólidas + "Sin reseñas aún" / "No reviews yet"
- Snippet: `snippets/judgeme_widgets.liquid` v15

---

## META / PIXEL

- Pixel ID: `1348252664025025` — "Neurone SCF — Web"
- Instalado en: `layout/theme.liquid`
- Dominio verificado: `neuronescflorida.com` vía Cloudflare TXT ✅
- Instagram → Facebook Page: vinculadas ✅
- Events activos: PageView · ViewContent · AddToCart · InitiateCheckout · SubscribedButtonClick

---

## GA4

- Measurement ID: pendiente instalación
- Sam tiene el ID — instalar en `theme.liquid` (5 min)

---

## PENDIENTES ACTIVOS (al 2026-05-17)

- [ ] GA4 Measurement ID — instalar
- [ ] Klaviyo flows — configurar 4 flows bilingüe en UI
- [ ] Klaviyo image_url — verificar property name real en Activity Feed
- [ ] Judge.me — activar review request emails en Settings → Automations
- [ ] DY Fazza — confirmar 200ml vs 400ml
- [ ] EN descriptions — bloqueadas por bug `shopify-auto-translate`
- [ ] Shipping zones — 3/5 pendientes

---

## CHANGELOG

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-17 | Creación inicial — estado post-sesión Klaviyo+Judge.me+Meta |
