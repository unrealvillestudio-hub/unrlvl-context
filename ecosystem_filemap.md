# ECOSYSTEM FILEMAP — Unrealville Studio
_Generado desde ecosystem.json v8 · 2026-05-13_

---

## REPO: unrlvl-context

```
unrlvl-context/
│
├── ecosystem.json                         ← FUENTE DE VERDAD del ecosistema · v8
├── ecosystem.md                           ← Vista legible del ecosystem.json
├── ecosystem_filemap.md                   ← Este archivo
├── AGENDA.md                              ← Tareas activas por prioridad
│
├── brands/
│   ├── NeuroneSCF/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md                 ← Última actualización: 2026-05-13
│   ├── DiamondDetails/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   ├── VizosCosmetics/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   ├── D7Herbal/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   ├── VivoseMask/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   ├── PatriciaOsorioPersonal/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   ├── ForumPHs/
│   │   ├── brand.json
│   │   └── BP_Brand_Context.md
│   └── UnrealvilleStudio/
│       ├── brand.json
│       ├── BP_Brand_Context.md
│       ├── PLAN_MAESTRO_Q2Q3_2026.md      ← Plan operativo 15 semanas · v2.0
│       ├── UNRLVL_AGENT_INFRASTRUCTURE_PLAN.md
│       └── PARTNERSHIP_STRUCTURE_SAM_PO.md
│
├── agents/
│   ├── social-media-agent/
│   │   └── session_log.md                 ← Export SMA · última actualización: 2026-05-13
│   └── ddmv-assistant/
│       └── session_log.md
│
├── protocols/
│   ├── SESSION_PROTOCOL.md                ← Protocolo de sesión v10
│   ├── AYRA_MASTER_PLAN.md                ← Plan maestro Ayra · v3.3 · 2026-05-13
│   ├── AYRA_DECISION_FRAMEWORK.md         ← [PENDIENTE — Sprint 1]
│   ├── AYRA_SPRINT_LOG.md                 ← [PENDIENTE — Sprint 1]
│   └── AYRA_MCP_SPEC.md                   ← [PENDIENTE — Sprint 6]
│
├── skills/
│   ├── INDEX.md                           ← Tabla de decisión de skills · v1.1
│   ├── shopify-auditor/
│   │   └── SKILL.md
│   ├── shopify-mcp/
│   │   └── SKILL.md
│   ├── ui-ux-layer/
│   │   └── SKILL.md
│   ├── content-pipeline/
│   │   └── SKILL.md
│   ├── agent-builder/
│   │   └── SKILL.md
│   ├── copylab-reference/
│   │   └── SKILL.md
│   ├── image-processing/
│   │   └── SKILL.md
│   ├── cost-layer/
│   │   └── SKILL.md
│   ├── security/
│   │   └── SKILL.md
│   ├── github-auditor/
│   │   └── SKILL.md
│   ├── vercel/
│   │   └── SKILL.md
│   ├── ads-mcp/
│   │   └── SKILL.md
│   ├── higgsfield/
│   │   └── SKILL.md
│   ├── agent-browser/
│   │   └── SKILL.md
│   └── ecosystem-auditor/                 ← NUEVO · v1.0 · 2026-05-13
│       └── SKILL.md
│
└── api/
    ├── gh.ts                              ← GitHub proxy (PAT en env vars)
    ├── brand-cache.ts                     ← Brand Cache API
    └── ecosystem-health.ts               ← [PENDIENTE — Ayra Sprint 1]
```

---

## ARCHIVOS CANÓNICOS POR TIPO

### Archivos de marca (brands/[Marca]/)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `brand.json` | Config de marca: IDs, URLs, estado, metadatos | Claude en sesión |
| `BP_Brand_Context.md` | Brand Platform completo | Claude en sesión |
| `session_log.md` | Historial de trabajo por marca | Claude al cierre de sesión |

### Archivos de ecosistema (raíz)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `ecosystem.json` | Fuente de verdad del ecosistema | Claude · comando Actualiza |
| `ecosystem.md` | Vista legible del JSON | Claude · regenerar cuando cambia JSON |
| `ecosystem_filemap.md` | Este archivo | Claude · regenerar cuando cambia estructura |
| `AGENDA.md` | Tareas activas priorizadas | Claude · comando Actualiza |

### Archivos de protocolo (protocols/)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `SESSION_PROTOCOL.md` | Protocolo completo de sesión | Sam + Claude |
| `AYRA_MASTER_PLAN.md` | Plan maestro Ayra + MCP | Claude · versiones incrementales |
| `AYRA_SPRINT_LOG.md` | Registro de avance por sprint | Claude · al cierre de cada sprint |

### Archivos de agentes (agents/[agente]/)
| Archivo | Contenido | Quién lo actualiza |
|---|---|---|
| `session_log.md` | Estado del agente + historial | Claude · comando Actualiza (via export) |

---

## REGLA CRÍTICA DE NOMENCLATURA

Los outputs se generan con el nombre **EXACTO** del archivo en el repo, sin prefijos de marca:
- ✅ `session_log.md` · `brand.json` · `ecosystem.json` · `SKILL.md` · `INDEX.md`
- ❌ `NeuroneSCF_session_log.md` · `nscf_brand.json`

Si el nombre difiere del canónico, GitHub Desktop crea archivos nuevos en vez de reemplazar.

### Rutas de commit
| Tipo | Ruta en repo |
|---|---|
| Archivos de marca | `brands/[Marca]/` |
| Archivos de ecosistema | raíz del repo |
| Archivos de agente | `agents/[agente]/` |
| Protocolos | `protocols/` |
| Skills | `skills/[nombre]/` (con nombre canónico SKILL.md) |
| Index de skills | `skills/INDEX.md` |

---

_ecosystem_filemap.md · generado desde ecosystem.json v8 · 2026-05-13_
