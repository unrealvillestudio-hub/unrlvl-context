# SKILL — image-processing v1.0
_UNRLVL ImageLab · LoRA Prep · Procesamiento Visual_
_Versión: 1.0 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa en sesiones que involucren:
- Procesamiento de imágenes para clientes (personas, productos, locaciones)
- Preparación de fotos para entrenamiento LoRA
- Background removal, smart crop, batch export
- Generación de imágenes con ImageLab
- Cualquier pipeline de ImageLab → otros labs

---

## SECCIÓN 1 — CAPACIDADES ACTUALES DE IMAGELAB

### Motor
- **Generación:** Gemini Imagen 3 + Gemini 2.5 Flash
- **Procesamiento:** Python PIL en container Claude (para gaps)
- **Background removal AI:** Fal.ai birefnet (pendiente implementar — usar este, no color-matching)
- **Background removal básico:** color-matching (solo fondos planos — NO usar para personas)

### Blueprints disponibles en Supabase
- `BP_PERSON_1.0` — personas reales o avatares
- `BP_LOCATION_1.0` — espacios y ambientes
- `BP_PRODUCT_1.0` — productos de marca

### Tiene actualmente
- Composite operations (producto sobre fondo generado)
- alphaBBox (bounding box con transparencia)
- fitProduct (encajar producto en escena)
- cameraLock (consistencia de cámara entre imágenes)
- resize / convert / crop básico
- Psycho Layer — 10 presets de estímulo psicológico visual
- Blueprint system (carga params de Supabase por persona/locación/producto)

### NO tiene todavía (gaps a resolver con este skill)
- Face detection automática
- Smart crop centrado en cara
- Background removal AI real para personas (birefnet pendiente)
- Extracción de paleta de colores
- Manipulación de color en logos
- Caption generation automática para LoRA training sets
- Pipeline LoRA Prep completo

---

## SECCIÓN 2 — CUÁNDO USAR QUÉ

### Decisión: Fal.ai birefnet vs color-matching

| Situación | Herramienta | Por qué |
|---|---|---|
| Persona con cabello | **Fal.ai birefnet** | Cabello complejo — color-matching falla |
| Persona con fondo complejo | **Fal.ai birefnet** | Bordes irregulares |
| Producto sobre fondo blanco liso | color-matching | Funciona + rápido + barato |
| Producto sobre fondo de color sólido | color-matching | Fondo uniforme |
| Producto con sombras o gradientes | **Fal.ai birefnet** | Color-matching pierde bordes |
| Batch de 20+ imágenes de producto simple | color-matching | Costo vs calidad aceptable |
| Fotos para LoRA training | **Fal.ai birefnet** siempre | Precisión crítica |

### Decisión: Fal.ai vs Python PIL en container Claude

| Tarea | Herramienta | Notas |
|---|---|---|
| Background removal | Fal.ai birefnet | AI real, bordes precisos |
| Face detection + crop | Fal.ai | Mejor precisión |
| Extracción de paleta | Python PIL | Simple, rápido, gratis |
| Color swap en logo | Python PIL | PIL + numpy |
| Resize / convert batch | Python PIL | Más control |
| Blur detection (quality filter) | Python PIL | Laplacian variance |
| Lighting score | Python PIL | Histogram analysis |

---

## SECCIÓN 3 — PIPELINE LORA PREP

Este es el pipeline más crítico del skill. Se activa cuando hay fotos reales de una persona para entrenar un modelo LoRA.

### Flujo completo

