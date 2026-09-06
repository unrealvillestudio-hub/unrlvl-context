# Session Log — UnrealvilleStudio

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.

## 2026-09-06 — BRIEF-05 cerrado y operando: el ecosistema deja de fabricar a ciegas y empieza a tener hora

> **Verificado contra producción el 2026-09-06** con `execute_sql` (`HRD-R13`): todo lo que abajo se
> etiqueta `medido` se consultó **al escribir esta entrada**, no se copió del brief. Professor cerrado
> **antes**: **14 learnings**, `session_date = 2026-09-06`, los catorce con `approved_by_sam = true`
> [reportado — brief de Claude.ai del 2026-09-06]. **SMA no se consultó.** Lo previo se conserva
> íntegro debajo.
>
> **Donde el brief y la medición discrepan, manda la medición y se dice cuál era lo declarado.** Esta
> entrada corrige **tres** cifras del brief y añade **una** que el brief no trae. Van marcadas en su
> sitio, no en una nota al pie.

### Lo que cambia de estado, en una línea

**BRIEF-05 queda cerrado y operando de punta a punta.** Cuatro PR de función más tres correctivos, y
**dos crons vivos** donde antes había cuarenta relojes que decían FABRICA y ninguno que dijera PUBLICA.

### ✅ Los siete PR de BRIEF-05, y qué prueba que cada uno está aplicado

**La prueba es directa, no el registro de migraciones.** `supabase_migrations.schema_migrations` tiene
**194 filas y su última versión es `20260816224730`** [medido]: **ninguna** de las migraciones de
BRIEF-05 figura ahí, porque se aplicaron con `execute_sql` y no con `apply_migration`. Preguntarle al
registro habría devuelto «no aplicada» sobre siete migraciones que **sí** están aplicadas. Lo que se
consulta es el objeto en el esquema.

