# Session Log — UnrealvilleStudio

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.


## 2026-08-27 — El MCP de correo de punta a punta, y tres MCPs del ecosistema que estaban en internet sin autenticación

**El carril no fue el problema de hoy.** Se construyó el MCP de correo de clientes completo —schema,
rol, repo, migraciones— y en el camino se encontró que **tres MCPs del ecosistema no autentican a
nadie**.

> Verificado contra producción el **2026-08-28** con `execute_sql`, `get_advisors` y la API de Vercel
> (HRD-R13: una lectura de estado caduca dentro de la misma sesión). Donde el brief y la medición
> discrepan, **manda la medición** y la discrepancia se anota, no se corrige a mano.

### `unrlvl-mail-mcp` — el MCP de correo, de punta a punta

MCP de **correo de clientes, sólo lectura**. Tres tools: `list_brand_mailboxes`, `search_messages`,
`get_message`. Carpetas `INBOX` / `SENT` / `SPAM`, **papelera excluida**, **sin persistencia del
contenido** de los mensajes.

**Schema `mail`, aislado a propósito.** Dos tablas y una función:

- `mail.mailboxes` — un buzón por marca y dirección. `brand_id text REFERENCES public.brands(id)`:
  el brief decía `brands(brand_id)` y **esa columna no existe** — la PK de `public.brands` es
  `id text`, y la convención del ecosistema (32 constraints vivas, dos de ellas desde otro schema)
  es `brand_id text REFERENCES brands(id)`. Se siguió la convención verificada, no el nombre
  supuesto.
- `mail.authorizations` — el documento firmado por el titular. **El papel firmado deja de ser
  archivo y pasa a ser compuerta:** sin una fila viva (`revoked_at IS NULL`), `resolve_credential`
  **no devuelve token**. `ON DELETE RESTRICT`: la trazabilidad de quién autorizó qué no es
  descartable.
- `mail.resolve_credential(uuid)` — `SECURITY DEFINER` con `search_path` fijo, para no repetir la
  deuda `function_search_path_mutable`. **Único camino al token.** Fail-loud:
  `MAILBOX_NOT_AUTHORIZED` / `MAIL_CREDENTIAL_UNRESOLVED`.

**`provider` va SIN CHECK, y es deliberado.** El precedente es `iid_content_queue_angle_check`, que
enumeró ocho ángulos en el esquema, **bloqueó el primer run diverso del 25-ago** y hubo que
eliminarlo (HRD-R12). El mapa de adaptadores vive en el código (`lib/providers/index.ts`), explícito
y con fail-loud `MAIL_PROVIDER_UNSUPPORTED` sobre lo desconocido.

**Rol dedicado `mail_mcp`, y no `service_role`.** El motivo es radio de daño: `service_role` la
tienen **~15 Edge Functions**; si las credenciales de buzón fueran legibles con esa clave, el radio
sería **todo el carril**. Con el `REVOKE` sobre el schema, esas 15 EFs no pueden leer `mail`
**porque no tienen permiso**, no porque una política se lo pida.

**`mail` NO figura en *Exposed schemas*** — queda fuera de la API REST de Supabase.

**Medido en producción el 2026-08-28:**

| Comprobación | Resultado |
|---|---|
| Schema `mail` | aplicado · **2 tablas** |
| Funciones `SECURITY DEFINER` en `mail` | **1** |
| Rol `mail_mcp` | **existe** |
| `has_schema_privilege('service_role','mail','USAGE')` | **`false`** |
| `has_schema_privilege('anon','mail','USAGE')` | **`false`** |
| `has_schema_privilege('authenticated','mail','USAGE')` | **`false`** |
| `mail.mailboxes` | **0 filas** |
| `mail.authorizations` | **0 filas** |

**El aislamiento no es una intención: es un permiso.** Y las dos últimas filas dicen lo otro que hay
que decir — **el sistema está completo y todavía no tiene un solo buzón dado de alta**.

**Límite honesto y declarado:** esto aísla del plano de aplicación, **no del titular del proyecto**.
El rol `postgres` y el editor SQL del panel siguen alcanzando `mail`. Eso es Sam, y es aceptable.

**Repo propio.** `unrealvillestudio-hub/unrlvl-mail-mcp`, extraído de `unrlvl-context` con
`git subtree split`, **30 archivos** en la raíz. Verificado: el repo existe, es privado,
`pushed_at 2026-08-27T23:34:36Z`.

### 🔴 SEC-01 — Tres MCPs sin autenticación en código

`unrlvl-supabase-mcp`, `unrlvl-meta-mcp` y `unrlvl-shopify-mcp` **no leen ninguna cabecera de
credencial**: van de `req.json()` a `handleRpc` a `callTool` **sin tocar `req.headers`**. Los tres
declaran `Access-Control-Allow-Origin: *`.

| MCP | Tools que **mutan** | Cuáles |
|---|---|---|
| `unrlvl-supabase-mcp` | **3** | `execute_sql`, `apply_migration`, `deploy_edge_function` |
| `unrlvl-meta-mcp` | **9** | publicación y gestión de ads / IG / FB |
| `unrlvl-shopify-mcp` | **4** | escritura sobre las tiendas |

**Agravante sistémico:** en la misma DB que alcanza `execute_sql` viven **`shopify_stores` y
`meta_accounts`, con los tokens de los otros dos**. Un solo endpoint abierto no expone un MCP:
expone los tres.

**⚠️ Discrepancia con el brief, medida el 2026-08-28, y es buena noticia.** El brief declara
`unrlvl-supabase-mcp` con `passwordProtection: false`, `ssoProtection: false`, `trustedIps: false`
—*cero protección en código y cero en infraestructura*—. Medido en la API de Vercel, **los cuatro
proyectos MCP tienen `ssoProtection: true` (`all_except_custom_domains`)**, `unrlvl-supabase-mcp` y
`unrlvl-mail-mcp` incluidos: **la mitigación inmediata que pedía el brief ya está aplicada**.

**Lo que eso no arregla, y por eso SEC-01 sigue abierto:**

1. El código **sigue sin leer una sola cabecera de credencial**. La casilla de Vercel es una puerta
   delante de la casa; la casa sigue sin cerradura.
