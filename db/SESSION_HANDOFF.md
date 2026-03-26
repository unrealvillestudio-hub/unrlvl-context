# HANDOFF — Sesión 2026-03-25 (FINAL)
**Para:** Próximo chat  
**Estado:** Migración DB_VARIABLES → Supabase FASES 1-4 COMPLETAS  
**Próximo paso:** Fase 5 — conectar labs a Supabase

---

## ESTADO FINAL DE SUPABASE

| Tabla | Rows | Notas |
|---|---|---|
| `brands` | **10** | Ecosistema completo — ver detalle abajo |
| `humanize_profiles` | 12 | 5 DEFAULT + 7 overrides por marca |
| `compliance_rules` | 10 | 3 globales + 7 por marca |
| `imagelab_presets` | 7 | W0101, L0101, L0201, M0101, M0201, T0101, T0201 |
| `canal_blocks` | 13 | WEB, LANDING, BLOG, META_ADS, TIKTOK_ADS, RSA, PMAX, YOUTUBE, IG, TIKTOK, OMNICANAL, EMAIL, ECOMMERCE |
| `output_templates` | 16 | SMPC_full, Ads_FullPro, SEO_FullPro, SEO_Brand_FullPro, YouTube×6, + más |
| `keywords` | 444 | Todas las marcas del xlsx |
| `ctas` | 47 | Por marca × servicio |
| `geomix` | 12 | DD×5 + D7H×7 |
| `videolab_params` | 6 | 6 formatos |
| `voicelab_params` | 8 | Por persona — todos voice_id TBD_* |
| `person_blueprints` | 5 | po_patricia, dd_host_01, vizos_host_01, d7h_host_01, neurone_host_01 |
| `location_blueprints` | 7 | 3×PO Miami, 2×DD Alicante, event_stage, Neurone Salon |
| `product_blueprints` | 2 | D7Herbal (INCI completo), VivoseMask (INCI pendiente) |
| `blueprint_schemas` | 4 | BP_PERSON_1.0, BP_LOCATION_1.0, BP_PRODUCT_1.0, BP_COPY_1.0 |
| `brand_palette` | 0 | ⏳ Vacía — esperando hexes confirmados |
| `brand_typography` | 0 | ⏳ Vacía — esperando fuentes confirmadas |

### 10 marcas en `brands`
`DiamondDetails`, `VizosCosmetics`, `D7Herbal`, `VivoseMask`, `PatriciaOsorioPersonal`, `PatriciaOsorioComunidad`, `PatriciaOsorioVizosSalon`, `NeuroneCosmetics`, `ForumPHs`, `NeuroneSCF`

**ForumPHs notes:** RUC, portafolio, brecha, CPA, agent deployment  
**NeuroneSCF notes:** pricing model, status Shopify, infra dominio, kits, relación con NeuroneCosmetics y PO

---

## DECISIONES ARQUITECTÓNICAS — TODAS RESUELTAS

| # | Decisión | Resolución |
|---|---|---|
| D1 | ¿brands monolítica o normalizada? | Normalizada — 23 tablas |
| D2 | ¿Output_Templates/Canal_Blocks en Supabase o código? | Supabase |
| D3 | ¿HUMANIZE como tabla propia o JSONB? | Tabla propia — patrón DEFAULT + overrides |
| D4 | ¿DV_* como tablas o enums? | Enums en código |
| D5 | ¿ForumPHs y NeuroneSCF en Supabase? | ✅ SÍ — ambas como marcas completas con pipeline creativo |

---

## FIXES APLICADOS (no repetir errores)

1. **imagelab_presets constraint** → `UNIQUE NULLS NOT DISTINCT (brand_id, preset_id)` — NO (brand_id, canal) porque hay múltiples presets por canal
2. **Patricia Osorio** → `po_patricia` y `loc_po_*` mapeados a `PatriciaOsorioPersonal` con nota en raw_config indicando que aplica a los 3 brand_ids
3. **loc_generic_event_stage** → seed en PatriciaOsorioPersonal con nota de uso multi-marca
4. **brand_palette/typography** → NO inferir de visual_identity — esperar hexes/fuentes reales de Sam

---

## FASE 5 — CONECTAR LABS A SUPABASE

**Orden recomendado:** CopyLab → ImageLab → WebLab → SocialLab → VideoLab → VoiceLab → AgentLab → Orchestrator

**Por qué CopyLab primero:** Consume 15 tablas — el que más se beneficia de datos centralizados.

Para cada lab: modificar código para leer de Supabase en vez de DB_VARIABLES. Requiere credenciales Supabase (URL + anon key).

---

## PENDIENTES QUE NECESITAN DATOS DE SAM

1. `brand_palette` — hexes reales por marca (NO inferir)
2. `brand_typography` — fuentes reales por marca
3. INCI VivoseMask — llega con ficha de Vizos
4. Voice IDs — ElevenLabs (VoiceLab 100% bloqueado)
5. GeoMix para VizosCosmetics, PatriciaOsorio*, NeuroneCosmetics, VivoseMask

---

## ARCHIVOS CLAVE

```
https://unrlvl-context.vercel.app/ecosystem.json                    ← v2026-03-25f
https://unrlvl-context.vercel.app/db/UNRLVL_Supabase_Schema.md      ← v1.1 DDL 23 tablas
https://unrlvl-context.vercel.app/db/DB_VARIABLES_audit_summary.md  ← mapa 40 hojas
https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json        ← contexto ForumPHs
https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json      ← contexto NeuroneSCF
```

---

## CÓMO ARRANCAR EL PRÓXIMO CHAT

> **"Ecosistema — cargar handoff de sesión. Fase 5: conectar CopyLab a Supabase."**

Cargar: `ecosystem.json` + `db/UNRLVL_Supabase_Schema.md` + `db/SESSION_HANDOFF.md`

---
*Claude — Unreal>ille Studio · 2026-03-25 · unrlvl-context/db/SESSION_HANDOFF.md*
