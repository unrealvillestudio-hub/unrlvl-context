# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-05-17-v13 | **Mantenido por:** Claude

---

## ARQUITECTURA DEL SISTEMA DE CONTEXTO

### Fuente de verdad única: `ecosystem.json`

| Archivo | Rol | Se actualiza cuando |
|---|---|---|
| `ecosystem.json` | **Fuente de verdad** — Claude lo carga siempre | Hay cambios en labs, marcas, gaps o agenda |
| `ecosystem.md` | Render narrativo del ecosistema | `ecosystem.json` cambia → Claude lo regenera |
| `ecosystem_filemap.md` | Render de dependencias y flujos | `ecosystem.json` cambia → Claude lo regenera |
| `AGENDA.md` | **Agenda visual de pendientes** | **Siempre** en cada Actualiza |
| `skills/INDEX.md` | Tabla de decisión de skills | Cuando se añaden skills nuevos |
| `skills/[nombre]/SKILL.md` | Skills del sistema | Cuando el skill cambia |
| `brands/[Marca]/brand.json` | Estado actual de la marca | Hay cambios en la marca |
| `brands/[Marca]/BP_Brand_Context.md` | ADN permanente de la marca | Solo si cambia algo estructural |
| `brands/[Marca]/session_log.md` | Hilo vivo entre sesiones | Siempre — se añade al tope |
| `agents/[nombre]/session_log.md` | Log de sesiones de agentes | El agente genera y Sam commitea |

### Regla crítica de los `.md`
`ecosystem.md`, `ecosystem_filemap.md` y `AGENDA.md` **nunca se editan manualmente** — generados por Claude desde `ecosystem.json`.

---

## SKILL — GitHub Proxy + Vercel (SIEMPRE DISPONIBLES)

```
Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/api/gh?action=[tree|file|repos]&repo=[REPO]&path=[PATH]
```

El PAT (`GH_PAT`) vive en Vercel Environment Variables — nunca en el chat.
**Referencia:** `skills/github-auditor/SKILL.md` · `skills/vercel/SKILL.md`

---

## APERTURA — Primera frase en cada chat nuevo

> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

---

## PROTOCOLO DE CARGA COMPLETO

### Paso 1 — Carga base (siempre, antes de preguntar)
```
1. https://unrlvl-context.vercel.app/ecosystem.json
2. https://unrlvl-context.vercel.app/AGENDA.md
3. https://unrlvl-context.vercel.app/skills/INDEX.md
4. professor-get-context EF → carga pesos + variables activas + aprendizajes pendientes
```

Confirmar: `"Contexto operativo cargado. [N] variables de plataforma. [N] aprendizajes pendientes de aprobación."`

### Paso 2 — Pregunta
> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

### Paso 3 — Carga por contexto

**Si Sam indica marca específica:**
```
4. https://unrlvl-context.vercel.app/brands/[Marca]/brand.json
5. https://unrlvl-context.vercel.app/brands/[Marca]/BP_Brand_Context.md
6. https://unrlvl-context.vercel.app/brands/[Marca]/session_log.md
```

**Si Sam indica ecosistema / labs (sin marca específica):**
```
4. https://unrlvl-context.vercel.app/ecosystem.md
5. https://unrlvl-context.vercel.app/ecosystem_filemap.md
```

### Paso 4 — Skills bajo demanda

| Sam dice | Skills a cargar |
|----------|----------------|
| "Shopify / tienda / audit / fix" | `shopify-auditor` + `shopify-mcp` |
| "HTML / diseño / componente / visual" | `ui-ux-layer` |
| "copy / texto / post / contenido" | `content-pipeline` |
| "agente / WhatsApp / bot" | `agent-builder` + `security` |
| "imagen / video / creative / LoRA" | `image-processing` + `higgsfield` |
| "ads / campaña / Meta / TikTok" | `ads-mcp` |
| "costos / margen / tokens / OPS" | `cost-layer` |
| "deploy / nueva EF / Supabase" | `security` |
| "pipeline / IID / Orchestrator" | `content-pipeline` |

### Paso 5 — Confirmación
> *"Contexto cargado — [Marca o Ecosistema] · [fecha] · Skills activos: [lista]. Arrancamos."*

---

## DECISION_MATRIX — Siempre activa (silenciosa)

Opera en background durante toda la sesión. Claude la aplica antes de cualquier output relevante sin anunciarlo, salvo cuando activa un flag.

**Documento:** `knowledge/ecosystem/decision-matrix/DECISION_MATRIX.md`
**Backend:** Supabase `professor_*` tables

**Cuándo se anuncia:**
```
[Matriz]: [dimensiones] → [acción] — [razón en una línea]
```

Solo cuando activa PARAR, DECLARAR gap, o registra un bypass de Sam.

---

## COMANDOS PROFESSOR

### Durante la sesión

**`"Professor, anota"`** — captura inmediata del contexto actual.
Claude formula el aprendizaje, confirma con una línea, y continúa.

**Checkpoint automático cada 10 mensajes** — completamente silencioso.
Claude llama `professor-checkpoint` EF. Candidatos score ≥ 3 se guardan en `professor_learnings`. Solo score = 5 genera output visible: `[Professor: anotado — título]`.

**Propósito del Professor:** capturar aprendizajes que ambos (Sam y Claude) encontraron juntos en el camino — situaciones donde ninguno tenía claro cómo resolver, y lo descubrieron en sesión. No documenta lo que Claude ya maneja bien de forma consistente. El valor está en los gaps compartidos resueltos juntos.

### Final de sesión — ver CIERRE DE SESIÓN abajo

---

## COMANDO "ecosystem scan"

Cuando Sam escribe **"ecosystem scan"**, Claude pregunta **siempre** antes de ejecutar:

