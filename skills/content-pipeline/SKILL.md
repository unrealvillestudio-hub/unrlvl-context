# CONTENT PIPELINE SKILL
## UNRLVL · Versión canónica · v2.4
**Propietario:** Unreal>ille Studio · Sam  
**Estado:** ICR ✅ — R4B (Ready for Business)  
**Ruta canónica:** `skills/content-pipeline/SKILL.md`  
**Reemplaza:** v2.3 (2026-05-12)  
**Última actualización:** 2026-05-12 · v2.4

**Cambios v2.4:**
- Comparaciones climáticas: pool de 25+ ciudades USA con criterios de rotación obligatoria
- Regla explícita: nunca fijar NY/Chicago/Houston como trío por defecto
- Selección de ciudad por argumento del artículo, temporada y audiencia — no por fórmula

**Cambios v2.3:**
- Compliance Scope Rule: compliance filtra claims de mecanismo, NO lenguaje experiencial
- Protección de copy con fuerza emocional: hedging solo en claims de mecanismo
- Tabla de cobertura del ecosistema actualizada — 5 marcas nuevas en Supabase
- ForumPHs flaggeada: setup completo requerido

**Cambios v2.2:**
- Compliance en dos posiciones: L1 pre-filtro (hard) + L5 shaping (soft)
- Comportamiento BLOCK: sin compliance_rules → preguntar antes de generar
- Corrección geo NeuroneSCF: South & Central Florida

---

## 0. ESTÁNDARES DEL ECOSISTEMA

### ICR — Industrial Consistency Ready

Estándar de calidad firma de Unreal>ille Studio. Una solución alcanza ICR cuando su output es verificablemente consistente bajo las mismas condiciones, sin supervisión manual constante. Sinónimo operativo: **R4B (Ready for Business)**.

Una solución NO es ICR si:
- Su output varía significativamente entre ejecuciones sin razón declarada
- Requiere intervención humana para corregir errores sistemáticos
- No ha pasado QA formal
- Sus reglas de operación no están documentadas en el ecosistema

### QA — Quality Assurance Layer

Verificación de cumplimiento **antes de entregar**. No es revisión post-entrega.

**Contrato QA:**
- Input: output generado + requerimientos originales
- Output: PASS (entrega) | FAIL (gaps + corrección automática)
- En chat: Claude verifica internamente antes de declarar "listo". Gaps → declarar antes de entregar, nunca después.

---

## 1. ARQUITECTURA DEL PIPELINE

```
INPUT (brief / producto / canal / ad)
  │
  ├── [L0] AUDIENCE BRIEF       → Quién es el receptor. Pain points. Objeciones.
  │         └── COMPLIANCE CHECK → ¿Existen compliance_rules para esta marca?
  │                                 SI  → cargar en L0, aplicar en L1 y L5
  │                                 NO  → BLOCK: declarar gap y preguntar a Sam antes de continuar
  │
  ├── [L1] WRITE                → Draft base desde brand_copy_profiles
  │         └── COMPLIANCE PRE-FILTRO (severity: hard)
  │                               Las reglas hard actúan como restricciones de generación.
  │                               El pipeline no produce el término — no lo genera para luego borrarlo.
  │
  ├── [L2] H+AIFE               → Humanización profunda + borrado de huella IA
  ├── [L3] HUMANIZE EMOTIONAL   → Dolor → mecanismo → beneficio sentido
  ├── [L4] PSYCHO               → Capas psicológicas de persuasión
  │
  ├── [L5] CRO                  → Arquitectura de conversión + desarme de objeciones
  │         └── COMPLIANCE SHAPING (severity: soft)
  │                               Las reglas soft moldean estructura y contexto.
  │                               Ejemplo: "mencionar distribución exclusiva Florida cuando relevante"
  │                               condicion el cierre de artículos y ads, no bloquea palabras.
  │
  ├── [L6] SEO                  → Optimización de búsqueda (si aplica)
  └── [L7] QA                   → Verificación final — compliance como segunda validación
       │         Si L1 pre-filtro funcionó, L7 debería pasar limpio.
       │         Si L7 encuentra violación de compliance, reportar como fallo de L1, no de QA.
       │
  OUTPUT — listo para publicación / Shopify / plataforma
```

**Activación por content_type:**

