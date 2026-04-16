# UNRLVL ECOSYSTEM — Filemap
_Generado desde ecosystem.json · 2026-04-16b · Claude Sonnet 4.6_

---

## BLUEPRINTS — PatriciaOsorioConectando (NUEVO)

```
BluePrints/brands/PatriciaOsorioConectando/
  BP_BRAND_PatriciaOsorio_Conectando_v1.html   ← HTML definitivo
  BP_BRAND_PatriciaOsorioConectando_v1.0.json  ← JSON estructura completa

unrlvl-context/brands/PatriciaOsorioConectando/
  BP_Brand_Context.md                           ← referencia Claude
  session_log.md                                ← log de marca
```

---

## FLUJOS ACTIVOS

```
unrealvillestudio.com → Profiler v5 → crm.contacts (UnrealvilleStudio)
speaks.forumphs.com → Speaks [PENDIENTE → crm.contacts ForumPHs]
SMA chat.js → fetchAgentContext() → session_log.md [ACTIVO]
CRM Dashboard (local) → unrlvl-crm-api v2 → crm.* Supabase
```

---

## SUPABASE SCHEMAS

```
public.* (40 tablas) — Ecosistema UNRLVL
crm.* (14 tablas) — CRM Multi-cliente · 7 orgs · 9 pipelines
fph.* (22 tablas) — FPHs-OPS Operativo · SCHEMA ACTIVO
  buildings(6) · units · owners · juntas · payments · arrears
  incidents(16 cats, 3 niveles) · providers · bank_reconciliations
  communication_templates · tasks · monthly_reports
```

---

## REPOS

```
unrealvillestudio-hub/
  unrlvl-context/
    brands/UnrealvilleStudio/  → PLAN_MAESTRO, CRM_INTEGRATIONS, session_log
    brands/ForumPHs/           → DOCUMENT_FACTORY_PLAN, FPHSOPS_SPEC, session_log
    brands/PatriciaOsorioConectando/ → BP_Brand_Context, session_log (NUEVO)
    agents/social-media-agent/ → session_log (fetchAgentContext activo)
  BluePrints/
    brands/PatriciaOsorioConectando/ → HTML + JSON (NUEVO)
```

---

## AGENDA

| Tarea | Sprint |
|---|---|
| DF: schema EEFF + normalizer | ESTA SEMANA |
| FPHs-OPS módulo cobros | ALTA |
| Datos Ivette → fph.* | ALTA |
| Speaks → CRM | ALTA |
| NeuroneSCF Meta BM + SKUs | ALTA |
| Skill ui-ux-layer | ALTA |
| Foto Ivette + BP_COPY_1.0 | MEDIA |
