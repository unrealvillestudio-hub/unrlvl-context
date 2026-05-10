# SKILL — security v1.0
_UNRLVL Security Standards · Supabase · Vercel · Deployments_
_Versión: 1.0 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa en cualquier sesión que involucre:
- Crear o modificar tablas en Supabase
- Deployar Edge Functions o endpoints públicos
- Configurar agentes, webhooks, o APIs externas
- Gestionar secrets y variables de entorno
- Cualquier checklist pre-deployment productivo

**Regla:** Este skill se lee ANTES de escribir cualquier código que toque seguridad. No después.

---

## ⚠️ ISSUES ACTIVOS EN EL PROYECTO (al 2026-04-24)

Detectados vía Supabase Security Advisors. Requieren atención de Sam.

### CRÍTICOS — RLS permissivo para anon

Estas políticas permiten que cualquier usuario anónimo (sin autenticación) ejecute operaciones destructivas o de escritura sin restricción:

| Tabla | Problema | Política |
|---|---|---|
| `public.ops_costs` | anon puede DELETE cualquier fila | `anon_delete_costs` |
| `public.ops_costs` | anon puede INSERT sin restricción | `anon_insert_costs` |
| `public.ops_insights` | anon puede UPDATE cualquier fila | `anon_update_insights` |
| `public.scheduled_posts` | anon puede INSERT sin restricción | `scheduled_posts_write_anon` |

**Fix recomendado:**
```sql
-- ops_costs: restringir DELETE a service_role únicamente
DROP POLICY IF EXISTS anon_delete_costs ON public.ops_costs;
CREATE POLICY "service_only_delete_costs" ON public.ops_costs
  FOR DELETE USING (auth.role() = 'service_role');

-- ops_costs: restringir INSERT a service_role
DROP POLICY IF EXISTS anon_insert_costs ON public.ops_costs;
CREATE POLICY "service_only_insert_costs" ON public.ops_costs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ops_insights: restringir UPDATE
DROP POLICY IF EXISTS anon_update_insights ON public.ops_insights;
CREATE POLICY "service_only_update_insights" ON public.ops_insights
  FOR UPDATE USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- scheduled_posts: restringir INSERT (solo labs internos deben poder escribir)
DROP POLICY IF EXISTS scheduled_posts_write_anon ON public.scheduled_posts;
CREATE POLICY "service_only_insert_posts" ON public.scheduled_posts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
```

### WARNINGS — Functions con search_path mutable

9 funciones sin `search_path` fijo — riesgo de search_path injection:

**Afectadas:** `public.set_updated_at`, `public.update_lab_configs_updated_at`, `public.sync_profiler_to_crm`, `crm.set_updated_at`, `crm.update_contact_activity`, `crm.sync_profiler_lead`, `fph.set_updated_at`, `fph.calc_days_late`, `fph.set_incident_due`

**Fix estándar para cada función:**
```sql
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.update_lab_configs_updated_at() SET search_path = public;
ALTER FUNCTION public.sync_profiler_to_crm() SET search_path = public, crm;
ALTER FUNCTION crm.set_updated_at() SET search_path = crm;
ALTER FUNCTION crm.update_contact_activity() SET search_path = crm;
ALTER FUNCTION crm.sync_profiler_lead() SET search_path = crm, public;
ALTER FUNCTION fph.set_updated_at() SET search_path = fph;
ALTER FUNCTION fph.calc_days_late() SET search_path = fph;
ALTER FUNCTION fph.set_incident_due() SET search_path = fph;
```

Referencia: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

---

## SECCIÓN 1 — KEYS Y ROLES DE SUPABASE

### Las tres keys y cuándo usa cada una

| Key | Scope | Dónde va | Dónde NUNCA va |
|---|---|---|---|
| `anon` (pública) | Usuario final no autenticado | Frontend, artifacts HTML, clients | En Edge Functions con operaciones sensibles |
| `service_role` (secreta) | Bypasea RLS, acceso total | Edge Functions server-side únicamente | Frontend, cliente, código público, outputs |
| JWT de usuario | Usuario autenticado específico | Cuando hay auth de usuario | No aplica a UNRLVL todavía |

