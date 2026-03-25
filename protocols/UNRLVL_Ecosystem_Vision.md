# UNRLVL Ecosystem Vision Document
> **Versión:** 4.0  
> **Autor:** Sam — Unreal>ille Studio  
> **Fecha:** ____________________  
> **Base:** DB_VARIABLES_v6_4 (40 hojas, auditado en sesión 2026-03-25)  
> **Propósito:** Documento maestro para la auditoría de DB_VARIABLES y migración a Supabase.

---

## 0. BRIEF GENERAL

> *Tu visión en lenguaje libre. Sin estructura — solo tu pensamiento.*

```
[Espacio libre para brief general de Sam]
```

---

## 1. UNREAL>ILLE STUDIO

### 1.1 Misión y promesa de servicio
> ¿Qué hace el Studio? ¿Qué garantiza a sus clientes?

### 1.2 Modelo de operación
> Agencia / licencias / servicios gestionados / joint ventures...

### 1.3 La Signature UNRLVL
> Cuando un output lleva la firma de Unreal>ille, implica que pasó por ICR QA
> y que el Brand DNA fue correctamente inyectado y el HUMANIZE layer aplicado.

### 1.4 Objetivos estratégicos 2026
- [ ]
- [ ]
- [ ]

---

## 2. ARQUITECTURA CENTRAL — EL FLUJO REAL

```
┌─────────────────────────────────────────────────────┐
│             BRAND BASE CONTEXT                      │
│   (CONTEXTOS + DD_DATOS + Marcas por brand_id)      │
└───────────────────────┬─────────────────────────────┘
                        │ Proceso de generación vía prompt
                        ▼
┌─────────────────────────────────────────────────────┐
│               DB_VARIABLES v6_4                     │
│         (cerebro central — 40 hojas)                │
│                                                     │
│  Keywords · CTAs · GeoMix · Compliance              │
│  Output_Templates · Canal_Blocks                    │
│  Blueprints · Lab Params · HUMANIZE F2.5            │
└───────────────────────┬─────────────────────────────┘
                        │ buildCopyPrompt() / SMPC
                        ▼
┌─────────────────────────────────────────────────────┐
│            SMPC — buildCopyPrompt()                 │
│  Brand Injector → Geo Adapter → Tone Selector       │
│  Canal Formatter → Compliance Guard → CTA Router    │
│  HUMANIZE Injector → Output Structurer              │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│           ~15 LABS DEL ECOSISTEMA                   │
│  ImageLab · VideoLab · VoiceLab · CopyLab           │
│  SocialLab · LandingLab · BlueprintLab · ...        │
└───────────────────────┬─────────────────────────────┘
                        │ Output candidato
                        ▼
┌─────────────────────────────────────────────────────┐
│           ICR QA — AUTOVALIDACIÓN                   │
│   Preflight → Generación → Postflight               │
│   Si FAIL → Auto-regenerate (N intentos)            │
│   Solo entrega cuando PASS                          │
│   El usuario/cliente NUNCA ve un FAIL               │
└───────────────────────┬─────────────────────────────┘
                        │ Output aprobado
                        ▼
┌─────────────────────────────────────────────────────┐
│         OUTPUT CON UNRLVL SIGNATURE                 │
└───────────────────────┬─────────────────────────────┘
                        │ Métricas de performance
                        ▼
┌─────────────────────────────────────────────────────┐
│              ANALYTICSLAB                           │
│   Retroalimenta DB_VARIABLES:                       │
│   keywords top → sube prioridad                     │
│   formatos bajo ROAS → se deprecan                  │
└─────────────────────────────────────────────────────┘
```

---

## 3. DB_VARIABLES_v6_4 — ARQUITECTURA REAL (40 HOJAS)

> *Auditado directamente del archivo. Esta es la fuente de verdad.*  
> *Regla cardinal: cualquier dato de marca vive aquí primero, nunca en el código de los labs.*

### 3.1 Definición
DB_VARIABLES no es un repositorio de textos — es el sistema nervioso central completo.
Contiene desde la identidad de marca hasta los parámetros de cada modelo IA,
los templates de prompts, las reglas de compliance, los presets de imagen
y la capa de autenticidad (HUMANIZE) que se inyecta en cada output del ecosistema.

### 3.2 Regla crítica — brand_id canónico
El `brand_id` debe ser **idéntico carácter por carácter** al ID en la tabla Marcas.
Una discrepancia rompe el stack completo. Este fue el bug más costoso históricamente.

**IDs canónicos en v6_4:**

