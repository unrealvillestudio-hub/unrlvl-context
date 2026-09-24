---
name: reparacion-de-carril
version: 1.0
fecha: 2026-09-24
capa: MÉTODO
destino: CARGABLE
audiencia: UNRLVL infra — transversal a todos los carriles y todas las marcas
descripcion: >
  Qué hacer cuando llega un aviso de un carril de producción: diagnosticar la causa
  real, corregirla en el orden correcto y verificarla POR EFECTO. Cubre las DOS mitades
  del carril —la de la base y la que vive fuera, en los crons externos—, las DOS puertas de
  entrada —canal de alertas y bandeja de aprobación—, el catálogo de
  remediación por código de fallo, y el criterio fail-loud frente a fail-soft. Nace de una
  sesión en la que se diagnosticaron cinco defectos con el mismo método cinco veces. No
  opera el carril —eso es publicacion-operativa— ni produce texto —eso es
  content-pipeline—. CERO ESTADO: lleva las consultas, no las cifras.
---

# SKILL — REPARACIÓN DE CARRIL

> **ESTE DOCUMENTO ES MÉTODO. NO CONTIENE ESTADO.**
> Aquí no hay cuántos eventos hay abiertos, qué umbral tiene una regla ni qué versión
> está desplegada. **Si para saber si algo sigue siendo cierto hay que mirar la base,
> va como consulta y no como dato** — `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §2.
> Donde esperes un número y encuentres una consulta, es deliberado.

> **ESTE DOCUMENTO ES DEL CARRIL, NO DE NINGÚN CARRIL EN PARTICULAR.** No nombra AIID
> ni PaidAds como si fueran el sistema: son **instancias**. Todo lo que aquí se llama
> «el carril» se resuelve en tiempo de diagnóstico, no está escrito.

---

## §0 — QUÉ ES ESTE SKILL, QUÉ NO ES, Y QUÉ NO TE AHORRA

**Se carga cuando** llega un aviso —Telegram, `content-approval@`, un informe— y hay que
**averiguar qué falló y arreglarlo**. Está pensado para abrir sesión nueva, cargarlo, y
trabajar sin tener que reconstruir la historia del ecosistema.

**Lo que SÍ te ahorra:** redescubrir el método de diagnóstico, volver a deducir dónde se
mira cada cosa, y volver a tropezar con las mismas ocho clases de defecto.

> ### ⚠️ LO QUE NO TE AHORRA, Y CONVIENE LEERLO ANTES DE EMPEZAR
>
> **1. No sustituye la carga de los protocolos.** `CC_PROTOCOL.md`, `MULTIBRAND_RULE.md` y
> `DELIVERY_AND_VERIFICATION_RULE.md` siguen siendo de carga obligatoria. Este skill te
> ahorra el **método**, no la **gobernanza**. Un arreglo rápido que llega en un PR sin las
> cuatro QA y sin el test de la marca N+1 **se devuelve**, y entonces no ahorró nada.
>
> **2. El riesgo de este skill es industrializar el error que viene a evitar.** Un
> reparador que va rápido es un reparador que comprueba lo que escribió. Por eso la
> columna vertebral de aquí abajo **es la verificación (§1 y §3-F5)**, y el catálogo de
> defectos (§4) va después, no antes. **Si sólo vas a leer una sección, lee §1.**

**Límites con los skills vecinos, para no duplicar ni chocar:**

| skill | qué cubre | cuándo lo invocas desde aquí |
|---|---|---|
| `publicacion-operativa` | **cómo se opera** el carril, el reparto Sam↔Claude, dónde se mira cada cosa | **Siempre**, en F2: su mapa es el punto de partida de este |
| `content-pipeline` | producir texto público | Nunca. Reparar no es reescribir |
| `supabase-auditor` | cruzar código↔DB a fondo, detectar vestigiales | Cuando el diagnóstico apunta a deriva estructural, no a un fallo concreto |
| `security` | todo deployment productivo | Si el arreglo toca secretos, permisos o `verify_jwt` |

---

## §1 — LA REGLA QUE GOBIERNA TODO LO DEMÁS

> # Una guarda que comprueba lo que se escribió no comprueba lo que va a pasar.

Esta frase no es un lema: es el resumen de **cinco defectos distintos en un solo día**, y
los cinco pasaron la revisión antes de llegar a producción.

| lo que se comprobó | lo que no se miró | lo que costó |
|---|---|---|
| el `DEFAULT` retirado del esquema | la **fila** que el código construye | 4 piezas muertas con `23502` |
| el número de un tope **escrito** | el **contador vivo** contra el que mide | apagón de generación de imágenes |
| el `REVOKE … FROM PUBLIC` puesto | el **`GRANT`** a quien la llama | un arreglo **inerte**, sin un solo síntoma |
| la migración aplicada | la **función realmente servida** | una afirmación falsa en un context file |
| la clave de agrupación corregida | el **umbral que dependía de ella** | 10 horas de canal de alertas mudo |

**Su corolario operativo, y es la técnica que encontró el defecto que ninguna revisión vio:**

> # Provocar el fallo es lo que lo encuentra.
>
> Un camino de recuperación que nunca se ha visto fallar **no está verificado**. Si el
> arreglo promete «esto sobrevive a que aquello se caiga», hay que **tirar aquello** y
> mirar. Cómo hacerlo sin romper nada, en **§3-F5**.

**Y la forma recurrente que toman los tres últimos casos de la tabla**, porque vas a
volver a verla:

> # Cuando se mueve el eje, todo número calibrado contra él pasa a medir otra cosa.
>
> Días naturales contra ventana rodante. `max_tokens` contra `max_chars`. Un umbral
> contra un cubo de agrupación que se acaba de estrechar. **Ninguno de los dos avisa.**

---

## §2 — PRIMERA PREGUNTA, SIEMPRE: ¿DE QUÉ CARRIL ES ESTE AVISO?

El ecosistema opera **N carriles** que **comparten labs**. Un aviso que no declara su
carril es un aviso a medio leer, y un arreglo que asume el carril equivocado toca código
compartido.

**Cómo se resuelve hoy** — y se resuelve **consultando**, no suponiendo:

```sql
-- ¿Qué carriles escriben asientos, y cómo se distinguen hoy?
select source_app, count(*) n, count(distinct lab) labs, count(distinct brand_id) marcas,
       min(generated_at)::date desde, max(generated_at)::date hasta
