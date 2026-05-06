# SHOPIFY ARCHITECTURE — NeuroneSCF
# Cómo Claude lee, escribe y ejecuta en Shopify
_Documento crítico para cualquier Claude que trabaje en este proyecto_
_Última actualización: 2026-05-07_

---

## RESUMEN EN UNA LÍNEA

Claude **nunca llama directamente a Shopify**. Todo pasa por una cadena:
```
Claude → Vercel proxy → Supabase Edge Function → Shopify API
```

---

## LA CADENA COMPLETA

```
┌─────────┐     ┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│  Claude │────▶│  Vercel fix-proxy    │────▶│  Supabase EF         │────▶│  Shopify API     │
│         │     │  (unrlvl-tools)      │     │  (shopify-fix etc)   │     │  egdk1n-gt...    │
└─────────┘     └──────────────────────┘     └──────────────────────┘     └──────────────────┘
     ▲                                                  │
     │                                                  │ lee credenciales
     │                                          ┌───────▼──────────┐
     └──────────────────────────────────────────│  Supabase DB     │
              (respuesta JSON)                  │  (tiendas +      │
                                                │   brand_context) │
                                                └──────────────────┘
```

---

## CAPA 1: VERCEL PROXY

**URL base:** `https://unrlvl-tools.vercel.app`

### Fix proxy
```
GET https://unrlvl-tools.vercel.app/api/fix-proxy
  ?brand_id=NeuroneSCF
  &store_type=b2c          ← b2c o b2b
  &fix_type=sp_scan        ← qué operación ejecutar
```

**Función:** Recibe la petición de Claude, la reenvía al EF correcto en Supabase.
**Límite crítico:** Vercel tiene **25 segundos** de timeout hard. Para operaciones Claude que tardan más, shopify-fix delega a EFs dedicados con `AbortSignal.timeout(55000)`.

### Audit proxy
```
GET https://unrlvl-tools.vercel.app/api/audit-proxy
  ?brand_id=NeuroneSCF
  &store_type=b2c
```

**Función:** Llama a shopify-audit EF y devuelve el resultado completo.

### Tool Vercel
**SIEMPRE usar `Vercel:web_fetch_vercel_url`** para estas URLs — no `web_fetch` normal. Las URLs de Vercel requieren autenticación que solo resuelve este tool.

---

## CAPA 2: SUPABASE (proyecto amlvyycfepwhiindxgzw)

### RPC para obtener credenciales de tienda
```typescript
// Obtiene shop_domain + access_token + store_id
const { data: rows } = await sb.rpc('get_shopify_store', {
  p_brand_id: 'NeuroneSCF',
  p_store_type: 'b2c'   // o 'b2b'
});
const shop = rows[0].shop_domain;   // egdk1n-gt.myshopify.com
const tok  = rows[0].access_token;  // shpat_...
const store_id = rows[0].id;

// Obtiene además brand_context + shop_name
const { data: ctxRows } = await sb.rpc('get_shopify_store_full', {
  p_brand_id: 'NeuroneSCF',
  p_store_type: 'b2c'
});
const brandCtx = ctxRows[0].brand_context;  // JSON con keywords, category, market...
const shopName = ctxRows[0].shop_name;
```

### brand_context (lo que contiene)
```json
{
  "category": "professional hair cosmetics",
  "buyer_type": "b2c",
  "market": "South & Central Florida",
  "keywords": [
    "keratin hair treatment",
    "professional hair care",
    "frizz control hair products",
    "hair repair treatment",
    "neurone cosmetics",
    "hair straightening products",
    "salon quality hair care at home"
  ],
  "product_category": "cosmetics",
  "brand_voice": "aspirational"
}
```

### Tiendas registradas
| brand_id | store_type | shop_domain |
|---|---|---|
| NeuroneSCF | b2c | egdk1n-gt.myshopify.com |
| NeuroneSCF | b2b | (B2B store — separada) |

### Snapshots de tema
```typescript
// Antes de modificar theme.liquid, siempre hacer snapshot
await sb.rpc('save_theme_snapshot', {
  p_store_id: store_id,
  p_brand_id: 'NeuroneSCF',
  p_theme_id: String(themeId),
  p_asset_key: 'layout/theme.liquid',
  p_content_before: content.slice(0, 50000)
});
```

---

## CAPA 3: SHOPIFY API

### REST API
```typescript
const API = '2025-01';  // versión activa

// GET
const r = await fetch(`https://${shop}/admin/api/${API}/products.json?limit=250`, {
  headers: { 'X-Shopify-Access-Token': tok },
  signal: AbortSignal.timeout(15000)
});

