import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

import { MailError } from '../lib/errors';
import { getProvider, supportedProviders } from '../lib/providers';
import { getMessage, listBrandMailboxes, searchMessages, type ToolDeps } from '../lib/tools';
import type { Mailbox } from '../lib/db';
import type { MailProvider } from '../lib/providers/types';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));

// ── Dobles ───────────────────────────────────────────────────────────────────

function stubProvider(overrides: Partial<MailProvider> = {}): MailProvider {
  return {
    name: 'stub',
    async searchMessages() {
      return [];
    },
    async getMessage() {
      return null;
    },
    ...overrides,
  };
}

function stubDeps(mailboxes: Mailbox[], provider: MailProvider = stubProvider()): ToolDeps {
  return {
    listAuthorizedMailboxes: async (brandId?: string) =>
      brandId ? mailboxes.filter((m) => m.brand_id === brandId) : mailboxes,
    resolveCredential: async () => 'refresh-token',
    getProvider: () => provider,
  };
}

const MAILBOX: Mailbox = {
  mailbox_id: 'mb-1',
  brand_id: 'MarcaCualquiera',
  address: 'contacto@ejemplo.com',
  provider: 'google_oauth',
};

// ── list_brand_mailboxes ─────────────────────────────────────────────────────

test('list_brand_mailboxes filtra por marca y no expone credential_ref', async () => {
  const otra: Mailbox = { ...MAILBOX, mailbox_id: 'mb-2', brand_id: 'OtraMarca' };
  const result = await listBrandMailboxes(stubDeps([MAILBOX, otra]), { brand_id: 'OtraMarca' });

  assert.deepEqual(result, [otra]);
  assert.equal(Object.keys(result[0]).includes('credential_ref'), false);
});

test('list_brand_mailboxes sin brand_id devuelve todos los autorizados', async () => {
  const result = await listBrandMailboxes(stubDeps([MAILBOX]), {});
  assert.equal(result.length, 1);
});

// ── Fail-loud, nunca lista vacía (brief §9.2) ────────────────────────────────

test('una marca sin buzones autorizados falla con MAILBOX_NOT_AUTHORIZED', async () => {
  await assert.rejects(
    searchMessages(stubDeps([]), { brand_id: 'MarcaSinBuzon', query: 'factura' }),
    (err: unknown) => err instanceof MailError && err.code === 'MAILBOX_NOT_AUTHORIZED',
  );
});

test('una dirección que no está autorizada falla, no devuelve vacío', async () => {
  await assert.rejects(
    searchMessages(stubDeps([MAILBOX]), {
      brand_id: 'MarcaCualquiera',
      address: 'otro@ejemplo.com',
      query: 'factura',
    }),
    (err: unknown) => err instanceof MailError && err.code === 'MAILBOX_NOT_AUTHORIZED',
  );
});

test('un mensaje que no está en ningún buzón autorizado falla con MESSAGE_NOT_FOUND', async () => {
  await assert.rejects(
    getMessage(stubDeps([MAILBOX]), { brand_id: 'MarcaCualquiera', message_id: 'no-existe' }),
    (err: unknown) => err instanceof MailError && err.code === 'MESSAGE_NOT_FOUND',
  );
});

test('FOLDER_NOT_ALLOWED sube sin convertirse en «no encontrado»', async () => {
  const provider = stubProvider({
    async getMessage() {
      throw new MailError('FOLDER_NOT_ALLOWED', 'papelera');
    },
  });

  await assert.rejects(
    getMessage(stubDeps([MAILBOX], provider), { brand_id: 'MarcaCualquiera', message_id: 'x' }),
    (err: unknown) => err instanceof MailError && err.code === 'FOLDER_NOT_ALLOWED',
  );
});

// ── Multimarca ───────────────────────────────────────────────────────────────

test('un proveedor desconocido falla fuerte en vez de improvisar', () => {
  assert.throws(
    () => getProvider('carrier_pigeon'),
    (err: unknown) => err instanceof MailError && err.code === 'MAIL_PROVIDER_UNSUPPORTED',
  );
});