from public.ops_generation_ledger
group by 1 order by n desc;
```

⚠️ **Al 2026-09-24 el ledger NO tiene eje de imputación**: `source_app` es lo único
parecido y **mezcla carril, etapa y app ajena**. El eje propio está propuesto y sin
crear — ver el brief de costeo. **Mientras no exista, la pertenencia al carril se
argumenta, no se consulta**, y eso se dice en el reporte en vez de disimularlo.

**Test de la marca N+1, aplicado al arreglo antes de escribirlo** (`MULTIBRAND_RULE.md`):

1. ¿Sobrevive a que entre **otra marca** de otro rubro y otro país?
2. ¿Sobrevive a que entre **otro carril**? Si arreglarlo para el segundo exige editar
   código, el arreglo está mal.
3. ¿El nombre describe la **FUNCIÓN** o el **CASO**?
4. ¿Cuántas instancias hay hoy en la enumeración? **Si es una, revisar el nombre.**

> **Un aviso llega siempre desde un caso concreto —una marca, un canal, un lab— y esa es
> justamente la trampa.** El caso te dice dónde mirar; **no** te dice dónde arreglar.

---

## §2-BIS — EL CARRIL NO VIVE SÓLO EN LA BASE

**Un reparador que sólo mira Supabase no ve la mitad del sistema**, y esa mitad es
precisamente la que vigila a la otra. Costó una hora de búsqueda en el proyecto
equivocado: **antes de diagnosticar, resuelve dónde vive el componente.**

| dónde vive | qué hay allí | cómo se lee |
|---|---|---|
| **Supabase** | Edge Functions, `pg_cron`, esquemas, reglas | SQL y la función **servida** |
| **Vercel** | los **crons externos** y las apps que llaman al carril desde fuera | `vercel.json` del repo **y** los logs de runtime del despliegue |
| **Otros repos** | los labs. El carril los llama por su `api_endpoint`; **nunca construye su motor** | su propio repo, nunca desde aquí |

> **Por qué hay vigilancia fuera de la base, y no es un capricho:** *un vigilante que corre
> dentro de lo que vigila no puede avisar de que lo vigilado se cayó.* Por eso hay
> vigilancia mutua — algo fuera mira la base, y algo en la base mira que eso de fuera
> siga llamando.

**Cómo se localiza un cron externo, que es donde se pierde el tiempo:**

1. **No se adivina por el nombre del proyecto.** Se lee el `vercel.json` del repo: si no
   tiene bloque `crons`, ese proyecto **no dispara nada**, por sugerente que sea su nombre.
2. **Se confirma por sus logs de runtime**, que dicen la hora real de cada pasada y su
   código de estado. Un proyecto con una línea de log en siete horas no está corriendo un
   cron cada cinco minutos.
3. **El reloj se lee del historial, no de la expresión cron** (§3-F5).

**Tres trampas medidas de la mitad externa:**

- **El despliegue no es el merge.** Si el proyecto está conectado a git, el merge dispara
  el despliegue **solo**; si no, hay que desplegarlo. **Compruébalo en vez de suponerlo:
  el cron corre sobre el despliegue, no sobre `main`.**
- **La ruta de la API puede comérsela un `rewrite` catch-all.** Si el `vercel.json` tiene
  una regla que manda todo a la app, `/api` debe quedar **excluido** explícitamente.
- **El endpoint suele exigir un secreto de cron en la cabecera.** No se prueba a mano con
  el valor: **no manejas ese valor** (§6). Se diagnostica por logs y por efecto.

---

## §2-TER — LAS DOS PUERTAS DE ENTRADA, Y NO SE TRABAJAN IGUAL

Un aviso llega por **una de dos**, y el diagnóstico arranca por sitios distintos:

| llega por | qué te está diciendo | por dónde se tira del hilo |
|---|---|---|
| **el canal de alertas** (Telegram) | **una regla** se disparó | de la **regla** al evento, y del evento a la pieza |
| **la bandeja de aprobación** (`content-approval@`) o un informe | **un número o una pieza** no cuadra | de la **pieza** hacia atrás, hasta el paso que falló |

### Cuando el aviso llega por la bandeja: se tira de la PIEZA

```sql
-- De la pieza hacia atrás: en qué estado está y qué dejó escrito cada paso
select id, brand_id, domain, platform, status, pass_type,
       created_at, approved_at, challenged_at, discarded_at, published_at,
       challenged_reason, deferred_reason, discarded_reason, orchestrator_job_id
