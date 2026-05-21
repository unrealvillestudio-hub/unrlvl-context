# AGENDA — Unrealville Studio
_Versión: 2026-05-21-v9 | Actualizada por: Claude_

---

## 🔴 PRIORIDAD INMEDIATA

| # | Tarea | Estado | Notas |
|---|-------|--------|-------|
| 1 | **CopyLab 504 cold start** — resolver server-to-server timeout | 🔴 BLOQUEANTE async | Opciones: A) warm-up ping cron cada 5min, B) fluid:true en vercel.json, C) handler format Node.js nativo `(req,res)`, E) endpoint `/api/generate` separado solo Claude call. Testear en ese orden |
| 2 | **Job prueba cd0b168c** — resetear y validar end-to-end | ⏳ Post-fix 504 | Una vez resuelto el 504, este job debería completar en <35s |
| 3 | **TikTok Pixel DUPLICADO** en theme.liquid NSCF B2C | ⚠️ BLOQUEA ADS | Dos IDs: D866BMBC77UBK82UUH50 + D832THJC77UATASL0OO0 |
| 4 | **GTM + GA4 verificación** | ⏳ Sam verifica | GTM Preview Mode + GA4 DebugView |
| 5 | **Klaviyo flows** — 4 flows bilingüe ES/EN en UI | ⏳ Config manual UI | API no permite actions |
| 6 | **Slogan NSCF — definir el definitivo** | ⚠️ Pendiente Sam | Actualmente incompleto en página |

---

## 🟠 COPYLAB ASYNC — ESTADO SPRINT

| Componente | Estado | Notas |
|---|---|---|
| `copylab_jobs` tabla + grants | ✅ OPERACIONAL | GRANT + RLS ambas capas configuradas |
| `pg_cron` job #30 | ✅ ACTIVO | Cada 1 min, `copylab-processor-1min` |
| `copylab-processor` EF v1.4 | ✅ DEPLOYADO | Lee snapshot → inyecta brandContext → llama CopyLab |
| `brand-cache-builder` EF | ✅ DEPLOYADO | build/build_all/status |
| `brand_cache_snapshots` NeuroneSCF | ✅ v2.0 18 tablas | Built 2026-05-21 17:05 UTC. Rebuild manual cuando cambien tablas |
| `CopyLab v9.5` | ✅ DEPLOYADO | zero-query mode detecta snapshot v2.0 |
| **End-to-end async funcional** | 🔴 504 PENDIENTE | Todo el plomería está, falta resolver cold start Vercel |

---

## 🟠 NSCF — CONTENIDO KITS

| Tarea | Estado | Notas |
|-------|--------|-------|
| **Aplicar Restore Therapy Plus v4 a Shopify** | ⏳ Pendiente | productUpdate + translationsRegister · ES+EN + how_to_use + SEO |
| **Validar con Patricia composición técnica** de cada kit | ⏳ Antes de escalar | Para que la regla d7h use datos reales |
| **Escalar voice + motor a los otros 11 kits** | ⏳ Post-validación | Orden: Restore Therapy → Moisture Recovery + Plus → Perfect Blonde + Plus → ... |

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

_Nota: La infraestructura del flujo async (copylab_jobs + processor + brand_cache_snapshots) ya está lista para Ayra._

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
| Revisar 14 learnings pendientes (approved_by_sam=false) | ⏳ 6 nuevos de hoy |

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
| brand_cache_snapshots build_all otras marcas | ⏳ Post-fix 504 |
| connectivity-test EF — eliminar | ⏳ Era solo diagnóstico |
| XMMs: eliminar proyecto muerto + evaluar migración DDMV | ⚠️ |
| ImageLab fix (Vercel 50s timeout) | ⚠️ |
| Compliance soft pendiente: D7Herbal, DiamondDetails, VivoseMask, VizosCosmetics, PatriciaOsorio | ⏳ |
| Compliance setup completo: ForumPHs | 🔴 BLOCK |

---

## ✅ COMPLETADO RECIENTEMENTE (2026-05-21)

- **unrlvl-supabase-mcp v1.2.1** ✅ — deploy_edge_function corregido: endpoint `/functions/deploy?slug=`, field `file`, TypeScript raw
- **PAT configurado** ✅ — UNRLVL_SB_ACCESS_TOKEN = sbp_... correcto en Vercel
- **copylab_jobs grants** ✅ — GRANT + RLS ambas capas
- **copylab-processor v1.4** ✅ — snapshot-aware, 1 query Supabase antes de CopyLab
- **brand-cache-builder EF** ✅ — 18 tablas por marca, build/build_all/status
- **brand_cache_snapshots NeuroneSCF v2.0** ✅ — 18 tablas, built 17:05 UTC
- **CopyLab v9.5** ✅ — zero-query mode, snapshot v2.0 detection, cache_mode en respuesta
- **pg_cron job #30** ✅ — copylab-processor-1min activo
- **Professor: 6 learnings** ✅ — PAT, deploy endpoint, GRANT, cold start, snapshot arch, TS2552

---

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

---
_Regenerada: 2026-05-21 · ecosystem.json v14_
