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
