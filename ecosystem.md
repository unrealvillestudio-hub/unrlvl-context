# Unrealville Studio — Ecosistema
_Generado desde ecosystem.json v2026-06-02-v1 · No editar manualmente_

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure
_"Not for everyone."_
Fundador público: Lucien Sael · Owner: Sam
GitHub: unrealvillestudio-hub · Web: unrealvillestudio.com (LIVE EN+ES)
HQ: 12951 Biscayne Blvd · North Miami, FL 33181

**Lucien Sael** — Seudónimo profesional público de Sam
- web: luciensael.com — BLOG v1.0 BUILT (home+blog+1 artículo molde) · GREENFIELD: sin repo/Vercel/DNS · Paquete listo para Claude Code
- voice_genome: ✅ **2 VOCES ACTIVAS** en brand_voice_genome v0.5 — `lucien_editorial` (919e3707 · blog/ensayo/long-form) + `lucien_social` (5b571b08 · Meta FB/IG + TikTok texto + X · short reactive). Mismo temperamento (filo 9/10, übermensch motor interno nunca citado), distinta respiración (editorial respira largo / social muerde corto ≤280). DEUDA menor: corregir nota falsa de brands table en lucien_editorial.notes.
- platforms: Meta (FB+IG) token a nivel ecosystem pero canal LucienSael NO probado en pipeline (manual-until-verified) · TikTok solo texto · X apertura escalonada anti-baneo (manual, sin API) · LinkedIn NO es plataforma de Lucien (solo cita vía voceros Sam/UNRLVL)
- ⚠️ RIESGO ~80%: primer publish LucienSael por Orchestrator tocará blocker brand_id mapping (tipo b93627b6) — verificar/insertar fila LucienSael en meta_accounts antes
- Pendiente futuro: `lucien_video` (guion hablado TikTok/Reels) cuando VideoLab

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
- Pixel Meta ✅ (1348252664025025) · GTM+GA4 instalado ✅ · Klaviyo ✅
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

## Voces de marca (brand_voice_genome)

Una marca puede tener varias **voces hermanas** (distinto `voice_id`) que comparten temperamento y difieren en respiración. Unique `(brand_id, voice_id, version)`.

| brand_id | voice_id | versión | scope | estado |
|---|---|---|---|---|
| LucienSael | `lucien_editorial` | v0.5 | blog / ensayo / long-form | ✅ active (919e3707) |
| LucienSael | `lucien_social` | v0.5 | Meta FB/IG + TikTok (texto) + X · short reactive | ✅ active (5b571b08 · 2026-06-02) |
| UnrealvilleStudio | `unrlvl_default` | v1.0 | infra / B2B | ✅ active |

**Lucien — regla cita-por-destino (vocería en LinkedIn):** Lucien no publica en LinkedIn (sin cuenta, por diseño). Llega solo citado por voceros (Sam / UNRLVL). El genoma del fragmento citado lo elige el **destino del redirect**: a X/Meta/TikTok → `lucien_social`; a luciensael.com o post nativo sin redirect → `lucien_editorial`. La voz que presenta es su propio genoma (sesiones futuras).

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

**OnboardingApp:** v1.0 puebla 5 tablas pero NO captura brand_voice_genome. Spec Fase 5 lista: VOICE_GENOME_PHASE_SPEC.md. Aprendizaje 2026-06-02: permitir derivar voz social desde editorial (solo preguntar diferencia de respiración) + capturar modo cita para voceros.

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
- ⏳ LucienSael NO probado en pipeline en ninguna plataforma — antes del primer publish verificar/insertar fila LucienSael en meta_accounts (riesgo ~80% mismo blocker brand_id que b93627b6)

---

## IID Subsystem

**Status:** RESEARCH VIVO · EJECUCIÓN CONGELADA desde 2026-04-26 · **DESBLOQUEADO PARA FIX** (ambas voces Lucien ya existen)
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

**Desbloqueo de voz 2026-06-02:** Causa raíz del off-brand (sin brand_voice_genome) RESUELTA — `lucien_editorial` (06-01) + `lucien_social` (06-02) activos. Siguiente: regenerar seeds #7/#8/#14 con la voz correcta por formato (editorial para long-form, social para corto), remover .limit(1), re-correr v22 en limpio.

**Cuarentena:** 37 lucien/mathematical + lucien/psychological marcados rejected/pending — NO purgar hasta validar voz nueva.
**Seeds rescatables:** lucien/psychological #7, #8, #14 — regenerar con voz correcta (genoma ya creado).

---

## Supabase — unrlvl-db `amlvyycfepwhiindxgzw`

ACTIVE_HEALTHY · us-east-1
- **public:** 80 tablas · ~95 Edge Functions
- **intel:** iid_agents, iid_content_queue, iid_findings, iid_research_raw, iid_cron_runs, iid_briefs, iid_scheduler_config
- **content:** orchestrator_jobs · (copylab_jobs → lab_jobs migration pendiente)
- **shopify:** stores, audit_runs, fix_log + otras

**brand_voice_genome (LucienSael):**
- `lucien_editorial` v0.5 (919e3707) — blog/ensayo/long-form — active
- `lucien_social` v0.5 (5b571b08) — Meta FB/IG + TikTok texto + X, short reactive — active (2026-06-02)

**meta_accounts:**
- `UNREALville` ✅ completo (page + ig + ad_account + token)
- `UnrealvilleStudio` ✅ añadida 2026-05-31 (mapeo a UNREALville)
- `LucienSael` ⏳ verificar antes del primer publish por pipeline (riesgo blocker brand_id)
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
Learnings: 65 total · 42 aprobados · 11 pending approval (escala relevance_score 1–5)

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
2. 🔴 IID FIX — ambas voces Lucien ya existen; regenerar seeds #7/#8/#14 por formato → remover .limit(1) → re-correr v22 en limpio
3. 🔴 Voice Genome Fase 5 en OnboardingApp (spec lista) — incluir derivación social-desde-editorial + modo cita voceros
