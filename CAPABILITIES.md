# CAPABILITIES — Unrealville Studio
_Versión: 1.19 · 2026-09-20 (**tres adiciones medidas y ninguna derogación.** (1) **EL PROFESSOR SE OPERA DESDE CC, Y APROBAR ES UN SEGUNDO PASO** [`medido` por CC el 2026-09-20, seis llamadas, las seis **HTTP 200**]: el proxy `api/professor` se alcanza con **`Vercel:web_fetch_vercel_url`** —**nunca `curl`**, ver 1.10— y **acepta GET con los parámetros en la cadena de consulta**, incluidos `action=submit-learning` y **`action=approve-learning`**, que hasta hoy no estaba medido desde CC. Lo que este catálogo **no decía y cuesta un ciclo**: `professor-submit-learning` escribe **SIEMPRE `approved_by_sam: false`**, así que sembrar un learning **no lo aprueba** — la aprobación es una segunda llamada con `learning_id` y `approved=true`, y el valor viaja como **cadena** que PostgREST coerciona al booleano [verificado leyendo la fila después]. **Amplía el punto (2) del 1.18, no lo deroga.** (2) **`professor-submit-learning` YA NO devuelve 500, y el `relevance_score` no se pasa: lo calcula la EF** con `claude-haiku-4-5-20251001` aplicando su filtro F1→F2→F3, y devuelve además `filter_reason`, `category`, `learning_type` y `suggested_path` [`medido`: seis learnings del 2026-09-20, los seis `filter_passed: true` y `relevance_score: 5`]. Esto **cierra la entrada del 1.13 punto (6)** —el 500 por valor fuera del `CHECK`— y **precisa la del 1.17 punto (1)**: hoy pasar el score explícito no hace falta. **Advertencia que sí queda viva:** la EF escribe una **taxonomía de `category` distinta** (`platform`/`client`/`ecosystem`/`core-business`) de la que usan las siembras por `INSERT` directo (`arquitectura`, `metodo`, `gobernanza`, `datos`…), así que **la tabla tiene dos vocabularios según quién escriba** [`medido` el 2026-09-20: **183 categorías distintas sobre 1.127 filas** en `professor_learnings`]. No se unifica aquí: se declara. (3) **UNA EDGE FUNCTION DESPLEGADA PUEDE NO TENER FUENTE EN NINGÚN REPOSITORIO, Y ESO DESVÍA EL DIAGNÓSTICO** [`medido` el 2026-09-20]: `iid-approval-digest` llevaba **ACTIVA en producción desde julio en su versión 28**, disparada por un cron, y **su código no existía en ninguna rama** — un barrido por `unrlvl-iid-functions` buscando el texto de su correo no la encontraba, así que sus dos defectos se atribuyeron **durante días al repositorio equivocado**. **La comprobación que lo cierra, y va antes de concluir dónde vive un comportamiento: `Supabase:list_edge_functions` contra `supabase/functions/`.** Una EF desplegada que no está en el repo es un **hallazgo**, y lo primero que se hace con ella es **adoptarla** — sin fuente en git no se puede revisar, ni versionar, ni corregir por PR. **Lo que NO entra, y la razón queda escrita:** la regla «`EXPLAIN` planifica, no ejecuta» **no se copia aquí** — es método de medición y su sitio es `protocols/MEASUREMENT_METHOD_RULE.md`, que este catálogo apunta desde el 1.13; lo único nuevo de hoy es su variante sobre **escrituras** (`NOT NULL`, `GENERATED`, `CHECK` no los ve ningún plan), y duplicar el enunciado aquí crearía dos textos de la misma regla. **Cabecera anterior (`1.18`) conservada íntegra e inmediatamente debajo**, por yuxtaposición)_
_Versión: 1.18 · 2026-09-17 (**tres adiciones medidas y ninguna derogación.** (1) **CC NO PUEDE ESCRIBIR SECRETOS NI VARIABLES DE ENTORNO — LAS CARGA SAM** [medido por CC el 2026-09-16 y el 2026-09-17]: el MCP de Supabase expone `execute_sql`, `apply_migration` y `deploy_edge_function` y **ninguna gestiona secretos**; el de Vercel hace despliegues, proyectos, logs y `web_fetch_vercel_url` y **no escribe variables de entorno**; y no hay CLI instalada ni token para autenticarla. Lo que CC hace es **nombrar la clave y verificar por efecto después**. Motivo: el 2026-09-17 un PR asignó a CC la carga de dos secretos para la que no existe tool y **se perdió el ciclo entero**. (2) **Professor desde el chat: la vía operativa es `submit-learning`** — el proxy acepta también **GET con los parámetros en la cadena de consulta**, `action=submit-learning` **persiste** y devuelve `learning_id`, `relevance_score` y `filter_reason`, y **`action=checkpoint` devuelve `candidates: []` y NO persiste nada** [`medido` por Claude.ai el 2026-09-17; CC no lo midió]. **Añade a la corrección del 1.17, no la deroga.** (3) **Exposición de un esquema en PostgREST: el sitio autoritativo es `authenticator.rolconfig → pgrst.db_schemas`**, no la respuesta de la API ni la pantalla del panel, y **exponer son DOS señales** —`reload config` para la lista y `reload schema` para la caché de tablas—, entre las cuales el error pasa de **406 `PGRST106`** a **404 `PGRST205`** con un `hint` que desorienta; **lo cambia Sam desde el panel**, porque el panel reescribe esa lista. Fuente del mecanismo: `CC_PROTOCOL.md` §13, que esta entrada **apunta y no copia**. **Lo que NO entra, y la razón queda escrita:** la advertencia condicional sobre desfase entre el panel de Data API y la base **no se escribe** — panel y base **coinciden** [medido por CC y verificado por Sam el 2026-09-17], así que dejarla sería **plantar un aviso falso** en un archivo de referencia. **Cabecera anterior (`1.17`) conservada íntegra e inmediatamente debajo**, por yuxtaposición)_
_Versión: 1.17 · 2026-09-13 (**tres correcciones medidas el mismo día, y las tres retiran una afirmación que había dejado de ser cierta — ninguna se borra: las tres se archivan bajo guard `⛔ NO OPERATIVO` con su texto literal.** (1) **El proxy `api/professor` SÍ acepta POST**, y `action=submit-learning` funciona pasando **`relevance_score` explícito dentro del `1..5` del `CHECK`**: el `500` documentado el 2026-09-10 lo producía la EF calculando el valor **fuera de rango**, así que la causa raíz era correcta y **la conclusión que se sacó de ella no** — de «el `CHECK` rechaza el valor» se pasó a «no se puede por el proxy» sin medir la regla [reportado — Claude.ai, 12 learnings sembrados por esa vía el 2026-09-13 entre 13:47 y 13:49 UTC; **corroborado por CC**: 12 filas con `session_date = '2026-09-13'`, las 12 con `relevance_score = 5`, y el `CHECK` sigue siendo `>= 1 AND <= 5`]. (2) **La misma corrección retira la entrada que decía que el proxy sólo exponía GET.** (3) **El `REVOKE` sobre `intel.match_content_embeddings` ya está aplicado**: el ACL medido es `{postgres=X/postgres,service_role=X/postgres}` y `anon` y `authenticated` quedan en **falso** — la advertencia que la fila `p_match_domain` llevaba unas horas antes **se archiva**, con su reversión escrita al lado. **Cabecera anterior (`1.16`) conservada íntegra e inmediatamente debajo**, por yuxtaposición)_