| Content type | L0 | L1 | L2 | L3 | L4 | L5 | L6 | L7 |
|---|---|---|---|---|---|---|---|---|
| Descripción producto B2C | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | med | ✅ |
| Blog post / artículo largo | ✅ | ✅ | ✅ | ✅ | ✅ | med | ✅ | ✅ |
| Ad performance | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Post orgánico | ✅ | ✅ | ✅ | ✅ | med | ❌ | ❌ | ✅ |
| Descripción producto B2B | ✅ | ✅ | ✅ | med | ✅ | ✅ | med | ✅ |
| Landing page | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | med | ✅ |
| Script de video | ✅ | ✅ | ✅ | ✅ | ✅ | med | ❌ | ✅ |
| Email marketing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Contenido UNRLVL / Lucien | ✅ | ✅ | ✅ | ✅ | ✅ | med | med | ✅ |

**med = aplica parcialmente según objetivo declarado de la pieza**

---

## LAYER 0 · AUDIENCE BRIEF + COMPLIANCE CHECK

**Función:** Cargar el contexto de audiencia antes de generar cualquier contenido. Layer fundacional — sin él, todos los demás operan en abstracto.

A partir de v2.2, L0 incluye el **Compliance Check** como primer bloque de verificación.

### COMPLIANCE CHECK (nuevo en v2.2)

```
PASO 1: Verificar compliance_rules[brand_id]
   ¿Existen rows activos?
   
   SÍ → cargar todas las reglas por severity:
        hard[]  → pasar a L1 como pre-filtro de generación
        soft[]  → pasar a L5 como constraints de shaping
        Continuar pipeline normalmente.

   NO → BLOCK ⛔
        Declarar: "No existen compliance_rules para [brand_id].
        Antes de generar contenido público necesito que confirmes las reglas
        de compliance para esta marca. Te propongo las siguientes basándome
        en el contexto disponible: [propuesta]. ¿Las confirmas o ajustas?"
        No generar ningún output hasta recibir confirmación.

PASO 2: Verificar brand_id: null (global fallback)
   Los rules con brand_id: null son red de seguridad del ecosistema —
   se aplican SIEMPRE como capa adicional, pero NO sustituyen reglas de marca.
   Una marca sin compliance_rules propias sigue estando en BLOCK aunque
   existan global rules.
```

**¿Por qué no usar los global rules como sustituto?**
Las reglas globales (`brand_id: null`) son demasiado genéricas para moldear copy de marca. Una marca de servicios legales (ForumPHs) tiene restricciones radicalmente distintas a una marca de haircare (NeuroneSCF). Correr sin compliance de marca produce output que cumple el mínimo legal global pero puede violar restricciones específicas de producto, jurisdicción o posicionamiento.

**Fuentes de datos (Supabase → brand-cache):**

| Tabla | Columnas clave | Para qué |
|---|---|---|
| `brand_personas` | `persona_key` · `pain_points` · `motivations` · `objections` · `copy_hooks` · `buying_trigger` · `tone_for_segment` · `avoid` | Perfil completo del receptor |
| `brand_copy_profiles` | `voice_tone_primary` · `voice_writing_style` · `style_hooks` · `style_signature_phrases` · `style_avoid_phrases` | Voz de marca para WRITE |
| `geomix` | `local_slang` · `avoid_slang` · `cultural_refs` · `language` | Contexto geográfico y cultural |
| `brand_goals` | Objetivos estratégicos activos | Dirección de conversión |
| `compliance_rules` | Claims prohibidos · disclaimers obligatorios · severity | Qué no se puede decir y con qué peso |

**Input contract:** `brand_id` + `content_type` + `persona_key` (si declarado) + `language`  
**Output contract:** brief de audiencia activo + compliance_rules cargadas por severity → alimenta L1-L7

**Regla crítica:** si no existe `brand_personas` para el `brand_id` → usar `DEFAULT_PERSONA` y declarar el gap. Un output sin audiencia definida no es ICR.

---

## LAYER 1 · WRITE + COMPLIANCE PRE-FILTRO (hard)

**Función:** Generar el draft base a partir del perfil de marca y el brief de audiencia de L0. A partir de v2.2, opera con las reglas `severity: hard` como restricciones de generación activas.

### COMPLIANCE PRE-FILTRO — severity: hard

### COMPLIANCE SCOPE RULE (v2.3) — qué filtra compliance y qué no

