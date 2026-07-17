# SKILL — r4b-genome-calibration (De Cero a R4B · Método Sam×Claude)

**Versión:** v1.0 · **Creado:** 2026-07-13 · **Rama:** IID / Brand Onboarding
**Naturaleza:** PROTOCOLO ORQUESTADOR convocable. Conduce a Sam×Claude (en el chat, sin UI de Seeder ni de Orchestrator) por el ciclo COMPLETO de una marca: de cero —o desde una marca existente a recalibrar— hasta **R4B (Ready for Business): genoma(s) activo(s) + parche de datos + brand_topics + agentes + scheduler del Orchestrator establecido, listo para publicar.**
**Disparadores:** "marca nueva de cero a R4B", "recalibrar marca completa", "llevar [marca] a R4B", "montar el ecosistema de voz de [marca]".
**Audiencia:** Sam×Claude en chat. NO es el bucle E5b de la UI de Marisol — esa es una opción de DELEGACIÓN de la Fase 3 a un tercero, no el método base de Sam.

---

## RELACIÓN CON `genome-calibration` (NO DUPLICAR)

Este skill **NO reescribe** el método de voz. La parte de voz (triangulación → eje fundador → bucle Boids → destilación E6) vive en `skills/genome-calibration/SKILL.md` (el Tratado), que es la **FUENTE ÚNICA** de ese método. Este orquestador lo **INVOCA** en la Fase 3 y **NO repite** su contenido.

Lo que este skill AGREGA sobre el Tratado:
- **Fase 0** (revisar lo que hay) como puerta innegociable antes de todo.
- La **fórmula marca↔persona** y sus fronteras (el Tratado tiene voces hermanas §7, pero no la arquitectura marca-vs-figura).
- La **regla dura generalizada** de voz (el Tratado la tiene solo como caso NSCF).
- Las **fases post-voz**: parche de marca, brand_topics, agentes, scheduler → R4B.
- Aprendizajes posteriores al Tratado (2026-07-02): patrón alias, rol anclado al dominio, material-real-vence-teoría, arsenal PSY.

Si el método de VOZ cambia → se edita el Tratado, no este skill. Si el CICLO a R4B cambia → se edita aquí.

---

## 0. FASE 0 — REVISAR LO QUE HAY (INNEGOCIABLE, SIEMPRE PRIMERO)

Antes de diseñar, sembrar o escribir NADA. El error más caro es asumir estado. Regla transversal de todo el método: **el material real vence a la teoría; nunca asumir, siempre verificar.**

Checklist de lectura (Supabase + repos + web):
1. **¿Existe la marca en `public.brands`?** Leer `id`, `display_name`, `domain`, `type`, `industry`, `market`, `tono_base`, `brand_context`, `positioning`, `icp`, `key_messages`. La PK es `id` (no `brand_id`).
2. **¿Tiene genoma(s)?** `brand_voice_genome` where brand_id — cuántos, qué `voice_id`, qué `version`, `active`. Un genoma existente NO se tira: se recalibra quirúrgicamente (Tratado §5).
3. **¿Tiene brand_topics?** `intel.brand_topics` — sin topics no hay R4B aunque haya genoma.
4. **¿Tiene material de producto/servicio?** `product_blueprints`, `brand_services`, `brand_copy_profiles`, `brand_personas`. Determina qué capas puede leer el generador (E7).
5. **¿Tiene sesiones de calibración abiertas?** `intel.calibration_sessions` — puede haber trabajo de Marisol a retomar.
6. **¿Hay material PUBLICADO?** Web, blog, catálogo. **Si existe, leerlo** — un ejemplar real vence cualquier teoría de tablas (lección NSCF Hair Intelligence: la arquitectura editorial se destiló de 4 artículos reales, no se dedujo).
7. **VERIFICAR EL ESQUEMA de toda tabla destino ANTES de escribir** (columnas Y tipos). No descubrir por error de ejecución. (Casos reales: `relational_stance`/`emotional_register` son jsonb no text; `product_blueprints` no tiene `updated_at`; `psycho_presets` tenía CHECK que la cerraba a 10 valores.)

Salida de Fase 0: un mapa de "qué hay / qué falta" que determina si es marca NUEVA (todo desde cero) o RECALIBRACIÓN (preservar lo bueno, corregir la raíz).

---