**Regla crítica:** `service_role` nunca sale del servidor. Si aparece en un artifact HTML, en un output de Claude, o en código de frontend — es un error grave.

### Dónde viven las keys en el stack UNRLVL

```
Vercel Edge Functions → SUPABASE_SERVICE_ROLE_KEY (env var Vercel)
Supabase Edge Functions → SUPABASE_SERVICE_ROLE_KEY (Supabase secrets)
Artifacts HTML públicos → SUPABASE_ANON_KEY únicamente
Agentes web (widget) → SUPABASE_ANON_KEY únicamente
```

---

## SECCIÓN 2 — RLS: ESTÁNDARES POR TIPO DE TABLA

Row Level Security debe estar activo en TODAS las tablas. Sin excepciones.

### Tabla de datos de marca (brand content)

```sql
-- SELECT: todos pueden leer (datos no sensibles)
CREATE POLICY "public_read" ON public.[tabla]
  FOR SELECT USING (true);

-- INSERT/UPDATE/DELETE: solo service_role
CREATE POLICY "service_write" ON public.[tabla]
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### Tabla de datos de cliente/CRM (sensibles)

```sql
-- Sin acceso anon en ninguna operación
CREATE POLICY "no_anon_access" ON public.[tabla]
  FOR ALL USING (auth.role() = 'service_role');
```

### Tabla de agentes (conversaciones, sessions)

```sql
-- INSERT permitido para anon (el usuario del chat escribe)
CREATE POLICY "anon_insert_session" ON public.[tabla]
  FOR INSERT WITH CHECK (true);

-- SELECT: solo su propia sesión (cuando hay auth)
-- UPDATE/DELETE: solo service_role
CREATE POLICY "service_write" ON public.[tabla]
  FOR UPDATE USING (auth.role() = 'service_role');
```

### Tabla de ops/costos/financiero

```sql
-- Sin acceso anon en ninguna operación — todo via service_role
CREATE POLICY "service_only" ON public.[tabla]
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### Tabla de scheduled posts / content queue

```sql
-- Solo labs internos (service_role) pueden escribir
-- Lectura pública del estado si aplica
CREATE POLICY "public_read_status" ON public.scheduled_posts
  FOR SELECT USING (true);
CREATE POLICY "service_write" ON public.scheduled_posts
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

---

## SECCIÓN 3 — EDGE FUNCTIONS: AUTENTICACIÓN

### Patrón de verificación de requests

Toda Edge Function que no sea pública debe verificar el origen:

```typescript
// Verificar que el request viene de un origen autorizado
function verifyRequest(req: Request): boolean {
  const authHeader = req.headers.get('Authorization');

  // Opción A: Bearer token (SUPABASE_ANON_KEY o service_role)
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    // Verificar contra keys conocidas
    return token === Deno.env.get('SUPABASE_ANON_KEY') ||
           token === Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  }

  // Opción B: Secret compartido para webhooks internos
  const secret = req.headers.get('x-unrlvl-secret');
  return secret === Deno.env.get('INTERNAL_WEBHOOK_SECRET');
}
```

### Para webhooks externos (Meta, WhatsApp, Shopify)

Cada plataforma tiene su propio mecanismo de verificación:

```typescript
// Meta/WhatsApp webhook verification
if (req.method === 'GET') {
  const token = new URL(req.url).searchParams.get('hub.verify_token');
  if (token === Deno.env.get('WA_VERIFY_TOKEN')) {
    return new Response(new URL(req.url).searchParams.get('hub.challenge'));
  }
  return new Response('Forbidden', { status: 403 });
}

