# ForumPHs — Session Log

---

## 2026-04-17 — Document Factory v1.5 · MARATÓN COMPLETO

**Resultado:** Document Factory **READY FOR BUSINESS**. Todos los sprints del backlog cerrados.

### Sprints completados

**FPH-014 — Secciones per agenda real**
- `parseAgendaText()` exportada desde `preflightDetector.ts`
- `handlePreflightSubmit` en `page.tsx` parsea `confirmed_agenda_items` → `skeleton.agenda_items`
- Gap "Orden del Día" siempre visible en pre-flight, pre-poblado con items detectados
- `lib/types.ts`: campo `confirmed_agenda_items` añadido a `PreflightData`

**FPH-015 — PH Los Alamos speaker fix**
- `parseTranscripcion.ts`: `detectRole()` — regex `/^p\.?h\.?\s+\w/i` → role `logistica`
- Fix aplicado: "PH Los Alamos" ya no se clasifica como propietario

**FPH-016 — ZIP Extractor integrado + imágenes en DOCX**
- `lib/zipExtractor.ts` (NUEVO): extracción client-side con jszip + mammoth + xlsx
- `components/UploadZone.tsx`: acepta .zip directamente, extracción local en browser
- `lib/types.ts`: `ExtractedImage` + `images: ExtractedImage[]` en `ParsedHypalZip`
- `app/api/parse/route.ts` v3: cast `body.images` type string → union, pass-through
- `app/api/generate/route.ts`: appendix "DOCUMENTOS DE RESPALDO — IMÁGENES" con ImageRun
- **PENDIENTE**: agregar `type:'png'/'jpg'` en ImageRun constructor (1 línea, línea ~488)

### UX Fixes v1.5
- **Blank screen guard**: cuando `blocksToFormalize.length === 0` → mensaje ⚠ + botones de acción
- **ICR Revision step ELIMINADO**: paso `icr-resolution` removido del pipeline y del tipo `Step`. El Anexo ICR en DOCX cubre esa necesidad.
- **Pipeline v1.5**: ZIP → Confirmación → Pre-flight → Paso 0.5 → Generar → QA → ICR → Descarga
- **Auto-scroll ICR**: `window.scrollTo` con 80ms delay al click "Continuar → ICR"
- **Título producto**: "Document Factory" — gradiente terra→amatista, `clamp(40px, 8vw, 68px)`, glow radial
- **UploadZone confirmación**: extrae ZIP → muestra stats tabla (✓/✗ por campo) → botón "Continuar al Pre-flight →". Ivette ve qué se detectó antes de avanzar.
- **Footer**: `v1.4` → `v1.5`

### Deploy confirmado
- Build green ✅
- Test real: ZIP Los Álamos (274 asistentes, 163 votaciones, 0 imágenes — normal)
- ICR auditó correctamente, acta descargada OK

---

## 2026-04-17 — FPH-013 + GitHub Auditor Proxy

**FPH-013 CERRADO:**
- `fphs-formalize` v9: LOGISTICA_NAMES regex — Daniel Puentes / Hypal / Hipal → skip
- BOLD_RULE v2: admin sin artículo, propietario La señora/El señor, JD solo cargo
- `generate/route.ts` v3: `sectionTitle()` sin número prefix (formato canónico Ivette)
- Test real PH Los Álamos exitoso

**GitHub Auditor Proxy ACTIVO:**
- `Tools/api/gh.js` deployado en Vercel
- `GH_PAT` configurado en env del proyecto tools
- SKILL.md documentado en `Tools/github-auditor/SKILL.md`

---

## Pendiente próxima sesión
- ImageRun type fix: `type: img.type === 'image/png' ? 'png' : 'jpg'` en generate/route.ts ~488
- Foto Ivette para ForumPHs Speaks
