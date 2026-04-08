# UNRLVL Ecosystem — Radiografía Narrativa
_v2026-04-07c · Generado desde ecosystem.json · No editar directamente_

---

## CAPA A — PRODUCCIÓN

### CopyLab `unrlvl-copy-lab.vercel.app`
Claude Sonnet 4, 24 queries Supabase paralelas, 13 capas SMPC. `/api/execute` activo en Orchestrator. **Gap:** brand_copy_profiles vacío para NeuroneSCF, ForumPHs, UnrealvilleStudio.

### WebLab `web-lab.vercel.app`
Claude Sonnet 4. Supabase DONE. `/api/execute` activo.

**Sprint pendiente — Objectives Window + Institutional Templates:**
SiteLab NO se crea como lab separado — su función se absorbe en WebLab como modo especializado. Cuando el usuario selecciona ciertos tipos de output se activan: (1) **Objectives Window** — campo libre para declarar intención específica del output, complementa el contexto de marca en Supabase; (2) **Plantilla seccional especializada** — arquitectura narrativa predefinida por tipo.

Tipos target del sprint:
- `web_institucional` — Hero autoridad → Problema → Diferenciadores → Evidencia → CTA suave
- `blog` — distingue SEO/conversión de pieza de autoridad/posicionamiento
- `propuesta_pitch` — Problema → Solución → Credenciales → Propuesta → Siguiente paso
- `email_captacion` — intención específica declarada (ej: agendar reunión) vs email promocional

Excluidos: landings, e-commerce, páginas de producto — objetivo implícito en su tipo, Objectives Window redundante.

### ImageLab `image-lab-unrlvl.vercel.app`
Google Imagen 3 + Gemini 2.5 Flash. PsychoLayer integrado. `/api/execute` activo.

### SocialLab `social-lab-flame.vercel.app`
Claude vía `/api/generate-post`. CopyLabBridge activo. **Gap bloqueante:** OAuth Meta/TikTok pendiente.

### Orchestrator `orchestrator.vercel.app`
4 labs activos: CopyLab, WebLab, ImageLab, SocialLab.

### OnboardingApp `unrlvl-onboarding-app.vercel.app`
Phase 4 completa — 8 tablas Supabase.

---

## CAPA B — AGENTES DE CLIENTE

### Social Media Agent `unrlvl-social-media-agent.vercel.app`
NeuroneSCF. Sin actividad nueva desde 2026-04-06. **Gap:** no accede a session_log de marca en Context System.

### ForumPHs Speaks `forumphs-speaks.vercel.app`
Ley 284, Panamá. Operado por Ivette Flores. v1.2 — splash, CTA, "Speaks" logotipo gradiente, favicon FPHS, input flotante terra, UNRLVL signature BP_BRAND_v1.2 footer 3col. Knowledge base v2 con 3 correcciones Ivette. **Pendiente crítico:** ANTHROPIC_API_KEY en Supabase Secrets.

---

## CAPA C — LABS INTERNOS

**VideoLab / VoiceLab** — bloqueados por API keys externas.
**AgentLab / BlueprintLab / UNRLVL-OPS** — sin cambios.

---

## INFRAESTRUCTURA

**Supabase** — v2.0, 37 tablas, 14MB/500MB.
**BluePrints repo** — BP_BRAND_UNRLVL v1.2 canónico como HTML. Animación canónica: `chev-listen`.

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

1. **ANTHROPIC_API_KEY Supabase Secrets** — ForumPHs Speaks no responde.
2. **Vercel Pro upgrade** — Hobby prohíbe uso comercial.
3. **brand_copy_profiles NeuroneSCF + ForumPHs** — CopyLab sin voz real para estas marcas.

---
_Generado 2026-04-07 · ecosystem.json v2026-04-07c_
