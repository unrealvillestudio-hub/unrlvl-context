# ForumPHs · Session Log

_Última actualización: 2026-05-09_

---

## ESTADO ACTUAL

**Document Factory v1.5 — READY FOR BUSINESS** ✅
**ForumPHs Speaks — LIVE** ✅ (speaks.forumphs.com)
**Propuesta PH Star & Herald — ICR READY** ✅ (ForumPHs_Propuesta_StarHerald_2026.html)
**Suite BI PH Star & Herald — EMBEBIDO EN PROPUESTA** ✅

---

## SESIÓN 2026-05-08/09 — Sesión Estratégica ForumPHs v3

### CONTEXTO DE SESIÓN
Sesión larga (8–9 Mayo 2026). Ivette Flores (IF) como GM operativa y abogada.
Sam como director de sistemas y estrategia. Objetivo: propuesta comercial PH Star & Herald
(presidenta Mayra Paredes) + documento de decisión de servicios/tarifas + roadmap tech stack.

---

### ENTREGABLES GENERADOS ESTA SESIÓN

#### 1. Propuesta Comercial PH Star & Herald
**Archivo:** `ForumPHs_Propuesta_StarHerald_2026.html`
**Estado:** ICR PASS · Listo para IF → Mayra Paredes
**Características:**
- Single-page HTML con BI financiero embebido (view switcher JS)
- 6 secciones: Quiénes somos · Diagnóstico · Servicios · Compromisos · La Propuesta · Cierre
- Content Pipeline COMPLETO aplicado: H+AIFE + PSYCHO + CRO + QA
- Datos reales del edificio (EEFF Ene–Mar 2026)
- CTAs: WhatsApp directo +50766866775 (wa.me animado verde) + iframe BI
- PSYCHO triggers activos: loss aversion (mora $5,045↑) · authority (IF única abogada Ley 284) · identity (Mayra) · social proof (8 PHs)
- Sticky nav propuesta · sticky header BI · animated nav buttons desde apertura
- Fee: $800/mes · con mora 29% crítica → $800 + $250 recargo = $1,050/mes
- Frase insignia nueva: **"Especialistas en lo único que importa: tu patrimonio."**

#### 2. Suite BI PH Star & Herald (embebida)
**Archivo:** `ForumPHs_BI_StarHerald_2026.html` (standalone backup)
**6 paneles:** Resumen Ejecutivo · Ingresos & Gastos · Cartera Morosa · Estructura de Costos · Ingreso Ancla · Hallazgos & Plan
**Datos reales:** EEFF Ene–Mar 2026 · saldo $23,713 · superávit $4,051 · mora $5,045

#### 3. Documento de Decisión Servicios & Tarifas v4
**Archivo:** `ForumPHs_Documento_Decision_Servicios_2026.html`
**Estado:** Para revisión IF + Sam ANTES de presentar a Mayra
**Contenido:**
- Costos reales EEFF (IF: $1,200–$1,700/mes, no $4,800 — corrección crítica)
- Stack tecnológico: $170/mes actual → $280–300 post-sprints
- 3 tiers: Esencial (50–150 uds) · Profesional (150–280 uds) · Élite (280+ uds)
- Mismos servicios base en todos los tiers, diferencia en escala
- Protocolo mora 3 fases con flujo de comunicaciones completo
- Modelo recargo fijo por tier (no % de mora): 0–10%=$0 · 10–20%=+$150/200/300 · 20–35%=+$250/350/500 · >35%=+$400/550/750
- 4 decisiones pendientes de IF (obligatoriedad asambleas · límite F-II · precio base Esencial · m² S&H)

#### 4. Tech Stack Roadmap 2026
**Archivo:** `ForumPHs_TechStack_Roadmap_2026.html`
**5 sprints (~10 semanas):**
- S1 (12–23 May): Speaks 100% · Supabase schema · DF módulo BI
- S2 (26 May–6 Jun): Tracker mora V0 (ACH) + V1 (Claude Vision foto recibo)
- S3 (9–20 Jun): Portal Propietarios (Next.js + Supabase Auth)
- S4 (23 Jun–4 Jul): Klaviyo + Twilio WA + Biblioteca Comunicaciones 12 templates
- S5 (7–18 Jul): Calendario mantenimientos OPS + Piloto S&H + Runbook onboarding

