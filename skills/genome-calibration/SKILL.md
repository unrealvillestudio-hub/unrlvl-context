# SKILL — genome-calibration (Tratado de Creación de Genomas)

**Versión:** v1.0 · **Creado:** 2026-07-02 · **Rama:** IID / Voice Genome
**Naturaleza:** PROTOCOLO convocable. No es un documento de referencia pasivo — es el guion que Claude ejecuta para conducir a un operador (Sam, Marisol, o un usuario delegado) por la creación completa de un `brand_voice_genome`.
**Disparadores:** "calibrar genoma", "bucle Boids", "crear la voz de [marca]", entrada E5b desde la UI de Marisol, o cualquier sesión cuyo objetivo sea destilar/validar una voz de marca.
**Relación con el sistema:** este skill es la FUENTE ÚNICA del método. Lo consumen (a) el bucle E5b en la UI del Orchestrator vía `/api/calibrate.ts`, y (b) el OnboardingApp (Fase Voice Genome) cuando se construya. Un método, múltiples consumidores. Si el método cambia, cambia aquí y solo aquí.

---

## 0. QUÉ ES UN GENOMA Y QUÉ NO

Un `brand_voice_genome` es la **disposición** de una voz, no un catálogo de frases hechas. Codifica CÓMO piensa y se mueve una voz, no QUÉ dice en cada pieza. El error capital es colapsar la voz en fórmula: si el genoma prescribe una sola receta literal ("abre con escena, cierra con producto"), el sistema produce contenido monótono y la voz muere. El genoma gobierna la identidad; la técnica varía pieza a pieza (ver §6).

Dos ramas de construcción según el tipo de entidad (determinar al inicio, ramifica todo el resto):

- **Voz Extraída** — persona/marca real con material fuente (textos, About, registro conversacional, tablas de personas ya pobladas). Se construye extrayendo de ese material. Puede aspirar a v1.0 si hay material suficiente.
- **Voz Diseñada** — personaje o marca sintética sin material real que extraer. La voz se define por diseño editorial + el eje fundador que aporta el dueño en vivo. Topa en v0.5 al crear; sube a v1.0 solo tras validar outputs reales.

---

## 1. LOS DOS EJES DE LA CALIBRACIÓN (principio rector)

La calibración tiene **dos ejes distintos que no deben fundirse**:

1. **VOZ** — ¿suena a la marca? Es lo que el bucle Boids converge con el SÍ/NO. Responde a identidad: léxico, registro, temperamento, relación con el lector.
2. **INTENCIÓN** — ¿hace lo que estratégicamente debe hacer? La técnica de comunicación, el blanco correcto, el orden del mensaje, dónde aterriza el cierre. Un texto puede sonar 100% a la marca (voz convergida) y AUN ASÍ fallar en intención.

**Consecuencia operativa:** el bucle captura DOS señales por separado — `verdict_voice` (SÍ/NO de sonido de marca) y `notes_intent` (la observación estratégica). La convergencia de voz (§4) NO cierra el genoma; la intención emerge de la conversación estratégica y produce con frecuencia los campos más profundos (el eje moral, el blanco, el filo).

Regla de campo: cuando un operador dice "SÍ pero…", el "SÍ" cierra voz y el "pero" abre intención. Nunca tratar un "SÍ pero" como fallo de convergencia — es a menudo la veta más rica.

---

## 2. FASE 1 — TRIANGULACIÓN DE FUENTES (obligatoria, nunca saltar)

Antes de tocar una sola dimensión del genoma, mapear qué CAPA aporta cada fuente. Una misma fuente puede ser válida para una capa e inválida para otra.

Capas a separar: **tema** (de qué habla) · **temperamento** (con qué carácter/filo) · **registro** (nivel de léxico, formalidad) · **relación** (cómo trata al lector) · **estructura** (cómo arma el mensaje).

Procedimiento:
1. Leer TODAS las fuentes disponibles (archivos, About, tablas `brand_personas`/`humanize_profiles` si existen, ejemplares reales de contenido, blueprints).
2. Para cada fuente, declarar qué capa(s) aporta y en cuáles es MUDA o CONTAMINANTE.
3. Mostrar al operador DÓNDE una fuente se aleja de la voz objetivo, y que lo valide.

Sin este paso se captura voz domesticada/sesgada — el error original que deja marcas sin genoma real (caen al fallback genérico growth-marketer).

**Riesgo de destilar de memoria:** cuando Claude "conoce" al sujeto, la tentación es destilar de memoria. Eso produce la-interpretación-de-Claude, no el sujeto. El conocimiento previo SESGA; el material ANCLA. Exigir material real aunque parezca conocer la voz.

