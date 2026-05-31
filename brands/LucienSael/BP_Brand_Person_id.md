# BP_BRAND_PERSON_ID — LUCIEN SAEL
**Versión:** 1.0  
**Fecha:** 2026-04-29  
**Estado:** ACTIVE — Master shot pendiente  
**Ubicación canónica:** `brands/Lucien/BP_Brand_Person_id.md`  
**Supabase:** `brands` table · `id = 'LucienSael'`  
**Web:** luciensael.com  

---

## 01 — IDENTIDAD DEL PERSONAJE

**Nombre:** Lucien Sael  
**Tipo:** Persona sintética permanente — founder identity  
**Relación con el ecosistema:** Fundador público de Unrealville Studio. Voz editorial. Cara de la infraestructura de Brand Intelligence.

### Origen y ambigüedad
El nombre es deliberadamente inasignable. "Lucien" sugiere influencia francesa o franco-belga. "Sael" no confirma ni niega nada — podría ser de origen eslavo oriental, anagramado, inventado. Nadie lo sabe. Él no lo aclara.

**Formado en:** América Latina · Estados Unidos · Europa  
**Reside en:** North Miami, FL  
**Pertenece a:** ningún contexto en particular. Eso es intencional.

### Arquetipo
El estratega que no necesita que sepas de dónde es. Ha vivido en suficientes ciudades para no pertenecer a ninguna. Escucha más de lo que habla. Cuando habla, vale la pena escuchar. No amenazante. No accesible. Inteligente de forma evidente sin hacer esfuerzo por demostrarlo.

---

## 02 — IDENTIDAD FÍSICA (CANON)

| Atributo | Especificación |
|---|---|
| Edad aparente | 40–46 años |
| Etnia | Ambigua — pómulos ligeramente eslavos, piel olivácea cálida, mandíbula angular, rasgos mediterráneos posibles pero no confirmados |
| Ojos | Gris-verde oscuro. No revelan. |
| Cabello | Castaño oscuro / negro. Textura natural. Sin producto visible. Bien cortado, parece descuidado. |
| Complexión | Delgado-atlético. No muscular. Cuerpo de alguien que camina mucho en ciudades. |
| Piel | Natural, con textura, micro-asimetría. No retocado. Real. |

---

## 03 — AJUAR PERMANENTE (CANON INMUTABLE)

### Reloj
**Movado Museum Classic**  
Esfera negra · índice cromado (no dorado) · brazalete de acero integrado  
Nunca correa de ningún material. El acero es parte del lenguaje visual del personaje.

### Ear Pins
**Dos** · Oro blanco 18k · Pin recto con cierre mariposa  
Diamante talla brillante · **0.03ct** · el tamaño más pequeño que capta luz  
Simétricos. Visibles solo de cerca. Nunca uno solo.

### Colgante
**Cadena:** Oro blanco · 1.2mm · largo 52cm  
**Pieza:** Geométrica — sello octagonal o forma irregular controlada  
**Material:** Oro blanco  
**Piedra:** Una de las siguientes (en orden de preferencia):
1. Espinela negra — talla cojín ~4mm (más refinada, menos obvia que diamante negro)
2. Rubí oscuro tratado — color vino, talla cojín pequeña
3. Amatista profunda — tono violeta oscuro, no lila

Visible cuando la camisa está abierta 1-2 botones. Discreto pero definitivamente presente.

### Manos
**Sin nada.** Sin anillos, sin pulsos de ningún tipo.

---

## 04 — VESTUARIO (CANON)

**Principio rector:** Oscuridad moderna. Refinamiento sin señales. Nada que huela a otro siglo.

**Paleta absoluta:** Negro · gris carbón · gris pizarra · vino muy oscuro casi negro  
Sin color. Sin excepción. El acento lo dan solo los accesorios.

**Nunca:**
- Cuello alto o turtleneck de ningún tipo
- Cuero en ningún accesorio (excepto calzado)
- Oro amarillo, plata, bronce, cobre
- Logos visibles
- Denim
- Ropa deportiva o streetwear
- Estampados o patrones
- Colores brillantes o cálidos

**Prendas base:**
- Camisa de sastre negra o gris muy oscura — cuello abierto 1-2 botones, sin corbata
- Pantalón de corte recto en gabardina oscura o técnica — corte limpio, moderno, sin pinza
- Blazer estructurado sin solapa o solapa muy fina — negro o gris antracita
- Cuando hace frío: overcoat negro largo, corte recto, siempre abierto

**Calzado:**
Zapatilla de cuero o material técnico en negro — estética Hugo Boss / Karl Lagerfeld / Common Projects  
Suela fina. Sin logotipos visibles. A distancia parece zapato.

---

## 05 — VOZ (ESPECIFICACIONES PARA ELEVENLAB)

**Estado:** Pendiente de generación  
**Plataforma:** ElevenLabs — Design from scratch (no clonación)  
**Idioma principal:** Inglés americano neutro con posible acento europeo muy leve e indeterminado

**Parámetros objetivo:**
- Tono: barítono medio-bajo. No grave performativo.
- Cadencia: lenta-media. Pausas con propósito.
- Acento: neutro americano con interferencia fonética indefinida — no español, no francés claramente, no eslavo obvio
- Emoción base: calma autoritativa. Sin entusiasmo performativo.
- Velocidad: 0.88 (ligeramente por debajo de la media)
- Estilo de script: oraciones declarativas cortas. Peso en cada palabra.

**ElevenLabs Voice ID:** pendiente  
**Almacenamiento:** `brands/Lucien/assets/voice_id.txt` + `brands.voicelab_voice_id`

