# UNRLVL Session Log

---

## 2026-03-28 — NeuroneSCF Consolidación + Product Blueprints + CopyLab v7+Products + UX Fixes

### 1. Consolidación NeuroneSCF

- `NeuroneSCF` = brand_id canónico definitivo · E-commerce PO · neuronescflorida.com
- `NeuroneCosmetics` → ELIMINADO de Supabase y ecosystem (fabricante global, no nuestro cliente)
- `NeuroneSCF Supply Chain Finance` → ELIMINADO (invención de Claude)
- 11 tablas actualizadas: brands, keywords(53), brand_services(5), brand_languages(2), ctas(12), humanize_profiles(1), compliance_rules(2), voicelab_params(2), person_blueprints(1), location_blueprints(1)

### 2. product_blueprints — Schema Extendido

ALTER TABLE: 16 columnas nuevas (linea, line_family, b2b_only, barcode, size, is_variant, image_filename, image_dark_filename, description_en, description_es, msrp, shopify_visibility CHECK(public|b2b_only|hidden), cross_sell, hair_type, benefit_claims, related_skus JSONB). Índice brand_linea. Bucket `product-assets` creado en Supabase Storage (público, 10MB).

### 3. brand_palette + brand_typography NeuroneSCF

brand_palette: 11 entradas (5 corporativos + 6 líneas). brand_typography: PT Sans Narrow Bold + Montserrat.

### 4. brand_services — Correcciones item_type

- PatriciaOsorioVizosSalon: D7Herbal + VivoseMask añadidos (item_type=producto, es-FL)
- NeuroneSCF: Colorimetría Profesional, Tintes Profesionales, Tratamiento Capilar Pro → item_type='producto'

### 5. product_blueprints NeuroneSCF — 39 SKUs

| Línea | Skus | Públicos | B2B | Hidden |
|---|---|---|---|---|
| Color_Rescue | 7 | 7 | — | — |
| Moisture | 4 | 4 | — | — |
| Pro_Salon | 8 | — | 8 | — |
| Restore | 5 | 5 | — | — |
| Scalp | 6 | 3 | — | 3 |
| Styling | 9 | 9 | — | — |
| **Total** | **39** | **28** | **8** | **3** |

Hidden (compliance FDA): Capissen Lotion, Capissen Shampoo, Derma Roller.
Pendiente: imagen NCNEU-6 compartida entre Neurona Gloss y Neuroxide.

### 6. brand_languages NeuroneSCF

- `es-FL` Español (Florida) ★ primary
- `en-FL` English (Florida / USA)
- `SPANG` Spanglish Miami

### 7. CopyLab — Archivos actualizados (commit 2026-03-28)

Rutas en repo CopyLab:
- `src/lib/db/types.ts` — item_type en BrandService + interfaz ProductBlueprint completa
- `src/lib/queries.ts` — fetchProductCatalog(brandId, linea?) añadida
- `src/modules/customize/CopyCustomizeModule.tsx` — rediseño completo UX (ver abajo)
- `src/services/promptpack.ts` — selectedProductData inyectado en extraContext

**CopyCustomizeModule v3 — UX rediseñada:**
- Paso 1 — Colección/Servicio: optgroup con líneas del catálogo (💧 Moisture, 🔶 Restore, ✂️ Styling, 🟣 Color Rescue, 🌿 Scalp, ⭐ Pro Salon) + servicios puros + Otro (texto libre)
- Paso 2 — Producto: aparece solo cuando se elige una Colección, filtra productos de esa línea
- Idioma dinámico desde brand_languages (sin filtrar los servicios por idioma)
- useMemo en pureServices y productsInLine (fix React #185 loop infinito)
- fetchProductCatalog carga catálogo completo al cambiar marca (no por idioma)

### 8. Seguridad + Permisos

- RLS habilitado en `brands` table
- `update_updated_at()` search_path fijado
- `GRANT SELECT ON product_blueprints TO anon` (fix 401 en CopyLab)
- Advisor Center: 0 alertas

### 9. Ecosystem.json

- NeuroneCosmetics eliminado del array de brands
- NeuroneSCF actualizado: domain, market, product_catalog, _note
- Social Media Agent: serves_brand = NeuroneSCF confirmado
- CopyLab: modules_status y next_action actualizados

### Pendientes próxima sesión

1. Subir imágenes NeuroneSCF → Supabase Storage bucket `product-assets`
2. GeoMix: VizosCosmetics, PatriciaOsorio*, NeuroneSCF, VivoseMask
3. brand_palette + brand_typography otras marcas (datos pendientes de Sam)
4. VoiceLab: configurar voice IDs reales en TenzorArt
5. Brand OnBoarding App: ForumPHs, NeuroneSCF
6. Corregir imagen NCNEU-6 compartida (Neurona Gloss vs Neuroxide en repo BluePrints)
7. Validar CopyLab NeuroneSCF en producción con nuevo selector Colección → Producto

---

## 2026-03-27 — Supabase Migración v7

Migración DB_VARIABLES v6_4 → v7 → Supabase. Keywords DD(287)+NSCF(53). brand_languages(17)+brand_services(39)+channel_prompt_rules(39)+CTAs PO(8). CopyLab queries/buildCopyPrompt/types v7. Claude Sonnet 4 para todos los labs de lenguaje. TenzorArt reemplaza ElevenLabs. SMPC temp: 0.5/1.1/1.3. DB_VARIABLES FROZEN.

---
