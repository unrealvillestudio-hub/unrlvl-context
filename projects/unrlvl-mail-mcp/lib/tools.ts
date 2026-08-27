/**
 * Las tres tools — y nada más (brief §4).
 *
 * No existe ninguna tool de escritura. No enviar, no responder, no reenviar,
 * no borrar, no mover, no etiquetar, no marcar como leído. Esto no es
 * disciplina: es el alcance del permiso que el titular firmó.
 *
 * La lógica vive acá y no en el route handler para poder testearla sin red ni
 * base de datos: `ToolDeps` se inyecta.
 */

import { MailError } from './errors';
import { listAuthorizedMailboxes, resolveCredential, type Mailbox } from './db';
import { getProvider } from './providers';
import type { MailProvider, MessageFull, MessageSummary } from './providers/types';

export const DEFAULT_MAX_RESULTS = 20;
export const MAX_MAX_RESULTS = 100;

export interface ToolDeps {
  listAuthorizedMailboxes: (brandId?: string) => Promise<Mailbox[]>;
  resolveCredential: (mailboxId: string) => Promise<string>;
  getProvider: (provider: string) => MailProvider;
  fetchImpl?: typeof fetch;
}

export const defaultDeps: ToolDeps = {
  listAuthorizedMailboxes,
  resolveCredential,
  getProvider,
};

export interface MailboxListItem {
  mailbox_id: string;
  brand_id: string;
  address: string;
  provider: string;
}

export interface SearchResultItem extends MessageSummary {
  address: string;
}

export interface GetMessageResult extends MessageFull {
  address: string;
}

function requireString(args: Record<string, unknown>, key: string): string {
  const value = args[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Falta el argumento requerido: ${key}`);
  }
  return value;
}

function clampMaxResults(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return DEFAULT_MAX_RESULTS;
  return Math.max(1, Math.min(Math.trunc(value), MAX_MAX_RESULTS));
}

/**
 * Buzones de la marca con autorización viva. Nunca los revocados: el filtro
 * está en la consulta, no acá — un buzón revocado no llega a este código.
 */
export async function listBrandMailboxes(
  deps: ToolDeps,
  args: Record<string, unknown>,
): Promise<MailboxListItem[]> {
  const brandId = typeof args.brand_id === 'string' ? args.brand_id : undefined;
  return deps.listAuthorizedMailboxes(brandId);
}

/**
 * Resuelve los buzones sobre los que opera una llamada. Fail-loud si no hay
 * ninguno: un buzón sin autorización y una marca sin correo se ven igual desde
 * una lista vacía, y esa confusión ya costó caro (brief §9.2).
 */
async function targetMailboxes(
  deps: ToolDeps,
  brandId: string,
  address?: string,
): Promise<Mailbox[]> {
  const all = await deps.listAuthorizedMailboxes(brandId);

  const selected = address
    ? all.filter((m) => m.address.toLowerCase() === address.toLowerCase())
    : all;

  if (selected.length === 0) {
    throw new MailError(
      'MAILBOX_NOT_AUTHORIZED',
      address
        ? `${address} no es un buzón con autorización viva para ${brandId}`
        : `${brandId} no tiene buzones con autorización viva`,
    );
  }

  return selected;
}

function dateSortKey(value: string | null): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export async function searchMessages(
  deps: ToolDeps,
  args: Record<string, unknown>,
): Promise<SearchResultItem[]> {
  const brandId = requireString(args, 'brand_id');
  const query = requireString(args, 'query');
  const address = typeof args.address === 'string' ? args.address : undefined;
  const maxResults = clampMaxResults(args.max_results);

  const mailboxes = await targetMailboxes(deps, brandId, address);
  const results: SearchResultItem[] = [];

  for (const mailbox of mailboxes) {
    const provider = deps.getProvider(mailbox.provider);
    const credential = await deps.resolveCredential(mailbox.mailbox_id);

    const found = await provider.searchMessages(
      {
        mailbox_id: mailbox.mailbox_id,
        address: mailbox.address,
        credential,
        fetchImpl: deps.fetchImpl,
      },
      { query, maxResults },
    );

    for (const message of found) results.push({ ...message, address: mailbox.address });
  }

  results.sort((a, b) => dateSortKey(b.date) - dateSortKey(a.date));
  return results.slice(0, maxResults);
}

export async function getMessage(
  deps: ToolDeps,
  args: Record<string, unknown>,
): Promise<GetMessageResult> {
  const brandId = requireString(args, 'brand_id');
  const messageId = requireString(args, 'message_id');

  const mailboxes = await targetMailboxes(deps, brandId);

  for (const mailbox of mailboxes) {
    const provider = deps.getProvider(mailbox.provider);
    const credential = await deps.resolveCredential(mailbox.mailbox_id);

    // `FOLDER_NOT_ALLOWED` sube tal cual: un mensaje en papelera no es un
    // mensaje inexistente, y confundirlos es la degradación silenciosa que
    // §9.2 prohíbe.
    const message = await provider.getMessage(
      {
        mailbox_id: mailbox.mailbox_id,
        address: mailbox.address,
        credential,
        fetchImpl: deps.fetchImpl,
      },
      messageId,
    );

    if (message) return { ...message, address: mailbox.address };
  }

  throw new MailError(
    'MESSAGE_NOT_FOUND',
    `el mensaje no está en ningún buzón con autorización viva de ${brandId}`,
  );
}
