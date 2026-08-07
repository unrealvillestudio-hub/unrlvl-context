# MULTIBRAND RULE — UNRLVL

**Versión:** v1.0 · **Creado:** 2026-08-07 · **Naturaleza:** REGLA INVIOLABLE del ecosistema
**Destino en el repo:** `protocols/MULTIBRAND_RULE.md`
**Consumidores:** Claude.ai (chat), Claude Code (CC), Sam (revisión de PR)
**Precedente:** `ecosystem.json → labs._note` — misma naturaleza, misma fuerza. Aquella regla nació de `buildFromGenome`; esta nace del hardcode de marca.

---

## 0. POR QUÉ EXISTE

UNRLVL no es una marca con un sistema. **Es un sistema que opera N marcas.** El pipeline no instancia un agente por marca: puebla la marca y el runtime la resuelve por `brand_id`. Multimarca no es una feature del ecosistema — es su forma.

Y aun así, el ecosistema se llenó de código donde **el eje del sistema lleva el nombre de la primera marca que lo necesitó**. Cinco casos verificados contra la fuente el 2026-08-07, todos en producción:

| Dónde | Qué se cableó | Consecuencia |
|---|---|---|
| `iid-core/fanout.ts` | `[vbd["social"], vbd["editorial"]]` | Toda clave de `voice_by_destination` que no sea una de esas dos es **invisible al fan-out**. Una voz `professional` no puede existir. |
| `content-run-stage` | `resolveVoiceDestination` devuelve `"editorial"｜"social"`; de ahí cuelgan longitud (4000 vs 640), firma y cierre | Un destino nuevo pasa el fail-loud y luego es tratado como social. Un carrusel técnico saldría con 640 caracteres. |
| `content-run-stage → AUDIENCE_FRAMES` | claves `jd` / `doliente`, con textos redactados para ForumPHs | El eje real es el PODER del lector sobre la contratación, que es universal; el nombre lo tomó de una jurisdicción panameña. Ninguna otra marca puede declarar frente sin fail-loud. |
| `content-run-stage → CANAL_BY_PLATFORM` | `EMAIL_PROPIETARIOS: NONE`, sin `EMAIL` genérico | Cualquier email que no sea de ForumPHs cae al default `INSTAGRAM_FEED` y **genera imagen**: el 58,7% del costo por pieza, en la superficie donde la imagen además daña la entregabilidad. |
| `iid-core/fanout.ts → OBJECTIVE_LABEL_TO_TAG` | 17 etiquetas, todas del vocabulario de ForumPHs (`jd__reclutar_gancho`, `dol__sembrar_gancho`…) | Cada marca nueva que declare objetivos con su propio vocabulario exige editar código. El mapa crece por marca, no por eje. |

Ninguno fue un descuido aislado: es **un patrón**. Se construye para la marca que está delante y el eje queda bautizado con su vocabulario. La siguiente marca no puede entrar sin tocar código, y el sistema deja de ser multimarca en los hechos aunque lo sea en el discurso.

**Responsabilidad declarada:** el hardcode entró por briefs que Claude.ai escribió y que CC ejecutó fielmente. La regla existe para que ninguno de los dos vuelva a producirlo.

---

## 1. LA REGLA

> **El EJE es del sistema y va en el CÓDIGO. La INSTANCIA es de la marca y va en el DATO.**
>
> Ningún identificador de marca, dominio, jurisdicción, plataforma comercial o vocabulario de un cliente puede aparecer como constante, clave, valor de `CHECK`, rama de condicional o literal de prompt dentro de una capa compartida. Si algo distingue a una marca de otra, es dato: vive en una tabla, se lee en runtime y se resuelve por `brand_id`.
>
> Cuando una capa compartida necesita un concepto nuevo, **el concepto se nombra por lo que hace en el sistema, jamás por cómo lo llama la marca que lo pidió primero.**

