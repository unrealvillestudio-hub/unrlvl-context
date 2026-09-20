# AGENDA — Unrealville Studio
_Actualizada: 2026-09-20 · v2026-09-20-v1 (**CIERRE DEL 2026-09-20 — EL CONTEO SALE DE LA BASE, UNA SOLA VEZ, Y UN «FIXABLE» DEJA DE SER UN DESCARTE.** Cuatro PR mergeados y aplicados —`unrlvl-iid-functions#188`, `Orchestrator#47`, `unrlvl-iid-functions#189` y `#190`— y cuatro migraciones (`20260920090000`, `100000`, `110000`, `120000`), las cuatro pineadas. **EL CASO:** tres instrumentos respondían la misma pregunta —cuántas piezas esperan el criterio de Sam— y daban **583**, **87** y **64**. `medido` el 2026-09-20: no era un error de resta, eran **tres preguntas distintas con el mismo nombre**. El despertador de las 7am contaba **jobs**, no piezas —**678 filas `pending` contra 2 `approved`** en `content.orchestrator_jobs`, nada las marca nunca como resueltas, así que la cifra sólo podía crecer, y **258 de ellas eran jobs fallidos que nunca produjeron pieza**—; y la sección 4 del informe contaba con **dos consultas solapadas**, `status='awaiting_approval'` y `challenged_at IS NOT NULL`: **16 piezas estaban en las DOS** —se retaron, se re-adaptaron y volvieron a la bandeja, y `readaptPiece` **no borra `challenged_at` ni debe**, porque esa fecha es el registro de que fueron retadas— y **otras 7** figuraban «en challenged» estando ya publicadas. **EL EJE, y es la regla del día: el estado vivo de una fila es su `status`; las columnas `*_at` son HISTORIA** —dicen que algo le PASÓ, no lo que la fila ES—, **y el criterio tampoco es una cadena**. Eso segundo **lo anticipó Sam antes de medir** —*«podría decir otra cosa y entonces fallaría»*— y la medición le dio la razón con un número: de las **41** piezas con veredicto `fixable` en el corpus, **TRES no llevaban el prefijo en su motivo**; de hecho **no llevaban motivo ninguno**, así que un `WHERE … ILIKE 'fixable%'` habría reparado 38 y **callado 3**. **EN PRODUCCIÓN:** la vista **`content.pieces_awaiting_criterion`** —fuente única del conteo, que el correo, el informe y el Orchestrator leen—; **`ops-daily-report` modo `digest`**, el resumen de cada 4 horas con los MISMOS contadores y **sólo conteos, sin un solo `piece_id`**, con tabla `alerting.digest_reports`, severidad **`digest`** y cron `alerting-digest-4h` `0 1,5,9,13,17,21`; el **correo por pieza apagado por dato** (`intel.iid_scheduler_config.piece_email_mode='digest'`, reversible con un `UPDATE` y fail-safe **hacia el ruido, nunca al silencio**); y **`iid-approval-digest` ADOPTADA al repositorio** — `medido`: llevaba **ACTIVA desde julio en su versión 28 sin código en ninguna rama**, y por eso sus dos defectos se atribuyeron durante días al repositorio equivocado. **UN `FIXABLE` RETA LA PIEZA, YA NO LA DESCARTA:** `discarded_at` no la saca de una bandeja, **la saca del sistema** —deja de sostenerse su imagen, el scheduler la excluye y la re-adaptación la rechaza—, así que marcar algo para arreglarlo lo estaba sacando de la cola de lo arreglable; ahora escribe `status='challenged'` y el eje nuevo **`por_arreglar`** lo distingue de `retenida`, que es el desacuerdo del juez. **Las 41 vuelven a la cola**, con su estado anterior archivado y **40 de 41 conservando su imagen**. **ESTADO MEDIDO AL CIERRE: 109 esperando criterio** = `awaiting_approval` **64** · `fixables` **41** · `aplazadas` **4**. **LO QUE COSTÓ, Y DEJA REGLA:** (1) **una orden correcta sobre una premisa falsa, aportada por quien la iba a ejecutar** — se reportó «una pieza rechazada por ti y agendada para salir» **sin leer `approved_at`**, y la medición completa mostró que el «rechazo» del 31-ago era una **PREGUNTA** —*«Si todo está bien entonces se aprueba»*— y que Sam la había **APROBADO el 12-sep**; se le devolvió la cronología y **él decidió**: corregir el corpus, no la pieza; (2) **`tsc -b` pasó en verde sobre una divergencia real** entre las dos declaraciones de `PendingState`, y lo cierra un test que **lee los dos archivos**; (3) **dos guardarraíles ficharon defectos reales y los dos se arreglaron en vez de ensancharse**. **`ecosystem.json` pasa a `2026-09-20-v1`** y sus dos derivados **se SINCRONIZAN en commit separado, no se regeneran**. **Professor cerrado ANTES de este Actualiza, y esta vez por CC**: seis learnings sembrados, **cinco aprobados por Sam** y uno en la cola de su criterio. **Barrido de voseo sobre el bloque nuevo: cero apariciones.** **Cabecera anterior íntegra inmediatamente debajo.**)_
_Actualizada: 2026-09-17 · v2026-09-17-v1 (**CIERRE DEL 2026-09-17 — ALERTAS-01: EL ECOSISTEMA AVISA POR TELEGRAM, INFORMA A LAS 07:00 UTC Y SE VIGILA A SÍ MISMO DESDE FUERA.** Diez PR mergeados, aplicados y verificados —cuatro del encargo (`unrlvl-iid-functions#162`, `#164`, `#165`, `unrlvl-ops#11`) y seis de arreglos del mismo día (`#166`, `#168`, `unrlvl-ops#12`, `#169`, `#170`, `#171`)—. En producción: esquema **`alerting`** con **13 tablas** y **11 funciones**, RLS en las 13 con políticas `service_only`; **tres Edge Functions** (`ops-alert-dispatch`, `ops-alert-callback`, `ops-daily-report`), las tres `verify_jwt: false` y autenticadas por **`x-cron-secret`** —quien las llama es `pg_net`, que no manda JWT de usuario—; **tres crons**; **tres disparadores** `AFTER INSERT` sobre `intel.watcher_log`, `intel.brand_publish_drain_log` y `alerting.alert_action_log`; y un **vigilante externo** en `unrlvl-ops` con cron de Vercel cada 5 minutos, **fuera de la base a propósito**: un vigilante que corre dentro de lo que vigila no puede avisar de que lo vigilado se cayó. **Estado medido al cierre** [`medido` por CC el 2026-09-17 hacia las 21:37 UTC]: carril intacto —0 errores del detector sobre el carril y 0 corridas de cron fallidas desde el PR 3—, vigilante latiendo por debajo de 5 minutos, **`watchdog_snapshot` en 135 ms en la vía real contra 17.090 ms antes del arreglo**, **0 episodios `CRON_SILENT`**, **cuatro `CRON_NEVER_RAN` abiertos y los cuatro verdaderos positivos**, 12 de 12 reglas suenan, suites **90/0** y **17/0**. **LO QUE COSTÓ, Y ES LO QUE DEJA REGLA:** (1) una medición hecha **fuera de la vía real** se etiquetó `medido`, se mergeó y **rompió el vigilante durante siete minutos en producción** —`EXPLAIN (ANALYZE)` en el nivel superior dio 259 ms y la vía real 17.090 ms contra un `statement_timeout` de 8 s, porque **`SELECT … INTO` impone un límite de filas y un plan con límite de filas no se paraleliza**—, y de ahí sale la **sexta regla de `MEASUREMENT_METHOD_RULE`**; (2) **tres guardas distintas se dispararon sobre su propia explicación** por no quitar comentarios antes de comprobar; (3) **dos comprobaciones verdes no veían su propio defecto**, y lo delató inyectarles la regresión; (4) atar **«se puede actuar»** y **«tiene que sonar»** al mismo literal de severidad dejó **cuatro episodios prioritarios sin botones**, reescalando cada hora durante 72 horas —hoy son dos ejes separados, y **el silencio es dato**: `alerting.alert_rules.silent boolean NOT NULL DEFAULT false`—. **Dos etiquetas `medido` retiradas por medición posterior**, archivadas en su PR y no borradas: el supuesto (b) de `#168` sobre el coste y la afirmación de `#170` sobre `disable_notification`. **`ecosystem.json` pasa a `2026-09-17-v1`** y sus dos derivados **se SINCRONIZAN en commit separado, no se regeneran**. Professor cerrado **antes** de este Actualiza, por Claude.ai [`reportado`]. **Barrido de voseo sobre el bloque nuevo: cero apariciones.** **Cabecera anterior íntegra inmediatamente debajo.**)_
_Actualizada: 2026-09-13 · v2026-09-13-v2 (**CIERRE DEL 2026-09-13 — CUATRO CORRECCIONES DE SAM SOBRE EL `v1`, Y DOS FRENTES QUE SE CIERRAN EL MISMO DÍA EN QUE SE ABRIERON.** Amplía el `v2026-09-13-v1` inmediatamente debajo; **no lo reescribe**. **(1) El `REVOKE` sobre `intel.match_content_embeddings` YA ESTÁ APLICADO** por Claude.ai: ACL medido **`{postgres=X/postgres, service_role=X/postgres}`**, `anon` y `authenticated` en **falso**, `service_role` en **true** [`medido` por CC el 2026-09-13, después del cambio]. **El frente 11 del `v1` nace y muere el mismo día**, y **no se abre migración**: el único llamador es `content-watcher` con `service_role` y el Orchestrator no la usa [`reportado`]; la reversión, si alguna corrida dejara de comparar, es un `GRANT EXECUTE … TO PUBLIC` por firma completa. **(2) §5.b cambia de condición, no de estado: U-5 está mergeado y funcionando** [`reportado`], así que **la ventana «antes de U-5» se cerró y NO se fabrica un caso de prueba** — **la primera revocación real de Sam sobre una pieza programada ES la verificación**. Queda anotado como **verificación pendiente de un evento, no como tarea**, con su línea base para comparar después [`medido`]: **55 franjas `free`** (cero con pieza), **21 `reserved`** (las 21 con pieza), 4 `published`, 1 `failed` — **cero huérfanas por las dos lecturas**. **Cae la corrección 5 del `v1`:** la franja `0ed7214c…` deja de ser candidata a caso fabricado. **(3) Dos correcciones al catálogo, y las dos retiran una afirmación de acceso que era falsa:** el proxy **`api/professor` SÍ acepta POST**, y **`action=submit-learning` funciona** pasando `relevance_score` **explícito dentro del `1..5` del `CHECK`** — el `500` documentado el 2026-09-10 lo producía **la EF calculando el valor fuera de rango**, de modo que **la causa raíz era correcta y la conclusión que se sacó de ella no lo era**: de *«el `CHECK` rechaza el valor»* se pasó a *«no se puede por el proxy»* **sin medir la regla**, y eso estuvo tres días en el catálogo [`reportado` — Claude.ai, 12 learnings sembrados por esa vía entre las 13:47 y las 13:49 UTC; **corroborado por CC**: 12 filas con `session_date = '2026-09-13'`, **las 12 con `relevance_score = 5`**, y el `CHECK` sigue siendo `>= 1 AND <= 5`]. **Las dos redacciones anteriores se archivan bajo guard `⛔ NO OPERATIVO` con su texto literal, ninguna se borra.** `CAPABILITIES.md` pasa a **1.17**. **(4) El PR del voseo queda DESBLOQUEADO** — A-1 mergeado y desplegado, `content-watcher` **v57** `b0c62f50…77694` [`medido`] — **y NO entra en este PR**: es trabajo de otro repo y le faltan tres datos que CC no puede obtener solo, listados abajo. **Y un hueco que CC sí midió al ir a buscarlo:** en el `verify_pattern` de `HR-GEN-05` **no está `devolvés` NI `devolvé`** — **faltan las dos**, no una; la denylist es una **enumeración de formas literales**, así que **todo verbo no enumerado escapa**, y `devolver` es sólo el ejemplo que se nombró [`medido` el 2026-09-13 sobre `intel.watcher_rules`])_
_Actualizada: 2026-09-13 · v2026-09-13-v1 (**CIERRE DEL 2026-09-13 — EL CARRIL DEJA DE ESTAR CIEGO POR EL LADO DEL CÓDIGO, Y SEIS AFIRMACIONES DEL BRIEF QUE LA MEDICIÓN MATIZA.** Entró en producción: **`publish-slot-reserver` v11** (`ezbr_sha256` **`c12e02c6…c606b`**) filtrando `discarded_at` —**N16 cerrado por el lado del código**—; **`blog-promoter` v6** (**`c9d262d8…0acfc`**); **`content-watcher` v57** (**`b0c62f50…77694`**); **`content-run-stage` v123** (**`8babc595…a9d5a`**) [los cuatro `medido` con `Supabase:list_edge_functions` el 2026-09-13]. El `CHECK` de `intel.brand_publish_drain_log.outcome` pasa de 6 a **13 valores** —9 de eje de desenlace más **4 alias legacy `BLOG_*`**, con el mapa completo escrito en el `COMMENT` de la columna— [`medido`]. **`intel.brand_similarity_threshold` creada y sembrada**, con el eje corregido a **`own_brand` / `cross_brand`**: cortes vigentes **NeuroneSCF `0.93739`** y **LucienSael `0.90551`**; **ForumPHs y UnrealvilleStudio en `SIN_LINEA_BASE`** [`medido`, 8 filas]. El RPC `intel.match_content_embeddings` queda en **una sola firma** con `p_match_domain boolean DEFAULT true` [`medido`]. **LO QUE CC CORRIGE POR MEDICIÓN, y son seis:** (1) `min_own_vectors = 30` **no es propuesto — está sembrado** en las ocho filas; (2) el ACL del RPC **no está acotado a `service_role`: `PUBLIC` conserva `EXECUTE`**, así que `anon` y `authenticated` lo ejecutan —no es `CC_PROTOCOL` §11 porque `prosecdef = false`, pero el `GRANT` explícito lee como si estuviera acotado—; (3) `cross_brand` está en `SIN_LINEA_BASE` **por población vacía por construcción**, no por falta de volumen —los dominios no se solapan entre marcas—; (4) ForumPHs y UnrealvilleStudio **incumplen las dos guardas**, no una; (5) la candidata de §5.b **existe y está viva** —franja `0ed7214c…` reservada para la pieza `d621e8d5…`, en `scheduled` y sin descartar—, así que revocarla **escribe en producción** y es decisión de Sam; (6) la cita caducada del §2.2 del brief **ya no sigue viva** — la cerró el PR #95 y su redacción anterior quedó bajo guard. **Regla nueva y la más cara del día, en `CAPABILITIES.md`: mergear no despliega, y desplegar tampoco despliega necesariamente lo mergeado** — cinco de ocho despliegues subieron el bundle anterior por correr desde un clon sin `git pull`, con el contador de versión subiendo igual. **El criterio de éxito de gate5 sigue SIN cumplir** y no es medible hasta que corra tráfico nuevo. `ecosystem.json` **no cambió**: sus derivados no se tocan. Professor cerrado antes: **12 learnings** del 2026-09-13, los doce con `relevance_score = 5` [`reportado` — brief de Claude.ai])_
_Actualizada: 2026-09-12 · v2026-09-12-v3 (**CIERRE DEL 2026-09-12 — SAM DECIDE, Y LA FUGA DE N10 QUEDA CERRADA POR EL LADO DEL BLOG.** Cinco decisiones de Sam, **escritas con su motivo**; CC ejecutó las dos primeras con el método que él fijó —**en seco, lectura, aplicación**— y verificó **por efecto**. **(1) `blog-promoter` v1.2 desplegada** —`version 3`, `ezbr_sha256` **`9529a937…8418f97`**, `verify_jwt` `false` preservado; código en `unrlvl-iid-functions` **PR #145**—: la rama `YA_PUBLICADA` **ahora sella la franja y rellena lo que falte**. Cron 99 apagado durante la prueba y encendido al terminar. **Medido antes y después:** las dos franjas pasan de `reserved` a **`published`** con el `published_at` **de la pieza** —los dos libros mayores cuentan por fin la misma fecha—, `post_url` y `slug` pasan de **NULL** a puestos, **`intel.drain_due_slots(200)` deja de devolverlas** y las franjas vencidas y reservadas bajan de **6 a 4**; las 4 que quedan son `x_api` y `tiktok_business` y **esperan su publicador**. **(2) Manda `discarded_at` sobre `status`** —*el descarte es un veredicto humano, `status` es una posición en la cola*—: las 3 piezas incoherentes de NeuroneSCF pasan a `rejected` sin tocar el veredicto, y **se libera una franja futura del 16-09 que una pieza descartada el 09-09 tenía reservada**. **El hueco de fondo, medido: `publish-slot-reserver` NO filtra `discarded_at` —cero apariciones en el archivo—**, mientras `content-scheduler` sí lo hace en las líneas 2422 y 2485. **(3) La pieza es el texto adaptado** `social.adapted[n].copy`: **encargo propio y con prioridad**, porque todo lo que se calibre hasta que se arregle se calibra sobre el texto equivocado; **las 22 notas no se pierden, se reevalúan**. **(4) 200 pares de mínimo, con la contrapartida dicha en voz alta:** sin corpus suficiente el gate declara **`SIN_LINEA_BASE`** y **no compara** —nunca aprueba en silencio por tabla vacía—, y **una marca sin gate publica igual porque nada sale sin la aprobación de Sam**. **(5) Frente 4 reordenado: primero el agente, después el dominio** — el cuello no son los dominios sino los agentes que los trabajan: ForumPHs produce sobre **5 de 32**, LucienSael sobre **1 de 4**. **🔴 Y UN HALLAZGO NUEVO, QUE ES DECISIÓN PENDIENTE: la bitácora del promotor NUNCA pudo escribir una fila, en ninguna versión.** Un `catch` a propósito ocultó **tres rechazos apilados**, probados sin escribir nada: `run_id` `NOT NULL` sin default (**23502**), `slot_id` igual, y el `CHECK` de `outcome` que **no admite ninguno de los cuatro `BLOG_*`** (**23514**). Si el lunes el promotor publica, **publica sin rastro**. Es DDL sobre tabla compartida: **no se aplica sin Sam**. **N16 sube a 24 piezas contra 44 franjas libres** y gana causa que investigar. **Barrido de voseo sobre el bloque nuevo: cero apariciones.** **Cabecera anterior íntegra inmediatamente debajo.**)_
_Actualizada: 2026-09-12 · v2026-09-12-v2 (**CIERRE DEL 2026-09-12 — EL PROMOTOR DE BLOGS ESTÁ VIVO EN PRODUCCIÓN, Y RECONOCER LO YA HECHO LE CUESTA EL SELLO.** `blog-promoter` v1.1 desplegada el 2026-09-12 **17:53:11 UTC**, `ezbr_sha256` **`db02acb3…fca169`**, cron **`blog-promoter-15min`** `jobid 99` `*/15 * * * *` **activo** [medido]. **CINCO AFIRMACIONES DEL BRIEF CORREGIDAS POR MEDICIÓN, y dos cambian el encargo:** (1) **no es un `dry_run`** — lleva **nueve invocaciones reales HTTP 200**, `dry_run:false`, `canales:3`, `franjas_vencidas:6`, todas `YA_PUBLICADA` [medido en `net._http_response`]; (2) 🔴 **la rama `YA_PUBLICADA` NO sella la franja**, así que **dos franjas `vercel_html` con pieza ya publicada quedan `reserved` para siempre** —`66227c12…` de LucienSael y `c09c824a…` de ForumPHs, vencidas desde el 08 y el 10 de septiembre— **reabriendo la fuga de N10 en la cabeza de la cola**, y **sus dos piezas siguen con `post_url` en NULL**, que es justo el defecto que el promotor vino a cerrar [medido]; (3) la causa raíz del blog de UnrealvilleStudio **no es código por marca** —**cero marcas hardcodeadas** en los cuatro EF del camino—: `platforms` de la fila de cola sale del **`platforms_hint` del modelo** (`iid-process/index.ts:845` → `iid-core/index.ts:112`) y **`brand_topics.platforms` nunca se consulta**; (4) el contador de hashtags **NO miente** — `hashtags_out:2` es exacto sobre `social.adapted[0].copy` (2 hashtags, 1.187 chars, español), y **`assets.copy` es OTRO texto** (0 hashtags, 3.747 chars, inglés): **la bandeja muestra un texto y el publicador manda otro**, y las 22 notas de Sam se escribieron mirando el que no publica; (5) el corte por **percentil 99 no da 0,97 y 0,94 sino 0,9603 y 0,9046** —ésas eran los máximos— y **LucienSael no tiene línea base de dominios distintos: sus 52 vectores son de un solo dominio**. **Confirmado exacto:** las 4 medias de coseno sobre los **241 vectores**, el reparto de las **56** piezas devueltas a la bandeja (NSCF 32 · FPHS 12 · LUC 8 · UVS 4), los dominios por marca (32 · 9 · 6+1 · 4) y el handle **`hair-intelligence`** de Shopify. **El umbral `0.80` es literal en `content-watcher/index.ts` en NUEVE sitios y TRES gates** (449, 450, 456, 458, 1059, 1073, 1101, 1454, 1456) y la línea 964 ya lo confesaba. **SERIE N:** N07, N08 y N13 dejan de ser `SIN CONTENIDO` · **N13 CERRADO** con su defecto abierto · **N16 DADO DE ALTA** —**24** piezas `scheduled` sin franja contra **43** franjas libres futuras, peor que el 13/45 del brief— · N05A confirmado `UNIQUE INDEX` por tercera vez, **y es por qué «11 cerradas» no tiene representación en el dato**. **Y un hallazgo que reordena el Frente 4:** los dominios declarados **no producen** — ForumPHs escribe sobre **5 de 32**, LucienSael sobre **1 de 4**: primero el agente y su cron, después el dominio nuevo. **Barrido de voseo sobre el bloque nuevo: cero apariciones** [medido con el `verify_pattern` de `HR-GEN-05`]. **Cabecera anterior íntegra inmediatamente debajo.**)_
_Actualizada: 2026-09-12 · v2026-09-12-v1 (**CIERRE DEL 2026-09-12 — EL MÉTODO DE PUBLICAR SE VUELVE CARGABLE, Y N10 QUEDA APLICADO A MEDIAS.** Alta de **`skills/publicacion-operativa/SKILL.md` v1.0**, capa MÉTODO y destino CARGABLE, entregado por Sam y **registrado literal** —md5 idéntico contra el origen—: cubre el hueco que `BRIEF-06` §4.4 nombró y que **no existía en el repo** [medido]. **BRIEF-06 encendido en seco:** `intel.carril_regulation_log` creada, `carril-regulator` desplegada y su `dry_run` corrido —**16 canales, 14 `SUPPLY_ABSENT` y 2 `HOLD`, cero liberadas, cero aparcadas, déficit total 75,2**—, `carril-regulator-daily` **ACTIVADO** y `carril-cobertura-alarma-daily` **apagado a propósito** [medido, todo]. **N10:** la DDL está —columna, intervalo en config y RPC con backoff— y el **punto 5 aplicado**: `intel.v_carril_cobertura` gana `franjas_sin_publicador` y `primera_sin_publicador` **sin cambiar ninguna fórmula** [medido]. **LO QUE ESTE BLOQUE ABRE, Y ES LO URGENTE: `content-scheduler` NO lleva el código de N10.** La desplegada es la **v17 del 2026-09-10 21:43 UTC** —trae el tope de caption, **cero apariciones** de `sellarBackoff`, `last_drain_check_at` y `SLOT_BACKOFF_FAILED`— y el efecto lo confirma: **120 `PROVIDER_NOT_DRAINABLE` en 6 horas y CERO franjas selladas** [medido]. **El backoff no está operando.** Los 12 crons de UnrealvilleStudio reprogramados a semanal, lunes a sábado [medido: los 12 activos]. **Cabecera anterior íntegra inmediatamente debajo.**)_
_Actualizada: 2026-09-09 · v2026-09-09-v1 (**HRD_ACTUALIZA 2026-09-09 — UNA PUBLICACIÓN FUERA DEL CARRIL, DOS EDGE FUNCTIONS DE EJE, Y OCHO FRENTES QUE QUEDAN ANOTADOS.** Publicado el carrusel del **Proyecto de Ley 678** de ForumPHs en Instagram (`18016965923948414`) y Facebook (`1184045168120977_122135449431355949`) **fuera del carril y con aprobación de Sam** [reportado — brief de Claude.ai, 2026-09-09]. Desplegadas **`media-store`** y **`meta-graph-post`** en `amlvyycfepwhiindxgzw`: las dos son **eje** —bucket, ruta, bytes, `brand_id`, mensaje e imágenes entran por el cuerpo— y **ninguna cablea marca** [medido: código de las dos EF leído con `get_edge_function` al escribir este bloque]. Publicadas por marcado las dos piezas de blog de ForumPHs y la primera de LucienSael; corregidas y pasadas a `scheduled` tres piezas de NeuroneSCF marcadas `fixable` por Sam [reportado — brief]. **Lo que este Actualiza deja ABIERTO, y es lo que importa:** no existe **promotor de blogs** que mueva una pieza de `scheduled` a `published` · las **14 reglas `blocking`** del Watcher están **todas inactivas**, así que hoy ninguna regla puede detener una pieza · **no hay regla de registro gramatical** en ninguna marca · **16 piezas en `awaiting_approval`** —la más vieja del 31 de julio— **no aparecieron en la bandeja de calibración** · el **drenaje reintenta sin fin** contra proveedores no drenables (164 intentos en un día entre `blog` y `x` de LucienSael) · hay un **secreto literal como fallback** en las dos EF nuevas · y **dos libros mayores discrepan**: `scheduled_posts` registró una publicación que `brand_publish_slots` no reflejó. **Cerrado:** `vercel_html` **sí publica**, por lectura y no por drenaje — `PROVIDER_NOT_DRAINABLE` es correcto por diseño para ese proveedor. **Decisión pendiente para Sam:** la rotación de esta AGENDA, que con **365.851 b** es **3,2 veces** su propio archivo histórico [medido]. **Adición 2026-09-10 — SERIE N, sección propia:** los identificadores `N05A`, `N07`, `N08`, `N10`, `N13`, `N14` y `N15` **no estaban en ningún context file**, y por eso un encargo que los nombrara era irresoluble. Ahora tienen registro con su estado medido. **N10 es lo urgente y empeora solo**: `intel.drain_due_slots` **no filtra por proveedor**, las franjas no drenables nunca alcanzan estado terminal y ocupan la cabeza de la cola —**544 filas acumuladas y 4 franjas atascadas, dos de ellas desde el 2026-09-08**—; al llegar a las 50 del techo, **la publicación se detiene sin un solo error**. **N14 no se reproduce**: ninguno de los dos `cron.job.command` lleva secreto en claro [medido con volcado redactado]. **N15 se abarata**: el tope ya vive en `platform_configs.char_limit`, así que es enrutar un dato que existe, no crearlo. **N07, N08 y N13 quedan declarados SIN CONTENIDO** — nombrados y sin definición en ninguna parte.)_

---

## 🗓️ CIERRE 2026-09-20-v1 — el conteo sale de la base, y un «fixable» deja de ser un descarte

_(Bloque al tope. **No reescribe ninguna versión anterior** — el `v2026-09-17-v1` y toda su cadena se
conservan íntegros inmediatamente debajo. Todo lo etiquetado `medido` lo consultó **CC** el
**2026-09-20** entre las ~17:30 y las ~22:35 UTC con `Supabase:execute_sql`,
`Supabase:list_edge_functions` y `Supabase:get_edge_function` sobre `amlvyycfepwhiindxgzw`, y contra
los repositorios `unrlvl-iid-functions` y `Orchestrator`. Detalle completo de la sesión en
`IID/session_log.md`, entrada del **2026-09-20**.)_

---

### ✅ CERRADO HOY

Una sola fuente para «cuántas piezas esperan el criterio de Sam», el resumen de cada 4 horas en
producción, el correo por pieza apagado por dato, y un `fixable` que **reta** la pieza en vez de
descartarla. **Cuatro PR** mergeados y aplicados. Detalle en el `session_log` del 2026-09-20.

---

### 🔴 QUEDA ABIERTO — cuatro frentes, ninguno bloqueante

**A · El registro de migraciones — MEDIR ANTES DE DECIDIR.** `medido` al cierre: **209 filas** en
`supabase_migrations.schema_migrations` contra **82 archivos** en `supabase/migrations/`. Antes de los
PR de hoy **sólo 3 coincidían por versión**: el registro guarda versiones del momento de aplicación y
los archivos las llevan escritas a mano. **Dos historias paralelas que nunca se alinearon.** Sam:
*«prefiero MEDIR antes de tomar una decisión apresurada y a su vez incorrecta. Investigación profunda
porque toca el corazón de el ecosystem, la DB.»* **No hay encargo de arreglarlo; hay encargo de
medirlo.** Cuatro archivos necesitan trato especial [`reportado`]: `20260919190000` y `20260919210000`
declaran `CORRIGE y SUSTITUYE`; `20260827160000` y `20260827180000` declaran que **nunca se aplicaron**.

**B · La sesión de arreglos de las 41.** Todas con su propuesta en `challenged_reason` y **40 con
imagen intacta**; la más antigua lleva **26 días**. La vía está probada: `readapt` y `recompose` por
pieza, invocados con `net.http_post` y el `x-cron-secret` de `intel.iid_scheduler_config`. **Son cuatro
marcas y 41 piezas: no se readaptan en masa sin Sam.**

**C · La lista de fixables en el Orchestrator**, con `piece_id`, motivo, marca y antigüedad — lo pidió
Sam el 2026-09-20. **Ya tiene de dónde leer**: `content.pieces_awaiting_criterion` expone exactamente
esos campos. Queda decidir con él si quiere vista propia o le basta filtrar la bandeja por el eje
`por_arreglar`.

**D · `tiktok` sin fila en `public.content_type_registry`** teniendo política de publicación activa en
UnrealvilleStudio [`medido`]. **Corrección de una nota anterior: `x` NO está pendiente** — no tiene
política activa, así que no hay canal que servir. Antes de sembrar: `pipeline_family` es **NOT NULL**,
y una migración validada sólo con `EXPLAIN` ya falló por eso hoy (`23502`).

---

### 🟡 VERIFICACIÓN PENDIENTE DE UN EVENTO, no tarea

Los dos correos automáticos **aún no han salido por cron** al cerrar este bloque. Se miran, no se
construyen: el resumen de las **01:00 UTC**, el informe de las **07:00 UTC** y el despertador de las
**11:00/12:00 UTC** deben decir **los mismos tres números**. Si uno discrepa, el fallo está en el
lector, no en el criterio — los tres leen de la misma vista, y un test falla si divergen.

---


## 🗓️ CIERRE 2026-09-17-v1 — ALERTAS-01: el ecosistema avisa, informa y se vigila desde fuera

_(Bloque al tope. **No reescribe ninguna versión anterior** — el `v2026-09-13-v2` y toda su cadena se
conservan íntegros inmediatamente debajo. Todo lo etiquetado `medido` lo consultó **CC** el
**2026-09-17 hacia las 21:37 UTC** con `Supabase:execute_sql` y `Supabase:list_edge_functions` sobre
`amlvyycfepwhiindxgzw`. Lo etiquetado `reportado` lo afirma el **brief de Actualiza de Claude.ai del
2026-09-17** y **CC no lo midió**. Detalle completo de la sesión en `IID/session_log.md`, entrada del
**2026-09-17**.)_

---

### ✅ CERRADO HOY — ALERTAS-01

Canal de alertas por Telegram, informe diario de las **07:00 UTC** y vigilante externo, **en
producción**. **Diez PR** mergeados y aplicados. Detalle en el `session_log` del 2026-09-17.

---

### 🔴 DEUDAS ABIERTAS

1. **Cuatro crons semanales que no han corrido nunca** — `uvs-cro-process-weekly`,
   `uvs-cro-research-weekly`, `uvs-signal-process-weekly`, `uvs-signal-research-weekly`. Cero
   corridas en toda su historia, los cuatro `active = true` [`medido`]. **Decisión de Sam:
   arreglarlos o retirarlos con `cron.unschedule`.** Mientras sigan así avisan cada hora hasta
   caducar a las 72 h.
2. **El canal de correo no tiene ruta activa.** Los episodios salen sólo por Telegram; el encargo
   pedía dos canales.
3. **`cron.job_run_details` crece sin purga** desde el 2026-04-25, con **354.339 filas** y **161 MB**,
   y **no se puede indexar: la tabla no es nuestra** —`CREATE INDEX` devuelve `must be owner of
   table`— [`medido`]. Lo que existe hoy contra eso es el resumen incremental
   `alerting.cron_run_rollup`, no un índice.
4. **Literal de dominio en capa compartida** — `ops-alert-dispatch:211` lleva el remitente del canal
   de operaciones **escrito en el código** [`medido`]. Es deuda contra la regla multimarca y se
   retira moviéndolo a dato.
5. **PR pendiente de `API_SCHEMA_UNEXPOSED`**, decidido para después de cerrar ALERTAS-01.
6. **Producción de contenido, por marca** [`medido` **por Claude.ai** el 2026-09-16; **CC no lo
   midió**] — una marca sin cron de investigación y sin piezas nuevas desde el 30-ago; otra con 0
   piezas aprobadas por el juez en 7 días y sin piezas nuevas desde el 1-sep; una tercera sin piezas
   desde el 3-sep. **Sesión propia, acordada con Sam para después del canal.**
7. **Corrector de fallos (Bug-Fixer)** — sesión propia, acordada con Sam [`reportado`]. Su semilla es
   `alerting.failure_remediation.auto_action`, que **hoy nadie lee** [`medido`]. Requiere tipar antes
   las causas que hoy viven en texto libre dentro de `PUBLISH_FAILED`.
8. **Brief del voseo** — pendiente de medición: el correo de `iid-approval-digest` contiene formas
   voseantes [`reportado`]. Sigue además abierto el hueco que CC midió el 2026-09-13: el
   `verify_pattern` de `HR-GEN-05` es una **enumeración literal**, así que todo verbo no enumerado
   escapa.
9. **Fuera de alcance desde el paso 0, sin tocar y reportado** [`medido` al encontrarlo] — la
   duplicación con `sendWatcherBlindAlarm()`; el cron 86 `carril-cobertura-alarma-daily`, inactivo
   desde el 12-sep y con la misma franja que `alerting-daily-report`; el `PATCH` de
   `CostLayer.tsx:229` con clave `anon` y sin política de escritura medida; la deuda del §11 en cuatro
   migraciones anteriores; y la ceguera a comentarios de `tests/privilegios_funciones_test.mjs`.
10. **`public.ops_model_alerts`** — tiene lector y escritor vivos por clave `anon`
    (`CostLayer.tsx:112` y `:229`) [`medido`]. El `REVOKE` quedó **fuera del PR 1 por decisión de
    Sam**. Su retirada, si se decide, va en un PR propio junto con el Cost Layer.
11. **Skills `vercel` (v1.0) y `github-auditor` (v1.0) desactualizados** [`medido` **por Claude.ai**;
    **CC no los leyó**] — describen push directo a `main` y PAT pegado en el chat, contra
    `CC_PROTOCOL` y la regla de seguridad vigente. **Revisión pendiente.**

---

### ⏳ PROGRAMADO SIN INTERVENCIÓN

- **V7** — primer informe diario el **2026-09-18 a las 07:00 UTC**, con verificación a las **07:15**.

---

## 🗓️ CIERRE 2026-09-13-v2 — Cuatro correcciones de Sam, y dos frentes que se cierran el mismo día en que se abrieron

_(Bloque al tope. **Amplía el `v2026-09-13-v1` inmediatamente debajo; no lo reescribe** — el `v1` se
conserva íntegro con sus cifras y sus etiquetas, incluidas las que este bloque supersede, porque el
valor de una corrección está en poder leer qué se afirmaba antes. Todo lo etiquetado `medido` lo
consultó **CC** el **2026-09-13 entre las 21:00 y las 21:05 UTC**. Lo etiquetado `reportado` lo afirma
**Sam, en su corrección del 2026-09-13**, y **CC no lo midió**.)_

---

### ✅ CORRECCIÓN 1 — el `REVOKE` ya está aplicado; el frente 11 nace y muere el mismo día

**Aplicado por Claude.ai** [`reportado`]. **Verificado por CC** [`medido`]:

| Lectura | Antes (v1, 20:47 UTC) | Ahora (21:00 UTC) |
|---|---|---|
| `proacl` | `{=X/postgres,postgres=X/postgres,service_role=X/postgres}` | **`{postgres=X/postgres,service_role=X/postgres}`** |
| `has_function_privilege('anon', …, 'EXECUTE')` | `true` | **`false`** |
| `has_function_privilege('authenticated', …, 'EXECUTE')` | `true` | **`false`** |
| `has_function_privilege('service_role', …, 'EXECUTE')` | `true` | `true` |

**No se abre migración para esto.** Ya está hecho. **Y la reversión está escrita por adelantado**, que
es lo que convierte un cambio de privilegios en algo reversible en vez de en algo que da miedo tocar:
si en alguna corrida posterior **gate5 o gate1 dejaran de comparar**, se restituye con
`GRANT EXECUTE … TO PUBLIC` **por firma completa** — dos sobrecargas del mismo nombre son dos
funciones, y aquí hay **una sola firma** [`medido` en el `v1`].

**No debería hacer falta:** el único llamador es **`content-watcher` con `service_role`**, y el
**Orchestrator no la usa** —cero coincidencias en su repo— [`reportado`].

> **El frente 11 del `v1` queda CERRADO.** Se conserva ahí escrito a propósito: un frente que se abre
> y se cierra el mismo día **sigue siendo la prueba de que la lectura lo encontró**. Borrarlo dejaría
> el catálogo igual de limpio y la trazabilidad peor.

---

### 🔄 CORRECCIÓN 2 — §5.b cambia de condición: la verificación pasa a depender de un evento

**U-5 está mergeado y funcionando** [`reportado`]. **La ventana «antes de U-5» se cerró**, y de ahí se
sigue lo importante: **no se fabrica un caso de prueba**. **La primera revocación real de Sam sobre una
pieza programada ES la verificación.**

**Esto retira la corrección 5 del `v1`.** La franja `0ed7214c…` **deja de ser candidata**: no porque el
dato haya cambiado, sino porque **ya no hace falta un caso fabricado**. La observación de fondo del
`v1` sigue en pie y ahora no cuesta nada — **no se escribe en producción sobre contenido programado
para probar algo que el uso normal va a probar solo**.

**Línea base para comparar después de ese evento** [`medido` el 2026-09-13 21:0x UTC, sobre
`intel.brand_publish_slots`]:

| `status` | Franjas | Con `piece_id` |
|---|---|---|
| `free` | **55** | **0** |
| `reserved` | **21** | **21** |
| `published` | 4 | 4 |
| `failed` | 1 | 1 |

**Cero huérfanas por las dos lecturas**, y las dos importan porque son dos defectos distintos:
**ninguna franja `free` arrastra `piece_id`** (sobrante que bloquearía el pozo) y **ninguna `reserved`
está sin pieza** (reserva fantasma). Después de la primera revocación real, **una franja debe pasar de
`reserved` a `free` y soltar su `piece_id`**: `21 → 20` y `55 → 56`, con los dos ceros intactos.

**Se anota como verificación pendiente de un evento, no como tarea.** La diferencia no es semántica:
una tarea sin hacer es deuda y se persigue; **una verificación que espera su evento no se persigue, se
reconoce cuando llega** — y si nadie escribió de antemano qué mirar, no se reconoce.

---

### 📚 CORRECCIÓN 3 — el Professor: dos afirmaciones de acceso que eran falsas

**El proxy `api/professor` SÍ acepta POST**, y **`action=submit-learning` funciona** pasando
`relevance_score` **explícito y dentro del rango `1..5`** del `CHECK` [`reportado` — Claude.ai, con
**12 learnings sembrados por esa vía** el 2026-09-13 entre las **13:47 y las 13:49 UTC**].

**Corroboración de CC** [`medido` el 2026-09-13]: **12 filas** con `session_date = '2026-09-13'` en
`public.professor_learnings`, **las 12 con `relevance_score = 5`**, y el `CHECK` vigente es
`professor_learnings_relevance_score_check` → `CHECK (relevance_score >= 1 AND relevance_score <= 5)`.
**CC midió el resultado, no el camino:** no ejecutó el POST, porque hacerlo habría escrito un learning
de prueba en producción y existe una lectura que responde igual
(`DELIVERY_AND_VERIFICATION_RULE` §4.1).

**Lo que esto corrige, y es más interesante que el dato:** la causa raíz del 2026-09-10 **era
correcta** —la EF calculaba el `relevance_score` fuera del rango del `CHECK`, y el `500` era la base
rechazando la fila, no el proxy negándose—. **La conclusión que se sacó de ella no lo era.** De *«el
`CHECK` rechaza el valor»* se pasó a *«no se puede por el proxy, la vía es el `INSERT` directo»*, que
es **una regla de acceso deducida de un síntoma y nunca medida**. Si el problema es el valor, la vía se
arregla **mandando el valor bueno**.

**Estuvo tres días escrito en `CAPABILITIES.md`** — el archivo cuya **regla de oro** dice, literal, que
*«si Claude cree que no tiene acceso a algo, primero consulta este catálogo: la mayoría de las veces el
acceso existe por una vía que no es obvia»*. **El catálogo se contradijo a sí mismo**, y el `INSERT`
directo funcionaba, así que nada falló de forma visible: simplemente se usó la vía larga.

**Las dos redacciones anteriores se archivan bajo guard `⛔ NO OPERATIVO` con su texto literal**
—ninguna se borra—, y el `INSERT` directo **sigue siendo válido como fallback**: deja de ser **la
única** vía, no deja de ser una. `CAPABILITIES.md` pasa a **1.17**.

---

### ✍️ CORRECCIÓN 4 — el PR del voseo queda desbloqueado, y NO entra en este PR

**El bloqueo se levantó:** A-1 está mergeado y desplegado — `content-watcher` **v57**, `ezbr_sha256`
**`b0c62f50ae75935ed11a8c0c359506e0154614d1ae2f8a0cf84ce21358e77694`** [`medido`].

**CC no lo ejecuta dentro de este PR, y el motivo es de alcance, no de criterio.** Este PR es un
`Actualiza` de context files en `unrlvl-context`; el trabajo del voseo es **código en otro repo**, con
su propia gobernanza. Mezclarlo rompería la regla que el propio ecosistema se dio: **un brief declara
el repo de CADA cambio** (`DELIVERY_AND_VERIFICATION_RULE` §2.3-bis).

**`QA-INFO` bloqueó, y el bloqueo se levantó el mismo día.** Faltaban tres datos que CC no podía
obtener solo; Sam los entregó y **el trabajo salió, en sus propios sitios y sin mezclarse con este
`Actualiza`**:

| Encargo | Dónde | Estado |
|---|---|---|
| El `UPDATE` del guardián | `intel.watcher_rules`, `HR-GEN-05` | **Aplicado** [`medido`]: de **79 a 95 formas**, las 16 medidas sobre el corpus. 16/16 presentes, **cero falsos positivos** en los 13 controles, `brand_id` sigue **nulo** |
| A-5.3 (con A-5.2 dentro) | `unrlvl-iid-functions` **PR #151** | **Abierto.** 11 sitios, y el guardián del repo extendido con 8 formas |
| A-5.2 suelto | `unrlvl-iid-functions` **PR #150** | **Cerrado**, absorbido por el #151 |

**Y dos cosas que la ejecución destapó, porque son la lección y no el trámite:** los prompts del juez
en voseo eran **seis, no dos** —cuatro terminan en `-á/-é/-í` **sin `s`**, y **ni la vía determinista
ni la morfológica ven el imperativo voseante**: las dos que CC declaró suficientes compartían el mismo
punto ciego—; y la siembra del 2026-09-12 **reconstruyó el léxico desde cero** en vez de extenderlo,
**perdiendo seis formas que el barrido del 09-09 ya había añadido** y que estaban documentadas en las
propias `notes` de la regla. **Un léxico se extiende, no se rehace:** rehacerlo borra trabajo de
medición anterior **sin que nada falle**, que es la misma regla suprema de los context files aplicada
a un campo de datos.

**Lo que CC sí midió al ir a buscarlo, y cambia el enunciado del hueco** [`medido` el 2026-09-13 sobre
`intel.watcher_rules`, leyendo el `verify_pattern` de `HR-GEN-05`]:

- **No está `devolvés` NI está `devolvé`. Faltan las dos formas, no una.** El hueco no es que la
  denylist tenga el imperativo y le falte el presente: es que **el verbo entero está ausente**.
- **Y el hueco real es estructural, no de una entrada.** El `verify_pattern` es una **enumeración de
  formas literales** —**79** alternativas separadas por `|`— así que **todo verbo no enumerado escapa**.
  `devolver` es el ejemplo que se nombró, no el caso. Añadir `devolvé|devolvés` cierra **ese** verbo y
  deja la clase abierta.
- **Corrección de una cifra propia, dentro de este mismo PR:** la primera redacción de esta línea dijo
  **«75 alternativas»**. Son **79** [`medido` el 2026-09-13, contando las alternativas del
  `verify_pattern`; coincide con la cifra de Sam]. El 75 fue un conteo a ojo de CC sobre la lectura, no
  una medición — **y así es exactamente como se cuela una afirmación sin etiqueta**: la frase que lo
  rodeaba hablaba de medir.
- **Y la enumeración no es consistente consigo misma** [`medido`]: de las **62** formas de presente
  voseante, **59 no tienen su imperativo en la lista** —están `mirás`/`mirá`, `dejás`/`dejá` y
  `ponés`/`poné`, y ninguna más—, mientras que `tomá` y `andá` están **sin** `tomás` ni `andás`. El
  hueco no es un verbo ausente: es que **la lista se construyó por acumulación, no por paradigma**.
- **Por eso el barrido de este PR se hizo por DOS vías** —la determinista con este mismo
  `verify_pattern`, y una **morfológica por terminación voseante**— y por eso la segunda no es
  decorativa: **es la que cubre lo que la enumeración no enumera**. Ambas: **cero** sobre las líneas
  nuevas.

**La verificación contra la línea base medida** —**7,0 %** de apartadas por la vía LLM, **mediana
`max_sim` 0,72** [`reportado`]— queda anotada como el criterio contra el que se mide ese PR cuando se
haga.

---

## 🗓️ CIERRE 2026-09-13-v1 — El carril deja de estar ciego por el lado del código, y seis afirmaciones del brief que la medición matiza

_(Bloque al tope. **Amplía el `v2026-09-12-v3` inmediatamente debajo; no lo reescribe.**
Todo lo etiquetado `medido` lo consultó **CC** el **2026-09-13 entre las 20:45 y las 20:50 UTC**, con
`Supabase:list_edge_functions`, `Supabase:execute_sql` sobre `amlvyycfepwhiindxgzw` y lectura del
working tree. Lo etiquetado `reportado` lo afirma el **brief de cierre de Claude.ai del 2026-09-13** y
**CC no lo midió**: se escribe con su procedencia, no como hecho propio. **Professor se cerró ANTES de
este Actualiza** —orden `Professor` → `Actualiza` cumplido—. **SMA no se consultó:** Sam no lo pidió.
`ecosystem.json` **no cambió en esta sesión**, así que `ecosystem.md` y `ecosystem_filemap.md` **no se
tocan** — no hay nada que sincronizar.)_

---

### ✅ Lo que entró en producción, con su evidencia

| Qué | Estado | Evidencia |
|---|---|---|
| **`publish-slot-reserver` filtra `discarded_at`** | **v11** desplegada | `ezbr_sha256` **`c12e02c6ff796f7dfa845f15d1cab8e9d15b67f85ad79c463f2b3f1a1a4c606b`** [`medido`]. **N16 queda cerrado por el lado del código** |
| **`blog-promoter` v1.3** | **v6** desplegada | `ezbr_sha256` **`c9d262d80835d8bc0fd5c5b5dc6c28e3983696a4e90a61d2a822839e9230acfc`** [`medido`]. Envía `run_id`, `slot_id`, `piece_id`, y `PUBLISHED` con `platform_post_id` y `published_at` [`reportado`] |
| **`content-watcher`** | **v57** desplegada | `ezbr_sha256` **`b0c62f50ae75935ed11a8c0c359506e0154614d1ae2f8a0cf84ce21358e77694`** [`medido`]. Fail-open cerrado, gate5 lee la tabla, gate1 llama con `p_match_domain=false` [`reportado`] |
| **`content-run-stage`** | **v123** desplegada | `ezbr_sha256` **`8babc5950ed146231a311baad9cfaac66ee14bb3cb49e2e78d537983ac1a9d5a`** [`medido`]. El filtro de dominio sólo aplica en modo `own`, `content-run-stage:3224` [`reportado`] |
| **`CHECK` de `intel.brand_publish_drain_log.outcome`** | de **6 a 13 valores** | [`medido`] `pg_get_constraintdef`: 9 de **eje de desenlace** —`PUBLISHED`, `CHANNEL_INACTIVE`, `PROVIDER_NOT_DRAINABLE`, `PUBLISH_POLICY_MISSING`, `PUBLISH_FAILED`, `PUBLISH_UNVERIFIABLE`, `SLOT_SEALED`, `SLOT_SEAL_FAILED`, `PIECE_NOT_ELIGIBLE`— más **4 alias legacy `BLOG_*`**. El mapa de retiro vive en el `COMMENT` de la columna |
| **`intel.brand_similarity_threshold`** | creada y sembrada | [`medido`] **8 filas**, eje `pair_scope` con valores **`own_brand` / `cross_brand`** — el eje se corrigió dos veces desde `same_domain/cross_domain` [`reportado`] |
| **Guarda de línea base** | dos condiciones, no una | [`medido`] exige `pairs_count >= min_pairs` **y** `own_vectors >= min_own_vectors`; en producción `min_pairs = 200` y `min_own_vectors = 30` en las ocho filas |
| **Cortes vigentes `own_brand`** | dos calibrados, dos sin línea base | [`medido`] **NeuroneSCF `0.93739`** (`pairs_count` 343, `own_vectors` 48) · **LucienSael `0.90551`** (496, 32) · **ForumPHs** `SIN_LINEA_BASE` (83, 27) · **UnrealvilleStudio** `SIN_LINEA_BASE` (30, 12) |
| **RPC `intel.match_content_embeddings`** | **una sola firma** | [`medido`] `p_match_domain boolean DEFAULT true`; `service_role` presente en el ACL — **y `PUBLIC` también, ver la corrección 2** |
| **Bandejas del Orchestrator** | muestran el texto que el juez juzga | [`reportado`] `channelTextOf` como única fuente de cabecera y cuerpo |
| **`protocols/ICR_CONTRACT.md`** | vivo y alcanzable | [`medido`] **16.224 bytes** en el working tree; el proxy `gh` respondió **HTTP 200** el 2026-09-13 20:49:43 UTC contra un control conocido-vivo (`/desktop.ini`, 108 bytes), que es el método de la **regla 3 de MÉTODO DE MEDICIÓN** |

---

### 🔍 Las seis correcciones de CC — lo que la medición dice distinto del brief

**Ninguna invalida el trabajo del día. Las seis cambian lo que se puede afirmar sobre él**, que es
exactamente lo que `DELIVERY_AND_VERIFICATION_RULE` §4 pide separar.

1. **`min_own_vectors = 30` no es una propuesta: está sembrado.** El brief lo marca *«default 30,
   **propuesto, no medido**»*. En producción la columna existe y vale **30 en las ocho filas**
   [`medido`]. Lo propuesto ya es dato, y decirlo importa porque una guarda «propuesta» no bloquea a
   nadie y ésta sí está bloqueando a dos marcas.
2. **El ACL del RPC no está acotado a `service_role`.** El brief dice *«`service_role` en el ACL»*, y es
   cierto **y parcial**: el ACL medido es `{=X/postgres,postgres=X/postgres,service_role=X/postgres}`
   — la primera entrada es **`PUBLIC` con `EXECUTE`**, así que **`anon` y `authenticated` también pueden
   ejecutarlo** [`medido`: `has_function_privilege` devuelve `true` para los dos]. **No es el caso de
   `CC_PROTOCOL` §11**, porque `prosecdef = false`: la función corre con los privilegios de quien la
   invoca y la RLS de las tablas subyacentes sigue mandando. **Lo que sí es** es el patrón que §11
   describe: falta el `REVOKE … FROM PUBLIC` y el `GRANT` explícito a `service_role` **se lee como si el
   acceso estuviera acotado**. Queda anotado como frente, no como incidente.
3. **`cross_brand` no está sin línea base por falta de volumen: su población está vacía por
   construcción.** El motivo lo escribe la propia fila: *«cero pares de marcas distintas dentro del
   mismo dominio en todo el corpus (241 vectores). Los dominios no se solapan entre marcas»*
   [`medido`, en `recalculated_reason`]. La frase del brief —*«su corte se siembra cuando haya corridas
   con `candidates > 0`»*— es cierta y **omite que hoy no puede haberlas** mientras los dominios de dos
   marcas no se crucen. Es una condición de **datos**, no de **tiempo**, y esperar no la cumple.
4. **ForumPHs y UnrealvilleStudio incumplen las dos guardas, no una** [`medido`]: ForumPHs `pairs_count`
   **83 < 200** y `own_vectors` **27 < 30**; UnrealvilleStudio **30 < 200** y **12 < 30**. Leerlo como
   «les falta corpus» esconde que a las dos **también les faltan vectores propios**, que es la guarda
   que el brief presenta como la nueva.
5. **La candidata de §5.b existe, está viva, y revocarla escribe en producción.** Medido: franja
   **`0ed7214c-1d1b-4339-bc0e-48143eb5b29d`** · LucienSael · `blog` · **2026-09-29 14:00 UTC** ·
   `reserved`, reservada para la pieza **`d621e8d5-b31c-4dfd-8c14-940f4eee33df`**, que está en
   **`scheduled`** y **sin descartar** (`discarded_at` NULL). No es una pieza de sobra: es una pieza
   programada. **Probar la liberación de franja sobre ella es una escritura en producción sobre
   contenido vivo** — `DELIVERY_AND_VERIFICATION_RULE` §2.3-ter — y por eso **queda como decisión de
   Sam**, no como paso de verificación.
6. **La cita caducada del §2.2 del brief ya no sigue viva.** El brief pide verificar antes de tocar, y
   la verificación dice que **no hay nada que tocar**: el **PR #95** la sustituyó por el estado real
   —cerrado por P3, `pickJudgedText` en `:4504`, `judged_source` como prueba en el dato— y conservó la
   redacción anterior **bajo guard `⛔ NO OPERATIVO`** en su mismo sitio [`medido`: única aparición
   superviviente en `CAPABILITIES.md`, dentro del bloque archivado]. **CC no la volvió a archivar:**
   archivar dos veces lo ya archivado duplicaría la historia en vez de preservarla.

---

### 🧾 Las seis correcciones por medición que trae el brief

**Se escriben porque son el activo de la sesión**, y con su procedencia: **las afirma el brief de
Claude.ai del 2026-09-13** [`reportado`]. Cuatro caen del lado de Claude.ai y dos del de CC.

1. El RPC filtra por dominio, **pero no era lo que cegaba a gate1** — el filtro que disparaba estaba en
   `content-run-stage:3224`.
2. *«165 de 175 difieren»* **no medía divergencia juez-contra-salida**: comparaba dos etapas del carril.
3. Los cortes sembrados el 12 se midieron sobre una población **que no es la del consumidor**. La
   `recalculated_reason` de las cuatro filas `own_brand` lo deja escrito en el dato [`medido`].
4. *«No puedo leer el repo»* **era `deducido` de una sola vía fallida**; el proxy `gh` lo lee. Es la
   regla de oro de `CAPABILITIES.md`, literal: casi siempre el acceso existe por una vía que no es la
   obvia.
5. CC corrigió su propia causa raíz del blog de UnrealvilleStudio: sale de `brand_topics` vía
   `fanout.ts:673`, no del `platforms_hint` del modelo.
6. CC revirtió una conflación que Claude.ai introdujo en A-4: `degraded` significaba dos cosas a la vez.
   **Lo delató un test existente, no una lectura.**

---

### 🔴 Frentes abiertos, con su estado

1. **El criterio de éxito de gate5 NO está cumplido** — que las dos vías dejen de diferir en un orden de
   magnitud (**95,7 % pgvector contra 7,0 % LLM**) [`reportado`]. **No es medible hasta que corra
   tráfico nuevo**, y eso hay que decirlo antes de que alguien lo lea como cerrado.
2. **gate1 arranca sin corte sembrado.** `cross_brand` en `SIN_LINEA_BASE` con su motivo en el dato
   [`medido`]. Su corte **no se siembra por esperar**: hace falta que dos marcas compartan dominio
   (corrección 3).
3. **gate8 sigue ciego.** Misma causa que gate1; B-2 le abrió la puerta, **entrar es decisión de Sam**
   [`reportado`].
4. **V-09** — `icr_passed` **y** `aife_passed` son constantes literales en la misma línea [`reportado`].
5. **V-11** — no existe comprobación que enfrente `ecosystem.json` con los documentos que lo citan
   [`reportado`]. Es el verificador que el PR #95 nombró como pendiente al cerrar su propia divergencia.
6. **El verificador que no existe en ninguna forma:** avisar cuando un gate lleve N corridas sin comparar
   nada. **gate1 estuvo ciego 858 corridas y nadie se enteró** [`reportado`].
7. **La adaptación no adapta título ni imagen** — `social.adapted[]` sólo trae `platform` y `copy`
   [`reportado`]; **`social.language` poblado en 1 de 175** [`medido`: 175 piezas con `social`, las 175
   con `adapted` no vacío, **1** con `language`].
8. **Los vectores anteriores a P3 describen el texto viejo** [`reportado`].
9. **`iid-approval-digest` desplegada y ausente del repo** — **segundo caso del patrón**. Desplegada sí
   [`medido`: `version 21`, `ACTIVE`]; su ausencia del repo, [`reportado`].
10. **Divergencia agente↔cron** y **la alarma del regulador, que se comprueba, no se recuerda**
    [`reportado`].
11. **`PUBLIC` conserva `EXECUTE` sobre `intel.match_content_embeddings`** [`medido`] — frente nuevo,
    abierto por la corrección 2. Cierre correcto: `REVOKE EXECUTE … FROM PUBLIC` por firma completa, en
    su propia migración, con la lectura de `proacl` **después** de aplicar (`CC_PROTOCOL` §12).
12. **Decisiones de criterio pendientes de Sam:** blog de UnrealvilleStudio · las 11 fixables ·
    territorios de dominios nuevos · ambigüedad de disparo en `skills/INDEX.md` [`reportado`].
13. **Sesión paralela del Orchestrator:** U-3 y U-4 mergeados; **§5.b de U-3 sin ejecutar** [`reportado`]
    — falta revocar una pieza real para probar la liberación de franja. **La candidata propuesta está
    viva y programada: revocarla es escritura en producción y decisión de Sam** (corrección 5).

---

### 📌 Regla nueva del día — vive en `CAPABILITIES.md`, no acá

**«Mergear no despliega, y desplegar tampoco despliega necesariamente lo mergeado.»** Cinco de ocho
despliegues del 2026-09-13 subieron **el bundle anterior**, por correr desde un clon sin `git pull`
[`reportado`]. El contador de versión y `updated_at` **suben igual**, porque suben con el intento y no
con el contenido; **la única señal que no miente es el `ezbr_sha256`**, y la comprobación que cierra el
caso es **leer un marcador dentro del bundle**. Texto completo y secuencia: `CAPABILITIES.md` →
**DESPLIEGUE**. Fuente de la regla de medición que extiende: `protocols/MEASUREMENT_METHOD_RULE.md` §4.

---

### 🎓 Trazabilidad del Professor

**12 learnings registrados el 2026-09-13, los doce con `relevance_score = 5`** [`reportado` — brief de
Claude.ai, que declara haberlos verificado en `professor_learnings` entre las 13:47 y las 13:49 UTC;
**CC no consultó la tabla**]:

`11e279af` despliegue · `856c74d8` medir la capa equivocada · `5ba49ebd` gates que nunca comparan ·
`1d8f1bc6` escalas distintas bajo un mismo umbral · `43e766c6` citas caducadas · `a01632e7` privilegios
y `relacl` nulo · `2c0544b4` fail-open · `b3855ae4` acciones atadas a la pantalla · `c5ffebd0` endpoints
sin autenticación · `d5d57348` chips y cuerpo divergentes · `21abab89` la adaptación no adapta título ni
imagen · `7e025b52` contrato ICR.

**El `Actualiza` no los copia enteros a propósito:** acá va el hecho con su evidencia, y el texto
completo se queda en Professor. Duplicarlos crearía **dos fuentes para el mismo hecho**, que es
literalmente uno de los learnings del día.

---

## 🗓️ CIERRE 2026-09-12-v3 — Sam decide, y la fuga de N10 queda cerrada por el lado del blog

_(Bloque al tope. **Amplía el `v2026-09-12-v2` inmediatamente debajo; no lo reescribe.**
Sam tomó cinco decisiones sobre lo que el `v2` dejaba abierto, **y quedan escritas con su motivo**,
que es la parte que no se puede reconstruir después. CC ejecutó las dos primeras con el método que
Sam fijó —**en seco, lectura, y después aplicación**— y **verificó por efecto**, no por lo que la
función dice de sí misma. Todo lo etiquetado `medido` se consultó el **2026-09-12 entre las 19:30 y
las 19:55 UTC**. `now()` de cierre: **2026-09-12 19:53:25 UTC**.)_

---

### 📋 Las cinco decisiones de Sam, con su motivo

| # | Decisión | El motivo, en sus términos |
|---|---|---|
| **1** | **El parche del promotor: SÍ, aplicarlo** — y de paso rellenar `post_url` de las dos piezas | *«El atajo que evita republicar es el que impide reparar.»* Que toque un publicador con horas en producción **es exactamente el motivo de que exista el `dry_run`**: primero en seco, se lee el resultado, y después se aplica |
| **2** | **Manda `discarded_at`**, sobre `status` | *«El descarte es un veredicto humano; `scheduled` es una posición en la cola. Un veredicto pesa más que una posición.»* Y el estado incoherente se cierra **por el lado del planificador**, no relajando el bloqueo del publicador |
| **3** | **La pieza es el texto adaptado** — `social.adapted[n].copy`, uno por canal | Cambia el **proceso**, no sólo el dato: la bandeja tiene que mostrar ése. Las 22 notas **no se pierden: se reevalúan** contra el texto real. **Encargo propio y con prioridad**, porque todo lo que se calibre hasta que se arregle **se calibra sobre el texto equivocado** |
| **4** | **200 pares de mínimo**, con la contrapartida dicha en voz alta | Con ese mínimo **una marca nueva arranca sin gate de duplicación, y eso hay que decirlo, no dejarlo implícito**. La regla: sin corpus suficiente el gate declara **`SIN_LINEA_BASE`** y **no compara**. Nunca aprueba en silencio por tabla vacía. **Y una marca sin gate publica igual, porque nada sale sin la aprobación de Sam** |
| **5** | **Frente 4 reordenado: primero el agente, después el dominio** | *«El cuello no son los dominios: son los agentes que los trabajan.»* El frente pasa a ser **«un agente y su cron por dominio declarado»**, y la siembra de dominios nuevos baja a segundo lugar |

---

### ✅ DECISIÓN 1, APLICADA Y VERIFICADA — `blog-promoter` v1.2

**Desplegada** [medido]: `version 3`, `ezbr_sha256`
**`9529a937d230a08446bf577d2bf9bccd766f3cf6b68a4e033e8ef04af8418f97`**, `verify_jwt` **`false`**
(preservado — `CC_PROTOCOL.md` §10). Código en `unrlvl-iid-functions` **PR #145**, rama
`fix/blog-promoter-sella-en-ya-publicada`.

**El método de Sam, paso a paso y con su resultado:**

1. **Cron 99 apagado** con `cron.alter_job(99, active := false)` —la vía que funciona, `UPDATE cron.job`
   está prohibido en este proyecto—, para que ninguna corrida real ocurriera durante la prueba.
2. **Estado previo capturado** para poder revertir: las dos franjas `reserved` con `published_at` NULL,
   las dos piezas `published` con **`slug` Y `post_url` en NULL**.
3. **`dry_run` corrido y leído** [medido]: 3 canales, 6 franjas vencidas, **2 `SELLARIA_YA_PUBLICADA`**,
   **cero publicaciones nuevas**. Declaró de antemano que sellaría con el `published_at` **de la pieza**
   y qué URL rellenaría.
4. **Aplicación real**: las dos `YA_PUBLICADA_SELLADA`.
5. **Cron 99 encendido de nuevo.**

**La verificación por efecto, que es la que vale** [medido]:

| Comprobación | Antes | Después |
|---|---|---|
| Franja `66227c12…` · LucienSael · `blog` | `reserved`, `published_at` NULL | **`published`**, `2026-09-09 21:52:27` |
| Franja `c09c824a…` · ForumPHs · `blog_forumphs` | `reserved`, `published_at` NULL | **`published`**, `2026-09-09 21:52:24` |
| `published_at` de franja y pieza | discrepaban | **coinciden exactamente** |
| `post_url` de las dos piezas | **NULL** | `https://luciensael.com/blog/behavioral-science-e4aba666` · `https://forumphs.com/blog/la-asamblea-que-no-entiendo-c4b3e01f` |
| `slug` de las dos piezas | **NULL** | `behavioral-science-e4aba666` · `la-asamblea-que-no-entiendo-c4b3e01f` |
| **`intel.drain_due_slots(200)` las devuelve** | **sí, cada 15 minutos** | **0** |
| Franjas vencidas y reservadas | **6** | **4** |

**Las 4 que quedan son de `x_api` y `tiktok_business`**: no son de este publicador y **siguen
esperando el suyo**. La fuga de N10 queda cerrada **por el lado del blog**, no entera.

> **Una salvedad reportada, no medida por CC:** el `config` de LucienSael advierte que el sitio
> *«hoy sirve HTML estático con extensión `.html`»*, así que la URL sellada **puede no resolver
> todavía**. `post_url` guarda **la ubicación canónica que declara el canal**, que es el valor
> correcto; la colisión del sitio es un frente aparte, ya anotado en ese mismo `config`.

#### 🔴 Y lo que apareció al verificar: la bitácora del promotor NUNCA pudo escribir

`intel.brand_publish_drain_log` **no tiene ni una fila** de `BLOG_SLOT_SEALED` después de dos sellos
correctos [medido]. `logDrain()` tiene un `catch (_) {}` deliberado —*«la bitácora no puede tumbar la
publicación»*, que es razonable— y **ocultó tres rechazos apilados**. Probado el 2026-09-12 con
inserciones que **nunca se confirman** (bloque `DO` que aborta siempre, cero escrituras):

| # | Rechazo | Código |
|---|---|---|
| 1 | `run_id` es `NOT NULL` sin default y `logDrain` no lo envía | **23502** |
| 2 | `slot_id`, igual | 23502 |
| 3 | El `CHECK` de `outcome` sólo admite `PUBLISHED`, `CHANNEL_INACTIVE`, `PROVIDER_NOT_DRAINABLE`, `PUBLISH_POLICY_MISSING`, `PUBLISH_FAILED`, `PUBLISH_UNVERIFIABLE`. **Ninguno de los cuatro `BLOG_*` está** | **23514** |

**Lo que significa, y es lo que hay que decidir:** si el lunes el promotor publica de verdad,
**publica sin dejar rastro**. Es la misma familia del defecto que ya costó una sesión el 2026-09-08
—el `open_count` clavado en 0 por un `catch` a propósito— y es exactamente lo que
`DELIVERY_AND_VERIFICATION_RULE` v1.4 nombra: **un error atrapado a propósito necesita su propia vía
de verificación**.

**🟧 PENDIENTE — DECISIÓN DE SAM. Es DDL sobre tabla compartida y CC no lo aplica solo.** Lo que hace
falta: que `run_id` y `slot_id` tengan default o los envíe el publicador, y que el `CHECK` de
`outcome` admita los estados de este modelo de publicación. **Test de la marca N+1 sobre ese `CHECK`:
sus seis valores actuales describen el modelo de EMPUJE y sólo ése.** Al añadir los del MARCADO, el
nombre correcto no es «los de blog» sino **el estado funcional** que registran. Y el orden de
`MULTIBRAND_RULE` §7.2 va **al revés que de costumbre**: acá **el código ya emite** valores que el
`CHECK` rechaza, así que **la DDL va primero** y el código ya está listo.

---

### ✅ DECISIÓN 2, APLICADA — manda `discarded_at`

**Lo aplicado** [medido antes y después]:

- **Las tres piezas de NeuroneSCF pasan a `rejected`**, que es la convención que ya seguían **las
  otras 14** fixables descartadas. `discarded_at` y `discarded_reason` **no se tocan**: el veredicto
  es de Sam y no se reescribe.
- **Una franja se libera.** `0f82718d-e14c-41a5-9fd3-bcf1f906854b` · NeuroneSCF · `meta_ig` ·
  **`slot_at` 2026-09-16 23:00 UTC** estaba `reserved` **para una pieza descartada el 9 de
  septiembre**. Vuelve al pozo (`free`, `piece_id` NULL).

**Y el hueco de fondo que eso destapa, medido:**

| Componente | ¿Filtra `discarded_at`? |
|---|---|
| `content-scheduler` | **Sí** — `.is("discarded_at", null)` en las líneas **2422** y **2485** |
| `blog-promoter` | **Sí** — FAIL-LOUD 2 |
| **`publish-slot-reserver`** | **NO. Cero apariciones de `discarded_at` en todo el archivo** |

**Por eso una pieza descartada tenía reservada una franja futura.** El planificador ya hacía lo
correcto; **el reservador no**. Queda como encargo y **se junta con N16**, que vive en el mismo
archivo.

**Efecto medido:** **0** piezas a la vez `scheduled` y descartadas · **0** franjas `reserved` con
pieza descartada · y las franjas libres futuras suben de **43 a 44**.

---

### 📌 DECISIÓN 4 — la regla del umbral queda escrita entera, con su contrapartida

**Sustituye a la propuesta del Frente 1 del bloque `v2`, y la completa.** El corte es el **percentil
99** de la propia distribución de la marca, calculado por separado para **mismo dominio** y para
**dominios distintos**, con un **mínimo de 200 pares** por distribución.

**Y la contrapartida se dice en voz alta, porque implícita engaña:**

> **Con ese mínimo, una marca nueva arranca SIN gate de duplicación.** El gate declara
> **`SIN_LINEA_BASE`** y **no compara**. **Nunca aprueba en silencio por tabla vacía**, que es el
> defecto que su propio código ya advierte. **Y una marca sin gate publica igual, porque nada sale
> sin la aprobación de Sam** — la bandeja absorbe el riesgo mientras el corpus crece.

**A quién le aplica hoy** [medido sobre los 241 vectores]: las tres marcas con las dos
distribuciones pasan el mínimo; **LucienSael no tiene ni un par de dominios distintos** —sus 52
vectores son todos de `behavioral-science`—, así que **para esa marca el corte de dominios distintos
nace en `SIN_LINEA_BASE`**, y es el caso exacto que la regla existe para declarar.

---

### 📌 DECISIÓN 5 — el Frente 4 se reordena: primero el agente, después el dominio

**El Frente 4 del bloque `v2` queda reformulado así, y su encargo cambia de nombre:** de «sembrar
dominios» pasa a **«un agente y su cron por dominio declarado»**.

**El motivo, medido:** los dominios declarados no producen.

| Marca | Dominios activos | **Con piezas en el corpus** | Sin producir |
|---|---|---|---|
| ForumPHs | 32 | **5** | **27** |
| NeuroneSCF | 9 | **6** | 3 |
| UnrealvilleStudio | 6 | **4** | 2 |
| LucienSael | 4 | **1** | **3** |

**La siembra de dominios nuevos baja a segundo lugar.** Sembrarle cuatro a LucienSael le daría
**ocho declarados y uno produciendo**.

---

### 📌 DECISIÓN 3 — el texto adaptado es la pieza. Encargo propio y con prioridad

**No se ejecuta en esta sesión por decisión de Sam: va en la suya.** Queda escrito lo que la hace
urgente, que es la parte que caduca:

- **Lo que llega a la plataforma es `social.adapted[n].copy`, uno por canal.** La bandeja tiene que
  mostrar ése.
- **Las 22 notas de Sam —y las de CC— están escritas sobre un borrador previo.** No se pierden:
  **se reevalúan contra el texto real**.
- **Y por eso tiene prioridad:** todo lo que se calibre hasta que se arregle **se calibra sobre el
  texto equivocado**.

**Las 11 fixables de criterio quedan en espera de esto**: sus reglas por grupo **no se deciden antes
de releerlas sobre el texto adaptado**. Lo mismo para los territorios de los dominios nuevos, que
siguen esperando a Sam sin que nadie los invente.

---

### 🔷 SERIE N — lo que estas decisiones mueven

| ID | Estado | Qué cambió hoy |
|---|---|---|
| **N10** | 🟡 **abierto, y baja de 6 a 4** | Las dos franjas de blog quedan selladas. **Las 4 restantes son `x_api` y `tiktok_business`**: esperan su publicador |
| **N13** | 🟢 **CERRADO, y su defecto también** | v1.2 sella y rellena. **Queda una deuda propia: su bitácora no puede escribir** hasta que se decida la DDL |
| **N16** | 🔴 **abierto, y gana un hallazgo** | **24 piezas sin franja contra 44 franjas libres futuras** (una más, la liberada hoy). **Y ya hay una causa medida que investigar primero: `publish-slot-reserver` no filtra `discarded_at`** |
| **N08** | 🟡 **abierto y EN ESPERA de la decisión 3** | Sus 22 notas **se releen sobre el texto adaptado** antes de decidir regla alguna |

---

## 🗓️ CIERRE 2026-09-12-v2 — El promotor de blogs está vivo en producción, y reconocer lo ya hecho le cuesta el sello

_(Bloque al tope. **Amplía el `v2026-09-12-v1` inmediatamente debajo; no lo reescribe.** Lo de la §A
lo aplicó Claude.ai y **CC lo documenta, no lo re-aplica**. Todo lo etiquetado `medido` acá lo
consultó CC el **2026-09-12 entre las 18:50 y las 19:25 UTC** con `execute_sql`,
`get_edge_function`, `list_edge_functions` y lectura directa del working tree de
`unrealvillestudio-hub/unrlvl-iid-functions` en `034d940`. **`now()` de referencia:
`2026-09-12 19:21:57 UTC`.**)_

> **Cinco afirmaciones del brief que la medición corrige, y dos de ellas cambian el encargo.**
> Van marcadas ⚠️ en su sección. Resumen: el promotor **ya corre en producción**, no sólo en seco ·
> **no sella la franja** cuando reconoce una pieza ya publicada, y eso **reabre la fuga de N10** para
> dos franjas · la causa raíz del blog de UnrealvilleStudio **no es código por marca** · el contador
> de hashtags **no miente** · y el corte por percentil 99 **no da las cifras que el brief proyecta**.

---

### A · N13 — el promotor de blogs, CREADO Y VIVO

**Lo desplegado** [medido con `get_edge_function`]:

| Campo | Valor |
|---|---|
| Slug | `blog-promoter` — cabecera del código: `blog-promoter v1.1 — N13` |
| `version` (contador de despliegue) | **2** |
| `ezbr_sha256` | `db02acb31d4873c78f5fd50904636b884275a88e916eface1a67642c53fca169` |
| Alta / última actualización | **2026-09-12 17:53:11 UTC** / **17:53:55 UTC** |
| `verify_jwt` | `false` |
| Cron | **`blog-promoter-15min`**, `jobid 99`, `*/15 * * * *`, **`active = true`** |

**Lo que el código hace, leído y no deducido** [medido sobre el bundle desplegado]:

- **La capacidad vive en una constante, en un solo lugar:** `MARK_PUBLISHED_PROVIDERS = ['vercel_html']`,
  declarada simétrica a `DRAINABLE_PROVIDER` del drenaje. **Cero marcas, cero `brand_id`, cero
  dominios.** Es una enumeración de **lo que este publicador sabe hacer**, que es eje — no de quién lo
  usa, que sería instancia. **Pasa el test de la marca N+1 tal como está.**
- **El sellado de la pieza es un solo `PATCH`** con `status`, `published_at`, `slug`, `post_url` y
  `updated_at`. Sobre la pieza, «los cuatro o ninguno» **se cumple**.
- **`pieceSlug()` replica el del renderizador**: slug guardado si lo hay; si no,
  `slugify(domain) + '-' + id[0..8]`.
- **Los dos frenos fail-loud existen y están en el camino**: canal sin `base_url` o sin `blog_path` →
  `BLOG_PROMOTE_BLOCKED`, no publica · pieza inexistente o con `discarded_at` → `BLOG_PROMOTE_BLOCKED`,
  no publica.

#### ⚠️ Corrección 1 — no es un `dry_run`: corre en producción desde las 17:53 UTC

El brief lo cuenta como una corrida en seco. **Medido en `net._http_response` vía
`intel.iid_cron_runs`:** el cron 99 lleva **nueve invocaciones reales**, todas **HTTP 200**, y todas
devuelven el mismo cuerpo:

```
{"ok":true,"dry_run":false,"canales":3,"franjas_vencidas":6,"resultados":[ … todos "YA_PUBLICADA" … ]}
```

**`dry_run: false`.** Los **3 canales** son los tres `vercel_html` activos —ForumPHs/`blog_forumphs`,
LucienSael/`blog`, UnrealvilleStudio/`blog`—, medidos contra `intel.brand_publish_channels`. Así que
la afirmación que importa es **más fuerte** que la del brief: el promotor **no rompió nada en
producción durante hora y media**, que es mejor evidencia que un seco.

#### 🔴 Corrección 2 — LO URGENTE: reconocer lo ya hecho le cuesta el sello, y eso reabre N10

**La rama `YA_PUBLICADA` hace `continue` sin tocar `intel.brand_publish_slots`** [medido, código del
bundle desplegado]. La franja queda **`reserved` para siempre**.

**El efecto, medido sobre las 6 franjas vencidas y reservadas:**

| Franja | Marca · canal | Proveedor | Vencida desde | Pieza | `post_url` |
|---|---|---|---|---|---|
| `66227c12-a169-419d-a246-a79878a2149c` | LucienSael · `blog` | `vercel_html` | **2026-09-08 14:00 UTC** | **`published`** 2026-09-09 21:52:27 | **NULL** |
| `c09c824a-4770-4b9c-aa4c-7e35a075cbd3` | ForumPHs · `blog_forumphs` | `vercel_html` | **2026-09-10 15:00 UTC** | **`published`** 2026-09-09 21:52:24 | **NULL** |

Las otras cuatro son de `x_api` y `tiktok_business`: no son de este publicador y siguen esperando el
suyo.

**Por qué esto es lo urgente, y son dos daños distintos:**

1. **La fuga de N10 sigue abierta para esas dos franjas, y ahora con un responsable que podría
   cerrarlas y no lo hace.** Están `reserved`, vencidas y con `piece_id`: `intel.drain_due_slots` las
   sigue devolviendo, y como el orden es `slot_at ASC` y son **las más viejas**, ocupan la **cabeza de
   la cola** en cada pasada, contra el `DRAIN_SAFETY_CEILING` de **50**. Es exactamente el fallo que
   este archivo ya describió: *«el sistema informa que trabajó»* — y ahora lo informa dos veces, el
   cron con `succeeded` y la EF con `200`.
2. **`post_url` sigue en NULL en las dos piezas, que son justo las que el promotor vino a reparar.**
   La §1.1 del brief dice que `post_url` cierra *«el defecto que ya arrastraba la pieza del 09-09»*.
   **Esas son las piezas del 09-09.** El atajo `YA_PUBLICADA` las salta **antes** de calcular el slug
   y la URL, así que el promotor **nunca rellena hacia atrás** lo que sólo él sabe calcular.

**El parche, y es pequeño** — en la rama `p.status === 'published'`, antes del `continue`: sellar la
franja (`status`, `published_at`, `updated_at`) y, **si y sólo si** la pieza tiene `post_url` o `slug`
en NULL, rellenarlos con `pieceSlug(p)` y la URL construida. **Decisión de Sam**, porque toca un
publicador que lleva noventa minutos en producción y porque el relleno hacia atrás es una escritura
sobre piezas ya publicadas — `DELIVERY_AND_VERIFICATION_RULE` §2.3-ter.

**Efecto observable que lo probaría, nombrado por adelantado:** las dos franjas pasan a `published` y
**dejan de aparecer** en `intel.drain_due_slots(200)`; las dos piezas dejan de tener `post_url` en NULL.

#### 🔶 Corrección 3 — «los cuatro o ninguno» vale para la pieza, no para el par pieza-franja

El sellado de la **pieza** y el de la **franja** son **dos `PATCH` distintos y consecutivos**
[medido]. Si el segundo falla, la EF cae al `catch`, devuelve 500, y queda **la pieza publicada con su
`post_url` y la franja en `reserved`** — otra vez los dos libros mayores discrepando, que es el frente
que este archivo ya abrió el 2026-09-09. **No se reproduce hoy** (ninguna de las 9 corridas llegó a
publicar), pero está en el camino en cuanto publique la primera. Anotado, no arreglado.

**Primera prueba real, sin cambios:** lunes **15 de septiembre, 09:00 Panamá**, LucienSael.

---

### B · Shopify de NeuroneSCF — el handle quedó corregido

**Medido en `intel.brand_publish_channels`**, canal `NeuroneSCF` / `blog`, proveedor `shopify_blog`:

- `blog_path` = **`/blogs/hair-intelligence`**
- `shopify_blog_handle` = **`hair-intelligence`**
- **`nota_handle` ya no está** en el `config` — se retiró, como el brief declara.

Tienda b2c medida con el MCP de Shopify: **`egdk1n-gt.myshopify.com`** — *Neurone South & Central
Florida*. (La b2b, `nj5ybc-n1.myshopify.com`, no interviene acá.)

**El motivo del momento, y queda escrito porque es la parte que no se puede reconstruir después:**
todavía no se dirige tráfico a ese blog, así que el coste de SEO del renombrado era **mínimo hoy y
creciente cada semana**. Los dos blogs borrados estaban **vacíos**; `hair-intelligence-1` conservó sus
4 artículos al renombrarse.

---

### C · Las piezas con veredicto de Sam — la cifra del brief no reconcilia con la tabla

**Medido en `intel.approval_calibration`** (y en su `_archive`):

| Veredicto | Filas vivas | Con `fix_proposal` | En archivo |
|---|---|---|---|
| `approved` | 30 | 0 | 30 |
| **`fixable`** | **22** | **22** | **0** |
| `rejected` | 1 | 0 | 18 |

#### ⚠️ Corrección 4 — «27 identificadas, 11 cerradas, 16 abiertas» no se reproduce

La tabla tiene **22 filas `fixable`, todas con la nota de Sam en `fix_proposal`**, y el archivo **no
tiene ninguna**. No hay en la base un conjunto de 27 ni un subconjunto de 11 cerradas: las filas de
calibración **no se retiran al reparar la pieza** —`approval_calibration_piece_id_key` lo impide, ver
`N05A`—, así que «cerrada» no tiene hoy representación en el dato. **Lo que sí se puede medir es el
estado de la pieza de cada fila**, y es esto:

| Estado de la pieza | Filas | Nota |
|---|---|---|
| `rejected` **y** `discarded_at` sellado | **14** | descartadas |
| `scheduled` **sin** `discarded_at` | **5** | vivas y reparables |
| `scheduled` **CON** `discarded_at` sellado | **3** | 🔴 **contradicción, ver abajo** |

**🔴 Tres piezas están a la vez `scheduled` y descartadas** [medido]: las tres de NeuroneSCF con nota
`Voceo.`, `Voceo y firma repetida.` y `Voceo y firma repetida e incorrecta.`, del 2026-09-09. Eso
**contradice la §1.3 del brief** («todas en `scheduled`, sin sello de descarte») y no es cosmético:
el **FAIL-LOUD 2** del promotor y cualquier publicador que lea `discarded_at` las bloquean, mientras
el planificador las sigue viendo como programadas. **Encargo: decidir cuál de los dos sellos manda y
dejar el otro.**

**Reagrupación medida de las 22 notas** (una nota puede tocar dos grupos; se cuenta por el motivo
dominante):

| Grupo | Filas | Naturaleza |
|---|---|---|
| Producto Neurone ausente o sin fuerza en voz de conversión | **8** | criterio de Sam |
| Firma incorrecta o repetida | **7** | regla del sistema |
| Referentes repetidos · competidor nombrado (Redken ×2) | **3** | criterio de Sam |
| Imagen — la misma mujer dos veces · la franja ausente | **2** | regenerar |
| Hashtags | **1** | ⚠️ ver §G |
| Voseo (siempre acompañando a otro motivo) | 5 de las anteriores | ya con regla `HR-GEN-05` |

**El método que pidió Sam se mantiene:** una regla por grupo, definida una vez, aplicada a todas las
de ese grupo. **El primero es el que más rinde: qué significa exactamente «con fuerza» cuando la voz
es de conversión.** Son 8 de 22.

---

### D · El gate de duplicación devolvió 56 piezas a la bandeja — confirmado exacto

**Medido**: piezas en `awaiting_approval`, sin `discarded_at`, con `deferred_reason` no nulo:

| Marca | Piezas |
|---|---|
| NeuroneSCF | **32** |
| ForumPHs | **12** |
| LucienSael | **8** |
| UnrealvilleStudio | **4** |
| **Total** | **56** |

**El reparto del brief coincide pieza por pieza.** Cada fila lleva su motivo.

---
---

## 🔴 FRENTE 1 — EL UMBRAL DE DUPLICACIÓN. Es el más urgente de los seis

### La causa raíz, con archivo y línea

**El umbral es la constante literal `0.80`**, cableada en
`unrlvl-iid-functions/supabase/functions/content-watcher/index.ts`, **en nueve sitios y tres gates**
[medido sobre el working tree en `034d940`]:

| Gate | Líneas |
|---|---|
| `gate1Similarity` | **449, 450, 456, 458** |
| `gate5` (duplicación) | **1059, 1073, 1101** |
| `gate8` (`visual_sibling`) | **1454, 1456** |

La cabecera del propio archivo lo declara en la línea **34**: *«Los UMBRALES NO CAMBIAN (0.80 en
ambos): cambia el mecanismo, no el umbral»*. Y la línea **964** ya lo confesaba: *«M1 midió que hoy NO
divergen por sí solas: UNRLVL 12/12 REJECT, sim mínima 0.82 > umbral 0.80»*. **Se midió y se dejó.**

**La capacidad de comparar ya existe y no necesita el modelo:** distancia coseno sobre
`intel.content_embeddings` —pgvector, HNSW `vector_cosine_ops`, 768 dims, `gemini-embedding-001`—.
**El corpus, medido: 241 vectores sobre 241 piezas, del 2026-08-18 al 2026-09-12.**

### La línea base, medida sobre los 241 vectores

Cruzando cada marca consigo misma, `1 - (a <=> b)`:

| Marca | Dominio | Pares | Media | Mín | Máx | **> 0,80** | p95 | **p99** |
|---|---|---|---|---|---|---|---|---|
| ForumPHs | mismo | 457 | **0,8861** | 0,8074 | 0,9717 | **457 de 457** | 0,9490 | **0,9603** |
| ForumPHs | distintos | 1.139 | **0,8458** | 0,7839 | 0,9268 | **1.119 de 1.139** | 0,8904 | **0,9039** |
| NeuroneSCF | mismo | 493 | **0,8806** | 0,7881 | 0,9646 | **490 de 493** | 0,9283 | **0,9540** |
| NeuroneSCF | distintos | 1.277 | **0,8614** | 0,7623 | 0,9387 | **1.258 de 1.277** | 0,9071 | **0,9241** |
| UnrealvilleStudio | mismo | 1.289 | **0,8394** | 0,7491 | 0,9628 | 1.152 de 1.289 | 0,9084 | **0,9351** |
| UnrealvilleStudio | distintos | 1.267 | **0,8059** | 0,7055 | 0,9059 | 773 de 1.267 | 0,8456 | **0,8631** |
| LucienSael | mismo | 1.326 | **0,8020** | 0,6924 | 0,9401 | 662 de 1.326 | 0,8729 | **0,9046** |
| LucienSael | distintos | **—** | — | — | — | — | — | — |

**Las cuatro medias del brief se confirman al tercer decimal**, y también los dos conteos que cita
(1.119 de 1.139 y 1.258 de 1.277). **El umbral está por debajo del ruido de fondo de tres marcas:**
en ForumPHs, **piezas de dominios distintos superan 0,80 el 98,2 % de las veces**.

**Y la línea base va de 0,802 a 0,886 según la marca: ninguna cifra única puede servir a cuatro
voces.**

#### ⚠️ Corrección 5 — el percentil 99 no dispara donde el brief lo proyecta

El brief dice: *«con eso ForumPHs dispara cerca de 0,97 y LucienSael cerca de 0,94»*. **Medido, ésos
son los MÁXIMOS (0,9717 y 0,9401), no los p99.** Los p99 reales son **0,9603** y **0,9046**. La
diferencia no es de forma:

- **Un corte en p99 deja pasar, por construcción, el 1 % de los pares.** Con ~1.300 pares por marca
  eso son **unos 13 disparos por marca que no son duplicados**. No es cero, y conviene que esté
  escrito antes y no después.
- **LucienSael no tiene línea base de dominios distintos**, porque **sus 52 vectores son todos de un
  solo dominio, `behavioral-science`** [medido]. Para esa marca el corte por dominio distinto **no se
  puede calcular hoy**: es exactamente el caso que el fail-loud tiene que declarar.

**Propuesta de CC, que mejora la del brief en dos puntos:** tomar **p99 del mismo dominio** como
corte del mismo dominio y **p99 de dominios distintos** como corte de dominios distintos, **con un
mínimo de pares por debajo del cual no se calcula** (propuesta: **200 pares**, que hoy cubre a las
tres marcas con las dos distribuciones y deja fuera exactamente el hueco de LucienSael). **La cifra
del mínimo la decide Sam**, porque fija cuántas marcas nuevas arrancan sin gate.

### Qué hacer, y en qué orden

1. **El umbral deja de ser constante de código y pasa a DATO por marca.** Es un criterio de negocio:
   vivir en el código viola la regla multimarca.
2. **Se calcula del propio corpus**, por marca y por par mismo-dominio / dominios-distintos.
3. **Se recalcula solo** conforme el corpus crece. Sin bandera que alguien olvide encender.
4. **Todo es SQL sobre `content_embeddings`: cero llamadas al modelo, cero coste por pieza.**
5. **Fail-loud obligatorio:** marca sin pares suficientes → **el gate lo declara y NO compara**.
   Nunca aprueba en silencio por tabla vacía.

**Orden de entrega, por `MULTIBRAND_RULE` §7.2 — PR DE CÓDIGO PRIMERO, DDL DESPUÉS:** el `content-watcher`
tiene que saber leer el umbral del dato **antes** de que exista el dato, cayendo al `0.80` actual
mientras no lo haya. Al revés, sembrar la tabla con un lector que no la conoce no cambia nada y
sembrarla con un `CHECK` nuevo rompe producción.

**Test de la marca N+1, respondido:**

1. **¿Sobrevive a otra marca de otro rubro y otro país?** Sí: el umbral sale de **su** corpus, no de
   una tabla de referencia ajena.
2. **¿El nombre describe la FUNCIÓN o el CASO?** Función: *umbral de similitud por marca y por
   relación de dominio*. No nombra a ninguna marca ni a ningún dominio.
3. **¿Esto es eje o es instancia?** El **mecanismo de cálculo** y el **fail-loud** son eje y van en el
   código; **el umbral de cada marca** es instancia y va en tabla, resuelto por `brand_id` en runtime.
4. **¿Cuántas marcas hay hoy en la enumeración?** **Ninguna**: no hay enumeración. La tabla se llena
   por corpus, no por alta manual de marcas.

**Reversión:** el umbral vuelve a su valor anterior con un `UPDATE`, sin desplegar.
**Efecto observable:** piezas nuevas que **no** caen en `deferred` por duplicación salvo cuando de
verdad se parecen; y el corte aplicado hacia atrás al corpus actual **dice por adelantado cuántas
habría apartado**, que es la lectura que confirma el `deducido` del percentil.

---

## 🔴 FRENTE 2 — `shopify-blog-publisher`: el tercer modelo de publicación, sin nadie que lo atienda

**Confirmado por medición, y por partida doble:**

- `blog-promoter` sólo atiende `MARK_PUBLISHED_PROVIDERS = ['vercel_html']` [medido en el bundle].
  **`shopify_blog` no está.**
- El drenaje de `content-scheduler` sólo atiende `meta_graph`, y devuelve `PROVIDER_NOT_DRAINABLE`
  para todo lo demás — **191 filas en las últimas 12 horas** [medido].

**Son tres modelos, no dos:** `content-scheduler` **empuja** por API a `meta_graph` · `blog-promoter`
**marca** en `vercel_html` · y `shopify_blog` **empuja por la API de Shopify**, que no es ninguno de
los dos: tiene API como el primero, pero es blog como el segundo.

**Lo que ya está resuelto y no hay que volver a decidir:** el handle es **`hair-intelligence`** (§B).

**Contrato, el mismo que el del promotor y con un añadido que sale de lo medido hoy:**

- **`post_url` se sella con la URL real que devuelve Shopify**, nunca construida a mano. Si Shopify no
  la devuelve, **no se marca publicada**.
- **La franja y la pieza se sellan juntas, y la franja también cuando la pieza ya estuviera publicada**
  — es el defecto de la §A corrección 2, y nace cerrado en vez de heredarse.
- **Fail-loud** si el blog destino no existe o el artículo no se crea.
- **Cron propio, apagado al nacer.** Se enciende tras su `dry_run`, como se hizo con `carril-regulator`.

**Test de la marca N+1, respondido:** el proveedor `shopify_blog` es **eje** y va en la constante del
publicador, igual que `vercel_html`; **el handle, el `base_url` y la tienda son instancia** y ya viven
en `intel.brand_publish_channels.config`, resueltos por `brand_id`. Hoy la enumeración de marcas que
usan este proveedor **es de una** —NeuroneSCF—, y por eso el publicador **no se llama por ella**: se
llama por lo que hace.

---

## 🔴 FRENTE 3 — LOS BLOGS DE UNREALVILLESTUDIO. ⚠️ La causa raíz del brief no se sostiene

### Lo que el brief daba por causa

*«El defecto está en el componente que arma `platforms` al crear la fila de la cola, y sólo para esta
marca.»*

### Lo medido, con archivo y línea

**1 · No hay código por marca.** Barrido sobre los cuatro EF del camino —`content-dispatcher`,
`iid-process`, `iid-core` y `content-scheduler`— buscando `UnrealvilleStudio`, `NeuroneSCF`,
`LucienSael` y `ForumPHs`: **cero apariciones** [medido]. No existe la rama por marca que el brief
supone.

**2 · `platforms` de la fila de cola sale del MODELO, no de la marca.** La cadena completa:

| Paso | Archivo y línea | Qué hace |
|---|---|---|
| 1 | `iid-process/index.ts:654` | El **único ejemplo** del esquema del prompt dice `"platforms_hint":["linkedin"]` |
| 2 | `iid-process/index.ts:845` | `platforms: finding.platforms_hint ?? ["linkedin", "instagram"]` |
| 3 | `iid-core/index.ts:112` | `platforms: platforms ?? []` — lo escribe tal cual en la cola |
| 4 | `content-dispatcher/index.ts:81` | `const platforms = (item.platforms as string[]) ?? ["linkedin"]` — sólo **lee** |

**`intel.brand_topics.platforms` no se consulta en ninguno de los cuatro** [medido: `grep` sobre
`supabase/functions/`, cero coincidencias fuera de `content-watcher` y `content-scheduler`, que lo
leen para otra cosa].

**Así que la causa raíz es otra, y es más barata de arreglar:** la fila de cola lleva **lo que el
modelo sugirió**, y el modelo sólo ve un ejemplo que dice `linkedin`. **Los 6 dominios de
UnrealvilleStudio declaran `blog` en `brand_topics.platforms`** [medido] **y nadie lee esa columna al
crear la fila.** No es que el blog falle: **nunca se le pide, porque nadie pregunta a la marca.**

**3 · La cadencia NO es el bloqueo, y conviene descartarlo por escrito.** `intel.brand_cadence`
**sí** declara `blog` para UnrealvilleStudio —`1x_week` / `1x_week` / `2x_week`— [medido]. Lo que no
lo declara es el `cadence` de sus `brand_topics`, que es el **alias legacy** y sólo se usa cuando
`brand_cadence` no tiene filas (`content-scheduler/index.ts:1019` y `:1023`). Tiene filas.

**4 · Y una comparación del brief que hay que leer con cuidado.** *«ForumPHs 22»* es correcto en
sustancia, pero **ForumPHs también tiene 0 filas con `blog`**: su canal de blog se llama
**`blog_forumphs`**, y son **22** las filas que lo llevan [medido]. La comprobación correcta no es
«¿contiene `blog`?» sino **«¿contiene el `platform_key` del canal de blog de esa marca?»**.

**El conteo completo, medido:**

| Marca | Filas de cola | Con su clave de blog | Clave |
|---|---|---|---|
| ForumPHs | 100 | **22** | `blog_forumphs` |
| LucienSael | 78 | **16** | `blog` |
| NeuroneSCF | 85 | **3** | `blog` |
| **UnrealvilleStudio** | **64** | **0** | `blog` |

### El encargo, reformulado por lo medido

**No es «encontrar dónde se excluye a UnrealvilleStudio»** —no se la excluye en ninguna parte—. Es:
**hacer que `platforms` de la fila de cola se resuelva contra los canales activos de la marca en vez
de contra la sugerencia del modelo**, dejando la sugerencia como preferencia dentro de lo que la marca
sí tiene.

**Test de la marca N+1, respondido:** la resolución por `brand_id` contra `brand_topics.platforms` ∩
`brand_publish_channels` activos es **eje** y va en el código; **qué canales tiene cada marca** es
instancia y ya está en el dato. Una marca nueva entra sin tocar código. **Y el fail-loud que falta:**
si la intersección queda **vacía**, hoy la fila se crea igual con la sugerencia del modelo — debe
**declararlo y no crearla**, porque una pieza para un canal que la marca no tiene es trabajo que nadie
va a publicar.

---

## 🟡 FRENTE 4 — CADENCIA DE BLOG Y DOMINIOS. El pozo es más chico de lo que la tabla sugiere

### La regla, y sustituye a una cifra suelta

**La cadencia de blog de una marca se deriva de sus dominios vivos**, con **turno mínimo de un dominio
en 4 semanas**. Dos artículos semanales del **mismo** dominio canibalizan; de dominios distintos, no.
**El riesgo no lo crea la frecuencia: lo crea la repetición de intención de búsqueda.**

**Los dominios declarados, medidos en `intel.brand_topics`** — la tabla del brief se confirma exacta:

| Marca | Activos | Inactivos | Activos que declaran blog | Sostiene hoy | Para 2/semana |
|---|---|---|---|---|---|
| ForumPHs | **32** | 0 | 32 | 2/semana holgado | ya |
| NeuroneSCF | **9** | 0 | 4 | 2/semana justo | ya, al límite |
| UnrealvilleStudio | **6** | **1** (`system-proof`) | 6 | 1/semana | **faltan 1 o 2** |
| LucienSael | **4** | 0 | 4 | 1/semana | **faltan 4** |

### 🔴 Y el hallazgo que cambia el encargo: los dominios declarados NO están produciendo

**Medido sobre los 241 vectores del corpus, que es lo que de verdad se escribió:**

| Marca | Dominios declarados activos | **Dominios con piezas** | Vectores |
|---|---|---|---|
| ForumPHs | 32 | **5** | 57 |
| NeuroneSCF | 9 | **6** | 60 |
| UnrealvilleStudio | 6 | **4** | 72 |
| **LucienSael** | **4** | **1** — `behavioral-science` | 52 |

**LucienSael produce sobre UN solo dominio, con cuatro declarados.** Sembrarle cuatro dominios más no
le da cuatro dominios más de oferta: le da **ocho declarados y uno produciendo**, porque —como este
archivo ya registró el 2026-09-12— **LucienSael tiene 1 agente activo y CERO crons**. ForumPHs, con 32
declarados, produce sobre 5: es la otra cara de sus **26 dominios sin agente**.

**Se sigue de ahí, y es el orden correcto:** **primero el agente y su cron, después el dominio
nuevo.** Un dominio sin agente no es oferta; es una fila.

### Encargo, en tres tiempos — el primero es nuevo

1. **CC o Sam dan de alta agente y cron para los dominios YA declarados que no producen** —empezando
   por los 3 de LucienSael—, que es oferta que ya está pagada y no está saliendo.
2. **Sam define los territorios** de los dominios nuevos —4 para LucienSael, 1 o 2 para
   UnrealvilleStudio— con el criterio de **qué cubre cada uno y por qué no se solapa** con los
   existentes. **CC no los inventa.**
3. **CC los siembra** en `intel.brand_topics` con sus `platforms`, `angles` y `cadence`, **y ajusta
   `intel.brand_cadence` de blog sólo entonces**, no antes.

**El crecimiento de fases lo agrava:** si `month_3plus` pide 3 por semana, **el pozo tiene que crecer
en la misma proporción**. Hoy sólo ForumPHs sostiene su propio mes 3, y sólo sobre el papel.

**Lo mismo aplica a LinkedIn con una diferencia:** LinkedIn no indexa como el blog, así que ahí el
riesgo no es SEO sino **fatiga de audiencia**. El turno mínimo puede ser más corto; **el criterio es
el mismo**. (Recordatorio medido: los canales `linkedin` de ForumPHs y UnrealvilleStudio están
**inactivos** por decisión de Sam del 2026-08-26, a la espera de la app de organización y su token.)

---

## 🟡 FRENTE 5 — LAS FIXABLES. ⚠️ El contador de hashtags NO miente

El estado y la reagrupación de las 22 están en la **§C**. Acá va el único grupo que el brief clasifica
como defecto técnico, **y la medición lo da vuelta**.

### Lo que el brief afirma

*«El warn dice 2 y medido: no hay ninguno. El grupo de hashtags no es editorial: es un warn que
miente. Encargo propio: localizar por qué el contador afirma lo que no existe.»*

### Lo medido, sobre la pieza concreta

Pieza **`abda1ebf-0f3b-41e7-999e-c05a6d4cd846`** · UnrealvilleStudio · `meta_fb` · nota de Sam del
2026-09-01: *«no he visto hashtags aunque el warn dice que lleva 2»*.

**El contador que dice «2» está acá** [medido en `assets.social.voice_constraints[0]`]:

```json
{ "adapted": true, "platform": "meta_fb",
  "hashtags_in": 0, "hashtags_out": 2, "max_hashtags": null,
  "over_ceiling": false, "prohibitions": 0,
  "max_hashtags_source": "genome_no_hashtags" }
```

Lo escribe `content-run-stage/index.ts:2768-2778` (`ADAPT-01`), y **cuenta bien**:

| Texto | Longitud | Idioma | Hashtags medidos | Cola |
|---|---|---|---|---|
| `assets.social.adapted[0].copy` | **1.187** | español | **2** | `… Tienes una impresora.` `#ContentMarketing #SEO` `❯ Unrealville Studio` |
| `assets.copy` | **3.747** | inglés | **0** | `… You have a printer.` `❯ Unrealville Studio` |

**`hashtags_out: 2` es exacto para el texto que midió.** Los hashtags **existen**: están en la copia
adaptada, que es la que va a `meta_fb`.

### La causa raíz real, y es más grave que un contador roto

**La bandeja le mostró a Sam un texto, y el publicador manda otro.** `assets.copy` y
`assets.social.adapted[0].copy` son **dos objetos distintos, en dos idiomas distintos, con 2.560
caracteres de diferencia**, y **nada los reconcilia**. Sam juzgó la pieza sobre el primero; el segundo
es el que publica. El contador es el único que miró el correcto.

**Encargo reformulado, y es el que vale:** **decidir cuál de los dos textos es la pieza** —y hacer que
la superficie de aprobación muestre **ése**—. Mientras no se decida, **todo veredicto de Sam sobre
una pieza social está emitido sobre un texto que no se publica**, y eso no afecta a un grupo de 1: las
**22** notas se escribieron mirando `assets.copy`.

**Dato adicional que cierra el grupo:** **no existe ninguna regla de hashtags para
UnrealvilleStudio.** Las cinco que hay —`HR-LUC-06` a `HR-LUC-10`— son **todas de LucienSael**
[medido]. La pieza salió **`PASS` con `failed_rules: []` y `rules_evaluated: 10`**: **ningún warn se
emitió**. Lo que Sam leyó como «el warn dice 2» es el **campo de medición** `hashtags_out`, no una
regla incumplida.

---

## 🔷 FRENTE 6 — SERIE N: el estado real, y un identificador nuevo

**Las tres filas que decían `SIN CONTENIDO` dejaron de estarlo el 2026-09-10** y nadie lo llevó al
archivo. La tabla de la sección `SERIE N` queda actualizada; **lo que cada fila decía antes se
conserva acá**, que es lo que exige `CC_PROTOCOL.md` §0:

| ID | Decía | Dice ahora | Evidencia |
|---|---|---|---|
| **N07** | ⬛ `SIN CONTENIDO` | 🟡 **abierto** — el rótulo del juez: `CONTEXTO —` y su guardián. Vive en `content-watcher` | definido en la sesión F.B, 2026-09-10 |
| **N08** | ⬛ `SIN CONTENIDO` | 🟡 **abierto** — reescritura de las piezas con veredicto de Sam. **22 filas `fixable` vivas**, ver §C | **medido** 2026-09-12 |
| **N13** | ⬛ `SIN CONTENIDO` | 🟢 **CERRADO hoy** — el promotor de blogs, vivo · **con el defecto de la §A abierto** | **medido** 2026-09-12 |
| **N16** | **no existía en ningún archivo** | 🔴 **ALTA** — por qué el reservador no toma las piezas `scheduled` sin franja | **medido** 2026-09-12 |
| **N05A** | 🟡 abierto | 🟡 abierto, **y su corrección se confirma otra vez** | **medido** 2026-09-12 |
| **N15** | 🟡 abierto | 🟡 abierto y barato — sin cambios | — |

### 🔴 N16 — el reservador no toma las piezas `scheduled` sin franja. ALTA

**No estaba en ningún archivo del repo** [medido el 2026-09-12: `grep -rn "N16"` sobre todos los
`.md`/`.json` versionados → **cero apariciones**]. Por la regla de esta sección, un encargo que lo
nombrara **era irresoluble**. Queda dado de alta.

**Qué es:** hay piezas vivas en `scheduled` que **no tienen franja**, y franjas libres que **no tienen
pieza**. Nadie las junta.

**El estado medido** [`now()` = 2026-09-12 19:21:57 UTC]:

| Qué | Valor | ⚠️ El brief decía |
|---|---|---|
| Piezas `scheduled`, no descartadas, **sin franja** | **24** | 13 |
| Franjas libres **futuras** (`piece_id IS NULL`, `slot_at > now()`) | **43** | 45 |
| Franjas libres **totales** | **59** | — |

**Las dos cifras del brief están desactualizadas y el frente es peor**, no mejor: **24 piezas
esperando contra 43 huecos disponibles**. Producción que ya se pagó y que no llega a publicarse por
falta de emparejamiento.

**Repo:** `unrealvillestudio-hub/unrlvl-iid-functions`, `supabase/functions/publish-slot-reserver/`.
**Lo primero es sólo lectura:** por qué el reservador no las ve — si filtra por `created_at`, por
`scheduled_for`, o si sólo reserva hacia adelante desde la pieza y nunca hacia atrás desde el hueco.

### 🟡 N05A — la corrección se confirma por tercera vez, y explica la §C

**Medido el 2026-09-12** en `pg_indexes`:

```
approval_calibration_piece_id_key |
  CREATE UNIQUE INDEX approval_calibration_piece_id_key
    ON intel.approval_calibration USING btree (piece_id)
```

**Es un `UNIQUE INDEX`, no una constraint: se retira con `DROP INDEX`, no con `DROP CONSTRAINT`.**
**Y su efecto ya está costando algo concreto:** bloquea el segundo veredicto sobre una misma pieza,
que es **exactamente por qué «11 cerradas» no tiene representación en el dato** (§C). Cerrar N05A es
la condición para que N08 pueda medirse.

---

## 🗓️ CIERRE 2026-09-12-v1 — El método de publicar se vuelve cargable, y N10 queda aplicado a medias

_(Bloque al tope. Lo aplicó Claude.ai y lo desplegó Sam; **CC documenta, no re-aplica.**
Todo lo etiquetado `medido` acá lo consultó CC con `execute_sql`, `list_edge_functions` y
`get_edge_function` el **2026-09-12 entre las 14:30 y las 16:30 UTC**.)_

### ✅ Cerrado hoy

- ✅ **`skills/publicacion-operativa/SKILL.md` v1.0 — ALTA.** Capa **MÉTODO**, destino **CARGABLE**,
  transversal. Entregado por Sam como archivo consolidado y **registrado tal cual, sin reescribir**:
  la copia se verificó por **md5 idéntico** contra el origen. Registrado en `skills/INDEX.md` v1.13 en
  los tres sitios que el índice exige. **Es cero estado a propósito**: su Parte D lleva las consultas,
  no las cifras.
- ✅ **N10 — la DDL está aplicada** [medido]: `intel.brand_publish_slots.last_drain_check_at` existe ·
  `intel.iid_scheduler_config.drain_backoff_sin_publicador` vale **`6 hours`** ·
  `intel.drain_due_slots` ya excluye lo sellado hace menos que ese intervalo.
- ✅ **N10 punto 5 — APLICADO con aprobación de Sam.** `intel.v_carril_cobertura` gana
  **`franjas_sin_publicador`** y **`primera_sin_publicador`**; `franjas_comprometidas`, `cobertura` y
  `alarma` **no cambian de fórmula** [medido]. La vista **cuenta el sello** que el código escribió;
  **no decide** qué proveedor es drenable, que sigue siendo capacidad de `DRAINABLE_PROVIDER`.
- ✅ **BRIEF-06 — `intel.carril_regulation_log` creada y `carril-regulator` desplegada** (v1,
  2026-09-12) [medido con `list_edge_functions`].
- ✅ **`dry_run` corrido y leído** [medido en la bitácora]: **16 canales**, **14 `SUPPLY_ABSENT`** y
  **2 `HOLD`** con código `COVERAGE_SUFFICIENT`, **cero liberadas**, **cero aparcadas**, **déficit
  total 75,2**.
- ✅ **`carril-regulator-daily` ACTIVADO** — `jobid 85`, `40 6 * * *` [medido].
- ✅ **Los 12 crons de UnrealvilleStudio, reprogramados a semanal** — un agente por día de lunes a
  sábado, research 08:00 UTC y process 10:00 UTC [medido: los 12 activos con esas expresiones].
  Sus 6 agentes declaran `weekly` en `intel.iid_agents` y sus crons corrían **trimestral y
  semestralmente**: ahora las dos fuentes dicen lo mismo **para esa marca**.
- ✅ **PR #143 de `unrlvl-iid-functions` mergeado** — el código de N10 está en `main`.

### 🔴 ABIERTO Y URGENTE — `content-scheduler` no lleva el código de N10

**Medido el 2026-09-12, y contradice lo que el brief daba por hecho.** La `content-scheduler`
desplegada es la **v17 del 2026-09-10 21:43 UTC**: contiene el tope de caption de `#141`, y
**cero apariciones** de `sellarBackoff`, `last_drain_check_at` y `SLOT_BACKOFF_FAILED`
[`get_edge_function`, conteo literal sobre el bundle desplegado].

**El efecto lo confirma, que es la prueba que vale:** `intel.brand_publish_drain_log` registra
**120 `PROVIDER_NOT_DRAINABLE` en las últimas 6 horas** —el cron 66 corre cada 15 minutos y llevaba
12 corridas— y `intel.brand_publish_slots` tiene **CERO filas** `reserved` con `last_drain_check_at`
no nulo. **La DDL está; el despliegue falta. El backoff no está operando.**

Es exactamente el defecto que `protocols/MEASUREMENT_METHOD_RULE.md` §5 nombra: **un PR mergeado no
despliega nada**, y **el objeto de despliegue se comprueba antes**. Y es la entrada **C.1** del skill
que se da de alta hoy: *push ≠ deploy*.

**Lo que falta, y es de Sam** — desplegar desde `main` actualizado:

```
supabase functions deploy content-scheduler --project-ref amlvyycfepwhiindxgzw --no-verify-jwt
```

**Verificación posterior, en este orden:** que el bundle contenga `sellarBackoff`, y **a las 6 horas**
que `franjas_sin_publicador` sea mayor que cero en los canales de `tiktok_business`, `vercel_html` y
`x_api`, y **cero** en los de `meta_graph`. Si lo primero pasa y lo segundo no, el sello falla y hay
que leer `writeErrors`.

### 📋 Decisiones tomadas, con su motivo

- **El regulador se enciende; la alarma no.** El `dry_run` mostró que hoy el regulador **no libera ni
  aparca nada**: sólo escribe su bitácora. Encenderlo **no cambia producción** y empieza a acumular la
  serie que hará falta para saber si el sistema arranca.
- **`carril-cobertura-alarma-daily` sigue apagado** — `jobid 86`, `0 7 * * *` [medido]. Con **14 de 16
  canales** en `SUPPLY_ABSENT`, enviaría un correo diario repitiendo una condición ya conocida y
  documentada, y **lo primero que enseñaría es a ignorarla**. `BRIEF-06` dice que la alarma existe
  contra la degradación **silenciosa**; ésta no es silenciosa: está medida y tiene encargo abierto.
  **Condición para encenderla, escrita por adelantado: cuando `SUPPLY_ABSENT` baje de 14 a 4 o menos.**
  Decisión de Claude.ai, autorizada por Sam el 2026-09-12; **Sam la revierte cuando quiera**.

### ⚠️ Un defecto del brief, anotado para que no se repita

`UPDATE cron.job SET active = false` **es rechazado en este proyecto** con
`permission denied for table job` [medido el 2026-09-12]. La vía que funciona es
**`cron.alter_job(jobid, active := false)`** con el `jobid` que devuelve `cron.schedule`. Una
migración que apague crons por `UPDATE` **falla entera**. Anotado en `CAPABILITIES.md` v1.15.

### 🔶 Frentes abiertos — los siete que este cierre deja anotados

1. **Déficit de oferta: 75,2 piezas en 14 canales** [medido]. **El regulador no tiene nada que
   regular.** Es la raíz de la que cuelgan los frentes 2 y 3.
2. **26 dominios de ForumPHs sin agente**, frente a 6 con agente sobre 32 topics activos
   [reportado — brief de Claude.ai, 2026-09-12].
3. **LucienSael: 1 agente activo y CERO crons.** Su producción **no falla — no está programada**.
   **No se le crearon crons a propósito:** con 8 franjas semanales y su pozo actual, **cualquier
   cadencia produce duplicados por construcción**. **Decisión de Sam pendiente: más dominios o menos
   franjas.**
4. **Nada reconcilia `intel.iid_agents.run_frequency` con `cron.job`.** Hoy se alinearon a mano los 12
   de UnrealvilleStudio; **la próxima divergencia no la detecta nadie**. Propuesta pendiente:
   comprobación periódica que las enfrente y **falle ruidosamente**.
5. **7 canales con política divergente de su cadencia.** Regenerar políticas **después** de observar
   unos días al regulador, no antes.
6. **4 de 6 proveedores activos sin publicador** — `vercel_html`, `tiktok_business`, `x_api`,
   `shopify_blog`. El backoff apaga el ruido; **el hueco sigue**, y en cuanto la EF se despliegue
   **se verá** en `franjas_sin_publicador`.
7. **`icr_passed` es una constante literal `true`** en `content-run-stage`, y **`content-watcher` no
   conoce el concepto ICR**. El estándar del ecosistema **se estampa sin comprobarse**. Encargo
   aparte, ya decidido por Sam.

### 📐 Contrato ICR — forma decidida, contenido pendiente

Decidido por Sam el 2026-09-12: **contrato, no protocolo**. Tabla de definiciones **cerrada**: ICR,
QA, AIID, IID, AIFE, CRO, PSY. **Vive en `protocols/ICR_CONTRACT.md` desde el 2026-09-12**, con sus
doce cláusulas y sus doce verificadores, que **informan y no bloquean**. **Sigue pendiente:** que los
verificadores marcados «A ESPECIFICAR» reciban su consulta medida —V-09 el primero, porque
`icr_passed` se estampa sin comprobarse— y sembrar `icr_standard` para las marcas que aún no lo
tienen.

---

## 🗓️ ACTUALIZA 2026-09-09-v1 — Publicación fuera del carril, y dos EF de eje

_(Bloque al tope. Detalle en `brands/ForumPHs/session_log.md`, `brands/NeuroneSCF/session_log.md` y
`brands/LucienSael/session_log.md` (2026-09-09).)_

> **Professor cerrado ANTES del Actualiza** (orden `Professor → Actualiza → commit` respetado):
> **16 learnings**, `session_date = 2026-09-09`, `checkpoint_number = 16`, `approved_by_sam = true`
> [reportado — brief de Claude.ai, 2026-09-09]. **SMA no se consultó** — Sam no lo pidió.
>
> **Etiqueta de evidencia en todo este bloque.** Lo que CC pudo medir contra la fuente al escribirlo
> va como `medido` con su consulta al lado; lo que viene del brief de Claude.ai y no se volvió a
> medir aquí va como `reportado`, con quién lo afirma y cuándo. No hay afirmación sin etiqueta.

### ✅ Cerrado hoy

- ✅ **Carrusel del Proyecto de Ley 678 publicado en las dos redes de ForumPHs** —
  Instagram `platform_post_id 18016965923948414` · Facebook `1184045168120977_122135449431355949`.
  **Fuera del carril**, a mano y con aprobación de Sam [reportado — brief].
  **Los dos identificadores quedan CONFIRMADOS contra el libro que manda** [medido el 2026-09-10]:
  ambos están en **`public.scheduled_posts` con `status = 'published'`** —IG a las 18:52:56 UTC y FB
  a las 20:10:40 UTC del 2026-09-09—, **no en `brand_publish_drain_log`**, que para ForumPHs no
  registra ninguna fila de Meta en esas fechas: sólo `blog_forumphs` con `PROVIDER_NOT_DRAINABLE`.
  Es la prueba, por partida doble, de que **la publicación no pasó por el carril**.
- ✅ **`media-store` y `meta-graph-post` desplegadas y ACTIVE** en `amlvyycfepwhiindxgzw`
  [medido con `list_edge_functions` y `get_edge_function` el 2026-09-10]. Las dos son **eje**:
  el `grep` de marca sobre su código da **cero** — `media-store` recibe `bucket`, `path`,
  `content_type`, `data_base64` y `upsert` por el cuerpo, y `meta-graph-post` resuelve las
  credenciales por `brand_id` contra `public.meta_accounts` **en runtime**.
- ✅ **Dos piezas de blog de ForumPHs y la primera de LucienSael, publicadas por marcado**
  [reportado — brief]. Publicar, en el proveedor `vercel_html`, **es cambiar el estado**.
- ✅ **Tres piezas de NeuroneSCF corregidas y pasadas a `scheduled`** — las que Sam marcó
  `fixable` [reportado — brief].
- ✅ **La duda sobre `vercel_html` queda cerrada: SÍ publica**, por **lectura** y no por drenaje.
  `PROVIDER_NOT_DRAINABLE` **es correcto por diseño** para ese proveedor, no un defecto
  [reportado — brief]. Lo que faltaba no era el drenaje: era quién cambia el estado.

### 🔴 Frentes abiertos que este Actualiza deja anotados

1. 🔴 **No existe promotor de blogs.** Ningún componente mueve una pieza de blog de `scheduled` a
   `published` [reportado — brief]. **Debe nacer como eje**, resolviendo el canal por `brand_id`
   contra el dato, nunca por una rama de condicional por marca (`protocols/MULTIBRAND_RULE.md`).
2. 🟡 **Las 14 reglas `blocking` inactivas NO eran una pérdida de capacidad: eran una cohorte
   superseída, y se retira en esta misma sesión.** Las 13 que se borran son del **2026-07-27**, con
   prefijo de marca, y **cada una declaraba en sus propias notas que estaba superseída** por su
   equivalente de eje — `HR-GEN-02`, `HR-GEN-04`, `HR-GEN-05`, `HR-LEGAL-01/02`, `HR-RETAIL-01`,
   `IMG-GEN-01/02/05`, `IMG-LEGAL-01/02`, `IMG-RETAIL-01` [medido el 2026-09-11: las 13 filas
   volcadas íntegras antes de borrarlas, las 13 con `SUPERSEDIDA` en `notes`].
   **`HR-FPHS-10` NO se borra:** su `subject` `cta_por_frente` **no tiene sucesora viva**, y su nota
   es el único registro de que ese juicio vive en `gate7`.

   > ⛔ **CORRECCIÓN 2026-09-11 — la redacción anterior de este punto afirmaba de más.**
   > Se conserva por `CC_PROTOCOL.md` §0:
   >
   > > 2. 🔴 **Las reglas `blocking` del Watcher están inactivas — 14 de 69, todas con `active = false`**
   > >    [medido el 2026-09-10: `select severity, active, count(*) from intel.watcher_rules group by 1,2`
   > >    → `blocking/false = 14` · `warn/true = 54` · `warn/false = 1` · **total 69**]. La consecuencia se
   > >    dice entera: **hoy ninguna regla puede detener una pieza.** El juez marca; nada corta.
   > >    **Precisión de columna, para que no se repita el error de lectura:** la severidad vive en
   > >    **`severity`**, no en `enforced_on` —esa columna vale `piece` o `piece_and_brief`—, y consultar
   > >    `enforced_on = 'blocking'` devuelve **cero filas** y hace parecer que el problema no existe.
   >
   > **Qué estaba mal y qué no.** El **conteo era correcto** —14 de 69, todas inactivas— y también
   > la precisión de columna, que se conserva abajo. Lo que estaba mal es **la consecuencia**:
   > presentaba como pérdida de capacidad lo que era **ruido de una migración ya hecha**. Esas 13
   > reglas **no dejaron de cortar: fueron reemplazadas por reglas de eje que sí corren**. La
   > alarma fue falsa, y la produjo leer un `active = false` sin leer la nota que había al lado.
   >
   > **Y la pregunta correcta —¿soporta el Watcher una severidad bloqueante?— queda RESPONDIDA, y
   > la respuesta es SÍ** [medido el 2026-09-11 sobre `content-watcher`]:
   > `parseRuleVerdict` construye `const sev = new Map(rules.map(r => [code, r.severity ?? "blocking"]))`
   > y reparte los códigos entre **`violated`** —que hace fallar el gate— y **`warned`**, que se
   > registra y **no bloquea**. **La capacidad existe y está cableada.** Lo que no hay es ninguna
   > regla que la use: tras el borrado queda **una sola** `blocking`, `HR-FPHS-10`, inactiva a
   > propósito.
   >
   > 🔴 **Y ahí aparece el hallazgo que nadie buscaba: el valor por defecto es `blocking`.**
   > `r.severity ?? "blocking"` significa que **una regla que llegue con `severity` nulo BLOQUEA**.
   > Hoy no ocurre —las 56 filas tienen severidad—, pero **la columna no tiene `NOT NULL`**: sembrar
   > una regla sin severidad la convierte en bloqueante sin que nadie lo pida. Es fail-safe por
   > diseño y conviene saberlo antes de sembrar, no después.

   **Precisión de columna que SÍ se sostiene, y se conserva:** la severidad vive en **`severity`**,
   no en `enforced_on` —esa columna vale `piece` o `piece_and_brief`—, y consultar
   `enforced_on = 'blocking'` devuelve **cero filas** y hace parecer que el problema no existe.
2-bis. 🟡 **`verify_pattern` SÍ se lee — por tres consumidores— y NO está en `NULL` en todas.**
   Las dos premisas del encargo se caen por medición [2026-09-11]. **Lo leen:** el corrector
   determinista pre-juicio de `content-run-stage` (`CORRECTOR_COLS = "verify_pattern,fix_replacement"`),
   la verificación de procedencia de `iid-process` (**PROC-01**) y la guarda de texto editado de
   `piece-edit`. **Y lo tienen 5 de las 56 reglas** — `HR-FPHS-13`, `HR-FPHS-15`, `HR-FPHS-16`,
   `HR-LEGAL-01`, `HR-LUC-10` —, más **1** con `fix_replacement`.

   **Así que cablearlo no cuesta código: cuesta dato.** La maquinaria está construida y **ya avisa
   cuando le falta**: `iid-process` mete la regla sin patrón en `unverified` y registra
   `SIN_VERIFICACION_DETERMINISTA`, con el comentario que lo explica — *«silencio no es acuerdo, es
   ausencia de medición»*.

   🔴 **Por qué se publicaron tres piezas con voseo, entonces:** `HR-GEN-05` —activa, `warn`,
   `brand_id = NULL`, subject `idioma_separado`— **no tiene `verify_pattern`** [medido]. Su
   enunciado dice «regionalismos, marcas dialectales», y **sin patrón eso queda al criterio del
   juez**, que es un LLM leyendo prosa. **El arreglo es sembrar el patrón en `HR-GEN-05`**, no
   escribir código — y es además la respuesta al frente 3, que pedía una regla de registro
   gramatical: **la regla ya existe y es de eje; lo que le falta es la mitad determinista.**

   > **Nota de cierre del círculo:** `HR-NSCF-04`, una de las 13 borradas hoy, era la predecesora
   > **de marca** de `HR-GEN-05` sobre este mismo `subject`. La migración a eje se hizo; lo que no
   > se hizo fue darle a la regla de eje el patrón que la vuelve comprobable.

   ### ✅ SEMBRADO el 2026-09-12 — `HR-GEN-05` ya tiene su mitad determinista

   **El patrón enumera 74 formas voseantes inequívocas. No es un sufijo genérico, y eso es la
   decisión de diseño**, no un detalle: `-ás`, `-és` e `-ís` genéricos marcan **el futuro correcto de
   tuteo** (`hablarás`, `podrás`, `tendrás`), los **gentilicios** (`inglés`, `cortés`), y
   `jamás` · `además` · `quizás` · `atrás` · `compás` · `país` · `interés` · `después` · `Tomás`.
   Un patrón así habría convertido la regla en ruido el primer día.

   **Medido ANTES de sembrar, sobre las 169 piezas del corpus** [2026-09-12]:

   | | |
   |---|---|
   | Piezas que marca | **24** de 169 |
   | Formas distintas encontradas | **14** |
   | **Falsos positivos** | **CERO** — las 24 inspeccionadas en contexto, una por una |
   | En cola de publicar (`scheduled` · `awaiting_approval`) | **8** |
   | **Ya publicadas** | **1** |

   **Y simulado contra el traductor POSIX→ECMAScript de la propia EF** —mismos mapas, mismas flags
   `giu`—: **14/14 verdaderos positivos y 21/21 controles negativos**, con las trampas de arriba
   entre los controles.

   🔴 **`sos` queda FUERA del patrón, y es una exclusión medida:** `compileRulePattern` compila con
   flag **`i`**, así que `sos` matchearía el **«Kit SOS»** del catálogo de NeuroneSCF. Una forma
   voseante que no se puede distinguir de un nombre de producto **no entra**: el falso positivo
   sobre un producto real cuesta más que el voseo que deja pasar.

   🔴 **`fix_replacement` se deja en `NULL` A PROPÓSITO.** Voseo→tuteo **no es una sustitución de
   regex**: `querés`→`quieres` cambia la raíz, y `vos`→`tú` arrastra la concordancia de la frase
   entera. El corrector, **sin reemplazo, MARCA y no inventa** — que es exactamente lo que debe
   hacer. Poner un reemplazo aquí produciría español roto con cara de corregido.

   **Lo que queda abierto, y es de Sam:** las **8 piezas en cola** y **la ya publicada** llevan
   voseo hoy. El patrón las marcará en cuanto pasen por el corrector o por `piece-edit`; **no las
   corrige solo, y no las toqué.**

3. 🔴 **No hay regla de registro gramatical en ninguna marca** [reportado — brief; **matizado por
   el punto 2-bis**: la regla de eje `HR-GEN-05` existe y cubre el enunciado — lo que falta es su
   `verify_pattern`]. La propuesta,
   **nombrada como propuesta y no como regla vigente**: una regla **de eje** que prohíba las formas
   voseantes, con `verify_pattern`, aplicable **según el registro declarado de cada marca**, que es
   dato. El registro es instancia; la regla, eje.
4. 🔴 **La bandeja de calibración está incompleta — 16 piezas en `awaiting_approval`** que **no
   aparecieron en ella** [medido el 2026-09-10: `UnrealvilleStudio` **7** (la más vieja del
   2026-08-18) · `LucienSael` **6** (2026-07-31) · `ForumPHs` **3** (2026-08-22) — **16 en total**,
   tres marcas]. La ausencia en la bandeja es **reportado — brief**; el censo de piezas es
   **medido**. **Falta leer la consulta del orchestrator**: mientras no se lea, la causa está
   **deducida**, no medida, y no se toca nada.
5. 🔴 **Bucle del drenaje.** Las franjas de proveedor **no drenable** reintentan **cada 15 minutos
   sin fin**. **Corrección de dato del brief, declarada:** el brief afirmaba **164 intentos**; la
   medición da **192** — **96 en `blog` y 96 en `x` de LucienSael**, todos
   `PROVIDER_NOT_DRAINABLE`, de las **00:00:03** a las **23:45:01 UTC** [medido el 2026-09-10:
   `select brand_id, platform_key, outcome, count(*) from intel.brand_publish_drain_log where
   run_at::date = '2026-09-09' group by 1,2,3`]. **96 es exactamente 24 h a `*/15`**: el bucle no
   se agota ni se frena — corre el día entero a la cadencia del cron. Un `PROVIDER_NOT_DRAINABLE`
   **correcto por diseño** no debería reintentarse indefinidamente.
   **Y en la misma consulta apareció algo que el brief no traía:** `NeuroneSCF` / `meta_ig` con
   `outcome = PUBLISH_FAILED` el 2026-09-09 a las **23:00:04 UTC**, un solo intento [medido]. La
   causa **no se investigó en esta sesión** y queda anotada, no diagnosticada.
6. 🔴 **Secreto literal en las dos EF nuevas.** En `media-store` y en `meta-graph-post` la constante
   `SECRET` toma un **literal como fallback** de la variable `MEDIA_STORE_SECRET`
   [medido: `index.ts` de las dos EF, línea 8 y línea 15 respectivamente — el valor **no se
   transcribe aquí**, por la regla de secretos de `CLAUDE.md`]. El arreglo es **retirar el fallback**
   y dejar la variable sola, con fail-loud si falta. **La variable ya se lee**: lo que sobra es el
   literal.
7. 🔴 **Dos libros mayores que discrepan — y ya tienen ÁRBITRO DECLARADO.**
   `intel.brand_publish_drain_log` registra **INTENTOS**; `public.scheduled_posts` registra el
   **ESTADO FINAL**. **Manda `scheduled_posts`.** No estaba escrito en ninguna parte y por eso se
   podía leer el libro equivocado sin saberlo; queda escrito en `CAPABILITIES.md`.
   **El caso medido que lo prueba** [medido el 2026-09-10, `platform_post_id` de las dos tablas]:
   una misma publicación de **LucienSael** en `meta_fb` aparece con **dos identificadores
   distintos** — `…_122118274185298889` en `drain_log` con `PUBLISHED` a las **15:15:14 UTC**, y
   `…_122118277401298889` en `scheduled_posts` con `published` a las **16:31:33 UTC**. **Una hora y
   dieciséis minutos, y dos ids para lo que se lee como un hecho.** El del `drain_log` corresponde a
   un intento que **ya no existe en la red**; el vivo es el de `scheduled_posts`.
   **Lo que sigue abierto** no es cuál manda —eso queda resuelto— sino **por qué el drenaje escribe
   un id que después deja de ser el bueno**, y si el primero se borró a mano o lo reemplazó el
   propio carril. Eso **no se investigó** y queda anotado, no diagnosticado.

   > ⛔ **NO OPERATIVO — redacción anterior de este punto (2026-09-09), archivada el 2026-09-10.**
   > Se conserva por `CC_PROTOCOL.md` §0. Nombraba la tabla equivocada y no tenía árbitro:
   >
   > > 🔴 **Dos libros mayores que discrepan.** `scheduled_posts` registró una publicación que
   > > `brand_publish_slots` **no reflejó** [reportado — brief]. Dos registros del mismo hecho que no
   > > coinciden **no son un dato con un error: son dos fuentes sin árbitro declarado.**
   >
   > **Qué cambió y por qué:** la discrepancia **no es con `brand_publish_slots`** sino con
   > `intel.brand_publish_drain_log`, y **ya no está sin árbitro**: manda `scheduled_posts`. La
   > afirmación vieja era `reportado`; la nueva es `medido`, con los dos identificadores al lado.
8. 🔴 **El hueco de la instrumentación de costo NO se cerró: CRECIÓ.**
   [medido el 2026-09-10 sobre `public.ops_generation_ledger`]:

   | Alcance | Registros | `cost_usd = 0` | `rate_source` vacío |
   |---|---|---|---|
   | `generated_at >= 2026-08-25` | **1.875** | **433** | — |
   | Tabla entera | **4.878** | **704** | **132** |

   Sam midió **4.791 / 690** y **1.788 / 419** unas horas antes: las dos mediciones coinciden en
   magnitud y **la diferencia entre ambas es el crecimiento**. Con `$0,0681` por pieza publicada
   declarado como coste del carril desde el 2026-07-31, **una de cada siete filas del ledger no
   sostiene esa cifra**.

   > 🔴 **LA TRAMPA DE LA CONSULTA, escrita para que no vuelva a pasar.** `cost_usd` **NUNCA es
   > `NULL`**: hay **0 nulos y 704 ceros** [medido]. Una consulta que pregunte por
   > `cost_usd IS NULL` devuelve **cero** y **parece que no hay hueco**. Es la misma familia de
   > defecto que el 2026-09-08 dejó escrito como «"0 filas" y "no existe" no son el mismo estado»,
   > en otra forma: **`NULL` y `0` tampoco lo son.** Filtrar `cost_usd > 0` antes de contar los
   > ceros produce el mismo espejismo.

   **Este frente está ABIERTO y no se cierra en este Actualiza.** Ninguna entrada de `AGENDA.md`
   lo declara resuelto — se verificó con un barrido antes de escribir esto.
9. 🔴 **Rotación de `AGENDA.md`** — decisión de Sam, con su propia sección al final de este bloque.

### 🟡 Corrección de estado que este Actualiza aplica a `CAPABILITIES.md`

- 🟡 **El cron 66 `content-placement-poll` NO está apagado: está ACTIVO, `*/15 * * * *`**
  [medido el 2026-09-10 — `select jobid, jobname, schedule, active from cron.job` → jobid 66,
  `*/15 * * * *`, `active = true`]. `CAPABILITIES.md` lo declaraba **APAGADO** desde el 2026-08-26,
  y `AGENDA.md` v2026-09-06-v1 ya lo daba por activo: **el catálogo iba por detrás de la agenda**.
  El texto anterior queda archivado bajo guard `⛔ NO OPERATIVO`, no borrado.

### 🟦 DECISIÓN PARA SAM — rotación de `AGENDA.md`

**No es una tarea: es una decisión.** Este Actualiza **no rota nada**; deja el dato medido y la
propuesta escrita **como propuesta**.

| Archivo | Tamaño | Medido el 2026-09-10 |
|---|---|---|
| `AGENDA.md` | **365.851 b** | **2.526 líneas** · **49** encabezados `##`, de los cuales **29** son bloques fechados `## 🗓️` · **2** guards `⛔ NO OPERATIVO` |
| `historical_AGENDA.md` | **113.988 b** | archivo de rotación |

> **Corrección de dato del brief, declarada.** El brief de Claude.ai afirmaba **19 bloques `##`**;
> el conteo contra el archivo da **49** en total y **29** fechados
> [medido: `grep -c '^## ' AGENDA.md` → 49 · `grep -c '^## 🗓️' AGENDA.md` → 29]. El tamaño, las
> líneas y los dos guards del brief **sí coinciden**. La corrección **refuerza** el argumento en
> vez de debilitarlo: hay más bloque acumulado del declarado, no menos.

**El dato, en una línea:** la AGENDA operativa es **3,2 veces más grande que su propio archivo
histórico**. La rotación existe y **no se está usando al ritmo al que la AGENDA crece**. Con 365 KB
ninguna sesión la lee entera —hoy se cargó completa y se leyeron sólo los bloques del tope— y
**una AGENDA que no se lee entera deja de ser una agenda**.

**Propuesta, para decisión de Sam, y NO incluida en este PR:** rotar a `historical_AGENDA.md` los
bloques cerrados anteriores al **2026-08-01**, **preservando íntegro el texto**, y dejar en
`AGENDA.md` un índice de **una línea por bloque rotado**, con su fecha. Es un **PR aparte**,
posterior a este.

## 🔷 SERIE N — los encargos nominados, y su estado. **REGISTRO ABIERTO**

_(Sección nueva 2026-09-10. **Motivo, dicho por Sam:** «N05A, N07, N08, N10, N13 y N14 no están en
ningún context file y por eso no los pudiste resolver». Un identificador con forma de encargo vigente
**se lee como encargo vigente**; si no existe en ningún archivo, quien lo recibe **no puede
resolverlo y debe pararse**. Esta sección cierra ese hueco: de aquí en adelante, **un encargo que no
esté acá no es ejecutable**.)_

> **Cómo se lee esta tabla.** `medido` significa que la consulta está al lado y se ejecutó al
> escribir esto. `reportado` significa que lo afirma Sam o un brief, con quién y cuándo.
> **`SIN CONTENIDO` significa exactamente eso: el identificador existe y su encargo no está escrito
> en ninguna parte.** No es una tarea pequeña ni una tarea olvidada: es una tarea que **nadie puede
> ejecutar**, y se nombra así para que no vuelva a circular como si estuviera definida.

| ID | Estado | Qué es | Evidencia |
|---|---|---|---|
| **N05A** | 🟡 abierto, **corregido antes de ejecutarse** | Retirar `approval_calibration_piece_id_key`. Su **tercer tiempo** decía `DROP CONSTRAINT` y **fallaría**: es un **`UNIQUE INDEX`**, se retira con **`DROP INDEX`** | **medido** 2026-09-10 |
| **N07** | 🟡 **abierto** _(2026-09-12: deja de ser `SIN CONTENIDO`)_ | El rótulo del juez: `CONTEXTO —` y su guardián. Vive en `content-watcher` | definido en la sesión F.B del 2026-09-10 |
| **N08** | 🟡 **abierto** _(2026-09-12: deja de ser `SIN CONTENIDO`)_ | Reescritura de las piezas con veredicto de Sam. **22 filas `fixable` vivas**, agrupadas en el bloque del 2026-09-12-v2 | **medido** 2026-09-12 |
| **N10** | 🔴 **abierto y EMPEORA solo** | La fuga del drenaje. Detalle completo abajo. **2026-09-12: dos franjas más entran por el promotor** — ver el bloque `v2026-09-12-v2` §A | **medido** 2026-09-12 |
| **N13** | 🟢 **CERRADO 2026-09-12**, con un defecto propio abierto | El promotor de blogs. `blog-promoter` v1.1 vivo, cron `jobid 99`. **No sella la franja en `YA_PUBLICADA`** | **medido** 2026-09-12 |
| **N14** | 🟢 **su premisa NO se reproduce** | «el secreto sigue en claro en los dos `cron.job.command`». **Medido: no lo está en ninguno** | **medido** 2026-09-10 |
| **N15** | 🟡 abierto, **y este Actualiza lo abarata** | El tope de caracteres viaja al escritor en `builder_input` | **medido** — el dato ya existe |
| **N16** | 🔴 **ALTA 2026-09-12** | Por qué el reservador no toma las piezas `scheduled` sin franja. **24 piezas sin franja contra 43 franjas libres futuras** | **medido** 2026-09-12 |

> ⛔ **CORRECCIÓN 2026-09-12 — qué decían estas filas antes, y por qué cambian.**
> **La tabla de arriba se actualizó en sitio; lo que decía se conserva acá** (`CC_PROTOCOL.md` §0).
>
> - **`N07`, `N08` y `N13` decían, las tres, `⬛ SIN CONTENIDO` — «nombrado por Sam; sin definición en
>   ningún archivo».** Dejaron de estarlo **el 2026-09-10**, cuando se definieron en la sesión F.B, y
>   **nadie lo llevó al archivo**: la tabla siguió declarando irresoluble algo que ya tenía encargo.
>   Es el defecto que esta misma sección existe para impedir, aplicado a sí misma.
> - **`N13` además está CERRADO**: `blog-promoter` v1.1 corre en producción desde las **17:53 UTC**
>   del 2026-09-12. **Y abre un defecto propio**, que es hoy lo urgente de la serie: su rama
>   `YA_PUBLICADA` **no sella la franja**, y por eso **dos franjas vuelven a alimentar N10**. El
>   detalle, con las dos franjas nombradas por su identificador y el parche propuesto, está en el
>   bloque `CIERRE 2026-09-12-v2` §A.
> - **`N16` no existía en ningún archivo** [medido el 2026-09-12: `grep -rn "N16"` sobre los `.md` y
>   `.json` versionados → **cero apariciones**]. Se da de alta con su estado medido, que es **peor**
>   que el que reportaba el brief (13 piezas y 45 franjas): son **24 y 43**.
> - **`N05A` no cambia de estado, pero gana consecuencia:** su `UNIQUE INDEX` es **por qué «11
>   fixables cerradas» no tiene representación en la base**. Cerrar N05A es la condición para que N08
>   se pueda medir.

---

### 🔴 N10 — la fuga del drenaje. Es lo único que empeora solo mientras nadie mira

**Repo:** `unrealvillestudio-hub/unrlvl-iid-functions`.

**La causa raíz, con su consulta** [medido el 2026-09-10 con `pg_get_functiondef`]:

```sql
CREATE OR REPLACE FUNCTION intel.drain_due_slots(p_limit integer) ... AS $function$
  SELECT s.id, s.brand_id, s.platform_key, s.slot_at, s.piece_id
    FROM intel.brand_publish_slots s
   WHERE s.status = 'reserved' AND s.slot_at <= now() AND s.piece_id IS NOT NULL
   ORDER BY s.slot_at ASC
   LIMIT GREATEST(0, COALESCE(p_limit, 0)) FOR UPDATE SKIP LOCKED
$function$
```

**No hay filtro de proveedor.** Y una franja de canal **no drenable** nunca alcanza estado terminal
—`PROVIDER_NOT_DRAINABLE` deja la franja **INTACTA** a propósito, y es correcto por diseño—, así que
el RPC **la vuelve a seleccionar cada quince minutos**. Como el orden es `slot_at ASC` y las
atascadas son las **más viejas**, ocupan **la cabeza de la cola** en cada pasada.

**El estado medido hoy** [2026-09-10]:

| Qué | Valor |
|---|---|
| Filas `PROVIDER_NOT_DRAINABLE` acumuladas | **544** (Sam midió **532** horas antes: **crece**) |
| Franjas vencidas y reservadas sin resolver | **4** |
| Lo que devuelve `intel.drain_due_slots(200)` | **4** — las mismas |
| `DRAIN_SAFETY_CEILING` en `content-scheduler` | **50** |

**Las cuatro atascadas son EXACTAMENTE de proveedor no drenable** [medido, con su `provider`]:

| Marca · canal | `provider` | Vencida desde |
|---|---|---|
| LucienSael · `x` | `x_api` | **2026-09-08 13:00 UTC** |
| LucienSael · `blog` | `vercel_html` | **2026-09-08 14:00 UTC** |
| LucienSael · `tiktok` | `tiktok_business` | 2026-09-10 00:00 UTC |
| ForumPHs · `blog_forumphs` | `vercel_html` | 2026-09-10 15:00 UTC |

**Las dos primeras llevan más de dos días en la cabeza de la cola.**

> 🔴 **Por qué esto es lo urgente y no una molestia de registro.** Hoy son **4 contra un techo de
> 50**: la publicación **todavía no se ha detenido**. Pero las atascadas **sólo se acumulan** —nada
> las saca— y **cuando lleguen a 50 la publicación se detiene SIN UN SOLO ERROR**: el drenaje
> devolverá su techo lleno de franjas que no puede publicar, y ninguna franja publicable entrará en
> la ventana. **No hay alerta que salte, porque nada falla.** Es la peor forma de un fallo: el
> sistema informa que trabajó.

**Los tres cambios, en orden** [reportado — Sam, 2026-09-10]:

1. **El RPC salta lo no drenable** — el filtro de proveedor entra en `intel.drain_due_slots`.
2. **`publish-slot-reserver` no reserva donde no hay proveedor** — deja de crear el problema.
3. **Las atascadas se sacan a mano, una vez** — nacieron antes del arreglo y ninguno de los dos
   cambios anteriores las alcanza.

**Orden y motivo:** el 1 y el 2 son **código y DDL**; el 3 es **una escritura en producción sobre
franjas concretas** y, por `DELIVERY_AND_VERIFICATION_RULE` §2.3-ter, **se declara y se decide
aparte**, con las cuatro franjas nombradas por su identificador. **No se ejecuta el 3 antes que el
1**: sacarlas a mano con el RPC todavía sin filtro las deja volver.

---

### 🟢 N14 — la premisa no se reproduce, y por eso NO se toca

**Lo declarado:** «el secreto está rotado pero **sigue en claro en los dos `cron.job.command`**».

**Lo medido el 2026-09-10**, con el volcado **redactado** (la regla de secretos de `CLAUDE.md` se
respeta: no se transcribe ningún valor, sólo se afirma su ausencia):

| jobid | Trabajo | JWT en claro | Secreto en claro | Lee de Vault |
|---|---|---|---|---|
| **66** | `content-placement-poll` | **no** | **no** | no lo necesita |
| **79** | `publish-slot-reserver-daily` | **no** | **no** | **sí** |

- **El jobid 66 no lleva ningún secreto**: su comando entero es
  `SELECT intel.trigger_iid_agent('content-scheduler', '{"mode":"placement"}'::jsonb);` — **83
  caracteres**, una llamada a una función de la propia base. **Nunca tuvo uno que rotar.**
- **El jobid 79 ya lee de Vault**:
  `(SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'slot_reserver_secret')`.
  **Es la migración que `ecosystem.json` ya declaraba hecha el 2026-09-06**, y sigue hecha.

**Conclusión, y es la que ahorra el trabajo:** **no hay nada que migrar a Vault en `cron.job`.** El
patrón que N14 viene a cerrar **ya está cerrado ahí**. Si queda un secreto en claro en otro sitio
—`intel.iid_scheduler_config` lo tuvo—, **ese es otro encargo y necesita su propia medición**: N14,
tal como está enunciado, **está satisfecho**.

---

### 🟡 N15 — el tope va al escritor, y el hallazgo de hoy lo abarata

**La decisión de Sam, y es la correcta:** **el límite se le da al escritor, no se bloquea al final.**
Viaja en `builder_input` desde el registro de tipos, igual que `max_tokens`, y **es dato por canal**
—nunca constante—. La regla del Watcher es **la red, no la puerta**: verifica, y **si salta a menudo
significa que el techo no está llegando**.

**Lo que este Actualiza le ahorra a N15** [medido el 2026-09-10]: el tope **ya vive en el dato**, en
`public.platform_configs.char_limit`, sembrado y correcto —`meta_ig` **2.200**, `x` **280**—. Así que
**N15 no es crear el dato: es ENRUTAR uno que ya existe** hasta `builder_input`. Es una tarea
notablemente más pequeña de lo que parecía.

> 🔴 **Y hay una contradicción que N15 tiene que resolver, porque hoy nadie la concilia**
> [medido]: `content_type_registry.max_tokens` da **900 tokens** (≈3.600 caracteres) para `x`,
> cuyo `char_limit` es **280**. **Al escritor se le autoriza unas trece veces lo que el canal
> acepta**, en dos tablas distintas y en dos unidades distintas. Mientras eso siga así, la red del
> Watcher va a saltar **siempre** en `x` — que es precisamente la señal que Sam describe: *«si salta
> a menudo, el techo no está llegando»*.

**La división de trabajo queda declarada:** **la puerta es el escritor (N15); la red es el drenaje
(`unrlvl-iid-functions` PR #141).** No compiten y no se sustituyen: la puerta evita producir lo que
no cabe, la red evita publicarlo si se produjo igual.

---

### ⬛ N07 · N08 · N13 — nombrados y sin definición

**No están escritos en ningún archivo del repo** [medido el 2026-09-10: barrido sobre los 161
`.md`/`.json` versionados → cero apariciones de `N07`, `N08` y `N13` fuera de esta tabla].

**Qué se hace con ellos, y es una regla, no una queja:** un encargo que los nombre **se detiene y se
reporta**, exactamente como un `str_replace` que no matchea (`CC_PROTOCOL.md` §0) o un brief sin el
test de la marca N+1 (`MULTIBRAND_RULE` §7.2). **No se deducen del contexto ni se reconstruyen de
memoria**, porque un encargo reconstruido de memoria es indistinguible de uno inventado.

**Para cerrarlos hace falta, de Sam, lo mínimo de cada uno:** qué hace, **en qué repo vive**, y qué
lo da por terminado.

---
---

_Actualizada: 2026-09-09 · v2026-09-08-v2 (**HRD_ACTUALIZA 2026-09-08 — LA PUBLICACIÓN DEJA DE SER UNA PROMESA, Y EL PATRÓN RAÍZ TIENE NOMBRE: EL ESCALÓN EQUIVOCADO.** Sesión del 2026-09-07/08, ejecutada por CC el **2026-09-09**. **La primera pieza publicada sola por el ecosistema**: `LucienSael` / `meta_fb`, `platform_post_id` **`1076134175585218_122118274185298889`**, `published_at` **2026-09-08 15:15:14 UTC** [medido en `intel.brand_publish_drain_log`]. Para llegar ahí hubo que tirar **tres muros encadenados** —alias `social-lab-flame` muerto en el respaldo · guarda anti-doble-publicación contando filas terminales como vivas · SocialLab leyendo con clave anónima sin `SELECT`— y cada uno **tapaba al siguiente** (PR **#136**; SocialLab PR **#4**; barredor PR **#137**, `ezbr_sha256` **`08173f9a…0a2e7e5b`** [medido]). **Cerrado además:** tokens de composición de NeuroneSCF remapeados —**42 de 42 piezas de la marca compuestas** [medido]— · catálogo de oferta al escritor, `intel.brand_topics.offer_selector` **sembrado en 8 filas de una marca** [medido] · `HR-GEN-11`, `-12` y `-13` activas, `warn`, `brand_id = NULL` → **54 reglas activas de 69** [medido] · `visual_directive` **en 3 de 52 dominios** [medido] · wordmark y favicon de ForumPHs en el blog (`forumphs-com` PR **#10**). **Gobernanza:** `protocols/MEASUREMENT_METHOD_RULE.md` creado (#82) y corregido el mismo día (#83) cuando se midió que la cabecera `x-deny-reason` **no existe** — una regla que manda leer algo que nadie emite no se puede cumplir. **CUATRO CIFRAS DEL BRIEF CORREGIDAS POR MEDICIÓN, y una de ellas es urgente:** (1) la fuga de N10 **no está en 76 filas: está en 134**, y **24 de ellas cayeron en las últimas tres horas** sobre **sólo 2 franjas** [medido `now()` 2026-09-09 06:12 UTC] — sigue viva mientras se escribe esto; (2) `content_pieces.post_url` de la pieza publicada está **en `NULL`**: el identificador vive en el log de drenaje y **no en la pieza**; (3) `approval_calibration_piece_id_key` **no es una constraint sino un UNIQUE INDEX** —`DROP CONSTRAINT` fallaría—; (4) el hueco de costos del ledger **no se reproduce**: **4.791 registros, cero sin costo y cero sin modelo**, con 690 a costo cero y 132 sin `rate_source` [medido]. **Abre, con orden:** N05A (el veredicto deja de sellar) · N12 cambio 2 (**#138**, mergea DESPUÉS de la publicación del 09-09 16:00 UTC) · N12 cambio 3 · **N10, que es lo urgente** · N07 · N13 · N08 congelado · y la rotación del secreto de barrido, hecha por Sam, con la revisión de `cron.job.command` pendiente.)_

> ⛔ **CORRECCIÓN POSTERIOR — 2026-09-10, aplicada al integrar este bloque con `main`.**
> **La cabecera de arriba se conserva ÍNTEGRA y no se reescribe** (`CC_PROTOCOL.md` §0). Lo que
> sigue corrige **dos de sus cuatro cifras** y actualiza una tercera. La cuarta —el `UNIQUE INDEX`—
> **era correcta y se confirma**: 0 en `pg_constraint`, 1 en `pg_indexes` [medido 2026-09-10].
>
> **1 · El `platform_post_id` citado es el del INTENTO, no el de la publicación viva.**
> `1076134175585218_122118274185298889` sale de `intel.brand_publish_drain_log`, que registra
> **intentos**. La fila viva está en `public.scheduled_posts` con
> **`1076134175585218_122118277401298889`**, `published` a las **16:31:33 UTC** — **1 h 16 min
> después** [medido 2026-09-10]. **El primero corresponde a un post que ya no existe en la red**
> [reportado — Sam, 2026-09-10: lo borró él]. La fila del `drain_log` dice `PUBLISHED` y **no hay
> nada en ella que delate que su identificador caducó**. La regla que sale de aquí —**`drain_log`
> registra intentos, `scheduled_posts` registra el estado final, y manda `scheduled_posts`**— vive
> en `CAPABILITIES.md` desde la v1.14. Lo demás del punto (2) **se sostiene**: `content_pieces`
> **sí** tiene columna `post_url` y estaba en `NULL` — y ese `NULL` era justamente la pista.
>
> **2 · El hueco de costos SÍ se reproduce. La consulta preguntó por `NULL` y la tabla tiene CEROS.**
> «4.791 registros, cero sin costo y cero sin modelo» es correcto **sólo si se mide `IS NULL`**.
> Medido el 2026-09-10 sobre `public.ops_generation_ledger`: **`cost_usd` NUNCA es `NULL` — 0 nulos
> y 704 CEROS**, sobre **4.878** registros; desde el 2026-08-25, **433 de 1.875**. **El frente está
> abierto y creciendo**, no cerrado. Es la misma familia de defecto que este archivo ya registró el
> 2026-09-08 —«0 filas» y «no existe» no son el mismo estado—: **`NULL` y `0` tampoco lo son.**
>
> **3 · N10 ya no está en 134: está en 544** [medido 2026-09-10], y **su causa raíz está confirmada
> y escrita** en la sección `SERIE N` de este mismo archivo: `intel.drain_due_slots` **no filtra por
> proveedor**. Las **4** franjas atascadas son **exactamente** de proveedor no drenable, y dos llevan
> **desde el 2026-09-08** en la cabeza de la cola. La cifra de la cabecera **era correcta cuando se
> midió**; se actualiza porque el frente sigue vivo, que es justo lo que aquella medición anunciaba.

> **Cabecera anterior (`v2026-09-08-v1`) conservada íntegra e inmediatamente debajo.** Esta versión
> es **`-v2`** y no `-v1` como pedía el brief: `v2026-09-08-v1` **ya existe** —la creó el PR **#81**
> el mismo 2026-09-08— y reutilizar el identificador habría sustituido una versión en lugar de
> añadir otra. La numeración avanza; la fecha de sesión se respeta.
>
> **Y una constancia que no es de esta sesión, para que no se pierda:** el PR #81 **reemplazó** la
> cabecera `v2026-09-06-v1` en vez de conservarla debajo, y ese texto **no está hoy ni en este
> archivo ni en `historical_AGENDA.md`** [medido: `grep` → 0 coincidencias en ambos]. Vive sólo en
> el historial de git. **CC no lo restaura por iniciativa propia** —queda como decisión de Sam—,
> pero lo deja escrito, porque una cabecera perdida en silencio es exactamente lo que §0 existe
> para impedir.

_Actualizada: 2026-09-08 · v2026-09-08-v1 (**HRD_ACTUALIZA 2026-09-08 — DOS ENTREGAS DE INFRAESTRUCTURA EN PRODUCCIÓN, Y TRES AFIRMACIONES CORREGIDAS POR MEDICIÓN.** Auto-respuesta de correo entrante (`unrlvl-mail-worker`, PR #1 y #2) con `public.inbound_autoresponder_config` **2 filas** —`info@` y `admin@forumphs.com`, misma redacción copiada, no reescrita— y ruta `/bim` con token (`forumphs-com`, PR #8 y #9) con `public.collateral_links` **2 filas** y bucket privado `collateral` [todo medido]. **El hueco que nadie habría notado:** los privilegios por defecto de `public` son `{service_role=r/postgres}` —SELECT y nada más—, faltaba **UPDATE**, y como el registro de apertura está atrapado en un `catch` a propósito, **el documento se servía bien y `open_count` se quedaba en 0**. Lo delató `edge_logs`, no la tabla. **Tres afirmaciones del brief corregidas por medición:** las tablas del carril financiero viven en el esquema **`fph`**, no `public`; **`mora_mensual` NO EXISTE**; y `eeff_preliminar` e `informes` —citadas como las que referencian `bank_reconciliations`— **tampoco**. «0 filas» y «no existe» no son el mismo estado. **Gobernanza:** `CC_PROTOCOL.md` **v10** —un PostgreSQL desechable no valida roles ni RLS de Supabase—, `DELIVERY_AND_VERIFICATION_RULE.md` **v1.4** —un error atrapado a propósito necesita su propia vía de verificación— y `SESSION_PROTOCOL.md` **Paso 3-bis** —BluePrints se consulta antes de producir un asset de marca—. **Comercial:** prospecto P.H. Plaza 77 (59 apartamentos y 1 local) y el **Sales-Kit** estrena pieza estándar. **Abre:** el `UPDATE` de `contact_email` y wordmark · el acuse desde `admin@` sin probar · la jurisdicción del NDA · la verificación legal de la Cláusula Sexta · el vFINAL de marca en los documentos del proyecto · y el informe sin panel de siguiente paso.)_

---

## 🗓️ HRD_ACTUALIZA 2026-09-08 — La publicación deja de ser una promesa, y el patrón raíz tiene nombre

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-09-08).)_

> **Sesión del 2026-09-07/08. Brief emitido por Claude.ai el 2026-09-08; ejecutado por CC el
> 2026-09-09.** Todo lo etiquetado `medido` se consultó con `execute_sql` **al escribir este
> bloque** (`HRD-R13`), no se copió del brief. Professor cerrado antes: **15 learnings**,
> `checkpoint_number = 15`, `session_date = 2026-09-08`, los quince con `approved_by_sam = true`
> [medido — `public.professor_learnings`, consultado el 2026-09-09]. **SMA no se consultó.**
>
> **Donde el brief y la medición discrepan, manda la medición y se dice cuál era lo declarado.**
> Este bloque corrige **cuatro** cifras del brief. Van marcadas en su sitio, no en una nota al pie.

### ✅ Cerrado en esta sesión

- ✅ **N09 — la publicación restaurada, y son tres muros encadenados.** En orden, y cada uno tapaba
  al siguiente: (1) el alias `social-lab-flame` **muerto en el respaldo**, (2) la guarda
  anti-doble-publicación **contando filas terminales como vivas**, (3) SocialLab **leyendo con clave
  anónima sin `SELECT`**. **PR #136.** Que fueran tres y no uno es el hallazgo: un muro solo se ve
  cuando cae el anterior.
- ✅ **La primera publicación automática del ecosistema.** `LucienSael` / `meta_fb`,
  `platform_post_id` **`1076134175585218_122118274185298889`**, `published_at`
  **2026-09-08 15:15:14 UTC** [medido — `intel.brand_publish_drain_log`, `outcome = PUBLISHED`,
  una fila]. **⚠️ Corrección al brief:** el brief citaba un `post_id` «terminado en `…401298889`».
  El medido termina en **`…185298889`**. El identificador correcto es el de arriba, entero.
- ✅ **N11 — la rama de Facebook pasa a `fb_publish_photo`**, lee `post_id` en vez de `id`, y
  `sbGet` **deja de tragarse el error**. SocialLab **PR #4**.
- ✅ **N01 — tokens de composición de NeuroneSCF remapeados a sus roles propios.** Medido el
  2026-09-09: **42 de 42 piezas de NeuroneSCF llevan composición**, y **123 de 146 en todo el
  carril** [criterio de la consulta: `assets::text ILIKE '%composed%'`]. El brief declaraba **35**
  piezas compuestas y **32** recompuestas; la cifra creció entre el brief y la ejecución.
- ✅ **N02 — catálogo de oferta al escritor.** DDL, carril y CopyLab **#39**.
  `intel.brand_topics.offer_selector` (`jsonb`) existe y está **sembrado en 8 filas, de una sola
  marca**; `public.content_type_registry.offer_catalog_max_items` (`smallint`) existe [medido].
- ✅ **N03 — tres reglas nuevas: `HR-GEN-11` (firma) · `HR-GEN-12` (tercero por categoría) ·
  `HR-GEN-13` (oferta presente).** Las tres `active`, `severity = warn` y **`brand_id = NULL`**, que
  es lo que las hace del sistema y no de una marca. Total: **54 activas de 69** [medido —
  `intel.watcher_rules`].
- ✅ **N06 — `visual_directive` por dominio y cláusula de sujetos distintos.** **3 de 52 dominios**
  sembrados, sobre 4 marcas en la tabla [medido].
- ✅ **N12 cambio 1 — el barredor comprueba referencias.** **PR #137**, desplegado:
  `storage-orphan-sweep` **v21**, `ezbr_sha256`
  **`08173f9aa525afc242d998ab45caa7196c0bdcc96c0c6e5c99d297410a2e7e5b`**, `updated_at`
  **2026-09-08 21:51:49 UTC** [medido]. **Los dos cron llevan ya su `guard`**: jobid **35**
  `iid-expert-orphan-sweep` (`0 * * * *`) y jobid **36** `unrlvl-media-temp-cleanup` (`0 3 * * *`),
  los dos activos [medido — `cron.job`].
- ✅ **Gobernanza — `protocols/MEASUREMENT_METHOD_RULE.md`.** Creado (**#82**) con su puntero
  (**#139**) y **corregido el mismo día** (**#83** + **#140**) al medirse que la cabecera
  `x-deny-reason` **no existe en este entorno**. El motivo se lee en
  `$HTTPS_PROXY/__agentproxy/status` → `recentRelayFailures`.
- ✅ **Quickwin — wordmark y favicon de ForumPHs en el blog.** `forumphs-com` **PR #10**,
  `verify-bim` **52/52**.

### 🔴 Abierto, y con orden

1. 🔴 **N05A — el veredicto deja de sellar.** Diseño final: **tres columnas nullables**
   `route_state`, `route_reentry_stage` y `route_budget_spent`, con `content.content_pieces.status`
   **intacto**. Presupuesto de **dos pasadas**; al agotarlo, **desvío humano → descarte, desvío
   automático → bandeja de Sam marcada**. **Ninguna de las tres columnas existe todavía** [medido —
   `information_schema.columns`, cero coincidencias en todos los esquemas]: el diseño está
   decidido, no aplicado.
   **⚠️ Corrección al brief:** el bloqueante conocido `approval_calibration_piece_id_key` **no es
   una constraint: es un `UNIQUE INDEX`** sobre `intel.approval_calibration (piece_id)` [medido —
   `pg_indexes`; `pg_constraint` sólo devuelve `_pkey` y `_verdict_check`]. Se retira con
   **`DROP INDEX`**, no con `ALTER TABLE … DROP CONSTRAINT`, que fallaría. Sigue siendo un **tercer
   tiempo**, después del código.
2. 🔴 **N12 cambio 2 — `#138`, promoción al aprobar. MERGEA DESPUÉS de la publicación del 09-09
   16:00 UTC.** La condición de tiempo es del brief y se conserva literal.
3. 🔴 **N12 cambio 3 — el publicador lee la ruta vigente de la pieza**, no la copia congelada de
   `public.scheduled_posts`.
4. 🚨 **N10 — franjas no drenables atascadas. ES LO URGENTE, y creció.** Medido el 2026-09-09 a las
   **06:12 UTC**: `intel.brand_publish_drain_log` tiene **134 filas `PROVIDER_NOT_DRAINABLE`**
   —el brief declaraba **76**—, desde **2026-09-08 13:00:34 UTC** hasta **2026-09-09 06:00:04
   UTC**, y **24 de ellas en las últimas tres horas**. Y el dato que el brief no traía: son **sólo
   2 franjas distintas** las que las producen todas. Con `DRAIN_SAFETY_CEILING = 50` y orden
   `slot_at ASC`, esas dos ocupan la cabeza de la cola indefinidamente. **La fuga sigue viva
   mientras se escribe esto.**
5. 🔴 **N07 — prefijo `CONTEXTO —` y guardián de rótulos contra la tabla viva**, no contra una lista
   copiada.
6. 🔴 **N13 — drenaje `vercel_html`.** Medido en el brief: el sitio ya lee `content.content_pieces`
   con `status = 'published'` y `discarded_at IS NULL`; **la pieza ES el post**, así que publicar
   es sellar dos campos. Decidido: sella directo con desenlace propio, **no publica si el archivo
   referenciado no existe**, y va **después** del cambio 3.
   **Dato nuevo que este frente hereda:** la pieza ya publicada tiene **`post_url` en `NULL`**
   [medido]. El identificador de la publicación vive **en el log de drenaje y no en la pieza**, así
   que hoy `content_pieces` no basta para saber dónde salió lo que salió.
7. 🧊 **N08 — reescritura de las piezas del carril viejo. CONGELADO** hasta que exista el reparto
   humano/automático del descarte.
8. 🟡 **N14 — rotación del secreto de barrido. Hecha por Sam.** Queda pendiente revisar que ningún
   secreto viva en claro en `cron.job.command`.

### 📌 Frentes anotados, sin abrir

- **`title_budget_chars` — sigue en cero.** **0 de 146 piezas** lo llevan en `assets` [medido; el
  brief decía 0 de **126**: el cero se mantiene, el denominador creció]. **No existe como columna
  en ningún esquema** [medido]. Tres casos de `OVERLAY_TEXT_OVERFLOW` en un solo día.
- **EN/ES cruzado** y **límite de caracteres por canal**, los dos en el adaptador de SocialLab.
- **`public.brand_assets` vacía** — **0 filas** [medido], para las siete marcas de `BluePrints`.
- **El `vFINAL` de ForumPHs** como sistema de diseño completo viviendo de archivo suelto: mismo
  patrón que la tabla vacía.
- **⚠️ Costos — la cifra del brief no se reproduce.** El brief declaraba **286 de 1.563 registros
  del ledger sin costo o sin modelo**. Medido el 2026-09-09 sobre `public.ops_generation_ledger`:
  **4.791 registros, `cost_usd IS NULL` = 0 y `model_id IS NULL` = 0**. Lo que sí sale: **690
  registros a costo cero**, **132 sin `rate_source`** y **293 de proveedor `google`** —Google Cloud
  sigue sin mapear—. El frente no se cierra: **se reformula sobre lo que la base contesta hoy**.

### 🧩 El patrón raíz de la sesión: el escalón equivocado

Cinco formas del mismo error en dos días: se arregla el escalón que se ve y no el que falla. El
alias muerto, la guarda que contaba terminales como vivas, la clave anónima sin `SELECT`, el `id`
en vez del `post_id`, y el `sbGet` que se tragaba el error. **Un fallo no puede parecerse a un
resultado** — es la misma frase que cierra `protocols/MEASUREMENT_METHOD_RULE.md`, y no es
coincidencia: el instrumento es parte del sistema.

---

## 🗓️ HRD_ACTUALIZA 2026-09-08 — Dos entregas en producción, y la diferencia entre «0 filas» y «no existe»

_(Bloque al tope. Detalle en `brands/ForumPHs/session_log.md` (2026-09-08).)_

> **Todo lo etiquetado `medido` se consultó con `execute_sql` al escribir este bloque** (`HRD-R13`).
> Professor cerrado antes: **19 learnings**, `checkpoint_number = 14`, los diecinueve aprobados,
> cinco con prefijo `SALES-KIT` [medido]. **SMA no se consultó.**

### ✅ Cerrado hoy

- ✅ **Auto-respuesta de correo entrante en producción** — PR **#1** y **#2** de `unrlvl-mail-worker`.
  `public.inbound_autoresponder_config` con **2 filas** [medido]. El Worker resuelve por
  `recipient_address` y **no lleva ninguna dirección literal** en `src/` [medido: `grep` → cero].
- ✅ **Ruta `/bim` con token en producción** — PR **#8** y **#9** de `forumphs-com`.
  `public.collateral_links` **2 filas**, bucket **privado** `collateral` [medido].
- ✅ **#80 cerrado por dato** — Lefevre y Plaza España traen `Date` y `Date Due`, cobertura 100 %.
- ✅ **Sales-Kit estrena pieza estándar** — `brands/ForumPHs/sales-kit/email_respuesta_prospecto.md`.

### 🔴 Abre, y son de Sam

- 🔴 **`UPDATE` sobre `intel.brand_publish_channels` sin aplicar** — `config.contact_email`
  (`admin@forumphs.com`) y el `wordmark` de tres partes. Sin él, las páginas de aviso de `/bim`
  salen sin marca y sin línea de contacto. **No rompe nada; sólo no se ve.**
- 🔴 **El acuse desde `admin@` no está probado.** Se probó con `info@`. La fila y la regla de
  enrutamiento están hechas; falta el envío de prueba.
- 🔴 **NDA — Cláusula Décima Primera:** sigue con `[JURISDICCIÓN O CLÁUSULA ARBITRAL A DEFINIR]`.
  **Es decisión de política de la firma, una vez para todos los clientes**, no por cliente.
- 🔴 **NDA — Cláusula Sexta:** la **Ley 81 de 2019** y el **Decreto Ejecutivo 285 de 2021** están
  citados y **pendientes de confirmación por la asesoría legal**.
- 🔴 **`ForumPHs_Amatista_Carbon_vFINAL.html` debe reemplazar al `v2`** en los documentos del
  proyecto. Mientras no se haga, se sigue construyendo sobre la versión equivocada — ya pasó
  (`SESSION_PROTOCOL.md` Paso 3-bis).
- 🔴 **Sales-Kit: el informe no cierra con panel de siguiente paso.** El correo depende de que el
  prospecto **vuelva a la bandeja** tras abrir el enlace. **Encargo aparte**: tocar el documento,
  reprocesarlo con `vendor-collateral.mjs` y resubirlo. **No cambia el enlace ni la fila.**
- 🟡 **Favicon en pestaña real** — `curl -I https://forumphs.com/favicon.ico`. Cerrado por Sam en
  producción; **confirmar en el log**.
- 🟡 **Carril financiero, 0.C sigue abierta.** Parser especificado, **diseño de tablas congelado** a
  la espera de datos de la nueva contaduría. **`payments` no tiene fuente** desde el Aged
  Receivables: depende del segundo reporte solicitado.
- ⏰ **1-oct-2026:** la ventana de 24 h de WhatsApp **pasa a facturable**. Afecta al coste por
  conversación del agente de propietarios, no a su diseño.

---

## 🗓️ HRD_ACTUALIZA 2026-09-06 — BRIEF-05 cerrado: el ecosistema empieza a tener hora

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-09-06).)_

> **Todo lo etiquetado `medido` se consultó con `execute_sql` al escribir este bloque** (`HRD-R13`), no
> se copió del brief. **Donde el brief y la medición discrepan, manda la medición y se dice cuál era lo
> declarado.**

### ✅ Cerrado hoy, y verificado contra la base

- ✅ **BRIEF-05 completo — siete PR, y el carril publica solo.** PR-A (`20260902180000`) el dato del
  tiempo · **#115** (`20260902200000`) huso IANA y nunca desfase · **#119** (`20260903130000`)
  correctiva de `HR-GEN-10` · PR-B (`20260903150000`) el reservador y la EF `publish-slot-reserver` ·
  **#121** (`20260905120000`) el `REVOKE` de PR-B · PR-C (`Orchestrator` **#33**) la fecha visible en
  las dos bandejas · PR-D (`20260905140000`) el drenaje.
- ✅ **La verificación se hizo contra el esquema, no contra el ledger.**
  `supabase_migrations.schema_migrations` tiene **194 filas y su última versión es `20260816224730`**
  [medido]: **ninguna** de las siete figura ahí, porque se aplicaron con `execute_sql`. Preguntarle al
  registro habría devuelto **«no aplicada» sobre siete migraciones que sí lo están**.
- ✅ **El `CHECK` de #115 rechaza el desfase por tres vías** [medido con `pg_get_constraintdef`]:
  `!~ '[+]'` · `!~ '-[0-9]'` · `~ '[A-Za-z]'`. Cae `-05:00`, cae `+04:00`, cae `UTC-5` y **cae
  `Etc/GMT±N`**, que era el caso peligroso: es IANA legítima **con el signo invertido** (`Etc/GMT+5`
  **es** UTC−5) y por eso **parece correcta**.
- ✅ **`HR-GEN-10` existe y es vigente** —`active`, `severity = warn`, **`brand_id = NULL`**— [medido].
  El `NULL` es lo que la hace regla del sistema y no de una marca. **#117 quedó mergeada, pineada y
  NUNCA aplicada** por dos defectos [reportado — brief]; lo que corre es **#119**.
- ✅ **El drenaje no está abierto a `PUBLIC`.** ACL de `intel.drain_due_slots`: `postgres=X/postgres`
  más `service_role=X/postgres`, **sin `PUBLIC`** [medido]. Es #121 aplicado.
- ✅ **Estado del calendario, en una sola sentencia a las 00:18 UTC** [medido]: **16** canales activos
  (de 20 filas) · **16** políticas · **54 franjas — 44 libres, 10 reservadas** · **4** marcas con huso
  (de **16**) · `reservation_log` **15 filas** · `drain_log` **0 filas** · **51** reglas de watcher
  activas, **las 51 en `warn`**.
- ✅ **Husos declarados, en nombre IANA** [medido]: `ForumPHs` → `America/Panama`; `LucienSael`,
  `NeuroneSCF` y `UnrealvilleStudio` → `America/New_York`. **12 de 16 marcas siguen sin huso, y es
  correcto:** se siembra cuando la marca entra al calendario. Una marca sin huso no tiene franjas, así
  que el reservador la ignora **en vez de inventarle una hora**.
- ✅ **Dos crons vivos** [medido]: jobid **66** `content-placement-poll` `*/15 * * * *` **activo** (el
  drenaje) y jobid **79** `publish-slot-reserver-daily` `10 6 * * *` **activo** (el barrido). El
  `command` del **79 lee el secreto desde vault**, y el barrido de patrones de secreto en claro sobre
  las dos filas de `cron.job` da **cero coincidencias**. Cierra el precedente del 2026-09-02.
- ✅ **Canal nuevo y EF nueva.** `UnrealvilleStudio · tiktok` (`provider tiktok_business`) **activo**
  [medido], con política copiada de LucienSael. EF **`publish-slot-reserver` v6, ACTIVE,
  `verify_jwt: false`** [medido].
- ✅ **`assets.social.adapted` normalizado: 137 piezas como arreglo, 0 como cadena**, sobre 137 piezas
  totales [medido]. Eran **43** las serializadas como cadena [reportado — brief].
- ✅ **Credenciales rotadas.** `GH_PAT` caducó el 2026-09-03 22:10 UTC **tras tres avisos sin leer** y
  el proxy `api/gh` devolvió **401 en todas las rutas**; rotado y verificado el 2026-09-05 [reportado —
  brief]. `SLOT_RESERVER_SECRET` rotado y **guardado en vault** como `slot_reserver_secret` — que el
  jobid 79 lo lea desde vault es la parte **medida**.

### 📅 La primera publicación automática, y por qué sólo sale la mitad

**Lunes 7 de septiembre, 17:00 UTC — las 13:00 de Nueva York** [medido: la franja reservada más
temprana es `2026-09-07 17:00:00 UTC`, y ese día cae en **lunes**].

De las **10 franjas reservadas**, **sólo 5 son drenables hoy** [medido, agrupando por `provider`]:
**`meta_graph` 5** (LucienSael fb+ig, ForumPHs fb, NeuroneSCF fb+ig) · `x_api` 1 · `vercel_html` 2 ·
`tiktok_business` 2. Las cinco no drenables dan **`PROVIDER_NOT_DRAINABLE` con la franja intacta**: es
la diferencia entre un carril que se detiene y uno que **pierde el turno en silencio**.

### ⚠️ Tres cifras del brief que la medición corrige

- ⚠️ **La publicación manual fuera del carril es de 9 piezas y 4 marcas, no 3 de ForumPHs.** El brief
  declara *«3 piezas de ForumPHs —2 Facebook, 1 Instagram»*, y **esa parte es exacta** [medido]. Faltan
  **seis**: LucienSael **4**, NeuroneSCF **1**, UnrealvilleStudio **1**. Las nueve en
  `status = published` y con su `platform_post_id` [medido]. **La cuenta crecía mientras se medía** —
  tres lecturas dieron **7, 8 y 9**—, y la causa no es una lectura inestable: **la publicación estaba
  ocurriendo en ese momento** (`now()` = `00:18:29 UTC`, último `at` = `00:18:16 UTC`, **trece segundos
  antes**) [medido]. **El brief no se equivocó: fue superado por los hechos** entre que se escribió
  (primer `at` `00:01:10 UTC`) y que se ejecutó.
- ⚠️ **Las funciones `SECURITY DEFINER` alcanzables por `anon` son 11, no 10.** Las diez que el brief
  nombra están las diez; **la undécima es `intel.validate_queue_voice()`** [medido con
  `has_function_privilege('anon', oid, 'EXECUTE')`]. **Importa porque el encargo dice «una por PR»:**
  con el número mal, el encargo se declara terminado **con una función todavía expuesta**.
- ⚠️ **`ecosystem.json` declaraba 106 Edge Functions y hay 109** [medido con `list_edge_functions`]. El
  propio campo ya advertía de sí mismo —*«es un DATO consultable, no debería vivir en un context
  file»*— y vuelve a tener razón. Se corrige a 109 y **la advertencia se conserva**.

### 🔴 Abierto — lo que sale de esta sesión

- 🔴 **El escritor de `assets.social.adapted`.** Se corrigió el lector y se normalizó el dato —137
  arreglos, 0 cadenas [medido]—, pero **algo escribe ese campo como cadena**. Mientras siga así **las
  piezas nuevas nacen rotas** y ese 137/0 es una foto que caduca. **Encargo: encontrar dónde se escribe
  y hacer que escriba un arreglo.** Sin esto, la normalización es limpieza, no arreglo.
- 🔴 **Once funciones `SECURITY DEFINER` alcanzables por `anon`, y al menos cinco escriben.** En
  `intel`, `content` y `public`: `ops_log_generation`, `ops_set_cost_residual`, `ops_set_client_terms`,
  `ops_promote_rates`, `ops_resolve_rate`, `ops_compute_cost`, `rotate_sequence_current`,
  `upsert_brand_cache`, `intel.trigger_iid_agent` **en dos firmas** y **`intel.validate_queue_voice()`**
  [medido]. **Paso 0 del encargo:** establecer con `grep CREATE FUNCTION` **qué repo crea cada una**.
  **Una por PR**, para poder atribuir regresiones. La causa raíz queda escrita en `CC_PROTOCOL.md` §11.
- 🔴 **PR-E — la cola de publicación no permite copiar el texto ni descargar la imagen.** Sin eso,
  publicar a mano en TikTok, X o LinkedIn **obliga a salir de la herramienta**. Un botón de copiar y
  otro de descargar **por tarjeta**. Las **9 piezas publicadas a mano** de esta sesión son la medida del
  costo de no tenerlo.
- 🟠 **Generalizar el guardián de rótulos.** Que lea los `statement` de la tabla y compruebe que **todo
  rótulo nombrado existe en el código**. Hoy cubre **sólo `HR-GEN-10`**, y hay **51 reglas activas**
  [medido] con el mismo agujero potencial.
- 🟠 **BRIEF-06 — el regulador de entrada.** Valores **ya decididos por Sam**: cola llena = más piezas
  esperando aprobación que franjas libres futuras, con **techo duro de 25 por marca**; **tope del margen
  3, defecto 1**; alarma por **Resend** con el **nombre de variable medido, no supuesto**, y **enviada
  por la Edge Function, nunca por Claude.ai**.
- 🟠 **Blog de LucienSael por `vercel_html` — 3 piezas aprobadas sin franja.** **Requiere que Sam
  confirme repo y ruta del `_blog`.** Es el bloqueo: sin ese dato no hay dónde publicar, y `vercel_html`
  ya es uno de los proveedores no drenables de mañana.

### 🧭 Gobernanza que cambia hoy, y por dato medido

- **`protocols/DELIVERY_AND_VERIFICATION_RULE.md` → v1.3, §4.1 nueva, una adición y ninguna
  derogación.** **Cuando existe prueba directa, la indirecta no se ejecuta.** Un `INSERT` que lanza
  demuestra que **algún** constraint lanzó; leer `pg_get_constraintdef` demuestra **cuál**, y **no
  escribe en producción**. Medida hoy al verificar #115.
- **`protocols/CC_PROTOCOL.md` → v9, §11 nueva, una adición y ninguna derogación.** **Toda función
  `SECURITY DEFINER` lleva `REVOKE EXECUTE … FROM PUBLIC` antes del `GRANT`.** `CREATE FUNCTION`
  **concede a `PUBLIC` por defecto**, y un `GRANT` a `service_role` **suma, no restringe**: la función
  queda abierta **y el `GRANT` explícito da la impresión contraria**. Es la causa raíz de las once
  funciones de arriba.

### 🧭 Lo que este día enseña sobre cómo se mide

- **Una cifra sobre una tabla viva es un instante, no un estado.** Se escribe con su hora, o no se
  escribe. Una lectura que discrepa de sí misma entre dos consultas **no es un error de medición: es la
  señal de que el sistema está vivo debajo**.
- **Cuando existe prueba directa, la indirecta no se ejecuta** — y menos si la indirecta **escribe en
  producción**.
- **Un registro de migraciones sólo prueba lo que pasó por él.** Verificar «aplicada» contra un ledger
  que nunca recibió la migración devuelve **un falso negativo con toda la apariencia de un hecho**.
- **Un `GRANT` explícito puede hacer creer que hay una restricción donde sólo hay una suma.**
- **Tres avisos sin leer son un aviso mal diseñado:** el canal que avisa no es el canal que Sam mira.
- **Un encargo que se ejecuta «una por PR» depende de que el conteo sea exacto.** Con 10 declaradas y 11
  reales, el encargo se cierra **con una función todavía expuesta**.

---
_Actualizada: 2026-09-02 · v2026-09-02-v1 (**HRD_ACTUALIZA 2026-09-02 — CUATRO BRIEFS CERRADOS Y EL DATO DEL TIEMPO ENTRA AL ESQUEMA.** BRIEF-01, 02, 03 y 04 quedan **completos**: código mergeado **y** DDL aplicada, verificado con `execute_sql` al escribir. **BRIEF-05 PR-A (#114) está mergeado Y APLICADO** —`publish_timezone` en las 15 filas, las dos tablas nuevas vacías, con RLS y `GRANT` explícito a `service_role`—; **lo pendiente es la migración correctora de #115**, que el `CHECK` vigente todavía no lleva: hoy **un `-05:00` entra sin protesta**, y un desfase no es un huso. **El defecto que BRIEF-05 ataca, re-medido:** 47 crons activos, **38 de research y process y CERO de publicación**, `scheduled_posts` en 0 filas y **118 piezas**. Cuarenta relojes que dicen FABRICA y ninguno que diga PUBLICA. **Professor cerrado antes: 12 learnings, los doce `approved_by_sam = true`** [medido]. **Gobernanza que cambia por dato, no por opinión:** todo brief declara **el repo de CADA cambio** —BRIEF-04 nació con gobernanza de un solo repo cuando sus piezas vivían en tres y CC quedó bloqueado— y toda instrucción de verificación declara **si escribe en producción y sobre qué pieza** —«aprueba una y rechaza otra» en un preview escribió en la base real y selló cuatro piezas de ForumPHs—. **CC corre en su propio contenedor Linux:** el entorno de Sam no le alcanza, y `content-run-stage` (385.953 bytes) **la despliega Sam desde su terminal con `--no-verify-jwt` obligatorio**. **Abre:** aplicar la migración de #115 · declarar husos y políticas · PR-B y PR-C · `HR-GEN-10` · el eje de cortes del historial · el texto adaptado junto al maestro · `signature_closer` con **dos fuentes para el mismo dato** · BRIEF-06 · y 🔴 **dos secretos en claro en `intel.iid_scheduler_config`**.)_

---

## 🗓️ HRD_ACTUALIZA 2026-09-02 — Cuatro briefs cerrados, y el eje que faltaba desde el 27 de julio: el tiempo como dato

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-09-02).)_

> **Todo lo etiquetado `medido` se consultó con `execute_sql` al escribir este bloque** (`HRD-R13`), no
> se copió del brief. Donde el brief y la medición discrepan, **manda la medición y se dice cuál era lo
> declarado**.

### ✅ Cerrado hoy, y verificado contra la base

- ✅ **BRIEF-01 — lectura en voz alta en las tres bandejas.** `Orchestrator` **#26**. Síntesis nativa del
  navegador: sin backend, sin proveedor externo, sin costo por reproducción.
- ✅ **BRIEF-02 — historial de piezas evaluadas.** `Orchestrator` **#31**, cuarto tab de sólo lectura.
  Cierra el defecto de que una pieza calibrada **desaparecía y no podía volver a nombrarse**: el
  `piece_id` es copiable en la fila cerrada. **165 pruebas en verde.**
- ✅ **BRIEF-03 — el tercer veredicto `fixable`.** `Orchestrator` **#27**, **#28**, **#29** (DDL) y
  **#30**. **DDL aplicada:** `intel.approval_calibration.fix_proposal` existe y el `CHECK` vale
  `CHECK ((verdict = ANY (ARRAY['approved'::text, 'rejected'::text, 'fixable'::text])))`. [medido]
- ✅ **BRIEF-03 #30 — el lector sabe en qué idioma leer.** `api/_brandLanguage.ts`, cascada
  `voicelab_language` → `language_primary` → `null`. **Degradar, nunca inventar.**
- ✅ **BRIEF-04 — la imagen deja de repetir el texto de la pieza.** `unrlvl-iid-functions` **#112**
  (DDL), `CopyLab` **#38** (el escritor emite tres cadenas) y `unrlvl-iid-functions` **#113** (el carril
  transporta el modo y compone). **La siembra está aplicada:** `intel.brand_publish_channels` da
  **`dialogue` = 13 · `echo` = 6** sobre 19 filas. [medido]
- ✅ **BRIEF-05 PR-A — el dato del tiempo, aplicado.** `unrlvl-iid-functions` **#114**, mergeado 15:51
  UTC **y aplicado**: `public.brands.publish_timezone` existe con **`NULL` en las 15 filas**;
  `intel.brand_publish_policies` e `intel.brand_publish_slots` existen **vacías**, con **RLS activada** y
  **`GRANT SELECT, INSERT, UPDATE, DELETE` explícito a `service_role`** en las dos. [medido]
- ✅ **La bandeja de publicación también explica el error.** `Orchestrator` **#32**: `publishInbox.req`
  dejaba de colapsar el mensaje del server en un código de máquina. **171 pruebas en verde.**
- ✅ **MCP-SCOPE-01 — el token del MCP de correo lleva alcance de marcas.** `unrlvl-mail-mcp` **#7**:
  `403 MCP_BRAND_OUT_OF_SCOPE` **antes** de resolver credencial y de abrir conexión. `MCP_AUTH_TOKEN`
  queda como alias legacy, y **se retira en un tercer PR**. **79 pruebas en verde.**
- ✅ **Professor cerrado ANTES del Actualiza.** **12 learnings**, `session_date = 2026-09-02`, **los doce
  con `approved_by_sam = true`**. Orden cumplido: Professor → Actualiza. [medido]

### 🔴 Abierto — lo que sale de esta sesión

- 🔴 **Aplicar la migración correctora de BRIEF-05 (`unrlvl-iid-functions` #115), mergeada 21:11 UTC y
  NO aplicada.** El `CHECK` vigente en producción es
  `CHECK (((publish_timezone IS NULL) OR (length(btrim(publish_timezone)) > 0)))` [medido]: **un
  `-05:00` entra sin protesta**. `America/Panama` es UTC−5 los doce meses; `America/New_York` alterna
  entre −5 y −4, así que un `-05:00` literal para una marca de Miami **publica una hora tarde durante
  ocho meses al año sin que nada falle**. Y cae también `Etc/GMT±N`, que es IANA legítima **con el signo
  invertido** (`Etc/GMT+5` **es** UTC−5): peor que un desfase a secas **porque parece correcta**. **Dos
  sentencias, una por llamada, cada una con `DROP` y `ADD` en un solo `ALTER`.** ⚠️ **La migración
  `20260902180000` NO está pendiente: ya está aplicada. Reaplicarla revertiría esta corrección.**
- 🔴 **Declarar husos y políticas de publicación — sin esto, PR-B no tiene nada que hacer.** Las tablas
  nacen vacías **a propósito**: un huso y una franja son **dato de marca**, y no hay comportamiento
  vigente que copiar (cero filas publicadas por esta vía), así que **no existe el default honesto**.
  Husos decididos por Sam, **en nombre IANA y nunca como desfase**: `America/Panama` para **ForumPHs**;
  `America/New_York` para **NeuroneSCF**, **UnrealvilleStudio** y **LucienSael** — porque **Panamá no
  cambia la hora y Miami sí**. Se declara **después** de aplicar #115, para que el `CHECK` corregido
  proteja la siembra.
- 🔴 **BRIEF-05 PR-B (el proceso que reserva) y PR-C (la fecha visible).** PR-B valida además que el
  nombre de huso **exista** en `pg_timezone_names` —lo que un `CHECK` no puede hacer, porque es una
  vista y no es inmutable— y se niega a generar franjas para una marca cuyo huso no reconozca: **cero
  franjas y un motivo, nunca horas silenciosamente equivocadas**.
- 🟠 **`HR-GEN-10` — redactada y SIN SEMBRAR.** La guarda antirrepetición del Watcher para el modo
  diálogo queda propuesta, pendiente de la decisión de Sam sobre cómo darle un campo con las dos
  cadenas. **Se nombra como propuesta, no como regla vigente.**
- 🟠 **El eje de cortes del historial de piezas evaluadas.** BRIEF-02 **no** recalculó la generación
  contra `intel.pipeline_cutoffs`, y lo declaró: el corpus guarda la fecha del **veredicto**, no la de la
  pieza, y usar ese timestamp contra los cortes daría **otra magnitud con el mismo nombre** — peor que no
  tenerla. Hacerlo bien exige un tercer join a `content_pieces`. **Unidad aparte.**
- 🟠 **El texto adaptado junto al maestro, vía `metrics.text_source`.** El texto que publica **no** es
  `assets.copy.aife_filtered` sino `assets.social.adapted`: el maestro alimenta el artefacto de la
  bandeja, y el adaptado es lo que sale al canal — **es donde viven hashtags y firma**. Medir el maestro
  y llamarlo «la pieza» produjo hoy **un cero verdadero sobre la pregunta equivocada**, y con él dos
  afirmaciones falsas: que no había hashtags y que el contador mentía. La bandeja debe mostrar **las dos
  caras** y declarar cuál se mide.
- 🟠 **Resolver si `signature_closer` del genoma alimenta el mecanismo del `builder_meta` o compite con
  él.** Toda marca tiene firma, y para UnrealvilleStudio **vivía en ningún sitio** — por eso el escritor
  estampó un glifo inventado. Pero `assets.builder_meta.signature_closer` **ya existía** como mecanismo
  de estampado tras el `PASS` del Watcher. **Dos fuentes para el mismo dato es exactamente lo que produjo
  el defecto**, y añadir una columna sin decidir cuál manda lo reproduce con más ceremonia.
- 🟠 **BRIEF-06.** Por definir, sobre la base de que el eje del tiempo ya está en el esquema.
- 🔴 **Dos secretos en claro en `intel.iid_scheduler_config`.** Las claves son **`iid_cron_secret`** y
  **`vercel_bypass_secret`**, con el valor **en texto plano en la columna `value`** [medido — se
  consultaron las claves y la longitud, **nunca el valor**]. La propia tabla ya declara el patrón
  correcto en otra fila: `vercel_bypass_configured` dice *«`VERCEL_BYPASS_SECRET` está en Supabase
  Secrets»* — es decir, **el mismo secreto está a la vez en el sitio correcto y en claro en una tabla**.
  **Acción: rotar los dos, moverlos a Supabase Secrets y dejar en la fila sólo el indicador de
  configuración.** Mientras tanto, todo lector con `SELECT` sobre `intel` los ve.

### 🧭 Gobernanza que cambia hoy, y por dato medido

- **`protocols/DELIVERY_AND_VERIFICATION_RULE.md` → v1.2, dos reglas nuevas y ninguna derogación.**
  (a) **Todo brief declara el repo de CADA cambio**, no un repo para todo el brief: BRIEF-04 nació con
  gobernanza en singular cuando sus tres piezas vivían en `Orchestrator`, `unrlvl-iid-functions` y
  `CopyLab`, y **CC quedó bloqueado sin permiso de escritura**. (b) **Toda instrucción de verificación
  declara si escribe en producción y sobre qué pieza**: «aprueba una pieza y rechaza otra» en un preview
  de Vercel **escribió en la base real** y selló **cuatro piezas de ForumPHs**, una camino de publicarse.
- **`protocols/CC_PROTOCOL.md` → v8, §10 nueva.** **CC corre en su propio contenedor Linux:** las
  variables de entorno, las CLI y las rutas de disco de la máquina de Sam **no le alcanzan**. Y el
  despliegue de `content-run-stage` —**385.953 bytes**, que ninguna tool MCP de deploy puede recibir
  inline sin truncar— **lo lanza Sam desde su terminal**, con **`--no-verify-jwt` obligatorio**: sin la
  bandera, el deploy cambia `verify_jwt` y **rompe el cron**.
- **`CAPABILITIES.md` → v1.11.** `unrealvillestudio-hub/BluePrints` entra al catálogo, con sus dos
  advertencias como parte de la capacidad: **no es fuente para firmas**, y el `BP_BRAND` de
  **UnrealvilleStudio está desactualizado**.

### 🧭 Lo que este día enseña sobre cómo se mide

- **Una fuente canónica desactualizada es peor que una ausente, porque parece autoridad.** La ausente
  hace preguntar; la desactualizada hace afirmar. `BluePrints` tenía la respuesta y no estaba en el
  catálogo: **media sesión reconstruyendo lo que ya estaba escrito**.
- **Antes de afirmar sobre una pieza, declarar qué cara se está midiendo.** Maestro y adaptado son dos
  caras del mismo objeto. La pregunta correcta sobre la cara equivocada devuelve un cero **verdadero**.
- **Una TABLA nueva no hereda ningún privilegio; una COLUMNA nueva sobre tabla ya concedida SÍ.** Medido
  con `watcher_result` y `watcher_gate`. La formulación anterior —«en este ecosistema no se hereda en
  columnas nuevas»— **era falsa y se había afirmado sin medir**.
- **Una política de RLS sin `GRANT` falla en silencio y parece un bug de código.** `public.platform_configs`
  tenía política y **cero privilegios** para `service_role`. **Al sembrar una tabla, verificar las dos
  cosas.**
- **Una migración aplicada no se edita: se corrige con otra.** Editarla no cambia una fila de la base,
  **sólo hace que el repo deje de describir lo que hay, y en silencio**.
- **Preguntar dónde corre el proceso antes de hablar de su entorno.** CC no comparte máquina, disco ni
  variables con Sam.
_Actualizada: 2026-08-30 · v2026-08-30-v1 (**HRD_ACTUALIZA 2026-08-30 — SEIS CORTES APLICADOS EN PRODUCCIÓN, Y LA CORRIDA DE VERIFICACIÓN CIERRA PRE-JUEZ-01 QUE EL BRIEF DEJABA ABIERTO.** La corrida siguió **después** de escrito el brief, así que todo se midió al cierre y no se copió: **30 jobs, 23 piezas, 23 de 23 `clean`, cero muertas en el juez** —contra las 18 de 18 declaradas—. **El techo era el discriminador:** los 6 fallos corrieron con `max_tokens` 100/400 y los 5 re-despachados con **900 produjeron pieza los cinco**. Cerrado: FIX-LANG-01 (efecto) · FIX-AIFE-04 · #111 puntos 2 y 3 · PRE-JUEZ-01 · el idioma de `LucienSael` y `SamPublisher` · las 50 reglas en `warn`. Cancelado: **FIX-DUP-03 + PR #110** (el expediente ya lo había decidido en `e865333`) y **FIX-PATTERN-04** (era un defecto de lectura, no del sistema: los cinco `verify_pattern` están sanos). Abierto y nuevo: 🔴 **dos de cuatro marcas activas están fuera del carril por calendario**, la **traza del idioma en NULL**, **FIX-ADAPT-02 sin efecto** con su corolario de **dos resolutores del mismo eje**, y el **corte de AIFE** con su condicional por nombre de marca. Declarado y no corregido: **Professor tiene 6 learnings, no 12, y ninguno aprobado**.)_

---

## 🗓️ HRD_ACTUALIZA 2026-08-30 — Seis cortes en producción, y una corrida que cierra lo que el brief dejaba abierto

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-08-30), con la corrida en
`brands/LucienSael/session_log.md` y el cambio de idioma en `brands/SamPublisher/session_log.md`.)_

**Por qué los números difieren del brief.** El brief se escribió con la corrida **en curso** y lo
declaraba: el corte 10 quedaba *«en curso al cierre»*. **La corrida siguió**, así que todo lo de abajo
se midió contra Supabase en el momento de escribir (`HRD-R13`). Donde el medido supera al declarado, se
escribe el medido y se dice cuál era el declarado.

### ✅ Cerrado hoy, y verificado contra la base

- ✅ **Las 50 reglas activas de `intel.watcher_rules` están en `warn`** y **cero activas en
  `blocking`**; las 15 inactivas quedan intactas (14 `blocking` + 1 `warn`). Cierra **P5 ·
  SEVERITY-01**, que el 2026-08-29 medía 49 `blocking` y una sola `warn`. Firmado por Sam (`HRD-R19`).
  [medido]
- ✅ **`public.language_directives` existe y está sembrada** — 2 filas, `directive_block` de **585** y
  **422** caracteres; `register_constraints` sólo en `es` (**472**), `NULL` en `en`. [medido]
- ✅ **`public.brand_voice_genome.voice_note` poblada en 11 de 11 voces activas** (13 filas en total;
  las 2 inactivas sin nota). **FIX-AIFE-04 cerrado por dato y por efecto:**
  `assets.copy.aife_voice_note_source = 'genome'` en **23 de 23** jobs de la corrida. [medido]
- ✅ **`intel.iid_content_queue.angle_pick` poblado en 25 de 25** filas encoladas hoy, con **7 ángulos
  distintos** en rotación real. Cierra el **punto 2 de #111**. [medido]
- ✅ **`duplication.outcome` responde en 23 de 23.** Cierra el **punto 3 de #111**, contra el 12,6 %
  previo. **La ruta es `intel.watcher_log.gate_detail->'duplication'`**, no `assets.watcher` del job:
  por la ruta equivocada la consulta devuelve **cero**, y ese cero es el mismo *«cero verdadero sobre
  una pregunta falsa»* que costó una pasada el 2026-08-29. [medido]
- ✅ **`brands.language_primary` corregido:** `LucienSael` y `SamPublisher` valen **`en`**. **Dato que
  el brief no traía:** `UnrealvilleStudio` **ya valía `en`**, así que las marcas en inglés son **tres**
  de **15**, no dos. [medido]
- ✅ **FIX-LANG-01 (efecto):** `builder_meta.language = 'en'` en **23 de 23**. La corrección de la fila
  viaja por la cascada hasta el generador. [medido]

### 🟢 PRE-JUEZ-01 — CERRADO, y el brief lo dejaba «en curso»

El error de cada job nombra **el techo que aplicó**, así que la verificación no necesita interpretación:

| Tramo | `builder_meta.max_tokens` | Resultado |
|---|---|---|
| 19:30 – 21:00 UTC | **100** en `x` · **400** en `tiktok` (`max_tokens_source = voice_platform`) | **3 de 9** produjeron pieza · los 6 fallos son de este tramo, todos `COPYLAB_TRUNCATED_BODY` |
| 21:33 UTC (re-despacho) | **900** (`max_tokens_source = voice_platform`) | **5 de 5 produjeron pieza · cero truncamiento** |

**El techo era el discriminador, confirmado dentro de la misma jornada y con el resto de condiciones
iguales.** `format_instruction` en `NULL` no explicaba nada porque también lo estaba en las filas que
nunca truncan: **un rasgo que comparten los casos sanos no explica la diferencia.** [medido]

### 📊 La corrida de LucienSael, medida al cierre

| Métrica | Medido | Declarado en el brief | Base previa |
|---|---|---|---|
| Jobs · piezas | **30 · 23** | 24 · 18 | — |
| `pass_type = 'clean'` | **23 de 23 · 100 %** | 18 de 18 | 26 % |
| Extremo a extremo | **23 de 30 · 76,7 %** | 18 de 24 · 75 % | 26 % |
| blog + meta_fb + meta_ig | **15 de 15 · 100 %** | 15 de 15 | — |
| `x` + `tiktok` | **8 de 15** | 3 de 10 · 30 % | — |
| `assisted` | **0** | 0 | — |
| Muertas **en** el juez | **0** (20 `PASS` + 3 `RESCHEDULE`, cero `REJECT`) | 0 | 12 de 27 |

Ventana real **19:30:00 → 21:33:31 UTC**; el brief declaraba 19:24–21:00 porque se escribió antes del
último tramo. **Versiones de EF medidas por el sufijo de `entrypoint_path`** (`HRD-R09`, `HRD-R14`):
`iid-core` **57** · `content-watcher` **45** · `content-run-stage` **101** · `aife-filter` **43**; las
cuatro coinciden con el brief.

### 🚫 Cancelado — el expediente pesa más que la propuesta

- 🚫 **FIX-DUP-03 y PR #110.** La premisa se refutó: el chequeo aguas arriba **ya existía** —DIV-01
  devolvía `null` y no encolaba— y **FANOUT-01 lo revirtió a propósito**, documentado en `e865333` con
  un diferencial controlado: no encolar dejaba marcas sin producir. **El ecosistema ya eligió** entre
  producir con ángulo repetido y no producir. **Antes de proponer un mecanismo, se busca si el
  expediente ya lo decidió.** [reportado por el brief; el commit no se leyó en esta pasada]
- 🚫 **FIX-PATTERN-04.** No era defecto del sistema sino de lectura: `->>` sobre un array JSONB devuelve
  el array serializado, no el elemento. El texto juzgado vive en
  `assets->'social'->'adapted'->0->>'copy'`. **Los cinco `verify_pattern` están sanos** y, re-medido por
  la ruta correcta, los números salen **idénticos**: las decisiones de Sam se sostienen. [reportado]

### 🔴 Abierto — por orden de lo que bloquea

1. 🔴 **CALENDARIO — dos de cuatro marcas activas están fuera del carril, y son las dos en inglés.**
   `LucienSael` **no tiene ningún cron**: la corrida de hoy existió porque se disparó a mano con
   `intel.trigger_iid_agent`. `UnrealvilleStudio` los tiene **trimestrales** (ene/abr/jul/oct), así que
   su próxima corrida programada es el **1 de octubre**. **Una marca sin cron no produce sola**, por
   limpio que salga su carril.
2. 🔴 **ARBITRAJE POR REGLA — mañana.** Corpus nuevo y fresco: **23 piezas de LucienSael en inglés con
   28 marcas sobre 13 reglas**, todas en `warned` porque las 50 activas están en `warn`. `HR-GEN-05`
   **×6** —la primera, y es justo la que `P6` describe como *blocking sin `verify_pattern` y sin
   dueño*—, `HR-GEN-01` ×5, `HR-GEN-02` ×3, `HR-LUC-06` ×3. **Casos consecutivos, nunca elegidos por
   sospechosos.** El brief declaraba 23 marcas con `HR-GEN-01` a la cabeza; medido al cierre son 28 y
   manda `HR-GEN-05`. [medido]
3. 🔴 **FIX-ADAPT-02 está desplegado y NO surte efecto.** `assets.social` trae la clave `language` en
   **23 de 23** y vale **`NULL` en las 23**. Causa: el adaptador recibe `readDispatchAxis(job).language`
   —el valor **crudo** del eje—; LucienSael no declara `brand_topics.languages`, `expandLanguages` emite
   `[null]` y la fila viaja con `language = null`. **CopyLab no lo sufre porque resuelve la cascada
   completa** (`builder_input → meta → params → brands.language_primary`) y acaba en `'en'`; **el
   adaptador no la resuelve.** [medido el efecto; la causa, `reportado` por el brief]
   → **Corte propuesto `FIX-ADAPT-05`:** pasar al adaptador el idioma **resuelto**, no el del eje. La
   alternativa por dato —poblar `brand_topics.languages`— **cambia el volumen del fan-out** y es
   decisión de Sam, no corrección técnica. **No se ejecuta con este `Actualiza`.**
   → **El corolario de arquitectura vale más que el corte: hay DOS RESOLUTORES DEL MISMO EJE**, uno con
   cascada en CopyLab y otro sin ella en `content-run-stage`. **Dos resolutores del mismo eje divergen
   por construcción.** El eje debería resolverse **una vez** y viajar resuelto.
4. 🔴 **La traza de la directiva de idioma viene en `NULL`.**
   `builder_meta.language_directive.source` es `NULL` en **23 de 23**: el idioma llega bien y **la
   procedencia no es observable**, que era el criterio de éxito escrito de FIX-LANG-01. Se establece
   contra el código de CopyLab. **Bloquea el punto 8.** [medido]
5. 🔴 **CORTE DE AIFE — tres defectos medidos, ninguno tocado.** Registrados en
   `professor_learnings` el 2026-08-30 a las 10:52:51 UTC. (a) **`voice === "lucien" ? … : …` en capa
   compartida** decide la nota de voz: Lucien recibe la suya y **las otras 14 marcas la de
   UnrealvilleStudio**, ForumPHs y NeuroneSCF incluidas — el patrón que `MULTIBRAND_RULE` prohíbe de
   forma explícita. (b) Su rama dice literalmente **`First person. English.`**; con la fila ya en `en`
   el defecto se resuelve como **fila equivocada, no código equivocado**, pero el condicional por
   nombre sigue vivo. (c) **93 de 283 piezas de ForumPHs (33 %) vuelven byte-idénticas de AIFE**, contra
   0 de 30 en LucienSael, 0 de 9 en NeuroneSCF y 0 de 28 en UnrealvilleStudio: **la asimetría es por
   marca, no por idioma**. Candidato `deducido`: `applyAIFE` termina en `data.content?.[0]?.text ?? text`
   —un no-op que se declara éxito—; exige su propia medición sobre los logs de esas 93.
6. 🟠 **Las 25 piezas exoneradas sin fila** (24 de ForumPHs + 1 de LucienSael): texto íntegro en
   `orchestrator_jobs.assets`; requiere crear la pieza. **Después del arbitraje**, por decisión de Sam.
7. 🟠 **Retirar el alias legacy** — tercer PR de la migración, **sólo cuando la traza de la directiva
   sea observable** (punto 4). El orden es el de `MULTIBRAND_RULE` §5: el alias se retira cuando ninguna
   fila lo usa, no por comodidad.
8. 🟠 **El eje del idioma bilingüe no está declarado.** Tres de las cuatro marcas activas son bilingües
   con base más conmutador (`/es` en UNRLVL, `/en/` en NeuroneSCF, `ES` en LucienSael) y el blog de
   Lucien etiqueta piezas `EN`, `ES` y `EN·ES`. **`brands.language_primary` es de valor único**;
   `brand_topics.languages` **sí es lista** y el fan-out ya emite una fila por idioma. **El eje existe;
   la declaración no.**
9. 🟠 **Las otras 11 marcas sin auditar su `language_primary`.** De las 15 filas de `public.brands`,
   sólo las 4 activas del carril se revisaron hoy. **Antes de endurecer la aplicación de un dato, se
   valida el dato**: FIX-LANG-01 hace que la columna se obedezca mejor, así que **cada fila equivocada
   que quede se convierte en un defecto nuevo, y en silencio**. [medido: 12 filas en `es`, 3 en `en`]
10. 🟡 **Ventana envenenada de `expertise`** — 77 filas anteriores a DIV-01 lo mantienen fuera de
    rotación hasta el **2026-09-11**. **No se toca:** una excepción por fecha en `loadRecentAngles` sería
    instancia en capa compartida por un efecto que expira en doce días. Queda **declarado**, no
    arreglado.
11. 🟡 **El juez filtra su propia deliberación al campo que el arbitraje va a leer.** En la fila leída,
    `gate_detail.hard_rules.raw` trae el razonamiento del modelo en texto corrido —*«Wait, let me
    reconsider…»*— y el parser lo deposita en `unmatched` junto con la palabra `NINGUNA`. El veredicto
    salió correcto, así que **no rompe nada hoy**; mete ruido en el corpus de mañana. [medido sobre **1**
    fila leída — es una observación, no una tasa; medirlo sobre las 23 es trabajo de la sesión de
    arbitraje]
12. 🟡 **`content-dispatcher` declara dos versiones distintas.** `list_edge_functions` devuelve
    `version: 50` mientras su `entrypoint_path` termina en **47**, que es lo que dice `ecosystem.json`.
    Por el método de `HRD-R14` manda el sufijo, así que **el context file no se cambia**; queda escrito
    para que la próxima sesión decida cuál de los dos campos está mintiendo. [medido]

### 🔴 Divergencia declarada y NO corregida — Professor

El brief afirma que los learnings *«quedaron capturados **antes** de escribir este brief, aprobados por
Sam»* y enumera **doce**. La base dice otra cosa: `public.professor_learnings` con
`session_date = '2026-08-30'` tiene **6 filas**, las seis con `filter_passed = true` y **las seis con
`approved_by_sam = false`**; la última se escribió a las **21:33:12 UTC**, después del corte del brief.
[medido]

**No se corrige el dato: se declara.** Aprobar un learning es de Sam (`HRD-R19`), y escribir en la base
para que cuadre con un brief es lo contrario de medir. Los seis restantes de la lista de doce **están en
el cuerpo de este `Actualiza`**, que es donde importan, **pero no están en Professor**. Es el mismo
patrón del 2026-08-29, cuando el brief declaraba 19 learnings y la base decía 31.

### 🧭 Lo que este día enseña sobre cómo se mide

- **Antes de agrupar una serie temporal, partirla por las fechas de cambio conocidas.** Un `GROUP BY`
  sobre una ventana que atraviesa un merge mide **dos sistemas** y los presenta como uno. Ocurrió **tres
  veces en un día**. **Toda medición sobre `watcher_log` o `iid_content_queue` que cruce el
  2026-08-25 15:27 UTC mide dos sistemas.**
- **Antes de contar, declarar la unidad.** *«Filas menos distintos»* parecía medir repetición y medía
  **fan-out**. Una métrica cuya unidad no se declaró no se puede refutar, sólo creer.
- **Antes de declarar causa raíz, comprobar el rasgo contra el grupo de control.** `format_instruction`
  en `NULL` no era la causa del truncamiento: está en `NULL` también en las filas que nunca truncan. **El
  discriminador era el techo**, y esta misma jornada lo confirmó.
- **Un campo presente no es un campo poblado.** Verificar la existencia de la clave habría dado
  FIX-ADAPT-02 por confirmado; leer el valor lo desmiente.
- **`->>` sobre un array JSONB devuelve el array serializado, no el elemento.** Con la ruta del array,
  `\m` no matchea al inicio de párrafo.
- **Anunciar no es ejecutar.** Se escribió *«encadeno el `process` en cuanto cierre el research»* y no se
  hizo: el memo quedó sin destilar y el carril estuvo **cuatro horas y media** sin trabajo, con los polls
  sanos respondiendo `no_jobs`. **Disparar y después contar, nunca al revés.**

_Actualizada: 2026-08-29 · v2026-08-29-v4 (**`judged_source` CONFIRMADO — el hito del 2026-08-27 es real y `P3` queda auditable por primera vez.** La v3 lo dejó abierto porque la consulta daba cero; **faltaba la ruta, no el dato**. Medido por `assets->'watcher'->>'judged_source'`: **13 de 67 piezas** y **46 de 417 jobs**, valor `social_adapted`, con **corte temporal limpio** en el despliegue de P3-FIX. La lección queda escrita: **una consulta a la tabla equivocada devuelve un cero verdadero sobre una pregunta falsa**.)_

---

## 🗓️ CONFIRMACIÓN 2026-08-29-v4 — `judged_source` existe; la consulta miraba donde no podía estar

_(Bloque al tope. Corrige el único ítem que la v3 dejó sin confirmar.)_

### ✅ Cerrado hoy, y verificado

- ✅ **`judged_source` está poblado — el hito del 2026-08-27 es real y `P3` queda auditable por primera vez** (medido 2026-08-29). Ruta: **`assets->'watcher'->>'judged_source'`**. **13 de 67 piezas** (`content.content_pieces`) y **46 de 417 jobs** (`content.orchestrator_jobs`), con **valor único `social_adapted`**. Lo escribe **`content-run-stage` dentro de `assets.watcher`** de la pieza y del job — **no el Watcher en su log**.

- ✅ **El corte es temporal, y la costura se ve dentro de la propia jornada** (medido). **0 de 52** piezas anteriores al 2026-08-27 lo llevan, porque el campo no existía. El **2026-08-27 lo llevan 12 de 14**: las dos que faltan son las juzgadas **antes** del despliegue de ese mismo día. El **2026-08-28, 1 de 1**. **La ausencia en las filas viejas no es un defecto estructural: es el corte del despliegue de P3-FIX.**

### 🧭 Por qué la primera pasada dijo que no existía — el error vale más que el dato

La consulta miró **`information_schema.columns`**, donde `judged_source` no aparece **porque no es una columna: es una clave dentro de un `jsonb`**. Y miró **`intel.watcher_log.gate_detail`**, que es el **registro del juicio y no lleva `assets`**, así que **ahí no puede estar por construcción**. Las **747 filas** de esa consulta no son ni las 417 de jobs ni las 67 de piezas: **se estaba contando otra cosa**.

**Un escalón por encima de `HRD-R13`.** Esa regla dice que *grepear no es leer*. Esto añade lo siguiente: **una consulta a la tabla equivocada devuelve un CERO VERDADERO sobre una PREGUNTA FALSA**, y ese cero es **indistinguible de una ausencia real** si nadie comprueba que la pregunta era la correcta. El reflejo de **no escribirlo como medido cuando la consulta daba cero fue el correcto** —evitó registrar una negación falsa— pero el paso que faltaba era **verificar la ruta antes de concluir**, no dar el cero por bueno.


_Actualizada: 2026-08-29 · v2026-08-29-v3 (**RECUPERACIÓN — EL TRABAJO REAL DEL 2026-08-27 NO ESTABA EN NINGÚN CONTEXT FILE.** Esa sesión duró **más de dos días y tuvo DOS `Actualiza`**; el registrado cuenta los MCPs sin autenticación, y **el del carril nunca entró**. Sam confirma que es real. Se recupera **medido contra Supabase, no copiado del brief**: **NeuroneSCF de 0 a 6 agentes con 12 crons** (jobs 67-78, los doce activos) · tres EF desfasadas dos días · y **P1-P13 en `next_session_agenda`**. Lo que el brief decía mal se corrige —`cta_base` es NULL en **cinco** marcas, no una; LucienSael tiene **1 dominio**, no 4; **45 de 50 reglas sin `verify_pattern`**— y lo que no se pudo confirmar **entra como ítem abierto, no como cierre**: `judged_source` da **cero** en toda la base.)_

---

## 🗓️ RECUPERACIÓN 2026-08-29-v3 — El trabajo real del 2026-08-27, medido contra la fuente

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-08-29). Sólo context files; cero código, cero migraciones, cero despliegues en esta pasada.)_

**Por qué existe.** La sesión del **2026-08-27 duró más de dos días y tuvo DOS `Actualiza`**. El que quedó registrado cuenta *«tres MCPs en internet sin autenticación»*; **el del carril nunca entró a los context files**. Sam confirma que ese trabajo es real e importante. **No se copió del brief: se midió.**

### 🟢 Confirmado por medición

- ✅ **NeuroneSCF: de 0 a 6 agentes, con 12 crons y arrancando sola** (medido 2026-08-29 sobre `intel.iid_agents` y `cron.job`). Dominios `chlorine-sun` · `color-fade` · `damage-repair` · `fine-fragile` · `frizz-humidity` · `hair-science`; **jobs 67 a 78, los doce `active = true`**, un par `research`+`process` por dominio. **Es la siembra más grande de una marca hasta la fecha y no estaba escrita en ninguna parte.**
- ✅ **Tres Edge Functions desfasadas dos días**, corregidas a la versión **real servida** (`content-run-stage` **100**, `iid-core` **56**, `iid-process` **49**). Detalle en el bloque `2026-08-29-v2`.
- ✅ **`HR-LUC-10` tiene `verify_pattern`** (medido sobre `intel.watcher_rules`), como el brief declaraba.

### 🟠 Corregido respecto al brief — el dato real difiere

- ⚠️ **`cta_base` no es un caso de UnrealvilleStudio: es un hueco del eje.** Medido sobre `public.brands`: **NULL en cinco filas** —`DEFAULT`, `LucienSael`, `PatriciaOsorioConectando`, `SamPublisher`, `UnrealvilleStudio`—. Y las dos que el brief daba por pendientes, **NeuroneSCF y ForumPHs, sí lo tienen**.
- ⚠️ **LucienSael: 1 agente, UN dominio, cuatro temas.** El brief decía «1 agente para 4 dominios». Medido: 1 agente y **1 dominio** (`behavioral-science`) en `iid_agents`; los cuatro son sus **`brand_topics`**. El cuello es real, pero **no faltan tres dominios: falta capacidad de agente para los temas que ya existen**.
- ⚠️ **La cobertura de `verify_pattern` es peor de lo descrito.** De **50 reglas activas**, sólo **5** tienen `verify_pattern` y sólo **UNA** tiene `fix_replacement` (`HR-FPHS-15`). **45 de 50 se evalúan sin patrón verificable.** Y **49 de 50 son `blocking`**; la única `warn` es `HR-FPHS-08`.

### 🔴 No confirmado — entra como ítem, no como cierre

- ⬜ **`judged_source`.** El brief lo declara como el hito: *«poblado, P3 auditable por primera vez, era 0 de 54»*. **Medido, y no confirma:** la columna **no existe en ninguna tabla** (`information_schema.columns` → **0 filas**) y aparece en **0 de 747 filas** de `intel.watcher_log.gate_detail`. Vive con otro nombre, lo escribe `content-run-stage` v100 y no ha corrido desde el deploy del 27, o no ocurrió. **Dar por auditable algo que no se puede consultar es lo que `HRD-R11` prohíbe.**
- ⬜ **El ratio del 26 %, «8 de 27 mueren antes del juez» y «33 de 48 incumplimientos».** No reproducibles con las consultas de esta pasada: `watcher_log` da **747 filas** (446 `hard_rules`, 206 `evidence`, 50 `duplication`, 8 `objective_stimulus`, **37 `PASS`**) y `content_pieces` tiene **67 piezas** en seis estados. Quedan como **`reportado`**.

### 📋 P1–P13 en `next_session_agenda`

Los trece más el bloque «sin bloquear», **cada uno con su etiqueta de evidencia**. Los medidos llevan el dato: **el cron 66 sigue `active = false`** (P3), `HR-GEN-05` es `blocking` sin patrón (P6), `cta_base` NULL en cinco (P9), una sola regla con `fix_replacement` (P4), una sola `warn` (P5). Los no medidos llevan escrito que son `reportado` y qué los cerraría. **Ninguno se copió del brief sin pasar por la fuente.**


_Actualizada: 2026-08-29 · v2026-08-29-v2 (**CORRECCIÓN — UN BRIEF FECHADO EL 27 PEDÍA CERRAR UNA SESIÓN YA CERRADA Y BAJAR LAS VERSIONES.** No se ejecutó: `AGENDA` estaba en `2026-08-29-v1` y `ecosystem.json` en `2026-08-29-v3`, y la sesión del 2026-08-27 ya tenía su bloque y su entrada en `previous_sessions`, con **otro contenido**. Se rescató lo único que el paso 0 confirmó válido y medible: **cuatro reglas nuevas** en `HRD_PROTOCOL.md` → **v1.10** —R16 ESZIP, R17 Windows, R18 cableado, R19 la última palabra es de Sam— y **tres Edge Functions desfasadas** en `ecosystem.json`, que llevaban **dos días** declarando una versión que no era la servida.)_

---

## 🗓️ CORRECCIÓN 2026-08-29-v2 — Un brief fechado el 27 pedía cerrar una sesión ya cerrada; se rescató lo medible

_(Bloque al tope. Sólo `HRD_PROTOCOL.md` y `ecosystem.json`; cero código, cero migraciones, cero despliegues.)_

### 🛑 Lo que NO se hizo, y por qué

El brief pedía `AGENDA` → `2026-08-27-v2` y `ecosystem.json` → `2026-08-27-v2`. **Medido en el paso 0:** el repo estaba en **`2026-08-29-v1`** y **`2026-08-29-v3`**, con el PR #72 ya mergeado; la sesión del **2026-08-27 ya estaba cerrada** —bloque propio en esta AGENDA y entrada en `previous_sessions`— y **su contenido registrado es otro**: «tres MCPs del ecosistema en internet sin autenticación», no el carril. Ejecutarlo habría **retrocedido las versiones** sobre un estado más nuevo y **duplicado la fecha con dos relatos distintos**. Se detuvo y se consultó (`QA-INFO`); **decisión de Sam: rescatar lo válido con fecha de hoy.**

Tres datos del brief tampoco cuadraron con la fuente: **`iid-core`** decía 55 y es **56**; **`iid-process`** decía 48 y es **49**; y declaraba **19 learnings** del 2026-08-27 cuando la base dice **31**, los 31 aprobados. **Se escribió lo medido, no lo declarado.**

### 🟢 Cerrado hoy, y verificado

- ✅ **`HRD_PROTOCOL.md` → v1.10 · cuatro reglas nuevas, ninguna derogación** (2026-08-29). **`HRD-R16`** — la verificación de un despliegue se hace sobre el **módulo propio extraído del ESZIP**, nunca por `grep` sobre el bundle: encontrar la cadena no prueba que el código propio la tenga, y no encontrarla no prueba que no esté. **`HRD-R17`** — en Windows, **un comando por línea** (PowerShell rechaza `&&` y no tiene `grep`), y **el commit se verifica ANTES de desplegar**. **`HRD-R18`** — un **test de bloque puro no prueba el cableado**, con el corolario de que un campo de diagnóstico **se escribe siempre, vacío cuando no actúa**, porque si sólo aparece cuando la lógica actuó, su ausencia es indistinguible de «no corrió». **`HRD-R19`** — **la última palabra es de Sam**: ninguna regla baja de `blocking` sin su firma, ninguna pieza se publica sin su aprobación, y **`warning` significa «va a su bandeja», no «pasa sola»**.

- ✅ **Numeración corregida antes de escribir, y por eso importa** (2026-08-29). Las tres primeras llegaron propuestas como **R15, R16 y R17**. Pero **`HRD-R15` ya existe** desde el PR #70 —es la regla de entrega y las cuatro QA—: escribirlas con esa numeración habría **pisado una regla vigente**. Y **R19 llegó propuesta como «restablecimiento»**: se midió y **no estaba escrita en ninguna parte** —cero apariciones en `HRD_PROTOCOL.md` y en `CC_PROTOCOL.md`—, así que es **regla nueva** y se declara como tal. El idioma neutro sin voseo **no se repitió**: ya es `HRD-R15`, y copiarlo habría creado una segunda fuente.

- ✅ **Tres Edge Functions desfasadas en `ecosystem.json`, corregidas con la versión REAL servida** (2026-08-29, `_meta` → `2026-08-29-v4`). Medido con `list_edge_functions`, **leyendo el sufijo de `entrypoint_path` y no el comentario de cabecera** (`HRD-R09`, `HRD-R14`): **`content-run-stage` v94 → `100`** (desplegada 2026-08-27 23:03:51 UTC) · **`iid-core` v54 → `56`** (2026-08-27 15:02:05 UTC) · **`iid-process` v48 → `49`** (2026-08-26 22:38:45 UTC). Los tres registros anteriores **se conservan íntegros** tras el separador `||`. `iid-research` **45** y `content-scheduler` **6** ya estaban correctos.

- ✅ **El hallazgo de fondo, que no es el número sino el hueco** (2026-08-29). Los tres deploys ocurrieron el **26 y el 27** y **nunca entraron al context file**: el JSON llevaba **dos días** declarando una versión que no era la servida. Es exactamente el defecto silencioso que `HRD-R14` describe — nada falla, nada se queja, y el registro miente hacia arriba.


_Actualizada: 2026-08-29 · v2026-08-29-v1 (**ACTUALIZA 2026-08-29 — LA REGLA DE ENTREGA SE INSTALÓ Y SE PROPAGÓ A LOS 32 REPOS, Y EL BARRIDO ENCONTRÓ MÁS DE LO QUE EL ENCARGO PEDÍA.** `DELIVERY_AND_VERIFICATION_RULE` como fuente única de cómo se entrega y cómo se verifica: destinatario declarado por bloque, marca visual **por superficie** —el diferenciador es para que Sam lea, no para que CC ejecute—, idioma ES/EN neutro **sin voseo**, etiqueta de evidencia `medido`/`reportado`/`deducido` y las **cuatro QA** con estatus HRD, donde `QA-INFO` es **bloqueo**. `HRD_PROTOCOL.md` a **v1.8** con `HRD-R15`, frase de apertura única y **PANEL DE CARGA VERIFICADA** con evidencia por fila. **32 de 32 repos verificados en su rama por defecto**, no reportados. Y de paso: la regla de push **derogada desde el 2026-07-31** seguía viva en **18 repos** —trababa a CC—, **13** permitían que CC mergeara, **11** no tenían `CLAUDE.md`, y el **secreto de export del SMA estaba en claro** en `HRD_PROTOCOL.md`, en `main`.)_
_Actualizada: 2026-08-28 · v2026-08-28-v4 (**MAIL-PRIV-03 — UNA REGLA QUE SE INCUMPLE DOS VECES EN UN DÍA NO TIENE UN PROBLEMA DE DISCIPLINA: NO TIENE DOCUMENTO.** Sólo context files y documentación; cero código, migración o siembra → **el test de la marca N+1 no aplica**, y se declara para que la ausencia no se lea como omisión. **DECISIÓN DE SAM, tomada hoy:** la regla de privacidad de correo **sube a `protocols/MAIL_PRIVACY_RULE.md` v1.0** como **documento propio y fuente canónica**. **POR QUÉ, Y NO ES BUROCRACIA:** la regla se incumplió **dos veces en un solo día** —el `Actualiza` de la mañana, y después la propia corrección que la instauraba— **mientras vivía repartida en tres copias** (`AGENDA.md`, `ecosystem.json`, y la §7 de un `.github/CLAUDE.md`) **y ninguna era la fuente**. Una regla sin documento propio se aplica **por memoria de quien escribe el brief**, y la memoria de quien escribe el brief es exactamente lo que falló las dos veces. Lo que se copia, diverge — es la misma doctrina que `CC_PROTOCOL.md` §6 ya exige para los `CLAUDE.md`. **QUÉ TRAE EL PROTOCOLO, y es más que un traslado:** §0 de quién fue cada uno de los dos incumplimientos, **con el reconocimiento de que el segundo fue del brief y no de CC** · §1 la regla · §2 la única excepción · §3 el corolario del hallazgo contaminado por su origen, con `MAIL-03` como ejemplo que fija el criterio · **§4 la prueba** —*«si borro esta frase, ¿se pierde la regla, o sólo el detalle de lo que se vio?»*— y las dos formas que siempre condena · **§5 lo que la regla NO prohíbe**, que hasta hoy no estaba escrito en ningún sitio: el registro del consentimiento, los defectos de nuestro propio código, la constancia de gobernanza y el marcador de ítem retirado · **§6 la tabla que separa la §5 del documento firmado de esta regla** —se puede cumplir la cláusula y estar incumpliendo la regla, que es literalmente lo que pasó entre `MAIL-PRIV-01` y `MAIL-PRIV-02`— · §7 instrucciones de carga **por actor**, con una **§7.1 dirigida a quien escribe los briefs**, que es donde falló, y un **barrido previo al commit declarado indicativo y no exhaustivo** · §7.4 el bloque literal que se pega en el `.github/CLAUDE.md` · §8 la historia de los tres PRs · **§9 el pendiente estructural**. **LAS COPIAS PASAN A SER PUNTEROS, y ninguna se borra sin que su contenido esté primero en el protocolo:** el ítem 0 de `next_session_agenda` deja de duplicar el enunciado y queda reducido **al único pendiente que sigue abierto** —si la lectura de correo pasa a **sesión aparte que no ejecuta `Actualiza` ni Professor**— más el puntero · la **§7 del `.github/CLAUDE.md` de `unrlvl-mail-mcp`** queda como **resumen operativo con fuente canónica declarada**, en su propio PR · el **`CLAUDE.md` raíz** suma el protocolo a su bloque de carga obligatoria y al árbol de `protocols/`. **LO QUE SIGUE ABIERTO, Y ES LO QUE IMPORTA:** los §1 a §7 son **disciplina** —dependen de que quien escribe se acuerde, y ya se demostró dos veces en un día que eso falla—. La **sesión aparte** es **estructura**: una sesión que **no puede** escribir en context files porque no ejecuta el paso que los escribe **no depende de que nadie se acuerde**. Queda como ítem 0 de `next_session_agenda`, **decisión de Sam**. **⚠️ CORRECCIÓN DE UN DATO QUE CC ESCRIBIÓ MAL EN EL PR ANTERIOR:** el bloque `v3` decía que **tres** `document_path` seguían apuntando a texto. Son **dos** —`ForumPHs` y `NeuroneSCF`—; el de `UnrealvilleStudio` dice `AUTOTITULAR — cuenta propia, sin documento de terceros` y **es correcto**, no hay nada que subir ahí. Corregido en su sitio, en la cabecera `v3`. **El error es de CC, no del brief**, y se dice igual que se dijo al revés. **🟦 CERRADO DE PASO, y es de Sam:** los dos PDF de autorización **ya existen** y el bucket los rechazaba con *«File name is invalid»* — el nombre original traía **`ó`**, y el validador de claves de Supabase Storage sólo admite `\w` ASCII más un puñado de signos. **No era un problema de permisos ni del bucket.** CC entregó los dos archivos renombrados a ASCII; Sam los subió, y con su confirmación explícita CC ejecutó el `UPDATE`: **los dos `document_path` apuntan ya al objeto del bucket**, verificado por **join de `mail.authorizations` contra `storage.objects`** —los tres resuelven—. **El registro del consentimiento queda completo:** tres buzones activos, tres autorizaciones vivas, ninguna revocada, y el papel firmado **deja de ser una cadena de texto y pasa a ser un objeto**. El de `UnrealvilleStudio` sigue en `AUTOTITULAR` porque **es correcto**: cuenta propia, sin documento de terceros. **Única escritura en producción de esta pasada, y fue pedida.** **El bloque `v2026-08-28-v3` NO se archiva ni se duplica** — se edita en su sitio, sólo para corregir el dato de arriba, igual que hicieron `v2` con `v1` y `v3` con `v2`.) · cabecera anterior (v2026-08-28-v3) conservada inmediatamente debajo, editada en su sitio, y todo el historial de cabeceras en historical_AGENDA.md_

---

## 🗓️ ACTUALIZA 2026-08-29-v1 — La regla de entrega se instaló, se propagó a los 32 repos, y el barrido encontró más de lo que el encargo pedía

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-08-29). Sólo context files de `unrlvl-context` y los `CLAUDE.md` del org; cero código, cero migraciones, cero despliegues.)_

