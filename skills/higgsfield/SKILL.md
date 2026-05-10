# SKILL — higgsfield v1.0
_Unrealville Studio · Higgsfield MCP · Imagen + Video + Soul Characters_
_Versión: 1.0 · 2026-05-10_

---

## INSTRUCCIÓN DE CARGA

Cargar cuando Sam indica generación visual vía MCP:
- "genera imagen de [producto/persona]"
- "crea video de [concepto]"
- "ad creative para [campaña]"
- "UGC de PO con Soul"
- cualquier generación de asset visual que no requiera Python/ImageLab local

---

## QUÉ ES

Higgsfield MCP (lanzado 2026-04-30) es un servidor MCP hosted que expone 30+ modelos de imagen y video como tools de agente. Una sola conexión reemplaza acceder a Sora, Veo, Kling, Flux, etc. por separado.

**URL:** `https://mcp.higgsfield.ai/mcp`
**Auth:** OAuth con cuenta Higgsfield (sin API keys)
**Créditos:** usa los créditos del plan Higgsfield existente

---

## MODELOS DISPONIBLES

### Video
| Modelo | Mejor para |
|--------|-----------|
| Seedance 2.0 | Video con sync de audio · Marketing general |
| Sora 2 | Narrativa cinematográfica |
| Veo 3.1 | Calidad editorial · editorial/fashion |
| Kling 3.0 | Acción y movimiento · 4K |
| WAN 2.6 | Movimiento fluido |
| Minimax Hailuo 02 | Velocidad + calidad |

### Imagen
| Modelo | Mejor para |
|--------|-----------|
| Soul 2.0 | Fotorrealismo de personas · consistencia de personaje |
| GPT Image 2 | Texto en imagen · 4K |
| Flux 2 | Estilo artístico |
| Nano Banana Pro | Texto sobre producto · packaging |
| Seedream 5.0 Lite | Velocidad + calidad general |

---

## HERRAMIENTAS PRINCIPALES

| Tool | Qué hace |
|------|---------|
| `generate_image` | Imagen desde prompt. Args: prompt, model, aspect_ratio, reference_image (opcional) |
| `generate_video` | Video desde imagen o texto. Args: prompt, image_url, model, motion_preset |
| `create_character` | Entrena Soul Character desde 1-5 fotos reales → character_id reutilizable |
| `marketing_studio` | Presets: UGC, unboxing, TV spot, hyper motion, product review |
| `wait_for_job` | Polling de job async (video: 3-5 min) |
| `list_history` | Ver generaciones pasadas — reutilizar como punto de partida |

---

## SOUL CHARACTER — CASO DE USO PO

Soul es el sistema de consistencia de personaje. Para Patricia Osorio:

```
1. create_character(images=[foto1, foto2, foto3, foto4, foto5])
   → devuelve character_id: "po-soul-001"

2. generate_image(
     prompt="Patricia Osorio, colorimetrist, Vizos Salon Miami, warm smile, professional",
     character_id="po-soul-001",
     model="soul-2.0"
   )
   → imagen consistente con el rostro real de PO

3. generate_video(
     image_url=[output anterior],
     prompt="Patricia explaining hair treatment, speaking directly to camera",
     model="seedance-2.0"
   )
   → UGC-style video con PO
```

**Esto reemplaza el workflow LoRA para contenido de redes — más rápido, sin entrenamiento.**
El pipeline LoRA (ImageLab) sigue siendo relevante para fine-tuning más profundo.

---

## MARKETING STUDIO PRESETS

| Preset | Cuándo usar |
|--------|------------|
| UGC | Testimonial / unboxing estilo user-generated · NeuroneSCF |
| Product Review | Reseña de producto con persona · NeuroneSCF |
| TV Spot | Ad corto 15s estilo broadcast |
| Hyper Motion | Transición dinámica · efectos · TikTok hooks |
| Unboxing | Apertura de producto · e-commerce |

---

## WORKFLOW DE CREACIÓN DE AD CREATIVE

```
1. Sam describe el objetivo del ad (hook, producto, audiencia)
2. Claude determina preset + modelo óptimo
3. generate_image → asset base
4. generate_video (si aplica) → creative final
5. Sam aprueba → ads-mcp sube a campaña
```

---

## RELACIÓN CON IMAGELAB Y VIDEOLAB

| Herramienta | Cuándo usar |
|-------------|------------|
| Higgsfield MCP | Generación rápida de creatives · UGC · ads · contenido orgánico |
| ImageLab (UNRLVL) | Procesamiento local · composite · background removal · LoRA prep batch |
| VideoLab (UNRLVL) | Integración con HeyGen/Kling directo + voz clonada ElevenLabs |

Higgsfield es el path más rápido para la mayoría de los casos de uso de marketing.

---

## COSTOS Y CRÉDITOS

El agente puede consultar el balance de créditos antes de un job costoso. Regla práctica:
- Imágenes: pocos créditos (segundos)
- Videos 4K Veo/Sora: significativamente más costosos (minutos + créditos)
- Preguntar antes de génerar videos en modelos premium

---

_SKILL higgsfield v1.0 · Unrealville Studio · Image + Video MCP · Soul Characters · Marketing Studio_
