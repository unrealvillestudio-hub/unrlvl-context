# ARBITER — Master Plan
_Versión: 1.0 · 2026-05-24 · Autor: Claude · Aprobado por: Sam (pendiente)_
_Estado: DISEÑADO — pendiente activación_

---

## ¿Qué es ARBITER?

ARBITER es un **Decision Synthesis Engine** independiente. No es un lab de contenido, no es un agente conversacional, no es una extensión de Claude. Es infraestructura de toma de decisiones críticas para el ecosistema Unrealville.

Su función: recibir una pregunta o decisión compleja, descomponerla por dimensión, debatirla entre modelos de AI heterogéneos, y sintetizar el resultado en un output estructurado, puntado y auditable — antes de que Sam o cualquier sistema actúe.

**Casos de uso primarios:**
- Decisiones de arquitectura técnica irreversibles (Ayra, infraestructura, DB schema)
- Decisiones estratégicas de alto impacto (go/no-go, estructura legal, modelo de negocio)
- Evaluación de riesgo antes de commits grandes
- Validación de scope de nuevos proyectos

**Casos de uso explícitamente excluidos:**
- Decisiones operativas del día a día
- Generación de contenido o copy
- Tareas con respuesta técnica conocida
- Cualquier cosa que no justifique el costo de latencia y tokens

---

## Principios de diseño

1. **Transparencia total en cada capa.** Sam ve los puntajes, los pesos, las preguntas, los fragmentos ensamblados. Nunca una caja negra.
2. **El algoritmo gobierna, los modelos argumentan.** El orquestador no opina. Los modelos sí. La síntesis es matemática.
3. **Sesgo auditable, no sesgo eliminado.** El sesgo existe — en las preguntas, en los pesos, en los modelos. La diferencia es que cada sesgo tiene una dirección conocida y es modificable por Sam en lenguaje humano.
4. **Claude nunca entra en el input.** Claude puede aparecer en la síntesis final, nunca en la construcción del prompt ni en el debate central.
5. **Professor aprende de cada debate.** Cada sesión de ARBITER alimenta la base de conocimiento del ecosistema.

---

## Arquitectura — tres capas con puntajes

```
[SAM — intake form]
        ↓
┌───────────────────────────────────────────────┐
│  CAPA 1 — ArbiterPromptBuilder                │
│  Input:  respuestas a preguntas binarias       │
│  Datos:  Supabase ecosystem + Professor        │
│  Output: prompt estructurado + SCORE C1        │
│  Gobierno: arbiter_question_tree (legible Sam) │
└───────────────────────────────────────────────┘
        ↓ Sam aprueba el prompt (o edita)
┌───────────────────────────────────────────────┐
│  CAPA 2 — Motor de Debate                      │
│  Input:  prompt aprobado, clasificado T+S+R    │
│  Paneles: hasta 3 (según dimensiones activas)  │
│  Cross-interrogation: reglas algorítmicas      │
│  Output: argumentos por panel + SCORE C2       │
└───────────────────────────────────────────────┘
        ↓
┌───────────────────────────────────────────────┐
│  CAPA 3 — Síntesis Matricial                   │
│  Input:  outputs de paneles + pesos            │
│  Motor:  scoring ponderado por dimensión       │
│  Output: ≤3 puntos divergencia + SCORE C3      │
│  Destino: Sam decide · Professor almacena      │
└───────────────────────────────────────────────┘
```

---

## CAPA 1 — ArbiterPromptBuilder

### Función
Construir el prompt del debate sin que Sam lo redacte. Protección contra garbage-in.

### Fuentes de datos (lectura, nunca escritura en esta capa)
- `ecosystem.json` — contexto del ecosistema
- `brands` table — marcas y mercados activos
- `agents` table — agentes y su estado
- `professor_learnings` — decisiones previas relevantes
- `professor_decision_cases` — precedentes
- `arbiter_question_tree` — árbol de preguntas (tabla nueva)

### Proceso
1. Sam describe la decisión en 2-3 líneas (texto libre, sin estructura)
2. El clasificador (AI con scope restringido — solo etiqueta, no opina) detecta dimensiones: T / S / R / combinadas
3. El Builder lanza preguntas binarias o de selección basadas en el árbol + los datos reales de Supabase
4. Ensambla el prompt desde fragmentos verificados — nunca interpreta, solo concatena
5. Muestra el prompt completo a Sam antes de continuar

### SCORE C1 — Calidad del Prompt
Visible para Sam antes de aprobar. Tres métricas:

| Métrica | Descripción | Rango |
|---|---|---|
| **Cobertura** | ¿Qué % de las dimensiones detectadas están representadas en el prompt? | 0–100% |
| **Imparcialidad** | ¿Qué % de las preguntas del árbol usadas tienen asunción embebida detectada? Inverso. | 0–100% |
| **Completitud contextual** | ¿Qué % del contexto disponible en Supabase fue cargado? | 0–100% |

