# CALIBRATOR MINDSET — Corpus de Modos de Pensamiento del Calibrador

**Naturaleza:** documento de trabajo / insumo de diseño. NO es un skill todavía.
**Propósito:** destilar el criterio de Sam (el calibrador) a partir de calibraciones reales de genomas, para trasladarlo al/los skill(s) de voz y al generador del bucle (`/api/calibrate.ts`) + a los presets del pipeline.
**Origen:** sesión 2026-07-17 (R4B ForumPHs). Triangulación de 4 calibraciones reales + 2 documentos BI de ForumPHs.
**Estado:** PENDIENTE de usarse en el upgrade del/los skill(s) de genome-calibration. Sam lo mantiene a mano.
**Regla de gobernanza:** generado por Claude, NO pusheado por Claude. Sam lo sube por GitHub Desktop (o CC vía rama+PR).

---

## 0. POR QUÉ EXISTE ESTE DOCUMENTO

En la sesión R4B de ForumPHs (2026-07-17) apareció, por tercera vez, el mismo hallazgo que Sam ya había marcado el 2026-07-02 (calibración NSCF) sin que se implementara: **el generador del bucle Boids produce texto "correcto pero tibio" porque calibra la identidad de la voz SIN cargar (a) el arsenal profundo de comunicación y (b) las capas de estímulo psicológico (psycho-presets) que el resto del pipeline sí tiene.**

Diagnóstico técnico confirmado en esa sesión (lectura de código en vivo):
- `calibrate.ts` (`buildSystemPrompt`) SÍ tiene el "techo de producción" (§6 del Tratado): abre con "Eres el mejor comunicador de marca del mundo" y ordena variar la técnica cada turno. Pero **enumera técnicas por nombre, no las opera con maestría** (dominio del español, adaptación de audiencia, transmisión de la voz del emisor).
- `calibrate.ts` **NO lee `psycho_presets` ni `objective_by_platform`.** Los psycho-presets (13 activos, 4 familias: CONVERSION/COMMUNITY/AUTHORITY/BRIDGE) viven solo en `fanout.ts` (Ruta B), DESPUÉS de la generación. El bucle calibra a ciegas del objetivo psicológico → tiende al default conservador AUTHORITY → sale tibio para conversión.
- El AIFE (`aife-filter`) tampoco corre dentro del bucle — es capa posterior del carril automático.

**Conclusión de diseño:** el conocimiento de comunicación avanzada YA se destiló una vez (vive dentro del genoma `nscf_conversion` como `technique_variation_rule` con arsenal explícito y reglas de forma microtécnicas), pero **atrapado dentro de un genoma de marca, no en una capa reutilizable.** Cada marca nueva lo re-destila desde cero. Un skill-por-tipo-de-voz (o una capa compartida) evitaría esa duplicación: el arsenal + los modos + AIFE/PSY viven una vez; cada genoma solo aporta lo único de su marca.

---

## 1. LOS MODOS DE PENSAMIENTO DEL CALIBRADOR (TRANSVERSALES)

Destilados de 4 calibraciones. Aparecen repetidamente y son transversales a todo tipo de voz (con parametrización por tipo — ver §4).

### A · Economía al servicio del objetivo
- **Di lo que SÍ hacemos, nunca lo que NO somos.** Nunca construcción por oposición ni por negación. (NSCF, D7H t5-t6, FPHs)
- **Si NO aporta al objetivo, NO lo menciones.** (FPHs — regla nueva 2026-07-17). Ejemplo: mencionar el alcance de servicio ("FPHs prepara y acompaña; la JD decide") en una pieza de CONVERSIÓN no convierte — es restricción de contrato, no argumento de venta. Vive en FAQ/contrato, no en el copy.
- **No aclarar lo que nadie preguntó.** El disclaimer no pedido INSTALA la duda que no existía. "Para eso son las FAQ." (D7H t5, t7, t10: "deja de aclarar que los resultados pueden variar")

### B · La fortaleza real es la bandera
- **Usa la mayor fortaleza como bandera, no la transparencia/honestidad.** Ingredientes+propiedades (D7H t2), diagnóstico preciso+ciencia (NSCF), resultado medible del sistema (FPHs). NUNCA la honestidad como bandera (eso es declarar, no demostrar).
- **Autoridad por contraste:** la marca/voz nace de hacer lo que los demás no hacen. (NSCF `authority_by_contrast`; FPHs: "el dato que ningún administrador previo midió")

