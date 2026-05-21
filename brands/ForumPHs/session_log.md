# Session Log — ForumPHs
_Última actualización: 2026-05-20_

---

## Estado actual — post sesión 2026-05-20

### Supabase ForumPHs (tajuoqdbnsnzkhyqvdgs) — tablas activas
buildings, units, owners, owner_units, residents, profiles,
payments, arrears, communications, assemblies, assembly_agenda_items,
assembly_votes, meters, pets, vehicles

### Tablas PENDIENTES DE CREAR (próxima sesión)
- `mora_mensual` — clasificación mensual por unidad (Fase I/II/III)
- `informes` — informes BI mensuales generados por Document Factory
- `activos` — equipos e infraestructura por edificio (Sprint 5)
- `df_jobs` — cola de jobs del Document Factory (va en ForumPHs DB, NO en UNRLVL)

### Supabase UNRLVL (amlvyycfepwhiindxgzw) — cambios de esta sesión
- EF fphs-session v25 activa (OTP + Resend + producción)
- Secrets activos: FPHS_SERVICE_KEY + FPHS_RESEND_API_KEY
- speaks_sessions: columnas OTP agregadas
- speaks_golden_pass: 5 golden passes activos

---

## SPRINT 1 — Foundation (12–23 Mayo)

| Tarea | Estado | Notas |
|---|---|---|
| ForumPHs Speaks — auth OTP + Resend | ✅ Cerrado | v25 en prod, email funcional |
| Speaks — tab Propietarios + Context Selector | ✅ Cerrado | index.html deployado |
| Speaks — bienvenida personalizada propietario | ✅ Cerrado | Primera vez larga, siguientes corta |
| DB — promotoras Los Alamos + Lefevre 75 | ✅ Cerrado | DESARROLLO LA MITRA + LEFEVRE 75 RESIDENCIAL S.A. |
| DB — usuarios test Sam + Ivette | ✅ Cerrado | TEST-SAM, TEST-IVETTE en Lefevre 75 |
| Compliance setup ForumPHs en ecosystem | ⏳ 30 min | brand.json, BP_Brand_Context, ecosystem.json |
| **Document Factory — módulo BI + Informe Mensual** | ❌ **No iniciado** | **RIESGO: deadline Star & Herald 1 Jun** |

---

## SPRINT 2 (26 Mayo – 6 Junio)
- Tracker V0 — captura ACHs + EF mora
- Tracker V1 — foto de recibo + Claude Vision
- Protocolo mora semi-automatizado (cron día 1)

## SPRINT 3 (9–20 Junio)
- Supabase Auth — roles propietario/junta/admin_fphs
- Portal propietarios — Next.js en portal.forumphs.com
- Template email bienvenida propietarios

## SPRINT 4 (23 Jun – 4 Jul)
- Klaviyo — conexión Supabase via webhook
- Twilio WhatsApp Business — flows base
- Biblioteca de Comunicaciones — 12 templates

## SPRINT 5 (7–18 Jul)
- Calendario de Mantenimientos + cron alertas
- Runbook onboarding nuevos PHs

---

## Document Factory — contexto para próxima sesión

**App existente:** Document Factory v1.5 — deployada en Vercel
**Key Anthropic:** `forumphs_document_factory` (env var con underscore)
**Job types existentes:** acta_ordinaria, acta_extraordinaria
**Job type a agregar:** `informe_mensual`

**Módulo BI — inputs requeridos:**
1. Datos de mora del mes (de `arrears` en Supabase)
2. Datos de pagos del mes (de `payments`)
3. Datos del edificio (de `buildings` + `units`)
4. Contexto histórico (meses anteriores)

**Tablas a crear ANTES de arrancar el módulo:**
- `mora_mensual` (clasificación Fase I/II/III por unidad/mes)
- `informes` (output del módulo BI, con insert post-generación)

**Archivos de referencia en el proyecto:**
- `/mnt/project/temp_ACTA_PHAS_GOAL_example_01.docx` — Asamblea Ordinaria
- `/mnt/project/temp_ACTA_PHAS_GOAL_example_02.docx` — Asamblea Extraordinaria
- Instrucciones completas de generación de actas en el system prompt del proyecto

**Disclaimer CPA requerido en output del informe BI**

---

## Secrets y credenciales activas

| Secret | Proyecto | Valor |
|---|---|---|
| FPHS_SERVICE_KEY | amlvyycfepwhiindxgzw | service_role key de tajuoqdbnsnzkhyqvdgs |
| FPHS_RESEND_API_KEY | amlvyycfepwhiindxgzw | re_VGuqYnRh... (sends desde speaks@forumphs.com) |

---

## Professor — learnings 2026-05-20
- 11 aprobados → archivos en knowledge/ (ver outputs/knowledge/)
- 4 rechazados (fácil de recordar)
- SKILL_GAPS.md: upgrade ui-ux-layer en AGENDA
