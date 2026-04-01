# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-03-31 — Kits PO reales + Pricing v10 + Estrategia v5a/v5b

### CERRADO EN ESTA SESIÓN

**Confirmación arancel 20%:**
- El arancel 20% YA estaba incluido en Pricing v9. Precios de compra = precio LATAM × 1.20. No se requieren cambios al Pricing Calculator.

**Neurone_Pricing_v10.xlsx generado:**
- Pestaña KITS: reconstruida con 9 kits reales de PO (productos 400ml/200ml). 3 columnas precio/kit (Mínimo/Deseado/Óptimo). NSCF SKUs asignados.
- Pestaña SKU_MAPPING: 17 productos + 9 kits. Mapeo Neurone → NSCF. Pendiente cargar a base de datos.
- Pestaña PROYECCION: 3 escenarios de precio side-by-side.

**NSCF SKUs creados (solo componentes de los 9 kits — catálogo completo pendiente):**
- Productos: NSCF-CL-001/002/003/004 · NSCF-TR-001 a TR-010 · NSCF-SR-001/002/003
- Kits activos: NSCF-KT-101/101P/102/102P/103/103P/103V/103VP
- Kit SOS pendiente: NSCF-KT-104 ← DECISIÓN PO

**9 Kits de PO — composiciones y costos de producto (con arancel 20%):**
- Kit 1  (NSCF-KT-101):   HUMIT 400ml + HUMIT MASK 400ml + DY FAZZA 200ml · $15.18
- Kit 1.1 (NSCF-KT-101P): + NEURONA GLOSS 50ml · $18.78
- Kit 2  (NSCF-KT-102):   KERASIN HB 400ml + KERASIN HB MASK 400ml + DY FAZZA COLOR 200ml · $17.40
- Kit 2.1 (NSCF-KT-102P): + NEURONA GLOSS 50ml · $21.00
- Kit 3  (NSCF-KT-103):   TOTAL VIOLET 400ml + TOTAL VIOLET MASK 400ml + DY FAZZA COLOR 400ml · $17.40
- Kit 3.1 (NSCF-KT-103P): + NEURONA GLOSS 50ml · $21.00
- Kit 3.2 (NSCF-KT-103V): TOTAL VIOLET 400ml + TOTAL VIOLET MASK 400ml + VELVETY CONTROL 400ml · $14.82
- Kit 3.3 (NSCF-KT-103VP): + NEURONA GLOSS 50ml · $18.42
- Kit 4 SOS (NSCF-KT-104): 7 componentes incl. 3 kits serums · $66.00 ← PENDIENTE PO

**Escenarios de precio (3 niveles):**
- Mínimo 40%: $64.99–$139.99
- Deseado ~50%: $74.99–$179.99 ← precio de referencia
- Óptimo ~60%: $84.99–$219.99

**neurone_v5a_realista.html + neurone_v5b_real.html:**
- Ambas: 9 kits × 3 escenarios, Kit 4 análisis, breakeven, ramp-up mes 1–6, flujo de caja mes 0–6 (todo con 3 escenarios de precio en color), tabla SKU mapping.
- v5A Realista: $5,340/mes fijos (incl. UNRLVL $1,500). Breakeven Deseado: 160 órd/mes. Capital necesario: ~$13,776.
- v5B Real: $3,840/mes fijos (UNRLVL $0). Breakeven Deseado: 115 órd/mes. Capital necesario: ~$8,914.

### DECISIONES / ACLARACIONES
- Arancel ya incorporado en modelo — sin impacto retroactivo.
- Kits PO usan 400ml/200ml (no 50ml del modelo anterior) — economics superiores, AOV sube a $67–99.
- Pricing Calculator no requiere cambios — solo pestañas KITS/PROYECCION/SKU_MAPPING.
- Sc.A/B/C eliminados de los informes — reemplazados por una versión por informe.
- Contador incluido en salarios $800 — no costo separado.
- SKUs NSCF solo cubren 17 componentes de los 9 kits. Catálogo completo (87 SKUs) pendiente.
- Kit 4 SOS: Opción A (mes 3+ sin ads, recomendación directa PO) o Opción B (reformular con piezas individuales, precio $90–110 para ads).

### PENDIENTE NeuroneSCF
- **Kit 4 SOS**: decisión PO (Opción A o B)
- **Precio final**: elegir escenario (Mínimo/Deseado/Óptimo) y cargar en Shopify
- **v5a/v5b**: aprobación PO + Laura antes de usar con terceros
- **NSCF SKUs catálogo completo**: 87 SKUs pendientes
- **SKU_MAPPING a base de datos**: cargar una vez aprobados
- **Shopify**: 17+ SKUs out_of_stock · precios $0.00 placeholder
- **Video PO Kit SOS**: asset más urgente antes de escalar TikTok ads
- **Autorización marca Neurone US**: sigue bloqueada
- **Seguro/Mantenimiento/Transporte OPERATIVOS**: confirmar si aplican

---

## 2026-03-30 — WebLab fixes + Onboarding App ChatPanel + Supabase schema
### CERRADO — WebLab ✅ · Supabase brand_goals/brand_personas ✅ · ChatPanel ✅ · Apps en producción ✅

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
### CERRADO — Pricing v9 ✅ · neurone_estrategia_v4.html pending PO+Laura · BP_BRAND_UNRLVL v1.3 ✅

---

## 2026-03-22 — Estado inicial
- SKU sistema pendiente · 17+ SKUs stock 0 · precios $0.00