_Versión: 1.16 · 2026-09-13 (**tres adiciones medidas y ninguna derogación: el despliegue deja de verificarse por el contador, y el corte de duplicación entra al catálogo.** (1) **Sección DESPLIEGUE nueva — «mergear no despliega, y desplegar tampoco despliega necesariamente lo mergeado»**: cinco de ocho despliegues del 2026-09-13 subieron **el bundle anterior** por correr desde un clon sin `git pull` [reportado — brief de cierre del 2026-09-13], con el contador de versión y `updated_at` subiendo igual porque suben **con el intento**; la única señal que no miente es el `ezbr_sha256`, y lo que cierra el caso es **leer un marcador dentro del bundle**. Extiende la regla 4 de MÉTODO DE MEDICIÓN sin copiarla. (2) **Dos filas nuevas en ARTEFACTOS CONSULTABLES**: `intel.brand_similarity_threshold` —el corte de duplicación por marca × clase de par, con su política de congelado escrita en el `COMMENT` de la tabla— y el parámetro **`p_match_domain`** del RPC `intel.match_content_embeddings`, **una sola firma** con `DEFAULT true` [medido 2026-09-13]. (3) **La cita caducada sobre el texto adaptado NO se vuelve a tocar**: la cerró el **PR #95** y su redacción anterior ya está bajo guard `⛔ NO OPERATIVO` [medido] — archivar dos veces lo archivado duplica la historia en vez de preservarla. **Cabecera anterior (`1.15`) conservada íntegra e inmediatamente debajo**, por yuxtaposición, igual que desde `1.13`: el diff de este archivo **no borra ni una línea**)_

_Versión: 1.15 · 2026-09-12 (**cuatro adiciones medidas y ninguna derogación: el regulador de entrada se vuelve consultable, y una vía de cron que el brief daba por buena NO funciona.** (1) **Cómo se lee la cobertura del carril** — `intel.v_carril_cobertura`, una fila por marca × canal activo, con `cobertura` = stock disponible menos franjas comprometidas sin pieza. (2) **Cómo se sube el volumen: SE SUBE EL MARGEN, NUNCA LA CADENCIA** — `intel.brand_production_margin`, acotado por `margin_max`. Son **tres números con tres dueños** y confundirlos contamina una decisión editorial con una falta puntual. (3) **Cuál de las fuentes de cadencia MANDA: `intel.brand_cadence`** — `brand_topics.cadence` es **LEGACY por comentario de columna** desde el 2026-09-11 y **no se borra** hasta medir que ningún consumidor la lea; `intel.brand_publish_policies` dice **cuándo**, no **cuántas**. (4) **`UPDATE cron.job SET active = false` es rechazado en este proyecto** con `permission denied for table job` [medido el 2026-09-12]: la vía que funciona es **`cron.alter_job(jobid, active := false)`** con el `jobid` que devuelve `cron.schedule`. Una migración que apague crons por `UPDATE` **falla entera**) · la cabecera anterior (`1.14`) queda intacta e inmediatamente debajo, con su cadena completa_

_Versión: 1.14 · 2026-09-10 (**una adición medida, ninguna derogación: LOS DOS LIBROS MAYORES DE UNA PUBLICACIÓN TIENEN AUTORIDAD DISTINTA Y NO ESTABA ESCRITO.** `intel.brand_publish_drain_log` registra **intentos**; `public.scheduled_posts` registra el **estado final**; **manda `scheduled_posts`**. Medido el 2026-09-10 sobre una publicación de LucienSael en `meta_fb` que aparece con **dos `platform_post_id` distintos** separados por 1 h 16 min — el del `drain_log` es un intento que ya no existe en la red, y su fila dice `PUBLISHED` sin nada que lo delate. Quien le pregunte al registro de intentos por el estado final se lleva el id de un post borrado. Es la misma familia de defecto que «0 filas ≠ no existe» (2026-09-08) y que «`NULL` ≠ `0`» del frente de costo) · base previa: 1.13 · 2026-09-09 (**una corrección de estado y siete adiciones medidas; ninguna derogación silenciosa.** (0) **CORRECCIÓN: el cron 66 `content-placement-poll` NO está apagado — está ACTIVO, `*/15`** [medido el 2026-09-10 contra `cron.job`]. Este catálogo lo declaraba APAGADO desde el 2026-08-26 mientras `AGENDA.md` v2026-09-06-v1 ya lo daba por activo: **el catálogo iba por detrás de la agenda**, y la redacción anterior queda archivada bajo guard `⛔ NO OPERATIVO` en su sitio, no borrada. Lo que sigue vigente de ella es **la advertencia PUB-01**, no el estado. Adiciones: (1) **Storage rechaza `SUPABASE_SERVICE_ROLE_KEY`** —formato `sb_secret_`— con `Invalid Compact JWS`; la que sirve es `SERVICE_ROLE_JWT`, y se reconoce porque **empieza por `eyJ`**. (2) **Subir una foto a Meta con `published=false` exige token DE PÁGINA**, que se canjea en `/{page_id}?fields=access_token` con el `system_token` de `meta_accounts` resuelto por `brand_id`. (3) **ImageLab: `/api/execute` NO compone texto** —el overlay está en `/api/compose`, son dos llamadas por frame, `execute` usa `brandId` y `compose` usa `brand_id`, `preset_id` es eco y el preset se resuelve por `(brand_id, canal)`, `markers` va en la raíz— y **ninguno de los dos sube al bucket**. (4) **`gemini-2.5-flash-image` no acepta `4:5`**: devuelve `896x1152`, y para `1080x1350` hay que recortar y escalar ANTES de componer. (5) **Los blogs son un modelo de lectura**: publicar es cambiar el estado, y por eso `PROVIDER_NOT_DRAINABLE` es correcto por diseño en `vercel_html`. (6) **`api/professor` con `action=submit-learning` devuelve 500** porque la EF calcula un `relevance_score` fuera del `CHECK` de 1 a 5 [medido con `pg_get_constraintdef`]; el fallback es el `INSERT` directo. (7) **No existe el estado `approved`**: aprobar escribe `status = 'scheduled'` con `approved_by` [medido: los ocho valores del `content_pieces_status_check`]) · base previa: 1.12 · 2026-09-08 (**tres adiciones medidas y ninguna derogación.** (1) **`Supabase:query_logs` sobre UNRLVL lee `edge_logs` de PostgREST**, y fue **la única vía** para diagnosticar un `PATCH 403` que la aplicación atrapaba a propósito: la tabla no podía delatarlo —`open_count = 0` era compatible con «no se abrió» y con «se abrió y el registro falló»— y el log del proveedor sí, porque es una fuente distinta de la que el fallo silenció. (2) **El proxy `api/professor` sólo expone GET**: el checkpoint **no se siembra por ahí**, se siembra con `execute_sql` sobre `professor_learnings`. Buscar un POST en el proxy y no encontrarlo no significa que no haya vía. (3) **Un conector MCP reconectado NO entra en caliente a una sesión abierta**: si un servidor se cae y vuelve, sus tools no reaparecen en la sesión en curso, y planificar contando con ellas es contar con un acceso que no está. Se replantea la vía o se declara el bloqueo) · base previa: 1.11 · 2026-09-02 (**una adición y ninguna derogación: el repositorio `unrealvillestudio-hub/BluePrints` entra al catálogo** —395 archivos, fuente de la identidad **visual** de cada marca (`BP_BRAND_*`, paletas, logos, tipografía)—, **con sus dos advertencias, que son parte de la capacidad y no una nota al pie**: NO es fuente para las firmas, y el `BP_BRAND` de UnrealvilleStudio **está desactualizado**. Una fuente canónica desactualizada es peor que una ausente porque **parece autoridad**. Motivo medido el 2026-09-02: no figuraba ni aquí ni en `ecosystem_filemap.md`, y **se trabajó media sesión reconstruyendo lo que ya estaba escrito ahí**) · base previa: 1.10 · 2026-08-29 (dos precisiones medidas el mismo día. (1) `protocols/DELIVERY_AND_VERIFICATION_RULE.md` pasa a **carga obligatoria en apertura** —paso `3-quater` de `HRD_PROTOCOLO_ACTUALIZACION`— con **fila propia en el panel**: una regla de forma que se consulta al final llega tarde, y además ese documento especifica el panel. (2) **Cómo alcanza CC una URL de Vercel**: `curl` da **403 en CONNECT**, la tool MCP `Vercel:web_fetch_vercel_url` da **200** — dos vías distintas, sólo una funciona, y declarar Vercel inalcanzable tras probar sólo `curl` es afirmar sin medir por la vía que existe) · base previa: 1.9 · 2026-08-29 (`protocols/DELIVERY_AND_VERIFICATION_RULE.md` v1.0 — REGLA INVIOLABLE nueva, listada en ARTEFACTOS CONSULTABLES: bloques con destinatario declarado y marca visual **por superficie** —emoji en chat, `●` con hex en documento o UI con estilos, y el diferenciador existe para que Sam lea, no para que CC ejecute—, idioma ES/EN neutro internacional **sin voseo**, etiqueta de evidencia `medido`/`reportado`/`deducido`, **panel de carga verificada** en la apertura de sesión —una fila sin evidencia es roja— y las **cuatro QA** con estatus HRD por `HRD-R15`, donde `QA-INFO` es un bloqueo. Este catálogo es punto de carga nº 4 de esa regla y **no la copia**: apunta a la fuente única) · base previa: 1.8 · 2026-08-28 (`unrlvl-mail-mcp` OPERATIVO: autenticado con MCP-AUTH-01 —401 verificado—, conector dado de alta en Claude.ai y tres buzones activos; y sus tres defectos abiertos, MAIL-01 / MAIL-02 / MAIL-04, que el catálogo declara porque cambian CÓMO se usa la capacidad) · base previa: 1.7 · 2026-08-27 (MCP de correo de clientes `unrlvl-mail-mcp` — tres tools de lectura, papelera excluida, sin persistencia de contenido; y el estado de autenticación de los cuatro MCPs, medido el 2026-08-28: SEC-01 abierto en código, mitigado en infraestructura) · base previa: 1.6 · 2026-08-26 (ángulos por dominio, aplazamiento por duplicación, arbitraje con tasas de falso positivo medidas, `pass_type` clean/assisted, backfill de firma; y la advertencia PUB-01 — el carril coloca pero todavía no se puede afirmar que publica) · base previa: v1.5 · 2026-08-25 (capacidades nuevas del carril: modo `placement`, `gate9Language`, corrector determinista pre-juicio, retención por desacuerdo, edición con registro de diff, backfill de embeddings) · base previa: v1.4 (2026-08-18) · base previa: v1.3 (2026-08-07), cuerpo conservado íntegro · Mantenido por: Claude

_Versión: 1.13 · 2026-09-09 (**una adición y ninguna derogación: las reglas de método de medición entran al catálogo como sección propia**, con **puntero** a `protocols/MEASUREMENT_METHOD_RULE.md` y **una línea por regla, nunca el texto** — dos textos de la misma regla son dos reglas en cuanto alguien toca uno. Son **cuatro**: `storage.objects` en vez de `HEAD` · el `000` se resuelve en el estado del proxy, no interpretándolo · todo barrido lleva control conocido-vivo · y la cuarta, nueva y específica de despliegues, **`ezbr_sha256` y no el contador de versión** —medido el 2026-09-08: un deploy subió el mismo bundle y el sufijo del `entrypoint_path` cambió igual—, que entra como **§4 del protocolo** y no vive suelta acá)_
> **Cabecera anterior (`1.12`) conservada íntegra e inmediatamente debajo.** La cadena de versiones
> de este archivo se venía encadenando **dentro** de una sola línea con `base previa:`, y eso obliga
> a sustituir esa línea en cada actualización. Acá se conserva **por yuxtaposición**: la línea nueva
> arriba, la anterior intacta debajo, con su propia cadena `base previa:` completa. El diff de este
> archivo **no borra ni una línea**, que es lo que exige `CC_PROTOCOL.md` §0 y lo que pedía la
> verificación del brief.

_Versión: 1.12 · 2026-09-08 (**tres adiciones medidas y ninguna derogación.** (1) **`Supabase:query_logs` sobre UNRLVL lee `edge_logs` de PostgREST**, y fue **la única vía** para diagnosticar un `PATCH 403` que la aplicación atrapaba a propósito: la tabla no podía delatarlo —`open_count = 0` era compatible con «no se abrió» y con «se abrió y el registro falló»— y el log del proveedor sí, porque es una fuente distinta de la que el fallo silenció. (2) **El proxy `api/professor` sólo expone GET**: el checkpoint **no se siembra por ahí**, se siembra con `execute_sql` sobre `professor_learnings`. Buscar un POST en el proxy y no encontrarlo no significa que no haya vía. (3) **Un conector MCP reconectado NO entra en caliente a una sesión abierta**: si un servidor se cae y vuelve, sus tools no reaparecen en la sesión en curso, y planificar contando con ellas es contar con un acceso que no está. Se replantea la vía o se declara el bloqueo) · base previa: 1.11 · 2026-09-02 (**una adición y ninguna derogación: el repositorio `unrealvillestudio-hub/BluePrints` entra al catálogo** —395 archivos, fuente de la identidad **visual** de cada marca (`BP_BRAND_*`, paletas, logos, tipografía)—, **con sus dos advertencias, que son parte de la capacidad y no una nota al pie**: NO es fuente para las firmas, y el `BP_BRAND` de UnrealvilleStudio **está desactualizado**. Una fuente canónica desactualizada es peor que una ausente porque **parece autoridad**. Motivo medido el 2026-09-02: no figuraba ni aquí ni en `ecosystem_filemap.md`, y **se trabajó media sesión reconstruyendo lo que ya estaba escrito ahí**) · base previa: 1.10 · 2026-08-29 (dos precisiones medidas el mismo día. (1) `protocols/DELIVERY_AND_VERIFICATION_RULE.md` pasa a **carga obligatoria en apertura** —paso `3-quater` de `HRD_PROTOCOLO_ACTUALIZACION`— con **fila propia en el panel**: una regla de forma que se consulta al final llega tarde, y además ese documento especifica el panel. (2) **Cómo alcanza CC una URL de Vercel**: `curl` da **403 en CONNECT**, la tool MCP `Vercel:web_fetch_vercel_url` da **200** — dos vías distintas, sólo una funciona, y declarar Vercel inalcanzable tras probar sólo `curl` es afirmar sin medir por la vía que existe) · base previa: 1.9 · 2026-08-29 (`protocols/DELIVERY_AND_VERIFICATION_RULE.md` v1.0 — REGLA INVIOLABLE nueva, listada en ARTEFACTOS CONSULTABLES: bloques con destinatario declarado y marca visual **por superficie** —emoji en chat, `●` con hex en documento o UI con estilos, y el diferenciador existe para que Sam lea, no para que CC ejecute—, idioma ES/EN neutro internacional **sin voseo**, etiqueta de evidencia `medido`/`reportado`/`deducido`, **panel de carga verificada** en la apertura de sesión —una fila sin evidencia es roja— y las **cuatro QA** con estatus HRD por `HRD-R15`, donde `QA-INFO` es un bloqueo. Este catálogo es punto de carga nº 4 de esa regla y **no la copia**: apunta a la fuente única) · base previa: 1.8 · 2026-08-28 (`unrlvl-mail-mcp` OPERATIVO: autenticado con MCP-AUTH-01 —401 verificado—, conector dado de alta en Claude.ai y tres buzones activos; y sus tres defectos abiertos, MAIL-01 / MAIL-02 / MAIL-04, que el catálogo declara porque cambian CÓMO se usa la capacidad) · base previa: 1.7 · 2026-08-27 (MCP de correo de clientes `unrlvl-mail-mcp` — tres tools de lectura, papelera excluida, sin persistencia de contenido; y el estado de autenticación de los cuatro MCPs, medido el 2026-08-28: SEC-01 abierto en código, mitigado en infraestructura) · base previa: 1.6 · 2026-08-26 (ángulos por dominio, aplazamiento por duplicación, arbitraje con tasas de falso positivo medidas, `pass_type` clean/assisted, backfill de firma; y la advertencia PUB-01 — el carril coloca pero todavía no se puede afirmar que publica) · base previa: v1.5 · 2026-08-25 (capacidades nuevas del carril: modo `placement`, `gate9Language`, corrector determinista pre-juicio, retención por desacuerdo, edición con registro de diff, backfill de embeddings) · base previa: v1.4 (2026-08-18) · base previa: v1.3 (2026-08-07), cuerpo conservado íntegro · Mantenido por: Claude

---

## QUÉ ES ESTE ARCHIVO

Catálogo de lo que Claude **puede hacer** en este ecosistema y **cómo invocarlo**. Se carga en el arranque (después de INDEX, antes de preguntar marca). Es un **mapa, no contenido**: dice qué existe, cuándo aplica, dónde está el detalle, y qué preguntar antes de usar. Claude NO carga ninguna de estas capacidades en el arranque — solo sabe que existen y las invoca cuando la tarea lo pide.

**Regla de oro:** si Claude cree que "no tiene acceso" a algo (un repo, un dato, una herramienta), primero consulta este catálogo. La mayoría de las veces el acceso existe por una vía que no es obvia.

---

## ACCESO A REPOS — GitHub Proxy (CRÍTICO, SIEMPRE DISPONIBLE)

> **Cómo alcanza CC una URL de Vercel — medido el 2026-08-29.** `curl` y cualquier fetch HTTP genérico
> devuelven **403 en CONNECT** contra `*.vercel.app`: el proxy de egreso de CC los bloquea. La tool MCP
> **`Vercel:web_fetch_vercel_url` devuelve 200 con el cuerpo completo** sobre el mismo dominio. Son dos
> vías distintas y sólo una funciona. **CC usa siempre la tool, nunca `curl`**, y sólo declara Vercel
> inalcanzable si la tool no está en la sesión. Detalle y evidencia: `protocols/CC_PROTOCOL.md` §0 bis.1.

**El acceso a TODOS los repos es vía proxy gh, NO vía un conector MCP de GitHub.** No existe conector de GitHub en las tools — buscarlo y no encontrarlo NO significa que no haya acceso. El proxy es la vía:

```
Vercel:web_fetch_vercel_url →
https://unrlvl-context.vercel.app/api/gh?action=[tree|file|repos]&repo=[REPO]&path=[PATH]
```

- `action=repos` → lista todos los repos de la org
- `action=tree&repo=X` → árbol de archivos del repo X
- `action=file&repo=X&path=/ruta/archivo.md` → contenido de un archivo

**Importante:** las rutas tipo `unrlvl-context.vercel.app/brands/...` NO se sirven como estáticos (dan 404). Los directorios y archivos internos del repo SOLO se leen por el proxy gh con `action=file`. Si un path da 404 por HTTP directo, usar el proxy gh — no concluir "no hay acceso".

**Referencia:** `skills/github-auditor/SKILL.md` · `skills/vercel/SKILL.md`
**Regla URLs Vercel:** SIEMPRE `Vercel:web_fetch_vercel_url`, nunca web_fetch normal.


### `BluePrints` — la identidad visual de cada marca ya está escrita (añadido 2026-09-02)

**`unrealvillestudio-hub/BluePrints` · 395 archivos.** Es la fuente de la **identidad visual** por marca:
los `BP_BRAND_*` (JSON = FUENTE, HTML = RENDER), las paletas, los logotipos y la tipografía. Ruta por
marca: `brands/[Marca]/`. Se lee por el proxy gh como cualquier otro repo:

```
Vercel:web_fetch_vercel_url →
https://unrlvl-context.vercel.app/api/gh?action=tree&repo=BluePrints
https://unrlvl-context.vercel.app/api/gh?action=file&repo=BluePrints&path=/brands/Unrealville/BP_BRAND_UNRLVL_v1.3.json
```

> ⚠️ **Dos advertencias, y son parte de la capacidad.**
>
> 1. **NO es fuente para las firmas.** La firma de marca no se toma de aquí. Su mecanismo vive en
>    `assets.builder_meta.signature_closer` (estampado tras el `PASS` del Watcher) y su eje de dato, en
>    el genoma de voz — con la relación entre ambos **todavía sin resolver** (`AGENDA.md`).
> 2. **El `BP_BRAND` de UnrealvilleStudio está desactualizado.** Leerlo como estado vigente es leer una
>    foto vieja con cara de documento canónico. **Una fuente canónica desactualizada es peor que una
>    ausente porque parece autoridad**: la ausente hace preguntar, la desactualizada hace afirmar.
>
> **Por qué esta fila existe:** el repo no figuraba en este catálogo ni en `ecosystem_filemap.md`, y el
> 2026-09-02 **se trabajó media sesión reconstruyendo identidad de marca que ya estaba escrita ahí**.
> Es exactamente el caso que la regla de oro de arriba describe: el acceso existía por una vía que no era
> obvia, y no consultarlo costó tiempo. [medido]

**Nota de nomenclatura:** la carpeta de UnrealvilleStudio en `BluePrints` se llama `Unrealville`; en el
sistema de contexto, `UnrealvilleStudio`. **Son la misma marca** (`brands/UnrealvilleStudio/brand.json`).

---

## AUDITORES (preguntar modo ANTES de ejecutar)

| Auditor | Disparador | PREGUNTA OBLIGATORIA antes de ejecutar | Detalle |
|---|---|---|---|
| `gh-auditor` | "revisa repo / archivos / código de X" | **"¿identificativo o contextual?"** (identificativo = qué hay y dónde; contextual = leer y entender TODO el código) | `skills/github-auditor/SKILL.md` |
| `ecosystem-auditor` | "ecosystem scan/audit" | **"¿identificativo o contextual?"** | `skills/ecosystem-auditor/SKILL.md` |
| `shopify-auditor` | "audita tienda / Shopify audit" | (severo — corre completo, sin modo) | `skills/shopify-auditor/SKILL.md` |
| `supabase-auditor` | "auditor", "supabase audit", "audita la db", "cruza código y db" | **"¿identificativo o contextual?"** (identificativo = qué objects anon sin caller conocido; contextual = leer código + eval intencionalidad + map completo) | `skills/supabase-auditor/SKILL.md` |

Alcance de los ecosystem/gh audits: Context System · Vercel · GitHub repos · Supabase (tablas, EFs, schemas) · Labs · Marcas · Agents · Skills · Tools.

---

## MCPs CONECTADOS (server-side, ya disponibles en tools)

| MCP | Para qué | Notas |
| `Supabase` (unrlvl-supabase-mcp) | SQL, Edge Functions, schemas, logs | Proyecto `amlvyycfepwhiindxgzw`. SQL: cuidado con paréntesis en texto (rompen el parser). |
| `Meta` (UNRLVL Meta) | publicar IG/FB, ads, insights, audiencias | `list_brands` primero. brand_id mapping: ver ecosystem. Solo FB+IG existen (no LinkedIn/X aún). |
| `Shopify` (Unrealville Studio) | productos, colecciones, temas, órdenes, GraphQL | B2C + B2B. `list_brands` para ver tiendas conectadas. |
| `Vercel` | deploys, proyectos, logs, **web_fetch_vercel_url** (= acceso al proxy gh) | La vía para TODA URL de Vercel y para leer repos. |
| `Mail` (unrlvl-mail-mcp) | leer buzones de correo de clientes | **SOLO LECTURA.** `list_brand_mailboxes` → `search_messages` → `get_message`. Carpetas `INBOX`/`SENT`/`SPAM`, **papelera excluida**, **sin persistencia del contenido**. Schema `mail` en `unrlvl-db` con el rol dedicado `mail_mcp` (NO `service_role`). ✅ **Operativo desde el 2026-08-28**: autenticado, conector dado de alta, **3 buzones** — ForumPHs, NeuroneSCF, UnrealvilleStudio, **y sólo esas tres**. ⚠️ **Leer los tres defectos abiertos antes de usarlo** (debajo). |

> _Estado anterior de esta fila (v1.7, 2026-08-27), conservado: «⚠️ **No está dado de alta como conector en Claude.ai** — hasta ese paso, no aparece en tools.» Superado el 2026-08-28._

### ⚠️ `unrlvl-mail-mcp` — tres defectos abiertos que cambian cómo se lee su respuesta

| Código | Qué afirma el sistema | Qué NO comprueba | Consecuencia al usarlo |
|---|---|---|---|
| 🔴 **MAIL-01** | de quién es el correo | que la credencial abra ese buzón | **Una respuesta puede traer correo de OTRA marca con la etiqueta correcta encima.** Ocurrió en producción el 2026-08-28. **Una lectura no prueba de qué buzón viene.** |
| 🔴 **MAIL-02** | que el token es el vigente | que la credencial no haya rotado | Tras rotar una credencial, **hasta una hora sirviendo el buzón anterior**. Si Sam acaba de rotar, no confiar en la lectura. |
| 🟠 **MAIL-04** | cuál fue la causa del fallo | qué dijo Google exactamente | `MAIL_TOKEN_REVOKED` es cajón de sastre. **Un error de configuración se lee como token revocado.** |

**Ninguno rompe: los tres mienten en silencio.** Hasta que cierren, tratar toda respuesta del MCP de correo como **indicativa, no probatoria** — y contrastar la dirección con `list_brand_mailboxes` antes de atribuir un mensaje a una marca.

### Estado de autenticación de los MCPs — medido el 2026-08-28

| MCP | En el código | En Vercel (`ssoProtection`) | Tools que mutan |
|---|---|---|---|
| `unrlvl-supabase-mcp` | ❌ **sin autenticación** (SEC-01) | ✅ `true` (`all_except_custom_domains`) | **3** — `execute_sql`, `apply_migration`, `deploy_edge_function` |
| `unrlvl-meta-mcp` | ❌ **sin autenticación** (SEC-01) · además **SEC-02** en `api/upload.ts` | ✅ `true` (`all_except_custom_domains`) | **9** |
| `unrlvl-shopify-mcp` | ❌ **sin autenticación** (SEC-01) | ✅ `true` (`all_except_custom_domains`) | **4** |
| `unrlvl-mail-mcp` | ⏳ pendiente del merge de **MCP-AUTH-01** | ✅ `true` (`all_except_custom_domains`) | **0** — sólo lectura |

**Actualización 2026-08-28 — sólo cambia `unrlvl-mail-mcp`:** el código **ya autentica** (MCP-AUTH-01 mergeado, PR #1, merge `350de4a`), verificado desde fuera con **`401 MCP_UNAUTHORIZED`** y **`WWW-Authenticate: Bearer`**; y por eso su **Vercel Authentication se retiró** (medido `ssoProtection: false`) — bloqueaba también al conector. **El orden importa: primero la cerradura, después quitar la puerta.** Los otros tres siguen exactamente como arriba, y en `unrlvl-supabase-mcp` la casilla de Vercel es **la única protección que hay**.

**Los tres de SEC-01 no leen ninguna cabecera de credencial** (`req.json()` → `handleRpc` → `callTool`, sin tocar `req.headers`) y declaran `Access-Control-Allow-Origin: *`.

**La protección de Vercel es mitigación, no cierre.** `all_except_custom_domains` **no cubre un dominio propio**: el día que uno de estos MCPs reciba un dominio, la protección desaparece sin que nadie toque nada. El cierre correcto es **MCP-AUTH-01 extendido a los tres** — entregado, pendiente de merge, `MCP_AUTH_TOKEN`, deploy y **verificación de 401**.

**Agravante sistémico:** en la DB que alcanza `execute_sql` viven `shopify_stores` y `meta_accounts`, **con los tokens de los otros dos**. Un solo endpoint abierto no expone un MCP: expone los tres.

---

## DIAGNÓSTICO Y ACCESO — tres capacidades medidas el 2026-09-08

### `Supabase:query_logs` sobre UNRLVL — leer `edge_logs` de PostgREST

**Para qué sirve, y es más específico de lo que parece:** ver las peticiones que la aplicación hizo
a PostgREST, con su método y su código de respuesta. Es la vía para diagnosticar **un fallo que la
propia aplicación atrapó**.

**Por qué importa que sea una fuente distinta.** El 2026-09-08 un `PATCH` devolvía **403** y la
aplicación lo atrapaba a propósito para no bloquear la entrega. La tabla **no podía delatarlo**:
`open_count = 0` era compatible con «nadie lo abrió» y con «se abrió y el registro falló», y el dato
no distingue cuál. **`edge_logs` sí**, porque el par `GET 200` / `PATCH 403` aparece sin ambigüedad.

**Regla derivada:** ante un contador que no sube, la tabla no es la fuente — es justamente la que el
fallo dejó sin escribir. Detalle: `protocols/DELIVERY_AND_VERIFICATION_RULE.md` §4.2.

### El proxy `api/professor` SÍ acepta POST (corregido 2026-09-13)

**`api/professor` acepta `POST`, y `action=submit-learning` funciona** pasando `relevance_score`
**explícito y dentro del rango `1..5`** del `CHECK` [`reportado` — medido por Claude.ai el
2026-09-13]. El checkpoint **también** se puede seguir sembrando con `execute_sql` sobre
`professor_learnings`: la vía SQL no queda derogada, deja de ser **la única**.

**Lo que CC sí midió el 2026-09-13**, y es lo que ancla la corrección en el dato: **12 filas** con
`session_date = '2026-09-13'` en `public.professor_learnings`, **las 12 con `relevance_score = 5`**, y
el `CHECK` vigente es `professor_learnings_relevance_score_check` →
`CHECK (((relevance_score >= 1) AND (relevance_score <= 5)))` [`medido`]. **CC no ejecutó el POST:**
hacerlo habría escrito un learning en producción, y existe una lectura que responde igual
(`DELIVERY_AND_VERIFICATION_RULE` §4.1).

**Por qué la redacción anterior se equivocaba, y la lección es la del catálogo entero:** *«busqué un
POST y no lo encontré»* se escribió como *«no hay POST»*. La regla de oro de este archivo dice
exactamente lo contrario — **casi siempre el acceso existe por una vía que no es la obvia**—, y esta
entrada era el caso, sólo que del lado de quien la escribió.

> ⛔ **NO OPERATIVO — redacción anterior, conservada íntegra (archivada el 2026-09-13).** Afirmaba que
> el proxy **no tenía POST**. Lo desmiente la siembra de los 12 learnings del 2026-09-13 por esa misma
> vía. Se conserva literal por `CC_PROTOCOL.md` §0.
>
> > ### El proxy `api/professor` sólo expone GET
> >
> > **El checkpoint NO se siembra por el proxy.** Se siembra con **`execute_sql` sobre
> > `professor_learnings`**. `action=checkpoint` lee; no hay POST.
> >
> > Buscar un POST en el proxy y no encontrarlo **no significa que no haya vía** — significa que la vía
> > es otra. Es el caso literal de la regla de oro de este catálogo.

### Un conector MCP reconectado NO entra en caliente a una sesión abierta

Si un servidor MCP se cae y vuelve, **sus tools no reaparecen en la sesión en curso**. Planificar
contando con ellas es contar con un acceso que no está.

**Qué hacer:** replantear la vía con lo que sí hay en la sesión, o **declarar el bloqueo**. Lo que no
vale es escribir el plan como si la tool fuera a estar — eso es afirmar un acceso sin medirlo.

---

## CAPACIDADES Y CORRECCIONES MEDIDAS EL 2026-09-09

_Adición al tope de las secciones de diagnóstico. **Ninguna derogación**: lo que corrige a un texto
anterior lo deja archivado bajo guard `⛔ NO OPERATIVO` en su sitio, nunca borrado
(`protocols/CC_PROTOCOL.md` §0 y §6)._

**La corrección del cron 66 vive en su propia sección** —«CARRIL — CAPACIDADES NUEVAS», bloque verde
de corrección 2026-09-09—, porque ahí es donde el texto vencido se leía.

### 🔐 Credenciales de Storage — la clave de servicio del proyecto **no sirve** para Storage

**`SUPABASE_SERVICE_ROLE_KEY` es del formato `sb_secret_`, y Storage la rechaza** con
**`Invalid Compact JWS`**. La credencial que Storage acepta es la de **familia JWT**: la variable
**`SERVICE_ROLE_JWT`**.

- **Cómo se reconoce sin adivinar:** una credencial válida para Storage **empieza por `eyJ`**. Es
  exactamente el criterio que la EF `media-store` implementa —`pickKey()` recorre
  `SERVICE_ROLE_JWT`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SERVICE_KEY`, `SERVICE_ROLE_KEY` y
  **se queda con la primera que empieza por `eyJ`**— [medido: `index.ts` de `media-store`, función
  `pickKey`, leída con `get_edge_function` el 2026-09-10].
- **Por qué importa más de lo que parece:** las dos claves **existen** y las dos **parecen**
  correctas. El fallo no llega como «falta la credencial» sino como un error de formato de JWS, que
  se lee como un problema de la petición y no de la variable elegida.

### 📣 Publicación en Meta — subir una foto no publicada exige **token de página**

**Un token de usuario no basta.** Con `published=false`, Graph responde
**`(#200) Unpublished posts must be posted to a page as the page itself`**. El token de página se
**canjea primero**:

```
GET https://graph.facebook.com/{graph_version}/{page_id}?fields=access_token&access_token={system_token}
```

donde `system_token` y `page_id` salen de **`public.meta_accounts` resuelto por `brand_id`** — es
dato, no constante. Con el token de página ya se suben las fotos a `/{page_id}/photos` con
`published=false` y se arma la entrada en `/{page_id}/feed` con `attached_media[i]`
[medido: `index.ts` de `meta-graph-post`, leída con `get_edge_function` el 2026-09-10].

> ⚠️ **Alcance real de `meta-graph-post`, dicho por lo que hace el código y no por su nombre:**
> publica **multi-imagen en una página de Facebook** (`/photos` + `/feed`). **No** publica en
> Instagram: el carrusel de IG de esta sesión salió por la vía de contenedores del MCP de Meta
> (`ig_create_container` → `ig_publish_container`), que es otra ruta [medido — el código de la EF no
> toca ningún endpoint de IG].

### 🖼️ ImageLab — `execute` **no compone texto**; el overlay vive en `compose`

Son **dos llamadas por frame**, y confundirlas produce una imagen sin texto que **no falla**:

| Endpoint | Qué hace | Nombre del parámetro de marca |
|---|---|---|
| `/api/execute` | genera la imagen; **no compone texto** | **`brandId`** (camelCase) |
| `/api/compose` | estampa el overlay | **`brand_id`** (snake_case) |

- **`preset_id` es eco, no selector:** el preset **se resuelve por `(brand_id, canal)`**. Enviarlo
  distinto no cambia lo que se aplica; sólo cambia lo que vuelve en la respuesta.
- **`markers` viaja en la raíz** del cuerpo, no anidado.
- 🔴 **Ninguno de los dos sube al bucket.** El almacenamiento es un paso aparte —hoy, `media-store`—.
  Dar por guardada una imagen porque `compose` devolvió `200` es el defecto que `HRD-R11` nombra:
  el éxito se comprueba contra el efecto, no contra el código HTTP.

[reportado — brief de Claude.ai, 2026-09-09; no se volvió a medir contra ImageLab en esta sesión.]

### 📐 Proporción — `gemini-2.5-flash-image` **no acepta `4:5`**

Devuelve **`896x1152`**. Para llegar a **`1080x1350`** hay que **recortar y escalar antes de
componer**: el overlay se calcula sobre el lienzo final, así que componer primero y redimensionar
después mueve el texto. [reportado — brief de Claude.ai, 2026-09-09.]

### 📝 Blogs — es un **modelo de lectura**, y publicar es **cambiar el estado**

El blog no se drena: **se lee**. La consulta filtra por **`brand_id`** y **`status = 'published'`**,
**descarta lo que tenga `discarded_at`**, y **deriva el `slug`** cuando falta.

**De ahí se sigue lo que cerró la duda de esta sesión:** `vercel_html` **sí publica**, y
**`PROVIDER_NOT_DRAINABLE` es correcto por diseño** para ese proveedor — no es un defecto que
haya que arreglar. Lo que falta no es el drenaje: es **quién cambia el estado**, y hoy no existe
(frente abierto nº 1 de `AGENDA.md` v2026-09-09-v1). [reportado — brief de Claude.ai, 2026-09-09.]

### 📒 Los DOS libros mayores de una publicación — cuál manda, y por qué no da igual

**`intel.brand_publish_drain_log` registra INTENTOS. `public.scheduled_posts` registra el ESTADO
FINAL. Manda `scheduled_posts`.**

| Tabla | Qué es una fila | Autoridad |
|---|---|---|
| `intel.brand_publish_drain_log` | **un intento** del drenaje, con su desenlace y el `platform_post_id` que devolvió la API **en ese momento** | **ninguna** sobre el estado actual |
| `public.scheduled_posts` | **el estado final** de la publicación: `status`, `published_at`, `platform_post_id` vigente | **la que manda** |

**El caso medido que obliga a escribirlo** [medido el 2026-09-10]. Una misma publicación de
LucienSael en `meta_fb` aparece con **dos identificadores distintos**:

```
brand_publish_drain_log →  1076134175585218_122118274185298889   PUBLISHED   15:15:14 UTC
scheduled_posts         →  1076134175585218_122118277401298889   published   16:31:33 UTC
```

**Una hora y dieciséis minutos de diferencia, y dos ids para lo que se lee como un solo hecho.** El
del `drain_log` es un intento que **ya no existe en la red**. Quien lea el `drain_log` creyendo que
lee el estado final **se lleva el identificador de un post borrado**, y no hay nada en la fila que
lo delate: dice `PUBLISHED`.

> **La pista que sí lo delata, y hay que saber buscarla:** el post no resuelve. `scheduled_posts`
> **no tiene columna `post_url`** [medido: sus 15 columnas son `id`, `brand_id`, `platform`,
> `copy_text`, `image_url`, `status`, `scheduled_at`, `published_at`, `source_lab`,
> `orchestrator_stage_label`, `platform_post_id`, `error_message`, `created_at`, `updated_at`,
> `piece_id`], así que la comprobación es contra la red o contra el `platform_post_id` de esta tabla,
> nunca contra el del registro de intentos.

**Regla de lectura, y es la práctica:** para responder **«¿esto se publicó y con qué id?»** se
consulta **`scheduled_posts`**. Para responder **«¿qué intentó el carril y por qué falló?»** se
consulta **`brand_publish_drain_log`**. Preguntarle a uno lo que sabe el otro devuelve una respuesta
con forma de dato correcto — que es la peor clase de respuesta equivocada.

**Corolario, porque es el mismo defecto de familia que este catálogo ya registra dos veces:** «0
filas» y «no existe» no son el mismo estado (2026-09-08), `NULL` y `0` tampoco (frente de costo,
`AGENDA.md` v2026-09-09-v1), y **«un intento con desenlace `PUBLISHED`» y «una publicación viva»
tampoco lo son.**

### 🎓 Professor — `action=submit-learning` FUNCIONA con `relevance_score` explícito (corregido 2026-09-13)

**La causa raíz de 2026-09-10 era correcta; la conclusión que se sacó de ella, no.** La EF calculaba un
`relevance_score` **fuera del rango del `CHECK`**, que es **1 a 5** — y el `500` era **la base
rechazando la fila**, no el proxy negándose. De ahí se concluyó que la vía era el `INSERT` directo.
**La conclusión sobraba:** si el problema es el valor, la vía se arregla **mandando el valor bueno**.

- **Vía vigente:** `action=submit-learning` **pasando `relevance_score` explícito en `1..5`**
  [`reportado` — medido por Claude.ai el 2026-09-13, con 12 learnings sembrados por esa vía entre las
  13:47 y las 13:49 UTC].
- **Corroboración de CC** [`medido` el 2026-09-13]: **12 filas** con `session_date = '2026-09-13'`, **las
  12 con `relevance_score = 5`**, y el `CHECK` sigue siendo `>= 1 AND <= 5`. CC midió **el resultado**,
  no el camino: no ejecutó el POST para no escribir un learning de prueba en producción.
- **El `INSERT` directo con `execute_sql` sigue siendo válido** como fallback. Deja de ser **la única
  vía**.

**La lección, que es la cara:** un diagnóstico correcto (`el CHECK rechaza el valor`) se convirtió en
una regla de acceso (`no se puede por el proxy`) **sin medir la regla**. Entre la causa y la
conclusión se coló un salto — y quedó escrito en el catálogo durante tres días.

> ⛔ **NO OPERATIVO — redacción anterior, conservada íntegra (archivada el 2026-09-13).** Declaraba el
> `500` como estado vigente y el `INSERT` directo como **la** vía. Se conserva literal por
> `CC_PROTOCOL.md` §0; su causa raíz sigue siendo cierta y está recogida arriba.
>
> > ### 🎓 Professor — `action=submit-learning` devuelve **500**, y la vía es el `INSERT` directo
> >
> > **Causa raíz declarada con evidencia:** la EF calcula un `relevance_score` **fuera del rango del
> > `CHECK`**, que es **1 a 5**
> > [medido el 2026-09-10: `pg_get_constraintdef` de `professor_learnings_relevance_score_check` →
> > `CHECK (((relevance_score >= 1) AND (relevance_score <= 5)))`]. El `500` **no es del proxy**: es la
> > base rechazando la fila.
> >
> > - **Fallback vigente:** `INSERT` directo en `public.professor_learnings` con `execute_sql`.
> > - Concuerda con lo ya escrito en la cabecera v1.12: **el proxy `api/professor` sólo expone GET**, y
> >   el checkpoint se siembra con SQL.

### 🏷️ Estados de una pieza — **no existe `approved`**

Aprobar **escribe `status = 'scheduled'`** y sella el **`approved_by`**. Los ocho estados válidos,
y no hay más [medido el 2026-09-10: `pg_get_constraintdef` de `content_pieces_status_check`]:

`draft` · `awaiting_approval` · `challenged` · `deferred` · `scheduled` · `published` · `failed` ·
`rejected`

**Por qué se escribe aquí:** buscar `approved` y no encontrarlo se lee como «la aprobación no se
registró». Se registró: **está en `scheduled` con su `approved_by`**.

## EL REGULADOR DE ENTRADA AL CARRIL — cómo se consulta y qué perilla se toca (añadido 2026-09-12)

> Todo lo de esta sección es **`medido` el 2026-09-12** con `execute_sql` salvo donde diga otra cosa.
> **Aquí van las consultas, no las cifras**: un número escrito en un catálogo caduca en silencio.
> El método completo vive en `skills/publicacion-operativa/SKILL.md`, que **no se copia acá**.

### 📊 Cómo se lee la cobertura del carril

```sql
SELECT brand_id, platform_key, provider, margen, cobertura, alarma,
       franjas_comprometidas, franjas_sin_pieza, stock_disponible,
       franjas_sin_publicador, primera_sin_publicador
  FROM intel.v_carril_cobertura
 ORDER BY alarma DESC, cobertura ASC;
```

**Es una VISTA: nadie la escribe.** Una fila por marca × canal **activo**.
`cobertura` = `stock_disponible` − `franjas_sin_pieza`; **negativa** significa que hay franjas
comprometidas que hoy no tienen con qué llenarse. `alarma` es `cobertura < margen`.

`franjas_sin_publicador` y `primera_sin_publicador` (añadidas el 2026-09-12) **cuentan el sello** que
el drenaje deja escrito, **no deciden qué proveedor es drenable**: esa capacidad vive en el código, en
`DRAINABLE_PROVIDER`, en un único lugar. Una vista que la copiara divergiría el día que el drenaje
aprenda un proveedor nuevo. **Si valen cero en todos los canales, la primera sospecha no es que no
haya hueco: es que el drenaje no está sellando.**

### 🎚️ Cómo se sube el volumen — SE SUBE EL MARGEN, NUNCA LA CADENCIA

Son **tres números con tres dueños**, y confundirlos contamina una decisión editorial con una falta
puntual:

| Número | Dónde vive | Quién lo escribe |
|---|---|---|
| **Cadencia** | `intel.brand_cadence` | **Sam, y nadie más.** Es decisión editorial |
| **Margen** | `intel.brand_production_margin` | **Sam.** Es la única perilla que sube si hace falta más |
| **Cobertura** | `intel.v_carril_cobertura` | **Nadie: se calcula** |

```sql
UPDATE intel.brand_production_margin
   SET margin = <N>
 WHERE brand_id = '<marca>' AND platform = '<canal>';
```

**`margin` está acotado por `margin_max`** de esa misma fila. El regulador produce *cadencia + margen*
**sumando en tiempo de cálculo, sin persistir el resultado**: por eso la cadencia tiene que salir
idéntica antes y después de cualquier ciclo, y esa es su verificación.

### ⚖️ Cuál de las fuentes de cadencia MANDA

**`intel.brand_cadence` manda.** Las otras dos no son alternativas, son otra cosa:

- **`brand_topics.cadence` — LEGACY.** Marcada por **comentario de columna** desde el 2026-09-11
  [`medido`: `col_description` devuelve el texto completo]. **No se borra**: `content-scheduler`
  todavía la lee como alias legacy de paso 1 de 3, y retirarla se hace **contando** que ningún
  consumidor la lea, no suponiéndolo.
- **`intel.brand_publish_policies` dice CUÁNDO se publica, no CUÁNTAS piezas.** Días de la semana por
  horas de franja. Preguntarle cuánto producir es preguntarle algo que no sabe.

**Nada reconcilia hoy `intel.iid_agents.run_frequency` con `cron.job`.** El 2026-09-12 se alinearon a
mano los 12 crons de una marca; **la próxima divergencia no la detecta nadie**. Frente abierto en
`AGENDA.md`.

### ⏻ Apagar o encender un cron — `cron.alter_job`, NUNCA `UPDATE cron.job`

**Medido el 2026-09-12:** `UPDATE cron.job SET active = false` es **rechazado en este proyecto** con
`permission denied for table job`. La tabla no es escribible por esta vía, y **una migración que
apague crons así falla entera** — no deja el cron a medias: no deja nada.

La vía que funciona es la función de la extensión, con el `jobid` que devuelve `cron.schedule`:

```sql
SELECT cron.alter_job(<jobid>, active := false);
```

**`cron.schedule` devuelve el `jobid`** — se captura al crear, no se busca después por nombre.
**Verificación:** `SELECT jobid, jobname, schedule, active FROM cron.job WHERE jobid = <jobid>;`

---

## MÉTODO DE MEDICIÓN — cuatro reglas, y la fuente es el protocolo (añadido 2026-09-09)

**Fuente única: `protocols/MEASUREMENT_METHOD_RULE.md`** (respaldo:
https://unrlvl-context.vercel.app/protocols/MEASUREMENT_METHOD_RULE.md, alcanzable **sólo** con
`Vercel:web_fetch_vercel_url`). Este catálogo **apunta y no copia**: abajo va **una línea por regla**
para saber que existen y cuándo aplican; el texto, el motivo medido y las consultas viven allá.

Responden la pregunta anterior a todas las demás: **¿respondió el instrumento?** Antes de poder
etiquetar una afirmación como `medido`, `reportado` o `deducido`, hay que saber que la medición
ocurrió — y las cuatro separan **«no pude medir»** de **«medí y salió esto»**.

1. **La existencia de un objeto de Storage se comprueba en `storage.objects`, nunca con un `HEAD`.**
   Un `HEAD` contra la URL añade dos capas que pueden mentir —el proxy de salida y la CDN— para
   responder algo que la base contesta directo.
2. **Un `000` no se interpreta: el motivo se lee en `$HTTPS_PROXY/__agentproxy/status` →
   `recentRelayFailures`.** `curl` devuelve `000` tanto si el servidor calla como si el proxy niega
   el `CONNECT`. La cabecera `x-deny-reason` **no existe en este entorno** — se comprobó.
3. **Todo barrido masivo lleva dentro un control conocido-vivo.** Si el control también falla, **el
   roto es el método, no el dato**. El control se elige **antes** de barrer y se ejecuta **con el
   mismo método**.
4. **Un despliegue de Edge Function se verifica por `ezbr_sha256`** (`Supabase:list_edge_functions`),
   **nunca por el contador de versión ni por el sufijo del `entrypoint_path`**: los dos suben con el
   intento, no con el contenido. Medido el 2026-09-08 — un deploy subió **el mismo bundle** y el
   sufijo cambió igual. El `sha` es lo que se cita en el reporte de un PR de función.

**Dónde se cargan:** no en la apertura. Se cargan **cuando la tarea mide contra producción** — un
barrido, un inventario de Storage, la verificación de un deploy, o cualquier `curl` que devuelva
`000`.

---

## DESPLIEGUE — mergear no despliega, y desplegar tampoco despliega lo mergeado (añadido 2026-09-13)

**`HRD-R09` y `HRD-R14` ya fijan el primer tramo: el merge no es el despliegue.** Lo que faltaba escrito
es el segundo, y es el que costó la sesión del 2026-09-13: **un despliegue lanzado puede subir un bundle
que no es el de `main`.**

**Motivo:** de **ocho despliegues** de ese día, **cinco subieron el bundle anterior** [`reportado` —
brief de cierre del 2026-09-13; CC no ejecutó esos despliegues]. **La causa no es el comando: es el
árbol desde el que se lanza.** Un clon sin `git pull` tiene el código viejo, y el comando de deploy hace
exactamente lo que se le pide **con lo que encuentra**. No hay error, no hay aviso, y el resultado se
parece mucho a un despliegue correcto.

**Y las dos señales a mano no delatan nada:** el **contador de versión sube** y **`updated_at` cambia**
igual en los cinco casos, porque los dos suben **con el intento, no con el contenido**. Es la misma
familia que la **regla 4 de MÉTODO DE MEDICIÓN**, un piso más arriba: allá el sufijo del
`entrypoint_path` mentía sobre un redeploy idéntico; acá el contador miente sobre un deploy que subió
**otra cosa**.

**Lo único que no miente es el `ezbr_sha256`. Y no basta:** un `sha` distinto prueba que subió *algo*,
no que subió **lo que se quería**. La comprobación que cierra el caso es **leer un marcador dentro del
bundle desplegado** — una cadena que sólo existe en el código nuevo.

**Secuencia mínima, y el orden importa:**

1. **`git pull`** en el árbol desde el que se despliega, y confirmar el commit contra el de `main`.
2. **Desplegar.**
3. **Leer `ezbr_sha256`** con `Supabase:list_edge_functions` y compararlo con el de antes.
4. **Buscar el marcador del cambio dentro del bundle desplegado.** Sin este paso, el punto 3 sólo
   descarta el caso más burdo.

> **Por qué esta sección vive acá y no en el protocolo:** `protocols/MEASUREMENT_METHOD_RULE.md` §4 es
> la **fuente** de cómo se verifica un despliegue. Esta entrada **no la copia**: añade el tramo del
> **árbol de origen** y el **marcador**, que es lo que el 2026-09-13 costó cinco despliegues, y apunta
> allá para el resto. Dos textos de la misma regla son dos reglas en cuanto alguien toca uno.

---

## SECRETOS, PROFESSOR Y EXPOSICIÓN DE ESQUEMAS — tres capacidades medidas el 2026-09-17

### 🔐 CC no puede escribir secretos ni variables de entorno. **Las carga Sam**

**Medido por CC el 2026-09-16 y el 2026-09-17**, contra el inventario de tools de la sesión y contra
este mismo catálogo:

| Vía | Qué expone | ¿Escribe secretos o variables? |
|---|---|---|
| MCP de Supabase | `execute_sql`, `apply_migration`, `deploy_edge_function`, `list_*`, `get_*`, `query_logs` | **No.** Ninguna tool gestiona secretos de proyecto |
| MCP de Vercel | despliegues, proyectos, logs, `web_fetch_vercel_url` | **No.** No escribe variables de entorno |
| CLI (`supabase`, `vercel`) | — | **No instalada**, y no hay token para autenticarla |

**Qué se sigue de esto, y es la parte que cuesta un ciclo si no está escrita:** un brief **no puede
asignar a CC la carga de un secreto ni de una variable de entorno**. Lo que CC hace es **nombrar la
clave, decir dónde va y qué valor espera**, y **verificar por efecto después** de que Sam la cargue.
El 2026-09-17 un PR asignó a CC la carga de dos secretos para la que no existe tool, y el ciclo se
perdió entero — por eso `CC_PROTOCOL.md` §13 mide también **qué puede cargar CC de verdad**.

**Corolario sobre el valor:** un secreto que CC genera —porque hace falta un valor aleatorio— **viaja
sólo en el mensaje de respuesta a Sam**, nunca en un archivo, un commit, un PR ni un context file.

### 🎓 Professor desde el chat — la vía operativa es `submit-learning`

**Añade a la corrección del 2026-09-13, no la deroga.** [`medido` por **Claude.ai** el 2026-09-17;
**CC no lo midió**.]

- El proxy **acepta también `GET` con los parámetros en la cadena de consulta**: el manejador lee
  `req.query` cuando el método no es POST y **reenvía el cuerpo igualmente**.
- **`action=submit-learning` persiste** y devuelve `learning_id`, `relevance_score` y
  `filter_reason`. **Es la vía operativa para capturar desde el chat.**
- **`action=checkpoint` devuelve `candidates: []` y no persiste nada.** No es un error del
  llamador: es lo que ese `action` hace hoy. Quien espere de él la captura se queda sin learnings y
  sin aviso.

### 🔌 Exposición de un esquema en PostgREST — dónde se lee, y son dos señales

**El sitio autoritativo es `authenticator.rolconfig → pgrst.db_schemas`** — **no** la respuesta de la
API, **no** la pantalla del panel [`medido` el 2026-09-17].

**Y exponer son DOS señales, no una:** `NOTIFY pgrst, 'reload config'` para la **lista de esquemas** y
`NOTIFY pgrst, 'reload schema'` para la **caché de tablas y funciones**, que es la que hace falta tras
un DDL. Entre las dos, el error pasa de **406 `PGRST106`** a **404 `PGRST205`**, y **el `hint` del 404
desorienta**: llega a sugerir la tabla que acabas de pedir, de modo que se lee como «el esquema no
está expuesto» cuando significa lo contrario.

**Quién lo cambia: Sam, desde el panel.** El `ALTER ROLE … SET pgrst.db_schemas` funciona y **no es la
vía**: el panel reescribe esa lista cuando alguien toca los ajustes de API, así que un cambio hecho
sólo por SQL puede desaparecer sin que nadie lo note.

> **Fuente y por qué esta entrada no la copia:** el mecanismo completo, con su tabla de señales y su
> secuencia en orden, vive en `protocols/CC_PROTOCOL.md` **§13**. Acá queda **dónde se lee el estado**
> y **quién lo cambia**, que es lo que este catálogo responde. Dos textos de la misma regla son dos
> reglas en cuanto alguien toca uno.

---

## FLUJOS OPERATIVOS (saber que existen; cargar detalle solo al usar)

| Flujo | Qué hace | Disparo / dónde |
| **Pipeline v22** | Claude→INSERT lab_jobs→lab-worker EF→CopyLab+ImageLab→Supabase CDN→pending_approval→Sam aprueba→approve-job→Meta MCP→IG+FB | INSERT en `lab_jobs`. Detalle: `skills/content-pipeline/SKILL.md` |
| **IID subsystem** | Research diario (schema `intel`)→queue→dispatch. Research vivo; ejecución/publicación en revisión. | cron. Detalle: bloque `iid_subsystem` en ecosystem.json |
| **content-pipeline** | TODO texto público (blog, producto, ad, social, landing, email). Incluye voice_genome L0/L1.5 + AIFE Layer 2. | "copy/texto/post/contenido". `skills/content-pipeline/SKILL.md` |
| **CopyLab (carril)** | Motor de voz por genoma (el inyector lee el genoma de la marca); `content_type` por doble eje + `canal_block` real; escritor del cache en `service_role` (persiste). Objetos DB: `content_type_registry`, `platform_canal_map`, `creative_compatibility_rules.voice_id`. | Detalle: `brands/UnrealvilleStudio/session_log.md` (2026-08-04) + AGENDA `v2026-08-04-v2` |
| **Professor** | learnings + checkpoint (cada 10 msgs, silencioso) + decision-matrix | "Professor / anota / checkpoint". Proxy `/api/professor` PENDIENTE → fallback Supabase SQL. |

---

## CARRIL — CAPACIDADES NUEVAS (2026-08-25)

_Adición al tope del bloque de carril. La sección de 2026-08-18 sigue vigente inmediatamente debajo._

El carril **coloca y publica solo** desde el 2026-08-25 (`5e9f03ef`, Facebook, 13:13 UTC, drenada por
el cron **`content-placement-poll`**, jobid 66, `*/15`). Seis capacidades nuevas, todas invocables:

| Capacidad | Qué hace | Cómo se reconoce |
|---|---|---|
| **Modo `placement` de `content-scheduler`** | El eje de colocación que faltaba. Toma una pieza **ya producida y aprobada** y le calcula una **franja** contra la cadencia real de la marca (`1x_week`, `month_1`) con `planSchedule`; el cron drena la franja. Es lo contrario del modo previo, que programaba **antes** de generar. | `content-scheduler` **v5** · `scheduled_posts.piece_id` · `orchestrator_jobs.status = 'awaiting_publish'` · cron `content-placement-poll` (jobid 66) |
| **`gate9Language`** | Gate lingüístico del Watcher. **Informativo hoy** — marca, no bloquea. Tasa medida: **1 error en 11 de 22 piezas (50 %)**. ⚠️ **Revisar sus marcas antes de promoverlo a bloqueante**: un gate que marca la mitad del corpus o encontró un problema masivo o está mal calibrado, y no se sabe cuál sin mirar las marcas. | `content-watcher` **v43** · marcas en `gate_detail` |
| **Corrector determinista pre-juicio** | Aplica `fix_replacement` **antes** de que el juez lea la pieza: lo que una regla sabe reparar sola, no llega al juicio. ⚠️ `verify_pattern` es **POSIX**, `fix_replacement` es **ECMAScript** (`$1`, nunca `\1`) — ver `HRD_PROTOCOL.md` **HRD-R08**. | `intel.watcher_rules.verify_pattern` / `.fix_replacement` · 4 reglas con patrón, `HR-FPHS-15` con reemplazo |
| **Retención por desacuerdo** | Una pieza rechazada **ya no se destruye**: queda **retenida con la prueba de su inocencia al lado**, y una persona arbitra. Estados nuevos `challenged` y `deferred`. Primer arbitraje: **2026-08-25 14:36:41**, `decided_by: sam`. | `judge-arbitration` **v2** (`verify_jwt: true`) · `intel.judge_calibration` · `content_pieces.pass_type` / `.challenged_at` / `.deferred_until` / `.deferred_reason` |
| **Edición con registro de diff** | Editar una pieza **deja rastro**: qué cambió, cuándo y quién. La edición no borra el texto juzgado. | `piece-edit` **v2** (`verify_jwt: true`) · `intel.piece_edits` · `content_pieces.edited_at` / `.edited_by` |
| **Backfill de embeddings de `content-watcher`** | Puebla el corpus de embeddings hacia atrás. Corrido el 2026-08-25: **cero piezas vivas sin embedding en 21 días** — el gate deja de degradarse a LLM. | `content-watcher` **v43** · 🔴 el parámetro es **`days`**, **NO `window_days`** |

> 🔴 **`judge-arbitration` y `piece-edit` van con `verify_jwt: true`** — es su primera capa de defensa,
> y la asimetría con el resto del carril es **deliberada**: a esas dos las invoca **una persona desde
> una sesión**. El resto usa `--no-verify-jwt` porque lo llama el **cron vía `pg_net`**, que no lleva
> JWT. No uniformar sin entender esto.

> **Regla de lectura que no cambia:** las métricas de gates se leen por **`gate_detail`**, nunca por
> `failed_gate`.

### 🆕 Adición 2026-08-26 — lo que el primer run del carril completo dejó invocable

_Se suma a las seis capacidades de arriba, que siguen vigentes sin cambio._

| Capacidad | Qué hace | Cómo se reconoce |
|---|---|---|
| **Ángulos por dominio** | El **ángulo** de una pieza dejó de ser criterio del escritor en cada corrida y pasa a ser **dato**. Un dominio dice *de qué* habla la pieza; el ángulo dice *por dónde entra*. Sembrado en los **32 dominios** de ForumPHs con **seis ángulos** (`expertise`, `artefacto`, `pregunta`, `consecuencia`, `contraste`, `secuencia`) y **matriz por voz**. Medido: **2 ángulos distintos en un run** contra **uno solo en 250 filas**, y donde un dominio dio dos hallazgos cada uno recibió ángulo distinto — las parejas que antes se rechazaban entre sí | `intel.brand_topics.angles` · matriz y **criterio de las ausencias** en `brands/ForumPHs/BP_Brand_Context.md` · 🔴 **`iid_content_queue_angle_check` fue ELIMINADO** (enumeraba ocho ángulos y bloqueó el primer run diverso); tiene `COMMENT` de por qué no vuelve |
| **Aplazamiento por duplicación** | Una pieza que choca con el corpus **ya no se destruye: se aplaza**, con fecha y motivo. Es lo que hizo que 12 de las 14 piezas limpias del run existan | `content_pieces.deferred_until` / `.deferred_reason` · `deferred` en el CHECK de `content_pieces.status` |
| **Retención por desacuerdo** *(ya declarada; se anota su uso medido)* | Estado `challenged` operativo en run real | `content_pieces.status = 'challenged'` |
| **Arbitraje del juez con tasas medidas** | El arbitraje dejó de ser un caso suelto: **9 arbitrajes en un run** (ocho `rule_failed`, uno `judge_was_right`) dan **tasa de falso positivo medida, no estimada** — `HR-FPHS-15` **100 %**, `HR-FPHS-13` **100 %**, `HR-LEGAL-01` **75 %**. Una regla con falso positivo medido **se reescribe, no se discute** | `intel.judge_calibration` · `judge-arbitration` **v2** (`verify_jwt: true`) |
| **Edición con diff** *(ya declarada; se anota su uso medido)* | Junto al arbitraje, **rescató 5 piezas** (`assisted`) del run | `intel.piece_edits` · `piece-edit` **v2** |
| **`pass_type` — `clean` / `assisted`** | Distingue **la pieza que salió bien sola** de **la que se rescató**. Sin esto, un ratio de aprovechamiento no dice si el sistema mejoró o si alguien trabajó más. Del run: **14 `clean` (51,9 %)** + **5 `assisted` (18,5 %)** = **19 aprovechables (70,4 %)** | `content_pieces.pass_type` |
| **Backfill de embeddings** *(ya declarada; se precisa el parámetro)* | Corrido sobre el **corpus completo**: cero piezas vivas sin embedding en 21 d. El **gate de duplicación deja de degradarse a LLM** | `content-watcher` **v44** · 🔴 el parámetro es **`days`**, **NO `window_days`** |
| **Backfill de firma** | Repone la firma en piezas que el sistema no firmó. Resultado verificado: **23 de 23 vivas con firma, cero duplicadas** — el «cero duplicadas» es la mitad que importa, porque un backfill de firma mal hecho **firma dos veces** | 18 piezas corregidas · el arreglo de raíz es **SIGN-01**, en `content-run-stage` **v93** |

> 🟢 **CORRECCIÓN 2026-09-09 — el cron 66 `content-placement-poll` está ACTIVO, no apagado.**
> `*/15 * * * *`, `active = true` [medido el 2026-09-10:
> `select jobid, jobname, schedule, active from cron.job` → jobid **66**, `*/15 * * * *`, `true`].
> `AGENDA.md` v2026-09-06-v1 ya lo daba por activo: **este catálogo iba por detrás de la agenda**, y
> es exactamente el defecto que la etiqueta de evidencia existe para evitar. **Lo que sigue vigente
> del párrafo archivado abajo es la advertencia, no el estado:** el drenaje **da por publicada** una
> pieza con un `200` del lab **sin verificar el efecto** (**PUB-01**), y la regla de lectura
> **`HRD-R11` — el éxito se comprueba contra el efecto, no contra el código HTTP** no ha cambiado.
> Con el cron encendido, la advertencia pesa **más**, no menos.

> ⛔ **NO OPERATIVO — redacción anterior (2026-08-26), archivada el 2026-09-09 por medición.**
> Se conserva por `CC_PROTOCOL.md` §0: la historia no se borra. **Su afirmación de estado quedó
> vencida**; su advertencia sobrevive en el bloque verde de arriba.
>
> > 🔴 **Lo que NO se puede invocar todavía, y hay que saberlo antes de intentarlo: publicar solo.**
> > El drenaje **da por publicada** una pieza con un `200` de SocialLab **sin verificar el efecto** —
> > **cero publicaciones automáticas reales hasta hoy** (**PUB-01**). El **cron 66
> > `content-placement-poll` está APAGADO** hasta que eso cierre. El carril **coloca**; todavía no se
> > puede afirmar que **publica**. Regla de lectura: **`HRD-R11` — el éxito se comprueba contra el
> > efecto, no contra el código HTTP.**

> ✅ **El juicio de lo que sale: CERRADO el 2026-08-26 por P3** — `content-run-stage` **v94**, PR
> **#99**. El juez recibe **`social.adapted`**, no `aife_filtered`, con **`pickJudgedText`
> (`:4504`, llamada desde `:4860`)** y **`syncJudgedAdapted`**, que reescribe el texto juzgado
> —post-corrector, post-firma— **dentro de lo que se publica**. `adapted_pre_judgment` guarda el
> antes, sin firmar, como evidencia.
>
> **La columna que lo prueba en el dato es `assets.watcher.judged_source`** [medido el 2026-09-12:
> **121 piezas** con `'social_adapted'`, del 27-08 al 12-09; las **54** sin el campo son todas
> anteriores al arreglo; y **121 de 121** tienen `adapted` distinto de `adapted_pre_judgment`, que
> es la prueba de que la sincronización corrió].
>
> ⚠️ **Lo que SÍ seguía abierto, y es otra cosa: la BANDEJA mostraba el maestro.** P3 tocó el juez,
> no la superficie. Medido en la pieza `abda1ebf`: el juez leyó el español con sus hashtags y la
> bandeja mostraba `assets.copy` —3.747 caracteres, en inglés y sin ninguno—. Lo cierra
> `Orchestrator` **PR #35**. **De ahí salía el `hashtags: 2` sin hashtags visibles**: la cabecera ya
> contaba el adaptado y el cuerpo mostraba el otro texto.

> ⛔ **NO OPERATIVO — redacción anterior, conservada íntegra (archivada el 2026-09-12).**
> Describía en presente un defecto **ya cerrado el 2026-08-26**, y **su cita de línea era
> incorrecta**: `content-run-stage:3134-3136` es el armado del payload a los labs, no la
> adaptación —que está en `:2714`—. Esa contradicción con `ecosystem.json`, que ya lo registraba
> cerrado, **costó un brief entero el 2026-09-12**. Es C-09 del contrato ICR: dos fuentes para el
> mismo hecho, y una miente.
>
> > ⚠️ **Y una advertencia sobre el juicio de lo que sale:** el **texto adaptado por plataforma no pasa
> > por el juez** (`content-run-stage:3134-3136`). Verificado: `social.adapted` **reintrodujo una cita
> > de ley** que `aife_filtered` ya no tenía. **El juez aprueba un texto y sale otro** — no dar por
> > juzgado lo que se publica en un canal social.

---

## CARRIL ASYNC DEL AIID — capacidades nuevas (2026-08-18)

El carril async está **cerrado end-to-end** y su generador es **CopyLab**, invocado por su
`api_endpoint` (`execLab` + `builder_input`); el generador local se retiró. Detalle en
`IID/session_log.md` (2026-08-18). Cuatro capacidades nuevas, todas invocables desde el carril:

| Capacidad | Qué hace | Cómo se reconoce |
|---|---|---|
| **Procedencia del hallazgo** | `iid-research` recolecta `source_urls` y el hallazgo llega a los gates 4 y 6 con su bloque `FUENTES DEL HALLAZGO`. **Fail-loud:** un research sin fuentes corta con `RESEARCH_NO_SOURCES` en vez de escribir sin respaldo. | `intel.iid_findings` con procedencia · error nominal `RESEARCH_NO_SOURCES` |
| **Brief de escritura** | El escritor ya no recibe sólo el hallazgo: recibe `claims`, `mechanism` y `case_examples` como campos propios. Los casos son **múltiples**, no uno. | columnas `claims` / `mechanism` / `case_example` / `case_examples` en `intel.iid_findings` |
| **`statement` vs `instruction`** | Una regla del Watcher tiene **dos lecturas separadas**: `statement` es lo que el **juez** evalúa, `instruction` es lo que el **escritor** debe hacer. Con **fallback**: sin `instruction`, se usa el `statement`. | columna `instruction` en `intel.watcher_rules` |
| **Techo de generación por plataforma** | El límite de longitud se resuelve por **cascada de cinco niveles**, y el nivel que ganó queda declarado en la respuesta — no hay que adivinarlo. Filas BASE por plataforma en `content_type_registry` (`platform` es columna). | `max_tokens_source` en la respuesta · `content_type_registry.platform` |

> **Regla de lectura del carril:** las métricas de gates se leen por **`gate_detail`**, nunca por
> `failed_gate`. `failed_gate` reporta el primero que cortó, no todos los que rechazaron: leerlo
> como si fuera el total da cifras más chicas que la realidad.

---

## ARTEFACTOS CONSULTABLES (fuentes de verdad — leer antes de asumir estado)

| Artefacto | Ruta | Qué contiene | Actualizado por |
|---|---|---|---|
| `supabase_access_map.json` | `supabase_access_map.json` (raíz) | Topología de acceso: credencial → objeto → operación → intencional. Fuente de verdad para interpretar WARN del Security Advisor. | `supabase-auditor` bajo demanda |
| `ecosystem_graph.json` | `ecosystem_graph.json` (raíz) | Topología de negocio: nodos LAB/APP/EF y edges de dependencia. | `ecosystem-updater` post-audit |
| `ecosystem.json` | `ecosystem.json` (raíz) | Estado estructural completo del ecosistema. | HRD_ACTUALIZA |
| `MULTIBRAND_RULE.md` | `protocols/MULTIBRAND_RULE.md` | Regla inviolable: eje en código, instancia en dato. Test de la marca N+1, patrones prohibidos, procedimiento de CC, deuda conocida. | Claude + Sam, bajo PR |
| `DELIVERY_AND_VERIFICATION_RULE.md` | `protocols/DELIVERY_AND_VERIFICATION_RULE.md` | Regla inviolable: bloques con destinatario declarado y marca visual por superficie (para que Sam lea, no para que CC ejecute), idioma ES/EN neutro sin voseo, etiqueta de evidencia, panel de carga verificada y las cuatro QA (HRD RULES). **Carga obligatoria en apertura** (paso `3-quater`), con fila propia en el panel. | Claude + Sam, bajo PR |
| `ICR_CONTRACT.md` | `protocols/ICR_CONTRACT.md` | Contrato del ecosistema: tabla de definiciones de las siete siglas (ICR, QA, AIID, IID, AIFE, CRO, PSY), doce cláusulas y doce verificadores. Las cláusulas **informan, no bloquean**. NO se carga en apertura: se consulta al declarar el ICR de una entrega. | Claude + Sam, bajo PR |
| `BluePrints` (repo) | `unrealvillestudio-hub/BluePrints` → `brands/[Marca]/` | **395 archivos.** Identidad **VISUAL** por marca: `BP_BRAND_*` (JSON = FUENTE, HTML = RENDER), paletas, logos, tipografía. ⚠️ **NO es fuente para firmas**, y el `BP_BRAND` de **UnrealvilleStudio está desactualizado**. | Sam + Claude, bajo PR en ese repo |
| `intel.brand_similarity_threshold` | Supabase UNRLVL · esquema `intel` | Corte de similitud de coseno **por marca × clase de par** (`pair_scope`: `own_brand` / `cross_brand`) a partir del cual el gate de duplicación aparta una pieza; sustituye al literal `0.80` de `content-watcher`. Estados: `CALIBRATED` / `SIN_LINEA_BASE`. **Dos guardas, no una:** `pairs_count >= min_pairs` **y** `own_vectors >= min_own_vectors`. **La política de congelado y de recálculo vive en el `COMMENT` de la tabla** — se recalcula por evento, nunca por calendario, y todo recálculo escribe su `recalculated_reason`. | El carril, por evento · siembra y recálculo bajo migración |
| `intel.match_content_embeddings` → `p_match_domain` | Supabase UNRLVL · esquema `intel` | RPC de comparación de embeddings, **una sola firma** [medido 2026-09-13]. `p_match_domain boolean DEFAULT true` decide si la comparación se restringe al mismo dominio: el par propio lo deja en `true`, el par cruzado lo llama en `false`. **Leer el `DEFAULT` antes de asumir el alcance de una llamada** — un filtro implícito fue lo que mantuvo un gate comparando contra una población vacía. ✅ **ACL acotado**: `{postgres=X/postgres, service_role=X/postgres}` — `anon` y `authenticated` en **falso** [medido 2026-09-13, después del `REVOKE`]. Único llamador: `content-watcher` con `service_role`. | PR de función, bajo migración |

> `supabase_access_map.json` y `ecosystem_graph.json` se enlazan por `caller.repo` ↔ nodos del graph. Se versionan por separado — no fusionar.

> ⛔ **NO OPERATIVO — advertencia anterior de la fila `p_match_domain`, conservada íntegra (archivada el
> 2026-09-13).** Describía un `PUBLIC` con `EXECUTE` que **ya fue revocado el mismo día**. Se conserva
> literal por `CC_PROTOCOL.md` §0; su texto fue:
>
> > ⚠️ `PUBLIC` conserva `EXECUTE` sobre la función [medido 2026-09-13]; no es `SECURITY DEFINER`
> > (`prosecdef = false`), así que la RLS sigue mandando, pero falta el `REVOKE … FROM PUBLIC`.
>
> **Estado vigente** [`medido` el 2026-09-13, después del `REVOKE` aplicado por Claude.ai]: el ACL es
> `{postgres=X/postgres,service_role=X/postgres}`, y `has_function_privilege` devuelve **`false`** para
> `anon` y para `authenticated`, **`true`** para `service_role`. **Reversión, si alguna corrida dejara
> de comparar:** `GRANT EXECUTE … TO PUBLIC` por firma completa. **No debería hacer falta** — el único
> llamador es `content-watcher` con `service_role`, y el Orchestrator no la usa [`reportado` — cero
> coincidencias en su repo, según Claude.ai].

---

## SKILLS (catálogo completo en `skills/INDEX.md` — aquí solo los nombres)

`content-pipeline` · `ui-ux-layer` · `shopify-auditor` · `shopify-mcp` · `agent-builder` · `copylab-reference` · `image-processing` · `cost-layer` · `security` · `github-auditor` · `vercel` · `ads-mcp` · `higgsfield` · `agent-browser` · `ecosystem-auditor` · `ecosystem-updater` · `supabase-auditor`

Reglas de carga (qué skill con qué disparador): `skills/INDEX.md`. Siempre activos sin declaración: `vercel`, `github-auditor`, `security`.

---

## AGENTES AUTÓNOMOS

| Agente | URL | Export |
| Social Media Agent (SMA) | `unrlvl-social-media-agent.vercel.app` | `/api/export?secret=[SECRET]` (verificar en "Actualiza") |
| ForumPHs Speaks | `forumphs-speaks.vercel.app` | `/api/export` |

---

## HRDs / COMANDOS (detalle en HRD_PROTOCOL.md + userPreferences)

| Trigger | Hace | Pregunta/regla |
| "protocolo actualización" | carga de arranque | — |
| "Actualiza" | genera archivos + commit | nomenclatura: prefijo de carpeta destino + tabla de mapeo origen→destino |
| "ecosystem scan/audit" | auditoría | **preguntar identificativo o contextual** |
| "Professor / anota / checkpoint" | learnings | mensaje de verificación HRD |

Todas las HRD requieren el mensaje de verificación antes de ejecutar:
> "Ok Sam, quieres que [objetivo]. Para ello debo [pasos]. ¿Correcto? Me faltan: [datos o 'ninguno — procedo']."

---

## ENTREGABLES — regla de nomenclatura (HRD_ACTUALIZA)

Cada archivo de un paquete de actualización se nombra con **prefijo de carpeta destino** (`LucienSael_session_log.md`); Sam renombra antes de subir. SIEMPRE incluir tabla de mapeo origen→destino. NUNCA generar un archivo sin verificar primero su destino real en el repo (leer el existente antes de asumir estructura).

---

## PUSH A REPOS

- **Código** (CoreProject, WebLab, labs, luciensael): push directo vía PAT permitido (ver SESSION_PROTOCOL). Sitios en vivo → rama + PR + Preview, no push directo a main.
- **`unrlvl-context`**: CC trabaja en **rama + PR**, igual que en los repos de código. CC **publica ramas** (incluida aquí, en `unrlvl-context`) y abre el PR contra `main`; su restricción es **no pushear a `main` y no mergear**. Sam revisa, mergea y borra la rama **por GitHub Web UI** (no GitHub Desktop). Ver `protocols/CC_PROTOCOL.md` §1 + "Flujo de entrega de context files".

---

_CAPABILITIES v1.13 · carga en apertura (paso 3.5, después de INDEX) · mapa no contenido_

---

## ARCHIVO HISTÓRICO — CAPABILITIES: redacción previa de "PUSH A REPOS" (archivado 2026-08-04)

> **⛔ NO OPERATIVO — registro histórico únicamente.** Lo que sigue es la redacción del bullet `unrlvl-context` de "PUSH A REPOS" vigente hasta v1.1 (2026-06-03), conservada por trazabilidad (§0 del `CC_PROTOCOL.md`). Está **derogada** y no se obedece: contradecía el cuerpo vivo del protocolo — CC **sí** publica ramas de PR también en `unrlvl-context` (su restricción es no pushear a `main` ni mergear), y Sam usa GitHub **Web UI** desde 2026-07-29, no GitHub Desktop. Si algo aquí contradice la sección viva de arriba, manda la viva, siempre.

```
- **`unrlvl-context`**: SIEMPRE vía GitHub Desktop (Sam pushea), nunca push directo de Claude.
```
