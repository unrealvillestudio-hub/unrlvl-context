# UNRLVL ECOSYSTEM — Radiografía
_Generado desde ecosystem.json · 2026-04-14c · Claude Sonnet 4.6_

---

## ESTADO GENERAL

Ecosistema en producción activa. 13 sistemas en Capa A (producción real). Pricing architecture cerrada: Signal / Pulse / Orbit con E-Com add-on. Profiler Agent + Psycho Layer section diseñados — pendiente implementar en web. GitHub Proxy skill activo y verificado.

---

## CAPA A — PRODUCCIÓN REAL

| Sistema | Estado | Engine |
|---|---|---|
| CopyLab | PASSED v8.0 | Claude Sonnet 4 · 24 queries paralelas |
| WebLab | PASSED — Supabase DONE | Sprint Objectives Window pendiente |
| ImageLab | PASSED ICR v1.0 | Imagen 3 + Gemini 2.5 Flash |
| OnboardingApp | PASSED Phase 4 | 8 tablas Supabase |
| Social Media Agent | ACTIVE — producción | Claude Sonnet 4 + @vercel/kv |
| UNRLVL-OPS | PASSED | Internal tool |
| SocialLab | PASSED — CopyLabBridge DONE | Meta/TikTok OAuth pendiente |
| AgentLab | PASSED — Supabase-first | — |
| BlueprintLab | PASSED — Vercel + Supabase | 4 schemas activos |
| Orchestrator | PASSED — 4 labs activos | CopyLab · WebLab · ImageLab · SocialLab |
| ForumPHs Speaks | PRODUCCIÓN — LIVE | Claude Sonnet 4 · Supabase Edge Functions |
| ForumPHs Document Factory | PRODUCCIÓN v1.4 CERRADO | Pipeline completo |
| unrealvillestudio.com | LIVE — 2026-04-10 | CoreProject · Vercel |

---

## CAPA B — INTERNO / EN DESARROLLO

**VideoLab** — UI PASSED. Generación bloqueada por API keys pendientes (HeyGen + Kling).

**VoiceLab** — UI PASSED. Bloqueado por voice_ids ElevenLabs.

**Profiler Agent** — DISEÑADO. Pendiente implementar. Reemplaza formulario #select en unrealvillestudio.com. Patrón: Claude + Supabase Edge Function. Conversación EN/ES, 5 etapas, scoring de fit, cotización en tiempo real Signal/Pulse/Orbit, brief automático para Sam.

**Psycho Layer (extensión web)** — DISEÑADA. Pendiente implementar sección en unrealvillestudio.com. Demo interactivo: mismo producto × 7 estímulos psicológicos transformándose en tiempo real. Ya en producción en ImageLab con 10 presets.

---

## MARCAS ACTIVAS

| Marca | Mercado | Salud | Notas |
|---|---|---|---|
| Unrealville Studio | Florida + LATAM | 🟢 | Web LIVE. Profiler + Psycho Layer pendientes. Brand context en context system. |
| ForumPHs | Panamá | 🟢 | Speaks + Document Factory en producción |
| NeuroneSCF | South & Central Florida | 🟡 | Meta BM incompleto. Precios + SKUs pendientes |
| Patricia Osorio ×3 | Miami FL | 🟢 | 3 personas: Personal, Comunidad, Vizos Salon |
| Diamond Details | Alicante ES | 🟢 | — |
| Vizos Cosmetics | Miami + España | 🟢 | — |
| D7 Herbal | Alicante ES | 🟢 | — |
| Vivose Mask | España | 🟡 | — |
| Unrealville Stores | Florida USA | 🟢 | Pendiente activación |

---

## INFRASTRUCTURE

**Context System** — `unrlvl-context.vercel.app` · Fuente de verdad del ecosistema.

**GitHub Proxy** — `unrlvl-context.vercel.app/api/gh` · Proxy autenticado para lectura de repos privados desde Claude. PAT en Vercel env vars. Skill documentado en `skills/github-auditor/SKILL.md`.

**Supabase** — Project `amlvyycfepwhiindxgzw` · 37 tablas · Free tier (2.8% utilización) · MCP conectado.

**Vercel Pro** — `unrealvillestudio-projects` · Activo.

---

## PSYCHO LAYER

En producción en ImageLab con 10 presets. Pending integration: CopyLab, SocialLab, VideoLab, VoiceLab. Sección web diseñada — pendiente implementar.

**10 objetivos psicológicos activos:** Autoridad · Urgencia · Aspiración · Confianza · Pertenencia · Curiosidad · Identidad · FOMO · Prueba Social · Escasez

---

## PRICING ARCHITECTURE (cerrada v1.2)

| Tier | M&B/mo | E-Com add-on/mo | Setup M&B | Setup E-Com |
|---|---|---|---|---|
| SIGNAL | $3,500 | +$2,000 | $3,500 | $2,000 |
| PULSE | $6,500 | +$3,500 | $6,500 | $3,500 |
| ORBIT | $12,000 | +$4,500/marca | $12,000 | $4,500/marca |

Revenue sharing: 10% ventas atribuibles desde mes 13 · todos los tiers.
Ad spend: cuenta del cliente, gestión de UNRLVL.

---

## GAPS CRÍTICOS

| Gap | Sistema | Prioridad |
|---|---|---|
| session_log URL no inyectada en SMA | Social Media Agent | ALTA |
| Meta BM info empresa incompleta | NeuroneSCF | ALTA |
| 87 SKUs + precios pendientes | NeuroneSCF | ALTA |
| Profiler Agent no implementado | unrealvillestudio.com | ALTA |
| Psycho Layer section no implementada | unrealvillestudio.com | ALTA |
| Cloudflare + email aliases | unrealvillestudio.com | MEDIA |
| BP_COPY_1.0 vacío para 3 marcas | CopyLab | MEDIA |
| Meta/TikTok OAuth | SocialLab | MEDIA |
| HeyGen + Kling API keys | VideoLab | BAJA |
| ElevenLabs voice_ids | VoiceLab | BAJA |
