# UNRLVL-OPS Session Log

---

## 2026-03-29 — UNRLVL-OPS v0.1 PASSED ✅

**Chat:** Sesión dedicada UNRLVL-OPS (ecosystem, no brand-specific)
**Status final:** PASSED — deployed en producción

### Lo que se construyó

**Schema Supabase (5 tablas nuevas):**
- `ops_services` — catálogo de 11 servicios (anthropic, anthropic_plan, vercel, supabase, heygen, fal_ai, tenzorart, cloudflare, hostinger, shopify, custom)
- `ops_costs` — registros de costos por mes/lab/marca. Costos históricos cargados ago 2025–mar 2026
- `ops_thresholds` — alertas de gasto (vacía, pendiente configurar)
- `ops_renewals` — 4 renovaciones próximas (Shopify jun 2026, Hostinger nov/dic 2026, dominio UNRLVL)
- `ops_insights` — 5 insights activos con snooze/dismiss

**App (unrlvl-ops.vercel.app):**
- Stack: Vite + React + TypeScript + Recharts + Supabase fetch nativo
- Repo: unrealvillestudio-hub/unrlvl-ops (prj_LcsIr7EXVokq93tG1XZodvX5R7C6)
- `/` Dashboard: summary cards, trend 6 meses, alertas, insights panel, tabs por servicio/lab/marca
- `/admin` Registro manual de costos + tabla editable con delete
- Sin auth — acceso directo por URL (uso interno Sam)
- Favicon: SVG `>` UNRLVL brand mark con animación blink

**Datos cargados:**
- Claude.ai Plan: ago/sep/oct 2025 ($20/mes), feb 2026 (€21.78), mar 2026 (€297.39 — 13 cargos)
- Anthropic Console API: mar 2026 ($45 en créditos)
- Hostinger: hosting d7herbal.com (€65.19 nov 2025), email diamonddetails.es (€5.08 dic 2025)
- Shopify NeuroneSCF: mar 2026 (€1 promo)

**Insights generados:**
1. 🔴 Gasto Claude.ai x16 en marzo (€297 vs $20 histórico) → recomendar migrar workloads a API
2. 🟡 Shopify sube €1→€29 en jun 2026 → evaluar plan anual antes
3. 🟡 Hosting d7herbal.com €203/año — verificar si brand está activo
4. 🔴 Dominio unrealvillestudio.com pendiente de setup
5. 🔴 Auto-reload deshabilitado en Anthropic Console ($23.76 restante)

### Issues resueltos durante deploy
- Vercel detectó framework como "Other" → cambiado a Vite manualmente
- Root directory faltaba → configurado `unrlvl-ops` en Settings
- RLS sin GRANT → `GRANT SELECT/INSERT/DELETE ON ops_* TO anon` aplicado
- Env vars VITE_* se hornean en build → requirió redeploy post-configuración

### Pendiente UNRLVL-OPS
- Configurar `ops_thresholds` para alertas de gasto
- Cargar Vercel/Supabase/Cloudflare cuando salgan de free tier
- v0.2: CRUD de thresholds desde el dashboard
- v0.2: Export CSV de costos por período