test('el mapa de proveedores vive en el código y hoy tiene google_oauth', () => {
  assert.deepEqual(supportedProviders(), ['google_oauth']);
  assert.equal(getProvider('google_oauth').name, 'google_oauth');
});

test('search_messages recorre TODOS los buzones autorizados de la marca', async () => {
  const visitados: string[] = [];
  const provider = stubProvider({
    async searchMessages(session) {
      visitados.push(session.mailbox_id);
      return [
        {
          message_id: `m-${session.mailbox_id}`,
          date: 'Wed, 27 Aug 2026 10:00:00 +0000',
          from: null,
          subject: null,
          snippet: null,
          folder: 'INBOX',
        },
      ];
    },
  });

  const segundo: Mailbox = { ...MAILBOX, mailbox_id: 'mb-2', address: 'ventas@ejemplo.com' };
  const result = await searchMessages(stubDeps([MAILBOX, segundo], provider), {
    brand_id: 'MarcaCualquiera',
    query: 'factura',
  });

  assert.deepEqual(visitados, ['mb-1', 'mb-2']);
  assert.deepEqual(result.map((r) => r.address), ['contacto@ejemplo.com', 'ventas@ejemplo.com']);
});

test('max_results se recorta al tope y nunca baja de 1', async () => {
  const provider = stubProvider({
    async searchMessages(_session, options) {
      assert.equal(options.maxResults <= 100, true);
      assert.equal(options.maxResults >= 1, true);
      return [];
    },
  });

  await searchMessages(stubDeps([MAILBOX], provider), {
    brand_id: 'MarcaCualquiera',
    query: 'x',
    max_results: 5000,
  });
  await searchMessages(stubDeps([MAILBOX], provider), {
    brand_id: 'MarcaCualquiera',
    query: 'x',
    max_results: -3,
  });
});

// ── Guardarraíles del repo (brief §6) ────────────────────────────────────────

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.next', '.git', 'tests'].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) sourceFiles(full, acc);
    else if (/\.(ts|tsx)$/.test(entry)) acc.push(full);
  }
  return acc;
}

test('el servidor declara exactamente tres tools, todas de lectura', () => {
  const route = readFileSync(join(REPO_ROOT, 'app/api/mcp/[transport]/route.ts'), 'utf8');
  const declared = [...route.matchAll(/^\s{4}name: '([a-z_]+)',$/gm)].map((m) => m[1]);

  assert.deepEqual(declared, ['list_brand_mailboxes', 'search_messages', 'get_message']);

  for (const verbo of ['send_', 'reply', 'forward', 'delete_', 'trash', 'label_', 'mark_', 'move_', 'draft']) {
    assert.equal(
      declared.some((tool) => tool.includes(verbo)),
      false,
      `apareció una tool con «${verbo}» — este repo no tiene tools de escritura`,
    );
  }
});

test('ningún módulo persiste contenido de mensajes', () => {
  // Regla 2 del brief §6: ninguna tabla, columna, caché ni archivo que guarde
  // cuerpo, asunto, remitente, destinatario, adjunto ni message_id.
  const prohibido = /\b(writeFile|appendFile|createWriteStream|localStorage|INSERT INTO|UPDATE\s+mail\.)/i;

  for (const file of sourceFiles(REPO_ROOT)) {
    const source = readFileSync(file, 'utf8');
    assert.equal(prohibido.test(source), false, `${file} escribe donde no debe`);
  }
});

test('el logging no puede filtrar contenido: OpLog no tiene campos de mensaje', () => {
  const log = readFileSync(join(REPO_ROOT, 'lib/log.ts'), 'utf8');
  for (const campo of ['subject', 'from', 'body', 'snippet', 'query', 'message_id']) {
    assert.equal(
      new RegExp(`^\\s+${campo}[?]?:`, 'm').test(log),
      false,
      `OpLog no puede tener el campo «${campo}»`,
    );
  }
});
