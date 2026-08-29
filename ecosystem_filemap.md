# Ecosystem Filemap — Unrealville Studio

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.

_Regenerado desde ecosystem.json **v2026-08-16-v1** (2026-08-16) · base previa: generado desde ecosystem.json v2026-06-24-v1 · No editar manualmente · ImageLab v7 (migración Imagen→Gemini) + BGRemover + labs/ImageLab/ actualizados al 2026-06-24; resto preservado de la versión anterior · regla de nomenclatura de labs y corrección del flow (el generador local) sincronizadas desde ecosystem.json v2026-08-01-v1 · versiones del registro edge_functions sincronizadas al estado real (list_edge_functions) 2026-08-01: content-run-stage build _74 · iid-core v47 · content-watcher build _29 · content-dispatcher v47 (menciones fechadas preservadas) · capa de instrumentación de costo (ops_*) 2ª ola sincronizada desde ecosystem.json v2026-08-04-v1: ops_services (20) · ops_credits · billable en ops_costs+ops_generation_ledger · ops_token_sessions→ops_token_sessions_retired · v_cost_pivot 31 col · capa de costo 3ª ola sincronizada desde ecosystem.json v2026-08-05-v1: ops_cost_residual + v_cost_residual_vigente (residuo de brecha por scope: document-factory 12% · fie 3,5%) · REGLA MULTIMARCA instalada 2026-08-07: protocols/MULTIBRAND_RULE.md listado y clave `multibrand_rule` sincronizada desde ecosystem.json (adición aditiva, sin bump de _meta.version) · HRD_ACTUALIZA 2026-08-08 sincronizada desde ecosystem.json v2026-08-08-v1: `nscf_editorial` v1.0 y `fphs_conversion` reactivada registradas en `brand_topics.subscriptions` · `content_type_registry` (+`max_tokens`, +`format_instruction`) listada en tables.content · `multibrand_rule` 4/5 casos pagados (pendiente `OBJECTIVE_LABEL_TO_TAG`) · HRD_ACTUALIZA 2026-08-13 sincronizada desde ecosystem.json v2026-08-13-v1: sesión de posicionamiento y web pública (tesis canónica de marca sellada; la web vive en `CoreProject`, PR #3) — ningún nodo del JSON cambia salvo `_meta` (`version`→2026-08-13-v1, `previous`→2026-08-08-v1, `last_session` 2026-08-08 movido a `previous_sessions`); el cuerpo de este derivado se conserva íntegro · HRD_ACTUALIZA 2026-08-14 sincronizada desde `ecosystem.json` v2026-08-14-v1 (reconciliación de estado AIID/CopyLab, verificada por código y SQL): flujo Brand Cache actualizado al escritor y estado reales (`CopyLab/api/brand-cache.js` v2.4 → `brand_cache_snapshots` v2.4, 9 marcas, cron `build_all` nunca ejecutado) · voces de ForumPHs añadidas al bloque `brand_voice_genome` (3 en v1.1 activas + `fphs_institucional` v0.5 inactiva) · `audience_brief` stage 0 huérfano registrado en el flujo IID. Sólo campos presentes literalmente en el JSON. Adición aditiva, historia preservada · HRD_ACTUALIZA 2026-08-18 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-18-v1: los únicos nodos que cambian en el JSON son `_meta` (`version`→2026-08-18-v1, `previous`→2026-08-16-v1, `last_session` 2026-08-16 movida íntegra a `previous_sessions`) y `iid_subsystem.labs_wiring.imagelab`, donde la afirmación «ÚNICO lab que el carril invoca de verdad por su endpoint» quedó vencida con el cable de CopyLab: hoy son TRES de cuatro (copylab, aife, imagelab) y el que falta es sociallab, que sigue armando su post con `runSocialLabDirect`. **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA (decisión de Sam, 2026-08-18):** este derivado **NO se regenera completo**. No existe generador en el repo, así que "regenerar" a mano no es regenerar: es reescribir con interpretación —justo lo que la instrucción «cero interpretación» busca impedir— y borra historia, que es la regla suprema del `CC_PROTOCOL.md` §0. Se aplica el precedente del 2026-08-13: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real queda abierta **sin fecha** en `AGENDA.md` v2026-08-18-v1, junto con la deuda de que este archivo fue editado a mano en el PR #51 · HRD_ACTUALIZA 2026-08-20/21 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-21-v1: los nodos que cambian en el JSON son `_meta` (`version`→2026-08-21-v1, `previous`→2026-08-18-v1, `last_session` 2026-08-18 movida **íntegra** a `previous_sessions`) y `brands[ForumPHs]`, cuyas cinco claves previas (`id`, `name`, `type`, `market`, `status`) quedan intactas y al que se le **añaden** `domain`, `meta_accounts` (canal operativo end-to-end: `page_id`, `ig_user_id`, `ad_account_id` NULL declarado), `iid_agents` (los 6 agentes propios + el fix del `CHECK` que los hizo posibles), `voices` (3 en v1.1 activas + `fphs_institucional` v0.5 inactiva) y `r4b_status` (contenido + canal listos, publicación desde 2026-08-22, 0 de 27 piezas aprobadas). **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA, tercera aplicación:** este derivado **NO se regenera completo**. El motivo no ha cambiado desde el 2026-08-13 y el 2026-08-18: no existe generador en el repo, así que "regenerar" a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Este archivo lleva además cuerpo acumulado que **no es derivable** del JSON (flujos, tablas de estado, notas fechadas): una regeneración literal lo vaciaría. Se aplica el precedente: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-21-v1 · HRD_ACTUALIZA 2026-08-22 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-22-v1: los nodos que cambian en el JSON son `_meta` (`version`→2026-08-22-v1, `previous`→2026-08-21-v1, `last_session` 2026-08-20/21 movida **íntegra** a `previous_sessions`) y `brands[ForumPHs]`, que pasa a **PUBLICANDO**. Ninguna clave previa del nodo se pierde: los cuatro campos de `r4b_status` que cambiaron (`state` «contenido + canal LISTOS»→«PUBLICANDO — al aire desde 2026-08-22», `canal`, `aprobacion` «0 de 27 piezas aprobadas», `bloqueante_abierto` `AUDIENCE_CTA`) quedan **archivados** en claves `_*_anterior_2026-08-21`, y el `iid_agents.last_run_at` anterior en `_last_run_at_anterior_2026-08-21`. Lo demás es **adición**: `publishing_state` · `primer_publish` (**el primer publish de la historia del sistema** — FB `1184045168120977_122131069905355949` a las 12:44:41 UTC e IG `17943396402322068` a las 12:45:06 UTC, con permalink, `piece_id`, dominio, voz y título de cada pieza; modo **manual-asistida** porque el `publisher-cron` de `scheduled_posts` no existe todavía; mecánica Meta validada: `fb_publish_photo` toma `url`, no `photo_url`) · `visual_identity` (escena bajo preset + **EB Garamond** estampado por el compositor de cómputo propio + **franja lila `#5C3472`** `edge_left` `full_bleed` por el lado corto; vocabulario de canal correcto —`FACEBOOK_FEED`/`INSTAGRAM_FEED`/…— frente al legacy `LANDING`/`META` conservado; guarda `OVERLAY_TEXT_MISSING`) · `calibration_rules_sam` (las **3 reglas de Sam** —el título cierra la idea solo · el texto CONDUCE · «la cuota extraordinaria» siempre completa— más la regla de encaje, con la advertencia de que todavía **no están en el sistema**) · `dominio_asamblea_2026_08_22` (rechazo de lote por afirmación legal falsa para Panamá, Ley 284/2022, y regeneración con requisito legal) · y `iid_agents` cableado a `cron.job` **52–63** (21 corridas/mes, 3 de 6 con `last_run_at`). **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA, cuarta aplicación:** este derivado **NO se regenera completo**. El motivo no ha cambiado desde el 2026-08-13, el 2026-08-18 y el 2026-08-21: no existe generador en el repo, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Se aplica el precedente: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-22-v1 · HRD_ACTUALIZA 2026-08-23 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-23-v1: los nodos que cambian en el JSON son `_meta` (`version`→2026-08-23-v1, `previous`→2026-08-22-v1, `last_session` 2026-08-22 movida **íntegra** a `previous_sessions`), `iid_subsystem.edge_functions.content-watcher` (**v29 → v37** — desplegada por CLI el **2026-08-23 16:14:08 UTC** con `--no-verify-jwt`, cerrando **PR #79 (WATCHER-01)**: aporta `sortRulesByCode` —orden determinista— y `evaluated_codes` —qué reglas vio el juez, consultable—; **el registro anterior de v29 se conserva íntegro dentro del mismo valor**, tras el separador `||`), `iid_subsystem.tables` (**cinco ejes nuevos, todos ADICIÓN**: `intel.brand_publish_channels` · `intel.pipeline_cutoffs` · `intel.brand_topics.theme_key`/`public_label` · `content.content_pieces.slug` · `content.content_pieces.discarded_at`/`discarded_reason`) y `brands[ForumPHs]`, al que se le **añaden** `publish_channels` (**blog OPERATIVO** — `forumphs.com/blog`, provider `vercel_html`, HTML servido por función serverless, SEO-first, 2 artículos publicados, rótulo de menú «Sin tecnicismos», H1 «Hablemos sin tecnicismos», URL fija en `/blog`; y **email DECLARADO Y NO OPERATIVO** — Klaviyo, lista `VWwDjP`, `active = false` hasta que complete la autenticación DKIM/SPF de `envios.forumphs.com`), `public_themes` (32 dominios en **5 temas**) y `register` (**usted**: `HR-FPHS-07` rige la instrucción al escritor, no sólo el texto entregado). **El único valor sustituido en todo el JSON, además de los de versión, es `brands[ForumPHs].r4b_status.contenido`**: el ratio de PASS pasa de **25,9 % a 18,5 %**, y el valor anterior queda **archivado** en `_contenido_ratio_anterior_2026-08-22` — no borrado. **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA, quinta aplicación:** este derivado **NO se regenera completo**. El motivo no ha cambiado desde el 2026-08-13, el 2026-08-18, el 2026-08-21 y el 2026-08-22: no existe generador en el repo, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Se aplica el precedente: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-23-v1 · HRD_ACTUALIZA 2026-08-24/25 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-25-v1. Los nodos que cambian en el JSON son: `_meta` (`version`→2026-08-25-v1, `previous`→2026-08-23-v1, `last_session` 2026-08-23 movida **íntegra** a `previous_sessions`, que pasa de 11 a 12); `iid_subsystem.edge_functions`, donde **cada versión nueva conserva su registro anterior íntegro** tras el separador `||` — `content-run-stage` **v74 → 92** (corrector determinista **pre-juicio**: lo que una regla sabe reparar sola no llega al juez), `content-watcher` **v37 → 43** (`gate9Language`, **informativo**, marca 1 error en 11 de 22 piezas; y el **backfill de embeddings**, cuyo parámetro es **`days`**, no `window_days`), `content-scheduler` **v2 → 5** (**modo `placement`: el eje de colocación que faltaba**, y el cierre del bloqueante declarado el 2026-08-23), `iid-core` **v47 → 54** y `approve-piece` **v14 → 39** (**sellado de aprobación**: aprobar y publicar dejan de ser el mismo acto), más las **tres EF nuevas** `iid-process` **47**, `judge-arbitration` **2** y `piece-edit` **2** — las dos últimas con **`verify_jwt: true`**, asimetría **deliberada** frente al resto del carril, que usa `--no-verify-jwt` porque lo llama el cron vía `pg_net`; `iid_subsystem.tables` (**todo adición**: `intel.judge_calibration` · `intel.piece_edits` · `watcher_rules.condition`/`verify_pattern`/`fix_replacement`/`enforced_on` —con los **dos motores** declarados, POSIX y ECMAScript— · `brand_topics.angles` · las seis columnas nuevas de `content_pieces` · los dos `CHECK` ampliados · la clave nueva `public` con `scheduled_posts.piece_id`); y `brands[ForumPHs]`, cuyos cuatro campos de `r4b_status` que cambiaron (`state`, `canal`, `aprobacion`, `bloqueante_abierto`) quedan **archivados** en claves `_*_anterior_2026-08-23` — no borrados — y al que se le **añaden** `procedencia` (**PROC-01**: 15 hallazgos, cero ley numerada, cero año calendario, contra 3 de 5 contaminados), `angles` (**los seis ángulos** con su matriz ángulo-voz y **el criterio de las ausencias**) y `politica_de_enlaces` (**la fuente se nombra, nunca se enlaza**). `next_session_agenda` recibe **seis entradas al tope, ninguna retirada**. **Hito del JSON:** `5e9f03ef` salió **sola** en Facebook el **2026-08-25 13:13 UTC**, drenada por el cron `content-placement-poll` (jobid 66, `*/15`) — **primera publicación automática del ecosistema**. **LA EXCEPCIÓN DEJÓ DE SER EXCEPCIÓN:** este derivado **no se regenera completo**, y desde el 2026-08-23 eso ya no se declara como excepción sino que **es la regla escrita en `CLAUDE.md`** («Los derivados NO se regeneran completos — se sincronizan»), tras cinco aplicaciones seguidas de la misma excepción (13, 18, 21, 22 y 23 de agosto). El motivo no cambió: **no existe generador en el repo**, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Nota de sincronización en cabecera, **cuerpo íntegro**, en **commit separado**. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-25-v1 · HRD_ACTUALIZA CHECKPOINT 2 (sesión 2026-08-25) **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-26-v1. Los nodos que cambian en el JSON son **cuatro, y ninguno pierde una sola clave** — verificado por barrido estructural: **640 claves antes, 640 después, cero perdidas y cero nuevas**, y **cero strings previos ausentes** del archivo. (1) `_meta` (`version`→2026-08-26-v1, `previous`→2026-08-25-v1, `last_session` 2026-08-24/25 movida **íntegra** a `previous_sessions`, que pasa de **12 a 13**). (2) `iid_subsystem.edge_functions`, donde **cada versión nueva conserva su registro anterior íntegro** tras el separador `||` — `content-run-stage` **92 → 93** (2026-08-25 **23:51 UTC**, PR #93: **SIGN-01**, la firma la pone el sistema y se corrige el truncamiento que el juez no podía ver; queda anotada **la cronología**, porque este deploy fue **posterior** a la generación del run —17:10-19:41— y por eso la proyección 63 % / 81,5 % es **proyección, no medición**; y el defecto abierto en esta misma EF: **el texto adaptado por plataforma no pasa por el juez**, líneas 3134-3136, verificado con `social.adapted` reintroduciendo una cita de ley que `aife_filtered` ya no tenía) y `content-watcher` **43 → 44** (2026-08-25 **23:13 UTC**, PR #92: sostiene el run con **9 arbitrajes**, que dan por primera vez **tasa de falso positivo medida y no estimada** —`HR-FPHS-15` 100 %, `HR-FPHS-13` 100 %, `HR-LEGAL-01` 75 %— y lee las reglas reescritas `HR-FPHS-11`, `HR-FPHS-15` y la nueva `HR-FPHS-16`). (3) `iid_subsystem.edge_functions.content-scheduler`, que **no cambia de versión pero sí de estado operativo**: sigue en **v5** y su **drenaje quedó APAGADO** —cron 66 `content-placement-poll`— hasta que cierre **PUB-01**, porque el drenaje **da por publicado con un `200` de SocialLab sin verificar el efecto** y no hay **ni una publicación automática real**; el registro anterior se conserva íntegro tras el `||`. **El carril COLOCA; todavía no se puede afirmar que PUBLICA.** (4) `next_session_agenda`, que recibe **cinco entradas al tope y no pierde ninguna** (38 → 43): PUB-01 · el texto adaptado sin juez · `deno check` antes de dar por bueno un PR · las tres reglas a reescribir con dato medido · y la sospecha, **anotada como sospecha**, de que SocialLab sea mayormente mockup. **Fuera del JSON, y por eso sólo se menciona acá:** `HRD_PROTOCOL.md` pasa a **v1.6** con **tres reglas globales nuevas, ninguna derogación** —**HRD-R10** verificar fragmentos no es verificar el archivo, **HRD-R11** el éxito se comprueba contra el efecto y no contra el código HTTP, **HRD-R12** el test de la marca N+1 barre también los `CHECK` existentes— y se ejecutó el **barrido de archivado** pedido por Sam: **5 bloques** bajan a `historical_AGENDA.md` y **8 candidatos quedan retenidos con su motivo declarado**. **DERIVADOS — la regla, no la excepción:** este archivo **no se regenera completo**, y desde el 2026-08-23 eso **es la regla escrita en `CLAUDE.md`** («Los derivados NO se regeneran completos — se sincronizan»). El motivo no cambió: **no existe generador en el repo**, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Nota de sincronización en cabecera, **cuerpo íntegro**, en **commit separado**. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-26-v1_

> **Nota de sincronización — ACTUALIZA 2026-08-29 (`ecosystem.json` v2026-08-29-v2 → **v2026-08-29-v3**).**
> **El cuerpo de este archivo NO cambia, y se declara.** Cierre de la sesión del 2026-08-29 más tres
> correcciones de divergencia protocolo–práctica; ningún nodo de estado del ecosistema se mueve.
>
> **Primera aplicación de la regla corregida hoy.** Hasta esta mañana, el paso 4 de `HRD_ACTUALIZA`
> mandaba **regenerar** este archivo completo desde el JSON, contra la regla de **sincronizar** escrita
> en `CLAUDE.md` desde el 2026-08-23. La contradicción vivió **seis días** dentro del mismo protocolo, y
> el que ejecuta lee el paso, no el `CLAUDE.md`. `HRD_PROTOCOL.md` pasa a **v1.9** y el paso 4 ya dice
> sincronizar; esta nota es la primera vez que se aplica la redacción nueva.
>
> **Qué cambió en el JSON, y sólo eso:** `_meta.version` → **`2026-08-29-v3`**, `_meta.previous` →
> `2026-08-29-v2`, `_meta.previous_chain` recoge `2026-08-29-v2` al tope, y **una entrada nueva al tope
> de `previous_sessions`** (15 → **16**). **Ninguna clave de contenido se toca**: `delivery_and_verification_rule`
> queda tal como la dejó el PR #71.
>
> ⚠️ **Divergencia con el brief, declarada por el paso 0.** El brief pedía bump a `2026-08-29-v2`; el
> paso 0 midió que el **PR #71 ya había ocupado esa versión**. Reutilizarla habría dado el mismo
> identificador a dos estados distintos del JSON. Se va a **v3**.
>
> **Fuera del JSON, y por eso sólo se menciona acá:** `HRD_PROTOCOL.md` → **v1.9** con tres
> correcciones y ninguna derogación de regla — el paso 4 (**regenerar** → **SINCRONIZAR**), el pie del
> cuerpo vivo que declaraba **v1.3** mientras la cabecera decía v1.8, y los pasos 1-2 del **SMA**
> (*siempre* → *sólo si Sam lo pide*). Las tres redacciones anteriores quedan **archivadas íntegras**
> bajo guard `⛔ NO OPERATIVO`. · `AGENDA.md` → **v2026-08-29-v1**, con el **paso 10-bis ejecutado
> contra Supabase** —cinco sesiones convergidas sin destilar, no una; `D7Herbal` con genoma activo y
> cero `brand_topics`; una sesión `active` con cero turnos desde hace siete semanas— y el **paso 10
> propuesto a Sam, no ejecutado**. · `brands/UnrealvilleStudio/session_log.md`, entrada al tope.
>
> 🔴 **Hallazgo de seguridad, abierto:** el **secreto de export del SMA estaba en claro** en
> `protocols/HRD_PROTOCOL.md`, en `main`. Retirado del cuerpo vivo y **redactado** en el bloque
> histórico, pero **retirarlo del archivo no lo invalida**: sigue en el historial de git y en el
> estático de Vercel. **Rotación pendiente, decisión de Sam.**
>
> **DERIVADOS — la regla, no la excepción:** este archivo **no se regenera completo**. **No existe
> generador en el repo**, así que «regenerar» a mano es **reescribir con interpretación** y **borra
> historia** (`CC_PROTOCOL.md` §0). Nota de sincronización en cabecera, **cuerpo íntegro**, en **commit
> separado**.


> **Nota de sincronización — carga en apertura, vía a Vercel y contrato de sync (`ecosystem.json` v2026-08-29-v1 → **v2026-08-29-v2**).**
> **El cuerpo de este archivo NO cambia, y se declara.** Tres correcciones de gobernanza posteriores al
> merge del PR #70, ninguna de estado del ecosistema.
>
> **Qué cambió en el JSON, y sólo eso:** `_meta.version` → **`2026-08-29-v2`**, `_meta.previous` →
> `2026-08-29-v1`, `_meta.previous_chain` recoge `2026-08-29-v1` al tope, y **dos claves nuevas dentro
> de `delivery_and_verification_rule`** —`_carga` y `_puntos_de_carga`—. **Ninguna clave previa se
> toca ni se pierde: 24 de primer nivel, 8 → 10 dentro del nodo.** **NO hay entrada nueva en
> `previous_sessions`** —sigue en **15**—: la sesión se cierra en el `Actualiza`, no aquí.
>
> **1 · La regla se carga en la apertura, no se consulta.** `protocols/DELIVERY_AND_VERIFICATION_RULE.md`
> pasa a **v1.1** y a ser el paso **`3-quater`** de `HRD_PROTOCOLO_ACTUALIZACION`, con **fila propia en
> el panel**, que sube de cinco a **seis** archivos de carga obligatoria. Motivo: una regla que gobierna
> **cómo se responde** y se abre al final llega tarde, porque el texto ya está escrito; y **el panel está
> especificado en su propia §2.4**, así que emitirlo sin haber cargado el documento que lo define es
> emitirlo sin verificarlo contra su especificación. Si esa fila sale **roja**, lo que falta no es un
> dato: es el criterio con el que se pintan las demás.
>
> **2 · CC sí alcanza Vercel, por la tool y no por `curl` [medido 2026-08-29].** Las dos vías, probadas
> en la misma sesión: `curl` → **403 CONNECT, 0 bytes**; `Vercel:web_fetch_vercel_url` → **HTTP 200**
> con cuerpo completo, `x-vercel-cache: MISS`. `CC_PROTOCOL.md` pasa a **v7** con la nueva **§0 bis.1**;
> el texto de v5 se conserva **íntegro** —sigue siendo cierto en su literal— y lo que caduca es su
> conclusión. **El orden no cambia:** el repo sigue siendo la fuente canónica y Vercel el respaldo,
> porque el estático puede ir por detrás de `main` entre el merge y el deploy (`HRD-R09`, `HRD-R14`).
> `CAPABILITIES.md` → **1.10** y los dos `CLAUDE.md` corrigen la misma afirmación caducada.
>
> **3 · Contrato anti-choque para el proyecto de sync, y por eso esta nota importa aquí.** La
> **regeneración real de estos dos derivados** sigue abierta **sin fecha** en `AGENDA.md`. Cuando
> arranque, va a recorrer los ocho puntos de carga de la regla, y el riesgo es que los trate como ocho
> copias a igualar. `DELIVERY_AND_VERIFICATION_RULE.md` §6 gana **columna de estatus**
> —FUENTE / PUNTERO / RESUMEN OPERATIVO— y una **§6.1** con tres reglas: un sync que iguala textos
> **rompe** la regla en vez de aplicarla; un RESUMEN OPERATIVO **no es un derivado calculable**; y **un
> derivado lleva cuerpo que no es derivable del JSON** —flujos, tablas de estado y estas mismas notas
> fechadas—, así que **todo generador futuro preserva ese cuerpo o no se despliega**. El mismo contrato
> queda **legible por máquina** en `ecosystem.json → delivery_and_verification_rule._puntos_de_carga`.
>
> **DERIVADOS — la regla, no la excepción:** este archivo **no se regenera completo**, y desde el
> 2026-08-23 eso **es la regla escrita en `CLAUDE.md`**. **No existe generador en el repo**, así que
> «regenerar» a mano no es regenerar — es reescribir con interpretación y **borra historia**
> (`CC_PROTOCOL.md` §0). Nota de sincronización en cabecera, **cuerpo íntegro**, en **commit separado**.


> **Nota de sincronización — DELIVERY_AND_VERIFICATION_RULE (`ecosystem.json` v2026-08-28-v4 → **v2026-08-29-v1**).**
> **El cuerpo se conserva íntegro, con UNA sola adición declarada:** el archivo nuevo entra en el
> árbol de `protocols/`, junto a `MULTIBRAND_RULE.md`. Nada más cambia, y nada se borra. El cambio
> de la pasada es una **decisión de gobernanza**, no de estado del ecosistema: se instala `protocols/DELIVERY_AND_VERIFICATION_RULE.md`
> **v1.0** como documento propio y **FUENTE ÚNICA** de la forma de entregar y de verificar. Lo que se
> copia, diverge (`CC_PROTOCOL.md` §6), así que los seis puntos de carga **apuntan y no copian**.
>
> **Qué cambió en el JSON, y sólo eso:** `_meta.version` → **`2026-08-29-v1`**, `_meta.previous` →
> `2026-08-28-v4`, `_meta.previous_chain` recoge `2026-08-28-v4` al tope, y la clave **nueva de primer
> nivel** `delivery_and_verification_rule`, colocada junto a `multibrand_rule` porque son las dos
> reglas inviolables del mismo rango. **Ninguna otra clave se toca: 23 → 24, cero perdidas.**
> **NO hay entrada nueva en `previous_sessions`** —sigue en **15**—: la sesión se cierra en el
> `Actualiza`, no aquí.
>
> **Qué dice la regla, en una línea:** todo lo que se entrega va en bloque con encabezado propio
> (`PARA SAM` / `PARA CC`), en ES o EN neutro internacional **sin voseo**, con el grado de evidencia
> declarado (`medido` / `reportado` / `deducido`), y pasa las **cuatro QA** —`QA-ENCARGO` →
> `QA-OBJETIVO` → `QA-INFO` → `QA-PROP`, donde `QA-INFO` es un **bloqueo**—. El **diferenciador
> visual es para que Sam lea, no para que CC ejecute**, y depende de la **superficie**: cuadrado
> emoji en chat, porque el markdown no rinde color arbitrario; `●` con la línea en su hex en
> documento o UI con estilos. La apertura de sesión se confirma con el **panel de carga verificada**
> —una fila sin evidencia es **roja**—, no con una frase fija.
>
> **Fuera del JSON, y por eso sólo se menciona acá:** `protocols/DELIVERY_AND_VERIFICATION_RULE.md`
> **v1.0** (nuevo) · `CC_PROTOCOL.md` → **2026-08-29-v6** (§4.1 v3 puntero, con la **v2 archivada
> íntegra** bajo guard `⛔ NO OPERATIVO`; §4 suma el campo `QA:`) · `HRD_PROTOCOL.md` → **v1.8**
> (**HRD-R15**; barrido de voseo con **6** apariciones corregidas, **una más** que las 5 declaradas
> en el brief —anotado por `HRD-R13`—; pasos **3-bis** y **3-ter** **sin renumerar**; paso 4 con la
> frase única; paso 8 convertido en el panel, donde **las dos reglas inviolables son dos filas más con
> fuente y evidencia propias** —`ecosystem.json → labs._note` y `protocols/MULTIBRAND_RULE.md`—, rojas
> con su motivo si su fuente no se cargó; y las **redacciones anteriores de los pasos 4 y 8 quedan
> archivadas íntegras** al final del archivo, bajo guard `⛔ NO OPERATIVO`) · `MULTIBRAND_RULE.md` §7.1
> (la confirmación de las dos reglas se **mueve** al paso 8 y **se endurece**: de afirmación a fila con
> evidencia) ·
> `CAPABILITIES.md` → **1.9** · `QA_RULES.md` (puntero cruzado) · los dos `CLAUDE.md` de este repo.
>
> **DERIVADOS — la regla, no la excepción:** este archivo **no se regenera completo**, y desde el
> 2026-08-23 eso **es la regla escrita en `CLAUDE.md`** («Los derivados NO se regeneran completos —
> se sincronizan»). El motivo no cambió: **no existe generador en el repo**, así que «regenerar» a
> mano no es regenerar — es **reescribir con interpretación**, justo lo que la instrucción «cero
> interpretación» busca impedir, y **borra historia** (`CC_PROTOCOL.md` §0). Nota de sincronización
> en cabecera, **cuerpo íntegro**, en **commit separado**.


> **Nota de sincronización — MAIL-PRIV-04 (`ecosystem.json` **sin bump: sigue en `2026-08-28-v4`**).**
> **Este archivo NO cambia, y se declara.** Barrido hecho: **cero apariciones** del identificador
> retirado, y las únicas coincidencias de `PENDIENTE DE FIRMA` / `PENDIENTE DE CONFIRMAR` en el repo
> están en `AGENDA.md` y en dos `session_log.md`, **narrando el estado del 2026-08-28 con su cierre
> anotado a continuación** — eso es historia y no se toca (MAIL-PRIV-04 §1 y §5).
>
> **Sin bump de versión, a propósito.** Mismo criterio que el PR #68: no es un estado nuevo del
> ecosistema, es **el mismo ciclo terminado**. La versión se queda en `2026-08-28-v4`.
>
> **Los dos cambios del JSON, y nada más:**
>
> - `infrastructure[INFRA-MAIL-MCP].buzones_2026-08-28` — pasa al **estado medido en la base el
>   2026-08-29**: las tres autorizaciones **firmadas y vivas** (`revoked_at IS NULL`), con titular,
>   `signed_at` y `document_path`. La lista anterior declaraba como **vigente** un estado vencido el
>   mismo 2026-08-28, y se contradecía **dentro de su propia entrada** con `verificado_2026-08-28`,
>   con los `blockers` cerrados en el #68 y con la base.
> - `infrastructure[INFRA-MAIL-MCP]._buzones_anteriores_2026-08-28` — clave **nueva**: la lista
>   anterior **íntegra**, con el guard **⛔ NO OPERATIVO** y el motivo. **Se archiva, no se borra**
>   (`CC_PROTOCOL.md` §0 y §6), con el patrón que ya existía en esa misma entrada
>   (`_verificado_anterior_2026-08-28`, `_blockers_anteriores_2026-08-27`) — **sin inventar uno nuevo**.
>
> **Barrido de preservación:** comparación hoja a hoja del JSON contra `main` — **cero valores
> perdidos**. Fuera del JSON cae **una** cosa: el identificador del ítem retirado, que sobrevivía en
> la cabecera `v2026-08-28-v2` de `AGENDA.md` **dentro de la frase que declaraba haberlo retirado**.
> Por sí solo decía **de qué cliente y de qué materia** salió — procedencia en su forma más
> comprimida —, y era el **único sitio del sistema** donde seguía escrito.
>
> ⚠️ **Este PR no es un Actualiza, y no lo precede ni lo sigue** (decisión de Sam, 2026-08-29): la
> sesión que produjo estas correcciones tiene en contexto exactamente los datos retirados, y un
> Actualiza los reinsertaría con apariencia de actualización legítima. **Sin learnings, sin
> `session_log.md`, sin `next_session_agenda`.**

> **Nota de sincronización — MAIL-PRIV-03 (`ecosystem.json` v2026-08-28-v3 → **v2026-08-28-v4**).**
> **Este archivo no aporta contenido nuevo, y se declara.** El cambio de la pasada es una **decisión
> de gobernanza**, no de estado del ecosistema: la regla de privacidad de correo sube a
> **`protocols/MAIL_PRIVACY_RULE.md` v1.0** como documento propio y **fuente canónica**, porque se
> incumplió **dos veces en un solo día** mientras vivía repartida en tres copias y ninguna era la
> fuente. Lo que se copia, diverge (`CC_PROTOCOL.md` §6).
>
> **Qué cambió en el JSON, y sólo eso:** `_meta.version` → **`2026-08-28-v4`** (versión de
> **corrección**, no de sesión nueva: **no hay entrada nueva en `previous_sessions`** —sigue en
> **15**—, porque es la **misma sesión del 2026-08-28** corregida en su sitio, mismo criterio que
> fijaron `_correccion_2026-08-28-v2` y `-v3`), `_meta.previous` → `2026-08-28-v3`,
> `_meta.previous_chain` recoge `2026-08-28-v3` al tope, y la clave **nueva**
> `_meta._correccion_2026-08-28-v4`.
>
> **Un solo nodo de contenido cambia:** `next_session_agenda`, ítem **0**. Deja de **duplicar el
> enunciado completo de la regla** —que era la tercera copia— y queda reducido **al único pendiente
> que sigue abierto**: si la lectura de correo pasa a **sesión aparte que no ejecuta `Actualiza` ni
> Professor**, que es la solución **estructural** y no de disciplina. Más el puntero al protocolo.
> **La lista no pierde ningún ítem: sigue en 16.**
>
> **Fuera del JSON, y por eso sólo se menciona acá:** `protocols/MAIL_PRIVACY_RULE.md` **v1.0**
> (nuevo) · el `CLAUDE.md` raíz suma el protocolo a su bloque de carga obligatoria y al árbol de
> `protocols/` · la **§7 del `.github/CLAUDE.md` de `unrlvl-mail-mcp`** queda como resumen operativo
> con fuente canónica declarada, en su propio PR.
>
> ⚠️ **Corrección de un dato que CC escribió mal en el PR anterior:** la cabecera `v3` de
> `AGENDA.md` decía que **tres** `document_path` seguían apuntando a texto. Son **dos**. El de
> `UnrealvilleStudio` dice `AUTOTITULAR` y es correcto. Corregido en su sitio.
>
> ✅ **Y el residuo queda cerrado, no sólo corregido:** los dos PDF están **subidos** al bucket
> `mail-authorizations` y los dos `document_path` **apuntan al objeto** — verificado por join de
> `mail.authorizations` contra `storage.objects`. `infrastructure[INFRA-MAIL-MCP].blockers` lo
> refleja, con la causa del rechazo previo anotada: era el **acento** del nombre de archivo, no
> permisos ni RLS.
>
> **Cero regeneración, y por el motivo de siempre:** no existe generador en el repo —verificado el
> 2026-08-23—, así que «regenerar» a mano es reescribir con interpretación y borra historia
> (`CC_PROTOCOL.md` §0). Desde el 2026-08-23 **es la regla escrita en `CLAUDE.md`**, no una
> excepción. **Nota de sincronización en cabecera, cuerpo íntegro, en commit separado.**

> **Nota de sincronización — MAIL-PRIV-02 (`ecosystem.json` v2026-08-28-v2 → **v2026-08-28-v3**).**
> **Este archivo no aporta contenido nuevo, y se declara.** Barrido §6 hecho sobre el cuerpo de abajo
> y sobre las notas anteriores: **cero descripciones de lo leído**. El único cambio propio de este
> archivo es la **poda de una frase de la nota de MAIL-PRIV-01 de aquí arriba**, que decía que los
> ítems corregidos **procedían de la lectura de buzones de clientes** — es exactamente el defecto que
> MAIL-PRIV-02 viene a cerrar, y sobrevivía en el derivado. Se conserva **qué** se corrigió y **dónde**.
>
> **Qué cambió en el JSON, y sólo eso:** `_meta.version` → **`2026-08-28-v3`** (versión de
> **corrección de la corrección**, no de sesión nueva: **no hay entrada nueva en `previous_sessions`**
> —sigue en **15**—, porque es la **misma sesión del 2026-08-28** corregida **en su sitio**, mismo
> criterio que fijó `_correccion_2026-08-28-v2`), `_meta.previous` → `2026-08-28-v2`,
> `_meta.previous_chain` recoge `2026-08-28-v2` al tope, y la clave **nueva**
> `_meta._correccion_2026-08-28-v3`.
>
> **Cuatro claves podadas** — se les retira la procedencia y se conserva la constancia de gobernanza:
> `_meta.last_session.status` · `next_session_agenda` (ítems `MAIL-03`, `FPHS-FORM` y el marcador de
> ítem retirado) · `security.MAIL-03._correccion_2026-08-28` ·
> `supabase._proyectos_no_declarados_2026-08-28.forumphs-db`.
>
> **Dos nodos con estado viejo archivado, no borrado** (`CC_PROTOCOL.md` §0), con el patrón
> `_*_anterior_<fecha>` **que ya existía en el archivo** y sin inventar uno nuevo:
>
> - `infrastructure[INFRA-MAIL-MCP]` — `verificado_2026-08-28` afirmaba **0 filas en las dos tablas**
>   y que *«el sistema está completo y todavía no tiene un solo buzón dado de alta»*, **en la misma
>   entrada** que declara tres buzones activos y las dos firmas. La medición vieja baja a
>   `_verificado_anterior_2026-08-28` con guard `⛔ NO OPERATIVO`; el campo vigente refleja lo medido
>   el 2026-08-28 con `execute_sql`: **3 buzones activos, 3 autorizaciones vivas, ninguna revocada**.
>   Los `blockers` resueltos se marcan **cerrados con su fecha**, y la lista anterior queda en
>   `_blockers_anteriores_2026-08-28`.
> - `supabase.main.schemas.mail` — los dos ítems de `tables_list` cerraban con *«0 filas al
>   2026-08-28»*, contradiciendo a `filas_2026-08-28` (3 y 3) **dentro del mismo nodo**. Conteo
>   corregido; la redacción anterior queda en `_tables_list_conteo_anterior_2026-08-28`.
>
> **Cero regeneración, y por el motivo de siempre.** El brief de MAIL-PRIV-02 §2.1 volvió a pedir
> regenerar este derivado **completo**, y trae otra vez su propia salvedad —*«si CC no puede
> garantizar la regeneración completa, lo declara en el PR»*—. Es la que se aplica: **no existe
> generador en el repo** —verificado el 2026-08-23—, así que «regenerar» a mano es **reescribir con
> interpretación** y **borra historia** (`CC_PROTOCOL.md` §0). Desde el 2026-08-23 esto **no es una
> excepción, es la regla escrita en `CLAUDE.md`**. **Nota de sincronización en cabecera, cuerpo
> íntegro, en commit separado.** La regeneración real sigue abierta **sin fecha** en `AGENDA.md`.

> **Nota de sincronización — MAIL-PRIV-01 (`ecosystem.json` v2026-08-28-v1 → **v2026-08-28-v2**).**
> **Este archivo NO cambia, y se declara.** Barrido de comprobación hecho: **cero contenido derivado
> de la lectura de buzones de clientes** en el cuerpo de abajo ni en las notas anteriores. Las únicas
> coincidencias de la búsqueda son **falsos positivos declarados** (`fphs-formalize`, del Document
> Factory), y no se tocan — la advertencia de alcance de MAIL-PRIV-01 §1 dice exactamente eso: el
> riesgo no es dejarse algo, es **barrer de más**.
>
> **Qué cambió en el JSON, y sólo eso:** `_meta.version` → **`2026-08-28-v2`** (versión de
> **corrección**, no de sesión nueva: **no hay entrada nueva en `previous_sessions`**, porque es la
> misma sesión corregida **en su sitio**), `_meta.previous` → `2026-08-28-v1`, `_meta.previous_chain`
> y la clave nueva `_meta._correccion_2026-08-28-v2`. Y en cuatro sitios se **retiró un ítem** y se
> **reescribieron dos**:
> `_meta.last_session.status` · `next_session_agenda` · `security.MAIL-03` ·
> `supabase._proyectos_no_declarados_2026-08-28`.
>
> ⚠️ **El brief de MAIL-PRIV-01 §6 daba `ecosystem.json` por limpio. No lo estaba** — los tres ítems
> vivían también ahí. Se corrigieron los cuatro sitios y se declara el hallazgo.
>
> ⚠️ **Tensión con `CC_PROTOCOL.md` §0, declarada y no disimulada:** la regla suprema dice que un
> context file **nunca** pierde contenido. Esta pasada **retira contenido a propósito**, por una
> obligación legal con terceros que firmaron un documento, y por orden explícita de Sam. **No es
> precedente para borrar nada más:** la excepción es exactamente la **§5 del documento de
> autorización**. El historial de git conserva lo ya mergeado; **reescribir historia queda fuera de
> alcance**.

> **Nota de sincronización — HRD_ACTUALIZA 2026-08-28 (`ecosystem.json` v2026-08-27-v1 → **v2026-08-28-v1**).**
> **Cuerpo íntegro, cero regeneración.** Este archivo **no se regeneró**: no existe generador en el repo
> —verificado el 2026-08-23—, así que «regenerar» a mano sería **reescribir con interpretación**, justo lo que
> la instrucción *«cero interpretación»* busca impedir, y **borraría historia**, que es la regla suprema
> (`protocols/CC_PROTOCOL.md` §0). Regla escrita en `CLAUDE.md` desde el 2026-08-23.
>
> ⚠️ **El brief del 2026-08-28 §3 volvió a pedir la regeneración completa**, y trae otra vez su propia
> salvedad —*«si CC no puede garantizar la regeneración completa, lo declara en el PR en vez de sincronizar
> parcial»*—. Es la que se aplica, por el motivo de siempre. **La regeneración real sigue abierta sin fecha
> en `AGENDA.md`.**
>
> **BASE: `main`.** El Actualiza del 27-ago (**PR #63**) se mergeó el 2026-08-28 a las **16:26:40 UTC**, así
> que esta pasada ramifica de `main` y no de aquella rama.
>
> **Qué nodos cambiaron en el JSON, y sólo eso:**
>
> - `_meta.version` → **`2026-08-28-v1`**; `_meta.previous` → `2026-08-27-v1`; `_meta.last_session` con
>   fecha `2026-08-28`. El `last_session` anterior baja **íntegro** a `_meta.previous_sessions`, que pasa
>   de **14 a 15**, y `_meta.previous_chain` recoge `2026-08-27-v1` al tope.
> - `infrastructure[INFRA-MAIL-MCP]` — pasa a **OPERATIVO**. Ninguna clave previa se pierde: el `status` y
>   los `blockers` anteriores quedan **archivados** en `_status_anterior_2026-08-27` y
>   `_blockers_anteriores_2026-08-27`. Se **añaden** `auth_2026-08-28`, `conector_claude_ai`,
>   `buzones_2026-08-28` (los tres, con su estado de autorización) y `alcance_declarado_por_sam`.
> - `infrastructure[INFRA-SB-MCP]` — **se le SUMA** `auth_2026-08-28`: conserva la Vercel Authentication
>   encendida **como única protección**. La entrada no se reescribe.
> - `supabase.main.schemas.mail` — **adición**: `rls_policies_2026-08-28` (las dos políticas nuevas para el
>   rol `mail_mcp`), `filas_2026-08-28` (3 y 3, donde ayer había 0 y 0) y `_rls_nota_2026-08-28`, que
>   **declara vencido sin borrar** el campo `rls` del 27-ago.
> - `supabase.main.storage_buckets_2026-08-28` — clave **nueva**: el bucket privado `mail-authorizations`
>   y el inventario de los seis, con **por qué los cinco previos no servían**.
> - `supabase._proyectos_no_declarados_2026-08-28` — clave **nueva** (MAIL-03): `forumphs-db` y **`XMMs`**.
> - `security` — claves **nuevas** `MAIL-01`, `MAIL-02`, `MAIL-03`, `MAIL-04` y `_patron_2026-08-28`.
>   `MCP-AUTH-01` pasa a **cerrado en `unrlvl-mail-mcp` y abierto en los otros tres**, con su estado
>   anterior archivado en `_estado_anterior_2026-08-27`; `SEC-01` y `legal` reciben `_update_2026-08-28`
>   **sin que se toque nada de lo que ya decían**.
> - `google_cloud.unrlvl-mail-mcp` — **In production**; el valor anterior de `publicacion` queda archivado
>   en `_publicacion_anterior_2026-08-27`, y se añade `desbloqueo`.
> - `_repos_nuevos_2026-08-27.unrlvl-mail-mcp` — `_update_2026-08-28`, **adición**.
> - `next_session_agenda` — reemplazada por los puntos de la sesión. **La lista anterior NO se borró:**
>   queda íntegra en `next_session_agenda_archivo_2026-08-27-v1`.
>
> **Barrido estructural de preservación:** comparación hoja a hoja del JSON contra `main` — **cero valores
> ausentes** (1086 → 1179 hojas). **Ninguna línea del cuerpo de abajo se tocó.** Las cifras del cuerpo
> siguen siendo las de su fecha; lo medido el 2026-08-28 vive en `ecosystem.json`, `AGENDA.md` y los tres
> `session_log.md`.
>
> ⚠️ **Dos matices medidos frente al brief, anotados y no corregidos a mano** (HRD-R13): `forumphs-db`
> **sí figura mencionada en prosa** en `ecosystem.json` y en `AGENDA.md`, con su ref
> `tajuoqdbnsnzkhyqvdgs` — lo que **no** tiene es **nodo propio**; y **`XMMs`**, que sí está dentro de la
> cuenta de Supabase de UNRLVL, **no figura en `ecosystem.json` en absoluto**: son **dos** proyectos sin
> declarar, no uno.

> **Nota de sincronización — HRD_ACTUALIZA 2026-08-27 (`ecosystem.json` v2026-08-26-v2 → **v2026-08-27-v1**).**
> **Cuerpo íntegro, cero regeneración.** Este archivo **no se regeneró**: no existe generador en el repo
> —verificado el 2026-08-23—, así que «regenerar» a mano sería **reescribir con interpretación**, justo lo que
> la instrucción *«cero interpretación»* busca impedir, y **borraría historia**, que es la regla suprema
> (`protocols/CC_PROTOCOL.md` §0). Regla escrita en `CLAUDE.md` desde el 2026-08-23.
>
> ⚠️ **El brief del 2026-08-27 §3 pedía regenerar este archivo COMPLETO.** Su propia salvedad —*«si CC no
> puede garantizar la regeneración completa, lo declara en el PR en vez de sincronizar parcial»*— es la que
> se aplica, y por el motivo de siempre: sin generador, una regeneración a mano **no es reproducible** y el
> cuerpo de abajo lleva material acumulado que **no es derivable del JSON** (flujos, tablas de estado, notas
> fechadas). **La regeneración real sigue abierta sin fecha en `AGENDA.md`.**
>
> **Qué nodos cambiaron en el JSON, y sólo eso:**
>
> - `_meta.version` → **`2026-08-27-v1`**; `_meta.previous` → `2026-08-26-v2`; `_meta.last_session` con
>   fecha `2026-08-27` y conductor `Sam × Claude.ai + CC`. El `last_session` anterior baja **íntegro** a
>   `_meta.previous_sessions`, que pasa de **13 a 14**. Clave **nueva** `_meta.previous_chain`, que conserva
>   el valor que el puntero `previous` habría descartado (`2026-08-26-v2`, `2026-08-26-v1`).
> - **`security`** — clave **nueva** de deuda transversal: `SEC-01` (tres MCPs sin autenticación en código),
>   `SEC-02` (`unrlvl-meta-mcp/api/upload.ts`), `MCP-AUTH-01`, `ejes_declarados`
>   (**`MCP_AUTH_TOKEN`** y **`MCP_ALLOWED_ORIGINS`** — se **declaran** acá; se **introdujeron** en el PR
>   MCP-AUTH-01), `unrlvl_db_advisors` y `legal`.
> - `infrastructure` — entrada **nueva** `INFRA-MAIL-MCP`. A `INFRA-SB-MCP`, `INFRA-META-MCP` e
>   `INFRA-SHOPIFY-MCP` **se les SUMA** el campo `auth_2026-08-27`: **ninguna entrada se reescribe** y
>   ningún campo previo se pierde.
> - `supabase.main.schemas` — schema **nuevo** `mail` (2 tablas + 1 función `SECURITY DEFINER`, rol
>   `mail_mcp`, fuera de *Exposed schemas*) y `_conteo_2026-08-28` con los **18 schemas** medidos. El campo
>   `schemas.public.tables` **se conserva** con su valor anterior (80) y la remedición (**106**) se anota
>   con su fecha al lado.
> - `_repos_nuevos_2026-08-27` — clave **nueva**: repo `unrlvl-mail-mcp`, extraído de `unrlvl-context` con
>   `git subtree split`, **30 archivos** en la raíz.
> - `google_cloud` — clave **nueva**: proyecto `unrlvl-mail-mcp`, project number `212509698390`.
>   **Sin client secret**, acá ni en ningún archivo del repo.
> - `next_session_agenda` — reemplazada por los puntos de la sesión. **La lista anterior NO se borró:**
>   queda íntegra en `next_session_agenda_archivo_2026-08-26-v2`.
>
> **Barrido estructural de preservación:** comparación hoja a hoja del JSON contra `HEAD` — **cero valores
> perdidos**, 135 nuevos. **Ninguna línea del cuerpo de abajo se tocó.** Las cifras del cuerpo siguen siendo
> las de su fecha; lo medido el 2026-08-28 vive en `ecosystem.json`, `AGENDA.md` y
> `brands/UnrealvilleStudio/session_log.md`.
>
> ⚠️ **Tres discrepancias entre el brief y la medición quedan anotadas, no corregidas a mano** (HRD-R13):
> `professor_learnings` con `session_date = 2026-08-27` son **24** —los 24 aprobados, en dos lotes de 12— y
> el brief declaraba 12; **`unrlvl-supabase-mcp` tiene `ssoProtection: true`** y el brief lo declaraba
> `false`; **`unrlvl-mail-mcp` también**, o sea que la mitigación inmediata que pedía el brief **ya está
> aplicada en los cuatro proyectos MCP**. Eso **no cierra SEC-01**: el código sigue sin leer cabecera de
> credencial, y `all_except_custom_domains` **no cubre un dominio propio**.

> **Nota de sincronización — HRD_ACTUALIZA 2026-08-26 (`ecosystem.json` v2026-08-26-v1 → **v2026-08-26-v2**).**
> **Cuerpo íntegro, cero regeneración.** Este archivo **no se regeneró**: no existe generador en el repo
> —verificado el 2026-08-23—, así que «regenerar» a mano sería **reescribir con interpretación**, justo lo que
> la instrucción *«cero interpretación»* busca impedir, y **borraría historia**, que es la regla suprema
> (`protocols/CC_PROTOCOL.md` §0). Regla escrita en `CLAUDE.md` desde el 2026-08-23 tras cinco aplicaciones
> seguidas de la misma excepción. **La regeneración real sigue abierta sin fecha en `AGENDA.md`.**
>
> **Qué nodos cambiaron en el JSON, y sólo eso:**
>
> - `_meta.version` → **`2026-08-26-v2`**; `_meta.previous` → `2026-08-26-v1`; `_meta.last_session.date` →
>   **`2026-08-26`**. El `last_session` anterior queda íntegro en
>   `_meta.last_session._registro_anterior_conservado`.
> - `iid_subsystem.edge_functions` — `content-scheduler` **v6** (PUB-01, PR #98) · `content-run-stage`
>   **v94** (P3, PR #99) · `iid-process` **v48** (PR #101) · `iid-research` **v45** (clave **nueva**,
>   RESEARCH-01, PR #100). Los textos previos se conservan bajo `REGISTRO ANTERIOR (conservado íntegro)`.
> - `brands` — clave **nueva** `scheduler_rollout` en `UnrealvilleStudio` y `NeuroneSCF`
>   (`rollout_started_at 2026-08-26`); **marca nueva `LucienSael`** añadida al array (10 marcas donde había
>   9); `_update_2026-08-26` en `ForumPHs`. **UNRLVL pasa de 14 agentes a 6.**
> - `_repos_nuevos_2026-08-26` — clave **nueva**: repo `unrlvl-blog` (BLOG-01 PR-2).
> - `next_session_agenda` — reemplazada por los puntos de la sesión (P1…P5 primero, en el orden de
>   `AGENDA.md`). **La lista anterior de 43 ítems NO se borró:** queda íntegra en
>   `next_session_agenda_archivo_2026-08-26-v1`, con guard `⛔ NO OPERATIVO` (`CC_PROTOCOL.md` §6).
>
> **Ningún otro nodo del JSON cambió, y ninguna línea del cuerpo de abajo se tocó.** Las cifras del cuerpo
> siguen siendo las de su fecha; lo medido el 2026-08-26/27 vive en `ecosystem.json`, `AGENDA.md` y
> `IID/session_log.md`.
>
> ⚠️ **Dos discrepancias entre el brief y la medición quedan anotadas, no corregidas a mano** (HRD-R13):
> `intel.brand_cadence` sembró **39** filas y el brief declaraba 33; `iid-process` se sirve en producción
> como **v49** y el brief declara v48.


---

## Flujos principales

### Copy Pipeline (OPERACIONAL)
```
Sam/Claude → CopyLab UI (Orchestrator)
         → lab_jobs (Supabase)
         → pg_cron job #30 (1 min)
         → copylab-processor EF
         → brand_cache_snapshots (contexto)
         → CopyLab v9.7
         → output → Shopify / Klaviyo
```

### Brand Cache — REESCRITO 2026-08-16 · UN SOLO CONSTRUCTOR (OPERACIONAL)
```
pg_cron jobid 51  (0 */3 * * *)
   └─▶ EF brand-snapshot-builder v1        ← EL ÚNICO CONSTRUCTOR (30 tablas)
          │  ACTIVE · verify_jwt: false
          ▼
       public.brand_cache_snapshots        ← la fuente que todos leen · 13/13 marcas
          │
          ├─▶ CopyLab/api/brand-cache.js         v2.4 → v3.0  LECTOR
          └─▶ unrlvl-context/api/brand-cache.js  v1.2 → v2.0  LECTOR
                                                  (ninguno construye)
```
**Patrón lab-lee-nunca-construye** — diagrama y porqué en `skills/content-pipeline/SKILL.md`.
El lector de `unrlvl-context` consultaba **8 tablas** frente a las 30 del canónico: todo caller
suyo venía operando con contexto empobrecido **sin que nada fallara**.

**Deuda abierta:** retirar `action=build_all` de CopyLab — hoy responde **410 con puntero**. Tercer PR.

### Content Scheduler (NUEVO 2026-08-16)
```
EF content-scheduler v2.1 · ACTIVE · verify_jwt: FALSE
   auth: header x-cron-secret   (NO JWT)
   ⚠️ con verify_jwt:true el gateway rechaza ANTES de llegar al código
      → UNAUTHORIZED_NO_AUTH_HEADER · no hay código que lo arregle
   cron: PENDIENTE DE ALTA (tras verificación con candidatas reales)
   deuda: scheduledRows.push sin `voice`
```

### Brand Cache — flujo anterior, conservado (pre-2026-08-16)
```
brand-cache-builder EF
  └─ action=build → brand_cache_snapshots (NeuroneSCF v2.0)
  └─ action=build_all → todas las marcas
  └─ action=status → estado actual

CopyLab detecta: isV2 = Array.isArray(bc.creative_vectors)
Modos: v2.0_zero_query | v1.x_partial | no_cache
```

**Estado verificado 2026-08-14 — `brand_cache_snapshots` v2.4**
```
ESCRITOR: CopyLab/api/brand-cache.js v2.4 (23.546 b)
          https://unrlvl-copy-lab.vercel.app/api/brand-cache
          await upsertSnapshot(...) · SUPABASE_SERVICE_ROLE_KEY vía sbWriteHeaders()
          (LANZA si falta la key — no degrada a anon) · res.ok con throw nominal

9 MARCAS CON SNAPSHOT (todas v2.4):
  D7Herbal · ForumPHs (NUEVA · built_at 2026-08-14 21:16 UTC · manual_refresh)
  LucienSael · NeuroneSCF · PatriciaOsorioConectando · PatriciaOsorioVizosSalon
  UnrealvilleStudio · VivoseMask · VizosCosmetics

FALTAN 4 de 13 elegibles (brands.status='active' AND type<>'system'):
  DiamondDetails · PatriciaOsorioPersonal · SamPublisher · UnrealvilleStores

⚠️ NINGUNA fila tiene built_by='build_all'
   → el cron diario que brand-cache.js documenta NUNCA corrió con éxito
   → con CACHE_TTL_HOURS = 4, TODOS los snapshots están stale de forma permanente

CAPAS DEL SNAPSHOT DE FORUMPHS (verificadas una a una):
  44 creative_vectors · 10 tension_architectures · 5 aggro_presets
  18 creative_compatibility_rules · 3 genomas · 24 content_type_registry
  9 platform_canal_map · 12 pipeline_skills · brand presente

⚠️ EN EL CARRIL ASYNC ESTE CACHE NO SE LEE:
   content-run-stage L1565 mete brandContext en previousOutputs, y CopyLab hace
   req.previousOutputs.brandContext ?? await fetchBrandCache(brandId)
   → el `??` corta antes. Ítem 2 del inventario de Fase B.
```

### Pipeline Orchestrator — End-to-End (OPERACIONAL 2026-05-29)
```
Claude.ai
  └─ INSERT lab_jobs (Supabase)
       └─ pg_net → lab-worker EF
            └─ brand_context (Supabase)
            └─ CopyLab → copy generado
            └─ ImageLab → imagen generada
            └─ assets → Supabase CDN
            └─ status → pending_approval
                 └─ Sam aprueba (UI)
                      └─ Meta MCP
                           └─ IG + FB publicados
```

### Meta MCP (LIVE)
```
Servidor: unrlvl-meta-mcp.vercel.app
  └─ /api/mcp/mcp (JSON-RPC)
  └─ middleware.ts → CORS headers todos los /api/* ✅

Datos: Supabase public.meta_accounts
  └─ brand_id · page_id · ig_user_id · ad_account_id · system_token
  └─ UNREALville ✅ · UnrealvilleStudio ✅ · NeuroneSCF ✅ · LucienSael (fila ✅ — pipeline NO E2E)

Brands con acceso Meta:
  └─ UNREALville / UnrealvilleStudio ✅
  └─ NeuroneSCF ✅
  └─ LucienSael ⏳ fila existe pero NO probada en pipeline — verificar antes del 1er publish (liga 5b)
  └─ ForumPHs ✅ (fila sembrada 2026-08-21 — page_id + ig_user_id · ad_account_id NULL declarado, la marca no hace ads)
  └─ DEUDA: normalizar UnrealvilleStudio vs UNREALville (2 filas)
```

### IID Subsystem — Intelligence Insights Developers (OPERACIONAL · R4B EN CURSO)
```
Repo de contexto: unrlvl-context/IID/session_log.md (fundado 2026-06-22 — doc fundacional + session log)
Nombre canónico: IID = Intelligence Insights Developers. UNRLVL-IID = los IID de UNRLVL.
Schema: intel (NO public)

FLUJO COMPLETO:
  CRON (jobids 2-28, trigger_iid_agent) → iid-research → iid_research_raw
    → iid-process → iid_findings → iid_content_queue (brand_id + domain)
    → content-dispatcher v36 (jobid 29, cada 30min, .limit(5) DISPATCH_LIMIT + lee scheduled_for)
    → content-run-stage v57 (deploy 2026-07-29):
         ├─ Builder CopyLab (execLab + builder_input; endpoint desde lab_configs) ✅ A1 lo cableó, A3 retiró el generador local
         ├─ AIFE filter
         ├─ ImageLab → Vertex (gemini-2.5-flash-image, migrado 24-jun) → Storage unrlvl-media (CDN)
         ├─ SocialLab(runSocialLabDirect) ⚠️DESVIACIÓN (motor LOCAL; debe llamar a SocialLab por su api_endpoint)
         └─ callWatcher → content-watcher build _18 (8 gates; reglas por código desde intel.watcher_rules)
    → content_pieces (awaiting_approval) → email content-approval@unrealvillestudio.com
    → Orchestrator (orchestrator-unrlvl.vercel.app, aprobación Sam)
    → approve-piece v14 (publish Meta + move-to-permanent)

STAGE 0 DECLARADO Y NUNCA EJECUTADO (verificado 2026-08-14):
  lab_configs → audience_brief · iid_stage_order = 0 · active = true
                api_endpoint = https://unrlvl-context.vercel.app/api/brand-cache
  ⚠️ content-dispatcher/index.ts dispara body {job_id, stage_order: 1} HARDCODEADO
     → el stage 0 no se alcanza jamás
  ⚠️ content-run-stage NO tiene rama para audience_brief
     (la cadena L2233-2447 sólo cubre copylab / aife / imagelab / sociallab)
     → caería al else de L2467 con isCritical=false, dejando el job en processing
       SIN llamar a fireNextStage → STALL SILENCIOSO
  Trampa latente, no fallo activo. O se cablea, o se desactiva en lab_configs.

ALCANCE DEL DESVÍO — HISTÓRICO (levantado 2026-08-14; la rama copylab ya no aplica):
  L2201-2203  el stage lee lab_configs INCLUYENDO api_endpoint para todos los labs
  rama copylab → execLab(lab.api_endpoint, ..., builder_input) ✅ desde A1; el generador local se borró en A3
  L2424-2427  rama sociallab → runSocialLabDirect(...) → L1377, fetch directo — SIGUE PENDIENTE
  CONTRASTE:
  L2310  aife     → execLab(lab.api_endpoint, ...) ✅
  L2362  imagelab → execLab(lab.api_endpoint, ...) ✅
  L2336  imagelab && canalForPlatform(platform1) === CANAL_NONE → salta imagen (email)
  → de 4 labs invocados, 2 llaman al lab y 2 reconstruyen su motor

AGENTES (intel.iid_agents, 29 = 28 research + 1 sentinela):
  └─ 1 core: IID-CORE
  └─ 13 legacy IID-* (CORRIENDO, last_run reciente): IMAGE, LLM*, VIDEO, VOICE, GOOGLE,
       LINKEDIN*, META, TIKTOK, X*, ECOMMERCE, FLORIDA, PERSONAL-BRAND*, WHOLESALE
       (* = default_voice lucien, legado del encaje a la fuerza — investigan marketing, no filosofía)
  └─ 14 UNRLVL-* (creados 15-jun, last_run NULL — SIN ejecutar aún):
       Tier1 método: CONTEXT-ENGINEERING, BRAND-VOICE-SYSTEMS, AI-INDUSTRIALIZATION, CRO-PSYCHOLOGY, SIGNAL-LEARNING-LOOPS
       Tier2 deep-stack: META-DEEP-STACK, GOOGLE-DEEP-STACK, ALGORITHM-MECHANICS
       Tier3 mercado: ECOMMERCE-DEEP, SHOPIFY-STACK, MARKET-FLORIDA, DROPSHIP-REALITY, WHOLESALE-LOGISTICS-FL, CREATOR-MACRO-ECONOMY
       Hard rule: todo con números + profundidad de código, nada filosófico (eso es Lucien).
  └─ 1 sentinela: IID-SEEDER (ce44ac81, is_active=false — satisface FK agent_id de iid-inbound, NO corre research)

EDGE FUNCTIONS:
  └─ content-dispatcher v47 (B2: lee scheduled_for + .or(is.null,lte.now) + order ASC NULLS FIRST; B3: .limit(5) DISPATCH_LIMIT; transporta domain a builder_input)
  └─ content-run-stage build _74 (Builder + labs + callWatcher + domain-write jobs/pieces/queue; #95-D bloque CANAL: email_propietarios saltea imagen)
  └─ content-watcher build _29 (8 gates: los 6 + gate7 objective_stimulus + gate8 visual_sibling, blocking; 29-jul reglas enumeradas por código desde intel.watcher_rules —precedencia brand>sector>gen—, gate4/evidence cableado a marcas neutralizado, código de regla en watcher_log.gate_detail + bandeja, watcher_full_scan ON)
  └─ approve-piece v14 (publish Meta + move-to-permanent; reject sin rejected_reason → #5r)
  └─ iid-core v47 (#93 fan-out multimarca: deja de generar copy, brief neutro en aife_output.content.content; Ruta B en fanout.ts: preset derivado del objetivo; mata default_voice; body.domain override) · iid-inbound / deploy build _14 (Sonnet 5; cerebro Sembrador: capture/approve/reject/list, verify_jwt=false)
  └─ aife-filter (deploy build _28, Sonnet 5) · brand-context-builder (deploy build _19, Sonnet 5) · lab-worker v23 · copylab-processor · iid-ecommerce · iid-approval-digest v2 (26-jul; digest diario 7am ET del corpus de calibración de aprobación, lee intel.approval_calibration)

GOBIERNO (intel.brand_topics):
  La MARCA declara qué consume y con qué voz por destino. El agente investiga neutro.
  angle = territorio (qué/dónde); genoma = ejecución (cómo).
  Cadencia Interpretación A: por-marca-por-plataforma; dominios rotan, NO multiplican.
  Arquitectura híbrida queue: queue lleva brand_id+domain (puente); brand_topics fuente única de platforms/cadence/rollout.

VERTEX (desbloqueado 2026-06-22):
  GOOGLE_SERVICE_ACCOUNT_KEY + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION en Supabase Secrets.
  Proyecto gen-lang-client-0491381650 (SA imagelab-vercel). Embeddings gemini-embedding-001 @768.

R4B (deadline 1ª sem julio):
  HECHO: 5e-5 DDL (domain+pgvector v0.8.0), 5o/5p-a/5q (v36), 5e-4 content-watcher v1 (v37),
         arquitectura híbrida queue, #5i genoma v1.0 Lucien, Vertex desbloqueado.
  PENDIENTE: 5e-1 Scheduler (especificado, desbloqueado), 5e-2/5e-3 embeddings+gates (Chat 2),
         parche dispatcher, 5b publicación real, 5r rejected_reason, 5s limpieza queue, validación v1.0.
```

### Professor (OPERACIONAL)
```
Proxy: unrlvl-context.vercel.app/api/professor
  └─ ping · get-context · checkpoint · evaluate
  └─ log-case · submit-learning · approve-learning

Storage: Supabase amlvyycfepwhiindxgzw
  └─ professor_decision_criteria · professor_veto_rules
  └─ professor_learnings · professor_manuals · professor_platform_variables

Checkpoint: silencioso cada 10 mensajes
```

### Shopify MCP
```
Servidor: unrlvl-shopify-mcp.vercel.app
  └─ /api/mcp/mcp · write_orders ✅ · OAuth callback live
```

### Supabase MCP (unrlvl)
```
Servidor: unrlvl-supabase-mcp.vercel.app
  └─ /api/mcp/mcp · v1.2.1
```

### Voces de marca (brand_voice_genome)
```
Una marca → varias voces hermanas (mismo temperamento, distinta respiración)
Unique (brand_id, voice_id, version)

LucienSael:
  └─ lucien_editorial v1.0 (919e3707) — blog/ensayo/long-form — respira largo
  └─ lucien_social   v1.0 (5b571b08) — Meta FB/IG + TikTok texto + X — muerde corto ≤280
       core_move v1.0: generativo/constructor (parte de su mirada, aporta) — NO reactivo/léxico
       8 campos nuevos (muestreo #5i): closing_repositions, purpose_and_audience, restraint_as_power,
       the_edge_lands_in, compression_over_explanation, the_accusing_question, elegance_is_the_blade, thematic_gravity
       Exclusiones: luciensael.com (=editorial) · LinkedIn publish (no cuenta) · video/voz (=futuro lucien_video)
       Cita-por-destino: redirect X/Meta/TikTok → social; .com o nativo long-form → editorial

SamPublisher:
  └─ sam_personal v0.5 — Meta(FB) + LinkedIn — personal public voice + vocero Lucien/UNRLVL

UnrealvilleStudio:
  └─ unrlvl_default v1.0 — Defiant precision

ForumPHs (verificado en brand_voice_genome 2026-08-14):
  └─ fphs_conversion   v1.1 — ✅ active 2026-08-09 — signature_closer presente
       22 de los 32 topics activos de la marca (11 editorial + 11 social)
       ⚠️ SIN fila en creative_compatibility_rules en ningún content_type
  └─ fphs_educativa    v1.1 — ✅ active 2026-08-10 — signature_closer presente — 14 topics
  └─ fphs_editorial    v1.1 — ✅ active 2026-08-11 — signature_closer presente — 7 topics
  └─ fphs_institucional v0.5 — ⛔ INACTIVE — declarada por primera vez 2026-08-14
       sin topics · sin fila en content_type_registry · signature_closer null explícito

Futuros: genoma social UNRLVL · lucien_video
```

### OnboardingApp — Voice Genome Gap
```
v1.0 puebla 5 tablas: brands · humanize_profiles · compliance_rules · brand_palette · brand_typography
NO captura: brand_voice_genome (capa editorial)
Fix: Fase 5 — spec lista en VOICE_GENOME_PHASE_SPEC.md
     2 ramas: Voz Extraída / Voz Diseñada + derivar social desde editorial + modo cita voceros
```

---

## Repositorios GitHub (unrealvillestudio-hub)

| Repo | Deploy | Estado |
|---|---|---|
| Orchestrator | orchestrator-unrlvl.vercel.app | ✅ v4.1 |
| CopyLab | unrlvl-copy-lab.vercel.app | ✅ v9.7 |
| ImageLab | image-lab-unrlvl.vercel.app | ✅ v7 — gemini-2.5-flash-image (migrado 24-jun) + BGRemover |
| SocialLab | social-lab-flame.vercel.app | ✅ live |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | ✅ live |
| unrlvl-context | unrlvl-context.vercel.app | ✅ LIVE |
| unrlvl-meta-mcp | unrlvl-meta-mcp.vercel.app | ✅ LIVE |
| unrlvl-shopify-mcp | unrlvl-shopify-mcp.vercel.app | ✅ LIVE |
| unrlvl-supabase-mcp | unrlvl-supabase-mcp.vercel.app | ✅ v1.2.1 |
| unrlvl-social-media-agent | unrlvl-social-media-agent.vercel.app | ✅ LIVE |
| DDMV-Assistant | ddmv-assistant.vercel.app | ⚠️ FIX NEEDED |
| luciensael-web | — | ⏳ GREENFIELD — paquete listo, deploy pendiente |
| unrlvl-iid-functions | (Supabase deploy) | ✅ fuente de las EFs IID (deploy manual por MCP desde main) |
| unrlvl-ayra | — | ⏳ POR CREAR |

**Staging workflow configurado en 15 repos.** Branch protection activa en 13. Bloqueada en 2 (privados GitHub Free): unrlvl-supabase-mcp, unrlvl-meta-mcp.

---

## Supabase — Schemas y tablas clave

### public (80+ tablas)
```
brands · humanize_profiles · compliance_rules · brand_palette · brand_typography
brand_voice_genome ← clave para pipeline IID + CopyLab
   └─ LucienSael: lucien_editorial (919e3707) + lucien_social (5b571b08) — ambas v1.0 active
   └─ UnrealvilleStudio: unrlvl_default v1.0 · SamPublisher: sam_personal v0.5
brand_cache_snapshots ← zero-query mode
lab_jobs · lab_configs · copylab_jobs
meta_accounts · scheduled_posts
professor_* (decision_criteria, veto_rules, learnings, manuals, platform_variables)
nscf_fulfillment_log · nscf_fulfillment_log_archive
imagelab_presets · person_blueprints · location_blueprints · product_blueprints · brand_copy_profiles
speaks_sessions · speaks_messages · speaks_leads · speaks_golden_pass
```

### intel (IID — Intelligence Insights Developers — NO public)
```
iid_agents (29) · brand_topics · iid_content_queue (+ domain) · iid_findings
iid_research_raw · iid_cron_runs · iid_briefs · iid_scheduler_config · watcher_log
iid_seeds (semillas humanas del Sembrador: source_url/raw_signal/neutral_topic/mapeo/lane/status, 25-jun)
brand_rollout (NUEVA 2026-08-16: rollout_started_at + max_rotation_weeks[alias legacy])
brand_cadence (NUEVA 2026-08-16: cadence_mode/anchor son alias legacy, retiro en paso 3)
brand_topic_platform_mode (NUEVA 2026-08-16: modo por (topic, plataforma) — granularidad correcta)
content_embeddings (NUEVA 2026-08-16: vector(768) + HNSW + GRANT service_role · ⚠️ creada, NO cableada)
watcher_rules (54 reglas por código HR-*/IMG-*: subject/sector/scope, precedencia brand>sector>gen, 29-jul) · brand_sector (9 marcas→RETAIL/LEGAL/PERSONA, UnrealvilleStudio sin sector, 29-jul)
```

### content
```
orchestrator_jobs (+ domain) · content_pieces (+ domain) · content_calendar
content_performance · brand_context_cache · brand_voices
```

### shopify
```
stores · audit_runs · fix_log + otras
```

### public.ops_* — capa de instrumentación de costo (2ª ola 2026-08-04 · 3ª ola 2026-08-05)
```
ops_generation_ledger (+billable) · ops_lab_rates · ops_model_pricing
ops_token_sessions_retired (ex ops_token_sessions, RETIRADA 2026-08-04)
ops_rate_transitions · ops_invoice_by_app
ops_costs (14 cols: +billable +amount_original +currency_orig) · ops_credits (3 filas)
ops_services (20 servicios: anthropic · anthropic_plan · vertex · google_ai · resend · twilio ·
  klaviyo · elevenlabs · creatomate · fal_ai · runway · tenzorart · heygen · supabase · vercel ·
  github · hostinger · cloudflare · shopify · custom)
ops_cost_residual (residuo de brecha ledger<->Console por scope; vigente = valid_to NULL;
  2 filas: document-factory 12% · fie 3,5%, 2026-08-05)
vistas: v_cost_pivot (31 col) · v_cost_por_dimension · v_rate_gaps · v_reconciliacion ·
  v_cost_residual_vigente (residuos vigentes, valid_to IS NULL, 2026-08-05)
```

---

## Protocolo de archivos — unrlvl-context repo

```
/
├── ecosystem.json                    ← fuente de verdad
├── ecosystem.md                      ← render narrativo (generado)
├── ecosystem_filemap.md              ← este archivo (generado)
├── ecosystem_graph.json              ← grafo nodos+edges (generado via audit) ⚠️ PENDIENTE AUDIT (desactualizado 05-26)
├── AGENDA.md                         ← agenda visual (generado)
├── CAPABILITIES.md                   ← catálogo de capacidades (carga en arranque)
│
├── IID/                              ← NUEVO 2026-06-22 — hogar de contexto del IID
│   └── session_log.md                ← doc fundacional (§1-§8 cuerpo estable) + session log (§9 al tope)
│
├── infrastructure/
│   ├── meta-mcp/ · shopify-mcp/ (futuro) · supabase-mcp/ (futuro)
│
├── labs/                             ← session logs por lab
│   ├── ImageLab/                     ← NUEVO 2026-06-24 — migración Imagen→Gemini v7 + BGRemover
│   │   └── session_log.md
│   └── OnboardingApp/
│       └── session_log.md            ← v1.0 + Voice Genome gap (Fase 5)
│
├── brands/
│   ├── LucienSael/  (BP_Brand_Person_id.md · session_log.md — genoma v1.0)
│   ├── SamPublisher/ (brand.json · session_log.md — sam_personal v0.5)
│   └── [Marca]/ (brand.json · BP_Brand_Context.md · session_log.md)
│
├── agents/
│   ├── social-media-agent/ · ddmv-assistant/ · forumphs-speaks/
│
├── skills/
│   ├── INDEX.md · [nombre]/SKILL.md
│
├── protocols/
│   ├── SESSION_PROTOCOL.md · HRD_PROTOCOL.md · CC_PROTOCOL.md
│   ├── MULTIBRAND_RULE.md (regla inviolable — eje en código, instancia en dato)
│   ├── DELIVERY_AND_VERIFICATION_RULE.md (regla inviolable — destinatario, idioma, evidencia y las cuatro QA)
│   ├── AYRA_MASTER_PLAN.md · VOICE_GENOME_PHASE_SPEC.md
│   ├── IID_OUTPUT_QUALITY_LOTE_A_SPEC.md
│   ├── R4B_HANDOFF_CHAT1.md · R4B_RESPUESTA_CHAT1.md · R4B_MAPEO_CHAT2_CC.md
│   ├── DIAGNOSTICO_ANGLE_READONLY_CC.md
│   └── CONTEXT_SYSTEM_REFACTOR_PLAN.md (pendiente crear)
│
└── knowledge/
    └── ecosystem/ (decision-matrix/ · professor/)
```

**Regla agents/ vs infrastructure/:** `agents/` = conversacionales con canal (WhatsApp/web/SMS); `infrastructure/` = herramientas técnicas (MCPs, proxies, APIs).

---

## Dependencias críticas

```
IID pipeline (OPERACIONAL · R4B en curso):
  brand_voice_genome (lucien_editorial + lucien_social v1.0) ← ✅ generativo/constructor
  brand_topics ← gobierno de voz/tema/cadencia (fuente única de platforms/cadence/rollout)
  iid_content_queue (+ domain) ← puente brand_id+domain para el Scheduler
  content-run-stage v52 ← Builder + labs + callWatcher (#95-D bloque CANAL)
  content-watcher v2 (build _14) ← 8 gates
  content-dispatcher v36 (.limit(5) DISPATCH_LIMIT + lee scheduled_for — B2/B3 2026-07-25)
  Vertex (GOOGLE_SERVICE_ACCOUNT_KEY en Supabase) ← embeddings 5e-2
  Scheduler content-scheduler ← especificado, desbloqueado (write ya en v37)

Pipeline end-to-end (operacional):
  brand_cache_snapshots · lab_jobs · lab-worker EF
  Meta MCP → meta_accounts ← UNREALville/UnrealvilleStudio/NeuroneSCF/LucienSael
  └─ LucienSael ⏳ verificar pipeline E2E antes del 1er publish (liga 5b)

luciensael.com deploy: repo GREENFIELD · Vercel + DNS por crear

ecosystem_graph.json: ⚠️ PENDIENTE ecosystem audit (datos del 05-26 — IID dice frozen/14 agentes/v22, ya falso)
```
