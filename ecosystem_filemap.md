# UNRLVL ECOSYSTEM — Mapa de Dependencias y Flujos
_version: 2026-04-06b · generado por Claude_

---

## CONVENCIONES

- ACTIVO — flujo funcional end-to-end  
- BLOQUEADO — flujo roto, causa identificada  
- PENDIENTE — no iniciado  
- Brand IDs canónicos: camelCase (DiamondDetails, NeuroneSCF, etc.)

---

## FLUJOS ACTIVOS

    Sam / Claude
        |
        |-- OnboardingApp ──────────────── Supabase (8 tablas)
        |     brands/humanize/compliance/palette/typography/goals/personas/geomix
        |
        |-- BlueprintLab ────────────────── Supabase
        |     person_blueprints / brand_copy_profiles
        |
        |-- Orchestrator ── /api/interpret-intent (Claude)
        |     |
        |     |-- CopyLab   /api/execute  ACTIVO
        |     |-- WebLab    /api/execute  ACTIVO
        |     |-- ImageLab  /api/execute  ACTIVO
        |     |-- SocialLab /api/execute  ACTIVO → scheduled_posts
        |     |-- VideoLab  /api/execute  BLOQUEADO sin HeyGen/Kling keys
        |     +-- VoiceLab  /api/execute  BLOQUEADO sin ElevenLabs key
        |
        |-- SocialLab (standalone)
        |     CopyLabImportPanel → parseCopyLabInput() → /api/generate-post
        |     └── scheduled_posts (Supabase) → OAuth pendiente → publicacion real
        |
        +-- AgentLab
              |-- Social Media Agent (NeuroneSCF)
              |     chat.js: raw_log por usuario ACTIVO
              |     export.js: detalle por usuario ACTIVO
              |     migrate.js: backfill historico ACTIVO
              |     KV registry: LAURA/SAMDEV/PATRICIA
              +-- ForumPHs Speaks (testing, API key browser pendiente serverless)

---

## FLUJOS ROTOS

| Flujo | Causa | Accion |
|---|---|---|
| VideoLab generacion | Sin cuentas HeyGen + Kling | Abrir cuentas → API keys → /api/execute |
| VoiceLab sintesis | Sin ElevenLabs + voice_ids TBD | Audio PO → ElevenLabs clone → voice_id |
| SocialLab publicacion real | OAuth Meta/TikTok pendiente | Sprint OAuth por marca |
| ForumPHs Speaks serverless | API key en browser | Migrar a AgentLab apps/forumphs-speaks/ |
| ImageLab brand_assets | Tabla vacia | Poblar URLs desde BluePrints repo |
| SMA session_log.md | Archivo desactualizado (2026-03-23) | Actualizar en repo unrlvl-context PENDIENTE |

---

## SUPABASE — TABLAS ACTIVAS (v1.9 — 33 tablas)

Tablas core: brands · brand_languages · brand_goals · brand_personas · humanize_profiles  
Labs: product_blueprints · person_blueprints · location_blueprints · brand_copy_profiles  
Social: scheduled_posts · brand_social_accounts · platform_configs  
Config: lab_configs (8 labs) · psycho_presets (10 presets) · compliance_rules  
Assets: brand_assets (vacia) · brand_palette · brand_typography  
Geo/SEO: geomix · keywords · seo_meta · ctas

---

## BRAND IDs CANONICOS

| ID Canonico | Inconsistencias conocidas |
|---|---|
| DiamondDetails | VoiceLab usa diamond_details |
| NeuroneSCF | WebLab interno usa neuroneCosmetics (auto-traducido) |
| D7Herbal | AgentLab Builder usa d7-herbal |
| UnrealvilleStudio | industry/positioning/tagline actualizados 2026-04-06 |

---

## SOCIAL MEDIA AGENT — ESTADO LOGGING

KV Keys activos:
- raw_log:LAURA — 2 exchanges (backfilled)
- raw_log:SAMDEV — 3 exchanges (backfilled)  
- raw_log:PATRICIA — 1 exchange (backfilled)
- log_registry:SOCIAL-MEDIA-AGENT — 3 usuarios registrados
- agent_log:SOCIAL-MEDIA-AGENT — resumen 2026-03-23

A partir de ahora: cada exchange se logea automaticamente en tiempo real.
Export en: /api/export?secret=*** — detalle completo por usuario, agrupado por dia.

---

## ROADMAP PRIORIZADO POR IMPACTO

1. INMEDIATO: Neurone SCF — numero fisico Laura + acceso aliases PO
2. INMEDIATO: Datos faltantes por marca → OnboardingApp + BlueprintLab
3. INMEDIATO: BP_COPY_1.0 NeuroneSCF + ForumPHs + UnrealvilleStudio → BlueprintLab
4. SPRINT: HeyGen + Kling cuentas → VideoLab motor real
5. SPRINT: ElevenLabs + audio PO → VoiceLab activo
6. SPRINT: OAuth Meta/TikTok → SocialLab publicacion autonoma
7. PROYECTO: LoRA Models PO → ImageLab identidad consistente
8. PENDIENTE: ForumPHs Speaks → AgentLab serverless

