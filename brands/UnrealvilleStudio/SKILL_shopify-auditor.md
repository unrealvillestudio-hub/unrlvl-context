# SKILL — shopify-auditor v1.1
_UNRLVL Shopify Store Audit + Fix · Multimarca · Admin GraphQL API_
_Versión: 1.1 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa cuando Sam indica:
- "auditar la tienda de [marca]"
- "revisar el estado de Shopify de [marca]"
- "fix [hallazgo] en la tienda de [marca]"
- "shopify-auditor para [marca]"

**Antes de empezar:** Confirmar `brand_id`, tienda (B2C / B2B / ambas), y modo (AUDIT solo lectura / FIX con modificaciones).

---

## NOTA CRÍTICA — ESTADO DE LAS APIs

Las Shopify APIs han presentado inestabilidad desde semanas antes de 2026-04-24, incluso vía MCP. **La causa:** el Shopify AI Toolkit MCP requiere CLI — no funciona desde claude.ai. Este skill opera directamente contra la **Admin GraphQL API con token de acceso**, que es independiente del MCP y debería funcionar correctamente con tokens válidos.

**Antes de la primera sesión de audit:** Verificar que el token de NeuroneSCF responde correctamente con una query de test (ver Sección 0).

---

## SECCIÓN 0 — TEST DE CONECTIVIDAD

Antes de cualquier audit, ejecutar esta query de test mínima:

```graphql
{
  shop {
    name
    primaryDomain { url }
    currencyCode
  }
}
```

```javascript
// Test rápido de conectividad
async function testShopifyConnection(shopDomain, accessToken) {
  const res = await fetch(
    `https://${shopDomain}/admin/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query: '{ shop { name primaryDomain { url } currencyCode } }' })
    }
  );
  const data = await res.json();
  if (data.errors) return { ok: false, error: data.errors };
  return { ok: true, shop: data.data.shop };
}
```

**Resultado esperado:** `{ ok: true, shop: { name: "Neurone...", currencyCode: "USD" } }`
**Si falla:** Verificar que el token tiene los scopes correctos y no ha expirado.

---

## SECCIÓN 1 — ARQUITECTURA

### Dos modos de operación

```
MODO AUDIT (solo lectura)          MODO FIX (lectura + escritura)
─────────────────────              ──────────────────────────────
Admin API → lee tienda             Admin API → lee tienda
↓                                  ↓
Detecta hallazgos                  Detecta hallazgos
↓                                  ↓
Genera Audit Report                Claude muestra diff por hallazgo
↓                                  ↓
Guarda en Supabase                 Sam aprueba cada fix
                                   ↓
                                   Claude aplica el cambio
                                   ↓
                                   Verifica resultado
                                   ↓
                                   Log en Supabase (resolved: true)
