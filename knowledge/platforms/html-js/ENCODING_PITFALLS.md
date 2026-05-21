# HTML/JS Encoding Pitfalls
_Actualizado: 2026-05-20_

## Limpieza de scripts Python — caracteres españoles

Al limpiar emojis o non-ASCII de bloques `<script>` con Python usando `errors='replace'`, los caracteres españoles también se corrompen:
- `á é í ó ú` → espacios o `?`
- `ñ` → `?`
- `¿ ¡` → eliminados

### Solución
- Usar `errors='replace'` **solo** en bloques `<script>`, nunca en HTML visible
- Después de cualquier limpieza, verificar: `á`, `é`, `ó`, `ú`, `ñ`, `¿`, `¡`
- Alternativa: reemplazar emojis con entidades HTML (`&#x1F3E0;`) antes de insertar en scripts
- En template literals JS, usar entidades HTML: `&aacute;` `&eacute;` `&iquest;` etc.
