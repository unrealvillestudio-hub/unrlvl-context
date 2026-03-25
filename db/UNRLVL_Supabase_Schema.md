# UNRLVL — Supabase Schema Design
**Versión:** 1.1 · **Fecha:** 2026-03-25 · **Fix:** constraint imagelab_presets corregido de (brand_id, canal) a (brand_id, preset_id)  
**Basado en:** Auditoría real de código de 9 labs + lectura completa DB_VARIABLES_v6_4.xlsx (40 hojas)  
**Estado:** FINAL — listo para ejecutar en Supabase

---

## 1. DECISIONES ARQUITECTÓNICAS

| # | Decisión | Resolución |
|---|---|---|
| D1 | ¿brands monolítica o normalizada? | **Normalizada** — brands core + tablas especializadas |
| D2 | ¿Output_Templates y Canal_Blocks en Supabase o en código? | **Supabase** — single source of truth |
| D3 | ¿HUMANIZE como tabla propia o JSONB dentro de brands? | **Tabla propia** — patrón DEFAULT + overrides lo requiere |
| D4 | ¿DV_* como tablas de referencia o enums en código? | **Enums en código** + `applies_to JSONB` en compliance_rules |
| D5 | ¿ForumPHs y NeuroneSCF en Supabase? | **Pendiente Sam** — por ahora siguen en context system |

---

## 2. MAPA DE CRITICIDAD

| Tabla | Labs que dependen | Nivel |
|---|---|---|
| `brands` | TODOS — 11 labs | 🔴 BLOQUEANTE |
| `compliance_rules` | ImageLab, CopyLab, VideoLab, VoiceLab, Orchestrator, BluePrints, AgentLab | 🔴 BLOQUEANTE |
| `humanize_profiles` | SocialLab, WebLab, BlueprintLab, Orchestrator, AgentLab | 🔴 BLOQUEANTE |
| `imagelab_presets` | ImageLab, CopyLab, VideoLab, SocialLab, Orchestrator, BluePrints | 🔴 BLOQUEANTE |
| `output_templates` | ImageLab, CopyLab, BlueprintLab, SocialLab, Orchestrator | 🔴 BLOQUEANTE |
| `canal_blocks` | ImageLab, CopyLab, BlueprintLab, SocialLab, Orchestrator | 🔴 BLOQUEANTE |
| `voicelab_params` | VideoLab, VoiceLab, CopyLab, Orchestrator | 🟠 ALTO |
| `product_blueprints` | ImageLab, WebLab, AgentLab, BluePrints | 🟠 ALTO |
| `videolab_params` | VideoLab, SocialLab, Orchestrator | 🟠 ALTO |
| `location_blueprints` | VideoLab, VoiceLab, ImageLab | 🟡 MEDIO |
| `person_blueprints` | VoiceLab, ImageLab | 🟡 MEDIO |
| `keywords` | CopyLab, SocialLab, BlueprintLab | 🟡 MEDIO |
| `blueprint_schemas` | CopyLab, BlueprintLab, Orchestrator | 🟡 MEDIO |
| `geomix` | CopyLab, ImageLab + gaps en WebLab/VideoLab/SocialLab | 🟡 MEDIO |
| `ctas` | CopyLab, BlueprintLab + gaps en ImageLab/WebLab/VideoLab | 🟡 MEDIO |

---

## 3. DDL COMPLETO — 23 TABLAS