| brand_id | Nombre visible | Mercado |
|---|---|---|
| DiamondDetails | Diamond Details | Alicante, España |
| VizosCosmetics | Vizos Cosmetics | Miami + España |
| D7Herbal | D7 Herbal | Alicante, España |
| VivoseMask | Vivosé Mask | Alicante, España |
| PatriciaOsorio | Patricia Osorio | Miami, FL |
| NeuroneCosmetics | Neurone Cosmética | South/Central Miami |
| MASTER | (fila de referencia global) | — |
| ForumPHs | ForumPHs | Panamá |
| NeuroneSCF | Neurone SCF | Florida |

> **Nota:** ForumPHs y NeuroneSCF están en el ecosystem.json pero su
> brand context vive principalmente en el context system (Vercel), no en DB_VARIABLES.
> La auditoría debe definir si deben integrarse al mismo DB.

---

### 3.3 Índice completo de hojas — clasificación por destino

#### GRUPO A — MIGRAN a Supabase (tablas de datos)

| # | Hoja | Contenido | Tabla Supabase candidata |
|---|---|---|---|
| 1 | **Marcas** | Brand profiles completos: contexto, geo, tono, canales, imagelab_*, videolab_*, voicelab_* | `brands` |
| 2 | **CONTEXTOS** | Brand context extenso por marca (texto largo) | `brand_base_context` |
| 3 | **DD_DATOS** | Variables de conversión por marca/producto: buyer_persona, problema, beneficio, objeción, prueba, geo, tono, canal, cta, keywords, tipo_imagen_* | `brand_dna_data` |
| 4 | **CTAs** | CTAs por marca · idioma · servicio · tipo (smpc/ads/seo/story/spot/ab1/ab2/ultrashort) | `ctas` |
| 5 | **DD_GeoMix** | Matriz geo×servicio Diamond Details — 5 geos × 6 servicios = 30 combos | `geomix` |
| 6 | **D7H_GeoMix** | Matriz geo×servicio D7Herbal | `geomix` |
| 7 | **Compliance_Rules** | Regla maestra de compliance para todos los outputs | `compliance_rules` |
| 8 | **PersonBlueprints** | Blueprints de personas: po_patricia, dd_host_01, vizos_host_01, d7h_host_01, neurone_host_miami_01 | `blueprints_person` |
| 9 | **LocationBlueprints** | Blueprints de locaciones: 3 PO Miami, 2 Diamond Alicante, 1 generic stage, 2 Neurone Miami | `blueprints_location` |
| 10 | **HUMANIZE** | Capa F2.5 de autenticidad: DEFAULT + overrides por brand_id, por medium (copy/image/video/voice/web) | `humanize_rules` |
| 11 | **IMAGELAB_PRESETS** | Presets por canal (WEB/LANDING/META/TIKTOK): preset_id, parámetros visuales | `imagelab_presets` |
| 12 | **DV_IMAGELAB** | Valores de validación de parámetros ImageLab | `dv_imagelab` (o enum) |
| 13 | **DV_VIDEOLAB** | Valores de validación VideoLab: motion_style, duration, aspect_ratio, music_mood, model, cut_rhythm, pack_type | `dv_videolab` (o enum) |
| 14 | **DV_VOICELAB** | Valores de validación VoiceLab: language, emotion, speed, model, format, script_style, pack_type | `dv_voicelab` (o enum) |
| 15 | **K>D7Herbal** | Keywords D7Herbal con grupo, prioridad, tipo | `keywords` (brand_id=D7Herbal) |
| 16 | **K>Diamond** | Keywords Diamond Details | `keywords` (brand_id=DiamondDetails) |
| 17 | **K>Vivosé** | Keywords Vivosé Mask | `keywords` (brand_id=VivoseMask) |
| 18 | **K>Vizos** | Keywords Vizos Cosmetics | `keywords` (brand_id=VizosCosmetics) |
| 19 | **K>PO** | Keywords Patricia Osorio (22 activas — incompleto) | `keywords` (brand_id=PatriciaOsorio) |
| 20 | **K>Neurone** | Keywords Neurone Cosmética | `keywords` (brand_id=NeuroneCosmetics) |
| 21 | **Meta_ES** | SEO metas pre-generadas Diamond Details en español | `seo_meta` |
| 22 | **Meta_VAL** | SEO metas pre-generadas Diamond Details en valenciano | `seo_meta` |

#### GRUPO B — LÓGICA OPERATIVA (viven en código / config del lab, no en Supabase como datos)

