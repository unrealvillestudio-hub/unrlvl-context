# MÉTODO DE MEDICIÓN — tres reglas que salieron de tres sustos

**Emitido:** 2026-09-08 · **Origen:** N09 y N12 · **Aplica a:** CC y a cualquiera que mida contra
producción desde un contenedor.

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

## 2 · Un `000` no se interpreta jamás. Se lee la cabecera

`curl` devuelve `000` **tanto si el servidor calla como si el proxy de salida niega el `CONNECT`**.
Son dos hechos opuestos con el mismo código, y elegir uno es afirmar sin medir.

```
curl: (56) CONNECT tunnel failed, response 403
```

El proxy de egreso de este contenedor niega `*.vercel.app` **y también `*.supabase.co`**. Es la
misma barrera que obliga a usar `Vercel:web_fetch_vercel_url` en vez de `curl` contra Vercel
(`CC_PROTOCOL.md` §0 bis.1), y hasta el 2026-09-08 nadie había visto que fuera la misma. Ante un
`000`: se repite con `-sS` y se lee lo que dice, o se cambia de vía.

## 3 · Todo barrido masivo lleva dentro un control conocido-vivo

Si el control también falla, **el roto es el método, no el dato**.

El 2026-09-08 un inventario de 15 archivos devolvió 15 rojos. La conclusión obvia —«están todos
borrados»— era falsa y habría entrado en un reporte como medición. Lo que la refutó fue medir con
el mismo método un archivo del que ya se sabía que estaba vivo: también dio rojo, y ahí se vio que
el método era el roto. Sin ese control, el reporte habría afirmado la destrucción de trece
archivos que existen.

El control se elige ANTES de barrer y se ejecuta con el mismo método, no con uno mejor: un control
que se mide de otra forma no controla nada.

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
