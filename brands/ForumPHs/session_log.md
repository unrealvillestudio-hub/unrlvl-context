# Session Log — ForumPHs
_Ivette Flores · Sam (socio) · Actualizado: 2026-04-16_

---

## 2026-04-16 — FPHs-OPS: Schema + Spec funcional completa

### Decisiones clave

**MUNILY desplazado:** FPHs-OPS será el sistema único de campo. Objetivo declarado explícitamente en sesión.

**Primer módulo a construir: COBROS** (por encima de OPS Diarias e Incidencias). Mayor impacto en objetivo 12 PHs 2026. Cobro automatizado + análisis FPHs mejora liquidez de edificios actuales y es argumento de venta en asambleas.

**Arquitectura confirmada:**
- Supabase UNRLVL → labs + crm.* marketing
- fph.* → sistema operativo ForumPHs (hoy en Supabase UNRLVL, migrable)
- 3 instancias lógicamente separadas

**App:** web app responsive mobile-first con guardarrailes estrictos de captura. No tablet obligatoria. El admin ejecuta protocolos — la app controla el qué/cómo/cuándo.

**Canal propietarios:** WhatsApp agent (AgentLab) — identifica al propietario por número, califica incidencia, crea ticket, informa avances.

### Schema fph.* en Supabase — ACTIVO
22 tablas en schema `fph.*` del Supabase principal.
- 6 edificios sembrados (faltan 2 por confirmar con Ivette — documento menciona 8 PHs activos)
- Categorías de incidencias corregidas a 3 niveles (Urgente/Prioritario/Común) según sesión Marzo 2026
- 16 categorías con SLA automático por trigger
- 8 tipos de obligaciones legales (Ley 284, DGI, Bomberos, Municipal)
- 4 templates de comunicación con campo `fph_analysis`
- Triggers activos: mora automática, SLA incidencias, updated_at

### FPHSOPS_SPEC.md creado
Documento de especificación funcional completa: 4 módulos + 2 capas transversales.
Módulos: OPS Diarias · Cobros · Comunicaciones · Incidencias
Capas: Informe Mensual 360° · Motor Claude (análisis FPHs en cada entregable)

### Pendiente de Ivette
- Datos 8 edificios: dirección, unidades, cuota mensual
- Lista propietarios por edificio: nombre, email, WhatsApp, unidad, estado mora
- Obligaciones legales recurrentes específicas por edificio

### Pendiente decisión estratégica (Sam + Ivette)
- ¿Quién paga el desarrollo? (inversión sociedad vs costo ForumPHs)
- ¿Es replicable a otras administradoras LATAM? (cambia alcance y valor)

---

## 2026-04-15 — Document Factory plan documentado
DOCUMENT_FACTORY_PLAN.md creado. Zip Extractor → normalizer en tools/.
Schema JSON EEFF v1.0 pendiente esta semana.

---

## 2026-03-25 — Sesión estratégica con Ivette
Plan estratégico v3.0 · Roadmap tecnológico · ForumPHs Speaks testing
8 PHs activos · Meta: 12 PHs 2026 · 20 PHs 18 meses
