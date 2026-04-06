# Session Log — Social Media Agent (Neurone SCF)
**Formato:** entradas cronológicas · las más recientes arriba · generado por el agente
**Agente:** `unrlvl-social-media-agent.vercel.app`
**Usuarios:** Patricia Osorio (PATRICIA) · Laura Rodriguez (LAURA) · Sam (SAMDEV)

---

## 2026-04-06 — Sesiones Laura + Paty + Sam

### INFRAESTRUCTURA DIGITAL — ESTADO ACTUAL

**Completado:**
- ✅ 7 aliases de email bajo neuronescflorida.com (admin@, ig@, waba@, tiktok@, ads@, support@, hello@)
- ✅ Estrategia de números telefónicos definida: número físico dedicado, NUNCA personal de PO
- ✅ Compliance Meta verificado: un Business Manager por marca
- ✅ Decisión seguridad: Passkeys en Facebook/Instagram. TikTok: 2FA con app autenticadora.
- ✅ Gestor de contraseñas: Bitwarden con contraseña maestra única

**En curso:**
- ⏳ Definición de dirección comercial (residencial vs. Vizos Salón vs. virtual office)
- ⏳ Coordinación con Laura para adquisición de número físico dedicado

**Pendiente:**
- ❌ Número comercial físico dedicado (SIM T-Mobile/AT&T/Verizon prepago en Miami — NO VoIP)
- ❌ Verificación WiFi Miami sin VPN
- ❌ Preparación documentos empresa (EIN, dirección, constitución)
- ❌ Tarjeta crédito/débito con dirección EE.UU.
- ❌ Setup logos mínimo 400x400px
- ❌ Cuenta personal Facebook de PO verificada con Passkey
- ❌ Meta Business Manager (crear desde Miami sin VPN)
- ❌ Facebook Page: Neurone South & Central Florida
- ❌ Instagram Business: @neuronescflorida
- ❌ WhatsApp Business API (requiere BM verificado + número físico + plantillas)
- ❌ TikTok for Business (diferir TikTok Shop hasta tener dirección comercial)

**Decisiones tomadas:**
- 7 aliases por función confirmados
- Número personal de PO: intocable, no usar para ninguna cuenta de negocio
- Un Business Manager por marca — nunca compartir entre marcas
- Passkeys como estándar en todas las plataformas que lo soporten
- TikTok Shop: diferir hasta resolver dirección comercial (requiere licencia/dirección no residencial)
- Para resto de cuentas: usar dirección de documentos oficiales mientras se resuelve dirección comercial
- UNRLVL opera siempre con tokens API — nunca con credenciales del cliente

**Orden de creación APROBADO:**
1. ✅ Correos con dominio — COMPLETADO
2. ❌ Número físico dedicado (SIM Miami)
3. ❌ Cuenta personal Facebook de PO + Passkey
4. ❌ Meta Business Manager
5. ❌ Facebook Page
6. ❌ Instagram Business
7. ❌ WhatsApp Business API
8. ❌ TikTok for Business

**Próximo paso concreto:** Laura adquiere número físico dedicado (SIM T-Mobile/AT&T prepago en tienda Miami). PO confirma acceso a los 7 aliases de email.

---

## 2026-03-23 — Inicialización del sistema

### ESTADO INICIAL
- Agente deployado y activo con contexto de marca Neurone SCF + PO
- Persistencia KV activa (Upstash Redis, región iad1)
- Protocolo de compresión activo (umbral 30 mensajes)
- Protocolo "Actualiza" activo — nudge cada 10 mensajes de usuario
- Session log integrado en protocolo "Actualiza" de Sam
