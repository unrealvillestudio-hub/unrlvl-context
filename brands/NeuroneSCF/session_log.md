# NeuroneSCF — Session Log
_Última actualización: 2026-05-07_

---

## SESIÓN 2026-05-07 — Kit Naming + Catálogo + Shopify Prep

### Decisiones tomadas

**Kit Naming — CERRADO:**
Patricia confirmó que se quedan sus nombres para los 5 kits spearhead. Los taglines de la propuesta Claude/Sam fueron adoptados para los 12 kits como "tagline insignia" (mecanismo de continuidad ad → product page).

| SKU | Nombre acordado | Tagline insignia |
|---|---|---|
| NSCF-KT-101P | **Deep Moisture Recovery** | "For when dry became your new normal." |
| NSCF-KT-101 | Deep Moisture Ritual | "Your daily hydration, simplified." |
| NSCF-KT-101T | Deep Moisture + Shine | — (bloqueado) |
| NSCF-KT-SDUO | **Hydra Boost Duo** | "HA + Collagen. Your healthiest hair starts here." |
| NSCF-KT-103V | **Perfect Blonde** | "For blonde that actually stays blonde." |
| NSCF-KT-103VP | Perfect Blonde Plus | "Everything your blonde needs. Plus the gloss." |
| NSCF-KT-103 | Blonde Color Ritual | "Tone. Moisture. Color that lasts." |
| NSCF-KT-103P | Blonde Color Plus | "Complete color care, from wash to finish." |
| NSCF-KT-103VT | Perfect Blonde + Definition | — (bloqueado) |
| NSCF-KT-102P | **Extreme Repair** | "For hair that's been through everything." |
| NSCF-KT-102 | Repair Ritual | "The foundation. Rebuilding from the inside." |
| NSCF-KT-102T | Repair & Shield | "Rebuild it. Then protect it." |
| NSCF-KT-104 | **SOS Hair Revue** | "The complete reset. When your hair needs more than a product." |

**Entregables generados:**
- `NSCF_Kit_Naming_System.html` — framework de naming con rationale completo
- `NSCF_Kit_Catalog.pdf` — catálogo con nombres, taglines, composición y stock por kit
- Alt text para las 12 imágenes de producto en Shopify (listos)
- Documento de campos Shopify para carga manual: **PENDIENTE** (Sam esperando que PO termine de subir imágenes)

**Confirmado sobre Shopify:**
- No hay MCP de Shopify conectado — carga sigue siendo manual por Patricia
- Cuando PO termine de subir imágenes, Sam pide documento con todos los campos (title, description opening, SEO title, SEO desc, alt text, tags) por kit en orden del admin, listo para pegar

### Estado B2C post-sesión
- kit_naming: ✅ CERRADO — nombres PO + taglines Claude/Sam adoptados
- Imágenes kits: ⚠️ Patricia subiendo (en progreso al cierre de sesión)
- Campos Shopify (title/desc/SEO/alt): pendiente documento — aguarda confirmación PO imagen upload completo

---

## SESIÓN 2026-05-06 — Shopify Audit v16.1 + SP Scan

- Audit B2C: 137/200 (era 132). SEO titles: 12→5 missing.
- SP scan: 3 productos con contenido facial incorrecto (DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery)
- sp-fix-targeted v1 deployado — proxy route pendiente
- enrichFixPayloads HTML patch aplicado
- seo-audit-check EF nueva: GraphQL truth checker
- sp-reader-full EF nueva: lee 42 SP metafields, detecta keywords faciales

---

## SESIÓN 2026-05-05 — Compliance + Anti-Caída + Kits Nav

- Anti-Caída fix aplicado: productos renombrados a "Scalp Strength"
- CAPISSEN drug claims → cosmetic claims corregidos
- Menu Kits animado activado en nav B2C
- Collections fix: 6/6 populadas
- SEO titles: progresó a 37/42

---

## SESIÓN 2026-05-04 — Kit Naming (primera ronda) + SEO

- Kit naming system iniciado (HTML v1)
- nscf-kit-seo-revert v2 aplicado
- Social Proof 42/42 ES+EN completado (9 QA corrections)
- Theme i18n R3: locale_root fix

---

## SESIÓN 2026-05-03 — Audit B2C + Theme i18n

- Primer audit B2C: 132/200
- Theme i18n R1+R2: traducciones ES+EN
- OAuth B2B+B2C conectados

---

## PENDIENTES PRIORITARIOS (al cierre 2026-05-07)

1. **CRÍTICO** — SP fix: activar proxy route para sp-fix-targeted (DY FAZZA + Hydra Boost Duo + Deep Moisture Recovery)
2. **CRÍTICO** — SEO descriptions: shopify-fix v13 run (29 productos pendientes)
3. **MANUAL PATRICIA URGENTE** — Payment gateway · EUR→USD · Policies · Shipping FL · Precios $0.00 · WhatsApp field
4. **MANUAL PATRICIA** — Imágenes 12 kits (en progreso)
5. **PENDIENTE SAM** — Documento campos Shopify por kit (cuando PO confirme imágenes subidas)
6. **Tracking** — Meta + TikTok + Google pixels (0/10)
7. **B2B** — SEO-003 COLOR titles fix
8. **Auditor** — Inconsistencia v9-fresh vs v16.1 · unificar audit EF

---

_Unreal>ille Studio · unrealvillestudio.com_
