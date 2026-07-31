# CLAUDE.md — unrlvl-context
_Contexto persistente para Claude Code. No editar manualmente._

---

## ⛔ GOBERNANZA CC — NIVEL CRÍTICO (leer ANTES de tocar nada)

Antes de cualquier acción en este repositorio, Claude Code DEBE cargar y obedecer el protocolo central:
**`https://unrlvl-context.vercel.app/protocols/CC_PROTOCOL.md`** (cargar con `Vercel:web_fetch_vercel_url` o `curl`).

**Este repo es CRÍTICO — el sistema nervioso del ecosistema. Reglas reforzadas:**

1. **CC nunca pushea a `main` ni mergea en este repo.** CC SÍ puede crear una rama,
   commitear, pushear esa rama y abrir un PR contra `main` — ese es el flujo estándar
   (ver `protocols/CC_PROTOCOL.md` → "Flujo de entrega de context files"). Nada entra
   a `main` sin que Sam revise el PR, lo mergee y borre la rama. Prohibido: push directo
   a `main`, merge de PRs, y `api/gh-write` sobre este repo.

2. **CONTEXT FILES NUNCA SE REEMPLAZAN.** Se actualizan preservando historia: lo nuevo al tope, lo anterior archivado debajo bajo `## ARCHIVO HISTÓRICO`, nunca borrado. Aplica a TODO `.json`/`.md` de este repo (ecosystem.json, brand.json, session_log, AGENDA, protocolos, etc.). Antes de proponer cualquier cambio: verificar que el diff solo AÑADE, no BORRA historia.

3. **VERIFICAR ANTES DE ACTUAR:** mensaje corto a Sam con objetivo, pasos, archivos y repos afectados antes de cualquier acción. Reportar al final con el formato de CC_PROTOCOL (incluida la sección PRESERVACIÓN DE CONTEXTO).

Ante cualquier duda → preguntar a Sam, no asumir. Un error aquí rompe Professor, brand-cache y gh-proxy de todo el ecosistema.

---

## Qué es este repo
`unrlvl-context` es el **sistema nervioso central** del ecosistema UNRLVL. Es el repo que mantiene el estado completo del ecosistema, sirve como proxy seguro a GitHub, aloja el sistema Professor, y provee el brand-cache API. Todo el ecosistema depende de él.

**URL producción:** https://unrlvl-context.vercel.app  
**Vercel project:** prj_AmE4qTy4WoLAdreRQtXyzXLQHl54  
**Framework:** Next.js / Vercel Serverless Functions  
**Criticidad:** CRÍTICO — si cae, Professor, brand-cache fallback, y gh-proxy fallan

---

## APIs del sistema

### `api/gh.js` — GitHub Proxy (READ)
Lee archivos de repos privados de `unrealvillestudio-hub` usando `GH_PAT` env var (nunca expuesto en chat).
```
GET /api/gh?action=repos                              → lista todos los repos del org
GET /api/gh?action=tree&repo=REPO_NAME&branch=BRANCH  → árbol completo del repo
GET /api/gh?action=file&repo=REPO_NAME&path=/PATH     → contenido de archivo
```
> ⚠️ Siempre usar `Vercel:web_fetch_vercel_url` para llamar estas URLs — nunca `web_fetch`.

### `api/gh-write.js` — GitHub Proxy (WRITE)
Push de archivos a repos. Requiere PAT adicional del usuario en el chat (no env var).
```
POST /api/gh-write { repo, path, content, message, sha? }
```

### `api/brand-cache.js` — Brand Cache Fallback
Fallback cuando `brand_cache_snapshots` no tiene snapshot v2.0.
```
GET /api/brand-cache?brand_id=BRAND_ID → brand context JSON (consultas directas a Supabase)
```
CopyLab lo llama como segundo fallback (primero intenta `brand_cache_snapshots`).

### `api/professor.js` — Professor System
Interface para el sistema de learnings del ecosistema.
```
POST /api/professor { action: 'get_context' | 'log_case' | 'submit_learning' | ... }
```
Proxy hacia EFs de Professor en Supabase:
- `professor-get-context` — learnings aprobados por categoría
- `professor-log-case` — registrar nuevo caso/learning
- `professor-submit-learning` — enviar learning para aprobación
- `professor-checkpoint` — checkpoint automático
- `professor-approve-learning` — aprobar/rechazar learnings
- `professor-evaluate-decision` — evaluar una decisión

### `api/lab-invoke.js` — Lab Invocador
Invoca labs del ecosistema directamente.

### `api/job-runner.js` — Job Runner
Runner de jobs del ecosistema.

### `api/cf.js` — Cloudflare proxy
Proxy para operaciones Cloudflare.

---

## Archivos del ecosistema (raíz del repo)

### Archivos críticos — NO editar sin regenerar todo
| Archivo | Descripción | Mantener via |
|---|---|---|
| `ecosystem.json` | Estado completo del ecosistema — brands, labs, infra, EFs, agenda | HRD_ACTUALIZA |
| `ecosystem.md` | Versión legible de ecosystem.json | Regenerar con ecosystem.json |
| `ecosystem_filemap.md` | Mapa de todos los archivos del ecosistema | Regenerar con ecosystem.json |
| `ecosystem_graph.json` | Grafo de nodos y edges del ecosistema (ground truth from code audit) | Sesiones de auditoría |
| `AGENDA.md` | Agenda de próximas sesiones priorizada | HRD_ACTUALIZA |