// Shopify webhook HMAC verification
function verifyShopifyWebhook(body: string, hmacHeader: string): boolean {
  const secret = Deno.env.get('SHOPIFY_WEBHOOK_SECRET')!;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  // ... comparar HMAC
}
```

---

## SECCIÓN 4 — SECRETS: LO QUE NUNCA VA HARDCODEADO

### Lista negra de hardcoding

Estos valores NUNCA van en código, archivos commiteados, outputs de Claude, ni documentación:

- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- Shopify Admin API access tokens
- WhatsApp `wa_business_account_id` + `wa_phone_number_id` + verify token
- API keys de Fal.ai, ElevenLabs, HeyGen, Kling
- Resend API key
- Twilio credentials
- Cualquier JWT o token de sesión

### Dónde viven los secrets

| Secret | Dónde | Cómo acceder |
|---|---|---|
| Supabase service_role | Supabase Dashboard → Settings → API | `Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')` |
| Anthropic API key | Vercel + Supabase env vars | `process.env.ANTHROPIC_API_KEY` |
| Shopify tokens | `ops.shopify_stores` (en Supabase, columna cifrada) | Query con service_role |
| WA credentials | Vercel env vars + `agents` table | Env vars + Supabase |
| Fal.ai key | Supabase secrets | `Deno.env.get('FAL_API_KEY')` |
| ElevenLabs key | Supabase secrets | `Deno.env.get('ELEVENLABS_API_KEY')` |

### Verificación pre-commit

Antes de cualquier commit, Claude verifica que el código no contiene:
```bash
# Patterns to never commit
grep -r "sk-ant-" .          # Anthropic keys
grep -r "shpat_" .           # Shopify admin tokens
grep -r "service_role" .     # Supabase service role
grep -r "eyJhbGciOiJIUzI" .  # JWT tokens
```

---

## SECCIÓN 5 — VARIABLES DE ENTORNO POR PLATAFORMA

### Vercel (para Edge Functions y Next.js)

```
# Supabase
SUPABASE_URL=https://amlvyycfepwhiindxgzw.supabase.co
SUPABASE_ANON_KEY=[anon key — semi-pública]
SUPABASE_SERVICE_ROLE_KEY=[secret — NUNCA en frontend]

# AI
ANTHROPIC_API_KEY=[secret]

# Comunicaciones
RESEND_API_KEY=[secret]

# WhatsApp (por agente)
WA_VERIFY_TOKEN=[secret por agente]
WA_ACCESS_TOKEN=[secret]
```

### Supabase Edge Functions

```
# Mismas keys que Vercel, más las de terceros que solo usan Edge Functions:
FAL_API_KEY=[secret]
ELEVENLABS_API_KEY=[secret]
INTERNAL_WEBHOOK_SECRET=[secret compartido con Vercel]
```

---

## SECCIÓN 6 — CORS

Para Edge Functions expuestas públicamente:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',           // Para APIs públicas
  // o restringir a dominio específico:
  'Access-Control-Allow-Origin': 'https://unrealvillestudio.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
};

// Siempre manejar OPTIONS preflight:
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders });
}
```

---

## SECCIÓN 7 — CHECKLIST PRE-DEPLOYMENT

Antes de deployar cualquier cosa a producción:

### Supabase
- [ ] RLS habilitado en la tabla nueva (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`)
- [ ] Políticas RLS creadas — no solo `USING (true)` para operaciones de escritura
- [ ] Funciones nuevas tienen `SET search_path = [schema]`
- [ ] No hay `service_role` key en código de cliente
- [ ] Columnas con datos sensibles (tokens, passwords) marcadas o cifradas

### Vercel / Edge Functions
- [ ] Todas las keys vienen de `process.env` / `Deno.env.get()` — nunca hardcodeadas
- [ ] CORS configurado apropiadamente para el tipo de endpoint
- [ ] Webhook endpoints verifican la firma/token del origen
- [ ] No hay secrets en código commiteado (verificar con grep)
- [ ] Variables de entorno configuradas en Vercel dashboard antes del deploy

### General
- [ ] `.env.local` está en `.gitignore`
- [ ] No hay tokens o keys en comentarios del código
- [ ] Logs de producción no imprimen valores sensibles

---

## SECCIÓN 8 — ADVISORS: EJECUTAR REGULARMENTE

Después de cada sesión con cambios de DDL, ejecutar:

```
Supabase Dashboard → Database → Database Linter
```

O via este skill — Claude ejecuta `Supabase:get_advisors` y reporta nuevos issues.

Issues actuales a resolver (ver inicio de este skill): 4 RLS permissivos + 9 funciones con search_path mutable.

---

_SKILL security v1.0 · Unreal>ille Studio · Supabase + Vercel_
_Issues activos documentados al 2026-04-24 — resolver antes del próximo deployment productivo_