---

### DECISIONES ESTRATÉGICAS TOMADAS

**Modelo de negocio:**
- Star & Herald: excepción estratégica a $800/mes (calculadora da $3,091–$7,412)
- Relación compensa si Mayra refiere 1–2 PHs reales en 12 meses
- Escenario mora 29% crítica: $800 + $250 recargo = $1,050/mes primer período
- NO crear tier Nano ahora — Casco Antiguo es estrategia futura separada con equipo dedicado

**Protocolo de mora:**
- FPHs gestiona hasta Fase II (incluida en tarifa)
- Fase III: JD decide lo judicial · FPHs aplica recargo fijo + 10% honorario éxito
- 50h representación legal IF absorbidas en honorario de éxito Fase III
- La gestión extrajudicial (carta IF) es el diferenciador más potente del mercado

**Informe mensual:**
- Entregado día 5 · preliminar generado por DF · disclaimer CPA
- Marlene firma después · promesa no se rompe
- 4 inputs: estado de cuenta bancario · ACHs · recibos propietarios · mora anterior (Supabase)

**Supabase ForumPHs:**
- Proyecto separado (datos de clientes no mezclar con UNRLVL)
- Free tier con cron ping → upgrade Pro cuando S&H firme ($25/mes)
- Custom MCP connector = Sprint pendiente post-launch NSCF (reutilizable multi-tenant)
- Schema base 8 tablas: phs · propietarios · pagos · mora_mensual · informes · activos · comunicaciones · mantenimientos

**Stack tecnológico:**
- $170/mes actual (Console.Claude ~$80 + Claude.ai Max5 $100 UNRLVL + Cloudflare $5 + misc $40) — tachado en docs
- $280–300/mes post-sprints (+ Supabase Pro $25 + Vercel $20 + Klaviyo $45 + Twilio $35)
- Stack no escala con PHs excepto Console.Claude por demanda

**Content Pipeline (aplicado a propuesta):**
- H+AIFE: eliminados patrones IA (forced contrasts · rule of three · vocabulario genérico)
- PSYCHO: loss aversion · authority · identity · social proof
- CRO: hook=consecuencia patrimonial → benefit=anticipación → proof=datos reales → differentiator=legal+tech → CTA=reunión
- QA: PASS · ICR Ready

**Frases insignia ForumPHs (nuevas):**
- "Construiste tu patrimonio. Nosotros le construimos un sistema." (tagline principal — ya existía)
- "Especialistas en lo único que importa: tu patrimonio." (nueva — aprobada en sesión)

---

### DECISIONES PENDIENTES (IF debe responder antes de presentar a Mayra)

1. ¿La asistencia a asambleas ordinarias es obligatoria para el administrador según Ley 284?
2. ¿Cuántas cartas extrajudiciales (F-II) puede IF firmar/mes dentro del honorario base?
3. ¿$1,200/mes es precio correcto para Esencial en mercado panameño actual?
4. ¿Cuántas unidades y m² vendibles tiene realmente Star & Herald? (documentos SEACO: 25 · Google: 42)
5. ¿Cuál es el desglose de "Honorarios servicios + facturas" ($500 Ene / $1,437 Feb)?

---

### HALLAZGOS STAR & HERALD (para IF antes de la reunión)

- Saldo 31 Mar 2026: $23,713 · Superávit Ene–Mar: $4,051
- Alquiler antena: $1,869.56/mes fijo (activo ancla — 2.34× tarifa admin)
- Mora bruta Mar: $5,045 · Crítica: Apto 10 ($1,442 · 7m) · Apto 20 ($1,722 · 15m) · Apto 14 ($1,220 · 15m)
- Fondo de reserva Art. 94 Ley 284: $0 (incumplimiento legal)
- Contrato antena: sin revisión legal documentada reciente
- **Calculadora honorario**: ~$3,091 (conservador 2,000 m²) a $7,412 (estimado real ~4,800 m²)
- $800 = 10–26% del precio real de calculadora → excepción estratégica documentada

