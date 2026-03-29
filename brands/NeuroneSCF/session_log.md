# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-03-29 — WebLab Supabase integration + Onboarding App planning

### CERRADO EN ESTA SESIÓN

**WebLab — integración Supabase (producto catalog):**
- `src/lib/supabaseClient.ts` — nuevo: config fetch nativo, mismas env vars que CopyLab ✅
- `src/lib/useCatalog.ts` — nuevo: hook reemplaza getCatalog(), lee product_blueprints desde Supabase ✅
- `WEBLAB_TO_SUPABASE_BRAND_ID` map — traducción camelCase WebLab → IDs canónicos Supabase ✅
- `ShopifyPushModule.tsx` — usa useCatalog hook, loading state, vendor corregido ✅
- `src/config/brands.ts` — +WEBLAB_TO_SUPABASE_BRAND_ID, neuroneCosmetics.name → "Neurone South & Central Florida", unrealilleStudio → UnrealvilleStudio ✅
- `src/config/brandContexts.ts` — fix mínimo: sin caracteres especiales, sin chevron, referencias actualizadas ✅
- `src/config/humanizeConfig.ts` — fix mínimo: brandId refs verificados, +unrealilleStudio override ✅
- `src/config/brandBlueprints.ts` — +UnrealvilleStudio blueprint, sin chevron ✅

**Supabase:**
- `UnrealvilleStudio` agregado como brand (id canónico definitivo) ✅
- RLS: 0 alertas de seguridad — estado limpio ✅

**Decisiones de arquitectura:**
- brandContexts/humanizeConfig/brandBlueprints: migración completa a Supabase diferida — requiere refactor webEngine.ts (roadmap)
- WebLab productCatalog: 100% desde Supabase via useCatalog hook ✅
- "Neurone Cosmética" eliminado de todos los archivos — nombre correcto: "Neurone South & Central Florida"

**Onboarding App — planificada:**
- Concepto aprobado: AI-powered brand onboarding con brief narrativo libre
- Flujo 4 fases: Brief Libre → Contexto Estimulado (Claude) → Investigación de Gaps → Escritura a Supabase
- Claude genera contexto estructurado desde narrativa, no formulario
- Incluye editor de marcas existentes con % completitud por tabla
- Prioridad: poblar humanize_profiles, brand_palette, brand_typography, geomix para todas las marcas
- Briefing preparado para nuevo chat ✅

### PENDIENTE NeuroneSCF (sin cambios)
- **Imágenes NeuroneSCF → Supabase Storage:** bucket product-assets listo, imágenes pendientes
- **GeoMix NeuroneSCF:** filas pendientes de poblar (bloqueado hasta Onboarding App)
- **Shopify:** precios $0.00 placeholder, activación bloqueada
- **Aprobación PO + Laura:** neurone_estrategia_v4.html pendiente revisión
- **Video PO Kit SOS:** asset más urgente antes de escalar TikTok ads
- **VoiceLab Voice IDs:** TenzorArt TBD_*

---

## 2026-03-28 — CopyLab full debug + schema audit + Supabase RLS

### CERRADO EN ESTA SESIÓN

**CopyLab — bugs de schema resueltos (cascada completa):**
- `brands` query: `brand_id=eq.` → `id=eq.` (columna no existía) ✅
- `BRAND_SELECT`: removidos `brand_id`, `active`, `cta_ultrashort`; `brand_type` → `type` ✅
- `OutputTemplate`: `output_type` no existe → `id` es el identificador funcional ✅
- `CanalBlock`: `canal_id` no existe → `id` es el identificador funcional ✅
- `GeoMix`: `servicio_1..6` no existen → `servicios: string[]` + `combos: string[]` ✅
- `resolveTemplate`, `resolveCanalBlock`, `buildGeomixBlock` corregidos ✅

**CopyLab — funcionalidades corregidas:**
- Idioma explícito en todos los módulos (CopyPack, Tools, Adapter) ✅
- State persistence fix (step1/selectedSku/customText en sessionStore) ✅
- activeExtraContext se limpia en reset ✅
- favicon.svg chevron cyan blinking SMIL ✅

**Supabase audit:**
- RLS habilitado en 8 tablas — Advisor Center 0 alertas ✅
- Schema verificado contra código ✅

**STATUS:** CopyLab PASSED ✅ · Supabase PASSED para CopyLab ✅

### PENDIENTE (sin cambios)
- Imágenes NeuroneSCF → Storage
- GeoMix NeuroneSCF
- brand_palette + brand_typography otras marcas
- Shopify precios + stock
- Aprobación PO + Laura
- Video PO Kit SOS
- VoiceLab Voice IDs TenzorArt

---

## 2026-03-24 — Cloudflare completo + Email Routing + Gmail filters

### CERRADO EN ESTA SESIÓN
- neuronescflorida.com → Cloudflare migrado ✅
- 9 aliases creados → neuronescflorida@gmail.com ✅
- DMARC + Email Routing + 9 filtros Gmail ✅
- NEU-005 cerrado ✅

### PENDIENTE
- Cuentas redes sociales con aliases NSCF — tarea Laura
- Aprobación PO + Laura estrategia v4
- Precios finales SKU · OPERATIVOS reales · SKU sistema definitivo
- Shopify out_of_stock · Video PO Kit SOS · PO VoiceBlueprint

---

## 2026-03-24 — Corrección dominio + Cloudflare

### CERRADO
- Dominio corregido a neuronescflorida.com (neuronescmiami.com nunca existió) ✅
- Autorización distribución Neurone US completada ✅

---

## 2026-03-23 — Pricing v9 + Estrategia v4 + Brand standards

### CERRADO
- Neurone_Pricing_v9.xlsx FINAL en BluePrints repo ✅
- neurone_estrategia_v4.html — checkpoint pending PO + Laura approval ✅
- BP_BRAND_UNRLVL v1.3 — chevron blink, STUDIO 0.32, 2 signatures ✅
- Portfolio pricing 3 tiers — Kit SOS $79, K3 $55, K2 $48, K1 $45 ✅
- Breakeven Sc.B: ~270 ordenes/mes · mes 6 · runway $27k-$30k ✅

---

## 2026-03-22 — Estado inicial del sistema de contexto

### EN CURSO / CALIENTE
- SKU definitivo: proveedor vs modelo pendiente
- 17+ SKUs stock 0 en Shopify
- Precios de venta $0.00 placeholder
