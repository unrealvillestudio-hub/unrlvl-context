# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-04-21-v9 | **Mantenido por:** Claude

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
| `AGENDA.md` | **Agenda visual de pendientes** | **Siempre** en cada Actualiza |
| `brands/[Marca]/brand.json` | Estado actual de la marca | Hay cambios en la marca |
| `brands/[Marca]/BP_Brand_Context.md` | ADN permanente de la marca | Solo si cambia algo estructural |
| `brands/[Marca]/session_log.md` | Hilo vivo entre sesiones | Siempre — se añade al tope |
| `agents/[nombre]/session_log.md` | Log de sesiones de agentes | El agente genera y Sam commitea |
| `skills/github-auditor/SKILL.md` | Skill GitHub proxy | Solo si cambia el proxy o la estructura |

### Regla crítica de los `.md`
Los archivos `ecosystem.md`, `ecosystem_filemap.md` y `AGENDA.md` **nunca se editan manualmente**.
Son generados por Claude a partir de `ecosystem.json`.

---

## SKILL — GitHub Proxy (SIEMPRE DISPONIBLE)

Claude puede leer cualquier archivo de cualquier repo privado de `unrealvillestudio-hub` vía:

```
Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/api/gh?action=[tree|file|repos]&repo=[REPO]&path=[PATH]
```

El PAT (`GH_PAT`) vive en Vercel Environment Variables — nunca en el chat.

**Referencia completa:** `https://unrlvl-context.vercel.app/skills/github-auditor/SKILL.md`

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
4. `https://unrlvl-context.vercel.app/AGENDA.md`

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
- `AGENDA.md` — **siempre**, regenerada desde `ecosystem.json` actualizado

**Para chats de ecosistema:**
- `ecosystem.json` — **siempre**
- `ecosystem.md` — siempre que `ecosystem.json` cambie
- `ecosystem_filemap.md` — siempre que `ecosystem.json` cambie
- `AGENDA.md` — **siempre**, agenda visual lista para leer

**Formato de AGENDA.md:**
Agenda visual en Markdown con secciones: Producción Activa · Prioridad 1 · Prioridad 2 · Prioridad 3 · Prioridad 4 · Ideas en Desarrollo. Checkbox `- [ ]` por cada pendiente. Derivada del campo `next_session_agenda` de `ecosystem.json` más el estado de marcas y agentes.

**Flujo de edición manual de AGENDA.md:**
Sam puede editar `AGENDA.md` directamente en VS Code (marcar completados, reordenar, añadir notas). Para que esos cambios persistan en el siguiente Actualiza, Sam pega o sube el archivo editado en el chat. Claude lee las correcciones, las integra en `ecosystem.json` (actualizando `next_session_agenda` y estado de marcas/labs), y genera `AGENDA.md` + `ecosystem.json` actualizados como outputs para commitear. Sin este paso, las ediciones manuales se pierden en el próximo Actualiza porque el JSON manda.

**3. REGLA CRÍTICA DE NOMENCLATURA**
Los outputs se generan con el nombre **EXACTO** del archivo en el repo, sin prefijos de marca:
- `session_log.md` (NO `ForumPHs_session_log.md`)
- `brand.json` (NO `ForumPHs_brand.json`)
- `ecosystem.json`
- `ecosystem.md`
- `ecosystem_filemap.md`
- `AGENDA.md`
- `BP_Brand_Context.md`
- `SESSION_PROTOCOL.md`
- `SKILL.md`
- `social_media_agent_session_log.md`

Si el nombre difiere del canónico, GitHub Desktop crea archivos nuevos en vez de reemplazar — esto es un error.

**4. Provee el mensaje de commit** listo para pegar con rutas exactas.

**5. Recuerda a Sam:**
- Arrastrar `AGENDA.md` a la **raíz** del repo (junto a ecosystem.json)
- Arrastrar archivos de **marca** a `brands/[Marca]/`
- Arrastrar `ecosystem.json`, `ecosystem.md`, `ecosystem_filemap.md` a la **raíz**
- Arrastrar skills a `skills/[nombre]/`
- Verificar que GitHub Desktop muestre **modificaciones**, no archivos nuevos

