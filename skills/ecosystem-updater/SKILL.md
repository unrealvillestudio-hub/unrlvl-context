# SKILL — Ecosystem Updater
_Versión: 1.0 · 2026-05-26 · Mantenido por: Claude_

---

## QUÉ ES ESTE SKILL

Actualización coordinada de `ecosystem.json` y `ecosystem_graph.json` usando audit contextual en Claude Chat + edición directa en repo vía Claude Code. Produce un estado ground-truth del ecosistema con relaciones leídas del código real, no inferidas.

**Cuándo cargarlo:**
- Sam dice "actualiza graph" o "actualiza ecosystem"
- Después de un deploy significativo (nuevo lab, nueva EF, nueva tabla, nuevo agente)
- Después de un `ecosystem audit` (contextual o identificativo)
- Antes de iniciar un Sprint (para asegurar que el punto de partida es correcto)
- Periódicamente si han pasado más de 2 semanas sin actualización

**Relación con otros skills:**
- Requiere que `ecosystem-auditor` haya corrido primero (o correrlo como Fase 1 de este mismo skill)
- Se complementa con `github-auditor` para la lectura de repos
- El output alimenta el `ecosystem_graph.json` que uso en todas las sesiones

---

## ARQUITECTURA DEL PROCESO

```
Claude Chat (este skill)          Claude Code (repo local)
─────────────────────────         ─────────────────────────
Fase 1: Audit contextual    →     Fase 2: Edición + commit
  - GitHub repos (código)           - Edita ecosystem.json
  - Supabase EFs + tablas           - Actualiza ecosystem_graph.json
  - Vercel projects                 - Valida JSON
  - Sintetiza diff                  - Commit + push a main
  - Genera instrucciones
```

**Por qué esta división:** El audit requiere síntesis cruzada entre múltiples fuentes (GitHub código + Supabase real + Vercel) que funciona mejor en Claude Chat con todos los MCPs conectados. La edición de archivos y el commit son operaciones mecánicas donde Claude Code es más preciso y directo.

---

## FASE 1 — AUDIT CONTEXTUAL (Claude Chat)

### 1.1 Cargar skills previos
```
ecosystem-auditor/SKILL.md  ← proceso de audit
vercel/SKILL.md             ← fetch URLs
github-auditor/SKILL.md     ← lectura de repos
```

### 1.2 Ejecutar audit por capas

**Capa GitHub — repos prioritarios a leer:**
```
GET /api/gh?action=repos
→ Detectar repos nuevos vs baseline en ecosystem.json

Para cada lab con cambios recientes:
GET /api/gh?action=file&repo=[LAB]&path=/package.json
GET /api/gh?action=file&repo=[LAB]&path=/api/execute.ts  (o equivalente)
→ Confirmar: qué AI SDK usa, qué tablas lee, qué endpoints llama
```

**Labs a auditar en orden de prioridad:**
1. Orchestrator (`/api/trigger-job.ts` — qué labs registra)
2. CopyLab (`/api/execute.ts` — tablas SB, modelo Claude)
3. SocialLab (`/api/publish.ts` — qué llama, qué escribe)
4. ImageLab (`/api/execute.ts` — qué AI usa)
5. VoiceLab, VideoLab, BlueprintLab, WebLab (`/package.json` — AI deps)

**Capa Supabase:**
```
unrlvl-supabase-mcp:list_edge_functions
→ Count real vs documentado en ecosystem.json
→ Detectar slugs nuevos con version > 1 (activos)
→ Flag EFs con version >= 10 no documentadas (críticas)

unrlvl-supabase-mcp:execute_sql → tabla completa de schemas
→ Detectar tablas nuevas no en ecosystem.json
→ Flag tablas operacionales nuevas (ignorar tablas auth/system)
```

**Capa Vercel:**
```
Vercel:list_projects → count y detectar proyectos nuevos
Para proyectos nuevos: Vercel:get_project → status, domain, framework
```

### 1.3 Sintetizar diff

Producir lista estructurada de cambios detectados:
```
CORRECCIONES (el JSON dice X pero la realidad es Y):
- supabase.main.edge_functions.total_active: 67 → 93
- ayra.sprints.sprint_0: "planned" → "lab_jobs ya existe"
...

ADICIONES (existe en prod pero no está documentado):
- nueva tabla: public.lab_configs (CRÍTICA)
- nueva EF: lab-worker v11
...

OBSOLETOS (documentado pero ya no existe o cambió):
- (listar si los hay)
```

### 1.4 Generar diff de ecosystem_graph.json

Si el audit encontró:
- Nuevas relaciones (ej: Orchestrator → lab_configs)
- Nodos incorrectos (ej: BlueprintLab tenía AI-CLAUDE, no tiene AI backend)
- Nodos nuevos (ej: TBL-LAB-CONFIGS, EF-LAB-WORKER)

→ Regenerar `ecosystem_graph.json` completo con versión incremental.
→ Formato: `"version": "YYYY-MM-DD-v[N]"` donde N es secuencial por día.

---

## FASE 2 — PROMPT PARA CLAUDE CODE

Usar la plantilla siguiente, completando los `[PLACEHOLDERS]` con los hallazgos reales del audit:

