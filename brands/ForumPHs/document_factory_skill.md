# Document Factory Skill — ForumPHs
**Versión:** 2026-04-11c | **Mantenido por:** Claude | **Repo:** unrlvl-context/brands/ForumPHs/

---

## OVERVIEW

El Document Factory de ForumPHs es un sistema de generación de documentos formales a partir de:
- Transcripciones de asambleas (Zoom VTT o texto plano)
- Contratos de servicios para revisión y análisis
- Cualquier documento legal/administrativo de PH

ForumPHs es el **laboratorio** donde UNRLVL desarrolla y afina estas metodologías antes de exportarlas al ecosistema.

---

## APRENDIZAJES CAPTURADOS — BP_BRAND 2026-03-11

Estos 5 gaps fueron identificados tras el primer intento de generación (enero 2026) y formalizados en el BP_BRAND_ForumPHs_v1.0.json el 11 de marzo 2026. Son **errores que Ivette detecta de inmediato** por su formación legal. Deben respetarse sin excepción.

### GAP 1 — Bloque de Administración: formato ForumPHs obligatorio

El bloque de administración presente NO es una lista genérica de nombres. Siempre debe usar esta estructura exacta:

```
Por la administración del P.H. [NOMBRE COMPLETO DEL PH]:
[Nombre 1]
[Nombre 2]
[Ivette Flores — siempre incluida si estuvo presente]
```

ForumPHs aparece en el bloque de administración, nunca en el encabezado del PH. Si Ivette Flores asistió a la asamblea como representante de la administración, su nombre es obligatorio en este bloque.

### GAP 2 — Porcentajes: "coma" como separador decimal, siempre

En redacción formal panameña el separador decimal se verbaliza como **"coma"**, nunca como "punto" ni "con".

❌ `cincuenta y uno punto cincuenta y tres por ciento`
❌ `cincuenta y uno con cincuenta y tres por ciento`
✅ `cincuenta y uno coma cincuenta y tres por ciento (51.53%)`

Esta regla aplica a TODOS los porcentajes del acta sin excepción.

### GAP 3 — Segundo llamado: documentar si el quórum no se logró en primer llamado

Si la transcripción muestra que a la hora convocada no había quórum suficiente y se hizo un segundo llamado (típicamente 1 hora después), el acta DEBE documentar ambos momentos:

```
Siendo las [hora primer llamado] ([hora]), se verificó la presencia de [X] propietarios,
lo que no alcanzaba el quórum requerido de más de la mitad de los propietarios.
En virtud de lo anterior, se procedió a realizar un segundo llamado a las [hora segundo llamado]
([hora]), en atención a lo dispuesto en el artículo [XX] de la Ley 284 de 2022.
```

Omitir el primer llamado fallido es un error legal que puede invalidar el acta.

### GAP 4 — Estructura de 8 pasos: orden legal no negociable

La secuencia del acta es fija por su naturaleza legal. No se puede reordenar:

```
1. ENCABEZADO         — nombre PH, Finca, Código, Folio Real, Ley 284
2. CONVOCATORIA       — texto literal de la convocatoria (si aplica)
3. JUNTA DIRECTIVA    — nombres, cargos, cédulas de los presentes
4. ADMINISTRACIÓN     — ForumPHs aquí, con formato GAP 1
5. ORDEN DEL DÍA      — puntos numerados con formato letras + (dígitos)
6. VOTACIONES         — dentro del punto correspondiente, formato estándar
7. CIERRE             — hora de finalización en letras + (dígitos)
8. FIRMAS             — Presidente/a y Secretario/a únicamente
```

Si la transcripción mezcla elementos, el acta los reordena en esta secuencia. La estructura del output siempre es esta, independientemente de cómo venga el input.

### GAP 5 — Cita legal del quórum: artículo obligatorio en el cuerpo

La verificación del quórum siempre cita el artículo de la Ley 284. Frase canónica:

```
...en atención a lo dispuesto en el artículo sesenta y siete (67) de la Ley
doscientos ochenta y cuatro (284) de dos mil veintidós (2022), se puede dar
inicio a la Asamblea [Ordinaria/Extraordinaria].
```

Para Ivette como abogada, omitir esta cita en el quórum es un error de fondo, no de forma.

---

## TIPOS DOCUMENTALES ACTIVOS

| ID | Tipo | Estado | Formato output |
|---|---|---|---|
| `ACTA_ORDINARIA` | Acta de Asamblea Ordinaria | ✅ Producción | .docx |
| `ACTA_EXTRAORDINARIA` | Acta de Asamblea Extraordinaria | ✅ Producción | .docx |
| `CONTRATO_SERVICIOS` | Análisis de Contrato de Servicios | ✅ Inaugurado 2026-04-11 | .docx |

