# Document Factory — Plan de Producto
_Creado: 2026-04-15 · Referencia para sesiones de desarrollo_
_Vive en: `brands/ForumPHs/DOCUMENT_FACTORY_PLAN.md`_

---

## QUÉ ES

Document Factory es una app multi-módulo que genera documentos profesionales a partir de datos estructurados. Cada módulo tiene sus propios inputs, su propio schema JSON y su propio output. Claude procesa los JSONs — nunca los archivos crudos.

Actualmente deployada en Vercel como `forumphs-document-factory.vercel.app`. El primer módulo es EEFF/BI financiero para ForumPHs. Crecerá a contratos, actas, informes y otros tipos de documentos para ForumPHs y otras marcas del ecosistema.

---

## ARQUITECTURA

```
Document Factory (Vercel)
  ├── modules/
  │   ├── eeff/              ← ACTIVO — BI financiero ForumPHs
  │   ├── contratos/         ← FUTURO
  │   ├── actas/             ← FUTURO
  │   └── informes/          ← FUTURO
  ├── tools/
  │   └── normalizer.html    ← evolución del Zip Extractor actual
  │       INPUT:  .xlsx · .pdf · .docx
  │       OUTPUT: JSON con schema fijo por módulo
  └── engine/
      └── claude-processor   ← recibe JSON → genera HTML/PDF/doc
```

**Principio clave:** Claude nunca lee archivos crudos. El normalizer los convierte a JSON con schema fijo. El procesador de Claude consume ese JSON. Esto hace el análisis reproducible, auditable y multi-cliente.

---

## EL NORMALIZER — EVOLUCIÓN DEL ZIP EXTRACTOR

### Estado actual
El Zip Extractor existe como HTML local. Extrae el JSON que consume el Document Factory para EEFF.

### Lo que debe ser
`tools/normalizer.html` dentro del repo del Document Factory. Accesible en `forumphs-document-factory.vercel.app/tools/normalizer.html`. Acepta múltiples formatos de entrada y produce el JSON del schema correcto según el módulo seleccionado.

### Schemas JSON por módulo (a definir)

**Schema EEFF (base ya funciona — formalizar):**
```json
{
  "schema_version": "1.0",
  "module": "eeff",
  "org": "ForumPHs",
  "period": "2026",
  "financials": {
    "income": { "total": 0, "by_category": {} },
    "expenses": { "total": 0, "by_category": {} },
    "net_margin": 0,
    "monthly_breakdown": []
  },
  "constants": {
    "base_income": 0,
    "base_ops": 0,
    "labor_reserve": 0,
    "historic_liability": 0
  },
  "metadata": { "source_files": [], "generated_at": "" }
}
```

**Pendiente definir schemas para:** contratos, actas, informes de cartera PH

### Formatos que debe aceptar el normalizer
- `.xlsx` — EEFF interno (caso principal ForumPHs)
- `.pdf` — EEFF formal (declaración DGI, CPA)
- `.docx` — contratos, actas (casos futuros)

---

## MÓDULO EEFF / FINANCIAL INTELLIGENCE

### Estado actual ✅
- `ForumPHs_BI_2026.html` — BI completo 7 paneles, Panel 07 simulador interactivo
- `ForumPHs_EEFF_2026_v1.html` — Informe EEFF Ene-Feb 2026
- `FPHs_Business_Intelligence_2025.html` — BI original 2025
- Zip Extractor local — genera JSON desde XLSX EEFF
- Motor de simulación JS funcional (vanilla, sin deps)

### Niveles de evolución (del checkpoint)

**Nivel 1 — Servicio manual (ACTIVO)**
Sam sube EEFF → Claude analiza → genera HTML personalizado
Costo producción: 1-2 horas · Precio sugerido: $400-800/año por cliente

**Nivel 2 — App semi-automatizada (PRÓXIMO)**
Cliente carga XLSX template estándar → normalizer genera JSON → Claude genera BI automáticamente
Entregables: informe EEFF + panel 4 fondos + simulador timing + PDF descargable
Estimado: 2-3 sesiones

**Nivel 3 — Plataforma SaaS (FUTURO)**
ForumPHs lo ofrece a sus clientes PHs como servicio premium
10 PHs × $200 × 2/año = $4,000/año adicional para ForumPHs
Costo operativo ≈ $0 una vez construida