| PR | Qué entregó | Prueba directa de que está aplicado |
|---|---|---|
| PR-A `20260902180000` | el dato del tiempo | `intel.brand_publish_policies` e `intel.brand_publish_slots` existen y tienen filas [medido] |
| #115 `20260902200000` | huso IANA, nunca desfase | el `CHECK` vigente, citado abajo [medido] |
| #117 `20260902220000` | `HR-GEN-10` | **mergeada, pineada y NUNCA APLICADA** — dos defectos [reportado — brief] |
| #119 `20260903130000` | correctiva de `HR-GEN-10` | `HR-GEN-10` existe, `active`, `severity = warn`, `brand_id = NULL` [medido] |
| PR-B `20260903150000` | el reservador | EF `publish-slot-reserver` **v6, ACTIVE**, `verify_jwt: false` [medido] |
| #121 `20260905120000` | `REVOKE EXECUTE … FROM PUBLIC` | ACL de `intel.drain_due_slots` = `postgres=X/postgres` + `service_role=X/postgres`, **sin `PUBLIC`** [medido] |
| PR-C (Orchestrator #33) | la fecha visible en las dos bandejas | mergeado [reportado — brief] |
| PR-D `20260905140000` | el drenaje | `intel.brand_publish_drain_log` y `intel.drain_due_slots` existen; `max_publications_per_run` es columna de `brand_publish_policies` [medido] |

**El `CHECK` que #115 dejó vigente**, leído con `pg_get_constraintdef` [medido]:

```
brands_publish_timezone_es_iana
CHECK (((publish_timezone IS NULL) OR ((length(btrim(publish_timezone)) > 0)
        AND (publish_timezone !~ '[+]') AND (publish_timezone !~ '-[0-9]')
        AND (publish_timezone ~ '[A-Za-z]'))))
```

Rechaza `-05:00` y `UTC-5` por `-[0-9]`, `+04:00` por `[+]`, y **`Etc/GMT±N` por partida doble** — que
era el caso peligroso, porque es IANA legítima **con el signo invertido** (`Etc/GMT+5` **es** UTC−5) y
por eso parece correcta. La exigencia de al menos una letra descarta además cualquier desfase pelado.

**Se leyó la definición del constraint; no se ejecutó un `INSERT` de prueba.** Un `INSERT` que lanza
demuestra que **algún** constraint lanzó; `pg_get_constraintdef` demuestra **cuál**, y no escribe en
producción. Cuando existe prueba directa, la indirecta no se ejecuta — regla que esta sesión sube a
`DELIVERY_AND_VERIFICATION_RULE.md`.

### 📐 Estado medido al cierre

Todo lo de esta tabla se consultó en una sola sentencia el **2026-09-06 a las 00:18 UTC** [medido]:

| Magnitud | Valor |
|---|---|
| Canales activos | **16** (de 20 filas en `intel.brand_publish_channels`) |
| Políticas | **16** |
| Franjas | **54** — **44 libres**, **10 reservadas** |
| Marcas con huso | **4** (de **16** marcas) |
| `intel.brand_publish_reservation_log` | **15 filas** |
| `intel.brand_publish_drain_log` | **0 filas** |
| Reglas de watcher activas | **51**, **las 51 en `warn`** |

**Las cuatro marcas con huso, en nombre IANA** [medido]: `ForumPHs` → `America/Panama`; `LucienSael`,
`NeuroneSCF` y `UnrealvilleStudio` → `America/New_York`.

**12 de 16 marcas siguen sin huso, y eso es correcto:** el huso se siembra cuando la marca entra al
calendario, no antes. Una marca sin huso no tiene franjas que reservar, así que el reservador la ignora
en vez de inventarle una hora.

### 🕐 Los dos crons vivos

| jobid | Nombre | Horario | Estado |
|---|---|---|---|
| **66** | `content-placement-poll` | `*/15 * * * *` | **activo** — el drenaje |
| **79** | `publish-slot-reserver-daily` | `10 6 * * *` | **activo** — el barrido |

El `command` de **79 lee el secreto desde vault**, y el barrido de patrones de secreto en claro sobre
las dos filas de `cron.job` da **cero coincidencias** [medido]. El precedente que esto cierra está en la
AGENDA del 2026-09-02: dos secretos en texto plano en `intel.iid_scheduler_config`. Aquí no se repitió.

### 📅 La primera publicación automática, y por qué sólo la mitad va a salir

**Lunes 7 de septiembre, 17:00 UTC — las 13:00 de Nueva York** [medido: la franja reservada más
temprana es `2026-09-07 17:00:00 UTC`, y `2026-09-07` cae en **lunes**].

De las **10 franjas reservadas**, **sólo 5 son drenables hoy por SocialLab** [medido, agrupando por
`provider`]:

| Proveedor | Franjas | Drenable |
|---|---|---|
| `meta_graph` | **5** — LucienSael (fb, ig), ForumPHs (fb), NeuroneSCF (fb, ig) | ✅ |
| `x_api` | 1 — LucienSael | ❌ `PROVIDER_NOT_DRAINABLE` |
| `vercel_html` | 2 — LucienSael `blog`, ForumPHs `blog_forumphs` | ❌ `PROVIDER_NOT_DRAINABLE` |
| `tiktok_business` | 2 — LucienSael, NeuroneSCF | ❌ `PROVIDER_NOT_DRAINABLE` |

**Las cinco no drenables fallan con la franja intacta**, no la consumen. Es la diferencia entre un
carril que se detiene y uno que pierde el turno en silencio.

### 🔧 Normalización de datos — `assets.social.adapted`

**137 piezas con el campo como arreglo y 0 como cadena**, sobre **137 piezas totales** en
`content.content_pieces` [medido]. Antes de la normalización, **43** estaban serializadas como cadena
[reportado — brief].

**El escritor sigue sin corregir, y por eso esto no está cerrado:** se arregló el lector y se normalizó
el dato, pero **algo escribe ese campo como cadena**. Mientras siga así, **las piezas nuevas nacen
rotas** y este 137/0 es una foto que caduca. Queda como encargo abierto en la AGENDA.

### 🔑 Incidente de credenciales

**`GH_PAT` caducó el 2026-09-03 a las 22:10 UTC tras tres avisos sin leer**, y el proxy
`unrlvl-context/api/gh` devolvió **401 en todas las rutas**. **Rotado y verificado el 2026-09-05**
[reportado — brief]. **`SLOT_RESERVER_SECRET`** fue rotado y **guardado en vault** como
`slot_reserver_secret`; que el `command` del jobid 79 lo lea desde vault es la parte **medida** de esta
afirmación.

Lo que el incidente enseña no es que un token caduque —eso es su naturaleza—, sino que **tres avisos
sin leer son un aviso mal diseñado**: el canal que avisa no es el canal que Sam mira.

### ⚠️ Tres cifras del brief que la medición corrige

**(1) Publicación manual fuera del carril — el brief declara 3 piezas de ForumPHs; hay 9, de 4 marcas,
y la cuenta crecía mientras se medía.**

El brief declara *«3 piezas de ForumPHs —2 Facebook, 1 Instagram— publicadas por MCP el 2026-09-06»*.
La parte de ForumPHs es exacta [medido: 3 piezas, 2 vía `MCP Meta` y 1 vía `MCP Meta IG`]. Lo que el
brief no trae son **las otras seis**:

| Marca | Piezas | Vía |
|---|---|---|
| ForumPHs | 3 | `MCP Meta` (2), `MCP Meta IG` (1) |
| LucienSael | 4 | `MCP Meta FB manual` (2), `MCP Meta IG manual` (2) |
| NeuroneSCF | 1 | `MCP Meta IG manual` |
| UnrealvilleStudio | 1 | `MCP Meta FB manual` |

**Total: 9 piezas** con `assets.publish_manual`, las nueve en `status = published` y las nueve con su
`platform_post_id` [medido].

**La cuenta no estaba quieta:** tres lecturas sucesivas dieron **7, luego 8, luego 9**. La causa no es
una lectura inestable — es que **la publicación manual estaba ocurriendo en ese momento**: `now()`
devolvió `2026-09-06 00:18:29 UTC` y el `at` más reciente era `2026-09-06 00:18:16 UTC`, **trece
segundos antes** [medido]. El brief no se equivocó: **fue superado por los hechos** entre que se
escribió (primer `at`: `00:01:10 UTC`) y que se ejecutó.

**Lo que esto enseña, y va a Professor:** una cifra medida sobre una tabla que alguien está escribiendo
**no es un estado, es un instante**, y se escribe con su hora. La lectura que discrepa de sí misma
entre dos consultas no es un error de medición: es la señal de que el sistema está vivo debajo.

**(2) Funciones `SECURITY DEFINER` alcanzables por `anon` — el brief declara 10; hay 11.**

Medido con `has_function_privilege('anon', oid, 'EXECUTE')` sobre `pg_proc` en `intel`, `content` y
`public`. Las diez que el brief nombra están las diez. **La undécima es `intel.validate_queue_voice()`**,
que el brief no lista. Importa porque el encargo abierto dice **una por PR**: con el número mal, el
encargo se declara terminado con una función todavía expuesta.

**(3) El registro de migraciones no sirve para verificar BRIEF-05.** Ya declarado arriba: última versión
del registro `20260816224730`, y las siete migraciones de BRIEF-05 aplicadas fuera de él.

### ➕ Una cifra que el brief no trae

**`ecosystem.json` declara 106 Edge Functions; hay 109** [medido con `list_edge_functions`]. El propio
campo ya advertía de sí mismo —*«este campo es un DATO consultable: por context-resolver §1 no debería
vivir en un context file»*— y vuelve a tener razón: se corrige a 109 y se deja la advertencia intacta.

### 🧭 Dos reglas de gobernanza que esta sesión produce

- **`DELIVERY_AND_VERIFICATION_RULE.md` → v1.3, §4.1 nueva.** **Cuando existe prueba directa, la
  indirecta no se ejecuta.** Un `INSERT` que lanza demuestra que **algún** constraint lanzó; leer
  `pg_get_constraintdef` demuestra **cuál**, y **no escribe en producción**. Medida hoy sobre #115.
- **`CC_PROTOCOL.md` → v9, §11 nueva.** **Toda función `SECURITY DEFINER` lleva
  `REVOKE EXECUTE … FROM PUBLIC` antes del `GRANT`.** `CREATE FUNCTION` **concede a `PUBLIC` por
  defecto**, y un `GRANT` a `service_role` **suma, no restringe**: la función queda abierta y el `GRANT`
  explícito da la impresión contraria. Es la causa raíz de las **once** funciones del punto (2).

### 🧭 Lo que este día enseña sobre cómo se mide

- **Una cifra sobre una tabla viva es un instante, no un estado.** Se escribe con su hora, o no se
  escribe.
- **Cuando existe prueba directa, la indirecta no se ejecuta** — y menos si la indirecta escribe.
- **Un registro de migraciones sólo prueba lo que pasó por él.** Verificar «aplicada» contra un ledger
  que no recibió la migración devuelve un falso negativo con toda la apariencia de un hecho.
- **Un `GRANT` explícito puede hacer creer que hay una restricción donde sólo hay una suma.**
- **Tres avisos sin leer son un aviso mal diseñado.**

---

## 2026-09-02 — Cinco briefs, cuatro cerrados, y el dato del tiempo entra al esquema: el ecosistema deja de fabricar a ciegas

> **Verificado contra producción el 2026-09-02** con `execute_sql` (`HRD-R13`): todo lo que abajo se
> etiqueta `medido` se consultó **al escribir esta entrada**, no se copió del brief. Professor cerrado
> **antes**: **12 learnings**, `session_date = 2026-09-02`, los doce con `approved_by_sam = true`
> [medido]. **SMA no se consultó.** Lo previo se conserva íntegro debajo.

### Lo que cambia de estado, en una línea

**BRIEF-01, BRIEF-02, BRIEF-03 y BRIEF-04 quedan COMPLETOS** —código mergeado **y** DDL aplicada—, y
**BRIEF-05 entra con su primer PR aplicado y su corrección pendiente de aplicar**. El eje que abre es el
que faltaba desde el 2026-07-27: **el tiempo como dato**.

### ✅ BRIEF-01 — la pieza se lee en voz alta, en las tres bandejas

`Orchestrator` **#26**. Síntesis nativa del navegador (`window.speechSynthesis`): sin backend, sin
proveedor externo, sin costo por reproducción. `SpeechReader` recibe `{title, body}` en texto plano **y
nada más** —ni artefacto, ni endpoint, ni bandeja, ni marca—, porque las tres bandejas obtienen el texto
por **tres caminos distintos**: calibración y publicación por `POST /api/preview-render` (HTML) y
retenidas por `ChallengedRow.piece.title`/`.body` (texto plano) [reportado — PR #26, medido sobre el
código en su momento]. Cada superficie aporta su adaptador en `src/modules/iid/readablePiece.ts`.

### ✅ BRIEF-02 — el historial de piezas evaluadas, y una pieza vuelve a poder nombrarse

`Orchestrator` **#31**, último de la cadena de cuatro. Un **cuarto tab de sólo lectura** con filtros por
rango de fechas, marca, canal, veredicto y origen. **El defecto que cierra:** una pieza calibrada
desaparecía de la bandeja y no había forma de volver a verla **ni de nombrarla** — por eso el `piece_id`
es copiable **en la fila cerrada**.

`intel.approval_calibration` y `intel.approval_calibration_archive` se leen **por separado** y se unen en
JS, con un campo `source` por fila: ni vista ni RPC, porque el resto de la carpeta evita
`SECURITY DEFINER` a propósito. **Un veredicto desconocido se muestra, no se descarta** — cero listas
cerradas de veredictos, en el endpoint y en el contrato del cliente. El eje ya se amplió una vez
(`fixable`) y volverá a hacerlo. **165 pruebas en verde, 14 nuevas.**

> **Lo que este PR decidió NO hacer, y quedó abierto.** El corpus guarda la fecha del **veredicto**, no
> la de la pieza: usarla contra `intel.pipeline_cutoffs` daría **otra magnitud con el mismo nombre**. El
> eje de cortes del historial queda como unidad aparte, en `AGENDA.md`.

### ✅ BRIEF-03 — el tercer veredicto: `fixable`

Cuatro PR en `Orchestrator` —**#27** (código), **#28** (la propuesta baja a la pieza), **#29** (DDL pura)
y **#30** (el lector sabe en qué idioma leer)— y la DDL **aplicada** [medido]:

| Comprobación | Estado |
|---|---|
| `intel.approval_calibration.fix_proposal` | existe |
| `approval_calibration_verdict_check` | `CHECK ((verdict = ANY (ARRAY['approved'::text, 'rejected'::text, 'fixable'::text])))` |

**Tres veredictos, dos ramas, y es deliberado:** `fixable` cae por la misma rama que `rejected` y **sella
la pieza igual**. Un veredicto que no sella deja la pieza viva en `awaiting_approval` y **reaparece en la
bandeja al día siguiente** — que es el defecto `SIGN-01` corte A2 otra vez, el que ya costó seis
decisiones sin efecto. Queda comentado en los tres archivos donde se puede leer mal y fijado por dos
pruebas.

**Por qué el código fue antes que la DDL, dos veces.** Ampliar el `CHECK` antes de que el código sepa
emitir y leer el valor deja la base aceptando algo que ninguna capa produce (`MULTIBRAND_RULE` §5). Y
#28 va antes que #29 por la misma regla un piso más abajo: entre la migración y ese PR se podrían haber
guardado `fixable` cuyo `discarded_reason` **no llevara la propuesta**, y esas filas quedarían mal **para
siempre**. El corpus se archiva; `discarded_reason` no.

**El `CHECK` se amplía en UNA sola sentencia.** `DROP` y `ADD` separados dejan la tabla sin restricción
sobre `verdict` en el intervalo, y en esa ventana entra cualquier valor. Cinco sentencias, no seis.

**#30 — el lector ya no lee español con voz inglesa.** `api/_brandLanguage.ts` resuelve por `brand_id`
con cascada `voicelab_language` → `language_primary` → `null`, y viaja como `reading_language` desde las
tres bandejas. **Degradar, nunca inventar:** una marca fuera del catálogo cae en la voz del sistema, y la
fila `DEFAULT` **existe y no se usa como respaldo a propósito** — escribir ese id sería enumerar una
instancia dentro de una capa que sirve a N marcas.

### ✅ BRIEF-04 — la imagen deja de repetir el texto de la pieza

Tres PR y una siembra, los tres tiempos completos: **`unrlvl-iid-functions` #112** (DDL pura),
**`CopyLab` #38** (el escritor emite tres cadenas: gancho, apoyo y título), **`unrlvl-iid-functions`
#113** (el carril transporta el modo y compone), y la siembra `20260902160000` **aplicada** [medido].

**El defecto no hubo que inferirlo: la propia pieza lo declaraba.** En `627038e5` (LucienSael, `blog`),
`assets.image.overlay.text_source` decía literalmente `copy.title + copy.aife_filtered[1a oracion]`. De
ahí los **tres impactos de la misma idea**: título estampado, primera frase estampada, y las dos otra vez
debajo en texto.

**El compositor ya tenía dos ranuras.** `public.imagelab_overlay_tokens` declara `typography.headline` y
`typography.subheadline` en las cuatro marcas sembradas. **El defecto no era la estructura: era qué se
metía en cada una.** Y el orden del carril tampoco era el problema —`copylab(1) → aife(2) → imagelab(3)
→ sociallab(4)`—: **el texto se escribe antes que la imagen, no hay que invertir nada.**

El eje se llama `image_title_mode` con valores `echo` y `dialogue`, y las dos claves nuevas del copy son
`copy.image_hook` (abre, provoca, no se explica) y `copy.image_support` (matiza el gancho; **nunca** la
primera frase del cuerpo). **Estado en producción [medido 2026-09-02]:** `dialogue = 13`, `echo = 6` de
19 filas de `intel.brand_publish_channels`. Los seis que repiten son `blog` (3), `blog_forumphs` (1),
`email` (1) y `email_propietarios` (1): ahí el título es un `H1` que indexa o el asunto de un correo, y
un gancho suelto castiga la búsqueda y la apertura.

**Dos decisiones que el brief no fijaba y quedan escritas:**

1. **El compositor no vuelve a consultar el registro de canales.** Lee el modo del `builder_input`
   persistido en la **pieza**. Si el modo cambiara entre la escritura y la composición —o antes de un
   `recompose`, que puede correr días después—, una segunda lectura haría que el compositor buscara un
   gancho que el escritor nunca produjo. **El modo es un hecho de la pieza, no una preferencia vigente.**
2. **`text_source` nombra lo que efectivamente se compuso**, no lo que la pieza traía: un apoyo
   descartado por duplicar el gancho no se declara. Lo encontró un test escrito para otra cosa.

**La siembra fue la única pieza de BRIEF-04 que cambió el comportamiento**, y por eso fue al final, con
los dos deploys vivos. Filtra por `platform_key` y **nunca** por `brand_id`, y **enumera los canales que
entran, no los que se excluyen**: así un `platform_key` nuevo nace repitiendo y espera una decisión, en
vez de responder porque nadie lo miró.

### 🟡 BRIEF-05 — el dato del tiempo: PR-A aplicado, la corrección del `CHECK` pendiente

**`unrlvl-iid-functions` #114 (PR-A) — mergeado 15:51 UTC y APLICADO en producción** [medido
2026-09-02]:

