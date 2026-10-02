---
name: banco-de-reglas
version: 1.0
fecha: 2026-10-02
capa: MÉTODO
destino: CARGABLE
audiencia: UNRLVL infra — transversal a todas las marcas y a todo cambio del juez de texto
disparador: "Antes de cambiar el statement, la condition o el applies_when de una regla de intel.watcher_rules, o las instrucciones del juez (content-watcher)."
descripcion: >
  Cómo se prueba un cambio de regla o del juez ANTES de que llegue a producción: enunciados
  candidatos por lote, juez candidato desplegado aparte, la acción judge_replay de content-run-stage
  sobre piezas reales sin escribir en ellas, tres pasadas por pieza porque el juez no repite su propio
  juicio, lectura por MAYORÍA con efecto lateral incluido, prueba de confirmación con los candidatos
  solos, promoción por migración con el «sí» de Sam por regla, y medición de nuevo después de
  desplegar. Nace del 2026-10-02. CERO ESTADO: lleva las consultas, no las cifras vigentes.
---

# SKILL — BANCO DE REGLAS

> **ESTE DOCUMENTO ES MÉTODO. NO CONTIENE ESTADO.** Los lotes, códigos de regla y PR que aparecen
> son el ORIGEN del método, no trabajo pendiente. Qué lotes hay abiertos, qué candidatos existen y qué
> juez candidato está desplegado se mide al abrir, con las consultas de §1 y §2.

> **ESTE DOCUMENTO NO NOMBRA UNA MARCA COMO SI FUERA EL SISTEMA.** El banco es del eje: prueba
> cualquier regla de `intel.watcher_rules` y cualquier versión del juez, para cualquier marca. Los
> códigos `HR-NSCF-*` o `HR-FPHS-*` de §3 aparecen como evidencia histórica de dónde se aprendió cada
> paso; la muestra de cada prueba se elige por las marcas que la regla afecta, no por una lista fija
> (`protocols/MULTIBRAND_RULE.md`).

---

## §0 — QUÉ ES, CUÁNDO SE CARGA Y QUÉ REGLA LO SOSTIENE

**Se carga ANTES de cambiar:**
- el `statement`, la `condition` o el `applies_when` de una regla de `intel.watcher_rules`;
- las instrucciones del juez de texto (`content-watcher`), en su prompt o en lo que recibe.

**La regla (Sam, 2026-10-02: «sí, haz 1, 2, 3 y 4»):**

> **Ningún cambio de enunciado ni del juez llega a producción sin pasar por el banco.**

**Por qué hace falta, en una línea:** el juez es un modelo, no una función. Un enunciado nuevo no
cambia sólo la regla que se reescribe: cambia **a qué regla atribuye el juez** un defecto que ya veía, y
el mismo texto juzgado dos veces no recibe los mismos avisos (§2, paso 3). Leer el enunciado nuevo y
encontrarlo «más claro» no dice nada de cómo lo va a aplicar el juez. Eso sólo lo dice el banco.

| Skill | Qué pone | Cuándo |
|---|---|---|
| **este** | el método para probar un cambio de regla o del juez antes de producción | siempre que se vaya a tocar un enunciado o el juez |
| `sesion-de-fixables` | el motivo que suele originar el cambio: un aviso falso o un defecto que el juez no ve | cuando la propuesta nace de piezas devueltas |
| `reparacion-de-carril` | el diagnóstico cuando lo que falla es la máquina, no el enunciado | si el juez cae, da timeout o no llega a juzgar |
| `publicacion-operativa` | qué pasa con la pieza en el carril | nunca desde el banco: el banco no mueve piezas |

**Carga obligatoria al abrir:** `protocols/CC_PROTOCOL.md` (§18 es el puntero a este skill),
`protocols/MULTIBRAND_RULE.md`, `protocols/DELIVERY_AND_VERIFICATION_RULE.md` (desde el repo; Vercel
sólo con `Vercel:web_fetch_vercel_url`) y este skill.

