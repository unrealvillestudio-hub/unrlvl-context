# AGENDA — Unrealville Studio
_Actualizada: 2026-06-17 · v2026-06-17-v1 (#5b VALIDADO end-to-end · pendientes de calidad de output)_

---

## 🟢 LISTO PARA EJECUTAR — Claude Code

| # | Item | Marca | Acción |
|---|---|---|---|
| 1 | **luciensael.com** — repo GREENFIELD + Vercel + DNS | Lucien Sael | `claudecode: repo + deploy + DNS` |
| 2 | **UNRLVL Field Notes** — push a CoreProject | UNRLVL | `claudecode: push blog` |

---

## 🔴 CRÍTICO — Esta semana

### IID — Calidad de output (NUEVO 06-17: el flujo funciona, los outputs necesitan trabajo)
El motor end-to-end está validado (#5b ✅). Estos son problemas de CALIDAD del contenido generado, capa distinta del flujo. Sesión(es) dedicada(s).

| # | Item | Marca | Prioridad |
|---|---|---|---|
| 5h | **Title compartido delata a las hermanas.** Ambas piezas usan el title del finding crudo; el cuerpo diverge (0.07) pero el title las relaciona → anti-autobaneo comprometido. El Builder debe generar **title propio por marca**. | UNRLVL/Lucien | 🔴 ALTA |
| 5i | **Angle de Lucien sobre-especificado = fórmula.** "Geometría del pensamiento" + "malnombrar" se volvió regla dura: Lucien SIEMPRE sale igual, no se ve `psychological` u otras facetas. Rebalancear angle (por-dominio) vs genoma (core_move) para dar **rango** a Lucien sin perder identidad. | Lucien Sael | 🔴 ALTA |
| 5j | **Email no muestra imagen ni copy completo.** base64 inline stripeado por Gmail; copy truncado en `buildEmail`. Fix template: subir imagen a Storage + copy completo o link. | UNRLVL | 🟡 |
| 5k | **Markdown crudo visible** en outputs (`**> Forward.**` con asteriscos). El render no procesa markdown. | UNRLVL | 🟡 |
| 5l | **resend_id null en la pieza** aunque email_sent=true (se guarda en job, no en pieza). Capturar id de Resend en `content_pieces`. | UNRLVL | 🟢 |

### Resto crítico

| # | Item | Marca | Blocker |
|---|---|---|---|
| 5b | **IID — Publicación real (push a Meta)** — FASE SIGUIENTE, CHAT DEDICADO. Verificar cuentas Meta de Lucien/SamPublisher (no probadas E2E) antes del primer push de cada marca. Modo c2 respetado en piloto (no se publicó). | Lucien/UNRLVL | Cuentas Meta sin verificar E2E |
| 6 | **Voice Genome Fase 5** — implementar en OnboardingApp (spec lista: VOICE_GENOME_PHASE_SPEC.md) | UNRLVL | Sin esto nuevas marcas no capturan voz editorial |
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
| 5e | **IID — Scheduler R4B** — jitter + desfase + crescendo (lee cadence/rollout_phase). Migra gate1/5 del Watcher a pgvector; gates 2/3 de informativos a bloqueantes; extrae los 6 gates a EF `content-watcher` (C2). **Deuda R4B asociada: base64 imagen → Storage; timeouts para editorial largo (~90s).** | UNRLVL |
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
| 33 | Validar genomas v0.5 → v1.0. **lucien_editorial v0.5 y unrlvl_default v1.0 ya produjeron output real validado (#5b).** | Lucien/SamPublisher |
| 34 | **unrlvl-CRM multimarca** (ESTRATÉGICO) | UNRLVL |
| 36 | **unrlvl-SMA multimarca** (ESTRATÉGICO) | UNRLVL |
| 37 | **Drift detector** (ESTRATÉGICO) — skill ecosystem-auditor. **Drifts: shopify.stores VIEW→BASE TABLE; /api/professor ya existe; content-run-stage comentario vs runtime (v33); fphs_institucional v0.5 no listado en ecosystem.json.** | UNRLVL |
| 38 | **Reconciliación ecosystem_graph** — audit contextual dedicado | UNRLVL |
| 39 | **Revisar `.github/CLAUDE.md` repetido** + limpiar desktop.ini en forumphs-speaks | UNRLVL |

---

## ✅ Resuelto recientemente

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

**IID — estado 2026-06-17 (motor validado, calidad pendiente):**
Pipeline vivo en 3 EFs: `content-dispatcher` v21 (`.limit(1)` intacto) → `content-run-stage` v33 (Builder convergido stage 1 + aife/imagelab-Vertex/sociallab + Watcher stage 5). Modelo `claude-sonnet-4-6`. Email vía `RESEND_UNRLVL_KEY` (dedicada UNRLVL) a `content-approval@unrealvillestudio.com`. `domain` en assets.builder_input. Guard dry-run en builder_meta.dry_run_stopped. **El FLUJO funciona end-to-end; lo pendiente es CALIDAD de output (#5h-5l): title por marca, rango de Lucien, email con imagen+copy completo, markdown render.** Specs: protocols/BUILDER_CONVERGED_SPEC.md, WATCHER_SPEC.md, DRYRUN_PLAN_IID_PILOT.md.

**Contrato de voice (afinado 06-17):** "matemático" en UNRLVL = profundidad de comprensión de la maquinaria, NO dígitos obligatorios. Regla de procedencia de cifras: cifra real (preferir las del finding) > mecánica exacta sin número > nunca inventar, sin hedge. Lucien = geometría del pensamiento / el malnombrar (OJO #5i: se volvió fórmula, falta rango). Gate evidence = semántico, lee proof_mode. Genomas intactos (la caricatura numérica nunca estuvo en el genoma; estaba en angles + proof_mode + gate).

**Secrets Resend (lección 06-17):** cada marca su propia cuenta/key. `RESEND_API_KEY` = NeuroneSCF (no tocar, la usa nscf-mailer). `RESEND_UNRLVL_KEY` = UNRLVL (unrealvillestudio.com verificado). FPHs tendrá la suya. Nunca compartir secret entre marcas.

**Patrón "artefacto nuevo sin permisos = fallo silencioso" + "I/O externo sin try/catch = fallo mudo" (confirmados 06-16/17):** tabla nueva = GRANT + reload cache en la misma migración; todo INSERT/fetch externo en try/catch con captura a error_log; antes de ampliar enum/CHECK estático preguntar si debería existir.

**Model IDs (lección 06-16/17):** se retiran durante el año. `claude-sonnet-4-20250514` retirado 15-jun congeló 24 EFs. Patrón: cuando uno se retira, barrer TODO el ecosistema. labelClaudeError ahora etiqueta el motivo (CLAUDE_MODEL_RETIRED/AUTH/RATE/OVERLOAD) en las EFs arregladas. 13 one-off pendientes (#42).

**NSCF-Console (06-13):** Fase 1+2 LIVE. Shopify customer manual (Fase 2.5 parqueada). nscf-mailer v24.

**Ayra — staging-loop (06-13):** CC construye en staging, criterios objetivos por fase, Claude audita.

**Genomas del ecosistema (06-17):** unrlvl_default v1.0, lucien_editorial v0.5, lucien_social v0.5, sam_personal v0.5, fphs_institucional v0.5 (drift: no listado en ecosystem.json). lucien_editorial + unrlvl_default ya con output real validado.

**SamPublisher:** persona publicadora. Canales Meta(FB)+LinkedIn (pendientes). No vende, no toca religión.

**Estado publicación:** UNREALville probado E2E. LucienSael y SamPublisher NO probados E2E — verificar meta_accounts antes del primer publish de cada uno (liga #5b publicación real).

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
