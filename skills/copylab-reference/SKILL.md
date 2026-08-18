# SKILL — copylab-reference v1.1
_UNRLVL CopyLab · Templates · Canal Blocks · BP_COPY · Humanize_
_Versión: 1.1 · 2026-05-18_

**Cambios v1.1:**
- Voz de PO actualizada: 35+ años Técnica en química capilar · Vizos Cosmetics - The Healing Systems · Vizos Salón · 3 continentes · no "colorista"
- NeuroneSCF B2C: personas actualizadas — 7 segmentos por tipo de dolor, sin calificador étnico
- Humanize F2.5 NeuroneSCF: tono diagnóstico-prescriptivo. Protagonista: tu cabello / your hair

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
AIFE (cuando el output va público)
    ↓
ICR — validación final
    ↓
OUTPUT
```

### Modo AGGRO — el estándar

AGGRO es la intensidad base de todo copy generado por UNRLVL. Copy con convicción, directo, sin hedging, sin relleno. Todo output sale en modo AGGRO por defecto.

Humanize F2.5 trabaja sobre el output AGGRO, aplicando la voz específica de la marca. No compiten — son capas secuenciales.

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

---

## SECCIÓN 3 — CANAL BLOCKS (canal_blocks en Supabase)

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

---

## SECCIÓN 4 — HUMANIZE F2.5

### Perfiles activos

| brand_id | Medio | Tono | Personalidad |
|---|---|---|---|
| `DEFAULT` | copy | Auténtico, directo, humano | Experto que habla como amigo de confianza |
| `DEFAULT` | image | Visual auténtico. Imperfección deliberada | Fotógrafo de calle, no de estudio |
| `DEFAULT` | video | Movimiento orgánico. Handheld sobre gimbal | Documentalista, no director de publicidad |
| `DEFAULT` | voice | Velocidad variable. Micro-hesitaciones naturales | Locutor que piensa mientras habla |
| `DEFAULT` | web | Conversacional. Segunda persona directa | — |
| `NeuroneSCF` | copy | Diagnóstico-prescriptivo con cercanía de amistad. Protagonista: tu cabello / your hair. Bilingüe ES/EN es estrategia de canal, no propiedad del tono | **Patricia Osorio** — Técnica en química capilar con 35+ años de trayectoria. Fundadora de Vizos Cosmetics - The Healing Systems, Casa Diseñadora de Belleza Capilar. Diseñadora de los Rituals & Kits de Neurone. Trabajó con las marcas más importantes del sector en 3 continentes entrenando profesionales. Propietaria de Vizos Salón en South Florida. Su voz nunca explica propiedades ni mecanismos — observa el cabello, identifica el problema con autoridad, y presenta la solución directamente como una amiga experta en el salón. No vende el producto. Resuelve el problema. |

### Anti-patterns NeuroneSCF

- Iniciar desde el producto en vez del problema observado
- Explicar mecanismos técnicos sin ancla en la experiencia del cliente
- Copy genérico de haircare que ignore el contexto climático de Florida
- Calificativos étnicos o culturales que restrinjan el alcance de la audiencia
- Tono de vendedora — PO ayuda, no vende
- Promesas de servicio sin respaldo operativo
- Traducir ES al EN o viceversa — cada versión nace en su idioma

### Regla de autenticidad NeuroneSCF

Nunca iniciar desde el producto. Siempre desde la observación del problema. La solución se presenta como consecuencia natural del diagnóstico. Estructura canónica: "esto es lo que le pasa a tu cabello... esto es lo que necesita."

---

## SECCIÓN 5 — BP_COPY_1.0 (brand_copy_profiles)

### Perfiles activos

| ID | brand_id | Tono primario | Writing style |
|---|---|---|---|
| `copy_diamond` | DiamondDetails | authoritative | TECHNICAL_EXPERT |
| `copy_d7herbal` | D7Herbal | warm | NATURAL_EXPERT |
| `copy_po_personal` | PatriciaOsorioPersonal | authoritative | AUTHORITY_EDU |
| `copy_po_comunidad` | PatriciaOsorioComunidad | warm | COMMUNITY_MOTIVATOR |
| `copy_po_salon` | PatriciaOsorioVizosSalon | authoritative | LUXURY_EXPERT |
| `copy_vivose` | VivoseMask | warm | SENSORIAL_BEAUTY |
| `copy_vizos_cosmetics` | VizosCosmetics | authoritative | LAB_PREMIUM |
| `copy_nscf` *(en Supabase)* | NeuroneSCF | diagnostic-prescriptive | Ver humanize_profiles NeuroneSCF |

### NeuroneSCF — estado actualizado en Supabase

`voice_tone_primary`: diagnostic-prescriptive  
`voice_tone_secondary`: intimate-expert  
`language_geo_default`: South & Central Florida, USA  
`style_hooks`: TU/YOUR + cabello/hair como sujeto siempre. Clima es contexto adversario, nunca protagonista.

---

## SECCIÓN 6 — PERSONAS NSCF B2C (actualizado 2026-05-18)

7 segmentos activos en `brand_personas` — sin calificador étnico, por tipo de dolor:

| persona_key | Dolor central | utm_content | Priority |
|---|---|---|---|
| `b2c_color_fade` | Color que no dura — calor y humedad destruyen el tono | color-fade | 1 |
| `b2c_damage_repair` | Cabello seco, quebradizo, sobreprocesado | damage-repair | 1 |
| `b2c_frizz_humidity` | Frizz crónico por la humedad de Florida | frizz-humidity | 2 |
| `b2c_chlorine_sun` | Daño por cloro, sol y vida activa | chlorine-sun | 2 |
| `b2c_fine_fragile` | Cabello fino que se rompe o aplana | fine-fragile | 2 |
| `b2c_scalp_health` | Cuero cabelludo irritado por calor crónico | scalp-health | 3 |
| `b2c_default` | Sin señal de pixel — fallback | (sin UTM) | 3 |

---

## SECCIÓN 7 — KEYWORDS E IDIOMAS

### Idiomas y bilingüismo

- NeuroneSCF: ES (primario) + EN (Florida market) — bilingüe es canal, no tono
- DiamondDetails: ES — mercado España
- Patricia Osorio: ES (primario) + EN (comunidad Miami)
- ForumPHs: ES — Panamá
- UnrealvilleStudio: EN (primario) + ES (LATAM)

---

## SECCIÓN 8 — CHECKLIST ICR PRE-GENERACIÓN

- [ ] `brand_id` identificado
- [ ] `template_id` seleccionado según objetivo
- [ ] `canal_block_id` identificado
- [ ] Idioma confirmado — y si es NSCF, confirmar que se genera desde origen (no se traduce)
- [ ] BP_COPY_1.0 cargado (o confirmado DEFAULT)
- [ ] Humanize profile cargado para el medio
- [ ] Keywords relevantes cargadas (si aplica SEO/copy)
- [ ] Psycho preset seleccionado (si aplica)
- [ ] Si es email_sequence: piezas anteriores cargadas desde content_sequence_pieces
- [ ] AGGRO como modo base — sin hedging, sin relleno
- [ ] Humanize F2.5 aplicado post-generación
- [ ] AIFE aplicado si el output va público

---

_SKILL copylab-reference v1.1 · Unrealville Studio · CopyLab v8.0_  
_AGGRO = estándar base · Humanize = capa universal · AIFE = filtro público_  
_PO voice actualizada 2026-05-18 · NeuroneSCF personas actualizadas 2026-05-18_
