import { test } from 'node:test';
import assert from 'node:assert/strict';

import { ALLOWED_FOLDERS, assertAllowedFolder, isAllowedFolder } from '../lib/folders';
import { MailError } from '../lib/errors';

test('las carpetas legibles son exactamente INBOX, SENT y SPAM', () => {
  assert.deepEqual([...ALLOWED_FOLDERS], ['INBOX', 'SENT', 'SPAM']);
});

test('la papelera no es una carpeta legible', () => {
  assert.equal(isAllowedFolder('TRASH'), false);
  assert.throws(
    () => assertAllowedFolder('TRASH'),
    (err: unknown) => err instanceof MailError && err.code === 'FOLDER_NOT_ALLOWED',
  );
});

test('cualquier carpeta desconocida falla fuerte, no se ignora', () => {
  assert.throws(
    () => assertAllowedFolder('ARCHIVE'),
    (err: unknown) => err instanceof MailError && err.code === 'FOLDER_NOT_ALLOWED',
  );
});