### Función auxiliar (ejecutar primero)

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
```

---

### brands

```sql
CREATE TABLE brands (
  id                       TEXT PRIMARY KEY,
  display_name             TEXT NOT NULL,
  tagline                  TEXT,
  domain                   TEXT,
  market                   TEXT,
  language_primary         TEXT DEFAULT 'es-ES',
  sam_role                 TEXT DEFAULT 'studio',
  type                     TEXT DEFAULT 'brand',
  industry                 TEXT,
  status                   TEXT DEFAULT 'active',
  health                   TEXT DEFAULT 'green',
  visual_identity          TEXT,
  default_negative_prompt  TEXT,
  agent_name               TEXT,
  agent_tone               TEXT,
  agent_value_prop         TEXT,
  extra_instructions       TEXT,
  positioning              TEXT,
  territory                TEXT,
  db_variables_context     BOOLEAN DEFAULT true,
  notes                    TEXT,
  created_at               TIMESTAMPTZ DEFAULT now(),
  updated_at               TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "labs_read_active" ON brands FOR SELECT USING (status = 'active');
CREATE POLICY "admin_write" ON brands FOR ALL USING (auth.role() = 'service_role');
```

**Brand IDs canónicos:** `DiamondDetails`, `VizosCosmetics`, `D7Herbal`, `VivoseMask`, `PatriciaOsorioPersonal`, `PatriciaOsorioComunidad`, `PatriciaOsorioVizosSalon`, `NeuroneCosmetics`, `MASTER`

---

### brand_palette

```sql
CREATE TABLE brand_palette (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id  TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  role      TEXT NOT NULL,
  name      TEXT,
  hex       TEXT NOT NULL,
  pantone   TEXT,
  rgb       JSONB,
  cmyk      JSONB,
  usage     TEXT,
  UNIQUE(brand_id, role)
);
```

---

### brand_typography

```sql
CREATE TABLE brand_typography (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  role        TEXT NOT NULL,
  font_family TEXT NOT NULL,
  weights     JSONB,
  css_import  TEXT,
  fallback    TEXT,
  sample_css  TEXT,
  UNIQUE(brand_id, role)
);
```

---

### humanize_profiles

Pattern: `brand_id IS NULL` = DEFAULT global. Override = row con brand_id específico.

```sql
CREATE TABLE humanize_profiles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id            TEXT REFERENCES brands(id) ON DELETE CASCADE,
  medium              TEXT NOT NULL,
  tone                TEXT,
  vocabulary_include  JSONB,
  vocabulary_exclude  JSONB,
  sentence_style      TEXT,
  personality         TEXT,
  anti_patterns       JSONB,
  authenticity_rules  TEXT,
  temperature         DECIMAL(3,2),
  raw_config          JSONB,
  created_at          TIMESTAMPTZ DEFAULT now(),
  UNIQUE NULLS NOT DISTINCT (brand_id, medium)
);
```

**Overrides activos en DB_VARIABLES:** `neuroneCosmetics/copy`, `patriciaOsorioVizosSalon/copy`, `patriciaOsorioVizosSalon/image`, `diamondDetails/copy`, `diamondDetails/image`, `d7Herbal/copy`, `vizosCosmetics/copy`

---

### compliance_rules

```sql
CREATE TABLE compliance_rules (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id     TEXT REFERENCES brands(id) ON DELETE CASCADE,
  rule_type    TEXT NOT NULL,
  jurisdiction TEXT,
  rule_text    TEXT NOT NULL,
  severity     TEXT DEFAULT 'hard',
  applies_to   JSONB,
  version      TEXT DEFAULT '1.0',
  active       BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);
