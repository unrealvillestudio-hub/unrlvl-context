# UNRLVL Content Pipeline Skills
## Definición Canónica · ICR v1.1
**Propietario:** Unreal>ille Studio · Sam  
**Estado:** DRAFT → pendiente graduación ICR  
**Ruta canónica en repo:** `/skills/CONTENT_PIPELINE_SKILLS.md`  
**Última actualización:** 2026-05-05 · v1.1 — AIFE exhaustivo integrado desde Wikipedia AI Writing Patterns

---

## 0. Estándares del Ecosistema

### ICR — Industrial Consistency Ready
Estándar de calidad firma de Unreal>ille Studio. Una solución, herramienta, skill o proceso alcanza ICR cuando su comportamiento y output han sido verificados y producen el mismo resultado cada vez que se repite la misma actividad bajo las mismas condiciones. ICR es una promesa de negocio: el cliente y el ecosistema pueden confiar en el resultado sin supervisión manual constante. Sinónimo operativo: **R4B (Ready for Business)**.

Una solución NO es ICR si:
- Su output varía significativamente entre ejecuciones sin razón declarada
- Requiere intervención humana para corregir errores sistemáticos
- No ha pasado QA formal
- Sus reglas de operación no están documentadas en el ecosistema

### QA — Quality Assurance Layer
QA es la verificación de cumplimiento de requerimientos y objetivos **antes de entregar**. No es revisión post-entrega. No es corrección. Es la capa que garantiza que lo que se declara como "listo" realmente lo está.

**Definición operativa:** Antes de cualquier entrega — ya sea un output de texto, una acción en Shopify, un despliegue de código, o un documento — QA verifica contra un checklist de requerimientos declarados al inicio de la tarea. Si algún punto no se cumple, el output no se entrega: se corrige primero.

**Contrato:**
- Input: output generado + lista de requerimientos originales
- Output: PASS (entrega) | FAIL (lista de gaps + corrección automática)
- Costo: una llamada adicional a Claude por output — asumido como necesario para ICR

**Aplicación a Claude en chat:** Antes de responder "listo, hecho", Claude verifica internamente:
1. ¿El output cumple todos los requisitos declarados explícitamente?
2. ¿El output cumple los objetivos implícitos del contexto?
3. ¿Hay partes declaradas como resueltas que no lo están?
4. ¿El scope fue respetado o hubo omisiones?

Si detecta gaps: los declara antes de entregar, no después.

---

## 1. Pipeline de Contenido UNRLVL

### Arquitectura General

```
INPUT (producto / ad / post / brief)
  │
  ├── [1] WRITE        → Draft base desde brand_copy_profiles
  ├── [2] H+AIFE       → Humanización profunda + borrado de huella IA
  ├── [3] PSYCHO       → Capas psicológicas de persuasión
  ├── [4] CRO / SEO    → Optimización de conversión o búsqueda (por canal)
  └── [5] QA           → Verificación de cumplimiento antes de entrega
       │
OUTPUT listo para publicación / write a Shopify / entrega
```

Cada layer lee su configuración de Supabase en runtime. Ningún layer tiene lógica hardcodeada de marca — todo viene del ecosistema.

---

## 2. Layers — Definición Canónica

---

### LAYER 1 · WRITE
**Función:** Generar el draft base del contenido a partir del perfil de marca.  
**Fuente de datos:** `brand_copy_profiles[brand_id]` + `brand_personas` + `keywords`  
**Input contract:** product_id | ad_brief | social_brief + brand_id + content_type + language  
**Output contract:** texto draft en el idioma declarado, sin aplicar capas de humanización ni persuasión  
**Fallback si no hay brand_copy_profiles:** usar `brand_copy_profiles[DEFAULT]` + brand_context de Supabase. Si tampoco existe: error explícito, no inventar voz de marca.  
**No hace:** no humaniza, no aplica psicología, no optimiza SEO/CRO  
**Regla crítica:** Si no hay input suficiente para generar contenido real, devuelve error en vez de inventar.

---

