# Document Factory Skill — ForumPHs
**Versión:** 2026-04-11d | **Mantenido por:** Claude | **Repo:** unrlvl-context/brands/ForumPHs/

---

## OVERVIEW

El Document Factory de ForumPHs genera documentos formales a partir de:
- Transcripciones de asambleas (Zoom VTT o texto plano — proviene de Hypal)
- Contratos de servicios para revisión y análisis

ForumPHs es el **laboratorio** donde UNRLVL desarrolla y afina estas metodologías antes de exportarlas al ecosistema.

---

## TIPOS DOCUMENTALES ACTIVOS

| ID | Tipo | Estado | Formato output |
|---|---|---|---|
| `ACTA_ORDINARIA` | Acta de Asamblea Ordinaria | ✅ Producción | .docx |
| `ACTA_EXTRAORDINARIA` | Acta de Asamblea Extraordinaria | ✅ Producción | .docx |
| `CONTRATO_SERVICIOS` | Análisis de Contrato de Servicios | ✅ Producción | .docx |

---

## ARCHIVOS DE REFERENCIA

Siempre presentes en `/mnt/project/`:
- `temp_ACTA_PHAS_GOAL_example_01.docx` — Acta Ordinaria PH Venezia Tower
- `temp_ACTA_PHAS_GOAL_example_02.docx` — Acta Extraordinaria PH Lefevre 75

**REGLA:** Leer ambos archivos ANTES de generar cualquier acta.

---

## APRENDIZAJES CAPTURADOS — BP_BRAND 2026-03-11

### GAP 1 — Bloque de Administración: formato ForumPHs obligatorio
```
Por la administración del P.H. [NOMBRE COMPLETO DEL PH]:
[Nombre 1]
[Ivette Flores — si estuvo presente]
```

### GAP 3 — Segundo llamado: documentar si el quórum no se logró en primer llamado
```
Siendo las [hora] p.m., el personal de Hipal indicó que se contaba con [X] propietarios ([Y]%),
por lo que no se cumplía con el mínimo reglamentario...
Siendo las [hora] p.m., se verificó el quórum reglamentario con [X] propietarios ([Y]%)...
```

### GAP 4 — Estructura de 8 pasos: orden legal no negociable
```
1. ENCABEZADO         — nombre PH, Finca, Código, Folio Real, Ley 284
2. CONVOCATORIA       — texto literal (si aplica)
3. JUNTA DIRECTIVA    — nombres, cargos
4. ADMINISTRACIÓN     — ForumPHs aquí, con formato GAP 1
5. PUNTOS DEL ACTA    — orden del día y desarrollo
6. VOTACIONES         — dentro del punto correspondiente
7. CIERRE             — hora de finalización
8. FIRMAS             — Presidente/a y Secretario/a únicamente
```

### GAP 5 — Cita legal del quórum: artículo obligatorio en el cuerpo
```
...en atención a lo dispuesto en el artículo sesenta y siete (67) de la Ley
doscientos ochenta y cuatro (284) de dos mil veintidós (2022), se puede dar
inicio a la Asamblea [Ordinaria/Extraordinaria].
```

---

## APRENDIZAJES CAPTURADOS — COMPARACIÓN ACTA TORRES DE CASTILLA 2026-04-11

### CORRECCIÓN CRÍTICA: NÚMEROS — dígitos directos, NO letras

**Esta regla reemplaza la versión anterior del skill que indicaba "letras + (dígitos)".**

| Tipo | ❌ Versión anterior | ✅ Correcto |
|---|---|---|
| Votos | `Noventa y nueve (99) votos` | `99 votos` |
| Porcentajes | `cincuenta y dos coma... (52.73%)` | `52.73%` |
| Unidades | `trescientas seis (306) unidades` | `306 unidades` |
| Montos | `trescientos dólares ($300.00)` | `$300.00` |
| Horas en texto | `las dos de la tarde (2:00 pm)` | `las 2:00 pm` |

**Excepciones — SÍ van en letras:**
- Datos registrales: `Finca número tres cero dos cero seis seis dos cinco (30206625)`
- Código de ubicación: `Código de ubicación número ocho siete cero ocho (8708)`

### Cuota en notación B/. (balboa panameño)
- `B/.1.70 por metro cuadrado`, `B/.1.85 por metro cuadrado`
- Resto de montos: `$300.00`, `$5,000`, `$146,000`
- Incluir `.00` cuando el documento de origen los tiene

