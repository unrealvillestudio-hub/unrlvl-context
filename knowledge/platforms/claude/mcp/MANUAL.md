# MANUAL — Múltiples cuentas del mismo proveedor MCP en Claude.ai
_Categoría: infrastructure · Aprobado: 2026-05-20 · Origen: sesión ForumPHs_

---

## Problema

Claude.ai no permite registrar dos conectores con la misma URL base. Intentar añadir una segunda cuenta de Supabase con `https://mcp.supabase.com/mcp` produce el error **"this URL already exists"**.

---

## Solución: Proxy Vercel

Crear un proxy que reenvía todos los requests a la URL original inyectando el token de la segunda cuenta. Claude.ai lo ve como una URL diferente.

### Implementación

```javascript
// api/mcp.js — Edge Function Vercel
export const config = { runtime: 'edge' };

const TARGET = 'https://mcp.supabase.com/mcp'; // URL original del proveedor

export default async function handler(req) {
  const token = process.env.SUPABASE_TOKEN; // token de la segunda cuenta

  const headers = new Headers();
  for (const [key, value] of req.headers.entries()) {
    if (!['host', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }
  headers.set('Authorization', `Bearer ${token}`);

  const hasBody = !['GET', 'HEAD'].includes(req.method);
  const upstream = await fetch(TARGET, {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined,
  });

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('content-encoding');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
```

```json
// vercel.json
{
  "name": "mi-proxy-mcp",
  "rewrites": [
    { "source": "/", "destination": "/api/mcp" },
    { "source": "/(.*)", "destination": "/api/mcp" }
  ]
}
```

### Variable de entorno en Vercel
- **Name:** `SUPABASE_TOKEN` (o el nombre que corresponda)
- **Value:** el token de la segunda cuenta
- **Sensitive:** Sí (deshabilita Development — aceptable para proxies de producción)
- **Entornos:** solo Production

### Registrar en Claude.ai
Settings → Connections → Add custom connector:
- **URL:** `https://mi-proxy-mcp.vercel.app/api/mcp`
- Sin auth adicional — el token va embebido en el proxy

---

## Patrón replicable

Aplica a cualquier proveedor MCP donde se necesiten múltiples cuentas:
- Supabase (múltiples orgs)
- GitHub (múltiples organizaciones)
- Cualquier servicio con MCP en URL única

### Implementaciones activas
| Proxy | Proveedor | Cuenta | URL |
|---|---|---|---|
| `fphs-mcp-proxy` | Supabase | ForumPHs (`qybmxrjwrwurdgddgbnx`) | `fphs-mcp-proxy.vercel.app/api/mcp` |

---

_knowledge/infrastructure/MCP_MULTI_ACCOUNT.md · v1.0 · 2026-05-20_
