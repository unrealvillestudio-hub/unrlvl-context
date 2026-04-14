# UNRLVL ECOSYSTEM — Radiografía
_Generado desde ecosystem.json · 2026-04-14d · Claude Sonnet 4.6_

---

## ESTADO GENERAL

Sesión maratón. Ecosistema en producción activa con 14 sistemas en Capa A. Web `unrealvillestudio.com` completada con Psycho Layer + Profiler Agent + amber — pendiente push. Profiler Agent v3 LIVE con notificación email via Resend. UNRLVL CRM v1.0 schema activo en Supabase con trigger de auto-sync. Cloudflare + email infrastructure activos.

---

## CAPA A — PRODUCCIÓN REAL

| Sistema | Estado | Notas |
|---|---|---|
| CopyLab | PASSED v8.0 | 24 queries paralelas |
| WebLab | PASSED — Supabase DONE | Sprint Objectives Window pendiente |
| ImageLab | PASSED ICR v1.0 | Imagen 3 + Gemini 2.5 Flash · PsychoLayer DONE |
| OnboardingApp | PASSED Phase 4 | 8 tablas Supabase |
| Social Media Agent | ACTIVE | Claude Sonnet 4 + @vercel/kv · GAP: no lee session_log |
| UNRLVL-OPS | PASSED | Internal tool |
| SocialLab | PASSED | Meta/TikTok OAuth pendiente |
| AgentLab | PASSED | Supabase-first |
| BlueprintLab | PASSED | 4 schemas activos |
| Orchestrator | PASSED | 4 labs activos |
| ForumPHs Speaks | PRODUCCIÓN LIVE | speaks.forumphs.com · Supabase Edge Functions |
| ForumPHs Document Factory | PRODUCCIÓN v1.4 CERRADO | Pipeline completo |
| unrealvillestudio.com | LIVE — 2026-04-10 | Cloudflare activo · index.html actualizado pendiente push |
| Profiler Agent | ACTIVO — Edge Function v3 | Resend email · auto-sync CRM · EN/ES |

---

## CAPA B — EN DESARROLLO

**Psycho Layer web** — Demo interactivo 7 estímulos implementado en index.html. Pendiente push a CoreProject.

**UNRLVL CRM** — Schema v1.0 activo en Supabase. Tablas: `crm_contacts`, `crm_activities`, `crm_stage_history`. Trigger `sync_profiler_to_crm` auto-popula contactos desde Profiler Agent. Dashboard de gestión pendiente construir.

**VideoLab** — UI PASSED. Bloqueado por API keys HeyGen + Kling.

**VoiceLab** — UI PASSED. Bloqueado por voice_ids ElevenLabs.

---

## INFRAESTRUCTURA

**Email:** Cloudflare Email Routing → `leads@unrealvillestudio.com`. Resend → `profiler@unrealvillestudio.com` (transaccional). Ambos activos.

**GitHub Proxy** — `unrlvl-context.vercel.app/api/gh` · GH_PAT en Vercel env. 21 repos accesibles.

**Supabase** — `amlvyycfepwhiindxgzw` · 40 tablas · Free tier · MCP conectado.

**Cloudflare** — Activo en unrealvillestudio.com. Redirect rules pendientes.

---

## FLUJO PROFILER AGENT → CRM

```
Visitante web
  ↓ chat en #select
Profiler Agent (5 etapas EN/ES)
  ↓ captura email
Claude genera brief (fit, tier, pain, escala, visión)
  ↓
Email a leads@unrealvillestudio.com via Resend
  + trigger Supabase → crm_contacts (auto-sync)
  ↓
Sam revisa lead en CRM dashboard (pendiente)
  ↓
Calificado → flujo email al prospecto (pendiente)
  ↓
Onboarding → cliente activo
```

---

## MARCAS ACTIVAS

| Marca | Mercado | Salud | Estado |
|---|---|---|---|
| Unrealville Studio | Florida + LATAM | 🟢 | Web LIVE. Psycho Layer + Profiler pendientes push. |
| ForumPHs | Panamá | 🟢 | Speaks + DocFactory en producción |
| NeuroneSCF | South & Central Florida | 🟡 | Meta BM incompleto. SKUs pendientes. |
| Patricia Osorio ×3 | Miami FL | 🟢 | Personal, Comunidad, Vizos Salon |
| Diamond Details | Alicante ES | 🟢 | — |
| Vizos Cosmetics | Miami + España | 🟢 | — |
| D7 Herbal | Alicante ES | 🟢 | — |
| Vivose Mask | España | 🟡 | — |

---

## PRICING ARCHITECTURE (cerrada v1.2)

| Tier | M&B | E-Com add-on | Setup M&B | Setup E-Com |
|---|---|---|---|---|
| SIGNAL | $3,500/mo | +$2,000 | $3,500 | $2,000 |
| PULSE | $6,500/mo | +$3,500 | $6,500 | $3,500 |
| ORBIT | $12,000/mo | +$4,500/marca | $12,000 | $4,500/marca |

Revenue sharing: 10% sobre ventas atribuibles desde mes 13.

---

## GAPS CRÍTICOS

| Gap | Sistema | Prioridad |
|---|---|---|
| Push index.html a CoreProject | unrealvillestudio.com | ALTA — PAT requerido |
| Versión /es del sitio | unrealvillestudio.com | ALTA |
| CRM dashboard de pipeline | UNRLVL CRM | ALTA |
| Cloudflare redirect rules | unrealvillestudio.com | ALTA |
| session_log URL en SMA | Social Media Agent | ALTA |
| Meta BM info empresa | NeuroneSCF | ALTA |
| 87 SKUs + precios Shopify | NeuroneSCF | ALTA |
| Flujo email prospecto calificado | CRM | MEDIA |
| BP_COPY_1.0 para 3 marcas | CopyLab | MEDIA |
| Amber en BP_BRAND_UNRLVL | BluePrints | MEDIA |
| Meta/TikTok OAuth | SocialLab | MEDIA |
| HeyGen + Kling API keys | VideoLab | BAJA |