from content.content_pieces
where id = :piece_id;   -- o: where status = 'challenged' order by created_at desc limit 20
```

```sql
-- Qué consumió esa pieza, paso a paso, con sus fallos: el ledger es la caja negra
select lab, output_type, provider, model_id, status, cost_usd,
       duration_ms, left(coalesce(error_msg,''), 140) as error, generated_at
from public.ops_generation_ledger
where piece_id = :piece_id order by generated_at;
```

> **La pieza dice QUÉ le falta; el ledger dice QUIÉN se lo debía.** Una pieza en
> `challenged` cuyo ledger muestra el lab en `failed` ya tiene el diagnóstico hecho: lo
> que queda es la causa del fallo de ese lab, y ahí vuelves a **§3-F2**.

### Y si el aviso es «este número no cuadra»

**Antes de buscar el fallo, comprueba que las dos cifras cuentan lo mismo.** Ha pasado:
tres instrumentos respondían *«cuántas piezas esperan criterio»* y daban **tres números
distintos**, y ninguno estaba roto — **contaban cosas distintas con el mismo nombre**.

```sql
-- El reparto por estado, que es la pregunta bien hecha
select status, count(*) n, max(created_at) ultimo
from content.content_pieces group by 1 order by n desc;
```

> ### La regla que sale de aquel caso, y es §4.10
>
> **El estado vivo de una fila es su `status`; las columnas `*_at` son HISTORIA.** Una
> `*_at` dice que algo le **pasó** a la fila, no lo que la fila **es**. Dos consultas
> correctas por separado —una por `status`, otra por una fecha— **mienten juntas y en las
> dos direcciones**: cuentan de más las que están en ambas, y de menos las que cambiaron
> de estado después.

---

## §3 — LAS CINCO FASES

### F1 · Recibir el aviso y NO creérselo

**Un aviso nombra un síntoma, y a veces afirma una causa que no midió.**

Caso real: `WATCHDOG_SILENT` anunciaba *«el vigilante externo dejó de latir»* sobre un
vigilante que estaba llamando **cada cinco minutos con reloj suizo**. La afirmación era
falsa; el síntoma, real.

**Qué se hace:**

1. Separar, por escrito, **qué observó** el aviso de **qué concluyó**.
2. Anotar la conclusión del aviso como **hipótesis a refutar**, no como punto de partida.
3. Leer el evento entero, no el titular:

```sql
select public_ref, rule_code, severity, state, occurrences,
       first_seen, last_seen, next_notify_at, resolved_at,
       payload, channel_refs
