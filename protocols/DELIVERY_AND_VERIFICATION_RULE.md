# DELIVERY AND VERIFICATION RULE — UNRLVL

**Versión:** v1.1 · **Creado:** 2026-08-29 · **Naturaleza:** REGLA INVIOLABLE del ecosistema
**v1.1 (2026-08-29), dos adiciones y ninguna derogación:** (a) **este documento pasa a ser carga obligatoria en apertura** —paso `3-quater` de `HRD_PROTOCOLO_ACTUALIZACION`— y por tanto **fila propia del panel**; una regla de forma que se consulta al final llega tarde, porque el texto ya está escrito. (b) **§6 declara el estatus de cada punto de carga** —FUENTE / PUNTERO / RESUMEN— y el contrato que ata al futuro proyecto de sync de context files. El cuerpo de v1.0 se conserva íntegro.
**Destino en el repo:** `protocols/DELIVERY_AND_VERIFICATION_RULE.md`
**Consumidores:** Claude.ai (chat), Claude Code (CC), Sam (revisión de PR)
**Precedente de forma:** `protocols/MAIL_PRIVACY_RULE.md` — fuente única; los demás sitios apuntan y no copian.

---

## 0. POR QUÉ EXISTE

Cinco defectos con la misma consecuencia: **Sam no puede saber, de un vistazo, qué tiene que hacer él, ni cuánto de lo que lee está medido.**

1. **La convención de destinatario existía a medias.** `CC_PROTOCOL.md` §4.1 la instauró el 2026-07-31 **sólo para el bloque de Sam y sólo obligando a CC**. Claude.ai nunca estuvo obligado y el bloque de CC no existía.
2. **El idioma no estaba escrito en ningún archivo del repo.** Vivía sólo en las `userPreferences` de Sam, que CC no lee. Y la plantilla del mensaje de verificación de `HRD_PROTOCOL.md` estaba en voseo: la regla habría nacido incumplida por el texto que la exige.
3. **El QA no dejaba rastro.** El ecosistema sabe verificar un hallazgo (`HRD-R08`…`R14`, `CC_PROTOCOL` §9), pero un QA que ocurre dentro de la cabeza del que responde no es un QA: es una promesa. Y no cubría el fallo más caro — **entregar impecablemente algo que resuelve otro objetivo**, que nadie detecta hasta que el trabajo está hecho.
4. **La apertura de sesión se afirmaba sin comprobarse.** Una frase fija se escribe igual con la carga hecha y sin hacer. Medido el 2026-08-29: se declaró *«contexto cargado»* con `ecosystem.md` nunca solicitado y con cuatro skills declarados activos sin haber leído ningún `SKILL.md`.
5. **La convención no distinguía superficies.** El 2026-08-29 se intentó pintar líneas de texto con hex **en el chat**, que no rinde color arbitrario. La regla ahora dice qué se aplica en cada superficie, porque una convención que no se puede cumplir se deja de cumplir entera.

---

## 1. LA REGLA

> **Todo lo que se entrega declara su DESTINATARIO, su IDIOMA y su GRADO DE EVIDENCIA, y pasa las cuatro QA antes de salir.**
>
> Sin destinatario no es una instrucción: es contexto. Sin evidencia declarada no es un hallazgo: es una hipótesis con forma de hecho. Sin QA no es una entrega: es un intento.

---

## 2. FORMA DE ENTREGA — DESTINATARIO DECLARADO

Aplica a **Claude.ai y a CC por igual**, en todo reporte, brief, cuerpo de PR y respuesta de chat.

### 2.0 · Para quién es el diferenciador

**El diferenciador visual existe para que SAM lea, no para que CC ejecute.**

CC recibe un archivo o un bloque y lo ejecuta: el color le es indiferente y **no se le exige reproducirlo**. El único que necesita distinguir de un vistazo, en mitad de un mensaje largo, qué le toca a él y qué le toca a la máquina es Sam. De ahí se derivan las dos reglas de esta sección: **estructura obligatoria siempre** (§2.1), **marca visual según la superficie** (§2.2).

