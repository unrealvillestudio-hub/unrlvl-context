# MAIL PRIVACY RULE — UNRLVL

**Versión:** v1.0 · **Creado:** 2026-08-28 · **Naturaleza:** REGLA INVIOLABLE del ecosistema
**Destino en el repo:** `protocols/MAIL_PRIVACY_RULE.md`
**Fuente canónica.** Este documento es el **único** sitio donde la regla se escribe entera. Todo lo demás —`AGENDA.md`, la §7 del `.github/CLAUDE.md` de `unrlvl-mail-mcp`, `ecosystem.json`— **apunta acá y no duplica**, por el mismo motivo que `CC_PROTOCOL.md` §6 lo exige: lo que se copia, diverge.
**Consumidores:** Claude.ai (chat), Claude Code (CC), Sam
**Alcance:** todo buzón de cliente al que el ecosistema tenga acceso de lectura — hoy, los del MCP `unrlvl-mail-mcp`
**Precedente:** `protocols/MULTIBRAND_RULE.md` — misma naturaleza, misma fuerza, misma estructura de carga por actor. Aquella regla nació del hardcode de marca; ésta nace de haber escrito en el repo lo que salió de leer el correo de una clienta.

---

## 0. POR QUÉ EXISTE — y se incumplió dos veces antes de tener documento propio

El **2026-08-28**, el mismo día en que el MCP de correo empezó a leer buzones de clientes, el `Actualiza` de esa mañana metió en context files **hallazgos derivados de esa lectura**. Se retiraron el mismo día, en `MAIL-PRIV-01`.

Y entonces ocurrió lo que da nombre a este documento: **`MAIL-PRIV-01` retiró los datos y dejó escrita la procedencia.** En seis sitios del repo quedó, literal, que un hallazgo había salido de leer el buzón de un cliente — que es exactamente lo que la regla instaurada por ese mismo PR prohíbe. Se corrigió en `MAIL-PRIV-02`, el mismo día.

**De quién fue cada error, dicho sin adorno:**

| Incumplimiento | De quién | Qué lo causó |
|---|---|---|
| El `Actualiza` de la mañana | Del brief y de su ejecución | No existía la regla todavía |
| La procedencia que quedó escrita | **Del brief de `MAIL-PRIV-01`, no de CC** | El brief pidió una «línea de constancia» **cuyo texto declaraba él mismo la procedencia del ítem**, y CC extendió ese patrón con criterio y con coherencia. En el mismo documento convivían la regla *«ni la mención de que se leyó algo»* y el patrón que la incumple. |

**La lección que justifica este documento, y no otra:** la regla se cumplió mal **dos veces seguidas** mientras vivía repartida en tres copias —`AGENDA.md`, `ecosystem.json` y un `.github/CLAUDE.md`— y ninguna era la fuente. Una regla sin documento propio se aplica **por memoria de quien escribe el brief**, y la memoria de quien escribe el brief es precisamente lo que falló. Por eso sube acá.

---

## 1. LA REGLA

> **De la lectura de correo de clientes sale una respuesta en el chat, y desaparece.**
>
> **Nada** va a context files, ni a Professor, ni a `AGENDA.md`, ni a un `session_log.md`: ni el contenido, ni un resumen, ni un hallazgo derivado, **ni la mención de que se leyó algo**.

La regla **no admite excepción por criterio de quien la aplica**, igual que se le exige al Watcher. Quien la aplica no decide si este caso concreto es lo bastante inocuo: si lo decidiera, la regla sería una recomendación.

---

## 2. LA ÚNICA EXCEPCIÓN

Que **Sam pida explícitamente un recordatorio**. Entonces se anota **qué hay que hacer**, y **jamás de dónde salió**.

No hay una segunda excepción. En particular, **no** son excepciones: que el dato parezca inocuo, que el hallazgo sea sobre infraestructura propia, que la clienta sea también socia, ni que el buzón sea de una marca del ecosistema.

---

## 3. EL COROLARIO — un hallazgo sobre lo propio sigue contaminado por su origen

Un hallazgo sobre **infraestructura nuestra** descubierto leyendo un buzón ajeno **sigue contaminado por su origen**.

Se vuelve anotable **sólo** si se verifica **por una vía independiente** — y entonces **se anota esa vía**, no el correo.

**Ejemplo real, y es el que fija el criterio.** `MAIL-03` (`forumphs-db` fuera del mapa del ecosistema) es un hallazgo sobre infraestructura propia. Es anotable porque `list_projects` lo mide de forma independiente, y **lo que se anota es `list_projects`**. Si esa vía no existiera, el hallazgo no sería anotable, por útil que fuese.

---

## 4. LA PRUEBA — cómo se decide una duda

Ante cualquier frase que se dude en escribir o en retirar:

> **Si borro esta frase, ¿se pierde la regla, o sólo se pierde el detalle de lo que se vio?**

