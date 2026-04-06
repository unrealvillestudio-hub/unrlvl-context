# UNRLVL ECOSYSTEM — Radiografía Narrativa
_version: 2026-04-06b · last_audit: 2026-04-06 · generado por Claude_

---

## ESTADO GLOBAL

**11 marcas activas** — 8 green / 3 yellow  
**11 labs** — 11 en producción / 2 bloqueados externos  
**2 agentes desplegados**  
**Supabase:** v1.9 — 33 tablas · MCP conectado  

---

## RESUELTO EN ESTA SESIÓN

- UnrealvilleStudio — tagline/industry/positioning/language/brand_context actualizados en Supabase y ecosystem.json
- brand_languages — UnrealvilleStudio (en-FL+es-FL) + PatriciaOsorio×3 (en-FL añadido) poblados
- BP_BRAND UnrealvilleStudio v1.2 ES+EN — chevron blinking, ICR redesign, 7 Intelligence Layers, STUDIO estandarizado
- Social Media Agent — chat.js: raw log automático por usuario + backfill histórico + token registry
- Social Media Agent — export.js: export detallado por usuario (Laura/PO/Sam) con historial completo
- Social Media Agent — migrate.js: endpoint de backfill proactivo (nuevo archivo)
- Social Media Agent — session_log.md: actualizado con estado real de infraestructura Neurone SCF
- Social Media Agent — migrate ejecutado: Laura 2 exchanges, Sam 3 exchanges, Paty 1 exchange recuperados

---

## CAPA A — PRODUCCIÓN

### Labs en producción

**CopyLab** (LAB-CPL)  
  - Status: PASSED v8.0 — produccion
  - Engine: Claude Sonnet 4 server-side — 100% Supabase-driven, 24 queries paralelas
  - Orchestrator: /api/execute — ACTIVO
  - GAPS: brand_copy_profiles vacio para NeuroneSCF, ForumPHs, UnrealvilleStudio — poblar via BlueprintLab

**WebLab** (LAB-WL)  
  - Status: PASSED — Supabase integration DONE
  - Engine: Claude Sonnet 4 server-side
  - Orchestrator: /api/execute — ACTIVO
  - GAPS: humanize_profiles: poblar para marcas restantes via OnboardingApp

**ImageLab** (LAB-IL)  
  - Status: PASSED ICR v1.0 — Supabase + PsychoLayer DONE
  - Engine: Google Imagen 3 + Gemini 2.5 Flash multimodal
  - Orchestrator: /api/execute — ACTIVO
  - GAPS: brand_assets: tabla vacia — poblar con URLs de BluePrints repo

**AgentLab** (LAB-AL)  
  - Status: PASSED — Supabase-first blueprints DONE
  - Engine: blueprintStore.ts Supabase-first: loadAllBlueprints() → person_blueprints + location_blueprints + product_blueprints. Fallback IndexedDB.
  - GAPS: WebChat embed code apunta a dominio inexistente · WhatsApp webhook URL inexistente

**BlueprintLab** (LAB-BPL)  
  - Status: PASSED — Vercel + Supabase DONE
  - Sin gaps.

**Orchestrator** (LAB-ORCH)  
  - Status: PASSED — Claude server-side + 4 labs activos
  - Engine: Claude Sonnet 4 server-side via /api/interpret-intent
  - Sin gaps.

**SocialLab** (LAB-SL)  
  - Status: PASSED — CopyLabBridge integrado, Gemini eliminado
  - Engine: Claude Sonnet 4 server-side via /api/generate-post
  - Orchestrator: /api/execute — ACTIVO (escribe en scheduled_posts Supabase)
  - GAPS: Meta/TikTok OAuth pendiente — brand_social_accounts lista esperando tokens

**VideoLab** (LAB-VL)  
  - Status: PASSED UI — storyboard operativo, generacion video bloqueada
  - Engine: Sin motor real — HeyGen/Kling planificados pero cuentas pendientes
  - GAPS: No genera video real · videolab_params en Supabase listos pero HeyGen/Kling sin API keys

**VoiceLab** (LAB-VOL)  
  - Status: PASSED UI — sintetizador bloqueado por voice_ids
  - GAPS: voice_ids = TBD_* para todas las marcas

**UNRLVL-OPS** (LAB-OPS)  
  - Status: PASSED — produccion
  - Sin gaps.

**Onboarding App** (LAB-OBD)  
  - Status: PASSED — Phase 4 completa, 8 tablas
  - Engine: Claude Sonnet 4 server-side
  - Sin gaps.

### Agentes desplegados

**Social Media Agent** → NeuroneSCF
  - Status: active — produccion
  - Logging: raw_log por usuario activo. Registry: LAURA/SAMDEV/PATRICIA. Export detallado en /api/export.
  - Session log: Actualizado 2026-04-06 — aliases completos, numero fisico pendiente, BM/IG/WABA/TikTok pendientes

**ForumPHs Speaks** → ForumPHs
  - Status: testing — v2 checkpoint
  - Next: Migrar a apps/forumphs-speaks/ en AgentLab → 2-3h

---

## CAPA B — ESTADO POR MARCA

🟢 **Diamond Details** (DiamondDetails)  
  - Market: Alicante, Espana · Lang: es-ES
  - last_updated: 2026-03-27

🟢 **Vizos Cosmetics** (VizosCosmetics)  
  - Market: Miami + Espana · Lang: es-ES
  - last_updated: 2026-03-25

