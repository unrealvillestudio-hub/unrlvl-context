# PROTOCOLO DE SESIÓN — Unrealville Studio
**Versión:** 2026-05-11-v11 | **Mantenido por:** Claude

---

## ARQUITECTURA DEL SISTEMA DE CONTEXTO

### Fuente de verdad única: `ecosystem.json`

| Archivo | Rol | Se actualiza cuando |
|---|---|---|
| `ecosystem.json` | **Fuente de verdad** — Claude lo carga siempre | Hay cambios en labs, marcas, gaps o agenda |
| `ecosystem.md` | Render narrativo del ecosistema | `ecosystem.json` cambia → Claude lo regenera |
| `ecosystem_filemap.md` | Render de dependencias y flujos | `ecosystem.json` cambia → Claude lo regenera |
| `AGENDA.md` | **Agenda visual de pendientes** | **Siempre** en cada Actualiza |
| `skills/INDEX.md` | Tabla de decisión de skills | Cuando se añaden skills nuevos |
| `skills/[nombre]/SKILL.md` | Skills del sistema | Cuando el skill cambia |
| `brands/[Marca]/brand.json` | Estado actual de la marca | Hay cambios en la marca |
| `brands/[Marca]/BP_Brand_Context.md` | ADN permanente de la marca | Solo si cambia algo estructural |
| `brands/[Marca]/session_log.md` | Hilo vivo entre sesiones | Siempre — se añade al tope |
| `agents/[nombre]/session_log.md` | Log de sesiones de agentes | El agente genera y Sam commitea |

### Regla crítica de los `.md`
`ecosystem.md`, `ecosystem_filemap.md` y `AGENDA.md` **nunca se editan manualmente** — generados por Claude desde `ecosystem.json`.

---

## SKILL — GitHub Proxy + Vercel (SIEMPRE DISPONIBLES)

```
Vercel:web_fetch_vercel_url → https://unrlvl-context.vercel.app/api/gh?action=[tree|file|repos]&repo=[REPO]&path=[PATH]
```

El PAT (`GH_PAT`) vive en Vercel Environment Variables — nunca en el chat.
**Referencia:** `skills/github-auditor/SKILL.md` · `skills/vercel/SKILL.md`

---

## APERTURA — Primera frase en cada chat nuevo

> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

---

## PROTOCOLO DE CARGA COMPLETO

### Paso 1 — Carga base (siempre, antes de preguntar)
```
1. https://unrlvl-context.vercel.app/ecosystem.json
2. https://unrlvl-context.vercel.app/AGENDA.md
3. https://unrlvl-context.vercel.app/skills/INDEX.md
```

### Paso 2 — Pregunta
> *"Hola Sam, ¿con qué marca y proyecto vamos a trabajar?"*

### Paso 3 — Carga por contexto

**Si Sam indica marca específica:**
```
4. https://unrlvl-context.vercel.app/brands/[Marca]/brand.json
5. https://unrlvl-context.vercel.app/brands/[Marca]/BP_Brand_Context.md
6. https://unrlvl-context.vercel.app/brands/[Marca]/session_log.md
```

**Si Sam indica ecosistema / labs (sin marca específica):**
```
4. https://unrlvl-context.vercel.app/ecosystem.md
5. https://unrlvl-context.vercel.app/ecosystem_filemap.md
```

### Paso 4 — Skills bajo demanda

Consultar `skills/INDEX.md` según el trabajo declarado. Cargar solo los relevantes.

| Sam dice | Skills a cargar |
|----------|----------------|
| "Shopify / tienda / audit / fix" | `shopify-auditor` + `shopify-mcp` |
| "HTML / diseño / componente / visual" | `ui-ux-layer` |
| "copy / texto / post / contenido" | `content-pipeline` |
| "agente / WhatsApp / bot" | `agent-builder` + `security` |
| "imagen / video / creative / LoRA" | `image-processing` + `higgsfield` |
| "ads / campaña / Meta / TikTok" | `ads-mcp` |
| "costos / margen / tokens / OPS" | `cost-layer` |
| "deploy / nueva EF / Supabase" | `security` |
| "pipeline / IID / Orchestrator" | `content-pipeline` |

### Paso 5 — Confirmación
> *"Contexto cargado — [Marca o Ecosistema] · [fecha] · Skills activos: [lista]. Arrancamos."*

---

## COMANDO "Actualiza" — Lo único que Sam necesita decir

