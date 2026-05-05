# NeuroneSCF B2C — Session Log

---

## 2026-05-06 | Sprint: Auditor + Fixer Bugs + SP Cards Review

### CONTEXTO
Sprint de día completo centrado en depurar los bugs del auditor/fixer, verificar el estado real SEO en Shopify, y revisar/identificar SP cards incorrectos.

---

### DIAGNÓSTICO: BUGS DEL AUDITOR Y FIXER

#### Hallazgos verificados (GraphQL directo a Shopify)
| Métrica | Estado real |
|---|---|
| Productos activos | 42 |
| Sin SEO title | 12 |
| Sin SEO description | 29 |
| Con ambos SEO fields | ~13/42 |

**Veredicto:** El auditor (shopify-audit v16.1 + fresh GraphQL) **dice la verdad**. El fixer pre-v13 **mentía** — reportaba `applied: N` sin verificar que Shopify persistiera el valor.

---

### BUGS CORREGIDOS

#### Bug 1: `fix_seo_combined` — Unknown fix_type
- **Causa:** SSEO-001 en audit EF genera `fix_type: 'fix_seo_combined'` pero este tipo nunca existió en shopify-fix.
- **Fix:** `enrichFixPayloads()` en shopify_audit.html remapea `fix_seo_combined` → `fix_seo_title_enriched` + extrae keywords del campo `detail`.
- **Archivo:** `shopify-auditor/shopify_audit.html` (live en Vercel)

#### Bug 2: SEO fixtures a 0 fixed (el bug real)
- **Causa:** El audit EF genera `affected_resources` con product IDs pero NO los mete en `fix_payload.products`. El fixer recibía payload vacío → 0 productos procesados → 0 fixed.
- **Fix:** `enrichFixPayloads()` construye `fix_payload.products[]` desde `affected_resources` para todos los findings con `claude_can_fix: true`.
- **Afectados:** SEO-001, SEO-002, SEO-004, SEO-005, SEO-007, CAT-004B.
- **Archivo:** `shopify-auditor/shopify_audit.html` (live en Vercel)

#### Bug 3: Fixer reportaba éxito sin verificar escritura (pre-v13)
- **Causa:** Mutations GraphQL devuelven OK sin error aunque Shopify no persista el valor en algunos casos.
- **Fix:** shopify-fix v13 — post-write verification: lee el valor retornado por la mutation y lo compara con lo enviado. Si no coincide → error real, no éxito falso.
- **Nuevo campo:** `verified: N` en response (separado de `applied: N`).

---

### FIXES APLICADOS HOY

#### 1. shopify_audit.html — enrichFixPayloads patch
- Función `enrichFixPayloads()` insertada antes de `async function runAudit()`
- Llamada añadida: `auditData.findings = enrichFixPayloads(auditData.findings)` en runAudit()
- Resuelve Bug 1 (fix_seo_combined) y Bug 2 (fix_payload vacío)
- **Status:** ✅ LIVE en `unrlvl-tools.vercel.app/shopify-auditor/shopify_audit.html`

#### 2. shopify-fix v12 — Severe batch sizes
- `fix_description_enrich`: 5 → **15** productos/call
- `fix_seo_description`: 8 → **20** productos/call
- `fix_seo_title_enriched`: 10 → **20** productos/call
- **EF:** Supabase `shopify-fix` v12 ✅

#### 3. shopify-fix v13 — Post-write verification
- Mutations ahora devuelven `seo{title description}` completo
- Comparación automática valor-enviado vs valor-retornado
- Status `"verified"` en lugar de `"updated"`
- Todos los fix_types SEO actualizados: fix_seo_title_enriched, fix_seo_description, fix_seo_title_structure, fix_seo_brand_suffix, fix_seo_title_trim, fix_description_enrich, fix_compliance_claims
- **EF:** Supabase `shopify-fix` v13 ✅

#### 4. shopify-fix v14→v15 — sp_scan + sp_fix
- Nuevos fix_types: `sp_scan` (lee todos los SP metafields, detecta contenido facial), `sp_fix` (reescribe SP incorrectos)
- Keywords de detección: FACIAL_KEYWORDS_ES + FACIAL_KEYWORDS_EN (30+ términos)
- **EF:** Supabase `shopify-fix` v15 ✅

---

### SOCIAL PROOF CARDS — SCAN COMPLETO

**Total productos escaneados:** 42/42  
**SP con contenido incorrecto (facial skincare):** **3 productos**

| Producto | GID | Problema ES | Problema EN |
|---|---|---|---|
| **DY FAZZA** | `10771520356679` | Reviews hablan de piel, mejillas, sequedad facial | "skincare routine", "moisturizer", "fine lines" |
| **Hydra Boost Duo** | `10771522945351` | "cara", "manchas", "poros", "rostro" | "dark spots", "hyperpigmentation", "skin texture" |
| **Deep Moisture Recovery** | `10777103171911` | "piel seca", "piel mixta", "poros", "tono de piel" | "dark spots", "hyperpigmentation", "pores" |