Esta es la regla que protege la fuerza emocional del copy.

```
COMPLIANCE filtra → CLAIMS DE MECANISMO
  Afirmaciones sobre cómo el producto funciona química, biológica o clínicamente.
  Son las que generan riesgo legal real (FDA, FTC, Advertising Standards).

  Ejemplos que SÍ activan compliance:
    "penetra la corteza y repara el daño"    → mecanismo biológico absoluto
    "cura la porosidad"                      → claim médico
    "la cutícula permanece abierta todo el año" → absoluto fisiológico
    "elimina el frizz"                       → resultado garantizado

  Sustitución correcta: "puede ayudar a" / "contribuye a" / "favorece"

COMPLIANCE NO filtra → LENGUAJE EXPERIENCIAL / OBSERVACIONAL
  Descripciones de lo que el usuario nota, siente o vive.
  No son claims — son imágenes de experiencia. No tienen exposición legal.

  Ejemplos que NO activan compliance:
    "el viernes se parece al lunes"          → observación de la usuaria, no claim
    "tres días después de nadar, sin brillo" → experiencia, no promesa de mecanismo
    "no es tu imaginación"                   → validación emocional, sin mecanismo
    "el cabello no gana la batalla al mediodía" → descripción de frustración conocida

  Estos NO llevan "puede" ni hedging de ningún tipo.
  Agregarles hedging destruye la fuerza emocional sin reducir ningún riesgo legal.
```

**Regla operativa:**
`puede` / `ayuda a` / `contribuye a` / `favorece` son vocabulario de reemplazo **exclusivamente para claims de mecanismo**. No se aplican a:
- Hooks emocionales y anclas de dolor
- Descripciones de experiencia del usuario
- Observaciones del comportamiento del cabello en un contexto
- Citas directas de Patricia (autoridad personal, no claim de marca)
- Preguntas retóricas dirigidas a la persona

**Test de clasificación rápida:**
```
¿La frase describe cómo el producto actúa internamente?
  SÍ → es un claim de mecanismo → aplicar hedging de compliance
  NO → es lenguaje experiencial → no tocar
```

```
Las reglas hard definen lo que el modelo NO genera.
No es: generar → revisar → borrar.
Es: no producir el término desde el origen.

Ejemplos NeuroneSCF hard:
  "cura"           → NUNCA generar. Reemplazar internamente por "ayuda a mejorar"
  "trata"          → NUNCA generar. Usar "contribuye a" / "favorece"
  "elimina"        → NUNCA generar. Usar "reduce" / "minimiza"
  "garantizado"    → NUNCA generar. Usar "en la mayoría de los casos" / eliminar
  "clínicamente probado" → NUNCA generar sin cita de fuente real
  Comparaciones de competidor por nombre → NUNCA generar

Regla meta:
  Si en el proceso de generación un término hard aparece como candidato natural
  de la oración, reemplazarlo antes de outputear — no generarlo y marcarlo.
  La corrección es interna al layer, no visible al receptor.
```

**Fuentes:** `brand_copy_profiles[brand_id]` + output L0 + `keywords[brand_id]` + `compliance_rules[severity=hard]`  
**Input contract:** brief L0 (incluye compliance hard) + `product_id | ad_brief | social_brief` + `content_type` + `language`  
**Output contract:** texto draft en el idioma declarado, compliance-clean desde origen, sin humanizar ni persuadir.

---

## LAYER 2 · H+AIFE (Humanize + AI Footprint Eraser)

**Función:** Eliminar toda huella de escritura generada por IA — a nivel superficial y profundo.

**Posición:** después de WRITE, antes de HUMANIZE EMOTIONAL. Limpia la forma sin cambiar el mensaje.

**Fuente de datos:** `humanize_profiles[brand_id + medium]`

---

### H · Nivel 1 — Patrones superficiales

**Vocabulario IA por era — eliminar activamente:**

Era 2023–mid 2024 (GPT-4):
`Additionally` (apertura) · `boasts` · `bolstered` · `crucial` · `delve/delving` · `emphasizing` · `enduring` · `garner` · `intricate/intricacies` · `interplay` · `key` (adjetivo) · `landscape` (abstracto) · `meticulous/meticulously` · `pivotal` · `underscore` (verbo) · `tapestry` (abstracto) · `testament` · `valuable` · `vibrant`

