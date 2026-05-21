# ECOSYSTEM FILEMAP — Unrealville Studio
_Generado desde repo real unrlvl-context · 2026-05-21 · 91 archivos_

---

## REPO: unrlvl-context

```
unrlvl-context/
│
├── ecosystem.json                                        ← FUENTE DE VERDAD del ecosistema
├── ecosystem.md                                          ← Vista legible del ecosystem.json
├── ecosystem_filemap.md                                  ← Este archivo
├── AGENDA.md                                             ← Tareas activas por prioridad
├── TIERS.md                                              ← Pricing (cargar con prospectos)
│
├── brands/
│   ├── ForumPHs/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   ├── DOCUMENT_FACTORY_PLAN.md
│   │   ├── FPHSOPS_SPEC.md
│   │   └── session_log.md
│   ├── Lucien/
│   │   └── BP_Brand_Person_id.md
│   ├── NeuroneSCF/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   ├── PO_VOICE_ARTICLES.md
│   │   ├── SHOPIFY_ARCHITECTURE.md
│   │   └── session_log.md                               ← Sprint CopyLab async activo
│   ├── PatriciaOsorioConectando/
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   ├── Unrealville/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   ├── UnrealvilleStudio/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   ├── CRM_INTEGRATIONS.md
│   │   ├── LUCIEN_BOOKS_MASTER.md
│   │   ├── PARTNERSHIP_STRUCTURE_SAM_PO.md
│   │   ├── UNRLVL_AGENT_INFRASTRUCTURE_PLAN.md
│   │   ├── partnership_po_presentation.html
│   │   ├── session_log.md                               ← Context/ecosistema session log
│   │   └── docs/
│   │       ├── PLAN_MAESTRO_LABS_SKILLS.md
│   │       └── UNRLVL_Labs_Strategy.html
│   └── VizosCosmetics/
│       ├── brand.json
│       └── session_log.md
│
├── agents/
│   ├── social-media-agent/
│   │   └── session_log.md
│   └── ddmv-assistant/
│       └── session_log.md
│
├── labs/
│   └── OnboardingApp/
│       └── session_log.md
│
├── db/
│   ├── DB_VARIABLES_audit_summary.md
│   ├── SESSION_HANDOFF.md
│   ├── UNRLVL_Supabase_Schema.md
│   └── seed_phase1.sql
│
├── projects/
│   └── FinancialIntelligenceEngine.json
│
├── protocols/
│   ├── SESSION_PROTOCOL.md
│   ├── HRD_PROTOCOL.md
│   ├── IMPLEMENTATION_PLAN_MATRIX_PROFESSOR.md
│   ├── AYRA_MASTER_PLAN.md
│   ├── ECOSYSTEM_AUDIT.md
│   ├── UNRLVL_Ecosystem_Vision.md
│   └── session_log.md                                   ← UNRLVL-OPS legacy (Mar 2026)
│
├── skills/
│   ├── INDEX.md
│   ├── ads-mcp/SKILL.md
│   ├── agent-browser/SKILL.md
│   ├── agent-builder/SKILL.md
│   ├── content-pipeline/SKILL.md
│   ├── copylab-reference/SKILL.md
│   ├── cost-layer/SKILL.md
│   ├── ecosystem-auditor/SKILL.md
│   ├── github-auditor/SKILL.md
│   ├── higgsfield/SKILL.md
│   ├── image-processing/SKILL.md
│   ├── security/SKILL.md
│   ├── shopify-auditor/SKILL.md
│   ├── shopify-mcp/SKILL.md
│   ├── ui-ux-layer/SKILL.md
│   └── vercel/SKILL.md
│
├── knowledge/
│   ├── _templates/
│   │   ├── MANUAL_TEMPLATE.md
│   │   └── CASE_TEMPLATE.md
│   ├── ecosystem/
│   │   ├── decision-matrix/
│   │   │   ├── DECISION_MATRIX.md
│   │   │   ├── QA_RULES.md
│   │   │   └── CHANGELOG.md
│   │   ├── professor/
│   │   │   ├── PROFESSOR_PROTOCOL.md
│   │   │   ├── CHECKPOINT_RULES.md
│   │   │   ├── HRD_REMINDERS.md
│   │   │   └── SKILL_GAPS.md
│   │   └── labs/
│   │       └── COPYLAB_NOTES.md
│   ├── platforms/
│   │   ├── agent-browser/MANUAL.md
│   │   ├── claude/mcp/MANUAL.md            ← MCP custom: receta Vercel sin Next.js
│   │   ├── html-js/
│   │   │   ├── ENCODING_PITFALLS.md
│   │   │   └── MOBILE_CSS_PATTERNS.md
│   │   ├── judge-me/MANUAL.md
│   │   ├── klaviyo/MANUAL.md
│   │   ├── shopify/MANUAL.md
│   │   └── supabase/
│   │       ├── MANUAL.md
│   │       └── EDGE_FUNCTIONS_PATTERNS.md
│   └── clients/
│       └── NeuroneSCF/
│           └── PLATFORM_NOTES.md
│
└── api/
    ├── gh.js                               ← GitHub proxy (GH_PAT en env vars)
    ├── brand-cache.js                      ← Brand Cache API
    ├── cf.js
    ├── job-runner.js
    ├── lab-invoke.js
    └── professor.js                        ← Professor proxy ✅ LIVE 2026-05-20
```