---

## §1 — LAS PIEZAS DEL BANCO

Todas viven en `unrlvl-iid-functions` y en el proyecto de Supabase del carril [`medido` el 2026-10-02:
migraciones `20261002200000`, `20261002235000`, `20261002235100` y `20261002235200`, y
`scripts/juez_candidato.sh`].

### 1.1 · `intel.watcher_rules_candidates` — los enunciados candidatos

Columnas: `batch`, `code`, `statement`, `kind`, `condition`, `applies_when`, `rationale`.
- Un candidato pertenece a un **lote** (`batch`) y reemplaza, sólo dentro de ese lote, a la regla de
  producción con el mismo `code`.
- **La producción no lee esta tabla.** Escribir aquí no cambia ningún juicio del carril.
- `rationale` dice por qué se propone el cambio: qué aviso falso quita o qué defecto debería ver.

### 1.2 · `intel.rule_replay_judges` — el juez candidato de un lote

Columnas: `batch`, `watcher_function`, `git_ref`, `notes`.
- Un lote **puede** declarar un juez candidato `content-watcher-<sufijo>`. Sin fila, el lote se juzga
  con el juez de producción en las dos variantes.
- **Lo despliega Sam**, no CC:
  `scripts/juez_candidato.sh <rama-o-commit> [sufijo]` (`unrlvl-iid-functions#322`). Copia
  `content-watcher/index.ts` de ese commit como OTRA Edge Function, con `--no-verify-jwt`. La producción
  nunca la llama.
- Después CC declara el lote: `watcher_function = 'content-watcher-<sufijo>'`, `git_ref` = el commit
  que imprimió el script.

### 1.3 · La acción `judge_replay` de `content-run-stage`

Body: `{action: 'judge_replay', batch, piece_id}`.
- Juzga **UNA pieza real dos veces**:
  - **vigente**: reglas y juez de producción;
  - **candidata**: los candidatos del lote superpuestos a producción y, si el lote lo declara, el juez
    candidato.
- **No escribe** en la pieza, ni en `intel.watcher_log`, ni en `intel.judge_calibration`.
- Se dispara así:

```sql
select intel.trigger_iid_agent(
  'content-run-stage',
  jsonb_build_object('action','judge_replay','batch','<lote>','piece_id','<piece_id>'::uuid)
);
-- devuelve el id de la petición; la respuesta se lee en net._http_response por ese id
select id, status_code, content from net._http_response where id = <id>;
```

### 1.4 · `intel.rule_replay_results` — lo que dijo cada juicio

Columnas que se leen: `variant`, `result`, `failed_gate`, `warned`, `violated`, `evaluated`,
`technical`, `cost_usd`, `explanations` (más `batch` y `piece_id`).
- `technical = true` es un juicio que no llegó a darse (timeout, error del juez). **No cuenta**: la
  vista de §1.5 lo excluye, y la pieza se repite (§2, paso 4).
- **`explanations`** es la cita literal del fragmento que motivó cada aviso. Sale de una **SEGUNDA
  llamada, posterior** al juicio (`unrlvl-iid-functions#320`). **No es la razón del juez**: el juez
  devuelve sólo códigos, a propósito, y pedirle explicación dentro del juicio cambiaría el juicio. La
  cita sirve para que una persona compruebe el aviso contra el texto, no para auditar el razonamiento.

### 1.5 · La vista `intel.v_rule_replay_mayoria` — la lectura que decide

Por lote y regla, decide por **MAYORÍA de las corridas** de cada variante (`unrlvl-iid-functions#320`).
- Incluye **las reglas SIN candidato que cambian** de una variante a otra: es el **efecto lateral**, y
  es lo primero que se mira.
