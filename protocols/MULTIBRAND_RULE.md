# MULTIBRAND RULE — UNRLVL

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.


**Versión:** v1.3 · **Creado:** 2026-08-07 · **Actualizado:** 2026-08-30 (§5 precisión de alcance: los dos tiempos rigen la MIGRACIÓN DE HARDCODE, no toda DDL — una columna nueva y nullable va al revés, y hacerlo al derecho abre una ventana en la que la traza se pierde en silencio) · 2026-08-18 (§13 Migrar el eje sin migrar a sus consumidores) · 2026-08-16 (§11 Modelos y versiones · §12 Granularidad del eje) · **base previa:** v1.1 (2026-08-16) y v1.0 (2026-08-07), cuerpo conservado íntegro · **Naturaleza:** REGLA INVIOLABLE del ecosistema
**Destino en el repo:** `protocols/MULTIBRAND_RULE.md`
**Consumidores:** Claude.ai (chat), Claude Code (CC), Sam (revisión de PR)
**Precedente:** `ecosystem.json → labs._note` — misma naturaleza, misma fuerza. Aquella regla nació de `generadorLocal`; esta nace del hardcode de marca.

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

> **Precisión de ALCANCE (2026-08-30) — los dos tiempos rigen la MIGRACIÓN DE HARDCODE, no toda DDL. El texto de arriba se conserva íntegro.**
>
> **Qué cubre.** El orden «PR primero, DDL después» existe para un caso concreto y verificado: **ampliar un `CHECK` cuyo valor el builder todavía no tiene cableado** produce fail-loud en producción (`AUDIENCE_FRAMES`, 2026-08-07). El riesgo que evita es que el **dato admita antes de que el código entienda**.
>
> **Qué NO cubre: una columna NUEVA y NULLABLE.** Ahí no hay valor que el builder pueda rechazar, porque no hay `CHECK` que ampliar ni fila previa que reinterpretar: la columna nace vacía y **nadie la lee hasta que el código la lee**. Aplicarle el orden de la migración **abre una ventana en la que la traza se pierde en silencio** — el código empieza a producir el dato antes de que exista la columna donde escribirlo, y lo que se produjo en esa ventana no queda registrado en ninguna parte. Es el corolario de `HRD-R18` un piso más abajo: un campo de diagnóstico que no existe todavía **no se distingue de uno que no se escribió**.
>
> **Cómo se decide, en una pregunta:** *¿el cambio de esquema puede hacer que el código vigente reciba un valor que no sabe tratar?* Si la respuesta es **sí** —`CHECK` ampliado, `ENUM` nuevo, dato migrado—, manda el orden de arriba: **PR primero**. Si es **no** —columna nueva y nullable, tabla nueva—, **la DDL va primero**, para que ni un solo registro nazca sin sitio donde caer.
>
> **Lo que esta precisión NO deroga:** los tres tiempos de la migración de hardcode, íntegros; ni el punto del checklist de §8, que sigue leyéndose como lo que siempre fue — **el orden aplica cuando hay hardcode que migrar**.

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
- La confirmación de las **dos reglas inviolables** —labs y multimarca— se emite en el
  **paso 8** de `HRD_PROTOCOLO_ACTUALIZACION`, junto al panel de carga verificada, y ya
  no en la línea de apertura. La línea de apertura es un string fijo y no admite
  confirmaciones colgadas: ver `HRD_PROTOCOL.md` paso 4 y
  `DELIVERY_AND_VERIFICATION_RULE.md` §2.4.
- **La regla no se debilita: se endurece.** En la línea de apertura la confirmación era una
  **afirmación**; en el paso 8 es **una fila del panel con su evidencia**. La fila de la
  multimarca sólo es verde si el paso 3-ter devolvió `protocols/MULTIBRAND_RULE.md` **y** se
  leyó, y la evidencia es su versión. Si no se cargó, la fila sale **roja con su motivo** y
  **no se toca capa compartida** hasta cargarla. Antes, una apertura que afirmaba las dos
  reglas sin haber abierto ninguno de los dos archivos era indistinguible de una que sí.
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

UNRLVL no es una marca con un sistema: es un sistema que opera N marcas.

**El EJE es del sistema y va en el CÓDIGO. La INSTANCIA es de la marca y va en el DATO.**
Ningún `brand_id`, dominio, jurisdicción ni vocabulario de un cliente puede aparecer como
constante, clave, valor de CHECK, rama de condicional o literal de prompt en una capa
compartida. Si distingue a una marca de otra, es dato: tabla, leído en runtime por `brand_id`.
Que hoy una sola marca use un eje NO lo convierte en suyo.

**Antes de escribir una constante, columna, CHECK, enum o clave de JSONB — el test de la marca N+1:**
1. ¿Sobrevive a que entre otra marca de otro rubro y otro país?
2. ¿El nombre describe la FUNCIÓN o el CASO?
3. ¿Esto es eje o es instancia?
4. ¿Cuántas marcas hay hoy en esta enumeración? Si es una, revisá el nombre.