Si es lo segundo, **se retira**. Ante una duda que esta prueba no resuelva, **no se edita: se lista y se pregunta a Sam.**

**Dos formas concretas que la prueba siempre condena:**

1. **Descripción de lo que se leyó** — categorías de dato, tipo de aviso, comportamiento observado. *Un resumen de la correspondencia sigue siendo la correspondencia.*
2. **Procedencia adosada a un ítem concreto que sobrevive en el repo.** Una nota que dice de dónde salió el ítem lo convierte en **un puntero a la lectura**: el lector deduce qué se consultó y qué clase de cosa se vio ahí. La nota se reduce a la traza del PR y nada más.

---

## 5. LO QUE ESTA REGLA **NO** PROHÍBE

- **El registro del consentimiento.** Altas de buzón, `holder_name`, `signed_at`, `document_path`, revocaciones. Es **prueba de autorización, no correspondencia** — es exactamente lo que debe existir, y **debe** conservarse.
- **Los defectos de nuestro propio código.** `MAIL-01`, `MAIL-02`, `MAIL-04` y sus sucesores son defectos del MCP, no contienen correspondencia y se anotan enteros.
- **La constancia de gobernanza.** Que hubo un incumplimiento, cuál es la regla y qué PR la instauró. Vive en este documento y en `AGENDA.md`; sin ella la regla no tiene origen y se erosiona sola.
- **El marcador de un ítem retirado.** Se conserva —un hueco sin explicar invita a rellenarlo— con la forma: *«ítem retirado el `<fecha>` por `<PR>`: vulneraba la §5 del documento de autorización. Notificado a Sam en el chat.»* Sin decir de dónde procedía.
- **El alcance técnico de la lectura.** Carpetas legibles, papelera excluida, qué no puede hacer el MCP.

---

## 6. BASE — la §5 del documento de autorización

El documento que firman las titulares declara en su **§5** que **no se almacena copia** del contenido, asunto, remitente ni adjuntos de los mensajes consultados, y que **la consulta se agota en el momento de realizarse**.

**Qué cubre la cláusula y qué cubre esta regla, porque no es lo mismo:**

| | §5 del documento | Esta regla |
|---|---|---|
| Prohíbe conservar **contenido** | Sí | Sí |
| Prohíbe conservar un **resumen** o un **hallazgo derivado** | Discutible | **Sí** |
| Prohíbe conservar **la mención de que se leyó algo** | No | **Sí** |

**Esta regla es más estricta que la cláusula, a propósito y por decisión de Sam.** Consecuencia práctica: se puede estar cumpliendo la §5 y estar incumpliendo esta regla — que es exactamente lo que pasó entre `MAIL-PRIV-01` y `MAIL-PRIV-02`. Ahí no había exposición frente a las clientas; había incoherencia interna, y se corrigió igual.

---

## 7. INSTRUCCIONES DE CARGA — POR ACTOR

### 7.1 · Claude.ai (chat) — quien escribe los briefs

**Acá falló dos veces.** Antes de escribir un brief que toque cualquier cosa relacionada con el MCP de correo:

1. Cargar este documento.
2. **Releer el propio brief buscando la forma prohibida**, no la intención. Un brief puede enunciar la regla en un párrafo y romperla en el siguiente: eso ocurrió, literalmente, en `MAIL-PRIV-01` §2.1.
3. **Nunca redactar una plantilla de nota que contenga la procedencia.** Si el brief dicta el texto exacto de una línea de constancia, ese texto es el que va a quedar en el repo, multiplicado por cada sitio donde se aplique.
4. Un brief que afirme una causa raíz declara `archivo y línea` o `consulta y resultado` (`CC_PROTOCOL.md` §9).

### 7.2 · Claude Code (CC) — SECCIÓN OPERATIVA

**Disparador.** Cualquier tarea que (a) lea un buzón con `unrlvl-mail-mcp`, (b) toque `mail.*`, (c) escriba en un context file un ítem cuya evidencia no puedas trazar a una vía independiente, o (d) aplique un brief que dicte el texto literal de una nota sobre correo.

**Antes de escribir:**

1. Cargar este documento (§0 bis de `CC_PROTOCOL.md`: el **repo** primero, Vercel sólo como respaldo).
2. Por cada línea que vayas a escribir, responder **la prueba del §4**.
3. **Si el brief dicta un texto que incumple la regla, no se ejecuta tal cual.** Se aplica el §4, se escribe la versión que cumple, y **se declara la desviación en el cuerpo del PR**. Un brief de Claude.ai no es autorización para incumplir una regla del ecosistema — misma doctrina que `MULTIBRAND_RULE.md` §7.2.

**Barrido previo al commit.** Sobre los archivos tocados y sobre `AGENDA.md`, `ecosystem.json`, `ecosystem.md`, `ecosystem_filemap.md`, `CAPABILITIES.md` y los `session_log.md`, ninguna de estas construcciones sobrevive **fuera del enunciado de la propia regla**:

