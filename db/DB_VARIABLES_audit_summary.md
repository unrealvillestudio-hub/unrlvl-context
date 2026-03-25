# DB_VARIABLES v6_4 — Audit Summary
**Fecha:** 2026-03-25 · **Hojas totales:** 40 · **Estado:** FROZEN — pendiente migración a Supabase  
**Fuente:** Lectura completa del archivo DB_VARIABLES_v6_4.xlsx

---

## Hojas y su mapeo a tablas Supabase

| Hoja | Contenido clave | Tabla(s) Supabase |
|---|---|---|
| `Marcas` | 8 marcas × 44 columnas (identidad, imagelab, videolab, voicelab) | `brands`, `imagelab_presets`, `videolab_params`, `voicelab_params` |
| `HUMANIZE` | 5 DEFAULTs × 5 mediums + overrides por marca | `humanize_profiles` |
| `Compliance_Rules` | Reglas globales de compliance | `compliance_rules` |
| `Output_Templates` | 16 templates SMPC completos | `output_templates` |
| `Canal_Blocks` | 13 bloques de canal con block_text completo | `canal_blocks` |
| `CTAs` | CTAs por marca × servicio (smpc, ads, seo, story, spot, ab1, ab2, ultrashort) | `ctas` |
| `IMAGELAB_PRESETS` | 7 presets globales por canal (W0101, L0101, L0201, M0101, M0201, T0101, T0201) | `imagelab_presets` |
| `PersonBlueprints` | 4 personas: po_patricia, dd_host_01, vizos_host_01, d7h_host_01 | `person_blueprints` |
| `LocationBlueprints` | 4 locaciones: loc_po_salon_miami, loc_po_miami_beach, loc_po_downtown_miami, loc_dd_cabinas | `location_blueprints` |
| `DD_GeoMix` | GeoMix Diamond Details (Alicante, CV, Med Alicantino, Med Valenciano) | `geomix` |
| `D7H_GeoMix` | GeoMix D7Herbal (Alicante, CV, Med Alicantino, Med Valenciano) | `geomix` |
| `DB_K` | Keywords consolidadas todas las marcas | `keywords` |
| `K>Diamond` | Keywords Diamond Details + prompts SMPC/Ads/SEO pre-ensamblados | `keywords` |
| `K>Vizos` | Keywords Vizos Cosmetics + prompts | `keywords` |
| `K>D7Herbal` | Keywords D7Herbal + prompts SMPC/Ads/SEO/Brand/YouTube completos | `keywords` |
| `K>Vivosé` | Keywords Vivosé Mask + prompts parciales | `keywords` |
| `K>Neurone` | Keywords Neurone Cosmética (es-FL + EN) — solo INSTAGRAM_ORGANICO | `keywords` |
| `K>PO` | Keywords Patricia Osorio — solo INSTAGRAM_ORGANICO, prompts SMPC/Ads incompletos | `keywords` |
| `CONTEXTOS` | Contextos de marca en texto libre (Vizos, D7H, VivoseMask, Diamond) | `brands.positioning` |
| `DV_VOICELAB` | Valores válidos: Language, Emotion, Speed, Model, Format, ScriptStyle, PackType | referencia para `voicelab_params` |
| `DV_VIDEOLAB` | Valores válidos: MotionStyle, Duration, AspectRatio, MusicMood, Model, CutRhythm, PackType | referencia para `videolab_params` |
| `DV_IMAGELAB` | Valores válidos para imagelab params | referencia para `imagelab_presets` |
| `DV_Canales` | Valores válidos de canales | referencia para `canal_blocks` |
| `DV_Formatos` | Valores válidos de formatos | referencia para `videolab_params` |
| `DV_Idiomas` | Valores válidos de idiomas | referencia general |
| `Meta_VAL`, `Meta_ES` | Meta titles/descriptions para servicios Diamond Details | `keywords` o `page_sections` |
| `Delivery_Format_Blocks` | Bloques de formato de entrega | parte de `canal_blocks` |
| `Channel_Prompt_Rules/Lists/Map` | Reglas de prompt por canal | parte de `canal_blocks` |
| `APPSCRIPT_v2`, `README_v2` | Documentación interna | no migrar |
| `UI_Prompt`, `UI_Field_Dictionary`, `UI_Prompt_Catalog`, `UI_Canal_Catalog`, `UI_Workflow_Catalog`, `UI_DV` | UI del Google Sheets | no migrar — reemplazado por Supabase Studio |

