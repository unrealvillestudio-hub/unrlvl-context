import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  buildSearchQuery,
  classifyFolder,
  extractAttachmentNames,
  extractBodyText,
  googleOAuthProvider,
  headerValue,
} from '../lib/providers/google_oauth';
import { MailError } from '../lib/errors';
import { fakeFetch, gmailTokenResponse, setOAuthEnv } from './helpers';

setOAuthEnv();

const TOKEN_URL = 'https://oauth2.googleapis.com/token';

function gmailMessage(id: string, labelIds: string[], subject = 'asunto') {
  return {
    id,
    labelIds,
    snippet: 'snippet',
    payload: {
      mimeType: 'text/plain',
      headers: [
        { name: 'From', value: 'alguien@ejemplo.com' },
        { name: 'Subject', value: subject },
        { name: 'Date', value: 'Wed, 27 Aug 2026 10:00:00 +0000' },
      ],
      body: { data: Buffer.from('cuerpo del mensaje').toString('base64url') },
    },
  };
}

// ── classifyFolder ───────────────────────────────────────────────────────────

test('classifyFolder mapea las tres carpetas legibles', () => {
  assert.equal(classifyFolder(['INBOX']), 'INBOX');
  assert.equal(classifyFolder(['SENT']), 'SENT');
  assert.equal(classifyFolder(['SPAM']), 'SPAM');
});

test('la papelera gana sobre cualquier otra etiqueta', () => {
  // Gmail conserva etiquetas al mover a papelera: un mensaje puede tener
  // TRASH e INBOX a la vez. La exclusión tiene que ganar siempre.
  assert.equal(classifyFolder(['TRASH']), null);
  assert.equal(classifyFolder(['TRASH', 'INBOX']), null);
  assert.equal(classifyFolder(['INBOX', 'TRASH', 'IMPORTANT']), null);
});

test('borradores, chats y archivados no son legibles', () => {
  assert.equal(classifyFolder(['DRAFT']), null);
  assert.equal(classifyFolder(['CHAT']), null);
  assert.equal(classifyFolder(['Label_17']), null); // archivado, solo etiqueta de usuario
  assert.equal(classifyFolder([]), null);
  assert.equal(classifyFolder(undefined), null);
});

// ── buildSearchQuery ─────────────────────────────────────────────────────────

test('la query restringe a las tres carpetas y excluye papelera', () => {
  const q = buildSearchQuery('from:cliente@ejemplo.com');
  assert.match(q, /from:cliente@ejemplo\.com/);
  assert.match(q, /\{in:inbox in:sent in:spam\}/);
  assert.match(q, /-in:trash/);
});

// ── Parsing ──────────────────────────────────────────────────────────────────

test('extractBodyText prefiere text/plain sobre text/html', () => {
  const payload = {
    mimeType: 'multipart/alternative',
    parts: [
      { mimeType: 'text/html', body: { data: Buffer.from('<p>html</p>').toString('base64url') } },
      { mimeType: 'text/plain', body: { data: Buffer.from('plano').toString('base64url') } },
    ],
  };
  assert.equal(extractBodyText(payload), 'plano');
});

test('headerValue es insensible a mayúsculas y extractAttachmentNames recorre partes', () => {
  const payload = {
    headers: [{ name: 'SUBJECT', value: 'hola' }],
    parts: [{ filename: 'factura.pdf' }, { parts: [{ filename: 'anexo.png' }] }],
  };
  assert.equal(headerValue(payload, 'subject'), 'hola');
  assert.deepEqual(extractAttachmentNames(payload), ['factura.pdf', 'anexo.png']);
});

// ── TEST OBLIGATORIO DEL BRIEF §5 ────────────────────────────────────────────
// «Un mensaje en papelera NO aparece ni en search_messages ni en get_message.»

test('OBLIGATORIO: un mensaje en papelera no aparece en search_messages', async () => {
  const { fetchImpl, calls } = fakeFetch((url) => {
    if (url.startsWith(TOKEN_URL)) return gmailTokenResponse();
    if (url.includes('/messages?')) return { body: { messages: [{ id: 'vivo' }, { id: 'papelera' }] } };
    if (url.includes('/messages/vivo')) return { body: gmailMessage('vivo', ['INBOX']) };
    if (url.includes('/messages/papelera')) return { body: gmailMessage('papelera', ['TRASH', 'INBOX']) };
    return undefined;
  });

  const results = await googleOAuthProvider.searchMessages(
    { mailbox_id: 'mb-search-trash', address: 'buzon@ejemplo.com', credential: 'refresh', fetchImpl },
    { query: 'factura', maxResults: 20 },
  );

  assert.deepEqual(results.map((m) => m.message_id), ['vivo']);

  // Y se pidió includeSpamTrash=true a propósito: es el único modo de traer
  // SPAM. La papelera se descarta en código, no en la API.
  const listCall = calls.find((c) => c.url.includes('/messages?'));
  assert.ok(listCall && listCall.url.includes('includeSpamTrash=true'));
});