```

### Configuración en Supabase

```sql
-- ops.shopify_stores (crear en implementación Fase 1)
CREATE TABLE ops.shopify_stores (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id      text REFERENCES public.brands(id),
  store_type    text CHECK (store_type IN ('b2c', 'b2b', 'unified')),
  shop_domain   text NOT NULL,
  access_token  text NOT NULL,  -- NUNCA en outputs públicos
  active        boolean DEFAULT true,
  last_audit_at timestamptz,
  created_at    timestamptz DEFAULT now()
);
```

### Scopes necesarios del Admin API token

**Para MODO AUDIT:**
`read_products`, `read_inventory`, `read_orders`, `read_customers`, `read_themes`, `read_shipping`, `read_discounts`, `read_price_rules`

**Para MODO FIX (adicionales):**
`write_themes`, `write_products`, `write_inventory`

---

## SECCIÓN 2 — PROTOCOLO DE AUDIT ICR (5 módulos)

### Módulo 1 — Catálogo

```graphql
{
  products(first: 250) {
    edges {
      node {
        id title status vendor productType
        variants(first: 100) {
          edges {
            node {
              id sku price compareAtPrice
              inventoryQuantity availableForSale
              inventoryItem { tracked }
            }
          }
        }
        images(first: 1) { edges { node { url } } }
      }
    }
  }
}
```

Checks: SKUs faltantes · Sin imágenes · Precio = 0 · Inventory tracking off · Stock negativo · compareAtPrice sin lógica

### Módulo 2 — Colecciones

```graphql
{
  collections(first: 50) {
    edges {
      node {
        id title productsCount
        ruleSet { rules { column condition relation } }
        image { url }
        seo { title description }
      }
    }
  }
}
```

Checks: Colecciones vacías · Sin imagen · SEO incompleto · Smart collections con reglas conflictivas

### Módulo 3 — Payments y Checkout

```graphql
{
  shop {
    name email primaryDomain { url }
    currencyCode
    paymentSettings { supportedDigitalWallets }
  }
}
```

Checks: Shopify Payments activo · Moneda correcta · Apple Pay / Google Pay · Dominio propio configurado · Email configurado

### Módulo 4 — Órdenes y Operaciones

```graphql
{
  orders(first: 50, query: "status:open") {
    edges {
      node {
        id name displayFinancialStatus displayFulfillmentStatus
        totalPriceSet { shopMoney { amount } }
      }
    }
  }
}
```

Checks: Órdenes sin fulfillment · Draft orders abandonadas (+7 días) · Pagos pendientes

### Módulo 5 — B2C vs B2B

Para marcas con ambas tiendas: comparar catálogo, precios, visibilidad de productos `b2b_only`.

Checks: Productos `shopify_visibility: 'b2b_only'` correctamente segmentados · Precios mayoristas vs retail · Discount codes por canal

---

## SECCIÓN 3 — MODO FIX: MODIFICACIÓN DE CUSTOM THEMES

### Capacidades del Modo Fix

La Shopify Admin API expone acceso completo a los archivos del tema via `Asset`. Claude puede leer y escribir Liquid, CSS, JS directamente.

**Endpoints:**
```
GET  /themes/[theme_id]/assets.json?asset[key]=sections/footer.liquid
PUT  /themes/[theme_id]/assets.json
     { asset: { key: "sections/footer.liquid", value: "[nuevo contenido]" } }
```

### Pipeline de un fix

```
1. AUDIT detecta hallazgo
   ej: "footer no tiene enlace a política de privacidad"
   ↓
2. Claude lee el archivo afectado
   GET /themes/[id]/assets?asset[key]=sections/footer.liquid
   ↓
3. Claude genera el fix
   Muestra diff exacto: qué líneas cambian y por qué
   ↓
4. Sam aprueba (o rechaza / modifica)
   ↓
5. SOLO si Sam aprueba:
   Claude escribe el archivo modificado
   PUT /themes/[id]/assets
   ↓
6. Claude verifica: GET del mismo archivo, confirma cambio
   ↓
7. Log en shopify.audit_findings (resolved: true, resolved_at: now())
```

### Protocolo de seguridad antes de cualquier fix

```javascript
// Siempre antes de modificar: snapshot del archivo original
async function snapshotAndFix(shopDomain, token, themeId, assetKey, newContent) {

  // 1. Leer versión actual
  const current = await shopifyGet(shopDomain, token,
    `/themes/${themeId}/assets.json?asset[key]=${assetKey}`);

  // 2. Guardar snapshot en Supabase antes de tocar nada
  await supabase.from('shopify.theme_snapshots').insert({
    brand_id: brandId,
    theme_id: themeId,
    asset_key: assetKey,
    content_before: current.asset.value,
    snapshot_at: new Date().toISOString()
  });

  // 3. Aplicar el fix
  await shopifyPut(shopDomain, token, `/themes/${themeId}/assets.json`, {
    asset: { key: assetKey, value: newContent }
  });

  // 4. Verificar
  const updated = await shopifyGet(shopDomain, token,
    `/themes/${themeId}/assets.json?asset[key]=${assetKey}`);

  return { ok: updated.asset.value === newContent };
}
```

### Tipos de fixes posibles

| Hallazgo | Archivo afectado | Tipo de fix |
|---|---|---|
| Falta política de privacidad en footer | `sections/footer.liquid` | Añadir enlace |
| Falta meta description | `layout/theme.liquid` | Añadir tag SEO |
| Botón de CTA con texto incorrecto | `sections/hero.liquid` | Editar texto |
| Color de acento incorrecto en CSS | `assets/theme.css` | Corregir variable |
| Falta trust badge en checkout | `sections/cart.liquid` | Añadir elemento |
| Producto sin descripción | API REST products | Actualizar via API |
| SKU faltante en variante | API REST products | Actualizar via API |
| Imagen de colección faltante | API REST collections | Asociar imagen |

### Lo que el Modo Fix NO hace

- No modifica archivos en el tema publicado sin snapshot previo
- No aplica cambios sin aprobación explícita de Sam para cada fix
- No hace cambios en batch sin revisión uno a uno (a menos que Sam indique "aprobar todos los de severidad oportunidad")
- No toca configuración de payments o datos de clientes via fix automático

---

## SECCIÓN 4 — ESTRUCTURA DEL AUDIT REPORT

```markdown
# Shopify Audit Report — [Marca] [B2C/B2B]
_[fecha] · shopify-auditor v1.1 · UNRLVL_

