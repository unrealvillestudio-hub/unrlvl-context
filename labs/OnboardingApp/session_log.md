# Session Log — UNRLVL Onboarding App

---

## 2026-03-29 — v1.0 PASSED · Sam + Claude

### Resumen
Construcción completa del UNRLVL Onboarding App desde cero en una sola sesión. App interna AI-powered para onboardear marcas y poblar Supabase. Deployed en `unrlvl-onboarding-app.vercel.app`. Funcionalidad completa PASSED.

### Entregables construidos

**Arquitectura base**
- Stack: Vite + React 18 + TypeScript + Tailwind CSS
- Supabase: fetch nativo, sin SDK (patrón CopyLab)
- Claude Sonnet 4 via `/api/claude` proxy Vercel serverless
- `api/package.json` con `{"type":"commonjs"}` — fix crítico para ESM root + serverless Vercel
- `vercel.json`: rewrite `/api/(.*)` eliminado (auto-routing nativo Vercel)

**Módulos implementados**
- `Phase1Input` — editor libre con word count, progress bar, auto-resize, dispara Claude en "Analizar"
- `Phase2Enrichment` — side-by-side brief / contexto enriquecido, editable por campo, regen con instrucción adicional, razonamiento de Claude visible
- `Phase3Gaps` — chat interface, `[GAP_DATA_JSON]` tag para captura automática, data tracker lateral
- `Phase4Summary` — checklist pre-write, UPSERT a 5 tablas, result view por tabla
- `BrandGapView` — vista para marcas existentes: completeness dashboard + campos faltantes legibles + resumen narrativo de validación Claude + flujo generate → Phase 2

**Sistema de prompts**
- `PHASE2_SYSTEM_PROMPT`: schema Supabase completo, compliance por industria (FDA/FTC/EU/INVIMA/COFEPRIS/Legal_PA), humanize_profiles, `claude_reasoning` por campo
- `BRAND_SUMMARY_PROMPT`: resumen crítico de validación — detecta inconsistencias, termina con ⚠ o ✓
- `STUDIO_CONTEXT`: brand_id `UnrealvilleStudio` inyectado en todos los prompts

**UI / Branding**
- `UNREAL>ILLE` con chevron `>` blinking (`animate-pulse-accent`) en sidebar, WelcomeScreen
- Favicon SVG transparente (chevron cyan `#00FFD1` sin fondo negro)
- Botón `← Dashboard` en todas las vistas, resetea estado completo
- Sidebar con 10 marcas, completeness bar (verde/amarillo/rojo), collapsed mode

**Tablas Supabase pobladas por la app**
- `brands` (UPSERT on `id`)
- `humanize_profiles` (UPSERT on `brand_id, medium`)
- `compliance_rules` (UPSERT on `brand_id, rule_type`)
- `brand_palette` (UPSERT on `brand_id, role`)
- `brand_typography` (UPSERT on `brand_id, role`)

### Issues resueltos durante la sesión
1. TS errors build: `@vercel/node` faltante, `vite-env.d.ts` faltante, `Dispatch` type mismatch → resueltos
2. Vercel Install Command tenía `npm run dev` → corregido a `npm install` en dashboard
3. `"type": "module"` en root `package.json` conflicto con serverless → `api/package.json` con `"type":"commonjs"`
4. Rewrite `/api/(.*)` en `vercel.json` interfería con auto-routing → eliminado
5. `ANTHROPIC_API_KEY` scope solo Preview → activado Production
6. `LogoMark` component eliminado pero referencia pendiente en WelcomeScreen → resuelto

### Próximos pasos (v1.1)
- Usar BrandGapView con todas las marcas para poblar campos vacíos en Supabase
- `geomix` table population via Onboarding App
- Edit existing brand mode: cargar datos actuales de DB en Phase 2 al editar
- WebLab refactor `webEngine.ts` para consumir brands/humanize de Supabase (ahora disponibles via Onboarding App)
