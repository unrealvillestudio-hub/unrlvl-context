# CAPABILITIES — Unrealville Studio
_Versión: 1.1 · 2026-06-03 · Mantenido por: Claude_

---

## QUÉ ES ESTE ARCHIVO

Catálogo de lo que Claude **puede hacer** en este ecosistema y **cómo invocarlo**. Se carga en el arranque (después de INDEX, antes de preguntar marca). Es un **mapa, no contenido**: dice qué existe, cuándo aplica, dónde está el detalle, y qué preguntar antes de usar. Claude NO carga ninguna de estas capacidades en el arranque — solo sabe que existen y las invoca cuando la tarea lo pide.

**Regla de oro:** si Claude cree que "no tiene acceso" a algo (un repo, un dato, una herramienta), primero consulta este catálogo. La mayoría de las veces el acceso existe por una vía que no es obvia.

---

## ACCESO A REPOS — GitHub Proxy (CRÍTICO, SIEMPRE DISPONIBLE)

**El acceso a TODOS los repos es vía proxy gh, NO vía un conector MCP de GitHub.** No existe conector de GitHub en las tools — buscarlo y no encontrarlo NO significa que no haya acceso. El proxy es la vía:

```
Vercel:web_fetch_vercel_url →
https://unrlvl-context.vercel.app/api/gh?action=[tree|file|repos]&repo=[REPO]&path=[PATH]
```

- `action=repos` → lista todos los repos de la org
- `action=tree&repo=X` → árbol de archivos del repo X
- `action=file&repo=X&path=/ruta/archivo.md` → contenido de un archivo

**Importante:** las rutas tipo `unrlvl-context.vercel.app/brands/...` NO se sirven como estáticos (dan 404). Los directorios y archivos internos del repo SOLO se leen por el proxy gh con `action=file`. Si un path da 404 por HTTP directo, usar el proxy gh — no concluir "no hay acceso".

**Referencia:** `skills/github-auditor/SKILL.md` · `skills/vercel/SKILL.md`
**Regla URLs Vercel:** SIEMPRE `Vercel:web_fetch_vercel_url`, nunca web_fetch normal.

---

## AUDITORES (preguntar modo ANTES de ejecutar)

| Auditor | Disparador | PREGUNTA OBLIGATORIA antes de ejecutar | Detalle |
|---|---|---|---|
| `gh-auditor` | "revisa repo / archivos / código de X" | **"¿identificativo o contextual?"** (identificativo = qué hay y dónde; contextual = leer y entender TODO el código) | `skills/github-auditor/SKILL.md` |
| `ecosystem-auditor` | "ecosystem scan/audit" | **"¿identificativo o contextual?"** | `skills/ecosystem-auditor/SKILL.md` |
| `shopify-auditor` | "audita tienda / Shopify audit" | (severo — corre completo, sin modo) | `skills/shopify-auditor/SKILL.md` |
| `supabase-auditor` | "auditor", "supabase audit", "audita la db", "cruza código y db" | **"¿identificativo o contextual?"** (identificativo = qué objects anon sin caller conocido; contextual = leer código + eval intencionalidad + map completo) | `skills/supabase-auditor/SKILL.md` |

Alcance de los ecosystem/gh audits: Context System · Vercel · GitHub repos · Supabase (tablas, EFs, schemas) · Labs · Marcas · Agents · Skills · Tools.

---

## MCPs CONECTADOS (server-side, ya disponibles en tools)

| MCP | Para qué | Notas |
| `Supabase` (unrlvl-supabase-mcp) | SQL, Edge Functions, schemas, logs | Proyecto `amlvyycfepwhiindxgzw`. SQL: cuidado con paréntesis en texto (rompen el parser). |
| `Meta` (UNRLVL Meta) | publicar IG/FB, ads, insights, audiencias | `list_brands` primero. brand_id mapping: ver ecosystem. Solo FB+IG existen (no LinkedIn/X aún). |
| `Shopify` (Unrealville Studio) | productos, colecciones, temas, órdenes, GraphQL | B2C + B2B. `list_brands` para ver tiendas conectadas. |
| `Vercel` | deploys, proyectos, logs, **web_fetch_vercel_url** (= acceso al proxy gh) | La vía para TODA URL de Vercel y para leer repos. |

---

## FLUJOS OPERATIVOS (saber que existen; cargar detalle solo al usar)

