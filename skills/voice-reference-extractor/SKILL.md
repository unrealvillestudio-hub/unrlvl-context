# SKILL: voice-reference-extractor
## UNRLVL · v1.0
**Ubicación:** `skills/voice-reference-extractor/`  
**Estado:** ICR ✅  
**Propietario:** Unrealville Studio · Sam  
**Última actualización:** 2026-06-05

---

## PROPÓSITO

Pipeline determinístico local: **videos TikTok descargados → consolidado estructurado por cuenta-referencia**.

El skill extrae y estructura. **NO interpreta tone, NO hace análisis de voice, NO produce juicios editoriales.** El output es materia prima lista para análisis de voice en chat (típicamente seguido del `content-pipeline` skill con L1.5 VOICE_GENOME_INJECTION).

Uso típico: cargar una carpeta de videos de una cuenta de referencia → obtener transcripciones + texto on-screen → usar ese material en chat para construir o validar un `brand_voice_genome`.

---

## DEPENDENCIAS

Verificar antes de usar. La instalación es idempotente (pip y winget/apt no reinstalan si ya existe).

### Linux / macOS

```bash
# Sistema
sudo apt install ffmpeg tesseract-ocr tesseract-ocr-spa   # Debian/Ubuntu
brew install ffmpeg tesseract                              # macOS

# Python
pip install openai-whisper pytesseract Pillow
```

### Windows (probado — comandos exactos)

```powershell
# 1. ffmpeg (incluye ffprobe)
winget install --id Gyan.FFmpeg --accept-package-agreements --accept-source-agreements

# 2. Tesseract OCR
winget install --id UB-Mannheim.TesseractOCR --accept-package-agreements --accept-source-agreements

# 3. Tessdata español + inglés (sin admin — va a AppData del usuario)
$tessdata = "$env:APPDATA\tessdata"
New-Item -ItemType Directory -Force -Path $tessdata | Out-Null
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata" -OutFile "$tessdata\eng.traineddata" -UseBasicParsing
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/spa.traineddata" -OutFile "$tessdata\spa.traineddata" -UseBasicParsing
[System.Environment]::SetEnvironmentVariable("TESSDATA_PREFIX", $tessdata, "User")

# 4. Python packages
pip install openai-whisper pytesseract Pillow
```

> **Nota Windows:** después de instalar ffmpeg/Tesseract con winget, abrir una nueva terminal para que el PATH actualice. El script detecta `C:\Program Files\Tesseract-OCR\tesseract.exe` automáticamente si tesseract no está en PATH.

Whisper descarga el modelo en la primera corrida (~460 MB para `small`). Se cachea localmente en `~/.cache/whisper/`. No requiere internet en corridas siguientes.

---

## INVOCACIÓN

```bash
python skills/voice-reference-extractor/extract.py \
  <input_dir> \
  --handle <cuenta> \
  [--model small] \
  [--lang es] \
  [--ocr-lang spa+eng] \
  [--captions captions.md] \
  [--output output/]
```

### Flags

| Flag | Tipo | Default | Descripción |
|---|---|---|---|
| `input_dir` | posicional | — | Carpeta con los videos (.mp4, .mov, .webm, .avi, .mkv) |
| `--handle` | string | **requerido** | Nombre de la cuenta (sin @). Usado para nombrar los outputs. |
| `--model` | string | `small` | Modelo Whisper: `tiny`, `base`, `small`, `medium`, `large` |
| `--lang` | string | `es` | Idioma para Whisper (ISO 639-1: `es`, `en`, `pt`, etc.) |
| `--ocr-lang` | string | `spa+eng` | Idiomas Tesseract separados por `+`. Ver `tesseract --list-langs` |
| `--captions` | path | `None` | Ruta a `captions.md` con captions manuales (opcional) |
| `--output` | path | `./output` | Carpeta de salida |

---

## PROCESO (por video)

```
1. Hash SHA-256 del archivo (primeros 16 chars)
   └── Si ya existe en .cache/ → retornar resultado cacheado (idempotente)

2. Duración:  ffprobe → mm:ss

3. Audio:     ffmpeg -vn -acodec pcm_s16le -ar 16000 -ac 1 → WAV mono 16kHz

4. Transcripción: Whisper (modelo configurable, default: small, lang: es)
   └── Si no hay habla detectada → "sin audio hablado"

5. OCR on-screen:
   a. ffmpeg -vf fps=1 → frames PNG (1 frame/segundo)
   b. Tesseract sobre cada frame (lang: spa+eng)
   c. Deduplicar: eliminar líneas idénticas al frame anterior
      (el texto on-screen persiste varios segundos → colapsar a aparición única)
   d. Retornar líneas únicas en orden de aparición (texto crudo — no limpiado)

6. Guardar resultado en .cache/<hash>.json
```

---

## OUTPUT

Un set de archivos por cuenta en `output/`:

```
output/
  <handle>_consolidado.md    ← legible en chat
  <handle>_consolidado.json  ← para ingesta futura
  .cache/                    ← caché de resultados por hash (no commitear)
```

### Formato consolidado .md

```markdown
# Consolidado de referencia — @<handle>
_N videos_

---

## Video: nombre_archivo.mp4
- Duración: 00:23
- Caption (manual): Texto del caption, o —
- Texto on-screen (OCR):
  línea 1
  línea 2
- Transcripción de audio:
  texto completo de whisper aquí
---

## Video: otro_archivo.mp4
...
```