| # | Hoja | Contenido | Dónde vive |
|---|---|---|---|
| 23 | **Output_Templates** | 16 templates de prompt: SMPC_full, Ads_FullPro, SEO_FullPro, SEO_Brand_FullPro, YouTube_Ideas, YouTube_Titles, YouTube_Thumbnails, YouTube_Descriptions, YouTube_ScriptShort, YouTube_ScriptLong, Organic_FullPro, BrandKit_Fast, DM_Script_Service, Service_Page_Fast, Social_Strategy_30D, Social_Week1_Execution_Pack | Código del lab / config de CopyLab |
| 24 | **Canal_Blocks** | Reglas de output por canal (13 canales): WEB, LANDING_PAGE, BLOG, META_ADS, TIKTOK_ADS, GOOGLE_SEARCH_(RSA), GOOGLE_PMAX, YOUTUBE, INSTAGRAM_ORGANICO, TIKTOK_ORGANICO, BLOG_HTML, BRANDHUB_HTML, LANDING_HTML, WEB_HTML | Código del lab / config de CopyLab |
| 25 | **Channel_Prompt_Rules** | Mapping canal → templates permitidos/recomendados | Config de CopyLab |
| 26 | **Delivery_Format_Blocks** | Reglas de formato de entrega (PLAIN vs HTML) para: BLOG_HTML, LANDING_HTML, WEB_HTML, BRANDHUB_HTML | Config de CopyLab |
| 27 | **README_v2** | Changelog y notas de versión | Documentación |
| 28 | **APPSCRIPT_v2** | Código de automatización Google Apps Script | Google Apps Script |

#### GRUPO C — GENERADAS DINÁMICAMENTE (no se almacenan en Supabase)

| # | Hoja | Por qué no migra |
|---|---|---|
| 29 | **DB_K** | Generada por query on-demand — no es dato maestro |
| 30 | **Channel_Prompt_Lists** | Generada dinámicamente desde Canal_Blocks |
| 31 | **Channel_Prompt_Map** | Generada dinámicamente |
| 32 | **DV_Canales** | Computed QUERY desde Marcas — se genera por brand_id |
| 33 | **DV_Formatos** | Lista de validación estática — va como enum en código |
| 34 | **DV_Idiomas** | 4 valores: ES / es-FL / SPANG / EN — va como enum |

#### GRUPO D — UI / INTERFAZ (viven en el frontend del lab)

| # | Hoja |
|---|---|
| 35 | **UI_Prompt** |
| 36 | **UI_Field_Dictionary** |
| 37 | **UI_Prompt_Catalog** |
| 38 | **UI_Canal_Catalog** |
| 39 | **UI_Workflow_Catalog** |
| 40 | **UI_DV** |

---

### 3.4 HUMANIZE F2.5 — La capa que faltaba

> **Este fue el hallazgo más importante de la auditoría.**
> HUMANIZE es una capa transversal de autenticidad que se inyecta en CADA prompt del ecosistema.
> No es un set de variables de marca — es un sistema de parámetros por medium.

**Estructura:**
```
brand_id (DEFAULT o específico) 
  × medium (copy / image / video / voice / web)
  → humanize_instructions (texto inyectado automáticamente)
```

**DEFAULT aplica a todas las marcas salvo override.**

**Mediums con instrucciones DEFAULT:**
- `copy`: Variación de ritmo, contracciones naturales, puntuación expresiva. Prohibido: "En conclusión", "innovador/revolucionario", listas simétricas perfectas.
- `image`: Imperfecciones dérmicas, asimetría facial, flyaways. Prohibido: piel plástica, poses de stock, iluminación sin sombras.
- `video`: Micro-movimientos, respiración visible, handheld orgánico. Prohibido: personajes inmóviles entre diálogos.
- `voice`: Pausas naturales, micro-hesitaciones 100-150ms, velocidad variable. Prohibido: cadencia robótica uniforme.
- `web`: Fotografía candid, headlines conversacionales, párrafos ≤4 líneas. Prohibido: fotos de stock con sonrisa perfecta.

**Overrides de marca activos en v6_4:**
| brand_id | Medium | Override |
|---|---|---|
| neuroneCosmetics | copy | Científico-accesible, bilingüe natural, B2C emocional+técnico / B2B técnico+ROI |
| patriciaOsorioVizosSalon | copy | Autoridad cálida, Spanglish Miami, referencias reales de salón |
| patriciaOsorioVizosSalon | image | Entorno real de salón, manos activas, expresiones de reacción auténtica |
| diamondDetails | copy | Lenguaje de taller premium, auto = extensión de identidad del cliente |
| diamondDetails | image | Reflejos reales en carrocería, manos con rastros de trabajo, ángulos bajos |
| d7Herbal | copy | Proximidad botánica, ingredientes con nombre real, compliance cosmético estricto |
| vizosCosmetics | copy | Registro profesional de laboratorio, Hair Healing Systems como marco central |

