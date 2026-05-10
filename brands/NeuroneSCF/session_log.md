# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-10_

---

## SESIÓN 2026-05-10 — Kit Naming, CRO Layer & Store Cleanup (Sam)

### OBJETIVO
Cerrar nomenclatura definitiva de kits, aplicar capa CRO de ahorros en toda la tienda B2C, y limpiar productos obsoletos.

### TRABAJO REALIZADO

**QA Tiendas — segundo barrido completo:**
- B2C: 30 productos NSCF activos · 100% con descripción, categoría, imagen, precio ✅
- B2B/PRO: 73 productos activos · 100% completos ✅
- Vizos Salón B2C: confirmado `not stocked` (correcto — stock físico son muestras 50ml, fuera de Shopify)
- Vizos Salón B2B: 64 SKUs con stock asignado ✅
- Inventario Shopify taxonomy: IDs corregidos a `hb-3-10-X` válidos

**Kit Naming — CERRADO:**
- 12 nombres finales verificados contra imagen de Patricia/Laura ✅
- Todos coinciden: composición ✅ · precios ✅
- Typo "TERAPY" corregido a "Therapy" en todos los kits
- Hydra Boost: `product_type` → RITUALS & KITS · `inventory_policy` → continue ✅

**Limpieza de catálogo:**
- ❌ `Perfect Blonde + Definition` (NSCF-KT-103VT) — ELIMINADO de tienda B2C. Lycra Web sin stock en B2C, fuera de nomenclatura oficial.

**SOS Rescue System — corrección variant title:**
- Anterior: `Dyfensor Serum 6×25ml + Hyaloneurine F&H 6×50ml + Green 100 4×25ml` (INCORRECTO — cliente podría reclamar 6 unidades)
- Corregido: `Dyfensor Serum 25ml + Hyaloneurine F&H 50ml + Green 100 25ml` ✅

**CRO Layer — 3 capas aplicadas en los 12 kits B2C:**

| Capa | Qué hace | Estado |
|------|---------|--------|
| `compare_at_price` nativo Shopify | Precio tachado en collections, product pages, ads Meta/Google | ✅ 12/12 |
| HTML savings block en `body_html` | Desglose componente por componente + ahorro en $ y % | ✅ 12/12 |
| Shipping anchor | "Ahorras $X — envío gratis incluido" | ✅ 12/12 |

**Ahorros aplicados por kit:**

| Kit | compare_at | Kit | OFF | Ahorro |
|-----|-----------|-----|-----|--------|
| Hydra Boost | $84.98 | $64.99 | 23% | $19.99 |
| Moisture Recovery | $144.97 | $99.99 | 31% | $44.98 |
| Moisture Recovery Plus | $189.96 | $99.99 | 47% | $89.97 |
| Moisture & Shine | $194.96 | $109.99 | 44% | $84.97 |
| Restore Therapy | $144.97 | $99.99 | 31% | $44.98 |
| Restore Therapy Plus | $189.96 | $109.99 | 42% | $79.97 |
| Restore & Shield | $194.96 | $109.99 | 44% | $84.97 |
| Blonde Guard | $149.97 | $99.99 | 33% | $49.98 |
| Blonde Guard Plus | $194.96 | $109.99 | 44% | $84.97 |
| Perfect Blonde | $149.97 | $84.99 | 43% | $64.98 |
| Perfect Blonde Plus | $194.96 | $99.99 | 49% | $94.97 |
| S.O.S Rescue System | $334.93 | $179.99 | 46% | $154.94 |

**Estrategia de kits — decisiones tomadas:**
- 4 puntas de lanza para ads: Moisture Recovery Plus · Hydra Boost · Perfect Blonde · Restore Therapy Plus
- Secuencia: M1 (101P + SDUO) → M2 (103V) → M3 (102P)
- SOS: en tienda, activación controlada desde M3+ por PO directa, NO en ads
- Shopify Bundles (nativa, gratis) recomendada para descuento automático de inventario por componente

**GitHub PAT — URGENTE:**
- Token `GH_PAT` @unrealvillestudio-hub expira **HOY (2026-05-11)**
- Regenerar en GitHub → pegar en **Vercel → unrlvl-context → Settings → Environment Variables → GH_PAT → Edit → Redeploy**
- No se auto-actualiza

