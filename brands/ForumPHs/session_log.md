# session_log.md — ForumPHs
_Última actualización: 2026-05-22 (sesión 2) · Claude Sonnet 4.6_

---

## SESIÓN 2026-05-22 — OPS Shell + Tracker V0 + BI/FIE Supabase

### Completado esta sesión

**ForumPHs OPS — DEPLOYADO ✅**
- Repo: `unrealvillestudio-hub/forumphs-ops` (privado)
- Vercel: `forumphs-ops` → READY ✅
- Shell: Home KPIs · Tracker V0 · OPS placeholder S3 · Comms placeholder S4
- BottomNav mobile-first (terra en tab activo, dot-breathe)
- `app/globals.css` — Visual Genome Amatista Carbon mobile-first + S17
- Arquitectura: todas las rutas → `/api/*` → service_key server-side
- Env Vars Vercel: `FPHS_SUPABASE_URL` + `FPHS_SERVICE_KEY` (sensitive, server-only)
- Eliminadas: `NEXT_PUBLIC_FPHS_URL` + `NEXT_PUBLIC_FPHS_ANON_KEY` (innecesarias sin auth)

**Tracker V0:**
- Selector de edificio (8 PHs) → carga `units` + `mora_mensual` del período actual
- KPI strip: % mora (T9 heartbeat), al día, en mora, F-IV
- Cartera mora total con visual terra
- Filtros: Todos / En Mora / Al Día + búsqueda
- Lista unidades con `unit_code`, `tower`, `floor`, `unit_type`, `metraje` (columnas reales)
- Bottom sheet modal: registrar pago → `payments` via `/api/payments`
- Métodos: ACH · Transferencia · Depósito · Cheque · Efectivo · Yappy

**Document Factory — BI+FIE conectados a Supabase ✅**
- `app/bi/data/route.ts` — lee `monthly_kpis` + `mora_mensual` + `eeff_preliminar`
- `app/bi/html/route.ts` — llama EF `fphs-bi-report` + persiste en `informes`
- `app/bi/status/route.ts` — workflow EEFF borrador→enviado_jd→pendiente_cpa→oficial
- `app/api/fie/supabase/route.ts` — carga FIESchema desde `eeff_preliminar`
- `app/fie/page.tsx` v3 — 3 modos: Supabase Realtime · archivo · manual
- Patrón: fetch REST directo (sin @supabase/supabase-js — no instalado en DF)

**Professor checkpoint 5:** 7 learnings aprobados

### Estado Supabase ForumPHs (tajuoqdbnsnzkhyqvdgs)
| Tabla | Filas | Estado |
|---|---|---|
| `buildings` | 8 | ✅ tier, tarifa, total_units completos |
| `units` | 1,560 | ✅ unit_code, tower, floor, metraje, maintenance_fee |
| `mora_mensual` | 0 | ❌ Esperando datos de IF |
| `payments` | 0 | ❌ Esperando datos de IF |
| `monthly_kpis` | 0 | ❌ Esperando datos de IF |
| `eeff_preliminar` | 0 | ❌ Esperando datos de IF |

**Nota importante:** `units` NO tiene `owner_name`/`owner_phone`. Solo `unit_code`, `tower`, `floor`, `unit_type`, `metraje`, `maintenance_fee`.

### Pendientes ForumPHs
- Datos Ene–Abr 2025 de IF: mora_mensual + payments + eeff_preliminar
- Voice genome v1.0 — entrevista estructurada con Ivette Flores
- Web institucional FPH-007 — foto IF pendiente
- Propuesta Star & Herald — IF debe aprobar ASAP
- Speaks: ANTHROPIC_API_KEY en Supabase Secrets (tajuoqdbnsnzkhyqvdgs)
- OPS S3: Daily Workflow (Jun 2026)
- OPS S4: Communications + ADM Virtual (Jul 2026)
- Auth system (Sprint posterior a S4)

### Alertas activas
- 🔴 Reservas laborales corrientes $0 — VENCIDO 1 Mayo ($1,014.89/mes)
- 🔴 Pasivo laboral ~$25k sin provisionar — VENCIDO 15 Abr
- 🔴 Propuesta Star & Herald lista — IF debe aprobar ASAP
- 🟡 Speaks ANTHROPIC_API_KEY pendiente en Supabase Secrets
