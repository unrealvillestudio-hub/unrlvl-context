# ImageLab — Session Log

## 2026-06-24 — Migración P0 Imagen→Gemini + BGRemover

### Sprint A — Migración Vertex Imagen → gemini-2.5-flash-image (P0, CERRADO)
- **Causa:** todos los modelos Vertex Imagen se apagaron 24-jun-2026. ImageLab corría sobre imagen-3.0-fast-generate-001 (generación) + imagen-3.0-capability-001 (multimodal) — ambos en la lista de apagado.
- **Cambio:** `api/execute.ts` reescrito. `:predict` → `:generateContent`; body `instances/parameters` → `contents/generationConfig.imageConfig`; parsing `predictions[].bytesBase64Encoded` → `candidates[].content.parts[].inlineData.data`. Multimodal: el sistema `REFERENCE_TYPE_SUBJECT/STYLE` de Imagen NO existe en Gemini → imágenes como `inlineData` parts + roles descritos en texto. `negativePrompt` no existe → absorbido al prompt como "Avoid:". 2 constantes → un solo `GEMINI_IMAGE_MODEL`. Auth SA→OAuth2 Bearer y timeouts intactos. `model` del cliente sigue ignorado.
- **Verificación:** a) text-to-image, b) multimodal, c) orchestrator+preset (contrato IID) — los 3 PASS en Preview. Smoke directo en PRODUCCIÓN post-merge = PNG válido. Región us-central1 OK (no requirió global). Costo ~$0.039/img.
- **Drift cerrado:** execute.ts es el ÚNICO punto Imagen vivo. lab-worker + content-run-stage delegan vía lab_configs.imagelab → /api/execute. No hay segundo punto.
- **Estado:** PR #2 MERGED a main (6d04556), producción READY verificada. Incendio apagado.
- **Pendiente:** verificación (c) end-to-end real del IID — DIFERIDA: el IID está detenido tras tabla rasa (23-jun), no hay corrida natural que observar hasta reconexión Fase 3. Cuando el IID vuelva a correr, confirmar pieza con assets.image.url en content.content_pieces.
- **Decisión modelo:** se eligió gemini-2.5-flash-image (GA, ruta oficial) sobre gemini-3.1-flash-image (preview, riesgo de producción). 3.1 queda como upgrade futuro cuando pase a GA.

### Sprint B — BGRemover (ex-ProductShots) (MERGEADO a main, merge commit a1b2a1a, 24-jun)
- **Origen:** se diseñó como ProductShots (4 pasos: subir→quitar fondo→componer catálogo→descargar). La composición se DESCARTÓ.
- **Razón del descarte (aprendizaje clave):** un PNG recortado trae la luz de su captura original; N productos fotografiados por separado no comparten luz común. La composición determinística los pega pero "flotan" (collage). El generativo integra pero reinterpreta el producto y rompe la etiqueta (texto fino = ~80% de probabilidad de etiqueta falsa detectable en marca propia). Ni JSON de producto ni prompt detallado son candado sobre los píxeles de la etiqueta — solo guían escena/escala. Para catálogo de calidad-estudio de marca propia (NeurOne): la respuesta correcta es foto profesional, no software.
- **Recorte:** quitada toda la composición (catalogBackground.ts eliminado; compositeDeterministic.ts revertido a pre-sprint con compositeDeterministicCanvas intacto). Renombrado tab/módulo ProductShots → BGRemover. Flujo final 3 pasos: subir (1-7) → quitar fondo → descargar (PNG/WEBP individual + zip).
- **remove.bg:** proxy server-side api/removebg.ts (key REMOVEBG_API_KEY solo en env Vercel, nunca cliente). preview=size=preview (gratis) / confirmar=size=auto (1 crédito). Captura X-Credits-Charged.
- **Bug resuelto:** 400 "error reading the image" (encoding PNG no-decodable por remove.bg) + 413 (payload >4.5MB límite serverless Vercel). Fix: normalización cliente a JPEG baseline + cap 2400px lado mayor antes de subir.
- **Limitación conocida:** cutout final ≤2400px lado mayor (límite 4.5MB funciones Vercel, no configurable). OK catálogo/e-com; insuficiente para print → requeriría otra arquitectura de upload.
- **También:** gate fantasma AI Studio (window.aistudio.hasSelectedApiKey "Pro Features Locked") eliminado — era vestigio de cuando ImageLab corría en Google AI Studio; el backend usa Service Account.
- **Estado:** MERGEADO a main (merge commit a1b2a1a, 24-jun). Verificado OK por Sam en Preview con producto real antes del merge. BGRemover live. Rama clever-bell-293d56 borrada. removeBackground.ts muerto (root+src) ya removido en el recorte previo (confirmada ausencia en origin/main).

---
*Session log · ImageLab · actualizado 2026-06-24*