**Corolario:** lo que para una voz es contaminación, para otra es material legítimo (un artículo domesticado es basura para un personaje con filo alto, pero muestra válida de la voz de su vocero).

---

## 3. FASE 2 — EJE FUNDADOR

El eje fundador es el MOTOR de la voz: qué defiende, contra qué, para quién. Es el equivalente al "übermensch + la cerilla que quema la manta de paja + reclutar afines" de Lucien, o al "autoridad-por-contraste contra el asesoramiento genérico" de NeuroneSCF.

Dónde vive el eje según el modo de entrada:
- **Desde material capturado** (puerta "desde Genoma" en E5b): el eje está EMBEBIDO en el OCR de `intel.captured_techniques` o en las tablas de personas ya pobladas. NO es un cuestionario aparte — se destila del material de arranque.
- **Desde cero** (puerta "desde cero"): el eje lo aporta el dueño en vivo o se siembra con posts/textos semilla. Para Voz Diseñada, el eje fundador (el "porqué" del filo, el motor de mercado) lo da el dueño en vivo SIEMPRE — el temperamento puede venir de archivos, pero el eje no.

Sin eje fundador, un filo alto suena a edgelord; con él, suena a autoridad. Capturar el eje ANTES de generar el primer texto del bucle.

---

## 4. FASE 3 — EL BUCLE BOIDS (mecánica exacta)

La mecánica, validada en vivo (Sam×Claude sobre NeuroneSCF y sobre Lucien):

1. **Claude PROPONE un texto** — su hipótesis de la voz, construida desde el eje fundador + lo aprendido de veredictos previos. Claude genera SIEMPRE; el operador nunca escribe la prosa.
2. **Claude pregunta:** "¿es [marca]? SÍ / NO".
3. **El operador responde SÍ/NO + SU VISIÓN DEL PORQUÉ.** No una reescritura — su criterio. El porqué es el motor real de la destilación; el SÍ/NO solo marca convergencia.
4. **Claude calibra** con esa visión (refina su modelo interno de la voz) y propone el siguiente texto.
5. Repetir hasta **CONVERGENCIA**.

**Regla de convergencia:** mínimo 10 textos Y los últimos 3 marcados SÍ consecutivos. Si nunca se logran 3 SÍ seguidos, no hay voz definida aún (resultado válido, no fracaso — se documenta y se decide si seguir o replantear el eje).

**Por qué Claude genera y no el operador:** el operador (sobre todo un delegado como Marisol) sabe RECONOCER la voz y EXPLICAR por qué un intento falla — eso lo tiene como experto de dominio. No necesariamente sabe ESCRIBIR la voz. Pedirle criterio es realista; pedirle prosa no. (Nota histórica: en el ejercicio original de Lucien el operador SÍ escribía, pero Sam mismo registró el límite — "esto calibra criterio, no valida producción" — y la mecánica se corrigió a Claude-genera para el sistema.)

**Variación deliberada durante el bucle:** Claude varía facetas, personas, técnicas y mete "trampas" a propósito (piezas reactivas/genéricas/blandas) para calibrar el criterio del operador contra rango, sin decir cuál es cuál. Las trampas que el operador caza confirman que el criterio discrimina.

**Persistencia (D1/D4 — obligatoria):** toda la sesión se persiste en `intel.calibration_sessions` — cada texto, cada `verdict_voice`, cada `notes_intent`, las recalibraciones y el flag de convergencia. Doble propósito: (a) no perder trabajo (la convergencia puede tomar días); (b) la sesión persistida es la CAJA NEGRA del genoma — permite diagnóstico y corrección posterior de cómo se construyó cada voz.

---

## 5. FASE 4 — DESTILACIÓN AL GENOMA (E6, bajo HRD)

La escritura del `brand_voice_genome` final NO ocurre en la UI del operador — ocurre en el chat Sam×Claude bajo checkpoint HRD. El bucle produce la materia prima (textos + veredictos + intención); E6 la destila a las dimensiones JSONB.

**Método quirúrgico (recomendado sobre reescritura completa):** si ya existe un genoma v0.5, corregir la RAÍZ (el `core_move`/`argumentative_architecture` contaminado) y AÑADIR los rasgos nuevos que el bucle reveló, preservando lo que ya estaba bien. Un genoma v0.5 suele tener rango de sobra; el problema casi siempre es el `core_move` reactivo y el `angle` que lo fijaba, no el genoma entero. No tirar lo que funciona.

Formato: espejar el JSONB de un genoma de oro existente (`unrlvl_default` v1.0) SOLO en formato, nunca en contenido. Las dimensiones canónicas: `identity_anchors`, `lexicon_signature`, `lexicon_forbidden`, `syntactic_signatures`, `argumentative_architecture`, `relational_stance`, `emotional_register`, `prohibited_registers`, `application_constraints`.

