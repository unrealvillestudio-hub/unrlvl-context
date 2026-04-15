# UNRLVL CRM — Definición de Integraciones
_Creado: 2026-04-15 · Referencia para implementaciones futuras_
_Este documento vive en `brands/UnrealvilleStudio/CRM_INTEGRATIONS.md`_

---

## ARQUITECTURA GENERAL

```
FUENTES DE DATOS (generan contactos)
  ↓
crm.contacts + crm.contact_orgs (Supabase schema crm.*)
  ↓
OPERACIONES (flujos, segmentos, campañas)
  ↓
DESTINOS (email, ads, newsletters, agentes)
```

El CRM vive en el schema `crm.*` del Supabase principal (`amlvyycfepwhiindxgzw`). Está lógicamente aislado del ecosistema de labs (`public.*`). Migrable a proyecto Supabase propio cuando el volumen lo justifique.

---

## ORGS ACTIVAS

| ID | Nombre | Tipo | Mercado | Pipeline |
|---|---|---|---|---|
| `UnrealvilleStudio` | Unrealville Studio | studio | Florida + LATAM | Sales Pipeline (7 stages) |
| `ForumPHs` | ForumPHs | real_estate | Panamá | Pipeline Speaks (5 stages) |
| `NeuroneSCF` | Neurone SCF | cosmetics | S&C Florida | B2B Salones + B2C (2 pipelines) |
| `PatriciaOsorioPersonal` | Patricia Osorio · Personal | personal_brand | Miami, FL | Pipeline Comunidad |
| `PatriciaOsorioVizosSalon` | Vizos Salon | salon | North Miami, FL | Pipeline Salón |
| `VizosCosmetics` | Vizos Cosmetics | cosmetics | Miami + España | Pipeline Retail |
| `UnrealvilleStores` | Unrealville Stores | ecommerce | Florida, USA | Pipeline E-Commerce |

---

## FUENTES DE CONTACTOS — DEFINICIÓN POR ORG

### UnrealvilleStudio
**Fuente 1 — Profiler Agent (ACTIVA)**
- Mecanismo: trigger Supabase `trg_profiler_to_crm`
- Cuando: `profiler_sessions.contact_email` se registra
- Qué crea: `crm.contacts` + `crm.contact_orgs` (type: `lead`) + `crm.interactions` (type: `agent_lead_captured`)
- Campos: email, nombre, fit_score, detected_tier, brief
- **Estado: funcionando hoy**

**Fuente 2 — Formulario web (PENDIENTE)**
- Mecanismo: POST a Edge Function `unrlvl-crm-api?action=upsert_contact` + `add_contact_to_org`
- Cuándo implementar: cuando se añada formulario de contacto alternativo al sitio

---

### ForumPHs
**Fuente 1 — ForumPHs Speaks (PENDIENTE — mayor prioridad)**
- Mecanismo: Edge Function `forumphs-speaks` debe hacer POST a `unrlvl-crm-api` al capturar lead
- Cuando: Speaks captura email del propietario de PH
- Qué crea: `crm.contacts` + `crm.contact_orgs` (type: `lead`, sub_type: `ph_owner`) + interaction `agent_lead_captured`
- Campos: email, nombre, tipo de PH consultado, sesión Speaks
- Implementación: añadir llamada al CRM API en la Edge Function de Speaks post-lead-capture
- **Estado: diseñado, pendiente código**

**Fuente 2 — Propietarios de PHs existentes (PENDIENTE — importación única)**
- Mecanismo: CSV import via script → `upsert_contact` bulk
- Tipo: `customer_b2b`, sub_type: `ph_owner`
- Datos: Ivette tiene la lista de propietarios activos
- Pipeline stage inicial: `client` (ya son clientes activos)

**Fuente 3 — Residentes / Inquilinos (FUTURO)**
- Solo cuando ForumPHs quiera gestionar comunicación con residentes
- Tipo: `subscriber`

---

### NeuroneSCF
**Fuente 1 — Shopify (PENDIENTE)**
- Mecanismo: Shopify Webhook `customers/create` + `orders/paid` → Edge Function → CRM
- Tipos: `customer_b2b` (salones con cuenta pro), `customer_b2c` (consumidores finales)
- Campos: email, nombre, total pedidos, LTV, primer pedido, último pedido
- Implementación: crear Edge Function `neurone-shopify-webhook` que recibe los webhooks de Shopify y llama a `unrlvl-crm-api`
- **Estado: diseñado, pendiente Shopify activo (SKUs + precios primero)**

**Fuente 2 — Agente WhatsApp NeuroneSCF (FUTURO)**
- Mecanismo: AgentLab WhatsApp agent → captura conversación → POST a CRM
- Tipo: `lead`, sub_type por calificación
- **Estado: bloqueado hasta Twilio activo**

**Fuente 3 — Formulario B2B `/profesionales` (PENDIENTE)**
- Mecanismo: form submit → POST a CRM
- Tipo: `customer_b2b`, pipeline: B2B Salones
- **Estado: pendiente página /profesionales**

---

### PatriciaOsorioPersonal
**Fuente 1 — Social Media Agent (PENDIENTE)**
- Mecanismo: cuando SMA captura interacción con DM o comentario → POST a CRM
- Tipo: `follower` → `subscriber` → `lead` según calificación
- **Estado: SMA activo pero sin integración CRM**

**Fuente 2 — Newsletter opt-in (FUTURO)**
- Mecanismo: landing page / link en bio → formulario → CRM
- Tipo: `subscriber`

