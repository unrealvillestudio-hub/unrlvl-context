# CONTENT PIPELINE SKILL
## UNRLVL · Versión canónica · v2.5
**Propietario:** Unreal>ille Studio · Sam  
**Estado:** ICR ✅ — R4B (Ready for Business)  
**Ruta canónica:** `skills/content-pipeline/SKILL.md`  
**Reemplaza:** v2.4 (2026-05-12)  
**Última actualización:** 2026-05-18 · v2.5

**Cambios v2.5:**
- Nuevo `content_type`: `email_sequence` — con sequence awareness obligatorio
- Nueva sección `SEQUENCE RULE` en L5 CRO
- Punto 16 en AUTO-CHECK: verificación de diferenciación de secuencia
- Tabla de activación de layers actualizada con `email_sequence`
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

Estándar de calidad firma de Unreal>ille Studio. Una solución alcanza ICR cuando su output es verificablemente consistente bajo las mismas condiciones, sin supervisión manual constante.

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
  │         └── COMPLIANCE CHECK → ¿Existen compliance_rules para esta marca?
  │         └── SEQUENCE CHECK  → ¿Es parte de una secuencia? → cargar piezas anteriores
  │
  ├── [L1] WRITE                → Draft base desde brand_copy_profiles
  │         └── COMPLIANCE PRE-FILTRO (severity: hard)
  │
  ├── [L2] H+AIFE               → Humanización profunda + borrado de huella IA
  ├── [L3] HUMANIZE EMOTIONAL   → Dolor → mecanismo → beneficio sentido
  ├── [L4] PSYCHO               → Capas psicológicas de persuasión
  │
  ├── [L5] CRO                  → Arquitectura de conversión + desarme de objeciones
  │         └── COMPLIANCE SHAPING (severity: soft)
  │         └── SEQUENCE RULE   → Si position > 1: mecanismo ≠ pieza anterior
  │
  ├── [L6] SEO                  → Optimización de búsqueda (si aplica)
  └── [L7] QA                   → Verificación final
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
| Email marketing (standalone) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Email sequence (pieza N≥1)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Contenido UNRLVL / Lucien | ✅ | ✅ | ✅ | ✅ | ✅ | med | med | ✅ |

---

## LAYER 0 · AUDIENCE BRIEF + COMPLIANCE CHECK + SEQUENCE CHECK

**Función:** Cargar el contexto de audiencia antes de generar. Fundacional — sin él, todos los demás operan en abstracto.

### COMPLIANCE CHECK

```
PASO 1: Verificar compliance_rules[brand_id]
   ¿Existen rows activos?
   
   SÍ → cargar todas las reglas por severity:
        hard[]  → pasar a L1 como pre-filtro de generación
        soft[]  → pasar a L5 como constraints de shaping
        Continuar pipeline normalmente.

   NO → BLOCK ⛔
        Declarar gap y proponer reglas antes de continuar.
```

### SEQUENCE CHECK (nuevo en v2.5)

```
PASO 1: ¿Es este output parte de una secuencia?
   content_type = 'email_sequence' → SÍ obligatorio
   Otros content_types → verificar si el brief indica posición en secuencia

PASO 2: Si es parte de una secuencia:
   → Cargar piezas anteriores desde content_sequence_pieces
     (sequence_id + position < posición actual)
   → Declarar position en el brief: "Cart A = position 1, Cart B = position 2"
   → El output de piezas anteriores es INPUT OBLIGATORIO de L5
   → Si no existen piezas anteriores y position > 1: BLOCK
     Declarar: "No encontré la pieza anterior de esta secuencia.
     No puedo garantizar diferenciación de mecanismo sin leerla."

PASO 3: Registrar el mecanismo primario de cada pieza anterior
   → mechanism_primary del registro en content_sequence_pieces
   → Si no está registrado: inferirlo del body de la pieza anterior
   → Este dato es el input crítico del SEQUENCE RULE en L5
```

**Fuentes de datos:**