Lo que sí se le exige a CC es que su reporte separe con claridad lo que Sam tiene que hacer de lo que ya está hecho — el fondo de la regla, no su tipografía.

### 2.1 · Estructura — obligatoria en cualquier superficie

Todo lo que se entrega cae dentro de un bloque con encabezado propio:

```
[marcador] PARA SAM — [de qué va el bloque, media línea]
[numerado; la acción en negrita al inicio de cada punto]

[marcador] PARA CC — [asunto]
[brief ejecutable]
```

- **Un bloque termina donde empieza el siguiente encabezado**, precedido de una regla horizontal. No hay línea de cierre: una línea de `FINAL` es ruido cuando el encabezado siguiente ya delimita.
- **Nada sin destinatario.** Un párrafo fuera de un bloque no es una instrucción: es contexto, y nadie está obligado a ejecutarlo.
- **Si algo es para los dos, se escribe dos veces**, una en cada bloque, con el verbo de cada uno.

### 2.2 · Marca visual — depende de la superficie, y por eso se declara

| Superficie | Marcador | Color |
|---|---|---|
| **Chat** (Claude.ai, CC) | cuadrado emoji: 🟩 Sam · 🟧 CC | el del emoji; el texto va en el color por defecto |
| **Documento, HTML, artifact, UI con estilos** | carácter `●` (U+25CF) | línea completa en el hex: **`#00FFD1`** Sam · **`#FFB300`** CC |

**Por qué se separan.** El chat renderiza markdown y **el markdown no tiene color**: no existe forma de pintar una línea de texto con un hex en una respuesta de chat. Intentarlo produce una convención que nadie puede cumplir, y una convención incumplible se abandona entera — con ella, la parte que sí funcionaba. En chat, entonces, el color lo aporta **el emoji** (aproximación al cyan y al ámbar, no la marca exacta) y el peso lo aporta **el encabezado grande y la negrita**. En una superficie con estilos, `●` hereda el color del texto y la línea entera se pinta con el hex real.

**El hex nunca se escribe dentro de la línea del encabezado.** Es especificación: vive aquí, en un solo sitio, y lo aplica quien renderiza.

**Aviso de ejes cruzados, declarado a propósito:** el ámbar de §2.4 significa **parcial** en el panel de carga; el ámbar de aquí significa **destinatario**. Son dos ejes distintos que comparten familia de color. Ninguno se lee por el otro.

### 2.3 · Cada bloque en la forma que su destinatario necesita

- **Sam — numerado, con la acción en negrita al inicio del punto.** Un punto, una acción, un verbo. Sin prosa envolvente. Lo que requiere criterio suyo se marca como decisión, no como tarea.
- **CC — brief ejecutable.** Lleva siempre: **asunto** · **gobernanza** (rama, quién publica, quién abre el PR, quién mergea y borra) · **causa raíz declarada** con archivo y línea, o consulta y resultado (`CC_PROTOCOL` §9) · **rutas exactas** · **contenido literal** o el `old_str`/`new_str` exacto · **orden** cuando importa · **verificación posterior** · **test de la marca N+1** respondido o su no-aplicación declarada · **el estado de las cuatro QA** (§3).

**Por qué la asimetría.** Trocear un brief en viñetas cortas para que quede prolijo le quita a CC lo que necesita para no perder el objetivo: la ruta exacta, el literal exacto y el orden. La numeración es una ayuda de lectura para Sam; convertirla en la forma del brief degrada el brief.

**Entrega de briefs largos.** Un brief con varios niveles de cercas de código **se entrega como archivo**, no como bloque pegado: un bloque se trunca al copiarlo y el truncamiento **no falla** — CC ejecuta lo que le llegó, que es `HRD-R11` un piso más arriba. Si va pegado, se envuelve en una cerca **cuya longitud supere en uno a la más larga que contenga**.