Era mid-2024 a mid-2025 (GPT-4o):
`align with` · `bolstered` · `crucial` · `emphasizing` · `enhance` · `enduring` · `fostering` · `highlighting` · `pivotal` · `showcasing` · `underscore` · `vibrant`

Era mid-2025 en adelante (GPT-5):
`emphasizing` · `enhance` · `highlighting` · `showcasing` + patrones de énfasis en notabilidad mediática

**Protocolo:** nunca eliminar sin reemplazar → término concreto del contexto, construcción activa directa, o eliminación completa si la frase no añadía valor real.

**Patrones estructurales a eliminar:**
- Apertura de frase con nombre del producto como sujeto directo
- Simetría excesiva "A hace X, B hace Y, C hace Z" (rule of three formulario)
- Transiciones artificiales: "en resumen" · "en conclusión" · "cabe destacar" · "In summary" · "Overall"
- Secciones de "Conclusión" que repiten lo ya dicho
- Tono uniformemente positivo sin textura ni contraste
- Lenguaje de travel guide: `nestled` · `vibrant` · `rich cultural heritage` · `diverse array`
- Énfasis genérico: `groundbreaking` · `revolutionary` · `exceptional` · `renowned` · `commitment to`

---

### AIFE · Nivel 2 — Patrones profundos (estadísticos y lingüísticos)

**Patrones de contenido — regresión a la media estadística:**
- Sustituir datos específicos por frases genéricas positivas → revertir al dato concreto
- Énfasis injustificado en legado: `stands as` · `serves as` · `marks a pivotal moment` · `represents a shift` · `indelible mark` · `deeply rooted` · `symbolizing its enduring`
- Participios presentes como cierre superficial: "...highlighting its importance" · "...reflecting broader trends" · "...fostering a sense of community"
- Atribuciones vagas sin fuente real: "Industry reports indicate" · "Experts argue" → eliminar o citar fuente real

**Patrones lingüísticos profundos:**
- **Copulativos inflados:** `serves as` · `stands as` · `marks` · `represents` · `boasts` · `features` → revertir a "es / tiene / está"
- **Paralelismos negativos artificiales:** "Not just X, but also Y" → reestructurar en afirmaciones directas
- **Variación elegante forzada:** sinónimos en cadena para evitar repetición → permitir repetición natural de términos clave
- **Rule of three formulario** → romper simetría donde no sea necesaria

**Patrones estadísticos de distribución:**
- **Longitud de frases uniforme** → variación real: frases cortas 5-8 palabras como anclas emocionales + frases largas para desarrollo técnico
- **Colocación predecible de conectores** → redistribuir irregularmente o eliminar
- **Vocabulario estadísticamente seguro** → usar terminología técnica específica del campo cuando corresponde
- **Estructura argumental demasiado completa** → permitir que algunas ideas queden sugeridas, no declaradas
- **Redundancia semántica de párrafo** → cada párrafo avanza, no repite

**Tipografía:**
- Em dashes en exceso → reducir
- Bold en "key takeaways" → solo para términos técnicos necesarios
- Bullet `• **Header:** descripción` → convertir a prosa donde posible
- Title Case en subtítulos no propios → sentence case

**Burstiness — inyección obligatoria:**
```
ANTES (AI uniforme):
"El producto tiene una fórmula avanzada. Se diseñó para el mercado latino.
Su diferenciador es la tecnología. El equipo es experto."

DESPUÉS (bursty):
"La fórmula fue diseñada para este mercado específico.

Cabello latino, clima de Florida, humedad constante — tres variables que los
laboratorios en Europa y Japón no tienen en sus protocolos de prueba.
Neurone sí.

La diferencia se nota en semanas, no en promesas."
```

**Regla crítica:** H+AIFE no cambia mensaje ni información — solo la forma. Conflicto entre naturalidad y precisión → gana la precisión.

---

## LAYER 3 · HUMANIZE EMOTIONAL

**Función:** Traducir mecanismos técnicos correctos en experiencia humana reconocible.

**La fórmula canónica:**

```
DOLOR RECONOCIBLE  →  MECANISMO (una línea)  →  BENEFICIO SENTIDO
```

**DOLOR RECONOCIBLE:** El momento de frustración concreto que el receptor ya vivió.
**MECANISMO (una línea):** La lógica del por qué, en una frase sin jerga.
**BENEFICIO SENTIDO:** Qué va a notar diferente, en experiencia real.

