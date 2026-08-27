/**
 * Adaptador `google_oauth` — Gmail API, SOLO LECTURA (scope gmail.readonly).
 *
 * 🔴 TRAMPA DE LA API DE GMAIL, implementada explícitamente (brief §5):
 * `includeSpamTrash` es UN SOLO BOOLEANO y cubre SPAM y TRASH a la vez. No
 * existe «spam sí, papelera no» a nivel de API. Este adaptador pide
 * `includeSpamTrash=true` y DESCARTA EN CÓDIGO todo mensaje cuyos `labelIds`
 * incluyan TRASH. Una implementación ingenua trae la papelera y nadie lo nota.
 *
 * El filtro autoritativo es `classifyFolder`, sobre los `labelIds` que
 * devuelve la API — no la cadena de búsqueda. La cadena es una optimización
 * (menos mensajes que traer); el código es la garantía.
 */

import { MailError } from '../errors';
import { ALLOWED_FOLDERS, type Folder } from '../folders';
import type {
  MailProvider,
  MailboxSession,
  MessageFull,
  MessageSummary,
  SearchOptions,
} from './types';

const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

/** Etiqueta de Gmail que excluye el mensaje pase lo que pase. */
const EXCLUDED_LABELS = ['TRASH', 'DRAFT', 'CHAT'] as const;

interface GmailMessage {
  id: string;
  labelIds?: string[];
  snippet?: string;
  payload?: GmailPart;
}

interface GmailPart {
  mimeType?: string;
  filename?: string;
  headers?: { name: string; value: string }[];
  body?: { data?: string; size?: number };
  parts?: GmailPart[];
}

// ── Funciones puras (testeadas sin red ni DB) ────────────────────────────────

/**
 * Traduce los `labelIds` de Gmail a una de las tres carpetas legibles.
 * Devuelve `null` si el mensaje NO es legible — y la exclusión gana siempre:
 * un mensaje en papelera que conserve la etiqueta INBOX sigue siendo papelera.
 */
export function classifyFolder(labelIds: string[] | undefined): Folder | null {
  const labels = labelIds ?? [];

  for (const excluded of EXCLUDED_LABELS) {
    if (labels.includes(excluded)) return null;
  }

  // El orden aquí solo desempata mensajes con varias etiquetas de carpeta;
  // ninguna de las tres es «más» permitida que otra.
  for (const folder of ALLOWED_FOLDERS) {
    if (labels.includes(folder)) return folder;
  }

  // Archivado, o solo con etiquetas de usuario: fuera de las tres carpetas
  // que el titular autorizó. No se lee.
  return null;
}

/**
 * Query de Gmail. Restringe a las tres carpetas y excluye papelera de forma
 * explícita, además del filtro por labelIds. `{a b}` es OR en la sintaxis de
 * búsqueda de Gmail.
 */
export function buildSearchQuery(userQuery: string): string {
  const folderScope = `{${ALLOWED_FOLDERS.map((f) => `in:${f.toLowerCase()}`).join(' ')}}`;
  const parts = [userQuery.trim(), folderScope, '-in:trash', '-in:chats'].filter(Boolean);
  return parts.join(' ');
}

export function headerValue(part: GmailPart | undefined, name: string): string | null {
  const headers = part?.headers ?? [];
  const found = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
  return found ? found.value : null;
}

export function decodeBase64Url(data: string): string {
  return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}

/** Prefiere text/plain; cae a text/html solo si no hay texto plano. */
export function extractBodyText(payload: GmailPart | undefined): string | null {
  if (!payload) return null;

  const collect = (part: GmailPart, mime: string): string | null => {
    if (part.mimeType === mime && part.body?.data) return decodeBase64Url(part.body.data);
    for (const child of part.parts ?? []) {
      const found = collect(child, mime);
      if (found) return found;
    }
    return null;
  };

  return collect(payload, 'text/plain') ?? collect(payload, 'text/html');
}

export function extractAttachmentNames(payload: GmailPart | undefined): string[] {
  const names: string[] = [];
  const walk = (part: GmailPart): void => {
    if (part.filename) names.push(part.filename);
    for (const child of part.parts ?? []) walk(child);
  };
  if (payload) walk(payload);
  return names;
}

export function toSummary(message: GmailMessage): MessageSummary | null {
  const folder = classifyFolder(message.labelIds);
  if (!folder) return null;

  return {
    message_id: message.id,
    date: headerValue(message.payload, 'Date'),
    from: headerValue(message.payload, 'From'),
    subject: headerValue(message.payload, 'Subject'),
    snippet: message.snippet ?? null,
    folder,
  };
}

// ── Red ──────────────────────────────────────────────────────────────────────

interface TokenCacheEntry {
  accessToken: string;
  expiresAt: number;
}

