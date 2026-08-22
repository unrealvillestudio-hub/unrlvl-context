# ForumPHs — Session Log

## 2026-08-22 — ForumPHs al aire: el PRIMER PUBLISH DE LA HISTORIA DEL SISTEMA

El 22-ago a las **12:44:41 UTC** ForumPHs publicó en Facebook, y **veinticinco segundos después**
en Instagram. No son las primeras piezas de ForumPHs: son **las primeras del ecosistema entero**.
Es la primera vez que algo recorre el carril completo —research → escritura → juicio del Watcher →
aprobación de Sam → composición visual → publicación— y **sale a un canal público**. Todo lo
anterior, desde que el IID existe, murió en la DB.

> Cifras e ids verificados contra Meta (`fb_get_posts` / `ig_get_media`) y contra
> `content.content_pieces` al cierre del 22-ago. El detalle de carril vive en `IID/session_log.md`
> (2026-08-22); acá va lo que es de ForumPHs.

### 🚀 Las dos piezas que salieron

| | Facebook | Instagram |
|---|---|---|
| **id de publicación** | `1184045168120977_122131069905355949` | `17943396402322068` |
| **permalink** | `facebook.com/122130904671355949/posts/122131069905355949` | `instagram.com/p/DcV8VVlHLR9/` |
| **sellado en Meta** | 2026-08-22 **12:44:41 UTC** | 2026-08-22 **12:45:06 UTC** |
| **pieza** | `987c1631-c569-49b8-a03d-aa6b33adad96` | `8cdaddb1-b158-4bb4-b44e-43b98f2199d1` |
| **dominio · voz** | `la-cuota-por-dentro` · `fphs_educativa` | `el-acta-como-instrumento` · `fphs_educativa` |
| **título (calibrado por Sam)** | «Una cuota que nunca sube en años no es buena señal.» | «El acta es la única prueba de lo que su asamblea aprobó.» |

Ambas llevan `assets.publication` estampado en `content.content_pieces`
(`published_by: "claude-mcp-manual"`, `published_at: 2026-08-22`) y ambas quedaron en
`status: published`. **La publicación fue manual-asistida, no automática:** el `publisher-cron`
de `public.scheduled_posts` todavía **no existe** — las filas `pending_publish` de la tabla siguen
esperando a que alguien las levante. Queda en AGENDA (Fase 3) y es la diferencia entre *poder
publicar* y *estar publicando*.

**Mecánica validada end-to-end** (y anotada como learning de ops): `fb_publish_photo` toma el
parámetro **`url`**, no `photo_url`; en IG el camino es `ig_create_container` → `ig_publish_container`.
Nada de esto estaba probado antes de hoy.

### 🎨 La imagen: escena bajo preset + tipografía de marca + el distintivo

Lo que salió no es una imagen genérica con texto encima. Es el **stack visual completo del Brief 8**
aplicado por primera vez en producción:

- **Escena bajo preset** — generada por ImageLab con el preset del canal real, no un roll libre.
- **Titular en EB Garamond** — la `display` de la marca (`public.brand_typography`, rol `display`),
  compuesta por el compositor de cómputo propio, no por el modelo de imagen.
- **Franja de identidad lila `#5C3472`** — el `primary` de ForumPHs (`public.brand_palette`),
  en modo `edge_left`, `full_bleed`, `width_pct: 1.8` sobre `imagelab_overlay_tokens`. Va **por el
  lado corto**, que es la decisión de Brief 8: la franja identifica sin competir con la escena.

El titular en la imagen **no es decorativo**: es el título gobernado de la pieza, el mismo que el
juez ve. Esa es la otra mitad del Brief 8 (abajo).

### 📐 Las 3 reglas de calibración de Sam — la doctrina nueva

Nacen de esta sesión, sobre piezas reales, y **las tres van al genoma y al prompt del carril**
(hoy viven sólo en `intel.approval_calibration` y en Professor; llevarlas al prompt y a
`intel.watcher_rules` es ítem de AGENDA, Fase 3):

1. **Regla de títulos — el título cierra la idea SOLO.** Sin exigir la imagen ni el caption para
   entenderse. El caso que la fijó: *«Es la prueba…»* — ¿de qué? Título trunco sobre una imagen
   perfecta = rechazo. Un título que necesita el resto de la pieza para significar algo no es un
   título, es media frase.
2. **Regla de texto — el texto CONDUCE.** `stake` (qué está en juego para el lector) → instrumento
   → movida concreta. **Si el lector puede cerrar con «sí, ¿y qué?», la pieza no está terminada.**
   Explicar mecánica sin dirección no es comunicar.
3. **Regla de voz FPHs — «la cuota extraordinaria» SIEMPRE completa.** Jamás «la extraordinaria».
   Es la **tercera vez** que Sam la reitera: mientras dependa de la memoria del escritor va a
   volver a fallar. Va al genoma **y** como watcher rule.

Complemento de la sesión, también doctrina: **los caracteres no se ahorran.** Los presupuestos de
longitud existen por **encaje de plataforma**, jamás por economía (mil caracteres son décimas de
centavo). La métrica editorial que importa es **el pliegue**: FB ~3 líneas antes de *Ver más*, IG
~125 caracteres antes de *más*. **La primera línea carga sola o la pieza no abre.**

### 🗳️ El dominio `la-asamblea-que-no-entiendo` — rechazado de lote y regenerado

El hallazgo del dominio estaba **envenenado en origen**: afirmaba **voto ponderado por cuota de
participación**, que es **falso para Panamá**. La **Ley 284/2022** establece **un voto por unidad
inmobiliaria** (las mayorías se computan sobre la totalidad de unidades); el coeficiente gobierna
propiedad y gastos, **no el voto**. El escritor generalizó desde regímenes donde sí hay voto
ponderado (CO/ES).

Lo grave no es el error: es que **nada lo vio**. Una pieza del dominio llegó a estar **aprobada por
Sam** el 21-ago por calidad de texto, y hubo que **revertir la aprobación** el mismo día tras el
fact-check legal. Ni el Watcher ni la doctrina detectan **claims normativos plausibles pero falsos
para la jurisdicción**.

- **Política de lote aprobada por Sam:** rechazo **de oficio** de todo el dominio en esa corrida
  (3 piezas asentadas en `approval_calibration`: `email_propietarios`, `linkedin`, `meta_fb`).
- **Regenerado esta madrugada:** `FPHS-ASAMBLEA` corrió el **22-ago 07:25:20 UTC** con el brief
  bajo **requisito legal** — toda afirmación normativa verificada contra **fuente primaria panameña**.
- **Corrección sistémica pendiente:** **gate experto (Ivette)** pre-publish en piezas con
  afirmaciones legales. En AGENDA, Fase 1.

### ✅ El resto del día, en corto

- **`approval_calibration`: 9 filas nuevas** en la ventana 21-ago 23:54 → 22-ago 09:40 UTC
  (3 `approved`, 6 `rejected`), todas `evaluated_by: sam`. Es el corpus con el que se calibra el
  juez, y hoy creció más que en cualquier día previo.
- **Diacríticos perdidos** — una pieza salió sin tildes ni eñes en **todo** el texto («quinto ano»).
  Defecto **intermitente** del generador: la misma corrida produjo piezas correctas con el mismo
  `raw`. El Watcher **no lo detecta** — gap de regla. Corrección acordada: **check determinístico**
  de integridad ortográfica pre-juicio (regex es-sin-tildes), **no** una regla LLM.
- **Escena fuera de tema** — un roll bajo preset produjo *drone cargando rack de servidores* y
  engranajes: vocabulario tech ajeno a la marca (parecía UNRLVL). La escena de ForumPHs habla de
  **patrimonio, edificio, copropiedad**. Texto y título se conservaron; sólo se rehízo la imagen.
- **Nota terminológica resuelta** — «fondo de reserva» **confirmado** como término correcto de uso
  frente a «Fondo para Imprevistos» (Ley 284). Cierra la observación abierta sobre las piezas 1 y 4.
- **6 agentes Vía A ya en cron** — `cron.job` **52–63**: research + process por agente, weekly para
  los dos `tier1` y biweekly para los cuatro `tier2`. **21 corridas/mes.** Tres agentes ya tienen
  `last_run_at` (`FPHS-ASAMBLEA` y `FPHS-CUOTA-POR-DENTRO` el 22-ago 07:25, `FPHS-ACTA-INSTRUMENTO`
  el 22-ago 10:01); los tres de rendición/cuota-extra siguen en `NULL`.

### 🔴 Lo que ForumPHs deja abierto (Fase 1 de la agenda)

1. **Sprint de override hasta >90 % de PASS** — el 25,9 % del 21-ago no es el techo.
2. **Drenaje de la ola 2** — las 21 corridas/mes ya están en cron y van a producir material más
   rápido de lo que hoy se revisa.
3. **Blog data-driven en `forumphs-com` — DECIDIDO.** Deja de ser «mecanismo por definir»: el blog
   se construye. Desbloquea `HR-FPHS-08` (`blog_enlace_interno`), que hoy exige enlazar artículos
   que no existen.
4. **Klaviyo para `email_propietarios`** — hay piezas aprobadas esperando canal.
5. **Gate experto de Ivette** — ver el dominio asamblea, arriba.

> **Lo que esta sesión demostró de arquitectura:** el tanque de texto se secó a dos horas del
> estreno (ver el incidente del 400 en `IID/session_log.md`) y **el lanzamiento salió igual**, con
> títulos, imágenes y sello de marca. Con el texto ya aprobado, Vertex vivo y un compositor de
> cómputo propio, la caída de un proveedor **se amortiguó**. Tener herramientas no es tener
> infraestructura; hoy se vio la diferencia.

---

## 2026-08-20/21 — Las primeras piezas de ForumPHs que pasan, y el canal por donde salen

Sesión de **carril**; el detalle completo de la reparación (G1, G2-A/E/F, Brief 6) vive en
`IID/session_log.md` (2026-08-20/21). Acá va lo que es de ForumPHs — que en esta sesión es
casi todo, porque **ForumPHs fue la marca sobre la que se midió la reparación**: es la que entra
a publicar el **22-ago**.

> Cifras verificadas contra la DB al cierre (21-ago ~21:00 UTC), medidas sobre `gate_detail`.

### 🟢 El canal Meta existe — el bloqueante del 22-ago que quedaba por cerrar

`public.meta_accounts` tenía **cero filas** para la marca. Estaba abierto desde el 2026-08-16 con
la anotación *"bloquea publicar el 22-ago, no programar"*, y era el único bloqueante de **canal**.

Fila sembrada el **21-ago 20:28 UTC**:

| Campo | Valor |
|---|---|
| `brand_id` | `ForumPHs` |
| `page_id` | `1184045168120977` |
| `ig_user_id` | `17841429192605028` |
| `ad_account_id` | `NULL` — la marca **no** hace ads todavía; el NULL es la declaración, no un olvido |
| `system_token` | presente `[token en Supabase — no exponer en repo]` |

**Canal operativo end-to-end.** Con esto ForumPHs queda como cuarta marca con cuentas Meta
conectadas, junto a `LucienSael`, `NeuroneSCF` y `UnrealvilleStudio`. **Se retira de pendientes.**

### 🟢 6 agentes IID propios — la Vía A de la marca

Hasta esta sesión ForumPHs consumía el carril **sin agentes propios**: 6 filas nuevas en
`intel.iid_agents`, todas `brand_id: ForumPHs`, `is_active: true`, creadas el 21-ago 20:39 UTC.

| Agente | Tier | Dominio | Voz | Frecuencia |
|---|---|---|---|---|
| `FPHS-CUOTA-POR-DENTRO` | tier1 | `la-cuota-por-dentro` | `fphs_educativa` | weekly |
| `FPHS-ASAMBLEA` | tier1 | `la-asamblea-que-no-entiendo` | `fphs_educativa` | weekly |
| `FPHS-ACTA-INSTRUMENTO` | tier2 | `el-acta-como-instrumento` | `fphs_educativa` | biweekly |
| `FPHS-RENDICION-JD` | tier2 | `rendir-cuentas-sin-sudar-jd` | `fphs_conversion` | biweekly |
| `FPHS-RENDICION-DOLIENTE` | tier2 | `rendir-cuentas-sin-sudar-doliente` | `fphs_editorial` | biweekly |
| `FPHS-CUOTA-EXTRA-JD` | tier2 | `la-cuota-extraordinaria-que-viene-jd` | `fphs_conversion` | biweekly |

Reparto por voz: **3 educativa · 2 conversión · 1 editorial** — coherente con la posición de voz
de la marca (se publica el estándar, nunca la carta). Los dos `tier1` son los dominios de mayor
volumen de duda del propietario; los `tier2` van quincenales.

**El requisito que llevan los briefs: 2+ casos con fuente.** Es la corrección aguas arriba del
gate `evidence`, que en la corrida de esta sesión rechazó **62 veces** por piezas sin con qué
sustentarse. El hallazgo pobre no lo arregla ni el escritor ni el juez: se arregla en el brief del
agente. Todavía **no rindió** — estos 6 agentes no habían corrido al cierre (`last_run_at: NULL`).

> **Para que existieran hizo falta arreglar la tabla.** `iid_agents_default_voice_check`
> **enumeraba las voces del ecosistema** dentro de la restricción, así que ninguna voz de ForumPHs
> era admisible y dar de alta una marca exigía `ALTER TABLE`. Corregido al eje —la restricción sólo
> pide que la voz exista y no esté vacía—. Detalle en `IID/session_log.md`.

### 🟢 Vía C — 6 semillas, 27 piezas, y las primeras PASS de la marca

**Primer PASS de la historia de ForumPHs: 21-ago 13:38 UTC.**

| | |
|---|---|
| Semillas (`intel.iid_seeds`, `lane: standard`) | **6**, despachadas 10:17–10:20 UTC, las 6 con `finding_id` |
| Piezas (`intel.iid_content_queue`) | **27**, sobre **6 dominios** |
| Juicios (`intel.watcher_log`) | **187** sobre 27 piezas (el exceso: reintentos de G2-F + variantes por destino) |
| PASS | **9 juicios sobre 8 piezas distintas** |
| **Ratio final por pieza** | **7 de 27 = 25,9 %** (último veredicto de cada pieza) |

El brief declara **~22–24 %**; la diferencia es el corte temporal, no el dato. Lo que importa:
**la marca venía de 0 % sostenido.**

Rechazos por gate, sobre los 178 REJECT: `hard_rules` **114** · `evidence` **62** ·
`duplication` **2**.

Los 6 dominios de la corrida son los mismos 6 de los agentes nuevos: desglose de la cuota,
límites de competencia de la asamblea, validez del acta, rendición de cuentas (lado JD y lado
propietario) y cuota extraordinaria.

**Ninguna pieza está aprobada.** `approval_status` sigue en 0 aprobadas sobre las 27: el PASS del
Watcher habilita, no publica. La aprobación es de Sam.

### El camino de la marca al 90 %

Diagnóstico de la sesión, en orden de rendimiento esperado: **(1)** material de research —los
briefs con 2+ casos con fuente, ya sembrados, sin rendir aún—; **(2)** el sprint de **override**,
que hoy no existe y deja al juez sin apelación; **(3)** la **varianza del juez**, sin medir. Los
tres van a AGENDA v2026-08-21-v1.

### Las tres voces siguen en v1.1

Sin cambios en esta sesión, verificado: `fphs_conversion`, `fphs_educativa` y `fphs_editorial` en
**v1.1 activas**; `fphs_institucional` **v0.5 inactiva**. Lo que cambió no fue la voz — fue lo que
el carril le pasa al juez para juzgarla.

### 🔴 Sigue abierto — y ahora con diagnóstico

- **`AUDIENCE_CTA` con claves legacy** (bloqueante declarado el 18-ago). `audience_frame` migró en
  la columna a `decide`/`influye` y `AUDIENCE_CTA` quedó en `jd`/`doliente`, resolviendo a cadena
  vacía. **Esta sesión le puso número al daño:** el `gate_detail` de la corrida muestra al gate7
  fallando exactamente ahí — *"la pieza no contiene CTA ni cierre orientado a decisión/contratación
  ... el frente `decide` exige que el cierre habilite esa decisión"*. El escritor no omite el CTA:
  **nunca se lo pidieron.** Prohibido reponer alias (`MULTIBRAND_RULE.md` §13).
- **`HR-FPHS-08` — la serie de apertura del blog.** La regla exige enlace interno a artículo
  publicado; `applies_when` ya la acota a `blog_forumphs`, pero **no hay artículos que enlazar**.
  Sigue siendo el backlog de la marca — y ahora hay diagnóstico del mecanismo: ver la inspección de
  `forumphs-com` en el PR de este Actualiza (**no existe ruta `/blog`**; el sitio es un
  `index.html` estático de una sola página). Va a AGENDA como ítem (e).
- **`fphs_conversion`** — corregir turnos 4/8/9 antes de publicar (año calendario t4; tuteo t8/t9).
- **`fphs_editorial`** — verificar datos regulatorios extranjeros del turno 16 antes de publicar
  esa pieza.

## 2026-08-18 — El eje `decide`/`influye` llega a la marca, y el CTA se queda atrás

Sesión de **carril**; el detalle completo vive en `IID/session_log.md` (2026-08-18). Acá va lo que
es de ForumPHs.

### Lo sembrado

- **`HR-FPHS-10` migrada al eje canónico `decide`/`influye`**, con su `instruction` propia
  (`intel.watcher_rules.instruction`, columna nueva de esta sesión). La regla venía juzgando contra
  el vocabulario viejo.
- **`creative_compatibility_rules`** — `fphs_conversion` y `fphs_editorial` × `email_divulgacion`,
  heredando el perfil de `editorial_post`.
- **`intel.brand_topic_platform_mode`** — **135 filas**, `cadence_mode: rotating`. El `anchor` queda
  en **NULL deliberadamente**: lo rotativo no ancla día, y dejarlo vacío es la declaración, no un
  olvido.

### 🔴 BLOQUEANTE DEL 22-AGO — `AUDIENCE_CTA` con claves legacy

`audience_frame` migró **en la columna** a `decide`/`influye`. **`AUDIENCE_CTA` en CopyLab no
migró:** sigue en `jd`/`doliente` y por eso **resuelve a cadena vacía**. Consecuencia medible:
**18 topics activos de ForumPHs con el escritor sin instrucción de CTA**. Nada falla, nada avisa —
el CTA simplemente no está.