### 🟢 Cerrado hoy, y verificado

- ✅ **`DELIVERY_AND_VERIFICATION_RULE` instalada y propagada** (2026-08-29). Fuente única en `protocols/DELIVERY_AND_VERIFICATION_RULE.md` —**v1.0** en el PR #70, **v1.1** en el #71—; **8 puntos de carga**, cada uno con su estatus declarado (FUENTE / PUNTERO / RESUMEN OPERATIVO) y una §6.1 que ata al futuro proyecto de sync; `HRD_PROTOCOL.md` a **v1.8** con `HRD-R15`, frase de apertura única y panel de carga verificada; `CC_PROTOCOL.md` a **v7** con §4.1 v3 y la v2 archivada bajo guard, más la §0 bis.1 con la vía real a Vercel medida; `CAPABILITIES.md` a **1.10**; barrido de voseo (**6** ocurrencias, una más que las 5 declaradas en el brief, anotado por `HRD-R13`). Un PR por repo sobre los **32** del org, los 32 mergeados el mismo día.

- ✅ **Propagación VERIFICADA en los 32 repos, no reportada** (2026-08-29). Leído el `CLAUDE.md` de cada repo **en su rama por defecto** —incluido `unrlvl-blog`, cuya rama por defecto es `claude/blog-multibrand-seo-46fev0` y no `main`—: **31 de 31** contienen el encabezado `## ENTREGA Y VERIFICACIÓN — INVIOLABLE` **y** el puntero a la fuente única, y ninguno conserva la regla derogada fuera de un guard. Con `unrlvl-context`, **32 de 32**. **`CLAUDE.md` creado desde cero en 11 repos:** BlueprintLab · DDMV-Assistant · OnboardingApp · Shopify · VoiceLab · forumphs-com · gimnasio-mental · lanzadera-cv · luciensael · unrlvl-blog · unrlvl-iid-functions.

