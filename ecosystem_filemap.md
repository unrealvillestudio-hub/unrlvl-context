# UNRLVL Ecosystem — Filemap & Dependencias
_v2026-04-07b · Generado desde ecosystem.json_

---

## REPOS ACTIVOS

| Repo | URL deploy | Tipo | Estado |
|---|---|---|---|
| CopyLab | unrlvl-copy-lab.vercel.app | lab | PROD |
| WebLab | web-lab.vercel.app | lab | PROD |
| ImageLab | image-lab-unrlvl.vercel.app | lab | PROD |
| SocialLab | social-lab-flame.vercel.app | lab | PROD |
| AgentLab | agent-lab-unrlvl.vercel.app | lab | PROD |
| BlueprintLab | unrlvl-blueprint-lab.vercel.app | lab | PROD |
| Orchestrator | orchestrator.vercel.app | lab | PROD |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | lab | PROD |
| VideoLab | unrlvl-video-lab.vercel.app | lab | UI only |
| VoiceLab | unrlvl-voice-lab.vercel.app | lab | UI only |
| OPS | — | internal | PROD |
| SocialMediaAgent | unrlvl-social-media-agent.vercel.app | agent | PROD |
| forumphs-speaks | forumphs-speaks.vercel.app | agent | testing |
| unrlvl-context | unrlvl-context.vercel.app | infra | PROD |
| BluePrints | — | assets | PROD |

---

## FLUJOS ACTIVOS

```
FORUMPHS SPEAKS FLOW (v1.2)
  Browser → forumphs-speaks.vercel.app (HTML static)
    → Supabase fphs-session v6 (session/register/golden-pass)
    → Supabase fphs-chat v5 (Claude QA-layer → speaks_messages)
         ↳ chev-listen animation · knowledge_base v2 · 3 correcciones Ivette
    → UNRLVL Footer BP_BRAND_v1.2: 3col · 2px #00FFD1 · chev-listen

ORCHESTRATOR PIPELINE
  Orchestrator → CopyLab / WebLab / ImageLab / SocialLab (4 activos)

ONBOARDING FLOW
  OnboardingApp → Claude → Supabase (8 tablas)

BLUEPRINT FLOW
  BluePrints repo (JSON assets) → BlueprintLab app → Supabase brand_copy_profiles
  BluePrints ≠ BlueprintLab (repo assets vs app de gestión)
```

---

## FLUJOS BLOQUEADOS

| Flujo | Causa | Acción |
|---|---|---|
| ForumPHs Speaks chat | ANTHROPIC_API_KEY faltante | Supabase → Secrets → agregar key |
| VideoLab generación | HeyGen + Kling sin API keys | Abrir cuentas |
| VoiceLab síntesis | voice_ids TBD_* | Audio PO + ElevenLabs |
| SocialLab publicación | OAuth Meta/TikTok pendiente | Sprint OAuth |
| CopyLab NeuroneSCF/ForumPHs | brand_copy_profiles vacío | BlueprintLab → BP_COPY_1.0 |
| SocialAgent context | No accede a session_log marca | Inyectar URL Context System |

---

## SUPABASE v2.0 — 37 TABLAS

**Labs (33):** brands, humanize_profiles, compliance_rules, brand_palette, brand_typography, brand_goals, brand_personas, geomix, keywords, ctas, canal_blocks, output_templates, channel_prompt_rules, imagelab_presets, psycho_presets, brand_copy_profiles, voicelab_params, videolab_params, lab_configs, scheduled_posts, brand_social_accounts, platform_configs, blueprint_schemas, person_blueprints, location_blueprints, product_blueprints, agents, agent_flows, agent_deployments_config, voice_packs, script_templates, brand_assets, brand_services, brand_languages

**ForumPHs Speaks (+4):** speaks_sessions, speaks_messages, speaks_leads, speaks_golden_pass

---

## BRAND_IDs CANÓNICOS

| Alias | ID canónico |
|---|---|
| neuroneCosmetics | NeuroneSCF |
| forumPhs | ForumPHs |
| unrealilleStudio | UnrealvilleStudio |
| patriciaOsorio* | PatriciaOsorio[Personal/Comunidad/VizosSalon] |
| d7Herbal / vivoseMask / vizosCosmetics / diamondDetails | D7Herbal / VivoseMask / VizosCosmetics / DiamondDetails |

---

## BLUEPRINTS REPO — NOTA IMPORTANTE

`BluePrints` = repo de assets JSON por marca. Diferente de `BlueprintLab` (la app Vercel).
- `BP_BRAND_ForumPHs_v1.0.json` ✅
- `BP_BRAND_NeuroneSCF_v1.0.json` ✅
- `BP_BRAND_UNRLVL_v1.0.json` ✅ (v1.0 JSON · v1.2 existe como HTML)
- **UNRLVL v1.2 vs v1.0:** animación `chev-listen` (v1.2) vs `chevron-blink` (v1.0). Canónica = `chev-listen`.

---

## ROADMAP (2026-04-07)

| # | Acción | Impacto |
|---|---|---|
| 1 🔴 | ANTHROPIC_API_KEY Supabase Secrets | ForumPHs Speaks operativo |
| 2 🔴 | Vercel Pro upgrade | Compliance comercial + CopyLab timeout |
| 3 🟠 | speaks.forumphs.com CNAME | Domain propio Speaks |
| 4 🟠 | BP_COPY_1.0 NeuroneSCF + ForumPHs | CopyLab con voz real |
| 5 🟠 | Onboarding ForumPHs + VivoseMask + PO×3 | Datos completos |
| 6 🟡 | ElevenLabs + audio PO | VoiceLab activo |
| 7 🟡 | HeyGen + Kling API keys | VideoLab activo |
| 8 🟡 | OAuth Meta/TikTok | SocialLab publica real |
| 9 🟢 | LoRA Fal.ai + fotos PO | Consistencia visual |

---
_Generado 2026-04-07 · ecosystem.json v2026-04-07b_