### Nombre del PH en bold en el párrafo introductorio
- ✅ `los copropietarios del **PH TORRES DE CASTILLA**`

### Labels de la lista "presidida por" en bold
```
-   **Presidente:** Sr. **Alex Piña**, Presidente de la Junta Directiva
-   **Secretario:** Sr. **Dimas Solís**
-   **Administradora:** Sra. **Ivette Flores**
```

### Ivette Flores — título y firmas
- Lista presidencia: `**Administradora:** Sra. **Ivette Flores**`
- En el cuerpo: `Ivette Flores de la administración manifestó que...`
- **Ivette NO firma las actas** — solo Presidente y Secretario

### Aprobaciones: emoji ✅ + bold
- ✅ `✅ **Se aprobó el orden del día original**, quedando rechazadas las adiciones propuestas.`
- ✅ `✅ **Se aprobó oficialmente la cuota de mantenimiento en USD 1.85/m²**, efectiva desde abril de 2026.`

### Total unidades presentes: con highlight {.mark}
- ✅ `encontrándose presentes o debidamente representadas [249 unidades inmobiliarias]{.mark}`

### Hora de cierre: formato exacto
- ✅ `Siendo, el sábado, 28 de febrero de 2026 las 6:24 pm el Presidente da por terminada la Sesión`
- Nota la coma después de "Siendo" y antes del día

### Firmas: línea continua, nombres lado a lado
```
_________________________________    _________________________________

ALEX PIÑA                                    DIMAS SOLIS

PRESIDENTE                                  SECRETARIO
```
NO usar tabla con columnas — una línea larga continua, nombres y cargos en la misma línea con espaciado.

### Densidad de contenido: NO condensar intervenciones
**Este es el gap de contenido más grande.** Ivette preserva cada vuelta del debate como un párrafo independiente. Claude tiende a condensar — NO hacerlo.

Regla: cada propietario que interviene = su propio párrafo. Cada respuesta del Presidente = su propio párrafo. Cada aclaración de Ivette = su propio párrafo. Nunca fusionar intervenciones de distintas personas.

---

## SKILL: GENERACIÓN DE ACTAS

### PASO 1 — ANÁLISIS DE TRANSCRIPCIÓN

#### 1.1 Consolidación de intervenciones
- Identificar hablante por nombre antes de los dos puntos
- Agrupar líneas consecutivas del mismo hablante en un solo bloque de texto
- Conservar COMPLETO el contenido — no resumir, parafrasear ni omitir
- Eliminar: muletillas, problemas técnicos ("¿me escuchan?"), confirmaciones vacías ("sí, listo")

#### 1.2 Extracción de datos obligatoria
- Nombre del PH, fecha, hora inicio/cierre
- Tipo de asamblea, número de acta
- Datos registrales (Finca, Código)
- Junta Directiva y Administración presentes
- Quórum primer llamado (si aplica) y quórum logrado
- Orden del día, votaciones con resultados exactos, acuerdos

---

### PASO 2 — REDACCIÓN EN TERCERA PERSONA

Cada bloque del acta redactado en tercera persona formal:
- `manifestó que`, `indicó que`, `señaló que`, `consultó sobre`, `solicitó que`

Identificación estándar de hablantes:
- `El propietario del apartamento [Unidad], señor [Nombre], manifestó que...`
- `El Presidente, señor Alex Piña (TA-15E), indicó que...`
- `Ivette Flores de la administración manifestó que...`
- `El abogado asesor, Alberto Paul Roach, señaló que...`
- Hipal Talk: NO se transcribe en el acta

---

### PASO 3 — FORMATO

#### Títulos de sección
```
1.  **[VALIDACIÓN DEL QUORUM:]{.underline}**

2.  **[APROBACIÓN DE ORDEN DEL DÍA]{.underline}**
```

#### Votaciones
```
Se sometió a votación [tema]. Los resultados fueron los siguientes:

-   [X] votos a favor de [descripción]
-   [Y] votos en contra de [descripción]

✅ **Se aprobó [tema].**
```

#### Tablas de asistencia
- 3 columnas: Apto. | Propietario | Propietario/R Legal/Apoderado
- Total unidades con `{.mark}`: `[249 unidades inmobiliarias]{.mark}`