## 1. FASE 1 — ARQUITECTURA DE VOZ (LA FÓRMULA MARCA↔PERSONA)

Decidir el MAPA de voces antes de sembrar ejes. Dos tipos de entidad y su combinación:

### 1.1 · La fórmula (validada 2 veces: Neurone↔Patricia, ForumPHs↔Ivette)

Un ecosistema de marca potente suele tener DOS entidades acopladas:

| | Conversión | Educativa | Editorial | Profesional |
|---|---|---|---|---|
| **MARCA** (el sistema/producto) | ✓ vende | ✓ enseña a usar/entender | ✓ opina del oficio/mercado | **— (NO)** |
| **PERSONA** (la figura que la encarna) | — | ✓ enseña su materia | ✓ criterio de industria | ✓ ejercicio profesional propio |

**Regla clave descubierta:** una MARCA no lleva voz Profesional — se disuelve. El "currículum" de una empresa ES su Conversión (lo que ofrece); su criterio sobre cómo debe hacerse el trabajo ES su Editorial. El desdoblamiento Profesional existe en una PERSONA, no en una empresa.

**Los tres verbos que separan las voces de marca sin solape:**
- **Conversión** = VENDE (al decisor: Junta, comprador).
- **Educativa** = ENSEÑA (al que vive/usa: el "doliente", el propietario, la clienta — NO necesariamente el decisor).
- **Editorial** = OPINA (sobre el oficio/mercado; crítica y posición, no currículum).

### 1.2 · Las fronteras que evitan que se pisen (la parte más valiosa)

Sin fronteras explícitas, seis voces suenan igual. Codificarlas por par:
- **La marca NO hace el trabajo de la persona y viceversa.** (NSCF Professional habla DEL OFICIO; PatriciaOsorio.com habla DESDE EL CRITERIO de Patricia.)
- **La persona puede citar la marca como obra propia, pero NO la vende.** (Patricia fundó Vizos / diseñó Neurone Rituals → evidencia, no catálogo.)
- **Frontera de responsabilidad** cuando la persona es profesional regulado: p.ej. Ivette (Abogada) INTERPRETA el marco legal; ForumPHs (empresa) OPERA el sistema. Si se cruzan, la empresa da consejo legal (riesgo) o la jurista vende servicio (pierde independencia). La frontera es legal, no solo estética.

### 1.3 · El recorrido de autoridad (el badge como puerta)

La persona no señaliza; despierta la pregunta. La firma/badge lleva NOMBRE + ROL FUNCIONAL, sin currículum. Su función es provocar "¿quién es esta que sabe tanto?" — el que se lo pregunta busca y llega a la marca-persona POR SU PROPIO PIE. **El badge JAMÁS dice "conocé más en…"** (eso es publicidad y muere). El recorrido se DESCUBRE. Cada marca alimenta a la siguiente sin vender nada: autoridad por acumulación de evidencia distribuida.

### 1.4 · Regla dura transversal de voz — LA VOZ DEMUESTRA, NUNCA DECLARA

Aplica a TODAS las voces del ecosistema. Dos prohibiciones que son la misma trampa:
- **Nunca nombrar promesa / garantía / milagro / devolución** — ni siquiera para negarlas ("sin promesas vacías" le INSTALA la promesa al lector y le hace pedirla).
- **Nunca declarar autoridad** ("+35 años", "experta reconocida", "líder"). Quien la anuncia pide que le crean, y pedirlo admite que podría no ser creíble.
- **El dato preciso / el título verificable ES la credencial.** "La humedad ronda el 74%…" (dato) o "Abogada" (título habilitante, verificable) prueban lo que "experta" solo afirmaría. Distinción: un TÍTULO habilitante (Abogada, RUC, licencia) es hecho afirmable; la EXPERTISE se demuestra, no se declara.
- **Nunca construir por oposición** ni definirse por lo que NO se es.
- **Anclar el rol al DOMINIO, no a una instancia que caduca.** "Especialista en Régimen de Propiedad Horizontal" sobrevive a la derogación de la Ley 284; "Experta en Ley 284" caduca con ella. La ley es una instancia; el régimen es el dominio.

### 1.5 · Salida de Fase 1
El mapa de voice_id a crear (cuántas voces, marca y/o persona), con las fronteras escritas. Decidir aquí si una marca existente v0.5 se recalibra y renombra (p.ej. `fphs_institucional` v0.5 → `fphs_conversion` v1.0 como heredera).

