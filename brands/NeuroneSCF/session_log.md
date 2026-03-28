# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-03-28 — CopyLab full debug + schema audit + Supabase RLS

### CERRADO EN ESTA SESIÓN

**CopyLab — bugs de schema resueltos (cascada completa):**
- `brands` query: `brand_id=eq.` → `id=eq.` (columna no existía) ✅
- `BRAND_SELECT`: removidos `brand_id`, `active`, `cta_ultrashort`; `brand_type` → `type` ✅
- `OutputTemplate`: `output_type` no existe → `id` es el identificador funcional; añadidos `name`, `category`, `variables`, `applies_to`, `platforms`, `word_count_min`, `word_count_max` ✅
- `CanalBlock`: `canal_id` no existe → `id` es el identificador funcional; añadidos `name`, `platform`, `format`, etc. ✅
- `GeoMix`: `servicio_1..6` no existen → `servicios: string[]` + `combos: string[]` + campos reales verificados ✅
- `ImagelabPreset`: `channel`/`preset_name` no existen → `canal`, campos extendidos reales ✅
- `resolveTemplate`: `t.output_type` → `t.id` ✅
- `resolveCanalBlock`: `c.canal_id` → `c.id` ✅
- `buildGeomixBlock`: reescrito con `servicios[]` y `combos[]` ✅

**CopyLab — funcionalidades corregidas:**
- `buildLanguageBlock`: instrucción explícita de idioma inyectada como sección #2 del prompt ✅
- CopyPack: `language` ahora se pasa a `generateCopyFromInput` → `buildLanguageBlock` aplica ✅
- CopyToolsModule (Adaptador, Analizador, CTA Generator): `activeLanguage` del store inyectado en `prompt` y `systemPrompt` ✅
- Customize state loss: `step1`, `selectedSku`, `customText` movidos de `useState` local → `sessionStore` (sobreviven navegación entre pestañas) ✅
- `activeExtraContext` ahora se limpia en `handleReset` ✅

**CopyLab — favicon:**
- `favicon.svg`: chevron cyan `#00FFD1`, doble pulso SMIL blink, 3s cycle — en `public/` ✅
- `index.html`: corregido con `<link rel="icon">` + `<script type="module" src="/src/main.tsx">` (entry point que faltaba) ✅
- `package.json`: `@vercel/node ^5.0.0` añadido a devDependencies (resuelve TS2307 build warning) ✅

**Supabase — audit completo:**
- 27 tablas, todas con PK ✅
- RLS habilitado en 8 tablas que lo tenían desactivado: `product_blueprints`, `videolab_params`, `brand_assets`, `page_sections`, `platform_configs`, `script_templates`, `stakeholders`, `voice_packs` ✅
- Advisor Center: 0 alertas de seguridad ✅
- Schema verificado contra código: todas las discrepancias resueltas
- `db/types.ts`: Brand, OutputTemplate, CanalBlock, GeoMix, ImagelabPreset — todos alineados con schema real ✅

**STATUS FINAL:**
- CopyLab: PASSED ✅ — generando copy en idioma correcto, state persiste, compliance activo
- Supabase: PASSED para CopyLab ✅ — estructura completa, RLS limpio, 0 alertas

### PENDIENTE (sin cambios)
- **Imágenes NeuroneSCF → Supabase Storage:** bucket `product-assets` listo, imágenes pendientes de subir
- **GeoMix NeuroneSCF:** tabla existe, filas NeuroneSCF pendientes de poblar
- **brand_palette + brand_typography:** otras marcas pendientes (solo NeuroneSCF completo)
- **Shopify:** 17+ SKUs out_of_stock · precios $0.00 placeholder · no activar hasta resolver
- **Aprobación PO + Laura:** neurone_estrategia_v4.html — pendiente revisión
- **Precios finales por SKU:** pendiente Sam + PO
- **OPERATIVOS:** montos reales Contador, Seguro, Transporte, Mantenimiento
- **SKU sistema definitivo:** proveedor vs. modelo — bloquea activación Shopify
- **Video PO en cámara Kit SOS:** asset más urgente antes de escalar TikTok ads
- **VoiceLab Voice IDs:** configurar voces reales TenzorArt (todos TBD_*)
- **Corregir imagen NCNEU-6:** Neurona Gloss vs Neuroxide compartida

