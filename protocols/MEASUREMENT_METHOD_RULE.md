# MÉTODO DE MEDICIÓN — tres reglas que salieron de tres sustos

**Emitido:** 2026-09-08 · **Origen:** N09 y N12 · **Aplica a:** CC y a cualquiera que mida contra
producción desde un contenedor.

> **Actualización 2026-09-09 — entra una cuarta regla, §4, y ninguna de las tres se deroga.** El
> título dice «tres reglas» porque así nació el documento y **no se reescribe**: la cuarta se suma
> abajo con su propio motivo medido. El cierre «Lo que las tres tienen en común» también se conserva
> literal, y lo que dice sigue siendo cierto de las cuatro.

> **Actualización 2026-09-10 — entra una quinta regla, §5, y ninguna de las cuatro se deroga.** Sale
> del caso que **la §4 no podía cazar**: el `sha` se verificó correctamente **sobre la función
> equivocada**. La §5 no corrige a la §4 — la completa por delante y por detrás. El título y el
> cierre se conservan literales, por el mismo criterio de la actualización anterior.

> **Actualización 2026-09-17 — entra una sexta regla, §6, y ninguna de las cinco se deroga.** Sale
> del caso que **ninguna de las cinco podía cazar**: el escalón era el correcto y el objeto también;
> **lo equivocado era la vía**. `EXPLAIN (ANALYZE)` en el nivel superior midió **259 ms** de una
> consulta que dentro de su función PL/pgSQL tarda **17.090 ms**, porque **`SELECT … INTO` impone un
> límite de filas y un plan con límite de filas no se paraleliza** — con la etiqueta `medido` puesta,
> mergeado, y **siete minutos de vigilante roto en producción**. El título sigue diciendo «tres
> reglas» y **no se reescribe**, y el cierre «Lo que las tres tienen en común» se conserva literal:
> lo que dice sigue siendo cierto de las seis.

> **Esta es la fuente canónica.** Las tres reglas nacieron midiendo `unrlvl-iid-functions` durante
> N09 y N12, y estuvieron un día en `docs/METODO_DE_MEDICION.md` de ese repositorio. Se mudan aquí
> porque **son protocolo, no documentación de un repo**: gobiernan cómo se mide contra producción
> desde cualquier contenedor, y quien las necesita no es sólo quien toca ese código. En su sitio
> anterior queda un puntero.
>
> Van con las otras dos que gobiernan cómo se trabaja —`DELIVERY_AND_VERIFICATION_RULE.md`, que dice
> cómo se responde, y `MULTIBRAND_RULE.md`, que dice qué puede ir en el código— porque responden la
> pregunta anterior a las dos: **si el instrumento respondió.**

---

## 1 · La existencia de un objeto de Storage se comprueba en `storage.objects`, nunca con un `HEAD`

```sql
SELECT o.id IS NOT NULL AS vive, (o.metadata->>'size')::bigint AS bytes
  FROM storage.objects o
 WHERE o.bucket_id = '<bucket>' AND o.name = '<ruta>';
```

`storage.objects` es la tabla que la propia API de Storage consulta: es la fuente, no un reflejo.
Un `HEAD` contra la URL pública añade dos capas que pueden mentir —el proxy de salida del
contenedor y la CDN— para responder una pregunta que la base contesta directa.

## 2 · Un `000` no se interpreta jamás. Se lee el estado del proxy

`curl` devuelve `000` **tanto si el servidor calla como si el proxy de salida niega el `CONNECT`**.
Son dos hechos opuestos con el mismo código, y elegir uno es afirmar sin medir.

**Dónde se lee el motivo:**

```
$HTTPS_PROXY/__agentproxy/status   →   campo  recentRelayFailures
```

Cada entrada trae `kind`, `detail` y **el host**, que es el dato que ninguna otra vía aporta.
Medido el 2026-09-08 contra `amlvyycfepwhiindxgzw.supabase.co`:

```json
{ "kind":   "connect_rejected",
  "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
  "host":   "amlvyycfepwhiindxgzw.supabase.co:443" }
```

> **Corrección del 2026-09-08.** La primera versión de esta regla mandaba leer una cabecera
> `x-deny-reason`. **Esa cabecera no existe en este entorno** — se comprobó explícitamente. Una
> regla que manda leer algo que nadie emite no se puede cumplir, y es exactamente la clase de
> defecto que estas tres reglas existen para cazar. Se corrige nombrando el sitio que sí responde.

**Y el matiz que hace honesta la medición: el proxy dice «policy denial *or* upstream failure» y
él mismo no distingue las dos.** Así que el `403` en el `CONNECT` y el host son **`medido`**; que la
causa sea la lista de dominios permitidos es **`deducido`**.

