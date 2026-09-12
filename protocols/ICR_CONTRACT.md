# ICR CONTRACT — UNRLVL

**Versión:** v1.0 · **Creado:** 2026-09-12 · **Naturaleza:** CONTRATO del ecosistema
**Destino en el repo:** `protocols/ICR_CONTRACT.md`
**Consumidores:** Claude.ai (chat) · Claude Code (CC) · Sam (revisión de PR)
**Precedente de forma:** `protocols/DELIVERY_AND_VERIFICATION_RULE.md` — fuente única; los demás sitios apuntan y no copian.

> **Por qué CONTRATO y no protocolo.** Decisión de Sam del 2026-09-12. Un protocolo describe cómo se
> hace algo y se incumple sin consecuencia declarada. Un contrato dice **qué se está prometiendo al
> entregar**, y por eso se puede comprobar contra la entrega. ICR no añade pasos: nombra el estándar
> contra el que ya se juzga todo lo demás.

---

## 0. POR QUÉ EXISTE

**El estándar del ecosistema se estampa sin comprobarse.** `icr_passed` es una **constante literal
`true`** en `content-run-stage`, y `content-watcher` **no conoce el concepto ICR**
[`reportado` — `AGENDA.md` v2026-09-12-v1, bloque «Frentes abiertos», punto 7; pendiente de
verificar contra el código, ver §4 V-09].

Una bandera que nunca ha rechazado nada **no prueba que todo esté bien**: prueba que hay que
comprobar si discrimina o si sólo acompaña (`skills/publicacion-operativa/SKILL.md` §B.4). Hoy
`icr_passed` sólo acompaña.

Y había un defecto anterior a ese: **las siete siglas del ecosistema no estaban escritas en ninguna
parte.** Se usaban en briefs, en PRs y en la agenda, y cada lector las reconstruía. Una sigla que
cada uno interpreta no es vocabulario compartido: es ambigüedad con forma de precisión. La tabla de
§1 cierra eso.

---

## 1. TABLA DE DEFINICIONES

Cerrada por Sam el 2026-09-12. **Es la fuente única de las siete.** Si una sigla del ecosistema no
está aquí, **se dice que no está definida; no se infiere su significado.**

| Sigla | Significa | Qué es en el ecosistema |
|---|---|---|
| **ICR** | **Industrial Consistency Ready** | El estándar del ecosistema: que el trabajo se haga correctamente **siempre**, que se mantenga la disciplina y que no se olviden los objetivos. Forman parte de él las HR, la regla multimarca, las QA, el protocolo de `medido`/`deducido`, el de carga de contexto, el de actualización, y el reconocimiento de labs, skills, MCPs y demás herramientas |
| **QA** | **Quality Assurance** | **No son etiquetas: son acciones que se ejecutan.** `QA-ENCARGO` asegura haber entendido el encargo · `QA-OBJETIVO`, que ambas partes tienen claro el objetivo · `QA-INFO`, la calidad de la información que se manifiesta · `QA-PROP`, que la propuesta es la correcta según las tres anteriores |
| **AIID** | **Agentes de Investigación, Insights y Desarrollo** | El carril lleva el mismo nombre porque el trabajo de los agentes **termina con la publicación** |
| **IID** | **Investigación, Insights y Desarrollo** | La misma tríada que AIID. La `A` abre a «Agentes» |
| **AIFE** | **Artificial Intelligence Footprints Eraser** | Analiza los patrones y rastros que deja la escritura por IA y los altera para romper el patrón. **Declarado por Sam:** esa ruptura es **superficial y enfocada en la percepción humana**, no en la detección matemática de un sistema |
| **CRO** | **Conversion Rate Optimization** | Que se generen los estímulos correctos **para el objetivo de cada pieza y cada formato**: si el objetivo es conversión, que estén las técnicas de conversión y que se varíen; si es educar, las que educan |
| **PSY** | **Psycho Layers** | Aplicación de la psicología del comportamiento humano en cuanto al consumo: técnicas, estrategias y estímulos que inducen al consumo del contenido orgánico y pago, incluidos los `bp_brand_id` de cada marca y las técnicas visuales y escritas |

---

## 2. QUÉ SE PROMETE AL DECIR QUE ALGO ES ICR

> **Que vuelva a salir igual de bien la próxima vez sin que nadie esté mirando.**

Lo que sólo funciona porque alguien lo vigiló **no es ICR**. Lo que salió bien una vez por suerte
tampoco. La pregunta de ICR no es sobre la pieza: es sobre **el mecanismo que la produjo**.

