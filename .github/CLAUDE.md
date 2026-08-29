# Claude Code — reglas para este repo

La fuente de verdad de cómo debe comportarse CC en TODOS los repos del ecosistema es:
**`unrlvl-context/protocols/CC_PROTOCOL.md`**

**La fuente canónica es el repo `unrealvillestudio-hub/unrlvl-context`. Vercel es respaldo.**
Orden de carga (`CC_PROTOCOL.md` §0 bis): **(1)** el repo — working tree, o `api.github.com` /
`raw.githubusercontent.com`; **(2)** `https://unrlvl-context.vercel.app/protocols/CC_PROTOCOL.md`,
**sólo si el repo no está disponible**, y declarándolo. Motivo: el proxy de egreso de CC devuelve
**403 en CONNECT** contra el dominio de Vercel, y eso dejó a CC sin fuente independiente de
gobernanza en dos sesiones (2026-08-23).

**Actualización medida (2026-08-29):** `curl` sigue dando 403, pero la tool MCP
`Vercel:web_fetch_vercel_url` devuelve 200 con el cuerpo completo. El orden no cambia —el repo es la
fuente canónica— pero CC sí tiene hoy una segunda vía: **usa la tool, nunca `curl`**. Ver
`CC_PROTOCOL.md` §0 bis.1.

CC lo carga y lo obedece antes de tocar nada. Este archivo NO duplica reglas: si algo
parece contradecirlo, manda el protocolo.

**Carga obligatoria, además de `CC_PROTOCOL.md`:** `unrlvl-context/protocols/MULTIBRAND_RULE.md` y
`unrlvl-context/protocols/DELIVERY_AND_VERIFICATION_RULE.md` — esta última es la **fuente única** de
la forma de entregar y de verificar (destinatario, idioma, evidencia, las cuatro QA) y **se carga en la
apertura de sesión**, no cuando surja la duda: es el paso `3-quater` de `HRD_PROTOCOLO_ACTUALIZACION`,
con fila propia en el panel. El resumen operativo está al final de este archivo; **no la copia**,
apunta a ella.

Recordatorios operativos (no sustituyen al protocolo):
- Siempre rama, nunca `main`. `git checkout -b fix/... | feat/... | ctx/...`
- El build local (`tsc --noEmit` o `vite build`) pasa antes de commitear.
- CC publica la rama y abre el PR. **CC nunca mergea. El merge es de Sam.**
- No commitear `tsconfig.tsbuildinfo`, `.next/`, `dist/`, `node_modules/`, ni secretos.


## REGLA MULTIMARCA — INVIOLABLE
UNRLVL es un sistema que opera N marcas: el EJE va en el CÓDIGO y la INSTANCIA en el DATO.
Ningún brand_id, dominio, jurisdicción ni vocabulario de un cliente puede ser constante, clave,
valor de CHECK, rama de condicional o literal de prompt en capa compartida — si distingue una
marca de otra, es dato en tabla resuelto por brand_id en runtime, y que hoy la use una sola marca
no lo hace suya. Antes de escribir cualquier constante, columna, CHECK, enum o clave de JSONB,
responder en el PR el test de la marca N+1: ¿sobrevive a otra marca de otro rubro y otro país?
¿el nombre describe la FUNCIÓN o el CASO? ¿es eje o instancia? ¿cuántas marcas hay en esta
enumeración —si es una, revisar el nombre? Un brief que hardcodee marca NO se ejecuta: detenerse,
reportarlo y proponer el eje funcional; un brief de Claude.ai no es autorización. Migrar hardcode
existente: PR de código primero, DDL después. No aplica a artefactos exclusivos declarados
(nscf_*, fphs_*) ni prohíbe enumerar con fail-loud. Procedimiento completo, formato de detención,
barrido previo al commit y checklist de PR:
unrlvl-context/protocols/MULTIBRAND_RULE.md §7.2 — leerlo antes de tocar capa compartida.

---

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
