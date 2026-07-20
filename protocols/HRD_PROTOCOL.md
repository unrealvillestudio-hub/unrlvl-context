# HRD — Hard Instructions Protocol
_HRD Protocol v1.3 · UNRLVL Studio · 2026-07-18 (HRD_ACTUALIZA paso 10: BARRIDO DE ARCHIVADO — los ítems completados hace +30 días y sin referencias activas se MUEVEN a historical_AGENDA.md; se propone a Sam, nunca se ejecuta en silencio. + HRD_PROFESSOR: el proxy /api/professor YA EXISTE — verificar con action=checkpoint, NO con ping. · base previa v1.2 · 2026-06-29: HRD_ACTUALIZA paso 0: recargar estado vigente del repo antes de editar — evita pisar cambios de sesiones paralelas)_

---

## DEFINICIÓN

`HRD_[nombre]` = instrucción inviolable. Se ejecuta exactamente como está escrita, paso a paso.
Si apunta a un protocolo o skill, ese protocolo/skill es igualmente inviolable.

---

## MENSAJE DE VERIFICACIÓN — OBLIGATORIO ANTES DE EJECUTAR CUALQUIER HRD

> "Ok Sam, querés que [objetivo]. Para ello debo [pasos intermedios implícitos, breve]. Correcto? Me faltan: [datos o 'ninguno — procedo']."

Incluir pasos intermedios implícitos — lo que yo necesito hacer para llegar al objetivo aunque Sam no lo haya nombrado (cargar skill, leer repo, consultar Supabase, etc.) — para que Sam corrija el plan antes de que ejecute.

Si Sam confirma: ejecutar. Si hay corrección o datos faltantes: STOP.

---

## REGLAS GLOBALES — APLICAN A TODAS LAS HRD

**HRD-R01** — Ejecutar paso a paso en el orden escrito. Confirmar cada paso en voz alta antes de pasar al siguiente.

**HRD-R02** — Si la instrucción no es clara: STOP. Una pregunta a Sam. No proceder hasta tener respuesta.

**HRD-R03** — No agregar pasos. No omitir pasos. No interpretar. No "ayudar" más allá de lo escrito.

**HRD-R04** — Skill nombrado explícita o implícitamente → cargarlo y leerlo completo ANTES de cualquier acción. Confirmar: "Skill [nombre] cargado."

**HRD-R05** — Ruta o path de archivo → nunca asumir. Verificar via gh proxy o preguntar. Prohibido inventar paths.

**HRD-R06** — Acción no pedida → prohibida. Si el comando no la pide, no se hace.

**HRD-R07** — HRD apunta a otro protocolo → ese protocolo hereda el status inviolable. Ambos son HRD.

---

## HRD_PROTOCOLO_ACTUALIZACION

**Trigger:** Sam escribe "protocolo actualización" o "protocolo actualizacion"

**Verificación:** "Ok Sam, querés que cargue el protocolo completo del sistema. Sin alterar el protocolo, correcto? Me faltan estos datos: ninguno — procedo."

**Pasos inviolables:**

1. Fetch `https://unrlvl-context.vercel.app/ecosystem.json` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: versión + fecha
2. Fetch `https://unrlvl-context.vercel.app/AGENDA.md` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: prioridades activas
3. Fetch `https://unrlvl-context.vercel.app/skills/INDEX.md` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: versión del INDEX
4. Responder exactamente: "Hola Sam, protocolo cargado, ¿con qué marca o proyecto vamos a trabajar?"
5. Si Sam indica marca → fetch `brands/[Marca]/brand.json` + `brands/[Marca]/BP_Brand_Context.md` + `brands/[Marca]/session_log.md`
6. Si Sam indica ecosistema/labs → fetch `ecosystem.md` + `ecosystem_filemap.md`
7. Consultar `skills/INDEX.md` y cargar skills relevantes para el trabajo declarado
8. Confirmar: "Contexto cargado · Skills activos: [lista] · Estado: [resumen]"

---

## HRD_ACTUALIZA

**Trigger:** Sam escribe "Actualiza"

