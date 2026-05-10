# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-10_

---

## SESIÓN 2026-05-10 — About Page Corrections ES+EN + MCP Shopify documentado (Sam)

### TRABAJO REALIZADO

**Correcciones página About** (`/pages/about` · ID 162313142599) — 4 errores eliminados:

| # | Versión | Error | Fix | Estado |
|---|---------|-------|-----|--------|
| 1 | ES | "Técnica en Química para el Cabello" | "formación técnica en colorimetría y tratamiento capilar" | ✅ |
| 2 | EN | "first in Venezuela, then in Miami" | "across Colombia, Panamá, the United States and Europe" | ✅ |
| 3 | EN | "Patricia's real laboratory" (Vizos Salón) | "where Patricia knows every formula..." | ✅ |
| 4 | EN | "chemistry manual" | "manual" | ✅ |

**Método:** Edge function `nscf-about-fix` v2 (Supabase · `amlvyycfepwhiindxgzw`)
- v1: fix ES via REST PUT ✅ · EN falló por encoding Unicode
- v2: fix EN con caracteres exactos U+2019 (`'`) y U+201C (`"`) → ✅ 200 · changed: true · 0 userErrors

**Fuente de verdad:** `vizoscosmetics.com`. Patricia = instructora internacional de colorimetría. Nunca química. Nunca Venezuela. Origen: Cali, Colombia. Expansión técnica desde Panamá.

**MCP Shopify documentado en ecosystem:**
- `INFRA-SHOPIFY-MCP` añadido a `infrastructure` en `ecosystem.json` — nivel studio, multimarca
- `brand.json` NeuroneSCF: solo IDs de tienda (theme_id, page_ids) — la URL del conector vive en infraestructura
- El MCP ya no vive únicamente en el session_log

---

## SESIÓN 2026-05-10 — CRO Polish & DY Fazza Diagnosis (Sam)

**GH_PAT ✅ RESUELTO** — Sam regeneró en GitHub y actualizó en Vercel.

**CRO Polish — 3 fixes aplicados:**

| Fix | Archivo | Descripción |
|-----|---------|-------------|
| Spacing precios | `nc-product-detail.liquid` + `nc-product-card.liquid` | `gap:12px/8px` entre precio tachado y precio real |
| Colores savings block | `body_html` 12 kits | Nombre producto + "Si compraras por separado" → `#9a9690` |
| Terra accent precio kits | `nc-product-detail.liquid` + `nc-product-card.liquid` | Precio kit en `#D4622A` en product pages Y colección grid |

**DY Fazza imagen — diagnóstico:**
- `NLSDYLS-1-1.webp` es físicamente la imagen del Dyfensor SF, no del DY Fazza
- Afectados: DY FAZZA 200ml (`NSCF-TR-013`) · DY FAZZA 400ml (`NSCF-BTP-003`)
- **Pendiente:** Sam sube imagen correcta → se asigna vía API

---

## SESIÓN 2026-05-10 — Kit Naming, CRO Layer & Store Cleanup (Sam)

**QA Tiendas:** B2C 30 productos ✅ · B2B 73 productos ✅ · Vizos Salón B2B 64 SKUs con stock ✅

**Kit Naming CERRADO:** 12 nombres finales verificados

**SOS variant title:** `Dyfensor Serum 25ml + Hyaloneurine F&H 50ml + Green 100 25ml` ✅

**CRO Layer 12/12:** compare_at_price + savings HTML + shipping anchor — todos aplicados.

**Spearheads ads:** M1 KT-101P + KT-SDUO · M2 KT-103V · M3 KT-102P · SOS M3+ PO directa

---

## SESIÓN 2026-05-10 — Kit Images Sprint (Sam)

Pipeline: Remove.bg + Affinity Photo (Drop Shadow = Layer > Layer Effects > Outer Shadow)

4/12 punta kits listos: Humit Moisture · Kerasin HB · Total Violet · Hydra Boost ✅

---

## SESIÓN 2026-05-07 — Shopify B2C Sprint 3 (Sam)

**locale_root — REGLA PERMANENTE:**
```liquid
{%- assign locale_root = request.locale.root_url | append: '/' | replace: '//', '/' -%}
```
**NUNCA `if blank`** — roto en producción. Archivos: `nc-header` · `nc-footer` · `nc-collection-page` · `nc-hero`

**Geo-redirect:** `Online Store → Preferences → Automatic redirection` → Country: OFF · Language: OFF

---

## REFERENCIA TÉCNICA

