# SKILL — copylab-reference v1.0
_UNRLVL CopyLab · Templates · Canal Blocks · BP_COPY · Humanize_
_Versión: 1.0 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Este skill se activa en cualquier sesión de generación de copy:
- Crear contenido para redes sociales, ads, email, web, YouTube
- Modificar o crear templates en Supabase
- Configurar BP_COPY_1.0 para una marca nueva
- Cualquier trabajo en CopyLab

**Antes de generar:** Identificar `brand_id`, `template_id`, `canal_block_id` y `idioma`. Si alguno falta, preguntar antes de empezar.

---

## SECCIÓN 1 — ARQUITECTURA DE COPYLAB

### Pipeline completo

```
BP_COPY_1.0 (voz de marca desde Supabase)
    +
brand_copy_profiles (tono, estilo, emojis, longitud)
    +
humanize_profiles (personalidad por medio)
    ↓
[Input de Sam: producto/servicio/objetivo]
    ↓
output_template (estructura del output)
    ↓
canal_block (restricciones del canal)
    ↓
GeoMix (variaciones geográficas si aplica)
    ↓
keywords (inyección SEO/copy si aplica)
    ↓
psycho_preset (estímulo psicológico si aplica)
    ↓
GENERACIÓN (modo AGGRO — estándar base de UNRLVL)
    ↓
Humanize F2.5 (siempre — aplica voz y tono de marca)
    ↓
AIFE (cuando el output va público — ver SKILL aife)
    ↓
ICR — validación final
    ↓
OUTPUT
```

### Modo AGGRO — el estándar

AGGRO es la intensidad base de todo copy generado por UNRLVL. No es un modo "agresivo" en sentido negativo — es copy con convicción, directo, sin hedging, sin relleno. Todo output sale en modo AGGRO por defecto.

Humanize F2.5 trabaja **sobre** el output AGGRO, aplicando la voz específica de la marca sin suavizar la convicción central. No compiten — son capas secuenciales.

```
AGGRO genera: convicción + directness + zero relleno
Humanize aplica: voz de marca + tono + personalidad
AIFE finaliza: elimina huellas estructurales AI (cuando aplica)
```

---

## SECCIÓN 2 — TEMPLATES (output_templates en Supabase)

### Catálogo completo activo

| ID | Nombre | Categoría | Plataformas | Words |
|---|---|---|---|---|
| `SMPC_full` | SMPC Full | smpc | meta, instagram, tiktok, facebook | 80–300 |
| `Ads_FullPro` | Ads Full Pro | ads | google, meta, tiktok | — |
| `SEO_FullPro` | SEO Full Pro | seo | web, blog | 600–1200 |
| `SEO_Brand_FullPro` | SEO Brand Full Pro | seo | web, landing | 200–800 |
| `Landing_Page_Full` | Landing Page Full | landing | web, landing | 400–1000 |
| `Email_Campaign` | Email Campaign | email | email | 200–600 |
| `Product_Description` | Product Description | ecommerce | shopify, woocommerce, web | 300–600 |
| `Brand_Kit_Copy` | Brand Kit Copy | brand | web, social, email | — |
| `Reels_Script` | Reels / TikTok Script | social | instagram, tiktok | — |
| `Stories_Pack` | Stories Pack | social | instagram, tiktok, facebook | — |
| `YouTube_ScriptLong` | YouTube Script Long | youtube | youtube | 800–3000 |
| `YouTube_ScriptShort` | YouTube Script Short | youtube | youtube | 100–400 |
| `YouTube_Descriptions` | YouTube Descriptions | youtube | youtube | 150–500 |
| `YouTube_Titles` | YouTube Titles | youtube | youtube | — |
| `YouTube_Thumbnails` | YouTube Thumbnails | youtube | youtube | — |
| `YouTube_Ideas` | YouTube Ideas | youtube | youtube | — |
| `Organic_FullPro` | Organic Full Pro | — | — | — |
| `Social_Strategy_30D` | Social Strategy 30 Days | — | — | — |
| `Social_Week1_Execution_Pack` | Social Week 1 Execution Pack | — | — | — |
| `BrandKit_Fast` | Brand Kit Fast | — | — | — |
| `DM_Script_Service` | DM Script Service | — | — | — |
| `Service_Page_Fast` | Service Page Fast | — | — | — |

### Cuándo usar qué template

| Objetivo | Template recomendado |
|---|---|
| Post orgánico Instagram/TikTok/Meta | `SMPC_full` |
| Campaña de ads Google + Meta + TikTok | `Ads_FullPro` |
| Artículo SEO con keyword target | `SEO_FullPro` |
| Página de marca con SEO | `SEO_Brand_FullPro` |
| Landing page de campaña o producto | `Landing_Page_Full` |
| Email marketing / newsletter | `Email_Campaign` |
| Ficha de producto para Shopify | `Product_Description` |
| Kit completo de copy de marca | `Brand_Kit_Copy` |
| Script para Reels o TikTok | `Reels_Script` |
| Pack de stories (3-5 slides) | `Stories_Pack` |
| Script video YouTube largo (educativo) | `YouTube_ScriptLong` |
| Script video YouTube corto (< 2 min) | `YouTube_ScriptShort` |
| Estrategia de contenido 30 días | `Social_Strategy_30D` |
| Plan de ejecución semana 1 | `Social_Week1_Execution_Pack` |