### C · Debe VENDER (voces de conversión)
- **CTA obligatorio + marca repetida ≥2 veces + cierre reservado para la marca/CTA.** (D7H t7; NSCF `closing_law`)
- **Decir por qué elegirnos — con resultado, no con adjetivo.** (FPHs: "no me has dicho por qué deberías ser tú el elegido")
- **QA contra el objetivo ANTES de entregar.** El generador se autoevalúa contra el objetivo comercial antes de proponer. (D7H t6)

### D · Demuestra, no declara (implementación operativa de la regla dura)
- **Promesa → testimonio de tercero.** La marca no promete "resultados en 15 días"; una usuaria que lo dice, sí. El testimonio dice lo que la marca no puede afirmar. (D7H t9-t10; NSCF)
- **Precisión, no vaguedad.** "cada semana" no "casi cada semana"; "días" no "semanas" (precisión sensorial del consumidor). Lo impreciso invita a la duda; el marketing afirma. (NSCF `precision_not_vagueness`; D7H t10)
- **El dato preciso / el título verificable ES la credencial.** (regla dura; NSCF: la ciencia como respaldo, no jerga que aleje)

### E · Técnica de apertura y arrastre (arsenal de conversión)
- **Escena, no pregunta.** Una pregunta puede responderse en contra ("¿te acuerdas de cómo se sentía tu cabello?" → "no, nunca me pasó" y la perdiste). (NSCF `scene_not_question`)
- **Desplazamiento de protagonista:** abrir con un tercero, dejar que el lector se reconozca solo, luego girar la cámara hacia él. (NSCF `protagonist_displacement`)
- **Punto de no retorno:** en el giro, pasar a tuteo directo y no soltar hasta el cierre. (NSCF `point_of_no_return`)
- **Presunción de compañía:** cerrar el sí/no por volumen social ("supongo que a ti, igual que a cientos de mujeres en Florida…"). (NSCF `company_presumption`)
- **Falso binario con remate reflexivo inmediato:** si se abre con "hay dos tipos de…", rematar con la pregunta-espejo ("¿cuál de las dos eres tú?") que no espera respuesta. (NSCF)

### F · Regla dura anti-invención
- **Nunca inventar; si no sabés, preguntá o buscá en la DB.** El generador debe leer el conocimiento REAL de la marca (product_blueprints, brand_services). founder_axis = dirección de voz (hipótesis), NO cuerpo de conocimiento. (D7H t3-t4-t6: inventó Serenoa repens/Ortiga/Ginkgo/glicerina, todos vetados; NSCF `prescription_substance_rule`)

### G · Variación técnica con voz constante (el techo de producción)
- **La voz es constante; la técnica varía pieza a pieza, sin reincidir.** Requiere MEMORIA de lo ya generado. Sin memoria, el generador repite la misma técnica y colapsa la voz en fórmula. (NSCF `technique_variation_rule`; Tratado §6)
- **El arsenal debe estar OPERADO, no enumerado.** "El mejor marketer del mundo, experto comunicador que entiende todo el proceso de comunicación y sus profundidades, con vocabulario profundo en ES y EN." (Sam, cita literal 2026-07-02). El español es amplio y rico: permite decir lo mismo de mil maneras — apoyarse en las técnicas de comunicación con oficio, no nombrarlas.

---

## 2. MODOS ESPECÍFICOS DE FILO ALTO / EDITORIAL (de la calibración de Lucien)

Estos son de otra naturaleza (filo 9/10, editorial largo, motor filosófico). Aportan matices que las voces de conversión no muestran.

