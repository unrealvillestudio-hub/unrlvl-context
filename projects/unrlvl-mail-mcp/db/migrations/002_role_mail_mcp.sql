-- ============================================================================
-- 002 · rol `mail_mcp` — el rol dedicado del MCP
-- Repo: unrlvl-mail-mcp · Brief v1.1 (2026-08-27) §2 y §3
--
-- QUIÉN LO APLICA: Sam, después de 001_mail_schema.sql. CC NO aplica DDL.
--
-- ⚠️ ESTE ARCHIVO CONTIENE UN PLACEHOLDER DE CONTRASEÑA.
--    Sam reemplaza <<<MAIL_MCP_PASSWORD>>> al ejecutarlo en el editor SQL.
--    La contraseña real NUNCA vuelve al repo, ni en este archivo ni en otro
--    (CC_PROTOCOL §3). Vive en la cadena de conexión `MAIL_DB_URL` del
--    entorno de Vercel y en el gestor de secretos de Sam.
--
-- Nota sobre el DDL del brief: usaba `:'mail_mcp_password'`, que es sintaxis
-- de variable de psql y no resuelve en el editor SQL del panel de Supabase.
-- Acá va como placeholder literal para que el paso no falle en silencio.
--
-- POR QUÉ UN ROL PROPIO, y no `service_role`: hoy `service_role` la tienen
-- ~15 Edge Functions. Si las credenciales de buzón fueran legibles con esa
-- clave, el radio de daño sería todo el carril. Con `REVOKE` sobre el schema,
-- las 15 EFs no pueden leer `mail` porque no tienen permiso, no porque una
-- política se lo pida.
-- ============================================================================

CREATE ROLE mail_mcp LOGIN PASSWORD '<<<MAIL_MCP_PASSWORD>>>';

GRANT USAGE  ON SCHEMA mail TO mail_mcp;
GRANT SELECT ON mail.mailboxes, mail.authorizations TO mail_mcp;
GRANT EXECUTE ON FUNCTION mail.resolve_credential(uuid) TO mail_mcp;

-- El rol NO recibe: INSERT/UPDATE/DELETE en ninguna tabla, USAGE en `vault`
-- (la función es SECURITY DEFINER: no lo necesita), ni acceso a `public`.
-- Si una tool futura necesitara escribir, no alcanza con un GRANT: hay que
-- pasar por un PR — que es exactamente el punto (brief §6, regla 1).

-- ── Verificación posterior (Sam la corre y pega el resultado en el PR) ──────
-- 1) El rol ve solo lo que debe:
--    select table_name, privilege_type
--    from information_schema.role_table_grants
--    where grantee = 'mail_mcp';
--    → esperado: mailboxes/SELECT, authorizations/SELECT. Nada más.
--
-- 2) Los roles del ecosistema NO llegan:
--    select has_schema_privilege('service_role','mail','USAGE'),
--           has_schema_privilege('anon','mail','USAGE'),
--           has_schema_privilege('authenticated','mail','USAGE');
--    → esperado: f, f, f
--
-- 3) `mail` NO figura en Settings → API → Exposed schemas (se verifica en el
--    panel; no hay consulta SQL que lo refleje de forma fiable).