**Score C1 compuesto:** promedio ponderado de las tres métricas.
**Umbral mínimo para continuar:** 75%. Si no se alcanza, el Builder señala qué falta y Sam decide si continuar o completar.

### Pantalla de revisión (Sam ve esto antes de aprobar)
```
┌─────────────────────────────────────────────────────┐
│ PROMPT CONSTRUIDO — REVISIÓN                        │
│                                                     │
│ Score C1: 84% [Cobertura 90% · Imparc. 83% · Ctx 80%]│
│                                                     │
│ Contexto cargado:                                   │
│ • Proyecto: Ayra · Sprint 0 · deadline 5 Jun        │
│ • Dependencias: lab_jobs, copylab-processor,        │
│   Professor, 67 EFs                                 │
│ • Learnings relevantes: 4 encontrados               │
│ • Precedentes: 0 (decisión sin antecedente)         │
│                                                     │
│ [T] Dimensión técnica:                              │
│ "Evaluar si lab_jobs como abstracción central       │
│  es suficiente para que Ayra opere labs             │
│  heterogéneos sin rediseño de los labs existentes"  │
│                                                     │
│ [S] Dimensión estratégica:                          │
│ "Determinar si el scope de Ayra Sprint 0            │
│  debe incluir labs diseñados para humanos           │
│  o solo labs con API machine-ready"                 │
│                                                     │
│ [R] Dimensión riesgo:                               │
│ "Identificar decisiones de arquitectura             │
│  irreversibles dentro del deadline 5 Jun            │
│  y sus consecuencias de no-retorno"                 │
│                                                     │
│ [EDITAR FRAGMENTO]  [APROBAR Y CONTINUAR →]         │
└─────────────────────────────────────────────────────┘
```

---

## CAPA 2 — Motor de Debate

### Paneles disponibles

| Panel | Modelos | Cuándo se activa |
|---|---|---|
| **Panel Técnico (T)** | GPT-4o + Gemini 1.5 Pro | Dimensión T detectada |
| **Panel Estratégico (S)** | GPT-4o + Gemini 2.0 Flash | Dimensión S detectada |
| **Panel de Riesgo (R)** | GPT-4o + Gemini 1.5 Pro + Llama 3 (via Groq) | Dimensión R detectada |

Tres votos en Panel R porque las decisiones de riesgo requieren mayoría cualificada. En T y S, la divergencia entre dos es suficientemente informativa.

### Configuración de paneles (modificable por Sam)
Tabla `arbiter_panel_configs` en Supabase:
- Qué modelos componen cada panel
- Temperatura por modelo y panel
- Instrucción base por rol (Critic / Devil / Realist / sin rol en R)
- Pesos por modelo dentro del panel

### Proceso de debate
```
Ronda 1 — Ataque independiente:
→ Cada modelo recibe el fragmento de su dimensión SIN saber qué modelo es el origen
→ Instrucción: "Este es el planteamiento. Encuentra fallas, asunciones no probadas, 
   alternativas superiores. No hagas síntesis — ataca."
→ Outputs independientes, no se ven entre sí

Cross-interrogation algorítmica:
→ Gestor verifica triggers predefinidos:
   Si T concluye riesgo técnico → genera pregunta forzada a R: "¿Es irreversible?"
   Si S concluye dependencia técnica → genera pregunta forzada a T: "¿Es viable?"
   Si R detecta bloqueante legal → genera pregunta forzada a S: "¿Cambia el scope?"
→ Las preguntas cross-panel las reciben los modelos del otro panel, no el original

Ronda 2 — Respuesta a cross-interrogation:
→ Solo se ejecuta si se activaron triggers
→ Cada panel responde solo las preguntas que le llegaron
```

### SCORE C2 — Calidad del Debate
Visible para Sam al ver los resultados del debate.

| Métrica | Descripción | Rango |
|---|---|---|
| **Divergencia real** | ¿Qué % de los modelos llegaron a conclusiones distintas? | 0–100% |
| **Cobertura cross-panel** | ¿Qué % de los triggers se activaron y respondieron? | 0–100% |
| **Confianza de modelos** | Promedio del score de confianza que cada modelo asigna a su propio argumento | 0–100% |
| **Consenso en irreversibles** | Si hay dimensión R: ¿hay acuerdo sobre qué es irreversible? | Sí/No/Parcial |

**Señal de alerta:** Si Divergencia real < 20%, el debate fue teatro. El sistema lo marca explícitamente y Sam puede decidir si continuar o reformular.

---

## CAPA 3 — Síntesis Matricial