from alerting.alert_events
where public_ref = :ref;   -- o: order by last_seen desc limit 10
```

**Termina cuando** puedes decir: *«el aviso observó X; concluyó Y; Y está sin comprobar».*

---

### F2 · Localizar al emisor exacto

**Quién escribió esa frase, literalmente.** No dónde crees que se escribe: dónde se
escribe.

**Pero antes de abrir código: mira si ese fallo ya tiene respuesta escrita.**

```sql
-- PRIMERA PARADA. Puede que alguien ya diagnosticara esto y dejara qué hacer.
select code, subcode, what_to_do, why, permanent_fix, auto_action
from alerting.failure_remediation
where code = :code and coalesce(subcode,'') = coalesce(:subcode,'');
```

Si hay fila, **`why` te ahorra la fase 3 entera** y `permanent_fix` te dice si lo que vas
a hacer es un parche o el arreglo. **Si no hay fila, tu trabajo termina escribiéndola**
(§7).

```sql
-- La regla que disparó: su condición, su umbral, su cubo de agrupación y su ruta
select code, severity, silent, active, threshold, window_minutes,
       dedupe_fields::text as dedupe, resolve_after_quiet_min,
       escalate_every_min, reminder_every_min
from alerting.alert_rules where code = :rule_code;
```

```sql
-- El cuerpo REAL de una función, no lo que la migración pretendía dejar
select pg_get_functiondef(p.oid)
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = :schema and p.proname = :fn;
```

**Para una Edge Function se verifica POR CONTENIDO, nunca por contador de versión.** Se
lee la función servida y se busca el marcador del cambio. Un número de versión que sube
no dice qué subió.

**Termina cuando** tienes el archivo y la línea, o la definición de la función, **delante**.

---

### F3 · Diagnosticar: medir el PEOR CASO, no el primero accesible

> **Una hipótesis descartada con la medición equivocada sigue sin descartarse.**
>
> Caso real: para decidir si la base estaba lenta se midió un CTE —**52 ms**— y se
> declaró sana. **La consulta cara era otra, dentro de la misma función.** La medición
> fue real, el número correcto y la conclusión falsa.

**Qué se hace:**

1. Enumerar **todos** los caminos que pudieron producir el síntoma. Escribirlos.
2. Medir **el más caro o el más sospechoso**, no el más fácil de medir.
3. Al afirmar, **nombrar qué se midió**, no sólo qué se concluye.

```sql
-- Coste real de un plan, ejecutado y con buffers. EXPLAIN planifica; no ejecuta.
explain (analyze, buffers, format text) <la consulta sospechosa>;
```

```sql
-- ¿La tabla crece sin purga? Clase de defecto §4.8
select s.schemaname, s.relname, s.n_live_tup,
       pg_size_pretty(pg_total_relation_size(c.oid)) as tamano
from pg_class c join pg_stat_user_tables s on s.relid = c.oid
where s.relname = :tabla;
-- `relname` va cualificada a proposito: existe en las DOS tablas y sin prefijo
-- Postgres devuelve 42702 «column reference is ambiguous». Probada el 2026-09-24.
```

**Antes de pasar a F4, contesta por escrito:** *¿qué tendría que ser cierto para que mi
causa sea la causa?* Si la respuesta incluye algo que no mediste, **vuelve a F3**.

---

### F4 · Corregir en el orden correcto

**El orden no es preferencia, es la regla** (`MULTIBRAND_RULE.md`):

> **PR DE CÓDIGO PRIMERO, DDL DESPUÉS.** Ampliar un `CHECK` cuyo valor el builder no
> tiene cableado produce fail-loud. **Al retirar** un respaldo el riesgo es el inverso y
> suele ser nulo, pero **se argumenta, no se asume**.

**Reglas del arreglo:**

| regla | por qué |
|---|---|
| **Mínimo**: lo que el fallo necesita, nada más | ensanchar el PR por tu cuenta lo hace irrevisable |
| **La guarda mira lo que VA A PASAR** | una que mira el esquema no ve el lado del código |
| **La guarda ata el número a su eje** | si el eje cambia, la migración falla en vez de mentir |
| **Verificación dentro de la misma transacción** | un fallo no puede dejar un estado a medias |
| **Reversión en UN paso**, escrita en el propio archivo | si no se puede, pártelo hasta que se pueda |
| **Nunca editar una migración ya escrita** | un registro que se edita para que cuadre deja de ser un registro |
| **Nunca actualizar un pin para callar un test** | `MIGRACIONES_CONGELADAS.md`: la respuesta nunca es actualizar el pin |

**Y el test que faltaba**: si el defecto pudo existir, **escribe el test que lo
reproduce**, no el que comprueba el arreglo. Un test que sólo verifica el arreglo se
pone verde el día que el arreglo se deshaga por otra vía.

> **Un test que nunca ha detectado nada no es un test verde: es un test sin probar.** Si
> la guarda nueva no tiene ningún caso real que revisar hoy, **ejercítala con casos
> sintéticos** — uno que reproduzca el defecto y otro que represente la regla cumplida.

---

### F5 · Verificar POR EFECTO — y provocar el fallo si hace falta

**«La migración se aplicó» no es verificación. «El PR está mergeado» tampoco.**

**Nombra el efecto observable ANTES de arreglar**, y después mídelo. Si el arreglo
promete que algo sobrevive a un fallo, **hay que provocar ese fallo**.

**Técnica de fallo controlado, no destructiva** — la que encontró el defecto del `GRANT`:

1. **Elegir el punto de bloqueo**: una fila que la función vigilada necesita tomar. Por
   ejemplo, una que su camino abra con `FOR UPDATE`.
2. **Elegir la ventana**: un momento en que la vía de aviso directa **no** dispare, para
   no despertar a nadie con una prueba.
3. **Retener el bloqueo** dentro de una sola transacción, el tiempo que cubra una pasada
   completa del proceso más su secuencia de reintentos:

```sql
DO $$
DECLARE v_x bigint;
BEGIN
  SELECT <columna> INTO v_x FROM <tabla> WHERE <la fila> FOR UPDATE;
  RAISE NOTICE 'bloqueo tomado a %', clock_timestamp();
  PERFORM pg_sleep(<segundos>);   -- por debajo de statement_timeout