---

## 2026-03-24 — Cloudflare completo + Email Routing + Gmail filters

### CERRADO EN ESTA SESIÓN
- **neuronescflorida.com → Cloudflare:** dominio migrado desde GoDaddy. Nameservers propagados. Status: ✅ activo y protegido.
- **AI Crawlers:** Block on all pages + robots.txt ON ✅
- **DNS corregido:** registro A + CNAME www cambiados a DNS only (Shopify maneja SSL propio) ✅
- **Email Routing activado:** Cloudflare añadió automáticamente MX (route1/2/3.mx.cloudflare.net), DKIM (cf2024-1._domainkey) y SPF ✅
- **9 aliases creados** → todos a neuronescflorida@gmail.com ✅
  - admin@neuronescflorida.com → Meta Business Manager
  - ig@neuronescflorida.com → Instagram Business
  - wabi@neuronescflorida.com → WhatsApp Business API
  - tiktok@neuronescflorida.com → TikTok for Business
  - ads@neuronescflorida.com → Meta Ads Manager
  - support@neuronescflorida.com → Atención cliente
  - hello@neuronescflorida.com → Contacto público
  - ops@neuronescflorida.com → Ops / Laura
  - patriciaosorio@neuronescflorida.com → Patricia Osorio
- **DMARC Management activado:** Cloudflare añadió RUA propio manteniendo el registro existente ✅
- **9 filtros Gmail creados** en neuronescflorida@gmail.com ✅
  - Skip Inbox + Never spam + Apply label por cada alias
  - Labels con formato "[Plataforma] - NSCF" con colores asignados
- **NEU-005 cerrado:** dominio neuronescflorida.com en Cloudflare completamente configurado ✅

### NOTAS DE SESIÓN
- Hostinger NO entra en este stack — Cloudflare es suficiente para Shopify + email routing
- alias wabi@ (no waba@) — decisión intencional de Sam, consistente en Cloudflare y Gmail
- Claude in Chrome MCP usado activamente para navegar Cloudflare durante la sesión

### PENDIENTE (sin cambios)
- **Cuentas redes sociales:** crear con aliases NSCF — tarea de Laura
- **Aprobación PO + Laura:** neurone_estrategia_v4.html en repo — pendiente revisión
- **Precios finales por SKU:** pendiente decisión Sam + PO
- **OPERATIVOS:** montos reales Contador, Seguro, Transporte, Mantenimiento — confirmar con PO
- **SKU sistema definitivo:** proveedor vs. modelo — bloquea activación Shopify
- **Shopify:** 17+ SKUs out_of_stock · precios $0.00 placeholder · no activar hasta resolver
- **C180 TOTAL VIOLET INK + C166 FANZI MIX TONE DOWN:** precio compra pendiente desde factura
- **Benchmarking COLOR B2B:** tarea de PO — precios Wella/Redken/Joico 90ml en salones South Florida
- **Video PO en cámara Kit SOS:** asset más urgente antes de escalar TikTok ads
- **PO VoiceBlueprint:** re-recording pendiente (audio espontáneo 2–3 min)

---

## 2026-03-24 — Corrección dominio + Cloudflare + aliases redes sociales

### CERRADO EN ESTA SESIÓN
- **CORRECCIÓN CRÍTICA:** Dominio corregido a `neuronescflorida.com` en brand.json — `neuronescmiami.com` era incorrecto y nunca existió. Error persistía en contexto desde múltiples sesiones anteriores. CORREGIDO DEFINITIVAMENTE.
- **Autorización distribución Neurone US:** ✅ COMPLETADA — desbloqueado. Eliminado de blocking alerts.
- **NEU-005 creado:** Dominio neuronescflorida.com en Cloudflare — en progreso. AI crawlers: "Block on all pages" + robots.txt ON. Correcto para e-commerce marca propia.

### EN CURSO
- **Aliases dominio neuronescflorida.com:** configuración para cuentas redes sociales de Laura — pendiente esta sesión