### Cómo leer un template desde Supabase

```sql
SELECT id, name, template_text, variables, applies_to, platforms
FROM public.output_templates
WHERE id = '[template_id]' AND active = true;
```

### Cómo modificar un template (protocolo)

1. Leer template actual completo
2. Identificar qué campo cambia (`template_text`, `variables`, `platforms`)
3. Mostrar diff a Sam antes de ejecutar
4. Sam aprueba
5. Ejecutar UPDATE con campo específico — nunca reemplazar el row completo
6. Verificar que `version` se incrementa

```sql
UPDATE public.output_templates
SET template_text = '[nuevo texto]',
    version = '8.0'
WHERE id = '[template_id]';
```

---

## SECCIÓN 3 — CANAL BLOCKS (canal_blocks en Supabase)

Los canal blocks definen las restricciones del canal: límite de caracteres, tono modifier, formato.

### Catálogo completo activo

| ID | Canal | Formato | Char limit | Tone modifier |
|---|---|---|---|---|
| `INSTAGRAM_ORGANICO` | instagram | feed_reels_stories | 2200 | lifestyle_aspiracional |
| `TIKTOK_ORGANICO` | tiktok | video_organico | 150 | autentico_tendencia |
| `TIKTOK_ADS` | tiktok | video_ad | 100 | energia_autentica |
| `META_ADS` | meta | ad_feed_story | 125 | persuasion_emocional |
| `GOOGLE_SEARCH_RSA` | google | rsa | 30 | intención_busqueda |
| `GOOGLE_PMAX` | google | pmax | 90 | omnicanal_adaptable |
| `EMAIL` | email | newsletter_promo | 200 | personal_directa |
| `BLOG` | web | articulo_blog | 1500 | educativa_cercana |
| `WEB` | web | articulo_pagina | — | autoridad_informativa |
| `LANDING_PAGE` | web | landing | — | conversion_directa |
| `ECOMMERCE` | ecommerce | ficha_producto | — | conversion_informativa |
| `YOUTUBE` | youtube | video_organico | 5000 | educativa_entretenimiento |
| `OMNICANAL` | multiple | adaptable | — | mensaje_core |
| `BLOG_HTML` | blog | — | — | — |
| `LANDING_HTML` | landing | — | — | — |
| `WEB_HTML` | web | — | — | — |
| `BRANDHUB_HTML` | web | — | — | — |

### Cómo aplicar un canal block

El canal block se aplica después del template pero antes de Humanize:
- Verificar que el output no excede `char_limit`
- Aplicar `tone_modifier` como capa adicional sobre el copy generado
- Para canales con char_limit estricto (Google RSA 30 chars, TikTok Ads 100): generar múltiples variaciones

```sql
SELECT id, name, char_limit, tone_modifier, restrictions, media_types, aspect_ratios
FROM public.canal_blocks
WHERE id = '[canal_block_id]' AND active = true;
```

---

## SECCIÓN 4 — HUMANIZE F2.5

Humanize se aplica siempre después de AGGRO. Carga el perfil de la marca desde `humanize_profiles` en Supabase.

### Perfiles activos

| brand_id | Medio | Tono | Sentence style | Personalidad |
|---|---|---|---|---|
| `DEFAULT` | copy | Auténtico, directo, humano. Varía entre cercano y experto según el medio | Alterna frases cortas (impacto) con largas. Párrafos max 3-4 líneas | Experto que habla como amigo de confianza |
| `DEFAULT` | image | Visual auténtico. Imperfección deliberada | — | Fotógrafo de calle, no de estudio |
| `DEFAULT` | video | Movimiento orgánico. Handheld sobre gimbal | — | Documentalista, no director de publicidad |
| `DEFAULT` | voice | Velocidad variable. Micro-hesitaciones naturales | — | Locutor que piensa mientras habla |
| `DEFAULT` | web | Conversacional. Segunda persona directa | Párrafos max 3-4 líneas. Headlines como frases reales | — |
| `NeuroneSCF` | copy | Científico-accesible. Bilingual ES/EN. Autoridad técnica con calidez latina | B2C: emocional primero, técnico después. B2B: dato primero, beneficio después | Patricia Osorio: experta en colorimetría, distribuidora exclusiva, conoce Miami desde adentro |

### Carga del perfil