- Columnas: `batch`, `code`, `es_candidata`, `piezas_evaluadas`, `corridas_minimas`, `avisos_vigente`,
  `corridas_vigente`, `avisos_candidata`, `corridas_candidata`, `avisa_vigente`, `avisa_candidata`,
  `deja_de_avisar`, `empieza_a_avisar`, `piezas_que_cambian`.
- **`intel.v_rule_replay_diff` quedó REEMPLAZADA**: sólo mira la última corrida, y con un juez que no
  repite su juicio la última corrida es una moneda.

### 1.6 · El costo

- Cada juicio se asienta en `public.ops_generation_ledger` como `rule_replay_verdict`, y cada cita como
  `rule_replay_explanation`, con `billable = 'estructura'`: **no se carga a la marca**
  (`unrlvl-iid-functions#320`, migración `20261002235100`).
- **Medido el 2026-10-02:** 350 juicios = **US$21.20** (Claude Sonnet 5: 10.124.603 tokens de entrada a
  US$2/M y 95.113 de salida a US$10/M), unos **US$0.06 por juicio**. La cifra vigente se mide en el
  ledger; ésta es la de origen.

---

## §2 — EL PROCEDIMIENTO

1. **Muestra.** Piezas reales de **las marcas que la regla o el juez afectan**, no de una marca por
   costumbre. Referencia del 2026-10-02: 30 piezas fueron suficientes para 4 marcas, es decir **8–10 por
   marca** [`medido`].
2. **Un lote nuevo por cada estado de código.** Nunca se reusa un lote después de un despliegue (de
   `content-run-stage`, del juez o de una regla): el lote mezclaría dos estados y la mayoría de §1.5
   sumaría juicios que no son comparables.
3. **Tres pasadas por pieza.** El juez no repite su propio juicio: entre dos corridas iguales varió el
   **74 %** de los avisos de reglas que no tenían candidato [`medido` el 2026-10-02 en el banco]. Con una
   pasada, el banco mide el ruido del juez y lo llama efecto del cambio.
4. **Tandas de 5–6 piezas** con unos **2,5 minutos** entre tandas. Con 5 concurrentes hubo timeouts del
   juez; con 6 se midió estable [`medido` el 2026-10-02]. Las que salgan `technical` se repiten hasta que
   cada pieza tenga sus tres juicios válidos por variante (`corridas_minimas` de §1.5).
5. **Leer la mayoría y las citas.**
   ```sql
   select * from intel.v_rule_replay_mayoria where batch = '<lote>'
   order by es_candidata desc, (deja_de_avisar + empieza_a_avisar) desc;
   ```
   Para cada pieza de `piezas_que_cambian`, se leen las `explanations` de las dos variantes **y el texto
   de la pieza**, y se decide con el texto delante si el cambio acierta. Un aviso que aparece no es una
   mejora porque aparezca: es una mejora si el fragmento citado incumple de verdad la regla.
6. **Prueba de confirmación con los candidatos SOLOS**, en un lote aparte: sólo los candidatos que
   parecieron mejorar en el paso 5, sin el resto. Motivo [`medido` el 2026-10-02]: un enunciado nuevo
   cambia **a qué regla atribuye el juez** un defecto, no cuántos ve (1.39 frente a 1.42 avisos por
   juicio); con 18 enunciados cambiados juntos se movieron reglas que no tenían candidato, y no se podía
   saber cuál de los 18 las movía.
7. **Se promueve SÓLO lo que mejora en las dos pruebas y sin efecto lateral.**
   - La promoción es una **migración en `unrlvl-iid-functions`** que copia a `intel.watcher_rules` el
     `statement` del candidato y guarda el anterior en `notes` con el prefijo
     «Enunciado anterior (hasta AAAA-MM-DD):».
   - **Requiere el «sí» explícito de Sam, regla por regla.** El clasificador de permisos de CC bloquea
     un cambio de producción sin esa aprobación [`medido` el 2026-10-02], y no se rodea.