**Issue pendiente — DY Fazza/Dyfensor imagen:**
- Sam reporta productos "DY Fazza" con imagen de Dyfensor
- API B2C muestra DY Fazza con imagen correcta `NLSDYLS-1-1.webp` en todos los casos
- Pendiente: Sam confirma SKU/handle exacto donde ve el error

### PENDIENTES DE ESTA SESIÓN
- [ ] **GH_PAT URGENTE** — regenerar y actualizar en Vercel HOY
- [ ] DY Fazza imagen — confirmar SKU exacto con Sam
- [ ] Subir imágenes a kits sin imagen (8 restantes)
- [ ] Shopify Bundles — instalar y configurar composición de kits

---

## SESIÓN 2026-05-10 — Kit Images Sprint (Sam)

### OBJETIVO
Resolver el bloqueante CAT-002: 12 kits sin imágenes en Shopify B2C.

### TRABAJO REALIZADO

**Revisión de product shots:**
- Sam subió 9 imágenes de los 4 kits punta
- Diagnóstico: fondo lightbox visible, ángulo imperfecto, sombras duras
- Kit blanco (Hyaloneurine + Dyfensor): riesgo de extracción por botellas translúcidas
- Imágenes 8 y 9 eran duplicadas (revisión pendiente con Patricia)

**Pipeline adoptado: Remove.bg + Affinity Photo**
- Se descartó Canva (sin suscripción), Gemini (no trabaja con productos reales), fal.ai (curva técnica)
- Remove.bg para extracción de fondo → Affinity para composición
- Drop Shadow en Affinity: Layer > Layer Effects > Outer Shadow (no "Blending Options" como Photoshop)

**Estado imágenes procesadas:**

| Kit | Archivo | Estado | Listo |
|-----|---------|--------|-------|
| Humit Moisture (azul) | 5.webp → procesar | ✅ Remove.bg OK | LISTO |
| Kerasin HB Restore (cobre) | 3.webp | ✅ Extracción limpia | LISTO |
| Total Violet (burdeos+azul+cobre) | procesar | ✅ Buena base | LISTO |
| Hyaloneurine + Dyfensor (blanco) | 5.webp final | ✅ Sorprendentemente bien | LISTO |

**Resultado:** 4 de 12 kits punta tienen imagen lista para subir a Shopify. CAT-002 parcialmente resuelto.

### PENDIENTES DE ESTA SESIÓN
- [ ] Subir 4 imágenes a Shopify (productos: nombres exactos pendientes de confirmar)
- [ ] Alt texts SEO (pendiente nombres exactos de kits en Shopify)
- [ ] 8 kits restantes: imágenes pendientes

---

## SESIÓN 2026-05-07 — Shopify B2C Sprint 3 (Sam)

### FIX CRÍTICO #1: locale_root — ROOT CAUSE Y REGLA PERMANENTE

**Síntoma:** Todos los links del site ES generaban URLs sin dominio ni slash (`collections/ritual-kits` → DNS error en browser).

**Causa raíz confirmada:** El método `if request.locale.root_url == blank` falla en producción para la locale primaria ES de Shopify. El valor retornado no pasa el check aunque en teoría debería.

**Regla permanente — SIEMPRE usar este método en los 4 archivos:**
```liquid
{%- assign locale_root = request.locale.root_url | append: '/' | replace: '//', '/' -%}
```
Para ES (nil/blank): `nil | append: '/' = '/'` → `replace '//' = '/'` ✅
Para EN (`/en`): `'/en' | append: '/' = '/en/'` ✅

**NUNCA usar `if blank` para locale_root** — roto en producción.

**Archivos donde vive este código:**
- `sections/nc-header.liquid` ✅
- `sections/nc-footer.liquid` ✅
- `sections/nc-collection-page.liquid` ✅
- `sections/nc-hero.liquid` ✅

---

### FIX CRÍTICO #2: Geo-redirect desactivado
- `Online Store → Preferences → Automatic redirection`
- Country/region: **OFF** ✅ | Language: **OFF** ✅
- Causaba: DNS errors + "blocked" en HOME/logo

---

### FIX #3: Hero CTA buttons
`default` filter encadenado fallaba con URL-type settings vacíos. Fix: variable intermedia + if blank explícito post locale_root.

---

## MCP SHOPIFY — DOCUMENTACIÓN COMPLETA

