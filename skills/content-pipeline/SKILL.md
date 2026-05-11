# CONTENT PIPELINE SKILL
## UNRLVL · Versión canónica · v2.0
**Propietario:** Unreal>ille Studio · Sam  
**Estado:** ICR ✅ — R4B (Ready for Business)  
**Ruta canónica:** `skills/content-pipeline/SKILL.md`  
**Reemplaza:** `skills/CONTENT_PIPELINE_SKILLS.md` v1.1 + `skills/aife/SKILL.md` v1.1 — ambos deprecados  
**Última actualización:** 2026-05-11 · v2.1

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
  ├── [L1] WRITE                → Draft base desde brand_copy_profiles
  ├── [L2] H+AIFE               → Humanización profunda + borrado de huella IA
  ├── [L3] HUMANIZE EMOTIONAL   → Dolor → mecanismo → beneficio sentido
  ├── [L4] PSYCHO               → Capas psicológicas de persuasión
  ├── [L5] CRO                  → Arquitectura de conversión + desarme de objeciones
  ├── [L6] SEO                  → Optimización de búsqueda (si aplica)
  └── [L7] QA                   → Verificación final antes de entrega
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

## LAYER 0 · AUDIENCE BRIEF

**Función:** Cargar el contexto de audiencia antes de generar cualquier contenido. Layer fundacional — sin él, todos los demás operan en abstracto y producen contenido técnicamente correcto pero emocionalmente neutro.

**Fuentes de datos (Supabase → brand-cache):**

| Tabla | Columnas clave | Para qué |
|---|---|---|
| `brand_personas` | `persona_key` · `pain_points` · `motivations` · `objections` · `copy_hooks` · `buying_trigger` · `tone_for_segment` · `avoid` | Perfil completo del receptor |
| `brand_copy_profiles` | `voice_tone_primary` · `voice_writing_style` · `style_hooks` · `style_signature_phrases` · `style_avoid_phrases` | Voz de marca para WRITE |
| `geomix` | `local_slang` · `avoid_slang` · `cultural_refs` · `language` | Contexto geográfico y cultural |
| `brand_goals` | Objetivos estratégicos activos | Dirección de conversión |
| `compliance_rules` | Claims prohibidos · disclaimers obligatorios | Qué no se puede decir |

**Input contract:** `brand_id` + `content_type` + `persona_key` (si declarado) + `language`  
**Output contract:** brief de audiencia activo — contexto de sistema que alimenta L1-L7

**Selección de persona:**
```
persona_key declarado   → cargar esa persona
B2C sin declarar        → persona priority=1 del brand
B2B sin declarar        → persona B2B priority=1
blog editorial          → combinar top 2 personas B2C activas
```

**Ejemplo cargado — NSCF B2C (`b2c_latina_color`):**
```
Segmento:       Mujer Latina Cabello Teñido · 30-45 · Miami
Pain points:    "Cabello teñido que se destiñe rápido"
                "Frizz clima Miami"
                "Productos que prometen y no cumplen"
Motivaciones:   Mantener color vibrante · Cabello saludable sin daño
Objeciones:     "Precio más alto que supermercado"
                "No conoce la marca"
                "Desconfía marcas nuevas en e-commerce"
Buying trigger: Recomendación estilista o PO en redes. UGC resultado visible.
Tono:           Cercano, técnico-accesible. Spanglish natural.
Copy hooks:     "¿Tu color dura menos de 3 semanas?"
                "La tecnología que Miami necesitaba"
Avoid:          Jerga técnica sin traducir · Tono clínico frío
Geo Miami:      local_slang + cultural_refs activos desde geomix
```

**Regla crítica:** si no existe `brand_personas` para el `brand_id` → usar `DEFAULT_PERSONA` y declarar el gap. Un output sin audiencia definida no es ICR.

---

## LAYER 1 · WRITE

**Función:** Generar el draft base a partir del perfil de marca y el brief de audiencia de L0.

**Fuentes:** `brand_copy_profiles[brand_id]` + output L0 + `keywords[brand_id]` + `output_templates[brand_id + content_type]`

**Input contract:** brief L0 + `product_id | ad_brief | social_brief` + `content_type` + `language`  
**Output contract:** texto draft en el idioma declarado, sin humanizar ni aplicar persuasión.