**El test de Patricia:** ¿sonaría esto en la silla del salón, en conversación con una clienta de 35 años? Si suena a white paper, este layer no terminó.

**Fuente:** `brand_personas[brand_id]` → `pain_points` + `motivations` + `copy_hooks`

---

## LAYER 4 · PSYCHO

**Función:** Inyectar capas psicológicas de persuasión calibradas al objetivo y la audiencia de L0.

**Fuente:** `psycho_presets[preset_id]` (10 presets activos en Supabase)

**Campos disponibles por preset:**

| Campo | Medio |
|---|---|
| `injection_copy` | Blog, producto, ad, landing, email |
| `injection_visual` | ImageLab, prompts visuales |
| `injection_video` | VideoLab, scripts de video |
| `injection_voice` | VoiceLab, scripts de locución |

**Los 10 presets:** PSY-URGENCY · PSY-SCARCITY · PSY-AUTHORITY · PSY-TRUST · PSY-SOCIAL-PROOF · PSY-FOMO · PSY-ASPIRATION · PSY-IDENTITY · PSY-BELONGING · PSY-CURIOSITY

**Combinaciones default NSCF:**

| Content type | B2C | B2B |
|---|---|---|
| Descripción producto | PSY-AUTHORITY + PSY-TRUST + PSY-ASPIRATION | PSY-AUTHORITY + PSY-TRUST |
| Blog post | PSY-CURIOSITY + PSY-AUTHORITY + PSY-BELONGING | PSY-AUTHORITY + PSY-SOCIAL-PROOF |
| Ad performance | PSY-URGENCY + PSY-SCARCITY | PSY-FOMO + PSY-AUTHORITY |
| Post orgánico | PSY-CURIOSITY + PSY-BELONGING | PSY-IDENTITY + PSY-BELONGING |
| Landing page | PSY-ASPIRATION + PSY-SOCIAL-PROOF + PSY-TRUST | PSY-AUTHORITY + PSY-TRUST |

**Regla crítica:** los triggers no se nombran en el output. Trabajan en la arquitectura, no en el copy superficial.

---

## LAYER 5 · CRO + COMPLIANCE SHAPING (soft)

**Función:** Estructurar el contenido para maximizar la acción deseada y desarmar objeciones. A partir de v2.2, incluye el shaping de compliance para reglas `severity: soft`.

### COMPLIANCE SHAPING — severity: soft

```
Las reglas soft no bloquean palabras — moldean estructura, contexto y decisiones editoriales.

Ejemplos NeuroneSCF soft:
  "Distribución exclusiva South & Central Florida cuando relevante"
  → Cierre de artículos que describan disponibilidad: mencionar Florida, no solo Miami
  → Ads que hablen de exclusividad: especificar Florida como territorio
  → No implica mencionar Florida en cada párrafo — solo cuando la distribución
     sea relevante para la decisión del receptor

  "Bilingüe es-FL + EN option"
  → Artículos en ES siempre tienen versión EN pendiente o activa
  → Copy de ads considera ambos idiomas antes de elegir el predominante

Aplicación:
  soft rules no generan BLOCK — generan adjustment.
  Si una regla soft no se puede cumplir (ejemplo: contenido en un idioma
  que no soporta bilingüe), declarar el ajuste antes de entregar.
```

**Fuente:** `brand_personas[brand_id]` → `objections` + `buying_trigger` + `compliance_rules[severity=soft]`

**Estructura CRO blog post:**
- Acción primaria: leer siguiente artículo (suggest block Patricia) o ir al producto referenciado
- Acción secundaria: guardar / compartir / suscribir
- Flujo de intención: cada párrafo empuja hacia la siguiente acción o está sobrando

---

## LAYER 6 · SEO

**Función:** Asegurar que el contenido es indexable y relevante para búsquedas declaradas.

**Reglas:**
- Keyword principal en los primeros 100 caracteres
- Keyword secundaria: una vez en el cuerpo, de forma natural
- Densidad máximo 2-3%
- Meta description: 150-160 chars, orientada a click
- SEO title: máximo 60 chars, brand suffix obligatorio