- ✅ **Regla de push derogada, retirada de 18 repos** (2026-08-29). «Nunca por CC», «solo Sam vía **GitHub Desktop**»: **vencida desde el 2026-07-31** y con un dato falso encima —Sam mergea por **GitHub Web UI** desde el 2026-07-29—. No era cosmética: leerla como imperativo vigente **traba a CC**, y ya había ocurrido en sesión. Las 18 redacciones quedan **archivadas bajo guard**, no borradas. Además, **13 repos** decían «solo entonces hacer merge o pedir merge», que dejaba abierta la puerta a que CC mergeara: corregido a **CC nunca mergea**.

- ✅ **Tres divergencias protocolo–práctica cerradas** (2026-08-29, `HRD_PROTOCOL.md` → **v1.9**). El paso 4 de `HRD_ACTUALIZA` mandaba **regenerar** los derivados contra la regla de **sincronizar** escrita en `CLAUDE.md` desde el 2026-08-23 —contradicción viva dentro del mismo protocolo durante **seis días**—; el pie del cuerpo vivo declaraba **v1.3** mientras la cabecera decía v1.8; y los pasos 1-2 mandaban consultar el SMA **siempre**, cuando la práctica es sólo a petición de Sam. Las tres redacciones anteriores, archivadas bajo guard.

