# AGENDA — Unrealville Studio
_Actualizada: 2026-05-31 · v2026-05-31-v1 · Generada desde ecosystem.json_

---

## 🟢 LISTO PARA EJECUTAR — Claude Code

| # | Item | Marca | Acción |
|---|---|---|---|
| 1 | **luciensael.com** — repo GREENFIELD + Vercel + DNS | Lucien Sael | `claudecode: repo + deploy + DNS` |
| 2 | **UNRLVL Field Notes** — push a CoreProject | UNRLVL | `claudecode: push blog` |

---

## 🔴 CRÍTICO — Esta semana

| # | Item | Marca | Blocker |
|---|---|---|---|
| 3 | **IID FIX** — crear brand_voice_genome lucien_editorial v0.5 | Lucien Sael | Sin genoma → IID cae a fallback genérico |
| 4 | **IID FIX** — regenerar seeds #7/#8/#14 con voz correcta | Lucien Sael | Depende de #3 |
| 5 | **IID FIX** — re-test pipeline publicación (remover .limit(1), re-correr content-run-stage v22) | Lucien Sael | Depende de #3 |
| 6 | **Voice Genome Fase 5** — implementar en OnboardingApp (spec lista: VOICE_GENOME_PHASE_SPEC.md) | UNRLVL | Sin esto nuevas marcas no capturan voz editorial |
| 7 | **fphs-formalize sprint** — replicar calidad acta manual (98% Ivette). Comparar ACTA_No1-2026 vs ACTA_OR_1-2026 | ForumPHs | DF fragmenta intervenciones, 13 errores primera persona |
| 8 | **Verificar unidades Luxor 300** — si ≤127 unidades, regenerar acta con % correcto | ForumPHs | Acta actual usa 129 |
| 9 | **DF QA** — 3 votaciones faltantes + 13 errores primera persona | ForumPHs | Calidad acta |
| 10 | **Ayra Sprint 0** — deadline 5 Jun — crear repo + Vercel + schema + env vars | UNRLVL | Deadline duro 5 Jun |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 11 | **SocialLab dual-mode** — confirmar/implementar sync+async, re-test publicación post brand_id fix | UNRLVL |
| 12 | **Crear cuentas LinkedIn + X para Lucien** | Lucien Sael / Sam |
| 13 | **Context System refactor** — SESIÓN DEDICADA (plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md). Adelgazar ecosystem.json + crear CAPABILITIES.md. RIESGO ALTO — hacer con foco. | UNRLVL |
| 14 | **VideoLab launch** — integrar Kling.ai token + grabaciones Patricia para voice genome | UNRLVL |
| 15 | **TikTok Pixel duplicado NSCF** — resolver antes de ads | NeuroneSCF |
| 16 | **Meta MCP** — fix fb_get_page_insights métricas deprecadas Graph API v21 | UNRLVL |
| 17 | **Portal Iván sprint 2** — dashboard pendientes + UPS API (developer.ups.com) | NeuroneSCF |
| 18 | **Klaviyo flows NSCF** — configurar 4 flows bilingüe en UI | NeuroneSCF |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 19 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp (público o GitHub Pro) | UNRLVL |
| 20 | Normalizar convención nombres UnrealvilleStudio vs UNREALville en meta_accounts | UNRLVL |
| 21 | NSCF blog — Reescritura 4 artículos con L0+L3 HUMANIZE EMOTIONAL | NeuroneSCF |
| 22 | NSCF Dispatch Portal — crear proyecto Vercel nscf-dispatch + DNS Cloudflare CNAME | NeuroneSCF |
| 23 | Ecosystem Tools SESIÓN DEDICADA — MCPs + Skills + Agents + AgentLab orquestación multimarca | UNRLVL |

---

## ✅ Resuelto recientemente

- ✅ **luciensael.com blog** construido (home+blog+1 artículo molde bilingüe) — 2026-05-31
- ✅ **UNRLVL Field Notes** construido (índice + artículo molde, estética terminal) — 2026-05-31
- ✅ **FIX publicación v22** — insertada fila meta_accounts brand_id=UnrealvilleStudio — 2026-05-31
- ✅ **lab_jobs.status** constraint ya incluye 'published' — 2026-05-31
- ✅ **NeuroneSCF** en meta_accounts (era blocker fantasma — ya estaba) — verificado 2026-05-31
- ✅ **IID diagnóstico completo** — causa raíz identificada (sin voice genome) — 2026-05-31
- ✅ **Limpieza IID queue** — 37 lucien/mathematical rejected, queue de 204→150 — 2026-05-31
- ✅ **Staging workflow** — branch protection + PR template + WORKFLOW.md en 15 repos — 2026-05-30
- ✅ **DF Pipeline OPERACIONAL** — upload→parse→preflight→formalize→generate→QA→ICR→download — 2026-05-30
- ✅ **Meta MCP LIVE** — UNREALville + NSCF tokens activos — 2026-05-29
- ✅ **Pipeline End-to-End OPERACIONAL** — primer post publicado IG+FB — 2026-05-29
- ✅ **NSCF Fulfillment Portal** — v2 LIVE con Iván — 2026-05-29

---

## Notas de contexto

**IID Subsystem:** Research vivo (iid_cron_runs 137 runs, diario). Ejecución congelada desde 26-abr. content-run-stage v22 ya reescrita con timeout 65s pero nunca re-corrida en limpio. Hallazgo raíz: LucienSael SIN brand_voice_genome. Fix secuencial: genoma → seeds → re-test.

**Voice Genome:** `brand_voice_genome` es tabla que YA EXISTE. OnboardingApp Fase 5 la puebla vía UI. Para LucienSael puede hacerse vía rama "Voz Diseñada" del spec (no requiere audios — diseño editorial directo).

**SocialLab dual-mode:** Test b93627b6 no publicó por brand_id mismatch (ya resuelto). Re-test simple: crear job → verificar que SocialLab recibe y publica. Confirmar que acepta disparo desde Orchestrator (async) Y desde UI (sync).

**Context System refactor:** Plan disponible en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md (pendiente crear si no existe). Objetivo: ecosystem.json más delgado + CAPABILITIES.md separado. RIESGO ALTO — requiere sesión dedicada sin otros sprints mezclados.

**Ayra Sprint 0 🔴:** lab_jobs + lab_configs YA EXISTEN en prod — scope más pequeño. Pendiente: repo + Vercel + schema ayra + PROFESSOR árbol + env vars. Deadline: 5 Jun 2026.