**Verificación:** "Ok Sam, querés ejecutar el protocolo Actualiza completo. Sin alterar el protocolo, correcto? Me faltan estos datos: ninguno — procedo."

**Pasos inviolables:**

0. **RECARGAR EL ESTADO VIGENTE DEL REPO ANTES DE EDITAR NADA.** No partir de la copia del sandbox (es una foto del momento de carga de la sesión y puede estar desactualizada — otras sesiones, CC, u otro chat de Sam pueden haber pusheado versiones nuevas entre el arranque de esta sesión y ahora). Por cada archivo de contexto que esta sesión va a modificar (AGENDA.md, session_log.md correspondiente, ecosystem.json, etc.):
   - Fetch la versión vigente vía `Vercel:web_fetch_vercel_url` (AGENDA/ecosystem) o `/api/gh?action=file` (session_logs y otros).
   - Editar SOBRE esa versión vigente, no sobre la copia del sandbox.
   - Si el archivo vigente difiere de lo que la sesión asumía: integrar los cambios ajenos, NO pisarlos. Si hay conflicto real que no se puede integrar limpio: STOP y avisar a Sam antes de generar el output.
   → Confirmar: "Estado vigente recargado del repo · [archivo]: v[versión vigente]"

1. Verificar Social Media Agent:
   GET `https://unrlvl-social-media-agent.vercel.app/api/export?secret=6lk8yfcMFdv%40L5%243H%5EoT%26AxR` vía `Vercel:web_fetch_vercel_url`
   → Si hay log: generar como output `session_log.md`
   → Si no hay: confirmar "Sin novedades del agente" y continuar
2. Leer export detallado por usuario (Laura/PO/Sam) y regenerar `agents/social-media-agent/session_log.md` con estado real actualizado
3. Generar como outputs descargables TODOS los archivos que cambiaron
4. Si `ecosystem.json` cambió: regenerar también `ecosystem.md` y `ecosystem_filemap.md` completos desde el JSON
5. REGLA CRÍTICA DE NOMENCLATURA: outputs con nombre EXACTO del archivo en el repo, sin prefijos de marca
   → `session_log.md` · `brand.json` · `ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `BP_Brand_Context.md` · `SESSION_PROTOCOL.md` · `SKILL.md` · `INDEX.md`
6. Incluir siempre `session_log.md` con novedades añadidas al tope
7. Proveer mensaje de commit listo para pegar con rutas exactas en el repo
8. Recordar a Sam: marcas → `brands/[Marca]/` · ecosistema → raíz · agente → `agents/social-media-agent/` · protocolos → `protocols/` · skills → `skills/[nombre]/SKILL.md` · index → `skills/INDEX.md`
9. Verificar post-commit con `Vercel:web_fetch_vercel_url` y confirmar: "Listo Sam. Sistema actualizado."

10. **BARRIDO DE ARCHIVADO — se ejecuta en CADA Actualiza, sin excepción.**

    **Por qué existe:** `AGENDA.md` crece de forma monótona. En julio de 2026 pasó de 87 KB a 93 KB en una sola sesión y dejó de caber en una lectura. El archivado se diseñó el 28-jun-2026 (`historical_AGENDA.md`) pero estuvo tres semanas perdido porque **ningún paso del protocolo lo invocaba**. Por eso es un paso fijo del Actualiza y no una tarea periódica: nadie se acuerda de limpiar la agenda cada quince días.

    **CRITERIO — un ítem se archiva SOLO si cumple LAS TRES condiciones:**
    1. Está marcado **✅ completado** (o su fila dice HECHO / CERRADO / RESUELTO).
    2. Han pasado **más de 30 días** desde que se completó.
    3. **NO es referencia activa** — ningún ítem abierto lo cita, ninguna nota de contexto depende de él, no se invoca en sesiones recientes.

    **El tamaño del archivo NO es criterio.** Si `AGENDA.md` pesa 200 KB y todo está pendiente, no se archiva nada. Si pesa 40 KB y hay ítems cerrados hace 40 días sin referencias, se archivan. El criterio es del ÍTEM, nunca del archivo.

    **La condición 3 es la que evita el error caro.** Hay ítems cerrados hace meses que se siguen citando en cada sesión (p. ej. #47 Expert/Boids): archivarlos por antigüedad rompería las referencias cruzadas de toda la AGENDA. Ante la duda sobre si algo es referencia activa: **NO archivar** y anotarlo como candidato para la próxima vuelta.

    **PROCEDIMIENTO:**
    a. Recorrer `AGENDA.md` buscando ítems que cumplan las 3 condiciones.
    b. **Si ninguno cumple:** declarar "sin ítems archivables en esta pasada" y continuar. **Esto es lo normal.** La mayoría de los Actualiza no archivan nada, y eso es correcto — no forzar.
    c. **Si alguno cumple:** PROPONER a Sam la lista (números + título + fecha de cierre) y **ESPERAR su confirmación antes de mover nada**. El archivado se propone, nunca se ejecuta en silencio.
    d. Con la confirmación de Sam, por cada ítem aprobado:
       - **MOVER el texto íntegro** a `historical_AGENDA.md` (raíz del repo). Cortar y pegar: **nunca resumir, nunca reescribir, nunca reordenar el contenido interno**.
       - En `historical_AGENDA.md` va bajo un encabezado de fecha de migración: `## Migración YYYY-MM-DD`. Las migraciones se apilan con la más reciente al tope; las anteriores nunca se tocan.
       - En `AGENDA.md` **NO queda hueco**: donde estaba el ítem queda una línea de una sola frase — `| N | → archivado YYYY-MM-DD · ver historical_AGENDA.md |` — para que las referencias cruzadas por número no se rompan.
    e. Reportar a Sam los números archivados y el nuevo tamaño de ambos archivos.

    **Primera migración de referencia (28-jun-2026):** archivó Sprint Sembrador T1–T4 + #48, #5i (Genoma Lucien v1.0, cerrado 19-jun), tres filas "done" de bloqueos de Sam (Vertex creds 22-jun, secrets auth Sembrador 26-jun, Cloud Vision API 27-jun), y el bloque `## ✅ Resuelto recientemente`. Sirve como ejemplar del criterio aplicado.

