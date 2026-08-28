# Unrealville Studio — Ecosistema

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.

_Regenerado desde ecosystem.json **v2026-08-16-v1** (2026-08-16) · base previa: generado desde ecosystem.json v2026-06-24-v1 · No editar manualmente · ImageLab v7 (migración Imagen→Gemini) + BGRemover actualizados al estado vivo 2026-06-24; secciones IID/genomas/NSCF preservadas del 2026-06-22 · regla de nomenclatura de labs y corrección del flow (el generador local) sincronizadas desde ecosystem.json v2026-08-01-v1 · versiones del registro edge_functions sincronizadas al estado real (list_edge_functions) 2026-08-01: content-run-stage v74 · iid-core v47 · content-watcher v29 · content-dispatcher v47 (menciones fechadas preservadas) · capa de instrumentación de costo (ops_*) 2ª ola sincronizada desde ecosystem.json v2026-08-04-v1: ops_services (20) · ops_credits · billable en ops_costs+ops_generation_ledger · ops_token_sessions→ops_token_sessions_retired · v_cost_pivot 31 col · capa de costo 3ª ola sincronizada desde ecosystem.json v2026-08-05-v1: ops_cost_residual + v_cost_residual_vigente (residuo de brecha ledger↔Console por scope: document-factory 12% · fie 3,5%) · REGLA MULTIMARCA instalada 2026-08-07: sección propia + clave `multibrand_rule` sincronizada desde ecosystem.json (adición aditiva, sin bump de _meta.version) · HRD_ACTUALIZA 2026-08-08 sincronizada desde ecosystem.json v2026-08-08-v1: `nscf_editorial` v1.0 (AUTHORITY, 4 topics) y `fphs_conversion` reactivada (abandoned→active) registradas en `brand_topics.subscriptions` · `content_type_registry` (+`max_tokens`, +`format_instruction` por (content_type, voice_id)) listada en tables.content · `multibrand_rule` 4/5 casos pagados (pendiente `OBJECTIVE_LABEL_TO_TAG`) · HRD_ACTUALIZA 2026-08-13 sincronizada desde ecosystem.json v2026-08-13-v1: sesión de posicionamiento y web pública (tesis canónica de marca sellada; la web vive en `CoreProject`, PR #3) — ningún nodo del JSON cambia salvo `_meta` (`version`→2026-08-13-v1, `previous`→2026-08-08-v1, `last_session` 2026-08-08 movido a `previous_sessions`); el cuerpo de este derivado se conserva íntegro · ACTUALIZA 2026-08-09-v3 (tramo 3, registrado 2026-08-13): dos secciones de política añadidas — «Política de idioma del ecosistema» (`es`|`en`, spanglish prohibido, EN→ES en bilingües, excepción `VAL`/`EN-UK` de DiamondDetails; normalización del 2026-08-09 en 11 columnas de 7 tablas) y «Firmas de marca (`signature_closer`)» (ForumPHs/NSCF/Lucien/UNRLVL sembradas, `null` declarado en `fphs_institucional`/`po_consumer`) — patrón de sección de política, como la Regla Multimarca; sin bump de `_meta.version` en el JSON (ecosystem.json no declara idioma ni firmas por marca, no se toca). Adición aditiva, historia preservada · HRD_ACTUALIZA 2026-08-14 sincronizada desde `ecosystem.json` v2026-08-14-v1 (reconciliación de estado AIID/CopyLab, verificada por código y SQL): tabla de voces corregida (las 3 voces de ForumPHs en v1.1 activas — `fphs_conversion` deja de figurar "en calibración / 0 filas" — más `fphs_institucional` v0.5 inactiva, declarada por primera vez) · CopyLab modo carril v9.7 registrado en Labs (Fase A cerrada en producción) · alcance verificado del desvío `generadorLocal` (líneas de `content-run-stage`) añadido a Labs e IID Subsystem · `brand_cache_snapshots` y `audience_brief` stage 0 añadidos a IID Subsystem · `dated_2026-09-01` (vencimiento del introductorio de Sonnet 5) marcado CANCELADO en la capa de costo. Sólo campos presentes literalmente en el JSON; el cuerpo previo se conserva íntegro. Adición aditiva, historia preservada · HRD_ACTUALIZA 2026-08-18 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-18-v1: los únicos nodos que cambian en el JSON son `_meta` (`version`→2026-08-18-v1, `previous`→2026-08-16-v1, `last_session` 2026-08-16 movida íntegra a `previous_sessions`) y `iid_subsystem.labs_wiring.imagelab`, donde la afirmación «ÚNICO lab que el carril invoca de verdad por su endpoint» quedó vencida con el cable de CopyLab: hoy son TRES de cuatro (copylab, aife, imagelab) y el que falta es sociallab, que sigue armando su post con `runSocialLabDirect`. **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA (decisión de Sam, 2026-08-18):** este derivado **NO se regenera completo**. No existe generador en el repo, así que "regenerar" a mano no es regenerar: es reescribir con interpretación —justo lo que la instrucción «cero interpretación» busca impedir— y borra historia, que es la regla suprema del `CC_PROTOCOL.md` §0. Se aplica el precedente del 2026-08-13: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real queda abierta **sin fecha** en `AGENDA.md` v2026-08-18-v1, junto con la deuda de que este archivo fue editado a mano en el PR #51 · HRD_ACTUALIZA 2026-08-20/21 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-21-v1: los nodos que cambian en el JSON son `_meta` (`version`→2026-08-21-v1, `previous`→2026-08-18-v1, `last_session` 2026-08-18 movida **íntegra** a `previous_sessions`) y `brands[ForumPHs]`, cuyas cinco claves previas (`id`, `name`, `type`, `market`, `status`) quedan intactas y al que se le **añaden** `domain`, `meta_accounts` (canal operativo end-to-end: `page_id`, `ig_user_id`, `ad_account_id` NULL declarado), `iid_agents` (los 6 agentes propios + el fix del `CHECK` que los hizo posibles), `voices` (3 en v1.1 activas + `fphs_institucional` v0.5 inactiva) y `r4b_status` (contenido + canal listos, publicación desde 2026-08-22, 0 de 27 piezas aprobadas). **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA, tercera aplicación:** este derivado **NO se regenera completo**. El motivo no ha cambiado desde el 2026-08-13 y el 2026-08-18: no existe generador en el repo, así que "regenerar" a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Este archivo lleva además cuerpo acumulado que **no es derivable** del JSON (flujos, tablas de estado, notas fechadas): una regeneración literal lo vaciaría. Se aplica el precedente: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-21-v1 · HRD_ACTUALIZA 2026-08-22 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-22-v1: los nodos que cambian en el JSON son `_meta` (`version`→2026-08-22-v1, `previous`→2026-08-21-v1, `last_session` 2026-08-20/21 movida **íntegra** a `previous_sessions`) y `brands[ForumPHs]`, que pasa a **PUBLICANDO**. Ninguna clave previa del nodo se pierde: los cuatro campos de `r4b_status` que cambiaron (`state` «contenido + canal LISTOS»→«PUBLICANDO — al aire desde 2026-08-22», `canal`, `aprobacion` «0 de 27 piezas aprobadas», `bloqueante_abierto` `AUDIENCE_CTA`) quedan **archivados** en claves `_*_anterior_2026-08-21`, y el `iid_agents.last_run_at` anterior en `_last_run_at_anterior_2026-08-21`. Lo demás es **adición**: `publishing_state` · `primer_publish` (**el primer publish de la historia del sistema** — FB `1184045168120977_122131069905355949` a las 12:44:41 UTC e IG `17943396402322068` a las 12:45:06 UTC, con permalink, `piece_id`, dominio, voz y título de cada pieza; modo **manual-asistida** porque el `publisher-cron` de `scheduled_posts` no existe todavía; mecánica Meta validada: `fb_publish_photo` toma `url`, no `photo_url`) · `visual_identity` (escena bajo preset + **EB Garamond** estampado por el compositor de cómputo propio + **franja lila `#5C3472`** `edge_left` `full_bleed` por el lado corto; vocabulario de canal correcto —`FACEBOOK_FEED`/`INSTAGRAM_FEED`/…— frente al legacy `LANDING`/`META` conservado; guarda `OVERLAY_TEXT_MISSING`) · `calibration_rules_sam` (las **3 reglas de Sam** —el título cierra la idea solo · el texto CONDUCE · «la cuota extraordinaria» siempre completa— más la regla de encaje, con la advertencia de que todavía **no están en el sistema**) · `dominio_asamblea_2026_08_22` (rechazo de lote por afirmación legal falsa para Panamá, Ley 284/2022, y regeneración con requisito legal) · y `iid_agents` cableado a `cron.job` **52–63** (21 corridas/mes, 3 de 6 con `last_run_at`). **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA, cuarta aplicación:** este derivado **NO se regenera completo**. El motivo no ha cambiado desde el 2026-08-13, el 2026-08-18 y el 2026-08-21: no existe generador en el repo, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Se aplica el precedente: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-22-v1 · HRD_ACTUALIZA 2026-08-23 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-23-v1: los nodos que cambian en el JSON son `_meta` (`version`→2026-08-23-v1, `previous`→2026-08-22-v1, `last_session` 2026-08-22 movida **íntegra** a `previous_sessions`), `iid_subsystem.edge_functions.content-watcher` (**v29 → v37** — desplegada por CLI el **2026-08-23 16:14:08 UTC** con `--no-verify-jwt`, cerrando **PR #79 (WATCHER-01)**: aporta `sortRulesByCode` —orden determinista— y `evaluated_codes` —qué reglas vio el juez, consultable—; **el registro anterior de v29 se conserva íntegro dentro del mismo valor**, tras el separador `||`), `iid_subsystem.tables` (**cinco ejes nuevos, todos ADICIÓN**: `intel.brand_publish_channels` · `intel.pipeline_cutoffs` · `intel.brand_topics.theme_key`/`public_label` · `content.content_pieces.slug` · `content.content_pieces.discarded_at`/`discarded_reason`) y `brands[ForumPHs]`, al que se le **añaden** `publish_channels` (**blog OPERATIVO** — `forumphs.com/blog`, provider `vercel_html`, HTML servido por función serverless, SEO-first, 2 artículos publicados, rótulo de menú «Sin tecnicismos», H1 «Hablemos sin tecnicismos», URL fija en `/blog`; y **email DECLARADO Y NO OPERATIVO** — Klaviyo, lista `VWwDjP`, `active = false` hasta que complete la autenticación DKIM/SPF de `envios.forumphs.com`), `public_themes` (32 dominios en **5 temas**) y `register` (**usted**: `HR-FPHS-07` rige la instrucción al escritor, no sólo el texto entregado). **El único valor sustituido en todo el JSON, además de los de versión, es `brands[ForumPHs].r4b_status.contenido`**: el ratio de PASS pasa de **25,9 % a 18,5 %**, y el valor anterior queda **archivado** en `_contenido_ratio_anterior_2026-08-22` — no borrado. **EXCEPCIÓN DECLARADA AL HRD_ACTUALIZA, quinta aplicación:** este derivado **NO se regenera completo**. El motivo no ha cambiado desde el 2026-08-13, el 2026-08-18, el 2026-08-21 y el 2026-08-22: no existe generador en el repo, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Se aplica el precedente: nota de sincronización en cabecera, **cuerpo íntegro**, en commit separado. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-23-v1 · HRD_ACTUALIZA 2026-08-24/25 **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-25-v1. Los nodos que cambian en el JSON son: `_meta` (`version`→2026-08-25-v1, `previous`→2026-08-23-v1, `last_session` 2026-08-23 movida **íntegra** a `previous_sessions`, que pasa de 11 a 12); `iid_subsystem.edge_functions`, donde **cada versión nueva conserva su registro anterior íntegro** tras el separador `||` — `content-run-stage` **v74 → 92** (corrector determinista **pre-juicio**: lo que una regla sabe reparar sola no llega al juez), `content-watcher` **v37 → 43** (`gate9Language`, **informativo**, marca 1 error en 11 de 22 piezas; y el **backfill de embeddings**, cuyo parámetro es **`days`**, no `window_days`), `content-scheduler` **v2 → 5** (**modo `placement`: el eje de colocación que faltaba**, y el cierre del bloqueante declarado el 2026-08-23), `iid-core` **v47 → 54** y `approve-piece` **v14 → 39** (**sellado de aprobación**: aprobar y publicar dejan de ser el mismo acto), más las **tres EF nuevas** `iid-process` **47**, `judge-arbitration` **2** y `piece-edit` **2** — las dos últimas con **`verify_jwt: true`**, asimetría **deliberada** frente al resto del carril, que usa `--no-verify-jwt` porque lo llama el cron vía `pg_net`; `iid_subsystem.tables` (**todo adición**: `intel.judge_calibration` · `intel.piece_edits` · `watcher_rules.condition`/`verify_pattern`/`fix_replacement`/`enforced_on` —con los **dos motores** declarados, POSIX y ECMAScript— · `brand_topics.angles` · las seis columnas nuevas de `content_pieces` · los dos `CHECK` ampliados · la clave nueva `public` con `scheduled_posts.piece_id`); y `brands[ForumPHs]`, cuyos cuatro campos de `r4b_status` que cambiaron (`state`, `canal`, `aprobacion`, `bloqueante_abierto`) quedan **archivados** en claves `_*_anterior_2026-08-23` — no borrados — y al que se le **añaden** `procedencia` (**PROC-01**: 15 hallazgos, cero ley numerada, cero año calendario, contra 3 de 5 contaminados), `angles` (**los seis ángulos** con su matriz ángulo-voz y **el criterio de las ausencias**) y `politica_de_enlaces` (**la fuente se nombra, nunca se enlaza**). `next_session_agenda` recibe **seis entradas al tope, ninguna retirada**. **Hito del JSON:** `5e9f03ef` salió **sola** en Facebook el **2026-08-25 13:13 UTC**, drenada por el cron `content-placement-poll` (jobid 66, `*/15`) — **primera publicación automática del ecosistema**. **LA EXCEPCIÓN DEJÓ DE SER EXCEPCIÓN:** este derivado **no se regenera completo**, y desde el 2026-08-23 eso ya no se declara como excepción sino que **es la regla escrita en `CLAUDE.md`** («Los derivados NO se regeneran completos — se sincronizan»), tras cinco aplicaciones seguidas de la misma excepción (13, 18, 21, 22 y 23 de agosto). El motivo no cambió: **no existe generador en el repo**, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Nota de sincronización en cabecera, **cuerpo íntegro**, en **commit separado**. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-25-v1 · HRD_ACTUALIZA CHECKPOINT 2 (sesión 2026-08-25) **sincronizada, NO regenerada**, desde `ecosystem.json` v2026-08-26-v1. Los nodos que cambian en el JSON son **cuatro, y ninguno pierde una sola clave** — verificado por barrido estructural: **640 claves antes, 640 después, cero perdidas y cero nuevas**, y **cero strings previos ausentes** del archivo. (1) `_meta` (`version`→2026-08-26-v1, `previous`→2026-08-25-v1, `last_session` 2026-08-24/25 movida **íntegra** a `previous_sessions`, que pasa de **12 a 13**). (2) `iid_subsystem.edge_functions`, donde **cada versión nueva conserva su registro anterior íntegro** tras el separador `||` — `content-run-stage` **92 → 93** (2026-08-25 **23:51 UTC**, PR #93: **SIGN-01**, la firma la pone el sistema y se corrige el truncamiento que el juez no podía ver; queda anotada **la cronología**, porque este deploy fue **posterior** a la generación del run —17:10-19:41— y por eso la proyección 63 % / 81,5 % es **proyección, no medición**; y el defecto abierto en esta misma EF: **el texto adaptado por plataforma no pasa por el juez**, líneas 3134-3136, verificado con `social.adapted` reintroduciendo una cita de ley que `aife_filtered` ya no tenía) y `content-watcher` **43 → 44** (2026-08-25 **23:13 UTC**, PR #92: sostiene el run con **9 arbitrajes**, que dan por primera vez **tasa de falso positivo medida y no estimada** —`HR-FPHS-15` 100 %, `HR-FPHS-13` 100 %, `HR-LEGAL-01` 75 %— y lee las reglas reescritas `HR-FPHS-11`, `HR-FPHS-15` y la nueva `HR-FPHS-16`). (3) `iid_subsystem.edge_functions.content-scheduler`, que **no cambia de versión pero sí de estado operativo**: sigue en **v5** y su **drenaje quedó APAGADO** —cron 66 `content-placement-poll`— hasta que cierre **PUB-01**, porque el drenaje **da por publicado con un `200` de SocialLab sin verificar el efecto** y no hay **ni una publicación automática real**; el registro anterior se conserva íntegro tras el `||`. **El carril COLOCA; todavía no se puede afirmar que PUBLICA.** (4) `next_session_agenda`, que recibe **cinco entradas al tope y no pierde ninguna** (38 → 43): PUB-01 · el texto adaptado sin juez · `deno check` antes de dar por bueno un PR · las tres reglas a reescribir con dato medido · y la sospecha, **anotada como sospecha**, de que SocialLab sea mayormente mockup. **Fuera del JSON, y por eso sólo se menciona acá:** `HRD_PROTOCOL.md` pasa a **v1.6** con **tres reglas globales nuevas, ninguna derogación** —**HRD-R10** verificar fragmentos no es verificar el archivo, **HRD-R11** el éxito se comprueba contra el efecto y no contra el código HTTP, **HRD-R12** el test de la marca N+1 barre también los `CHECK` existentes— y se ejecutó el **barrido de archivado** pedido por Sam: **5 bloques** bajan a `historical_AGENDA.md` y **8 candidatos quedan retenidos con su motivo declarado**. **DERIVADOS — la regla, no la excepción:** este archivo **no se regenera completo**, y desde el 2026-08-23 eso **es la regla escrita en `CLAUDE.md`** («Los derivados NO se regeneran completos — se sincronizan»). El motivo no cambió: **no existe generador en el repo**, así que «regenerar» a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). Nota de sincronización en cabecera, **cuerpo íntegro**, en **commit separado**. La regeneración real sigue abierta **sin fecha** en `AGENDA.md` v2026-08-26-v1_

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

## Frente de snapshots, Scheduler y cadencia — actualizado 2026-08-16

**UN SOLO CONSTRUCTOR DE SNAPSHOTS.** Había **tres** implementaciones construyendo el snapshot de marca, desalineadas entre sí. Quedó una:

| Constructor | Tablas | Estado desde 2026-08-16 |
|---|---|---|
| EF `brand-snapshot-builder` **v1** (ACTIVE, `verify_jwt:false`) | 30 | ✅ **el único constructor** |
| `CopyLab/api/brand-cache.js` | 30 | v2.4 → **v3.0 LECTOR** |
| `unrlvl-context/api/brand-cache.js` | 8 | v1.2 → **v2.0 LECTOR** |

**Ninguno de los dos labs construye ya.** Patrón **lab-lee-nunca-construye**, documentado con diagrama en `skills/content-pipeline/SKILL.md`. Deuda abierta: retirar `action=build_all` de CopyLab (hoy responde **410 con puntero**) — tercer PR.

**El cron de `build_all` nunca existió.** El diagnóstico anterior decía *"nunca ha corrido"*; contra `cron.job` resultó ser un cron **ausente**, no roto. Creado: **jobid 51** `brand-snapshot-build-all-3h`, `0 */3 * * *`. Cobertura **9/13 → 13/13** snapshots.

**`content-scheduler` v2.1** (ACTIVE) — cierra 5e-1: construido (PR #57), corregido (#59, #60), desplegado. ⚠️ **`verify_jwt: false`** — se desplegó primero con `true` y el gateway rechazaba **antes de llegar al código** (`UNAUTHORIZED_NO_AUTH_HEADER`): este carril autentica por header **`x-cron-secret`**, no por JWT. **El alta del cron sigue pendiente**, tras verificación con candidatas reales. Deuda menor: `scheduledRows.push` sin `voice`.

**Tablas nuevas en `intel`:** `brand_rollout` · `brand_cadence` · `brand_topic_platform_mode` · `content_embeddings` (`vector(768)` + HNSW + GRANT `service_role`).

**5e-2 sigue ABIERTO — parcial es abierto.** La tabla de embeddings existe; los gates 1 y 5 de `content-watcher` **siguen resolviendo por `semanticSimilarity` contra Claude**. El cableado cambia una llamada LLM por un operador `<=>`.

**`LAB-AUDIENCE-BRIEF` desactivado** (`active=false`, `supports_iid=false`): la fila estaba malformada y nunca funcionó. Cadena IID: **CopyLab (1) → AIFE (2) → ImageLab (3) → SocialLab (4)**. Residuo vivo: el `stage_order: 1` sigue **hardcodeado** en `content-dispatcher`.

**El learning del GRANT.** Una tabla creada sin `GRANT service_role` **existe, responde a `information_schema` y falla en runtime** — el carril corre como `service_role`. El síntoma se lee como "la tabla no existe" y no lo es. El GRANT va como paso fijo del DDL.

**Compliance — las globales `hard` se heredan y ganan.** ForumPHs pasó de 9 a 11 reglas sin sembrar nada en la marca. Contar las reglas efectivas leyendo sólo las filas de la marca **da un número menor que el real**.

---

## Regla de modelos — no se hardcodean (vigente desde 2026-08-16)

**El modelo es INSTANCIA, no eje.** Ninguna capa compartida hardcodea un identificador de modelo.

- **Fuente:** `protocols/MULTIBRAND_RULE.md` §11.
- **Deuda conocida:** `claude-sonnet-5` literal en `content-run-stage`, `calibrate.ts` y `_craftModules.ts`; `gemini-2.5-flash-image` en ImageLab.
- **Estado exacto:** `ops_lab_rates` **ya resuelve el PRECIO por `model_id`**; falta que resuelva **qué modelo**. Media vuelta dada.
- **Granularidad del eje** (`MULTIBRAND_RULE` §12): un eje correcto al nivel equivocado sigue siendo un bug. Caso `cadence_mode` (era por marca, es por `(topic, plataforma)`) y `max_rotation_weeks` (era por marca, es por clave). Los 3 alias legacy se retiran **contando**, no a ojo.

---

## Regla Multimarca — INVIOLABLE (vigente desde 2026-08-07)

El **EJE** es del sistema y va en el **CÓDIGO**. La **INSTANCIA** es de la marca y va en el **DATO**. Ninguna capa compartida hardcodea `brand_id`, dominio, jurisdicción ni vocabulario de cliente. Que hoy una sola marca use un eje **NO** lo convierte en suyo.

- **Fuente:** `protocols/MULTIBRAND_RULE.md`
- **Gate:** Test de la marca N+1 respondido en todo brief y PR que produzca código, migración o siembra.
- **Orden de migración:** hardcode existente → PR de código primero, DDL después (al revés rompe producción).
- **Deuda conocida:** 5 casos verificados el 2026-08-07 — ver anexo del protocolo.
- **Deuda 2026-08-08:** 4 de 5 casos pagados (PR mergeado + DDL post-merge): `voice_by_destination` (Object.keys) · `max_tokens`+`format_instruction` en `content_type_registry` · `EMAIL→CANAL_NONE` · `AUDIENCE_FRAMES` a `decide`/`influye`/`general` (alias legacy `jd`/`doliente`) + CHECK `intel.brand_topics.audience_frame` a 5 valores + 18 filas FPHs migradas. Quinto pendiente: `OBJECTIVE_LABEL_TO_TAG` (PR propio).

---

## Política de idioma del ecosistema — vigente desde 2026-08-09

Vocabulario controlado: **`es` | `en`**. Únicos valores válidos.

- ES neutro internacional y EN neutro internacional, **sin regionalismos**, para todas las marcas.
- **Spanglish prohibido para todas, sin excepción.**
- En marcas bilingües (UnrealvilleStudio, LucienSael): **EN primero, ES después**, en todo — incluidas las firmas.
- ES y EN se **generan por separado desde origen**. Nunca se traduce uno del otro.
- Excepción legítima conservada: `VAL` (valenciano) y `EN-UK` en DiamondDetails, marca de Valencia. Son idiomas reales de esa marca, no variantes de deriva.
- Ante una petición futura de regionalismo: **preguntar explícitamente antes de aceptarlo.**

Normalizado el 2026-08-09 en **11 columnas de 7 tablas**. Variantes eliminadas: `es-ES`, `es-PA`, `es-FL`, `es-NEUTRO`, `en-FL`, `en-NEUTRO`, `en-US`, `en/FL`, `EN`, `ES`, `SPANG`.

**El idioma no existe como entidad**: vive en columnas de texto libre sin catálogo, CHECK ni FK. Por eso la deriva reaparece con cada limpieza. Cura de raíz pendiente en AGENDA (catálogo `languages` con FK — DDL en capa compartida, brief propio con test N+1).

---

## Firmas de marca (`signature_closer`) — sembradas 2026-08-09

Forma: `{text, text_en, rule}`. La estampa el sistema tras el PASS del Watcher; **el copy nunca la escribe.** Se resuelve **por voz**, no por marca.

| Marca | Voz | ES | EN |
|---|---|---|---|
| ForumPHs | las 3 activas | `ForumPHs — Construiste tu patrimonio. Nosotros le construimos un sistema.` | — |
| NeuroneSCF | `nscf_conversion` | `Neurone South & Central Florida — Ciencia capilar aplicada al clima de la Florida.` | `Neurone South & Central Florida — Hair science for the Florida climate.` |
| NeuroneSCF | `nscf_editorial` | `Neurone South & Central Florida — HAIR INTELLIGENCE` | idéntica |
| LucienSael | `lucien_editorial` | `— Lucien Sael · Builder, Thinker, Operator` | idéntica |
| LucienSael | `lucien_social` | `— luciensael.com` | idéntica |
| UnrealvilleStudio | `unrlvl_default` | `❯ Unrealville Studio` | idéntica |

**`null` declarado** (decisión, no olvido): `fphs_institucional`, `po_consumer` v0.5 y v0.6.

Reglas:
- Una voz que no firma se escribe con `null` **explícito**. La clave ausente es indistinguible de un olvido — es lo que hizo que **7 de 11 genomas activos publicaran sin firma sin que nadie lo notara**.
- La firma **no sustituye al CTA** cuando el genoma dice que el CTA cierra la pieza.
- La firma se resuelve **por voz**, no por marca (precedente: Lucien firma distinto en editorial y en social).

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure
_"Not for everyone."_
Fundador público: Lucien Sael · Owner: Sam
GitHub: unrealvillestudio-hub · Web: unrealvillestudio.com (LIVE EN+ES)
HQ: 12951 Biscayne Blvd · North Miami, FL 33181

**Lucien Sael** — Seudónimo profesional público de Sam
- web: luciensael.com — BLOG v1.0 BUILT (home+blog+1 artículo molde) · GREENFIELD: sin repo/Vercel/DNS · Paquete listo para Claude Code
- voice_genome: ✅ **2 VOCES ACTIVAS** en brand_voice_genome **v1.0** (subido de v0.5 el 2026-06-19) — `lucien_editorial` (919e3707 · blog/ensayo/long-form) + `lucien_social` (5b571b08 · Meta FB/IG + TikTok texto + X · golpe ≤280). **core_move generativo/constructor** (parte de su mirada, aporta, construye — NO reactivo/léxico). 8 campos destilados por muestreo (#5i): closing_repositions, purpose_and_audience, restraint_as_power, the_edge_lands_in, compression_over_explanation, the_accusing_question, elegance_is_the_blade, thematic_gravity. Mismo temperamento (filo, übermensch motor interno nunca citado), distinta respiración (editorial respira largo / social muerde corto).
- platforms: Meta (FB+IG) token a nivel ecosystem pero canal LucienSael NO probado en pipeline (manual-until-verified) · TikTok solo texto · X apertura escalonada anti-baneo (manual, sin API) · LinkedIn NO es plataforma de Lucien (solo cita vía voceros Sam/UNRLVL)
- ⚠️ RIESGO ~80%: primer publish LucienSael por Orchestrator tocará blocker brand_id mapping (tipo b93627b6) — verificar/insertar fila LucienSael en meta_accounts antes
- Pendiente: validar v1.0 con IID real · `lucien_video` futuro (guion hablado TikTok/Reels) cuando VideoLab

---

## Marcas activas

| Marca | Mercado | Estado |
|---|---|---|
| **NeuroneSCF** | South & Central Florida, USA | 🟢 Activo — Console Fase 3 LIVE |
| **DiamondDetails** | Alicante, España | ✅ Activo |
| **VizosCosmetics** | Miami + España | ✅ Activo |
| **D7Herbal** | Alicante, España | ✅ Activo |
| **VivoseMask** | España | ✅ Activo |
| **Patricia Osorio** · patriciaosorio.com _(id: PatriciaOsorioPersonal)_ | Internacional — salones, marcas, distribuidores | ✅ Activo |
| **ForumPHs** | Panamá | ✅ Activo |
| **SamPublisher** | Global — Meta(FB) + LinkedIn | 🟢 Activo |
| **UnrealvilleStudio** | Global — HQ Miami FL | ✅ Activo |

---

## ForumPHs — Estado detallado (añadido 2026-08-21)

_Sincronizado desde `ecosystem.json` v2026-08-21-v1, `brands[ForumPHs]`. Sólo campos presentes literalmente en el JSON._

**Mercado:** Panamá · **Dominio:** forumphs.com · **Estado:** activo

### Canal Meta — ✅ OPERATIVO end-to-end (2026-08-21)

| Campo | Valor |
|---|---|
| `brand_id` | `ForumPHs` |
| `page_id` | `1184045168120977` |
| `ig_user_id` | `17841429192605028` |
| `ad_account_id` | `NULL` — deliberado: la marca no hace ads todavía |
| `system_token` | `[token en Supabase — no exponer en repo]` |

Era el **bloqueante de canal del 22-ago**, abierto desde el 2026-08-16.

### Agentes IID propios — 6, todos activos (Vía A)

| Agente | Tier | Dominio | Voz | Frecuencia |
|---|---|---|---|---|
| `FPHS-CUOTA-POR-DENTRO` | tier1 | `la-cuota-por-dentro` | `fphs_educativa` | weekly |
| `FPHS-ASAMBLEA` | tier1 | `la-asamblea-que-no-entiendo` | `fphs_educativa` | weekly |
| `FPHS-ACTA-INSTRUMENTO` | tier2 | `el-acta-como-instrumento` | `fphs_educativa` | biweekly |
| `FPHS-RENDICION-JD` | tier2 | `rendir-cuentas-sin-sudar-jd` | `fphs_conversion` | biweekly |
| `FPHS-RENDICION-DOLIENTE` | tier2 | `rendir-cuentas-sin-sudar-doliente` | `fphs_editorial` | biweekly |
| `FPHS-CUOTA-EXTRA-JD` | tier2 | `la-cuota-extraordinaria-que-viene-jd` | `fphs_conversion` | biweekly |

`last_run_at`: **NULL** — sembrados, sin correr aún. Los briefs exigen **2+ casos con fuente** (corrección aguas arriba del gate `evidence`).

> **El `CHECK` que los hizo posibles.** `iid_agents_default_voice_check` **enumeraba las voces del ecosistema**, así que dar de alta una marca nueva exigía `ALTER TABLE`. Corregido al eje el 2026-08-21: sólo exige que la voz exista y no esté vacía.

### Voces

`fphs_conversion` **v1.1 activa** · `fphs_educativa` **v1.1 activa** · `fphs_editorial` **v1.1 activa** · `fphs_institucional` **v0.5 INACTIVA**

Sin cambios en la sesión 2026-08-20/21. Lo que cambió no fue la voz, sino lo que el carril le pasa al juez para juzgarla.

### Estado R4B

**Contenido + canal LISTOS · publicación desde 2026-08-22** (`rollout_started_at`).

- **Contenido:** Vía C del 2026-08-21 — 6 semillas → 6 hallazgos → 27 piezas sobre 6 dominios → **primeras PASS de la marca**. Ratio final por pieza **7/27 = 25,9 %**.
- **Aprobación:** **0 de 27** piezas aprobadas — el PASS del Watcher **habilita, no publica**. La aprobación es de Sam.
- **Bloqueante abierto:** `AUDIENCE_CTA` en CopyLab con claves legacy (`jd`/`doliente`) mientras `audience_frame` migró a `decide`/`influye` — resuelve a cadena vacía y deja **18 topics activos sin instrucción de CTA**. Prohibido reponer alias (`MULTIBRAND_RULE.md` §13).

---

## NeuroneSCF — Estado detallado

**Shopify B2C** `egdk1n-gt.myshopify.com` → `neuronescflorida.com`
- 41 productos activos · Theme 192983662919
- Blog LIVE: 4 artículos ES+EN · Hair Intelligence — pendiente reescritura L0+L3 HUMANIZE EMOTIONAL
- Pixel Meta ✅ (1348252664025025) · GTM+GA4 instalado ✅ · Klaviyo ✅
- Checkout: pickup ❌ deshabilitado (2026-05-29) · delivery ✅ desde 3PL · Kiosk: delivery ❌ / pickup ✅ solo Vizos
- ⚠️ TikTok Pixel DUPLICADO — bloquea ads
- ⚠️ Klaviyo flows pendiente configurar en UI
- ✅ Meta MCP: NSCF en meta_accounts con token OK (verificado 2026-05-31)

**Shopify B2B** `nj5ybc-n1.myshopify.com`
- Theme 149164392526 · Audit score 133 · REVISAR — store_type pendiente verificar · token SIN read_locations

**Fulfillment** — 2toner Express (Iván) `2tonerexpress@gmail.com`
- Portal LIVE ✅ 2026-05-29 · `dispatch.neuronescflorida.com/portal` (dominio custom ⏳ pendiente Vercel+DNS)
- EF: nscf-fulfillment-portal v2 · nscf-mailer v27

**NSCF-Console (superuser interno)** — ✅ **FASE 3 LIVE — 2026-06-20**
- Repo nscf-console (Vercel front) · Auth multi-rol ADMIN/OPS (bcrypt+JWT, NO usa el PIN del kiosko)
- EFs: nscf-b2b-approve v8 (código v4: ambassadors_report_email +rows, inventory_view 3 columnas por location_id) · nscf-mailer v27 (commissions_report con detalle venta-a-venta)
- Reporte comisiones: per-embajadora, detalle venta-a-venta, calculado sobre Shopify **subtotal** (sin tax/shipping), redondeo half-up `.toFixed(2)`. Entran como pending; Patricia aprueba (aprobadora única)
- Toggle ventana: este mes / mes anterior / ambos · Inventario 3 columnas: B2C Bodega1 (3PL Iván) | B2C Bodega2 Vizos | B2B Vizos
- Atribución: nscf-attribution v14 = webhook orders/paid; comisión = `order.subtotal_price * base_commission_rate`
- Integridad: nscf-integrity-check v1 + cron job 34 (dom 04:00 UTC) — marca drafts fantasma `voided_test`, no toca comisiones
- Deuda: PIN texto plano en nscf_embajadoras · read_locations al token B2B · lista de precios admin-only (futuro)

**Tracking** — Meta Pixel ✅ · GTM+GA4 ✅ · Klaviyo 10 templates ES+EN ✅ · TikTok ⚠️ DUPLICADO

---

## UnrealvilleStudio — Brand Context

- voice_genome: `unrlvl_default v1.0` — Defiant precision, EN default, ES mismo tono
- meta_mcp_brand_id: `UnrealvilleStudio` (normalizado) — UNREALville eliminado de meta_accounts 2026-06-15 (era dup exacto, mismo page_id/token)
- page_id 1050792034789886 · ig_user_id 17841429817593693 · ad_account act_1506214917803847
- Primer post publicado ✅ 2026-05-29

---

## Voces de marca (brand_voice_genome)

Una marca puede tener varias **voces hermanas** (distinto `voice_id`) que comparten temperamento y difieren en respiración. Unique `(brand_id, voice_id, version)`.

| brand_id | voice_id | versión | scope | estado |
|---|---|---|---|---|
| LucienSael | `lucien_editorial` | **v1.0** | blog / ensayo / long-form | ✅ active (919e3707) |
| LucienSael | `lucien_social` | **v1.0** | Meta FB/IG + TikTok (texto) + X · golpe ≤280 | ✅ active (5b571b08) |
| SamPublisher | `sam_personal` | v0.5 | Meta(FB) + LinkedIn · personal + vocero Lucien/UNRLVL | ✅ active |
| UnrealvilleStudio | `unrlvl_default` | v1.0 | infra / B2B | ✅ active |
| NeuroneSCF | `nscf_editorial` | **v1.0** | blog / AUTHORITY (4 topics) · par cerrado con llave de diagnóstico | ✅ active (2026-08-08) |
| NeuroneSCF | `nscf_conversion` | v1.0 | b2c (5 topics · frizz/color/damage/chlorine/fine) | ✅ active |
| ForumPHs | `fphs_conversion` | **v1.1** | conversión (eje 13 claves) · 22 de los 32 topics activos de la marca | ✅ active (2026-08-09) · `signature_closer` presente |
| ForumPHs | `fphs_educativa` | **v1.1** | educativa · 14 topics | ✅ active (2026-08-10) · `signature_closer` presente |
| ForumPHs | `fphs_editorial` | **v1.1** | editorial · 7 topics | ✅ active (2026-08-11) · `signature_closer` presente |
| ForumPHs | `fphs_institucional` | v0.5 | — (sin topics, sin fila en `content_type_registry`) | ⛔ **inactive** — declarada por primera vez 2026-08-14 |

**Corrección 2026-08-14 (ForumPHs).** La fila de `fphs_conversion` decía "🟠 en calibración (11 topics / 0 filas)": era el estado del **2026-08-08** y caducó el **09**, cuando la voz se selló en v1.1. Verificado en `brand_voice_genome`. Los 11 topics siguen siendo 11; lo que dejó de ser cierto es "sin calibrar".

**⚠️ `fphs_conversion` sin fila en `creative_compatibility_rules`** — en **ningún** content_type, y gobierna **22 de los 32 topics activos** de ForumPHs (11 `editorial` + 11 `social`). Como `editorial_post` no tiene fila BASE (las 4 existentes llevan `voice_id`), `selectCompatRule` devuelve `source='none'`, `applyCreativeLogic` recibe `rule=null` y filtra sólo por `aggro_min/max`: quedan elegibles casi los 44 vectores de e-commerce. En `social_post` sí hay BASE → degrada a `source='base'` con warn. Pendiente P1 en `AGENDA.md`.

**Genoma Lucien v1.0 (2026-06-19):** destilado por muestreo (8/10 piezas marcadas Lucien por Sam). El `core_move` pasó de reactivo/léxico ("desmonta la palabra equivocada") a **generativo/constructor** (Lucien parte de su mirada, aporta, construye; el filo sirve a la construcción, no es el fin). Patrón: generativo no reactivo · figura concreta · filo material/presente sin salida digna · comprime en imagen-sentencia · hiere con garbo no crudeza · constructor>destructor · reclutar afines no humillar · contención de munición pesada · cierre que reposiciona y recluta · pregunta-cuchillo de baja frecuencia · registro culto sin ancla nacional · científico-psicológico en ai-cognition · libros/ecosystem presentes sin nombrarse.

**Lucien — regla cita-por-destino (vocería en LinkedIn):** Lucien no publica en LinkedIn (sin cuenta, por diseño). Llega solo citado por voceros (Sam / UNRLVL). El genoma del fragmento citado lo elige el **destino del redirect**: a X/Meta/TikTok → `lucien_social`; a luciensael.com o post nativo sin redirect → `lucien_editorial`.

---

## Labs

| Lab | URL | Estado |
|---|---|---|
| **Orchestrator** v4.1 | orchestrator-unrlvl.vercel.app | ✅ LIVE — front de aprobación IID |
| **CopyLab** v9.7 | unrlvl-copy-lab.vercel.app | ✅ LIVE · async ✅ |
| **ImageLab** v7 | image-lab-unrlvl.vercel.app | ✅ OPERACIONAL — gemini-2.5-flash-image (Vertex, migrado 24-jun) + BGRemover live |
| **SocialLab** | social-lab-flame.vercel.app | ✅ LIVE — dual-mode pendiente confirmar |
| **WebLab** | web-lab-unrlvl.vercel.app | ✅ LIVE |
| **AgentLab** | agent-lab-unrlvl.vercel.app | ✅ LIVE |
| **BlueprintLab** | unrlvl-blueprint-lab.vercel.app | ✅ LIVE |
| **VideoLab** | unrlvl-video-lab.vercel.app | ✅ LIVE — LAUNCH PENDIENTE (active=false en lab_configs) |
| **VoiceLab** | unrlvl-voice-lab.vercel.app | ✅ LIVE |
| **OnboardingApp** | unrlvl-onboarding-app.vercel.app | ✅ LIVE — voice_genome_gap Fase 5 pendiente |
| **SignalLab** | — | ⏳ No deployado |

**ImageLab v7 (24-jun):** migrado de Vertex Imagen 3.0 (apagado 24-jun) a **gemini-2.5-flash-image** vía `:generateContent` — único punto de generación de imagen vivo (lab-worker + content-run-stage delegan por `/api/execute`). Suma **BGRemover** (ex-ProductShots; composición de catálogo descartada por límite luz-coherencia): herramienta de remoción de fondo vía remove.bg, 3 pasos, cutout cap 2400px lado mayor. Nueva env `REMOVEBG_API_KEY`.
**SocialLab:** vía de publicación al público. Debe operar dual-mode (sync UI + async Orchestrator) igual que CopyLab/ImageLab. Re-test publicación pendiente tras fix brand_id.
**OnboardingApp:** v1.0 puebla 5 tablas pero NO captura brand_voice_genome. Spec Fase 5 lista. Permitir derivar voz social desde editorial + capturar modo cita para voceros.
**Regla de nomenclatura (INVIOLABLE, `ecosystem.json → labs._note`):** los labs (CopyLab / ImageLab / SocialLab / VideoLab / VoiceLab / WebLab / AgentLab / BlueprintLab) son APPS del ecosistema —repo propio, UI para trabajo humano, modo dual sync (UI) + async (carril)—, nunca un servicio genérico, una función, un stage ni un módulo interno. Si un carril necesita la capacidad de un lab, lo llama por su `api_endpoint` (`lab_configs`); no construye su propio motor.
**✅ Desvío del generador local — CERRADO (2026-08-18, A1+A3):** el carril async arma el copy llamando a **CopyLab por su `api_endpoint`** (`execLab` + `builder_input` top-level, endpoint resuelto en runtime desde `lab_configs`) — A1 puso el cable y A3 **retiró el generador local** de `content-run-stage` junto con los helpers que sólo él usaba. Verificado en producción antes del retiro: `builder_meta.generator = "copylab"` en las cinco piezas de la corrida, diez capas aplicadas, `creative_seed` real, `output_template_id` poblado y el ledger asentando `api_key_ref = EXTERNAL:copylab`. **Sigue abierto sólo `sociallab`**: el post lo arma `runSocialLabDirect`, motor local. De cuatro labs invocados, tres llaman al lab y uno reconstruye su motor.

**✅ CopyLab modo carril — Fase A cerrada en producción (`api/execute.ts` v9.7, 97.749 b @ `main`, verificado 2026-08-14):** `builder_input` **top-level** (`{ domain, voice_id, destination, platform, language, psycho_preset, rules[], iid_brief, angle, audience_frame }`) — su presencia activa el carril, su ausencia deja el modo UI intacto. Validación fail-fast sin defaults silenciosos: `COPYLAB_DESTINATION_REQUIRED` · `COPYLAB_VOICE_ID_REQUIRED` · `COPYLAB_IID_BRIEF_REQUIRED` · `COPYLAB_VOICE_NOT_FOUND` (nombra las voces disponibles, nunca cae a `[0]`) · `COPYLAB_PSYCHO_PRESET_NOT_FOUND` · `COPYLAB_LANGUAGE_UNRESOLVED`. Respuesta: `{ status, title, body, signature, usage, meta:{...} }`. Techo de tokens por destino (`maxTokensFor`): editorial 4000 · social 640 · UI 1600. La firma viaja **sin estampar** (`deriveSignature`); la estampa el carril en `finalizePiece`, post-Watcher PASS. **El generador unificado de la Fase 3 del Proyecto UNIFICACIÓN ya existe: falta el cable (Fase B), no el diseño.** Inventario de los 6 ítems de cableado en `PROYECTO_COPYLAB_hereda_y_profilaxis.md`.

---

## IID Subsystem — Intelligence Insights Developers

**Status:** ✅ **OPERACIONAL** · Builder+Watcher LIVE · **R4B carril async validado** (smoke test PASS 2026-07-25: iid-core v36 + content-dispatcher v36 + content-run-stage v52 desplegados y verificados byte a byte) · mañana se enciende R4B para evaluación funcional + ICR (Industrial Consistency Ready)
**Repo de contexto:** `IID/session_log.md` (fundado 2026-06-22 — documento fundacional §1-§8 + session log §9)
**Nombre:** IID = **Intelligence Insights Developers**. UNRLVL-IID = los IID de UNRLVL. (Variantes previas — Intelligent Intelligence Dispatcher / Insight Distribution / Content Distribution — fueron deriva de reinterpretación al reducir a siglas; NO canónicas.)
**Schema:** `intel` (NO public)

**Origen:** nació (abril 2026) como motor de inteligencia de marketing (investiga LLMs/plataformas/e-commerce/mercados). Doble uso: mejora interna del ecosystem + posicionamiento público de UNRLVL/Lucien como expertos ("cero desperdicio, máximo leverage"). Lucien se encajó después sobre la estructura de marketing → causó el bug off-brand. Su entrada estableció que el IID debía ser MULTIMARCA.

**Modelo de gobierno:** la MARCA declara qué temas consume y con qué voz por destino (`intel.brand_topics`). El IID investiga temas NEUTROS. El `default_voice` del agente NO decide voz (raíz del bug off-brand). `angle` = territorio (qué/dónde); genoma = ejecución (cómo). Cadencia Interpretación A: por-marca-por-plataforma, los dominios rotan dentro de los slots, NO multiplican.

**Agentes (`intel.iid_agents`, 29 activos):**
- 29 = 1 core (IID-CORE) + 13 legacy IID-* (corriendo, last_run reciente) + 14 UNRLVL-* (creados 15-jun, last_run NULL — sin ejecutar aún) + 1 sentinela IID-SEEDER (ce44ac81, is_active=false, satisface FK de iid-inbound, NO corre research). El fan-out v36 YA NO usa default_voice (la voz sale de brand_topics).
- Legacy IID-*: IMAGE, LLM*, VIDEO, VOICE, GOOGLE, LINKEDIN*, META, TIKTOK, X*, ECOMMERCE, FLORIDA, PERSONAL-BRAND*, WHOLESALE (* = default_voice lucien, legado del encaje a la fuerza)
- UNRLVL-* en 3 tiers: Tier1 método (CONTEXT-ENGINEERING, BRAND-VOICE-SYSTEMS, AI-INDUSTRIALIZATION, CRO-PSYCHOLOGY, SIGNAL-LEARNING-LOOPS) · Tier2 deep-stack (META-DEEP-STACK, GOOGLE-DEEP-STACK, ALGORITHM-MECHANICS) · Tier3 mercado (ECOMMERCE-DEEP, SHOPIFY-STACK, MARKET-FLORIDA, DROPSHIP-REALITY, WHOLESALE-LOGISTICS-FL, CREATOR-MACRO-ECONOMY)
- Decisión pendiente: destino de los 14 UNRLVL-* sin correr + de los IID-* legacy de voz Lucien

**Pipeline:**
```
CRON (jobids 2-28, trigger_iid_agent) → iid-research → iid_research_raw → iid-process → iid_findings
  → iid_content_queue (brand_id+domain) → content-dispatcher v36 (jobid 29, cada 30min, .limit(5) DISPATCH_LIMIT, lee scheduled_for)
  → content-run-stage v57 [Builder el generador local ⚠️DESVIACIÓN + AIFE + ImageLab→CDN + SocialLab(runSocialLabDirect) ⚠️DESVIACIÓN + callWatcher]
  → content-watcher v18 (8 gates) → content_pieces awaiting_approval
  → email content-approval@unrealvillestudio.com → Orchestrator (aprobación Sam)
  → approve-piece v14 (publish Meta + move-to-permanent)
```

**Edge Functions nuevas 2026-08-16:** `brand-snapshot-builder` **v1** (ACTIVE, `verify_jwt:false`) — constructor único del snapshot (30 tablas), disparada por el cron jobid 51 · `content-scheduler` **v2.1** (ACTIVE, `verify_jwt:`**`false`**) — cierra 5e-1; el gotcha: con `true` el gateway rechaza antes de llegar al código, el carril autentica por `x-cron-secret`.

**Edge Functions:** content-dispatcher v47 (B2: lee scheduled_for + .or(is.null,lte.now); B3: DISPATCH_LIMIT=5) · content-run-stage v74 (#95-D bloque CANAL: email_propietarios saltea imagen) · content-watcher v29 (8 gates: +gate7 objective_stimulus +gate8 visual_sibling; reglas por código desde intel.watcher_rules, precedencia brand>sector>gen; watcher_full_scan ON) · approve-piece v14 (reject sin rejected_reason → #5r) · aife-filter · lab-worker v23 (no tiene creds Vertex) · **iid-core v47 (#93 fan-out multimarca; deja de generar copy, brief neutro en aife_output.content.content; body.domain override)** · **iid-inbound v1 (cerebro del Sembrador: capture/approve/reject/list, verify_jwt=false)** · **iid-approval-digest v2 (creada 26-jul; digest diario 7am ET del corpus de calibración de aprobación, lee intel.approval_calibration)**

**Sembrador (CONSTRUIDO 25-jun b · falta T4 front):** post IG (link + frase humana) → iid-inbound `capture` (destila a TEMA NEUTRO, anti-IP: la semilla es disparador, nunca material a reescribir) → mapea a `brand_topics` → `iid_seeds` awaiting_approval → GATE TEMPRANO Sam (`approve`, puede corregir mapeo) → handoff HTTP a iid-core (4B, una sola fuente del fan-out) → fan-out v22 → N filas queue → pipeline normal → approve-piece (2º gate). Tabla `intel.iid_seeds`. Agente sentinela IID-SEEDER. 2 gates en serie, nunca publish directo.

**`brand_cache_snapshots` — ⚠️ SUPERADO 2026-08-16:** cobertura **13/13** y **un solo constructor** (EF `brand-snapshot-builder` v1); los dos `brand-cache.js` pasaron a LECTOR. Ver el bloque *Frente de snapshots* al tope. Estado anterior, conservado íntegro: **(v2.4, verificado 2026-08-14):** escritor = `CopyLab/api/brand-cache.js` v2.4 (23.546 b) en `https://unrlvl-copy-lab.vercel.app/api/brand-cache`, con `await upsertSnapshot(...)`, `SUPABASE_SERVICE_ROLE_KEY` vía `sbWriteHeaders()` (LANZA si falta la key, no degrada a anon) y `res.ok` con throw nominal. **9 marcas con snapshot:** D7Herbal · ForumPHs (nueva, `built_at` 2026-08-14 21:16 UTC, `manual_refresh`) · LucienSael · NeuroneSCF · PatriciaOsorioConectando · PatriciaOsorioVizosSalon · UnrealvilleStudio · VivoseMask · VizosCosmetics. **Faltan 4 de 13 elegibles** (`brands.status='active' AND type<>'system'`): DiamondDetails · PatriciaOsorioPersonal · SamPublisher · UnrealvilleStores. **⚠️ Ninguna fila tiene `built_by='build_all'`:** el cron diario que `brand-cache.js` documenta **nunca ha corrido con éxito** y, con `CACHE_TTL_HOURS = 4`, todos los snapshots están **stale de forma permanente**. Snapshot de ForumPHs verificado capa por capa: 44 `creative_vectors` · 10 `tension_architectures` · 5 `aggro_presets` · 18 `creative_compatibility_rules` · 3 genomas · 24 `content_type_registry` · 9 `platform_canal_map` · 12 `pipeline_skills` · brand presente.

**✅ `audience_brief` stage 0 — RESUELTO 2026-08-16:** `lab_key = audience_brief` quedó `active=false`, `supports_iid=false` (verificado por SELECT sobre `public.lab_configs`; el literal `LAB-AUDIENCE-BRIEF` del brief **no existe**, y tampoco hay columna `lab_id`) (fila malformada, nunca funcionó). Cadena IID: CopyLab (1) → AIFE (2) → ImageLab (3) → SocialLab (4). **Residuo vivo:** el `stage_order: 1` sigue hardcodeado en el dispatcher. Estado anterior, conservado íntegro: **⚠️ huérfano (verificado 2026-08-14):** `lab_configs` lo declara con `iid_stage_order = 0`, `active = true` y `api_endpoint = https://unrlvl-context.vercel.app/api/brand-cache`, y **nunca se ejecuta**: `content-dispatcher/index.ts` dispara con `body: JSON.stringify({ job_id: job.id, stage_order: 1 })` **hardcodeado**. Además `content-run-stage` no tiene rama para él (la cadena `L2233-2447` sólo cubre copylab/aife/imagelab/sociallab): si se disparara caería al `else` de `L2467` con `isCritical=false`, dejando el job en `processing` **sin llamar a `fireNextStage`** → stall silencioso. Trampa latente, no fallo activo.

**Arquitectura híbrida queue (2026-06-20):** la queue lleva brand_id + domain (puente, escrito por el Builder en v37); `brand_topics` es fuente única de platforms/cadence/rollout (leída por el Scheduler).

**Vertex (desbloqueado 2026-06-22):** GOOGLE_SERVICE_ACCOUNT_KEY + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION en Supabase Secrets. Proyecto gen-lang-client-0491381650 (SA imagelab-vercel). Embeddings gemini-embedding-001 @768 (Matryoshka).

**R4B (deadline 1ª sem julio):**
- HECHO: **carril async multimarca (iid-core v36 + dispatcher v36 + run-stage v52) validado end-to-end por smoke test PASS 2026-07-25**, GRANT service_role sobre 3 tablas de public del carril (migración grant_service_role_public_iid_carril), 5e-5 DDL (domain+pgvector v0.8.0), 5o/5p-a/5q (v36), 5e-4 content-watcher v1 (v37), arquitectura híbrida queue, #5i genoma v1.0 Lucien, Vertex desbloqueado
- PENDIENTE: **encender R4B para evaluación funcional + ICR (mañana)**, **D7Herbal sembrar fila brand_topics (genoma huérfano)**, **B4 cadencia (ejecutor de agenda sobre pg_cron — requiere siembra de dato inexistente)**, 5e-1 Scheduler content-scheduler, 5e-2/5e-3 embeddings+gates (Chat 2), parche dispatcher scheduled_for (B2 hecho 2026-07-25), 5b publicación real Meta, 5r rejected_reason, 5s limpieza queue, validación genoma v1.0 con IID real, rollout_started_at (1ª sem julio)

---

## Supabase — unrlvl-db `amlvyycfepwhiindxgzw`

ACTIVE_HEALTHY · us-east-1
- **public:** 80 tablas · ~95 Edge Functions · nuevas: nscf_fulfillment_log, nscf_fulfillment_log_archive, nscf_integrity_log
- **intel (IID) — nuevas 2026-08-16:** `brand_rollout` · `brand_cadence` · `brand_topic_platform_mode` · `content_embeddings` (`vector(768)` + HNSW + GRANT `service_role`; ⚠️ creada pero NO cableada)
- **pg_cron nuevo 2026-08-16:** jobid **51** `brand-snapshot-build-all-3h` (`0 */3 * * *`) → `brand-snapshot-builder`
- **intel (IID):** iid_agents (29), brand_topics, iid_content_queue (+ domain), iid_findings, iid_research_raw, iid_cron_runs, iid_briefs, iid_scheduler_config, watcher_log, iid_seeds (semillas humanas del Sembrador, 25-jun), watcher_rules (54 reglas por código HR-*/IMG-*; subject/sector/scope; precedencia brand>sector>gen; 29-jul), brand_sector (9 marcas→RETAIL/LEGAL/PERSONA; UnrealvilleStudio sin sector; 29-jul)
- **content:** orchestrator_jobs (+ domain), content_pieces (+ domain), content_calendar, content_performance, brand_context_cache, brand_voices · pgvector v0.8.0 instalado
- **shopify:** stores, audit_runs, fix_log + otras

**brand_voice_genome:**
- LucienSael / `lucien_editorial` **v1.0** (919e3707) — blog/ensayo/long-form — active
- LucienSael / `lucien_social` **v1.0** (5b571b08) — Meta FB/IG + TikTok texto + X, golpe ≤280 — active
- SamPublisher / `sam_personal` v0.5 — Meta(FB) + LinkedIn — active
- UnrealvilleStudio / `unrlvl_default` v1.0 — Defiant precision — active

**meta_accounts:**
- `UnrealvilleStudio` ✅ completo (page + ig + ad_account + token) — UNREALville eliminado (dup) 2026-06-15
- `LucienSael` ⏳ verificar antes del primer publish por pipeline (riesgo blocker brand_id)
- `NeuroneSCF` ✅ token OK (verificado 2026-05-31)
- `ForumPHs` 🔴 **AUSENTE (2026-08-16)** — no está en la tabla. **Bloquea PUBLICAR el 22-ago; NO bloquea programar** (el `content-scheduler` v2.1 puede colocar las piezas). Dueño: **Sam**.

---

## Capa de instrumentación de costo (ops_*)

_LIVE (2026-07-31) — capa `ops_*` instrumentada end-to-end (16 migraciones M-0..M-16). **2ª ola 2026-08-04** sincronizada desde `ecosystem.json` v2026-08-04-v1 · **3ª ola 2026-08-05** (residuo de brecha ledger↔Console), ambas verificadas contra `information_schema` de `amlvyycfepwhiindxgzw`. Fuente ÚNICA de tarifa = `public.ops_lab_rates` vía `ops_resolve_rate`; CERO precios literales._

**Tablas:**
- `ops_generation_ledger` — asientos, línea base de costo (+`billable` 2026-08-04)
- `ops_cost_residual` — residuo de brecha ledger↔Console por scope (`scope_type`/`scope_value`/`residual_pct`/`measured_gap_pct`/`valid_from`/`valid_to`/`rationale`; vigente = `valid_to IS NULL`); 2 filas: document-factory **12%** · fie **3,5%** (2026-08-05)
- `ops_lab_rates` — tarifa por (lab, model_id, unit_type) con vigencia (vigente/previsto/historico)
- `ops_model_pricing` — catálogo descriptivo (NO fuente de precio)
- `ops_token_sessions_retired` — RETIRADA/renombrada 2026-08-04 (ex `ops_token_sessions`, +api_key_ref M-8d)
- `ops_rate_transitions` (M-6) · `ops_invoice_by_app` (M-8b, sin escritura anónima)
- `ops_costs` — costo mensual por servicio/lab/marca (14 cols incl. `billable` + `amount_original` + `currency_orig`, 2026-08-04)
- `ops_credits` — créditos/saldos por servicio (3 filas, 2026-08-04)
- `ops_services` — catálogo de **20** servicios/proveedores (2026-08-04)

**Vistas:** `v_cost_pivot` (**31 columnas**, 2026-08-04) · `v_cost_por_dimension` · `v_rate_gaps` · `v_reconciliacion` · `v_cost_residual_vigente` (residuos vigentes, `valid_to IS NULL`, 2026-08-05)

**ops_services (20):** api = anthropic, anthropic_plan, creatomate, elevenlabs, fal_ai, google_ai, klaviyo, resend, runway, tenzorart, twilio, vertex · database = supabase · domain = cloudflare · ecommerce = shopify · hosting = github, hostinger, vercel · media = heygen · custom = custom

**Primera medición (2026-07-31):** 5 piezas / 5 PASS / **$0,0681** por pieza (imagelab 58,7 % · copylab 28,4 % · aife 5,6 % · sociallab 3,7 % · watcher 3,5 %).

**❌ `dated_2026-09-01` — CANCELADO (2026-08-14).** Anthropic confirmó el **2026-08-12** que el precio introductorio de Sonnet 5 (**$2/M input · $10/M output**) es **permanente**; la subida a $3/$15 no ocurre y el vencimiento del 2026-08-31 queda sin efecto. Las proyecciones derivadas conservan su cifra pero pierden su fecha: acta ~$0,72 y suite FIE ~$0,57 dejan de ser "lo que costará desde el 1-sep" y pasan a escenario hipotético. **Acción residual:** revisar `ops_lab_rates` / `ops_rate_transitions` — si hay 2 filas `previsto` sembradas para el flip del 31-ago, anularlas antes de que el **cron 38** (06:00 UTC) las promueva solo. Las menciones fechadas en `_meta.previous_sessions` y en `_update_2026-08-05` **no se tocan**: son historia de lo que era cierto ese día.

---

## Agentes

| Agente | Canal | Estado |
|---|---|---|
| **Social Media Agent** | interno (EF Supabase, sin repo) | ✅ OPERATIONAL |
| **DDMV Assistant** | WhatsApp Twilio | ⚠️ FIX NEEDED |
| **ForumPH Speaks** | web | ✅ OPERATIONAL |
| **ForumPH Document Factory** | web | ✅ OPERATIONAL — fphs-formalize sprint pendiente |

**ForumPH Document Factory — Next Sprint:** fphs-formalize quality sprint — replicar calidad acta manual (98% Ivette). Referencia: ACTA_No1-2026_PH_LUXOR_300.docx. Pendientes: 3 votaciones QA + 13 errores primera persona + imágenes acta.

---

## AYRA 🔴 Sprint 0 VENCIDO (5 Jun — reprogramar)

Milestone v1.0: 31 Agosto 2026

| Sprint | Fecha | Estado |
|---|---|---|
| **Sprint 0** 🔴 | ANTES 5 Jun | VENCIDO — reprogramar |
| Sprint 1 | Jun 5-15 | Planned |
| Sprint 2 | Jun 16-30 | Planned |
| Sprint 3 | Jul 1-14 | Planned |
| Sprint 4 | Jul 15-31 | Planned |
| Sprint 5 | Ago 1-31 | AYRA v1.0 |

---

## Professor

OPERATIONAL v1.0 · Proxy `https://unrlvl-context.vercel.app/api/professor` ✅ LIVE
Learnings: base previa + 18 (19-jun, #5i + Lote A) + 15 (20-jun, R4B) — todos aprobados. Escala relevance_score 1–5.

---

## Infraestructura

| ID | Nombre | URL | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | ✅ LIVE |
| INFRA-META-MCP | Meta MCP | unrlvl-meta-mcp.vercel.app | ✅ ACTIVE — UNRLVL + NSCF ✅ · fb_get_page_insights deprecado ⚠️ |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ✅ ACTIVE · write_orders ✅ |
| INFRA-NSCF-DISPATCH | NSCF Dispatch Portal | dispatch.neuronescflorida.com/portal | ⏳ PENDIENTE — Vercel + DNS |
| INFRA-SB-MCP | Supabase MCP | unrlvl-supabase-mcp.vercel.app | ✅ ACTIVE v1.2.1 |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | ✅ LIVE EN+ES |

**Staging workflow:** ✅ ESTABLECIDO 2026-05-30 — 15 repos, 13 con branch protection (2 bloqueados: repos privados GitHub Free).

**⚠️ ecosystem_graph.json:** PENDIENTE `ecosystem audit` — datos del 05-26 (dice IID frozen/14 agentes/v22, ya falso).

---

## Agenda — próxima sesión

Ver [AGENDA.md](AGENDA.md) para prioridades completas.

Top inmediatos (R4B, deadline 1ª sem julio):
1. 🔴 5e-2/5e-3 embeddings pgvector + gates bloqueantes (Chat 2 — Vertex ya desbloqueado)
2. 🔴 Scheduler content-scheduler (5e-1, especificado, desbloqueado — write ya en v37) + parche dispatcher
3. 🔴 IID publicación real Meta (5b, chat dedicado) — valida genoma v1.0 + gatilla move-to-permanent
4. 🟢 Deploy luciensael.com (repo+Vercel+DNS) + UNRLVL Field Notes

✅ Completado 19-22 jun: genoma v1.0 Lucien (muestreo) · R4B Chat 2 (v37, content-watcher v1) · arquitectura híbrida queue · Vertex desbloqueado · repo IID fundado · nombre canónico fijado.