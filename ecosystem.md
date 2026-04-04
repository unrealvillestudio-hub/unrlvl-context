# UNRLVL Ecosystem — Radiografía Narrativa
*Versión: 2026-04-04a · Generado desde ecosystem.json · No editar directamente*

---

## ESTADO GLOBAL

**Studio:** Unrealville Studio — Sam, owner. Florida USA + LATAM + España.
**Supabase:** `amlvyycfepwhiindxgzw` — schema v1.8, 32 tablas, RLS habilitado.
**Vercel team:** `team_fEH94Irp6BAI9YGm4btGna5n`

---

## CAPA A — PRODUCCIÓN REAL

Labs y herramientas generando valor para clientes hoy.

### CopyLab — `unrlvl-copy-lab.vercel.app`
**PASSED v8.0.** Motor de copy del ecosistema. 24 queries paralelas a Supabase. SMPC de 13 capas: Brand → Goals → Personas → Idioma → Canal → Humanize F2.5 → GeoMix → Keywords → CTA → Compliance → **BP_COPY_1.0** → Extra → Template. Layer 13 (BP_COPY_1.0) integrado en sprint 4: lee `brand_copy_profiles` e inyecta voice_tone, writing_style, hooks, signature_phrases, avoid_phrases, prohibited_words. 7 perfiles activos (PO×3, D7Herbal, VivoseMask, DiamondDetails, VizosCosmetics). NeuroneSCF vacío — pendiente poblar.
Engine: Claude Sonnet 4 server-side. Gap activo: poblar `brand_copy_profiles` para NeuroneSCF.

### WebLab — `web-lab.vercel.app`
**Producción activa.** Genera landing pages y copy web. Supabase integration completa via `webBrandLoader.ts`: humanize_profiles, compliance_rules, brand_palette_typography, product_blueprints. Fallback automático a hardcoded si Supabase falla. Gap menor: `brandContexts.tsx` aún hardcoded para algunas marcas — migración completa pendiente.

### ImageLab — `image-lab-unrlvl.vercel.app`
**ICR v1.0 activo.** Genera imágenes con Gemini 2.5 Flash + Google Imagen 3. Supabase: brands via BrandsProvider, imagelab_presets por canal. Psycho Layer: `psychoPresetLoader.ts` + `PsychoLayerSelector.tsx` generados en sprint 4 — pendiente integrar en UI de generación. brand_assets vacío — poblar con URLs BluePrints repo.

### OnboardingApp — `unrlvl-onboarding-app.vercel.app`
**ChatPanel operativo.** Onboarding de nuevas marcas al ecosistema. Claude Sonnet 4 server-side. Gap: brand_goals + brand_personas + geomix no se escriben desde el flujo todavía (Phase 4 pendiente).

### Social Media Agent — `unrlvl-social-media-agent.vercel.app`
**Producción para NeuroneSCF** (operadora: Laura Rodriguez). Guía setup de infraestructura digital: Meta BM, WABA, TikTok. Claude Sonnet 4 + @vercel/kv historial 90 días. NO genera contenido social — ese rol es de CopyLab + SocialLab. Export endpoint: GET /api/export con header secret.

### UNRLVL-OPS — interno
**Operativo.** Dashboard interno de operaciones del studio.

---

## CAPA B — EN CONSTRUCCIÓN / BLOQUEADOS

### SocialLab — `social-lab-flame.vercel.app`
Scaffolding. Motor actual: Gemini 2.0 Flash client-side (API key expuesta — error de arquitectura). Rol correcto redefinido: recibir copy de CopyLab → adaptar formato por plataforma → agendar → publicar. Sprint 4 añadió: `copyLabBridge.ts` (import CopyLab → ScheduledPost) + `CopyLabImportPanel.tsx` (UI). Pendiente integrar panel en PostBuilderModule.tsx. Pendiente eliminar Gemini. `brand_social_accounts` creada en Supabase (schema listo para OAuth).

### AgentLab Builder — `agent-lab-unrlvl.vercel.app`
Builder operativo, deployments en producción. Sprint 4: `geminiService.ts` eliminado (TestMode → Claude /api/test-chat.ts). `blueprintSupabaseLoader.ts` generado: reemplaza IndexedDB con `useBlueprintLibrary()` hook — pendiente integrar. `blueprintCopyProfileLoader.ts`: cierra flujo BlueprintLab → CopyLab Layer 13 — pendiente integrar.

### BlueprintLab — Google AI Studio (artifact)
Activo v1.2. Crea y edita blueprints (BP_PERSON_1.0, BP_LOCATION_1.0, BP_PRODUCT_1.0, BP_COPY_1.0). Persistencia actual: `window.storage` — debe migrar a Supabase (sprint pendiente). Sprint task: añadir `window.__SB_URL__` + `window.__SB_KEY__` en index.html → llamar `saveCopyProfile()` en save de BP_COPY_1.0 → upsert REST para BP_PERSON/LOCATION/PRODUCT.

