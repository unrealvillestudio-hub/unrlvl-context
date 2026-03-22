# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-03-22-v4 | **Mantenido por:** Claude

---

## ARQUITECTURA DEL SISTEMA DE CONTEXTO

Cada marca tiene 3 archivos. Cada uno con un propósito distinto:

| Archivo | Qué contiene | Se reemplaza |
|---|---|---|
| `brand.json` | Estado actual — métricas, proyectos, alertas | Sí — foto de hoy |
| `BP_Brand_Context.md` | ADN permanente + capa relacional | Solo si cambia algo estructural |
| `session_log.md` | Hilo vivo entre sesiones — qué está en curso, caliente, pendiente | No — acumulativo, solo se añade al tope |

El `session_log.md` es el archivo más importante para el día a día. Contiene lo que viaja entre sesiones — decisiones a medias, temas calientes, contexto vivo que no encaja en un estado fijo.

---

## APERTURA — Primera frase en cada chat nuevo

> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

Sam responde. Claude carga con `Vercel:web_fetch_vercel_url` — NUNCA `web_fetch`:

1. `https://unrlvl-context.vercel.app/ecosystem.json`
2. `https://unrlvl-context.vercel.app/brands/[Marca]/brand.json`
3. `https://unrlvl-context.vercel.app/brands/[Marca]/BP_Brand_Context.md`
4. `https://unrlvl-context.vercel.app/brands/[Marca]/session_log.md` ← **el más importante**

Claude confirma:
> *"Contexto cargado — [Marca] · [fecha] · En curso: [X temas] · Alertas: [Y]. Arrancamos."*

---

## COMANDO "Actualiza" — Lo único que Sam necesita decir

Cuando Sam escribe **"Actualiza"**, Claude ejecuta sin preguntar:

1. **Determina** qué cambió en esta sesión
2. **Genera** como outputs individuales descargables todos los archivos que cambiaron:
   - `session_log.md` — **siempre**, añadiendo las novedades del día al tope
   - `brand.json` — si cambió estado, proyectos o alertas
   - `ecosystem.json` — si hubo cambio cross-brand
   - `BP_Brand_Context.md` — solo si cambió ADN o capa relacional
3. **Provee** el mensaje de commit listo para pegar
4. **Recuerda** a Sam los pasos de GitHub Desktop
5. **Verifica** con `Vercel:web_fetch_vercel_url` y confirma: *"Listo Sam. Sistema actualizado."*

**Sam no especifica qué archivos generar. Claude decide.**

---

## ACTUALIZACIÓN DIARIA

Claude pregunta una vez al día al detectar que Sam está por irse:
> *"Sam, antes de que te vayas — ¿Actualiza?"*

Si Sam dice sí o escribe "Actualiza" → ejecutar el flujo completo.

---

## FLUJO DE COMMIT — GitHub Desktop (siempre igual)

1. Descargar los archivos que Claude generó como outputs
2. Arrastrarlos a la carpeta local `unrlvl-context` (reemplazar existentes)
3. GitHub Desktop muestra los cambios automáticamente
4. Pegar el mensaje que Claude provee en "Summary"
5. "Commit to main" → "Push origin"
6. Vercel redesploya en ~30 segundos
7. Claude verifica y confirma

---

## DISCIPLINA DE CHAT — Un chat por marca

Un chat = una marca. Si Sam mezcla sin intención:
> *"Sam, esto es de [Marca X]. ¿Lo anoto en su session_log y seguimos, o cambiamos de chat?"*

**Excepción — chats de ecosistema:** declarados al inicio. Actualizan `ecosystem.json`.

---

## SEÑALES DE ALERTA

Claude interrumpe activamente si:
- Sam se va sin haber actualizado ese día
- Sesión con más de 24h sin actualización y hubo decisiones importantes
- `blocking: true` sin resolverse en más de 7 días
- `pending_decision` crítico sin resolverse en más de 30 días

---

## PROMPT PARA SINCRONIZAR CHATS EXISTENTES

Pegar en cualquier chat para activar el sistema:

---
*Tenemos un sistema de contexto activo. Instrucciones:*

*1. Usa EXCLUSIVAMENTE `Vercel:web_fetch_vercel_url` — nunca `web_fetch` para URLs de Vercel.*
*2. Lee `https://unrlvl-context.vercel.app/ecosystem.json`*
*3. Identifica la marca de este chat en el historial y lee sus 3 archivos desde `https://unrlvl-context.vercel.app/brands/[Marca]/`:*
   - *`brand.json` — estado actual*
   - *`BP_Brand_Context.md` — ADN y capa relacional*
   - *`session_log.md` — hilo vivo entre sesiones, el más importante*
*4. Lee `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md`*
*5. Confirma lo que cargaste y el estado actual de la marca.*
*6. Cuando Sam diga "Actualiza": genera TODOS los archivos que hayan cambiado como outputs individuales descargables, siempre incluyendo `session_log.md` con las novedades del día añadidas al tope. Incluye mensaje de commit listo para pegar. Sam no especifica qué archivos — tú decides.*

---

## REFERENCIA RÁPIDA — URLs

| Archivo | URL |
|---|---|
| Ecosistema | `https://unrlvl-context.vercel.app/ecosystem.json` |
| ForumPHs brand | `https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json` |
| ForumPHs BP | `https://unrlvl-context.vercel.app/brands/ForumPHs/BP_Brand_Context.md` |
| ForumPHs log | `https://unrlvl-context.vercel.app/brands/ForumPHs/session_log.md` |
| NeuroneSCF brand | `https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json` |
| NeuroneSCF log | `https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md` |
| VizosCosmetics brand | `https://unrlvl-context.vercel.app/brands/VizosCosmetics/brand.json` |
| VizosCosmetics log | `https://unrlvl-context.vercel.app/brands/VizosCosmetics/session_log.md` |
| Protocolo | `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md` |
