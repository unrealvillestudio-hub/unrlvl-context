# SKILL — voice-craft (Capa Primaria de Oficio Comunicacional)

**Versión:** v1.0 · **Creado:** 2026-07-18 · **Rama:** IID / Voice
**Naturaleza:** CAPA PRIMARIA COMPARTIDA. Se carga **siempre** que se calibra o se genera cualquier voz, de cualquier marca, de cualquier tipo. No es un método de bucle ni un orquestador de fases: es el **oficio** — lo que hace que un texto esté bien hecho, con independencia de qué marca lo firme.
**Disparadores:** cualquier calibración de voz (`genome-calibration`), cualquier ciclo a R4B (`r4b-genome-calibration`), cualquier output de texto público (`content-pipeline`), o la invocación explícita de un perfil secundario (`voice-conversion`, y futuros `voice-editorial` / `voice-educative` / `voice-professional`).
**Origen:** destilado de `IID/CALIBRATOR_MINDSET.md` (2026-07-17), triangulación de 4 calibraciones reales — Lucien editorial, NSCF conversión, D7Herbal conversión, ForumPHs conversión.

---

## 0. QUÉ ES ESTE SKILL Y QUÉ NO (fronteras — leer antes de usar)

Este skill existe porque el conocimiento de comunicación avanzada estaba **duplicado dentro de cada genoma de marca** (p. ej. `nscf_conversion.technique_variation_rule` llevaba el arsenal completo y las reglas de forma microtécnicas). Cada marca nueva lo re-destilaba desde cero. Aquí vive **una sola vez**.

**Fronteras duras (patrón del ecosistema: ORQUESTAR, no duplicar):**

| Qué | Dónde vive | Este skill |
|---|---|---|
| **MÉTODO del bucle Boids** (triangulación → eje fundador → SÍ/NO → convergencia 10+3 → destilación E6) | `genome-calibration` (el Tratado) — **fuente única** | lo INVOCA, no lo repite |
| **CICLO de-cero-a-R4B** (fases, marca↔persona, brand_topics, scheduler) | `r4b-genome-calibration` — **fuente única** | lo INVOCA, no lo repite |
| **OFICIO comunicacional** (arsenal, modos, PSY, artefacto, triage) | **aquí** | fuente única |
| **PARAMETRIZACIÓN por tipo de voz** (filo, cierre, blanco, familia PSY) | perfiles secundarios (`voice-conversion`, etc.) | los invoca según el tipo declarado |

Si cambia el método del bucle → se edita el Tratado. Si cambia el oficio → se edita aquí. Si cambia un tipo de voz → se edita ese perfil.

**Este skill NO es opcional ni decorativo.** El diagnóstico que lo originó: el generador de `/api/calibrate.ts` produce texto "correcto pero tibio" porque calibra identidad **sin** cargar (a) el arsenal operado y (b) el objetivo psicológico. Sin esta capa, la voz converge y aun así el texto no funciona.

---

## 1. LOS NUEVE MODOS TRANSVERSALES

Aparecen en las 4 calibraciones, en todos los tipos de voz. Son el núcleo compartido (~80% de lo que hace bueno a un texto de marca). La parametrización por tipo la aporta el perfil secundario.

### 1 · El filo apunta al PATRÓN, jamás a la persona
El adversario es siempre un **fenómeno**: el consejo genérico y conveniente, el administrador reactivo, la exageración del mercado, la manta de paja. Nunca una persona concreta, nunca el gremio, nunca el lector.

- **Revelación, no agresión.** La cerilla quema la manta, no al lector. La crueldad destruye; la revelación devuelve la elección. El momento de la verdad es del lector, no del emisor.
- **Prohibición gemela:** tampoco se ABSUELVE la falla ("tu colorista hizo su parte" está prohibido — absolver comete la misma falta que se critica).
- **Crudeza = debilidad.** La grosería ruega reacción; la palabra afilada busca lo que es. Nunca confundir impacto con vulgaridad. El filo tiene estilo o no es filo.

Aplica a todo filo, de 3/10 a 9/10. Lo que cambia por tipo de voz es la INTENSIDAD, no el blanco.

### 2 · El motor va antes que las dimensiones
El eje fundador es el motor; sin él, un filo alto suena a edgelord y una voz suave suena a folleto. **Las dimensiones ya aprobadas se REESCRIBEN cuando entra el eje** — no se le suman. Un genoma sin motor es técnica sin alma.

