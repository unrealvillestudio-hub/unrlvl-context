# unrlvl-mail-mcp

MCP de correo de clientes de UNRLVL. **Solo lectura.**

Permite a Claude **leer** buzones de correo de clientes durante una sesión de chat con Sam, para
detectar y atender asuntos que competen a los servicios prestados.

**No es** un agente, no es un carril, no produce contenido, no notifica a nadie, no guarda nada.
La consulta se agota cuando Claude responde en el chat.

- **Endpoint MCP:** `https://unrlvl-mail-mcp.vercel.app/api/mcp/mcp`
- **Framework:** Next.js (App Router) en Vercel
- **Protocolo:** MCP 2024-11-05
- **Precedente de forma:** `unrlvl-meta-mcp`, `unrlvl-shopify-mcp`

---

## Las tres tools — y nada más

| Tool | Devuelve |
|---|---|
| `list_brand_mailboxes(brand_id?)` | Buzones **con autorización viva**. Nunca los revocados |
| `search_messages(brand_id, address?, query, max_results)` | Lista de mensajes: id, fecha, remitente, asunto, snippet, carpeta |
| `get_message(brand_id, message_id)` | Un mensaje completo |

**No existe ninguna tool de escritura.** No enviar, no responder, no reenviar, no borrar, no mover,
no etiquetar, no marcar como leído. Esto no es disciplina: es el alcance del permiso.

## Carpetas

`INBOX`, `SENT`, `SPAM`. **Papelera excluida.**

Constante en `lib/folders.ts`, con fail-loud sobre cualquier otra. No es columna: si todos los
clientes autorizan las mismas tres, una columna sería una enumeración de un solo valor. Ampliar lo
que se lee del correo ajeno debe costar un PR, no un `UPDATE`.

> 🔴 **Trampa de la API de Gmail, implementada explícitamente.** `includeSpamTrash` es **un solo
> booleano y cubre SPAM y TRASH a la vez**. No existe «spam sí, papelera no» a nivel de API. El
> adaptador pide `includeSpamTrash=true` y **descarta en código** todo mensaje cuyos `labelIds`
> incluyan `TRASH`. Una implementación ingenua trae la papelera y nadie lo nota. Dos tests
> obligatorios lo cubren (`tests/google_oauth.test.ts`).

## Códigos fail-loud

`MAILBOX_NOT_AUTHORIZED` · `MAIL_PROVIDER_UNSUPPORTED` · `FOLDER_NOT_ALLOWED` ·
`MAIL_CREDENTIAL_UNRESOLVED` · `MAIL_TOKEN_REVOKED` · `MESSAGE_NOT_FOUND`

Un token muerto **nunca degrada en silencio ni devuelve lista vacía**. Un buzón sin correo y un
buzón sin acceso se ven igual desde una lista vacía, y esa confusión ya costó caro en este
ecosistema.

---

## Arquitectura

```
Claude → MCP → /api/mcp/mcp
  → lib/db.ts        listAuthorizedMailboxes(brand_id?)   [rol mail_mcp, SELECT]
  → lib/db.ts        resolveCredential(mailbox_id)        [mail.resolve_credential, SECURITY DEFINER]
  → lib/providers/   getProvider(provider) → adaptador    [fail-loud si no está]
  → Gmail API        GET-only, includeSpamTrash + filtro de TRASH en código
```

### Aislamiento

El aislamiento **no lo da el cifrado**: lo da que este MCP **no use `service_role`**. Hoy
`service_role` la tienen ~15 Edge Functions; si las credenciales de buzón fueran legibles con esa
clave, el radio de daño sería todo el carril.

| Control | Implementación |
|---|---|
| Schema propio | `mail` — nada en `public` ni en `intel` |
| Fuera de la API REST | `mail` **NO** se agrega a *Exposed schemas* |
| Sin acceso de los roles del ecosistema | `REVOKE ALL ON SCHEMA mail FROM anon, authenticated, service_role` |
| Rol dedicado | `mail_mcp` — `USAGE` en `mail`, `SELECT` en dos tablas, `EXECUTE` en una función |
| Token cifrado | `vault`. La tabla guarda un `uuid`, nunca el token |
| Segunda pieza fuera de la DB | El `client_secret` de OAuth vive **sólo** en el entorno de Vercel |
| RLS | `ENABLE ROW LEVEL SECURITY` sin políticas (defensa redundante, gratis) |

**Límite honesto, declarado:** esto aísla del *plano de aplicación*, no del titular del proyecto.
El rol `postgres` y el editor SQL del panel de Supabase siguen alcanzando `mail`.

### La autorización es una compuerta, no un archivo

`mail.resolve_credential(mailbox_id)` es el **único** camino al token, y verifica antes de
devolverlo que el buzón esté activo **y** tenga una fila en `mail.authorizations` con
`revoked_at IS NULL`. Revocar una autorización corta el acceso en la misma consulta: no hay caché
que purgar ni deploy que hacer.

---

## Multimarca

Meter una marca es un `INSERT` en `mail.mailboxes`. Ningún `brand_id` aparece en el código. Un
cliente en Outlook o en un IMAP propio entra como fila con otro `provider` — cuesta un adaptador
nuevo en `lib/providers/`, no un rediseño ni una migración: `provider` va **sin `CHECK`** a
propósito.

Ver el test de la marca N+1 respondido en `docs/DEPLOY.md` y en el cuerpo del PR de creación.

---

## Variables de entorno (Vercel)

```
MAIL_DB_URL                   ← cadena de conexión del rol mail_mcp (pooler de Supabase)
MAIL_DB_CA_CERT               ← opcional: CA de Supabase para validar la cadena TLS
GOOGLE_OAUTH_CLIENT_ID        ← app OAuth del proyecto de Google Cloud dedicado
GOOGLE_OAUTH_CLIENT_SECRET    ← segunda pieza fuera de la DB: un refresh token sin él no sirve
```

Ninguna de las cuatro va al repo, nunca (`CC_PROTOCOL` §3).

---

## Desarrollo

```bash
npm install
npm run typecheck    # tsc --noEmit
npm test             # 29 tests, sin red ni base de datos
npm run build        # next build
npm run dev
```

Los tests no tocan red ni DB: el `fetch` y las dependencias de base se inyectan
(`tests/helpers.ts`, `ToolDeps`).

---

## Migraciones

`db/migrations/` — **las aplica Sam, no CC** (`CC_PROTOCOL` §1, brief §8 paso 2).

| Archivo | Cuándo |
|---|---|
| `001_mail_schema.sql` | Antes del deploy |
| `002_role_mail_mcp.sql` | Después de 001. Lleva placeholder de contraseña |
| `003_drop_brand_oauth_tokens.sql` | ⛔ Después del merge, en su propio PR. Requiere barrido previo |

Alta de un buzón (por cada cliente): firmar el documento → subir el firmado a Storage →
`vault.create_secret(refresh_token)` → `INSERT` en `mail.mailboxes` → `INSERT` en
`mail.authorizations`. Ver `docs/DEPLOY.md`.