### PENDIENTE (sin cambios)
- **Aprobación PO + Laura:** neurone_estrategia_v4.html en repo — pendiente revisión
- **Precios finales por SKU:** pendiente decisión Sam + PO
- **OPERATIVOS:** montos reales Contador, Seguro, Transporte, Mantenimiento — confirmar con PO
- **SKU sistema definitivo:** proveedor vs. modelo — bloquea activación Shopify
- **Shopify:** 17+ SKUs out_of_stock · precios $0.00 placeholder · no activar hasta resolver
- **C180 TOTAL VIOLET INK + C166 FANZI MIX TONE DOWN:** precio compra pendiente desde factura
- **Benchmarking COLOR B2B:** tarea de PO — precios Wella/Redken/Joico 90ml en salones South Florida
- **Video PO en cámara Kit SOS:** asset más urgente antes de escalar TikTok ads
- **PO VoiceBlueprint:** re-recording pendiente (audio espontáneo 2–3 min)

---

## 2026-03-23 — Sesión de pricing, estrategia, brand y cierre

### CERRADO EN ESTA SESIÓN (segunda pasada)
- **Neurone_Pricing_v9.xlsx FINAL:** tab PROYECCION añadida (ramp-up mes 0–6 coincide con informe v4) | C15 Tech formula auto-suma C16:C23 (incluye UNRLVL) | todo en BluePrints repo ✓
- **BP_BRAND_UNRLVL v1.3:** chevron blink CSS+SMIL, STUDIO 0.32 opacity rule, favicon SMIL obligatorio, **2 versiones de signature** (A=web/HTML, B=docs internos/xlsx), output_standards checklist — en BluePrints repo ✓
- **UNRLVL_favicon.svg:** reemplazado con SMIL `<animate>` — parpadeo real en browser (Chrome/Edge/Firefox) sin depender de CSS
- **PNGs alpha:** UNRLVL_favicon_cyan.png, logotype_bk.png, logotype_chrk.png — alpha channel aplicado (fondo negro → transparente) — en BluePrints repo ✓

### CERRADO EN ESTA SESIÓN (primera pasada)
- **Neurone_Pricing_v8 → v9:** UNRLVL fee $150→$1,500 | KITS tab (4 rituales PO) | bug Marketing E17→E25 corregido | en BluePrints repo ✓
- **neurone_estrategia_v4.html:** informe final con kits, envío, promociones, escenarios, ads, inversión Meta+TikTok por fase — en BluePrints repo como **checkpoint pending PO + Laura approval** ✓
- **BP_BRAND_UNRLVL v1.2 → v1.3:** completado arriba

### DECISIONES TOMADAS HOY
- **Estructura de precios:** Portfolio pricing 3 tiers — Kit SOS $79 (ancla, 59.7%), K3 $55, K2 $48, K1 $45
- **Política de envío:** $9.99 en individuales | GRATIS en kits (ya absorbido en precio)
- **UNRLVL fee:** $1,500/mes como costo de referencia real — no se aplica operativamente al inicio
- **Canal B2B profesional:** NO activo en fase 1 — solo B2C
- **5 mecanismos de impulso:** Código PO PATRICIA15 | Early bird 50ml ($51 total) | Add-on $12 checkout ($10.19 contrib.) | Suscripción mensual (Kit SOS $441 LTV anual) | Kit del mes PO (video mensual)
- **Breakeven Sc.B:** ~270 órdenes/mes (con cobro de envío individuales) · mes 6 de ramp-up
- **Runway necesario:** $27,000–$30,000 disponibles antes del lanzamiento
- **Brand standard definitivo:** chevron SIEMPRE blinking incluyendo favicon (SMIL) · STUDIO dimmed 0.32 · ICR en todo output · favicon obligatorio en todo HTML · 2 signatures (A web / B docs)

---

## 2026-03-22 — Estado inicial del sistema de contexto

### EN CURSO / CALIENTE
- **Neurone_Pricing_v5.xlsx:** modelo generado localmente — no estaba en repo (riesgo pérdida). Resuelto: v9 en BluePrints.
- **SKU definitivo:** pendiente entre proveedor (L014, T025) vs modelo (L034, T068)
- **Autorización marca Neurone para dominio US:** bloqueada
- **17+ SKUs stock 0:** identificados — deben marcarse out_of_stock en Shopify
- **Precios de venta:** todos $0.00 placeholder
