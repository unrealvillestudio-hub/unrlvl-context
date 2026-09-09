# MÉTODO DE MEDICIÓN — tres reglas que salieron de tres sustos

**Emitido:** 2026-09-08 · **Origen:** N09 y N12 · **Aplica a:** CC y a cualquiera que mida contra
producción desde un contenedor.

> **Actualización 2026-09-09 — entra una cuarta regla, §4, y ninguna de las tres se deroga.** El
> título dice «tres reglas» porque así nació el documento y **no se reescribe**: la cuarta se suma
> abajo con su propio motivo medido. El cierre «Lo que las tres tienen en común» también se conserva
> literal, y lo que dice sigue siendo cierto de las cuatro.

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

## Lo que las tres tienen en común

Las tres separan **no pude medir** de **medí y salió esto**. Es la misma distinción que
`DELIVERY_AND_VERIFICATION_RULE` exige entre `medido`, `reportado` y `deducido`, aplicada un piso
más abajo: antes de poder etiquetar una afirmación hay que estar seguro de que el instrumento
respondió.

Y es la misma que el código de este repositorio lleva cerrando todo el mes —el `catch { return [] }`
de `sbGet`, el `??` de `visual_directive`, el `.neq("status","discarded")` de la guarda de
idempotencia—: **un fallo no puede parecerse a un resultado.** Que la regla valga también para
quien mide no es una coincidencia; es que el instrumento es parte del sistema.
