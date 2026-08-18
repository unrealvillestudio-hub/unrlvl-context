# CHECKPOINT RULES v1.0
_Unrealville Studio · 2026-05-17_

---

## QUÉ ACTIVA UN CHECKPOINT

El checkpoint se ejecuta cada 10 mensajes de la conversación.
Claude llama `professor-checkpoint` EF con el bloque de mensajes recientes.

---

## QUÉ BUSCA EL CHECKPOINT

**SÍ captura:**
- Limitaciones de API descubiertas (plan, permisos, rate limits)
- Errores técnicos resueltos con solución exacta y reproducible
- Comportamientos de plataforma que no eran obvios
- Variables de configuración confirmadas (IDs, keys públicas, URLs)
- Patrones de workaround validados en producción

**NO captura:**
- Estado actual de un proyecto o tarea
- Preferencias estéticas o de tono de Sam
- Soluciones únicas e irrepetibles
- Información ya documentada en skills existentes
- Conversación general sin contenido técnico

---

## ESCALA DE RELEVANCIA (1-5)

| Score | Significado | Acción |
|---|---|---|
| 5 | Crítico — evita pérdida real o error grave | Guardar + notificar a Sam inmediatamente |
| 4 | Alto — ahorra tiempo significativo en sesiones futuras | Guardar en `professor_learnings` |
| 3 | Medio — útil pero no urgente | Guardar en `professor_learnings` |
| 2 | Bajo — marginal | Descartar silenciosamente |
| 1 | Irrelevante | Descartar silenciosamente |

Solo scores ≥ 3 se guardan. Solo score = 5 interrumpe la conversación.

---

## COMPORTAMIENTO DE CLAUDE DURANTE CHECKPOINT

El checkpoint es **completamente silencioso** salvo score = 5.

- Score 1-2: nada visible, descartado
- Score 3-4: guardado en `professor_learnings`, Claude continúa sin mencionar nada
- Score 5: Claude inserta una línea breve: `[Professor: anotado — [título de 5 palabras]]`

---

## DIFERENCIA ENTRE CHECKPOINT Y "PROFESSOR, ANOTA"

| | Checkpoint automático | "Professor, anota" |
|---|---|---|
| Trigger | Cada 10 mensajes | Sam lo dice explícitamente |
| Alcance | Último bloque de mensajes | Contexto inmediato del momento |
| Filtro | Claude Haiku evalúa automáticamente | Sam ya decidió que vale |
| Visibilidad | Silencioso (salvo score 5) | Claude confirma captura |

---

_CHECKPOINT_RULES.md · Unrealville Studio · knowledge/ecosystem/professor/_
