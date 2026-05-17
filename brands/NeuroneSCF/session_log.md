# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-17_

---

## SESIÓN 2026-05-17 — Sam (parte 2)

### COMPLETADO HOY

#### 1. LANGUAGE SWITCHER — Rituals & Kits + Moisture EN ✅
- `nc-page-moisture-hero.liquid` — locale check inline EN/ES
- `nc-page-moisture-caracteristicas.liquid` — locale → `sections.moisture.*`
- `nc-rituals-kits-intro.liquid` — locale → `sections.ritual_kits.*`
- `locales/en.json` — añadidos `sections.moisture` + `sections.ritual_kits`

#### 2. META PIXEL ✅ VERIFICADO
- Pixel ID: `1348252664025025` — "Neurone SCF — Web"
- Instalado en `layout/theme.liquid`
- Todos los eventos procesados en Events Manager:
  PageView ✅ · ViewContent ✅ · AddToCart ✅ · InitiateCheckout ✅ · SubscribedButtonClick ✅
- Dominio `neuronescflorida.com` verificado vía Cloudflare TXT ✅
- Meta: Instagram → Facebook Page vinculadas ✅
- Meta: payment method añadido ✅

#### 3. CHECKOUT BRANDING ✅ (manual — Basic plan)
- Logo NSCF · Button #0076A8 · Montserrat headings · Helvetica Neue body
- Branding API requiere Plus — no disponible vía código
- Order Status scripts: no permitido en Basic

#### 4. JUDGE.ME — IMPLEMENTACIÓN COMPLETA ✅
- `snippets/judgeme_widgets.liquid` v15 — snippet oficial con dark theme
- Badge: con reviews → SSR desde `judgeme.badge` (display:none stripeado con Liquid)
- Badge: sin reviews → 5 estrellas naranja sólido #C4622D + "Sin reseñas aún"
- Widget tab Reseñas: con reviews → SSR desde `judgeme.widget`
- Widget tab Reseñas: sin reviews → HTML puro custom (no Judge.me JS — evita sobreescritura)
- Dark theme: `element.style.setProperty('important')` — beats CDN CSS
- Oculto: `.jdgm-rev-widg__summary`, `.jdgm-histogram`, `.jdgm-rev-widg__sort-wrapper`
- Visible en TODOS los productos con o sin reviews

#### 5. KLAVIYO ✅ INSTALADO Y CONFIGURADO
- Plan: Email $20/mes
- Public API Key: `UNF8Ee`
- Private API Key: `pk_UNF8Ee_cbb0f530b9ab65ce7358756994fefe53bd`
- Script instalado en `layout/theme.liquid`
- Integración Shopify: conectada y activa ✅
- Dominio email verificado: `neuronescflorida.com` ✅
- DNS Cloudflare: NS + DKIM + SPF + DMARC configurados ✅
- Tracking activo: Viewed Product, Active on Site, Identify (clientes logueados)
- Shopify sync: Checkout Started ✅ · Placed Order ✅

#### 6. KLAVIYO TEMPLATES ✅ CREADOS (10 templates — EN + ES)

**Templates EN:**
| Template | ID |
|---|---|
| NSCF - Abandoned Cart A | `X57LJu` |
| NSCF - Abandoned Cart B | `Ws6J7R` |
| NSCF - Post Purchase | `SedUug` |
| NSCF - Review Request | `U2DMYK` |
| NSCF - Welcome | `XBvyZH` |

**Templates ES:**
| Template | ID |
|---|---|
| NSCF-ES - Abandoned Cart A | `Tm3JWE` |
| NSCF-ES - Abandoned Cart B | `QVANPy` |
| NSCF-ES - Post Purchase | `UwszQw` |
| NSCF-ES - Review Request | `S6ZDHq` |
| NSCF-ES - Welcome | `TTrxdT` |

