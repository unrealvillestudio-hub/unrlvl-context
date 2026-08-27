# HANDOFF — `unrlvl-mail-mcp` está entregado acá, y no en su repo propio

**Fecha:** 2026-08-27 · **Autor:** CC · **Brief:** `unrlvl-mail-mcp` v1.1 (2026-08-27)

---

## 🟦 Instrucciones para Sam — lo primero

El brief pide un repo nuevo, `unrealvillestudio-hub/unrlvl-mail-mcp`, rama `claude/mail-mcp-init`.
**Ese repo no existe y CC no pudo crearlo.** El contenido completo del repo está entregado en este
mismo PR, bajo `projects/unrlvl-mail-mcp/`, listo para extraer sin editar un solo archivo.

**Qué falta hacer, y es de Sam:**

1. Crear el repo `unrealvillestudio-hub/unrlvl-mail-mcp` (privado, sin README inicial).
2. Extraer el subárbol y publicarlo:

```bash
# desde un clon de unrlvl-context, en la rama de este PR
git subtree split --prefix=projects/unrlvl-mail-mcp -b mail-mcp-export

mkdir /tmp/unrlvl-mail-mcp && cd /tmp/unrlvl-mail-mcp
git init -b main
git pull /ruta/al/clon/de/unrlvl-context mail-mcp-export
git remote add origin https://github.com/unrealvillestudio-hub/unrlvl-mail-mcp.git
git push -u origin main
```

3. Borrar `projects/unrlvl-mail-mcp/` y este archivo de `unrlvl-context` en un PR de limpieza —
   son andamio de traslado, no context files. (Regla §0: se archiva lo que es historia; esto es
   una copia de trabajo con destino declarado, y su historia queda en el PR.)
4. Seguir con `docs/DEPLOY.md` del repo nuevo.

---

## Por qué CC no lo entregó en el repo que pedía el brief

Tres hechos, no una interpretación:

1. **El repo no existe.** `unrealvillestudio-hub/unrlvl-mail-mcp` no aparece en el listado de
   repos accesibles de la organización (7 repos `unrlvl-*`: `iid-functions`, `context`, `blog`,
   `ops`, `supabase-mcp`, `meta-mcp`, `shopify-mcp`), y adjuntarlo devuelve
   *«repository not found, or this session's GitHub credential doesn't have access to it»*.

2. **CC no puede crear repos en esta sesión.** El alcance de GitHub está limitado a los
   repositorios adjuntos; la creación de repositorios nuevos queda fuera.

3. **La rama designada de la sesión es de `unrlvl-context`.** La sesión se abrió con
   `unrealvillestudio-hub/unrlvl-context` → `claude/mail-mcp-init-cn7485`, con instrucción
   explícita de no pushear a otra rama sin permiso.

Ante eso hay dos salidas: no entregar nada hasta que exista el repo, o entregar el trabajo
completo donde sí se puede y dejar el traslado listo. CC eligió la segunda: el código no cambia
por el destino, y el paso que falta es de Sam de todos modos (crear el repo). Nada de lo entregado
depende de dónde viva.

---

## Qué hay dentro

```
projects/unrlvl-mail-mcp/
  app/api/mcp/[transport]/route.ts   handler MCP — 3 tools, todas de lectura
  lib/tools.ts                       las tres tools, con ToolDeps inyectable
  lib/db.ts                          rol mail_mcp (NO service_role): SELECT + resolve_credential
  lib/folders.ts                     INBOX/SENT/SPAM — papelera excluida, fail-loud
  lib/errors.ts  lib/log.ts          códigos fail-loud · logging sin contenido
  lib/providers/                     mapa de adaptadores + google_oauth (Gmail, GET-only)
  db/migrations/001..003             DDL — las aplica Sam
  tests/                             29 tests, sin red ni DB
  docs/DEPLOY.md                     pasos manuales de Sam
  docs/TEST_MARCA_N1.md              test de la marca N+1 respondido
  CLAUDE.md  .github/CLAUDE.md       gobernanza + bloque puntero multimarca byte-idéntico
```

**Verificado antes de entregar:** `npm run typecheck` limpio · `npm test` 29/29 · `npx next build`
limpio.

---

## Dos correcciones al brief, con evidencia (`CC_PROTOCOL` §9)

1. **La FK a brands.** El brief dice `REFERENCES public.brands(brand_id)`. `public.brands` no tiene
   columna `brand_id`; su PK es `id text`. La convención viva del ecosistema es
   `brand_id text REFERENCES brands(id)` — 32 constraints la usan, dos de ellas desde otro schema
   (`intel.iid_agents`, `shopify.stores`). Se siguió la convención verificada. Los tipos coinciden:
   no hubo cast forzado, no hubo motivo para detenerse.

2. **El nombre del trigger.** El brief dice `update_brand_oauth_tokens_updated_at`. El real es
   `trg_brand_oauth_tokens_updated_at`. Irrelevante para el `DROP` —cae con la tabla— pero un
   nombre inventado circulando vuelve como hecho.

## Un barrido que quedó incompleto — acción para Sam

El brief §7 pide grep de `brand_oauth_tokens` en los 16 repos vía proxy `gh` antes de proponer el
`DROP`. CC verificó dos: `unrlvl-context` (1 hit, y no es código:
`brands/UnrealvilleStudio/docs/UNRLVL_Labs_Strategy.html:1027`, un ítem de una lista de plan) y
`unrlvl-meta-mcp` (cero hits). Los demás quedaron sin barrer: el alcance de GitHub de la sesión es
un repo por vez, y el proxy de egreso devuelve **403 en CONNECT** contra el dominio de Vercel, así
que `api/gh.js` tampoco estuvo disponible.

**El `DROP` no se aplica hasta cerrar ese barrido.** Está entregado como
`db/migrations/003_drop_brand_oauth_tokens.sql`, con la verificación hecha, la que falta declarada
en su cabecera, y una salvaguarda que aborta la transacción si la tabla dejó de tener 0 filas.
