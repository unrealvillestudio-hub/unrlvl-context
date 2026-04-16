# FPHs-OPS — Especificación Funcional v1.0
_Creado: 2026-04-16 · Sesión Sam + Ivette Flores_
_Vive en: `brands/ForumPHs/FPHSOPS_SPEC.md`_

---

## QUÉ ES

FPHs-OPS es el sistema operativo de gestión de Propiedades Horizontales de ForumPHs. Objetivo estratégico: **desplazar MUNILY** como herramienta de campo y convertirse en la plataforma única que unifica operaciones, comunicaciones, cobros, incidencias e informes. Es infraestructura que construye UNRLVL y opera ForumPHs.

No es un CRM de marketing. Es un sistema operativo interno del cliente, relevante para el crecimiento de ForumPHs hacia 12 PHs en 2026 y 20 PHs en 18 meses.

---

## ARQUITECTURA DE TRES INSTANCIAS

```
Supabase UNRLVL (amlvyycfepwhiindxgzw)
  └── public.*   Labs, blueprints, agentes, profiler
  └── crm.*      CRM de marketing multi-cliente (UNRLVL controla)
                 ForumPHs como org = leads de Speaks + marketing

Supabase FPHs-OPS (migración futura — hoy en fph.*)
  └── fph.*      Sistema operativo de gestión de PHs
                 22 tablas · propietario del dato: ForumPHs/Ivette
                 UNRLVL construye, ForumPHs opera
```

---

## USUARIOS DEL SISTEMA

| Usuario | Acceso | Qué hace |
|---|---|---|
| Admin de campo | Web app mobile-first | Checklists, tickets, incidencias, fotos |
| Ivette Flores | Dashboard gestión | Supervisión, escaladas, cobros, aprobaciones |
| Sam / UNRLVL | Dashboard calidad | Anomalías de proceso, no de operación diaria |
| Propietario PH | WhatsApp agent | Reporta, consulta estado, recibe informes |

---

## MÓDULO 1 — OPS DIARIAS (PRIORIDAD 2)
_Objetivo: aumentar capacidad instalada de los administradores de campo_

### Flujo del admin cada día
```
Apertura de turno
  → App presenta checklist del día para ese edificio (secuencia fija)
  → Cada ítem crítico requiere foto tomada desde la app (no galería)
  → Foto lleva: timestamp, admin, edificio, área — automático
  → Sin foto = no avanza. Sin checklist completo = no cierra turno.

Durante el día
  → Apertura de tickets desde la app cuando surge incidencia
  → Actualización de estado de tickets abiertos
  → Recepción de tickets creados por el agente WhatsApp de propietarios
  → Supervisión de trabajos de proveedores activos

Cierre de turno
  → Segundo recorrido documentado
  → Reporte diario (máximo 8 minutos — diseño forzado)
  → Confirmación de cierre de accesos
```

### Guardarrailes y protocolos — filosofía de diseño
La app controla el qué, el cómo y el cuándo. El admin ejecuta, la app verifica.
- **Flujo secuencial obligatorio** — no hay pasos opcionales ni orden libre
- **Captura de fotos in-app únicamente** — cámara abre desde la app, no se sube desde galería
- **Metadatos automáticos** — timestamp, GPS, nombre del admin, edificio asignado
- **Sin datos sueltos** — WhatsApp personal no es canal de trabajo, la app es el único canal
- **Sin "lo subo después"** — la evidencia se captura en el momento o no cuenta
- El admin no decide qué registrar: el protocolo ya lo define, él ejecuta

### Datos que captura el sistema
- Estado de áreas comunes por inspección (con fotos)
- Tiempos de respuesta reales por ticket
- Proveedores activos, trabajos en curso, costos
- Incidencias reportadas vs resueltas vs escaladas
- Cumplimiento de rutinas (% completado por edificio/semana)

---

## MÓDULO 2 — GESTIÓN DE COBROS (PRIORIDAD 1 — ARRANCA PRIMERO)
_Mayor impacto en objetivo 12 PHs 2026. Cobro automatizado + análisis FPHs._

