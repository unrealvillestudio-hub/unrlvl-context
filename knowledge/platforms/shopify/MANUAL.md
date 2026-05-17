# SHOPIFY — Manual de Plataforma
_Categoría: platform_
_Versión: v1.0 · 2026-05-17 · Estado: approved_

---

## QUÉ ES
Plataforma de e-commerce. UNRLVL gestiona tiendas Shopify de marcas cliente via ShopifyAuditor + Edge Functions propias + Shopify MCP. Stack completo documentado en `skills/shopify-auditor/SKILL.md` y `skills/shopify-mcp/SKILL.md`.

---

## CUÁNDO USAR ESTE MANUAL
Limitaciones conocidas que aplican a todas las tiendas UNRLVL. Para procedimientos de audit/fix, ver los skills de Shopify.

---

## LIMITACIONES POR PLAN

| Feature | Disponibilidad | Workaround |
|---|---|---|
| `checkoutBrandingUpsert` (GraphQL) | Solo plan **Plus** o Development store | Configurar checkout branding manualmente en admin UI |
| Order Status page scripts | Solo plan Plus | No disponible en Basic — configurar via Shopify admin si aplica |
| Checkout Extensibility completa | Plus | En Basic: usar apps de checkout aprobadas |

---

## ERRORES CONOCIDOS

| Error | Causa | Solución |
|---|---|---|
| `checkoutBrandingUpsert` devuelve error de permisos | Plan Basic no incluye Checkout Branding API | Configurar branding del checkout manualmente en admin → Settings → Checkout |
| EF `shopify-auto-translate` falla silenciosamente | Bug activo desde 2026-05-06 | Fix pendiente — bloquea 42 descripciones EN de NeuroneSCF |
| Locale check incorrecto en templates | `request.locale.iso_code` vs `request.locale` | Usar `request.locale.iso_code == 'en'` para comparaciones |

---

## VARIABLES DE TIENDAS ACTIVAS

| Marca | Store | Tipo | Internal Domain | Theme ID |
|---|---|---|---|---|
| NeuroneSCF | B2C | Production | `egdk1n-gt.myshopify.com` | `192983662919` |
| NeuroneSCF | B2B | Production | `nj5ybc-n1.myshopify.com` | `149164392526` |

---

## NOTAS ARQUITECTÓNICAS

- **ShopifyAuditor v3.5** — corre via `audit-proxy.js` en Tools Vercel → EF `shopify-audit` v31
- **Scores:** B2C max 200 pts · B2B max 160 pts
- **OAuth stores:** guardados en `shopify.stores` en Supabase (service_role only)
- **Snapshots de tema:** `save_theme_snapshot` RPC disponible pre-fix

---

## CHANGELOG

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-17 | Creación inicial — limitaciones de plan documentadas, variables de tiendas activas |
