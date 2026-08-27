# DEPLOY — pasos manuales

> 🟦 **Instrucciones para Sam.** CC no aplica DDL, no despliega y no toca la consola de Google.
> Lo que sigue es la secuencia completa, en orden de dependencia (brief §8).

---

## Paso 1 · Google Cloud (independiente del paso 3 — se puede hacer en paralelo)

Proyecto de Google Cloud **NUEVO y dedicado**. No reutilizar el de Vertex
(`gen-lang-client-0491381650`): el tope de 100 usuarios es **por proyecto y no se puede
resetear**, y mezclar pantallas de consentimiento de dos productos distintos ensucia las dos.

1. Crear el proyecto.
2. Habilitar la **Gmail API**.
3. Pantalla de consentimiento *External* → **publicar en Production**.
4. Crear OAuth Client ID (tipo *Web* o *Desktop*).
5. Consentir **una vez por cuenta de cliente**, atravesando el aviso de app no verificada.
6. Capturar el `refresh_token` de cada cuenta.

### Por qué Production sin verificar, y no Testing

Verificado contra la documentación de Google: *«Authorizations by a test user will expire seven
days from the time of consent.»* Con `gmail.readonly` (scope restringido) el refresh token **caduca
a los 7 días** en modo Testing. Un sistema que exige reconsentir cada buzón cada semana no es un
sistema.

| | Testing | **Production sin verificar** | Production verificado |
|---|---|---|---|
| Caducidad del refresh token | **7 días** 🔴 | Sin caducidad por este motivo ✅ | Sin caducidad |
| Tope de usuarios | 100 test users | **100 por vida del proyecto**, no reseteable | Sin tope |
| Evaluación CASA | No | **No** ✅ | Sí — semanas + coste anual |
| Pantalla al consentir | Normal | Aviso de «app no verificada» | Normal |

El tope de 100 es irrelevante: son un puñado de buzones. El aviso lo ve Sam, una vez por cuenta, y
lo atraviesa él mismo — es el titular de todas ellas.

---

## Paso 2 · Base de datos (`unrlvl-db`, amlvyycfepwhiindxgzw)

En orden:

1. Aplicar `db/migrations/001_mail_schema.sql`.
2. Aplicar `db/migrations/002_role_mail_mcp.sql`, **reemplazando `<<<MAIL_MCP_PASSWORD>>>`** por
   una contraseña generada. La contraseña no vuelve al repo.
3. Verificar que `mail` **NO** figure en *Settings → API → Exposed schemas*.
4. Correr las tres verificaciones que están comentadas al pie de `002_role_mail_mcp.sql` y pegar
   el resultado en el PR.

`003_drop_brand_oauth_tokens.sql` **no se aplica todavía**: va después del merge, en su propio PR,
y requiere el barrido de referencias descrito en su cabecera.

---

## Paso 3 · Código

CC: repo, MCP, adaptador `google_oauth`, tests, PR contra `main`. **CC no mergea y no despliega.**

---

## Paso 4 · Deploy y alta de buzones

1. Merge del PR.
2. Deploy en Vercel.
3. Cargar las variables de entorno:

```
MAIL_DB_URL                 ← cadena de conexión del rol mail_mcp (usar el pooler, puerto 6543)
MAIL_DB_CA_CERT             ← opcional: CA de Supabase, para validar la cadena TLS
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
```

4. Por cada buzón, en este orden:

```sql
-- a) Firmar el documento de autorización con el cliente
-- b) Subir el firmado a Supabase Storage y anotar la ruta
-- c) Guardar el refresh_token cifrado
select vault.create_secret(
  '<<<REFRESH_TOKEN>>>',
  'mail/<marca>/<direccion>',            -- nombre del secreto
  'refresh token de Gmail — buzón de cliente, solo lectura'
);                                        -- devuelve el uuid

-- d) Alta del buzón
insert into mail.mailboxes (brand_id, address, provider, credential_ref)
values ('<marca>', '<direccion>', 'google_oauth', '<uuid del paso c>');

-- e) La autorización — sin esta fila, resolve_credential no devuelve nada
insert into mail.authorizations (mailbox_id, holder_name, signed_at, document_path)
values (
  (select id from mail.mailboxes where brand_id = '<marca>' and lower(address) = lower('<direccion>')),
  '<nombre del titular>',
  '<YYYY-MM-DD>',
  '<ruta en Storage>'
);
```

5. Probar de punta a punta:

```bash
curl -s https://unrlvl-mail-mcp.vercel.app/api/mcp/mcp   # health

curl -s -X POST https://unrlvl-mail-mcp.vercel.app/api/mcp/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_brand_mailboxes","arguments":{}}}'
```

---

## Revocar un buzón

```sql
update mail.authorizations
   set revoked_at = now(), revoked_reason = '<motivo>'
 where mailbox_id = '<uuid>' and revoked_at is null;
```

Corta el acceso en la misma consulta: `mail.resolve_credential` deja de devolver token y las tools
fallan con `MAILBOX_NOT_AUTHORIZED`. No hay caché que purgar ni deploy que hacer. La fila **no se
borra** — la trazabilidad de quién autorizó qué se preserva.

---

## Reponer un buzón cuyo token murió

Los tres modos de muerte del refresh token (verificados en la documentación de OAuth 2.0 de
Google) llegan al MCP como `MAIL_TOKEN_REVOKED`:

| Causa | Efecto |
|---|---|
| **El titular cambia la contraseña de Gmail** | Google invalida los refresh token con scopes de Gmail |
| **Seis meses sin usarse** | El token muere |
| **El titular revoca el permiso** | El token muere — es la cláusula §7 del documento funcionando |

El primero es el más probable en operación: es rutina que alguien cambie su contraseña. Reponer =
repetir el consentimiento y actualizar el secreto en `vault`. Un `UPDATE`, sin PR:

```sql
select vault.update_secret(
  (select credential_ref from mail.mailboxes where id = '<uuid del buzón>'),
  '<<<NUEVO_REFRESH_TOKEN>>>'
);
```

---

## Vía alterna, documentada por si Google endurece

Si Google bloquea el scope restringido en apps sin verificar, la salida es un adaptador **IMAP con
contraseña de aplicación** — sin proyecto de Cloud, sin verificación, sin CASA. La columna
`provider` ya lo soporta: cuesta **un adaptador nuevo, no un rediseño**.

🟥 **Pero no es equivalente, y por eso es plan B y no plan A.** Una contraseña de aplicación da
acceso **completo** al buzón por IMAP —incluido borrar— y habilita SMTP para enviar. Con OAuth
`gmail.readonly`, «solo lectura» es una **capacidad**; con IMAP vuelve a ser **disciplina**.
Además, la cláusula §4 del documento de autorización —*«el Prestador no tiene la capacidad técnica
de enviar, responder, eliminar…»*— **es literalmente cierta bajo OAuth y dejaría de serlo bajo
IMAP**. Cambiar de vía obliga a reescribir el documento y a que los clientes vuelvan a firmar.