---

### APRENDIZAJES TÉCNICOS (esta sesión)

**Merge HTML propuesta + BI:**
- CSS del BI debe scoped bajo `#bi-view .clase` para no colisionar con propuesta
- `#bi-view { display: none }` y `#propuesta-view { display: block }` DEBEN estar en CSS `<head>` — sin esto ambos divs visibles al cargar (divs son display:block por defecto)
- `overflow-y: auto` en el div wrapper rompe `position: sticky` de hijos — el sticky es relativo al scrolling ancestor, no al viewport
- Los paneles del BI deben estar DENTRO del `#bi-view` div — un `</div>` prematuro los deja fuera sin CSS scoped ni display:none
- Chart.js: inicializar con `setTimeout(initBICharts, 80)` cuando el div cambia a display:block — el canvas debe estar visible antes de que Chart.js dibuje
- JS naming: renombrar `show()` del BI a `showBIPanel()` para evitar colisión con `showView()`

**CSS:**
- `position:sticky` requiere que NINGÚN ancestro tenga `overflow: auto/scroll/hidden`
- Para dark sections con texto claro: usar `!important` en overrides de sección específica
- BI nav `animation: pulse infinite` desde carga + `animation: none` en hover/active da el efecto de "invitación a hacer click"

---

## HISTORIAL DE SPRINTS

| Sprint | Fecha | Status |
|---|---|---|
| FPH-013 ZIP Extractor initial | 2026-04-14 | ✅ |
| FPH-014 UX Pipeline v1.0 | 2026-04-14 | ✅ |
| FPH-015 BOLD_RULE v2 Ivette canonical | 2026-04-14 | ✅ |
| FPH-016 ZIP images + ImageRun | 2026-04-17 | ✅ |
| FPH-017 Agenda cross-ref + 206/206 fix | 2026-04-22 | ✅ |
| FPH-018 DOCX embedded images extractor | 2026-04-22 | ✅ |
| FPH-019 413 fix — image separation + compression | 2026-04-22 | ✅ |
| FPH-020 Propuesta S&H + BI + Docs de decisión | 2026-05-08/09 | ✅ ICR READY |

---

## PRÓXIMOS PASOS (prioridad)

**IF (antes de presentar a Mayra):**
1. Revisar propuesta StarHerald — aprobar y pasar a Mayra Paredes
2. Responder 5 decisiones pendientes del documento de servicios/tarifas
3. Confirmar m² y unidades reales de Star & Herald
4. Confirmar desglose "Honorarios servicios + facturas" del EEFF
5. Reservas laborales corrientes $1,014.89/mes — INICIO VENCIDO (comprometido 1 Mayo)
6. Marlene — mapa pasivo laboral individual (vencido)
7. Apertura 4 cuentas bancarias pendiente

**Sam (sprints técnicos):**
1. Speaks — 2 días para cerrar 10% final (S1)
2. Supabase forumphs-db: crear en cuenta IF (org: qybmxrjwrwurdgddgbnx) + SQL schema
3. Document Factory módulo BI (S1) — mismo patrón de ingesta que actas
4. Tracker mora V0 ACH (S2)
5. Custom MCP connector multi-tenant — post-launch NSCF (reutilizable para ForumPHs + otros)
6. RLS fix unrlvl-db y XMMs — programado post-launch NSCF

**Meta crítica:** Primer cliente ForumPHs antes del 30 Junio 2026

---

## ARQUITECTURA PIPELINE v1.5 (Document Factory)

```
ZIP (extracción local browser)
  → Confirmación stats (UploadZone)
  → /api/parse (texto only — SIN imágenes)
  → Pre-flight (gaps, agenda cross-ref, total_units REQUERIDO)
  → Paso 0.5 (17 agentes paralelos, fphs-formalize v10)
  → /api/generate (parsed + imágenes comprimidas Canvas)
  → QA → ICR (parsed SIN imágenes) → Descarga DOCX
```

**Regla imágenes:** solo `/api/generate` las recibe. Toda otra API recibe `parsed` sin campo `images`.