```
INPUT: fotos de la persona (cualquier formato/calidad, mínimo 10)
  ↓
[PASO 1 — Inventario]
  · Contar fotos recibidas
  · Verificar formatos (JPG, PNG, HEIC → convertir a JPG)
  · Identificar fotos con la persona claramente visible

  ↓
[PASO 2 — Face Detection] → Fal.ai
  · Detectar cara en cada foto
  · Filtrar fotos donde la cara no es visible o está ocluida
  · Output: array de fotos válidas con coordenadas de cara

  ↓
[PASO 3 — Smart Crop] → Python PIL
  · Para cada foto válida:
    - Usar coordenadas de cara para centrar el crop
    - Crop a formato busto/retrato (cabeza + hombros)
    - Resize a 1024×1024 mínimo
    - Mantener aspect ratio con padding si es necesario

  ↓
[PASO 4 — Background Removal] → Fal.ai birefnet
  · Para cada foto croppeada:
    - Remover background con precisión AI
    - Output: imagen con fondo transparente (.PNG)
    - Verificar que el cabello y bordes quedaron limpios

  ↓
[PASO 5 — Quality Filter] → Python PIL
  · Blur detection: calcular Laplacian variance
    - Score < 100: rechazar (foto borrosa)
  · Lighting score: histogram analysis
    - Score < 30 (muy oscuro) o > 220 (quemado): rechazar
  · Output: lista de fotos aprobadas y rechazadas

  ↓
[PASO 6 — Caption Generation] → Claude Vision
  · Para cada foto aprobada, generar caption de training:
    "a photo of [trigger_word], [descripción física específica],
     [ropa/accesorios], [contexto/pose], [iluminación]"
  · Ejemplo:
    "a photo of patriciaosorio_lora, woman with brown highlighted
     shoulder-length hair, wearing white blouse, warm smile,
     soft natural lighting, portrait"

  ↓
[PASO 7 — Export] → ZIP
  · Carpeta con todas las imágenes aprobadas procesadas
  · captions.txt con una línea por imagen (nombre_archivo.jpg: caption)
  · metadata.json con: trigger_word, total_images, rejected_list, quality_scores

OUTPUT: ZIP listo para Fal.ai FLUX Dreambooth training
```

### Parámetros de training recomendados (Fal.ai FLUX Dreambooth)

```json
{
  "trigger_word": "[nombre]_lora",
  "steps": 1000,
  "learning_rate": 0.0001,
  "batch_size": 1,
  "resolution": "1024",
  "network_alpha": 64,
  "network_dim": 64,
  "optimizer": "adamw8bit"
}
```

### Requisitos mínimos de fotos

| Parámetro | Mínimo | Recomendado | Crítico |
|---|---|---|---|
| Total fotos | 10 | 20-30 | — |
| Fotos frontales | 3 | 8 | Sí |
| Fotos 3/4 perfil | 2 | 6 | Sí |
| Fotos perfil | 1 | 4 | No |
| Resolución mínima | 512px | 1024px | Sí |
| Cara visible y sin ocluir | 100% | — | Sí |
| Variedad de ropa | recomendado | — | No |
| Variedad de iluminación | recomendado | — | No |

---

## SECCIÓN 4 — BATCH EXPORT POR FORMATO

Para exportar imágenes en múltiples formatos desde una sola fuente:

```python
# Python PIL en container Claude
from PIL import Image
import os

FORMATS = {
  'story':   (1080, 1920),  # 9:16
  'feed':    (1080, 1080),  # 1:1
  'banner':  (1200, 628),   # 16:9 aprox
  'reels':   (1080, 1920),  # 9:16
  'favicon': (512,  512),   # 1:1 pequeño
}

def batch_export(source_path, output_dir, formats=FORMATS):
  img = Image.open(source_path)
  for name, (w, h) in formats.items():
    resized = img.resize((w, h), Image.LANCZOS)
    resized.save(f"{output_dir}/{name}.jpg", quality=90)
```

---

## SECCIÓN 5 — PALETTE EXTRACTION

Cuando se necesita extraer la paleta de colores dominantes de una imagen:

```python
from PIL import Image
import numpy as np

def extract_palette(image_path, n_colors=5):
  img = Image.open(image_path).convert('RGB')
  img = img.resize((150, 150))  # reducir para performance
  pixels = np.array(img).reshape(-1, 3)

  # K-means simple para colores dominantes
  from sklearn.cluster import KMeans
  kmeans = KMeans(n_clusters=n_colors, n_init=10)
  kmeans.fit(pixels)

  colors = kmeans.cluster_centers_.astype(int)
  hex_colors = ['#{:02x}{:02x}{:02x}'.format(*c) for c in colors]
  return hex_colors
```

