# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-13_

---

## SESIÓN 2026-05-13 — Sam

### TRABAJO REALIZADO

#### 1. TRACKING / PIXELS — EN PROCESO
- Decisión de approach: Meta + TikTok vía apps nativas (Conversions API server-side automático), GA4 vía GTM híbrido
- Decisión de email: usar `xam.moreno.m@gmail.com` para las tres plataformas (sam@unrealvillestudio.com reservado para cuando se vincule Unrealville formalmente a Meta)
- **Instrucciones enviadas a Patricia vía WhatsApp** para que añada a Sam como admin en:
  - Meta Business Manager → Personas → xam.moreno.m@gmail.com
  - TikTok Ads Manager → Gestión de miembros → xam.moreno.m@gmail.com (Admin)
  - Google Analytics → Gestión de acceso → xam.moreno.m@gmail.com (Administrador)
- **Estado:** Esperando que Patricia envíe las invitaciones. Sam acepta y crea los pixels.
- **Pendiente post-acceso:** Crear Meta Pixel, TikTok Pixel, GA4 Measurement ID e instalar vía Shopify channels oficiales

#### 2. SHOPIFY APPS — DIAGNÓSTICO COMPLETO
Apps instaladas en tienda B2C:
- Bundles (Shopify nativa) — instalada ✅ — configurada ✅ (completado hoy)
- Messaging (Shopify) — instalada, email + SMS básico
- Claude_NSCFL_Shop_API, Neurone_API_Token, UNRLVL_Auditor — internas UNRLVL
- Pagos activos: Shop Pay ✅ · Apple Pay ✅ · Google Pay ✅ · USD ✅
- Script tags: 0 — sin ningún pixel instalado actualmente

**Stack pendiente de instalar (priorizado):**
1. Meta Channel (oficial) — pixel + Conversions API — gratis
2. TikTok Channel (oficial) — pixel + catálogo — gratis
3. Google & YouTube (oficial) — GA4 + Google Ads — gratis
4. Afterpay o Sezzle — BNPL, impacto conversión kits — gratis (comisión)
5. Judge.me — Reviews/UGC — free plan para arranque / $15/mes
6. Reconvert — Post-purchase upsell — instalar post-lanzamiento con tráfico
7. Order tracking (17Track o Track123) — instalar cuando haya pedidos reales
8. Klaviyo — cuando volumen de email lo justifique

#### 3. BUNDLES — CONFIGURADO ✅
- Confirmado: 3PL trabaja bajo demanda (Método B) — Bundles nativa aplica
- Comportamiento en checkout: kit como línea principal + desglose de componentes visibles ✅
- Configurado via `productBundleUpdate` API (no `productBundleCreate` — ese crea productos nuevos)

| Kit | SKU | Estado | Componentes |
|---|---|---|---|
| Hydra Boost | NSCF-KT-SDUO | ✅ COMPLETE | SR-004-U + SR-005-U |
| Moisture Recovery | NSCF-KT-101 | ✅ COMPLETE | BCP-003 + BTP-005 + TR-013 |
| Moisture Recovery Plus | NSCF-KT-101P | ✅ COMPLETE | BCP-003 + BTP-005 + TR-013 + TR-016 |
| Restore Therapy | NSCF-KT-102 | ✅ COMPLETE | BCP-011 + BTP-010 + TR-015 |
| Restore Therapy Plus | NSCF-KT-102P | ✅ COMPLETE | BCP-011 + BTP-010 + TR-015 + TR-016 |
| Restore & Shield | NSCF-KT-102T | ✅ COMPLETE | BCP-011 + BTP-010 + TR-015 + TR-021 |
| Blonde Guard | NSCF-KT-103 | ✅ COMPLETE | BCP-001 + BTP-007 + TR-015 |
| Blonde Guard Plus | NSCF-KT-103P | ✅ COMPLETE | BCP-001 + BTP-007 + TR-015 + TR-016 |
| Perfect Blonde | NSCF-KT-103V | ✅ COMPLETE | BCP-001 + BTP-007 + BTP-001 |
| Perfect Blonde Plus | NSCF-KT-103VP | ✅ COMPLETE | BCP-001 + BTP-007 + BTP-001 + TR-016 |
| Moisture & Shine | NSCF-KT-101T | ⏳ PENDIENTE | Resplander Shine no existe en catálogo — investigar mañana |
| S.O.S Rescue System | NSCF-KT-104 | ⏳ PENDIENTE | Verificar tamaño DY Fazza: descripción dice 400ml/$49.99 pero SKU NSCF-TR-013 es 200ml/$44.99 |