**NSCF blog — estrategia geo SEO:**
- Florida como anchor de autoridad en los primeros 12-15 artículos antes de expandir a USA
- Encuadre: "Florida como caso extremo del que deriva autoridad universal" — si funciona aquí todo el año, funciona en cualquier clima exigente
- No abrir track USA genérico hasta tener tráfico orgánico establecido en Florida

**Comparaciones climáticas con otras ciudades USA — regla de variación obligatoria:**

Las referencias a otras ciudades son un recurso editorial que debe **rotar** entre artículos. Nunca usar las mismas ciudades en dos piezas publicadas en un período corto. La comparación sirve al argumento del artículo específico — no es una fórmula.

```
CRITERIOS DE SELECCIÓN POR ARTÍCULO:
1. ¿Qué perfil climático contrasta mejor con el argumento central?
2. ¿Cuál ciudad resuena con la audiencia de ese momento / temporada?
3. ¿Esta combinación ya se usó recientemente? → rotar

POOL DE CIUDADES CON PERFIL CLIMÁTICO (rotar entre estos):

Fríos / cuatro estaciones marcadas:
  Boston, Minneapolis, Detroit, Denver, Chicago, Philadelphia,
  Pittsburgh, Cleveland, Kansas City

Templados / estacionales suaves:
  Atlanta, Charlotte, Nashville, Raleigh, Washington DC,
  Portland OR, Seattle, San Francisco

Secos / calor sin humedad:
  Phoenix, Las Vegas, Albuquerque, El Paso, Salt Lake City

Cálidos / con verano húmedo pero invierno real:
  Dallas, Houston, San Antonio, Austin, New Orleans

Costa / similar a Florida pero con invierno:
  Los Angeles, San Diego, New York, Miami Beach (referencia interna)

NUNCA fijar NY + Chicago + Houston como trío por defecto.
Esas son las más obvias — y por eso las menos interesantes editorialmente.
```

**Ángulos de comparación según argumento del artículo:**
- "El agresor es constante todo el año" → contrastar con ciudad con invierno real (Boston, Minneapolis, Denver)
- "Calor + humedad simultáneos" → contrastar con ciudad de calor seco (Phoenix, Las Vegas)
- "Sin temporada de recuperación" → contrastar con ciudad estacional (Atlanta, Nashville, Charlotte)
- "Pool y playa de forma habitual" → contrastar con ciudad sin esa exposición regular (Seattle, Portland, Denver)
- "Cabello latino en este clima" → considerar ciudades con comunidades latinas grandes y clima diferente (Dallas, Los Angeles, San Antonio)

---

## LAYER 7 · QA

**Función:** Verificación de cumplimiento antes de entregar. Segunda validación de compliance — si L1 hizo su trabajo, L7 pasa limpio. Si L7 encuentra violación hard, es fallo de L1.

**Checklist blog / artículo largo:**
- ✓ Idioma correcto y consistente
- ✓ Dolor reconocible en los primeros 100 palabras
- ✓ Fórmula dolor→mecanismo→beneficio presente en al menos una sección
- ✓ Ningún patrón H+AIFE en el output
- ✓ Voz de marca del `humanize_profiles[brand_id]` respetada
- ✓ Al menos un trigger PSYCHO activo e implícito
- ✓ Suggest block o CTA de flujo presente
- ✓ Keyword principal en primeros 100 chars (si SEO activo)
- ✓ **Sin términos de compliance_rules[severity=hard]** — si aparece alguno, fallo crítico
- ✓ **Reglas soft aplicadas donde correspondía** — declarar si alguna no se pudo cumplir
- ✓ No empieza con nombre del producto como sujeto
- ✓ No termina con resumen que repite lo ya dicho
- ✓ **Test Patricia:** ¿sonaría en la silla del salón? Sí / revisar

**Output:** PASS → entrega | FAIL → gaps específicos + corrección automática + re-verificar

**Regla crítica:** QA no es opcional. Sin QA no hay ICR.

---

## COMPLIANCE — MODELO DE PONDERACIÓN POR SEVERITY

### Tabla de comportamiento por nivel

| Severity | Posición en pipeline | Comportamiento | En caso de violación |
|---|---|---|---|
| `hard` | L1 pre-filtro + L7 QA | Restricción de generación: el término nunca se produce | BLOCK en L1. Si pasa a L7 = fallo crítico de L1. No se entrega hasta corregir. |
| `soft` | L5 shaping + L7 QA | Constraint estructural: moldea decisiones editoriales | Adjustment: se adapta y se declara el ajuste antes de entregar. No bloquea. |
| Global fallback (`brand_id: null`) | L7 QA únicamente | Red de seguridad del ecosistema | Igual que hard si severity=hard. No sustituye reglas de marca. |