Uso: cuando Sam sube foto de packaging o logo de un cliente y necesitamos extraer sus colores para `brand_palette` en Supabase.

---

## SECCIÓN 6 — PSYCHO LAYER

10 presets disponibles en Supabase (`psycho_presets`):

| Preset ID | Objetivo | Cuándo usar |
|---|---|---|
| urgency | Crear urgencia de compra | Ads con oferta limitada |
| scarcity | Escasez de producto | "Últimas unidades" |
| authority | Autoridad y credibilidad | Contenido profesional/educativo |
| belonging | Pertenencia a comunidad | Lifestyle social |
| fomo | Fear of Missing Out | Eventos, lanzamientos |
| trust | Confianza y seguridad | E-commerce, precios |
| identity | Identidad del consumidor | Lifestyle premium |
| aspiration | Aspiración y deseo | Lujo, transformación |
| curiosity | Curiosidad y engagement | Contenido educativo |
| social_proof | Prueba social | Reviews, comunidad |

Claude carga el preset desde Supabase y lo inyecta como parámetro en el prompt de generación.

---

## SECCIÓN 7 — INTEGRACIÓN CON BLUEPRINTLAB

Cuando BlueprintLab inicia wizard de `BP_PERSON` con fotos reales:

```
BlueprintLab wizard BP_PERSON
  ↓ usuario sube fotos
  ↓ llama a ImageLab LoRA Prep pipeline (este skill)
  ↓ recibe ZIP + captions.txt
  ↓ guarda trigger_word en BP_PERSON.raw_config
  ↓ guarda referencia al training run en Fal.ai
  ↓ marca BP_PERSON.has_reference_photos = true
```

---

## SECCIÓN 8 — CHECKLIST ICR PRE-PROCESAMIENTO

Antes de cualquier sesión de procesamiento:

### Para LoRA Prep
- [ ] Mínimo 10 fotos recibidas
- [ ] Trigger word definido (formato: `[nombre]_lora` sin espacios)
- [ ] `brand_id` y `person_blueprint_id` identificados
- [ ] Fal.ai API key disponible (en env, no hardcodeada)
- [ ] Confirmar con Sam si va a Supabase `person_blueprints` al terminar

### Para generación de imágenes
- [ ] `brand_id` identificado → cargar `imagelab_presets` de Supabase
- [ ] Blueprint relevante cargado (BP_PERSON / BP_PRODUCT / BP_LOCATION)
- [ ] Psycho Layer seleccionado o confirmado "ninguno"
- [ ] Formato de output definido (story / feed / banner / etc.)
- [ ] Negative prompt cargado desde `brands.default_negative_prompt`

---

## SECCIÓN 9 — REFERENCIA RÁPIDA DE APIs

### Fal.ai endpoints relevantes

| Endpoint | Uso | Notas |
|---|---|---|
| `fal-ai/birefnet` | Background removal AI | Preferido para personas |
| `fal-ai/flux/dev` | Generación FLUX | Alta calidad |
| `fal-ai/flux-lora` | Generación con LoRA | Requiere lora_path de Dreambooth |
| `fal-ai/flux-dreambooth` | Training LoRA | Input: ZIP con fotos + captions |
| `fal-ai/face-detection` | Detección de caras | Coordenadas de face bounding box |

### Costos aproximados (Fal.ai)

| Operación | Costo aprox | Notas |
|---|---|---|
| Background removal (birefnet) | ~$0.002/imagen | Muy económico |
| Face detection | ~$0.001/imagen | — |
| FLUX generation (1 imagen) | ~$0.025-0.05 | Según resolución |
| LoRA training (Dreambooth) | ~$0.5-2.0/run | Según steps y imágenes |

---

_SKILL image-processing v1.0 · Unrealville Studio · ImageLab + LoRA Prep_
