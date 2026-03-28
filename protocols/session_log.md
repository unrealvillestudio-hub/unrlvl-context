# UNRLVL Session Log

---

## 2026-03-28 — NeuroneSCF Consolidación + Product Blueprints + CopyLab v7+Products

### 1. Consolidación NeuroneSCF

Clarificación definitiva del ecosystem:
- `NeuroneSCF` = brand_id canónico · E-commerce PO · neuronescflorida.com · South & Central Florida
- `NeuroneCosmetics` = fabricante global, NO es nuestro cliente → **ELIMINADO de Supabase y ecosystem**
- `NeuroneSCF (Supply Chain Finance)` = invención de Claude → **ELIMINADO**

Supabase migración completa: brands + keywords(53) + brand_services(5) + brand_languages(2) + ctas(12) + humanize_profiles(1) + compliance_rules(2) + voicelab_params(2) + person_blueprints(1) + location_blueprints(1) → todos apuntan a `NeuroneSCF` + `neuronescflorida.com`

### 2. product_blueprints — Schema v7 Extendido

ALTER TABLE: 16 columnas nuevas (linea, line_family, b2b_only, barcode, size, is_variant, image_filename, image_dark_filename, description_en, description_es, msrp, shopify_visibility, cross_sell, hair_type, benefit_claims, related_skus). Índice brand_linea. Bucket `product-assets` creado en Supabase Storage.

### 3. brand_palette + brand_typography NeuroneSCF

brand_palette: 11 entradas (5 corporativos + 6 líneas de producto). brand_typography: PT Sans Narrow Bold + Montserrat.

### 4. brand_services — Correcciones item_type

- PatriciaOsorioVizosSalon: D7Herbal + VivoseMask añadidos (item_type=producto)
- NeuroneSCF: Colorimetría Profesional, Tintes Profesionales, Tratamiento Capilar Pro → item_type='producto'

### 5. product_blueprints NeuroneSCF — 39 SKUs

Catálogo completo cargado desde BluePrints repo:

| Línea | Productos | Públicos | B2B | Hidden |
|---|---|---|---|---|
| Color_Rescue | 7 | 7 | — | — |
| Moisture | 4 | 4 | — | — |
| Pro_Salon | 8 | — | 8 | — |
| Restore | 5 | 5 | — | — |
| Scalp | 6 | 3 | — | 3 |
| Styling | 9 | 9 | — | — |
| **Total** | **39** | **28** | **8** | **3** |

Hidden (compliance FDA pendiente): Capissen Lotion, Capissen Shampoo, Derma Roller.
Pendiente: imagen NCNEU-6 compartida entre Neurona Gloss y Neuroxide — verificar.

### 6. CopyLab — 4 Archivos (commit 2026-03-28)

- `src/lib/db/types.ts` — item_type en BrandService + interfaz ProductBlueprint completa
- `src/lib/queries.ts` — fetchProductCatalog(brandId, linea?) añadida
- `src/modules/customize/CopyCustomizeModule.tsx` — idioma dinámico + servicio optgroup por item_type + selector SKU condicional agrupado por línea
- `src/services/promptpack.ts` — selectedProductData inyectado en extraContext

### 7. Seguridad

RLS habilitado en `brands`. update_updated_at() search_path fijado. Advisor Center: 0 alertas.

### 8. Diagnóstico CopyLab NeuroneSCF no visible

Causa: ecosystem.json tenía `"NeuroneCosmetics"` como brand_id. Fix: este commit actualiza ecosystem.json con `"NeuroneSCF"`.

### Pendientes
1. Subir imágenes NeuroneSCF → Supabase Storage bucket `product-assets`
2. GeoMix: VizosCosmetics, PatriciaOsorio*, NeuroneSCF, VivoseMask
3. brand_palette + brand_typography otras marcas
4. VoiceLab: voice IDs reales TenzorArt
5. Brand OnBoarding App: ForumPHs, NeuroneSCF
6. Corregir imagen NCNEU-6 compartida
7. Validar fetchProductCatalog CopyLab producción

---

## 2026-03-27 — Supabase Migración v7

Migración DB_VARIABLES v6_4 → v7 → Supabase. Keywords DD(287)+NC(53). brand_languages(19)+brand_services(39)+channel_prompt_rules(39)+CTAs PO(8). CopyLab queries/buildCopyPrompt/types v7. Claude Sonnet 4 para todos los labs de lenguaje. TenzorArt reemplaza ElevenLabs. SMPC temp: 0.5/1.1/1.3. DB_VARIABLES FROZEN.

---
