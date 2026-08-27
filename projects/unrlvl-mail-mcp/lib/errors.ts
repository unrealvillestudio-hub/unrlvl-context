/**
 * Códigos fail-loud del MCP de correo.
 *
 * Regla dura (brief §9.2): un token muerto NUNCA degrada en silencio ni
 * devuelve lista vacía. Un buzón sin correo y un buzón sin acceso se ven igual
 * desde una lista vacía, y esa confusión ya costó caro en este ecosistema
 * (`build_all`, `LAB-AUDIENCE-BRIEF`). Siempre el código nominal.
 */

export const MAIL_ERROR_CODES = [
  'MAILBOX_NOT_AUTHORIZED',
  'MAIL_PROVIDER_UNSUPPORTED',
  'FOLDER_NOT_ALLOWED',
  'MAIL_CREDENTIAL_UNRESOLVED',
  'MAIL_TOKEN_REVOKED',
  // Añadido a los cinco del brief §6. Motivo: el caso «el mensaje no está en
  // ningún buzón autorizado de la marca» tenía como únicas salidas devolver
  // null o una lista vacía — exactamente la degradación silenciosa que §9.2
  // prohíbe. Declarado en el cuerpo del PR.
  'MESSAGE_NOT_FOUND',
] as const;

export type MailErrorCode = (typeof MAIL_ERROR_CODES)[number];

export class MailError extends Error {
  readonly code: MailErrorCode;

  constructor(code: MailErrorCode, detail?: string) {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'MailError';
    this.code = code;
  }
}

export function isMailError(err: unknown): err is MailError {
  return err instanceof MailError;
}

/**
 * `mail.resolve_credential` levanta sus errores con RAISE EXCEPTION y el
 * código nominal como mensaje. Postgres lo entrega prefijado; se reconoce por
 * contenido, no por posición.
 */
export function fromPostgres(err: unknown): MailError {
  const message = err instanceof Error ? err.message : String(err);
  for (const code of MAIL_ERROR_CODES) {
    if (message.includes(code)) return new MailError(code);
  }
  throw err;
}