END $$;
```

4. **Confirmar que el bloqueo muerde**, en vez de suponerlo:

```sql
select pid, state, wait_event_type, wait_event,
       round(extract(epoch from (now()-query_start)))::int as seg
from pg_stat_activity
where datname = current_database() and pid <> pg_backend_pid() and state <> 'idle';
-- El proceso vigilado debe aparecer esperando. Si no aparece, la ventana falló.
```

5. **Medir el efecto**, no el código.

> **Dos trampas medidas, y las dos costaron una ventana:**
>
> - **El reloj de un cron se LEE de su historial, no se infiere de su expresión.** Una
>   expresión declara el minuto y **no dice nada del segundo**: un cron externo disparaba
>   a los **~43 s** del minuto y la ventana se cerró trece segundos antes.
> - **Una respuesta `502` del gateway no dice que el SQL no corriera.** Confírmalo en
>   `pg_stat_activity` antes de repetir la operación.

**Termina cuando** el efecto nombrado de antemano está medido — **y cuando el efecto
negativo también lo está**: que lo que no debía pasar, no pasó.

---

## §4 — CATÁLOGO DE CLASES DE DEFECTO

**No es una lista de bugs: es una lista de FORMAS.** Cada una se ha cobrado algo real.

### 4.1 · La guarda mira el esquema y no la fila
**Síntoma:** una migración de esquema se aplica, su guarda pasa, y el código que depende
de ella muere en producción.
**Raíz:** comprobar que una migración se aplicó **no** es comprobar que el código que
depende de ella funciona.
**Se confirma:** ejecutando el constructor real del objeto y mirando el resultado.
**Se corrige:** con un test que **importe el bloque real** y reproduzca el fallo.

### 4.2 · Tipos borrados en runtime: la clave que se cae al suelo
**Síntoma:** un valor no llega, sin un solo error ni log.
**Raíz:** Deno **borra los tipos** en las Edge Functions. Una clave sobrante en un objeto
literal no es un error: es un silencio. Y un constructor que arma su salida con una
**lista fija** de claves ignora todo lo demás.
**Se confirma:** ninguna revisión visual vale — hay que ejecutar y mirar el objeto.
**Se corrige:** metiendo el valor **donde el constructor lo lee**, con una sola
definición difundida a todas las ramas.

### 4.3 · Un número medido en una unidad y aplicado en otra
**Síntoma:** un tope, cuota o presupuesto se comporta como si fuera otro.
**Raíz:** no es conservador ni agresivo: **es otro número**.
**Se confirma:** midiendo el valor vivo **en la unidad del mecanismo**, no en la del
cálculo.
**Se corrige:** haciendo que **la unidad viaje en el dato** —`*_max` junto a
`*_window_hours`—, para que el nombre no pueda contradecir al mecanismo.

### 4.4 · `REVOKE` sin `GRANT`: la función que nadie puede llamar
**Síntoma:** ninguno. El arreglo queda **inerte** y el sistema se comporta igual que antes.
**Raíz:** revocar a `PUBLIC` y conceder a quien llama son **dos mitades de una regla**.
`CC_PROTOCOL` §11 nombra la primera porque es la que se olvida, no porque sea la única.
**Se confirma:**
```sql
select p.proname, coalesce(array_to_string(p.proacl,' | '),'SIN ACL') as acl
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname = :schema and p.proname = :fn;
-- Compárala con la de una función hermana que SÍ funciona.
```
**Se corrige:** con el `GRANT` al rol que la invoca; y si nadie debe invocarla desde
fuera, **se declara por qué** en vez de callar.

### 4.5 · Un fail-soft cuyo fallo nadie observa
**Síntoma:** ninguno, otra vez. Algo falla en cada pasada y otra cosa cubre el hueco.
**Raíz:** el `try/catch` era correcto —un paso roto no debe llevarse por delante el
resto—, pero **su resultado no se mira en ningún sitio**.
**Se confirma:** provocando el fallo del camino principal (§3-F5) y viendo si el
secundario de verdad entra.
**Se corrige:** haciendo el fallo **observable** —un contador, un campo en la respuesta
que alguien consulte, una alerta—. *No-crítico debe significar «no mata la pieza», jamás
«no se nota».*

### 4.6 · El eje cambió y el umbral se quedó
**Síntoma:** un detector deja de disparar, o dispara de más, sin que nadie tocara el
detector.
**Raíz:** se afinó la clave de agrupación y **no se revisó el número calibrado contra
ella**.
**Se confirma:** recontando los cubos con la clave vieja y con la nueva:
```sql
select 'cubo actual' as escenario, count(*) cubos, max(n) mayor,
       count(*) filter (where n >= :threshold) as dispararian
