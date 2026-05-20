# ECOSYSTEM FILEMAP — Unrealville Studio
_Generado desde repo real unrlvl-context · 2026-05-20 · 83 archivos_

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
│   │   └── session_log.md
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
│   │   ├── session_log.md
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
│   ├── IMPLEMENTATION_PLAN_MATRIX_PROFESSOR.md
│   ├── AYRA_MASTER_PLAN.md
│   ├── ECOSYSTEM_AUDIT.md
│   ├── UNRLVL_Ecosystem_Vision.md
│   └── session_log.md
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
│   │   │   └── CHANGELOG.md
│   │   ├── professor/
│   │   │   ├── PROFESSOR_PROTOCOL.md
│   │   │   └── CHECKPOINT_RULES.md
│   │   └── labs/
│   │       └── COPYLAB_NOTES.md
│   ├── platforms/
│   │   ├── agent-browser/MANUAL.md
│   │   ├── claude/mcp/MANUAL.md            ← MCP multi-cuenta (proxy Vercel)
│   │   ├── judge-me/MANUAL.md
│   │   ├── klaviyo/MANUAL.md
│   │   ├── shopify/MANUAL.md
│   │   └── supabase/MANUAL.md              ← NUEVO 2026-05-20
│   └── clients/
│       └── NeuroneSCF/
│           └── PLATFORM_NOTES.md
│
└── api/
    ├── gh.js                               ← GitHub proxy (GH_PAT en env vars)
    ├── brand-cache.js                      ← Brand Cache API
    ├── cf.js
    ├── job-runner.js
    └── lab-invoke.js
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

### Archivos de agentes (`agents/[agente]/`)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `session_log.md` | Estado del agente + historial | Claude · comando Actualiza (via export) |

### Archivos de knowledge (`knowledge/`)
| Carpeta | Contenido |
|---|---|
| `_templates/` | Templates universales (MANUAL_TEMPLATE.md, CASE_TEMPLATE.md) |
| `ecosystem/` | Sistemas internos UNRLVL (Decision Matrix, Professor, Labs) |
| `platforms/` | Herramientas de terceros — un `MANUAL.md` por plataforma |
| `clients/` | Variaciones específicas por marca (`PLATFORM_NOTES.md`) |
| `core-business/` | ⚠️ No existe aún — se crea cuando haya patrones transversales |

---

## NOTAS DE ESTA VERSIÓN (2026-05-20)

**Cambios vs filemap anterior (v8 · 2026-05-13):**
- `knowledge/platforms/supabase/MANUAL.md` — NUEVO
- `knowledge/platforms/claude/mcp/MANUAL.md` — existía, no estaba documentado
- `brands/ForumPHs/` — añadidos `DOCUMENT_FACTORY_PLAN.md` y `FPHSOPS_SPEC.md`
- `brands/Lucien/` — existía, no estaba en el filemap
- `brands/PatriciaOsorioConectando/` — existía, no estaba en el filemap
- `labs/OnboardingApp/session_log.md` — existía, no estaba en el filemap
- `db/` — carpeta existía completa, no estaba en el filemap
- `projects/` — existía, no estaba en el filemap
- `api/` — `cf.js`, `job-runner.js`, `lab-invoke.js` no estaban documentados
- `protocols/session_log.md` — existía, no estaba en el filemap
- `knowledge/core-business/` — NO EXISTE en el repo (pendiente de crear)

---

## REGLA CRÍTICA DE NOMENCLATURA

Los outputs se generan con el nombre **EXACTO** del archivo en el repo, sin prefijos de marca:
- ✅ `session_log.md` · `brand.json` · `ecosystem.json` · `SKILL.md` · `INDEX.md` · `MANUAL.md`
- ❌ `NeuroneSCF_session_log.md` · `supabase_MANUAL.md`

Si el nombre difiere del canónico, GitHub Desktop crea archivos nuevos en vez de reemplazar.

### Rutas de commit
| Tipo | Ruta en repo |
|---|---|
| Archivos de marca | `brands/[Marca]/` |
| Archivos de ecosistema | raíz del repo |
| Archivos de agente | `agents/[agente]/` |
| Protocolos | `protocols/` |
| Skills | `skills/[nombre]/SKILL.md` |
| Index de skills | `skills/INDEX.md` |
| Manuales de plataforma | `knowledge/platforms/[plataforma]/MANUAL.md` |
| Notes de cliente | `knowledge/clients/[Cliente]/PLATFORM_NOTES.md` |
| Knowledge ecosystem | `knowledge/ecosystem/[subcarpeta]/` |

---

_ecosystem_filemap.md · generado desde repo real · 2026-05-20 · 83 archivos_