**Corolario:** que una marca sea hoy la única que usa un eje **no lo convierte en suyo**. NeuroneSCF es la única con voz editorial y ForumPHs la única con frente de audiencia: ninguno de los dos ejes les pertenece.

---

## 2. EL TEST DE LA MARCA N+1 (obligatorio, antes de escribir)

Antes de crear una constante, una columna, un `CHECK`, un enum, una clave de JSONB o una rama de condicional, responder por escrito:

1. **¿Sobrevive a que entre otra marca de otro rubro y otro país?** Si para incorporarla hay que editar este archivo, el eje está mal puesto.
2. **¿El nombre describe la FUNCIÓN o el CASO?** `jd` es un caso; `decide` es una función. `EMAIL_PROPIETARIOS` es un caso; `EMAIL` es una superficie.
3. **¿Esto es eje o es instancia?** Si es instancia y está en código, va a una tabla.
4. **¿Cuántas marcas hay hoy en esta enumeración?** Si es una, el eje probablemente se nombró con su vocabulario.

Las cuatro respuestas van **en el brief y en el cuerpo del PR**. No es ceremonia: es el único punto del proceso donde el hardcode todavía es barato de evitar.

---

## 3. ALCANCE — DÓNDE APLICA

Aplica a **toda capa compartida**, que es cualquier cosa que más de una marca atraviesa:

- **Edge Functions y código del carril** — `iid-core`, `content-dispatcher`, `content-run-stage`, `content-watcher`, `approve-piece`, `aife-filter`, y sus módulos.
- **Labs** — CopyLab, ImageLab, SocialLab y los demás. Un lab sirve a N marcas por definición.
- **Supabase** — nombres de tabla y columna, `CHECK`, enums, triggers de validación, vistas, funciones, políticas RLS, y el vocabulario de todo catálogo (`psycho_presets`, `creative_vectors`, `tension_architectures`, `aggro_presets`, `content_type_registry`, `platform_canal_map`).
- **Prompts y bloques de instrucción** inyectados por el pipeline.
- **Skills y protocolos** — un skill que sólo sirve a una marca se declara exclusivo en `skills/INDEX.md`; uno transversal no lleva vocabulario de marca.

**Excepción única y explícita:** los artefactos declarados **exclusivos de una marca** en `skills/INDEX.md` (hoy `nscf-pricing`, `acta-repair`) y las tablas cuyo nombre ya declara su marca (`nscf_*`, `fphs_*`). Ahí el vocabulario de marca es correcto. Fuera de eso, no.

---

## 4. PATRONES PROHIBIDOS Y SU ALTERNATIVA

| Prohibido | Por qué | Alternativa |
|---|---|---|
| `if (brand_id === "X")` en capa compartida | La marca se resuelve por dato, no por rama | Columna en `brands` o en `brand_topics` que el runtime lee |
| Enumerar claves fijas de un JSONB abierto | Cierra el eje a los valores de hoy | Iterar el objeto: `Object.keys` / `Object.values` |
| `CHECK (col = ANY(ARRAY['jd','doliente',…]))` con vocabulario de una marca | Toda marca nueva exige DDL | Catálogo en tabla propia + FK, o `CHECK` con vocabulario funcional |
| Constante nombrada por el caso de una marca | El eje queda bautizado por esa marca | Nombrarla por la función; la marca entra como fila |
| Mapa que crece con una entrada por marca | El código escala con el negocio | Que la marca declare el dato y el código lea el catálogo |
| Umbrales o longitudes por rama de destino fijo | Un destino nuevo hereda el equivocado | Perfil por destino en tabla, leído en runtime |

---

## 5. QUÉ HACER CON EL HARDCODE QUE YA EXISTE

**No se rompe producción para cumplir la regla.** Migración en dos tiempos, y el orden importa:

1. **PR primero.** El código aprende el eje nuevo **y conserva el vocabulario viejo como alias legacy**, documentado como tal.
2. **DDL después.** Sólo cuando el código ya acepta los valores nuevos se amplía el `CHECK` o se migra el dato.

