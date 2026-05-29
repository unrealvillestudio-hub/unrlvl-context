# CLAUDE.md — unrlvl-context
_Contexto persistente para Claude Code. No editar manualmente._

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

## Estado actual (2026-05-29)
- ✅ LIVE — todos los endpoints operacionales
- ✅ `ecosystem.json` v21 — actualizado con portal fulfillment NSCF
- ✅ Professor v1.0 — operacional (54 learnings, 42 aprobados)
- ✅ Skills INDEX.md — 15 skills documentados
- ✅ `brands/NeuroneSCF/session_log.md` — actualizado sesión 2026-05-29