---

## 2. FASE 2 — SIEMBRA DE EJES FUNDADORES

Por cada voice_id del mapa, sembrar su eje en `intel.calibration_sessions`. Método (delega el "qué es un eje" al Tratado §3):
1. Leer contexto real de la marca (Fase 0 ya lo hizo) + material publicado.
2. Claude propone un BORRADOR de eje con las decisiones de voz marcadas.
3. Sam corrige (el eje es criterio del dueño; el temperamento puede venir de archivos, el eje NO — Tratado §3).
4. HRD → INSERT en `intel.calibration_sessions` (brand_id, intent_label, entry_gate='from_scratch', status='active', operator, founder_axis jsonb).

**El eje es una HIPÓTESIS, no ley** — el bucle la calibra. Embeber en el founder_axis: la regla dura (§1.4), la frontera de esta voz vs. sus hermanas (§1.2), y el `science_anchor`/`sustancia_real` como fuente de verdad ("prohibido inventar fuera de esto").

**Patrón alias (si la persona necesita entidad y hay una fila reutilizable):** desacoplar la clave técnica (`id`) del nombre público (`display_name` + `domain`). Reutilizar una fila existente sin genoma/topics/uso (verificar antes) → UPDATE de contenido, ID intacto → cero FKs repuntadas. (Caso: PatriciaOsorio.com reutilizó PatriciaOsorioPersonal.)

Disciplina de sesión: **una marca por sesión de chat; máximo ~2 voces por sesión** para no saturar. La convergencia puede tomar tiempo (Tratado §4).

---

## 3. FASE 3 — CALIBRACIÓN (BUCLE BOIDS) → DELEGA AL TRATADO

**Ejecutar `genome-calibration` §4 tal cual.** No se repite aquí. Resumen de interfaz:
- Claude PROPONE texto (el operador nunca escribe prosa); pregunta ¿es [marca]? SÍ/NO; el operador responde SÍ/NO + su VISIÓN DEL PORQUÉ; Claude recalibra y propone el siguiente.
- Convergencia: **≥10 textos Y últimos 3 SÍ consecutivos** (E5c: el umbral SUGIERE cerrar; el operador cierra cuando está satisfecho — puede seguir más allá de 10+3).
- Los dos ejes (Tratado §1): `verdict_voice` (¿suena?) vs `notes_intent` (¿hace lo estratégico?). Un "SÍ pero" cierra voz y abre intención.
- **Con E7 vivo:** el generador lee el contexto REAL de la marca desde el turno 1 (identidad + voz + fórmula + servicios desde Supabase). No alucina ingredientes/datos. Si la marca tiene product_blueprints, la fórmula real entra al prompt.

**Dos caminos de ejecución:**
- **Sam en el chat** (método base de este skill): Sam juzga los SÍ/NO. Sin UI.
- **Delegado vía Seeder** (opción): Marisol corre el bucle en la UI del Orchestrator; requiere que la marca esté en su `brand_scope` (secret `USERS_RAW` de la EF `iid-inbound` — NO vive en la DB) y sus credenciales rotadas. Sam solo aprueba el genoma resultante.

---

## 4. FASE 4 — DESTILACIÓN (E6) + PARCHE DE MARCA (bajo HRD)

### 4.1 · Destilar el genoma → delega al Tratado §5
Escritura de `brand_voice_genome` en el chat Sam×Claude bajo HRD, NUNCA en la UI. Método quirúrgico: corregir la raíz + añadir lo nuevo, preservar lo que servía. Dimensiones canónicas JSONB (Tratado §5). `source_evidence` apunta a la sesión y los turnos SÍ.
**Verificar esquema antes del INSERT** (jsonb vs text). Verificar que no exista genoma activo duplicado.

### 4.2 · Parche de marca (el subproducto que el bucle revela)
El bucle destapa datos faltantes o desalineados de la marca (huecos en `brands`, discrepancias marketing↔fórmula↔ficha). En la MISMA sesión de aprobación, Claude propone —campo por campo, con su respaldo en turnos SÍ— el llenado/corrección; Sam aprueba/edita/rechaza bajo HRD; recién entonces se escribe. **Nunca escritura automática desde el bucle.** Trazabilidad de procedencia (qué campo vino de qué sesión). Nunca sobrescribir un campo con valor sin mostrar viejo vs nuevo. (Caso D7Herbal: el bucle reveló que el 7º activo "Ron" estaba mal clasificado en el blueprint → se reclasificó en el parche.)