### 🟡 Decidido hoy — cerrado por criterio de Sam, no por ejecución

- ✅ **Secreto de export del SMA — DECISIÓN DE SAM: no se rota, riesgo controlado** (2026-08-29). Medido: `protocols/HRD_PROTOCOL.md` línea 197 llevaba el valor **en claro** dentro del paso 1 de `HRD_ACTUALIZA`, en `main`, y por tanto en el historial de git y en el estático de Vercel. El `Actualiza` de hoy lo **retira del cuerpo vivo** y lo **redacta** en el bloque histórico, de modo que no vuelve a copiarse al leer el protocolo. **Sam evaluó la exposición y decidió no rotarlo**, por riesgo controlado; queda anotado con esa etiqueta para que nadie lo reabra como hallazgo pendiente. Lo que sí queda cerrado sin depender de esa decisión: el protocolo ya **no contiene ningún secreto en claro**, y la redacción vigente lo toma de la env var de Vercel. Nota de alcance: `SESSION_PROTOCOL.md` ya usaba el marcador `[SECRET]` y nunca llevó el valor.

### 🔍 Paso 10-bis — verificación contra fuente (ejecutado 2026-08-29)

Consultas contra Supabase, no contra context files. `skills/context-resolver/SKILL.md` §3 y §4 cargado, no reconstruido de memoria.