### 2.4 · Panel de carga verificada — la apertura se comprueba, no se afirma

Una frase fija que dice *«protocolos cargados»* no comprueba nada: se escribe igual con la carga hecha y sin hacer. **La apertura de sesión se confirma con un panel de estado generado a partir de los resultados reales de la carga.**

| Estado | Significa | Condición |
|---|---|---|
| **Verde** | cargado de verdad | el fetch devolvió el archivo y se leyó |
| **Ámbar** | parcial | se obtuvo pero no se leyó entero, o se leyó una versión anterior |
| **Rojo** | no cargado | no se solicitó, o falló |

**Regla dura — la evidencia es la que pinta el color.** Cada fila lleva el dato que sólo se puede tener habiendo cargado el archivo: su versión, su tamaño en bytes o su código de respuesta. **Una fila sin evidencia es roja por definición**, aunque quien escribe crea que la cargó. Sin esto, el panel es la misma frase fija con colores encima.

**Todo rojo y todo ámbar declara su motivo** en la misma fila, en una línea: *«nunca solicitado»*, *«403 del proxy»*, *«leída sólo la cabecera»*. Un rojo sin motivo no informa: alarma.

**Alcance del panel:** los **seis** archivos de carga obligatoria (`ecosystem.json`, `AGENDA.md`, `skills/INDEX.md`, `CAPABILITIES.md`, `protocols/MULTIBRAND_RULE.md` y **este documento**), los archivos del contexto declarado —marca o ecosistema— y **los skills de carga obligatoria en apertura** según `skills/INDEX.md`. Un skill cuya herramienta se usó pero cuyo `SKILL.md` no se leyó **es rojo**: usar la herramienta no es haber cargado el skill que dice cómo usarla.

**Este documento se carga en la apertura, y su fila se lee antes que las demás.** Era la sexta ausencia: la regla que gobierna **cómo se responde** no puede ser una referencia que se abre cuando surge la duda. Y la dependencia es circular de la única manera que importa: **este panel está especificado aquí**, en esta misma §2.4. Un panel emitido sin haber cargado el documento que lo define es un panel que nadie verificó contra su especificación — **si su fila sale roja, lo que está sin verificar no es un dato: es el criterio con el que se pintan las demás filas**. Se carga y se reemite el panel antes de responder nada más.

**Las dos reglas inviolables del ecosistema son DOS FILAS MÁS del panel, no una frase declarada.** Antes colgaban de la línea de apertura, donde una confirmación no se distingue de una afirmación:

| Regla | Su fuente | La fila es verde sólo si |
|---|---|---|
| **Los labs son apps del ecosistema, no servicios genéricos** | `ecosystem.json` → `labs._note` | el fetch devolvió el archivo **y** se leyó `labs._note`. Evidencia: versión de `ecosystem.json` + número de labs listados |
| **REGLA MULTIMARCA — el eje va en el CÓDIGO, la instancia en el DATO** | `protocols/MULTIBRAND_RULE.md` | el fetch devolvió el archivo **y** se leyó. Evidencia: su versión |

**Una regla inviolable afirmada sobre un archivo que nunca se abrió es la misma frase fija, con una regla dentro en vez de un adjetivo.** Si la fuente no se cargó, la fila sale **roja —o ámbar si se leyó parcial— con su motivo**, y la sesión **se detiene sobre lo que esa regla protege**: no se arranca trabajo sobre labs sin la primera, ni se toca capa compartida sin la segunda. Se carga lo que falta y se reemite el panel.

---

## 2-BIS. IDIOMA — ES O EN NEUTRO INTERNACIONAL, SIN EXCEPCIÓN

**Español neutro internacional o inglés neutro internacional.** Ambos son válidos y pueden convivir en un mismo texto. Ningún otro idioma, y ningún regionalismo de ninguno de los dos.

