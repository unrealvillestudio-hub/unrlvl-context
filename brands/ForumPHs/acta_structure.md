# Estructura Documental — Actas de Asamblea
**Versión:** v1.1 | **Fecha:** 2026-04-11 | **Repo:** unrlvl-context/brands/ForumPHs/

---

## MAPA DE BLOQUES

### BLOQUES FIJOS
```
F-1: ENCABEZADO + INTRO + CONVOCATORIA       ← fuente: administración
F-2: APERTURA (Presidencia + Quórum)          ← fuente: transcripción + Hypal datos
F-3: LISTA DE ASISTENTES                      ← fuente: Lista_de_Asistencia.xlsx
[BLOQUES VARIABLES]
F-4: CIERRE + FIRMAS                          ← fuente: transcripción
```

### BLOQUES VARIABLES (uno por punto del orden del día)
```
V-QUORUM        → Validación del quórum
V-ORDEN-DIA     → Aprobación del orden del día + debate
V-INFORME       → Informe de gestión JD  ← REQUIERE DOCUMENTO JD (no verbal)
V-CIERRE-FISCAL → Cierre fiscal          ← CONCISO: cifras clave, máx 600 palabras
V-PRESUPUESTO   → Presupuesto + cuota   ← LARGO: debate completo
V-LOBBY/OBRAS   → Elección materiales   ← MODERADO
V-VARIOS        → Derecho de palabra
```

---

## CATÁLOGO DE FUENTES POR BLOQUE

| Bloque | Transcripción | Doc Admin | Hypal XLSX | Ivette provee |
|---|---|---|---|---|
| F-1 Encabezado | ❌ | ✅ Convocatoria | ❌ | Finca + Código |
| F-2 Apertura | ✅ Quórum verbal | ❌ | ✅ Números quórum | — |
| F-3 Lista Asistentes | ❌ | ❌ | ✅ Lista_de_Asistencia.xlsx | Confirmar total (249 vs 243) |
| V-Orden Día | ✅ selectivo | ❌ | ✅ Resultados votación | Captura pantalla |
| V-Informe Gestión | ❌ | ✅ DOC JD obligatorio | ❌ | Documento + capturas |
| V-Cierre Fiscal | ✅ cifras clave only | ✅ EEFF | ❌ | — |
| V-Presupuesto | ✅ debate completo | ✅ Presupuesto | ✅ Votaciones | Capturas pantalla |
| V-Lobby/Obras | ✅ debate | ❌ | ✅ Votaciones Torre A/B | Capturas + fotos materiales |
| V-Varios | ✅ | ❌ | ❌ | — |
| F-4 Cierre+Firmas | ✅ | ❌ | ❌ | — |

---

## WORD COUNT TARGETS POR BLOQUE

| Bloque | Target palabras | Máximo | Mínimo |
|---|---|---|---|
| F-1 Encabezado + Convocatoria | ~600 | 800 | 400 |
| F-2 + F-3 Apertura + Lista | ~1,200 | 1,500 | 900 |
| V-Orden Día | ~1,837 | 2,200 | 1,500 |
| V-Informe Gestión | ~1,058 | 1,300 | 800 |
| V-Cierre Fiscal | ~498 | **600** | 350 |
| V-Presupuesto | ~7,811 | 9,000 | 6,500 |
| V-Lobby | ~4,709 | 5,500 | 4,000 |
| F-4 Cierre + Firmas | ~150 | 200 | 100 |
| **TOTAL** | **~18,148** | **21,000** | **15,000** |

**Alerta automática:** Si el word count total supera 21,000 palabras al generar, revisar las secciones de debate antes de continuar.

---

## ENRICHMENT LAYER — REGLAS DE APLICACIÓN

### Secciones que SIEMPRE usan enrichment
- V-Orden Día (si tiene debate largo)
- V-Presupuesto
- V-Lobby/Obras
- V-Varios

### Secciones que NO usan enrichment
- F-1 Encabezado (estructura legal fija)
- F-2 Apertura (datos de quórum, párrafos cortos)
- V-Cierre Fiscal (narrativa concisa de cifras)
- F-4 Cierre + Firmas

### Reglas del enrichment layer

**1. Separación visual por hablante**
Cada intervención de propietario tiene `spacing.before = 200` en el docx.
Esto crea el espacio visual que hace legible el debate.

**2. Respuestas del Presidente indentadas**
`indent.left = 360` para las respuestas directas a una intervención.
Crea jerarquía visual pregunta → respuesta.

**3. Máximo de palabras por párrafo**
- Propietario: 150 palabras máx
- Presidente: 200 palabras máx
- Ivette: 120 palabras máx
- Si supera → dividir en punto temático natural, no en medio de una idea

**4. Bullets para listas de proyectos/cifras**
Cuando se enumeran proyectos, mejoras o cifras financieras → usar bullet list, no párrafo continuo.

**Ejemplo de estructura enriquecida:**

```
[Párrafo narrativo intro de la sección]
→ normal, sin separación especial

[Propietario A — spacing before 200]
La propietaria del apartamento TB-08D, señora Reyna Isabel Rentería, manifestó
que considera necesario tomar medidas para reducir la morosidad. Señaló que al
comparar con otros PH del sector, la cuota actual es inferior al promedio...

[Presidente — indent left 360, sin spacing before extra]
El Presidente, señor Alex Piña (TA-15E), indicó que el plan de mitigación
consiste en aplicar las medidas que permite la Ley 284...

[Propietario B — spacing before 200]
El propietario del apartamento TA-06A, señor Raltom Villar, expresó su acuerdo
con el aumento...
```

---

## BLOQUE V-CIERRE FISCAL — REGLA ESPECIAL

**Este es el bloque más frecuentemente sobredimensionado (831% en V2).**

El cierre fiscal en el acta de Ivette es una **narrativa concisa** de ~500 palabras con:
1. Deuda inicial recibida vs deuda actual (2 oraciones)
2. Proyectos ejecutados que generaron el déficit (3-5 bullets)
3. Fondo de imprevistos: monto actual (1 párrafo)
4. Activos reales: desglose de la cuenta (1 párrafo)
5. Morosidad: porcentajes y procesos en curso (1 párrafo corto)

**Lo que NO va en el cierre fiscal:**
- El discurso completo de Alex Piña explicando cada número
- Los comentarios del chat sobre el tema financiero
- Las preguntas de propietarios sobre el presupuesto (esas van en V-PRESUPUESTO)
- Las aclaraciones de Ivette sobre procesos legales de cobro

**Regla práctica:** Si al redactar el cierre fiscal superas 3 párrafos, estás incluyendo contenido que corresponde a otro bloque.

---

## SEÑALES DE TRANSICIÓN EN TRANSCRIPCIÓN

| Frase | Bloque que termina | Bloque que inicia |
|---|---|---|
| "Daniel, lanzamos a votación" | Debate | Votación |
| "cerramos votación / resultados" | Votación | Resultado + ✅ |
| "vamos al siguiente punto" / "pasamos al punto X" | Bloque anterior | Siguiente |
| "queda cerrada la primera Asamblea" | Último punto | F-4 Cierre |
| Hipal: "siendo las [hora]" al final | — | F-4 |

---

## HISTORIAL

| Versión | Fecha | Cambios |
|---|---|---|
| v1.1 | 2026-04-11 | Word count targets por bloque. Enrichment layer rules. Regla especial Cierre Fiscal. Tabla fuentes actualizada. |
| v1.0 | 2026-04-11 | Estructura inicial basada en 3 actas procesadas. |
