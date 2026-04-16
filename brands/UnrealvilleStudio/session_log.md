# Session Log — Unrealville Studio
_Marca interna · Sam (owner) · Actualizado: 2026-04-16_

---

## 2026-04-16 — Profiler Agent v6 deployed

### Contexto
Sam realizó una prueba al Profiler Agent en unrealvillestudio.com haciéndose pasar por un prospect (distribución DTC USA de geles/gominolas nutritivos, $2K/mes budget, 400K sachets/mes capacidad). Dos problemas detectados en v5:

1. **Bug técnico:** el agente rompió contexto en el turno 4 y regresó al saludo inicial ("Hablemos. ¿Qué estás construyendo?"). Los logs Supabase confirmaron 200 OK en todas las llamadas — el bug no era de infraestructura. Raíz: el opening phrase del SYSTEM_PROMPT v5 actuaba como ancla semántica dominante y el modelo regresaba a ella cuando perdía tracción con inputs largos/técnicos.

2. **Gap estratégico:** el agente hacía onboarding genérico. No aplicaba lente financiero, no detectaba señales comerciales (sobrecapacidad, subcapitalización, regulatory gaps, market claims unvalidated), no activaba modo sales cuando había fit real.

### Solución — Profiler Agent v6

Rediseño completo del system prompt y deploy a Supabase Edge Function (v5→v6, SHA256 `c1b77b24adbbc0217999c509de81828134bffb8cd08a57b7c2305a83a7d616b9`). Cambios:

**1. Opening regression fix (triple defensa):**
- Regla hard en prompt: opening usado exactamente una vez, "dead after turn 0"
- Inyección en cada turno ≥1 de bloque `CURRENT TURN — MANDATORY CHECK` con el último input del usuario
- Guardrail en código: regex detecta regresión al opening y reintenta con instrucción más estricta

**2. Nuevos saludos aprobados:**
- EN: "Hi there. What are you building?"
- ES: "Hola. ¿Qué estás construyendo?"

**3. Doctrina "analysis is bait":**
El agente NO retrae cuando el prospect suelta un número o claim. Muestra el trabajo, hace los cálculos en voz alta, nombra ratios y contexto competitivo, y devuelve la pregunta. La respuesta del prospect a ese análisis es el verdadero profiling signal, no la respuesta a preguntas genéricas. No se tease — se revela y se devuelve la pelota.

**4. Tres modos por señal (no por turno):**
- EXPLORER — default, curiosidad abierta
- ANALYST — activado por cualquier dato cuantificable
- CLOSER — activado por FIT_HIGH + readiness signals

**5. Modo CLOSER con estructura:** Reframe → Fit → Specific Vision → Commitment Test. Pitch ajustado al caso específico, nunca genérico.

**6. Flip "¿eres una IA?":** respuesta que reframe como producto UNRLVL + devuelve pregunta ("¿cómo la estás viendo hasta ahora?"). Si el prospect responde "esto está genial, quiero uno" → self-identified FIT_HIGH → activa CLOSER inmediatamente.

**7. Guardrail asimetría de reciprocidad (no contador):**
Detecta patrón cualitativo: ¿el prospect revela datos concretos (budget, traction, team, timeline) proporcionalmente al análisis que recibe? Si no, dispara invitación elegante a reciprocidad. No es cut-off por tokens; es cena donde se espera que el invitado también ponga algo en la mesa.

**8. Tonalidad:**
Presente y agudo pero educado, cortés, diplomático. Par adulto en una cena de negocios, nunca interrogador ni profesor. Claro sin ser brusco. Seguro sin ser arrogante.

**9. Portfolio explícito (qué SÍ y qué NO):**
SÍ: brand infrastructure, intelligent agents (WhatsApp/web/voice), paid media conectada al content system.
NO: financial advisory, fundraising, product development, regulatory/FDA, pure GTM decks, traditional agency retainers, SaaS dev, logistics/3PL.
Cuando el prospect necesita algo fuera del scope → redirige elegante, no fuerza la venta.

**10. Brief enriquecido:**
Nuevos campos en el JSON del brief que llega a leads@unrealvillestudio.com: `financial_read`, `mode_reached`, `closer_activated`, `reciprocity`. Email template con badges visuales para fit + mode + reciprocity.

### Estado endpoint

- URL: `https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/unrlvl-profiler`
- Version: 6 (ACTIVE)
- Integración CRM: trigger activo → `crm.contacts` (sin cambios)
- Email transaccional: `profiler@unrealvillestudio.com` (Resend, sin cambios)

### Siguiente paso inmediato

Sam debe reproducir la prueba del caso geles/gominolas en el widget de unrealvillestudio.com para validar que v6 resuelve: (a) no rompe contexto, (b) entra en ANALYST en cuanto aparecen números, (c) devuelve pelota con elegancia, (d) activa CLOSER si el prospect da traction + capital reales.

---

## 2026-04-15 — Sesión maratón día 2 (cierre)

### Document Factory — Plan documentado

**DOCUMENT_FACTORY_PLAN.md creado** — referencia permanente para sesiones de desarrollo.

Decisiones clave tomadas:
- Claude consume JSON, nunca archivos crudos directamente
- Normalizer (evolución del Zip Extractor) acepta .xlsx/.pdf/.docx → produce JSON schema fijo por módulo
- Motor único / dos contextos: ForumPHs (servicio a clientes PH) + UNRLVL (filtro de onboarding)
- Document Factory es el hogar de todo — no repos separados por tipo de documento
- Financial Intelligence como filtro de calificación UNRLVL: convierte "no somos para todo el mundo" en proceso objetivo y documentado

**Esta semana (sesión dedicada):**
- Formalizar schema JSON EEFF v1.0
- Mover Zip Extractor a `tools/normalizer.html` en repo Document Factory
- Definir template XLSX estándar de ingesta

### UNRLVL CRM v1.0 — COMPLETO (sesión anterior)
Schema crm.* Supabase · 14 tablas · 7 orgs · 9 pipelines · API v2 LIVE
Dashboard HTML operativo localmente · Trigger Profiler→CRM activo
CRM_INTEGRATIONS.md documentado en context

### Web + Profiler + Infraestructura (sesión anterior)
Web unrealvillestudio.com EN+ES LIVE · Profiler Agent v5 · CoreProject limpio
GitHub proxy v2 · Cloudflare activo · Auditoría completa todos los labs
Plan Maestro de labs y skills · 6 skills permanentes estrategia definitiva

### Pendiente próxima sesión

**Document Factory (esta semana):**
1. Schema JSON EEFF v1.0 — definir estructura fija
2. Normalizer en `tools/` del repo Document Factory
3. Template XLSX estándar ingesta

**Operaciones:**
4. ForumPHs Speaks → CRM integración Edge Function
5. NeuroneSCF: Meta BM + 87 SKUs + precios
6. SMA: URL session_log en system prompt
7. ForumPHs: foto Ivette para Speaks

**Labs:**
8. Skill ui-ux-layer
9. Fal.ai birefnet → ImageLab LoRA Prep
10. BP_COPY_1.0 x3 marcas

### Decisiones importantes tomadas hoy

- Document Factory crecerá a contratos, actas, informes — estructura modular ya definida
- Financial Intelligence tiene dos roles: valor para clientes FPHs + filtro de onboarding UNRLVL
- Umbrales de calificación UNRLVL pendientes de definir con Sam en sesión estratégica
- CRM centralizado (UNRLVL controla) + Client Ops Template para casos como ForumPHs
- Schema crm.* migrable a Supabase propio cuando supere 50K contactos