Hacerlo al revés rompe: ampliar un `CHECK` cuyo valor el builder no tiene cableado produce fail-loud en producción — verificado el 2026-08-07 sobre `AUDIENCE_FRAMES`.

3. **El alias legacy se retira** en un tercer PR, cuando ninguna fila lo use. Se documenta la fecha; no se deja vivo por comodidad.

---

## 6. LO QUE ESTA REGLA **NO** PROHÍBE

Para que no se aplique mal y se degrade:

- **No prohíbe enumerar.** Un mapa explícito con fail-loud sobre lo desconocido es **mejor** que un genérico que degrada en silencio. Lo que se prohíbe es que las entradas de ese mapa sean marcas en vez de ejes.
- **No prohíbe el fail-loud.** Es regla dura del ecosistema y manda sobre la comodidad de la extensibilidad.
- **No obliga a generalizar por adelantado.** Un eje se abre cuando existe la segunda necesidad, no antes. Lo que sí es obligatorio desde el primer día es **el NOMBRE funcional**: renombrar después es caro; nombrar bien al principio es gratis.
- **No aplica a artefactos exclusivos de marca** declarados como tales (§3).

---

## 7. INSTRUCCIONES DE CARGA — POR ACTOR

### 7.0 · Los cinco puntos de carga

Este documento es la **FUENTE ÚNICA**. Los puntos de carga la referencian; **ninguno la copia entera** — quince copias del mismo texto producen quince versiones divergentes, que es el antipatrón que ya costó caro con `_naming_rule`.

| # | Dónde | Qué lleva | Quién lo edita |
|---|---|---|---|
| 1 | `protocols/MULTIBRAND_RULE.md` | **este documento — la fuente** | CC vía PR |
| 2 | `ecosystem.json → multibrand_rule` | clave nueva con la regla en una línea + puntero | CC vía PR |
| 3 | `CAPABILITIES.md` | fila en el mapa, con puntero | CC vía PR |
| 4 | `protocols/CC_PROTOCOL.md` | sección nueva que apunta aquí + el campo `MULTIMARCA:` sumado al reporte de §4 | CC vía PR |
| 5 | **`.github/CLAUDE.md` de cada repo con código** | **bloque corto de §7.4 + puntero** | CC vía PR |
| 6 | `userPreferences` | la apertura confirma **dos** reglas: labs y multimarca | **Sam** |

El punto 5 es el más importante de todos y por eso va aparte: **es el único que no depende de que alguien se acuerde.** `CLAUDE.md` lo lee CC solo al abrir el repo. Los puntos 2-4 dependen de que el brief esté bien escrito; el 6, de la apertura de sesión. El 5 se aplica siempre.

Repos donde va el bloque: `unrlvl-iid-functions`, `Orchestrator`, `CopyLab`, `ImageLab`, `SocialLab`, `AgentLab`, `WebLab`, `BlueprintLab`, `VideoLab`, `VoiceLab`, `NeuroneSCF`, `forumphs-document-factory`, `unrlvl-ops`, `unrlvl-context`. Los MCP (`unrlvl-supabase-mcp`, `unrlvl-meta-mcp`) incluidos: tocan datos de N marcas.

### 7.1 · Claude.ai (chat)
- Se carga en el arranque junto con `ecosystem.json`, `AGENDA.md`, `skills/INDEX.md` y `CAPABILITIES.md`.
- La respuesta de apertura de `HRD_PROTOCOLO_ACTUALIZACION` confirma **dos** reglas, no una: la de labs y la multimarca.
- **Todo brief que Claude.ai le pase a CC y que produzca código, migración o siembra incluye el test de la marca N+1 respondido** (§2). Un brief sin esa sección está incompleto y CC puede rechazarlo.

### 7.2 · Claude Code (CC) — SECCIÓN OPERATIVA

Escrita para ejecutarse, no para leerse. Espeja el patrón de `CC_PROTOCOL.md`: procedimiento + autoverificación en primera persona + campo obligatorio en el reporte.

