# SKILL — shopify-mcp v1.0
_Unrealville Studio · Conector MCP Shopify Multimarca · Supabase-powered_
_Versión: 1.0 · 2026-05-10_

---

## INSTRUCCIÓN DE CARGA

Cargar cuando Sam indica trabajo directo en una tienda Shopify:
- "revisa el producto X en Shopify"
- "actualiza [campo] de [marca] B2C"
- "lee el catálogo de NeuroneSCF"
- cualquier operación READ o WRITE sobre tienda activa vía MCP

---

## ARQUITECTURA

El conector `Shopify — Unrealville Studio` es un MCP server multimarca propio.

```
Conector Claude ↔ MCP Server (unrlvl-shopify-mcp.vercel.app/api/mcp/mcp)
    ↓
Supabase (shopify.stores) — credenciales por marca
    ↓
Shopify Admin API (GraphQL + REST)
```

**Principio clave:** el conector es de estudio, no de marca. Añadir una marca nueva = registro en `shopify.stores` en Supabase. Sin cambios de código.

---

## REFERENCIA RÁPIDA

| Campo | Valor |
|-------|-------|
| Connector name | `Shopify — Unrealville Studio` |
| MCP URL | `https://unrlvl-shopify-mcp.vercel.app/api/mcp/mcp` |
| Supabase project | `amlvyycfepwhiindxgzw` |
| Infra doc | `ecosystem.json → infrastructure → INFRA-SHOPIFY-MCP` |

---

## TIENDAS CONECTADAS

| brand_id | store_type | domain | Estado |
|----------|-----------|--------|--------|
| `NeuroneSCF` | `b2c` | egdk1n-gt.myshopify.com | ✅ ACTIVA |
| `NeuroneSCF` | `b2b` | nj5ybc-n1.myshopify.com | ✅ ACTIVA |

---

## TOOLS DISPONIBLES

Todos requieren `brand_id` + `store_type` (`b2c` o `b2b`).

| Tool | Uso |
|------|-----|
| `list_brands` | Ver marcas y tiendas conectadas |
| `shopify_get_store_info` | Info de la tienda (domain, store_id, scopes) |
| `shopify_get` | GET REST: productos, variantes, páginas, temas, assets, etc. |
| `shopify_post` | POST REST: crear recursos |
| `shopify_put` | PUT REST: actualizar recursos |
| `shopify_delete` | DELETE REST: eliminar recursos |
| `shopify_graphql` | GraphQL Admin API — queries y mutations |

---

## PATRONES DE USO FRECUENTES (NeuroneSCF)

### Leer producto
```
shopify_get(brand_id="NeuroneSCF", store_type="b2c",
  endpoint="products/[id].json")
```

### Actualizar SEO de producto
```
shopify_put(brand_id="NeuroneSCF", store_type="b2c",
  endpoint="products/[id].json",
  data={"product": {"id": [id], "metafields": [...]}})
```

### GraphQL — leer 42 productos
```
shopify_graphql(brand_id="NeuroneSCF", store_type="b2c",
  query="{ products(first:250) { edges { node { id title seo { title description } } } } }")
```

### Registrar traducción EN
```
shopify_graphql(brand_id="NeuroneSCF", store_type="b2c",
  query="mutation { translationsRegister(resourceId: \"...\", translations: [{...}]) { ... } }")
```

### Leer/escribir asset de tema
```
shopify_get(brand_id="NeuroneSCF", store_type="b2c",
  endpoint="themes/192983662919/assets.json?asset[key]=sections/nc-header.liquid")

shopify_put(brand_id="NeuroneSCF", store_type="b2c",
  endpoint="themes/192983662919/assets.json",
  data={"asset": {"key": "sections/nc-header.liquid", "value": "[contenido]"}})
```

---

## IDs CRÍTICOS — NeuroneSCF B2C

```
Theme ID:      192983662919
About page:    162313142599
La Ciencia:    162313175367
FAQ:           162313208135
Contacto:      162313273671
Domain:        neuronescflorida.com
```

---

## SCOPES ACTIVOS

**B2C y B2B:** `read_apps · read_locales · write_translations · write_legal_policies`

Nota: `write_legal_policies` fue añadido 2026-05-09 tras reinstal OAuth.

---

## LIMITACIONES CONOCIDAS

| Limitación | Detalle |
|-----------|---------|
| `shopify_graphql` timeout | Mutations largas (batch 42 productos) pueden timeout. Usar batches ≤20 |
| `write_customers` | No en scope — no modificar datos de clientes |
| `read_customer_events` | No concedido → TRACK-CE-SCOPE warning en audit |
| Políticas legales | shopPoliciesUpdate GraphQL ✅ funciona con write_legal_policies |

---

## CUÁNDO USAR shopify-mcp VS shopify-auditor

| Tarea | Usar |
|-------|------|
| Auditar tienda completa (score, hallazgos) | `shopify-auditor` — EF v16.1 en Supabase |
| Fix quirúrgico de un recurso específico | `shopify-mcp` — más directo |
| Leer o escribir un asset/producto/página | `shopify-mcp` |
| Onboarding tienda nueva de cliente | `shopify-auditor` (proceso completo) |
| Traducción, metafields, SEO de uno a varios recursos | `shopify-mcp` |

---

## AÑADIR MARCA NUEVA

```sql
-- En Supabase amlvyycfepwhiindxgzw → shopify.stores
INSERT INTO shopify.stores
  (brand_id, store_type, shop_domain, display_name, access_token, scopes_granted)
VALUES
  ('[brand_id]', 'b2c', '[shop].myshopify.com', '[Nombre]', '[token]',
   ARRAY['read_products','write_products','read_themes','write_themes']);
```

El conector detecta la nueva marca automáticamente en el siguiente request.

---

_SKILL shopify-mcp v1.0 · Unrealville Studio · Conector multimarca propio_
