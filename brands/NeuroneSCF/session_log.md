# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba

---

## 2026-04-08 — DDMV-Assistant security + fixes (segunda parte sesión)

### CERRADO EN ESTA SESIÓN

#### Supabase XMMs — seguridad
- RLS habilitado en 5 tablas: `medications`, `appointments`, `conversations`, `reminder_log`, `notification_settings`
- Whitelist aplicado: solo `+50767146920` (mamá) y `+34654246333` (Sam) pueden acceder via anon/authenticated key
- Bot Twilio usa service_role → bypassa RLS automáticamente
- Zero alertas de seguridad ✅

#### DDMV-Assistant — whitelist webhook
- `api/webhook.js`: whitelist de números añadido antes de cualquier procesamiento
- Números autorizados: `whatsapp:+50767146920` y `whatsapp:+34654246333`
- Números no autorizados → respuesta TwiML vacía, silenciosa
- Deploy: `dpl_9i6ts5RrUY5FTxtDm3aD4kNEuv2s` ✅

#### DDMV-Assistant — correcciones sistema
- `lib/claude.js`: system prompt corregido — sección CAPACIDADES con recordatorios automáticos reales, sección IMPORTANTE que previene respuestas incorrectas sobre recordatorios
- `api/webhook.js`: WELCOME_MSG actualizado fiel al texto original de Sam · mensaje de audio cariñoso ("aún no soy tan inteligente 😜")
- `api/cron.js`: bug corregido (cron de ejercicio a las 10am nunca se ejecutaba) + 7 variantes de mensajes Gimnasio Mental incluyendo solicitud de puntaje
- `vercel.json`: añadido tercer cron a las 15:00 UTC (10am Panamá) para cubrir el recordatorio de ejercicio
- Deploy final: `dpl_A5BGESkteD5cfJiGCFBE1ejrQo9u` ✅ — zero errores

#### Twilio — número UNRLVL
- `+1 954 504 9384` encontrado disponible (área 954 Hollywood/Broward)
- Bloqueado por cuenta Trial (solo 1 número permitido)
- Pendiente: upgrade cuenta Twilio → comprar `+1 954 504 9384`
- A2P 10DLC: no necesario para recibir SMS (solo para enviar)

#### Proyecto duplicado detectado
- `xmms-ddmv-assistant` creado por error — mismo repo, sin env vars
- Pendiente borrar: Vercel → xmms-ddmv-assistant → Settings → Advanced → Delete Project

#### Estado DDMV-Assistant verificado (prueba real)
- Agente respondió correctamente en español a Damaris ✅
- Logs: 200 OK en POST /api/webhook ✅
- Número sandbox activo: `+14155238886` (join cada 72h requerido)

### PENDIENTE DDMV-Assistant
- Borrar proyecto `xmms-ddmv-assistant` en Vercel
- Renovar sandbox Twilio cada 72h (enviar `join <palabra>` al +14155238886)
- Upgrade cuenta Twilio → comprar `+1 954 504 9384` para UNRLVL
- Node.js Version → configurar 20.x en Project Settings de ddmv-assistant en Vercel

---

## 2026-04-08 — Pricing Calculator QA + Kit Architecture + Strategy Doc

### CERRADO — ver sesión anterior completa en log previo

### PENDIENTE NeuroneSCF (vigente)
- Precios reales por SKU + inventario real → PO debe confirmar
- Cargar 87 SKUs + 12 kits en Shopify
- Imágenes de kits desde BP_Product
- Landings de cada kit
- Configurar Shopify Payments (número de cuenta listo con Sam)
- Configurar POS Vizos Salón (Tap to Pay)
- Instalar UpPromote + crear links embajadoras
- Activar Shop Pay Installments + Afterpay
- copy_profile NeuroneSCF en Supabase (CopyLab Layer 13 vacío)
- Autorización marca Neurone US → bloquea lanzamiento
- Video PO Kit SOS → asset más urgente para TikTok
- BP_Brand_Context.md NeuroneSCF → crear
- Dominio Unreal>ille en Cloudflare + aliases email

---

## 2026-03-31 — DDMV-Assistant v1
### CERRADO — agente deployado, env vars configuradas, crons activos
