# CASO CALIBRADO — [TÍTULO]
_Fecha: [YYYY-MM-DD] · Marca: [brand_id] · Versión matriz: v1.0_
_ID Supabase: [UUID desde professor_decision_cases]_

---

## CONTEXTO
Descripción concisa de la situación en la que se tomó la decisión.

---

## DIMENSIONES ACTIVADAS
| Dimensión | Código | Razón |
|---|---|---|
| Stakeholder | A[1-4] | [por qué este stakeholder] |
| Consecuencia | B[1-5] | [tipo de consecuencia] |
| Reversibilidad | C[1-4] | [nivel de reversibilidad] |
| Horizonte | D[1-3] | [ventana temporal] |

---

## VETO ACTIVADO
`[V1|V2|V3|V4|ninguno]` — [descripción del veto si aplica]

---

## BYPASS DE SAM
`[sí|no]` — [justificación si hubo bypass]

---

## DECISIÓN TOMADA
Qué se hizo exactamente.

---

## OUTCOME
Resultado real. ¿Fue la decisión correcta? `[sí|no|parcial]`

---

## LECCIÓN
La lección en una línea reproducible. Lo que Claude debe recordar la próxima vez.

---

## REFERENCIAS
- Manual relacionado: `knowledge/[path]/MANUAL.md`
- EF relacionada: `[nombre-ef]` si aplica