**Fallbacks:**
```
Sin brand_copy_profiles → DEFAULT_COPY_PROFILE + declarar gap
Sin keywords            → generar sin keyword injection + declarar
Sin output_templates    → longitud estándar por content_type
Sin persona en L0       → ERROR EXPLÍCITO — no continuar
```

**No hace:** no humaniza, no aplica psicología, no optimiza. Solo genera el material base con la voz correcta dirigido a la audiencia correcta.

---

## LAYER 2 · H+AIFE (Humanize + AI Footprint Eraser)

**Función:** Eliminar toda huella de escritura generada por IA — a nivel superficial (perceptible por lector promedio) y profundo (detectable por herramientas, lingüistas y análisis estadístico de patrones).

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

*Origen: análisis de patrones matemáticos identificados en producción masiva de LLMs 2023-2026*

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
- **Longitud de frases uniforme** (IA varía entre 15-25 palabras constante) → variación real: frases cortas 5-8 palabras como anclas emocionales + frases largas para desarrollo técnico
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

Cabello latino, clima de Miami, humedad constante — tres variables que los
laboratorios en Europa y Japón no tienen en sus protocolos de prueba.
Neurone sí.

La diferencia se nota en semanas, no en promesas."
```

**Regla crítica:** H+AIFE no cambia mensaje ni información — solo la forma. Conflicto entre naturalidad y precisión → gana la precisión.

---

## LAYER 3 · HUMANIZE EMOTIONAL

**Función:** Traducir mecanismos técnicos correctos en experiencia humana reconocible. Convierte "información precisa" en "me está hablando a mí."

**Posición:** después de H+AIFE. Presupone texto ya limpio — ahora lo hace relevante para esta persona específica.

**La fórmula canónica:**

```
DOLOR RECONOCIBLE  →  MECANISMO (una línea)  →  BENEFICIO SENTIDO
```

**DOLOR RECONOCIBLE:** El momento de frustración concreto que el receptor ya vivió. Fuente: `pain_points[brand_personas]`.
Para NSCF: no "pérdida de color" — sino "el jueves con el cabello opaco cuando el lunes saliste perfecta del salón."

**MECANISMO (una línea):** La lógica del por qué, en una frase sin jerga. El puente entre el dolor y la solución.
Para NSCF: no "la cutícula permanece en estado de apertura parcial" — sino "Miami mantiene tu cutícula abierta casi todo el año, y por ahí se va el color."

**BENEFICIO SENTIDO:** Qué va a notar diferente, en experiencia real. Fuente: `motivations[brand_personas]`.
Para NSCF: no "mayor retención del pigmento" — sino "el viernes con el mismo color del lunes."

**Ejemplo completo — NSCF Art 01:**
```
ANTES (correcto pero neutro):
"La cutícula permanece parcialmente abierta con la humedad alta.
Las moléculas de color migran hacia afuera."

DESPUÉS:
"¿Tu color se ve vivo el lunes y opaco el jueves, sin haber hecho
nada diferente?

No es tu imaginación. En Miami la humedad mantiene la cutícula
abierta casi todo el año — y por ahí se va el color, despacio,
desde el día después de tu cita.