### LAYER 2 · H+AIFE (Humanize + AI Footprint Eraser)
**Función:** Eliminar toda huella de escritura generada por IA — tanto a nivel superficial (perceptible por humano promedio) como a nivel profundo (perceptible por sistemas de detección, lingüistas, y análisis estadístico de patrones).

**Origen:** Artículo Wikipedia "AI Writing Patterns" — análisis exhaustivo de patrones matemáticos y estilísticos que identifican escritura IA. Analizados y convertidos en reglas de borrado activo para el ecosistema UNRLVL.

**Arquitectura del layer:** Dos subniveles integrados en una sola pasada:

---

#### H (Humanize) — Nivel 1: Patrones superficiales

Elimina lo que cualquier lector promedio nota como "suena a robot":

**Vocabulario IA por era — eliminar o sustituir activamente:**

Era 2023–mid 2024 (GPT-4):
`Additionally` (al inicio de frase), `boasts`, `bolstered`, `crucial`, `delve`, `emphasizing`, `enduring`, `garner`, `intricate/intricacies`, `interplay`, `key` (adjetivo), `landscape` (abstracto), `meticulous/meticulously`, `pivotal`, `underscore` (verbo), `tapestry` (abstracto), `testament`, `valuable`, `vibrant`

Era mid-2024 a mid-2025 (GPT-4o):
`align with`, `bolstered`, `crucial`, `emphasizing`, `enhance`, `enduring`, `fostering`, `highlighting`, `pivotal`, `showcasing`, `underscore`, `vibrant`

Era mid-2025 en adelante (GPT-5):
`emphasizing`, `enhance`, `highlighting`, `showcasing` + patrones de énfasis en notabilidad y cobertura mediática

**Patrones estructurales superficiales a eliminar:**
- Apertura de frase con el nombre del producto como sujeto directo
- Simetría excesiva entre frases: "A hace X, B hace Y, C hace Z" (rule of three sistemático)
- Transiciones artificiales: "en resumen", "en conclusión", "cabe destacar", "In summary", "Overall"
- Secciones de "Conclusión" o "Future Outlook" que resumen lo ya dicho
- Párrafo final que repite la idea central con palabras distintas
- Tono uniformemente positivo sin textura, contraste ni especificidad
- Lenguaje promocional de travel guide: `nestled`, `in the heart of`, `vibrant`, `rich cultural heritage`, `natural beauty`, `diverse array`
- Énfasis genérico de importancia: `groundbreaking`, `revolutionary`, `exceptional`, `transformador`, `renowned`, `commitment to`

---

#### AIFE (AI Footprint Eraser) — Nivel 2: Patrones profundos

Elimina los patrones matemáticos/estadísticos detectables por herramientas y lingüistas:

**Patrones de contenido — regresión a la media estadística:**
- Sustituir datos específicos por descripciones genéricas positivas ("inventor del primer dispositivo X" → "revolucionario titán de la industria")
- Énfasis injustificado en significado, legado y tendencias amplias: `stands as`, `serves as`, `marks a pivotal moment`, `represents a shift`, `setting the stage for`, `shaping the`, `key turning point`, `evolving landscape`, `indelible mark`, `deeply rooted`, `symbolizing its enduring`
- Análisis superficiales adjuntos con participio presente: frases que terminan en "...highlighting its importance", "...reflecting broader trends", "...contributing to the field", "...fostering a sense of community", "...ensuring its relevance"
- Atribuciones vagas de opinión: "Industry reports indicate", "Observers have cited", "Experts argue", "Some critics argue", "several sources suggest" — sin cita real
- Exageración de cantidad de fuentes: una fuente presentada como consenso amplio
- Afirmar que algo "ha generado debate" o "ha levantado discusión" sin evidencia de ello
- Declaraciones sobre "active social media presence" en contextos donde no aporta nada

