# CLAUDE.md — unrlvl-mail-mcp
_Contexto persistente para Claude Code. No editar manualmente._

---

## ⚠️ GOBERNANZA CC — NIVEL ESTÁNDAR + CORRESPONDENCIA DE TERCEROS (leer ANTES de tocar nada)

Antes de cualquier acción en este repositorio, Claude Code DEBE cargar y obedecer el protocolo
central: **`unrlvl-context/protocols/CC_PROTOCOL.md`**.

**La fuente canónica es el repo `unrealvillestudio-hub/unrlvl-context`. Vercel es respaldo.**
Orden de carga (`CC_PROTOCOL.md` §0 bis): **(1)** el repo — working tree, o `api.github.com` /
`raw.githubusercontent.com`; **(2)** `https://unrlvl-context.vercel.app/protocols/CC_PROTOCOL.md`,
**sólo si el repo no está disponible**, y declarándolo. El proxy de egreso de CC devuelve **403 en
CONNECT** contra el dominio de Vercel: apuntar sólo ahí deja a CC sin gobernanza.

**Este repo lee correspondencia de clientes. Reglas reforzadas:**

1. **Solo lectura, sin excepción.** Ninguna tool de escritura, nunca. Un PR que agregue una se
   rechaza sin discusión. Ver `.github/CLAUDE.md` para las cinco reglas duras completas.
2. **NUNCA commitear secretos.** `MAIL_DB_URL`, la contraseña de `mail_mcp`, el
   `GOOGLE_OAUTH_CLIENT_SECRET` y cualquier refresh token viven en env vars de Vercel y en
   `vault`. En el repo se los nombra, nunca se los escribe.
3. **PUSH:** este repo → branch + PR, nunca merge propio. `unrlvl-context` → CC publica la rama de
   PR, nunca pushea a `main` ni mergea. CC limpia sus worktrees al cerrar un PR.
4. **VERIFICAR ANTES DE ACTUAR:** mensaje corto a Sam con objetivo, pasos, archivos y repos
   afectados antes de cualquier escritura/commit/deploy. Reportar al final con el formato de
   `CC_PROTOCOL` §4 (incluidas PRESERVACIÓN DE CONTEXTO, WORKTREES y MULTIMARCA).

Ante cualquier duda → preguntar a Sam, no asumir.

---

## Qué es este repo

MCP que permite a Claude **leer** buzones de correo de clientes de UNRLVL durante una sesión de
chat con Sam, para detectar y atender asuntos que competen a los servicios prestados.

**No es** un agente, no es un carril, no produce contenido, no notifica a nadie, no guarda nada.
La consulta se agota cuando Claude responde en el chat.

**Endpoint MCP:** `https://unrlvl-mail-mcp.vercel.app/api/mcp/mcp`
**Framework:** Next.js (App Router) en Vercel · **Protocolo:** MCP 2024-11-05
**Precedente de forma:** `unrlvl-meta-mcp`, `unrlvl-shopify-mcp`

---

## Scope de tools (3) — extraídas de `lib/tools.ts`

- `list_brand_mailboxes(brand_id?)` — buzones con autorización viva. Nunca los revocados.
- `search_messages(brand_id, address?, query, max_results)` — id, fecha, remitente, asunto,
  snippet, carpeta.
- `get_message(brand_id, message_id)` — un mensaje completo.

**No hay una cuarta.** Y las que hay no escriben.

---

## Arquitectura (del código)

```
Claude → MCP → app/api/mcp/[transport]/route.ts
  → lib/tools.ts       las tres tools, con ToolDeps inyectable (por eso se testean sin red)
  → lib/db.ts          Pool de `pg` con la cadena del rol mail_mcp (NO service_role)
  → mail.resolve_credential(uuid)   SECURITY DEFINER — único camino al token
  → lib/providers/index.ts          mapa de adaptadores, fail-loud sobre lo desconocido
  → lib/providers/google_oauth.ts   Gmail API, GET-only
```

- **Credenciales:** schema `mail` en Supabase `amlvyycfepwhiindxgzw`. `mail.mailboxes` guarda un
  `credential_ref uuid` que apunta a `vault`; el token nunca está en la tabla.
- **DETALLE CRÍTICO (del código):** `includeSpamTrash` de Gmail es **un solo booleano** que cubre
  SPAM y TRASH. `lib/providers/google_oauth.ts` lo pide en `true` y descarta TRASH en
  `classifyFolder`. **No «simplificar» ese filtro**: sin él, la papelera entra sin que nadie lo
  note. Dos tests obligatorios lo cubren.
- **`provider` no tiene `CHECK` en la DB** — a propósito. El mapa de adaptadores vive en
  `lib/providers/index.ts`. Precedente: `iid_content_queue_angle_check` enumeró ocho ángulos en el
  esquema, bloqueó el primer run diverso del 25-ago y fue eliminado (HRD-R12).

---

## Variables de entorno (Vercel)

```
MAIL_DB_URL                 ← cadena de conexión del rol mail_mcp (pooler de Supabase)
MAIL_DB_CA_CERT             ← opcional: CA para validar la cadena TLS
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET  ← segunda pieza fuera de la DB
```

---

## Multimarca

Cada tool acepta `brand_id`. Añadir marca = `INSERT` en `mail.mailboxes` + `INSERT` en
`mail.authorizations`. Ningún `brand_id` aparece en el código. Otro proveedor = un adaptador nuevo
en `lib/providers/`, no un rediseño.

---

## Estructura del repo

```
app/api/mcp/[transport]/route.ts  ← handler MCP (3 tools, JSON-RPC)
lib/tools.ts                      ← las tres tools, con deps inyectables
lib/db.ts                         ← rol mail_mcp: SELECT + resolve_credential
lib/folders.ts                    ← INBOX/SENT/SPAM, papelera excluida
lib/errors.ts                     ← códigos fail-loud
lib/log.ts                        ← logging sin contenido
lib/providers/                    ← mapa de adaptadores + google_oauth
db/migrations/                    ← DDL — las aplica Sam, no CC
tests/                            ← 29 tests, sin red ni DB
docs/DEPLOY.md                    ← pasos manuales de Sam (Google Cloud, env, alta de buzón)
```

---

## Reglas de trabajo (del código)

1. **El filtro de papelera está en el código, no en la query.** La cadena de búsqueda es una
   optimización; `classifyFolder` es la garantía. No invertir esa relación.
2. **`ToolDeps` existe para testear sin red.** Cualquier lógica nueva entra por ahí, no con un
   import directo dentro del handler.
3. **`credential_ref` no se selecciona desde el código.** El único camino al token es
   `mail.resolve_credential`.
4. **El logging no toma contenido** — la cadena de búsqueda incluida. `lib/log.ts` tiene un test
   que impide agregarle campos de mensaje.

---

## Conexión con el ecosistema

- **Consumido por:** Claude.ai (connector de correo), en sesión de chat con Sam.
- **Lee de:** schema `mail` en Supabase (rol `mail_mcp`), y la API del proveedor de cada buzón.
- **Escribe en:** nada. En ningún lado.
- **Professor:** captura método y decisiones. **Nunca** contenido de buzón.
