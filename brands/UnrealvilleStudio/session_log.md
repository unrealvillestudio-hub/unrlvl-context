# Session Log — Unrealville Studio
_Marca interna · Sam (owner) · Actualizado: 2026-04-15_

---

## 2026-04-15 — Sesión maratón día 2 (continuación)

### UNRLVL CRM v1.0 — COMPLETO Y OPERATIVO

**Schema `crm.*` en Supabase (14 tablas, aislado del ecosistema):**
`orgs` · `contacts` · `contact_orgs` · `pipelines` · `deals` · `interactions`
`email_sequences` · `sequence_enrollments` · `segments` · `segment_contacts`
`tags` · `contact_tags` · `hygiene_rules`

**7 orgs creadas con pipelines propios:**
- UnrealvilleStudio: Sales Pipeline (7 stages)
- ForumPHs: Pipeline Speaks (5 stages)
- NeuroneSCF: B2B Salones + B2C (2 pipelines)
- Patricia Osorio Personal: Pipeline Comunidad
- Vizos Salon: Pipeline Salón
- Vizos Cosmetics: Pipeline Retail
- Unrealville Stores: Pipeline E-Commerce

**Arquitectura decidida:**
CRM centralizado (UNRLVL controla todo) + Client Ops Template opcional para casos como ForumPHs que tienen DB operativa propia ajena al marketing

**4 hygiene rules activas:** mark_cold_540d · archive_720d · unsubscribe_bounced · tag_no_email

**Trigger Profiler Agent → CRM activo:** cada lead capturado por el Profiler se sincroniza automáticamente a `crm.contacts` + `crm.contact_orgs` (org_id = UnrealvilleStudio)

**Dashboard HTML:** `UNRLVL_CRM_Dashboard.html` — operativo localmente (Sam). Corregido para usar crm.* schema API. Multi-org con sidebar, pipeline/list views, filtros, panel de detalle, notas, stage management, tier assignment, hygiene runner.

**CRM_INTEGRATIONS.md creado:** documentación completa de fuentes de datos por org, destinos, flujos, compliance, plan de implementación por fases. Guardado en context system.

**Correcciones previas (misma sesión):**
- Web unrealvillestudio.com EN + ES LIVE
- Profiler Agent v5 LIVE (senior strategist, marketing expertise)
- CoreProject limpiado 51→37 archivos
- GitHub proxy /api/gh v2 (read+write)
- Cloudflare proxy /api/cf activo
- Vizos WF corregido
- Auditoría completa todos los labs
- Plan Maestro PLAN_MAESTRO_LABS_SKILLS.md creado
- 6 skills permanentes estrategia definitiva

### Pendiente próxima sesión

1. ForumPHs Speaks → CRM (integración Edge Function — alta prioridad)
2. NeuroneSCF: Meta BM + SKUs + precios
3. SMA: URL session_log en system prompt
4. ForumPHs: foto Ivette para Speaks
5. Skill ui-ux-layer
6. Fal.ai birefnet → ImageLab LoRA Prep básico
7. BP_COPY_1.0 x3 marcas
8. CRM email sequences engine (Resend)

### Decisiones clave

- CRM centralizado: UNRLVL controla todos los datos de todos los clientes
- Client Ops Template: para casos como ForumPHs (DB operativa propia, no CRM de marketing)
- Schema crm.* aislado: migrable a Supabase propio cuando supere 50K contactos
- El modelo Contact × Org permite que una persona sea lead de UNRLVL Y cliente de NeuroneSCF simultáneamente
- Compliance: CAN-SPAM para USA · GDPR para España (VizosCosmetics, D7Herbal)
