# SKILL — aife v1.1
_AI Footprint Eraser · Filtro post-generación · Obligatorio antes de todo output público_
_Versión: 1.1 · 2026-04-24_

---

## POSICIÓN EN EL PIPELINE Y ACTIVADORES

### Pipeline principal (CopyLab)

```
CopyLab genera texto
    ↓
Humanize F2.5 (voz y tono de marca)
    ↓
AIFE ← activado automáticamente por CopyLab como último paso
    ↓
ICR — validación final
    ↓
OUTPUT PÚBLICO
```

### Activadores por lab

| Lab / Sistema | Activa AIFE | Cuándo |
|---|---|---|
| **CopyLab** | ✅ Automático | Siempre — último paso antes de ICR |
| **IID Network** | ✅ Automático | Antes de pasar contenido a SocialLab |
| **VideoLab** | ✅ Explícito | Scripts de video antes de entregar a HeyGen/Kling |
| **Libros Lucien** | ✅ Explícito | Capítulos y secciones antes de revisión editorial |
| **Agentes** | ⚠️ Parcial | Solo en respuestas largas tipo newsletter/report. NO en respuestas conversacionales cortas |
| **Código / SQL / JSON** | ❌ No aplica | Nunca — AIFE solo procesa texto para humanos |
| **Documentación técnica** | ❌ No aplica | Skills, specs, configs — no son outputs públicos |

**Regla de no-bypass:** No existe ninguna circunstancia que justifique omitir AIFE en un output público de texto. Ni urgencia, ni brevedad, ni "es solo un borrador."

---

## POR QUÉ EXISTE ESTE SKILL

Los LLMs dejan huellas estructurales en el texto que generan. Son detectables por humanos entrenados y herramientas de detección AI — y destruyen credibilidad donde la voz auténtica importa.

AIFE no cambia el tono (eso lo hace Humanize F2.5). Elimina **patrones estructurales del proceso de generación** que persisten incluso después de humanizar.

---

## MÓDULO 1 — VOCABULARY PURGE

### Lista negra (era 2025-2026)

**Verbos y construcciones de énfasis AI:**
delve · delving · dives deep · underscore · underscores · highlight (como verbo de análisis) · leverage · leveraging · foster · fostering · align with · bolster · bolstered · enhance (en contexto de análisis) · showcase · showcasing · emphasize · emphasizing

**Adjetivos AI sobreusados:**
crucial · pivotal · vibrant · dynamic · robust · comprehensive · holistic · groundbreaking · transformative · nuanced · multifaceted · seamless · streamlined

**Frases de transición AI:**
"It's worth noting that..." · "It's important to note that..." · "It's crucial to understand..." · "In today's [X] landscape..." · "In the ever-evolving world of..." · "At its core, [X] is about..." · "When it comes to [X]..." · "The bottom line is..." · "Having said that..." · "That being said..." · "Needless to say..." · "Without further ado..."

**Construcciones de cierre AI:**
"In conclusion..." · "To summarize..." · "Ultimately, the key takeaway is..." · "As we've seen..."

### Protocolo de reemplazo

Nunca eliminar sin reemplazar. Cada palabra purgeada → término concreto específico del contexto, construcción activa directa, o eliminación completa si la frase no añadía valor real.

---

## MÓDULO 2 — STRUCTURAL BURSTINESS INJECTION

Los LLMs producen longitud de oraciones uniformemente plana. Los humanos escriben en bursts.

```
ANTES (AI — uniforme):
"La marca tiene una propuesta de valor clara. Se enfoca en el mercado 
hispano de Florida. Su diferenciador es la calidad. El equipo es experto."

DESPUÉS (AIFE — bursty):
"La marca tiene una propuesta clara.

Mercado hispano de Florida, diferenciador basado en calidad — no en precio, 
no en volumen, sino en la precisión con la que cada producto responde a un 
tipo de cabello específico que el mercado general ignora.

El equipo lo sabe. Y se nota."
```

**Patrones a introducir:** frases de 3-5 palabras como anclas emocionales · frases de 25-40 para desarrollo técnico · párrafos de una sola oración para énfasis · variación de estructura sintáctica.

---

## MÓDULO 3 — PARALLELISM CRUSHER

**Parallelismo negativo:**
```
ANTES: "No es solo un producto, es una solución."
DESPUÉS: "Es una solución. Punto."
```

**Regla de tres automática:**
```
ANTES: "innovador, transformador y revolucionario"
DESPUÉS: "distinto en la única forma que importa: funciona"
```

**"From X to Y" / "Whether X or Y":**
```
ANTES: "From startups to enterprise, our solution scales."
DESPUÉS: "Scales at any size — tested that claim."
```