```
Tienes acceso al repo local de unrlvl-context sincronizado con GitHub (main).

TAREA: Actualizar ecosystem.json con los hallazgos del audit contextual de [FECHA].

=== CAMBIOS EN ecosystem.json ===

1. _meta.version → "[FECHA]-v[N]"
   _meta.previous → "[VERSIÓN ANTERIOR]"

2. _meta.last_audit → reemplazar objeto completo:
   {
     "date": "[FECHA]",
     "status": "[STATUS RESUMEN 1 LÍNEA]",
     "conducted_by": "Claude Sonnet 4.6",
     "key_findings": [
       "[HALLAZGO 1]",
       "[HALLAZGO 2]",
       ...
     ]
   }

3. [SECCIÓN ESPECÍFICA] → [CAMBIO EXACTO]
   (repetir por cada cambio detectado, siempre con ruta JSON exacta)

=== CAMBIOS EN ecosystem_graph.json ===

Reemplazar el archivo completo con el contenido siguiente:
[CONTENIDO COMPLETO DEL NUEVO ecosystem_graph.json]

=== VALIDACIÓN ===

Antes del commit:
- Verificar que ecosystem.json parsea como JSON válido
- Verificar que ecosystem_graph.json parsea como JSON válido
- No introducir cambios no listados arriba

=== COMMIT ===

Mensaje exacto:
"ecosystem: audit [FECHA] · [RESUMEN 5-7 PALABRAS DE LO MÁS IMPORTANTE]"

Archivos en el commit: ecosystem.json, ecosystem_graph.json (solo los modificados)
```

### Reglas del prompt para Claude Code

- **Siempre dar rutas JSON exactas** (ej: `supabase.main.edge_functions.total_active`) — Claude Code no debe inferir dónde va cada cambio
- **Para arrays**: especificar si se agrega al inicio, al final, o se reemplaza un item específico
- **Para ecosystem_graph.json**: siempre reemplazar el archivo completo, nunca hacer edits parciales (es demasiado grande y estructurado para edición quirúrgica)
- **Validación JSON antes del commit** es obligatoria — Claude Code debe correr un parse check
- **Un commit por sesión de audit** — no fragmentar en múltiples commits salvo que sean archivos completamente independientes

---

## SECCIONES DE ecosystem.json A ACTUALIZAR

Referencia de qué secciones toca este skill y con qué frecuencia cambian:

| Sección | Frecuencia de cambio | Qué actualizar |
|---|---|---|
| `_meta.version` | Siempre | Incrementar vN |
| `_meta.last_audit` | Siempre | date + status + key_findings |
| `supabase.main.edge_functions.total_active` | Cuando hay nuevas EFs | Count real |
| `supabase.main.edge_functions.groups` | Cuando hay nuevas EFs | Añadir grupos nuevos |
| `supabase.main.schemas.public.note` | Cuando hay nuevas tablas | Appendear tablas nuevas |
| `labs.*` | Cuando cambia un lab | status, version, urls |
| `ayra.sprints.*` | Cada sprint | Estado actualizado |
| `next_session_agenda` | Siempre | Hallazgos → inicio del array |
| `infrastructure[*]` | Nuevos deployments | Añadir nuevas infra entries |
| `agents.existing` | Nuevos agentes | Añadir entries |

**Secciones que NO toca este skill** (tienen su propio proceso de actualización):
- `brands[*].shopify.*` → Shopify Auditor skill
- `brands[*].klaviyo.*` → Sessions específicas de Klaviyo
- `brands[*].meta.*` → Sessions específicas de Meta
- `professor.*` → Professor system sessions
- `protocols.*` → Cuando se crean/actualizan protocolos

---

## TRIGGERS DE SAM

| Sam dice | Acción |
|---|---|
| "actualiza graph" | Correr audit completo + generar instrucciones Claude Code |
| "actualiza ecosystem" | Ídem (son sinónimos en este skill) |
| "ecosystem graph está desactualizado" | Ídem |
| "antes del sprint [X]" | Correr audit focalizando en las secciones afectadas por el sprint |
| "qué ha cambiado en el ecosistema" | Audit ligero — solo GitHub repos recientes + Supabase EF count |

---

## FORMATO DE VERSIÓN

```
ecosystem.json:       "_meta.version": "YYYY-MM-DD-vN"
ecosystem_graph.json: "_meta.version": "YYYY-MM-DD-vN"
```

Donde N es secuencial por día (v1, v2, v3...). Si el audit es el mismo día que la última versión, incrementar N.

**Ejemplo:** Si hoy es 2026-05-26 y la última versión es `2026-05-26-v18`, la nueva es `2026-05-26-v19`.

---

## FRECUENCIA RECOMENDADA

- **Mínimo:** Antes de cada Sprint
- **Óptimo:** Después de cualquier semana con deploys significativos
- **Máximo utilidad:** Siempre antes de una sesión de arquitectura o planning

Cuando Ayra Sprint 1 esté vivo, el `graph_validate` job reemplaza la capa de detección de drift — este skill queda para la síntesis y actualización manual de ecosystem.json que requiere juicio.

---

## HISTORIAL DE AUDITS

| Fecha | Versión | Tipo | Hallazgos clave |
|---|---|---|---|
| 2026-05-26 | v2 graph · v19 json | Contextual | 93 EFs reales (67 doc) · lab_jobs+lab_configs ya existen · BlueprintLab sin AI · ImageLab usa Imagen 3.0 · SocialLab → Meta MCP directo |

---

_Ecosystem Updater SKILL v1.0 · Unrealville Studio · 2026-05-26_
_Ubicación canónica: `skills/ecosystem-updater/SKILL.md`_
