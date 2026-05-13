# UNRLVL Agent Infrastructure — Master Plan
_Versión 1.0 · Mayo 2026 · Confidencial_

---

## AGENTES DEL ECOSISTEMA

### Agentes existentes — migrar al estándar

| ID | Nombre | Canal | Estado | Prioridad |
|---|---|---|---|---|
| `ddmv` | DDMV Assistant | WhatsApp (Twilio) | ⚠️ Fix urgente | Sprint 1 |
| `social-media-agent` | Social Media Agent | Interno | ✅ Operativo | Registrar |
| `forumph-speaks` | ForumPH Speaks | Web | ✅ Operativo | Registrar |

### Agentes nuevos — construir desde el estándar

| ID | Nombre | Canal | Complejidad | Sprint |
|---|---|---|---|---|
| `po-faq-appointments` | PO Agent | WhatsApp + SMS | Alta | Sprint 2 |
| `forumph-ops` | ForumPHs-OPS | WhatsApp | Muy alta | Sprint 3 |
| `compliance-guardian` | Compliance Guardian | Interno + OPS | Alta | Sprint 6 |

### Labs a activar

| Lab | Estado actual | Activa en |
|---|---|---|
| AgentLab | PASSED — sin spec | Sprint 4 |
| VoiceLab | Wishlist | Sprint 5 |

---

## ESTÁNDAR DE INFRAESTRUCTURA v1.0

### Stack universal
- **Runtime:** Vercel
- **Database:** Supabase (multi-tenant via DB Router)
- **Cache:** Hot (in-memory Vercel) + Warm (Vercel KV/Redis) + Cold (Supabase)
- **Canal:** Twilio WhatsApp/SMS · Web widget
- **Brain:** Claude API (Sonnet frontend · Haiku service)
- **Voz (futuro):** ElevenLabs → unrlvl-voicelab.vercel.app

### Tenants de base de datos
| Tenant | Supabase | Datos |
|---|---|---|
| `default` | amlvyycfepwhiindxgzw | UNRLVL · brands · agents · sessions |
| `forumph` | [instancia aislada] | owners · accounts · SLA · legal |

### Clases de agente
| Clase | Descripción | Ejemplos |
|---|---|---|
| `frontend` | Hablan con humanos · latencia crítica <1,500ms | DDMV · PO · ForumPHs-OPS |
| `service` | Hablan con sistemas/agentes · async | cache-warmer · summary-gen · compliance-guardian |

### Capas de arquitectura (todas en agent.json)

```
Capa 1 — Agent Registry          ecosystem.json → sección agents.*
Capa 2 — Taxonomía de tipos       faq_appointments · social_ops · knowledge_legal · compliance
Capa 3 — Repo canónico            unrlvl-agent-template
Capa 4 — Channel adapters         twilio-whatsapp · twilio-sms · web-widget
Capa 5 — AgentLab                 brief → agent.json → deploy
Capa 6 — Personal Voice Profile   skills/personal_voice_[ID].md
Capa 7 — Commercial Output Filter pipeline comprimido GENERATE → CHECK → SEND
Capa 8 — VoiceLab                 ElevenLabs · trigger rules por contexto
```

### Sistema de memoria — 3 niveles
```
Nivel 1 — Hot Cache      in-memory Vercel · TTL 5 min   → perfil contacto · idioma
Nivel 2 — Warm Cache     Vercel KV (Redis) · TTL 1h     → memory window · entity_facts · tono
Nivel 3 — Cold Store     Supabase                       → fuente de verdad · transacciones
```

#### Memory window (conversacional)
```
Tier 1: Últimos 10-15 mensajes de sesión anterior
Tier 2: Resúmenes comprimidos últimos 7 días (~150 tokens/sesión)
Tier 3: Resumen consolidado días 8-15 (~200 tokens)
Tier 4: Hechos clave del perfil (entity_facts)
Costo total inyectado: ~1,200-1,500 tokens por sesión
```

#### Retención configurable por agent.json
`7 | 15 | 30 | 365 días`

### Tono
- **Fijo:** `skills/persona.md` — versionado, nunca en código
- **Dinámico:** `tone_engine` en agent.json (solo ForumPHs-OPS y similares)
- **Personal:** `skills/personal_voice_[ID].md` — corpus extraído de la persona real

