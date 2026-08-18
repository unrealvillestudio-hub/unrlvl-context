# SKILL — voice-conversion (Perfil Secundario · Voz de Conversión)

**Versión:** v1.0 · **Creado:** 2026-07-18 · **Rama:** IID / Voice
**Naturaleza:** PERFIL SECUNDARIO DELGADO. Lleva **solo** lo que distingue a una voz de conversión: su parametrización y sus técnicas propias. Todo lo común vive en `voice-craft`.
**Disparadores:** calibrar o generar una voz de CONVERSIÓN — la que VENDE al decisor. Casos vivos: `nscf_conversion`, `d7herbal_conversion`, `fphs_conversion`, y toda voz de marca de producto/servicio cuyo objetivo declarado sea comercial.

---

## ⚠️ CARGA OBLIGATORIA — `voice-craft`

**Este skill NO se usa solo.** Antes de calibrar o generar, cargar `skills/voice-craft/SKILL.md` (capa primaria). Allí viven, y **aquí NO se repiten**:

- los 9 modos transversales (filo al patrón · motor antes que dimensiones · demuestra-nunca-declares · economía · fortaleza-como-bandera · voz constante/técnica variable · anticipar el fallo · bilingüe re-anclado · nunca inventar);
- el arsenal OPERADO y el QA contra objetivo;
- **declarar el artefacto de destino antes de generar** (canal + formato + extensión);
- **el ejemplo es mecanismo, nunca molde**;
- las capas del pipeline (13 psycho_presets / 4 familias, AIFE, Watcher 8 gates, `objective_by_platform`);
- el reparto genoma↔angle;
- el triage error-de-técnica vs error-de-intención.

El MÉTODO del bucle sigue siendo `genome-calibration` (el Tratado). Este perfil no lo toca.

---

## 1. PARAMETRIZACIÓN DE LA VOZ DE CONVERSIÓN

Los cinco parámetros que la distinguen de las voces hermanas:

| Parámetro | Valor en conversión | Por qué |
|---|---|---|
| **Filo** | **5/10 — instrumental** | Corta para MOVER, no para herir. Cada corte tiene función comercial: reacción → conversión → decisión → venta → recompra. Impactante sin ser burdo ni corriente. (Contraste: editorial 9/10 divide por diseño; conversión convierte por diseño.) |
| **Audiencia perdida** | **Se MINIMIZA — la función es acoger** | Perder lectores es daño, no filtro. Lo opuesto exacto de la voz editorial, donde "el que se ofende y se va nunca fue el mercado". En conversión, el que se va era mercado. |
| **Cierre** | **CTA / marca / diagnóstico** | Lo último que lee es lo que queda. La ley del cierre: el giro hacia el lector va en el CUERPO; el cierre se reserva para la marca o el CTA. Marca repetida ≥2 veces en la pieza. El CTA puede ser servicio, no solo producto. |
| **Familia PSY** | **CONVERSION** — `PSY-URGENCY` · `PSY-SCARCITY` · `PSY-FOMO` · `PSY-SOCIAL-PROOF` | Declararla **manualmente** al abrir el bucle: `calibrate.ts` no lee `psycho_presets` (deuda §10.1 de voice-craft) y sin declararla cae al default AUTHORITY → sale tibio. **Cuidado:** los estímulos de urgencia/escasez no deben romper la calidez — la voz acoge mientras empuja. |
| **Blanco** | **EL PATRÓN**, jamás la persona | El consejo genérico y conveniente (NSCF) · la exageración del mercado (D7H) · el administrador reactivo que nunca midió (FPHs). Nunca la clienta, nunca el gremio, nunca un individuo. |

**Motor típico:** autoridad-por-contraste + ciencia/dato. La voz nace de hacer lo que los demás no hacen, y lo demuestra con el dato preciso.

**Frontera con la voz Educativa (crítica — confundirlas colapsa ambas):** Conversión **VENDE al decisor**; Educativa **ENSEÑA al doliente** (el que vive o usa el problema, que no siempre es quien decide). Si el blanco de la Educativa se confunde con el de la Conversión, las dos voces se funden en una sola tibia.

**Nota de arquitectura:** una MARCA lleva Conversión (además de Educativa y Editorial) pero NO Profesional — se disuelve. El desdoblamiento Profesional existe en una PERSONA. Detalle en `r4b-genome-calibration` §1.

---

## 2. TÉCNICAS PROPIAS — APERTURA Y ARRASTRE

Arsenal específico de conversión. Destilado del bucle NSCF (10 piezas) y validado en D7H y FPHs. Se ejecuta con el oficio de `voice-craft` §2 — nunca se nombra dentro del texto.

### 2.1 · Escena, no pregunta (regla de oro)
**Nunca preguntar lo que puede responderse en contra.** "¿Te acuerdas de cómo se sentía tu cabello?" → "no, nunca me pasó", y la perdiste. La apertura es una ESCENA que el lector reconoce, no una pregunta que puede fallar.

### 2.2 · Desplazamiento de protagonista
Abrir con un **tercero** (lo que las clientas le dicen a Patricia; el propietario que paga al día), dejar que el lector se reconozca **solo**, y recién entonces girar la cámara hacia él. Reconocerse por decisión propia no duele; ser señalado, sí.

### 2.3 · Punto de no retorno
En el instante del giro, pasar a **tuteo directo** ("te digo algo… y te digo más…") y no soltar hasta el cierre. El tuteo fuerza la identificación; soltarlo a mitad devuelve al lector a espectador.

### 2.4 · Presunción de compañía
No "si a ti también te suena" (abre la duda, invita al no). Sí: "supongo que a ti, igual que a cientos de mujeres en Florida…". Cierra el sí/no por **volumen social**, no por pregunta.

