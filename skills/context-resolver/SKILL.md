# SKILL — context-resolver

**Versión:** v1.0 · **Creado:** 2026-08-16 · **Naturaleza:** skill transversal, carga en apertura
**Destino en el repo:** `skills/context-resolver/SKILL.md`
**Consumidores:** Claude.ai (chat) · Sam · CC (solo §7, formato de brief)
**Se carga:** en la apertura de sesión, junto con `ecosystem.json`, `AGENDA.md`, `skills/INDEX.md`,
`CAPABILITIES.md` y `protocols/MULTIBRAND_RULE.md`. No es bajo demanda.

> ## ⚠️ ESTE SKILL NO ES LA FUENTE
>
> **La fuente es `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md`** (v1.0, 2026-07-29). Ese documento
> define la invariante, las cinco capas, la preferencia de destino y las diez reglas duras de la
> capa de conocimiento. **Este skill no las repite: las ejecuta.**
>
> Concretamente, este skill es **el procedimiento operable de sus fases 1 y 2**:
> - **Fase 1** — *"L1 barrido de deudas: la capa ESTADO deja de narrarse"* → §3 de este skill.
> - **Fase 2** — *"Depurar AGENDA: 160 KB → ~15 KB"* → §2 y §6 de este skill.
>
> Si algo de aquí contradice a `ARQUITECTURA_DEL_CONOCIMIENTO.md`, **manda ARQUITECTURA**. Si algo
> de aquí empieza a repetir su contenido, se poda: quince copias de una regla producen quince
> versiones divergentes — el antipatrón que ya costó caro con `_naming_rule`.

---

## 0. POR QUÉ EXISTE

`ARQUITECTURA_DEL_CONOCIMIENTO.md` diagnosticó el problema el 29-jul y escribió la cura en seis
fases. **Ninguna de las fases 0, 1 y 2 se ejecutó.** El documento quedó sin correr — que es, con
precisión incómoda, el mismo fallo que él mismo describe en su §6:

> *"el archivado se diseñó el 28-jun-2026 pero estuvo tres semanas perdido porque **ningún paso del
> protocolo lo invocaba**"*

Un plan por fases no es ejecutable por sí solo: dice **qué** hay que lograr, no **cómo** se hace ni
**cuándo** corre. Este skill aporta exactamente eso, y se carga en apertura para que no dependa de
que alguien se acuerde.

**La evidencia que lo motivó.** El 2026-08-16, el barrido de archivado devolvió cero por tercera
Actualiza consecutiva. La verificación contra Supabase y los repos encontró, en una sola pasada,
**cuatro ítems declarados pendientes que estaban resueltos**:

| Ítem | Decía el context file | Había |
|---|---|---|
| `FOCO INMEDIATO` / PR #13 | "escribir los 6 módulos → desbloquea el PR" | PR mergeado hacía un mes; 9 módulos reales en `Orchestrator/api/craft-modules/` |
| `#45` — bucles de Marisol | "faltan los 4 bucles restantes" | Los 4 `converged` (11, 12, 15 y 19 turnos) |
| `5s` — limpieza de queue | "~283 cadáveres con `brand_id=null`" | Queue de 20 filas, **0** con `brand_id` NULL |
| Fase 4 del dry-run | "no quitar `.limit(1)` sin limpiar antes" | `.limit(1)` retirado y queue limpia |

Ninguno estaba marcado ✅. Ninguno lo habría estado nunca: **el trabajo se hizo y nadie volvió a
anotarlo.** Las tres condiciones de archivado verificaban la ANOTACIÓN, no el HECHO — así que los
cuatro habrían quedado retenidos indefinidamente mientras `AGENDA.md` declaraba urgente un bloqueo
inexistente.

Ese es el fallo que este skill corrige, y la cura es la regla dura 4 de ARQUITECTURA llevada a
procedimiento: **preguntarle al sistema en vez de al archivo.**

---