### Comportamiento BLOCK — sin compliance_rules de marca

```
Condición de activación:
  compliance_rules WHERE brand_id = [marca] AND active = true → 0 rows

Acción obligatoria:
  1. NO generar ningún output de contenido público
  2. Declarar: "No encontré compliance_rules activas para [marca].
     Antes de generar contenido que irá al público necesito que confirmes
     las reglas de compliance para esta marca."
  3. Proponer reglas basadas en:
     - brand_copy_profiles[compliance_prohibited_words] si existe
     - Categoría del negocio inferida de brand_personas
     - Global rules como piso mínimo
  4. Esperar confirmación de Sam antes de continuar

Excepción: contenido INTERNO (briefs, documentos de estrategia, análisis)
  → No requiere compliance_rules. El BLOCK aplica solo a contenido
     destinado a publicación o distribución al público.
```

### Cobertura de compliance por marca — estado al 2026-05-12

| Marca | Hard rule | Soft rule | Estado pipeline |
|---|---|---|---|
| NeuroneSCF | ✅ FL_US | ✅ FL_US | ✅ Ready |
| D7Herbal | ✅ ES | ❌ pendiente | ⚠️ Soft gap |
| DiamondDetails | ✅ ES | ❌ pendiente | ⚠️ Soft gap |
| PatriciaOsorioPersonal | ✅ FL_US | ✅ FL_US | ✅ Ready |
| PatriciaOsorioComunidad | ✅ FL_US | ✅ FL_US | ✅ Ready |
| PatriciaOsorioVizosSalon | ✅ FL_US | ✅ FL_US | ✅ Ready |
| VivoseMask | ✅ ES | ❌ pendiente | ⚠️ Soft gap |
| VizosCosmetics | ✅ global | ❌ pendiente | ⚠️ Soft gap |
| UnrealvilleStores | ✅ US | ✅ US | ✅ Ready |
| UnrealvilleStudio | ✅ global | ✅ global | ✅ Ready |
| **ForumPHs** | ❌ no existe | ❌ no existe | 🔴 BLOCK — setup completo requerido |
| Global fallback (`null`) | ✅ x3 | — | Red de seguridad únicamente |

**Notas:**
- ⚠️ Soft gap: puede correr pero sin constraints estructurales de distribución/geo/tono. Sam debe decidir si bloquear o permitir con advertencia.
- 🔴 BLOCK completo: ForumPHs no tiene ningún dato en Supabase — no solo compliance. Requiere setup desde cero.
- Marcas con solo hard (D7Herbal, DiamondDetails, VivoseMask, VizosCosmetics): L1 pre-filtro activo, pero L5 shaping no tiene base. Corren con advertencia de soft gap.

---

## MULTIMARCA — CONFIGURACIÓN

| Marca | Persona prioritaria | Tono L0 | Vocabulario de reemplazo | Evitar |
|---|---|---|---|---|
| **NeuroneSCF B2C** | `b2c_latina_color` + `b2c_latina_repair` | Cercano, técnico-accesible, Spanglish natural | Específico fibra capilar y clima Florida | Clínico frío · jerga sin traducir |
| **NeuroneSCF B2B** | `b2b_salon_owner` + `b2b_colorist` | Directo, datos primero, entre pares | Márgenes · exclusividad · protocolo | Consumer language · promesas emocionales |
| **UNRLVL / Lucien** | `brand_personas[UNRLVL]` | Directivo, técnico, sin adornos | Específico de negocio y craft | Corporativo genérico · buzzwords de agencia |
| **ForumPHs** | `brand_personas[ForumPHs]` | Legal-técnico accesible | Términos legales exactos | Jerga que Ivette no usaría |
| **PO (Patricia)** | `person_blueprints[PO]` | Cálido, femenino, motivacional | Experiencia directa, primera persona | Frío · transaccional · corporativo |

---

## ARQUITECTURA DE CACHE — COMBUSTIBLE DEL PIPELINE

