# PROFESSOR PROTOCOL v1.0
_Unreal>ille Studio · Operativo desde: 2026-05-17_
_Documento: `knowledge/ecosystem/professor/PROFESSOR_PROTOCOL.md`_

---

## QUÉ ES

El Professor es el sistema que convierte aprendizajes de sesión en conocimiento institucional operativo. Evita que el mismo problema se resuelva dos veces desde cero. Calibra la DECISION_MATRIX con casos reales.

No es un sistema de notas. Es una fábrica de conocimiento estructurado con filtro de calidad y aprobación humana obligatoria.

---

## COMANDOS

### Durante la sesión

**`"Professor, anota"`** — Sam activa captura manual inmediata.
Claude captura el contexto del momento, lo formula como aprendizaje candidato, y lo añade a la lista temporal de la sesión. No interrumpe el flujo de trabajo.

**Checkpoint automático cada 10 mensajes** — silencioso.
Claude llama `professor-checkpoint` EF con los últimos 10 mensajes. Si detecta candidatos con relevance_score ≥ 3, los guarda en `professor_learnings`. Sam no ve nada a menos que haya candidatos de alta relevancia (score 5).

### Final de sesión

**`"Professor"`** — consolida y propone para aprobación.

Secuencia:
1. Consulta `professor_learnings` donde `filter_passed = true` y `approved_by_sam = false` de la sesión actual
2. Aplica filtro final de relevancia
3. Presenta lista a Sam para aprobación/rechazo ítem por ítem
4. Sam aprueba → Claude llama `professor-approve-learning` por cada ítem aprobado
5. Items aprobados se convierten en candidatos a manuales en `knowledge/`

---

## FILTRO DE RELEVANCIA (3 criterios en cascada)

**F1 — ¿Es reproducible?**
¿Útil en situación futura similar, en este u otro cliente?
- NO → descartar silenciosamente
- SÍ → F2

**F2 — ¿Corrige error o establece patrón?**
- Error corregido → tipo `error_known` → va a `professor_errors_known` + manual de plataforma
- Patrón nuevo → tipo `manual_new` → nuevo MANUAL.md en `knowledge/`
- Optimización → tipo `manual_update` → actualizar MANUAL.md existente

**F3 — ¿Específico de cliente o transversal?**
- Específico de marca → `knowledge/clients/[Cliente]/PLATFORM_NOTES.md`
- Transversal → `knowledge/core-business/[categoría]/MANUAL.md`
- De plataforma → `knowledge/platforms/[plataforma]/MANUAL.md`

---

## FORMATO DE PROPUESTA AL FINAL DE SESIÓN

```
Sam, estos son los aprendizajes de hoy:

[1] ¿APROBAR / RECHAZAR / MODIFICAR?
Aprendizaje: [descripción en una línea]
Categoría: [platform|client|ecosystem|core-business]
Destino: [path exacto en knowledge/]
Tipo: [error_known|pattern|manual_new|manual_update|decision_case]

[2] ...
```

Sam responde ítem por ítem. Claude no escribe nada a `knowledge/` sin aprobación explícita.

---

## ESTRUCTURA `knowledge/` — JERARQUÍA DE CONSULTA

```
knowledge/
  _templates/          ← templates universales (MANUAL_TEMPLATE.md, CASE_TEMPLATE.md)
  ecosystem/           ← sistemas internos UNRLVL
    decision-matrix/   ← DECISION_MATRIX.md + CHANGELOG.md
    professor/         ← este archivo + CHECKPOINT_RULES.md
  platforms/           ← herramientas de terceros (Shopify, Klaviyo, Judge.me, etc.)
  clients/             ← variaciones específicas por marca
  core-business/       ← conocimiento transversal (email marketing, ecommerce, etc.)
```

**Prioridad de consulta:** `ecosystem/` > `platforms/` > `clients/` > `core-business/`

---

## CHECKPOINT — REGLAS OPERATIVAS

Ver `knowledge/ecosystem/professor/CHECKPOINT_RULES.md` para las reglas detalladas.

Resumen:
- Cada 10 mensajes → llamada silenciosa a `professor-checkpoint` EF
- Mensajes del bloque se pasan como `messages_block[]`
- Candidatos con score ≥ 3 se guardan automáticamente en `professor_learnings`
- Candidatos con score 1-2 se descartan sin registro
- Claude no interrumpe la conversación salvo score = 5 (crítico)

---

## FLUJO COMPLETO DE SESIÓN

```
INICIO
  └── protocolo actualización
        └── professor-get-context EF
              └── carga pesos + veto_rules + platform_variables
                    └── confirma: "N variables de plataforma · N aprendizajes pendientes"

DURANTE
  └── DECISION_MATRIX silenciosa — activa en outputs relevantes
  └── Checkpoint automático cada 10 mensajes
  └── "Professor, anota" → captura manual

FINAL
  └── "Actualiza" → archivos operativos + session_log
  └── "Professor" → consolida + propone lista → Sam aprueba/rechaza
  └── Commit único: session_log + archivos + knowledge updates aprobados
```

---

## VERSIONES

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-17 | Creación inicial |

---

_PROFESSOR_PROTOCOL.md · Unreal>ille Studio · knowledge/ecosystem/professor/_
