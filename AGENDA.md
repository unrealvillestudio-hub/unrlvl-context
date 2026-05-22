# AGENDA — Unrealville Studio
_Versión: 2026-05-21-v10 | Actualizada por: Claude_

---

## 🔴 PRIORIDAD INMEDIATA

| # | Tarea | Estado | Notas |
|---|-------|--------|-------|
| 1 | **TikTok Pixel DUPLICADO** en theme.liquid NSCF B2C | ⚠️ BLOQUEA ADS | Dos IDs: D866BMBC77UBK82UUH50 + D832THJC77UATASL0OO0 |
| 2 | **GTM + GA4 verificación** | ⏳ Sam verifica | GTM Preview Mode + GA4 DebugView |
| 3 | **Klaviyo flows** — 4 flows bilingüe ES/EN en UI | ⏳ Config manual UI | API no permite actions |
| 4 | **Slogan NSCF — definir el definitivo** | ⚠️ Pendiente Sam | Actualmente incompleto en página |

---

## ✅ COPYLAB ASYNC — RESUELTO 2026-05-21

| Componente | Estado | Notas |
|---|---|---|
| `copylab_jobs` tabla + grants | ✅ OPERACIONAL | GRANT + RLS ambas capas |
| `pg_cron` job #30 | ✅ ACTIVO | Cada 1 min |
| `copylab-processor` EF v1.4 | ✅ DEPLOYADO | Lee snapshot → inyecta brandContext → llama CopyLab |
| `brand_cache_snapshots` NeuroneSCF | ✅ v2.0 18 tablas | Built 2026-05-21 17:05 UTC |
| `CopyLab v9.6` | ✅ DEPLOYADO | Node.js native handler — fix 504 cold start |
| `process-job.ts v1.1` | ✅ DEPLOYADO | Node.js native handler |
| **End-to-end async** | ✅ OPERACIONAL | 22-24s por job · cache_mode: v2.0_zero_query |
| **Test S.O.S Rescue System** | ✅ ES+EN completados | wait ~30-90s · exec ~22s · copy pendiente revisión |

**FIX DEFINITIVO:** Web API handler format (`req: Request → Promise<Response>`) ignoraba maxDuration:300. Solución: `VercelRequest/VercelResponse` de `@vercel/node`.

---

## 🟠 NSCF — CONTENIDO KITS

| Tarea | Estado | Notas |
|-------|--------|-------|
| **creative_seed + voice_genome null** en product_description_pack | 🔴 Pending | compatibility rules no definidas para `product_description_b2c` en snapshot — causa copy genérico |
| **Aplicar Restore Therapy Plus v4 a Shopify** | ⏳ Pendiente | productUpdate + translationsRegister · ES+EN + how_to_use + SEO |
| **Validar con Patricia composición técnica** de cada kit | ⏳ Antes de escalar | Para que la regla d7h use datos reales |
| **Escalar voice + motor a los otros 11 kits** | ⏳ Post-validación | S.O.S test completado como baseline |

---

## 🟠 NSCF — DEUDA TÉCNICA ACTIVA

| Tarea | Estado | Notas |
|-------|--------|-------|
| DY Fazza imagen + decisión 200ml vs 400ml | ⚠️ Bloquea bundle | NSCF-TR-013 · KT-104 |
| ~11 productos con traducción EN parcial (title/meta) | ⚠️ No bloqueante | Re-corrida targeted shopify-auto-translate |
| SP metafield fix 3 productos | ⚠️ Cosmético | proxy route sp-fix-targeted pendiente |
| Shipping zones | ⚠️ 3/5 | Admin manual |
| EN La Ciencia page | ⚠️ fix pendiente | |
| Klaviyo image_url property | ⚠️ Verificar | Activity Feed → Checkout Started event |
| Judge.me automations | ⚠️ Activar | Settings → Automations → review request |
| CRO Checkout Bundle | ⏳ Bundle instalada sin config | Sprint dedicado |

---

## 🟡 AYRA — Sprint 0 (deadline: 5 Jun 🔴)

