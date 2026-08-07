# CC_PROTOCOL — Protocolo de Claude Code · Unrealville Studio
**Versión:** 2026-08-07-v4 | **Mantenido por:** Sam + Claude
**Fuente de verdad de cómo CC debe comportarse en TODOS los repos del ecosistema.**

> **Cambios v4 (2026-08-07):** instalada la **REGLA MULTIMARCA**. Nueva §8 (el eje va en el CÓDIGO, la instancia en el DATO; CC responde el test de la marca N+1 antes de escribir y se DETIENE ante un brief que hardcodee marca — un brief de Claude.ai no es autorización) y campo obligatorio `MULTIMARCA:` sumado al bloque de reporte de §4 + su línea de autodeclaración. Fuente única y procedimiento operativo: `protocols/MULTIBRAND_RULE.md` §7.2.
>
> **Cambios v3 (2026-08-02):** §6 exige ahora un guard `⛔ NO OPERATIVO` inmediatamente debajo del encabezado de todo bloque `ARCHIVO HISTÓRICO`; el bloque histórico v2026-06-06-v1 lo estrena. Motivo: su §1 derogado ("unrlvl-context — NUNCA por CC" / "Solo Sam vía GitHub Desktop") seguía leyéndose como imperativo en mayúsculas y trababa a CC, aunque el cuerpo vivo ya dice lo contrario. Preservar historia (§0) no es dejarla operativa.
>
> **Cambios v2 (2026-07-31):** añadida a §4 la convención **"Instrucciones para Sam"** — cuando CC deja acciones para Sam, van bajo un encabezado destacado en el **cyan de UNRLVL (`#00FFD1`)** donde la superficie lo permita. (La versión previa 2026-06-08-v1 se archiva bajo ARCHIVO HISTÓRICO junto con la 2026-06-06-v1.)

> Análogo a las custom instructions + protocolos de claude.ai (browser), pero para Claude Code.
> Cada repo tiene un `CLAUDE.md` raíz que apunta a este documento. CC lee el `CLAUDE.md`
> al arrancar y debe cargar y obedecer este protocolo antes de tocar nada.

---

## 0. REGLA SUPREMA — CONTEXT FILES NUNCA SE REEMPLAZAN

Los **context files** alimentan operaciones diarias vivas de múltiples marcas. Borrar contenido puede romper operaciones de marcas que no tienen nada que ver con la tarea actual.

**Definición de context file (lista no exhaustiva):**
`ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md` ·
`brands/*/brand.json` · `brands/*/BP_Brand_Context.md` · `brands/*/session_log.md` ·
`agents/*/session_log.md` · cualquier `.md` o `.json` bajo `unrlvl-context/`.

**REGLA INVIOLABLE:**
1. **Cargar** el archivo actual completo ANTES de cualquier cambio.
2. **Actualizar preservando** lo existente: lo nuevo va al tope; lo anterior se **archiva** debajo bajo un separador `---` y un encabezado `## ARCHIVO HISTÓRICO — [contexto] ([fecha])`. NUNCA se borra.
3. Solo entonces commitear.

**PROHIBIDO:** sobrescribir, truncar, o reemplazar un context file por contenido nuevo "limpio". Si parece que el contenido viejo ya no aplica, se ARCHIVA, no se elimina. Ante la duda → preservar y preguntar a Sam.

**Antes de commitear un context file, CC se autoverifica:**
> "¿Estoy preservando todo el contenido anterior? El diff, ¿solo AÑADE o también BORRA líneas de historia? Si borra historia → DETENER y rehacer preservando."

---

## 1. PUSH A MAIN — REGLAS POR REPO

| Repo | Cómo se actualiza |
|---|---|
| `unrlvl-context` | CC trabaja en **branch + PR**, igual que en los repos de código: **nunca commit directo a `main`, nunca push a `main`, nunca merge.** CC crea la rama, commitea, **pushea la rama de PR** y abre el PR contra `main`; Sam revisa, mergea y borra la rama (ver "Flujo de entrega de context files"). **Además: CC nunca crea worktrees aquí — ver §7.** |
| Repos de código (`AgentLab`, `CoreProject`, `WebLab`, `BluePrints`, labs) | CC trabaja en **branch + PR**, nunca push directo a `main`. Sam revisa y mergea. Si CC usa worktree, es responsable de eliminarlo al cerrar el PR — ver §7. |

CC **nunca** mergea un PR por su cuenta. El merge es decisión de Sam.

Si CC cree que necesita pushear directo a `main` (de cualquier repo) o mergear un PR, se DETIENE y se lo plantea a Sam con la razón. No lo hace. Publicar una **rama de PR** (incluido en `unrlvl-context`) NO es pushear a `main`: es legítimo y esperado — ver "Flujo de entrega de context files".