| Tabla | Para qué |
|---|---|
| `brand_personas` | Perfil completo del receptor |
| `brand_copy_profiles` | Voz de marca para WRITE |
| `humanize_profiles` | Parámetros H+AIFE |
| `compliance_rules` | Reglas hard y soft |
| `brand_goals` | Objetivos estratégicos activos |
| `content_sequence_pieces` | Piezas anteriores de la secuencia activa |
| `product_blueprints` / SP metafields | Social proof del producto específico si aplica |

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

**Regla operativa:** `puede` / `ayuda a` / `contribuye a` son vocabulario de reemplazo **exclusivamente para claims de mecanismo**. No se aplican a hooks emocionales, descripciones de experiencia, ni citas directas de PO.

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
- El protagonista es SIEMPRE "tu cabello" / "your hair" — nunca el clima, la marca, ni el producto en abstracto
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

**El test de Patricia (NeuroneSCF):** ¿sonaría esto en la silla del salón, en conversación entre amigas? Si suena a white paper o a email de e-commerce estándar, este layer no terminó.

**Voz de Patricia Osorio — NeuroneSCF:**
Patricia Osorio — Técnica en química capilar con 35+ años de trayectoria. Fundadora de Vizos Cosmetics - The Healing Systems, Casa Diseñadora de Belleza Capilar. Diseñadora de los Rituals & Kits de Neurone. Trabajó con las marcas más importantes del sector en 3 continentes entrenando profesionales. Propietaria de Vizos Salón en South Florida.

Su voz **nunca** explica mecanismos o propiedades técnicas. Observa el cabello, identifica el problema con la autoridad de quien lo ha visto miles de veces, y presenta la solución directamente. No vende el producto — resuelve el problema. El peso de su recomendación viene de la trayectoria, no de la explicación. Sus clientas anglófonas la entienden sin compartir idioma porque la autenticidad no necesita traducción.

Estructura canónica de la voz de PO:
> "esto es lo que le pasa a tu cabello... esto es lo que necesita."

---

## LAYER 4 · PSYCHO

**Los 10 presets:** PSY-URGENCY · PSY-SCARCITY · PSY-AUTHORITY · PSY-TRUST · PSY-SOCIAL-PROOF · PSY-FOMO · PSY-ASPIRATION · PSY-IDENTITY · PSY-BELONGING · PSY-CURIOSITY

**Regla crítica:** los triggers no se nombran en el output. Trabajan en arquitectura.

**Combinaciones default NSCF email sequences:**

| Pieza de secuencia | Presets correctos | Presets incorrectos para ese contexto |
|---|---|---|
| Cart A (primer contacto) | PSY-TRUST + PSY-AUTHORITY + PSY-FOMO implícito | PSY-URGENCY como preset primario |
| Cart B (segundo contacto) | PSY-SOCIAL-PROOF + PSY-SCARCITY (oportunidad, no inventario) + PSY-BELONGING | PSY-URGENCY + PSY-SCARCITY de inventario |
| Welcome | PSY-BELONGING + PSY-ASPIRATION + PSY-TRUST | — |
| Post Purchase | PSY-BELONGING + PSY-IDENTITY + PSY-ASPIRATION | — |
| Review Request | PSY-SOCIAL-PROOF + PSY-BELONGING | — |

**PSY-SCARCITY en Cart B — distinción crítica:**
Escasez de oportunidad ≠ escasez de inventario.
- ❌ Inventario: "quedan pocas unidades" — es escasez de marca, no de ella
- ✅ Oportunidad: "cada día sin esto es otro día con el mismo problema. El carrito no espera indefinidamente."

---

## LAYER 5 · CRO + COMPLIANCE SHAPING (soft) + SEQUENCE RULE

### COMPLIANCE SHAPING — severity: soft

Las reglas soft moldean estructura y decisiones editoriales. No bloquean palabras.

### SEQUENCE RULE (nuevo en v2.5) — crítica para ICR

