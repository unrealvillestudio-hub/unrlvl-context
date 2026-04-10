# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba

---

## 2026-04-09 — Pricing v15 + SKU Mapping + Kits Strategy v4

### CERRADO EN ESTA SESIÓN

#### Pricing Calculator v15 — actualizaciones completas

**Productos B2C — archivo PO integrado:**
- 12 productos 50ml deshabilitados (fondo gris, texto tachado, ⛔ INACTIVO)
- 18 productos reclasificados B2B → B2C (fondo verde) con fórmula de costo B2C completa (incluye Logística + Marketing)
- 3 kits derivados nuevos añadidos a pestaña KITS: KT-101T, KT-102T, KT-103VT

**Fix doble arancel (hallazgo crítico):**
- Columna renombrada a "Precio Compra LATAM ($)" — precio de factura puro
- La columna c/Arancel aplica el 20% una sola vez
- 73 productos corregidos — precios MIN/DES/OPT bajaron ~0.50–0.86$ en productos afectados

**Productos con warning (pendientes PO):**
- MELANIN ANTI G (NSCF-CL-010) — insertado en rojo, sin precio, pendiente decisión PO
- CONTROLLER, GEOMETRY GEL, GEOMETRY CREAM — inventario = 0, marcados en rojo

**SKU_MAPPING actualizado (solo esa pestaña):**
- 3 nuevos productos individuales Tier 3: RESPLANDER SHINE, THERMO DUAL, LYCRA WEB
- 3 nuevos kits derivados: KT-101T, KT-102T, KT-103VT
- QA: bug detectado y corregido — 8 fórmulas PO desincronizadas por insert_rows, todas corregidas
- 14 otras pestañas: intactas ✅

**Archivos generados:** `Neurone_Pricing_v15.xlsx`

#### Kit Architecture Strategy — v4

- `neurone_kits_strategy_v4.html` generado con correcciones de precios
- Cambios en kits derivados por fix doble arancel:

| Kit | Antes (v3) | Ahora (v4) |
|-----|-----------|-----------|
| KT-101T | cost $49.84 · 54.7% · contrib $60.15 | cost $48.95 · 55.5% · contrib $61.04 |
| KT-102T | cost $52.49 · 52.3% · contrib $57.50 | cost $51.53 · 53.1% · contrib $58.46 |
| KT-103VT | cost $49.33 · 48.1% · contrib $45.66 | cost $48.47 · 49.0% · contrib $46.52 |

- 9 kits originales: sin cambios
- QA 12/12 ✅

### PENDIENTE NeuroneSCF (vigente)
- Precios reales por SKU + inventario real → PO debe confirmar
- MELANIN ANTI G → decisión PO (precio de compra pendiente)
- CONTROLLER, GEOMETRY GEL, GEOMETRY CREAM → inventario 0, espera decisión PO
- Cargar 87 SKUs + 12 kits en Shopify
- Configurar Shopify Payments + POS Vizos
- Instalar UpPromote + embajadoras
- Activar Shop Pay Installments + Afterpay
- copy_profile NeuroneSCF Supabase (CopyLab Layer 13 vacío)
- Autorización marca Neurone US → bloquea lanzamiento
- Video PO Kit SOS → asset urgente TikTok
- BP_Brand_Context.md NeuroneSCF → crear
- Dominio Unreal>ille Cloudflare + aliases email

---

## 2026-04-08 — DDMV-Assistant security + Pricing QA + Kit Architecture

### CERRADO — ver entradas anteriores

---

## 2026-03-31 — DDMV-Assistant v1 deploy
### CERRADO
