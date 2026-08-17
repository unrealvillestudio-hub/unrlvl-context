# CONTENT PIPELINE SKILL
## UNRLVL · Versión canónica · v2.7
_v2.7 · 2026-08-16 — añadido el patrón **lab-lee-nunca-construye** (constructor único de snapshots), los 3 headers del detector y el learning del GRANT. El cuerpo v2.6 se conserva íntegro debajo._
**Propietario:** Unrealville Studio · Sam  
**Estado:** ICR ✅ — R4B (Ready for Business)  
**Ruta canónica:** `skills/content-pipeline/SKILL.md`  
**Reemplaza:** v2.5 (2026-05-18)  
**Última actualización:** 2026-05-19 · v2.6

**Cambios v2.6:**
- **Nuevo Layer L1.5 — VOICE_GENOME_INJECTION**: inyección de ADN ejecutable de la voz desde `brand_voice_genome`. Multimarca, multivoz por marca.
- **Documentación formal del Creative Engine v9.0** como capas L14/L15/L16 (ya operativas en CopyLab desde 2026-05-18, ahora documentadas como parte del skill).
- **Nuevo `content_type`**: `product_description_b2c` — descripciones de producto Shopify con voice genome.
- **Nueva REGLA D7H** en L1: cada componente del kit aparece con [rol funcional] + [efecto reconocible]. Sin claims genéricos.
- **Nueva REGLA OUTPUT_SEPARATION**: para descripciones de producto, operativo (orden, frecuencia, cantidad) sale del body y va a output separado `how_to_use_es/en` (metafield o `<details>` HTML como fallback).
- **AUTO-CHECK** extendido a 24 puntos (16 base + 8 voice genome).
- Tabla de activación de layers actualizada con `product_description_b2c` y columnas L1.5/L14/L15/L16.

**Cambios v2.5:**
- Nuevo `content_type`: `email_sequence` — con sequence awareness obligatorio
- Nueva sección `SEQUENCE RULE` en L5 CRO
- Punto 16 en AUTO-CHECK: verificación de diferenciación de secuencia
- NeuroneSCF multimarca: personas B2C actualizadas (7 segmentos por tipo de dolor, sin calificador étnico)
- Voz de PO actualizada: 35+ años Técnica en química capilar · Vizos Cosmetics - The Healing Systems · 3 continentes · Vizos Salón

**Cambios v2.4:**
- Comparaciones climáticas: pool de 25+ ciudades USA con criterios de rotación obligatoria
- Regla explícita: nunca fijar NY/Chicago/Houston como trío por defecto

**Cambios v2.3:**
- Compliance Scope Rule: compliance filtra claims de mecanismo, NO lenguaje experiencial
- Protección de copy con fuerza emocional

---

## 0. ESTÁNDARES DEL ECOSISTEMA

### ICR — Industrial Consistency Ready

Estándar de calidad firma de Unrealville Studio. Una solución alcanza ICR cuando su output es verificablemente consistente bajo las mismas condiciones, sin supervisión manual constante.

Una solución NO es ICR si:
- Su output varía significativamente entre ejecuciones sin razón declarada
- Requiere intervención humana para corregir errores sistemáticos
- No ha pasado QA formal
- Sus reglas de operación no están documentadas en el ecosistema

### QA — Quality Assurance Layer

Verificación de cumplimiento **antes de entregar**.

**Contrato QA:**
- Input: output generado + requerimientos originales
- Output: PASS (entrega) | FAIL (gaps + corrección automática)
- En chat: Claude verifica internamente antes de declarar "listo". Gaps → declarar antes de entregar, nunca después.

---

## 1. ARQUITECTURA DEL PIPELINE

```
INPUT (brief / producto / canal / ad / sequence)
  │
  ├── [L0] AUDIENCE BRIEF       → Quién es el receptor. Pain points. Objeciones.
  │         ├── COMPLIANCE CHECK → ¿Existen compliance_rules para esta marca?
  │         ├── SEQUENCE CHECK  → ¿Es parte de una secuencia? → cargar piezas anteriores
  │         └── VOICE CHECK     → ¿Existe voice_genome activo para esta marca?
  │
  ├── [L1] WRITE                → Draft base desde brand_copy_profiles
  │         └── COMPLIANCE PRE-FILTRO (severity: hard)
  │
  ├── [L1.5] VOICE_GENOME_INJECTION (nuevo en v2.6)
  │         → Inyectar ADN ejecutable desde brand_voice_genome
  │         → Lexicón firmado, sintaxis firmada, arquitectura argumentativa
  │
  ├── [L2] H+AIFE               → Humanización profunda + borrado de huella IA
  ├── [L3] HUMANIZE EMOTIONAL   → Dolor → mecanismo → beneficio sentido
  ├── [L4] PSYCHO               → Capas psicológicas de persuasión
  │
  ├── [L5] CRO                  → Arquitectura de conversión + desarme de objeciones
  │         ├── COMPLIANCE SHAPING (severity: soft)
  │         ├── SEQUENCE RULE   → Si position > 1: mecanismo ≠ pieza anterior
  │         └── OUTPUT_SEPARATION (nuevo v2.6, product_description_b2c)
  │
  ├── [L6] SEO                  → Optimización de búsqueda (si aplica)
  ├── [L7] QA                   → Verificación final
  │
  └── CREATIVE ENGINE (capas paralelas — Creative Engine v9.0):
        ├── [L14] CREATIVE_VECTOR      → Ángulo de entrada (44 vectores en 6 categorías)
        ├── [L15] TENSION_ARCHITECTURE → Curva de presión (10 arquitecturas)
        └── [L16] AGGRO_DIAL           → Intensidad de convicción (5 niveles)
```