---

## HRD_PROFESSOR

**Trigger:** Sam menciona "Professor", "professor checkpoint", "learnings", "decisión del professor", "aprobar learnings"

**Verificación:** "Ok Sam, querés interactuar con el sistema Professor — [acción específica]. Sin alterar el protocolo, correcto? Me faltan estos datos: [si aplica]."

### Arquitectura de acceso

Las Edge Functions del Professor viven en Supabase (`amlvyycfepwhiindxgzw`). `web_fetch` no puede acceder a `*.supabase.co` directamente — dominio bloqueado en el sandbox de Claude.

**Solución implementada:** proxy `/api/professor` en `unrlvl-context.vercel.app` — mismo patrón que `/api/gh`. El proxy recibe la acción desde Claude, añade `PROFESSOR_SECRET` desde env var de Vercel, y reenvía a la EF. Claude accede vía `Vercel:web_fetch_vercel_url`.

**Estado del proxy:**
- ✅ **CONSTRUIDO Y VIVO** (verificado 2026-07-18). Vive en `unrlvl-context/api/professor.js`.
- ⚠️ **GOTCHA:** `action=ping` **NO es una acción válida** y devuelve 500 (`SyntaxError: Unexpected end of JSON input`). Verificar la existencia del proxy con **`action=checkpoint`**, que responde 200. Usar `ping` hace que el paso 1 de abajo concluya erróneamente que el proxy no existe y active el fallback sin necesidad.
- El fallback documentado abajo sigue vigente solo para el caso de que el proxy caiga de verdad.

**URL del proxy (cuando exista):**
```
GET https://unrlvl-context.vercel.app/api/professor?action=[action]&[params]
```

Acciones disponibles: `checkpoint` · `evaluate` · `log-case` · `submit-learning` · `approve-learning` · `get-context`

### Pasos inviolables

