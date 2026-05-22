# Session Log — NeuroneSCF
_Actualizado: 2026-05-22_

---

## SESIÓN 2026-05-22 — Urgent Tasks NSCF Shopify

### Kiosk — nscf-kiosko-draft
- **v2:** Shipping $0 "Kiosk Pickup" — elimina $10 automático Florida
- **v3:** Descuento dos niveles — <3 productos max 15%, ≥3 productos max 40%
- **Frontend App.jsx:** `maxDiscount` dinámico + `useEffect` clamp — deployado Vercel ✅

### Embajadoras — DB nscf_embajadoras
- `vizos-patricia` → email: patriciaosorio@neuronescflorida.com · max_discount: 40%
- `vizos-laura` → NUEVA · email: ops@neuronescflorida.com · salon: vizos · comisión: 8%
- `yts-nm-mariana` → email: rodriguezgumariana@gmail.com
- `yts-nm-monica` → email: monica.gu0822@gmail.com
- `yts-nm-diana` → email: dianaespinosa_8709@icloud.com
- `yts-nm-daniela` → MOVIDA desde yts-ew · email: daniglowvibes@gmail.com
- Eliminados: yts-cw-laura · yts-ew-laura · yts-nm-laura · yts-nm-patricia · yts-ew-daniela
- Todas las embajadoras YTS → max_discount_pct = 0

### Grupos de pool (financieramente independientes)
- **Vizos:** Patricia (10%) + Laura (8%) — pool 2% ventas Vizos
- **YTS-NM:** Diana + Mariana + Mónica + Daniela + Odalys — pool 2% ventas NM

### Tablas nuevas
- `nscf_commissions` — registro por venta
- `nscf_salon_pool_config` — 2% los 4 salones
- `nscf_pool_payouts` — liquidación mensual

### Fulfillment 2toner Express
- Tabla `nscf_fulfillment_queue` creada
- EF `nscf-fulfillment-watcher` v2 — webhook orders/paid · kiosk→comisión · web→cola 1h
- EF `nscf-fulfillment-processor` v1 — pg_cron cada minuto
- Webhook Shopify `orders/paid` ID: 2211809558855 · pg_cron job #31
- Email a: 2tonerexpress@gmail.com + ops@neuronescflorida.com
- Órdenes kiosk excluidas del fulfillment 2toner

### nscf-mailer v13
- FROM: "Neurone South & Central Florida <noreply@neuronescflorida.com>"
- Email por venta: productos · total · comisión esta venta · acumulado personal mes
- Email fin de mes: ventas personales + pool salón + total a percibir
- Firma Opción A: Patricia Osorio / Neurone South & Central Florida / neuronescflorida.com
- Resend dominio neuronescflorida.com verificado ✅
- Tests enviados y confirmados a ops@ ✅

### Shopify tema — Judge.me
- snippets/judgeme_widgets.liquid v28 — CSS-only overrides, stars naranjas, texto reseña light
- sections/nc-product-detail.liquid — widget nativo Judge.me, CTA condicional bajo imagen sin card
- layout/theme.liquid — TikTok pixel duplicado eliminado ✅ (era el problema de ads)
- Judge.me texto reseña: pendiente configurar colores desde dashboard Judge.me

### SEO
- Páginas de prueba eliminadas: `neurone-cosmetica-collection-page` + `neurone-cosmetica-homepage-tienda-14-3-2026`
- Search Console: 3 issues de redirección y 2 crawled-not-indexed pendientes de re-indexación manual

### Shopify Payments
- Payout: daily ✅ · Cuenta: Prestige Beauty Global Distribution ✅

### App kiosk renombrada
- "NSCF Kiosk" (hecho por Sam en Shopify Partners) ✅

---

## PENDIENTES

| Item | Prioridad |
|------|-----------|
| Judge.me: configurar colores texto reseña desde su dashboard | 🟡 |
| Reembolso $10 órdenes #1008/#1009/#1010 | PO decide |
| TikTok pixel: verificar que el duplicado eliminado no afecte tracking | 🟡 |
| Fix deprecated API DiscountAutomaticFreeShipping — deadline Jul 1 | 🔴 |
| Emails pendientes: Odalys + CW + EW ambassadors | 🟡 |
| Pool grupal: confirmar detalles con PO | 🟡 |
| Klaviyo 4 flows: abandoned cart, post-purchase, review, welcome | 🟡 |
| Search Console: re-indexar URLs correctas | 🟢 |

---

## EFs activas

| EF | Versión | Status |
|----|---------|--------|
| nscf-kiosko-draft | v10 | ACTIVE |
| nscf-fulfillment-watcher | v2 | ACTIVE |
| nscf-fulfillment-processor | v1 | ACTIVE |
| nscf-mailer | v13 | ACTIVE |
