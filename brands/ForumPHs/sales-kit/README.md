# Sales-Kit — ForumPHs

Material comercial estandarizado de la marca. **Piezas reutilizables, no anécdotas de un envío.**

Cada pieza documenta **su estructura y las reglas que esa estructura codifica**, con un ejemplo
trabajado de un envío real. El ejemplo está para que se vea la regla aplicada; **la pieza es la
estructura, no el ejemplo**. Quien tome una de estas plantillas para un prospecto nuevo cambia las
cifras y el nombre, no el orden de los pasos — porque el orden es lo que se probó.

Creado el **2026-09-08**, con el primer envío a un prospecto que llegó por esta vía.

---

## Qué es una pieza del kit, y qué no

**Es** una plantilla con su porqué escrito al lado: por qué ese orden, por qué ese cierre, qué se
pierde si se altera. Una plantilla sin su porqué se adapta mal, porque quien la adapta no sabe qué
parte era la que funcionaba.

**No es** un archivo de correos enviados. Si una pieza sólo sirve para el prospecto que la originó,
no pertenece al kit: pertenece al registro de sesión.

---

## Piezas

| Pieza | Archivo | Estado |
|---|---|---|
| Correo de respuesta a prospecto | [`email_respuesta_prospecto.md`](email_respuesta_prospecto.md) | ✅ estándar declarado 2026-09-08 |
| Modelo de acuerdo de confidencialidad | producido 2026-09-08 | ⚠️ pendiente de incorporar al kit |
| Formulario de levantamiento | producido 2026-09-08 | ⚠️ pendiente de incorporar al kit |
| Suite de Gestión Financiera (muestra) | servida por enlace con token — `forumphs-com`, ruta `/bim` | ✅ en producción |

El índice detallado, cuando el kit crezca: [`INDEX.md`](INDEX.md).

---

## Deuda declarada del kit

🔴 **El informe no cierra con un panel de siguiente paso.** Mientras no lo tenga, el correo depende
de que el prospecto **vuelva a la bandeja** después de abrir el enlace — y quien termina de leer un
informe de seis paneles no vuelve solo. Es la única costura del kit que hoy pierde conversión por
diseño y no por ejecución.

Registrado en `AGENDA.md` como pendiente. **No se resuelve en el Actualiza del 2026-09-08**: tocar
el documento implica reprocesarlo con `vendor-collateral.mjs` y resubirlo a Storage, que es un
encargo aparte. No cambia el enlace ni la fila.

---

## Multimarca

Este directorio es **artefacto exclusivo de ForumPHs** (`MULTIBRAND_RULE.md` §3): vive bajo
`brands/ForumPHs/` y su contenido es instancia de esta marca —sus cifras, su mercado, su
vocabulario—. Otra marca que quiera un kit monta el suyo bajo su propia carpeta.

**Lo que sí es transversal son las tres reglas** que documenta
[`email_respuesta_prospecto.md`](email_respuesta_prospecto.md): el enlace al final, el cierre con
condición y plazo, y anticipar el riesgo no mencionado. Esas no dependen del rubro ni del país, y
si otra marca arma su kit, se copian las reglas y se reescribe el texto — nunca al revés.
