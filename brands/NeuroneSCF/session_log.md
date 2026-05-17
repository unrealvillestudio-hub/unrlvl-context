# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-17 · cierre de sesión_
_sma_etag: "W/\"ab5b-ofuN2S50PKjAqtujmSW7K/E7bcI\""_

---

## SESIÓN 2026-05-17 — Sam · Cierre

### APRENDIZAJE APROBADO (Professor)

**[1] `ecosystem scan` — pregunta obligatoria antes de ejecutar**
Cuando Sam dice "ecosystem scan", Claude debe preguntar siempre:
`"Sam, lo quieres identificativo o también contextual?"`
Sin excepción, aunque el contexto parezca obvio.
Categoría: ecosystem · Destino: `protocols/SESSION_PROTOCOL.md` ✅ ya integrado en v13

---

### COMPLETADO — DECISION_MATRIX + Professor System ✅

Implementación completa del sistema DECISION_MATRIX + Professor en 4 sprints:

**Sprint 1 — Base de datos:**
- 10 tablas `professor_*` + `professor_cache` en Supabase `amlvyycfepwhiindxgzw`
- RLS service_only en todas las tablas · 7 índices
- Seed: 16 criterios (A/B/C/D) · 4 veto rules (V1-V4) · 2 casos calibrados · 9 platform variables

**Sprint 2 — Edge Functions (6):**
- `professor-get-context` v3 con cache TTL 24h/1h
- `professor-evaluate-decision` · `professor-log-case` · `professor-submit-learning`
- `professor-approve-learning` · `professor-checkpoint`
- Cache strategy: TTL 24h (weights/veto_rules/criteria/platform_vars) · TTL 1h (casos/learnings) · real-time (bypasses)

**Sprint 3 — knowledge/ base:**
- 11 archivos: DECISION_MATRIX.md · PROFESSOR_PROTOCOL.md · CHECKPOINT_RULES.md
- 4 manuales de plataforma (Klaviyo · Judge.me · agent-browser · Shopify)
- NeuroneSCF PLATFORM_NOTES.md · 2 templates
- 5 manuales + 10 errores conocidos en Supabase

**Sprint 4 — SESSION_PROTOCOL v13:**
- Comandos Professor integrados · ecosystem scan · orden correcto cierre sesión
- **Mejora de protocolo:** Professor va ANTES de Actualiza para que session_log refleje outcomes reales

**Pendiente Sam:** `PROFESSOR_SECRET` en Supabase Dashboard → Settings → Edge Functions → Secrets

---

## SESIÓN 2026-05-17 — Sam (parte 1)

### COMPLETADO HOY

#### 1. LANGUAGE SWITCHER — Rituals & Kits + Moisture EN ✅
- `nc-page-moisture-hero.liquid` — locale check inline EN/ES
- `nc-page-moisture-caracteristicas.liquid` — locale → `sections.moisture.*`
- `nc-rituals-kits-intro.liquid` — locale → `sections.ritual_kits.*`
- `locales/en.json` — añadidos `sections.moisture` + `sections.ritual_kits`

#### 2. META PIXEL ✅ VERIFICADO
- Pixel ID: `1348252664025025` — "Neurone SCF — Web"
- Instalado en `layout/theme.liquid`
- Eventos activos: PageView · ViewContent · AddToCart · InitiateCheckout · SubscribedButtonClick
- Dominio `neuronescflorida.com` verificado vía Cloudflare TXT ✅
- Instagram → Facebook Page vinculadas ✅ · payment method añadido ✅

#### 3. CHECKOUT BRANDING ✅ (manual — Basic plan)
- Logo NSCF · Button #0076A8 · Montserrat headings · Helvetica Neue body
- `checkoutBrandingUpsert` requiere Plus — configurado manualmente en admin

#### 4. JUDGE.ME ✅ IMPLEMENTACIÓN COMPLETA
- `snippets/judgeme_widgets.liquid` v15 · dark theme
- Badge: `judgeme.badge` con strip `display:none` · sin reviews → 5 estrellas #C4622D
- Widget: `judgeme.widget` con strip `jdgm-temp-hiding-style`
- Dark theme override: `setProperty('important')` en JS

#### 5. KLAVIYO ✅ INSTALADO
- Plan Email $20/mes · Public Key `UNF8Ee` · script en `layout/theme.liquid`
- Dominio `neuronescflorida.com` verificado · DNS completo · Shopify sync activo

#### 6. KLAVIYO TEMPLATES ✅ (10 — EN + ES)

| Template | ID EN | ID ES |
|---|---|---|
| Abandoned Cart A | `X57LJu` | `Tm3JWE` |
| Abandoned Cart B | `Ws6J7R` | `QVANPy` |
| Post Purchase | `SedUug` | `UwszQw` |
| Review Request | `U2DMYK` | `S6ZDHq` |
| Welcome | `XBvyZH` | `TTrxdT` |

#### 7. KLAVIYO FLOWS — ESTRUCTURA DEFINIDA ✅
Split bilingüe: `$locale = es-US` → ES · todo lo demás → EN
**PENDIENTE:** configurar 4 flows manualmente en UI (API no permite actions)

---

## PENDIENTES ACTIVOS

- [ ] **PROFESSOR_SECRET** — Supabase Dashboard · Settings · Edge Functions · Secrets (2 min)
- [ ] **GA4** — instalar Measurement ID en theme.liquid (5 min)
- [ ] **Klaviyo flows** — 4 flows bilingüe configurar en UI
- [ ] **Klaviyo image_url** — verificar property name desde Activity Feed
- [ ] **Judge.me automations** — activar review request en Settings → Automations
- [ ] **DY Fazza** — confirmar 200ml vs 400ml con PO (KT-104)
- [ ] **EN descriptions** — bloqueadas por bug `shopify-auto-translate`
- [ ] **Shipping zones** — 3/5 pendientes
- [ ] **Kiosko** — test con embajadora real en salón

---

## NOTAS TÉCNICAS CRÍTICAS

### Judge.me
- Metafield correcto: `product.metafields.judgeme.badge` (NO `preview_badge`)
- Strip `style='display:none'` con Liquid replace antes de renderizar
- Strip `<style class='jdgm-temp-hiding-style'>` del widget
- Dark theme: `element.style.setProperty(prop, value, 'important')` — CSS no puede ganar
- Sin reviews: NO usar `data-auto-install='true'`

### Klaviyo
- Public Key: `UNF8Ee`
- DELETE/rename templates: no disponible con public key
- Flow actions: REST API no permite crearlas — solo flows vacíos
- Filtro Liquid `| money`: NO funciona en Klaviyo — usar `{{ item.price }}`
- Image URL: verificar `image_url` vs `ImageUrl` desde Activity Feed

### Meta
- Pixel ID: `1348252664025025` · dominio verificado · IG+FB vinculadas · payment ✅

### Shopify B2C Theme `192983662919`
- Locale check: `request.locale.iso_code == 'en'`
- `checkoutBrandingUpsert`: requiere Plus — no disponible en Basic

---

## PARA EL PRÓXIMO CHAT

1. PROFESSOR_SECRET + GA4 (7 min)
2. Klaviyo flows UI
3. DY Fazza decisión
4. Ayra Sprint 0

SMA: sin novedades · ETag: `W/"ab5b-ofuN2S50PKjAqtujmSW7K/E7bcI"`
