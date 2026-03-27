# SESSION LOG — UNRLVL Ecosystem
_Acumulativo. Novedades al tope. No reemplazar — solo añadir._

---

## 2026-03-27 — DB_VARIABLES_v7 + Supabase Migración Completa + CopyLab QA

### ✅ COMPLETADO HOY

---

#### 1. AUDITORÍA DB_VARIABLES v6.4 → v7.0

Auditoría 100% de las 40 hojas de DB_VARIABLES_v6_4.xlsx. Hallazgos principales:

**11 inconsistencias identificadas y resueltas en v7:**
1. Output_Templates en Supabase eran stubs (476-563 chars vs 1670-2082 en DB_V) → reemplazados con textos completos
2. Canal_Blocks en Supabase eran stubs → reemplazados con textos completos
3. keywords no tenían columnas `producto`, `servicio`, `prioridad` → añadidas
4. HUMANIZE brand_ids en camelCase (DB_V) vs PascalCase (Supabase) → PascalCase es el estándar canónico
5. voicelab_model_preferred = `elevenlabs_turbo_v2` → `tenzorart` (decisión arquitectónica confirmada)
6. Fila MASTER en Marcas → eliminada (era helper de Google Sheets, no marca real)
7. Diamond Details contexto = fórmula `=CONTEXTOS!B5` → resuelto a texto directo
8. DV_Idiomas incompleto: faltan EN-UK, VAL, en-FL → expandido a 8 idiomas
9. Patricia Osorio CTAs = 0 en DB_V → generados desde contexto (8 CTAs)
10. ForumPHs + NeuroneSCF no existen en DB_V → skeletons documentados
11. 7 hojas de fórmulas computadas → eliminadas (no son datos)

**Descubrimiento crítico — fórmula maestra UI_Prompt:**
El prompt assembly real en DB_V usa esta secuencia:
```
MARCA → IDIOMA → PRODUCTO → SERVICIO → KEYWORD_PRINCIPAL → KEYWORDS_PRIORITARIAS
→ contexto_marca + geo_principal + tono_base + canal_base
→ template_text (Output_Templates) + block_text (Canal_Blocks)
```
`grupo_3_keywords` = top 3 keywords filtradas por marca+idioma+producto+servicio, prioridad ≤ 3.
Esto exige columnas `producto`, `servicio`, `prioridad` en la tabla `keywords`.

**DB_VARIABLES_v7.xlsx** — 37 hojas, descargable, QA pasado:
- README_v7 | MARCAS | CONTEXTOS | DD_DATOS
- K>DiamondDetails (287 kw) | K>D7Herbal (24) | K>VizosCosmetics (48) | K>VivoseMask (24) | K>PatriciaOsorio (22) | K>NeuroneCosmetics (53) | K>ForumPHs (skeleton) | K>NeuroneSCF (skeleton)
- CTAs (55 total = 47 originales + 8 Patricia Osorio generados)
- GeoMix_DiamondDetails | GeoMix_D7Herbal
- Output_Templates (16 completos) | Canal_Blocks (14 completos)
- Delivery_Format_Blocks | Compliance_Rules | HUMANIZE (PascalCase)
- Channel_Prompt_Rules | UI_Workflow_Catalog | UI_Prompt_Catalog | UI_Canal_Catalog | UI_Field_Dictionary
- PersonBlueprints | LocationBlueprints | IMAGELAB_PRESETS | Meta_ES | Meta_VAL
- DV_Idiomas (8) | DV_Formatos | DV_IMAGELAB | DV_VIDEOLAB | DV_VOICELAB
- Brand_Languages (NEW — 19 entries) | Brand_Services (NEW — 39 entries)

---

#### 2. SUPABASE MIGRACIÓN v7 — ESTADO

**Proyecto:** `amlvyycfepwhiindxgzw` (unrlvl-db)

**FASE 1 ✅ — DDL:**
- `brands`: 75 columnas (añadidas: geo_principal, tono_base, canal_base, canales_activos, formatos_activos, cta_base, cta_ab_testing, cta_ads, disclaimer_base, url_base, cta_url_base, diferenciador_base, buyer_persona, problema, beneficio, objecion, prueba, imagelab_* ×11, videolab_* ×7, voicelab_* ×8)
- `keywords`: 15 columnas (añadidas: producto, servicio, prioridad)