### Formato consolidado .json

```json
{
  "handle": "nombre_cuenta",
  "total_videos": 5,
  "videos": [
    {
      "filename": "video1.mp4",
      "hash": "abc123def456",
      "duration": "00:23",
      "caption": "—",
      "ocr_text": "línea 1\nlínea 2",
      "transcription": "hola chicos hoy les traigo..."
    }
  ]
}
```

---

## FORMATO captions.md

Archivo opcional con los captions que copiaste manualmente de TikTok.

```markdown
## video1.mp4
Este es el caption del primer video tal como aparece en TikTok.

## video2.mp4
Este es el caption del segundo video.
Puede tener múltiples líneas.

## video3.mp4
```

**Reglas:**
- Cada sección empieza con `## nombre_exacto_del_archivo.mp4` (incluir extensión).
- El texto del caption va en las líneas siguientes hasta el próximo `##`.
- Si un video no tiene sección en captions.md, aparece `—` en el consolidado.
- El archivo puede estar en cualquier ubicación; pasarlo con `--captions`.

---

## QUÉ HACE / QUÉ NO HACE

| ✅ Hace | ❌ No hace |
|---|---|
| Extrae audio y transcribe con Whisper | Análisis de tono o voice |
| Extrae texto on-screen con OCR | Interpretación semántica del contenido |
| Deduplica texto on-screen repetido por frames | Limpieza semántica del OCR |
| Produce consolidado .md + .json por cuenta | Subir nada a ningún servicio |
| Cachea por hash — idempotente en re-ejecuciones | Comparar entre cuentas |
| Procesa toda la carpeta en batch | Descargar videos (solo procesa los ya descargados) |
| Lee captions manuales desde captions.md | Extraer captions desde TikTok API |

---

## LIMITACIÓN CONOCIDA — DURACIÓN DE VIDEOS TIKTOK

Los videos descargados desde TikTok sin cuenta de negocio tienen un tope de ~18-20 segundos. Esto significa:

- La **transcripción Whisper es parcial** — solo cubre el audio descargado (que puede ser el tramo inicial del video original).
- El **OCR on-screen compensa parcialmente**: captura texto superpuesto visible en los frames descargados, que a menudo incluye frases clave del guión.
- En casos donde el video fue descargado completo (ej. descarga directa, videos cortos < 20s), la transcripción es completa.

**Recomendación:** al construir un voice genome, priorizar videos descargados completos o complementar con capturas de pantalla manuales para los tramos perdidos.

---

## EJEMPLO END-TO-END

```bash
# Estructura de partida
Downloads/
  tt/
    @po_haircoach/
      clip1.mp4
      clip2.mp4
      clip3.mp4
    captions.md

# Correr el skill (Linux/Mac)
python skills/voice-reference-extractor/extract.py \
  "Downloads/tt/@po_haircoach" \
  --handle po_haircoach \
  --model small \
  --lang es \
  --captions "Downloads/tt/captions.md" \
  --output "Downloads/tt/output"

# Correr el skill (Windows PowerShell)
python skills\voice-reference-extractor\extract.py `
  "C:\Users\sam\Downloads\tt\@po_haircoach" `
  --handle po_haircoach `
  --model small `
  --lang es `
  --captions "C:\Users\sam\Downloads\tt\captions.md" `
  --output "C:\Users\sam\Downloads\tt\output"

# Output
output/
  po_haircoach_consolidado.md   ← cargar en chat para análisis de voice
  po_haircoach_consolidado.json
  .cache/
    a1b2c3d4e5f6.json
    ...

# Primera corrida: descarga modelo Whisper (~460MB para small) + procesa
# Segunda corrida sobre los mismos archivos: instantáneo (caché)
```

---

## INTEGRACIÓN CON EL ECOSISTEMA

Este skill es el **paso 1** del flujo de construcción de `brand_voice_genome`:

```
1. voice-reference-extractor  →  consolidado.md por cuenta
2. Chat con Claude             →  análisis lingüístico del consolidado
3. Captura voice_genome        →  INSERT brand_voice_genome en Supabase
4. content-pipeline L1.5       →  inyección del genome en outputs de CopyLab
```

El `consolidado.md` es el input directo al paso 2: cargarlo en chat y pedir análisis de lexicon, sintaxis, arquitectura argumentativa.

Ver: `skills/content-pipeline/SKILL.md` → LAYER 1.5 VOICE_GENOME_INJECTION.

---

## NOTAS TÉCNICAS

- **Modelo Whisper recomendado:** `small` — buen balance velocidad/precisión para contenido TikTok (frases cortas, coloquial). `medium` o `large` para mayor precisión en audio con ruido de fondo.
- **OCR ruidoso por diseño:** el texto crudo de Tesseract no se limpia semánticamente. Puede incluir caracteres basura. Eso es intencional — la limpieza la hace el análisis en chat.
- **fps=1 para frames:** suficiente para texto on-screen estático que persiste segundos. No usar fps mayor — aumenta tiempo de procesamiento sin beneficio real para este caso de uso.
- **caché en `.cache/`:** no commitear al repo. Agregar `.cache/` y `output/` a `.gitignore` si el output_dir está dentro del repo.

---

*voice-reference-extractor v1.0 · Unrealville Studio · 2026-06-05*  
*Pipeline: ffmpeg → Whisper → Tesseract → consolidado .md + .json*  
*Idiomas por defecto: es (Whisper) + spa+eng (Tesseract)*
