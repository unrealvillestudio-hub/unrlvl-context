# PROTOCOLO DE SESIÓN — Unrealville Studio

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.

**Versión:** 2026-07-31-v17 | **Mantenido por:** Claude

> **Cambios v17 (2026-07-31):** (1) **Corregido el punto de push de CC a `unrlvl-context`** según la instrucción de Sam del 29-jul, que revoca la redacción de v16 ("CC nunca pushea a `unrlvl-context`"): **CC SÍ pushea ramas de PR** a `unrlvl-context`; la restricción es **sólo `main` y el merge** (regla vigente en `protocols/CC_PROTOCOL.md` → "Flujo de entrega de context files"). (2) **Añadida al Paso 1 de carga** la confirmación de que **los labs son apps del ecosistema** (CopyLab/ImageLab/SocialLab/VideoLab = repo + UI + modo dual), nunca servicios genéricos.

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
| `protocols/HRD_PROTOCOL.md` | **Instrucciones inviolables** — HRDs activas | Cuando se añaden o modifican HRDs |
| `protocols/CC_PROTOCOL.md` | **Protocolo de Claude Code** — gobierna a CC en todos los repos | Cuando cambian las reglas de CC |
| `skills/ecosystem-auditor/SKILL.md` | Protocolo de ecosystem audit | Cuando cambia el alcance del audit |

### Regla crítica de los `.md`
`ecosystem.md`, `ecosystem_filemap.md` y `AGENDA.md` **nunca se editan manualmente** — generados por Claude desde `ecosystem.json`.

### Regla crítica de context files (aplica a Claude y a CC)
Los context files **nunca se reemplazan** — se actualizan preservando historia: lo nuevo al tope, lo anterior archivado debajo, nunca borrado. Detalle completo para Claude Code en `protocols/CC_PROTOCOL.md`.

---

## HRD — INSTRUCCIONES INVIOLABLES

**Documento completo:** `protocols/HRD_PROTOCOL.md`
`https://unrlvl-context.vercel.app/protocols/HRD_PROTOCOL.md`

Toda HRD se ejecuta paso a paso, con mensaje de verificación obligatorio antes de actuar:
> "Ok Sam, querés que [objetivo]. Para ello debo [pasos intermedios implícitos, breve]. Correcto? Me faltan: [datos o 'ninguno — procedo']."

### HRDs activas — mapa rápido

| Trigger | HRD | Skill/Protocolo que activa |
|---|---|---|
| "protocolo actualización" | `HRD_PROTOCOLO_ACTUALIZACION` | Este protocolo — pasos 1-8 abajo |
| "Actualiza" | `HRD_ACTUALIZA` | Sección COMANDO "Actualiza" abajo |
| "ecosystem scan/audit" | `HRD_ECOSYSTEM_AUDIT` | `skills/ecosystem-auditor/SKILL.md` |
| "Professor" / "learnings" / "checkpoint" | `HRD_PROFESSOR` | Sección COMANDOS PROFESSOR abajo |