> *"Sam, lo quieres identificativo o también contextual?"*

- **Identificativo** — inventario: lista de repos, proyectos Vercel, EFs, tablas. Sin leer contenido.
- **Contextual** — inventario + lectura de archivos clave para entender propósito, estado y relaciones de cada componente. Incluye session_logs, brand contexts, schema, planes activos.

**No hay excepción a esta pregunta.** Aunque el contexto parezca obvio, Claude siempre pregunta.

---

## CIERRE DE SESIÓN — Orden obligatorio

```
PASO 1 — "Professor"
  → Claude consulta professor_learnings pendientes de la sesión
  → Presenta lista con destino propuesto en knowledge/
  → Sam aprueba / rechaza / modifica cada ítem
  → Claude genera archivos Markdown SOLO de los aprobados
  → Claude llama professor-approve-learning por cada aprobado
  → Solo en este punto Claude sabe qué quedó y qué no

PASO 2 — "Actualiza" (siempre DESPUÉS de Professor)
  → session_log.md incluye SOLO aprendizajes aprobados
  → Genera todos los archivos que cambiaron
  → ecosystem.json + AGENDA.md siempre
  → SMA check (ETag)
  → Mensaje de commit listo con TODO incluido

PASO 3 — Commit único
  → session_log + ecosystem + knowledge updates aprobados
  → Un solo commit consistente y completo
```

**Regla:** `Actualiza` **NUNCA** va antes que `Professor`.
Si Sam escribe "Actualiza" sin haber hecho Professor, Claude recuerda:
> *"Sam, ¿arrancamos con Professor primero para que el session_log quede completo?"*

---

## COMANDO "Actualiza" — detalle de ejecución

**1. Verifica SMA**

GET de `https://unrlvl-social-media-agent.vercel.app/api/export?secret=6lk8yfcMFdv%40L5%243H%5EoT%26AxR` vía `Vercel:web_fetch_vercel_url`.

- ETag igual al registrado → `"Sin novedades del SMA"` · continúa
- ETag cambió → cargar export completo · procesar · generar `social_media_agent_session_log.md`
- Sin ETag previo → cargar export completo · anotar ETag en session_log

**2. Genera archivos que cambiaron**

Para chats de marca:
- `session_log.md` — **siempre** · novedades + aprendizajes Professor aprobados al tope
- `brand.json` — si cambió estado, proyectos o alertas
- `ecosystem.json` — si hubo cambio cross-brand o de labs
- `AGENDA.md` — **siempre**

Para chats de ecosistema:
- `ecosystem.json` — **siempre**
- `ecosystem.md` — siempre que `ecosystem.json` cambie
- `ecosystem_filemap.md` — siempre que `ecosystem.json` cambie
- `AGENDA.md` — **siempre**

**3. REGLA CRÍTICA DE NOMENCLATURA**
```
session_log.md · brand.json · ecosystem.json · ecosystem.md
ecosystem_filemap.md · AGENDA.md · BP_Brand_Context.md
SESSION_PROTOCOL.md · SKILL.md · INDEX.md · MANUAL.md
DECISION_MATRIX.md · PROFESSOR_PROTOCOL.md · CHECKPOINT_RULES.md
```

**4. Mensaje de commit** listo para pegar con rutas exactas.

**5. Recuerda a Sam:**
- Raíz: `ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md`
- Skills: `skills/[nombre]/SKILL.md` · Index: `skills/INDEX.md`
- Marcas: `brands/[Marca]/` · Agentes: `agents/[nombre]/`
- Protocolos: `protocols/` · Knowledge: `knowledge/`
- GitHub Desktop debe mostrar **modificaciones**, no archivos nuevos

**6. Verifica** post-deploy:
> *"Listo Sam. Sistema actualizado."*

---

## PUSH DIRECTO A GITHUB DESDE CLAUDE

**Cuándo:** repos de código (CoreProject, WebLab, BluePrints, labs)
**Cuándo NO:** `unrlvl-context` — GitHub Desktop siempre.

```bash
git clone https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git /tmp/repo
cd /tmp/repo && git config user.email "sam@unrealvillestudio.com" && git config user.name "Sam UNRLVL"
git add [archivos] && git commit -m "[mensaje]"
git push https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git main
```

---

## ACTUALIZACIÓN DIARIA

> *"Sam, antes de que te vayas — ¿Professor + Actualiza?"*

---

## AGENTES AUTÓNOMOS

| Agente | URL | Export endpoint |
|---|---|---|
| Social Media Agent | `unrlvl-social-media-agent.vercel.app` | `/api/export?secret=[SECRET]` |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` |

---

## DISCIPLINA DE CHAT

Un chat = una marca. Si Sam mezcla sin intención:
> *"Sam, esto es de [Marca X]. ¿Lo anoto en su session_log y seguimos, o cambiamos de chat?"*

---

## REFERENCIA RÁPIDA — URLs

| Archivo | URL |
|---|---|
| Ecosistema (JSON) | `https://unrlvl-context.vercel.app/ecosystem.json` |
| AGENDA | `https://unrlvl-context.vercel.app/AGENDA.md` |
| Skills INDEX | `https://unrlvl-context.vercel.app/skills/INDEX.md` |
| Protocolo | `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md` |
| DECISION_MATRIX | `https://unrlvl-context.vercel.app/knowledge/ecosystem/decision-matrix/DECISION_MATRIX.md` |
| PROFESSOR_PROTOCOL | `https://unrlvl-context.vercel.app/knowledge/ecosystem/professor/PROFESSOR_PROTOCOL.md` |
| GitHub Proxy | `https://unrlvl-context.vercel.app/api/gh` |