- **«Destilar VivoseMask (convergida)» → ABIERTO, y el ítem se queda corto.** El ítem nombra **una** marca; son **cinco** las sesiones convergidas sin genoma destilado [medido — `intel.calibration_sessions` JOIN `public.brand_voice_genome`]: **VizosCosmetics** (2026-07-05, 11 turnos) · **VivoseMask** (2026-07-06, 15) · **PatriciaOsorioVizosSalon** (2026-07-06, 12) · **PatriciaOsorioConectando** (2026-07-06, 19) · **PatriciaOsorioPersonal** (2026-07-11, 11). Todas convergieron hace ~7 semanas con material suficiente. **El trabajo caro ya está hecho y sin cobrar: convergieron y nadie destiló.**

- **«`brand_topics` de las destiladas» → ABIERTO PARCIAL**, que es el estado más peligroso porque parece cerrado. Cuatro marcas con genoma activo tienen topics —ForumPHs 32, NeuroneSCF 9, UnrealvilleStudio 6, LucienSael 4—, pero **D7Herbal tiene genoma activo `v1.0` y CERO `brand_topics`**, y **SamPublisher tiene genoma `v0.5` activo y cero** [medido]. Destilar sin sembrar topics deja el genoma sin nada que decir.

- **«Marisol corre 7 bucles» → ABIERTO PARCIAL.** Los tres nombrados —Vizos, VizosSalón, Conectando— **convergieron**. De los cuatro nuevos: **cuatro sesiones de D7Herbal quedaron `abandoned`** el 2026-07-20 con 0, 0, 1 y 2 turnos. Y queda **una sesión `active` de NeuroneSCF del 2026-07-11 con CERO turnos** — abierta hace siete semanas sin un solo turno. Una sesión `active` vacía no es trabajo en curso: es una fila que miente hacia arriba.