---

## ARCHIVOS CANÓNICOS POR TIPO

### Archivos de marca (`brands/[Marca]/`)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `brand.json` | Config: IDs, URLs, estado, metadatos | Claude en sesión |
| `BP_Brand_Context.md` | Brand Platform completo | Claude en sesión |
| `session_log.md` | Historial de trabajo por marca | Claude al cierre de sesión |

### Archivos de ecosistema (raíz)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `ecosystem.json` | Fuente de verdad del ecosistema | Claude · comando Actualiza |
| `ecosystem.md` | Vista legible del JSON | Claude · regenerar cuando cambia JSON |
| `ecosystem_filemap.md` | Este archivo | Claude · regenerar cuando cambia estructura |
| `AGENDA.md` | Tareas activas priorizadas | Claude · comando Actualiza |

### Session logs por contexto
| Ruta | Propósito |
|---|---|
| `brands/UnrealvilleStudio/session_log.md` | **Context/ecosistema** — infra, herramientas, cambios transversales |
| `brands/[Marca]/session_log.md` | Sprint activo de esa marca |
| `agents/[agente]/session_log.md` | Estado del agente |
| `protocols/session_log.md` | UNRLVL-OPS legacy |

---

## NOTAS DE ESTA VERSIÓN (2026-05-21)

**Cambios vs filemap anterior (2026-05-20):**
- `brands/UnrealvilleStudio/session_log.md` — nueva entrada 2026-05-21 (CopyLab async + MCP)
- `brands/NeuroneSCF/session_log.md` — sprint CopyLab async activo
- `knowledge/platforms/claude/mcp/MANUAL.md` — receta MCP custom Vercel documentada
- Aclaración: `protocols/session_log.md` es UNRLVL-OPS legacy (Mar 2026), no el context log activo
- knowledge/ecosystem/professor/ — añadidos HRD_REMINDERS.md y SKILL_GAPS.md
- knowledge/platforms/supabase/ — EDGE_FUNCTIONS_PATTERNS.md añadido
- knowledge/platforms/html-js/ — carpeta con dos archivos documentada

**Infra nueva 2026-05-21:**
- `unrlvl-supabase-mcp` (prj_svtqNxIlwRvzMFYKmnOCAyK7GcQP) — MCP custom para amlvyycfepwhiindxgzw

---

## REGLA CRÍTICA DE NOMENCLATURA

Los outputs se generan con el nombre **EXACTO** del archivo en el repo, sin prefijos de marca:
- ✅ `session_log.md` · `brand.json` · `ecosystem.json` · `SKILL.md` · `INDEX.md` · `MANUAL.md`
- ❌ `NeuroneSCF_session_log.md` · `supabase_MANUAL.md`

### Rutas de commit
| Tipo | Ruta en repo |
|---|---|
| Context/ecosistema session log | `brands/UnrealvilleStudio/session_log.md` |
| Archivos de marca | `brands/[Marca]/` |
| Archivos de ecosistema | raíz del repo |
| Agentes | `agents/[agente]/` |
| Protocolos | `protocols/` |
| Skills | `skills/[nombre]/SKILL.md` |
| Manuales de plataforma | `knowledge/platforms/[plataforma]/MANUAL.md` |
| Notes de cliente | `knowledge/clients/[Cliente]/PLATFORM_NOTES.md` |

---

_ecosystem_filemap.md · generado desde repo real · 2026-05-21 · 91 archivos_
