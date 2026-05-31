# Unrealville Studio — Ecosistema
_Generado desde ecosystem.json v2026-05-31-v1 · No editar manualmente_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure
_"Not for everyone."_
Fundador público: Lucien Sael · Owner: Sam
GitHub: unrealvillestudio-hub · Web: unrealvillestudio.com (LIVE EN+ES)
HQ: 12951 Biscayne Blvd · North Miami, FL 33181

**Lucien Sael** — Seudónimo profesional público de Sam
- web: luciensael.com — BLOG v1.0 BUILT (home+blog+1 artículo molde) · GREENFIELD: sin repo/Vercel/DNS · Paquete listo para Claude Code
- voice_genome: ❌ NO CREADO — causa raíz del contenido IID off-brand. Pendiente: lucien_editorial v0.5 (rama Voz Diseñada)
- platforms: Meta (FB+IG) con token OK · LinkedIn+X pendientes de crear (Sam)

---

## Marcas activas

| Marca | Mercado | Estado |
|---|---|---|
| **NeuroneSCF** | South & Central Florida, USA | 🟡 Activo |
| **DiamondDetails** | Alicante, España | ✅ Activo |
| **VizosCosmetics** | Miami + España | ✅ Activo |
| **D7Herbal** | Alicante, España | ✅ Activo |
| **VivoseMask** | España | ✅ Activo |
| **PatriciaOsorioPersonal** | Miami, FL | ✅ Activo |
| **ForumPHs** | Panamá | ✅ Activo |
| **UnrealvilleStudio** | Global — HQ Miami FL | ✅ Activo |

---

## NeuroneSCF — Estado detallado

**Shopify B2C** `egdk1n-gt.myshopify.com` → `neuronescflorida.com`
- 41 productos activos · Theme 192983662919
- Blog LIVE: 4 artículos ES+EN · Hair Intelligence — pendiente reescritura L0+L3 HUMANIZE EMOTIONAL
- Pixel Meta ✅ (1348252664025025) · GTM+GA4 instalado ✅ · Klaviyo ✅ · Judge.me ✅
- ⚠️ TikTok Pixel DUPLICADO — bloquea ads
- ⚠️ Klaviyo flows pendiente configurar en UI
- ✅ Meta MCP: NSCF en meta_accounts con token OK (verificado 2026-05-31)

**Shopify B2B** `nj5ybc-n1.myshopify.com`
- Theme 149164392526 · Audit score 133 · REVISAR — store_type pendiente verificar

**Fulfillment** — 2toner Express (Iván) `2tonerexpress@gmail.com`
- Portal LIVE ✅ 2026-05-29 · `dispatch.neuronescflorida.com/portal` (dominio custom ⏳ pendiente)
- EF: nscf-fulfillment-portal v2 · nscf-mailer v17

**Tracking** — Meta Pixel ✅ · GTM+GA4 ✅ · Klaviyo 10 templates ES+EN ✅ · TikTok ⚠️ DUPLICADO

---

## UnrealvilleStudio — Brand Context

- voice_genome: `unrlvl_default v1.0` — Defiant precision, EN default, ES mismo tono
- meta_mcp_brand_id: `UNREALville` (original) + `UnrealvilleStudio` (añadida 2026-05-31)
- **DEUDA:** Normalizar convención de nombres — 2 filas en meta_accounts
- Primer post publicado ✅ 2026-05-29

---

## Labs

| Lab | URL | Estado |
|---|---|---|
| **Orchestrator** v4.1 | orchestrator-unrlvl.vercel.app | ✅ LIVE |
| **CopyLab** v9.7 | unrlvl-copy-lab.vercel.app | ✅ LIVE · async ✅ |
| **ImageLab** v6 | image-lab-unrlvl.vercel.app | ✅ OPERACIONAL 2026-05-29 |
| **SocialLab** | social-lab-flame.vercel.app | ✅ LIVE — dual-mode pendiente confirmar |
| **WebLab** | web-lab-unrlvl.vercel.app | ✅ LIVE |
| **AgentLab** | agent-lab-unrlvl.vercel.app | ✅ LIVE |
| **BlueprintLab** | unrlvl-blueprint-lab.vercel.app | ✅ LIVE |
| **VideoLab** | unrlvl-video-lab.vercel.app | ✅ LIVE — LAUNCH PENDIENTE |
| **VoiceLab** | unrlvl-voice-lab.vercel.app | ✅ LIVE |
| **OnboardingApp** | unrlvl-onboarding-app.vercel.app | ✅ LIVE — voice_genome_gap Fase 5 pendiente |
| **SignalLab** | — | ⏳ No deployado |

**SocialLab:** Vía de publicación ÚNICA al público. Debe operar dual-mode (sync UI + async Orchestrator) igual que CopyLab/ImageLab. Re-test publicación pendiente tras fix brand_id.

**OnboardingApp:** v1.0 puebla 5 tablas pero NO captura brand_voice_genome. Spec Fase 5 lista: VOICE_GENOME_PHASE_SPEC.md.

---

## Pipeline Orchestrator

**Status:** ✅ END-TO-END OPERACIONAL — 2026-05-29
**Flujo:** Claude.ai → INSERT lab_jobs → pg_net → lab-worker EF → [brand_context + CopyLab + ImageLab] → Supabase CDN → pending_approval → Sam aprueba → Meta MCP → IG + FB
**Avg time:** 30-45s total