```sql
-- Buscar perfil de la marca, fallback a DEFAULT si no existe
SELECT tone, sentence_style, personality, vocabulary_include,
       vocabulary_exclude, anti_patterns, authenticity_rules
FROM public.humanize_profiles
WHERE (brand_id = '[brand_id]' OR brand_id = 'DEFAULT')
  AND medium = '[copy|image|video|voice|web]'
ORDER BY brand_id DESC  -- marca específica tiene precedencia sobre DEFAULT
LIMIT 1;
```

---

## SECCIÓN 5 — BP_COPY_1.0 (brand_copy_profiles)

BP_COPY_1.0 es la capa más profunda — define la voz de la marca a nivel estructural.

### Perfiles activos

| ID | brand_id | Status | Tono primario | Writing style | Sentence length | Emojis |
|---|---|---|---|---|---|---|
| `copy_diamond` | DiamondDetails | active | authoritative | TECHNICAL_EXPERT | mixed | minimal |
| `copy_d7herbal` | D7Herbal | active | warm | NATURAL_EXPERT | mixed | minimal |
| `copy_po_personal` | PatriciaOsorioPersonal | active | authoritative | AUTHORITY_EDU | mixed | moderate |
| `copy_po_comunidad` | PatriciaOsorioComunidad | active | warm | COMMUNITY_MOTIVATOR | short | moderate |
| `copy_po_salon` | PatriciaOsorioVizosSalon | active | authoritative | LUXURY_EXPERT | mixed | minimal |
| `copy_vivose` | VivoseMask | active | warm | SENSORIAL_BEAUTY | short | moderate |
| `copy_vizos_cosmetics` | VizosCosmetics | active | authoritative | LAB_PREMIUM | mixed | none |

### Writing styles disponibles

| Style | Descripción | Cuándo |
|---|---|---|
| `TECHNICAL_EXPERT` | Datos, especificaciones, autoridad técnica | Marcas con diferenciador técnico |
| `NATURAL_EXPERT` | Saber que suena a experiencia vivida | Herbal, wellness, lifestyle |
| `AUTHORITY_EDU` | Autoridad que educa, no que vende | Personal brands, thought leadership |
| `COMMUNITY_MOTIVATOR` | Energía de comunidad, motivación, pertenencia | Marcas sociales, coaches |
| `LUXURY_EXPERT` | Precisión + exclusividad, nunca masivo | Salones premium, beauty luxury |
| `SENSORIAL_BEAUTY` | Evocador, sensorial, experiencial | Beauty, skincare, fragrance |
| `LAB_PREMIUM` | Laboratorio + premium, cero palabrería | Cosméticos clínicos, dermo |

### Marcas SIN BP_COPY_1.0 activo

NeuroneSCF, ForumPHs, UnrealvilleStudio — usan DEFAULT de Humanize hasta que se complete su BP_COPY_1.0.

### Carga de BP_COPY

```sql
SELECT voice_tone_primary, voice_tone_secondary, voice_writing_style,
       voice_pov, language_primary, style_sentence_length, style_emoji_usage,
       style_hooks, style_signature_phrases, style_avoid_phrases,
       compliance_rules, compliance_prohibited_words
FROM public.brand_copy_profiles
WHERE brand_id = '[brand_id]' AND active = true
LIMIT 1;
```

---

## SECCIÓN 6 — KEYWORDS E IDIOMAS

### Keywords por marca

```sql
SELECT keyword, type, intent, canal, language
FROM public.keywords
WHERE brand_id = '[brand_id]'
  AND active = true
  AND language = '[es|en]'
ORDER BY prioridad ASC NULLS LAST, type;
```

### Idiomas por marca

```sql
SELECT idioma_id, mercado, is_primary
FROM public.brand_languages
WHERE brand_id = '[brand_id]' AND active = true
ORDER BY is_primary DESC;
```

### Idiomas y bilinguismo

- NeuroneSCF: ES (primario) + EN (Miami market) — Spanglish controlado en B2C
- DiamondDetails: ES (primario) — mercado España
- Patricia Osorio: ES (primario) + EN (comunidad Miami)
- ForumPHs: ES (Panamá)
- UnrealvilleStudio: EN (primario) + ES (LATAM)

---

## SECCIÓN 7 — CHECKLIST ICR PRE-GENERACIÓN

Antes de generar cualquier copy:

- [ ] `brand_id` identificado
- [ ] `template_id` seleccionado según objetivo
- [ ] `canal_block_id` identificado (canal de destino)
- [ ] Idioma confirmado
- [ ] BP_COPY_1.0 cargado (o confirmado que usa DEFAULT)
- [ ] Humanize profile cargado para el medio
- [ ] Keywords relevantes cargadas (si aplica SEO/copy)
- [ ] Psycho preset seleccionado (si aplica)
- [ ] AGGRO como modo base — sin hedging, sin relleno
- [ ] Humanize F2.5 aplicado post-generación
- [ ] AIFE aplicado si el output va público

---

_SKILL copylab-reference v1.0 · Unreal>ille Studio · CopyLab v8.0_
_AGGRO = estándar base · Humanize = capa universal · AIFE = filtro público_
