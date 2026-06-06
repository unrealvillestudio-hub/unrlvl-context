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

```
HECHO:
- [archivo/acción] — [commit/branch/PR]
PRESERVACIÓN DE CONTEXTO:
- [qué context files se tocaron y confirmación de que se archivó, no borró, lo anterior]
PENDIENTE PARA SAM (acciones manuales):
- [lista exacta]
RIESGOS / DUDAS:
- [cualquier cosa que CC no pudo verificar o que requiere criterio de Sam]
```

Si no hubo context files tocados, declararlo explícito: "PRESERVACIÓN DE CONTEXTO: ninguno tocado."

---

## 5. ALCANCE Y DISCIPLINA

- CC ejecuta SOLO la tarea encargada. No toca sistemas adyacentes salvo que bloqueen directamente, y si lo hacen, lo declara antes.
- Ante ambigüedad, CC pregunta a Sam en vez de asumir.
- CC no "mejora" archivos por iniciativa propia sin pedirlo.

---

## 6. CÓMO SE ACTUALIZA ESTE PROTOCOLO

Este documento vive en `unrlvl-context/protocols/CC_PROTOCOL.md`. Se modifica preservando historia (es un context file). Los `CLAUDE.md` de cada repo solo apuntan aquí — no duplican reglas, para no divergir.