**Fixes:**
- ✅ RESUELTO — lab_jobs.status constraint incluye 'published'
- ✅ RESUELTO — meta_accounts: UnrealvilleStudio insertado (2026-05-31)
- ✅ RESUELTO — NeuroneSCF ya estaba en meta_accounts
- ⏳ SocialLab dual-mode — re-test publicación pendiente (brand_id mismatch ya resuelto)
- ⏳ Normalizar convención UnrealvilleStudio vs UNREALville

---

## IID Subsystem

**Status:** RESEARCH VIVO · EJECUCIÓN CONGELADA desde 2026-04-26
**Schema:** `intel` (NO public)

| Tabla | Conteo |
|---|---|
| iid_agents | 14 — dual voice (default_voice + lucien_angle_affinity) |
| iid_content_queue | ~150 tras limpieza 2026-05-31 (eran 204) |
| iid_findings | 218 |
| iid_research_raw | 54 |
| iid_cron_runs | 137 — research corre diario |
| iid_briefs | 1 |
| iid_scheduler_config | 5 (config conexión, no schedule) |

**Edge Functions:** content-dispatcher (.limit(1) debug) · content-run-stage v22 (timeout 65s) · iid-core · iid-ecommerce · aife-filter

**Diagnóstico 2026-05-31:** Research funciona. Ejecución congelada: failed del 26-abr son cadáveres de arquitectura vieja (timeout 30s + CopyLab externo). v22 ya reescrita pero nunca re-corrida en limpio. .limit(1) de debugging sigue puesto.

**Hallazgo raíz:** LucienSael NO tiene brand_voice_genome → IID cayó a fallback genérico (voz growth-marketer).

**Cuarentena:** 37 lucien/mathematical + lucien/psychological marcados rejected/pending — NO purgar hasta validar voz nueva.
**Seeds rescatables:** lucien/psychological #7, #8, #14 — regenerar con voz correcta tras crear genoma.

---

## Supabase — unrlvl-db `amlvyycfepwhiindxgzw`

ACTIVE_HEALTHY · us-east-1
- **public:** 80 tablas · ~95 Edge Functions
- **intel:** iid_agents, iid_content_queue, iid_findings, iid_research_raw, iid_cron_runs, iid_briefs, iid_scheduler_config
- **content:** orchestrator_jobs · (copylab_jobs → lab_jobs migration pendiente)
- **shopify:** stores, audit_runs, fix_log + otras

**meta_accounts:**
- `UNREALville` ✅ completo (page + ig + ad_account + token)
- `UnrealvilleStudio` ✅ añadida 2026-05-31 (mapeo a UNREALville)
- `LucienSael` ✅ page + token
- `NeuroneSCF` ✅ token OK (verificado 2026-05-31)

---

## Agentes

| Agente | Canal | Estado |
|---|---|---|
| **Social Media Agent** | interno | ✅ OPERATIONAL |
| **DDMV Assistant** | WhatsApp Twilio | ⚠️ FIX NEEDED |
| **ForumPH Speaks** | web | ✅ OPERATIONAL |
| **ForumPH Document Factory** | web | ✅ OPERATIONAL |

**ForumPH Document Factory — Next Sprint:** fphs-formalize quality sprint — replicar calidad acta manual (98% Ivette). Referencia: ACTA_No1-2026_PH_LUXOR_300.docx.

---

## AYRA 🔴 DEADLINE 5 JUN

Milestone v1.0: 31 Agosto 2026

| Sprint | Fecha | Estado |
|---|---|---|
| **Sprint 0** 🔴 | ANTES 5 Jun | PENDIENTE |
| Sprint 1 | Jun 5-15 | Planned |
| Sprint 2 | Jun 16-30 | Planned |
| Sprint 3 | Jul 1-14 | Planned |
| Sprint 4 | Jul 15-31 | Planned |
| Sprint 5 | Ago 1-31 | AYRA v1.0 |

---

## Professor

OPERATIONAL v1.0
Proxy: `https://unrlvl-context.vercel.app/api/professor` ✅ LIVE
Learnings: 60 total · 42 aprobados · 6 pending approval

---

## Infraestructura

| ID | Nombre | URL | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | ✅ LIVE |
| INFRA-META-MCP | Meta MCP | unrlvl-meta-mcp.vercel.app | ✅ ACTIVE — UNREALville + NSCF ✅ · fb_get_page_insights deprecado ⚠️ |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ✅ ACTIVE · write_orders ✅ |
| INFRA-NSCF-DISPATCH | NSCF Dispatch Portal | dispatch.neuronescflorida.com/portal | ⏳ PENDIENTE — Vercel + DNS |
| INFRA-SB-MCP | Supabase MCP | unrlvl-supabase-mcp.vercel.app | ✅ ACTIVE v1.2.1 |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | ✅ LIVE EN+ES |

**Staging workflow:** ✅ ESTABLECIDO 2026-05-30 — 15 repos, 13 con branch protection. PR template + WORKFLOW.md + CLAUDE.md deployados.

---

## Agenda — próxima sesión

Ver [AGENDA.md](AGENDA.md) para prioridades completas.

Top 3 inmediatos:
1. 🟢 Deploy luciensael.com (repo+Vercel+DNS) + UNRLVL Field Notes (push CoreProject)
2. 🔴 IID FIX — crear brand_voice_genome lucien_editorial v0.5 → regenerar seeds → re-test pipeline
3. 🔴 Voice Genome Fase 5 en OnboardingApp (spec lista)
