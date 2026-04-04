# UNRLVL Session Log

---

## 2026-04-04 — Sprint 4: Integración Labs a Supabase (continuación) + Build fixes

**Status deploys al cierre:**

| Lab | Estado | Commit |
|---|---|---|
| CopyLab | ✅ READY | "Update queries.ts" (v3 — sbFetch inline + fetchProductCatalog + query #24) |
| SocialLab | ✅ READY | "Update package.json" (redeploy anterior) |
| ImageLab | ✅ READY | sprint 3 |
| AgentLab | ✅ READY | sprint 3 |
| VideoLab | ✅ READY | sprint 3 |
| VoiceLab | ✅ READY | sprint 3 |
| BlueprintLab | ✅ READY | sprint 3 |

---

### Decisiones

**VoiceLab provider: ElevenLabs (DECISIÓN FINAL)**
No Fish Audio, no TenzorArt. Razones: mejor es-FL/Spanglish Miami con Multilingual v2, voice cloning superior con audio largo de referencia (3-10 min), integración nativa HeyGen (voice IDs directos), `voicelab_params.engine` ya tiene `elevenlabs_turbo_v2` como default en Supabase. Cuando PO grabe audio → subir a ElevenLabs → copiar voice_id → pegar en `voicelab_params`. 0h de código adicional.

**AgentLab geminiService.ts: ELIMINAR**
TestMode migró de Gemini → Claude server-side vía `/api/test-chat.ts`. geminiService.ts es dead code. Eliminar también `VITE_GEMINI_API_KEY` de env vars de AgentLab en Vercel.

---

### Supabase

- **`brand_social_accounts`** creada: RLS, índices, constraint unicidad `(brand_id, platform)` para cuenta primaria. Lista para sprint OAuth. Schema v1.8 — 32 tablas.
- **`brand_copy_profiles`** — 7 perfiles activos confirmados: PatriciaOsorioPersonal (AUTHORITY_EDU), PatriciaOsorioComunidad (COMMUNITY_MOTIVATOR), PatriciaOsorioVizosSalon (LUXURY_EXPERT), D7Herbal, VivoseMask, DiamondDetails, VizosCosmetics.

---

### CopyLab — SMPC Layer 13 (BP_COPY_1.0)

Archivos modificados (REEMPLAZOS):
- `src/lib/queries.ts` — sbFetch inline (no importa de supabaseClient.ts), query #24 `brand_copy_profiles`, `fetchProductCatalog` reincorporado (3 iteraciones de debug — errores: @supabase/supabase-js no en package.json → sbFetch inline fix; fetchProductCatalog faltaba → reincorporado)
- `src/lib/buildCopyPrompt.ts` — `buildCopyProfileLayer()` + inyección entre Compliance y ExtraNotes + `copyProfileInjected` en metadata

SMPC ahora: Brand → Goals → Personas → Idioma → Canal → Humanize → GeoMix → Keywords → CTA → Compliance → **BP_COPY_1.0** → Extra → Template (13 capas, 24 queries paralelas).

**PENDIENTE:** Poblar `brand_copy_profiles` para NeuroneSCF (vacío actualmente).

---

### SocialLab — CopyLab Bridge

Archivos NUEVOS (subir al repo):
- `src/services/copyLabBridge.ts` — parsea output CopyLab (texto libre, JSON VP, JSON estructurado). `importFromClipboard()`. `loadBrandSocialAccounts()`. Fix aplicado: eliminado `_meta` del tipo `ScheduledPost`.
- `src/modules/postbuilder/CopyLabImportPanel.tsx` — panel UI. Fix aplicado: eliminado `space: 12` (propiedad CSS inválida).

**PENDIENTE INTEGRACIÓN:** Añadir `CopyLabImportPanel` en `PostBuilderModule.tsx`.

---

### ImageLab — Psycho Layer selector

Archivos NUEVOS (subir al repo):
- `src/services/psychoPresetLoader.ts` — carga 10 presets de `psycho_presets` desde Supabase. `buildPsychoVisualInjection()`.
- `src/components/PsychoLayerSelector.tsx` — dropdown con colores por objetivo, deselección.

**PENDIENTE INTEGRACIÓN:** Añadir `PsychoLayerSelector` en el panel de generación + `buildPsychoVisualInjection()` al prompt.

---

### AgentLab — Blueprint Supabase Loader

Archivos NUEVOS (subir al repo):
- `src/services/blueprintSupabaseLoader.ts` — reemplaza IndexedDB en BlueprintLibrary. `useBlueprintLibrary()` hook, `loadAllBlueprints()`, `loadBlueprintsByBrand()`.
- `src/services/blueprintCopyProfileLoader.ts` — cierra flujo roto: BlueprintLab → `saveCopyProfile()` → `brand_copy_profiles` → CopyLab Layer 13.

**PENDIENTE:** Eliminar `src/services/geminiService.ts` + eliminar `VITE_GEMINI_API_KEY` de Vercel env vars.

---

### Commits pendientes

```
CopyLab/src/lib/queries.ts                          ← REEMPLAZAR (v3)
CopyLab/src/lib/buildCopyPrompt.ts                  ← REEMPLAZAR
ImageLab/src/services/psychoPresetLoader.ts         ← NUEVO
ImageLab/src/components/PsychoLayerSelector.tsx     ← NUEVO
SocialLab/src/services/copyLabBridge.ts             ← NUEVO
SocialLab/src/modules/postbuilder/CopyLabImportPanel.tsx ← NUEVO
AgentLab/src/services/blueprintSupabaseLoader.ts    ← NUEVO
AgentLab/src/services/blueprintCopyProfileLoader.ts ← NUEVO
AgentLab/src/services/geminiService.ts              ← ELIMINAR
```

---

### Próxima sesión — Sprint BlueprintLab → Supabase

**Objetivo:** Cerrar el flujo BP_COPY_1.0: BlueprintLab guarda en Supabase → CopyLab lee en Layer 13.

1. En index.html del artifact de BlueprintLab (Google AI Studio), añadir:
   ```html
   <script>
     window.__SB_URL__ = 'https://amlvyycfepwhiindxgzw.supabase.co';
     window.__SB_KEY__ = 'sb_publishable_CTQ1aeyXyNilsBO64xGu9w_5Wmfe3K6';
   </script>
   ```
2. En el save/export handler de BP_COPY_1.0, importar `saveCopyProfile` de `blueprintCopyProfileLoader.ts` y llamarla con el formData.
3. Para BP_PERSON_1.0: en el save handler, hacer `PATCH /rest/v1/person_blueprints?id=eq.{id}` con el formData. Si nuevo, `POST`.
4. Para BP_LOCATION_1.0: igual, tabla `location_blueprints`.
5. Para BP_PRODUCT_1.0: igual, tabla `product_blueprints`.
6. En AgentLab Builder: importar `useBlueprintLibrary()` de `blueprintSupabaseLoader.ts` y reemplazar la carga desde IndexedDB.
7. Verificar que al salvar un BP_COPY_1.0 en BlueprintLab → aparece en `brand_copy_profiles` en Supabase → CopyLab lo inyecta en Layer 13.

---

### Próxima sesión — Sprint Orchestrator Launch

**Objetivo:** Pasar executeStage() de mock a real. Labs conectados en pipeline.

1. Crear tabla `lab_configs` en Supabase:
   ```sql
   CREATE TABLE lab_configs (
     id text PRIMARY KEY,
     lab_name text NOT NULL,
     api_endpoint text NOT NULL,      -- URL del /api/execute de cada lab
     default_params jsonb DEFAULT '{}',
     pipeline_order int,
     active boolean DEFAULT true,
     created_at timestamptz DEFAULT now()
   );
   ```
2. En cada lab que el Orchestrator necesite controlar, crear `api/execute.ts`:
   - Acepta: `{ brandId, stage, params }`
   - Devuelve: `{ output, status, metadata }`
   - Priorizar: CopyLab, ImageLab, SocialLab primero
3. En Orchestrator `src/services/orchestratorEngine.ts`: reemplazar `executeStage()` mock con fetch real a `lab_configs[lab].api_endpoint`.
4. Migrar interpretación de intent: `Gemini client-side` → `POST /api/interpret-intent.ts` con Claude (mismo patrón que /api/claude.ts en CopyLab).
5. Poblar `lab_configs` con los endpoints reales después de crear los /api/execute en cada lab.
6. Test completo: Orchestrator interpreta intent → lee lab_configs → ejecuta CopyLab /api/execute → resultado al SocialLab → consolida.

---

### Proyectos estratégicos en cola

**LoRA Models (identidad visual consistente)**
- Objetivo: entrenar LoRA por persona clave (PO, etc.) para imágenes con consistencia de identidad
- Pipeline: fotos BluePrints repo → Replicate/Fal.ai FLUX LoRA → `person_blueprints.lora_model_id`
- Campos Supabase a añadir: `person_blueprints.lora_model_id`, `.lora_trigger_word`, `.lora_provider`
- Bloqueante: cuenta Replicate/Fal.ai + validar calidad fotos PO (~100 en repo)
- Impacto: desbloquea consistencia en ImageLab + VideoLab para PO

**Voice Cloning (ElevenLabs)**
- Pipeline: audio PO 3-10 min limpio → ElevenLabs Voice Cloning → voice_id → `voicelab_params`
- Campos Supabase listos: `voicelab_params.voice_id`, `.engine = elevenlabs_turbo_v2`
- Bloqueante: coordinar grabación con PO + abrir cuenta ElevenLabs
- Impacto: desbloquea VoiceLab + VideoLab talking head

---

*Log actualizado: 2026-04-04 — Claude Sonnet 4.6*
