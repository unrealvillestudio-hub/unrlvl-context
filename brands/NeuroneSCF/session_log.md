# Session Log — 2026-05-29
_NeuroneSCF + UNRLVL Ecosystem · Claude Sonnet 4.6 + Claude Code_

---

## RESUMEN EJECUTIVO

Sesión de infraestructura intensiva. Dos grandes bloques: (1) correcciones Shopify MCP + operaciones tienda NSCF, (2) construcción completa del portal de fulfillment para Iván/2toner Express. Primera orden real procesada y despachada (Maria E Thompson #1017).

---

## LOGROS DE LA SESIÓN

### SHOPIFY MCP — DESBLOQUEADO AL 100%
- **OAuth callback implementado** en `nscf-fulfillment-portal` (antes no existía) — token se auto-guarda en Supabase al instalar app
- **Token B2C actualizado**: `[token en Supabase — no exponerlo en repo]` (OAuth real, reemplaza atkn_ inválido)
- **GRANT fix aplicado**: `public.shopify_stores` VIEW requería permisos explícitos de escritura — CC lo detectó y aplicó migración
- **`write_orders` scope agregado** a UNRLVL-MCP app en Dev Dashboard (versión nscf-kiosk-8)
- **Pickup deshabilitado** en Vizos Salón (B2C checkout) — `locationLocalPickupDisable`
- **Delivery deshabilitado** en Vizos Salón (Kiosk) — `fulfillsOnlineOrders: false`

### ORDEN #1017 — MARIA E THOMPSON
- Shipping address corregida: 20438 59TH LN N, Loxahatchee FL 33470
- Tags aplicados: `delivery-corrected`, `free-shipping-applied`
- Nota de corrección agregada en Shopify
- Fulfillment creado y despachado
- **Carrier corregido**: USPS → **UPS** (tracking `1Z98Y4W70394794994`)
- Cliente notificada con link de tracking UPS correcto

### PORTAL DE FULFILLMENT IVÁN (nscf-fulfillment-portal)
**Construido desde cero. End-to-end verificado.**

| Componente | Estado |
|---|---|
| `nscf-fulfillment-portal` v2 | ✅ ACTIVE — Supabase EF |
| `nscf-mailer` v17 | ✅ ACTIVE — botón → dispatch.neuronescflorida.com/portal |
| `nscf_fulfillment_log` | ✅ tabla + archivo con cron 3 meses |
| `nscf_fulfillment_log_archive` | ✅ tabla |
| Cron archivado | ✅ 2am UTC diario |
| Proxy Vercel `nscf-dispatch` | ✅ pusheado a GitHub — PENDIENTE conectar en Vercel dashboard |
| DNS Cloudflare | ⏳ PENDIENTE — `dispatch.neuronescflorida.com` CNAME |

**Flujo completo verificado:**
1. Pantalla 1 (Nueva orden) → Confirmar recibido ✅
2. Pantalla 2 (Tracking) → Enviar + 4 emails simultáneos ✅
3. Pantalla 3 (Todo listo) → corrección tracking + solicitar reporte ✅
4. Shopify fulfillment actualizado automáticamente ✅
5. CSV reporte por email ✅

**4 destinatarios en cada despacho:** Iván + Ops + Patricia + Cliente
**Audit trail completo:** `emails_sent` + `tracking_history` en Supabase

### KIOSK — FIX DESCUENTO
- Bloque de descuento **oculto** para todos los ambassadors con `max_discount_pct = 0`
- Solo Patricia (Vizos, `max_discount_pct = 40`) ve el selector de descuento
- Controlado por Supabase — sin cambios de código para ajustes futuros
- Deploy en `nscf-kiosko.vercel.app` vía GitHub push

### CATÁLOGO NEURONE (Excel)
- `RES-Neurone_Pricing_v16_B2B_B2C.xlsx` generado
- B2C separado limpio (34 activos + 12 inactivos) con fórmulas vivas
- Nueva pestaña `CATALOGO B2B` (38 productos, 4 categorías, sin tachado)
- Fórmulas diferenciadas: B2C incluye LOGISTICA+MARKETING, B2B no

---

## PENDIENTES INMEDIATOS

### 🔴 HOY (antes de próxima orden)
- [ ] Crear proyecto `nscf-dispatch` en Vercel (root dir: `nscf-dispatch`)
- [ ] Agregar `dispatch.neuronescflorida.com` en Vercel → Settings → Domains
- [ ] Agregar CNAME en Cloudflare (DNS only — nube gris)
- [ ] Verificar renderizado HTML en `dispatch.neuronescflorida.com/portal?order=...&token=...`

### 🟡 PRÓXIMO SPRINT
- [ ] Dashboard pendientes en portal Iván (lista órdenes sin despachar)
- [ ] Integración UPS API directo (developer.ups.com — gratis)
  - Iván necesita: Client ID + Client Secret + Account Number desde ups.com/developer
- [ ] Token B2B Kiosk en Supabase (store `nj5ybc-n1` — investigar si aplica)
- [ ] Shampoo Kerasin HB 400ml en CATALOGO B2B — confirmar con PO

---

## LEARNINGS PARA PROFESSOR

1. **SHOPIFY_INFRA**: Token `atkn_` (App automation) no sirve para Admin API — es CI/CD only. Solo `shpat_` funciona. Generación correcta: OAuth callback en EF o Dev Dashboard → Install app (legacy).
2. **SHOPIFY_INFRA**: `public.shopify_stores` es una VIEW. PostgreSQL no hereda privilegios de tabla base a view — requiere GRANT explícito de INSERT/UPDATE/DELETE sobre la view.
3. **SHOPIFY_INFRA**: Supabase Edge Runtime fuerza `Content-Type: text/plain` + `CSP: default-src 'none'; sandbox` en todas las respuestas desde `*.supabase.co/functions/v1/`. No anulable desde dentro de la EF. Solución: proxy Vercel que sobrescribe headers.
4. **SHOPIFY_INFRA**: Para deshabilitar delivery en location, usar `locationEdit(fulfillsOnlineOrders: false)` — no existe `locationLocalDeliveryDisable` en GraphQL API.
5. **NSCF_OPS**: UPS tracking siempre empieza con `1Z`. USPS empieza con `9400`, `9205`, etc. Validación de carrier por prefijo evita errores de entrada.
6. **SUPABASE_INFRA**: `pg_cron.schedule()` es idempotente por job name — upserts si el nombre ya existe.

---

## SMA — Sin novedades relevantes al ecosistema principal
Actividad solo de Laura/Patricia en redes sociales NSCF.

---

_Sesión cerrada: 2026-05-29 · 21:30 UTC_