La aprobación del genoma es un **checkpoint DOBLE**: ratificar la voz Y ratificar los datos de marca. Una calibración densifica el conocimiento de marca, no solo produce voz.

---

## 5. FASE 5 — BRAND_TOPICS (la segunda pata)

Sin topics, aunque haya genoma, el `approve` falla ("domain sin suscriptores"). Sembrar `intel.brand_topics` por marca: plataformas, cadencia, rollout, `objective_by_platform`. Si la marca tiene pilares de contenido definidos (p.ej. los 4 pilares del blog NSCF: Hair Science / Miami Hair / Color Intelligence / Rituals), mapearlos a topics. `intel.brand_topics` es la fuente única de plataformas/cadencia; la queue solo carga brand_id + domain como puente.

---

## 6. FASE 6 — AGENTES + SCHEDULER → R4B

Una marca es "operable por los IIDs" cuando tiene **genoma activo + brand_topics**. El pipeline (dispatcher → run-stage → Labs → Watcher) los lee por `brand_id` en runtime — no se instancia un agente por marca, se PUEBLA la marca. Multimarca por construcción.

Para R4B (Ready for Business, listo para publicar):
1. Genoma(s) activo(s) ✓ (Fase 4)
2. brand_topics sembrados ✓ (Fase 5)
3. **Agentes configurados** (ver skill `agent-builder`).
4. **Scheduler del Orchestrator establecido** — la marca entra al calendario de publicación. Este es el gate final de R4B: sin scheduler, la marca tiene voz y agenda pero no publica.
5. Contratos de seguridad previos: ANTISPAM_CONTRACT + Watcher gates (el autopublish exige `score>=85 AND brand_topics.auto_approve`; todas las marcas nacen `auto_approve=false` hasta validar).

**Salida = R4B:** la marca produce contenido on-brand, con agenda, en el scheduler, lista para publicar bajo aprobación.

---

## 7. REGLAS TRANSVERSALES (aplican en todas las fases)

- **HRD antes de toda mutación de producción.** Mensaje de verificación: "querés X, para ello debo Y, ¿correcto?".
- **Flujo de entrega de context files:** CC crea rama, pushea, abre PR contra main; CC NO mergea; Sam revisa, mergea y borra la rama. Nunca commit directo en main.
- **La regla dura de voz (§1.4) gobierna todo output de todas las voces.**
- **Verificar antes de afirmar** la existencia/naturaleza de un archivo, módulo, tabla o componente. Si no se puede verificar, decir "no lo verifiqué". (Los planes obsoletos apuntan a componentes que fueron absorbidos/refactorizados.)
- **Delegación de método:** la voz vive en `genome-calibration`; el output de texto en `content-pipeline`; los agentes en `agent-builder`; el visual en `ui-ux-layer`. Este skill orquesta, no reemplaza.
- **Bilingüe = mismo genoma, reescritura NO traducción** (Tratado §8). ES/EN neutro internacional salvo que la marca defina lo contrario.

---

## 8. ORDEN DE EJECUCIÓN (resumen convocable)

0. **Revisar lo que hay** (§0) — Supabase + repos + material publicado + esquema. Nunca saltar.
1. **Arquitectura de voz** (§1) — mapa marca↔persona, fronteras, regla dura, recorrido. Decidir voice_id.
2. **Sembrar ejes** (§2) — borrador → corrección de Sam → HRD → INSERT en calibration_sessions. Una marca/sesión, ~2 voces máx.
3. **Bucle Boids** (§3) — delega a `genome-calibration §4`. Sam juzga (o delega a Marisol). Converger.
4. **Destilar genoma + parche de marca** (§4) — E6 bajo HRD, checkpoint doble (voz + datos).
5. **Brand_topics** (§5) — la segunda pata.
6. **Agentes + scheduler** (§6) — hasta R4B.
7. **Cerrar** con Professor + Actualiza (rama + PR).

_Fin del orquestador v1.0 · r4b-genome-calibration · delega la voz a genome-calibration · Unreal>ille IID_