```

---

### output_templates (16 SMPC)

```sql
CREATE TABLE output_templates (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  category       TEXT,
  template_text  TEXT NOT NULL,
  variables      JSONB,
  applies_to     JSONB,
  platforms      JSONB,
  word_count_min INT,
  word_count_max INT,
  active         BOOLEAN DEFAULT true,
  version        TEXT DEFAULT '1.0',
  created_at     TIMESTAMPTZ DEFAULT now()
);
```

**IDs en DB_VARIABLES:** `SMPC_full`, `Ads_FullPro`, `SEO_FullPro`, `SEO_Brand_FullPro`, `YouTube_Ideas`, `YouTube_Titles`, `YouTube_Thumbnails`, `YouTube_Descriptions`, `YouTube_ScriptShort`, `YouTube_ScriptLong` + 6 más.

---

### canal_blocks (13 bloques)

```sql
CREATE TABLE canal_blocks (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  platform        TEXT NOT NULL,
  format          TEXT,
  char_limit      INT,
  tone_modifier   TEXT,
  restrictions    JSONB,
  media_types     JSONB,
  aspect_ratios   JSONB,
  block_text      TEXT,
  active          BOOLEAN DEFAULT true,
  version         TEXT DEFAULT '1.0'
);
```

**Canales en DB_VARIABLES:** `WEB`, `LANDING_PAGE`, `BLOG`, `META_ADS`, `TIKTOK_ADS`, `GOOGLE_SEARCH_RSA`, `GOOGLE_PMAX`, `YOUTUBE`, `INSTAGRAM_ORGANICO`, `TIKTOK_ORGANICO`, `OMNICANAL`, `EMAIL`, `ECOMMERCE`

---

### keywords

```sql
CREATE TABLE keywords (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  keyword     TEXT NOT NULL,
  type        TEXT,
  intent      TEXT,
  volume      INT,
  difficulty  INT,
  market      TEXT,
  language    TEXT DEFAULT 'es',
  grupo_3     TEXT,
  canal       TEXT,
  active      BOOLEAN DEFAULT true,
  UNIQUE(brand_id, keyword)
);
```

---

### ctas

```sql
CREATE TABLE ctas (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id       TEXT REFERENCES brands(id) ON DELETE CASCADE,
  servicio       TEXT,
  idioma         TEXT DEFAULT 'ES',
  cta_smpc       TEXT,
  cta_ads        TEXT,
  cta_seo        TEXT,
  cta_story      TEXT,
  cta_spot       TEXT,
  cta_ab1        TEXT,
  cta_ab2        TEXT,
  cta_ultrashort TEXT,
  active         BOOLEAN DEFAULT true
);
```

---

### geomix

```sql
CREATE TABLE geomix (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id      TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  geo           TEXT NOT NULL,
  country       TEXT,
  region        TEXT,
  city          TEXT,
  language      TEXT,
  servicios     JSONB,
  combos        JSONB,
  lighting      TEXT,
  color_mood    TEXT,
  aesthetic     TEXT,
  local_slang   JSONB,
  avoid_slang   JSONB,
  cultural_refs JSONB,
  active        BOOLEAN DEFAULT true,
  UNIQUE(brand_id, geo)
);
```

**⚠️ Gap:** Solo existe para `DiamondDetails` y `D7Herbal`. Falta: `VizosCosmetics`, `PatriciaOsorio*`, `NeuroneCosmetics`, `VivoseMask`.

---

### imagelab_presets

```sql
CREATE TABLE imagelab_presets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        TEXT REFERENCES brands(id) ON DELETE CASCADE,
  canal           TEXT NOT NULL,
  preset_id       TEXT,
  realism_level   TEXT,
  film_look       TEXT,
  lens_preset     TEXT,
  depth_of_field  TEXT,
  framing         TEXT,
  skin_detail     TEXT,
  imperfections   TEXT,
  humidity_level  DECIMAL(3,1),
  sweat_level     DECIMAL(3,1),
  grain_level     DECIMAL(3,1),
  lighting_style  TEXT,
  color_grading   TEXT,
  aspect_ratio    TEXT,
  resolution      TEXT,
  negative_prompt TEXT,
  extra_params    JSONB,
  notes           TEXT,
  UNIQUE NULLS NOT DISTINCT (brand_id, preset_id)
  -- Fix 2026-03-25: canal no es unique por brand — puede haber múltiples presets por canal (L0101+L0201 ambos LANDING, M0101+M0201 ambos META)
);
```

**7 presets globales en DB_VARIABLES:** `W0101` (WEB), `L0101`/`L0201` (LANDING), `M0101`/`M0201` (META), `T0101`/`T0201` (TIKTOK)

---

### videolab_params

```sql
CREATE TABLE videolab_params (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id         TEXT REFERENCES brands(id) ON DELETE CASCADE,
  format           TEXT NOT NULL,
  dimensions       TEXT,
  duration_sec     INT,
  aspect_ratio     TEXT,
  motion_style     TEXT,
  cut_pace         TEXT,
  music_mood       TEXT,
  color_grade      TEXT,
  transition_style TEXT,
  text_overlay     JSONB,
  engine           TEXT DEFAULT 'kling',
  extra_params     JSONB,
  UNIQUE NULLS NOT DISTINCT (brand_id, format)
);
```

**Valores DV_VIDEOLAB:** formats `reel_15s`, `reel_30s`, `youtube_short`, `youtube_standard`, `tiktok_15s`, `spot_30s` · engines `kling`, `runway_gen3`, `sora`

---

### voicelab_params

```sql
CREATE TABLE voicelab_params (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id             TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  persona_name         TEXT NOT NULL,
  voice_id             TEXT,
  language             TEXT DEFAULT 'es-ES',
  gender               TEXT,
  age_range            TEXT,
  emotion_base         TEXT,
  speed                DECIMAL(3,2) DEFAULT 1.0,
  pitch                DECIMAL(3,2) DEFAULT 1.0,
  stability            DECIMAL(3,2),
  clarity              DECIMAL(3,2),
  style_exaggeration   DECIMAL(3,2),
  script_style         TEXT,
  engine               TEXT DEFAULT 'elevenlabs_turbo_v2',
  format_default       TEXT DEFAULT 'mp3_192',
  status               TEXT DEFAULT 'pending',
  notes                TEXT,
  UNIQUE(brand_id, persona_name)
);
```

**⚠️ BLOQUEADO:** Todos los voice_id son `TBD_*`. Requiere acción de Sam en ElevenLabs.

---

### person_blueprints

```sql
CREATE TABLE person_blueprints (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id              TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  blueprint_id          TEXT UNIQUE,
  schema_version        TEXT DEFAULT 'BP_PERSON_1.0',
  display_name          TEXT NOT NULL,
  role_default          TEXT,
  status                TEXT DEFAULT 'active',
  imagelab_description  TEXT,
  imagelab_style        TEXT,
  imagelab_realism      TEXT,
  imagelab_film_look    TEXT,
  imagelab_lens         TEXT,
  imagelab_dof          TEXT,
  voicelab_ref          UUID REFERENCES voicelab_params(id),
  speaking_style        TEXT,
  expertise             TEXT,
  compliance_notes      TEXT,
  compatible_archetypes JSONB,
  has_reference_photos  BOOLEAN DEFAULT false,
  reference_photos      JSONB,
  raw_config            JSONB,
  active                BOOLEAN DEFAULT true
);
```

**Personas en DB_VARIABLES:** `po_patricia`, `dd_host_01`, `vizos_host_01`, `d7h_host_01`

---

### location_blueprints

```sql
CREATE TABLE location_blueprints (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id              TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  blueprint_id          TEXT UNIQUE,
  schema_version        TEXT DEFAULT 'BP_LOCATION_1.0',
  display_name          TEXT NOT NULL,
  location_type         TEXT,
  city                  TEXT,
  country               TEXT,
  status                TEXT DEFAULT 'active',
  visual_description    TEXT,
  materials             JSONB,
  color_palette         JSONB,
  lighting              TEXT,
  time_of_day_best      TEXT,
  signature_elements    JSONB,
  imagelab_realism      TEXT,
  imagelab_film_look    TEXT,
  imagelab_lens         TEXT,
  imagelab_dof          TEXT,
  imagelab_framing      TEXT,
  imagelab_prompt       TEXT,
  videolab_prompt       TEXT,
  compatible_archetypes JSONB,
  recommended_angles    JSONB,
  has_reference_photos  BOOLEAN DEFAULT false,
  reference_photos      JSONB,
  raw_config            JSONB,
  active                BOOLEAN DEFAULT true
);
```

**Locaciones en DB_VARIABLES:** `loc_po_salon_miami`, `loc_po_miami_beach`, `loc_po_downtown_miami`, `loc_dd_cabinas`

---

### product_blueprints

```sql
CREATE TABLE product_blueprints (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id             TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  schema_version       TEXT DEFAULT 'BP_PRODUCT_1.0',
  sku                  TEXT,
  name                 TEXT NOT NULL,
  category             TEXT,
  subcategory          TEXT,
  tagline              TEXT,
  description_short    TEXT,
  description_long     TEXT,
  ingredients          JSONB,
  claims               JSONB,
  claims_forbidden     JSONB,
  price                DECIMAL(10,2),
  currency             TEXT DEFAULT 'EUR',
  packaging_style      TEXT,
  dominant_hex         TEXT,
  imagelab_params      JSONB,
  keywords_primary     JSONB,
  keywords_secondary   JSONB,
  lifestyle_context    TEXT,
  has_reference_photos BOOLEAN DEFAULT false,
  reference_photos     JSONB,
  compliance_flags     JSONB,
  raw_config           JSONB,
  active               BOOLEAN DEFAULT true,
  UNIQUE(brand_id, sku)
);
```

---

### blueprint_schemas

```sql
CREATE TABLE blueprint_schemas (
  id           TEXT PRIMARY KEY,
  version      TEXT NOT NULL,
  type         TEXT NOT NULL,
  schema_json  JSONB NOT NULL,
  description  TEXT,
  labs_using   JSONB,
  active       BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);