### Flujo completo de cobros
```
Día 1 del mes
  → Generar automáticamente registro de pago pendiente por unidad
  → Email/WA recordatorio preventivo (15 días antes del vencimiento)

Día de vencimiento (ej. día 5)
  → Sistema marca automáticamente las unidades que no han pagado
  → Genera arrears activos en fph.arrears

Día 6 (1 día de mora)
  → Primer aviso automático al propietario:
    "Su cuota de mantenimiento de [período] por $[monto] se encuentra pendiente.
     [fph_analysis: historial del propietario, proyección de impacto en el edificio]"

Día 15 (10 días de mora)
  → Segundo aviso, tono más formal
  → Si >2 meses: copia automática a Junta con análisis de impacto financiero del edificio

Mes 2 de mora
  → Aviso legal formal
  → Escalada automática a Ivette para decisión de acción legal

Conciliación bancaria
  → Identificar pagos recibidos → cruzar con morosos
  → Si pago de cuenta morosa:
    Email al propietario: "Recibimos su pago de $[X] con fecha [Y].
    Su cuenta queda: [estado]. [fph_analysis: proyección actualizada del edificio]"
```

### El diferenciador FPHs en cada comunicación
Cada aviso lleva `fph_analysis` generado por Claude:
- No solo "usted debe $X"
- "Usted debe $X. Esto representa el Y% de la mora total del edificio. Si no se regulariza antes de [fecha], el edificio no podrá cubrir [obligación específica]. ForumPHs proyecta..."
- Ninguna administradora en Panamá entrega esto.

---

## MÓDULO 3 — COMUNICACIONES BACK-OFFICE (PRIORIDAD 2)
_Cero comunicaciones manuales rutinarias. 100% trazables._

### Triggers automáticos
| Trigger | Destino | Canal | Adjunto | fph_analysis |
|---|---|---|---|---|
| Conciliación bancaria aprobada | Junta + morosos | Email | PDF conciliación | Sí |
| EEFF firmados por contadora | Junta + propietarios | Email | PDF EEFF | Sí — evaluación profesional |
| Factura proveedor aprobada (>umbral) | Junta | Email | PDF factura | Opcional |
| Incidencia resuelta | Propietario afectado | WA | Foto evidencia | No |
| Obligación legal vence en 30 días | Admin + Junta | Email | — | No |
| SLA vencido sin resolver | Admin + Ivette | WA | — | No |
| Día 1 de cada mes | Cada propietario | Email | Resumen cuenta individual | Sí |

---

## MÓDULO 4 — INCIDENCIAS (PRIORIDAD 2)

### 3 niveles de ticket (según sesión estratégica Marzo 2026)

| Nivel | SLA primera respuesta | Categorías |
|---|---|---|
| **Urgente** | 2–4 horas | Ascensor, inundación, corte eléctrico, seguridad, bomba agua |
| **Prioritario** | 24–48 horas | Filtración, iluminación, acceso, conflicto, plomería |
| **Común** | 3–5 días | Mejoras, consultas, mantenimiento preventivo, ruido, limpieza |

### Canal de propietarios — Agente WhatsApp especializado
```
Propietario escribe al número de WhatsApp de FPHs
  → Agente identifica: fph.owners.whatsapp = número del propietario
  → Sabe: nombre, unidad, edificio, historial de tickets, estado de mora
  → Guía la calificación en 2-3 preguntas
  → Crea ticket en fph.incidents con categoría y SLA automático
  → Envía número de caso y tiempo estimado de resolución
  → Notifica al admin responsable del edificio

Durante la gestión
  → Admin actualiza estado en la app → agente notifica al propietario en WA
  → Propietario puede consultar estado de su ticket en cualquier momento
  → Agente informa avances sin intervención manual

Al resolver
  → Notificación automática al propietario con resolución + evidencia
  → Ticket se cierra en sistema y aparece en informe mensual
```

**Por qué tickets y no solo conversaciones:** el ticket es el objeto que conecta propietario (WA) → admin (app) → Ivette (escalada) → proveedor → informe mensual. Sin ticket no hay trazabilidad, sin trazabilidad no hay 360°.

---

## CAPA TRANSVERSAL 1 — INFORME MENSUAL 360°
_El entregable premium. Diferenciador absoluto. Se genera el día 5 de cada mes._

### 8 secciones
1. **Resumen ejecutivo** — 1 página, para leer en 2 minutos
2. **Situación financiera** — ingresos, egresos, balance, comparativa meses anteriores
3. **Estado de mora** — detalle + análisis FPHs: tendencia, proyección, impacto en liquidez
4. **Incidencias del mes** — abiertas, cerradas, tiempos de respuesta, SLA compliance
5. **Cumplimiento de rutinas** — % tareas completadas, gaps por edificio
6. **Obligaciones legales** — semáforo de cumplimiento y próximas fechas
7. **Actividad de proveedores** — facturas, costos, evaluación de calidad
8. **Análisis FPHs + Proyecciones** — la firma profesional en cada informe