- **El motor (eje fundador) ANTES que las dimensiones.** Las dimensiones ya aprobadas se REESCRIBEN cuando entra el eje. Un genoma sin motor es técnica sin alma. El eje übermensch/la cerilla reescribió todas las dimensiones de Lucien. (Lucien, 1-jun)
- **Revelación, no agresión.** "La cerilla quema la manta de paja, no al lector." La crueldad destruye; la revelación devuelve la elección. El momento de la verdad es del lector, no del emisor. → Conecta con TODAS: el filo apunta al PATRÓN, jamás a la persona.
- **La pérdida de audiencia como FUNCIÓN, no daño colateral.** "El que se ofende y se va nunca fue el mercado." Específico de voces de autoridad/editorial (dividir por diseño), NO de conversión (donde acoger es la función).
- **Crudeza = debilidad; palabra afilada-pero-real = fuerza.** La grosería ruega reacción; la palabra afilada busca lo que es. Nunca confundir impacto con vulgaridad. (= "filo con estilo, no burdo ni corriente" de NSCF)
- **El motor filosófico NUNCA se nombra.** "Un übermensch que cita a Nietzsche se delata." Se encarna en cada movimiento, se cita en ninguno. (= regla dura "demuestra, no declara" en su forma pura)
- **Riesgos cuantificados + mitigaciones codificadas en las dimensiones, no como notas aparte.** (Lucien: ~85% el molde queda debajo del genoma; ~40% suena cruel en ES; ~30% colisión comercial → cada uno mitigado dentro de un campo del genoma)
- **Bilingüe = re-anclar, no traducir.** El filo se mantiene en ES pero se ancla en el argumento, nunca en el insulto: el español castiga la arrogancia distinto al inglés. ES/EN se generan por separado desde origen.
- **Arsenal sintáctico editorial:** triplete de corrección (no-X, no-Y, no-Z → es Z) · frase-pivote que gira el párrafo · em-dash como distancia no emoción · diagnóstico frío · nunca abrir con pregunta (afirma, no pide permiso) · párrafo como estructura portante · cierre en la frase más fría y verdadera, sin CTA ni lección.
- **Correcciones finas del muestreo v0.5→v1.0 (24-jun):** generativo no reactivo (parte de su mirada formada, no espera input para desmontar) · blanco concreto y reconocible, no categoría abstracta · el filo aterriza material y presente (bolsillos, cartera de clientes, vergüenza ya vivida), nunca epifanía futura · sin salida digna para el blanco ("siempre lo supo") · comprime en imagen-sentencia ("marionetas", "vivió el primer año 30 veces", "muebles que opinan") · hiere con garbo/léxico elevado, nunca crudeza directa · constructor antes que destructor (escribe PARA el afín inteligente, no CONTRA el tonto) · restraint como poder (tiene munición pesada — política, religión — y elige no usarla por temperamento) · pregunta-cuchillo de baja frecuencia que no espera respuesta · cierre que reposiciona al sujeto ("él es el insumo").

---

## 3. EL REPARTO GENOMA ↔ ANGLE (capa brand_topics — Fase 5)

Modo estructural que conecta la voz (genoma) con el territorio (brand_topic). Destilado del caso #5i (Lucien, 17/24-jun).

**Principio madre (Sam, 24-jun):**
> El `core_move` de un genoma es una **disposición — el tipo de mirada —, no un procedimiento ejecutable.** Codificarlo como receta literal ("desmonta la palabra X") hace que el modelo lo ejecute como algoritmo y la voz colapse en fórmula. El core_move vive en el genoma y permanece como *operación de pensamiento*; el angle vive en el brand_topic y aporta solo el **territorio** donde esa mirada se posa — nunca la mirada, nunca una instancia concreta de ella. Cuando el error está en la raíz (el genoma), se corrige en la raíz, no se parchea en el territorio.

**El caso que lo reveló:** el angle de ai-cognition DUPLICABA el core_move del genoma → lo fijaba como regla dura por-dominio → Lucien salía idéntico siempre. Síntomas: (1) el angle repetía el motor de la voz; (2) "la geometría del pensamiento" se volvió etiqueta temática obligatoria; (3) los otros dominios estaban `null`. Sobre-especificado en uno, vacío en los demás.

**Regla de cómo poblar un angle:**
- El **genoma** lleva el CÓMO (core_move, filo, voz) — constante por marca, heredado a las voces hermanas.
- El **angle** lleva solo el QUÉ/DÓNDE — territorio temático + **barreras** ("nunca manual técnico, eso es UNRLVL"), **jamás la mirada, el tono ni la frase-ancla.**
- Fórmula de redacción del angle (patrón real de Sam): *"Territorio: [dominio]… Lucien ENTRA a este territorio con su propia mirada; el territorio NO le dicta el ángulo ni el tono ni las palabras — eso lo gobierna el genoma. Barrera: [qué es de otra marca]."*