🟢 **D7 Herbal** (D7Herbal)  
  - Market: Alicante, Espana · Lang: es-ES
  - last_updated: 2026-03-25

🟡 **Vivose Mask** (VivoseMask)  
  - Market: Espana · Lang: es-ES
  - last_updated: 2026-03-25

🟢 **Patricia Osorio · Personal** (PatriciaOsorioPersonal)  
  - Market: Miami, FL · Lang: es-FL
  - Copy Profile: DONE — voice_writing_style=AUTHORITY_EDU
  - last_updated: 2026-04-04

🟢 **Patricia Osorio · Comunidad** (PatriciaOsorioComunidad)  
  - Market: Miami, FL · Lang: es-FL
  - Copy Profile: DONE — voice_writing_style=COMMUNITY_MOTIVATOR
  - last_updated: 2026-04-04

🟢 **Patricia Osorio · Vizos Salon** (PatriciaOsorioVizosSalon)  
  - Market: Miami, FL · Lang: es-FL
  - Copy Profile: DONE — voice_writing_style=LUXURY_EXPERT
  - last_updated: 2026-04-04

🟡 **Neurone South & Central Florida** (NeuroneSCF)  
  - Market: South & Central Florida, USA · Lang: es-FL
  - Data: humanize/goals/personas/geomix completos. copy_profile PENDIENTE. Shopify precios pendientes.
  - last_updated: 2026-04-05

🟡 **ForumPHs** (ForumPHs)  
  - Market: Panama · Lang: es-PA
  - Data: Datos en Supabase pendientes — onboarding via OnboardingApp.
  - last_updated: 2026-04-05

🟢 **Unrealville Studio** (UnrealvilleStudio)  
  - Market: Florida USA + LATAM + Espana · Lang: en/FL
  - Industry: Brand Intelligence Infrastructure
  - Data: brand_context/tagline/industry/positioning/key_messages/goals/personas/geomix/brand_languages completos. humanize/palette/typography/copy_profile pendientes.
  - last_updated: 2026-04-06

🟢 **Unrealville Stores** (UnrealvilleStores)  
  - Market: Florida USA — expansion USA · Lang: es-FL
  - Data: brand_context/story/icp/goals/personas/geomix completos. humanize/palette/typography pendientes.
  - last_updated: 2026-03-30

---

## PROYECTOS ESPECIALES

**PsychoLayer** — PRODUCTION — integrado en ImageLab + CopyLab Layer 11  
Presets activos: PSY-URGENCY, PSY-SCARCITY, PSY-AUTHORITY, PSY-BELONGING, PSY-FOMO, PSY-TRUST, PSY-IDENTITY, PSY-ASPIRATION, PSY-CURIOSITY, PSY-SOCIAL-PROOF  
Integrado: ImageLab (buildPsychoVisualInjection) + CopyLab Layer 11.  
Pendiente: injection_copy CopyLab SMPC · SocialLab · VideoLab · VoiceLab.

**LoRA Models** — PENDIENTE — no iniciado  
Objetivo: identidad visual consistente PO via FLUX LoRA (Replicate/Fal.ai).  
Bloqueado: cuentas + validación fotos PO.

**Voice Cloning** — PENDIENTE — proveedor decidido, assets pendientes  
Provider: ElevenLabs (FINAL). Bloqueado: audio PO + cuenta + API key.

---

## LOS 3 GAPS PRINCIPALES

1. **Datos incompletos por marca** — humanize_profiles, brand_palette, brand_typography, brand_copy_profiles para múltiples marcas. Sin estos datos los Labs generan outputs sin ADN real.
2. **VideoLab + VoiceLab sin cuentas externas** — HeyGen/Kling/ElevenLabs bloquean producción AV completa.
3. **OAuth Social pendiente** — SocialLab escribe en scheduled_posts pero no publica. Meta/TikTok OAuth por marca es el último paso.

---

## AGENDA PRÓXIMA SESIÓN

- PRIORIDAD 0 — AGENTE SMA: Neurone SCF — Laura adquiere numero fisico dedicado (SIM T-Mobile/AT&T prepago Miami). PO confirma acceso a 7 aliases email.
- PRIORIDAD 1 — DATOS: Onboarding de todas las marcas pendientes via OnboardingApp (ForumPHs, VivoseMask, PO×3 humanize, DiamondDetails goals/personas, VizosCosmetics goals/personas)
- PRIORIDAD 1 — DATOS: BP_COPY_1.0 para NeuroneSCF + ForumPHs + UnrealvilleStudio via BlueprintLab
- PRIORIDAD 1 — DATOS: Hex codes reales de paleta y tipografia para todas las marcas (solo Sam los tiene)
- PRIORIDAD 2 — SPRINT VideoLab: Abrir cuentas HeyGen + Kling → implementar /api/execute en VideoLab → activar en lab_configs → Orchestrator orquesta video completo
- PRIORIDAD 2 — CUENTAS: ElevenLabs + audio PO → voice clone → VoiceLab activo
- PRIORIDAD 3 — SPRINT OAuth: Meta/TikTok OAuth por marca → SocialLab publica real (scheduled_posts → publicado)
- PRIORIDAD 3 — ForumPHs Speaks: Migrar API key browser → AgentLab serverless apps/forumphs-speaks/
- PRIORIDAD 4 — LoRA Models: Cuenta Replicate/Fal.ai + validar fotos PO + entrenar modelo
- PRIORIDAD 4 — TESTING: Verificar flujo completo Orchestrator con NeuroneSCF (CopyLab → ImageLab → WebLab → SocialLab)