**Activación por content_type:**

| Content type | L0 | L1 | **L1.5** | L2 | L3 | L4 | L5 | L6 | L7 | **L14-16** |
|---|---|---|---|---|---|---|---|---|---|---|
| **Product description B2C** (nuevo v2.6) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Descripción producto B2C (legacy) | ✅ | ✅ | med | ✅ | ✅ | ✅ | ✅ | med | ✅ | med |
| Blog post / artículo largo | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | med | ✅ | ✅ | ✅ |
| Ad performance | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Post orgánico | ✅ | ✅ | ✅ | ✅ | ✅ | med | ❌ | ❌ | ✅ | med |
| Descripción producto B2B | ✅ | ✅ | ✅ | ✅ | med | ✅ | ✅ | med | ✅ | med |
| Landing page | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | med | ✅ | ✅ |
| Script de video | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | med | ❌ | ✅ | ✅ |
| Email marketing (standalone) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Email sequence (pieza N≥1)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Contenido UNRLVL / Lucien | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | med | med | ✅ | ✅ |

---

## LAYER 0 · AUDIENCE BRIEF + COMPLIANCE CHECK + SEQUENCE CHECK + VOICE CHECK

**Función:** Cargar el contexto completo de audiencia y voz antes de generar. Fundacional.

### COMPLIANCE CHECK

```
PASO 1: Verificar compliance_rules[brand_id]
   SÍ → cargar todas las reglas por severity:
        hard[]  → pasar a L1 como pre-filtro de generación
        soft[]  → pasar a L5 como constraints de shaping
   NO → BLOCK ⛔ — Declarar gap y proponer reglas antes de continuar.
```

### SEQUENCE CHECK (v2.5)

```
PASO 1: ¿Es este output parte de una secuencia?
   content_type = 'email_sequence' → SÍ obligatorio
   Otros content_types → verificar si el brief indica posición

PASO 2: Si es parte de secuencia:
   → Cargar piezas anteriores desde content_sequence_pieces
   → El output de piezas anteriores es INPUT OBLIGATORIO de L5
   → Si no existen piezas anteriores y position > 1: BLOCK

PASO 3: Registrar el mecanismo primario de cada pieza anterior
   → Este dato es el input crítico del SEQUENCE RULE en L5
```

### VOICE CHECK (nuevo en v2.6)

```
PASO 1: ¿Existe voice_genome activo para esta marca?
   SELECT * FROM brand_voice_genome 
   WHERE brand_id = X AND active = true
   ORDER BY version DESC LIMIT 1;

PASO 2: Si existe → pasar a L1.5 como contexto operativo
   Voice genome contiene: identity_anchors, lexicon_signature, lexicon_forbidden,
   syntactic_signatures, argumentative_architecture, relational_stance,
   emotional_register, prohibited_registers, application_constraints.

PASO 3: Si NO existe → opciones:
   a) Brand con voice descriptivo en humanize_profiles únicamente → operar sin L1.5
      (L3 carga el voice descriptivo desde humanize_profiles como fallback)
   b) Brand sin voice de ningún tipo → declarar deuda documental
      Sugerir captura de voice_genome antes de continuar para outputs críticos

PASO 4: Si content_type tiene múltiples voces (por ejemplo, una marca tiene
        po_consumer y po_b2b):
   → Seleccionar voice_id según target audience
   → Si el brief no especifica → BLOCK y preguntar
```

**Fuentes de datos:**

| Tabla | Para qué |
|---|---|
| `brand_personas` | Perfil completo del receptor |
| `brand_copy_profiles` | Voz de marca descriptiva (fallback de L1.5) |
| `humanize_profiles` | Parámetros H+AIFE |
| **`brand_voice_genome`** (nuevo v2.6) | ADN ejecutable de cada voz de cada marca |
| `compliance_rules` | Reglas hard y soft |
| `brand_goals` | Objetivos estratégicos activos |
| `content_sequence_pieces` | Piezas anteriores de la secuencia activa |
| `output_templates` | Templates canónicos por content_type |
| `creative_compatibility_rules` | Pools de vectors/tensions/aggro permitidos por content_type |
| `creative_vectors`, `tension_architectures`, `aggro_presets` | Tablas del Creative Engine v9.0 |
| `product_blueprints` / SP metafields | Social proof del producto específico |

---

## LAYER 1 · WRITE + COMPLIANCE PRE-FILTRO (hard)