**Tabla Supabase:** `humanize_rules` — campos: brand_id, medium, humanize_instructions, is_override

---

### 3.5 Output_Templates — Los 16 templates del SMPC

> Estos son los prompts maestros del ecosistema. Viven en DB_VARIABLES pero
> en Supabase deberían vivir en la config del lab, no como datos de marca.

| Template ID | Propósito |
|---|---|
| SMPC_full | Módulos M1–M8 de conversión completos |
| Ads_FullPro | Assets de ads (5 ángulos, 12 hooks, guiones UGC, creatives) |
| SEO_FullPro | Artículo SEO completo (title/meta/slug/outline/FAQs/schema) |
| SEO_Brand_FullPro | Brand hub SEO (autoridad topical, RTBs, interlinking) |
| YouTube_Ideas | Ideas Shorts + Long (15 + 10) |
| YouTube_Titles | 25 títulos Shorts + 25 Long + 10 SEO |
| YouTube_Thumbnails | 12 thumbnails Long + 6 Shorts covers + 10 prompts imagen |
| YouTube_Descriptions | Descripciones Long (2) + Shorts (3) + comentarios fijados |
| YouTube_ScriptShort | 3 guiones Shorts 15-25s |
| YouTube_ScriptLong | 1 guion largo 6-10min |
| Organic_FullPro | Pack orgánico IG/TikTok (hooks/posts/guion/carrusel/captions) |
| BrandKit_Fast | Kit verbal: taglines, bios, proof bank, claims, hooks |
| DM_Script_Service | Guion completo de DM para conversión a cita/venta |
| Service_Page_Fast | Sección de página/landing por servicio |
| Social_Strategy_30D | Plan estratégico 30 días con calendario |
| Social_Week1_Execution_Pack | Pack de ejecución Semana 1 (guiones + stories + carrusel) |

---

### 3.6 Canal_Blocks — Los 13 canales del ecosistema

Cada canal tiene un `block_text` completo que define qué entregar,
cómo estructurarlo y qué restricciones de compliance aplicar.

**Canales activos en v6_4:**
`WEB` · `LANDING_PAGE` · `BLOG` · `META_ADS` · `TIKTOK_ADS` · `GOOGLE_SEARCH_(RSA)` · `GOOGLE_PMAX` · `YOUTUBE` · `INSTAGRAM_ORGANICO` · `TIKTOK_ORGANICO` · `BLOG_HTML` · `BRANDHUB_HTML` · `LANDING_HTML` · `WEB_HTML`

**Formatos de entrega (Delivery_Format_Blocks):**
`BLOG_HTML` · `LANDING_HTML` · `WEB_HTML` · `BRANDHUB_HTML` — todos retornan UN ÚNICO BLOQUE HTML.

---

### 3.7 CTAs — Estructura real

**Tipos de CTA por row:**
`cta_smpc` · `cta_ads` · `cta_seo` · `cta_story` · `cta_spot` · `cta_ab1` · `cta_ab2` · `cta_ultrashort`

**Idiomas activos:** ES · en-FL · es-FL · VAL (valenciano)

**Marcas con CTAs en v6_4:**
Diamond Details (ES + EN + VAL) · Vizos Cosmetics (es-FL + en-FL) · D7 Herbal (ES) · Vivosé Mask (ES) · Neurone Cosmética (es-FL + EN)

> **Gap:** Patricia Osorio — los CTAs están en DD_DATOS pero no en tabla CTAs dedicada.

---

### 3.8 Blueprints — Estado real

**PersonBlueprints activos (5):**
| blueprint_id | brand_id | Persona | Idioma | Voice ID |
|---|---|---|---|---|
| po_patricia | PatriciaOsorio | Patricia Osorio | es-FL | TBD_po_patricia |
| dd_host_01 | DiamondDetails | Host Diamond Details A | es-ES | TBD_dd_voice_01 |
| vizos_host_01 | VizosCosmetics | Host Vizos Cosmetics | es-ES | TBD_vizos_voice_01 |
| d7h_host_01 | D7Herbal | Host D7Herbal | es-ES | TBD_d7h_voice_01 |
| neurone_host_miami_01 | NeuroneCosmetics | Host Neurone Miami | es-FL | TBD_voice_neurone_host_01 |

> **Gap crítico:** Todos los voice_id son TBD — VoiceLab no puede operar hasta que se asignen voice IDs reales en ElevenLabs.