**Regla de arbitraje raíz-vs-territorio:** cuando el error está en la disposición de la voz → se corrige en el genoma (bisturí, preservando lo bueno). Cuando es solo el terreno → se corrige en el angle. Corregir en el genoma es la única corrección que escala (se hereda a las 2 voces × N dominios).

---

## 4. LO TRANSVERSAL VS. LO PARAMETRIZADO POR TIPO DE VOZ

Hallazgo clave para la arquitectura del/los skill(s): la mayoría de los modos (§1) son **transversales**; lo que cambia por tipo de voz es sobre todo **parametrización**, no cuerpo de conocimiento distinto.

**Transversal (el núcleo compartido — candidato a capa única):**
1. El filo apunta al PATRÓN, nunca a la persona.
2. El motor/eje fundador va antes que las dimensiones — sin él, técnica sin alma.
3. Demuestra, no declara; el motor se encarna, no se nombra.
4. Voz constante, técnica variable con arsenal profundo + memoria.
5. Anticipar cómo falla la voz y blindarlo en el genoma.
6. Bilingüe = re-anclar, no traducir.
7. Error de técnica vs. error de intención (triage — ver §5).
8. Regla dura anti-invención (leer conocimiento real de la marca).
9. Reparto genoma↔angle (§3).

**Parametrizado por tipo de voz:**

| | **Conversión** (NSCF, D7H, FPHs) | **Editorial/Autoridad** (Lucien) | **Educativa** (pend.) | **Profesional** (pend.) |
|---|---|---|---|---|
| **Filo** | 5/10 instrumental (mueve a venta) | 9/10 revelación (divide/recluta) | bajo (enseña) | medio (dato entre pares) |
| **Audiencia perdida** | se minimiza (acoge) | es la función (filtra) | se minimiza | neutra |
| **Cierre** | CTA/marca/diagnóstico | frase fría, sin CTA ni lección | recurso/siguiente paso | propuesta de negocio |
| **Blanco** | el patrón (consejo genérico, admin reactivo) | el patrón (la manta de paja) | la confusión del que aprende | la ineficiencia del oficio |
| **Familia PSY** | CONVERSION (urgency/scarcity/fomo/social_proof) — con cuidado de no romper calidez | AUTHORITY (authority/trust/contrast) | AUTHORITY/BRIDGE | AUTHORITY |
| **Motor típico** | autoridad-por-contraste + ciencia/dato | eje ideológico encarnado nunca citado | claridad sobre confusión | criterio del oficio |

**Nota de la fórmula marca↔persona (r4b-genome-calibration §1):** la MARCA lleva Conversión/Educativa/Editorial pero NO Profesional (se disuelve); la PERSONA lleva Profesional/Educativa/Editorial. Los 4 tipos de voz de este cuadro se reparten entre las dos entidades.

---

## 5. DISTINCIÓN ERROR-DE-TÉCNICA VS ERROR-DE-INTENCIÓN (meta-método del bucle)

Del intercambio NSCF (el "1/10" que detuvo el bucle para conversar el eje moral). Es un procedimiento de triage que el bucle debe contemplar:

- **Error de TÉCNICA (menor):** repertorio retórico mal ejecutado (falso binario sin remate). Va al arsenal, se repara en el acto, el bucle continúa.
- **Error de INTENCIÓN (profundo):** algo que traiciona el posicionamiento / el eje moral. NO se parchea en el siguiente texto — **se sale del bucle a una conversación de eje** y se vuelve. Regla: "esto no es un NO de superficie — es la pieza más profunda del genoma, merece hablarse, no parchearse en una 11/10."

Consecuencia para `/api/calibrate.ts`: el bucle no siempre avanza al siguiente turno. El endpoint hoy solo genera el siguiente; falta contemplar el "pausar para conversar el eje". Los dos ejes ya capturados (`verdict_voice` = ¿suena? / `notes_intent` = ¿hace lo estratégico?) son la base; un "SÍ pero" cierra voz y abre intención.