**Copy pipeline ejecutado con datos reales de Supabase:**
- psycho_presets: PSY-ASPIRATION, PSY-IDENTITY, PSY-URGENCY, PSY-SCARCITY, PSY-AUTHORITY, PSY-TRUST, PSY-SOCIAL-PROOF, PSY-BELONGING, PSY-CURIOSITY
- humanize_profiles NeuroneSCF: tono científico-accesible, Spanglish controlado, voz Patricia
- compliance_rules: sin cura/trata/elimina/garantizado
- Imagen dinámica de producto incluida en todos los templates

**Subjects finales:**
- Cart A ES: "Lo dejaste ahí. Tu cabello sabe por qué. 🧴"
- Cart B ES: "Pocas unidades. Mucha humedad. Tú decides. ⏱"
- Cart A EN: "You stopped. Your hair already knows why. 🧴"
- Cart B EN: "Limited stock. Unlimited humidity. You choose. ⏱"
- Post Purchase ES: "Llegó. Aquí lo que Patricia quiere que sepas. 🖤"
- Post Purchase EN: "It arrived. Here's what Patricia wants you to know. 🖤"
- Review ES: "Tu cabello habló. ¿Nos cuentas? ⭐"
- Review EN: "Your hair spoke. Will you tell us? ⭐"
- Welcome ES: "No es una lista de correos. Es otra cosa. 🖤"
- Welcome EN: "This isn't a mailing list. It's something else. 🖤"

#### 7. KLAVIYO FLOWS — ESTRUCTURA BILINGÜE DEFINIDA ✅
Lógica: ES = es-US · EN = todo lo demás (incluyendo RU, FR, etc.)
Estructura para los 4 flows:
```
Trigger → Delay → Conditional Split ($locale = es-US)
  YES → Email ES
  NO  → Email EN
```

**Configuración por flow:**
- Abandoned Cart: trigger Checkout Started · delay 1h · split · Email A · delay 23h · Email B
- Post Purchase: trigger Placed Order · delay 2 días · split · Email único
- Review Request: trigger Placed Order · delay 14 días · split · Email único
- Welcome: trigger List (Email List) · inmediato · split · Email único

**PENDIENTE:** Configurar los flows manualmente en Klaviyo UI
(API no permite añadir actions a flows — limitación confirmada)

#### 8. DECISION_MATRIX + PROFESSOR — DISEÑO COMPLETO ✅
- Taxonomía A+B+C+D definida
- Vetos absolutos V1-V4 definidos
- Mecanismo bypass de Sam definido
- Arquitectura Supabase + Vercel definida
- Schema de 9 tablas diseñado
- Checkpoint cada 10 mensajes acordado
- Comandos: "Professor, anota" + "Professor" (final sesión)
- Plan de implementación completo generado

**PENDIENTE:** Implementación (4 sprints — ver plan adjunto)

---

## PENDIENTES ACTIVOS

### NeuroneSCF — inmediatos
- [ ] **Klaviyo flows** — configurar los 4 flows en UI (bilingüe ES/EN)
- [ ] **Klaviyo imágenes** — verificar property name real de image_url en line_items (ver Activity Feed → Checkout Started event)
- [ ] **Judge.me** — activar review request emails en Settings → Automations
- [ ] **Judge.me templates viejos** — borrar manualmente en Klaviyo (8 duplicados sin ID en nombre)
- [ ] **DY Fazza** — confirmar 200ml vs 400ml con PO (bloquea SOS bundle + Moisture & Shine)
- [ ] **B2B language switcher** — implementar bilingüe
- [ ] **Traducciones EN** — re-run batch fallidos
- [ ] **La Ciencia page EN** — auto-translate
- [ ] **Vizos B2B pricing** — cuenta cliente + descuento
- [ ] **DY Fazza foto incorrecta** (NSCF-TR-013)
- [ ] **Shipping zones** — 3/5 pendientes
- [ ] **GA4 Measurement ID** — instalar en Shopify
- [ ] **Kiosko** — test real con embajadora en salón

