-- ============================================================================
-- 001 · schema `mail` — buzones de cliente, solo lectura
-- Repo: unrlvl-mail-mcp · Brief v1.1 (2026-08-27) §3
--
-- QUIÉN LO APLICA: Sam. CC NO aplica DDL (CC_PROTOCOL §1 / brief §8 paso 2).
-- DÓNDE: proyecto Supabase `unrlvl-db` (amlvyycfepwhiindxgzw).
-- ORDEN: este archivo primero, después 002_role_mail_mcp.sql.
--
-- El aislamiento NO lo da el cifrado: lo da que el MCP no use `service_role`
-- (brief §2). Límite honesto y declarado: esto aísla del plano de aplicación,
-- no del titular del proyecto — el rol `postgres` y el editor SQL del panel
-- siguen alcanzando `mail`. Eso es Sam, y es aceptable.
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS mail;

REVOKE ALL ON SCHEMA mail FROM anon, authenticated, service_role, PUBLIC;

-- ── mailboxes ───────────────────────────────────────────────────────────────
-- `provider` va SIN CHECK, a propósito (brief §1, pregunta 4): el precedente
-- `iid_content_queue_angle_check` enumeró ocho ángulos en el esquema, bloqueó
-- el primer run diverso del 25-ago y fue eliminado (HRD-R12). El mapa de
-- adaptadores vive en el código (`lib/providers/index.ts`), explícito y con
-- fail-loud `MAIL_PROVIDER_UNSUPPORTED` sobre lo desconocido.
--
-- FK a brands — CORRECCIÓN VERIFICADA CONTRA LA DB (CC_PROTOCOL §9):
--   el brief dice `REFERENCES public.brands(brand_id)`. `public.brands` NO
--   tiene columna `brand_id`; su PK es `id text`.
--   Consulta: select column_name,data_type from information_schema.columns
--             where table_schema='public' and table_name='brands'
--     → id:text (PK, según information_schema.table_constraints)
--   La convención del ecosistema es `brand_id text REFERENCES brands(id)`:
--   32 constraints vivas la usan, incluidas dos desde otro schema
--   (`intel.iid_agents`, `shopify.stores`). Los tipos coinciden (text↔text):
--   no hay cast forzado. Se sigue la convención verificada, no el nombre
--   supuesto por el brief.
CREATE TABLE mail.mailboxes (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id       text        NOT NULL REFERENCES public.brands(id),
  address        text        NOT NULL,
  provider       text        NOT NULL,          -- SIN CHECK: ver test N+1 pregunta 4
  credential_ref uuid        NOT NULL,          -- vault.secrets.id
  active         boolean     NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX mailboxes_brand_address_key
  ON mail.mailboxes (brand_id, lower(address));

-- ── authorizations ──────────────────────────────────────────────────────────
-- El papel firmado deja de ser archivo y pasa a ser compuerta: sin una fila
-- viva acá, `mail.resolve_credential` no devuelve token.
-- ON DELETE RESTRICT: un buzón con historial de autorización no se borra en
-- cascada — la trazabilidad de quién autorizó qué no es descartable.
CREATE TABLE mail.authorizations (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mailbox_id     uuid        NOT NULL REFERENCES mail.mailboxes(id) ON DELETE RESTRICT,
  holder_name    text        NOT NULL,
  signed_at      date        NOT NULL,
  document_path  text        NOT NULL,          -- ruta en Supabase Storage
  revoked_at     timestamptz,
  revoked_reason text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX authorizations_mailbox_live_idx
  ON mail.authorizations (mailbox_id) WHERE revoked_at IS NULL;

-- RLS sin políticas: defensa redundante y gratis (brief §2).
ALTER TABLE mail.mailboxes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE mail.authorizations ENABLE ROW LEVEL SECURITY;

-- ── Cierre de privilegios sobre las tablas ──────────────────────────────────
-- AÑADIDO al DDL del brief, no sustitución. Motivo: `REVOKE ... ON SCHEMA`
-- quita USAGE sobre el schema, no privilegios sobre las tablas que vengan de
-- un ALTER DEFAULT PRIVILEGES heredado. Se cierra explícitamente, y también
-- hacia adelante para tablas futuras del schema.
REVOKE ALL ON ALL TABLES    IN SCHEMA mail FROM anon, authenticated, service_role, PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA mail FROM anon, authenticated, service_role, PUBLIC;

ALTER DEFAULT PRIVILEGES IN SCHEMA mail
  REVOKE ALL ON TABLES FROM anon, authenticated, service_role, PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA mail
  REVOKE ALL ON FUNCTIONS FROM anon, authenticated, service_role, PUBLIC;

-- ── Única función de resolución de credencial ───────────────────────────────
-- Es el único camino al token, y verifica la autorización antes de devolverlo.
-- `SET search_path` fijo: no repetir la deuda function_search_path_mutable.
CREATE OR REPLACE FUNCTION mail.resolve_credential(p_mailbox_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = mail, vault, pg_temp
AS $fn$
DECLARE v_ref uuid; v_secret text;
BEGIN
  SELECT m.credential_ref INTO v_ref
  FROM mail.mailboxes m
  WHERE m.id = p_mailbox_id
    AND m.active
    AND EXISTS (SELECT 1 FROM mail.authorizations a
                WHERE a.mailbox_id = m.id AND a.revoked_at IS NULL);

  IF v_ref IS NULL THEN
    RAISE EXCEPTION 'MAILBOX_NOT_AUTHORIZED';
  END IF;

  SELECT decrypted_secret INTO v_secret FROM vault.decrypted_secrets WHERE id = v_ref;

  IF v_secret IS NULL THEN
    RAISE EXCEPTION 'MAIL_CREDENTIAL_UNRESOLVED';
  END IF;

  RETURN v_secret;
END $fn$;

REVOKE EXECUTE ON FUNCTION mail.resolve_credential(uuid)
  FROM PUBLIC, anon, authenticated, service_role;

COMMENT ON SCHEMA mail IS
  'Buzones de correo de clientes — solo lectura. Fuera de la API REST de Supabase (no agregar a Exposed schemas). Consumidor único: unrlvl-mail-mcp con el rol mail_mcp.';
COMMENT ON TABLE mail.mailboxes IS
  'Un buzón por marca y dirección. `provider` sin CHECK: el mapa de adaptadores vive en el código con fail-loud.';
COMMENT ON TABLE mail.authorizations IS
  'Documento firmado por el titular del buzón. Sin fila viva (revoked_at IS NULL) no hay credencial resoluble.';
COMMENT ON FUNCTION mail.resolve_credential(uuid) IS
  'Único camino al token. Verifica buzón activo + autorización viva antes de leer vault. Fail-loud: MAILBOX_NOT_AUTHORIZED / MAIL_CREDENTIAL_UNRESOLVED.';