**Prohibido reponer alias.** Mapear `influye → doliente` no repara: pediría **el CTA que el juez, ya
migrado, rechaza**. La cura es migrar al consumidor, no revivir el vocabulario. Va en **handoff
propio**; la regla general quedó escrita en `protocols/MULTIBRAND_RULE.md` **§13**.

### Sigue abierto de antes

- **Cuentas Meta de ForumPHs** — `meta_accounts` sin fila. **Bloquea publicar el 22-ago**, no
  programar. Dueño: Sam.

## 2026-08-16 — Cadencia al revés, 32/32 con regla propia, y el arranque del 22-ago

Sesión de **siembra y corrección** sobre ForumPHs. El detalle del carril (Scheduler, snapshots,
constructor único) vive en `IID/session_log.md` (2026-08-16); acá va lo que es de la marca.

### Reglas creativas de `fphs_conversion` — sembradas

Se cerró el gap que la cuenta de filas escondía desde el 2026-08-14: `fphs_conversion` no tenía
fila en `creative_compatibility_rules` en **ningún** `content_type`. Sembradas al nivel de criterio
de las filas vecinas, leyendo el genoma:

| `content_type` | Vectores |
|---|---|
| `editorial_post` | **9** |
| `social_post` | **7** |

**Resultado: 32/32 topics con regla propia** — verificado contra la DB: las tres voces (`fphs_conversion`, `fphs_educativa`, `fphs_editorial`) tienen fila en `editorial_post` y `social_post`, y los 32 topics activos se reparten 11 conversión / 14 educativa / 7 editorial.

> **Corrección de cifra (2026-08-16, contra la DB).** El brief decía *"22 de los 32 topics"* corrían degradados. Son **11 topics**, no 22: cada uno declara `voice_by_destination` con **dos** destinos, así que 11 topics × 2 destinos = **22 slots** — que es lo que la cifra contaba. El desglose original *"11 en editorial + 11 en social"* siempre fue exacto; el "22 de los 32" era la lectura equivocada de ese mismo número.

Antes, esos **11 topics / 22 slots** corrían **degradados** — sin
fila, `selectCompatRule` devolvía `source='none'`, `applyCreativeLogic` recibía `rule=null` y
filtraba **sólo por `aggro_min/max`**, dejando elegibles casi los 44 `creative_vectors` de
e-commerce. Eso se terminó.

### Rollout y cadencia

`rollout_started_at = **2026-08-22**`, con `max_rotation_weeks` **por clave** (`intel.brand_rollout`).

**La cadencia estaba sembrada al revés.** Estaba **decreciente**: mucho al principio, menos después
— exactamente el perfil que dispara el patrón de baneo, porque **el patrón de baneo es el ARRANQUE,
no la frecuencia**. Corregida a **curva crescendo**.

**Las tres voces con la misma curva, y es deliberado.** No es simplificación: si las tres arrancan
con el mismo volumen, una diferencia de rendimiento en el mes 3 es atribuible a **la voz y al
tema**, no al volumen. Igualar el volumen es lo que convierte el rollout en un experimento legible.

| Superficie | Techo |
|---|---|
| Blog | `2x` |
| LinkedIn | `2x` |
| Meta | `3x` |
| Email | `1x_month`, `anchor: day_5` (informe del día 5) |

### Compliance — de 9 a 11 reglas

ForumPHs pasa de **9 a 11 reglas**: gana las **2 globales `hard`**.

### 🔴 Bloqueante con fecha — cuentas de Meta

**ForumPHs no está en `meta_accounts`.** Esto **bloquea PUBLICAR el 22-ago**; **no bloquea
programar** — el `content-scheduler` v2.1 ya está desplegado y puede colocar las piezas. La
distinción importa: el rollout puede prepararse entero y quedar detenido sólo en el último paso.
**Dueño: Sam.** Ítem abierto en `AGENDA.md → ## 🔵 Próximas semanas`.

### Deuda que esta sesión deja anotada

- **Vaciar `brand_topics.cadence` en los 32 rotativos** — **irreversible**, y va **después** del
  paso 3 de cadencia, nunca antes. Lo ejecuta Claude.ai bajo HRD.
- **Paso 3 de cadencia** — retirar los 3 alias legacy (`brand_topics.cadence`,
  `brand_cadence.cadence_mode`/`.anchor`, `brand_rollout.max_rotation_weeks`) **contando**
  `class_source_counts` y `max_rotation_weeks_source` del reporte, no a ojo.

---

## 2026-08-14 — Snapshot sembrado, voces verificadas, y el gap que la cuenta de filas escondía

Sesión de validación del **carril async del AIID**; ForumPHs fue el banco de pruebas, no el fin.
Ninguna mutación de producción salvo la siembra del snapshot. Detalle del carril en
`IID/session_log.md` (2026-08-14).

### Snapshot v2.4 sembrado y verificado

`brand_cache_snapshots`, `built_at` **2026-08-14 21:16 UTC**, `built_by = manual_refresh`,
versión **2.4**. Escrito por `CopyLab/api/brand-cache.js` v2.4
(`https://unrlvl-copy-lab.vercel.app/api/brand-cache`), que hoy escribe con
`SUPABASE_SERVICE_ROLE_KEY` vía `sbWriteHeaders()` — la función **lanza** si la key no está,
en vez de degradar a anon en silencio — con `await upsertSnapshot(...)` y `res.ok` comprobado
con throw nominal.

Verificado **capa por capa**, no por presencia de la fila:

| Capa | Filas |
|---|---|
| `creative_vectors` | 44 |
| `tension_architectures` | 10 |
| `aggro_presets` | 5 |
| `creative_compatibility_rules` | 18 |
| genomas | 3 |
| `content_type_registry` | 24 |
| `platform_canal_map` | 9 |
| `pipeline_skills` | 12 |
| brand | presente |

ForumPHs es la marca **nueva** de las 9 con snapshot. Faltan 4 de 13 elegibles en el ecosistema
(DiamondDetails, PatriciaOsorioPersonal, SamPublisher, UnrealvilleStores) y **ninguna fila de la
tabla tiene `built_by='build_all'`**: el cron diario nunca corrió con éxito y, con
`CACHE_TTL_HOURS = 4`, todos los snapshots están stale de forma permanente.

### Las cuatro voces, verificadas en `brand_voice_genome`

| voice_id | version | maturity | active | `signature_closer` | updated_at |
|---|---|---|---|---|---|
| `fphs_conversion` | 1.1 | v1.1 | ✅ true | presente | 2026-08-09 |
| `fphs_educativa` | 1.1 | v1.1 | ✅ true | presente | 2026-08-10 |
| `fphs_editorial` | 1.1 | v1.1 | ✅ true | presente | 2026-08-11 |
| `fphs_institucional` | 0.5 | v0.5 | ⛔ false | presente | 2026-08-13 |

**Corrección de registro:** `ecosystem.json` declaraba `fphs_conversion` "reactivada 2026-08-08,
**SIN calibrar**: 11 topics / 0 filas". Era cierto **el 8 de agosto** y dejó de serlo **el 9**,
cuando la voz se selló en v1.1 — y la ficha no se actualizó. Los 11 topics siguen siendo 11; lo
que ya no es cierto es "sin calibrar".

**`fphs_institucional` v0.5 se declara por primera vez.** Existía en la DB, inactiva, y no
figuraba en ningún context file del repo. No opera: sin topics, sin fila en
`content_type_registry`. Su `signature_closer` es `null` explícito, por la política de firmas
del 2026-08-09.

### El gap: `fphs_conversion` gobierna 22 de 32 topics con el motor creativo degradado

`fphs_conversion` **no tiene fila en `creative_compatibility_rules` en ningún content_type**.
Reparto verificado de los 32 topics activos (`intel.brand_topics.voice_by_destination`):

- `fphs_conversion` → **11** en `editorial` + **11** en `social` = **22**
- `fphs_educativa` → 14 · `fphs_editorial` → 7

Consecuencia **por código**: `editorial_post` no tiene fila BASE (las cuatro existentes llevan
`voice_id`: `fphs_editorial`, `fphs_educativa`, `lucien_editorial`, `nscf_editorial`), así que
para esta voz `selectCompatRule` devuelve `source='none'`, `applyCreativeLogic` recibe
`rule=null` y filtra **sólo** por `aggro_min/max` — quedan elegibles casi los 44 vectores
creativos de e-commerce, sin criterio de genoma. En `social_post` sí existe fila BASE, así que
degrada a `source='base'` con warn nominal: menos malo, igualmente degradado.

**PENDIENTE (AGENDA P1):** sembrar `fphs_conversion` × `editorial_post` y × `social_post`, al
nivel de criterio de las filas vecinas — leer el genoma, no improvisar.

**Lo que hay que aprender de esto:** las 18 filas de `creative_compatibility_rules` del snapshot
parecen una capa sembrada. Sólo cruzarlas contra *qué voz gobierna cuántos temas* destapa que la
voz con más topics de la marca es exactamente la que no tiene ninguna. Contar filas no es
auditar.

### Registrado, no corregido

- **`surfaces[]` ausente en los 3 genomas** (contrato §10 de `MULTIBRAND_RULE`). Conviven
  vocabularios ad-hoc distintos: `canales`/`formatos`/`pipeline`/`fuente_de_verdad` en editorial
  y educativa vs `mapa_de_dominios`/`dos_frentes`/`reglas_invariables`/
  `candado_confidencialidad_BI` en conversion.
- **`CARRIL_EDITORIAL_CANAL`** en `CopyLab/api/execute.ts` contiene `blog_forumphs`: un literal
  de **esta marca** en capa compartida del ecosistema. Violación multimarca registrada con
  comentario en el código; la corrección es PR aparte (AGENDA P2).

---

## 2026-08-09 (cont.) — las tres voces de ForumPHs selladas en v1.1

**`fphs_educativa` v1.1** — sesión `a082116f-9cc4-4f96-97ae-65e23d45608e`
Completada a 11 turnos (10 SÍ + 1 control negativo), convergencia en 9-10-11.
**7 de 7 territorios probados**, 5 superficies cubiertas.

**`fphs_editorial` v1.1** — sesión `e71bebdc-8e52-4b5f-9332-fb6e62f0d34f`
Cerrada tras el control negativo del turno 14 con los turnos 15 y 16.
16 turnos, racha legítima en 13-15-16. **7 de 7 territorios probados.**

**CORRECCIÓN DE DIAGNÓSTICO — importante para el registro.** Los NO finales de
ambas sesiones NO eran convergencias fallidas: eran **controles negativos
deliberados** y el NO era el resultado esperado. Leer secuencias de veredictos sin
abrir el `notes_intent` produjo un falso positivo en las dos voces. Lo que sí era
cierto: una sesión sellada no puede terminar en un control, o el próximo lector lo
interpreta como rechazo.

**`content_type_registry`:** 5 filas de Educativa y Editorial **ya existían con
`format_instruction` NULL y `max_tokens` NULL** — una fila vacía no declara ninguna
regla y engaña a toda auditoría que cuente filas en vez de leer campos. Pobladas por
UPDATE. Hoy hay 7 filas completas para las tres voces.

**Reglas nuevas de marca (las tres voces):**
- Prohibido "plata", va "dinero". Reapareció en dos voces distintas el mismo día:
  toda corrección léxica que cruce de voz es de marca, no de voz.
- La invitación **abre la pieza siguiente, nunca cierra la actual**. Toda pieza debe
  ser concluyente en sí misma y además invitar.
- Marca en el cuerpo vs marca en la firma: en Educativa y Editorial la marca **no
  entra al cuerpo**; la firma la estampa el sistema.

**PENDIENTE, sesión de cierre de AIID:** cuentas sociales en 0 · `HR-FPHS-08`
cumplida a medias (sin `post_url` ni slugs, cada invitación es enlace muerto hasta
que exista la serie de apertura) · verificar los datos de España, Chile y EEUU del
turno 16 **solo si esa pieza se publica** (hoy es prueba de calibración).

---

## 2026-08-09 — fphs_conversion v1.1 sellada · las 4 voces normalizadas

**Calibración `fphs_conversion` — sesión `e1c33c9b-6af5-42c2-9139-843f81d93a9f`**
Convergida: 10 turnos, 7 SÍ / 3 NO, marcadores en 8-9-10 (exactamente la racha).
`resulting_voice_id='fphs_conversion'`. Tres NO reales y repartidos (turnos 2, 3 y 7);
cada uno cambió el genoma. Sin el problema de marcadores inflados de VizosSalon.

**Genoma v1.1** — `application_constraints` migrado de `array` a `object` preservando
íntegro el contenido de v1.0 (`dos_frentes`, `mapa_de_dominios`,
`candado_confidencialidad_BI` verificados presentes tras la migración).
Incorpora: eje de planteamiento (proyección a cinco años, no diagnóstico), mecanismo
de conversión sin CTA, doctrina de lucir mostrando el artefacto, regla de escala por
superficie, prohibición de elipsis, reglas de lengua y las decisiones de cierre.
`prohibited_registers` de 9 a 12.

**`signature_closer` — fallo silencioso corregido.** El carril lo estampa tras el PASS
del Watcher; sin la clave, la pieza salía sin firma y solo quedaba un log. Ninguna de
las tres voces activas de ForumPHs la tenía. Sembrada en las tres.

**Decisiones de Sam (2026-08-09):** usted siempre en los dos frentes · la firma la
estampa el sistema y el copy nunca la escribe · cierre de blog con enlace interno
obligatorio · publicación se trata en sesión aparte de AIID.

**`target_artifact` migrado a `surfaces[]`** en las tres sesiones de ForumPHs.
`fphs_conversion` 4 superficies · `fphs_educativa` 5 · `fphs_editorial` 2.

**`content_type_registry`:** sembradas `editorial_post`=3200 tk y `social_post`=900 tk
para `fphs_conversion`, con `format_instruction` calibrada. Antes caía al default de
social (640 tk, "pieza corta y filosa"), que contradice y trunca el post largo.

**Idioma:** `intel.brand_topics.languages='{es}'` en las 32 filas. `brand_languages` y
`brand_services` de `es-PA` a `es`.

**`intel.watcher_rules`:** HR-FPHS-04 reescrita para que juez y Builder digan lo mismo —
se prohíbe enumerar lo que la marca **ofrece**; mostrar lo que un entregable propio
**contiene** es demostración y está permitido.

**PENDIENTE, no cerrado hoy:** `fphs_educativa` y `fphs_editorial` cerraron su
calibración con un NO como último veredicto y están activas en producción. Los turnos
4, 8 y 9 de `fphs_conversion` tienen tu SÍ pero no cumplen dos reglas duras (año
calendario el 4; tuteo el 8 y el 9; cierre sin enlace interno el 4): se corrigen antes
de publicar. `brand_social_accounts` y `meta_accounts` en 0.

---

## 2026-08-08 — Posición ratificada con Ivette, reparto de topics y reactivación de `fphs_conversion`

**Conducido por:** Sam × Claude.ai + CC (Actualiza). **Marca:** ForumPHs. Bloque ecosistémico en `brands/UnrealvilleStudio/session_log.md` (2026-08-08). Este PR sólo toca context files de `unrlvl-context`.

### Posición de voz ratificada con Ivette
La voz publica el ESTÁNDAR, nunca instrumenta al lector: **se publica la pregunta, jamás la carta.** Asistir a los propietarios en su conflicto convertiría a la marca en parte del conflicto — y la JD, que firma el contrato, es quien se pierde. Se enseña a VER los números; no se dirige contra quién ni hacia dónde actuar.

### Reparto de los 18 topics (`audience_frame` en el eje del poder de contratación)
- **9 `decide`** → quedan en conversión.
- **9 `influye`** → **7 reclasificados a `fphs_educativa`** (su ángulo ya era educativo) + **2 quedan en conversión**.
- El eje `audience_frame` pasó a `decide` / `influye` / `general` (alias legacy `jd` / `doliente`); DDL post-merge por Claude.ai amplió el CHECK a los cinco valores y migró las 18 filas (`jd→decide`, `doliente→influye`).

### `fphs_conversion` reactivada
`abandoned` → `active`, con eje de 13 claves, lista para arrancar. **Sin calibrar aún: 11 topics, 0 filas** (pendiente de sesión propia).

### Filtro de psycho-presets
Solo **`PSY-URGENCY`**, y calibrada por **dato patrimonial** — la urgencia se sostiene en la cifra del patrimonio, nunca en presión emocional. El resto de presets no aplican a esta voz.

### Ángulo mal planteado — reescribir
`profesionalizar-sin-perder-el-control-doliente` está mal planteado: mezcla el frente del decisor con el del doliente y termina instrumentando al lector. Hay que reescribirlo.

---

## 2026-08-05 — Actualiza incremental (PR E): residuo de costo (`ops_cost_residual`), 6 flujos midiendo, BI re-diagnosticado