**FASE 2 ✅ — Tablas nuevas:**
- `brand_languages` — idiomas disponibles por marca (RLS + GRANT anon)
- `brand_services` — productos/servicios por marca (RLS + GRANT anon)
- `channel_prompt_rules` — mapeo canal↔prompt (RLS + GRANT anon)
- `seo_meta` — metas SEO por servicio/idioma (RLS + GRANT anon)

**FASE 3 ✅ — Textos completos:**
- `output_templates`: 16 templates en v7.0 con textos completos (1370-2082 chars). BRANDHUB_HTML insertado por primera vez. 6 legacy stubs permanecen (Brand_Kit_Copy, Email_Campaign, Landing_Page_Full, Product_Description, Reels_Script, Stories_Pack — versión 1.0, no migrar)
- `canal_blocks`: 14 blocks en v7.0 con textos completos (687-2270 chars). BRANDHUB_HTML nuevo. 3 legacy (ECOMMERCE, EMAIL, OMNICANAL — versión 1.0)

**FASE 4 ✅ — Datos brands:**
Todas las 10 marcas actualizadas con:
- `brand_context` (texto narrativo completo)
- `geo_principal`, `tono_base`, `canal_base`, `canales_activos`, `formatos_activos`
- `cta_base`, `cta_ab_testing`, `cta_ads`, `disclaimer_base`, `diferenciador_base`
- `url_base`, `cta_url_base` (donde aplica)
- `imagelab_*`: industry, visual_identity, realism_level, film_look, lens_preset, depth_of_field, framing, skin_detail, imperfections, humidity_level, grain_level, requires_product_lock, compliance_rules
- `videolab_*`: motion_style_default, duration_default, aspect_ratio, music_mood, model_preferred (kling), cut_rhythm, compliance_rules
- `voicelab_*`: voice_id (TBD_*), language, speed_default, emotion_base, model_preferred=**tenzorart**, format_default, script_style, compliance_rules

**FASE 5 🔄 — Keywords producto/servicio/prioridad:**
```
✅ D7Herbal:              24/24
✅ VivoseMask:            24/24
✅ PatriciaOsorioPersonal: 22/22
✅ VizosCosmetics:         48/48
⏳ NeuroneCosmetics:       0/53   ← PENDIENTE
⏳ DiamondDetails:         0/273  ← PENDIENTE (preparado en 4 batches de ~95)
```
SQL preparado en `/home/claude/kw_exec_NeuroneCosmetics.sql` y `/home/claude/kw_DD_batch0-3.sql`

**FASE 6 ⏳ — HUMANIZE brand_ids:**
Verificado: ya están en PascalCase en Supabase (0 camelCase encontrados). ✅ No requiere acción.

**FASE 7 ⏳ — Poblar tablas nuevas:**
- `brand_languages`: 0/19 entries pendientes
- `brand_services`: 0/39 entries pendientes
- `channel_prompt_rules`: 0/39 entries pendientes
- CTAs Patricia Osorio: 8 CTAs nuevos generados, pendientes de INSERT

---

#### 3. COPYLAB — MEJORAS DE HOY

**Auditor corregido:**
- Fix SyntaxError línea 527 (comillas sin escapar en viewFile onclick)
- Límite de 30 archivos eliminado → ahora indexa todos sin límite
- Contenido cargado on-demand (click en archivo o búsqueda) — no upfront
- `doSearch` ahora async con loading indicator

**CopyLab UI refactorizada — flujo correcto:**
`Customize (setup) → CopyPack (generar) → Tools (refinar)`

Archivos modificados y deployados (READY en Vercel):
- `src/state/sessionStore.ts` — Zustand store global compartido entre todos los módulos (sessionStorage)
  - Campos: activeBrandId, activeLanguage, activePackId, activeServicio, activeKeywords, activeTone, activeOutputFormat, activeExtraContext, customizeOptions, sessionOutputs
  - CustomizeOptions incluye: compliance_mode, variant_style, include_hashtags/emojis/cta, extra_notes
  - VARIANT_TEMPERATURE: conservative=0.5, balanced=0.8, creative=1.0
