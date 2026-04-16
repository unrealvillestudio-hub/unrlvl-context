# UNRLVL ECOSYSTEM — Filemap
_Generado desde ecosystem.json · 2026-04-16a · Claude Sonnet 4.6_

---

## FLUJOS ACTIVOS

```
unrealvillestudio.com → Profiler Agent v5 → profiler_sessions
  → trigger → crm.contacts (UnrealvilleStudio org)

speaks.forumphs.com → ForumPHs Speaks (19 sesiones · 4 golden pass)
  [PENDIENTE → crm.contacts ForumPHs org]

forumphs-document-factory.vercel.app
  → Zip Extractor (local) → JSON → Claude → BI HTML
  [ESTA SEMANA: → tools/normalizer.html en repo]

CRM Dashboard (local) → unrlvl-crm-api v2 → crm.* Supabase

[DISEÑADO, PENDIENTE CONSTRUIR]
Propietario WA → FPHs-OPS WhatsApp Agent
  → lookup fph.owners.whatsapp
  → califica incidencia
  → crea fph.incidents con SLA automático
  → notifica admin en app
  → informa propietario de avances
```

---

## SUPABASE SCHEMAS

```
public.* (40 tablas) — Ecosistema UNRLVL
  profiler_sessions → trigger → crm.contacts

crm.* (14 tablas) — CRM Multi-cliente
  orgs(7) · pipelines(9) · contacts · interactions
  email_sequences · segments · hygiene_rules(4)

fph.* (22 tablas) — FPHs-OPS Operativo
  buildings(6) · units · owners · owner_units · juntas
  payments · arrears · legal_obligations
  incidents · incident_categories(16) · incident_updates
  providers · provider_invoices
  bank_reconciliations · bank_transactions
  communication_templates · communications_log
  task_templates · tasks · monthly_reports
```

---

## REPOS

```
unrealvillestudio-hub/
  unrlvl-context/
    brands/UnrealvilleStudio/
      session_log.md · PLAN_MAESTRO_LABS_SKILLS.md · CRM_INTEGRATIONS.md
    brands/ForumPHs/
      session_log.md · DOCUMENT_FACTORY_PLAN.md · FPHSOPS_SPEC.md (nuevo)
  CoreProject/                   ← unrealvillestudio.com (37 archivos)
  forumphs-document-factory/     ← PROD v1.4
    [tools/normalizer.html]      ← pendiente esta semana
  Labs: CopyLab WebLab ImageLab SocialLab AgentLab BlueprintLab Orchestrator
```

---

## AGENDA PRÓXIMA SESIÓN

| Tarea | Prioridad |
|---|---|
| PO Conectando: veredicto Pinyon vs Allura | INMEDIATA |
| FPHs-OPS módulo cobros | ALTA |
| Datos Ivette → poblar fph.* | ALTA |
| DF: schema JSON EEFF + normalizer | ALTA |
| Speaks → CRM | ALTA |
| NeuroneSCF Meta BM + SKUs | ALTA |
| Skill ui-ux-layer | ALTA |
| Fal.ai birefnet | MEDIA |
| BP_COPY_1.0 x3 | MEDIA |
| CRM email sequences | MEDIA |
| FPHs-OPS WA agent | MEDIA |
| Decisión: quién paga FPHs-OPS + replicabilidad | ESTRATÉGICA |
