# Session Log — NeuroneSCF
_Actualizado: 2026-05-25_

---

## SESIÓN 2026-05-25 — Taxes + continuación Judge.me

### Taxes — Shopify
- Shopify Tax: **Active** ✅ (ya estaba activo, plan Basic lo incluye)
- Florida registrada en "States you're collecting in" ✅
- Certificate: Prestige Beauty Global Distribution Inc · 16-8020110037-9 · aprobado ✅
- Tax liability insights: "You're all set" ✅
- Tax rate management: todos los 41 productos ya tenían taxonomía asignada ✅
  - Hair Treatments: 24 productos
  - Shampoo & Conditioner: 6
  - Hair Serums: 4
  - Hair Color: 5
  - Hair Styling Products: 2
  - Hair Loss Treatments: 2
  - Hair Care Kits: 1
- Shopify Tax maneja rates por condado automáticamente (Florida: 6% estado + condado según ZIP)
- **Pendiente PO:** enrollarse en e-Services Florida DOR para remitir taxes electrónicamente (floridarevenue.com/taxes/eservices)

### Judge.me — snippets/judgeme_widgets.liquid v28
- CSS-only overrides (sin MutationObserver — causaba crash)
- Stars naranjas · texto reseña forzado a light · botón naranja
- **Pendiente:** configurar colores desde Judge.me dashboard para solución definitiva sin CSS overrides

### SEO — páginas de prueba eliminadas (sesión anterior)
- neurone-cosmetica-collection-page ✅
- neurone-cosmetica-homepage-tienda-14-3-2026 ✅
- Search Console: re-indexar URLs correctas manualmente

---

## SESIÓN 2026-05-22 — Urgent Tasks NSCF Shopify

### Kiosk — nscf-kiosko-draft v10
- Shipping $0 "Kiosk Pickup" · descuento dos niveles (<3 items: 15%, ≥3 items: 40%)
- Frontend App.jsx deployado en Vercel ✅

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

Eliminados: yts-cw-laura · yts-ew-laura · yts-nm-laura · yts-nm-patricia · yts-ew-daniela

### Pools (financieramente independientes)
- Vizos: Patricia + Laura · 2% ventas Vizos
- YTS-NM: Diana + Mariana + Mónica + Daniela + Odalys · 2% ventas NM

### Tablas DB
- nscf_commissions · nscf_salon_pool_config · nscf_pool_payouts ✅

### Fulfillment 2toner Express
- EF nscf-fulfillment-watcher v2 · nscf-fulfillment-processor v1
- Webhook orders/paid ID: 2211809558855 · pg_cron job #31
- Email: 2tonerexpress@gmail.com + ops@neuronescflorida.com
- Órdenes kiosk excluidas

### nscf-mailer v13
- FROM: "Neurone South & Central Florida <noreply@neuronescflorida.com>"
- Firma: Patricia Osorio / Neurone South & Central Florida / neuronescflorida.com
- Resend dominio verificado ✅ · Tests confirmados ✅

### Tema Shopify
- TikTok pixel duplicado eliminado ✅
- Judge.me widget nativo integrado en product detail
- App kiosk renombrada "NSCF Kiosk" ✅
- Shopify Payments: daily · Prestige Beauty Global Distribution ✅

---

## PENDIENTES

| Item | Prioridad |
|------|-----------|
| Judge.me: configurar colores texto reseña desde dashboard | 🟡 |
| Florida e-Services DOR enrollment (PO) | 🟡 |
| Reembolso $10 órdenes #1008/#1009/#1010 | PO decide |
| Fix deprecated API DiscountAutomaticFreeShipping — deadline Jul 1 | 🔴 |
| Emails: Odalys + CW + EW ambassadors | 🟡 |
| Pool grupal: confirmar detalles con PO | 🟡 |
| Klaviyo 4 flows | 🟡 |
| Search Console: re-indexar URLs | 🟢 |
| Meta domain verification (pendiente desde SMA) | 🟡 |
| WABA setup pendiente (Laura/Patricia) | 🟡 |

---

## EFs activas

| EF | Versión |
|----|---------|
| nscf-kiosko-draft | v10 |
| nscf-fulfillment-watcher | v2 |
| nscf-fulfillment-processor | v1 |
| nscf-mailer | v13 |