8. **Un cambio del juez** sigue el mismo camino con un paso más:
   rama con el cambio → **Sam** corre `scripts/juez_candidato.sh` → lote nuevo con su fila en
   `intel.rule_replay_judges` → las mismas tres pasadas → **sólo si mejora** se mergea a
   `content-watcher`.
9. **Después de desplegar, se mide otra vez**, en un lote nuevo (paso 2), contra lo que el banco había
   predicho. El 2026-10-02 esto detectó en menos de una hora que #314 era peor, y se revirtió en #315
   [`medido`].

**Lo que CC deja para Sam** en cada vuelta (por la vía de `protocols/CC_PROTOCOL.md` §17): el «sí» por
regla del paso 7, el despliegue del juez candidato del paso 8 y el merge del cambio del juez.

---

## §3 — LOS CASOS QUE FUNDAN EL MÉTODO (evidencia del 2026-10-02)

| Caso | Qué pasó | Qué paso del método funda |
|---|---|---|
| **18 candidatos en un lote** | 4 parecían mejorar [`medido`] | paso 6: el lote completo no basta |
| **HR-NSCF-06** | se confirmó solo: de 1 a 11 y de 1 a 8 avisos en 30 juicios [`medido`]; pasó a producción con la migración `20261002234000` (`unrlvl-iid-functions#313`) | paso 7: lo que mejora en las dos pruebas se promueve |
| **HR-NSCF-05** | en la confirmación invirtió la dirección [`medido`] | paso 6: una mejora en el lote completo puede ser efecto de otro candidato |
| **HR-FPHS-12** | no dio un resultado limpio [`medido`] | paso 7: sin mejora clara no se promueve |
| **HR-FPHS-05** | quitó un aviso falso, pero el juez trasladó el aviso a HR-LEGAL-01 (falso) y, en la confirmación, a HR-LEGAL-02 (dudoso) [`medido` el traslado; `deducido` el juicio sobre cada aviso, leyendo el texto] | §1.5 y paso 7: el efecto lateral se mira antes que la mejora |
| **#314** (ficha de lo nombrado, para HR-NSCF-08) | 1 mejora y 2 regresiones; se revirtió en #315 [`medido`] | pasos 8 y 9: un cambio del juez se prueba antes y se mide después |

**Costo total del día:** US$21.20 en juicios del banco, más US$1.36 del modo prueba del carril
[`medido` en `public.ops_generation_ledger`].

**Lectura de los casos:** de 18 enunciados que parecían mejores al leerlos, **uno** sobrevivió a las dos
pruebas. Sin el banco, los 18 habrían llegado a producción con la misma confianza.

---

## §4 — LO QUE EL BANCO NO HACE

- **No juzga imagen.** Prueba el juez de texto y sus reglas; la inspección visual va por otra vía.
- **No reemplaza la lectura humana** de los casos que cambian (§2, paso 5). La mayoría dice dónde
  mirar; la decisión se toma con el texto delante.
- **No prueba la `instruction` del escritor.** Eso es generación, no juicio: cambia qué se escribe, no
  cómo se juzga lo escrito.
- **No mueve piezas ni escribe en su historial.** Si una prueba necesitara escribir en una pieza, ya no
  es el banco.

---

## §5 — AUTOVERIFICACIÓN DE CIERRE

Antes de proponer una promoción o un merge del juez, CC responde por escrito:

1. ¿Cada candidato que se promueve mejoró **en el lote completo y en la confirmación sola**?
2. ¿Alguna regla **sin candidato** cambió en `v_rule_replay_mayoria`? Si cambió, ¿se leyó el texto?
3. ¿Cada pieza tiene **tres juicios válidos** por variante (`corridas_minimas >= 3`)?
4. ¿El lote se abrió **después** del último despliegue que afecta al juicio?
5. ¿Está el **«sí» de Sam por cada regla** que se promueve, y está anotada la medición posterior al
   despliegue (paso 9)?
