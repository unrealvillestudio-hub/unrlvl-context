# SKILL — shopify-auditor v2.0
_UNRLVL Shopify Store Audit + Fix · Multimarca · Admin GraphQL + REST API_
_Versión: 2.0 · 2026-04-30_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa cuando Sam indica:
- "auditar la tienda de [marca]"
- "revisar el estado de Shopify de [marca]"
- "fix [hallazgo] en la tienda de [marca]"
- "shopify-auditor para [marca]"
- "audit + fix completo de [marca]"
- "onboarding de nueva tienda [cliente]"

**Antes de empezar:** Confirmar `brand_id`, tienda (B2C / B2B / ambas), y modo:
- `AUDIT` — solo lectura, genera reporte
- `FIX` — lectura + escritura, aplica correcciones con aprobación
- `AUDIT+FIX` — audit completo seguido de fix de todos los críticos aprobados

---

## NOTA CRÍTICA — APIs

Este skill opera directamente contra la **Admin GraphQL API** y **Admin REST API** con token de acceso por tienda. Los tokens viven en `shopify.stores.access_token` — **nunca** se muestran en outputs públicos ni en reportes.

**Antes del primer audit de cualquier tienda:** ejecutar el test de conectividad (Sección 0).

---

## SECCIÓN 0 — CONECTIVIDAD Y ONBOARDING

### Test de conectividad

```javascript
async function testShopifyConnection(shopDomain, accessToken) {
  const res = await fetch(
    `https://${shopDomain}/admin/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({
        query: `{
          shop {
            name
            primaryDomain { url }
            currencyCode
            plan { displayName }
            ianaTimezone
            contactEmail
          }
        }`
      })
    }
  );
  const data = await res.json();
  if (data.errors) return { ok: false, error: data.errors };
  return { ok: true, shop: data.data.shop };
}
```

**Resultado esperado:** `{ ok: true, shop: { name, currencyCode, plan } }`
**Si falla:** verificar scopes del token y que no haya expirado.

### Onboarding de nueva tienda de cliente

Proceso para incorporar un cliente nuevo al ShopifyAuditor:

**Paso 1 — Datos a solicitar al cliente:**
```
shop_domain:    [nombre].myshopify.com
store_type:     b2c / b2b / unified
display_name:   nombre legible (ej: "Diamond Details B2C")
```

**Paso 2 — Crear Custom App en el Shopify del cliente:**
1. Admin Shopify → Settings → Apps and sales channels → Develop apps
2. Create app → nombre: "UNRLVL Auditor"
3. Configure Admin API scopes:

Para MODO AUDIT (mínimo):
`read_products, read_inventory, read_orders, read_customers, read_themes,
read_shipping, read_discounts, read_price_rules, read_content,
read_script_tags, read_marketing_events, read_analytics`

Para MODO FIX (adicionales):
`write_themes, write_products, write_inventory, write_content,
write_script_tags, write_discounts, write_price_rules`

4. Install app → copiar **Admin API access token**

**Paso 3 — Registrar en Supabase:**
```sql
INSERT INTO shopify.stores
  (brand_id, store_type, shop_domain, display_name, access_token, scopes_granted)
VALUES
  ('[brand_id]', '[b2c/b2b]', '[shop].myshopify.com', '[Nombre]', '[token]',
   ARRAY['read_products','read_inventory','read_orders','read_themes','read_shipping',
         'read_discounts','read_content','write_themes','write_products']);
```

---

## SECCIÓN 1 — ARQUITECTURA

### Modos de operación

```
MODO AUDIT (solo lectura)              MODO FIX (lectura + escritura)
─────────────────────────              ──────────────────────────────
Admin API → lee tienda                 Admin API → lee tienda
↓                                      ↓
12 módulos de análisis                 12 módulos de análisis
↓                                      ↓
Genera Audit Report                    Claude muestra diff por hallazgo
↓                                      ↓
Guarda en Supabase                     Sam aprueba cada fix (o batch por severity)
                                       ↓
                                       Claude aplica el cambio
                                       ↓
                                       Verifica resultado
                                       ↓
                                       Log en shopify.fix_log (resolved: true)
```

### Helper functions base

```javascript
const SHOPIFY_API_VERSION = '2025-01';

