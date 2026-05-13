# ECOSYSTEM FILEMAP
_Versión: 2026-05-13-v4 | Mantenido por: Claude_

---

## ESTRUCTURA COMPLETA DEL REPOSITORIO

```
unrlvl-context/
│
├── ecosystem.json                          ← Fuente de verdad del ecosistema
├── ecosystem.md                            ← Vista legible (derivada del JSON)
├── ecosystem_filemap.md                    ← Este archivo
├── AGENDA.md                               ← Agenda visual de pendientes (derivada del JSON)
├── TIERS.md                                ← Pricing UNRLVL (referencia para Profiler Agent)
│
├── skills/
│   ├── INDEX.md                            ← Tabla de decisión de skills (carga siempre)
│   ├── CONTENT_PIPELINE_SKILLS.md          ← Pipeline IID + contenido cross-brand
│   ├── github-auditor/SKILL.md             ← GitHub proxy — repos privados
│   ├── shopify-auditor/SKILL.md            ← Servicio UNRLVL audit+fix · multimarca
│   ├── shopify-mcp/SKILL.md                ← Conector MCP propio · Supabase-powered
│   ├── ui-ux-layer/SKILL.md                ← Identidad visual · CSS vars · herencia B2C/B2B
│   ├── aife/SKILL.md                       ← AI Footprint Eraser · todo output público
│   ├── agent-builder/SKILL.md              ← Patrones deployment agentes
│   ├── copylab-reference/SKILL.md          ← CopyLab templates · canales · BP_COPY
│   ├── image-processing/SKILL.md           ← ImageLab · LoRA prep · Fal.ai
│   ├── cost-layer/SKILL.md                 ← Token tracking · márgenes · OPS
│   ├── security/SKILL.md                   ← RLS · secrets · checklist pre-deploy
│   ├── vercel/SKILL.md                     ← Infra base · fetch · GitHub proxy
│   ├── ads-mcp/SKILL.md                    ← Meta Ads + TikTok Ads MCP
│   ├── higgsfield/SKILL.md                 ← Image+Video MCP · Soul · 30+ modelos
│   ├── agent-browser/SKILL.md             ← Browser automation · Vercel Labs
│   └── compliance/                         ← PLANNED Sprint 6
│       ├── SKILL.md                        ← Compliance Guardian knowledge base
│       ├── meta-ads-policies.md
│       ├── google-ads-policies.md
│       ├── tiktok-ads-policies.md
│       ├── prohibited-categories.md
│       ├── restricted-categories.md
│       ├── appeal-protocols/
│       │   ├── meta-appeal-playbook.md
│       │   ├── google-appeal-playbook.md
│       │   └── tiktok-appeal-playbook.md
│       └── case-library/                   ← Crece con cada caso resuelto
│
├── brands/
│   ├── NeuroneSCF/
│   │   ├── brand.json
│   │   ├── SHOPIFY_ARCHITECTURE.md
│   │   ├── NeuroneSCF_session_log.md       ← Log legacy (referencia histórica)
│   │   └── session_log.md                  ← Log activo
│   ├── ForumPHs/
│   │   ├── brand.json · BP_Brand_Context.md
│   │   ├── DOCUMENT_FACTORY_PLAN.md · FPHSOPS_SPEC.md
│   │   └── session_log.md
│   ├── Lucien/
│   │   └── BP_Brand_Person_id.md
│   ├── PatriciaOsorioConectando/
│   │   ├── BP_Brand_Context.md · session_log.md
│   │   └── personal_voice_PO.md            ← PENDING · crear con Patricia
│   ├── VizosCosmetics/
│   │   ├── brand.json · session_log.md
│   ├── Unrealville/                        ← Alias UnrealvilleStudio
│   │   ├── BP_Brand_Context.md · brand.json
│   └── UnrealvilleStudio/
│       ├── brand.json · BP_Brand_Context.md · session_log.md
│       ├── PLAN_MAESTRO_LABS_SKILLS.md
│       ├── PARTNERSHIP_STRUCTURE_SAM_PO.md
│       ├── CRM_INTEGRATIONS.md
│       ├── LUCIEN_BOOKS_MASTER.md
│       ├── UNRLVL_AGENT_INFRASTRUCTURE_PLAN.md  ← NUEVO · 2026-05-13
│       └── docs/UNRLVL_Labs_Strategy.html
│
├── agents/
│   ├── social-media-agent/
│   │   └── session_log.md                  ← Actualizado 2026-05-13
│   ├── ddmv-assistant/
│   │   ├── session_log.md
│   │   └── skills/
│   │       ├── persona.md                  ← PENDING · tono bloqueado · Sprint 1
│   │       └── personal_voice_DDMV.md      ← PENDING · Sprint 1
│   ├── po-faq-appointments/                ← PLANNED · Sprint 2
│   │   └── agent.json
│   ├── forumph-ops/                        ← PLANNED · Sprint 3
│   │   └── agent.json
│   └── compliance-guardian/               ← PLANNED · Sprint 6
│       └── agent.json
│
├── labs/
│   ├── OnboardingApp/session_log.md
│   ├── AgentLab/                           ← PLANNED · Sprint 4
│   │   └── session_log.md
│   └── VoiceLab/                           ← PLANNED · Sprint 5
│       └── session_log.md
│
├── projects/
│   └── FinancialIntelligenceEngine.json
│
├── db/
│   ├── UNRLVL_Supabase_Schema.md
│   ├── DB_VARIABLES_audit_summary.md
│   ├── SESSION_HANDOFF.md
│   └── seed_phase1.sql
│
├── protocols/
│   ├── SESSION_PROTOCOL.md
│   ├── ECOSYSTEM_AUDIT.md
│   ├── UNRLVL_Ecosystem_Vision.md
│   └── session_log.md
│
└── api/
    ├── gh.js                               ← GitHub proxy
    └── cf.js                               ← Cloudflare proxy
```

