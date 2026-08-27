/**
 * Carpetas legibles: INBOX, SENT, SPAM. Papelera EXCLUIDA.
 *
 * Constante en el código, no columna (brief §5): si todos los clientes
 * autorizan las mismas tres, una columna sería una enumeración de un solo
 * valor. Ampliar lo que se lee del correo ajeno debe costar un PR, no un
 * UPDATE.
 *
 * Multimarca: esto es EJE, no instancia. Ninguna marca tiene «sus» carpetas;
 * el permiso que el titular firma es el mismo para todas.
 */

import { MailError } from './errors';

export const ALLOWED_FOLDERS = ['INBOX', 'SENT', 'SPAM'] as const;

export type Folder = (typeof ALLOWED_FOLDERS)[number];

export function isAllowedFolder(value: string): value is Folder {
  return (ALLOWED_FOLDERS as readonly string[]).includes(value);
}

/** Fail-loud sobre cualquier carpeta fuera de las tres. */
export function assertAllowedFolder(value: string): Folder {
  if (!isAllowedFolder(value)) {
    throw new MailError(
      'FOLDER_NOT_ALLOWED',
      `${value} — permitidas: ${ALLOWED_FOLDERS.join(', ')}`,
    );
  }
  return value;
}