**LocationBlueprints activos (8):**
| blueprint_id | brand_id | Tipo | Ciudad |
|---|---|---|---|
| loc_po_salon_miami | PatriciaOsorio | salon | Miami |
| loc_po_miami_beach | PatriciaOsorio | exterior_coastal | Miami Beach |
| loc_po_downtown_miami | PatriciaOsorio | exterior_urban | Miami |
| loc_dd_cabinas | DiamondDetails | workshop | Alicante |
| loc_dd_costa_blanca | DiamondDetails | exterior_coastal | Alicante |
| loc_generic_event_stage | GENERIC | event_stage | VARIABLE |
| loc_neurone_salon_miami | NeuroneCosmetics | salon | South Miami |
| loc_neurone_studio_miami | NeuroneCosmetics | studio | Miami |

> **Gap:** `has_reference_photos = false` en TODOS — fotos de referencia pendientes de subir a Reference_Assets/.

---

### 3.9 IMAGELAB_PRESETS — Sistema de presets por canal

**Presets activos (7):**
| preset_id | Canal | Nombre |
|---|---|---|
| W0101 | WEB | Institucional limpio (premium) |
| L0101 | LANDING | Conversión clean + espacio derecha |
| L0201 | LANDING | Conversión cinematic premium |
| M0101 | META | Thumbstopper (rostro + producto) |
| M0201 | META | UGC limpio (creíble) |
| T0101 | TIKTOK | UGC raw (plano amplio) |
| T0201 | TIKTOK | Docu-cinematic (energía) |

---

### 3.10 GeoMix — Estructura real

**DD_GeoMix** (Diamond Details): matriz 5 geos × 6 servicios
- Geos: Alicante · Comunidad Valenciana · Mediterráneo Alicantino · Mediterráneo Valenciano · Costa Blanca
- Servicios: tintado de lunas · protección cerámica · pulido · limpieza interior · detailing · caravanas
- Output: `combos_servicio_geo` (30 keywords long-tail generadas por fórmula)

**D7H_GeoMix** (D7Herbal): estructura similar — pendiente documentar campos reales.

> **Gap:** Falta GeoMix para las demás marcas (VizosCosmetics, PO, Neurone, VivoseMask).

---

### 3.11 Variables estáticas vs. dinámicas

| Tipo | Ejemplos | Cuándo cambian |
|---|---|---|
| Estáticas / permanentes | brand_id, compliance_rules, blueprints, HUMANIZE DEFAULT | Solo si cambia el DNA de la marca |
| Semi-estáticas | CTAs base, Output_Templates, Canal_Blocks | Por campaña, trimestre o decisión editorial |
| Dinámicas | Keyword priority/performance_score | AnalyticsLab las actualiza continuamente |
| Generadas on-demand | DB_K, combos GeoMix, Channel_Prompt_Lists | Se calculan, no se almacenan |
| Efímeras | Assets Library de ImageLab | Solo duran la sesión |

---

### 3.12 Pendientes documentados en README_v2

- [ ] Voice IDs reales en ElevenLabs (todos son `TBD_*`)
- [ ] `has_reference_photos → true` al subir fotos a `Reference_Assets/`
- [ ] Completar datos K>PO (beneficio, objeción, prueba, CTA) — solo 22 keywords
- [ ] GeoMix para marcas capilares (actualmente solo Diamond y D7H tienen hoja propia)
- [ ] [Completar según auditoría]

---

## 4. ICR QA — INDUSTRIAL CONSISTENCY READY

> *Proceso de autovalidación 100% interno. Invisible para usuario y cliente.*
> *El ecosistema no entrega hasta que el output cumple. Sin excepciones.*

### 4.1 Definición
Industrial Consistency Ready = garantía de que cada output cumple el standard
de Unreal>ille antes de ser entregado. Automatizado. El usuario/cliente
nunca ve un FAIL — el sistema simplemente regenera hasta que PASS.

### 4.2 Flujo de autovalidación
```
[Prompt / Input]
      ↓
PREFLIGHT → Valida parámetros antes de ejecutar
      ↓ PASS
[Generación con Brand DNA + HUMANIZE inyectados]
      ↓
POSTFLIGHT → Valida el output generado contra standard ICR
      ↓ FAIL
AUTO-REGENERATE → Reintenta hasta N intentos
      ↓ PASS tras reintento
[Output aprobado — se entrega]
      ↓ FAIL persistente tras N intentos
[Escalamiento interno — nunca se entrega un FAIL al cliente]
```

### 4.3 Política ICR por tipo de módulo