| Tarea | Estado |
|-------|--------|
| Crear repo unrlvl-ayra (privado) | ❌ |
| Crear proyecto Vercel unrlvl-ayra | ❌ |
| Configurar dominio ayra.unrealvillestudio.com | ❌ |
| CREATE SCHEMA ayra + 11 tablas en Supabase main | ❌ |
| Env vars Vercel | ❌ |
| **PROFESSOR árbol navegable** (patrón INDEX.md) | ❌ NUEVO | PROFESSOR_CORE + nodos: VERCEL_RUNTIME, ASYNC_LAB_PIPELINE, SUPABASE_PATTERNS, SHOPIFY_PATTERNS, COPYLAB_PIPELINE, AYRA_ARCHITECTURE, GITHUB_OPS |
| **Migrar copylab_jobs → lab_jobs** con campo lab_id | ❌ NUEVO | EF processor universal con routing por lab_id |

_Nota: La infraestructura del flujo async (copylab_jobs + processor + brand_cache_snapshots) ya está lista y validada para Ayra._

---

## 🟡 VOICE GENOME — Enrichment

| Tarea | Estado |
|-------|--------|
| Capturar 3-5 audios adicionales de PO (consumer) | ⏳ → v1.0 mature |
| Capturar voice genome po_b2b | ⏳ |
| Voice genome Sam (B2B + ejecutivo) | ⏳ |

---

## 🟡 PROFESSOR

| Tarea | Estado |
|-------|--------|
| 29 learnings aprobados ✅ | DONE 2026-05-21 |
| ASYNC_LAB_PIPELINE manual v1.0 | DONE 2026-05-21 |
| Construir árbol navegable PROFESSOR_CORE | ❌ Ayra Sprint 0 |

---

## 🟡 LEGAL / ESTRUCTURA

| Tarea | Estado |
|-------|--------|
| Stripe Atlas LLC Delaware | ❌ P1 · $500 |
| Joint venture Patricia Osorio | ⏳ Ver PARTNERSHIP_STRUCTURE |

---

## 🟡 STUDIO / INFRA

| Tarea | Estado |
|-------|--------|
| luciensael.com DNS | ⏳ 10 min |
| brand_cache_snapshots build_all otras marcas | ⏳ Post S.O.S test |
| connectivity-test EF — eliminar | ⏳ Era solo diagnóstico |
| XMMs: eliminar proyecto muerto + evaluar migración DDMV | ⚠️ |
| ImageLab fix (Vercel 50s timeout) | ⚠️ AHORA CON RECETA: usar VercelRequest/VercelResponse + maxDuration |
| Compliance soft pendiente: D7Herbal, DiamondDetails, VivoseMask, VizosCosmetics, PatriciaOsorio | ⏳ |
| Compliance setup completo: ForumPHs | 🔴 BLOCK |

---

## ✅ COMPLETADO 2026-05-21

- **CopyLab v9.6** ✅ — Node.js native handler, 504 cold start RESUELTO
- **process-job.ts v1.1** ✅ — mismo fix handler format
- **Pipeline async end-to-end** ✅ — 22-24s por job · v2.0_zero_query
- **Test S.O.S Rescue System** ✅ — ES+EN completados en producción
- **Professor: 29 learnings aprobados** ✅
- **ASYNC_LAB_PIPELINE manual v1.0** ✅ — receta canónica en professor_manuals
- **gh-write.js** ✅ — relay POST para archivos grandes en unrlvl-context
- **GH PAT scope corregido** ✅ — Contents: Read and Write
- **temp_file_staging** dropeada ✅
- **copylab-file-writer EF** eliminada ✅

## ✅ COMPLETADO ANTERIORMENTE

- **PROFESSOR_SECRET** ✅ — 2026-05-20
- **BP_Brand_Context.md NSCF** ✅ — 2026-05-19
- **Voice Genome System** ✅ — 2026-05-19
- **content-pipeline SKILL v2.6** ✅ — 2026-05-19
- **Meta Pixel NSCF B2C** ✅ — 2026-05-17
- **Klaviyo NSCF** ✅ — 2026-05-17 · 10 templates ES+EN
- **Domain verification neuronescflorida.com** ✅ — 2026-05-17
- **Instagram → Facebook Page vinculadas** ✅ — 2026-05-17
- **GA4 + GTM instalados** ✅ — 2026-05-19
- **unrlvl-supabase-mcp v1.2.1** ✅ — 2026-05-21
- **brand_cache_snapshots NeuroneSCF v2.0** ✅ — 2026-05-21

---
_Regenerada: 2026-05-21 · ecosystem.json v15_