**Función:** Generar el draft base. Las reglas hard actúan como restricciones de generación — nunca se producen, nunca se borran post-generación.

### COMPLIANCE SCOPE RULE (v2.3)

```
COMPLIANCE filtra → CLAIMS DE MECANISMO
  Afirmaciones sobre cómo el producto funciona química, biológica o clínicamente.

  Ejemplos que SÍ activan compliance:
    "penetra la corteza y repara el daño"    → mecanismo biológico absoluto
    "cura la porosidad"                      → claim médico
    "elimina el frizz"                       → resultado garantizado

  Sustitución: "puede ayudar a" / "contribuye a" / "favorece"

COMPLIANCE NO filtra → LENGUAJE EXPERIENCIAL / OBSERVACIONAL
  Descripciones de lo que el usuario nota, siente o vive. No son claims.

  Ejemplos que NO activan compliance:
    "el viernes se parece al lunes"          → observación, no claim
    "el cabello no gana la batalla al mediodía" → descripción de frustración

  Estos NO llevan hedging. Agregárselo destruye la fuerza emocional.
```

### REGLA D7H (nuevo en v2.6 — para descripciones de producto multi-componente)

```
Cada componente del producto/kit aparece con su [ROL FUNCIONAL específico] 
+ [EFECTO RECONOCIBLE en el cabello del cliente].

❌ GENÉRICO: "ayuda a nutrir y reforzar la fibra"
✅ ESPECÍFICO: "lleva keratina hidrolizada y limpia sin arrastrar 
   lo que la fibra necesita — sale del lavado sin esa sensación 
   de cabello chirriante"

Estructura por componente:
  <strong>[Nombre]</strong> + verbo de acción funcional 
  + [qué hace específicamente en el cabello del cliente] 
  + [efecto sensorial reconocible].

Origen: aprendido en d7herbal (clavo antiséptico → previene infección 
folicular → cuero cabelludo deja de inflamarse). Heredado por NSCF 
en sesión 2026-05-19.
```

---

## LAYER 1.5 · VOICE_GENOME_INJECTION (nuevo en v2.6)

**Función:** Inyectar el ADN ejecutable de la voz de marca como contexto operativo del modelo, entre WRITE base y H+AIFE.

### Tabla `brand_voice_genome` — schema

```
brand_voice_genome
├── brand_id, voice_id, voice_label
├── identity_anchors         → quién es, qué autoridad invoca
├── lexicon_signature        → palabras firmadas, signature_phrases, trademark_word
├── lexicon_forbidden        → palabras prohibidas
├── syntactic_signatures     → estructuras propias (triplicación, ritmo)
├── argumentative_architecture → cómo construye argumentos
├── relational_stance        → desde dónde habla al cliente (tú/usted/vos)
├── emotional_register       → cariño + autoridad + honestidad radical
├── prohibited_registers     → registros que NUNCA usa
├── application_constraints  → qué content_types aplica, qué no
├── source_evidence          → de dónde se extrajo (audio, doc, sesión)
├── version, maturity, active
```

### Consumo en L1.5

```
PASO 1: Cargar voice_genome activo (cargado en VOICE CHECK de L0)

PASO 2: Inyectar lexicon_signature:
  - 1 a 3 signature_words por pieza (NO todas — el patrón mata el voice)
  - trademark_word: MAX 1 uso por pieza, solo donde el contenido lo justifica
  - signature_phrases: MAX 1 por pieza

PASO 3: Inyectar syntactic_signatures:
  - Estructuras firmadas (ej: emphatic_triplication para po_consumer)
  - MAX 1 vez por pieza CADA estructura, salvo regla específica
  - Ritmo de frases según pattern definido en el genoma

PASO 4: Aplicar argumentative_architecture:
  - default_pattern del genoma (ej: DIAGNOSIS → PRESCRIPTION → CONSEQUENCE → CLOSING)
  - Cada fase con sus reglas específicas

PASO 5: Aplicar relational_stance:
  - person_reference (tú/usted/vos)
  - subject_priority — sujeto principal por contexto
  - opening_stance — cómo se entra al texto

PASO 6: Filtrar contra prohibited_registers:
  - Eliminar forbidden_marketing_terms
  - Eliminar forbidden_corporate_terms
  - Eliminar forbidden_chemistry_jargon
  - Eliminar metáforas decorativas vacías
```

### Reglas críticas

