# Session Log — NeuroneSCF
_Actualizado: 2026-05-27_

---

## SESIÓN 2026-05-27 — Fulfillment emails + Taxes + B2B audit

### nscf-mailer v15 — fulfillment email final
- Precios eliminados del email de despacho (Ivan no necesita ver lo que paga el cliente)
- Destinatarios fulfillment: TONER + OPS + SAM + PO (4 permanentes)
  - 2tonerexpress@gmail.com
  - ops@neuronescflorida.com
  - sam@unrealvillestudio.com
  - patriciaosorio@neuronescflorida.com
- Email muestra: número orden · nombre+dirección+teléfono cliente · productos+SKU+cantidad · nota · link Shopify
- Test real enviado y confirmado ✅

### Taxes NSCF B2C — completado
- Shopify Tax: Active ✅
- Florida registrada con certificate 16-8020110037-9 (Prestige Beauty Global Distribution Inc) ✅
- 41 productos ya tenían taxonomía correcta — no requirió acción ✅
- Shopify Tax maneja rates por condado automáticamente
- **Pendiente PO:** enrollarse en e-Services Florida DOR (floridarevenue.com/taxes/eservices)

### B2B — PRO store audit (pro.neuronescflorida.com)
- 73 productos activos · 5 colecciones · tema custom v1 deployado
- Plan Basic · 2 clientes · 0 órdenes históricas
- Inventario: ~60% en placeholder "11 unidades" · algunos en 0
- **Decisión pendiente PO:** split de inventario B2C vs B2B
- **Shipping recomendado:** Free shipping +$300 · flat $20 por debajo
- **Bloqueantes para vender:**
  - Inventario real no sincronizado
  - Clientes B2B no registrados
  - Verificar si tienda está protegida con contraseña
  - Payment methods B2B (net terms, etc.) sin verificar
  - Shipping zones no configuradas

---

## SESIÓN 2026-05-25 — Taxes + Judge.me

### Taxes completado (ver arriba)

### Judge.me v28
- CSS-only overrides (sin MutationObserver)
- **Pendiente:** configurar colores texto reseña desde Judge.me dashboard

---

## SESIÓN 2026-05-22 — Urgent Tasks

### Kiosk nscf-kiosko-draft v10
- Shipping $0 Kiosk Pickup · descuento <3 items: 15%, ≥3: 40%
- Frontend App.jsx deployado ✅

### Embajadoras
| ID | Salón | Email | Comisión |
|----|-------|-------|----------|
| vizos-patricia | vizos | patriciaosorio@neuronescflorida.com | 10% |
| vizos-laura | vizos | ops@neuronescflorida.com | 8% |
| yts-nm-diana | yts-nm | dianaespinosa_8709@icloud.com | 8% |
| yts-nm-mariana | yts-nm | rodriguezgumariana@gmail.com | 8% |
| yts-nm-monica | yts-nm | monica.gu0822@gmail.com | 8% |
| yts-nm-daniela | yts-nm | daniglowvibes@gmail.com | 8% |
| yts-nm-odalys | yts-nm | pendiente | 8% |

Pools: Vizos (PO+Laura) · YTS-NM (resto) — independientes

### Fulfillment 2toner
- EF watcher v2 + processor v1 · pg_cron #31 · webhook ID 2211809558855
- Órdenes kiosk excluidas

### nscf-mailer v15
- FROM: "Neurone South & Central Florida"
- Firma: Patricia Osorio · Neurone South & Central Florida · neuronescflorida.com
- Resend verificado ✅

### Shopify tema
- TikTok pixel duplicado eliminado ✅
- Judge.me widget nativo integrado
- Kiosk app renombrada "NSCF Kiosk" ✅
- Shopify Payments: daily · Prestige Beauty ✅
- SEO: páginas prueba eliminadas ✅

---

## PENDIENTES

| Item | Prioridad |
|------|-----------|
| B2B: inventario real + shipping zones + clientes | 🔴 |
| B2B: verificar protección contraseña | 🔴 |
| Florida e-Services DOR (PO) | 🟡 |
| Judge.me: colores texto desde dashboard | 🟡 |
| Fix deprecated API DiscountAutomaticFreeShipping — Jul 1 | 🔴 |
| Reembolso $10 órdenes kiosk — PO decide | 🟡 |
| Emails: Odalys + CW + EW ambassadors | 🟡 |
| Pool grupal: confirmar con PO | 🟡 |
| Klaviyo 4 flows | 🟡 |
| WABA setup (Laura/Patricia pendiente) | 🟡 |
| Meta domain verification | 🟡 |
| Search Console: re-indexar URLs | 🟢 |

---

## EFs activas

| EF | Versión |
|----|---------|
| nscf-kiosko-draft | v10 |
| nscf-fulfillment-watcher | v2 |
| nscf-fulfillment-processor | v1 |
| nscf-mailer | v15 |
