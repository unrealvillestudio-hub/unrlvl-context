# Session Log — UnrealvilleStudio

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.


## 2026-08-29 — Recuperación del trabajo real del 2026-08-27, medido contra la fuente

**Por qué existe esta entrada.** La sesión del **2026-08-27 duró más de dos días y tuvo DOS `Actualiza`**. El que quedó registrado cuenta *«tres MCPs del ecosistema en internet sin autenticación»*; **el otro —el del carril— nunca entró a los context files**. Sam confirma que ese trabajo es real e importante. Se recupera aquí, con fecha de hoy, y **no se copia del brief: se mide contra Supabase**, porque un brief de hace dos días es `reportado`, no `medido`, y lo que no se pudo confirmar se dice.

### Lo que la medición CONFIRMA

**NeuroneSCF pasó de 0 a 6 agentes con 12 crons, y arranca solo.** [medido — `intel.iid_agents` y `cron.job`] Seis dominios: `chlorine-sun` · `color-fade` · `damage-repair` · `fine-fragile` · `frizz-humidity` · `hair-science`. Doce crons, **jobs 67 a 78, los doce `active = true`**, un par `research`+`process` por dominio: martes `color-fade`, miércoles `damage-repair`, viernes `frizz-humidity`, y los quincenales los días 5, 12, 19 y 26. **Es la siembra más grande de una marca hasta la fecha y no estaba escrita en ninguna parte.**

**Las versiones de EF que el carril dejó desplegadas.** [medido — `list_edge_functions`, sufijo de `entrypoint_path`] `content-run-stage` **100** (2026-08-27 23:03:51 UTC) · `iid-core` **56** (2026-08-27 15:02:05 UTC) · `iid-process` **49** (2026-08-26 22:38:45 UTC). Las tres estaban desfasadas en `ecosystem.json` desde el 26 y el 27: **el context file llevaba dos días declarando una versión que no era la servida.**

**`HR-LUC-10` tiene `verify_pattern`.** [medido — `intel.watcher_rules`] Confirma lo que el brief declaraba.

### Lo que la medición CORRIGE del brief

**`cta_base` no es un caso de UnrealvilleStudio: es un hueco del eje.** El brief lo presentaba como la excepción de una marca. [medido — `public.brands`] Es **NULL en cinco filas**: `DEFAULT`, `LucienSael`, `PatriciaOsorioConectando`, `SamPublisher` y `UnrealvilleStudio`. Y las dos que el brief daba por pendientes —NeuroneSCF y ForumPHs— **sí lo tienen**. Tratarlo como excepción de una marca escondía que faltaba en cuatro.

**LucienSael: 1 agente, UN dominio, cuatro temas.** El brief decía «1 agente para 4 dominios». [medido] En `intel.iid_agents` LucienSael tiene **1 agente y 1 dominio** (`behavioral-science`); los cuatro son sus **`brand_topics` activos**. El cuello de botella es real, pero la diferencia importa: **no faltan tres dominios, falta capacidad de agente para los temas que ya existen.**

**La cobertura de `verify_pattern` es peor de lo que el brief describía.** El brief hablaba de cinco reglas sin patrón. [medido] De **50 reglas activas**, sólo **5** tienen `verify_pattern` —`HR-FPHS-13`, `HR-FPHS-15`, `HR-FPHS-16`, `HR-LEGAL-01`, `HR-LUC-10`— y sólo **UNA** tiene `fix_replacement` (`HR-FPHS-15`). Es decir: **45 de 50 reglas se evalúan sin patrón verificable, y el corrector determinista tiene con qué corregir en una sola.** Y **49 de 50 son `blocking`**; la única `warn` es `HR-FPHS-08`.

### Lo que quedó pendiente de confirmar — y se confirmó al dar con la ruta

**`judged_source` — CONFIRMADO, y el hito es real.** [medido 2026-08-29 por la ruta correcta] Está poblado en **13 de 67 piezas** (`content.content_pieces`) y **46 de 417 jobs** (`content.orchestrator_jobs`), con valor único **`social_adapted`**. La ruta es `assets->'watcher'->>'judged_source'`: **lo escribe `content-run-stage` dentro de `assets.watcher` de la pieza y del job**, no el Watcher en su log.