| Objeto | Estado medido |
|---|---|
| `public.brands.publish_timezone` | existe · **`NULL` en las 15 filas** |
| `intel.brand_publish_policies` | existe · **0 filas** · RLS activada · `GRANT SELECT, INSERT, UPDATE, DELETE` a `service_role` |
| `intel.brand_publish_slots` | existe · **0 filas** · RLS activada · mismo `GRANT` explícito |
| `brand_publish_slots_ocupacion_coherente` | `free` exige pieza nula; `reserved`/`published` exigen pieza |

**El defecto que ataca, re-medido hoy y peor de lo que suena:** **47 crons activos, 38 de research y
process, y CERO de publicación**; `public.scheduled_posts` en **0 filas**; **118 piezas** en
`content.content_pieces`. **Cuarenta relojes que dicen FABRICA y ninguno que diga PUBLICA.** Lo que
faltaba no era código: era el dato del tiempo.

**§4 y §4.1 del brief se contradecían y hubo que resolverlo.** §4 ponía el huso **por marca**; §4.1 en la
fila de **marca × canal**. Las dos no pueden ser ciertas: una fila por canal admite que un canal de una
marca diga Panamá y otro diga Madrid, y **nada en el esquema diría cuál manda** — una ambigüedad de hasta
siete horas con dos fuentes. **Resolución (Sam):** el huso vive en `public.brands.publish_timezone`, una
sola verdad por marca; la fila de marca × canal lleva un `timezone_override` que **nace nulo**.