- `src/modules/customize/CopyCustomizeModule.tsx` — PRIMER TAB. Setup completo: marca+idioma+pack, producto/servicio (requerido), contexto adicional, keywords, tono/formato, social options, compliance, variant style, extra instructions
- `src/modules/promptpack/CopyPackModule.tsx` — Lee toda la config del sessionStore. Muestra panel read-only de config activa. Sin selectores duplicados.
- `src/modules/tools/CopyToolsModule.tsx` — Session store + botón "← Usar último output de CopyPack"
- `src/hooks/useChannelBlocks.ts` — canal_blocks desde Supabase (reemplaza CHANNEL_BLOCKS hardcoded)
- `src/services/promptpack.ts` — acepta `extraNotes` desde Customize
- `src/services/copyEngine.ts` — retry en 429/503/529, temperatura capeada a 1.0
- `api/claude.ts` — retry en 429/503/529 en el proxy (3 reintentos + backoff exponencial)
- `src/lib/buildCopyPrompt.ts` — temperatura capeada a 1.0 (Claude API max), variables mapeadas correctamente
- `src/config/presets.ts` — restaurado (TONE_PRESETS + FORMAT_PRESETS — config UI estática)
- `src/config/packs.ts` — restaurado (COPY_PACKS — jobs del SMPC)
- `App.tsx` — Customize es primer tab. Flow hint `1→2→3` visible.

**Dead code eliminado de `src/config/`:**
brands.ts, channelBlocks.ts, copyTemplates.ts, customizeOutputs.ts, locationBlueprints.ts, personBlueprints.ts ✅

**RLS/GRANT fixes Supabase:**
- `brands` tabla: política `labs_read_active` ahora incluye rol `anon` explícitamente
- GRANT SELECT a anon + authenticated en 15 tablas (brands + todas las que CopyLab lee)

**Supabase columnas nuevas en `brands` (añadidas hoy):**
brand_context, brand_story, icp, key_messages, competitors, differentiators (añadidas en sesión anterior, ahora pobladas)

**Fixes 400/529:**
- Temperature 400 error: Claude API acepta máx 1.0. buildCopyPrompt.ts capeado con Math.min(..., 1.0)
- 529 overloaded_error: retry en copyEngine.ts (4 reintentos) + api/claude.ts (3 reintentos)

---

#### 4. ARQUITECTURA buildCopyPrompt — CORRECCIONES CRÍTICAS

**Mapa de variables template → columnas Supabase (v7):**
| Variable template | Columna Supabase |
|---|---|
| `{{marca}}` | `brands.display_name` ✅ |
| `{{contexto_marca}}` | `brands.brand_context` ✅ (poblado hoy) |
| `{{tono_base}}` | `brands.tono_base` ✅ (poblado hoy) |
| `{{geo_principal}}` | `brands.geo_principal` ✅ (poblado hoy) |
| `{{canal_base}}` | `brands.canal_base` ✅ (poblado hoy) |
| `{{canales_activos}}` | `brands.canales_activos` ✅ (poblado hoy) |
| `{{formatos_activos}}` | `brands.formatos_activos` ✅ (poblado hoy) |
| `{{cta_base}}` | `brands.cta_base` ✅ (poblado hoy) |
| `{{idioma}}` | input user / brand_languages ⏳ |
| `{{producto}}` | input user / brand_services ⏳ |
| `{{servicio}}` | input user / brand_services ⏳ |
| `{{keyword_principal}}` | `keywords` WHERE prioridad=1 AND servicio=X ✅ (con nueva col) |
| `{{keyword}}` (grupo_3) | top 3 keywords por servicio ✅ (con nueva col) |

**PENDIENTE en buildCopyPrompt.ts:**
Actualizar `queries.ts` y `buildCopyPrompt.ts` para usar los nuevos campos (brand_context, geo_principal, tono_base, cta_base, canales_activos, formatos_activos) y filtrar keywords por producto+servicio+prioridad.

---

### ⏳ PENDIENTE PRÓXIMA SESIÓN