---

## 6. APPROACH AL DOLIENTE — CASO ForumPHs (del BI real)

Destilado de los 2 documentos BI de ForumPHs (Suite Gestión Financiera + Gestión de Cartera). **Se toma la voz/técnica, NO el alcance de servicio.**

**Técnica de reencuadre patrimonial:**
- **Reencuadre de equidad colectiva:** "la morosidad no es un problema de cobros — es un riesgo patrimonial que los propietarios al día están financiando involuntariamente." Convierte un problema bilateral en uno de equidad. (= desplazamiento de protagonista + fortaleza-como-bandera)
- **Cuantificar lo que otros dejan vago:** "110% de mora crítica — ningún administrador previo lo midió así." Convierte una cifra abstracta en decisión urgente. (= el dato como credencial)
- **Lenguaje patrimonial, no punitivo:** "Su unidad tiene un saldo pendiente que afecta su participación en servicios comunes." Reencuadra, no amenaza.
- **La JD decide, FPHs prepara y acompaña.** (coincide con el alcance corregido — es RESTRICCIÓN, no mensaje de venta)

**CORRECCIÓN DE ALCANCE (crítica — reunión Sam×Ivette):** la gestión de mora de FPHs es SISTEMÁTICA pero **PASIVA**. FPHs se limita a gestión técnica (notificaciones, timing, escalamiento de aviso). Al llegar a etapa superior, FPHs **PROPONE acciones a la JD**; la JD toma las medidas coactivas y contrata abogados externos. **FPHs NO toma acciones legales en nombre de ningún PH.** El doc de Cartera describe (carta extrajudicial firmada por Ivette como abogada del PH, proceso ejecutivo por FPHs) cosas que el genoma NO debe reflejar como servicio. La voz toma el reencuadre/cuantificación/lenguaje; NO promete lo que el servicio no hace.

---

## 7. IMPLICACIONES PARA EL/LOS SKILL(S) (para la discusión de arquitectura)

Observaciones que fundamentaron la arquitectura (DECIDIDA en §8: capa primaria + perfiles secundarios a necesidad):

1. El conocimiento de comunicación avanzada + arsenal + AIFE/PSY es MAYORMENTE transversal (§4). La diferencia por tipo de voz es más parametrización que cuerpo distinto → favorece capa compartida sobre 4 skills independientes con todo duplicado.
2. Hoy ese conocimiento vive DUPLICADO dentro de cada genoma de marca (ej. `nscf_conversion.technique_variation_rule`). Una capa reutilizable lo destila una vez.
3. El generador del bucle (`calibrate.ts`) debe CARGAR: (a) el arsenal operado (no enumerado), (b) la familia PSY del objetivo declarado, (c) la memoria anti-repetición. Hoy no carga (b) ni opera (a).
4. El patrón de skills del ecosistema es ORQUESTAR, no duplicar (r4b invoca genome-calibration). Aplica igual aquí: los skills-por-tipo-de-voz deberían invocar una capa de comunicación compartida, no re-embeberla.
5. Los presets PSY (13, 4 familias) y el AIFE ya existen en el pipeline (`fanout.ts`, `aife-filter`) — el skill debe DECLARARLOS y hacer que se carguen en calibración, no re-crearlos.

---

## 8. ARQUITECTURA DECIDIDA — CAPA PRIMARIA + PERFILES SECUNDARIOS (2026-07-17)

Decisión de Sam: **un skill primario que carga secundarios a necesidad.** Separado por tipo de voz (para poder engordar un tipo sin trastocar los otros), pero SIN duplicar el núcleo común.

### Estructura

- **`voice-craft` (PRIMARIO / capa compartida)** — se carga siempre que se calibra o genera cualquier voz. Contiene lo TRANSVERSAL (§4):
  1. Los 9 modos transversales (§1 + §4).
  2. El arsenal de comunicación OPERADO (no enumerado): técnicas ejecutadas con dominio del español/inglés, adaptación de audiencia, transmisión de la voz del emisor.
  3. La regla dura de voz (demuestra/nunca declara).
  4. Las capas del pipeline DECLARADAS (no re-creadas): psycho_presets (13, 4 familias), AIFE, objective_by_platform — el skill dice que existen y que deben cargarse en calibración.
  5. El reparto genoma↔angle (§3).
  6. El triage error-de-técnica vs error-de-intención (§5).
  7. El techo de producción (voz constante, técnica variable + memoria anti-repetición).

