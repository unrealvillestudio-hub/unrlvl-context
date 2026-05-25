# Session Log — Meta MCP
_infrastructure/meta-mcp/session_log.md_
_Claude Sonnet 4.6 · UNRLVL Infraestructura_

---

## 2026-05-25 — Sesión 2 · Fixes completos + Meta API operativo

### Trabajo realizado

**Bug 1 resuelto: GRANT faltante en meta_accounts (causa raíz de list_brands)**
- Root cause: tabla `meta_accounts` creada sin GRANT para `service_role` — solo `postgres` tenía acceso
- Síntoma: `permission denied for table meta_accounts` aunque RLS y key fueran correctos
- Fix: `GRANT ALL ON TABLE public.meta_accounts TO service_role;`
- Verificación: `list_brands` devuelve UNREALville + LucienSael ✅

**Bug 2 resuelto: env var naming mismatch (SUPABASE_SERVICE_KEY → SUPABASE_SERVICE_ROLE_KEY)**
- Root cause: código usaba `process.env.SUPABASE_SERVICE_KEY` pero env var fue renombrada a `SUPABASE_SERVICE_ROLE_KEY` por error en sesión anterior
- Fix: actualizado `lib/meta.ts` línea 6 → `process.env.SUPABASE_SERVICE_ROLE_KEY`
- Nota: error originado en instrucción incorrecta de Claude en sesión 1 — documentado en professor_learnings

**Bug 3 resuelto: parámetro brand vs brand_id en page.tsx**
- Root cause: `app/page.tsx` callTool pasaba `{ brand: brand.id }` pero `route.ts` lee `args.brand_id`
- Fix: cambiado a `{ brand_id: brand.id }` + `args.brand_id ?? args.brand` en display
- Efecto: audit page ya no devuelve "Meta account not found for brand: undefined"

**Meta API: scopes del system token**
- Problema: token original no tenía scopes ads — error "(#200) Ad account owner has NOT grant ads_management"
- Causa: Use Cases no configurados en Dev App antes de generar el token
- Fix: configurar Use Cases en Meta Developers → App → Use Cases → regenerar token con 32 permisos
- Aprendizaje clave: Business Manager permisos ≠ token scopes — son capas independientes
- Token actualizado en Supabase via SQL directo (NUNCA pegar en chat)

**Estado final de tools — UNREALville:**

| Tool | Estado | Nota |
|---|---|---|
| `list_brands` | ✅ | UNREALville + LucienSael |
| `ig_get_media` | ✅ | 1 post real — Apr 27 |
| `ads_get_campaigns` | ✅ | Cuenta sin campañas aún |
| `ads_get_pixels` | ✅ | Sin pixels en esta ad account |
| `ads_get_audiences` | ✅ | Sin audiencias |
| `ads_get_insights` | ✅ | Sin data (sin campañas) |
| `fb_get_page_insights` | ⚠️ | Métricas `page_fans` deprecadas en v21 |

**Meta Dev App — pendientes para App Review:**
- App icon 1024×1024
- Privacy policy URL → unrealvillestudio.com/privacy (pendiente crear página)
- User data deletion URL → unrealvillestudio.com/data-deletion (pendiente crear)
- Category → Business & Pages
- No bloquean operación actual (solo bloquean si se quiere usar con tokens de usuario real)

**Professor learnings registrados:** 7 learnings aprobados categoria META_MCP_INFRA + GITHUB_AUDITOR

### meta_accounts — estado actual

| brand_id | page_id | ig_user_id | ad_account_id | token |
|---|---|---|---|---|
| UNREALville | 1050792034789886 | 17841429817593693 | act_1506214917803847 | ✅ renovado |
| LucienSael | 1076134175585218 | null | null | ✅ (mismo token) |
| NeuroneSCF | — | — | — | ❌ pendiente |

### Pendiente próxima sesión

1. Insertar NeuroneSCF en `meta_accounts` (page_id + ig_user_id + ad_account_id + token)
2. Fix `fb_get_page_insights` — remover métricas deprecadas en v21 (`page_fans`)
3. Crear páginas privacy + data-deletion en unrealvillestudio.com para Meta App Review
4. LucienSael: completar `ig_user_id` + `ad_account_id` cuando estén disponibles

---

## 2026-05-25 — Sesión 1 · Diagnóstico + fixes iniciales

### Trabajo realizado

**CORS fix (deployado ✅)**
- Root cause: POST responses sin `Access-Control-Allow-Origin` — browser bloqueaba lectura
- Fix: `middleware.ts` en raíz del repo `unrlvl-meta-mcp`
- Cobertura: OPTIONS preflight + todos los responses `/api/*`

**Audit page same-origin (deployada ✅)**
- `app/page.tsx` en `unrlvl-meta-mcp` — reemplaza el existente
- URL: `https://unrlvl-meta-mcp.vercel.app`

**23 Tools confirmados:**
`list_brands · ig_create_container · ig_publish_container · ig_get_media · ig_get_media_insights · ig_get_account_insights · fb_publish_post · fb_publish_photo · fb_get_posts · fb_get_page_insights · ads_get_campaigns · ads_create_campaign · ads_update_campaign · ads_get_adsets · ads_create_adset · ads_get_ads · ads_create_ad · ads_create_creative · ads_get_creatives · ads_get_insights · ads_get_audiences · ads_get_pixels · ads_get_delivery_estimate`

---