```
REGLA 1 — NO REPETIR EL MISMO RECURSO
Los recursos firmados (trademark_word, emphatic_triplication, signature_phrases)
son FIRMA, no FÓRMULA. Si se repiten en cada pieza, se vuelven patrón vacío.
Regla operativa: MAX 1 vez por pieza, solo cuando el contenido lo justifica
naturalmente. Si no encaja natural — omitir.

REGLA 2 — VOICE NO SOBREESCRIBE VECTOR CREATIVO
El voice_genome modula el TONO del output. El vector creativo (L14) 
define el ÁNGULO de entrada. Cuando hay conflicto aparente, el vector 
gana en arquitectura y el voice gana en superficie léxica.

REGLA 3 — ES Y EN APLICAN EL MISMO GENOMA
La voz no se traduce — se reescribe desde origen en cada idioma 
aplicando el mismo voice_genome. La voz de PO en EN debe sonar 
a PO hablándole a su clientela anglo en el salón, no a una traducción.

REGLA 4 — VERSIONADO Y MATURITY
Un voice_genome tiene maturity: draft / v0.5 / v1.0 / mature.
Cuanto más material fuente respalda el genoma, mayor maturity.
v0.5 = base estructural + 1-2 fuentes.
v1.0 mature = 5+ audios contextualmente variados + 2-3 textos 
firmados + sesión validación directa.
Los outputs declaran qué voice_version se usó.
```

### Captura y enriquecimiento de voice_genome

Protocolo recomendado para construir o actualizar un genoma:

```
1. RECOLECTAR MATERIAL FUENTE
   - Audios espontáneos del hablante (notas de voz, llamadas)
   - Audios editoriales del hablante (presentaciones, explicaciones)
   - Textos firmados por el hablante sin intervención IA
   - Conversaciones documentadas

2. ANÁLISIS LINGÜÍSTICO
   - Inventario léxico: palabras de alta frecuencia, signature, trademark
   - Análisis sintáctico: ritmo de frases, estructuras recurrentes
   - Análisis argumentativo: cómo construye argumentos cuando habla espontáneamente
   - Identificación de prohibiciones implícitas: qué NUNCA usaría

3. DESTILADO A REGLAS OPERATIVAS
   No etiquetas descriptivas ("voz cálida y técnica") sino reglas ejecutables
   ("trademark_word = 'delicado', MAX 1 vez por pieza, solo en contextos clínicos").

4. VALIDACIÓN HUMANA
   El cliente o el propietario del voice aprueba regla por regla.

5. INSERT/UPDATE brand_voice_genome
   Versionado obligatorio. Active=true solo para una versión por (brand,voice).

6. COMMIT al session_log de la marca
```

---

## LAYER 2 · H+AIFE (Humanize + AI Footprint Eraser)

**Función:** Eliminar toda huella de escritura IA — superficial y profunda.

**Vocabulario IA a eliminar activamente:**
`additionally` · `boasts` · `crucial` · `delve` · `emphasizing` · `enhance` · `fostering` · `garner` · `highlighting` · `intricate` · `key` (adjetivo) · `landscape` (abstracto) · `meticulous` · `pivotal` · `showcasing` · `tapestry` · `testament` · `underscore` · `vibrant` · `valuable`

**Patrones estructurales a eliminar:**
- Apertura de frase con nombre del producto como sujeto directo
- Simetría excesiva rule-of-three formulario
- Transiciones artificiales: "en resumen" · "In summary" · "cabe destacar"
- Tono uniformemente positivo sin textura ni contraste
- Participios presentes en cadena como cierre superficial

**Burstiness — inyección obligatoria:**
Frases ancla cortas (5-8 palabras) como anclas de dolor + frases largas para desarrollo. No longitud uniforme.

**NeuroneSCF — reglas adicionales H+AIFE:**
- El protagonista es SIEMPRE el TÚ del cliente o "tu cabello" / "your hair" — nunca el clima, la marca, ni el producto en abstracto
- El clima de Florida es el contexto adversario — nunca el protagonista
- Nunca ambigüedad en claims negativos sobre "el producto": atribuir claramente al mercado, nunca a Neurone
- Nunca promesas de servicio sin infraestructura operativa que las respalde
- ES y EN se generan desde el origen en cada idioma — nunca traducir uno al otro

---

## LAYER 3 · HUMANIZE EMOTIONAL

**La fórmula canónica:**

```
DOLOR RECONOCIBLE  →  MECANISMO (una línea)  →  BENEFICIO SENTIDO
```

**Excepción documentada para `product_description_b2c`:**
En descripciones de producto Shopify, la fórmula se adapta a:
```
HOOK (problema físico reconocible) → COMPONENTES con regla d7h → CIERRE HONESTO
```
porque el cliente ya hizo click — ya tiene el dolor activo. El hook ancla el problema; el bloque medio entrega sustancia técnica; el cierre clarifica destinatario.

**El test de Patricia (NeuroneSCF):** ¿sonaría esto en la silla del salón, en conversación entre amigas? Si suena a white paper o a email de e-commerce estándar, este layer no terminó.

**Voz de Patricia Osorio — NeuroneSCF (descriptiva — operativa vive en `brand_voice_genome.po_consumer`):**
Patricia Osorio — Técnica en química capilar con 35+ años de trayectoria. Fundadora de Vizos Cosmetics - The Healing Systems, Casa Diseñadora de Belleza Capilar. Diseñadora de los Rituals & Kits de Neurone. Trabajó con las marcas más importantes del sector en 3 continentes entrenando profesionales. Propietaria de Vizos Salón en South Florida.

Su voz **nunca** explica mecanismos con jargon químico (Daltons, biomimetic, peptide bridges). Observa el cabello, diagnostica con autoridad clínica, prescribe el ritual, y cierra con honestidad radical sobre para quién es y para quién no.