---

## 6. TECHO DE PRODUCCIÓN — VOZ CONSTANTE, TÉCNICA VARIABLE

El generador debe portar el arsenal completo del comunicador experto — el mejor marketer del mundo, que entiende el proceso de comunicación en profundidad y maneja vocabulario riquísimo en ES y EN. La voz es constante; la TÉCNICA varía pieza a pieza.

Dos capas que nunca deben fundirse:
- **Capa IDENTIDAD** (constante, la que calibra el bucle): lo que hace que un texto suene a la marca.
- **Capa TÉCNICA** (variable, rica): las estrategias de comunicación que expresan esa identidad — storytelling, contraste/falso binario, analogía, comparación con un mejor, dato-ancla, reencuadre, objeción anticipada, testimonio de tercero, escena, principio invertido, diagnóstico, y decenas más. El generador elige según objetivo/persona/plataforma y NO reincide.

**Implicación técnica:** variar técnica exige MEMORIA de lo ya generado (`creative_seed` / `loadRecentPieces` del eje B). Sin memoria, el generador repite la misma técnica y colapsa la voz en fórmula. La riqueza NO es adorno — es el techo de calidad del sistema y debe estar en el prompt del generador y en la selección con memoria.

---

## 7. VOCES HERMANAS — CUÁNDO UNA MARCA NECESITA VARIOS voice_id

Una entidad puede necesitar MÚLTIPLES voice_id que comparten temperamento/núcleo pero difieren en respiración. Criterio de decisión:

- ¿Cambia el **léxico/registro/relación/objetivo**? → **otro voice_id**.
- ¿Cambia **solo la longitud**? → mismo genoma, modular por `application_constraints`.

Ejemplos canónicos:
- **Lucien:** `lucien_editorial` (respira largo, ensayo) + `lucien_social` (muerde corto, estocada). Mismo temperamento, distinta respiración.
- **NeuroneSCF:** `nscf_editorial` (Hair Intelligence — enseña, recluta lectoras, invoca la ciencia) + `nscf_conversion` (marketing directo, convierte) + `nscf_professional` (B2B, dato primero, entre pares). Mismo núcleo (Patricia percibida + Neurone solución + adversario del consejo genérico), distinta respiración/objetivo.

Para voces-vocero: capturar un "modo cita" que apunta a la voz de otro POR DESTINO (ver §8).

---

## 8. REGLAS TRANSVERSALES DE VOZ

**Bilingüe = mismo genoma, reescritura NO traducción.** ES y EN aplican el mismo genoma pero se generan por separado desde origen en cada idioma. Nunca traducir de uno al otro. Registro neutro internacional salvo que la marca defina lo contrario (NSCF: ES neutro + EN neutro, SIN regionalismos).

**Cita-por-destino (para vocería):** cuando un vocero cita a otra voz, el genoma citado lo elige el DESTINO del enlace, no un default. El fragmento citado debe sonar como el lugar adonde aterriza el lector — la voz es una promesa que el destino cumple. (X/Meta/TikTok → voz social; sitio propio o post nativo largo → voz editorial.)

**El motor filosófico interno nunca se nombra.** Si una voz tiene un motor (übermensch, o cualquier eje ideológico), es INTERNO — se manifiesta en cada movimiento, se cita en ninguno. Nombrarlo delata y pide permiso a una autoridad externa.

**Validación de plataforma vs cuentas reales:** el genoma declara `application_constraints.platforms`; cruzar contra cuentas que existen de verdad y marcar warning si falta. No declarar plataforma sin capacidad de publicar.

---

## 9. ANEXO — CASO NEURONESCF (ejemplar de referencia)

Primer genoma calibrado con este protocolo. Sirve de few-shot para futuras marcas de servicio/producto con respaldo de un experto real.

**Núcleo común (las 3 voces):** Patricia Osorio como respaldo PERCIBIDO, no declarado (la autoridad se siente en la precisión del diagnóstico, no en la placa de "35 años") · Neurone como solución · la lectora/cliente como protagonista · la CIENCIA Neurone (neurocosmética, nanotribología, acción multinivel, 40+ años) como prueba última de autoridad · ES y EN neutros sin regionalismos, generados por separado.

**Eje moral (los 3 campos que lo sostienen):**
1. **Autoridad-por-contraste:** la marca nace de hacer lo que los demás no hacen — asesorar personalizado frente a las dificultades reales del clima de Florida.
2. **Blanco/adversario:** el ASESORAMIENTO GENÉRICO Y CONVENIENTE (el consejo sesgado por la renta del salón, "te ofrezco de lo que vendo aquí"). Es un FENÓMENO, nunca la clienta (a quien se acoge), nunca el estilista como persona ni guerra abierta al gremio B2B (el estilista es redimible; el B2B le vende cómo dejar de dar consejo genérico).
3. **Prohibición:** nunca ABSOLVER la falla genérica ("tu colorista hizo su parte" está prohibido — absolver es cometer la misma falta que se critica), ni personalizarla en un individuo.

