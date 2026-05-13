# SKILL — Ecosystem Auditor
_Versión: 1.0 · 2026-05-13 · Mantenido por: Claude_

---

## QUÉ ES ESTE SKILL

Auditoría completa del ecosistema técnico de Unrealville Studio: GitHub, Vercel, Supabase (y Cloudflare cuando el proxy esté disponible). Detecta drift entre el estado real del stack y lo declarado en `ecosystem.json`, genera el inventario actualizado y produce los archivos de actualización listos para commit.

**Cuándo cargarlo:**
- Antes de trabajar en `ecosystem.json` o `AYRA_MASTER_PLAN.md`
- Cuando se sospeche drift (nueva EF no documentada, proyecto Vercel nuevo, schema nuevo)
- Antes de Sprint 0 de Ayra (el EcosystemGraph necesita datos reales)
- Cada vez que se deploya algo nuevo en el ecosistema
- Bajo demanda cuando Sam lo indique

**No reemplaza** el `graph_validate` job de Ayra (eso es monitoreo continuo automático). Este skill es la auditoría profunda bajo demanda que produce el ground truth.

---

## HERRAMIENTAS DISPONIBLES

### 1. GitHub — via proxy `unrlvl-context`

**Base URL:** `https://unrlvl-context.vercel.app/api/gh`
**Siempre usar:** `Vercel:web_fetch_vercel_url`
**Org fija:** `unrealvillestudio-hub`

```
Listar repos:    /api/gh?action=repos
Árbol de repo:   /api/gh?action=tree&repo=[NOMBRE]&branch=main
Leer archivo:    /api/gh?action=file&repo=[NOMBRE]&path=/[RUTA]
```

### 2. Vercel — via MCP connector

**Tools disponibles:** `Vercel:list_projects`, `Vercel:get_project`, `Vercel:list_deployments`
**Team ID:** `unrealvillestudio-projects`

```
Listar proyectos:      Vercel:list_projects(teamId)
Detalle proyecto:      Vercel:get_project(projectId, teamId)
Último deployment:     Vercel:list_deployments(projectId, teamId)
Fetch URL Vercel:      Vercel:web_fetch_vercel_url(url)
```

### 3. Supabase — via MCP connector

**Tools disponibles:** `Supabase:list_projects`, `Supabase:execute_sql`, `Supabase:list_edge_functions`

```
Listar proyectos:      Supabase:list_projects()
Schemas + tablas:      Supabase:execute_sql(project_id, query_schemas)
Edge Functions:        Supabase:list_edge_functions(project_id)
Counts + health:       Supabase:execute_sql(project_id, query_counts)
```

### 4. Cloudflare — PENDIENTE (proxy no construido aún)

Cuando esté disponible, el proxy se añadirá a `unrlvl-context` con el mismo patrón que el de GitHub. Cubrirá: zonas DNS, registros, Page Rules, estado de dominios. El trigger para construirlo es cuando Ayra Sprint 1 necesite el `graph_validate` de dominios, o cuando se trabaje activamente con dominios del ecosistema.

---

## WORKFLOW DE AUDITORÍA COMPLETA

### Fase 1 — GitHub (5-10 min)

```
1. GET /api/gh?action=repos
   → Inventario completo: nombre, privado/público, última actualización, descripción
   → Detectar repos nuevos no en ecosystem.json
   → Detectar repos inactivos (sin actividad >90 días)

2. Para repos críticos, GET /api/gh?action=tree&repo=[NOMBRE]
   → Verificar estructura esperada (package.json, vercel.json, README)
   → Detectar archivos de configuración relevantes
```

**Output esperado:** lista de repos con status, últimas fechas, flags de cambio

---

### Fase 2 — Vercel (10-15 min)

```
1. Vercel:list_projects(teamId: "unrealvillestudio-projects")
   → Inventario completo: 23 proyectos actualmente

2. Para proyectos clave, Vercel:get_project(projectId, teamId)
   → live (true/false), domains, framework, latestDeployment
   → Detectar: proyectos con live:true → tienen dominio custom
   → Detectar: deployments fallidos
   → Detectar: proyectos nuevos no en ecosystem.json
```

