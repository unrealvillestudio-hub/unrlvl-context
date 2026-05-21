# Supabase Edge Functions — Patterns & Pitfalls
_Actualizado: 2026-05-20_

## encodeURIComponent y emails en PostgREST

`encodeURIComponent('@')` = `%40`. PostgREST **no decodifica** `%40` en query params — lo compara literal contra la DB. Resultado: `WHERE email = 'user%40gmail.com'` devuelve 0 filas.

### Solución
Nunca usar `encodeURIComponent` directamente sobre emails en query params:

```typescript
// MAL
const url = `${SB_URL}/rest/v1/owners?email=eq.${encodeURIComponent(email)}`;

// BIEN — encoder custom que respeta @ . - _
const encEmail = (s: string) => s.replace(/[^a-zA-Z0-9@._+\-]/g, c => encodeURIComponent(c));
const url = `${SB_URL}/rest/v1/owners?email=eq.${encEmail(email)}`;

// O mejor — usar RPC con body JSON donde el email va sin encoding
const r = await fetch(`${SB_URL}/rest/v1/rpc/lookup_by_email`, {
  method: 'POST',
  body: JSON.stringify({ p_email: email })
});
```

---

## verify_jwt — siempre explícito

`deploy_edge_function` setea `verify_jwt: true` por defecto. Para EFs públicas (sin auth de usuario):

```typescript
// Siempre pasar explícitamente
deploy_edge_function({ verify_jwt: false, ... })
```

Sin esto el cliente recibe `401 Unauthorized`.

---

## GET headers vs write headers

El header `Prefer: return=representation` en **GETs** puede cambiar la respuesta de array a objeto, rompiendo `Array.isArray()`.

```typescript
// Separar siempre:
const getH = () => ({
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Content-Type': 'application/json',
  // SIN Prefer
});

const writeH = () => ({
  ...getH(),
  'Prefer': 'return=representation', // solo para POST/PATCH/PUT
});
```

---

## DEV_MODE — secret positivo, no ausencia de secret

No usar `DEV_MODE = !SOME_KEY` porque el secret puede existir de sesiones anteriores sin que nadie lo sepa.

```typescript
// MAL
const DEV_MODE = !Deno.env.get('PROD_KEY');

// BIEN — secret positivo explícito para activar producción
const DEV_MODE = Deno.env.get('MY_APP_PROD') !== 'true';
// Default: dev mode. Producción requiere acción explícita.
```
