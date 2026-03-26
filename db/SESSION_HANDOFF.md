# HANDOFF — Sesión 2026-03-25
**Para:** Próximo chat  
**Estado:** Migración DB_VARIABLES → Supabase en curso  
**Contexto principal:** `ecosystem.json` v2026-03-25e + `db/UNRLVL_Supabase_Schema.md` v1.1

---

## QUÉ SE HIZO HOY (resumen ejecutivo)

1. **Auditoría completa** de DB_VARIABLES_v6_4.xlsx (40 hojas) — lectura real del archivo
2. **Schema Supabase diseñado** — 23 tablas DDL, 5 decisiones arquitectónicas resueltas
3. **Proyecto Supabase creado** — MCP conectado y activo
4. **Fases 1-4 ejecutadas** — 19 tablas pobladas con datos reales del xlsx

---

## ESTADO ACTUAL DE SUPABASE

| Tabla | Rows | Notas |
|---|---|---|
| `brands` | 8 | DiamondDetails, VizosCosmetics, D7Herbal, VivoseMask, PatriciaOsorioPersonal, PatriciaOsorioComunidad, PatriciaOsorioVizosSalon, NeuroneCosmetics |
| `humanize_profiles` | 12 | 5 DEFAULT globales + 7 overrides por marca |
| `compliance_rules` | 10 | 3 globales + 7 por marca |
| `imagelab_presets` | 7 | W0101, L0101, L0201, M0101, M0201, T0101, T0201 |
| `canal_blocks` | 13 | WEB, LANDING_PAGE, BLOG, META_ADS, TIKTOK_ADS, GOOGLE_SEARCH_RSA, GOOGLE_PMAX, YOUTUBE, INSTAGRAM_ORGANICO, TIKTOK_ORGANICO, OMNICANAL, EMAIL, ECOMMERCE |
| `output_templates` | 16 | SMPC_full, Ads_FullPro, SEO_FullPro, SEO_Brand_FullPro, YouTube_x6, + más |
| `keywords` | 444 | Todas las marcas del xlsx |
| `ctas` | 47 | Por marca × servicio |
| `geomix` | 12 | DD×5 + D7H×7 (falta VizosCosmetics, PO, Neurone, VivoseMask) |
| `videolab_params` | 6 | reel_15s, reel_30s, youtube_short, youtube_standard, tiktok_15s, spot_30s |
| `voicelab_params` | 8 | Por persona × marca — todos voice_id = TBD_* |
| `person_blueprints` | 5 | po_patricia(PO), dd_host_01(DD), vizos_host_01(Vizos), d7h_host_01(D7H), neurone_host_01(Neurone) |
| `location_blueprints` | 7 | 3×PO Miami, 2×DD Alicante, 1×generic event stage, 1×Neurone Salon |
| `product_blueprints` | 2 | D7Herbal (INCI completo), VivoseMask (INCI pendiente ficha Vizos) |
| `blueprint_schemas` | 4 | BP_PERSON_1.0, BP_LOCATION_1.0, BP_PRODUCT_1.0, BP_COPY_1.0 |
| `brand_palette` | 0 | Vacía — esperando hexes confirmados por marca |
| `brand_typography` | 0 | Vacía — esperando fuentes confirmadas por marca |

---

## FIXES APLICADOS HOY (críticos para no repetir errores)

### Fix 1 — imagelab_presets constraint
**Problema:** DDL original tenía `UNIQUE (brand_id, canal)` — error porque hay múltiples presets por canal (L0101+L0201 = ambos LANDING, M0101+M0201 = ambos META).  
**Solución aplicada:** `UNIQUE NULLS NOT DISTINCT (brand_id, preset_id)`  
**Dónde está documentado:** `UNRLVL_Supabase_Schema.md` v1.1

### Fix 2 — Patricia Osorio brand_id mapping
**Situación:** DB_VARIABLES usa `PatriciaOsorio` genérico. Supabase tiene 3 IDs canónicos.  
**Decisión:** `po_patricia` y `loc_po_*` → mapeados a `PatriciaOsorioPersonal` con nota en `raw_config` indicando que aplica a los 3 brand_ids hasta que se creen blueprints específicos.

