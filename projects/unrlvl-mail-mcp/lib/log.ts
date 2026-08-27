/**
 * Logging del MCP.
 *
 * Los logs de funciones de Vercel son un registro persistente. Loguear un
 * asunto «para depurar» viola por la puerta de atrás la regla de cero
 * persistencia de contenido (brief §6, reglas 2 y 3).
 *
 * Se loguea: tool, mailbox_id, código de error y latencia. NUNCA contenido:
 * ni cuerpo, ni asunto, ni remitente, ni destinatario, ni adjunto, ni
 * message_id, ni la cadena de búsqueda (una query es contenido del buzón por
 * inferencia: `query="factura Acme"` en un log dice qué hay en ese buzón).
 */

export interface OpLog {
  tool: string;
  mailbox_id?: string;
  code?: string;
  ms: number;
  count?: number;
}

export function logOp(entry: OpLog): void {
  console.log(
    JSON.stringify({
      at: 'unrlvl-mail-mcp',
      tool: entry.tool,
      mailbox_id: entry.mailbox_id ?? null,
      code: entry.code ?? 'OK',
      ms: entry.ms,
      count: entry.count ?? null,
    }),
  );
}
