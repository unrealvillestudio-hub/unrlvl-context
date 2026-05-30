# Session Log — 2026-05-30 · Pricing B2B + Kit Strategy Orlando
_NeuroneSCF · Claude · Sesión de modelado de precios y colateral de venta_

---

## RESUMEN EJECUTIVO

Sesión enfocada en resolver el modelo de pricing B2B de NSCF para el canal salones, a raíz de un evento de Patricia en Orlando con ~5 peluquerías amigas (entrega de producto para prueba → potenciales primeros pedidos B2B). Se reestructuró el modelo de costos del pricing v16 → v17, se diagnosticó por qué los precios que Patricia había cargado en Shopify "no cuadraban", y se construyó una estrategia de kits + one-pager de venta. Output principal: lógica de asignación de precios (referencia de Sam) + one-pager imprimible. **No hubo cambios en repos ni infraestructura.** Único cambio físico: logos NSCF copiados a brand assets como referencia.

---

## LOGROS DE LA SESIÓN

### MODELO DE PRICING v17 (RES-Neurone_Pricing v17_B2B_B2C)
Evolución del v16. Se duplicaron y desacoplaron pestañas para dimensionar costos B2B de forma independiente:
- **Marketing B2B** — pestaña duplicada, editable aparte del B2C
- **Logística B2B** — pestaña duplicada, editable aparte del B2C
- **Catálogo B2B+** — duplicado del Catálogo B2B con fórmula K completa (5 componentes): `=J + Logística B2B + Marketing B2B + TRANSACCION + OPERATIVOS`
- TRANSACCION y OPERATIVOS siguen compartidos entre B2B y B2C (correcto)
- Bonus: corregidos 3 errores #VALUE! heredados del v16 en SKU_MAPPING

### DIAGNÓSTICO RAÍZ — por qué los precios de Patricia "no cuadraban"
- El **Marketing B2B estaba calcado del B2C** ($6.74/ud, incluía ~$1,000/mes de ads Meta/TikTok) — sin sentido para un canal que se adquiere en persona vía educación/demos.
- Ese bloque de marketing era el verdadero culpable, no los precios de Patricia.
- **Decisión:** Marketing B2B → ~$1.12/ud (solo infraestructura compartida + muestras). En lanzamiento el costo de marketing efectivo por unidad es ~$0; la infraestructura (~$438/mes) la absorbe el B2C hasta que el B2B llegue a volumen (~438 uds/mes).

### LOGÍSTICA B2B — modelo por peso tipificado
- Tarifa base de trabajo: **$33 / 30 lbs = $1.10/lb** (2Toner / Iván — PENDIENTE confirmar tarifa real y límite de peso del tier).
- Costo de shipping tipificado por categoría de producto (no plano, no por orden promedio):
  - Cat A (1L / peróxido): ~$3.11–3.50/ud
  - Cat B (800g): ~$2.75/ud
  - Cat C (200–400ml): ~$1.00/ud
  - Cat D (90–100ml / tintes): ~$0.55/ud
- Celdas de control editables (tarifa $/lb, pesos, uds por pedido) para recalibrar cuando se confirme 2Toner.
- Pesos por producto son ESTIMACIONES por conversión (Sam no tiene pesos reales y no los tendrá por ahora).

### ESTRATEGIA DE VENTA — Kits + MOV Free Shipping
Estructura estándar de industria: lista de precios + kits con free shipping + kits en promoción. Patricia NO lleva el catálogo completo de 38 SKUs (paraliza decisión).

**MOV (Minimum Order Value) para free shipping:**
- **$250** — para el evento Orlando (conquista del primer pedido)
- **$350** — estándar de operación normal (shipping ~9.4% del revenue, manejable en los 3 tiers)

**Kits de lanzamiento Florida:**
| Kit | Contenido | Precio | Margen aprox |
|---|---|---|---|
| A — Color Starter | 12 tintes + 1L peróxido | $99 | ~21.5% |
| B — Salon System ★ flagship | 12 tintes + 1L peróxido + 2 shampoos + 1 mask | $169 | ~27.7% |
| C — Color Pro | 24 tintes + 2L peróxido + 2 shampoos + 1 mask | $229 | ~21% |
| Dyfensor (add-on) | Shampoo Sulfate-Free 1L | $33.99 (público $49.99) | ~66% standalone |