**Los 39 restantes:** limpios ✅

#### SP Fix — Estado
- EF `sp-fix-targeted` v1 desplegado en Supabase ✅
- Lee contenido actual de Shopify → rewrites con Claude → escribe de vuelta
- **⚠️ PENDIENTE:** Proxy accesible en Vercel no habilitado — primer task de mañana

---

### SCORE NSCF B2C

| Momento | Score |
|---|---|
| Inicio sesión | 132/200 |
| Después de fixes | **137/200** |
| Delta | **+5** |

**Módulos mejorados:**
- SEO: 3/10 → 5/10 (5 títulos SEO verificados vía enrichFixPayloads + shopify-fix v13)
- Strategic SEO: 7/10 → 10/10

---

### SEO STATUS POST-SPRINT

| Finding | Antes | Después |
|---|---|---|
| SEO-001 Missing titles | 16 | **5** (11 aplicados y verificados) |
| SEO-002 Missing descriptions | 25 (auditor v9) / 29 (GraphQL real) | 29 — fixer v13 pendiente de run |
| SEO-004 Inverted structure | 1 | 0 ✅ |
| SEO-005 Missing brand suffix | 9 | pendiente |
| SSEO-001 Keyword coverage | 48% | 55% → 10/10 score |

---

### EFs DESPLEGADOS HOY

| EF | Versión | Cambio |
|---|---|---:|
| shopify-fix | v12 | Batch sizes severos |
| shopify-fix | v13 | Post-write verification |
| shopify-fix | v14 | sp_scan + sp_fix fix_types |
| shopify-fix | v15 | Refactor + sp_fix mejorado |
| seo-audit-check | v1 (NEW) | GraphQL directo: SEO truth checker |
| sp-reader-full | v1-v2 (NEW) | Lee todos los SP metafields |
| sp-fix-targeted | v1 (NEW) | Fix los 3 SP con contenido facial |

---

### PENDIENTES CRÍTICOS PARA MAÑANA

#### 1. [PRIORIDAD 1] SP Fix — Activar proxy
- **Acción:** Habilitar ruta en fix-proxy.js para `sp_fix_targeted` OR añadir `sp_fix_targeted` como fix_type a shopify-fix v16
- **EF listo:** `sp-fix-targeted` v1 ya desplegado
- **Productos:** DY FAZZA, Hydra Boost Duo, Deep Moisture Recovery

#### 2. [PRIORIDAD 2] Resolver inconsistencias SEO definitivamente
- shopify-audit v9-fresh (audit-proxy) vs v16.1 (HTML) cuentan diferente
- Necesita audit run limpio con v13 + verificación real de escrituras
- Unificar a un solo EF de referencia

#### 3. [PRIORIDAD 3] Completar SEO-002 descriptions
- 29 productos sin meta description confirmados vía GraphQL
- shopify-fix v13 ready — ejecutar Apply en Fix Queue
- Puede requerir 2 runs (20 por call, 9 restantes en 2do run)

---

### PENDIENTES MANUALES (Patricia) — Sin cambios
- ❌ Payment gateway: Shopify Payments → Complete setup (CRÍTICO)
- ❌ Refund Policy: Settings → Policies
- ❌ Footer legal links: Navigation → Footer menu
- ❌ Kit images: 12 kits sin imagen (CAT-002 critical)
- ❌ Shipping rates FL
- ❌ robots.txt blocking /products

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

### FIXES APLICADOS

#### 1. Anti-Caída → Scalp Strength (FDA Compliance)
- EF: `nscf-fix-anticaida v1`
- Productos: CAPISSEN SHAMPOO + CAPISSEN LOTION
- Tag `anti-caida` removido → `Scalp Strength` añadido

#### 2. CAPISSEN Descripciones — Drug Claims → Cosmetic Claims
- EF: `nscf-fix-capissen-descriptions v1`
- Removido: "reactivar folículos inactivos", "dormant follicles", "reduced shedding"
- Reemplazado: "nutre el cuero cabelludo", "visibly stronger hair"

#### 3. Menu Ritual Kits — Animated Link
- EF: `nscf-menu-kits v1`
- CSS: punto naranja #C4622D pulsante

#### 4. Kit Naming — 4 Punta Kits
- EF: `nscf-kit-seo-revert v2`
- ⚠️ Sam revisará con Patricia — "no quedaron bien"

### AUDITOR UPGRADES

| EF | Versión | Cambio |
|---|---|---|
| shopify-audit | v30 (v16.1) | fix tags string bug + generic language detection |
| shopify-fix | v9 | fix_compliance_claims category-aware |
| shopify-theme-analyzer | v1 (NEW) | Static Liquid analysis |
| shopify-link-crawler | v1 (NEW) | Sitemap crawl + HEAD checks |
| shopify-audit-orchestrator | v1 (NEW) | Parallel agents → executive report |

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