from (select dedupe_key, sum(occurrences) n from alerting.alert_events
      where rule_code = :rule and state = 'counting' group by 1) x;
```
**Se corrige:** recalibrando el umbral **a su cubo**, y con una guarda que ate uno al otro.

### 4.7 · Una columna con `DEFAULT` que miente
**Síntoma:** un dato que parece registrado y no lo está.
**Raíz:** una columna que registra **quién** o **cómo** no puede tener `DEFAULT`.
**Se confirma:** contrastando su cobertura con su evidencia correlativa — un default se
delata porque **su valor tiene cobertura total y su evidencia no**.
**Se corrige:** en dos pasos y en este orden — primero el código que escribe el valor,
después el `DROP DEFAULT`.

### 4.8 · Escaneo secuencial sobre una tabla que crece sin purga
**Síntoma:** un proceso periódico que empieza a agotar su timeout, de forma intermitente.
**Raíz:** se filtra por una columna **sin índice** sobre una tabla de historial sin
retención. Y a veces **la lección ya estaba escrita** en la función vecina, sin leer.
**Se confirma:** con `explain (analyze, buffers)` y el tamaño de la tabla.
**Se corrige:** filtrando por una columna indexada —una marca de agua leída **antes** del
refresco que la mueve— **más una purga con retención desde el primer día**.

### 4.9 · Un servicio mal configurado que responde `200`
**Síntoma:** ninguno hasta que alguien pregunta. El servicio contesta, y contesta bien.
**Raíz:** arranca sin una variable, un secreto o un destino, y **degrada en silencio** en
vez de negarse. Es la cara opuesta de §4.5: allí el fallo se capturaba y no se miraba;
aquí **ni siquiera llega a ser un fallo**.
**Se confirma:** forzando la ausencia en un entorno que no sea producción, o leyendo el
arranque del servicio y buscando qué hace cuando le falta algo.
**Se corrige:** **fail-loud**. Si falta lo que necesita para hacer su trabajo, devuelve un
error que se vea.

> **El criterio, y se aplica también al arreglo que estés escribiendo:**
> **un vigilante mal configurado que devuelve `200` es peor que uno caído, porque nadie lo
> mira.** Un servicio degradado que calla convierte un problema de configuración —barato,
> de minutos— en un problema de confianza: el día que de verdad haga falta, nadie sabrá
> que llevaba semanas sin hacer nada.

**Dónde elegir entre las dos formas**, porque no es preferencia:

| situación | forma correcta |
|---|---|
| le falta **configuración** para existir | **fail-loud** — 4.9 |
| falla **un paso opcional** de un trabajo que puede seguir | **fail-soft, con el fallo observable** — 4.5 |
| falla **el paso que da sentido al trabajo** | fail-loud, aunque duela |

### 4.10 · Contar por una columna `*_at` es contar el pasado y llamarlo presente
**Síntoma:** dos instrumentos responden la misma pregunta con números distintos, y
ninguno está roto.
**Raíz:** **el estado vivo de una fila es su `status`.** Las columnas `*_at` son historia:
dicen que algo le **pasó**, no lo que **es**. Y un criterio **tampoco es una cadena**: un
veredicto no se reconoce porque su motivo empiece por una palabra.
**Se confirma:** contando por `status` y por la fecha **por separado**, y mirando la
intersección — las que están en las dos son la prueba.
**Se corrige:** contando por `status`, siempre; y si de verdad hace falta la historia, se
nombra como historia y no se suma con el presente.

> **Al añadir una clase nueva a este catálogo, escribe las cinco líneas: síntoma, raíz,
> cómo se confirma, cómo se corrige y qué costó.** Una entrada sin «cómo se confirma» es
> una anécdota.

---

## §5 — EL MAPA: DÓNDE SE MIRA CADA COSA

**Consultas, no cifras.** El mapa operativo completo vive en `publicacion-operativa`;
aquí van sólo las del diagnóstico.

**Lo primero, siempre: ¿este código de fallo ya tiene respuesta escrita?**

```sql
-- El catálogo entero, para ver qué está cubierto y qué no
select code, subcode, left(what_to_do, 80) as que_hacer,
       left(permanent_fix, 80) as arreglo_definitivo, auto_action