**Regla:** si el trigger se detecta, el mensaje de verificación es obligatorio antes de ejecutar cualquier paso.

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
4. https://unrlvl-context.vercel.app/CAPABILITIES.md
5. professor-get-context EF → carga pesos + variables activas + aprendizajes pendientes
```

Confirmar: `"Contexto operativo cargado. [N] variables de plataforma. [N] aprendizajes pendientes de aprobación."`

**Confirmación de nomenclatura (Paso 1, añadida v17):** los labs son **apps del ecosistema** — cuando Sam dice **CopyLab / ImageLab / SocialLab / VideoLab** se refiere a **estas apps** (repo + UI + modo dual sync/async), **nunca a un servicio genérico**. Ningún carril reconstruye el motor de un lab existente: lo llama por su `api_endpoint` (`lab_configs`). Precedente del desvío a corregir: `generadorLocal` (motor local en `content-run-stage` que reconstruye CopyLab en vez de invocarlo; igual `runSocialLabDirect` por SocialLab). Ver `ecosystem.json → labs._note` / `labs_wiring`.

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
| "ecosystem scan / audit / repos" | `ecosystem-auditor` |
| "CC / Claude Code / repo / branch" | `protocols/CC_PROTOCOL.md` |

### Paso 5 — Confirmación
> *"Contexto cargado — [Marca o Ecosistema] · [fecha] · Skills activos: [lista]. Contexto operativo cargado. Catálogo de capacidades disponible. [N] variables de plataforma. [N] aprendizajes pendientes.  Arrancamos."*


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

### HRD_PROFESSOR — acceso al sistema Professor

**Trigger:** "Professor" / "learnings" / "checkpoint" / "aprobar learnings"
→ Activar mensaje de verificación HRD antes de ejecutar.

**Arquitectura de acceso:**
- Proxy: `https://unrlvl-context.vercel.app/api/professor?action=[action]` vía `Vercel:web_fetch_vercel_url`
- Estado del proxy: **PENDIENTE DE CONSTRUIR** → usar fallback hasta entonces
- Fallback lectura: `Supabase:execute_sql` proyecto `amlvyycfepwhiindxgzw`
- Fallback escritura: proporcionar curl exacto para que Sam ejecute desde terminal

**Durante la sesión:**

**`"Professor, anota"`** — captura inmediata del contexto actual.
Claude formula el aprendizaje, confirma con una línea, y continúa.

**Checkpoint automático cada 10 mensajes** — completamente silencioso.
Claude llama `professor-checkpoint` EF. Solo score = 5 genera output visible: `[Professor: anotado — título]`.

### Final de sesión — ver CIERRE DE SESIÓN abajo

---

## HRD_ECOSYSTEM_AUDIT — comando "ecosystem scan"

**Trigger:** "ecosystem scan", "ecosystem audit" o variantes
→ Activar mensaje de verificación HRD antes de ejecutar.

**Skill:** `skills/ecosystem-auditor/SKILL.md` — cargarlo y leerlo antes de ejecutar.

**Pregunta obligatoria antes de cualquier paso:**
> *"¿Lo querés identificativo (qué hay y dónde, sin leer código) o contextual (leer y entender TODO el código, relaciones y estado real)?"*

El alcance cubre: Context System · Vercel · GitHub repos · Supabase (tablas, EFs, schemas) · Labs · Marcas · Agents · Skills · Tools.

**Referencia completa de pasos:** `skills/ecosystem-auditor/SKILL.md`

---

## CIERRE DE SESIÓN — Orden obligatorio

```
PASO 1 — "Professor"
  → Claude consulta professor_learnings pendientes de la sesión
  → Presenta lista con destino propuesto en knowledge/
  → Sam aprueba / rechaza / modifica cada ítem
  → Claude genera archivos Markdown SOLO de los aprobados
  → Claude llama professor-approve-learning por cada aprobado

PASO 2 — "Actualiza" (siempre DESPUÉS de Professor)
  → session_log.md incluye SOLO aprendizajes aprobados
  → Genera todos los archivos que cambiaron
  → ecosystem.json + AGENDA.md siempre
  → (SMA NO se consulta por defecto — solo si Sam lo pide explícitamente)
  → Mensaje de commit listo con TODO incluido

PASO 3 — Commit único
  → session_log + ecosystem + knowledge updates aprobados
```

**Regla:** `Actualiza` **NUNCA** va antes que `Professor`.
Si Sam escribe "Actualiza" sin haber hecho Professor, Claude recuerda:
> *"Sam, ¿arrancamos con Professor primero para que el session_log quede completo?"*

---

## COMANDO "Actualiza" — HRD_ACTUALIZA

**Trigger:** "Actualiza"
→ Activar mensaje de verificación HRD antes de ejecutar.

**1. SMA — NO se consulta por defecto**

A partir de v15, `Actualiza` **NO** recoge datos de sesiones del Social Media Agent automáticamente.
El SMA solo se consulta cuando **Sam lo pide explícitamente** en la misma instrucción, por ejemplo:
> "Actualiza con SMA" · "Actualiza incluyendo el SMA" · "revisá el SMA y Actualiza"

