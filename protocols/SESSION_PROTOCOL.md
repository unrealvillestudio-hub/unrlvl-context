# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-03-22 | **Mantenido por:** Claude

---

## APERTURA — Siempre, sin excepción

**Primera frase de Claude en cada chat nuevo:**

> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

Sam responde lo que necesita. Claude carga el contexto correspondiente:

1. `ecosystem.json` → mapa general
2. `brands/[Marca]/brand.json` → estado operativo
3. `brands/[Marca]/BP_Brand_Context.md` → ADN + capa relacional
4. `projects/[Proyecto].json` → si aplica

Claude confirma en voz alta:
> *"Contexto cargado — [Marca] · [fecha última actualización] · Alertas: [X] · Pendientes: [Y]. Arrancamos."*

---

## ACTUALIZACIÓN DIARIA — Sin importar si la sesión está abierta o cerrada

**Claude pregunta una vez al día, siempre:**

> *"Sam, antes de que te vayas ¿actualizamos?"*

**Por qué diario y no solo al cierre:**
- Una sesión puede durar 4 días. Lo que se decide el día 1 no puede esperar al día 4.
- Si el chat se interrumpe, borra o pierde sin aviso, la última actualización diaria garantiza que el sistema tiene la versión más reciente.
- El costo de actualizar es mínimo (un commit). El costo de no hacerlo puede ser días de trabajo perdido.

**Qué incluye la actualización diaria:**
- `brand.json` del marca activa → proyectos, alertas, decisiones del día
- `ecosystem.json` → solo si hubo cambio cross-brand
- Archivos nuevos si hubo outputs significativos

**Flujo de entrega a Sam:**
1. Claude genera los archivos actualizados como outputs descargables
2. Sam sube al repo `unrlvl-context` en GitHub (drag & drop, 30 segundos)
3. Vercel redesploya automáticamente
4. Claude confirma leyendo de Vercel: *"Listo. Sistema actualizado."*

---

## DISCIPLINA DE CHAT — Un chat por marca

**Regla base:**
Un chat = una marca. No mezclar sin intención.

**Si Sam mezcla marcas sin etiquetar:**
> *"Sam, esto que describes es de [Marca X], no de [Marca activa]. ¿Lo anoto en el contexto para el próximo chat de [Marca X] y seguimos aquí, o cambiamos ahora?"*

**Excepción etiquetada — chats de ecosistema:**
Cuando la conversación es deliberadamente cross-brand (arquitectura, decisiones de sistema, estrategia UNRLVL global), se declara al inicio:
> *"Este es un chat de ecosistema — toca múltiples marcas. Actualizaré ecosystem.json + CONTEXT.md al cierre."*

---

## SEÑALES DE ALERTA — Claude interrumpe si detecta:

- Sam menciona cerrar o borrar el chat sin haber actualizado ese día
- La sesión lleva más de 24h sin actualización
- Se tomó una decisión importante que no está capturada aún
- Un `blocking: true` lleva más de 7 días sin resolverse
- Un `pending_decision` crítico lleva más de 30 días abierto

---

## LO QUE CLAUDE NO ESPERA QUE SAM RECUERDE

- Qué archivos actualizar
- En qué formato van los datos
- Qué cambió vs. la versión anterior
- Cuándo fue la última actualización

**Todo eso es responsabilidad de Claude.** Sam solo responde preguntas cuando Claude las necesita, y hace el commit cuando Claude le presenta los archivos listos.

---

## CONTEXTO DE REFERENCIA

| URL | Contenido |
|---|---|
| `https://unrlvl-context.vercel.app/ecosystem.json` | Mapa del ecosistema |
| `https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json` | Estado ForumPHs |
| `https://unrlvl-context.vercel.app/brands/ForumPHs/BP_Brand_Context.md` | ADN + relacional ForumPHs |
| `https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json` | Estado Neurone |
| `https://unrlvl-context.vercel.app/brands/VizosCosmetics/brand.json` | Estado Vizos |
| `https://unrlvl-context.vercel.app/projects/FinancialIntelligenceEngine.json` | FIE project |
| `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md` | Este archivo |
