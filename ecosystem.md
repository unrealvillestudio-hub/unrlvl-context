# UNRLVL Ecosystem — Narrative Reference
**Version:** 2026-05-01 | Auto-generated from ecosystem.json

---

## Studio
**Unrealville Studio** — Brand Intelligence Infrastructure. "Not for everyone."
Owner: Sam | Founder public: Lucien Sael | HQ: 12951 Biscayne Blvd · North Miami, FL 33181
Web: unrealvillestudio.com (LIVE EN+ES) | GitHub: unrealvillestudio-hub

---

## Brands

| Brand | Market | Health | Notes |
|---|---|---|---|
| Diamond Details | Alicante, España | 🟢 | Active |
| Vizos Cosmetics | Miami + España | 🟢 | Active |
| D7 Herbal | Alicante, España | 🟢 | Active |
| Vivose Mask | España | 🟡 | Active |
| Patricia Osorio · Personal | Miami FL | 🟢 | |
| Patricia Osorio · Comunidad | Miami FL | 🟢 | |
| Patricia Osorio · Vizos Salon | Miami FL | 🟢 | |
| Patricia Osorio · Conectando | Miami + LATAM | 🟢 | |
| **NeuroneSCF** | South & Central Florida | 🟡 | B2B OAuth connected · B2C pending |
| ForumPHs | Panamá | 🟢 | Document Factory PROD v1.5 |
| Unrealville Studio | Florida + LATAM | 🟢 | IID pipeline operational |
| Unrealville Stores | Florida USA | 🟢 | |

### NeuroneSCF — Shopify Status
- **B2B:** nj5ybc-n1.myshopify.com · OAuth CONNECTED · Audit PENDING test
- **B2C:** neuronescflorida.com · OAuth PENDING authorization
- **Gaps:** Privacy/Refund/ToS policies · Custom domain · Shipping rates · Payment gateway (B2B invoice model TBD with Patricia)

---

## ShopifyAuditor v3 — COMPLETE
**Objetivo dual:** Gestión interna de tiendas + servicio de lead gen (audit gratuito → oferta de correcciones).
**Diferenciador:** Fix engine demuestra valor en tiempo real. Ninguna agencia Shopify hace esto.

| | |
|---|---|
| **App** | https://unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html |
| **SKILL** | Tools/shopify-auditor/SKILL_shopify-auditor.md |
| **Proxy Claude** | https://unrlvl-tools.vercel.app/api/audit-proxy |
| **Repo** | GitHub/unrealvillestudio-hub/Tools |

### Context Recovery Protocol
- `"shopify audit de [X]"` → carga SKILL + brand context → jala último audit → presenta brief
- `"shopify audit de [dominio externo]"` → carga SKILL → pide 4 datos → corre audit
- `"shopify auditor"` sin tienda → lista tiendas conectadas

### Audit Types
**Technical (100 pts):** 13 módulos. Estructura, configuración, SEO calidad, tema, apps, órdenes, pagos.
**Technical + Strategic (110 pts):** + módulo `strategic_seo`. Keyword coverage, CTA alignment, brand voice. Requiere 7 preguntas de contexto.

### Módulos (13+1)
settings(20) · catalog(20) · seo(10) · strategic_seo(10★) · theme(15) · collections(10) · payments(10) · orders(10) · shipping(5) · discounts(5) · navigation(10) · apps(10) · performance(5) · b2c_vs_b2b(5)
★ Solo cuando strategic_context provided

### Fix Engine
Fixes disponibles (write scopes activos): `inventory_tracking_on` · `seo_title_from_product` · `theme_add_canonical` · `theme_add_og_tags`
En desarrollo: `fix_description_enrich` · `fix_vendor_bulk` · `fix_seo_description` · `fix_theme_json_ld`
**Regla:** siempre confirmación antes de aplicar. Theme edits = snapshot en Supabase primero.

### Claude Brief Feature
App → 📋 Claude Brief → markdown con todos hallazgos + fix payloads JSON → pegar en chat → "fix all critical" → Claude aplica directamente.

### Edge Functions (amlvyycfepwhiindxgzw)
- `shopify-audit v6` — 13 módulos, read_apps real, strategic scoring, save via RPC
- `shopify-fix v1` — 4 fix types con snapshot
- `shopify-store-lookup v1` — lookup por dominio + lista connected
- `shopify-audit-brief v1` — genera brief markdown
- `shopify-oauth v3` — OAuth token capture

