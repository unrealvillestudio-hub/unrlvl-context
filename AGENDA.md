# AGENDA — Unrealville Studio
_Versión: 2026-05-19-v6 | Actualizada por: Claude_

---

## 🔴 PRIORIDAD INMEDIATA

| # | Tarea | Estado | Notas |
|---|-------|--------|-------|
| 0 | **PROFESSOR_SECRET** — configurar en Supabase Dashboard | ⏳ PENDIENTE SAM | Settings → Edge Functions → Secrets · 2 min |
| 1 | **TikTok Pixel DUPLICADO** en theme.liquid NSCF B2C | ⚠️ BLOQUEA ADS | Dos IDs distintos: D866BMBC77UBK82UUH50 + D832THJC77UATASL0OO0 · Identificar cuál es correcto en TikTok Ads Manager y eliminar el otro |
| 2 | **GTM + GA4 verificación** | ⏳ Sam verifica | GTM Preview Mode + GA4 DebugView · Sam instaló GTM+GA4 vía misma sesión |
| 3 | **Klaviyo flows** — 4 flows bilingüe ES/EN en UI | ⏳ Config manual UI | API no permite actions · ver session_log |
| 4 | **COMMIT** — SKILL v2.6 + brand.json v11 + AGENDA v6 + ecosystem.json v11 + session_log.md | ⏳ GitHub Desktop | Archivos listos en commit-pack-2026-05-19 |

---

## 🟠 NSCF — CONTENIDO KITS (nueva sección 2026-05-19)

| Tarea | Estado | Notas |
|-------|--------|-------|
| **Aplicar Restore Therapy Plus v4 a Shopify** | ⏳ Pendiente | productUpdate + translationsRegister · ES+EN + how_to_use + SEO |
| **Validar con Patricia composición técnica** de cada kit | ⏳ Antes de escalar | Para que la regla d7h use datos reales, no inferidos |
| **Escalar voice + motor a los otros 11 kits** | ⏳ Post-validación | Orden: Restore Therapy → Moisture Recovery + Plus → Perfect Blonde + Plus → Hydra Boost → SOS → Blonde Guard + Plus → Moisture & Shine → Restore & Shield |

---

## 🟠 NSCF — DEUDA TÉCNICA ACTIVA

| Tarea | Estado | Notas |
|-------|--------|-------|
| DY Fazza imagen + decisión 200ml vs 400ml | ⚠️ Bloquea bundle | NSCF-TR-013 · KT-104 |
| ~11 productos con traducción EN parcial (title/meta) | ⚠️ No bloqueante | Re-corrida targeted shopify-auto-translate cuando haya tiempo |
| SP metafield fix 3 productos | ⚠️ Cosmético | proxy route sp-fix-targeted pendiente |
| Shipping zones | ⚠️ 3/5 | Admin manual |
| EN La Ciencia page | ⚠️ fix pendiente | |
| Klaviyo image_url property | ⚠️ Verificar | Activity Feed → Checkout Started event |
| Judge.me automations | ⚠️ Activar | Settings → Automations → review request |
| CRO Checkout Bundle | ⏳ Bundle instalada sin config | Sprint dedicado |
| Crear metafield how_to_use_es/en + section theme | ⏳ Deuda técnica | Para migrar fallback <details> HTML a metafield dedicado |
| Re-run audit post-fixes | ⏳ Esperado ~160+/200 | Tras GA4 + flows + Bundle |
| **Ads — lanzamiento paid media** | ⏳ Post-audit | Meta + TikTok · resolver TikTok duplicado ANTES |

---

## 🟠 NSCF B2B

| Tarea | Estado |
|-------|--------|
| SEO-003 COLOR titles | ⚠️ fix pendiente |
| Language switcher B2B | ⚠️ pendiente implementar |

---

## 🟡 VOICE GENOME — Enrichment

| Tarea | Estado | Notas |
|-------|--------|-------|
| Capturar 3-5 audios adicionales de PO (consumer) | ⏳ | Para llevar po_consumer v0.6 → v1.0 mature |
| Capturar voice genome po_b2b | ⏳ | Patricia hablando con estilistas/distribuidoras — nuevo voice_id |
| Voice genome Sam (B2B + ejecutivo) | ⏳ | Para outputs en nombre de Unreal>ille |

