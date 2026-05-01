# Session Log — UnrealvilleStudio + NeuroneSCF
**Updated:** 2026-05-01

---

## Session 2026-05-01 — ShopifyAuditor v3 Tests Completos + NeuroneSCF B2B+B2C Conectados

### Resumen ejecutivo
ShopifyAuditor v3 declarado **READY FOR BUSINESS** tras tests completos con NeuroneSCF B2B.
Ambas tiendas NeuroneSCF (B2B + B2C) conectadas via OAuth con read_apps incluido.

### Lo completado en esta sesión

#### ShopifyAuditor — Tests y fixes
- **EF shopify-audit v7 → v8**: Fix maxScore (settings:20 incluido), split de productos query en 2 (fix 0 productos bug), error handling explícito
- **EF shopify-fix v2**: Fix bug schema snapshot (usaba .schema() directo que falla — ahora usa RPC `save_theme_snapshot`)
- **RPC `save_theme_snapshot`** creada en Supabase
- **RPC `list_connected_stores`** creada en Supabase
- **Fix THEME-001 aplicado en producción** ✅ — OG tags añadidos a theme.liquid de NeuroneSCF B2B. Score: 93 → 96/135
- **Claude Brief** testeado ✅ — formato correcto, findings completos, fix payloads JSON incluidos
- **Fix engine operativo end-to-end** ✅ — confirmación → apply → resultado en tiempo real
- **audit-proxy.js actualizado** — añadido mode=fix para Claude direct execution

#### NeuroneSCF — Infraestructura Shopify
- **B2B re-OAuth con read_apps** ✅ — token actualizado 14:41 UTC
- **App B2C creada en Dev Dashboard** bajo cuenta "Neurone South & Central Florida" — Client ID: 360f1d3a...
- **EF shopify-oauth v4** — añadido NeuroneSCF:b2c al STORE_REGISTRY
- **B2C OAuth completado** ✅ — token guardado: egdk1n-gt.myshopify.com · updated 15:15 UTC

#### Estado Shopify stores en Supabase
| brand_id | type | domain | status |
|---|---|---|---|
| NeuroneSCF | b2b | nj5ybc-n1.myshopify.com | ✅ CONNECTED |
| NeuroneSCF | b2c | egdk1n-gt.myshopify.com | ✅ CONNECTED |

#### Audit NeuroneSCF B2B — Resultados finales
- **Score final: 96/135** (post OG tags fix)
- **3 críticos restantes**: SET-002 (no Refund Policy), THEME-005 (footer sin links legales), PAY-001 (sin gateway — B2B invoice model TBD con Patricia)
- **10 importantes**: ToS, Shipping Policy, 66 descripciones cortas, SEO titles 15-18 chars, JSON-LD, cookie consent, shipping rates, Refund Policy navegación, read_apps scope
- **Auto-fixable**: 0 (todos los fixes aplicables ya aplicados)

#### brand.json NeuroneSCF — Estado
- **marketing_context B2B** propuesto pero NO commiteado — pendiente:
  1. Definir contexto B2C (consumidor final vs profesional, tono, keywords consumer-facing)
  2. Confirmar si brand.json tiene contexto unificado B2B+B2C o separado
  3. Sam debe responder: ¿catálogo B2C igual o diferente al B2B? ¿tono B2C?
- **Shopify domains actualizados** en brand.json (B2B + B2C domains confirmados)

### Pendientes para próxima sesión

**Inmediato — antes de cerrar:**
1. Definir marketing_context B2C con Sam → completar brand.json → commit
2. Strategic audit B2B con keywords reales

**Próxima sesión:**
1. Audit completo NeuroneSCF B2C (primer run)
2. Strategic audit B2B + B2C con marketing_context real
3. ShopifyAuditor — mejora: ecosistema brands → leer brand.json automáticamente para strategic_context (no mostrar formulario a clientes existentes)
4. Sales closing design: intake form (7q) + landing + fix packs pricing
5. IID approval flow test (piece e75bdb73)
6. ImageLab fix (GEMINI_API_KEY + v1.11)

### Decisiones arquitectónicas tomadas hoy
- **brand.json es el canonical source** para strategic_context en el auditor — para marcas del ecosistema, NO mostrar formulario
- **marketing_context debe tener sub-secciones b2b y b2c** cuando la marca tiene ambos canales
- **shopify-oauth STORE_REGISTRY** debe actualizarse cada vez que se añade una nueva tienda/marca
- **audit-proxy.js soporta mode=fix** para que Claude aplique fixes directamente desde el chat

---

## Session 2026-04-30 → 2026-05-01 — ShopifyAuditor v3 Build + NeuroneSCF B2B OAuth

### Completado
- ShopifyAuditor v3 completo: 13 módulos, strategic layer, Fix Queue, Claude Brief
- NeuroneSCF B2B OAuth conectado (store_id: 5bc2d55b)
- Tools repo estructurado: shopify-auditor/ + api/audit-proxy.js
- EF shopify-audit v6, shopify-fix v1, shopify-store-lookup v1
- Context recovery protocol documentado en SKILL_shopify-auditor.md

---

## Session 2026-04-26 — IID Pipeline End-to-End Confirmado
- Pipeline IID end-to-end OPERATIONAL
- Primer email de aprobación confirmado
- content-run-stage v1.10 con auto cost logging