**El corte es temporal y se ve dentro de la propia jornada:** **0 de 52** piezas anteriores al 2026-08-27 lo llevan —el campo no existía—, el **2026-08-27 lo llevan 12 de 14** —las dos que faltan son las juzgadas **antes** del despliegue de ese mismo día— y el **2026-08-28, 1 de 1**. **La ausencia en las filas viejas no es un defecto estructural: es el corte del despliegue de P3-FIX**, y `P3` queda **auditable por primera vez**.

> **Cómo se llegó a decir que no existía, porque el error vale más que el dato.** La primera pasada consultó `information_schema.columns` —donde `judged_source` no aparece, porque **no es columna: es una clave dentro de un `jsonb`**— y `intel.watcher_log.gate_detail`, que es el **registro del juicio y no lleva `assets`**, así que ahí **no puede estar por construcción**. Las **747 filas** de esa consulta no son ni las 417 de jobs ni las 67 de piezas: **se estaba contando otra cosa**. `HRD-R13` dice que grepear no es leer; esto añade el escalón siguiente: **una consulta a la tabla equivocada devuelve un cero verdadero sobre una pregunta falsa**, y un cero verdadero es indistinguible de una ausencia real si nadie comprueba que la pregunta era la correcta. Lo que faltaba era **la ruta, no el dato**.

**El ratio del 26 %, «8 de 27 mueren antes del juez» y «33 de 48 incumplimientos».** No se pudieron reproducir con las consultas de esta pasada: `intel.watcher_log` da otra distribución sobre **747 filas** —446 `hard_rules`, 206 `evidence`, 30+20 `duplication`, 8 `objective_stimulus`, **37 `PASS`**— y `content.content_pieces` tiene **67 piezas** repartidas en seis estados. **Quedan como `reportado`, con la consulta que habría que afinar anotada en la agenda.**

### Lo que entra a la agenda

**P1 a P13** más el bloque «sin bloquear», cada uno con su etiqueta: los que se midieron llevan el dato medido —**el cron 66 sigue `active = false`**, `HR-GEN-05` es `blocking` sin patrón, `cta_base` NULL en cinco— y los que no, llevan escrito que son `reportado` y qué consulta los cerraría. **Ningún ítem se copió del brief sin pasar por la fuente.**

---


## 2026-08-29 — DELIVERY_AND_VERIFICATION_RULE v1.0 · entrega, evidencia y las cuatro QA

**Qué se instaló.** `protocols/DELIVERY_AND_VERIFICATION_RULE.md` como **fuente única** de cómo se entrega y cómo se verifica en todo el ecosistema. Nació **v1.0** en el PR #70 y cerró el día en **v1.1** (24.300 b) tras el #71. Cubre cuatro cosas que vivían a medias o no vivían en ninguna parte:

1. **Destinatario declarado.** Todo lo que se entrega cae en un bloque `PARA SAM` o `PARA CC`, que termina donde empieza el siguiente encabezado. **El diferenciador visual es para que Sam lea, no para que CC ejecute** — CC recibe estructura, no color. La marca depende de la superficie: cuadrado emoji en chat, carácter `●` con hex (`#00FFD1` Sam / `#FFB300` CC) en documento o UI con estilos.
2. **Idioma.** ES o EN neutro internacional, **sin voseo**, por ambigüedad operativa: el imperativo voseante y el pretérito son homógrafos. Antes de este PR el idioma **no estaba escrito en ningún archivo del repo** — vivía sólo en las `userPreferences` de Sam, que CC no lee.
3. **Evidencia.** Toda afirmación de estado va etiquetada `medido` / `reportado` / `deducido`. Sin etiqueta se lee como `medido`.
4. **Las cuatro QA, con estatus HRD:** `QA-ENCARGO` → `QA-OBJETIVO` → `QA-INFO` → `QA-PROP`. `QA-INFO` es un **bloqueo**: sin la información completa no se responde, se entrega el plan para obtenerla. `QA-PROP` no existe sin `QA-OBJETIVO` validado con Sam.