**Lo que más importa auditar en Vercel:**
- `live: true` = tiene dominio custom (actualmente solo `unrealvillestudio.com` y `forumphs.com`)
- `latestDeployment.readyState` = READY o ERROR
- `createdAt` de proyectos nuevos vs. fecha del último ecosystem.json

---

### Fase 3 — Supabase (10-15 min)

```
1. Supabase:list_projects()
   → Todos los proyectos: actualmente unrlvl-db + XMMs (personal) + ForumPHs (propio)

2. Para cada proyecto relevante:

   Supabase:execute_sql(project_id, """
     SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
       (SELECT COUNT(*) FROM information_schema.columns c
        WHERE c.table_schema = t.schemaname AND c.table_name = t.tablename) as col_count
     FROM pg_tables t
     WHERE schemaname NOT IN ('pg_catalog','information_schema','extensions',
       'pgbouncer','realtime','storage','supabase_functions','supabase_migrations','vault')
     ORDER BY schemaname, tablename;
   """)

3. Supabase:list_edge_functions(project_id)
   → Contar total, agrupar por prefijo (shopify-*, nscf-*, iid-*, fphs-*, etc.)
   → Detectar EFs con version alta (críticas y activas) vs. version 1 (posiblemente obsoletas)
   → Detectar EFs con status != ACTIVE

4. Queries de health (contar rows en tablas activas):
   Supabase:execute_sql(project_id, """
     SELECT
       (SELECT COUNT(*) FROM intel.iid_content_queue) as iid_queue,
       (SELECT COUNT(*) FROM content.orchestrator_jobs) as orchestrator_jobs,
       (SELECT COUNT(*) FROM shopify.audit_runs) as audit_runs,
       (SELECT COUNT(*) FROM public.brands) as brands,
       (SELECT COUNT(*) FROM public.agents) as agents,
       (SELECT COUNT(*) FROM public.ops_costs) as ops_costs,
       (SELECT COUNT(*) FROM public.ops_renewals) as ops_renewals;
   """)
```

**Lo que más importa auditar en Supabase:**
- Total de EFs activas (era 17 en documentación v7, realidad: 53)
- Schemas nuevos no documentados (crm, intel fueron sorpresas)
- Tablas con datos activos vs. tablas vacías
- Estado del `iid_content_queue` (si > 200 sin procesar, algo está bloqueado)

---

### Fase 4 — Compilar diff y actualizar

```
1. Comparar hallazgos contra ecosystem.json vigente
   → Nueva tabla: [schema.table] — no estaba documentada
   → Nueva EF: [slug] — no estaba en el inventario
   → Nuevo proyecto Vercel: [name] — no estaba en infrastructure[]
   → Nuevo repo GitHub: [name] — no estaba documentado
   → Cambio de estado: [componente] pasó de X a Y

2. Actualizar ecosystem.json con datos reales
   → Incrementar version: YYYY-MM-DD-vN
   → Actualizar last_audit con findings
   → Actualizar secciones afectadas

3. Si ecosystem.json cambió → regenerar ecosystem.md y ecosystem_filemap.md
```

---

## QUERIES SQL ÚTILES

### Schema completo con tamaños
```sql
SELECT schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
  (SELECT COUNT(*) FROM information_schema.columns c
   WHERE c.table_schema = t.schemaname AND c.table_name = t.tablename) as col_count
FROM pg_tables t
WHERE schemaname NOT IN ('pg_catalog','information_schema','extensions',
  'pgbouncer','realtime','storage','supabase_functions','supabase_migrations','vault')
ORDER BY schemaname, tablename;
```

### Health check rápido (main DB)
```sql
SELECT
  (SELECT COUNT(*) FROM intel.iid_content_queue) as iid_queue,
  (SELECT COUNT(*) FROM content.orchestrator_jobs) as orch_jobs,
  (SELECT COUNT(*) FROM shopify.audit_runs) as audit_runs,
  (SELECT COUNT(*) FROM public.brands) as brands,
  (SELECT COUNT(*) FROM public.agents) as agents,
  (SELECT COUNT(*) FROM public.ops_costs) as ops_costs,
  (SELECT COUNT(*) FROM fph.owners) as fph_owners,
  (SELECT COUNT(*) FROM fph.buildings) as fph_buildings;
```