#### 4. SAVINGS BADGE EN CART — LIVE ✅
- Metafield `neurone.kit_savings` creado (single_line_text_field, PUBLIC_READ)
- Definition ID: `gid://shopify/MetafieldDefinition/386818343239`
- Valores aplicados a los 10 kits configurados
- `templates/cart.liquid` actualizado — página del carrito completamente bilingüe (ES/EN)

**Badge behavior:**
- Solo aparece en productos kit (los que tengan el metafield)
- Productos individuales no lo muestran
- ES: `Ahorras $XX.XX · Envío gratis incluido`
- EN: `You save $XX.XX · Free shipping included`
- Color: #D4622A (naranja Neurone) con ícono de regalo

**Valores de ahorro por kit:**
| Kit | Ahorro |
|---|---|
| Hydra Boost (NSCF-KT-SDUO) | $19.99 |
| Moisture Recovery (NSCF-KT-101) | $44.98 |
| Moisture Recovery Plus (NSCF-KT-101P) | $89.97 |
| Restore Therapy (NSCF-KT-102) | $44.98 |
| Restore Therapy Plus (NSCF-KT-102P) | $79.97 |
| Restore & Shield (NSCF-KT-102T) | $84.97 |
| Blonde Guard (NSCF-KT-103) | $49.98 |
| Blonde Guard Plus (NSCF-KT-103P) | $84.97 |
| Perfect Blonde (NSCF-KT-103V) | $64.98 |
| Perfect Blonde Plus (NSCF-KT-103VP) | $94.97 |

---

## ESTADO GENERAL CRO — PRE-LANZAMIENTO

| Área | Estado |
|---|---|
| Tracking Meta Pixel | ⏳ Esperando acceso Patricia |
| Tracking TikTok Pixel | ⏳ Esperando acceso Patricia |
| Tracking GA4 | ⏳ Esperando acceso Patricia |
| Bundles checkout breakdown | ✅ 10/12 kits activos |
| Bundles KT-101T + KT-104 | ⏳ Investigar mañana |
| Savings badge en cart (bilingüe) | ✅ Live en producción |
| BNPL (Afterpay/Sezzle) | ❌ Pendiente instalar |
| Reviews (Judge.me) | ❌ Pendiente instalar |
| Post-purchase upsell (Reconvert) | ❌ Post-lanzamiento |
| Order tracking | ❌ Post-lanzamiento |
| Verificación dominio Meta (DNS TXT Cloudflare) | ❌ Pendiente |
| Instagram → Facebook Page link | ❌ Pendiente (Patricia) |

---

## NOTAS TÉCNICAS

### Shopify Bundles API
- Usar `productBundleUpdate` con `productId` del kit existente para kits ya creados
- `productBundleCreate` genera producto nuevo — no usar para kits existentes
- Input requerido por componente: `productId` + `quantity` + `optionSelections[componentOptionId, name, values]`
- Verificar estado: `node(id: "gid://shopify/ProductBundleOperation/XXX")` → status `COMPLETE` = OK

### Savings Badge
- Metafield definition ID: `gid://shopify/MetafieldDefinition/386818343239`
- Namespace: `neurone` / Key: `kit_savings`
- Acceso en Liquid: `item.product.metafields.neurone.kit_savings.value`
- Locale check: `request.locale.iso_code == 'en'`

### Tienda — Idiomas
- ES: primario ✅ publicado
- EN: no primario ✅ publicado
- Theme activo: `gid://shopify/OnlineStoreTheme/192983662919` — Neurone Custom Theme v1.0