**Alcance — todo lo que produce el sistema:** respuestas de chat · briefs · cuerpos de PR · mensajes de commit · comentarios de código · nombres, descripciones y notas en context files · mensajes de error propios y `COMMENT ON COLUMN` · documentación · **y las plantillas de los propios protocolos**.

**Neutro internacional significa:** léxico comprensible en todo el ámbito hispanohablante o anglófono; **sin voseo**; sin modismos locales; sin jerga regional; los términos técnicos se dejan en su forma canónica y no se traducen (`branch`, `commit`, `endpoint`).

**El voseo se prohíbe por una razón operativa, no estética.** El imperativo voseante y el pretérito son homógrafos: *«decidí»* es a la vez *«toma la decisión»* y *«yo decidí»*. En una lista de instrucciones, esa ambigüedad hace que el destinatario no sepa si le están pidiendo algo o informándole de algo ya hecho. Ocurrió el 2026-08-29, en un bloque de instrucciones para Sam, dentro del mensaje que redactaba esta misma regla.

**Qué NO prohíbe:** citar literalmente un texto ajeno en su idioma original —un error de un proveedor, una cláusula, un log—. La cita se marca como cita.

---

## 3. LAS CUATRO QA — SON HRD RULES

**Estatus:** las cuatro son **HRD**, con la fuerza de `HRD-R07`. No se sustituyen por lo que parezca más útil, no se omiten porque *«ya lo hice antes en esta sesión»*, no se adaptan porque *«el contexto es distinto»*. Aplican **a Claude.ai y a CC por igual**.

**Orden inviolable:** `QA-ENCARGO` → `QA-OBJETIVO` → `QA-INFO` → `QA-PROP`. `QA-PROP` no existe sin `QA-OBJETIVO` validado con Sam previamente.

### QA-ENCARGO — ¿entendí lo que me pidieron?

Es el **mensaje de verificación que ya existe**: `HRD_PROTOCOL.md` → *MENSAJE DE VERIFICACIÓN*, y `CC_PROTOCOL.md` §2 para CC. Este documento sólo le pone nombre.

> *«Ok Sam, quieres que [objetivo]. Para ello debo [pasos intermedios implícitos]. ¿Correcto? Me faltan: [datos o "ninguno — procedo"].»*

CC: *«Ok, voy a [objetivo]. Pasos: […]. Toca estos archivos: […]. Repos afectados: […]. ¿Confirmo?»*

### QA-OBJETIVO — ¿estamos de acuerdo en a dónde apunta esto?

Se pregunta **antes de producir** cuando la actividad va a generar algo que otro ejecuta —un brief, un PR, una migración, una siembra— o cuando toca producción. Se enuncia el objetivo en términos comprobables y **se espera la confirmación de Sam**. Un objetivo confirmado es lo único contra lo que después se puede medir la propuesta.

### QA-INFO — ¿tengo TODO lo necesario? · ES UN BLOQUEO

**No se responde sin la información completa.** `QA-INFO` no es un informe de estado: es una puerta cerrada.

- Si falta un dato y **se puede obtener** → se obtiene antes de responder. Si se puede consultar (repo, DB, Vercel, proveedor), se consulta; *«no tengo acceso»* se verifica contra `CAPABILITIES.md` antes de decirse, porque casi siempre el acceso existe por una vía que no es la obvia.
- Si falta un dato y **no hay forma de obtenerlo solo** → **no se entrega la respuesta: se entrega el PLAN para obtenerlo**, vía Sam o vía CC, con qué falta exactamente, quién lo consigue y cómo. Nada más.
- **No existe una etiqueta de QA-INFO incompleto.** Una etiqueta que permite entregar sin la información no verifica nada: sólo documenta que se sabía. Se prohíbe explícitamente.
- Al pasar, se declara qué se encontró: **«He encontrado… `QA-INFO`»**.

**Antes de asumir, se investiga. Sin excepción.**