**Participiales encadenados:**
```
ANTES: "Leveraging our expertise, utilizing the latest technology,
        and delivering exceptional results, we transform your brand."
DESPUÉS: "Transformamos marcas. Con metodología real, no con promesas."
```

---

## MÓDULO 4 — CONVICTION INJECTION

Los LLMs hedgean innecesariamente. La duda destruye conversión en copy de marketing.

```
ANTES: "puede ayudar a mejorar la hidratación en muchos casos,
        dependiendo del tipo de cabello y uso regular"
DESPUÉS: "Hidratación visible desde la primera aplicación."
```

```
ANTES: "Hay diferentes perspectivas sobre el uso de AI en marketing..."
DESPUÉS: "AI en marketing no va a desaparecer. La pregunta ya no es si 
          usarla, sino si la estás usando mejor que tu competencia."
```

**Cuándo SÍ conservar la cautela:** contenido médico/legal/financiero · afirmaciones sin respaldo verificado · periodismo y reportes técnicos donde la objetividad es el valor.

---

## MÓDULO 5 — FORMATTING DETOX

**Bold compulsivo:** máximo 2 elementos en bold por 500 palabras.

**Em dash dramático:**
```
ANTES: "Our approach — built on years of experience — delivers results."
DESPUÉS: "Our approach delivers results. Built on years of experience."
```

**Bullet point compulsivo (cuando debería fluir como prosa):**
```
ANTES:
"Nuestros servicios incluyen:
• Estrategia de marca
• Gestión de redes
• Producción de contenido"

DESPUÉS (cuando es narrativa):
"Cubrimos estrategia de marca, gestión de redes y producción 
de contenido — todo integrado, no en silos."
```

Bullets SÍ correctos en: listas funcionales · instrucciones paso a paso · comparativas · specs técnicas.

---

## MÓDULO 6 — PRESENT PARTICIPLE AUDIT

Los LLMs usan participios presentes 2-5x la tasa humana.

```
ANTES: "Recognizing the importance of personalization, we developed 
        a system that adapts to each brand's unique voice."
DESPUÉS: "Cada marca tiene una voz única. El sistema la detecta 
          y la amplifica."
```

Patrones frecuentes a detectar: "Building on..." · "Recognizing..." · "Understanding that..." · "Leveraging these insights..." · "Drawing from..."

---

## AUTO-CHECK DE CLAUDE

Antes de entregar cualquier output de texto:

```
1. ¿Palabras de la lista negra? → Reemplazar
2. ¿Oraciones con variación de longitud? → Ajustar si son uniformes
3. ¿Paralelismos automáticos? → Destruir
4. ¿Hedging innecesario para este tipo de output? → Eliminar
5. ¿Más de 2 bold por 500 palabras? → Reducir
6. ¿Bullets donde debería ser prosa? → Convertir
7. ¿Participios presentes en cadena? → Reescribir como activas
8. ¿Suena como lo escribiría un humano experto en esta marca? → Sí / revisar
```

---

## AIFE POR TIPO DE OUTPUT

| Tipo | Módulos prioritarios | Intensidad |
|---|---|---|
| Redes sociales (IG, TikTok, LinkedIn) | Burstiness + Conviction + Vocabulary | Alta |
| Artículos y contenido largo | Todos | Máxima |
| Copy e-commerce (producto, landing) | Conviction + Vocabulary + Formatting | Alta |
| Scripts de video | Burstiness + Parallelism + Conviction | Alta |
| IID Network content (UNRLVL/Lucien) | Todos | Máxima — voz pública |
| Libros Lucien | Todos | Máxima — obra literaria |
| Reports internos UNRLVL | Vocabulary + Participle (moderado) | Media |

---

## AIFE MULTIMARCA

| Marca | Vocabulario de reemplazo | Evitar |
|---|---|---|
| UNRLVL / Lucien | Directivo, técnico, sin adornos | Corporativo genérico |
| NeuroneSCF B2C | Cercano, técnico-profesional, bilingüe | Demasiado formal o clínico |
| NeuroneSCF B2B | Técnico-autoridad, preciso, profesional | Lenguaje consumer |
| ForumPHs | Legal-técnico pero accesible | Jerga que Ivette no usaría |
| PO (Patricia) | Cálido, femenino, motivacional | Frío o transaccional |

---

## LO QUE AIFE NO HACE

- No cambia el argumento ni la información — solo la forma
- No elimina términos técnicos específicos de la industria
- No uniformiza el estilo entre marcas — respeta Humanize de cada una
- No aplica a código, SQL, JSON, configs, skills, specs técnicas
- No aplica a respuestas conversacionales cortas de agentes

---

_SKILL aife v1.1 · Unreal>ille Studio · AI Footprint Eraser_
_Activador primario: CopyLab (automático). IID Network, VideoLab, Libros (explícito)._
