import type { Folder } from '../folders';

/** Un buzón resuelto + su credencial viva. Se arma por llamada y muere con ella. */
export interface MailboxSession {
  mailbox_id: string;
  address: string;
  credential: string;
  /** Inyectable para los tests; en runtime es el `fetch` global. */
  fetchImpl?: typeof fetch;
}

export interface MessageSummary {
  message_id: string;
  date: string | null;
  from: string | null;
  subject: string | null;
  snippet: string | null;
  folder: Folder;
}

export interface MessageFull extends MessageSummary {
  to: string | null;
  cc: string | null;
  body_text: string | null;
  attachment_names: string[];
}

export interface SearchOptions {
  query: string;
  maxResults: number;
}

/**
 * Un adaptador de proveedor. SOLO LECTURA — no hay método de envío,
 * respuesta, borrado, movimiento ni etiquetado, y no se agrega ninguno
 * (brief §6, regla 1). Esto no es disciplina: es el alcance del permiso.
 */
export interface MailProvider {
  readonly name: string;
  searchMessages(session: MailboxSession, options: SearchOptions): Promise<MessageSummary[]>;
  /** `null` si el mensaje no existe en ESE buzón; el caller decide qué hacer. */
  getMessage(session: MailboxSession, messageId: string): Promise<MessageFull | null>;
}