### QA-PROP — ¿lo que entrego apunta al objetivo? · OBLIGA A REVISAR

Antes de entregar se comprueba que la respuesta apunta **al objetivo validado en `QA-OBJETIVO`**, no a uno parecido. Se responden, **por escrito, en el brief y en el cuerpo del PR**:

1. **¿Qué tendría que ser cierto para que esto funcione?** Los supuestos, uno por uno.
2. **¿Cuál está `medido` y cuál `deducido`?** Un solo supuesto deducido en la base convierte toda la propuesta en hipótesis.
3. **¿Qué se rompe si se aplica?** Quién más lee esto y en qué vocabulario lo lee hoy (`MULTIBRAND_RULE` §13).
4. **¿Cómo se revierte?** Si la respuesta es *«no se puede»*, la propuesta se parte en pasos hasta que se pueda.
5. **¿Qué efecto observable prueba que funcionó?** Nombrado por adelantado (`HRD-R11`). *«El PR está mergeado»* no es un criterio de éxito.

Al pasar, se declara: **«Mi propuesta: … `QA-PROP`»**.

**Sin mediocridades.** Una propuesta que resuelve *algo* pero no *lo pedido* no pasa `QA-PROP` aunque esté bien construida. Y **un brief sin la sección de `QA-PROP` respondida está incompleto: CC lo devuelve** — mismo deber que ante un brief sin el test de la marca N+1 (`MULTIBRAND_RULE` §7.2, PASO 3) o ante un `str_replace` que no matchea (`CC_PROTOCOL` §0).

---

## 4. EVIDENCIA — LO MEDIDO Y LO DEDUCIDO NO SE ESCRIBEN IGUAL

El cuerpo de esta disciplina ya existe y **esta sección no lo duplica**: `HRD_PROTOCOL.md` **HRD-R08** (verificar en el motor que ejecuta) · **HRD-R09** (mergear no despliega) · **HRD-R10** (verificar fragmentos no es verificar el archivo) · **HRD-R11** (el éxito contra el efecto, no contra el HTTP) · **HRD-R13** (una lectura caduca dentro de la sesión) · **HRD-R14** (merge → deploy); `CC_PROTOCOL.md` **§9** (causa raíz con archivo y línea, o consulta y resultado); y `knowledge/ecosystem/decision-matrix/QA_RULES.md`, que fija lo mismo para el QA de UI.

**Lo que esta sección añade es la etiqueta obligatoria.** Toda afirmación de estado se escribe con una de estas tres, explícita:

| Etiqueta | Qué significa | Qué debe acompañarla |
|---|---|---|
| **medido** | Se ejecutó la lectura o la consulta que lo sostiene, en el momento de afirmar | la consulta y su resultado, o el archivo y la línea |
| **reportado** | Lo afirma un brief, un tercero o una sesión anterior | quién lo afirma y cuándo |
| **deducido** | Es una inferencia | de qué evidencia se infiere, y qué lectura la confirmaría |

**Una afirmación sin etiqueta se lee como `medido`.** Por eso omitirla no es un descuido de forma: es afirmar haber medido.

**Un identificador con forma de regla vigente se lee como regla vigente.** Nombrar `HRD-R15`, `SEC-0X` o `PR #N` sin que exista es afirmar sin medir, aunque la frase alrededor sea una propuesta. Lo propuesto se nombra como propuesto.

---

## 5. AUTOVERIFICACIÓN DE CIERRE

Antes de declarar terminada una entrega, Claude.ai y CC se preguntan:

> «¿Todo lo que escribí cae dentro de un bloque con destinatario? ¿Usé la marca que corresponde a la superficie, o intenté pintar color donde no se rinde? ¿Cada afirmación de estado lleva su etiqueta? ¿Pasé las cuatro QA en orden, y `QA-INFO` de verdad me bloqueó donde faltaba algo, o me la salté porque tenía prisa? ¿Hay una sola forma voseante en todo el texto?»