---

## ARCHIVOS DE REFERENCIA

Siempre presentes en `/mnt/project/` al inicio de sesión:
- `temp_ACTA_PHAS_GOAL_example_01.docx` — ejemplo Asamblea Ordinaria (PH Venezia Tower)
- `temp_ACTA_PHAS_GOAL_example_02.docx` — ejemplo Asamblea Extraordinaria (PH Lefevre 75)

**REGLA:** Leer ambos archivos ANTES de generar cualquier acta para internalizar la estructura exacta.

---

## SKILL: GENERACIÓN DE ACTAS (ACTA_ORDINARIA / ACTA_EXTRAORDINARIA)

### PASO 1 — ANÁLISIS DE TRANSCRIPCIÓN

#### 1.1 CONSOLIDACIÓN DE INTERVENCIONES
Las transcripciones de Zoom dividen intervenciones en múltiples timestamps. Reglas:
- Identificar hablante por nombre antes de los dos puntos (`Hipal Talk:`, `Apartamento 9C TA | Hilda Lorena Moreno:`)
- Agrupar TODAS las líneas consecutivas del mismo hablante en UN SOLO BLOQUE
- Conservar contenido COMPLETO — no resumir, parafrasear ni omitir
- Registrar timestamp inicial y final del bloque

#### 1.2 EXTRACCIÓN DE DATOS OBLIGATORIA
Extraer siempre:
- Nombre del PH
- Fecha y hora de inicio y finalización
- Tipo de asamblea (Ordinaria / Extraordinaria)
- Número de acta
- Datos de inscripción (Finca, Código, Folio Real — si disponible)
- Junta Directiva presente (nombres, cargos, cédulas/ID)
- Administración presente
- Quorum inicial y final (números y porcentajes EXACTOS)
- Orden del día EN ORDEN
- Todas las votaciones con resultados EXACTOS (a favor, en contra, abstenciones, %)
- Intervenciones de propietarios (nombre completo, unidad, intervención COMPLETA)
- Acuerdos y resoluciones
- Postulaciones a cargos

---

### PASO 2 — REDACCIÓN EN TERCERA PERSONA

**REGLA FUNDAMENTAL:** El acta SIEMPRE se redacta en TERCERA PERSONA con lenguaje formal, legal y objetivo.

#### Transformación de diálogo a narrativa
❌ NUNCA: `"Yo me postulo para el cargo"` / `"Buenos días, mi nombre es..."` / `"¿Me escuchan?"`
✅ SIEMPRE: `"El señor [Nombre] se postuló para el cargo de [Cargo]"` / `"El señor [Nombre] dio la bienvenida"`

#### Verbos en pretérito perfecto simple
`indicó`, `manifestó`, `expresó`, `solicitó`, `procedió`, `se sometió a votación`, `se aprobó`

#### Formato de identificación de hablantes
`El/La [propietario/a] del apartamento [Unidad] [Torre], [Nombre Completo], [verbo] que [contenido completo].`

---

### PASO 3 — ESTRUCTURA DEL DOCUMENTO

```
**[ACTA No_X-2025]{.underline}**

**[TIPO DE ASAMBLEA] DE PROPIETARIOS DEL [NOMBRE COMPLETO DEL PH]**

**[día de la semana], [fecha completa]**

[Párrafo introductorio con ciudad, hora en letras (hora en números), tipo de reunión, nombre PH, datos de inscripción si disponibles, ley aplicable]

[Convocatoria en cursiva si está disponible]

[Presidió la Asamblea... / Se encontraban presentes:]

[Junta Directiva y Administración]

1. **[PRIMER PUNTO EN MAYÚSCULAS]{.underline}**
   [Desarrollo con intervenciones consolidadas en tercera persona]
   [Votaciones con formato estándar]

[...resto de puntos...]

[Hora de cierre]

**Para constancia se firma la presente acta,**
**Junta Directiva, DEL [NOMBRE PH]**

**[NOMBRE PRESIDENTE]          [NOMBRE SECRETARIO]**
**PRESIDENTE/A                 SECRETARIO/A**
```

---

### PASO 4 — REGLAS DE FORMATO CRÍTICAS

#### 4.1 Números en letras (OBLIGATORIO)
Todos los números importantes: **primero en letras** + **(dígitos entre paréntesis)**
- Quorum: `sesenta y siete (67) propietarios`
- Votos: `ciento veinte (120) votos`
- Porcentajes: `sesenta y nueve coma treinta y tres por ciento (69.33%)`
- Horas: `seis y veintidós de la tarde (6:22 pm)`
- Fechas: `veintiuno (21) de enero de dos mil veintiséis (2026)`
- Dinero: `setenta mil dólares ($70,000.00)`

