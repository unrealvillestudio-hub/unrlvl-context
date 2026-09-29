---
name: sesion-de-fixables
version: 1.1
fecha: 2026-09-29
cambios_1_1: "2026-09-29 (tarde): cinco motivos nuevos en §3.1 y dos avisos de barrido (texto pintado en la imagen; texto que se publica). v1.0 íntegra: sólo se añade."
capa: MÉTODO
destino: CARGABLE
audiencia: UNRLVL infra — transversal a todas las marcas y todos los carriles de contenido
disparador: "Sam abre con «sesión de fixables». Sólo entonces se convoca."
descripcion: >
  Cómo se trabaja una sesión de fixables: leer lo que Sam devolvió desde la bandeja, separar
  cada motivo en texto, imagen o fuente, corregir primero la FUENTE si el motivo se va a repetir,
  lanzar las correcciones de a una con directriz por pieza, revisar cada imagen antes de devolverla
  a la bandeja, entregar a Sam los piece_id con su estado, y convertir cada calibración en regla
  (dato, cláusula, migración, Professor). Incluye las vías de comunicación, los crons temporales y
  el catálogo de motivos ya resueltos. Nace de la sesión del 2026-09-28/29. CERO ESTADO: lleva las
  consultas, no las cifras.
---

# SKILL — SESIÓN DE FIXABLES

> **ESTE DOCUMENTO ES MÉTODO. NO CONTIENE ESTADO.** Los identificadores de piezas que aparecen
> son el ORIGEN de cada regla, no trabajo pendiente. Lo pendiente se mide al abrir.

> **ESTE DOCUMENTO NO NOMBRA UNA MARCA COMO SI FUERA EL SISTEMA.** Patricia, NeuroneSCF o
> ForumPHs aparecen como el caso donde se aprendió algo; la regla que sale de cada caso es del eje
> y la instancia es dato de la marca (`protocols/MULTIBRAND_RULE.md`).

---

## §0 — QUÉ ES, CUÁNDO SE CONVOCA Y CON QUÉ OTROS SKILLS TRABAJA

**Se convoca SÓLO cuando Sam abre con «sesión de fixables».** No se carga por intuición a mitad de
otra tarea.

Una pieza **fixable** es una que Sam devolvió desde la bandeja con nota `fixable:` —la corrección es
mecánica y la pieza vuelve—. **Sin esa nota es descarte y no se toca** (`publicacion-operativa`
§C.7).

| Skill | Qué pone | Cuándo |
|---|---|---|
| **este** | el método de la sesión de principio a fin | siempre, al abrir |
| `reparacion-de-carril` | el diagnóstico cuando la causa está en el carril (un lab falló, un cron no corrió, una regla no llegó) — §2-TER (las dos puertas), §4 (clases de defecto) | cuando un motivo no es de contenido sino de máquina |
| `publicacion-operativa` | qué hace cada clic de la bandeja (§C.7) y el volumen (§C.8) | antes de mover estados o franjas |
| `content-pipeline`, `voice-craft` | cómo se escribe | cuando el motivo es de voz |

**Carga obligatoria al abrir:** `protocols/CC_PROTOCOL.md`, `protocols/MULTIBRAND_RULE.md`,
`protocols/DELIVERY_AND_VERIFICATION_RULE.md` (desde el repo; Vercel sólo con
`Vercel:web_fetch_vercel_url`), este skill, y de cada marca afectada `brand.json`,
`BP_Brand_Context.md` y la entrada más reciente de su `session_log.md`.

---

## §1 — LAS VÍAS: POR DÓNDE LLEGA Y POR DÓNDE SE RESPONDE

| Vía | Qué trae | Quién escribe | Cómo se lee |
|---|---|---|---|
| **Bandeja de aprobación** (UI de aprobación) | el veredicto de Sam por pieza y su nota `fixable:` | Sam | `content.content_pieces.status='challenged'` + `challenged_reason` (§2) |
| **`content-approval@`** (correo) | el aviso de que una pieza entró a `awaiting_approval` | el carril | es notificación, no fuente: el estado se lee en la base |
| **Telegram** (canal de alertas) | una **regla** que se disparó | `alerting` | `reparacion-de-carril` §2-TER — **Telegram es para alertas; los informes son los ya establecidos** (Sam, 2026-09-23) |
| **Chat con Sam** | motivos que no caben en la nota, imágenes, decisiones | Sam | se transcribe al motivo de la pieza sólo si Sam lo pide |

