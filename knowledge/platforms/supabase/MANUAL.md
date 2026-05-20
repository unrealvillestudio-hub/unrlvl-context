# SUPABASE — Manual de Plataforma
_Categoría: platform_
_Versión: v1.0 · 2026-05-20 · Estado: approved_

---

## QUÉ ES
Base de datos PostgreSQL en la nube con API REST, MCP, Edge Functions y SQL Editor. UNRLVL usa Supabase como backend principal del ecosistema (unrlvl-db) y para proyectos de clientes (ForumPHs cuenta dedicada).

---

## CUÁNDO USAR ESTE MANUAL
- Carga masiva de datos a tablas
- Configurar acceso MCP desde Claude.ai
- Múltiples cuentas/orgs de Supabase en el mismo entorno

---

## LIMITACIONES CONOCIDAS

| Limitación | Causa | Workaround |
|---|---|---|
| MCP `execute_sql` límite ~15K chars por query | Límite práctico del protocolo MCP | Usar SQL Editor del dashboard para cargas masivas |
| Claude.ai no permite dos conectores con la misma URL MCP | Restricción de la UI de Claude.ai | Proxy Vercel con token embebido (ver sección Múltiples cuentas) |
| API key de Anthropic no disponible en bash del container | Entorno aislado de Claude tools | No se puede llamar la API de Anthropic desde bash — solo desde Artifacts |
| Plan Free: sin soporte multi-org nativo | Plan gratuito | Una cuenta por organización, gestionar acceso via tokens |

---

## CARGA MASIVA DE DATOS

### Regla operativa
- **MCP `execute_sql`**: queries puntuales, migrations, SELECTs, INSERTs de <100 filas
- **SQL Editor (dashboard)**: carga masiva — hasta ~500KB funciona sin problema

### Procedimiento SQL Editor
1. Generar archivo `.sql` con INSERTs en **lotes de 100 filas** por statement
2. Abrir archivo con cualquier editor de texto
3. **Ctrl+A → Ctrl+C**
4. Supabase dashboard → proyecto → **SQL Editor** → click en el área del editor
5. **Ctrl+V → Run** (botón verde) o **Ctrl+Enter**
6. **"Success. No rows returned."** = resultado correcto para INSERTs exitosos

### Generación de SQL con Python — función de escape obligatoria
```python
def q(v):
    if v is None: return 'NULL'
    # Escapar newlines ANTES de cualquier otra operación
    s = str(v).replace("'","''").replace('\n',' ').replace('\r',' ').replace('\t',' ').strip()
    return f"'{s}'" if s and s.lower() not in ('none','nan','n/a','-') else 'NULL'
```
Sin este escape, los valores de celda con saltos de línea cortan los rows al escribir línea por línea.

### Validación del SQL generado
```python
# Correcto — ver caracteres reales
with open('output.sql') as f:
    print(repr(f.read()[:500]))

# Incorrecto — contar comas por línea da falsos errores con newlines en valores
for line in f.readlines():
    commas = line.count(',')  # buggeado
```

---

## MÚLTIPLES CUENTAS EN CLAUDE.AI

Claude.ai rechaza dos conectores con la misma URL base (`https://mcp.supabase.com/mcp`) con el error **"this URL already exists"**.

### Solución: Proxy Vercel
Crear un proxy que reenvía requests a la URL original inyectando el token de la segunda cuenta.

```javascript
// api/mcp.js
export const config = { runtime: 'edge' };
const TARGET = 'https://mcp.supabase.com/mcp';

export default async function handler(req) {
  const token = process.env.SUPABASE_TOKEN;
  const headers = new Headers();
  for (const [key, value] of req.headers.entries()) {
    if (!['host', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }
  headers.set('Authorization', `Bearer ${token}`);
  const hasBody = !['GET', 'HEAD'].includes(req.method);
  const upstream = await fetch(TARGET, { method: req.method, headers, body: hasBody ? req.body : undefined });
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('content-encoding');
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
}
```

```json
// vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/api/mcp" }] }
```

**Variable de entorno Vercel:**
- Name: nombre del token (ej: `SUPABASE_FPHS_TOKEN`)
- Sensitive: Sí (deshabilita entorno Development — aceptable)
- Entornos: solo Production

**Registrar en Claude.ai:**
Settings → Connections → Add custom connector → URL del proxy Vercel

### Proxies activos

| Proxy | Org | URL |
|---|---|---|
| `fphs-mcp-proxy` | ForumPHs (`qybmxrjwrwurdgddgbnx`) | `fphs-mcp-proxy.vercel.app/api/mcp` |

---

## ERRORES CONOCIDOS

| Error | Causa | Solución |
|---|---|---|
| "Success. No rows returned." en INSERT | Comportamiento correcto del SQL Editor | No es error — verificar con SELECT COUNT(*) |
| SQL Editor no tiene botón de upload | UI no lo soporta | Copiar y pegar el contenido del archivo directamente |
| Falsos errores de columnas al validar SQL | Validador cuenta comas por línea de texto; los \n en valores cortan filas | Usar repr() para ver contenido real del archivo |

---

## PROYECTOS ACTIVOS

| Proyecto | Org | ID | Uso |
|---|---|---|---|
| `unrlvl-db` | UNRLVL (`tnqcrwmfxesiqxlhuzri`) | `amlvyycfepwhiindxgzw` | Backend ecosistema — 63 EFs, 75 tablas public |
| `forumphs-db` | ForumPHs (`qybmxrjwrwurdgddgbnx`) | `tajuoqdbnsnzkhyqvdgs` | DB dedicada ForumPHs — 1,558 units, 8 PHs |

---

## CHANGELOG

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-20 | Creación inicial — carga masiva, múltiples cuentas MCP, errores conocidos |