---

### PatriciaOsorioVizosSalon
**Fuente 1 — Booking system (FUTURO)**
- Si se integra sistema de reservas, cada cliente que reserve = contacto CRM
- Tipo: `customer_b2c`

**Fuente 2 — Importación manual (PENDIENTE)**
- Lista de clientes activos del salón que PO quiera registrar
- CSV import

---

### VizosCosmetics
**Fuente 1 — WooCommerce / WordPress (FUTURO)**
- Mecanismo: WP webhook `woocommerce_new_order` → Edge Function → CRM
- Tipo: `customer_b2c`

**Fuente 2 — Distribuidores B2B (PENDIENTE)**
- Tipo: `partner`, sub_type: `distributor`
- Import manual MO + PO

---

### UnrealvilleStores
**Fuente 1 — Shopify laboratorio dropshipping (PENDIENTE)**
- Mismo patrón que NeuroneSCF Shopify
- Tipo: `customer_b2c`

---

## FLUJO DE DATOS — DIAGRAMA

```
PROFILER AGENT          ──trigger automático──→  crm.contacts
                                                  crm.contact_orgs
                                                  crm.interactions

SPEAKS (ForumPHs)       ──POST Edge Fn──→        crm.contacts (ph_owner)
SHOPIFY (Neurone)       ──webhook──→             crm.contacts (b2b/b2c)
SHOPIFY (Stores)        ──webhook──→             crm.contacts (b2c)
SOCIAL MEDIA AGENT      ──POST──→                crm.contacts (follower→lead)
FORMULARIOS WEB         ──POST──→                crm.contacts

                    crm.contacts + crm.contact_orgs
                              ↓
              ┌───────────────┴───────────────┐
              ↓                               ↓
      crm.segments                  crm.email_sequences
    (listas para ads)              (flujos automatizados)
              ↓                               ↓
      Meta Ads Audiences            Resend / Email ESP
      TikTok Audiences              WhatsApp (Twilio)
      Newsletter ESP                SMS
```

---

## DESTINOS DE DATOS — DEFINICIÓN

### Email Sequences (flujos)
- Engine: Resend API (ya configurado en ecosistema)
- Triggers automáticos por evento en CRM:
  - `new_lead` → Welcome sequence
  - `purchase` → Post-purchase sequence
  - `stage_changed: active` → Onboarding sequence
  - `inactivity_90d` → Reactivation sequence
- **Estado: schema listo, engine pendiente construir**

### Ads Audiences
- Meta: Custom Audiences via Facebook Marketing API
  - Upload: email hasheado de segmentos → audiencia personalizada
  - Lookalike: basado en `customer_b2c` activos
- TikTok: Custom Audiences via TikTok Marketing API
- **Estado: diseñado, pendiente OAuth Meta/TikTok en SocialLab**

### Newsletters
- Segmentos → lista de emails → Resend batch send
- **Estado: pendiente**

---

## HIGIENE DE DB — REGLAS ACTIVAS

| Regla | Condición | Acción | Estado |
|---|---|---|---|
| `mark_cold_540d` | Sin actividad 18 meses | global_status → `cold` | ACTIVA |
| `archive_720d` | Sin actividad 24 meses (y cold) | global_status → `archived` | ACTIVA |
| `unsubscribe_bounced` | bounce_type = hard | global_status → `unsubscribed` | ACTIVA |
| `tag_no_email` | email is null | tag: `incomplete` | ACTIVA |

**Ejecutar manualmente:** botón "Hygiene" en el dashboard
**Automatización futura:** Supabase pg_cron para ejecutar cada semana automáticamente

---

## COMPLIANCE

- **CAN-SPAM (USA):** campo `can_spam_compliant: true` por defecto. Los segmentos excluyen automáticamente `global_status IN ('unsubscribed','bounced','spam')`
- **GDPR (España/Europa):** campo `gdpr_consent` + `gdpr_consent_at`. Para contactos de España (VizosCosmetics, D7Herbal) requiere consentimiento explícito antes de envíos
- **Opt-out:** cualquier contacto que llegue como `unsubscribe` interaction → `global_status = unsubscribed` automáticamente via trigger (pendiente implementar trigger)

---

## PLAN DE IMPLEMENTACIÓN PRIORIZADO

### Fase 1 — Ya hecho ✅
- Schema `crm.*` completo en Supabase
- 7 orgs + 9 pipelines configurados
- API Edge Function `unrlvl-crm-api` v2 LIVE
- Trigger Profiler Agent → CRM activo
- Dashboard operativo

### Fase 2 — Corto plazo
- [ ] ForumPHs Speaks → CRM: añadir POST en Edge Function de Speaks (1 sesión)
- [ ] Email sequence engine básico con Resend (1 sesión)

### Fase 3 — Cuando Shopify esté activo
- [ ] NeuroneSCF Shopify webhook → CRM (1 sesión)
- [ ] UnrealvilleStores Shopify webhook → CRM (1 sesión)

### Fase 4 — Cuando OAuth Meta/TikTok esté activo
- [ ] Segment export → Meta Custom Audiences
- [ ] Segment export → TikTok Custom Audiences

### Fase 5 — Largo plazo
- [ ] pg_cron para higiene automática semanal
- [ ] Import masivo contactos existentes (ForumPHs propietarios, NeuroneSCF salones)
- [ ] Migrar `crm.*` a proyecto Supabase dedicado si supera 50K contactos
- [ ] Client Ops Template para ForumPHs (DB operativa de PH independiente del CRM)
