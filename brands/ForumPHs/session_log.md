# ForumPHs · Session Log
_Última actualización: 2026-05-21_

---

## Sesión 2026-05-21 — Schema v3 + BI v2 + Document Factory + Professor Checkpoint 2

### Estado del sistema
- **Supabase ForumPHs** (`tajuoqdbnsnzkhyqvdgs`): 36 tablas, schema v3 completo
- **Document Factory** (`forumphs-document-factory.vercel.app`): Actas v1.5 + BI v2 LIVE
- **brand_context_full.json**: v5
- **EFs UNRLVL activos**: fphs-formalize, fphs-bi-report, fphs-bi-data, fphs-bi-status, fphs-bi-html, fphs-chat, fphs-session, brand-context-builder

### Cambios aplicados

#### Supabase ForumPHs — Schema v3 (36 tablas)
- `buildings`: tier, pricing_model, recargo_enabled, recargo_custom, mora_pct_current, facturacion_mes
- `arrears` + `mora_mensual`: 4 fases (AL_DIA/FASE_I-IV), Klaviyo tracking, action_history
- `bank_accounts`, `payment_receipts` (OCR metadata), `bank_reconciliations`
- `eeff_preliminar`: ciclo borrador→enviado_jd→pendiente_cpa→oficial + CPA disclaimer
- `klaviyo_flows_log`, `monthly_kpis`
- OPS: `field_staff`, `staff_buildings`, `incident_categories` (16 seeded), `incidents`, `incident_updates`, `inspection_photos`, `checklist_templates`, `checklist_items`, `inspection_rounds`, `inspection_round_items`, `providers`, `provider_invoices`, `quality_metrics`
- Funciones: `fphs_calc_mora_fase()`, `fphs_calc_recargo(tier, mora_pct, recargo_enabled, recargo_custom)`, `fphs_calc_fase_edificio()`
- Trigger `set_incident_due()` — calcula due_at al insertar incidencia

#### Modelo de negocio — decisiones cerradas
- **Clientes actuales = LEGACY**: `pricing_model=legacy`, `recargo_enabled=false`, tarifas congeladas
- **Recargo mora**: NO aplica a legacy (no estaba en contratos). Solo clientes nuevos `value_based` con `recargo_enabled=true` negociado por IF. `recargo_custom` para override por contrato.
- **Tier en legacy**: asignado por unidades (tamaño del PH) exclusivamente para referencia, NO define precio
- **4 fases mora**: FASE_I 1-2m / FASE_II 3-4m carta extrajudicial IF / FASE_III 5-6m JD decide judicial + 10% honorario éxito / FASE_IV 7m+ riesgo estructural planilla

#### OPS Architecture — documentado
- **OPS App campo** (mobile-first): checklists, fotos in-app SOLO, cierre rondas, captura recibos OCR, incidencias
- **Propietario App** (portal.forumphs.com): tickets live, balance, actas — Sprint S3
- **Quality Dashboard** (IF + Sam + Irja): SLA compliance, checklist compliance, mora, proveedores — Sprint S5
- **WA Agent OPS** (Twilio): calificación incidencias → ticket → SLA automático — Sprint S4
- SLA: URGENTE 2-4h · PRIORITARIO 24-48h · COMUN 3-5 días

#### Document Factory v2
- `app/bi/page.tsx`: auto mode (monthly_kpis), 4 fases mora, SVG charts sin deps, eeff_preliminar workflow (4 estados), botón "⬇ Suite HTML"
- `app/page.tsx`: reconstruido desde componentes del repo — props correctos (PreflightForm, QAReport, ICRReport, ICRResolution)
- NavTabs: layout.tsx + NavTabs.tsx
- Nuevas API routes: `app/api/bi/data/`, `app/api/bi/status/`, `app/api/bi/html/`

#### EFs nuevos desplegados (UNRLVL)
- `fphs-bi-data` v1: GET monthly_kpis + mora_detail + eeff_preliminar por building/period
- `fphs-bi-status` v1: PATCH eeff_preliminar status workflow
- `fphs-bi-html` v1: genera HTML 5 paneles self-contained (Amatista Carbon, Chart.js CDN, brand_id param)

### Pendientes S2 (26 May - 6 Jun)
- Tracker captura recibos: foto → Claude Vision OCR → `payment_receipts` → match → `payments` reconciliados
- Cron mora día 1: `arrears` + `mora_mensual` con 4 fases calculadas
- Klaviyo flows F-I disparados automáticamente desde trigger Supabase
- `bank_transactions` tabla (detalle granular para reconciliación)

### Pendientes acción IF
- Aprobar propuesta Star & Herald → Mayra Paredes (deadline 30 Jun 2026)
- Confirmar tier definitivo Luxor Towers 300 (143 uds, fee legacy $3,100)
- Reservas laborales $1,014.89/mes — VENCIDO 1 Mayo 2026
- Pasivo histórico ~$25k — VENCIDO 15 Abril 2026

### Professor — Checkpoint 2 (6 learnings guardados)
- Clientes legacy + recargo model
- 4 fases mora completo
- Schema v3 + EFs
- Props de componentes Next.js: SIEMPRE leer fuente antes de usar
- TypeScript: `as unknown as T` para tipos incompatibles
- VS Code Restricted Mode + Next.js pages fuera de app/api/