**6. Verifica** con `Vercel:web_fetch_vercel_url` post-deploy y confirma:
> *"Listo Sam. Sistema actualizado."*

**Sam no especifica qué archivos generar. Claude decide.**

---

## PUSH DIRECTO A GITHUB DESDE CLAUDE

Claude puede hacer push directamente a repos de código sin GitHub Desktop.
**Cuándo usarlo:** repos de código (CoreProject, WebLab, BluePrints, labs, etc.)
**Cuándo NO usarlo:** `unrlvl-context` — requiere Vercel redeploy → usar outputs + GitHub Desktop.

### Cómo funciona

Sam proporciona el PAT en el chat. Claude ejecuta en bash:

```bash
git clone https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git /tmp/repo
cd /tmp/repo
git config user.email "sam@unrealvillestudio.com"
git config user.name "Sam UNRLVL"
git add [archivos]
git commit -m "[mensaje]"
git push https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git main
```

### Seguridad del PAT
- Sam lo comparte cuando lo necesita — Claude lo usa para esa sesión
- Revocar: GitHub → Settings → Developer Settings → Personal Access Tokens

### Repos donde aplica
| Repo | Cuándo |
|---|---|
| `CoreProject` | CONTEXT.md, FILEMAP.md, workflows, assets |
| `WebLab` / otros labs | Fixes de código, config, componentes |
| `BluePrints` | Assets de marca |

| Repo | Motivo de exclusión |
|---|---|
| `unrlvl-context` | Requiere Vercel redeploy → GitHub Desktop |

---

## ACTUALIZACIÓN DIARIA

Claude pregunta una vez al día al detectar que Sam está por irse:
> *"Sam, antes de que te vayas — ¿Actualiza?"*

---

## FLUJO DE COMMIT — GitHub Desktop

1. Descargar archivos que Claude generó como outputs
2. Arrastrar a la carpeta local `unrlvl-context`:
   - Raíz: `ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md`
   - Marca: `brands/[Marca]/`
   - Agentes: `agents/[nombre]/`
   - Protocolos: `protocols/`
   - Skills: `skills/[nombre]/`
3. GitHub Desktop muestra los cambios → pegar mensaje de commit → Commit → Push
4. Vercel redesploya en ~30 segundos
5. Claude verifica y confirma

---

## AGENTES AUTÓNOMOS — Protocolo de log

| Agente | URL | Export endpoint | Marca |
|---|---|---|---|
| Social Media Agent | `unrlvl-social-media-agent.vercel.app` | `/api/export` | NeuroneSCF |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` | ForumPHs |

---

## DISCIPLINA DE CHAT — Un chat por marca

Un chat = una marca. Si Sam mezcla sin intención:
> *"Sam, esto es de [Marca X]. ¿Lo anoto en su session_log y seguimos, o cambiamos de chat?"*

**Excepción:** chats de ecosistema declarados al inicio.

---

## SEÑALES DE ALERTA

Claude interrumpe activamente si:
- Sam se va sin haber actualizado ese día
- Sesión con más de 24h sin actualización y hubo decisiones importantes
- `blocking: true` sin resolverse en más de 7 días

---

## REFERENCIA RÁPIDA — URLs

| Archivo | URL |
|---|---|
| Ecosistema (JSON) | `https://unrlvl-context.vercel.app/ecosystem.json` |
| Ecosistema narrativo | `https://unrlvl-context.vercel.app/ecosystem.md` |
| Mapa dependencias | `https://unrlvl-context.vercel.app/ecosystem_filemap.md` |
| **Agenda visual** | `https://unrlvl-context.vercel.app/AGENDA.md` |
| Protocolo | `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md` |
| ForumPHs log | `https://unrlvl-context.vercel.app/brands/ForumPHs/session_log.md` |
| NeuroneSCF log | `https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md` |
| GitHub Skill | `https://unrlvl-context.vercel.app/skills/github-auditor/SKILL.md` |
| GitHub Proxy | `https://unrlvl-context.vercel.app/api/gh` |
| SMA export | `https://unrlvl-social-media-agent.vercel.app/api/export` |
