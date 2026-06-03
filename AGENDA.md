# AGENDA — Unrealville Studio
_Actualizada: 2026-06-02 · v2026-06-02-v1 · Generada desde ecosystem.json_

---

## 🟢 LISTO PARA EJECUTAR — Claude Code

| # | Item | Marca | Acción |
|---|---|---|---|
| 1 | **luciensael.com** — repo GREENFIELD + Vercel + DNS | Lucien Sael | `claudecode: repo + deploy + DNS` |
| 2 | **UNRLVL Field Notes** — push a CoreProject | UNRLVL | `claudecode: push blog` |
| 3 | **brands/SamPublisher/** — crear carpeta + push brand.json + session_log.md | SamPublisher | `claudecode: mkdir + push 2 archivos` |

---

## 🔴 CRÍTICO — Esta semana

| # | Item | Marca | Blocker |
|---|---|---|---|
| 4 | **IID FIX** — regenerar seeds #7/#8/#14 con voz correcta (lucien_editorial v0.5 YA existe) | Lucien Sael | Desbloqueado — genoma existe desde 06-01 |
| 5 | **IID FIX** — re-test pipeline publicación (remover .limit(1), re-correr content-run-stage v22) | Lucien Sael | Depende de #4 |
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
| 12 | **Crear cuentas LinkedIn + X para Lucien** + **Meta(FB) + LinkedIn para SamPublisher** | Lucien Sael / SamPublisher |
| 13 | **Context System refactor** — SESIÓN DEDICADA (plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md). Adelgazar ecosystem.json + crear CAPABILITIES.md. RIESGO ALTO — hacer con foco. | UNRLVL |
| 14 | **VideoLab launch** — integrar Kling.ai token + grabaciones Patricia para voice genome | UNRLVL |
| 15 | **TikTok Pixel duplicado NSCF** — resolver antes de ads | NeuroneSCF |
| 16 | **Meta MCP** — fix fb_get_page_insights métricas deprecadas Graph API v21 | UNRLVL |
| 17 | **Portal Iván sprint 2** — dashboard pendientes + UPS API (developer.ups.com) | NeuroneSCF |
| 18 | **Klaviyo flows NSCF** — configurar 4 flows bilingüe en UI | NeuroneSCF |
| 19 | **Genoma UNRLVL social** — voz "we" con mismo modo vocería que sam_personal | UNRLVL |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 20 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp (público o GitHub Pro) | UNRLVL |
| 21 | Normalizar convención nombres UnrealvilleStudio vs UNREALville en meta_accounts | UNRLVL |
| 22 | NSCF blog — Reescritura 4 artículos con L0+L3 HUMANIZE EMOTIONAL | NeuroneSCF |
| 23 | NSCF Dispatch Portal — crear proyecto Vercel nscf-dispatch + DNS Cloudflare CNAME | NeuroneSCF |
| 24 | Ecosystem Tools SESIÓN DEDICADA — MCPs + Skills + Agents + AgentLab orquestación multimarca | UNRLVL |
| 25 | **GRAN BLOQUE SocialLab/IID** — diagnosticar SocialLab → flujos IID con matriz de canales + regla de variabilidad de publicación (no siempre enlazar afuera) → testing → calendario → producción ICR → recién entonces integrar clientes (NSCF, FPHs) | UNRLVL |
| 26 | **lucien_video** (cuando VideoLab/Kling.ai) — gobierna guion hablado de TikTok/Reels | Lucien Sael |
| 27 | Validar genomas v0.5 contra outputs reales → promover a v1.0 (lucien_editorial, lucien_social, sam_personal) | Lucien / SamPublisher |

---

## ✅ Resuelto recientemente

- ✅ **Genoma SamPublisher** (sam_personal v0.5) creado — voz pública + modo vocero, 4º genoma del ecosistema propio — 2026-06-02
- ✅ **SamPublisher health** yellow → green (genoma existe) — 2026-06-02
- ✅ **Deuda Lucien** — nota fantasma "brands table did not return a row" eliminada de lucien_editorial.notes — 2026-06-02
- ✅ **Genoma lucien_social** (v0.5) creado — voz corta/reactiva, ≤280, terreno propio — 2026-06-02
- ✅ **Genoma lucien_editorial** (v0.5) creado — desbloquea IID — 2026-06-01
- ✅ **luciensael.com blog** construido (home+blog+1 artículo molde bilingüe) — 2026-05-31
- ✅ **UNRLVL Field Notes** construido (índice + artículo molde, estética terminal) — 2026-05-31
- ✅ **FIX publicación v22** — insertada fila meta_accounts brand_id=UnrealvilleStudio — 2026-05-31
- ✅ **IID diagnóstico completo** — causa raíz identificada (sin voice genome) — 2026-05-31
- ✅ **Meta MCP LIVE** — UNREALville + NSCF tokens activos — 2026-05-29
- ✅ **Pipeline End-to-End OPERACIONAL** — primer post publicado IG+FB — 2026-05-29

---

## Notas de contexto

**Genomas del ecosistema propio (estado 2026-06-02):** 4 genomas activos en `brand_voice_genome` — `unrlvl_default` v1.0 (we/infraestructura), `lucien_editorial` v0.5 (ensayo/filo que respira), `lucien_social` v0.5 (golpe corto ≤280), `sam_personal` v0.5 (practicante que reflexiona + vocero). Modo vocería de Sam cita a Lucien por destino del enlace (social vs editorial). Pendiente: genoma UNRLVL social (mismo modo vocería, voz "we").

**SamPublisher:** persona publicadora, NO el humano Sam. Canales Meta(FB)+LinkedIn (cuentas pendientes de crear). Territorio propio (own_craft/own_thesis/own_trajectory) + vocería. Línea roja dura: nunca vende (eso es UNRLVL); no toca religión (válvula = Lucien). Carpeta brands/SamPublisher/ pendiente de push (ítem #3).

**IID Subsystem:** Research vivo (iid_cron_runs diario). Ejecución congelada desde 26-abr. content-run-stage v22 reescrita con timeout 65s pero nunca re-corrida en limpio. Causa raíz (sin genoma) YA RESUELTA para Lucien. Fix restante: regenerar seeds → re-test.

**Estado publicación (dato Sam 06-01):** Meta + TikTok publican vía Orchestrator probado para UNREALville. LucienSael y SamPublisher NO probados end-to-end. Matiza "ejecución congelada": UNRLVL sí sale; Lucien y Sam son lo no probado. Antes del primer publish de cada uno por pipeline: verificar/insertar fila en meta_accounts (pre-empt del blocker brand_id visto en test b93627b6).

**Context System refactor:** Plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md. Objetivo: ecosystem.json más delgado + CAPABILITIES.md separado. RIESGO ALTO — sesión dedicada. Tocará ecosystem.md + ecosystem_filemap.md (regen completa pendiente — ver nota de Actualiza 06-02).

**Ayra Sprint 0 🔴:** lab_jobs + lab_configs YA EXISTEN en prod. Pendiente: repo + Vercel + schema ayra + PROFESSOR árbol + env vars. Deadline: 5 Jun 2026.
