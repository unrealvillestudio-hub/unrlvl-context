# CC_PROTOCOL — Protocolo de Claude Code · Unrealville Studio
**Versión:** 2026-06-08-v1 | **Mantenido por:** Sam + Claude
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
| `unrlvl-context` | **NUNCA push directo. NUNCA por CC.** Solo Sam vía GitHub Desktop. CC prepara los archivos y deja el commit listo; Sam lo pushea. **Además: CC nunca crea worktrees aquí — ver §7.** |
| Repos de código (`AgentLab`, `CoreProject`, `WebLab`, `BluePrints`, labs) | CC trabaja en **branch + PR**, nunca push directo a `main`. Sam revisa y mergea. Si CC usa worktree, es responsable de eliminarlo al cerrar el PR — ver §7. |

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

```
HECHO:
- [archivo/acción] — [commit/branch/PR]
PRESERVACIÓN DE CONTEXTO:
- [qué context files se tocaron y confirmación de que se archivó, no borró, lo anterior]
WORKTREES:
- [creado/eliminado/ninguno — ver §7]
PENDIENTE PARA SAM (acciones manuales):
- [lista exacta]
RIESGOS / DUDAS:
- [cualquier cosa que CC no pudo verificar o que requiere criterio de Sam]
```

Si no hubo context files tocados, declararlo explícito: "PRESERVACIÓN DE CONTEXTO: ninguno tocado."
Si no se crearon worktrees, declararlo explícito: "WORKTREES: ninguno creado."

---

## 5. ALCANCE Y DISCIPLINA

- CC ejecuta SOLO la tarea encargada. No toca sistemas adyacentes salvo que bloqueen directamente, y si lo hacen, lo declara antes.
- Ante ambigüedad, CC pregunta a Sam en vez de asumir.
- CC no "mejora" archivos por iniciativa propia sin pedirlo.

---

## 6. CÓMO SE ACTUALIZA ESTE PROTOCOLO

Este documento vive en `unrlvl-context/protocols/CC_PROTOCOL.md`. Se modifica preservando historia (es un context file). Los `CLAUDE.md` de cada repo solo apuntan aquí — no duplican reglas, para no divergir.

---

## 7. WORKTREES — DISCIPLINA Y PROHIBICIÓN EN CONTEXT REPO

Los worktrees huérfanos son un defecto recurrente: CC crea un worktree para un PR y lo deja sin eliminar, ensuciando el repo local de Sam. Esta sección corta el problema de raíz.

**7.1 — `unrlvl-context`: PROHIBIDO crear worktrees.**
En el repo de contexto, CC **nunca** ejecuta `git worktree add` ni trabaja en un worktree separado. CC trabaja en el **working tree principal**, prepara/actualiza los archivos preservando historia (§0), y deja todo listo para que Sam pushee por GitHub Desktop (§1). No hay PR ni branch que justifique un worktree aquí, porque CC no pushea este repo.

**7.2 — Repos de código: el worktree es desechable y CC lo elimina.**
Si para un PR CC crea un worktree (`git worktree add`), CC es **responsable de eliminarlo** (`git worktree remove <ruta>` + `git worktree prune` si queda registro) al cerrar o mergear el PR. Un worktree no se deja "por si acaso". Dejar un worktree huérfano es un defecto, no un estado aceptable.

**7.3 — Autoverificación de cierre.**
Antes de declarar una tarea terminada, CC se pregunta:
> "¿Creé algún worktree durante esta tarea? Si sí → ¿lo eliminé? Si no pude eliminarlo, ¿lo reporté explícitamente en PENDIENTE PARA SAM con la ruta exacta?"

El campo `WORKTREES:` del reporte (§4) es obligatorio: declara `creado y eliminado`, `ninguno creado`, o `creado y NO eliminado — acción para Sam: [ruta]`.

---

## ARCHIVO HISTÓRICO — CC_PROTOCOL v2026-06-06-v1 (archivado 2026-06-08)

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