### DECISION_MATRIX + PROFESSOR — implementación
- [ ] **Sprint 1** — Schema Supabase (9 tablas + seed data + índices)
- [ ] **Sprint 2** — 6 Edge Functions
- [ ] **Sprint 3** — Archivos Vercel (knowledge/ + DECISION_MATRIX.md + PROFESSOR_PROTOCOL.md)
- [ ] **Sprint 4** — Integración SESSION_PROTOCOL
- **Documento:** `IMPLEMENTATION_PLAN_MATRIX_PROFESSOR.md` — listo para cargar al inicio del sprint

### Ecosistema
- [ ] **Stripe Atlas LLC Delaware** — P1
- [ ] **Ayra Sprint 0** — antes del 5 Jun
- [ ] **luciensael.com DNS** — 10 min
- [ ] **XMMs** — eliminar proyecto muerto

---

## NOTAS TÉCNICAS CRÍTICAS

### Judge.me
- Metafield correcto: `product.metafields.judgeme.badge` (NO `preview_badge`)
- Metafield widget: `product.metafields.judgeme.widget`
- Stripear `style='display:none'` con Liquid replace
- Stripear `<style class='jdgm-temp-hiding-style'>` del widget
- Dark theme: `element.style.setProperty(prop, value, 'important')` — CSS no puede ganar
- Sin reviews: NO usar `data-auto-install='true'` — Judge.me sobreescribe con empty state propio

### Klaviyo
- Public Key: `UNF8Ee`
- API limitation: DELETE/rename templates no disponible con public key
- API limitation: REST API no permite crear flow actions — solo flows vacíos
- Filtro Liquid `| money` de Shopify NO funciona en templates Klaviyo — usar `{{ item.price }}` directo
- Image URL en line_items: verificar property name real desde Activity Feed (puede ser `image_url` o `ImageUrl`)
- Trigger "Added to Cart" requiere configuración especial — usar "Checkout Started" como alternativa
- "Checkout Started" es igual o mejor (cliente ya escribió email)

### Meta
- Pixel ID: `1348252664025025`
- Dominio verificado ✅
- Instagram + Facebook Page vinculadas ✅
- Payment method añadido ✅

### agent-browser (Windows)
- Requiere terminal separada para `npx agent-browser-mcp` (mantener activa)
- claude.ai web NO soporta MCP servers locales stdio — solo funciona desde Claude Code CLI
- Claude Code: instalar con `npm install -g @anthropic-ai/claude-code`
- Registrar MCP: `claude mcp add agent-browser --transport stdio -- npx agent-browser-mcp`
- Para tareas de UI puntual: hacerlo manual es más rápido que el setup

### Shopify B2C Theme `192983662919`
- Locale check: `request.locale.iso_code == 'en'`
- Metafield judge.me: usar namespace `judgeme`, key `badge` y `widget`

### Klaviyo Templates con imagen de producto
```html
{% if item.image_url %}
  <img src="{{ item.image_url }}" ...>
{% elsif item.ImageUrl %}
  <img src="{{ item.ImageUrl }}" ...>
{% else %}
  <!-- fallback N de Neurone -->
{% endif %}
```

### DECISION_MATRIX — casos calibrados iniciales
1. Reviews falsas → V1 activo (B2+C1) · bypass Sam NO aplica · correcto rechazar
2. Content pipeline sin skill → output externo con gap de contexto → debió DECLARAR gap y esperar

---

## PARA EL PRÓXIMO CHAT

### Prioridad 1: Implementar DECISION_MATRIX + Professor
Cargar: `IMPLEMENTATION_PLAN_MATRIX_PROFESSOR.md`
Arrancar Sprint 1: schema Supabase

### Prioridad 2: Terminar Klaviyo flows
- Verificar image_url property en Activity Feed
- Configurar 4 flows bilingües en UI

### Prioridad 3: GA4
- Sam tiene el Measurement ID
- Instalar en theme.liquid (5 min)

### Social Media Agent
Sin novedades nuevas desde último export.