| Módulo | Política | Razón |
|---|---|---|
| E-Comm Studio | Estricto — gate duro | Output determinista, producto no puede deformarse |
| Scene Gen | Flexible — reintentos automáticos | Composición artística admite variación |
| Avatar Gen | Flexible — marcador ⚠️ interno | Cara admite variación leve |
| CopyLab / SMPC | Estricto en compliance, flexible en creatividad | Compliance es gate duro; voz admite variación |
| VideoPodcast | Estricto en compliance, flexible en composición | |
| [Lab N] | [completar] | |

### 4.4 Variables de DB_VARIABLES que ICR necesita leer

| Variable ICR | Fuente en DB_VARIABLES |
|---|---|
| `compliance_rules` | Hoja Compliance_Rules (regla maestra) + `imagelab_compliance_rules` en Marcas |
| `videolab_compliance_rules` | Columna videolab_compliance_rules en Marcas |
| `voicelab_compliance_rules` | Columna voicelab_compliance_rules en Marcas |
| `disclaimer_base` | Campo `disclaimer_base` en Marcas |
| `imagelab_requires_product_lock` | Columna en Marcas (True para D7Herbal, Diamond, Vizos, Vivosé, Neurone) |
| `forbidden_terms` | Implícito en Compliance_Rules y Canal_Blocks |
| HUMANIZE rules | Hoja HUMANIZE — para validar que la autenticidad fue aplicada |

### 4.5 Tabla de log ICR (nueva en Supabase)

| Campo | Tipo | Descripción |
|---|---|---|
| icr_id | UUID | PK |
| output_id | UUID | Output validado |
| brand_id | string | Marca |
| lab_id | string | Lab que generó |
| status | enum | PASS / FAIL / RETRY |
| attempts | int | Número de intentos |
| failure_reason | text | Solo interno — nunca expuesto |
| validated_at | timestamp | |

---

## 5. EL ECOSISTEMA DE LABS (~15)

### 5.1 Mapa por capa funcional

```
CAPA 1 — DATOS Y CEREBRO
  DB_VARIABLES    → Fuente de verdad (Supabase)
  BlueprintLab    → UI para gestionar Person/Location/Product blueprints
  AnalyticsLab    → Retroalimenta métricas a DB_VARIABLES

CAPA 2 — GENERACIÓN DE CONTENIDO
  ImageLab        → Imágenes (ComfyUI FLUX local / fal.ai cloud)
  VideoLab        → Storyboards + video (HeyGen API / Kling)
  VoiceLab        → Scripts + voces (ElevenLabs → Chatterbox roadmap)
  CopyLab         → Todo texto vía SMPC (buildCopyPrompt)
  SocialLab       → Social engine TOFU/MOFU/BOFU

CAPA 3 — DISTRIBUCIÓN Y CONVERSIÓN
  LandingLab      → Generador de landings (building)
  PublishLab      → Publicación automatizada multi-canal
  Orchestrator    → Pipeline completo (n8n/Make)

CAPA 4 — SERVICIOS POR MARCA (apps cliente)
  FIE             → Financial Intelligence Engine (ForumPHs → cross-brand)
  Document Factory → Generación documentos legales/admin (ForumPHs)
  ForumPHs Speaks → Agente IA Ley 284 (chatbot lead capture)
  UNRLVL-OPS      → Ticket system + app de campo
  [otras ~6 apps] → [completar]
```

### 5.2 Ficha estándar por Lab

| Campo | Detalle |
|---|---|
| **ID** | |
| **Nombre** | |
| **Repo GitHub** | |
| **Estado** | active / building / planned |
| **Sirve a marcas** | |
| **Variables DB que consume** | (hojas de DB_VARIABLES) |
| **Output que genera** | |
| **Pasa por ICR QA** | Nivel 1 (módulo) / Nivel 2 (output) / No |
| **Stack técnico** | |
| **Gaps / pendientes** | |

---

## 6. MARCAS DEL ECOSISTEMA

> *Cada marca tiene su brand_id canónico, su Base Context en DB_VARIABLES,
> y su set de variables de DNA generado.*

### 6.X [NOMBRE — brand_id: ______]

| Campo | Detalle |
|---|---|
| **brand_id** | (canónico — crítico) |
| **Nombre visible** | |
| **Mercado** | |
| **Canal principal** | |
| **Rol Sam** | socio / studio / cliente |
| **Idioma(s)** | ES / es-FL / SPANG / EN |
| **Salud** | 🟢 / 🟡 / 🔴 |

#### Base Context — completitud