---

## Observaciones críticas del escaneo

1. **voice_id = TBD_*** en TODAS las marcas → VoiceLab 100% bloqueado
2. **has_reference_photos = false** en todos los PersonBlueprints y LocationBlueprints
3. **K>PO incompleto** — Patricia Osorio solo tiene keywords de Instagram Orgánico, sin prompts SMPC/Ads completos
4. **GeoMix** solo existe para DiamondDetails y D7Herbal — falta para VizosCosmetics, Patricia Osorio*, Neurone, VivoseMask
5. **Patricia Osorio** usa brand_id genérico `PatriciaOsorio` en DB_VARIABLES — debe normalizarse a 3 IDs canónicos: `PatriciaOsorioPersonal`, `PatriciaOsorioComunidad`, `PatriciaOsorioVizosSalon`
6. **Neurone Cosmética** usa idioma mixto es-FL + EN (bilingual Miami) — único caso en el ecosistema
7. **BP_COPY_1.0** existe en BlueprintLab pero NO está documentado en DB_VARIABLES — gap crítico, añadir en `blueprint_schemas`
8. **K>Diamond** tiene prompts YouTube completos (Ideas, Titles, Thumbnails, Descriptions, ScriptShort, ScriptLong) — las otras marcas no
9. **Compliance_Rules** global es una sola regla genérica — las reglas específicas están en la columna `imagelab_compliance_rules` de la hoja Marcas (hardcodeadas por marca)
10. **HUMANIZE** tiene 5 DEFAULTs en la hoja + overrides embebidos en columnas de Marcas — hay que extraer ambos

---

## Brand IDs canónicos en DB_VARIABLES v6_4

| ID en DB_VARIABLES | ID canónico Supabase | Nota |
|---|---|---|
| `Diamond Details` | `DiamondDetails` | |
| `Vizos Cosmetics` | `VizosCosmetics` | |
| `D7Herbal` | `D7Herbal` | |
| `Vivosé Mask` | `VivoseMask` | |
| `PatriciaOsorio` | `PatriciaOsorioPersonal` + `PatriciaOsorioComunidad` + `PatriciaOsorioVizosSalon` | Normalizar en Supabase |
| `Neurone Cosmética` | `NeuroneCosmetics` | |
| `MASTER` | `MASTER` | Template base |

---

## Plan de seeds por fase

| Fase | Datos a migrar | Origen en DB_VARIABLES |
|---|---|---|
| **Fase 1** ✅ | 8 brands, 5 humanize DEFAULTs, 11 compliance rules, 7 imagelab presets globales | Hojas: Marcas, HUMANIZE, Compliance_Rules, IMAGELAB_PRESETS |
| **Fase 2** | 16 output_templates, 13 canal_blocks, CTAs por marca, keywords todas las marcas | Hojas: Output_Templates, Canal_Blocks, CTAs, DB_K, K>* |
| **Fase 3** | videolab_params por marca, voicelab_params por marca, geomix (DD + D7H existentes + crear 4 nuevos), brand_palette, brand_typography | Hojas: Marcas (cols videolab/voicelab), DD_GeoMix, D7H_GeoMix |
| **Fase 4** | 4 person_blueprints, 4 location_blueprints, product_blueprints (D7Herbal, VivoseMask), blueprint_schemas | Hojas: PersonBlueprints, LocationBlueprints + BluePrints repo |
| **Fase 5** | Conectar labs — actualizar código de cada lab para leer de Supabase | — |

---
*Claude — Unreal>ille Studio · 2026-03-25 · unrlvl-context/db/DB_VARIABLES_audit_summary.md*
