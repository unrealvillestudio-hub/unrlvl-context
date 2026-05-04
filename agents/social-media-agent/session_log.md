# SOCIAL MEDIA AGENT — Session Log
_Última actualización: 2026-05-04_

---

## ESTADO ACTUAL INFRAESTRUCTURA NEURONE SCF

### Completado ✅
- Meta Business Manager: configurado (verificación dominio pendiente)
- Facebook Page: creada "Neurone South & Central Florida"
- Instagram Business: @neuronescflorida creado, conversión a Business completa
- TikTok for Business: cuenta creada y convertida a Business

### En curso ⏳
- Instagram → Facebook Page: vinculación pendiente (Laura no lo ha logrado aún)
- Meta Developer App: Laura bloqueada — Meta pide crear App para generar System User tokens
- WhatsApp Business API: pendiente (requiere verificación y número dedicado)

### Pendiente ❌
- Meta System User Token para UNRLVL-Orchestrator (bloqueado por App requirement)
- TikTok Access Token para orchestrator
- Logos/assets en todas las cuentas
- Bio/perfil completo en Instagram y TikTok
- Verificación dominio neuronescflorida.com en Meta BM
- WhatsApp Business API setup completo

---

## LOG SESIONES

### 2026-05-04 — Laura (ops)

**Contexto:** Sam requiere Developer API tokens para automatización desde Orchestrator.

**Progreso:**
- Laura solicitó paso a paso para crear tokens por plataforma (Meta + TikTok)
- Meta está pidiendo crear una App en developers.facebook.com para poder generar System User tokens
- Instrucciones dadas: crear App tipo "Empresa" en developers.facebook.com → añadir productos WhatsApp Business Platform + Facebook Login + Instagram Basic Display → luego generar tokens
- Laura reporta que Meta pide App antes de agregar usuarios — bloqueado al final de sesión

**Próximo paso para Laura:**
1. Patricia va a developers.facebook.com
2. Crear App → tipo "Empresa" → nombre "Neurone SCF API"
3. Añadir productos: WhatsApp Business Platform + Facebook Login
4. Desde Configuración empresarial → System Users → crear UNRLVL-Orchestrator
5. Generar token con permisos: pages_manage_posts, ads_management, instagram_content_publish
6. Entregar a Sam por canal seguro (Signal/Bitwarden)

### 2026-04-18 — Laura (ops)
- Instagram Business: cuenta creada, conversión a Business completada
- TikTok for Business: cuenta creada desde web
- Vinculación Instagram→Facebook Page: pendiente

### 2026-04-17 — Laura (ops)
- Confirmado: Facebook Page ya existe
- Instrucciones para Instagram Business dadas
- Instrucciones para TikTok for Business dadas

### 2026-04-15 — Laura (ops)
- Meta BM: pasos 1-2 completados (nombre empresa + dirección)
- Verificación de dominio: sin acceso al website — diferida
- Decisión: continuar sin verificación de dominio por ahora

### 2026-04-10 — Laura (ops)
- Meta BM: instrucciones para completar configuración dadas

### 2026-04-06 — Laura (ops)
- TikTok Shop: requiere dirección comercial — diferido
- Opciones de dirección comercial vs residencial discutidas

### 2026-04-10 — Sam (admin)
- Estructura de 7 aliases de email definida (admin, ig, waba, tiktok, ads, support, hello)
- Estrategia de números telefónicos establecida

### 2026-03-23 — Sam (admin) [último Actualiza previo]
- ✅ Estructura aliases email (7 aliases)
- ✅ Estrategia números telefónicos
- ✅ Compliance Meta verificado
- ❌ Aliases en servidor
- ❌ Número comercial dedicado
- ❌ Setup redes sociales (todo)

---

## NOTAS TÉCNICAS

### Meta Developer App — Requerimiento
Meta exige una App registrada en developers.facebook.com para generar System User tokens con permisos de API. Sin esta App, no se pueden crear tokens para automatización.

**App a crear:**
- Nombre: "Neurone SCF API"
- Tipo: Empresa
- BM: Neurone SCF
- Productos: WhatsApp Business Platform + Facebook Login + Instagram Basic Display

### Tokens necesarios
| Plataforma | Token Type | Para qué |
|---|---|---|
| Meta | System User Token | Publicaciones, ads, Instagram |
| TikTok | Access Token | Campaigns, creatives |

### Canal seguro entrega tokens
Nunca por WhatsApp/email/Slack. Usar Signal (mensajes que se borran) o Bitwarden Send.
