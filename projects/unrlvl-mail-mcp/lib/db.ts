/**
 * Acceso a `mail` con el rol dedicado `mail_mcp`.
 *
 * El aislamiento no lo da el cifrado: lo da que este MCP NO use
 * `service_role` (brief §2). Por eso acá no hay cliente de Supabase: hay una
 * conexión Postgres con la cadena del rol `mail_mcp`, que solo tiene SELECT
 * sobre dos tablas y EXECUTE sobre una función.
 *
 * El `client_secret` de OAuth vive SOLO en el entorno de Vercel — segunda
 * pieza fuera de la DB: un token sin él no sirve.
 */

import { Pool } from 'pg';
import { MailError, fromPostgres } from './errors';

export interface Mailbox {
  mailbox_id: string;
  brand_id: string;
  address: string;
  provider: string;
}

let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.MAIL_DB_URL;
  if (!connectionString) {
    throw new Error('MAIL_DB_URL no está seteada (cadena de conexión del rol mail_mcp).');
  }

  // `max: 1` — en serverless cada instancia es efímera y el pooler de Supabase
  // es quien agrupa. Abrir más conexiones por instancia agota el pooler sin
  // ganar nada.
  const ca = process.env.MAIL_DB_CA_CERT;
  pool = new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    // Si se provee el CA de Supabase, se valida la cadena. Si no, se cifra
    // igual pero sin validar el emisor — que es lo que hace el pooler por
    // defecto. Preferir el CA cuando esté disponible.
    ssl: ca ? { ca } : { rejectUnauthorized: false },
  });

  return pool;
}

/**
 * Buzones CON AUTORIZACIÓN VIVA. Los revocados no salen nunca — no es un
 * filtro de presentación, es la definición de qué se puede leer.
 * `brandId` opcional: sin él, lista todos los buzones autorizados.
 */
export async function listAuthorizedMailboxes(brandId?: string): Promise<Mailbox[]> {
  const { rows } = await getPool().query<Mailbox>(
    `SELECT m.id AS mailbox_id, m.brand_id, m.address, m.provider
       FROM mail.mailboxes m
      WHERE m.active
        AND ($1::text IS NULL OR m.brand_id = $1)
        AND EXISTS (SELECT 1
                      FROM mail.authorizations a
                     WHERE a.mailbox_id = m.id
                       AND a.revoked_at IS NULL)
      ORDER BY m.brand_id, m.address`,
    [brandId ?? null],
  );
  return rows;
}

/**
 * Único camino al token. La función en la DB verifica autorización viva antes
 * de devolverlo; acá solo se traduce el fail-loud.
 * `credential_ref` no se selecciona nunca desde el código: la tabla guarda un
 * uuid y el token no pasa por ninguna otra consulta.
 */
export async function resolveCredential(mailboxId: string): Promise<string> {
  try {
    const { rows } = await getPool().query<{ secret: string }>(
      'SELECT mail.resolve_credential($1::uuid) AS secret',
      [mailboxId],
    );
    const secret = rows[0]?.secret;
    if (!secret) throw new MailError('MAIL_CREDENTIAL_UNRESOLVED', mailboxId);
    return secret;
  } catch (err) {
    if (err instanceof MailError) throw err;
    throw fromPostgres(err);
  }
}