**ICR se declara fallido —aunque las cuatro QA pasen— cuando:**

1. hizo falta un **paso manual que nadie documentó**;
2. funcionó porque alguien **recordó una trampa** que no está escrita en ningún sitio;
3. el mecanismo tiene **dos fuentes de verdad** y esta vez coincidieron;
4. el éxito se verificó por un **`200`** y no por el efecto;
5. la corrección arregló **la forma concreta que se vio** en lugar de **la clase entera** a la que
   pertenece.

**Un defecto que se repite es el síntoma de ICR por excelencia:** si vuelve, el arreglo anterior
atacó el síntoma y no el mecanismo.

---

## 3. LAS CLÁUSULAS

**Estatus declarado de todas: INFORMAN, NO BLOQUEAN** (decisión de Sam, 2026-09-12). Una cláusula
incumplida **no detiene la entrega**: la marca, y esa marca viaja con ella. Lo que bloquea sigue
siendo lo que ya bloqueaba —`QA-INFO`, un brief que hardcodea marca, un `str_replace` que no
matchea—, y este contrato no añade puertas nuevas.

**Por qué informan.** Un estándar que bloquea antes de poder medirse se desactiva el primer día que
estorba, y entonces no queda ni la medición ni el bloqueo. Primero se mide cuánto se incumple; el
día que una cláusula tenga tasa conocida, **su ascenso a bloqueante es una decisión de Sam con el
dato delante** — el mismo camino que `gate9Language`.

| # | Cláusula | Lo que promete | Su fuente |
|---|---|---|---|
| **C-01** | **Evidencia etiquetada** | Toda afirmación de estado lleva `medido` / `reportado` / `deducido`, con lo que debe acompañarla. Una afirmación sin etiqueta se lee como `medido`, así que omitirla es afirmar haber medido | `DELIVERY_AND_VERIFICATION_RULE.md` §4 |
| **C-02** | **Las cuatro QA, en orden y como acciones** | `QA-ENCARGO` → `QA-OBJETIVO` → `QA-INFO` → `QA-PROP`. `QA-INFO` es bloqueo. `QA-PROP` no existe sin `QA-OBJETIVO` validado con Sam | ídem §3 · `publicacion-operativa` §B.1 |
| **C-03** | **Regla multimarca** | El eje va en el código, la instancia en el dato. Test de la marca N+1 respondido antes de escribir constante, columna, `CHECK`, enum, clave de JSONB o rama | `MULTIBRAND_RULE.md` §1-§2 |
| **C-04** | **Carga de contexto comprobada** | La apertura se prueba con el panel de carga verificada, y **una fila sin evidencia es roja** | `DELIVERY_AND_VERIFICATION_RULE.md` §2.4 |
| **C-05** | **Actualización que preserva historia** | Orden `Professor` → `Actualiza` → commit único. Los context files se actualizan, nunca se reemplazan: nuevo al tope, anterior archivado bajo guard, nunca borrado | `CC_PROTOCOL.md` §0 · `HRD_ACTUALIZA` |
| **C-06** | **Reconocimiento de las herramientas** | Los labs son **apps del ecosistema** con repo, UI y modo dual, no servicios genéricos; un carril llama al lab por su `api_endpoint` y no construye su motor. Los skills se cargan según `skills/INDEX.md`. Un MCP se usa **con sus defectos declarados** delante | `ecosystem.json → labs._note` · `skills/INDEX.md` · `CAPABILITIES.md` |
| **C-07** | **El éxito se comprueba por el efecto** | Ni un `200` ni un PR mergeado son criterio de éxito. En publicación, el criterio es el identificador leído **desde la plataforma** y que el texto publicado coincida con el aprobado | `HRD-R11` · `publicacion-operativa` §B.3 |
| **C-08** | **Un error atrapado a propósito declara su vía de verificación** | Un `catch` que existe para no bloquear el camino principal **borra la señal**. Quien lo pone nombra, en el mismo sitio, la vía alternativa por la que se comprueba que no está ocurriendo — nunca la misma tabla que el fallo dejó sin escribir | `DELIVERY_AND_VERIFICATION_RULE.md` §4.2 |
| **C-09** | **Una sola fuente por hecho** | Cuando dos sitios describen el mismo hecho, una miente y otra manda. No se arbitra en el código: se muestra a Sam con las dos lecturas. **Una copia con guarda de divergencia no es un arreglo** | `publicacion-operativa` §C.9 |
| **C-10** | **Ausencia probada, no supuesta** | Antes de escribir «no existe» se ejecuta la consulta que lo probaría y se pega. Si no se puede pegar, no se escribe. Una búsqueda vacía se revisa antes de concluir ausencia, y se busca por el vocabulario del sistema, no por el nombre del síntoma | ídem §C.10 |
| **C-11** | **Se corrige la clase, no la forma vista** | Una corrección que arregla el caso concreto y deja vivo otro del mismo tipo en la misma frase no cerró el defecto | ídem §C.11 |
| **C-12** | **Entrega con destinatario declarado** | Todo lo que se entrega cae en un bloque con destinatario, en la marca que corresponde a la superficie. Un párrafo fuera de un bloque es contexto, no instrucción. Idioma ES o EN neutro internacional, sin voseo | `DELIVERY_AND_VERIFICATION_RULE.md` §2 y §2-bis |