### Columnas de una tabla específica
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = '[schema]' AND table_name = '[tabla]'
ORDER BY ordinal_position;
```

### EFs agrupadas por prefijo
```
Supabase:list_edge_functions(project_id)
→ agrupar por slug.split('-')[0]: shopify(22) · nscf(17) · iid(7) · content(5) · fphs(5) · etc.
→ ordenar por version desc para detectar las más activas
```

---

## INVENTARIO BASELINE (audit 2026-05-13)

### GitHub — 23 repos
| Repo | Tipo | Privado | Último update |
|---|---|---|---|
| unrlvl-context | infra | No | 2026-05-13 |
| Tools | infra | Sí | 2026-05-09 |
| unrlvl-shopify-mcp | infra | No | 2026-05-07 |
| DDMV-Assistant | agente | No | 2026-04-28 |
| CoreProject | web | Sí | 2026-04-28 |
| Orchestrator | lab | No | 2026-04-27 |
| forumphs-com | brand | No | 2026-04-27 |
| SocialLab | lab | No | 2026-04-26 |
| ImageLab | lab | No | 2026-04-26 |
| CopyLab | lab | No | 2026-04-26 |
| unrlvl-ops | infra | Sí | 2026-04-24 |
| BluePrints | infra | No | 2026-04-22 |
| forumphs-document-factory | agente | No | 2026-04-22 |
| AgentLab | lab | No | 2026-04-10 |
| forumphs-speaks | agente | No | 2026-04-07 |
| OnboardingApp | lab | No | 2026-04-05 |
| WebLab | lab | No | 2026-04-04 |
| VoiceLab | lab | No | 2026-04-03 |
| BlueprintLab | lab | No | 2026-04-03 |
| VideoLab | lab | No | 2026-04-03 |
| lanzadera-cv | personal | Sí | 2026-03-13 |
| gimnasio-mental | personal | No | 2026-03-12 |
| Shopify | tools | No | 2026-03-09 |

**Repos personales (no UNRLVL):** `lanzadera-cv`, `gimnasio-mental`

### Vercel — 23 proyectos
| Proyecto | Vercel ID | Dominio custom | Framework |
|---|---|---|---|
| unrlvl-context | prj_AmE4qTy4WoLAdreRQtXyzXLQHl54 | — | — |
| tools | prj_orYcSynBX5LC3vuZvLY74Wy8zcRK | unrlvl-tools.vercel.app | — |
| unrlvl-shopify-mcp | prj_jEiyzkET1fSk5IgHxkaSNVnTLCoB | — | — |
| ddmv-assistant | prj_9pOxl79ZX6yQ6BLFXJHCI7xAQN1C | ddmv-assistant.vercel.app | — |
| unrlvl-core-project | prj_UQdvfhgMuBxX0zqyx1JrVFPRrvSN | **unrealvillestudio.com** ✅ | — |
| orchestrator | prj_93AJfDiY1pcktG7b7fDStBqONYWy | orchestrator-unrlvl.vercel.app | vite |
| forumphs-com | prj_RNfwsWnU7pqQygSLZCSMEXf90JTV | **forumphs.com** ✅ | — |
| social-lab | prj_AyV22kS0NqRkqH5MeOlaLSWJwOGT | social-lab-flame.vercel.app | vite |
| image-lab | prj_0BA7MvfSUHLTXXKvOdSckGNXoTAb | image-lab-unrlvl.vercel.app | vite |
| copy-lab | prj_5FebBMfTpo4aP5I7iJ98libUkTTe | unrlvl-copy-lab.vercel.app | vite |
| unrlvl-ops | prj_LcsIr7EXVokq93tG1XZodvX5R7C6 | unrlvl-ops.vercel.app | vite |
| blue-prints | prj_AMv0fnyooAW74XcsRc8Od9foaFLy | unrlvl-blueprints.vercel.app | — |
| forumphs-document-factory | prj_AUHgIP7cuc95dLz7vbj2P4piinlz | forumphs-document-factory.vercel.app | nextjs |
| unrlvl-social-agent | prj_woslSsgsi92lcssFl1MrUQ9pRicd | unrlvl-social-media-agent.vercel.app | — |
| forumphs-speaks | prj_fhBNQ6b9rd1Jhbe4BqNQP4frYpqn | forumphs-speaks.vercel.app | — |
| agent-lab | prj_y1hYcSn2javwg7h6fof3e74uHTne | agent-lab-unrlvl.vercel.app | vite |
| unrlvl-voice-lab | prj_D62CfommaocFgjJaa83ybxqwmph5 | unrlvl-voice-lab.vercel.app | vite |
| onboarding-app | prj_pQXT2MoCrkp3dGFovNgheYqUnBwy | unrlvl-onboarding-app.vercel.app | vite |
| web-lab | prj_MzQeqiHG9fxCXYf3j84YCgdf5GZS | web-lab-unrlvl.vercel.app | vite |
| unrlvl-blueprint-lab | prj_gSnU3qy44YnpIcDjenhiEszgWLM5 | unrlvl-blueprint-lab.vercel.app | vite |
| unrlvl-video-lab | prj_R0t1QvEnagCNn71Qq4iBLwgxy1MJ | unrlvl-video-lab.vercel.app | vite |
| gimnasio-mental | prj_JN1xFqIr5irRCz8PHLvcN5loVnON | — | — |
| lanzadera-cv | prj_XBvY5E9TByJKM4jCDxjFxxhRh06k | — | — |

**Dominio custom activo:** solo `unrealvillestudio.com` y `forumphs.com`

### Supabase — inventario

| Proyecto | ID | Schemas | EFs | Uso |
|---|---|---|---|---|
| unrlvl-db | amlvyycfepwhiindxgzw | public(57t) · content(6t) · crm(13t) · fph(22t) · intel(7t) · shopify(6t) | **53 activas** | Principal UNRLVL |
| XMMs (personal) | puoybldykxqvhvtnwrld | public(15t) | 1 (send-reminders) | Personal Sam — pendiente limpieza |
| ForumPHs (propio) | (ID pendiente) | — | — | Cuenta propia · pendiente migración |

**EFs por grupo (unrlvl-db):**
- Shopify ecosystem: 22 · NSCF-específicas: 17 · Content/IID: 12 · ForumPHs: 5 · Otros: 4

---

## PATRONES DE DRIFT A VIGILAR

```
🔴 CRÍTICO:
- Nueva EF con versión alta (>10) no documentada → posiblemente crítica para operaciones
- Proyecto Vercel nuevo no en ecosystem.json → puede ser funcionalidad nueva
- Schema nuevo en Supabase → puede indicar nuevo sistema sin documentar