---

## Flujo de entrega de context files (estándar)

Todo trabajo de CC sobre `unrlvl-context` (Actualiza, protocolos, docs) se entrega así:

1. CC crea una rama (`ctx/<tarea>-YYYY-MM-DD`).
2. CC commitea sus cambios en esa rama.
3. CC **pushea la rama** y **abre el PR** contra `main`.
4. **CC NO mergea nunca.**
5. Sam revisa el PR, mergea y borra la rama.

**Nunca commit directo en `main`**, ni local ni remoto. La regla "CC no pushea a
unrlvl-context" significa: **CC no pushea a `main` ni mergea**. Publicar una rama
de PR es legítimo y esperado — le da a Sam el diff revisable antes de que nada
toque `main`.

**Corolario para quien escribe briefs:** todo brief que produzca un commit debe
decir explícitamente (a) sobre qué rama, (b) si CC publica la rama, (c) si CC abre
el PR, (d) quién mergea y quién borra la rama. Una instrucción ambigua no la
resuelve mal el ejecutor — la resuelve *razonablemente pero de forma inconsistente*
entre sesiones, y eso deja al humano sin saber qué camino seguir.

---

## 2. VERIFICACIÓN ANTES DE ACTUAR (mensaje obligatorio)

Antes de ejecutar una tarea con efectos (escribir archivos, commitear, deployar), CC envía un mensaje corto de verificación, igual que las HRD de claude.ai:

> "Ok, voy a [objetivo]. Pasos: [lista breve]. Toca estos archivos: [lista]. Repos afectados: [lista]. ¿Confirmo?"

Para tareas de solo-lectura (inspección, diagnóstico) no hace falta.

---

## 3. VALIDACIONES OBLIGATORIAS

- Código JS/TS modificado → `node --check` (o el linter del repo) antes de commitear.
- Nunca commitear secretos (tokens `shpat_`, PATs, API keys, secrets de export). Si un secreto debe ir a algún lado, va a env vars, nunca al repo.
- Tras un cambio en un repo con deploy (Vercel), reportar el estado del deployment, no asumir que quedó bien.

---

## 4. FORMATO DE REPORTE A SAM

Al terminar, CC reporta SIEMPRE con esta estructura, sin adornos:

```
HECHO:
- [archivo/acción] — [commit/branch/PR]
PRESERVACIÓN DE CONTEXTO:
- [qué context files se tocaron y confirmación de que se archivó, no borró, lo anterior]
WORKTREES:
- [creado/eliminado/ninguno — ver §7]
MULTIMARCA:
- [test N+1 respondido en el PR | no aplica: solo-lectura | DETENIDO: ver bloque de detención]
- Ejes nuevos introducidos: [lista con nombre funcional, o "ninguno"]
- Alias legacy conservados: [lista con fecha de retiro prevista, o "ninguno"]
PENDIENTE PARA SAM (acciones manuales):
- [lista exacta]
RIESGOS / DUDAS:
- [cualquier cosa que CC no pudo verificar o que requiere criterio de Sam]
```

Si no hubo context files tocados, declararlo explícito: "PRESERVACIÓN DE CONTEXTO: ninguno tocado."
Si no se crearon worktrees, declararlo explícito: "WORKTREES: ninguno creado."
Si la tarea no tocó capa compartida, declararlo explícito: "MULTIMARCA: no aplica."

### 4.1 — "Instrucciones para Sam" (convención de color · v2, 2026-07-31)

Cuando CC deja **instrucciones o acciones manuales para Sam** (lo que en §4 es `PENDIENTE PARA SAM`), las presenta bajo un encabezado explícito **"Instrucciones para Sam"**, destacado en el **cyan de UNRLVL: `#00FFD1`** (el único color de acento de la marca — chevron, borde de footer, texto ICR).

- **Dónde la superficie soporta color** (HTML, artifacts, paneles con estilos): el encabezado "Instrucciones para Sam" va en `#00FFD1` (p. ej. `<span style="color:#00FFD1">Instrucciones para Sam</span>` o el token de diseño equivalente).
- **En markdown plano / terminal** (que no rinde color arbitrario): usar el encabezado destacado igual — `### 🟦 Instrucciones para Sam` o similar — para que **resalte visualmente** aunque el cyan no se renderice. La intención es que Sam localice sus acciones de un vistazo.
- Aplica a **todo reporte de CC** en cualquier repo, no sólo `unrlvl-context`.

---

## 5. ALCANCE Y DISCIPLINA