1. Verificar si el proxy `/api/professor` está vivo:
   Fetch `https://unrlvl-context.vercel.app/api/professor?action=checkpoint` vía `Vercel:web_fetch_vercel_url`
   → Si responde 200: usar el proxy para todos los pasos siguientes
   → Si responde 404/error: activar FALLBACK
   **NO usar `action=ping`** — no es acción válida, devuelve 500 aunque el proxy esté sano (ver GOTCHA arriba).

2. Identificar la acción solicitada y ejecutarla:

   **checkpoint:**
   `GET /api/professor?action=checkpoint`
   → Muestra estado completo del Professor: criterios activos, vetos, casos recientes, learnings pendientes

   **evaluar decisión:**
   `GET /api/professor?action=evaluate&decision=[descripción]`
   → Evalúa una decisión contra criterios y vetos activos

   **revisar learnings pendientes:**
   `GET /api/professor?action=get-context`
   → O directamente: `Supabase:execute_sql` → `SELECT * FROM professor_learnings WHERE approved_by_sam = false`
   → Listar uno por uno. Esperar decisión de Sam por cada uno antes de continuar.

   **aprobar learning:**
   `POST /api/professor?action=approve-learning&id=[id]`

   **loguear caso:**
   `POST /api/professor?action=log-case` con payload del caso

3. Mostrar respuesta completa sin filtrar
4. Si hay learnings pendientes de aprobación tras cualquier acción: listarlos y esperar decisión de Sam por cada uno

### FALLBACK — mientras el proxy no exista

Para LECTURA (siempre funciona):
- `Supabase:execute_sql` en proyecto `amlvyycfepwhiindxgzw` para queries directas a tablas professor_*

Para ESCRITURA / EF invocations:
- Declarar: "Necesito invocar [nombre-EF] con este payload: [payload completo]. No puedo acceder directamente — ejecutar desde terminal o construir el proxy primero."
- Proporcionar el curl exacto para que Sam lo ejecute:
```bash
curl -X POST https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/[ef-name] \
  -H "Authorization: Bearer [PROFESSOR_SECRET]" \
  -H "Content-Type: application/json" \
  -d '[payload]'
```

**Deuda técnica — ✅ SALDADA (verificado 2026-07-18):** el proxy `/api/professor` existe en `unrlvl-context/api/professor.js` (2.530 bytes) y responde. Texto original de la deuda, conservado como histórico: *construir `/api/professor` proxy en `unrlvl-context` con las mismas convenciones que `/api/gh`. Añadir `PROFESSOR_SECRET` como env var en Vercel del proyecto context.*

---

## HRD_ECOSYSTEM_AUDIT

**Trigger:** Sam escribe "ecosystem scan", "ecosystem audit", o variantes

**Verificación:** "Ok Sam, querés un ecosystem audit. Sin alterar el protocolo, correcto? Antes de proceder necesito una respuesta:"

**PREGUNTA OBLIGATORIA — STOP hasta recibir respuesta:**

> "¿Lo querés identificativo (mapear qué hay y dónde, sin leer código) o contextual (leer y entender TODO el código, sus relaciones y su estado real en el ecosistema)?"

---

### MODO IDENTIFICATIVO

Objetivo: saber qué existe y dónde. No leer contenido de código.

**Pasos inviolables — confirmar cada uno antes de pasar al siguiente:**

**BLOQUE 1 — Context System**
1. Fetch `ecosystem.json` → confirmar: versión, marcas, labs, infra
2. Fetch `AGENDA.md` → confirmar: prioridades y pendientes
3. Fetch `skills/INDEX.md` → confirmar: skills activos y pendientes

**BLOQUE 2 — Vercel**
4. `Vercel:list_projects` (team `unrealvillestudio-projects`) → confirmar: todos los proyectos, estado, último deploy, URL
5. Por proyecto con anomalía (`live:false`, último deploy antiguo, errores): confirmar flag

**BLOQUE 3 — GitHub repos**
6. Fetch `https://unrlvl-context.vercel.app/api/gh?action=repos` → confirmar: repos activos, visibilidad, fecha último commit
7. Por cada lab/repo activo: fetch árbol `?action=tree&repo=[REPO]` → confirmar: estructura de carpetas, archivos principales, tamaños llamativos