---

## 4. LOS VERIFICADORES

**Los doce verificadores informan.** Cada uno declara **qué comprueba**, **dónde se mira** y su
**estado de implementación**, que es de dos clases:

- **EJECUTABLE HOY** — la comprobación se puede correr ya, con la consulta o el comando que se
  indica.
- **A ESPECIFICAR** — la comprobación está definida pero su consulta exacta **no se fija en este
  documento**: depende de nombres de objeto que hay que leer contra la base o el repo antes de
  escribirlos. **Escribir aquí un identificador sin haberlo medido sería afirmar sin medir**, que es
  justo lo que C-01 promete no hacer.

| ID | Comprueba | Dónde se mira | Estado |
|---|---|---|---|
| **V-01** | C-01 · que ninguna afirmación de estado del entregable viaje sin etiqueta | el entregable, antes de enviarlo. Autoverificación de cierre | EJECUTABLE HOY (revisión) |
| **V-02** | C-02 · que las cuatro QA consten en el brief y en el cuerpo del PR, con `QA-PROP` respondida en sus cinco preguntas | el cuerpo del PR. **Un brief sin `QA-PROP` se devuelve** | EJECUTABLE HOY (revisión de CC) |
| **V-03** | C-03 · que el diff no introduzca vocabulario de marca en capa compartida | `git diff --cached \| grep -nE '<lista de marcas activas>'`, con los tres desenlaces —legítimo · dato · violación— clasificados a mano. La lista de marcas **se lee de la tabla de marcas, no se escribe en el verificador** | EJECUTABLE HOY |
| **V-04** | C-03 · lo que el grep no caza: el eje bautizado con vocabulario de marca sin nombrarla | la pregunta 2 del test de la marca N+1, respondida por escrito | EJECUTABLE HOY (revisión) |
| **V-05** | C-04 · que el panel de apertura tenga evidencia por fila y que las dos reglas inviolables salgan verdes | el panel de la propia sesión | EJECUTABLE HOY |
| **V-06** | C-05 · que el commit de Actualiza no borre líneas de context files | el diff del PR: recuento de líneas eliminadas en los archivos de contexto | EJECUTABLE HOY |
| **V-07** | C-06 · que ningún carril construya el motor de un lab en vez de llamarlo por su `api_endpoint` | el repo del carril, contra el nodo `labs` de `ecosystem.json` | A ESPECIFICAR |
| **V-08** | C-07 · que una publicación dada por buena tenga identificador leído desde la plataforma | la plataforma primero; **después**, la fila de registro del estado final | A ESPECIFICAR |
| **V-09** | C-07 y §0 · que `icr_passed` discrimine en vez de acompañar | el código de `content-run-stage`, buscando el literal; y el recuento de piezas con `icr_passed` en falso. **Si es cero desde siempre, la bandera no juzga** | A ESPECIFICAR — **es el encargo abierto que este contrato deja nombrado** |
| **V-10** | C-08 · que todo `catch` deliberado tenga su vía alternativa escrita donde se lee el estado, y emita un código estable al atrapar | el archivo del `catch` y el `README` o la tabla de verificación posterior al despliegue | EJECUTABLE HOY (revisión) |
| **V-11** | C-09 · que la consulta que enfrenta dos fuentes del mismo hecho devuelva cero filas discrepantes | la consulta de enfrentamiento, escrita al declarar la divergencia | A ESPECIFICAR (una por divergencia) |
| **V-12** | C-12 · que no haya marca regional en el texto entregado — voseo, segunda persona del plural peninsular, y léxico marcado con equivalente neutro | patrón determinista **más** barrido morfológico con lista blanca. El patrón es un léxico y **por definición está incompleto**: solo, no cierra la cláusula | EJECUTABLE HOY |