**Lo que resuelve la ambigüedad es la regla 3.** Con un control conocido-vivo —un objeto del que ya
se sabe que existe— se separan los dos casos: si el objeto está vivo en `storage.objects` y aun así
el `CONNECT` devuelve 403, el fallo no es del servidor. **Es la regla 3 haciendo su trabajo sobre la
regla 2**, y es el mejor ejemplo que hay de por qué las tres se sostienen entre sí: ninguna de ellas
basta sola para decir qué ocurrió.

**Alcance medido de la barrera, para no volver a probarlo a ciegas:** el proxy niega el `CONNECT`
contra `*.vercel.app` **y contra `*.supabase.co`**, subdominios incluidos — una lista de permitidos
con el dominio desnudo **no cubre el subdominio**, comprobado el 2026-09-08 con
`amlvyycfepwhiindxgzw.supabase.co`. Es la misma barrera que obliga a usar
`Vercel:web_fetch_vercel_url` en vez de `curl` contra Vercel (`CC_PROTOCOL.md` §0 bis.1), y hasta
ese día nadie había visto que fuera la misma.

## 3 · Todo barrido masivo lleva dentro un control conocido-vivo

Si el control también falla, **el roto es el método, no el dato**.

El 2026-09-08 un inventario de 15 archivos devolvió 15 rojos. La conclusión obvia —«están todos
borrados»— era falsa y habría entrado en un reporte como medición. Lo que la refutó fue medir con
el mismo método un archivo del que ya se sabía que estaba vivo: también dio rojo, y ahí se vio que
el método era el roto. Sin ese control, el reporte habría afirmado la destrucción de trece
archivos que existen.

El control se elige ANTES de barrer y se ejecuta con el mismo método, no con uno mejor: un control
que se mide de otra forma no controla nada.

## 4 · Un despliegue de Edge Function se verifica por `ezbr_sha256`, nunca por el contador de versión

```
Supabase:list_edge_functions  →  campo  ezbr_sha256
```

El contador `version` y el sufijo numérico del `entrypoint_path` **suben con el intento de
despliegue, no con el contenido desplegado**. Medido el 2026-09-08: **un deploy subió el mismo
bundle y el sufijo del `entrypoint_path` cambió igual**, así que un sufijo nuevo es compatible con
«se desplegó código nuevo» y con «se volvió a desplegar lo mismo». Son dos hechos distintos con el
mismo indicador — la regla 2, un piso más arriba.

`ezbr_sha256` es el hash del bundle: **cambia si y sólo si cambió lo que corre**. Un PR de función
queda probado cuando el `sha` medido después del deploy difiere del de antes, y **el `sha` se cita
en el reporte**, no el número de versión.

**Y el control conocido-vivo de la regla 3 aplica igual acá:** si el `sha` no cambió, antes de
concluir «el deploy no entró» hay que comprobar que el bundle **sí era distinto**. Un `sha` idéntico
también es el resultado correcto de volver a desplegar el mismo código.

---

---

## 5 · Un PR mergeado no dice qué función desplegar. El objeto se comprueba ANTES; los marcadores, DESPUÉS

```
antes:    git diff --name-only <base>..<head>   →   supabase/functions/<slug>/
después:  el bundle contiene los MARCADORES del cambio, no sólo un sha distinto
```

**El repositorio tiene varias Edge Functions y el comando de despliegue nombra una sola.** Un PR
mergeado dice **qué cambió**; **no dice qué se despliega**. Entre las dos cosas hay un paso que nadie
escribió y que se venía resolviendo por inercia: *se despliega la función que veníamos desplegando*.

**Motivo, medido el 2026-09-10.** Se mergearon dos PR que viven los dos en `content-scheduler` y se
desplegó **`content-run-stage`**, que era la que se venía desplegando. El resultado:

| Función | `ezbr_sha256` | Veredicto |
|---|---|---|
| `content-run-stage` | **cambió** | desplegada de verdad — y **sin nada de los dos PR** |
| `content-scheduler` | **idéntico** al de dos días antes, con el contador **subido** | **ninguno de los dos PR está vivo** |

**La §4 funcionó perfectamente y no sirvió de nada**, porque se aplicó al objeto equivocado.
**Verificar el escalón correcto sobre el objeto equivocado no verifica nada** — y el informe que sale
de ahí dice «desplegado» con un `sha` nuevo al lado, que es una prueba real de un hecho que no era el
que se quería probar.

**La regla, en sus dos mitades:**

