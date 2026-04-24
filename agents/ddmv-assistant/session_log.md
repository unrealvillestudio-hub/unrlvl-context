# session_log.md — AGENT-DDMV · Mi Asistente
_Última actualización: 2026-04-24_

---

## Novedades — 2026-04-24

### ✅ LIVE EN PRODUCCIÓN — WhatsApp Business propio activo

**Número WhatsApp Business:** `+1 (260) 270-1806`
**Business Portfolio:** Samuel Moreno Mendoza (Meta)
**WhatsApp Account:** Mi Asistente
**Webhook:** `https://ddmv-assistant.vercel.app/api/webhook` — CONECTADO

**Damaris registrada en Supabase:**
- Phone: `+50767146920`
- Name: Damaris
- Bot name: Mi Asistente
- welcomed: false (recibirá bienvenida en primer mensaje)

**Incidencias resueltas hoy:**
- Meta baneó 2 cuentas WA Business (UNREALville/Non-profit) — resuelto con portfolio personal Samuel Moreno Mendoza
- Body parser form-urlencoded corregido en webhook (Twilio envía form, no JSON)
- Vercel Hobby cron 1x/día reemplazado por Supabase Edge Function horaria
- Claude decía "no puedo hacer recordatorios" — corregido en system prompt con capacidades explícitas
- TWILIO_WHATSAPP_NUMBER corregido de sandbox a +12602701806

---

## Estado actual del sistema

### Infraestructura
| Componente | Estado | Detalle |
|---|---|---|
| Vercel | ✅ PRODUCTION | ddmv-assistant.vercel.app |
| Supabase XMMs | ✅ ACTIVO | puoybldykxqvhvtnwrld |
| Edge Function | ✅ v3 ACTIVA | send-reminders — corre cada hora |
| Twilio WA Business | ✅ CONECTADO | +12602701806 |
| Dashboard | ✅ ACTIVO | /api/dashboard |
| Webhook | ✅ ACTIVO | /api/webhook |

### Secrets configurados
**Vercel:** SUPABASE_URL · SUPABASE_SERVICE_KEY · ANTHROPIC_API_KEY · TWILIO_ACCOUNT_SID · TWILIO_AUTH_TOKEN · TWILIO_WHATSAPP_NUMBER · ADMIN_SECRET · CRON_SECRET

**Supabase Edge Function:** TWILIO_ACCOUNT_SID · TWILIO_AUTH_TOKEN · TWILIO_WHATSAPP_NUMBER · SUPABASE_SERVICE_ROLE_KEY · SUPABASE_URL

### Supabase XMMs — Tablas
- `conversations` — historial + perfil usuario (name, bot_name, welcomed)
- `medications` — medicamentos activos con horarios
- `appointments` — citas médicas con flags reminded_2days/1day/same
- `reminder_log` — log de recordatorios enviados
- `notification_settings` — config por usuario

---

## Funcionalidades activas

| Funcionalidad | Estado |
|---|---|
| Bienvenida personalizada por nombre | ✅ |
| Análisis fotos recetas (Claude Vision) | ✅ |
| Guardado medicamentos desde conversación | ✅ SAVE_MED tag |
| Guardado citas desde conversación | ✅ SAVE_APPT tag |
| Recordatorios medicamentos horarios exactos | ✅ Edge Function hourly |
| Recordatorios citas 2 días / 1 día / mismo día | ✅ 7am Panamá |
| Saludo mañana 9am Panamá | ✅ 5 variantes random |
| Recordatorio ejercicios mentales 10am Panamá | ✅ |
| Saludo tarde 6pm Panamá | ✅ 4 variantes random |
| Renombrar bot desde conversación | ✅ |
| Respuestas siempre en español | ✅ |
| Dashboard gestión completa para Sam | ✅ |
| Envío mensajes manuales desde dashboard | ✅ |
| Audio (notas de voz) | ⚠️ Responde pidiendo texto — Claude API no soporta audio |

---

## Pendiente

- Verificación negocio Meta (requiere UNRLVL constituido legalmente)
- Personalizar foto y descripción perfil WhatsApp Business en WhatsApp Manager
- Gimnasio Mental: añadir URL en mensaje de bienvenida/recordatorio ejercicios

---

## Contexto del proyecto

**Tipo:** WhatsApp Personal Care Agent
**Cliente:** Sam — uso personal/familiar
**Usuario final:** Damaris Mendoza (+50767146920) — Panamá
**Repositorio:** unrealvillestudio-hub/DDMV-Assistant
**Clasificación UNRLVL:** Producto replicable — primer deployment de SKILL-AB agent-builder

**Replicaciones previstas:**
- ForumPHs OPS WA — incidencias propietarios apartamentos (AGENT-FPH-OPS-WA)
- Patricia Osorio WA — atención clientas (AGENT-PO-WA)
- Clientes UNRLVL como producto ofertable

---

## Historial de versiones

| Fecha | Versión | Hito |
|---|---|---|
| 2026-04-24 | v1.0 | LIVE — WhatsApp Business propio activo |
| 2026-04-01 | v0.9 | Sandbox funcional — webhook, dashboard, Edge Function |
| 2026-03-31 | v0.1 | Proyecto iniciado — stack definido |