---

### PASO 4 — EJECUCIÓN POR BLOQUES

Ver `acta_structure.md` para el mapa completo de bloques. Las actas se generan bloque por bloque — nunca en un solo paso para transcripciones de más de 3 horas.

---

### PASO 5 — CHECKLIST ICR (PRE-OUTPUT POR BLOQUE)

**ICR = Industrial Consistency Ready — ejecutar ANTES de generar cada bloque.**
El score final lo pone Ivette, no Claude.

#### ESTRUCTURA
- [ ] **GAP 4** — Estructura de 8 pasos en orden correcto
- [ ] Títulos: formato `N.  **[TÍTULO]{.underline}**`
- [ ] Firmas: línea continua + nombres lado a lado (no tabla)

#### CONTENIDO
- [ ] **GAP 3** — Primer llamado sin quórum documentado si aplica
- [ ] **GAP 5** — Quórum cita Art. 67 Ley 284 de 2022
- [ ] **GAP 1** — Bloque administración con Ivette si estuvo presente
- [ ] Ivette = `Ivette Flores de la administración` en el cuerpo
- [ ] Ivette NO en bloque de firmas
- [ ] Intervenciones de propietarios sin condensar — cada una es su propio párrafo
- [ ] Hipal Talk no transcrito en el acta

#### FORMATO
- [ ] Números en **dígitos** (votos, porcentajes, unidades, montos, horas)
- [ ] Excepciones en letras: solo datos registrales del RP
- [ ] Nombre del PH en **bold** en el párrafo introductorio
- [ ] Labels "presidida por" en bold (`**Presidente:**`, `**Secretario:**`, `**Administradora:**`)
- [ ] Aprobaciones con `✅ **Se aprobó...**`
- [ ] Total unidades con `{.mark}`
- [ ] Cuota en B/. cuando aplica
- [ ] Montos con `.00` cuando aplica
- [ ] Cierre: `Siendo, el [día], DD de [mes] de AAAA las H:MM pm`

**Si todos los ítems están en verde → generar bloque → declarar ICR ✅ [NOMBRE BLOQUE]**
**Si algún ítem está en rojo → comunicar antes de generar → resolver → volver al inicio**

---

## SKILL: ANÁLISIS DE CONTRATO DE SERVICIOS

### Objetivo
Identificar vulnerabilidades bajo la ley panameña que afecten los intereses del cliente PHAS.

### Estructura del informe
1. Portada (marca PHAS, datos del contrato)
2. Resumen ejecutivo (críticos / altos / medios / positivos)
3. Ficha técnica del contrato
4. Hallazgos y vulnerabilidades (tabla: #, Área, Descripción, Nivel, Recomendación)
5. Aspectos positivos
6. Información requerida para completar el análisis
7. Parámetros para el Document Factory
8. Acciones inmediatas (tabla: acción, descripción, plazo, responsable)

### Campos obligatorios (30 parámetros)
Ver ecosistema o brand.json para la lista completa — incluye: nombre_ph, finca_numero, cedula_contratante, resolucion_jd_numero, idoneidad_proveedor, poliza_rc_proveedor, mecanismo_adr, entre otros.

---

## FLUJO DE TRABAJO GENERAL

```
1. Leer archivos de referencia en /mnt/project/
2. Identificar tipo documental
3. Para ACTAS: consultar acta_structure.md → identificar bloques de ejecución
4. Ejecutar checklist ICR antes de cada bloque
5. Generar bloque por bloque, declarando ICR ✅ en cada uno
6. Guardar en /mnt/user-data/outputs/
7. Presentar al usuario con present_files
```

---

## HISTORIAL DE VERSIONES

| Versión | Fecha | Cambios |
|---|---|---|
| v1.3 | 2026-04-11d | CORRECCIÓN CRÍTICA números en dígitos. Reglas Torres de Castilla: B/. cuota, PH bold, labels bold, ✅ aprobaciones, cierre con coma, firmas side-by-side, densidad intervenciones, B/. cuota, highlight {.mark} |
| v1.2 | 2026-04-11c | Principio ICR — auto-validación pre-output, score externo por Ivette |
| v1.1 | 2026-04-11b | 5 GAPs del BP_BRAND |
| v1.0 | 2026-04-11 | Skill inaugural |