Con el protocolo correcto, ese viernes de color vivo empieza a
parecerse mucho más al lunes."
```

**El test de Patricia:** ¿sonaría esto en la silla del salón, en conversación con una clienta de 35 años? Si suena a white paper, este layer no terminó.

**B2B:** misma fórmula, dolor de negocio. "La clienta pregunta por productos que no tienes" → "los proveedores genéricos no tienen exclusividad real" → "exclusividad en tu zona, precio de distribuidor."

**Fuente:** `brand_personas[brand_id]` → `pain_points` + `motivations` + `copy_hooks`  
**No hace:** no cambia datos ni argumentos. Si el argumento base era débil, este layer no lo rescata.

---

## LAYER 4 · PSYCHO

**Función:** Inyectar capas psicológicas de persuasión calibradas al objetivo del contenido y la audiencia de L0.

**Fuente:** `psycho_presets[preset_id]` (10 presets activos en Supabase)

**Campos disponibles por preset — cada uno tiene instrucción específica por medio:**

| Campo | Medio | Usa cuando... |
|---|---|---|
| `injection_copy` | Texto | Blog, producto, ad, landing, email |
| `injection_visual` | Imagen | ImageLab, prompts visuales, thumbnails |
| `injection_video` | Video | VideoLab, scripts de video, reels |
| `injection_voice` | Audio | VoiceLab, scripts de locución |

Claude en chat usa `injection_copy`. Los labs de producción (ImageLab, VideoLab, VoiceLab) consumen su campo correspondiente del mismo preset — mismo trigger psicológico, ejecución adaptada al medio.

**Los 10 presets:**

| ID | Nombre | Uso principal | `injection_copy` resumido |
|---|---|---|---|
| PSY-URGENCY | Urgencia | Tiempo limitado | Lenguaje de ventana temporal, deadline, CTA directo |
| PSY-SCARCITY | Escasez | Disponibilidad limitada | Disponibilidad reducida sin cifras inventadas |
| PSY-AUTHORITY | Autoridad | Credencial experta | Dato concreto en primeros 15 palabras, tono didáctico |
| PSY-TRUST | Confianza | Seguridad en la decisión | Transparencia, especificidad, sin exageraciones |
| PSY-SOCIAL-PROOF | Prueba social | Validación por comunidad | Número concreto o testimonio real integrado |
| PSY-FOMO | FOMO | Miedo a perderse algo | Referencia a lo que otros ya tienen, pregunta retórica |
| PSY-ASPIRATION | Aspiración | Identidad deseada | Estado futuro primero, producto después |
| PSY-IDENTITY | Identidad | Pertenencia a tribu | Conectar producto con rasgo de identidad del ICP |
| PSY-BELONGING | Pertenencia | No estar solo | Lenguaje inclusivo, referencia a comunidad compartida |
| PSY-CURIOSITY | Curiosidad | Enganche intelectual | Abre con pregunta o dato sorpresivo, gap de información |

**Combinaciones default:**

| Content type | NSCF B2C | NSCF B2B |
|---|---|---|
| Descripción producto | PSY-AUTHORITY + PSY-TRUST + PSY-ASPIRATION | PSY-AUTHORITY + PSY-TRUST |
| Blog post | PSY-CURIOSITY + PSY-AUTHORITY + PSY-BELONGING | PSY-AUTHORITY + PSY-SOCIAL-PROOF |
| Ad performance | PSY-URGENCY + PSY-SCARCITY | PSY-FOMO + PSY-AUTHORITY |
| Post orgánico | PSY-CURIOSITY + PSY-BELONGING | PSY-IDENTITY + PSY-BELONGING |
| Landing page | PSY-ASPIRATION + PSY-SOCIAL-PROOF + PSY-TRUST | PSY-AUTHORITY + PSY-TRUST |

**Regla crítica:** los triggers no se nombran ni se declaran en el output. Trabajan en la arquitectura del texto/visual/audio, no en el copy superficial.

---

## LAYER 5 · CRO (Conversion Rate Optimization)

**Función:** Estructurar el contenido para maximizar la acción deseada **y desarmar las objeciones específicas de esta audiencia** antes de que bloqueen la conversión. La persuasión emocional viene de PSYCHO — CRO estructura el viaje de decisión y gestiona la fricción.

**Fuente:** `brand_personas[brand_id]` → `objections` + `buying_trigger`

**Objeciones NSCF B2C y cómo CRO las desarma:**

| Objeción | Estrategia |
|---|---|
| "Precio más alto que supermercado" | Justificación de valor antes del precio: protocolo específico para Miami, formulación que los supermercados no tienen, 35 años de expertise de Patricia. El precio no se defiende — se contextualiza. |
| "No conoce la marca" | Señales de autoridad temprana: Patricia como cara visible con trayectoria concreta, distribuidora autorizada Neurone Cosmética, el único protocolo diseñado para este clima específico. |
| "Desconfía marcas nuevas en e-commerce" | Prueba social (UGC, resultados visibles) + transparencia de proceso + Patricia como garantía humana — persona real, no marca anónima. |

**Objeciones NSCF B2B:**

| Objeción | Estrategia |
|---|---|
| "¿Exclusividad real?" | Especificar zona geográfica, proceso de onboarding, compromisos de la distribuidora. Exclusividad documentada, no promesa vaga. |
| "¿Mínimo de pedido?" | Comunicar flexibilidad de entrada (kit de inicio, primer pedido bajo) antes de hablar de catálogo completo. |

**Estructura CRO para descripción de producto B2C:**
1. Hook: problema o deseo — sin nombrar el producto primero
2. Beneficio principal: resultado para el usuario, no características
3. Prueba o credencial: por qué creerlo — dato concreto
4. Diferenciador + desarme objeción de precio: valor antes de número
5. Cierre orientado a acción

**Estructura CRO para blog post:**
- Acción primaria: leer siguiente artículo (suggest block Patricia) o ir al producto referenciado
- Acción secundaria: guardar / compartir / suscribir
- Flujo de intención: cada párrafo empuja hacia la siguiente acción o está sobrando

**Estructura CRO para ads:**
- Hook de interrupción: primeros 3 segundos / 5 palabras
- Propuesta de valor: antes de 8 segundos / 15 palabras
- Un solo CTA

---

## LAYER 6 · SEO

**Función:** Asegurar que el contenido es indexable y relevante para búsquedas declaradas.

**Aplica a:** meta titles, meta descriptions, headings, copy de página, blog posts  
**No aplica a:** stories, reels, posts efímeros, conversación

**Reglas:**
- Keyword principal en los primeros 100 caracteres
- Keyword secundaria: una vez en el cuerpo, de forma natural
- Densidad máximo 2-3%
- Meta description: 150-160 chars, orientada a click
- SEO title: máximo 60 chars, brand suffix obligatorio

**NSCF blog — estrategia geo SEO:**
- Miami / South Florida como anchor de autoridad en los primeros 12-15 artículos antes de expandir
- Encuadre: "Miami como caso extremo del que deriva autoridad universal" — si funciona aquí, funciona en cualquier clima húmedo
- No abrir track USA genérico hasta tener tráfico orgánico establecido en South Florida
- `geomix[NeuroneSCF]` → `local_slang` y `cultural_refs` activos — incorporar de forma natural

**Fuente:** `seo_meta[brand_id]` + `keywords[brand_id]` + `geomix[brand_id]`

---

## LAYER 7 · QA

**Función:** Verificación de cumplimiento antes de entregar o publicar.

**Checklist blog / artículo largo:**
- ✓ Idioma correcto y consistente
- ✓ Dolor reconocible en los primeros 100 palabras
- ✓ Fórmula dolor→mecanismo→beneficio presente en al menos una sección
- ✓ Ningún patrón H+AIFE en el output
- ✓ Voz de marca del `humanize_profiles[brand_id]` respetada
- ✓ Al menos un trigger PSYCHO activo e implícito
- ✓ Suggest block o CTA de flujo presente
- ✓ Keyword principal en primeros 100 chars (si SEO activo)
- ✓ Sin claims prohibidos (`compliance_rules[brand_id]`)
- ✓ No empieza con nombre del producto como sujeto
- ✓ No termina con resumen que repite lo ya dicho
- ✓ **Test Patricia:** ¿sonaría en la silla del salón? Sí / revisar

**Checklist descripción de producto:**
- ✓ Hook resuelve dolor antes de nombrar el producto
- ✓ Beneficio en experiencia del usuario, no en propiedad del producto
- ✓ Credencial o prueba presente
- ✓ Objeción de precio/marca abordada en la estructura (si B2C)
- ✓ Un solo CTA
- ✓ Sin patrones H+AIFE
- ✓ Compliance respetado

**Output:** PASS → entrega | FAIL → gaps específicos + corrección automática + re-verificar

**Regla crítica:** QA no es opcional. Sin QA no hay ICR.

---

## MULTIMARCA — CONFIGURACIÓN

| Marca | Persona prioritaria | Tono L0 | Vocabulario de reemplazo | Evitar |
|---|---|---|---|---|
| **NeuroneSCF B2C** | `b2c_latina_color` + `b2c_latina_repair` | Cercano, técnico-accesible, Spanglish natural | Específico fibra capilar y clima Miami | Clínico frío · jerga sin traducir |
| **NeuroneSCF B2B** | `b2b_salon_owner` + `b2b_colorist` | Directo, datos primero, entre pares | Márgenes · exclusividad · protocolo | Consumer language · promesas emocionales |
| **UNRLVL / Lucien** | `brand_personas[UNRLVL]` | Directivo, técnico, sin adornos | Específico de negocio y craft | Corporativo genérico · buzzwords de agencia |
| **ForumPHs** | `brand_personas[ForumPHs]` | Legal-técnico accesible | Términos legales exactos | Jerga que Ivette no usaría |
| **PO (Patricia)** | `person_blueprints[PO]` | Cálido, femenino, motivacional | Experiencia directa, primera persona | Frío · transaccional · corporativo |

---

## ARQUITECTURA DE CACHE — COMBUSTIBLE DEL PIPELINE

El pipeline consume datos de Supabase. Para producción (agentes IID, Claude en chat):

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

**Mientras el endpoint no existe:** Claude consulta Supabase directamente con las tablas declaradas en L0.

---

## ACTIVACIÓN EN AGENTES IID

| Agente IID | Layer que ejecuta |
|---|---|
| WRITE agent | L0 (carga brand-cache) + L1 (draft) |
| H+AIFE agent | L2 |
| HUMANIZE agent | L3 |
| PSYCHO agent | L4 |
| CRO/SEO agent | L5 + L6 |
| QA agent | L7 |

Sin brand-cache en L0, ningún agente ejecuta — error explícito antes que output sin audiencia.

---

## AUTO-CHECK DE CLAUDE

Antes de entregar cualquier output de texto público:

```
 1. ¿L0 activo? ¿Sé a quién le hablo?              → Sí / cargar brand_personas
 2. ¿Pain point reconocible en el primer bloque?    → Sí / añadir ancla
 3. ¿Palabras de lista negra H+AIFE presentes?      → Reemplazar
 4. ¿Oraciones con variación de longitud?           → Ajustar si uniformes
 5. ¿Paralelismos automáticos?                      → Destruir
 6. ¿Hedging innecesario?                           → Eliminar
 7. ¿Más de 2 bold por 500 palabras?                → Reducir
 8. ¿Bullets donde debería ser prosa?               → Convertir
 9. ¿Participios presentes en cadena?               → Reescribir como activas