Corolario operativo: si en mitad de un bucle aparece el eje real, se vuelve atrás sobre lo ya aprobado. No es retroceso, es la secuencia correcta.

### 3 · Demuestra, nunca declares (regla dura transversal)
La regla dura de voz del ecosistema, en su implementación **operativa**:

- **Nunca nombrar promesa / garantía / milagro / devolución** — ni siquiera para negarlas. "Sin promesas vacías" INSTALA la promesa y hace que el lector la pida.
- **Nunca declarar autoridad** ("+35 años", "experta reconocida", "líderes en"). Quien la anuncia pide que le crean; pedirlo admite que podría no ser creíble.
- **El dato preciso ES la credencial.** "La humedad ronda el 74%" prueba lo que "experta" solo afirmaría. Un TÍTULO habilitante (Abogada, licencia, RUC) es hecho afirmable y verificable; la EXPERTISE se demuestra.
- **Promesa → testimonio de tercero.** La marca no puede afirmar "resultados en 15 días"; una usuaria que lo dice, sí. El testimonio dice lo que la marca no puede.
- **Nunca construir por oposición** ni definirse por lo que NO se es.
- **El motor filosófico interno NUNCA se nombra.** "Un übermensch que cita a Nietzsche se delata." Se encarna en cada movimiento, se cita en ninguno.

### 4 · Economía al servicio del objetivo
- **Si no aporta al objetivo, no lo menciones.** Ejemplo real (FPHs): el alcance de servicio ("FPHs prepara y acompaña; la JD decide") es RESTRICCIÓN DE CONTRATO, no argumento de venta. Vive en FAQ y contrato, no en el copy de conversión.
- **No aclarar lo que nadie preguntó.** El disclaimer no pedido instala la duda que no existía. "Para eso son las FAQ."
- **Di lo que SÍ hacemos.** Nunca por negación.
- **Precisión, no vaguedad.** "Cada semana", no "casi cada semana". "Días", no "semanas" cuando son días. Lo impreciso invita a la duda; la comunicación afirma.

### 5 · La fortaleza real es la bandera
La bandera es la mayor fortaleza objetiva — ingredientes y propiedades (D7H), diagnóstico preciso + ciencia (NSCF), resultado medible del sistema (FPHs). **Nunca la honestidad ni la transparencia como bandera**: eso es declarar, no demostrar.

- **Autoridad por contraste:** la voz nace de hacer lo que los demás no hacen. "El dato que ningún administrador previo midió." No es superioridad declarada: es una diferencia mostrada.
- **Cuantificar lo que otros dejan vago** convierte una cifra abstracta en decisión. (FPHs: "110% de mora crítica".)
- **Reencuadre antes que reclamo:** convertir un problema bilateral en uno de equidad ("la morosidad no es un problema de cobros: es un riesgo patrimonial que los propietarios al día están financiando"). Lenguaje patrimonial, no punitivo.

### 6 · Voz constante, técnica variable, con memoria (el techo de producción)
Dos capas que **nunca** se funden:
- **IDENTIDAD** (constante): lo que hace que un texto suene a la marca. Es lo que el bucle converge.
- **TÉCNICA** (variable, rica): storytelling, contraste, falso binario, analogía, dato-ancla, reencuadre, objeción anticipada, testimonio, escena, principio invertido, diagnóstico, comparación con un mejor, y decenas más.

**La técnica no reincide entre piezas.** Esto exige MEMORIA de lo ya generado (`technique_used` autodeclarado en `calibration_turns`; `creative_seed` / `loadRecentPieces` en el eje B). Sin memoria el generador repite técnica y la voz colapsa en fórmula.

**El arsenal debe estar OPERADO, no enumerado** — ver §2, que es la implementación de este modo.

### 7 · Anticipar cómo falla la voz y blindarlo DENTRO del genoma
Los riesgos se cuantifican y las mitigaciones se codifican **en un campo del genoma**, nunca como nota aparte (una nota aparte no llega al generador). Ejemplo real (Lucien): ~85% de probabilidad de que el molde quede debajo del genoma, ~40% de que suene cruel en ES, ~30% de colisión comercial → cada uno mitigado dentro de una dimensión.

