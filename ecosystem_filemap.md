# UNRLVL ECOSYSTEM — Filemap
_Generado desde ecosystem.json · 2026-04-15c · Claude Sonnet 4.6_

---

## FLUJOS ACTIVOS

```
unrealvillestudio.com → Profiler Agent v5 → profiler_sessions
  → trigger → crm.contacts (UnrealvilleStudio org)

speaks.forumphs.com → ForumPHs Speaks
  [PENDIENTE → crm.contacts ForumPHs org]

forumphs-document-factory.vercel.app
  → Zip Extractor (local) → JSON → Claude → BI HTML
  [ESTA SEMANA: Zip Extractor → tools/normalizer.html en repo]

CRM Dashboard (local) → unrlvl-crm-api v2 → crm.* Supabase
Claude (chat) → /api/gh → GitHub repos
Claude (chat) → /api/cf → Cloudflare
```

---

## REPOS

```
unrealvillestudio-hub/
  unrlvl-context/
    brands/UnrealvilleStudio/
      session_log.md
      PLAN_MAESTRO_LABS_SKILLS.md
      CRM_INTEGRATIONS.md
    brands/ForumPHs/
      DOCUMENT_FACTORY_PLAN.md   ← nuevo
  CoreProject/                   ← unrealvillestudio.com (37 archivos)
  forumphs-document-factory/     ← PROD v1.4
    [tools/normalizer.html]      ← pendiente añadir esta semana
  Labs: CopyLab WebLab ImageLab SocialLab AgentLab BlueprintLab Orchestrator
```

---

## SUPABASE SCHEMAS

```
public.* (40 tablas) — Ecosistema UNRLVL
  profiler_sessions → trigger → crm.contacts

crm.* (14 tablas) — CRM Multi-cliente
  orgs(7) · contacts · contact_orgs · pipelines(9) · deals
  interactions · email_sequences · enrollments
  segments · tags · hygiene_rules(4)
```

---

## AGENDA PRÓXIMA SESIÓN

| Tarea | Sprint |
|---|---|
| DF: schema JSON EEFF v1.0 | ESTA SEMANA |
| DF: normalizer a tools/ | ESTA SEMANA |
| DF: template XLSX estándar | ESTA SEMANA |
| Speaks → CRM integración | ESTA SEMANA |
| NeuroneSCF Meta BM + SKUs | ESTA SEMANA |
| Foto Ivette + SMA log URL | ESTA SEMANA |
| Skill ui-ux-layer | CORTO |
| ImageLab Fal.ai birefnet | CORTO |
| BP_COPY_1.0 x3 | CORTO |
| CRM email sequences | CORTO |
| Meta/TikTok OAuth | MEDIO |
| LoRA Prep completo | LARGO |