**Disparador.** Aplica a toda tarea que escriba código, migración, siembra o DDL en capa compartida (§3). Las tareas de solo-lectura quedan fuera. En repos con código, el disparador llega solo: el `CLAUDE.md` del repo (§7.4).

**PASO 1 — Antes de escribir la primera línea.** Responder el test de la marca N+1 (§2) para cada constante, columna, `CHECK`, enum, clave de JSONB o rama nueva. Las 4 respuestas se escriben; no se piensan y se siguen.

**PASO 2 — Si el brief hardcodea marca: DETENERSE.** No se ejecuta y no se corrige por iniciativa propia. Se reporta con este formato exacto:

```
⛔ DETENIDO — REGLA MULTIMARCA
Brief: [tarea]
Hardcode detectado: [archivo:línea o el punto exacto del brief]
Qué es instancia: [el valor de marca que el brief quiere poner en código]
Cuál es el eje: [el nombre funcional que le corresponde]
Propuesta: [eje en código + dónde vive el dato + si hace falta alias legacy]
Orden si toca hardcode existente: PR de código → DDL. No al revés.
```

Un brief de Claude.ai **no es autorización**. Es el mismo deber de detenerse que ya existe cuando un `str_replace` no matchea (`CC_PROTOCOL` §0) o cuando haría falta pushear a `main` (§1): CC no resuelve la ambigüedad por su cuenta, la devuelve.

**PASO 3 — Si el brief llega sin el test respondido y produce código, migración o siembra:** está incompleto. CC lo devuelve pidiendo esa sección. No lo completa él: el test es criterio de arquitectura, no un trámite de formato.

**PASO 4 — Antes de commitear.** Barrido sobre el diff, no sobre el repo entero:

```
git diff --cached | grep -nE 'NeuroneSCF|ForumPHs|LucienSael|UnrealvilleStudio|SamPublisher|D7Herbal|VivoseMask|VizosCosmetics|DiamondDetails|PatriciaOsorio'
```

Todo hit se clasifica a mano en una de tres: (a) **legítimo** — archivo exclusivo de marca declarado (§3), fixture de test, o comentario que documenta un caso; (b) **dato** — literal dentro de un `INSERT`/seed, que es exactamente donde debe estar; (c) **violación** — el identificador gobierna comportamiento en capa compartida. Solo (c) bloquea el commit.

El grep no cubre lo peor: el eje bautizado con vocabulario de marca sin nombrarla (`jd`, `doliente`, `EMAIL_PROPIETARIOS`). Eso solo lo caza la pregunta 2 del test.

**PASO 5 — Autoverificación de cierre.** Antes de declarar terminada la tarea:

> "¿Escribí alguna constante, columna, CHECK, enum o rama cuyo nombre venga del vocabulario de UNA marca? ¿Para meter la marca N+1 haría falta editar un archivo de código? Si la respuesta a cualquiera es sí → DETENER y rehacer con el eje funcional."

**PASO 6 — Campo obligatorio en el reporte.** Se añade al bloque de `CC_PROTOCOL` §4, junto a `PRESERVACIÓN DE CONTEXTO` y `WORKTREES`:

```
MULTIMARCA:
- [test N+1 respondido en el PR | no aplica: tarea de solo-lectura | DETENIDO: ver bloque de detención]
- Ejes nuevos introducidos: [lista con su nombre funcional, o "ninguno"]
- Alias legacy conservados: [lista con fecha de retiro prevista, o "ninguno"]
```

Nunca se omite. Si no aplica, se declara explícito — mismo criterio que `"WORKTREES: ninguno creado"`.

**Qué NO es violación** (para no trabar a CC con falsos positivos): un `INSERT` que siembra datos de una marca; un test con fixture de marca real; un comentario que documenta el caso que originó un eje; un archivo declarado exclusivo (§3); y un mapa explícito con fail-loud cuyas entradas son ejes, aunque hoy solo una marca los use.