test('OBLIGATORIO: un mensaje en papelera no se devuelve por get_message', async () => {
  const { fetchImpl } = fakeFetch((url) => {
    if (url.startsWith(TOKEN_URL)) return gmailTokenResponse();
    if (url.includes('/messages/papelera')) return { body: gmailMessage('papelera', ['TRASH']) };
    return undefined;
  });

  await assert.rejects(
    googleOAuthProvider.getMessage(
      { mailbox_id: 'mb-get-trash', address: 'buzon@ejemplo.com', credential: 'refresh', fetchImpl },
      'papelera',
    ),
    (err: unknown) => err instanceof MailError && err.code === 'FOLDER_NOT_ALLOWED',
  );
});

test('el spam sí se lee — es donde vive lo que hay que atender', async () => {
  const { fetchImpl } = fakeFetch((url) => {
    if (url.startsWith(TOKEN_URL)) return gmailTokenResponse();
    if (url.includes('/messages/spam1')) return { body: gmailMessage('spam1', ['SPAM']) };
    return undefined;
  });

  const message = await googleOAuthProvider.getMessage(
    { mailbox_id: 'mb-spam', address: 'buzon@ejemplo.com', credential: 'refresh', fetchImpl },
    'spam1',
  );

  assert.equal(message?.folder, 'SPAM');
  assert.equal(message?.body_text, 'cuerpo del mensaje');
});

// ── Modos de muerte del refresh token (brief §9.2) ───────────────────────────

test('un refresh token muerto falla con MAIL_TOKEN_REVOKED, nunca con lista vacía', async () => {
  const { fetchImpl } = fakeFetch((url) => {
    if (url.startsWith(TOKEN_URL)) {
      return { status: 400, body: { error: 'invalid_grant', error_description: 'Token has been expired or revoked.' } };
    }
    return undefined;
  });

  await assert.rejects(
    googleOAuthProvider.searchMessages(
      { mailbox_id: 'mb-revocado', address: 'buzon@ejemplo.com', credential: 'refresh-muerto', fetchImpl },
      { query: 'lo que sea', maxResults: 10 },
    ),
    (err: unknown) => err instanceof MailError && err.code === 'MAIL_TOKEN_REVOKED',
  );
});

test('un 403 de Gmail es permiso retirado, no un token vencido', async () => {
  const { fetchImpl } = fakeFetch((url) => {
    if (url.startsWith(TOKEN_URL)) return gmailTokenResponse();
    if (url.includes('/messages')) return { status: 403, body: { error: { message: 'insufficient permissions' } } };
    return undefined;
  });

  await assert.rejects(
    googleOAuthProvider.searchMessages(
      { mailbox_id: 'mb-403', address: 'buzon@ejemplo.com', credential: 'refresh', fetchImpl },
      { query: 'x', maxResults: 5 },
    ),
    (err: unknown) => err instanceof MailError && err.code === 'MAIL_TOKEN_REVOKED',
  );
});

// ── Guardarraíl estructural: el adaptador no escribe ─────────────────────────

test('el adaptador expone solo lectura: sin enviar, responder, borrar ni etiquetar', () => {
  assert.deepEqual(Object.keys(googleOAuthProvider).sort(), ['getMessage', 'name', 'searchMessages']);
});

test('ninguna llamada a la API de Gmail sale con método distinto de GET', () => {
  const source = readFileSync(
    fileURLToPath(new URL('../lib/providers/google_oauth.ts', import.meta.url)),
    'utf8',
  );

  // El único POST del adaptador es al endpoint de token de Google, que no es
  // la API de Gmail. Si alguien agrega otro método, este test lo caza antes
  // que el code review.
  const methods = [...source.matchAll(/method:\s*'([A-Z]+)'/g)].map((m) => m[1]);
  assert.deepEqual(methods, ['POST']);
  assert.equal((source.match(/TOKEN_URL/g) ?? []).length >= 2, true);
  assert.equal(/GMAIL_BASE[\s\S]{0,400}method:/.test(source), false);
});