### Quién sintetiza
Un Claude frío que **no recibe el prompt original ni los drafts de debate**. Solo recibe:
- Los argumentos finales de cada panel (sin saber qué modelo los generó)
- La matriz de pesos configurada para este tipo de decisión
- La instrucción: "Sintetiza en máximo 3 puntos de divergencia real. No resuelvas lo que el debate no resolvió."

### Matrices predefinidas (modificables)
Tabla `arbiter_matrices` en Supabase. Tres configuraciones base:

**Matriz Infraestructura:**
| Dimensión | Peso |
|---|---|
| Viabilidad técnica | 35% |
| Riesgo operativo | 30% |
| Costo/esfuerzo | 20% |
| Alineación estratégica | 15% |

**Matriz Estrategia:**
| Dimensión | Peso |
|---|---|
| Alineación con objetivos | 30% |
| Viabilidad de ejecución | 25% |
| Riesgo de mercado | 25% |
| Costo/oportunidad | 20% |

**Matriz Riesgo:**
| Dimensión | Peso |
|---|---|
| Irreversibilidad | 40% |
| Probabilidad de ocurrencia | 30% |
| Impacto si ocurre | 20% |
| Capacidad de mitigación | 10% |

Sam puede crear matrices personalizadas para decisiones específicas.

### SCORE C3 — Calidad de la Síntesis
| Métrica | Descripción | Rango |
|---|---|---|
| **Score ponderado compuesto** | Resultado matricial final | 0–10 |
| **Nivel de confianza** | ¿Cuánto acuerdo hubo entre paneles en los puntos clave? | Bajo / Medio / Alto |
| **Puntos sin resolver** | ¿Cuántos puntos el debate dejó abiertos sin respuesta? | Número entero |
| **Recomendación algorítmica** | Proceed / Proceed con condiciones / No proceed / Insuficiente información | Categórica |

### Output final para Sam
```
┌─────────────────────────────────────────────────────┐
│ ARBITER — SÍNTESIS FINAL                            │
│                                                     │
│ Score compuesto: 6.2/10                             │
│ Confianza: Media · Puntos sin resolver: 2           │
│ Recomendación: PROCEED CON CONDICIONES              │
│                                                     │
│ PUNTO 1 — Divergencia real (T vs R)                 │
│ Panel T: lab_jobs es suficiente para Ayra Sprint 0  │
│ Panel R: lab_jobs no cubre el caso de labs legacy   │
│          sin API machine-ready — riesgo irreversible│
│ → No resuelto. Requiere decisión de Sam.            │
│                                                     │
│ PUNTO 2 — Consenso (T + S)                          │
│ Ambos paneles acuerdan: el scope de Sprint 0 debe   │
│ excluir labs legacy. Rediseñar post-Ayra v1.0.      │
│ Confianza: Alta.                                    │
│                                                     │
│ PUNTO 3 — Alerta R                                  │
│ Deadline 5 Jun hace irreversible la decisión de     │
│ schema ahora. Cambiar lab_jobs post-deploy = sprint │
│ de migración completo. Panel R recomienda decidir   │
│ el schema final antes de cualquier commit.          │
│                                                     │
│ [VER DEBATE COMPLETO]  [ENVIAR A PROFESSOR]         │
│ [NUEVA SESIÓN ARBITER]  [EXPORTAR PDF]              │
└─────────────────────────────────────────────────────┘
```

---

## Gobierno del árbol de preguntas

### Tabla `arbiter_question_tree`
Sam puede leer y editar en lenguaje humano. Estructura:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | TEXT | Ej: Q001, Q002 |
| `dimension` | ENUM | T / S / R / All |
| `trigger` | TEXT | Cuándo se activa esta pregunta (en lenguaje humano) |
| `pregunta_texto` | TEXT | La pregunta exacta que ve Sam |
| `tipo` | ENUM | binaria / selección / escala |
| `opciones` | JSON | Array de opciones si aplica |
| `asuncion_detectada` | TEXT | Null si neutral. Descripción si hay sesgo embebido. |
| `creado_por` | TEXT | Claude / Sam / Revisión externa |
| `aprobado_por_sam` | BOOLEAN | False por defecto — Sam revisa y aprueba |
| `activa` | BOOLEAN | Toggle para activar/desactivar sin borrar |

**Regla crítica:** Ninguna pregunta con `asuncion_detectada` != null puede tener `activa = true` sin `aprobado_por_sam = true` explícito.

---

## Stack técnico