Las 4 respuestas van en el cuerpo del PR. **Un brief que hardcodee marca no se ejecuta:
detenerse, reportarlo y proponer el eje funcional** — un brief no es autorización para violar
la regla. Migración de hardcode existente: **PR de código primero, DDL después** (al revés
rompe producción). No aplica a artefactos declarados exclusivos de una marca (`nscf_*`, `fphs_*`).

Fuente única, con los patrones prohibidos, el checklist y la deuda conocida:
`unrlvl-context/protocols/MULTIBRAND_RULE.md`. **No copiar la regla completa aquí: este bloque
es un puntero, no una segunda fuente.**
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

## 10. CONTRATO `surfaces[]` — forma canónica de `target_artifact`

Fijado el 2026-08-09, tras encontrar **tres formas incompatibles conviviendo en la
misma columna** `target_artifact`. La forma canónica es un objeto de contrato, no una
etiqueta suelta — y es **eje**: vive en el código/contrato; sus valores son **instancia**
y viven en el dato.

- `surfaces[]` — enumera las **superficies del sistema** donde la voz puede publicar (p. ej. `meta_ig`, `editorial_post`). Enumera superficies, **no marcas**.
- `excluded[]` — superficies vedadas a esta voz.
- `signature_closer` — clave del genoma; el sistema la estampa **tras el PASS del Watcher**, el copy nunca la escribe. Se resuelve por `brand_id`/`voice_id` en runtime.
- `declared_per_turn` — la superficie se declara por turno de calibración, contra el `surfaces[]` ya sembrado.

### Test de la marca N+1 (respondido)

1. **¿Sobrevive a otra marca de otro rubro y otro país?** Sí. `surfaces[]` enumera superficies del sistema, no marcas. `signature_closer` es una clave del genoma, resuelta por `brand_id`/`voice_id` en runtime.
2. **¿El nombre describe la FUNCIÓN o el CASO?** Función. `surfaces`, `excluded`, `signature_closer`, `declared_per_turn`.
3. **¿Eje o instancia?** La forma es eje y vive en el contrato. Los valores (`meta_ig`, `editorial_post`, el texto de la firma) son instancia y viven en dato.
4. **¿Cuántas marcas hay en la enumeración?** Cero. Las claves con marca dentro (`blog_forumphs`, `email_propietarios`) ya son **filas** de `platform_canal_map`.

---

## 11. MODELOS Y VERSIONES — no se hardcodean

*(Sección añadida 2026-08-16.)*

**El modelo es INSTANCIA, no eje.** El eje es *"con qué motor se genera este artefacto"*; **cuál**
motor es un dato que cambia por precio, por disponibilidad y por calidad, y cambia **sin avisar**.
Un identificador de modelo escrito en el código es la misma clase de error que un `brand_id`
escrito en el código: convierte una decisión de negocio en un despliegue.

**REGLA:** ninguna capa compartida hardcodea un identificador de modelo. Se resuelve en runtime,
por la misma vía por la que ya se resuelve su precio.

**Deuda conocida al instalar la regla (2026-08-16):**

| Literal | Dónde |
|---|---|
| `claude-sonnet-5` | `content-run-stage` · `calibrate.ts` · `_craftModules.ts` |
| `gemini-2.5-flash-image` | ImageLab |

**El estado exacto, que es lo que hace la deuda tratable:** `ops_lab_rates` **ya resuelve el PRECIO
por `model_id`** — la mitad del camino está hecha y la fuente única ya existe. **Lo que falta es que
resuelva QUÉ MODELO.** No hay que inventar el mecanismo: hay que extenderlo.

**Por qué no es cosmético.** El 2026-08-12 Anthropic canceló una subida de precio ya anunciada. Un
ecosistema que resuelve el precio por dato absorbió el cambio consultando; uno que lo escribe habría
necesitado un PR. Con el modelo pasa igual, y con más frecuencia.

### Test de la marca N+1 (respondido)

1. **¿Sobrevive a otra marca de otro rubro y otro país?** Sí — y además sobrevive a **otro proveedor
   de modelo**, que es el eje que esta sección protege.
2. **¿El nombre describe la FUNCIÓN o el CASO?** Función: *"qué motor genera este artefacto"*.
3. **¿Eje o instancia?** El eje (que hay un motor resoluble) vive en el código; el `model_id` es
   instancia y vive en el dato, junto a su tarifa.
4. **¿Cuántas marcas hay en la enumeración?** Cero. Tampoco proveedores: `claude-sonnet-5` y
   `gemini-2.5-flash-image` son **filas**, no ramas.

---

## 12. GRANULARIDAD DEL EJE — el eje correcto al nivel equivocado sigue siendo un bug

