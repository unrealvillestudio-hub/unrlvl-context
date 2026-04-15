# UNRLVL ECOSYSTEM — Radiografía
_Generado desde ecosystem.json · 2026-04-15a · Claude Sonnet 4.6_

---

## ESTADO GENERAL

Sesión maratón día 2. Auditoría completa de todos los labs ejecutada. Web LIVE en EN+ES. Profiler Agent v5 con carácter de negocio real. Cloudflare configurado via proxy. CRM schema activo, dashboard pendiente. Plan Maestro de labs y skills creado como referencia permanente.

---

## LABS — ESTADO REAL POST-AUDITORÍA

| Lab | Estado | Gap principal |
|---|---|---|
| CopyLab | ✅ PROD v8.0 · 13 capas | BP_COPY_1.0 vacío para 3 marcas |
| WebLab | ✅ PROD · Shopify module completo | Sprint Objectives Window pendiente |
| ImageLab | ✅ PROD ICR v1.0 | Background removal básico · sin LoRA Prep |
| AgentLab | ✅ PROD | Twilio pendiente · voice sin integrar |
| BlueprintLab | ✅ PROD | BP_COPY_1.0 datos pendientes |
| Orchestrator | ✅ PROD | Actualizar cuando LoRA Prep esté listo |
| SocialLab | ✅ PROD | Meta/TikTok OAuth pendiente |
| VideoLab | 🔴 BLOQUEADO | HeyGen + Kling API keys |
| VoiceLab | 🔴 BLOQUEADO | voice_ids ElevenLabs |
| UNRLVL-OPS | ✅ PROD | — |
| OnboardingApp | ✅ PROD Phase 4 | — |

---

## INFRASTRUCTURE ACTIVA

**Context System** `unrlvl-context.vercel.app`
- `/api/gh` v2 — GitHub proxy read+write (21 repos)
- `/api/cf` — Cloudflare proxy (6 dominios, Always HTTPS + redirects)

**Supabase** `amlvyycfepwhiindxgzw` · 40 tablas · Free tier
- CRM: crm_contacts + crm_activities + crm_stage_history + trigger auto-sync
- Profiler sessions: sync automático a CRM cuando se captura email

**Web** `unrealvillestudio.com`
- EN (/) + ES (/es) LIVE · Psycho Layer + Profiler Agent v5 + amber
- Cloudflare: Always HTTPS ON · www→apex 301 activo

---

## FLUJO LEAD — COMPLETO

```
Visitante web
  ↓ Profiler Agent v5 (5 etapas, conocimiento marketing/negocio)
  ↓ Captura email
  ↓ Claude genera brief (fit, tier, pain, scale, tone_read, flags)
  ↓ Email a leads@unrealvillestudio.com via Resend
  ↓ Trigger Supabase → crm_contacts (auto-sync)
  ↓ Sam revisa en CRM dashboard (PENDIENTE CONSTRUIR)
  ↓ Calificado → flujo email (PENDIENTE)
  ↓ Onboarding → cliente activo
```

---

## LORA PREP PIPELINE (diseñado)

```
Cliente sube fotos → ImageLab LoRA Prep module
  ↓ Face detection (Fal.ai)
  ↓ Smart crop 1024×1024, cara centrada
  ↓ Background removal (Fal.ai birefnet — AI real)
  ↓ Quality filter
  ↓ Claude Vision → captions por imagen
  ↓ Export ZIP
→ Fal.ai FLUX Dreambooth training
→ LoRA en BluePrints/brands/[Marca]/assets/lora/
```

Punto de entrada: BlueprintLab wizard BP_PERSON → llama a ImageLab
Piloto: Patricia Osorio (fotos de Vizos Salon evaluadas)

---

## SKILLS PERMANENTES — ESTRATEGIA

6 skills identificados, ninguno duplica los labs (todos los complementan):

| # | Skill | Qué hace | Prioridad |
|---|---|---|---|
| 1 | `ui-ux-layer` | BP_BRAND rules para outputs visuales Claude | ALTA |
| 2 | `image-processing` | ImageLab gaps + LoRA Prep pipeline | ALTA |
| 3 | `agent-builder` | Patrones deployment por canal | MEDIA |
| 4 | `copylab-reference` | Mapa templates + BP_COPY_1.0 | MEDIA |
| 5 | `weblab-shopify-reference` | Módulo Shopify WebLab | MEDIA |
| 6 | `security` | RLS, secrets, WAF | MEDIA |

---

## MARCAS ACTIVAS

| Marca | Mercado | Salud | Estado |
|---|---|---|---|
| Unrealville Studio | Florida + LATAM | 🟢 | Web LIVE EN+ES · CRM pendiente dashboard |
| ForumPHs | Panamá | 🟢 | Speaks + DocFactory PROD · foto Ivette pendiente |
| NeuroneSCF | S&C Florida | 🟡 | Meta BM incompleto · SKUs pendientes |
| Patricia Osorio ×3 | Miami FL | 🟢 | 3 personas activas |

---

## GAPS CRÍTICOS PRIORIZADOS

| Gap | Sistema | Prioridad |
|---|---|---|
| CRM dashboard | UNRLVL CRM | INMEDIATA |
| Push index.html | CoreProject | INMEDIATA |
| Meta BM info empresa | NeuroneSCF | ALTA |
| 87 SKUs + precios | NeuroneSCF | ALTA |
| SMA session_log URL | Social Media Agent | ALTA |
| Foto Ivette | ForumPHs Speaks | ALTA |
| BP_COPY_1.0 x3 marcas | CopyLab | MEDIA |
| Fal.ai birefnet | ImageLab | MEDIA |
| Meta/TikTok OAuth | SocialLab | MEDIA |
| HeyGen + Kling keys | VideoLab | BAJA |