CC añade el estado de las cuatro al bloque de reporte de `CC_PROTOCOL` §4:

```
QA:
- QA-ENCARGO: [confirmado por Sam | no aplica: solo-lectura]
- QA-OBJETIVO: [validado con Sam el <fecha> | no aplica]
- QA-INFO: [completo | plan de obtención entregado: <qué falta, quién lo consigue>]
- QA-PROP: [las 5 respondidas en el PR | DEVUELTO: brief incompleto]
```

---

## 6. INSTRUCCIONES DE CARGA — POR ACTOR

Este documento es la **FUENTE ÚNICA**. Los puntos de carga lo referencian; **ninguno lo copia entero** — lo que se copia, diverge (`CC_PROTOCOL.md` §6).

| # | Dónde | Estatus | Qué lleva |
|---|---|---|---|
| 1 | `protocols/DELIVERY_AND_VERIFICATION_RULE.md` | **FUENTE** | **este documento**. Carga obligatoria en apertura: paso `3-quater` de `HRD_PROTOCOLO_ACTUALIZACION`, con fila propia en el panel |
| 2 | `protocols/CC_PROTOCOL.md` §4.1 | **PUNTERO** | el texto de la convención deja de vivir ahí |
| 3 | `protocols/HRD_PROTOCOL.md` | **PUNTERO** | `HRD-R15`, en una línea. Y el paso `3-quater` + el panel del paso 8, que son **mecánica de carga**, no copia de la regla |
| 4 | `CAPABILITIES.md` | **PUNTERO** | fila en ARTEFACTOS CONSULTABLES |
| 5 | `ecosystem.json → delivery_and_verification_rule` | **RESUMEN OPERATIVO** | la regla en una línea por clave + puntero en `_source` |
| 6 | `knowledge/ecosystem/decision-matrix/QA_RULES.md` | **PUNTERO** | puntero cruzado: aquél es el QA de UI, éste el de la entrega |
| 7 | **`CLAUDE.md` de cada repo del org** | **RESUMEN OPERATIVO** | bloque literal de §7 + puntero |
| 8 | `userPreferences` de Sam | **RESUMEN OPERATIVO** | lo edita Sam; fuera del repo |

El punto 7 es el que no depende de que nadie se acuerde: CC lo lee solo al abrir el repo.

### 6.1 · Contrato para el proyecto de sync de context files

**La regeneración real de `ecosystem.md` y `ecosystem_filemap.md` sigue abierta sin fecha en
`AGENDA.md`** —no existe generador en el repo—. Cuando ese proyecto arranque, va a recorrer estos
mismos archivos. **Estas tres reglas lo atan, y se escriben ahora para que no choque después:**

1. **Un sync que iguala textos entre puntos de carga rompe la regla, no la aplica.** Los estatus
   de la tabla no son decorativos: hay **una sola FUENTE**. Un PUNTERO que crece hasta parecerse a
   la fuente es exactamente la divergencia que `CC_PROTOCOL.md` §6 previene —lo que se copia,
   diverge—. Si un punto y la fuente discrepan, **se corrige el punto**, nunca al revés, y sólo
   se corrige **acortándolo hacia el puntero**.

2. **Un RESUMEN OPERATIVO no es un derivado calculable.** Los tres —el nodo de `ecosystem.json`,
   el bloque de los `CLAUDE.md` y las `userPreferences`— están redactados para su superficie y su
   lector. **No se generan desde la fuente y no se sobrescriben desde la fuente.** El de §7 se
   pega literal; los otros dos se editan a mano y bajo PR.

