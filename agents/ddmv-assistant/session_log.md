# session_log.md — AGENT-DDMV · Mi Asistente
_Última actualización: 2026-04-25_

---

## Novedades — 2026-04-25

### Flujos conversacionales proactivos (Versión B) — IMPLEMENTADO

**Nuevas tablas en Supabase XMMs:**
- `reminders` — recordatorios personales con fecha/hora exacta
- `conversation_flows` — estado de conversaciones con flujo activo
- `proactive_checks` — verificaciones proactivas programadas

**Lógica de auto-programación:**
El bot envía verificación → Damaris responde → bot resuelve → programa siguiente en 2-3 días aleatorios entre 9-11am Panamá → ciclo autónomo sin intervención externa.

**Tres tipos de verificación:**
- `medication` — "¿ya tomaste el X?" → si no, ofrece recordatorio en 30min
- `appointment` — "tienes cita el X, ¿es correcto?" → si no, elimina y pregunta por más
- `wellbeing` — "¿cómo estás hoy?" → conversación libre

**Sam como cuidador:**
- +34654246333 registrado con `role: caregiver`, `linked_phone: +50767146920`
- Puede crear recordatorios para Damaris desde su WhatsApp
- Puede disparar verificaciones inmediatas ("verifica las citas de Damaris")

**Primera verificación enviada:**
- Tipo wellbeing → programada y enviada 2026-04-25
- Ciclo proactivo activo desde hoy

### Fix de honestidad — IMPLEMENTADO
- System prompt incluye fecha/hora actual en Panamá
- Claude nunca promete recordatorios sin poder calcular la fecha exacta
- Regla explícita: si la fecha no está clara, preguntar antes de confirmar
- Origen: bot prometió un recordatorio que no pudo cumplir → corregido

### Vercel — Build Machine
- Todos los 37 proyectos cambiados de Turbo a Elastic por Sam
- Ahorro estimado: 37x en coste de build (~$0.0035 vs $0.128 por minuto)

### Edge Function send-reminders — v8 ACTIVA
- Procesa recordatorios personales cada hora (tabla reminders)
- Procesa verificaciones proactivas programadas (tabla proactive_checks)
- Crea conversation_flows al enviar cada verificación

---

## Estado actual del sistema

### Infraestructura
| Componente | Estado | Detalle |
|---|---|---|
| Vercel ddmv-assistant | ✅ PRODUCTION | deploy 2026-04-25 |
| Supabase XMMs | ✅ ACTIVO | 8 tablas activas |
| Edge Function send-reminders | ✅ v8 ACTIVA | corre cada hora |
| Twilio WA Business | ✅ CONECTADO | +12602701806 |
| Dashboard | ✅ ACTIVO | /api/dashboard |

### Tablas Supabase XMMs
- `conversations` — perfiles + historial (role, linked_phone)
- `medications` — medicamentos activos con horarios
- `appointments` — citas (reminded_2days/1day/same)
- `reminder_log` — log de recordatorios enviados
- `notification_settings` — config por usuario
- `reminders` — recordatorios personales ← NUEVA 2026-04-25
- `conversation_flows` — flujos con estado ← NUEVA 2026-04-25
- `proactive_checks` — verificaciones programadas ← NUEVA 2026-04-25

### Usuarios registrados
| Phone | Nombre | Rol | Linked |
|---|---|---|---|
| +50767146920 | Damaris | user | — |
| +34654246333 | Sam | caregiver | +50767146920 |

---

## Pendiente

- Verificación negocio Meta (requiere UNRLVL legal)
- Foto y descripción perfil WhatsApp Business
- package.json `engines: >=18` (Node warning cosmético — no urgente)
- Sección recordatorios en dashboard para Sam

---

## Historial de versiones

| Fecha | Versión | Hito |
|---|---|---|
| 2026-04-25 | v1.2 | Flujos proactivos B + fix honestidad + Elastic |
| 2026-04-24 | v1.1 | Fix webhook form-urlencoded + recordatorios personales |
| 2026-04-24 | v1.0 | LIVE — WhatsApp Business propio activo |
| 2026-04-01 | v0.9 | Sandbox funcional |
| 2026-03-31 | v0.1 | Proyecto iniciado |