### Conector activo
**Nombre:** `Shopify — Unrealville Studio`
**URL MCP:** `https://unrlvl-shopify-mcp.vercel.app/api/mcp/mcp`
**Autenticación:** El MCP autentica vía Supabase `shopify.stores` — lee `shop_domain` y `access_token` por `brand_id` + `store_type` + `active: true`

### Parámetros estándar (SIEMPRE requeridos)
```
brand_id:   "NeuroneSCF"
store_type: "b2c" o "b2b"
```

### Herramientas disponibles
| Tool | Uso | Parámetros clave |
|------|-----|-----------------|
| `shopify_get` | REST GET | `path` (ej: `themes/192983662919/assets.json?asset[key]=...`) |
| `shopify_put` | REST PUT | `path`, `body` (JSON object) |
| `shopify_post` | REST POST | `path`, `body` |
| `shopify_delete` | REST DELETE | `path` |
| `shopify_graphql` | GraphQL | `query`, `variables` (opcional) |
| `shopify_get_store_info` | Info + brand_context | — |
| `list_brands` | Lista tiendas conectadas | — |

### Identificadores clave NeuroneSCF B2C
```
Theme ID live:        192983662919   (Neurone Custom Theme v1.0 — MAIN)
Shop domain:          neuronescflorida.com
myShopify domain:     egdk1n-gt.myshopify.com
Primary locale:       es
Secondary locale:     en (path: /en/)
Locale root ES:       "" (nil) → locale_root = "/"
Locale root EN:       "/en" → locale_root = "/en/"
```

### IDs de páginas importantes
```
La Ciencia:  id=162313175367  handle=la-ciencia
About:       id=162313142599  handle=about
FAQ:         id=162313208135  handle=faq
```

### Scopes OAuth del token actual
✅ `read_apps`
✅ `read_locales`
✅ `write_translations`
✅ `read_themes` / `write_themes`
✅ `read_products` / `write_products`
✅ `read_content` / `write_content`
❌ **`write_legal_policies` — FALTANTE** → no puede actualizar TOS/Privacy/Refund/Shipping via API

### Limitaciones conocidas del MCP
1. **`shopify_graphql` "No approval received":** Ocurre con algunas mutaciones complejas — workaround: queries más simples, o variables separadas.
2. **`write_legal_policies` scope missing:** Requiere reinstalación del OAuth. Sin él, `shopPolicyUpdate` retorna `ACCESS_DENIED`.
3. **Supabase.co bloqueado desde bash:** El egress proxy no permite llamadas a `*.supabase.co`. Usar `Supabase:execute_sql` para queries DB, o Vercel proxy para EFs.
4. **`markets` field:** Requiere scope adicional — retorna `ACCESS_DENIED`.

---

## CONTENIDO PUBLICADO (2026-05-07)

**La Ciencia (ES)** — ID: 162313175367 | handle: `la-ciencia`
- Pipeline completo: PSY-AUTHORITY + PSY-TRUST + PSY-ASPIRATION
- Hero: "Los productos que actúan solo en superficie no duran tres semanas."
- ⚠️ EN translation pendiente

**About (ES)** — ID: 162313142599 | handle: `about`
- Título: "Neurone South & Central Florida"
- Pipeline: PSY-TRUST + PSY-SOCIAL-PROOF + PSY-IDENTITY
- ⚠️ EN translation pendiente

**FAQ** — ID: 162313208135 | handle: `faq` | título: "Preguntas Frecuentes"
- 15 preguntas · 5 categorías · Pipeline completo

---

## EF DEPLOYADA: shopify-auto-translate v1
- Supabase: `amlvyycfepwhiindxgzw` | slug: `shopify-auto-translate` | verify_jwt: false
- ⚠️ NO callable desde bash (egress proxy bloquea supabase.co)
- ⚠️ Necesita Vercel proxy route en unrlvl-tools.vercel.app/api/

---

## DIAGNÓSTICO LEGAL PAGES
| Policy | Estado | Acción |
|--------|--------|--------|
| Privacy Policy | ✅ completa | — |
| Refund Policy | ⚠️ placeholder dirección | Admin: `1303 N 46th Ave, Hollywood FL 33021` |
| Terms of Service | ⚠️ `[EMPRENDEDOR]` `[ENLACE]` "Prestige Beauty" | Admin: texto limpio disponible |
| Shipping Policy | ❌ NO EXISTE (footer → 404) | Admin: crear |

**API LIMITATION:** scope `write_legal_policies` no en OAuth → solo Admin (Online Store → Legal)

