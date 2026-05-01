# UNRLVL Ecosystem — File Map
**Version:** 2026-05-01 | Auto-generated from ecosystem.json

---

## unrlvl-context (Vercel: unrlvl-context.vercel.app)
```
/
├── ecosystem.json                          — master context (este archivo)
├── ecosystem.md                            — narrative version
├── ecosystem_filemap.md                    — este archivo
├── TIERS.md                                — pricing tiers
├── protocols/
│   └── SESSION_PROTOCOL.md
├── docs/
│   └── UNRLVL_Labs_Strategy.html
└── brands/
    ├── UnrealvilleStudio/
    │   ├── brand.json
    │   ├── BP_Brand_Context.md
    │   ├── session_log.md
    │   ├── PLAN_MAESTRO_LABS_SKILLS.md
    │   ├── LUCIEN_BOOKS_MASTER.md
    │   └── CRM_INTEGRATIONS.md
    ├── NeuroneSCF/
    │   ├── brand.json
    │   ├── BP_Brand_Context.md
    │   └── session_log.md
    ├── ForumPHs/
    │   ├── brand.json
    │   ├── BP_Brand_Context.md
    │   ├── session_log.md
    │   ├── DOCUMENT_FACTORY_PLAN.md
    │   └── FPHSOPS_SPEC.md
    └── [otros brands]/
```

---

## Tools (GitHub: unrealvillestudio-hub/Tools → unrlvl-tools.vercel.app)
```
/
├── api/
│   ├── gh.js                               — GitHub proxy (Claude → GitHub API)
│   └── audit-proxy.js                      — Shopify audit proxy (Claude → Supabase EFs)
├── github-auditor/
│   └── SKILL.md                            — GitHub auditing skill for Claude
├── shopify-auditor/
│   ├── shopify_audit.html                  — ShopifyAuditor v3 app
│   └── SKILL_shopify-auditor.md            — ShopifyAuditor skill + context recovery protocol
└── historical_context_builder.html         — Context builder tool
```

**URLs:**
- GitHub Auditor: https://unrlvl-tools.vercel.app/github-auditor/SKILL.md
- ShopifyAuditor app: https://unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html
- ShopifyAuditor skill: https://unrlvl-tools.vercel.app/shopify-auditor/SKILL_shopify-auditor.md
- GitHub proxy: https://unrlvl-tools.vercel.app/api/gh
- Audit proxy: https://unrlvl-tools.vercel.app/api/audit-proxy

---

## Supabase (amlvyycfepwhiindxgzw)
```
schemas/
├── public.*          — 50+ tablas generales, RPCs, ops_generation_ledger, brand_context_cache
├── intel.*           — 7 tablas IID (findings, agents, queues, research_raw)
├── content.*         — 5 tablas Content Engine (pieces, jobs, voices, posts)
└── shopify.*         — 4 tablas ShopifyAuditor (stores, audit_runs, fix_log, theme_snapshots)

edge_functions/
├── IID: iid-core v1.1, iid-research v1, iid-process v1, iid-brief-generator v1
├── Content: content-run-stage v1.10, content-dispatcher v2.3, aife-filter v1.1
├── Context: context-cache v4
├── Shopify: shopify-audit v6, shopify-fix v1, shopify-store-lookup v1,
│            shopify-audit-brief v1, shopify-oauth v3
└── Approvals: approve-piece v1.0
```

---

## Vercel Projects
| Project | URL | Repo |
|---|---|---|
| unrlvl-context | unrlvl-context.vercel.app | unrlvl-context |
| tools | unrlvl-tools.vercel.app | Tools |
| orchestrator | orchestrator-unrlvl.vercel.app | orchestrator |
| copy-lab | unrlvl-copy-lab.vercel.app | copy-lab |
| image-lab | image-lab-unrlvl.vercel.app | image-lab |
| social-lab | social-lab-flame.vercel.app | social-lab |
| unrlvl-ops | unrlvl-ops.vercel.app | unrlvl-ops |
| unrlvl-core-project | unrealvillestudio.com | CoreProject |
| forumphs-com | forumphs.com | forumphs-com |
| forumphs-document-factory | — | forumphs-document-factory |
| forumphs-speaks | speaks.forumphs.com | forumphs-speaks |