### Fix 3 — loc_generic_event_stage
**Situación:** Locación multi-marca (no pertenece a una sola marca).  
**Decisión:** Seed en `PatriciaOsorioPersonal` con nota en `raw_config` de uso multi-marca.

---

## DECISIONES ARQUITECTÓNICAS — TODAS RESUELTAS

| # | Decisión | Resolución |
|---|---|---|
| D1 | ¿brands monolítica o normalizada? | Normalizada — 23 tablas |
| D2 | ¿Output_Templates/Canal_Blocks en Supabase o código? | Supabase |
| D3 | ¿HUMANIZE como tabla propia o JSONB? | Tabla propia — patrón DEFAULT + overrides |
| D4 | ¿DV_* como tablas de referencia o enums en código? | Enums en código |
| D5 | ¿ForumPHs y NeuroneSCF en Supabase? | **SÍ — ambas como marcas completas** con pipeline creativo completo (ads, social, avatares) + agentes + skills |

---

## LO QUE FALTA — PRÓXIMA SESIÓN

### Inmediato (próximo chat)
1. **Añadir ForumPHs a `brands`** — datos en `https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json`
2. **Añadir NeuroneSCF a `brands`** — datos en `https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json`

### Cuando Sam tenga los datos
3. `brand_palette` — hexes reales por marca (NO inferir de visual_identity)
4. `brand_typography` — fuentes reales por marca
5. INCI VivoseMask — cuando llegue ficha de Vizos
6. Voice IDs reales → ElevenLabs (VoiceLab 100% bloqueado hasta que se resuelva)

### Siguiente gran bloque técnico
7. **Fase 5 — conectar labs a Supabase**  
   Orden recomendado: CopyLab → ImageLab → WebLab → SocialLab → VideoLab → VoiceLab → AgentLab → Orchestrator  
   Cada lab requiere modificar su código para leer de Supabase en vez de DB_VARIABLES

---

## DATOS IMPORTANTES QUE NO ESTÁN EN EL XLSX

- **brand_palette** y **brand_typography**: NO están en DB_VARIABLES v6_4 — hay que pedírselas a Sam directamente
- **GeoMix** solo existe para DiamondDetails y D7Herbal en el xlsx — el resto hay que crearlo desde cero
- **K>PO** (Patricia Osorio keywords) está incompleto — solo tiene INSTAGRAM_ORGANICO, faltan prompts SMPC/Ads
- **BP_COPY_1.0** existe en BlueprintLab pero NO está en DB_VARIABLES — hay que crearlo al conectar CopyLab
- **ForumPHs y NeuroneSCF** no están en DB_VARIABLES v6_4 — sus datos están en el context system (Vercel)

---

## ARCHIVOS CLAVE EN EL CONTEXT SYSTEM

```
https://unrlvl-context.vercel.app/ecosystem.json              ← Estado completo del ecosistema
https://unrlvl-context.vercel.app/db/UNRLVL_Supabase_Schema.md ← DDL 23 tablas v1.1
https://unrlvl-context.vercel.app/db/seed_phase1.sql           ← Seed Fase 1 (referencia)
https://unrlvl-context.vercel.app/db/DB_VARIABLES_audit_summary.md ← Mapa 40 hojas → tablas
https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json   ← Datos ForumPHs
https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json ← Datos NeuroneSCF
```

---

## CÓMO ARRANCAR EL PRÓXIMO CHAT

Di: **"Ecosistema — cargar handoff de sesión y continuar migración Supabase"**

El chat debe cargar:
1. `ecosystem.json` — estado general
2. `db/UNRLVL_Supabase_Schema.md` — schema completo
3. Este archivo `db/SESSION_HANDOFF.md` — contexto vivo

Con esos tres archivos tiene todo lo necesario.

---
*Claude — Unreal>ille Studio · 2026-03-25 · unrlvl-context/db/SESSION_HANDOFF.md*