// PUT (actualizar)
const r = await fetch(`https://${shop}/admin/api/${API}/themes/${themeId}/assets.json`, {
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': tok,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ asset: { key: 'layout/theme.liquid', value: newContent } }),
  signal: AbortSignal.timeout(15000)
});
```

### GraphQL API
```typescript
// Query
const r = await fetch(`https://${shop}/admin/api/${API}/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': tok
  },
  body: JSON.stringify({ query: Q, variables: v }),
  signal: AbortSignal.timeout(25000)
});
const data = await r.json();
```

### Scopes OAuth activos (NeuroneSCF B2C)
```
read_products, write_products
read_product_listings
read_collections, write_collections
read_locales
write_translations
read_themes, write_themes
read_script_tags, write_script_tags
read_orders
read_shipping
read_inventory, write_inventory
read_price_rules
read_discounts
read_locations
read_pages
read_apps
```
**NO tiene:** `write_content` (navigation menus — manual siempre), `read_customer_events`, `write_customers`

---

## OPERACIONES COMUNES

### Leer/escribir SEO de producto (GraphQL)
```typescript
// Leer
const Q = `{
  products(first:50, query:"status:active") {
    edges { node { legacyResourceId seo { title description } } }
  }
}`;

// Escribir
const MUT = `mutation($id:ID!, $seo:SEOInput!) {
  productUpdate(input:{id:$id, seo:$seo}) {
    product { id seo { title description } }
    userErrors { field message }
  }
}`;
// IMPORTANTE: verificar que written === sent — Shopify puede retornar OK sin persistir
```

### Escribir traducción EN (con digest obligatorio)
```typescript
// PASO 1: obtener digest
const Q = `{
  translatableResource(resourceId:"${gid}") {
    translatableContent { key value digest locale }
  }
}`;
const digest = content.find(c => c.key === 'body_html').digest;

// PASO 2: escribir con digest (SIN digest Shopify acepta pero NO persiste)
const TRANS = `mutation($id:ID!, $tr:[TranslationInput!]!) {
  translationsRegister(resourceId:$id, translations:$tr) {
    translations { key value }
    userErrors { field message }
  }
}`;
const vars = {
  id: gid,
  tr: [{ locale: 'en', key: 'body_html', value: newHTML, translatableContentDigest: digest }]
};
```

### Leer/escribir metafields (social proof)
```typescript
// Leer
const Q = `{
  product(id:"${gid}") {
    sp_es: metafield(namespace:"neurone", key:"social_proof_es") { value }
    sp_en: metafield(namespace:"neurone", key:"social_proof_en") { value }
  }
}`;

// Escribir
const MUT = `mutation($id:ID!, $mf:[MetafieldsSetInput!]!) {
  metafieldsSet(metafields:$mf) {
    metafields { key value }
    userErrors { field message }
  }
}`;
```

### Leer/escribir theme.liquid (REST)
```typescript
// Obtener tema activo
const themes = await restGet(shop, tok, 'themes.json');
const activeTheme = themes.themes.find(t => t.role === 'main');
const themeId = activeTheme.id;

// Leer
const asset = await restGet(shop, tok,
  `themes/${themeId}/assets.json?asset[key]=layout/theme.liquid`
);
const content = asset.asset.value;

// Escribir (SIEMPRE hacer snapshot antes)
await restPut(shop, tok, `themes/${themeId}/assets.json`, {
  asset: { key: 'layout/theme.liquid', value: newContent }
});
```

### Actualizar product_type
```typescript
const MUT = `mutation($id:ID!, $type:String!) {
  productUpdate(input:{id:$id, productType:$type}) {
    product { id productType }
    userErrors { field message }
  }
}`;
```

---

## PATRÓN DE TIMEOUT — CRÍTICO

Vercel proxy: **25s hard limit**
Supabase EF: **150s max**
Claude API call dentro de EF: ~10-30s

**Solución para operaciones largas:**
```
shopify-fix (recibe request de Vercel) 
  → fetch interno a EF batch dedicado con AbortSignal.timeout(55000)
  → EF batch llama Claude + itera Shopify
  → devuelve resultado
```

**Nunca** hacer bucle de 40+ productos directamente en el EF principal que recibe el proxy.

---

## IDENTIFICADORES FIJOS

```
Supabase project:     amlvyycfepwhiindxgzw
B2C store domain:     egdk1n-gt.myshopify.com
B2C store URL:        neuronescflorida.com
Ritual Kits GID:      gid://shopify/Collection/672207995207
Ritual Kits handle:   ritual-kits
CAPISSEN SHAMPOO GID: gid://shopify/Product/10771520848199
CAPISSEN LOTION GID:  gid://shopify/Product/10771520913735
Active theme:         Neurone Custom Theme v1.0
Claude model en EFs:  claude-sonnet-4-20250514
Vercel team:          team_fEH94Irp6BAI9YGm4btGna5n (Unrealvillestudio-Team)
```

---

## REGLAS DE ORO

1. **Siempre usar `Vercel:web_fetch_vercel_url`** — nunca `web_fetch` para URLs de Vercel
2. **Siempre verificar post-write** — Shopify retorna 200 aunque no persista
3. **Siempre pasar `translatableContentDigest`** en `translationsRegister` — sin él no persiste
4. **Siempre snapshot antes de modificar theme.liquid**
5. **Tags en GraphQL son array** — no string (`.split(',')` falla)
6. **Menus NO se pueden escribir via API** — el token no tiene `write_content` — siempre manual
7. **Colecciones vacías** → Shopify retorna 404 aunque existan
8. **El tema está hardcodeado** — `nc-header.liquid` y `nc-footer.liquid` en `sections/` — no usar Navigation API
9. **`locale_root` en Liquid:** usar `| append: '/' | replace: '//', '/'` en TODOS los archivos

---

## CÓMO EMPEZAR UN NUEVO SPRINT

```
1. Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/ecosystem.json
2. Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md
3. Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/brands/NeuroneSCF/BP_Brand_Context.md
4. Correr audit: GET https://unrlvl-tools.vercel.app/api/audit-proxy?brand_id=NeuroneSCF&store_type=b2c
5. Leer score y findings, priorizar
6. Ejecutar fixes via fix-proxy
7. Al final: Actualiza
```