**Las tablas nacen VACÍAS, y es deliberado.** El brief titulaba PR-A «tablas y **siembra**». Un huso y una
franja son **dato de marca**, del mismo orden que la tipografía y la paleta: los declara quien responde
por la marca. Y a diferencia de BRIEF-04 —donde la columna pudo nacer con el valor del comportamiento
**vigente**, porque había uno— aquí **no hay comportamiento que copiar**: cero filas publicadas por esta
vía. **No existe el default honesto.** Consecuencia buscada: sin husos declarados, PR-B no genera una
sola franja y la bandeja de PR-C dice «sin franja asignada» con su motivo — preferible a asumir UTC en
silencio y publicar a las tres de la madrugada hora de Panamá.

**El tope por corrida existe por un dato medido:** hay **25 piezas aprobadas y sin franja** —5 de
ForumPHs del 24-25 de agosto, 16 de LucienSael del 31, 4 de NeuroneSCF—. `max_assignments_per_run` es
`NOT NULL DEFAULT 1` y **no admite un «ilimitado» por omisión**: para levantarlo se escribe un número
grande, a conciencia. Si el sin-límite fuese expresable por omisión, un campo olvidado sería una
avalancha.

**El hueco no necesita tabla propia.** Una franja que sigue en `free` con su `slot_at` ya pasado **es** el
hueco registrado, y contarlos es la señal de demanda que el scheduler de cantidades consumirá.

