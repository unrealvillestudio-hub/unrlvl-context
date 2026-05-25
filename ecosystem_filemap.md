# Ecosystem Filemap — Unrealville Studio
_Generado desde ecosystem.json v2026-05-25-v17 · No editar manualmente_

---

## Flujos principales

### Copy Pipeline (OPERACIONAL)
```
Sam/Claude → CopyLab UI (Orchestrator)
         → copylab_jobs (Supabase)
         → pg_cron job #30 (1 min)
         → copylab-processor EF v1.4
         → brand_cache_snapshots (contexto)
         → CopyLab v9.6
         → output → Shopify / Klaviyo
```

### Brand Cache (OPERACIONAL)
```
brand-cache-builder EF
  └─ action=build → brand_cache_snapshots (NeuroneSCF v2.0 · 18 tablas)
  └─ action=build_all → todas las marcas
  └─ action=status → estado actual

CopyLab detecta: isV2 = Array.isArray(bc.creative_vectors)
Modos: v2.0_zero_query | v1.x_partial | no_cache
```

### Meta MCP (LIVE 2026-05-25) 🆕
```
Servidor: unrlvl-meta-mcp.vercel.app
  └─ /api/mcp/mcp (23 tools · JSON-RPC)
  └─ middleware.ts → CORS headers todos los /api/* ✅
  └─ app/page.tsx → audit UI same-origin ✅

Datos: Supabase public.meta_accounts
  └─ brand_id · page_id · ig_user_id · ad_account_id · system_token
  └─ RLS: service_role_only → blocker list_brands ❌
  └─ FIX PENDIENTE: SUPABASE_SERVICE_ROLE_KEY en Vercel env

Brands configuradas:
  └─ UNREALville ✅ · LucienSael ✅ · NeuroneSCF ❌

Invocado por:
  └─ Orchestrator / Ayra / EFs → server-side, sin CORS ✅
  └─ audit page same-origin → ✅
  └─ Claude chat → ❌ no disponible como deferred tool

Documentación operativa:
  └─ infrastructure/meta-mcp/session_log.md ← log de sesiones
  └─ infrastructure/meta-mcp/CONFIG.md      ← (futuro) env vars, brandId schema
  └─ ecosystem.json → infrastructure[] → INFRA-META-MCP ← estado actual
```

### Shopify MCP
```
Servidor: unrlvl-shopify-mcp.vercel.app
  └─ /api/mcp/mcp
  └─ Documentación operativa: infrastructure/shopify-mcp/ (futuro)
  └─ ecosystem.json → infrastructure[] → INFRA-SHOPIFY-MCP
```

### Supabase MCP (unrlvl)
```
Servidor: unrlvl-supabase-mcp.vercel.app
  └─ /api/mcp/mcp · v1.2.1
  └─ Documentación operativa: infrastructure/supabase-mcp/ (futuro)
  └─ ecosystem.json → infrastructure[] → INFRA-SB-MCP
```

### Professor (OPERACIONAL)
```
Proxy: unrlvl-context.vercel.app/api/professor
  └─ ping · get-context · checkpoint · evaluate
  └─ log-case · submit-learning · approve-learning

Storage: Supabase amlvyycfepwhiindxgzw
  └─ professor_decision_criteria (16)
  └─ professor_veto_rules (4)
  └─ professor_learnings (29 aprobados + 17 nuevos sesión 2026-05-25)
  └─ professor_manuals (1: ASYNC_LAB_PIPELINE)
  └─ professor_platform_variables (9)

Checkpoint: silencioso cada 10 mensajes
Visible solo si score = 5
```

### Shopify Audit & Fix
```
unrlvl-tools.vercel.app → ShopifyAuditor v3.5
  └─ Supabase shopify schema
  └─ audit_runs (95) · fix_log · stores
  └─ EFs: shopify-audit · shopify-fix · shopify-fix-all
         shopify-content-pipeline · shopify-auto-translate
```

### Content IID
```
EFs: content-dispatcher · content-run-stage
     iid-core · iid-ecommerce · aife-filter

Supabase intel schema:
  └─ iid_content_queue (117 items)
  └─ iid_findings
  └─ iid_cron_runs
```

---

## Repositorios GitHub (unrealvillestudio-hub)

| Repo | Deploy | Estado |
|---|---|---|
| Orchestrator | orchestrator-unrlvl.vercel.app | ✅ v2.2 |
| CopyLab | unrlvl-copy-lab.vercel.app | ✅ v9.6 |
| unrlvl-context | unrlvl-context.vercel.app | ✅ LIVE |
| unrlvl-meta-mcp 🆕 | unrlvl-meta-mcp.vercel.app | ✅ LIVE 2026-05-25 |
| unrlvl-shopify-mcp | unrlvl-shopify-mcp.vercel.app | ✅ LIVE |
| unrlvl-supabase-mcp | unrlvl-supabase-mcp.vercel.app | ✅ v1.2.1 |
| unrlvl-social-media-agent | unrlvl-social-media-agent.vercel.app | ✅ LIVE |
| DDMV-Assistant | ddmv-assistant.vercel.app | ⚠️ FIX NEEDED |
| unrlvl-ayra | — | ⏳ POR CREAR |

---

## Dependencias críticas

```
NeuroneSCF B2C copy pipeline:
  brand_voice_genome (po_consumer v0.6)
  └─ L1.5 VOICE_GENOME_INJECTION en buildCopyPrompt.ts

  brand_cache_snapshots (v2.0)
  └─ brand-cache-builder EF
  └─ 0 queries en runtime (zero_query mode)

  creative_compatibility_rules
  └─ ❌ NO DEFINIDAS para product_description_b2c
  └─ → creative_seed null en product_description_pack

Meta MCP → meta_accounts → SUPABASE_SERVICE_ROLE_KEY (faltante en Vercel env)
Ayra Sprint 0 → lab_jobs table (pendiente renombrar copylab_jobs)
ImageLab → VercelRequest/VercelResponse + maxDuration (fix documentado en ASYNC_LAB_PIPELINE)
```

---

## Protocolo de archivos — unrlvl-context repo

```
/
├── ecosystem.json                    ← fuente de verdad
├── ecosystem.md                      ← render narrativo (generado)
├── ecosystem_filemap.md              ← este archivo (generado)
├── AGENDA.md                         ← agenda visual (generado)
│
├── infrastructure/                   ← herramientas de infraestructura
│   ├── meta-mcp/
│   │   ├── session_log.md            ← log operativo de sesiones ✅
│   │   └── CONFIG.md                 ← (futuro) env vars, brandId schema
│   ├── shopify-mcp/                  ← (futuro)
│   └── supabase-mcp/                 ← (futuro)
│
├── brands/
│   └── [Marca]/
│       ├── brand.json
│       ├── BP_Brand_Context.md
│       └── session_log.md
│
├── agents/                           ← agentes conversacionales únicamente
│   ├── social-media-agent/
│   │   └── session_log.md
│   ├── ddmv-assistant/
│   └── forumphs-speaks/
│
├── skills/
│   ├── INDEX.md
│   └── [nombre]/SKILL.md
│
├── protocols/
│   ├── SESSION_PROTOCOL.md
│   ├── HRD_PROTOCOL.md
│   └── AYRA_MASTER_PLAN.md
│
└── knowledge/
    └── ecosystem/
        ├── decision-matrix/
        └── professor/
```

**Regla de separación agents/ vs infrastructure/:**
- `agents/` → agentes conversacionales con canal (WhatsApp, web, SMS) — DDMV, ForumPH Speaks, PO Agent
- `infrastructure/` → herramientas de infraestructura técnica — MCPs, proxies, APIs internas