| Sección | Estado |
|---|---|
| CONTEXTOS | ✅ / ⚠️ Incompleto |
| DD_DATOS | ✅ / ⚠️ Parcial |
| Keywords (K>*) | N keywords · completo/incompleto |
| CTAs | ✅ / ⚠️ Falta idioma X |
| GeoMix | ✅ / ⚠️ No tiene hoja propia |
| Blueprints Person | ✅ / ❌ No existe |
| Blueprints Location | ✅ / ❌ No existe |
| HUMANIZE override | ✅ / usando DEFAULT |
| Voice IDs reales | ✅ / TBD |
| Fotos referencia | ✅ / ❌ Pendiente |

#### Labs activos para esta marca
#### Objetivos 2026
#### Gaps y necesidades

---

## 7. CLIENTES FINALES

### 7.1 Tipos de cliente en el ecosistema
> (consumidor final, profesional B2B, propietario de PH, cliente directo del Studio...)

### 7.2 Variables que el ecosistema necesita de cada cliente
> Para personalizar outputs, segmentar y medir.

### 7.3 Customer journey multi-marca
> ¿Un cliente puede tocar más de una marca o app?
> Ejemplo: Patricia Osorio → Neurone Cosmética → Vizos Cosmetics

---

## 8. ARQUITECTURA SUPABASE — DISEÑO DE MIGRACIÓN

### 8.1 Filosofía
Single source of truth. Multi-tenant por brand_id. RLS (Row Level Security) en Supabase.
Los labs hacen fetch directo — no más Google Sheets como intermediario.

### 8.2 Tablas principales (de Grupo A)

| Tabla | Hoja origen | PK / FK | Notas |
|---|---|---|---|
| `brands` | Marcas | brand_id (PK) | 44+ columnas → JSONB para lab params |
| `brand_base_context` | CONTEXTOS | brand_id (FK) | JSONB o TEXT largo |
| `brand_dna_data` | DD_DATOS | brand_id + producto (PK compuesto) | Columnar por producto/servicio |
| `ctas` | CTAs | id (UUID) + brand_id + idioma + servicio | 8 tipos de CTA |
| `geomix` | DD_GeoMix + D7H_GeoMix | brand_id + geo + servicio | Matrix expandida |
| `compliance_rules` | Compliance_Rules | brand_id (FK) | Maestra + overrides por marca |
| `blueprints_person` | PersonBlueprints | blueprint_id (PK) | Schema BP_PERSON_1.0 |
| `blueprints_location` | LocationBlueprints | blueprint_id (PK) | Schema BP_LOCATION_1.0 |
| `humanize_rules` | HUMANIZE | brand_id + medium (PK compuesto) | DEFAULT + overrides |
| `imagelab_presets` | IMAGELAB_PRESETS | preset_id (PK) | Por canal |
| `dv_imagelab` | DV_IMAGELAB | enum values | O como enum en código |
| `dv_videolab` | DV_VIDEOLAB | enum values | O como enum en código |
| `dv_voicelab` | DV_VOICELAB | enum values | O como enum en código |
| `keywords` | K>* (6 hojas) | id + brand_id + keyword | Unificada por brand_id |
| `seo_meta` | Meta_ES + Meta_VAL | brand_id + servicio + idioma | Pre-generados |

### 8.3 Tablas nuevas (no vienen de Sheets)

| Tabla | Propósito |
|---|---|
| `apps` | Registro del ecosistema de ~15 labs |
| `output_log` | Log de outputs generados por lab/marca |
| `icr_validations` | Log ICR interno (solo Studio) |
| `analytics_performance` | Métricas de AnalyticsLab |
| `clients` | Clientes finales por marca |
| `sessions` | Sesiones de uso por lab |

### 8.4 Pregunta abierta — Multi-tenancy
> ¿`brand_id` como tenant key con RLS?
> ¿Schemas separados por marca?
> ¿Cómo acceden los labs (anon key / service role / JWT con brand_id claim)?

### 8.5 Acceso por actor

| Actor | Nivel |
|---|---|
| Sam (Studio Admin) | Admin total — todas las marcas |
| Lab del ecosistema | Read brand_id autorizado / Write outputs propios |
| ICR QA process | Read compliance + humanize / Write icr_validations |
| AnalyticsLab | Read output_log / Write analytics_performance + keywords.performance_score |
| Cliente final | Read sus propios datos cuando aplique |

---

## 9. INVENTARIO DE GAPS — AUDITORÍA

### 9.1 Gaps críticos (bloquean operación)

