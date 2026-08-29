# QA Rules
_Actualizado: 2026-05-20_

## QA de UI — qué cuenta y qué no

### NO es QA
- Checks en Python sobre texto estático del HTML
- Buscar strings con `if 'x' in html`
- Verificar que una función existe en el código

### SÍ es QA
- Abrir el browser y ejecutar la interacción real
- Ver el resultado en pantalla
- Probar en mobile físico

### Cuando no se puede hacer QA real
Declararlo explícitamente a Sam:
> "No puedo verificar esto sin browser. Puntos que necesitan validación manual: [lista]."

**Nunca afirmar que el QA fue realizado si no se ejecutó en condiciones reales.**

---

> **Relación con `protocols/DELIVERY_AND_VERIFICATION_RULE.md` (2026-08-29).** Este documento es el QA **de UI**: qué cuenta como haber probado algo en pantalla. Aquél es el QA **de la entrega**: las cuatro QA (`QA-ENCARGO`, `QA-OBJETIVO`, `QA-INFO`, `QA-PROP`), el destinatario, el idioma, la etiqueta de evidencia y el panel de carga verificada. **Comparten doctrina y no se duplican:** la frase de cierre de aquí —*nunca afirmar que el QA fue realizado si no se ejecutó en condiciones reales*— es la misma que allá prohíbe una etiqueta de `QA-INFO` incompleto y la que hace roja toda fila sin evidencia.
