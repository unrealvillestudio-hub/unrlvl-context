# UNRLVL ECOSYSTEM — Filemap
_Generado desde ecosystem.json · 2026-04-15b · Claude Sonnet 4.6_

---

## FLUJOS ACTIVOS

```
unrealvillestudio.com (EN+ES) → Profiler Agent v5 → Supabase
  profiler_sessions → trigger trg_profiler_to_crm → crm.contacts + crm.contact_orgs

speaks.forumphs.com → ForumPHs Speaks → Supabase (speaks_sessions/leads)
  [PENDIENTE: → crm.contacts ForumPHs org]

Claude (chat) → unrlvl-context.vercel.app/api/gh → GitHub repos (read+write)
Claude (chat) → unrlvl-context.vercel.app/api/cf → Cloudflare API

CRM Dashboard (local) → unrlvl-crm-api v2 → crm.* Supabase
```

---

## REPOS ESTRUCTURA

```
unrealvillestudio-hub/
  unrlvl-context/          ← Source of truth (ecosystem.json + brands/ + skills/)
    brands/UnrealvilleStudio/
      session_log.md
      PLAN_MAESTRO_LABS_SKILLS.md  ← referencia técnica permanente
      CRM_INTEGRATIONS.md          ← nuevo: integraciones CRM por fase
  CoreProject/             ← unrealvillestudio.com (37 archivos)
    index.html (EN) · es/index.html (ES)
    .github/workflows/ · checkpoints/ · protocols/ · tools/
  CopyLab · WebLab · ImageLab · SocialLab
  AgentLab · BlueprintLab · Orchestrator
  VideoLab · VoiceLab · OnboardingApp
```

---

## SUPABASE — SCHEMAS

```
public.* (40 tablas) — Ecosistema UNRLVL
  brands · brand_goals · brand_personas · humanize_profiles
  output_templates · canal_blocks · compliance_rules
  profiler_sessions · agents · agent_flows
  psycho_presets · imagelab_presets · voicelab_params
  ops_costs · ops_services · ops_renewals · stakeholders
  speaks_* (ForumPHs) · df_jobs (Document Factory)
  crm_contacts · crm_activities · crm_stage_history  ← pipeline UNRLVL (Profiler)

crm.* (14 tablas) — CRM Multi-cliente UNRLVL
  orgs · contacts · contact_orgs · pipelines · deals
  interactions · email_sequences · sequence_enrollments
  segments · segment_contacts · tags · contact_tags · hygiene_rules
```

---

## ROADMAP

| # | Tarea | Sprint |
|---|---|---|
| 1 | Speaks → CRM integración | INMEDIATA |
| 2 | NeuroneSCF Meta BM + SKUs | INMEDIATA |
| 3 | SMA session_log URL | INMEDIATA |
| 4 | Foto Ivette Speaks | INMEDIATA |
| 5 | Skill ui-ux-layer | CORTO |
| 6 | ImageLab Fal.ai birefnet | CORTO |
| 7 | BP_COPY_1.0 x3 | CORTO |
| 8 | CRM email sequences | CORTO |
| 9 | WebLab Objectives Window | CORTO |
| 10 | Skill image-processing | MEDIO |
| 11 | NeuroneSCF Shopify → CRM | MEDIO |
| 12 | Meta/TikTok OAuth | MEDIO |
| 13 | VideoLab + VoiceLab | LARGO |
| 14 | LoRA Prep completo + PO training | LARGO |