**Nunca se le pide a Sam que recuerde qué hace un clic: se le dice** (`publicacion-operativa` §C.7).

---

## §2 — LEER LO QUE SAM DEVOLVIÓ

```sql
select id, brand_id, platform, status, challenged_at, challenged_reason,
       assets->'copy'->>'title'                   as titulo,
       assets->'copy'->>'image_hook'              as texto_de_imagen,
       assets->'image'->>'url'                    as imagen,
       assets->'image'->'overlay'->>'text_source' as fuente_del_texto_de_imagen,
       assets->'image'->'product_in_scene'        as producto,
       assets->'image'->>'persona_used'           as persona
from content.content_pieces
where status = 'challenged' and challenged_reason ilike 'fixable%' and discarded_at is null
order by challenged_at desc nulls last;
```

**Se lee TODO el motivo antes de actuar**, y también los de las piezas hermanas: si tres piezas
traen el mismo motivo, el defecto no está en las piezas (§4).

**Las piezas que Sam aprobó con una duda** («aprobada, pero verifica X») no están en `challenged`:
se leen en el chat y se verifican sin cambiarles el estado. Si la verificación da la razón al texto
actual, **se queda como está** y se le dice con la fuente.

---

## §3 — SEPARAR CADA MOTIVO: TEXTO, IMAGEN O FUENTE

**Una pasada de imagen no resuelve un motivo de texto** (Professor `8e24f4b7`). Cada motivo se
clasifica, y la tabla dice dónde se corrige. Es el **catálogo de motivos ya resueltos**; un motivo
nuevo se añade aquí al cerrar la sesión (§9).

### 3.1 · Texto

