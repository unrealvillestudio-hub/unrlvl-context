# Session Log — Unrealville Studio
_Última actualización: 2026-04-24_

---

## 2026-04-24 — IID Network completa + Content Engine diseñado

### Lo construido esta sesión

**IID Network — de diseño a producción:**

- Schema `intel.*` completo (7 tablas): iid_agents, iid_findings, iid_content_queue, iid_research_raw, iid_briefs, iid_cron_runs, iid_scheduler_config
- Schema `content.*` completo (5 tablas): content_pieces, content_calendar, content_performance, brand_voices, orchestrator_jobs
- 14 agentes seedeados en DB con search_config completo (search areas week A/B)
- 5 Edge Functions deployadas: iid-core v1.1, iid-research, iid-process, iid-ecommerce-research, iid-ecommerce-process, iid-brief-generator
- Arquitectura two-step definitiva: research (web_search→texto crudo) + process (estructura→iid-core)
- 27 pg_cron jobs activos — cobertura completa de los 13 agentes IID
- pg_cron + pg_net instalados (v1.6.4 + v0.20.0)
- Schemas intel y content expuestos a PostgREST

**Primer run exitoso:**
- IID-ECOMMERCE: 4 findings reales con web_search (Shopify Winter '26 · AI CRO · BNPL · AI 3PL)
- 8 piezas en content_queue (UNRLVL + Lucien, ángulo mathematical todos)
- 2 autopublicadas (Shopify score 94 + urgency breaking)
- Brief biweekly enviado a sam@unrealvillestudio.com — status: sent

**Schema reestructurado para multibrand:**
- intel.iid_findings + iid_content_queue: brand_id añadido
- content_pieces: reconstruido con assets JSONB, brand_id, iid_source_tag, icr_passed, lab_sources
- content.brand_voices: nueva tabla — UNRLVL + Lucien seeded con templates A/B/C, ICR rules, image_style
- content.orchestrator_jobs: nueva tabla — approval_token para 1-click email approval

**ContentLab — diseñado (no construido):**
- Arquitectura: Orchestrator como conductor, Labs como ejecutores (no ContentLab separado)
- Flujo: iid_content_queue → orchestrator_jobs → CopyLab+ImageLab → content_pieces.assets → email 1 click → SocialLab
- Formatos dinámicos con historial de últimas 5 piezas por voz
- Dos voces con templates distintos: UNRLVL (Signal/Contrarian/Case Signal) + Lucien (Lo que vi/La pregunta incómoda/Los números)

### Decisiones tomadas

- Two-step architecture es la arquitectura permanente (no monolítica)
- Orchestrator es el hub de contenido, no UNRLVL-OPS
- AIFE aplica al stream Content — NO al stream Plan Maestro (interno)
- Ángulos psychological y mathematical son exclusivos de Lucien
- Autopublish: score ≥85 + urgency breaking
- IID source tag: metadata interna en email de Sam, nunca público

### Próximo: Lab audits

Sesión dedicada a auditar cada Lab (CopyLab, ImageLab, VideoLab, VoiceLab, SocialLab) para confirmar o añadir endpoint programático que el Orchestrator necesita:
`{brand_id, queue_id, brief, voice, platform}` → output a `content_pieces.assets`

---

## Sesiones anteriores

_Ver historial anterior en commits previos del repositorio._
