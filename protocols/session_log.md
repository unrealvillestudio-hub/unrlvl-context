# SESSION LOG — UNRLVL Ecosystem
_Acumulativo. Novedades al tope. No reemplazar — solo añadir._

---

## 2026-03-27 — Supabase Migración v7 COMPLETA + CopyLab queries/buildCopyPrompt actualizados

### ✅ COMPLETADO HOY

---

#### 1. SUPABASE MIGRACIÓN v7 — TODAS LAS FASES

**Proyecto:** `amlvyycfepwhiindxgzw` (unrlvl-db)

**FASE 5 ✅ — Keywords con producto/servicio/prioridad:**
```
✅ NeuroneCosmetics:  53/53  (es-FL + EN, producto/servicio/prioridad poblados)
✅ DiamondDetails:   287/287 (ES + VAL + EN-UK, 3 batches)
```
Fix aplicado: constraint `keywords_brand_id_keyword_key` → `keywords_brand_id_keyword_language_key` (UNIQUE por brand_id + keyword + language). Necesario para soportar mismo keyword en múltiples idiomas.

**FASE 7 ✅ — Tablas nuevas pobladas:**
```
✅ brand_languages:      19 entries (todas las marcas del ecosistema)
✅ brand_services:       39 entries (productos/servicios por marca e idioma)
✅ channel_prompt_rules: 39 rules   (mapeo canal ↔ prompt type)
✅ ctas Patricia Osorio:  8 CTAs    (PatriciaOsorioPersonal×5, Comunidad×1, VizosSalon×2)
```

**Estado final Supabase keywords:**
- DiamondDetails: 287 (95 ES + 96 VAL + 96 EN-UK)
- NeuroneCosmetics: 53 (35 es-FL + 18 EN)
- Todas las demás marcas: ya tenían producto/servicio/prioridad desde sesiones anteriores

---

#### 2. COPYLAB — queries.ts + buildCopyPrompt.ts + db/types.ts ACTUALIZADOS

**4 bugs críticos corregidos en queries.ts:**
1. `brand_id=eq.${brandId}` — antes usaba `id=eq.` (campo UUID, incorrecto)
2. `humanize_profiles?brand_id=eq.DEFAULT` — antes `brand_id=is.null`
3. Keywords ahora filtran por `language` + `servicio` + `order=prioridad.asc`
4. Añadidas 3 queries nuevas en paralelo: `brand_languages`, `brand_services`, `channel_prompt_rules`

**3 bugs críticos corregidos en buildCopyPrompt.ts:**
1. `buildBrandBlock` — usa campos v7 reales: `brand_context`, `tono_base`, `geo_principal`, `cta_base`, `canales_activos`, `diferenciador_base`, `disclaimer_base`
2. `buildHumanizeBlock` — usa `h.value` (schema real: `parameter`/`value`)
3. `buildGeomixBlock` — usa `g.servicio_1..servicio_6` + `g.geo` (schema real)
4. `resolveTemplateVariables` — soporta `{{var}}` doble-brace (y `{var}` como fallback)

**types.ts actualizado:**
- `HumanizeProfile`: schema real (`parameter`/`value`)
- `GeoMix`: schema real (`servicio_1..servicio_6`)
- `CTA`: renombrado de `Cta` a `CTA`
- NEW: `BrandLanguage`, `BrandService`, `ChannelPromptRule`
- NEW: `CopyPromptInput`, `CopyPromptResult` (faltaban completamente)

**Helpers nuevos en queries.ts:**
- `getGrupo3()` — devuelve `grupo_3_keywords` del keyword de prioridad 1
- `getCta()` — acepta `servicio` como filtro opcional
- `getPrimaryLanguage()` — idioma primario desde `brand_languages`
- `getPrimaryServices()` — servicios primarios por idioma
- `getRecommendedPromptTypes()` — prompt types recomendados por canal

**fetchBrandContext() — nueva firma:**
```typescript
fetchBrandContext(brandId, language?, servicio?) → BrandContext
```
Pasar `language` + `servicio` activos para recibir keywords ya filtrados y ordenados por prioridad.

---

### ⏳ PENDIENTE PRÓXIMA SESIÓN

**SUPABASE:**
1. `brand_palette` — poblar hexes confirmados por marca (tabla vacía)
2. `brand_typography` — poblar fuentes confirmadas por marca (tabla vacía)
3. GeoMix — completar para VizosCosmetics, PatriciaOsorio*, NeuroneCosmetics, VivoseMask

**COPYLAB:**
4. Actualizar callers de `fetchBrandContext()` → pasar `language` + `servicio` desde `CopyCustomizeModule`
5. Verificar deploy en producción post-commit de los 3 archivos
6. Brand OnBoarding App — para ForumPHs, NeuroneSCF y nuevas marcas
7. VoiceLab: configurar voces reales en TenzorArt

---

## 2026-03-26 — CopyLab Fase 5b COMPLETA + Decisiones de Arquitectura

### ✅ COMPLETADO HOY

**CopyLab — Migración completa Gemini → Claude + Supabase (Fase 5b)**

Stack completo en producción. Flujo activo:
`UI → runCopyPack → generateCopyFromInput → fetchBrandContext (Supabase) → /api/claude → Claude Sonnet 4 → output con compliance check`

Archivos nuevos/modificados en repo CopyLab:
- `src/lib/db/types.ts` — BrandContext completo desde schema Supabase real
- `src/lib/queries.ts` — fetchBrandContext() con 18 queries en paralelo
- `src/lib/buildCopyPrompt.ts` — SMPC completo con temperatura por tipo de output
- `src/hooks/useCopyPrompt.ts` — hook React estados idle/loading_context/generating/done/error
- `src/hooks/useBrands.ts` — marcas desde Supabase (reemplaza BRANDS hardcoded)
- `src/services/promptpack.ts` — runCopyPack conectado a Supabase+Claude (reemplaza Gemini)
- `src/core/copyEngine.ts` — Gemini eliminado, apunta a /api/claude
- `src/modules/promptpack/CopyPackModule.tsx` — usa useBrands hook
- `api/claude.ts` — proxy serverless Vercel, ANTHROPIC_API_KEY en env vars
- `package.json` — @google/genai eliminado

Último commit verificado: `a11860f` · READY en producción.

**Ecosystem Auditor mejorado**
- Campo PAT en UI (no hardcodeado)
- Scan repo individual (botón hover en sidebar)
- File Browser con agrupación por carpetas
- Search full-text en todos los repos escaneados

### 🎯 DECISIONES ARQUITECTÓNICAS TOMADAS

**AI Engine por lab (definitivo):**
- CopyLab → Claude Sonnet 4 ✅ activo
- SocialLab → Claude Sonnet 4 (cuando se construya)
- AgentLab → Claude Sonnet 4 (ya era)
- BlueprintLab → Gemini 2.0 Flash (mantener — JSON estructurado, no lenguaje de marca)
- ImageLab → ComfyUI FLUX / fal.ai (no aplica LLM)
- VideoLab → HeyGen / Kling (no aplica LLM)
- VoiceLab → TenzorArt (reemplaza ElevenLabs — decisión de hoy)

**Creativity Protection — temperatura implementada:**
- Conversión directa: 0.5 | Orgánico/social: capeado 1.0 | Discovery/branding: capeado 1.0
- Implementado en buildCopyPrompt.ts ✅

---

## 2026-03-25 — Supabase Fases 1-5 infra + Context System

_Ver entradas anteriores..._