from alerting.failure_remediation order by code, subcode;
```

```sql
-- Y los códigos que el carril está produciendo de verdad, que no son los mismos
select rule_code, payload->>'causa' as causa, count(*) n, max(last_seen) ultimo
from alerting.alert_events
where first_seen > now() - interval '7 days'
group by 1,2 order by n desc limit 20;
```

> **Los dos conjuntos no coinciden, y la diferencia es el trabajo:** lo que el carril
> produce y el catálogo no cubre es **exactamente lo que falta por diagnosticar**.

⚠️ **Trampa al escribir en esa tabla:** su índice único va **por expresión** sobre
`(code, coalesce(subcode,''))`, así que **un `ON CONFLICT (code, subcode)` no matchea**. Y
`why` es `NOT NULL` — a propósito: **una remediación sin causa es una receta, y las recetas
se aplican sin pensar.**

> **`auto_action` es la semilla del corrector automático y hoy no lo lee nadie**
> [`reportado`, `ecosystem.json`]. Escríbelo igual, pensando en que algún día se ejecute
> solo: es la diferencia entre dejar una nota y dejar un mecanismo.

**¿Está vivo el canal de avisos, o es que no hay nada que decir?** — la pregunta que
distingue las dos clases de silencio:

```sql
-- 1. ¿Corren los crons del canal?
select j.jobname, j.schedule, j.active, r.status, r.start_time
from cron.job j left join lateral (
  select status, start_time from cron.job_run_details d
  where d.jobid = j.jobid order by runid desc limit 1) r on true
where j.jobname like 'alerting%' order by j.jobid;

-- 2. ¿Las llamadas salen y vuelven bien?
select status_code, created, left(content::text, 120) as respuesta
from net._http_response where created > now() - interval '30 minutes'
order by created desc limit 10;
```

> Un despachador que responde `processed: 0` **está sano y sin cola**. Eso **no** prueba
> que no haya nada roto: prueba que nada cruzó el umbral. Sigue por §4.6.

**¿Hay fallos detectados que no avisaron?**

```sql
select rule_code, state, count(*) n, min(first_seen) mas_antiguo,
       count(*) filter (where channel_refs::text <> '{}') as con_envio
