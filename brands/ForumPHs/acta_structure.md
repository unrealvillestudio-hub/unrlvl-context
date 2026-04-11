# Estructura Documental — Actas de Asamblea
**Versión:** 2026-04-11 v1.0 | **Mantenido por:** Claude | **Repo:** unrlvl-context/brands/ForumPHs/

---

## PROPÓSITO

Este documento define la arquitectura de bloques de las Actas de Asamblea de PH.

**Por qué bloques:** Las transcripciones de asambleas largas (3-5 horas, 800+ bloques consolidados) saturan el contexto si se generan en un solo paso. La ejecución por bloques permite:
- Generación independiente de cada sección
- Checklist ICR por bloque (no solo al final)
- Correcciones quirúrgicas sin regenerar todo
- Escalabilidad a cualquier duración de asamblea

---

## MAPA DE BLOQUES

### BLOQUES FIJOS
Presentes en TODA acta, independientemente del orden del día.

```
┌─────────────────────────────────────────────────────┐
│  BLOQUE F-1: ENCABEZADO + INTRO + CONVOCATORIA      │
│  BLOQUE F-2: APERTURA (Presidencia + Quórum)         │
│  BLOQUE F-3: LISTA DE ASISTENTES                    │
│  [BLOQUES VARIABLES — ver abajo]                    │
│  BLOQUE F-4: CIERRE + FIRMAS                        │
└─────────────────────────────────────────────────────┘
```

### BLOQUES VARIABLES
Un bloque por cada punto del orden del día. El número y nombre de los bloques depende de la asamblea específica.

```
┌─────────────────────────────────────────────────────┐
│  BLOQUE V-1: VALIDACIÓN DEL QUÓRUM                  │
│  BLOQUE V-2: [PUNTO 2 DEL ORDEN DEL DÍA]            │
│  BLOQUE V-3: [PUNTO 3 DEL ORDEN DEL DÍA]            │
│  ...                                                 │
│  BLOQUE V-N: [PUNTO N DEL ORDEN DEL DÍA]            │
└─────────────────────────────────────────────────────┘
```

---

## DESCRIPCIÓN DE BLOQUES FIJOS

### BLOQUE F-1: ENCABEZADO + INTRO + CONVOCATORIA

**Fuente:** Administración (no viene de la transcripción verbal)
**Inputs necesarios:**
- Nombre completo del PH
- Número de Finca (en letras + dígitos)
- Código de ubicación (en letras + dígitos)
- Sección de Propiedad Horizontal
- Fecha y hora de inicio (dígitos)
- Modalidad (virtual / presencial)
- Texto literal de la convocatoria (documento enviado por JD)

**Estructura:**
```
**[ACTA No_X-AAAA]{.underline}**

**ASAMBLEA [ORDINARIA/EXTRAORDINARIA] DE PROPIETARIOS DEL P.H. [NOMBRE]**

**[día de la semana], [fecha completa]**

En la ciudad de Panamá, siendo las [H:MM pm/am] del [día], [fecha], se reunieron
previa convocatoria los copropietarios del **[PH NOMBRE]**, que se encuentra
debidamente inscrita bajo la Finca número [letras] ([dígitos]), con Código de
ubicación número [letras] ([dígitos]) de la Sección de Propiedad Horizontal,
Provincia de Panamá del Registro Público, conforme a lo establecido en la Ley
No. 284 de 14 de febrero de 2022 de Propiedad Horizontal, dicha reunión se llevó
a cabo de manera [virtual/presencial].

A fin de celebrar esta Asamblea General [Ordinaria/Extraordinaria] se comunicó a
todos los propietarios [...]

[CONVOCATORIA EN CURSIVA — texto literal]
```

**ICR F-1:**
- [ ] Nombre PH en bold en el párrafo intro
- [ ] Datos registrales en letras + (dígitos)
- [ ] Hora en dígitos
- [ ] Convocatoria en cursiva
- [ ] Modalidad indicada

---

### BLOQUE F-2: APERTURA (Presidencia + Quórum)

**Fuente:** Transcripción (segmentos iniciales de Hipal + Presidente)
**Inputs necesarios:**
- Nombre y cargo del Presidente
- Nombre y cargo del Secretario
- Hora del primer llamado + propietarios en ese momento + porcentaje (si no hubo quórum)
- Hora en que se logró el quórum + propietarios + porcentaje
- Cita Art. 67 Ley 284

