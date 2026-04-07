# Session Log — Social Media Agent (Neurone SCF)
**Formato:** entradas cronológicas · las más recientes arriba · generado por el agente
**Agente:** `unrlvl-social-media-agent.vercel.app`
**Usuarios:** Sam (SAMDEV) · Patricia Osorio (PATRICIA) · Laura Rodriguez (LAURA)

---

## 2026-04-06 — Sesiones Laura, Sam y Paty

### LAURA (ops) — 2 intercambios
- TikTok Shop: requiere dirección comercial (no residencial), Business License, EIN, warehouse address, tax documents.
- Opciones: usar Vizos Salón si tiene licencia activa · virtual office (UPS Store/Regus) · diferir TikTok Shop.
- Conflicto de direcciones: recomendación empezar con dirección de documentos oficiales para Meta BM + TikTok for Business + WABA. TikTok Shop diferir.

### SAM (admin) — 3 intercambios
- Diagnóstico: agente no tenía acceso al session_log de NeuroneSCF en Context System.
- Path correcto: `unrlvl-context/brands/NeuroneSCF/session_log.md`
- ⚠️ **GAP ACTIVO:** agente no puede leer el Context System directamente. Pendiente inyectar URL en system prompt.

### PATY (po) — 1 intercambio
- Primera sesión real. Agente presentó checklist de preparación (WiFi sin VPN, celular US, docs empresa, tarjeta US).
- Patricia aún no ha retomado setup de infraestructura digital.

---

## 2026-03-23 — Primera sesión Sam (SAMDEV)

### COMPLETADO
- ✅ Definición de 7 aliases de email por función bajo neuronescflorida.com
- ✅ Estrategia de números: comercial dedicado separado del personal de PO
- ✅ Compliance Meta verificado: un número por Business Manager

### EN CURSO
- ⏳ Creación de aliases en servidor neuronescflorida.com
- ⏳ Preparación de documentación para Laura/Patricia

### PENDIENTE
- ❌ Adquisición número comercial dedicado (OpenPhone/NumberBarn)
- ❌ Verificación WiFi Miami sin VPN
- ❌ Documentos empresa (EIN, tarjeta US, constitución)
- ❌ Logos en formatos requeridos (400×400px mínimo)
- ❌ Creación cuentas redes sociales
- ❌ WhatsApp Business API
- ❌ Meta Business Manager setup
- ❌ TikTok for Business setup

### DECISIONES
- 7 aliases: admin@, ig@, waba@, tiktok@, ads@, support@, hello@
- Número comercial separado del personal de PO — obligatorio compliance Meta
- Un BM por marca para evitar suspensiones cruzadas
- OpenPhone o NumberBarn para WABA

### PRÓXIMO PASO
Crear los 7 aliases en servidor de email y coordinar con Laura adquisición del número comercial dedicado

---

## 2026-03-23 — Inicialización del sistema de log

- Agente deployado con contexto Neurone SCF + PO
- KV activo (Upstash Redis, región iad1, TTL 90 días)
- Roles: SAM→admin · PATY→po · LAURA→ops
- Primera sesión de Laura y Patricia: pendiente