**Target:** el cliente INVIERTE en su cabello, NO compra en el súper. "El producto que compraste en el súper" la insulta y la pierde. El adversario no es el gasto bajo — es el consejo genérico que recibe incluso gastando bien.

**Filo:** 5/10 — instrumental (corta para MOVER, no para herir). Impactante sin ser burdo ni corriente; con estilo y sentido; busca reacción → conversión → decisión → venta → recompra. Cada corte tiene función comercial. (Contraste con Lucien 9/10, que dividía por diseño; NSCF convierte por diseño.)

**Reglas de forma (microtécnica, destiladas del bucle):**
1. Regla de oro: nunca preguntar lo que puede responderse en contra ("¿te acuerdas de cómo se sentía tu cabello?" → "no, nunca me pasó" y la perdiste). Usar ESCENA, no pregunta.
2. Desplazamiento de protagonista: abrir con un tercero (lo que las clientas le dicen a PO), dejar que la lectora se reconozca sola, luego girar la cámara hacia ella.
3. Presunción de compañía: no "si a ti también te suena" (abre duda) sino "supongo que a ti, igual que a cientos de mujeres en Florida…" — cierra el sí/no por volumen social.
4. Precisión, no vaguedad: "cada semana", no "casi cada semana" (lo impreciso invita a la duda; el marketing afirma).
5. Punto de no retorno: en el instante del giro, pasar a TUTEO DIRECTO ("te digo algo… y te digo más…") y no soltarla hasta el cierre — el tuteo la fuerza a identificarse.
6. Ley del cierre: lo último que lee es lo que queda. El giro hacia ella va en el CUERPO; el cierre se reserva para Neurone/CTA.
7. Estructura mínima de 3 partes (hay más): plantear el punto de análisis → meter al visitante dentro sin que lo espere → conclusión/cierre. El CTA puede ser servicio ("solicítale a Patricia un diagnóstico gratuito en neuronescflorida.com"), no solo producto.

**Estado:** `nscf_conversion` convergido por bucle (10 piezas, últimas 3 SÍ). `nscf_editorial` identificado con molde real (Hair Intelligence) pero pendiente de su propia pasada de bucle. `nscf_professional` (B2B) declarado en `brand_personas`, fuera de mapa por ahora.

---

## 10. ORDEN DE EJECUCIÓN (resumen convocable)

1. Determinar rama: Voz Extraída vs Voz Diseñada.
2. Triangular fuentes (§2) — obligatorio, mostrar al operador dónde cada fuente se desvía.
3. Capturar eje fundador (§3).
4. Correr el bucle Boids (§4) — Claude propone, operador juzga SÍ/NO + porqué, persistir todo, converger a 10+3SÍ.
5. Conversación de intención (§1) — resolver los "SÍ pero", destilar el eje moral/blanco/filo.
6. Destilar al genoma bajo HRD (§5) — quirúrgico, en chat Sam×Claude, nunca en la UI del operador.
7. Verificar voces hermanas (§7) — ¿una o varias voice_id?
8. Aplicar reglas transversales (§8) y el techo de producción (§6) al prompt del generador.

_Fin del Tratado v1.0 · genome-calibration · Unrealville IID_

---

## Decisiones de diseño (migradas de AGENDA.md, 2026-08-16)

_Fragmento de `## Notas de contexto` de `AGENDA.md` clasificado como **DECISIÓN de método —
calibración** en el reparto del 2026-08-16 (`protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §2).
Texto íntegro, cortado y pegado — nada resumido, nada reescrito. Es un índice comprimido del
método que este Tratado desarrolla; **la fuente sigue siendo el cuerpo del skill**, no esta
sección._

**Calibración de genoma — método (skill genome-calibration v1.0):** 2 ramas (Voz Extraída / Voz Diseñada) · 2 ejes (voz vs intención, no fundir) · triangulación de fuentes obligatoria · eje fundador embebido en material de arranque · bucle Boids (Claude propone, operador juzga SÍ/NO + porqué, converge 10+3SÍ) · destilación al genoma bajo HRD en el chat (quirúrgico, nunca en UI) · voces hermanas · reglas transversales (bilingüe reescritura no traducción; cita-por-destino; motor filosófico interno nunca se nombra) · techo de producción (voz constante, técnica variable con memoria). Anexo NSCF como ejemplar.
