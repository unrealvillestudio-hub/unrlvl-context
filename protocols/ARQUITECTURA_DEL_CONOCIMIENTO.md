# ARQUITECTURA DEL CONOCIMIENTO — UNRLVL Studio

_v1.0 · 2026-07-29 · Documento fundacional. Define **dónde vive** cada clase de conocimiento del ecosistema y **quién lo carga**. Todo protocolo posterior se construye contra la invariante de §1._

**Destino en el repo:** `protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md`

---

## 0. POR QUÉ EXISTE ESTE DOCUMENTO

El sistema de protocolos se construyó sobre la marcha. Cada pieza resolvió bien su problema
inmediato y ninguna se diseñó contra las otras. El resultado, medido el 29-jul-2026:

| Evidencia | Dato |
|---|---|
| `professor_learnings` | **661 filas** en 51 días |
| `converted_to_manual_id` | **0 de 661** |
| `professor_decision_cases` | **2**, ambos del día de la siembra (17-may) |
| `professor_weights` / `professor_sam_bypasses` | **0 filas** |
| Categorías distintas | **153** para 661 filas |
| Learnings sobre fallo silencioso | **65** — y el patrón se replicó **3 veces** (#97) |
| `AGENDA.md` | **~160 KB**, crecimiento monótono |
| Pasos de `HRD_ACTUALIZA` que invocan Professor | **0** |

**Diagnóstico:** el sistema tiene un *write path* excelente y **ningún *read path***. Professor se
diseñó para que Claude no redescubriera en cada sesión lo ya descubierto; nada lo carga nunca, así
que el conocimiento migró por su cuenta al único archivo que sí se lee —`AGENDA.md`— en forma de
prosa. De ahí los tres síntomas simultáneos: la AGENDA pesa 160 KB, Professor no enseña, y leerla
agota.

**El error nunca fue de captura. Fue de enrutamiento.**

---

## 1. LA INVARIANTE

> **El conocimiento solo existe si algo lo carga en el momento de usarlo.**
>
> Todo conocimiento se enruta a **exactamente uno** de tres destinos, **declarado en el momento de
> capturarlo**. Si no se puede nombrar el destino, no se captura.

### Los tres destinos

| Destino | Forma concreta | Quién lo consume | Cuándo |
|---|---|---|---|
| **EJECUTABLE** | aserción de linter · `CHECK` de tabla · gate del Watcher · `veto_rule` | la máquina | siempre, sin intervención |
| **CARGABLE** | `skills/[nombre]/SKILL.md` · `CLAUDE.md` de repo · manual con `markdown_path` | la sesión | **según la tarea** |
| **CONSULTABLE** | fila en DB, histórico | query puntual | cuando se pregunta |

### La prohibición

**Queda prohibido el cuarto destino: _"todo el mundo lo lee siempre"_.**

Ese es el estado actual de `AGENDA.md`, y es la causa raíz de la fatiga de lectura. Un documento
que todos deben leer completo en cada sesión no escala: crece de forma monótona y su tasa de
lectura real tiende a cero.

### Preferencia dura de destino

```
EJECUTABLE  >  CARGABLE  >  CONSULTABLE
```

Si un conocimiento **puede** ser una aserción, dejarlo como párrafo es una **degradación**, no una
alternativa. Ejemplo: "verificar contra el deploy, no contra el repo" fue un párrafo durante
semanas y se incumplió tres veces; como verificador `L0` es incumplible.

---

## 2. LAS CINCO CAPAS

Hoy `AGENDA.md` mezcla las cinco. Separarlas es el trabajo.

| Capa | Contiene | Se consulta | Estado hoy | Destino |
|---|---|---|---|---|
| **ESTADO** | qué es verdad **ahora**: deploys, filas, versiones | **query, nunca narración** | narrado en prosa → se arrastran deudas ya cerradas | consultable + derivado |
| **REGLAS** | qué nunca debe pasar | ejecutable | prosa en "Patrones gobernanza" (~15 KB) | ejecutable |
| **MÉTODO** | cómo se hace bien algo (el *How2*) | cargable **por tarea** | mezclado entre AGENDA y skills | cargable |
| **AGENDA** | qué está **abierto** y qué decisión falta | se lee al abrir sesión | 160 KB con las otras cuatro adentro | cargable, siempre |
| **HISTÓRICO** | todo lo cerrado | query | mezclado con lo abierto | consultable |

### Regla de tamaño

**`AGENDA.md` depurada debe pesar 10–15 KB.** Solo ítems abiertos y decisiones pendientes de Sam.
Cero lecciones, cero gotchas, cero historia, cero narración de estado.

**Esta regla es la que habilita la carga automática.** Hoy hay que invocar la carga porque cargar
todo es caro. Con 15 KB deja de serlo.

### Regla de estado

**El estado no se escribe: se consulta o se deriva.** Una afirmación de estado en un documento es,
por construcción, una foto que empieza a envejecer. Las tres deudas arrastradas del ecosistema
(#73, #87, Venezia `unit_code`) son el mismo bug: estado narrado en vez de consultado.

---

## 3. HOW2 — EL MÉTODO, RESUELTO DENTRO DE SKILLS

El objetivo original de Professor era la capa **MÉTODO**: que Claude no redescubra en cada sesión
la forma correcta de hacer algo.

**Decisión: How2 NO es un store nuevo. Son entradas atómicas dentro de `skills/`.**

**Razón:** crear un repositorio nuevo reproduce exactamente el fallo auditado — un segundo store
que nadie carga. `skills/INDEX.md` **ya es** el mecanismo de carga por tarea y **ya está invocado**
por `HRD_PROTOCOLO_ACTUALIZACION` paso 7. El read path existe y está probado.

**El nombre importa igual, como filtro de captura:**

| Formulación | Qué produce |
|---|---|
| "Professor, anota este learning" | narración de lo que pasó |
| "How2: cómo se hace X" | **entrada recuperable por tarea** |

**Formato de una entrada How2** (atómica, un problema por entrada):

```
TÍTULO:      cómo [hacer X] en [contexto Y]
SÍNTOMA:     cómo se manifiesta cuando se hace mal
CAUSA:       por qué pasa
FORMA:       la forma correcta, concreta
VERIFICA:    cómo comprobar que quedó bien
```

Si una entrada no puede llenar `VERIFICA`, es candidata a **EJECUTABLE**, no a How2.

---

## 4. CLAUDE.md — LA CAPA CARGABLE POR REPO

`CLAUDE.md` es la mejor instancia de "cargable" del ecosistema y está a medias.

**Propiedades que ninguna otra capa tiene juntas:**

- Se carga **solo** cuando CC abre ese repo → scope perfecto, costo cero en las demás sesiones.
- Está versionado y se revisa por PR.
- **El linter puede aserir sobre él** → es cargable *y* verificable a la vez.

**Es el destino natural de los gotchas específicos de repo.** De los 65 learnings sobre fallo
silencioso, la mayoría no son globales: pertenecen a un repo concreto y hoy viven en un párrafo de
15 KB que se lee siempre o nunca.

### ✅ Bloqueo previo RESUELTO (2026-08-16)

**Canónico: `.github/CLAUDE.md`.** RESUELTO POR VÍA ALTERNA — el plan pedía elegir entre
`/CLAUDE.md` y `/.github/CLAUDE.md`; la elección ya se había hecho con los hechos y sin
declararse. Evidencia: (a) `MULTIBRAND_RULE` §7.0 punto 5 instaló el bloque de la regla en
`.github/CLAUDE.md` de 16 repos y lo llama *"el más importante de todos — el único que no
depende de que alguien se acuerde"*; (b) el 2026-08-13 CC operó con `CC_PROTOCOL.md` bloqueado
por egress, **sostenido solo por el bloque de `.github/CLAUDE.md`** — prueba operativa de que
es el que carga; (c) su tamaño pasó de 608 b (29-jul) a 1.972 b, exactamente el crecimiento
del bloque multimarca. `/CLAUDE.md` (9.205 b) queda como **legacy**: no recibe contenido
nuevo, se poda en PR aparte. Verificado el 2026-08-16. **Desbloquea la fase 3.**

### Contrato de `CLAUDE.md`

| Va | No va |
|---|---|
| reglas duras de **ese** repo | estado (deploys, versiones) → se consulta |
| gotchas de **ese** stack | agenda → vive en AGENDA |
| convenciones de rama/PR de **ese** repo | método general → vive en skills |

---

## 5. ARCHIVOS DERIVADOS vs ARCHIVOS ESCRITOS

**Un archivo derivado no se actualiza: se regenera y se compara.** Esto convierte la mitad del
Actualiza en un `diff` verificable en lugar de una tarea de redacción, y mata la clase entera de
bug "el contexto dice X y la realidad dice Y".

| Archivo | Hoy | Objetivo |
|---|---|---|
| `ecosystem.md` | derivado de `ecosystem.json` | ✅ sin cambio |
| `ecosystem_filemap.md` | derivado de `ecosystem.json` | ✅ sin cambio |
| `ecosystem.json` | **mantenido a mano → deriva** | **generado** desde Vercel + Supabase + GitHub |
| `ecosystem_graph` | reconciliación pendiente (#38) | derivado; reconciliación = **diff automático** |
| `AGENDA.md` | 160 KB narrando estado | ~15 KB: abierto + decisiones |
| `historical_AGENDA.md` | archivo por barrido | ✅ sin cambio |
| `session_log.md` | narrativo, a mano | **lo único que sigue siendo escritura genuina** |

**Consecuencia:** cuando `ecosystem.json` pasa a generado, la pregunta "¿está actualizado el
contexto?" deja de existir. Se regenera y el diff responde.

---

## 6. PROTOCOLOS COMO MANIFIESTO, NO COMO PROSA

### El modo de falla actual, documentado por el propio protocolo

> *"el archivado se diseñó el 28-jun-2026 pero estuvo tres semanas perdido porque **ningún paso del
> protocolo lo invocaba**"* — `HRD_PROTOCOL.md` §HRD_ACTUALIZA paso 10

**La lección se aprendió, se aplicó al archivado, y no se propagó: Professor sigue sin estar
invocado por ningún paso hoy.** Un protocolo más largo empeora esto: se cumple parcialmente y nadie
sabe qué paso se saltó.

### El cambio

| Hoy | Objetivo |
|---|---|
| Sam escribe el trigger | el trigger vive en instrucciones de proyecto |
| Claude **lee prosa** e interpreta N pasos | un **runner** ejecuta un manifiesto declarativo |
| Qué pasos corrieron: **inverificable** | cada paso emite su check |
| Si falta un paso, nadie se entera | falta un paso → **el PR sale rojo** |

**Un paso que no está en el manifiesto no existe. Un paso que está y no corrió, falla ruidoso.**
Es `fail-loud` aplicado al propio protocolo.

### Forma del manifiesto

```
PASO:        identificador estable
OBJETIVO:    una frase
VERIFICADOR: comando exacto + qué cuenta como PASS
OBLIGATORIO: sí / no
ESCALA:      qué clase de hallazgo NO decide el runner
```

**Regla dura:** el verificador **nunca** comparte el camino de código que verifica. Si el
verificador lee el error tragado por la capa que está probando, confirma el bug con confianza.

---

## 7. EL CONTRATO DE LOOP

Formato reusable para todo trabajo delegado a CC.

```
OBJETIVO:      [una frase, verificable]
VERIFICADOR:   [comando exacto + qué cuenta como PASS]
ALCANCE:       [archivos/repos; read-only | rama X]
STOP:          PASS | N iteraciones | condición de escalada
ESCALA A SAM:  [qué clase de hallazgo NO decide el loop]
SALIDA:        tabla/diff. Sin narrativa. Máx N líneas.
```

**Las dos últimas líneas son las que reducen la carga de lectura.** Sin declarar formato de salida,
la salida por defecto es narración.

### Dónde corre el verificador

**No puede vivir en una Edge Function**: runtime Supabase = sin subprocess, cap 2 s CPU, bundle
20 MB; y una EF no ve el worktree. Los verificadores necesitan `git`, `diff`, filesystem.

| Momento | Dónde | Rol |
|---|---|---|
| durante el loop | entorno de CC | feedback rápido, el loop itera solo |
| sobre el PR | **GitHub Actions** | **veredicto autoritativo, independiente de CC** |

**El CI es el que resuelve el problema de fondo:** si CC corre su propio verificador y reporta
"PASS", se vuelve a la narración. Con Actions, el que ejecuta es GitHub y Sam ve un check, no un
diff.

**Rojo en CI debe ser raro.** CC no pushea hasta verde en local; el rojo es backstop para lo que el
local no puede ver (otra sesión movió `main`, estado cambiado entre branch-off y push, o CC se
saltó su check). Rojo frecuente = verificador local mal calibrado, y **eso** es el bug a arreglar.

### Gobernanza (vigente, corregida 29-jul-2026)

- **CC pushea ramas** (incluido `unrlvl-context`) y **abre PRs**.
- **CC nunca pushea a `main`. CC nunca mergea.**
- **Sam mergea vía GitHub Web UI**, mirando el resumen y los checks — **no el diff**.

---

## 8. PROFESSOR — RECONVERSIÓN

Professor mezcla tres cosas. Se separan según §1.

| Contenido actual | Capa | Destino |
|---|---|---|
| "cómo se hace X correctamente" | MÉTODO | **How2 → entradas en `skills/`** |
| "esto nunca debe pasar" | REGLAS | **aserción / CHECK / gate / `veto_rule`** |
| `decision_criteria` (16) + `veto_rules` (4) | JUICIO | **semilla de ARBITER** |
| el resto de los 661 | HISTÓRICO | consultable, sin migrar |

### Hallazgo estructural

**`professor_decision_criteria` es ARBITER, diseñado tres meses antes.** 4 dimensiones ponderadas
(a quién afecta / tipo de riesgo / reversibilidad / horizonte) + 4 vetos absolutos sin bypass, todo
activo y poblado. Se diseñó lo mismo dos veces porque la primera versión era invisible.
**ARBITER no se construye de cero: se enciende.**

### Cambios al esquema de captura

1. **Campo obligatorio `enforced_by`** — qué artefacto hará cumplir esto. Sin él, no entra.
   **Esto sí es un filtro** (el actual rechaza el 0,7 %).
2. **Revivir `converted_to_manual_id`** — la mecánica existe, nunca se usó. Sin conversión a los
   30 días → candidato a descarte.
3. **Cerrar la taxonomía con `CHECK`** (~12 categorías). Patrón del ecosistema: *CHECK de tablas
   core = enums cerrados*. Hoy: 153 categorías.
4. **Retirar `relevance_score`** o forzar distribución. Hoy el 60 % es 5 → no informa.
5. **Invocar el juicio desde el manifiesto.** Hoy ningún paso lo hace.

### Compresión esperada

| De | A |
|---|---|
| 65 learnings de fallo silencioso | **1 aserción** |
| 14 de GRANT a `service_role` | **1 check** |
| 7 de deploy-vs-repo | **L0** |
| **661 learnings** | **~20 artefactos ejecutables** + histórico |

**No se reglamenta la captura primero.** Reglamentar sin destino produce 661 entradas mejor
formateadas.

---

## 9. FASES

**Cada fase entrega valor sola. Nada de big-bang.** `#16 Context System refactor — RIESGO ALTO`
lleva meses parado justamente por querer moverse entero; este plan existe para no repetirlo.

| # | Fase | Entrega | Verificador | Riesgo |
|---|---|---|---|---|
| **0** | Fijar invariante + `enforced_by` + canónico de `CLAUDE.md` | deja de entrar conocimiento sin destino | revisión de Sam | nulo |
| **1** | **L0** paridad EFs + **L1** barrido de deudas | capa ESTADO deja de narrarse | `diff` exit 0 · query vs AGENDA | **nulo** (read-only) |
| **2** | **Depurar AGENDA** con el resultado de L1 | 160 KB → ~15 KB · **acá baja la carga de lectura** | tamaño + toda línea borrada reaparece | bajo |
| **3** | Extraer REGLAS y MÉTODO: gotchas → `CLAUDE.md`/skills; 65 → aserciones | Professor recupera read path | cobertura: toda regla tiene artefacto | bajo |
| **4** | **L2** linter + CI + juicio invocado desde manifiesto | escritura verificada sin leer el diff | check de Actions | medio |
| **5** | `ecosystem.json` generado + graph derivado | fin de la deriva de contexto | diff regeneración | medio |
| **6** | Ayra tractable | — | — | — |

**La fase 2 devuelve el tiempo. Las fases 0 y 1 existen para que la 2 sea correcta y no una poda a
ojo.**

### Orden no negociable

`L1 antes que L2`. Un linter sobre contenido no verificado produce una AGENDA impecablemente
formateada y **falsa**. Probabilidad de verde-con-contenido-falso: **~80 %** sin L1 previo, **~15 %**
con L1 encadenado.

---

## 10. REPARTO — QUÉ ES LOOP Y QUÉ ES DE SAM

| Loopable (~70 % del trabajo) | Decisión de Sam (100 % de las decisiones) |
|---|---|
| L0, L1, L2 | qué deuda gana cuando DB y AGENDA discrepan |
| extracción y clasificación **propuesta** de los 661 | qué learning sobrevive y cuál se descarta |
| detección de duplicación temática | la taxonomía canónica |
| barridos: secrets, drift de modelos, patrones replicados | qué declara `CLAUDE.md` como regla dura |
| regeneración de derivados | los vetos de ARBITER |
| propuesta de archivado | autorizar el archivado |

**El loop no reduce decisiones: reduce lecturas.** Su función es llegar a la decisión ya verificada.

---

## 11. DECISIONES ABIERTAS — REQUIEREN A SAM

| # | Decisión | Bloquea |
|---|---|---|
| D1 | ✅ **RESUELTO 2026-08-16 — `.github/CLAUDE.md` es el canónico.** Ver §4. | — |
| D2 | ¿How2 como entradas en `skills/` (recomendado) o namespace propio? | fase 3 |
| D3 | Taxonomía cerrada: las ~12 categorías canónicas | fase 3 |
| D4 | ¿`ecosystem.json` generado rompe algún consumidor actual? | fase 5 |
| D5 | ¿Los 661 learnings se migran, o solo se comprimen los ~20 y el resto queda histórico? | fase 3 |

---

## 12. 🔴 PENDIENTE DE SEGURIDAD — RELOJ CORRIENDO

`HRD_PROTOCOL.md` se sirve **público, sin auth, con `access-control-allow-origin: *`**, y el paso 1
de `HRD_ACTUALIZA` contiene **el secret del Social Media Agent en claro dentro de la URL**. Las
preferencias de Sam dicen *"valor en Vercel"*: el protocolo contradice la intención declarada.

- Probabilidad de explotación: **~5-10 %** (URL no enlazada) · costo de arreglo: minutos.
- **Secuencia:** generar nuevo → cargar en Vercel → reemplazar la URL por referencia a env var →
  **recién entonces** revocar el viejo.
- **Barrido pendiente:** verificar el mismo patrón en el resto de `protocols/` y `skills/`.
  Es read-only → candidato natural a loop.

---

## 13. REGLAS DURAS DE ESTE DOCUMENTO

1. **El conocimiento solo existe si algo lo carga en el momento de usarlo.**
2. **Todo conocimiento declara su destino al capturarse.** Sin destino, no se captura.
3. **Prohibido el destino "todos lo leen siempre".**
4. **El estado se consulta o se deriva. Nunca se narra.**
5. **Ejecutable > cargable > consultable.** Dejar como prosa lo que puede ser aserción es degradar.
6. **Un paso que no está en el manifiesto no existe.**
7. **El verificador nunca comparte el camino de código que verifica.**
8. **Los context files se actualizan preservando historia. Nunca se reemplazan.**
9. **CC pushea ramas y abre PRs. Nunca `main`. Nunca mergea. Sam mergea por GitHub Web UI.**
10. **Cada fase entrega valor sola.** Ninguna fase depende de que las seis estén completas.

---

_v1.0 · 2026-07-29 · UNRLVL Studio · Documento fundacional de la capa de conocimiento._