### Supabase Schema: shopify.*
Tables: stores · audit_runs · fix_log · theme_snapshots
RPCs: get_shopify_store · get_shopify_store_by_domain · save_shopify_audit_run · get_latest_audit
**CRÍTICO:** Usar RPC para save — .schema('shopify') falla silenciosamente en JS client.

### Tiendas Conectadas
| Brand | Type | Domain | Status |
|---|---|---|---|
| NeuroneSCF | b2b | nj5ybc-n1.myshopify.com | ✅ CONNECTED |
| NeuroneSCF | b2c | neuronescflorida.com | ⏳ OAuth pending |

### Service Design (R4B)
1. Prospect → 7 preguntas estratégicas → audit técnico + estratégico
2. Reporte con score + hallazgos → impacto visible inmediato
3. Oferta: "¿Te hacemos las correcciones?"
4. Fix engine demuestra valor en tiempo real durante presentación
**Pendiente:** intake form (7q) + landing resultado + fix packs pricing

---

## Tools Repo — Patrón Canónico
```
Tools/ (GitHub → unrlvl-tools.vercel.app)
├── api/
│   ├── gh.js              — GitHub proxy para Claude
│   └── audit-proxy.js     — Shopify audit proxy para Claude
├── github-auditor/
│   └── SKILL.md
├── shopify-auditor/
│   ├── shopify_audit.html
│   └── SKILL_shopify-auditor.md
└── historical_context_builder.html
```
**Patrón:** tool en carpeta propia + SKILL.md. Proxies en api/ raíz (Vercel requirement).

---

## IID Network
Status: OPERATIONAL — pipeline end-to-end confirmado 2026-04-26
14 agents · 27 crons · schemas intel.* + content.*
Pipeline: iid-research → iid-process → iid-core → CopyLab → AIFE → ImageLab(skip) → SocialLab
Fix pendiente: ImageLab directo (Gemini + Imagen 3) en content-run-stage v1.11

---

## Labs

| Lab | Status | URL |
|---|---|---|
| CopyLab | LIVE v8.1 | https://unrlvl-copy-lab.vercel.app |
| WebLab | PASSED | — |
| ImageLab | ⚠️ FIX PENDING | https://image-lab-unrlvl.vercel.app |
| AgentLab | PASSED | — |
| BlueprintLab | PASSED | — |
| Orchestrator | OR_1.1 LIVE | https://orchestrator-unrlvl.vercel.app |
| SocialLab | LIVE (bypassed) | https://social-lab-flame.vercel.app |
| VideoLab | PLANNED Fase 2 | — |
| VoiceLab | PLANNED Fase 3 | — |
| AvatarLab | PLANNED Fase 4 | — |
| PodcastLab | PLANNED Fase 5 | — |
| UNRLVL-OPS | LIVE | https://unrlvl-ops.vercel.app |

---

## Infrastructure

| ID | Name | Status |
|---|---|---|
| INFRA-CTX | Context System | https://unrlvl-context.vercel.app |
| INFRA-SB | Supabase amlvyycfepwhiindxgzw | Free plan. Schemas: public + intel + content + shopify |
| INFRA-OPS | UNRLVL-OPS | LIVE — Cost Layer + 8 KPI views |
| INFRA-ORCH | Orchestrator | OR_1.1 LIVE |
| INFRA-CRM | UNRLVL CRM v1.0 | OPERATIVO |
| INFRA-WEB | unrealvillestudio.com | LIVE EN+ES |
| INFRA-LUCIEN | luciensael.com | GENERATED — pending deploy |
| INFRA-TOOLS | unrlvl-tools.vercel.app | LIVE — GitHub Auditor + ShopifyAuditor v3 |

---

## Next Session Agenda
1. **ShopifyAuditor tests** — B2B completo (score, findings, fixer). B2C OAuth + test. Ready4business?
2. **Sales closing design** — intake form 7q + landing + fix packs pricing
3. **IID approval flow** — test piece e75bdb73
4. **ImageLab fix** — GEMINI_API_KEY + v1.11 callImagenDirect()
5. **OAuth social** — Instagram/LinkedIn/TikTok/X
6. Paralelo: Lucien Books Libro 1 · NeuroneSCF B2C · luciensael.com deploy