**Alcance:** actualización incremental de context files (`ecosystem.json`, `AGENDA.md`, este log) + derivados
(`ecosystem.md`, `ecosystem_filemap.md`), **sólo lo posterior al PR #31**. **VERIFICADO contra la DB**
(`information_schema` de `amlvyycfepwhiindxgzw` = unrlvl-db, y `tajuoqdbnsnzkhyqvdgs` = forumphs-db; la DB manda
sobre el brief). Este PR toca **sólo** `unrlvl-context`; el código de BI/FIE vive en `forumphs-document-factory`
(PRs **#23** y **#24** ya mergeados y desplegados). **CC no mergea — Sam mergea y borra la rama.**

---

### Instrumentación de costo — 3ª ola: el residuo de brecha (verificada contra la DB)

Dos objetos nuevos en `amlvyycfepwhiindxgzw` (verificados por `information_schema`), registrados en
`ecosystem.json → iid_subsystem.cost_instrumentation`:

| objeto | qué es (verificado) |
|---|---|
| `ops_cost_residual` (tabla) | residuo de brecha ledger↔Console por scope. Cols: `id`(uuid) · `scope_type` · `scope_value` · `residual_pct` · `valid_from` · `valid_to` · `measured_gap_pct` · `rationale` · `created_at`. Vigente = `valid_to IS NULL`. |
| `v_cost_residual_vigente` (vista) | `SELECT scope_type, scope_value, residual_pct, measured_gap_pct, valid_from, rationale FROM ops_cost_residual WHERE valid_to IS NULL`. |

**Filas vigentes (valid_from 2026-08-05):**
- `lab=document-factory` → residuo **12,000%** (`measured_gap` 12,000%; ledger **1,1186** vs Console **1,27**, clave `forumphs-document-factory`).
- `lab=fie` → residuo **3,500%** (`measured_gap` 3,500%; ledger **0,3672** vs Console **0,38**, clave `forumphs-fie`).

### Seis flujos ForumPHs midiendo (verificado en `ops_generation_ledger`)

`acta` (fphs-document-factory) · `fie_parse_pdf` (fphs-fie-parse) · `icr_audit` (fphs-icr) ·
`image_curation` (fphs-image-curation) · `informe_fie` (fphs-fie-generate) · `speaks_chat` (fphs-chat).

- **Costo unitario verificado contra factura:** acta **~$0,43 medido / ~$0,48 ajustado** (residuo 12%) ·
  suite FIE **~$0,38** medido y ajustado, coincidente al centavo con Console.
- **Auditoría del acta cerrada:** `/api/qa`, `classifyRoles`, `/api/parse` y **PRE-FLIGHT** (`preflightDetector`)
  verificados **deterministas** leyendo la fuente. No quedan superficies del acta sin instrumentar. El residuo
  restante se atribuye a dos `catch` exteriores que pierden tokens ya consumidos (`fphs-formalize` devuelve 500
  sin `logLedger`; el `JSON.parse` de `/api/icr` salta antes del asiento).
- **Hipótesis descartada:** el parse FIE manda 167k tokens de entrada de estructura fija y aun así la brecha es
  3,5% → los tokens de cache **no** son la causa del residuo del acta.

### BI re-diagnosticado (afina el PR-B del 2026-08-04)

El 08-04 el PR-B atribuyó el 404 de BI a `FPHS_SERVICE_KEY` sin `service_role` + RLS en `buildings`. Con el
**fail-loud del PR #23** en producción (distingue `0-filas-por-RLS` de `id inexistente`), la causa real salió a
la luz: **`monthly_kpis`, `eeff_preliminar` y `mora_mensual` están VACÍAS** — **0 filas en toda la DB**
`forumphs-db` (`tajuoqdbnsnzkhyqvdgs`), incluida `PH Lefevre 75 Don Enrique` (que **sí existe** en `buildings`).
**No era clave ni RLS: falta carga de datos, no código.**

### Vencimiento 2026-08-31

Vence el introductorio de Sonnet 5: **acta proyecta ~$0,72**, **suite FIE ~$0,57**. Verificar
`ops_rate_transitions` ese día (cron 38, 06:00 UTC) — no confiar en la automatización.

---

## 2026-08-04 — HRD_ACTUALIZA + BI + FIE: 2ª ola de costo, primer costo unitario de un acta, y dos frentes abiertos

**Alcance:** actualización de context files (`ecosystem.json`, `AGENDA.md`, este log) **verificada contra la
DB** (`information_schema` del proyecto `amlvyycfepwhiindxgzw`, no el brief) + apertura de dos PRs en
`forumphs-document-factory`. Este PR (A) toca **sólo** context files de `unrlvl-context`; los PRs B y C son
código y viven en el otro repo. **CC no mergea — Sam mergea y borra las ramas.**

---

### Instrumentación de costo — 2ª ola (verificada contra la DB)

Verificado contra `information_schema` de `amlvyycfepwhiindxgzw` (la DB manda sobre el brief):

| cambio | estado real en la DB |
|---|---|
| `ops_services` | catálogo de **20** servicios/proveedores (api/database/domain/ecommerce/hosting/media/custom) |
| `ops_credits` | tabla nueva de créditos/saldos por servicio — **3 filas** |
| `billable` (text) | añadida a `ops_costs` **y** `ops_generation_ledger` |
| `amount_original` + `currency_orig` | añadidas a `ops_costs` (costo en divisa original) |
| `ops_token_sessions` | **RETIRADA** → renombrada `ops_token_sessions_retired` (la original ya no existe) |
| `v_cost_pivot` | **31 columnas** (ejes en español) |

**Discrepancia brief ↔ DB:** el brief nombró 5 servicios nuevos (`vertex`/`resend`/`twilio`/`github`/`klaviyo`);
la tabla tiene **20**. Se registró el roster real completo, no los 5. (Un dato falso en `ecosystem.json`
sobrevive semanas sin dar error → la DB manda.)

### ForumPHs — T-series y primer costo de un acta

- **T1 migración aplicada; T3/T4/T5/T6/T6b mergeados.**
- **4 EFs verificadas contra el deploy** (marcador confiable = sufijo de `entrypoint_path`, no el repo):
  `fphs-icr-apply` **_37** · `fphs-bi-report` **_27** · `fphs-chat` **_44** · `fphs-formalize` **_52** (todas ACTIVE).
- **Primer costo unitario de un acta ForumPHs = $0,42**, respaldado por **35 asientos** ForumPHs en
  `ops_generation_ledger` (`ops_costs` aún sin filas ForumPHs). Brecha Console↔ledger de **62% a 12%**.

### Dos frentes abiertos en `forumphs-document-factory` (PRs B y C — aparte)

- **PR B — BI (rama `fphs/bi-rls-diagnostico`).** El 404 de BI **no es de código**: `FPHS_SERVICE_KEY` no
  contiene una clave `service_role`, y `buildings` tiene RLS activo (2 políticas) → devuelve 0 filas, que la EF
  traduce a 404. CC hará fail-loud en `fphs-bi-data`/`fphs-bi-report` para distinguir *0-filas-por-RLS* de
  *id inexistente*. **La rotación de la clave la hace Sam** (no CC).
- **PR C — FIE (rama `fphs/fie-sonnet5-e-instrumentacion`).** `/api/fie/generate` y `/api/fie/parse` corren
  `claude-sonnet-4` (retirado) → migración a `claude-sonnet-5` + instrumentación al `lib/server/ledger.ts`
  compartido. **FIE usa `ANTHROPIC_API_KEY`, no `forumphs_document_factory`** → superficie de costo separada,
  por eso nunca apareció en la medición del acta. Va **después** de mergear B (mismo repo, no cruzar ramas).

**Este turno:** entregado sólo **PR A** (context files). B y C quedan para después de que Sam confirme y
mergee, en ese orden.

---

## 2026-07-26 — DF: acta Torres de Castilla defectuosa · reparación completa + reporte ICR + runbook de fix v2 + skill `acta-repair`

**Alcance:** el DF generó el acta de la Segunda Asamblea Ordinaria 2026 de Torres de Castilla con
fallos estructurales. Se reparó a mano contra las fuentes primarias, se emitió su reporte ICR, se
investigó el código real del DF y se produjo el runbook de fix. Nació el skill `acta-repair`.
**Cero código tocado. Cero PRs. Cero escrituras en FPHS.**

---

### El acta que produjo el DF no era del edificio correcto

| lo que escribió el DF | verificado |
|---|---|
| PH "LEY 284 DE 14 DE FEBRERO" | **P.H. Torres de Castilla** — tomó el nombre de la ley |
| Finca `302855586` · código `8706` | **no consta**; `buildings.registro_finca` NULL en 8/8 |
| Asamblea EXTRAORDINARIA · virtual | **Segunda ORDINARIA 2026 · presencial** |
| Quórum 0 unidades (0%) "supera el mínimo de 157" | **221 de 312 = 70,83%** |
| Umbral 157 (art. 67 sobre el total) | **131** (art. 74, 51% de 255 al día) |
| Segundo llamado | **no ocurrió**; instalada 2:32 p.m. |
| Sección 2 duplicada · cuerpo truncado · 8 secciones vacías | — |
| Ninguna unidad de los 5 electos correcta | ver §8-bis del runbook |

**Origen de la finca — no era contaminación del GOAL example.** El placeholder del campo en
`PreflightForm` dice `(ej: 30285586)` y `(ej: 8706)`: la finca y el código **reales de Venezia
Tower**. El acta salió con ese placeholder más un dígito. Un texto de ejemplo que contiene dato
verdadero de un cliente. Es exactamente la deuda **#62**, que estaba anotada como "barrer residuos
Venezia-céntricos de la UI" — su consecuencia real era mucho peor que cosmética.

**El bloque de firmas roto nace en el mismo formulario:** los campos de presidente y secretario
vienen prellenados con el literal `"de la Junta Directiva"`, que es lo que apareció firmando.

---

### El ICR no podía detectarlo

`app/api/icr/route.ts` es **100% LLM, cero gates deterministas**. Su ground truth completo es
`parsed.attendance.length`, el resumen de votos, la lista de administración y el texto del acta.
**No recibe `buildings`, ni el padrón, ni `units`.** No es que se le pasara el PH inventado: no
tenía con qué compararlo.

Su `LEY_284_RULES` cubre los arts. 62, 64, 67 y 83. **No incluye el 74** (elección de JD sobre
unidades al día), ni el 73, 90 ni 68. Generador y auditor compartían la misma laguna, así que la
revisión no revisaba. Y el `catch` devuelve `APPROVED_WITH_NOTES` — *"never block the user's
download"*: un ICR que crashea produce un veredicto casi-aprobado.

---

### Reparación entregada

**Acta corregida v2** — 17 pp., reconstruida contra transcripción, lista de asistencia, capturas de
votación y resumen consolidado, cruzada contra el padrón FPHs. Incluye el **Anexo A** que el DF
omitió: **221 unidades** con finca individual y titular.

**Corrección de Ivette (calificó el acta 98/100):** el anexo lista **solo presentes o representados**;
las ausentes no aparecen. Estaba a la vista en los dos actas de referencia — Venezia lista 135 de 182,
Lefevre 123 de 163 — y no se leyó. Se bajó de 312 filas a 221.

**Decisión de Sam:** el personal de la plataforma de votación **no se menciona** en el acta. No es
relevante al objeto. ⚠️ El ejemplo canónico de las instrucciones del proyecto enseña lo contrario
(*"El señor Daniel Puentes de la empresa Hipal dio la bienvenida…"*) — **hay que corregirlo**, o el
DF y el skill seguirán aprendiendo la regla vieja de la fuente más autoritativa que tienen.

**Reporte ICR** — BLOQUEADO, 10 hallazgos (2 críticos · 3 altos · 3 medios · 2 bajos), **ninguno
resoluble sin Ivette**. Los dos críticos: finca y código del inmueble inexistentes; y los 6 locales
comerciales figuran en la plataforma a nombre del Secretario electo, que en la misma sesión declaró
que pertenecen a la promotora con representante propio — con 6 votos detrás.

**Regla que se violó y quedó escrita:** se entregó primero el acta **sin** reporte ICR. Lo detectó
Sam, no el sistema. Un acta reparada sin ICR parece limpia y no lo está — peor que el BLOQUEADO
honesto del DF.

---

### Contrato nuevo del DF — tres capas

El DF tiene hoy un contrato implícito equivocado: **entregar siempre un `.docx`**. Cinco
degradaciones silenciosas distintas en el código son la misma decisión repetida (`db()` traga el
error en `fincaLookup` y en `actaConfig`; `detectPlatform` degrada a `hypal`; el `catch` del ICR
aprueba; `resolveBuildingId` devuelve `null` y el pipeline sigue).

| capa | regla |
|---|---|
| **CAPACIDAD** | el DF hace el trabajo: lee los PNG, procesa el formato, no informa de lo que puede resolver |
| **BLOQUEO** | uno solo: **si el PH no está en la DB, no hay acta** |
| **DECISIÓN** | todo lo demás lo decide el operador informado, y **la decisión queda escrita en el ICR** |

La pregunta no es *"¿generás igual?"* — eso significa entregar algo malo. Es **"¿generar borrador
para reparación?"**: lo que sale por ese camino es materia prima para el skill, con nombre
`BORRADOR_ACTA_...`, rótulo **NO FIRMABLE** y veredicto BLOQUEADO por definición.

El ICR gana la sección **DECISIONES DEL OPERADOR**: qué se advirtió, qué se eligió, cuándo. El
hallazgo se redacta neutro; **la decisión de proceder es un hallazgo aparte**, por haberse tomado
fuera de HRD.

> El preflight ya avisa antes de generar (*"ICR — Orden del Día no detectado"*) y ya recoge
> overrides manuales. **La capa de decisión no hay que inventarla: hay que convertir avisos
> existentes en decisiones registradas.**

---

### Hallazgos de datos — FPHS

| hallazgo | detalle |
|---|---|
| Tres cifras de unidades | `total_units` 305 · filas `units` 306 · reales **312** |
| Faltan los 6 locales | `L 01`–`L 06`, cero `commercial` en `units` — es la deuda arrastrada desde el 8-jun |
| `registro_finca`/`registro_code` NULL | **8/8 edificios** — es lo que empuja al DF a inventar |
| Finca de 9 dígitos | `B 27-F` → `302069995`; todas las demás tienen 8 |
| `full_name` contaminado | `A 18-C` y `A 28-B` traen notas operativas dentro del nombre |
| `acta_admin_personnel` | falta **Alberto Paul** (asesor legal externo) |

**Sembrar `registro_finca` en los 8 PH es la palanca principal del fix.** Media tarde de trabajo
separa un DF autónomo de uno que depende del skill en cada corrida.

---

### Entregables

1. **`RUNBOOK_FIX_DOCUMENT_FACTORY_v2_2026-07-26.md`** — 4 fases, 8 PRs (PR-0 saneamiento del
   preflight primero, por barato y sin dependencias), 8 gates deterministas, manifiesto de corrida
   `df_run_manifest` en UNRLVL, y §8-bis con los datos verificados del caso como fixture de regresión.
2. **`skills/acta-repair/SKILL.md`** — v1.0, ya en el repo.
3. **Acta corregida v2 + reporte ICR** — a Ivette.
4. **`DF_HALLAZGOS_…md`** — registro histórico del caso. ⚠️ **No cargar a la sesión de fix**: sus
   causas raíz están superadas en tres puntos.

### Skill nuevo — `acta-repair` v1.0

Camino de reparación forense, **no un DF de bolsillo**: generar a escala sigue siendo del DF.
Abre con **Regla 0 — nunca se entrega un acta sin su reporte ICR**, incluso sin hallazgos
(estado `APTO PARA FIRMA`): el reporte es el acto de haber revisado, no la lista de defectos.

Contiene: las tres magnitudes (total ≠ al día ≠ presentes) con el artículo que gobierna cada una ·
arts. 62/67/68/73/74/83/90 · jerarquía de fuentes con la DB mandando siempre · las cuatro trampas
del padrón · reconciliación de hablantes contra diarización no confiable · OCR con sus trampas ·
los 8 gates · reglas duras del acta · formato del ICR · checklist de cierre.

**§6.2 resuelto:** el rulebook Ley 284 se escribe **una sola vez**, como §2 del skill. PR-4 lo
implementa desde ahí, no lo reescribe. Corrige la decisión de `actaConfig.ts`, que declaraba la ley
"embebida en el agente por ser común a todo PH": común y estable no significa que vaya en código,
significa que es dato de **jurisdicción**.

---

### Pendientes que deja esta sesión

1. **Corregir el ejemplo canónico** de las instrucciones del proyecto (personal de plataforma).
2. **Sembrar `registro_finca` + `registro_code`** en los 8 PH — desbloquea el DF.
3. Fase 0 del runbook: verificar env vars y logs de `detectPlatform` **antes** de cualquier PR.
4. §4.1 del runbook queda **a verificar**: la captura del preflight muestra `Hypal / Zoom`
   detectado, no `toc`. El manifiesto (Fase 1) lo resuelve en una corrida.
5. Insertar los 6 locales · limpiar `full_name` de `A 18-C` y `A 28-B` · verificar finca `B 27-F`.
6. Ivette debe cerrar los 10 hallazgos del ICR antes de firmar.

### REGLAS DB / DEPLOYS DE ESTA SESIÓN

- **Cero escrituras en FPHS.** Todo lectura.
- **Cero repos tocados. Cero EFs. Cero PRs.**
- **Professor: 2 learnings** (`session_date` 2026-07-26, `brand_id` ecosystem, `TOOLING_GOTCHA`,
  `approved_by_sam=true`, score 4): OCR en el contenedor de Claude Chat (tesseract y pytesseract SÍ
  están instalados, pack `spa` NO, reescalado ×4 obligatorio en capturas de UI, validar por
  aritmética nunca por confianza en el OCR, imágenes de un `.docx` con `unzip word/media/*`) ·
  tool results grandes no entran al contexto: se descargan a `/mnt/user-data/tool_results/*.json`
  y se leen con bash, sin reintentar la llamada.
- ⚠️ **Fallo de protocolo registrado:** los learnings se escribieron por SQL directo sin verificar
  antes el proxy `/api/professor` con `action=checkpoint`, como manda `HRD_PROFESSOR` paso 1. El
  proxy está vivo desde el 18-jul.

---
*ForumPHs · reparación de acta Torres de Castilla + runbook de fix v2 + skill acta-repair · 2026-07-26*

## 2026-07-23 — Genoma de conversión: 18 topics sembrados + BI destilado + sitio corregido

**Alcance:** cierre del ítem #82 (brand_topics de `fphs_conversion`), destilación del BI real a
JSON consultable, erradicación de Ley 284 en `public.brands`, revisión completa de forumphs.com,
y cableado del pipeline (4 PRs mergeados, **ninguno desplegado aún**).

---

### Sembrado — 18 topics `fphs_conversion`

Arquitectura decidida: **cada dominio se desdobla en una fila por frente real**. Los 9 dominios
tienen doble frente → 18 filas (9 `jd` + 9 `doliente`). Opción descartada: los dos frentes en una
sola fila, porque CTA/objetivo/plataforma difieren y dejaría a gate7 juzgando a ciegas.

| # | dominio | frentes |
|---|---|---|
| 1 | `el-momento-del-cambio` | jd + doliente |
| 2 | `la-jd-que-hereda-un-desastre` | jd + doliente |
| 3 | `rendir-cuentas-sin-sudar` | jd + doliente |
| 4 | `el-informe-que-si-existe` | jd + doliente |
| 5 | `profesionalizar-sin-perder-el-control` | jd + doliente |
| 6 | `la-cuota-extraordinaria-que-viene` | jd + doliente |
| 7 | `mi-unidad-vale-menos-y-no-lo-sabes` | doliente (madre) + jd |
| 8 | `las-cuatro-preguntas-que-nadie-calcula` | doliente + jd |
| 9 | `el-futuro-de-tu-patrimonio` | jd + doliente |

**Parámetros transversales:** ambos frentes usan las 4 plataformas (`meta_fb`, `meta_ig`,
`linkedin`, `blog_forumphs`) — la plataforma segmenta *función*, no audiencia: Meta recluta,
LinkedIn y blog convierten. Cadence crescendo en Meta/LinkedIn; blog `on_supply` (sin tope).

**6 etiquetas de `objective_by_platform`:** `jd__reclutar_gancho`, `jd__convertir_autoridad`,
`jd__convertir_profundo`, `dol__sembrar_gancho`, `dol__validar_aporte`, `dol__armar_exigencia`.

**Columna nueva `audience_frame`** (`text`, CHECK `IN ('jd','doliente','general')`, nullable).
Patrón reusable para cualquier marca con decisor ≠ usuario.

Las 32 filas FPHs (3 voces) recibieron además `hard_rules.blog_enlace`: toda pieza de blog cierra
invitando a otro artículo del genoma.

---

### BI destilado — `brand-intel/forumphs/bi_2025.json`

Bucket **`brand-intel`** creado (privado, MIME JSON+HTML). `iid-expert-uploads` fue descartado:
su `allowed_mime_types` solo admite video e imagen.

7 hallazgos financistas extraídos del BI real: `mora_aparentemente_controlada`,
`liquidez_en_descenso`, `cero_fondo_de_reserva`, `extraordinaria_elevadores_ano3`,
`deficit_estructural_por_unidad`, `erosion_valor_patrimonial`,
`cuatro_indicadores_que_nadie_calcula`.

Estructura por hallazgo: `titular_financista`, `lectura_superficial`, `lectura_del_financista`,
`cadena_de_consecuencia`, `reflexion_espejo`, `gancho_doliente`, `angulo_jd`,
`rangos_realistas_para_variacion`.

**Candado real:** cifras SÍ, sin atribuir origen. Excluidos del JSON: nombre del PH, ubicación,
proveedores, número de pisos. Decisión de Sam: *"el BI es un as bajo la manga y el punto de
cierre seguro — no va en la home"*.

---

### Ley 284 erradicada de `public.brands`

5 campos corregidos. El más grave: `extra_instructions` **ordenaba** "Citar Ley 284 cuando
relevante", contradiciendo la regla dura de marca. También `key_messages[2]`, `agent_value_prop`,
`territory`, `differentiators[2]` y `[5]`.

`brand_context` se conserva intacto (explica *por qué* no se cita). Genoma y `brand_topics` no se
tocan: sus menciones son las reglas prohibitivas.

**Rol canónico de Ivette Flores:** *Abogada · Especialista en Régimen de Propiedad Horizontal*.

---

### Sitio forumphs.com — 25 ediciones (subido a GitHub)

9 × Ley 284 → Régimen de PH · 4 × rol de Ivette · 9 × oposicionales eliminadas (incluido
"no un intermediario" del hero) · hero con el slogan invariable · About reanclado al oficio ·
datos actualizados (8 PH, +10 años de oficio, ~1.500 unidades) · sección nueva **"Inteligencia
financiera"** con 4 quotes BI · FAQ del frente doliente · fecha fija → "Último período".

---

### Pipeline — 4 PRs mergeados, **0 desplegados**

| PR | contenido | estado |
|---|---|---|
| #23 | `platforms_by_destination` + consumo en fanout | merged |
| #24 | cableado `objective_by_platform` + `audience_frame` + gate7 con frente | merged |
| #25 | U1 — gate5 distingue variante de duplicado | merged |
| #26 | U2+U3 — preset y plataforma llegan al copy | merged |

**Migraciones aplicadas vía MCP** (`db push` no es fiable en este proyecto):
`add_audience_frame_to_brand_topics`, `widen_iid_content_queue_voice_check_fphs`,
`brand_topics_platforms_by_destination`.

CHECK de `iid_content_queue.voice` ampliado a 6 voces (antes bloqueaba toda voz de FPHs).

Mapeo de 17 etiquetas → `objective_tag`. 3 correcciones de Sam sobre la propuesta de CC:
`golpe_gancho_captacion`→`surprise`, `gancho_de_reencuadre`→`curiosity`,
`reencuadre_incomodo`→`surprise`.

---

### ⚠️ Estado de deploy al cierre

`iid-core` `_32` · `content-watcher` `_14` · `content-run-stage` `_50` — **las tres sirven código
anterior a los 4 PRs**. Nada de lo mergeado hoy está corriendo.

> **✅ ADENDA (mismo día, posterior al cierre del bloque de arriba).** El deploy SE HIZO.
> Verificado por CC contra `list_edge_functions` el 2026-07-23: `iid-core` **`_33`** ·
> `content-watcher` **`_16`** · `content-run-stage` **`_51`**. Los 4 PRs están corriendo en
> producción. **P1 queda CERRADO.** El párrafo de arriba se conserva como quedó al cierre de la
> sesión — no se borra, se corrige debajo.
>
> **P2 también cerró el mismo día:** `platforms_by_destination` sembrado en **las 48 filas** por
> Claude bajo HRD, con exhaustividad verificada en ambas direcciones (`platforms ⊆ union` 48/48 y
> `union ⊆ platforms` 48/48) → cero plataformas huérfanas, cero literales fantasma.
> **`email_propietarios` → `editorial`** (está en `PLATFORM_NO_ADAPT`, objetivo
> `relacion_de_confianza` → `trust`, y un email educativo respira largo; `social` lo mandaría a
> pieza corta y filosa). **El frente activo pasa a U4**, que va junto con P4 en un mismo PR: el
> sembrado le dio a LucienSael un split real (`social` = x/meta_fb/meta_ig/tiktok · `editorial` =
> blog), su fila editorial materializa `blog` como `platforms[0]`, y sin P4 ese ensayo entra al
> adaptador con reglas de Instagram.

#### Pendientes ordenados por bloqueo

1. ✅ **Deploy de las 3 EFs** — HECHO y verificado (`_33` / `_16` / `_51`)
2. ✅ **Sembrar `platforms_by_destination`** — HECHO, 48/48, exhaustividad verificada en ambas direcciones
3. 🟠 **U4** — fan-out emite `platforms=[p]`; cierra por diseño el defecto de `platforms[0]` ← frente activo
4. 🟠 `blog` de LucienSael falta en `PLATFORM_NO_ADAPT` (CC metió `blog_forumphs` y `email_propietarios`) — va en el mismo PR que U4
5. 🟡 Registro de migraciones divergido (3 de 6)
6. 🟡 Voice sibling `Ivette-persona` (requiere calibración)
7. 🟢 BI como imán de conversión en el sitio (dos caminos abiertos)

> Handoff completo de la sesión (estado verificado contra DB + EFs, decisiones cerradas, reglas de
> voz nuevas y gotchas de tooling): `brands/ForumPHs/ESTADO_Y_HANDOFF_2026-07-23.md`.

---

## 2026-07-22 — SIEMBRA DE `brand_topics` · ForumPHs pasa de CERO topics a DOS voces operables (Educativa + Editorial) + mapa de dominios de las 3 voces

> Continuación directa de la calibración del 21-jul (b). Aquella destiló las voces; ésta les da AGENDA.
> ForumPHs deja de estar muda: el pipeline ya puede ejecutar dos de sus tres voces.

### CONTEXTO
Sam eligió cerrar el pendiente #82 (`intel.brand_topics` = 0 filas). Método acordado: **explorar los
dominios de cada voz ANTES de fijar cadencia** — la cantidad de topics no es la meta; cada voz necesita
los territorios que requiera para respirar sin repetirse, y mapear todo primero deja ver el volumen real
del que sale la cadencia honesta. Se mapearon los **23 dominios de las 3 voces** y se sembraron las **2
primeras voces completas** (Educativa 7 + Editorial 7). Conversión (9 dominios) queda para sesión propia.

### MAPA DE DOMINIOS — grabado en la DB (no se pierde entre sesiones)
Los 3 mapas viven en `founder_axis.mapa_de_dominios` de cada sesión de calibración
(`a082116f` educativa, `e71bebdc` editorial) y en `fphs_conversion.application_constraints`.
Dominios que comparten TEMA (mora, asamblea, fondo de reserva) **no se pisan: se separan por VERBO.**

**Educativa (7, ENSEÑA):** patrimonio-vs-apartamento · la-cuota-por-dentro · el-acta-como-instrumento ·
mis-derechos-bajo-el-regimen · la-asamblea-que-no-entiendo · la-mora-cuando-escala · el-regimen-que-me-rige.
Los dos últimos con frontera anti-asesoría (marco general, no el caso del lector = Ivette).

**Editorial (7, REVELA):** administrado-vs-atendido (reencuadre madre) · administracion-sin-sistema ·
la-reunion-como-metodo · el-dinero-sin-proyeccion · la-mora-que-se-persigue · mis-datos-de-quien-son
(mayor filo latente) · hacia-donde-va-el-oficio (horizonte internacional).

**Conversión (9, VENDE, DOBLE FRENTE — mapa grabado, SIN sembrar):** el-momento-del-cambio ·
la-jd-que-hereda-un-desastre · rendir-cuentas-sin-sudar · el-informe-que-si-existe ·
profesionalizar-sin-perder-el-control · la-cuota-extraordinaria-que-viene · mi-unidad-vale-menos-y-no-lo-sabes ·
las-cuatro-preguntas-que-nadie-calcula · el-futuro-de-tu-patrimonio.

### CORRECCIÓN DE ARQUITECTURA — la JD es INFLUENCER, no decisor (Sam)
El decisor soberano de un PH es la **ASAMBLEA**; la JD propone/empuja/recomienda a los suyos pero no firma
la voluntad colectiva. Consecuencia: **la Conversión tiene DOS FRENTES.** Frente JD = vende el servicio
(CTA contrátennos). Frente doliente = vende **la EXIGENCIA** (CTA exige el estándar), armando al propietario
para que presione en asamblea. Un influencer capturado (JD que busca conocidos, acepta arreglos) se
neutraliza con un soberano informado. El mismo dominio se cuenta con dos enfoques (`audience_frame` jd/doliente),
no son dos listas. **La frontera del turno 4 escala:** el frente doliente SÍ empuja a la acción — pero hacia
el ESTÁNDAR, nunca contra la persona ("exige que se evalúe" = legítimo; "exige que echen a tu administrador"
= quema, gana al doliente y pierde al influencer que trae el contrato).

### EL BI REAL COMO ACTIVO DE CONVERSIÓN
Sam adjuntó `ForumPHs_BI_ClienteConfidencial_2025` — proyección financiera real de un PH. Es **la prueba de
las dos banderas hecha producto**: convierte cada carencia en una consecuencia futura con nombre, fecha y
monto (extraordinaria de $420–630/unidad en 2028 por elevadores; índice patrimonial 54/100; fondo de reserva
en $0; 1.3 meses de liquidez; los 4 indicadores que "ningún administrador calcula"; calendario de reemplazos
2026-2030). Dio **4 dominios nuevos a la Conversión** (cuota-extraordinaria-que-viene, mi-unidad-vale-menos,
las-4-preguntas, el-futuro-de-tu-patrimonio) que NO prometen, DEMUESTRAN — blindados contra la regla dura.
**Candado de confidencialidad (matiz de Sam):** la protección ya está en el diseño del BI (sin nombre, sin
datos identificables); la regla NO limita el uso — Sam recomienda fuertemente usar su contenido de ejemplo.
Cifras y tipos de hallazgo habilitados; única prohibición = cualquier dato que sugiera IDENTIDAD del PH.
Todo grabado en `fphs_conversion.application_constraints`.

### META COMO EMBUDO DE CAPTACIÓN DEL EDITORIAL (corrección de Sam)
La Editorial no es solo voz de destino: **Meta es donde el doliente que NO sigue todavía se engancha** con
una pieza punzante y migra al blog/LinkedIn. El caption es el tráiler, el blog es la película — en Meta va
el GOLPE como gancho + invitación a la pieza larga, nunca el argumento completo. `hacia-donde-va-el-oficio`
es el anzuelo principal. Por eso la Editorial lleva `meta_ig`/`meta_fb` además de `linkedin`/`blog`.

### LO SEMBRADO — 14 topics activos en `intel.brand_topics`
- **fphs_educativa (7 topics):** blog + LinkedIn + Meta IG/FB + email. Filo 3/10. Cadencia repartida entre
  los 7 para que el total por plataforma sea sano (blog ~2/sem global, LinkedIn 3/sem, Meta 4/sem c/u, email 2/mes).
- **fphs_editorial (7 topics):** LinkedIn + blog + Meta IG/FB (captación). Filo 7/10. Cadencia más baja
  (voz de posición). `hacia-donde-va-el-oficio` con la cadencia de Meta más alta (anzuelo).
- **TODOS:** `active=true`, `auto_approve=false` (gate de Sam), `voice_by_destination` a su voz sin cruce,
  `sibling_stagger=true`, con `angle` + `objective_by_platform` + `cadence` + `hard_rules` completos.
- **La frontera anti-instigación va en los 14 `hard_rules`:** blanco = la práctica, nunca la persona; no
  dirige contra el administrador actual (gana al doliente, pierde al decisor).

### HITO — objective_by_platform
**ForumPHs es la PRIMERA marca del sistema con `objective_by_platform` poblado** (el resto lo tiene NULL,
pendiente #44) → gate7 (objetivo↔estímulo) y gate8 tienen con qué trabajar por fin en runtime.

### GOTCHA DE TOOLING (registrado en Professor)
`brand_voice_genome.application_constraints` es un **ARRAY jsonb, no un objeto.** El `|| jsonb_build_object()`
mete el objeto como ELEMENTO (persiste, pero estructura fea); y `?`/`jsonb_object_keys()` **fallan o dan
falso-negativo** sobre un array — una verificación con `?` dijo que el contexto de la Conversión NO estaba,
cuando SÍ estaba. Para verificar contenido en array jsonb usar `jsonb_pretty()`, nunca `?`. El contexto
ultrafino de la Conversión (dos frentes, 9 dominios, candado BI) quedó correctamente persistido.

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- `intel.brand_topics` — **14 INSERT** (7 educativa + 7 editorial), todos active, auto_approve=false.
- `intel.calibration_sessions` — 2 UPDATE (mapa de dominios en `founder_axis` de educativa y editorial).
- `public.brand_voice_genome` — UPDATE de `fphs_conversion` (dos frentes + mapa 9 dominios + candado BI)
  y de `fphs_educativa`/`fphs_editorial` (dato regulatorio de Ivette, ya de la sesión previa).
- **Cero repos tocados. Cero EFs. Cero PRs de código.**
- **Professor: 8 learnings** (`session_date` 2026-07-22, `approved_by_sam=true`), 5 con score 5.

### PENDIENTES QUE DEJA ESTA SESIÓN
1. **Sembrar `fphs_conversion` (9 dominios, doble frente).** Mapa + BI + candado ya persistidos en el
   genoma → el próximo chat los lee con solo cargar el genoma. Es la siembra más grande y delicada
   (doble frente + cifras reales del BI sin filtrar identidad) → merece sesión fresca propia.
2. **El eslabón de runtime:** que el scheduler/dispatcher (R4B #5e) levante estos topics. Ahora hay con
   qué alimentarlo, pero el carril automático es territorio de R4B, no de esta sesión.
3. Los pendientes heredados de la calibración siguen abiertos: humanize_profiles sin verificar (#83),
   convención de `maturity` (#84), Ivette-persona (sesión propia), sitio forumphs.com (#74 original).

---
*ForumPHs · siembra de brand_topics: 2 voces operables (Educativa + Editorial) + mapa de 23 dominios + BI como activo de conversión · 2026-07-22*

## 2026-07-21 (b) — CALIBRACIÓN Y DESTILACIÓN DE VOZ · familia de marca ForumPHs COMPLETA (`fphs_educativa` v1.0 + `fphs_editorial` v1.0)

> Sesión distinta y posterior a la del pivote FPHS-OPS→agente WhatsApp del mismo día. Aquella fue producto e infraestructura; ésta es VOZ. No se tocó nada del agente.

### CONTEXTO — qué se pidió y qué cambió en el camino
Sam pidió "calibrar y destilar ForumPHs" con el skill `r4b-genome-calibration`, 2 voces en la sesión,
y declaró a **Ivette como marca propia** (vinculada a FPHs igual que PO a NSCF) — su calibración
queda para sesión aparte. La Fase 0 cambió el plan: **la deuda #73 ya estaba cerrada**.

### FASE 0 — lo que la verificación encontró (y contradijo)
| Checklist | Estado real |
|---|---|
| Marca en `public.brands` | ✅ rica y ya corregida (rol de Ivette anclado al RÉGIMEN, RUC, 8 PHs, slogan, ICP) |
| Genomas | ✅ **`fphs_conversion` v1.0 ACTIVA desde el 17-jul** · `fphs_institucional` v0.5 desactivada el mismo día |
| `intel.brand_topics` | ❌ **CERO filas** — el bloqueo real de R4B |
| Material | 2 servicios · 1 copy_profile · 3 personas · 2 humanize · 0 blueprints (normal: es servicio) |
| Sesiones previas | 1 sola, `abandoned`, 2 turnos |

- **#73 YA ESTABA CERRADA.** La AGENDA la seguía listando como pendiente; `voice-conversion` §5 tenía razón.
- **La sesión abandonada (17-jul) es la caja negra del sprint CRAFT-01:** su turno 2 fue NO por
  redacción, con la nota *"el generador del bucle no carga arsenal de comunicación"*. Es el origen
  documental de `comm-arsenal` y del PR #13.

### PARCHE DE MARCA — `brand_services` decía que ForumPHs vende inmuebles
Mismo patrón que Vizos (#70): **datos falsos, no incompletos**. Con E7 vivo el generador los lee.
UPDATE sobre las 2 filas existentes (IDs reutilizados, cero FKs tocadas):
| id | antes (falso) | ahora |
|---|---|---|
| `7f16c41a` | bienes raíces Panamá | **administración de propiedad horizontal** |
| `63456313` | propiedades en venta | **inteligencia financiera y reporte BI para juntas directivas** |

### AUDITORÍA DE `fphs_conversion` v1.0 → **SANA, NO SE RECALIBRA**
Verificada contra la regla dura y `voice-conversion`: rol anclado al Régimen (Ley 284 degradada a
instancia), autoridad prohibida, promesas prohibidas, oposición prohibida, blanco = patrón.
**Rasgo que excede el perfil estándar y merece subir al skill:** su `argumentative_architecture`
resuelve el **decisor doble** — la JD impulsa pero la asamblea ratifica, así que la voz no solo
convence al miembro de JD: **le entrega argumentos que él pueda defender ante los propietarios**.

### ARQUITECTURA — la fórmula §1.1 se corrigió en vivo
El eje sembrado para la Editorial (audiencia = gremio) **fue derrumbado por Sam en el turno 1**:
*"el gremio son mis competidores, no tenemos interés en aportarles nada; el target siempre es el doliente"*.
→ **Educativa y Editorial COMPARTEN AUDIENCIA y se separan por VERBO.** Hallazgo de arquitectura nuevo.

| | `fphs_conversion` v1.0 | `fphs_educativa` v1.0 | `fphs_editorial` v1.0 |
|---|---|---|---|
| Verbo | VENDE | **ENSEÑA** | **REVELA** |
| Audiencia | JD-decisor | propietario-doliente | propietario-doliente |
| Blanco | el administrador reactivo | su desconocimiento | la práctica del oficio |
| Filo | — | 3/10 | 7/10 |
| Cierre | CTA | instrumento | golpe único |

La marca **no lleva Profesional** (se disuelve en Ivette-persona). Familia de marca **COMPLETA**.

### `fphs_educativa` v1.0 — 6 turnos (5 SÍ / 1 NO positivo), sesión `a082116f`
Artefactos recorridos: blog, meta_ig, meta_fb, email. Temas: financiero **y** documental.
- **T1 (blog, "Usted no compró un apartamento")** — SÍ total. Reencuadre de categoría: compró una
  fracción indivisa + una cuota de decisión. Confirmó que **la frontera no-vender NO deja la voz sin fuerza**.
- **T2→T3 (caption)** — SÍ con defecto de VOLTAJE. **Filo 3/10 = no atacar a nadie, NO voltaje bajo.**
  Educar sin impacto no enseña. Remate corregido: *cuota que nunca sube = deuda diferida que aparece el día que venda*.
- **T4 (caption 70 palabras)** — SÍ total y **FRONTERA RATIFICADA**: Sam pidió que el doliente exigiera
  revisar al administrador **actual**; se objetó que eso es Conversión con máscara educativa (mover al
  propietario contra un proveedor concreto para que entre ForumPHs). Sam ratificó: *"no lo empujes hacia
  ningún lado, enséñales a ver los números"*. **La voz instala el estándar y deja que el estándar trabaje.**
- **T5 (email, el acta de asamblea)** — SÍ. **Prueba de estrés superada: la voz existe fuera del dinero.**
- **T6 CONTROL NEGATIVO** — NO. Pieza competente rechazada por venta blanda + registro de gremio + juicio prestado.

### `fphs_editorial` v1.0 — 14 turnos (10 SÍ / 4 NO), sesión `e71bebdc`
Temas: traspaso de administración · la asamblea anual · recaudación y fondo de reserva.
- **T1 NO ESTRUCTURAL** — derrumbe del eje (audiencia). Ver arriba.
- **T2 NO por DATO** — se afirmó que no existe licencia para administradores. **Un dato que se
  malinterpreta en primera lectura es un dato roto aunque sea cierto.** Retirado hasta verificar.
- **Tres técnicas de marketer fijadas por Sam:** TRADUCIR A INTERÉS PROPIO (*"lo que hace falta"* →
  *"lo que tu inversión necesita"*) · ANALOGÍA QUE POSICIONA (*multimarca vs especialista* — hace el
  argumento y planta la categoría sin nombrar la marca; jamás una analogía que culpe al lector de su
  compra) · CORTAR PARA ASIGNAR (*"le asigna A USTED responsabilidades. Y son concretas."*).
- **T5 SÍ tibio → REGLA: UN SOLO GOLPE POR PIEZA.** Dos golpes buenos encadenados **se cancelan** si
  sus cargas son opuestas (uno cierra en pérdida, el otro abre en competencia). Sam: *los golpes se
  administran en el tiempo; si ignora el primero tal vez fue descuido, un segundo golpe en OTRA
  ocasión lo obliga a reflexionar, o simplemente no tiene ese problema*.
- **T6 NO — el cierre trabajaba para el competidor:** *"usted no necesita un administrador mejor,
  necesita que el próximo no tenga que adivinar"* absolvía al administrador actual, le pedía al
  propietario que lo mejorara, y **regalaba la tesis (trazabilidad)** sin dejarla pegada a nadie.
  Causa raíz: **"usted no necesita X" es una instrucción**. También se prohibió el modismo calcado
  *"se llama martes"* (it's called Tuesday): claro para quien lo capta, opaco para el resto.
  → **OBJETIVO EXPLÍCITO DE LA VOZ: que el propietario termine sabiendo QUÉ DEBERÍA PODER PEDIR Y NO PUEDE.**
- **T9 NO — RETROCESO:** al reducir a un golpe se suavizaron los dos. **Un golpe único no es un golpe
  más suave: es un golpe sin competencia.** Nombrar el objeto con precisión ES el golpe
  (*"revise las proyecciones financieras a cinco y diez años de su edificio"*); genericarlo lo desactiva.
- **T11 SÍ limpio — COMPOSICIÓN DEL DOBLE REMATE: imagen primero, instrumento después.** Al revés el
  lector ya tiene tarea y deja de escuchar; en este orden **se da la vuelta y corre al espejo con la
  herramienta en la mano**.
- **T13 (65 palabras)** — la voz sobrevive al formato corto. Dos hallazgos: **"y usted es socio"**
  (reencuadre de POSICIÓN: no es cliente de una administración, es copropietario de una empresa que
  factura) y **ADMINISTRADO vs ATENDIDO** — toda la tesis comprimida en dos palabras.
- **T14 CONTROL NEGATIVO** — NO. Sam: *"esta pieza es tan inflamable como Sam, pero **FPHs no es Sam**"*.
  **Riesgo específico de esta voz** (distinto al de la Educativa): con filo 7 y audiencia doliente la
  fuga no es hacia la venta blanda sino hacia **instigar al propietario contra su administrador** —
  gana al doliente y **pierde al decisor**, que es quien firma el contrato.

### BANDERAS DE LA MARCA (declaradas por Sam, embebidas en la Editorial)
**EL SISTEMA** y **EL ENFOQUE FINANCIERO** — las dos carencias mayores de la competencia. Cada pieza
demuestra la ausencia de una: sin sistema (nada se hereda entre gestiones, el método vive en la cabeza
de una persona, la reunión sustituye al método) o sin finanzas (no hay proyección, la reserva no se
calcula, la mora se cobra en vez de preverse). **Nunca se dice que ForumPHs las tiene: se instala el
estándar y el lector deduce quién lo cumple.**

### DATO REGULATORIO — VERIFICADO CON IVETTE (cierra el pendiente del T2)
En Panamá las **únicas** licencias del sector son las de **Corredor de Bienes Raíces**, otorgadas por
el **MICI previo examen**, y **NO se les exigen a los administradores de PH**. La Ley 284 sugiere muy
sutilmente perfil gerencial y conocimientos en RRHH y régimen laboral, pero **nadie lo revisa ni lo
acredita**; el proyecto de ley que iba a exigirlo murió en la cuna. **Uso permitido:** afirmar que
administrar un PH en Panamá no exige licencia, examen ni acreditación verificable. **Cuidado de
redacción:** distinguir SIEMPRE *administrador de PH* de *corredor de bienes raíces*. Grabado en
`application_constraints` de ambos genomas nuevos.

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- `public.brand_services` — UPDATE de 2 filas (parche de marca, IDs reutilizados).
- `intel.calibration_sessions` — 2 INSERT (`a082116f` educativa, `e71bebdc` editorial), ambas
  `converged` con `resulting_voice_id`. **Primeras sesiones que usan las 3 columnas del CRAFT-01**
  (`voice_type`, `target_artifact`, `psy_family`) con valor real; las 10 anteriores quedaron NULL.
- `intel.calibration_turns` — 20 turnos persistidos con veredicto y notas.
- `public.brand_voice_genome` — 2 INSERT: `fphs_educativa` v1.0 + `fphs_editorial` v1.0, ambas
  `active=true`, `maturity='calibrated'`. **`fphs_conversion` v1.0 NO se tocó.**
- **Cero repos tocados. Cero EFs. Cero PRs.**
- **Professor: 12 learnings** (`session_date` 2026-07-21, `approved_by_sam=true`), 10 con score 5.
  ⚠️ **Con los 19 de la sesión del pivote, hoy hay 31 learnings con fecha 2026-07-21** — un
  `UPDATE ... WHERE session_date='2026-07-21'` alcanza a los dos lotes.

### PENDIENTES QUE DEJA ESTA SESIÓN
1. **`intel.brand_topics` de ForumPHs = CERO filas.** Es lo único que separa a la marca de operar en
   R4B; sin topics, `approve` falla con "domain sin suscriptores". Ahora hay 3 voces esperándolos.
2. **Los 2 `humanize_profiles` de ForumPHs no se verificaron** contra estas voces nuevas.
3. **`maturity` usa dos convenciones** en `brand_voice_genome` (`calibrated` vs `v1.0`). No rompe
   nada hoy; conviene unificar antes de que haya seis voces.
4. **Ivette-persona:** marca propia (decisión de Sam). Requiere fila nueva en `public.brands` —
   no hay fila reutilizable, así que **no aplica el patrón alias**. Sesión propia: la frontera de
   responsabilidad (Ivette INTERPRETA el marco / ForumPHs OPERA el sistema) no es trámite.
5. **Sitio forumphs.com** — 4 violaciones de voz (AGENDA #74 original) siguen sin corregir.

---
*ForumPHs · calibración y destilación de voz · familia de marca completa (Conversión + Educativa + Editorial) · 2026-07-21 (b)*

## 2026-07-21 — PIVOTE FPHS-OPS → AGENTE WHATSAPP DE PROPIETARIOS · diseño completo + QA pre-diseño + diagnóstico Sage 50 + mapeo de ingesta validado 198/198

### CONTEXTO — por qué esta sesión
Sam llegó de una reunión larga: la app **FPHS-OPS** exigía una curva de aprendizaje que amenazaba
su adopción por parte de las administradoras y de la propia Ivette. Decisión: **pivotar a un agente
único de IA por WhatsApp** para los propietarios de todos los PHs. La sesión fue **diseño +
verificación**, sin construcción. Cero escrituras en DB salvo Professor.

### EL PIVOTE
- **De:** app mobile OPS (curva de aprendizaje = riesgo de adopción).
- **A:** UN agente conversacional por WhatsApp, disponible a todos los propietarios de cada PH.
  Identifica por número, resuelve tareas acotadas (estado de cuenta, estado de reportes, crear incidencias).
- **Principio:** cuando la barrera es la ADOPCIÓN y no la capacidad, mover el producto al canal
  donde el usuario YA ESTÁ vence a construir mejor interfaz. **WhatsApp > Telegram** en Panamá
  (pedir instalar app nueva reintroduce la fricción de la que se huye).
- El agente reemplaza la **cara al propietario** de OPS. La **cara al administrador** (dashboard de
  tickets) queda como **deuda heredada explícita**, no se pierde.

### LA DB YA ANTICIPABA MULTICANAL (hallazgo de inventario)
`incidents` ya trae `reported_via` (incluye `whatsapp`), `reported_by_type` (`propietario`/`residente`),
`visible_to_owner`, `owner_notified_at`, `due_at`, `sla_hours`. `incident_categories` 16 filas con SLA.
**`communications`** (building/unit/owner + channel + subject + body + status + sent_at) = **el outbox
de emails YA EXISTE**. Lección: inventariar el esquema ANTES de diseñar capas nuevas — se iba a
construir algo que ya estaba. El trabajo real es **identidad + canal + cerebro**, no estructura de negocio.

### MODELO DE IDENTIDAD — declaración firmada (idea de Sam, superior al diseño inicial)
En vez de INFERIR identidad desde datos sucios, el propietario **DECLARA Y FIRMA** qué números e
identidades pueden acceder en su nombre (cónyuge, hijos, representante, residente). Convierte dato
adivinado en **dato consentido con responsable legal**.
- Beneficios de segundo orden: **disclosure/responsabilidad** del propietario · **trace auditable**
  de quién accedió a nombre de quién · **informe mensual al titular real** = mecanismo PASIVO de
  detección de abuso (si alguien accede sin que el titular sepa, el informe lo delata).
- **Disuelve el problema del gestor/corredor:** deja de ser una inferencia sobre un número sucio y
  pasa a ser un rol declarado y firmado.

**DOS CORRECCIONES DE SAM a errores de diseño míos (ambas críticas):**
1. **Nunca ofrecer las opciones válidas.** Preguntar *"¿hablo con Carlos o con María?"* REGALA las
   respuestas. Forma correcta: **pregunta abierta** (*"¿quién habla?"*) con **match silencioso**
   contra las identidades declaradas. Diferencia entre examen de opción múltiple (adivinable) y de
   respuesta abierta (exige saber).
2. **El onboarding NO puede hacerlo el agente.** Si el agente conduce la primera declaración, el
   usuario **se auto-otorga acceso**: quien controla el teléfono se declara titular y firma su propia
   autorización. El sujeto que se autentica no puede ser la autoridad que concede. → El onboarding lo
   hace **la administración, PH por PH**, fuera del agente, y **sin canal alternativo** (la ausencia de
   puerta trasera garantiza que el 100% de accesos tenga firma detrás).

**Cascada de 3 factores** (fricción proporcional al riesgo; un titular simple no ve ninguna):
número → identidad (si el número tiene varias) → **propiedad (siempre obligatorio para dato financiero)**.

**Validación tolerante pero segura:** tolerar variación en cómo se EXPRESA la identidad, no ausencia de
lo que VERIFICA. Nombre fuzzy ("Alberto" matchea "Carlos Alberto") con resolución **única**; propiedad
con **discriminador mínimo** (*"¿tu 1A de qué torre es?"*). Nunca ofrecer opciones, nunca rechazar por forma.

### CICLO DE VIDA POR TAREA + CANALES
- **Persistencia por TAREA, no por sesión** (marco de Sam), simplificado finalmente a: **sesión
  uniforme de 24h para todo**, PERO **el dato financiero re-confirma propiedad en el momento, siempre**.
- **Lo sensible viaja por EMAIL** (no-reply + **CC a ops@forumphs.com** = constancia auditable), nunca
  por WhatsApp. **HALLAZGO QUE LO VALIDA:** la cobertura de email es MUY superior a la de teléfono.
- **"Entregado" = el CC llegó a ops@** — un mecanismo cumple dos funciones (constancia + confirmación).
- **Autenticación del dato por ORIGEN** (precisión de Sam): el estado de cuenta no lo prepara un
  administrador; son datos que **el sistema emite y firma desde la plataforma**. Si hay error → ops@.
- El email es **solo saliente** (unidireccional). El agente informa **ESTADO** del ticket, **no
  novedades** ("el plomero viene a las 3pm") porque esa narrativa nadie la captura todavía.

### DASHBOARD DE TICKETS — deuda heredada de FPHS-OPS
Alcance mínimo definido: ver tickets + timer SLA + cambiar estado + **escribir la "etapa"**.
Permisos: Ivette/supervisión = todos los PHs; administradora = solo su PH.
- **La "etapa" es el puente que faltaba:** al darle al administrador un campo donde escribe el avance,
  esa narrativa **pasa a existir en la DB** y el agente puede devolvérsela al usuario.
- **Decisión:** usar **`incident_updates`** (tabla existente) en vez de campo nuevo → **historial gratis**.
- ⚠️ **FALTA `visible_to_owner`** en `incident_updates`. NO existe. `notified_owner` es "¿ya se le
  avisó?", no "¿puede verlo?". Sin ese flag, notas internas del admin serían legibles por el propietario.
- ⚠️ **`incidents.status` NO es enum**: es CHECK con **SEIS** valores
  (`abierto/en_proceso/pendiente_proveedor/resuelto/cerrado/cancelado`) — mejores que los 3 diseñados
  (`pendiente_proveedor` ES el caso del plomero). **Adoptar los seis.**

### 🔴 QA PRE-DISEÑO — la Fase 1 era imposible (instrucción de Sam que salvó el sprint)
Sam pidió *"un QA antes de diseñar, que CC no te sorprenda con hallazgos que tú debiste ver"*. Resultado:
- **`arrears` = 0 · `mora_mensual` = 0 · `payments` = 0 filas.** Se había diseñado toda la Fase 1
  (estado de cuenta con re-validación y entrega por email) **sobre tablas vacías**.
- Se verificó que no hubiera fuente alterna: se leyó el código de **`fphs-bi-data`** → lee `mora_mensual`
  del **MISMO** proyecto FPHS. No hay financieros escondidos en UNRLVL.
- **REGLA DURA:** verificar **EXISTENCIA DE DATOS** (count), no solo existencia de esquema, antes de
  diseñar una capacidad sobre una tabla.
- Otros hallazgos del QA: `owners` usa `primary_email`/`secondary_email` (no `email`); `incident_updates`
  sin `visible_to_owner`; `incidents.status` con 6 valores.

**Cobertura de contacto (PHs piloto) — el email gana:**
| PH | Owners | Con email | Con teléfono | Sin contacto |
|---|---|---|---|---|
| Venezia Tower | 182 | **180 (99%)** | 178 (98%) | 2 |
| PH Torres de Castilla | 306 | **305 (99.7%)** | 148 (48%) | 1 |

### SAGE 50 (ex-Peachtree) — diagnóstico
7 máquinas locales, **propiedad de cada PH**, ubicaciones separadas, internet distinto, uso exclusivo del
equipo FPHs. Versiones: **2022** (mayoría), **2023** (Los Álamos), **2026** (Torres de Castilla), todas
Premium US Edition.
- **HALLAZGO:** **CINCO PHs comparten serial** `34892-DC83-A5F1-DEDF` y Customer ID `4007208843`
  (contradice "cada PH su licencia"); la mayoría con **Plan Level: Expired**. Para que Ivette lo sepa.
- **Sage 50 es DESKTOP: no hay API a la que conectarse.** ODBC exige estar en la misma máquina/red.
- **DECISIÓN: agente de sincronización local DESCARTADO.** Sería una flota de puntos de falla
  distribuidos geográficamente, en máquinas de terceros, para un dato que cambia **una vez al mes**
  (`mora_mensual` ya trabaja por período). Además: instalar software propio en la máquina contable de
  un cliente es responsabilidad reputacional que no compensa.
- **Camino elegido:** exportación periódica desde Sage → **parser de ingesta** → DB limpia.

### MAPEO SAGE → SUPABASE — VALIDADO 198/198 (el riesgo que podía matar el proyecto)
La pregunta crítica era *¿Sage identifica al cliente por nombre o por unidad?*. **Por unidad.**
| PH | Códigos en Sage | Casan con DB | Regla |
|---|---|---|---|
| **Venezia Tower** | 61 | **61 (100%)** | quitar prefijo `^\d-` + quitar guiones → `07A` |
| **Lefevre 75** | 137 | **137 (100%)** | quitar prefijo `^I-` + match literal → `01-E-A` |

**Resuelto por dato + confirmado con Ivette:**
- **`I-` en Lefevre = inmobiliaria** — unidades aún en venta por la promotora. `I-09-E-C` y `09-E-C` son
  **el mismo apartamento**; el prefijo es **estado transitorio**, no atributo. El parser lo quita.
- **`2-17-E` en Venezia = "apartamento con 2 propietarios"** (convención contable de ellos). Verificado:
  **`17-E` NO existe** como Customer ID → **no hay duplicación**, hay un solo bloque
  (GREYFIELD HOLDING, −129.15). Se carga como `17E`.
- **Lefevre TIENE DOS TORRES: Este y Oeste** (corrección de Ivette a una conclusión errónea mía — yo
  inferí "orientación, no torre" porque `units.tower` está NULL). → **`units.tower` de Lefevre es un
  hueco de datos**, derivable del propio `unit_code`. Y el factor de desambiguación de propiedad
  **aplica también a Lefevre**. Lección: **un campo NULL no es evidencia de que el concepto no exista.**

### ANATOMÍA DEL EXPORT — los formatos NO son iguales entre PHs
- **Idioma/hoja:** Venezia y Lefevre EN-ish (`Aged Receivables`); Torres de Castilla ES
  (`Antigüedad de CXC`) y con **menos columnas**.
- **Estructura de filas:** Venezia/Lefevre **DETALLADOS** (una fila por factura + subtotal por unidad +
  separadoras); Torres de Castilla **RESUMIDO** (una fila por unidad).
- **REGLA DE FILA que gobierna el parser:** es **MOVIMIENTO** si tiene `Invoice/CM #`; es **SUBTOTAL**
  si tiene `Customer ID` sin `Invoice #`. Vacías y `Report Total` se descartan.
- **Tipos de movimiento por prefijo de factura** (`M-`/`MUL-`=multa, `REC-`=pago, `EXT-`=extraordinario)
  — **el diccionario varía por PH**.
- **Saldos negativos = saldo a favor** (preservar, no son errores).
- ⚠️ **NO HAY COLUMNA DE FECHA.** Un "historial de movimientos" sin cronología es cojo. Algunos IDs la
  traen embebida (`REC-09-D-11062026`) pero no de forma consistente. **ACCIÓN: que el formato estándar
  la incluya desde el día uno.**

### DECISIONES DE SAM SOBRE LA INGESTA
1. **Estandarizar el export** para obtener **DETALLE** → estado de cuenta con **historial de
   movimientos**, no un saldo. Confirmado con Ivette.
2. **Frontera limpia:** el **parser es el método de ingesta**; el agente **lee limpio desde DB**, nunca
   toca un `.xlsx`. Toda la suciedad muere en la ingesta.
3. **Ingesta estándar con interpretación bilingüe** (ES/EN → esquema canónico), con **config por PH**
   (mismo patrón que `df_platform_parsing_config` del DF: client-specific knowledge = DATA, no code).

### CENTRALIZACIÓN CONTABLE — proyecto aparte, mediano plazo
Recomendado a Ivette. Decisión de Sam: **NO migrar los actuales**; incorporar los **NUEVOS** a un
sistema **cloud centralizado**, y migrar los viejos poco a poco sin presión.
- **Argumento más fuerte (no es el ahorro):** con **+20 PHs en 18 meses**, cada PH nuevo agrega una isla
  más y la complejidad crece **linealmente con cada cliente**. La capacidad instalada no puede depender
  de trabajo manual disperso en 20 localidades.
- **Requisito innegociable de Sam:** **salida limpia garantizada** (un PH que se va se lleva sus libros
  sin fricción) — evita lock-in y riesgo legal.
- **NO mezclar** con el sprint del agente.

### DEUDA DE DATOS RESUELTA SIN REGISTRO (hallazgo colateral)
El session_log de **2026-06-01** marcaba `Venezia unit_code` como **CRÍTICA** ("fórmulas Excel
`=SUM(A10)+1`, 364 filas = duplicado ×2 del real 182, requiere REIMPORTACIÓN"). **Verificado hoy: está
sana** — 182 unidades, `unit_code` limpio (`07A`…), `tower` poblado correctamente (A–D→Torre A,
E–H→Torre B). La reimportación se hizo en algún momento y **no quedó registrada**.
**Lección: verificar el estado ACTUAL de las deudas de datos antes de arrastrarlas como vigentes.**

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- **Cero escrituras** en FPHS (`tajuoqdbnsnzkhyqvdgs`) y en UNRLVL, salvo Professor. Todo fue lectura.
- **Cero repos tocados.** No hay PRs de esta sesión.
- **Incidente operativo:** la DB FPHS **auto-pausó** a mitad de sesión (free tier, ~7 días de
  inactividad) — 4 timeouts consecutivos incluido un `SELECT 1`. Sam la despertó desde el dashboard.
- **Professor: 19 learnings** (`session_date` 2026-07-21, `brand_id` ForumPHs, `approved_by_sam=true`),
  **15 con `relevance_score` 5**.

### ENTREGABLES DE LA SESIÓN
1. `ForumPHs_ARCHITECTURE_BRIEF_owner_agent_pilot.md` — brief v0.1 (**parcialmente desactualizado**: la
   sección de identidad la reemplaza el modelo de declaración firmada).
2. `ForumPHs_AGENDA_owner_agent.md` — **agenda de implementación mapeada** (Fases 0-3, decisiones
   ancladas, riesgos).
3. Instructivo de export Sage 50 para administradoras.

### PENDIENTE — próximos chats
1. **Cerrar con Ivette:** columna de **fecha** en el export estándar · alcance del rol **gestor** ·
   carga operativa del onboarding de declaraciones.
2. **Recolectar exports** de los 5 PHs restantes y validar formatos.
3. **Spec de construcción de Fase 0** para CC (normalización + tabla de identidad + parser), bajo HRD
   y flujo de PR.
4. **Poblar `units.tower` de Lefevre** (Este/Oeste) — escritura, va con su propio HRD.
5. **Agregar `visible_to_owner`** a `incident_updates` — prerrequisito de Fase 2.

---
*ForumPHs · Pivote OPS→agente WhatsApp + QA pre-diseño + diagnóstico Sage 50 + mapeo 198/198 · 2026-07-21*

## 2026-07-04 — DF: R5 mergeado pero INERTE + SPRINT PARSER MULTI-PLATAFORMA (Lefevre 75/TOC) + Sonnet 5

### CONTEXTO — por qué esta sesión
Arrancó como R5/Bloque 2 (marcas ICR inline). Al verificar el `.docx` generado se descubrió que **R5 quedó INERTE**, y al probar el primer paquete **no-Venezia** (Lefevre 75, plataforma TOC/HIF) se destapó que **todo el parser estaba calibrado a Hypal/Venezia**. La sesión terminó siendo el sprint de generalización multi-plataforma del DF. Verificación con lectura de código real y diagnósticos read-only de CC; varias hipótesis propias descartadas con evidencia.

### R5 (Bloque 2) — MERGEADO (PR #14) pero INERTE
- El brief R5 se construyó y CC lo entregó: quitar el ANEXO ICR embebido, `icrSectionBanner` como puntero visual al reporte externo (sin numeración `N` — decisión de Sam de eliminar el `N`; se volvió `⟦ICR⟧`/`⟦ICR · N hallazgos⟧` con shading de peor gravedad vía `getWorstSev`), warning temprano de dedup en `page.tsx`. PR #14 mergeado.
- **PERO al abrir un `.docx` real: cero marcas ICR, cero shading, cero anexo.** Causa raíz (lectura de código):
  - `page.tsx` `handleFormalized` → `runGenerate(blocks, [])` — **icr_findings hardcodeado a `[]`**. El auditor `/api/icr` corre DESPUÉS, en otro paso, sobre el acta ya generada. A `/api/generate` siempre le llega `icr_findings: []`.
  - Los findings internos que sí genera `/api/generate` (roles, género, dedup) tienen `location: "Cuerpo del acta"`, no `"sección N"` → `findingsForSection` (que exige match textual de nº de sección) devuelve `[]` → banner `null`.
  - El anexo ICR viejo tampoco se renderizaba nunca por la misma causa.
- **Conclusión:** R5 está bien escrito pero pinta sobre un array vacío / sin match de sección. **→ Deuda #57 (cablear ICR→generate), sprint aparte.** Sam acepta `[ICR]` en el .docx como pendiente (#59).

### SPRINT PARSER MULTI-PLATAFORMA — 3 PRs mergeados
Primer paquete no-Venezia (Lefevre 75 / TOC/HIF). El preflight salió **PH "AYALA" / tipo "Ordinaria" / fecha "18 enero" / 0 bloques / 0 asistentes** — todo mal, aunque el texto fuente lo tenía correcto. El parser asumía formato Hypal/Zoom en cada etapa.

**Bug memorable:** `extractPHName` con regex `\bP\.?H\.?\s+...` matcheó el **"ph"** dentro de **"Jose*ph* Ayala"** (un propietario) → "PH Ayala". El `\b` trata la frontera letra→"ph" como válida.

- **PR-A #15 — skeleton multi-formato** (`parseResumen.ts` + `parse/route.ts`):
  - `extractPHName`: reconoce "PROPIEDAD HORIZONTAL X"/"P.H."/"PH" con ancla real de palabra (no `\b`, para no matchear dentro de "Joseph"); prioriza encabezado; corta en R.U.C.
  - `extractAssemblyType`: contempla "ASAMBLEA GENERAL EXTRAORDINARIA" (GENERAL en medio); **elimina el default silencioso ORDINARIA** → marca `INDETERMINADA`/`assembly_type_uncertain`.
  - `extractDate`: ancla a "celebrada el / siendo el día / encabezado", no la primera fecha suelta; soporta "veintiocho (28)".
  - **Cross-check filename↔contenido** (idea de Sam): los nombres de archivo como pista de contraste → bandera de sospecha no-bloqueante cuando no concuerdan. Nunca corrige, avisa.
- **PR-B #16 — transcripción TOC + asistencia** (`detectPlatform.ts` nuevo, `parseTranscripcion.ts`, `parseAsistencia.ts`, `zipExtractor.ts`, `parse/route.ts`):
  - **Auto-detección de plataforma** (sin selector manual, decisión de Sam) leyendo la tabla **`df_platform_parsing_config`** (UNRLVL) por señales del texto.
  - Segmentación **TOC `prose_paragraph`** (prosa continua, turnos por cues, hablante por auto-presentación, sin inventar identidades).
  - Fix xlsx: saltar filas de título + reconocer header "Propiedad".
- **PR-C #17 — fix runtime + colaterales + Sonnet 5** (`zipExtractor.ts`, `parseTranscripcion.ts`, `detectPlatform.ts`, `PreflightForm.tsx`, `icr/route.ts`, `imageCuration.ts`, `fphs-formalize/index.ts`, `.env.example`):
  - **Fix `detectHeaderRow`:** índice calculado en array colapsado (`blankrows:false`) usado como `range` ABSOLUTO → con fila en blanco sobre el header, `range` cae en la vacía → claves `__EMPTY` → 0 asistentes. Fix: calcular en coordenadas absolutas. (Lefevre: `range:2 → __EMPTY` / `range:3 → Propiedad`.)
  - Banner visible de plataforma/degradación (antes se emitía como campo, invisible); logging en el `catch` de `detectPlatform` (antes silencioso); copy sin "Hypal" hardcodeado (lee `platform_id`).
  - **Migración `claude-sonnet-4-6` → `claude-sonnet-5`** con `thinking: {type:'disabled'}`. GOTCHA: SDK `@anthropic-ai/sdk@0.24.3` predata el param `thinking` → passthrough runtime (SDK serializa campos extra al body; tsc no los tipa) + fetch crudo en la EF.

### CAUSA RAÍZ del "degrada a Hypal" — GRANT faltante (mi error de omisión)
Tras PR-C, el Preview seguía degradando a Hypal pese a env var puesta, tabla con datos y RLS off. Diagnóstico read-only de CC (nueva sesión) encontró el smoking gun en logs de runtime: `[detectPlatform] config unreadable, degrading to hypal: HTTP 403`. **Causa:** la tabla `df_platform_parsing_config` **no tenía `GRANT SELECT` para `service_role`** — solo `postgres` tenía privilegios. PostgREST verifica GRANTs a nivel tabla ANTES que policies; `BYPASSRLS` del `service_role` omite policies, no GRANTs. Resultado: `42501 permission denied` → 403 → fallback. **El error fue mío:** al crear la tabla con `apply_migration` escribí el `CREATE TABLE` pero omití el `GRANT`.
- **Fix aplicado (por Claude, tabla en UNRLVL):** `GRANT SELECT ON public.df_platform_parsing_config TO service_role;` + `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO service_role;` (para futuras tablas). Verificado.

### RESULTADO — DF MULTI-PLATAFORMA VIVO
Con el GRANT, el Preview de Lefevre mostró: **"Plataforma detectada: TOC / HIF"**, **117 asistentes**, PH LEFEVRE 75 / EXTRAORDINARIA / 28 junio, banner honesto de baja densidad de locutor (7 bloques/~12847 palabras → pedir a TOC export con etiquetas de hablante), corrió en **Sonnet 5**, y el **ICR marcó 14 hallazgos (4 CRÍTICOS: porcentajes sobre bases distintas, quórum contradictorio 117 vs 23, fechas discordantes 28 vs 24 junio, roles no verificados) → BLOQUEADO correctamente**. El ICR (segunda capa, Agente Experto) funcionó de forma excelente.

### DEFECTO CONFIRMADO — QA↔ICR desconectados (deuda #58)
El **QA dio PASS / 100% / "Acta lista para revisión de Ivette"** sobre la MISMA acta que el ICR declaró **BLOQUEADA con 4 críticos**. El QA valida ESTRUCTURA (apertura, quórum, firmas, votaciones listadas → 15/15) pero NO contenido; un acta de ~7 páginas con target 27-33 igual pasa. **Decisión de Sam:** vivir con esto MIENTRAS el ICR atrape (el ICR es el que importa); deuda conocida-y-aceptada, NO urgente. Fix futuro: QA debe FAIL cuando ICR bloquea.

### tabla nueva df_platform_parsing_config (UNRLVL amlvyycfepwhiindxgzw)
Columnas: id, display_name, active, detect_signals (jsonb regex), detect_priority, segmentation (speaker_colon|prose_paragraph), speaker_line_regex, timestamp_regex, turn_cues (jsonb), asistencia_header_offset, extra (jsonb). 2 filas seed: **hypal** (speaker_colon, priority 10, offset 0) y **toc** (prose_paragraph, priority 5, offset 3, 7 turn-cues). GRANT SELECT → service_role. Config por plataforma = DATA no code; plataforma nueva = 1 fila.

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- **DB (UNRLVL `amlvyycfepwhiindxgzw`):** CREATE TABLE `df_platform_parsing_config` + 2 filas seed + GRANT SELECT service_role + ALTER DEFAULT PRIVILEGES.
- **Env var (Vercel):** Sam agregó `UNRLVL_SUPABASE_URL` = `https://amlvyycfepwhiindxgzw.supabase.co` (Prod+Preview).
- **Modelo:** DF migrado a `claude-sonnet-5` (thinking:disabled). Deuda: SDK 0.24.3 viejo (#61).
- **Pendiente de Sam:** re-deploy EF `fphs-formalize` con `verify_jwt:false` si el cambio de modelo la tocó (regla conocida).
- **PRs #14 (R5), #15 (PR-A), #16 (PR-B), #17 (PR-C)** mergeados por Sam vía GitHub Desktop.
- **Professor: 10 learnings** (session_date 2026-07-04, brand_id ForumPHs, approved_by_sam=true): GRANT faltante (5), parser Venezia-céntrico (5), detectHeaderRow coords (4), migración Sonnet 5 (4), QA↔ICR (4), R5 inerte (4), segmentación TOC (3), cross-check filename (3), vía logs alterna (3), artefacto de plataforma Anthropic (3).

### PENDIENTE — próximos chats
1. **#57 cablear ICR→generate** (R5 inerte): correr /api/icr antes de /api/generate o regenerar con findings; matchear findings a sección. Sin esto no hay marcas ICR en el .docx.
2. **#58 QA↔ICR** (deuda aceptada, no urgente).
3. **#60** transcripción TOC de baja densidad: Ivette pide a HIF/TOC export con etiquetas de hablante.
4. Deudas menores: #61 SDK viejo, #62 placeholders Venezia UI, #63 normalización "E 01A", #64 LOGISTICA_NAMES a config.

---
*ForumPHs · DF R5 inerte + parser multi-plataforma (PR-A/B/C) + GRANT fix + Sonnet 5 · 2026-07-04*

## 2026-07-03 — DF Análisis de REGRESIÓN Venezia (acta corregida por Ivette) + Bloque 1 + R4 (PR #13 merged) + EF fphs-formalize v39 (R3)

### CONTEXTO — por qué esta sesión
Sam cargó la última acta del DF (Venezia OR 1-2026) **ya corregida por Ivette** para mapear
regresiones: cosas que sprints previos ya habían superado y volvieron a romperse. Diagnóstico
hecho con **lectura de código real** (no solo del output), y corregido dos veces contra la
hipótesis inicial de Sam. Resultado: 5 regresiones identificadas, causa-raíz en código, y
resueltas o dejadas en su estado correcto por diseño.

### LAS 5 REGRESIONES — diagnóstico con causa-raíz en código
- **R1 — duplicación aparente** → **FALSO POSITIVO de R2.** La misma deliberación (sistema húmedo
  $2,269/$2,978, Hilda Lorena + Greyz + ADM) aparecía en 2 lugares a ~2000 líneas. NO era doble
  input: era el reorden (R2) haciendo que **dos momentos temporales legítimos** parecieran
  duplicados por estar en secciones equivocadas. **PRUEBA:** Ivette también los conserva en 2
  lugares (líneas 941 y 1123 de su acta). El dedup acertó al NO marcarlos.
- **R2 — reorden temporal** → causa: `sectionAssigner` reasignaba bloques por keyword-match débil
  (`>0.4`) y `generate` los renderizaba **agrupados por `agenda_section`, nunca por timestamp**.
  Un bloque de presupuesto caía bajo el header "Elección" por coincidencia léxica.
- **R3 — fragmentos vacíos** → causa: `fphs-formalize` SYS1/SYS2 con `forceInclude` prohíben NULL
  → formalizan ruido oral ("tomó nota", "respondió negativamente") como intervenciones.
- **R4 — numeración de secciones eliminada** → causa: `sectionTitle()` en `generate` **quitaba el
  prefijo numérico a propósito** (comentario "removed number prefix (Ivette canonical format)") —
  malinterpretación: el acta real de Ivette **sí numera** (1.–8.). Regresión contra PASO 3/4.2.
- **R5 — ANEXO ICR embebido degradado** → sigue en `generate` (banners inline + anexo). NO se tocó
  esta sesión (es Bloque 2). El anexo embebido usa `icrFindings` local (pobre, 2 hallazgos) vs el
  reporte externo de `/api/icr` (rico, 16-19). Dos motores ICR distintos.

**HALLAZGO de lectura de código que corrigió la hipótesis de Sam:** la UI de barridos **NO
acumulaba** — React remonta `ProcessingPipeline` con `key=formalize-${retry}`, siempre parte de
`parsed.debates`, y `runGenerate` reemplaza (no concatena). Por eso la duplicación **no venía de
correr 2 barridos en la UI**, sino de **input doblado a nivel ZIP/transcripción sin capa de dedup**
(`consolidate()` solo une turnos consecutivos del mismo hablante).

### CONSTRUIDO — PR #13 (merged por Sam) — Bloque 1 + R4
Un solo PR, 7 archivos. Build+typecheck verde local, Vercel Preview verde. CC declaró 2 archivos
extra fuera de la lista (justificados: `QAReport.tsx` por el barrido único, tilde QUÓRUM en
`actaBuilder.ts` por el `acta_text` que audita el ICR).
1. **`lib/types.ts`** — `DebateBlock` += `possible_duplicate?` + `duplicate_of?` (opcionales).
2. **`parseTranscripcion.ts`** — dedup **como MARCA** (no borra): firma hablante+contenido
   normalizado no-consecutivo, Jaccard ≥0.85 → `possible_duplicate=true` + `duplicate_of`.
3. **`sectionAssigner.ts`** — umbral keyword `0.4→0.7` (deja de teletransportar) + exporta
   `sortByTimestamp` (fallback estable a índice si falta timestamp).
4. **`generate/route.ts`** — ordena secciones por `sortByTimestamp` · empuja ICR MEDIO de
   duplicados marcados · **R4:** restaura `1./2./3.` en `sectionTitle` + QUÓRUM con tilde.
5. **`actaBuilder.ts`** — mismo `sortByTimestamp` en `buildDebateSections` (docx↔acta_text↔ICR
   en orden idéntico).
6. **`app/page.tsx` + `ProcessingPipeline.tsx`** — barrido **único** con selector de nivel:
   **"0 (mínimo)" / "1 (intermedio)" / "2 (literal)"** → `retryAttempt` fijo (SYS0/1/2). Se
   eliminó la lógica de sweeps acumulativos.
7. **`supabase/functions/fphs-formalize/index.ts`** — R3: `TRIVIAL_MIN_WORDS=5`, skip de
   fragmentos con <5 palabras sustantivas ANTES del modelo, aplica en todos los niveles.

**DECISIÓN de arquitectura (Sam) — Opción A cronológica:** se mantiene la agrupación por punto del
orden del día (PASO 3), pero DENTRO de cada sección se ordena por timestamp global. NO cronológico
absoluto (rompería PASO 3 y no reproduciría a Ivette).

**PRINCIPIO (Sam) — "dedup se marca, NO se corrige":** extensión del principio ICR. El dedup vive
en el parser (punto más temprano, sobre `text_raw` crudo). Detecta y MARCA, nunca borra. Beneficio
forense: si con barrido ÚNICO el ICR aún marca duplicados → la fuente es Hypal (upstream); si no →
era el doble barrido manual. El reporte ICR se vuelve instrumento de diagnóstico de origen.

### DEPLOY EF — fphs-formalize v38 → v39 (yo, vía Supabase MCP, con confirmación de Sam)
- Proyecto **UNRLVL `amlvyycfepwhiindxgzw`** (el EF vive aquí, NO en FPHS `tajuoqdbnsnzkhyqvdgs`).
- **`verify_jwt: false` explícito** — el front llama sin `Authorization`; el default `true` habría
  roto la formalización con 401. **GOTCHA registrado.**
- Capturé v38 con `get_edge_function` antes de desplegar (confirmé que la v38 era pre-R3). Post-deploy
  verificado: **v39 ACTIVE**, contiene `TRIVIAL_MIN_WORDS` + skip trivial, `verify_jwt=false` preservado.
- **Merge del PR ≠ deploy del EF** — el EF está versionado en el repo pero el deploy a Supabase es
  paso aparte. Se hizo explícito tras el merge.

### VERIFICACIÓN — comparación peras con peras (3 corridas, todas nivel 2 literal)
| Métrica | DF1 (original) | DF2 (post-merge, EF v38) | **DF3 (EF v39)** | Ivette |
|---|---|---|---|---|
| Líneas | 4105 | 4263 | **3370** ↓ | 2573 |
| Fragmentos triviales | ~25 | 25 | **1** ✅ | 0 |
| ROL NO VERIFICADO | 98 | 98 | **46** ↓ | 0 |
| ICR ALTO | 6 | — | **4** ↓ | — |

- **R2** ✅ bajo header "Elección" ahora hay contenido de elección (no de presupuesto).
- **R4** ✅ secciones 1./3./4./5./6./7./8. + QUÓRUM con tilde.
- **R1** ✅ falso positivo confirmado; los 2 momentos del $2,269 coinciden con Ivette.
- **R3** ✅ EF v39: acta −21% (4263→3370), triviales 25→1, SIN perder contenido sustantivo.
- Los ICR ALTO restantes (ACTA No sin número, Daniel Puentes/admin sin rol, género Greyz) son
  **criterio legal de Ivette, NO regresiones** = techo de lo automatizable.

### PENDIENTE — próximo chat
1. **R5 (Bloque 2)** — marcas ICR **visuales inline** dentro del `.docx`: resaltado en color de
   gravedad + referencia `ICR N` (decisión de Sam: texto resaltado, Ivette borra ~7 chars; NO
   comentarios anclados) + **mantener** el reporte ICR externo + **QUITAR el ANEXO ICR embebido**
   (degradado) y sus rastros. Autocontenido.
2. **Warning temprano de dedup (idea de Sam)** — exponer `possible_duplicate` como aviso
   NO-bloqueante en la fase de parsing de la UI, además del hallazgo ICR. Convierte el parseo en
   punto de diagnóstico de ORIGEN (Hypal vs doble barrido). El dedup ya lo calcula; falta el surface.
3. **Deuda R4:** colisión de número de sección si una convocatoria NO empieza por quórum (el punto 1
   de agenda y la sección hardcodeada de quórum podrían chocar en el nº 1). Señalado, no arreglado
   para no regresar el caso estándar Venezia.
4. **"APROBACIÓN DEL ORDEN DEL DÍA" sin header propio** — el parser no la extrae como agenda_item;
   el ICR la marca ALTO/Estructura (numeración salta 1→3). Fix requiere trabajo en parseResumen.
5. Calibrar `TRIVIAL_MIN_WORDS=5` si llegara a cortar intervenciones cortas válidas.
6. Verificar R3 en nivel 0 (encoge aún más, más cerca de Ivette).

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- **EF fphs-formalize: v38 → v39** (fix R3), `verify_jwt=false`, proyecto `amlvyycfepwhiindxgzw`.
- Sin cambios de esquema/tablas. Sin migraciones.
- **Professor: 9 learnings** (session_date 2026-07-03, brand_id ForumPHs, `approved_by_sam=true`):
  5 con relevance_score 5 (R1 falso positivo / principio dedup-marca / gotcha verify_jwt / orden
  cronológico Opción A / cierre sprint) + 4 con score 4 (R3 EF-side / barrido único / deuda R4 /
  idea warning temprano).

---
*ForumPHs · DF análisis de regresión + Bloque 1 + R4 (PR #13) + EF v39 · 2026-07-03*

## 2026-06-19 — DF Quality Sprint: CIERRE DE GENERACIÓN (5 gaps merged) + corridas finales Venezia + feature reporte ICR .docx (PR #12) + mapa de pendientes

### EN PRODUCCIÓN (mergeado a main, verificado)
- **5 GENERATION GAPS CERRADOS** — PRs #6–#11 mergeados a main. Venezia OR 1-2026 pasó de
  🛑 BLOQUEADO → ❌ REQUIERE CORRECCIÓN con **0 CRÍTICOS**. Nivel comparable a Castilla (98%).
  - **#6** fphs-formalize v23 (ruido oral/género/warnings ICR) → desplegado como EF **v28**
    (verify_jwt:false, model claude-sonnet-4-6, key Deno.env `forumphs_document_factory`).
  - **#7** votaciones (classifyVote + try-catch DB + scan dinámico + placeholder multi-candidato).
  - **#8** ingesta asistencia (`lib/parsers/parseAsistencia.ts`): raíz quórum-0 = header mismatch
    (parser buscaba `Unidad`/`Asistencia`, Hypal trae `Unidades`/`Asistente`). Fix = matching
    TOLERANTE (normHeader + pickField por stem) + tower-from-suffix. 161 registros → quórum 88.46%.
  - **#9** render (route.ts + actaBuilder.ts): Gap1 quórum duplicado (`isQuorumSectionTitle()` omite
    heading de agenda) + Gap4 `{.mark}` residual (`stripInlineMarkup()` preserva `[FINCA PENDIENTE]`).
  - **#10** generador: Gap2 reproceso (`lib/processors/reprocessPending.ts`, reintenta solo bloques
    pendientes, nunca claude_null/logistica/empty/agent_error) + Gap3 género-por-persona
    (`genderConsolidation.ts`, mayoría por speaker_name, admin excluido, nunca por diccionario).
  - **#11** Gap5 roles (`classifyRoles.ts`, determinista): unidad en padrón→propietario; sin unidad +
    match exacto en acta_admin_personnel→admin; ninguno→`[ROL NO VERIFICADO]` + ICRFinding.
    AJUSTE de Sam: ELIMINADO match por nombre parcial ("Lorena"→Hilda era adivinar disfrazado).
  - Conflictos en route.ts resueltos por CC vía rebase #6→#11. Sam autorizó merge directo "solo por esta vez".

### CORRIDAS FINALES VENEZIA (2 ejecuciones, post-5-gaps) — la mejor acta que el DF ha producido
- **Gap 5 funcionó en AMBAS corridas:** `[ROL NO VERIFICADO]` correcto en Patricia Navajas Navarro,
  Sadia De Gonzalez, Tate, Yara, Rocío, Alejandra, [Nombre], Administración. Crucial: **"Lorena"
  (barbacoa/gastos legales) NO se resolvió a Hilda Lorena** — principio respetado. Propietarios con
  unidad (Greyz 13H, Celia Local A, Adnan Mauricio 9H) bien clasificados. Ivette/Daniel → admin.
- **ICR completo (runtime, separado) = el bueno:** corrida 1 → 19 hallazgos (0/4/10/5);
  corrida 2 → 17 hallazgos (0/6/8/3). **0 críticos en ambas.**
- **$300M:** corrida 1 lo dejó ~354,000; corrida 2 transcribió el error oral literal 300,554,673
  con aclaración parentética. ICR lo marca ALTO/a-verificar, NO auto-corrige (correcto).
- **Riesgo legal detectado por ICR corrida 2:** "Mercedes 62 puntos" para Tesorero cuando XLSX
  registra 0/0 NO APROBADO → marcado riesgo potencial CRITICAL para Ivette. Elección Tesorero sigue
  `[ELECCIÓN MULTI-CANDIDATO — PENDIENTE DE PROCESAR]` (honesto, no inventa).
- **Conclusión:** Venezia llegó al TECHO de lo automatizable. Lo que queda es criterio legal de Ivette,
  no errores del sistema.

### FEATURE: reporte ICR como .docx (PR #12 — ⏸ PARADO EN PR, esperando merge de Sam)
- CC construyó `lib/generators/icrReportDocx.ts` (serializador con shading w:shd por severidad:
  CRÍTICO #C00000 / ALTO #E36C09 / MEDIO #BF9000 / BAJO #808080; nota a Ivette; tabla resumen;
  hallazgos Crítico→Bajo con Hallazgo:/Recomendación:; $354,000 como "valor a verificar", nunca afirmado)
  + `app/api/icr-docx/route.ts` + botón "Descargar reporte ICR (.docx)" en page.tsx. Build 19/19.
- **PATH B confirmado** para entregar a Ivette: mergear #12 → correr Venezia → clic en botón →
  baja REPORTE_ICR_ACTA_OR_1-2026_PH_VENEZIA_TOWER_E.docx con los findings reales (no fabricados).
- **Bloqueo de PATH A (pegar JSON):** el ICR NO se persiste — re-confirmado por SQL esta sesión que
  NO existe tabla icr/findings ni en UNRLVL (amlvyycfepwhiindxgzw) ni en FPHS (tajuoqdbnsnzkhyqvdgs).
  ICR es runtime puro (vive solo en pantalla). Claude no puede generar el .docx desde su contexto y
  no fabrica findings (violaría el principio del ICR).

### DEFECTO PERSISTENTE — ANEXO ICR pobre embebido en el .docx (FIX PENDIENTE, PR limpio aparte)
- Confirmado en LAS 2 corridas: cada acta (pre-#12) incrusta en su cuerpo un "ANEXO ICR — REVISIÓN
  DE CONSISTENCIA LEGAL" DEGRADADO (corrida 1: 4 hallazgos con "ADM"/guion colgante; corrida 2: solo
  2 hallazgos). En paralelo el reporte separado tiene 19/17. → El ICR NO debe vivir incrustado en el
  acta legal (mezcla documento legal con auditoría interna y entrega a Ivette un anexo contradictorio).
- **#12 separa el reporte en archivo propio pero NO quita el anexo.** FIX pendiente: remover el ANEXO
  del cuerpo del acta (route.ts/actaBuilder.ts). NO es backlog cómodo — se repite cada corrida.

### PRÓXIMO CHAT — lo primero que haga Claude (orden sugerido)
1. **Mergear PR #12** (bajo riesgo: archivos nuevos + botón). Verificar en main + /api/icr-docx registrado.
2. **Correr Venezia final** con #12 en main (última de verdad — #12 no cambia el acta, solo agrega botón).
3. **Clic "Descargar reporte ICR (.docx)"** → entregar a Ivette: acta + reporte ICR (17 hallazgos, el bueno).
4. **FIX ANEXO embebido** (PR limpio, separado de #12): quitar el ANEXO ICR del cuerpo del acta.
5. **Pre-flight de Ivette** (diseño aparte): input en DF donde Ivette declara los representantes de admin
   de ESA asamblea antes de generar → alimenta classifyRoles paso 2 como dato verificado → reduce
   `[ROL NO VERIFICADO]`. Principio: conocimiento asamblea-específico = DATO humano, no inferencia de código.

### BACKLOG (no urgente, arrastrado)
- **Ledger de costos del DF** (instrucciones `CC_INSTRUCCIONES_ledger_costos_DF.md` ya en mano de Sam):
  una fila por acta en `ops_token_sessions`, cost = (in/1M*3)+(out/1M*15). fphs-formalize debe DEVOLVER
  tokens y dejar de escribir por su cuenta (hoy `logTokensBatch` duplica — NEUTRALIZAR al conectar ledger).
  PR #5 fue CERRADO sin merge (approach UNRLVL_SERVICE_KEY-en-DF abandonado). `ops_token_sessions`:
  session_type/input_tokens/output_tokens son NOT NULL (usar 0, nunca null).
- Soporte completo VotationRecord multi-candidato (Tesorero hoy placeholder).
- Reemplazar `/api/icr` "Claude open" por Agente Experto permanente (auditoría Ley 284 embebida +
  curaduría visual de imágenes; la corrección tipo-$300M y validación de identidad son criterio legal,
  pueden vivir aquí). Reglamento como 2º artefacto del DF. Cargar locales L01–L06 Castilla (fincas).
- Warning ICR de fincas faltantes (si fincaPendientes.length>0 → MEDIUM/DATA_MISMATCH no bloqueante).
- Mejora ICR "sugerir patrón de normalización" para alta de PH (sesión Agente Experto).

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- Sin cambios de DB esta sesión (todo fue código vía PR + verificación). EF fphs-formalize confirmada
  en **v28** (= patch v23). Professor: 3 learnings checkpoint 13 (approved_by_sam=true).

---
*ForumPHs · DF cierre de generación + corridas finales Venezia + PR #12 reporte ICR .docx · 2026-06-19*

## 2026-06-08 — Fincas Castilla + ledger de costos + warning ICR (mapeo para próximo chat)

### EN PRODUCCIÓN (aplicado y verificado)
- **Fix finca Torres de Castilla** — VALIDADO live por Sam: 237 fincas pobladas, solo
  los 6 locales no cargados quedan [FINCA PENDIENTE] (correcto). Causa raíz: la única
  regla era `explicit` esperando "5-E" con torre aparte, pero Hypal trae torre embebida
  sin columna ("TA 05E"=Torre A) y cero a la izquierda en el piso, mientras canonical_key
  es "A|5-E" sin cero. Fix = DATA: dos reglas `embedded_prefix` priority 90 (piso 0[1-9])
  y 95 (piso [1-9][0-9]) en `building_normalization` FPHS. Sin deploy.
- **Tarifa Sonnet registrada** en `ops_lab_rates` (UNRLVL): lab='document-factory',
  model_id='claude-sonnet-4-6', input $3/1M, output $15/1M. Base lista para el ledger.

### DECISIONES DE ARQUITECTURA
- **Rechazada la regla de normalización universal**: los formatos de PHs son mutuamente
  ambiguos ("TA 05E" Castilla vs "T3 44A" Luxor); una regla que adivine haría matches de
  finca incorrectos (peor que un hueco visible). Se mantiene formato-como-DATA por PH
  (1-2 INSERT sin deploy). Mejora futura: que el ICR DETECTE formato no contemplado y
  SUGIERA el patrón (alta de PH = un clic).
- **Ledger de costos del DF — Opción 1**: una fila agregada por acta (no por llamada),
  en `ops_token_sessions` (UNRLVL), cost_usd = (in/1M*3)+(out/1M*15).

### PENDIENTE — PRÓXIMO CHAT (lo primero que haga Claude)
> **Un solo PR de CC, toca solo `/api/generate`** (instrucciones ya entregadas a Sam:
> `CC_INSTRUCCIONES_ledger_costos_DF.md`, actualizado con los dos cambios):
> 1. **Ledger de costos del DF**: acumular usage de todas las llamadas Anthropic del job
>    (formalize + QA + ICR Mano A + Vision Mano B) → una fila en `ops_token_sessions`
>    con cost_usd calculado, escrita por `/api/generate` al cerrar el job. La EF
>    fphs-formalize debe DEVOLVER sus tokens (hoy solo los loguea) y dejar de escribir
>    por su cuenta (evitar doble conteo). **CC debe verificar que ICR/Vision devuelvan
>    bloque `usage`.**
> 2. **Warning ICR de fincas faltantes**: si `fincaPendientes.length>0`, push ICRFinding
>    MEDIUM / DATA_MISMATCH (campo `suggestion`), no bloqueante. Usa el `fincaPendientes[]`
>    que el lookup ya recolecta.
>
> Estado al cerrar: Sam le pasa las instrucciones a CC. Claude del próximo chat debe
> (a) verificar si el PR ya se abrió/mergeó (revisar main del repo + ops_token_sessions),
> (b) si está mergeado, validar una fila de costo real en ops_token_sessions tras un acta,
> (c) registrar cierre en Professor.

### OTROS PENDIENTES (no urgentes)
- Mejora ICR "sugerir patrón de normalización" para PH nuevo (sesión Agente Experto).
- 6 locales L01–L06 de Castilla no están en `units` (deuda de datos — cargar fincas).
- Re-smoke completo de Vision en Luxor (el 413 ya está resuelto; falta confirmar Mano B
  clasificando con un ZIP image-heavy en producción).

### REGLAS DB APLICADAS ESTA SESIÓN (registro — la DB es la fuente de verdad)
- FPHS `building_normalization`: +2 reglas Torres de Castilla (priority 90, 95).
- UNRLVL `ops_lab_rates`: +2 filas tarifa Sonnet document-factory (input/output).

---
[⬇ historial anterior preservado: sesiones 2026-06-04, 2026-06-01 ...]

# ForumPHs — Session Log

> Repo: `unrlvl-context/brands/ForumPHs/session_log.md`
> Las novedades más recientes van al tope.

---

## 2026-06-06 — SMA reapuntado a ForumPHs · creación de cuentas RRSS (Ivette + Jesús)

**Objetivo de la sesión:** reconfigurar el Social Media Agent (antes de NeuroneSCF) para que guíe la **creación de las cuentas de RRSS de ForumPHs**, ejecutada por Jesús (operador del armado) + Ivette Flores (clienta titular). Manejo continuo posterior: UNRLVL vía dev apps + flujos/labs. **SMA terminado y operativo en producción.**

### Decisiones de plataformas (aprobadas)
- **Mezcla:** Facebook (Página + grupos) + Instagram + LinkedIn (perfil de Ivette + Company Page) + Meta dev app + verificación de negocio. **WhatsApp Business EN PAUSA** hasta número móvil panameño dedicado. **TikTok fuera** (no encaja con servicio legal-administrativo).
- **LinkedIn doble activo:** perfil personal de Ivette (autoridad, ~70-80% del esfuerzo, alcance algorítmico) + Company Page (legitimidad institucional, permanencia). Patrón "persona al frente, marca detrás".
- **Autoridad alimentada por:** blog en forumphs.com + LinkedIn vía Agentes IID; orgánico + ads vía Orchestrator.

### Arquitectura de identidad (crítica)
- Persona real detrás de todas las cuentas: **Ivette Flores** (clienta titular). Desde su perfil personal de Facebook se crea el Business Manager; todo cuelga de ahí.
- **sam@unrealvillestudio.com** = admin de UNRLVL en el BM (control sin titularidad).
- Jesús ejecuta el armado junto a Ivette; los activos son siempre de ForumPHs.

### Orden de creación (10 pasos, BM primero, verificación como prerrequisito)
Correos → número (pausado, solo WhatsApp) → Facebook de Ivette → Business Manager → verificación de negocio Meta → Facebook Page → Instagram → WhatsApp (pausado) → Meta dev app → LinkedIn.

### Correos — aliases reales YA creados (forumphs.com → forumphs507@gmail.com)
- Plataforma: `fb@`, `ig@`, `linkedin@`, `wa@` (reservado). Funcionales: `forumphs@`, `ivetteflores@`, `contacto@`, `info@`, `admin@`, `irja@`.
- **Prerrequisito bloqueante:** Ivette debe tener `forumphs507@gmail.com` agregado y funcionando en teléfono Y compu antes de crear cuentas (las verificaciones llegan ahí).

### Política de seguridad de acceso (empujada por el agente)
- **Passkeys primero** en compu y móvil. **Evitar 2FA opcional** por ahora (hasta estabilizar acceso remoto; solo si la plataforma lo obliga). **Bitwarden** con mini-tutorial para contraseñas que existan.
- Número personal de Ivette aceptable provisional para FB/IG/LinkedIn/BM (teléfono editable); solo WhatsApp exige el dedicado (en WhatsApp el número ES la identidad de la cuenta).

### Roles del SMA (tokens)
- `admin` (Sam/UNRLVL), `client` (Ivette, clienta titular — antes `po`), `ops` (Jesús). Tokens en Vercel: SAMDEV/IVETTE/JESUS.

### Saludo con agenda por rol — funciona
- Al escribir "hola", el agente saluda y despliega la agenda filtrada por rol (verificado: Ivette ve segunda persona "tu cuenta", Sam ve vista admin). La portada de bienvenida es estática (front); la agenda real aparece en la primera respuesta del modelo.

### Estado técnico
- PR #1 (reapuntado) + PR #2 (ajustes: aliases, prerrequisito Gmail, saludo con agenda, endpoint reset) — ambos mergeados a main de AgentLab, desplegados en producción.
- **Historial KV reseteado a cero** vía `/api/reset` (12 keys borradas: 5 chats, 5 raw logs, registry, agent_log). Todos los tokens arrancan limpios.
- **EXPORT_SECRET rotado** por Sam (quedó expuesto en chat durante el reset). Pendiente: actualizarlo en el protocolo Actualiza y userPreferences (ver AGENDA).
- `reset.js` quedó en el repo como herramienta reutilizable (decisión pendiente: dejarlo o quitarlo tras uso).

### Email marketing (decisión tomada)
- FPHs usa **stack nativo Resend + Supabase + Orchestrator** (servicios), NO Klaviyo (que es para e-commerce, NSCF). Diseñar el email de FPHs "CRM-ready" desde el inicio para que el futuro unrlvl-CRM multimarca se enchufe sin reescribir.

### Próximos pasos ForumPHs (cuando Sam decida)
- [ ] Pulido SMA opcional: actualizar los 4 hints viejos (Google Voice/WABA) por hints de FPHs; opción de agenda en portada sin escribir "hola".
- [ ] Conseguir número panameño dedicado → activar WhatsApp Business → integrar ForumPHs Speaks.
- [ ] Ivette + Jesús ejecutan la creación de cuentas siguiendo el SMA.
- [ ] (Pendiente del sprint anterior) fphs-formalize quality sprint 90→98 — sin arrancar.

### SMA (comando Actualiza)
- A partir de v15 del protocolo, el SMA NO se consulta por defecto en Actualiza. Solo si Sam lo pide explícitamente.

---
*ForumPHs · SMA reapuntado + creación de cuentas RRSS · 2026-06-06*

---

## 2026-06-01 — fphs-formalize quality sprint · DIAGNÓSTICO + DISEÑO (sin construir aún)

**Sprint:** llevar el Document Factory del 90% (efectividad Ivette) al 98% (nivel alcanzado manualmente por Claude en el acta del Luxor 300). Sam pidió diagnóstico completo y diseño antes de tocar código. **No se construyó nada todavía** — esta sesión es plano + decisión de arquitectura.

### Panorama del pipeline (mapeado y verificado, no asumido)

```
ZIP → /api/parse (parsers + zipExtractor)
    → PreflightForm (overrides Sam)
    → ProcessingPipeline → fphs-formalize EF (workers async, redacta bloque×bloque)
    → /api/generate (ensambla DOCX + corre runQAScan)  ──→ QAReportView
    → /api/icr (Claude auditor lee acta, emite findings)  ──→ ICRReportView
    → /api/icr-apply → fphs-icr-apply EF (aplica decisiones de Ivette)
    → DOCX final
```

- Repo DF: `github.com/unrealvillestudio-hub/forumphs-document-factory` (PÚBLICO, clonable sin auth).
- Vercel proj: `forumphs-document-factory` (`prj_AUHgIP7cuc95dLz7vbj2P4piinlz`), team `team_fEH94Irp6BAI9YGm4btGna5n`.
- EFs en UNRLVL Supabase (`amlvyycfepwhiindxgzw`): `fphs-formalize` v20, `fphs-icr-apply` v11.

### HALLAZGO CLAVE: nada está roto
- **QA (`lib/processors/qaScanner.ts`)** — intacto y bien hecho. 2 capas: completeness estructural (0-100) + text-quality (regex 1ª persona, oral, género, formato números). Re-run progresivo (commit `89b093c`) funciona.
- **ICR (`/api/icr`)** — es la "capa Claude open" a convertir en Agente Experto. Tiene fallback que nunca tira 500.
- **Anexo ICR visual en DOCX (`/api/generate`)** — banners de color por sección + página anexo con severidad. Intacto (es lo que a Ivette le encanta).
- **`fphs-icr-apply`** — aplica decisiones apply/edit/ignore. Intacto.
- Lo que el session_log previo marcó "roto" era el frontend desconectado (`/api/actas/generate` 404), YA arreglado ayer por commits `6afc6a8` (rewire) + `89b093c` (sweeps).

### Los 5 gaps reales 90→98 (con ubicación en código)
1. **Números en letras** — NO existe. `actaBuilder` + `/api/generate` imprimen dígitos crudos (`${vote.yes_votes} votos`, `${pct}%`). Falta `numeroALetras()` determinística. Gap visual más grande vs acta manual.
2. **`fphs-formalize` formaliza fragmentos aislados** → repite identificación de hablante. NO tocar reparto async (decisión Sam, sólida: un fallo aguas arriba contamina todo lo demás). Afinar prompt: regla números en letras, quitar tope 150-200 palabras, subir `max_tokens` (hoy 400, corta intervenciones largas).
3. **Fallback inyecta 1ª persona** = fuente de los "13 errores". En `fphs-formalize`, si la API falla → `text_formal: t` (texto CRUDO). `templateFormalize` mete cita literal entre comillas. Cada fallo de red = 1 error de 1ª persona.
4. **Imágenes: mete TODAS las del paquete** — `/api/generate` bloque IMAGES APPENDIX vuelca `parsed.images` completo (incluye screenshots de Zoom). → resolver con curaduría visual del Agente.
5. **Matcher de votaciones** — `matchVoteToSection` casa por keywords; votaciones tipo "cuál opción/ a quién se escoge/ tiempo de pago" quedan huérfanas → faltan en QA.

### TOLERANCIA INICIAL (decisión Sam, corregido mi modelo mental)
- Problema real: `attempt 0` es DEMASIADO estricto → formaliza poco contenido → QA e ICR corren con poca info → resultado malo. Aflojar NO es trampa de score: deja pasar MÁS contenido formalizado a las etapas siguientes, que es lo que Claude+QA+ICR necesitan para trabajar. Lo ausente no lo arregla nadie aguas abajo.
- **Cambio:** el comportamiento del `attempt 1` actual pasa a ser el run inicial (`attempt 0`). "Tu segundo run de hoy = tu primer run de mañana".
- **Matiz a implementar:** subir el nivel de FORMALIZACIÓN al de attempt 1 (más contenido pasa) pero dejar el GATE de evaluación honesto, para que el score que ve Ivette no se infle.
- **Bug UI:** el botón de re-run DESAPARECIÓ de la UI (`page.tsx`/`QAReportView` reciben attempt/maxAttempts pero el botón no renderiza). Hay que devolverlo, recontando `MAX_SWEEPS` desde la nueva base.

### AGENTE EXPERTO ForumPHs (reemplaza el `/api/icr` genérico) — 2 manos de criterio
- **Mano A — Auditoría legal Ley 284**: lo que hace hoy el ICR, pero con conocimiento Ley 284 embebido + reglas del acta GOAL. Permanente, registrado (AgentLab), invocado en cada corrida. Alimenta los banners de color.
- **Mano B — Curaduría visual de imágenes**: recibe `parsed.images` (base64), decide con visión cuáles pertenecen al acta (gráfico de votación SÍ, screenshot Zoom NO, convocatoria del ascensor quizá), en qué orden, y genera caption legal de cada una. Resuelve Gap 4 de raíz (mejor que filtro por nombre/tipo, que es frágil).
- Regla del sprint: **dato exacto que existe → determinístico/SQL (nunca agente); criterio/interpretación/visión → Agente.**

### LOOKUP DE FINCA → 4º (5º) fix determinístico + cierre con Agente
- Ley 284: cada unidad lleva su finca individual (finca hija de la matriz). Ivette hoy lo hace a mano = error de input a eliminar.
- **NO lo hace el agente** (Sam lo propuso, Claude corrigió a favor): un JOIN no alucina; un agente sí podría "completar" una finca inexistente = reintroduce el error. Lookup SQL exacto. Si null → `[FINCA PENDIENTE]` → **ICR lo levanta como warning** (cierra el lazo, Ivette lo ve).

### DECISIÓN DE ARQUITECTURA PERMANENTE — normalización unidad→finca
> Sam: "toma la decisión correcta para no volver a trabajar sobre esto, no un parche."

- **(1) Clave canónica GUARDADA** en `units.canonical_key` (no al vuelo), con **índice único `(building_id, canonical_key)`** que mata a nivel DB el bug de duplicados de Torres de Castilla. Una sola `normalizeUnit()` puebla la columna; el lookup siempre lee la columna persistida (auditable). El "al vuelo" queda sólo como función de generación, no como ruta de lookup.
- **(2) Patrones de descomposición por-edificio en TABLA DE CONFIG `building_normalization`** (`source_pattern` regex con grupos nombrados, `tower_strategy` explicit|embedded_prefix|none, `canonical_template`), editable sin deploy. **Sumar un PH nuevo = INSERT de una fila, NO código ni deploy.**
- **PRINCIPIO DE ECOSISTEMA derivado:** conocimiento específico-por-cliente vive como DATOS (config en DB), no como código. Aplica a futuras plantillas de acta, reglas de quórum, etc.
- Auto-diagnosticante: lo que no normaliza (fórmulas Excel de Venezia, etc.) falla en voz alta → warning ICR, en vez de devolver finca equivocada en silencio.

### DB ForumPHs (datos sensibles) — `tajuoqdbnsnzkhyqvdgs` (`forumphs-db`)
- Arquitectura de datos: **UNRLVL = operaciones** (apps, DF, jobs, labs) · **FPHS = datos sensibles** (propietarios, fincas, PHs, JDs). El DF vive en UNRLVL y llama a FPHS cuando necesita datos de propietarios.
- El proxy `fphs-mcp-proxy` permite datos pero requiere el project_id correcto (`tajuoqdbnsnzkhyqvdgs`, NO el de UNRLVL). Proyecto se pausa por inactividad (INACTIVE) — requiere reactivación manual de Sam en dashboard.
- Tabla `units`: campos `unit_code`, `tower`, `floor`, `finca`, `building_id`, `metraje`, `maintenance_fee`. Relación propietario↔unidad en `owner_units`.

### HALLAZGOS DE INTEGRIDAD DE DATOS (registrados en Professor) — NO son del sprint, son deuda de capa de datos
| PH | Formato unit_code | Torre | Cobertura finca |
|---|---|---|---|
| Firenze Tower | `06-A` | — | 80/80 ✅ |
| Lefevre 75 | `01-E-A`, `01-O-B` | — | 184/186 ⚠️ |
| Los Álamos | `C-001` | — | **227/329** 🔴 (102 faltan) |
| **Luxor Towers 300** | `T3 01-OF` | — | 143/143 ✅ (caso validación) |
| Parque Central | `1-001` | — | 82/82 ✅ |
| Plaza España | `1-1A` | — | 70/70 ✅ |
| Torres de Castilla | `10-A` **dup por torre** | A/B | 306/306 (códigos repetidos) |
| Venezia Tower | `=SUM(A10)+1` 🔴🔴 | — | 182/364 (CORRUPTA) |

- **Venezia CRÍTICO:** unit_code son fórmulas Excel sin evaluar; 364 = duplicado ×2 del real 182. Requiere REIMPORTACIÓN.
- **Luxor 300 = caso de validación del sprint** (datos sanos, finca 143/143).

### Próximos pasos (sin arrancar — esperan decisión de orden de Sam)
- [ ] Tolerancia inicial recalibrada + botón re-run restaurado
- [ ] Agente Experto (legal + visual + warning de finca)
- [ ] Fixes determinísticos generador (números en letras, fallback sin 1ª persona, matcher votaciones, lookup finca)
- [ ] Migración DB: `units.canonical_key` + índice único + tabla `building_normalization`
- [ ] (Deuda datos, aparte) Reimportar Venezia; completar fincas Los Álamos/Lefevre

### SMA (comando Actualiza)
- Sin novedades del agente para ForumPHs (el export del SMA corresponde a NeuroneSCF, otra marca).

---
*ForumPHs · fphs-formalize sprint · 2026-06-01 · diagnóstico + diseño, sin construcción*