## 1. PRINCIPIO OPERATIVO PROPIO

ARQUITECTURA ya fija las reglas de fondo. Este skill agrega **una sola** que es suya, porque nace
del hallazgo de arriba:

> **LA FUENTE MANDA SOBRE EL REGISTRO.** Cuando un context file y la DB (o el código) discrepan,
> gana la fuente. Sin discusión, sin "verificar más". El context file se corrige.

Corolario, que es la regla dura 4 de ARQUITECTURA en forma accionable: **si un dato se puede
consultar, no se escribe.** UUID, conteo de filas, versión de EF, estado de un genoma → se
consultan. Solo se escribe lo que no tiene fuente consultable: **decisiones y sus porqués**.

**Cero estado.** Este skill no guarda ningún hecho sobre el ecosistema: ni qué está cerrado, ni qué
marca tiene genoma, ni qué EF está desplegada. Guardar eso lo convertiría en un context file más
divergiendo. Guarda **cómo averiguarlo**.

---

## 2. LAS CUATRO CONDICIONES DE ARCHIVADO

Un ítem se archiva si cumple **1+2+3** (vía normal) **o bien 4+3** (vía alterna).

**Condición 1 — Completado.** Marcado ✅, o su fila dice HECHO / CERRADO / RESUELTO.

**Condición 2 — Más de 30 días desde el cierre.** Corte móvil: hoy menos 30 días.

**Condición 3 — No es referencia activa.**
- **Descalifica si:** (a) un ítem ABIERTO depende del candidato · (b) `ecosystem.json` lo usa como
  estado vivo (tabla, EF, vista o campo que existe hoy) · (c) aparece en `AGENDA.md` **fuera de la
  zona de completados**.
- **NO descalifica si:** solo aparece en un `session_log.md` como registro fechado · aparece en
  `ecosystem.json` dentro de un bloque `_update_*` o nota histórica.

**Condición 4 — Resuelto por vía alterna.** *(nueva, 2026-08-16)*
Un ítem se archiva **aunque no esté marcado ✅** si se cumplen las tres:
- (a) su **objetivo declarado** está satisfecho en producción, **verificado contra código o DB** —
  jamás contra context files; **y**
- (b) el mecanismo que lo satisface es **distinto** del que el ítem especificaba; **y**
- (c) queda **constancia escrita** de la vía real (formato en §5).

**No aplica si el objetivo está satisfecho parcialmente. Parcial es abierto, sin excepción.**

> **Por qué (c) no es formalidad.** La condición 4 sustituye un criterio duro ("¿tiene un ✅?") por
> uno de juicio ("¿es esto lo mismo?"). Sin la nota se degrada en excusa para limpiar y se pierde el
> rastro de por qué el sistema hace lo que hace. **Un archivado por vía alterna sin nota es peor que
> no archivar.**

**Lo que NO es criterio:** el tamaño de `AGENDA.md`. El criterio es del ítem, nunca del archivo. Si
nada cumple, se declara *"sin ítems archivables en esta pasada"* y se cierra. Eso es lo normal.

**Ante la duda: NO archivar.** Anotar como candidato para la próxima vuelta.

---

## 3. PASO 10-BIS — VERIFICACIÓN CONTRA FUENTE

*(Es la fase 1 de ARQUITECTURA — "L1 barrido de deudas" — hecha procedimiento.)*

Corre **antes** del barrido de archivado, en cada Actualiza. Vale más que el archivado en sí: el
archivado ordena el pasado; esto corrige el presente.

**Alcance por pasada:** los ítems abiertos **más viejos**, empezando por los que encabezan el
archivo (`FOCO INMEDIATO`, bloqueantes declarados). Un ítem con más de tres semanas abierto y sin
movimiento es sospechoso por definición.

**Procedimiento, por ítem:**

1. **Leer el objetivo, no la tarea.** El ítem dice "escribir los 6 módulos"; el objetivo es "que el
   bucle de calibración opere el arsenal". Se verifica el objetivo.
