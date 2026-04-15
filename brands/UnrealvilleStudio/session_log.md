# Session Log — Unrealville Studio
_Marca interna · Sam (owner) · Actualizado: 2026-04-15_

---

## 2026-04-15 — Sesión maratón día 2 (cierre)

### Document Factory — Plan documentado

**DOCUMENT_FACTORY_PLAN.md creado** — referencia permanente para sesiones de desarrollo.

Decisiones clave tomadas:
- Claude consume JSON, nunca archivos crudos directamente
- Normalizer (evolución del Zip Extractor) acepta .xlsx/.pdf/.docx → produce JSON schema fijo por módulo
- Motor único / dos contextos: ForumPHs (servicio a clientes PH) + UNRLVL (filtro de onboarding)
- Document Factory es el hogar de todo — no repos separados por tipo de documento
- Financial Intelligence como filtro de calificación UNRLVL: convierte "no somos para todo el mundo" en proceso objetivo y documentado

**Esta semana (sesión dedicada):**
- Formalizar schema JSON EEFF v1.0
- Mover Zip Extractor a `tools/normalizer.html` en repo Document Factory
- Definir template XLSX estándar de ingesta

### UNRLVL CRM v1.0 — COMPLETO (sesión anterior)
Schema crm.* Supabase · 14 tablas · 7 orgs · 9 pipelines · API v2 LIVE
Dashboard HTML operativo localmente · Trigger Profiler→CRM activo
CRM_INTEGRATIONS.md documentado en context

### Web + Profiler + Infraestructura (sesión anterior)
Web unrealvillestudio.com EN+ES LIVE · Profiler Agent v5 · CoreProject limpio
GitHub proxy v2 · Cloudflare activo · Auditoría completa todos los labs
Plan Maestro de labs y skills · 6 skills permanentes estrategia definitiva

### Pendiente próxima sesión

**Document Factory (esta semana):**
1. Schema JSON EEFF v1.0 — definir estructura fija
2. Normalizer en `tools/` del repo Document Factory
3. Template XLSX estándar ingesta

**Operaciones:**
4. ForumPHs Speaks → CRM integración Edge Function
5. NeuroneSCF: Meta BM + 87 SKUs + precios
6. SMA: URL session_log en system prompt
7. ForumPHs: foto Ivette para Speaks

**Labs:**
8. Skill ui-ux-layer
9. Fal.ai birefnet → ImageLab LoRA Prep
10. BP_COPY_1.0 x3 marcas

### Decisiones importantes tomadas hoy

- Document Factory crecerá a contratos, actas, informes — estructura modular ya definida
- Financial Intelligence tiene dos roles: valor para clientes FPHs + filtro de onboarding UNRLVL
- Umbrales de calificación UNRLVL pendientes de definir con Sam en sesión estratégica
- CRM centralizado (UNRLVL controla) + Client Ops Template para casos como ForumPHs
- Schema crm.* migrable a Supabase propio cuando supere 50K contactos
