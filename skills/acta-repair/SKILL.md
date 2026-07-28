# acta-repair
### Revisión y reparación de actas de asamblea · Propiedad Horizontal Panamá

**Versión:** 1.0 · julio 2026
**Ámbito:** ForumPHs
**Se invoca cuando:** el Document Factory produjo un acta defectuosa, o un acta requiere auditoría antes de firma.
**No se invoca para:** generar actas en volumen. Eso es el Document Factory y siempre lo será. Este skill es el camino de reparación, no un DF de bolsillo.

---

## REGLA 0 — Nunca se entrega un acta sin su reporte ICR

Sin excepción. Tampoco cuando la reparación fue manual y salió bien.

Un acta reparada que circula sin ICR es un documento que **parece limpio y no lo está**. Es peor que el `BLOQUEADO` honesto del DF, porque el DF al menos avisa. Esta regla existe porque se violó: en la sesión que originó este skill se entregó un acta corregida sin reporte, y lo detectó el cliente, no el sistema.

Si la reparación no dejó hallazgos abiertos, el ICR igual se emite, con estado `APTO PARA FIRMA` y cero hallazgos. El reporte es el acto de haber revisado, no la lista de defectos.

---

## 1 · PROTOCOLO

### 1.1 · Investigar antes de opinar

Nunca diagnosticar sobre la representación del problema. Leer la fuente.

En la sesión de origen se cometió tres veces la misma falla: se atribuyó a fallo de generación lo que era de detección de formato; se afirmó que Talk era una plataforma distinta de Hypal sin verificarlo (es el mismo proveedor, otro formato de exportación); y se diseñó dos veces un pedido de datos hacia un tercero que no los posee.

Antes de emitir un diagnóstico:
- leer el código relevante, no suponerlo — proxy: `https://unrlvl-context.vercel.app/api/gh?action=file&repo={repo}&path={path}`
- consultar la DB, no inferir del documento
- verificar de quién es cada dato antes de proponer pedirlo

### 1.2 · Orden de trabajo

1. Leer las cuatro fuentes de la sesión
2. Extraer los resultados de votación (§4) — **antes** de leer el acta defectuosa, para no anclarse en sus cifras
3. Resolver identidades contra la DB (§3)
4. Correr los ocho gates (§5)
5. Reconstruir el acta (§6)
6. Emitir el ICR (§7)
7. Checklist de cierre (§8)

### 1.3 · Qué nunca se hace

- **No se inventa un dato registral.** Si la finca no consta, va `[DATO PENDIENTE]` y hallazgo CRÍTICO. Nunca se toma de un ejemplo ni de otro PH.
- **No se corrige por inferencia un dato verificable.** Una finca de 9 dígitos donde todas tienen 8 se marca, no se "arregla" quitando el dígito.
- **No se resuelve una identidad ambigua.** Si un nombre admite más de un titular en el padrón, se marca. *"Lorena puede ser varias personas."*
- **No se decide por el cliente.** Número de acta, finca, fecha de convocatoria y conflictos de titularidad son de Ivette. Se marcan, no se completan.

---

## 2 · MARCO LEGAL — Ley 284 de 14 de febrero de 2022

> **Este bloque es el texto canónico del rulebook.** El Document Factory debe implementar estas mismas reglas (PR-4 del runbook de fix). Si divergen, esta es la versión correcta.

### 2.1 · Las tres magnitudes — no confundirlas nunca

Es el error más caro y el más frecuente. Tres números distintos que se parecen:

| magnitud | qué es | para qué se usa |
|---|---|---|
| **Total de unidades** | todas las del inmueble | denominador de quórum de asamblea (art. 67) |
| **Unidades al día** | al día en cuotas de gastos comunes | **denominador de elección de Junta Directiva (art. 74)** |
| **Unidades presentes** | comparecieron o fueron representadas | capacidad de la sesión, no denominador de nada |

En el caso de origen: 312 totales, 255 al día, 221 presentes. El DF aplicó el umbral del art. 67 (157 = mitad+uno de 312) a una elección de Junta Directiva, cuando correspondía el del art. 74 (131 = 51 % de 255). **Y el auditor lo aceptó, porque su rulebook tampoco tenía el art. 74.**