10. ¿Beneficio en experiencia del usuario?          → Sí / reencuadrar
11. ¿Objeción principal de esta audiencia abordada? → Sí / integrar en estructura
12. ¿Test Patricia: sonaría en la silla del salón?  → Sí / revisar
13. ¿QA completo?                                   → PASS antes de entregar
```

---

## TABLAS SUPABASE — REFERENCIA

| Tabla | Función | Layer | RLS |
|---|---|---|---|
| `brand_personas` | Perfil audiencia · pain points · objeciones · copy hooks | L0 | ✅ |
| `brand_copy_profiles` | Voz de marca · tono · estilo · compliance | L0 + L1 | ✅ |
| `humanize_profiles` | Parámetros H+AIFE por marca y medio | L2 | ✅ |
| `geomix` | Geo intelligence · slang local · cultural refs | L0 + L6 | ✅ |
| `compliance_rules` | Claims prohibidos · disclaimers obligatorios | L7 | ✅ |
| `psycho_presets` | 10 presets PSYCHO | L4 | ✅ |
| `brand_goals` | Objetivos estratégicos activos | L0 | ✅ |
| `channel_prompt_rules` | Tipos de prompt permitidos por canal | L1 | ✅ |
| `keywords` | Keywords por marca | L1 + L6 | ✅ |
| `output_templates` | Longitud y estructura por content_type | L1 | ✅ |
| `seo_meta` | Meta titles y descriptions | L6 | ✅ (vacía — poblar) |
| `pipeline_skills` | Config del pipeline | Sistema | ✅ anon SELECT · service_role ALL |
| `pipeline_results` | Resultados de runs | Sistema | ✅ authenticated SELECT · service_role ALL |

---

*CONTENT PIPELINE SKILL v2.1 · Unreal>ille Studio · 2026-05-11*  
*Consolida y reemplaza: `skills/CONTENT_PIPELINE_SKILLS.md` v1.1 + `skills/aife/SKILL.md` v1.1*  
*Motor: 7 layers · Combustible: brand cache desde Supabase*