- **`voice-conversion` / `voice-editorial` / `voice-educative` / `voice-professional` (SECUNDARIOS / perfiles delgados)** — se cargan a necesidad según el tipo de voz que se calibra. Cada uno lleva SOLO:
  - Su **parametrización** (del cuadro §4): nivel de filo, política de audiencia perdida, forma de cierre, familia PSY aplicable, blanco típico.
  - Sus **técnicas propias** (el arsenal específico de ese tipo).
  - Invoca `voice-craft` para todo lo común.

### Por qué esta forma (y no 4 skills independientes)

- **El núcleo común es grande** (~80% de lo que hace bueno a un skill de voz es transversal — confirmado leyendo 4 calibraciones). Cuando el núcleo común es grande, la capa compartida gana; cuando es pequeño, gana la independencia. Acá es grande.
- **Aislamiento de cambios SIN drift:** agregar una técnica nueva de conversión → se toca SOLO `voice-conversion`, nada más se entera (lo que Sam quería: "mismo skill con vitamina A/B/C/D"). Pero la vitamina común no se copia 4 veces — vive en `voice-craft`.
- **4 independientes con todo embebido** obligaría a editar cada modo transversal nuevo en 4 lugares → dos (cuatro) vocabularios desincronizados. Es el drift que el ecosistema ya sufrió (model ID retirado, CLAUDE.md duplicado, arsenal re-destilado por marca).
- **Coherente con el patrón del ecosistema:** ORQUESTAR, no duplicar (igual que `r4b-genome-calibration` invoca `genome-calibration`; regla del propio Tratado: "antes de escribir un orquestador, leer el skill que va a delegar").

### Relación con los skills existentes

- **`genome-calibration` (el Tratado)** sigue siendo la fuente única del MÉTODO del bucle Boids. `voice-craft` NO lo reemplaza — le aporta la capa de comunicación/arsenal/PSY que hoy le falta al generador. A definir en el upgrade: si `voice-craft` es una expansión de `genome-calibration` o un skill hermano que éste invoca.
- **`r4b-genome-calibration`** (orquestador de-cero-a-R4B) invocaría el perfil secundario correcto según el tipo de voz que toque calibrar en la Fase 3.
- **`content-pipeline`** (todo output de texto público) también debería consumir `voice-craft` + el perfil, para que la GENERACIÓN (no solo la calibración) use el arsenal operado.

### Pendiente de definir en el upgrade (no ahora)

- Nombre final del primario (`voice-craft` es tentativo).
- Si `voice-craft` absorbe o hermana a `genome-calibration`.
- Cómo el generador de `/api/calibrate.ts` carga en runtime el arsenal + la familia PSY del objetivo (hoy no lo hace — §0).
- Registro en `skills/INDEX.md` (reglas de carga: primario siempre, secundario por tipo de voz declarado).

---

## FUENTES (calibraciones reales trianguladas)

- **Lucien editorial** (`lucien_editorial` v0.5→v1.0): conversaciones "B/C - AIID v2 Blogs UNRLVL/Lucien" (1-2 jun) + "C - AIID vMultiMarcas" (24-jun, muestreo v1.0 + reparto genoma↔angle #5i).
- **NSCF conversión** (`nscf_conversion` v0.5): "F2 - IID - Seeds - Expert" (2-jul). Bucle de 10 piezas; el "1/10" que destiló el eje moral.
- **D7Herbal conversión** (`d7herbal_conversion` v1.0): sesión 10-jul, bucle fb0b08ab (10 turnos persistidos en `intel.calibration_turns`).
- **ForumPHs conversión** (`fphs_conversion` v1.0): sesión 17-jul, recalibración quirúrgica + turnos 1-3 del bucle (sesión `e1c33c9b`) + 2 documentos BI reales.

_Fin — CALIBRATOR_MINDSET.md · insumo de diseño · Unrealville IID · 2026-07-17_
