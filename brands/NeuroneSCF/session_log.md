# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-03-30 — WebLab fixes + Onboarding App ChatPanel + Supabase schema + data population

### CERRADO EN ESTA SESIÓN

**WebLab — fixes finales:**
- `src/config/brands.ts` — "Neurone Cosmética" eliminado definitivamente → "Neurone South & Central Florida". UnrealilleStudio → UnrealvilleStudio. Sin caracteres especiales. ✅
- `src/config/brandContexts.ts` — fix mínimo: sin em-dash, sin chevron, referencias actualizadas ✅
- `src/config/humanizeConfig.ts` — brandId refs verificados, +unrealilleStudio override ✅
- `src/config/brandBlueprints.ts` — +UnrealvilleStudio blueprint, sin chevron ✅
- `src/lib/useCatalog.ts` — parámetro no usado weblabBrandId removido (fix de build TS6133) ✅
- `src/modules/shopify/ShopifyPushModule.tsx` — vendor "Neurone Cosmética" → "Neurone South & Central Florida" ✅

**Supabase — nuevas tablas:**
- `brand_goals` — objetivos estratégicos por marca y horizonte (6m/12m/24m). Categories: revenue/audience/product/brand/ops/distribution/content/community. Priority 1-3. ✅
- `brand_personas` — segmentos ICP estructurados. Distinto de person_blueprints (BP_PERSON = producción). Campos ARRAY nativos + attributes JSONB. confidence 1=hipotético 2=inferido 3=validado. ✅
- `UnrealvilleStudio` brand agregada a Supabase ✅
- `DEFAULT` pseudo-brand insertada para FK de humanize_profiles ✅

**Supabase — datos poblados:**
- `humanize_profiles DEFAULT` (5 medios): todos los campos poblados (tone, vocabulary_include/exclude JSONB, sentence_style, personality, anti_patterns JSONB) ✅
- `humanize_profiles NeuroneSCF copy`: tone, vocabulary, sentence_style, personality, anti_patterns ✅
- `brands NeuroneSCF`: brand_story, icp, key_messages, competitors, differentiators ✅
- `brand_goals NeuroneSCF`: 12 filas (5×6m, 4×12m, 3×24m) ✅
- `brand_personas NeuroneSCF`: 4 segmentos (b2c_latina_color, b2c_latina_repair, b2b_salon_owner, b2b_colorist) ✅
- `geomix NeuroneSCF`: 5 zonas (Miami-Dade, Broward, Palm Beach, Orlando Metro, Tampa Bay) ✅
- `brands UnrealvilleStudio`: contexto completo, brand_story, icp, goals, personas, geomix ✅
- `brands UnrealvilleStores`: nueva marca creada + contexto completo, brand_story, icp, goals, personas, geomix ✅

**Onboarding App — ChatPanel integrado:**
- `src/modules/onboarding/ChatPanel.tsx` — nuevo: chat con Claude, carga contexto Supabase de marca activa, markdown rendering, badges [FALTA]/[CORRECCIÓN SUGERIDA] ✅
- `src/App.tsx` — ChatPanel integrado como drawer derecho. Botón chat en sidebar header. loadBrandContext con fetch nativo (sin sbFetch) ✅
- `src/store/onboardingStore.ts` — +chatMessages, +isChatOpen, TOGGLE_CHAT, SET_CHAT_OPEN, ADD_CHAT_MESSAGE, CLEAR_CHAT ✅
- `src/api/claude.ts` — +callClaude (texto plano) junto a callClaudeJSON existente ✅
- `api/claude.ts` — serverless corregido: llama a Anthropic directamente (estaba en bucle infinito) ✅
- Botón flotante eliminado — toggle movido al header del sidebar ✅

**Apps en producción confirmadas:**
- UNRLVL-OPS ✅
- Onboarding App ✅ (con ChatPanel operativo)
- WebLab ✅ (Supabase integration + fixes)
- CopyLab ✅ PASSED

### PENDIENTE NeuroneSCF
- Imágenes NeuroneSCF → Supabase Storage bucket product-assets
- Shopify precios reales ($0.00 placeholder) — decisión pendiente con PO
- Aprobación estrategia v4 PO + Laura
- Video PO Kit SOS — asset más urgente antes de escalar TikTok ads
- VoiceLab Voice IDs TenzorArt TBD_*

### PENDIENTE ECOSYSTEM
- humanize_profiles: DiamondDetails, PatriciaOsorioVizosSalon, PatriciaOsorioPersonal, PatriciaOsorioComunidad, D7Herbal, VizosCosmetics, VivoseMask, ForumPHs, UnrealvilleStudio, UnrealvilleStores — poblar via Onboarding App ChatPanel
- brand_palette + brand_typography: todas las marcas vacías — requieren hex codes y tipografías reales de Sam
- brand_goals + brand_personas: DiamondDetails, PatriciaOsorio×3, D7Herbal, VizosCosmetics, VivoseMask, ForumPHs — poblar via Onboarding App
- compliance_rules: UnrealvilleStores (FTC dropshipping) pendiente
- geomix: VizosCosmetics, PatriciaOsorio×3, VivoseMask pendientes
- BP_Brand files por marca: paletas, tipografías, logos, usos — después de datos completos
- VoiceLab Voice IDs reales TenzorArt
- WebLab brandContexts/humanize/blueprints → migración completa Supabase (requiere refactor webEngine.ts)
- Corregir imagen NCNEU-6 (Neurona Gloss vs Neuroxide compartida)

---

## 2026-03-29 — WebLab Supabase integration + Onboarding App planning

### CERRADO EN ESTA SESIÓN
- WebLab → Supabase integración (useCatalog hook) ✅
- brandContexts/humanizeConfig/brandBlueprints fix mínimo ✅
- UnrealvilleStudio agregado a Supabase ✅
- Onboarding App planificada (AI-powered brief narrativo 4 fases) ✅

---

## 2026-03-28 — CopyLab full debug + schema audit + Supabase RLS

### CERRADO
- CopyLab: PASSED ✅
- Supabase RLS: 0 alertas ✅
- Schema verificado contra código ✅

---

## 2026-03-24 — Cloudflare + Email Routing + Gmail filters
### CERRADO
- neuronescflorida.com → Cloudflare ✅ · 9 aliases ✅ · NEU-005 cerrado ✅

---

## 2026-03-23 — Pricing v9 + Estrategia v4 + Brand standards
### CERRADO
- Pricing v9 FINAL ✅ · neurone_estrategia_v4.html pending PO+Laura ✅ · BP_BRAND_UNRLVL v1.3 ✅

---

## 2026-03-22 — Estado inicial
- SKU sistema pendiente · 17+ SKUs stock 0 · precios $0.00
