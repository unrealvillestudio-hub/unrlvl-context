# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-04-02 — Kits v10 + Estrategia v5a/v5b + Propuesta Servicio UNRLVL

### CERRADO EN ESTA SESIÓN

**Confirmación arancel 20%:** ya estaba incluido en Pricing v9. Sin cambios retroactivos.

**Neurone_Pricing_v10.xlsx:**
- KITS: 9 kits reales PO (400ml/200ml), 3 escenarios precio, NSCF SKUs
- SKU_MAPPING: 17 productos + 9 kits, Neurone→NSCF, listo para base de datos
- PROYECCION: 3 escenarios side-by-side

**NSCF SKUs (solo componentes de los 9 kits):**
- NSCF-CL-001/002/003/004 · NSCF-TR-001 a TR-010 · NSCF-SR-001/002/003
- Kits activos: NSCF-KT-101/101P/102/102P/103/103P/103V/103VP
- Kit SOS pendiente: NSCF-KT-104 ← DECISIÓN PO

**9 Kits PO — precios finales:**
- Kit 1/2/3/3.2: $64.99 Mín / $74.99 Des / $84.99-$99.99 Ópt
- Kit 1.1/2.1/3.1/3.3: $64.99 Mín / $84.99 Des / $109.99 Ópt
- Kit 4 SOS: $139.99 Mín / $179.99 Des / $219.99 Ópt ← pendiente PO

**neurone_v5a_realista.html + neurone_v5b_real.html:**
- 9 kits × 3 escenarios precio, Kit 4 análisis, breakeven, ramp-up mes 1–6 (3 escenarios), flujo de caja mes 0–6 (3 escenarios), SKU mapping
- v5A Realista: $5,340/mes fijos (incl. UNRLVL $1,500). Breakeven Deseado: 160 órd. Capital: ~$13,776
- v5B Real: $3,840/mes fijos (UNRLVL $0). Breakeven Deseado: 115 órd. Capital: ~$8,914
- Bug corregido: template literals en flujo de caja. Sc.A/B/C eliminados. "Supabase" → "base de datos"

**UNRLVL_Neurone_Propuesta_Servicio.html — VERSIÓN FINAL:**
- 9 secciones: Visión estratégica, 4 módulos, estructura 3 fases, Meta Andromeda, Fase de exploración, Entregables mes a mes, Resumen (319 outputs), Condiciones contractuales, Propuesta final
- 319 outputs garantizados en 6 meses
- Metodología Meta Andromeda 2025: 3 ad sets máximo, Advantage+/Broad/Intuición PO
- Checklist QA Andromeda: 14 ítems (video + imagen/carrusel)
- Inversión ads: $10,100 total (escala $1,000→$2,500/mes)

**Estructura contractual FINAL (3 fases):**
- Fase 1 (M1–6): $2,500/mes retainer fijo. Sin performance
- Fase 2 (M7–12): $3,000/mes retainer fijo. Sin performance
- Fase 3 (M13–24): $3,000/mes retainer + 5% profit sharing mensual sobre beneficio neto

**Cláusula de salida única (todas las fases):**
- Con causa justificada (incumplimiento documentado): 60 días preaviso, sin penalización
- Sin causa justificada: pago del saldo restante del ciclo en curso + 60 días preaviso
- Impago: suspensión día 10, rescisión sin causa día 30, retención de activos hasta liquidación
- Fin de ciclo: 60 días preaviso, sin penalización. Renovación automática en silencio si no hay preaviso
- Exclusividad durante vigencia del acuerdo

**Metodología ads discutida (no en propuesta):**
- Meta Andromeda pondera: velocidad engagement 2h, retención video, coherencia creativo→landing
- Metodología exploración antigua (12-15 ad sets) = ineficiente hoy. Reemplazada por 3 ad sets
- Sam confirmó que estaba desfasado desde 2020 — UNRLVL asume la enseñanza de metodología actual

**Análisis ecosistema UNRLVL para servir la propuesta:**
- Stack puede automatizar hoy: copies, briefs de video, creativos de ads, emails, artículos de blog (CopyLab)
- No puede hoy: publicación automática a IG/TK, lanzamiento campañas Meta/TikTok API, pipeline subtítulos
- Plan de 4 fases de automatización discutido (Fase 0→3, mes a mes)
- Horas hombre residuales al final de Fase 3: ~30-35h/mes
- Lanzamiento Meta/TikTok API: factible 2-3 semanas de desarrollo cuando se priorice

### PENDIENTE NeuroneSCF
- Kit 4 SOS: decisión PO (Opción A sin ads mes 3+ / Opción B reformular piezas individuales)
- Precio final: elegir escenario (Mínimo/Deseado/Óptimo) y cargar en Shopify
- v5a/v5b + Propuesta Servicio: aprobación PO + Laura
- NSCF SKUs catálogo completo: 70 SKUs pendientes
- SKU_MAPPING a base de datos: cargar una vez aprobados
- Shopify: precios $0.00 placeholder · activar tienda pendiente
- Video PO Kit SOS: asset más urgente antes de escalar TikTok ads
- Autorización marca Neurone US: sigue bloqueada

---

## 2026-03-31 — Kits PO reales + Pricing v10 + Estrategia v5a/v5b (sesión anterior)
### CERRADO — ver detalle en sesión 2026-04-02 (continuación directa)

---

## 2026-03-30 — WebLab fixes + Onboarding App ChatPanel + Supabase schema
### CERRADO — WebLab ✅ · Supabase brand_goals/brand_personas ✅ · ChatPanel ✅

---

## 2026-03-29 — WebLab Supabase integration + Onboarding App planning
### CERRADO — WebLab → Supabase ✅ · Onboarding App planificada ✅

---

## 2026-03-28 — CopyLab full debug + schema audit + Supabase RLS
### CERRADO — CopyLab PASSED ✅ · Supabase RLS 0 alertas ✅

---

## 2026-03-24 — Cloudflare + Email Routing + Gmail filters
### CERRADO — neuronescflorida.com → Cloudflare ✅ · 9 aliases ✅ · NEU-005 cerrado ✅

---

## 2026-03-23 — Pricing v9 + Estrategia v4 + Brand standards
### CERRADO — Pricing v9 ✅ · BP_BRAND_UNRLVL v1.3 ✅

---

## 2026-03-22 — Estado inicial
- SKU sistema pendiente · 17+ SKUs stock 0 · precios $0.00