**Estructura:**
```
Preside la Asamblea General [Ordinaria/Extraordinaria] en calidad de Presidente
de la reunión el señor [NOMBRE], actuó como secretario de la reunión y llevó el
acta de la misma, el señor [NOMBRE].

Siendo las [H:MM p.m.], el personal de la plataforma Hipal indicó que se contaba
con [X] propietarios, lo que representa [Y]%, por lo que no se cumplía con el
mínimo reglamentario...  [SI APLICA - primer llamado sin quórum]

Siendo las [H:MM p.m.], se verificó que se contaba con el quórum reglamentario,
por lo que el Presidente de la Junta Directiva del PH [NOMBRE] informó que se
contaba con [X] propietarios, lo que equivale al [Y]% de los propietarios, lo que
aseguraba el quórum requerido para dar inicio formal a la Asamblea [Ordinaria/
Extraordinaria]. [imagen placeholder si aplica]

La asamblea fue presidida por:

-   **Presidente:** Sr. **[Nombre]**, Presidente de la Junta Directiva
-   **Secretario:** Sr. **[Nombre]**
-   **Administradora:** Sra. **Ivette Flores**  [si estuvo presente]
```

**ICR F-2:**
- [ ] GAP 3 — Primer llamado sin quórum documentado si aplica
- [ ] GAP 5 — Cita Art. 67 Ley 284 de 2022
- [ ] Labels "presidida por" en bold
- [ ] Ivette como "Administradora" en lista (NO firma)
- [ ] Horas en dígitos

---

### BLOQUE F-3: LISTA DE ASISTENTES

**Fuente:** Sistema Hypal (no viene de la transcripción verbal) — Ivette la provee
**Inputs necesarios:**
- Lista completa de unidades presentes o representadas (nombre propietario + apoderado si aplica)
- Total de unidades al día para votar
- Total de unidades presentes o representadas

**Estructura:**
```
[VALIDACIÓN QUÓRUM — cifras clave]

La asamblea de propietarios del PH [NOMBRE] consta de [X] apartamentos entre
[Torres] y [X] locales comerciales, de los cuales se encontraban presentes al
inicio de la reunión [X] unidades inmobiliarias.

También importante confirmar que de los [X] [apartamentos/unidades] del PH
[NOMBRE], se encontraban al día [X] unidades inmobiliarias.

A medida que transcurría la reunión se iban incorporando unidades inmobiliarias,
encontrándose presentes o debidamente representadas [X unidades inmobiliarias]{.mark}

[TABLA DE ASISTENCIA — 3 columnas: Apto. | Propietario | Propietario/R Legal/Apoderado]

Una vez validado el quórum el Presidente declara legalmente establecida la
Asamblea, dando inicio con la lectura del orden del día...
```

**Nota:** El total de unidades presentes va en `{.mark}` (resaltado amarillo).

**ICR F-3:**
- [ ] Total unidades con `{.mark}`
- [ ] Tabla con 3 columnas correctas
- [ ] Cifras en dígitos

---

### BLOQUE F-4: CIERRE + FIRMAS

**Fuente:** Transcripción (últimas intervenciones del Secretario)
**Inputs necesarios:**
- Última intervención de cierre
- Hora exacta de cierre
- Nombres de Presidente y Secretario

**Estructura:**
```
[Último párrafo de la Asamblea — agradecimientos del Presidente]

El Secretario, [Nombre], declaró formalmente cerrada la [primera/X] Asamblea
del año [AAAA].

Siendo, el [día de semana], [DD] de [mes] de [AAAA] las [H:MM pm] el Presidente
da por terminada la Sesión de la Asamblea de Propietarios.

**Para constancia se firma la presente acta,**

**Junta Directiva, DEL P.H. [NOMBRE]**

__________________________________________________    __________________________________________________

**[NOMBRE PRESIDENTE]**                                        **[NOMBRE SECRETARIO]**

**PRESIDENTE**                                                           **SECRETARIO**
```

**ICR F-4:**
- [ ] Hora en dígitos
- [ ] Coma después de "Siendo,": `Siendo, el [día],...`
- [ ] Firmas en línea continua (no tabla)
- [ ] Solo Presidente y Secretario — Ivette NO firma
- [ ] Formato bold correcto en nombres y cargos

