# HRD — Hard Instructions Protocol
_HRD Protocol v1.8 · UNRLVL Studio · 2026-08-29 (**una regla global nueva y tres correcciones de forma, ninguna derogación**: **HRD-R15 — destinatario, idioma, evidencia y las cuatro QA**, cuya fuente única es `protocols/DELIVERY_AND_VERIFICATION_RULE.md` v1.0; **barrido de voseo** — la forma voseante de «quieres» corregida a neutro en **6** apariciones, una más que las 5 declaradas en el brief: la sexta está en la pregunta de MODO de `HRD_ECOSYSTEM_AUDIT`, y se anota por `HRD-R13`; **`HRD_PROTOCOLO_ACTUALIZACION` suma los pasos 3-bis y 3-ter** —`CAPABILITIES.md` y `protocols/MULTIBRAND_RULE.md`— **sin renumerar** los existentes, cerrando la divergencia entre las 3 URLs de este HRD y las 5 de las `userPreferences` de Sam; **el paso 4 pasa a la frase única** que remite al panel, y **el paso 8 deja de ser una frase fija y pasa a ser el PANEL DE CARGA VERIFICADA** con evidencia por fila —una fila sin evidencia es roja—, donde **las dos reglas inviolables son DOS FILAS MÁS con su propia fuente y su propia evidencia** (`ecosystem.json → labs._note` y `protocols/MULTIBRAND_RULE.md`): si su fuente no se cargó, la fila sale **roja con su motivo** y la sesión se detiene sobre lo que esa regla protege. **Las redacciones anteriores de los pasos 4 y 8 quedan ARCHIVADAS ÍNTEGRAS** al final de este documento, bajo guard `⛔ NO OPERATIVO` (`CC_PROTOCOL.md` §0 y §6), con el comando exacto que comprueba que hay **una sola frase de apertura viva**. Motivo medido el 2026-08-29: se declaró «contexto cargado» con `ecosystem.md` nunca solicitado y cuatro skills declarados activos sin haber leído ningún `SKILL.md`. · base previa v1.7 · 2026-08-26 (**dos reglas globales nuevas, ninguna derogación**, las dos nacidas de errores de la sesión 2026-08-26: **HRD-R13 — una lectura de estado caduca dentro de la misma sesión** (cuatro afirmaciones sin verificar en un chat que mutó producción durante horas; grepear no es leer, y una hipótesis razonada no sustituye una medición) y **HRD-R14 — el orden merge → deploy no es ceremonia; su violación es silenciosa** (`iid-research` v44 revirtió RESEARCH-01 y la EF siguió devolviendo 200, guardando el memo y marcando el truncamiento: todo parecía correcto y el arreglo no estaba puesto — costó tres corridas de research). · base previa v1.6 · 2026-08-26 (**tres reglas globales nuevas, ninguna derogación**, las tres nacidas de errores de la sesión 2026-08-25: **HRD-R10 — verificar fragmentos no es verificar el archivo** (50 tests en verde sobre `content-run-stage` mientras el archivo no compilaba, porque la suite extrae bloques por sentinelas; un `deno check` lo habría cazado), **HRD-R11 — el éxito se comprueba contra el efecto, no contra el código HTTP** (un 200 de SocialLab no es una publicación: cero publicaciones automáticas reales, y de ahí sale PUB-01) y **HRD-R12 — el test de la marca N+1 barre también los `CHECK` existentes** (la enumeración puede estar en el esquema: `iid_content_queue_angle_check` bloqueó el primer run con ángulos diversos). · base previa v1.5 · 2026-08-25 (**dos reglas globales nuevas, ninguna derogación**: **HRD-R08 — verificar contra el motor donde se ejecuta, no donde es cómodo probar** (`verify_pattern` en POSIX, `fix_replacement` en ECMAScript: `$1`, nunca `\1`; documentado en el `COMMENT ON COLUMN` de cada columna) y **HRD-R09 — mergear no despliega, y un merge puede quedarse corto** (se verifica el COMMIT tras el merge, no que el PR aparezca cerrado). Las dos nacen de errores cometidos el 2026-08-24/25 y quedan escritas para que no se repitan. · base previa v1.4 · 2026-08-16 (HRD_ACTUALIZA paso 10: **CONDICIÓN 4 — resuelto por vía alterna** + **paso 10-bis — verificación contra fuente**, ambos definidos en `skills/context-resolver/SKILL.md` §2 y §3; este protocolo los invoca, no los duplica. · base previa v1.3 · 2026-07-18 (HRD_ACTUALIZA paso 10: BARRIDO DE ARCHIVADO — los ítems completados hace +30 días y sin referencias activas se MUEVEN a historical_AGENDA.md; se propone a Sam, nunca se ejecuta en silencio. + HRD_PROFESSOR: el proxy /api/professor YA EXISTE — verificar con action=checkpoint, NO con ping. · base previa v1.2 · 2026-06-29: HRD_ACTUALIZA paso 0: recargar estado vigente del repo antes de editar — evita pisar cambios de sesiones paralelas))_

---

## DEFINICIÓN

`HRD_[nombre]` = instrucción inviolable. Se ejecuta exactamente como está escrita, paso a paso.
Si apunta a un protocolo o skill, ese protocolo/skill es igualmente inviolable.

---

## MENSAJE DE VERIFICACIÓN — OBLIGATORIO ANTES DE EJECUTAR CUALQUIER HRD

> "Ok Sam, quieres que [objetivo]. Para ello debo [pasos intermedios implícitos, breve]. Correcto? Me faltan: [datos o 'ninguno — procedo']."

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

**HRD-R08** — **Verificar contra el motor donde se ejecuta, no donde es cómodo probar.** Un patrón, una expresión o una consulta se valida en el **runtime que la va a correr**, no en el que está a mano. Dos columnas de la misma fila pueden hablar dialectos distintos.

> **El caso que la origina (2026-08-24/25).** `intel.watcher_rules.verify_pattern` se evalúa en **POSIX** —es auditable desde SQL con `SELECT … ~*`— y `intel.watcher_rules.fix_replacement` se evalúa en **ECMAScript**, donde la referencia de grupo es **`$1`** y **nunca** `\1`. Están en la misma fila, se escriben en el mismo acto, y **no son el mismo lenguaje**. Probar el reemplazo en el motor equivocado da un patrón que "funciona" en la prueba y falla en producción, en silencio.
>
> **Cómo se cumple:** antes de escribir un patrón, responder *¿quién lo ejecuta?* — Postgres, el runtime de la EF, el navegador — y probarlo **ahí**. Cuando una columna tiene un motor propio, ese motor se declara en su `COMMENT ON COLUMN`, que es donde el próximo lo va a buscar.

**HRD-R09** — **Mergear no despliega, y un merge puede quedarse corto.** Un PR cerrado no es un cambio en producción, y no es garantía de que **todo** el cambio haya entrado. Se verifica el **commit** resultante tras el merge — no el estado del PR.

> **Por qué las dos mitades.** (a) **Mergear ≠ desplegar:** una Edge Function se despliega **aparte y explícitamente** tras el merge; hasta entonces `main` tiene el código y producción tiene el anterior. La verdad del deploy es la **versión real de la EF** (`entrypoint_path` / `get_edge_function`), no el estado del PR. (b) **Un merge puede quedarse corto:** un PR mergeado captura la rama **al momento del merge** — lo empujado después queda fuera y el PR igual aparece cerrado y verde. Ya ocurrió (el «commit colgante» de ImageLab, 2026-08-22) y volvió a ocurrir el 2026-08-24/25.
>
> **Cómo se cumple:** tras cada merge, comparar el **commit de `main`** contra lo que el PR decía entregar, y —si el cambio toca una EF— consultar su **versión desplegada** antes de declararla en un context file. Declarar «desplegado» sin ese chequeo es afirmar una causa sin evidencia, que es lo que `CC_PROTOCOL.md` §9 prohíbe.

**HRD-R10** — **Verificar fragmentos no es verificar el archivo.** Una suite que extrae bloques de código y los prueba por separado dice que **esos bloques** están bien. **No dice que el archivo compile.** Antes de dar por bueno un PR, se parsea el **archivo entero** con la herramienta del runtime — `deno check`, `tsc --noEmit`, `node --check`, lo que corresponda.

> **El caso que la origina (2026-08-25).** La suite de `content-run-stage` dio **50 archivos en verde** sobre un archivo que **no compilaba**. No hubo falla de la suite: hizo exactamente lo que sabe hacer. Los tests **extraen bloques por sentinelas** y evalúan cada bloque aislado, así que un error de sintaxis **entre** dos sentinelas —o en una llave que cierra de más, o en un import— es invisible para todos ellos a la vez. **Cincuenta verdes y cero cobertura del archivo.** Un `deno check` lo habría cazado en un segundo.
>
> **Por qué se escribe como regla y no como nota.** El verde de una suite es la señal en la que uno **deja de mirar**. Una suite que puede estar verde sobre código que no arranca no es un colador con agujeros: es un colador que **mide otra cosa** que la que uno cree estar midiendo, y la única defensa es no confundir su alcance con el del archivo.
>
> **Cómo se cumple:** por cada archivo que el PR toca, correr el chequeo del compilador **del archivo completo** —no de los fragmentos— y declarar su resultado. Si la suite verifica por extracción, decirlo al reportar: «50 tests verdes **sobre bloques extraídos** + `deno check` limpio **sobre el archivo**» es un reporte honesto; «50 tests verdes» solo, no lo es.

**HRD-R11** — **El éxito se comprueba contra el efecto, no contra el código HTTP.** Un `200` es *«el otro lado recibió la llamada»*, nunca *«el otro lado hizo la cosa»*. Antes de escribir «publicado», «enviado» o «creado» en un context file, se verifica **el objeto en el destino**.

> **El caso que la origina (2026-08-25).** El drenaje **daba por publicada** una pieza con un `200` de SocialLab. **Cero publicaciones automáticas reales hasta hoy** — la llamada volvía bien y no había nada en el canal. Es lo que abrió **PUB-01** y lo que apagó el cron 66: un carril que informa éxitos que no ocurrieron es **peor** que uno que falla, porque su registro miente hacia arriba y nadie va a buscar el problema.
>
> **Cómo se cumple:** el criterio de éxito es el **id del objeto creado en el destino** (el post de Meta, el mensaje enviado, la fila escrita), leído **desde el destino**. Cuando el proveedor no devuelve un id verificable, el estado que se escribe es *«entregado al proveedor»*, no *«publicado»* — y la diferencia se anota. Aplica igual a un `success: true` de una EF propia: es el mismo `200` con otro nombre.

**HRD-R12** — **El test de la marca N+1 barre también los `CHECK` existentes**, no sólo el código que se escribe. La enumeración que rompe la multimarca **puede estar en el esquema**, puesta hace meses por alguien que no está en la sesión.

> **El caso que la origina (2026-08-25).** `iid_content_queue_angle_check` **enumeraba ocho ángulos genéricos** y **bloqueó el primer run con ángulos diversos** — el run que existía justamente para probar que el ángulo es dato. El código de esa sesión estaba limpio: la enumeración vivía en un `CHECK` viejo. Se eliminó con un **`COMMENT` que explica por qué no vuelve**.
>
> **Por qué el test se queda corto sin esto.** `MULTIBRAND_RULE.md` pregunta *«¿qué pasa cuando entra la marca N+1?»* y uno responde mirando **lo que está escribiendo**. Pero un `CHECK`, un `ENUM`, un `DEFAULT` o un trigger **también son código** — sólo que ya mergeado, sin PR a la vista y sin nadie que lo relea. **La restricción más vieja es la que nadie sospecha.**
>
> **Cómo se cumple:** al responder el test de la marca N+1 sobre un eje, listar los `CHECK`/`ENUM`/triggers **que ya existen** sobre las columnas de ese eje y confirmar que ninguno enumera instancias. Si uno lo hace, se retira con un `COMMENT` que deje escrito el motivo — el próximo que vea el hueco tiene que encontrar la razón, no la ausencia.

**HRD-R13** — **Una lectura de estado caduca dentro de la misma sesión.** En un chat que muta producción durante horas, **ninguna lectura previa vale como afirmación presente**: se verifica **en el momento de afirmar**, con la herramienta. **Grepear no es leer** — un literal puede vivir dentro de un comentario. Y **una hipótesis razonada no sustituye una medición**: se mide contra el commit anterior, no se deduce por la dispersión de los síntomas.

> **El caso que la origina (2026-08-26).** **Cuatro afirmaciones sin verificar** en una sola jornada. La sesión llevaba horas mutando producción — deploys, DDL, siembras, corridas — y varias afirmaciones se apoyaban en lecturas hechas **antes** de esas mutaciones. Una lectura correcta a las 17:00 puede ser **falsa a las 23:00** sin que nadie haya cometido un error: simplemente el estado cambió debajo.
>
> **Las tres formas del mismo defecto.** (a) **Lectura caducada** — afirmar hoy con el dato de hace tres horas. (b) **Grep confundido con lectura** — `grep '5200'` encuentra el literal y no dice si está **activo** o dentro de un comentario, un test o una rama muerta; el literal `5200` de `iid-research` apareció exactamente así. (c) **Hipótesis presentada como medición** — «esto tiene que ser X, porque los síntomas se dispersan igual que en X» es una **conjetura**, y en un context file se lee como hallazgo.
>
> **Cómo se cumple:** antes de escribir una afirmación de estado en un context file o en un reporte, se ejecuta **la consulta o la lectura que la sostiene**, en ese momento. Si no se pudo verificar, se escribe **con la etiqueta de lo que es** — «reportado por el brief, no medido», «sospecha», «pendiente de localizar» — nunca en el mismo registro que lo medido. La diferencia entre *«medí»* y *«deduje»* es la única que hace útil un log al día siguiente.

**HRD-R14** — **El orden merge → deploy no es ceremonia; su violación es silenciosa.** **CC no despliega.** Sam despliega **desde `main`, después del merge**. Si hace falta un deploy para probar, **se pide**.

> **El caso que la origina (2026-08-26).** `iid-research` **v44 revirtió RESEARCH-01** — se desplegó una versión anterior al arreglo, sobre producción, fuera de orden. **Y no falló:** la EF siguió devolviendo `200`, siguió guardando el memo y siguió marcando el truncamiento. **Todo parecía correcto y el arreglo no estaba puesto.** Costó **tres corridas de research completas**, y el rastro sólo apareció al mirar `intel.iid_research_raw` fila por fila: `max_tokens` en `NULL` donde la cascada debía haber escrito `16000` con `max_tokens_source = 'base'`.
>
> **Por qué es peor que un fallo.** Un deploy que rompe se ve en el minuto uno. Un deploy **fuera de orden** deja el sistema **funcionando con el código de ayer**: las mismas respuestas, los mismos códigos HTTP, los mismos registros — y una capacidad ausente que nadie busca porque nada se queja. Es el mismo defecto que HRD-R11 describe para el `200`, un piso más abajo: **no miente el proveedor, miente la versión.**
>
> **Relación con HRD-R09.** R09 dice que **mergear no despliega**. R14 dice lo simétrico y lo que faltaba: **desplegar sin haber mergeado tampoco vale**, y además **no avisa**. Juntas cierran el ciclo: se mergea, se verifica **el commit** (R09), se despliega **desde `main`**, y se verifica **el efecto en producción** (R11) — no la versión que uno cree haber puesto.
>
> **Cómo se cumple:** CC no ejecuta despliegues. Cuando un cambio necesita estar vivo para probarse, CC lo deja en **PENDIENTE PARA SAM** con el repo, el commit y la EF exactos. Y antes de afirmar que un arreglo está en producción, se lee **la versión servida** (el número final de `entrypoint_path`, no el del PR) y se confirma contra el commit mergeado.

**HRD-R15** — **Destinatario, idioma, evidencia y las cuatro QA.** Todo lo que se entrega cae dentro de un bloque con encabezado propio (`PARA SAM` / `PARA CC`), con la marca visual que corresponda a la superficie —cuadrado emoji en chat, carácter `●` con su hex en documento o UI con estilos—; **el diferenciador es para que Sam lea, no para que CC ejecute**. El idioma es ES o EN neutro internacional, **sin voseo**; toda afirmación de estado va etiquetada `medido` / `reportado` / `deducido`; y toda entrega pasa, en orden, `QA-ENCARGO` → `QA-OBJETIVO` → `QA-INFO` → `QA-PROP`. **`QA-INFO` es un bloqueo:** sin la información completa no se responde — se entrega el plan para obtenerla vía Sam o CC. **`QA-PROP` no existe sin `QA-OBJETIVO` validado con Sam.** La apertura de sesión se confirma con el **panel de carga verificada**, no con una frase fija. Fuente única: `protocols/DELIVERY_AND_VERIFICATION_RULE.md`. Un brief sin la sección de `QA-PROP` respondida se devuelve, mismo deber que ante un brief sin el test de la marca N+1.

> **Nota sobre `QA-ENCARGO`:** es el *MENSAJE DE VERIFICACIÓN* que ya encabeza este protocolo y el §2 de `CC_PROTOCOL.md`. `HRD-R15` sólo le pone nombre; no lo modifica ni lo duplica.

---

## HRD_PROTOCOLO_ACTUALIZACION

**Trigger:** Sam escribe "protocolo actualización" o "protocolo actualizacion"

**Verificación:** "Ok Sam, quieres que cargue el protocolo completo del sistema. Sin alterar el protocolo, correcto? Me faltan estos datos: ninguno — procedo."

**Pasos inviolables:**

1. Fetch `https://unrlvl-context.vercel.app/ecosystem.json` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: versión + fecha
2. Fetch `https://unrlvl-context.vercel.app/AGENDA.md` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: prioridades activas
3. Fetch `https://unrlvl-context.vercel.app/skills/INDEX.md` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: versión del INDEX
3-bis. Fetch `https://unrlvl-context.vercel.app/CAPABILITIES.md` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: versión
3-ter. Fetch `https://unrlvl-context.vercel.app/protocols/MULTIBRAND_RULE.md` vía `Vercel:web_fetch_vercel_url`
   → Confirmar: versión

> **Por qué van como 3-bis y 3-ter y no renumerados:** este HRD carga 3 URLs desde su
> redacción original y las `userPreferences` de Sam cargan 5. La divergencia se cierra
> añadiendo, no renumerando — renumerar rompe las referencias cruzadas por número.

4. Responder exactamente: "Hola Sam, Protocolos cargados según el panel. ¿Con qué marca o proyecto vamos a trabajar?"

> **Frase única, fijada el 2026-08-29.** Convivían tres versiones: la de las
> `userPreferences` de Sam, una más larga en este paso que confirmaba los labs, y la
> exigencia de `MULTIBRAND_RULE.md` §7.1 de confirmar dos reglas. Manda ésta.
> **Motivo:** una frase de apertura es un string fijo, y un string fijo al que se le
> cuelgan confirmaciones deja de ser fijo — cada regla nueva reclama su línea, que es
> exactamente cómo se llegó a tener tres versiones.
>
> **Y la frase remite al panel a propósito.** Decir "protocolos cargados" sin el panel
> del paso 8 es afirmar sin medir. La frase afirma; el panel prueba.

5. Si Sam indica marca → fetch `brands/[Marca]/brand.json` + `brands/[Marca]/BP_Brand_Context.md` + `brands/[Marca]/session_log.md`
6. Si Sam indica ecosistema/labs → fetch `ecosystem.md` + `ecosystem_filemap.md`
7. Consultar `skills/INDEX.md` y cargar skills relevantes para el trabajo declarado
8. **PANEL DE CARGA VERIFICADA** — se emite siempre, junto con la frase del paso 4.
   No es un resumen: es la comprobación a la que esa frase remite.

   Una fila por archivo de carga obligatoria (pasos 1, 2, 3, 3-bis, 3-ter), por archivo
   del contexto declarado (pasos 5 o 6) y por skill de carga obligatoria en apertura
   según `skills/INDEX.md`. Cada fila lleva **estado** (verde cargado · ámbar parcial ·
   rojo no cargado), **evidencia** (versión, bytes o código de respuesta, tomada del
   fetch real) y, si no es verde, **el motivo en una línea**.

   **Una fila sin evidencia es roja.** Usar la herramienta de un skill no es haber
   cargado el skill.

   **LAS DOS REGLAS INVIOLABLES se confirman aquí, y cada una es UNA FILA MÁS DEL PANEL,
   con su propia evidencia. No son una frase declarada: se confirman o no se confirman.**

   | Regla | Su fuente | La fila es verde sólo si |
   |---|---|---|
   | **Los labs son apps del ecosistema, no servicios genéricos** | `ecosystem.json` → `labs._note` (REGLA DE NOMENCLATURA — INVIOLABLE) | el paso 1 devolvió el archivo **y** se leyó `labs._note`. Evidencia: versión de `ecosystem.json` + el número de labs listados |
   | **REGLA MULTIMARCA — el eje va en el CÓDIGO, la instancia en el DATO** | `protocols/MULTIBRAND_RULE.md` (paso 3-ter) | el paso 3-ter devolvió el archivo **y** se leyó. Evidencia: su versión |

   **Si la fuente de una de las dos no se cargó, su fila NO es verde: es roja —o ámbar si
   se leyó parcial— y declara el motivo en una línea, igual que cualquier otra fila.** Una
   regla inviolable afirmada sobre un archivo que nunca se abrió es exactamente la frase
   fija que este paso viene a sustituir, con una regla dentro en vez de un adjetivo.

   **Y si una fila de regla inviolable sale roja, se dice y se para**: la sesión no arranca
   trabajo sobre labs sin la primera, ni toca capa compartida sin la segunda. Se carga lo
   que falta y se reemite el panel.

   → Especificación completa del panel: `protocols/DELIVERY_AND_VERIFICATION_RULE.md` §2.4.

---

## HRD_ACTUALIZA

**Trigger:** Sam escribe "Actualiza"

**Verificación:** "Ok Sam, quieres ejecutar el protocolo Actualiza completo. Sin alterar el protocolo, correcto? Me faltan estos datos: ninguno — procedo."

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

    **CONDICIÓN 4 — RESUELTO POR VÍA ALTERNA (añadida 2026-08-16).** Un ítem se archiva **aunque no esté marcado ✅** si cumple **4 + 3**: su objetivo declarado está satisfecho en producción **verificado contra código o DB** (jamás contra context files), el mecanismo que lo satisface es **distinto** del que el ítem especificaba, y queda **constancia escrita** de la vía real. **Parcial es abierto, sin excepción.**
    → **Definición completa, formato obligatorio de la nota y el porqué de cada requisito: `skills/context-resolver/SKILL.md` §2 y §5.** Este protocolo la **invoca**; no la duplica — quince copias de una regla producen quince versiones divergentes.

    **Por qué existe.** Las tres condiciones verificaban la **ANOTACIÓN**, no el **HECHO**. El 2026-08-16 aparecieron cuatro ítems declarados pendientes que estaban resueltos y que **nunca habrían estado marcados ✅**, porque el trabajo se hizo y nadie volvió a anotarlo. Sin la condición 4 habrían quedado retenidos indefinidamente mientras la AGENDA declaraba urgente un bloqueo inexistente.

    **PASO 10-BIS — VERIFICACIÓN CONTRA FUENTE (añadido 2026-08-16).** Corre **ANTES** del barrido de archivado, en **cada** Actualiza, sobre los ítems abiertos **más viejos** (empezando por `FOCO INMEDIATO` y los bloqueantes declarados). Por cada ítem: leer el **objetivo**, no la tarea; formular la consulta que lo decide; ejecutarla **contra la fuente**; clasificar en CERRADO · CERRADO-VÍA ALTERNA · ABIERTO · **ABIERTO PARCIAL**; y **anotar el hallazgo esté cerrado o no**.
    → **Procedimiento completo y mapa de dónde se pregunta cada cosa: `skills/context-resolver/SKILL.md` §3 y §4.**

    **Vale más que el archivado en sí: el archivado ordena el pasado; el paso 10-bis corrige el presente.** El orden es inviolable — 10-bis **antes** que 10. Archivar sobre contenido no verificado produce una AGENDA impecablemente ordenada y **falsa**.

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

**Verificación:** "Ok Sam, quieres interactuar con el sistema Professor — [acción específica]. Sin alterar el protocolo, correcto? Me faltan estos datos: [si aplica]."

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

**Verificación:** "Ok Sam, quieres un ecosystem audit. Sin alterar el protocolo, correcto? Antes de proceder necesito una respuesta:"

**PREGUNTA OBLIGATORIA — STOP hasta recibir respuesta:**

> "¿Lo quieres identificativo (mapear qué hay y dónde, sin leer código) o contextual (leer y entender TODO el código, sus relaciones y su estado real en el ecosistema)?"

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

---

## ARCHIVO HISTÓRICO — HRD_PROTOCOLO_ACTUALIZACION pasos 4 y 8 (archivado 2026-08-29)

> **⛔ NO OPERATIVO — registro histórico únicamente.** Los dos pasos de abajo fueron
> **sustituidos** el 2026-08-29 por la frase única del paso 4 y por el PANEL DE CARGA VERIFICADA
> del paso 8. **Manda el cuerpo vivo de este documento; nada de lo que sigue se ejecuta.** Se
> conservan por `CC_PROTOCOL.md` §0 —los context files no se reemplazan, se archivan— y con el
> guard que exige `CC_PROTOCOL.md` §6.

> **Cómo se verifica que hay UNA sola frase de apertura viva.** El `grep` a secas sobre el
> archivo devuelve **dos** coincidencias de `protocolo cargado` / `Protocolos cargados`: la viva
> y esta archivada. Preservar historia y dejarla operativa son cosas distintas, así que la
> comprobación se hace **sobre el cuerpo vivo**, que termina donde empieza este bloque:
>
> ```bash
> awk '/^## ARCHIVO HISTÓRICO/{exit} {print}' protocols/HRD_PROTOCOL.md \
>   | grep -n "protocolo cargado\|Protocolos cargados"
> ```
>
> → **una sola línea**, la del paso 4 vigente. Si algún día devuelve dos, hay dos frases de
> apertura vivas y eso sí es el defecto que esta regla cierra.

**Paso 4, redacción anterior (vigente hasta 2026-08-29).** Sustituida porque una frase fija se
escribe igual con la carga hecha y sin hacer, y porque convivían tres versiones —ésta, la de las
`userPreferences` de Sam y la exigencia de `MULTIBRAND_RULE.md` §7.1—. La confirmación de labs que
llevaba colgada **no se perdió: es hoy una fila del panel del paso 8, con evidencia**.

```
4. Responder exactamente: "Hola Sam, protocolo cargado. Confirmo: los labs son apps del ecosistema, no servicios genéricos. ¿Con qué marca o proyecto vamos a trabajar?"
```

**Paso 8, redacción anterior (vigente hasta 2026-08-29).** Sustituida porque declaraba «Contexto
cargado» y una lista de skills activos **sin un solo dato que sólo se pueda tener habiendo cargado
algo**. Medido el 2026-08-29: se emitió con `ecosystem.md` nunca solicitado y con cuatro skills
declarados activos sin haber leído ningún `SKILL.md`.

```
8. Confirmar: "Contexto cargado · Skills activos: [lista] · Estado: [resumen]"
```