**BLOQUE 4 — Supabase**
8. Query conteo de tablas por schema: `SELECT table_schema, COUNT(*) FROM information_schema.tables WHERE table_schema IN ('public','content','crm','intel','shopify','fph') GROUP BY table_schema`
   → Confirmar: conteos actuales vs documentados en ecosystem.json
9. `Supabase:list_edge_functions` proyecto `amlvyycfepwhiindxgzw` → confirmar: total EFs, estado de las críticas
10. Query known_bugs activos: `SELECT * FROM public.pipeline_skills WHERE active = false` y tablas con datos inesperados

**BLOQUE 5 — Marcas activas**
11. Por cada marca en ecosystem.json con `status: active`:
    Fetch `brands/[Marca]/brand.json` → confirmar: health, alerts nivel blocking/critical, gaps

**BLOQUE 6 — Agents**
12. Por cada agente en ecosystem.json: fetch URL `/` vía `Vercel:web_fetch_vercel_url` → confirmar: responde o no responde

**OUTPUT:** mapa completo. STOP. Esperar instrucción de Sam.

---

### MODO CONTEXTUAL

Objetivo: leer y entender TODO — código, relaciones, estado real vs documentado.

**Pasos inviolables:**

**FASE 1 — Ejecutar MODO IDENTIFICATIVO completo (todos los bloques)**

**FASE 2 — Lectura de código por lab/repo**
1. Por cada lab activo identificado en Fase 1:
   Fetch todos los archivos relevantes del árbol via gh proxy (prioridad: `api/`, `src/services/`, `src/lib/`, `src/config/`)
   → Leer completo. Confirmar por archivo: "[path] — [una línea de qué hace]"
2. Archivos de configuración: `package.json`, `vite.config.ts`, `vercel.json`
3. Skills activos: fetch y leer cada `SKILL.md` referenciado en INDEX

**FASE 3 — Supabase profundo**
4. Por cada tabla clave: query schema real + muestra representativa de datos
   Tablas prioritarias: `brands`, `pipeline_skills`, `output_templates`, `brand_voice_genome`, `creative_compatibility_rules`, `lab_configs`, `agents`
5. Edge Functions críticas: fetch código fuente via Supabase MCP o proxy cuando esté disponible
6. Verificar env vars declaradas en ecosystem.json vs estado real en Vercel (sin mostrar valores)

**FASE 4 — Cruce y gaps**
7. Código real vs ecosystem.json documentado → gaps e inconsistencias
8. Tablas Supabase vs lo que los labs usan realmente → tablas fantasma o datos faltantes
9. Dependencias cruzadas entre labs no documentadas
10. Deuda técnica visible en código que no esté en AGENDA → declararla

**OUTPUT:** estado real del ecosistema + gaps + inconsistencias + riesgos. STOP. Esperar instrucción de Sam.

---

## TABLA RESUMEN DE HRDs

| HRD | Trigger | Acción |
|-----|---------|--------|
| `HRD_PROTOCOLO_ACTUALIZACION` | "protocolo actualización" | Carga ecosystem + AGENDA + INDEX + contexto de marca/proyecto |
| `HRD_ACTUALIZA` | "Actualiza" | Verifica SMA + genera outputs + commit message + verifica + **barrido de archivado (paso 10)** |
| `HRD_PROFESSOR` | "Professor" / "learnings" / "checkpoint" | Interacción con Professor via proxy (o fallback SQL+curl) |
| `HRD_ECOSYSTEM_AUDIT` | "ecosystem scan/audit" | Audit identificativo o contextual — pregunta obligatoria primero |

---

## LO QUE NUNCA HACE UNA HRD

- No se reemplaza por "lo que parece más útil"
- No se omite porque "ya lo hice antes en esta sesión"
- No se adapta porque "el contexto es diferente"
- No se bypasea por ninguna razón

Si hay conflicto entre una HRD y cualquier otra instrucción: la HRD gana.

---

_HRD Protocol v1.3 · UNRLVL Studio · 2026-07-18_