---

## APRENDIZAJES PERMANENTES

1. **locale_root:** `append | replace` es el único método confiable en producción Shopify. `if blank` falla silenciosamente.
2. **Policies API:** `write_legal_policies` es scope separado no incluido en OAuth estándar. Legal = manual en Admin.
3. **shopify-auto-translate EF:** Deployada y funcional pero solo callable via Vercel proxy. Proxy route en unrlvl-tools PENDIENTE.
4. **Geo-redirect:** Está en `Online Store → Preferences` — NO en Markets, NO en Translate & Adapt app.
5. **Content Pipeline:** OBLIGATORIO para todo contenido público. PSY combos según tipo de página.
6. **shopify_graphql "No approval received":** Timeout del MCP con mutations complejas o HTML largo.
7. **Hero CTA URLs:** El `default` filter de Liquid encadenado falla con URL-type settings vacíos.
8. **Translate & Adapt:** Sin app embeds. Cualquier redirect viene de Shopify nativo.
9. **Kit images:** Remove.bg + Affinity Photo es el pipeline adoptado. Drop Shadow en Affinity = Layer > Layer Effects > Outer Shadow.
10. **CRO compare_at_price:** Shopify acepta `deny` o `continue` (no `ALLOW`) en inventory_policy. compare_at_price = suma de precios individuales de cada componente.
11. **SOS variant title:** Siempre expresar cantidades como "1 unidad" (25ml / 50ml), nunca como "6×25ml" — el cliente podría exigir 6 unidades.

---

## PENDIENTES ACTIVOS

### CRÍTICO HOY
- [ ] **GH_PAT — expira 2026-05-11** → Regenerar en GitHub → Vercel unrlvl-context → Settings → Env → GH_PAT → Edit → Redeploy

### BLOCKING
- [ ] **Shipping Policy** — crear en Admin. Texto disponible bajo petición.
- [ ] **TOS** — fix placeholders en Admin. Texto limpio disponible.
- [ ] **Refund Policy** — reemplazar dirección en Admin.
- [ ] **Payment gateway** — Patricia configura Shopify Payments.
- [ ] **Precios $0.00** — ~20 variantes.

### HIGH
- [ ] **Shopify Bundles** — instalar (App Store, gratis) + configurar composición de los 12 kits
- [ ] **8 kit images restantes** — imágenes pendientes
- [ ] **DY Fazza imagen** — Sam confirma SKU donde ve imagen de Dyfensor
- [ ] **EN translations** Science + About
- [ ] **Proxy route shopify-auto-translate**
- [ ] **SP fix 3 productos** — proxy route pending (DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery)
- [ ] **SEO descriptions** — 29/42 (fixer v13)
- [ ] **Tracking pixels** — Meta + TikTok + Google
- [ ] **Resplander Shine** — traspasar NSCF-ST-006 de B2B a B2C para desbloquear Moisture & Shine (KT-101T)

### MEDIUM
- [ ] Desinstalar Translate & Adapt
- [ ] `accounts.neuronescflorida.com` Invalid DNS → CNAME: `shops.myshopify.com`
- [ ] Product descriptions ES — decisión pendiente
- [ ] B2B SEO-003 COLOR titles

---

## HISTORIAL PREVIO

### Infraestructura completada
- OAuth B2B + B2C: CONNECTED · shopify-audit v16.1 · shopify-fix v15: ACTIVE
- Compliance Engine v2: ACTIVE (anti-caída + CAPISSEN aplicados)
- Social Proof 42/42 ES+EN (3 pendiente fix)
- Kit Naming: CERRADO 2026-05-10 ✅
- CRO Layer (compare_at + savings HTML): COMPLETO 12/12 ✅
- Collections: 7/7 · SEO titles: 37/42

### Social Media (Laura/PO)
- Meta BM ✅ · FB Page ✅ · Instagram ✅ @neuronescflorida · TikTok ✅ @neuronescflorida
- WABA ⏳ Patricia Step 1 · IG→FB link ❌ · Domain verification Meta ❌

---
_Mensaje inicio próximo chat: "Hola Sam. Protocolo cargado. URGENTE: GH_PAT expira hoy — regenerar y actualizar en Vercel antes de arrancar. Kits con CRO layer completo (12/12). Pendiente: Shopify Bundles, 8 kit images, DY Fazza imagen confirmar."_
