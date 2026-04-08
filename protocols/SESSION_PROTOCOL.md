# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-04-08-v7 | **Mantenido por:** Claude

---

## ARQUITECTURA DEL SISTEMA DE CONTEXTO

### Fuente de verdad única: `ecosystem.json`

`ecosystem.json` es el único archivo que Claude carga automáticamente en cada sesión. Contiene el estado completo del ecosistema: marcas, labs, agentes, infraestructura, gaps, agenda.

Los `.md` son **renders derivados** del JSON — nunca se editan directamente.

| Archivo | Rol | Se actualiza cuando |
|---|---|---|
| `ecosystem.json` | **Fuente de verdad** — Claude lo carga siempre | Hay cambios en labs, marcas, gaps o agenda |
| `ecosystem.md` | Render narrativo del ecosistema | `ecosystem.json` cambia → Claude lo regenera |
| `ecosystem_filemap.md` | Render de dependencias y flujos | `ecosystem.json` cambia → Claude lo regenera |
| `brands/[Marca]/brand.json` | Estado actual de la marca | Hay cambios en la marca |
| `brands/[Marca]/BP_Brand_Context.md` | ADN permanente de la marca | Solo si cambia algo estructural |
| `brands/[Marca]/session_log.md` | Hilo vivo entre sesiones | Siempre — se añade al tope |
| `agents/[nombre]/session_log.md` | Log de sesiones de agentes | El agente genera y Sam commitea |

### Regla crítica de los `.md`
Los archivos `ecosystem.md` y `ecosystem_filemap.md` **nunca se editan manualmente**.
Son generados por Claude a partir de `ecosystem.json` cada vez que ese archivo cambia.
Cuando Sam los carga, siempre tienen la verdad actual porque son el último render del JSON.

---

## APERTURA — Primera frase en cada chat nuevo

> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

Sam responde. Claude carga con `Vercel:web_fetch_vercel_url` — **NUNCA `web_fetch`** para URLs de Vercel:

**Si Sam indica una marca específica:**
1. `https://unrlvl-context.vercel.app/ecosystem.json`
2. `https://unrlvl-context.vercel.app/brands/[Marca]/brand.json`
3. `https://unrlvl-context.vercel.app/brands/[Marca]/BP_Brand_Context.md`
4. `https://unrlvl-context.vercel.app/brands/[Marca]/session_log.md`

**Si Sam indica trabajo de ecosistema / desarrollo de labs (sin marca específica):**
1. `https://unrlvl-context.vercel.app/ecosystem.json`
2. `https://unrlvl-context.vercel.app/ecosystem.md`
3. `https://unrlvl-context.vercel.app/ecosystem_filemap.md`

Claude confirma:
> *"Contexto cargado — [Marca o Ecosistema] · [fecha] · En curso: [X] · Gaps: [Y]. Arrancamos."*

---

## COMANDO "Actualiza" — Lo único que Sam necesita decir

Cuando Sam escribe **"Actualiza"**, Claude ejecuta sin preguntar:

**1. Verifica agentes**
Fetch GET `https://unrlvl-social-media-agent.vercel.app/api/export` con header `x-export-secret: [EXPORT_SECRET]`:
- Si hay log → generar como output `social_media_agent_session_log.md`
- Si no hay → confirmar "Sin novedades del agente" y continuar

**2. Genera todos los archivos que cambiaron**

**Para chats de marca:**
- `session_log.md` — **siempre**, novedades al tope
- `brand.json` — si cambió estado, proyectos o alertas
- `BP_Brand_Context.md` — solo si cambió ADN o capa relacional
- `ecosystem.json` — si hubo cambio cross-brand o de labs

**Para chats de ecosistema:**
- `ecosystem.json` — **siempre**
- `ecosystem.md` — **siempre que ecosystem.json cambie** (regenerar desde JSON actualizado)
- `ecosystem_filemap.md` — **siempre que ecosystem.json cambie** (regenerar desde JSON actualizado)

**Regla de regeneración de `.md`:**
Claude lee el `ecosystem.json` actualizado y genera los `.md` completos desde cero usando la estructura establecida en el audit de 2026-04-02:
- `ecosystem.md`: radiografía narrativa Capa A/B, estado por lab, gaps principales
- `ecosystem_filemap.md`: flujos activos/rotos, gaps vs Neurone SCF, roadmap, naming conventions
El contenido nuevo del JSON se refleja. Lo que no cambió sale igual. Los `.md` nunca se editan directamente.

**3. REGLA CRÍTICA DE NOMENCLATURA**
Los outputs se generan con el nombre **EXACTO** del archivo en el repo, sin prefijos de marca:
- `session_log.md` (NO `ForumPHs_session_log.md`)
- `brand.json` (NO `ForumPHs_brand.json`)
- `ecosystem.json`
- `ecosystem.md`
- `ecosystem_filemap.md`
- `BP_Brand_Context.md`
- `SESSION_PROTOCOL.md`
- `social_media_agent_session_log.md`

Si el nombre difiere del canónico, GitHub Desktop crea archivos nuevos en vez de reemplazar — esto es un error.

**4. Provee el mensaje de commit** listo para pegar con rutas exactas.