### 8 · Bilingüe = re-anclar, no traducir
ES y EN aplican el mismo genoma pero **se generan por separado desde origen**. Nunca traducir de uno al otro. El filo se mantiene pero se ancla en el argumento, no en el insulto: **el español castiga la arrogancia distinto que el inglés.** Registro neutro internacional salvo que la marca declare lo contrario (excepción viva: es-FL en PatriciaOsorioConectando, por comunidad íntima homogénea — el idioma sigue a la AUDIENCIA).

### 10 · Variabilidad de publicación — no enlazar afuera por defecto
_(Rescatado de `RETOMA_AIID_ARTICULOS.md` 2026-06-01, antes de archivarlo el 21-jul.)_

No todo post que presenta a otra marca o persona debe **sacar al lector de la plataforma**. Se modula entre dos modos, y elegir siempre el mismo es un error:
- **Redirección** — traer a la otra voz con un device ("he recibido un mensaje de…") + enlace a su terreno.
- **Retención** — dejar que el visitante EXPERIMENTE esa voz ahí mismo, en el post nativo, **sin enlace**. Si no le bastó, un post posterior lo lleva de paseo a su mundo.

**Razón técnica, no estética:** los posts con links externos tienen **menos alcance orgánico** (Meta y LinkedIn penalizan sacar gente de la plataforma). Mezclar formatos protege el alcance **y** construye la otra voz.

El pipeline no debe enlazar afuera por defecto: la variabilidad es una decisión por pieza.

### 9 · Nunca inventar
Si no se sabe, se pregunta o se lee la DB. El generador debe leer el conocimiento REAL de la marca (`product_blueprints`, `brand_services`, `brand_copy_profiles`) — es lo que hace E7/`_genomePromptBuilder`.

**`founder_axis` es dirección de voz (hipótesis), NO cuerpo de conocimiento.** Confundirlos produce alucinación plausible: D7Herbal inventó Serenoa repens, Ortiga, Ginkgo y glicerina — todos vetados, todos creíbles para la categoría. Lo plausible es exactamente lo peligroso.

---

## 2. EL ARSENAL OPERADO (no enumerado)

**Este es el corazón del skill.** La diferencia entre un generador tibio y uno bueno no es que conozca los nombres de las técnicas — es que las **ejecuta con oficio**.

**Postura de trabajo (cita literal de Sam, 2026-07-02):**
> "El mejor marketer del mundo, experto comunicador que entiende todo el proceso de comunicación y sus profundidades, con vocabulario profundo en ES y EN."

**Qué significa OPERAR el arsenal, en concreto:**

1. **Dominio real del idioma.** El español es amplio y rico: permite decir lo mismo de mil maneras. Elegir la palabra que hace el trabajo — no la primera que aparece, no la más adornada. El léxico se ajusta al registro de la voz, no al gusto del generador.
2. **Adaptación de audiencia.** Quién lee determina el nivel de léxico, el ejemplo, el grado de tecnicismo, qué se da por sabido. La misma idea se dice distinto a un decisor que al que sufre el problema.
3. **Transmisión de la voz del emisor.** El texto debe sonar a QUIEN habla, no al modelo que lo escribió. Esto es lo que el genoma aporta; el arsenal lo ejecuta.
4. **Nunca nombrar la técnica dentro del texto.** Un texto que dice "déjame contarte una historia" no está haciendo storytelling: está anunciándolo. La técnica es invisible o no es técnica.
5. **Elegir por función, no por catálogo.** La técnica se elige porque sirve al objetivo de ESTA pieza, para ESTA audiencia, en ESTE canal — no porque toque variar.

**QA obligatorio antes de entregar:** el generador se autoevalúa contra el objetivo declarado **antes** de proponer el texto. ¿Esta pieza hace lo que debía hacer? Si no, se rehace. No se entrega para que el operador lo descubra.

**Arsenal sintáctico de alto registro** (disponible para toda voz; su uso lo modula el perfil):
triplete de corrección (no-X, no-Y, no-Z → es Z) · frase-pivote que gira el párrafo · em-dash como distancia, no como emoción · diagnóstico frío · el párrafo como estructura portante · compresión en imagen-sentencia ("marionetas", "vivió el primer año 30 veces", "muebles que opinan") · pregunta-cuchillo de baja frecuencia que no espera respuesta · cierre que reposiciona al sujeto.

