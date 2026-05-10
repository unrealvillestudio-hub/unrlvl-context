# SOCIAL MEDIA AGENT — Session Log
_Actualizado: 2026-05-10_

---

## ESTADO ACTUAL DE INFRAESTRUCTURA

| Plataforma | Estado | Notas |
|-----------|--------|-------|
| Meta Business Manager | ✅ Configurado | Info empresa completa |
| Facebook Page | ✅ Creada | "Neurone South & Central Florida" |
| Instagram Business | ✅ @neuronescflorida | Conversión a Business completa |
| TikTok for Business | ✅ @neuronescflorida | Creado desde web |
| Instagram → FB link | ❌ PENDIENTE | Laura detectó que no estaba vinculada (2026-04-18) |
| WhatsApp Business API | ⏳ EN PROGRESO | Patricia en Step 1 — requiere App en Meta Developers |
| Meta Developer App | ⏳ PENDIENTE | Meta está pidiendo App para System User tokens |
| Domain verification | ❌ PENDIENTE | Laura no tiene acceso al website — Sam puede via Cloudflare TXT |
| System User tokens | ❌ BLOQUEADO | Prerequisito: App en Meta Developers |
| TikTok API tokens | ❌ PENDIENTE | Después de Meta App |

---

## BLOQUEANTE PRINCIPAL

Meta requiere una App en **developers.facebook.com** para poder generar System User tokens. Patricia llegó hasta ese punto el 2026-05-04 pero no completó la creación de la App.

**Próximos pasos concretos:**
1. Patricia crea App en developers.facebook.com → tipo "Empresa" → nombre "Neurone SCF API"
2. Sam o Patricia vinculan Instagram → Facebook Page
3. Sam verifica dominio neuronescflorida.com via Cloudflare (TXT record)
4. Con App creada → System User → tokens para Orchestrator

**Sesión dedicada programada:** Sam + PO + pantalla compartida (fecha TBD)

---

## HISTORIAL DE SESIONES

### Laura (ops)

**2026-04-06:** TikTok Shop requerimientos — decidido diferir hasta tener dirección comercial. Meta BM con dirección de documentos oficiales.

**2026-04-10:** Completar Meta BM — Info empresa. Patricia en Miami sin VPN.

**2026-04-15:** BM configurado ✅. Domain verification bloqueada (Laura sin acceso al website). Facebook Page creada ✅.

**2026-04-17:** Instagram Business convertido a cuenta profesional ✅. Vinculación IG→FB pendiente.

**2026-04-18:** TikTok for Business creado desde web ✅. WABA setup iniciado — aclaración API vs App. Patricia llegó a configuración WABA pero necesita App primero.

**2026-05-04:** Laura pide tokens para Orchestrator/Labs. Instrucciones dadas para Meta System User. **Meta bloqueó el proceso — requiere App en developers.facebook.com primero.**

### Sam (admin)

**2026-04-06:** Definición emails (7 aliases). Estrategia números. Un BM por marca.

**2026-04-10:** Aliases y estado de sesiones.

### Patricia Osorio (po)

**2026-04-06:** Primera sesión — checklist previo al setup.

---

## EMAILS CONFIGURADOS

| Email | Función |
|-------|---------|
| admin@neuronescflorida.com | Administración |
| hello@neuronescflorida.com | Contacto público |
| support@neuronescflorida.com | Soporte |
| ig@neuronescflorida.com | Instagram |
| tiktok@neuronescflorida.com | TikTok |
| waba@neuronescflorida.com | WhatsApp API |
| ads@neuronescflorida.com | Meta Ads |

---
_Social Media Agent · NeuroneSCF · Actualizado 2026-05-10_
