# SESSION LOG — Neurone South & Central Florida
_Última actualización: 2026-05-13_

---

## SESIÓN 2026-05-13 — Sam

### COMPLETADO HOY

#### 1. TRACKING — CONFIGURADO ✅
- **TikTok Pixel** instalado en `layout/theme.liquid` — ID: `D832THJC77UATASL0OO0`
- **Snippet `tiktok-events.liquid`** creado e incluido — eventos activos:
  - `PageView` — todas las páginas ✅
  - `ViewContent` — PDPs ✅
  - `AddToCart` — botón ATC ✅
  - `Search` — resultados búsqueda ✅
  - `InitiateCheckout` — botón checkout en carrito ✅
  - `Identify` — clientes logueados (SHA-256 hashed) ✅
  - `Purchase` — cubierto server-side vía TikTok Events API (app oficial conectada, pendiente aprobación contrato)
- **TikTok app** conectada + ad account vinculado — esperando aprobación y contrato
- **Sam añadido** como admin en Meta Business Manager y TikTok Ads Manager (Patricia completó)
- **GA4** — Sam creó la propiedad. Measurement ID pendiente de instalar en Shopify
- **Meta Pixel** — acceso recibido. Crear pixel e instalar pendiente (próxima sesión)

#### 2. BUNDLES — 10/12 CONFIGURADOS ✅
- Configurados via `productBundleUpdate` API
- Método: 3PL bajo demanda (Método B) ✅
- Checkout muestra: kit como línea principal + desglose de componentes visibles ✅

| Kit | SKU | Estado |
|---|---|---|
| Hydra Boost | NSCF-KT-SDUO | ✅ |
| Moisture Recovery | NSCF-KT-101 | ✅ |
| Moisture Recovery Plus | NSCF-KT-101P | ✅ |
| Restore Therapy | NSCF-KT-102 | ✅ |
| Restore Therapy Plus | NSCF-KT-102P | ✅ |
| Restore & Shield | NSCF-KT-102T | ✅ |
| Blonde Guard | NSCF-KT-103 | ✅ |
| Blonde Guard Plus | NSCF-KT-103P | ✅ |
| Perfect Blonde | NSCF-KT-103V | ✅ |
| Perfect Blonde Plus | NSCF-KT-103VP | ✅ |
| Moisture & Shine | NSCF-KT-101T | ⏳ Resplander Shine — verificar mañana |
| S.O.S Rescue System | NSCF-KT-104 | ⏳ Verificar componentes mañana |

#### 3. SAVINGS BADGE EN CART ✅
- Metafield `neurone.kit_savings` — definition ID: `gid://shopify/MetafieldDefinition/386818343239`
- Aplicado a 10 kits con valores de ahorro reales
- Badge bilingüe ES/EN en `templates/cart.liquid` — live en producción
- Color: #D4622A (naranja Neurone) con ícono de regalo
- Solo aparece en productos con el metafield (kits) — individuales sin badge

| Kit | Ahorro |
|---|---|
| Hydra Boost | $19.99 |
| Moisture Recovery | $44.98 |
| Moisture Recovery Plus | $89.97 |
| Restore Therapy | $44.98 |
| Restore Therapy Plus | $79.97 |
| Restore & Shield | $84.97 |
| Blonde Guard | $49.98 |
| Blonde Guard Plus | $84.97 |
| Perfect Blonde | $64.98 |
| Perfect Blonde Plus | $94.97 |

#### 4. CART — FIXES ✅
- Imagen rota en cart corregida (`item.image` + fallback `product.featured_image`)
- Layout móvil corregido — grid responsive, columna única en <720px
- Página de carrito completamente bilingüe ES/EN

#### 5. FREE SHIPPING KITS ✅
- **Descuento automático activo:** "Free Shipping — Ritual Kits"
  - ID: `gid://shopify/DiscountAutomaticNode/1889210106183`
  - Umbral: subtotal ≥ $60.00 USD
  - Cubre todos los kits ($64.99–$179.99) ✅
  - No activa para productos individuales (máx $54.99) ✅
  - Gap de seguridad: $10
- **Perfil "Kits - Free Shipping"** — creado, zona US configurada, tarifa $0
  - Moisture & Shine y SOS asignados directamente
  - Los otros 10 kits son Shopify Bundles — limitación de Shopify impide asignarlos via API o UI
  - El descuento automático los cubre como workaround
- **Bug de divisa corregido:** tarifa general estaba en EUR → Sam la corrigió a USD en Admin

#### 6. APPS INSTALADAS ✅
| App | Estado |
|---|---|
| Meta Channel (Facebook & Instagram) | ✅ Instalada — pixel pendiente crear |
| TikTok (oficial) | ✅ Instalada + conectada — pendiente aprobación |
| Google & YouTube | ✅ Instalada + Merchant Center activado |
| Judge.me | ✅ Instalada — pendiente configuración |
| Afterpay US | ✅ Registro completado — pendiente aprobación |
| Bundles (nativa) | ✅ Configurada 10/12 |

#### 7. PAYMENTS ✅
- Shop Pay, Apple Pay, Google Pay — activos
- Afterpay US — registro completado, pendiente aprobación (1-5 días)
- Klarna — no disponible en USA via Shopify Payments (descartada)
- Affirm — disponible, pendiente decisión

