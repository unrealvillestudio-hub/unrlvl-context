# Session Log — UnrealvilleStudio + NeuroneSCF
**Updated:** 2026-05-21

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

## Session 2026-05-21 — CopyLab Async Pipeline RESUELTO + Test S.O.S Rescue System

**Sprint:** CopyLab async pipeline — resolución del 504 cold start + test end-to-end con kit real.

### RESUMEN EJECUTIVO
Después de 3 días de diagnóstico, el bloqueante del pipeline async fue resuelto: el handler format incorrecto en `api/execute.ts`. Web API format (`req: Request → Response`) ignora `maxDuration:300` en Node.js runtime → 504 silencioso a ~120s. Fix: migrar a `VercelRequest/VercelResponse` de `@vercel/node`.

### CAMBIOS DEPLOYADOS

**CopyLab v9.6** — `api/execute.ts` (Node.js native handler):
- `import type { VercelRequest, VercelResponse } from '@vercel/node'`
- `export default async function handler(req: VercelRequest, res: VercelResponse)`
- CORS via `res.setHeader()` en loop, responses via `res.status(N).json({})`
- maxDuration:300 ahora respetado correctamente
- SHA: `d4a7613d`

**process-job.ts v1.1** — mismo fix Node.js native handler. Commit `0040f09`.

**vercel.json** — `fluid:false`, sin `process-job.ts` en functions (maxDuration via export const). Commit `7d0c320b`.

**gh-write.js** — añadido a `unrlvl-context/api/`. Relay POST para escritura de archivos grandes a GitHub (>5KB) que supera el límite de URL params de gh.js.

### INFRAESTRUCTURA LIMPIA
- `copylab-file-writer` EF eliminada (era one-shot de diagnóstico)
- `temp_file_staging` tabla dropeada
- `gh-write.js` se queda (útil para el futuro)

### PIPELINE ASYNC — ESTADO FINAL OPERACIONAL
```
pg_cron (1min) → copylab-processor EF v1.4
               → 1 query brand_cache_snapshots (v2.0 NeuroneSCF)
               → POST unrlvl-copy-lab.vercel.app/api/execute (v9.6)
               → Claude API ~22s
               → PATCH copylab_jobs status=done
Total: 22-24s por job ✅
```

### TEST S.O.S RESCUE SYSTEM — RESULTADOS

**Kit ID Shopify:** 10777103565127 · SKU: NSCF-KT-104
**Precio:** $179.99 · Valor individual: $334.93 · Ahorro: $154.94 (46% OFF)
**7 componentes:** Shampoo Dyfensor SF 400ml + Kerasin HB Mask 400ml + Dyfensor Serum 25ml + Hyaloneurine F&H 50ml + Green 100 25ml + DY Fazza 400ml + Neurona Gloss 100ml

**Job ES** `acbe6bdb`: done · wait 30.2s · exec 22.5s · total 52.7s · 3,187 chars
**Job EN** `d8090796`: done · wait 89.6s · exec 22.1s · total 111.7s · 3,754 chars
**cache_mode:** v2.0_zero_query (0 queries adicionales)

**Nota de calidad:** El copy salió genérico. Causa: `product_description_b2c` no tiene compatibility rules en snapshot para NeuroneSCF → creative_seed null, voice_genome null. Pendiente próximo sprint de contenido.

### PROFESSOR — LEARNINGS Y MANUALS

**29 learnings aprobados** (approved_by_sam=true) — incluyendo 7 nuevos del sprint:
1. Vercel Node.js runtime: Web API handler format ignora maxDuration
2. Arquitectura async canónica 10 pasos para Labs UNRLVL
3. pg_net→Vercel anti-patrón confirmado
4. Brand Cache Snapshot v2.0 — patrón de pre-build
5. GH PAT fine-grained — scope Contents: Read and Write
6. vercel.json functions — orden de commits
7. lab_jobs unificada — migration path para Ayra

**professor_manuals:** `ASYNC_LAB_PIPELINE v1.0` creado — receta canónica con keywords para findability. ID: `b0dec52f`.

**Ayra Sprint 0 scope addition:** PROFESSOR árbol navegable (patrón INDEX.md como ui-ux-layer). PROFESSOR_CORE como índice liviano. Nodos: VERCEL_RUNTIME, ASYNC_LAB_PIPELINE, SUPABASE_PATTERNS, SHOPIFY_PATTERNS, COPYLAB_PIPELINE, AYRA_ARCHITECTURE, GITHUB_OPS.

### NOTA TÉCNICA — LIMITACIONES DESCUBIERTAS
- Herramientas MCP (execute_sql, deploy_edge_function) truncan strings ~2000-3500 chars
- bash_tool: dominios allowlist no incluye unrlvl-context.vercel.app ni supabase.co
- Vercel:web_fetch_vercel_url: GET only, sin body
- Para archivos grandes: usar gh-write.js via POST desde EF Supabase o push manual

---

## Session 2026-05-21 (anterior) — CopyLab Async + unrlvl-supabase-mcp

**Sprint activo NeuroneSCF:** implementar modo async en CopyLab para generar email sequences Cart A+B ES sin bloquear el browser. Sprint bloqueado por incompatibilidad estructural pg_net → Vercel (8h de diagnóstico). Solución definitiva: EF processor + pg_cron.

**NUEVO — unrlvl-supabase-mcp v1.1 LIVE:**
- URL: `https://unrlvl-supabase-mcp.vercel.app/api/mcp/mcp`
- Repo: `unrealvillestudio-hub/unrlvl-supabase-mcp`
- Vercel ID: `prj_svtqNxIlwRvzMFYKmnOCAyK7GcQP`
- Framework: @vercel/node puro (sin Next.js — CVE en 15.3.x)
- Tools: execute_sql · apply_migration · deploy_edge_function · list_edge_functions · get_edge_function · get_logs · list_tables
- Scope: proyecto Supabase `amlvyycfepwhiindxgzw`

**CopyLab v9.4.1:**
- execute.ts: async mode — POST async:true → INSERT copylab_jobs → 202 inmediato
- copylab_jobs tabla creada (status: queued/processing/done/error)
- vercel.json: fluid:false + maxDuration:300

---

## Session 2026-05-10 — Skills System v1.0 + Sprint de Infraestructura

**Skills system v1.0 operativo.** 16 skills en `skills/[nombre]/SKILL.md`, todos con nomenclatura canónica. INDEX.md creado. 5 nuevos skills (shopify-mcp · vercel · ads-mcp · higgsfield · agent-browser). 8 skills migrados desde `brands/UnrealvilleStudio/`. SESSION_PROTOCOL.md v10 actualizado. ecosystem_filemap.md completo (62 archivos). PLAN_MAESTRO + Labs Strategy movidos a `docs/`.

---

## Session 2026-05-01 — ShopifyAuditor v3 Tests Completos + NeuroneSCF B2B+B2C Conectados

ShopifyAuditor v3 declarado **READY FOR BUSINESS**. Ambas tiendas NeuroneSCF conectadas via OAuth.

- EF shopify-audit v7→v8, shopify-fix v2, RPCs `save_theme_snapshot` + `list_connected_stores`
- Fix THEME-001 en producción ✅ — Score NeuroneSCF B2B: 93→96/135
- B2B re-OAuth con read_apps ✅ · B2C OAuth completado ✅ (egdk1n-gt.myshopify.com)
- audit-proxy.js: mode=fix para Claude direct execution

---

## Session 2026-04-26 — IID Pipeline End-to-End Confirmado

Pipeline IID end-to-end OPERATIONAL. Primer email de aprobación confirmado. content-run-stage v1.10 con auto cost logging.