### Distribución
- **Junta Directiva:** versión ejecutiva completa (8 secciones)
- **Cada propietario:** su cuenta individual + resumen del edificio (secciones 1, 2, 3 adaptadas)

---

## CAPA TRANSVERSAL 2 — MOTOR CLAUDE (DIFERENCIADOR TÉCNICO)

Claude como motor de análisis en cada entregable relevante:
- Conciliación → `fph_analysis` en lenguaje ejecutivo no contable
- Mora → proyección de impacto en el edificio + recomendaciones accionables
- Informe mensual → síntesis 360° + análisis de patrones (ej: "el ascensor ha fallado 3 veces este trimestre — se recomienda evaluación preventiva")
- Incidencias → detección de patrones por edificio/categoría

---

## SUPABASE — SCHEMA fph.* (22 TABLAS)

Activo en `amlvyycfepwhiindxgzw` bajo schema `fph.*`.
Migrable a proyecto Supabase propio cuando ForumPHs escale.

| Tabla | Descripción |
|---|---|
| `buildings` | 6 edificios activos (Luxor, Venezia, Torres de Castilla, Plaza España, Lefevre 75, Los Álamos) |
| `units` | Unidades por edificio |
| `owners` | Propietarios (email, WhatsApp, preferred_channel) |
| `owner_units` | Propietario × unidad (puede tener varias) |
| `juntas` | Junta directiva por edificio |
| `junta_members` | Miembros por junta |
| `payments` | Registro de pagos con trigger días de mora |
| `arrears` | Mora activa por unidad (estado tiempo real) |
| `legal_obligation_types` | Tipos: Ley 284, DGI, Bomberos, Municipal |
| `legal_obligations` | Instancias por edificio/período/estado |
| `incident_categories` | 16 categorías · 3 niveles · SLA automático |
| `incidents` | Tickets con `due_at` calculado por trigger |
| `incident_updates` | Historial de cada ticket |
| `providers` | Proveedores aprobados por categoría |
| `provider_invoices` | Facturas vinculadas a incidencias o edificio |
| `bank_reconciliations` | Conciliaciones mensuales con campo `fph_analysis` |
| `bank_transactions` | Transacciones cruzadas con pagos/facturas |
| `communication_templates` | Templates con variables y flag `fph_analysis_included` |
| `communications_log` | Registro trazable de cada comunicación enviada |
| `task_templates` | Plantillas de rutinas recurrentes por edificio |
| `tasks` | Instancias de tareas con evidencia y compliance |
| `monthly_reports` | Informes 360° por edificio/período |

**Triggers activos:**
- `calc_days_late` — mora automática en pagos
- `set_incident_due` — SLA calculado al crear incidencia
- `set_updated_at` — en todas las tablas principales

---

## PENDIENTES PARA ARRANCAR

### De Ivette (datos para poblar la DB)
- [ ] Datos de los 8 edificios: dirección, número de unidades, cuota mensual
  _(documento menciona 8 PHs; yo sembré 6 — faltan 2 por confirmar)_
- [ ] Lista de propietarios por edificio: nombre, email, WhatsApp, unidad
- [ ] Estado actual de mora por edificio
- [ ] Estructura de cuotas específicas (pueden diferir entre unidades)
- [ ] Obligaciones legales recurrentes específicas de cada edificio

### Decisiones estratégicas pendientes (Sam + Ivette)
- [ ] ¿Quién paga el desarrollo? (inversión sociedad vs costo ForumPHs)
- [ ] ¿Es replicable a otras administradoras en Panamá/LATAM? (cambia el alcance y el valor)
- [ ] Confirmación: FPHs-OPS desplaza MUNILY completamente ✅ (confirmado sesión 2026-04-16)

### Primer módulo a construir: COBROS
Impacto directo en objetivo 12 edificios 2026. Cobro automatizado + análisis FPHs mejora la liquidez de los edificios existentes y se convierte en argumento de venta en cualquier asamblea.

---

## NOTAS DE DISEÑO DE APP

**Web app responsive mobile-first.** No tablet obligatoria — si el diseño está bien hecho para móvil, funciona en campo. El skill `ui-ux-layer` generará UI suficientemente simple para móvil con guardarrailes estrictos.

**Filosofía del diseño:** La app no es un formulario. Es un protocolo de ejecución. El admin no decide qué hacer — la app le dice qué toca ahora. Cada dato requerido se captura en el momento correcto, de la manera correcta, sin alternativas.

**Canal propietarios:** WhatsApp agent (AgentLab) — no portal web, no app nativa. WA ya lo tienen instalado, ya lo usan, la fricción es cero.