### Estructura de brands
```
brands/
  NeuroneSCF/
    session_log.md          ← Log de sesiones (actualizar con HRD_ACTUALIZA)
    brand.json              ← Config de la marca
    BP_Brand_Context.md     ← Brand context completo
    SHOPIFY_ARCHITECTURE.md ← Arquitectura Shopify de NSCF
    PO_VOICE_ARTICLES.md    ← Voz de Patricia para artículos
  UnrealvilleStudio/
    session_log.md
    brand.json
    BP_Brand_Context.md
    docs/
      PLAN_MAESTRO_LABS_SKILLS.md
  ForumPHs/
    session_log.md
    brand.json
    BP_Brand_Context.md
  ... (otras marcas)
```

### Skills
```
skills/
  INDEX.md                  ← Índice de todos los skills disponibles
  github-auditor/SKILL.md   ← Cómo auditar repos via proxy
  ecosystem-auditor/SKILL.md← Cómo auditar el ecosistema completo
  content-pipeline/SKILL.md ← Pipeline de contenido
  shopify-mcp/SKILL.md      ← Shopify MCP operations
  shopify-auditor/SKILL.md  ← Auditorías Shopify
  security/SKILL.md         ← Seguridad
  vercel/SKILL.md           ← Vercel operations
  ... (más skills)
```

### Protocols
```
protocols/
  SESSION_PROTOCOL.md       ← Protocolo de sesión (HRD_PROTOCOLO_ACTUALIZACION, etc.)
  HRD_PROTOCOL.md           ← Protocolo HRD completo
  CC_PROTOCOL.md            ← Protocolo de Claude Code (gobernanza CC)
  ECOSYSTEM_AUDIT.md        ← Protocolo de auditoría
  AYRA_MASTER_PLAN.md       ← Plan maestro Ayra
  ...
```

### Knowledge base
```
knowledge/
  platforms/
    shopify/MANUAL.md       ← Patterns Shopify específicos del ecosistema
    supabase/MANUAL.md      ← Patterns Supabase
    meta/MANUAL.md          ← Patterns Meta API
    klaviyo/MANUAL.md       ← Patterns Klaviyo
    ...
  ecosystem/
    professor/              ← Reglas Professor
    decision-matrix/        ← Matriz de decisiones
```

---

## Variables de entorno (Vercel)
```
GH_PAT                       ← GitHub Personal Access Token (read) para api/gh.js
SUPABASE_URL                 ← https://amlvyycfepwhiindxgzw.supabase.co
SUPABASE_SERVICE_ROLE_KEY    ← Para professor y brand-cache
```

---

## Conexiones con el ecosistema
- **Es consultado por:** Claude.ai (vía `Vercel:web_fetch_vercel_url`), CopyLab (brand-cache fallback), Social Media Agent (api/export)
- **Lee de:** GitHub org `unrealvillestudio-hub` (via GH_PAT), Supabase (professor_learnings, brand data)
- **Escribe en:** GitHub repos (via api/gh-write.js con PAT del usuario)
- **Sirve a:** Professor system, brand-cache, gh-proxy para todo el ecosistema

---

## Reglas de trabajo en este repo

### HRD_ACTUALIZA — qué archivos tocar
Al ejecutar `Actualiza`, los archivos que pueden cambiar:
1. `brands/MARCA/session_log.md` — siempre
2. `ecosystem.json` — si cambió algún estado del ecosistema
3. `AGENDA.md` — si cambió la agenda
4. `ecosystem.md` + `ecosystem_filemap.md` — si cambió ecosystem.json

### Naming de archivos — EXACTO
Los nombres deben ser exactamente como están en el repo:
- `session_log.md` (no `session-log.md` ni `SessionLog.md`)
- `ecosystem.json` (no `ecosystem-v2.json`)
- `brand.json` (no `brand-config.json`)

### Secretos en archivos
**NUNCA incluir en ningún archivo del repo:**
- Tokens reales (`shpat_`, `shpss_`, `atkn_`, etc.)
- API keys
- Service Account JSON
- Passwords

Si un token debe mencionarse, usar `[token en Supabase — no exponer en repo]` o similar.

### Commits
Formato estándar: `chore: session update YYYY-MM-DD-vN`

---

## Estado actual (2026-07-31)
- ✅ LIVE — todos los endpoints operacionales
- ✅ `ecosystem.json` **v2026-07-31-v1** — instrumentación de costo end-to-end (capa `ops_*`, 16 migraciones M-0..M-16); desvío `buildFromGenome` marcado ⚠️ DESVIACIÓN (ver `labs._note` / `labs_wiring`)
- ✅ IID carril con costo medido: **$0,0681 por pieza publicada** (imagen 59 %); fuente única de tarifa `ops_lab_rates` (cero literales)
- ✅ `SESSION_PROTOCOL.md` **v17** — corregido el punto de push de CC (CC sí pushea ramas de PR a `unrlvl-context`; sólo `main` y merge restringidos); Paso 1 confirma que los labs son apps del ecosistema
- ✅ `IID/session_log.md` — entrada 2026-07-31 al tope (instrumentación de costo + desvío buildFromGenome)
- ✅ Professor + Skills INDEX.md — ver `skills/INDEX.md` (índice vivo)

> **Anterior (2026-05-29):** LIVE · `ecosystem.json` v21 (portal fulfillment NSCF) · Professor v1.0 (54 learnings, 42 aprobados) · Skills INDEX 15 skills · `brands/NeuroneSCF/session_log.md` sesión 2026-05-29.
