# UNRLVL Ecosystem — Radiografía Narrativa
*Versión: 2026-04-05b · Generado desde ecosystem.json · No editar directamente*

---

## ESTADO GLOBAL

**Studio:** Unrealville Studio — Sam, owner. Florida USA + LATAM + España.
**Supabase:** `amlvyycfepwhiindxgzw` — schema v1.9, 33 tablas, 14MB/500MB usados.
**Vercel:** 12+ proyectos deployados. ⚠️ Upgrade a Pro requerido inmediatamente.
**Estado ecosistema:** 100% READY — todos los labs en Vercel + 100% conectados a Supabase.

---

## COSTOS OPERATIVOS — CERRADOS 2026-04-05

### Total mensual: $457-507/mes

| Plataforma | Tipo | Total/mes | Notas |
|---|---|---|---|
| **Claude.ai Pro Max ×5** | Fijo | ~$115 | Interfaz de trabajo Sam+Claude |
| **Anthropic API** | Variable | $40-60 | Labs + Orchestrator |
| **Google Gemini/Imagen 3** | Variable | $15-20 | ImageLab ~400 imgs/mes |
| **ElevenLabs Creator** | Fijo | $22 | Voces reales PO×3 + Ivette |
| **Chatterbox (Fal.ai)** | Variable | $5-10 | Voces sintéticas D7H, Vivosé, secundarios |
| **HeyGen Creator + add-ons + API** | Mixto | ~$166 | $29 plan + $87 (3 avatar add-ons) + ~$50 API credits |
| **Kling** | Variable | $20-25 | Video generativo, pay-per-use |
| **Fal.ai** | Variable | $15-20 | LoRA inference + Chatterbox TTS |
| **Vercel Pro** | Fijo | $20 | 1 seat — upgrade inmediato requerido |
| **Supabase** | Fijo | $0 | Free plan — upgrade a $25 cuando llegue a ~400MB |
| **Shopify Basic (NeuroneSCF)** | Fijo | $39 | Única tienda activa |

**Setup one-time:** LoRA training ~$20 total (PO×3 + Ivette). HeyGen avatar creation $29-199/avatar.

### Stack de avatares definido

| Necesidad | Herramienta |
|---|---|
| Voz persona real (PO, Ivette) | ElevenLabs Professional Clone |
| Voz sintética diseñada | Chatterbox (MIT open source) via Fal.ai |
| LoRA identidad visual persona real | Fal.ai FLUX LoRA |
| Talking head video | HeyGen Instant Avatar + ElevenLabs voice |
| Video generativo (producto, escena) | Kling |

### Triggers de upgrade

**Vercel → Pro ($20/mes):** YA. Hobby prohíbe uso comercial + timeout 10s insuficiente para CopyLab (24 queries + Claude = 15-25s).
**Supabase → Pro ($25/mes):** Cuando DB llegue a ~400MB. Hoy: 14MB (2.8% del límite).
**ElevenLabs → Pro ($99/mes):** Si voces sintéticas escalan a >100 min/mes.
**HeyGen → Business ($149/mes):** Cuando necesites >4 avatares custom simultáneos.

---

## CAPA A — PRODUCCIÓN REAL

### CopyLab — `unrlvl-copy-lab.vercel.app`
**PASSED v8.0.** 24 queries paralelas. SMPC 13 capas. 7 perfiles en `brand_copy_profiles`. `/api/execute` activo para Orchestrator. Gap: NeuroneSCF, ForumPHs, UnrealvilleStudio sin copy profile.

### WebLab — `web-lab.vercel.app`
**PASSED.** HTML/Liquid/WordPress. Supabase completo. `/api/execute` activo.

### ImageLab — `image-lab-unrlvl.vercel.app`
**PASSED ICR v1.0.** Gemini 2.5 Flash + Imagen 3. PsychoLayerSelector integrado en PromptPackModule. `/api/execute` activo.

### SocialLab — `social-lab-flame.vercel.app`
**PASSED.** Gemini eliminado. Claude server-side. CopyLabImportPanel integrado. `scheduled_posts` en Supabase. `/api/execute` activo. Pendiente: OAuth Meta/TikTok.

### AgentLab — `agent-lab-unrlvl.vercel.app`
**PASSED.** blueprintStore Supabase-first. Fallback IndexedDB.

### BlueprintLab — `unrlvl-blueprint-lab.vercel.app`
**PASSED.** En Vercel. Supabase integration compilada. 4 schemas: BP_PERSON/LOCATION/PRODUCT/COPY. UI de administración — no expone `/api/execute`.

### OnboardingApp — `unrlvl-onboarding-app.vercel.app`
**PASSED — Phase 4 completa.** Escribe 8 tablas: brands, humanize_profiles, compliance_rules, brand_palette, brand_typography, brand_goals, brand_personas, geomix.

### Orchestrator — `orchestrator.vercel.app`
**PASSED.** Claude server-side. 4 labs activos: CopyLab → WebLab → ImageLab → SocialLab. Checkpoint gates ThumbsUp/ThumbsDown. VideoLab y VoiceLab en lab_configs pero `active: false`.

### Social Media Agent — `unrlvl-social-media-agent.vercel.app`
**Producción NeuroneSCF.** Claude Sonnet 4 + @vercel/kv 90 días. Export: `GET /api/export?secret=[URL-encoded]`.

---

## CAPA B — BLOQUEADOS POR ASSETS EXTERNOS

### VideoLab — `unrlvl-video-lab.vercel.app`
Storyboard operativo. Supabase via videoLabLoader. Sin motor real — HeyGen/Kling sin cuentas. **Próximo sprint:** `/api/execute` + cuentas + activar lab_configs.

### VoiceLab — `unrlvl-voice-lab.vercel.app`
ElevenLabs decidido. `voicelab_params.engine = elevenlabs_turbo_v2`. Bloqueante: audio PO (3-10 min) + cuenta ElevenLabs.

---

## MARCAS — DATOS EN SUPABASE

| Marca | humanize | goals | personas | geomix | copy_profile | palette | typography |
|---|---|---|---|---|---|---|---|
| NeuroneSCF | ⚠️ parcial | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| PatriciaOsorioPersonal | ❌ | ❌ | ❌ | ❌ | ✅ AUTHORITY_EDU | ❌ | ❌ |
| PatriciaOsorioComunidad | ❌ | ❌ | ❌ | ❌ | ✅ COMMUNITY_MOTIVATOR | ❌ | ❌ |
| PatriciaOsorioVizosSalon | ✅ | ❌ | ❌ | ❌ | ✅ LUXURY_EXPERT | ❌ | ❌ |
| DiamondDetails | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| D7Herbal | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| VizosCosmetics | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| VivoseMask | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| ForumPHs | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| UnrealvilleStudio | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## LOS 3 GAPS PRINCIPALES HOY

1. **Datos de marca incompletos** — humanize, goals, personas, geomix, copy_profile vacíos para la mayoría. OnboardingApp y BlueprintLab pueden resolverlo.
2. **VideoLab sin motor real** — código y Supabase listos. Bloqueado por cuentas HeyGen/Kling.
3. **SocialLab sin publicación real** — pipeline genera y encola en `scheduled_posts`. OAuth Meta/TikTok es el único bloqueante.

---

*Regenerado desde ecosystem.json v2026-04-05b · Claude Sonnet 4.6*