**Puntos de carga (8), ninguno copia la regla entera:** el documento fuente · `CC_PROTOCOL.md` §4.1 (v3, reducida a puntero, con su v2 archivada bajo guard) · `HRD_PROTOCOL.md` (`HRD-R15`) · `CAPABILITIES.md` · `ecosystem.json → delivery_and_verification_rule` · puntero cruzado en `knowledge/ecosystem/decision-matrix/QA_RULES.md` · el `CLAUDE.md` de cada repo del org · las `userPreferences` de Sam. La §6 declara además el **estatus de cada punto** —FUENTE / PUNTERO / RESUMEN OPERATIVO— y una §6.1 que ata al futuro proyecto de sync: **un sync que iguala textos entre puntos de carga rompe la regla en vez de aplicarla.**

**Apertura de sesión reescrita.** `HRD_PROTOCOL.md` pasó a **v1.8**: la frase del paso 4 quedó única —«Hola Sam, Protocolos cargados según el panel. ¿Con qué marca o proyecto vamos a trabajar?»— y el paso 8 dejó de ser una frase fija para ser el **PANEL DE CARGA VERIFICADA**, con evidencia por fila y las **dos reglas inviolables como dos filas más**, cada una con su fuente y su evidencia. Convivían tres versiones de la misma frase.

**Motivo medido, no teórico.** El 2026-08-29 se declaró «contexto cargado» con `ecosystem.md` **nunca solicitado** y con cuatro skills declarados activos **sin haber leído ningún `SKILL.md`**. Una frase fija se escribe igual con la carga hecha y sin hacer.

**Lo que CC aportó por encima del brief.** (a) Un **paso 3-quater**: la regla **se carga** en la apertura, no se consulta — gobierna cómo se responde, y abrirla al final llega tarde porque el texto ya está escrito; además el propio panel está especificado en su §2.4. (b) **Cazó un defecto del brief de Claude.ai**: la verificación pedía `grep "protocolo cargado" → una sola línea`, pero con la redacción anterior archivada en el mismo archivo ese grep devuelve **dos**. Se sustituyó por un `awk` que corta en el bloque histórico y busca sólo en el cuerpo vivo. (c) Encontró **6** apariciones de la forma voseante donde el brief declaraba 5, y lo anotó por `HRD-R13`. (d) **Midió las dos vías a Vercel** en vez de deducir el estado: `curl` sigue dando **403 en CONNECT**, la tool `Vercel:web_fetch_vercel_url` devuelve **200**. `CC_PROTOCOL.md` pasó a **v7** con la nueva §0 bis.1; el texto de v5 se conserva íntegro porque sigue siendo cierto en su literal — lo que caducó es su conclusión.

**Propagación — MEDIDA, no reportada.** Un PR por repo sobre los 32 del org, los 32 mergeados el mismo día. Verificado leyendo el `CLAUDE.md` de cada repo **en su rama por defecto**: **31 de 31** contienen el encabezado `## ENTREGA Y VERIFICACIÓN — INVIOLABLE` **y** el puntero a la fuente única, y ninguno conserva la regla derogada fuera de un guard. Con `unrlvl-context`, **32 de 32**.

**El barrido encontró más de lo que el encargo pedía.** La regla de push **derogada desde el 2026-07-31** —«nunca por CC», «solo Sam vía GitHub Desktop»— seguía viva en **18 repos**, con un dato falso encima: Sam mergea por **GitHub Web UI** desde el 2026-07-29. No es cosmética: leerla como imperativo vigente **traba a CC**, y ya había ocurrido. Y **13 repos** decían «solo entonces hacer merge o pedir merge», que dejaba abierta la puerta a que CC mergeara. **11 repos no tenían `CLAUDE.md`** y se creó mínimo y apuntador: uno que describe el repo se desactualiza, uno que apunta no.

