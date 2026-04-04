# UNRLVL Ecosystem Filemap — Mapa de Dependencias
*Versión: 2026-04-04a · Generado desde ecosystem.json · No editar directamente*

---

## FLUJOS ACTIVOS (producción real)

```
┌─────────────────────────────────────────────────────────────┐
│  FLUJO A: COPY GENERATION (activo)                          │
│                                                             │
│  Sam/PO → CopyLab UI                                        │
│    → fetchBrandContext() [24 queries || Supabase]           │
│       brands, goals, personas, idioma, canal,               │
│       humanize, geomix, keywords, cta, compliance,          │
│       brand_copy_profiles (Layer 13 NEW)                    │
│    → buildCopyPrompt() [13 capas SMPC]                      │
│    → /api/claude.ts [Claude Sonnet 4]                       │
│    → Output copy                                            │
│                                                             │
│  brand_copy_profiles ←── BlueprintLab (PENDIENTE)          │
│  brand_copy_profiles ←── OnboardingApp Phase 4 (PENDIENTE) │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FLUJO B: IMAGE GENERATION (activo)                         │
│                                                             │
│  Sam/PO → ImageLab UI                                       │
│    → BrandsProvider [brands desde Supabase]                 │
│    → brandLoader.ts [imagelab_presets por canal]            │
│    → [PsychoLayerSelector] ← ARCHIVOS LISTOS, UI PENDIENTE │
│    → Gemini 2.5 Flash → Google Imagen 3                     │
│    → Output imagen                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FLUJO C: WEB CONTENT (activo)                              │
│                                                             │
│  Sam → WebLab UI                                            │
│    → webBrandLoader.ts [humanize/compliance/blueprints]     │
│    → brandContexts.tsx fallback si Supabase falla           │
│    → /api/generate [Claude Sonnet 4]                        │
│    → Output web content                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## FLUJOS EN CONSTRUCCIÓN

```
┌─────────────────────────────────────────────────────────────┐
│  FLUJO D: SOCIAL PIPELINE (parcialmente operativo)          │
│                                                             │
│  CopyLab output                                             │
│    → copyLabBridge.ts [parsea JSON/texto/VP] ← NUEVO       │
│    → CopyLabImportPanel.tsx ← NUEVO (UI pendiente integrar) │
│    → SocialLab PostBuilder                                  │
│    → brand_social_accounts [OAuth pendiente]                │
│    → Meta/TikTok/IG API [OAuth pendiente]                   │
│                                                             │
│  ROTO: SocialLab genera copy con Gemini client-side         │
│  FIX: eliminar Gemini → recibir de CopyLab via bridge       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FLUJO E: BLUEPRINT → SUPABASE (pendiente sprint)           │
│                                                             │
│  BlueprintLab (Google AI Studio artifact)                   │
│    → BP_COPY_1.0 editor                                     │
│    → saveCopyProfile() [blueprintCopyProfileLoader.ts]      │  
│         ← ARCHIVO LISTO, INTEGRACIÓN PENDIENTE             │
│    → brand_copy_profiles [Supabase]                         │
│    → CopyLab fetchBrandContext() query #24                  │
│    → SMPC Layer 13 injection ← YA ACTIVO EN COPYLAB        │
│                                                             │
│  BP_PERSON/LOCATION/PRODUCT → upsert REST Supabase          │
│    ← PENDIENTE implementar en BlueprintLab                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FLUJO F: ORCHESTRATOR PIPELINE (mock — pendiente sprint)   │
│                                                             │
│  Sam → Orchestrator UI                                      │
│    → /api/interpret-intent.ts [Gemini → migrar a Claude]    │
│    → lab_configs [Supabase — tabla pendiente crear]         │
│    → executeStage() [MOCK → implementar fetch real]         │
│         CopyLab /api/execute ← lab debe exponer             │
│         ImageLab /api/execute ← lab debe exponer            │
│         SocialLab /api/execute ← lab debe exponer           │
│    → consolidated output                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## FLUJOS BLOQUEADOS POR ASSETS EXTERNOS

```
VoiceLab: voicelab_params [Supabase, listo] → engine=elevenlabs_turbo_v2
          voice_id = TBD_* → NECESITA: audio PO 3-10min + cuenta ElevenLabs

VideoLab: videolab_params [Supabase, listo] → HeyGen/Kling configs
          NECESITA: cuentas HeyGen + Kling + API keys

LoRA:     person_blueprints [Supabase] → lora_model_id = null
          NECESITA: cuenta Replicate/Fal.ai + fotos validadas + entrenamiento
```

---

## SUPABASE — MAPA DE TABLAS

