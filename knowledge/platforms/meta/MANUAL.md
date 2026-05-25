# Meta Platform Manual
_knowledge/platforms/meta/MANUAL.md_
_Versión: 1.0 · 2026-05-25 · Mantenido por: Claude_

---

## ARQUITECTURA DE ACCESO META

Meta tiene tres capas de acceso independientes que se confunden frecuentemente. Son acumulativas — cada capa requiere la anterior.

```
Meta Developers (Dev App)
    └── Define qué puede hacer un token (scopes/capabilities)
        └── Meta Business Manager
                └── Define quién tiene acceso a qué activos
                        └── System User Token
                                └── Llave operativa que usa el código
```

---

## CAPA 1 — META DEVELOPERS (Dev App)

**URL:** developers.facebook.com → My Apps

### Qué controla
Los **scopes y capabilities** disponibles para los tokens que se generen desde esta app. Sin configurar Use Cases aquí, los tokens generados tienen capacidades mínimas aunque el system user tenga "todos los permisos" en Business Manager.

### Configuración crítica: Use Cases
**Ruta:** App → Use Cases → Add Use Case

| Use Case | Scopes que habilita |
|---|---|
| Manage ads | `ads_management`, `ads_read` |
| Manage Pages | `pages_manage_posts`, `pages_read_engagement`, `pages_manage_metadata` |
| Instagram Basic | `instagram_basic`, `instagram_content_publish`, `instagram_manage_insights` |
| WhatsApp Business | `whatsapp_business_messaging`, `whatsapp_business_management` |

**⚠️ REGLA CRÍTICA:** Los Use Cases deben configurarse ANTES de generar el token. Un token generado sin Use Cases configurados NO hereda los scopes aunque se reconfiguren después — hay que regenerar.

### App Review
Para uso interno con system users NO se requiere App Review. Solo es necesario si se quieren usar tokens de usuarios reales externos.

**Campos requeridos para App Review (no bloquean operación interna):**
- App icon 1024×1024
- Privacy policy URL
- User data deletion URL
- Category

### Errores comunes por Use Cases mal configurados
```
(#200) Ad account owner has NOT grant ads_management or ads_read permission
```
→ Use Case "Manage ads" no configurado o token generado antes de configurarlo.

---

## CAPA 2 — META BUSINESS MANAGER

**URL:** business.facebook.com → Configuración empresarial

### System Users
**Ruta:** Usuarios → System Users

Un system user es una entidad no-humana que representa a una integración. Permite generar tokens de larga duración sin depender de una cuenta personal.

**Crear system user:**
1. Usuarios → System Users → Agregar → nombre (ej: `unrlvlopssystem`) → rol Empleado
2. Asignar activos: páginas, ad accounts, Instagram, WhatsApp
3. Configurar permisos por activo (ver tabla abajo)

**Permisos por tipo de activo:**

| Activo | Permisos mínimos | Permisos recomendados |
|---|---|---|
| Facebook Page | Ver rendimiento | Administrar campañas + Administrar páginas |
| Ad Account | Ver rendimiento | Administrar cuentas publicitarias (Control total) |
| Instagram | — | Se gestiona via Page vinculada |
| WhatsApp | — | Configurar desde WABA en BM |

**⚠️ IMPORTANTE:** "Administrar cuentas publicitarias" en BM da acceso al activo. Los SCOPES del token (qué puede hacer con ese activo) los controla la Dev App. Son capas distintas.

### Generar token del system user
**Ruta:** System Users → [usuario] → Generate New Token → seleccionar App → seleccionar scopes

**Checklist antes de generar:**
- [ ] Use Cases configurados en Dev App para los scopes necesarios
- [ ] System user tiene acceso a los activos requeridos
- [ ] Seleccionar todos los scopes necesarios en el modal

**Token generado = larga duración** (60 días o nunca expira según config). El token anterior queda inválido al regenerar.

**⚠️ SEGURIDAD:** Nunca pegar el token en el chat. Actualizar directamente en Supabase via SQL Editor:
```sql
UPDATE public.meta_accounts
SET system_token = 'EAALxxx...', updated_at = now()
WHERE brand_id = '[brand]';
```

---

## CAPA 3 — META API (Graph API)

**Base URL:** `https://graph.facebook.com/v21.0`

### Versiones y deprecaciones
Meta depreca endpoints y métricas con cada versión mayor. Usar siempre la versión más reciente estable.

