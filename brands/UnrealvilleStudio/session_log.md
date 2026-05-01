# Session Log — UnrealvilleStudio + NeuroneSCF
**Updated:** 2026-05-01

---

## Session 2026-05-01 — ShopifyAuditor v3 Complete

### Lo que se construyó
**ShopifyAuditor v3** — auditor Shopify técnico + estratégico, listo para uso interno y prospección B2B.

#### Arquitectura final
- **App:** `Tools/shopify-auditor/shopify_audit.html` → https://unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html
- **SKILL:** `Tools/shopify-auditor/SKILL_shopify-auditor.md` (context recovery protocol completo)
- **Proxy Claude:** `Tools/api/audit-proxy.js` → https://unrlvl-tools.vercel.app/api/audit-proxy
- **EF Audit:** `shopify-audit v6` — 13 módulos + strategic_seo, read_apps real, save via RPC
- **EF Fix:** `shopify-fix v1` — 4 fix types con snapshot antes de theme edits
- **EF Lookup:** `shopify-store-lookup v1` — multibrand por dominio
- **EF Brief:** `shopify-audit-brief v1` — markdown para Claude chat

#### NeuroneSCF B2B conectado
- Store ID: `5bc2d55b-da9f-47f6-bddf-7289e9a688bb`
- Domain: `nj5ybc-n1.myshopify.com`
- Scopes: todos incluyendo `read_apps` y `write_themes`
- OAuth: App UNRLVL Auditor_B en Dev Dashboard

#### Decisiones de diseño clave
1. **Tools repo** es el canonical location para auditing tools. Patrón: `tool/SKILL.md + app.html`, proxies en `api/` raíz.
2. **Two-tier audit:** Technical (100 pts) + Strategic (+ 10 pts con 7 preguntas de contexto).
3. **Fix engine** siempre requiere confirmación. Theme edits = snapshot Supabase primero.
4. **Claude Brief:** mecanismo de handoff UI→chat para que Claude aplique fixes directamente.
5. **RPC save:** `.schema('shopify' as any)` falla silenciosamente en JS client. Usar `save_shopify_audit_run` RPC.
6. **SEO quality:** no solo presencia — largo (30-70 chars), duplicados, genéricos detectados.
7. **read_apps scope:** análisis real de apps, costo mensual, apps faltantes críticas.

#### Scope del servicio (R4B)
Doble propósito:
- **Interno:** gestionar y mantener tiendas del ecosistema (NeuroneSCF B2B/B2C, futuros clientes)
- **Externo:** lead gen — audit gratuito → demo del fix engine en tiempo real → "¿te lo corregimos?"

**Pendiente para R4B:** intake form (7 preguntas estratégicas) + landing de resultado + fix packs pricing.

### Estado al cierre de sesión
- ✅ ShopifyAuditor v3 deployed en Tools repo
- ✅ EF shopify-audit v6 ACTIVE
- ✅ NeuroneSCF B2B OAuth connected
- ✅ Supabase schema shopify.* completo (stores, audit_runs, fix_log, theme_snapshots)
- ✅ Context recovery protocol documentado en SKILL
- ⏳ Tests NeuroneSCF B2B + B2C PENDIENTE (próxima sesión)
- ⏳ Sales closing / intake form PENDIENTE
- ⏳ NeuroneSCF B2C OAuth PENDIENTE

### Próximos pasos
1. Tests completos B2B y B2C con fix engine en vivo → declarar ready4business
2. Diseñar intake form 7 preguntas + landing + pricing

---

## Session 2026-04-30 — IID Pipeline + ImageLab + Lucien Identity

### Completado
- content-run-stage v1.11 LIVE con ImageLab via fal.ai
- approve-piece EF deployed
- brand_oauth_tokens tabla creada
- FAL_API_KEY activo
- Lucien Sael BP_Brand_Person_id.md v1.0 COMPLETE
- UNRLVL + LucienSael websites v3 generados

### Pendiente de esta sesión
- Deploy luciensael.com + DNS fix
- Social OAuth
- Labs Tests T1-T7
- Approval flow test (piece e75bdb73)

---

## Session 2026-04-26 — IID Pipeline End-to-End Confirmado

### Completado
- Pipeline IID end-to-end OPERATIONAL
- Primer email de aprobación confirmado
- content-run-stage v1.10 con auto cost logging
- ops_generation_ledger + ops_lab_rates tables
- 8 KPI views activas

