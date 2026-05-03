# Unrealville Studio — Ecosystem Filemap
_Versión: 2026-05-03-v1 · Mantenido por Claude_

---

## Estructura del Repositorio `unrlvl-context`

```
unrlvl-context/
├── ecosystem.json                          ← JSON maestro del ecosistema (este archivo es la fuente de verdad)
├── ecosystem.md                            ← Vista legible del ecosistema (generado desde ecosystem.json)
├── ecosystem_filemap.md                    ← Este archivo
│
├── brands/
│   ├── NeuroneSCF/
│   │   ├── brand.json                      ← Config de marca NSCF
│   │   ├── BP_Brand_Context.md             ← Brand Context completo NSCF
│   │   └── session_log.md                  ← Log de sesiones NSCF (entrada más reciente al tope)
│   │
│   ├── DiamondDetails/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   ├── VizosCosmetics/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   ├── D7Herbal/
│   │   ├── brand.json
│   │   └── session_log.md
│   │
│   ├── VivoseMask/
│   │   ├── brand.json
│   │   └── session_log.md
│   │
│   ├── ForumPHs/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   └── PatriciaOsorio/
│       ├── brand.json
│       └── session_log.md
│
├── agents/
│   └── social-media-agent/
│       └── session_log.md                  ← Log del Social Media Agent (Laura/PO/Sam activity)
│
└── protocols/
    └── SESSION_PROTOCOL.md                 ← Protocolo completo de sesiones
```

---

## Reglas de Nomenclatura (CRÍTICAS)

Los archivos de output deben tener el nombre **EXACTO** del archivo en el repo. Si el nombre difiere, GitHub Desktop crea archivos nuevos en vez de reemplazar.

| Archivo | Ruta en repo | Notas |
|---|---|---|
| `session_log.md` | `brands/[Marca]/session_log.md` | Nueva entrada AL TOPE |
| `brand.json` | `brands/[Marca]/brand.json` | |
| `BP_Brand_Context.md` | `brands/[Marca]/BP_Brand_Context.md` | |
| `ecosystem.json` | `/ecosystem.json` | Fuente de verdad |
| `ecosystem.md` | `/ecosystem.md` | Generado desde .json |
| `ecosystem_filemap.md` | `/ecosystem_filemap.md` | Este archivo |
| `SESSION_PROTOCOL.md` | `protocols/SESSION_PROTOCOL.md` | |
| `session_log.md` (agente) | `agents/social-media-agent/session_log.md` | |

**NO usar prefijos de marca** (e.g., `NeuroneSCF_session_log.md` es INCORRECTO).

---

## Rutas de Commit (referencia rápida)

```
brands/NeuroneSCF/session_log.md
brands/NeuroneSCF/brand.json
ecosystem.json
ecosystem.md
ecosystem_filemap.md
agents/social-media-agent/session_log.md
protocols/SESSION_PROTOCOL.md
```

---

## Archivos por Sesión 2026-05-03

Los siguientes archivos cambiaron en esta sesión y deben commitearse:

```
brands/NeuroneSCF/session_log.md     ← Nueva entrada (Social Proof Cards + Collections Fix)
ecosystem.json                        ← Version bump 2026-05-03-v1, Social Proof Agent, B2B 133/160, social_proof completado
ecosystem.md                          ← Regenerado desde ecosystem.json
ecosystem_filemap.md                  ← Actualizado con Social Proof Agent
```