---

## 3. DECLARAR EL ARTEFACTO DE DESTINO ANTES DE GENERAR (regla dura)

**Un texto sin destino es un texto sin restricción, y sale genérico.**

Origen: fracaso real de calibración del 2026-07-17 — se escribió un párrafo largo para un feed de Instagram. El texto no era malo; era inservible, porque nadie había declarado dónde vivía.

**Antes de generar la primera palabra, declarar explícitamente:**

1. **CANAL** — IG feed, IG stories, FB, X, TikTok (texto/guion), blog propio, email, landing, LinkedIn, catálogo, WhatsApp.
2. **FORMATO** — post con imagen, carrusel, caption de reel, guion hablado, artículo, asunto+cuerpo, headline+subhead, ficha.
3. **EXTENSIÓN APROXIMADA** — en caracteres o palabras, con rango. No "corto": "≤280 caracteres". No "largo": "600-800 palabras".

**Reglas derivadas:**
- Si el operador no lo declara, **se pregunta antes de generar**. No se asume. No se genera "algo" y se ajusta después: la extensión y el canal cambian la ESTRUCTURA, no solo el recorte.
- Durante un bucle de calibración, el artefacto se declara **por turno** — parte de la variación deliberada es variar el destino (una voz que solo sabe escribir un formato no está calibrada).
- El destino manda sobre el gusto: un cierre reservado a la marca funciona en un caption y estorba en un guion hablado.
- Conecta con la capa de datos: `intel.brand_topics.platforms` y `objective_by_platform` declaran canal y objetivo por plataforma. Cuando existan, se leen; cuando no, se pregunta.

---

## 4. EL EJEMPLO ES MECANISMO, NUNCA MOLDE (regla dura)

Cuando el operador entrega un texto de referencia ("así me gusta", "mirá este post"), lo que se toma es **el mecanismo que lo hace funcionar** — jamás su forma literal.

**Procedimiento obligatorio ante un ejemplo:**
1. **Nombrar el mecanismo** en voz alta antes de usarlo: qué hace este texto, en qué orden, por qué funciona en el lector. ("Abre con un tercero para que el lector se reconozca sin sentirse señalado; el giro llega en el tercio final; el dato entra después de la escena, no antes.")
2. **Verificarlo con el operador** si hay ambigüedad. Un mecanismo mal leído se propaga a todo el genoma.
3. **Ejecutarlo con materia distinta**: otro tema, otra escena, otro léxico, otra longitud si el artefacto lo pide.
4. **Nunca reutilizar** frases, aperturas, estructuras de párrafo ni remates del ejemplo.

**Por qué:** copiar la forma produce piezas que se parecen al ejemplo y no a la marca — y a la tercera pieza el sistema ya está repitiéndose. El ejemplo es un caso de la voz, no su definición. Un ejemplo tomado como molde congela la voz en la primera muestra que alguien pegó en el chat.

**Anti-IP:** aplica con más fuerza cuando el ejemplo es material AJENO. La regla del ecosistema es "no republicar", no "no leer": leer para aprender el método está permitido; reescribir el post no. El material ajeno es insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir.

---

## 5. LAS CAPAS DEL PIPELINE (declaradas, no re-creadas)

Estas capas **ya existen en el sistema**. Este skill las DECLARA para que se carguen en calibración y generación — no las redefine ni las duplica. Fuente de verdad: la DB y el código.

### 5.1 · Psycho-presets — 13 activos, 4 familias
Tabla: `public.psycho_presets` (13 filas `active=true`). Mapeo objetivo→familia: `TAG_TO_FAMILY` en `supabase/functions/iid-core/fanout.ts` (repo `unrlvl-iid-functions`).

| Familia | Presets (`id` · `objective_tag`) |
|---|---|
| **CONVERSION** | `PSY-URGENCY` urgency · `PSY-SCARCITY` scarcity · `PSY-FOMO` fomo · `PSY-SOCIAL-PROOF` social_proof |
| **COMMUNITY** | `PSY-BELONGING` belonging · `PSY-IDENTITY` identity · `PSY-RECIPROCITY` reciprocity |
| **AUTHORITY** | `PSY-AUTHORITY` authority · `PSY-TRUST` trust · `PSY-CONTRAST` contrast |
| **BRIDGE** | `PSY-CURIOSITY` curiosity · `PSY-SURPRISE` surprise · `PSY-ASPIRATION` aspiration |