| Flujo | Qué hace | Disparo / dónde |
| **Pipeline v22** | Claude→INSERT lab_jobs→lab-worker EF→CopyLab+ImageLab→Supabase CDN→pending_approval→Sam aprueba→approve-job→Meta MCP→IG+FB | INSERT en `lab_jobs`. Detalle: `skills/content-pipeline/SKILL.md` |
| **IID subsystem** | Research diario (schema `intel`)→queue→dispatch. Research vivo; ejecución/publicación en revisión. | cron. Detalle: bloque `iid_subsystem` en ecosystem.json |
| **content-pipeline** | TODO texto público (blog, producto, ad, social, landing, email). Incluye voice_genome L0/L1.5 + AIFE Layer 2. | "copy/texto/post/contenido". `skills/content-pipeline/SKILL.md` |
| **Professor** | learnings + checkpoint (cada 10 msgs, silencioso) + decision-matrix | "Professor / anota / checkpoint". Proxy `/api/professor` PENDIENTE → fallback Supabase SQL. |

---

## ARTEFACTOS CONSULTABLES (fuentes de verdad — leer antes de asumir estado)

| Artefacto | Ruta | Qué contiene | Actualizado por |
|---|---|---|---|
| `supabase_access_map.json` | `supabase_access_map.json` (raíz) | Topología de acceso: credencial → objeto → operación → intencional. Fuente de verdad para interpretar WARN del Security Advisor. | `supabase-auditor` bajo demanda |
| `ecosystem_graph.json` | `ecosystem_graph.json` (raíz) | Topología de negocio: nodos LAB/APP/EF y edges de dependencia. | `ecosystem-updater` post-audit |
| `ecosystem.json` | `ecosystem.json` (raíz) | Estado estructural completo del ecosistema. | HRD_ACTUALIZA |

> `supabase_access_map.json` y `ecosystem_graph.json` se enlazan por `caller.repo` ↔ nodos del graph. Se versionan por separado — no fusionar.

---

## SKILLS (catálogo completo en `skills/INDEX.md` — aquí solo los nombres)

`content-pipeline` · `ui-ux-layer` · `shopify-auditor` · `shopify-mcp` · `agent-builder` · `copylab-reference` · `image-processing` · `cost-layer` · `security` · `github-auditor` · `vercel` · `ads-mcp` · `higgsfield` · `agent-browser` · `ecosystem-auditor` · `ecosystem-updater` · `supabase-auditor`

Reglas de carga (qué skill con qué disparador): `skills/INDEX.md`. Siempre activos sin declaración: `vercel`, `github-auditor`, `security`.

---

## AGENTES AUTÓNOMOS

| Agente | URL | Export |
| Social Media Agent (SMA) | `unrlvl-social-media-agent.vercel.app` | `/api/export?secret=[SECRET]` (verificar en "Actualiza") |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` |

---

## HRDs / COMANDOS (detalle en HRD_PROTOCOL.md + userPreferences)

| Trigger | Hace | Pregunta/regla |
| "protocolo actualización" | carga de arranque | — |
| "Actualiza" | genera archivos + commit | nomenclatura: prefijo de carpeta destino + tabla de mapeo origen→destino |
| "ecosystem scan/audit" | auditoría | **preguntar identificativo o contextual** |
| "Professor / anota / checkpoint" | learnings | mensaje de verificación HRD |

Todas las HRD requieren el mensaje de verificación antes de ejecutar:
> "Ok Sam, querés que [objetivo]. Para ello debo [pasos]. Correcto? Me faltan: [datos o 'ninguno — procedo']."

---

## ENTREGABLES — regla de nomenclatura (HRD_ACTUALIZA)

Cada archivo de un paquete de actualización se nombra con **prefijo de carpeta destino** (`LucienSael_session_log.md`); Sam renombra antes de subir. SIEMPRE incluir tabla de mapeo origen→destino. NUNCA generar un archivo sin verificar primero su destino real en el repo (leer el existente antes de asumir estructura).

---

## PUSH A REPOS

- **Código** (CoreProject, WebLab, labs, luciensael): push directo vía PAT permitido (ver SESSION_PROTOCOL). Sitios en vivo → rama + PR + Preview, no push directo a main.
- **`unrlvl-context`**: SIEMPRE vía GitHub Desktop (Sam pushea), nunca push directo de Claude.

---

_CAPABILITIES v1.0 · carga en apertura (paso 3.5, después de INDEX) · mapa no contenido_