- CC ejecuta SOLO la tarea encargada. No toca sistemas adyacentes salvo que bloqueen directamente, y si lo hacen, lo declara antes.
- Ante ambigüedad, CC pregunta a Sam en vez de asumir.
- CC no "mejora" archivos por iniciativa propia sin pedirlo.

---

## 6. CÓMO SE ACTUALIZA ESTE PROTOCOLO

Este documento vive en `unrlvl-context/protocols/CC_PROTOCOL.md`. Se modifica preservando historia (es un context file). Los `CLAUDE.md` de cada repo solo apuntan aquí — no duplican reglas, para no divergir.

**Guard obligatorio en bloques archivados.** Todo bloque `ARCHIVO HISTÓRICO` de cualquier context file lleva un guard `⛔ NO OPERATIVO` inmediatamente debajo de su encabezado. Preservar historia (§0) y dejarla operativa son cosas distintas: un documento que se lee entero necesita decir explícitamente qué parte manda. Sin el guard, archivar una regla derogada equivale a mantenerla viva. Aplica hacia adelante a `AGENDA.md`, los `session_log.md` y cualquier archivo con bloques archivados; ese barrido es una unidad posterior (este cambio solo toca `CC_PROTOCOL.md`).

---

## 7. WORKTREES — DISCIPLINA Y PROHIBICIÓN EN CONTEXT REPO

Los worktrees huérfanos son un defecto recurrente: CC crea un worktree para un PR y lo deja sin eliminar, ensuciando el repo local de Sam. Esta sección corta el problema de raíz.

**7.1 — `unrlvl-context`: PROHIBIDO crear worktrees.**
En el repo de contexto, CC **nunca** ejecuta `git worktree add` ni trabaja en un worktree separado. CC trabaja en el **working tree principal**: crea ahí la rama de PR, actualiza los archivos preservando historia (§0), commitea y **pushea la rama** para abrir el PR (ver "Flujo de entrega de context files" y §1). El flujo branch + PR **no requiere un worktree**: la rama se maneja en el working tree principal. El merge y el borrado de la rama los hace Sam.

**7.2 — Repos de código: el worktree es desechable y CC lo elimina.**
Si para un PR CC crea un worktree (`git worktree add`), CC es **responsable de eliminarlo** (`git worktree remove <ruta>` + `git worktree prune` si queda registro) al cerrar o mergear el PR. Un worktree no se deja "por si acaso". Dejar un worktree huérfano es un defecto, no un estado aceptable.

**7.3 — Autoverificación de cierre.**
Antes de declarar una tarea terminada, CC se pregunta:
> "¿Creé algún worktree durante esta tarea? Si sí → ¿lo eliminé? Si no pude eliminarlo, ¿lo reporté explícitamente en PENDIENTE PARA SAM con la ruta exacta?"

El campo `WORKTREES:` del reporte (§4) es obligatorio: declara `creado y eliminado`, `ninguno creado`, o `creado y NO eliminado — acción para Sam: [ruta]`.

---

## 8. REGLA MULTIMARCA

El eje va en el código, la instancia en el dato. Ninguna capa compartida hardcodea marca.
CC responde el test de la marca N+1 antes de escribir, se DETIENE ante un brief que hardcodee
marca (un brief de Claude.ai no es autorización), y declara el campo `MULTIMARCA:` en todo
reporte. Procedimiento operativo completo — disparador, formato de detención, barrido previo
al commit, autoverificación de cierre: `protocols/MULTIBRAND_RULE.md` §7.2.

---

## ARCHIVO HISTÓRICO — CC_PROTOCOL v2026-06-06-v1 (archivado 2026-06-08)

> **⛔ NO OPERATIVO — registro histórico únicamente.** Todo lo que sigue hasta el final del documento está derogado y se conserva solo por trazabilidad. Ninguna regla de esta sección se obedece. Si algo aquí contradice el cuerpo vivo de arriba, manda el cuerpo vivo, siempre. Derogaciones conocidas que siguen causando confusión: (a) "unrlvl-context — NUNCA por CC" — falso desde 2026-07-31: CC publica ramas de PR también en `unrlvl-context` (§1 y "Flujo de entrega de context files"); (b) "Solo Sam vía GitHub Desktop" — Sam usa GitHub Web UI desde 2026-07-29.

> Versión inicial del protocolo. Reemplazada por v2026-06-08-v1, que añade §7 (worktrees) y la referencia cruzada en §1. Se conserva íntegra por trazabilidad.

