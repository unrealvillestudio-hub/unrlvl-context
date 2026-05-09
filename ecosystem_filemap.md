# ECOSYSTEM FILEMAP
_Versión: 2026-05-10-v1 | Mantenido por: Claude_

---

## ESTRUCTURA DEL REPOSITORIO

```
unrlvl-context/
├── ecosystem.json                          ← Fuente de verdad del ecosistema
├── ecosystem.md                            ← Vista legible del ecosistema
├── ecosystem_filemap.md                    ← Este archivo
│
├── brands/
│   ├── NeuroneSCF/
│   │   ├── brand.json                      ← Config técnica de la marca
│   │   ├── BP_Brand_Context.md             ← Brief estratégico completo
│   │   └── session_log.md                  ← Log de sesiones de trabajo
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
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   ├── VivoseMask/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   ├── PatriciaOsorio/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   ├── ForumPHs/
│   │   ├── brand.json
│   │   ├── BP_Brand_Context.md
│   │   └── session_log.md
│   │
│   └── UnrealvilleStudio/
│       ├── brand.json
│       ├── BP_Brand_Context.md
│       └── session_log.md
│
├── agents/
│   └── social-media-agent/
│       └── session_log.md                  ← Log del agente Social Media (Laura/PO/Sam)
│
└── protocols/
    └── SESSION_PROTOCOL.md                 ← Protocolo de actualización de contextos
```

---

## REGLAS DE NOMENCLATURA

**CRÍTICO:** Los archivos deben tener el nombre EXACTO del repo. Un nombre diferente = GitHub Desktop crea archivo nuevo en vez de reemplazar.

| Archivo | Nombre canónico | Ubicación |
|---------|----------------|-----------|
| Contexto de ecosistema | `ecosystem.json` | raíz |
| Vista markdown ecosistema | `ecosystem.md` | raíz |
| Este archivo | `ecosystem_filemap.md` | raíz |
| Config de marca | `brand.json` | `brands/[Marca]/` |
| Brief estratégico | `BP_Brand_Context.md` | `brands/[Marca]/` |
| Log de sesión de marca | `session_log.md` | `brands/[Marca]/` |
| Log agente social | `session_log.md` | `agents/social-media-agent/` |
| Protocolo de sesión | `SESSION_PROTOCOL.md` | `protocols/` |

---

## CÓMO HACER COMMIT CORRECTAMENTE

1. Los archivos de marca van en `brands/[Marca]/`
2. Los archivos de ecosistema van en la raíz
3. El agente va en `agents/social-media-agent/`
4. Los protocolos van en `protocols/`
5. Verificar que GitHub Desktop muestre **modificaciones**, no archivos nuevos
6. Si aparecen como nuevos → el nombre no coincide con el canónico

---
_Regenerado: 2026-05-10_