---

## REPOS EXTERNOS RELACIONADOS

```
unrealvillestudio-hub/ (GitHub org)
│
├── unrlvl-context/                         ← Este repo
├── unrlvl-social-media-agent/              ← SMA · operativo
├── unrlvl-shopify-mcp/                     ← Shopify MCP · operativo
├── unrlvl-tools/                           ← ShopifyAuditor v3.5 · operativo
├── unrlvl-agent-template/                  ← PLANNED · Sprint 0 · repo base canónico
└── unrlvl-voicelab/                        ← PLANNED · Sprint 5
```

---

## REGLAS DE NOMENCLATURA

**CRÍTICO:** Nombre EXACTO del repo. Diferente = GitHub Desktop crea archivo nuevo.

| Archivo | Nombre canónico | Ubicación |
|---------|----------------|-----------|
| Fuente de verdad | `ecosystem.json` | raíz |
| Vista narrativa | `ecosystem.md` | raíz |
| Este archivo | `ecosystem_filemap.md` | raíz |
| Agenda visual | `AGENDA.md` | raíz |
| Pricing | `TIERS.md` | raíz |
| Skills index | `INDEX.md` | `skills/` |
| Skill individual | `SKILL.md` | `skills/[nombre]/` |
| Config de marca | `brand.json` | `brands/[Marca]/` |
| Brief estratégico | `BP_Brand_Context.md` | `brands/[Marca]/` |
| Log de sesión | `session_log.md` | `brands/[Marca]/` o `agents/[nombre]/` |
| Protocolo | `SESSION_PROTOCOL.md` | `protocols/` |
| Spec de agente | `agent.json` | `agents/[nombre]/` |
| Voz personal | `personal_voice_[ID].md` | `agents/[nombre]/skills/` o `brands/[Marca]/` |
| Infra plan | `UNRLVL_AGENT_INFRASTRUCTURE_PLAN.md` | `brands/UnrealvilleStudio/` |

---

## CÓMO HACER COMMIT CORRECTAMENTE

1. Skills → `skills/[nombre]/SKILL.md` (crear subcarpeta si es nueva)
2. Index → `skills/INDEX.md`
3. Marcas → `brands/[Marca]/`
4. Agentes → `agents/[nombre]/`
5. Labs → `labs/[nombre]/`
6. Protocolos → `protocols/`
7. Ecosistema y agenda → raíz
8. GitHub Desktop debe mostrar **modificaciones**, no archivos nuevos

---
_Regenerado: 2026-05-13 · 60+ archivos mapeados_