3. **Un derivado lleva cuerpo que no es derivable, y ese cuerpo manda sobre cualquier
   regeneración.** `ecosystem.md` y `ecosystem_filemap.md` acumulan flujos, tablas de estado y
   **notas de sincronización fechadas** que **no existen en `ecosystem.json`**: una regeneración
   literal los vaciaría, y vaciar historia es lo que `CC_PROTOCOL.md` §0 prohíbe. **Todo generador
   futuro preserva ese cuerpo o no se despliega.** Regla escrita en `CLAUDE.md` desde el
   2026-08-23, tras cinco aplicaciones seguidas de la misma excepción.

**Contrato legible por máquina:** el mismo estatus vive en
`ecosystem.json → delivery_and_verification_rule._puntos_de_carga`, para que el generador lo lea
del JSON y no de esta prosa.

**Sam (revisión).** Pregunta de control antes de mergear: **¿qué tengo que hacer yo, y quién midió lo que aquí se afirma?** Si sus acciones están mezcladas con el relato, o si hay una afirmación de estado sin etiqueta, el PR vuelve.

---

## 7. BLOQUE PARA `CLAUDE.md` (literal, se pega tal cual en cada repo)

```markdown
## ENTREGA Y VERIFICACIÓN — INVIOLABLE

**Destinatario declarado.** Todo lo que se entrega cae dentro de un bloque con
encabezado propio: `PARA SAM — [de qué va]` o `PARA CC — [asunto]`. El bloque termina
donde empieza el siguiente encabezado. Un párrafo fuera de un bloque no es una
instrucción: es contexto.

**El diferenciador visual es para que SAM lea, no para que CC ejecute.** La marca
depende de la superficie: en **chat**, cuadrado emoji (verde Sam / naranja CC) más
encabezado grande, porque el markdown no rinde color arbitrario; en **documento, HTML
o UI con estilos**, el carácter `●` con la línea completa en su hex (`#00FFD1` Sam /
`#FFB300` CC). El hex no se escribe dentro de la línea: es especificación.

**Briefs largos se entregan como archivo**, no pegados: un bloque se trunca al copiarlo
y el truncamiento no falla — CC ejecuta lo que le llegó.

**Idioma.** ES neutro internacional o EN neutro internacional, sin excepción, sin
regionalismos y **sin voseo** (el imperativo voseante y el pretérito son homógrafos:
"decidí" es a la vez una orden y un hecho consumado). Aplica a chat, briefs, PRs,
commits, comentarios de código, context files y plantillas de protocolo.

**Evidencia.** Toda afirmación de estado va etiquetada `medido` / `reportado` /
`deducido`. Sin etiqueta se lee como `medido`. Antes de asumir, se consulta.

**Las cuatro QA son HRD RULES, en este orden:**
`QA-ENCARGO` (confirmar que entendí el encargo) → `QA-OBJETIVO` (confirmar el objetivo
con Sam) → `QA-INFO` (**bloqueo**: sin información completa NO se responde; si no hay
forma de obtenerla, se entrega el plan para conseguirla vía Sam o CC) → `QA-PROP`
(comprobar que lo entregado apunta al objetivo validado; cinco preguntas respondidas
por escrito). Un brief sin `QA-PROP` respondida se devuelve.

Fuente única: `unrlvl-context/protocols/DELIVERY_AND_VERIFICATION_RULE.md`.
**No copiar la regla completa aquí: este bloque es un puntero, no una segunda fuente.**
```

---

## 8. TEST DE LA MARCA N+1 (respondido)

1. **¿Sobrevive a otra marca de otro rubro y otro país?** Sí — la regla es sobre la forma de entregar y de verificar; no menciona ninguna marca.
2. **¿El nombre describe la FUNCIÓN o el CASO?** Función: *entrega y verificación*. Los bloques se nombran por **destinatario**, que es un eje del sistema.
3. **¿Eje o instancia?** Eje. Los dos hex y los dos emoji son instancia y viven declarados aquí, en un solo sitio.
4. **¿Cuántas marcas hay en la enumeración?** Cero.

---

_Fin · DELIVERY_AND_VERIFICATION_RULE v1.0 · regla inviolable · Unrealville Studio_