**Métricas deprecadas en v21.0:**
- `page_fans` → reemplazar por `page_total_likes` o usar `page_follows`
- Verificar deprecaciones en: developers.facebook.com/docs/graph-api/changelog

### Estructura de ad account
El ID de ad account en la API siempre tiene el prefijo `act_`:
```
act_1506214917803847
```
Nunca usar el ID numérico sin prefijo para llamadas a la Marketing API.

---

## UNRLVL META MCP — CONFIGURACIÓN

**Repo:** `unrealvillestudio-hub/unrlvl-meta-mcp`
**URL:** `https://unrlvl-meta-mcp.vercel.app`
**Audit page:** `https://unrlvl-meta-mcp.vercel.app` → Ejecutar Audit

### Variables de entorno requeridas (Vercel)

| Variable | Descripción |
|---|---|
| `SUPABASE_URL` | URL del proyecto Supabase (`amlvyycfepwhiindxgzw`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — NO el anon key |

**⚠️ GRANT requerido en Supabase:** La tabla `meta_accounts` requiere GRANT explícito para service_role. Si se crea una tabla nueva para el MCP, ejecutar siempre:
```sql
GRANT ALL ON TABLE public.[tabla] TO service_role;
```

### Tabla `meta_accounts` (Supabase — `amlvyycfepwhiindxgzw`)

| Campo | Tipo | Descripción |
|---|---|---|
| `brand_id` | text PK | ID de la marca (ej: `NeuroneSCF`) |
| `page_id` | text | Facebook Page ID numérico |
| `ig_user_id` | text | Instagram User ID numérico |
| `ad_account_id` | text | Ad account con prefijo `act_` |
| `system_token` | text | Token del system user |

**RLS:** policy `service_role_only` — solo accesible con service role key.

### Agregar nueva marca al MCP
```sql
INSERT INTO public.meta_accounts (brand_id, page_id, ig_user_id, ad_account_id, system_token, created_at)
VALUES ('[brand_id]', '[page_id]', '[ig_user_id]', 'act_[ad_account_id]', '[token]', now());
```

### 23 Tools disponibles

**Read (seguras, no requieren aprobación):**
`list_brands` · `ig_get_media` · `ig_get_media_insights` · `ig_get_account_insights` · `fb_get_posts` · `fb_get_page_insights` · `ads_get_campaigns` · `ads_get_adsets` · `ads_get_ads` · `ads_get_creatives` · `ads_get_insights` · `ads_get_audiences` · `ads_get_pixels` · `ads_get_delivery_estimate`

**Write (requieren aprobación explícita de Sam):**
`ig_create_container` · `ig_publish_container` · `fb_publish_post` · `fb_publish_photo` · `ads_create_campaign` · `ads_update_campaign` · `ads_create_adset` · `ads_create_ad` · `ads_create_creative`

### Gaps conocidos (v1.0)
- `fb_get_page_insights`: métricas `page_fans` deprecadas en Graph API v21 — fix pendiente en `lib/meta.ts`
- Meta MCP tools solo disponibles en Claude chat cuando está conectado como MCP server

---

## FLUJO COMPLETO: ONBOARDING NUEVA MARCA AL META MCP

```
1. Meta Developers
   └── Crear o reusar Dev App (UNRLVL Publisher)
   └── Configurar Use Cases necesarios

2. Meta Business Manager
   └── Crear system user (o reusar unrlvlopssystem)
   └── Asignar activos de la nueva marca al system user
   └── Generate New Token → seleccionar app + todos los scopes
   └── Copiar token (aparece una sola vez)

3. Supabase
   └── INSERT en meta_accounts con todos los IDs + token
   └── Verificar: SELECT * FROM meta_accounts WHERE brand_id = '[brand]'

4. Verificación
   └── Claude chat → UNRLVL Meta:list_brands → debe aparecer la nueva marca
   └── UNRLVL Meta:ig_get_media brand_id=[brand] → datos reales
   └── UNRLVL Meta:ads_get_campaigns brand_id=[brand] → datos reales
```

---

## DÓNDE ENCONTRAR IDs

| Dato | Dónde encontrarlo |
|---|---|
| Facebook Page ID | Business Manager → Páginas → [Página] → Info de la página → ID |
| Instagram User ID | Graph API: `GET /{ig-username}?fields=id&access_token={token}` |
| Ad Account ID | Business Manager → Cuentas publicitarias → [Cuenta] → ID de la cuenta |
| App ID | developers.facebook.com → My Apps → [App] → App ID |

---

_Meta Platform Manual v1.0 · UNRLVL Studio · 2026-05-25_