### REGLAS DE PRODUCTO ESTABLECIDAS
- **Peróxido nunca standalone** — solo dentro de kits (es commodity, casi a costo, pesa mucho).
- **Tintes y peróxido = el gancho.** Shampoos y tratamientos ($28.99–$39.99, márgenes 48–58%) = el negocio real.
- **Dyfensor Sulfate-Free** es el único shampoo "premium" real (+~$3 de costo de compra vs base) → va a su propia card add-on, donde el margen es excelente porque el costo de adquisición ya está pagado.
- Precios individuales fijados: Tinte $8.99 (min 12), Shampoo $28.99, Humit Mask $34.99, Lisothermic $35.99, Kerasin HB $39.99.
- "Developer" como producto individual fue eliminado del one-pager (no es SKU de venta individual).

### ONE-PAGER DE VENTA (colateral Orlando)
- Versión imprimible PDF generada para que Patricia deje impreso en cada salón.
- Identidad visual del store B2B: fondo `#0A0D14`, oro `#B8892A`, texto `#F8FAFB`.
- Header oscuro con logo NSCF correcto (Neurone South & Central Florida — NO "Neurone Cosmetics", NO marca colombiana/mexicana, solo "línea de laboratorio profesional").
- Layout: header dark + cards de kits flotantes + sección de precios individuales + card especial Dyfensor + footer con contacto Patricia.
- Imágenes de producto procesadas (flood-fill / alpha channel) para fondo limpio.
- Iteración de diseño en curso al cierre — versión final imprimible entregada como referencia personal de Sam.

### PITCH PARA PATRICIA (3 preguntas, no catálogo)
- Apertura: "No es un catálogo. Son tres preguntas." → ¿Tu color dura? ¿Tu proveedor responde? ¿Pagas shipping cada vez?
- Argumento: línea de laboratorio profesional, no se consigue en Sally's, entrega a domicilio free shipping, soporte/educación que nadie más da.
- Cierre: "Precio de lanzamiento Florida. Kit B $169, todo lo que necesitas. ¿Lo ponemos en camino el lunes?"
- NO dice descuentos especiales, NO precios por tubo, NO se compara con Wella/Redken.

---

## DATOS DE CONTACTO CONFIRMADOS (NSCF B2B)
- WhatsApp Patricia: **+1 (305) 748-9101**
- Email: **hello-pro@neuronescflorida.com**
- Web B2B (referencia): **pro.neuronescflorida.com** — ⚠️ NO habilitada para vender aún (falta estructura de cuentas)

---

## CAMBIOS FÍSICOS
- Logos NSCF copiados a `brands/NeuroneSCF/assets/` como referencia: `NSCF_Logo_WT_TC.png` (blanco) + `NSCF_Logo_CY_TC.png` (color).
- **Sin cambios en repos, Supabase, EFs ni infraestructura.**

---

## PENDIENTES / A CONFIRMAR (no urgentes)
- **Confirmar con Iván/2Toner** la tarifa real de shipping: ¿$/lb o tarifa plana por tier? ¿límite de peso del tier? ¿hay tercer tier? El modelo v17 funciona con estimación y se recalibra cambiando una celda.
- Estructura de cuentas para habilitar venta en `pro.neuronescflorida.com`.
- Catálogo NSCF — confirmar con PO si Kerasin HB 400ml va en B2B (ya estaba en carryover).

---

_Sesión cerrada: 2026-05-30 · pricing B2B + kit strategy. Output = referencia personal de Sam, sin impacto en repos._

---
---

# Session Log — 2026-05-29 (Final)
_NeuroneSCF + UNRLVL Ecosystem · Claude Sonnet 4.6 + Claude Code_

---

## RESUMEN EJECUTIVO