🟡 ATENCIÓN:
- EF con status != ACTIVE (puede estar degradada)
- Proyecto Vercel con latestDeployment.readyState = ERROR
- iid_content_queue > 200 items (pipeline potencialmente bloqueado)
- agents count > 0 (nuevos agentes registrados que no están en ecosystem.json)

🟢 INFORMATIVO:
- Repos sin actividad >60 días (candidatos a archivar)
- Proyectos Vercel con live:false y sin actividad reciente
- Tablas con 0 rows (estructuras creadas pero sin usar)
```

---

## CLOUDFLARE (cuando el proxy esté disponible)

Incluir en el workflow:
1. Verificar que dominios declarados en ecosystem.json tengan registros DNS activos
2. Detectar dominios en Cloudflare no documentados en el ecosistema
3. Verificar que los certificados SSL estén activos para dominios custom
4. Revisar cualquier Page Rule o redirect que afecte URLs del ecosistema

**Trigger para construir el proxy Cloudflare:** cuando Ayra Sprint 1 necesite `graph_validate` de dominios, o cuando se trabaje activamente con D7H/Diamond Details en Cloudflare.

---

_Ecosystem Auditor SKILL v1.0 · Unrealville Studio · 2026-05-13_
_Ubicación canónica: `skills/ecosystem-auditor/SKILL.md`_
