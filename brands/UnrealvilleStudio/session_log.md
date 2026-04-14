# Session Log — Unrealville Studio
_Marca interna · Sam (owner) · Actualizado: 2026-04-14_

---

## 2026-04-14 — Sesión maratón · Web + Profiler Agent + CRM

### Resuelto hoy

**Brand context creado en context system:**
- `brand.json` + `BP_Brand_Context.md` — identidad completa, colores, tipografía, logotipo, footer, assets, output standards
- Fuente: `BluePrints/brands/Unrealville/BP_BRAND_UNRLVL_v1.2.json`
- Nota: carpeta en BluePrints = `Unrealville` / carpeta en context system = `UnrealvilleStudio`

**GitHub proxy skill:**
- `skills/github-auditor/SKILL.md` — proxy `/api/gh` documentado y verificado (21 repos accesibles)
- PAT vive en Vercel env var `GH_PAT` — nunca en el chat

**SESSION_PROTOCOL.md v8** — GitHub skill + UnrealvilleStudio añadidos

**Pricing architecture cerrada v1.2:**
- Tiers: SIGNAL $3,500 / PULSE $6,500 / ORBIT $12,000/mo
- E-Commerce add-on: Signal +$2,000 / Pulse +$3,500 / Orbit +$4,500 por marca
- Setup fee = 1 mes de retainer por módulo activo
- Revenue sharing 10% sobre ventas atribuibles desde mes 13
- Tiers: Signal / Pulse / Orbit (no jerárquicos)
- Blueprint como término oficial (no Brand DNA)
- Ad spend en cuenta del cliente — UNRLVL gestiona, nunca financia
- Sin proyectos puntuales sin retainer
- Aprobaciones vía sistema estructurado — cambios fuera de proceso: $150/hr
- "Account Manager" en materiales externos
- Documentos: `UNRLVL_PriceList_v1.2.html` + `UNRLVL_Pricing_Costs_v1.0.html`
- Color amber `#FFB020` añadido al brand palette (secondary accent, pricing distinctions)

**Web unrealvillestudio.com — index.html completo (pendiente push):**
- Bugs corregidos: GSAP scripts limpios, chevron parpadeando (BP_BRAND), dirección correcta
- Psycho Layer section: demo interactivo 7 estímulos (Authority/Urgency/Aspiration/Belonging/FOMO/Identity/Trust)
- Profiler Agent: reemplaza formulario estático #select
- Amber: CTA "Let's talk" con pulse + ventana del agente con ring animation
- Nav CTA: "Apply →" → "Let's talk →"
- Footer: border-top 2px cyan + background carbon (BP_BRAND v1.2 compliant)

**Profiler Agent — Edge Function v3 LIVE:**
- Endpoint: `https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/unrlvl-profiler`
- Conversación natural 5 etapas EN/ES · scoring fit high/medium/low
- Detección email + nombre · brief generado por Claude
- Email a `leads@unrealvillestudio.com` via Resend (brief + conversación completa)
- `reply_to` → email del prospecto · no duplica notificaciones

**Email infrastructure:**
- `leads@unrealvillestudio.com` — Cloudflare Email Routing activo
- `profiler@unrealvillestudio.com` — Resend (transaccional), dominio verificado
- `RESEND_API_KEY` en Supabase Secrets

**UNRLVL CRM v1.0 — Schema activo en Supabase:**
- `crm_contacts` — pipeline: lead → qualified → onboarding → active → paused → churned → lost
- `crm_activities` — interacciones, notas, emails
- `crm_stage_history` — historial de cambios de etapa
- Trigger `sync_profiler_to_crm` — auto-popula crm_contacts cuando Profiler captura email
- Dashboard: pendiente construir próxima sesión

### Decisiones tomadas hoy

- Mercado: USA + LATAM únicamente. España/Europa fuera del mapa por ahora.
- Sin email ni teléfono visible en web — solo el Profiler Agent como punto de contacto
- El agente captura email del prospecto · Sam recibe brief por email
- Leads calificados entran a flujo de email (pendiente implementar)
- Onboarding: prospecto calificado recibe datos de contacto Sam + Account Executive
- Número Twilio (cuando se tenga): canal de salida solo para leads calificados, no visible en web

### Pendiente próxima sesión

1. Push index.html a CoreProject (PAT requerido)
2. Versión /es del sitio + link EN↔ES
3. UNRLVL CRM dashboard (gestión pipeline Sam)
4. Cloudflare redirect rules (www→apex, http→https)
5. SMA: inyectar URL session_log en system prompt
6. Flujo email al prospecto calificado
7. Amber en BP_BRAND_UNRLVL_v1.2.json en BluePrints

### Web sections status

| Sección | Estado |
|---|---|
| Hero | LIVE |
| Ecosystem (What We Build) | LIVE |
| Criterion (30+) | LIVE |
| Proof (What It Can Do) | LIVE |
| Analytics (Ecosystem in Motion) | LIVE |
| Psycho Layer | BUILT — pendiente push |
| Profiler Agent (#select) | BUILT — pendiente push |
| Footer | LIVE |