---

## PENDIENTES PRÓXIMA SESIÓN

### Mañana (prioridad)
- [ ] Configurar KT-101T (Moisture & Shine) — verificar Resplander Shine
- [ ] Configurar KT-104 (SOS) — verificar componentes
- [ ] Imágenes DY Fazza vs Dyfensor — corregir confusión
- [ ] 2 productos con especificación — Sam explicará
- [ ] Instalar y configurar **Judge.me** (Sam instaló, configuración pendiente)
- [ ] Crear Meta Pixel + instalar via Meta Channel
- [ ] Instalar GA4 Measurement ID en Shopify

### Stack CRO pendiente de instalar/decidir
Ver sección "Respuesta de Claude: Stack CRO Completo" abajo

---

## RESPUESTA DE CLAUDE: STACK CRO COMPLETO

### Lo que ya tienes activo
| Área | Herramienta | Estado |
|---|---|---|
| Tracking | TikTok Pixel + Events | ✅ Live |
| Tracking | GA4 | ⏳ Conectar |
| Tracking | Meta Pixel | ⏳ Crear e instalar |
| Bundles/kits checkout | Shopify Bundles | ✅ |
| Valor percibido | Savings badge cart | ✅ |
| Pagos flexibles BNPL | Afterpay US | ⏳ Aprobación |
| Reviews/UGC | Judge.me | ⏳ Configurar |

### Lo que falta — Stack CRO priorizado

**FASE 1 — Pre-lanzamiento (instalar ya):**

| App | Función CRO | Costo | Prioridad |
|---|---|---|---|
| **Judge.me** | Reviews + estrellas en PDP + emails automáticos post-compra pidiendo review | Free / $15/mes | 🔴 Alta — sin reviews no hay prueba social |
| **Klaviyo** | Email marketing — abandoned cart, welcome flow, post-purchase, win-back | Free hasta 250 contactos / $20/mes+ | 🔴 Alta — el email es el canal de mayor ROI |
| **Reconvert** | Post-purchase upsell — oferta one-click en thank you page | $4.99/mes | 🟡 Media — sin tráfico no hay con qué probar |

**FASE 2 — Post-lanzamiento (con primeras ventas):**

| App | Función CRO | Costo | Timing |
|---|---|---|---|
| **Loox** o **Okendo** | Video reviews + UGC — alternativa premium a Judge.me | $9–$19/mes | Cuando tengas primeras compras |
| **Rebuy** | Smart upsell/cross-sell en PDP, carrito y post-purchase con IA | $99/mes | Mes 2-3 |
| **Stamped** | Loyalty program — puntos, referidos | $19/mes | Mes 3+ |
| **Postscript** | SMS marketing USA | $0.01/SMS | Cuando tengas base de contactos |
| **17Track / Track123** | Order tracking branded | Free / $9/mes | Cuando haya pedidos reales |

**FASE 3 — Escala:**

| App | Función CRO | Cuándo |
|---|---|---|
| **Gorgias** | Customer support integrado con Shopify | Con volumen de tickets |
| **Yotpo** | Reviews enterprise + loyalty + SMS todo en uno | Cuando Loox/Judge.me se quede corto |
| **Triple Whale** | Analytics de ads unificado (Meta+TikTok+Google en un dashboard) | Cuando corran 3+ campañas simultáneas |

### Decisión inmediata que te pido

**Klaviyo ahora.** Es la app de mayor impacto a largo plazo y tarda en "calentar" — cuanto antes empieces a construir la lista y los flows, mejor. El plan free cubre los primeros 250 contactos y los flows básicos. Reconvert lo dejamos para cuando haya tráfico real.

---

## NOTAS TÉCNICAS

### Bundles API
- `productBundleUpdate` — usar para kits existentes (no `productBundleCreate`)
- Bundle products NO se pueden asignar a custom shipping profiles vía API ni UI (limitación Shopify)
- Workaround: descuento automático free shipping ≥ $60

### Savings Badge
- Metafield: `neurone.kit_savings` / namespace: `neurone` / key: `kit_savings`
- Liquid: `item.product.metafields.neurone.kit_savings.value`

### Tienda
- Idiomas: ES (primario) + EN (publicado)
- Theme: `gid://shopify/OnlineStoreTheme/192983662919` — Neurone Custom Theme v1.0
- Locale check en Liquid: `request.locale.iso_code == 'en'`

### Tracking
- TikTok Pixel ID: `D832THJC77UATASL0OO0`
- Snippet: `snippets/tiktok-events.liquid`
- GA4 Measurement ID: pendiente — Sam lo tiene, hay que instalarlo
- Meta Pixel ID: pendiente — crear en Meta Events Manager

### Shipping
- Descuento auto free shipping: `gid://shopify/DiscountAutomaticNode/1889210106183`
- Perfil "Kits - Free Shipping": `gid://shopify/DeliveryProfile/134683099463`
- Perfil General: `gid://shopify/DeliveryProfile/132833870151` — tarifa corregida a USD

### Accesos
- Sam añadido como admin: Meta BM ✅ · TikTok Ads Manager ✅ · GA4 ✅
- Email usado: xam.moreno.m@gmail.com