Cada preset lleva `injection_copy` / `injection_visual` / `injection_video` / `injection_voice`. **La que consume una voz es `injection_copy`.**

**Cómo se elige (Ruta B, viva en prod desde 17-jul):** el objetivo declarado en `intel.brand_topics.objective_by_platform` determina la FAMILIA; el `angle` desempata determinísticamente DENTRO de esa familia. El ángulo dejó de decidir QUÉ estímulo y pasa a decidir CUÁL entre los que sirven al objetivo. **Coherencia primero, variedad después.**

**Default `AUTHORITY` cuando la marca no declaró objetivo** — a propósito el más conservador: si no sabemos qué busca la marca, se establece criterio, no se empuja a comprar. Un default que vende en nombre de una marca que no lo pidió es peor que uno que no vende.

**Deuda conocida y su consecuencia para la calibración:** `/api/calibrate.ts` **NO lee** `psycho_presets` ni `objective_by_platform` — viven solo en `fanout.ts`, DESPUÉS de la generación. Por eso el bucle calibra a ciegas del objetivo y tiende al default conservador → sale tibio para conversión. **Mientras eso no se corrija en runtime, el objetivo psicológico se declara MANUALMENTE al abrir el bucle** (el perfil secundario dice qué familia corresponde). No es opcional: es la mitad del diagnóstico que originó este skill.

**Segunda deuda:** `objective_by_platform` nace NULL en todas las marcas → el gate 7 (objetivo↔estímulo) es informativo hasta que se pueble en al menos una marca.

### 5.2 · AIFE
`aife-filter` — control de calidad/seguridad de marca. Corre en el carril automático, **no dentro del bucle**. Consecuencia: lo que el bucle aprueba no pasó por AIFE; no asumir que un texto convergido está filtrado.

### 5.3 · Watcher — 8 gates
`content-watcher` v2 (build _14): similarity, sibling-window, cadence, evidence, duplication, hard-rules, **gate 7 objective↔stimulus**, **gate 8 visual-sibling**. Único juez con dientes: rechaza. El Builder prescribe (se inyecta antes de generar, no verifica); el Watcher valida. Modelo reflejado de dos capas.

### 5.4 · Contratos de publicación
- Autopublish exige `content_score >= 85` **AND** `brand_topics.auto_approve`. Todas las marcas nacen `auto_approve = false`.
- `ANTISPAM_CONTRACT.md` es prerequisito no negociable de cualquier publicación.

---

## 6. EL REPARTO GENOMA ↔ ANGLE

Conecta la voz (genoma) con el territorio (brand_topic). Destilado del caso #5i (Lucien).

**Principio madre:** el `core_move` de un genoma es una **disposición — el tipo de mirada —, no un procedimiento ejecutable.** Codificarlo como receta literal ("desmonta la palabra X") hace que el modelo lo ejecute como algoritmo y la voz colapse en fórmula.

**El reparto:**
- **GENOMA = el CÓMO.** core_move, filo, voz, temperamento. Constante por marca, heredado a las voces hermanas.
- **ANGLE = el QUÉ / DÓNDE.** Territorio temático + **barreras** ("nunca manual técnico, eso es UNRLVL"). **Jamás la mirada, jamás el tono, jamás la frase-ancla.**

**El caso que lo reveló:** el angle de `ai-cognition` duplicaba el core_move del genoma → lo fijaba como regla dura por-dominio → Lucien salía idéntico siempre. Sobre-especificado en un dominio, `null` en los demás.

**Fórmula de redacción de un angle (patrón real de Sam):**
> "Territorio: [dominio]… [Marca] ENTRA a este territorio con su propia mirada; el territorio NO le dicta el ángulo ni el tono ni las palabras — eso lo gobierna el genoma. Barrera: [qué es de otra marca]."

**Arbitraje raíz-vs-territorio:** si el error está en la disposición de la voz → se corrige **en el genoma** (bisturí, preservando lo bueno). Si es solo el terreno → se corrige en el angle. Corregir en el genoma es la única corrección que ESCALA: se hereda a las N voces × N dominios.

---

## 7. TRIAGE — ERROR DE TÉCNICA vs ERROR DE INTENCIÓN