#### 🔴 `unrlvl-iid-functions` #115 — mergeado 21:11 UTC y **NO aplicado**: un desfase no es un huso

El `CHECK` que PR-A dejó en producción es, **hoy y ahora** [medido]:

```
brands_publish_timezone_no_vacio
  CHECK (((publish_timezone IS NULL) OR (length(btrim(publish_timezone)) > 0)))
```

**Un `-05:00` entra sin protesta.** `America/Panama` es UTC−5 los doce meses; `America/New_York` alterna
entre −5 y −4. Guardar `-05:00` para una marca de Miami la haría publicar **una hora tarde durante ocho
meses al año sin que nada falle**: sin excepción, sin log, sólo publicaciones a deshora.

**Y cae también la familia `Etc/GMT±N`**, que es el hallazgo que justifica el archivo aparte: es IANA
legítima pero lleva **el signo invertido** — `Etc/GMT+5` **es** UTC−5. Quien busque «UTC−5» entre nombres
IANA la encuentra y escribe el opuesto exacto **creyendo que acierta**. Es peor que un desfase a secas
porque parece correcta. Medido contra `pg_timezone_names` antes de escribir la regla: de **1196** zonas
acepta **1136** y rechaza **60**, y las 60 son exactamente la familia de desfase fijo [reportado — PR
#115].

**Por qué hay dos archivos y no una edición.** Una migración aplicada no vuelve a correr: editarla no
cambia una sola fila de la base, **sólo hace que el repo deje de describir lo que hay, y en silencio**. El
bloque `T7` de la suite **fija el sha de git de `20260902180000` tal como se aplicó**, de modo que
cualquier edición futura de un archivo ya aplicado **rompe la suite**.

**Pendiente real y único de BRIEF-05 hoy:** aplicar las **dos** sentencias de la migración correctora
—`public.brands` e `intel.brand_publish_policies`, cada una con `DROP` y `ADD` en un solo `ALTER`—. **La
DDL de `20260902180000` NO está pendiente: ya está aplicada.**

### 🔧 Dos cierres del día que no llevan número de brief

- **`Orchestrator` #32** — la bandeja de publicación **también explica el error**. `publishInbox.req`
  seguía colapsando el mensaje del server en `error`, que es un código para la máquina
  (`verdict_failed`) y no le dice nada al operador. Una línea de código; lo que lo hace duradero es la
  prueba: los tres clientes tienen **su propio `req`**, así que el orden de preferencia se puede
  desincronizar sin que nada falle ni nada avise. **171 pruebas en verde.**
- **`unrlvl-mail-mcp` #7 · MCP-SCOPE-01** — cada credencial lleva **su alcance de marcas**, y un
  `brand_id` fuera de alcance falla con `403 MCP_BRAND_OUT_OF_SCOPE` **antes de resolver credencial y
  antes de abrir conexión a la base**. Con un token único sin alcance, dar de alta un buzón personal
  produce **dos fugas simétricas**. `MCP_AUTH_TOKEN` se conserva como alias legacy; se retira en un
  tercer PR. **79 pruebas en verde.** **Acción para Sam:** cargar `MCP_AUTH_TOKENS` en Vercel y verificar
  el `403` con el `curl` del paso 5.7 de `docs/DEPLOY.md`.

### 🧠 Los doce learnings del día — Professor cerrado antes del Actualiza

**12 filas** en `public.professor_learnings`, `session_date = 2026-09-02`, **las doce con
`approved_by_sam = true`** [medido]. Los doce, por categoría:

| # | Categoría | Qué fija |
|---|---|---|
| 1 | `infraestructura` | **`content-run-stage` pesa 385.953 bytes** y las tools MCP de deploy reciben el código **inline**: ningún modelo puede desplegarla sin truncar. El despliegue lo lanza **Sam desde su terminal**, con `--no-verify-jwt` **obligatorio** — sin la bandera, el deploy cambia `verify_jwt` y **rompe el cron** |
| 2 | `briefs` | **Todo brief declara EL REPO DE CADA CAMBIO**, no un repo para todo el brief. BRIEF-04 nació con gobernanza de un solo repo cuando sus tres piezas vivían en tres —`Orchestrator`, `unrlvl-iid-functions`, `CopyLab`— y **CC quedó bloqueado sin permiso de escritura**. Misma familia que fijar el nombre de la rama, que tampoco es parte del encargo |
| 3 | `verificacion` | **El texto que publica NO es `assets.copy.aife_filtered` sino `assets.social.adapted`.** El maestro alimenta el artefacto de la bandeja; el adaptado es lo que sale al canal y **es donde viven hashtags y firma**. Medir el maestro y llamarlo «la pieza» produce **un cero verdadero sobre la pregunta equivocada**: así se afirmó por error que no había hashtags y que el contador mentía. **Antes de afirmar sobre una pieza, declarar qué cara se está midiendo** |
| 4 | `schema` | **`GRANT`: una TABLA nueva no hereda ningún privilegio** y exige `GRANT` explícito. **Una COLUMNA nueva sobre tabla ya concedida SÍ queda cubierta** por el grant de tabla. Medido con `watcher_result` y `watcher_gate`. La formulación anterior —«en este ecosistema no se hereda en columnas nuevas»— **era falsa y se afirmó sin medir** |
| 5 | `schema` | **Política de RLS sin `GRANT` falla en silencio y parece un bug de código.** `public.platform_configs` tenía RLS activada con política y **cero privilegios** para `service_role`: el lector decía «no se pudo leer» y los topes de caracteres y hashtags nunca llegaban a la tarjeta. **Al sembrar una tabla, verificar SIEMPRE las dos cosas: política y `GRANT`** |
| 6 | `verificacion` | **Toda instrucción de verificación sobre la bandeja debe declarar si escribe en PRODUCCIÓN y sobre qué pieza.** Decir «aprueba una pieza y rechaza otra» en un preview de Vercel **escribió en la base real** y selló **cuatro piezas de ForumPHs**, una de ellas camino de publicarse en `scheduled` |
| 7 | `cc` | **CC NO se ejecuta en la máquina de Sam.** Corre en un **contenedor Linux propio**: las variables de entorno de Windows, las CLI instaladas localmente y las rutas de disco de Sam **no existen para él**. Antes de dar instrucciones de entorno o credenciales, **preguntar dónde corre el proceso** |
| 8 | `contexto` | **`unrealvillestudio-hub/BluePrints` —395 archivos— contiene los `BP_BRAND` y los assets de identidad de cada marca.** Es la fuente para identidad **VISUAL**; **NO** lo es para las firmas, y el `BP_BRAND` de UnrealvilleStudio **está desactualizado**. **Una fuente canónica desactualizada es peor que una ausente porque parece autoridad.** No figuraba ni en `CAPABILITIES.md` ni en el filemap: **se trabajó media sesión reconstruyendo lo que ya estaba escrito ahí** |
| 9 | `contenido` | **El compositor de imagen tiene DOS ranuras de texto** —`headline` y `subheadline`—, cada una con tipografía y `fit_steps` propios. El eco venía de que el `subheadline` era literalmente la primera frase del cuerpo. **El modo diálogo no exige invertir el carril** —`copylab(1)` va antes que `imagelab(3)`—: exige que la etapa de copy **emita tres cadenas con funciones distintas** |
| 10 | `arquitectura` | **El Cadence Scheduler se diseñó el 2026-07-27 y nunca se construyó.** Por eso hay 47 crons activos, ~40 de research y process, y **cero de publicación**; y por eso se generaron **16 piezas en tres horas** sin que nada mirase la cola. **Separación correcta: un scheduler administra canal/cantidades a la ENTRADA y otro canal/fechas a la SALIDA. El de fechas es la fuente de la demanda y el de cantidades la lee. Nunca al revés** |
| 11 | `contenido` | **`signature_closer` como eje:** toda marca tiene firma y **vivía en ningún sitio** para UnrealvilleStudio — por eso el escritor **estampó un glifo inventado**. Pero `assets.builder_meta.signature_closer` **YA existía** como mecanismo de estampado tras el `PASS` del Watcher. **Queda por resolver si la columna nueva del genoma alimenta ese mecanismo o compite con él: dos fuentes para el mismo dato es exactamente lo que produjo el defecto** |
| 12 | `datos` | **Archivar y no borrar:** 44 filas de generación anterior movidas a `intel.approval_calibration_archive` en vez de eliminarlas. Al hacerlo apareció que las filas del corpus **eran lo único que mantenía seis piezas fuera de la bandeja**, y que **cinco decisiones de Sam del 25-ago nunca sellaron la pieza** —defecto `SIGN-01` corte A2—. **Borrar habría resucitado seis piezas sin aviso** |

**El archivo de calibración, medido hoy** — `intel.approval_calibration_archive` tiene **48 filas** en
tres lotes, cada uno con su motivo escrito, y `intel.approval_calibration` **19 vivas**:

| Filas | Motivo archivado |
|---|---|
| 39 | generación anterior al corte `2026-08-30T21:12Z` |
| 5 | aprobadas por Sam el 25-ago y **nunca selladas** por `SIGN-01` corte A2; devueltas a la bandeja el 31-ago |
| 4 | **veredictos de prueba de despliegue** del 31-ago — «las cuatro piezas se juzgaron sin leerlas, siguiendo instrucciones de verificación del PR». Pieza devuelta a la bandeja |

Las **44** del learning 12 son los dos primeros lotes; las **4** del learning 6 son el tercero, y son la
reversión del incidente, no un archivado de rutina. [medido]

### 🧭 Lo que este día enseña, y no es sobre código

- **Un brief tiene tantos repos como cambios, no uno.** El repo no es una propiedad del brief: es una
  propiedad de **cada pieza** del brief. La gobernanza escrita en singular bloqueó a CC sin que nadie
  hubiese decidido bloquearlo.
- **Una instrucción de verificación es una instrucción de escritura mientras no diga lo contrario.** «Un
  preview de Vercel» no es un entorno de pruebas: es la misma base.
- **Una fuente canónica desactualizada es peor que una ausente, porque parece autoridad.** `BluePrints`
  existía, tenía la respuesta, y no estaba en el catálogo — así que se reconstruyó a mano lo que ya
  estaba escrito.
- **Antes de afirmar sobre una pieza, declarar qué cara se mide.** El maestro y el adaptado son dos caras
  del mismo objeto, y la pregunta correcta sobre la cara equivocada devuelve un cero **verdadero**.
- **Preguntar dónde corre el proceso antes de hablar de su entorno.** CC no comparte máquina, disco ni
  variables con Sam.

---

## 2026-08-30 — La corrida de verificación de LucienSael, medida al cierre y no al corte del brief

**Por qué esta entrada difiere del brief que la encarga.** El brief de `Actualiza` se escribió con la
corrida **en curso** y lo declara: el corte 10 —seis filas devueltas a `pending` y re-despachadas—
quedaba *«en curso al cierre»*. **La corrida siguió después de escrito el brief**, así que todo lo de
abajo se **midió contra Supabase en el momento de escribir**, no se copió (`HRD-R13`). Donde el número
medido supera al declarado, se escribe el medido y se dice cuál era el declarado.

### Lo ejecutado en producción por Claude.ai, verificado por CC contra la base

| # | Corte | Verificación de CC | Estado |
|---|---|---|---|
| 1 | 50 reglas activas de `intel.watcher_rules` a `severity='warn'`, con firma de Sam | **50 activas en `warn`, cero activas en `blocking`; 15 inactivas intactas** (14 `blocking` + 1 `warn`) | ✅ medido |
| 2 | `public.language_directives` creada, con RLS y `GRANT SELECT` a `service_role` y `anon` | tabla presente en `public` | ✅ medido |
| 3 | Sembradas `es` y `en` | **2 filas**, `directive_block` de **585** y **422** caracteres; `register_constraints` sólo en `es` (**472** caracteres), `NULL` en `en` | ✅ medido |
| 5 | `public.brand_voice_genome.voice_note` añadida | columna presente | ✅ medido |
| 6 | 11 notas de voz sembradas | **11 de 11 voces activas** con `voice_note`; 13 filas en total, las 2 inactivas sin nota | ✅ medido |
| 7 | `intel.iid_content_queue.angle_pick` añadida | columna presente | ✅ medido |
| 8 | `brands.language_primary` de `LucienSael` y `SamPublisher` corregido a `en` | **las dos filas valen `en`** | ✅ medido |
| 9 | `content_type_registry`: `x` y `tiktok` a `max_tokens = 900` con `format_instruction` | **5 filas** —`x` 2, `tiktok` 3—, las cinco en **900** y con instrucción de **339** caracteres | ✅ medido |
| 10 | 6 filas de cola devueltas a `pending` y re-despachadas | **5 de las 6 produjeron pieza**; la sexta seguía en `processing` al cierre | ✅ medido — ver abajo |

**Dato que el brief no traía, y que corrige un supuesto:** `UnrealvilleStudio` **ya valía `en`** antes
de esta sesión. Las marcas con `language_primary = 'en'` son **tres**, no dos: `LucienSael`,
`SamPublisher` y `UnrealvilleStudio`. De las **15 filas** de `public.brands`, las otras **12** valen
`es`. [medido — `SELECT id, language_primary FROM public.brands`]

### La corrida de LucienSael — medida al cierre

Disparada a mano con `intel.trigger_iid_agent` porque **LucienSael no tiene ni un cron**. Ventana real
**19:30:00 → 21:33:31 UTC** (el brief declaraba 19:24–21:00, porque se escribió antes del último tramo).

| Métrica | Medido al cierre | Declarado en el brief | Base previa |
|---|---|---|---|
| Jobs de la corrida | **30** | 24 | — |
| Piezas creadas | **23** | 18 | — |
| `content_pieces.pass_type = 'clean'` | **23 de 23 · 100 %** | 18 de 18 | 26 % |
| Extremo a extremo (piezas por job) | **23 de 30 · 76,7 %** | 18 de 24 · 75 % | 26 % |
| blog + meta_fb + meta_ig | **15 de 15 · 100 %** | 15 de 15 | — |
| `x` + `tiktok` | **8 de 15** | 3 de 10 · 30 % | — |
| Piezas `assisted` | **0** | 0 | — |
| Muertas **en** el juez | **0** — `intel.watcher_log` da **20 `PASS` + 3 `RESCHEDULE`**, cero `REJECT` | 0 | 12 de 27 |

**Los seis fallos son todos `COPYLAB_TRUNCATED_BODY`**, los seis en `x` y `tiktok`, con el mensaje de
error nombrando el techo que aplicó.

### 🟢 PRE-JUEZ-01 queda VERIFICADO — el brief lo dejaba «en curso»

El error de cada job dice **qué techo aplicó**, así que la verificación no necesita interpretación:

| Tramo | Techo en `builder_meta.max_tokens` | Resultado |
|---|---|---|
| 19:30 – 21:00 UTC | **100** en `x` · **400** en `tiktok`, `max_tokens_source = voice_platform` | **3 de 9** produjeron pieza; los 6 fallos son de este tramo |
| 21:33 UTC (re-despacho del corte 10) | **900**, `max_tokens_source = voice_platform` | **5 de 5 produjeron pieza · cero truncamiento** |

**El techo era el discriminador, y el dato lo confirma en la misma jornada.** Es la comprobación que el
learning 3 del brief pedía: `format_instruction` en `NULL` no explicaba nada porque también estaba en
`NULL` en las filas que nunca truncan; **el techo sí separa los dos grupos**, y lo hace dentro de la
misma corrida, con el resto de las condiciones iguales. [medido — `assets.builder_meta.max_tokens` y
`error_log` de los 15 jobs de `x` y `tiktok`]

### Los cuatro cortes, contra la base

- ✅ **FIX-LANG-01 (efecto).** `builder_meta.language = 'en'` en **23 de 23**. La corrección de
  `brands.language_primary` viaja por la cascada. [medido]
- ⚠️ **FIX-LANG-01 (traza).** `builder_meta.language_directive.source` viene **`NULL` en 23 de 23**. El
  idioma llega bien, pero **la procedencia de la directiva no es observable**, que era el criterio de
  éxito escrito. Queda abierto contra el código de CopyLab. [medido]
- ✅ **FIX-AIFE-04.** `assets.copy.aife_voice_note_source = 'genome'` en **23 de 23**. La nota sale del
  genoma, no del alias cableado. [medido]
- ⚠️ **FIX-ADAPT-02 — desplegado y sin efecto.** `assets.social` trae la clave `language` en **23 de
  23** y su valor es **`NULL` en las 23**. **Un campo presente no es un campo poblado.** [medido]
- ✅ **`angle_pick`.** **25 de 25** filas encoladas hoy lo llevan, con **7 ángulos distintos** en
  rotación real. [medido — `intel.iid_content_queue`, filas de `created_at >= 2026-08-30`]
- ✅ **`duplication.outcome` responde en 23 de 23.** **Corrección de ruta:** no vive en
  `assets.watcher` del job —ahí no está— sino en **`intel.watcher_log.gate_detail->'duplication'`**.
  Consultar la primera ruta devuelve **cero**, y ese cero es el «cero verdadero sobre una pregunta
  falsa» que ya costó una pasada el 2026-08-29. [medido]

### Corpus de arbitraje — mayor que el declarado, y con otro primero

De las 23 piezas salen **28 marcas** sobre **13 reglas distintas**, todas en `warned` y ninguna en
`violated`, porque las 50 reglas activas están en `warn`:

`HR-GEN-05` **×6** · `HR-GEN-01` ×5 · `HR-GEN-02` ×3 · `HR-LUC-06` ×3 · `HR-GEN-03` ×2 ·
`HR-GEN-08` ×2 · y ocho reglas con una marca cada una.

El brief declaraba **23 marcas** con `HR-GEN-01` a la cabeza (×5) y `HR-GEN-05` en ×4. Medido al
cierre, **`HR-GEN-05` es la primera con ×6** — y es precisamente la regla que `P6` describe como
*«blocking sin `verify_pattern` y sin dueño»*. [medido — `gate_detail->'hard_rules'->'warned'`]

### 🔴 Hallazgo nuevo de CC, no pedido y no tocado: el juez filtra su propia deliberación

En la fila leída, `gate_detail.hard_rules.raw` contiene el razonamiento del modelo en texto corrido
—*«Wait, let me reconsider…»*— y el parser lo deposita en `unmatched` junto con la palabra `NINGUNA`.
El veredicto salió correcto, así que **no rompe nada hoy**; lo que hace es meter ruido en el campo que
el arbitraje de mañana va a leer. [medido sobre **1** fila leída — no es una tasa, es una observación;
medirlo sobre las 23 es trabajo de la sesión de arbitraje]

### 🔴 Divergencia declarada — Professor no coincide con el brief

El brief afirma que los learnings *«quedaron capturados **antes** de escribir este brief, aprobados por
Sam»* y enumera **doce**. La base dice otra cosa: `public.professor_learnings` con
`session_date = '2026-08-30'` tiene **6 filas**, las seis con `filter_passed = true` y **las seis con
`approved_by_sam = false`**; la última se escribió a las **21:33:12 UTC**, después del corte del brief.
[medido]

**No se corrige el dato: se declara.** Aprobar un learning es de Sam (`HRD-R19`), y escribir en la base
para que cuadre con un brief es exactamente lo contrario de medir. Los seis restantes de la lista de
doce **están en el cuerpo de este `Actualiza`** —es donde importan— pero **no están en Professor**.

### El learning que sí está en la base y no está en el brief — el corte de AIFE

La primera fila del día (10:52:51 UTC) registra **tres defectos de AIFE medidos por CC**, ninguno
tocado, y ninguno parte de FIX-LANG-01:

1. **AIFE cablea dos marcas en capa compartida.** `voice === "lucien" ? … : …` decide la nota de voz:
   LucienSael recibe la suya y **las otras 14 marcas reciben la de UnrealvilleStudio**, ForumPHs y
   NeuroneSCF incluidas. Es el patrón que `MULTIBRAND_RULE` prohíbe de forma explícita. El eje es
   *«cada voz declara su nota»*; la nota es instancia y va en dato.
2. **La rama de Lucien dice literalmente `First person. English.`** sobre una marca cuya fila decía
   entonces `es`. Con la fila ya corregida a `en`, **el defecto se resuelve como fila equivocada, no
   como código equivocado** — pero el condicional por nombre de marca sigue ahí.
3. **Un tercio de las piezas de ForumPHs vuelve byte-idéntica de AIFE.** Medido sobre 354 piezas:
   ForumPHs **93 de 283 (33 %)** sin cambio alguno; LucienSael 0 de 30, NeuroneSCF 0 de 9,
   UnrealvilleStudio 0 de 28. **La asimetría es por marca, no por idioma.** Candidato `deducido`:
   `applyAIFE` termina en `data.content?.[0]?.text ?? text`, así que un contenido vacío devuelve el
   input intacto y reporta `aife_applied: true` — **un no-op que se declara éxito**.

Y una **hipótesis descartada**, que vale registrar: CC había supuesto que la lista de purga en inglés
rendía menos sobre piezas en español. **Es falsa** — las palabras de la purga aparecen 0,00 veces por
pieza tanto en ES como en EN sobre 354 piezas.

### Versiones de Edge Function, medidas por el sufijo de `entrypoint_path`

`iid-core` **57** (2026-08-30 14:56:10 UTC) · `content-watcher` **45** (14:56:22 UTC) ·
`content-run-stage` **101** (12:19:37 UTC) · `aife-filter` **43** (12:19:40 UTC). Las cuatro coinciden
con lo declarado en el brief. [medido — `list_edge_functions`, sufijo de `entrypoint_path`, no el
comentario de cabecera (`HRD-R09`, `HRD-R14`)]

⚠️ **Divergencia anotada y no tocada:** `content-dispatcher` devuelve `version: 50` mientras su
`entrypoint_path` termina en **47**, que es lo que declara `ecosystem.json`. Por el método de
`HRD-R14` manda el sufijo, así que el context file **no se cambia**; queda escrito para que la próxima
sesión decida cuál de los dos campos está mintiendo.

### Lo cancelado, y por qué el expediente pesa más que la propuesta

- **FIX-DUP-03 y el PR #110 quedan CANCELADOS.** La premisa se refutó: el chequeo aguas arriba **ya
  existía** —DIV-01 devolvía `null` y no encolaba— y **FANOUT-01 lo revirtió a propósito**, documentado
  en el commit `e865333` con un diferencial controlado: no encolar dejaba marcas sin producir. **El
  ecosistema ya eligió** entre producir con ángulo repetido y no producir. [reportado por el brief; el
  commit no se leyó en esta pasada]
- **FIX-PATTERN-04 queda CANCELADO.** No era un defecto del sistema sino de lectura: `->>` sobre un
  array JSONB devuelve el array serializado, no el elemento. El texto juzgado vive en
  `assets->'social'->'adapted'->0->>'copy'`. **Los cinco `verify_pattern` están sanos**, y re-medido
  por la ruta correcta los números salen idénticos. [reportado]

---

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