```
aviso recibido por correo
leyendo un buzon · leyendo un buzón
lectura de un buzon de cliente · lectura de un buzón de cliente
procedia de la lectura · procedía de la lectura
comportamiento de entrega observado
su procedencia
```

Esta lista es **indicativa, no exhaustiva**: es el residuo medido de dos incumplimientos reales, no la definición de la regla. La definición es el §1 y la prueba es el §4 — una construcción nueva que los incumpla se retira igual aunque no figure acá.

**El resultado del barrido, con conteo por archivo, va en el cuerpo del PR.** También cuando sale limpio: *«cero coincidencias»* es un dato, no una omisión.

**Autoverificación de cierre.** Antes de dar la tarea por terminada:

> «¿Alguna línea que escribí dice, aunque sea de refilón, **de dónde salió** un ítem? ¿Alguna nota de corrección declara la procedencia de lo que corrige?»

### 7.3 · Sam (revisión de PR)

En un PR que toque correo, mirar **las notas de corrección**, no sólo los ítems. El defecto de `MAIL-PRIV-01` no estaba en lo que se retiró: estaba en **la nota que explicaba el retiro**.

### 7.4 · Bloque para `.github/CLAUDE.md` de `unrlvl-mail-mcp` (literal, se pega tal cual)

> **Lo que se lee de un buzón no se escribe en ningún sitio.** De la lectura de correo de
> clientes sale **una respuesta en el chat y desaparece**. **Nada va a context files, ni a
> Professor, ni a AGENDA, ni a un `session_log`** — ni el contenido, ni un resumen, ni un hallazgo
> derivado, ni la mención de que se leyó algo.
>
> **Única excepción:** que Sam pida explícitamente un recordatorio. Entonces se anota **qué hay
> que hacer**, jamás de dónde salió.
>
> Un hallazgo sobre **infraestructura propia** descubierto leyendo un buzón ajeno **sigue
> contaminado por su origen**. Se vuelve anotable sólo si se verifica **por una vía
> independiente**, y entonces se anota **esa vía**, no el correo.
>
> **Fuente canónica, y lo que manda:** `unrlvl-context/protocols/MAIL_PRIVACY_RULE.md`. Este bloque
> es el resumen operativo; **la prueba para decidir una duda (§4), lo que la regla no prohíbe (§5)
> y el barrido previo al commit (§7.2) viven allá y se leen antes de tocar nada.**

---

## 8. HISTORIA

| Fecha | PR | Qué pasó |
|---|---|---|
| 2026-08-28 | `unrlvl-mail-mcp` #1 · `unrlvl-context` #64 | El MCP de correo empieza a leer. El `Actualiza` de la mañana mete en context files hallazgos derivados de esa lectura. |
| 2026-08-28 | `unrlvl-context` #65 · `unrlvl-mail-mcp` #2 | **`MAIL-PRIV-01`** — se retiran los datos. Nace la regla, escrita como §7 del `.github/CLAUDE.md` de `unrlvl-mail-mcp`. **Y deja escrita la procedencia en seis sitios.** |
| 2026-08-28 | `unrlvl-context` #66 · `unrlvl-mail-mcp` #3 | **`MAIL-PRIV-02`** — se retira la procedencia. Aparece un **séptimo sitio** que el brief no enumeraba. Se cierran de paso tres incoherencias: titular duplicado en `ForumPHs`, título huérfano en `NeuroneSCF`, y estado viejo conviviendo con el nuevo en `ecosystem.json`. |
| 2026-08-28 | este documento | La regla sube a `protocols/` como documento propio, por decisión de Sam. Las copias pasan a ser punteros. |

**Límite declarado, y no se disimula:** el historial de git **conserva lo que ya se mergeó**. Estas correcciones arreglan el estado actual y **no borran el pasado**. Reescribir historia queda fuera de alcance y no se hace sin petición expresa.

**Tensión con `CC_PROTOCOL.md` §0, declarada:** la regla suprema dice que un context file **nunca** pierde contenido. Esta regla **retira contenido a propósito**, por una obligación con terceros que firmaron un papel y por orden explícita de Sam. **No es precedente para borrar nada más:** la excepción es exactamente el material que cae bajo esta regla, y nada más.

---

## 9. PENDIENTE ESTRUCTURAL — lo que aún no está resuelto

**Sigue abierto, y es decisión de Sam:** que la lectura de correo pase a ocurrir en una **sesión aparte que no ejecuta `Actualiza` ni Professor**.

**Por qué importa más que todo lo anterior:** los §1 a §7 son **disciplina** — dependen de que quien escribe se acuerde, y ya se demostró dos veces en un solo día que eso falla. Una sesión que **no puede** escribir en context files porque no ejecuta el paso que los escribe es **estructura**: no depende de que nadie se acuerde.

Mientras esa separación no exista, este documento es lo único que hay, y por eso se lee entero antes de tocar nada.
