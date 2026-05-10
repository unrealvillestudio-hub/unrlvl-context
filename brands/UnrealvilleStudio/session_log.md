# Session Log — UnrealvilleStudio + NeuroneSCF
**Updated:** 2026-05-10

---

## DOCUMENTOS DE REFERENCIA (permanente)

Archivos de arquitectura e intención estratégica. No son skills — son documentos de visión que Sam revisa y actualiza cada 2-3 meses.

| Archivo | Ubicación | Qué contiene | Cuándo cargar |
|---------|-----------|-------------|---------------|
| `PLAN_MAESTRO_LABS_SKILLS.md` | `brands/UnrealvilleStudio/docs/` | Roadmap de labs, estado actual, plan de skills, decisiones arquitectónicas | Planificación de labs, revisión trimestral |
| `UNRLVL_Labs_Strategy.html` | `brands/UnrealvilleStudio/docs/` | Visión estratégica del ecosistema en formato visual | Revisión de arquitectura, onboarding |
| `PARTNERSHIP_STRUCTURE_SAM_PO.md` | `brands/UnrealvilleStudio/` | Estructura legal del JV Sam/Patricia Osorio | Decisiones legales, estructura de entidades |
| `CRM_INTEGRATIONS.md` | `brands/UnrealvilleStudio/` | Integraciones CRM del ecosistema | Sesiones de CRM, pipeline de prospectos |
| `LUCIEN_BOOKS_MASTER.md` | `brands/UnrealvilleStudio/` | Arquitectura completa de los 5 libros de Lucien Sael | Sesiones del proyecto editorial |

**Cómo cargar:** `Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/api/gh?action=file&repo=unrlvl-context&path=brands/UnrealvilleStudio/docs/PLAN_MAESTRO_LABS_SKILLS.md`

---

## Session 2026-05-10 — Skills System v1.0 + Sprint de Infraestructura

**Skills system v1.0 operativo.** 16 skills en `skills/[nombre]/SKILL.md`, todos con nomenclatura canónica. INDEX.md creado. 5 nuevos skills (shopify-mcp · vercel · ads-mcp · higgsfield · agent-browser). 8 skills migrados desde `brands/UnrealvilleStudio/`. SESSION_PROTOCOL.md v10 actualizado. ecosystem_filemap.md completo (62 archivos). PLAN_MAESTRO + Labs Strategy movidos a `docs/`.

**Research:** Meta Ads MCP (mcp.facebook.com/ads, open beta 2026-04-29) · Higgsfield MCP (30+ modelos imagen/video, Soul Characters) · agent-browser (CLI Vercel Labs, Claude Code) · Pipeboard (Meta+TikTok+Google en un conector).

**Pendientes:** Custom Instructions actualizar (Sam) · shopify-auditor SKILL.md actualizar a v3.5 · PO social setup sesión dedicada.

---

## Session 2026-05-01 — ShopifyAuditor v3 Tests Completos + NeuroneSCF B2B+B2C Conectados

ShopifyAuditor v3 declarado **READY FOR BUSINESS**. Ambas tiendas NeuroneSCF conectadas via OAuth.

- EF shopify-audit v7→v8, shopify-fix v2, RPCs `save_theme_snapshot` + `list_connected_stores`
- Fix THEME-001 en producción ✅ — Score NeuroneSCF B2B: 93→96/135
- B2B re-OAuth con read_apps ✅ · B2C OAuth completado ✅ (egdk1n-gt.myshopify.com)
- audit-proxy.js: mode=fix para Claude direct execution

**Decisiones:** brand.json = canonical source para strategic_context · marketing_context con sub-secciones b2b/b2c · STORE_REGISTRY actualizar en cada tienda nueva.

---

## Session 2026-04-30 → 2026-05-01 — ShopifyAuditor v3 Build + NeuroneSCF B2B OAuth

ShopifyAuditor v3: 13 módulos, strategic layer, Fix Queue, Claude Brief. NeuroneSCF B2B OAuth (store_id: 5bc2d55b). Tools repo estructurado. EF shopify-audit v6, shopify-fix v1, shopify-store-lookup v1.

---

## Session 2026-04-26 — IID Pipeline End-to-End Confirmado

Pipeline IID end-to-end OPERATIONAL. Primer email de aprobación confirmado. content-run-stage v1.10 con auto cost logging.