async function shopifyGQL(shopDomain, token, query, variables = {}) {
  const res = await fetch(
    `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token
      },
      body: JSON.stringify({ query, variables })
    }
  );
  return res.json();
}

async function shopifyREST(shopDomain, token, endpoint, method = 'GET', body = null) {
  const res = await fetch(
    `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/${endpoint}`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token
      },
      body: body ? JSON.stringify(body) : null
    }
  );
  return res.json();
}
```

---

## SECCIÓN 2 — 12 MÓDULOS DE AUDIT

### Módulo 1 — Catálogo (20 pts)

```graphql
{
  products(first: 250) {
    edges {
      node {
        id title status vendor productType handle
        variants(first: 100) {
          edges {
            node {
              id sku price compareAtPrice
              inventoryQuantity availableForSale
              inventoryItem { tracked }
              weight weightUnit
            }
          }
        }
        images(first: 1) { edges { node { url } } }
        metafields(first: 10) { edges { node { namespace key value } } }
        seo { title description }
        descriptionHtml
      }
    }
  }
}
```

**Checks y códigos:**

| Código | Severidad | Condición |
|---|---|---|
| CAT-001 | 🔴 critical | Producto activo sin SKU en variante |
| CAT-002 | 🔴 critical | Producto activo sin imagen |
| CAT-003 | 🔴 critical | Precio = 0 o vacío |
| CAT-004 | 🟡 important | Producto sin descripción |
| CAT-005 | 🟡 important | Inventory tracking OFF en variante activa |
| CAT-006 | 🟡 important | Stock negativo |
| CAT-007 | 🟡 important | compareAtPrice menor que price (descuento invertido) |
| CAT-008 | 🔵 opportunity | Producto sin SEO title/description |
| CAT-009 | 🔵 opportunity | Producto sin peso definido (afecta shipping rates) |
| CAT-010 | 🔵 opportunity | Handle con caracteres no amigables para SEO |

### Módulo 2 — Colecciones (10 pts)

```graphql
{
  collections(first: 100) {
    edges {
      node {
        id title handle productsCount
        ruleSet { rules { column condition relation } }
        image { url }
        seo { title description }
        descriptionHtml
        sortOrder
      }
    }
  }
}
```

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| COL-001 | 🔴 critical | Colección en menú principal con 0 productos |
| COL-002 | 🟡 important | Colección sin imagen |
| COL-003 | 🟡 important | Smart collection con reglas conflictivas |
| COL-004 | 🔵 opportunity | Colección sin SEO |
| COL-005 | 🔵 opportunity | sortOrder en default (puede afectar UX) |

### Módulo 3 — Pagos y Checkout (15 pts)

```graphql
{
  shop {
    name email
    primaryDomain { url }
    currencyCode
    paymentSettings { supportedDigitalWallets }
    checkoutApiSupported
    contactEmail
    billingAddress { address1 city country zip }
  }
}
```

REST adicional: `GET /payment_gateways.json`

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| PAY-001 | 🔴 critical | Sin payment gateway activo |
| PAY-002 | 🔴 critical | Email de tienda sin configurar |
| PAY-003 | 🟡 important | Shopify Payments no activo (fees más altos) |
| PAY-004 | 🟡 important | Apple Pay / Google Pay no habilitados |
| PAY-005 | 🟡 important | Dominio propio no configurado (usa myshopify.com) |
| PAY-006 | 🔵 opportunity | Moneda distinta al mercado principal |

### Módulo 4 — Órdenes y Operaciones (10 pts)

```graphql
{
  orders(first: 50, query: "status:open") {
    edges {
      node {
        id name displayFinancialStatus displayFulfillmentStatus
        createdAt totalPriceSet { shopMoney { amount } }
        tags
      }
    }
  }
  draftOrders(first: 20) {
    edges {
      node { id name createdAt status }
    }
  }
}
```

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| ORD-001 | 🔴 critical | Órdenes sin fulfillment > 7 días |
| ORD-002 | 🔴 critical | Pagos pendientes (authorized, not captured) |
| ORD-003 | 🟡 important | Draft orders abandonadas > 30 días |
| ORD-004 | 🔵 opportunity | Órdenes sin tags (dificulta reporting) |

### Módulo 5 — Apps instaladas (10 pts)

REST: `GET /admin/api/2025-01/recurring_application_charges.json`
REST: `GET /admin/api/2025-01/usage_charges.json`

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| APP-001 | 🔴 critical | App con cargo activo pero sin uso en 60 días |
| APP-002 | 🔴 critical | Apps duplicadas con misma función (ej: 2 review apps) |
| APP-003 | 🟡 important | Apps con permisos excesivos para su función |
| APP-004 | 🟡 important | Apps sin actualizar > 6 meses (seguridad) |
| APP-005 | 🔵 opportunity | Apps de cargo mensual fijo con alternativa nativa de Shopify |

### Módulo 6 — Navegación y Menús (10 pts)

```javascript
// REST endpoint
GET /admin/api/2025-01/custom_collections.json
// Menus via Storefront API o Theme assets
GET /themes/[id]/assets.json?asset[key]=config/settings_data.json
```

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| NAV-001 | 🔴 critical | Enlace en menú principal apunta a página/colección eliminada |
| NAV-002 | 🔴 critical | Menú de footer sin links legales (privacy, terms) |
| NAV-003 | 🟡 important | Menú principal con más de 8 items (UX) |
| NAV-004 | 🟡 important | Página de política de devoluciones no enlazada |
| NAV-005 | 🔵 opportunity | Breadcrumbs no configurados en theme settings |

### Módulo 7 — SEO (10 pts)

```graphql
{
  products(first: 250) {
    edges { node { seo { title description } handle } }
  }
  collections(first: 100) {
    edges { node { seo { title description } handle } }
  }
  shop {
    metafields(first: 20) { edges { node { namespace key value } } }
  }
}
```

REST: `GET /pages.json` para páginas estáticas

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| SEO-001 | 🟡 important | > 20% productos sin SEO title |
| SEO-002 | 🟡 important | SEO title duplicado entre productos |
| SEO-003 | 🟡 important | Meta description > 160 chars o < 70 chars |
| SEO-004 | 🟡 important | Handle con mayúsculas o espacios |
| SEO-005 | 🔵 opportunity | Página Home sin meta description |
| SEO-006 | 🔵 opportunity | Robots.txt no customizado |
| SEO-007 | 🔵 opportunity | Sitemap no verificado en Google Search Console |

### Módulo 8 — Performance (5 pts)

```javascript
// Chequeos via theme assets
GET /themes/[published_id]/assets.json?asset[key]=assets/theme.css
GET /themes/[published_id]/assets.json?asset[key]=layout/theme.liquid
```

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| PERF-001 | 🔴 critical | Imágenes de productos > 2MB sin compresión |
| PERF-002 | 🟡 important | theme.css minificado ausente |
| PERF-003 | 🟡 important | Scripts externos bloqueantes en `<head>` |
| PERF-004 | 🔵 opportunity | Lazy loading no configurado en imágenes de colección |
| PERF-005 | 🔵 opportunity | Google Fonts cargando > 2 familias |

### Módulo 9 — Shipping (5 pts)

REST: `GET /shipping_zones.json`
REST: `GET /carrier_services.json`

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| SHIP-001 | 🔴 critical | Sin zona de shipping configurada |
| SHIP-002 | 🔴 critical | Todos los productos sin peso (bloquea shipping calculado) |
| SHIP-003 | 🟡 important | Zona de shipping sin tasa (free shipping sin intención) |
| SHIP-004 | 🔵 opportunity | Sin opción de free shipping por monto mínimo |

### Módulo 10 — Descuentos y Pricing (5 pts)

```graphql
{
  discountNodes(first: 50) {
    edges {
      node {
        id
        discount {
          ... on DiscountCodeBasic {
            title status usageLimit usedCount
            startsAt endsAt
          }
          ... on DiscountAutomaticBasic {
            title status startsAt endsAt
          }
        }
      }
    }
  }
}
```

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| DISC-001 | 🟡 important | Discount codes activos expirados (confunde clientes) |
| DISC-002 | 🟡 important | Descuentos automáticos apilables sin límite |
| DISC-003 | 🔵 opportunity | Sin descuento de primera compra configurado |
| DISC-004 | 🔵 opportunity | Sin programa de fidelización o referral |

### Módulo 11 — Configuración General (5 pts)

```graphql
{
  shop {
    name
    contactEmail
    customerAccounts
    taxesIncluded
    weightUnit
    setupRequired
  }
}
```

REST: `GET /policies.json` para verificar políticas legales

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| SET-001 | 🔴 critical | Sin Privacy Policy configurada |
| SET-002 | 🔴 critical | Sin Refund Policy configurada |
| SET-003 | 🟡 important | Sin Terms of Service |
| SET-004 | 🟡 important | Customer accounts deshabilitados (afecta recompra) |
| SET-005 | 🔵 opportunity | Impuestos no configurados correctamente para el mercado |

### Módulo 12 — B2C vs B2B (5 pts — solo para tiendas con ambas)

**Checks:**

| Código | Severidad | Condición |
|---|---|---|
| B2B-001 | 🔴 critical | Productos B2B visibles en tienda B2C |
| B2B-002 | 🔴 critical | Precios mayoristas iguales a retail |
| B2B-003 | 🟡 important | Discount codes B2B sin restricción de cliente |
| B2B-004 | 🔵 opportunity | Sin catálogo diferenciado por segmento |

---

## SECCIÓN 3 — MODO FIX: CAPACIDADES COMPLETAS

### Lo que el Modo Fix puede corregir

| Tipo | Recursos | API usada |
|---|---|---|
| **Theme** | Liquid files, CSS, JS, config | Admin API `/themes/[id]/assets` |
| **Productos** | Título, descripción, SEO, precio, tags | Admin REST `/products/[id]` |
| **Variantes** | SKU, precio, peso, inventory tracking | Admin REST `/variants/[id]` |
| **Inventario** | Stock, tracking | Admin REST `/inventory_items/[id]` |
| **Colecciones** | Imagen, SEO, descripción | Admin REST `/custom_collections/[id]` |
| **Menús** | Links, estructura | Storefront API / theme assets |
| **Páginas** | Contenido, SEO | Admin REST `/pages/[id]` |
| **Metafields** | Valores por recurso | Admin REST `/metafields/[id]` |
| **Discounts** | Fechas, estado | Admin GraphQL mutation |
| **Settings** | Políticas, contacto | Admin REST `/policies` / shop settings |

### Pipeline de un fix

```
1. AUDIT detecta hallazgo (ej: NAV-002 — footer sin privacy policy)
   ↓
2. Claude lee el recurso afectado
   GET /themes/[id]/assets?asset[key]=sections/footer.liquid
   ↓
3. Claude genera snapshot en shopify.theme_snapshots
   ↓
4. Claude muestra diff exacto a Sam:
   "Línea 47: añadir enlace /policies/privacy-policy"
   ↓
5. Sam aprueba (o rechaza / modifica)
   ↓
6. SOLO si Sam aprueba: Claude aplica el cambio
   PUT /themes/[id]/assets
   ↓
7. Claude verifica: GET del mismo asset, confirma cambio
   ↓
8. Log en shopify.fix_log (resolved: true) +
   UPDATE shopify.audit_findings SET resolved=true, resolved_at=now()
```

### Protocolo de seguridad obligatorio

```javascript
async function snapshotAndFix(shopDomain, token, themeId, assetKey, newContent, storeId, findingId) {

  // 1. Leer versión actual
  const current = await shopifyREST(shopDomain, token,
    `themes/${themeId}/assets.json?asset[key]=${assetKey}`);

  // 2. Guardar snapshot ANTES de tocar nada
  await supabase.from('shopify.theme_snapshots').insert({
    store_id: storeId,
    brand_id: brandId,
    finding_id: findingId,
    theme_id: themeId,
    asset_key: assetKey,
    content_before: current.asset.value
  });

  // 3. Aplicar el fix
  const result = await shopifyREST(shopDomain, token,
    `themes/${themeId}/assets.json`, 'PUT',
    { asset: { key: assetKey, value: newContent } });

  // 4. Verificar
  const updated = await shopifyREST(shopDomain, token,
    `themes/${themeId}/assets.json?asset[key]=${assetKey}`);

  const ok = updated.asset.value === newContent;

  // 5. Log
  await supabase.from('shopify.fix_log').insert({
    store_id: storeId,
    finding_id: findingId,
    fix_type: 'theme',
    description: `Fixed ${assetKey}`,
    resource_type: 'theme_asset',
    resource_id: assetKey,
    success: ok
  });

  return { ok };
}
```

### Lo que el Modo Fix NO hace

- No modifica archivos sin snapshot previo
- No aplica cambios sin aprobación explícita de Sam/cliente para cada fix
- No hace cambios en batch sin revisión individual (a menos que Sam indique "aprobar todos de severidad opportunity")
- No toca configuración de payments ni datos de clientes via fix automático
- No elimina recursos (productos, colecciones) — solo actualiza

---

## SECCIÓN 4 — ESTRUCTURA DEL AUDIT REPORT

```markdown
# Shopify Audit Report — [Marca] [B2C/B2B]
_[fecha] · shopify-auditor v2.0 · UNRLVL_

## SCORE: [X]/100 · Estado: 🟢/🟡/🔴

| Módulo           | Score | Críticos | Importantes | Oportunidades |
|------------------|-------|----------|-------------|---------------|
| Catálogo         | X/20  | N        | N           | N             |
| Colecciones      | X/10  | N        | N           | N             |
| Pagos/Checkout   | X/15  | N        | N           | N             |
| Órdenes          | X/10  | N        | N           | N             |
| Apps             | X/10  | N        | N           | N             |
| Navegación       | X/10  | N        | N           | N             |
| SEO              | X/10  | N        | N           | N             |
| Performance      | X/5   | N        | N           | N             |
| Shipping         | X/5   | N        | N           | N             |
| Discounts        | X/5   | N        | N           | N             |
| Settings         | X/5   | N        | N           | N             |
| B2C vs B2B       | X/5   | N        | N           | N             |

## 🔴 CRÍTICOS (bloquean ventas o compliance)
[listado con código, descripción, recurso afectado, fix disponible sí/no]

## 🟡 IMPORTANTES (afectan conversión)
[listado]

## 🔵 OPORTUNIDADES (mejoras)
[listado]

## FIXES DISPONIBLES
[Lista de hallazgos con fix automático disponible — requieren aprobación]

## PRÓXIMOS PASOS
[Priorizado por impacto en revenue]
```

---

## SECCIÓN 5 — SUPABASE SCHEMA (✅ CREADO 2026-04-30)

Schema `shopify.*` activo en Supabase `amlvyycfepwhiindxgzw`:

- `shopify.stores` — registro de tiendas por brand
- `shopify.audit_runs` — historial de audits con score
- `shopify.audit_findings` — hallazgos individuales por módulo
- `shopify.theme_snapshots` — snapshots pre-fix para rollback
- `shopify.fix_log` — log completo de correcciones aplicadas
- `shopify.v_store_health` — vista resumen de salud por tienda

---

## SECCIÓN 6 — SHOPIFYAUDITOR COMO SERVICIO UNRLVL

### Qué es

ShopifyAuditor es un servicio propio de Unrealville Studio para clientes con tiendas Shopify. Detecta problemas que bloquean ventas, afectan conversión o generan costos innecesarios — y los corrige con aprobación del cliente.

### Tiers de servicio

| Tier | Nombre | Qué incluye | Frecuencia |
|---|---|---|---|
| **Audit Express** | Solo reporte | 12 módulos + score + reporte PDF | On-demand |
| **Audit + Fix** | Reporte + correcciones | Audit + aplicación de críticos e importantes | On-demand |
| **Audit Monthly** | Mantenimiento | Audit mensual + fixes ilimitados + monitoring | Mensual |
| **Audit Onboarding** | Nuevo cliente | Audit completo antes de lanzar campañas | One-time |

### Deliverables por audit

1. Audit Report (markdown + PDF exportable)
2. Score de 0-100 con desglose por módulo
3. Lista priorizada de fixes con estimado de impacto
4. Fixes aplicados (si modo FIX) con evidencia antes/después
5. Log de cambios persistido en Supabase para auditoría

### Proceso de onboarding de cliente

```
1. Sam/UNRLVL recibe solicitud
   ↓
2. Cliente instala Custom App "UNRLVL Auditor" en su Shopify
   (instrucciones en Sección 0)
   ↓
3. Sam registra credenciales en shopify.stores via Supabase
   ↓
4. Primer audit completo (AUDIT mode, solo lectura)
   ↓
5. Sam presenta reporte al cliente
   ↓
6. Cliente aprueba fixes prioritarios
   ↓
7. Modo FIX aplicado con aprobación
   ↓
8. Seguimiento mensual si contrata Audit Monthly
```

---

## SECCIÓN 7 — TIENDAS ACTIVAS EN EL SISTEMA

| Marca | Tienda | Tipo | Estado |
|---|---|---|---|
| NeuroneSCF | pendiente domain | B2C | ⏳ Pendiente token |
| NeuroneSCF | pendiente domain | B2B | ⏳ Pendiente token |

**Para agregar NeuroneSCF:** Sam provee `shop_domain` B2C y B2B + Admin API tokens.
Seguir proceso de Sección 0 — Onboarding.

---

_SKILL shopify-auditor v2.0 · Unrealville Studio · Admin GraphQL + REST API · Audit + Fix_
