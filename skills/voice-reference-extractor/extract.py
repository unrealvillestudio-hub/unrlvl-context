#!/usr/bin/env python3
"""
voice-reference-extractor — pipeline determinístico de extracción
TikTok videos → consolidado estructurado por cuenta-referencia.
NO hace análisis de tono ni interpretación de voice.
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

# Windows: forzar UTF-8 en stdout/stderr para evitar cp1252 UnicodeEncodeError
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


# ---------------------------------------------------------------------------
# Dependencias opcionales — importadas en main() para dar error temprano
# ---------------------------------------------------------------------------

_TESSERACT_WINDOWS_DEFAULT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def _configure_tesseract():
    """En Windows, si tesseract no está en PATH, buscarlo en la ubicación por defecto."""
    import platform
    if platform.system() == "Windows" and not shutil.which("tesseract"):
        if os.path.isfile(_TESSERACT_WINDOWS_DEFAULT):
            try:
                import pytesseract
                pytesseract.pytesseract.tesseract_cmd = _TESSERACT_WINDOWS_DEFAULT
            except ImportError:
                pass


def _check_deps():
    _configure_tesseract()
    missing = []
    if not shutil.which("ffmpeg"):
        missing.append("ffmpeg (instalar via sistema operativo)")
    if not shutil.which("ffprobe"):
        missing.append("ffprobe (viene con ffmpeg)")

    import platform
    tess_available = shutil.which("tesseract") or (
        platform.system() == "Windows" and os.path.isfile(_TESSERACT_WINDOWS_DEFAULT)
    )
    if not tess_available:
        missing.append("tesseract-ocr (instalar via sistema operativo)")
    try:
        import whisper  # noqa: F401
    except ImportError:
        missing.append("openai-whisper  →  pip install openai-whisper")
    try:
        import pytesseract  # noqa: F401
    except ImportError:
        missing.append("pytesseract  →  pip install pytesseract")
    try:
        from PIL import Image  # noqa: F401
    except ImportError:
        missing.append("Pillow  →  pip install Pillow")
    if missing:
        print("ERROR — dependencias faltantes:")
        for m in missing:
            print(f"  · {m}")
        sys.exit(1)


# ---------------------------------------------------------------------------
# Cache (idempotencia por hash de archivo)
# ---------------------------------------------------------------------------

def _file_hash(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()[:16]


def _cache_path(output_dir: Path, file_hash: str) -> Path:
    return output_dir / ".cache" / f"{file_hash}.json"


def _load_cache(output_dir: Path, file_hash: str):
    p = _cache_path(output_dir, file_hash)
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return None


def _save_cache(output_dir: Path, file_hash: str, data: dict):
    p = _cache_path(output_dir, file_hash)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


# ---------------------------------------------------------------------------
# ffprobe — duración
# ---------------------------------------------------------------------------

def _get_duration(video_path: Path) -> str:
    """Retorna duración como mm:ss."""
    result = subprocess.run(
        [
            "ffprobe", "-v", "quiet",
            "-show_entries", "format=duration",
            "-of", "csv=p=0",
            str(video_path),
        ],
        capture_output=True, text=True, check=True,
    )
    secs = float(result.stdout.strip())
    m, s = divmod(int(secs), 60)
    return f"{m:02d}:{s:02d}"


# ---------------------------------------------------------------------------
# Audio — extracción y transcripción con Whisper
# ---------------------------------------------------------------------------

def _extract_audio(video_path: Path, wav_path: Path):
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", str(video_path),
            "-vn", "-acodec", "pcm_s16le",
            "-ar", "16000", "-ac", "1",
            str(wav_path),
        ],
        capture_output=True, check=True,
    )


def _transcribe(wav_path: Path, model_name: str, lang: str, whisper_model_cache) -> tuple[str, object]:
    """
    Retorna (texto, modelo_cargado).
    El modelo se pasa para reutilizarlo entre videos (evita re-descarga).
    """
    import whisper

    model = whisper_model_cache
    if model is None:
        print(f"  [whisper] Cargando modelo '{model_name}'…")
        model = whisper.load_model(model_name)

    result = model.transcribe(str(wav_path), language=lang, fp16=False)
    text = result.get("text", "").strip()
    if not text:
        text = "sin audio hablado"
    return text, model


# ---------------------------------------------------------------------------
# OCR — frames + deduplicación
# ---------------------------------------------------------------------------

def _extract_frames(video_path: Path, frames_dir: Path):
    frames_dir.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", str(video_path),
            "-vf", "fps=1",
            str(frames_dir / "%03d.png"),
        ],
        capture_output=True, check=True,
    )


def _ocr_frames(frames_dir: Path, ocr_lang: str) -> str:
    """
    OCR de cada frame; devuelve líneas únicas en orden de aparición.
    Deduplicación por ventana: elimina texto exactamente igual al frame anterior.
    """
    import pytesseract
    from PIL import Image

    frame_files = sorted(frames_dir.glob("*.png"))
    seen_lines: list[str] = []
    prev_text = ""

    for frame_file in frame_files:
        try:
            img = Image.open(frame_file)
            raw = pytesseract.image_to_string(img, lang=ocr_lang)
        except Exception:
            continue

        # Normalizar: quitar líneas vacías, strip por línea
        lines = [ln.strip() for ln in raw.splitlines() if ln.strip()]
        current_text = "\n".join(lines)

        if current_text and current_text != prev_text:
            for line in lines:
                if line and line not in seen_lines:
                    seen_lines.append(line)
        prev_text = current_text

    return "\n".join(seen_lines) if seen_lines else "—"


# ---------------------------------------------------------------------------
# Captions — cargar desde captions.md
# ---------------------------------------------------------------------------

def _load_captions(captions_file: Path) -> dict[str, str]:
    """
    Parsea captions.md.
    Formato esperado (ver SKILL.md):
      ## nombre_archivo.mp4
      Texto del caption aquí.
    Retorna dict {nombre_archivo: caption_text}.
    """
    if not captions_file or not captions_file.exists():
        return {}

    captions = {}
    content = captions_file.read_text(encoding="utf-8")
    blocks = re.split(r"^##\s+", content, flags=re.MULTILINE)
    for block in blocks:
        if not block.strip():
            continue
        lines = block.strip().splitlines()
        if not lines:
            continue
        filename = lines[0].strip()
        caption_text = "\n".join(lines[1:]).strip() or "—"
        captions[filename] = caption_text
    return captions


# ---------------------------------------------------------------------------
# Proceso por video
# ---------------------------------------------------------------------------

def _process_video(
    video_path: Path,
    output_dir: Path,
    model_name: str,
    lang: str,
    ocr_lang: str,
    captions: dict,
    whisper_model_cache,
    index: int,
    total: int,
) -> tuple[dict, object]:
    """
    Procesa un video. Retorna (resultado_dict, whisper_model).
    Usa caché: si el hash ya fue procesado, retorna sin rehacer nada.
    """
    file_hash = _file_hash(video_path)
    cached = _load_cache(output_dir, file_hash)
    if cached:
        print(f"  [{index}/{total}] {video_path.name} — desde caché")
        return cached, whisper_model_cache

    print(f"  [{index}/{total}] {video_path.name} — procesando…")

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)
        wav_path = tmp / "audio.wav"
        frames_dir = tmp / "frames"

        # 1. Duración
        try:
            duration = _get_duration(video_path)
        except Exception as e:
            duration = f"error: {e}"

        # 2. Audio
        try:
            _extract_audio(video_path, wav_path)
            audio_ok = wav_path.exists()
        except Exception:
            audio_ok = False

        # 3. Transcripción
        transcription = "sin audio hablado"
        if audio_ok:
            try:
                transcription, whisper_model_cache = _transcribe(
                    wav_path, model_name, lang, whisper_model_cache
                )
            except Exception as e:
                transcription = f"error de transcripción: {e}"

        # 4. OCR
        try:
            _extract_frames(video_path, frames_dir)
            ocr_text = _ocr_frames(frames_dir, ocr_lang)
        except Exception as e:
            ocr_text = f"error OCR: {e}"

    caption = captions.get(video_path.name, "—")

    result = {
        "filename": video_path.name,
        "hash": file_hash,
        "duration": duration,
        "caption": caption,
        "ocr_text": ocr_text,
        "transcription": transcription,
    }

    _save_cache(output_dir, file_hash, result)
    return result, whisper_model_cache


# ---------------------------------------------------------------------------
# Output — consolidado .md y .json
# ---------------------------------------------------------------------------

def _build_md_block(r: dict) -> str:
    lines = [
        f"## Video: {r['filename']}",
        f"- Duración: {r['duration']}",
        f"- Caption (manual): {r['caption']}",
        f"- Texto on-screen (OCR):",
        "",
    ]
    for ocr_line in r["ocr_text"].splitlines():
        lines.append(f"  {ocr_line}")
    lines += [
        "",
        "- Transcripción de audio:",
        "",
    ]
    for t_line in r["transcription"].splitlines():
        lines.append(f"  {t_line}")
    lines.append("---")
    return "\n".join(lines)


def _write_outputs(handle: str, results: list[dict], output_dir: Path):
    output_dir.mkdir(parents=True, exist_ok=True)

    md_path = output_dir / f"{handle}_consolidado.md"
    json_path = output_dir / f"{handle}_consolidado.json"

    header = (
        f"# Consolidado de referencia — @{handle}\n"
        f"_Generado por voice-reference-extractor · {len(results)} videos_\n\n"
        "**NOTA:** Este archivo contiene extracción pura (transcripción + OCR). "
        "No incluye análisis de tono ni interpretación de voice.\n\n"
        "---\n\n"
    )

    blocks = "\n\n".join(_build_md_block(r) for r in results)
    md_path.write_text(header + blocks + "\n", encoding="utf-8")

    json_data = {
        "handle": handle,
        "total_videos": len(results),
        "videos": results,
    }
    json_path.write_text(json.dumps(json_data, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n  ✓ {md_path}")
    print(f"  ✓ {json_path}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _parse_args():
    p = argparse.ArgumentParser(
        description="Extrae audio + OCR de videos TikTok y produce un consolidado por cuenta.",
    )
    p.add_argument(
        "input_dir",
        help="Carpeta con los videos a procesar.",
    )
    p.add_argument(
        "--handle",
        required=True,
        help="Nombre de la cuenta TikTok (sin @). Usado para nombrar los archivos de salida.",
    )
    p.add_argument(
        "--model",
        default="small",
        help="Modelo Whisper a usar (tiny, base, small, medium, large). Default: small.",
    )
    p.add_argument(
        "--lang",
        default="es",
        help="Idioma para Whisper (código ISO 639-1). Default: es.",
    )
    p.add_argument(
        "--ocr-lang",
        default="spa+eng",
        dest="ocr_lang",
        help="Idioma(s) Tesseract. Default: spa+eng.",
    )
    p.add_argument(
        "--captions",
        default=None,
        help="Ruta a captions.md con captions manuales. Opcional.",
    )
    p.add_argument(
        "--output",
        default="output",
        help="Carpeta de salida. Default: ./output.",
    )
    return p.parse_args()


def main():
    _check_deps()
    args = _parse_args()

    input_dir = Path(args.input_dir).resolve()
    output_dir = Path(args.output).resolve()
    captions_file = Path(args.captions).resolve() if args.captions else None

    if not input_dir.is_dir():
        print(f"ERROR: '{input_dir}' no es una carpeta válida.")
        sys.exit(1)

    video_extensions = {".mp4", ".mov", ".webm", ".avi", ".mkv"}
    videos = sorted(
        p for p in input_dir.iterdir()
        if p.is_file() and p.suffix.lower() in video_extensions
    )

    if not videos:
        print(f"No se encontraron videos en '{input_dir}'.")
        sys.exit(0)

    captions = _load_captions(captions_file)
    total = len(videos)
    print(f"\nvoice-reference-extractor · @{args.handle} · {total} video(s)\n")

    whisper_model = None
    results = []

    for i, video_path in enumerate(videos, start=1):
        result, whisper_model = _process_video(
            video_path=video_path,
            output_dir=output_dir,
            model_name=args.model,
            lang=args.lang,
            ocr_lang=args.ocr_lang,
            captions=captions,
            whisper_model_cache=whisper_model,
            index=i,
            total=total,
        )
        results.append(result)

    _write_outputs(args.handle, results, output_dir)
    print(f"\nListo — {total} video(s) procesados.\n")


if __name__ == "__main__":
    main()