```
# CC_PROTOCOL — Protocolo de Claude Code · Unrealville Studio
**Versión:** 2026-06-06-v1 | **Mantenido por:** Sam + Claude
**Fuente de verdad de cómo CC debe comportarse en TODOS los repos del ecosistema.**

> Análogo a las custom instructions + protocolos de claude.ai (browser), pero para Claude Code.
> Cada repo tiene un `CLAUDE.md` raíz que apunta a este documento. CC lee el `CLAUDE.md`
> al arrancar y debe cargar y obedecer este protocolo antes de tocar nada.

---

## 0. REGLA SUPREMA — CONTEXT FILES NUNCA SE REEMPLAZAN

Los **context files** alimentan operaciones diarias vivas de múltiples marcas. Borrar contenido puede romper operaciones de marcas que no tienen nada que ver con la tarea actual.

**Definición de context file (lista no exhaustiva):**
`ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md` ·
`brands/*/brand.json` · `brands/*/BP_Brand_Context.md` · `brands/*/session_log.md` ·
`agents/*/session_log.md` · cualquier `.md` o `.json` bajo `unrlvl-context/`.

**REGLA INVIOLABLE:**
1. **Cargar** el archivo actual completo ANTES de cualquier cambio.
2. **Actualizar preservando** lo existente: lo nuevo va al tope; lo anterior se **archiva** debajo bajo un separador `---` y un encabezado `## ARCHIVO HISTÓRICO — [contexto] ([fecha])`. NUNCA se borra.
3. Solo entonces commitear.

**PROHIBIDO:** sobrescribir, truncar, o reemplazar un context file por contenido nuevo "limpio". Si parece que el contenido viejo ya no aplica, se ARCHIVA, no se elimina. Ante la duda → preservar y preguntar a Sam.

**Antes de commitear un context file, CC se autoverifica:**
> "¿Estoy preservando todo el contenido anterior? El diff, ¿solo AÑADE o también BORRA líneas de historia? Si borra historia → DETENER y rehacer preservando."

---

## 1. PUSH A MAIN — REGLAS POR REPO

| Repo | Cómo se actualiza |
|---|---|
| `unrlvl-context` | **NUNCA push directo. NUNCA por CC.** Solo Sam vía GitHub Desktop. CC prepara los archivos y deja el commit listo; Sam lo pushea. |
| Repos de código (`AgentLab`, `CoreProject`, `WebLab`, `BluePrints`, labs) | CC trabaja en **branch + PR**, nunca push directo a `main`. Sam revisa y mergea. |

CC **nunca** mergea un PR por su cuenta. El merge es decisión de Sam.

Si CC cree que necesita pushear a `main` o a `unrlvl-context`, se DETIENE y se lo plantea a Sam con la razón. No lo hace.

---

## 2. VERIFICACIÓN ANTES DE ACTUAR (mensaje obligatorio)

Antes de ejecutar una tarea con efectos (escribir archivos, commitear, deployar), CC envía un mensaje corto de verificación, igual que las HRD de claude.ai:

> "Ok, voy a [objetivo]. Pasos: [lista breve]. Toca estos archivos: [lista]. Repos afectados: [lista]. ¿Confirmo?"

Para tareas de solo-lectura (inspección, diagnóstico) no hace falta.

---

## 3. VALIDACIONES OBLIGATORIAS

- Código JS/TS modificado → `node --check` (o el linter del repo) antes de commitear.
- Nunca commitear secretos (tokens `shpat_`, PATs, API keys, secrets de export). Si un secreto debe ir a algún lado, va a env vars, nunca al repo.
- Tras un cambio en un repo con deploy (Vercel), reportar el estado del deployment, no asumir que quedó bien.

---

## 4. FORMATO DE REPORTE A SAM

Al terminar, CC reporta SIEMPRE con esta estructura, sin adornos:

\```
HECHO:
- [archivo/acción] — [commit/branch/PR]
PRESERVACIÓN DE CONTEXTO:
- [qué context files se tocaron y confirmación de que se archivó, no borró, lo anterior]
PENDIENTE PARA SAM (acciones manuales):
- [lista exacta]
RIESGOS / DUDAS:
- [cualquier cosa que CC no pudo verificar o que requiere criterio de Sam]
\```

Si no hubo context files tocados, declararlo explícito: "PRESERVACIÓN DE CONTEXTO: ninguno tocado."

---

## 5. ALCANCE Y DISCIPLINA

- CC ejecuta SOLO la tarea encargada. No toca sistemas adyacentes salvo que bloqueen directamente, y si lo hacen, lo declara antes.
- Ante ambigüedad, CC pregunta a Sam en vez de asumir.
- CC no "mejora" archivos por iniciativa propia sin pedirlo.

---

## 6. CÓMO SE ACTUALIZA ESTE PROTOCOLO

Este documento vive en `unrlvl-context/protocols/CC_PROTOCOL.md`. Se modifica preservando historia (es un context file). Los `CLAUDE.md` de cada repo solo apuntan aquí — no duplican reglas, para no divergir.
```