```
Si content_type = 'email_sequence' AND position > 1:

REGLA 1 — DIFERENCIACIÓN DE MECANISMO
  → Leer mechanism_primary de la pieza anterior (cargado en L0)
  → El mecanismo primario de esta pieza DEBE ser diferente en eje
  → No "más intenso en el mismo eje" — diferente en el eje

  Ejemplo correcto:
    Cart A mechanism: autoridad + problema + reveal tardío del carrito
    Cart B mechanism: social proof del producto específico + scarcity de oportunidad
    → Ejes distintos ✅

  Ejemplo incorrecto:
    Cart A mechanism: urgencia + inventario
    Cart B mechanism: más urgencia + más inventario
    → Mismo eje, más intensidad ❌

REGLA 2 — PRODUCT SPECIFICITY (email sequences con carrito)
  → Cart B debe mostrar el producto específico del carrito abandonado
  → Usar variables de Klaviyo: {{ item.product_title }}, {{ item.image_url }}
  → Social proof debe ser del producto específico (metafields SP pool)
  → No hablar del carrito en abstracto — nombrar el producto

REGLA 3 — SOCIAL PROOF REAL (Cart B)
  → Social proof viene de content_sequence_pieces o product SP pool
  → Nunca inventar quotes
  → Si no hay SP disponible: usar autoridad de PO como sustituto
  → Declarar el gap antes de generar si no hay SP

REGLA 4 — NO REPETIR ARGUMENTO DE MARCA
  → Si Cart A usó la trayectoria de PO como argumento central:
    Cart B no lo repite — lo da por conocido
  → Cart B arranca desde donde Cart A dejó a la receptora
```

**Estructura CRO por tipo de pieza en email_sequence:**

| Pieza | Ancla de apertura | Reveal | CTA |
|---|---|---|---|
| Cart A (any flow) | Problema en el cabello de ella | "Eso es lo que dejaste en tu carrito" — reveal tardío | Completar pedido |
| Cart B (abandoned_cart) | Social proof de mujeres con su mismo problema + el producto que ella dejó | Carrito expirando como oportunidad | Al dolor / al resultado |
| Welcome | El problema que este clima le hace a su cabello | Bienvenida + PO como diseñadora de la solución | Explorar tienda |
| Post Purchase | Lo que va a notar — educación de uso | — | Follow / comunidad |
| Review Request | ¿Cómo está tu cabello? | Tu experiencia ayuda a la próxima | Dejar reseña |

---

## LAYER 6 · SEO

**Activación:** solo para blog, web, landing. No aplica a email sequences ni ads.

**NSCF — estrategia geo SEO:**
Florida como anchor de autoridad. Comparaciones climáticas con otras ciudades USA rotan entre piezas — nunca el mismo trío por defecto.

---

## LAYER 7 · QA

**Checklist email_sequence:**
- ✓ Protagonista: "tu cabello" / "your hair" — nunca el clima ni el producto como sujeto
- ✓ Pain point reconocible en los primeros 100 palabras
- ✓ Fórmula dolor→mecanismo→beneficio presente
- ✓ Ningún patrón H+AIFE en el output
- ✓ Voz de marca del humanize_profiles respetada
- ✓ Al menos un trigger PSYCHO activo e implícito
- ✓ Presets correctos para la posición en la secuencia
- ✓ Sin términos de compliance_rules[severity=hard]
- ✓ Reglas soft aplicadas donde correspondía
- ✓ Test Patricia: ¿sonaría en la silla del salón?
- ✓ ES y EN generados desde origen — no traducidos entre sí
- ✓ Promesas de servicio respaldadas por infraestructura operativa
- ✓ **SEQUENCE RULE verificada: mecanismo ≠ pieza anterior** ← crítica

**Output:** PASS → entrega | FAIL → gaps específicos + corrección automática

---

## AUTO-CHECK DE CLAUDE

Antes de entregar cualquier output de texto público:

