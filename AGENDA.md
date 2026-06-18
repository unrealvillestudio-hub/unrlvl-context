# AGENDA — Unrealville Studio
_Actualizada: 2026-06-18 · v2026-06-18-v1 (#5h-#5l RESUELTOS · Lote A IID Output Quality cerrado · §5.4 verificado-por-deploy, gatillo en #5b · #5i abierto para sesión nanométrica)_

---

## 🟢 LISTO PARA EJECUTAR — Claude Code

| # | Item | Marca | Acción |
|---|---|---|---|
| 1 | **luciensael.com** — repo GREENFIELD + Vercel + DNS | Lucien Sael | `claudecode: repo + deploy + DNS` |
| 2 | **UNRLVL Field Notes** — push a CoreProject | UNRLVL | `claudecode: push blog` |

---

## 🔴 CRÍTICO — Esta semana

### IID — Calidad de output

El motor end-to-end está validado (#5b ✅). **Lote A (#5h, #5j, #5k, #5l) cerrado 2026-06-18.** Queda #5i (rango de Lucien) como sesión dedicada nanométrica.

| # | Item | Marca | Prioridad |
|---|---|---|---|
| 5i | **Angle de Lucien sobre-especificado = fórmula.** "Geometría del pensamiento" + "malnombrar" se volvió regla dura: Lucien SIEMPRE sale igual, no se ve `psychological` u otras facetas. Rebalancear angle (por-dominio) vs genoma (core_move) para dar **rango** a Lucien sin perder identidad. **SESIÓN DEDICADA NANOMÉTRICA — base de aprendizaje de creación de genomas multimarca. Tuning completo a Professor sin dejar nada fuera.** Liga con 5c (IID propios de Lucien). | Lucien Sael | 🔴 ALTA |

### Resto crítico

| # | Item | Marca | Blocker |
|---|---|---|---|
| 5b | **IID — Publicación real (push a Meta)** — FASE SIGUIENTE, CHAT DEDICADO. Verificar cuentas Meta de Lucien/SamPublisher (no probadas E2E) antes del primer push de cada marca. **Aquí se gatilla y valida §5.4 (move-to-permanent temp/→permanent/), cuyo código ya está live (approve-piece v14).** Modo c2 respetado en piloto (no se publicó). | Lucien/UNRLVL | Cuentas Meta sin verificar E2E |
| 6 | **Voice Genome Fase 5** — implementar en OnboardingApp (spec lista: VOICE_GENOME_PHASE_SPEC.md). **Considerar capturar `signature_closer` por voz en la Fase (hoy se escribe a mano en application_constraints).** | UNRLVL | Sin esto nuevas marcas no capturan voz editorial |
| 7 | **fphs-formalize sprint** — replicar calidad acta manual (98% Ivette) | ForumPHs | DF fragmenta intervenciones, 13 errores primera persona |
| 8 | **Verificar unidades Luxor 300** — si ≤127, regenerar acta con % correcto | ForumPHs | Acta usa 129 |
| 9 | **DF QA** — 3 votaciones faltantes + 13 errores primera persona | ForumPHs | Calidad acta |
| 10 | **Ayra Sprint 0** — ⚠️ VENCIDO (5 Jun) — repo + Vercel + schema + env vars | UNRLVL | Reprogramar. Enfoque staging-loop (Notas). |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 5c | **IID — IID propios de Lucien** — materia filosófica (ai-cognition/ai-identity/human-essence) hoy SIN agentes IID dedicados. Sesión de diseño. Liga con 5i (rango de Lucien). | Lucien Sael |
| 5d | **IID — Destino de los 14 IID-* viejos** — reasignar a UNRLVL/Sam o descartar. | UNRLVL |
| 5e | **IID — Scheduler R4B** — jitter + desfase + crescendo (lee cadence/rollout_phase). Migra gate1/5 del Watcher a pgvector; gates 2/3 de informativos a bloqueantes; extrae los 6 gates a EF `content-watcher` (C2). **Deuda R4B asociada: timeouts para editorial largo (~90s). [base64→Storage YA resuelto en Lote A #5j.]** | UNRLVL |
| 5f | **IID — Quitar `.limit(1)` de content-dispatcher** — SOLO tras publicación real validada. Cadáveres cuarentenados (06-16). | UNRLVL |
| 5g | **IID — Promover `domain` a columna** en orchestrator_jobs + content_pieces (hoy viaja en assets.builder_input.domain). R4B. | UNRLVL |
| 5m | **IID — Borrar EFs efímeras** del dashboard Supabase: `model-ping`, `env-probe`, `resend-test` (neutralizadas como stubs 410, falta borrarlas). | UNRLVL |
| 5n | **IID — Barrer `to: sam@` hardcodeado** en otras EFs (SMA FPHs, nscf-mailer, etc.) y decidir cuáles migran a alias por función (`content-approval@` u otros). | UNRLVL/multi |
| 12 | **NSCF-Console Fase 3** — superuser console con roles por auth. Prerrequisito Resend hardening hecho. PRÓXIMO FOCO NSCF. | NeuroneSCF |
| 13 | **NSCF Sesión Shopify infra** — app commerce dedicada (`write_customers`...). Fase 2.5 PARQUEADA. SESIÓN DEDICADA. | NeuroneSCF |
| 14 | **SocialLab dual-mode** — confirmar sync+async, re-test post brand_id fix | UNRLVL |
| 15 | **Crear cuentas LinkedIn + X (Lucien) + Meta(FB) + LinkedIn (SamPublisher)** | Lucien/SamPublisher |
| 16 | **Context System refactor** — SESIÓN DEDICADA (CONTEXT_SYSTEM_REFACTOR_PLAN.md). RIESGO ALTO. | UNRLVL |
| 17 | **VideoLab launch** — Kling.ai token + grabaciones Patricia | UNRLVL |
| 18 | **TikTok Pixel duplicado NSCF** | NeuroneSCF |
| 19 | **Meta MCP** — fix fb_get_page_insights métricas deprecadas v21 | UNRLVL |
| 20 | **Portal Iván sprint 2** — dashboard + UPS API | NeuroneSCF |
| 21 | **Klaviyo flows NSCF** — 4 flows bilingüe | NeuroneSCF |
| 40 | **Klaviyo key hardcodeada** — `pk_UNF8Ee…` en klaviyo-setup → secret + rotar. | NeuroneSCF |
| 41 | **Verificar exposición keys Resend** — FPHS_RESEND_API_KEY + RESEND_API_KEY no en claro. | ForumPHs/UNRLVL |
| 42 | **IID — model ID hardcodeado (deuda latente)** — content-run-stage usa `claude-sonnet-4-6` hardcodeado. Considerar leerlo de config/secret. **13 EFs one-off (shopify/seo/nscf) aún en modelo retirado — arreglar cuando se use cada una.** | UNRLVL/NeuroneSCF |
| 22 | **Genoma UNRLVL social** — voz "we" con modo vocería de sam_personal | UNRLVL |
| 23 | **SMA pulido (opcional)** — hints viejos del front | ForumPHs |
| 24 | **Email marketing FPHs** — stack Resend + Supabase + Orchestrator. **NOTA: cada marca su propia key Resend dedicada (lección 06-17, key cruzada NSCF/UNRLVL causó 403).** | ForumPHs |
| 25 | **ForumPHs — creación cuentas** — número panameño → WhatsApp Business | ForumPHs |
| 35 | **CLAUDE.md — completar repos restantes** | UNRLVL |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp | UNRLVL |
| 28 | NSCF blog — Reescritura 4 artículos L0+L3 | NeuroneSCF |
| 29 | NSCF Dispatch Portal — proyecto Vercel + DNS | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA | UNRLVL |
| 31 | **GRAN BLOQUE SocialLab/IID** — canales/calendario/clientes (el motor de generación ya está resuelto: Builder+Watcher+output-quality). Integrar NSCF/FPHs tras calidad de output cerrada. | UNRLVL |
| 32 | **lucien_video** (cuando VideoLab) | Lucien Sael |
| 33 | Validar genomas v0.5 → v1.0. **lucien_editorial v0.5 y unrlvl_default v1.0 ya produjeron output real validado (#5b + Lote A).** | Lucien/SamPublisher |
| 34 | **unrlvl-CRM multimarca** (ESTRATÉGICO) | UNRLVL |
| 36 | **unrlvl-SMA multimarca** (ESTRATÉGICO) | UNRLVL |
| 37 | **Drift detector** (ESTRATÉGICO) — skill ecosystem-auditor. **Drifts conocidos: shopify.stores VIEW→BASE TABLE; /api/professor ya existe; content-run-stage comentario vs runtime (ahora v35); fphs_institucional v0.5 no listado en ecosystem.json; cron unrlvl-media documentado-7 vs runtime-60→12 (06-18); `get_edge_function` resultó LEGIBLE (no ESZIP) — revisar aprendizaje histórico.** | UNRLVL |
| 38 | **Reconciliación ecosystem_graph** — audit contextual dedicado | UNRLVL |
| 39 | **Revisar `.github/CLAUDE.md` repetido** + limpiar desktop.ini en forumphs-speaks | UNRLVL |

---

## ✅ Resuelto recientemente

- ✅ **IID OUTPUT QUALITY LOTE A CERRADO** (06-18). #5h #5j #5k #5l + cron resueltos end-to-end con verificación live. `content-run-stage` v34→v35, `approve-piece` v13→v14 (ambos in-place, re-fetch byte-idéntico, Ruta B, sin auto-merge, `.limit(1)` intacto). Detalle: (a) **#5j** imagen Vertex → `unrlvl-media/temp/{brand}/{piece_id}/{ts}.png` URL pública CDN + `storage_path`, sin base64 (causa raíz: la reescritura v25→v34 desconectó el upload que ya existía desde mayo); (b) **#5h** `assets.copy.title` separado, 3 títulos distintos para el mismo finding, similarity UNRLVL↔Lucien 0.31; (c) **#5k** firma leída del genoma (`signature_closer`) y estampada determinística tras Watcher PASS (no por prompt, porque AIFE reescribe el cuerpo) — `❯ Unrealville Studio` / `--- LucienSael: Builder, Thinker, Operator`; (d) **#5l** `resend_id` (UUID, no `re_…`) persistido en pieza Y job, email real a `content-approval@`; (e) **cron 32** 60→12 días; (f) **D1** piece_id pre-generado = PK explícito (trazabilidad 1:1 con storage). **§5.4 (move-to-permanent) verificado-por-deploy; gatillo live diferido a #5b.** Spec: `protocols/IID_OUTPUT_QUALITY_LOTE_A_SPEC.md` (+ addendum de correcciones de realidad). 2 errores del spec corregidos por CC al leer la fuente: §2.2 (piece_id no existe en imagelab → pre-gen UUID) y §5.2 (publish vive en `approve-piece`, no Orchestrator). Firmas escritas al genoma por Claude (chat) la misma sesión. — 2026-06-18
- ✅ **IID #5b VALIDADO end-to-end** (06-17). RUN4: Lucien + UNRLVL atravesaron los 5 stages (incl. imagelab Vertex) + Watcher PASS + email real a `content-approval@`. Modo c2 (sin push a Meta). El piloto destapó y se arreglaron 5 fallos ocultos: (1) model ID retirado en 24 EFs — 9 de flujo vivo arregladas a claude-sonnet-4-6; (2) imagelab redirigido de fal.ai → Vertex/crédito Google; (3) gate evidence de has_numbers → semántico; (4) email mudo por key cruzada NSCF/UNRLVL → RESEND_UNRLVL_KEY dedicada + try/catch; (5) Builder UNRLVL alucinaba métricas → regla de procedencia de cifras. `content-run-stage` v25→v33. Contrato de voice afinado en brand_topics (proof_mode + 2 angles) sin tocar genomas. Quedan pendientes de CALIDAD de output (#5h-5l). — 2026-06-17
- ✅ **IID Builder Convergido + Watcher LIVE** (06-16). `content-run-stage` v25→v31: Builder `buildFromGenome` (lee brand_topics + genoma, voz híbrida, mató fallback silencioso) + Watcher 6 gates + `intel.watcher_log`. Divergencia 0.07 validada. Causa raíz del freeze de abril: model ID retirado. — 2026-06-16
- ✅ **IID — Cuarentena 293 cadáveres** de iid_content_queue → failed + ARCHIVED_LEGACY_20260616. — 2026-06-16
- ✅ **IID — angle Lucien/ai-cognition poblado**, luego afinado a "geometría del pensamiento" (06-17). — 2026-06-16/17
- ✅ **NSCF Resend hardening** (key → secret, rotada, nscf-mailer v23 versionada). — 2026-06-16
- ✅ **NSCF-Console Fase 2** (EF nscf-b2b-approve + nscf-mailer v19 + frontend + RLS). LIVE console-pro-neuronescf.vercel.app. — 2026-06-13
- ✅ **NSCF PR #2 (pro-gateway Fase 1)** + **Sales Pager Salones v18**. — 2026-06-13
- ✅ **CLAUDE.md críticos + ecosystem_graph corregido + protocolos en custom instructions + EXPORT_SECRET limpieza + Professor 18 learnings**. — 2026-06-08
- ✅ **SMA reapuntado a ForumPHs** (operativo, roles, PRs #1/#2). — 2026-06-06
- ✅ **Gobernanza CC** (CC_PROTOCOL + SESSION_PROTOCOL v16) + **session_log NSCF restaurado**. — 2026-06-06/07
- ✅ **Skill voice-reference-extractor v1.0** + **brands/SamPublisher/** + **INDEX v1.4**. — 2026-06-05
- ✅ **Genomas:** sam_personal v0.5, lucien_social v0.5, lucien_editorial v0.5. — 2026-06-01/02
- ✅ **luciensael.com blog + UNRLVL Field Notes construidos + FIX publicación v22 + IID diagnóstico + Meta MCP LIVE + Pipeline E2E primer post**. — 2026-05-29/31

---

## Notas de contexto

**IID — estado 2026-06-18 (motor validado, Lote A de calidad cerrado, #5i pendiente):**
Pipeline vivo en 3 EFs: `content-dispatcher` v22 (`.limit(1)` intacto) → `content-run-stage` **v35** (Builder convergido stage 1 + aife/imagelab-Vertex→Storage CDN/sociallab + Watcher stage 5 + firma determinística + title separado) → `approve-piece` **v14** (publish a Meta + move-to-permanent en branch publishOk). Modelo `claude-sonnet-4-6`. Email vía `RESEND_UNRLVL_KEY` a `content-approval@unrealvillestudio.com`. Imagen ahora en `unrlvl-media` CDN (no base64). `domain` en assets.builder_input. **FLUJO + CALIDAD de output cerrados. Pendiente: #5i (rango de Lucien) y el primer publish real a Meta (#5b) que gatilla §5.4.** Specs: protocols/BUILDER_CONVERGED_SPEC.md, WATCHER_SPEC.md, IID_OUTPUT_QUALITY_LOTE_A_SPEC.md, DRYRUN_PLAN_IID_PILOT.md.

**Firmas de cierre (06-18):** viven en `brand_voice_genome.application_constraints.signature_closer {text, rule}` — una sola fuente de verdad, leída por `loadVoiceGenome`, estampada determinísticamente en finalizePiece tras Watcher PASS (no por prompt: AIFE reescribe el cuerpo). `unrlvl_default` → `❯ Unrealville Studio` (glifo U+276F, NO ASCII `>`). `lucien_editorial` + `lucien_social` → `--- LucienSael: Builder, Thinker, Operator` (idéntica en ambas: firma la persona, no el registro). Constante por marca, divergente entre hermanas (refuerza #5h anti-autobaneo).

**Storage IID (06-18):** imagen nace en `unrlvl-media/temp/{brand}/{piece_id}/{ts}.png` (URL pública CDN, plan Pro 100GB). Cron jobid 32 (`unrlvl-media-temp-cleanup`, 3am UTC) borra `temp/%` >12 días. Al publicar a Meta (publishOk) → move a `permanent/{brand}/{piece_id}/{ts}.png` (no lo toca el cron) para reutilización/SignalLab. Decisión: move al PUBLICAR, no al aprobar ("funcionó"="se publicó").

**Correcciones de spec por fuente real (06-18, GOVERNANCE):** un spec escrito sin acceso al código produjo 2 suposiciones que CC corrigió al leer la EF deployada: (1) piece_id no existe en stage imagelab → pre-generar UUID en copylab como PK explícito; (2) el publish a Meta vive en `approve-piece` (no Orchestrator). Además `get_edge_function` resultó LEGIBLE (no ESZIP como decía el aprendizaje histórico) — revisar vigencia. Principio: el ejecutor con fuente real tiene licencia para corregir el spec.

**Contrato de voice (afinado 06-17):** "matemático" en UNRLVL = profundidad de comprensión de la maquinaria, NO dígitos obligatorios. Regla de procedencia de cifras: cifra real (preferir las del finding) > mecánica exacta sin número > nunca inventar, sin hedge. Lucien = geometría del pensamiento / el malnombrar (OJO #5i: se volvió fórmula, falta rango). Gate evidence = semántico, lee proof_mode. Genomas intactos.

**Secrets Resend (lección 06-17):** cada marca su propia cuenta/key. `RESEND_API_KEY` = NeuroneSCF. `RESEND_UNRLVL_KEY` = UNRLVL (operativa, email enviado 06-18). FPHs tendrá la suya. Nunca compartir secret entre marcas.

**Patrón "reescritura de EF no hereda side-effects del flujo viejo" (06-18):** la reescritura v25→v34 desconectó el upload a Storage que existía desde mayo. Tras reescribir una EF, auditar explícitamente que TODOS los side-effects (uploads, moves, persistencias) se portaron — no asumir herencia. Suma a "artefacto nuevo sin permisos = fallo silencioso" + "I/O externo sin try/catch = fallo mudo".

**Patrón "match-exacto se estampa por código, no por prompt" (06-18):** glifos/firmas/tokens que requieren output exacto y pasan por una capa de reescritura intermedia (AIFE) se estampan determinísticamente en el chokepoint final, idempotente. Confiar en el prompt del LLM no garantiza el match.

**Model IDs (lección 06-16/17):** se retiran durante el año. `claude-sonnet-4-20250514` retirado 15-jun congeló 24 EFs. Patrón: cuando uno se retira, barrer TODO el ecosistema. 13 one-off pendientes (#42).

**NSCF-Console (06-13):** Fase 1+2 LIVE. Shopify customer manual (Fase 2.5 parqueada). nscf-mailer v27.

**Ayra — staging-loop (06-13):** CC construye en staging, criterios objetivos por fase, Claude audita.

**Genomas del ecosistema (06-18):** unrlvl_default v1.0, lucien_editorial v0.5, lucien_social v0.5, sam_personal v0.5, fphs_institucional v0.5 (drift: no listado en ecosystem.json). Todos con `signature_closer` salvo sam_personal/fphs (poblar cuando se usen). lucien_editorial + unrlvl_default con output real validado.

**SamPublisher:** persona publicadora. Canales Meta(FB)+LinkedIn (pendientes). No vende, no toca religión.

**Estado publicación:** UNREALville probado E2E. LucienSael y SamPublisher NO probados E2E — verificar meta_accounts antes del primer publish de cada uno (liga #5b publicación real, que gatilla §5.4 move-to-permanent).

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