| Gap | Impacto | Lab bloqueado |
|---|---|---|
| Voice IDs todos `TBD_*` | VoiceLab no puede generar | VoiceLab |
| `has_reference_photos = false` en todos | ImageLab con baja fidelidad de locación | ImageLab |
| K>PO solo 22 keywords sin campos beneficio/objeción/prueba/CTA | CopyLab incompleto para PO | CopyLab |
| GeoMix solo para Diamond y D7H | 4 marcas sin geo matrix | CopyLab / SocialLab |
| DB_VARIABLES en Sheets → labs no pueden fetch automático | Orchestrator no puede operar | Orchestrator |
| blueprints_product no existe aún | ImageLab E-Comm Studio sin schema de producto | ImageLab |

### 9.2 Gaps de completitud por marca

| Marca | Keywords | CTAs | GeoMix | Blueprints | Voice ID | Fotos |
|---|---|---|---|---|---|---|
| DiamondDetails | ⚠️ Parcial | ✅ ES+EN+VAL | ✅ | ✅ | TBD | ❌ |
| VizosCosmetics | ⚠️ | ✅ es-FL+en-FL | ❌ | ✅ | TBD | ❌ |
| D7Herbal | ⚠️ | ✅ ES | ✅ | ✅ | TBD | ❌ |
| VivoseMask | ⚠️ | ✅ ES | ❌ | ❌ | TBD | ❌ |
| PatriciaOsorio | ⚠️ 22 incompletas | ⚠️ En DD_DATOS, no en tabla CTAs | ❌ | ✅ (3 locations) | TBD | ❌ |
| NeuroneCosmetics | ✅ K>Neurone | ✅ es-FL+EN | ❌ | ✅ (2 locations) | TBD | ❌ |

### 9.3 Preguntas abiertas para la auditoría

- [ ] ¿`Output_Templates` y `Canal_Blocks` migran a Supabase como config o quedan hardcodeados en CopyLab?
- [ ] ¿La tabla `keywords` unifica todas las K>* hojas con brand_id como discriminador?
- [ ] ¿`DV_*` (ImageLab/VideoLab/VoiceLab) van como tablas de referencia en Supabase o como enums en código?
- [ ] ¿`brands` tiene una sola fila por marca con todas las columnas, o se normaliza (brand_core + brand_imagelab + brand_videolab + brand_voicelab como tablas separadas)?
- [ ] ¿`HUMANIZE` es una tabla propia o un campo JSONB dentro de `brands`?
- [ ] ¿`seo_meta` se pre-genera y almacena (como ahora) o se genera on-demand desde DB_VARIABLES?
- [ ] ¿Cómo se versiona el DNA cuando cambia el Base Context de una marca?
- [ ] ¿Cuántos reintentos máximos en el loop ICR antes de escalar internamente?
- [ ] ¿ForumPHs y NeuroneSCF se integran a DB_VARIABLES o siguen en el context system (Vercel)?
- [ ] [Tu pregunta aquí]

### 9.4 Orden de prioridades para la auditoría

1. Definir schema canónico de cada tabla Supabase (campos, tipos, relaciones)
2. Resolver la pregunta de normalización de `brands` (¿monolítica o dividida por lab?)
3. Decidir destino de Output_Templates y Canal_Blocks (Supabase config vs. código)
4. Definir estrategia de migración sin romper los labs activos
5. Resolver voice IDs (ElevenLabs) — desbloquea VoiceLab completo
6. Definir esquema auth/RLS para acceso de labs

---

## 10. NOTAS Y DECISIONES TOMADAS

| Fecha | Decisión | Razón |
|---|---|---|
| 2026-03 | DB_VARIABLES se adapta DESPUÉS de implementar módulos, no antes | Hasta que los módulos no existen, no se sabe qué columnas se necesitan realmente |
| 2026-03 | BlueprintLab es app separada, no módulo de ImageLab | Admin vs operativo — control de acceso diferente |
| 2026-03 | Assets Library de ImageLab NO se acopla con blueprints | Naturaleza opuesta: efímero vs permanente |
| 2026-03 | ICR piloto: E-Comm Studio (más determinista) | No empezar por Scene Gen que es más variable |
| 2026-03-25 | Auditoría real de DB_VARIABLES_v6_4 completada | 40 hojas auditadas — hallazgo clave: HUMANIZE F2.5 no estaba documentado |
| | | |

---

*Documento generado por Claude — Unreal>ille Studio*
*v4.0 — Basado en auditoría real de DB_VARIABLES_v6_4 (40 hojas, 2026-03-25)*
*Hallazgos nuevos vs v3.0: HUMANIZE F2.5 · IMAGELAB_PRESETS · Channel_Prompt_Rules · Output_Templates (16) · Canal_Blocks (13 canales) · Delivery_Format_Blocks · Meta_ES/VAL · K>Neurone · DV_Canales/Formatos/Idiomas*
