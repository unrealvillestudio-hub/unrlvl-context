# UNRLVL Ecosystem — Radiografía Narrativa
_v2026-04-10b · Generado desde ecosystem.json · No editar directamente_

---

## CAPA A — PRODUCCIÓN

### CopyLab `unrlvl-copy-lab.vercel.app`
Claude Sonnet 4, 24 queries Supabase paralelas, 13 capas SMPC. `/api/execute` activo en Orchestrator. **Gap:** brand_copy_profiles vacío para NeuroneSCF, ForumPHs, UnrealvilleStudio.

### WebLab `web-lab.vercel.app`
Claude Sonnet 4. Supabase DONE. `/api/execute` activo.

**Sprint pendiente — Objectives Window + Institutional Templates:**
SiteLab NO se crea como lab separado — su función se absorbe en WebLab como modo especializado. Tipos target: `web_institucional` · `blog` · `propuesta_pitch` · `email_captacion`.

### ImageLab `image-lab-unrlvl.vercel.app`
Google Imagen 3 + Gemini 2.5 Flash. PsychoLayer integrado. `/api/execute` activo.

### SocialLab `social-lab-flame.vercel.app`
Claude vía `/api/generate-post`. CopyLabBridge activo. **Gap bloqueante:** OAuth Meta/TikTok pendiente.

### Orchestrator `orchestrator.vercel.app`
4 labs activos: CopyLab, WebLab, ImageLab, SocialLab.

### OnboardingApp `unrlvl-onboarding-app.vercel.app`
Phase 4 completa — 8 tablas Supabase.

### unrealvillestudio.com 🆕 LIVE
Site institucional deployado en CoreProject (Vercel Pro). Dominio conectado via GoDaddy DNS. `www` redirige a raíz. **Pendiente:** formulario de contacto — backend por conectar.

---

## CAPA B — AGENTES DE CLIENTE

### Social Media Agent `unrlvl-social-media-agent.vercel.app`
NeuroneSCF. Sin actividad nueva desde 2026-04-06. **Gap:** no accede a session_log de marca en Context System.

### ForumPHs Speaks `forumphs-speaks.vercel.app`
Ley 284, Panamá. Operado por Ivette Flores. v1.2 — UI completa. Knowledge base v2. **Pendiente crítico:** ANTHROPIC_API_KEY en Supabase Secrets.

---

## CAPA C — LABS INTERNOS

**VideoLab / VoiceLab** — bloqueados por API keys externas.
**AgentLab / BlueprintLab / UNRLVL-OPS** — sin cambios.

---

## INFRAESTRUCTURA

**Supabase** — v2.0, 37 tablas, 14MB/500MB.
**Vercel** — Plan Pro activo desde 2026-04-10. Uso comercial habilitado.
**BluePrints repo** — `unrlvl-blueprints.vercel.app`. BP_BRAND_UNRLVL_v1.2 canónico — JSON + HTML ES+EN. Animación canónica: `prompt-blink 1.1s step-end`. Migración brand-first pendiente ejecución manual.

---

## BRAND SYSTEM — UNREALVILLE v1.2 ✅

- `BP_BRAND_UNRLVL_v1.2.json` — source of truth
- Logotype: `.lt-logotype` / `.lt-chevron` / `.lt-studio` — canónico
- Animación: `prompt-blink 1.1s step-end` (`chevron-blink` / `chev-listen` deprecados)
- HQ: 12951 Biscayne Blvd · North Miami, FL 33181
- Footer golden rule: client outputs Col1 = client logo siempre

---

## ESTADO POR MARCA

| Marca | Estado | Bloqueante |
|---|---|---|
| DiamondDetails / VizosCosmetics / D7Herbal | 🟢 | — |
| VivoseMask | 🟡 | humanize/palette pendientes |
| PO ×3 | 🟢 | voice clone + LoRA pendientes |
| NeuroneSCF | 🟡 | copy_profile + OAuth + infra digital |
| ForumPHs | 🟡 | ANTHROPIC_API_KEY + domain |
| UnrealvilleStudio | 🟢 | formulario contacto + Cloudflare |

---

## TOP 3 GAPS CRÍTICOS

1. **Formulario contacto unrealvillestudio.com** — site live sin backend de contacto.
2. **ANTHROPIC_API_KEY Supabase Secrets** — ForumPHs Speaks no responde.
3. **brand_copy_profiles NeuroneSCF + ForumPHs** — CopyLab sin voz real para estas marcas.

---
_Generado 2026-04-10 · ecosystem.json v2026-04-10b_