| Motivo de Sam | Dónde vive la corrección | Origen |
|---|---|---|
| El texto sobre la imagen repite el título | `brand_publish_channels.image_title_mode='dialogue'` + `copy.image_hook` que **responde** al título; recompose **sin** regenerar imagen | HR de Sam, 2026-09-29 |
| El producto se nombra sin su mecanismo | genoma de la voz: `argumentative_architecture.product_mechanism_chain` | 82347653, 6a1d466a, 844f834a |
| La pieza promete una explicación y no la da | genoma: `promise_fulfilment` | 398c80b5 |
| Hashtags inventados o de un competidor | genoma: `application_constraints.hashtags` | 6ddf17fe, 685d5275 |
| El título nombra a un competidor | reescribir el título; **nunca** nombres de competidores ni en hashtags | 2293bf19 |
| Voseo | la fuente de la generación, no sólo la pieza | #261 |
| Términos de marca mal escritos | ficha de marca + corrección en piezas no publicadas | «Nanotribología», #115 |
| Precio, oferta o promesa comercial que la marca no hace | ficha de marca (`cta_options`); **leer el dato antes de cambiarlo** | «diagnóstico gratuito», 2026-09-27 |
| El título simplifica un dato del estudio contra lo que dice el cuerpo | reescribir el título con el dato del cuerpo | 6bb3ebc0, 48175596 |
| Un competidor nombrado como FUENTE de un dato («según Dall Italia», «K18 documenta…») | `HR-GEN-12` ampliada: un competidor no se nombra nunca, tampoco como fuente; el dato se atribuye a la categoría. Salones y personas sí. Lista de competidores: `brands.competitors` | Sam, 2026-09-29; 13 piezas; `unrlvl-iid-functions` #271 |
| Hashtag de marca inventado o mal escrito (#NeuronesCFlorida, #NeuroneCF) | el set fijo de la marca en su genoma (`application_constraints.hashtags`) + regla de marca con patrón (`HR-NSCF-09`). El patrón compila con la bandera `i`: una variante que sólo cambia mayúsculas la ve el juez, no el patrón | Sam, 2026-09-29; 15 variantes |
| Un dato de otro país sin conectarlo con el mercado de la marca | `HR-GEN-18` con `{{mercado_de_la_marca}}` ← `application_constraints.home_market` del genoma; una marca sin mercado declarado no recibe la regla | 69f34e2b, Sam 2026-09-29 |
| Una línea «Distribución exclusiva…» que funciona como segunda firma | `signature_closer.rule` del genoma + `HR-GEN-11`; se quita la línea, la firma es una | 48175596, 17763bd1 |
| Voseo que el léxico no conoce | se EXTIENDE `HR-GEN-05` (nunca se rehace) tras un barrido morfológico por terminación y por enclítico | 2026-09-29: +9 formas |

**El texto pintado en la imagen también es texto** (2026-09-29). Vive en `image.overlay.headline`,
`image.overlay.subheadline` y `copy.image_support`. Un barrido que corrige `copy` y no recompone deja
el defecto en la imagen publicada (medido: 1abf8376, 812adaae, 5047ae26). **Después de corregir texto,
se barren esos tres campos y se recompone con (a)** lo que no coincida con `copy`.

**El texto que se publica es `assets.social.adapted[].copy`**, no `assets.copy`. Un barrido cubre los
dos y además `copy.title`, `copy.image_hook` y `copy.aife_filtered`, y comprueba si ya existe fila en
`public.scheduled_posts` sin publicar: ahí vive otra copia del texto.

### 3.2 · Imagen

| Motivo de Sam | Dónde vive la corrección | Origen |
|---|---|---|
| La persona no se parece, sale pegada tal cual la foto o envejecida | `person_blueprints.reference_photos` = **recortes de CARA**, nunca fotos completas | #266 |
| El cabello, la sonrisa o el rostro no son los suyos | `imagelab_description` **escrita mirando sus fotos**: largo, raya, color, y lo que NUNCA puede ser | #267 |
| Seria o con la mirada perdida | catálogo de gestos (`expression_catalog`) con destino de la mirada | #265 |
| Siempre con la misma ropa | `wardrobe_catalog`; las fotos son identidad, no vestuario | #263 |
| Producto grande o pequeño | `product_blueprints.physical_size` | #265 |
| Producto sin etiqueta | la etiqueta **se pega**, no se pide (técnica a9ba1afa) | Professor `75331271` |
| Producto bajo el titular o en el lado del texto | cláusula del motor: lado contrario al ancla del texto | ImageLab #28, #29 |
| Sostener algo imposible (un kit entero en una mano) | directriz: un producto en la mano, el resto sobre una superficie | 861681cd |
| Franja blanca o negra, foto pegada en vertical | directriz «una sola fotografía que llena todo el cuadro de borde a borde» | 7c4c7240, 685d5275 |
| Mancha o artefacto en una imagen por lo demás buena | regenerar con directriz que nombra la zona limpia | bea0754e |

### 3.3 · ¿Máquina, no contenido?

Si el motivo es «sin imagen», «no se publicó», «llegó dos veces» o el ledger muestra un lab en
`failed`, **no es un fixable de contenido**: es `reparacion-de-carril`. Ejemplo medido: un 429 del
proveedor de imagen deja la pieza en `challenged` con el texto completo; se regenera sólo la imagen.

---

## §4 — SI EL MOTIVO SE VA A REPETIR, SE CORRIGE LA FUENTE PRIMERO

Una corrección que vale para la próxima pieza se vuelve **dato** (persona, producto, genoma, canal)
o **cláusula del motor** (ImageLab), y se fija en **migración** en `unrlvl-iid-functions`
(`supabase/migrations/` + `MIGRACIONES_CONGELADAS.md`). Corregir sólo la pieza deja el defecto vivo
para la siguiente.

- **Test de la marca N+1 antes de escribir**, respondido en el PR.
- **Código primero, DDL después** cuando se amplía un CHECK; **DDL primero** cuando el código nuevo
  lee una columna nueva (si no, el select falla alto).
- **Una hipótesis deducida se etiqueta como tal y se mide en la primera pieza.** Medido: cambiar
  los recortes por fotos completas «porque un recorte invita a pegarlo» (deducido) empeoró cinco
  piezas; se revirtió al día siguiente (#266).

---

## §5 — EJECUTAR LA CORRECCIÓN

### 5.1 · Las tres llamadas

```sql
-- (a) Sólo texto de imagen: se conserva la imagen limpia y se recompone encima
select intel.trigger_iid_agent('content-run-stage', jsonb_build_object(
  'action','recompose','piece_id', :piece_id, 'regenerate_image', false,
  'edit_reason', :motivo, 'edited_by','cc:fixable'));

-- (b) Imagen nueva desde cero, con directriz para esta pieza
select intel.trigger_iid_agent('content-run-stage', jsonb_build_object(
  'action','recompose','piece_id', :piece_id, 'regenerate_image', true, 'mode','regenerate_full',
  'visual_directive', :directriz, 'edit_reason', :motivo, 'edited_by','cc:fixable'));

-- (c) La respuesta: net._http_response.id = el valor que devolvió la llamada
select status_code, left(content, 400) from net._http_response where id = :req;
```

- **(a) falla con `COMPOSITOR_IMAGE_FETCH_FAILED … 400`** cuando la imagen limpia ya no existe en
  `temp/` (piezas antiguas). Entonces se usa (b).
- **`edit_from_current` no es un retoque**: medido, reconstruyó la escena entera (a9ba1afa). Para
  un detalle (una etiqueta) se pega por código.
- **Texto:** se edita el campo en `assets` y cada cambio se registra en `intel.piece_edits`
  (`field`, `before_text`, `after_text`, `edit_reason`, `edited_by='cc:fixable'`).

### 5.2 · La directriz

Una por pieza, en el idioma de Sam, que nombre **lo que debe verse**, no sólo lo que falló: quién,
dónde, gesto y mirada, qué sostiene y a qué altura, de qué lado del texto, y «una sola fotografía
que llena el cuadro». Si hay persona con rasgos declarados (el cabello de Patricia), se repiten en la
directriz hasta que el dato solo baste.

### 5.3 · La cola temporal — de a una, con cron

El proveedor de imagen responde **429 en paralelo**. Las regeneraciones (b) van **de a una**; las
recomposiciones (a) no llaman al proveedor y aguantan lotes de 20–30.

```sql
create table if not exists intel.cc_fix_<fecha> (
  piece_id uuid primary key, orden int, directiva text, estado text default 'pendiente',
  req bigint, lanzado_at timestamptz, cerrado_at timestamptz, resultado text);
-- función paso(): cierra la lanzada (lee net._http_response; 10 min sin respuesta = error),
-- lanza la siguiente 'pendiente' por orden y devuelve qué hizo.
select cron.schedule('cc-fix-<fecha>', '*/2 * * * *', $$select intel.cc_fix_<fecha>_paso()$$);
```

- Se pausa con `cron.alter_job(<jobid>, active := false)` — **nunca** `UPDATE cron.job`.
- **El tope diario de imágenes es nuestro**, no del proveedor: `public.lab_configs`
  (`lab_key='imagelab'`) `default_params.image_calls_max`. Si se sube, se guarda `_previous` y la
  fecha de vuelta, y se agenda la vuelta.
- **Al cerrar la sesión se borra** (§8).

---

## §6 — REVISIÓN VISUAL: NADA VUELVE A LA BANDEJA SIN QUE CC LA HAYA MIRADO

1. Se descarga `assets.image.url` (la compuesta) y se mira, **comparando con el motivo de Sam
   punto por punto** y con las reglas de la marca (persona, producto, texto).
2. Varias a la vez: una rejilla de miniaturas, **pero cada una se juzga sola**.
3. Pasa → `awaiting_approval`:
   ```sql
   update content.content_pieces set status = 'awaiting_approval'
    where id = :piece_id and status = 'challenged';
   ```
4. No pasa → vuelve a la cola con la directriz corregida. **Dos fallos por la misma causa = se para
   la cola y se busca en la fuente** (§4).
5. Si la pieza tenía franja reservada y se regenera, se libera antes (`brand_publish_slots`) para
   que no se publique una imagen que nadie revisó. **Una pieza `scheduled` que cambia de imagen
   vuelve a `awaiting_approval`.**

---

## §7 — LA ENTREGA A SAM

Formato de `protocols/DELIVERY_AND_VERIFICATION_RULE.md`: bloque `🟩 MENSAJE PARA SAM` numerado,
acción en negrita, etiqueta `medido / reportado / deducido`.

- **Siempre los `piece_id`** (8 caracteres bastan en chat), agrupados por lo que Sam tiene que hacer:
  *en tu bandeja* · *siguen en fixable y por qué* · *aprobadas por ti* (reportado).
- **Lo que CC encontró y Sam no pidió** (un competidor en un título, un dato mal simplificado) va
  como hallazgo, no se corrige en silencio.
- **Las decisiones son de Sam**, marcadas como **decisión**.
- Si la sesión se alarga, un aviso breve de qué se está haciendo; nunca silencio largo.

---

## §8 — CIERRE: LIMPIEZA Y REGISTRO

1. **Crons temporales**: `cron.unschedule` de cada uno y `drop` de su tabla y su función, cuando Sam
   haya cerrado las piezas.
2. **Topes temporales**: la vuelta queda agendada en `AGENDA.md` con fecha.
3. **Migraciones** fijadas; **PR** abiertos con test de la marca N+1 y QA-PROP.
4. **Professor**: un learning por regla nueva, con el `piece_id` de origen; un learning refutado se
   marca `⛔` y se enlaza al que lo corrige, **no se borra**.
5. **`session_log`** de cada marca, y si Sam lo pide, `Actualiza`.

---

## §9 — APRENDER DE LA CALIBRACIÓN

La sesión de fixables es el lugar donde el sistema aprende de Sam. Al cerrar:

```sql
-- Motivos de la sesión, para ver cuáles se repiten (y por tanto piden fuente, no pieza)
select brand_id, platform, left(challenged_reason, 120) motivo, count(*)
from content.content_pieces
where challenged_reason ilike 'fixable%' and challenged_at > now() - interval '7 days'
group by 1,2,3 order by 4 desc;

-- Lo que CC corrigió, pieza por pieza
select piece_id, field, edit_reason, created_at
from intel.piece_edits where edited_by = 'cc:fixable' and created_at > now() - interval '2 days'
order by created_at;
```

- **Cada motivo nuevo entra al catálogo de §3** en la misma sesión, con su origen.
- **Si un componente (ImageLab, CopyLab, el juez) hizo mal su trabajo**, el hallazgo va al skill o
  al repo de ese componente, no sólo a la pieza: Sam lo dijo el 2026-09-29 — «aún no puedo confiar
  en que cada quien está haciendo su trabajo».

---

## §10 — LO QUE ESTE SKILL NUNCA HACE

- Nunca devuelve una pieza a la bandeja sin revisión visual.
- Nunca cambia el estado de una pieza que Sam aprobó, salvo que una verificación pedida lo exija y
  se le diga.
- Nunca inventa un dato, una cifra o una promesa en un texto de imagen: sale del cuerpo.
- Nunca nombra marcas competidoras, precios ni promesas que la ficha de la marca no declare.
- Nunca lanza regeneraciones en paralelo.
- Nunca pushea a `main` ni mergea.

---

## §11 — AUTOVERIFICACIÓN DE CIERRE

> ¿Cada motivo de Sam quedó resuelto punto por punto, o sólo la parte fácil? ¿Revisé cada imagen
> que devolví a la bandeja? ¿Los motivos que se repiten se corrigieron en la fuente, con migración y
> test? ¿Le di a Sam los `piece_id` agrupados por lo que tiene que hacer? ¿Borré los crons
> temporales o los dejé agendados? ¿Cada regla nueva está en Professor y en §3?
