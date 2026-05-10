# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-10_

---

## SESIÓN 2026-05-10 — CRO Polish & DY Fazza Diagnosis (Sam)

### TRABAJO REALIZADO

**GH_PAT ✅ RESUELTO** — Sam regeneró en GitHub y actualizó en Vercel. Context system operativo confirmado.

**CRO Polish — 3 fixes aplicados vía tema + body_html:**

| Fix | Archivo | Descripción |
|-----|---------|-------------|
| Spacing precios | `nc-product-detail.liquid` + `nc-product-card.liquid` | `gap:12px/8px` entre precio tachado y precio real |
| Colores savings block | `body_html` 12 kits | Nombre producto + "Si compraras por separado" → `#9a9690` |
| Terra accent precio kits | `nc-product-detail.liquid` + `nc-product-card.liquid` | Precio kit en `#D4622A` en product pages Y en colección grid |

**Archivos tema modificados:**
- `sections/nc-product-detail.liquid` — gap:12px + terra + is_kit detection ✅
- `snippets/nc-product-card.liquid` — gap:8px + terra + is_kit detection ✅

**DY Fazza / Dyfensor imagen — diagnóstico:**
- Sam muestra: 2 product cards "DY FAZZA" con imagen del envase Dyfensor SF (burdeos "COLOR RESCUE")
- Causa: archivo `NLSDYLS-1-1.webp` es físicamente la imagen del Dyfensor SF, no del DY Fazza
- Afectados: DY FAZZA 200ml (`NSCF-TR-013`) · DY FAZZA 400ml (`NSCF-BTP-003`)
- **Pendiente:** Sam sube imagen correcta → se asigna vía API

---

## SESIÓN 2026-05-10 — Kit Naming, CRO Layer & Store Cleanup (Sam)

**QA Tiendas:** B2C 30 productos ✅ · B2B 73 productos ✅ · Vizos Salón B2B 64 SKUs con stock ✅

**Kit Naming CERRADO:** 12 nombres finales verificados · "Therapy" corregido · KT-103VT eliminado

**SOS variant title:** `6×25ml` → `Dyfensor Serum 25ml + Hyaloneurine F&H 50ml + Green 100 25ml` ✅

**CRO Layer 12/12:** compare_at_price + savings HTML + shipping anchor

| Kit | compare_at | Precio | OFF |
|-----|-----------|--------|-----|
| Hydra Boost | $84.98 | $64.99 | 23% |
| Moisture Recovery | $144.97 | $99.99 | 31% |
| Moisture Recovery Plus | $189.96 | $99.99 | 47% |
| Moisture & Shine | $194.96 | $109.99 | 44% |
| Restore Therapy | $144.97 | $99.99 | 31% |
| Restore Therapy Plus | $189.96 | $109.99 | 42% |
| Restore & Shield | $194.96 | $109.99 | 44% |
| Blonde Guard | $149.97 | $99.99 | 33% |
| Blonde Guard Plus | $194.96 | $109.99 | 44% |
| Perfect Blonde | $149.97 | $84.99 | 43% |
| Perfect Blonde Plus | $194.96 | $99.99 | 49% |
| S.O.S Rescue System | $334.93 | $179.99 | 46% |

**Spearheads ads:** M1 KT-101P + KT-SDUO · M2 KT-103V · M3 KT-102P · SOS M3+ PO directa

---

## SESIÓN 2026-05-10 — Kit Images Sprint (Sam)

Pipeline: Remove.bg + Affinity Photo (Drop Shadow = Layer > Layer Effects > Outer Shadow)

4/12 punta kits con imagen lista: Humit Moisture · Kerasin HB · Total Violet · Hydra Boost ✅

---

## SESIÓN 2026-05-07 — Shopify B2C Sprint 3 (Sam)

### locale_root — REGLA PERMANENTE
```liquid
{%- assign locale_root = request.locale.root_url | append: '/' | replace: '//', '/' -%}
```
**NUNCA `if blank`** — roto en producción.
Archivos: `nc-header` · `nc-footer` · `nc-collection-page` · `nc-hero`

### Geo-redirect
`Online Store → Preferences → Automatic redirection` → Country: OFF · Language: OFF

---

## MCP SHOPIFY

**Conector:** `Shopify — Unrealville Studio`
**URL:** `https://unrlvl-shopify-mcp.vercel.app/api/mcp/mcp`
**Params:** `brand_id: "NeuroneSCF"` · `store_type: "b2c"/"b2b"`

**IDs B2C:**
```
Theme:       192983662919
Domain:      neuronescflorida.com / egdk1n-gt.myshopify.com
La Ciencia:  162313175367
About:       162313142599
FAQ:         162313208135
```

**Scope faltante:** `write_legal_policies` → policies solo via Admin

**Limitaciones:** `shopify_graphql` timeout con mutations largas · Supabase.co bloqueado desde bash

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
7. **SOS variant title:** Siempre 1× — nunca 6× para evitar reclamaciones.
8. **Terra precio kits:** `#D4622A` en `nc-product-detail` y `nc-product-card` para `RITUALS & KITS`.
9. **DY Fazza imagen:** `NLSDYLS-1-1.webp` es la imagen del Dyfensor SF — reemplazar en NSCF-TR-013 y NSCF-BTP-003.

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
- [ ] **EN translations** La Ciencia + About
- [ ] **Proxy shopify-auto-translate**
- [ ] **Resplander Shine** — NSCF-ST-006 B2B → B2C (desbloquea KT-101T)

### MEDIUM
- [ ] B2B SEO-003 COLOR titles
- [ ] accounts DNS → CNAME shops.myshopify.com
- [ ] Desinstalar Translate & Adapt

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C · Audit v16.1 · Fix v15 · Compliance v2 · SP 42/42 · Kit Naming ✅ · CRO Layer ✅ · CRO Polish ✅ · Collections 7/7 · SEO titles 37/42

Social: Meta BM ✅ · FB ✅ · IG ✅ · TikTok ✅ · WABA ⏳ · IG→FB ❌

---
_Inicio próximo chat: "Hola Sam. DY Fazza imagen pendiente — sube la foto correcta y la asigno. Shopify Bundles por instalar. 8 kit images pendientes."_