**Toda votación debe declarar su base en el acta.** Sin base declarada, el resultado es ininterpretable.

### 2.2 · Artículos aplicables

| art. | materia | regla operativa |
|---|---|---|
| **62** | convocatoria | plazo de antelación; verificar contra la fecha del aviso original |
| **67** | quórum | primer llamado: más de la mitad de los propietarios. Segundo llamado: se sesiona con los presentes, **y el acta debe documentarlo expresamente**. Nunca inferir un segundo llamado que no conste |
| **68** | poderes | poder especial o general, hoja carta, firmado por el titular registral; entrega ≥ 24 h antes; si el propietario asiste, el poder queda sin efecto |
| **73** | composición de la JD | mínimo 3 miembros (Presidente, Secretario, Tesorero), **número impar**. La Asamblea puede fijar un número mayor impar. **La ley prevalece sobre el reglamento de copropiedad** — un reglamento que exija 7 no impide constituir 5 |
| **74** | elección y remoción de la JD | voto favorable del **51 % de las unidades al día**, con independencia del total del inmueble. Los miembros deben estar al día: un postulante moroso queda inhabilitado |
| **83** | mayorías | mayoría simple para acuerdos ordinarios |
| **90** | funciones del Vocal | representación legal en ausencia de los demás; presidir en su ausencia; convocar; suplir a dignatarios por designación del Presidente; voto válido en JD |

### 2.3 · Condonación de recargos y multas

No es facultad de la Junta Directiva. Es materia reservada a la Asamblea de Propietarios. Relevante cuando un postulante inhabilitado por mora pide que se le exonere.

---

## 3 · FUENTES Y CÓMO CRUZARLAS

### 3.1 · Jerarquía

| orden | fuente | autoridad |
|---|---|---|
| 1 | **DB FPHs** (`tajuoqdbnsnzkhyqvdgs`) | identidades, unidades, fincas, roles. **Manda siempre** |
| 2 | Capturas de la plataforma de votación | resultados oficiales |
| 3 | Lista de asistencia | quórum y representaciones |
| 4 | Resumen consolidado de la asamblea | narrativa, si existe |
| 5 | Transcripción | último recurso. **Diarización poco fiable** (§3.4) |

### 3.2 · Consultas

Edificio y datos registrales:
```sql
SELECT id, name, slug, address, city, total_units, registro_finca, registro_code
FROM public.buildings ORDER BY name;
```

Padrón con fincas — **es un join de tres tablas**, `owner_units` filtrado por activo:
```sql
SELECT u.unit_code, u.tower, u.unit_type, u.finca, o.full_name, o.cedula
FROM public.units u
LEFT JOIN public.owner_units ou ON ou.unit_id = u.id AND ou.is_active
LEFT JOIN public.owners  o  ON o.id = ou.owner_id
WHERE u.building_id = '{building_id}'
ORDER BY u.tower, u.unit_code;
```

Personal que **nunca** es propietario en actas:
```sql
SELECT name, aliases, role, is_active, notes FROM public.acta_admin_personnel;
```

> Una consulta SQL por llamada del MCP. Varias sentencias devuelven solo el último resultado.

### 3.3 · Trampas del padrón, verificadas

- `buildings.total_units` puede no coincidir con el conteo real de `units`. En Torres de Castilla: campo 305, filas 306, reales 312. **Contar filas, no leer el campo.**
- Faltan unidades comerciales. Los locales `L 01`–`L 06` no existen en `units`. Si el listado de la plataforma tiene más filas que el padrón, buscar locales antes de concluir error.
- `full_name` puede traer notas operativas embebidas: *"…LUIS ROBERTO ROSA carlos ruiz enviar todo a el"*. **Nunca copiar literal a un acta sin mirarlo.**
- Fincas con dígito de más. Todas las de un PH tienen la misma longitud y son casi contiguas. Una que rompe el patrón se marca, no se corrige.

### 3.4 · Reconciliación de hablantes

**La diarización de la transcripción no es confiable.** Casos reales del expediente de origen: la intervención de un propietario aparece alternada línea por línea entre dos personas distintas; una postulación queda atribuida al personal de plataforma; otra al apoderado equivocado.