*(Sección añadida 2026-08-16.)*

Un eje puede ser **correcto en su nombre y equivocado en su granularidad**, y ese caso no lo detecta
el test de la marca N+1 tal como está formulado: la enumeración no tiene marcas, la capa no
hardcodea nada, y aun así el eje no puede expresar lo que el negocio necesita.

**El caso que lo motivó — cadencia (2026-08-16).**

- `brand_cadence.cadence_mode` puso el modo **por marca**. Pero una marca no publica igual en blog
  que en Meta: el modo real es **por `(topic, plataforma)`**. Corregido con
  `intel.brand_topic_platform_mode`.
- `brand_rollout.max_rotation_weeks` puso la rotación **por marca**, cuando es **por clave**.

Ninguno de los dos hardcodeaba nada. Los dos estaban mal.

**LA PREGUNTA QUE SE AÑADE AL TEST:** *"¿a qué nivel varía este valor en la realidad, y a qué nivel
lo puede expresar el esquema?"* Si el esquema es **más grueso** que la realidad, la única forma de
expresar el caso real es una excepción — y **la primera excepción es donde vuelve a entrar la
marca**, por la puerta de atrás.

**Corolario operativo — los alias legacy se retiran CONTANDO.** Al corregir la granularidad quedan
alias vivos a propósito, y no se retiran a ojo: se retiran contra un conteo que demuestre que ya
nadie los alimenta. En el caso de cadencia, los tres alias (`brand_topics.cadence`,
`brand_cadence.cadence_mode`/`.anchor`, `brand_rollout.max_rotation_weeks`) se retiran en el **paso
3**, **contando** `class_source_counts` y `max_rotation_weeks_source` del reporte. **Un alias
retirado sin conteo es una migración a ciegas.**

---

## 13. MIGRAR EL EJE SIN MIGRAR A SUS CONSUMIDORES DEJA EL SISTEMA PEOR QUE ANTES DE MIGRAR

*(Sección añadida 2026-08-18.)*

Una migración de eje **no termina en la columna**. Mientras quede un consumidor leyendo el
vocabulario viejo, el sistema no está *a medio migrar*: está **peor que antes de migrar**. Antes,
todas las capas compartían un vocabulario equivocado y el resultado era, al menos, **coherente**.
Después, cada capa habla un idioma distinto — y el desacuerdo **no falla**: resuelve a vacío.

**El caso que lo motivó — `audience_frame` (2026-08-18).**

| Capa | Estado tras la migración | Efecto |
|---|---|---|
| La columna | migrada a `decide` / `influye` | ✅ |
| `AUDIENCE_CTA` (CopyLab) | quedó en `jd` / `doliente` | resuelve a **cadena vacía**: el escritor trabaja **sin instrucción de CTA** |
| `HR-FPHS-10` (juez) | juzgaba contra el vocabulario **extinto** | rechazaba contra claves que ya no existían |

**18 topics activos** afectados. Ninguna de las tres capas emitió un error.

**COROLARIO — reponer alias no repara si la semántica cambió.** El reflejo ante una migración rota
es mapear el nombre viejo al nuevo. Acá habría **empeorado** el fallo: `influye → doliente` habría
hecho que el escritor pidiera **el CTA que el juez, ya migrado, rechaza**. Un alias repara cuando el
valor es **el mismo con otro nombre**. Si cambió la **semántica**, el alias fabrica un desacuerdo
con apariencia de arreglo — y lo fabrica en silencio, que es lo peor que puede pasarle a una
migración.

**LA PREGUNTA QUE SE AÑADE AL TEST:** *"¿quién más lee este eje, y en qué vocabulario lo lee hoy?"*
La migración **no se declara hecha** hasta que esa lista esté vacía. Enumerar los consumidores es
**parte del DDL**, no un seguimiento posterior: el momento de escribirlos es cuando se escribe el
`ALTER`, porque después nadie sabe contra qué contar.

### Test de la marca N+1 (respondido)

1. **¿Sobrevive a otra marca de otro rubro y otro país?** Sí — la regla es sobre el **procedimiento**
   de migración, no sobre el contenido del eje. Y el eje migrado también: `decide`/`influye` describe
   el **poder del lector sobre la contratación**, que es universal; `jd`/`doliente` era vocabulario de
   una jurisdicción.
2. **¿El nombre describe la FUNCIÓN o el CASO?** Función: *migrar un eje y a sus consumidores*.
3. **¿Eje o instancia?** El procedimiento es eje y vive en esta regla. `audience_frame` y sus valores
   son instancia y viven en el dato.
4. **¿Cuántas marcas hay en la enumeración?** Cero. ForumPHs es la marca donde el fallo se **midió**,
   no un término del contrato.

---

_Fin · MULTIBRAND_RULE v1.2 (base previa v1.1, cuerpo conservado íntegro) · regla inviolable · Unrealville Studio_