**Dos errores propios, declarados.** (a) El script de propagación **re-corrigió ImageLab**, el único repo que ya tenía la regla arreglada, leyendo el texto viejo **dentro de su propio bloque archivado**; se detectó antes de abrir ningún PR, se arregló el orden de comprobación —guard antes que texto— y esa rama se rehízo desde `origin/main`. (b) Se forzó como firma de commit el `userEmail` de Sam, que **no es miembro del org** y además le habría atribuido commits que no hizo; las 17 ramas afectadas se re-firmaron y se verificó **en `origin`**, no en local. La primera verificación de ese arreglo dio los 17 por buenos con un `grep` que devolvía «ok» por defecto: el push no había entrado. `HRD-R11` exacto — comprobar contra el efecto, no contra lo que uno infiere.

**Coste de la sesión, anotado a propósito.** Dos horas intentando aplicar `#00FFD1` y `#FFB300` a líneas de texto **en el chat**, superficie que no rinde color arbitrario. De ahí sale la regla de marca por superficie: una convención que no se puede cumplir se abandona entera, y con ella la parte que sí funcionaba.

**Tres divergencias protocolo–práctica cerradas en el `Actualiza`** (`HRD_PROTOCOL.md` → **v1.9**): el paso 4 mandaba **regenerar** derivados contra la regla de **sincronizar** vigente desde el 2026-08-23 —contradicción viva dentro del mismo protocolo durante seis días—; el pie del cuerpo vivo declaraba **v1.3** mientras la cabecera decía v1.8; y los pasos 1-2 mandaban consultar el SMA **siempre**, cuando la práctica es sólo a petición. **Hallazgo de seguridad:** esos pasos llevaban el **secreto de export del SMA en claro** dentro del archivo, en `main`. Queda redactado en el bloque histórico y **la rotación es decisión de Sam**.

---


## 2026-08-28 — El MCP de correo lee. Y lo que costó llegar no fue Google: fue que el sistema no verificaba de quién era lo que devolvía

**Tres buzones de tres marcas leyendo en producción**, y tres defectos encontrados **por usarlo**, no
por auditarlo. Los tres son la misma clase de fallo, y ninguno rompe: **mienten en silencio**.

> Verificado contra producción el **2026-08-28** con `execute_sql`, `list_projects`, la API de Vercel
> y una llamada externa al endpoint del MCP. Los defectos de código están verificados **contra el
> repo desplegado** (`unrealvillestudio-hub/unrlvl-mail-mcp`, merge `350de4a`), no contra la copia de
> `projects/`. Professor cerrado **antes**: **9 learnings**, `session_date = 2026-08-28`, los nueve
> con `approved_by_sam = true` — **medido, coincide con el brief**. **SMA no se consultó.**

### El MCP de correo, operativo

| Marca | Buzón | `provider` | `active` | Autorización |
|---|---|---|---|---|
| ForumPHs | `forumphs507@gmail.com` | `google_oauth` | ✅ | ⚠️ `PENDIENTE DE FIRMA` — se reemplaza por el documento firmado por Ivette |
| UnrealvilleStudio | `unrealvillestudio@gmail.com` | `google_oauth` | ✅ | ✅ `AUTOTITULAR` — cuenta propia |
| NeuroneSCF | `neuronescflorida@gmail.com` | `google_oauth` | ✅ | ⚠️ `PENDIENTE DE FIRMA` · titular `PENDIENTE DE CONFIRMAR` |

**Alcance declarado por Sam: sólo esas tres marcas.** El 27-ago ambas tablas estaban en **cero
filas**; hoy hay tres y tres. Entre una cosa y otra está toda la sesión.

**MCP-AUTH-01 cerrado en sus cuatro pasos.** PR **#1** del repo, merge `350de4a` · `MCP_AUTH_TOKEN`
puesto en Vercel · desplegado · **verificado desde fuera**:

```
401  {"error":{"code":"MCP_UNAUTHORIZED"}}
www-authenticate: Bearer
```

