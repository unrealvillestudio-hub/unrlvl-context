# Document Factory Skill — ForumPHs
**Versión:** v1.4 | **Fecha:** 2026-04-11 | **Repo:** unrlvl-context/brands/ForumPHs/

---

## OVERVIEW

El Document Factory convierte el zip de Hypal + inputs de Ivette en Actas formales .docx.
El objetivo es un output al **≥90% de accuracy** vs el acta de referencia de Ivette Flores.

---

## ARCHIVOS DE REFERENCIA

Leer ANTES de generar:
- `/mnt/project/temp_ACTA_PHAS_GOAL_example_01.docx` — Acta Ordinaria PH Venezia Tower
- `/mnt/project/temp_ACTA_PHAS_GOAL_example_02.docx` — Acta Extraordinaria PH Lefevre 75

---

## PASO 0 — HYPAL UNPACKER

El zip de Hypal contiene 6 archivos. Orden de procesamiento:

| Archivo | Parser | Output JSON | Fuente para bloque |
|---|---|---|---|
| `Resumen_de_la_Asamblea.docx` | `parse_resumen()` | `skeleton.json` | F-1, F-2, F-3 estructura |
| `Lista_de_Asistencia.xlsx` | `parse_asistencia()` | `attendance.json` | F-3 tabla asistentes |
| `Resultados_de_las_votaciones.xlsx` | `parse_votaciones()` | `votes.json` | Todas las votaciones |
| `Transcripcion_de_la_asamblea.docx` | `parse_transcripcion()` | `debates.json` | Secciones de debate |
| `Chats_de_Zoom_de_la_asamblea.docx` | `parse_chats()` | `chat_notes.json` | Complemento |
| `Reporte_de_Quorum.docx` | skip | — | Datos ya en skeleton.json |

**Notas críticas:**
- El `attendance.json` captura 243 en el snapshot de Hypal. El acta usa el dato **verificado durante la sesión** (ej: 249) que provee Ivette — no el snapshot.
- Si el XLSX de votaciones difiere en 1-2 votos del acta firmada anterior, usar el **dato del acta firmada**.
- El Resumen tiene errores en cifras financieras exactas — usar la transcripción para cifras, no el Resumen.

---

## PASO 1 — PRE-FLIGHT CON IVETTE

Antes de generar, hacer esta verificación única:

```
"Ivette, tengo el zip de Hypal cargado. Solo necesito:
1. Finca + Código del Registro Público
2. El texto literal de la convocatoria
3. Las capturas de pantalla de las votaciones
4. El Informe de Gestión de la JD (documento, no lo verbal)"
```

Con esos 4 ítems el acta llega al 95%+.

---

## PASO 2 — REGLAS DE REDACCIÓN

### 2.1 Tercera persona — SIEMPRE
Cada bloque de debate se convierte a narrativa formal en 3ª persona.

**Patrones de conversión 1ª→3ª persona (lista completa):**

| 1ª persona | 3ª persona |
|---|---|
| yo / yo he / yo estoy | él/ella / ha / estaba |
| **estoy** | estaba |
| **estuve** | estuvo |
| estamos | están |
| tenemos | tienen |
| podemos | pueden |
| queremos | quieren |
| vamos | van |
| somos / soy | son / es |
| hemos | han |
| mi / mis | su / sus |
| me preocupa | le preocupaba |
| me parece | le parecía |
| me gustaría | le gustaría |
| nosotros | ellos |
| nuestro/a | su |
| considero / creo que | consideró / señaló que |
| estoy de acuerdo | manifestó su acuerdo |
| preocupada/o (1ª) | preocupada/o (concordancia 3ª) |

### 2.2 Identificación de hablantes — REGLAS DE GÉNERO

**⚠️ REGLA CRÍTICA:** El género se detecta por el NOMBRE, con matching flexible (no exacto):

```python
NOMBRES_FEMENINOS = [
    'reyna', 'ivette', 'dayana', 'martha', 'marta', 'clara', 'kathia',
    'karen', 'lourdes', 'milkori', 'magda', 'miriam', 'mirian',  # ← "mirian" también
    'angela', 'melitza', 'yaraby', 'elizabeth', 'natalia', 'monica',
    'ana', 'maria', 'gina', 'andrea', 'samanta', 'katerine', 'claudia',
    'marisol', 'fabiana', 'sarah', 'sara', 'rosa', 'carmen', 'virginia',
    'yamileth', 'liseth', 'ingrid', 'gloria', 'betty', 'diana', 'luz',
    'alba', 'ester', 'esther', 'adriana', 'sonia', 'patricia', 'laura',
    'isabel', 'cristina', 'virginia', 'vanessa', 'alejandra'
]
```