Procedimiento: leer el contenido, no la etiqueta. Cruzar por nombre contra `owners` del edificio exigiendo **unicidad**. Si hay más de un candidato, no resolver: marcar.

Señal de alarma: un mismo interviniente con varias grafías es **una sola persona**. En el caso de origen, "Giovanni", "Giovanni Palavicini" y "Giovanni Palacios" eran Giovanni Palavaccini.

---

## 4 · RESULTADOS DE VOTACIÓN EN IMAGEN

Los resultados suelen llegar como capturas dentro de un `.docx`. Es el contenido principal del acta: **nunca se toman los porcentajes del audio de la transcripción.** En el caso de origen eso produjo 60,33 % donde el sistema decía 63,92 %.

```bash
unzip -o -q Resultados_de_las_votaciones.docx word/media/*
python3 -c "
from PIL import Image; import pytesseract
for i in range(1,7):
    im = Image.open(f'word/media/image{i}.png').convert('RGB')
    w,h = im.size
    c = im.crop((int(w*0.45), int(h*0.25), w, int(h*0.72)))
    c = c.resize((c.width*4, c.height*4), Image.LANCZOS)
    print('===', i); print(pytesseract.image_to_string(c, config='--psm 6'))
"
```

Trampas verificadas:
- **`lang='spa'` no está instalado.** Usar el default; los números salen bien.
- **Sin reescalado ×4 los porcentajes se leen mal.** Un caso salió `74.20 %` a ×2 y correcto (`74,90 %`) a ×7.
- **La validación es aritmética, no confianza en el OCR.** Calcular `votos / base` y contrastar con el porcentaje leído. Un dígito mal leído no cuadra y se cae solo. Si no cuadra, no se adivina: se marca.
- La captura suele traer la base en un badge (*"Tipo A · votos unidades al día / total unidades al día"*). **Leerlo:** es la base declarada.
- Verificar también: `sí + no + abstenciones + no votaron == base`.

---

## 5 · LOS OCHO GATES

Antes de dar por buena cualquier acta, propia o del DF. Son deterministas: aritmética y comparación contra DB.

| # | gate | severidad si falla |
|---|---|---|
| 1 | nombre del PH == `buildings.name` | CRÍTICO |
| 2 | finca == `buildings.registro_finca`; NULL en DB también falla | CRÍTICO |
| 3 | toda unidad citada existe en `units` para ese `building_id` | ALTO |
| 4 | todo nombre propio resuelve a `owners` o `acta_admin_personnel` | ALTO |
| 5 | toda votación declara su base y `votos/base` cuadra a ±0,01 con el % impreso | CRÍTICO |
| 6 | cero `[...]` sin resolver en el cuerpo | ALTO |
| 7 | títulos únicos, numeración monótona, cero secciones vacías | CRÍTICO |
| 8 | la última frase del cuerpo termina en punto | CRÍTICO |

Los gates 5, 7 y 8 son los más baratos y los que más atrapan.

---

## 6 · REGLAS DURAS DEL ACTA

### 6.1 · Quién aparece y quién no

- **Personal de la plataforma de votación: se omite por completo.** Operadores y soporte técnico no son relevantes al objeto del acta. No se nombran ni en comparecientes ni en el cuerpo.
- **Ivette Flores nunca es propietaria.** Es Gerente General de la administración. Su intervención se consigna como ejercicio de funciones administrativas.
- **El asesor legal externo sí se consigna** cuando su intervención es sustantiva (lectura de artículos, dictamen sobre procedimiento).
- **Los miembros de la Junta Directiva se consignan con nombre completo y unidad.**

### 6.2 · Anexo de asistencia

**Solo las unidades presentes o debidamente representadas. Las ausentes no aparecen.**

Es el estándar de los actas de referencia: *"de las 182 unidades… se encontraban presentes o debidamente representados 135 unidades inmobiliarias:"* seguido del listado de esas 135. El total de ausentes se menciona en la narrativa del quórum; el listado nominal es solo de participantes.

Columnas: unidad · finca individual · titular · forma de participación.

### 6.3 · Formato

