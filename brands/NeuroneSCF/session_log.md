# NeuroneSCF B2C — Session Log

---

## 2026-05-05 | Sprint: Compliance + Auditor Agent Network

### AUDIT RUN — shopify-audit v16.1
- **Score: 136/200 (B)** — anterior: 109/160 (old scale)
- Compliance: **COMP-OK ✅ — 0 drug claims detected**
- Theme analyzer: **18 Liquid files CLEAN ✅ — 0 locale link issues**
- Context: cosmetics / high confidence / complete ✅

#### Score Breakdown
| Módulo | Score | Estado |
|---|---|---|
| Settings | 7/20 | ❌ CRÍTICO: 4 policies faltantes |
| Catalog | 12/20 | ❌ CRÍTICO: 12 kits sin imágenes |
| Content Language | 1/5 | ⚠️ descripciones ES en store US |
| Theme Language | 9/10 | ✅ |
| SEO | 7/10 | ✅ |
| Collection Health | 6/10 | ⚠️ |
| Theme | 9/15 | ⚠️ |
| **Payments** | **0/10** | ❌ **CRÍTICO: no payment gateway** |
| Orders | 10/10 | ✅ |
| Shipping | 2/5 | ⚠️ |
| Discounts | 5/5 | ✅ |
| Navigation | 7/10 | ⚠️ |
| **Tracking** | **0/5** | ❌ **Meta + TikTok + Google no detectados** |
| Apps | 10/10 | ✅ |
| Performance | 3/5 | ⚠️ |
| B2C vs B2B | 5/5 | ✅ |
| CRO | 4/10 | ⚠️ |
| Images | 4/5 | ✅ |
| Catalog Quality | 5/5 | ✅ |
| Inventory Quality | 5/5 | ✅ |
| Price Psychology | 5/5 | ✅ |
| **Compliance** | **10/10** | ✅ **COMP-OK — limpio** |
| Strategic SEO | 10/10 | ✅ |

### FIXES APLICADOS HOY

#### 1. Anti-Caída → Scalp Strength (FDA Compliance)
- EF: `nscf-fix-anticaida v1`
- Productos: CAPISSEN SHAMPOO + CAPISSEN LOTION
- Tag `anti-caida` removido → `Scalp Strength` añadido
- Motivo: "anti-caída" = drug claim bajo FDA 21 CFR 201.128. Ilegal en productos cosméticos US sin aprobación de drug.

#### 2. CAPISSEN Descripciones — Drug Claims → Cosmetic Claims
- EF: `nscf-fix-capissen-descriptions v1`
- Productos: CAPISSEN SHAMPOO + CAPISSEN LOTION
- ES body_html + EN translations actualizados
- Removido: "reactivar folículos inactivos", "reducción de caída", "dormant follicles", "reduced shedding"
- Reemplazado: "nutre el cuero cabelludo", "entorno óptimo para el crecimiento", "visibly stronger hair"

#### 3. Menu Ritual Kits — Animated Link
- EF: `nscf-menu-kits v1`
- Link animado "Ritual Kits" añadido a desktop nav + mobile menu
- CSS: punto naranja #C4622D pulsante con ring en loop 2s
- Locale-aware: usa `{{ locale_root }}` correctamente (ES + EN)

#### 4. Kit Naming — 4 Punta Kits (revisión pendiente)
- EF: `nscf-kit-seo-revert v2`
- KT-101P: Deep Moisture Recovery
- KT-SDUO: Hydra Boost Duo
- KT-103V: Perfect Blonde
- KT-102P: Extreme Repair
- ⚠️ Sam revisará con Patricia — "no quedaron bien"

### AUDITOR UPGRADES HOY

| EF | Versión | Cambio |
|---|---|---|
| shopify-audit | v30 (v16.1) | fix tags string bug + generic language detection + save_to_db flag |
| shopify-fix | v9 | fix_compliance_claims category-aware |
| shopify-theme-analyzer | v1 (NEW) | Static Liquid analysis: locale links, dead handles |
| shopify-link-crawler | v1 (NEW) | Sitemap crawl + HEAD checks + locale mismatch |
| shopify-audit-orchestrator | v1 (NEW) | Parallel agents → executive report JSON |

### PENDIENTES MANUALES (Patricia)
- ❌ EUR → USD en Admin > Settings > General > Store currency
- ❌ Payment gateway: Shopify Payments → Complete setup
- ❌ Shipping rates FL (Settings > Shipping > Add zone)
- ❌ Precios $0.00 en ~20 variantes
- ❌ Policies: pegar texto de NeuroneSCF_Policies.docx en Admin > Settings > Policies
- ❌ WhatsApp field en Customizer > Footer
- ❌ Kit images: 12 kits sin imagen (CAT-002 critical)
- ❌ Páginas about/la-ciencia/faq/contacto — contenido + visible

---

## 2026-05-04 | Sprint: Kit Naming + Auditor v13→v14

### COMPLETADO
- shopify-audit v13→v14 (compliance module básico: COMP-001 anti-caída)
- nscf-kit-seo-revert v2: 4 punta kit titles aplicados
- KT-SDUO product_type: Serum → Ritual Kit

---

## 2026-05-03 | Sprint: Social Proof + Collections + SEO

### COMPLETADO
- Social Proof Cards 42/42 ES+EN
- EN translations 42/42 con digests reales
- Collections fix: 5 vacías → 29 productos asignados
- SEO enriquecido: 62/62 products

---

## 2026-05-02 | Sprint: Theme i18n R3 + OAuth + Full Audit

### COMPLETADO
- OAuth B2C conectado
- Theme i18n R1+R2+R3 COMPLETE
- Audit baseline B2C: 109/160
- Audit baseline B2B: 133/160
- locale_root root cause fix
- NSCF Logo CDN
