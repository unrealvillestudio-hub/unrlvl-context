# SESSION LOG — NeuroneSCF B2B
_Actualizado: 2026-06-06_

---

## NOVEDADES ESTA SESIÓN (2026-06-06) — Fulfillment Infra Fix + QR

### ✅ COMPLETADO

#### 🔴 FIX CRÍTICO — Cron del Fulfillment Processor estaba muerto
- **Causa raíz:** `pg_cron` job 31 (`nscf-fulfillment-processor-1min`) usaba `current_setting('app.supabase_url')` y `current_setting('app.service_role_key')` — ambos parámetros **NULL/inexistentes** en la DB → el job fallaba **cada minuto** desde su creación con `ERROR: unrecognized configuration parameter "app.supabase_url"`.
- **Impacto:** `nscf_fulfillment_queue` nunca se procesaba. Las órdenes web entraban (watcher OK) pero **nunca salían a Iván**. Ninguna orden web había llegado a 2toner automáticamente.
- **Fix definitivo:** reescrito el comando del job 31 vía `cron.alter_job` con **URL hardcodeada** (`https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/nscf-fulfillment-processor`) y **sin Authorization header** (el processor tiene `verify_jwt=false`). Patrón idéntico al job 30 (copylab-processor) que sí funcionaba. **No es parche** — es el patrón correcto.
- **Verificado:** primer tick post-fix (21:54 UTC) pasó de `failed` → `succeeded`. Cola vaciada.

#### Reconciliación de órdenes atascadas
| Orden | Cliente | Tipo | Acción |
|---|---|---|---|
| #1017 | Maria E Thompson | Web (enviada/entregada 29-may) | Fila de cola marcada `dispatched` con nota de auditoría — no reprocesar. Log ya existía. |
| #1020 | Suzanne Lansky | **Web/shipping real** | Recuperada automáticamente por el cron revivido (21:54:01). Fila en `nscf_fulfillment_log` creada con token → Iván notificado. Pendiente que Iván confirme + meta tracking. |
| #1021 | Krystal Stringer | **Kiosk Pickup** | NO requiere a Iván. No se tocó. Sam la había devuelto a unfulfilled; no es necesario. |
| #1022, #1023 | — | Kiosk Pickup | No aplican a flujo de despacho. |

#### QR dorado neuronescflorida.com (para Patricia)
- Generado con color de marca exacto **#AD9614** (extraído de los QR de reviews ya impresos), no dorados aproximados.
- `ERROR_CORRECT_H` (30%), 984×984 px. Verificado con `cv2.QRCodeDetector` → decodifica a `https://neuronescflorida.com`.
- File: `NSCF_QR_neuronescflorida_dorado.png`

---

## MODELO DE FULFILLMENT NSCF (documentado — referencia permanente)

**Flujo 100% automático. Sam NO marca fulfilled manualmente en Shopify nunca.**

1. Cliente web paga → webhook `orders/paid` (`nscf-fulfillment-watcher`) encola la orden con **delay de 1h** (`DELAY_MS=3600000`). Este es el "tiempo de espera" — ocurre ANTES de avisar a Iván, automáticamente.
2. Pasada 1h → `nscf-fulfillment-processor` (cron 1min) toma la cola, crea fila en `nscf_fulfillment_log` con token y avisa a Iván vía `nscf-mailer`.
3. Iván abre su portal (`nscf-fulfillment-portal`): confirma recibido → mete carrier + tracking.
4. Al meter tracking, el portal dispara **4 notificaciones** (Iván / Ops / PO / cliente) + crea el **fulfillment en Shopify** (`pushShopify`).

- **El fulfillment es el ÚLTIMO paso (lo hace Iván), no el primero.**
- **Kiosk Pickup** (`source='kiosko'`) NO entra a este flujo — va por rama de comisión embajadora. En Shopify se distingue: web = "Fulfill by: [fecha] - Florida"; kiosk = "Kiosk Pickup".

---

## DECISIONES ARCHIVADAS (sesión 2026-06-06)
- Cron pg_cron: **nunca** usar `current_setting()` sin verificar que el setting existe. Preferir URL hardcodeada. Revisar siempre `cron.job_run_details` tras editar un job.
- QR NSCF: dorado de marca = **#AD9614**. Verificar escaneo con `cv2` antes de entregar.
- SMA `/api/export`: el secret va por header `x-export-secret`, no por query param.

---