Cuando Sam escribe **"Actualiza"**, Claude ejecuta sin preguntar:

**1. Verifica agentes — CHECK LIGERO**

Fetch headers (HEAD) de `https://unrlvl-social-media-agent.vercel.app/api/export?secret=6lk8yfcMFdv%40L5%243H%5EoT%26AxR` vía `Vercel:web_fetch_vercel_url` para obtener `ETag` o `Last-Modified`.

- Si **igual al ETag de la sesión anterior** (anotado en session_log.md) → declarar `"Sin novedades del SMA"` y continuar. **No cargar el export completo.**
- Si **ETag cambió** → cargar export completo, procesar log, generar `social_media_agent_session_log.md` como output.
- Si no hay ETag previo registrado → cargar export completo esta vez y anotar el ETag en session_log.md para la próxima.

**Nota:** el ETag del SMA se registra en session_log.md como `_sma_etag: "valor"` al final del bloque de la sesión.

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
- `AGENDA.md` — **siempre**

**3. REGLA CRÍTICA DE NOMENCLATURA**
Outputs con nombre **EXACTO** del archivo en el repo:
`session_log.md` · `brand.json` · `ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md` · `BP_Brand_Context.md` · `SESSION_PROTOCOL.md` · `SKILL.md` · `INDEX.md` · `social_media_agent_session_log.md`

**4. Provee el mensaje de commit** listo para pegar con rutas exactas.

**5. Recuerda a Sam:**
- Raíz: `ecosystem.json` · `ecosystem.md` · `ecosystem_filemap.md` · `AGENDA.md` · `TIERS.md`
- Skills: `skills/[nombre]/SKILL.md` (crear subcarpeta si es nueva) · Index: `skills/INDEX.md`
- Marcas: `brands/[Marca]/` · Agentes: `agents/[nombre]/` · Protocolos: `protocols/`
- GitHub Desktop debe mostrar **modificaciones**, no archivos nuevos

**6. Verifica** con `Vercel:web_fetch_vercel_url` post-deploy y confirma:
> *"Listo Sam. Sistema actualizado."*

---

## PUSH DIRECTO A GITHUB DESDE CLAUDE

**Cuándo usarlo:** repos de código (CoreProject, WebLab, BluePrints, labs)
**Cuándo NO:** `unrlvl-context` — requiere Vercel redeploy → GitHub Desktop siempre.

```bash
git clone https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git /tmp/repo
cd /tmp/repo && git config user.email "sam@unrealvillestudio.com" && git config user.name "Sam UNRLVL"
git add [archivos] && git commit -m "[mensaje]"
git push https://[PAT]@github.com/unrealvillestudio-hub/[REPO].git main
```

---

## ACTUALIZACIÓN DIARIA

> *"Sam, antes de que te vayas — ¿Actualiza?"*

---

## FLUJO DE COMMIT — GitHub Desktop

1. Descargar archivos que Claude generó como outputs
2. Arrastrar a la carpeta local `unrlvl-context` con rutas exactas
3. GitHub Desktop: Commit → Push → Vercel redesploya (~30s)
4. Claude verifica y confirma

---

## AGENTES AUTÓNOMOS

| Agente | URL | Export endpoint | Marca |
|---|---|---|---|
| Social Media Agent | `unrlvl-social-media-agent.vercel.app` | `/api/export?secret=[SECRET]` | NeuroneSCF |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` | ForumPHs |

---

## DISCIPLINA DE CHAT — Un chat por marca

Un chat = una marca. Si Sam mezcla sin intención:
> *"Sam, esto es de [Marca X]. ¿Lo anoto en su session_log y seguimos, o cambiamos de chat?"*

---

## REFERENCIA RÁPIDA — URLs

| Archivo | URL |
|---|---|
| Ecosistema (JSON) | `https://unrlvl-context.vercel.app/ecosystem.json` |
| AGENDA | `https://unrlvl-context.vercel.app/AGENDA.md` |
| Skills INDEX | `https://unrlvl-context.vercel.app/skills/INDEX.md` |
| Protocolo | `https://unrlvl-context.vercel.app/protocols/SESSION_PROTOCOL.md` |
| GitHub Proxy | `https://unrlvl-context.vercel.app/api/gh` |
| NeuroneSCF log | `https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md` |
| SMA export | `https://unrlvl-social-media-agent.vercel.app/api/export?secret=[SECRET]` |
