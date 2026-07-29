# WATCHER_SPEC — Especificación del Watcher
_v2.0 · 2026-07-29 · reemplaza v1.0 (2026-06-16)_

> **Cambio estructural respecto de v1.0:** la decisión C1 ("el Watcher corre dentro de
> `content-run-stage`, NO se crea EF separada en el piloto") fue **revertida**. El Watcher
> es EF propia desde junio y v1.0 nunca se actualizó. Esa desactualización casi provocó
> que se editara el archivo equivocado en la sesión del 29-jul. Fuente de verdad: el
> deploy, no este documento.

---

## 0. UBICACIÓN REAL

**`content-watcher`** — Edge Function propia, build **_18**.
Invocada por `content-run-stage` (_57) tras sociallab, antes del INSERT en `content_pieces`.

**Contrato de pureza — inviolable:** `content-watcher` NO toca la DB. Recibe `ctx` completo
y devuelve veredicto. Todo dato que necesite se le inyecta desde `content-run-stage`.
Cualquier lectura de base dentro del Watcher rompe el contrato.

Salidas: **PASS** · **REJECT** · **RESCHEDULE**.

---

## 1. FUENTE DE REGLAS

**`intel.watcher_rules`** — 54 reglas enumeradas con código citable.
**NO es `brand_topics.hard_rules`.** Esa columna sigue existiendo y sigue alimentando al
Builder como prescripción, pero el Watcher ya no la juzga: era una bolsa mixta con
prohibiciones, requisitos, parámetros de voz, listas de datos y una ruta de archivo.

### Esquema
| columna | rol |
|---|---|
| `code` | identificador citable — `HR-FPHS-02`, `IMG-GEN-01` |
| `subject` | **la materia**. Eje de agregación del corpus y de la precedencia |
| `scope` | GENERATED: `brand` si hay `brand_id`, `sector` si hay `sector`, si no `gen` |
| `kind` | `prohibition` \| `requirement` \| `proof` |
| `plane` | `text` \| `image` |
| `severity` | `blocking` \| `warn` |
| `statement` | enunciado juzgable. Admite `{{clave}}` |

### Precedencia
Candidatas = `gen` + las del sector de la marca + las propias.
Se agrupan por `(subject, plane)` y **gana la más específica**: `brand` > `sector` > `gen`.
Reglas con `subject` NULL no se agrupan: pasan todas.
Empate dentro del mismo subject → desempate por `code` asc **y se registra como anomalía**
en `gate_detail.precedence_anomalies`. Nunca en silencio.

El sector de cada marca vive en **`intel.brand_sector`**. Sectores: `RETAIL`, `LEGAL`,
`PERSONA`. Una marca sin fila recibe solo `gen` + las suyas — UnrealvilleStudio es la casa
y no lleva sector a propósito.

### Parámetros
`{{clave}}` se sustituye desde `brand_topics.hard_rules` **antes** de armar `ctx.rules`.
Placeholder sin resolver → **la regla NO se envía** y se registra en
`gate_detail.skipped_unresolved`. Jamás llega un enunciado crudo al juez: inventaría el criterio.

### Dos criterios de admisión de una regla
1. **Atómica.** Un código que empaqueta cuatro reglas no diagnostica nada: al disparar no
   se sabe cuál falló. `HR-FPHS-11` se partió en cuatro por esto.
2. **Juzgable sobre la pieza.** Una regla de ruteo, una propiedad del proceso o un enunciado
   paramétrico sin su valor **no son rigor: son ruido con formato de regla**. Se apagan o
   se acotan a su parte juzgable.

---

## 2. PERSISTENCIA

**`intel.watcher_log`** — `result`, `failed_gate`, `gate_detail` (jsonb).
`gate_detail` guarda por gate: `violated` (solo códigos conocidos), `unmatched`
(lo que el juez devolvió y no matchea ningún código), `warned`, `evaluated`, `raw`.

**Validación de salida:** `violated = devueltos ∩ códigos conocidos`. Todo lo demás va a
`unmatched`. Esto existe porque la v1 partía la prosa del modelo por comas y guardaba
`"**Justificación breve:**"` como si fuera una regla violada.

**`content_pieces.assets.watcher`** — `{result, failed_gate, failed_rules, rules_evaluated}`.
Es lo que lee el badge de la bandeja.

**`intel.approval_calibration`** — el corpus. Lleva `watcher_result`, `watcher_gate`,
`watcher_rules`, `watcher_rules_evaluated` desnormalizados. **No se resuelve por JOIN contra
`content_pieces`**: esa tabla se limpia periódicamente y el corpus debe sobrevivir a eso.

---

## 3. LOS 8 GATES

Orden canónico. **No se reordena** — el corpus debe ser comparable entre tandas.

| # | gate | qué juzga |
|---|---|---|
| 1 | `similarity` | similitud semántica contra piezas recientes. >0.80 → REJECT |
| 2 | `sibling_window` | ventana 48–72 h entre hermanas → RESCHEDULE |
| 3 | `cadence` | informativo en piloto |
| 4 | `evidence` | reglas `kind='proof'`. **Sin regla declarada → PASS informativo**, registrado, nunca silencioso |
| 5 | `duplication` | duplicado real vs. variante legítima de plataforma |
| 6 | `hard_rules` | reglas `prohibition` + `requirement` |
| 7 | `objective_stimulus` | coherencia objetivo↔estímulo (C.3), incluye `audience_frame` |
| 8 | `visual_sibling` | similitud visual entre hermanas |

### gate4 — evidence
**Ya no está cableado por marca.** La versión anterior tenía `if (brand === "UnrealvilleStudio")`
/ `if (brand === "LucienSael")` y `return pass:true` para el resto: no juzgaba peor a las demás
marcas, **no las juzgaba**. Rechazaba 4 de 10 piezas de las dos cableadas y 0 de 7 del resto.
Es el patrón `SUPPORTED = {lista cerrada}` del issue #93, replicado dentro del Watcher.

### gate6 — hard_rules
**Distingue el sentido de la regla**: una `prohibition` falla si el elemento **está**; un
`requirement` falla si **falta**. La v1 no distinguía y rechazó tres piezas por "no hay CTA"
cuando el CTA solo estaba *permitido*.

Formato de salida exigido: un código por línea, sin prosa, o `NINGUNA`.

### `watcher_full_scan`
Flag global en `intel.iid_scheduler_config`. Override por job vía
`builder_input.watcher_full_scan`, que gana si está presente. Sin fila → `false`.
Lectura fallida → **THROW**, jamás degradar a `false`.

En `true`: corren los 8 gates **sin corto-circuito**; `failed_gate` reporta el primer
bloqueante del orden canónico. Existe porque con corto-circuito `gate6` se ejecutó 1 de 7
veces, y el corpus no podría distinguir **"regla muerta"** de **"regla que nunca se ejecutó"**.

**Instrumento de calibración, no modo de producción.** Multiplica el costo por pieza.
Apagar al cerrar la recogida.

---

## 4. PLANO IMAGEN — HUECO ABIERTO

12 reglas `IMG-*` sembradas y **ningún gate las lee**. `gate8` compara prompts entre hermanas;
nadie valida el contenido de la imagen contra sus reglas.

Consecuencia observada: una pieza de NeuroneSCF con texto corrupto generado
—español inventado— **pasó el Watcher** y quedó programada para Instagram.

Diferido a propósito: si ImageLab deja de escribir texto en la imagen, `IMG-GEN-01` y
`IMG-GEN-02` se quedan sin sujeto y el gate se reduce a coherencia imagen↔copy y persona real
sin blueprint. **Decidir la raíz antes de construir el gate.**

---

## 5. FAIL-LOUD — REGLA DURA

- Fallo al leer reglas → `THROW RULES_FETCH_FAILED`. Sin `?? []`.
- Fallo al leer sector → `THROW BRAND_SECTOR_FETCH_FAILED`. **Ausencia de fila ≠ query rota.**
- `ctx` sin `rules` → `THROW RULES_MISSING`, fail-closed REJECT.

Un gate sin reglas aprueba todo en silencio. Ese es el modo de fallo que estas tres
excepciones existen para impedir.

---

## 6. ORDEN DE DEPLOY — CANDADO

**`content-run-stage` primero, `content-watcher` después.** Siempre.

Al revés, la ventana entre deploys rechaza el 100% del tráfico: el watcher nuevo exige
`ctx.rules` y el run-stage viejo no las manda. En el orden correcto es inocuo — el watcher
viejo ignora el campo extra.

Ambos con `--no-verify-jwt`: sin el flag la CLI los deja en `verify_jwt: true` y el
dispatcher empieza a comer 401, un fallo que no parece de deploy.

**Verificación:** el número real es el del final de `entrypoint_path`, no el contador
`version`. Y un `ezbr_sha256` que no cambia significa *"este deploy no cambió nada"*,
nunca *"el cambio no entró"*.

---

## 7. LO QUE EL WATCHER NO HACE

No aprende. Registra veredictos; no se recalibra solo. El corpus produce el tablero de salud
por regla —falso positivo donde Sam aprueba y el Watcher rechaza; regla faltante donde Sam
rechaza y el Watcher aprueba— y el ajuste de `watcher_rules` es manual. El aprobador
automático (Ayra) es posterior al corpus.
