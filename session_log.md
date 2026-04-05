# Session Log — Ecosistema UNRLVL
*Fuente única de verdad para el historial de sesiones de trabajo del ecosistema.*

---

## 2026-04-05 — Sprint Final: Ecosistema 100% Conectado

**Duración:** Sesión completa
**Conducted by:** Claude Sonnet 4.6

### Resuelto en esta sesión

**Orchestrator — Sprint completo:**
- `api/interpret-intent.ts` — Gemini client-side reemplazado por Claude Sonnet 4 server-side
- `src/services/orchestratorEngine.ts` — `executeStage()` real via `lab_configs` Supabase (no mock)
- `src/services/brandsLoader.ts` — brands desde Supabase con fallback
- `src/config/brands.ts` — IDs canónicos corregidos (UnrealIlleStudio → UnrealvilleStudio, NeuroneCosmetics → NeuroneSCF)
- `api/execute.ts` — generado para CopyLab, WebLab, ImageLab, SocialLab
- Supabase: `CREATE TABLE scheduled_posts` (SocialLab queue)
- Supabase: `lab_configs` poblada con 8 labs + `lab_key` canónico. 4 activos: copylab, weblab, imagelab, sociallab
- RLS security fix: eliminadas políticas `anon_write` permisivas en `lab_configs` y `brand_social_accounts`
- BlueprintLab: URL corregida en `lab_configs` a `unrlvl-blueprint-lab.vercel.app` (estaba en Google AI Studio)

**OnboardingApp — Phase 4 completa:**
- `src/types/index.ts` — añadidas interfaces `BrandGoalDraft`, `BrandPersonaDraft`, `GeoMixDraft`; `StructuredBrandContext` extendida
- `src/lib/brandWriter.ts` — secciones 6-8: escribe `brand_goals`, `brand_personas`, `geomix`
- `src/modules/onboarding/prompts.ts` — PHASE2_SYSTEM_PROMPT genera los 3 schemas nuevos con campo `claude_reasoning`
- `src/modules/onboarding/Phase4Summary.tsx` — checklist actualizado: 8 tablas mostradas
- **OnboardingApp ahora escribe 8 tablas:** brands, humanize_profiles, compliance_rules, brand_palette, brand_typography, brand_goals, brand_personas, geomix

**SocialLab — Integración CopyLabBridge:**
- `PostBuilderModule.tsx` — import `CopyLabImportPanel` + handler `handleCopyLabImport` + `<CopyLabImportPanel>` en JSX

**AgentLab — Supabase-first:**
- `blueprintStore.ts` — `hydrate()` ahora Supabase-first via `loadAllBlueprints()`, fallback IndexedDB

**ImageLab — Psycho Layer wired:**
- `PromptPackModule.tsx` — `PsychoLayerSelector` integrado, estado `psychoPreset`, pasado a `runPromptPack`
- `promptpack.ts` — `psychoPreset` en params type + destructuring + `buildPsychoVisualInjection()` inyecta en `finalPrompt`
- `PsychoLayerSelector.tsx` — bug de import path corregido (`../services/psychoPresetLoader` → `../psychoPresetLoader`)

**BlueprintLab:**
- Confirmado en Vercel READY (`unrlvl-blueprint-lab.vercel.app`). Supabase integration en JS compilado.
- Aclaración arquitectural: BlueprintLab es UI de administración, no ejecutor. Orchestrator lee blueprints de Supabase directamente.

### Estado final verificado

| Lab | Vercel | Supabase | Orchestrator |
|---|---|---|---|
| CopyLab | ✅ READY | ✅ 100% | ✅ /api/execute activo |
| WebLab | ✅ READY | ✅ 100% | ✅ /api/execute activo |
| ImageLab | ✅ READY | ✅ 100% | ✅ /api/execute activo |
| SocialLab | ✅ READY | ✅ 100% | ✅ /api/execute activo |
| AgentLab | ✅ READY | ✅ 100% | — |
| BlueprintLab | ✅ READY | ✅ 100% | — (UI admin) |
| OnboardingApp | ✅ READY | ✅ 100% | — |
| Orchestrator | ✅ READY | ✅ 100% | — |
| VideoLab | ✅ READY | ✅ 100% | ❌ /api/execute pendiente |
| VoiceLab | ✅ READY | ✅ 100% | ❌ bloqueado ElevenLabs |

### Próxima actividad prioritaria
**Sprint VideoLab → Orchestrator:**
1. Abrir cuentas HeyGen + Kling → API keys en Vercel env vars VideoLab
2. Implementar `VideoLab/api/execute.ts` (recibe CopyLab script → genera storyboard → HeyGen/Kling)
3. `UPDATE lab_configs SET active=true WHERE lab_key='videolab'`
4. Orchestrator orquesta flujos de video completo

---

## 2026-04-04 — Sprint 4: CopyLab Layer 13 + SocialLab Bridge + AgentLab Gemini removal

**Resuelto:**
- CopyLab: SMPC Layer 13 BP_COPY_1.0 integrado — queries.ts query #24 + buildCopyPrompt.ts injection. 7 perfiles activos.
- SocialLab: copyLabBridge.ts + CopyLabImportPanel.tsx generados. brand_social_accounts tabla creada en Supabase.
- AgentLab: geminiService.ts ELIMINADO. TestMode migrado a /api/test-chat.ts (Claude server-side). blueprintSupabaseLoader.ts + blueprintCopyProfileLoader.ts generados.
- ImageLab: psychoPresetLoader.ts + PsychoLayerSelector.tsx generados (integración en UI pendiente → resuelto 2026-04-05).
- VoiceLab: DECISION proveedor: ElevenLabs (no Fish Audio, no TenzorArt). voicelab_params.engine = elevenlabs_turbo_v2.
- Supabase v1.8: CREATE TABLE brand_social_accounts con RLS + índice unicidad.

---

## 2026-04-03 — Sprint 3: ImageLab + WebLab + CopyLab Supabase integration

**Resuelto:**
- ImageLab: Supabase integration DONE — brands desde DB, NeuroneSCF configurada, psycho_presets creados (10 presets, tabla psycho_presets).
- CopyLab: brand_goals + brand_personas conectados al SMPC (posiciones 2 y 3).
- WebLab: webBrandLoader.ts — humanize/compliance/blueprint desde Supabase, fallback automático a hardcoded.
- Supabase v1.7: CREATE TABLE psycho_presets (10 presets). ALTER TABLE brands ADD web_default_platform. UPDATE imagelab_* en 8 marcas.

---

## 2026-04-02 — Audit completo del ecosistema

**Audit:** 17 componentes auditados via lectura directa de código. Generados ecosystem.md y ecosystem_filemap.md.
**Top gaps identificados:** SocialLab Gemini, Orchestrator mock, VideoLab/VoiceLab sin Supabase, brand_goals/personas vacíos, ForumPHs Speaks API key en browser.
**Producción real confirmada:** CopyLab, WebLab, ImageLab, OnboardingApp, Social Media Agent, UNRLVL-OPS.