- **Tercera persona siempre.** Nunca diálogo, nunca primera persona.
- **Números en letras seguidos de dígitos entre paréntesis:** *"ciento noventa y dos (192) votos"*, *"setenta y cinco coma veintinueve por ciento (75,29 %)"*.
- **Coma decimal**, no punto. Español internacional.
- **Consolidar intervenciones:** todas las líneas del mismo hablante en un solo bloque, sin resumir ni parafrasear.
- **Sin footer.** En cuanto se firma es un documento registral de formato definido. El crédito es la firma, no el generador.

### 6.4 · Hechos que suelen omitirse y son jurídicamente relevantes

- **Rectificaciones de cifras hechas en sesión.** Si la base de votación cambió durante la asamblea, el acta debe registrar el valor inicial, el final y el motivo. Es lo que sostiene la validez del umbral aplicado.
- **Inhabilitaciones de postulantes**, con su fundamento normativo.
- **Discrepancias de quórum entre fuentes**, como nota de conciliación, indicando si afectan o no la validez.

---

## 7 · EL REPORTE ICR

### 7.1 · Estructura

Encabezado con PH, número de acta, **estado**, fecha y nombre del documento auditado · nota de alcance · procedencia del documento · tabla de severidades · resumen del auditor · hallazgos · condición de levantamiento · pie declarando que no forma parte del acta oficial.

**El reporte ICR sí lleva pie**, porque ese pie es justamente la declaración de que no es parte del acta.

### 7.2 · Estados

| estado | cuándo |
|---|---|
| `APTO PARA FIRMA` | cero hallazgos CRÍTICOS o ALTOS |
| `APTO CON OBSERVACIONES` | solo MEDIOS y BAJOS |
| `BLOQUEADO` | algún CRÍTICO o ALTO abierto |

### 7.3 · Categorías de hallazgo

`Cumplimiento legal` · `Votos inconsistentes` · `Datos a verificar` · `Rol no verificado` · `Estructura` · `Calidad narrativa`

Cada hallazgo: **ubicación** exacta · **hallazgo** en prosa neutra · **recomendación** en cursiva.

### 7.4 · El resumen del auditor separa lo que no está en cuestión

Un `BLOQUEADO` hace dudar de la asamblea entera. Si el quórum es válido y los acuerdos también, **decirlo explícitamente**: *"la constitución de la Asamblea y la validez de las elecciones no se encuentran en cuestión; el bloqueo es de expediente y padrón."*

### 7.5 · Decisiones del operador

Si el acta se generó pese a advertencias previas, el ICR incorpora la sección **DECISIONES DEL OPERADOR**: qué se advirtió, qué se eligió, cuándo, y que el documento resultante es borrador de reparación.

El hallazgo se redacta neutro (*"falta la finca del inmueble"*). **La decisión de proceder es un hallazgo aparte**, porque se tomó fuera de las reglas HRD. Ninguna decisión queda invisible.

---

## 8 · CHECKLIST DE CIERRE

Antes de entregar nada:

- [ ] ¿Se emitió el reporte ICR? — **Regla 0**
- [ ] ¿Los ocho gates corrieron?
- [ ] ¿Las cifras de votación salieron del sistema, no del audio?
- [ ] ¿Cada votación declara su base, y cuadra?
- [ ] ¿Toda identidad se resolvió contra la DB, o quedó marcada?
- [ ] ¿El anexo lista **solo** presentes y representados?
- [ ] ¿Cero `[...]` sin resolver en el cuerpo?
- [ ] ¿Sin footer?
- [ ] ¿Personal de plataforma omitido?
- [ ] ¿Los datos que corresponden a Ivette quedaron marcados, no completados?
- [ ] ¿Se registraron los aprendizajes en `professor_learnings`?

---

## 9 · DEPENDENCIAS

| recurso | uso |
|---|---|
| MCP `Supabase ForumPHs` | padrón, identidades, fincas, personal |
| MCP `unrlvl-supabase-mcp` | `professor_learnings`, configuración del DF |
| Proxy gh `unrlvl-context.vercel.app/api/gh` | lectura del código del DF |
| `pytesseract` + `PIL` | OCR de resultados de votación |
| Skill `docx` | generación de acta y reporte |

**Actas de referencia:** los dos ejemplos canónicos del proyecto ForumPHs definen estructura, tono y formato. Consultarlos antes de reconstruir.

---

_ForumPHs · acta-repair v1.0_