/**
 * Caché de access tokens en memoria del proceso. NO es persistencia de
 * contenido (brief §6, regla 2): no guarda nada del buzón, solo la credencial
 * de corta vida, y muere con la instancia. Mismo patrón que el
 * `_pageTokenCache` de `unrlvl-meta-mcp`.
 */
const accessTokenCache = new Map<string, TokenCacheEntry>();

export async function getAccessToken(
  session: MailboxSession,
  now: number = Date.now(),
): Promise<string> {
  const cached = accessTokenCache.get(session.mailbox_id);
  if (cached && cached.expiresAt > now + 30_000) return cached.accessToken;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new MailError(
      'MAIL_CREDENTIAL_UNRESOLVED',
      'GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET no están en el entorno',
    );
  }

  const doFetch = session.fetchImpl ?? fetch;
  const res = await doFetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: session.credential,
      grant_type: 'refresh_token',
    }).toString(),
  });

  const body = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !body.access_token) {
    // Los tres modos de muerte del refresh token (brief §9.2) —cambio de
    // contraseña del titular, seis meses sin uso, revocación del permiso—
    // llegan como `invalid_grant`. Ninguno degrada en silencio.
    if (body.error === 'invalid_grant') {
      throw new MailError(
        'MAIL_TOKEN_REVOKED',
        'el refresh token ya no es válido (cambio de contraseña, seis meses sin uso, o permiso revocado). Sam debe repetir el consentimiento y actualizar el secreto en vault.',
      );
    }
    throw new MailError(
      'MAIL_CREDENTIAL_UNRESOLVED',
      `Google devolvió ${res.status}${body.error ? ` (${body.error})` : ''}`,
    );
  }

  const expiresAt = now + (body.expires_in ?? 3600) * 1000;
  accessTokenCache.set(session.mailbox_id, { accessToken: body.access_token, expiresAt });
  return body.access_token;
}

async function gmailGet(
  session: MailboxSession,
  path: string,
  params: Record<string, string | string[]>,
): Promise<{ status: number; body: unknown }> {
  const accessToken = await getAccessToken(session);
  const url = new URL(`${GMAIL_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) value.forEach((v) => url.searchParams.append(key, v));
    else url.searchParams.set(key, value);
  }

  const doFetch = session.fetchImpl ?? fetch;
  const res = await doFetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401 || res.status === 403) {
    // El access token se obtuvo hace un instante: un 401/403 acá es permiso
    // retirado del lado de Google, no un token vencido.
    accessTokenCache.delete(session.mailbox_id);
    throw new MailError(
      'MAIL_TOKEN_REVOKED',
      `Gmail devolvió ${res.status} para el buzón ${session.mailbox_id}`,
    );
  }

  const body: unknown = res.status === 204 ? null : await res.json();
  return { status: res.status, body };
}

// ── Adaptador ────────────────────────────────────────────────────────────────

export const googleOAuthProvider: MailProvider = {
  name: 'google_oauth',

  async searchMessages(session, { query, maxResults }): Promise<MessageSummary[]> {
    const { body } = await gmailGet(session, '/messages', {
      q: buildSearchQuery(query),
      // Se pide de más porque el filtro de carpeta es posterior: la API no
      // sabe descartar papelera sin descartar también spam.
      maxResults: String(Math.min(maxResults * 2, 200)),
      includeSpamTrash: 'true',
    });

    const ids = ((body as { messages?: { id: string }[] })?.messages ?? []).map((m) => m.id);
    const summaries: MessageSummary[] = [];

    for (const id of ids) {
      if (summaries.length >= maxResults) break;

      const { status, body: raw } = await gmailGet(session, `/messages/${id}`, {
        format: 'metadata',
        metadataHeaders: ['From', 'Subject', 'Date'],
      });
      if (status === 404) continue;

      const summary = toSummary(raw as GmailMessage);
      if (summary) summaries.push(summary);
    }

    return summaries;
  },

  async getMessage(session, messageId): Promise<MessageFull | null> {
    const { status, body } = await gmailGet(session, `/messages/${messageId}`, {
      format: 'full',
    });
    if (status === 404) return null;

    const message = body as GmailMessage;
    const summary = toSummary(message);
    if (!summary) {
      // El mensaje existe pero está fuera de las tres carpetas — papelera,
      // borrador o archivado. Fail-loud: no se devuelve como «no encontrado».
      throw new MailError(
        'FOLDER_NOT_ALLOWED',
        'el mensaje está fuera de INBOX / SENT / SPAM (papelera, borrador o archivado)',
      );
    }

    return {
      ...summary,
      to: headerValue(message.payload, 'To'),
      cc: headerValue(message.payload, 'Cc'),
      body_text: extractBodyText(message.payload),
      attachment_names: extractAttachmentNames(message.payload),
    };
  },
};
