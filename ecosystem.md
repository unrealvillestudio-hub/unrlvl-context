# UNRLVL Ecosystem — Estado General
_Actualizado: 2026-05-07-v2 | Mantenido por Claude_

---

## Studio

**Unrealville Studio** · Florida USA + LATAM · `unrealvillestudio.com` LIVE EN+ES
Tagline: "Not for everyone." · HQ: 12951 Biscayne Blvd · North Miami, FL 33181

---

## Marcas Activas

### NeuroneSCF — Neurone South & Central Florida 🟡
**Dominio:** neuronescflorida.com | **Mercado:** South & Central Florida

**B2C** `egdk1n-gt.myshopify.com` — Score: 137/200
- Theme i18n R4: ✅ **locale_root FIXED** (2026-05-07) — regla permanente: `append | replace`
- Pages: La Ciencia ✅ · About ✅ · FAQ ✅ · Contacto ⚠️ (verificar)
- Legal: Privacy ✅ · Refund ⚠️ (dirección placeholder) · TOS ⚠️ (placeholders) · Shipping ❌ MISSING
- Geo-redirect: DISABLED ✅
- Translate & Adapt: instalada pero inútil, desinstalar
- EF shopify-auto-translate v1: ACTIVE (proxy route pendiente)
- SP fix 3 productos: pendiente (proxy)
- SEO descriptions: 29/42 missing
- Tracking: 0/10 — sin pixels
- Payment: ❌ Patricia pendiente

**B2B** `nj5ybc-n1.myshopify.com` — Score: 133/160
- Pending: SEO-003 COLOR titles fix

### Otras Marcas
- **Diamond Details** 🟢 Alicante
- **Vizos Cosmetics** 🟢 Miami + España
- **D7 Herbal** 🟢 Alicante
- **Vivose Mask** 🟡 España
- **Patricia Osorio** (Personal · Comunidad · Vizos Salon · Conectando) 🟢 Miami

---

## Reglas Críticas NeuroneSCF Shopify

### locale_root — REGLA PERMANENTE
```liquid
{%- assign locale_root = request.locale.root_url | append: '/' | replace: '//', '/' -%}
```
**NUNCA** usar `if request.locale.root_url == blank` — roto en producción.

### Legal Pages — API Limitation
`write_legal_policies` scope NO está en el OAuth token. Todas las políticas = actualizar manualmente en `Online Store → Legal` en Shopify Admin.

### Content Pipeline — OBLIGATORIO
WRITE → H+AIFE → PSYCHO → CRO/SEO → QA para todo contenido público.

---

## Infraestructura

| Sistema | Estado |
|---------|--------|
| Context System | LIVE — unrlvl-context.vercel.app |
| Supabase | ACTIVE — amlvyycfepwhiindxgzw |
| unrlvl-tools | LIVE — ShopifyAuditor v3.5 |
| unrealvillestudio.com | LIVE EN+ES |
| luciensael.com | ⏳ Generated, pending deploy |

---

## Edge Functions (Supabase amlvyycfepwhiindxgzw)

| EF | Version | Status | Notas |
|----|---------|--------|-------|
| shopify-audit | v16.1 | ✅ | 23 módulos |
| shopify-fix | v15 | ✅ | Post-write verification |
| shopify-auto-translate | v1 | ✅ | NEW 2026-05-07. Proxy route PENDING |
| sp-fix-targeted | v1 | ✅ | Proxy route PENDING |
| shopify-theme-locale | v21 | ✅ | |
| seo-audit-check | v1 | ✅ | |
| sp-reader-full | v2 | ✅ | |

---

## Agenda Próxima Sesión

1. **P0 MANUAL:** Shipping Policy (crear) + TOS (fix) + Refund (dirección) — Sam en Admin
2. **P1:** EN translations Science + About
3. **P2:** Proxy route shopify-auto-translate
4. **P3:** SP fix proxy (3 productos)
5. **P4:** SEO descriptions 29/42
6. **P5:** Payment gateway (Patricia)
7. **P6:** Tracking pixels