2. **Formular la consulta que lo decide.** Una sola, que devuelva un hecho, no una impresión.
3. **Ejecutarla contra la fuente** (§4).
4. **Clasificar:** CERRADO · CERRADO — VÍA ALTERNA (§5) · ABIERTO · **ABIERTO PARCIAL** (el más
   peligroso: parece cerrado y no lo está).
5. **Anotar el hallazgo**, esté cerrado o no. Un ítem verificado como abierto también gana: pasa de
   "creemos que falta" a "falta esto, medido".

**Regla de oro:** *ninguno de los cuatro fantasmas del 2026-08-16 se descubrió leyendo el ítem. Los
cuatro se descubrieron preguntándole al sistema si el problema todavía existía.*
`SELECT COUNT(*) WHERE brand_id IS NULL` resolvió en un segundo lo que seis semanas de context files
declaraban pendiente.

---

## 4. DÓNDE SE PREGUNTA CADA COSA

Mapa de fuentes. **No memoriza respuestas — memoriza dónde vive la verdad.**

| Si el ítem trata de… | La fuente es… | Cómo |
|---|---|---|
| Un genoma de voz | `public.brand_voice_genome` | `WHERE brand_id=… AND active=true ORDER BY version DESC` |
| Una calibración / bucle Boids | `intel.calibration_sessions` + `intel.calibration_turns` | `status` + conteo de turnos. **El veredicto está en `verdict_voice` y el literal es `si`/`no` en MINÚSCULA**; `verdict_operator` lleva el nombre del operador. Contar con `lower()` |
| Temas / agenda de una marca | `intel.brand_topics` | conteo por `brand_id`, `active` |
| La cola del carril | `intel.iid_content_queue` | total, `brand_id IS NULL`, `domain IS NULL` |
| Una Edge Function | herramienta `list_edge_functions` | **la versión real es el sufijo de `entrypoint_path`**, no el comentario de cabecera. No existe `supabase_functions.functions` |
| Una tabla/columna/extensión | `information_schema` / `pg_extension` | existencia, no suposición |
| Código de un repo | proxy gh | `…/api/gh?action=file&repo=X&path=Y` (`action=tree` para el árbol) |
| Un PR (abierto/mergeado) | **no hay acceso** | el proxy sirve archivos y árboles, no la API de pulls. Se infiere por diff rama↔`main`, o **lo confirma Sam**. Nunca se afirma |
| Costo / tarifa | `ops_lab_rates` vía `ops_resolve_rate` | fuente única; cero literales |

**Reglas de la herramienta (evitan falsos negativos):**
- `execute_sql` para lecturas y DML; `apply_migration` para DDL.
- Angle brackets y paréntesis en literales rompen el parser MCP. Dollar-quoting (`$txt$…$txt$`) para
  prosa larga.
- Tablas siempre schema-qualified (`intel.brand_topics`, nunca `brand_topics`).
- El estático de Vercel puede ir atrasado respecto a `main`: verificar por el proxy gh, jamás
  derivar estado del sitio estático.
- **Un `COUNT` que da 0 se verifica antes de concluir.** El 2026-08-16 un `si = 0` sobre 17 sesiones
  parecía indicar calibraciones vacías; el literal era minúscula y había 109 SÍ. Consulta mal
  escrita se parece a hallazgo.

---

## 5. FORMATO DE LA NOTA DE VÍA ALTERNA (obligatorio)

```
RESUELTO POR VÍA ALTERNA — el plan decía [X], se resolvió con [Y].
Verificado en [artefacto concreto: tabla/consulta/archivo:línea/PR] el [fecha].
```

Ejemplo real (2026-08-16):