---

## DESCRIPCIÓN DE BLOQUES VARIABLES

### BLOQUE V-QUÓRUM: Validación del Quórum

**Fuente:** Transcripción + datos de Hypal
**Típicamente el Punto 1 del orden del día**
**Contenido:** Narrativa formal del proceso de verificación. En este bloque ya se detallaron las cifras en F-2; aquí se confirman y se da inicio formal.

---

### BLOQUE V-ORDEN-DIA: Aprobación del Orden del Día

**Fuente:** Transcripción
**Presente en casi todas las asambleas**
**Contenido:**
- Lectura del orden del día por Ivette Flores de la administración
- Intervenciones de propietarios solicitando modificaciones
- Debate sobre las modificaciones
- Votación: opciones claras + resultados + ✅/❌

**Patrón de votación del orden del día:**
```
Se sometió a votación el Orden del día. Los resultados fueron los siguientes:

-   [X] votos a favor del orden del día original.
-   [Y] votos a favor del orden del día modificado.

[imagen placeholder]

✅ **Se aprobó el orden del día original**, quedando rechazadas las adiciones propuestas.
```

---

### BLOQUE V-INFORME-GESTION: Informe de Gestión de la Junta Directiva

**Fuente:** Documento preparado por la JD (NO viene de la transcripción verbal)
**Ivette o la JD lo provee como texto separado**
**Contenido:** Narrativa de todas las obras, mejoras y mantenimientos realizados durante el período. Texto largo y detallado, formal.

**Nota importante:** Este bloque NO se genera desde la transcripción. Se inserta el documento preparado. Si no se tiene disponible, marcar `[DOCUMENTO INFORME DE GESTIÓN PENDIENTE — proveer por administración]`.

---

### BLOQUE V-CIERRE-FISCAL: Presentación de Cierre Fiscal

**Fuente:** Transcripción (presentación del Presidente) + estados financieros
**Contenido:** Cifras financieras del período (activos, pasivos, morosidad, fondos). El Presidente las presenta verbalmente; se transcriben en 3ª persona.

---

### BLOQUE V-PRESUPUESTO: Aprobación de Presupuesto / Aumento de Cuota

**Fuente:** Transcripción
**Tipicamente el bloque más largo de la asamblea**
**Estructura interna:**
1. Presentación de opciones por el Presidente
2. Debate propietarios (CADA intervención = párrafo propio)
3. Explicación del procedimiento de votación por Ivette
4. Primera votación (¿aumentar sí/no?)
5. Segunda votación (¿qué monto?)
6. Tercera votación (¿desde cuándo?)
7. Resultado final con ✅

**⚠️ Advertencia de densidad:** Este bloque en asambleas largas puede tener 150+ párrafos. NO condensar.

---

### BLOQUE V-ELECCION-JD: Elección/Renovación de Junta Directiva

**Fuente:** Transcripción
**Contenido:** Postulaciones, debate, votación por cada cargo, resultado.

---

### BLOQUE V-REGLAMENTO: Lectura y Aprobación de Reglamento de Uso

**Fuente:** Transcripción
**Contenido:** Modificaciones propuestas, debate, votación por artículo o por el conjunto.

---

### BLOQUE V-LOBBY / V-OBRAS: Elección de Materiales / Proyectos de Obra

**Fuente:** Transcripción + imágenes de materiales (Ivette provee)
**Estructura interna:**
1. Presentación de opciones por el Presidente
2. Debate
3. Votación: ¿ejecutar el proyecto? + ✅/❌
4. Votación: ¿qué material/opción? + ✅
5. Votaciones por torre si aplica

---

### BLOQUE V-VARIOS: Preguntas, Derecho de Palabra, Asuntos Varios

**Fuente:** Transcripción
**Contenido:** Intervenciones libres de propietarios que no corresponden a puntos formales del orden del día. Cada intervención = su propio párrafo.

---

## SECUENCIA DE EJECUCIÓN

