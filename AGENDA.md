# AGENDA — Unrealville Studio
_Actualizada: 2026-08-27 · v2026-08-27-v1 (ACTUALIZA 2026-08-27 — **EL CARRIL NO FUE EL PROBLEMA DE HOY. TRES MCPs DEL ECOSISTEMA ESTABAN EN INTERNET SIN AUTENTICACIÓN.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: el brief declara **12 learnings** con `session_date = 2026-08-27` y `approved_by_sam = true` — **medido con `execute_sql` el 2026-08-28: 24, los veinticuatro aprobados, en DOS lotes de 12** (17:17:51 y 23:49:52 UTC); el brief contó **su** lote. **Manda la medición** (HRD-R13) y la discrepancia se anota, no se corrige a mano. **SMA no se consultó** (Sam no lo mencionó). **EL HALLAZGO DEL DÍA:** **SEC-01** — `unrlvl-supabase-mcp`, `unrlvl-meta-mcp` y `unrlvl-shopify-mcp` **no leen ninguna cabecera de credencial**: van de `req.json()` a `handleRpc` a `callTool` **sin tocar `req.headers`**, y los tres declaran `Access-Control-Allow-Origin: *`. Tools que **mutan**: supabase **3** (`execute_sql`, `apply_migration`, `deploy_edge_function`) · meta **9** · shopify **4**. **Agravante sistémico:** en esa misma DB viven `shopify_stores` y `meta_accounts` **con los tokens de los otros dos**. **SEC-02** — `unrlvl-meta-mcp/api/upload.ts` es un **segundo endpoint público sin autenticar**: sube archivos arbitrarios al bucket `unrlvl-media` con la `SERVICE_ROLE_KEY` y `x-upsert: true`, y acepta una `url` remota que **el servidor descarga** — vector **SSRF** más sobrescritura de assets de marca en `brand/{brand_id}/`. ⚠️ **DISCREPANCIA MEDIDA, Y ES BUENA NOTICIA:** el brief declara `unrlvl-supabase-mcp` con `passwordProtection: false`, `ssoProtection: false`, `trustedIps: false` — *cero protección en código y cero en infraestructura*. **Medido en la API de Vercel el 2026-08-28, los CUATRO proyectos MCP tienen `ssoProtection: true` (`all_except_custom_domains`)**, `unrlvl-supabase-mcp` y `unrlvl-mail-mcp` incluidos: **la mitigación inmediata que pedía el brief ya está aplicada**. Lo que **no** cambia: la falta de autenticación **en el código** sigue exactamente igual, y `all_except_custom_domains` **no cubre un dominio propio** — por eso el cierre correcto sigue siendo **MCP-AUTH-01 extendido a los tres**, no la casilla de Vercel. **ENTREGADO HOY:** **`unrlvl-mail-mcp`** — MCP de correo de clientes, **sólo lectura**, de punta a punta: schema `mail` aislado (**2 tablas + 1 función `SECURITY DEFINER`**, `REVOKE` sobre `anon`/`authenticated`/`service_role`/`PUBLIC`, RLS sin políticas como defensa redundante), **rol dedicado `mail_mcp`** en vez de `service_role`, y **repo propio** extraído de `unrlvl-context` con `git subtree split` (**30 archivos** en la raíz). **VERIFICADO EN PRODUCCIÓN el 2026-08-28** (HRD-R13): schema `mail` **aplicado** con sus 2 tablas · rol `mail_mcp` **existe** · `has_schema_privilege` sobre `mail` da **`false` para `service_role`, `anon` y `authenticated`** — el aislamiento no es una intención, es un permiso · **1** función `SECURITY DEFINER` · **`mailboxes` y `authorizations` en CERO FILAS**: el sistema está completo y **todavía no tiene un solo buzón dado de alta**. **CORRECCIÓN DE UNA CIFRA DE AGENDA:** donde el bloque del 26-ago dice *«4 ERROR-level en `unrlvl-db`»*, la remedición con `get_advisors` del 2026-08-28 da **16 ERROR y 39 WARN** — los 16 son **12 vistas `SECURITY DEFINER` + 4 tablas `ops_*` sin RLS** (`ops_client_terms`, `ops_rate_transitions`, `ops_credits`, `ops_cost_residual`). **El dato viejo no se borra: se anota la remedición con su fecha.** **LEGAL:** las páginas legales de `unrealvillestudio.com` del 28-abr identificaban al responsable del tratamiento como **«Unrealville Studio LLC», entidad que no existe**, y estaban **huérfanas** — cero `href` desde ambos footers. Se sustituyen por **Samuel Moreno Mendoza, empresario individual**. **Sin LLC ni nombre ficticio registrados en Florida**, Sam firma como persona física documentos con cláusula de indemnidad que dan acceso a buzones de clientes. **GOOGLE CLOUD:** proyecto nuevo `unrlvl-mail-mcp` (project number `212509698390`), sin organización, Gmail API habilitada, pantalla de consentimiento **External**, scope `gmail.readonly`, OAuth Client ID creado — **publicación en Production PENDIENTE** de que las páginas legales estén vivas. **ABRE:** 🔴 **SEC-01** los tres MCPs sin autenticación en código · 🔴 **SEC-02** el `upload.ts` público con `SERVICE_ROLE_KEY` y SSRF · 🟠 **MCP-AUTH-01** entregado y pendiente de merge, env var, deploy y verificación de 401 · 🟠 páginas legales en PR · 🟠 sin entidad registrada en Florida · 🟠 **alta del conector** — sin ese paso el MCP de correo está completo y es inútil · 🟡 `003_drop_brand_oauth_tokens.sql` · 🟡 PR de limpieza de `projects/unrlvl-mail-mcp/` · 🟡 `legal/a`. **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23; el brief pedía regenerarlos completos y **CC lo declara en vez de sincronizar parcial**, como el propio brief §3 autoriza. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-08-27).) · cabecera anterior (v2026-08-26-v2) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-26 · v2026-08-26-v2 (ACTUALIZA 2026-08-26 — **LOS TRES ROJOS CERRADOS, Y EL HILO DEL QUE CUELGA TODO LO DEMÁS LLEGA NULL.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **15 learnings** en `public.professor_learnings`, `session_date = 2026-08-26`, los quince con `approved_by_sam = true` — **orden cumplido: Professor → Actualiza**. **SMA no se consultó** (Sam no lo mencionó). **CERRADO Y VERIFICADO EN PRODUCCIÓN:** **PUB-01** — `content-scheduler` **v6** (PR #98), el drenaje comprueba el EFECTO contra la fila de `scheduled_posts` y no el código HTTP, con `publishAndVerify` (`PUBLISH_UNVERIFIABLE`/`PUBLISH_UNPROVEN`/`PUBLISH_FAILED`/`PUBLISH_NOOP`) y `recordPublicationProof` guardando `assets.publication` — aplicación literal de HRD-R11 · **P3** — `content-run-stage` **v94** (PR #99), el juez recibe `social.adapted` y no `aife_filtered`, con `pickJudgedText`, `syncJudgedAdapted` y `adapted_pre_judgment` como evidencia sin firmar · **RESEARCH-01** — `iid-research` **v45** e `iid-process` **v48** (PRs #100 y #101), techo por cascada sobre `intel.iid_research_ceilings` (fila BASE 16000, default DECLARADO COMO DATO) y `truncated` como columna GENERADA desde `stop_reason` · **BLOG-01 PR-1** `forumphs-com` #6 (`discarded_at` en las tres rutas, 410 en descartado, paquete SEO) · **BLOG-01 PR-2** repo NUEVO `unrlvl-blog` #1 (renderizador extraído, `blog_path` como dato con router propio) · **BP-01/02/03** `BluePrints` #2 y #3 (blueprint de LucienSael creado; `BP_BRAND_UNRLVL` a v1.5). **TRES MARCAS ENTRAN AL SCHEDULER** — UnrealvilleStudio, LucienSael y NeuroneSCF con `rollout_started_at 2026-08-26`: cuatro marcas donde ayer había una. **UNRLVL PASA DE 14 AGENTES A 6.** **SEMBRADO Y MEDIDO (HRD-R13, `execute_sql` 2026-08-27):** `brand_rollout` **3** · `brand_cadence` **39** (el brief decía 33 — ⚠️ manda la medición) · `brand_publish_channels` **14** · `brand_topic_platform_mode` **63** · `intel.content_angles` **catálogo NUEVO de 10 ángulos, con el LÍMITE escrito en cada definición** · ángulos en **19** dominios de las marcas nuevas · **`objecion` en los 11 dominios de conversión de ForumPHs** (ángulo de venta: no entra en los editoriales) · `theme` y `fonts_href` **como dato del canal** en ForumPHs (Amatista Carbon), UNRLVL (VOID SYSTEM) y Lucien (EMBER SYSTEM). **LIMPIEZA:** 8 agentes fantasma de UNRLVL · 170+3 filas de cola fallida · 268 `orchestrator_jobs` · 71 findings de un carril que ya no existe; `scheduled_posts` quedó en **cero filas**. **PRIMER MATERIAL REAL DE DOS MARCAS NUEVAS:** memos íntegros (`end_turn`, `truncated=false`, `max_tokens=16000` de `base`) — `LUCIEN-BEHAVIORAL-SCIENCE` **25.162** caracteres y `UNRLVL-AI-COGNITION-TECH` **24.897** — y **dos piezas nuevas de LucienSael** (`blog` y `meta_ig`), ambas `clean` en `awaiting_approval`. ⚠️ **CORRECCIÓN AL BRIEF:** no son las dos primeras piezas de la marca — ya había dos del 2026-07-31; sí es **el primer research de su historia**. **ABRE:** 🔴 **P1 `judged_source` llega NULL** en las **4** piezas vivas de Lucien, las dos nuevas incluidas, pese a `content-run-stage` v94: no se puede afirmar que el juez leyó el adaptado, que es lo único que P3 vino a garantizar — **bloquea toda generación nueva** · 🔴 **P2 las tres reglas con falso positivo MEDIDO** sobre 9 arbitrajes (`HR-FPHS-15` 100 % · `HR-FPHS-13` 100 % · `HR-LEGAL-01` 75 %) — **condición para encender el cron 66** · 🟠 **P3 `IID_FANOUT_EMPTY`** (fail-loud funcionó, falta la causa; fila no localizada en esta pasada) · 🟠 **P4 el fan-out encola para plataformas sin proveedor** (3 `failed` + 1 `complete` en el lote de las 23:57) · 🟠 **P5 el adaptador no lee el genoma** (el conteo de hashtags es campo del genoma, no regla del Watcher) · 🟡 `SIG-01`/`SEO-01` · BLOG-01 PR-3 y PR-4 con la colisión de `/blog/` y los 301 · propagar `truncated` a `iid_findings` · `deno.land` bloqueado en el entorno de CC · `fix_replacement` sólo en `HR-FPHS-15` · 8 `statement` imperativos · `SUPABASE_SERVICE_ROLE_KEY` en 15 de 17 EF · 4 ERROR-level en `unrlvl-db` · handle `hair-intelligence-1` · perfiles duplicados de Vizos · ⚠️ **`iid-process` v49 sin origen conocido** (medido 49, brief 48) · ⚠️ **`Suite 1`** en la dirección de UNRLVL. **COSTO DE LA SESIÓN, SIN ADORNO:** dos divergencias entre producción y `main` por despliegues fuera de orden; **la segunda fue silenciosa y se llevó tres corridas de research completas**. **GOBERNANZA:** `HRD_PROTOCOL.md` **v1.7** con **dos reglas globales nuevas, ninguna derogación** — **HRD-R13** (una lectura de estado caduca dentro de la misma sesión; grepear no es leer; una hipótesis razonada no sustituye una medición) y **HRD-R14** (el orden merge → deploy no es ceremonia y su violación es SILENCIOSA: CC no despliega, Sam despliega desde `main` después del merge). **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23. Detalle en `IID/session_log.md` (2026-08-26).) · cabecera anterior (v2026-08-26-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-26 · v2026-08-26-v1 (ACTUALIZA CHECKPOINT 2 · SESIÓN 2026-08-25 — **EL RATIO LIMPIO PASÓ DE 6,7 % A 51,9 % EN UN DÍA, Y DE 21 PIEZAS UNA SOLA FALLÓ POR CONTENIDO.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **10 learnings** en `public.professor_learnings`, `session_date = 2026-08-25`, los diez con `approved_by_sam = true` — **19 en total de esta sesión** contando el checkpoint anterior. **SMA no se consultó.** **EL RUN DEL 2026-08-25:** 27 filas generadas · 21 piezas creadas · 6 nunca llegaron a pieza. **14 limpias (51,9 %)** · 5 rescatadas por arbitraje o edición (18,5 %) · **19 aprovechables (70,4 %)** · 8 perdidas (29,6 %). **EL DIAGNÓSTICO SE MOVIÓ DEFINITIVAMENTE: de 21 piezas generadas, una sola tenía un defecto de contenido real. Todo lo demás que se perdió fue instrumento.** **ÁNGULOS: 2 DISTINTOS** (`artefacto`, `pregunta`) contra **uno solo en las 250 filas previas**; donde un dominio tuvo dos hallazgos, cada uno recibió ángulo distinto — justo las parejas que antes se rechazaban entre sí. **ARBITRAJES DEL JUEZ: 9** — ocho `rule_failed`, uno `judge_was_right`; tasas de falso positivo **medidas**: `HR-FPHS-15` 100 % · `HR-FPHS-13` 100 % · `HR-LEGAL-01` 75 %. **RECHAZOS DE SAM: 4, Y 3 ERAN DEFECTOS DEL SISTEMA** — 2 por una firma que el sistema no puso, 1 por un truncamiento que el juez no podía ver; sólo 1 era contenido malo (citaba artículos por número). **PROYECCIÓN con SIGN-01 desplegado: 63 % limpio · 81,5 % aprovechable — es PROYECCIÓN, NO MEDICIÓN:** el deploy de `content-run-stage` v93 (23:51 UTC) fue **posterior** a la generación del run (17:10–19:41), así que **ninguna pieza de este run pasó por los arreglos de SIGN-01**. **DESPLIEGUES:** `unrlvl-iid-functions` **#92, #93** · `Orchestrator` **#23**; EFs (versión real = número final de `entrypoint_path`) `content-run-stage` **93** (23:51 UTC) · `content-watcher` **44** (23:13 UTC) · `iid-core` **54** · `iid-process` **47** · `content-scheduler` **5** · `approve-piece` **39** · `judge-arbitration` **2** · `piece-edit` **2** (las dos con `verify_jwt: true`). **MUTACIONES DE DATOS:** **`iid_content_queue_angle_check` ELIMINADO** — enumeraba ocho ángulos genéricos y **bloqueó el primer run con ángulos diversos**; se eliminó con `COMMENT` explicando por qué no vuelve · **32 dominios de ForumPHs con `angles` sembrados**, seis ángulos, matriz por voz · `brand_topics` +`angles` · `content_pieces` +`deferred_until`/`deferred_reason` · CHECK de `status` con `deferred` · **backfill de firma** (18 piezas → **23 de 23 vivas con firma, cero duplicadas**) · **backfill de embeddings** (corpus completo, cero piezas vivas sin embedding en 21 d: el gate de duplicación deja de degradarse a LLM) · `HR-FPHS-11` reescrita (la enumeración de fuentes excluía diarios *de hecho*) · `HR-FPHS-15` reescrita con el criterio de Sam (**sustantivo sí, adjetivo no**) · **`HR-FPHS-16` nueva** (sin enlaces salientes) · `HR-FPHS-11` y `HR-NSCF-08` con `condition` (defecto B en `kind='proof'`, que el barrido de `requirement` no cubría) · **cron 66 `content-placement-poll` APAGADO** hasta PUB-01. **GOBERNANZA:** `HRD_PROTOCOL.md` **v1.6** con **tres reglas globales nuevas, ninguna derogación** — **HRD-R10** (verificar fragmentos no es verificar el archivo: 50 tests en verde sobre `content-run-stage` mientras el archivo **no compilaba**, porque la suite extrae bloques por sentinelas; un `deno check` lo habría cazado) · **HRD-R11** (el éxito se comprueba contra el **efecto**, no contra el código HTTP: un 200 de SocialLab no es una publicación) · **HRD-R12** (el test de la marca N+1 barre también los **CHECKs existentes**, no sólo el código que se escribe: la enumeración puede estar en el esquema — es exactamente lo que pasó con `iid_content_queue_angle_check`). **BARRIDO DE ARCHIVADO EJECUTADO** — pedido explícito de Sam: **5 bloques** bajan a `historical_AGENDA.md` (4 de cabecera + el incidente `content-dispatcher-poll` del 17-jul), y **8 candidatos evaluados quedan RETENIDOS con su motivo declarado**. **ABRE, con su evidencia:** 🔴 **PUB-01** (el drenaje da por publicado con un 200 de SocialLab sin verificar el efecto — **cero publicaciones automáticas reales hasta hoy**; cron 66 apagado) · 🔴 **el texto adaptado por plataforma no pasa por el juez** (`content-run-stage:3134-3136`; verificado: `social.adapted` reintrodujo una cita de ley que `aife_filtered` no tenía) · 🔴 **`deno check` antes de dar por bueno un PR** · tres reglas con tasa de falso positivo alta y dato suficiente para reescribirlas · **SocialLab podría ser mayormente mockup** (sospecha de Sam, encaja con el 200 sin publicación) · barrido de los 8 `statement` imperativos · regla de correspondencia con la fuente (aplazada) · promoción del gate lingüístico (marca el 50 %) · deuda de claves Supabase (15 de 17 EF) · imagen inconsistente en blog y LinkedIn · Klaviyo DKIM/SPF · seguridad de `unrlvl-db`. **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23. Detalle en `brands/ForumPHs/session_log.md` (2026-08-25).) · cabecera anterior (v2026-08-25-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-25 · v2026-08-25-v1 (ACTUALIZA 2026-08-24/25 — **EL CARRIL PUBLICA SOLO, Y EL DIAGNÓSTICO DEL RATIO SE MOVIÓ DEL MATERIAL AL JUEZ.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **9 learnings** en `public.professor_learnings`, `session_date = 2026-08-25`, los nueve con `approved_by_sam = true`. **CINCO HITOS:** **primera publicación automática del ecosistema** — `5e9f03ef` salió **sola** en Facebook el 2026-08-25 **13:13 UTC**, con la franja calculada por `planSchedule` contra la cadencia real (`1x_week`, `month_1`) y drenada por el **cron 66**; nadie la tocó · **primer arbitraje humano del juez** (`judge_calibration`, 2026-08-25 14:36:41, `decided_by: sam`) · **primera retención** — 2 piezas salvadas que el día anterior se habrían destruido, con la prueba de su inocencia al lado · **PROC-01 en producción** — 15 hallazgos nuevos, **cero** con ley numerada y **cero** con año calendario, contra 3 de 5 contaminados antes · **corpus de embeddings completo** — backfill corrido, cero piezas vivas sin embedding en 21 días, y el gate deja de degradarse a LLM. **EL BLOQUEANTE DE TODO LO DEMÁS DEL 2026-08-23 QUEDA CERRADO:** el eje de colocación existe, es el modo `placement` de `content-scheduler` (Opción A, la recomendada), y funcionó. **DESPLIEGUES:** `unrlvl-iid-functions` **#80, #81, #82, #83, #84, #85, #86, #87, #88, #91, #92** y `Orchestrator` **#21, #22**; EFs `content-run-stage` **92** · `content-watcher` **43** · `content-scheduler` **5** · `iid-core` **54** · `iid-process` **47** · `approve-piece` **39** · `judge-arbitration` **2** · `piece-edit` **2** — las dos últimas con **`verify_jwt: true`**, su primera capa de defensa, asimetría **deliberada** frente al resto del carril, que usa `--no-verify-jwt` porque lo llama el cron vía `pg_net`, que no lleva JWT. **REGLAS DEL WATCHER (50 activas):** `HR-LEGAL-01`/`HR-LEGAL-02` reformuladas **como test** (`INCUMPLE…CUMPLE…`), sin imperativo · `HR-GEN-05`/`06`/`07` reescritas **sin idioma cableado** (refieren al *idioma declarado de la pieza*; los ejemplos castellanos migraron a `instruction`) · **`HR-GEN-09` nueva** (ambigüedad que **invierte el sentido**, nace del título que Sam rechazó) · **`HR-FPHS-16` nueva** (sin enlaces salientes; exime el dominio propio) · `HR-FPHS-11` ampliada a tres orígenes de cifra **y luego reescrita** (la enumeración de fuentes excluía diarios *de hecho*, y exigía al juez una correspondencia URL↔nombre que **no puede verificar**) · `HR-FPHS-15` reescrita distinguiendo **sustantivo** (`la extraordinaria` → incumple) de **adjetivo** (`asamblea extraordinaria` → cumple), **9 casos probados, 9 correctos** · 10 reglas con `condition` sembrada · `HR-LUC-02` y `HR-UNRLVL-03` corregidas a `kind='prohibition'` · 4 reglas con `verify_pattern`, `HR-FPHS-15` además con `fix_replacement`. **ESQUEMA:** `watcher_rules` +`condition`/`verify_pattern`/`fix_replacement`/`enforced_on` · `content_pieces` +`pass_type`/`challenged_at`/`edited_at`/`edited_by`/`deferred_until`/`deferred_reason` · `scheduled_posts` +`piece_id` · `brand_topics` +`angles` · **tablas nuevas** `intel.judge_calibration` e `intel.piece_edits` · CHECK de `content_pieces.status` con `challenged` y `deferred` · CHECK de `orchestrator_jobs.status` con `awaiting_publish`. **DATOS:** 29 filas de `scheduled_posts` borradas (residuo del código retirado; **5 eran de LucienSael y se rescataron** a `brands/LucienSael/corpus/2026-07-30_zugzwang_set.md`) · finding `9eea20a3` saneado a mano · **32 dominios de ForumPHs con `angles` sembrados** · 3 canales Meta/LinkedIn en `brand_publish_channels` con `provider_platform` · **cron nuevo `content-placement-poll`** (jobid 66, `*/15`, activo). **LOS SEIS ÁNGULOS DE FORUMPHS** aprobados por Sam: `expertise` · `artefacto` · `pregunta` · `consecuencia` · `contraste` · `secuencia`, con su matriz ángulo-voz y **el criterio de las ausencias** — **15 combinaciones ángulo-voz** contra **la única** que el ecosistema usó en 25 días y 250 filas. **GOBERNANZA:** `HRD_PROTOCOL.md` **v1.5** con dos reglas globales nuevas — **HRD-R08** (verificar contra el motor donde se ejecuta: `verify_pattern` POSIX, `fix_replacement` ECMAScript, `$1` nunca `\1`) y **HRD-R09** (mergear no despliega, y un merge puede quedarse corto: se verifica el **commit**, no el estado del PR). **ABRE, con su evidencia:** barrido de los **8 `statement` imperativos** de las 50 reglas activas · regla de correspondencia con la fuente (FIX-01 §4.5), **aplazada por decisión de Sam** · promoción del **gate lingüístico** (marca 1 error en **11 de 22** piezas, **tasa del 50 %** — revisar sus marcas antes de bloquear) · **deuda de claves Supabase** (15 de 17 EF leen `SUPABASE_SERVICE_ROLE_KEY`, marcada `DEPRECATED`; 13 sobreviven porque la usan contra PostgREST, donde ambas generaciones valen — **las 15 caen el día que Supabase la retire**) · **aviso obsoleto en la bandeja de publicación del Orchestrator** (dice que no existe el eje de colocación; es falso desde el 25-ago — **va en PR propio del repo `Orchestrator`**) · imagen inconsistente en blog (2 de 4) y LinkedIn (1 de 2) · Klaviyo DKIM/SPF · seguridad de `unrlvl-db` · las **5 piezas destruidas**, irrecuperables. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — desde el 2026-08-23 eso **ya no es una excepción declarada sino la regla escrita** en `CLAUDE.md` («Los derivados NO se regeneran completos — se sincronizan»), tras cinco aplicaciones seguidas de la misma excepción. La regeneración real sigue abierta **sin fecha**. Detalle en `brands/ForumPHs/session_log.md` (2026-08-25).) · cabecera anterior (v2026-08-23-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

---

## 🗓️ ACTUALIZA 2026-08-27-v1 — El carril no fue el problema de hoy. Tres MCPs del ecosistema estaban en internet sin autenticación

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-08-27). Sólo context files de `unrlvl-context`; el código, las DDL, los deploys y las corridas se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: el brief declara **12 learnings** con `session_date = 2026-08-27` y `approved_by_sam = true`; **medido: 24**, en dos lotes de 12 — ver «Lo medido contra lo declarado». **SMA no se consultó** — Sam no lo mencionó. **Test de la marca N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 📊 Lo medido contra lo declarado — tres discrepancias

Verificado el **2026-08-28** con `execute_sql`, `get_advisors` y la API de Vercel (**HRD-R13**: una
lectura de estado caduca dentro de la misma sesión). **Donde el brief y la medición discrepan manda
la medición**, y la discrepancia se anota en vez de corregirse a mano:

| Objeto | Medido | Brief |
|---|---|---|
| `professor_learnings` con `session_date = 2026-08-27` | **24**, los 24 `approved_by_sam` | 12 ⚠️ |
| `unrlvl-supabase-mcp` · `ssoProtection` | **`true` (`all_except_custom_domains`)** | `false` ⚠️ |
| `unrlvl-mail-mcp` · `ssoProtection` | **`true` (`all_except_custom_domains`)** | (mitigación pedida) ⚠️ |
| `unrlvl-meta-mcp` / `unrlvl-shopify-mcp` · `ssoProtection` | `true` (`all_except_custom_domains`) | `true` ✅ |
| Los cuatro · `passwordProtection` / `trustedIps` | `false` / `false` | `false` / `false` ✅ |
| `unrlvl-db` · advisors de seguridad | **16 ERROR · 39 WARN** (+10 INFO) | 16 · 39 ✅ |
| Schema `mail` · tablas | **2** (`mailboxes`, `authorizations`) | 2 ✅ |
| Schema `mail` · funciones `SECURITY DEFINER` | **1** (`resolve_credential`) | 1 ✅ |
| Rol `mail_mcp` | **existe** | existe ✅ |
| `has_schema_privilege(…, 'mail', 'USAGE')` para `service_role` / `anon` / `authenticated` | **`false` / `false` / `false`** | (aislamiento declarado) ✅ |
| `mail.mailboxes` / `mail.authorizations` | **0 filas / 0 filas** | sin buzones de alta ✅ |
| `unrealvillestudio-hub/unrlvl-mail-mcp` | **existe**, `pushed_at 2026-08-27T23:34:36Z` | creado ✅ |
| Archivos en la raíz del repo extraído | **30** | 30 ✅ |

**Los 24 learnings** salieron en **dos lotes** — 12 a las `17:17:51 UTC` y 12 a las `23:49:52 UTC`.
El brief contó **el suyo**. No hay learning perdido ni duplicado: hay dos cierres de Professor en el
mismo `session_date`.

**Las dos discrepancias de Vercel son buena noticia, y no cierran nada.** El brief pedía como
mitigación inmediata *«activar Vercel Authentication en `unrlvl-supabase-mcp` y
`unrlvl-mail-mcp`»*: medido el 2026-08-28, **ya está aplicada en los cuatro proyectos**. Lo que la
casilla de Vercel **no** arregla: (a) el código sigue **sin leer una sola cabecera de credencial**,
y (b) `all_except_custom_domains` **no protege un dominio propio** — el día que uno de estos MCPs
reciba un dominio, la protección desaparece sin que nadie toque nada. **El cierre correcto sigue
siendo MCP-AUTH-01 extendido a los tres.**

### 🔴 SEC-01 — Tres MCPs sin autenticación en código

`unrlvl-supabase-mcp`, `unrlvl-meta-mcp` y `unrlvl-shopify-mcp` **no leen ninguna cabecera de
credencial**: van de `req.json()` a `handleRpc` a `callTool` **sin tocar `req.headers`**. Los tres
declaran `Access-Control-Allow-Origin: *`.

| MCP | Tools que **mutan** | Cuáles |
|---|---|---|
| `unrlvl-supabase-mcp` | **3** | `execute_sql`, `apply_migration`, `deploy_edge_function` |
| `unrlvl-meta-mcp` | **9** | publicación y gestión de ads/IG/FB |
| `unrlvl-shopify-mcp` | **4** | escritura sobre las tiendas |

**Agravante sistémico:** en la misma DB que alcanza `execute_sql` viven **`shopify_stores` y
`meta_accounts`, con los tokens de los otros dos**. Un solo endpoint abierto no expone un MCP:
expone los tres.

- **Mitigación inmediata:** ✅ **aplicada** — Vercel Authentication activa en los cuatro proyectos
  (medido 2026-08-28). **No es el cierre.**
- **Cierre correcto:** extender el patrón de **MCP-AUTH-01** a los tres.

### 🔴 SEC-02 — `unrlvl-meta-mcp/api/upload.ts`, segundo endpoint público sin autenticar

Sube archivos arbitrarios al bucket `unrlvl-media` con la **`SERVICE_ROLE_KEY`** y **`x-upsert:
true`**. Acepta una **`url` remota que el servidor descarga**: vector **SSRF**, más **sobrescritura
de assets de marca** en `brand/{brand_id}/`. `x-upsert: true` es lo que convierte una subida en un
reemplazo silencioso.

### 🟢 Entregado hoy — `unrlvl-mail-mcp`, de punta a punta

MCP de **correo de clientes, sólo lectura**. Tres tools: `list_brand_mailboxes`, `search_messages`,
`get_message`. Carpetas `INBOX`/`SENT`/`SPAM`, **papelera excluida**, **sin persistencia de
contenido**.

- **Schema `mail` aislado** — 2 tablas (`mailboxes`, `authorizations`) + 1 función
  `SECURITY DEFINER` (`resolve_credential`), `REVOKE` sobre `anon`, `authenticated`, `service_role`
  y `PUBLIC`, **RLS habilitada sin políticas** como defensa redundante, y `search_path` fijo en la
  función para no repetir la deuda `function_search_path_mutable`.
- **Rol dedicado `mail_mcp`**, y no `service_role`. El motivo es de radio de daño: `service_role` la
  tienen ~15 Edge Functions; si las credenciales de buzón fueran legibles con esa clave, el radio
  sería **todo el carril**. Con el `REVOKE`, las 15 EFs no pueden leer `mail` **porque no tienen
  permiso**, no porque una política se lo pida.
- **`mail` NO figura en *Exposed schemas*** — queda fuera de la API REST de Supabase.
- **El papel firmado deja de ser archivo y pasa a ser compuerta:** sin una fila viva en
  `authorizations` (`revoked_at IS NULL`), `resolve_credential` **no devuelve token**.
- **Repo propio** `unrealvillestudio-hub/unrlvl-mail-mcp`, extraído de `unrlvl-context` con
  `git subtree split`, **30 archivos** en la raíz.
- **Límite honesto y declarado:** esto aísla del plano de aplicación, **no del titular del
  proyecto** — el rol `postgres` y el editor SQL del panel siguen alcanzando `mail`. Eso es Sam, y
  es aceptable.

### 🟠 MCP-AUTH-01 — entregado, sin cerrar

Rama `claude/mcp-auth-01-cxzbrs`, commit `0decb6e`, **44 tests en verde**. **Pendiente:** merge ·
`MCP_AUTH_TOKEN` en Vercel · deploy · **verificación de 401**. Hasta el 401 verificado, el patrón
está escrito y no está en pie.

### 🟠 Páginas legales de `unrealvillestudio.com` — PR en curso en `CoreProject`

Las páginas del **28-abr** identificaban al responsable del tratamiento como **«Unrealville Studio
LLC», entidad que no existe**, y estaban **huérfanas**: **cero `href` desde ambos footers**. Un
documento legal que nadie puede alcanzar no protege a nadie, y uno que nombra una entidad
inexistente tampoco. Se sustituyen por **Samuel Moreno Mendoza, empresario individual**.

### 🟠 Sin LLC ni nombre ficticio registrados en Florida

Sam firma **como persona física** documentos con **cláusula de indemnidad** que dan acceso a buzones
de clientes. No es una observación de estilo: es quién responde si algo sale mal.

### 🟠 Alta del conector

`unrlvl-mail-mcp` **no está dado de alta como conector en Claude.ai**. Sin ese paso **el sistema
está completo y es inútil**. Se mide solo: `mail.mailboxes` en **0 filas**.

### 🟡 Amarillos nuevos

- **`003_drop_brand_oauth_tokens.sql`** — pendiente, en PR propio. Barrido cerrado: **31 repos, cero
  referencias en código**; **cero FK, cero vistas dependientes**; **0 filas**.
- **PR de limpieza:** sacar `projects/unrlvl-mail-mcp/` y `projects/UNRLVL_MAIL_MCP_HANDOFF.md` de
  `unrlvl-context`, ya extraído el repo. Son **andamio de traslado, no context files** — su historia
  queda en el PR.
- **Env vars de `unrlvl-mail-mcp`:** `MCP_AUTH_TOKEN` pendiente del merge de MCP-AUTH-01.
- **`legal/a`** — archivo basura de **3 bytes** en `CoreProject` (commit `3a03a9f`). Se borra en el
  PR legal.

### ✅ Corrección de una cifra de AGENDA — `unrlvl-db`

Donde el bloque del **26-ago** dice **«4 ERROR-level en `unrlvl-db`»**, la remedición con
`get_advisors` del **2026-08-28** da **16 ERROR y 39 WARN** (+10 INFO). **El dato viejo no se borra:
se anota la remedición con su fecha.**

Los **16 ERROR**, desglosados:

- **12 vistas `SECURITY DEFINER`** en `public`: `v_client_terms_vigente`, `v_cost_unified`,
  `v_iid_piece_cost`, `v_iid_funnel`, `v_model_efficiency`, `v_cost_por_dimension`, `v_rate_gaps`,
  `v_cost_pivot`, `v_reconciliacion`, `v_cost_by_brand_lab`, `v_client_margin`,
  `v_cost_residual_vigente`.
- **4 tablas `ops_*` sin RLS**: `ops_client_terms`, `ops_rate_transitions`, `ops_credits`,
  `ops_cost_residual`.

Los **39 WARN**: 23 `function_search_path_mutable` · 8 `anon_security_definer_function_executable` ·
6 `authenticated_security_definer_function_executable` · 2 `extension_in_public`.

### ☁️ Google Cloud — proyecto nuevo `unrlvl-mail-mcp`

Project number **`212509698390`**, **sin organización**, cuenta `unrealvillestudio@gmail.com`.
**Gmail API habilitada** · pantalla de consentimiento **External** creada · scope
**`gmail.readonly`** declarado · **OAuth Client ID creado** (Web application, redirect
`http://localhost:8080/`). **Publicación en Production PENDIENTE** de que las páginas legales estén
vivas — el orden no es burocrático: Google pide las URLs y tienen que resolver.

> **El client secret no está en ningún archivo de este repo, ni lo estará.** El **Client ID sí**
> puede aparecer: no es secreto. Tampoco están la contraseña de `mail_mcp` ni el `MCP_AUTH_TOKEN`.

### 🔻 REVISABLE SI — representante en la UE (art. 27 RGPD)

**Retirado** de los documentos legales: las marcas con mercado España declaradas en `ecosystem.json`
**no tienen entidad legal, contrato ni servicio prestado por UNRLVL**. La consulta que **reabre** el
ítem:

```sql
select brand_id, market from public.brands
where market ilike '%espa%' or market ilike '%europ%' or market ilike '%EU%';
```

Si alguna de esas filas pasa a tener **contrato firmado o canal de venta activo**, el ítem **se
reabre**. No se borra: se deja con su condición de reapertura escrita.

---

## 🗓️ ACTUALIZA 2026-08-26-v2 — Los tres rojos cerrados, y el hilo del que cuelga todo lo demás llega NULL

_(Bloque al tope. Detalle del carril en `IID/session_log.md` (2026-08-26); por marca en `brands/LucienSael/`, `brands/UnrealvilleStudio/`, `brands/NeuroneSCF/` y `brands/ForumPHs/session_log.md` (2026-08-26). Sólo context files de `unrlvl-context`; el código, las DDL, los deploys y las corridas se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **15 learnings** en `public.professor_learnings`, `session_date = 2026-08-26`, los quince con `approved_by_sam = true` — **orden cumplido: Professor → Actualiza**. **SMA no se consultó** — Sam no lo mencionó. **Test de la marca N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado y verificado en producción

- **PUB-01** — `content-scheduler` **v6** (PR #98). El drenaje comprueba **el EFECTO** contra la fila
  de `scheduled_posts`, no el código HTTP. `publishAndVerify` con cuatro veredictos —
  `PUBLISH_UNVERIFIABLE`, `PUBLISH_UNPROVEN`, `PUBLISH_FAILED`, `PUBLISH_NOOP` — y
  `recordPublicationProof` guardando `assets.publication`. Aplicación literal de **HRD-R11**.
- **P3** — `content-run-stage` **v94** (PR #99). El juez recibe **`social.adapted`**, no
  `aife_filtered`. `pickJudgedText`, `syncJudgedAdapted`, `adapted_pre_judgment` como evidencia sin
  firmar.
- **RESEARCH-01** — `iid-research` **v45**, `iid-process` **v48** (PRs #100 y #101). Techo por
  cascada sobre `intel.iid_research_ceilings` (fila BASE `max_tokens = 16000`, `agent_name` y
  `brand_id` nulos: default **declarado como dato**) y **`truncated` como columna GENERADA** desde
  `stop_reason`.
- **BLOG-01 PR-1** — `forumphs-com` **#6**: `discarded_at` filtrado en las tres rutas, **410** en
  artículo descartado, paquete SEO completo.
- **BLOG-01 PR-2** — repo **nuevo** `unrlvl-blog` **#1**: renderizador extraído, `blog_path` como
  dato con router propio, tema y copia por canal.
- **BP-01/02/03** — `BluePrints` **#2 y #3**: blueprint de LucienSael creado (JSON + HTML + 2 SVG
  vectorizados); `BP_BRAND_UNRLVL` a **v1.5**.
- **Tres marcas entran al Scheduler** — UnrealvilleStudio, LucienSael y NeuroneSCF con
  `rollout_started_at = 2026-08-26`. Cuatro marcas donde ayer había una. **UNRLVL pasa de 14 agentes
  a 6.**

### 📊 Lo medido contra lo declarado — dos discrepancias

Verificado con `execute_sql` el 2026-08-27 (**HRD-R13**). **Donde el brief y la medición discrepan
manda la medición**, y la discrepancia se anota en vez de corregirse a mano:

| Objeto | Medido | Brief |
|---|---|---|
| `brand_rollout` sembradas hoy | 3 | 3 ✅ |
| `brand_cadence` sembradas hoy | **39** (Lucien 15 · NSCF 12 · UNRLVL 12) | 33 ⚠️ |
| `brand_publish_channels` sembrados hoy | 14 | 14 ✅ |
| `brand_topic_platform_mode` sembradas hoy | 63 | 63 ✅ |
| `intel.content_angles` (catálogo nuevo) | 10 | 10 ✅ |
| Dominios con `angles` en las marcas nuevas | 19 | 19 ✅ |
| Dominios de ForumPHs que suman `objecion` | 11 | 11 ✅ |
| `iid-process` servida en producción | **49** | 48 ⚠️ |

### 🔴 P1 — `judged_source` llega NULL

**Medido:** las **4** piezas vivas de LucienSael tienen `assets.watcher` presente y
`assets.watcher.judged_source` **NULL** — **incluidas las dos que corrieron sobre
`content-run-stage` v94**. **No se puede afirmar que el juez leyó el adaptado**, que es lo único que
P3 vino a garantizar.

**Bloquea toda generación nueva:** cada pieza que salga hoy repite el agujero, **ahora en dos
marcas**. Es el hilo del que cuelga el resto — sin él, P3 está cerrado en el código y **abierto en
la evidencia**.

### 🔴 P2 — Las tres reglas con falso positivo medido

Recontado sobre `intel.judge_calibration`, **9 arbitrajes**: `HR-FPHS-15` **3/3 = 100 %** ·
`HR-FPHS-13` **2/2 = 100 %** · `HR-LEGAL-01` **3/4 = 75 %**. Ya no es impresión: es dato suficiente
para reescribirlas. En `HR-FPHS-15` **el criterio de marca es correcto** (sustantivo sí, adjetivo
no) y **lo que falla es su detección**.

**Es la condición para encender el cron 66.**

### 🟠 P3 — `IID_FANOUT_EMPTY`

En un finding de LucienSael: *«1 suscriptor activo pero 0 encolado en
`domain=behavioral-science`»*. **El fail-loud funcionó; falta la causa.** Reportado por el brief —
**su fila no se localizó en esta pasada**, y se anota como pendiente de localizar, no como medido
(HRD-R13).

### 🟠 P4 — El fan-out encola para plataformas sin proveedor

**Medido** en `intel.iid_content_queue`, lote `2026-08-26 23:57:26.167661+00`: **3 filas `failed`**
(`tiktok`, `x`, `meta_fb`) y **1 `complete`** (`meta_ig`). **El fan-out no mira si el canal está
activo.** Encolar contra un canal sin proveedor no es un fallo del proveedor: es una pregunta que no
se hizo antes de encolar.

### 🟠 P5 — El adaptador no lee el genoma

El **conteo de hashtags por plataforma** es **campo del genoma** y **no regla del Watcher**: el juez
**no puede medirlo** aunque ahora lo vea. P3 le dio al juez el texto correcto; esto le falta el
criterio. Pesa especialmente en **NeuroneSCF**, la única marca del carril con **venta real detrás**.

### 🟡 Abierto, sin bloquear

- **`SIG-01` y `SEO-01`** en `CoreProject` y `forumphs-com`.
- **BLOG-01 PR-3 y PR-4** — con la **colisión de `/blog/` en dos marcas** (UNRLVL y Lucien; Lucien
  sirve hoy `.html` estático) y los **301 del `.html`**.
- **Propagar `truncated` a `iid_findings`** — hoy la columna generada vive sólo en
  `iid_research_raw`.
- **`deno.land` bloqueado en el entorno de CC** — hace depender **HRD-R10** de Sam.
- **Corrector `fix_replacement` sólo en `HR-FPHS-15`.**
- **8 `statement` imperativos** en las reglas activas del Watcher.
- **`SUPABASE_SERVICE_ROLE_KEY` en 15 de 17 EF** — marcada `DEPRECATED`; el fallo está **aplazado
  por el consumidor, no resuelto en el emisor**.
- **4 ERROR-level en `unrlvl-db`.**
- **Handle `hair-intelligence-1`** con sufijo en Shopify — handle duplicado es contenido duplicado.
- **Perfiles duplicados de Vizos** en Miami Beach.
- ⚠️ **`iid-process` v49 sin origen conocido** — la medición dice 49, el brief dice 48. **Qué
  desplegó la v49 y cuándo no consta.** Es exactamente la clase de hueco que **HRD-R14** viene a
  cerrar.
- ⚠️ **`Suite 1` en la dirección de UNRLVL** — el tema Shopify de NSCF ya lleva *12951 Biscayne
  Blvd, **Suite 1***; `brands/UnrealvilleStudio/brand.json` dice la dirección **sin** el número de
  suite. Dato legal, no redacción: **decide Sam**.
- ⚠️ **`lucien_social` declara X como publicación manual** y la DB ya lo tiene como `x_api` activo.
  Divergencia documento ↔ dato, pendiente **en el genoma**.

### 💸 El costo de la sesión, dicho sin adorno

**Dos divergencias entre producción y `main` por despliegues fuera de orden. La segunda fue
silenciosa** — la EF seguía devolviendo `200`, guardando el memo y marcando el truncamiento: todo
parecía correcto y **el arreglo no estaba puesto**. **Se llevó tres corridas de research completas.**
El rastro quedó en `intel.iid_research_raw`, con `max_tokens` en `NULL` donde la cascada debía haber
escrito `16000` con `max_tokens_source = 'base'`.

### 📜 Gobernanza — `HRD_PROTOCOL.md` v1.7

**Dos reglas globales nuevas, ninguna derogación:**

- **HRD-R13 — Una lectura de estado caduca dentro de la misma sesión.** Ninguna lectura previa vale
  como afirmación presente en un chat que muta producción durante horas. **Grepear no es leer** — un
  literal puede vivir dentro de un comentario. **Una hipótesis razonada no sustituye una medición.**
  *Origen: cuatro afirmaciones sin verificar el 2026-08-26.*
- **HRD-R14 — El orden merge → deploy no es ceremonia; su violación es silenciosa.** **CC no
  despliega.** Sam despliega desde `main`, después del merge. Si hace falta un deploy para probar,
  **se pide**. *Origen: `iid-research` v44 revirtió RESEARCH-01 y todo parecía correcto.*

---

## 🗓️ ACTUALIZA 2026-08-26-v1 — De 21 piezas, una sola falló por contenido: el resto que se perdió fue instrumento

_(Bloque al tope. Detalle en `brands/ForumPHs/session_log.md` (2026-08-25). Sólo context files de `unrlvl-context`; el código, las DDL, los deploys y las corridas se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **10 learnings** en `public.professor_learnings`, `session_date = 2026-08-25`, los diez con `approved_by_sam = true` — **19 en total de esta sesión** contando el checkpoint anterior. **SMA no se consultó.** CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 📈 El run del 2026-08-25 — números verificados

**27 filas generadas · 21 piezas creadas · 6 nunca llegaron a pieza.**

| Resultado | Piezas | % |
|---|---|---|
| **Limpias** (`pass_type='clean'`: 12 aplazadas + 2 aprobadas) | **14** | **51,9 %** |
| Rescatadas por arbitraje o edición (`assisted`) | 5 | 18,5 % |
| **Aprovechables** | **19** | **70,4 %** |
| Perdidas | 8 | 29,6 % |

El ratio limpio pasó de **6,7 % → 12,5 % → 51,9 %** en un día, sobre **el primer run del carril
completo**.

**Lo que mueve el diagnóstico, y es el hallazgo del día:** de las **21 piezas generadas, una sola
tenía un defecto de contenido real** — citaba artículos por número. **Todo lo demás que se perdió
fue instrumento**: firma que el sistema no puso, truncamiento que el juez no podía ver, reglas con
falso positivo. El material dejó de ser el sospechoso.

- **Ángulos: 2 distintos** (`artefacto`, `pregunta`) contra **uno solo en las 250 filas previas**.
  Donde un dominio tuvo dos hallazgos, cada uno recibió ángulo distinto — **justo las parejas que
  antes se rechazaban entre sí** por duplicación.
- **Arbitrajes del juez: 9** — ocho `rule_failed`, uno `judge_was_right`. Con eso hay **tasa de falso
  positivo medida, no estimada**: `HR-FPHS-15` **100 %** · `HR-FPHS-13` **100 %** · `HR-LEGAL-01`
  **75 %**.
- **Rechazos de Sam: 4, y 3 eran defectos del sistema** — 2 por una firma que el sistema no puso,
  1 por un truncamiento que el juez no podía ver.

⚠️ **La proyección con SIGN-01 desplegado (63 % limpio · 81,5 % aprovechable) es PROYECCIÓN, NO
MEDICIÓN.** El deploy de `content-run-stage` **v93** fue a las **23:51 UTC** y la generación del run
corrió entre las **17:10 y las 19:41**: **ninguna pieza de este run pasó por los arreglos de
SIGN-01.** Se anota como proyección precisamente para que la próxima sesión no la lea como medida.

### 🟢 Cerrado — se retira de pendientes

- **Ángulos diversos** — 2 ángulos distintos en un mismo run, contra uno solo en 250 filas.
  Cerrado por la siembra de `angles` en 32 dominios **y** por la eliminación de
  `iid_content_queue_angle_check`.
- **Aplazamiento por duplicación** — `content_pieces.deferred_until` / `.deferred_reason` + `deferred`
  en el CHECK de `status`. Una pieza duplicada se aplaza; ya no se destruye.
- **Retención por desacuerdo** — estado `challenged` operativo.
- **Arbitraje del juez, operativo** — 9 arbitrajes en un run, con tasas de falso positivo medidas.
  `judge-arbitration` **v2**.
- **Backfill de embeddings** — corpus completo, **cero piezas vivas sin embedding en 21 d**. El gate
  de duplicación **deja de degradarse a LLM**.
- **Backfill de firma** — 18 piezas. Resultado verificado: **23 de 23 vivas con firma, cero
  duplicadas**.
- **Corrector con rastro** — `fix_replacement` aplicado antes del juicio, y el cambio queda anotado.
- **Juez viendo el título** y **juez viendo el final** — los dos puntos ciegos que producían rechazos
  sobre texto que el juez no había leído.
- **Bandeja que ejecuta decisiones** — `Orchestrator` #23.
- **Veredictos legibles** — el veredicto se lee sin reconstruirlo a mano.

### 🔻 Abre — con su evidencia

- 🔴 **PUB-01 — el drenaje da por publicado con un 200 de SocialLab, sin verificar el efecto.**
  **Cero publicaciones automáticas reales hasta hoy.** El **cron 66 `content-placement-poll` está
  APAGADO** hasta que PUB-01 cierre. Es la mitad que faltaba del hito del 25-ago: el carril **coloca**,
  pero todavía no se puede afirmar que **publica**.
- 🔴 **El texto adaptado por plataforma no pasa por el juez** — `content-run-stage:3134-3136`.
  **Verificado, no deducido:** `social.adapted` **reintrodujo una cita de ley** que `aife_filtered`
  ya no tenía. El juez aprueba un texto y sale otro.
- 🔴 **`deno check` (o parseo del archivo completo) antes de dar por bueno un PR** — **50 tests en
  verde sobre un archivo que no compilaba.** La suite extrae bloques por sentinelas, así que verifica
  fragmentos, no el archivo. Queda escrito como **HRD-R10**.
- **Tres reglas con tasa de falso positivo alta y dato suficiente para reescribirlas** —
  `HR-FPHS-15` 100 % · `HR-FPHS-13` 100 % · `HR-LEGAL-01` 75 %. Ya no es impresión: son 9 arbitrajes.
- **SocialLab podría ser mayormente mockup** — **sospecha de Sam**, anotada como tal. Encaja con el
  200 sin publicación de PUB-01. Verificar antes de construir encima.
- Barrido de los **8 `statement` imperativos** de las 50 reglas activas.
- **Regla de correspondencia con la fuente** (FIX-01 §4.5) — **aplazada por decisión de Sam.**
- **Promoción del gate lingüístico a bloqueante** — hoy marca **1 error en 11 de 22 piezas (50 %)**.
  Revisar sus marcas antes de bloquear.
- 🔴 **Deuda de claves Supabase** — **15 de 17 EF** leen `SUPABASE_SERVICE_ROLE_KEY`, marcada
  `DEPRECATED`. Las 15 caen el día que Supabase la retire.
- **Imagen inconsistente** en blog y LinkedIn · **Klaviyo DKIM/SPF** · **seguridad de `unrlvl-db`**.

### 🗄️ Mutaciones de datos del 2026-08-25

- 🔴 **`iid_content_queue_angle_check` ELIMINADO.** Enumeraba **ocho ángulos genéricos** y **bloqueó
  el primer run con ángulos diversos**. Se eliminó con un **`COMMENT` que explica por qué no vuelve**:
  la enumeración de un eje no va en el esquema. Es el caso que origina **HRD-R12**.
- **32 dominios de ForumPHs con `angles` sembrados** — seis ángulos, matriz por voz.
- `brand_topics` +`angles` · `content_pieces` +`deferred_until`/`deferred_reason` · CHECK de `status`
  ampliado con `deferred`.
- **Backfill de firma:** 18 piezas → **23 de 23 vivas con firma, cero duplicadas**.
- **Backfill de embeddings:** corpus completo, cero piezas vivas sin embedding en 21 d.
- `HR-FPHS-11` **reescrita** — la enumeración de fuentes **excluía diarios *de hecho***.
- `HR-FPHS-15` **reescrita con el criterio de Sam**: **sustantivo sí, adjetivo no**.
- **`HR-FPHS-16` nueva** — sin enlaces salientes.
- `HR-FPHS-11` y `HR-NSCF-08` con **`condition`** — defecto B en `kind='proof'`, que el barrido de
  `requirement` **no cubría**.
- 🔴 **Cron 66 `content-placement-poll`: APAGADO** hasta PUB-01.

### 🚀 Desplegado

`unrlvl-iid-functions`: **#92, #93** · `Orchestrator`: **#23**

**Estado desplegado verificado** (versión real = número final de `entrypoint_path`):
`content-run-stage` **93** (23:51 UTC) · `content-watcher` **44** (23:13 UTC) ·
`iid-core` **54** · `iid-process` **47** · `content-scheduler` **5** · `approve-piece` **39** ·
`judge-arbitration` **2** · `piece-edit` **2** *(las dos con `verify_jwt: true`)*.

### 📐 Gobernanza — `HRD_PROTOCOL.md` v1.6

Tres reglas globales nuevas, **ninguna derogación**, las tres nacidas de errores de esta sesión:

- **HRD-R10 — verificar fragmentos no es verificar el archivo.** 50 archivos de test en verde sobre
  `content-run-stage` **mientras el archivo no compilaba**, porque la suite extrae bloques por
  sentinelas. Un `deno check` lo habría cazado.
- **HRD-R11 — el éxito se comprueba contra el efecto, no contra el código HTTP.** Un 200 no es una
  publicación.
- **HRD-R12 — el test de la marca N+1 barre también los CHECKs existentes**, no sólo el código que se
  escribe. La enumeración puede estar en el esquema.

### 🗃️ Barrido de archivado — ejecutado (pedido explícito de Sam)

**5 bloques archivados** en `historical_AGENDA.md`, íntegros y sin reescribir: **4 de cabecera**
(`v2026-08-23-v1`, `v2026-08-22-v1`, `v2026-08-21-v1`, `v2026-08-18-v1` — metadata, mismo criterio
que las migraciones del 16 y el 21 de agosto) y **1 ítem** (`INCIDENTE RESUELTO (17-jul) —
content-dispatcher-poll`, cerrado con efecto medido, 40 días, cero referencias activas).

**8 candidatos evaluados quedan RETENIDOS**, cada uno con su motivo declarado en la migración: #5i
Lucien · SPRINT SEMBRADOR · FRENTE CERRADO ForumPHs · E5b BACKEND · E6+#45 NeuroneSCF · Watcher
reglas enumeradas · los ítems jun-jul de «Resuelto recientemente» · el cierre del 2026-08-16.
Criterio aplicado tal cual lo pidió Sam: **en la duda, se queda.**

### 🧪 Test de la marca N+1

**No aplica.** Este Actualiza no produce código, migración ni siembra. Se declara para que la
ausencia no se lea como omisión.

### 📄 Derivados

`ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en
`CLAUDE.md` desde el 2026-08-23. **No existe generador en el repo.** La regeneración real sigue
abierta **sin fecha**.

---

## 🗓️ ACTUALIZA 2026-08-25-v1 — El carril publica solo, y el diagnóstico del ratio se movió del material al juez

_(Bloque al tope. Detalle en `brands/ForumPHs/session_log.md` (2026-08-25). Sólo context files de `unrlvl-context`; el código, las DDL, los deploys y las corridas se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **9 learnings** en `public.professor_learnings`, `session_date = 2026-08-25`, los nueve con `approved_by_sam = true`. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🟢 EL BLOQUEANTE DE TODO LO DEMÁS QUEDA CERRADO — el eje de colocación existe y funcionó

El 2026-08-23 esta agenda abría con un bloqueante: **no existía eje de colocación de piezas
producidas**, y todo lo demás —drenaje, cadencia, presupuestos por marca, ads— lo asumía. Se cerró
por la **Opción A**, que era la recomendada: **modo `placement` en `content-scheduler`**, el único
componente que ya sabía de cadencia, gate de rollout, stagger de hermanas y ventanas.

**La prueba no es el código, es la pieza:** **`5e9f03ef` salió sola en Facebook el 2026-08-25 a las
13:13 UTC.** La franja la calculó `planSchedule` contra la **cadencia real de la marca** (`1x_week`,
`month_1`) —no contra un reloj arbitrario— y la drenó el **cron `content-placement-poll`** (jobid 66,
`*/15`). **Nadie la tocó.** Es la primera publicación automática del ecosistema, y la diferencia entre
un sistema que **produce** y uno que **opera**.

### 🟢 Cerrado — se retira de pendientes

- **Eje de colocación** — modo `placement` de `content-scheduler` (**v5**), con `scheduled_posts.piece_id`
  y `orchestrator_jobs.status = 'awaiting_publish'`. Cierra el bloqueante del 2026-08-23.
- **Sellado de aprobación** — aprobar y publicar dejan de ser el mismo acto. `approve-piece` **v39**.
- **Ruteo por proveedor** — **3 canales Meta/LinkedIn** en `brand_publish_channels` con
  `provider_platform`. El proveedor es **dato**, no rama de código: la Regla Multimarca aplicada al canal.
- **Procedencia contaminada** — **PROC-01 en producción**: **15 hallazgos nuevos**, **cero** con ley
  numerada, **cero** con año calendario. Antes: **3 de 5 contaminados**. Es el hecho que **mueve el
  diagnóstico del ratio del material al juez**: el material ya sale limpio.
- **Reglas condicionales** — `intel.watcher_rules.condition` sembrada en **10 reglas**. La
  aplicabilidad se resuelve como dato, **antes** del juez.
- **Gate lingüístico** — `gate9Language` existe y mide. **Cierra como informativo**; su promoción a
  bloqueante queda abierta abajo, que no es lo mismo.
- **Corrector determinista** — `fix_replacement` aplicado **antes** del juicio: lo que una regla sabe
  reparar sola no llega al juez. 4 reglas con `verify_pattern`, `HR-FPHS-15` con reemplazo.
- **Backfill de embeddings** — corrido. **Cero piezas vivas sin embedding en 21 días.** El gate deja
  de degradarse a LLM.
- **Diversidad de ángulos** — **32 dominios** de ForumPHs con `angles` sembrados; los **seis ángulos**
  aprobados por Sam y su matriz ángulo-voz en `brands/ForumPHs/BP_Brand_Context.md`.

### ⚖️ El juez dejó de ser irreversible

- **Primer arbitraje humano** — `judge_calibration`, **2026-08-25 14:36:41**, `decided_by: sam`,
  desde la sesión. `judge-arbitration` **v2**.
- **Primera retención** — **2 piezas salvadas** que el día anterior se habrían destruido, **con la
  prueba de su inocencia al lado**. Estados nuevos `challenged` y `deferred`.
- **Edición con registro de diff** — `piece-edit` **v2**, `intel.piece_edits`, `edited_at`/`edited_by`.
- **La lección de sistema:** **un veredicto no es una sentencia si el sistema no guarda el desacuerdo.**
  Sin `judge_calibration` y sin estado `challenged`, el error del juez es indistinguible de la culpa
  de la pieza.

### 🔻 Abre — con su evidencia

- **Barrido de los 8 `statement` imperativos** de las **50 reglas activas.** Nace de la pregunta de
  Sam al ver la reformulación de `HR-LEGAL-01/02` a forma de test: si dos estaban redactadas como
  orden, ¿cuántas más? **Ocho.** Una regla-orden le pide al juez que **obedezca**; una regla-test le
  pide que **decida**, y sólo la segunda es evaluable.
- **Regla de correspondencia con la fuente** (FIX-01 §4.5) — **aplazada por decisión de Sam.**
  Queda anotada, no ejecutada.
- **Promoción del gate lingüístico a bloqueante.** Hoy marca **1 error en 11 de 22 piezas** —
  **tasa del 50 %**. ⚠️ **Revisar sus marcas antes de bloquear con él**: un gate que marca la mitad
  del corpus o encontró un problema masivo o está mal calibrado, y no se sabe cuál sin mirar las marcas.
- 🔴 **Deuda de claves Supabase.** **15 de 17 EF** leen `SUPABASE_SERVICE_ROLE_KEY`, marcada
  **`DEPRECATED`**. **13 sobreviven** hoy porque la usan **contra PostgREST**, donde ambas
  generaciones de clave valen. Eso no es que estén sanas: es que el fallo está **aplazado por el
  consumidor, no resuelto en el emisor**. **Las 15 caen el día que Supabase retire la clave.**
- 🔴 **Aviso obsoleto en la bandeja de publicación del Orchestrator.** La bandeja sigue mostrando
  *"Esta bandeja todavía no aprueba. No existe todavía el eje de colocación de una pieza producida en
  la franja de su canal… Hasta que exista, la bandeja no aprueba."*, y cada tarjeta repite *"La
  aprobación se habilita cuando exista el eje de colocación"*. **Es falso desde el 25-ago:** el eje
  existe (`content-scheduler` modo `placement`), el cron 66 está activo y `5e9f03ef` se publicó sola
  a las 13:13 UTC. **Va en PR propio del repo `Orchestrator`** — no en `unrlvl-context`; acá sólo se
  anota como frente abierto.
- **Imagen inconsistente** — blog **2 de 4**, LinkedIn **1 de 2**.
- **Klaviyo DKIM/SPF** de `envios.forumphs.com` (el canal email sigue `active = false`).
- **Seguridad de `unrlvl-db`.**
- **Las 5 piezas destruidas** el día anterior a la retención — **irrecuperables.** Se anota
  precisamente porque no se puede arreglar: es el costo medido de haber tenido un juez sin arbitraje.

### 🗄️ Esquema y datos que se movieron en producción

**Esquema:** `watcher_rules` +`condition`/`verify_pattern`/`fix_replacement`/`enforced_on` ·
`content_pieces` +`pass_type`/`challenged_at`/`edited_at`/`edited_by`/`deferred_until`/`deferred_reason` ·
`scheduled_posts` +`piece_id` · `brand_topics` +`angles` · **tablas nuevas** `intel.judge_calibration`
e `intel.piece_edits` · CHECK de `content_pieces.status` ampliado con `challenged` y `deferred` ·
CHECK de `orchestrator_jobs.status` con `awaiting_publish`.

**Datos:** **29 filas de `scheduled_posts` borradas** (residuo del código retirado) — **5 eran de
LucienSael y se rescataron antes del borrado**: `brands/LucienSael/corpus/2026-07-30_zugzwang_set.md`,
con advertencia de procedencia al tope (nunca pasó por el Watcher, no es ejemplar de voz calibrada) ·
finding `9eea20a3` saneado a mano · **32 dominios de ForumPHs con `angles` sembrados** · **3 canales
Meta/LinkedIn** en `brand_publish_channels` con `provider_platform`.

**Cron nuevo:** **`content-placement-poll`** — jobid **66**, `*/15`, **activo**.

### 🚀 Desplegado

`unrlvl-iid-functions`: **#80, #81, #82, #83, #84, #85, #86, #87, #88, #91, #92**
`Orchestrator`: **#21, #22**

`content-run-stage` **92** · `content-watcher` **43** · `content-scheduler` **5** · `iid-core` **54** ·
`iid-process` **47** · `approve-piece` **39** · `judge-arbitration` **2** · `piece-edit` **2**
(versión real = número final de `entrypoint_path`).

🔴 **`judge-arbitration` y `piece-edit` con `verify_jwt: true`** — primera capa de defensa. La
asimetría con el resto del carril (`--no-verify-jwt`) es **deliberada**: al resto lo llama el **cron
vía `pg_net`**, que no lleva JWT; a estas dos las invoca **una persona desde una sesión**. **No
uniformar sin entender esto.**

### 📐 Gobernanza — `HRD_PROTOCOL.md` v1.5

Dos reglas globales nuevas, ninguna derogación, las dos nacidas de errores de esta sesión:

- **HRD-R08 — verificar contra el motor donde se ejecuta, no donde es cómodo probar.**
  `verify_pattern` se evalúa en **POSIX** (auditable con `SELECT … ~*`), `fix_replacement` en
  **ECMAScript** (`$1`, **nunca** `\1`). Misma fila, dos dialectos. Documentado en el
  `COMMENT ON COLUMN` de cada columna.
- **HRD-R09 — mergear no despliega, y un merge puede quedarse corto.** Se verifica el **commit** tras
  el merge, no que el PR aparezca cerrado. Ya había ocurrido con el commit colgante de ImageLab el
  2026-08-22; volvió a ocurrir.

### 📄 Derivados — la excepción dejó de ser excepción

`ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran**: nota de sincronización en
cabecera, **cuerpo íntegro**, en **commit separado**. Desde el 2026-08-23 esto **ya no es una excepción
declarada sino la regla escrita** en `CLAUDE.md` («Los derivados NO se regeneran completos — se
sincronizan»), después de que la misma excepción se declarara en **cinco Actualizas seguidas** (13, 18,
21, 22 y 23 de agosto). El motivo no cambió: **no existe generador en el repo**, así que «regenerar» a
mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción «cero
interpretación» busca impedir, y borra historia (`CC_PROTOCOL.md` §0). **La regeneración real sigue
abierta sin fecha.**

---

## 🗓️ ACTUALIZA 2026-08-23-v1 — El registro de la voz, el conjunto de reglas del juez y cinco ejes nuevos

_(Bloque al tope. Detalle en `brands/ForumPHs/session_log.md` (2026-08-23). Sólo context files de `unrlvl-context`; el código, las DDL, los deploys y las corridas se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **20 learnings** en `public.professor_learnings`, `session_date = 2026-08-23`, todos con `approved_by_sam = true`. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🛑 BLOQUEANTE DE TODO LO DEMÁS — el eje de colocación de piezas producidas

**No existe.** No es un defecto de una EF: es un eje que el ecosistema nunca construyó, y lo tapaba
el hecho de que hasta el 22-ago no había piezas que colocar. Los cuatro hechos que lo demuestran:

- **`content-scheduler` programa ANTES de generar** — selecciona `orchestrator_status='pending'`, es
  decir, trabajo por hacer. No es el colocador de lo ya producido, aunque el nombre lo sugiera.
- **`scheduled_posts` es tabla sin endpoint y sin `piece_id`** — el carril la escribe **114 ms**
  después de crear la pieza, y **ningún cron la lee**. Escribe en un buzón que nadie abre.
- **`approve-piece` publica de inmediato** — sin programar. Aprobar y publicar son el mismo acto,
  así que no hay dónde meter una decisión de cuándo.
- **Consecuencia:** el ecosistema **produce contenido y no tiene forma de decidir cuándo sale.**
  Todo lo demás de esta agenda —drenaje, cadencia, presupuestos por marca, ads— asume que existe
  este eje.

**Opción A, recomendada: modo de colocación en `content-scheduler`.** Es el único componente que ya
sabe de **cadencia**, **gate de rollout**, **stagger de hermanas** y **ventanas** — reconstruir eso
en un componente nuevo es duplicar el eje, no crearlo. **Toca una EF → verificación explícita previa**
(la vía de despliegue de EFs es un cuello de botella declarado abajo).

### 🟢 Cerrado — se retira de pendientes

- **Registro de lenguaje — el voseo se fue de los `angle`.** Los **12 `angle`** de los frentes
  `influye` y `decide` de ForumPHs estaban en **tuteo**, contra `HR-FPHS-07`, que exige **usted**.
  Reescritos a usted **conservando ángulo, cifras y stake** — el `angle` es el eje estructural
  anti-duplicación; tocarlo de fondo habría cambiado de qué habla la marca, no cómo lo dice.
  Verificado sobre los **32 dominios**: **0 pronombres de tuteo, 0 desinencias de voseo.** La corrida
  siguiente del mismo dominio dio **0 marcas de tuteo, 10 de usted y PASS**; las dos piezas
  anteriores tenían **16 y 7 marcas de voseo y cero de usted**. **La regla de fondo:** `HR-FPHS-07`
  rige **la instrucción al escritor**, no sólo el texto entregado — una regla que sólo se aplica al
  juicio llega tarde.
- **Conjunto de reglas del Watcher — PR #79 (WATCHER-01).** Mergeado y **desplegado por CLI**:
  `content-watcher` **v36 → v37**, `2026-08-23 16:14:08 UTC`, con `--no-verify-jwt`. Aporta
  **`sortRulesByCode`** (orden determinista: sin orden estable, dos juicios sobre el mismo texto no
  son comparables) y **`evaluated_codes`** (qué reglas **vio** el juez, consultable).
- **`instruction` sembrada en 6 reglas activas** — `HR-FPHS-09`, `HR-FPHS-12`, `HR-FPHS-14`,
  `HR-GEN-04`, `HR-GEN-06`, `HR-GEN-07`. Antes el juez **rechazaba por directivas que el escritor
  nunca recibió**. `HR-RETAIL-01` se dejó **sin `instruction` a propósito**: es sector retail, no
  aplica a ForumPHs, y sembrarle instrucción sería fabricar aplicabilidad donde no la hay.
- **Blog en `forumphs.com/blog`.** PR #1 (BLOG-01) y BLOG-UI-01 mergeados. HTML servido por **función
  serverless**, **SEO-first**, **dos artículos publicados**. Cierra el ítem «blog data-driven en
  `forumphs-com`» de la Fase 1 del 22-ago y desbloquea `HR-FPHS-08` (`blog_enlace_interno`), que
  exigía enlazar artículos publicados cuando no había artículos que enlazar.
- **Menú móvil** (PR #3) y **encabezado del blog sin desborde** (PR #4) en `forumphs-com`.
- **Bandeja de calibración** (PR #20) y **bandeja de publicación en solo lectura** (PR #21) en el
  Orchestrator. Cubre parte del ítem «UI de calibración / Orchestrator» de la Fase 3.

### 🆕 Ejes nuevos en producción

| Objeto | Qué es |
|---|---|
| `intel.brand_publish_channels` | **Canal por el que una marca entrega sus piezas.** Proveedor y config **como dato**: el eje es «una marca publica por algún canal»; cuál canal es instancia |
| `content.content_pieces.slug` | **URL estable.** Backfill **idéntico** a `pieceSlug()`. **Cambiarlo rompe URLs indexadas** |
| `intel.brand_topics.theme_key` / `public_label` | **Agrupación pública por encima del dominio.** 32 dominios en **5 temas** |
| `content.content_pieces.discarded_at` / `discarded_reason` | **Tercera salida de la bandeja.** Descartar **NO** entra al corpus |
| `intel.pipeline_cutoffs` | **Cortes del flujo, con alcance.** `scope NULL` = ecosistema; texto = `brand_id` |

### ❌ Correcciones a afirmaciones erróneas de Claude.ai

Seis afirmaciones que llegaron a CC **con forma de causa raíz** y no lo eran. Se registran porque una
causa deducida manda a arreglar algo que puede no estar roto, y **ocurrió dos veces el 2026-08-23**.

| Se afirmó | Es falso porque |
|---|---|
| El conjunto de reglas del Watcher estaba **roto** | **Nunca lo estuvo.** `violated` lista sólo las **incumplidas**, no las **evaluadas**. El piso real era **18**, no 22 |
| El **18,5 %** se midió contra una **barra más laxa** | La barra era **correcta** |
| El fail-loud debía comparar contra el **conteo de tabla** | Habría **abortado el 100 % de las corridas sanas** |
| El `scope` de un corte puede ser `'ecosistema'` | Se compara contra **`brand_id`**; la palabra literal **no aplica a ninguna pieza, en silencio** |
| La bandeja **muestra rechazadas** y son el corpus más útil | **Una pieza sólo existe si el Watcher dio PASS.** Los rechazos nunca llegan a ser pieza |
| `content-scheduler` puede **recibir una pieza aprobada** | Programa **antes** de generar: selecciona `orchestrator_status='pending'` |

### 🔴 Defectos localizados, sin arreglar

- **`resolveVoiceDestination` (`content-run-stage:1038`) evalúa `format` antes que `platform`.**
  `job.format` llega como `"post"`, así que `destination` resuelve **siempre** a `'social'` — incluso
  en blog, email y LinkedIn. **Hoy no contamina** porque **cero reglas activas usan `destination_in`**;
  el día que una lo use, contamina en silencio.
- **`approve-piece` escribe `status:'approved'`, que el CHECK de `content_pieces` rechaza.** Falla
  **en silencio**.
- **29 filas inertes en `scheduled_posts`** — sin `piece_id` y sin consumidor.
- **Calibrar rechazos es imposible:** la pieza sólo existe si el Watcher dio PASS.
- **401 en `iid_findings` / `iid_agents` desde el navegador.** **Decisión tomada: endpoint
  server-side, NO `GRANT` a `anon`** — es inteligencia de marca, y abrirla al rol anónimo la publica.
- **Sin contador de reprocesos por fila de cola** ni sello de **quién resetea**.

### 📏 Medición pendiente

- **Varianza del juez** — 10 juicios sobre el mismo texto con el Watcher **v37**. Sin esto no se sabe
  qué parte del rechazo es pieza mala y qué parte es juez inestable.
- **Replay del corpus congelado** y **ratio real**.
- **CORRECCIÓN DE CIFRA — el ratio de PASS es 18,5 %, no 25,9 %.** Esta AGENDA venía declarando
  **25,9 %** desde el 2026-08-21. **El valor medido es 18,5 %.** Las menciones anteriores se
  **conservan** como registro de lo que se afirmó entonces (`CC_PROTOCOL.md` §0: la historia no se
  borra) y quedan **anotadas en línea** con un puntero a este bloque.

### 📧 Klaviyo — canal declarado y NO operativo

Cuenta creada. **`KLAVIYO_API_KEY` en Supabase Secrets** (no en el repo). Lista **`VWwDjP`** sembrada
en `intel.brand_publish_channels` con **`active = false`**.

**Pendiente:** autenticación **DKIM/SPF** de `envios.forumphs.com` con **routing Dynamic**, **CNAMEs
en DNS**, y **brief EMAIL-01**.

> **El canal se activa cuando la autenticación complete. No antes.** Un canal de email activo sin
> DKIM/SPF no falla ruidosamente: entrega a spam, que es peor que no entregar.

### 📝 Contenido

- **Drenar los 3 `iid_research_raw` pendientes** — corridas para **`administracion`**, **`patrimonio`**
  y **`derechos-y-regimen`**. ⚠️ `iid-process` **encadena el fan-out** vía `callIIDCore`: **crea filas
  de cola, así que gasta juicios.** No es una corrida barata.
- **Regla *un dominio, un artículo de blog*** — canibalización SEO.
- **ImageLab:** `Gemini 429` y `OVERLAY_TEXT_MISSING`.

### 🏛️ Gobernanza

- **Allowlist de egreso de CC:** `unrlvl-context.vercel.app` · `*.vercel.app` · `*.supabase.co` ·
  `api.github.com` · `raw.githubusercontent.com`.
- **`CC_PROTOCOL` debe apuntar al repo primero y a Vercel como respaldo** — **cerrado en este
  Actualiza** (`CC_PROTOCOL.md` **§0 bis**). El proxy de egreso de CC devuelve **403 en CONNECT**
  contra el dominio de Vercel, y CC quedó **sin fuente independiente de gobernanza en dos sesiones**.
  **Queda abierto el mismo puntero en `CLAUDE.md` (raíz) y `.github/CLAUDE.md`**, que siguen citando
  primero la URL de Vercel: se declaran acá y no se tocaron en esta pasada (`CC_PROTOCOL.md` §5 —
  CC ejecuta sólo la tarea encargada).
- **Regla nueva `CC_PROTOCOL.md` §9 — causa raíz declarada.** Todo brief que afirme una causa raíz
  debe declarar **archivo y línea, o consulta y resultado**. Un brief que afirma una causa **deducida**
  manda a CC a arreglar algo que puede no estar roto — ocurrió **dos veces** el 2026-08-23.
- **PROV-01 — sello de procedencia en la pieza:** versión de EF, conjunto de reglas, versión del
  `angle`. Sin eso, un veredicto no se puede reproducir seis semanas después.
- **Vía confiable de despliegue de Edge Functions** — **cuello de botella estructural** con **9 EFs**
  en el carril. Es lo que convierte «tocar una EF» en un ítem de riesgo.

### 💾 Deuda anterior — seguridad de `unrlvl-db`

**4 tablas sin RLS · 12 vistas `SECURITY DEFINER` · 8 funciones ejecutables por `anon` vía
`/rest/v1/rpc/`.** Vive desde antes de esta sesión y sigue abierta.

### ⚠️ Excepción declarada al HRD_ACTUALIZA — regeneración de derivados (quinta aplicación)

El brief pide regenerar `ecosystem.md` y `ecosystem_filemap.md` **completos** al tocar `ecosystem.json`.
**No se hizo, y se declara** — el motivo es el mismo de las cuatro veces anteriores (2026-08-13,
2026-08-18, 2026-08-21, 2026-08-22) y no ha cambiado: **no existe generador en el repo**, así que
«regenerar» a mano no es regenerar, es reescribir con interpretación —justo lo que la instrucción
*«cero interpretación»* busca impedir— y **borra historia**, que es la regla suprema del
`CC_PROTOCOL.md` §0. Ambos archivos llevan cuerpo acumulado que **no es derivable** del JSON.

Se aplica el precedente: **nota de sincronización en la cabecera** declarando exactamente qué cambió
en `ecosystem.json` v2026-08-23-v1, **cuerpo íntegro**, en **commit separado**.

_Más todo lo abierto de los briefs anteriores (v2026-08-22-v1 y previos), conservado íntegro debajo._

## 🗓️ ACTUALIZA 2026-08-22-v1 — El primer publish de la historia del sistema · el roadmap de Sam en cuatro fases

_(Bloque al tope. Detalle en `IID/session_log.md` y `brands/ForumPHs/session_log.md` (2026-08-22). Sólo context files de `unrlvl-context`; el código, las DDL, la corrida y la publicación se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **11 learnings**, ids en DB, `approved_by_sam: true`. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

**El hecho de la sesión** — **ForumPHs está al aire.** FB `1184045168120977_122131069905355949` a las **12:44:41 UTC**, IG `17943396402322068` a las **12:45:06 UTC**. No es la primera pieza de ForumPHs: es **la primera del ecosistema entero**. Todo lo que el IID produjo desde que existe murió en la DB; hoy dos piezas recorrieron el carril completo —research → escritura → juicio del Watcher → aprobación de Sam → composición visual → publicación— y salieron a un canal público. **Y salieron el día que el proveedor de texto se cayó a dos horas del estreno.**

### 🟢 Cerrado — se retira de pendientes

- **Brief 8 — el título es parte gobernada de la pieza.** Tres PRs sobre tres repos, porque había que tocar los tres eslabones a la vez: **`CopyLab` #35** (el título se escribe: **obligatorio, con oficio y con presupuesto** de caracteres) · **`unrlvl-iid-functions` #78** (**el juez ve el título** — antes juzgaba el cuerpo y el título pasaba sin que nada lo mirara, la misma clase de defecto que G1) · **`ImageLab` #12** (**franja de identidad `edge_left`**, `full_bleed`, **por el lado corto**, en el `primary` de la marca). El título que se estampa en la imagen y el título que el juez aprueba son **el mismo dato**, o el sistema publica dos mensajes sobre la misma pieza: uno auditado y otro no.
- **ImageLab — la mitad de render del fix inmediato.** Era la **máxima prioridad** abierta el 21-ago. El texto corrupto de Gemini se resuelve **quitándole el texto al modelo**: Brief 7 genera **imagen sin texto** y el **compositor determinístico** de cómputo propio estampa titular y franja. **La otra mitad sigue abierta** — el Watcher **no juzga imágenes**, así que una violación de `HR-LEGAL-01` dentro de la imagen sigue sin que nada la vea. Ver abierto, Fase 3.
- **Vocabulario de canal en `imagelab_presets`.** Dos vocabularios convivían: filas viejas con `LANDING`/`META`/`TIKTOK`/`WEB`, y lo que **ImageLab realmente consulta** (verificado en logs `[sb]`): `FACEBOOK_FEED`/`INSTAGRAM_FEED`/`INSTAGRAM_STORY`/`BLOG_FEATURED`/`LINKEDIN_FEED`/`EMAIL_HEADER`. Un preset sembrado con el vocabulario viejo **el código nunca lo lee** y cae al builder genérico **sin avisar**: el síntoma no es un error, es una imagen que no se parece a la marca. Sembradas las 6 filas `FEED` de ForumPHs; las viejas se conservan.
- **`meta_accounts` y los 6 agentes de ForumPHs, rindiendo.** Los agentes Vía A pasaron de sembrados a **corriendo en `cron.job` 52–63** (research + process por agente; weekly los dos `tier1`, biweekly los cuatro `tier2`): **21 corridas/mes**. Tres ya tienen `last_run_at` del 22-ago.
- **Mecánica de publicación Meta, validada end-to-end.** `fb_publish_photo` toma **`url`**, no `photo_url`; en IG el camino es `ig_create_container` → `ig_publish_container`; los ids quedan estampados en `assets.publication` de la pieza.
- **Nota terminológica de ForumPHs** — «fondo de reserva» **confirmado** como término correcto de uso frente a «Fondo para Imprevistos» (Ley 284). Cierra la observación que arrastraban las piezas 1 y 4.

### 🧭 Doctrina nueva — las 3 reglas de calibración de Sam

Salen de **9 filas nuevas de `intel.approval_calibration`** (21-ago 23:54 → 22-ago 09:40 UTC, todas `evaluated_by: sam`: 3 `approved`, 6 `rejected`), sobre piezas reales:

1. **El título cierra la idea SOLO** — sin exigir la imagen ni el caption para entenderse. *«Es la prueba…»* sin decir de qué = rechazo.
2. **El texto CONDUCE** — `stake` (qué está en juego para el lector) → instrumento → movida concreta. **Si el lector puede cerrar con «sí, ¿y qué?», la pieza no está terminada.**
3. **Voz FPHs: «la cuota extraordinaria» SIEMPRE completa**, jamás «la extraordinaria». **Tercera vez** que Sam la reitera.

Y una cuarta, de encaje: **los caracteres no se ahorran.** Los presupuestos de longitud existen por **encaje de plataforma**, jamás por economía. La métrica que importa es **el pliegue** — FB ~3 líneas antes de *Ver más*, IG ~125 caracteres antes de *más*: **la primera línea carga sola o la pieza no abre.**

### 📌 Doctrina de método — dos horas de forense, dos reglas

- **Un PR mergeado captura la rama AL MOMENTO DEL MERGE.** Los commits posteriores a esa misma rama van a *preview* y **jamás a `main`**, aunque el PR siga figurando como mergeado. Le pasó al corte D del Brief 8 (reparado en `ImageLab` #13). **La verdad del deploy es el sha del deployment de PRODUCCIÓN en Vercel**, no el estado del PR en GitHub.
- **Un 400 súbito y sistemático con código sin cambios puede ser saldo, no bug.** Revisar el crédito **antes** de cazar código: el incidente de hoy no era `CopyLab` #35 —que queda **exonerado**— sino el **crédito de Anthropic agotado**. Y `callClaude` **debe loguear el body del error antes de tirar**: Anthropic nombra la causa ahí, y la ceguera costó una hora.

### 🗺️ EL ROADMAP DE SAM POST-RECARGA — la columna vertebral de esta agenda

Cuatro fases, **en este orden**. Lo que no está en una fase arrastra abajo, sin fecha.

#### FASE 1 — Terminar ForumPHs

1. **Sprint de override hasta >90 % de PASS.** El 25,9 % del 21-ago [corregido 2026-08-23: el valor medido es **18,5 %** — ver ACTUALIZA 2026-08-23-v1, «Medición pendiente». El texto original se conserva como registro] no es el techo del sistema. Un juez sin apelación es un juez que se equivoca en firme. Al cerrar: **learning obligatorio al Professor — «how to >90 % passed»**.
2. **Drenaje de la ola 2.** Las **21 corridas/mes** ya están en cron y van a producir material más rápido de lo que hoy se revisa. Sin drenaje, la cola se vuelve el cuello de botella que el 90 % de PASS iba a destrabar.
3. **Blog data-driven en `forumphs-com` — DECIDIDO.** Deja de ser «mecanismo por definir»: **el blog se construye**. Hoy el repo es un `index.html` estático de una sola página, sin ruta `/blog`, sin CMS y sin fetch a base de datos — **no hay punto natural de inserción, hay que crearlo**. Desbloquea `HR-FPHS-08` (`blog_enlace_interno`), que exige enlazar artículos publicados cuando **no hay artículos que enlazar**.
4. **Klaviyo para `email_propietarios`.** Hay piezas aprobadas esperando canal desde el 21-ago.
5. **Gate experto de Ivette** — revisión humana **pre-publish** en piezas con afirmaciones legales. Lo pide el caso del dominio `la-asamblea-que-no-entiendo`: una pieza llegó a estar **aprobada** y hubo que **revertir la aprobación** tras el fact-check (Ley 284/2022 — **un voto por unidad**, no voto ponderado por cuota). Ni el Watcher ni la doctrina detectan **claims normativos plausibles pero falsos para la jurisdicción**.

#### FASE 2 — NSCF, UNRLVL y Lucien al aire

6. **Primeras publicaciones de las tres marcas bajo el carril nuevo.** ForumPHs demostró el camino end-to-end; ahora se recorre con las otras tres. Las tres ya tienen cuentas Meta conectadas.
7. **Presupuestos de publicación por marca.** **Corregir o definir cadencia y presupuesto por canal para cada una.** Hoy no existen y sin ellos no hay forma de decidir cuánto produce cada marca ni qué cuesta tenerla al aire — el ledger ya sabe medir, lo que falta es **contra qué**.

#### FASE 3 — Carril end-to-end

8. **`publisher-cron` de `public.scheduled_posts`.** Hoy la publicación es **manual-asistida** (`published_by: claude-mcp-manual`): las filas `pending_publish` esperan a que alguien las levante. Es la diferencia entre **poder publicar** y **estar publicando**.
9. **Digest EF — matar los 522 correos.** Email **sólo de piezas PASS** + **un resumen por corrida**, no un correo por pieza. El override se registra en `intel.approval_calibration`. **Fecha visible** en el correo.
10. **UI de calibración / Orchestrator.** Fecha de llegada en las tarjetas · orden por **más reciente** · filtro de corridas superadas.
11. **El título al genoma.** Las **3 reglas de Sam** viven hoy sólo en `approval_calibration` y en Professor. Van al **prompt de título del carril** y a **`intel.watcher_rules`**. Mientras dependan de la memoria del escritor, van a volver a fallar — la de voz ya falló tres veces.
12. **Los fixes del incidente.** (a) **`callClaude` loguea el body del error** antes de tirar. (b) **`compose-step` después de `regenerate`** — hoy una pieza regenerada no vuelve a componerse. (c) **Protocolo del commit colgante:** verificar el **sha del deployment de producción** post-merge, como paso obligatorio de entrega.
13. **Juicio visual — el punto ciego que queda de ImageLab.** El Watcher juzga el texto de la pieza, **no la imagen**. Es el único punto del carril donde una pieza puede publicarse con una violación legal **que ningún gate puede ver**.
14. **Check determinístico de integridad ortográfica pre-juicio** (regex es-sin-tildes). El defecto de diacríticos es **intermitente** y el Watcher no lo ve. Un defecto mecánico **no se juzga, se detecta** — no es una regla LLM.

#### FASE 4 — Ads

15. **Ads según plan.** El MCP `UNRLVL_Meta` ya tiene **las 13 herramientas de ads listas** (campaigns, adsets, ads, creatives, audiences, pixels, insights, delivery estimate). La capacidad está; falta el plan de inversión por marca — que depende de los **presupuestos de publicación** de la Fase 2.

### 🟡 Arrastran — abiertos sin fase asignada

- **VideoLab** — activación.
- **SocialLab** — activación completa **+ revisión del reparto Scheduler↔SocialLab.** Reparto propuesto: el Scheduler programa la cadencia, SocialLab controla la adaptación. **Confirmar contra necesidades reales antes de cablear** — no darlo por bueno porque suene limpio.
- **SignalLab.**
- **Asiento de `web_search` server-side** — **deuda declarada por CC**. Anthropic las cobra aparte (**$0,01 por búsqueda**) y las reporta en `usage.server_tool_use`, que el carril ignora. Con 6 semillas por corrida no es ruido.
- **Descripción del kind `finding_process`** — dice *«Asienta por hallazgo»*; la unidad acordada es **por invocación**. Una línea en `public.ops_output_kinds`.
- **EF de cierre de sesión** — recordatorio automático de Professor + Actualiza.
- **`runSocialLabDirect`** — último lab del carril que construye el motor de un lab existente en vez de llamarlo por su endpoint. Regla LABS.
- **Corregir el `CLAUDE.md` de ImageLab** — su §2 de gobernanza todavía dice *«`unrlvl-context` → nunca push directo, nunca por CC (solo Sam vía GitHub Desktop)»*, **regla derogada el 2026-07-31**. Es gobernanza vieja que **ya confundió a CC** en sesión. Corregido en el paquete de este Actualiza (PR propio en `ImageLab`).
- **Corregir §04/§05 del doc canónico de Lucien** — **ruling de Sam:** la firma en posts y ads es **`— Lucien Sael · Builder, Thinker, Operator`**; *«I build worlds. Some of them survive.»* es **slogan**, no firma. El documento decía que la frase reemplaza todo título y contradecía al sistema. Corregido en el paquete de este Actualiza.
- **Regeneración real de `ecosystem.md` y `ecosystem_filemap.md`** — sin generador en el repo, sigue abierta sin fecha. Ver la excepción abajo.
- **Taxonomía de `objective_stimulus` como dato en tabla** · **migración del RPC `intel.match_content_embeddings`** · **`search_config` no leído** (`evidence_required`, `hard_rule`, `dev_depth`) · **`MODEL` hardcodeado en `iid-research`/`iid-process`** · **`stop_reason: "refusal"`** · **políticas de escritura como dato en tabla**. Todos vivos desde el 18-ago.

### ⚠️ Excepción declarada al HRD_ACTUALIZA — regeneración de derivados (cuarta aplicación)

El brief pide regenerar `ecosystem.md` y `ecosystem_filemap.md` **completos** al tocar `ecosystem.json`. **No se hizo, y se declara** — el motivo es el mismo de las tres veces anteriores y no ha cambiado: **no existe generador en el repo**, así que «regenerar» a mano no es regenerar, es reescribir con interpretación —justo lo que la instrucción *«cero interpretación»* busca impedir— y **borra historia**, que es la regla suprema del `CC_PROTOCOL.md` §0. Ambos archivos llevan cuerpo acumulado que **no es derivable** del JSON.

Se aplica el precedente del 2026-08-13, ya usado el 18-ago y el 21-ago: **nota de sincronización en la cabecera** declarando exactamente qué cambió en `ecosystem.json` v2026-08-22-v1, **cuerpo íntegro**, en **commit separado**.

_Más todo lo abierto de los briefs anteriores (v2026-08-21-v1 y previos), conservado íntegro debajo._

## 🗓️ ACTUALIZA 2026-08-21-v1 — Reparación integral del carril AIID · de 0 % a 25,9 % de PASS

_(Bloque al tope. Detalle en `IID/session_log.md` y `brands/ForumPHs/session_log.md` (2026-08-20/21). Sólo context files de `unrlvl-context`; el código, las DDL y la corrida se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **12 learnings**, ids en DB. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

**El hecho de la sesión** — el carril pasó de **0 % de PASS sostenido** a **25,9 % por pieza** en ForumPHs (7 de 27, midiendo el **último** veredicto de cada pieza sobre `gate_detail`) [corregido 2026-08-23: el valor medido es **18,5 %** — ver ACTUALIZA 2026-08-23-v1, «Medición pendiente». El texto original se conserva como registro]. Tres días de reparación, no de construcción: el carril ya corría end-to-end desde el 18-ago; lo que no funcionaba era el **juicio**, y la causa no era una sino seis, cada una tapando a la siguiente.

### 🟢 Cerrado — se retira de pendientes

- **G1-B — `audience_frame` y `platform_key` al `ctx` del juez.** Estaba abierto explícitamente desde el 18-ago. El Watcher recibía el texto y **no** el contexto de publicación: juzgaba contra un destino imaginario. Verificado en `gate_detail`, los tres gates que lo necesitan ya lo asientan.
- **G1-C — el techo de tokens por destino se aplica.** Existía en `execute.ts` desde v9.7 y no se aplicaba en el carril.
- **G1-D — presupuesto de longitud al escritor.** Deja de descubrirlo por truncado. **Ratio 3:1 medido** entre lo que producía y lo que el destino admite.
- **G2-A — `objective_stimulus` (gate7) pasa a informativo conservando el veredicto.** Rechazaba al **79 %** inventando su taxonomía (REACH / RETENTION / RESOLVE, **ninguna existe en el sistema**); estaba abierto sin fecha desde el 18-ago. No se apaga: `blocking: false` + `would_reject` en `gate_detail`. **Un gate apagado deja de medir; uno informativo con `would_reject` sigue midiendo mientras deja pasar** — y volver a bloquear el día que su taxonomía viva en tabla es un flip, no una reconstrucción.
- **G2-E — `intel.watcher_rules.applies_when`.** La aplicabilidad de una regla es **dato**, y se filtra **determinísticamente antes** del juez. Antes se le mandaba toda regla activa al LLM y era el LLM quien decidía si aplicaba. 4 reglas sembradas (`HR-FPHS-08`, `HR-GEN-08`, `HR-FPHS-11`, `HR-GEN-02`). Es la Regla Multimarca aplicada al juicio: el eje —"una regla puede no aplicar"— en el código, la instancia —"esta no aplica en Meta"— en el dato.
- **G2-F — bucle de reparación acotado a 1 reintento dirigido**, con asiento propio `repair` en el ledger (19 filas, $0,7146 el 21-ago). **Acotado es la palabra:** sin techo, un bucle de reparación es un bucle de gasto.
- **Brief 6 — el carril completo asienta costo.** Kinds nuevos `research` · `finding_process` · `embedding`, y `ops_log_generation` extendido a **27 argumentos** con `p_billable` (la facturabilidad se declara, deja de inferirse del `output_type`). **Costo desconocido = `NULL`, nunca 0** — un cero falso se suma en silencio a todos los promedios y no vuelve a detectarse; un `NULL` aparece en cualquier conteo que lo busque.
- **`CHECK` multimarca de `iid_agents` corregido al eje.** `iid_agents_default_voice_check` **enumeraba las voces del ecosistema**: alta de marca nueva = `ALTER TABLE`. Ahora sólo exige que la voz exista y no esté vacía. Sin esto, los 6 agentes de ForumPHs no se podían dar de alta.
- **Canal Meta de ForumPHs — `meta_accounts` sembrada** (21-ago 20:28 UTC). Era el **bloqueante de canal del 22-ago**, abierto desde el 2026-08-16. `ad_account_id` queda `NULL` a propósito: la marca no hace ads todavía.

### 🧭 Doctrina nueva — el escenario declarado no es un dato fabricado

`HR-GEN-02` y `HR-FPHS-11` persiguen la cifra que **se hace pasar por real**. Un contenido educativo necesita ilustrar (*"imaginemos un PH de 80 unidades con una cuota de $95"*), y sin excepción **enseñar era indistinguible de mentir**. La doctrina: una hipótesis **marcada como tal** no engaña a nadie, y la marca que la distingue (`imaginemos`, `supongamos`, `caso típico`, `escenario`) **vive en el dato** (`exempt_if_piece_matches`), no en el código — cada marca la calibra en su idioma y su registro.

### 💵 Política de costos — precio de lista

El costo se asienta al **precio público del proveedor**: sin descuentos, créditos ni tarifas negociadas. El ledger sirve para **decidir** (cuánto cuesta una pieza, qué lab conviene, qué margen deja una marca) y una tarifa negociada contamina esa decisión con una condición que puede vencer. El descuento es un hecho de tesorería, no de arquitectura.

### 🔴 Abierto — altas de esta sesión, en orden de prioridad

**(a) ImageLab — FIX INMEDIATO. Máxima prioridad de la agenda.** Dos defectos que van juntos:
   1. **Render de texto corrupto de Gemini en imágenes de producción** — el texto sale ilegible en piezas que ya salen del carril.
   2. **Violación de `HR-LEGAL-01` DENTRO de la imagen** ("LEY 284") — y **el Watcher no juzga imágenes**: juzga el texto de la pieza, así que la violación pasa sin que nada la vea.

   **Por eso el fix de render y el juicio visual son un solo ítem, no dos.** Arreglar el render sin cerrar el punto ciego deja la próxima violación igual de invisible; cerrar el juicio visual sin arreglar el render sólo llena el log de rechazos. Es hoy el único punto del carril donde una pieza puede publicarse con una violación legal **que ningún gate puede ver**.

**(b) Sprint de Override hasta >90 % PASS.** Un juez sin apelación es un juez que se equivoca en firme. Al cerrar, **learning obligatorio al Professor: "how to >90% passed"**.

**(c) Digest EF — matar los 522 correos.** Email **sólo de piezas PASS** + **un resumen por corrida** (no un correo por pieza). El override se registra en `intel.approval_calibration`. **Fecha visible** en el correo. Hoy el volumen hace que el canal no se lea, que es lo mismo que no notificar.

**(d) UI Orchestrator / calibración.** Fecha de llegada en las tarjetas · orden por **más reciente** · filtro de corridas superadas. Mismo problema que (c) en otra superficie: lo que no se puede ordenar por fecha no se puede revisar.

**(e) Blog de forumphs.com — mecanismo por definir. Inspección hecha en esta pasada (encargo del brief, sólo lectura):** el repo `unrealvillestudio-hub/forumphs-com` es **un `index.html` estático de una sola página** (74 KB, sin framework, sin build, sin `package.json`), más `api/contact.js` (función serverless, Resend) y una imagen. **No existe ruta `/blog`**, no hay CMS, no hay fetch a base de datos, y la palabra "blog" no aparece en el archivo. Las 7 anclas de navegación son `#servicios`, `#inteligencia`, `#dashboard`, `#about`, `#testimonios`, `#faq`, `#contacto`. **No hay punto natural de inserción: hay que crearlo.** Esto explica y bloquea a `HR-FPHS-08` (`blog_enlace_interno`), que exige enlace interno a artículo publicado cuando **no hay artículos que enlazar**. Decisión de arquitectura pendiente de Sam — ver el detalle en el PR de este Actualiza.

**(f) VideoLab — activación.**

**(g) SocialLab — activación completa + revisión del reparto Scheduler↔SocialLab.** Reparto propuesto: **el Scheduler programa la cadencia, SocialLab controla la adaptación**. **Confirmar contra necesidades reales antes de cablear** — no darlo por bueno porque suene limpio.

**(h) SignalLab.**

**(i) Asiento de `web_search` server-side — DEUDA DECLARADA POR CC.** Las búsquedas server-side de `iid-research` **no se asientan**: Anthropic las cobra aparte (**$0,01 por búsqueda**) y las reporta en `usage.server_tool_use`, que el carril hoy ignora. Con 6 semillas por corrida y varias búsquedas por semilla no es ruido. CC lo **declara**, no lo repara: no estaba en el encargo.

**(j) Corregir la `description` del kind `finding_process`.** Dice *"Asienta por hallazgo"*; la unidad acordada es **por invocación**. Una línea en `public.ops_output_kinds`.

**(k) EF de cierre de sesión** — recordatorio automático de Professor + Actualiza. La sesión que no se cierra no deja learning, y el learning que no se captura no existe.

**(l) `runSocialLabDirect` — adaptado no juzgado.** _Sigue vivo de la agenda previa (v2026-08-18-v1)._ Último lab del carril que construye el motor de un lab existente en vez de llamarlo por su endpoint; de cuatro labs invocados, **tres llaman al lab**. Regla LABS.

### 🔵 Estado del camino al 90 %

El 25,9 % [corregido 2026-08-23: el valor medido es **18,5 %** — ver ACTUALIZA 2026-08-23-v1, «Medición pendiente». El texto original se conserva como registro] **no es el techo del sistema**: es lo que rinde sin las tres piezas que faltan. En orden de rendimiento esperado: **(1) material de research** —`evidence` rechazó 62 veces por piezas sin con qué sustentarse; los briefs de los 6 agentes nuevos ya piden **2+ casos con fuente** y todavía no rindieron— · **(2) override**, el ítem (b) · **(3) varianza del juez**, sin medir: hasta medirla no se sabe qué parte del 74 % restante es pieza mala y qué parte es juez inestable.

### ⚠️ Excepción declarada al HRD_ACTUALIZA — regeneración de derivados (tercera aplicación)

El brief de esta sesión pide regenerar `ecosystem.md` y `ecosystem_filemap.md` **completos** al tocar `ecosystem.json`. **No se hizo, y se declara.** El motivo es el mismo de las dos veces anteriores y no ha cambiado: **no existe generador en el repo**, así que "regenerar" a mano no es regenerar — es reescribir con interpretación, justo lo que la instrucción *"cero interpretación"* del propio brief busca impedir, y **borra historia**, que es la regla suprema del `CC_PROTOCOL.md` §0. Ambos archivos llevan además cuerpo acumulado que **no es derivable** del JSON (flujos, tablas de estado, notas fechadas): una regeneración literal desde `ecosystem.json` los vaciaría.

Se aplica el precedente del 2026-08-13, ya usado el 2026-08-18: **nota de sincronización en la cabecera** declarando exactamente qué cambió en `ecosystem.json` v2026-08-21-v1, **cuerpo íntegro**, en **commit separado**. La regeneración real —con generador de verdad— sigue abierta **sin fecha**, arriba y desde el 18-ago.

_Más todo lo abierto de los briefs anteriores (v2026-08-18-v1 y previos), conservado íntegro debajo._

## 🗓️ ACTUALIZA 2026-08-18-v1 — Carril async del AIID cerrado end-to-end · CopyLab es el generador

_(Bloque al tope. Detalle en `IID/session_log.md` y `brands/ForumPHs/session_log.md` (2026-08-18). Sólo context files de `unrlvl-context`; el código y las DDL ya se ejecutaron en sus propios PRs y bajo HRD. Professor cerrado **antes** de este Actualiza: 9 learnings en `public.professor_learnings`, `session_date` 2026-08-18, `approved_by_sam: true`. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

**El hecho de la sesión** — `builder_meta.generator: "copylab"` en producción, diez capas aplicadas, `cache_mode: v2.0_per_slice`, `output_template_id: SMPC_full`, ledger con `api_key_ref: EXTERNAL:copylab`. **El generador local está retirado del ecosistema:** el `grep -ri` de su identificador da **cero** sobre los tres repos.

### 🟢 Cerrado — se retira de pendientes
- **Fase B de CopyLab** — los 6 ítems de cableado, completos y **verificados en producción**. Era P1 bloqueante desde el 2026-08-14.
- **Retiro del generador local** (`generadorLocal`) — A3, en su propio PR y después de la corrida verificada, que era exactamente la condición de retiro.
- **Procedencia en las tres capas** — recolección de `source_urls` en `iid-research`, `FUENTES DEL HALLAZGO` en los gates 4 y 6, y fail-loud `RESEARCH_NO_SOURCES`.
- **Violación multimarca de `CARRIL_EDITORIAL_CANAL`** — el canal se resuelve por `platform_canal_map`, que es la tabla puente que ya existía. Era P2 desde el 2026-08-14.
- **Hardcode de marca en `iid-research` / `iid-process`.**
- **Parser de `iid-process`.**
- **Falso positivo del parser del juez.**

> ⚠️ **`evidence_required` NO se cierra.** Sigue sin leerse, aunque el resto de su frente cerró. Queda abierto abajo, con `search_config`.

### 🔴 Abierto — bloqueante del 22-ago
- **`AUDIENCE_CTA` en CopyLab con claves legacy.** `audience_frame` migró **en la columna** a `decide`/`influye`; `AUDIENCE_CTA` quedó en `jd`/`doliente` y **resuelve a cadena vacía** → **18 topics activos de ForumPHs con el escritor sin instrucción de CTA**. Nada falla y nada avisa. **Prohibido reponer alias** — mapear `influye → doliente` pediría el CTA que el juez, ya migrado, rechaza (ver `protocols/MULTIBRAND_RULE.md` §13). **Handoff propio.**
- **`audience_frame` al `ctx` del juez** — mismo camino que G1-B.

### 🔴 Abierto — sin fecha
- **Taxonomía de `objective_stimulus` como dato en tabla**, resuelta por marca y plataforma. Hoy el gate **rechaza al 79 %** inventando su propia taxonomía (REACH, RETENTION, RESOLVE — **ninguna de las tres existe en el sistema**).
- **Migración del RPC `intel.match_content_embeddings` — NO aplicada.** `duplication` compara texto por LLM mientras se pagan embeddings a Vertex que **nadie consulta** (47 filas).
- **Medir siempre sobre `gate_detail`, nunca sobre `failed_gate`.** Las cifras de esta sesión ya están medidas así; la que quedaba mal medida era la lectura, no el dato.
- **`sociallab` con `runSocialLabDirect`** — último lab del carril que construye el motor de un lab existente en vez de llamarlo por su endpoint. Regla LABS. De cuatro labs invocados, **tres llaman al lab**.
- **`search_config` no leído** — `evidence_required`, `hard_rule`, `dev_depth`.
- **`MODEL` hardcodeado en `iid-research` e `iid-process`, línea 6.** Misma clase que la regla de modelos de `MULTIBRAND_RULE.md` §11.
- **`stop_reason: "refusal"` en `iid-process`** — misma clase que el truncado que resolvió `STRUCTURE_TRUNCATED`.
- **Políticas de escritura como dato en tabla** — auditar qué otras constantes de CopyLab gobiernan la escritura.
- **Regeneración real de `ecosystem.md` y `ecosystem_filemap.md`.** Fueron editados a mano en el PR #51 y se descartan al regenerar. Esta pasada tampoco los regenera — ver la excepción declarada abajo.

### ⚠️ Excepción declarada al HRD_ACTUALIZA — regeneración de derivados
El HRD_ACTUALIZA pide regenerar `ecosystem.md` y `ecosystem_filemap.md` **completos** cuando cambia `ecosystem.json`. **No se hizo, y es deliberado — decisión de Sam en esta sesión, no criterio de CC.** El motivo: **no existe generador en el repo**, así que "regenerar" a mano no es regenerar, es reescribir con interpretación — justo lo que la instrucción *"cero interpretación"* busca impedir — y borra historia, que es la regla suprema del `CC_PROTOCOL.md` §0. Se aplicó el **precedente del 2026-08-13**: nota de sincronización en la cabecera declarando qué cambió en `ecosystem.json` v2026-08-18-v1, **cuerpo íntegro**, en **commit separado**. La regeneración real queda como ítem abierto sin fecha, arriba.

_Más todo lo abierto de los briefs anteriores (v2026-08-16-v2 y previos), conservado íntegro debajo._

## 🗓️ ACTUALIZA 2026-08-14-v1 — Reconciliación de estado AIID/CopyLab (verificada por código y SQL)

_(Bloque al tope. Sesión de **descubrimiento**: no cambia comportamiento de producción, reconcilia la descripción con el código verificado. Detalle en `IID/session_log.md` y `brands/ForumPHs/session_log.md` (2026-08-14). Sólo context files + derivados de `unrlvl-context`; los 4 comentarios de código van en PRs propios de `CopyLab` y `unrlvl-iid-functions`. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

**Hallazgo mayor** — `CopyLab/api/execute.ts` **v9.7 ya tiene el modo carril completo en producción**: `builder_input` top-level (su presencia activa el carril, su ausencia deja la UI intacta), 6 códigos de validación fail-fast sin defaults silenciosos, respuesta con `title`/`body`/`signature`/`usage`/`meta`, techo de tokens por destino (editorial 4000 · social 640 · UI 1600) y firma **sin estampar** (la estampa el carril post-Watcher PASS). **El generador unificado de la Fase 3 del Proyecto UNIFICACIÓN ya existe. Falta el cable, no el diseño.**

### 🟢 Cerrado — se retira de pendientes
- **Snapshot de ForumPHs** — sembrado el 2026-08-14 21:16 UTC (`manual_refresh`, v2.4) y verificado con todas las capas pobladas: 44 `creative_vectors` · 10 `tension_architectures` · 5 `aggro_presets` · 18 `creative_compatibility_rules` · 3 genomas · 24 `content_type_registry` · 9 `platform_canal_map` · 12 `pipeline_skills` · brand presente.
- **`await` de `upsertSnapshot` en CopyLab** — cerrado en `brand-cache.js` v2.1 (2026-07-31, el `await`) y v2.3 (2026-08-02, `service_role` + fail-loud). Es decir: se cerró **después** de que el documento que lo pedía como condición previa se escribiera, y nadie lo registró. Ya no bloquea confiar el carril a CopyLab.
- **Filas de `creative_compatibility_rules` para `editorial_post` y `email_divulgacion`** — sembradas el 2026-08-08. El comentario del header de `execute.ts` que las declaraba ausentes estaba desactualizado (corregido en el PR de comentarios).
- **Vencimiento del introductorio de Sonnet 5 el 2026-09-01 — ❌ CANCELADO.** Anthropic confirmó el 2026-08-12 que $2/M input · $10/M output es **permanente**; la subida a $3/$15 no ocurre. Las proyecciones (acta ~$0,72 · suite FIE ~$0,57) conservan su cifra pero pierden su fecha: pasan de "lo que costará desde el 1-sep" a escenario hipotético. **Acción residual:** si hay 2 filas `previsto` sembradas en `ops_lab_rates` para el flip del 31-ago, anularlas antes de que el cron 38 las promueva solo.
- **`fphs_conversion` "sin calibrar"** — la afirmación era estado del 2026-08-08 y quedó obsoleta al día siguiente. Verificado en `brand_voice_genome`: **v1.1, activa desde 2026-08-09**, con `signature_closer`. Las tres voces de ForumPHs están en v1.1 y activas; `fphs_institucional` v0.5 existe e **inactiva** (se declara por primera vez en los context files).

### 🔴 P1 — Abierto, bloqueante
- **Fase B CopyLab — los 6 ítems de cableado.** Bloqueante del run 100% del carril async del AIID. Inventario cerrado en `PROYECTO_COPYLAB_hereda_y_profilaxis.md` §"Fase B — inventario cerrado". Ninguno es rediseño. Los dos que muerden:
  1. `execLab` (`content-run-stage` `L442`) **no puede transportar `builder_input`** — CopyLab lo espera top-level, no dentro de `params`. Hay que extender la firma.
  2. `buildPreviousOutputs` (`L1565`) mete `brandContext` en el `po`, y CopyLab hace `req.previousOutputs.brandContext ?? await fetchBrandCache(brandId)`: **el `??` corta antes** y CopyLab nunca lee su snapshot. Correría otra vez amputado, por un `??`.
  3. Timeout (`execLab` 65.000 ms vs `maxDuration = 300` de CopyLab) · 4. `last_creative_vector` (no-repeat muerto) · 5. mapeo de la respuesta a `assets.copy` + `assets.builder_meta` · 6. `logGen` leyendo el `usage` de CopyLab.
  **Condición de retiro del generador local — CUMPLIDA (A3, 2026-08-18):** se pedía corrida verificada end-to-end y un PR posterior, nunca el mismo que introduce el cable. La corrida confirmó `builder_meta.generator = "copylab"` en las cinco piezas, y el retiro fue en su propio PR.
- **Sembrar `fphs_conversion` × `editorial_post` y × `social_post` en `creative_compatibility_rules`.** La voz no tiene fila en **ningún** content_type y gobierna **22 de los 32 topics activos** de ForumPHs (11 editorial + 11 social). Como `editorial_post` no tiene fila BASE (las 4 llevan `voice_id`), `selectCompatRule` devuelve `source='none'`, `applyCreativeLogic` recibe `rule=null` y filtra sólo por `aggro_min/max`: quedan elegibles casi los 44 vectores de e-commerce. En `social_post` sí hay BASE, así que degrada a `source='base'` con warn. Sembrar al nivel de criterio de las filas vecinas — leer el genoma, no improvisar.

### 🔴 P2 — Abierto
- **Violación multimarca en `CopyLab/api/execute.ts` — `CARRIL_EDITORIAL_CANAL`.** `blog_forumphs` es un literal de marca en capa compartida. El eje correcto **ya existe como dato**: `platform_canal_map` es la tabla puente (plataforma → `canal_blocks.id`) y `resolveCanalBlockId` ya la consume unas líneas más abajo. Corrección en PR de código aparte (código primero, DDL después); alias legacy documentado y retirado en un tercer PR. Registrada con comentario en el código, **no corregida**.
- **Violación multimarca en `brand-context-builder/index.ts` — `SOURCES_MAP`.** Enumera marcas (ForumPHs, NeuroneSCF) con sus rutas de archivo como código. Test N+1: meter una marca nueva exige tocar el archivo. El eje es "qué fuentes alimentan el brand context de una marca"; la instancia es la lista de rutas y debe vivir en tabla resuelta por `brand_id` en runtime. Registrada con comentario, **no corregida**.
- **Cron de `build_all` — nunca ha corrido.** Ninguna fila de `brand_cache_snapshots` tiene `built_by='build_all'`; las 9 existentes son `manual_refresh`/`on_demand`. Faltan 4 de 13 elegibles: DiamondDetails, PatriciaOsorioPersonal, SamPublisher, UnrealvilleStores. Con `CACHE_TTL_HOURS = 4`, **todos los snapshots están stale de forma permanente**.
- **`audience_brief` stage 0 huérfano + `stage_order: 1` hardcodeado en el dispatcher.** `lab_configs` lo declara con `iid_stage_order = 0`, `active = true` y endpoint a `/api/brand-cache`, pero `content-dispatcher` dispara `{ job_id, stage_order: 1 }` literal, así que nunca se alcanza. Y `content-run-stage` **no tiene rama** para él (la cadena `L2233-2447` sólo cubre copylab/aife/imagelab/sociallab): si se disparara caería al `else` de `L2467` con `isCritical=false`, dejando el job en `processing` sin llamar a `fireNextStage` — **stall silencioso**. Trampa latente, no fallo activo. O se cablea, o se desactiva; activo-y-muerto es la peor de las tres.

### 🟡 P3 — Deuda registrada
- **Fase C SocialLab** — `runSocialLabDirect` → `execLab`, mismo patrón que la Fase B.
- **`getBrandContext` fail-silent** (`content-run-stage` `L419-429`): `if (!res.ok) return null` + `catch { return null }`. Si `context-cache` falla, el Builder escribe **sin genoma y sin gritar** — contradice la regla dura de fail-loud. **Nota de interacción:** cuando la Fase B saque `brandContext` del `po` (ítem 2), este camino deja de alimentar a CopyLab; resolver ambos en el mismo PR o documentar la interacción.
- **`surfaces[]` ausente en los 3 genomas de ForumPHs** (contrato §10 de `MULTIBRAND_RULE`). Conviven vocabularios ad-hoc distintos: `canales`/`formatos`/`pipeline`/`fuente_de_verdad` en editorial y educativa vs `mapa_de_dominios`/`dos_frentes`/`reglas_invariables`/`candado_confidencialidad_BI` en conversion.
- **Deuda de `unrlvl-ops`** (decisión de Sam: **no se toca ahora, se registra**): B4 abierta · gate `VITE_DASHBOARD_KEY` inexistente en Vercel → `if (!envKey) return true` deja el tablero abierto · 3 grants huérfanos sin consumidor (`upsert_brand_cache`, `rotate_sequence_current`, `lab_jobs`) · literal `NeuroneSCF` en el placeholder de dos inputs de `CostLayer.tsx`.
- **Higiene de infraestructura** — Node 24 en `ddmv-assistant` (deadline Vercel 2026-10-01) · PAT expuesto en el historial de git desde 2026-03-25 (revocado por GitHub, sigue en el historial) · org 'Unreal>ille Studio' sin créditos API (4 avisos: 12-abr, 15-may, 05-jun, 21-jun), auto-reload sin activar · WARN de Supabase: `search_path` mutable en ~20 funciones, `pg_net` y `vector` en `public`.

### ⚠️ Paso 10 (barrido de archivado) — NO EJECUTADO en esta pasada
Por protocolo (`protocols/HRD_PROTOCOL.md` v1.3, paso 10) el barrido corre en **cada** Actualiza, y el reparto de roles es fijo: **Claude.ai** recorre `AGENDA.md`, aplica las 3 condiciones (✅ completado · +30 días desde el cierre · no es referencia activa) y **propone la lista a Sam**; Sam aprueba ítem por ítem; **CC sólo ejecuta el movimiento de lo aprobado**. En esta sesión Claude.ai **no recorrió `AGENDA.md`** (el protocolo de archivado no cargó), así que **no hay lista propuesta ni aprobación de Sam** y CC no archiva nada por su cuenta. **Queda pendiente para la próxima vuelta**, contra la versión vigente del repo. El tamaño de `AGENDA.md` no es criterio y no se cita como motivo — el criterio es del ítem, nunca del archivo.

_Más todo lo abierto de los briefs anteriores (v2026-08-13-v2 y previos), conservado íntegro debajo._

## 🗓️ ACTUALIZA 2026-08-13-v2 — Firmas bilingües + política de idioma (tramo 3 de la sesión 2026-08-09)

_(Bloque al tope. Tercer y último tramo de la sesión 2026-08-09 (firmas + idioma), **registrado el 2026-08-13** porque los PRs #40 y #41 ya estaban mergeados a `main` cuando llegó el brief — por eso versiona `v2026-08-13-v2` y no `v2026-08-09-v3`, para no romper el orden monótono de la cadena (confirmado por Sam). Sólo context files + `ecosystem.md`; las mutaciones de DB ya se ejecutaron en sesión bajo HRD. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado
- **Firmas (`signature_closer`) sembradas** con variante bilingüe `text_en`: ForumPHs (las 3 voces activas), NSCF (`nscf_conversion` + `nscf_editorial`), Lucien (`lucien_editorial` + `lucien_social`), UNRLVL (`unrlvl_default`). `null` declarado en `fphs_institucional` y `po_consumer` v0.5/v0.6.
- **NSCF — reparto invertido** respecto de la propuesta inicial: conversión lleva la firma sustantiva ("Ciencia capilar aplicada al clima de la Florida"), editorial el sello ("HAIR INTELLIGENCE"). "Florida" sobre "Miami" por consistencia con `neuronescflorida.com`.
- **Normalización de idioma** en 11 columnas de 7 tablas; spanglish eliminado del ecosistema. 11 variantes de deriva colapsadas a `es`/`en`.
- **Política de idioma del ecosistema fijada** (sección nueva en `ecosystem.md`): `es`|`en` neutro internacional, spanglish prohibido sin excepción, EN→ES en bilingües, ES/EN generados por separado; excepción legítima `VAL`/`EN-UK` en DiamondDetails.

### 🔴 Abierto (nuevo)
- **Catálogo de idiomas con FK** — cura de raíz. Requiere DDL, brief propio y test N+1. Bloquea la incorporación limpia de un idioma nuevo (hay un proyecto en lituano en evaluación).
- **Firmas de las marcas restantes** — Patricia, D7Herbal, VizosCosmetics, VivoseMask, DiamondDetails, SamPublisher.
- **`po_consumer`** — firma pendiente y **asignación de marca a revisar** (está bajo `brand_id='NeuroneSCF'`, es voz de Patricia Osorio).
- **NSCF para AIID** — `nscf_professional` sin genoma · `nscf_conversion` v0.5 activa sin calibrar · `nscf_editorial` con `target_artifact` en forma vieja y `"Blog"` que no joinea contra `platform_canal_map` (clave real `blog`) · verificar si su turno 6 es control negativo antes de asumir.
- **Correr una pieza real de ForumPHs por el carril completo antes de calibrar NSCF.** Todo lo sellado hoy está verificado por lectura de código y esquema, no por ejecución — y `signature_closer` era invisible a la auditoría de campos.

### ⚠️ Nota de estado (brief vs. realidad del repo)
- El brief pedía `v2026-08-09-v3` y commits sobre la rama del PR #40; ambos PRs (#40 y #41) ya estaban mergeados a `main`. Se abrió **PR nuevo off `main`** y se versionó `v2026-08-13-v2`.
- Carpetas de marca inexistentes (no se crean, se reportan): `UnrealvilleStores`, `PatriciaOsorioComunidad`, `PatriciaOsorioVizosSalon`, `PatriciaOsorioPersonal`, `D7Herbal`, `VivoseMask`, `DiamondDetails`. Marcas con entrada de idioma aplicada: `UnrealvilleStudio`, `LucienSael`, `PatriciaOsorioConectando`, `VizosCosmetics` (+ `NeuroneSCF`, bloque propio).

_Más todo lo abierto de los briefs 1 y 2 (v2026-08-13-v1 y anteriores), conservado debajo._

## 🗓️ ACTUALIZA 2026-08-13-v1 — Posicionamiento y web pública: tesis canónica de marca

_(Bloque al tope; el detalle vive en `brands/UnrealvilleStudio/session_log.md` (2026-08-13). Sólo context files de `unrlvl-context`; el código de la web vive en `CoreProject` (PR #3, rama `claude/brand-thesis-line-izafos`). CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

**Tesis sellada** — EN: _Brand is not how a business looks. It's how it works._ · ES: _Marca no es cómo se ve un negocio. Es cómo funciona._ Instalada en 4 puntos × 2 idiomas de unrealvillestudio.com (PR #3 en `CoreProject`). Eje del discurso comercial: **continuidad sin dependencia**. Detalle completo en el session_log.

### 🔴 Abierto — nuevo
- **Capabilities — revisión de las 6 secciones para actualización.** `CAPABILITIES.md` v1.3 (2026-08-07) desactualizado: el bloque Professor sigue diciendo "Proxy `/api/professor` PENDIENTE → fallback Supabase SQL" cuando el proxy responde 200 en lectura y falla solo en escritura; la lista de skills omite `voice-craft`, `comm-arsenal`, `voice-conversion`, `genome-calibration`, `r4b-genome-calibration`, `nscf-pricing`, `acta-repair`, `voice-reference-extractor` (INDEX ya en v1.10); falta el egress bloqueado de CC como nota operativa. (Pedido explícito de Sam, esta sesión.)
- **Egress de CC hacia `unrlvl-context.vercel.app` — verificar allowlist.** Mientras no se resuelva, todo brief de código/migración/siembra lleva las reglas transcritas, no referenciadas por URL.

### 🟡 Sesión aparte / prerequisito
- **Reescritura de `#ecosystem` y `#proof` de unrealvillestudio.com** bajo el eje de continuidad sin dependencia — sesión aparte, no incremental. La tesis instalada hoy es parche mínimo.
- **Exportabilidad del genoma** — destilado en prosa por genoma sellado + cláusula de salida contractual. Prerequisito del pitch de continuidad con terceros. No se implementa hasta que abrir a externos esté decidido.

## 🗓️ ACTUALIZA 2026-08-09-v2 — las 3 voces de ForumPHs selladas en v1.1

_(Amplía el PR #40 — mismos commits, misma rama. Detalle en `brands/ForumPHs/session_log.md` (2026-08-09 cont.). Sólo context files de `unrlvl-context`; las mutaciones de DB ya se ejecutaron bajo HRD. CC no mergea — Sam mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado hoy
- **`fphs_educativa` y `fphs_editorial` v1.1 selladas.** Educativa 11 turnos (10 SÍ + 1 control negativo, convergencia 9-10-11, 7/7 territorios); Editorial 16 turnos (racha 13-15-16 tras el control negativo del t14, 7/7 territorios). **CORRECCIÓN:** los NO finales eran controles negativos deliberados, no convergencias fallidas (falso positivo por leer veredictos sin abrir `notes_intent`).
- **`signature_closer` en las tres voces.**
- **`content_type_registry` completo** — 7 filas para las 3 voces (5 de Educativa/Editorial estaban con `format_instruction`/`max_tokens` NULL; pobladas por UPDATE).
- **Reglas nuevas de marca** — "dinero" no "plata"; la invitación abre la pieza siguiente, nunca cierra la actual; la marca no entra al cuerpo en Educativa/Editorial, la firma la estampa el sistema.

### 🔴 Abierto
- **Auditar `signature_closer` en los genomas activos de las demás marcas** — 7 de 11 no lo tenían al detectarse.
- **Cuentas de ForumPHs sin conectar** (sesión AIID).
- **`HR-FPHS-08`** — sin `post_url` ni slugs; la serie de artículos de apertura está pendiente y las invitaciones ya emitidas son su backlog.
- **`fphs_conversion` turnos 4, 8 y 9** — año calendario y tuteo, corregir antes de publicar.
- **`fphs_editorial` turno 16** — verificar datos regulatorios extranjeros (España, Chile, EEUU) antes de publicar esa pieza.
- **Arrastrado del v1** — `brand_context_cache` vestigial · columnas invertidas en `intel.calibration_turns` · `carrusel` ausente en `content_type_registry` · `nscf_editorial` con `channel:\"Blog\"` · `identity` de ForumPHs contradiciendo el genoma · `canales_activos` incompleto · grupo Patricia/D7/Vizos/Vivosé sin destilar.

## 🗓️ ACTUALIZA 2026-08-09-v1 — fphs_conversion v1.1 sellada · las 4 voces de ForumPHs normalizadas

_(Bloque al tope; el detalle vive en `brands/ForumPHs/session_log.md` (2026-08-09). Sólo context files de `unrlvl-context`; las mutaciones de DB ya se ejecutaron en sesión bajo HRD. CC no mergea — Sam mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🟢 Hecho / cerrado
- **`fphs_conversion` v1.1 sellada.** Convergida en 10 turnos (7 SÍ / 3 NO, marcadores en la racha 8-9-10). Genoma v1.1: `application_constraints` migrado de `array` a `object` preservando v1.0 íntegro; `prohibited_registers` 9→12.
- **`signature_closer` — fallo silencioso corregido.** Sembrada en las 3 voces activas de ForumPHs (ninguna la tenía); el carril la estampa tras el PASS del Watcher.
- **`target_artifact` → `surfaces[]`** en las 3 sesiones de ForumPHs (`fphs_conversion` 4 · `fphs_educativa` 5 · `fphs_editorial` 2). Contrato `surfaces[]` añadido a `protocols/MULTIBRAND_RULE.md`.
- **`content_type_registry`** — `editorial_post`=3200 tk y `social_post`=900 tk para `fphs_conversion`. Idioma `es` en las 32 filas. `HR-FPHS-04` reescrita (ofrece≠contiene).

### 🔴 Abierto — ForumPHs voces
- **Cerrar `fphs_educativa` y `fphs_editorial`** — ambas convergidas con un **NO como último veredicto** y activas en producción; hay que correr turnos hasta 3 SÍ consecutivos (no lo arregla un `UPDATE`). Anexo de continuación emitido.
- **Corregir los turnos 4, 8 y 9 de `fphs_conversion` antes de publicar** — tienen SÍ de Sam pero incumplen reglas duras: año calendario (turno 4), tuteo (8 y 9), cierre sin enlace interno (4).
- **Conectar cuentas de ForumPHs** — `brand_social_accounts` y `meta_accounts` en 0 (sesión AIID aparte).

### 🔴 Abierto — higiene del sistema de voces
- **Auditar `signature_closer` en los 11 genomas activos** — **7 sin firma hoy**; sin la clave la pieza sale sin firma (fallo silencioso, solo queda un log).
- **`carrusel` no existe en `content_type_registry`** y `nscf_professional` lo declara.
- **`nscf_editorial` declara `channel:\"Blog\"`** y la clave del catálogo es `blog` — no joinea.
- **`intel.calibration_turns` — columnas de veredicto invertidas.**

### 🟡 Deuda / higiene
- **`brand_context_cache`** — tabla vestigial: ningún cron la alimenta, ningún consumidor la lee. Eliminar o revivir.
- **`identity` de ForumPHs contradice el genoma** — cita la ley como diferenciador donde el genoma la prohíbe como blasón.
- **`canales_activos` de ForumPHs** — no incluye `blog_forumphs` ni `meta_fb`.
- **Ángulo `profesionalizar-sin-perder-el-control-doliente`** — rutea a `fphs_conversion` con ángulo marcado como mal planteado.

### 🔜 Próximo grupo de calibración
- **Grupo Patricia / D7 / Vizos / Vivosé** — 8 sesiones convergidas sin destilar. Brief aparte ya emitido.

## 🗓️ ACTUALIZA 2026-08-08-v1 — Regla multimarca, grafía v1.3, voz editorial NSCF y cableado de voces

_(Bloque al tope; el detalle vive en `brands/UnrealvilleStudio/session_log.md` (2026-08-08), `brands/NeuroneSCF/session_log.md` y `brands/ForumPHs/session_log.md`. Lo previo se conserva íntegro debajo. Este PR sólo toca context files + derivados de `unrlvl-context`; el código de los ejes multimarca vive en el repo del carril (PR mergeado + DDL post-merge por Claude.ai). CC no mergea.)_

### 🟢 Hecho / cerrado
- **REGLA MULTIMARCA — instalada en 16 repos.** `protocols/MULTIBRAND_RULE.md` creada. El EJE va en el CÓDIGO, la INSTANCIA en el DATO; que hoy una sola marca use un eje NO lo convierte en suyo. Test de la marca N+1 obligatorio en todo brief/PR que produzca código, migración o siembra. Campo `MULTIMARCA:` añadido al reporte de CC_PROTOCOL §4. Bloque puntero byte-idéntico en `.github/CLAUDE.md` de los 16 repos.
- **4 de 5 ejes multimarca del carril — PR mergeado + DDL aplicado.** `voice_by_destination` a claves libres (`Object.keys`) en `iid-core/fanout.ts` · `max_tokens`+`format_instruction` del ternario a `content_type_registry` por `(content_type, voice_id)` con `DESTINATION_TO_CONTENT_TYPE` + cascada voz→catálogo→default (640 tokens truncaban un carrusel de 7 láminas ~950) · `EMAIL→CANAL_NONE` en `CANAL_BY_PLATFORM` (antes cada email caía a `INSTAGRAM_FEED` y generaba imagen: 58,7% del coste por pieza + daña entregabilidad) · `AUDIENCE_FRAMES` al eje del poder de contratación `decide`/`influye`/`general`, alias legacy `jd`/`doliente`, espejado en `content-watcher` gate 7. **DDL post-merge (Claude.ai):** CHECK de `intel.brand_topics.audience_frame` a los 5 valores + 18 filas FPHs migradas.
- **GRAFÍA `>UNREALVILLE` (BP v1.3).** Chevron al frente; `Unreal>ille` DEROGADA; STUDIO chalk 32%; prosa `Unrealville Studio`. Barridos CC en `unrlvl-context`, `CoreProject`, `BluePrints`, `WebLab`. BP JSON = FUENTE, HTML = RENDER.
  - **Barrido de `unrlvl-context` — HECHO 2026-08-18.** PR #48 (pies de `INDEX` y `context-resolver`) + PR #49 (los 37 pies restantes, 34 archivos, incluidos la plantilla del digest de Ayra y `cost-layer/ARCHIVE_v1.md`). Forma aplicada: **prosa `Unrealville`**, por ser la variante mixta la que llevaban los pies. **Los otros tres repos, verificados el 2026-08-18:** `CoreProject` — un pie renderizaba `UNRL>ILLE STUDIO` con la forma derogada **partida por el markup del span** (invisible a un grep de texto); corregido en su PR #4. `BluePrints` — sin residuo: las 15 ocurrencias son normativas en `BP_BRAND_UNRLVL_v1.3.json` (`derogated forms`, la nota de assets, la regla del checklist) o viven en las versiones congeladas v1.0 y v1.2. `WebLab` — el `src` ya se barrió en su PR #2; el único residuo está en el `dist/` commiteado, que está desactualizado y que el propio `.github/CLAUDE.md` del repo prohíbe commitear. **Queda abierto un pendiente real, no de texto:** los SVG y el PNG del logotipo llevan el nombre en curvas con la grafía vieja y hay que regenerarlos — declarado en `BP_BRAND_UNRLVL_v1.3.json` → `_v1_3_note`, pendiente desde 2026-08-07.
  - **Intactos a propósito** los usos normativos e históricos, donde la forma derogada **es el contenido** y corregirla borraría la historia de la propia regla: esta misma línea, `brand.json` → `derogated_forms`, `BP_Brand_Context` §grafía v1.3 y su checklist, `historical_AGENDA.md`, `ecosystem.json`, y las entradas de `session_log` que narran por qué el chevron pasó al frente. Aparte, el nombre de la org de la API en la línea de higiene de infraestructura: es el literal con el que la cuenta está registrada, no una superficie de marca.
- **NSCF `nscf_editorial` v1.0 activa.** Bucle Boids 10 turnos convergido; construcción propia = par cerrado con llave de diagnóstico; 4 topics de blog en AUTHORITY; fila propia en registry y compat.
- **ForumPHs — posición ratificada con Ivette + reparto de 18 topics.** Publicar el estándar, nunca instrumentar; 9 `decide` en conversión, 7 `influye`→`fphs_educativa`, 2 en conversión; `fphs_conversion` reactivada (`abandoned`→`active`).
- **Cableado de voces — 14 filas.** `content_type_registry` + `creative_compatibility_rules` para `nscf_editorial`, `nscf_conversion`, `fphs_editorial`, `fphs_educativa` (las de `fphs_educativa` corregidas por criterio de Sam: educar como estrategia sí es UNRLVL, educar por pedagogía no).

### ⏸️ En pausa
- **`nscf_professional`** — EN PAUSA por decisión de Sam hasta que PO tenga lista esa línea de negocio (la bloquea el negocio, no el sistema).

### 🔴 Abierto
- **`OBJECTIVE_LABEL_TO_TAG`** — quinto caso multimarca, PR propio.
- **`fphs_conversion` sin calibrar** — 11 topics, 0 filas.
- **Ángulo `profesionalizar-sin-perder-el-control-doliente` mal planteado** — reescribir (mezcla frente decisor y doliente).

### 🟡 Deuda / higiene
- **`po_consumer`** — activa con 0 topics (decisión: no hacer nada).
- **SVG/PNG de BluePrints con grafía derogada** — los regenera Sam.
- **Dos carpetas duplicadas** `brands/Unrealville/` y `brands/UnrealvilleStudio/` — decidir canónica y borrar la otra (arrastrado).
- **Hueco de frecuencias NSCF** · **header del blog NSCF**.

### 🔜 Próximo grupo de calibración
- patriciaosorio.com + PatriciaOsorioConectando · D7Herbal · VizosSalón.

## 🗓️ ACTUALIZA 2026-08-05-v1 — Actualiza incremental (PR E): residuo de costo + re-diagnóstico BI

_(Bloque al tope; **sólo lo posterior al PR #31**. VERIFICADO contra `information_schema` de `amlvyycfepwhiindxgzw` (unrlvl-db) y `tajuoqdbnsnzkhyqvdgs` (forumphs-db) — la DB manda sobre el brief. Detalle en `ecosystem.json` v2026-08-05-v1 → `iid_subsystem.cost_instrumentation._update_2026-08-05` y `brands/ForumPHs/session_log.md`. Este PR sólo toca context files + derivados de `unrlvl-context`; el código de BI/FIE vive en `forumphs-document-factory`. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado / verificado
- **PR #23 (BI fail-loud) y #24 (FIE Sonnet 5 + instrumentación)** — mergeados y desplegados.
- **Seis flujos midiendo** en `ops_generation_ledger` (verificado): `acta` · `fie_parse_pdf` · `icr_audit` · `image_curation` · `informe_fie` · `speaks_chat`.
- **Costo unitario verificado contra factura (Console):** acta **~$0,43 medido / ~$0,48 ajustado** (residuo 12%) · suite FIE **~$0,38** medido y ajustado, coincidente al centavo con Console (ledger 0,3672 vs 0,38).
- **Objetos de costo nuevos en la DB** (registrados en `ecosystem.json`): tabla **`ops_cost_residual`** (residuo de brecha ledger↔Console por scope) + vista **`v_cost_residual_vigente`** (residuos vigentes, `valid_to IS NULL`). Filas vigentes: `document-factory` **12,000%** · `fie` **3,500%**.
- **Auditoría completa del acta cerrada:** `/api/qa`, `classifyRoles`, `/api/parse` y **PRE-FLIGHT** (`preflightDetector`) verificados **deterministas** leyendo la fuente. No quedan superficies del acta sin instrumentar. El residuo restante se atribuye a dos `catch` exteriores que pierden tokens ya consumidos (`fphs-formalize` devuelve 500 sin `logLedger`; el `JSON.parse` de `/api/icr` salta antes del asiento).

### 🟠 Brecha (residuo de costo)
- **acta 12 %** · **FIE 3,5 %.** El parse FIE manda 167k tokens de entrada de estructura fija y aun así la brecha es mínima → descarta los tokens de cache como causa del residuo del acta.

### 🔵 Re-diagnóstico BI (afina el PR-B del 2026-08-04)
- **No era clave ni RLS.** El fail-loud del PR #23 hizo distinguible el caso `0-filas-por-RLS` de `id inexistente`; con él en producción, la causa real del 404 salió a la luz: **`monthly_kpis`, `eeff_preliminar` y `mora_mensual` están VACÍAS** — 0 filas en toda la DB `forumphs-db` (verificado contra `tajuoqdbnsnzkhyqvdgs`), incluida `PH Lefevre 75 Don Enrique`. **Falta carga de datos, no código.**

### 🔴 Vencimiento 2026-08-31
- Vence el introductorio de Sonnet 5: **acta pasa a ~$0,72**, **suite FIE a ~$0,57** (proyección; verificar `ops_rate_transitions` ese día, no confiar en la automatización).

---

## 🗓️ ACTUALIZA 2026-08-04-v2 — CopyLab: el motor de voz nunca había leído los genomas

_(Bloque al tope; el detalle vive en `brands/UnrealvilleStudio/session_log.md` (entrada 2026-08-04). PRs **#16–#22** en el repo de CopyLab, todos mergeados y verificados en producción; las tablas/columnas nuevas las creó **Claude.ai fuera de PR**. `ecosystem.json` **no se toca**: ninguno de los objetos nuevos (`content_type_registry`, `platform_canal_map`, `creative_compatibility_rules.voice_id`) aparece literalmente en el JSON. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado / verificado en producción (PRs #16–#22)
- **B0 — el inyector del genoma estaba roto en las 10 voces activas.** `buildCopyPrompt` no inyectaba el genoma; el motor de voz nunca leía los genomas de marca. Reparado y verificado en las 10 voces activas.
- **Registro de `content_type` con doble eje** — el tipo se registraba **mentido** (toda pieza caía en `social_post`); ahora se registra por los dos ejes reales.
- **Precedencia por voz en compatibilidad** — `creative_compatibility_rules` resuelve por `voice_id` antes que por el default.
- **Escritor del cache a `service_role`** — el cache **persiste por primera vez desde que existe** (antes escribía sin permiso efectivo y no cuajaba).
- **Sustitución de variables de template** — 18 templates afectados; las variables ya no salen crudas.
- **Bloque de canal real** — 17 `canal_blocks` activados; el template corría antes contra el genoma en vez del canal.
- **Trasplante de los guardarraíles de `buildCopyPrompt` a `/api/execute`** — geomix, CTA por canal, compliance ordenado, personas y goals completos, gramática `##` unificada. La UI nunca pasaba por `/api/execute`; ahora sí.
- **Retiro de código muerto** — `src/lib/buildCopyPrompt.ts`, `queries.ts` y el hook `useCopyPrompt` (muerto) eliminados.

### 🟢 Tablas y columnas nuevas (creadas por Claude.ai, fuera de PR)
- **`content_type_registry`** — 15 filas, ahora con `voice_id` y **PK compuesta**.
- **`platform_canal_map`** — 8 filas `organic`.
- **`creative_compatibility_rules.voice_id`** — columna nueva + 2 índices parciales + trigger.
- **Triggers** — `validate_compat_voice`, `validate_registry_voice`, `validate_canal_map_content_type`.

### 🟢 Genoma
- **`financial_lens`** añadido a `argumentative_architecture` en `lucien_editorial` y `lucien_social` (**texto idéntico** en ambas). Smoke verificado (B4·truth + T10 + AGGRO_3): `financial_lens` **sin dispararse** cuando no corresponde.

### 🔴 Abierto — consolidación
- **Motor unificado** — `copyEngine` + los **18 templates de CopyPack** por consolidar.
- **C / B5 · D / B3 · E** — frentes pendientes del plan CopyLab.
- **⚠️ IMPORTANTE — ADS como sección propia** — ADS es **una fila en el mismo carril, no un carril clonado**. Tratar como sección propia, no duplicar el motor.

### 🟡 Deuda declarada
- **`api/claude.ts`** — conservado hasta el reporte de las **3 sub-tools**.
- **`brand_context_cache` + RPC `upsert_brand_cache`** — huérfanas; **pendiente DROP**.
- **`linkedin` → `WEB`** — fallback forzado con **38 filas**.
- **`meta_fb` y `x`** — sin `canal_block` propio.
- **`build_all=true`** — no funciona en `brand-cache.js`.

## 🗓️ ACTUALIZA 2026-08-04-v1 — HRD_ACTUALIZA + BI + FIE (2ª ola de costo + ForumPHs)

_(Bloque al tope; **verificado contra la DB `amlvyycfepwhiindxgzw`** —`information_schema`, no el brief. Detalle en `ecosystem.json` v2026-08-04-v1 → `cost_instrumentation._update_2026-08-04` y `brands/ForumPHs/session_log.md`. Lo previo se conserva íntegro debajo. Este PR (A) sólo toca context files de `unrlvl-context`; los PRs B y C viven en `forumphs-document-factory`.)_

### 🟢 Cerrado / verificado
- **2ª ola de instrumentación de costo** — verificada contra `information_schema` de `amlvyycfepwhiindxgzw`: `ops_services` (catálogo de **20** servicios/proveedores), `ops_credits` (créditos/saldos, 3 filas), columna `billable` (text) en `ops_costs` y `ops_generation_ledger`, `amount_original`+`currency_orig` en `ops_costs`, `ops_token_sessions` **RETIRADA → `ops_token_sessions_retired`**, `v_cost_pivot` a **31 columnas**. Registrado en `ecosystem.json → cost_instrumentation`.
- **ForumPHs — T1 migración aplicada; T3/T4/T5/T6/T6b mergeados.** 4 EFs verificadas **contra el deploy** (marcador confiable = sufijo de `entrypoint_path`, no el repo): `fphs-icr-apply` **_37** · `fphs-bi-report` **_27** · `fphs-chat` **_44** · `fphs-formalize` **_52** (todas ACTIVE).
- **Primer costo unitario de un acta ForumPHs = $0,42** — respaldado por **35 asientos** ForumPHs en `ops_generation_ledger`. Brecha Console↔ledger de **62% a 12%**.

### 🟠 Discrepancia brief ↔ DB (la DB manda)
- El brief nombró **5** servicios nuevos (`vertex`/`resend`/`twilio`/`github`/`klaviyo`); la tabla `ops_services` tiene **20**. Se registró el roster real completo.

### 🔴 Abierto — PRs B y C (repo `forumphs-document-factory`, aparte)
- **PR B — BI:** `FPHS_SERVICE_KEY` no contiene una clave `service_role`; `buildings` con RLS (2 políticas) devuelve 0 filas y la EF lo traduce a 404. CC hace fail-loud en `fphs-bi-data`/`fphs-bi-report` (distinguir 0-filas-por-RLS de id inexistente); **la clave la rota Sam**. No entra en este PR A.
- **PR C — FIE:** `/api/fie/generate` y `/api/fie/parse` corren `claude-sonnet-4` (retirado) → migrar a `claude-sonnet-5` + instrumentar al ledger compartido. FIE usa `ANTHROPIC_API_KEY` (no `forumphs_document_factory`) → superficie de costo separada. Va **después** de mergear B.

## 🗓️ ACTUALIZA 2026-08-01-v2 — CopyLab Fase A cerrada

_(Bloque al tope; el detalle vive en `IID/session_log.md` §9, `knowledge/ecosystem/labs/COPYLAB_NOTES.md`, `PROYECTO_COPYLAB_hereda_y_profilaxis.md` y `ecosystem.json`. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado
- **CopyLab Fase A (PRs #8–#13)** — cuatro contratos del modo carril, corrección del lector (`brand` singular, precedencia de humanize, voz del modo literal), escritor determinista, dos goldens anclados a `da182aa` (43.056 b) y CI en GitHub Actions. `main` @ `e7d517c`, 23 tests verdes.
- **`await` del `upsertSnapshot` en CopyLab** — ya estaba corregido en `brand-cache.js` v2.1 (31-jul); cuarta deuda arrastrada que estaba saldada (ver el ítem homónimo en §"Deuda con dueño" del bloque 07-31, que se conserva como registro).
- **Versiones de EFs en `ecosystem.json` corregidas** — el registro vivo `edge_functions` decía v57/v36/v18/v36; las reales son **content-run-stage v74 · iid-core v47 · content-watcher v29 · content-dispatcher v47**, verificadas con `list_edge_functions` (el contador `version` coincide con el sufijo de `entrypoint_path`, el marcador confiable). Se tocó **solo el registro vivo**; las menciones fechadas (`key_changes_2026-07-25` = v52, etc.) se preservan como historia (regla #1).

### 🔴 Abierto — CopyLab Fase B
- **Mapa `destination`/`platform` → `content_type`** — hoy toda pieza cae en `social_post` por el default del pack; `creative_compatibility_rules`/`aggroByType` están cableados a content_types que el carril no produce.
- **`last_creative_vector` muerto** — `buildPreviousOutputs` nunca lo setea, así que el no-repeat de vectores (L14) no filtra en el carril (nota 2026-08-01 en `COPYLAB_NOTES.md`).
- ✅ **retiro del generador local** — hecho en A3 (2026-08-18) tras la corrida verificada. Queda **`brandContext` del stage**.

### 🔴 Abierto — antes de Fase C
- **`src/lib/buildCopyPrompt.ts` (21.799 b)** — tercer armador de prompt en el front-end de CopyLab. Mientras exista, "CopyLab es el único generador" es falso dentro de CopyLab mismo. Auditar.

### 🔴 Ventana de seguridad — nuevo
- **`fphs-debug`** — EF ACTIVE, `verify_jwt=false`, corriendo su primer bundle (`_2`) sin tocarse desde 2026-04-07: endpoint de debug **público y sin autenticar**. Va junto al hallazgo latente del schema `intel`, no después.

### 🟡 Higiene y deuda — nuevo
- **`package-lock.json` sin versionar** — builds no reproducibles; CI usa `npm install`. Decisión pendiente de Sam (versionar el lockfile → `npm ci`).
- **Deuda observada en `execute.ts`** — `brand_copy_profiles?.[0]` y `personasList[0]`: selección por índice, misma familia que los bugs de Fase A, sin evidencia de daño hoy.
- **Directorio duplicado `brands/Unrealville/` ↔ `brands/UnrealvilleStudio/`** — `BP_Brand_Context.md` (ambos `5482b12`) y `brand.json` (ambos `91c11f7`), shas idénticos. Decidir cuál es canónico y borrar el otro; hoy editar uno deja el otro divergiendo en silencio.
- **`brands/UnrealvilleStudio/session_log.md` congelado desde 2026-06-17** — o se retoma, o se declara que el log vivo del carril es `IID/session_log.md` §9 y el de marca queda para lo no-IID. Hoy hay dos logs y uno miente por omisión.

### 🔗 Conecta con pendiente viejo
- **Título propio por marca** (calidad, arrastrado desde jun-2026: el title compartido delataba a las marcas hermanas) — **parcialmente resuelto** por Fase A: `parsePiece` separa `title` del cuerpo vía el sentinel interno `TÍTULO:`, y el carril recibe título propio por pieza. Cierra cuando Fase B cablee el stage `copylab`.

## 🗓️ ACTUALIZA 2026-08-01-v1 — regla de nomenclatura de labs + unificación _naming_rule→_note

_(Bloque al tope; el detalle vive en `IID/session_log.md` §9, `PROYECTO_COPYLAB_hereda_y_profilaxis.md` y `ecosystem.json` v2026-08-01-v1. Lo previo se conserva íntegro debajo.)_

### 🟢 Registrado
- **Regla de nomenclatura de labs — INVIOLABLE, en `ecosystem.json → labs._note`.** Cuando Sam dice CopyLab / ImageLab / SocialLab / VideoLab / VoiceLab / WebLab / AgentLab / BlueprintLab se refiere SIEMPRE a estas apps —repo propio, UI para trabajo humano, modo dual `sync` (UI) + `async` (carril)—, nunca a un servicio genérico, una función, un stage del pipeline ni un módulo interno. Un lab es una aplicación con superficie humana; el motor que lleva dentro es intercambiable, el lab no. **Si un carril necesita la capacidad de un lab, lo llama por su `api_endpoint` — no construye su propio motor.** Precedente: `el generador local`, motor duplicado en `content-run-stage` que dejó a CopyLab fuera del carril async durante meses.
- **`_naming_rule` unificada dentro de `_note`.** La clave separada existía sólo en `ecosystem.json` (barrido del árbol + `grep`: ningún `api/*.js` la consumía) → eliminada; su contenido, reescrito, vive ahora en `labs._note`.
- **Contradicción del `flow` corregida.** En `iid_subsystem.pipeline.flow`, el fragmento del Builder con el aviso `⚠️DESVIACIÓN` pasa a una nota que lo nombra desvío a corregir (NO arquitectura) y remite a `labs_wiring`, que sí declara la arquitectura correcta.
- **Brief de CopyLab persistido** en `PROYECTO_COPYLAB_hereda_y_profilaxis.md` (raíz): Fase A (5 capas de gobierno; voz-por-destino y reglas del Watcher son portación real) + 2 correcciones propias (`packInstructions` fuerza CTA; idioma ignorado) + 2 abiertas (`await` de `upsertSnapshot`; catálogo de 44 vectores monoindustria); Fase B (`execLab` en el stage copylab, `el generador local` se retira sólo con las 5 capas y corrida verificada); Fase C (SocialLab, mismo patrón). Principio de cierre: **ningún carril construye el motor de un lab que ya existe.**
- **Confirmación de nomenclatura** añadida a la respuesta de apertura de `HRD_PROTOCOLO_ACTUALIZACION` (`protocols/HRD_PROTOCOL.md`).

### 🟠 Pendiente dedicado nuevo — discrepancia estático↔repo
- El `ecosystem.json` (y `AGENDA.md`) **servidos por Vercel difieren en bytes** de los de `main`. Diagnóstico parcial de esta sesión: el árbol de trabajo local está en **CRLF** (`core.autocrlf=true`) y el blob de git en **LF** (verificado: `ecosystem.json` blob 48.180 b LF vs árbol 48.890 b CRLF, delta = 1 CR por línea) — normalización de fin de línea esperada en Windows, no corrupción. **Falta confirmar contra el estático realmente servido** (los tamaños del brief —54.681 / 172.440— no coinciden ni con el blob ni con el árbol local). Diagnóstico propio, **no resuelto en este PR**; abrir ventana dedicada.

## 🗓️ ACTUALIZA 2026-07-31-v1 — instrumentación de costo + el desvío el generador local

_(Bloque al tope; el detalle vive en `IID/session_log.md` §9 y `ecosystem.json` v2026-07-31-v1. Lo previo se conserva íntegro debajo.)_

### 🔴 Bloqueantes R4B
- **Publicador** — `scheduled_posts` quedan en `pending_publish` sin publicar ni fallar; ningún cron drena la tabla. Confirmar quién publica y por qué no corre (arrastrado del 25/29-jul, aún abierto).
- **Unificación del generador — Fases A/B/C** — es la corrección del desvío `el generador local`: el carril arma copy con motor LOCAL en vez de llamar a CopyLab por su `api_endpoint` (igual `runSocialLabDirect` por SocialLab). **A:** brand-cache unificado por marca con capas por industria (mata los 3 generadores desalineados); **B:** CopyLab multiindustria; **C:** generador de texto único que hereda de CopyLab + `el generador local`. Ver `PROYECTO_UNIFICACION_cache_y_generador.md`. NO bloquea la calibración.
- **Scheduler B4** — ejecutor de agenda (cadencia) sobre `pg_cron`; requiere sembrar dato inexistente. Bloqueante de R4B pleno.

### 🟠 Calidad
- **Tasa de PASS por medir** tras M-9 (el Builder lee las reglas que lo juzgan) y M-16 (perfiles de copy/humanización llegan al Builder). Antes de M-9, 7 de 8 piezas rechazadas por reglas que el Builder nunca vio.
- **Capa de competencia comunicacional** (canal / código / receptor / ruido) + llevar `comm-arsenal` al generador, no sólo al chat.
- **Gate de imagen** — 12 reglas `IMG-*` sembradas que ningún gate lee; el watcher no mira imagen. Diferido a la decisión sobre ImageLab.
- **N sin verificar** — el multiplicador de fan-out (piezas por finding tras el eje idioma, M-12·B) no medido en producción.

### 🟡 Deuda con dueño
- **Fuente para FPHs, NSCF y Lucien** — sin agente de dominio propio.
- **EcosystemBrief** · **M-4b** · **B4 de M-5** (pendientes de la capa de costo/carril).
- **`await` del `upsertSnapshot` en CopyLab** — falta el await (snapshot puede no persistir).
- **Catálogo creativo multiindustria** · **set editorial de vectores** · **`content_type='blog'`** (pendientes del generador unificado).
- **`person_blueprints` de LucienSael** — sin poblar.
- **luciensael.com con North Miami ×4** — repetición de la sede a corregir en el sitio.
- **PatriciaOsorioConectando vs Comunidad** — dos brand_id de la persona sin consolidar.
- **`brand-cache.js` versión 2.0/2.1** y **`action=build_all` con filtro PostgREST inválido**.
- **`packInstructions` de CopyLab forzando CTA** — impone CTA aunque la pieza no lo pida.
- **Idioma ignorado en CopyLab** — voseo pese al parámetro de idioma.
- **`subject` 🟢 PASS en los emails** — el prefijo de PASS se cuela en el subject (revisar M-13).

### 🔴 Ventana de seguridad
- **`VITE_ANTHROPIC_API_KEY` en el bundle** de agent-lab, web-lab y lanzadera-cv — clave de Anthropic embebida en el JS del cliente. Rotar + sacar del bundle.
- **`public.brands` con 78 columnas legibles por anon** en 15 marcas.
- **Schema `intel` expuesto vía PostgREST** (ver "VENTANA PROPIA PENDIENTE (17-jul)" más abajo).

### 📅 Con fecha
- **1-sep** — vence el introductorio de Sonnet 5 (el 2026-08-31). Sonnet 5 pasa a $3/$15 (tarifa post-introductoria; **la canónica vive en `ops_lab_rates`, no como literal**). El cron 38 (06:00 UTC) promueve 2 filas (`previsto→vigente`) y archiva 2 (`vigente→historico`). **Verificar `ops_rate_transitions` ese día, no confiar** en la automatización (el flip de gemini tiene `auto_promote=false`).

---

## 🟡 DEUDAS REINSERTADAS — rescate del Actualiza 14-jul (rama sin PR)

_(Reinserción de deudas, **no** sesión nueva — sin bump de versión de AGENDA. Rescatadas del commit `4772743` (rama `claude/eje-b-sonnet-5-migration-f630ca`, Actualiza 14-15-jul que **nunca se mergeó**). Se rescató **contenido, no el commit**: main avanzó 15 PRs, sus 5 archivos darían conflicto y los derivados de julio meterían drift sobre un `ecosystem.json` de agosto. Solo se reinsertan las deudas que **faltan en main**; lo superado se descartó. Verificado leyendo fuente: **#73** ya cerrado (Orchestrator `api/calibrate.ts` corre sonnet-5 sin parámetros de sampling — lo cerró el sprint CRAFT-01); **#76** superado (Ruta B en `fanout.ts` ya reemplazó el hash sesgado, VIVO 17-jul — `IID/session_log.md`; la parte Watcher→embeddings ya vive como deuda **#11**).)_

- **#74 — Barrido de archivos commiteados en base64 en otros repos (14-jul).** El proxy `gh` devuelve base64; alguien commiteó sin decodificar → `CopyLab/api/process-job.ts` (ya arreglado). Buscar archivos de una sola línea larga terminada en `=`/`==`. — UNRLVL
- **#75 — El typecheck NO bloquea el build en los labs (14-jul).** Causa raíz de que 2 bugs de CopyLab vivieran ~35 días. Evaluar `tsc --noEmit` en CI para CopyLab / ImageLab / SocialLab / Orchestrator. _(Nota: `.github/CLAUDE.md` y el PR template ya piden `tsc --noEmit` **local**; lo que falta es el **gate en CI** que bloquee de verdad — el checkbox manual es justo lo que se saltó durante esos 35 días.)_ — UNRLVL
- **#102 — la `temperature` por destino de `content-run-stage` se perdió con Sonnet 5** (rescatada del Actualiza 14-jul; era `#77`, **renumerada 2026-08-06** al siguiente libre porque el `#77` ya lo ocupa el debt de ForumPHs `incident_updates` "etapa", WhatsApp 21-jul — se renumera el rescatado, sin referencias, no el de ForumPHs). Mover la varianza creativa a instrucciones de **system prompt** (no reintroducir el parámetro: con sonnet-5 un `temperature` no-default da 400). — UNRLVL

---

## 🔴 FORUMPHS — Document Factory: fix pendiente (26-jul)

_(Bloque ampliado del brief v2 — reemplaza la versión simple entregada en PR #25, misma sesión. Los ítems de agenda de ForumPHs viven en `AGENDA.md` por decisión de Sam; `ecosystem.json` no se toca. Detalle en `brands/ForumPHs/session_log.md` §2026-07-26. Skill `acta-repair` v1.0 en `skills/INDEX.md` v1.10.)_

El DF generó el acta de Torres de Castilla como si fuera **otro edificio**: PH "LEY 284 DE 14 DE
FEBRERO" (tomó el nombre de la ley), finca `302855586` (la de **Venezia Tower** con un dígito de
más), asamblea EXTRAORDINARIA/virtual cuando fue la **segunda ORDINARIA presencial**, quórum
declarado 0 (0 %) "superando el mínimo de 157" cuando fueron **221 de 312 (70,83 %)**, y el umbral
del **art. 67** aplicado a una elección de Junta Directiva que se rige por el **art. 74** (131 =
51 % de las 255 al día, no 157). Sección duplicada, cuerpo truncado, 8 secciones vacías, ninguna
unidad de los 5 electos correcta.

**El ICR no podía detectarlo:** es 100 % LLM, sin gates deterministas, y su ground truth es el
acta más `attendance.length` — **no recibe `buildings`, ni el padrón, ni `units`**. Su rulebook
cubre los arts. 62/64/67/83 y **no incluye el 74**: generador y auditor compartían la laguna, así
que la revisión no revisaba. Su `catch` devuelve `APPROVED_WITH_NOTES` ("never block the user's
download") → un ICR que crashea produce un veredicto casi-aprobado.

**Contrato nuevo, tres capas** (runbook `RUNBOOK_FIX_DOCUMENT_FACTORY_v2_2026-07-26.md`):
**CAPACIDAD** (el DF lee los PNG y procesa el formato, no informa de lo que puede resolver) ·
**BLOQUEO único** (si el PH no está en la DB, no hay acta) · **DECISIÓN** (todo lo demás lo decide
el operador informado, y **la decisión queda escrita en el ICR** en una sección propia). La
pregunta no es "¿generás igual?" sino **"¿generar borrador para reparación?"** — sale como
`BORRADOR_ACTA_…`, rótulo NO FIRMABLE, ICR BLOQUEADO por definición.

| # | pendiente | prioridad |
|---|---|---|
| F1 | **Sembrar `registro_finca` + `registro_code` en los 8 PH** (FPHS `buildings`, hoy NULL en 8/8). **Palanca principal**: sin esto el camino "borrador para reparación" es el camino normal para todos los PH | 🔴 |
| F2 | **Corregir el ejemplo canónico de las instrucciones del proyecto ForumPHs** — enseña a nombrar al personal de plataforma ("El señor Daniel Puentes de la empresa Hipal dio la bienvenida…"), contra la decisión del 26-jul. Es la fuente más autoritativa que ven el DF y el skill. **En curso:** la parte de código ya está en PR (`forumphs-document-factory` `fix/acta-omit-platform-personnel` — regla dura en el prompt + doc); Sam corrige el `.docx`/instrucciones del proyecto | 🔴 |
| F3 | **Ejecutar el runbook de fix.** Fase 0 (env vars + logs de `detectPlatform`) **antes** de cualquier PR. §4.1 queda **a verificar**: la captura del preflight muestra `Hypal / Zoom` detectado, no `toc` | 🟠 |
| F4 | **Ivette cierra los 10 hallazgos del ICR** antes de firmar. Los 2 críticos: finca/código inexistentes; y los 6 locales figuran en la plataforma a nombre del **Secretario electo**, que en la misma sesión declaró que son de la promotora con representante propio — con 6 votos detrás | 🟠 |
| F5 | Insertar los **6 locales** `L 01`–`L 06` en `units` con su finca (deuda arrastrada desde el 8-jun) | 🟡 |
| F6 | Reconciliar `buildings.total_units` de Torres de Castilla: **305 → 312** (filas en `units` = 306, reales = 312) | 🟡 |
| F7 | Limpiar `full_name` contaminado en `A 18-C` y `A 28-B` (traen notas operativas dentro del nombre) · verificar finca de `B 27-F` (9 dígitos donde todas tienen 8) | 🟡 |
| F8 | Insertar **Alberto Paul** en `acta_admin_personnel` con rol `asesor_legal_externo` | 🟡 |

**Skill nuevo `acta-repair` v1.0** (`skills/acta-repair/SKILL.md`, INDEX v1.10). Camino de
reparación forense — **no genera actas en volumen, eso es el DF**. Abre con **Regla 0: nunca se
entrega un acta sin su reporte ICR**, incluso sin hallazgos (`APTO PARA FIRMA`) — el reporte es el
acto de haber revisado, no la lista de defectos; la regla existe porque se violó en la sesión y lo
detectó Sam, no el sistema. **Su §2 es el texto canónico del rulebook Ley 284** — corrige la
decisión de `actaConfig.ts` de embeber la ley en código: común y estable no significa que vaya en
código, significa que es dato de **jurisdicción**. Una fuente, dos consumidores.

**Corrección de Ivette (calificó el acta 98/100):** el anexo de asistencia lista **solo presentes o
representados**; las ausentes no aparecen. Estaba a la vista en los dos actas de referencia
(Venezia lista 135 de 182) y no se leyó. **Decisión de Sam:** el personal de la plataforma de
votación no se menciona en el acta.

---

### 🔴 BLOQUEANTE R4B — Proyecto UNIFICACIÓN (cache + generador de texto)
Diseño cerrado en PROYECTO_UNIFICACION_cache_y_generador.md (entregado por Sam a chat dedicado). 3 fases: (1) brand-cache unificado pre-montado por marca con capas especializadas por industria — mata los 3 generadores actuales; (2) CopyLab multiindustria (poblar creative_compatibility_rules editoriales); (3) generador de texto único que hereda de CopyLab + el generador local. Se ejecuta en chat dedicado. NO bloquea la calibración (sigue con el generador local).

### ✅ Watcher — reglas enumeradas por código — CERRADO (29-jul)
**CERRADO 2026-07-29.** (1) **Reglas enumeradas por código:** `intel.watcher_rules` (54 reglas con código citable `HR-*`/`IMG-*`; columnas `subject`/`sector`/`scope` GENERATED brand/sector/gen) + `intel.brand_sector` (9 marcas → RETAIL/LEGAL/PERSONA; UnrealvilleStudio sin sector = la casa). Precedencia por `subject`: **brand > sector > gen**. Parámetros `{{clave}}` resueltos desde `brand_topics.hard_rules`; sin resolver → regla omitida y registrada en `skipped_unresolved`, nunca enviada cruda. `content-watcher` devuelve el código en `watcher_log.gate_detail`. (2) **No-op de `gate4Evidence`:** estaba cableado a UnrealvilleStudio/LucienSael y daba `pass:true` al resto (FPHs/NSCF cruzaban sin ser juzgadas) → neutralizado; el juicio vive en las reglas enumeradas heredadas por sector. (3) **Propagación a bandeja:** badge + `intel.approval_calibration.watcher_rules` / `watcher_rules_evaluated`. `watcher_full_scan` **ENCENDIDO** para recoger corpus (apagar al cerrar la recogida — ver Pendientes nuevos). **PRs:** iid-functions #37/#38/#40 · Orchestrator #17/#18. **Deploys:** `content-run-stage` _53→_57 · `content-watcher` _17→_18 (byte-identidad verificada). **Cobertura ganada:** D7Herbal/VizosCosmetics/VivoseMask/DiamondDetails pasan de 0 a 6 reglas de texto + 6 de imagen heredando de RETAIL, sin calibración manual (D7H cubierta por `claim_medico` por sector). **Bug abierto (diferido a ImageLab):** 12 reglas `IMG-*` sembradas sin gate que las lea; el watcher aún no mira imagen. Ver session_log 29-jul.
_(histórico, pendiente original):_ Pendiente estructurado en PENDIENTE_WATCHER_estructurado.md. Se ataca AL FINAL con corpus de calibración recogido. Catálogo de reglas (HR-/IMG-) listo; falta estructurar reglas con código + gate 6 devuelve código en watcher_log.gate_detail. Incluye bug: watcher no mira imagen.

### ⏳ Pendientes nuevos (2026-07-29 · derivados del cierre del Watcher)
- **Selección y activación de agentes IID + costo por job** — 26 de 27 agentes apagados (solo `iid-brief-biweekly`/jobid 2 activo). **Prerequisito del corpus de calibración** (sin tandas no hay piezas que juzgar). Chat propio.
- **Verificación del publicador** — 2 `scheduled_posts` quedaron en `pending_publish` +24 h después de su hora, sin publicar ni fallar de forma visible. Ningún cron drena `scheduled_posts` (ver session_log 25-jul). Confirmar quién publica y por qué no corrió.
- **`pg_net` + claves `sb_secret_`** — NO son JWT: van en header `apikey`, no `Authorization: Bearer`. Todo el scheduling corre sobre `pg_cron` + `pg_net`. Plazo: fines de 2026.
- **Política de listado del bucket `unrlvl-media`** — público y listable. Tratar junto al hallazgo de `intel` expuesto por PostgREST (ver "VENTANA PROPIA PENDIENTE (17-jul)").
- **Apagar `watcher_full_scan`** al cerrar la recogida del corpus de calibración (hoy ENCENDIDO).
- **Gate de imagen** — 12 reglas `IMG-*` sembradas sin gate que las lea; el watcher no mira imagen. Pendiente de la decisión sobre ImageLab.

## 🔴🔴 FOCO INMEDIATO — (1) ✅ CERRADO 2026-08-16 · RESUELTO POR VÍA ALTERNA (nota completa debajo del encabezado) · (2) ✅ GATE CERRADO (confirmado por Sam 21-jul): rotar pwd Marisol + PatriciaOsorioPersonal en brand_scope YA HECHO hace +10 días — Marisol puede calibrar sin bloqueos · Marisol corre 7 bucles (4 nuevos + Vizos/VizosSalón/Conectando) · destilar VivoseMask (convergida) · brand_topics de las destiladas · deudas DB (#68+#67; #69 REDUCIDA por el alias)

> **🎯 ESTADO REAL DEL FOCO — actualizado 2026-08-16.** El frente de **`comm-arsenal` está CERRADO**:
> el punto (1) de este encabezado quedó resuelto por vía alterna (PR #13 mergeado, los 9 módulos
> reales viven en `Orchestrator/api/craft-modules/`) y el punto (2) lleva cerrado desde el 21-jul.
> **El foco inmediato pasa a las cuentas de Meta de ForumPHs:** la marca **no está en
> `meta_accounts`** y eso **bloquea PUBLICAR el 22-ago** — no bloquea programar, porque el
> `content-scheduler` v2.1 ya está desplegado y puede colocar las piezas. **Dueño: Sam.** Ítem
> abierto en `## 🔵 Próximas semanas`. El resto del encabezado (bucles de Marisol, destilados,
> deudas DB) se conserva íntegro arriba y sigue vigente en segundo plano.

> (1) ✅ **CERRADO 2026-08-16 — RESUELTO POR VÍA ALTERNA.** El plan decía escribir 6 módulos de
> runtime en `unrlvl-context` ANTES del merge del PR #13. Se mergeó el mecanismo (PR #13,
> `feat/craft-modules-runtime`, 7 commits, 15 archivos, checks verdes) y los **9 módulos reales**
> viven en `Orchestrator/api/craft-modules/`, leídos por `_craftModules.ts` con `readFileSync` +
> `includeFiles` de `vercel.json`. Piso garantizado `core + structure`; degradación elegante,
> nunca inferencia. Verificado en el árbol de `Orchestrator@main` y en `core.md` (2.473 b,
> contenido íntegro, cabecera `<!-- CANÓNICO: unrlvl-context/skills/comm-arsenal/runtime/core.md -->`)
> el 2026-08-16.
>
> _Texto anterior del punto (1) en el encabezado, conservado íntegro y sin cortar (el encabezado
> es una sola línea y no admite el bloque):_
>
> «ESCRIBIR LOS 6 MÓDULOS DE RUNTIME de comm-arsenal (destino: skills/comm-arsenal/runtime/) → desbloquea el PR #13 · NO MERGEAR #13 con placeholders (el sistema quedaría PEOR que antes) · Marisol sigue calibrando como hasta ahora hasta el merge»

## 🟢 FRENTE CERRADO — ForumPHs · genoma de conversión + pipeline IID (23/24-jul)

**Los 4 PRs (#23-#26) están mergeados Y desplegados.** ✅ P1 cerrado: `iid-core` `_33` ·
`content-watcher` `_16` · `content-run-stage` `_51`, verificado contra `list_edge_functions` el
23-jul. El handoff de la sesión se escribió con `_32`/`_14`/`_50` y quedó superado el mismo día —
el documento conserva ambos estados. **P2 también cerró el 23-jul** (`platforms_by_destination`
sembrado en las 48 filas por Claude bajo HRD, exhaustividad verificada en ambas direcciones;
`email_propietarios` → `editorial`). **El frente activo pasa a U4 + P4, que van en un mismo PR.**

Handoff completo (estado verificado contra DB + EFs, decisiones cerradas, reglas de voz y gotchas):
`brands/ForumPHs/ESTADO_Y_HANDOFF_2026-07-23.md` · sesión en `brands/ForumPHs/session_log.md`.

| P | pendiente | estado | deuda |
|---|---|---|---|
| P1 | **Deploy de las 3 EFs** (iid-core → content-watcher → content-run-stage) | ✅ **CERRADO (23-jul)**. Falta correr el **smoke test**: pieza `doliente` → CTA de exigencia (no "contáctenos") y `gate_detail.objective_stimulus.stimulus_source` = `"declared"`, no `"inferred"` | — |
| P2 | **Sembrar `platforms_by_destination`** | ✅ **CERRADO (23-jul).** Sembrado en **48/48 filas** por Claude bajo HRD. Exhaustividad verificada en ambas direcciones: `platforms ⊆ union(social,editorial)` 48/48 y `union ⊆ platforms` 48/48 → cero plataformas huérfanas, cero literales fantasma. **`email_propietarios` → `editorial`** (está en `PLATFORM_NO_ADAPT`, objetivo `relacion_de_confianza` → `trust`, y un email educativo respira largo). ⚠️ **LucienSael quedó con split REAL** (`social` = x/meta_fb/meta_ig/tiktok · `editorial` = blog) — de ahí la urgencia de P4 | #85 |
| P3 | **U4 — fan-out parte por plataforma (`platforms=[p]`)** | ✅ **CERRADO (24-jul):** mergeado (PR #27) **y desplegado** (`iid-core` `_35`, paridad byte a byte contra el repo). Ver #86 por las dos consecuencias vivas (volumen ×3-4 y fail-loud de etiquetas secundarias). Histórico: Los 3 prerrequisitos mergeados **y desplegados** (U1 #25 → content-watcher `_16`; U2+U3 #26 → content-run-stage `_51`; datos D1+D2 completos). Cierra por diseño el defecto de `platforms[0]` | #86 |
| P4 | `blog` de LucienSael falta en `PLATFORM_NO_ADAPT` | ✅ **CERRADO SIN CAMBIO (24-jul): estaba MAL ANOTADO** — `BLOG` ya estaba en el set del deploy `_51`. Verificar contra el DEPLOY, no contra el repo. Histórico: la fila editorial de LucienSael materializa `blog` como `platforms[0]` y sin la corrección ese ensayo entra al adaptador con reglas de Instagram. Va con U4 | #87 |
| P5 | Registro de migraciones divergido (3 de 6) | 🟡 `supabase db push` NO es fiable acá → `apply_migration` del MCP | #88 |
| P6 | Umbral de gate5 no comparable entre marcas | 🟡 0.80 no significa lo mismo por marca (UNRLVL ~0.88 / Lucien ~0.72) | #89 |
| P7 | Voice sibling `Ivette-persona` | 🟡 requiere bucle de calibración, no es trabajo de CC | #90 |
| P8 | BI como imán de conversión en el sitio | 🟢 dos caminos abiertos (CTA del diagnóstico / página `/inteligencia`) | #91 |
| P9 | Seguridad `intel` | 🟢 latente, sin cambios hoy → ver "VENTANA PROPIA PENDIENTE (17-jul)" más abajo | — |

**Estado al 24-jul: P1-P4 cerrados.** Lo único que queda de este frente es el **smoke test
post-deploy, que NO se ha corrido y hoy no se puede correr**: `intel.iid_content_queue` e
`intel.iid_findings` están en **cero filas** (último `watcher_log`: 18-jun), así que no hay pieza
sobre la cual verificar. `watcher_dryrun` no es un modo de invocación: es un flag que
`content-run-stage` lee en `job.assets.builder_input` de un job que YA existe. Correrlo exige
sembrar un finding sintético contra `iid-core` y dejar que baje toda la cadena — decisión de Sam,
y escritura a `intel` que va por HRD. Ojo: el dry-run **no** es corrida en seco completa (suprime
`scheduled_posts` y el email, pero igual escribe `watcher_log` y `content_pieces`, actualiza la
fila de queue, y genera copy real con Claude).

**Reparto de `platforms_by_destination` sembrado (23-jul), para el registro:**

| marca | filas | `social` | `editorial` |
|---|---|---|---|
| LucienSael ⚠️ **split real** | 3 | `x`, `meta_fb`, `meta_ig`, `tiktok` | `blog` |
| FPHs Educativa | 7 | `meta_fb`, `meta_ig`, `linkedin` | `blog_forumphs`, `email_propietarios` |
| FPHs Editorial + Conversión | 25 | `meta_fb`, `meta_ig`, `linkedin` | `blog_forumphs` |
| NeuroneSCF | 5 | `meta_fb`, `meta_ig`, `tiktok` | _(idéntico)_ |
| UnrealvilleStudio | 8 | `linkedin`, `meta_fb`, `meta_ig` | _(idéntico)_ |

## 🟠 FRENTE PARALELO — ForumPHs: agente de propietarios por WhatsApp (nuevo 21-jul)
Pivote de FPHS-OPS. Diseño CERRADO, construcción NO iniciada. Agenda propia mapeada en
`brands/ForumPHs/AGENDA_owner_agent.md` (Fases 0-3). **Fase 0 es bloqueante de todo:**
(0.A) normalización de teléfono + email + códigos de unidad + poblar `units.tower` de Lefevre;
(0.B) declaración firmada de acceso (proceso con Ivette + tabla de identidad + GRANT);
(0.C) ingesta Sage 50 (parser bilingüe + config por PH) — sin ella NO hay estado de cuenta
(`arrears`/`mora_mensual`/`payments` = 0 filas hoy).
**GATES DE IVETTE antes de construir:** (1) columna de FECHA en el export estándar de Sage;
(2) alcance del rol `gestor`; (3) carga operativa del onboarding de declaraciones (~1,200 propietarios).
**Piloto:** Venezia (happy path 98%/99%) + Torres de Castilla (estrés 48% teléfono / 99.7% email).
NO mezclar con la centralización contable (proyecto aparte, mediano plazo, solo PHs nuevos).

## 🟠 VENTANA PROPIA PENDIENTE (17-jul) — Frente de seguridad IID
Cadena confirmada pero LATENTE (auth.users vacía → nadie es `authenticated` hoy): schema `intel` expuesto por PostgREST + anon/authenticated con USAGE; `iid_scheduler_config` policy `USING(true)` lee secretos en texto plano; `trigger_iid_agent` EXECUTE a PUBLIC. Cierre transversal (REVOKE USAGE anon/authenticated sobre intel + sacar intel de PostgREST + REVOKE EXECUTE trigger_iid_agent + secretos a Vault + rotar iid_cron_secret/vercel_bypass_secret/x-sweep-secret) NO toca ningún lab (el pipeline corre por service_role). Auditar antes si alguna UI lee intel/content por anon key. Verificar toggle de signup. Con Sam presente.

## 🟢 E5b BACKEND — bucle Boids en producción (D1 + D2) (2026-07-04)

**El backend del text window de calibración está VIVO y verificado end-to-end.** Falta solo el front (#65) para que Marisol lo use.

- **D1 — tablas** `intel.calibration_sessions` (cabecera: brand_id, intent_label, target_voice_id nullable, entry_gate, founder_axis jsonb, status, operator, FK a captured_techniques) + `intel.calibration_turns` (proposed_text, technique_used, verdict_voice, notes_intent, is_convergence_marker, FK CASCADE). Opción B normalizada, GRANTs service_role, trigger updated_at. Decisión: el voice_id técnico es SALIDA (emerge al converger), no entrada; la sesión se ancla en brand_id + intent_label.
- **D2 — endpoint** `/api/calibrate.ts` (Orchestrator): 3 acciones (start/verdict/status), stateful vía D1 (Opción X: lee estado de la DB en cada llamada), generador con **claude-sonnet-5**, convergencia leída de DB (10+3SÍ), memoria anti-repetición (technique_used autodeclarado). Verificado: start crea sesión+turno, verdict genera turno con técnica distinta, status reconstruye. **Round-trip PostgREST con Accept-Profile:intel confirmado** (HTTP + MCP). PR #8 merged.
- **interpret-intent.ts revivido** (PR #7): estaba ROTO en prod (colgaba por firma Web, ni llegaba al fallback 0.3). Migrado a Node-native + claude-sonnet-5. Ahora responde confidence real.
- **Gotchas nuevos:** firma Web-standard `(req: Request): Promise<Response>` CUELGA en este Vercel (504) → usar Node-native `(req, res)`. claude-sonnet-5 antepone bloque `thinking` → concatenar todos los bloques `type:text`, no leer content[0]. Prefill da 400.
- **Professor:** 7 learnings (4-jul). Deudas nuevas #66/#67/#68.

## 🟢 E6 + #45 NeuroneSCF — genoma de conversión + topics (2026-07-02)

**NeuroneSCF quedó OPERABLE end-to-end por el IID** (primera marca de Marisol operable): tiene VOZ (`nscf_conversion` v0.5 activa) + TOPICS (5 brand_topics). El pipeline puede researchear y generar con la voz de la marca, entrando al gate de Sam (auto_approve=false).

- **E6 — genoma `nscf_conversion` v0.5** escrito y activo en `public.brand_voice_genome` (12 dimensiones espejadas de unrlvl_default). Voz de CONVERSIÓN destilada del bucle Boids del 2-jul. 1 de 3 hermanas (+ editorial + professional pendientes, #54). TikTok añadido como capa de texto (guion hablado → futuro nscf_video). Escrito en el CHAT Sam-Claude bajo HRD, no en UI — confirma el circuito E6 diseñado.
- **#45 fase 1 — 5 brand_topics de NSCF** en `intel.brand_topics`: frizz-humidity, color-fade, damage-repair (priority 100) + chlorine-sun, fine-fragile (priority 90). Todos → nscf_conversion, platforms=[meta_fb, meta_ig, tiktok], auto_approve=false, cadencia crescendo. **Arquitectura:** topics de marca de producto/conversión se mapean a PROBLEMAS/PERSONAS reales (brand_personas), no a research abstracto como UNRLVL/Lucien.
- **Professor:** 4 learnings (2-jul, voice_genome). Total del día: 12.
- **Distinción de marca:** NeuroneSCF ≠ Patricia Osorio (PO). Dos marcas distintas de Patricia. Ver deuda #53.

## 🟢🟢🟢 SPRINT SEMBRADOR — COMPLETO (T1-T4 + #48 cerradas)

**El Sembrador está LIVE end-to-end CON FRONT + notificación por email:** Marisol (rol seeder) captura semillas razonadas en el Orchestrator → destilado anti-IP → gate de Sam (rol admin) con corrección inline → handoff a iid-core → fan-out multimarca v22. Dos gates en serie. Auth de dos ejes (rol + scope gerente-de-cuentas). iid-inbound versionado en git. **#48: al entrar a awaiting_approval, email a content-approval@ con enlace al Orchestrator (sin resumen, anti-IP).**

| # | Tarea Sembrador | Estado |
|---|---|---|
| T1 | Limpieza test F3 | ✅ VERDE |
| T2 | Fan-out multimarca iid-core v22 + fanout.ts | ✅ HECHO |
| T3 | Cerebro: iid_seeds + EF iid-inbound v1 + IID-SEEDER | ✅ HECHO |
| T4 | Front IID Seeds + auth rol/scope + iid-inbound versionado | ✅ COMPLETO (26-jun) |
| **#48** | **Approval por email (notifyGate en capture)** | ✅ **COMPLETO + verificado en vivo (27-jun)** |

**#48 entregado (27-jun):**
- **`iid-inbound` v9** (+`notifyGate`, +42 líneas). Email inline en la rama capture al entrar a awaiting_approval. Patrón Resend de content-run-stage (`RESEND_UNRLVL_KEY` + from content@unrealvillestudio.com → content-approval@unrealvillestudio.com), NO el de nscf-mailer. Fire-and-forget (await + catch que traga; nunca tumba el capture). Asunto = neutral_topic con etiqueta `[IID Seed · pendiente]` (con domain) / `[IID Seed · sin mapear]` (sin domain). Enlace a raíz del Orchestrator (no hay routing por URL).
- **PR #5** en `unrlvl-iid-functions` mergeado (Sam). Rama borrada. Versionado mantenido.
- **5 verificaciones pasadas** (vía stub temporal `iid-notify-test` + curl local de Sam; stub borrado): con-domain ✅, sin-mapear ✅, failed-no-email ✅, fire-and-forget-no-tumba ✅, enlace correcto ✅.
- **Corrección v8→v9:** el deploy ya estaba en v8 (redeploy benigno sin cambio de código, idéntico al git sha ce0e29b). #48 entró como v9. El contexto registraba v7 — desfase numeración git↔deploy, sin pérdida.

**T4 entregado (26-jun):**
- **Repo `unrealvillestudio-hub/unrlvl-iid-functions`** (private) — iid-inbound versionado (PRs #1-#5) + `supabase/migrations/`. Salda parcialmente deuda §43 para esta EF.
- **Auth dos ejes en iid-inbound** (patrón nscf-b2b-approve): bcryptjs@2.4.3 cost 10, JWT HS256 djwt 8h, matriz PERMISSIONS fail-closed. Login solo contraseña. Scope = modelo gerente-de-cuentas (regla dura server-side). Marisol = seeder, 6 marcas. Secrets ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.
- **Front IID Seeds (Orchestrator, mergeado):** login+ojo, gating por rol, captura razonada (seeder_rationale + seeder_brand_suggestion), cola de approve admin (corrección inline, failed, out_of_scope). Verificado por Sam en Preview.
- **iid_seeds +2 columnas:** seeder_rationale, seeder_brand_suggestion. GRANT SELECT brands→service_role.

**⚠️ Pendientes operativos de Sam (no bloquean):**
- **Rotar las 2 contraseñas temporales** (TempSam2026!/TempMari2026!) antes de que Marisol entre en producción real. Opción limpia: script local sin compartir → regenerar JSON → recargar solo secret de usuarios.
- Byte-parity dura de iid-inbound cuando haya supabase CLI (functions download + git diff). Riesgo bajísimo (solo comentarios).

## 🔵🔵 SPRINT #47 — Modo Expert/Boids — E1-E3b + E5a CONSTRUIDOS · Fase 1 captura COMPLETA · Fase 2 (calibración) PRÓXIMA

**Qué es:** subsistema PERMANENTE de onboarding de marcas (efímero por-marca, reusable para UNRLVL con cada cliente nuevo). Construir voces/genomas a partir de análisis de técnica de creadores (método Boids). Dos fases.

**Diseño cerrado (decisiones con Sam, ancladas en código real verificado):**
- **A — Vía D → server-side (post-HEVC): frames con ffmpeg en el servidor + Cloud Vision OCR.** El canvas en el navegador falló con HEVC → `/api/extract-frames` (ffmpeg server-side, cualquier códec). Video sube al bucket vía signed upload URL, transita segundos, se borra. OCR vía Google Cloud Vision reusando la credencial Vertex.
- **B — tabla `intel.captured_techniques`** (Genoma). Precursora de `brand_voice_genome`. ✅ LIVE E1.
- **C — dos fases.** Fase 1 (captura+OCR) CONSTRUIDA. Fase 2 (calibración por convergencia = bucle Boids) = E5b (UI, Claude por API) + skill `genome-calibration` (E7).
- **Quién opera:** Marisol captura Y calibra dentro de su scope (experta de dominio). Candados: scope server-side (NUNCA Lucien/UNRLVL); el INSERT a brand_voice_genome lo dispara SIEMPRE Sam en el chat.

| E | Etapa | Entregable | Estado |
|---|---|---|---|
| E1 | DDL | `intel.captured_techniques` + GRANT + índices | ✅ **LIVE (27-jun)** |
| E2 | Storage | bucket `iid-expert-uploads` privado (protagonista server-side) | ✅ **LIVE (27-jun)** |
| E3-EF | EF OCR | `iid-expert-ocr` (Vía D: frames + Cloud Vision) — ahora con flag `persist` (E5a) | ✅ **LIVE** |
| E3b | Server-side | extract-frames ffmpeg (E3b-1) + signed upload (E3b-2) + cron huérfanos (E3b-3) + prueba Marisol (E3b-4) | ✅ **COMPLETO (1-jul)** |
| E4 | iid-inbound expert_* | **ABSORBIDA — NO se construye.** iid-expert-ocr ya hace la captura Expert autónoma; expert_* sería duplicación. El approve de técnicas Expert es Fase 2, no E4. | ✅ **cerrada (absorbida, 1-jul)** |
| **E5a** | **Pestaña única IID Seeds** | captura OCR unificada + bifurcador Seed/Genoma. PRs #5 (front) + #9 (EFs) + #6 (fix imagen) mergeados. Migración iid_seeds aplicada. | ✅ **CERRADO — imagen+video × Seed+Genoma verdes en producción (1-jul)** |
| **E5b** | **Text window calibración (bucle Boids)** | **BACKEND + FRONT EN PRODUCCIÓN (6-jul):** D1 (calibration_sessions + calibration_turns) + D2 (/api/calibrate.ts, ahora 4 acciones start/verdict/status/list, claude-sonnet-5) verificados end-to-end. FRONT (#65) CERRADO: text window UI en el Seeder (toggle Capturar/Calibrar), selector marca scope-gated, retomar sembradas / crear from_scratch, veredicto + progreso reflejo, convergencia, enlace gold conectado, from_genome = stub honesto. +columna verdict_operator (quién juzga ≠ quién siembra). PR #9 Orchestrator merged. | ✅ **COMPLETO — backend + front (#65) en prod (6-jul)** |
| **E5c** | **Convergencia extensible (cierre por el operador)** | El umbral 10+3SÍ ya NO auto-cierra: **SUGIERE** (flag `can_converge`). Cierre = acción explícita `converge` del operador + guardia de umbral 409 (backend valida QUÉ es cerrable, operador decide CUÁNDO). `can_converge` en el progress de verdict/status/start; botón "Cerrar y calibrar voz" en el front; quién cerró en `calibration_sessions.notes` (jsonb existente, sin columna nueva); racha de SÍ sobre turnos juzgados (ignora el turno pendiente). PR #11 Orchestrator merged. | ✅ **MERGEADO (PR #11, 10-jul)** |
| E6 | Aprobación/escritura genoma | mecánica scope-gated + firma Sam en INSERT, en el CHAT Sam-Claude (no UI). **EJERCIDO por 1ª vez con nscf_conversion (2-jul).** | ✅ **probado (2-jul, NSCF)** |
| E7 | Skill | `skills/genome-calibration/SKILL.md` v1.0 — el Tratado. Protocolo del bucle Boids + gate Sam-Claude. | ✅ **ESCRITO + pusheado (2-jul)** |
| E8 | Resumen retomable | render de `technique_summary` como handoff Fase 1→Fase 2 | 🔵 mapeado |
| E9 | GenomePromptBuilder (refuerzo del generador) | El generador de `/api/calibrate.ts` ensambla el CONTEXTO REAL de la marca desde Supabase (5 capas: identidad `brands` / voz `brand_copy_profiles` / fórmula `product_blueprints` / servicios `brand_services` / dirección `founder_axis`), degradación elegante por capa, regla dura de veracidad, max_tokens→2048. Mata la alucinación de ingredientes. +módulo `api/_genomePromptBuilder.ts`, +`sbSelectPublic`. GRANT SELECT `product_blueprints`+`brand_services`→service_role. (Hito DISTINTO del E7=Tratado; nombrado E9 para no colisionar la numeración.) | ✅ **MERGEADO (PR #10, 10-jul)** |

**Descubrimiento de diseño E5a:** Basic y Expert NO son dos modos — la captura es idéntica; solo difiere el DESTINO (Seed→contenido / Genoma→voz), elegido al final. Por eso una sola pestaña. Corrección anti-IP: la regla es "no republicar el post", NO "no leer el post" — leer el OCR para aprender tema+método está permitido (insumo de aprendizaje). Ambos destinos procesan OCR.

**Contrato E5a (2 sesiones CC paralelas, acople-por-contrato):** iid-expert-ocr gana flag `persist` (true=persiste captured_techniques / false=devuelve ocr_text sin persistir, para Seed); iid-inbound capture acepta `ocr_text`+`capture_intent`; migración aditiva iid_seeds. Genoma→iid-expert-ocr(persist:true); Seed→iid-expert-ocr(persist:false)→iid-inbound capture.

**Orden CC:** E5b → sesión apuntada a `Orchestrator` (+ posible EF si el bucle necesita backend de estado). El allowlist se fija al arrancar.

## 🟡 #45 brand_topics de las marcas de Marisol — PARCIAL (NeuroneSCF hecha; faltan 5 + default)
**NeuroneSCF ya OPERABLE (2-jul):** 5 topics sembrados → nscf_conversion. Ya no está dormida. **Faltan:** las otras 5 marcas de Marisol. ✅ **D7Herbal ya tiene genoma (10-jul, `d7herbal_conversion` v1.0)** — le falta SOLO brand_topics. Las 4 restantes (VivoseMask, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando) tienen eje fundador sembrado (6-jul) + UI lista (#65) + **E7 vivo** (fórmula real desde turno 1); el cuello de botella es correr los 4 bucles (Marisol vía Seeder) → genomas + topics — + la persona `default` de NSCF. Sin topics, capture destila pero approve falla con "domain sin suscriptores"; sin genoma (E5b/E6) el agente produce off-brand. Arquitectura confirmada: topics de producto/conversión → personas reales (brand_personas), no research abstracto. Sesión propia con HRD por marca. Ver #45.

**Notas del Sembrador:**
- Multimarca por construcción: sumar marca a un domain = INSERT en brand_topics + 1 línea en CHECK. Cero código.
- Gobernanza: iid-inbound + iid-expert-ocr + storage-orphan-sweep versionadas. Resto de EFs IID sin repo (deuda §43).
- Acople 4B: iid-inbound→iid-core por HTTP (contrato duro).

---

## 🔴🔴🔴 R4B — RECONEXIÓN FASE 3 + endurecimiento Watcher (paralelo al Sembrador)

**Estado base:** Fase 3 transporte REPARADO (dispatcher v27 transporta domain). El Sembrador alimenta la queue por el carril humano; R4B cierra el carril automático + publicación real.

| # | Item | Estado | Dueño |
|---|---|---|---|
| 5e-1 | ✅ **CERRADO 2026-08-16 — RESUELTO POR VÍA ALTERNA.** El plan decía especificar el Scheduler; se **construyó** (PR #57), se **corrigió** (#59, #60) y está **desplegado v2.1**. Verificado sobre la EF `content-scheduler` desplegada el 2026-08-16. **`verify_jwt: false`** — se desplegó primero con `true` y el gateway rechazaba antes de llegar al código (`UNAUTHORIZED_NO_AUTH_HEADER`): el carril autentica por `x-cron-secret`, no por JWT. **Sigue abierto el alta del cron**, tras verificación con candidatas reales — ver `## 🔵 Próximas semanas`. — **Texto anterior del ítem, conservado íntegro:** «Scheduler content-scheduler (EF+cron 1×/día ET). Mapea (brand_id+domain)→brand_topics, Interpretación A, jitter ±45min, ventanas ET, sibling-stagger ≥48h, escribe scheduled_for» · **estado anterior, conservado:** «🔴 ESPECIFICADO, desbloqueable (write ya en v41)» | ✅ CONSTRUIDO Y DESPLEGADO v2.1 (cron pendiente) | Chat 1 |
| 5e-2 | gate1+gate5 → pgvector (Vertex gemini-embedding-001 @768). **⚠️ PARCIAL 2026-08-16:** `intel.content_embeddings` **creada** con `vector(768)` + índice HNSW + GRANT `service_role`; **falta el cableado** — los gates 1 y 5 de `content-watcher` siguen usando `semanticSimilarity` contra Claude. **Parcial es abierto** (`skills/context-resolver/SKILL.md` §2): no se archiva. · **estado anterior, conservado:** «🟢 DESBLOQUEADO» | 🟡 PARCIAL — tabla sí, cableado no | Chat 2 |
| 5e-3 | Gates 2/3 → BLOQUEANTES (flag OFF) | ⏳ tras 5e-2 | Chat 2 |
| 5e-4-disp | Parche dispatcher: AND scheduled_for <= now(). NO tocar .limit(1) | ⏳ acoplado al Scheduler | Chat 1 |
| 5b | IID publicación real (Meta) — CHAT DEDICADO. Verificar cuentas Meta Lucien/SamPublisher. Gatilla approve-piece v14. | 🔴 | Lucien/UNRLVL |
| 5r | rejected_reason en approve-piece — rechazos manuales se pierden | 🔴 | UNRLVL/Lucien |

**Eje B (post-Sembrador / dentro de R4B):** matriz estímulo validada + Ruta B + Gate 7 (objetivo↔estímulo) + Gate 8 (similitud visual, GREENFIELD embeddings). Pendiente regenerar como spec de IMPLEMENTACIÓN con 2 decisiones (objective_by_platform jsonb + migrar texto Y visual a embeddings). Detalle en session_log §9 (24-jun b).

### 📁 ARCHIVADO 2026-08-26 — `✅ INCIDENTE RESUELTO (17-jul) — content-dispatcher-poll`

_Movido **íntegro** a `historical_AGENDA.md` → «Migración 2026-08-26». No se borró: se archivó.
Cumplía las tres condiciones — **cerrado con efecto medido** (el cron jobid 29 pasó de 3859 fallos
consecutivos a `succeeded` sostenido tras el DROP + recreate del overload de `trigger_iid_agent`),
**40 días**, y **cero referencias activas** verificadas por barrido sobre este archivo. El bug latente
de los ~24 crons `iid-*-research/process` que el texto anotaba **quedó cerrado por el mismo fix**._

### Bloqueos que requieren ACCIÓN DE SAM
| # | Acción de Sam | Desbloquea |
|---|---|---|
| ✅ Vertex creds en Supabase (22-jun) | 3 secrets cargados | 5e-2/5e-3 |
| ✅ Secrets auth Sembrador (26-jun) | ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET | front IID Seeds |
| ✅ Cloud Vision API habilitada (27-jun) | proyecto gen-lang-client-0491381650 | E3 OCR |
| ✅ JWT secret alfanumérico sincronizado (28-jun) | chars especiales no matcheaban cross-platform | auth E3b-1 |
| ✅ service_role LEGACY (eyJ) en Vercel (28-jun) | la nueva sb_secret_ no sirve para Storage privado | E3b-1 Storage |
| ✅ MERGEAR PR #3 (E3b-1) + #4 (E3b-2) + #8 (E3b-3) | mergeados 1-jul | E3b |
| ✅ PRUEBA REAL de Marisol (E3b-4) | VERDE 1-jul (fila 3c40f492). E3 CERRADO. | cierre E3 ✅ |
| ✅ MERGEAR PR #5+#6 (E5a front) + #9 (E5a EFs) + aplicar migración iid_seeds | mergeados 1-jul; migración aplicada por MCP; E5a en producción | E5a ✅ |
| ✅ PUSH Tratado genome-calibration v1.0 + INDEX v1.6 + session_logs (2-jul) | pusheados y verificados vivos | E7 ✅ |
| ✅ MERGEAR PR #7 (interpret-intent fix) + PR #8 (calibrate) — E5b backend (4-jul) | merged; verificados end-to-end en Preview; CC limpió sesiones de prueba | E5b backend ✅ |
| ✅ MERGEAR PR #10 (E7 GenomePromptBuilder) + PR #11 (E5c convergencia extensible) — Orchestrator (10-jul) | merged; el generador ensambla el contexto real de marca (mata alucinación); la convergencia la cierra el operador (converge + guardia 409). Smoke Preview verde a nivel API antes de cada merge; sesiones throwaway limpiadas | E7 (builder) + E5c ✅ |
| ✅ DF: crear UNRLVL_SUPABASE_URL + GRANT service_role (4-jul) | env var Prod+Preview + GRANT SELECT df_platform_parsing_config → detectPlatform lee config | DF multi-plataforma |
| 🔴 DF: re-deploy EF fphs-formalize con verify_jwt:false si Sonnet 5 la tocó (4-jul) | el cambio de modelo puede requerir re-deploy; el default verify_jwt:true rompe con 401 | formalización DF |
| 🔴🔴 ROTAR contraseñas temporales Sembrador (TempMari2026!/TempSam2026!) — GATE PREVIO a que Marisol corra los bucles | con #65 vivo Marisol opera los bucles en prod real; sus credenciales temporales son el bloqueo operativo previo a su entrada. La registrada no coincide con la real; expuestas en sesiones. JWT secret en 2 lugares (Supabase+Vercel) → rotar en ambos. **URGE MÁS (10-jul):** D7Herbal quedó calibrada end-to-end (E7 + bucle + genoma activo) — el sistema está probado; las otras 4 marcas sembradas esperan solo a que Marisol pueda entrar. | Marisol corre los bucles Boids |
| 🔴🔴 GATE UNIFICADO (11-jul): rotar pwd de Marisol **Y** agregar `PatriciaOsorioPersonal` a su `brand_scope` — AMBAS cosas viven en el MISMO lugar: el secret `USERS_RAW` de la EF `iid-inbound` (dashboard Supabase → Edge Functions → Secrets; JSON array {sub, role, brand_scope, hash}). Sin esto Marisol no puede operar en prod Y no ve la marca nueva PatriciaOsorio.com (las voces nuevas de NSCF/D7H sí las verá, ya están en su scope). Hacerlas JUNTAS. | Marisol opera los 7 bucles + ve PatriciaOsorio.com |
| 🔴 Destilar VivoseMask (convergida 15 turnos, 11-jul) | genoma candidato pendiente — E6 en chat bajo HRD. Segunda marca en converger. | genoma VivoseMask activo |
| 🟡 Rotar STORAGE_SWEEP_SECRET | se pegó en chat 1-jul (blast radius mínimo); regenerar + actualizar command de crons 35/36 | higiene |
| 🟡 DEUDA: migrar service key a SUPABASE_SECRET_KEYS nueva | cuando Storage acepte el formato nuevo; NO deshabilitar legacy | limpieza |
| 🟡 DEUDA naming: ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET | arrastra "NSCF", gobierna toda la auth IID; renombrar junto con rotación | limpieza |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar | crescendo Scheduler |
| brand_topics 5 marcas restantes de Marisol (#45) (ejes fundadores ya sembrados 6-jul, faltan bucles + topics) | Decidir domains por marca (NeuroneSCF ✅ hecha 2-jul) | Sembrador produce para Patricia |
| Aprobar learnings Professor | ✅ 28 (24+27-jun) + 6 E3b-1 + 3 (28-jun b) + 14 (1-jul) + 12 (2-jul) + 9 (3-jul DF) + 10 (4-jul DF multi-plataforma) + 7 (4-jul E5b backend) + 3 (6-jul E5b front) + 10 (10-jul bucle Boids: E7+E5c+genoma D7H, 5 críticos) + 8 (11-jul siembra de ejes + regla dura de voz, 5 críticos) + 18 (17-jul tanda técnica IID: 8 críticos score 5) + 10 (13-jul: 5 arsenal PSY + 5 fórmula/rol/skill/protocolo) + 12 (18-jul: familia voice completa + sprint CRAFT-01; 3 críticos score 5: el placeholder no dispara el fallback / la capa de traducción intermedia crea fallo silencioso / dos audiencias dos vocabularios) aprobados · 22 pendientes (mayo) | Professor |

---

## ✅ #5i — GENOMA v1.0 DE LUCIEN — CERRADO (19-jun)
Destilado por muestreo (8/10 marcadas Lucien). core_move reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (lucien_editorial + lucien_social). Professor: 6 learnings. Validación pendiente: 2-3 piezas IID real post-R4B. NOTA: el gate Boids-Lucien (Claude propone, Sam juzga SÍ/NO, converge) es el MODELO del bucle E5b y del skill E7.

---

## 🟢 LISTO PARA CC
| 1 | luciensael.com repo+Vercel+DNS | Lucien |
| 2 | UNRLVL Field Notes push | UNRLVL |

---

## 🔴 CRÍTICO — Esta semana (resto)
| # | Item | Marca | Blocker |
|---|---|---|---|
| 5p-b | Lucien necesita preset imagelab (caso sin-preset no probado con imagen real) | Lucien | — |
| 6 | Voice Genome Fase 5 — OnboardingApp. signature_closer por voz. | UNRLVL | — |
| 7 | ✅ **DF análisis de regresión + Bloque 1 + R4 (PR #13 merged, EF v39) — CERRADO 3-jul.** 5 regresiones mapeadas con causa en código. R2 reorden (orden cronológico Opción A) + R4 numeración (1.–8. + QUÓRUM con tilde) + R1 (falso positivo de R2, confirmado: Ivette también conserva los 2 momentos) + R3 fragmentos (EF fphs-formalize v39, acta -21%) resueltos. Barrido único en UI (0/1/2). Principio: dedup se marca no se corrige. Ver session_log 3-jul. | ForumPHs | HECHO |
| 8 | ✅ **DF Bloque 2 (R5) — MERGEADO (PR #14) 4-jul, pero INERTE.** Marcas ICR inline construidas correctamente PERO no aparecen en el .docx: (a) page.tsx `runGenerate(blocks, [])` pasa icr_findings=[] a /api/generate (el auditor /api/icr corre DESPUÉS); (b) findings internos tienen location "Cuerpo del acta" no "sección N" → findingsForSection no matchea. El anexo ICR viejo tampoco se renderizaba nunca (misma causa). Anexo eliminado OK, warning dedup OK. Ver #57. | ForumPHs | mergeado pero inerte → #57 |
| 8b | ✅ **DF SPRINT PARSER MULTI-PLATAFORMA — CERRADO 4-jul.** Primer paquete no-Venezia (Lefevre 75/TOC) expuso parser calibrado 100% a Hypal/Venezia. PR-A #15 skeleton (extractPHName reconoce "PROPIEDAD HORIZONTAL"+ancla real anti-"Joseph Ayala"; extractAssemblyType contempla "GENERAL EXTRAORDINARIA" sin default silencioso; extractDate ancla a "celebrada el"; cross-check filename↔contenido). PR-B #16 (detectPlatform auto-detección leyendo df_platform_parsing_config; segmentación TOC prose_paragraph; fix xlsx). PR-C #17 (fix detectHeaderRow coords colapsado→absoluto; banners visibles; logging degradación; copy sin "Hypal"; migración claude-sonnet-5 thinking:disabled). Los 3 PRs mergeados. Verificado vivo: Lefevre → TOC detectada, 117 asistentes, Sonnet 5, ICR 14 hallazgos. | ForumPHs | HECHO |
| 9 | DF: pre-flight de Ivette — input donde declara representantes de admin de ESA asamblea antes de generar → alimenta classifyRoles paso 2 como dato verificado → reduce [ROL NO VERIFICADO] | ForumPHs | diseño aparte |
| 10 | Ayra Sprint 0 ⚠️ VENCIDO (5 Jun) | UNRLVL | Reprogramar |

---

## 🟡 Esta quincena
| 5c | IID propios de Lucien. Liga 5i. | Lucien |
| 5d | Destino 14 IID-* viejos | UNRLVL |
| 5f | Quitar .limit(1) — SOLO tras publicación real | UNRLVL |
| 5m | Borrar EFs efímeras (stubs 410) | UNRLVL |
| 5n | Barrer to: sam@ hardcodeado | UNRLVL/multi |
| 12 | NSCF-Console Fase 3 — PRÓXIMO FOCO NSCF | NeuroneSCF |
| 13 | NSCF Shopify infra SESIÓN DEDICADA | NeuroneSCF |
| 14 | SocialLab dual-mode re-test | UNRLVL |
| 15 | Cuentas Lucien/SamPublisher | Lucien/SamPublisher |
| 16 | Context System refactor — RIESGO ALTO | UNRLVL |
| 17 | VideoLab launch (videolab active=false) | UNRLVL |
| 18 | TikTok Pixel duplicado NSCF | NeuroneSCF |
| 19 | Meta MCP fix v21 | UNRLVL |
| 20 | Portal Iván sprint 2 | NeuroneSCF |
| 21 | Klaviyo flows NSCF | NeuroneSCF |
| 40 | Klaviyo key hardcodeada | NeuroneSCF |
| 41 | Verificar keys Resend | ForumPHs/UNRLVL |
| 42 | model ID hardcodeado + 13 EFs one-off | UNRLVL/NeuroneSCF |
| 22 | Genoma UNRLVL social | UNRLVL |
| 24 | Email marketing FPHs (cada marca su key) | ForumPHs |
| 25 | ForumPHs creación cuentas | ForumPHs |
| 35 | CLAUDE.md repos restantes | UNRLVL |
| 49 | **`unrlvl-supabase-mcp:get_logs` ROTO** — 404 (verificado sigue roto 4-jul, no momentáneo). Workaround: conector Supabase genérico get_logs con project_id amlvyycfepwhiindxgzw. OJO: solo trae logs de EDGE FUNCTIONS, no de rutas Next.js/Vercel (esas van a los logs de Vercel). | UNRLVL |
| 50 | **DF: ledger de costos** — una fila/acta en `ops_token_sessions` (cost=(in/1M*3)+(out/1M*15)); fphs-formalize debe DEVOLVER tokens y dejar de escribir por su cuenta (neutralizar `logTokensBatch` doble-conteo). PR #5 CERRADO sin merge (approach UNRLVL_SERVICE_KEY-en-DF abandonado). | ForumPHs |
| 51 | **DF: soporte multi-candidato VotationRecord** — elección Tesorero hoy queda `[ELECCIÓN MULTI-CANDIDATO — PENDIENTE DE PROCESAR]`. | ForumPHs |
| 52 | **DF: reemplazar `/api/icr` "Claude open" por Agente Experto permanente** — auditoría Ley 284 embebida + curaduría visual de imágenes (corrección tipo-$300M y validación de identidad = criterio legal, viven aquí). | ForumPHs |
| 53 | **DEUDA `po_consumer` mal asignado (2-jul)** — fila po_consumer v0.6 activa bajo brand_id=NeuroneSCF probablemente es voz de PO-persona (asesora "no convence, clarifica"), no de la distribuidora Neurone. NeuroneSCF ≠ marca personal de Patricia. Verificar y reasignar brand_id a la marca de PO correspondiente. También verificar si PO como marca tiene brand_topics propios en Meta+TikTok (si no → revisión). NO tocada (fila activa). | NeuroneSCF/PatriciaOsorio |
| 55 | **DF deuda R4 (3-jul):** colisión de nº de sección si una convocatoria NO empieza por quórum (el punto 1 de agenda y la sección hardcodeada de quórum podrían chocar en el nº 1; invisible antes de R4 porque los números estaban ocultos). Señalado, no arreglado para no regresar el caso estándar Venezia. | ForumPHs |
| 56 | **DF: "APROBACIÓN DEL ORDEN DEL DÍA" sin header propio (3-jul)** — el parser (extractAgendaItems) no la extrae como agenda_item; el ICR la marca ALTO/Estructura (la numeración salta 1→3). Fix en parseResumen/parseTranscripcion, PR futuro. | ForumPHs |
| 57 | **DF: cablear ICR→generate (R5 quedó inerte) — SPRINT NUEVO (4-jul).** page.tsx debe correr /api/icr ANTES de /api/generate (o regenerar tras el ICR) para que icr_findings llegue poblado; y los findings (internos + auditor) deben traer nº de sección o findingsForSection debe matchear "Cuerpo del acta". Sin esto, las marcas ICR inline de R5 nunca aparecen. | ForumPHs |
| 58 | **DF: QA↔ICR desconectados — DEUDA CONOCIDA-Y-ACEPTADA (Sam 4-jul).** El QA da PASS/100%/lista sobre acta que el ICR declara BLOQUEADA (4 críticos). QA valida estructura, no contenido. Sam decide vivir con esto MIENTRAS el ICR atrape (el ICR es el que importa). Fix futuro: QA debe FAIL cuando ICR bloquea. NO urgente por decisión de Sam. | ForumPHs |
| 59 | **DF: marca [ICR] dentro del .docx — PENDIENTE (Sam 4-jul) · ABIERTO.** Ligado a #57 (sin cableado no hay marcas que mostrar). Dejado como pendiente aceptado. **Ref (26-jul):** se resuelve en **PR-4/PR-7 del runbook de fix del DF** — las marcas `[ICR]` salen del body del `.docx` y van al reporte ICR, con granularidad **por hablante** en vez de por bloque. NO se cierra: queda abierto hasta ejecutar esos PRs. | ForumPHs |
| 60 | **DF: segmentación TOC de baja densidad (4-jul).** Transcripción TOC real casi sin cues de locutor (7 bloques/426 párrafos). El DF avisa (gap no-bloqueante) y no pierde texto, pero la calidad depende del export del proveedor TOC. Ivette solicita a HIF/TOC export con etiquetas de hablante. No es bug del DF. | ForumPHs |
| 61 | **DF: SDK @anthropic-ai/sdk@0.24.3 viejo (4-jul)** — predata el param thinking (se usa passthrough runtime). Actualizar el SDK en algún momento. | ForumPHs |
| 62 | **🔴 DF: campos hardcodeados Venezia en UI (4-jul → 🔴 26-jul)** — placeholders "ej: 30285586"/"ej: 8706" en PreflightForm (datos de Venezia). Barrer residuos Venezia-céntricos de la UI. **⚠️ ACTUALIZADO 26-jul — la consecuencia real NO era cosmética.** Esos placeholders contienen la finca y el código **reales de Venezia Tower**, y el acta de Torres de Castilla salió con `302855586` (el placeholder con un dígito de más) como finca de otro PH. **Un texto de ejemplo en un formulario nunca debe ser un dato verdadero de un cliente.** Entra como **PR-0 del runbook de fix**, junto con: el default `"de la Junta Directiva"` en los campos de nombre (terminó firmando el acta), `TIPO`/`MODALIDAD` mostrados como inferencia **no editable**, la fecha de la tarjeta tomada del sistema en lugar de la asamblea, y la ausencia de campo manual para resultados de votación (el contenido principal del acta no tiene ruta de recuperación). | ForumPHs |
| 63 | **DF: normalización unidades formato "E 01A"/"O 01B" de Lefevre (4-jul)** (letra de sección + código). splitUnitTower puede no manejarlo. PR de normalización aparte. | ForumPHs |
| 64 | **DF: mover LOGISTICA_NAMES a config (4-jul)** (Daniel Puentes/Hypal, Paula Cebaros/TOC) a df_platform_parsing_config.extra para no hardcodear coordinadores por plataforma. | ForumPHs |
| 65 | ✅ **#47 E5b FRONT — text window del bucle Boids CERRADO (6-jul).** UI en Orchestrator (Seeder de Marisol): toggle Capturar/Calibrar, selector marca scope-gated, retomar sembradas / crear from_scratch, bucle veredicto + progreso reflejo, convergencia, stub honesto from_genome. Backend +list +verdict_operator. PR #9 merged, verificado en vivo. Professor: 3 learnings. | UNRLVL | HECHO |
| 66 | **Skill de verificación de versiones de modelo (NUEVO 4-jul).** Chequeo cada ~15 días de los model IDs en uso vs docs oficiales de Anthropic → warnings de IDs retirados. Nació de encontrar claude-sonnet-4-20250514 enquistado en interpret-intent (roto en prod). Diseño propio: qué fuentes consulta, cómo detecta drift, dónde corre el cron. | UNRLVL |
| 67 | **Barrer endpoints con firma Web colgados (NUEVO 4-jul).** interpret-intent estaba ROTO en prod silenciosamente por firma Web-standard (cuelga en este Vercel). Barrer si hay OTROS endpoints /api/* con la misma firma colgados. Familia higiene de infra. | UNRLVL |
| 68 | **RLS deshabilitado en intel — ALCANCE PRECISADO + SUPERFICIE CRECIDA (18-jul).** Son exactamente 6 tablas sin RLS: `brand_topics`, `calibration_sessions`, `calibration_turns`, `captured_techniques`, `iid_seeds`, `watcher_log`. Las 7 `iid_*` SÍ tienen RLS habilitado (verificado sobre `pg_class.relrowsecurity`, 18-jul). El 18-jul `calibration_sessions` sumó 3 columnas (voice_type/target_artifact/psy_family) que exponen criterio de voz de marcas de CLIENTES → el material expuesto es más sensible que antes. Sigue LATENTE (`auth.users` vacía). Nota original 4-jul: Detectado por advisory de Supabase en D1. Acceso 100% service_role server-side vía /api/calibrate.ts (cliente nunca toca las tablas) → riesgo bajo hoy. Endurecer (ENABLE RLS + policies) = decisión de Sam, familia deudas RLS/GRANT del IID. También: max_tokens:1024 del generador quedó justo con el bloque thinking de sonnet-5 por delante — vigilar truncado con piezas largas. | UNRLVL |
| 69 | **Operación B — consolidación de IDs de marca PO — REDUCIDA (el patrón ALIAS desactivó la parte peligrosa, 11-jul).** El alias (mantener el `id` técnico + poner el nombre real en `display_name` + `domain`) hace innecesario renombrar IDs y repuntar 28 FKs + 8 archivos en 7 repos. YA APLICADO con PatriciaOsorio.com (reutilizando `PatriciaOsorioPersonal`, ID intacto). Lo que QUEDA de #69 es UPDATE de contenido + convención de display_name para las otras IDs de Patricia (`PatriciaOsorioComunidad`, `PatriciaOsorioConectando`, `PatriciaOsorioVizosSalon`/VizosSalon — con brand_context duplicado literal entre sí): manejable en chat bajo HRD, ya NO requiere runbook transaccional ni sesión especial. PRECONDICIÓN a verificar por CC: que ningún front parsee el `id` para MOSTRAR nombre (si ya lee `display_name`, el alias es transparente). Histórico (approach previo, ya innecesario): (a) fundir Comunidad→Conectando; (b) renombrar VizosSalon con 28+7 FKs ON UPDATE NO ACTION; (c) retirar Personal — descartado a favor del alias. | UNRLVL/PatriciaOsorio |
| 70 | **Correcciones de datos DB desalineados de marcas (NUEVO 6-jul).** Descubierto en la siembra: varias filas de public.brands tenían datos FALSOS, no solo incompletos. ✅ Vizos Cosmetics corregida (era laboratorio/fabrica/ads/naturales → casa diseñadora institucional maison, solo orgánico, Healing Systems, en brands+brand_copy_profiles+humanize_profiles). PENDIENTE barrer el resto: VizosSalon (display_name/brand_context colapsan salón con Patricia-persona y la encasillan en colorimetría — es estilista COMPLETA; positioning incompleto). Además: el es-FL/Spanglish de las tablas viejas → neutro DONDE la audiencia lo pida (VizosSalon neutro por multicultural; Conectando mantiene es-FL por comunidad latina íntima — el idioma sigue a la audiencia). Ligado a #53 (po_consumer). | UNRLVL/Marcas |
| 71 | **Corregir header del blog NSCF (NUEVO 11-jul) — viola la REGLA DURA DE VOZ.** El header de neuronescflorida.com/blogs/hair-intelligence-1 dice "Sin promesas vacías — solo lo que realmente funciona": NOMBRA la promesa para negarla, lo que la instala en el lector y le hace pedirla. Corrección de copy del sitio (la voz demuestra, no declara; nunca construir por oposición). | NeuroneSCF |
| 72 | **Revisar genoma `po_consumer` bajo la regla dura (NUEVO 11-jul).** La fila `po_consumer` (activa) declara `authority_invoked_by: ["trayectoria (35 años)","tres continentes"]` → contradice la regla dura ("nunca declarar autoridad; el dato preciso ES la credencial"). Revisar bajo el principio "demuestra, no declara". Distinto y complementario a #53 (que es la mala asignación de brand_id de la misma fila). | NeuroneSCF/PatriciaOsorio |
| 73 | ✅ **CERRADO — ya lo estaba desde el 17-jul (verificado en DB el 21-jul).** `fphs_conversion` v1.0 ACTIVA (created 17-jul 20:33) y `fphs_institucional` v0.5 desactivada el mismo día. La AGENDA lo arrastró 4 días como pendiente; `voice-conversion` §5 sí lo tenía bien. **Auditado el 21-jul: el genoma está SANO** (rol anclado al Régimen, autoridad/promesas/oposición prohibidas, blanco = patrón). NO se recalibró. Rasgo que excede el perfil estándar y conviene subir al skill: su `argumentative_architecture` resuelve el **decisor doble** — la JD impulsa pero la asamblea ratifica, así que la voz le entrega al miembro de JD argumentos **defendibles ante los propietarios**. **LECCIÓN: verificar el estado ACTUAL de una deuda antes de arrastrarla** (segunda vez que pasa en ForumPHs — ver Venezia `unit_code` el 21-jul a). | ForumPHs |
| 74 | **🔴 SPRINT CRAFT-01 — PR #13 ABIERTO Y BLOQUEADO (18-jul).** El arsenal llega al runtime del bucle de calibración. HECHO: DDL aplicado en prod (3 columnas aditivas nullable en `intel.calibration_sessions`); `api/_craftModules.ts` (builder puro/síncrono, hermano de `_genomePromptBuilder`, degradación elegante, log que separa `skipped`=ausencia DECLARADA de `errors`=fallo de LECTURA y lista lo OMITIDO, no solo lo inyectado); 9 placeholders en `api/craft-modules/` con cabecera de provenencia canónica; wiring en `calibrate.ts` (validación, persistencia, artefacto en el prompt, reorden de bloques, prompt caching, `craft_warnings`); `includeFiles` en vercel.json; front del Seeder (3 selectores + aviso no bloqueante); migration file. Técnica de carga: `fs.readFileSync(join(process.cwd(),...))` + includeFiles (evita `__dirname`, que no existe bajo ESM nodenext, y una llamada de red por turno). BLOQUEOS PARA MERGE: (a) los 9 módulos están VACÍOS — Claude escribe los 6 canónicos en `skills/comm-arsenal/runtime/`, Sam los pushea, brief corto a CC los copia sobre los placeholders; (b) QA §8 casos 5-6 (live) nunca se corrieron (CC los declaró "verificados por construcción" — honesto, pero no es verificado); requieren Preview deploy. **NO MERGEAR ANTES:** el placeholder se lee correctamente → va a `injected`, no a `errors` → el fallback NO dispara → el `craftBlock` vacío REEMPLAZA el paréntesis enumerativo actual → sistema PEOR que antes. | UNRLVL |
| 75 | **🟡 `craft_warnings` mapea frase→frase, no código→frase (18-jul).** El front NO recibe los códigos crudos (`ARTEFACTO NO DECLARADO`): el backend ya los reduce a frases en `craftWarnings()` y el front mapea frase→frase para mostrarlas legibles. Si alguien toca la frase intermedia del backend, el mapa del front deja de acertar EN SILENCIO (el operador ve el texto intermedio; nada rompe, nada se loguea) — el mismo patrón de fallo enmascarado que este sprint perseguía. CC lo detectó y NO lo arregló porque el brief decía "backend fuera de alcance" (comportamiento correcto; el error de alcance fue de Claude). REGLA: mapear siempre sobre el CÓDIGO estable, nunca sobre texto legible intermedio. Corregir en el MISMO PR donde se sustituyan los placeholders (ahí ya se toca `api/`, coste marginal cero). | UNRLVL |
| 76 | **🟢 Sacar la advertencia de asimetría de `r4b-genome-calibration` §3 al mergear #13 (18-jul).** El skill v1.1 advierte que el camino "Sam en el chat" carga la familia voice y el camino "delegado vía Seeder" NO (porque `calibrate.ts` no lee skills) → las dos vías no producen la misma calidad. Es CIERTO mientras el PR #13 esté abierto. **Deja de serlo en el momento del merge** → sacarla entonces, como último paso del sprint. Si no se anota, en tres semanas nadie recuerda por qué ese párrafo está ahí. | UNRLVL |
| 77 | **FPHS-AGENTE: `visible_to_owner` en `incident_updates` (21-jul).** El flag NO existe. `notified_owner` es "¿ya se le avisó?", no "¿puede verlo?". Sin él, las notas internas del administrador (la "etapa" que escribe en el dashboard) serían legibles por el propietario. **Prerrequisito de Fase 2.** Columna aditiva nullable + GRANT en la misma migración. | ForumPHs |
| 78 | **FPHS-AGENTE: dashboard de tickets — DEUDA HEREDADA DE FPHS-OPS (21-jul).** El agente reemplaza la cara al PROPIETARIO de OPS, no la cara al ADMINISTRADOR. Alcance mínimo: ver tickets + timer SLA + cambiar estado (usar los SEIS existentes, no inventar tres) + escribir la "etapa" en `incident_updates`. Permisos: Ivette/supervisión todos los PHs, administradora solo el suyo. La "etapa" es el puente que permite al agente informar avance real en vez de solo estado. Prerrequisito de Fase 2. | ForumPHs |
| 79 | **FPHS-DATOS: `units.tower` de Lefevre vacío (21-jul).** Lefevre tiene DOS torres (Este/Oeste, confirmado por Ivette) pero `tower` está NULL. Es derivable del propio `unit_code` (`01-E-A`→Este, `01-O-B`→Oeste). Afecta al factor de desambiguación de propiedad del agente. Escritura simple, va con su propio HRD. | ForumPHs |
| 80 | **FPHS-SAGE: export sin columna de FECHA (21-jul).** Los tres exports analizados traen `Invoice/CM #` pero NO fecha de factura. Ivette confirmó que el producto es "estado de cuenta con HISTORIAL DE MOVIMIENTOS" — sin fecha no hay cronología. Algunos IDs la traen embebida (`REC-09-D-11062026`) pero no de forma consistente ni en cuotas ordinarias. **Pedirlo AHORA en la estandarización del export cuesta poco; descubrirlo a mitad de construcción cuesta un sprint.** | ForumPHs |
| 81 | **FPHS-SAGE: licenciamiento (21-jul).** CINCO PHs (Plaza España, Lefevre, Firenze, Parque Central, Luxor) comparten serial `34892-DC83-A5F1-DEDF` y Customer ID `4007208843`, contradiciendo lo reportado ("cada PH su licencia"); la mayoría con **Plan Level: Expired** (solo Torres de Castilla tiene Business Care activo). No es dominio técnico de UNRLVL, pero es visible en los datos y conviene que Ivette lo sepa — se ordena de paso con la centralización de PHs nuevos. | ForumPHs |
| 82 | ✅ **CERRADO (23-jul) — FPHS-VOZ: brand_topics, LAS 3 VOCES SEMBRADAS.** Se sembraron los **18 topics de `fphs_conversion`** (9 dominios × 2 frentes: 9 `jd` + 9 `doliente`), con lo que ForumPHs llega a **32 filas** en `intel.brand_topics` (32/32 con `objective_by_platform`, 18/32 con `audience_frame`). Columna nueva `audience_frame` + 6 etiquetas de objetivo + `hard_rules.blog_enlace` en las 32 + `hard_rules.fuente_bi` apuntando a `brand-intel/forumphs/bi_2025.json` en las 18 de conversión. Queda FUERA de #82 y sigue vivo: el eslabón de runtime (que el scheduler R4B #5e levante estos topics) y **sembrar `platforms_by_destination` (#85)**, sin lo cual el fan-out no sabe a qué destino va cada plataforma. Texto histórico del ítem abajo. | ForumPHs |
| ~~82~~ | _(histórico, 22-jul)_ 🟡 **FPHS-VOZ: brand_topics — 2 de 3 voces SEMBRADAS (22-jul).** ✅ `fphs_educativa` (7 topics) + `fphs_editorial` (7 topics) sembrados en `intel.brand_topics`, todos active/auto_approve=false, con angle+objective_by_platform+cadence+hard_rules. ForumPHs es la **primera marca del sistema con objective_by_platform poblado** (resto NULL, #44) → gate7/gate8 con datos. FALTA: sembrar `fphs_conversion` (9 dominios, DOBLE FRENTE jd/doliente, con el BI real detrás) — mapa + candado de confidencialidad del BI ya persistidos en `fphs_conversion.application_constraints`, se leen cargando el genoma. Sesión propia por ser la más grande y delicada (cifras reales sin filtrar identidad). El eslabón de runtime (que el scheduler R4B #5e levante estos topics) sigue pendiente aparte. | ForumPHs |
| 83 | **🟡 FPHS-VOZ: los 2 `humanize_profiles` de ForumPHs no se verificaron contra las voces nuevas (21-jul b).** Existen desde antes de la familia de voz actual. Si contradicen a `fphs_educativa`/`fphs_editorial`, el pipeline humaniza en dirección opuesta a la voz destilada. Revisar y alinear. Ligado a #70 (datos de marca desalineados). | ForumPHs |
| 84 | **🟡 `brand_voice_genome.maturity` usa DOS convenciones (21-jul b).** Las filas nuevas escriben `calibrated`; las viejas escriben la versión (`v1.0`, `v0.5`). No rompe nada hoy porque nadie filtra por ese campo, pero con 10 genomas activos y creciendo conviene unificar antes de que alguien escriba un `WHERE maturity=`. Decidir convención canónica y hacer un UPDATE de normalización. | UNRLVL |
| 85 | ✅ **CERRADO (23-jul) — IID: `platforms_by_destination` sembrado en las 48 filas.** Por Claude bajo HRD. **Exhaustividad verificada en ambas direcciones:** `platforms ⊆ union(social,editorial)` en 48/48 y `union ⊆ platforms` en 48/48 → cero plataformas huérfanas (las que dejarían de publicarse sin warn) y cero literales fantasma. **`email_propietarios` → destino `editorial`** (deja de ser `[NV]`): está en `PLATFORM_NO_ADAPT`, su objetivo declarado es `relacion_de_confianza` (→ `trust`) y un email educativo respira largo — `social` lo empujaría a "pieza corta y filosa". ⚠️ **Efecto colateral que activa #87:** LucienSael quedó con **split real** (`social` = `x`/`meta_fb`/`meta_ig`/`tiktok`, `editorial` = `blog`), así que su fila editorial materializa `blog` como `platforms[0]`. Reparto completo en la sección "FRENTE ACTIVO" de arriba. Texto histórico del ítem abajo. | UNRLVL/ForumPHs |
| ~~85~~ | _(histórico, 23-jul)_ **🔴 IID: `platforms_by_destination` sin sembrar — 0 de 48 filas (23-jul). BLOQUEANTE ACTIVO.** La columna se creó y el código de #23 ya la consume, pero el propio PR declaró la siembra fuera de alcance ("lo ejecuta Claude con Sam bajo HRD"). **TRAMPA DOCUMENTADA: el split es EXHAUSTIVO** — una plataforma que esté en `platforms` y no aparezca en ningún destino **deja de publicarse, sin warn**; la unión de los dos arrays debe cubrir `platforms` completo salvo baja deliberada. Vocabulario real verificado: `meta_fb` 48 · `meta_ig` 48 · `linkedin` 40 · `blog_forumphs` 32 · `tiktok` 8 · `email_propietarios` 7 · `x` 3 · `blog` 3. Propuesta para las 32 filas FPHs: `{"social":["meta_fb","meta_ig","linkedin"],"editorial":["blog_forumphs"]}`; las 7 con `email_propietarios` necesitan decisión de Sam (¿editorial o canal aparte?). Escritura a `intel.brand_topics` = Claude con Sam bajo HRD, **no CC**. | UNRLVL/ForumPHs |
| 86 | ✅ **CERRADO (24-jul) — IID U4 mergeado (PR #27) Y DESPLEGADO** (`iid-core` `_35`, verificado idéntico al repo por paridad byte a byte). El fan-out ya parte por plataforma: una fila de queue por (marca × voz-de-destino × plataforma) con `platforms=[p]`. ⚠️ **Dos consecuencias vivas ahora en prod:** (1) el **volumen de piezas por finding se multiplica** — FPHs 1→4, NSCF 1→3, UNRLVL 1→3, Lucien 2→5; U1 (#25) es lo que evita que gate5 las mate como duplicados; (2) al leerse el objetivo de TODAS las plataformas y no solo el de `platforms[0]`, **una etiqueta no mapeada en plataforma secundaria —invisible hasta ahora— detiene esa marca** con `ObjectiveLabelError`. Es el fail-loud buscado, pero puede detener marcas que "funcionaban". Texto histórico abajo. | UNRLVL |
| ~~86~~ | _(histórico, 23-jul)_ **🟠 IID U4 — fan-out parte por plataforma (`platforms=[p]`) (23-jul).** Los 3 prerrequisitos ya están en `main`: U1 (#25), U2+U3 (#26), datos D1+D2. Decisión de arquitectura del 21-jul: **Corte A** — con `platforms=[p]` de un solo elemento, P2/P4/P5/P6 del diseño quedan correctos sin tocar una línea. **Cierra por diseño el defecto de `platforms[0]`:** hoy 25 de 32 filas FPHs resuelven su preset desde `linkedin` (su `platforms[0]`), así que el caption de Meta hereda voz de LinkedIn. **NO escribir parche intermedio — U4 lo tira.** | UNRLVL |
| 87 | ✅ **CERRADO SIN CAMBIO (24-jul) — el pendiente estaba MAL ANOTADO.** Verificado contra el código **desplegado** (`content-run-stage` `_51`), no solo contra `main`: el set ya es `{BLOG, BLOG_FORUMPHS, EMAIL_PROPIETARIOS}` — `BLOG` **ya estaba**. Las 3 filas de LucienSael con literal `blog` nunca recibieron reglas de Instagram. Cero líneas de código. **LECCIÓN (tercera vez en ForumPHs, ver #73 y Venezia `unit_code`): verificar el estado ACTUAL de una deuda antes de arrastrarla — y verificarlo contra el DEPLOY, no contra el repo.** Texto histórico abajo. | LucienSael/UNRLVL |
| ~~87~~ | _(histórico, 23-jul)_ **🟠 IID: `blog` de LucienSael quedó fuera de `PLATFORM_NO_ADAPT` (23-jul).** CC metió `blog_forumphs` y `email_propietarios`; las 3 filas de LucienSael con literal `blog` siguen recibiendo reglas de Instagram. Es UNA línea. **#26 no se da por cerrado hasta resolverlo.** ⚠️ **SUBE DE PRIORIDAD con el sembrado de #85:** LucienSael quedó con split REAL, su fila `editorial` materializa `blog` como `platforms[0]`, y sin esto el ensayo entra al adaptador con reglas de IG. **Va en el mismo PR que U4 (#86).** Verificar primero contra el código desplegado (`_51`) si el literal falta de verdad o si el pendiente estaba mal anotado; si ya está, cerrar sin cambio. | LucienSael/UNRLVL |
| 88 | **🟡 Registro de migraciones divergido — `supabase db push` NO es fiable en este proyecto (23-jul).** 3 de 6 migraciones del repo no figuran bien en `schema_migrations`: `20260716220000_brand_topics_objective_by_platform` (no registrada), `20260701120000_iid_seeds_add_ocr_text_capture_intent` (no registrada), `20260626190000_...seeder_brand_suggestion` (registrada con otro version, `20260626202248`). **Consecuencia operativa: usar `apply_migration` del MCP**, que sí registra (las 3 del 23-jul quedaron bien). Ventana propia de saneamiento. | UNRLVL |
| 89 | **🟡 El umbral de gate5 no es comparable entre marcas (23-jul).** Hallazgo de M1: 0.80 no significa lo mismo por marca — UNRLVL ronda 0.88 por repetición de esqueleto, Lucien ~0.72. Un umbral único trata como duplicado lo que en una marca es su propia voz. Deuda anotada, no resuelta. | UNRLVL |
| 90 | **🟡 FPHS-VOZ: voice sibling `Ivette-persona` (23-jul).** La familia de marca está completa (conversión + educativa + editorial); falta la voz de la PERSONA. Requiere sesión de calibración (bucle Boids) con Sam — **no es trabajo de CC**. Ligado a la fórmula marca↔persona (la persona lleva Profesional/Educativa/Editorial). | ForumPHs |
| 91 | **🟢 FPHS-SITIO: el BI como imán de conversión (23-jul).** Decisión tomada: el BI completo **no** va en la home (mata la curiosidad y regala metodología; "as bajo la manga, punto de cierre no de entrada"). Dos caminos abiertos para otra sesión: **(A)** reescribir el CTA del diagnóstico para prometer un informe como el BI + capturas parciales; **(B)** página `/inteligencia` dedicada, enlazada desde la sección de quotes. | ForumPHs |
| 92 | **🟠 REGLA DE DEPLOY DE EFs — la transcripción manual queda DESCARTADA (24-jul, transversal a todo el ecosistema).** Nace de una falsa alarma con `iid-core`: se desplegó U4 por MCP transcribiendo el archivo a mano y se sospechó que la transcripción había perdido una línea de `assignPsychoPreset`. **No estaba rota** — el deploy `_35` resultó byte a byte idéntico a `main` — pero el método sí quedó descartado por decisión de Sam. **Incluye la vía MCP:** `deploy_edge_function` exige `files:[{name,content}]`, o sea que el contenido pasa ESCRITO por quien llama (45 KB entre `index.ts` y `fanout.ts`). **Canal correcto:** `supabase` CLI 2.109.1, ya instalada y logueada — `functions download --use-api` para verificar y `functions deploy` para subir desde disco, con los bytes yendo de la API al disco sin intermediario. **3 falsos-verdes que este incidente fijó:** (a) invocar la EF y ver que responde NO verifica su contenido — una variable sin declarar es `ReferenceError` en EJECUCIÓN, no error de parseo (Deno hace type-stripping, no type-check), así que arranca igual; (b) un `ezbr_sha256` que no cambia entre dos deploys NO significa "no entró el cambio" sino "el segundo deploy no cambió nada" (el contador sube igual); (c) `diff` repo↔deploy SIN `--strip-trailing-cr` sale 100 % falso positivo (repo en CRLF, deploy en LF). **PENDIENTE:** correr la paridad dura sobre las otras EFs versionadas (§43) — hoy solo `iid-core` está verificada. | UNRLVL |
| 93 | **🔴🔴 IID: `iid-core` genera copy con voces HARDCODEADAS → el 79 % del ecosistema es INERTE en el carril automático (24-jul).** `iid-core/index.ts` tiene `const SUPPORTED = new Set(["unrlvl","lucien"])`; `voiceFamily("fphs_conversion")` da `fphs`, que no está → `voicesToGenerate` vacío → sin `content_versions` → **`fanOut` ni se llama**. Respuesta: `success:true` con `queue_entries:0`, sin error ni fila. **37 de 47 topics activos (79 %) no producen nada:** ForumPHs (32), NeuroneSCF (5) y toda marca futura de Marisol **nacen inertes**, tengan genoma y topics o no. **NO se arregla ampliando `SUPPORTED`**: `iid-core` escribe la copy con `VOICE_GUIDES` a mano en el propio archivo, así que ampliar obligaría a duplicar a mano lo que ya vive calibrado en `brand_voice_genome` — el hardcode que el eje B vino a matar, y una marca nueva volvería a requerir cambio de código. **DISEÑO DECIDIDO (auditoría CC 24-jul, `docs/AUDITORIA-93_veredicto.md`):** se descarta el "brief neutro" generado por LLM; `fanOut` encola SIEMPRE que haya suscriptor y escribe `aife_output = {content:{content: title + summary del finding}}`, que es lo único que alguien lee aguas abajo → cero cambios en el resto de la cadena, sin llamada extra a Claude. `raw_versions` **no lo lee nadie** (2 escrituras, 0 lecturas en los 5 repos). Decisión que queda abierta para Sam: **cómo migrar `unrlvl` y `lucien`**, que hoy escriben desde `VOICE_GUIDES` y pasarían a escribir desde su genoma — el texto va a cambiar, no es "degradar o no". Documento: `unrlvl-iid-functions/docs/DEUDA_93_94_multimarca_iid_core.md`. | UNRLVL/IID |
| 94 | ✅ **CERRADO (24-jul, PR #29) — el guard `IID_FANOUT_EMPTY` tenía un punto ciego.** El guard nació para cazar el silencio "success:true con 0 filas" (que según su propio comentario costó **tres semanas** de diagnóstico), pero su condición `voicesToGenerate.length > 0` lo desactivaba **justo** cuando la familia de voz no está soportada: la marca caía en el punto ciego del guard diseñado para eso. Arreglo: bloque puro `U94` (`classifySubscribers`) + `console.error` nombrando **marca + voz + familia derivada** y apuntando a #93. `voiceFamily` entra por parámetro para que el test inyecte la MISMA función de producción y las dos derivaciones no puedan divergir. **NO lanza** — el `throw` cambiaría el comportamiento de los dominios solo-NSCF que hoy pasan mudos: **decisión pendiente de Sam**, y el único resto abierto de este ítem. Con esto, cualquier marca inerte GRITA aunque #93 todavía no la haya migrado. | UNRLVL/IID |
| 95 | ✅ **CERRADO (24-jul) — B, D, A y C entregados.** Secuencia aprobada B → D → A → C. **B** (ImageLab #6): `sb()` fail-loud, distingue ausencia legítima de fallo de query. **D** (iid #32 + ImageLab #7): canal canónico por alias explícito, `email_propietarios` → `NONE` sin imagen (por **entregabilidad** del correo, no por costo), normalización case-insensitive que rescata los 4 presets de NeuroneSCF. **A** (ImageLab #8): las 4 columnas fantasma corregidas — `imagelab_palette` descartada, `person_blueprints.imagelab_style` deliberadamente NO cableado (es blueprint de PERSONA, lo elige un humano en la UI, y de las 4 marcas del carril solo NSCF tiene uno). **C** (ImageLab #9): builder unificado marca+preset+global con el estímulo en ambas ramas y degradación limpia. Comparativa hecha: LucienSael 0→8 ejes técnicos; el caso de riesgo UNRLVL/INSTAGRAM_FEED gana 6 ejes y **no pierde ninguno**. **Queda solo el DEPLOY** (app Vercel, flujo propio) y, si se quiere, la comparativa en imágenes —que exige un preview deploy—. Texto original del diagnóstico abajo. | UNRLVL/ImageLab |
| ~~95~~ | _(histórico, 24-jul — el diagnóstico que abrió el frente)_ **🔴🔴 IMAGELAB: la identidad visual de marca está DESCONECTADA — el 100 % del carril produce imagen genérica (NUEVO 24-jul, hallazgo de la auditoría de #93).** `ImageLab/api/execute.ts` consulta `brands.imagelab_style`, `imagelab_palette` e `imagelab_negative`: **las tres columnas NO EXISTEN** (las reales son otras catorce — `imagelab_visual_identity`, `imagelab_film_look`, `imagelab_lens_preset`…). PostgREST devuelve **400** y el helper `sb()` lo traga (`if (!res.ok) return null`) → sin estilo, sin paleta, sin negativo de marca → el prompt queda `{subject} + {injection_visual} + "professional photography, high quality, 8k…"`. **Es exactamente la imagen genérica que Sam declaró que NO quiere.** Misma familia de fallo que el `order=` por columna inexistente del 10-jul: capa muda. Estado verificado: ForumPHs (32 topics) sin presets y sin identidad → genérico; NeuroneSCF tiene 4 presets pero en canal `blog_featured`, que el IID **nunca emite** (solo emite TIKTOK/LINKEDIN/INSTAGRAM_STORIES/INSTAGRAM_FEED) → genérico; LucienSael tiene la identidad **cargada** y ImageLab no la lee → genérico. **Una sola combinación de todo el ecosistema produce hoy imagen con carácter de marca: UnrealvilleStudio en INSTAGRAM_FEED.** Además, cuando SÍ hay preset el `psycho_preset` **no llega al visual** (`buildPromptFromPreset` no lo recibe): identidad y estímulo nunca coinciden en la misma imagen, lo que deja a gate8 comparando descriptores que no reflejan ni marca ni objetivo. **VA ANTES QUE #93**: afecta al 100 % (vs 79 %), es más barato y no depende de nada. Tres piezas: (1) apuntar el `select` a las columnas reales; (2) que `sb()` deje de tragar el 400 —mismo principio que #94—; (3) poblar la identidad visual de ForumPHs y UnrealvilleStudio y decidir el vocabulario canónico de `canal`. **DECISIÓN DE ARQUITECTURA PARA SAM:** ¿el visual deriva del genoma de voz o son dos ejes legítimamente distintos? Hoy están desconectados *de hecho*, no por decisión — y cada recalibración de voz aumenta la divergencia. | UNRLVL/ImageLab |
| 96 | **🟡 VIDEOLAB no está alineado con el carril y no debe enchufarse todavía (NUEVO 24-jul).** `lab_configs`: `active:false`, `iid_stage_order:NULL` — no participa. `VideoLab/api/execute.ts` es un **wrapper directo de Kling** (submit→poll, JWT HS256, 270 s): **sin `brandId`, sin `previousOutputs`, sin builder de prompt propio, sin consultar ninguna tabla**. Comparado con CopyLab (lee `brand_voice_genome`) e ImageLab (tiene builder propio, aunque roto por #95), VideoLab no tiene fuente de identidad de ningún tipo. **Prerrequisito: cerrar #95 primero** — debe copiar el patrón de ImageLab YA ARREGLADO, no el roto; enchufarlo antes garantiza dos deudas gemelas. Después: tabla `videolab_presets` (motion, ritmo de corte, duración por escena, texto en pantalla), que `execute.ts` acepte `brandId`+`previousOutputs` y arme el prompt adentro, y resolver la **latencia**: Kling es submit→poll con presupuesto de 270 s contra decenas de segundos del resto de los stages — no entra en la cadena secuencial actual sin rediseñar el encadenado o sacarlo a un carril post-aprobación. **Caso no previsto y real:** un formato visual-primero (Reel donde el video ES el mensaje y el copy es subtítulo) invierte la cadena copy→visual. Con el video como formato DERIVADO el diseño actual aguanta; como formato PRIMARIO es rediseño, no ajuste. | UNRLVL/VideoLab |
| 97 | **🟠 EL FALLBACK MUDO A `INSTAGRAM_FEED` ESTÁ REPLICADO TRES VECES (24-jul).** Mismo patrón, tres sitios, dos ya cerrados: **(1)** el copy — `PLATFORM_RULES[...] ?? INSTAGRAM`, cerrado por **P-e** con alias explícito + warn; **(2)** el visual en `content-run-stage` — el `else` de la derivación del canal, cerrado por **#95-D** (PR #32) con el mismo remedio; **(3)** ⬜ **`lab-worker`**, que sigue abierto: `normalizeCanal(canal) { return (canal ?? 'INSTAGRAM_FEED').toUpperCase(); }`. Verificado bajando la EF con la CLI el 24-jul. Es **menos grave** que los otros dos —el canal le llega de `lab_jobs`, que `trigger-job.ts` escribe con default explícito, así que el `??` casi nunca dispara— pero es el mismo mecanismo: si algún día llega `null`, la pieza va a Instagram sin que nadie lo sepa. **Queda fuera del alcance de #95-D a propósito:** `lab-worker` es EF **sin repo** (§43), así que tocarla es otro PR, otro snapshot y otro deploy. Arreglo: avisar cuando el `??` dispare, en vez de caer callado. **LECCIÓN TRANSVERSAL, que es lo que de verdad hay que retener:** cuando se cierra un fallback silencioso en una capa, **buscar el mismo patrón en las capas hermanas antes de dar el ítem por cerrado** — P-e cerró el del copy en julio y el gemelo del visual sobrevivió tres semanas más porque nadie lo buscó. | UNRLVL/IID |
| 98 | **🟡 `lab-worker` manda dos literales de canal en MINÚSCULA, fuera del vocabulario visual (24-jul).** `canal: 'instagram_feed'` (línea 408) al llamar a **SocialLab**, y `canal: 'email'` (línea 440) al llamar a **CopyLab** en el carril de secuencias de email. **Ninguno de los dos llega a ImageLab**, así que no entran en el vocabulario visual canónico de #95-D y no son un bug hoy — se registran para que nadie los tome como contraejemplo de la convención en MAYÚSCULAS: pertenecen a otro eje. **Dato útil que dejan:** ya existe un canal `email` para CopyLab, lo que refuerza que `email_propietarios` tenga tratamiento propio en el plano visual (`NONE`, #95-D) en vez de forzarlo a un canal de imagen. Revisar si conviene un vocabulario de canal unificado entre planos, o si son ejes deliberadamente separados. Ligado a #97 (misma EF, mismo PR cuando se toque). | UNRLVL/IID |
| 99 | ✅ **CERRADA (24-jul) — la pregunta estaba MAL PLANTEADA.** Presuponía paridad entre iguales, y no la hay. **Resolución de Sam:** *"ImageLab surgió cuando aún no había pensado en un modo async; el async ocurrió prácticamente por su cuenta. Uso el modo async de base, nunca la UI. Los flujos operativos a los que apunto son industriales, vía Claude-Ayra → Orchestrator → Labs."* No hay dos caminos que igualar: hay un **flujo operativo** (async) y un **accesorio de uso puntual** (UI). **El estímulo pertenece al flujo async.** La UI no se parcha para declararlo — **se reconvierte para consumir el mismo flujo**, y eso es la deuda #100, no un ajuste dentro de C. Para #95-C significó: builder capaz de recibir `psycho_preset` con **degradación limpia** cuando no llega; el camino sync degrada, y ese es el estado **esperado y correcto** hasta la reconversión. **LECCIÓN DE MÉTODO, que es lo que más valor deja:** ni Claude ni CC habían leído el código de la UI antes de opinar sobre esta deuda — Claude recomendó una salida y propuso un mecanismo ("un default sensato que el usuario puede cambiar") que **presuponía cosas sobre una UI que nadie había mirado**. La investigación posterior (`docs/INVESTIGACION-99_ui_imagelab.md`) encontró que el selector de estímulo **ya existía y ya estaba cableado**, que estaba **muerto por falta de env vars**, y que **la UI ni siquiera ejecuta el builder** que se estaba discutiendo. Es el mismo patrón que costó tres retrabajos en la sesión: **opinar sobre la representación en vez de leer la fuente.** Texto original de la deuda abajo. | UNRLVL/Producto |
| ~~99~~ | _(histórico, 24-jul — la pregunta tal como se planteó)_ **🔴 DECISIÓN DE PRODUCTO ABIERTA — ¿el camino SYNC debe declarar estímulo psicológico? (24-jul). Bloquea el cierre de #95-C.** Verificado bajando `lab-worker`: el camino [B] (Orchestrator → lab-worker → ImageLab) **nunca manda `psycho_preset`**. El `params` completo es `{canal, aspect_ratio, idioma, extra_instructions}` — no hay estímulo ni `subject`. En el carril IID [C] sí llega (`content-run-stage` lo pasa desde `iid_content_queue`). **Choca de frente con el objetivo declarado por Sam:** *"que async y sync utilicen el mismo flujo completo, exceptuando el trigger, para garantizar que los outputs tengan el mismo ADN de generación"*. Si un camino declara estímulo y el otro no, **no hay paridad de ADN: hay dos generaciones distintas**. Las dos salidas son legítimas y la elección es de producto, no de cableado: **(a)** el estímulo es propio del carril automático —donde la marca sembró `objective_by_platform`— y el modo UI es exploratorio por diseño; o **(b)** la UI también debe declararlo, y entonces hace falta un selector de estímulo en la interfaz (nota: `ImageLab/src/services/psychoPresetLoader.ts` **ya existe** y ya sabe construir la inyección visual — la pieza está, falta cablearla al camino async). **#95-C deja el builder capaz de recibirlo desde ambos caminos, con degradación limpia si no llega — pero no lo implementa hasta que Sam responda.** | UNRLVL/Producto |
| 100 | **🟡 RECONVERTIR IMAGELAB (Y VIDEOLAB) AL MODELO ASYNC — plan escrito, EN PAUSA (24-jul).** Nace del cierre de #99. Prioridad explícita de Sam: **"no es prioritario siempre que el modelo async funcione end-to-end"**. Plan completo en `unrlvl-iid-functions/docs/PLAN-100_reconversion_imagelab_videolab.md`. **Diagnóstico:** 8 rasgos "diseñados para sync" (S1-S8). El raíz es **S1 — el prompt se arma en el NAVEGADOR** y se manda ya terminado, así que `buildVisualPrompt` (todo lo que #95 arregló) **no se ejecuta jamás** para ese camino: no es que le falten datos, es que no pasa por el builder. Le siguen el catálogo de marcas hardcodeado (**agregar una marca es un deploy, no un `INSERT`**; faltan ForumPHs, UnrealvilleStudio, LucienSael y SamPublisher), los 12 arquetipos de escena en TypeScript, los blueprints elegidos a mano, y **S8: sin env vars de Supabase en producción** — que no es diseño sino **configuración rota**, y bloquea el resto. **Se conserva:** el builder unificado de #95-C es el DESTINO, no algo a rehacer; `mergeVisualSpec`/`composeVisualPrompt` son puros; el selector de estímulo ya existe y funciona; el vocabulario de canal de #95-D queda resuelto y NO se reabre. **P1 = cargar `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`: dos variables, cero código, y es la mejor relación valor/costo de #95 y #100 juntos** — revive el selector de estímulo Y la lista real de marcas (antes: revisar RLS, son `VITE_*` y se publican en el bundle). **VIDEOLAB:** corrección a un reporte previo — **sí tiene** loader (`videoLabLoader.ts`) que lee `brands.imagelab_visual_identity` y 6 columnas `videolab_*`; la mitad UI conoce la marca, la mitad API no. Y el problema que más pesa **no es la identidad sino el TIEMPO**: Kling es submit→poll con 270 s contra decenas de segundos del resto, y `content-run-stage` encadena secuencial. Tres salidas evaluadas; **V-c (job hijo) merece mirarse primero porque `lab-worker` YA lo hace** (`sbInsert('lab_jobs', {job_type:'videolab', parent_job_id})`). Sigue abierto el caso **visual-primero** (Reel donde el video ES el mensaje): invierte la cadena copy→visual y hay que decidirlo ANTES de enchufar VideoLab. **Prerrequisitos:** #93 cerrado y #95 desplegado y verificado end-to-end. **Pregunta que el plan NO resuelve y conviene contestar antes de empezar:** ¿la UI debe sobrevivir como app, o se absorbe en el Orchestrator y se jubila? Nadie lo planteó, pero es más barato que P1-P6 si el uso es tan puntual como Sam describe. | UNRLVL/ImageLab |
| 101 | **🟢 `imagelab_presets.extra_params` tiene SIETE campos que ningún builder lee (24-jul, hallazgo de la comparativa de #95-C).** `visual_concept` · `background` · `accent_color` · `depth_layers` · `style_keywords` · `emotional_target` · `what_this_image_must_NOT_feel_like`. **`visual_concept` es un párrafo entero** describiendo el concepto visual de la pieza (en el preset de UNRLVL: el corte arquitectónico en obsidiana, la luz quirúrgica, la profundidad de grid) — probablemente el campo **más rico** del preset, y se está tirando. **Es el patrón de #95 una capa más adentro:** identidad declarada y no leída. **NO se incorporó a #95-C a propósito:** C es *unificación* (marca + preset + global) y leer campos nuevos es *enriquecimiento* — cambiaría el output de UnrealvilleStudio mucho más de lo que la prueba comparativa de C permite juzgar. PR aparte, con su propia comparativa. | UNRLVL/ImageLab |

---

## 🔵 Próximas semanas

_Altas del 2026-08-16 al tope. Las filas numeradas previas siguen intactas debajo._

| Ítem | Detalle | Marca |
|---|---|---|
| **Cuentas Meta de ForumPHs** | 🔴 **BLOQUEANTE CON FECHA.** ForumPHs **no está en `meta_accounts`**. **Bloquea PUBLICAR el 22-ago — no bloquea programar**: el Scheduler puede colocar las piezas, lo que no puede es publicarlas. Dueño: **Sam**. | ForumPHs |
| **Alta del cron de `content-scheduler`** | Pendiente tras verificación con candidatas reales. La EF está desplegada (v2.1, `verify_jwt:false`); falta el cron que la dispare. | UNRLVL |
| **Paso 3 de cadencia — retirar los 3 alias legacy** | Retirar `brand_topics.cadence`, `brand_cadence.cadence_mode`/`.anchor` y `brand_rollout.max_rotation_weeks`. **Se retiran CONTANDO** `class_source_counts` y `max_rotation_weeks_source` del reporte — no a ojo. | UNRLVL |
| **Vaciar `brand_topics.cadence` en los 32 rotativos de ForumPHs** | **Irreversible.** Lo ejecuta Claude.ai bajo HRD, **tras el paso 3**, nunca antes. | ForumPHs |
| **`5e-2` cableado — gates 1 y 5 a pgvector** | La tabla ya existe (ver fila `5e-2 / 5e-3`). Cambia **una llamada LLM por un operador `<=>`**. | UNRLVL |
| **`5e-3` — gates 2 y 3 a bloqueantes** | Tras el flag, y con el Scheduler vivo. | UNRLVL |
| **No hardcodear modelos — REGLA NUEVA** | `claude-sonnet-5` literal en `content-run-stage`, `calibrate.ts` y `_craftModules.ts`; `gemini-2.5-flash-image` en ImageLab. `ops_lab_rates` **ya resuelve el precio por `model_id`**: lo que falta es que resuelva **qué modelo**. Regla instalada en `protocols/MULTIBRAND_RULE.md` → "Modelos y versiones". | UNRLVL |
| **`scheduledRows.push` sin `voice`** | Deuda menor de `content-scheduler`: la pieza recién colocada **no cuenta en el filtro por voz** de los grupos posteriores de la misma corrida. | UNRLVL |
| **Retirar `action=build_all` de CopyLab** | Hoy responde **410 con puntero**. Va en un **tercer PR**. | UNRLVL |
| **🔴 Seguridad — secretos repartidos** | `IID_CRON_SECRET` vive en **4 lugares sin fuente única**, uno de ellos **en claro en `intel.iid_scheduler_config`**. Rotarlo exige tocar los 4. **AMPLIADO al verificar contra la DB (2026-08-16): son DOS secretos en claro en esa tabla, no uno** — `iid_cron_secret` (48 chars) y `vercel_bypass_secret` (32 chars), ambos texto plano en la columna `value`. El alcance de la rotación es mayor que el declarado. | UNRLVL |
| **Auditar filas `previsto` de `ops_lab_rates`** | Con el aumento de Sonnet **cancelado el 12-ago**, las filas `previsto` sembradas para el flip del 31-ago deben anularse antes de que el cron 38 las promueva solo. | UNRLVL |

| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp | UNRLVL |
| 28 | NSCF blog reescritura | NeuroneSCF |
| 29 | NSCF Dispatch Portal | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA | UNRLVL |
| 31 | GRAN BLOQUE SocialLab/IID | UNRLVL |
| 32 | lucien_video | Lucien |
| 33 | Validar genomas. lucien v1.0, unrlvl_default v1.0, nscf_conversion v0.5. | Lucien/SamPublisher/NeuroneSCF |
| 34 | unrlvl-CRM multimarca | UNRLVL |
| 36 | unrlvl-SMA multimarca | UNRLVL |
| 37 | Drift detector | UNRLVL |
| 38 | Reconciliación ecosystem_graph | UNRLVL |
| 39 | .github/CLAUDE.md repetido | UNRLVL |
| 43 | **Versionar EFs del IID en repo (deuda sin-repo §1)** — PARCIALMENTE saldado (iid-inbound + iid-expert-ocr + storage-orphan-sweep en unrlvl-iid-functions). Falta el resto (iid-core, fanout.ts, content-*, etc.). **17-jul:** iid-core (+fanout.ts), content-watcher, content-run-stage, aife-filter, brand-context-builder, iid-inbound ahora con fuente en unrlvl-iid-functions y deployadas por MCP desde main. Falta versionar el carril viejo (iid-research/iid-process/iid-ecommerce*, decisión: dejar morir sin versionar). ✅ **24-jul: la BYTE-PARITY DURA ya es posible** — `supabase` CLI 2.109.1 instalada y logueada. `iid-core` verificada idéntica al deploy `_35` (`functions download` + `diff --strip-trailing-cr`, exit 0 en ambos archivos). El resto de las EFs versionadas se puede verificar igual → #92. | UNRLVL |
| 44 | ✅ **Eje B implementación — VIVO EN PROD (17-jul).** objective_by_platform (jsonb) migrado a brand_topics; gate7 objective_stimulus + gate8 visual_sibling blocking en content-watcher v2 (8 gates); Ruta B en fanout.ts (preset derivado del objetivo declarado, no hash sesgado — rescata 5 presets muertos, 13/13 usados). Gates nacen vivos por 3 cambios de datos en el ctx (loadBrandTopic + finalizePiece). content-watcher build _14, iid-core build _32, content-run-stage build _50 deployados. Pendiente: poblar objective_by_platform en ≥1 marca (nace NULL → gate7 informativo hasta entonces). ✅ **PENDIENTE CUBIERTO (23-jul): ForumPHs tiene las 32 filas con `objective_by_platform` poblado y 18 con `audience_frame` → gate7 juzga con datos declarados, no inferidos.** Builds vigentes tras el deploy del 23-jul: iid-core `_33`, content-watcher `_16`, content-run-stage `_51`. | UNRLVL |
| 45 | ✅ **PARTE DE CALIBRACIÓN CERRADA 2026-08-16 — RESUELTO POR VÍA ALTERNA.** El plan decía que faltaban los 4 bucles de Marisol. **Los 4 están `converged`**, verificado en `intel.calibration_sessions` + `intel.calibration_turns`: PatriciaOsorioConectando 19 turnos (12 SÍ/6 NO) · VivoseMask 15 (8/6) · PatriciaOsorioVizosSalon 12 (11/0) · VizosCosmetics 11 (10/0). Además PatriciaOsorioPersonal 11 (9/1), que no figuraba en el ítem. **SIGUE ABIERTO lo que viene después:** ninguna de esas 5 marcas tiene fila en `brand_voice_genome` ni en `intel.brand_topics`. El pendiente real ya no es "correr los bucles" sino **destilar los 5 bucles convergidos a genoma y sembrar sus topics** — sesión propia bajo HRD. Verificado el 2026-08-16. — **Texto anterior del ítem, conservado íntegro:** «**Sembrar brand_topics de las marcas de Marisol — PARCIAL.** ✅ NeuroneSCF hecha (2-jul, 5 topics). ✅ EJES FUNDADORES sembrados para las 5 restantes (6-jul, en intel.calibration_sessions): D7Herbal, VizosCosmetics, VivoseMask, VizosSalon, PatriciaOsorioConectando — listos para correr el bucle Boids. ✅ UI de calibración lista (#65 cerrado 6-jul). ✅ **D7Herbal calibrada end-to-end (10-jul):** bucle fb0b08ab convergido, genoma `d7herbal_conversion` v1.0 ACTIVO — le falta SOLO brand_topics para ser plenamente operable (voz sin agenda). El cuello de botella ya no es UI sino ejecución: faltan los 4 bucles restantes (VizosCosmetics/VivoseMask/VizosSalon/Conectando, Marisol vía Seeder) → genomas + brand_topics de cada una + persona `default` de NSCF. NSCF sigue la única plenamente operable (genoma + 5 topics).» | NeuroneSCF/UNRLVL |
| 46 | **Tab "Topic Proposals" en IID Intel (post-#45, ligado)** — captura estructurada de criterio de Marisol (preguntas guiadas → iid_topic_proposals → Sam convierte en domains → CC inserta). | NeuroneSCF/UNRLVL |
| 47 | ✅ **Modo Expert/Boids — Fase 1 COMPLETA + Fase 2 EN CURSO.** E3b + E5a cerradas, E4 absorbida. E7 (Tratado) 2-jul. E6 probado 2-jul. **E5b BACKEND (D1+D2) en prod 4-jul.** PRÓXIMO: E5b FRONT (#65). Luego E8. Ver session_log §9. | UNRLVL |
| 48 | ✅ **Approval por email — COMPLETO (27-jun).** iid-inbound v9, notifyGate inline. | UNRLVL |
| 54 | ✅ **nscf_editorial + nscf_professional — EJES SEMBRADOS (11-jul), #54 CUBIERTO.** Los 2 ejes fundadores de NSCF ya están en intel.calibration_sessions (active, 0 turnos): editorial **"Hair Intelligence"** (7aeea69d) DESTILADO DE LOS 4 ARTÍCULOS REALES del blog neuronescflorida.com (arquitectura = desmontar atribución equivocada → mecanismo con dato duro → solución de SECUENCIA → producto entra tarde → frecuencia accionable → cierre aforístico; badge de Patricia sin currículum como puerta al recorrido); professional **"la Técnica de marca"** (70% oficio / 30% producto-como-INSTRUMENTO, el rol que el gremio conoce y espera; test: el 70% útil sin comprar nada). PENDIENTE: que Marisol corra los 2 bucles → destilar los genomas (E6, chat, HRD). Con E7 vivo el bucle lee el contexto real de NSCF desde el turno 1. | NeuroneSCF |
| 5e-2 / 5e-3 | **Embeddings y gates bloqueantes (rescatado de `R4B_SPECS_CC.md` al archivarlo, 2026-08-16).** **⚠️ ACTUALIZADO 2026-08-16 — la mitad de DDL está HECHA:** `intel.content_embeddings` **ya existe** con `vector(768)` + índice HNSW + GRANT `service_role`. **Lo que queda es el cableado**, y es todo el ítem: los gates 1 y 5 de `content-watcher` siguen resolviendo por `semanticSimilarity` contra Claude. **Parcial es abierto** (`skills/context-resolver/SKILL.md` §2). — **Texto anterior del ítem, conservado íntegro:** «Crear `intel.content_embeddings` + índice HNSW + GRANT `service_role`; cablear gate1 (similarity) y gate5 (duplication) de `content-watcher` a pgvector; gates 2/3 bloqueantes con flag `GATES_2_3_BLOCKING=false` por defecto. **🔴 CORRECCIÓN OBLIGATORIA:** el spec original declaraba `vector(1536)`; **el modelo real del ecosistema es `gemini-embedding-001 @768 dims` (cap HNSW 2000)** — el DDL va con `vector(768)`. `pgvector` ya está instalado (verificado 2026-08-16); la tabla NO existe. Dueño: pendiente de asignar. | UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 + #39. Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Ley activa de CC → cuesta en cada sesión mientras esté incompleta.

---

## ✅ Resuelto recientemente

> **📁 ARCHIVO HISTÓRICO.** Los ítems **completados hace más de 30 días y sin referencias activas** se mueven a **`historical_AGENDA.md`** (raíz del repo). El barrido corre en **cada Actualiza** (HRD_PROTOCOL §HRD_ACTUALIZA paso 10) y **siempre se propone a Sam antes de mover nada**. Si buscás un ítem cerrado que no aparece acá, está allá con su texto íntegro. El tamaño de este archivo NO es criterio de archivado: si todo está pendiente, no se archiva nada.
>
> **"Sin referencias activas" — aclarado 2026-08-06 (def. completa en `historical_AGENDA.md`).** *Referencia activa* = dependencia viva: un ítem ABIERTO/pendiente que depende del candidato, o estado vivo en `ecosystem.json` (tabla/EF/vista/campo que existe hoy), o una mención en `AGENDA.md` **fuera de la zona de completados**. Una mención en un `session_log.md` fechado **NO** cuenta — es historia append-only. (Sin esta aclaración, cualquier mención en un log retendría todo para siempre.)
- ✅ **Cierre 2026-08-16 — Scheduler, snapshots, queue y canónico de `CLAUDE.md` (4 ítems, todos por VÍA ALTERNA · condición 4 de `skills/context-resolver/SKILL.md` §2).**
  - **`5e-1` content-scheduler — CERRADO.** RESUELTO POR VÍA ALTERNA — el plan decía *especificar* el Scheduler (EF+cron 1×/día ET); se **construyó** (PR #57), se **corrigió** (#59, #60) y está **desplegado v2.1**. Verificado sobre la EF desplegada el 2026-08-16. **Gotcha registrado:** se desplegó primero con `verify_jwt: true` y el gateway rechazaba **antes de llegar al código** (`UNAUTHORIZED_NO_AUTH_HEADER`) — el carril autentica por `x-cron-secret`, no por JWT; quedó en `false`. **Residuo abierto:** el alta del cron, pendiente de verificación con candidatas reales (ver `## 🔵 Próximas semanas`).
  - **Cron `build_all` — CERRADO.** RESUELTO POR VÍA ALTERNA — la AGENDA lo declaraba *"nunca ha corrido"*; la verificación contra `cron.job` mostró que **el cron nunca existió**: no era un cron roto, era un cron ausente. Se creó (**jobid 51**, `brand-snapshot-build-all-3h`, `0 */3 * * *`) y la cobertura pasó a **13/13 snapshots**. El constructor único es la EF nueva `brand-snapshot-builder` v1. Verificado el 2026-08-16.
  - **`5s` limpieza de queue — CERRADO.** No era ítem de `AGENDA.md` (vivía en `r4b_status.pending` de `ecosystem.json` y en el dry-run); se cierra con el **archivo del dry-run** (`protocols/archive/DRYRUN_PLAN_IID_PILOT.md`, PR #44), cuya premisa ya había muerto: `.limit(1)` retirado y queue limpia (0 filas con `brand_id` NULL). Se registra acá para que el cierre quede en la capa ESTADO y no sólo en el JSON.
  - **`LAB-AUDIENCE-BRIEF` — el literal no existe (corregido contra la DB, 2026-08-16).** La fila es `lab_key = audience_brief` en `public.lab_configs`, y **no hay columna `lab_id`**. Quedó `active=false`, `supports_iid=false`; cadena IID verificada: `copylab` 1 → `aife` 2 → `imagelab` 3 → `sociallab` 4.
  - **D1 de ARQUITECTURA — CERRADO (ya declarado en el PR #44).** `.github/CLAUDE.md` es el canónico; `/CLAUDE.md` queda legacy y se poda en PR aparte. Ver `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §4 y §11 y `skills/context-resolver/SKILL.md` §6.1. Se anota acá porque el cierre no figuraba en la zona de completados de este archivo.
  - **NO cerrado — `5e-2` embeddings: PARCIAL.** `intel.content_embeddings` creada (`vector(768)` + HNSW + GRANT `service_role`), pero los gates 1 y 5 del Watcher **siguen sin cablear a pgvector**. **Parcial es abierto, sin excepción** — se queda en `## 🔵 Próximas semanas` con ese alcance exacto.

- ✅ **ForumPHs — genoma de conversión sembrado + BI destilado + Ley 284 erradicada + pipeline desplegado (23-jul).** (1) **#82 CERRADO:** 18 topics `fphs_conversion` (9 dominios × 2 frentes reales, `jd` + `doliente`) → ForumPHs llega a 32 filas en `intel.brand_topics`, 32/32 con `objective_by_platform` y 18/32 con `audience_frame` (columna NUEVA, CHECK jd/doliente/general, patrón reusable para marcas con decisor≠usuario). Las 4 plataformas en ambos frentes: la plataforma segmenta FUNCIÓN, no audiencia. (2) **BI real destilado** a `brand-intel/forumphs/bi_2025.json` (bucket nuevo `brand-intel`; `iid-expert-uploads` solo admite video/imagen): 7 hallazgos financistas con estructura fija; candado = cifras SÍ, origen NUNCA. (3) **Ley 284 erradicada de `public.brands`** (5 campos; el peor: `extra_instructions` ORDENABA citarla, contra la regla dura de marca). (4) **Sitio forumphs.com**: 25 ediciones (rol de Ivette, 9 oposicionales fuera incluido el hero, sección "Inteligencia financiera", FAQ del frente doliente). (5) **Pipeline: 4 PRs mergeados (#23-#26) Y DESPLEGADOS** — P1 cerrado y verificado contra `list_edge_functions`: iid-core `_33`, content-watcher `_16`, content-run-stage `_51`. 3 migraciones por MCP; CHECK de `iid_content_queue.voice` a 6 voces. Reglas de voz nuevas transversales (fechas relativas, cadena de consecuencia, reflexión-espejo, el vacío habla solo, el blog nunca es callejón sin salida). (6) **P2 CERRADO el mismo día:** `platforms_by_destination` sembrado en **48/48** filas por Claude bajo HRD, exhaustividad verificada en ambas direcciones; `email_propietarios` → `editorial`; LucienSael queda con **split real** (`social` x/meta_fb/meta_ig/tiktok · `editorial` blog). Deudas nuevas #85-#91 (#85 ya cerrada). **Frente activo: U4 (#86) + P4 (#87) en un mismo PR.** Handoff en `brands/ForumPHs/ESTADO_Y_HANDOFF_2026-07-23.md`. — 2026-07-23
- ✅ **Skill r4b-genome-calibration + fórmula marca↔persona + rol Ivette (13-jul).** (1) SKILL r4b-genome-calibration v1.0 creado y pusheado (registrado en INDEX v1.7): orquestador "de cero a R4B" (genoma + parche + brand_topics + agentes + scheduler del Orchestrator establecido = listo para publicar). DELEGA la voz a genome-calibration (patrón orquestar-no-duplicar); agrega Fase 0 (revisar lo que hay), la fórmula marca↔persona, la regla dura generalizada y las fases post-voz. Método Sam×Claude en chat; el Seeder es opción de delegación de la Fase 3. (2) FÓRMULA MARCA↔PERSONA formalizada (validada en Neurone↔Patricia y ForumPHs↔Ivette): la MARCA lleva Conversión/Educativa/Editorial pero NO Profesional (se disuelve); la PERSONA lleva Profesional/Educativa/Editorial. 3 verbos sin solape: Conversión VENDE al decisor, Educativa ENSEÑA al doliente (el que vive bajo el régimen/usa el producto, no el decisor), Editorial OPINA del oficio. Fronteras: la marca no hace el trabajo de la persona; frontera de RESPONSABILIDAD cuando la persona es profesional regulado (Ivette Abogada INTERPRETA el marco / ForumPHs OPERA el sistema — cruzarlas es riesgo legal). (3) ROL DE IVETTE corregido en prod (public.brands ForumPHs, positioning + brand_context): "Abogada y Especialista en Régimen de Propiedad Horizontal", anclado al RÉGIMEN no a la Ley 284 (que puede derogarse); es el mismo rol que ejerce en ForumPHs, NO "Gerente General". "Abogada" es título verificable (hecho afirmable); "especialista" se demuestra. Deuda: genoma fphs_institucional v0.5 aún dice "Abogada Ley 284" (#73). Professor: 4 learnings (13-jul). — 2026-07-13
- ✅ **Siembra de 4 ejes + PatriciaOsorio.com + regla dura de voz (11-jul).** (1) 4 EJES SEMBRADOS en intel.calibration_sessions (active, 0 turnos, operator Sam): D7Herbal editorial (ciencia botánica accesible, comprensión con fundamento); NSCF editorial "Hair Intelligence" (DESTILADO DE LOS 4 ARTÍCULOS REALES del blog neuronescflorida.com: arquitectura = desmontar atribución equivocada → mecanismo con dato duro → la solución es de SECUENCIA → producto entra tarde → frecuencia accionable → cierre aforístico; badge de Patricia sin currículum como PUERTA al recorrido); NSCF professional "la Técnica de marca" (70% oficio / 30% producto-como-INSTRUMENTO, no de venta; el rol que el gremio conoce y espera; test: el 70% debe ser útil sin comprar nada); PatriciaOsorio.com (autoridad de industria + propósito de CONECTAR, audiencia amplia de 4 públicos). #54 CUBIERTO. (2) PATRICIAOSORIO.COM CREADA VÍA ALIAS: se reutilizó la fila PatriciaOsorioPersonal (verificado: sin genoma/topics/sesión/url — nadie la usaba); ID técnico INTACTO, nombre real en display_name + domain → CERO FKs, CERO código → DESACTIVA LA PARTE PELIGROSA DE #69. (3) REGLA DURA DE VOZ transversal: LA VOZ DEMUESTRA, NUNCA DECLARA (ni promesas ni credenciales; el dato preciso ES la credencial); embebida en los 4 ejes; 2 violaciones detectadas en prod (header blog NSCF; genoma po_consumer). (4) VivoseMask convergió (15 turnos) → pendiente destilar. (5) HALLAZGO: brand_scope de seeders vive en el secret USERS_RAW de iid-inbound, NO en la DB → Marisol no ve PatriciaOsorio.com hasta agregarla ahí. Professor: 8 learnings. — 2026-07-11
- ✅ **Sesión bucle Boids — E7 GenomePromptBuilder + E5c + genoma D7Herbal (10-jul).** (1) E7 (PR #10 MERGEADO): el generador de /api/calibrate.ts ensambla el contexto REAL de la marca desde Supabase (5 capas: identidad brands / voz brand_copy_profiles / fórmula product_blueprints / servicios brand_services / dirección founder_axis), degradación elegante por capa, regla dura de veracidad, max_tokens→2048. Mata la alucinación (D7H inventaba Serenoa repens; ahora nombra los 7 reales: Clavo/Canela/Anís/Jengibre/Quina/Romero/Ron). Módulo api/_genomePromptBuilder.ts. GRANT SELECT product_blueprints+brand_services→service_role. 2 bugs resueltos: import ESM sin .js (FUNCTION_INVOCATION_FAILED, build engaña quedando READY) + order=is_primary sobre product_blueprints (columna inexistente→400 tragado por safeRead→capa muda). (2) E5c (PR #11 MERGEADO 10-jul): convergencia extensible — 10+3SÍ sugiere (flag can_converge) en vez de forzar; acción converge explícita + guardia 409; botón "Cerrar y calibrar voz"; quién cerró en notes jsonb; racha sobre turnos juzgados ignorando el pendiente. (3) GENOMA D7HERBAL (chat/HRD, escrito a prod): bucle fb0b08ab convergido (10 turnos, 4 SÍ), d7herbal_conversion v1.0 ACTIVO en brand_voice_genome; parche blueprint (Ron = 7º activo botánico); voz = honestidad en la estructura (testimonio/días/ingrediente real) no en disclaimer. D7H = 1ª marca calibrada end-to-end por el sistema completo. 8 genomas activos ahora (+D7Herbal). Nueva capacidad: CC tiene browser (cerraría el smoke de UI logueada). Professor: 10 learnings. — 2026-07-10
- ✅ **#47 E5b FRONT — text window del bucle Boids CERRADO (6-jul).** UI de calibración en el Orchestrator dentro del Seeder de Marisol (toggle Capturar/Calibrar). Selector de marca scope-gated (solo las 6 de Marisol, verificado en vivo cero Lucien/UNRLVL). Dos sub-casos de from_scratch: retomar sesión sembrada (las 5 del 6-jul, vía start con session_id que genera turno 1 desde el founder_axis) o crear nueva (captura intent_label + founder_axis antes del primer start). Bucle de veredicto SÍ/NO + notes_intent, progreso REFLEJO (turnos + racha SÍ del server; la regla 10+3SÍ vive server-side, el front nunca calcula ni bloquea). Convergencia → pantalla de cierre (E6/destilación es en el chat, no en UI). from_genome = STUB HONESTO (explica que depende de piezas del pipeline que aún no existen). Backend aditivo: +acción list (cabecera + has_founder_axis + turn_count vía 2º select, nunca turnos ni founder_axis completo) + columna verdict_operator en calibration_turns (quién juzga cada turno = operador logueado, ≠ session.operator = quién sembró). Archivos: iidCalibrate.ts + CalibrationConsole.tsx nuevos, SeederShell toggle, enlace gold activado. PR #9 Orchestrator merged, branch borrado, verificado en vivo con capturas. REPARTO confirmado: bucles = Marisol vía Seeder, Sam solo aprueba. Professor: 3 learnings. Deudas: #69+#68+#67 se agrupan (familia DB); #54 ahora operable por Marisol (falta sembrar ejes NSCF). — 2026-07-06
- ✅ **Siembra de EJES FUNDADORES desde la DB — 5 marcas de Marisol (6-jul).** Método nuevo validado (intuición de Sam): las marcas ya tienen datos ricos en Supabase que sirven de punto de partida del bucle Boids, sin que Marisol capture una técnica primero (resuelve el hueco from_genome de #65). Flujo: Claude lee tablas de la marca → propone eje fundador → Sam corrige con su criterio → se siembra como fila en intel.calibration_sessions (founder_axis jsonb, status active, 0 turnos). 5 sembradas: D7Herbal (fb0b08ab), VizosCosmetics (ad03ff4e), VivoseMask (4ccc4f74), VizosSalon/PatriciaOsorioVizosSalon (455ab6ce), PatriciaOsorioConectando. Mapa de 6 voces diferenciadas (ninguna se funde pese a compartir casa/persona/categoría): NSCF conversión-filo · D7H contención-botánica · Vizos institucional-maison · Vivosé sensorial · VizosSalon profesional-anfitriona · Conectando íntima-latina. Vizos Cosmetics: DB corregida (era falsa). Consolidación de IDs PO mapeada (#69). La DB da el PUNTO DE PARTIDA, no el genoma (ese sigue necesitando el criterio de Sam en el bucle). Professor: 7 learnings. Próximo: correr bucles → genomas; Operación B. — 2026-07-06
- ✅ **#47 E5b BACKEND — bucle Boids en producción (D1+D2) (4-jul).** D1: tablas intel.calibration_sessions + calibration_turns (Opción B, FK CASCADE, GRANTs service_role, trigger updated_at; voice_id técnico = salida no entrada). D2: /api/calibrate.ts en Orchestrator (3 acciones start/verdict/status, stateful vía DB Opción X, generador claude-sonnet-5, convergencia 10+3SÍ leída de DB, anti-repetición de técnicas). Verificado end-to-end: round-trip PostgREST Accept-Profile:intel confirmado por HTTP + MCP. interpret-intent.ts revivido (estaba ROTO en prod por firma Web). PRs #7+#8 merged, CC limpió sesiones de prueba. GOTCHAS: firma Web cuelga en Vercel→Node-native; claude-sonnet-5 antepone bloque thinking→concatenar bloques text; prefill da 400. Model ID canónico jul-2026 = claude-sonnet-5 (verificado docs oficiales). Professor: 7 learnings. Deudas #65 (front) #66 (skill versiones) #67 (barrer firma Web) #68 (RLS). — 2026-07-04
- ✅ **ForumPHs DF — R5 inerte + parser multi-plataforma + GRANT fix + Sonnet 5 (4-jul).** R5/Bloque 2 mergeado (PR #14) pero INERTE (marcas ICR no aparecen: /api/generate recibe icr_findings=[] por runGenerate(blocks,[]) hardcodeado + findings internos con location "Cuerpo del acta" no matchean findingsForSection → #57). Sprint parser multi-plataforma completo: primer paquete no-Venezia (Lefevre 75/TOC) expuso parser Venezia-céntrico. PR-A #15 skeleton (fix "Joseph Ayala"→"PH Ayala", "GENERAL EXTRAORDINARIA", fecha-de-asamblea, cross-check filename). PR-B #16 (detectPlatform auto por df_platform_parsing_config, segmentación TOC prose_paragraph, fix xlsx). PR-C #17 (fix detectHeaderRow coords colapsado↔absoluto, banners visibles, logging, copy sin Hypal, migración claude-sonnet-5 thinking:disabled). CAUSA RAÍZ "degrada a Hypal" = GRANT SELECT faltante a service_role en df_platform_parsing_config (42501→403); resuelto por GRANT + ALTER DEFAULT PRIVILEGES. DF MULTI-PLATAFORMA VIVO: Lefevre → TOC detectada, 117 asistentes, Sonnet 5, ICR 14 hallazgos (4 CRÍTICOS → BLOQUEADO correctamente). QA↔ICR desconectados (deuda aceptada #58). tabla nueva df_platform_parsing_config (UNRLVL). Professor: 10 learnings. Deudas #57-#64. — 2026-07-04
- ✅ **ForumPHs DF — análisis de regresión + Bloque 1 + R4 + EF v39 (3-jul).** Acta del DF (Venezia OR 1-2026) comparada contra la corregida por Ivette → 5 regresiones con causa-raíz en código. R2 reorden (sectionAssigner umbral 0.4→0.7 + sortByTimestamp compartido generate/actaBuilder; orden cronológico Opción A dentro de cada punto del orden del día). R4 numeración restaurada (1.–8. + QUÓRUM con tilde). R1 = falso positivo de R2 (Ivette también conserva los 2 momentos del $2,269; el dedup acertó al no marcarlos). R3 fragmentos triviales resuelto EF-side (fphs-formalize v39, TRIVIAL_MIN_WORDS=5): acta 4263→3370 (-21%), triviales 25→1, ROL NO VERIFICADO 98→46, ICR ALTO 6→4. Barrido único en UI (0/1/2, retryAttempt fijo). Principio nuevo: "dedup se marca no se corrige" (parser sobre text_raw crudo, marca possible_duplicate, ICR MEDIO; instrumento forense origen Hypal vs doble barrido). PR #13 merged. Deploy EF v38→v39 con verify_jwt:false explícito (proyecto amlvyycfepwhiindxgzw). Deudas: #55 colisión numeración, #56 orden-del-día sin header, warning temprano dedup (Bloque 2). Professor: 9 learnings. Próximo: Bloque 2 (R5). — 2026-07-03
- ✅ **E6 + #45 NeuroneSCF (2-jul).** Genoma nscf_conversion v0.5 escrito y activo en brand_voice_genome (12 dimensiones, +TikTok capa texto). 5 brand_topics sembrados → nscf_conversion (Meta+TikTok). NeuroneSCF operable end-to-end por el IID (primera marca de Marisol). Distinción de marca NSCF≠PO registrada; deuda po_consumer (#53). Professor: 4 learnings. — 2026-07-02
- ✅ **#47 Calibración de voz NSCF + Tratado genome-calibration v1.0 (2-jul).** Bucle Boids validado en vivo (Sam×Claude, 10 piezas). Genoma de conversión convergido. Eje moral (autoridad-por-contraste, blanco=asesoramiento genérico, filo 5/10 instrumental), capa científica, reglas de forma. Voz vs intención = ejes distintos. Skill genome-calibration v1.0 (Tratado, E7) escrito y pusheado + INDEX v1.6. Professor: 8 learnings. — 2026-07-02
- ✅ **#47 Expert/Boids — E5a CERRADO: pestaña única IID Seeds (1-jul b).** Captura OCR unificada + bifurcador Seed/Genoma reemplaza el toggle Basic/Expert. Descubrimiento: Basic/Expert no son modos, solo difiere el destino. 2 sesiones CC paralelas contra contrato cerrado (front PR #5+#6, EFs PR #9). Fix imagen: bypass de ffmpeg (imagen→data URL→OCR directo; ffmpeg solo para video). Gotchas: merge=deploy a producción en Vercel (probar Preview antes); merge de EFs ≠ aplicar migración (columnas ocr_text/capture_intent aplicadas por MCP tras el hecho). E4 ABSORBIDA (iid-expert-ocr ya hace la captura). Probado E2E: imagen+video × Seed+Genoma verdes. Diseño E5b (bucle Boids en UI) + Fase 2 (aprobación en chat) cerrados. Professor: 6 learnings. Próximo: E5b. — 2026-07-01
- ✅ **#47 Expert/Boids — E3 CAPTURA COMPLETO end-to-end (1-jul).** E3b-2 (front signed upload URL, PR #4) + E3b-3 (EF genérica storage-orphan-sweep, REST-only por trigger protect_delete, recorrido recursivo, PR #8 + crons 35/36) + E3b-4 (Marisol desde su dispositivo, fila 3c40f492). Gotcha: sign-upload rechazaba 400 por Content-Type sin body. Hallazgo: trigger protect_delete bloquea DELETE FROM storage.objects (job 32 fallaba en silencio). Incidente dispatcher detectado (dejado a R4B). Professor: 8 learnings. — 2026-07-01
- ✅ **#48 Approval por email COMPLETO (27-jun).** iid-inbound v9 notifyGate. PR #5. Deuda get_logs (#49). Professor: 5. — 2026-06-27
- ✅ **IID Sembrador T4 COMPLETO (26-jun).** Front IID Seeds LIVE, auth dos ejes, repo unrlvl-iid-functions. Dos modos de semilla (Basic/Expert). Professor: 7. — 2026-06-26
- ✅ **IID Sembrador T4 brief (26-jun).** scope gerente-de-cuentas, tab topic-proposals diferido (#46). — 2026-06-26
> 📦 _Grupo A archivado con texto íntegro en_ **historical_AGENDA.md → ## Migración 2026-07-29**_: #47 E3b-1 (ffmpeg HEVC) · E3-FRONT-canvas (fallo + build) · E1+E2+E3-EF · #47 DISEÑADO+E1 · IID Sembrador T1-T3 · IID Fase 3 transporte · y el comprimido ≤24-jun (Eje B / ImageLab→Gemini / R4B Chat 2 / #5i Lucien / IID QUALITY / Builder+Watcher / NSCF Resend). #48 y Sembrador T4 (Grupo B) permanecen arriba._

---

## Notas de contexto

> 📦 Repartida el 2026-08-16 según la capa de cada fragmento
> (`protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §2):
> ESTADO → `historical_AGENDA.md` · MÉTODO → `skills/genome-calibration` y `skills/content-pipeline`
> · DATO consultable → eliminado, vive en la DB.
>
> **Nota de ejecución (CC, 2026-08-16) — no se eliminó ningún fragmento.** Los identificadores de
> sesión que el brief daba como ejemplo de capa DATO (`fb0b08ab`, `ad03ff4e`, `4ccc4f74`,
> `455ab6ce`) **no viven en esta sección**: están en la fila `| 45 |` de `## 🟡 Esta quincena` y en
> `## ✅ Resuelto recientemente`. No se tocaron — preservar y reportar, no decidir. La capa DATO
> quedó por tanto **sin ningún fragmento** en este reparto.
>
> Los fragmentos que **no clasificaron limpio** en ninguna de las cuatro capas quedaron abajo, sin
> mover, por la regla dura de la tarea: mejor un fragmento sin mover que uno mal enrutado.

### ⏸️ Fragmentos no clasificados — permanecen aquí (2026-08-16)

**ForumPHs — Agente de propietarios por WhatsApp (estado 2026-07-21):** pivote de FPHS-OPS. Diseño cerrado, sin construcción. **Arquitectura:** Supabase-first con canal abstraído (`ChannelAdapter`) — el cerebro no sabe si habla por WhatsApp o Telegram; Twilio primero (Sam ya lo opera), Meta Cloud API al escalar (swap de adaptador, no reescritura). **Identidad = declaración firmada** concedida por la administración, PH por PH, sin autoservicio ni canal alternativo; cascada de 3 factores con **preguntas abiertas y match silencioso** (nunca ofrecer opciones válidas); propiedad **siempre** obligatoria para dato financiero aunque la sesión (24h uniforme) esté activa. **Lo sensible por email** no-reply + CC ops@ = constancia auditable, y "entregado" = el CC llegó a ops@. El agente informa **ESTADO** del ticket, no novedades, hasta que exista el dashboard (#78) que capture la "etapa" en `incident_updates` (#77). **Compliance:** la política de IA de Meta 2026 restringe bots abiertos y permite los de tareas acotadas → el fasing por tareas de Sam no es solo buen producto, es compliance de plataforma. **Economía:** la ventana de servicio de 24h es gratis hoy pero pasa a ser facturable el **1-oct-2026** — contemplar en costos. **La DB ya anticipaba multicanal:** `incidents.reported_via` incluye `whatsapp`, `reported_by_type` incluye `propietario`/`residente`, y `communications` (outbox de emails) ya existe → inventariar el esquema ANTES de diseñar capas nuevas.

**ForumPHs — Ingesta Sage 50 (estado 2026-07-21):** Sage 50 Premium (ex-Peachtree) es **desktop, sin API**; 7 máquinas propiedad de cada PH en ubicaciones e internet distintos. **Agente de sync local descartado** (flota de puntos de falla en máquinas de terceros para un dato mensual). Camino: **export periódico → parser de ingesta → DB limpia**; el agente **nunca toca un xlsx**. **Mapeo validado 198/198:** Venezia 61/61 (quitar `^\d-` + guiones → `07A`), Lefevre 137/137 (quitar `^I-` + literal → `01-E-A`). `I-` = inmobiliaria (unidad aún en venta, MISMO apartamento, estado transitorio); `2-N-X` = apartamento con N propietarios (convención contable del PH). **Regla de fila del parser:** MOVIMIENTO si tiene `Invoice/CM #`, SUBTOTAL si tiene `Customer ID` sin `Invoice #`; descartar vacías y `Report Total`. Tipos de movimiento por prefijo (`M-`/`MUL-` multa, `REC-` pago, `EXT-` extraordinario) que **varían por PH**. Saldos negativos = saldo a favor. Formatos **no** homogéneos entre PHs (idioma, hoja, nº de columnas, detallado vs resumido) → **config por PH como DATA**, mismo patrón que `df_platform_parsing_config` del DF. ⚠️ Falta columna de fecha (#80).

**Deudas DB/gobernanza del IID agrupadas para una sesión conjunta (6-jul):** #69 (consolidación de IDs de marca PO) + #68 (RLS calibration_* + vigilar max_tokens:1024 del generador con el bloque thinking de sonnet-5 por delante) + #67 (barrido de endpoints con firma Web colgados) = familia DB/gobernanza IID, se hacen juntas. #69 requiere runbook SQL transaccional + checklist de código preparados por CC **sin ejecutar** (superficie doble: DB + 8 archivos hardcodeados en 7 repos → ~60% de romper si el deploy es descoordinado). **#66 (skill de versiones de modelo) y #46 (tab Topic Proposals, diferido) NO entran en ese grupo — skill nuevo / front nuevo, cada uno su sesión propia.**

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23.

**Model IDs canónicos (verificado docs oficiales Anthropic, jul-2026):** claude-sonnet-5, claude-opus-4-8, claude-opus-4-7, claude-sonnet-4-6, claude-haiku-4-5. RETIRADOS (abr-2026): claude-sonnet-4-* y claude-opus-4-* gen ≤4. Formato sin fecha desde 4.6 = snapshot fijo, NO alias evergreen. El generador de /api/calibrate.ts y el DF usan claude-sonnet-5. Regla: verificar contra docs antes de asumir de memoria (un ID retirado enquistado rompe en prod silenciosamente) — origen del skill #66.

**DF — bases de datos (aclaración 4-jul):** el DF apunta a DOS bases. **FPHS** (`tajuoqdbnsnzkhyqvdgs`) = datos sensibles de propiedades (propietarios, fincas, unidades, personal); se accede con FPHS_SUPABASE_URL + FPHS_SERVICE_KEY. **UNRLVL** (`amlvyycfepwhiindxgzw`) = operativa del propio DF (df_jobs, professor_learnings, df_platform_parsing_config, EF fphs-formalize); se accede con UNRLVL_SUPABASE_URL + unrlvl_service_role. El bug "degrada a Hypal" fue que UNRLVL_SUPABASE_URL no estaba en Vercel (solo la de FPHS) + faltaba el GRANT.

**Patrones gobernanza:** spec sin fuente=suposiciones; IID EFs sin repo → direct-on-prod (EXCEPCIÓN: iid-inbound + iid-expert-ocr + storage-orphan-sweep versionadas); CHECK de tablas core = enums cerrados; acople-por-contrato (4B; E5a lo usó para 2 sesiones CC paralelas front↔EF); auth multi-usuario = patrón nscf-b2b-approve; scope de marca = modelo gerente-de-cuentas (regla dura server-side); calibración de voz scope-gated (experto de dominio; Marisol sus 6 marcas, nunca Lucien/UNRLVL; Sam firma el INSERT en el chat, NO en UI); EF sin fuente git = pedir código al humano; GRANT service_role aplica a tablas viejas leídas por EF nueva; disciplina sesión-nueva CC (verificar rama base, no arrastrar ramas claude/* viejas); **versión del deploy vive en Supabase, no en el código — verificar con get_edge_function antes de bumpear**; **allowlist de repos de CC se fija al ARRANCAR (apuntada al working dir), no se amplía en caliente; tell: primer get_file_contents devuelve archivo, si 403 parar; 2 sesiones en repos distintos = paralelo real sin colisión, contra un contrato cerrado de antemano**; **Claude Chat sandbox sin egress a *.supabase.co — no invoca/curl-ea EFs; disparo desde afuera (Sam curl) o net.http_post desde Postgres (asíncrono: request_id → net._http_response)**; **runtime EF Supabase: sin subprocess + cap 2s CPU + bundle 20MB → CPU-pesado va al navegador o API externa**; **OAuth2 SA en EF: des-escapar \\n de la private_key antes de importKey**; **extracción de frames en navegador (canvas) frágil por códec (HEVC falla en Chrome) → server-side ffmpeg; handler Node nativo VercelRequest/VercelResponse (Web API ignora maxDuration→504); video sube por signed URL, no por la function**; **GOTCHA ffmpeg con imagen: extract-frames busca pista de VIDEO; una imagen fija da 0 frames → 500. Fix: imagen no pasa por ffmpeg — se lee con FileReader.readAsDataURL y va directo al OCR como frame único (iid-expert-ocr acepta data URLs)**; **GOTCHA signed upload: endpoint upload/sign (Fastify) rechaza 400 "Body cannot be empty when content-type is application/json" si mandas Content-Type:application/json sin body → quitar el header**; **GOTCHA Storage DELETE: trigger protect_objects_delete bloquea DELETE FROM storage.objects (42501) → borrar por Storage API REST**; **GOTCHA Storage list: object/list es folder-aware/no recursivo → recorrido recursivo (descender en id===null)**; **PATRÓN verify-JWT: EF con auth propia → toggle Verify-JWT OFF; con ON necesita Authorization Bearer o da 401 del gateway (aplica también a fphs-formalize: deploy con verify_jwt:false explícito, el front del DF llama sin Authorization)**; **GOTCHA secret cross-platform: chars especiales (%$&^) se interpretan distinto Vercel↔Supabase → secret ALFANUMÉRICO PURO**; **GOTCHA service_role Storage: la key nueva sb_secret_ NO sirve para bucket privado → usar legacy eyJ (key_len 219 vs 40)**; **GOTCHA cron trigger_iid_agent: 2 overloads (text)/(text,jsonb); literal sin cast da "function is not unique", cron falla en silencio → castear a ::text**; **GOTCHA merge=deploy: mergear PR a main deploya a PRODUCCIÓN en Vercel (no hay staging) → probar Preview antes de mergear; y merge de PR ≠ deploy de EF (el EF se despliega aparte, explícitamente, tras el merge)**; **Claude Chat NO sube binarios a Storage (los sube Sam por Studio); NUNCA pasar service role key a CC por chat**; **GRANT service_role en tabla nueva (REFUERZO 4-jul): CREATE TABLE por apply_migration NO otorga grants a los roles de la API — toda tabla nueva leída por el DF vía PostgREST necesita GRANT SELECT ON <tabla> TO service_role en la MISMA migración. RLS off es irrelevante: PostgREST chequea GRANTs a nivel tabla ANTES que policies, y BYPASSRLS omite policies no GRANTs. Síntoma: 42501→403→fallback silencioso. Fix permanente aplicado: ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO service_role**; **migración claude-sonnet-5: drop-in de 4-6 pero (1) thinking ON por defecto cuenta contra max_tokens → thinking:{type:disabled} para tareas deterministas; (2) tokenizer +30%; (3) sampling params no-default dan 400; (4) SDK 0.24.3 predata thinking → passthrough runtime o fetch crudo**; **parser multi-plataforma: client/platform-specific knowledge = DATA (df_platform_parsing_config) no code; auto-detección por señales; regex de nombre con ancla real de palabra, no \\b (matcheó "ph" dentro de "Joseph")**; **xlsx detectHeaderRow: índice colapsado (blankrows:false) usado como range absoluto = bug con filas de título → calcular en coords absolutas**; **scope-gating de calibración vive en el FRONT, no en el endpoint service_role: `/api/calibrate.ts` corre con service_role sin validar JWT del IID → el gating (seeder nunca fuera de scope) lo impone el front limitando el `<select>` a listOptions. Regla general: todo endpoint service_role sin JWT delega su gating al front; verificar dónde vive la barrera**; **DDL en PR de front = cambio de prod inmediato: Preview y prod comparten la DB (amlvyycfepwhiindxgzw) → toda migración toca prod cuando CC la corre, no cuando Sam mergea. Ventana schema-tiene-columna / código-aún-no-la-escribe; inocua si nullable y solo se llena; mergear pronto para cerrarla**; **count embebido de PostgREST suele venir OFF: `tabla(count)` por embedding puede dar 400 en runtime (compila igual); usar segundo select agregado para conteos relacionados**; **GOTCHA import ESM sin .js en proyecto "type":"module": @vercel/node compila api/*.ts bajo NodeNext; import relativo sin extensión .js NO resuelve → TS2835 que NO falla el build (queda READY, engaña) → la lambda muere al cargar con ERR_MODULE_NOT_FOUND antes del handler → FUNCTION_INVOCATION_FAILED en TODAS las acciones. Fix: extensión .js explícita (TS mapea al .ts fuente). includeFiles NO ayuda (Node no importa .ts crudo)**; **degradación silenciosa oculta bugs: un safeRead que traga el error por-capa es elegante para "no hay tabla" pero peligroso para "query rota" (indistinguibles). order= por columna inexistente (is_primary en product_blueprints, cláusula copiada de brand_services) → 400 tragado → capa de fórmula MUDA con el endpoint viéndose sano. Distinguir fallo-de-lectura de ausencia-de-datos**; **el generador del bucle debe leer el CONTEXTO REAL de la marca (E7): sin la fórmula (product_blueprints) el modelo alucina ingredientes plausibles de la categoría (D7H inventó Serenoa repens). founder_axis = dirección de voz (hipótesis), NO cuerpo de conocimiento. Regla dura de veracidad + datos reales = fin de la alucinación**; **verificar esquema (columnas Y tipos) ANTES de INSERT/UPDATE, no descubrir por rollback: relational_stance/emotional_register son jsonb no text; product_blueprints no tiene updated_at ni is_primary. Refuerzo del patrón verdict_operator/is_primary**; **el brand_scope de los seeders vive en el SECRET `USERS_RAW` de `iid-inbound`, NO en la DB (la EF carga los usuarios de ese JSON; auth.users está vacía). Sembrar una marca en `brands` + `calibration_sessions` NO la hace visible al seeder → hay que agregar el brand_id al array `brand_scope` del usuario en el secret. FALLA SILENCIOSA: no da error, el operador simplemente nunca ve la marca. Rotar pwd + ampliar scope se tocan en el mismo lugar → juntos**; **ALIAS antes que renombrado: desacoplar la clave técnica (`id`) del nombre público (`display_name` + `domain`) evita repuntar FKs y tocar código. Antes de renombrar un ID, preguntar si basta con un alias. Precondición: verificar que nadie use la fila (sin genoma/topics/sesión) y que ningún front parsee el `id` para mostrar nombre. Mismo principio que "Ron" (público) vs "Alcohol Denat." (INCI)**; **el material real publicado vence a la teoría de tablas: antes de teorizar un eje de voz, buscar si la marca YA tiene material publicado (web, blog, catálogo) y LEERLO. El eje de NSCF editorial salió muy superior al de D7H por esto (existían 4 artículos reales que se destilaron, no se dedujeron). Mismo principio que E7 aplicado al diseño de voz**; **REGLA DURA DE VOZ (transversal): la voz DEMUESTRA, NUNCA declara. (a) Nunca nombrar promesa/garantía/milagro — ni para negarlas ("sin promesas vacías" instala la promesa y le hace pedirla). (b) Nunca declarar autoridad ("+35 años", "experta reconocida") — quien la anuncia pide que le crean. El dato preciso ES la credencial. Nunca construir por oposición**; **la MARCA no lleva voz Profesional (se disuelve): el "currículum" de una empresa ES su Conversión, su criterio sobre el oficio ES su Editorial; el desdoblamiento Profesional existe en una PERSONA, no en una empresa. Los 3 verbos separan las voces de marca sin solape: Conversión VENDE (al decisor), Educativa ENSEÑA (al que VIVE/USA — el "doliente", no necesariamente el decisor), Editorial OPINA (del oficio/mercado). Confundir el blanco de la Educativa con el de la Conversión colapsa las dos voces**; **anclar el rol al DOMINIO, no a una instancia que caduca ("Especialista en Régimen de Propiedad Horizontal" sobrevive a la derogación de la Ley 284; "Experta en Ley 284" caduca con ella). Un TÍTULO habilitante (Abogada, RUC, licencia) es hecho AFIRMABLE (verificable); la EXPERTISE se demuestra, no se declara**; **patrón de diseño de skills: ORQUESTAR, no duplicar — cuando un método ya vive en un skill (fuente única), el skill nuevo lo INVOCA; duplicarlo genera dos vocabularios desincronizados. Antes de escribir un orquestador, LEER el skill que va a delegar**.

**Resend (patrón #48):** cada marca su key. UNRLVL = RESEND_UNRLVL_KEY (content@ → content-approval@). NSCF = RESEND_API_KEY. NUNCA clonar el de nscf-mailer para UNRLVL. Canónico UNRLVL = content-run-stage.

**Secrets:** cada marca su key Resend. Vertex SA en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET. Barrido: STORAGE_SWEEP_SECRET (rotar — se expuso 1-jul). DF: UNRLVL_SUPABASE_URL + unrlvl_service_role + FPHS_SUPABASE_URL + FPHS_SERVICE_KEY (4-jul).

**Anti-IP (dos modos):** Basic/Seed = tema neutro destilado del OCR+visión de Marisol (leer para aprender, no republicar). Expert/Genoma = material insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir. El video ajeno transita el bucket segundos (ffmpeg lo lee y borra + cron huérfanos) — TRANSITA, no PERSISTE; solo persiste texto-método. La regla precisa es "no REPUBLICAR el post", no "no leer el post".

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**