Estructura canónica documentada en `brand_voice_genome.po_consumer.argumentative_architecture`:
```
DIAGNOSIS → PRESCRIPTION (regla d7h) → CONSEQUENCE → CLOSING (honestidad radical)
```

---

## LAYER 4 · PSYCHO

**Los 10 presets:** PSY-URGENCY · PSY-SCARCITY · PSY-AUTHORITY · PSY-TRUST · PSY-SOCIAL-PROOF · PSY-FOMO · PSY-ASPIRATION · PSY-IDENTITY · PSY-BELONGING · PSY-CURIOSITY

**Regla crítica:** los triggers no se nombran en el output. Trabajan en arquitectura.

**Combinaciones default por content_type:**

| Content type | Presets correctos | Presets incorrectos |
|---|---|---|
| Cart A (primer contacto) | PSY-TRUST + PSY-AUTHORITY + PSY-FOMO implícito | PSY-URGENCY como primario |
| Cart B (segundo contacto) | PSY-SOCIAL-PROOF + PSY-SCARCITY (oportunidad) + PSY-BELONGING | PSY-SCARCITY de inventario |
| Welcome | PSY-BELONGING + PSY-ASPIRATION + PSY-TRUST | — |
| Post Purchase | PSY-BELONGING + PSY-IDENTITY + PSY-ASPIRATION | — |
| Review Request | PSY-SOCIAL-PROOF + PSY-BELONGING | — |
| **Product description B2C** | PSY-AUTHORITY + PSY-TRUST + PSY-IDENTITY | PSY-URGENCY · PSY-SCARCITY |

**PSY-SCARCITY — distinción crítica:**
Escasez de oportunidad ≠ escasez de inventario.
- ❌ Inventario: "quedan pocas unidades"
- ✅ Oportunidad: "cada día sin esto es otro día con el mismo problema"

---

## LAYER 5 · CRO + COMPLIANCE SHAPING (soft) + SEQUENCE RULE + OUTPUT_SEPARATION

### COMPLIANCE SHAPING — severity: soft

Las reglas soft moldean estructura y decisiones editoriales. No bloquean palabras.

### SEQUENCE RULE (v2.5) — para email_sequence

```
Si content_type = 'email_sequence' AND position > 1:

REGLA 1 — DIFERENCIACIÓN DE MECANISMO
  → mechanism_primary de pieza anterior ≠ esta pieza
  → Diferente en EJE, no "más intenso en el mismo eje"

REGLA 2 — PRODUCT SPECIFICITY (Cart B con carrito)
  → Mostrar producto específico del carrito (Klaviyo variables)
  → Social proof del producto específico

REGLA 3 — SOCIAL PROOF REAL
  → De content_sequence_pieces o SP pool — NUNCA inventar

REGLA 4 — NO REPETIR ARGUMENTO DE MARCA
  → Cart B no repite trayectoria de PO si Cart A ya la usó
```

### OUTPUT_SEPARATION (nuevo en v2.6) — para product_description_b2c

```
Si content_type = 'product_description_b2c':

REGLA — SEPARAR BODY DE HOW_TO_USE
  El body de la descripción contiene:
    · Hook
    · Componentes con regla d7h
    · Authority anchor
    · Cierre honesto "para quién sí / para quién no"
  
  El body NO contiene:
    · Orden de aplicación detallado
    · Frecuencia (más allá de mención genérica en cierre)
    · Cantidades exactas por paso
    · Qué pasa si se salta un paso
    · Instrucciones técnicas paso a paso

  El bloque how_to_use contiene:
    · application_order — orden con técnica por paso
    · frequency — cuántas veces por semana/mes
    · amount_per_step — cantidades exactas (datos PO Tier 1 aquí)
    · what_happens_if_skipped — consecuencia honesta

  Formato técnico:
    a) Si la marca tiene metafield how_to_use_<locale>: usar metafield
    b) Si NO: embeber al final del descriptionHtml con
       <details><summary>Cómo se usa | How to use</summary>...</details>
    
    Ubicación en descriptionHtml: DESPUÉS del cierre honesto, ANTES del bloque pricing.

REGLA — NO REPETIR CONTENIDO ENTRE BLOQUES
  body y how_to_use son outputs separados con propósitos distintos.
  body vende el RITUAL (mecanismo + autoridad + destinatario).
  how_to_use explica la OPERATIVA (cómo se ejecuta).
```

### Estructura CRO por content_type:

| Pieza | Ancla de apertura | Reveal | CTA |
|---|---|---|---|
| Cart A | Problema en el cabello | "Eso es lo que dejaste en tu carrito" — reveal tardío | Completar pedido |
| Cart B | Social proof + producto específico | Carrito expirando como oportunidad | Al dolor / al resultado |
| Welcome | Problema climático local | Bienvenida + PO diseñadora | Explorar tienda |
| Post Purchase | Educación de uso | — | Follow / comunidad |
| Review Request | ¿Cómo está tu cabello? | Tu experiencia ayuda a la próxima | Dejar reseña |
| **Product description B2C** | Hook diagnóstico desde voice_genome | Componentes con d7h + authority + cierre honesto | Implícito en bloque pricing |