### Clientes PH pendientes de analizar
- PH Luxor Towers 300 (parcialmente hecho)
- PH Venezia Tower
- PH Torres de Castilla
- PH Plaza España
- PH Lefevre 75 / Don Enrique
- PH Los Álamos

### Patrones UI ya construidos (reutilizables)
`.fondo-card` · `.hierarchy` · `.vs-strip` · `.wf-row` · `.scenario-grid` · `.ms-row` · Simulador sliders + Chart.js

---

## DOS CONTEXTOS DE USO — MOTOR ÚNICO

**Contexto ForumPHs (externo — valor para cliente)**
Entrega el BI a la Junta Directiva del PH. Herramienta de transparencia y diferenciación. ForumPHs cobra por este servicio como add-on.

**Contexto Unrealville Studio (interno — filtro de onboarding)**
Antes de tomar un cliente, UNRLVL corre el análisis de sus EEFF internamente.
Si pasa los umbrales → se procede. Si no → declina con respeto.
Convierte "no somos para todo el mundo" en proceso documentado y objetivo.

**Umbrales de calificación UNRLVL (borrador — Sam define definitivos):**
- Margen operativo neto ≥ 15% sostenido
- Ratio deuda/ingreso ≤ 40%
- Capital de trabajo ≥ 3 meses de gastos operativos
- Sin pasivos laborales no registrados de magnitud
- Capacidad de inversión mensual en marca/tecnología ≥ X% ingresos

---

## APLICACIÓN A OTRAS MARCAS

| Marca | Variables clave | Estado |
|---|---|---|
| ForumPHs | Ingresos/PH, nómina, pasivo histórico, portafolio PHs | ✅ Piloto activo |
| NeuroneSCF | SKUs, márgenes por producto, volumen mensual, CAC | ⏳ Siguiente |
| Vizos Cosmetics | CAC, ticket promedio, margen SKU, COGS | ⏳ Post-lanzamiento |
| PO Marca Personal | Honorarios, proyectos, pipeline comercial | ⏳ Futuro |

---

## PLAN DE EJECUCIÓN

### Esta semana (sesión dedicada)
- [ ] **Formalizar schema JSON EEFF v1.0** — definir estructura fija con todas las claves necesarias para el módulo financiero
- [ ] **Mover Zip Extractor a `tools/normalizer.html`** en repo Document Factory — commit y deploy
- [ ] **Actualizar normalizer** para aceptar .xlsx, .pdf, .docx y producir el JSON del schema v1.0
- [ ] **Definir template XLSX estándar** de ingesta — columnas fijas que cualquier contador puede completar

### Corto plazo
- [ ] Construir EEFF BI de clientes PH pendientes (Venezia, Torres de Castilla, etc.)
- [ ] Formalizar Nivel 2: app semi-automatizada con normalizer + Claude processor
- [ ] Definir umbrales de calificación UNRLVL con Sam (sesión estratégica)
- [ ] Añadir módulo `contratos/` como segunda línea del Document Factory

### Mediano plazo
- [ ] Aplicar Financial Intelligence a NeuroneSCF (análisis de pricing + P&L)
- [ ] Nivel 3: plataforma SaaS para ForumPHs → clientes PH

---

## ARCHIVOS DE REFERENCIA

| Archivo | Ubicación en repo | Estado |
|---|---|---|
| `ForumPHs_BI_2026.html` | `CoreProject/brands/ForumPHs/assets/ForumPHs/` | ✅ |
| `ForumPHs_EEFF_2026_v1.html` | Misma carpeta | ✅ |
| `FPHs_Business_Intelligence_2025.html` | Misma carpeta | ✅ |
| `FPHs_Suite_Financiera_LuxorTowers300_2025.html` | `brands/ForumPHs/assets/clientes/PH_LUXOR_TOWERS_300/` | ✅ |
| Zip Extractor | Local (Sam) — pendiente mover a `tools/normalizer.html` | ⏳ |
| CHECKPOINT_FinancialIntelligence_v1.md | `CoreProject/checkpoints/` | ✅ |

---

## DECISIONES CERRADAS

- Claude consume JSON, nunca archivos crudos directamente
- Motor único / dos contextos (no dos productos)
- Document Factory es el hogar de todo — no repos separados por tipo de documento
- Normalizer vive en `tools/` dentro del Document Factory repo
- Schema JSON fijo por módulo — consistencia entre clientes garantizada