### Idiomas
- Auto-detección en primera interacción
- `preferred_language` guardado en entity_facts
- Tier 1 (~25 idiomas): ES · EN · FR · DE · IT · PT · RU · ZH · JA · AR + más
- Personal voice adapta el patrón emocional, no las palabras literales

### Commercial Output Filter
```
Aplica a:    PO Agent · ForumPHs-OPS (parcial) · cualquier agente comercial
Modelo:      Claude Haiku (400-600ms adicionales)
Criterios:   voz personal · CTA · palabras prohibidas · longitud WhatsApp
Resultado:   APPROVED o REWRITE + razón → el agente regenera una vez
```

---

## COMPLIANCE GUARDIAN — Especificación

### Modo vigilancia (Service Agent continuo)
Lee campañas, creativos, copy, targeting → evalúa contra políticas actualizadas → alerta antes de que la plataforma actúe.

### Modo resolución (activado por incidente)
Protocolo específico por plataforma → pasos exactos → lenguaje de appeal → timeline → plan B.

### Knowledge base
```
skills/compliance/
├── meta-ads-policies.md
├── google-ads-policies.md
├── tiktok-ads-policies.md
├── prohibited-categories.md
├── restricted-categories.md
├── appeal-protocols/
│   ├── meta-appeal-playbook.md
│   ├── google-appeal-playbook.md
│   └── tiktok-appeal-playbook.md
└── case-library/              ← activo más valioso · crece con cada caso resuelto
```

### Learning loop
Cada caso resuelto → documenta causa + pasos + resultado → alimenta case-library → Guardian mejora automáticamente.

### Integración
Conectado a: Meta Ads API · Google Ads API · TikTok Ads API · SignalLab · UNRLVL-OPS
**No conectado a:** Meta.ai · Google AI · TikTok AI (conflicto de interés estructural — descartado)

---

## COSTOS ESTIMADOS

### Stack base mensual
| Componente | Costo/mes |
|---|---|
| Vercel Pro | $20 |
| Supabase UNRLVL | $25 |
| Supabase ForumPHs | $25 |
| Vercel KV (Redis) | $10 |
| **Subtotal infraestructura** | **$80** |

### Por agente mensual
| Agente | API Claude | Twilio | Otros | Total |
|---|---|---|---|---|
| DDMV | $0.75 | $0.50 | $0.03 | ~$1.50 |
| PO Agent | $8.70 | $8.00 | — | ~$17-22 |
| ForumPH Speaks | $4.00 | — | — | ~$4 |
| ForumPHs-OPS (1,500) | $7.50 | $15.00 | — | ~$22 |
| ForumPHs-OPS (3,000) | $12.00 | $28.00 | — | ~$40 |
| Compliance Guardian | — | — | — | ~$15-25 |

### Total ecosistema
| Escenario | Total/mes |
|---|---|
| Hoy (4 agentes) | ~$125 |
| 12 meses (3,000 ForumPHs) | ~$155 |
| Ecosistema completo + AgentLab | ~$200 |
| + VoiceLab activado | ~$222 |

### Pricing sugerido a clientes
- PO Agent: costo ~$22 · precio $150-300/mes
- ForumPHs-OPS: costo ~$40 · precio $500-800/mes
- **Margen: 7x-15x**

---

## ROADMAP — SPRINTS Y SESIONES

### Sprint 0 — Foundation `2-3 sesiones`
> La fábrica. Todo lo demás se construye sobre esto.

- **S0.1** Schema Supabase `agents.*` · DB Router multi-tenant
- **S0.2** `agent.json` spec canónica · Vercel KV setup · cache layer base
- **S0.3** Repo `unrlvl-agent-template` · estructura canónica · channel adapters base

**Entregable:** Infraestructura estándar lista. Cualquier agente nuevo parte desde aquí.

---

### Sprint 1 — DDMV Fix `1-2 sesiones`
> Primer agente existente corriendo sobre el estándar. Validación real de memoria.

- **S1.1** Migrar al estándar · `personal_voice_DDMV.md` · memoria 15 días · tono bloqueado en `persona.md`
- **S1.2** QA con tu madre · validar que "se acuerda" · deploy producción

**Entregable:** La frustración de tu madre resuelta. Sistema de memoria validado en producción.

---

### Sprint 2 — PO Agent `3-4 sesiones`
> Primer agente nuevo construido desde cero con el estándar.