1. **Antes de desplegar, el objeto sale del diff, no de la costumbre.** Qué función hay que desplegar
   se lee de los archivos que el PR tocó — `supabase/functions/<slug>/` —, y si el diff toca varias,
   **se despliegan todas o se declara cuál se deja fuera y por qué**.
2. **Después de desplegar, se buscan los MARCADORES del cambio en el bundle.** Un `sha` distinto
   prueba que **algo** cambió; **no prueba qué**. El marcador es un identificador propio del cambio
   —el nombre de una función nueva, una constante, un código de error— que **no existía antes** y
   cuya presencia sólo se explica por ese PR.

**Por qué la segunda mitad no es celo excesivo:** con sólo el `sha`, un despliegue de la función
correcta pero de **la rama equivocada** —o de un working tree sin el `git pull`— es indistinguible
de uno bueno. El `sha` cambia igual. **El marcador es lo único que ata el bundle al cambio**, y por
eso es lo que se cita en el reporte, junto al `sha` y no en su lugar.

**Corolario para quien escribe la instrucción de despliegue:** el comando lleva el `slug` **derivado
del diff de ese PR**, nunca heredado del despliegue anterior. Un comando copiado de la vez pasada es
una afirmación sobre el presente hecha con evidencia de otro día — que es, un piso más abajo, la
misma familia de defecto que las cuatro reglas de arriba.

---

## 6 · Una medición sólo vale en la vía que la ejecuta

```
mal:   EXPLAIN (ANALYZE, BUFFERS) <consulta>          -- nivel superior, plan paralelo
bien:  SET LOCAL ROLE service_role;  SET LOCAL statement_timeout = '<el real>';
       -- y se llama a la FUNCIÓN, no a la consulta que lleva dentro
```

**`EXPLAIN (ANALYZE, BUFFERS)` en el nivel superior NO mide lo que hará una función PL/pgSQL.** El
motivo es concreto y no depende del caso: **`SELECT … INTO` impone un límite de filas, y un plan con
límite de filas no se paraleliza.** La misma consulta, ejecutada desde dentro de la función, corre con
un plan distinto del que el `EXPLAIN` acaba de mostrar.

**Motivo, medido el 2026-09-17 en ALERTAS-01:**

| Vía | Tiempo | Plan |
|---|---|---|
| `EXPLAIN (ANALYZE)` en el nivel superior | **259 ms** | paralelo |
| La función real, con su `statement_timeout` de **8 s** | **17.090 ms** | sin paralelizar — **excede el tope y falla** |

**La etiqueta `medido` estaba puesta.** Era falsa: estaba medido, pero **en otra vía**. Se mergeó y
**rompió el vigilante durante siete minutos en producción**. Tras el arreglo, la misma función mide
**135 ms** en la vía real.

**Forma correcta, en sus tres partes:**

1. **El rol** — `SET LOCAL ROLE service_role`: un plan medido como `postgres` puede no ser el que
   corre quien de verdad llama.
2. **El tope** — `SET LOCAL statement_timeout` con **el valor real de producción**, no el de la
   sesión. Una medición sin el tope no puede decir «entra»: sólo dice cuánto tardó.
3. **El objeto** — se llama **a la función**, no a la consulta que lleva dentro. Medir la consulta es
   medir otra cosa con el mismo texto.

**Por qué esto no es la §5 otra vez.** La §5 dice que verificar **el escalón correcto sobre el objeto
equivocado** no verifica nada. Ésta dice algo distinto y peor: **el objeto era el correcto y el
escalón también** — lo equivocado era **la vía**, y la vía no aparece en ningún lado del informe. Un
`EXPLAIN` bien escrito sobre la consulta exacta de la función produce un número real de un hecho que
no es el que se quería probar, **sin que nada en la salida lo delate**.

**Y el corolario general, que es el que hay que llevarse:** cuando la medición y el consumo **no
comparten contexto de ejecución** —rol, tope, límite de filas, nivel de aislamiento—, lo medido no es
lo que va a correr. **El contexto es parte del instrumento.**

---

## Lo que las tres tienen en común

Las tres separan **no pude medir** de **medí y salió esto**. Es la misma distinción que
`DELIVERY_AND_VERIFICATION_RULE` exige entre `medido`, `reportado` y `deducido`, aplicada un piso
más abajo: antes de poder etiquetar una afirmación hay que estar seguro de que el instrumento
respondió.

Y es la misma que el código de este repositorio lleva cerrando todo el mes —el `catch { return [] }`
de `sbGet`, el `??` de `visual_directive`, el `.neq("status","discarded")` de la guarda de
idempotencia—: **un fallo no puede parecerse a un resultado.** Que la regla valga también para
quien mide no es una coincidencia; es que el instrumento es parte del sistema.
