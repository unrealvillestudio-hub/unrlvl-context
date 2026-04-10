# UNRLVL Ecosystem — Filemap & Dependencias
_v2026-04-10b · Generado desde ecosystem.json_

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
| BluePrints | unrlvl-blueprints.vercel.app | assets | PROD |
| CoreProject | unrealvillestudio.com | web | LIVE 🆕 |

---

## FLUJOS ACTIVOS

```
UNREALVILLESTUDIO.COM (LIVE — 2026-04-10)
  Browser → unrealvillestudio.com (index.html static — CoreProject)
  www.unrealvillestudio.com → redirect → unrealvillestudio.com
  PENDIENTE: formulario contacto → backend endpoint

FORUMPHS SPEAKS FLOW (v1.2)
  Browser → forumphs-speaks.vercel.app
    → Supabase fphs-session v6
    → Supabase fphs-chat v5 (Claude + QA layer + 3 correcciones Ivette)
    BLOQUEADO: ANTHROPIC_API_KEY pendiente en Supabase Secrets

ORCHESTRATOR PIPELINE
  Orchestrator → CopyLab / WebLab / ImageLab / SocialLab (4 activos)

ONBOARDING FLOW
  OnboardingApp → Claude → Supabase (8 tablas)

BLUEPRINT FLOW
  BluePrints repo (JSON assets) → BlueprintLab app → Supabase brand_copy_profiles
```

---

## FLUJOS BLOQUEADOS

| Flujo | Causa | Acción |
|---|---|---|
| ForumPHs Speaks chat | ANTHROPIC_API_KEY faltante | Supabase → Secrets → agregar key |
| unrealvillestudio.com contacto | Backend no conectado | Edge Function o serverless endpoint |
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

## BLUEPRINTS REPO — ESTRUCTURA

```
BluePrints/                          unrlvl-blueprints.vercel.app
├── assets/                          ← global (manifest obsoleto — borrar)
├── brands/
│   ├── Unrealville/                 ✅ brand-first — COMPLETO
│   │   ├── BP_BRAND_UNRLVL_v1.2.json
│   │   ├── brand.json
│   │   ├── BP_BRAND_UnrealvilleStudio_v1.2.html
│   │   ├── BP_BRAND_UnrealvilleStudio_v1.2_EN.html
│   │   └── assets/
│   │       ├── UNRLVL_Logo_drk.svg
│   │       ├── UNRLVL_Logo_lght.svg
│   │       ├── UNRLVL_Favicon.svg
│   │       └── UNRLVL_Logo_drk1.svg  ⚠️ BORRAR (vacío)
│   ├── NeuroneSCF/                  ⏳ migración pendiente
│   │   ├── brand.json
│   │   ├── session_log.md
│   │   └── [BP_BRAND_NeuroneSCF_v1.0.json — mover desde brands/]
│   ├── ForumPHs/                    ⏳ migración pendiente
│   │   └── [BP_BRAND_ForumPHs_v1.0.json — mover desde brands/]
│   ├── VizosCosmetics/              ⏳ migración pendiente
│   ├── D7Herbal/                    ⏳ migración pendiente
│   └── brands/assets/[Brand]/       ⚠️ OLD PATTERN — migrar y eliminar
├── persons/
├── locations/
├── products/
├── docs/reports/
├── agents/
│   └── social-media-agent/
│       └── session_log.md
└── protocols/
```

**Migración pendiente (ejecutar en GitHub Desktop — 1 commit):**
```
MOVER: brands/assets/NeuroneSCF/  → brands/NeuroneSCF/assets/
MOVER: brands/assets/VizosCosmetics/ → brands/VizosCosmetics/assets/
MOVER: brands/assets/ForumPHs/    → brands/ForumPHs/assets/
MOVER: brands/BP_BRAND_ForumPHs_v1.0.json → brands/ForumPHs/
MOVER: brands/BP_BRAND_NeuroneSCF_v1.0.json → brands/NeuroneSCF/
BORRAR: brands/assets/ (vacía tras moves)
BORRAR: assets/manifest.json
BORRAR: brands/Unrealville/assets/UNRLVL_Logo_drk1.svg
```

---

## ROADMAP (2026-04-10)

| # | Acción | Impacto |
|---|---|---|
| 1 🔴 | Formulario contacto unrealvillestudio.com | Site operativo |
| 2 🔴 | ANTHROPIC_API_KEY Supabase Secrets | ForumPHs Speaks operativo |
| 3 🔴 | BluePrints migración brand-first | Repo limpio |
| 4 🟠 | speaks.forumphs.com CNAME | Domain propio Speaks |
| 5 🟠 | BP_COPY_1.0 NeuroneSCF + ForumPHs | CopyLab con voz real |
| 6 🟠 | Onboarding ForumPHs + VivoseMask + PO×3 | Datos completos |
| 7 🟡 | Cloudflare unrealvillestudio.com | CDN + seguridad |
| 8 🟡 | ElevenLabs + audio PO | VoiceLab activo |
| 9 🟡 | HeyGen + Kling API keys | VideoLab activo |
| 10 🟡 | OAuth Meta/TikTok | SocialLab publica real |
| 11 🟢 | LoRA Fal.ai + fotos PO | Consistencia visual |

---
_Generado 2026-04-10 · ecosystem.json v2026-04-10b_