Usar `any(nombre in speaker_name.lower() for nombre in NOMBRES_FEMENINOS)` — NO exact match.

**Formato estándar de introducción:**
- Propietaria: `La propietaria del apartamento TB-15D, señora Miriam López Galván, manifestó que...`
- Propietario: `El propietario del apartamento TA-19B, señor William Acosta, indicó que...`
- Presidente: `El Presidente, señor Alex Piña (TA-15E), señaló que...`
- Ivette: `Ivette Flores de la administración manifestó que...`
- Abogado: `El abogado asesor, Alberto Paul Roach, indicó que...`

### 2.3 Filtro de bloques — LO QUE NO VA AL ACTA

**Filtrar SIEMPRE** (no incluir en el acta):
```python
SKIP_EXACT = ['sí', 'no', 'okay', 'perfecto', 'claro', 'correcto', 'listo',
              'ya', 'bien', 'gracias', 'entendido', 'de acuerdo', 'exacto',
              'adelante', 'mhm', 'ajá', 'uh', 'uhm']

SKIP_CONTAINS = ['abrir micrófono', 'cerrar micrófono', 'compartir pantalla',
                 'internet', 'me desconect', 'técnico', 'problema de audio',
                 'buenas tardes' (standalone), 'buenas noches' (standalone),
                 'me escuchan', '¿me ven', 'podemos continuar',
                 'un momentito', 'permítame un segundo']

SKIP_IF_LEN < 40  # bloques menores a 40 caracteres
```

**También filtrar preamble noise al INICIO de un bloque:**
```python
PREAMBLE_NOISE = r'^(okay[,\.]?\s+|sí[,\.]?\s+|buenas tardes[,\.]?\s+|
                    buenas noches[,\.]?\s+|claro[,\.]?\s+|perfecto[,\.]?\s+|
                    bien[,\.]?\s+|mhm[,\.]?\s+|este[,\.]?\s+)'
# Limpiar el inicio del texto antes de construir el párrafo
```

---

## PASO 3 — REGLAS DE DENSIDAD Y PROPORCIÓN

### 3.1 Target de palabras por sección

**⚠️ REGLA CRÍTICA:** El acta generada debe estar en el rango **85-115%** del word count de referencia de Ivette.

| Sección | Target Ivette | Rango aceptable | % para pasar QA |
|---|---|---|---|
| Completa | ~18,000 palabras | 15,300 – 20,700 | 85–115% |
| Orden del día | ~1,837 palabras | 1,500 – 2,200 | — |
| Informe gestión | ~1,058 palabras | 900 – 1,200 | (requiere doc JD) |
| Cierre fiscal | ~498 palabras | 400 – 600 | |
| Presupuesto | ~7,811 palabras | 6,600 – 9,000 | |
| Lobby | ~4,709 palabras | 4,000 – 5,500 | |

**Por qué el cierre fiscal es corto (498 palabras):** Ivette lo documenta como narrativa concisa con las cifras clave, NO como transcripción del discurso verbal completo de Alex Piña. Si el word count de cierre fiscal supera 800 palabras, hay exceso.

**Por qué el orden del día es corto (1,837 palabras):** Ivette incluye solo las solicitudes de modificación principales y el resultado de la votación. Las discusiones largas (seguro, gas, morosidad) que se dan DURANTE el debate del orden del día van condensadas en pocos párrafos formales, no transcriptas verbatim.

### 3.2 Regla anti-exceso

Si al generar un bloque el word count parcial supera el 120% del target de esa sección, **condensar** — no incluir más intervenciones similares sobre el mismo tema. Usar: `"Varios propietarios expresaron preocupaciones adicionales sobre [tema], señalando [síntesis]."` para agrupar intervenciones menores.

---

## PASO 4 — ENRICHMENT LAYER (NUEVO)

### 4.1 ¿Por qué existe esta capa?

Un párrafo en bloque cerrado de más de 200 palabras es ilegible en un acta formal. Las secciones de debate (presupuesto, lobby) deben ser escaneables visualmente.

