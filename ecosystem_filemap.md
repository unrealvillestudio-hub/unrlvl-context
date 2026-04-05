# UNRLVL Ecosystem Filemap — Mapa de Dependencias
*Versión: 2026-04-05a · Generado desde ecosystem.json · No editar directamente*

---

## SEPARACIÓN PRODUCCIÓN / INTERNO

### PRODUCCIÓN (sirven a marcas y clientes)
```
Labs activos:   CopyLab · WebLab · ImageLab · SocialLab · AgentLab · BlueprintLab · OnboardingApp · Orchestrator
Agentes:        Social Media Agent · ForumPHs Speaks (testing)
Labs bloqueados: VideoLab (HeyGen/Kling) · VoiceLab (ElevenLabs/audio PO)
Asset repos:    BluePrints · Shopify
```

### INTERNO / OPERATIVO
```
Contexto:  Context System · Session Protocol · UNRLVL-PROJECT Dashboard
Gestión:   UNRLVL-OPS
```

---

## FLUJOS ACTIVOS (producción real hoy)

```
┌─────────────────────────────────────────────────────────────────┐
│  FLUJO A: COPY GENERATION                                       │
│                                                                 │
│  Sam → CopyLab UI                                               │
│    → fetchBrandContext() [24 queries || Supabase]               │
│       brands · goals · personas · idioma · canal                │
│       humanize · geomix · keywords · cta · compliance           │
│       brand_copy_profiles (Layer 11 BP_COPY_1.0)               │
│    → buildCopyPrompt() [13 capas SMPC]                          │
│    → /api/claude.ts [Claude Sonnet 4]                           │
│    → Output copy                                                │
│                                                                 │
│  brand_copy_profiles ←── BlueprintLab (BP_COPY_1.0)            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLUJO B: IMAGE GENERATION + PSYCHO LAYER                       │
│                                                                 │
│  Sam → ImageLab UI                                              │
│    → BrandsProvider [brands desde Supabase]                     │
│    → brandLoader.ts [imagelab_presets por canal]                │
│    → PsychoLayerSelector [psycho_presets desde Supabase]       │
│    → PromptPackModule: finalPrompt += buildPsychoVisualInjection│
│    → Gemini 2.5 Flash → Google Imagen 3                         │
│    → Output imagen                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLUJO C: ORCHESTRATOR PIPELINE (4 labs activos)                │
│                                                                 │
│  Sam → Orchestrator UI → prompt libre                           │
│    → /api/interpret-intent [Claude Sonnet 4]                    │
│       lee brands desde Supabase → genera plan de stages         │
│    → lab_configs [Supabase] → endpoints de cada lab             │
│    → executeStage() → POST /api/execute por lab                 │
│         CopyLab ✅ → copia en Supabase + output copy            │
│         ImageLab ✅ → genera imagen via Gemini                  │
│         WebLab ✅ → genera HTML/Liquid                          │
│         SocialLab ✅ → adapta copy → scheduled_posts Supabase  │
│    → Checkpoint gates (ThumbsUp/ThumbsDown) por stage           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLUJO D: ONBOARDING → SUPABASE (8 tablas)                      │
│                                                                 │
│  Sam → OnboardingApp → brief narrativo libre (Phase 1)          │
│    → Claude genera StructuredBrandContext JSON (Phase 2)        │
│    → Gap interview (Phase 3)                                    │
│    → writeBrandToSupabase() (Phase 4):                         │
│         brands ✅                                               │
│         humanize_profiles ✅                                    │
│         compliance_rules ✅                                     │
│         brand_palette ✅ (sugerencias AI)                       │
│         brand_typography ✅ (sugerencias AI)                    │
│         brand_goals ✅ NEW                                      │
│         brand_personas ✅ NEW                                   │
│         geomix ✅ NEW                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLUJO E: BLUEPRINT → SUPABASE → LABS                           │
│                                                                 │
│  Sam → BlueprintLab (unrlvl-blueprint-lab.vercel.app)           │
│    → BP_COPY_1.0 editor → saveCopyProfile()                     │
│    → brand_copy_profiles [Supabase]                             │
│    → CopyLab query #24 → SMPC Layer 11 injection ✅             │
│                                                                 │
│  BP_PERSON/LOCATION/PRODUCT → Supabase tablas                   │
│    → AgentLab blueprintStore.ts loadAllBlueprints() ✅          │
│    → VideoLab videoLabLoader.ts [persons/locations] ✅           │
└─────────────────────────────────────────────────────────────────┘
```

---

## FLUJOS BLOQUEADOS POR ASSETS EXTERNOS

```
┌─────────────────────────────────────────────────────────────────┐
│  FLUJO F: ORCHESTRATOR → VIDEOLAB (PRÓXIMO SPRINT)             │
│                                                                 │
│  Orchestrator interpreta prompt con video                       │
│    → lab_configs: videolab active = false ← BLOQUEADO          │
│    → VideoLab no tiene /api/execute ← PENDIENTE                │
│                                                                 │
│  PARA ACTIVAR:                                                  │
│  1. Abrir cuenta HeyGen + API key                               │
│  2. Implementar VideoLab/api/execute.ts                         │
│       → recibe brandId + stage + previousOutputs.copylab        │
│       → construye storyboard desde CopyLab script output        │
│       → llama HeyGen API → genera video                         │
│  3. UPDATE lab_configs SET active=true WHERE lab_key='videolab' │
└─────────────────────────────────────────────────────────────────┘

VoiceLab:  voicelab_params [Supabase, listo] · engine=elevenlabs_turbo_v2
           NECESITA: audio PO 3-10min + cuenta ElevenLabs + API key

SocialLab: scheduled_posts [Supabase, activo — se puebla via Orchestrator]
           NECESITA: OAuth Meta/TikTok por marca para publicación real
           STATUS: post encolado → pending_oauth → publicado (cuando OAuth listo)
```