```
RESUELTO POR VÍA ALTERNA — el plan decía escribir 6 módulos de runtime en
unrlvl-context antes del merge; se mergeó el mecanismo (PR #13) y los 9 módulos
reales viven en Orchestrator/api/craft-modules/, leídos por _craftModules.ts con
readFileSync + includeFiles. Verificado en el árbol de Orchestrator@main y en
core.md (2.473 b, contenido íntegro) el 2026-08-16.
```

La nota debe permitir que alguien, dentro de un año, entienda **por qué el sistema hace lo que hace**
sin volver a investigarlo. Si no lo permite, está mal escrita.

---

## 6. DÓNDE SE REGISTRA CADA COSA

*(Aplicación de las cinco capas de ARQUITECTURA §2. Este skill no las redefine: enruta.)*

Antes de escribir cualquier cosa en un context file, clasificarla:

| Naturaleza | Qué es | Dónde va |
|---|---|---|
| **ESTADO** | Foto de cómo estaban las cosas en una fecha. Caduca por definición | `historical_AGENDA.md` (raíz, alcance ecosistema) si ya caducó; o el `session_log.md` de la marca/proyecto como registro fechado |
| **DECISIÓN de método** | Cómo se hace bien algo. Capa MÉTODO = cargable | El **skill del dominio** (`genome-calibration`, `content-pipeline`, `voice-craft`…) |
| **DECISIÓN de arquitectura del conocimiento** | Dónde vive el conocimiento y quién lo carga | `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` — **solo esto**, no es depósito de decisiones de dominio |
| **REGLA dura de un repo** | Gotcha o convención de **ese** stack | `.github/CLAUDE.md` de ese repo (canónico — ver §6.1) |
| **DATO** | Hecho consultable: UUID, conteo, versión, nombre de columna | **A ningún archivo.** Vive en la DB o el repo; se consulta |

**El test, en una pregunta:** *¿esto lo puedo averiguar preguntando?* Si sí, es DATO y no se escribe.
Si no: ¿describe cómo estaban las cosas (ESTADO), cómo se hace algo (MÉTODO) o dónde vive el
conocimiento (ARQUITECTURA)?

**Trampa a evitar:** mandar una decisión de dominio a `ARQUITECTURA_DEL_CONOCIMIENTO.md` porque
"es una decisión". Ese documento gobierna el enrutamiento del conocimiento, no el contenido de las
disciplinas. *"El `voice_id` técnico es salida, no entrada"* es método de calibración → va a
`skills/genome-calibration/SKILL.md`.

**Regla dura de los context files:** nunca se reemplazan — se actualizan preservando historia
(nuevo al tope, anterior archivado, nunca borrado).

### 6.1 · Canónico de `CLAUDE.md` — RESUELTO (2026-08-16)

`ARQUITECTURA` §11 dejó D1 abierto: *"¿`/CLAUDE.md` o `/.github/CLAUDE.md`?"*. **Estaba resuelto de
hecho y sin declarar. Canónico: `.github/CLAUDE.md`.** Evidencia:

- `MULTIBRAND_RULE` §7.0 punto 5 instaló ahí el bloque de la regla en 16 repos, y lo llama *"el más
  importante de todos… el único que no depende de que alguien se acuerde"*.
- El 2026-08-13 **CC operó con `CC_PROTOCOL.md` bloqueado por egress, sostenido solo por el bloque
  de `.github/CLAUDE.md`**. Prueba operativa de que es el que carga.
- Tamaño: 608 b el 29-jul → 1.972 b hoy, exactamente el crecimiento del bloque multimarca.

`/CLAUDE.md` (9.205 b) queda como **legacy**: no se le añade contenido nuevo; se poda en PR aparte.

---

## 7. REPARTO DE ROLES (inviolable)

| Actor | Hace | No hace |
|---|---|---|
| **Claude.ai** | Recorre, verifica contra fuente, aplica las 4 condiciones, **propone** la lista, escribe las notas y arma el brief | No escribe en el repo. No archiva por su cuenta |
| **Sam** | Aprueba **ítem por ítem**. Mergea y borra la rama por GitHub Web UI | — |
| **CC** | Ejecuta **solo lo aprobado**: rama, edición in-place, commit, push de rama, PR contra `main` | Nunca pushea a `main`. Nunca mergea. Nunca resume ni reescribe el texto que mueve |