Sesión de infraestructura intensiva full-day. Dos grandes bloques: (1) correcciones Shopify MCP + operaciones tienda NSCF incluyendo primera orden real despachada (#1017 Maria E Thompson), (2) construcción completa del portal de fulfillment para Iván/2toner Express end-to-end. Al final de sesión: CLAUDE.md para los 4 repos principales, fix lab_jobs.status, y agenda de mañana cargada.

---

## LOGROS DE LA SESIÓN

### SHOPIFY MCP — DESBLOQUEADO AL 100%
- OAuth callback implementado en `nscf-fulfillment-portal` — token auto-guarda en Supabase
- Token B2C actualizado: `shpat_7fe5...` (OAuth real, reemplaza atkn_ inválido)
- GRANT fix aplicado: `public.shopify_stores` VIEW requería permisos explícitos de escritura
- `write_orders` scope agregado a UNRLVL-MCP app (versión nscf-kiosk-8)
- Pickup deshabilitado en Vizos Salón (B2C checkout)
- Delivery deshabilitado en Vizos Salón (Kiosk)

### ORDEN #1017 — MARIA E THOMPSON ✅ DESPACHADA
- Shipping address corregida: 20438 59TH LN N, Loxahatchee FL 33470
- Tags: `delivery-corrected`, `free-shipping-applied`
- Fulfillment creado, carrier corregido USPS → UPS (tracking 1Z98Y4W70394794994)
- 4 emails enviados: Iván + Ops + Patricia + cliente (email_errors: [])
- Shopify fulfillment actualizado + cliente notificada con link UPS correcto

### PORTAL FULFILLMENT IVÁN (nscf-fulfillment-portal v2)
End-to-end verificado y en producción.

| Componente | Estado |
|---|---|
| `nscf-fulfillment-portal` v2 | ✅ ACTIVE — Supabase EF |
| `nscf-mailer` v17 | ✅ ACTIVE — botón → dispatch.neuronescflorida.com/portal |
| `nscf_fulfillment_log` + archive | ✅ tablas creadas |
| Cron archivado 3 meses | ✅ activo |
| Proxy `nscf-dispatch` | ✅ Vercel live + DNS Cloudflare CNAME activo |
| `dispatch.neuronescflorida.com` | ✅ LIVE |

Flujo verificado: Pantalla 1 → confirmar → tracking → 4 emails → Shopify → Pantalla 3.
Corrección de tracking + solicitud de reporte CSV también verificados.

### INFRAESTRUCTURA FINAL DEL DÍA
- **CLAUDE.md** creados y pusheados a 4 repos: ImageLab, CopyLab, Orchestrator, unrlvl-context
- **`lab_jobs.status`** CHECK constraint — `published` agregado
- **Kiosk fix** — descuento oculto para max_discount_pct=0, solo Patricia ve el slider
- **RES-Neurone_Pricing_v16_B2B_B2C.xlsx** — B2C+B2B separados con fórmulas vivas entregado
- **2toner Express** registrado como Fulfillment Service en Shopify B2C
- **Professor** — 8 learnings nuevos submitidos (pending_approval)

---

## AGENDA MAÑANA (2026-05-30)

### PRIORIDAD 1 — IID Jobs + Pipeline UnrealvilleStudio + LucienSael
- Revisar jobs de agents IID que quedaron sin publicarse
- Publicar los que no hayan perdido vigencia
- Crear sistema de publicaciones orgánicas y posts periódicos para UnrealvilleStudio y LucienSael
- Usar el flujo completo del ecosistema: Orchestrator → CopyLab + ImageLab → Meta MCP
- Dejar en producción

### PRIORIDAD 2 — VideoLab Launch
- Integrar Kling.ai token
- Lanzar VideoLab en producción
- Si hay tiempo: cargar grabaciones de Patricia para generar su voice genome en VoiceLab

---

## PENDIENTES CARRYOVER (no urgentes mañana)

- NSCF `meta_accounts` — page_id + ig_user_id + ad_account_id + token
- TikTok Pixel duplicado NSCF
- Meta MCP fix fb_get_page_insights métricas deprecadas
- Portal Iván sprint 2 — dashboard pendientes + UPS API
- Klaviyo flows NSCF — 4 flows bilingüe
- Catálogo NSCF — confirmar con PO si Kerasin HB 400ml va en B2B
- Ayra Sprint 0 — deadline 5 Jun 🔴
- luciensael.com DNS deploy

---

## PROFESSOR — 8 LEARNINGS NUEVOS (pending_approval)
SHOPIFY_INFRA ×5 · NSCF_OPS ×1 · SUPABASE_INFRA ×1 · ECOSYSTEM_INFRA ×1

---

_Sesión cerrada: 2026-05-29 · 23:30 UTC_
