# AGENDA — Unrealville Studio
_Actualizada: 2026-06-18 · v2026-06-18-v2 (#5h-#5l RESUELTOS · 3 ítems nuevos observabilidad/calidad · R4B = FOCO PRÓXIMOS 2-3 DÍAS)_

---

## 🔴🔴 FOCO INMEDIATO — R4B (deadline 2-3 días, fijado 2026-06-18)

**R4B = Scheduler + endurecimiento del Watcher + deuda de flujo.** NO confundir con calidad de output (Lote A, cerrado) ni con los 3 ítems nuevos (observabilidad). R4B es infraestructura de orquestación.

| # | Item | Detalle | Estado |
|---|---|---|---|
| 5e-1 | **Scheduler R4B core** | jitter + desfase hermanas (sibling_stagger) + crescendo leyendo `cadence`/`rollout_phase` de `intel.brand_topics`. Cerebro que decide QUÉ se dispara CUÁNDO sin que las hermanas colisionen. | 🔴 por construir |
| 5e-2 | **Watcher → pgvector** | migrar gate1 (similarity) y gate5 (duplication) a pgvector (hoy en memoria). | 🔴 |
| 5e-3 | **Gates 2/3 bloqueantes** | sibling-window y cadence de informativos a BLOQUEANTES. | 🔴 |
| 5e-4 | **Extraer Watcher a EF `content-watcher`** | hoy embebido en content-run-stage stage 5. Sacarlo a EF propia (C2). | 🔴 |
| 5e-5 | **Promover `domain` a columna** (era #5g) | en orchestrator_jobs + content_pieces (hoy en assets.builder_input.domain). R4B lo necesita como fuente de verdad. | 🔴 |
| 5e-6 | **Instrumentación de tokens (NUEVO 06-18)** | capturar usage.input_tokens/output_tokens de cada llamada Claude (Builder + AIFE) en builder_meta. **DENTRO de R4B** (flujo se toca igual; SignalLab necesita costo/pieza). Patrón = resend_id. Sin esto no hay costeo real. | 🔴 incluir en R4B |
| 5e-7 | **Timeouts editorial largo (~90s)** | piezas editoriales largas pueden tocar timeout. | 🟡 |

**Nota R4B:** base64→Storage YA resuelto (Lote A #5j). El `.limit(1)` del dispatcher se quita SOLO tras publicación real validada (#5f) — NO en R4B salvo decisión explícita.

---

## 🟢 LISTO PARA EJECUTAR — Claude Code

| # | Item | Marca | Acción |
|---|---|---|---|
| 1 | **luciensael.com** — repo GREENFIELD + Vercel + DNS | Lucien Sael | `claudecode: repo + deploy + DNS` |
| 2 | **UNRLVL Field Notes** — push a CoreProject | UNRLVL | `claudecode: push blog` |

---

## 🟡 IID — Calidad de output (3 ítems NUEVOS 06-18, post-Lote A · NO son R4B)

Detectados al revisar el primer output renderizado en la Content Queue (06-18).

| # | Item | Marca | Prioridad |
|---|---|---|---|
| 5o | **Title viejo en el render de la cola.** `assets.copy.title` correcto existe en DB (#5h OK en dato), pero la Content Queue renderiza el title del FINDING crudo (inglés). El fix llegó al dato, no al render. Localizar de dónde lee el title la pantalla de aprobación → apuntar a `assets.copy.title`. | UNRLVL/Lucien | 🟡 ALTA (cosmético, confunde) |
| 5p | **Imagen desconectada del contenido.** imagelab produce imagen (CDN OK) pero el PROMPT de imagen no está anclado al contenido → genérica (atril de laptop para post de reasoning models). Anclar prompt al copy/título/dominio. | UNRLVL/Lucien | 🟡 |
| 5q | **Idioma title vs cuerpo.** Title render inglés (finding) vs cuerpo español. Se resuelve al arreglar 5o; verificar que el title generado no tenga mismatch de idioma. | UNRLVL/Lucien | 🟢 (liga 5o) |

---

## 🔴 CRÍTICO — Esta semana (resto)

| # | Item | Marca | Blocker |
|---|---|---|---|
| 5i | **IID — Angle de Lucien sobre-especificado = fórmula.** Rebalancear angle (por-dominio) vs genoma (core_move) para dar RANGO a Lucien. **SESIÓN DEDICADA NANOMÉTRICA — base de aprendizaje de genomas multimarca. Tuning completo a Professor.** Liga 5c. | Lucien Sael | 🔴 (post-R4B) |
| 5b | **IID — Publicación real (push a Meta)** — CHAT DEDICADO. Verificar cuentas Meta Lucien/SamPublisher (no E2E) antes del primer push. **Gatilla §5.4 (move-to-permanent), código ya live (approve-piece v14).** | Lucien/UNRLVL | Cuentas Meta sin verificar E2E |
| 6 | **Voice Genome Fase 5** — OnboardingApp (VOICE_GENOME_PHASE_SPEC.md). Considerar capturar signature_closer por voz. | UNRLVL | Nuevas marcas no capturan voz editorial |
| 7 | **fphs-formalize sprint** — calidad acta manual (98% Ivette) | ForumPHs | DF fragmenta, 13 errores 1ª persona |
| 8 | **Verificar unidades Luxor 300** — si ≤127, regenerar acta | ForumPHs | Acta usa 129 |
| 9 | **DF QA** — 3 votaciones faltantes + 13 errores 1ª persona | ForumPHs | Calidad acta |
| 10 | **Ayra Sprint 0** — ⚠️ VENCIDO (5 Jun) | UNRLVL | Reprogramar. Staging-loop. |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 5c | **IID — IID propios de Lucien** — materia filosófica sin agentes. Liga 5i. | Lucien Sael |
| 5d | **IID — Destino de los 14 IID-* viejos** — reasignar o descartar. | UNRLVL |
| 5f | **IID — Quitar `.limit(1)`** — SOLO tras publicación real validada. | UNRLVL |
| 5m | **IID — Borrar EFs efímeras** — model-ping, env-probe, resend-test. | UNRLVL |
| 5n | **IID — Barrer `to: sam@` hardcodeado** + alias por función. | UNRLVL/multi |
| 12 | **NSCF-Console Fase 3** — superuser console con roles. PRÓXIMO FOCO NSCF. | NeuroneSCF |
| 13 | **NSCF Sesión Shopify infra** — app commerce dedicada. SESIÓN DEDICADA. | NeuroneSCF |
| 14 | **SocialLab dual-mode** — sync+async, re-test. | UNRLVL |
| 15 | **Cuentas LinkedIn + X (Lucien) + Meta(FB) + LinkedIn (SamPublisher)** | Lucien/SamPublisher |
| 16 | **Context System refactor** — SESIÓN DEDICADA. RIESGO ALTO. | UNRLVL |
| 17 | **VideoLab launch** — Kling.ai token + grabaciones Patricia | UNRLVL |
| 18 | **TikTok Pixel duplicado NSCF** | NeuroneSCF |
| 19 | **Meta MCP** — fix fb_get_page_insights v21 | UNRLVL |
| 20 | **Portal Iván sprint 2** — dashboard + UPS API | NeuroneSCF |
| 21 | **Klaviyo flows NSCF** — 4 flows bilingüe | NeuroneSCF |
| 40 | **Klaviyo key hardcodeada** → secret + rotar. | NeuroneSCF |
| 41 | **Verificar exposición keys Resend** | ForumPHs/UNRLVL |
| 42 | **IID — model ID hardcodeado** + 13 EFs one-off en modelo retirado. | UNRLVL/NeuroneSCF |
| 22 | **Genoma UNRLVL social** — voz "we" con vocería de sam_personal | UNRLVL |
| 23 | **SMA pulido (opcional)** | ForumPHs |
| 24 | **Email marketing FPHs** — cada marca su key dedicada. | ForumPHs |
| 25 | **ForumPHs — creación cuentas** — número panameño | ForumPHs |
| 35 | **CLAUDE.md — completar repos restantes** | UNRLVL |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp | UNRLVL |
| 28 | NSCF blog — Reescritura 4 artículos L0+L3 | NeuroneSCF |
| 29 | NSCF Dispatch Portal — Vercel + DNS | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA | UNRLVL |
| 31 | **GRAN BLOQUE SocialLab/IID** — canales/calendario/clientes. Integrar NSCF/FPHs tras calidad cerrada. | UNRLVL |
| 32 | **lucien_video** (cuando VideoLab) | Lucien Sael |
| 33 | Validar genomas v0.5 → v1.0. lucien_editorial + unrlvl_default ya validados. | Lucien/SamPublisher |
| 34 | **unrlvl-CRM multimarca** (ESTRATÉGICO) | UNRLVL |
| 36 | **unrlvl-SMA multimarca** (ESTRATÉGICO) | UNRLVL |
| 37 | **Drift detector** (ESTRATÉGICO). Drifts: shopify.stores VIEW→BASE TABLE; /api/professor existe; content-run-stage v35; fphs_institucional v0.5 no en ecosystem.json; cron unrlvl-media doc-7 vs runtime-60→12; get_edge_function LEGIBLE (no ESZIP). | UNRLVL |
| 38 | **Reconciliación ecosystem_graph** | UNRLVL |
| 39 | **`.github/CLAUDE.md` repetido** + desktop.ini forumphs-speaks | UNRLVL |

---

## ✅ Resuelto recientemente

- ✅ **IID OUTPUT QUALITY LOTE A CERRADO** (06-18). #5h #5j #5k #5l + cron end-to-end con verificación live. content-run-stage v34→v35, approve-piece v13→v14 (in-place, byte-idéntico, Ruta B, sin auto-merge, `.limit(1)` intacto). (a) #5j imagen→unrlvl-media CDN sin base64 (causa: reescritura v25→v34 desconectó upload de mayo); (b) #5h title separado, 3 títulos distintos mismo finding, similarity 0.31; (c) #5k firma del genoma estampada tras Watcher PASS; (d) #5l resend_id (UUID) en pieza+job; (e) cron 32→12 días; (f) D1 piece_id pre-gen PK. §5.4 verificado-por-deploy, gatillo en #5b. Spec+addendum en protocols/. 2 errores de spec corregidos por CC (§2.2, §5.2). Professor: 6 learnings aprobados. — 2026-06-18
- ✅ **IID #5b VALIDADO end-to-end** (06-17). RUN4: 5 stages + Watcher PASS + email. 5 fallos arreglados. v25→v33. — 2026-06-17
- ✅ **IID Builder Convergido + Watcher LIVE** (06-16). v25→v31. Divergencia 0.07. — 2026-06-16
- ✅ **IID — Cuarentena 293 cadáveres**. — 2026-06-16
- ✅ **NSCF Resend hardening** (nscf-mailer v23). — 2026-06-16
- ✅ **NSCF-Console Fase 2** LIVE. — 2026-06-13
- ✅ **NSCF PR #2 + Sales Pager v18**. — 2026-06-13
- ✅ **CLAUDE.md + ecosystem_graph + protocolos + Professor 18 learnings**. — 2026-06-08
- ✅ **SMA reapuntado a ForumPHs**. — 2026-06-06
- ✅ **Gobernanza CC** (CC_PROTOCOL + SESSION_PROTOCOL v16). — 2026-06-06/07
- ✅ **Genomas:** sam_personal, lucien_social, lucien_editorial v0.5. — 2026-06-01/02

---

## Notas de contexto

**R4B — arranque (06-18):** foco próximos 2-3 días. Insumo principal: `intel.brand_topics` (ya tiene cadence, rollout_phase, sibling_stagger, angle, purpose). El Scheduler lee de ahí. El Watcher ya existe (6 gates en content-run-stage stage 5) — R4B lo endurece (pgvector, gates bloqueantes) y lo extrae a EF propia. NO tocar genomas ni Lote A. Specs: WATCHER_SPEC.md, BUILDER_CONVERGED_SPEC.md, ANTISPAM_CONTRACT.md. **Antes de R4B: leer brand_topics vivo + código del Watcher actual + ANTISPAM_CONTRACT (contrato de los 6 gates).**

**R4B — reconocimiento previo hecho (06-18, leer ANTES de construir el Scheduler):**
- 🔴 **HUECO BLOQUEANTE: `cadence` está NULL en las 3 filas de Lucien** (ai-cognition, ai-identity, human-essence). Solo UNRLVL tiene cadence poblado (2x→3x→4x/sem crescendo por plataforma). El Scheduler R4B lee `cadence` → con Lucien en null no sabrá frecuencia. **Decidir y poblar la cadencia de Lucien ANTES de construir el Scheduler** (decisión de Sam, no fontanería). Plataformas Lucien: x, meta_fb, meta_ig, tiktok, blog (NO linkedin).
- 🟡 `angle` NULL en LucienSael/ai-identity y /human-essence (solo ai-cognition tiene angle). Liga con #5i: Lucien sin angle por dominio. Resolver en la sesión #5i nanométrica, no en R4B.
- **Estado actual del Watcher (intel.watcher_log):** 5 PASS · 4 REJECT por gate `evidence` · 1 REJECT por gate `duplication`. El gate `evidence` es el que más rechaza (cruces incoherentes brief×dominio). `result` ∈ {PASS, REJECT}; columnas: job_id, queue_id, brand_id, domain, voice_id, result, failed_gate, gate_detail(jsonb).
- **brand_topics rollout_phase=1 activos:** Lucien×3 (ai-cognition sibling_stagger=true), UNRLVL×6 (ai-cognition sibling_stagger=true + 5 Tier1). UNRLVL/system-proof en phase 2 (active=false). El par sibling_stagger es ai-cognition (Lucien↔UNRLVL) — el caso de prueba del desfase de hermanas.

**Costeo IID (06-18, ESTIMADO — falta instrumentación 5e-6):** sin tokens en builder_meta, costo es estimación. Precios verificados jun-2026: Sonnet 4.6 $3/$15 MTok; Imagen 4 Fast ~$0.02/img, Standard ~$0.04. Por pieza (Builder+AIFE+imagen+Watcher): SOCIAL ~$0.05-0.07; EDITORIAL ~$0.11-0.13. Volumen 4/sem × 6 marcas ≈ $5-8/mes. El compute NO es el cuello de botella. SignalLab necesita costo real/pieza → urgencia de 5e-6.

**IID — estado 06-18:** content-dispatcher v22 (.limit(1) intacto) → content-run-stage v35 → approve-piece v14. Modelo claude-sonnet-4-6. Email RESEND_UNRLVL_KEY a content-approval@. Imagen en unrlvl-media CDN. FLUJO + CALIDAD cerrados. Pendiente: R4B, #5i, #5b (gatilla §5.4), 3 ítems observabilidad (5o/5p/5q).

**Firmas de cierre (06-18):** en brand_voice_genome.application_constraints.signature_closer {text, rule}, leídas por loadVoiceGenome, estampadas en finalizePiece tras Watcher PASS. unrlvl_default → ❯ Unrealville Studio. lucien_editorial+lucien_social → --- LucienSael: Builder, Thinker, Operator.

**Storage IID (06-18):** imagen nace en unrlvl-media/temp/{brand}/{piece_id}/{ts}.png (CDN, Pro 100GB). Cron jobid 32 borra temp/% >12 días. Al publicar (publishOk) → move a permanent/. Move al PUBLICAR, no al aprobar.

**Render de la Content Queue (06-18, ojo 5o):** la pantalla de aprobación renderiza el title del FINDING crudo, no assets.copy.title. El dato #5h es correcto; el render apunta al campo viejo.

**Correcciones de spec por fuente real (06-18, GOVERNANCE):** spec sin fuente → 2 suposiciones corregidas por CC. (1) piece_id no existe en imagelab → pre-gen UUID en copylab; (2) publish vive en approve-piece, no Orchestrator. get_edge_function resultó LEGIBLE. El ejecutor con fuente tiene licencia para corregir el spec.

**Secrets Resend (06-17):** cada marca su key. RESEND_API_KEY=NeuroneSCF. RESEND_UNRLVL_KEY=UNRLVL. Nunca compartir.

**Patrones de infra (06-16/18):** "reescritura de EF no hereda side-effects del flujo viejo" (causa #5j); "match-exacto se estampa por código, no por prompt" (firma vs AIFE); "artefacto nuevo sin permisos = fallo silencioso"; "I/O externo sin try/catch = fallo mudo".

**Model IDs (06-16/17):** se retiran durante el año. Barrer TODO al retirarse uno. 13 one-off pendientes (#42).

**Genomas (06-18):** unrlvl_default v1.0, lucien_editorial v0.5, lucien_social v0.5, sam_personal v0.5, fphs_institucional v0.5 (drift: no en ecosystem.json). signature_closer poblado salvo sam_personal/fphs.

**Estado publicación:** UNREALville probado E2E. LucienSael y SamPublisher NO E2E — verificar meta_accounts antes del primer publish (liga #5b, gatilla §5.4).

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
