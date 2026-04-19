# Ecosystem — Unreal>ille Studio
_Regenerado: 2026-04-19 · Claude Sonnet 4.6 · Fuente: ecosystem.json v2026-04-19a_

---

## VISIÓN GENERAL

**Unreal>ille Studio** es la agencia inhouse de Sam (owner), operando desde North Miami, FL con extensión a LATAM y España. Firma de **Brand Intelligence Infrastructure**. No es una agencia pública — construye marca, marketing, publicidad, estrategia y tecnología para sus propios proyectos y los de su familia.

- **Founder público:** Lucian Sael
- **HQ:** 12951 Biscayne Blvd · North Miami, FL 33181
- **Web:** unrealvillestudio.com — LIVE EN+ES
- **Posicionamiento:** Brand Intelligence Infrastructure
- **Tagline:** Not for everyone.

---

## IDENTIDAD PÚBLICA — LUCIAN SAEL

Sam adoptó **Lucian Sael** como seudónimo profesional permanente para UNRLVL (2026-04-19). Raíz: nombre rumano/europeo del este, neutralidad geográfica total para USA/LATAM/España, territorio virgen sin identidad pública preexistente.

**Regla operativa:** Sam = identidad interna. Lucian Sael = identidad pública (prospects, clientes, web, emails, LinkedIn, Profiler Agent).

---

## PRICING — TIERS

Referencia canónica: `TIERS.md` (raíz del repo context).

| Tier | Precio | Marcas | Compromiso | Garantía |
|---|---|---|---|---|
| SIGNAL | $3,500/mo | 1 | 6 meses | ROAS positivo mes 3 |
| PULSE | $6,500/mo | 1–2 | 6 meses | 2.5× ROAS mes 4 |
| ORBIT | $12,000/mo | hasta 3 | 12 meses | KPIs negociados |

E-commerce add-on: +$2K / +$3.5K / +$4.5K por tier. Revenue share 10% desde mes 13.

---

## MARCAS

### Activas con health green
Diamond Details · Vizos Cosmetics · D7 Herbal · PatriciaOsorio Personal/Comunidad/VizosSalon · PatriciaOsorio Conectando (BP v1.0 DEFINITIVO) · ForumPHs (PROD) · Unrealville Studio · Unrealville Stores

### Health yellow
- **Vivose Mask** — España
- **Neurone SCF** — South & Central Florida · Gaps activos: BP_COPY_1.0 · 87 SKUs + precios · Meta BM verification · Facebook Page · 6 aliases email · assets marca

---

## AGENTES DESPLEGADOS

### Profiler Agent v7.2 — LIVE (Supabase v9, 2026-04-19)
- **Endpoint:** `https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/unrlvl-profiler`
- **Arquitectura:** 5 temas declarados al prospect (T1 negocio · T2 escala · T3 inversión · T4 dolor · T5 visión) → tier match → close o discard
- **Founder:** Lucian Sael — inyectado en CLOSER, brief, email
- **Tiers en prompt:** SIGNAL $3,500 · PULSE $6,500 · ORBIT $12,000 con contenido completo EN/ES
- **Captura:** universal — FIT y DESCARTADO siempre captura nombre + email
- **Brief:** `fit_score`, `recommended_tier`, `current_stage`, `budget_range`, `vision_12mo`, `topics_covered`, `mode_reached`, `closer_activated`, `reciprocity`, `financial_read`

### Social Media Agent — NeuroneSCF
- URL: unrlvl-social-media-agent.vercel.app
- Session log injection: ACTIVO en chat.js
- Último update session_log: 2026-04-16

### ForumPHs Speaks — LIVE
- speaks.forumphs.com · Pendientes: foto Ivette · Speaks→CRM

### Document Factory — ForumPHs
- PROD v1.4 · Plan evolución documentado

### FPHs-OPS WhatsApp Agent
- Diseñado · pendiente construir

---

## WEB UNRLVL — PENDIENTE

Sección **Why UNRLVL** generada (2026-04-19) — 4 quote blocks firmados Lucian Sael narrando la historia del nombre + Brand Intelligence Infrastructure + el > como dirección. **Pendiente insertar en CoreProject** `index.html` y `es/index.html` antes de `<section id="select">`.

---

## LABS

| Lab | Status |
|---|---|
| CopyLab v8.0 | PASSED · BP_COPY_1.0 vacío para 3 marcas |
| WebLab | PASSED · Objectives Window pendiente |
| ImageLab ICR v1.0 | PASSED · sin LoRA Prep |
| AgentLab | PASSED · Twilio pendiente |
| BlueprintLab | PASSED |
| Orchestrator | PASSED |
| SocialLab | PASSED · Meta/TikTok OAuth pendiente |
| VideoLab | BLOQUEADO — HeyGen + Kling keys |
| VoiceLab | BLOQUEADO — ElevenLabs voice IDs |
| UNRLVL-OPS | PASSED |
| Onboarding App | PASSED Phase 4 |

---

## INFRAESTRUCTURA

| Infra | Estado |
|---|---|
| Supabase `amlvyycfepwhiindxgzw` | `public.*` 40 + `crm.*` 14 + `fph.*` 22 tablas |
| CRM v1.0 | OPERATIVO · 7 orgs · 9 pipelines · Profiler→CRM activo |
| FPHs-OPS | Schema activo · app pendiente · módulo COBROS primero |
| Web unrealvillestudio.com | LIVE EN+ES · Why UNRLVL pendiente |
| Email | leads@ · profiler@ (Resend) |

---

## AGENDA PRÓXIMA SESIÓN

1. CoreProject: insertar sección Why UNRLVL
2. CoreProject: mover PriceList HTML a BluePrints/brands/Unrealville/
3. Profiler v7.2: test en widget web
4. Document Factory: schema EEFF v1.0 + normalizer
5. ForumPHs: datos Ivette → poblar fph.*
6. FPHs-OPS: módulo COBROS
7. ForumPHs Speaks → CRM
8. NeuroneSCF: Meta BM + 87 SKUs + Facebook Page
9. Skill ui-ux-layer · ImageLab LoRA Prep · BP_COPY_1.0 x3

---

## ÚLTIMA AUDITORÍA

**2026-04-19 · Claude Sonnet 4.6**

Profiler v7.2 LIVE con Lucian Sael. TIERS.md documentado en context. Sección Why UNRLVL generada para web. Nombre UNRLVL no cambia — se cuenta la historia.