- **Observado y NO clasificado como defecto, a propósito.** Varias marcas tienen más de una fila `active` en `brand_voice_genome` (ForumPHs 3, NeuroneSCF 3, LucienSael 2). **No es duplicación**: son **voces distintas por marca**, y coincide con las tres voces de ForumPHs ya documentadas. Se anota para que la próxima pasada no lo confunda con un hallazgo.

### 🗄️ Paso 10 — barrido de archivado · EJECUTADO con confirmación de Sam

Bajo `## ✅ Resuelto recientemente` hay **16 ítems** que cumplen las dos primeras condiciones (✅ completado · más de 30 días: del 26-jun al 23-jul). **Tres NO se proponen**, porque el paso 10-bis acaba de medir que tienen **referencia activa** — y ese es justo el motivo por el que 10-bis corre antes que 10:

| Ítem retenido | Referencia viva medida hoy |
|---|---|
| «Siembra de 4 ejes + PatriciaOsorio.com (11-jul)» | la sesión `active` con **0 turnos** que sigue abierta es una de esas |
| «Siembra de EJES FUNDADORES — 5 marcas de Marisol (6-jul)» | las **5 convergidas sin destilar** salen de esa siembra |
| «Sesión bucle Boids — E7 + genoma D7Herbal (10-jul)» | D7Herbal tiene genoma activo y **cero `brand_topics`** |