**MCP Shopify:** Ver `INFRA-SHOPIFY-MCP` en `ecosystem.json → infrastructure`
- URL: `https://unrlvl-shopify-mcp.vercel.app/api/mcp/mcp`
- Connector: `Shopify — Unrealville Studio`
- Multimarca · brand_id + store_type requeridos

**IDs B2C (en brand.json):**
```
Theme:       192983662919
Domain:      neuronescflorida.com / egdk1n-gt.myshopify.com
About:       162313142599
La Ciencia:  162313175367
FAQ:         162313208135
Contacto:    162313273671
```

**Scope faltante:** `write_legal_policies` → policies solo via Admin

**EF patrón correcciones page:** `nscf-about-fix` v2 · Unicode encoding crítico (U+2019, U+201C)

---

## LEGAL PAGES

| Policy | Estado | Acción |
|--------|--------|--------|
| Privacy Policy | ✅ | — |
| Refund Policy | ⚠️ placeholder | Admin: `1303 N 46th Ave, Hollywood FL 33021` |
| Terms of Service | ⚠️ placeholders | Admin: texto limpio disponible |
| Shipping Policy | ❌ NO EXISTE | Admin: crear |

---

## APRENDIZAJES PERMANENTES

1. **locale_root:** `append | replace` único método fiable. `if blank` falla.
2. **Policies API:** `write_legal_policies` scope separado → solo Admin.
3. **shopify-auto-translate:** Deployada · solo via Vercel proxy (pendiente).
4. **Geo-redirect:** `Online Store → Preferences` — no en Markets.
5. **Kit images:** Remove.bg + Affinity. Drop Shadow = Layer > Layer Effects > Outer Shadow.
6. **CRO inventory_policy:** Shopify acepta `deny` o `continue` (no `ALLOW`).
7. **SOS variant title:** Siempre 1× — nunca 6×.
8. **Terra precio kits:** `#D4622A` en `nc-product-detail` y `nc-product-card` para `RITUALS & KITS`.
9. **DY Fazza imagen:** `NLSDYLS-1-1.webp` es Dyfensor SF — reemplazar en NSCF-TR-013 y NSCF-BTP-003.
10. **Page corrections Unicode:** caracteres exactos del body real. U+2019 (`'`), U+201C (`"`). EF `nscf-about-fix` como patrón.
11. **Patricia Osorio:** instructora internacional de colorimetría. Nunca química. Nunca Venezuela. Origen Cali, Colombia. Expansión desde Panamá.
12. **MCP Shopify:** infraestructura de studio, multimarca. Vive en `INFRA-SHOPIFY-MCP`. IDs específicos de tienda en `brand.json`.

---

## PENDIENTES ACTIVOS

### BLOCKING
- [ ] Shipping Policy — crear en Admin
- [ ] TOS — fix placeholders Admin
- [ ] Refund Policy — dirección Admin
- [ ] Payment gateway — Patricia (Shopify Payments)
- [ ] Precios $0.00 — ~20 variantes

### HIGH
- [ ] **DY Fazza imagen** — Sam sube foto correcta → API asigna (NSCF-TR-013 + NSCF-BTP-003)
- [ ] **Shopify Bundles** — instalar + configurar 12 kits
- [ ] **8 kit images** — pendientes
- [ ] **SP fix** — proxy route (DY FAZZA · Hydra Boost Duo · Deep Moisture Recovery)
- [ ] **SEO descriptions** — 29/42 (fixer v13)
- [ ] **Tracking** — Meta + TikTok + Google pixels
- [ ] **EN translation La Ciencia** (About ✅)
- [ ] **Proxy shopify-auto-translate**
- [ ] **Resplander Shine** — NSCF-ST-006 B2B → B2C (desbloquea KT-101T)

### MEDIUM
- [ ] B2B SEO-003 COLOR titles
- [ ] accounts DNS → CNAME shops.myshopify.com
- [ ] Desinstalar Translate & Adapt

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C · Audit v16.1 · Fix v15 · Compliance v2 · SP 42/42 · Kit Naming ✅ · CRO Layer ✅ · CRO Polish ✅ · Collections 7/7 · SEO titles 37/42 · **About page corrections ES+EN ✅** · **MCP Shopify documentado en ecosystem ✅**

Social: Meta BM ✅ · FB ✅ · IG ✅ · TikTok ✅ · WABA ⏳ · IG→FB ❌

---
_Inicio próximo chat: "Hola Sam. DY Fazza imagen pendiente — sube la foto correcta y la asigno. Shopify Bundles por instalar. 8 kit images pendientes. La Ciencia EN translation pendiente."_
