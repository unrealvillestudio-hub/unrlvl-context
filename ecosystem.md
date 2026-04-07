# UNRLVL Ecosystem — Radiografía Narrativa
_v2026-04-07b · Generado desde ecosystem.json · No editar directamente_

---

## CAPA A — PRODUCCIÓN

### CopyLab `unrlvl-copy-lab.vercel.app`
Claude Sonnet 4, 24 queries Supabase paralelas, 13 capas SMPC. Endpoint `/api/execute` activo. **Gap:** brand_copy_profiles vacío para NeuroneSCF, ForumPHs, UnrealvilleStudio.

### WebLab `web-lab.vercel.app`
Claude Sonnet 4. Supabase DONE. `/api/execute` activo.

### ImageLab `image-lab-unrlvl.vercel.app`
Google Imagen 3 + Gemini 2.5 Flash. PsychoLayer integrado. `/api/execute` activo.

### SocialLab `social-lab-flame.vercel.app`
Claude vía `/api/generate-post`. CopyLabBridge activo. **Gap bloqueante:** OAuth Meta/TikTok pendiente — sin publicación real.

### Orchestrator `orchestrator.vercel.app`
4 labs activos: CopyLab, WebLab, ImageLab, SocialLab. Inactivos: BlueprintLab, VideoLab, VoiceLab.

### OnboardingApp `unrlvl-onboarding-app.vercel.app`
Phase 4 — escribe 8 tablas Supabase. Sin gaps bloqueantes.

---

## CAPA B — AGENTES DE CLIENTE

### Social Media Agent `unrlvl-social-media-agent.vercel.app`
NeuroneSCF. Claude Sonnet 4 + @vercel/kv 90 días. Operado por Laura Rodriguez. Sin actividad nueva desde 2026-04-06. **Gap:** no accede a session_log de marca en Context System.

### ForumPHs Speaks `forumphs-speaks.vercel.app`
Agente Ley 284, Panamá. Operado por Ivette Flores.

**Arquitectura v1.2 (2026-04-07):**
- Frontend: HTML estático en Vercel. Splash screen con CTA pulsante + "Speaks" logotipo gradiente.
- Backend: fphs-session v6 + fphs-chat v5 (Supabase Edge Functions).
- QA Layer: doble razonamiento Claude, animación canónica `chev-listen`.
- UNRLVL Signature: BP_BRAND_UNRLVL_v1.2 — footer 3 columnas, border-top 2px #00FFD1.
- Knowledge base v2: 3 correcciones Ivette validadas.
- Favicon FPHS con alpha channel embebido inline.

**Pendiente crítico:** ANTHROPIC_API_KEY en Supabase Secrets.

---

## CAPA C — LABS INTERNOS

### AgentLab, BlueprintLab, UNRLVL-OPS
Sin cambios desde 2026-04-05. Ver filemap para detalle.

### VideoLab / VoiceLab
Bloqueados por API keys externas (HeyGen/Kling/ElevenLabs).

---

## INFRAESTRUCTURA

### Supabase `amlvyycfepwhiindxgzw`
v2.0 — 37 tablas. 14MB/500MB. Free plan suficiente.

### BluePrints Repo
Assets BP_BRAND por marca. Diferente de BlueprintLab (la app). BP_BRAND_UNRLVL_v1.2 existe como HTML — versión JSON en repo es v1.0. **Nota:** animación canónica v1.2 = `chev-listen` (no `chevron-blink`).

---

## ESTADO POR MARCA

| Marca | Estado | Bloqueante |
|---|---|---|
| DiamondDetails / VizosCosmetics / D7Herbal | 🟢 | — |
| VivoseMask | 🟡 | humanize/palette pendientes |
| PO ×3 | 🟢 | voice clone + LoRA pendientes |
| NeuroneSCF | 🟡 | copy_profile + OAuth + infra digital |
| ForumPHs | 🟡 | ANTHROPIC_API_KEY + domain |
| UnrealvilleStudio / Stores | 🟢 | copy_profile + palette pendientes |

---

## TOP 3 GAPS CRÍTICOS

1. **ANTHROPIC_API_KEY Supabase Secrets** — ForumPHs Speaks no responde. 2 min en dashboard.
2. **Vercel Pro upgrade** — Hobby prohíbe uso comercial. $20/mes.
3. **brand_copy_profiles NeuroneSCF + ForumPHs** — CopyLab no genera copy para estas marcas.

---
_Generado 2026-04-07 · ecosystem.json v2026-04-07b_