## SCORE: [X]/100 · Estado: 🟢/🟡/🔴

| Módulo | Score | Críticos | Importantes | Oportunidades |
|---|---|---|---|---|
| Catálogo | X/20 | N | N | N |
| Colecciones | X/20 | N | N | N |
| Payments | X/20 | N | N | N |
| Operaciones | X/20 | N | N | N |
| B2C vs B2B | X/20 | N | N | N |

## CRÍTICOS 🔴 (bloquean ventas)
[...]

## IMPORTANTES 🟡 (afectan conversión)
[...]

## OPORTUNIDADES 🔵 (mejoras)
[...]

## FIXES DISPONIBLES
[Lista de hallazgos con fix automático disponible — requiere aprobación]

## PRÓXIMOS PASOS
[Priorizado por impacto]
```

---

## SECCIÓN 5 — PERSISTENCIA EN SUPABASE

```sql
CREATE SCHEMA IF NOT EXISTS shopify;

CREATE TABLE shopify.audit_runs (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id    text, store_type text, shop_domain text,
  run_date    timestamptz DEFAULT now(),
  score       integer, status text,
  full_report text, created_by text DEFAULT 'shopify-auditor'
);

CREATE TABLE shopify.audit_findings (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_run_id uuid REFERENCES shopify.audit_runs(id),
  module       text,
  severity     text CHECK (severity IN ('critical','important','opportunity','ok')),
  finding      text, detail text,
  fix_available boolean DEFAULT false,
  fix_file      text,
  resolved      boolean DEFAULT false,
  resolved_at   timestamptz
);

CREATE TABLE shopify.theme_snapshots (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id       text, theme_id text, asset_key text,
  content_before text,
  snapshot_at    timestamptz DEFAULT now()
);
```

---

## SECCIÓN 6 — PILOT NEURONECSF

| Tienda | Dominio | Tipo | Estado |
|---|---|---|---|
| B2C | pendiente confirmar | b2c | Payments ✅ LIVE |
| B2B | pendiente confirmar | b2b | Payments ✅ LIVE |

**Para arrancar Fase 1 necesito de Sam:**
1. `shop_domain` B2C y B2B (formato `nombre.myshopify.com`)
2. Admin API tokens de ambas tiendas con scopes `read_*` + `read_themes`
3. Para Modo Fix: añadir scope `write_themes` al token

**Fases:**
- **Fase 1:** Test conectividad → Audit completo B2C + B2B → Primer report → Identificar gaps antes de cargar 87 SKUs
- **Fase 2:** Schema shopify.* en Supabase → historial → CRM
- **Fase 3:** Modo Fix activado → fixes automáticos con aprobación → Orbit deliverable

---

_SKILL shopify-auditor v1.1 · Unreal>ille Studio · Admin GraphQL API · Audit + Fix_
