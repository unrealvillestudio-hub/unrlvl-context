-- ============================================================================
-- 003 · DROP public.brand_oauth_tokens — deuda declarada
-- Repo: unrlvl-mail-mcp · Brief v1.1 (2026-08-27) §7
--
-- ⛔ NO APLICAR TODAVÍA.
--    Brief §8: «El DROP de brand_oauth_tokens va DESPUÉS del merge del código,
--    en su propio PR de migración.» El brief se contradice consigo mismo —
--    §7 titula «deuda a cerrar en el mismo PR», §8 lo manda después del merge.
--    Manda §8: es la sección de orden de ejecución y es la más específica.
--    El archivo se entrega acá listo y verificado; se aplica en su propio PR.
--
-- ── VERIFICACIÓN HECHA POR CC ANTES DE PROPONER EL DROP (brief §7) ─────────
-- Qué afirma el brief: tabla con access_token y refresh_token en texto plano,
-- cero filas, con su trigger creado, declarada y nunca usada.
--
-- Consulta y resultado (2026-08-27, unrlvl-db amlvyycfepwhiindxgzw):
--   select count(*) from public.brand_oauth_tokens;                  → 0
--   columns: id:uuid, brand_id:text, platform:text, account_id:text,
--            account_name:text, account_type:text, access_token:text,
--            refresh_token:text, expires_at:timestamptz, scope:text,
--            is_active:boolean, created_at:timestamptz, updated_at:timestamptz
--   information_schema.triggers → trg_brand_oauth_tokens_updated_at
--
-- CORRECCIÓN AL BRIEF (CC_PROTOCOL §9): el brief nombra el trigger
-- `update_brand_oauth_tokens_updated_at`. El nombre real es
-- `trg_brand_oauth_tokens_updated_at`. Da igual para el DROP —el trigger cae
-- con la tabla— pero un nombre inventado circulando en un context file vuelve
-- como hecho.
--
-- Barrido de referencias en código: `grep -rn brand_oauth_tokens` sobre el
-- working tree de `unrlvl-context` → 1 hit, y no es código:
--   brands/UnrealvilleStudio/docs/UNRLVL_Labs_Strategy.html:1027
--   «<li>Migración DB: tabla brand_oauth_tokens</li>» — una lista de plan.
--
-- 🟦 LO QUE CC NO PUDO VERIFICAR — acción para Sam antes de aplicar:
--   El brief pide grep en los 16 repos vía proxy gh. La sesión de CC tiene
--   alcance de GitHub limitado a `unrlvl-context` (+ los que se adjuntan de a
--   uno), y el proxy de egreso devuelve 403 en CONNECT contra el dominio de
--   Vercel, así que `api/gh.js` tampoco estuvo disponible. Se verificó
--   `unrlvl-context` (arriba) y `unrlvl-meta-mcp` (clonado: sin hits).
--   Los demás repos quedan sin barrer. Antes de aplicar este archivo:
--   buscar `brand_oauth_tokens` en la organización y confirmar cero hits en
--   código. Si algún repo la referencia → DETENERSE, no dropear.
--
-- Por qué no se recicla la tabla para `mail`: nace con el esquema equivocado
-- —tokens en claro en `public`— y una tabla vacía que declara «acá van los
-- tokens en claro» es una trampa esperando a que alguien la use.
-- ============================================================================

BEGIN;

-- Salvaguarda: si alguien insertó filas entre la verificación y la aplicación,
-- esto aborta la transacción en vez de destruir datos en silencio.
DO $$
DECLARE v_rows bigint;
BEGIN
  SELECT count(*) INTO v_rows FROM public.brand_oauth_tokens;
  IF v_rows <> 0 THEN
    RAISE EXCEPTION 'ABORTADO: public.brand_oauth_tokens tiene % fila(s). La verificación decía 0. Revisar antes de dropear.', v_rows;
  END IF;
END $$;

DROP TABLE public.brand_oauth_tokens;   -- el trigger trg_brand_oauth_tokens_updated_at cae con ella

COMMIT;

-- La función del trigger (`public.update_updated_at_column` o equivalente) NO
-- se toca: es compartida por otras tablas.
