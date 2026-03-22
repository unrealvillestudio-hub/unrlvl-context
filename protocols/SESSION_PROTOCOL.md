# PROTOCOLO DE SESIÓN — Unrealville Studio
**Claude lo ejecuta en cada chat. Sam no necesita recordarlo.**

---

## INICIO DE SESIÓN

### Paso 1 — Identificar el contexto
Claude lee `ecosystem.json` y pregunta si no es obvio:
> *"¿Qué marca o proyecto trabajamos hoy?"*

### Paso 2 — Cargar contexto específico
- Leer `brands/[Marca]/brand.json` → estado operativo
- Leer `brands/[Marca]/BP_Brand_Context.md` → ADN + relacional
- Si es proyecto cross-brand: leer `projects/[Proyecto].json`

### Paso 3 — Confirmar en voz alta
> *"Contexto cargado — [Marca] · Última actualización: [fecha] · Alertas activas: [X] · Pendientes: [Y]. Arrancamos."*

---

## REGLA DE UN CHAT POR MARCA

- **Un chat = una marca.** No mezclar marcas en la misma sesión.
- **Excepción etiquetada:** Si la conversación es deliberadamente cross-brand (decisiones de ecosistema, arquitectura de sistema), se etiqueta así al inicio y actualiza `ecosystem.json` + `CONTEXT.md`.
- **Si Sam mezcla marcas sin intención**, Claude señala:
  > *"Esto que describes es de [Marca X], no de [Marca actual]. ¿Seguimos aquí y lo anoto en ContextoTemp para el chat de [Marca X], o cambiamos de contexto?"*

---

## CIERRE DE SESIÓN

Claude ejecuta antes de que Sam borre el chat:

### Paso 1 — Actualizar brand.json
- Nuevos proyectos → añadir a `active_projects`
- Proyectos entregados → cambiar `status`
- Decisiones tomadas → mover de `pending_decisions` a historial
- Alertas nuevas → añadir a `alerts`
- Alertas resueltas → eliminar

### Paso 2 — Actualizar ecosystem.json
Solo si hay cambio en estado general de la marca o proyecto.

### Paso 3 — Crear/cerrar checkpoints
Si hubo output significativo → crear entrada en `active_projects` con `next_action` clara.

### Paso 4 — Confirmar
> *"Listo Sam. Actualicé [X archivos]. Puedes borrar este chat sin arrepentirte más adelante."*

---

## SEÑALES DE ALERTA — Claude interrumpe si:

- Sam menciona borrar el chat sin haber hecho cierre formal
- La sesión toca más de una marca sin etiquetarse como cross-brand
- Un `next_action` lleva más de 2 semanas sin movimiento
- Un `pending_decision` crítico no se ha resuelto en 30 días

---

## FRECUENCIA DE DEPLOY A VERCEL

- **Cierre de sesión:** siempre
- **Mitad de sesión larga:** si hubo decisiones importantes
- **Nunca al inicio:** leer siempre, no escribir al arrancar