| Componente | Tecnología | Ubicación |
|---|---|---|
| Frontend | Vite + React | Vercel — `arbiter.unrealvillestudio.com` |
| Backend / Orquestador | Vercel Functions (Node.js native handler) | Mismo proyecto |
| Base de datos | Supabase `amlvyycfepwhiindxgzw` | Schema `arbiter` (nuevo) |
| Clasificador C1 | Claude Haiku (scope restringido) | Via API |
| Panel T | GPT-4o + Gemini 1.5 Pro | Via API |
| Panel S | GPT-4o + Gemini 2.0 Flash | Via API |
| Panel R | GPT-4o + Gemini 1.5 Pro + Llama 3 | Via API + Groq |
| Sintetizador C3 | Claude Sonnet (frío, sin contexto de debate) | Via API |
| Persistencia de debates | `arbiter_sessions` table | Supabase |
| Integración Professor | POST `professor-log-case` EF existente | Supabase EF |
| Integración ecosystem | Lectura `ecosystem.json` + brands/agents tables | Read-only |

---

## Schema Supabase — schema `arbiter` (tablas nuevas)

| Tabla | Función |
|---|---|
| `arbiter_sessions` | Registro de cada debate completo |
| `arbiter_question_tree` | Árbol de preguntas gobernado por Sam |
| `arbiter_panel_configs` | Configuración de modelos por panel |
| `arbiter_matrices` | Matrices de ponderación por tipo de decisión |
| `arbiter_outcomes` | Resultado real post-decisión (para calibración futura) |

`arbiter_outcomes` es la tabla que en 6 meses permite calibrar si los scores predijeron correctamente. Sam registra el outcome real de cada decisión. Professor compara score predicho vs. outcome real y ajusta pesos.

---

## Dependencias antes de construir

| Dependencia | Estado | Bloqueante |
|---|---|---|
| Ayra Sprint 0 completado | ❌ Pendiente 5 Jun | Sí — ARBITER es post-Ayra |
| OpenAI API key en Vercel env | ⚠️ Verificar | Sí |
| Gemini API key en Vercel env | ⚠️ Verificar | Sí |
| Groq API key (para Llama 3) | ❌ No configurada | Para Panel R |
| Schema `arbiter` en Supabase | ❌ Pendiente | Sí |
| `arbiter.unrealvillestudio.com` DNS | ❌ Pendiente | Sí |
| Professor EFs operacionales | ✅ LIVE | No bloqueante |

---

## Sprints de implementación

**PRE-REQUISITO:** Ayra Sprint 0 cerrado.

### Sprint ARBITER-0 — Fundación (1 semana)
- Crear repo `unrealvillestudio-hub/unrlvl-arbiter`
- Crear proyecto Vercel + dominio
- Crear schema `arbiter` en Supabase con las 5 tablas
- Seed inicial de `arbiter_question_tree` (20-30 preguntas base)
- Seed de 3 matrices predefinidas
- Seed de 3 configuraciones de panel

### Sprint ARBITER-1 — PromptBuilder (1 semana)
- Intake form + clasificador Haiku
- Lógica de ensamblado desde Supabase
- Pantalla de revisión con Score C1
- Edición de fragmentos antes de aprobar

### Sprint ARBITER-2 — Motor de Debate (1.5 semanas)
- Integración GPT-4o, Gemini, Llama 3
- Lógica de paneles T + S + R
- Cross-interrogation algorítmica con triggers
- Score C2 visible

### Sprint ARBITER-3 — Síntesis y cierre (1 semana)
- Claude frío sintetizador
- Scoring matricial C3
- Output final estructurado
- Integración con Professor
- UI de revisión del debate completo

**Total estimado:** 4.5 semanas post-Ayra Sprint 0.

---

## Lo que ARBITER no es (límites explícitos)

- **No es un chatbot.** No tiene conversación libre. Solo acepta inputs estructurados.
- **No reemplaza la decisión de Sam.** Produce información estructurada para que Sam decida mejor.
- **No es infalible.** Sus puntajes son orientativos, no oráculos. El score de confianza del sistema debe leerse junto con los puntos sin resolver.
- **No tiene memoria conversacional entre sesiones.** Cada sesión es independiente. La memoria está en Professor, no en ARBITER.
- **No opera en tiempo real.** Una sesión completa toma 3-8 minutos según la complejidad. No es para decisiones urgentes del momento.

---

## Métricas de éxito a 6 meses

| Métrica | Objetivo |
|---|---|
| Sesiones ejecutadas | ≥ 10 decisiones críticas pasadas por ARBITER |
| Score C1 promedio | ≥ 80% (calidad de prompt) |
| Divergencia real promedio | ≥ 35% (debate genuino, no teatro) |
| Calibración outcomes | ≥ 70% correlación score predicho vs. resultado real |
| Preguntas árbol revisadas por Sam | 100% al menos una vez |

---

_ARBITER v1.0 Master Plan · Unreal>ille Studio · 2026-05-24_
_Siguiente acción: Sam activa implementación post-Ayra Sprint 0_