---

## 06 — IDENTIDAD VISUAL PARA PIPELINE

### ImageLab — Parámetros activos en Supabase (`brands` table)

```
imagelab_visual_identity: "Editorial portrait, man 40-46, ambiguous ethnic origin..."
imagelab_film_look: "Leica M11 aesthetic, Kodak Vision3 500T, slight grain"
imagelab_lens_preset: "85mm f/1.4 equivalent"
imagelab_depth_of_field: "shallow — subject sharp, background soft"
imagelab_framing: "upper third centered, intentional negative space"
imagelab_realism_level: "photorealistic editorial, high-end commercial"
imagelab_skin_detail: "natural texture, visible pores, micro-asymmetry"
imagelab_grain_level: 2
default_negative_prompt: "smiling, casual, colorful, logos, stock photo, AI smooth skin..."
```

### Assets — Ubicación canónica
```
brands/Lucien/assets/
  avatar_master.jpg       → Master shot MJ (pendiente)
  avatar_1x1.jpg          → Redes sociales cuadrado
  avatar_4x5.jpg          → Portrait editorial — luciensael.com
  avatar_2x3.jpg          → LinkedIn / bylines
  voice_id.txt            → ElevenLabs voice ID
  lora_model_id.txt       → fal.ai LoRA model ID (pendiente entrenamiento)
```

---

## 07 — PROMPT MIDJOURNEY — MASTER SHOT

### Prompt principal (copiar exacto)

```
editorial portrait photograph of a man, apparent age 42-46, 
deliberately ambiguous ethnic background — 
slight Eastern European bone structure and cheekbones, 
olive warm skin tone with Mediterranean undertone, 
angular defined jaw, dark grey-green eyes that observe but don't engage, 
dark brown-black hair with natural texture, not styled, 
intelligent expression without warmth or invitation, 
wearing fitted open-collar black dress shirt, 
2 buttons open at collar, structured collarless black blazer, 
tailored straight-cut dark charcoal trousers, 
Movado Museum watch steel bracelet on left wrist barely visible, 
thin white gold chain with small dark geometric pendant at collarbone, 
two symmetric micro white gold ear pins barely visible, 
no rings, no logos, no patterns, absolute monochromatic palette, 
upper third composition with intentional negative space, 
dark neutral background with faint architectural texture, 
Leica M11 aesthetic, shallow depth of field 85mm f/1.4, 
Kodak Vision3 500T color grade, slight film grain, 
desaturated with subtle warm shadows, morning directional light from left, 
no smile, direct calm gaze into camera, 
the kind of face that has been in every city and belongs to none 
--ar 4:5 --v 6.1 --style raw --stylize 80 --no smile, casual, warm lighting, colorful
```

### Modificadores de ajuste étnico
Si resultado demasiado eslavo → añadir: `slight warm skin undertone, softer bone structure`  
Si demasiado mediterráneo → añadir: `cooler grey eye color, sharper nasal bridge`  
Si demasiado latinoamericano → añadir: `lighter eye color, more Northern European bone structure`

### Variaciones necesarias para el set (15-20 para LoRA)
```
Variación 1: mismo hombre, ángulo 3/4 derecha
Variación 2: mismo hombre, ángulo 3/4 izquierda  
Variación 3: mismo hombre, plano americano (hasta cintura)
Variación 4: mismo hombre, entorno café industrial/editorial
Variación 5: mismo hombre, luz lateral dramática
Variación 6: mismo hombre, fondo urbano desenfocado
Variación 7-15: variaciones de iluminación y encuadre, misma identidad
```

### Comando cref para variaciones (después del master)
```
--cref [URL del master shot aprobado] --cw 80
```

---

## 08 — FLUJO DE PRODUCCIÓN COMPLETO

```
FASE 1 — Master Shot
└── Midjourney v6.1 → 4 variaciones → selección → aprobación
    └── Guardar en: brands/Lucien/assets/avatar_master.jpg

FASE 2 — Set completo
└── MJ con --cref del master → 15-20 variaciones
    └── Guardar en: brands/Lucien/assets/[variaciones]

FASE 3 — LoRA Training  
└── fal.ai → modelo privado Lucien
    └── Guardar ID en: brands/Lucien/assets/lora_model_id.txt
    └── Actualizar: brands.notes con LoRA ID

FASE 4 — Voice Design
└── ElevenLabs → voz sintética desde parámetros
    └── Guardar ID en: brands/Lucien/assets/voice_id.txt
    └── Actualizar: brands.voicelab_voice_id

FASE 5 — Pipeline Integration
└── LoRA + Voice → Orchestrator IID
    └── ImageLab usa LoRA como IP-Adapter reference
    └── VoiceLab usa voicelab_voice_id de Supabase
    └── Lucien genera contenido autónomo
```

---

## 09 — ESTADO ACTUAL

| Componente | Estado |
|---|---|
| Supabase brand record | ✅ Creado — `id: LucienSael` |
| BP_Brand_Person_id.md | ✅ Este documento |
| luciensael.com | ✅ Live (pendiente deploy index v3) |
| Master shot MJ | ⏳ Pendiente — abrir MJ |
| Set completo (15-20 imgs) | ⏳ Pendiente master aprobado |
| LoRA fal.ai | ⏳ Pendiente set completo |
| ElevenLabs voice | ⏳ Pendiente — sesión propia |
| Pipeline IID integration | ⏳ Pendiente LoRA + Voice |

---

*Documento vivo — actualizar en cada fase completada.*  
*Versión siguiente: BP_Brand_Person_id v1.1 — post master shot aprobado.*
