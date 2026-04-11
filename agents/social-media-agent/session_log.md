# Session Log — Social Media Agent (Neurone SCF)
**Formato:** entradas cronológicas · las más recientes arriba · generado por el agente
**Agente:** `unrlvl-social-media-agent.vercel.app`
**Usuarios:** Patricia Osorio (PATY) · Laura Rodriguez (LAURA) · Sam (SAM)

---

## 2026-04-10 — Sesiones Laura + Sam

### LAURA — 2026-04-10
- Retomó trabajo de apertura de cuentas sociales
- Estado confirmado: cuenta personal Facebook de PO con admin@neuronescflorida.com ✅
- Meta Business Manager existente (parcialmente configurado) ✅
- Número T-Mobile activo y verificado ✅
- **Próximo paso:** Completar información de empresa en Meta BM (nombre legal, dirección, EIN, industry, website)

### SAM — 2026-04-10
- Preguntó sobre correos por red social → agente confirmó los 7 aliases canónicos
- Preguntó sobre última sesión → agente NO pudo acceder a session_log (gap confirmado — pendiente inyectar URL context system en system prompt)

### GAP CRÍTICO CONFIRMADO
El agente no tiene acceso al `session_log.md` de NeuroneSCF en el context system.
Sam tuvo que repetir contexto en ambas sesiones del 2026-04-10.
**Acción requerida:** Inyectar URL `https://unrlvl-context.vercel.app/brands/NeuroneSCF/session_log.md` en el system prompt del agente.

---

## 2026-04-06 — Sesiones Laura + Paty + Sam

### INFRAESTRUCTURA DIGITAL — ESTADO ACTUAL

**Completado:**
- ✅ 7 aliases de email bajo neuronescflorida.com (admin@, ig@, waba@, tiktok@, ads@, support@, hello@)
- ✅ Estrategia de números telefónicos definida: número físico dedicado, NUNCA personal de PO
- ✅ Compliance Meta verificado: un Business Manager por marca
- ✅ Decisión seguridad: Passkeys en Facebook/Instagram. TikTok: 2FA con app autenticadora
- ✅ Gestor de contraseñas: Bitwarden con contraseña maestra única
- ✅ Cuenta personal Facebook de PO activa con admin@neuronescflorida.com
- ✅ Meta Business Manager existente (parcialmente configurado)
- ✅ Número T-Mobile activo

**Pendiente:**
- ❌ Completar información empresa en Meta BM (nombre legal, dirección, EIN, industry, website)
- ❌ Facebook Page: Neurone South & Central Florida
- ❌ Instagram Business: @neuronescflorida
- ❌ WhatsApp Business API (requiere BM verificado + número físico + plantillas)
- ❌ TikTok for Business (diferir TikTok Shop hasta tener dirección comercial)
- ❌ Inyectar URL session_log en system prompt del agente

**Orden de creación APROBADO:**
1. ✅ Correos con dominio — COMPLETADO
2. ✅ Número físico dedicado (T-Mobile) — COMPLETADO
3. ✅ Cuenta personal Facebook de PO + Passkey — COMPLETADO
4. ⏳ Completar Meta Business Manager — EN CURSO
5. ❌ Facebook Page
6. ❌ Instagram Business
7. ❌ WhatsApp Business API
8. ❌ TikTok for Business

**Decisiones tomadas:**
- 7 aliases por función confirmados
- Número personal de PO: intocable, no usar para ninguna cuenta de negocio
- Un Business Manager por marca — nunca compartir entre marcas
- Passkeys como estándar en todas las plataformas que lo soporten
- TikTok Shop: diferir hasta resolver dirección comercial
- UNRLVL opera siempre con tokens API — nunca con credenciales del cliente

---

## 2026-03-23 — Inicialización del sistema

- Agente deployado y activo con contexto de marca Neurone SCF + PO
- Persistencia KV activa (Upstash Redis, región iad1)
- Protocolo de compresión activo (umbral 30 mensajes)
- Protocolo "Actualiza" activo — nudge cada 10 mensajes de usuario
- Session log integrado en protocolo "Actualiza" de Sam