`lib/auth.ts` compara en **tiempo constante** y **no degrada a abierto**: sin `MCP_AUTH_TOKEN` el
servidor falla, que es la decisión correcta. Ayer «el patrón estaba escrito y no estaba en pie»; hoy
está en pie.

**Conector dado de alta en Claude.ai** — `Authentication: None` y cabecera `Authorization: Bearer`,
porque el servidor usa **token estático, no OAuth**. Las tres tools aparecen en esta sesión: ésa es
la prueba, no el brief.

**Vercel Authentication retirada de `unrlvl-mail-mcp`** (medido `ssoProtection: false`). **Bloqueaba
también al conector**, que no lleva sesión de Vercel. Y el orden importa: el andamio se retira
**porque el código ya autentica** — primero la cerradura, después quitar la puerta. En
`unrlvl-supabase-mcp` sigue encendida (medido `true`) **porque allí el andamio es lo único que hay**.

**Bucket privado `mail-authorizations`** — creado a las **11:07:42 UTC**, `public = false`, 10 MB,
`application/pdf` · `image/jpeg` · `image/png`. **Los cinco buckets que ya existían no servían:**
`unrlvl-media` y `product-assets` son **públicos**, y los otros tres son privados pero de propósito
ajeno (`nscf-licenses`, `iid-expert-uploads`, `brand-intel`). Un documento firmado por el titular de
un buzón no vive en un bucket público.

**Dos políticas RLS nuevas**, medidas en `pg_policies`: `mail_mcp_select_mailboxes` y
`mail_mcp_select_authorizations`, ambas `SELECT` para el rol `mail_mcp`. El acceso lo sigue cerrando
el `REVOKE`; las políticas son la segunda capa.

### 🔴 MAIL-01 — El MCP no verifica de quién es el buzón que lee

`lib/tools.ts` estampa `address` **desde la fila de la base**, nunca desde el proveedor.

**Ocurrió hoy en producción: NeuroneSCF sirvió la bandeja de UnrealvilleStudio.** Sin error, sin
alerta, sin nada raro en la respuesta. Ése es exactamente el problema — **no falló, mintió**, y con
la etiqueta correcta encima.

**Verificado contra el código desplegado:** `address: mailbox.address` en **cuatro** puntos
(`lib/tools.ts:126`, `:133`, `:159`, `:166`), y **cero apariciones** de `assertMailboxIdentity`,
`getProfile` o `MAILBOX_IDENTITY_MISMATCH` en todo el repo.

**Arreglo:** `assertMailboxIdentity()` contrastando `users.getProfile` contra
`mail.mailboxes.address`, y código nuevo **`MAILBOX_IDENTITY_MISMATCH`**. **La etiqueta debe salir de
quien la puede probar, no de quien la declara.**

### 🔴 MAIL-02 — La caché de access token no se invalida al rotar la credencial

**Verificado:** `accessTokenCache` es un `Map` con clave **`session.mailbox_id` y nada más**
(`lib/providers/google_oauth.ts:145`, `:151`, `:199`), TTL de `expires_in ?? 3600` (`:198`).
**`vault.update_secret` no la toca**, y nada en la clave depende del refresh token.

**Tres rotaciones seguidas siguieron sirviendo el buzón anterior** hasta que un redeploy vació la
caché. **Rotar una credencial es rutina** —pasa cada vez que un cliente cambie su contraseña—, no
una excepción que se absorba con un redeploy manual.

**Arreglo:** clave = `mailbox_id` **+ huella del refresh token**. Cambia la credencial, cambia la
clave, muere la entrada.

### 🟠 MAIL-04 — Códigos agrupados, y un log ciego por omisión

**Verificado:** `lib/errors.ts:15` declara **`MAIL_TOKEN_REVOKED`** y nada más para esta familia.
`invalid_grant` se mapea explícito (`google_oauth.ts:186-188`) **y el mismo código se reutiliza como
cajón de sastre** (`:225`). No existen `MAIL_CLIENT_CONFIG_INVALID` ni `MAIL_TOKEN_EXCHANGE_FAILED`.
**Costó tres iteraciones** averiguar qué fallaba.