from alerting.alert_events group by 1,2 order by 1,2;
```

**¿A quién llega cada severidad?** — antes de concluir que «falta un aviso»:

```sql
select r.severity, c.transport, r.active
from alerting.alert_routes r join alerting.alert_channels c on c.id = r.channel_id
order by r.severity;
```

> ⚠️ **Que una severidad no tenga ruta a un transporte puede ser deliberado.** Comprueba
> la decisión escrita antes de «arreglarlo»: **Telegram es para alertas; los informes son
> los ya establecidos** (decisión de Sam, 2026-09-23).

**El carril en sí** — cobertura de asientos, fallos por lab, piezas atascadas: las
consultas viven en `publicacion-operativa` Parte D. **No se duplican aquí.**

---

## §6 — LO QUE ESTE SKILL NUNCA HACE

**Territorio exclusivo de Sam** (`publicacion-operativa` A.1). Si aparece en tu entrega
como «ya hecho», es un fallo tuyo, no una eficiencia:

- **Mergear PRs y borrar ramas.**
- **Desplegar Edge Functions.** Si el arreglo lo exige, **dilo y para**: tú publicas la
  rama y abres el PR; el despliegue es suyo. Y recuérdale la trampa: `verify_jwt` tiene
  **default TRUE**, y una EF que corre con `false` y se despliega sin pasarlo explícito
  **deja a todo llamador en 401**.
- **Crear o rotar secretos.** Ningún valor de secreto entra en un archivo, en un PR ni en
  el chat. **Las claves se nombran; los valores los carga Sam.**
- **Encender o apagar crons.**
- **Corregir lo ya publicado en la plataforma.**

**Y dos que son de este skill en particular:**

- **No reescribe una migración ya aplicada** para que cuadre con el arreglo nuevo.
- **No provoca un fallo controlado en una ventana en la que el aviso directo dispara**,
  salvo que Sam lo pida. Una prueba no despierta a nadie.

---

## §7 — LA ENTREGA

Todo lo que sale de este skill va en **bloques con destinatario declarado** —🟩 para Sam,
🟧 para CC— y cumple `DELIVERY_AND_VERIFICATION_RULE.md`. En particular:

- **Cada afirmación de estado lleva su etiqueta** `medido` / `reportado` / `deducido`. Sin
  etiqueta se lee como `medido`, y afirmar haber medido sin haberlo hecho es el defecto
  §4 que no tiene número porque los produce todos.
- **Las cuatro QA en orden**, y `QA-INFO` **bloquea**: sin la información completa no se
  responde; se entrega el **plan para obtenerla**.
- **`QA-PROP` respondida por escrito** en el PR, las cinco preguntas.
- **El test de la marca N+1 respondido** si el arreglo toca código, DDL o siembra.
- **El reporte dice qué NO se arregló y por qué.** Un frente que queda abierto se nombra;
  uno que se calla reaparece como sorpresa.

**Plantilla mínima del reporte:**

```
AVISO:        [qué decía, literal]
OBSERVÓ:      [el hecho]           CONCLUYÓ: [la afirmación, a refutar]
CAUSA REAL:   [archivo:línea o función]        [medido con: <la consulta>]
CLASE:        [§4.x, o «nueva» + sus cinco líneas]
ARREGLO:      [qué, y en qué orden]            REVERSIÓN: [un paso]
VERIFICADO:   [el efecto observable, medido]   [y el efecto negativo]
QUEDA ABIERTO:[lo que no se tocó, y por qué]
REMEDIACIÓN:  [fila escrita en alerting.failure_remediation, o por qué no aplica]
```

> **La última línea no es burocracia: es lo que hace que el próximo aviso igual cueste
> minutos en vez de horas.** Si diagnosticaste un código que no estaba en el catálogo y
> no lo escribes, **el siguiente lo diagnostica desde cero** — que es justamente lo que
> este skill existe para evitar.

---

## §8 — AUTOVERIFICACIÓN DE CIERRE

> ¿Refuté la conclusión del aviso en vez de heredarla? ¿Medí el peor caso o el primero
> que tenía a mano? ¿Mi guarda mira lo que va a pasar, o sólo lo que escribí? ¿Nombré el
> efecto observable **antes** de arreglar? ¿Provoqué el fallo, o estoy suponiendo que el
> camino de recuperación funciona? ¿El arreglo sobrevive a otra marca **y a otro carril**?
> ¿Hay un test que **reproduce** el defecto, y lo he visto ponerse rojo? ¿Dije lo que
> queda abierto? ¿Comprobé si el componente vive **fuera** de la base antes de buscarlo
> dentro? ¿Dejé escrita la remediación del código que diagnostiqué?

**Y la que cierra de verdad:**

> ¿Hay alguna afirmación en mi entrega que no pueda señalar con el dedo en una consulta o
> en una línea de archivo?

---

_Nace de la sesión del 2026-09-23, en la que se diagnosticaron y corrigieron cinco
defectos en producción —cuatro de ellos introducidos ese mismo día— y el método fue el
mismo las cinco veces. Los casos citados son reales y están medidos; los números concretos
viven en `IID/session_log.md`, entrada del 2026-09-23, **no aquí**._