### 4.2 Reglas de enriquecimiento por sección

**Secciones de debate (Presupuesto, Lobby, Orden del día con muchas intervenciones):**
- Cada intervención de propietario es un párrafo propio con espacio antes (`spacing.before = 200`)
- Si un propietario tiene más de 150 palabras en su intervención, dividir en dos párrafos temáticos
- Las respuestas del Presidente a un propietario van en párrafo propio inmediatamente después, con `indent.left = 360`
- Las aclaraciones de Ivette van en párrafo propio

**Quórum y apertura:**
- Máximo 80 palabras por párrafo
- Párrafos cortos, datos precisos

**Cierre fiscal:**
- Preferir lista con bullets para las cifras financieras clave
- Un párrafo de narrativa + bullets de datos = más legible que un bloque de texto

**Ejemplo de estructura enriquecida para debate:**

```
[PÁRRAFO] Ivette Flores de la administración dio lectura al orden del día...

[PÁRRAFO — spacing before 200] El propietario del apartamento TB-21A, señor Denis Calderón,
solicitó que se modificara el orden del día para incluir la reparación del techo
del área social.

[PÁRRAFO — indent left 360] El Presidente, señor Alex Piña (TA-15E), indicó que se
incluiría dicho punto en la modificación del orden del día.

[PÁRRAFO — spacing before 200] El propietario del apartamento TA-06A, señor Raltom Villar...
```

### 4.3 Longitud máxima de párrafo

- Párrafos de propietarios: máx 150 palabras
- Párrafos del Presidente: máx 200 palabras (sus intervenciones suelen ser más largas)
- Párrafos de Ivette: máx 120 palabras
- Si supera el límite: cortar en punto natural, crear nuevo párrafo con continuidad lógica

---

## PASO 5 — REGLAS DE FORMATO

### 5.1 Números — DÍGITOS (no letras)
| Tipo | Formato |
|---|---|
| Votos | `99 votos`, `62 votos` |
| Porcentajes | `52.73%`, `39.04%` |
| Unidades | `306 apartamentos`, `249 unidades` |
| Montos | `$300.00`, `$5,000`, `$146,000` |
| Horas en texto | `las 2:00 pm`, `las 6:24 pm` |
| **Cuota por m²** | **`B/.1.70 por metro cuadrado`**, `B/.1.85 por metro cuadrado` |
| Datos registrales | En letras + dígitos: `Finca número tres cero dos...` |

### 5.2 Negritas obligatorias
- PH en bold en párrafo intro: `del **PH TORRES DE CASTILLA**`
- Labels presidida por: `**Presidente:**`, `**Secretario:**`, `**Administradora:**`
- Aprobaciones: `✅ **Se aprobó...**`
- Títulos de sección: `1.  **[TÍTULO EN MAYÚSCULAS]{.underline}**` (como lista numerada)
- Nombres en firmas: `**ALEX PIÑA**`

### 5.3 Formato especial
- Total unidades presentes con highlight: `[249 unidades inmobiliarias]{.mark}`
- Cierre: `Siendo, el sábado, DD de [mes] de AAAA las H:MM pm` (coma después de "Siendo")
- Firmas: una línea continua de guiones, nombres lado a lado (NO tabla)

---

## PASO 6 — CHECKLIST ICR (PRE-OUTPUT POR BLOQUE)

**ICR = Industrial Consistency Ready. Ejecutar ANTES de generar cada bloque.**
El score final lo pone Ivette, no Claude.

### 6.1 Checklist de ESTRUCTURA
- [ ] Estructura de 8 pasos en orden legal
- [ ] Títulos: `N.  **[TÍTULO]{.underline}**` (lista numerada en Word)
- [ ] Firmas: línea continua + nombres lado a lado (no tabla)

### 6.2 Checklist de CONTENIDO
- [ ] Primer llamado sin quórum documentado si aplica (GAP 3)
- [ ] Quórum cita Art. 67 Ley 284 de 2022 (GAP 5)
- [ ] Bloque administración con Ivette si estuvo (GAP 1)
- [ ] Ivette = `"de la administración"` en el cuerpo
- [ ] Ivette NO en firmas
- [ ] NO condensar intervenciones individuales — cada propietario = su párrafo
- [ ] Hipal Talk NO transcrito en el acta