Cuando Sam lo pida explícitamente:
- GET `https://unrlvl-social-media-agent.vercel.app/api/export?secret=[SECRET]` vía `Vercel:web_fetch_vercel_url`.
- ETag igual al registrado → `"Sin novedades del SMA"` · continúa
- ETag cambió → cargar export completo · procesar · actualizar `agents/social-media-agent/session_log.md` **preservando historia** (lo nuevo al tope, lo anterior archivado debajo — nunca reemplazar)

Si Sam NO lo menciona, `Actualiza` ignora por completo el SMA. No se llama el endpoint, no se genera ni toca el session_log del agente.

**2. Genera archivos que cambiaron**

Para chats de marca: `session_log.md` (siempre) · `brand.json` · `ecosystem.json` · `AGENDA.md` (siempre)
Para chats de ecosistema: `ecosystem.json` (siempre) · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md` (siempre)

Todos los context files se actualizan **preservando historia**, nunca se reemplazan.

**3. POLÍTICA DE ENTREGA POR TAMAÑO — quién toca cada archivo** *(nuevo en v16)*

El tamaño del archivo decide quién lo actualiza. El criterio es objetivo: depende de si Claude puede manejar el archivo completo en el chat sin riesgo de truncar u omitir contenido.

**RUTA A — Claude lo entrega listo (archivo manejable):**
Aplica cuando Claude puede (1) leer el archivo completo vía el proxy `web_fetch_vercel_url` Y (2) re-emitirlo entero en su respuesta sin truncar, preservando el 100% del contenido previo.
- Claude carga el archivo actual, lo actualiza (nuevo al tope, historia preservada), y entrega el archivo COMPLETO listo para push.
- **Nomenclatura de entrega:** Claude entrega el archivo con prefijo de carpeta `[carpeta]_nombre.ext` para evitar colisiones en la carpeta de descargas. Ejemplos:
  - `brands/ForumPHs/session_log.md` → se entrega como **`ForumPHs_session_log.md`**
  - `agents/social-media-agent/session_log.md` → se entrega como **`social-media-agent_session_log.md`**
  - `AGENDA.md` (raíz) → se entrega como **`AGENDA.md`** (sin prefijo, está en raíz)
- Sam descarga, **renombra al nombre canónico** (`session_log.md`) al colocarlo en su carpeta, y pushea por GitHub Desktop.
- En la práctica caen en Ruta A: `session_log.md`, `brand.json`, `AGENDA.md`, `BP_Brand_Context.md`, y la mayoría de los context files de tamaño medio.

**RUTA B — CC hace UPDATE in-place (archivo demasiado extenso):**
Aplica cuando el archivo es tan grande que reproducirlo entero en el chat arriesga que Claude trunque, resuma u omita contenido — exactamente el error que se quiere evitar.
- Claude NO intenta reproducir el archivo entero. En su lugar, genera instrucciones precisas para CC de un UPDATE quirúrgico: qué bloque insertar, en qué posición (al tope, bajo qué encabezado), preservando todo lo demás.
- CC ejecuta el UPDATE **modificando el archivo existente, nunca reemplazándolo por uno nuevo** (regla del CC_PROTOCOL).
- **Control:** CC informa que lo hizo de forma exitosa y presenta el mensaje de commit para que Sam lo confirme antes de subir. (No se exige diff previo; CC reporta éxito + commit, Sam confirma.)
- En la práctica caen en Ruta B: `ecosystem.json` completo y cualquier archivo que crezca mucho — hasta que el refactor pendiente los estructure en piezas más chicas (cuanto más modular el sistema, más archivos pasan a Ruta A).

**Regla de decisión:** ante la duda sobre si un archivo es manejable, Claude prefiere Ruta B (CC) antes que arriesgar truncar un context file. La integridad del archivo manda sobre la comodidad de entregarlo directo.

**4. REGLA CRÍTICA DE NOMENCLATURA (nombres canónicos finales en el repo)**
```
session_log.md · brand.json · ecosystem.json · ecosystem.md
ecosystem_filemap.md · AGENDA.md · BP_Brand_Context.md
SESSION_PROTOCOL.md · SKILL.md · INDEX.md · HRD_PROTOCOL.md · CC_PROTOCOL.md
```
(En Ruta A, Claude entrega con prefijo `[carpeta]_`; Sam renombra al nombre canónico al colocarlo. Ver punto 3.)

**5.** Mensaje de commit listo para pegar con rutas exactas — SIEMPRE, con cada archivo entregado (Ruta A) o con cada UPDATE de CC (Ruta B).

**6. Recuerda a Sam:**
- Raíz: `ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md`
- Skills: `skills/[nombre]/SKILL.md` · Index: `skills/INDEX.md`
- Marcas: `brands/[Marca]/` · Agentes: `agents/[nombre]/`
- Protocolos: `protocols/` · Knowledge: `knowledge/`
- GitHub Desktop debe mostrar **modificaciones**, no archivos nuevos

**7. Verifica** post-deploy:
> *"Listo Sam. Sistema actualizado."*

---

## PUSH DIRECTO A GITHUB DESDE CLAUDE

**Cuándo:** repos de código (CoreProject, WebLab, BluePrints, labs)
**Cuándo NO (para Claude / claude.ai):** `unrlvl-context` — GitHub Desktop siempre. _(Esto aplica a **Claude en el browser**. Para **CC**, ver la nota de abajo: CC sí pushea ramas de PR a `unrlvl-context`.)_

```bash
git clone https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git /tmp/repo
cd /tmp/repo && git config user.email "sam@unrealvillestudio.com" && git config user.name "Sam UNRLVL"
git add [archivos] && git commit -m "[mensaje]"
git push https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git main
```

**Nota (CC — corregida v17, 2026-07-31):** esto aplica a Claude (claude.ai). Para Claude Code (CC), las reglas de push están en `protocols/CC_PROTOCOL.md`. La redacción de v16 ("CC nunca pushea a `unrlvl-context`") queda **revocada por la instrucción de Sam del 29-jul**: **CC SÍ crea rama, commitea y pushea esa rama de PR** a `unrlvl-context` y abre el PR contra `main`. La restricción es **sólo `main` y el merge**: CC nunca pushea directo a `main` ni mergea PRs por su cuenta (eso lo hace Sam). Publicar una rama de PR es legítimo y esperado — es el "Flujo de entrega de context files" de `CC_PROTOCOL.md`.

---

## ACTUALIZACIÓN DIARIA

> *"Sam, antes de que te vayas — ¿Professor + Actualiza?"*

---

## AGENTES AUTÓNOMOS

| Agente | URL | Export endpoint | Se consulta en Actualiza |
|---|---|---|---|
| Social Media Agent | `unrlvl-social-media-agent.vercel.app` | `/api/export?secret=[SECRET]` | **Solo si Sam lo pide explícitamente** |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` | Solo si Sam lo pide explícitamente |

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
| **HRD Protocol** | `https://unrlvl-context.vercel.app/protocols/HRD_PROTOCOL.md` |
| **CC Protocol** | `https://unrlvl-context.vercel.app/protocols/CC_PROTOCOL.md` |
| Ecosystem Auditor | `https://unrlvl-context.vercel.app/skills/ecosystem-auditor/SKILL.md` |
| DECISION_MATRIX | `https://unrlvl-context.vercel.app/knowledge/ecosystem/decision-matrix/DECISION_MATRIX.md` |
| PROFESSOR_PROTOCOL | `https://unrlvl-context.vercel.app/knowledge/ecosystem/professor/PROFESSOR_PROTOCOL.md` |
| GitHub Proxy | `https://unrlvl-context.vercel.app/api/gh` |
| Professor Proxy | `https://unrlvl-context.vercel.app/api/professor` *(pendiente)* |
