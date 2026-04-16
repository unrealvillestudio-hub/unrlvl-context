# Ecosystem Filemap — unrlvl-context
_Mapa canónico de archivos · Regenerado: 2026-04-16 · Claude Opus 4.7_
_Fuente: ecosystem.json v2026-04-16c_

---

## RAÍZ DEL REPO (archivos de ecosistema)

| Archivo | Propósito |
|---|---|
| `ecosystem.json` | Fuente canónica máquina-readable del estado del ecosistema |
| `ecosystem.md` | Narrativa human-readable del ecosistema (regenerada desde JSON) |
| `ecosystem_filemap.md` | Este archivo — mapa de estructura del repo |

---

## PROTOCOLS

`protocols/`
- `SESSION_PROTOCOL.md` — Protocolo de actualización de contextos, comandos (Actualiza, protocolo actualización), reglas de nomenclatura

---

## AGENTS

`agents/social-media-agent/`
- `session_log.md` — Log de sesiones del SMA · consumido por chat.js vía fetchAgentContext() · última regeneración 2026-04-16

---

## BRANDS

### brands/UnrealvilleStudio/
- `brand.json` — Schema v1.2 del BP_BRAND UNRLVL
- `BP_Brand_Context.md` — Contexto de marca generado desde BluePrints/brands/Unrealville/
- `session_log.md` — Log de sesiones del estudio · novedades al tope
- `PLAN_MAESTRO_LABS_SKILLS.md` — Referencia profunda plan maestro
- `CRM_INTEGRATIONS.md` — Documentación CRM integrations

### brands/PatriciaOsorioConectando/
- `BP_Brand_Context.md` — BP_BRAND v1.0 DEFINITIVO
- `brand.json` — (si presente)

### brands/PatriciaOsorioPersonal/
- Archivos de marca personal PO

### brands/PatriciaOsorioComunidad/
- Archivos de marca personal PO

### brands/PatriciaOsorioVizosSalon/
- Archivos de marca personal PO

### brands/NeuroneSCF/
- `brand.json`
- `BP_Brand_Context.md`
- `session_log.md`

### brands/ForumPHs/
- `brand.json`
- `BP_Brand_Context.md`
- `session_log.md`
- `FPHSOPS_SPEC.md` — Spec funcional FPHs-OPS
- `DOCUMENT_FACTORY_PLAN.md` — Plan evolución Document Factory

### brands/DiamondDetails/
- Archivos de marca

### brands/VizosCosmetics/
- Archivos de marca

### brands/D7Herbal/
- Archivos de marca

### brands/VivoseMask/
- Archivos de marca

### brands/UnrealvilleStores/
- Archivos de marca e-commerce

---

## CANONICAL URL PREFIX

Todos los archivos son accesibles vía:
```
https://unrlvl-context.vercel.app/{path}
```

Ejemplo: `https://unrlvl-context.vercel.app/brands/UnrealvilleStudio/session_log.md`

---

## REGLAS DE NOMENCLATURA (CRÍTICAS)

Cuando se generan outputs para commitear al repo:
- `session_log.md` — nombre EXACTO, no `unrealville_session_log.md` ni similar
- `brand.json` — nombre EXACTO
- `ecosystem.json` — nombre EXACTO
- `ecosystem.md` — nombre EXACTO
- `ecosystem_filemap.md` — nombre EXACTO
- `BP_Brand_Context.md` — nombre EXACTO
- `SESSION_PROTOCOL.md` — nombre EXACTO

Si el nombre difiere del canónico, GitHub Desktop crea archivos nuevos en vez de reemplazar — esto es un error.

**Rutas en el repo:**
- Archivos de ecosistema → raíz
- Archivos de marca → `brands/[Marca]/`
- Agente → `agents/social-media-agent/`
- Protocolos → `protocols/`

---

## ÚLTIMA REGENERACIÓN

**2026-04-16** — Regenerado tras deploy Profiler Agent v6 y actualización session_log SMA con progreso Laura Meta BM Neurone SCF.