**Patrones lingüísticos profundos:**
- **Evitar copulativos básicos:** IA reemplaza "is" / "are" con "serves as", "stands as", "marks", "represents", "boasts", "features", "maintains", "offers" → revertir a construcciones directas con "es/está/tiene"
- **Paraleliismos negativos artificiales:** "Not just X, but also Y" / "It's not X, it's Y" / "No solo X sino también Y" → reestructurar en afirmaciones directas
- **Variación elegante forzada:** IA evita repetir palabras usando sinónimos en cadena (protagonist → key player → eponymous character) por penalización de repetición → permitir repetición natural de términos clave
- **Rule of three sistemático:** "adjective, adjective, adjective" o "phrase, phrase, and phrase" como patrón formulario para aparentar exhaustividad → romper la simetría donde no sea necesaria

**Patrones estadísticos de distribución:**
- **Longitud de frases demasiado uniforme:** IA varía entre 15-25 palabras de forma consistente → introducir variación real: frases cortas de 5-8 palabras intercaladas con frases más largas
- **Colocación predecible de conectores de transición:** IA los coloca cada N oraciones → redistribuir irregularmente o eliminar donde el flujo lo permite
- **Vocabulario estadísticamente "seguro":** IA evita palabras poco frecuentes que un humano experto usaría → usar terminología técnica específica del campo cuando corresponde
- **Estructura argumental demasiado completa:** IA explicita todo; los humanos dejan cosas implícitas para el lector → permitir que algunas ideas queden sugeridas, no declaradas
- **Redundancia semántica de párrafo:** IA repite la idea central de cada párrafo con palabras distintas al inicio y al final → asegurar que cada párrafo avance, no repita

**Patrones de estilo tipográfico a verificar:**
- Em dashes en exceso para énfasis dramático estilo sales copy — reducir
- Negritas en frases clave como "key takeaways" — solo bold para términos técnicos necesarios
- Listas con inline header en negrita: `• **Header:** descripción` — convertir a prosa donde sea posible
- Title Case en subtítulos que no son nombres propios — usar sentence case

**Fuente de datos en Supabase:** `humanize_profiles[brand_id + medium]` — `vocabulary_include`, `vocabulary_exclude`, `anti_patterns`, `authenticity_rules`  
**Input contract:** texto draft del LAYER WRITE  
**Output contract:** texto con todos los patrones IA eliminados, manteniendo mensaje, información y tono de marca  
**Regla crítica:** H+AIFE no cambia el mensaje ni la información — solo la forma. Si tiene que elegir entre naturalidad y precisión informativa, gana la precisión.

---

### LAYER 3 · PSYCHO
**Función:** Inyectar capas psicológicas de persuasión calibradas al objetivo del contenido y la audiencia.  
**Fuente de datos:** `psycho_presets[preset_id]`

**10 presets disponibles:**

| ID | Nombre | Uso principal | Injection copy |
|---|---|---|---|
| PSY-URGENCY | Urgencia | Tiempo limitado, acción inmediata | Lenguaje de tiempo limitado, deadline, CTA directo |
| PSY-SCARCITY | Escasez | Disponibilidad limitada | Disponibilidad reducida (sin cifras inventadas) |
| PSY-AUTHORITY | Autoridad | Credencial experta | Dato concreto en primeros 15 palabras, tono didáctico |
| PSY-TRUST | Confianza | Seguridad en la decisión | Transparencia, especificidad, sin exageraciones |
| PSY-SOCIAL-PROOF | Prueba social | Validación por comunidad | Referencia a resultados o experiencias reales |
| PSY-FOMO | FOMO | Miedo a perderse algo | Ventana de acción, consecuencia de no actuar |
| PSY-ASPIRATION | Aspiración | Identidad deseada | Versión mejorada del usuario, resultado transformador |
| PSY-IDENTITY | Identidad | Pertenencia a tribu | Nosotros vs ellos, comunidad de valores |
| PSY-BELONGING | Pertenencia | No estar solo | Comunidad, red de pares |
| PSY-CURIOSITY | Curiosidad | Enganche intelectual | Apertura con incógnita, dato inesperado |