**Los 13 restantes quedan MOVIDOS a `historical_AGENDA.md`** —propuestos a Sam y movidos **con su confirmación explícita**, nunca en silencio—: #48 Approval por email (27-jun) · IID Sembrador T4 COMPLETO (26-jun) · IID Sembrador T4 brief (26-jun) · #47 E3 captura end-to-end (1-jul) · #47 E5a pestaña única (1-jul b) · #47 Calibración NSCF + tratado (2-jul) · E6 + #45 NeuroneSCF (2-jul) · ForumPHs DF regresión + Bloque 1 (3-jul) · ForumPHs DF R5 inerte + parser (4-jul) · #47 E5b BACKEND (4-jul) · #47 E5b FRONT (6-jul) · Skill r4b-genome-calibration (13-jul) · ForumPHs genoma conversión + Ley 284 (23-jul).

**No se borraron: se movieron.** Viven íntegros en `historical_AGENDA.md`, bajo el encabezado `## 🗄️ ARCHIVADO — barrido del Actualiza 2026-08-29` con su guard `⛔ NO OPERATIVO` y la nota de por qué los tres retenidos se quedaron. `## ✅ Resuelto recientemente` queda con **cuatro** ítems: los tres retenidos y el cierre del 2026-08-16, que tiene trece días y no cumple la condición de los treinta.