---

## CREATIVE ENGINE v9.0 — Capas L14/L15/L16 (documentadas en v2.6)

El Creative Engine es **brand-agnostic** y **universal a todos los content_types**. Vive en código (`CopyLab/api/execute.ts`) y en 4 tablas Supabase. Multimarca, multi-output.

### L14 — CREATIVE_VECTOR (ángulo de entrada)

44 vectores en 6 categorías:

| Categoría | Sigla | Función |
|---|---|---|
| Observation | A1-A7 | El reveal del problema desde lo concreto (espejo, sensación física, ritual fallido) |
| Truth | B1-B7 | Verdades incómodas, causa real, dato verificable |
| Social | C1-C7 | Espejo en tercera persona, comunidad, conversación |
| Narrative | D1-D9 | In medias res, confesión, open loop, pattern interrupt, future memory |
| Authority | E1-E7 | Diagnóstico directo, trayectoria, conversación de salón |
| Urgency | F1-F7 | Reloj, otros ya lo tienen, costo de no decidir |

Tabla: `creative_vectors` (44 rows).

### L15 — TENSION_ARCHITECTURE (curva de presión)

10 arquitecturas de cómo la tensión se mueve a través del texto:

`T1 INVERTED_PYRAMID` · `T2 EARLY_SPIKE` · `T3 ESCALATING_LADDER` · `T4 MICRO_TENSIONS` · `T5 VALLEY_AND_PEAK` · `T6 SUSTAINED_LOW_PRESSURE` · `T7 RELEASE_REBUILD` · `T8 COLD_OPEN_BURN` · `T9 HEARTBEAT` · `T10 QUIET_KNIFE`

Tabla: `tension_architectures` (10 rows).

### L16 — AGGRO_DIAL (intensidad de convicción)

5 niveles: `AGGRO_1 WHISPER` → `AGGRO_2 FIRM` → `AGGRO_3 DIRECT` → `AGGRO_4 PRESSURE` → `AGGRO_5 FULL_AGGRO`.

Regla canónica: AGGRO_5 solo se autoriza cuando hay substancia argumental construida en capas anteriores del pipeline. AGGRO_5 sin substancia = spam que daña la marca.

Tabla: `aggro_presets` (5 rows).

### Reglas de compatibilidad por content_type

Tabla: `creative_compatibility_rules`. Define qué pool de vectors/tensions/aggro está permitido para cada `content_type`, con `rotation_rule = 'random_no_repeat'` para evitar que outputs sucesivos de la misma marca suenen idénticos.

**Reglas activas a la fecha (2026-05-19):**

| content_type | n_vectors | tensions | aggro |
|---|---|---|---|
| abandoned_cart_1 | 10 | T1, T3, T6 | 2-3 |
| abandoned_cart_2 | 11 | T2, T5, T7, T8 | 4-5 |
| welcome | 6 | T1, T4, T6 | 1-2 |
| post_purchase | 6 | T6, T4 | 1 |
| review_request | 5 | T6, T1 | 2 |
| ad_copy | 14 | T2, T3, T8 | 3-4 |
| landing_page | 21 | T1, T3, T5, T6 | 2-3 |
| social_post | 12 | T2, T4, T10 | 2-3 |
| win_back | 11 | T5, T7, T8 | 3-4 |
| **product_description_b2c** (v2.6) | 32 | T1, T4, T6, T10 | 1-3 |

### Templates canónicos por content_type

Tabla: `output_templates`. Define el prompt completo que se inyecta al modelo, incluyendo arquitectura del output, reglas globales, consumo de voice_genome (si aplica), y QA AUTO-CHECK específico.

Templates activos relevantes:
- `prompt_Email_Sequence` v1.0
- `prompt_Product_Description_B2C` v1.2 (v2.6)

---

## LAYER 6 · SEO

**Activación:** solo para blog, web, landing, product description. No aplica a email sequences ni ads.

**NSCF — estrategia geo SEO:**
Florida como anchor de autoridad. Comparaciones climáticas con otras ciudades USA rotan entre piezas — nunca el mismo trío por defecto.

**Para product_description_b2c:**
- seo_title: ≤60 chars, sin chemistry jargon
- seo_description: 140-160 chars, llamada a la usabilidad real
- meta_title: cuando aplique, escrito desde voice_genome (no traducir del ES)

---

## LAYER 7 · QA

**Checklist universal:**
- ✓ Protagonista correcto según relational_stance del voice_genome
- ✓ Pain point reconocible en los primeros 100 palabras
- ✓ Fórmula adecuada al content_type
- ✓ Ningún patrón H+AIFE
- ✓ Voice genome aplicado (signature words, sintaxis, arquitectura)
- ✓ Al menos un trigger PSYCHO activo e implícito
- ✓ Presets correctos para el content_type
- ✓ Sin términos hard de compliance_rules
- ✓ Reglas soft aplicadas
- ✓ Test del hablante (¿suena al hablante real?)
- ✓ ES y EN desde origen
- ✓ Promesas de servicio respaldadas
- ✓ Seed creativo declarado (vector + tension + aggro)
- ✓ Voice version declarada en metadata