```
SESIÓN 1 (siempre)
├── Generar BLOQUE F-1 → ICR ✅
├── Generar BLOQUE F-2 → ICR ✅
└── Generar BLOQUE F-3 → ICR ✅ [tabla de asistentes + Ivette provee]

SESIÓN 2 (o continuación)
├── Generar BLOQUE V-QUÓRUM → ICR ✅
├── Generar BLOQUE V-ORDEN-DIA → ICR ✅
└── Generar BLOQUE V-INFORME-GESTION → ICR ✅ [doc preparado]

SESIÓN 3 (o continuación)
├── Generar BLOQUE V-CIERRE-FISCAL → ICR ✅
└── Generar BLOQUE V-PRESUPUESTO → ICR ✅ [bloque pesado — tomar su tiempo]

SESIÓN 4 (o continuación)
├── Generar BLOQUE V-[PUNTO N] → ICR ✅
└── ...

SESIÓN FINAL
└── Generar BLOQUE F-4 → ICR ✅
```

---

## CATÁLOGO DE FUENTES POR BLOQUE

| Bloque | Transcripción | Doc Administración | Hypal Sistema |
|---|---|---|---|
| F-1 Encabezado | ❌ | ✅ Convocatoria | ❌ |
| F-2 Apertura | ✅ Quórum verbal | ❌ | ✅ Números quórum |
| F-3 Lista Asistentes | ❌ | ❌ | ✅ Lista unidades |
| V-Quórum | ✅ | ❌ | ✅ Números exactos |
| V-Orden Día | ✅ | ❌ | ✅ Resultados votación |
| V-Informe Gestión | ❌ | ✅ Documento JD | ❌ |
| V-Cierre Fiscal | ✅ | ✅ EEFF | ❌ |
| V-Presupuesto | ✅ | ✅ Presupuesto | ✅ Resultados votación |
| V-Lobby/Obras | ✅ | ❌ | ✅ Resultados + fotos materiales |
| V-Varios | ✅ | ❌ | ❌ |
| F-4 Cierre+Firmas | ✅ | ❌ | ❌ |

**Leyenda:** ✅ = fuente activa para este bloque | ❌ = no aplica
Las fotos/capturas de pantalla de Hypal = siempre Ivette's 10%

---

## SEÑALES DE TRANSICIÓN EN TRANSCRIPCIÓN

Estas frases en la transcripción indican el fin de un bloque y el inicio del siguiente:

| Frase en transcripción | Bloque que termina | Bloque que inicia |
|---|---|---|
| "vamos al segundo punto" / "pasamos al punto X" | Bloque anterior | Siguiente punto |
| "Daniel, lanza la votación" / "lanzamos a votación" | Debate | Votación |
| "cerramos votación" / "resultados" | Votación | Resultado + ✅/❌ |
| "Con esto concluyó la presentación..." | Informe de gestión | Siguiente punto |
| "queda cerrada la [primera/X] Asamblea" | Último punto | BLOQUE F-4 |
| Hipal: "siendo las [hora]" al final | Último punto | BLOQUE F-4 |

---

## PATRONES COMUNES DETECTADOS

*Esta sección crece con cada acta procesada. Versión inicial basada en:*
- *PH Venezia Tower — Asamblea Ordinaria 2025 (Acta No_1-2025)*
- *PH Lefevre 75 Don Enrique — Asamblea Extraordinaria 2025 (Acta No_4-2025)*
- *PH Torres de Castilla — Asamblea Ordinaria 2026 (Acta No_1-2026)*

### Patrón: votación en dos etapas (aprobado en Torres de Castilla)
Cuando hay múltiples opciones de cuota, Ivette estructura la votación en dos etapas:
1. **¿Aumentar sí o no?** (votación calificada — 51% de unidades al día)
2. **¿Cuánto?** (entre las opciones específicas)

### Patrón: proyecto en presupuesto = ya aprobado
Cuando el presupuesto se aprueba con una cuota específica, los proyectos incluidos en ese presupuesto quedan automáticamente aprobados. Solo se vota el material o la especificación.

### Patrón: abogado asesor como validador legal
En Torres de Castilla, el abogado asesor Alberto Paul Roach interviene para:
- Confirmar que la asamblea está constituida
- Validar procedimientos de votación
- Aclarar procesos legales (hipotecas, comités)
Sus intervenciones siempre van en párrafo propio: `El abogado asesor, Alberto Paul Roach, manifestó que...`

---

## HISTORIAL DE VERSIONES

| Versión | Fecha | Cambios |
|---|---|---|
| v1.0 | 2026-04-11 | Estructura inicial basada en 3 actas procesadas |