### 2.5 · Falso binario con remate reflexivo inmediato
Si se abre con "hay dos tipos de…", **rematar con la pregunta-espejo** ("¿cuál de las dos eres tú?") que no espera respuesta. Un falso binario sin remate es un error de TÉCNICA (se repara en el acto, el bucle sigue — ver triage en `voice-craft` §7).

### 2.6 · Estructura mínima de tres partes
Plantear el punto de análisis → meter al lector dentro sin que lo espere → conclusión/cierre en la marca o el CTA. Es un mínimo, no un molde: hay muchas más. Repetirla en toda pieza es exactamente el colapso en fórmula que `voice-craft` §1.6 prohíbe.

### 2.7 · Debe VENDER — el test explícito
Tres condiciones que una pieza de conversión no puede fallar:
1. **CTA obligatorio.**
2. **Marca nombrada ≥2 veces**, y el cierre reservado para ella.
3. **Decir por qué elegirnos — con RESULTADO, no con adjetivo.** ("No me has dicho por qué deberías ser tú el elegido" — FPHs.)

### 2.8 · Promesa → testimonio de tercero
La marca no promete "resultados en 15 días"; una usuaria que lo dice, sí. El testimonio afirma lo que la marca no puede afirmar. Es la implementación de "demuestra, nunca declares" en el terreno donde más tienta declarar.

### 2.9 · Reencuadre patrimonial (B2B / decisor institucional)
Convertir un problema bilateral en uno de **equidad colectiva**: "la morosidad no es un problema de cobros — es un riesgo patrimonial que los propietarios al día están financiando involuntariamente." Lenguaje patrimonial, **nunca punitivo**: "su unidad tiene un saldo pendiente que afecta su participación en servicios comunes" reencuadra; no amenaza.

Acompaña: **cuantificar lo que otros dejan vago** ("110% de mora crítica — ningún administrador previo lo midió así") convierte cifra abstracta en decisión urgente.

---

## 3. PROHIBICIONES ESPECÍFICAS DE CONVERSIÓN

Además de las transversales de `voice-craft` §1.3:

- **Nunca ABSOLVER la falla que se critica.** "Tu colorista hizo su parte" está prohibido: absolver comete la misma falta que se señala.
- **Nunca personalizar el adversario** en un individuo ni declarar guerra a un gremio. El estilista es redimible — el B2B le vende justamente cómo dejar de dar consejo genérico.
- **Nunca insultar el gasto del lector.** "El producto que compraste en el súper" lo insulta y lo pierde. El target INVIERTE; el adversario no es el gasto bajo, es el consejo genérico que recibe **incluso gastando bien**.
- **Nunca meter restricciones de contrato en el copy.** El alcance de servicio ("FPHs prepara y acompaña; la JD decide") es verdad y es necesario — pero vive en FAQ y contrato. En una pieza de conversión no convierte: resta.
- **Nunca aclarar lo no preguntado.** "Los resultados pueden variar" instala la duda que no existía.
- **Nunca la honestidad como bandera.** La bandera es la fortaleza real: ingredientes y propiedades, diagnóstico preciso, resultado medible.

---

## 4. CHECKLIST DE CALIBRACIÓN — VOZ DE CONVERSIÓN

1. `voice-craft` cargado. Método del bucle = `genome-calibration`.
2. **Artefacto declarado** (canal + formato + extensión). Sin esto no se genera.
3. **Familia PSY = CONVERSION declarada manualmente** (y verificar que la urgencia no rompa la calidez).
4. **Blanco definido como fenómeno**, escrito explícitamente antes del turno 1.
5. **Conocimiento real cargado** (blueprints/servicios) — en conversión la alucinación de producto es la más cara: es afirmación comercial falsa.
6. Cada turno: **técnica distinta**, registrada para no reincidir.
7. Cada turno: **QA contra objetivo comercial** antes de proponer (¿vende? ¿tiene CTA? ¿marca ≥2? ¿el cierre es de la marca?).
8. Ante un NO: **triage** técnica vs intención (`voice-craft` §7). Un "SÍ pero" abre intención, no falla convergencia.
9. Convergencia: ≥10 textos + últimos 3 SÍ consecutivos (el umbral SUGIERE; el operador cierra cuando está satisfecho — E5c).
10. Destilación a `brand_voice_genome` en el chat bajo HRD, nunca en la UI.

---

## 5. EJEMPLARES DE REFERENCIA

Cuatro voces de conversión ya calibradas. **Se leen como MECANISMO, nunca como molde** (`voice-craft` §4) — copiar sus formas produciría cuatro marcas que suenan igual, que es exactamente lo que el ecosistema prohíbe: marcas que comparten casa, persona o categoría **nunca** funden su voz.

| Voz | Bandera | Blanco (fenómeno) | Rasgo propio |
|---|---|---|---|
| `nscf_conversion` v0.5 | diagnóstico preciso + ciencia Neurone | el asesoramiento genérico y conveniente | Patricia percibida, jamás declarada; lectora protagonista |
| `d7herbal_conversion` v1.0 | ingredientes reales + propiedades | la exageración del mercado | honestidad **en la estructura** (testimonio/días/ingrediente real), no en disclaimer; contención como autoridad |
| `fphs_conversion` v1.0 | resultado medible del sistema | el administrador reactivo que nunca midió | reencuadre patrimonial; frontera dura: la JD decide, FPHs prepara |
| `po_consumer` v0.6 | ⚠️ **en revisión** (#72) | — | declara autoridad ("+35 años") → viola la regla dura. No usar como ejemplar hasta corregir. |

_Fin · voice-conversion v1.0 · perfil secundario · invoca voice-craft · Unrealville IID_
