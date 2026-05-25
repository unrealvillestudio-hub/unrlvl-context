# Session Log — Meta MCP
_infrastructure/meta-mcp/session_log.md_
_Claude Sonnet 4.6 · UNRLVL Infraestructura_

---

## 2026-05-25 — Sesión inaugural · Diagnóstico + fixes

### Trabajo realizado

**CORS fix (deployado ✅)**
- Root cause: POST responses sin `Access-Control-Allow-Origin` — browser bloqueaba lectura
- Fix: `middleware.ts` en raíz del repo `unrlvl-meta-mcp`
- Cobertura: OPTIONS preflight + todos los responses `/api/*`
- Patrón: permanente, estructural, multimarca — cubre endpoints futuros automáticamente
- Verificación: runtime logs Vercel confirmaron 6 POSTs llegando y procesándose

**Audit page same-origin (deployada ✅)**
- `app/page.tsx` en `unrlvl-meta-mcp` — reemplaza el existente
- URL: `https://unrlvl-meta-mcp.vercel.app`
- Fetch a `/api/mcp/mcp` es same-origin → sin CORS check, sin intermediarios
- Features: 23 tools listados · JSON raw por tool · log terminal · badge azul/gris

**Diagnóstico del servidor**

| Check | Estado |
|---|---|
| Servidor live | ✅ 200 OK · Next.js 15 · Node 24.x |
| 23 tools disponibles | ✅ confirmado desde audit page |
| `list_brands` | ❌ `permission denied for table meta_accounts` |
| Todos los tools | ❌ `brand: undefined` — nombre del parámetro por confirmar |
| Claude chat deferred tools | ❌ no disponible — gap arquitectural |

**meta_accounts — estado (Supabase `amlvyycfepwhiindxgzw`)**

| brand_id | page_id | ig_user_id | ad_account_id | token |
|---|---|---|---|---|
| UNREALville | 1050792034789886 | 17841429817593693 | act_1506214917803847 | ✅ |
| LucienSael | 1076134175585218 | null | null | ✅ (mismo token) |
| NeuroneSCF | — | — | — | ❌ ausente |

RLS policy `service_role_only` — el servidor usa anon key → fix: agregar `SUPABASE_SERVICE_ROLE_KEY` en Vercel env de `unrlvl-meta-mcp`.

**23 Tools confirmados:**
`list_brands · ig_create_container · ig_publish_container · ig_get_media · ig_get_media_insights · ig_get_account_insights · fb_publish_post · fb_publish_photo · fb_get_posts · fb_get_page_insights · ads_get_campaigns · ads_create_campaign · ads_update_campaign · ads_get_adsets · ads_create_adset · ads_get_ads · ads_create_ad · ads_create_creative · ads_get_creatives · ads_get_insights · ads_get_audiences · ads_get_pixels · ads_get_delivery_estimate`

**Rutas que NO funcionaron (anti-patterns documentados):**
- Artifact fetch a `api.anthropic.com` → CORS bloqueado por iframe sandbox
- Artifact JSON-RPC directo al MCP (antes del fix middleware) → CORS bloqueado
- `web_fetch` desde Claude chat a `graph.facebook.com` → bloqueado por allowlist del proxy
- `tool_search` para cargar Meta MCP tools → no disponible como deferred tool en Claude chat

### Pendiente próxima sesión

1. `SUPABASE_SERVICE_ROLE_KEY` en Vercel env de `unrlvl-meta-mcp` → fix `list_brands`
2. Confirmar nombre exacto del parámetro brand via Network tab → tools/list → inputSchema en audit page
3. Insertar NSCF en `meta_accounts`: `page_id` + `ig_user_id` + `ad_account_id` + `system_token`
4. Verificar scopes del system_token: ads + pages + instagram
5. Con Meta MCP cargado en tools list → prueba directa desde Claude chat

---
