# UNRLVL ECOSYSTEM — Radiografía Narrativa
_Generado desde ecosystem.json · 2026-04-14 · Claude Sonnet 4.6_

---

## ESTADO GENERAL

**Unrealville Studio** es una Brand Intelligence Infrastructure operando en Florida USA + LATAM + España. Todos los sistemas críticos están en producción. La sesión 2026-04-14 cierra **FPH-012** — el último sprint del Document Factory v1.4 — con pipeline 100% completo y ForumPHs Speaks en vivo.

---

## CAPA A — PRODUCCIÓN REAL

### ForumPHs — 🟢 AMBOS PRODUCTOS LIVE

**ForumPHs Speaks** (`forumphs-speaks.vercel.app`)
Motor: Claude Sonnet 4 via Supabase Edge Functions (fphs-session v6 + fphs-chat v5). QA layer activo (chev-listen 1.1s). Knowledge base v2 con 3 correcciones validadas por Ivette. RLS aplicado. ANTHROPIC_API_KEY en Supabase Secrets — LIVE desde 2026-04-14.
Pendiente: CNAME `speaks.forumphs.com`, foto Ivette.

**ForumPHs Document Factory v1.4** (`forumphs-document-factory.vercel.app`) — **CERRADO**
Pipeline: ZIP → Pre-flight → Paso 0.5 (17 agentes Supabase) → Generar → QA → ICR → Revisión ICR → Descarga.
Último test: 328/328 bloques (100%), ~36 páginas, PASS.
Features v1.4: ICR inline annotations (banners coloreados + Anexo ICR en DOCX), sweep user-driven 2º/3er barrido +10%, footer BP_BRAND_v1.2 compliant, FPHS logo PNG, UNRLVL chev-listen animated.
Edge functions: fphs-formalize v7 + fphs-icr-apply v1.
**No hay next sprint** — producto entregado.

### Labs en producción

| Lab | URL | Estado |
|---|---|---|
| CopyLab | unrlvl-copy-lab.vercel.app | PASSED v8.0 — 24 queries paralelas |
| WebLab | web-lab.vercel.app | PASSED — Supabase DONE |
| ImageLab | image-lab-unrlvl.vercel.app | PASSED — PsychoLayer DONE |
| SocialLab | social-lab-flame.vercel.app | PASSED — CopyLabBridge DONE |
| AgentLab | agent-lab-unrlvl.vercel.app | PASSED — blueprints Supabase-first |
| BlueprintLab | unrlvl-blueprint-lab.vercel.app | PASSED — 4 schemas |
| Orchestrator | orchestrator.vercel.app | PASSED — 4 labs activos |
| OnboardingApp | unrlvl-onboarding-app.vercel.app | PASSED — Phase 4, 8 tablas |
| UNRLVL-OPS | — | PASSED — producción |

Labs bloqueados: **VideoLab** (HeyGen/Kling API keys pendientes), **VoiceLab** (voice_ids ElevenLabs pendientes).

### Social Media Agent — NeuroneSCF
`unrlvl-social-media-agent.vercel.app` · Operador: Laura Rodriguez.
Sin novedades desde 2026-04-10. Meta BM parcialmente configurado — Laura/PO deben completar info empresa desde Miami sin VPN.
Gap crítico: el agente no lee el session_log automáticamente — pendiente inyectar URL en system prompt.

### unrealvillestudio.com
LIVE desde 2026-04-10. Pendiente: formulario de contacto backend + Cloudflare redirect rules.

---

## CAPA B — INFRAESTRUCTURA

**Supabase** (`amlvyycfepwhiindxgzw`): schema v2.0, 37 tablas. 14MB/500MB (2.8%). Free suficiente.
**Vercel Pro**: $20/mes. Todos los proyectos en `unrealvillestudio-projects`.
**Context System**: `unrlvl-context.vercel.app` — source of truth del ecosistema.
**BluePrints repo**: brand-first structure. BP_BRAND_UNRLVL_v1.2 canónico.

---

## GAPS PRIORITARIOS

1. `speaks.forumphs.com` CNAME en Cloudflare
2. Foto Ivette en ForumPHs Speaks
3. Meta BM info empresa — Laura/PO desde Miami
4. `unrealvillestudio.com` redirect rules + contacto
5. BP_COPY_1.0 para NeuroneSCF + ForumPHs + UnrealvilleStudio
6. Onboarding: ForumPHs, VivoseMask, PO x3
7. WebLab sprint: Objectives Window + plantillas institucionales
