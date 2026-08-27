/**
 * Mapa de adaptadores por `provider`.
 *
 * Vive en el CÓDIGO, no en un CHECK del esquema (brief §1, pregunta 4): el
 * precedente `iid_content_queue_angle_check` enumeró ocho ángulos en el
 * esquema, bloqueó el primer run diverso del 25-ago y fue eliminado (HRD-R12).
 * Acá la enumeración es explícita, fail-loud sobre lo desconocido, y meter un
 * proveedor nuevo cuesta un adaptador — no un rediseño ni una migración.
 *
 * Un cliente en Outlook o en un IMAP propio entra como fila con otro
 * `provider`, no como PR de esquema.
 */

import { MailError } from '../errors';
import { googleOAuthProvider } from './google_oauth';
import type { MailProvider } from './types';

const PROVIDERS: Record<string, MailProvider> = {
  google_oauth: googleOAuthProvider,
};

export function getProvider(provider: string): MailProvider {
  const adapter = PROVIDERS[provider];
  if (!adapter) {
    throw new MailError(
      'MAIL_PROVIDER_UNSUPPORTED',
      `${provider} — soportados: ${Object.keys(PROVIDERS).join(', ')}`,
    );
  }
  return adapter;
}

export function supportedProviders(): string[] {
  return Object.keys(PROVIDERS);
}