Procedimiento obligatorio ante cualquier NO del operador. Nace del "1/10" de NSCF que detuvo el bucle para conversar el eje moral.

| | **Error de TÉCNICA** (menor) | **Error de INTENCIÓN** (profundo) |
|---|---|---|
| **Qué es** | repertorio retórico mal ejecutado (falso binario sin remate, pregunta respondible en contra, cierre que suelta al lector) | algo que traiciona el posicionamiento o el eje moral |
| **Dónde vive** | el arsenal (§2) | el eje fundador |
| **Qué hacer** | reparar en el acto, el bucle continúa | **SALIR del bucle** a una conversación de eje, y volver |
| **Qué NO hacer** | — | parchearlo en el texto siguiente |

**Regla de campo:** *"esto no es un NO de superficie — es la pieza más profunda del genoma, merece hablarse, no parchearse en una 11/10."*

**Los dos ejes que lo alimentan** (Tratado §1): `verdict_voice` = ¿suena a la marca? · `notes_intent` = ¿hace lo estratégico? Un **"SÍ pero"** cierra voz y abre intención — nunca tratarlo como fallo de convergencia; suele ser la veta más rica.

**Consecuencia técnica pendiente:** `/api/calibrate.ts` siempre avanza al siguiente turno; no contempla el "pausar para conversar el eje". Mientras eso no exista en runtime, el triage lo ejerce Claude en el chat y el operador decide si se pausa.

---

## 8. CHECKLIST DE INVOCACIÓN

Cuando este skill se carga, verificar en orden:

1. **¿Qué tipo de voz?** → cargar el perfil secundario (`voice-conversion` hoy; editorial/educativa/professional cuando existan). Si no hay perfil escrito para ese tipo, se calibra con esta capa + el cuadro de parametrización del insumo, y se documenta para escribirlo con casos reales.
2. **¿Artefacto declarado?** (§3) canal + formato + extensión. Si falta, **preguntar antes de generar**.
3. **¿Objetivo psicológico declarado?** (§5.1) familia PSY. Mientras `calibrate.ts` no lo lea, declararlo a mano.
4. **¿Hay ejemplo de referencia?** (§4) nombrar el mecanismo antes de ejecutar. Nunca copiar forma.
5. **¿Conocimiento real de la marca cargado?** (§1.9) blueprints/servicios. Sin eso, no generar afirmaciones de producto.
6. **¿Memoria de técnicas ya usadas?** (§1.6) para no reincidir.
7. **QA contra objetivo** (§2) antes de entregar.

---

## 9. RELACIÓN CON LOS DEMÁS SKILLS

- **`genome-calibration` (el Tratado)** — fuente única del MÉTODO del bucle. `voice-craft` es **hermano, no reemplazo**: le aporta la capa de comunicación/arsenal/PSY que hoy le falta al generador. El Tratado dice CÓMO se corre el bucle; este skill dice CON QUÉ OFICIO se escribe cada turno.
- **`r4b-genome-calibration`** — orquestador de-cero-a-R4B. En su Fase 3 invoca el Tratado; debe cargar además `voice-craft` + el perfil del tipo de voz que toque.
- **`content-pipeline`** — todo output de texto público. Debe consumir `voice-craft` + el perfil, para que la **generación** (no solo la calibración) use el arsenal operado.
- **Perfiles secundarios** — llevan solo parametrización + técnicas propias; invocan esta capa para todo lo común.

---

## 10. DEUDAS ABIERTAS QUE ESTE SKILL DECLARA

Se documentan aquí porque afectan a toda calibración mientras existan:

1. **`/api/calibrate.ts` no carga la familia PSY ni `objective_by_platform`** → el bucle calibra a ciegas del objetivo. Mitigación: declararlo manualmente (§5.1).
2. **`/api/calibrate.ts` no opera el arsenal — lo enumera.** Mitigación: §2 en el prompt del generador. Pendiente de upgrade en runtime.
3. **`/api/calibrate.ts` no contempla pausar para conversar el eje** (§7).
4. **`objective_by_platform` NULL en todas las marcas** → gate 7 informativo hasta poblarlo.
5. **AIFE no corre dentro del bucle** (§5.2) — un texto convergido no está filtrado.

_Fin · voice-craft v1.0 · capa primaria compartida · Unreal>ille IID_