> **"El archivado se propone, nunca se ejecuta en silencio."**

**Procedimiento de CC tras aprobación:**
- Mover el **texto íntegro**. Cortar y pegar: nunca resumir, nunca reescribir, nunca reordenar.
- En `historical_AGENDA.md`, bajo `## Migración YYYY-MM-DD`, con nota del barrido (criterio, corte,
  y Grupo B retenido con su motivo). **Migraciones al tope; las anteriores no se tocan nunca.**
- En `AGENDA.md` **no queda hueco**: donde estaba el ítem queda
  `| N | → archivado YYYY-MM-DD · ver historical_AGENDA.md |`.
- `old_str` se toma **del repo** (`git show main:[ruta]`), nunca del estático de Vercel ni del brief.
  Si un `str_replace` no matchea exacto y una sola vez: **detenerse y reportar**.
- Reportar números archivados y tamaño nuevo de ambos archivos.

---

## 8. ARCHIVADO DE DOCUMENTOS EN `protocols/archive/`

1. **Antes de archivar se extrae su contenido vigente** al lugar que corresponda según §6. El
   documento se archiva **vacío de contenido vivo**.
2. Se añade su fila al `README.md`: `Archivo | Archivado | Por qué | Qué se rescató antes`.
3. Un documento con **un solo criterio abierto de ocho** no se completa para poder archivarlo: se
   **extrae** ese criterio a la AGENDA como ítem con dueño, y el documento se archiva.

> **Regla dura:** nunca se toca producción **para poder archivar un archivo**. El archivado es el
> residuo de cerrar un frente porque el negocio lo necesitaba, jamás el motivo para abrirlo. En el
> momento en que el estado de la AGENDA dicta qué se toca en producción, el registro pasó a mandar
> sobre la operación — y eso es exactamente al revés.

---

## 9. LO QUE ESTE SKILL NO ES

- **No es la fuente.** Lo es `ARQUITECTURA_DEL_CONOCIMIENTO.md`. Este skill la ejecuta.
- **No es un grafo vivo ni un observador.** Es un archivo estático: no corre entre sesiones, no
  observa nada, no se entera de lo que pasa. Lo único vivo son Supabase y los repos.
- **No sustituye a `ecosystem.json` ni a `AGENDA.md`.** Los usa y los corrige.
- **No archiva.** Propone. La aprobación es de Sam; la ejecución, de CC.
- **No es un auditor bajo demanda** (`ecosystem-auditor`, `supabase-auditor`). Aquellos corren
  cuando Sam los invoca y preguntan *"¿identificativo o contextual?"*. Este se carga siempre y no
  pregunta nada: es método de fondo, no una pasada.
- **No guarda respuestas.** Si en algún momento este archivo contiene una lista de qué está cerrado,
  está roto y hay que podarlo.

---

## 10. CHECKLIST DE CIERRE DE SESIÓN

```
[ ] Paso 10-bis corrido sobre los ítems abiertos más viejos
[ ] Hallazgos anotados (cerrados Y abiertos verificados)
[ ] Las 4 condiciones aplicadas ítem por ítem
[ ] Lista propuesta a Sam — STOP hasta aprobación ítem por ítem
[ ] Notas de vía alterna escritas para todo archivado por condición 4
[ ] Todo lo que se escribe clasificado según §6
[ ] Ningún DATO consultable escrito en un .md
[ ] Brief a CC con: rama, si publica rama, si abre PR, quién mergea
[ ] Orden respetado: Professor → Actualiza → commit único
```

---

_Fin · context-resolver v1.0 · ejecuta las fases 1–2 de `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md`
· método, cero estado · Unreal>ille Studio_