---

## 🟡 PO SOCIAL — Sesión Dedicada (TBD)

| Tarea | Estado |
|-------|--------|
| Meta Developer App | ❌ Verificación teléfono bloqueada (Laura) |
| System User tokens UNRLVL-Orchestrator | ❌ Bloqueado hasta App |
| TikTok API tokens | ❌ |
| WABA configuración | ⏳ En progreso |

---

## 🟡 LEGAL / ESTRUCTURA

| Tarea | Estado |
|-------|--------|
| Stripe Atlas LLC Delaware | ❌ P1 · $500 |
| Joint venture Patricia Osorio | ⏳ Ver PARTNERSHIP_STRUCTURE |

---

## 🟡 AYRA — Sprint 0 (deadline: 5 Jun)

| Tarea | Estado |
|-------|--------|
| Crear repo unrlvl-ayra (privado) | ❌ |
| Crear proyecto Vercel unrlvl-ayra | ❌ |
| Configurar dominio ayra.unrealvillestudio.com | ❌ |
| CREATE SCHEMA ayra + 11 tablas en Supabase main | ❌ |
| Env vars Vercel: AYRA_HEALTH_SECRET · ANTHROPIC_API_KEY · SUPABASE_URL · SUPABASE_SERVICE_KEY | ❌ |

---

## 🟡 STUDIO / INFRA

| Tarea | Estado |
|-------|--------|
| luciensael.com DNS apuntar al deploy existente | ⏳ 10 min |
| XMMs: eliminar proyecto muerto + evaluar migración DDMV | ⚠️ |
| ImageLab fix (Vercel 50s timeout) | ⚠️ |
| shopify-auditor/SKILL.md actualizar a v3.5 | ⚠️ Dice v2.0 |
| BP_Brand_Context.md NSCF — crear en unrlvl-context | ⏳ Listado en SESSION_PROTOCOL, no existe |
| Update COPYLAB_NOTES.md con voice_genome system | ⏳ |
| Compliance soft pendiente: D7Herbal, DiamondDetails, VivoseMask, VizosCosmetics, PatriciaOsorio | ⏳ |
| Compliance setup completo: ForumPHs | 🔴 BLOCK |

---

## 🟢 PROFESSOR

| Tarea | Estado |
|-------|--------|
| Revisar 8 learnings sesión 2026-05-19 (approved_by_sam = false) | ⏳ |

---

## ✅ COMPLETADO RECIENTEMENTE

- **Voice Genome System** ✅ — 2026-05-19 · tabla brand_voice_genome · po_consumer v0.6 activo · L1.5 VOICE_GENOME_INJECTION en skill
- **product_description_b2c preset** ✅ — 2026-05-19 · creative_compatibility_rules + output_templates v1.2
- **content-pipeline SKILL v2.6** ✅ — 2026-05-19 · listo para commit
- **Restore Therapy Plus v4** ✅ — 2026-05-19 · generado con motor completo · pendiente aplicar a Shopify
- **Bug shopify-auto-translate** ✅ — resuelto 2026-05-15 (descubierto en auditoría 2026-05-19)
- **GA4 + GTM instalados** ✅ — 2026-05-19 · verificación pendiente
- **Instagram → Facebook Page vinculadas** ✅ — 2026-05-17
- **Domain verification neuronescflorida.com** ✅ — 2026-05-17 · Cloudflare TXT
- **DECISION_MATRIX + Professor System — Sprints 1-4** ✅ — 2026-05-17
- **Meta Pixel NSCF B2C** ✅ — 2026-05-17 · Pixel ID 1348252664025025 · todos los eventos
- **Klaviyo NSCF** ✅ — 2026-05-17 · 10 templates ES+EN · dominio verificado
- **Judge.me NSCF** ✅ — 2026-05-17 · dark theme · badge + widget
- **Kit Images 12/12** ✅ — 2026-05-10
- **Skills System v1.1** ✅ — 2026-05-10
- **SESSION_PROTOCOL v11** ✅ — 2026-05-10

---
_Regenerada: 2026-05-19 · ecosystem.json v11_
