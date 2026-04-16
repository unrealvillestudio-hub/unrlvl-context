# Ecosystem — Unreal>ille Studio
_Narrativa de contexto · Regenerado: 2026-04-16 · Claude Opus 4.7_
_Fuente canónica: ecosystem.json v2026-04-16c_

---

## VISIÓN GENERAL

**Unreal>ille Studio** es la agencia inhouse de Sam (owner), operando desde North Miami, FL con extensión a LATAM y España. No es una agencia pública — es el cerebro operativo, creativo y tecnológico detrás de un ecosistema de negocios. Construye marca, marketing, publicidad, estrategia y tecnología para sus propios proyectos y los de su familia.

- **HQ:** 12951 Biscayne Blvd · North Miami, FL 33181 (co-located con Vizos Cosmetics)
- **Web:** unrealvillestudio.com — LIVE EN+ES desde 2026-04-10
- **GitHub:** unrealvillestudio-hub
- **Vercel:** unrealvillestudio-projects (Pro)
- **Supabase:** amlvyycfepwhiindxgzw

---

## MARCAS EN EL ECOSISTEMA

### Estudio principal
- **Unrealville Studio** (`UnrealvilleStudio`) — studio · Florida USA + LATAM · Web LIVE · Tiers SIGNAL / PULSE / ORBIT

### Marcas comerciales activas
- **Diamond Details** — Alicante, España
- **Vizos Cosmetics** — Miami + España
- **D7 Herbal** — Alicante, España
- **Vivose Mask** — España · health yellow
- **Neurone South & Central Florida** — South & Central Florida · health yellow
  - Dominio: neuronescflorida.com
  - Gaps activos: BP_COPY_1.0 pendiente · 87 SKUs + precios · Meta BM verification + Facebook Page pendientes · 6 aliases email pendientes · assets de marca Neurone pendientes
- **ForumPHs** — Panamá · Ivette Flores · speaks.forumphs.com LIVE · FPHs-OPS schema activo (22 tablas) · Document Factory PROD v1.4
- **Unrealville Stores** — Florida USA · e-commerce

### Marcas personales Patricia Osorio
- **Personal**, **Comunidad**, **Vizos Salon** — todas con copy_profile DONE
- **Conectando** — BP_BRAND v1.0 DEFINITIVO aprobado por PO · Pinyon Script + Montserrat ExtraLight · paleta #0A0A0A / #1C1A16 / #C49A3C / #F5EAD0

---

## LABS — Estado del pipeline creativo/tecnológico

| Lab | Status | Gaps / Pending |
|---|---|---|
| CopyLab (v8.0) | PASSED | BP_COPY_1.0 vacío para 3 marcas |
| WebLab | PASSED — Shopify module completo | Objectives Window |
| ImageLab (ICR v1.0) | PASSED | Sin LoRA Prep · background removal básico |
| AgentLab | PASSED | Twilio · WA agent NeuroneSCF · WA agent FPHs-OPS |
| BlueprintLab | PASSED | — |
| Orchestrator | PASSED | — |
| SocialLab | PASSED | Meta/TikTok OAuth pendiente |
| VideoLab | BLOQUEADO | HeyGen + Kling keys |
| VoiceLab | BLOQUEADO | ElevenLabs voice IDs |
| UNRLVL-OPS | PASSED | — |
| Onboarding App | PASSED Phase 4 | — |

---

## AGENTES DESPLEGADOS

### Profiler Agent v6 — LIVE (deployed 2026-04-16)
- **Endpoint:** `https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/unrlvl-profiler`
- **Marca:** UnrealvilleStudio
- **Arquitectura:** EXPLORER → ANALYST → CLOSER modes · activados por señal, no por turno
- **Guardrails:**
  - Opening-regression fix (triple defensa: hard rule en prompt + injected guard per turn + regex catch en código con retry)
  - Asymmetric-disclosure detection (basada en reciprocidad, no en conteo de tokens/turnos)