**Combinaciones default por content_type:**
- Producto B2C cosmetics: PSY-AUTHORITY + PSY-TRUST + PSY-ASPIRATION
- Ad de performance: PSY-URGENCY + PSY-SCARCITY
- Post orgánico: PSY-CURIOSITY + PSY-BELONGING
- B2B producto profesional: PSY-AUTHORITY + PSY-TRUST
- Landing page: PSY-ASPIRATION + PSY-SOCIAL-PROOF + PSY-TRUST

**Input contract:** texto post H+AIFE + preset_ids declarados o derivados de `brand_goals`  
**Output contract:** texto con triggers psicológicos integrados de forma natural — no mencionados explícitamente, aplicados como estructura y énfasis  
**Regla crítica:** Los triggers no se nombran. No "¡Oferta limitada!" — sino estructura y framing que activan el trigger de forma implícita.

---

### LAYER 4a · CRO (Conversion Rate Optimization)
**Función:** Estructurar el contenido para maximizar la acción deseada.  
**Aplica a:** Descripciones de producto, landing pages, ads, CTAs, posts de conversión  
**No aplica a:** Posts informativos puros, contenido de awareness de marca

**Estructura CRO para descripción de producto:**
1. **Hook (1-2 frases):** problema o deseo que resuelve — sin nombrar el producto primero
2. **Beneficio principal:** resultado para el usuario, no características del producto
3. **Prueba o credencial:** ingrediente, tecnología, resultado medible — por qué creerlo
4. **Diferenciador:** qué lo separa de alternativas
5. **Cierre orientado a acción:** CTA implícito o explícito según canal

**CRO para ads:**
- Hook de interrupción en los primeros 3 segundos / 5 palabras
- Propuesta de valor antes de los 8 segundos / 15 palabras
- Un solo CTA — no múltiples acciones posibles

**Regla crítica:** CRO es arquitectura de información, no urgencia artificial. La persuasión viene del layer PSYCHO. CRO estructura el viaje de decisión; PSYCHO lo carga emocionalmente.

---

### LAYER 4b · SEO
**Función:** Asegurar que el contenido es indexable y relevante para búsquedas declaradas.  
**Aplica a:** Meta titles, meta descriptions, headings, copy de página, blog posts  
**No aplica a:** Stories, reels, posts sociales efímeros, contenido de conversación

**Reglas SEO para copy:**
- Keyword principal: en los primeros 100 caracteres
- Keyword secundaria: una vez en el cuerpo, de forma natural
- Densidad: máximo 2-3% — si suena forzado, se reduce
- Meta description: 150-160 chars, orientada a click (no a información)
- SEO title: máximo 60 chars, brand suffix obligatorio en Shopify

**Fuente de datos:** `seo_meta[brand_id + product_id]` + `keywords[brand_id]`

**Relación CRO vs SEO:**

| Dimensión | CRO | SEO |
|---|---|---|
| Audiencia | Humano en la página | Algoritmo de búsqueda |
| Objetivo | Convertir al que llegó | Traer más tráfico |
| Opera en | Estructura y tono del copy | Keywords y meta fields |
| Prioridad en product page | Alta | Media (meta fields primero) |
| Prioridad en ad | Alta | No aplica |
| Prioridad en post social | Media | Baja |

**Nota para Shopify:** SEO opera principalmente en meta fields (cubierto por shopify-fix). En body copy, CRO tiene prioridad.

---

### LAYER 5 · QA
**Función:** Verificar que el output final cumple los requerimientos originales antes de entregar o escribir a cualquier destino (Shopify, social, ad platform).

**Checklist QA para copy de producto:**
- ✓ Idioma correcto y consistente en todo el texto
- ✓ Longitud dentro del rango declarado
- ✓ Ninguno de los patrones H+AIFE detectados en el output final
- ✓ Brand voice del `humanize_profiles[brand_id]` respetado
- ✓ Al menos un trigger PSYCHO activo e implícito
- ✓ Estructura CRO completa (si content_type = product/ad)
- ✓ Keyword principal presente (si SEO activo)
- ✓ Sin claims de compliance prohibidos (`compliance_rules[brand_id]`)
- ✓ No empieza con el nombre del producto como sujeto
- ✓ No termina con resumen que repite lo ya dicho