```

**Schemas activos:** `BP_PERSON_1.0`, `BP_LOCATION_1.0`, `BP_PRODUCT_1.0`, `BP_COPY_1.0`  
**⚠️ Gap:** `BP_COPY_1.0` existe en BlueprintLab pero NO en DB_VARIABLES.

---

### script_templates

```sql
CREATE TABLE script_templates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id      TEXT REFERENCES brands(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  pack_type     TEXT,
  structure     JSONB,
  template_text TEXT NOT NULL,
  variables     JSONB,
  duration_sec  INT,
  active        BOOLEAN DEFAULT true
);
```

---

### voice_packs

```sql
CREATE TABLE voice_packs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id            TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  blocks              JSONB NOT NULL,
  total_duration_sec  INT,
  persona_ref         UUID REFERENCES voicelab_params(id),
  script_template_ref UUID REFERENCES script_templates(id),
  active              BOOLEAN DEFAULT true
);
```

---

### brand_assets

```sql
CREATE TABLE brand_assets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  name        TEXT,
  url         TEXT NOT NULL,
  cdn_url     TEXT,
  format      TEXT,
  width       INT,
  height      INT,
  has_alpha   BOOLEAN DEFAULT false,
  notes       TEXT,
  active      BOOLEAN DEFAULT true,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);