2. `all_except_custom_domains` **no cubre un dominio propio**. El día que uno de estos MCPs reciba un
   dominio, la protección desaparece **sin que nadie toque nada**.

**El cierre correcto sigue siendo MCP-AUTH-01 extendido a los tres.**

### 🔴 SEC-02 — `unrlvl-meta-mcp/api/upload.ts`

Segundo endpoint público sin autenticar. Sube archivos arbitrarios al bucket `unrlvl-media` con la
**`SERVICE_ROLE_KEY`** y **`x-upsert: true`**, y acepta una **`url` remota que el servidor
descarga**: vector **SSRF**, más **sobrescritura de assets de marca** en `brand/{brand_id}/`.
`x-upsert: true` es lo que convierte una subida en un reemplazo silencioso.

### 🟠 MCP-AUTH-01 — entregado, sin cerrar

Rama `claude/mcp-auth-01-cxzbrs`, commit `0decb6e`, **44 tests en verde**. Pendiente: **merge** ·
`MCP_AUTH_TOKEN` en Vercel · **deploy** · **verificación de 401**. Hasta el 401 verificado, el patrón
está escrito y no está en pie.

### Entidad legal — lo que decían las páginas públicas

Las páginas legales de `unrealvillestudio.com` del **28-abr** identificaban al responsable del
tratamiento como **«Unrealville Studio LLC», entidad que no existe**, y estaban **huérfanas**: **cero
`href` desde ambos footers**. Un documento legal que nadie puede alcanzar no protege a nadie, y uno
que nombra una entidad inexistente tampoco. Se sustituyen por **Samuel Moreno Mendoza, empresario
individual**. PR en curso en `CoreProject`; el mismo PR borra `legal/a`, un archivo basura de 3 bytes
(commit `3a03a9f`).

**Sin LLC ni nombre ficticio registrados en Florida**, Sam firma **como persona física** documentos
con **cláusula de indemnidad** que dan acceso a buzones de clientes. No es una observación de estilo:
es quién responde si algo sale mal.

**Representante en la UE (art. 27 RGPD) — retirado, con su condición de reapertura escrita.** Las
marcas con mercado España declaradas en `ecosystem.json` no tienen entidad legal, contrato ni
servicio prestado por UNRLVL. La consulta que **reabre** el ítem:

```sql
select brand_id, market from public.brands
where market ilike '%espa%' or market ilike '%europ%' or market ilike '%EU%';
```

Si alguna de esas filas pasa a tener **contrato firmado o canal de venta activo**, el ítem **se
reabre**.

### Google Cloud — proyecto nuevo `unrlvl-mail-mcp`

Project number **`212509698390`**, **sin organización**, cuenta `unrealvillestudio@gmail.com`.
**Gmail API habilitada** · pantalla de consentimiento **External** creada · scope **`gmail.readonly`**
declarado · **OAuth Client ID creado** (Web application, redirect `http://localhost:8080/`).
**Publicación en Production PENDIENTE** de que las páginas legales estén vivas — el orden no es
burocrático: Google pide las URLs y tienen que resolver.

> El **client secret no está en ningún archivo de este repo, ni lo estará**. Tampoco la contraseña de
> `mail_mcp` ni el `MCP_AUTH_TOKEN`. El **Client ID sí** puede aparecer: no es secreto.

### 📊 Lo medido contra lo declarado

| Objeto | Medido (2026-08-28) | Brief |
|---|---|---|
| `professor_learnings` · `session_date = 2026-08-27` | **24**, los 24 aprobados, en **dos lotes de 12** (17:17:51 y 23:49:52 UTC) | 12 ⚠️ |
| `unrlvl-supabase-mcp` · `ssoProtection` | **`true` (`all_except_custom_domains`)** | `false` ⚠️ |
| `unrlvl-mail-mcp` · `ssoProtection` | **`true`** — mitigación ya aplicada | (pedida) ⚠️ |
| `unrlvl-meta-mcp` / `unrlvl-shopify-mcp` · `ssoProtection` | `true` | `true` ✅ |
| `unrlvl-db` · advisors de seguridad | **16 ERROR · 39 WARN** (+10 INFO) | 16 · 39 ✅ |
| Repo `unrlvl-mail-mcp` · archivos en raíz | **30** | 30 ✅ |

**Los 24 learnings no son un error del brief:** hubo **dos cierres de Professor** en el mismo
`session_date`, de 12 cada uno. El brief contó el suyo. No hay learning perdido ni duplicado.

### ✅ Corrección de una cifra de AGENDA — `unrlvl-db`

Donde el bloque del **26-ago** dice *«4 ERROR-level en `unrlvl-db`»*, la remedición con
`get_advisors` da **16 ERROR y 39 WARN**. **El dato viejo no se borra: se anota la remedición con su
fecha.**

- **12 vistas `SECURITY DEFINER`** en `public`: `v_client_terms_vigente`, `v_cost_unified`,
  `v_iid_piece_cost`, `v_iid_funnel`, `v_model_efficiency`, `v_cost_por_dimension`, `v_rate_gaps`,
  `v_cost_pivot`, `v_reconciliacion`, `v_cost_by_brand_lab`, `v_client_margin`,
  `v_cost_residual_vigente`.
- **4 tablas `ops_*` sin RLS**: `ops_client_terms`, `ops_rate_transitions`, `ops_credits`,
  `ops_cost_residual`.
- **39 WARN**: 23 `function_search_path_mutable` · 8 `anon_security_definer_function_executable` ·
  6 `authenticated_security_definer_function_executable` · 2 `extension_in_public`.

### Abre

**🔴 Rojos**

- **SEC-01** — los tres MCPs sin autenticación en código. Mitigación aplicada, **cierre pendiente**.
- **SEC-02** — `upload.ts` público con `SERVICE_ROLE_KEY`, `x-upsert: true` y SSRF.

**🟠 Naranjas**

- **MCP-AUTH-01** — merge, `MCP_AUTH_TOKEN`, deploy, **verificación de 401**.
- **Páginas legales** — PR en curso en `CoreProject`.
- **Sin entidad registrada en Florida.**
- **Alta del conector** — `unrlvl-mail-mcp` no está dado de alta en Claude.ai. **Sin ese paso el
  sistema está completo y es inútil.**
