---
name: publicacion-operativa
version: 1.0
fecha: 2026-09-12
capa: MÉTODO
destino: CARGABLE
audiencia: UNRLVL infra — transversal a todas las marcas
descripcion: >
  Cómo se opera la publicación: por el carril AIID y de urgencia fuera de él.
  Qué decide Sam, qué decido yo, qué le entrego y en qué momento. Dónde se mira
  cada cosa y con qué consulta. No produce texto — eso es content-pipeline.
---

# SKILL — PUBLICACIÓN OPERATIVA

> **ESTE DOCUMENTO ES MÉTODO. NO CONTIENE ESTADO.**
> Aquí no hay cuántos canales existen, cuáles están en alarma ni qué marca produce.
> Eso se consulta. Un número escrito aquí caduca en silencio y nadie sabe cuándo.
> **Si para saber si algo sigue siendo cierto hay que mirar la base, va como consulta
> y no como dato.** Regla de `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §2.

> **ESTE DOCUMENTO ES DEL CARRIL, NO DE NINGUNA MARCA.** No enumera marcas, dominios
> ni voces: todos se resuelven por `brand_id` en runtime. Si hace falta una marca para
> ilustrar, va como ejemplo y se dice que lo es.

> **Cuando este skill me obliga a escribir algo —una regla, una columna, un `CHECK`,
> un prompt— aplico antes el test de la marca N+1 de `protocols/MULTIBRAND_RULE.md`
> y respondo las cuatro preguntas en el entregable.**

---

# PARTE A — EL REPARTO. QUIÉN HACE QUÉ

## A.1 · Territorio exclusivo de Sam

**Nunca lo ejecuto en su lugar, ni se lo ofrezco como favor.**

| Acción | Por qué es suya |
|---|---|
| Mergear PRs y borrar ramas por GitHub Web UI | La revisión es el control de calidad del ecosistema |
| Desplegar Edge Functions | El despliegue es el momento en que el código empieza a afectar producción |
| Crear secrets y variables de entorno | El valor no pasa por el chat |
| Corregir lo ya publicado, en la plataforma | La pieza viva es suya |
| Escribir cadencia y margen | Son decisiones editoriales y de negocio |
| Activar o desactivar crons | Encender producción es decidir volumen |

**Si algo de esta lista aparece en mi entrega como «ya hecho», es un fallo mío, no una
eficiencia.**

## A.2 · Lo que sí ejecuto yo

Medir contra la fuente · aplicar DDL bajo HRD cuando Sam lo autoriza · corregir texto de
piezas cuando Sam lo pide · producir briefs para CC · registrar learnings.

## A.3 · Lo que le debo antes de pedirle cualquier decisión

**La medición y la consulta que la sostiene.** Una decisión pedida sin el dato delante es
una decisión que tendrá que rehacerse.

---

# PARTE B — QA E ICR. LOS DOS ESTÁNDARES, Y SON ACCIONES

## B.0 · Qué significan las dos siglas

**QA = Quality Assurance.** **No son etiquetas: son aseguramientos que ejecuto.** Escribir
`QA-INFO` al pie de una entrega no es declarar una fase superada: es afirmar que **hice el
aseguramiento de la calidad de la información que estoy manifestando**. Si no lo hice, la
etiqueta es una mentira con formato de protocolo.

**ICR = Industrial Consistency Ready.** Es el estándar del ecosistema UNRLVL: que lo que
sale sea **repetible y consistente a escala industrial**, no correcto una vez por suerte.
Una pieza, una función o una entrega es ICR cuando **volvería a salir igual de bien la
próxima vez sin que nadie estuviera mirando**. Lo que sólo funciona porque alguien lo
vigiló no es ICR.

**La relación entre los dos:** el QA asegura **esta** entrega; el ICR pregunta si el
**mecanismo** que la produjo dará el mismo resultado la vez cien. **Una entrega puede pasar
las cuatro QA y no ser ICR** — y entonces lo digo, porque el defecto no está en la pieza
sino en el proceso que la hizo.

## B.1 · Las cuatro QA, como acciones, aplicadas a publicar

**`QA-ENCARGO` — aseguro que entendí lo que Sam me pidió.**
La acción: devolverle el encargo con sus términos, no con los míos, y esperar su
corrección. En publicación, un encargo está entendido cuando puedo nombrar **qué pieza, a
qué canal, de qué marca y cuándo**. «Publicar esto» sin canal declarado **no es un encargo
entendido**: es una suposición mía a punto de ejecutarse.

**`QA-OBJETIVO` — aseguro que los dos tenemos claro a dónde apunta esto.**
La acción: enunciar el objetivo **en términos comprobables** y **esperar la confirmación de
Sam**. No es retórico: un objetivo confirmado es lo único contra lo que después se puede
medir la propuesta. En publicación distingue **publicar** de **conseguir algo publicando**,
que llevan a piezas distintas. Toca producción: **nunca se salta**.

**`QA-INFO` — aseguro la calidad de la información que voy a manifestar. ES BLOQUEO.**
La acción: para **cada afirmación** de la entrega, tener delante la consulta o el archivo
que la sostiene. **Si el dato se puede obtener, se obtiene antes de responder.** Si no hay
forma de obtenerlo solo, **no se entrega la respuesta: se entrega el plan para
conseguirlo**, con qué falta, quién lo consigue y cómo. **No existe un `QA-INFO`
incompleto:** una etiqueta que permite entregar sin la información no asegura nada, sólo
documenta que se sabía.
En publicación, el aseguramiento mínimo antes de prometer una publicación es: **canal
activo · credenciales resueltas · longitud contra el tope · proveedor con publicador ·
franja disponible**.

**`QA-PROP` — aseguro que lo que propongo responde al encargo, al objetivo y a la
información que aseguré.**
La acción: contrastar la propuesta contra las tres puertas anteriores **una por una**, y
responder por escrito las cinco preguntas: qué tendría que ser cierto · qué está medido y
qué deducido · qué se rompe y quién más lo lee · cómo se revierte · **qué efecto observable
prueba que funcionó**. **`QA-PROP` no existe sin `QA-OBJETIVO` validado con Sam.**

## B.2 · El aseguramiento de ICR, y cuándo lo declaro fallido

Antes de dar por cerrada una entrega, respondo: **¿esto vuelve a salir igual sin que nadie
mire?**

**No es ICR** —y lo digo aunque las cuatro QA pasen— cuando: hizo falta un paso manual que
nadie documentó · funcionó porque alguien recordó una trampa que no está escrita en ningún
sitio · el mecanismo tiene dos fuentes de verdad y esta vez coincidieron · el éxito se
verificó por un `200` y no por el efecto · o la corrección arregló **la forma concreta que
se vio** en lugar de **la clase entera** a la que pertenece.

**Un defecto que se repite es el síntoma de ICR por excelencia:** si vuelve, el arreglo
anterior atacó el síntoma y no el mecanismo.

## B.3 · El efecto observable de una publicación no es un `200`

**«El `200` de la API» y «el PR está mergeado» NO son criterios de éxito.** El criterio es
**el identificador del post leído desde la plataforma**, y que el texto publicado coincida
con el texto aprobado.

Esto no es celo: es el defecto **PUB-01** del propio carril — el drenaje da por publicada
una pieza con un `200`, sin verificar el efecto. **Es, además, el ejemplo canónico de algo
que pasa el QA y no es ICR:** la fila dice publicado y el mecanismo no lo comprobó.

## B.4 · Dónde vive el aseguramiento en el dato

El carril marca cada pieza con sus banderas de juicio. **Al diagnosticar, se leen; no se
asumen.** Y una bandera que **nunca ha rechazado nada** no prueba que todo esté bien:
prueba que hay que comprobar si discrimina o si sólo acompaña.

---

# PARTE C — HOW2. UNA ENTRADA POR PROBLEMA

*Formato de `ARQUITECTURA_DEL_CONOCIMIENTO.md` §3. Si una entrada no puede llenar
`VERIFICA`, no es método: es candidata a ejecutable.*

## C.1 — Cómo se despliega una Edge Function

**TÍTULO:** cómo llevar a producción una EF mergeada
**SÍNTOMA:** el PR está mergeado, el comportamiento no cambia, y se diagnostica el código
en vez del despliegue.
**CAUSA:** **push ≠ deploy.** Mergear no despliega. Los proyectos de Vercel sí se
despliegan solos al mergear; las Edge Functions de Supabase **no**.
**FORMA:** se lo entrego a Sam literal, porque lo ejecuta él, desde `main` actualizado:

```
supabase functions deploy <slug> --project-ref <project_ref> --no-verify-jwt
```

**Sin `--no-verify-jwt`, el cron y el carril empiezan a recibir 401** de la plataforma,
antes de que la función corra. Uno por vez, leyendo cada salida.
**VERIFICA:** `supabase functions list`. **El número que vale es el sufijo del
`entrypoint_path`, no el campo `version`** — divergen en silencio. O el `ezbr_sha256`,
que cambia si el código cambió.

## C.2 — Cómo se carga un secret

**TÍTULO:** cómo poner una credencial al alcance de una función
**SÍNTOMA:** la función responde 500 con «credencial ausente», o 403 del proveedor.
**CAUSA:** el secret no existe, o existe con el nombre equivocado.
**FORMA:** dos vías, y **el valor nunca pasa por el chat**: `supabase secrets set
NOMBRE=<valor> --project-ref <ref>`, o Dashboard → Edge Functions → Secrets. Para los que
se leen desde SQL, el patrón es `vault.create_secret` y lectura por
`vault.decrypted_secrets`.
**Trampa medida:** `SUPABASE_SERVICE_ROLE_KEY` puede venir en formato `sb_secret_`, que
**no es un JWT** y Storage rechaza con `Invalid Compact JWS`. La credencial que sirve para
Storage y para la API REST es la de **familia JWT**. Una función que suba al bucket debe
**elegir por familia**, no tomar la primera variable que encuentre.
**VERIFICA:** invocar la función y leer su respuesta, no la lista de secrets.

## C.3 — Cómo se enciende algo nuevo en el carril

**TÍTULO:** orden de encendido de un componente de producción
**SÍNTOMA:** se activa un cron y produce antes de que nadie haya visto qué hace.
**CAUSA:** activar es el primer paso más tentador y el último correcto.
**FORMA:** **desplegar → aplicar migraciones → correr en seco → leer el registro → y sólo
entonces activar.** Los crons nacen apagados. **Nunca le pido a Sam que active antes de
enseñarle el log de la corrida en seco.**
**VERIFICA:** el registro de la corrida en seco existe y Sam lo ha leído.

## C.4 — Cómo se publica por el carril

**TÍTULO:** el recorrido completo, y dónde se atasca
**SÍNTOMA:** «la pieza está aprobada» y no aparece publicada.
**CAUSA:** el carril tiene varias puertas y cada una retiene por un motivo distinto.
**FORMA:** el recorrido es *investigación → destilado → cola → construcción → juicio →
bandeja → aprobación de Sam → franja → publicación*. Al diagnosticar, **se recorre en
orden y se mira dónde se detuvo**, no se sospecha del último paso.
Dos retenciones que no son averías: **el detector de duplicados aparta antes de la
bandeja**, y **lo descartado no aparece en la bandeja porque no debe**.
**VERIFICA:** para cada pieza, en qué estado está y qué columna explica su retención.

## C.5 — Cómo publica cada proveedor, que no es igual

**TÍTULO:** empujar frente a marcar
**SÍNTOMA:** se declara roto un canal que funciona.
**CAUSA:** hay dos modelos de publicación y sólo uno pasa por el drenaje.
**FORMA:** **Meta se empuja** — hay que llamar a su API. **El sitio propio se marca** —
el canal lee la base y sirve lo que esté publicado; publicar es cambiar el estado, no
empujar nada. Por eso un rechazo del drenaje sobre un proveedor de sitio propio **es
correcto por diseño**: su camino de publicación es otro.
**VERIFICA:** ver qué filtro usa el canal para leer, y si el proveedor aparece en la
capacidad declarada del drenaje.

## C.6 — Cómo se publica de urgencia, fuera del carril

**TÍTULO:** sacar una pieza hoy sin romper el registro
**SÍNTOMA:** se publica a mano y mañana nadie sabe que salió.
**CAUSA:** el carril registra solo; a mano, hay que registrar.
**FORMA:** con la aprobación de Sam por delante — **texto e imágenes aprobados antes de
tocar la plataforma**. Después: la imagen necesita **URL pública**, porque las APIs de
Meta no aceptan archivo. Y al terminar, **se registra la fila de publicación con el
identificador devuelto**, para que exista rastro.
**Un carrusel de Instagram son contenedores hijos más un contenedor padre y una
publicación.** En Facebook, varias fotos son subidas no publicadas más un post que las
adjunta, **y eso exige token de página**: con un token de usuario, la plataforma rechaza
las subidas no publicadas.
**VERIFICA:** el identificador leído desde la plataforma, el orden de las imágenes tal
como se aprobó, y la fila de registro creada.

## C.7 — Cómo se lee la bandeja de calibración

**TÍTULO:** qué le pasa a una pieza después de cada clic de Sam
**SÍNTOMA:** Sam recuerda de memoria qué hace cada botón, o una bandeja vacía se lee como
avería.
**CAUSA:** los veredictos tienen consecuencias distintas y algunas son terminales.
**FORMA:** **aprobar** escribe estado `scheduled` con su aprobador — **no existe el estado
`approved`**. **Rechazar con nota `fixable:`** señala que la corrección es mecánica y la
pieza vuelve; **sin esa nota es descarte**. **Descartar** sella la marca de descarte y la
pieza **desaparece de la bandeja para siempre**. **Regenerar imagen** no toca el texto.
**Yo le digo qué pasa después de cada clic; no le pido que lo recuerde.**
**Una bandeja vacía tiene tres causas y sólo una es un fallo:** no entra nada nuevo · lo
que hay está descartado o ya calibrado · la consulta está rota. **Se sospecha en ese
orden.**
**VERIFICA:** contar por estado distinguiendo descartadas de visibles.

## C.8 — Cómo se regula el volumen

**TÍTULO:** qué perilla se toca cuando falta o sobra material
**SÍNTOMA:** se ajusta la cadencia para tapar una falta puntual, y la decisión editorial
queda contaminada.
**CAUSA:** confundir lo que Sam decidió con lo que está pasando.
**FORMA:** son **tres números con tres dueños**. La **cadencia** la escribe Sam y nadie
más. El **margen** lo escribe Sam: es la única perilla que sube si hace falta más. La
**cobertura** no la escribe nadie — **se calcula**. El regulador produce *cadencia +
margen* **sumando en tiempo de cálculo, sin persistir el resultado**.
**Si algo sube el volumen, sube el margen. Nunca la cadencia.**
**VERIFICA:** la cadencia es idéntica antes y después de cualquier ciclo. Ninguna
escritura automática la modifica.

## C.9 — Cómo se actúa ante dos fuentes que dicen lo mismo

**TÍTULO:** divergencia entre fuentes
**SÍNTOMA:** un componente hace lo que dice una tabla y otro lo que dice otra.
**CAUSA:** dos sitios describen el mismo hecho y nadie los reconcilia. Entonces **una
miente y otra manda**, y el sistema no sabe cuál.
**FORMA:** **no arbitro en el código.** Se lo muestro a Sam con las dos lecturas y su
consulta. Arbitrar sería decidir negocio dentro del código, que es lo que prohíbe la regla
multimarca. Y al proponer un arreglo: **una copia con guarda de divergencia no es un
arreglo** — es aceptar la divergencia y ponerle alarma. La forma correcta es que haya **una
sola fuente** y que las demás se deriven.
**VERIFICA:** la consulta que enfrenta las dos fuentes devuelve cero filas discrepantes.

## C.10 — Cómo se escribe una afirmación de estado

**TÍTULO:** medido, reportado, deducido
**SÍNTOMA:** se afirma que algo no existe, y existía.
**CAUSA:** se consulta A, sale vacío, y se concluye sobre B. **Una búsqueda vacía se
revisa antes de concluir ausencia**, y se busca por el vocabulario del sistema, no por el
nombre del síntoma.
**FORMA:** **antes de escribir «no existe», ejecuto la consulta que lo probaría y la
pego. Si no la puedo pegar, no lo escribo.** Y antes de declarar un hueco, **leo la
columna de notas de lo que parece apagado**: casi siempre trae escrita su razón.
**VERIFICA:** toda afirmación de estado del entregable lleva su consulta al lado. Una
afirmación sin etiqueta se lee como `medido`, así que omitirla es afirmar haber medido.

## C.11 — Cómo se corrige el registro, no sólo el síntoma

**TÍTULO:** corregir por el nombre del síntoma deja vivo lo que el síntoma no nombra
**SÍNTOMA:** se corrige un defecto de registro y queda otro del mismo tipo en la misma
frase.
**CAUSA:** se busca la forma concreta que se vio, no la clase a la que pertenece.
**FORMA:** el filtro de registro **no es «buscar voseo»: es buscar cualquier marca
regional** — voseo, segunda persona del plural peninsular, y léxico marcado con
equivalente neutro. Y el patrón determinista es **un léxico, por definición incompleto**:
su complemento obligatorio es un barrido morfológico con lista blanca de formas legítimas.
**Esto aplica también a lo que yo le escribo a Sam, no sólo a las piezas.**
**VERIFICA:** el patrón sobre el texto corregido devuelve cero, **y** el barrido
morfológico tampoco deja formas nuevas.

---

# PARTE D — DÓNDE SE MIRA CADA COSA

**Ninguna de estas cifras va en este documento. Van aquí las consultas.**

| Pregunta | Dónde se mira |
|---|---|
| ¿Qué canales tiene una marca y cuáles están activos? | tabla de canales de publicación, filtrando por activo |
| ¿Cuándo publica cada canal? | tabla de políticas: días de la semana por horas de franja |
| ¿Cuánto debe publicar? | tabla de cadencia, por marca × plataforma × fase |
| ¿En qué fase está una marca? | tabla de arranque: la fase **se deriva de la fecha, nunca se escribe** |
| ¿Cuánto margen tiene un canal? | tabla de margen de producción |
| ¿Hay material suficiente? | vista de cobertura: stock frente a franjas sin pieza |
| ¿Qué franjas vienen y cuáles están vacías? | tabla de franjas, futuras y por estado |
| ¿Por qué no se publicó algo? | registro del drenaje: su desenlace y su detalle literal |
| ¿Qué reglas juzgan una pieza y con qué severidad? | tabla de reglas del Watcher, activas y por `subject` |
| ¿Qué topes tiene un canal? | tabla de topes por plataforma, **nunca una constante en el código** |
| ¿Qué se publicó de verdad? | la plataforma. **Después**, la fila de registro |

**Regla de esta tabla:** si una consulta devuelve algo inesperado, **la primera sospecha es
la consulta**, no el sistema.

---

# PARTE E — QUÉ HAGO CON LO QUE APRENDO AQUÍ

Todo conocimiento va a **exactamente uno** de tres destinos, declarado al capturarlo, con
esta preferencia dura: **EJECUTABLE > CARGABLE > CONSULTABLE**.

- **Una regla que puede ser una aserción** —un `CHECK`, una regla del Watcher con patrón,
  un verificador— **no se deja como párrafo**. Dejarla en prosa es una degradación, y la
  prosa se incumple.
- **Un método** entra aquí, como entrada How2 con sus cinco secciones.
- **Un estado** no se escribe: se consulta.
- **Un frente abierto o una decisión pendiente de Sam** va a la agenda, no aquí.

**Queda prohibido el cuarto destino: «que lo lea todo el mundo siempre».**

---

# PARTE F — LO QUE ESTE SKILL NO CUBRE

- **Producir texto.** Eso es `content-pipeline` + `voice-craft` + `comm-arsenal`.
- **Calibrar una voz.** Eso es `genome-calibration`.
- **Estrategia de contenido** — a qué apostar, qué gana audiencia, qué convierte.
  Es otro skill y aún no existe.
- **Generar imagen o video.** Eso es `image-processing` / `higgsfield`.