---

## SUPABASE v1.9 — MAPA DE TABLAS

### Tablas activas con datos
```
brands (11)              ← todas las marcas del ecosistema
humanize_profiles        ← 6 marcas + DEFAULT global
brand_languages          ← todas
brand_services           ← todas
brand_goals              ← NeuroneSCF, PO×3, UNRLVL, Stores
brand_personas           ← NeuroneSCF, PO×3, UNRLVL, Stores
geomix                   ← NeuroneSCF, DiamondDetails, D7Herbal, UNRLVL, Stores
keywords (458)           ← multi-marca
ctas (55)                ← multi-marca
compliance_rules (10)    ← DEFAULT + por marca
output_templates (22)    ← todos los formatos CopyLab
canal_blocks (17)        ← todos los canales
channel_prompt_rules     ← reglas por canal
imagelab_presets (7)     ← global + NeuroneSCF
psycho_presets (10)      ← todos los objetivos psicográficos
brand_copy_profiles (7)  ← PO×3, D7H, VivoseMask, DiamondD, VizosC
voicelab_params (8)      ← todas las marcas, voice_id=TBD_*
videolab_params (6)      ← todas las marcas
person_blueprints (5)    ← PO×3 + NeuroneSCF personas
location_blueprints (7)  ← locaciones PO + NeuroneSCF
product_blueprints (41)  ← 39 NeuroneSCF + 2 otros
blueprint_schemas (4)    ← BP_PERSON/LOCATION/PRODUCT/COPY v1.0
lab_configs (8)          ← 8 labs, 4 activos, 4 inactivos
scheduled_posts          ← SocialLab queue (se puebla via Orchestrator)
brand_social_accounts    ← creada, pendiente OAuth tokens
```

### Tablas vacías / pendientes de poblar
```
brand_palette            ← hex codes pendientes de Sam
brand_typography         ← tipografías pendientes de Sam
brand_assets             ← URLs fotos BluePrints repo pendientes
platform_configs         ← configuración por plataforma social
agents                   ← Agent deployments config
agent_flows              ← flujos de agentes
```

---

## COMMITS PENDIENTES DE SAM (ninguno de código — solo datos)

Todo el código está commiteado y deployado. Los únicos pendientes son:
```
Acción                              Herramienta        Impacto
──────────────────────────────────────────────────────────────
Onboarding ForumPHs                 OnboardingApp      CopyLab funciona para ForumPHs
Onboarding PO×3 humanize            OnboardingApp      Voz específica en CopyLab/WebLab
Onboarding VivoseMask completo      OnboardingApp      Voz + goals + personas
Hex codes paleta todas las marcas   Supabase / Sam     WebLab genera con colores reales
BP_COPY_1.0 NeuroneSCF              BlueprintLab       CopyLab Layer 11 para Neurone
Audio limpio PO (3-10 min)          Sam coordina PO    Desbloquea VoiceLab + VideoLab
Cuenta ElevenLabs                   Sam abre cuenta    API key → voicelab_params
Cuenta HeyGen                       Sam abre cuenta    Sprint VideoLab → Orchestrator
```

---

## ROADMAP PRIORIZADO

| Prioridad | Sprint | Impacto |
|---|---|---|
| 🔴 INMEDIATO | Datos via OnboardingApp | Desbloquea CopyLab/WebLab con voz real para todas las marcas |
| 🔴 INMEDIATO | BP_COPY NeuroneSCF via BlueprintLab | Cliente principal con voz real en SMPC |
| 🔴 INMEDIATO | Hex codes paleta (Sam) | WebLab genera con identidad visual real |
| 🟡 CORTO | Sprint VideoLab → Orchestrator | Pipeline completo con video. Cuentas HeyGen/Kling. |
| 🟡 CORTO | ElevenLabs + audio PO | VoiceLab activo + VideoLab talking head |
| 🟡 MEDIO | OAuth Meta/TikTok | SocialLab publica real (scheduled_posts → live) |
| 🟢 LARGO | ForumPHs Speaks → AgentLab serverless | Eliminar API key en browser |
| 🟢 LARGO | LoRA Models PO | Consistencia visual en ImageLab/VideoLab |

---

## IDs CANÓNICOS DE MARCA

| ID canónico | Nombre visible |
|---|---|
| `NeuroneSCF` | Neurone South & Central Florida |
| `PatriciaOsorioPersonal` | Patricia Osorio · Personal |
| `PatriciaOsorioComunidad` | Patricia Osorio · Comunidad |
| `PatriciaOsorioVizosSalon` | Patricia Osorio · Vizos Salón |
| `DiamondDetails` | Diamond Details |
| `D7Herbal` | D7 Herbal |
| `VivoseMask` | Vivosé Mask |
| `VizosCosmetics` | Vizos Cosmetics |
| `ForumPHs` | ForumPHs |
| `UnrealvilleStudio` | Unrealville Studio |
| `UnrealvilleStores` | Unrealville Stores |

---

*Regenerado desde ecosystem.json v2026-04-05a · Claude Sonnet 4.6*