### Tablas activas con datos
```
brands (12)              ← todas las marcas del ecosistema
humanize_profiles        ← NeuroneSCF completo. PO×3+resto pendientes.
brand_languages          ← todas las marcas
brand_services           ← todas las marcas
brand_goals              ← NeuroneSCF, PO×3, UnrealvilleStudio, Stores
brand_personas           ← NeuroneSCF, PO×3, UnrealvilleStudio, Stores
geomix                   ← NeuroneSCF, PO×3, UnrealvilleStudio, Stores
keywords (458)           ← multi-marca, multi-idioma
ctas (55)                ← multi-marca
compliance_rules (10)    ← DEFAULT + por marca
output_templates (22)    ← todos los formatos de CopyLab
canal_blocks (17)        ← todos los canales del ecosistema
channel_prompt_rules     ← reglas por canal
imagelab_presets (7)     ← global + NeuroneSCF
psycho_presets (10)      ← todos los objetivos psicográficos
brand_copy_profiles (7)  ← PO×3, D7H, VivoseMask, DiamondD, VizosC
voicelab_params (8)      ← todas las marcas, voice_id = TBD_*
videolab_params (6)      ← todas las marcas
person_blueprints (5)    ← PO×3 + NeuroneSCF personas
location_blueprints (7)  ← locaciones PO + NeuroneSCF
product_blueprints (41)  ← 39 NeuroneSCF + 2 otros
blueprint_schemas (4)    ← BP_PERSON/LOCATION/PRODUCT/COPY v1.0
```

### Tablas vacías / pendientes de poblar
```
brand_palette            ← hex codes pendientes de Sam
brand_typography         ← tipografías pendientes de Sam
brand_assets             ← URLs fotos BluePrints repo pendientes
brand_social_accounts    ← creada sprint 4, poblar en sprint OAuth
platform_configs         ← configuración por plataforma social
agents                   ← Agent deployments config
agent_flows              ← flujos de agentes
lab_configs              ← PENDIENTE CREAR en sprint Orchestrator
```

---

## NAMING CONVENTIONS

### brand_id canónico (PK en Supabase)
| Canónico | Incorrecto que puede aparecer |
|---|---|
| `NeuroneSCF` | `neuroneCosmetics`, `neurone-scf`, `NeuroneSCFL` |
| `PatriciaOsorioPersonal` | `patriciaOsorioPersonal`, `po-personal` |
| `PatriciaOsorioComunidad` | `patriciaOsorioComunidad` |
| `PatriciaOsorioVizosSalon` | `patriciaOsorioVizosSalon` |
| `DiamondDetails` | `diamondDetails`, `diamond_details` |
| `D7Herbal` | `d7Herbal`, `d7-herbal` |
| `VivoseMask` | `vivoseMask`, `vivose_mask` |
| `VizosCosmetics` | `vizosCosmetics` |
| `ForumPHs` | `forumPhs`, `forum-phs` |
| `UnrealvilleStudio` | `unrealilleStudio` |

### Inconsistencias conocidas por lab
- **AgentLab Builder:** usa guiones (`d7-herbal`) — mapear manualmente
- **VideoLab:** marcas placeholder genéricas — no tiene marcas UNRLVL reales
- **VoiceLab ScriptModule:** usa underscore (`diamond_details`)
- **WebLab interno:** usa camelCase → `webBrandLoader.ts` traduce automáticamente

---

## COMMITS PENDIENTES (sprint 4)

```
Repo          Archivo                                          Acción
─────────────────────────────────────────────────────────────────────
CopyLab       src/lib/queries.ts                              REEMPLAZAR (v3)
CopyLab       src/lib/buildCopyPrompt.ts                      REEMPLAZAR
ImageLab      src/services/psychoPresetLoader.ts              NUEVO
ImageLab      src/components/PsychoLayerSelector.tsx          NUEVO
SocialLab     src/services/copyLabBridge.ts                   NUEVO
SocialLab     src/modules/postbuilder/CopyLabImportPanel.tsx  NUEVO
AgentLab      src/services/blueprintSupabaseLoader.ts         NUEVO
AgentLab      src/services/blueprintCopyProfileLoader.ts      NUEVO
AgentLab      src/services/geminiService.ts                   ELIMINAR
```

**Regla de rutas:** archivos de marca → `brands/[Marca]/`, archivos de ecosistema → raíz `/`, protocolos → `protocols/`. Verificar siempre que GitHub Desktop muestre modificaciones, no archivos nuevos.

---

## ROADMAP PRIORIZADO POR IMPACTO

| Prioridad | Sprint | Impacto |
|---|---|---|
| 🔴 ALTA | BlueprintLab → Supabase | Cierra flujo BP_COPY → CopyLab Layer 13. Activa datos reales en todos los labs. |
| 🔴 ALTA | LoRA Models + Voice Cloning | Desbloquea ImageLab+VideoLab+VoiceLab para PO. Producto diferenciador. |
| 🟡 MEDIA | Orchestrator Launch | Pipeline completo inter-lab. Automatiza flujos multi-output. |
| 🟡 MEDIA | SocialLab rediseño rol | Eliminar Gemini, integrar bridge CopyLab, OAuth plataformas. |
| 🟡 MEDIA | VideoLab → Supabase + cuentas | Conectar videolab_params + HeyGen/Kling. |
| 🟢 BAJA | OnboardingApp Phase 4 | Escribir brand_goals/personas/geomix desde flujo. |
| 🟢 BAJA | ForumPHs Speaks migración | API key browser → serverless. |

---

*Regenerado desde ecosystem.json v2026-04-04a · Claude Sonnet 4.6*