- **Publicación en Production** del proyecto de Google Cloud, atada a las páginas legales.

**🟡 Amarillos**

- `003_drop_brand_oauth_tokens.sql` — PR propio. Barrido cerrado: **31 repos, cero referencias**;
  cero FK, cero vistas dependientes; **0 filas**.
- **PR de limpieza** — sacar `projects/unrlvl-mail-mcp/` y `projects/UNRLVL_MAIL_MCP_HANDOFF.md` de
  `unrlvl-context`. Son **andamio de traslado, no context files**: su historia queda en el PR.
- `MCP_AUTH_TOKEN` en el entorno de `unrlvl-mail-mcp`, pendiente del merge.
- `legal/a` — 3 bytes, se borra en el PR legal.

> **Los rojos y naranjas del carril siguen abiertos y no se tocaron hoy** — P1 `judged_source` NULL,
> P2 las tres reglas con falso positivo medido, P3 `IID_FANOUT_EMPTY`, P4 el fan-out sin proveedor,
> P5 el adaptador que no lee el genoma. Su detalle íntegro está en el bloque del 26-ago de
> `AGENDA.md` y en `IID/session_log.md` (2026-08-26).

---

## 2026-08-26 — UnrealvilleStudio entra al Scheduler · de 14 agentes a 6

**Segunda marca del ecosistema en entrar al Scheduler**, cuatro días después de ForumPHs.
`rollout_started_at = 2026-08-26`, `max_rotation_weeks 3`.

> Verificado contra producción el 2026-08-27 con la herramienta (HRD-R13). Detalle del carril en
> `IID/session_log.md` (2026-08-26).

### Sembrado

- **`intel.brand_publish_channels` — 4 canales:** `meta_fb`, `meta_ig` y `blog` activos; **`linkedin`
  INACTIVO** por decisión de Sam del 2026-08-26 — *LinkedIn queda fuera para **todas** las marcas
  hasta segunda orden*. No es falta de dominio ni de contenido: **falta la app de organización con
  permiso de publicación y su token**, que no pasa por Meta MCP porque es API propia.
- **`intel.brand_cadence` — 12 filas** (4 plataformas × 3 fases). El blog arranca `1x_week` con
  **techo 7 y no 3**: 6 rotativos sobre R=1 dan 6,0 semanas por turno.
- **`intel.brand_topic_platform_mode` — 24 filas**, el volumen mayor de las tres marcas.
- **Ángulos en los 6 dominios activos:** `ai-cognition-tech` (`pregunta · contraste · consecuencia ·
  dato`) · `ai-industrialization` (`secuencia · consecuencia · contraste · dato`) ·
  `algorithm-mechanics` (`artefacto · secuencia · expertise · dato`) · `brand-voice-systems`
  (`artefacto · expertise · contraste · objecion`) · `cro-psychology` (`pregunta · consecuencia ·
  contraste · objecion`) · `signal-learning-loops` (`secuencia · artefacto · pregunta · dato`).
  **`system-proof` sigue `active = false` y sin ángulos** — no se tocó.
- **`theme` VOID SYSTEM y `fonts_href`** en `config` del canal `blog`, de
  `BluePrints/brands/Unrealville/BP_BRAND_UNRLVL_v1.3.json`: `void` `#080808` = fondo, `carbon`
  `#0F0F0F` = superficie, `chalk` `#F2F0EC` = texto, **`cyan` `#00FFD1` = único acento**; Bebas Neue
  display, Libre Baskerville cuerpo, Space Mono etiquetas. **`warn` no existe en el BP** y queda
  como default declarado, no inventado.
- **`blog_label` es *Field Notes*; `blog_path` es `/blog`.** Desacoplados a propósito: el rótulo es
  de marca, la ruta es URL indexada.

### De 14 agentes a 6

**8 agentes fantasma eliminados.** Verificado: `intel.iid_agents` con `brand_id =
'UnrealvilleStudio'` devuelve **6 filas, las 6 activas** — `UNRLVL-AI-COGNITION-TECH`,
`UNRLVL-AI-INDUSTRIALIZATION`, `UNRLVL-ALGORITHM-MECHANICS` (tier2), `UNRLVL-BRAND-VOICE-SYSTEMS`,
`UNRLVL-CRO-PSYCHOLOGY` y `UNRLVL-SIGNAL-LEARNING-LOOPS`. Uno por dominio activo, sin sobrantes.

### Primer memo íntegro

`UNRLVL-AI-COGNITION-TECH`, 2026-08-26 **23:33:33 UTC**: **24.897 caracteres**,
`stop_reason = 'end_turn'`, `truncated = false`, `max_tokens = 16000` (`base`).

**Y el rastro del costo, que es de esta marca:** `UNRLVL-SIGNAL-LEARNING-LOOPS` corrió **tres veces**
—18:05:59 truncada con `max_tokens` NULL, 19:01:10 truncada con `5200` de `agent`, 19:03:06 íntegra
con `16000` de `base`—, y `UNRLVL-AI-COGNITION-TECH` corrió truncada a las 23:06:56 antes de la
buena. **De ahí sale HRD-R14.**

### Corregido fuera del repo

Firma canónica de UNRLVL en el tema Shopify de NSCF: `snippets/unrlvl-signature.liquid`, checksum
final `51c2af2e…`, y dirección **12951 Biscayne Blvd, Suite 1 · North Miami, FL 33181** en
`sections/nc-footer.liquid`.

> ⚠️ **Divergencia anotada, no corregida.** `brands/UnrealvilleStudio/brand.json` declara
> `contact.hq.display` como `12951 Biscayne Blvd · North Miami, FL 33181` — **sin `Suite 1`**. El
> tema de NSCF ya lo lleva. No se toca el `brand.json` sin Sam: el número de suite es dato legal, no
> redacción.

### Abre

- 🟠 **El drenaje no atiende `vercel_html`.** El canal `blog` está activo, pero el sitio **debe
  renderizar desde la DB** como hace `forumphs.com`, y **ese mecanismo falta en WebLab**. Sembrar el
  canal no lo crea.
- 🟠 **`linkedin` inactivo** hasta que exista la app de organización con su token.
- 🟡 **`Suite 1` en `brand.json`** — decisión de Sam.