#### 4.2 Formato de negritas y subrayados
| Elemento | Formato |
|---|---|
| Título del acta | `**[ACTA No_X-2025]{.underline}**` |
| Tipo de asamblea | `**ASAMBLEA ORDINARIA/EXTRAORDINARIA...**` |
| Nombre del PH en párrafo | `**PH NOMBRE**` |
| Títulos de puntos | `**[TÍTULO EN MAYÚSCULAS]{.underline}**` |
| Firmas | `**NOMBRE**` / `**CARGO**` |

---

### PASO 5 — FORMATO DE VOTACIONES

```
Se sometió a votación [tema completo]. Los resultados fueron los siguientes:

[X en letras] ([X]) votos a favor de [descripción exacta]
[Y en letras] ([Y]) votos en contra de [descripción exacta]
[Z en letras] ([Z]) abstenciones  ← solo si las hay

[Se aprobó/No se aprobó] [tema] con [votos en letras] ([número]) votos
que representan el [porcentaje en letras] por ciento ([%]).
```

**NUNCA:** inventar números, redondear porcentajes, omitir abstenciones, cambiar resultado.

---

### PASO 6 — TABLAS DE ASISTENCIA

Cuando hay lista de unidades presentes usar formato:
```
+----------------+---------------------------+----------------------+
| **UNIDAD**     | **PROPIETARIOS**          | **REPRESENTADO**     |
+================+===========================+======================+
| 01 OA          | Nombre Completo           |                      |
+----------------+---------------------------+----------------------+
| 02 EB          | Nombre Completo           | Nombre Representante |
+----------------+---------------------------+----------------------+
```

---

### PASO 7 — VALIDACIÓN ICR ANTES DE GENERAR EL OUTPUT

**ICR = Industrial Consistency Ready**

Antes de escribir una sola línea del acta final, Claude debe ejecutar internamente una auto-revisión del plan de trabajo contra todos los estándares del skill. El output solo se genera si el plan pasa este filtro. El acta nunca se entrega sin la marca ICR.

**Protocolo ICR:**
1. Con la transcripción ya analizada y los datos extraídos, Claude revisa mentalmente el plan de redacción contra cada punto del checklist siguiente.
2. Si detecta algún ítem que NO puede cumplir (datos faltantes, ambigüedad, información contradictoria), lo documenta ANTES de generar y se lo comunica a Sam para resolverlo.
3. Solo cuando todos los ítems están en verde, Claude genera el .docx y lo declara **ICR ✅**.
4. **El score lo pone Ivette, no Claude.** ICR no significa "perfecto" — significa "cumple todos los estándares conocidos del skill en este momento". El feedback de Ivette es el que actualiza el skill para la siguiente iteración.

**Nunca declarar ICR sin haber ejecutado el checklist completo.**

#### Checklist ICR — verificar ANTES de generar:
- [ ] Todas las intervenciones del mismo hablante consolidadas
- [ ] TODO el texto en tercera persona
- [ ] Todos los números en letras + (dígitos)
- [ ] Todas las votaciones con resultados exactos
- [ ] Formato de encabezados correcto (negritas + subrayado)
- [ ] Nombres completos de TODOS los intervinientes
- [ ] Identificación de unidad para propietarios
- [ ] Hora de inicio y cierre en letras + (dígitos)
- [ ] Firmas al final con formato correcto
- [ ] NO hay resúmenes ni paráfrasis de intervenciones
- [ ] NO hay diálogos en primera persona
- [ ] **GAP 1** — Bloque administración usa formato ForumPHs con Ivette Flores si aplica
- [ ] **GAP 2** — Todos los porcentajes verbalizados con "coma" como separador decimal
- [ ] **GAP 3** — Si hubo segundo llamado, ambos momentos documentados en el quórum
- [ ] **GAP 4** — Estructura respeta los 8 pasos en orden legal exacto
- [ ] **GAP 5** — Quórum cita Art. 67 Ley 284 de 2022 en el cuerpo del acta

