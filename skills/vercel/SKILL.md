# SKILL — vercel v1.0
_Unrealville Studio · Vercel Infrastructure · Fetch + Deploy + Projects_
_Versión: 1.0 · 2026-05-10_

---

## INSTRUCCIÓN DE CARGA

Skill de infraestructura base. Siempre disponible. Cargarlo cuando:
- Se accede a cualquier URL de `*.vercel.app` o proyectos propios
- Se trabaja con deploys, proyectos, edge functions
- Se necesita leer archivos del repo `unrlvl-context`

---

## REGLA CRÍTICA

**SIEMPRE usar `Vercel:web_fetch_vercel_url` para URLs de Vercel.**
Nunca usar `web_fetch` estándar para dominios `*.vercel.app` — puede recibir 401/403 porque no pasa la autenticación Vercel.

```
✅ Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/ecosystem.json
❌ web_fetch → https://unrlvl-context.vercel.app/ecosystem.json
```

---

## PROYECTOS UNRLVL EN VERCEL

| Proyecto | URL | Qué es |
|----------|-----|--------|
| `unrlvl-context` | https://unrlvl-context.vercel.app | Sistema de contexto — ecosystem + skills |
| `unrlvl-tools` | https://unrlvl-tools.vercel.app | ShopifyAuditor v3.5 + translate-proxy |
| `unrlvl-shopify-mcp` | https://unrlvl-shopify-mcp.vercel.app/api/mcp/mcp | Conector Shopify MCP |
| `unrlvl-copy-lab` | https://unrlvl-copy-lab.vercel.app | CopyLab v8.1 |
| `unrlvl-ops` | https://unrlvl-ops.vercel.app | UNRLVL OPS dashboard |
| `orchestrator-unrlvl` | https://orchestrator-unrlvl.vercel.app | Orchestrator OR_1.1 |
| `unrlvl-social-media-agent` | https://unrlvl-social-media-agent.vercel.app | Social Media Agent |

---

## GITHUB PROXY — leer repos privados

El proyecto `unrlvl-context` expone un proxy para leer cualquier repo privado de `unrealvillestudio-hub` sin exponer el PAT:

```
Vercel:web_fetch_vercel_url →
  https://unrlvl-context.vercel.app/api/gh?action=[tree|file|repos]&repo=[REPO]&path=[PATH]
```

**Ejemplos:**

```
# Ver árbol completo de un repo
https://unrlvl-context.vercel.app/api/gh?action=tree&repo=unrlvl-context&path=

# Leer un archivo específico
https://unrlvl-context.vercel.app/api/gh?action=file&repo=unrlvl-context&path=brands/NeuroneSCF/brand.json

# Ver todos los repos de unrealvillestudio-hub
https://unrlvl-context.vercel.app/api/gh?action=repos
```

**El PAT (`GH_PAT`) vive en Vercel Environment Variables — nunca en el chat.**
Sam regenera y actualiza en Vercel cuando expira.

---

## CONTEXT SYSTEM — URLs base

| Archivo | URL |
|---------|-----|
| ecosystem.json | https://unrlvl-context.vercel.app/ecosystem.json |
| ecosystem.md | https://unrlvl-context.vercel.app/ecosystem.md |
| ecosystem_filemap.md | https://unrlvl-context.vercel.app/ecosystem_filemap.md |
| AGENDA.md | https://unrlvl-context.vercel.app/AGENDA.md |
| SESSION_PROTOCOL.md | https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md |
| skills/INDEX.md | https://unrlvl-context.vercel.app/skills/INDEX.md |
| NeuroneSCF brand.json | https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json |
| NeuroneSCF session_log | https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md |
| SMA export | https://unrlvl-social-media-agent.vercel.app/api/export?secret=[SECRET] |

---

## TOOLS MCP VERCEL DISPONIBLES

| Tool | Cuándo usar |
|------|------------|
| `Vercel:web_fetch_vercel_url` | Fetch de cualquier URL Vercel — leer contexto, archivos, APIs |
| `Vercel:get_project` | Info de un proyecto (ID, entorno, dominio) |
| `Vercel:list_projects` | Ver todos los proyectos del team |
| `Vercel:list_deployments` | Ver deploys de un proyecto |
| `Vercel:get_deployment` | Info de un deploy específico |
| `Vercel:get_deployment_build_logs` | Logs de build si hay error en deploy |
| `Vercel:get_runtime_logs` | Logs de runtime de producción |
| `Vercel:deploy_to_vercel` | Deploy desde el chat |
| `Vercel:search_vercel_documentation` | Buscar en docs de Vercel |

---

## PATTERN — verificar post-deploy

Después de que Sam commitea al repo `unrlvl-context` y Vercel redesploya (~30s):

```
Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/ecosystem.json
→ verificar que _meta.version sea el esperado
→ confirmar "Listo Sam. Sistema actualizado."
```

---

## PUSH DIRECTO A REPOS DE CÓDIGO (no unrlvl-context)

Para repos de código (labs, herramientas) Sam puede proveer el PAT y Claude hace el push directamente via bash:

```bash
git clone https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git /tmp/repo
cd /tmp/repo && git config user.email "sam@unrealvillestudio.com"
git add [archivos] && git commit -m "[mensaje]"
git push https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git main
```

**NUNCA hacer esto con `unrlvl-context`** — requiere Vercel redeploy → siempre GitHub Desktop.

---

_SKILL vercel v1.0 · Unrealville Studio · Infra base del stack_