**5. Recuerda a Sam:**
- Arrastrar archivos de **marca** a `brands/[Marca]/` (no a la raíz)
- Arrastrar `ecosystem.json`, `ecosystem.md`, `ecosystem_filemap.md` a la **raíz** del repo
- Verificar que GitHub Desktop muestre **modificaciones**, no archivos nuevos

**6. Verifica** con `Vercel:web_fetch_vercel_url` post-deploy y confirma:
> *"Listo Sam. Sistema actualizado."*

**Sam no especifica qué archivos generar. Claude decide.**

---

## PUSH DIRECTO A GITHUB DESDE CLAUDE

Claude puede hacer push directamente a cualquier repo de `unrealvillestudio-hub` sin GitHub Desktop.
**Cuándo usarlo:** cambios en sesión activa sobre repos de código (CoreProject, WebLab, BluePrints, etc.)
**Cuándo NO usarlo:** actualizaciones de contexto en `unrlvl-context` — esas siguen el flujo normal de outputs + GitHub Desktop para que Vercel redespliegue.

### Cómo funciona

Sam proporciona el PAT en el chat. Claude ejecuta en bash:

```bash
# 1. Clonar el repo
git clone https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git /tmp/repo

# 2. Editar archivos en /tmp/repo/

# 3. Commit y push
cd /tmp/repo
git config user.email "sam@unrealvillestudio.com"
git config user.name "Sam UNRLVL"
git add [archivos]
git commit -m "[mensaje]"
git push https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git main
```

### Seguridad del PAT
- El PAT actúa como credencial de escritura sobre los repos
- Sam lo comparte en el chat cuando lo necesita — Claude lo usa para esa sesión
- Se puede revocar en cualquier momento: GitHub → Settings → Developer Settings → Personal Access Tokens
- PATs tienen fecha de expiración configurable — cuando expira Claude pide uno nuevo

### Repos donde aplica este flujo
| Repo | Cuándo hacer push directo |
|---|---|
| `CoreProject` | Actualizar CONTEXT.md, FILEMAP.md, workflows, assets |
| `WebLab` | Fixes de código, config, componentes |
| `BluePrints` | Añadir/organizar assets de marca |
| `AgentLab` / otros labs | Fixes, componentes, configuración |

### Repos que NO usan este flujo
| Repo | Motivo |
|---|---|
| `unrlvl-context` | Requiere Vercel redeploy → usar outputs + GitHub Desktop |

---

## ACTUALIZACIÓN DIARIA

Claude pregunta una vez al día al detectar que Sam está por irse:
> *"Sam, antes de que te vayas — ¿Actualiza?"*

---

## FLUJO DE COMMIT — GitHub Desktop

1. Descargar los archivos que Claude generó como outputs
2. Arrastrar a la carpeta local `unrlvl-context` (reemplazar existentes):
   - Marca: `brands/[Marca]/`
   - Ecosistema: raíz del repo (`ecosystem.json`, `ecosystem.md`, `ecosystem_filemap.md`)
   - Agentes: `agents/[nombre]/`
   - Protocolos: `protocols/`
3. GitHub Desktop muestra los cambios automáticamente
4. Pegar el mensaje que Claude provee en "Summary"
5. "Commit to main" → "Push origin"
6. Vercel redesploya en ~30 segundos
7. Claude verifica y confirma

---

## AGENTES AUTÓNOMOS — Protocolo de log

| Agente | URL | Export endpoint | Marca |
|---|---|---|---|
| Social Media Agent | `unrlvl-social-media-agent.vercel.app` | `/api/export` | NeuroneSCF |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` | ForumPHs |

**Flujo del agente:**
1. Laura/PO trabaja con el agente → escribe "Actualiza" → agente guarda log en KV
2. Sam dice "Actualiza" en su chat → Claude verifica el endpoint → descarga el log si existe → lo incluye en el commit
3. Una vez en el repo, el agente lo lee dinámicamente en la próxima sesión

---

## DISCIPLINA DE CHAT — Un chat por marca

Un chat = una marca. Si Sam mezcla sin intención:
> *"Sam, esto es de [Marca X]. ¿Lo anoto en su session_log y seguimos, o cambiamos de chat?"*

**Excepción:** chats de ecosistema declarados al inicio. Actualizan `ecosystem.json` y sus renders.

---

## SEÑALES DE ALERTA

Claude interrumpe activamente si:
- Sam se va sin haber actualizado ese día
- Sesión con más de 24h sin actualización y hubo decisiones importantes
- `blocking: true` sin resolverse en más de 7 días
- `pending_decision` crítico sin resolverse en más de 30 días

---

## REFERENCIA RÁPIDA — URLs

| Archivo | URL |
|---|---|
| Ecosistema (JSON) | `https://unrlvl-context.vercel.app/ecosystem.json` |
| Ecosistema narrativo | `https://unrlvl-context.vercel.app/ecosystem.md` |
| Mapa dependencias | `https://unrlvl-context.vercel.app/ecosystem_filemap.md` |
| ForumPHs brand | `https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json` |
| ForumPHs log | `https://unrlvl-context.vercel.app/brands/ForumPHs/session_log.md` |
| NeuroneSCF brand | `https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json` |
| NeuroneSCF log | `https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md` |
| VizosCosmetics brand | `https://unrlvl-context.vercel.app/brands/VizosCosmetics/brand.json` |
| Protocolo | `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md` |
| SMA export | `https://unrlvl-social-media-agent.vercel.app/api/export` |
