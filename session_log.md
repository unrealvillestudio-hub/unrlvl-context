# Session Log — Ecosistema UNRLVL
*Fuente única de verdad para el historial de sesiones del ecosistema.*

---

## 2026-04-05 — Sprint Final + Costos Operativos Cerrados

**Conducted by:** Claude Sonnet 4.6

### Resuelto en esta sesión

**Código — todos deployados en verde:**
- Orchestrator: interpret-intent Claude server-side, executeStage real via lab_configs, brands canónicos
- OnboardingApp Phase 4: 8 tablas (brand_goals, brand_personas, geomix añadidos)
- SocialLab: CopyLabImportPanel integrado, Gemini eliminado
- AgentLab: blueprintStore Supabase-first
- ImageLab: PsychoLayerSelector wired, import path bug corregido
- BlueprintLab: confirmado en Vercel, URL corregida en lab_configs

**Supabase:**
- CREATE TABLE scheduled_posts
- lab_configs: 8 labs + lab_key canónico. 4 activos.
- RLS security fixes en lab_configs y brand_social_accounts
- DB usage: 14MB / 500MB (2.8%)

**Social Media Agent — fix protocolo Actualiza:**
- Export endpoint funciona con query param: `GET /api/export?secret=[URL-encoded]`
- Secret tiene caracteres especiales que requieren URL encoding: %40 %24 %5E %26

**Costos operativos — definidos y cerrados:**
- Total mensual: $457-507/mes
- Stack avatares: ElevenLabs (voces reales) + Chatterbox/Fal.ai (sintéticas) + HeyGen + Kling + Fal.ai LoRA
- Vercel: upgrade a Pro INMEDIATO requerido ($20/mes)
- Supabase: free plan suficiente hasta ~400MB
- Shopify: solo NeuroneSCF ($39/mes)
- Claude.ai Pro Max ×5: ~$115/mes (interfaz de trabajo)
- HeyGen: $29 plan + $87 add-ons (3 avatares) + ~$50 API credits = ~$166/mes

### Próxima actividad prioritaria
1. ⚠️ Upgrade Vercel Hobby → Pro — inmediato
2. Onboarding marcas pendientes via OnboardingApp
3. BP_COPY_1.0 NeuroneSCF via BlueprintLab
4. Abrir cuentas ElevenLabs + HeyGen + Kling + Fal.ai
5. Sprint VideoLab → Orchestrator

---

## 2026-04-04 — Sprint 4: CopyLab Layer 13 + SocialLab Bridge + AgentLab

CopyLab v8.0: SMPC Layer 13 BP_COPY_1.0. 7 perfiles activos.
SocialLab: copyLabBridge + CopyLabImportPanel. brand_social_accounts creada.
AgentLab: geminiService eliminado. blueprintSupabaseLoader + blueprintCopyProfileLoader generados.
ImageLab: psychoPresetLoader + PsychoLayerSelector generados.
VoiceLab: ElevenLabs decidido (no TenzorArt, no Fish Audio). elevenlabs_turbo_v2.
Supabase v1.8: brand_social_accounts.

---

## 2026-04-03 — Sprint 3: ImageLab + WebLab + CopyLab Supabase

ImageLab: Supabase DONE. NeuroneSCF configurada. psycho_presets creados.
CopyLab: brand_goals + brand_personas en SMPC.
WebLab: webBrandLoader.ts Supabase completo.
Supabase v1.7: psycho_presets, web_default_platform, imagelab_*.

---

## 2026-04-02 — Audit completo del ecosistema

17 componentes auditados. ecosystem.md + ecosystem_filemap.md generados.
Producción real: CopyLab, WebLab, ImageLab, OnboardingApp, Social Media Agent, UNRLVL-OPS.