**Output QA:**
- PASS: output listo para entrega/write
- FAIL: lista de gaps + corrección automática antes de re-verificar

**Regla crítica:** QA no es opcional. Un output sin QA no es ICR.

---

## 3. Estrategia de Implementación

### Fase 1 — Shopify (Sprint actual)
**Objetivo:** Pipeline completo para enriquecimiento de descripciones de producto NeuroneSCF B2C y cualquier tienda del ecosistema.

**Entregables por sprint:**

Sprint 1 (impacto inmediato):
- Tabla `pipeline_skills` en Supabase con este documento como seed
- EF `shopify-content-pipeline` que orquesta layers 1-2-5 (WRITE + H+AIFE + QA)
- Fix type `fix_description_pipeline` en shopify-fix (reemplaza `fix_description_enrich`)
- Archivos skill `.md` en repo de contexto `/skills/`

Sprint 2:
- PSYCHO + CRO integrados al pipeline
- Combinaciones default por brand_id desde `brand_goals`

Sprint 3:
- QA como llamada independiente a Claude con checklist formal
- Graduación ICR del pipeline completo
- Dashboard: score de calidad por pieza generada

### Fase 2 — Ecosistema completo
**Objetivo:** Mismo pipeline para ads, posts orgánicos, social media — clientes UNRLVL y marcas propias (incluyendo Lucien).

**Extensiones:**
- `content_type`: `product | ad_performance | ad_awareness | post_organic | post_social | landing | email`
- Layer SEO activo para posts de blog y landing pages
- Conexión con Social Agent — outputs pasan por pipeline antes de programar
- Aplicación a contenido UNRLVL y Lucien con sus respectivos `humanize_profiles`

---

## 4. Almacenamiento y Accesibilidad

**Fuente de verdad:** `/skills/CONTENT_PIPELINE_SKILLS.md` en repo de contexto  
**Runtime:** Tabla `pipeline_skills` en Supabase — los EFs consultan para configurar cada layer  
**Acceso para Claude:** `Vercel:web_fetch_vercel_url` → `unrlvl-context.vercel.app/skills/CONTENT_PIPELINE_SKILLS.md`  
**Actualización:** Push a GitHub → Vercel lo sirve → sync tabla Supabase

**Tablas Supabase relacionadas:**
- `humanize_profiles` — perfiles H+AIFE por marca y medio
- `psycho_presets` — 10 presets PSYCHO
- `brand_copy_profiles` — voz de marca para WRITE
- `compliance_rules` — reglas de compliance por categoría
- `seo_meta` + `keywords` — datos SEO por marca
- `pipeline_skills` — configuración del pipeline (a crear)

---

## 5. QA de este documento (v1.1)

**Requerimientos declarados por Sam:**
- ✅ QA definido como layer operativo con checklist
- ✅ ICR definido con criterios de graduación y lo que NO es ICR
- ✅ H+AIFE unificado en un layer — dos niveles dentro de uno
- ✅ AIFE conectado a su origen (Wikipedia AI Writing Patterns) con patrones EXHAUSTIVOS
- ✅ Vocabulario IA por era (GPT-4 / GPT-4o / GPT-5) documentado
- ✅ Patrones matemáticos/estadísticos profundos documentados
- ✅ Patrones superficiales documentados
- ✅ SEO y CRO diferenciados con tabla de cuándo aplica cada uno
- ✅ PSYCHO con 10 presets y combinaciones default por content_type
- ✅ WRITE con fallback declarado para marcas sin perfil
- ✅ QA layer con checklist formal
- ✅ Estrategia en 2 fases con sprint sequence
- ✅ Almacenamiento declarado para herramientas

**Gaps resueltos vs v1.0:**
- ✅ WRITE fallback: ahora declarado
- ✅ AIFE exhaustivo: integrado desde Wikipedia
- ⚠️ Fase 2 timing: sigue sin fechas — correcto, depende de graduación ICR de Fase 1

---

*v1.1 · 2026-05-05 · Fuente AIFE: Wikipedia "AI Writing Patterns" (revisado y analizado 2026-05-05)*