```
Supabase (fuente de verdad)
    ↓ sync on-demand o scheduled
/brand-cache/[brand_id].json  ← endpoint Vercel ✅ LIVE
    ↓ fetch único al inicio de sesión / pipeline run
Claude + CopyLab + Agents IID + Orchestrator
```

**Al cache (estable):**
`brand_personas` · `brand_copy_profiles` · `humanize_profiles` · `psycho_presets` · `compliance_rules` · `brand_goals` · `geomix` · `channel_prompt_rules`

**NO al cache (operacional — siempre fresh):**
`keywords` · `seo_meta` · `pipeline_results` · `scheduled_posts`

---

## ACTIVACIÓN EN AGENTES IID

| Agente IID | Layer que ejecuta |
|---|---|
| WRITE agent | L0 (carga brand-cache + compliance check) + L1 (draft + pre-filtro hard) |
| H+AIFE agent | L2 |
| HUMANIZE agent | L3 |
| PSYCHO agent | L4 |
| CRO/SEO agent | L5 (shaping soft) + L6 |
| QA agent | L7 (segunda validación compliance) |

**Regla crítica para agentes:** Si L0 devuelve BLOCK por ausencia de compliance_rules, ningún agente downstream ejecuta. El orchestrator escala a Sam antes de continuar.

---

## AUTO-CHECK DE CLAUDE

Antes de entregar cualquier output de texto público:

```
 0. ¿Existen compliance_rules activas para esta marca?      → Sí / BLOCK y proponer
 1. ¿L0 activo? ¿Sé a quién le hablo?                      → Sí / cargar brand_personas
 2. ¿Pain point reconocible en el primer bloque?            → Sí / añadir ancla
 3. ¿Palabras de lista negra H+AIFE presentes?              → Reemplazar
 4. ¿Términos hard de compliance_rules en el output?        → FALLO CRÍTICO — corregir antes de entregar
 5. ¿Reglas soft aplicadas donde correspondía?              → Sí / declarar ajuste si no se pudo
 6. ¿Oraciones con variación de longitud?                   → Ajustar si uniformes
 7. ¿Paralelismos automáticos?                              → Destruir
 8. ¿Hedging innecesario?                                   → Eliminar
 9. ¿Más de 2 bold por 500 palabras?                        → Reducir
10. ¿Bullets donde debería ser prosa?                       → Convertir
11. ¿Participios presentes en cadena?                       → Reescribir como activas
12. ¿Beneficio en experiencia del usuario?                  → Sí / reencuadrar
13. ¿Objeción principal de esta audiencia abordada?         → Sí / integrar en estructura
14. ¿Test Patricia: sonaría en la silla del salón?          → Sí / revisar
15. ¿QA completo?                                           → PASS antes de entregar
```

---

## TABLAS SUPABASE — REFERENCIA

| Tabla | Función | Layer | RLS |
|---|---|---|---|
| `brand_personas` | Perfil audiencia · pain points · objeciones · copy hooks | L0 | ✅ |
| `brand_copy_profiles` | Voz de marca · tono · estilo · compliance_prohibited_words | L0 + L1 | ✅ |
| `humanize_profiles` | Parámetros H+AIFE por marca y medio | L2 | ✅ |
| `geomix` | Geo intelligence · slang local · cultural refs | L0 + L6 | ✅ |
| `compliance_rules` | Reglas hard (L1 pre-filtro) + soft (L5 shaping) + QA | L0 + L1 + L5 + L7 | ✅ |
| `brand_goals` | Objetivos estratégicos activos | L0 | ✅ |
| `channel_prompt_rules` | Tipos de prompt permitidos por canal | L1 | ✅ |
| `keywords` | Keywords por marca | L1 + L6 | ✅ |
| `output_templates` | Longitud y estructura por content_type | L1 | ✅ |
| `seo_meta` | Meta titles y descriptions | L6 | ✅ (vacía — poblar) |
| `pipeline_skills` | Config del pipeline | Sistema | ✅ anon SELECT · service_role ALL |
| `pipeline_results` | Resultados de runs | Sistema | ✅ authenticated SELECT · service_role ALL |

---

*CONTENT PIPELINE SKILL v2.2 · Unreal>ille Studio · 2026-05-12*  
*Actualiza: v2.1 (2026-05-11)*  
*Motor: 7 layers · Compliance: L1 pre-filtro (hard) + L5 shaping (soft) + L7 QA*
