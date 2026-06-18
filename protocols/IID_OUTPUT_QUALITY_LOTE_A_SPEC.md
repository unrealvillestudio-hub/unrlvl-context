# IID OUTPUT QUALITY — LOTE A — Spec de ejecución para Claude Code
### Cirugía in-place sobre `content-run-stage` + un ajuste de cron. Cubre #5h, #5j, #5k, #5l.
_Versión 1.0 · 2026-06-18 · Autor: Claude (chat) · Ejecutor: Claude Code · Marca: LucienSael + UnrealvilleStudio (piloto) · Ruta B (UPDATE in-place, presenta cambio, Sam confirma; CC NO auto-mergea)_

---

## 0. CONTEXTO Y DECISIÓN DE ARQUITECTURA

El motor IID está validado end-to-end (#5b, 06-17). Esta spec NO toca el flujo — toca la **calidad del output**. Son 4 fixes de fontanería sobre la EF `content-run-stage` (runtime **v34** al momento de escribir, el comentario de cabecera puede tener drift — la versión real del runtime manda) + un ajuste de un pg_cron existente.

**Regla dura de lectura de fuente:** las EFs del IID NO están versionadas en git (el repo `Orchestrator` solo tiene frontend + migrations). La fuente de verdad es la **EF deployada**. `get_edge_function` devuelve ESZIP binario ilegible. Método de trabajo obligatorio: reproducir el happy-path, localizar call-sites por comportamiento, y deployar con verificación post-deploy (re-fetch + run de prueba). NO asumir estructura de código no vista.

**Alcance:** SOLO los 4 fixes de abajo. NO tocar Builder de voz (#5i va en sesión aparte), NO tocar Watcher, NO tocar `content-dispatcher` (el `.limit(1)` se queda), NO tocar genomas, NO ampliar enums/CHECK.

**Sin DDL salvo el cron.** `content_pieces` guarda todo en `assets` (jsonb) — no tiene columnas title/body/resend_id. Los 4 fixes son jsonb-only excepto el ajuste de `cron.job` (jobid 32).

---

## 1. ESTADO REAL VERIFICADO (DB, 2026-06-18)

Verificado por Claude (chat) contra la DB viva antes de escribir esta spec:

- **`content.content_pieces`** — columnas: `id, queue_id, finding_id, orchestrator_job_id, brand_id, voice, platform, format, iid_source_tag, assets (jsonb), icr_passed, aife_passed, lab_sources, published_at, post_url, status, created_at, updated_at`. **NO existe** columna `title`, `body`, `resend_id`, `email_sent`.
- **`assets` jsonb** de una pieza RUN4 tiene las claves: `copy`, `image`, `social`, `watcher`, `builder_meta`, `builder_input`.
  - `assets.copy` = `{ raw, aife_filtered }` — **no hay campo `title` separado**; el title viaja embebido como primera línea del cuerpo (bug #5h).
  - `assets.image` = `{ url, preset_id, prompt_summary }` — `url` hoy es `data:image/png;base64,...` de ~1.7-1.9 MB inline (bug #5j).
  - `assets.builder_meta` = `{ domain, voice_id, angle_used, destination, voice_version, brand_topic_id }` — **no incluye `resend_id`** (bug #5l).
- **Bucket `unrlvl-media`** — existe, público, límite 50 MB, mimes imagen+video, creado 2026-05-26. Tiene 6 objetos, todos del 28-29 de mayo, path `temp/{brand}/{uuid}/{ts}.png`, subidos con service role (`owner: null`). **Cero objetos después del 29-may** → el stage imagelab dejó de subir a Storage tras la reescritura v25→v34 y empezó a devolver base64 inline. La infraestructura existe; está **desconectada**, no ausente.
- **pg_cron jobid 32** — `schedule '0 3 * * *'`, comando: `DELETE FROM storage.objects WHERE bucket_id='unrlvl-media' AND name LIKE 'temp/%' AND created_at < NOW() - INTERVAL '60 days';` → hoy en **60 días** (la AGENDA documentaba 7; el runtime real quedó en 60).
- **No existe** path `permanent/` ni objetos en él todavía.

---

## 2. FIX #5j — RECONECTAR IMAGEN A SUPABASE STORAGE CDN (desbloquea email + Meta)

### 2.1 Qué se rompió
En la reescritura del Builder convergido (v25→v34) el stage `imagelab` quedó devolviendo el base64 de Vertex directo a `assets.image.url`. El upload a `unrlvl-media` que funcionaba en mayo no se portó.

### 2.2 Qué debe hacer el stage imagelab (call-site dentro de `content-run-stage`)
Tras obtener el PNG de Vertex (hoy como base64/bytes), ANTES de escribir `assets.image`:

1. Decodificar el base64 a bytes.
2. Subir a `unrlvl-media` con service role:
   - **path**: `temp/{brand_id}/{piece_id}/{timestamp}.png`
     - `brand_id` = el brand_id resuelto de la pieza (LucienSael / UnrealvilleStudio).
     - `piece_id` = el `id` de `content_pieces` (NO el job_id; el id de la pieza da trazabilidad 1:1).
     - `timestamp` = `Date.now()`.
   - **contentType**: `image/png`
   - **upsert**: `false`
   - método: `storage.from('unrlvl-media').upload(path, bytes, { contentType, upsert:false })`
3. Obtener la URL pública: `storage.from('unrlvl-media').getPublicUrl(path)` → `data.publicUrl`.
4. Escribir en `assets.image`:
   - `url` = **la URL pública del CDN** (NO el base64).
   - `storage_path` = `path` (NUEVO campo — necesario para el move-to-permanent del §5).
   - conservar `preset_id`, `prompt_summary` como están.
5. **NO** conservar el base64 en ninguna parte del jsonb (el peso era el problema; la URL lo reemplaza).

### 2.3 Manejo de error (regla dura del ecosistema: I/O externo en try/catch, fallo nunca mudo)
- Todo el bloque upload+getPublicUrl en `try/catch`.
- Si el upload falla: marcar el stage como `failed` con `errorMsg = "STORAGE_UPLOAD_FAILED: {detalle}"` y capturar a error_log. NO escribir una pieza con imagen base64 como fallback (reintroduciría el bug). NO escribir `url=null` silencioso.

### 2.4 Criterio objetivo de validación
Tras un run de prueba: `assets.image.url` empieza por `https://amlvyycfepwhiindxgzw.supabase.co/storage/v1/object/public/unrlvl-media/temp/...`, `assets.image.storage_path` poblado, y existe el objeto correspondiente en `storage.objects` (bucket `unrlvl-media`). `LENGTH(assets->'image'->>'url') < 300`.

---

## 3. FIX #5h — TITLE PROPIO POR MARCA (campo separado)

### 3.1 Qué se rompió
El title viaja embebido como primera línea del cuerpo. Como ambas hermanas parten del mismo finding, el title las relaciona aunque el cuerpo diverja (similitud 0.07) → antiautobaneo comprometido.

### 3.2 Qué debe hacer el Builder (stage 1, `buildFromGenome`)
- El prompt del Builder debe instruir generar un **title propio**, derivado del ángulo+genoma de ESA marca, **NO** copiado del title del finding crudo. El title debe poder diferir completamente entre Lucien y UNRLVL para el mismo finding.
- Persistir el title como **campo separado**: `assets.copy.title`.
- `assets.copy` pasa de `{ raw, aife_filtered }` a `{ title, raw, aife_filtered }`.
- El `raw`/`aife_filtered` del cuerpo **ya no debe duplicar el title** como primera línea (evita repetición title+H1).

### 3.3 Restricción anti-fórmula (liga con #5i pero NO lo implementa)
- El title se construye dentro del rango del genoma; NO inyectar aquí ninguna plantilla de title rígida. Esta spec solo separa el campo y exige divergencia por marca. El tuning fino de rango es #5i (sesión aparte).

### 3.4 Criterio objetivo de validación
Para un mismo finding/domain, una pieza `brand_id='LucienSael'` y una `brand_id='UnrealvilleStudio'` producen `assets.copy.title` **distintos entre sí** y **distintos del title del finding crudo**. Ambos pieces tienen `assets.copy.title` no-nulo.

---

## 4. FIX #5k — FIRMA DE CIERRE POR MARCA (fuera del markdown)

### 4.1 Qué se rompió
El cierre de UNRLVL salía como `**> Forward.**` — chevron pegado dentro de markdown bold crudo, ilegible y reconocible como artefacto.

### 4.2 Definición de firmas (decididas por Sam, 2026-06-18)
- **UnrealvilleStudio**: `❯ Unrealville Studio`
  - Chevron como sello separado (con espacio tras el glifo), nombre legible completo. El glifo `❯` (U+276F) actúa de blinker/viñeta de marca. NO pegar al nombre. NO usar `>` ASCII (se confunde con markdown blockquote).
- **LucienSael**: `--- LucienSael: Builder, Thinker, Operator`
  - Línea de atribución textual. El `---` es separador literal de texto, NO markdown hr.

### 4.3 Qué debe hacer el Builder
- La firma se estampa como **última línea de la pieza**, en su propia línea, **fuera de cualquier markdown** (sin `**`, sin `>` blockquote, sin `#`).
- Precedida de una línea en blanco para separarla del cuerpo.
- La firma es **constante por marca** (idéntica en cada pieza de esa marca) pero **divergente entre marcas** (protege #5h: no es una firma compartida de ecosistema).
- **Fuente de la firma: el GENOMA (ya escrito por Claude, 2026-06-18).** NO hardcodear mapa en la EF. La firma vive en `brand_voice_genome.application_constraints.signature_closer`, que `loadVoiceGenome` ya carga. El Builder lee:
  - `signature_closer.text` → la cadena exacta a estampar (ej. `❯ Unrealville Studio`).
  - `signature_closer.rule` → instrucción de cómo estamparla (última línea, fuera de markdown, etc.) — inyectar al prompt como restricción.
  - Las 3 voces del piloto YA tienen `signature_closer` poblado: `unrlvl_default` → `❯ Unrealville Studio`; `lucien_editorial` y `lucien_social` → `--- LucienSael: Builder, Thinker, Operator` (idéntica en ambas voces de Lucien por diseño: firma la persona, no el registro).
  - Si una voz futura no tuviera `signature_closer`, el Builder estampa sin firma (no inventa) y lo anota — no es bloqueante.
- El cuerpo del Builder NO debe generar su propio cierre tipo "Forward."/CTA repetido — la firma del genoma sustituye ese cierre.

### 4.4 Criterio objetivo de validación
- Pieza UNRLVL termina exactamente en `❯ Unrealville Studio` en su propia línea, sin markdown alrededor.
- Pieza Lucien termina exactamente en `--- LucienSael: Builder, Thinker, Operator`.
- No aparece `**> Forward.**` ni variantes con asteriscos en el output.

---

## 5. MOVE-TO-PERMANENT AL PUBLICAR (soporte de #5j + reutilización)

### 5.1 Decisión (Sam, 2026-06-18)
La imagen nace en `temp/`. Cuando la pieza **se publica a Meta** (no al aprobar), su imagen se mueve a `permanent/` para reutilización indefinida (materia prima de SignalLab). "Funcionó" = "se publicó".

### 5.2 Dónde se implementa
En el **paso de publish a Meta** (la EF/handler que ejecuta la publicación real — `approve-job` en Orchestrator o el handler equivalente que llama al Meta MCP; CC localiza el call-site real del publish). NO en `approve-piece` / aprobación.

### 5.3 Qué debe hacer al publicar con éxito
1. Leer `assets.image.storage_path` (ej. `temp/UnrealvilleStudio/{piece_id}/{ts}.png`).
2. Calcular el destino: mismo path con prefijo `permanent/` en vez de `temp/` → `permanent/{brand_id}/{piece_id}/{ts}.png`.
3. Mover el objeto: `storage.from('unrlvl-media').move(origen, destino)` (o copy+remove si `move` no está disponible en la versión del SDK).
4. Actualizar `assets.image.url` a la **nueva URL pública** (`permanent/...`) y `assets.image.storage_path` al nuevo path.
5. En `try/catch`: si el move falla, NO abortar la publicación (ya se publicó). Capturar a error_log con `errorMsg = "MOVE_TO_PERMANENT_FAILED: {detalle}"`. La imagen sigue accesible en `temp/` hasta el cron — pérdida tolerable, no bloqueante.

### 5.4 Criterio objetivo de validación
Tras publicar una pieza: el objeto está en `permanent/...`, ya NO en `temp/...`, y `assets.image.url` apunta a la URL pública de `permanent/`.

---

## 6. FIX #5l — CAPTURAR resend_id EN LA PIEZA

### 6.1 Qué se rompió
El email del IID se envía (email_sent=true en el job) pero el `resend_id` se guarda en el job, no en la pieza → la pieza no tiene trazabilidad del envío.

### 6.2 Qué debe hacer
- Donde hoy se hace el envío Resend y se obtiene el id de respuesta (`data.id` de la API de Resend), persistirlo en `assets.builder_meta.resend_id`.
- jsonb-only, sin DDL. `builder_meta` ya existe; añadir la clave `resend_id`.
- En `try/catch` (el envío ya está envuelto por la lección 06-17): si Resend devuelve sin id, escribir `resend_id = null` explícito (no omitir la clave) para que la ausencia sea visible.

### 6.3 Criterio objetivo de validación
Tras un run con email enviado: `assets.builder_meta.resend_id` poblado con el id de Resend (formato `re_...`).

---

## 7. AJUSTE DE CRON — temp cleanup 60 → 12 días

### 7.1 Qué se cambia
`cron.job` jobid 32. Cambiar el `INTERVAL '60 days'` a `INTERVAL '12 days'`. Todo lo demás del job se mantiene (schedule `0 3 * * *`, filtro `temp/%`, bucket `unrlvl-media`).

### 7.2 Cómo
`SELECT cron.alter_job(32, command := '<comando con 12 days>');` — o re-`cron.schedule` con el mismo jobname si se prefiere. NO crear un job nuevo (evitar duplicado). Verificar que sigue siendo un solo job tras el cambio.

### 7.3 Por qué 12 y no 60/7
Sam aprueba en <7 días siempre; 12 da margen. Las piezas publicadas (reutilizables) ya no dependen de `temp/` porque pasan a `permanent/` (§5), que el cron NO toca. Por tanto bajar `temp/` a 12 no arriesga las piezas ganadoras.

### 7.4 Criterio objetivo de validación
`SELECT command FROM cron.job WHERE jobid=32;` contiene `INTERVAL '12 days'` y NO existe un segundo job de cleanup de `unrlvl-media`.

---

## 8. ORDEN DE TRABAJO PARA CC

1. Leer la EF `content-run-stage` deployada (fuente de verdad; ESZIP no legible → reproducir/localizar por comportamiento). Localizar: (a) call-site del stage imagelab, (b) `buildFromGenome` stage 1, (c) INSERT/UPDATE de `assets`, (d) bloque de envío Resend.
2. Implementar #5j (§2): upload a `unrlvl-media/temp/`, URL pública en `assets.image.url`, `storage_path` nuevo, sin base64.
3. Implementar #5h (§3): `assets.copy.title` separado, divergente por marca, body sin title duplicado.
4. Implementar #5k (§4): mapa `BRAND_SIGNATURE`, firma como última línea fuera de markdown.
5. Implementar #5l (§6): `assets.builder_meta.resend_id`.
6. Localizar el call-site del publish a Meta e implementar move-to-permanent (§5).
7. Ajustar cron jobid 32 a 12 días (§7).
8. Deploy in-place de la(s) EF(s). Re-fetch para confirmar versión nueva.
9. Reportar contra los criterios objetivos de §2.4, §3.4, §4.4, §5.4, §6.3, §7.4 con query/log concreto por cada uno.
10. Presentar el cambio para que Sam confirme. NO auto-mergear, NO quitar `.limit(1)`, NO pushear a unrlvl-context.

---

## 9. LO QUE ESTA SPEC NO HACE (límites explícitos)

- NO toca #5i (rango de Lucien / tuning de genoma) — sesión aparte, nanométrica, con captura Professor completa.
- NO toca genomas, Watcher, dispatcher, ni el `.limit(1)`.
- NO toca genomas (la firma de cierre YA está escrita en `application_constraints.signature_closer` de las 3 voces — el Builder solo la lee).
- NO renderiza markdown en destinos (el markdown crudo en cuerpo, más allá de la firma, es problema de render por-destino, fuera de alcance del piloto de aprobación por email).

_FIN — IID Output Quality Lote A Spec v1.0_


---

## 10. ADDENDUM — CORRECCIONES DE REALIDAD (post-ejecución, 2026-06-18)

_Añadido tras la ejecución de CC. El spec original (§0–§9) se escribió sin acceso a la fuente de la EF; CC leyó el código deployado y encontró dos suposiciones erróneas. Se preservan §0–§9 como histórico; estas correcciones MANDAN sobre ellas._

### 10.1 `get_edge_function` SÍ fue legible (corrige §0)
§0 afirma "ESZIP binario ilegible → reproducir por comportamiento". En la ejecución real, `get_edge_function` devolvió el `index.ts` completo y legible de `content-run-stage` v34 y de `approve-piece`. CC trabajó sobre la fuente exacta, no por reproducción. **El aprendizaje histórico de ESZIP-ilegible debe revisarse — pudo cambiar.** Anotado como drift (#37).

### 10.2 `piece_id` NO existe en el stage imagelab (corrige §2.2 — Decisión D1)
§2.2 asume `piece_id = content_pieces.id` disponible en imagelab. **Falso.** Orden real de stages: `audience_brief(0) → copylab(1) → aife(2) → imagelab(3) → sociallab(4)`, y `content_pieces` se INSERTA recién en `finalizePiece` (tras sociallab). En imagelab (stage 3) el piece_id aún no existe.
**Resolución implementada (D1):** pre-generar `crypto.randomUUID()` en copylab (stage 1), stashearlo en `builder_meta`, usarlo en el path `temp/{brand}/{piece_id}/{ts}.png`, e insertarlo como **PK explícito** en `content_pieces` en `finalizePiece`. No es DDL (solo fija el PK). Da la trazabilidad 1:1 storage↔pieza que §2.2/§5 piden. Verificado: pieza `24c5c795` con path conteniendo su propio id.

### 10.3 El publish a Meta vive en `approve-piece`, NO en Orchestrator (corrige §5.2 — Decisión D2)
§5.2 dice "NO en `approve-piece`" asumiendo que aprobar ≠ publicar. **Falso.** El flujo real: link de email → `approve-job` (Orchestrator, proxy delgado) → **`approve-piece` (EF Supabase)** → llama a SocialLab (stage 4) que postea a Meta → si `publishOk===true`, flip a `status='published'`. Aprobar-con-publish-OK **es** publicar.
**Resolución implementada (D2):** move-to-permanent en `approve-piece`, branch `if(publishOk)`, con guard `startsWith('temp/')` para saltar piezas viejas con base64. `approve-piece` v13→v14. Cumple la decisión de Sam (move al publicar) porque en este código publicar ocurre ahí.

### 10.4 El id de Resend es UUID, no `re_…` (corrige §6.3)
§6.3 espera `resend_id` "formato `re_...`". El id de un **email enviado** vía Resend es un UUID (ej. `a6784688-241e-456a-adfe-5e33c80a0bfb`), no el prefijo `re_…` (que aplica a otros recursos). Criterio cumplido: `resend_id` poblado == `assets.email.id`. Verificado en pieza `87a181ba`.

### 10.5 Estampado de firma: determinístico en finalizePiece, no en prompt (refina §4.3)
§4.3 sugiere inyectar la `.rule` al prompt. CC detectó que **AIFE (stage 2) reescribe el cuerpo después del Builder** y puede alterar el glifo exacto. **Implementación real:** la firma se estampa determinísticamente en `finalizePiece`, tras el PASS del Watcher, idempotente (no duplica si el LLM ya la emitió), garantizando la última línea exacta. La `.rule` se sigue inyectando al prompt como guía, pero el match exacto lo garantiza el estampado por código.

### 10.6 Estado de verificación al cierre
- #5j ✅ live · #5h ✅ live · #5k ✅ live · #5l ✅ live · cron ✅ live.
- §5.4 (move-to-permanent) 🟡 verificado-por-deploy (byte-idéntico); gatillo live diferido al primer publish real a Meta (sesión #5b, cuentas Meta verificadas) por disciplina de fases de Sam.
- Artefactos de test: 3 piezas marcadas `status=failed` + `assets.test_marker='IID_LOTE_A_TEST_2026-06-18'` (`24c5c795`, `46bdfa71`, `87a181ba`). Email de test inerte (token null) en `content-approval@`. Imagen Lucien huérfana en `temp/` → la limpia el cron.

_FIN ADDENDUM v1.0 — 2026-06-18_

