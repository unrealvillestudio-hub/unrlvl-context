# AGENDA DE IMPLEMENTACIÓN — Agente Conversacional de Propietarios ForumPHs
_Creada: 2026-07-21 · v1.0 · Estado: MAPEADA, sin construcción iniciada_
_Destino sugerido en repo: `brands/ForumPHs/AGENDA_owner_agent.md`_

> **Qué es:** el reemplazo de FPHS-OPS. Un único agente de IA por WhatsApp para los propietarios
> de todos los PHs administrados: consulta de estado de cuenta, seguimiento de reportes y
> creación de incidencias. Descarga trabajo operativo repetitivo de las administradoras e Ivette.
>
> **Qué NO es:** un concierge abierto. Es un agente de **tareas acotadas** (requisito de producto
> Y de compliance con la política de IA de Meta 2026).

---

## MAPA DE FASES

```
FASE 0 ─── CIMIENTOS (bloqueante de todo)
  ├── 0.A  Normalización de contacto (teléfono + email)
  ├── 0.B  Declaración firmada de acceso (proceso + tabla)
  └── 0.C  Ingesta Sage 50 → mora/arrears/movimientos
                    │
FASE 1 ─── AGENTE SOLO-LECTURA ◄── depende de 0.A + 0.B (+0.C para estado de cuenta)
  ├── 1.A  Adaptador de canal (Twilio/WhatsApp)
  ├── 1.B  Motor de identidad (3 factores en cascada)
  ├── 1.C  Consulta: estado de reportes
  └── 1.D  Consulta: estado de cuenta ◄── depende de 0.C
                    │
FASE 2 ─── ESCRITURA + GESTIÓN ◄── depende de Fase 1
  ├── 2.A  Dashboard de tickets (deuda heredada de FPHS-OPS)
  ├── 2.B  Flag visible_to_owner en incident_updates
  └── 2.C  Creación de incidencias desde el agente
                    │
FASE 3 ─── PILOTO REAL
  ├── 3.A  Venezia Tower (happy path — 98% teléfono / 99% email)
  └── 3.B  PH Torres de Castilla (prueba de estrés — 48% teléfono / 99.7% email)
```

---

## FASE 0 — CIMIENTOS (bloqueante)

### 0.A — Normalización de datos de contacto
| Item | Detalle | Estado |
|---|---|---|
| 0.A.1 | Normalizar `owners.primary_phone`/`secondary_phone` → E.164 (`+507…`); separar campos multi-número (`6668-8215 / 6066-8937`) | 🔴 |
| 0.A.2 | Normalizar/validar `primary_email`/`secondary_email` (canal crítico: por ahí viaja lo sensible) | 🔴 |
| 0.A.3 | Clasificar números repetidos por patrón: un-dueño-muchas-unidades / gestor-muchos-titulares / personas-distintas-un-número | 🔴 |
| 0.A.4 | Reporte a administración: propietarios sin contacto / con contacto compartido | 🔴 |
| 0.A.5 | Normalizar códigos de unidad por PH (convención distinta en cada uno) | 🔴 |
| 0.A.6 | **Poblar `units.tower` de Lefevre** (Este/Oeste, derivable de `unit_code`: `01-E-A`→Este) — hueco de datos detectado 21-jul | 🔴 |

> **Principio:** la normalización NO edita destructivamente `owners`. El E.164 se persiste en la
> tabla de identidad; el dato crudo queda como rastro forense (principio DF "marca, no corrige").

### 0.B — Declaración firmada de acceso
| Item | Detalle | Estado |
|---|---|---|
| 0.B.1 | Diseñar el documento de declaración (números + identidades autorizadas + emails; disclosure y responsabilidad del propietario) — **con Ivette** | 🔴 |
| 0.B.2 | Tabla de identidad (`owner_channel_identity` o equivalente) + GRANT `service_role` en la MISMA migración | 🔴 |
| 0.B.3 | Modelar el rol del número: `titular` / `gestor` / (futuro) `residente` | 🔴 |
| 0.B.4 | Proceso operativo de onboarding **por PH, ejecutado por administración** (nunca autoservicio, sin canal alternativo) | 🔴 |
| 0.B.5 | Trace de accesos + informe mensual al titular real (mecanismo pasivo de detección de abuso) | 🔴 |