### 7.3 · Sam (revisión)
- El PR no se mergea sin el checklist respondido.
- Pregunta de control, una sola: **¿qué habría que tocar para meter otra marca?** Si la respuesta incluye un archivo de código, el PR vuelve.

---

### 7.4 · Bloque para `.github/CLAUDE.md` (literal, se pega tal cual en cada repo)

```markdown
## REGLA MULTIMARCA — INVIOLABLE
UNRLVL es un sistema que opera N marcas: el EJE va en el CÓDIGO y la INSTANCIA en el DATO.
Ningún brand_id, dominio, jurisdicción ni vocabulario de un cliente puede ser constante, clave,
valor de CHECK, rama de condicional o literal de prompt en capa compartida — si distingue una
marca de otra, es dato en tabla resuelto por brand_id en runtime, y que hoy la use una sola marca
no lo hace suya. Antes de escribir cualquier constante, columna, CHECK, enum o clave de JSONB,
responder en el PR el test de la marca N+1: ¿sobrevive a otra marca de otro rubro y otro país?
¿el nombre describe la FUNCIÓN o el CASO? ¿es eje o instancia? ¿cuántas marcas hay en esta
enumeración —si es una, revisar el nombre? Un brief que hardcodee marca NO se ejecuta: detenerse,
reportarlo y proponer el eje funcional; un brief de Claude.ai no es autorización. Migrar hardcode
existente: PR de código primero, DDL después. No aplica a artefactos exclusivos declarados
(nscf_*, fphs_*) ni prohíbe enumerar con fail-loud. Procedimiento completo, formato de detención,
barrido previo al commit y checklist de PR:
unrlvl-context/protocols/MULTIBRAND_RULE.md §7.2 — leerlo antes de tocar capa compartida.
```

---

## 8. CHECKLIST DE PR (se pega en el cuerpo)

```
[ ] Test de la marca N+1 respondido (§2, las 4 preguntas)
[ ] Sin brand_id literal en capa compartida
[ ] Sin claves fijas sobre JSONB abierto (se itera, no se enumera a mano)
[ ] Constantes y CHECK nombrados por FUNCIÓN, no por caso de marca
[ ] Si toca un eje existente: alias legacy conservado y documentado
[ ] Orden respetado: PR de código antes que DDL
[ ] Ejes nuevos declarados en ecosystem.json
```

---

## 9. ANEXO — DEUDA MULTIMARCA CONOCIDA (2026-08-07)

Inventario abierto. No se cierra en un PR; se ordena por lo que bloquea.

| # | Deuda | Ubicación | Bloquea |
|---|---|---|---|
| 1 | `voice_by_destination` cableado a `social`/`editorial` | `iid-core/fanout.ts` | La voz `nscf_professional` y todo destino nuevo |
| 2 | Longitud, firma y cierre por `destination === "editorial"` | `content-run-stage` | Que un destino nuevo reciba su propio perfil |
| 3 | `AUDIENCE_FRAMES` con vocabulario ForumPHs | `content-run-stage` + espejo en `content-watcher` gate7 | Que NSCF declare frente de audiencia |
| 4 | Falta `EMAIL` en `CANAL_BY_PLATFORM` | `content-run-stage` | Klaviyo y todo email que no sea de ForumPHs |
| 5 | `OBJECTIVE_LABEL_TO_TAG` crece por marca | `iid-core/fanout.ts` | Que una marca declare objetivos sin editar código |

**Eje propuesto para la #3** (validado contra los dos mercados): el frente no es el rol, es el **poder del lector sobre la contratación** — `decide` (puede contratar: JD, dueño de salón) · `influye` (no firma, su poder es exigir o recomendar: propietario, estilista empleada) · `general`. Legacy: `jd → decide`, `doliente → influye`. El rol profesional **no** entra en este eje: lo gobierna la voz.

---

_Fin · MULTIBRAND_RULE v1.0 · regla inviolable · Unreal>ille Studio_