**Output:** PASS → entrega | FAIL → gaps específicos + corrección automática

---

## AUTO-CHECK DE CLAUDE (24 puntos · v2.6)

Antes de entregar cualquier output de texto público:

```
 0. ¿Existen compliance_rules activas para esta marca?      → Sí / BLOCK
 1. ¿L0 activo? ¿Sé a quién le hablo?                       → Sí / cargar brand_personas
 2. ¿Pain point reconocible en el primer bloque?            → Sí / añadir ancla
 3. ¿Palabras de lista negra H+AIFE presentes?              → Reemplazar
 4. ¿Términos hard de compliance_rules en el output?        → FALLO CRÍTICO
 5. ¿Reglas soft aplicadas donde correspondía?              → Sí / declarar ajuste
 6. ¿Oraciones con variación de longitud?                   → Ajustar
 7. ¿Paralelismos automáticos?                              → Destruir
 8. ¿Hedging innecesario en lenguaje experiencial?          → Eliminar
 9. ¿Más de 2 bold por 500 palabras?                        → Reducir
10. ¿Bullets donde debería ser prosa?                       → Convertir
11. ¿Participios presentes en cadena?                       → Reescribir
12. ¿Beneficio en experiencia del usuario?                  → Sí / reencuadrar
13. ¿Objeción principal abordada?                           → Sí / integrar
14. ¿Test del hablante: sonaría auténtico?                  → Sí / revisar
15. ¿QA completo?                                           → PASS antes de entregar
16. ¿Es parte de secuencia? Mecanismo ≠ pieza anterior?     → Verificar

VOICE GENOME (v2.6):
17. ¿Sujeto principal = relational_stance del genoma?       → Sí
18. ¿Cierre cumple closing_pattern del genoma?              → Sí
19. ¿Authority invocada solo con anchors autorizados?       → Sí
20. ¿trademark_word MAX 1 vez (o 0)?                        → Verificar
21. ¿syntactic_signatures MAX 1 vez cada una (o 0)?         → Verificar
22. ¿Si product_description_b2c: regla d7h cumplida?        → Verificar
23. ¿Body NO contiene operativa de aplicación?              → Verificar
24. ¿how_to_use separado contiene operativa completa?       → Verificar
```

---

## MULTIMARCA — CONFIGURACIÓN

| Marca | Persona prioritaria | voice_genome | Tono | Evitar |
|---|---|---|---|---|
| **NeuroneSCF B2C** | 7 segmentos por dolor | `po_consumer` v0.6 (active) | Diagnóstico-prescriptivo + cercanía de salón | Claims de mecanismo sin hedging · jargon químico · traducir ES↔EN |
| **NeuroneSCF B2B** | `b2b_salon_owner` + `b2b_colorist` | `po_b2b` (no creado aún) | Directo, datos primero, entre pares | Consumer language · promesas emocionales |
| **UNRLVL / Lucien** | `brand_personas[UNRLVL]` | No creado | Directivo, técnico | Corporativo genérico · buzzwords |
| **ForumPHs** | `brand_personas[ForumPHs]` | No creado | Legal-técnico accesible | Jerga que Ivette no usaría |
| **PO (Patricia personal)** | `person_blueprints[PO]` | Mismo `po_consumer` adaptable | Cálido, femenino, motivacional | Frío · transaccional |

---

## COMPLIANCE — COBERTURA POR MARCA

| Marca | Hard | Soft | voice_genome | Estado |
|---|---|---|---|---|
| NeuroneSCF | ✅ FL_US | ✅ FL_US | ✅ po_consumer v0.6 | ✅ Ready |
| PatriciaOsorio* | ✅ FL_US | ✅ FL_US | ⚠️ pendiente | ⚠️ Voice gap |
| D7Herbal | ✅ ES | ❌ pendiente | ❌ pendiente | ⚠️ Soft + Voice gap |
| DiamondDetails | ✅ ES | ❌ pendiente | ❌ pendiente | ⚠️ Soft + Voice gap |
| VivoseMask | ✅ ES | ❌ pendiente | ❌ pendiente | ⚠️ Soft + Voice gap |
| VizosCosmetics | ✅ global | ❌ pendiente | ❌ pendiente | ⚠️ Soft + Voice gap |
| ForumPHs | ❌ | ❌ | ❌ | 🔴 BLOCK |

---

*CONTENT PIPELINE SKILL v2.6 · Unreal>ille Studio · 2026-05-19*  
*Motor: 9 layers principales (L0-L7 + L1.5) + 3 capas Creative Engine (L14/L15/L16)*  
*Sequence awareness: L0 + L5 SEQUENCE RULE + AUTO-CHECK puntos 16*  
*Voice genome system: L0 VOICE CHECK + L1.5 INJECTION + AUTO-CHECK puntos 17-24*  
*Output separation: L5 OUTPUT_SEPARATION (product_description_b2c)*  
*Compliance: L1 pre-filtro (hard) + L5 shaping (soft) + L7 QA*