- **Doctrina:** analysis is bait — muestra el trabajo, devuelve la pregunta, el prospect revela cartas en su respuesta al análisis
- **Brief fields:** `fit_score`, `mode_reached`, `closer_activated`, `reciprocity`, `financial_read`, `readiness_signals`, `tone_read`, `recommendation`
- **CRM:** trigger activo → `crm.contacts`
- **Email:** profiler@unrealvillestudio.com → leads@unrealvillestudio.com (Resend)

### Social Media Agent
- **URL:** unrlvl-social-media-agent.vercel.app
- **Marca:** NeuroneSCF
- **Session log injection:** ACTIVO en chat.js
- **Último update session_log:** 2026-04-16 — Laura progreso Meta BM pasos 1-2 completados, dominio verification bloqueada, Facebook Page pendiente por assets

### ForumPHs Speaks
- **URL:** speaks.forumphs.com (LIVE)
- **Pendientes:** foto Ivette · integración Speaks→CRM

### Document Factory
- **URL:** forumphs-document-factory.vercel.app
- **Status:** PROD v1.4 · Plan de evolución documentado

### FPHs-OPS WhatsApp Agent
- Diseñado · pendiente construir

---

## INFRAESTRUCTURA

| Infra | Detalle |
|---|---|
| Context System | https://unrlvl-context.vercel.app · `/api/gh` (GitHub proxy v2) · `/api/cf` (Cloudflare proxy 6 dominios) |
| Supabase | project `amlvyycfepwhiindxgzw` · `public.*` 40 tablas + `crm.*` 14 + `fph.*` 22 |
| UNRLVL CRM v1.0 | OPERATIVO · 7 orgs · 9 pipelines · integración activa Profiler→CRM · pendientes Speaks→CRM, Shopify→CRM, email sequences |
| FPHs-OPS | Schema activo · app pendiente construir · primer módulo COBROS · pendiente datos Ivette (8 edificios + propietarios) |
| Web unrealvillestudio.com | LIVE EN+ES · 37 files |
| Email | leads@unrealvillestudio.com · profiler@unrealvillestudio.com (Resend) |

---

## SKILLS — Status

| Skill | Status |
|---|---|
| GitHub Auditor | ACTIVO |
| UI/UX Layer | PENDIENTE P1 — crítico para FPHs-OPS app |
| Image Processing + LoRA Prep | PENDIENTE P2 |
| Agent Builder | PENDIENTE P3 — crítico para WA agent FPHs-OPS |
| CopyLab Reference | PENDIENTE P4 |
| WebLab Shopify Reference | PENDIENTE P5 |
| Security | PENDIENTE P6 |

---

## AGENDA PRÓXIMA SESIÓN

1. Profiler v6: validar con prueba reproducible del caso geles/gominolas en widget web
2. Document Factory: schema JSON EEFF v1.0 + normalizer en `tools/`
3. ForumPHs: recibir datos Ivette (8 edificios, propietarios, cuotas, mora) → poblar `fph.*`
4. FPHs-OPS: construir módulo COBROS
5. ForumPHs Speaks → CRM integración
6. NeuroneSCF: Meta BM domain verification + 6 aliases email + assets marca + 87 SKUs + precios
7. NeuroneSCF: Facebook Page (decisión assets placeholder vs oficiales)
8. Skill ui-ux-layer
9. Fal.ai birefnet → ImageLab LoRA Prep
10. BP_COPY_1.0 x3 marcas
11. Foto Ivette Speaks
12. Decisión estratégica FPHs-OPS: quién paga + replicabilidad LATAM

---

## ÚLTIMA AUDITORÍA

**2026-04-16 · Claude Opus 4.7**

Profiler Agent v6 deployed — fix opening regression + business intelligence layer + sales closer mode + asymmetric disclosure guardrail. SMA session_log regenerado con progreso Laura Meta BM Neurone SCF. BP Patricia Osorio Conectando DEFINITIVO. FPHs-OPS schema activo. CRM v1.0 operativo.