## DEUDA TÉCNICA NUEVA (no urgente)
- [ ] `nscf-mailer`: campo `carrier` en `emails_sent` guardó "USPS" hardcodeado cuando el envío real de #1017 fue UPS. Bug cosmético de auditoría, no afecta entregas.
- [ ] Verificar formalmente que el webhook `orders/paid` esté registrado y sano en Shopify (la #1021 no entró a cola — posible fallo puntual del webhook o era kiosk; confirmar).
- [ ] SMA export endpoint: documentar header `x-export-secret` en CAPABILITIES.

---

## NOVEDADES SESIÓN ANTERIOR (2026-05-30) — Pricing v17 + Kits B2B

### ✅ COMPLETADO

#### Pricing v17 — B2B Marketing Cost Fix
- Marketing B2B: **$6.74 → $1.12/ud** (ads a $0 durante lanzamiento B2B, solo infraestructura + muestras físicas $50/mes)
- Shampoos base: **$28.99** (48-50% margen) ✅
- Peróxidos corregidos: **$13.99–$15.99** (estaban bajo costo)
- Masks/Treatments: **$34.99–$39.99** ✅
- DYFENSOR Sulfate Free: **$33.99** premium, no incluido en kits base
- Peróxido standalone: descartado como SKU ($10.19 costo vs $9.99 market) — solo dentro de kits
- File: `RES-Neurone_Pricing_v17_B2B_B2C.xlsx`

#### Kit Structure B2B — 3 kits principales para evento Orlando
| Kit | Precio | Margen | Contenido |
|---|---|---|---|
| A — Color Starter | $99 | 21.5% | 12 tintes + 1L peróxido |
| B — Salon System ★ | $169 | 27.7% | 12 tintes + 1L peróxido + 2 shampoos + 1 mask |
| C — Color Pro | $229 | 21% | 24 tintes + 2L peróxido + 2 shampoos + 1 mask |
| Dyfensor Add-on | $33.99 | ~50% | Dyfensor S-Free 1L (retail $49.99) |

**Regla B2B**: Free shipping incluido en todos los kits (MOV $169 satisfecho por Kit B).

#### Pitch de ventas Patricia — Evento Orlando
- 3 preguntas de apertura definidas
- Argumento de diferenciación: exclusividad, no en Sally's, delivery a domicilio, soporte
- Reglas del evento: no catálogo completo, no "precio especial", no hablar por tubo individual, Kit B como anchor

#### One-Pager B2B — NSCF Kit Pricing
**Versión PRINT (Legal 8.5×14")**
- Logo real NSCF_Logo_WT_TC.png embebido como base64
- 2×2 grid de kit cards + sección pricing individual
- Kit A/C: accent **cyan #2A8CC4** (entry/tech)
- Kit B/Dyfensor: accent **gold #B8892A** (flagship/premium)
- Tech badges: Quinoa Protein, Nano Tribology, Formula 1+1½, etc.
- WhatsApp CTA card con QR → wa.me/13057489101
- File: `NSCF_Kit_Pricing_PRINT_v2.html`

**Versión DARK (680px, organic sharing)**
- Fondo #0A0D14, cards #0D1117
- Gradient bar cyan→gold como transición de marca
- Kit A/C: precios y accents en #7DC8EC (cyan claro)
- Kit B/Dyfensor: gold conservado como premium
- mix-blend-mode:screen en imágenes de producto
- QR invertido (dots dorados sobre fondo negro)
- Order note: border-left cyan + fondo rgba(42,140,196,.06)
- File: `NSCF_Kit_Pricing_DARK.html`

---

## DECISIONES ARCHIVADAS (previas)

- **Cyan #2A8CC4** = accent secundario NSCF (del logotype) — Kit A, Kit C, elementos entry/tech
- **Gold #B8892A** = accent primario — flagship, precios premium, Dyfensor
- **Legal (8.5×14")** = formato print para one-pager B2B
- **Dark version** = solo organic sharing (WhatsApp/friends), no Klaviyo aún
- **Peróxido** no vender standalone — solo dentro de kits
- **Marketing B2B** = $0 ads en fase lanzamiento presencial, infraestructura compartida con B2C

---

## PENDIENTE NSCF

- [ ] PDF final via CC con Playwright (1 página garantizada)
- [ ] Commit ambos HTML al repo BlueprintLab: `blueprint/brands/neuronescf/assets/`
- [ ] Revisar si hay más productos B2B que mostrar
- [ ] Patricia confirma asistencia y fecha evento Orlando
- [ ] NSCF TikTok pixel duplicate → fix antes de ads
- [ ] Klaviyo flows: 4 flows bilingüe
- [ ] unrealvillestudio.com /privacy + /data-deletion
- [ ] pro.neuronescflorida.com — portal online (coming soon)

---

## SMA — Sin novedades
Export endpoint requiere header `x-export-secret` (no query param). Sin actividad nueva de Laura/Paty que registrar — sesión 2026-06-06 fue 100% infraestructura.
Pendiente Patricia: vinculación Instagram→Facebook Page + tokens de API para orchestrator.

---
_Unreal>ille · NeuroneSCF · 2026-06-06_