### VideoLab — `unrlvl-video-lab.vercel.app`
Scaffolding. Storyboard operativo. NO genera video real — HeyGen y Kling planificados pero cuentas/API keys pendientes. `videolab_params` en Supabase listo pero no conectado. Marcas son placeholders genéricos.

### VoiceLab — `unrlvl-voice-lab.vercel.app`
Bloqueado. **Decisión de proveedor resuelta: ElevenLabs.** `voicelab_params.engine = elevenlabs_turbo_v2` en Supabase. Bloqueante único: voice_ids todos TBD_* — requiere audio limpio de PO (3-10 min) para ElevenLabs voice clone. Pipeline: grabar → subir → copiar voice_id → pegar en voicelab_params → VoiceLab sintetiza.

### Orchestrator — `orchestrator.vercel.app`
Scaffolding. Interpretación de intent con Gemini (client-side). `executeStage()` = mock — labs no conectados. Sprint pendiente: CREATE TABLE lab_configs + migrar Gemini a Claude server-side + cada lab expone POST /api/execute + Orchestrator llama endpoints reales.

### ForumPHs Speaks — testing
v2 checkpoint. Claude Sonnet 4. API key en browser — pendiente migración a AgentLab serverless (apps/forumphs-speaks/).

---

## MARCAS — ESTADO DE DATOS

| Marca | Idioma | copy_profile | goals/personas | humanize | geomix |
|---|---|---|---|---|---|
| NeuroneSCF | es-FL | ❌ vacío | ✅ completo | ✅ completo | ✅ completo |
| PatriciaOsorioPersonal | es-FL | ✅ AUTHORITY_EDU | ✅ | ⚠️ pendiente | ✅ |
| PatriciaOsorioComunidad | es-FL | ✅ COMMUNITY_MOTIVATOR | ✅ | ⚠️ pendiente | ✅ |
| PatriciaOsorioVizosSalon | es-FL | ✅ LUXURY_EXPERT | ✅ | ⚠️ pendiente | ✅ |
| DiamondDetails | es-ES | ✅ activo | ⚠️ pendiente | ⚠️ pendiente | ⚠️ pendiente |
| VizosCosmetics | es-ES | ✅ activo | ⚠️ pendiente | ⚠️ pendiente | ⚠️ pendiente |
| D7Herbal | es-ES | ✅ activo | ⚠️ pendiente | ⚠️ pendiente | ⚠️ pendiente |
| VivoseMask | es-ES | ✅ activo | ⚠️ pendiente | ⚠️ pendiente | ⚠️ pendiente |
| ForumPHs | es-PA | ❌ vacío | ⚠️ pendiente | ⚠️ pendiente | ⚠️ pendiente |
| UnrealvilleStudio | EN | ❌ vacío | ✅ | ⚠️ pendiente | ✅ |

---

## PROYECTOS ESTRATÉGICOS EN COLA

### LoRA Models — Identidad Visual Consistente
No iniciado. Objetivo: entrenar un modelo LoRA por persona clave (Patricia Osorio primero) para generar imágenes con consistencia absoluta de identidad. Pipeline: fotos BluePrints repo (100 fotos PO disponibles, calidad a validar) → Replicate/Fal.ai FLUX LoRA → `person_blueprints.lora_model_id`. Campos Supabase a añadir: `lora_model_id`, `lora_trigger_word`, `lora_provider`. Bloqueante: cuenta Replicate/Fal.ai + validar calidad fotos. Costo estimado: $2-5 por modelo en Replicate. Impacto: desbloquea consistencia en ImageLab y VideoLab.

### Voice Cloning — ElevenLabs
Proveedor decidido. Bloqueante: coordinar grabación de audio con PO (3-10 min sin ruido) + abrir cuenta ElevenLabs + API key. Campos Supabase listos. Voice IDs de ElevenLabs son compatibles directamente con HeyGen — desbloquea también VideoLab talking head.

---

## LOS 3 GAPS PRINCIPALES HOY

1. **Orchestrator ejecuta mocks** — labs funcionan en silos. Sin pipeline real, cada lab es isla.
2. **BlueprintLab sin persistencia Supabase** — los blueprints creados no llegan a los labs automáticamente. Flujo BP_COPY → CopyLab Layer 13 existe en código pero no en producción hasta que BlueprintLab guarde en Supabase.
3. **VoiceLab + VideoLab bloqueados por assets externos** — voice_ids TBD_*, cuentas HeyGen/Kling/ElevenLabs pendientes. El código está listo, faltan las cuentas y el audio de PO.

---

*Regenerado desde ecosystem.json v2026-04-04a · Claude Sonnet 4.6*