- **S2.1** Workshop 30 min con Patricia → `personal_voice_PO.md` · FAQ real · reglas de citas
- **S2.2** `agent.json` PO · Google Calendar integration · memory layer · entity_facts por cliente
- **S2.3** Commercial check · tone + sales patterns · WhatsApp + SMS adapters · deploy staging
- **S2.4** QA con Patricia · ajuste fino de voz · deploy producción

**Entregable:** Patricia tiene su agente. Template validado. Primer cliente facturando.

---

### Sprint 3 — ForumPHs-OPS `4-5 sesiones`
> Agente más complejo. Multi-tenant y cache invalidation validados en producción.

- **S3.1** ForumPHs Supabase setup · schema `owners/accounts/sla/incidents` · DB Router configurado
- **S3.2** Tone engine · 4 perfiles · reglas de activación · cache invalidation webhook
- **S3.3** `agent.json` ForumPHs-OPS · memoria por propietario · cache warmer vencimientos
- **S3.4** WhatsApp adapter · integración Supabase ForumPHs · deploy staging · datos reales Ivette
- **S3.5** QA · ajuste de tono por perfil · deploy producción

**Entregable:** 1,500 propietarios cubiertos. Arquitectura lista para escalar a 3,000.

---

### Sprint 4 — AgentLab `3-4 sesiones`
> El siguiente agente se construye en días, no semanas.

- **S4.1** UI brief → `agent.json` generator · selección tipo/canal/memoria/voz/pipeline
- **S4.2** Template cloner + deploy automático · registro automático en `ecosystem.json`
- **S4.3** Testing con siguiente cliente real de UNRLVL
- **S4.4** Documentación · runbook de deployment · deploy producción

**Entregable:** AgentLab operativo. Industrial Consistency alcanzado.

---

### Sprint 5 — VoiceLab `2-3 sesiones`
> Patricia responde con su propia voz.

- **S5.1** ElevenLabs setup · voice cloning PO + Ivette · `unrlvl-voicelab.vercel.app` · API `/synthesize`
- **S5.2** Integración con agentes existentes · trigger rules · formato OGG/Opus WhatsApp
- **S5.3** QA de voz · deploy producción

**Entregable:** VoiceLab operativo. Diferenciador de producto activado.

---

### Sprint 6 — Compliance Guardian `3-4 sesiones`
> Protección del ecosistema publicitario de UNRLVL y sus clientes.

- **S6.1** Knowledge base inicial — políticas Meta/Google/TikTok · appeal playbooks · schema `compliance.cases`
- **S6.2** Modo vigilancia · integración Ads APIs (lectura) · alertas SignalLab + UNRLVL-OPS
- **S6.3** Modo resolución · playbooks por incidente · reporte cliente · case library inicial
- **S6.4** Learning loop — casos resueltos → knowledge base · deploy producción

**Entregable:** Protección activa. Case library crece con cada incidente. Ventaja competitiva acumulativa.

---

## RESUMEN EJECUTIVO

```
Sprints:              6
Sesiones totales:     18-24
Tiempo estimado:      8-12 semanas según ritmo
Costo mensual final:  ~$200-222/mes ecosistema completo

Primer valor:         Sprint 1 — DDMV funciona en 1-2 semanas
Primer negocio:       Sprint 2 — PO Agent facturando en 3-4 semanas
Escala completa:      Sprint 4 — Industrial Consistency alcanzada
Diferenciador real:   Sprint 5 — Voz propia por agente
Protección activa:    Sprint 6 — Compliance Guardian operativo
```

---

## ARCHIVOS CANÓNICOS DEL ESTÁNDAR

```
unrlvl-context (repo)
├── ecosystem.json                    ← añadir sección agents.*
├── ecosystem_filemap.md              ← añadir agents/
└── protocols/
    └── SESSION_PROTOCOL.md

unrlvl-agent-template (repo nuevo)
├── /api
│   ├── webhook.js
│   ├── handler.js
│   └── memory.js
├── /config
│   └── agent.json                   ← spec canónica
├── /skills
│   ├── persona.md
│   └── personal_voice_[ID].md
├── /adapters
│   ├── twilio-whatsapp.js
│   ├── twilio-sms.js
│   └── web-widget.js
├── /compliance (solo Compliance Guardian)
│   └── skills/
└── vercel.json

Por agente (repos individuales)
unrlvl-agent-[nombre]/
└── (clonado de template + agent.json configurado)
```

---

_Documento generado por Claude · Unrealville Studio · Mayo 2026_
_Próxima acción: Sprint 0 — S0.1 Schema Supabase agents.*_