**Y el diagnóstico es ciego por omisión, no por diseño:** `route.ts` llama a `logOp` en sus **dos**
puntos (`:151`, `:159`) **sin `mailbox_id`**, aunque el campo **existe** en `OpLog`
(`lib/log.ts:16`) y se serializa (`:27`). El dato estaba ahí y no se pasó.

**Arreglo:** separar en `MAIL_TOKEN_REVOKED` / `MAIL_CLIENT_CONFIG_INVALID` /
`MAIL_TOKEN_EXCHANGE_FAILED`, loguear el campo `error` de Google, y pasar `mailbox_id`.

### App de Google en Production, y por qué las páginas legales eran el bloqueante

Proyecto `unrlvl-mail-mcp` (`212509698390`) **In production**: branding completo, dominio
`unrealvillestudio.com` autorizado, scope `gmail.readonly`. **Sin evaluación CASA y coste cero** — la
lectura de correo con scope `gmail.readonly` no la dispara.

**Páginas legales publicadas.** `/legal/privacy` verificada en vivo: **200**, **v1.1 con fecha 28 de
agosto de 2026**, entidad **«Samuel Moreno Mendoza, sole proprietor»**, y el footer enlaza
`/legal/privacy`, `/legal/terms` y `/es/legal/privacidad` — **ya no están huérfanas**, que era el
otro defecto del 28-abr. Su **§04** documenta el acceso de sólo lectura al buzón con la cláusula de
**Limited Use de Google**: scope mínimo, sin transferencia, sin publicidad, sin lectura humana salvo
consentimiento afirmativo, seguridad o ley. **Eso es lo que Google pedía**, y por eso el orden no era
burocrático. `legal/a` borrado (PR #8).

### 🧭 El patrón, y por qué merece nombre

| Defecto | Qué afirma | Qué no comprueba |
|---|---|---|
| MAIL-01 | de quién es el correo | que la credencial abra ese buzón |
| MAIL-02 | que el token es el vigente | que la credencial no haya rotado |
| MAIL-04 | cuál fue la causa del fallo | qué dijo Google exactamente |

**Ninguno rompe. Los tres mienten en silencio**, que es la forma cara — el mismo diagnóstico que
**HRD-R11** dejó escrito para el carril el 25-ago: *el éxito se comprueba contra el efecto, no contra
la afirmación*. Que reaparezca en un subsistema nuevo, escrito de cero, dice que la regla todavía no
está en el reflejo.

### Abre

**🔴 Rojos** — **MAIL-01** (identidad del buzón sin verificar; **ocurrió en producción**) ·
**MAIL-02** (caché que sobrevive a la rotación) · **MAIL-03** (`forumphs-db` **fuera del mapa del
ecosistema**; detalle en `brands/ForumPHs/session_log.md`).

**🟠 Naranjas** — **MAIL-04** (códigos agrupados + `logOp` sin `mailbox_id`) · **FPHS-FORM**
(formulario **sin protección anti-spam**) · **SEC-01** sigue abierto en los otros tres MCPs ·
**SEC-02** (`upload.ts`). ✅ **Cerrado el mismo día:** las dos autorizaciones quedaron **firmadas**
—Ivette Flores y Patricia Osorio C.—, con el PDF pendiente de subir.

> _Corregido el 2026-08-28 por **MAIL-PRIV-01**: de esta lista se retiró un ítem y dos se
> reescribieron. **Los tres defectos del MCP —MAIL-01, MAIL-02, MAIL-04— se conservan íntegros:**
> son defectos de **nuestro propio código** y no contienen correspondencia._

**🟡 Amarillos** — retirar `oauthplayground` de los redirect URIs · TikTok Shop de NSCF ·
`003_drop_brand_oauth_tokens.sql` · **PR de limpieza** para sacar `projects/unrlvl-mail-mcp/` y el
HANDOFF: **ya no son sólo andamio, son una copia que puede divergir del repo real**.

---

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