### 0.C — Ingesta Sage 50
| Item | Detalle | Estado |
|---|---|---|
| 0.C.1 | **Estandarizar el formato de export** con Ivette — detallado + **CON COLUMNA DE FECHA** (hoy no la trae; sin ella el historial no tiene cronología) | 🟡 en curso |
| 0.C.2 | Instructivo de export para administradoras (Reports & Forms → Accounts Receivable → Aged Receivables → Excel) | ✅ entregado 21-jul |
| 0.C.3 | Parser bilingüe ES/EN con esquema canónico interno | 🔴 |
| 0.C.4 | Config de parseo por PH (idioma, columnas, detallado/resumido, filtros de basura, prefijos de movimiento) | 🔴 |
| 0.C.5 | Normalizador `Customer ID` → `units.unit_code` (**validado 198/198**, 21-jul) | 🟢 regla definida |
| 0.C.6 | Poblar `arrears` / `mora_mensual` / `payments` (hoy **0 filas**) | 🔴 |
| 0.C.7 | Recolectar exports de los 5 PHs restantes y validar sus formatos | 🔴 |

**Reglas de parseo ya establecidas (21-jul):**
- **Fila = MOVIMIENTO** si tiene `Invoice/CM #`; **fila = SUBTOTAL** si tiene `Customer ID` sin `Invoice #`. Filas vacías y `Report Total` se descartan.
- **Venezia:** quitar prefijo `^\d-` (marca de nº de propietario) + quitar guiones → `07A`.
- **Lefevre:** quitar prefijo `^I-` (inmobiliaria, unidad en venta) + match literal → `01-E-A`.
- Preservar **saldos negativos** (son saldo a favor, no errores).
- Tipos de movimiento por prefijo de factura (`M-`/`MUL-`=multa, `REC-`=pago, `EXT-`=extraordinario) — **el diccionario varía por PH**.

---

## FASE 1 — AGENTE SOLO-LECTURA

| Item | Detalle | Depende de | Estado |
|---|---|---|---|
| 1.A.1 | Adaptador de canal abstracto (`ChannelAdapter`) — el cerebro no sabe si habla por WhatsApp o Telegram | — | 🔴 |
| 1.A.2 | Integración Twilio + número dedicado ForumPHs | — | 🔴 |
| 1.B.1 | Factor 1: número → ¿está en alguna declaración? Si no, no accede | 0.A, 0.B | 🔴 |
| 1.B.2 | Factor 2: identidad — **pregunta abierta** ("¿quién habla?"), match silencioso, NUNCA ofrecer opciones | 0.B | 🔴 |
| 1.B.3 | Factor 3: propiedad — **siempre obligatorio para datos financieros**, incluso con sesión activa | 0.B | 🔴 |
| 1.B.4 | Matcher tolerante: nombre fuzzy con resolución única; propiedad con discriminador mínimo ("¿tu 1A de qué torre?") | 0.A.5 | 🔴 |
| 1.B.5 | Sesión unificada de 24h; expiración y reapertura re-validan | — | 🔴 |
| 1.C.1 | Consulta "¿en qué va mi reporte?" → estado desde `incidents` (+ etapa desde `incident_updates` cuando exista 2.B) | — | 🔴 |
| 1.D.1 | Consulta estado de cuenta → **entrega por email no-reply + CC ops@** | 0.C | 🔴 |
| 1.D.2 | "Entregado" = el CC llegó a ops@ | — | 🔴 |
| 1.E.1 | Encuadre de tareas acotadas (compliance Meta) — nunca "preguntame lo que quieras" | — | 🔴 |

---

