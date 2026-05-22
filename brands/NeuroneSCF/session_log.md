# Session Log — NeuroneSCF
_Actualizado: 2026-05-22_

---

## SESIÓN 2026-05-22 — Urgent Tasks Kiosk + Fulfillment + Emails

### Cambios ejecutados

#### Kiosk — nscf-kiosko-draft
- **v2:** Shipping forzado a $0 "Kiosk Pickup" — elimina $10 automático de Florida
- **v3:** Descuento dos niveles — <3 productos max 15%, ≥3 productos max 40%
- **Frontend App.jsx:** `maxDiscount` dinámico + `useEffect` clamp deployado en Vercel ✅

#### Embajadoras — DB nscf_embajadoras
- `vizos-patricia` → email: patriciaosorio@neuronescflorida.com · max_discount: 40%
- `vizos-laura` → NUEVA · email: ops@neuronescflorida.com · salon: vizos · comisión: 8%
- `yts-nm-mariana` → email: rodriguezgumariana@gmail.com
- `yts-nm-monica` → email: monica.gu0822@gmail.com
- `yts-nm-diana` → email: dianaespinosa_8709@icloud.com
- `yts-nm-daniela` → MOVIDA desde yts-ew · email: daniglowvibes@gmail.com
- Eliminados: yts-cw-laura · yts-ew-laura · yts-nm-laura · yts-nm-patricia · yts-ew-daniela
- Todas las embajadoras YTS → max_discount_pct = 0

#### Comisiones — tablas nuevas
- `nscf_commissions` — registro por venta · ambassador_id · sale_amount · commission_rate · month_key
- `nscf_salon_pool_config` — 2% pool los 4 salones · split equal
- `nscf_pool_payouts` — liquidación mensual

#### Grupos de pool definidos
- **Vizos:** Patricia (10%) + Laura (8%) — pool 2% ventas Vizos únicamente
- **YTS-NM:** Diana + Mariana + Mónica + Daniela + Odalys — pool 2% ventas NM únicamente
- Los grupos son financieramente independientes — no se cruzan

#### Fulfillment 2toner Express
- Tabla `nscf_fulfillment_queue` creada
- EF `nscf-fulfillment-watcher` v2 — webhook orders/paid · kiosk → comisión · web → cola 1h
- EF `nscf-fulfillment-processor` v1 — pg_cron cada minuto · verifica cancelaciones · llama mailer
- Webhook Shopify `orders/paid` ID: 2211809558855
- pg_cron job #31 activo
- Email a: 2tonerexpress@gmail.com + ops@neuronescflorida.com (copia)
- Órdenes kiosk (`source: kiosko`) excluidas del fulfillment

#### nscf-mailer v13
- FROM: "Neurone South & Central Florida <noreply@neuronescflorida.com>"
- Tipos activos: ambassador_sale_confirmation · ambassador_month_end · fulfillment_request · pin_reset · pin_reset_verify
- Email por venta: productos · total · comisión esta venta · acumulado personal mes — SIN pool
- Email fin de mes: ventas personales + pool salón + total a percibir
- Firma Opción A en todos los emails: Patricia Osorio / Neurone South & Central Florida / neuronescflorida.com
- Resend dominio neuronescflorida.com verificado en Cloudflare ✅
- Tests enviados y confirmados a ops@neuronescflorida.com ✅

#### Judge.me — snippets/judgeme_widgets.liquid v20
- Botón Write a Review: `<a>` con `href` directo a judge.me/reviews/new
- shop= usa `{{ shop.domain }}` (neuronescflorida.com)
- Parámetros: platform=shopify · product_id · url · title
- Pendiente: Judge.me dashboard — verificar widget "Active" + "Automatic installation"

#### Shopify Payments
- Payout: daily ✅
- Cuenta bancaria: Prestige Beauty Global Distribution ✅

### Pendientes sesión
- [ ] Judge.me dashboard — confirmar widget Active + Automatic
- [ ] Reembolso $10 órdenes #1008/#1009/#1010 — consultar con PO
- [ ] TikTok pixel duplicado — sigue 🔴 (bloquea ads)
- [ ] Fix deprecated API `DiscountAutomaticFreeShipping` — deadline Jul 1 2026
- [ ] Frontend kiosk — visual feedback slider (server-side ya protege)
- [ ] Renombrar app → "NSCF Kiosk" en Partners (hecho por Sam ✅)
- [ ] Emails pendientes: Odalys (yts-nm) · CW · EW ambassadors
- [ ] Klaviyo flows — 4 pendientes (abandoned cart, post-purchase, review, welcome)
- [ ] Pool grupal — confirmar detalles con PO antes de activar payout mensual automático

### Estado EFs relevantes
| EF | Versión | Status |
|----|---------|--------|
| nscf-kiosko-draft | v10 | ACTIVE |
| nscf-fulfillment-watcher | v2 | ACTIVE |
| nscf-fulfillment-processor | v1 | ACTIVE |
| nscf-mailer | v13 | ACTIVE |