---

## Patrón LAB-LEE-NUNCA-CONSTRUYE (2026-08-16)

_Decisión de arquitectura del carril. Nace del frente de snapshots del 2026-08-16, donde **tres**
implementaciones construían el snapshot de marca desalineadas entre sí._

**LA REGLA:** el snapshot de marca lo construye **UN** constructor. Los labs lo **LEEN**. Un lab que
construye su propio contexto es un lab que diverge del resto en silencio — y la divergencia no se ve
hasta que dos labs producen piezas distintas para la misma marca.

```
                    ┌──────────────────────────────┐
   cron jobid 51    │  EF brand-snapshot-builder   │   ← EL ÚNICO CONSTRUCTOR
   0 */3 * * *  ───▶│  30 tablas · v1              │
                    └──────────────┬───────────────┘
                                   │ escribe
                                   ▼
                    ┌──────────────────────────────┐
                    │  public.brand_cache_snapshots│   ← la fuente que todos leen
                    └──────────────┬───────────────┘
                                   │ lee
                  ┌────────────────┼────────────────┐
                  ▼                                 ▼
      CopyLab/api/brand-cache.js        unrlvl-context/api/brand-cache.js
      v2.4 → v3.0  **LECTOR**           v1.2 → v2.0  **LECTOR**
      (ninguno construye)               (ninguno construye)
```

**Lo que costaba el patrón anterior.** El constructor de `unrlvl-context` consultaba **8 tablas**
frente a las 30 del canónico. Faltaban, entre otras, `brand_voice_genome` (el ADN ejecutable de
voz), el motor creativo completo (`creative_vectors`, `tension_architectures`, `aggro_presets`,
`creative_compatibility_rules`) y el cableado del registro (`pipeline_skills`,
`content_type_registry`). **Todo caller de ese endpoint venía operando con contexto empobrecido sin
que nada fallara** — que es la forma más cara de fallar.

**Deuda abierta:** retirar `action=build_all` de CopyLab, que hoy responde **410 con puntero**.

### Los 3 headers del detector

El detector de capas del snapshot reporta bajo tres encabezados. Se nombran acá porque leer el
`_debug` sin saber qué son lleva a diagnosticar la capa equivocada:

| Header | Qué agrupa |
|---|---|
| `Layers` | las capas de contexto resueltas para la marca |
| `Globals` | lo que aplica a **todas** las marcas y se hereda |
| `Sentinels` | los centinelas de integridad de la construcción |

### El learning del GRANT

> **Una tabla creada sin `GRANT service_role` existe, responde a `information_schema`, y FALLA EN
> RUNTIME.** El carril corre como `service_role`: sin el grant, la tabla es invisible **sólo para
> quien la usa**. El síntoma se lee como "la tabla no existe" y no lo es — así que la investigación
> arranca en el lugar equivocado y el DDL parece correcto porque lo es.
>
> **El GRANT va como paso fijo del DDL, no como recordatorio.** Verificado el 2026-08-16 al crear
> `intel.content_embeddings` (`vector(768)` + HNSW + GRANT `service_role`).

**Corolario de `Globals`:** las reglas globales `hard` **se heredan y GANAN** sobre las de marca.
ForumPHs pasó de 9 a 11 reglas de compliance sin que nadie sembrara nada en la marca. Consecuencia
de método: **contar las reglas efectivas de una marca leyendo sólo sus filas da un número menor que
el real.**

---

## Decisiones de arquitectura del carril (migradas de AGENDA.md, 2026-08-16)

_Fragmento de `## Notas de contexto` de `AGENDA.md` clasificado como **DECISIÓN de método —
carril/pipeline** en el reparto del 2026-08-16 (`protocols/ARQUITECTURA_DEL_CONOCIMIENTO.md` §2).
Texto íntegro, cortado y pegado — nada resumido, nada reescrito._

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for. Ventanas ET, jitter ±45min. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768.

---

## Pruebas negativas del Watcher (rescatadas de DRYRUN_PLAN_IID_PILOT, 2026-08-16)

_Rescatadas de `protocols/DRYRUN_PLAN_IID_PILOT.md` §2.3 antes de archivarlo
(`protocols/archive/`). **Es el único test de regresión escrito del Watcher** — la premisa del
documento murió (el `.limit(1)` se retiró, la queue está limpia), pero esta batería no. Texto
íntegro, cortado y pegado._

### 2.3 Pruebas negativas (forzar REJECT)
4. Duplicar el texto de A en una marca hermana → segunda pieza REJECT gate 1, `failed_gate='similarity'`.
5. Job UNRLVL con texto sin números (forzado) → REJECT gate 4.
6. Job Lucien con tease de libro (forzado) → REJECT gate 6.
7. Verificar: ninguna pieza REJECT generó email ni quedó como `awaiting_approval`.