---

## 2026-08-18 — REVISABLE SI: condición de reapertura

**Sesión Sam × Claude.ai.** Origen: evaluación de un documento externo (Growth Origin, *"Dos IAs, una carpeta"*). De cinco piezas candidatas sobrevivió **UNA**; el resto se descartó por reconstruir el destino prohibido *"todos lo leen siempre"* (`ARQUITECTURA` regla dura 3) o por existir ya en forma superior.

### INSTALADO (PR #47, mergeado)
`skills/context-resolver/SKILL.md` **v1.1 → v1.2**.
- **§2-bis REVISABLE SI — condición de reapertura**, con **filtro duro** (solo se acepta si la condición es una CONSULTA EJECUTABLE contra la fuente; si no se puede formular, no se escribe) y **pregunta obligatoria ítem por ítem** al proponer cierre.
- **§3 paso 10-bis** extiende alcance a ítems **CERRADOS** con el campo: si la consulta dispara, el ítem se **REABRE**.
- **§10** dos líneas nuevas de checklist.

### POR QUÉ IMPORTA
El paso 10-bis verificaba solo lo abierto. Ahora verifica también lo cerrado. **Cero artefactos nuevos** — extiende un procedimiento que ya corre en cada Actualiza, que es lo que evita que sea Professor otra vez.

### DESCARTADO CONSCIENTEMENTE (no pendiente)
La **contra-tesis antes del eje fundador**. No hay marca a punto de sellar eje; se escribe cuando haya caso real, misma política que `voice-editorial` y `voice-professional` en INDEX.

### PROFESSOR
2 learnings, ambos aprobados por Sam.
- `87b51779` — REVISABLE SI · governance · rs 5
- `275ba2af` — evaluación de método externo · governance · rs 4

### NO SE TOCA
- **`AGENDA.md`:** nada quedó abierto, y AGENDA es solo ítems abiertos + decisiones pendientes.
- **`ecosystem.json`:** cero cambio estructural; tocarlo obligaría a regenerar `ecosystem.md` y `ecosystem_filemap.md` por nada.

## 2026-08-13 — Posicionamiento y web pública: tesis canónica de marca

