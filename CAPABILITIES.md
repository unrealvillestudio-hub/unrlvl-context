# CAPABILITIES — Unrealville Studio
_Versión: 1.10 · 2026-08-29 (dos precisiones medidas el mismo día. (1) `protocols/DELIVERY_AND_VERIFICATION_RULE.md` pasa a **carga obligatoria en apertura** —paso `3-quater` de `HRD_PROTOCOLO_ACTUALIZACION`— con **fila propia en el panel**: una regla de forma que se consulta al final llega tarde, y además ese documento especifica el panel. (2) **Cómo alcanza CC una URL de Vercel**: `curl` da **403 en CONNECT**, la tool MCP `Vercel:web_fetch_vercel_url` da **200** — dos vías distintas, sólo una funciona, y declarar Vercel inalcanzable tras probar sólo `curl` es afirmar sin medir por la vía que existe) · base previa: 1.9 · 2026-08-29 (`protocols/DELIVERY_AND_VERIFICATION_RULE.md` v1.0 — REGLA INVIOLABLE nueva, listada en ARTEFACTOS CONSULTABLES: bloques con destinatario declarado y marca visual **por superficie** —emoji en chat, `●` con hex en documento o UI con estilos, y el diferenciador existe para que Sam lea, no para que CC ejecute—, idioma ES/EN neutro internacional **sin voseo**, etiqueta de evidencia `medido`/`reportado`/`deducido`, **panel de carga verificada** en la apertura de sesión —una fila sin evidencia es roja— y las **cuatro QA** con estatus HRD por `HRD-R15`, donde `QA-INFO` es un bloqueo. Este catálogo es punto de carga nº 4 de esa regla y **no la copia**: apunta a la fuente única) · base previa: 1.8 · 2026-08-28 (`unrlvl-mail-mcp` OPERATIVO: autenticado con MCP-AUTH-01 —401 verificado—, conector dado de alta en Claude.ai y tres buzones activos; y sus tres defectos abiertos, MAIL-01 / MAIL-02 / MAIL-04, que el catálogo declara porque cambian CÓMO se usa la capacidad) · base previa: 1.7 · 2026-08-27 (MCP de correo de clientes `unrlvl-mail-mcp` — tres tools de lectura, papelera excluida, sin persistencia de contenido; y el estado de autenticación de los cuatro MCPs, medido el 2026-08-28: SEC-01 abierto en código, mitigado en infraestructura) · base previa: 1.6 · 2026-08-26 (ángulos por dominio, aplazamiento por duplicación, arbitraje con tasas de falso positivo medidas, `pass_type` clean/assisted, backfill de firma; y la advertencia PUB-01 — el carril coloca pero todavía no se puede afirmar que publica) · base previa: v1.5 · 2026-08-25 (capacidades nuevas del carril: modo `placement`, `gate9Language`, corrector determinista pre-juicio, retención por desacuerdo, edición con registro de diff, backfill de embeddings) · base previa: v1.4 (2026-08-18) · base previa: v1.3 (2026-08-07), cuerpo conservado íntegro · Mantenido por: Claude

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

> 🔴 **Lo que NO se puede invocar todavía, y hay que saberlo antes de intentarlo: publicar solo.**
> El drenaje **da por publicada** una pieza con un `200` de SocialLab **sin verificar el efecto** —
> **cero publicaciones automáticas reales hasta hoy** (**PUB-01**). El **cron 66
> `content-placement-poll` está APAGADO** hasta que eso cierre. El carril **coloca**; todavía no se
> puede afirmar que **publica**. Regla de lectura: **`HRD-R11` — el éxito se comprueba contra el
> efecto, no contra el código HTTP.**

> ⚠️ **Y una advertencia sobre el juicio de lo que sale:** el **texto adaptado por plataforma no pasa
> por el juez** (`content-run-stage:3134-3136`). Verificado: `social.adapted` **reintrodujo una cita
> de ley** que `aife_filtered` ya no tenía. **El juez aprueba un texto y sale otro** — no dar por
> juzgado lo que se publica en un canal social.

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

> `supabase_access_map.json` y `ecosystem_graph.json` se enlazan por `caller.repo` ↔ nodos del graph. Se versionan por separado — no fusionar.

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
> "Ok Sam, querés que [objetivo]. Para ello debo [pasos]. Correcto? Me faltan: [datos o 'ninguno — procedo']."

---

## ENTREGABLES — regla de nomenclatura (HRD_ACTUALIZA)

Cada archivo de un paquete de actualización se nombra con **prefijo de carpeta destino** (`LucienSael_session_log.md`); Sam renombra antes de subir. SIEMPRE incluir tabla de mapeo origen→destino. NUNCA generar un archivo sin verificar primero su destino real en el repo (leer el existente antes de asumir estructura).

---

## PUSH A REPOS

- **Código** (CoreProject, WebLab, labs, luciensael): push directo vía PAT permitido (ver SESSION_PROTOCOL). Sitios en vivo → rama + PR + Preview, no push directo a main.
- **`unrlvl-context`**: CC trabaja en **rama + PR**, igual que en los repos de código. CC **publica ramas** (incluida aquí, en `unrlvl-context`) y abre el PR contra `main`; su restricción es **no pushear a `main` y no mergear**. Sam revisa, mergea y borra la rama **por GitHub Web UI** (no GitHub Desktop). Ver `protocols/CC_PROTOCOL.md` §1 + "Flujo de entrega de context files".

---

_CAPABILITIES v1.4 · carga en apertura (paso 3.5, después de INDEX) · mapa no contenido_

---

## ARCHIVO HISTÓRICO — CAPABILITIES: redacción previa de "PUSH A REPOS" (archivado 2026-08-04)

> **⛔ NO OPERATIVO — registro histórico únicamente.** Lo que sigue es la redacción del bullet `unrlvl-context` de "PUSH A REPOS" vigente hasta v1.1 (2026-06-03), conservada por trazabilidad (§0 del `CC_PROTOCOL.md`). Está **derogada** y no se obedece: contradecía el cuerpo vivo del protocolo — CC **sí** publica ramas de PR también en `unrlvl-context` (su restricción es no pushear a `main` ni mergear), y Sam usa GitHub **Web UI** desde 2026-07-29, no GitHub Desktop. Si algo aquí contradice la sección viva de arriba, manda la viva, siempre.

```
- **`unrlvl-context`**: SIEMPRE vía GitHub Desktop (Sam pushea), nunca push directo de Claude.
```
