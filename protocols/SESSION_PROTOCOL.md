# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-03-25-v6 | **Mantenido por:** Claude

---

## ARQUITECTURA DEL SISTEMA DE CONTEXTO

Cada marca tiene 3 archivos. Cada uno con un propósito distinto:

| Archivo | Qué contiene | Se reemplaza |
|---|---|---|
| `brand.json` | Estado actual — métricas, proyectos, alertas | Sí — foto de hoy |
| `BP_Brand_Context.md` | ADN permanente + capa relacional | Solo si cambia algo estructural |
| `session_log.md` | Hilo vivo entre sesiones — qué está en curso, caliente, pendiente | No — acumulativo, solo se añade al tope |

El `session_log.md` es el archivo más importante para el día a día. Los agentes autónomos tienen su propio log en `agents/[nombre]/session_log.md`.

---

## NOMENCLATURA DE ARCHIVOS — REGLA CRÍTICA

**Claude genera SIEMPRE los outputs con el nombre EXACTO del archivo en el repo. Sin prefijos de marca.**

| ✅ CORRECTO | ❌ INCORRECTO |
|---|---|
| `session_log.md` | `ForumPHs_session_log.md` |
| `brand.json` | `ForumPHs_brand.json` |
| `ecosystem.json` | `UNRLVL_ecosystem.json` |
| `BP_Brand_Context.md` | `ForumPHs_BP_Brand_Context.md` |

**Razón:** Sam arrastra los outputs directamente a `brands/[Marca]/` en el repo. Si el nombre difiere del canónico, GitHub crea un archivo nuevo en vez de reemplazar el existente. La ruta de destino ya da el contexto — el nombre del archivo no necesita incluir la marca.

**Señal de alerta en GitHub Desktop:** si aparecen archivos nuevos en vez de modificaciones verdes, los nombres no son canónicos. Corregir antes de hacer commit.

**Excepción:** el log del Social Media Agent se descarga como `social_media_agent_session_log.md` porque Sam necesita identificarlo antes de moverlo a `agents/social-media-agent/session_log.md`.

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
2. **Verifica agentes** — fetch a `https://unrlvl-social-media-agent.vercel.app/api/export` con header `x-export-secret: [EXPORT_SECRET]`:
   - Si hay log → genera output `social_media_agent_session_log.md`
   - Si no hay → confirma "Sin novedades del Social Media Agent" y continúa
3. **Genera** outputs con **nombre canónico exacto**:
   - `session_log.md` — **siempre**, novedades al tope
   - `brand.json` — si cambió estado, proyectos o alertas
   - `ecosystem.json` — si hubo cambio cross-brand
   - `BP_Brand_Context.md` — solo si cambió ADN o capa relacional
   - `social_media_agent_session_log.md` — si había log del agente
4. **Provee** mensaje de commit con rutas exactas en el repo
5. **Recuerda** pasos de GitHub Desktop
6. **Verifica** con `Vercel:web_fetch_vercel_url` en el nuevo deploy y confirma: *"Listo Sam. Sistema actualizado."*

**Sam no especifica qué archivos. Claude decide.**

---

## FLUJO DE COMMIT — GitHub Desktop

1. Descargar outputs generados por Claude
2. Arrastrar a la carpeta correcta en `unrlvl-context`:
   - Marca → `brands/[Marca]/` (reemplazar existentes)
   - Agente → `agents/[nombre]/`
3. Verificar en GitHub Desktop que son **modificaciones**, no archivos nuevos
4. Pegar el mensaje de commit que Claude provee
5. "Commit to main" → "Push origin"
6. Vercel redesploya en ~30 segundos
7. Claude verifica y confirma

---

## ACTUALIZACIÓN DIARIA

Claude pregunta al detectar que Sam se va:
> *"Sam, antes de que te vayas — ¿Actualiza?"*

---

## AGENTES AUTÓNOMOS — Protocolo de log

```
unrlvl-context/
  brands/
  agents/
    social-media-agent/
      session_log.md
```

El agente lee `brands/NeuroneSCF/session_log.md` dinámicamente. Laura escribe "Actualiza" → KV → Sam descarga en su próximo Actualiza.

**Agentes activos:**

| Agente | URL | Export endpoint | Marca |
|---|---|---|---|
| Social Media Agent | `unrlvl-social-media-agent.vercel.app` | `/api/export` | NeuroneSCF |

---

## DISCIPLINA DE CHAT

Un chat = una marca. Si Sam mezcla:
> *"Sam, esto es de [Marca X]. ¿Lo anoto en su session_log y seguimos, o cambiamos de chat?"*

---

## SEÑALES DE ALERTA

- Sam se va sin actualizar ese día
- Sesión +24h sin actualización con decisiones importantes
- `blocking: true` sin resolverse +7 días
- `pending_decision` crítico sin resolverse +30 días

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
| Social Media Agent log | `https://unrlvl-social-media-agent.vercel.app/api/export` |