**Regla de lectura de esta tabla:** un verificador **A ESPECIFICAR** no es un verificador que falta.
Es uno cuya consulta se escribe **midiendo**, en el encargo que lo toque, y se sube aquí entonces.
Poner hoy una consulta inventada para que la tabla se vea completa sería exactamente el defecto que
C-10 promete no cometer.

---

## 5. LA RELACIÓN ENTRE QA E ICR

**El QA asegura ESTA entrega. El ICR pregunta si el mecanismo que la produjo dará el mismo
resultado la vez cien.**

Son estándares distintos y se pueden cruzar en las cuatro combinaciones. La que importa nombrar es
esta: **una entrega puede pasar las cuatro QA y no ser ICR** — y entonces **se dice**, porque el
defecto no está en la pieza sino en el proceso que la hizo.

El caso canónico del ecosistema es **PUB-01**: el drenaje da por publicada una pieza con un `200`
sin verificar el efecto. La fila dice publicado, las QA pasan, y el mecanismo no lo comprobó.

**Forma de decirlo en una entrega:**

```
ICR: [sí | NO — <cuál de los cinco motivos de §2>, y qué haría falta para que lo fuera]
```

---

## 6. `icr_standard` POR MARCA — ES DATO, NO CÓDIGO

El estándar del ecosistema es **eje** y vive aquí. **Lo que cada marca exige de más es instancia y
vive en el dato**, resuelto por `brand_id` en runtime.

- **Pendiente declarado:** sembrar `icr_standard` para las marcas que aún no lo tienen, y hacerlo
  **con cada marca nueva que entre**.
- **El ICR del ecosistema es distinto del ICR del Document Factory de ForumPHs.** Aquel ya está
  construido y **no es el molde de este**: comparten nombre y no alcance. Se nombran por separado
  para que nadie derive el segundo del primero.

---

## 7. TEST DE LA MARCA N+1 (respondido)

1. **¿Sobrevive a que entre otra marca de otro rubro y otro país?** Sí. El contrato define un
   estándar de proceso; no nombra ninguna marca. Lo que una marca exija de más entra por §6, como
   fila.
2. **¿El nombre describe la FUNCIÓN o el CASO?** Función: *consistencia industrial de lo que el
   sistema produce*. Las cláusulas se nombran por lo que prometen, no por el incidente que las
   originó.
3. **¿Eje o instancia?** Eje. Las siete definiciones y las doce cláusulas son del sistema. El
   `icr_standard` de cada marca es instancia y vive en el dato.
4. **¿Cuántas marcas hay hoy en esta enumeración?** Cero. La única marca citada —el Document Factory
   de ForumPHs en §6— aparece **para declarar que su ICR NO es este**, que es lo contrario de
   tomarla como término del contrato.
5. **¿Quién más lee este eje?** Claude.ai, CC y Sam. Y, cuando V-09 cierre, el propio carril: hoy
   `icr_passed` ya se escribe sin que nadie lo comprueba, así que el concepto **ya tiene un
   consumidor en producción** antes de tener definición.

---

## 8. PUNTOS DE CARGA — POR ACTOR

Este documento es la **FUENTE ÚNICA**. Los demás sitios **apuntan y no copian**: lo que se copia,
diverge (`CC_PROTOCOL.md` §6).

| # | Dónde | Estatus | Qué lleva |
|---|---|---|---|
| 1 | `protocols/ICR_CONTRACT.md` | **FUENTE** | este documento |
| 2 | `CAPABILITIES.md` → ARTEFACTOS CONSULTABLES | **PUNTERO** | una fila, con la ruta |
| 3 | `AGENDA.md` → «Contrato ICR» | **PUNTERO** | deja de decir «pendiente: dónde vive» y apunta aquí; lo que sigue abierto se nombra como abierto |
| 4 | `.github/CLAUDE.md` de cada repo del org | **RESUMEN OPERATIVO** | §2 y la línea de `ICR:` del reporte. **No la tabla entera** |
| 5 | `skills/publicacion-operativa/SKILL.md` §B.0 | **PUNTERO** | ya define ICR y QA para publicar; gana la referencia a esta fuente |

**No se carga en la apertura.** Se consulta cuando hay que declarar el ICR de una entrega, y su
vocabulario —§1— se consulta cada vez que aparece una sigla.

---

_Fin · ICR_CONTRACT v1.0 · contrato del ecosistema · Unrealville Studio_