Si todos los ítems están en verde → generar .docx → declarar **ICR ✅**
Si algún ítem está en rojo → comunicar el bloqueo antes de generar → resolver → volver al inicio del checklist
- [ ] Todas las intervenciones del mismo hablante consolidadas
- [ ] TODO el texto en tercera persona
- [ ] Todos los números en letras + (dígitos)
- [ ] Todas las votaciones con resultados exactos
- [ ] Formato de encabezados correcto (negritas + subrayado)
- [ ] Nombres completos de TODOS los intervinientes
- [ ] Identificación de unidad para propietarios
- [ ] Hora de inicio y cierre en letras + (dígitos)
- [ ] Firmas al final con formato correcto
- [ ] NO hay resúmenes ni paráfrasis de intervenciones
- [ ] NO hay diálogos en primera persona
- [ ] Documento guardado en `/mnt/user-data/outputs/`
- [ ] **GAP 1** — Bloque administración usa formato ForumPHs con Ivette Flores si aplica
- [ ] **GAP 2** — Todos los porcentajes verbalizados con "coma" como separador decimal
- [ ] **GAP 3** — Si hubo segundo llamado, ambos momentos documentados en el quórum
- [ ] **GAP 4** — Estructura respeta los 8 pasos en orden legal exacto
- [ ] **GAP 5** — Quórum cita Art. 67 Ley 284 de 2022 en el cuerpo del acta

---

### PASO 8 — MANEJO DE INFORMACIÓN FALTANTE

**HACER:**
- Usar `[INFORMACIÓN NO DISPONIBLE EN TRANSCRIPCIÓN]` para datos críticos faltantes
- Inferir datos obvios del contexto
- Documentar qué información está incompleta

**NO HACER:**
- Inventar números de finca/folio
- Inventar nombres de propietarios no mencionados
- Inventar resultados de votaciones
- Omitir puntos del orden del día

---

## SKILL: ANÁLISIS DE CONTRATO DE SERVICIOS (CONTRATO_SERVICIOS)

### Objetivo del análisis
Identificar vulnerabilidades, inconsistencias y puntos de riesgo que puedan afectar negativamente:
- Los intereses del cliente de PHAS/ForumPHs
- Los aspectos legales bajo la ley panameña

### Parámetros mínimos del tipo documental

#### Campos obligatorios del sistema
| Parámetro | Tipo | Descripción |
|---|---|---|
| `nombre_ph` | Obligatorio | Nombre exacto del PH conforme al Registro Público |
| `finca_numero` | Obligatorio | Número de finca registral |
| `codigo_ubicacion` | Obligatorio | Código de ubicación del Registro Público |
| `ruc_ph` | Obligatorio | RUC del PH (formato: X-NT-X-XXXXXX DV XX) |
| `representante_contratante` | Obligatorio | Nombre completo del firmante |
| `cedula_contratante` | Obligatorio | Número de cédula del firmante. Validar formato panameño (X-XXX-XXXX) |
| `cargo_contratante` | Obligatorio | Cargo del firmante |
| `resolucion_jd_numero` | Obligatorio | Número y fecha de resolución de JD que autoriza el contrato |
| `nombre_proveedor` | Obligatorio | Nombre completo del proveedor |
| `cedula_ruc_proveedor` | Obligatorio | Cédula o RUC del proveedor. Validar formato y DV |
| `idoneidad_proveedor` | Condicional | Número de idoneidad profesional (servicios técnicos regulados) |
| `tipo_servicio` | Obligatorio | Inspección / Asesoría Legal / Contabilidad / Mantenimiento / Seguridad / Otro |
| `descripcion_servicio` | Obligatorio | Mínimo 100 caracteres |
| `monto_mensual` | Obligatorio | En USD. Indicar si incluye ITBMS |
| `incluye_itbms` | Obligatorio | Booleano. Si false → calcular 7% automáticamente |
| `modalidad_pago` | Obligatorio | Mensual / Quincenal / Por entregable / Por hito |
| `condiciones_pago` | Obligatorio | Criterios OBJETIVOS de autorización (no subjetivos) |
| `fecha_inicio` | Obligatorio | dd/mm/aaaa |
| `fecha_fin_estimada` | Obligatorio | Sistema calcula días hábiles automáticamente |
| `plazo_dias_habiles` | Calculado | Campo calculado — no editable manualmente |
| `poliza_rc_proveedor` | Obligatorio | ¿Requiere póliza RC profesional? Monto mínimo |
| `cuenta_bancaria_pago` | Obligatorio | Banco, tipo, número de cuenta |
| `email_proveedor` | Obligatorio | Correo oficial del proveedor |
| `email_contratante` | Obligatorio | Correo oficial del PH |
| `telefono_proveedor` | Obligatorio | Teléfono de contacto |
| `contrato_relacionado` | Condicional | Si supervisa otro contrato, referenciar |
| `entregables_requeridos` | Obligatorio | Lista de entregables, frecuencia y formato |
| `causales_terminacion_adicionales` | Opcional | Causales beyond las estándar del Código Civil |
| `mecanismo_adr` | Obligatorio | Solo tribunales / Mediación previa / Arbitraje / Escalonado |
| `plazo_prorroga_notificacion` | Obligatorio | Días hábiles de anticipación para notificar |

