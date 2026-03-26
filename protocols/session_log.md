# SESSION LOG — UNRLVL Ecosystem
_Acumulativo. Novedades al tope. No reemplazar — solo añadir._

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

**Taxonomía Labs corregida (contexto):**
- ImageLab = generador de escenas, promptpacks, avatars imagen, e-commerce, social media pack builder, assets library con slots (A=Subject, B=Background, etc.)
- BlueprintLab = generador de VideoAvatars desde Blueprints → apuntará a LoRA/ComfyUI
- VoiceLab → motor: TenzorArt (no ElevenLabs)

**Creativity Protection — temperatura implementada:**
- Conversión directa: 0.5 | Orgánico/social: 1.1 | Discovery/branding: 1.3
- Implementado en buildCopyPrompt.ts ✅
- Angle Randomizer y output_log → pendiente

### ⏳ PENDIENTE PRÓXIMA SESIÓN — COPYLAB

1. **CopyToolsModule** — migrar a Supabase (necesita contenido del archivo)
2. **CopyCustomizeModule** — migrar a Supabase (necesita contenido del archivo)
3. **Dead code eliminar:** `src/config/brands.ts`, `channelBlocks.ts`, `copyTemplates.ts`, `customizeOutputs.ts`, `locationBlueprints.ts`, `personBlueprints.ts`, `presets.ts`
4. **brand_palette** — poblar hexes por marca (tabla vacía en Supabase)
5. **brand_typography** — poblar fuentes por marca (tabla vacía en Supabase)

### ⏳ PENDIENTE ECOSISTEMA

- VoiceLab: configurar voces reales en TenzorArt
- GeoMix: completar para VizosCosmetics, PatriciaOsorio*, NeuroneCosmetics, VivoseMask
- INCI VivoseMask: cuando llegue ficha de Vizos
- Angle Randomizer + output_log para Creativity Protection

---

## 2026-03-25 — Supabase Fases 1-5 infra + Context System

_Ver entradas anteriores..._