### 6.3 Checklist de FORMATO
- [ ] Números en dígitos (votos, porcentajes, unidades, montos, horas)
- [ ] Datos registrales en letras + dígitos (únicos que van en letras)
- [ ] PH en bold en párrafo intro
- [ ] Labels "presidida por" en bold
- [ ] Aprobaciones con `✅ **Se aprobó...**`
- [ ] Total unidades con `{.mark}`
- [ ] Cuota en `B/.` cuando aplica
- [ ] Cierre: `Siendo, el sábado,...` (con coma)
- [ ] Verificar género de CADA propietaria/o antes de escribir

### 6.4 Checklist de DENSIDAD ← NUEVO
- [ ] Word count total: **entre 85% y 115% del acta de referencia de Ivette**
- [ ] Word count sección Cierre Fiscal: < 600 palabras
- [ ] Word count sección Orden del Día: < 2,200 palabras
- [ ] Ningún párrafo supera 200 palabras
- [ ] Párrafos de propietarios enriquecidos (spacing before, no bloques cerrados)
- [ ] Cero residuos de primera persona en el texto

### 6.5 Métricas de QA — Tabla de referencia

| Métrica | Acta Ivette (ref) | Target V3+ | Rango pass |
|---|---|---|---|
| Páginas | 30 | 27-33 | 25-35 |
| Palabras | 18,148 | 16,000-20,000 | 15,000-21,000 |
| Caracteres | 113,140 | 95,000-125,000 | 90,000-130,000 |
| Caracteres sin espacios | 96,012 | 80,000-105,000 | — |
| Score accuracy vs Ivette | 100% | ≥90% | ≥90% |

**Si el word count de tu acta supera 22,000 palabras → parar y revisar las secciones de debate antes de continuar.**

---

## PASO 7 — MANEJO DE INFORMACIÓN FALTANTE

**HACER:**
- `[INFORMACIÓN NO DISPONIBLE EN TRANSCRIPCIÓN]` para datos críticos faltantes
- `[IMAGEN PENDIENTE — descripción]` para screenshots de Hypal
- `[DOCUMENTO INFORME DE GESTIÓN PENDIENTE — proveer por JD]` cuando falte el doc

**NO HACER:**
- Inventar números de finca/folio
- Inventar resultados de votaciones
- Incluir bloques de coordinación logística como contenido del acta

---

## HISTORIAL

| Versión | Fecha | Cambios |
|---|---|---|
| v1.4 | 2026-04-11 | NUEVO: Enrichment layer (párrafos escaneables, máx 150-200 palabras). NUEVO: Métricas QA word/page count. CORRECCIÓN: Lista completa de verbos 1ª→3ª persona (incluye "estoy", "estuve"). CORRECCIÓN: Detector de género con fuzzy match (mirian = miriam). CORRECCIÓN: Filtro de preamble noise en bloques. CORRECCIÓN: Reglas de densidad por sección con targets en palabras. CORRECCIÓN: B/. para cuota |
| v1.3 | 2026-04-11 | Números en dígitos. B/. cuota. PH bold. Labels bold. ✅ aprobaciones. Cierre con coma. Firmas side-by-side. |
| v1.2 | 2026-04-11 | Principio ICR. Auto-validación pre-output. |
| v1.1 | 2026-04-11 | 5 GAPs del BP_BRAND. |
| v1.0 | 2026-04-11 | Skill inaugural. |

---

## MODELO CANÓNICO "_df" — IDENTIFICACIÓN DE DOCUMENTOS GENERADOS

### Nomenclatura de archivos
Todo documento generado por el Document Factory lleva el sufijo `_df`:
```
ACTA_[N]-[AAAA]_[PH_SLUG]_df.docx
Ejemplo: ACTA_1-2026_TORRES_CASTILLA_df.docx
```

### Versión en el nombre del archivo
Mientras el documento está en ciclo de revisión:
```
ACTA_1-2026_TORRES_CASTILLA_df_v1.docx  ← primera generación
ACTA_1-2026_TORRES_CASTILLA_df_v2.docx  ← tras correcciones
ACTA_1-2026_TORRES_CASTILLA_df.docx     ← versión final aprobada (sin versión = aprobada)
```

### Footer del documento (futuro)
Cuando el sistema tenga footer automatizado:
```
Generado por Document Factory · ForumPHs · v[X] · [fecha]
```

