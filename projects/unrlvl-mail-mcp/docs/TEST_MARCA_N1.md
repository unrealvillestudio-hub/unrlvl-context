# Test de la marca N+1 — respondido

`MULTIBRAND_RULE.md` §2. Se responde antes de escribir la primera línea, y las respuestas se
escriben: no se piensan y se siguen.

**1. ¿Sobrevive a que entre otra marca de otro rubro y otro país?**
Sí. La marca entra con un `INSERT` en `mail.mailboxes`. Ningún `brand_id` aparece en el código —
verificado con el barrido de `MULTIBRAND_RULE.md` §7.2 paso 4 sobre el diff. Un cliente en Outlook
o en un IMAP propio entra como fila con otro `provider`, no como PR.

**2. ¿El nombre describe la FUNCIÓN o el CASO?**
Función. El repo se llama `unrlvl-mail-mcp`, **no `gmail-mcp`**: Gmail es el proveedor de hoy, que
es instancia. El schema es `mail`, las tablas `mailboxes` y `authorizations`, el adaptador
`google_oauth` (nombrado por el mecanismo de credencial, no por la marca del proveedor).

**3. ¿Esto es eje o es instancia?**
Eje (código): que el sistema resuelva un buzón y su credencial por `brand_id` en runtime, y que
sólo opere sobre buzones con autorización viva. Las tres carpetas legibles también son eje: el
permiso que el titular firma es el mismo para todas las marcas.
Instancia (dato): la dirección, el proveedor, el token, el documento firmado.

**4. ¿Cuántas marcas hay hoy en esta enumeración?**
Cero marcas. Y **cero proveedores enumerados en el esquema**: `provider` va **SIN `CHECK`**.
Precedente directo: `iid_content_queue_angle_check` enumeró ocho ángulos en el esquema, bloqueó el
primer run diverso del 25-ago y fue eliminado (HRD-R12). El mapa de adaptadores vive en
`lib/providers/index.ts`, explícito y con fail-loud `MAIL_PROVIDER_UNSUPPORTED` sobre lo
desconocido — que es lo que §6 permite y prefiere.

**5. (§13) ¿Quién más lee este eje, y en qué vocabulario?**
Nadie. Consumidor único: este MCP. Schema nuevo, cero consumidores previos, cero alias legacy.

---

## Ejes nuevos introducidos

| Eje | Dónde |
|---|---|
| schema `mail` | `db/migrations/001_mail_schema.sql` |
| `mail.mailboxes` | idem |
| `mail.authorizations` | idem |
| `mail.resolve_credential(uuid)` | idem |
| rol `mail_mcp` | `db/migrations/002_role_mail_mcp.sql` |

**Alias legacy conservados:** ninguno.