**SUPABASE — Migración v7 incompleta:**
1. **Fase 5 restante** — Keywords NeuroneCosmetics (53) y DiamondDetails (273 en 4 batches)
   - Archivos SQL listos en `/home/claude/kw_exec_NeuroneCosmetics.sql` y `kw_DD_batch0-3.sql`
   - Ejecutar via Supabase MCP execute_sql
2. **Fase 7** — Poblar tablas nuevas:
   - `brand_languages` (19 entries — datos en DB_V7 hoja Brand_Languages)
   - `brand_services` (39 entries — datos en DB_V7 hoja Brand_Services)
   - `channel_prompt_rules` (39 rules — datos en DB_V7 hoja Channel_Prompt_Rules)
   - CTAs Patricia Osorio (8 nuevos — datos en DB_V7 hoja CTAs, filas 48-55)
3. **buildCopyPrompt.ts actualizar** — usar nuevos campos de brands + filtrar keywords por producto/servicio/prioridad
4. **queries.ts actualizar** — incluir brand_context, geo_principal, tono_base, cta_base, canales_activos, formatos_activos en fetchBrandContext()

**COPYLAB:**
- Brand OnBoarding App (standalone, multimarca) — para ForumPHs, NeuroneSCF y nuevas marcas
- `brand_palette` y `brand_typography` — poblar hexes y fuentes por marca (tablas vacías)
- VoiceLab: configurar voces reales en TenzorArt

---

## 2026-03-26 — CopyLab Fase 5b COMPLETA + Decisiones de Arquitectura

### ✅ COMPLETADO HOY

**CopyLab — Migración completa Gemini → Claude + Supabase (Fase 5b)**

Stack completo en producción. Flujo activo:
`UI → runCopyPack → generateCopyFromInput → fetchBrandContext (Supabase) → /api/claude → Claude Sonnet 4 → output con compliance check`

Archivos nuevos/modificados en repo CopyLab:
- `src/lib/db/types.ts` — BrandContext completo desde schema Supabase real
- `src/lib/queries.ts` — fetchBrandContext() con 18 queries en paralelo
- `src/lib/buildCopyPrompt.ts` — SMPC completo con temperatura por tipo de output
- `src/hooks/useCopyPrompt.ts` — hook React estados idle/loading_context/generating/done/error
- `src/hooks/useBrands.ts` — marcas desde Supabase (reemplaza BRANDS hardcoded)
- `src/services/promptpack.ts` — runCopyPack conectado a Supabase+Claude (reemplaza Gemini)
- `src/core/copyEngine.ts` — Gemini eliminado, apunta a /api/claude
- `src/modules/promptpack/CopyPackModule.tsx` — usa useBrands hook
- `api/claude.ts` — proxy serverless Vercel, ANTHROPIC_API_KEY en env vars
- `package.json` — @google/genai eliminado

Último commit verificado: `a11860f` · READY en producción.

**Ecosystem Auditor mejorado**
- Campo PAT en UI (no hardcodeado)
- Scan repo individual (botón hover en sidebar)
- File Browser con agrupación por carpetas
- Search full-text en todos los repos escaneados

### 🎯 DECISIONES ARQUITECTÓNICAS TOMADAS

**AI Engine por lab (definitivo):**
- CopyLab → Claude Sonnet 4 ✅ activo
- SocialLab → Claude Sonnet 4 (cuando se construya)
- AgentLab → Claude Sonnet 4 (ya era)
- BlueprintLab → Gemini 2.0 Flash (mantener — JSON estructurado, no lenguaje de marca)
- ImageLab → ComfyUI FLUX / fal.ai (no aplica LLM)
- VideoLab → HeyGen / Kling (no aplica LLM)
- VoiceLab → TenzorArt (reemplaza ElevenLabs — decisión de hoy)

**Creativity Protection — temperatura implementada:**
- Conversión directa: 0.5 | Orgánico/social: capeado 1.0 | Discovery/branding: capeado 1.0
- Implementado en buildCopyPrompt.ts ✅

---

## 2026-03-25 — Supabase Fases 1-5 infra + Context System

_Ver entradas anteriores..._