_Actualizada: 2026-08-28 · v2026-08-28-v3 (**MAIL-PRIV-02 — LA CORRECCIÓN DE LA MAÑANA REPITIÓ, EN PEQUEÑO, EL ERROR QUE VENÍA A CORREGIR: RETIRÓ EL DATO Y DEJÓ ESCRITA LA PROCEDENCIA.** Sólo context files y documentación; cero código, migración o siembra → **el test de la marca N+1 no aplica**, y se declara para que la ausencia no se lea como omisión. **QUÉ PASÓ:** `MAIL-PRIV-01` retiró los datos y **dejó escrita la procedencia**. En **seis sitios** quedó en el repo, literal, lo que la regla que ese mismo PR instauraba prohíbe: **de dónde salió un hallazgo**. **Y EL ERROR ES DEL BRIEF, NO DE CC** — el brief de MAIL-PRIV-01 pidió una «línea de constancia» **cuyo texto declaraba él mismo la procedencia del ítem**, y CC extendió ese patrón, con criterio y con coherencia, a los dos ítems reescritos. En el mismo documento convivían la regla *«ni la mención de que se leyó algo»* y el patrón que la incumple. **CC hizo bien su trabajo; el brief estaba mal**, y queda escrito acá para que no se lea como un fallo de ejecución. **QUÉ SE INCUMPLE, EXACTAMENTE, Y QUÉ NO:** la **§5** del documento que firmaron las titulares habla de **no conservar contenido**, y eso **sí se cumplía y se sigue cumpliendo** —verificado archivo por archivo: no queda contenido en ninguna parte—. Lo que se incumplía es la **regla de Sam**, que es **más estricta que la cláusula**. **No hay exposición frente a las clientas; hay incoherencia interna.** **Y AUN ASÍ NO ES INOCUO:** `MAIL-03` y `FPHS-FORM` son **ambos de ForumPHs**, y una nota adosada a un ítem superviviente que **declara de dónde salió** convierte al ítem en **un puntero a la lectura**: el lector deduce **qué se consultó y qué clase de cosa se vio ahí**. Eso es precisamente lo que la regla evita. **EL CRITERIO APLICADO, Y DECIDE CADA DUDA:** se **CONSERVA** la constancia de gobernanza —que hubo un incumplimiento, cuál es la regla, y qué PR la instauró—, que vive **una sola vez**, en este `AGENDA.md` y en la **regla 7 del `.github/CLAUDE.md` de `unrlvl-mail-mcp`**; sin ella la regla no tiene origen y se erosiona sola. Se **RETIRA** (a) toda **descripción de lo que se leyó** —categorías de dato, tipo de aviso, comportamiento observado: un resumen de la correspondencia sigue siendo la correspondencia— y (b) toda **procedencia adosada a un ítem concreto que sobrevive**, reducida a `Reescrito el 2026-08-28 por MAIL-PRIV-01.`, que traza el PR y nada más. **Prueba usada ante cada duda:** *si borro esta frase, ¿se pierde la regla, o sólo el detalle de lo que se vio?* **QUÉ SE PODÓ, Y DÓNDE:** en `ecosystem.json`, cuatro claves — `security.MAIL-03._correccion_2026-08-28` · `supabase._proyectos_no_declarados_2026-08-28.forumphs-db` · `next_session_agenda` (ítems `MAIL-03`, `FPHS-FORM` y el marcador de ítem retirado) · `_meta.last_session.status` (variante de `FPHS-FORM`, marcador de ítem retirado y frase de cierre) — · en `brands/ForumPHs/session_log.md`, las **dos notas al pie** de `MAIL-03` y `FPHS-FORM` · en `brands/NeuroneSCF/session_log.md`, el **bloque de ítem retirado** y la **cabecera del archivo** · y en este `AGENDA.md`, las **tres notas del cuerpo `v1`**, el marcador de la **cabecera `v1`** y la **cabecera `v2`**. **⚠️ SÉPTIMO SITIO, NO PREVISTO POR EL BRIEF:** `brands/UnrealvilleStudio/session_log.md` (2026-08-28) llevaba **la misma nota**, adosada a la lista que contiene `MAIL-03` y `FPHS-FORM` vivos. El brief enumeraba seis. **La prueba del criterio lo resuelve sin ambigüedad** —sólo se pierde el detalle de lo que se vio—, así que **se podó y se declara**, en vez de dejar en pie el defecto exacto que este PR existe para cerrar. **EL MARCADOR DE ÍTEM RETIRADO SE CONSERVA** en sus dos ubicaciones de `ecosystem.json` y en los tres `.md`, porque **un hueco sin explicar invita a rellenarlo**; se le retira sólo la frase que decía de dónde procedía. **LO QUE NO SE TOCÓ, Y ES DELIBERADO:** ni una línea de **código** en ninguno de los dos repos · ni una fila de la **base** · el **registro de consentimiento** —altas de buzón, `holder_name`, fechas de firma, `document_path`—, que es **prueba de autorización, no correspondencia** · **MAIL-01**, **MAIL-02** y **MAIL-04**, defectos de nuestro propio código · el **cuerpo** de `MAIL-03` y `FPHS-FORM`, comprobable por vía propia · `protocols/` y `skills/INDEX.md` · y la **historia de git**, que conserva lo ya mergeado: este bloque corrige el estado actual y **no borra el pasado**. **TRES INCOHERENCIAS CERRADAS EN EL MISMO PR**, porque afectan a lo que la limpieza tenía la obligación de preservar: 🔴 **(1) TITULAR DUPLICADO** en `brands/ForumPHs/session_log.md` — la misma sección declaraba **dos titulares distintos para el mismo buzón**, **Samuel Moreno Mendoza** e **Ivette Flores**, ambos con `signed_at = 2026-08-28`. El registro de consentimiento **no puede tener dos versiones**. **Autoridad: la base**, consultada el 2026-08-28 (`mail.mailboxes` × `mail.authorizations`, sin revocaciones): `ForumPHs`/`forumphs507@gmail.com` → **Ivette Flores** · `NeuroneSCF`/`neuronescflorida@gmail.com` → **Patricia Osorio C.** · `UnrealvilleStudio`/`unrealvillestudio@gmail.com` → **Samuel Moreno Mendoza** (autotitular). **Se corrigió el log contra la base, no al revés**, y la línea que atribuía la titularidad a Samuel **no se borró: se aclaró** —creó la cuenta, que es cierto y no es lo mismo que ser titular—. 🟠 **(2) TÍTULO HUÉRFANO** en `brands/NeuroneSCF/session_log.md` — el encabezado del **2026-08-28** seguía anunciando dos cosas que ya no existen en su cuerpo: el ítem retirado —era **el último sitio donde sobrevivía**— y un titular «sin declarar» que **sí consta** (Patricia Osorio C., firmado). Título nuevo, sin procedencia y verdadero: *«`neuronescflorida@gmail.com` entra al MCP · autorización firmada»*. 🟠 **(3) ESTADO VIEJO CONVIVIENDO CON EL NUEVO** en `ecosystem.json` — `infrastructure.INFRA-MAIL-MCP.verificado_2026-08-28` afirmaba **0 filas en las dos tablas** y que *«el sistema está completo y todavía no tiene un solo buzón dado de alta»*, con `blockers` que listaban las autorizaciones como **sin firmar**, **todo ello en la misma entrada** que declara tres buzones activos y las dos firmas; y `supabase.main.schemas.mail` decía *«0 filas al 2026-08-28»* en sus dos `tables_list`. Un campo `verificado_<fecha>` **se lee como autoritativo**: con probabilidad alta una sesión futura concluye que el MCP no tiene buzones. **No se borró: se archivó** —§0 manda— con el patrón que ya existía en el archivo (`_status_anterior_<fecha>` / `_blockers_anteriores_<fecha>`), **sin inventar uno nuevo**: `_verificado_anterior_2026-08-28`, `_blockers_anteriores_2026-08-28` y `_tables_list_conteo_anterior_2026-08-28`, los tres con guard `⛔ NO OPERATIVO`. **El campo vigente refleja el estado real, medido el 2026-08-28 con `execute_sql`: 3 buzones activos, 3 autorizaciones vivas, ninguna revocada.** Los `blockers` resueltos **se marcaron cerrados con su fecha, no se suprimieron**. **🟦 PENDIENTE DE SAM, NO DE CC:** los dos **PDF siguen sin subir** al bucket `mail-authorizations`, y los **`document_path` de la base todavía apuntan a texto** en vez de a un objeto del bucket. **CC no toca la base.** **CORRECCIÓN (v3→v4):** este bloque decía «los **tres**». Son **dos** — `ForumPHs` y `NeuroneSCF`. El de `UnrealvilleStudio` dice `AUTOTITULAR — cuenta propia, sin documento de terceros`, y **es correcto**: no hay documento de terceros que subir, así que no es un pendiente. El error es de CC, no del brief. **⚠️ DOS DESVIACIONES DEL BRIEF, DECLARADAS Y NO DISIMULADAS:** (a) el brief pedía que *«el `status` anterior pase a `previous_sessions`»*; **no se hizo, y por qué:** esto **no es una sesión nueva** sino **la misma sesión del 2026-08-28 corregida en su sitio** —el propio brief lo dice al ordenar que el bloque `v2` se edite donde está, sin archivar ni duplicar—, y `MAIL-PRIV-01` fijó ese criterio explícitamente en `_meta._correccion_2026-08-28-v2`; añadir la entrada **duplicaría el 2026-08-28** y haría leer **dos sesiones donde hubo una**. Queda registrado en `_meta._correccion_2026-08-28-v3`. (b) el brief pedía **regenerar `ecosystem.md` y `ecosystem_filemap.md` completos**; **no se regeneran, se sincronizan** —nota de sincronización en cabecera con cuerpo íntegro, en commit separado—, que es la regla escrita en `CLAUDE.md` desde el 2026-08-23 tras declararse la excepción **cinco Actualizas seguidas**: **no existe generador en el repo**, así que «regenerar» a mano es reescribir con interpretación y **borra historia**, que es exactamente lo que §0 impide. El propio brief §2.1 autoriza declararlo. **BARRIDO §6 EJECUTADO SOBRE LOS DOS REPOS**, con conteo por archivo en el cuerpo del PR. **Superviviente único y deliberado:** el **enunciado de la propia regla** —donde dice que un hallazgo descubierto *leyendo un buzón* ajeno sigue contaminado por su origen— en la cabecera `v2` de este `AGENDA.md`, en `next_session_agenda` de `ecosystem.json` y en la **regla 7** del `.github/CLAUDE.md` de `unrlvl-mail-mcp`. **Ahí es la regla, no un hallazgo**, y el propio §6 lo exceptúa. **REGLA 7 DE `unrlvl-mail-mcp`:** podada en su propio PR — se retiró la **enumeración de los archivos concretos** donde aterrizó cada hallazgo y la **categoría del dato** leído; se conservan íntegros la regla, la excepción del recordatorio, el corolario del hallazgo contaminado por su origen, la base en la §5, y que el origen fue **MAIL-PRIV-01** el 2026-08-28. **El bloque `v2026-08-28-v2` NO se archiva ni se duplica** — igual que hizo `v2` con `v1`: **la corrección de una corrección tiene que verse donde estuvo el error**.) · cabecera anterior (v2026-08-28-v2) conservada inmediatamente debajo, editada en su sitio, con la v2026-08-28-v1 debajo de ella y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-28 · v2026-08-28-v2 (**MAIL-PRIV-01 — LO QUE SE LEE DE UN BUZÓN DE CLIENTE NO SE ESCRIBE EN NINGÚN SITIO, Y EL ACTUALIZA DE ESTA MISMA MAÑANA LO INCUMPLIÓ.** Sólo context files; cero código, migración o siembra → **el test de la marca N+1 no aplica**. **Por qué:** el documento de autorización que **Ivette Flores** y **Patricia Osorio C.** firmaron el 2026-08-28 declara en su **§5** que *no se almacena copia del contenido, asunto, remitente ni adjuntos* de los mensajes consultados, y que **la consulta se agota en el momento de hacerse**. El Actualiza `v2026-08-28-v1` metió en `AGENDA.md`, en dos `session_log.md` —y en Professor, ya corregido aparte— varios hallazgos **derivados de leer buzones de clientes**. Este bloque corrige el repo. **REGLA FIJADA POR SAM:** de la lectura de correo de clientes **sale una respuesta en el chat y desaparece** — nada va a context files, ni a Professor, ni a AGENDA, ni a un `session_log`; ni el contenido, ni un resumen, ni un hallazgo derivado, ni la mención de que se leyó algo. **Única excepción:** que Sam pida explícitamente un recordatorio, y entonces se anota **qué hay que hacer, jamás de dónde salió**. Un hallazgo sobre infraestructura propia descubierto leyendo un buzón ajeno **sigue contaminado por su origen**: se vuelve anotable sólo si se verifica **por una vía independiente**, y entonces se anota **esa vía**, no el correo. **QUÉ SE HIZO, Y ES POCO Y MUY CONCRETO** —el riesgo no era dejarse algo, era **barrer de más**—: **UN ÍTEM RETIRADO ENTERO** de tres archivos —`AGENDA.md`, un `session_log.md` de marca y `ecosystem.json`—, sustituido por una línea de constancia **sin dato alguno**, porque **no hay forma de reescribirlo sin que siga siéndolo** (el identificador y la marca del archivo cayeron el 2026-08-29 por **MAIL-PRIV-04**: por sí solos ya decían **de qué cliente y de qué materia** salió, que es la procedencia en su forma más comprimida) · **`MAIL-03` REESCRITO sin procedencia**: **se conserva sólo el hecho verificable de forma independiente** —la consulta a `list_projects`—, que además es la única vía por la que el ítem es anotable · **`FPHS-FORM` REESCRITO sin procedencia**: se conserva lo comprobable **visitando el sitio** (el formulario no tiene captcha, honeypot ni filtro) y **el resto pasa de hallazgo a tarea de verificación por prueba propia**. **⚠️ HALLAZGO CONTRA EL SUPUESTO DEL BRIEF:** el brief daba `ecosystem.json` por limpio —«no debería haber nada»— y **no lo estaba**: los tres ítems vivían también en `_meta.last_session.status`, en `next_session_agenda`, en `security.MAIL-03` y en `supabase._proyectos_no_declarados_2026-08-28`. **Se corrigieron los cuatro sitios.** `CAPABILITIES.md`, `ecosystem.md` y `ecosystem_filemap.md` sí estaban limpios, y se declara. **LO QUE NO SE TOCÓ, Y ES DELIBERADO:** los tres defectos del MCP —**MAIL-01**, **MAIL-02**, **MAIL-04**— son **defectos de nuestro propio código** y no contienen correspondencia; **el alta de los tres buzones y sus autorizaciones firmadas se conservan** porque son **el registro del consentimiento**, que es exactamente lo que debe existir; y no se tocó nada de lo que el brief marcó como falso positivo —la *bandeja* de publicación del Orchestrator, la carpeta `spam`/`includeSpamTrash` que el MCP lee **por diseño**, Klaviyo, Shopify, LinkedIn, TikTok, la *cuota extraordinaria* de `HR-FPHS-15`, el digest de aprobaciones—. **CERRADO DE PASO, y no es privacidad sino estado:** las **dos autorizaciones quedaron firmadas** el mismo 2026-08-28 —**Ivette Flores** y **Patricia Osorio C.**, `signed_at = 2026-08-28`—, así que los ítems «titular sin declarar» y «documentos sin firmar» del bloque `v1` **se marcan cerrados en su sitio**; queda pendiente **subir el PDF** al bucket `mail-authorizations`. **REGLA ESCRITA DONDE SE APLICA:** el bloque va como **§7 del `.github/CLAUDE.md` del repo `unrlvl-mail-mcp`**, en su propio PR. **LÍMITE DECLARADO:** el historial de git **conserva lo que ya se mergeó**; este bloque corrige el estado actual y **no borra el pasado**. Reescribir historia queda **fuera de alcance** y no se hace sin petición expresa. **⚠️ TENSIÓN CON `CC_PROTOCOL.md` §0, declarada y no disimulada:** la regla suprema dice que un context file **nunca** pierde contenido. Este bloque **retira contenido a propósito**, por una obligación legal con terceros que firmaron un papel, y por orden explícita de Sam. **No es un precedente para borrar nada más**: la excepción es exactamente la §5 del documento de autorización, y nada más. **El bloque `v2026-08-28-v1` NO se archiva ni se duplica** — la corrección se ve **donde estaba el error**.) · cabecera anterior (v2026-08-28-v1) conservada inmediatamente debajo, con sus tres ítems corregidos en el sitio, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-28 · v2026-08-28-v1 (ACTUALIZA 2026-08-28 — **EL MCP DE CORREO LEE. Y LO QUE COSTÓ LLEGAR NO FUE GOOGLE: FUE QUE EL SISTEMA NO VERIFICABA DE QUIÉN ERA LO QUE DEVOLVÍA.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **9 learnings** en `public.professor_learnings`, `session_date = 2026-08-28`, los nueve con `approved_by_sam = true` — **medido y coincide con el brief**, un solo lote a las 16:16:37 UTC. **SMA no se consultó** (Sam no lo mencionó). **BASE: `main`** — el Actualiza del 27-ago (**PR #63**) se **mergeó** el 2026-08-28 a las 16:26:40 UTC, así que esta pasada ramifica de `main` y no de aquella rama. **CERRADO Y VERIFICADO HOY:** **`unrlvl-mail-mcp` operativo de punta a punta** — **tres buzones dados de alta y activos**, medidos en `mail.mailboxes`: `ForumPHs/forumphs507@gmail.com` · `UnrealvilleStudio/unrealvillestudio@gmail.com` · `NeuroneSCF/neuronescflorida@gmail.com`, los tres `provider = google_oauth`. **Alcance declarado por Sam: sólo esas tres marcas.** · **MCP-AUTH-01 mergeado y desplegado** — PR #1 del repo `unrlvl-mail-mcp`, merge `350de4a`; **verificado desde fuera el 2026-08-28: `401` con `{"error":{"code":"MCP_UNAUTHORIZED"}}` y `WWW-Authenticate: Bearer`**, y en el código `lib/auth.ts` con comparación de tiempo constante y **sin degradar a abierto** si falta `MCP_AUTH_TOKEN` · **conector dado de alta en Claude.ai**, con `Authentication: None` y cabecera `Authorization: Bearer`, porque el servidor usa **token estático y no OAuth** — las tres tools aparecen en esta sesión, que es la prueba · **app de Google en Production**, branding completo, dominio `unrealvillestudio.com` autorizado, scope `gmail.readonly`, **sin evaluación CASA y coste cero** · **páginas legales publicadas** — `/legal/privacy` verificada en vivo: **200**, **v1.1 con fecha 28 de agosto de 2026**, entidad **«Samuel Moreno Mendoza, sole proprietor»**, y el footer enlaza `/legal/privacy`, `/legal/terms` y `/es/legal/privacidad`; su §04 documenta el acceso de sólo lectura al buzón con la cláusula de **Limited Use de Google**, que es lo que desbloqueó Production. `legal/a` borrado (PR #8) · **Vercel Authentication retirada de `unrlvl-mail-mcp`** —medido: `ssoProtection: false`—, porque **bloqueaba también al conector**; **se mantiene encendida en `unrlvl-supabase-mcp`** —medido: `true`—, que sigue **sin autenticación en código** · **bucket privado `mail-authorizations`** creado a las 11:07:42 UTC (PDF/JPG/PNG, 10 MB): **los cinco buckets que ya existían no servían** — `unrlvl-media` y `product-assets` son **públicos**. **ABRE, Y ES LO QUE IMPORTA DEL DÍA:** 🔴 **MAIL-01 — el MCP no verifica de quién es el buzón que lee.** `lib/tools.ts` estampa `address` **desde la base**, no desde el proveedor, así que una credencial mal atada **devuelve correo ajeno con la etiqueta correcta encima**. **Ocurrió hoy en producción: NeuroneSCF sirvió la bandeja de UnrealvilleStudio, sin error ni alerta.** Verificado en el código desplegado: `address: mailbox.address` en **cuatro** puntos y **cero apariciones** de `assertMailboxIdentity`, `getProfile` o `MAILBOX_IDENTITY_MISMATCH` · 🔴 **MAIL-02 — la caché de access token no se invalida al rotar la credencial.** Verificado: `accessTokenCache` va **sólo por `mailbox_id`**, con TTL de `expires_in ?? 3600`, y nada en la clave depende del refresh token; `vault.update_secret` no la toca. **Tres rotaciones seguidas siguieron sirviendo el buzón anterior** hasta que un redeploy vació la caché — y rotar una credencial es **rutina**, no excepción · 🔴 **MAIL-03 — `forumphs-db` está fuera del mapa del ecosistema.** **Medido con `list_projects`: la cuenta de Supabase de UNRLVL sólo tiene `unrlvl-db` y `XMMs`** — `forumphs-db` (`tajuoqdbnsnzkhyqvdgs`) **no está ahí**: hay una base de datos de cliente **fuera del ecosistema, sin dueño declarado**. ⚠️ **Matiz medido frente al brief:** sí aparece **mencionada en prosa** en `ecosystem.json` y en `AGENDA.md`; lo que **no** tiene es **nodo propio** — el bloque `supabase` declara únicamente `main`. Y **`XMMs` no aparece en `ecosystem.json` en absoluto**: son **dos** proyectos sin declarar, no uno · 🟠 **MAIL-04 — códigos de error agrupados.** Verificado: `errors.ts` sólo declara **`MAIL_TOKEN_REVOKED`**, `invalid_grant` se mapea explícito y **el mismo código se usa de cajón de sastre** para cualquier otro fallo del canje; no existen `MAIL_CLIENT_CONFIG_INVALID` ni `MAIL_TOKEN_EXCHANGE_FAILED`. **Costó tres iteraciones.** Y `route.ts` llama a `logOp` **sin `mailbox_id`** en sus **dos** llamadas, aunque el campo **existe** en `OpLog`: el diagnóstico es a ciegas por omisión, no por diseño · 🚫 **un ítem retirado el 2026-08-28 por MAIL-PRIV-01** — vulneraba la §5 del documento de autorización; notificado a Sam en el chat · 🟠 **FPHS-FORM** — el formulario de `forumphs.com` **no tiene protección anti-spam** (sin captcha, honeypot ni filtro), comprobable visitando el sitio; **pendiente de verificar por prueba propia** la entregabilidad de `noreply@forumphs.com` hacia buzones Gmail (reescrito el 2026-08-28 por **MAIL-PRIV-01**) · 🟠 **titular de la cuenta de NSCF sin declarar** y **documentos de autorización sin firmar** — así estaban al escribirse este bloque; ✅ **ambos cerrados el mismo 2026-08-28**: autorizaciones **firmadas** por **Ivette Flores** (ForumPHs) y **Patricia Osorio C.** (NeuroneSCF), `signed_at = 2026-08-28`, con el PDF pendiente de subir a `mail-authorizations`; **UnrealvilleStudio va como `AUTOTITULAR`, correcto y definitivo** · 🟡 retirar `oauthplayground` de los redirect URIs · TikTok Shop de NSCF a medio completar · `003_drop_brand_oauth_tokens.sql` · PR de limpieza de `projects/unrlvl-mail-mcp/`. **EL PATRÓN DEL DÍA, DICHO SIN ADORNO:** los tres defectos son **la misma clase de fallo** — el sistema **afirma** algo que no **comprueba**. MAIL-01 afirma de quién es el correo; MAIL-02 afirma que el token es el vigente; MAIL-04 afirma cuál fue la causa del fallo. Ninguno rompe: **los tres mienten en silencio**, que es la forma cara. **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23; el brief pedía regenerarlos completos y **CC lo declara**, como el propio brief §3 autoriza. Detalle en `brands/UnrealvilleStudio/session_log.md`, `brands/ForumPHs/session_log.md` y `brands/NeuroneSCF/session_log.md` (2026-08-28).) · cabecera anterior (v2026-08-27-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-27 · v2026-08-27-v1 (ACTUALIZA 2026-08-27 — **EL CARRIL NO FUE EL PROBLEMA DE HOY. TRES MCPs DEL ECOSISTEMA ESTABAN EN INTERNET SIN AUTENTICACIÓN.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: el brief declara **12 learnings** con `session_date = 2026-08-27` y `approved_by_sam = true` — **medido con `execute_sql` el 2026-08-28: 24, los veinticuatro aprobados, en DOS lotes de 12** (17:17:51 y 23:49:52 UTC); el brief contó **su** lote. **Manda la medición** (HRD-R13) y la discrepancia se anota, no se corrige a mano. **SMA no se consultó** (Sam no lo mencionó). **EL HALLAZGO DEL DÍA:** **SEC-01** — `unrlvl-supabase-mcp`, `unrlvl-meta-mcp` y `unrlvl-shopify-mcp` **no leen ninguna cabecera de credencial**: van de `req.json()` a `handleRpc` a `callTool` **sin tocar `req.headers`**, y los tres declaran `Access-Control-Allow-Origin: *`. Tools que **mutan**: supabase **3** (`execute_sql`, `apply_migration`, `deploy_edge_function`) · meta **9** · shopify **4**. **Agravante sistémico:** en esa misma DB viven `shopify_stores` y `meta_accounts` **con los tokens de los otros dos**. **SEC-02** — `unrlvl-meta-mcp/api/upload.ts` es un **segundo endpoint público sin autenticar**: sube archivos arbitrarios al bucket `unrlvl-media` con la `SERVICE_ROLE_KEY` y `x-upsert: true`, y acepta una `url` remota que **el servidor descarga** — vector **SSRF** más sobrescritura de assets de marca en `brand/{brand_id}/`. ⚠️ **DISCREPANCIA MEDIDA, Y ES BUENA NOTICIA:** el brief declara `unrlvl-supabase-mcp` con `passwordProtection: false`, `ssoProtection: false`, `trustedIps: false` — *cero protección en código y cero en infraestructura*. **Medido en la API de Vercel el 2026-08-28, los CUATRO proyectos MCP tienen `ssoProtection: true` (`all_except_custom_domains`)**, `unrlvl-supabase-mcp` y `unrlvl-mail-mcp` incluidos: **la mitigación inmediata que pedía el brief ya está aplicada**. Lo que **no** cambia: la falta de autenticación **en el código** sigue exactamente igual, y `all_except_custom_domains` **no cubre un dominio propio** — por eso el cierre correcto sigue siendo **MCP-AUTH-01 extendido a los tres**, no la casilla de Vercel. **ENTREGADO HOY:** **`unrlvl-mail-mcp`** — MCP de correo de clientes, **sólo lectura**, de punta a punta: schema `mail` aislado (**2 tablas + 1 función `SECURITY DEFINER`**, `REVOKE` sobre `anon`/`authenticated`/`service_role`/`PUBLIC`, RLS sin políticas como defensa redundante), **rol dedicado `mail_mcp`** en vez de `service_role`, y **repo propio** extraído de `unrlvl-context` con `git subtree split` (**30 archivos** en la raíz). **VERIFICADO EN PRODUCCIÓN el 2026-08-28** (HRD-R13): schema `mail` **aplicado** con sus 2 tablas · rol `mail_mcp` **existe** · `has_schema_privilege` sobre `mail` da **`false` para `service_role`, `anon` y `authenticated`** — el aislamiento no es una intención, es un permiso · **1** función `SECURITY DEFINER` · **`mailboxes` y `authorizations` en CERO FILAS**: el sistema está completo y **todavía no tiene un solo buzón dado de alta**. **CORRECCIÓN DE UNA CIFRA DE AGENDA:** donde el bloque del 26-ago dice *«4 ERROR-level en `unrlvl-db`»*, la remedición con `get_advisors` del 2026-08-28 da **16 ERROR y 39 WARN** — los 16 son **12 vistas `SECURITY DEFINER` + 4 tablas `ops_*` sin RLS** (`ops_client_terms`, `ops_rate_transitions`, `ops_credits`, `ops_cost_residual`). **El dato viejo no se borra: se anota la remedición con su fecha.** **LEGAL:** las páginas legales de `unrealvillestudio.com` del 28-abr identificaban al responsable del tratamiento como **«Unrealville Studio LLC», entidad que no existe**, y estaban **huérfanas** — cero `href` desde ambos footers. Se sustituyen por **Samuel Moreno Mendoza, empresario individual**. **Sin LLC ni nombre ficticio registrados en Florida**, Sam firma como persona física documentos con cláusula de indemnidad que dan acceso a buzones de clientes. **GOOGLE CLOUD:** proyecto nuevo `unrlvl-mail-mcp` (project number `212509698390`), sin organización, Gmail API habilitada, pantalla de consentimiento **External**, scope `gmail.readonly`, OAuth Client ID creado — **publicación en Production PENDIENTE** de que las páginas legales estén vivas. **ABRE:** 🔴 **SEC-01** los tres MCPs sin autenticación en código · 🔴 **SEC-02** el `upload.ts` público con `SERVICE_ROLE_KEY` y SSRF · 🟠 **MCP-AUTH-01** entregado y pendiente de merge, env var, deploy y verificación de 401 · 🟠 páginas legales en PR · 🟠 sin entidad registrada en Florida · 🟠 **alta del conector** — sin ese paso el MCP de correo está completo y es inútil · 🟡 `003_drop_brand_oauth_tokens.sql` · 🟡 PR de limpieza de `projects/unrlvl-mail-mcp/` · 🟡 `legal/a`. **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23; el brief pedía regenerarlos completos y **CC lo declara en vez de sincronizar parcial**, como el propio brief §3 autoriza. Detalle en `brands/UnrealvilleStudio/session_log.md` (2026-08-27).) · cabecera anterior (v2026-08-26-v2) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-26 · v2026-08-26-v2 (ACTUALIZA 2026-08-26 — **LOS TRES ROJOS CERRADOS, Y EL HILO DEL QUE CUELGA TODO LO DEMÁS LLEGA NULL.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **15 learnings** en `public.professor_learnings`, `session_date = 2026-08-26`, los quince con `approved_by_sam = true` — **orden cumplido: Professor → Actualiza**. **SMA no se consultó** (Sam no lo mencionó). **CERRADO Y VERIFICADO EN PRODUCCIÓN:** **PUB-01** — `content-scheduler` **v6** (PR #98), el drenaje comprueba el EFECTO contra la fila de `scheduled_posts` y no el código HTTP, con `publishAndVerify` (`PUBLISH_UNVERIFIABLE`/`PUBLISH_UNPROVEN`/`PUBLISH_FAILED`/`PUBLISH_NOOP`) y `recordPublicationProof` guardando `assets.publication` — aplicación literal de HRD-R11 · **P3** — `content-run-stage` **v94** (PR #99), el juez recibe `social.adapted` y no `aife_filtered`, con `pickJudgedText`, `syncJudgedAdapted` y `adapted_pre_judgment` como evidencia sin firmar · **RESEARCH-01** — `iid-research` **v45** e `iid-process` **v48** (PRs #100 y #101), techo por cascada sobre `intel.iid_research_ceilings` (fila BASE 16000, default DECLARADO COMO DATO) y `truncated` como columna GENERADA desde `stop_reason` · **BLOG-01 PR-1** `forumphs-com` #6 (`discarded_at` en las tres rutas, 410 en descartado, paquete SEO) · **BLOG-01 PR-2** repo NUEVO `unrlvl-blog` #1 (renderizador extraído, `blog_path` como dato con router propio) · **BP-01/02/03** `BluePrints` #2 y #3 (blueprint de LucienSael creado; `BP_BRAND_UNRLVL` a v1.5). **TRES MARCAS ENTRAN AL SCHEDULER** — UnrealvilleStudio, LucienSael y NeuroneSCF con `rollout_started_at 2026-08-26`: cuatro marcas donde ayer había una. **UNRLVL PASA DE 14 AGENTES A 6.** **SEMBRADO Y MEDIDO (HRD-R13, `execute_sql` 2026-08-27):** `brand_rollout` **3** · `brand_cadence` **39** (el brief decía 33 — ⚠️ manda la medición) · `brand_publish_channels` **14** · `brand_topic_platform_mode` **63** · `intel.content_angles` **catálogo NUEVO de 10 ángulos, con el LÍMITE escrito en cada definición** · ángulos en **19** dominios de las marcas nuevas · **`objecion` en los 11 dominios de conversión de ForumPHs** (ángulo de venta: no entra en los editoriales) · `theme` y `fonts_href` **como dato del canal** en ForumPHs (Amatista Carbon), UNRLVL (VOID SYSTEM) y Lucien (EMBER SYSTEM). **LIMPIEZA:** 8 agentes fantasma de UNRLVL · 170+3 filas de cola fallida · 268 `orchestrator_jobs` · 71 findings de un carril que ya no existe; `scheduled_posts` quedó en **cero filas**. **PRIMER MATERIAL REAL DE DOS MARCAS NUEVAS:** memos íntegros (`end_turn`, `truncated=false`, `max_tokens=16000` de `base`) — `LUCIEN-BEHAVIORAL-SCIENCE` **25.162** caracteres y `UNRLVL-AI-COGNITION-TECH` **24.897** — y **dos piezas nuevas de LucienSael** (`blog` y `meta_ig`), ambas `clean` en `awaiting_approval`. ⚠️ **CORRECCIÓN AL BRIEF:** no son las dos primeras piezas de la marca — ya había dos del 2026-07-31; sí es **el primer research de su historia**. **ABRE:** 🔴 **P1 `judged_source` llega NULL** en las **4** piezas vivas de Lucien, las dos nuevas incluidas, pese a `content-run-stage` v94: no se puede afirmar que el juez leyó el adaptado, que es lo único que P3 vino a garantizar — **bloquea toda generación nueva** · 🔴 **P2 las tres reglas con falso positivo MEDIDO** sobre 9 arbitrajes (`HR-FPHS-15` 100 % · `HR-FPHS-13` 100 % · `HR-LEGAL-01` 75 %) — **condición para encender el cron 66** · 🟠 **P3 `IID_FANOUT_EMPTY`** (fail-loud funcionó, falta la causa; fila no localizada en esta pasada) · 🟠 **P4 el fan-out encola para plataformas sin proveedor** (3 `failed` + 1 `complete` en el lote de las 23:57) · 🟠 **P5 el adaptador no lee el genoma** (el conteo de hashtags es campo del genoma, no regla del Watcher) · 🟡 `SIG-01`/`SEO-01` · BLOG-01 PR-3 y PR-4 con la colisión de `/blog/` y los 301 · propagar `truncated` a `iid_findings` · `deno.land` bloqueado en el entorno de CC · `fix_replacement` sólo en `HR-FPHS-15` · 8 `statement` imperativos · `SUPABASE_SERVICE_ROLE_KEY` en 15 de 17 EF · 4 ERROR-level en `unrlvl-db` · handle `hair-intelligence-1` · perfiles duplicados de Vizos · ⚠️ **`iid-process` v49 sin origen conocido** (medido 49, brief 48) · ⚠️ **`Suite 1`** en la dirección de UNRLVL. **COSTO DE LA SESIÓN, SIN ADORNO:** dos divergencias entre producción y `main` por despliegues fuera de orden; **la segunda fue silenciosa y se llevó tres corridas de research completas**. **GOBERNANZA:** `HRD_PROTOCOL.md` **v1.7** con **dos reglas globales nuevas, ninguna derogación** — **HRD-R13** (una lectura de estado caduca dentro de la misma sesión; grepear no es leer; una hipótesis razonada no sustituye una medición) y **HRD-R14** (el orden merge → deploy no es ceremonia y su violación es SILENCIOSA: CC no despliega, Sam despliega desde `main` después del merge). **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23. Detalle en `IID/session_log.md` (2026-08-26).) · cabecera anterior (v2026-08-26-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-26 · v2026-08-26-v1 (ACTUALIZA CHECKPOINT 2 · SESIÓN 2026-08-25 — **EL RATIO LIMPIO PASÓ DE 6,7 % A 51,9 % EN UN DÍA, Y DE 21 PIEZAS UNA SOLA FALLÓ POR CONTENIDO.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **10 learnings** en `public.professor_learnings`, `session_date = 2026-08-25`, los diez con `approved_by_sam = true` — **19 en total de esta sesión** contando el checkpoint anterior. **SMA no se consultó.** **EL RUN DEL 2026-08-25:** 27 filas generadas · 21 piezas creadas · 6 nunca llegaron a pieza. **14 limpias (51,9 %)** · 5 rescatadas por arbitraje o edición (18,5 %) · **19 aprovechables (70,4 %)** · 8 perdidas (29,6 %). **EL DIAGNÓSTICO SE MOVIÓ DEFINITIVAMENTE: de 21 piezas generadas, una sola tenía un defecto de contenido real. Todo lo demás que se perdió fue instrumento.** **ÁNGULOS: 2 DISTINTOS** (`artefacto`, `pregunta`) contra **uno solo en las 250 filas previas**; donde un dominio tuvo dos hallazgos, cada uno recibió ángulo distinto — justo las parejas que antes se rechazaban entre sí. **ARBITRAJES DEL JUEZ: 9** — ocho `rule_failed`, uno `judge_was_right`; tasas de falso positivo **medidas**: `HR-FPHS-15` 100 % · `HR-FPHS-13` 100 % · `HR-LEGAL-01` 75 %. **RECHAZOS DE SAM: 4, Y 3 ERAN DEFECTOS DEL SISTEMA** — 2 por una firma que el sistema no puso, 1 por un truncamiento que el juez no podía ver; sólo 1 era contenido malo (citaba artículos por número). **PROYECCIÓN con SIGN-01 desplegado: 63 % limpio · 81,5 % aprovechable — es PROYECCIÓN, NO MEDICIÓN:** el deploy de `content-run-stage` v93 (23:51 UTC) fue **posterior** a la generación del run (17:10–19:41), así que **ninguna pieza de este run pasó por los arreglos de SIGN-01**. **DESPLIEGUES:** `unrlvl-iid-functions` **#92, #93** · `Orchestrator` **#23**; EFs (versión real = número final de `entrypoint_path`) `content-run-stage` **93** (23:51 UTC) · `content-watcher` **44** (23:13 UTC) · `iid-core` **54** · `iid-process` **47** · `content-scheduler` **5** · `approve-piece` **39** · `judge-arbitration` **2** · `piece-edit` **2** (las dos con `verify_jwt: true`). **MUTACIONES DE DATOS:** **`iid_content_queue_angle_check` ELIMINADO** — enumeraba ocho ángulos genéricos y **bloqueó el primer run con ángulos diversos**; se eliminó con `COMMENT` explicando por qué no vuelve · **32 dominios de ForumPHs con `angles` sembrados**, seis ángulos, matriz por voz · `brand_topics` +`angles` · `content_pieces` +`deferred_until`/`deferred_reason` · CHECK de `status` con `deferred` · **backfill de firma** (18 piezas → **23 de 23 vivas con firma, cero duplicadas**) · **backfill de embeddings** (corpus completo, cero piezas vivas sin embedding en 21 d: el gate de duplicación deja de degradarse a LLM) · `HR-FPHS-11` reescrita (la enumeración de fuentes excluía diarios *de hecho*) · `HR-FPHS-15` reescrita con el criterio de Sam (**sustantivo sí, adjetivo no**) · **`HR-FPHS-16` nueva** (sin enlaces salientes) · `HR-FPHS-11` y `HR-NSCF-08` con `condition` (defecto B en `kind='proof'`, que el barrido de `requirement` no cubría) · **cron 66 `content-placement-poll` APAGADO** hasta PUB-01. **GOBERNANZA:** `HRD_PROTOCOL.md` **v1.6** con **tres reglas globales nuevas, ninguna derogación** — **HRD-R10** (verificar fragmentos no es verificar el archivo: 50 tests en verde sobre `content-run-stage` mientras el archivo **no compilaba**, porque la suite extrae bloques por sentinelas; un `deno check` lo habría cazado) · **HRD-R11** (el éxito se comprueba contra el **efecto**, no contra el código HTTP: un 200 de SocialLab no es una publicación) · **HRD-R12** (el test de la marca N+1 barre también los **CHECKs existentes**, no sólo el código que se escribe: la enumeración puede estar en el esquema — es exactamente lo que pasó con `iid_content_queue_angle_check`). **BARRIDO DE ARCHIVADO EJECUTADO** — pedido explícito de Sam: **5 bloques** bajan a `historical_AGENDA.md` (4 de cabecera + el incidente `content-dispatcher-poll` del 17-jul), y **8 candidatos evaluados quedan RETENIDOS con su motivo declarado**. **ABRE, con su evidencia:** 🔴 **PUB-01** (el drenaje da por publicado con un 200 de SocialLab sin verificar el efecto — **cero publicaciones automáticas reales hasta hoy**; cron 66 apagado) · 🔴 **el texto adaptado por plataforma no pasa por el juez** (`content-run-stage:3134-3136`; verificado: `social.adapted` reintrodujo una cita de ley que `aife_filtered` no tenía) · 🔴 **`deno check` antes de dar por bueno un PR** · tres reglas con tasa de falso positivo alta y dato suficiente para reescribirlas · **SocialLab podría ser mayormente mockup** (sospecha de Sam, encaja con el 200 sin publicación) · barrido de los 8 `statement` imperativos · regla de correspondencia con la fuente (aplazada) · promoción del gate lingüístico (marca el 50 %) · deuda de claves Supabase (15 de 17 EF) · imagen inconsistente en blog y LinkedIn · Klaviyo DKIM/SPF · seguridad de `unrlvl-db`. **TEST DE LA MARCA N+1: no aplica** — este brief no produce código, migración ni siembra; se declara para que la ausencia no se lea como omisión. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — regla escrita en `CLAUDE.md` desde el 2026-08-23. Detalle en `brands/ForumPHs/session_log.md` (2026-08-25).) · cabecera anterior (v2026-08-25-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

_Actualizada: 2026-08-25 · v2026-08-25-v1 (ACTUALIZA 2026-08-24/25 — **EL CARRIL PUBLICA SOLO, Y EL DIAGNÓSTICO DEL RATIO SE MOVIÓ DEL MATERIAL AL JUEZ.** Sólo context files; el código, las DDL, los deploys y las corridas se ejecutaron antes de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado ANTES: **9 learnings** en `public.professor_learnings`, `session_date = 2026-08-25`, los nueve con `approved_by_sam = true`. **CINCO HITOS:** **primera publicación automática del ecosistema** — `5e9f03ef` salió **sola** en Facebook el 2026-08-25 **13:13 UTC**, con la franja calculada por `planSchedule` contra la cadencia real (`1x_week`, `month_1`) y drenada por el **cron 66**; nadie la tocó · **primer arbitraje humano del juez** (`judge_calibration`, 2026-08-25 14:36:41, `decided_by: sam`) · **primera retención** — 2 piezas salvadas que el día anterior se habrían destruido, con la prueba de su inocencia al lado · **PROC-01 en producción** — 15 hallazgos nuevos, **cero** con ley numerada y **cero** con año calendario, contra 3 de 5 contaminados antes · **corpus de embeddings completo** — backfill corrido, cero piezas vivas sin embedding en 21 días, y el gate deja de degradarse a LLM. **EL BLOQUEANTE DE TODO LO DEMÁS DEL 2026-08-23 QUEDA CERRADO:** el eje de colocación existe, es el modo `placement` de `content-scheduler` (Opción A, la recomendada), y funcionó. **DESPLIEGUES:** `unrlvl-iid-functions` **#80, #81, #82, #83, #84, #85, #86, #87, #88, #91, #92** y `Orchestrator` **#21, #22**; EFs `content-run-stage` **92** · `content-watcher` **43** · `content-scheduler` **5** · `iid-core` **54** · `iid-process` **47** · `approve-piece` **39** · `judge-arbitration` **2** · `piece-edit` **2** — las dos últimas con **`verify_jwt: true`**, su primera capa de defensa, asimetría **deliberada** frente al resto del carril, que usa `--no-verify-jwt` porque lo llama el cron vía `pg_net`, que no lleva JWT. **REGLAS DEL WATCHER (50 activas):** `HR-LEGAL-01`/`HR-LEGAL-02` reformuladas **como test** (`INCUMPLE…CUMPLE…`), sin imperativo · `HR-GEN-05`/`06`/`07` reescritas **sin idioma cableado** (refieren al *idioma declarado de la pieza*; los ejemplos castellanos migraron a `instruction`) · **`HR-GEN-09` nueva** (ambigüedad que **invierte el sentido**, nace del título que Sam rechazó) · **`HR-FPHS-16` nueva** (sin enlaces salientes; exime el dominio propio) · `HR-FPHS-11` ampliada a tres orígenes de cifra **y luego reescrita** (la enumeración de fuentes excluía diarios *de hecho*, y exigía al juez una correspondencia URL↔nombre que **no puede verificar**) · `HR-FPHS-15` reescrita distinguiendo **sustantivo** (`la extraordinaria` → incumple) de **adjetivo** (`asamblea extraordinaria` → cumple), **9 casos probados, 9 correctos** · 10 reglas con `condition` sembrada · `HR-LUC-02` y `HR-UNRLVL-03` corregidas a `kind='prohibition'` · 4 reglas con `verify_pattern`, `HR-FPHS-15` además con `fix_replacement`. **ESQUEMA:** `watcher_rules` +`condition`/`verify_pattern`/`fix_replacement`/`enforced_on` · `content_pieces` +`pass_type`/`challenged_at`/`edited_at`/`edited_by`/`deferred_until`/`deferred_reason` · `scheduled_posts` +`piece_id` · `brand_topics` +`angles` · **tablas nuevas** `intel.judge_calibration` e `intel.piece_edits` · CHECK de `content_pieces.status` con `challenged` y `deferred` · CHECK de `orchestrator_jobs.status` con `awaiting_publish`. **DATOS:** 29 filas de `scheduled_posts` borradas (residuo del código retirado; **5 eran de LucienSael y se rescataron** a `brands/LucienSael/corpus/2026-07-30_zugzwang_set.md`) · finding `9eea20a3` saneado a mano · **32 dominios de ForumPHs con `angles` sembrados** · 3 canales Meta/LinkedIn en `brand_publish_channels` con `provider_platform` · **cron nuevo `content-placement-poll`** (jobid 66, `*/15`, activo). **LOS SEIS ÁNGULOS DE FORUMPHS** aprobados por Sam: `expertise` · `artefacto` · `pregunta` · `consecuencia` · `contraste` · `secuencia`, con su matriz ángulo-voz y **el criterio de las ausencias** — **15 combinaciones ángulo-voz** contra **la única** que el ecosistema usó en 25 días y 250 filas. **GOBERNANZA:** `HRD_PROTOCOL.md` **v1.5** con dos reglas globales nuevas — **HRD-R08** (verificar contra el motor donde se ejecuta: `verify_pattern` POSIX, `fix_replacement` ECMAScript, `$1` nunca `\1`) y **HRD-R09** (mergear no despliega, y un merge puede quedarse corto: se verifica el **commit**, no el estado del PR). **ABRE, con su evidencia:** barrido de los **8 `statement` imperativos** de las 50 reglas activas · regla de correspondencia con la fuente (FIX-01 §4.5), **aplazada por decisión de Sam** · promoción del **gate lingüístico** (marca 1 error en **11 de 22** piezas, **tasa del 50 %** — revisar sus marcas antes de bloquear) · **deuda de claves Supabase** (15 de 17 EF leen `SUPABASE_SERVICE_ROLE_KEY`, marcada `DEPRECATED`; 13 sobreviven porque la usan contra PostgREST, donde ambas generaciones valen — **las 15 caen el día que Supabase la retire**) · **aviso obsoleto en la bandeja de publicación del Orchestrator** (dice que no existe el eje de colocación; es falso desde el 25-ago — **va en PR propio del repo `Orchestrator`**) · imagen inconsistente en blog (2 de 4) y LinkedIn (1 de 2) · Klaviyo DKIM/SPF · seguridad de `unrlvl-db` · las **5 piezas destruidas**, irrecuperables. **DERIVADOS:** `ecosystem.md` y `ecosystem_filemap.md` **se sincronizan, no se regeneran** — desde el 2026-08-23 eso **ya no es una excepción declarada sino la regla escrita** en `CLAUDE.md` («Los derivados NO se regeneran completos — se sincronizan»), tras cinco aplicaciones seguidas de la misma excepción. La regeneración real sigue abierta **sin fecha**. Detalle en `brands/ForumPHs/session_log.md` (2026-08-25).) · cabecera anterior (v2026-08-23-v1) conservada íntegra inmediatamente debajo, y todo el historial de cabeceras en historical_AGENDA.md_

---

## 🗓️ ACTUALIZA 2026-08-28-v1 — El MCP de correo lee. Y lo que costó llegar no fue Google: fue que el sistema no verificaba de quién era lo que devolvía

_(Bloque al tope. Detalle en `brands/UnrealvilleStudio/session_log.md`, `brands/ForumPHs/session_log.md` y `brands/NeuroneSCF/session_log.md` (2026-08-28). Sólo context files de `unrlvl-context`; el código, las DDL, los deploys y las corridas se ejecutaron **antes** de este Actualiza, en sus propios PRs y bajo HRD. Professor cerrado **antes**: **9 learnings**, `session_date = 2026-08-28`, los nueve con `approved_by_sam = true` — **medido, y coincide con el brief**. **SMA no se consultó** — Sam no lo mencionó. **BASE: `main`** — el PR #63 se mergeó el 2026-08-28 a las 16:26:40 UTC. **Test de la marca N+1: no aplica** — sin código, migración ni siembra. **DERIVADOS:** se sincronizan, no se regeneran. CC no mergea — Sam revisa, mergea y borra la rama. Lo previo se conserva íntegro debajo.)_

### 🟢 Cerrado hoy, y verificado

**`unrlvl-mail-mcp` operativo de punta a punta.** Tres buzones dados de alta, medidos en
`mail.mailboxes` el 2026-08-28:

| Marca | Buzón | `provider` | `active` | Autorización |
|---|---|---|---|---|
| ForumPHs | `forumphs507@gmail.com` | `google_oauth` | ✅ | ⚠️ `PENDIENTE DE FIRMA` — alta técnica, se reemplaza por el documento firmado por Ivette |
| UnrealvilleStudio | `unrealvillestudio@gmail.com` | `google_oauth` | ✅ | ✅ `AUTOTITULAR` — cuenta propia, sin documento de terceros |
| NeuroneSCF | `neuronescflorida@gmail.com` | `google_oauth` | ✅ | ⚠️ `PENDIENTE DE FIRMA` · titular **`PENDIENTE DE CONFIRMAR`** |

**Alcance declarado por Sam: sólo esas tres marcas.** Ninguna otra del ecosistema entra.

- **MCP-AUTH-01 mergeado y desplegado** — PR **#1** del repo `unrlvl-mail-mcp`, merge `350de4a`.
  **Verificado desde fuera:** `401` con `{"error":{"code":"MCP_UNAUTHORIZED"}}` y
  **`WWW-Authenticate: Bearer`**. En el código, `lib/auth.ts` compara en **tiempo constante** y
  **no degrada a abierto** si falta `MCP_AUTH_TOKEN`: sin la variable, el servidor falla.
- **Conector dado de alta en Claude.ai** — con `Authentication: None` y cabecera
  `Authorization: Bearer`, porque el servidor usa **token estático, no OAuth**. Las tres tools
  aparecen en esta sesión: ésa es la prueba, no el brief.
- **App de Google en Production** — branding completo, dominio `unrealvillestudio.com` autorizado,
  scope `gmail.readonly`. **Sin evaluación CASA, coste cero.**
- **Páginas legales publicadas.** `/legal/privacy` verificada en vivo: **200**, **v1.1 con fecha
  28 de agosto de 2026**, entidad **«Samuel Moreno Mendoza, sole proprietor»**, y el footer enlaza
  `/legal/privacy`, `/legal/terms` y `/es/legal/privacidad` — **ya no están huérfanas**. Su **§04**
  documenta el acceso de sólo lectura al buzón con la cláusula de **Limited Use de Google**: eso es
  lo que desbloqueó Production. `legal/a` borrado (PR #8).
- **Vercel Authentication retirada de `unrlvl-mail-mcp`** — medido `ssoProtection: false`.
  **Bloqueaba también al conector**, que no lleva sesión de Vercel. El andamio se retira **porque el
  código ya autentica**, que es el orden correcto: primero la cerradura, después quitar la puerta.
  **Se mantiene encendida en `unrlvl-supabase-mcp`** — medido `true` —, que sigue **sin
  autenticación en código** (SEC-01).
- **Bucket privado `mail-authorizations`** — creado a las 11:07:42 UTC, `public = false`, 10 MB,
  `application/pdf` · `image/jpeg` · `image/png`. **Los cinco buckets que ya existían no servían:**
  `unrlvl-media` y `product-assets` son **públicos**, y un documento firmado por el titular de un
  buzón no vive en un bucket público.
- **Dos políticas RLS nuevas** en el schema `mail`, medidas: `mail_mcp_select_mailboxes` y
  `mail_mcp_select_authorizations`, ambas `SELECT` y ambas para el rol `mail_mcp`.

### 🔴 MAIL-01 — El MCP no verifica de quién es el buzón que lee

`lib/tools.ts` estampa `address` **desde la fila de la base**, nunca desde el proveedor. Una
credencial mal atada **devuelve correo ajeno con la etiqueta correcta encima**.

**Ocurrió hoy en producción: NeuroneSCF sirvió la bandeja de UnrealvilleStudio. Sin error, sin
alerta, sin nada raro en la respuesta.** Ése es el punto — no falló, *mintió*.

**Verificado contra el código desplegado** (repo `unrlvl-mail-mcp`, `350de4a`):
`address: mailbox.address` en **cuatro** puntos (`lib/tools.ts:126,133,159,166`), y **cero
apariciones** de `assertMailboxIdentity`, `getProfile` o `MAILBOX_IDENTITY_MISMATCH` en todo el
repo.

**Arreglo:** `assertMailboxIdentity()` contrastando `users.getProfile` contra
`mail.mailboxes.address`, y código nuevo **`MAILBOX_IDENTITY_MISMATCH`**. La etiqueta debe salir de
quien la puede probar, no de quien la declara.

### 🔴 MAIL-02 — La caché de access token no se invalida al rotar la credencial

**Verificado:** `accessTokenCache` es un `Map` con clave **`session.mailbox_id` y nada más**
(`lib/providers/google_oauth.ts:145,151,199`), con TTL de `expires_in ?? 3600`.
**`vault.update_secret` no la toca**, y nada en la clave depende del refresh token.

**Tres rotaciones seguidas siguieron sirviendo el buzón anterior** hasta que un redeploy vació la
caché. Y **rotar una credencial es rutina** — pasa cada vez que un cliente cambie su contraseña —,
no una excepción que se pueda absorber con un redeploy manual.

**Arreglo:** clave = `mailbox_id` **+ huella del refresh token**. Cambia la credencial, cambia la
clave, muere la entrada. Sin invalidación explícita, sin ventana.

### 🔴 MAIL-03 — `forumphs-db` está fuera del mapa del ecosistema

**Medido con `list_projects` el 2026-08-28:** la cuenta de Supabase de UNRLVL (org
`tnqcrwmfxesiqxlhuzri`) contiene **`unrlvl-db` y `XMMs`, y nada más**. **`forumphs-db` no está ahí.**
Hay una **base de datos de cliente fuera del mapa del ecosistema, sin dueño declarado ni
dependencias conocidas**.

**Pendiente:** determinar **qué contiene** y **si algo del carril depende de ella**.

> _Reescrito el 2026-08-28 por **MAIL-PRIV-01**. Se conserva **sólo el hecho verificable de forma
> independiente** —la consulta a `list_projects`—, que es además la única vía por la que este ítem
> es anotable._

⚠️ **Dos matices medidos frente al brief** (HRD-R13):

1. **`forumphs-db` sí aparece mencionada** —en prosa— en `ecosystem.json` y en `AGENDA.md`, con su
   ref `tajuoqdbnsnzkhyqvdgs` (verificación del 2026-08-05 contra su `information_schema`). Lo que
   **no** tiene es **nodo propio**: el bloque `supabase` de `ecosystem.json` declara únicamente
   `main`. La afirmación exacta no es «no figura», es **«figura como mención y no como nodo»**.
2. **`XMMs` no aparece en `ecosystem.json` en absoluto.** Son **dos** proyectos sin declarar, no
   uno — y el segundo sí está dentro de la cuenta de UNRLVL, que es peor.

### 🟠 MAIL-04 — Códigos de error agrupados, y un log ciego por omisión

**Verificado:** `lib/errors.ts` declara **`MAIL_TOKEN_REVOKED`** y nada más para esta familia.
`invalid_grant` se mapea explícito (`google_oauth.ts:186-188`) **y el mismo código se reutiliza como
cajón de sastre** para cualquier otro fallo (`:225`). No existen `MAIL_CLIENT_CONFIG_INVALID` ni
`MAIL_TOKEN_EXCHANGE_FAILED`. **Costó tres iteraciones** averiguar qué fallaba de verdad.

**Y el diagnóstico es ciego por omisión, no por diseño:** `route.ts` llama a `logOp` en sus **dos**
puntos (`:151`, `:159`) **sin `mailbox_id`**, aunque el campo **existe** en `OpLog`
(`lib/log.ts:16`) y se serializa (`:27`). El dato estaba disponible y no se pasó.

**Arreglo:** separar en `MAIL_TOKEN_REVOKED` / `MAIL_CLIENT_CONFIG_INVALID` /
`MAIL_TOKEN_EXCHANGE_FAILED`, loguear el campo `error` que devuelve Google, y pasar `mailbox_id` en
las dos llamadas.

### 🚫 Ítem retirado — MAIL-PRIV-01 (2026-08-28)

Un ítem retirado el 2026-08-28 por **MAIL-PRIV-01**: vulneraba la **§5 del documento de
autorización**. **Notificado a Sam en el chat.**

### 🟠 FPHS-FORM — El formulario de `forumphs.com` no tiene protección anti-spam

**Comprobable visitando el sitio:** el formulario de `forumphs.com` **no tiene protección anti-spam**
— sin captcha, sin honeypot, sin filtro.

**Pendiente de verificar por prueba propia:** la **entregabilidad de `noreply@forumphs.com` hacia
buzones Gmail**, que encaja con el frente **DKIM/SPF** ya abierto.

> _Reescrito el 2026-08-28 por **MAIL-PRIV-01**. Se conserva lo comprobable desde fuera, y lo demás
> pasa de hallazgo a **tarea de verificación por vía propia**._

### 🟠 Autorizaciones — lo que la base dice literalmente

- **Titular de la cuenta de NSCF sin declarar** — así estaba al escribirse este bloque.
  ✅ **Cerrado el mismo 2026-08-28:** el titular declarado es **Patricia Osorio C.**
- **Documentos sin firmar** — así estaban al escribirse este bloque, con `document_path` en
  `PENDIENTE DE FIRMA`. ✅ **Cerrado el mismo 2026-08-28:** ambas autorizaciones **firmadas** —
  **Ivette Flores** (ForumPHs) y **Patricia Osorio C.** (NeuroneSCF), `signed_at = 2026-08-28`.
  **Queda pendiente subir el PDF** al bucket `mail-authorizations`.
  _El registro del consentimiento debe existir y se conserva: es quién autorizó qué, no
  correspondencia._
- **UnrealvilleStudio va como `AUTOTITULAR`** — cuenta propia, sin documento de terceros. Correcto y
  **definitivo**: no es un pendiente disfrazado.

### 🟡 Amarillos

- **Retirar `https://developers.google.com/oauthplayground`** de los redirect URIs del cliente OAuth.
  Fue andamio de alta; en Production es superficie de más.
- **TikTok Shop:** alta de vendedor de NSCF a medio completar.
- **`003_drop_brand_oauth_tokens.sql`** sigue pendiente, PR propio.
- **PR de limpieza:** sacar `projects/unrlvl-mail-mcp/` y `projects/UNRLVL_MAIL_MCP_HANDOFF.md` de
  `unrlvl-context`. Ya no son sólo andamio: son **una copia que puede divergir del repo real**.

### 🧭 El patrón del día

Los tres defectos son **la misma clase de fallo**: el sistema **afirma** algo que no **comprueba**.

| Defecto | Qué afirma | Qué no comprueba |
|---|---|---|
| MAIL-01 | de quién es el correo | que la credencial abra ese buzón |
| MAIL-02 | que el token es el vigente | que la credencial no haya rotado |
| MAIL-04 | cuál fue la causa del fallo | qué dijo Google exactamente |

**Ninguno rompe. Los tres mienten en silencio**, que es la forma cara — y es exactamente el mismo
diagnóstico que HRD-R11 dejó escrito para el carril el 25-ago: *el éxito se comprueba contra el
efecto, no contra la afirmación*.

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

> **📁 ARCHIVO HISTÓRICO.** Los ítems **completados hace más de 30 días y sin referencias activas** se mueven a **`historical_AGENDA.md`** (raíz del repo). El barrido corre en **cada Actualiza** (HRD_PROTOCOL §HRD_ACTUALIZA paso 10) y **siempre se propone a Sam antes de mover nada**. Si buscas un ítem cerrado que no aparece aquí, está allá con su texto íntegro. El tamaño de este archivo NO es criterio de archivado: si todo está pendiente, no se archiva nada.
>
> **"Sin referencias activas" — aclarado 2026-08-06 (def. completa en `historical_AGENDA.md`).** *Referencia activa* = dependencia viva: un ítem ABIERTO/pendiente que depende del candidato, o estado vivo en `ecosystem.json` (tabla/EF/vista/campo que existe hoy), o una mención en `AGENDA.md` **fuera de la zona de completados**. Una mención en un `session_log.md` fechado **NO** cuenta — es historia append-only. (Sin esta aclaración, cualquier mención en un log retendría todo para siempre.)
- ✅ **Cierre 2026-08-16 — Scheduler, snapshots, queue y canónico de `CLAUDE.md` (4 ítems, todos por VÍA ALTERNA · condición 4 de `skills/context-resolver/SKILL.md` §2).**
  - **`5e-1` content-scheduler — CERRADO.** RESUELTO POR VÍA ALTERNA — el plan decía *especificar* el Scheduler (EF+cron 1×/día ET); se **construyó** (PR #57), se **corrigió** (#59, #60) y está **desplegado v2.1**. Verificado sobre la EF desplegada el 2026-08-16. **Gotcha registrado:** se desplegó primero con `verify_jwt: true` y el gateway rechazaba **antes de llegar al código** (`UNAUTHORIZED_NO_AUTH_HEADER`) — el carril autentica por `x-cron-secret`, no por JWT; quedó en `false`. **Residuo abierto:** el alta del cron, pendiente de verificación con candidatas reales (ver `## 🔵 Próximas semanas`).
  - **Cron `build_all` — CERRADO.** RESUELTO POR VÍA ALTERNA — la AGENDA lo declaraba *"nunca ha corrido"*; la verificación contra `cron.job` mostró que **el cron nunca existió**: no era un cron roto, era un cron ausente. Se creó (**jobid 51**, `brand-snapshot-build-all-3h`, `0 */3 * * *`) y la cobertura pasó a **13/13 snapshots**. El constructor único es la EF nueva `brand-snapshot-builder` v1. Verificado el 2026-08-16.
  - **`5s` limpieza de queue — CERRADO.** No era ítem de `AGENDA.md` (vivía en `r4b_status.pending` de `ecosystem.json` y en el dry-run); se cierra con el **archivo del dry-run** (`protocols/archive/DRYRUN_PLAN_IID_PILOT.md`, PR #44), cuya premisa ya había muerto: `.limit(1)` retirado y queue limpia (0 filas con `brand_id` NULL). Se registra acá para que el cierre quede en la capa ESTADO y no sólo en el JSON.
  - **`LAB-AUDIENCE-BRIEF` — el literal no existe (corregido contra la DB, 2026-08-16).** La fila es `lab_key = audience_brief` en `public.lab_configs`, y **no hay columna `lab_id`**. Quedó `active=false`, `supports_iid=false`; cadena IID verificada: `copylab` 1 → `aife` 2 → `imagelab` 3 → `sociallab` 4.
  - **D1 de ARQUITECTURA — CERRADO (ya declarado en el PR #44).** `.github/CLAUDE.md` es el canónico; `/CLAUDE.md` queda legacy y se poda en PR aparte. Ver `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §4 y §11 y `skills/context-resolver/SKILL.md` §6.1. Se anota acá porque el cierre no figuraba en la zona de completados de este archivo.
  - **NO cerrado — `5e-2` embeddings: PARCIAL.** `intel.content_embeddings` creada (`vector(768)` + HNSW + GRANT `service_role`), pero los gates 1 y 5 del Watcher **siguen sin cablear a pgvector**. **Parcial es abierto, sin excepción** — se queda en `## 🔵 Próximas semanas` con ese alcance exacto.

- ✅ **Siembra de 4 ejes + PatriciaOsorio.com + regla dura de voz (11-jul).** (1) 4 EJES SEMBRADOS en intel.calibration_sessions (active, 0 turnos, operator Sam): D7Herbal editorial (ciencia botánica accesible, comprensión con fundamento); NSCF editorial "Hair Intelligence" (DESTILADO DE LOS 4 ARTÍCULOS REALES del blog neuronescflorida.com: arquitectura = desmontar atribución equivocada → mecanismo con dato duro → la solución es de SECUENCIA → producto entra tarde → frecuencia accionable → cierre aforístico; badge de Patricia sin currículum como PUERTA al recorrido); NSCF professional "la Técnica de marca" (70% oficio / 30% producto-como-INSTRUMENTO, no de venta; el rol que el gremio conoce y espera; test: el 70% debe ser útil sin comprar nada); PatriciaOsorio.com (autoridad de industria + propósito de CONECTAR, audiencia amplia de 4 públicos). #54 CUBIERTO. (2) PATRICIAOSORIO.COM CREADA VÍA ALIAS: se reutilizó la fila PatriciaOsorioPersonal (verificado: sin genoma/topics/sesión/url — nadie la usaba); ID técnico INTACTO, nombre real en display_name + domain → CERO FKs, CERO código → DESACTIVA LA PARTE PELIGROSA DE #69. (3) REGLA DURA DE VOZ transversal: LA VOZ DEMUESTRA, NUNCA DECLARA (ni promesas ni credenciales; el dato preciso ES la credencial); embebida en los 4 ejes; 2 violaciones detectadas en prod (header blog NSCF; genoma po_consumer). (4) VivoseMask convergió (15 turnos) → pendiente destilar. (5) HALLAZGO: brand_scope de seeders vive en el secret USERS_RAW de iid-inbound, NO en la DB → Marisol no ve PatriciaOsorio.com hasta agregarla ahí. Professor: 8 learnings. — 2026-07-11
- ✅ **Sesión bucle Boids — E7 GenomePromptBuilder + E5c + genoma D7Herbal (10-jul).** (1) E7 (PR #10 MERGEADO): el generador de /api/calibrate.ts ensambla el contexto REAL de la marca desde Supabase (5 capas: identidad brands / voz brand_copy_profiles / fórmula product_blueprints / servicios brand_services / dirección founder_axis), degradación elegante por capa, regla dura de veracidad, max_tokens→2048. Mata la alucinación (D7H inventaba Serenoa repens; ahora nombra los 7 reales: Clavo/Canela/Anís/Jengibre/Quina/Romero/Ron). Módulo api/_genomePromptBuilder.ts. GRANT SELECT product_blueprints+brand_services→service_role. 2 bugs resueltos: import ESM sin .js (FUNCTION_INVOCATION_FAILED, build engaña quedando READY) + order=is_primary sobre product_blueprints (columna inexistente→400 tragado por safeRead→capa muda). (2) E5c (PR #11 MERGEADO 10-jul): convergencia extensible — 10+3SÍ sugiere (flag can_converge) en vez de forzar; acción converge explícita + guardia 409; botón "Cerrar y calibrar voz"; quién cerró en notes jsonb; racha sobre turnos juzgados ignorando el pendiente. (3) GENOMA D7HERBAL (chat/HRD, escrito a prod): bucle fb0b08ab convergido (10 turnos, 4 SÍ), d7herbal_conversion v1.0 ACTIVO en brand_voice_genome; parche blueprint (Ron = 7º activo botánico); voz = honestidad en la estructura (testimonio/días/ingrediente real) no en disclaimer. D7H = 1ª marca calibrada end-to-end por el sistema completo. 8 genomas activos ahora (+D7Herbal). Nueva capacidad: CC tiene browser (cerraría el smoke de UI logueada). Professor: 10 learnings. — 2026-07-10
- ✅ **Siembra de EJES FUNDADORES desde la DB — 5 marcas de Marisol (6-jul).** Método nuevo validado (intuición de Sam): las marcas ya tienen datos ricos en Supabase que sirven de punto de partida del bucle Boids, sin que Marisol capture una técnica primero (resuelve el hueco from_genome de #65). Flujo: Claude lee tablas de la marca → propone eje fundador → Sam corrige con su criterio → se siembra como fila en intel.calibration_sessions (founder_axis jsonb, status active, 0 turnos). 5 sembradas: D7Herbal (fb0b08ab), VizosCosmetics (ad03ff4e), VivoseMask (4ccc4f74), VizosSalon/PatriciaOsorioVizosSalon (455ab6ce), PatriciaOsorioConectando. Mapa de 6 voces diferenciadas (ninguna se funde pese a compartir casa/persona/categoría): NSCF conversión-filo · D7H contención-botánica · Vizos institucional-maison · Vivosé sensorial · VizosSalon profesional-anfitriona · Conectando íntima-latina. Vizos Cosmetics: DB corregida (era falsa). Consolidación de IDs PO mapeada (#69). La DB da el PUNTO DE PARTIDA, no el genoma (ese sigue necesitando el criterio de Sam en el bucle). Professor: 7 learnings. Próximo: correr bucles → genomas; Operación B. — 2026-07-06
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