```

---

### page_sections (WebLab)

```sql
CREATE TABLE page_sections (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id            TEXT REFERENCES brands(id) ON DELETE CASCADE,
  section_name        TEXT NOT NULL,
  word_count_min      INT,
  word_count_max      INT,
  platforms           JSONB,
  structure           JSONB,
  output_template_ref TEXT REFERENCES output_templates(id),
  active              BOOLEAN DEFAULT true,
  UNIQUE NULLS NOT DISTINCT (brand_id, section_name)
);
```

---

### platform_configs (SocialLab)

```sql
CREATE TABLE platform_configs (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  char_limit     INT,
  hashtag_limit  INT,
  media_types    JSONB,
  aspect_ratios  JSONB,
  api_endpoint   TEXT,
  requires_auth  BOOLEAN DEFAULT true,
  active         BOOLEAN DEFAULT true
);
```

---

### stakeholders (opcional — context system)

```sql
CREATE TABLE stakeholders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role        TEXT,
  email       TEXT,
  phone       TEXT,
  authority   TEXT,
  notes       TEXT
);
```

---

## 4. DIAGRAMA DE RELACIONES

```
brands (core)
  ├── brand_palette           [1:N]
  ├── brand_typography        [1:N]
  ├── humanize_profiles       [1:N por medium + DEFAULT global NULL]
  ├── compliance_rules        [1:N + reglas globales NULL]
  ├── imagelab_presets        [1:N por canal + presets globales NULL]
  ├── videolab_params         [1:N por formato]
  ├── voicelab_params         [1:N por persona] ⚠️ voice_id TBD
  ├── keywords                [1:N]
  ├── ctas                    [1:N por servicio]
  ├── geomix                  [1:N por geo]
  ├── brand_assets            [1:N]
  ├── page_sections           [1:N + globales NULL]
  ├── person_blueprints       [1:N] → voicelab_params [FK]
  ├── location_blueprints     [1:N]
  ├── product_blueprints      [1:N]
  └── script_templates        [1:N] → voice_packs [FK → voicelab_params]

output_templates              [standalone — 16 SMPC]
canal_blocks                  [standalone — 13 canales]
blueprint_schemas             [standalone — BP_PERSON/LOCATION/PRODUCT/COPY]
platform_configs              [standalone]
stakeholders                  [1:N brands — opcional]
```

---

## 5. PLAN DE MIGRACIÓN

| Fase | Tablas | Seed | Estado |
|---|---|---|---|
| **1** | brands, humanize_profiles, compliance_rules, imagelab_presets | `seed_phase1.sql` | ✅ Listo |
| **2** | output_templates (16 SMPC), canal_blocks (13), ctas, keywords | `seed_phase2.sql` | Pendiente |
| **3** | videolab_params, voicelab_params, geomix (expandido), brand_palette, brand_typography | `seed_phase3.sql` | Pendiente |
| **4** | person_blueprints (4), location_blueprints (4), product_blueprints, blueprint_schemas | `seed_phase4.sql` | Pendiente |
| **5** | Conectar labs a Supabase | — | Pendiente |

**Orden Fase 5:** ImageLab → CopyLab → WebLab → SocialLab → VideoLab → VoiceLab → AgentLab → Orchestrator

---

## 6. PENDIENTES DE SAM

1. **voice_ids reales en ElevenLabs** → VoiceLab 100% bloqueado
2. **Decidir D5** → ¿ForumPHs y NeuroneSCF en Supabase?
3. **Completar K>PO** → keywords incompletas
4. **Fotos de referencia** → has_reference_photos = false en todos los blueprints
5. **Confirmar 3 brand_ids de Patricia Osorio** antes de crear las rows
6. **GeoMix** para VizosCosmetics, PatriciaOsorio*, NeuroneCosmetics, VivoseMask

---
*Claude — Unreal>ille Studio · 2026-03-25 · unrlvl-context/db/UNRLVL_Supabase_Schema.md*