```
 0. ¿Existen compliance_rules activas para esta marca?      → Sí / BLOCK y proponer
 1. ¿L0 activo? ¿Sé a quién le hablo?                      → Sí / cargar brand_personas
 2. ¿Pain point reconocible en el primer bloque?            → Sí / añadir ancla
 3. ¿Palabras de lista negra H+AIFE presentes?              → Reemplazar
 4. ¿Términos hard de compliance_rules en el output?        → FALLO CRÍTICO
 5. ¿Reglas soft aplicadas donde correspondía?              → Sí / declarar ajuste si no se pudo
 6. ¿Oraciones con variación de longitud?                   → Ajustar si uniformes
 7. ¿Paralelismos automáticos?                              → Destruir
 8. ¿Hedging innecesario en lenguaje experiencial?          → Eliminar
 9. ¿Más de 2 bold por 500 palabras?                        → Reducir
10. ¿Bullets donde debería ser prosa?                       → Convertir
11. ¿Participios presentes en cadena?                       → Reescribir como activas
12. ¿Beneficio en experiencia del usuario?                  → Sí / reencuadrar
13. ¿Objeción principal de esta audiencia abordada?         → Sí / integrar en estructura
14. ¿Test Patricia: sonaría en la silla del salón?          → Sí / revisar
15. ¿QA completo?                                           → PASS antes de entregar
16. ¿Este output es parte de una secuencia?
    → Si sí: ¿mecanismo primario ≠ al de la pieza anterior?
    → Si no: STOP — redefinir mecanismo antes de continuar
    → ¿El producto específico del carrito está nombrado? (Cart B)
    → ¿Social proof es real, no inventado?
```

---

## MULTIMARCA — CONFIGURACIÓN

| Marca | Persona prioritaria | Tono L0 | Evitar |
|---|---|---|---|
| **NeuroneSCF B2C** | 7 segmentos por tipo de dolor (b2c_color_fade, b2c_damage_repair, b2c_frizz_humidity, b2c_chlorine_sun, b2c_fine_fragile, b2c_scalp_health, b2c_default) | Diagnóstico-prescriptivo + cercanía de amistad. Voz de PO. Protagonista: tu cabello / your hair | Claims de mecanismo sin hedging · Calificativos étnicos · Promesas de servicio sin respaldo · Traducir ES↔EN |
| **NeuroneSCF B2B** | `b2b_salon_owner` + `b2b_colorist` | Directo, datos primero, entre pares | Consumer language · promesas emocionales |
| **UNRLVL / Lucien** | `brand_personas[UNRLVL]` | Directivo, técnico, sin adornos | Corporativo genérico · buzzwords de agencia |
| **ForumPHs** | `brand_personas[ForumPHs]` | Legal-técnico accesible | Jerga que Ivette no usaría |
| **PO (Patricia)** | `person_blueprints[PO]` | Cálido, femenino, motivacional | Frío · transaccional · corporativo |

---

## COMPLIANCE — COBERTURA POR MARCA

| Marca | Hard | Soft | Estado |
|---|---|---|---|
| NeuroneSCF | ✅ FL_US | ✅ FL_US | ✅ Ready |
| PatriciaOsorio* | ✅ FL_US | ✅ FL_US | ✅ Ready |
| D7Herbal | ✅ ES | ❌ pendiente | ⚠️ Soft gap |
| DiamondDetails | ✅ ES | ❌ pendiente | ⚠️ Soft gap |
| VivoseMask | ✅ ES | ❌ pendiente | ⚠️ Soft gap |
| VizosCosmetics | ✅ global | ❌ pendiente | ⚠️ Soft gap |
| ForumPHs | ❌ | ❌ | 🔴 BLOCK — setup completo requerido |

---

*CONTENT PIPELINE SKILL v2.5 · Unreal>ille Studio · 2026-05-18*  
*Motor: 7 layers · Sequence awareness: L0 + L5 SEQUENCE RULE + AUTO-CHECK punto 16*  
*Compliance: L1 pre-filtro (hard) + L5 shaping (soft) + L7 QA*