## FASE 2 — ESCRITURA Y GESTIÓN

| Item | Detalle | Estado |
|---|---|---|
| 2.A.1 | **Dashboard de tickets** — deuda heredada de FPHS-OPS. Ver tickets + timer SLA + cambiar estado + escribir etapa | 🔴 |
| 2.A.2 | Permisos: Ivette/supervisión = todos los PHs; administradora = solo su PH | 🔴 |
| 2.A.3 | Usar los **SEIS** estados existentes (`abierto/en_proceso/pendiente_proveedor/resuelto/cerrado/cancelado`) — no inventar tres | 🔴 |
| 2.B.1 | **Agregar flag `visible_to_owner` a `incident_updates`** (NO existe; `notified_owner` no sirve como control de visibilidad) | 🔴 |
| 2.C.1 | Creación de incidencia desde el agente → `incidents` con `reported_via='whatsapp'`, `reported_by_type='propietario'` | 🔴 |
| 2.C.2 | Al registrar, informar al usuario cómo procede el asunto (seguimiento 24h aquí → luego email) | 🔴 |
| 2.C.3 | Aviso de resolución (decidir canal: email por defecto, por costo/compliance de WhatsApp fuera de ventana) | 🔴 |

---

## FASE 3 — PILOTO

| PH | Rol | Teléfono | Email | Estado |
|---|---|---|---|---|
| **Venezia Tower** | Happy path | 178/182 (98%) | 180/182 (99%) | 🔴 |
| **PH Torres de Castilla** | Prueba de estrés | 148/306 (48%) | 305/306 (99.7%) | 🔴 |

> Los 158 propietarios de Castilla sin teléfono **sí tienen email** — la regla "no registrado → administración"
> se prueba en volumen real, y el email da salida.

---

## DECISIONES ANCLADAS (no reabrir sin motivo)

| Decisión | Valor |
|---|---|
| Canal | WhatsApp vía **Twilio** → Cloud API al escalar |
| Usuarios | Propietarios primero · residentes después |
| Alcance | Solo-lectura primero · incidencias después |
| Identidad | **Declaración firmada**, concedida por administración, sin autoservicio ni canal alterno |
| Factores | Cascada 3 factores, **preguntas abiertas**, nunca ofrecer opciones |
| Sesión | 24h uniforme · **dato financiero re-confirma propiedad siempre** |
| Datos sensibles | Email no-reply + CC ops@ (traceable) · nunca en WhatsApp |
| Estado de cuenta | **Historial de movimientos**, no saldo (confirmado con Ivette) |
| Frontera | Parser = ingesta · el agente lee **limpio desde DB**, nunca toca xlsx |
| Seguimiento | El agente informa **ESTADO**, no novedades (hasta que exista 2.A/2.B) |
| Contabilidad | Centralización cloud **solo para PHs nuevos**, proyecto aparte, con salida limpia garantizada |

---

## RIESGOS Y PENDIENTES DE DECISIÓN

| # | Tema | Dueño |
|---|---|---|
| R1 | **Alcance del rol `gestor`** (número que representa N terceros) — el modelo de declaración lo disuelve, pero falta definir qué puede hacer | Sam + Ivette |
| R2 | **Columna de fecha** en el export estándar de Sage — sin ella no hay cronología | Sam + Ivette |
| R3 | Carga operativa del onboarding de declaraciones (~1,200 propietarios) | Sam + Ivette |
| R4 | Fin de la ventana gratuita de WhatsApp (1-oct-2026) → contemplar en costos | Sam |
| R5 | Twilio ya en uso para otro asistente → verificar aislamiento de cuenta/subcuenta ForumPHs | Sam |
| R6 | FPHS free tier auto-pausa ~7 días (mordió esta sesión) | Sam |
| R7 | Licencias Sage: 5 PHs comparten serial + Plan Level Expired | Ivette |

---

_ForumPHs · Agenda de implementación agente de propietarios · v1.0 · 2026-07-21_