**Sesión de posicionamiento y web pública (Sam × Claude.ai + CC).** Este PR sólo toca context files de `unrlvl-context`; el código de la web vive en `CoreProject` (PR #3, rama `claude/brand-thesis-line-izafos`). CC no mergea — Sam revisa, mergea y borra la rama.

### 1. Tesis canónica de marca — sellada
- **EN:** _Brand is not how a business looks. It's how it works._
- **ES:** _Marca no es cómo se ve un negocio. Es cómo funciona._
- Nació de **descartar** la ampliación del tagline a "Business and Brand Intelligence Infrastructure": el problema era **comprensión, no alcance**; la corrección va en la **línea posterior, nunca dentro del nombre**.

### 2. Discurso comercial — arquitectura fijada
- Eje: **continuidad sin dependencia** (el contenido es una salida, no el eje).
- Seis reglas duras de ejecución + cierre binario de tres preguntas.

### 3. Regla multimarca — tensión resuelta
- El propio posicionamiento violaba la regla multimarca en **lectura estrecha de "Brand"**; resuelto por la **acepción amplia** (marca = identidad de negocio). El **test de la marca N+1 resultó aplicable a artefactos no-código**.

### 4. Web pública — PR #3 en `CoreProject` (`claude/brand-thesis-line-izafos`)
- Tesis instalada en **4 puntos × 2 idiomas** de unrealvillestudio.com: hero (clase `.hero-thesis` + animación GSAP) · `meta description` + `og:description` · card w3 de `#why-unrlvl` · footer.
- Corrección del **delay del cursor custom** (`.12` → `.42`).

### 5. Decisiones conscientes de Sam (no pendientes)
- KPI ficticios del bloque analytics se **conservan** hasta tener números publicables (momento que fija Sam).
- "Vizos Salon" en la demo PSY y "SiteLab (Coming)" se dejan tal cual.
- Cursor custom se conserva; **solo se corrige el arrastre**.

### 6. Deuda abierta registrada
- **Exportabilidad del genoma** (destilado en prosa + cláusula de salida) como prerequisito antes de usar el pitch de continuidad con un tercero.

### 7. Hallazgo de gobernanza
- CC operó con `CC_PROTOCOL.md` **bloqueado por egress**, sostenido solo por el bloque de `.github/CLAUDE.md`.

### Notas
- Cifra de trayectoria canónica confirmada: **+30 años**.
- **8 learnings** en `professor_learnings`.

## 2026-08-09 — Política de idioma aplicada

Normalizado a `es`/`en` neutro internacional. Sin regionalismos, sin spanglish. Marca **bilingüe**: **EN primero, ES después** en todo, incluidas las firmas; ES y EN se generan por separado desde origen, nunca se traduce uno del otro.

Firma `unrlvl_default` con variante `text_en` (idéntica a ES): `❯ Unrealville Studio`. La estampa el sistema tras el PASS del Watcher; el copy nunca la escribe.

_(Entrada del tramo 3 de la sesión 2026-08-09, registrada el 2026-08-13 tras el merge de los PRs #40 y #41; ubicada en su lugar cronológico, bajo el bloque 2026-08-13.)_

## 2026-08-08 — Regla multimarca, grafía v1.3, voz editorial NSCF y cableado de voces

**Sesión larga (Sam × Claude.ai + CC). Tres frentes cerrados.** Bloque ecosistémico al tope; el detalle por marca vive en `brands/NeuroneSCF/session_log.md` y `brands/ForumPHs/session_log.md`. Este PR sólo toca context files de `unrlvl-context`; el código de los ejes multimarca vive en el repo del carril (PR mergeado + DDL post-merge aplicado por Claude.ai). CC no mergea — Sam revisa, mergea y borra la rama.

### 1. REGLA MULTIMARCA — inviolable, instalada en 16 repos
`protocols/MULTIBRAND_RULE.md` creada. El EJE va en el CÓDIGO, la INSTANCIA en el DATO. Corolario: que hoy una sola marca use un eje NO lo convierte en suyo. Test de la marca N+1 obligatorio en todo brief y PR que produzca código, migración o siembra. CC puede DETENERSE ante un brief que hardcodee marca — un brief de Claude.ai no es autorización. Campo `MULTIMARCA:` añadido al reporte de CC_PROTOCOL §4. Bloque puntero en `.github/CLAUDE.md` de los 16 repos, byte-idéntico.

### 2. EJES MULTIMARCA DEL CARRIL — PR mergeado + DDL aplicado
Cuatro de los cinco casos del anexo §9 pagados:
- `voice_by_destination` pasa a claves libres (`Object.keys`) en `iid-core/fanout.ts`.
- `max_tokens` y `format_instruction` salen del ternario y viven en `content_type_registry` por `(content_type, voice_id)`, con `DESTINATION_TO_CONTENT_TYPE` y cascada voz → catálogo → default. Motivo: 640 tokens truncaban un carrusel de 7 láminas (~950).
- `EMAIL → CANAL_NONE` en `CANAL_BY_PLATFORM`. Sin esto cada email caía a `INSTAGRAM_FEED` y generaba imagen: 58,7% del coste por pieza en la superficie donde además daña entregabilidad.
- `AUDIENCE_FRAMES` migrado al eje del PODER sobre la contratación: `decide` / `influye` / `general`, con alias legacy `jd` / `doliente`, espejado en `content-watcher` gate 7.

**DDL post-merge aplicado por Claude.ai:** CHECK de `intel.brand_topics.audience_frame` ampliado a los cinco valores; 18 filas de ForumPHs migradas (`jd→decide`, `doliente→influye`). Quinto caso pendiente: `OBJECTIVE_LABEL_TO_TAG`, PR propio.

### 3. GRAFÍA DE MARCA — `>UNREALVILLE` (BP v1.3)
El chevron pasa al frente. No fue estético: en `Unreal>ille` el chevron ocupaba el lugar de la `v` y el nombre escrito no contenía su propia pronunciación. Forma anterior DEROGADA. STUDIO en chalk 32%, alineado a la línea base. Prosa: `Unrealville Studio`, sin chevron. Regla Markdown: inline o escapado; el backslash es escape de archivo, nunca parte del nombre. Barridos completados por CC en `unrlvl-context`, `CoreProject`, `BluePrints` y `WebLab`. BP JSON declarado FUENTE, HTML como RENDER.

### 4. NSCF — voz editorial calibrada y 100% operativa
`nscf_editorial` v1.0 activa. Bucle Boids de 10 turnos en chat, convergida (últimos 3 SÍ). Eje reescrito 3 veces en vivo. Construcción propia hallada: **par cerrado con llave de diagnóstico**. 4 topics de blog sembrados en AUTHORITY. Fila propia en registry y compat. La sesión `nscf_professional` queda EN PAUSA por decisión de Sam hasta que PO tenga lista esa línea de negocio.

### 5. FORUMPHS — posición ratificada con Ivette y reparto de topics
La voz publica el ESTÁNDAR, nunca instrumenta al lector: se publica la pregunta, jamás la carta. Asistir a propietarios convertiría a la marca en parte del conflicto. Los 18 topics revisados: 9 `decide` en conversión; de los 9 `influye`, 7 reclasificados a `fphs_educativa` porque su ángulo ya era educativo; 2 quedan en conversión. Sesión `fphs_conversion` reactivada (`abandoned` → `active`) con eje de 13 claves, lista para arrancar.

### 6. CABLEADO DE VOCES — 14 filas
`content_type_registry` y `creative_compatibility_rules` para `nscf_editorial`, `nscf_conversion`, `fphs_editorial` y `fphs_educativa`. Corregidas por criterio de Sam las de `fphs_educativa`: educar por pedagogía no es UNRLVL; educar como estrategia sí.

**PENDIENTES:** `fphs_conversion` sin calibrar (11 topics, 0 filas) · `OBJECTIVE_LABEL_TO_TAG` · `po_consumer` activa con 0 topics (decisión: no hacer nada) · SVG/PNG de BluePrints con grafía derogada (los regenera Sam) · dos carpetas duplicadas `brands/Unrealville/` y `brands/UnrealvilleStudio/` · hueco de frecuencias NSCF · header del blog NSCF.
**PRÓXIMO GRUPO DE CALIBRACIÓN:** patriciaosorio.com + PatriciaOsorioConectando, D7Herbal, VizosSalón.

---

## 2026-08-04 · CopyLab — el motor de voz nunca había leído los genomas

**Conducido por:** Claude Opus 4.8 (chat, diagnóstico + decisiones + DB directa) + Claude Code (ejecución de PRs y verificación).
**Foco:** cerrar la cadena de CopyLab que dejaba salir copy sin voz de marca, trasplantar los guardarraíles al carril real (`/api/execute`), y verificar en producción. **PRs #16–#22, todos mergeados y verificados.** Este PR de contexto (`unrlvl-context`) sólo actualiza los context files; el código vive en el repo de CopyLab.

### Lo más importante: el motor de voz nunca había leído los genomas (B0)

`buildCopyPrompt` **no inyectaba el genoma**. El generador armaba el prompt sin el genoma de la marca, así que ninguna de las **10 voces activas** salía con su voz — todas producían un genérico de marca-cero. No era un caso borde: era el estado por defecto de las 10. El cuadro de voces confirmó el alcance (10/10 sin genoma en el prompt). Reparado y verificado voz por voz.

### Tres fallos que se apilaban encima del inyector roto

1. **El tipo mentía.** El `content_type` se registraba mentido: **toda pieza caía en `social_post`**, sin importar destino ni plataforma. `creative_compatibility_rules`/`aggroByType` juzgaban entonces sobre un tipo falso. Fix: registro de `content_type` con **doble eje** (destino × plataforma) + precedencia por voz (`voice_id`) en compatibilidad.
2. **El template corría contra el genoma.** El bloque de canal no existía como tal: el template resolvía contra el genoma en vez del canal real. Fix: **bloque de canal real, 17 `canal_blocks` activados** + sustitución de variables de template (18 templates afectados; las variables ya no salen crudas).
3. **La UI nunca pasaba por `/api/execute`.** Toda la disciplina de `buildCopyPrompt` (geomix, CTA por canal, compliance ordenado, personas y goals completos, gramática `##` unificada) vivía en un armador que la UI no ejecutaba. Fix: **trasplante de los guardarraíles a `/api/execute`**, que es el carril que la UI sí recorre. `buildCopyPrompt` deja de ser un segundo motor.

### El cache persiste por primera vez desde que existe

El escritor del cache pasó a `service_role`: antes escribía sin permiso efectivo y **no cuajaba** — el cache existía en el esquema pero nunca persistía. Ahora sí.

### Limpieza de motores duplicados

Retirados `src/lib/buildCopyPrompt.ts`, `queries.ts` y el hook `useCopyPrompt` (muerto). Con el trasplante hecho, mantenerlos vivos reproducía el patrón "hay más de un generador dentro de CopyLab".

### Tablas y columnas nuevas (creadas por Claude.ai, fuera de PR)

- **`content_type_registry`** — 15 filas, ahora con `voice_id` y **PK compuesta**.
- **`platform_canal_map`** — 8 filas `organic`.
- **`creative_compatibility_rules.voice_id`** — columna nueva + **2 índices parciales** + trigger.
- **Triggers de integridad** — `validate_compat_voice`, `validate_registry_voice`, `validate_canal_map_content_type`.

### Genoma: `financial_lens`

Se añadió `financial_lens` a `argumentative_architecture` en `lucien_editorial` y `lucien_social`, con **texto idéntico** en ambas voces.

### Smoke verificado

**B4·truth + T10 + AGGRO_3.** El genoma se inyecta, el tipo se registra por su eje real, el canal_block sale del canal y no del genoma; `financial_lens` **no se dispara** cuando no corresponde.

### PENDIENTE — abierto tras esta sesión

- **Consolidación del motor** — `copyEngine` + los **18 templates de CopyPack** por unificar.
- **C / B5 · D / B3 · E** — frentes pendientes del plan CopyLab.
- **⚠️ ADS como sección propia (IMPORTANTE):** ADS es **una fila en el mismo carril, no un carril clonado** — no duplicar el motor.

### Deuda declarada

- **`api/claude.ts`** — conservado hasta el reporte de las **3 sub-tools**.
- **`brand_context_cache` + RPC `upsert_brand_cache`** — huérfanas, **pendiente DROP**.
- **`linkedin` → `WEB`** — fallback forzado con **38 filas**.
- **`meta_fb` y `x`** — sin `canal_block` propio.
- **`build_all=true`** — no funciona en `brand-cache.js`.

---

## 2026-06-17 · #5b VALIDADO end-to-end · contrato de voice afinado · pendientes de calidad de output

**Conducido por:** Claude Opus 4.8 (chat, diseño + decisiones + DB directa) + Claude Code (ejecución de EFs)
**Foco:** correr la corrida real del piloto IID (#5b) hasta el final, destapar y arreglar lo que la cadena completa revelara, afinar el contrato de voice de las marcas, y dejar el motor validado hasta R4B.

### Lo más importante: la cadena completa funciona end-to-end, con 2 piezas en aprobación

RUN4 (final): Lucien (editorial) y UNRLVL (social) sobre el mismo finding real de reasoning **atravesaron los 5 stages** (copylab → aife → imagelab Vertex → sociallab → Watcher), **ambas PASS**, ambas a `awaiting_approval`, y **ambas dispararon email real a content-approval@unrealvillestudio.com**. Sam recibió y revisó los dos emails con botones PUBLICAR/RECHAZAR. Modo c2 respetado: NO se publicó a Meta (la publicación real es fase siguiente, en chat dedicado). El motor IID completo (Builder convergido + 5 stages + Watcher de 6 gates + imagen Vertex + email de aprobación) está validado.

### El piloto destapó 5 fallos ocultos que el dry-run jamás habría encontrado

El dry-run siempre cortaba tras copylab, así que aife/imagelab/sociallab/email nunca se ejercitaban. La corrida real los rompió uno por uno, y los arreglamos en cascada:

1. **Model ID retirado = patrón de ecosistema (24 EFs).** `claude-sonnet-4-20250514` (retirado 15-jun) estaba en `aife-filter` + 9 EFs de flujo vivo (6 iid-*, fphs-chat, brand-context-builder, unrlvl-profiler — todas arregladas a `claude-sonnet-4-6` + hardening labelClaudeError) + 13 one-off (shopify/seo/nscf, en AGENDA). Era la causa del freeze de abril en realidad: el pipeline moría en seco con 404, no solo off-brand.
2. **imagelab apuntaba a fal.ai, no al crédito Google.** El stage estaba hardcodeado a `fal.run/fal-ai/imagen3` salteándose `lab_configs`. CC lo redirigió a `image-lab-unrlvl.vercel.app` (Vertex AI / imagen-3.0 / crédito GCP de Sam). Ahora usa el crédito correcto.
3. **Gate evidence caricaturizado.** Usaba `has_numbers:true/false` para UNRLVL — una caricatura. Reescrito a check semántico vía Claude que evalúa comprensión de la maquinaria, leyendo `proof_mode`.
4. **Email mudo por key cruzada.** `RESEND_API_KEY` era de la cuenta Resend de NeuroneSCF (sin unrealvillestudio.com verificado) → Resend 403 → sin try/catch, fallo mudo. Fix: secret dedicado `RESEND_UNRLVL_KEY` + envío en try/catch. Sam seteó la key. Validado: email llega.
5. **Builder UNRLVL alucina métricas.** Generó "2048 veces/s" (inventado) → REJECT correcto del gate. Fix de procedencia de cifras (3 niveles). RUN4: generó "512 tokens / 96 capas de atención" + "geometría del espacio de embeddings" → PASS.

### Contrato de voice afinado (sin tocar genomas — estaban sanos)

La caricatura "UNRLVL=números / Lucien=sin cifras" vivía en 3 capas encima de un genoma sano. Corregidas en `intel.brand_topics`:
- **proof_mode UNRLVL**: de "show the system doing it now" → "Depth of comprehension IS the proof. Numbers welcome when real, never required, never invented."
- **angle UNRLVL**: técnico-estructural / blueprint, no estadística. La matemática y arquitectura aplicada detrás de lo que el usuario común da por sentado.
- **angle Lucien**: la geometría del pensamiento — qué le exige a un humano trasladar su mente a un sistema sintético; el malnombrar que revela algo sobre nosotros (anclado a su core_move real).
- **Genomas: intactos** (la caricatura nunca estuvo ahí; el genoma UNRLVL pide "specific and verifiable" + léxico de arquitectura).

### Divergencia multimarca confirmada visualmente

Mismo finding (Reasoning Models). UNRLVL: *"calcula la distribución de probabilidad sobre el siguiente token, 512 veces, geometría del espacio de embeddings, 96 capas de atención"* (la maquinaria). Lucien: *"hay una palabra que todos usan y nadie examina... el lugar exacto donde el pensamiento se detiene... confundir el parecido del resultado con la identidad del proceso"* (la geometría del pensamiento). Similitud de cuerpo 0.07. Un humano no los relaciona por el cuerpo.

### Estado de EFs (verificado)

`content-run-stage` v33 (Builder convergido + Watcher + 6 fixes + imagelab Vertex + RESEND_UNRLVL_KEY). `content-dispatcher` v21 (`.limit(1)` intacto). `aife-filter` v15. 9 EFs de flujo vivo en `claude-sonnet-4-6`.

### PENDIENTE — Calidad de output (capa distinta del flujo, que ya funciona)

Sam identificó que el flujo está resuelto pero los outputs necesitan trabajo. A resolver en sesión(es) dedicada(s), NO en este sprint:

- [ ] 🔴 **Title compartido delata a las hermanas.** Ambas piezas usan el title del finding crudo ("Reasoning Models Fundamentally Shift..."). El cuerpo diverge (0.07) pero el title las relaciona — anti-autobaneo comprometido. El Builder debe generar title propio por marca. PRIORIDAD ALTA.
- [ ] 🔴 **Angle de Lucien sobre-especificado = fórmula.** "Geometría del pensamiento" + "malnombrar" se volvió regla dura: Lucien SIEMPRE sale igual, no se ve `psychological` u otras facetas. El angle por-dominio + core_move del genoma se refuerzan en exceso. Rebalancear angle vs genoma para dar rango a Lucien. (Origen: el angle lo escribimos Sam+Claude muy específico; se convirtió en molde.)
- [ ] 🟡 **Email no muestra imagen** (base64 inline stripeado por Gmail) **ni copy completo** (truncado en buildEmail). Fix template: subir imagen a Storage + mostrar copy completo o link.
- [ ] 🟡 **Markdown crudo visible** en outputs (`**> Forward.**` con asteriscos). El render no procesa markdown.
- [ ] 🟡 **resend_id null en la pieza** aunque email_sent=true (se guarda en job, no en pieza). Capturar id de Resend en content_pieces.
- [ ] 🟢 **"> Forward."** confirmado como cierre de marca UNRLVL correcto (chevron = dirección del genoma); solo el formato markdown crudo es el bug.

### PENDIENTE — Infraestructura/limpieza

- [ ] Borrar del dashboard Supabase las EFs efímeras: `model-ping`, `env-probe`, `resend-test` (neutralizadas como stubs 410, falta borrarlas).
- [ ] Barrer `to: sam@unrealvillestudio.com` hardcodeado en otras EFs (SMA FPHs, nscf-mailer, etc.) y decidir cuáles migran a `content-approval@` u otro alias por función.
- [ ] 13 EFs one-off con model ID retirado (shopify/seo/nscf) — deuda de mantenimiento, arreglar cuando se use cada una.
- [ ] **Publicación real (push a Meta)** — fase siguiente, CHAT DEDICADO. Verificar cuentas Meta de Lucien/SamPublisher (no probadas E2E) antes del primer push de cada marca.

### Deuda R4B (Scheduler)

- base64 inline de imagen → subir a Supabase Storage y guardar URL (Gmail stripea; Meta necesita URL hospedada).
- Editorial largo (~8000 chars) recorre stages lento (~90s total) — vigilar timeouts en modo autónomo.
- Gates 2/3 (sibling-window, cadence) pasan de informativos a bloqueantes; gate 1/5 a pgvector; extraer Watcher a EF C2.

### Pendientes IID (orden post-piloto, sin cambios)

- [ ] 🟡 IID propios de Lucien (materia filosófica — hoy inexistentes)
- [ ] 🟡 Destino de los 14 IID-* viejos
- [ ] 🟡 Scheduler R4B
- [ ] 🟡 Quitar `.limit(1)` (cadáveres ya cuarentenados; solo tras publicación validada)

---

## 2026-06-16 · IID Builder Convergido + Watcher LIVE · causa raíz del freeze identificada

**Conducido por:** Claude Opus 4.8 (chat, diseño + decisiones + DB directa) + Claude Code (ejecución de EFs)
**Foco:** ejecutar los pendientes 🔴 — Builder convergido + Watcher — y dejar el motor IID produciendo on-brand y anti-spam antes de la corrida real.

### Lo más importante: el freeze de abril tenía una cuarta causa que nunca diagnosticamos

El pipeline IID no estaba solo "off-brand desde abril" — estaba **muerto en seco**. El model ID `claude-sonnet-4-20250514` hardcodeado en `content-run-stage` se retiró (deprecación 15-jun-2026) → la llamada a Claude daba 404 → el pipeline moría en stage 1 (copylab). Los 3 bugs de brand/voice/genoma eran reales pero **secundarios**. Reemplazo verificado con ping HTTP 200 real: `claude-sonnet-4-6`.

### Key achievements

- **Builder Convergido LIVE** (`content-run-stage` v25→v31, cirugía in-place A1). `callClaudeDirect` → `generadorLocal`: lee `intel.brand_topics` + `brand_voice_genome`, resuelve marca + voz **híbrida** (format manda, plataforma desempata), inyecta genoma + ángulo + hard_rules, **mató el fallback silencioso `?? "UnrealvilleStudio"`**, persiste `voice_id` real.
- **Watcher LIVE** (stage 5, decisión C1). 6 gates modulares, gate previo a `awaiting_approval`, tabla `intel.watcher_log` auditable.
- **Guard dry-run** (`assets.builder_input.dry_run`) — corta tras copylab sin cascada/email/publish.
- **`intel.brand_topics.angle` de LucienSael/ai-cognition poblado** (era null — blocker del caso multimarca).

### Divergencia multimarca VALIDADA objetivamente

Mismo tema `ai-cognition`: Lucien (editorial, filosófico) vs UNRLVL (social, técnico). **Similitud semántica: 0.07** (umbral REJECT 0.80). Duplicado forzado: **1.0** → rechazado. Gates 4/6 cazan UNRLVL-sin-números y Lucien-tease-de-libro.

### Limpieza + cuarentena

- **293 cadáveres** de `intel.iid_content_queue` (274 brand_id=null + 19 brand_id hardcoded) → `failed` + tag `ARCHIVED_LEGACY_20260616`. Decisión Sam: quemar todo lo viejo.
- **Migraciones tracked:** GRANT SELECT a roles PostgREST en `brand_topics` + `brand_voice_genome`; DROP de `content_pieces_voice_check` obsoleto; DDL `intel.watcher_log` con grants.

### Patrón confirmado 3x

"Artefacto nuevo sin permisos = fallo silencioso": tabla nueva con RLS sin GRANT → supabase-js null; CHECK obsoleto → INSERT mudo. Regla: tabla nueva = GRANT + reload cache en la misma migración; INSERT crítico chequea error; antes de ampliar enum/CHECK estático preguntar si debería existir.

### Pendientes (resueltos en sesión 06-17)

- [x] CC: Builder convergido — HECHO
- [x] CC: Watcher 6 gates — HECHO
- [x] Corrida real piloto — HECHO (#5b validado 06-17)

---

## 2026-06-15 · Replanteamiento IID + brand_topics + 14 IID UNRLVL + anti-spam contract

**Conducido por:** Claude Opus 4.8 (chat) + DB directa
**Foco:** corregir el modelo del IID de raíz · diseñar la capa marca↔temas · replantear qué investiga UNRLVL · blindar anti-baneo multimarca

### El giro conceptual

- **MODELO CORREGIDO:** la **marca declara qué temas consume y con qué voz por destino**; el IID investiga temas **neutros**. Antes el agente cargaba `default_voice` y decidía la voz — esa era la causa raíz del off-brand.
- **3 sistemas de voz aclarados:** `brand_voice_genome` (editorial ejecutable), `content.brand_voices` (editorial viejo IID con ICR/AIFE), `voicelab_params` (sonora ElevenLabs, independiente).

### Key achievements

- **`intel.brand_topics` creada y extendida** (m:n marca↔tema; 5 ejes: rollout_phase, purpose, cadence, angle, sibling_stagger).
- **14 IID nuevos `UNRLVL-*`** en 3 tiers. hard_rule: numérico + desarrollo. Los 14 viejos `IID-*` intactos.
- **Naming normalizado.** `UNREALville` eliminado de `meta_accounts` (dup de `UnrealvilleStudio`).
- **Anti-spam contract v1.0** con **Watcher** (6 gates) como prerequisito de publicación.

### Enfoque UNRLVL

- Los IID investigan el **CÓMO industrial del mercado**, no releases. Todo parte de profundidad matemática/de desarrollo. (NOTA 06-17: "matemático" se redefinió como profundidad de comprensión de la maquinaria, NO dígitos obligatorios.)

### Anti-baneo

- Las 3 marcas publican con el mismo token/Business Portfolio Meta. Blindaje 3 capas: divergencia por ángulo (builder), jitter + desfase (scheduler), Watcher gate final.

### Confidenciales Lucien

- Frame Nietzsche/übermensch = motor interno, NUNCA en output. Libros NO existen públicamente hasta lanzamiento.

---

## 2026-06-05 · Skill voice-reference-extractor + cierre de previews pendientes

**Conducido por:** Claude Opus 4.8 (chat) + Claude Code
**Foco:** validación de pipeline de extracción de voz · merge de previews Vercel · integración de skill huérfano

### Key achievements

- **Skill `voice-reference-extractor` v1.0** integrado a `skills/` (PR #2 → `3b65596`). Pipeline determinístico: TikTok → ffmpeg → Whisper → Tesseract → consolidado. NO hace análisis de voice. Idempotente por SHA-256.
- **INDEX.md v1.2 → v1.4** en la jornada.
- **PR #1 SamPublisher mergeado** (`585d447`). Genoma `sam_personal v0.5` health green.
- **Ensayo de pipeline validado E2E en CC (Windows).**

### Decisiones

- **Proyecto "registro BTS de tono/disciplina" → DESCARTADO** (Sam). Tibio, roza grindset. El skill sobrevive como herramienta; el caso de uso murió.
- **División voice-research:** CC = extracción determinística; Chat = análisis iterativo.

### Hallazgos técnicos

- CC crea skills en worktrees aislados que NO llegan a main — integrar siempre por PR.
- Entorno Claude.ai no descarga modelos ML (Whisper 403) → CC local.

### Pendientes / housekeeping

- Worktree huérfano `quirky-jones-aad3e8/` — borrar físicamente.
- 🔴 Ayra Sprint 0 — VENCIDO (5 jun).

---

## 2026-05-31 — Field Notes + fix pipeline v22 + diseño Voice Genome · Sam + Claude

### Resumen
Blog "Field Notes" para UNRLVL, fix del bug de publicación v22, diagnóstico IID, diseño Fase Voice Genome.

### Fix de publicación v22
**Bug:** brand_id mismatch (pipeline "UnrealvilleStudio" vs meta_accounts "UNREALville"). FIX: insertada fila meta_accounts brand_id=UnrealvilleStudio. DEUDA: normalizar nombres (resuelto 06-15).

### Diagnóstico IID
- Schema `intel`. Research funciona; ejecución congelada desde 26-abr. (NOTA 06-16: la causa real era el model ID retirado.)

### Diseño Voice Genome
- `VOICE_GENOME_PHASE_SPEC.md` — Fase 5 para OnboardingApp. 2 ramas: Voz Extraída vs Diseñada.

### Pendientes UNRLVL
- [ ] Deploy Field Notes a CoreProject
- [ ] Implementar Fase Voice Genome en OnboardingApp
- [ ] Normalizar nombres (HECHO 06-15)

---
*Session log · UnrealvilleStudio*
