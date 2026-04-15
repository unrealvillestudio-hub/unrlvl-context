# UNRLVL ECOSYSTEM — Filemap & Dependencias
_Generado desde ecosystem.json · 2026-04-15a · Claude Sonnet 4.6_

---

## FLUJOS ACTIVOS

```
unrealvillestudio.com (EN) / unrealvillestudio.com/es (ES)
  └─→ Profiler Agent v5 (Supabase Edge Function)
        ├─→ Anthropic API (conversación + brief)
        ├─→ Resend → leads@unrealvillestudio.com
        └─→ profiler_sessions → trigger → crm_contacts

speaks.forumphs.com
  └─→ Supabase Edge Functions → Anthropic API

forumphs-document-factory.vercel.app
  └─→ ZIP → Supabase → ICR → descarga (CERRADO v1.4)

orchestrator.vercel.app
  └─→ /api/interpret-intent → Claude → plan JSON → labs

Claude (chat) → unrlvl-context.vercel.app/api/gh → GitHub repos (read+write)
Claude (chat) → unrlvl-context.vercel.app/api/cf → Cloudflare API (6 dominios)
```

---

## FLUJOS ROTOS / BLOQUEADOS

```
VideoLab → HeyGen + Kling API keys ← PENDIENTE
VoiceLab → ElevenLabs voice_ids ← PENDIENTE
SocialLab → Meta/TikTok OAuth ← PENDIENTE
NeuroneSCF → Meta BM ← info empresa incompleta
ImageLab → LoRA Prep ← módulo no existe aún
ImageLab → Background AI ← solo color-matching básico
UNRLVL CRM → Dashboard ← pendiente construir
```

---

## ESTRUCTURA REPOS (post-limpieza)

```
unrealvillestudio-hub/
  ├── unrlvl-context/              ← Source of truth
  │   ├── ecosystem.json/md/filemap.md
  │   ├── api/gh.js (v2 read+write) · api/cf.js (Cloudflare)
  │   ├── brands/UnrealvilleStudio/ ← brand.json, BP_Brand_Context.md, session_log.md, PLAN_MAESTRO.md
  │   ├── brands/NeuroneSCF/ · brands/ForumPHs/ · brands/VizosCosmetics/
  │   ├── skills/github-auditor/SKILL.md (activo)
  │   │   + skills/ui-ux-layer/ · image-processing/ · agent-builder/ · ... (pendientes)
  │   ├── agents/social-media-agent/session_log.md
  │   └── protocols/SESSION_PROTOCOL.md (v8)
  ├── BluePrints/brands/Unrealville/ ← BP_BRAND_UNRLVL_v1.2 (amber pendiente)
  ├── CoreProject/                 ← unrealvillestudio.com (37 archivos, limpio)
  │   ├── index.html (EN, LIVE)
  │   ├── es/index.html (ES, LIVE)
  │   ├── .github/workflows/ (deploy-vizos-wp.yml corregido)
  │   ├── checkpoints/ · protocols/ · tools/
  │   └── brands/ForumPHs/assets/ (HTMLs históricos, sin PDFs)
  ├── CopyLab · WebLab · ImageLab · SocialLab
  ├── AgentLab (apps/assistant = proyecto personal madre Sam)
  ├── BlueprintLab · OnboardingApp
  ├── Orchestrator · VideoLab · VoiceLab
  └── Tools (private)
```

---

## SUPABASE — TABLAS CLAVE

```
CRM:
  crm_contacts    (pipeline: lead→qualified→onboarding→active→paused→churned→lost)
  crm_activities  (interacciones, notas, emails)
  crm_stage_history (historial de cambios)
  trigger: sync_profiler_to_crm (auto-sync cuando profiler captura email)

Profiler:
  profiler_sessions (conversaciones, leads, briefs)

Brands (CopyLab):
  brands, brand_goals, brand_personas, brand_keywords,
  output_templates, canal_blocks, humanize_profiles,
  compliance_rules, geomix_settings, brand_copy_profiles
```

---

## ROADMAP PRIORIZADO

| # | Tarea | Esfuerzo | Sprint |
|---|---|---|---|
| 1 | CRM dashboard | 1 sesión | INMEDIATA |
| 2 | Push index.html | 5 min (PAT) | INMEDIATA |
| 3 | Meta BM NeuroneSCF | Cliente | INMEDIATA |
| 4 | 87 SKUs NeuroneSCF | 1 sesión | INMEDIATA |
| 5 | SMA session_log URL | 15 min | INMEDIATA |
| 6 | Skill ui-ux-layer | 1 sesión | CORTO |
| 7 | Fal.ai birefnet → ImageLab | 1 sesión | CORTO |
| 8 | BP_COPY_1.0 x3 marcas | 1 sesión | CORTO |
| 9 | WebLab sprint | 1 sesión | CORTO |
| 10 | CRM: flujo email calificados | 1 sesión | CORTO |
| 11 | Skill image-processing | 1 sesión | MEDIO |
| 12 | Skill agent-builder | 1 sesión | MEDIO |
| 13 | NeuroneSCF WA agent (Twilio) | 2 sesiones | MEDIO |
| 14 | Meta/TikTok OAuth | 1 sesión | MEDIO |
| 15 | VideoLab + VoiceLab | 1 sesión | LARGO |
| 16 | Psycho Layer extensión x4 labs | 2 sesiones | LARGO |
| 17 | LoRA Prep completo + PO training | 2 sesiones | LARGO |