#### Cláusulas críticas obligatorias
| Cláusula | Prioridad | Contenido mínimo |
|---|---|---|
| Partes y Representación | CRÍTICA | ID completa + base legal de representación + resolución JD |
| Objeto del Contrato | CRÍTICA | Descripción precisa + exclusiones explícitas |
| Cuantía y Forma de Pago | CRÍTICA | Monto, periodicidad, condiciones OBJETIVAS, ITBMS, datos bancarios |
| Plazo y Vigencia | CRÍTICA | Fechas exactas. Días hábiles consistentes en TODO el documento |
| Obligaciones del Proveedor | CRÍTICA | Lista detallada: entregables, plazos, calidad, comunicación, confidencialidad |
| Obligaciones del Contratante | ALTA | Acceso, información, pagos, colaboración |
| Responsabilidad Profesional | CRÍTICA | Alcance, límite cuantitativo (cap), excepciones dolo/fraude, póliza RC |
| Independencia y Conflicto de Interés | ALTA | Declaración, prohibiciones, consecuencias |
| Causales de Terminación | CRÍTICA | Por mutuo acuerdo, por incumplimiento, por vencimiento, fuerza mayor |
| Resolución de Controversias | ALTA | Escalonado: negociación → mediación → arbitraje/tribunal |
| Caso Fortuito y Fuerza Mayor | MEDIA | Definición Código Civil panameño + obligación de notificación |
| Notificaciones | ALTA | Canales válidos, confirmación recepción, plazos |
| Disposiciones Finales | MEDIA | Integralidad, modificaciones solo por addenda firmada, cesión |
| Legislación Aplicable | OBLIGATORIA | Leyes de Panamá. Jurisdicción: Tribunales Civiles de Panamá |

#### Reglas de validación automática
1. **FECHAS:** Calcular días hábiles entre fecha_inicio y fecha_fin_estimada. Si no coincide con plazo declarado → rechazar y alertar.
2. **CONSISTENCIA:** Verificar que el plazo sea idéntico en TODAS las cláusulas. Si hay discrepancia → bloquear generación.
3. **CÉDULA/RUC:** Validar formato panameño. Alertar si incompleto o inusual.
4. **MONTO vs. AUTORIZACIÓN:** Si monto supera umbral del reglamento del PH → requerir `resolucion_jd_numero`.
5. **ITBMS:** Si `incluye_itbms = false` → calcular y mostrar monto con ITBMS (7%).
6. **PÓLIZA RC:** Para servicios técnicos/legales/inspección → verificar que `poliza_rc_proveedor` tenga monto. Si vacío → advertencia.
7. **CONTRATO RELACIONADO:** Si existe contrato supervisado → verificar que esté adjunto como Anexo A.
8. **EMAIL:** Validar formato. Verificar que email del PH coincida con el registrado en el sistema.

### Estructura del informe de análisis
El output es un `.docx` profesional con las siguientes secciones:
1. Portada (marca PHAS, datos del contrato)
2. Resumen ejecutivo (tabla: críticos / altos / medios / positivos)
3. Ficha técnica del contrato
4. Hallazgos y vulnerabilidades (tabla con columnas: #, Área, Descripción, Nivel, Recomendación)
5. Aspectos positivos identificados
6. Información requerida para completar el análisis
7. Parámetros para el Document Factory
8. Acciones inmediatas recomendadas (tabla: acción, descripción, plazo, responsable)

---

## FLUJO DE TRABAJO GENERAL

```
1. Leer archivos de referencia en /mnt/project/
2. Identificar tipo documental (ACTA_ORDINARIA / ACTA_EXTRAORDINARIA / CONTRATO_SERVICIOS)
3. Ejecutar skill correspondiente
4. Validar checklist
5. Guardar en /mnt/user-data/outputs/
6. Presentar al usuario con present_files
```

---

## HISTORIAL DE VERSIONES

| Versión | Fecha | Cambios |
|---|---|---|
| v1.2 | 2026-04-11c | Principio ICR incorporado — auto-validación pre-output, score externo por Ivette |
| v1.1 | 2026-04-11b | 5 GAPs del BP_BRAND incorporados — formato admin ForumPHs, "coma" decimal, segundo llamado, estructura 8 pasos, Art.67 en quórum |
| v1.0 | 2026-04-11 | Skill inaugural — ACTA_ORDINARIA + ACTA_EXTRAORDINARIA + CONTRATO_SERVICIOS |
