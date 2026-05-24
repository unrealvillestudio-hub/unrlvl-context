# AGENDA — Unrealville Studio
_Versión: 2026-05-24-v14 · Actualizada por: Claude_

---

## 🔴 PRIORIDAD INMEDIATA

| # | Tarea | Estado | Notas |
|---|-------|--------|-------|
| 1 | **FPHs OPS: commit 3 API routes** | 🔴 BLOQUEA HOME | buildings + tracker + payments faltantes en repo |
| 2 | **TikTok Pixel DUPLICADO NSCF B2C** | 🔴 BLOQUEA ADS | Dos IDs activos en theme.liquid |
| 3 | **FPHs: Propuesta Star & Herald** | 🔴 URGENTE | IF debe aprobar → pasar a Mayra Paredes |
| 4 | **FPHs: Datos Ene–Abr IF** | 🔴 BLOQUEA BI+Tracker | mora_mensual + payments + eeff_preliminar = 0 rows |
| 5 | **FPHs: Speaks ANTHROPIC_API_KEY** | 🔴 Pendiente semanas | Supabase Secrets tajuoqdbnsnzkhyqvdgs |

---

## ✅ COMPLETADO 2026-05-22

| Item | Estado |
|---|---|
| Document Factory v2.0 | ✅ DEPLOYADO |
| ForumPHs OPS shell + Tracker V0 | ✅ DEPLOYADO |
| Home: lista PHs + dashboard inline por PH | ✅ listo para commit |
| Tracker: flujo guiado PH→Torre→Unidad→Acciones | ✅ listo para commit |
| `/api/units` — nuevo endpoint con tower filter | ✅ en repo |
| Professor checkpoint 4+5+6 — 17 learnings totales | ✅ |
| Bug fix tgfn_invalidate_brand_cache ecosistema | ✅ |
| ARBITER Master Plan v1.0 — diseño completo | ✅ 2026-05-24 |

---

## 🟠 FORUMPHS — PRÓXIMOS SPRINTS

| Sprint | Contenido | Fecha | Estado |
|---|---|---|---|
| **S2 activo** | OPS V2 commit + seed data + pruebas con IF | May-Jun | ⏳ 3 routes pendientes |
| **S3** | OPS Daily Workflow — checklist · GPS · foto | Jun 2026 | placeholder ✅ |
| **S4** | Communications + ADM Virtual · tickets · auth móvil | Jul 2026 | placeholder ✅ |

---

## 🟠 NSCF

| Tarea | Estado |
|-------|--------|
| TikTok Pixel duplicado — fix urgente | 🔴 BLOQUEA ADS |
| Restore Therapy Plus v4 en Shopify | ⏳ |
| Validar composición técnica kits con Patricia | ⏳ |
| Escalar voice + motor a 11 kits restantes | ⏳ post-validación |

---

## 🟡 AYRA — Sprint 0 (deadline 5 Jun 🔴)

| Tarea | Estado |
|-------|--------|
| Repo + Vercel unrlvl-ayra | ❌ |
| Schema ayra + 11 tablas Supabase | ❌ |
| PROFESSOR árbol navegable | ❌ |
| Migrar copylab_jobs → lab_jobs con lab_id | ❌ |

---

## 🔵 ARBITER — Decision Synthesis Engine _(activar cuando Sam lo indique, post-Ayra)_

> Documento maestro: `protocols/ARBITER_MASTER_PLAN.md`
> Decisión de activación: Sam · No hay deadline fijo · Excepción acordada al congelamiento de nuevos proyectos.

| Sprint | Contenido | Duración estimada | Estado |
|---|---|---|---|
| **ARBITER-0** | Repo + Vercel + dominio + schema Supabase (5 tablas) + seed inicial | 1 semana | ❌ Pendiente activación |
| **ARBITER-1** | ArbiterPromptBuilder — intake form + clasificador + pantalla revisión + Score C1 | 1 semana | ❌ |
| **ARBITER-2** | Motor de Debate — paneles T+S+R + cross-interrogation + Score C2 | 1.5 semanas | ❌ |
| **ARBITER-3** | Síntesis matricial + Score C3 + integración Professor + UI completa | 1 semana | ❌ |

**Pre-requisito duro:** Ayra Sprint 0 cerrado.
**Total estimado:** 4.5 semanas post-Ayra.
**URL destino:** `arbiter.unrealvillestudio.com`

**Componentes clave a recordar al activar:**
- ArbiterPromptBuilder con `arbiter_question_tree` gobernado por Sam en lenguaje humano
- Puntajes visibles en las 3 capas: Score C1 (prompt) · Score C2 (debate) · Score C3 (síntesis)
- Paneles heterogéneos: GPT-4o + Gemini + Llama 3 según dimensión T/S/R
- Claude solo entra en síntesis final (frío, sin ver el debate)
- `arbiter_outcomes` para calibración futura de pesos via Professor
- Verificar antes de Sprint-0: OpenAI API key · Gemini API key · Groq API key

---

## 🟡 STUDIO / INFRA

| Tarea | Estado |
|-------|--------|
| Stripe Atlas LLC Delaware | ❌ P1 · $500 |
| luciensael.com DNS | ⏳ 10 min |
| Compliance soft: D7Herbal, DiamondDetails, VivoseMask, VizosCosmetics, PatriciaOsorio | ⏳ |

---

_Regenerada: 2026-05-24-v14_
