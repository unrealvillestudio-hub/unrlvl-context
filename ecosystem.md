# UNRLVL ECOSYSTEM — Radiografía
_Generado desde ecosystem.json · 2026-04-15b · Claude Sonnet 4.6_

---

## ESTADO GENERAL

CRM v1.0 OPERATIVO. Web EN+ES LIVE. Profiler v5 activo. Auditoría completa de labs. Plan Maestro + CRM_INTEGRATIONS documentados en context system.

---

## UNRLVL CRM v1.0 — ACTIVO

Schema dedicado `crm.*` en Supabase. 14 tablas. Aislado del ecosistema de labs.

| Componente | Estado |
|---|---|
| Schema crm.* | ✅ ACTIVO — 14 tablas |
| API Edge Function v2 | ✅ LIVE |
| Dashboard HTML | ✅ Local (Sam) |
| Orgs configuradas | ✅ 7 orgs · 9 pipelines |
| Hygiene rules | ✅ 4 reglas activas |
| Profiler → CRM trigger | ✅ ACTIVO |
| Speaks → CRM | ⏳ Pendiente |
| Shopify → CRM | ⏳ Pendiente (post SKUs) |
| Email sequences | ⏳ Pendiente |
| Ads audiences | ⏳ Pendiente (post OAuth) |

**Documento de integraciones:** `brands/UnrealvilleStudio/CRM_INTEGRATIONS.md`

---

## LABS

| Lab | Estado | Gap principal |
|---|---|---|
| CopyLab | ✅ PROD v8.0 | BP_COPY_1.0 vacío para 3 marcas |
| WebLab | ✅ PROD | Sprint Objectives Window |
| ImageLab | ✅ PROD ICR v1.0 | Sin LoRA Prep · background removal básico |
| AgentLab | ✅ PROD | Twilio pendiente |
| BlueprintLab | ✅ PROD | BP_COPY_1.0 pendiente |
| Orchestrator | ✅ PROD | Actualizar cuando LoRA Prep listo |
| SocialLab | ✅ PROD | Meta/TikTok OAuth pendiente |
| VideoLab | 🔴 BLOQUEADO | HeyGen + Kling keys |
| VoiceLab | 🔴 BLOQUEADO | ElevenLabs voice IDs |

---

## SKILLS PERMANENTES (6 — ninguno duplica labs)

| # | Skill | Estado |
|---|---|---|
| 1 | ui-ux-layer | PENDIENTE — Prioridad 1 |
| 2 | image-processing (+ LoRA Prep) | PENDIENTE — Prioridad 2 |
| 3 | agent-builder | PENDIENTE — Prioridad 3 |
| 4 | copylab-reference | PENDIENTE — Prioridad 4 |
| 5 | weblab-shopify-reference | PENDIENTE — Prioridad 5 |
| 6 | security | PENDIENTE — Prioridad 6 |

---

## GAPS CRÍTICOS

| Gap | Sistema | Prioridad |
|---|---|---|
| Speaks → CRM integración | ForumPHs / CRM | ALTA |
| Meta BM info empresa | NeuroneSCF | ALTA |
| 87 SKUs + precios | NeuroneSCF | ALTA |
| SMA session_log URL | Social Media Agent | ALTA |
| Foto Ivette | ForumPHs Speaks | ALTA |
| BP_COPY_1.0 x3 | CopyLab | MEDIA |
| Fal.ai birefnet | ImageLab | MEDIA |
| Meta/TikTok OAuth | SocialLab | MEDIA |
| Email sequences engine | CRM | MEDIA |
| VideoLab + VoiceLab | Labs | BAJA |
