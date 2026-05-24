# session_log.md — ForumPHs
_Última actualización: 2026-05-24 · Claude Sonnet 4.6_

---

## SESIÓN 2026-05-24 — OPS Plan Definitivo + Documentos Legales + Emergency Protocol

### DECISIONES ESTRATÉGICAS FIJADAS (no reabrir)
- WhatsApp es el UI principal del propietario — sin app que descargar
- Pagos solo vía ACH desde Peachtree — sin OCR, sin registro manual
- 3 superficies: forumphs-ops (admin campo) · forumphs-resident (ADM Virtual WhatsApp) · forumphs-dashboard (IF desktop)
- Deadline implementación: JULIO 2026
- Mora: gracia hasta día 5, contador desde día 6
- Legacy clients sin tier — modelo nuevo solo para nuevos clientes
- Protocolo de Actuación = Anexo B del contrato (actualizable sin renegociar)
- Emergency Protocol = Anexo C del contrato
- ForumPHs sin tilde (marca, no palabra española)
- Ivette Flores: Directora General. Sam: co-fundador (por ahora sin título formal)

### Documentos generados esta sesión
1. `ForumPHs_OPS_Plan_v2_Ivette.docx` — Plan OPS v2 corregido (deadline jul 2026, WhatsApp UI, sin OCR, mora día 6, Ivette DG)
2. `ForumPHs_Contrato_Modelo_2026.docx` — Modelo de contrato base (12 cláusulas + Anexo A tiers)
3. `ForumPHs_Protocolos_Actuacion_v1.docx` — Manual de Protocolos Anexo B (8 secciones, todos □ para revisar con Ivette)
4. `ForumPHs_Emergency_Protocol_v1.docx` — Protocolo Emergencias Anexo C (24 tipos, 3 niveles, 334 párrafos)
5. `OPS_PLAN_DEFINITIVO.md` — Plan definitivo para context repo
6. `LOCAL_BRIDGE_PLAN.md` — Plan puente local (DaVinci Resolve + Affinity)

### 12 GAPS DEL CONTRATO (pendiente revisión legal antes de firmar)
1. Sin límite de responsabilidad (cap a 12 meses de honorarios)
2. Sin definición explícita de exclusiones/fuera de alcance
3. SLA sin consecuencias por incumplimiento
4. Sin cláusula de fuerza mayor (incluyendo cambios de política WhatsApp/Meta)
5. Sin autoridad de gasto de emergencia definida
6. Sin SLA propio para la plataforma tecnológica (uptime)
7. Sin cláusula de propiedad de datos al terminar el contrato
8. Sin cláusula de no-solicitud de personal
9. Terminación anticipada asimétrica (no define "causa justa" del cliente)
10. Sin mecanismo de mediación previa obligatoria antes de tribunales
11. Propiedad del número de WhatsApp Business no definida
12. Sin cláusula de modificación formal (quién puede modificar, cómo)
→ Necesita revisión de abogado panameño especializado en derecho comercial + PH

### Tablas Supabase creadas esta sesión (tajuoqdbnsnzkhyqvdgs)
- `common_areas` (13 cols) — áreas sociales reservables por edificio
- `reservations` (22 cols) — reservas áreas + mudanzas + índice conflicto horario
- `contracts` — contrato completo con contract_text para interpretación por Claude
- `emergency_events` (24 tipos, 3 niveles) — log inmutable + función append_emergency_action

### DB LIMPIEZA REALIZADA
- Eliminado: payments registro prueba $19.99 (23 mayo)
- Eliminado: informes registro borrador Venezia Tower (21 mayo)
- DB ahora solo tiene: buildings(8), units(1560), owners(1265), owner_units(1278), vehicles(14), pets(15), incident_categories(16)

### WHATSAPP ADM VIRTUAL — Arquitectura (solo para Sam)
- Mensaje WhatsApp → Edge Function → Claude API (system prompt con datos propietario frescos de DB)
- Memoria persistente: tabla `wa_sessions` (último tema, estado sesión, acciones pendientes)
- NO guardar historial completo — costoso e innecesario
- Sesión activa = últimos 10 turnos en memoria
- Contexto persistente = datos frescos inyectados en system prompt
- Log completo en `communications` para auditoría

### PENDIENTES INMEDIATOS FORUMPHS (en orden de prioridad)
1. 🔴 Commit 3 API routes faltantes en forumphs-ops: buildings + tracker + payments
2. 🔴 Reunión Sam + Ivette: revisar OPS Plan v2 + Contrato + Protocolos punto por punto
3. 🔴 Datos IF Ene–Abr 2025: mora_mensual + payments + eeff_preliminar vacíos
4. 🔴 Speaks ANTHROPIC_API_KEY en Supabase Secrets tajuoqdbnsnzkhyqvdgs
5. 🟡 Revisión legal del contrato (abogado panameño, comercial + PH)
6. 🟡 Registro field_staff (admins de campo con PIN y edificios asignados)
7. 🟡 Definir número(s) WhatsApp Business por PH
8. 🟡 Completar □ placeholders en Protocolo de Actuación con Ivette
9. 🟡 Confirmar/ajustar matriz de niveles Emergency Protocol con Ivette
10. 🟡 Voice genome v1.0 — entrevista estructurada con Ivette

### PARA EL PRÓXIMO CHAT (LEER ANTES DE EMPEZAR)
El próximo chat debe:
1. Generar el informe explicativo para Ivette — por qué los documentos (Contrato, Protocolo, Emergency Protocol) son relevantes en esta etapa, qué es el concepto "Armored/Bullet-proof", y que su alcance y uso definitivo depende de su aprobación
2. Tener listo el contrato bullet-proof v2 incorporando los 12 gaps identificados — listo para upgrade tan pronto Ivette apruebe el plan
3. Llevar el scope completo de OPS actualizado — todo lo de esta sesión (reservas, mudanzas, cron mora, WhatsApp UI, emergency protocol, contratos) integrado en un único documento de referencia para desarrollo
4. Confirmar con Ivette los □ placeholders del Protocolo de Actuación
5. Definir campos de Emergency Protocol que Ivette debe descartar o confirmar (especialmente los niveles 2 y 3)

### Estado Supabase ForumPHs (tajuoqdbnsnzkhyqvdgs)
| Tabla | Filas | Estado |
|---|---|---|
| buildings | 8 | ✅ completo |
| units | 1,560 | ✅ unit_code, tower, floor, metraje |
| owners | 1,265 | ✅ nombre, cédula, email, teléfono |
| owner_units | 1,278 | ✅ relación propietario↔unidad |
| mora_mensual | 0 | ❌ esperando datos IF |
| payments | 0 | ❌ esperando datos IF |
| monthly_kpis | 0 | ❌ |
| eeff_preliminar | 0 | ❌ |
| common_areas | 0 | ✅ tabla creada |
| reservations | 0 | ✅ tabla creada |
| contracts | 0 | ✅ tabla creada |
| emergency_events | 0 | ✅ tabla creada |

### SMA — NSCF
Laura + Paty avanzando con setup de redes sociales (Meta BM, Instagram Business, TikTok for Business, WABA). Bloqueadas en creación de Meta App para generar tokens de API para UNRLVL Orchestrator. Pendiente: resolver verificación de teléfono en developers.facebook.com.
