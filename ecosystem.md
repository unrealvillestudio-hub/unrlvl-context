# UNRLVL Ecosystem — Narrative Reference
_Versión: 2026-04-24d · Generado desde ecosystem.json_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure. North Miami, FL. Fundador público: **Lucien Sael** (seudónimo profesional de Sam).

Web: unrealvillestudio.com (LIVE EN+ES). Tagline: "Not for everyone."

---

## IID Network — Estado: OPERATIONAL

El sistema de inteligencia que investiga, puntúa y convierte hallazgos en contenido público y mejoras internas. **Primer run exitoso: 2026-04-24.**

### Arquitectura two-step (diseño permanente)

El sistema separa investigación de estructuración. Cada una tiene su propia función, su propio timeout, su propio propósito.

```
pg_cron → iid-research (Claude + web_search → texto crudo en iid_research_raw)
        → iid-process  (Claude sin tools → JSON → iid-core → dos streams)
```

### Dos streams desde un mismo hallazgo

**Stream Ecosystem (Plan Maestro):** findings con ecosystem_score ≥70 van a `intel.iid_findings` con status `pending_review`. Biweekly email vía Resend a Sam. Sin AIFE — es contenido interno.

**Stream Content Engine:** findings con content_score ≥70 van a `intel.iid_content_queue` con voice routing, Psycho Layer y AIFE aplicados. Fluyen hacia Orchestrator → Labs → SocialLab.

### Scoring

| Framework | Criterios | Threshold |
|---|---|---|
| Ecosystem R1-R6 | Capability · Quality · Cost · Implementation · Time-to-value · Client | ≥70 top · 50-69 watchlist · <50 discard |
| Content C1-C5 | Novelty · Audience relevance · Contrarian · Timeliness · Expertise signal | ≥70 eligible · ≥85+breaking = autopublish |

### Voces y ángulos

- **Compartidos** (UNRLVL + Lucien): expertise, opinion, case_study, tool_review, trend_signal, contrarian
- **Exclusivos Lucien**: psychological, mathematical
- **Psycho Layer**: 10 presets asignados automáticamente por angle + voice antes de AIFE

### Red de agentes

| Tier | Agentes | Día | Status |
|---|---|---|---|
| Core | IID-CORE | — | Edge Function ACTIVE |
| Tier 1 | IMAGE · VIDEO · VOICE · LLM | Jue-Mar-Vie-Mar | DB + crons activos |
| Tier 2 | META · TIKTOK · GOOGLE · LINKEDIN · X | Mié-Vie-Sáb-Dom-Dom | DB + crons activos |
| Tier 3 | ECOMMERCE · FLORIDA · WHOLESALE · PERSONAL-BRAND | Lun-1/15-8/22-Mar | ECOMMERCE: run exitoso |

### Brief biweekly

Email HTML dark-theme a sam@unrealvillestudio.com los días 1 y 15. Estructura: TOP (≥70) · WATCHLIST (50-69) · DESCARTADOS. IID source tag visible solo para Sam — nunca público. Primer brief enviado 2026-04-24.

---

## Content Engine — Estado: DISEÑADO

### Flujo completo

```
iid_content_queue (aprobado)
        ↓ orchestrator_status: pending → dispatched
content.orchestrator_jobs (job + approval_token único)
        ↓ Orchestrator lee brand_voices de DB → dispatcha a Labs
CopyLab + ImageLab + VideoLab + VoiceLab
(cada uno con ICR/AIFE/Humanize propios)
        ↓ outputs → content_pieces.assets JSONB
Email Sam: preview + [PUBLICAR] + [RECHAZAR] (1 click, token en URL)
        ↓ aprobado → SocialLab publica
```

### Voces

**UNRLVL Studio** — Autoridad institucional. Templates: Signal · Contrarian · Case Signal. Plataformas: LinkedIn · IG · FB. AIFE max intensity.

**Lucien Sael** — Voz personal directa. Templates: Lo que vi · La pregunta incómoda · Los números no mienten. Plataformas: LinkedIn · X · IG. Ángulos psychological y mathematical exclusivos. AIFE max intensity.

### Formatos dinámicos

Post · Carousel · Thread · Article · Reel script · Short video script · Quote card. Selección basada en angle + platform + historial últimas 5 piezas de esa voz (evita repetición consecutiva).

### Arquitectura de datos

- `content.brand_voices` — templates, ICR rules, image style, psycho affinities por voz. UNRLVL + Lucien seeded. Añadir nueva marca = INSERT.
- `content.orchestrator_jobs` — tracking de jobs, approval_token, labs_status JSONB.
- `content.content_pieces` — repositorio de resultados. `assets JSONB` consolida copy + image + video + voice + carousel slides. `brand_id` + `iid_source_tag` (interno).

### Pendiente construir

Edge Functions: `content-package` · `content-approve` · `content-publish`. Labs audits previo para confirmar endpoints programáticos.

---

## Labs

| Lab | Status | Notas |
|---|---|---|
| CopyLab | PASSED v8.0 | Audit pendiente: endpoint programático para Orchestrator |
| WebLab | PASSED | SKILL_weblab-shopify sesión propia pendiente |
| ImageLab | PASSED ICR v1.0 | Audit pendiente: endpoint programático |
| AgentLab | PASSED | — |
| BlueprintLab | PASSED | — |
| Orchestrator | PASSED | Pending: Content Queue routing |
| SocialLab | PASSED | Meta/TikTok OAuth pendiente · Audit: consume iid_content_queue |
| VideoLab | BLOQUEADO | HeyGen + Kling keys pendientes |
| VoiceLab | BLOQUEADO | ElevenLabs voice IDs pendientes |
| UNRLVL-OPS | LIVE | Cost Layer tab LIVE. Tab Ecosystem Intel pendiente. |
| Onboarding App | PASSED Phase 4 | — |

---

## Skills (P1-P8 completos)

ui-ux-layer v2.1 · shopify-auditor v1.1 · image-processing v1.0 · agent-builder v1.0 · aife v1.1 · copylab-reference v1.0 · security v1.0 · cost-layer v1.0

Pendiente: weblab-shopify (sesión propia).

---

## Infraestructura

**Supabase** `amlvyycfepwhiindxgzw` — Schemas: public · crm · fph · ops · **intel** · **content**. Extensions: pg_cron 1.6.4 · pg_net 0.20.0. 27 cron jobs activos. 0 security advisors.

**Vercel** — 21 proyectos. Team: team_fEH94Irp6BAI9YGm4btGna5n.

**Cost Layer** — OPERATIONAL. logTokens activo en 8 Edge Functions. Dashboard: unrlvl-ops.vercel.app/cost-layer.

---

## Agenda próxima sesión

1. **Lab audits** — CopyLab, ImageLab, VideoLab, VoiceLab, SocialLab → confirmar endpoint programático para Orchestrator
2. **ContentLab** — construir content-package + content-approve + content-publish
3. **Orchestrator** — Content Queue routing
4. **UNRLVL-OPS** — Tab Ecosystem Intel
5. Lucien Books — Brief Libro 1
6. NeuroneSCF B2B — acento navy + brand_ids
7. ForumPHs — datos edificios + foto Ivette
