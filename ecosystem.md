# UNRLVL Ecosystem — Radiografía Narrativa
*Versión: 2026-04-05a · Generado desde ecosystem.json · No editar directamente*

---

## ESTADO GLOBAL

**Studio:** Unrealville Studio — Sam, owner. Florida USA + LATAM + España.
**Supabase:** `amlvyycfepwhiindxgzw` — schema v1.9, 33 tablas, RLS habilitado.
**Vercel team:** `team_fEH94Irp6BAI9YGm4btGna5n`
**Estado ecosistema:** 100% READY — todos los labs en Vercel + 100% conectados a Supabase.

---

## CAPA A — PRODUCCIÓN REAL

### CopyLab — `unrlvl-copy-lab.vercel.app`
**PASSED v8.0.** Motor de copy del ecosistema. 24 queries paralelas a Supabase. SMPC 13 capas: Brand → Goals → Personas → Idioma → Canal → Humanize F2.5 → GeoMix → Keywords → CTA → Compliance → BP_COPY_1.0 → Extra → Template. 7 perfiles activos en `brand_copy_profiles` (PO×3, D7H, VivoseMask, DiamondDetails, VizosCosmetics). NeuroneSCF, ForumPHs y UnrealvilleStudio sin perfil — poblar via BlueprintLab. `/api/execute` activo para Orchestrator.

### WebLab — `web-lab.vercel.app`
**PASSED.** Genera landing pages y copy web (HTML/Liquid/WordPress). Supabase integration completa via `webBrandLoader.ts`. Fallback automático a hardcoded si Supabase falla. `/api/execute` activo.

### ImageLab — `image-lab-unrlvl.vercel.app`
**PASSED ICR v1.0.** Genera imágenes con Gemini 2.5 Flash + Google Imagen 3. **Psycho Layer completamente integrado:** `PsychoLayerSelector` en `PromptPackModule`, `buildPsychoVisualInjection()` inyecta el preset en `finalPrompt`. Supabase: brands, imagelab_presets, psycho_presets. `/api/execute` activo.

### SocialLab — `social-lab-flame.vercel.app`
**PASSED.** Gemini eliminado — engine Claude server-side via `/api/generate-post`. `CopyLabImportPanel` integrado en `PostBuilderModule` — import directo desde CopyLab. `brand_social_accounts` en Supabase lista esperando OAuth tokens. `/api/execute` activo: adapta copy por plataforma y escribe en `scheduled_posts`.

### AgentLab — `agent-lab-unrlvl.vercel.app`
**PASSED.** `blueprintStore.ts` Supabase-first: `loadAllBlueprints()` carga person_blueprints + location_blueprints + product_blueprints de Supabase. Fallback a IndexedDB para blueprints creados localmente. `blueprintCopyProfileLoader.ts` cierra flujo BlueprintLab → CopyLab Layer 11.

### BlueprintLab — `unrlvl-blueprint-lab.vercel.app`
**PASSED.** Migrado de Google AI Studio a Vercel. Supabase integration en JS compilado: guarda en `person_blueprints` y `brand_copy_profiles`. 4 schemas activos: BP_PERSON_1.0, BP_LOCATION_1.0, BP_PRODUCT_1.0, BP_COPY_1.0. Rol en el ecosistema: UI de administración — no expone `/api/execute`. El Orchestrator lee los blueprints directamente de Supabase.

### OnboardingApp — `unrlvl-onboarding-app.vercel.app`
**PASSED — Phase 4 completa.** Onboarding de nuevas marcas al ecosistema. Escribe **8 tablas**: brands, humanize_profiles, compliance_rules, brand_palette, brand_typography, brand_goals, brand_personas, geomix. Claude Sonnet 4 genera datos estructurados desde brief narrativo libre.

### Orchestrator — `orchestrator.vercel.app`
**PASSED.** Claude Sonnet 4 server-side via `/api/interpret-intent`. Lee `lab_configs` de Supabase. **4 labs activos en el pipeline:** CopyLab → WebLab → ImageLab → SocialLab. VideoLab y VoiceLab en `lab_configs` pero `active: false` — pendiente cuentas externas. Checkpoint gates (ThumbsUp/ThumbsDown) en stages con `requiresApproval: true`.

