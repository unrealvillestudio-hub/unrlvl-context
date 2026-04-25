# UNRLVL Ecosystem — File Map
_Versión: 2026-04-25a · Generado desde ecosystem.json_

---

## Raíz

| Archivo | Descripción |
|---|---|
| `ecosystem.json` | Fuente de verdad del ecosystem — DO NOT EDIT MANUALLY |
| `ecosystem.md` | Narrativa del ecosystem generada desde el JSON |
| `ecosystem_filemap.md` | Este archivo |

## protocols/

| Archivo | Descripción |
|---|---|
| `SESSION_PROTOCOL.md` | Protocolo completo de sesiones, comando Actualiza |

## brands/UnrealvilleStudio/

| Archivo | Descripción |
|---|---|
| `PLAN_MAESTRO_LABS_SKILLS.md` | Plan maestro de desarrollo del ecosystem |
| `LUCIEN_BOOKS_MASTER.md` | Arquitectura de los 5 libros de Lucien Sael |
| `CRM_INTEGRATIONS.md` | Integraciones CRM del ecosystem |
| `SKILL_ui-ux-layer.md` | P1 — UI/UX design tokens y componentes |
| `SKILL_shopify-auditor.md` | P2 — Auditor Shopify con modo Fix |
| `SKILL_image-processing.md` | P3 — ImageLab processing pipeline |
| `SKILL_agent-builder.md` | P4 — Patrones de construcción de agentes (ref: DDMV-Assistant) |
| `SKILL_aife.md` | P5 — AI Footprint Eraser v1.1 |
| `SKILL_copylab-reference.md` | P6 — CopyLab reference completo |
| `SKILL_security.md` | P7 — Security standards |
| `SKILL_cost-layer.md` | P8 — Cost Layer: schemas, queries, logTokens |
| `session_log.md` | Log de sesiones UnrealvilleStudio |

## brands/NeuroneSCF/

| Archivo | Descripción |
|---|---|
| `brand.json` | Brand config NeuroneSCF |
| `BP_Brand_Context.md` | Brand Profile completo |
| `session_log.md` | Log de sesiones NeuroneSCF |

## brands/ForumPHs/

| Archivo | Descripción |
|---|---|
| `brand.json` | Brand config ForumPHs |
| `DOCUMENT_FACTORY_PLAN.md` | Plan del Document Factory |
| `FPHSOPS_SPEC.md` | Spec del sistema OPS de ForumPHs |
| `session_log.md` | Log de sesiones ForumPHs |

## agents/social-media-agent/

| Archivo | Descripción |
|---|---|
| `session_log.md` | Log del Social Media Agent (Laura/PO/Sam) |

## agents/ddmv-assistant/

| Archivo | Descripción |
|---|---|
| `session_log.md` | Log de Mi Asistente — WhatsApp Personal Care Agent v1.2 |

---

## Supabase — Schemas activos

### public.* (Supabase principal amlvyycfepwhiindxgzw)
44 tablas incluyendo CRM, perfiles, configuración general.

### crm.*
Pipeline CRM UNRLVL.

### fph.*
ForumPHs data — edificios, unidades, propietarios.

### ops.*
Cost Layer — ops_model_pricing · ops_token_sessions · ops_client_monthly · ops_model_alerts · vistas de eficiencia y margen.

### intel.*
IID Network:
- `iid_agents` — 14 agentes registrados con search_config
- `iid_findings` — hallazgos scored (brand_id · ecosystem_score · content_score)
- `iid_content_queue` — cola de contenido (orchestrator_status · brand_id)
- `iid_research_raw` — texto crudo de investigación web_search
- `iid_briefs` — registro de briefs biweekly enviados
- `iid_cron_runs` — audit trail de ejecuciones pg_cron
- `iid_scheduler_config` — supabase_url · iid_cron_secret

### content.*
Content Engine:
- `content_pieces` — piezas finales (assets JSONB · brand_id · iid_source_tag · icr_passed)
- `content_calendar` — scheduling
- `content_performance` — métricas post-publicación
- `brand_voices` — templates narrativos + ICR + image style por voz (UNRLVL + Lucien seeded)
- `orchestrator_jobs` — tracking Orchestrator → Labs (approval_token · labs_status)

### Supabase XMMs (puoybldykxqvhvtnwrld) — SEPARADO
Proyecto dedicado a uso personal y agentes WhatsApp:
- `conversations` — perfiles usuarios + historial (role, linked_phone)
- `medications` — medicamentos activos con horarios
- `appointments` — citas médicas (reminded_2days/1day/same)
- `reminder_log` — log de recordatorios enviados
- `notification_settings` — config por usuario
- `reminders` — recordatorios personales con fecha/hora
- `conversation_flows` — flujos conversacionales con estado
- `proactive_checks` — verificaciones proactivas programadas

---

## Edge Functions activas (Supabase principal)

| Función | Versión | Propósito |
|---|---|---|
| `iid-core` | v1.1 | Scoring engine + generador + AIFE. Central del IID Network. |
| `iid-research` | v1 | Genérica — web_search → iid_research_raw. Todos los agentes. |
| `iid-process` | v1 | Genérica — estructura JSON → iid-core. Todos los agentes. |
| `iid-ecommerce-research` | v1 | Específica ECOMMERCE — research step 1 |
| `iid-ecommerce-process` | v1 | Específica ECOMMERCE — process step 2 |
| `iid-brief-generator` | v1 | Email biweekly a Sam con TOP/WATCHLIST/DISCARDED |
| `unrlvl-profiler` | v12 | Lead qualification agent. logTokens activo. |
| `unrlvl-crm-api` | v2 | CRM API |
| `fphs-formalize` | v11 | Document Factory. logTokens activo. |
| `fphs-chat` | v8 | ForumPHs Speaks chat. logTokens activo. |
| `fphs-session` | v8 | ForumPHs session management |
| `fphs-debug` | v4 | Debug util |
| `fphs-icr-apply` | v2 | ICR application |

## Edge Functions activas (Supabase XMMs)

| Función | Versión | Propósito |
|---|---|---|
| `send-reminders` | v8 | Recordatorios medicamentos · citas · personales · proactivos · saludos |

## pg_cron jobs (27 activos — Supabase principal)

Research + Process por agente. Horario:
- **Lunes 8:00/8:30** — IID-ECOMMERCE
- **Martes 8:00/8:30** — IID-LLM
- **Martes 9:00/9:30** — IID-PERSONAL-BRAND
- **Miércoles 8:00/8:30** — IID-META
- **Jueves 8:00/8:30** — IID-IMAGE
- **Jueves 9:00/9:30** — IID-VIDEO
- **Viernes 8:00/8:30** — IID-VOICE
- **Viernes 9:00/9:30** — IID-TIKTOK
- **Sábado 8:00/8:30** — IID-GOOGLE
- **Domingo 8:00/8:30** — IID-LINKEDIN
- **Domingo 9:00/9:30** — IID-X
- **Día 1+15 7:00** — Brief biweekly email
- **Día 1+15 9:00/9:30** — IID-FLORIDA
- **Día 8+22 9:00/9:30** — IID-WHOLESALE

## pg_cron jobs (Supabase XMMs)

- **Cada hora** — send-reminders Edge Function (medicamentos · recordatorios · proactivos)
