# SESSION LOG — UnrealvilleStudio
_Última actualización: 2026-05-29_

---

## SESIÓN 2026-05-29 — MILESTONE: PIPELINE END-TO-END LIVE 🎉

**Duración:** Full day  
**Participantes:** Sam + Claude Sonnet 4.6 + Claude Code  
**Resultado:** Primer post publicado en Instagram + Facebook via pipeline completo automatizado

---

### LOGROS DE LA SESIÓN

#### 1. ImageLab — De bloqueado a operacional ✅
- Fix `maxDuration: 60s` + migración a `VercelRequest/VercelResponse` → resuelve 504 timeout
- Migración completa de Generative Language API (prepay) → **Vertex AI (GCP $300 trial)**
- Service Account `imagelab-vercel` con rol `Agent Platform User` (= `roles/aiplatform.user`)
- Env vars limpias: 5 activas (GOOGLE_SERVICE_ACCOUNT_KEY, GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- Eliminadas 3 huérfanas: GEMINI_API_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
- Budget alert GCP: `ImageLab dev cap` $30/mes · alerts 50%/90%/100%
- `normalizeSupabaseUrl()` implementado — resuelve bug silencioso donde SUPABASE_URL era solo project_ref
- **HEAD: a4d11d0**

#### 2. Preset Injection System ✅
- `imagelab_presets` tabla ahora se lee antes de cada generación
- Lookup por `brand_id + canal` → construye visual_prompt desde preset
- Preset **UNRLVL-FEED-TEASER v2** insertado:
  - Concepto: "Chevron void" — corte arquitectónico 3D en obsidiana #050505
  - Grid dorado #FFAB00 a 15% opacity en el interior del corte
  - Luz surgical vertical desde arriba bisectando el apex
  - Reference: Zaha Hadid × Stanley Kubrick × Rolex dark campaign
  - Sin personas, sin tropical, sin stock photo aesthetic
- GRANT SELECT para service_role en imagelab_presets (fix RLS silencioso)

#### 3. Brand Context UnrealvilleStudio v1.0 ✅
**Fuente: unrealvillestudio.com + auditoría manual**

**Posicionamiento:** Brand Intelligence Infrastructure. Not for everyone.

**ICPs:**
- Primario `biz_owner_systems`: Business Owner 30-55, global, compra transformación no horas
- Secundario `agency_bridge`: In-House Publicist/Agency Bridge 25-45, influye decisiones

**Voice Genome `unrlvl_default` v1.0:**
- Defiant precision. Sentences that cut. Fragments allowed.
- EN default, ES mismo tono sin suavizar
- Forbidden: empowering, amazing, seamless, agencia latina, for latinos
- Signature: "Not for everyone." / "We build systems." / "Forward. Always."

**Tablas actualizadas en Supabase:**
- `brand_personas` (2 ICPs reales)
- `brand_voice_genome` (unrlvl_default v1.0)
- `brand_copy_profiles` (UNRLVL-CP-001)
- `geomix` (2 geos: North America + LATAM+Global Spanish — sin Spain)
- `imagelab_presets` (UNRLVL-FEED-TEASER v2)
- `brand_cache_snapshots` (built 2026-05-29, 9 secciones)

#### 4. Pipeline Fixes (lab-worker v18 + CopyLab v9.7 + Orchestrator v4.1) ✅

**lab-worker v3.3:**
- Aspect ratio mapping: 4:5→3:4, 5:4→4:3, etc. (Vertex AI no acepta 4:5)
- Force imagelab=true para job_type IN (teaser, announcement)
- Upload imagen base64 → Supabase Storage CDN → URL pública
- Canal propagation → ImageLab

**CopyLab v9.7 (commit 8e3c4d4):**
- `runLiteralCopy()` ahora hace `fetchBrandCache(brandId)`
- Inyecta voice_genome + copy_profile en el system prompt
- Hashtags de lexicon_signature, no free-association
- Emoji omitido por default (solo si brand profile autoriza)
- `normalizeSupabaseUrl()` aplicado
- `isV2` check tolerante: matchea con cualquier tabla de brand context

**Orchestrator v4.1 (commit fe817f2):**
- `TriggerBody.canal` + `TriggerBody.language` agregados
- `normalizeSupabaseUrl()` en trigger-job + approve-job + interpret-intent

#### 5. Supabase CDN operacional ✅
- Bucket `unrlvl-media`: 50MB/file, público, CDN Pro
- pg_cron job #32: temp cleanup actualizado a **60 días** (de 48h)
- Path: `temp/{brand_id}/{job_id}/{timestamp}.png`
- CDN URL: `https://amlvyycfepwhiindxgzw.supabase.co/storage/v1/object/public/unrlvl-media/`

#### 6. Primer post publicado 🎉
**Job ID:** b93627b6-4e45-4cef-84fb-bda37621b254  
**Imagen:** Preset UNRLVL-FEED-TEASER v2 ✅ Sin personas ✅  
**Caption:**  
> Great things coming...soon.
> 
> #UnrealvilleStudio #BuildSystems #IndustrialConsistency #ZeroRework #OneSystemInfiniteBrands

**Publicado:**
- Instagram: `18079433432212868` ✅
- Facebook: `1050792034789886_122108522354692054` ✅

**Tiempo total pipeline:** ~35s

---

### HALLAZGOS / GAPS IDENTIFICADOS

| Gap | Impacto | Estado |
|---|---|---|
| `lab_jobs.status` CHECK no incluye 'published' | Cosmético | Pendiente Sprint 0 |
| brand_id mismatch: `UnrealvilleStudio` vs `UNREALville` en Meta | Requiere mapping manual | Pendiente |
| `meta_accounts` sin row para UnrealvilleStudio | Lab worker no puede auto-resolver | Pendiente |
| `CLAUDE.md` no creados en repos | CC pierde contexto entre sesiones | Pendiente |

---

### COMMITS DE LA SESIÓN
| Repo | Commit | Descripción |
|---|---|---|
| ImageLab | `a4d11d0` | Vertex AI migration + preset injection + normalizeSupabaseUrl |
| CopyLab | `8e3c4d4` | Brand context in literal mode + normalizeSupabaseUrl |
| Orchestrator | `fe817f2` | canal + language en TriggerBody + normalizeSupabaseUrl |
| lab-worker EF | v18 | Canal + force imagelab + CDN upload + preset_used |

---

### PRÓXIMOS PASOS
1. VideoLab launch (Kling.ai token disponible) — sesión siguiente
2. Ayra Sprint 0 — deadline 5 Jun 🔴
3. CLAUDE.md para repos prioritarios
4. Insertar UnrealvilleStudio en meta_accounts
5. Fix lab_jobs.status constraint