### Social Media Agent — `unrlvl-social-media-agent.vercel.app`
**Producción para NeuroneSCF** (operadora: Laura Rodriguez). Guía setup de infraestructura digital: Meta BM, WABA, TikTok. Claude Sonnet 4 + @vercel/kv historial 90 días. NO genera contenido social.

### UNRLVL-OPS — interno
**Operativo.** Dashboard interno de operaciones del studio.

---

## CAPA B — BLOQUEADOS POR ASSETS EXTERNOS

### VideoLab — `unrlvl-video-lab.vercel.app`
Storyboard builder operativo. `videoLabLoader.ts` + `VideoLabContext` leen brands/persons/locations de Supabase con fallback. NO genera video real — HeyGen y Kling sin cuentas ni API keys. `videolab_params` en Supabase listo. **Próximo sprint:** implementar `/api/execute` + conectar HeyGen/Kling + activar en `lab_configs`.

### VoiceLab — `unrlvl-voice-lab.vercel.app`
Decisión resuelta: ElevenLabs. `voicelab_params.engine = elevenlabs_turbo_v2` en Supabase. Bloqueante único: audio limpio de PO (3-10 min) para voice clone. En cuanto llegue el audio + cuenta ElevenLabs: pipeline completo en ~2h.

### ForumPHs Speaks — testing
v2 checkpoint. Claude Sonnet 4. API key en browser — pendiente migración a AgentLab serverless (apps/forumphs-speaks/). ~2-3h de trabajo.

---

## MARCAS — ESTADO DE DATOS EN SUPABASE

| Marca | humanize | goals | personas | geomix | copy_profile | palette | typography |
|---|---|---|---|---|---|---|---|
| NeuroneSCF | ⚠️ parcial | ✅ | ✅ | ✅ | ❌ pendiente | ✅ | ✅ |
| PatriciaOsorioPersonal | ❌ | ❌ | ❌ | ❌ | ✅ AUTHORITY_EDU | ❌ | ❌ |
| PatriciaOsorioComunidad | ❌ | ❌ | ❌ | ❌ | ✅ COMMUNITY_MOTIVATOR | ❌ | ❌ |
| PatriciaOsorioVizosSalon | ✅ | ❌ | ❌ | ❌ | ✅ LUXURY_EXPERT | ❌ | ❌ |
| DiamondDetails | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| D7Herbal | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| VizosCosmetics | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| VivoseMask | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| ForumPHs | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| UnrealvilleStudio | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| UnrealvilleStores | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

**OnboardingApp puede poblar todas estas columnas excepto copy_profile (BlueprintLab) y hex codes reales (Sam).**

---

## PROYECTOS ESTRATÉGICOS EN COLA

### Sprint VideoLab → Orchestrator (PRÓXIMA ACTIVIDAD)
Abrir cuentas HeyGen + Kling → implementar `/api/execute` en VideoLab → activar `lab_configs` → Orchestrator orquesta flujos de video completo.

### Voice Cloning — ElevenLabs
Proveedor decidido. Bloqueante: audio PO + cuenta ElevenLabs. Voice IDs compatibles con HeyGen — desbloquea VideoLab talking head simultáneamente.

### LoRA Models — Identidad Visual Consistente
No iniciado. Pipeline: fotos BluePrints repo → Replicate/Fal.ai FLUX LoRA → `person_blueprints.lora_model_id`. Costo: ~$2-5/modelo.

### OAuth Meta/TikTok
`brand_social_accounts` y `scheduled_posts` en Supabase listas. Falta implementar OAuth flow por marca + publicación real en SocialLab.

---

## LOS 3 GAPS PRINCIPALES HOY

1. **Datos de marca incompletos** — humanize, goals, personas, geomix, copy_profile vacíos para la mayoría de marcas. OnboardingApp y BlueprintLab pueden resolverlo. Sin esto, CopyLab genera con voz genérica DEFAULT.

2. **VideoLab sin motor real** — el lab más avanzado en producción visual está bloqueado por cuentas externas (HeyGen/Kling). El código y los datos en Supabase están listos.

3. **SocialLab sin publicación real** — el pipeline genera y encola en `scheduled_posts` pero no publica. OAuth Meta/TikTok es el único bloqueante.

---

*Regenerado desde ecosystem.json v2026-04-05a · Claude Sonnet 4.6*