### Registro en session_log
Cada acta generada registra:
```json
{
  "id": "ACTA_1-2026_TORRES_CASTILLA",
  "type": "ACTA_ORDINARIA",
  "ph": "P.H. Torres de Castilla",
  "generated_by": "document_factory_v1.4",
  "score_vs_reference": null,  // lo llena Ivette
  "status": "pending_review",
  "word_count": 17485,
  "pages": 36,
  "qa_errors_found": 244,
  "qa_errors_fixed": 0
}
```

---

## PASO 0.5 — FORMALIZATION LAYER (Claude API) — REQUERIDO para ICR

### El problema que resuelve
El transformer (regex) puede limpiar preambles y convertir pronombres.
**NO puede** reconstruir fragmentos de habla oral rotos en narrativa legal formal.

El Paso 0.5 pasa cada bloque por el Claude API antes de entrar al builder:

```python
def formalize_block(speaker, role, unit, raw_text):
    """
    Llama al Claude API para convertir un bloque de habla oral
    en un párrafo formal de tercera persona para el acta.
    """
    system_prompt = """Eres un redactor especializado en Actas de Asamblea 
    de Propiedad Horizontal en Panamá. Tu función es convertir fragmentos 
    de habla oral en párrafos formales de tercera persona para el acta legal.
    
    REGLAS:
    - Si el fragmento no tiene contenido sustantivo, responde exactamente: NULL
    - Escribe en tercera persona formal siempre
    - Usa el nombre y unidad del hablante proporcionados
    - Elimina muletillas, repeticiones, fragmentos incompletos
    - Preserva la esencia del argumento o consulta
    - Máximo 150 palabras de output
    - Usar B/.1.85 para cuotas, $ para otros montos
    """
    
    user_prompt = f"""
    Hablante: {speaker}
    Cargo/rol: {role}
    Unidad: {unit}
    
    Fragmento de habla oral:
    "{raw_text}"
    
    Escribe el párrafo formal para el acta, o responde NULL.
    """
    
    # API call via fphs-acta endpoint
    response = call_claude_api(system_prompt, user_prompt)
    if response.strip() == 'NULL':
        return None
    return response
```

### Costo-beneficio
- ~800 bloques por asamblea × ~200 tokens por bloque = ~160K tokens
- A claude-sonnet-4: ~$0.48 por acta
- Resultado: acta lista para firma sin revisión de Ivette → ICR real

### Cuándo activar el Paso 0.5
- Producción (app): siempre activo
- Sesiones de desarrollo (Claude.ai): usar transformer regex como aproximación,
  identificar errores con el QA scan, corregir manualmente los críticos

---

## PASO 7 — QA SCAN COMPLETO (OBLIGATORIO ANTES DE ENTREGAR)

### ¿Qué es?
Una lectura programática de CADA oración del documento generado antes de entregarlo.
No es opcional. Es el último paso antes del present_files.

### Errores que detecta y reporta
```python
ERROR_TYPES = {
    'REPEATED_WORD': r'\b(\w{3,})\s+\1\b',  # todo todo, en en
    'ORAL_ARTIFACT': ['pues', 'digamos', 'este,', 'o sea', 'fondear'],
    'SPOKEN_WORD': ['acá,', 'porfa', 'ajá', 'mhm'],
    'NUMBER_FORMAT': r'\b\d{1,2}\s+\d{3}\b',  # 30 000 → $30,000
    'FIRST_PERSON': r'\b(yo|tenemos|estamos|vamos a|podemos)\b',
    'DANGLING_CONJ': r'\b(porque|pero|y|o)\.\s*$',
    'INCOMPLETE': r'manifestó que\s+\w{1,5}\.',  # fragmento de 1-2 palabras
    'DANGLING_QUE': r'manifestó que\s+[A-Z]',  # mayúscula después de "que"
}
```

### Umbral de aceptación
| Errores encontrados | Acción |
|---|---|
| 0-10 | Entregar con nota de errores menores corregidos |
| 11-50 | Revisar y corregir sección por sección antes de entregar |
| 51-100 | Regenerar las secciones con más errores |
| 101+ | **STOP** — el Paso 0.5 (Claude API) es obligatorio para este documento |

**La V3 de Torres de Castilla tenía 244 errores → debió haberse detenido y activado el Paso 0.5 antes de entregar.**
