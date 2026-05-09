# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-10_

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

### Rutas REST más usadas (NeuroneSCF B2C)
```
# Páginas
pages/{page_id}.json
pages.json

# Tema
themes/192983662919/assets.json?asset[key]=sections/nc-header.liquid
themes/192983662919/assets.json   (PUT para escribir)

# Productos
products/{id}.json
products.json?limit=250

# Colecciones
collections/{id}.json
collections.json

# Políticas (GET funciona, PUT NO — scope write_legal_policies missing)
policies.json

# Shop info
shop.json?fields=primary_locale,domain
```

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

### GraphQL mutations que funcionan
```graphql
# Translations (funciona con payloads pequeños)
mutation {
  translationsRegister(resourceId: "gid://shopify/...", translations: [...]) {
    userErrors { field message }
    translations { key locale value }
  }
}

# Translatable content (funciona)
{ translatableResource(resourceId: "gid://shopify/Page/162313175367") {
    translatableContent { key value digest }
} }

# Collections (funciona)
mutation {
  collectionCreate(input: { title: "..." }) {
    collection { id }
    userErrors { field message }
  }
}
```

### GraphQL mutations que fallan o requieren cuidado
```
shopPolicyUpdate → ACCESS_DENIED (write_legal_policies missing)
markets → ACCESS_DENIED (markets scope missing)
translationsRegister con HTML largo → "No approval received" (timeout)
```

### Patrones para escribir assets del tema
```python
# PUT para tema — siempre usar esta estructura:
shopify_put(
  brand_id="NeuroneSCF",
  store_type="b2c",
  path="themes/192983662919/assets.json",
  body={"asset": {"key": "sections/nc-header.liquid", "value": "...liquid content..."}}
)
```

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

---

## PENDIENTES ACTIVOS

### BLOCKING
- [ ] **Shipping Policy** — crear en Admin. Texto disponible bajo petición.
- [ ] **TOS** — fix placeholders en Admin. Texto limpio disponible.
- [ ] **Refund Policy** — reemplazar dirección en Admin.
- [ ] **Payment gateway** — Patricia configura Shopify Payments.
- [ ] **Precios $0.00** — ~20 variantes.

### HIGH
- [ ] **Subir 4 kit images** a Shopify (punta kits listos)
- [ ] **Alt texts** para los 4 kits (pendiente nombres exactos)
- [ ] **8 kits restantes** — imágenes pendientes
- [ ] **EN translations** Science + About
- [ ] **Proxy route shopify-auto-translate**
- [ ] **SP fix 3 productos** — proxy route pending (DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery)
- [ ] **SEO descriptions** — 29/42 (fixer v13)
- [ ] **Tracking pixels** — Meta + TikTok + Google

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
- Kit Naming: CERRADO 2026-05-07
- Collections: 7/7 · SEO titles: 37/42

### Social Media (Laura/PO)
- Meta BM ✅ · FB Page ✅ · Instagram ✅ @neuronescflorida · TikTok ✅ @neuronescflorida
- WABA ⏳ Patricia Step 1 · IG→FB link ❌ · Domain verification Meta ❌

---
_Mensaje inicio próximo chat: "Hola Sam. Protocolo cargado. 4 kit images listas para subir — dame los nombres exactos de los productos en Shopify y generamos alt texts + subimos. Tenemos también 3 páginas legales bloqueantes y el SP fix proxy pendiente."_
