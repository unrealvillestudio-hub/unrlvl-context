# ForumPHs · Document Factory — Session Log

_Última actualización: 2026-04-22_

---

## ESTADO ACTUAL

**Document Factory v1.5 — READY FOR BUSINESS** ✅

URL producción: `forumphs-document-factory.vercel.app`
Operador: Ivette Flores (Abogada, Gerente General)
Stack: Next.js 14 · Supabase `amlvyycfepwhiindxgzw` · Edge Function `fphs-formalize` v10

---

## SPRINT 2026-04-22 — Fixes v1.5 (esta sesión)

### FPH-018 — Agenda cross-reference
- `lib/parsers/parseResumen.ts`: exporta `extractAgendaItems()` para reusar
- `app/api/parse/route.ts` v4: si agenda vacía en Resumen → busca en Transcripción → Chat → ICR warning si sigue vacía

### FPH-018b — Bug 206/206 total_units
- `lib/processors/preflightDetector.ts`: `total_units` default = `0` (no `attendance.length`)
- Label actualizado: `← REQUERIDO` para que Ivette no confunda asistentes con total PH
- **Solución definitiva futura**: lookup automático desde tabla PHs en Supabase cuando tengamos los datos de los 8+ edificios cargados

### FPH-016 — ImageRun fix (pendiente sesión anterior, cerrado)
- `app/api/generate/route.ts`: añadida línea `type: img.type === 'image/png' ? 'png' : 'jpg'`
- docx v8.5.0 requería este campo — imágenes se rechazaban silenciosamente sin él

### FPH-019 — ZIP Extractor: imágenes embebidas en DOCX
- `lib/zipExtractor.ts` v3: abre cada DOCX como ZIP y extrae `word/media/` (quorum charts, screenshots de votaciones)
- Filtro: solo imágenes >5KB para excluir íconos y bullets
- Fuente etiquetada: `resumen_image1.png`, `transcripcion_image2.jpeg`, etc.
- Deduplicación por filename+size

### FPH-020 — 413 Request Entity Too Large (imágenes en payload)
- `app/page.tsx`: imágenes separadas del payload `/api/parse` → guardadas en estado `extractedImages`
- `compressImage()`: Canvas API, max 900px, JPEG q=0.75 → ~30-50KB por imagen
- `/api/generate`: recibe imágenes comprimidas separadas del parsed
- `/api/icr`: strip de imágenes de `parsed` antes de enviar (`parsedForICR`)
- Regla permanente: solo `/api/generate` recibe imágenes; todas las demás APIs reciben `parsed` sin imágenes

### PENDIENTE (anotado para cuando se carguen datos de PHs a Supabase)
- `total_units` automático por nombre de PH → lookup en tabla `phs` → elimina gap manual
- Filtro inteligente de imágenes decorativas Hypal (portadas, footers) vs. capturas de asamblea
  → Decisión: Ivette borra manualmente del Anexo (30 seg en Word) — no justifica complejidad ahora

---

## HISTORIAL DE SPRINTS

| Sprint | Fecha | Status |
|---|---|---|
| FPH-013 ZIP Extractor initial | 2026-04-14 | ✅ |
| FPH-014 UX Pipeline v1.0 | 2026-04-14 | ✅ |
| FPH-015 BOLD_RULE v2 Ivette canonical | 2026-04-14 | ✅ |
| FPH-016 ZIP images + ImageRun | 2026-04-17 | ✅ (cerrado 2026-04-22) |
| FPH-017 Agenda cross-ref + 206/206 fix | 2026-04-22 | ✅ |
| FPH-018 DOCX embedded images extractor | 2026-04-22 | ✅ |
| FPH-019 413 fix — image separation + compression | 2026-04-22 | ✅ |

---

## ARQUITECTURA PIPELINE v1.5

```
ZIP (extracción local browser)
  → Confirmación stats (UploadZone)
  → /api/parse (texto only — SIN imágenes)
  → Pre-flight (gaps, agenda cross-ref, total_units REQUERIDO)
  → Paso 0.5 (17 agentes paralelos, fphs-formalize v10)
  → /api/generate (parsed + imágenes comprimidas Canvas)
  → QA → ICR (parsed SIN imágenes) → Descarga DOCX
```

**Regla imágenes**: solo `/api/generate` las recibe. Toda otra API recibe `parsed` sin campo `images`.

---

## PRÓXIMOS PASOS

1. Recolectar datos 8+ edificios → tabla `phs` en Supabase → `total_units` automático
2. Foto Ivette → ForumPHs Speaks
3. Speaks → CRM integration
4. FPHs-OPS módulo COBROS
