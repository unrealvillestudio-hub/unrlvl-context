# AGENDA — Unrealville Studio
_Actualizada: 2026-06-27 · v2026-06-27-v2 (#47 Expert/Boids DISEÑADO y cerrado + E1 construido [tabla captured_techniques LIVE] · próximo: E2-E8 de #47 + #45 brand_topics 6 marcas Marisol [BLOQUEANTE] · base previa v2026-06-27-v1)_

---

## 🔴🔴 FOCO INMEDIATO — construir #47 (E2-E8) + #45 brand_topics Marisol (BLOQUEANTE) + R4B

## 🟢🟢🟢 SPRINT SEMBRADOR — COMPLETO (T1-T4 + #48 cerradas)

**El Sembrador está LIVE end-to-end CON FRONT + notificación por email:** Marisol (rol seeder) captura semillas razonadas en el Orchestrator → destilado anti-IP → gate de Sam (rol admin) con corrección inline → handoff a iid-core → fan-out multimarca v22. Dos gates en serie. Auth de dos ejes (rol + scope gerente-de-cuentas). iid-inbound versionado en git. **#48: al entrar a awaiting_approval, email a content-approval@ con enlace al Orchestrator (sin resumen, anti-IP).**

| # | Tarea Sembrador | Estado |
|---|---|---|
| T1 | Limpieza test F3 | ✅ VERDE |
| T2 | Fan-out multimarca iid-core v22 + fanout.ts | ✅ HECHO |
| T3 | Cerebro: iid_seeds + EF iid-inbound v1 + IID-SEEDER | ✅ HECHO |
| T4 | Front IID Seeds + auth rol/scope + iid-inbound versionado | ✅ COMPLETO (26-jun) |
| **#48** | **Approval por email (notifyGate en capture)** | ✅ **COMPLETO + verificado en vivo (27-jun)** |

**#48 entregado (27-jun):**
- **`iid-inbound` v9** (+`notifyGate`, +42 líneas). Email inline en la rama capture al entrar a awaiting_approval. Patrón Resend de content-run-stage (`RESEND_UNRLVL_KEY` + from content@unrealvillestudio.com → content-approval@unrealvillestudio.com), NO el de nscf-mailer. Fire-and-forget (await + catch que traga; nunca tumba el capture). Asunto = neutral_topic con etiqueta `[IID Seed · pendiente]` (con domain) / `[IID Seed · sin mapear]` (sin domain). Enlace a raíz del Orchestrator (no hay routing por URL).
- **PR #5** en `unrlvl-iid-functions` mergeado (Sam). Rama borrada. Versionado mantenido.
- **5 verificaciones pasadas** (vía stub temporal `iid-notify-test` + curl local de Sam; stub borrado): con-domain ✅, sin-mapear ✅, failed-no-email ✅, fire-and-forget-no-tumba ✅, enlace correcto ✅.
- **Corrección v8→v9:** el deploy ya estaba en v8 (redeploy benigno sin cambio de código, idéntico al git sha ce0e29b). #48 entró como v9. El contexto registraba v7 — desfase numeración git↔deploy, sin pérdida.

**T4 entregado (26-jun):**
- **Repo `unrealvillestudio-hub/unrlvl-iid-functions`** (private) — iid-inbound versionado (PRs #1-#5) + `supabase/migrations/`. Salda parcialmente deuda §43 para esta EF.
- **Auth dos ejes en iid-inbound** (patrón nscf-b2b-approve): bcryptjs@2.4.3 cost 10, JWT HS256 djwt 8h, matriz PERMISSIONS fail-closed. Login solo contraseña. Scope = modelo gerente-de-cuentas (regla dura server-side). Marisol = seeder, 6 marcas. Secrets ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.
- **Front IID Seeds (Orchestrator, mergeado):** login+ojo, gating por rol, captura razonada (seeder_rationale + seeder_brand_suggestion), cola de approve admin (corrección inline, failed, out_of_scope). Verificado por Sam en Preview.
- **iid_seeds +2 columnas:** seeder_rationale, seeder_brand_suggestion. GRANT SELECT brands→service_role.

**⚠️ Pendientes operativos de Sam (no bloquean):**
- **Rotar las 2 contraseñas temporales** (TempSam2026!/TempMari2026!) antes de que Marisol entre en producción real. Opción limpia: script local sin compartir → regenerar JSON → recargar solo secret de usuarios.
- Byte-parity dura de iid-inbound cuando haya supabase CLI (functions download + git diff). Riesgo bajísimo (solo comentarios).

## 🔵🔵 SPRINT #47 — Modo Expert/Boids — DISEÑADO Y CERRADO (27-jun) · E1 construido · construyendo E2-E8

**Qué es:** subsistema PERMANENTE de onboarding de marcas (no efímero — efímero por-marca, reusable para UNRLVL con cada cliente nuevo). Segundo modo de captura del Sembrador: construir voces/genomas a partir de análisis de técnica de creadores (el método del caso Boids). Dos fases.

**Diseño cerrado (decisiones con Sam, ancladas en código real verificado):**
- **A — OCR-only, sin Whisper/audio.** Clips cortos de redes (~15s) + captions exigibles como condición de onboarding. ffmpeg fps=1 → Tesseract, server-side. Es lo que funcionó en Boids. Whisper descartado (navegador no instala en máquina del cliente; Whisper revienta EF de Supabase). Storage guarda SOLO frames, retención cortísima, se borran tras extraer → el video ajeno NUNCA persiste (anti-IP por estructura).
- **B — tabla nueva `intel.captured_techniques`** (NO iid_seeds con lane). Diseñada como precursora de `brand_voice_genome` (mapeo campo-a-campo verificado). El output de Expert es materia prima para una voz, no un tema que va a fan-out. **✅ CONSTRUIDA E1 (27-jun) — LIVE.**
- **C — dos fases.** Fase 1 (captura+OCR+análisis) se CONSTRUYE en este sprint. Fase 2 (calibración por convergencia = método de los 10 textos de Lucien) es un SKILL conversacional (`genome-calibration`), no código — automatizar el juicio "¿es la voz?" es imposible y no se intenta.
- **Quién opera:** Marisol captura en Expert (scope: sus 6 marcas) Y calibra dentro de su scope (es experta de dominio). Candados duros: scope server-side (NUNCA Lucien/UNRLVL); el INSERT a brand_voice_genome lo dispara SIEMPRE la aprobación de Sam. El gate de Sam se mueve del proceso (cada texto) al producto (la voz convergida).
- **Resumen retomable (`technique_summary`):** handoff Fase 1→Fase 2 — la prosa que Sam y Claude leen para retomar y cerrar la escritura del genoma en chat.

| E | Etapa | Entregable | Estado |
|---|---|---|---|
| E1 | DDL | `intel.captured_techniques` + GRANT service_role + 2 índices + rollback | ✅ **LIVE (27-jun)** |
| E2 | Storage | bucket `iid-expert-frames` efímero (solo frames, retención cortísima, borrado tras extraer) | 🔵 próximo |
| E3 | EF OCR | `iid-expert-ocr` en `unrlvl-iid-functions` (versionada, ffmpeg→Tesseract). PR→Sam mergea→deploy SEPARADO | 🔵 mapeado |
| E4 | iid-inbound | acciones `expert_capture`/`expert_list`/`expert_approve` (auth dos ejes reusada) | 🔵 mapeado |
| E5 | Front | sub-pestaña Basic/Expert + `IidSeedsExpert.tsx` (upload+scope). Rama+PR+Preview | 🔵 mapeado |
| E6 | Calibración | extensión scope-gated + firma Sam en INSERT genoma | 🔵 mapeado |
| E7 | Skill | `skills/genome-calibration/SKILL.md` (protocolo Fase 2) + entrada en INDEX | 🔵 mapeado |
| E8 | Resumen retomable | render de `technique_summary` como entrada de handoff | 🔵 mapeado |

**Orden estricto:** cada etapa verifica verde antes de la siguiente (patrón T4). E1 fue DDL puro (sin sesión CC apuntada a repo). E3/E4/E5 SÍ requieren sesión apuntada — el allowlist de CC se fija al arrancar: E3/E4 → sesión apuntada a `unrlvl-iid-functions`, E5 → sesión apuntada a `Orchestrator`. Dos tramos de CC distintos.

**Carril paralelo (no bloquea):** voz hermana pedagógica. `iid_seeds.lane` (standard|pedagogical) sigue vivo PERO para cuando una técnica capturada ya generó voz y produce contenido — NO para almacenar el análisis (ese va a captured_techniques). El mapeo previo fundía las dos cosas.

## 🔴 BLOQUEANTE — #45 brand_topics de las 6 marcas de Marisol (PRÓXIMO FOCO tras #47)
Sin esto el Sembrador NO produce para las marcas de Patricia: capture destila pero approve falla con "domain sin suscriptores". Es la siguiente decisión de arquitectura de contenido (qué domains por marca), NO mecánica → sesión propia con HRD. Ver detalle en tabla #45.

**Notas del Sembrador:**
- Multimarca por construcción: sumar marca a un domain = INSERT en brand_topics + 1 línea en CHECK de iid_content_queue.voice. Cero código.
- Gobernanza: iid-inbound AHORA versionado (excepción a "EFs IID direct-on-prod" por llevar auth de producción). Resto de EFs IID siguen sin repo (deuda §43).
- Acople 4B: iid-inbound→iid-core por HTTP (contrato duro). Si iid-core cambia su body, revisar iid-inbound.

---

## 🔴🔴🔴 R4B — RECONEXIÓN FASE 3 + endurecimiento Watcher (paralelo al Sembrador)

**Estado base:** Fase 3 transporte REPARADO y verde (dispatcher v27 transporta domain, cron 29 activo). El Sembrador alimenta la queue por el carril humano; R4B cierra el carril automático + publicación real.

| # | Item | Estado | Dueño |
|---|---|---|---|
| 5e-1 | Scheduler content-scheduler (EF+cron 1×/día ET). Mapea (brand_id+domain)→brand_topics, Interpretación A, jitter ±45min, ventanas ET, sibling-stagger ≥48h, escribe scheduled_for | 🔴 ESPECIFICADO, desbloqueable (write ya en v41) | Chat 1 |
| 5e-2 | gate1+gate5 → pgvector (Vertex gemini-embedding-001 @768) | 🟢 DESBLOQUEADO (Vertex creds en Supabase) | Chat 2 |
| 5e-3 | Gates 2/3 → BLOQUEANTES (flag OFF) | ⏳ tras 5e-2 | Chat 2 |
| 5e-4-disp | Parche dispatcher: AND scheduled_for <= now(). NO tocar .limit(1) | ⏳ acoplado al Scheduler | Chat 1 |
| 5b | IID publicación real (Meta) — CHAT DEDICADO. Verificar cuentas Meta Lucien/SamPublisher. Gatilla approve-piece v14. | 🔴 | Lucien/UNRLVL |
| 5r | rejected_reason en approve-piece — rechazos manuales se pierden | 🔴 | UNRLVL/Lucien |

**Eje B (post-Sembrador / dentro de R4B):** matriz estímulo (artefacto×objetivo) validada + Ruta B confirmada + Gate 7 (objetivo↔estímulo) + Gate 8 (similitud visual, GREENFIELD embeddings). Spec verificada de factibilidad; pendiente regenerar como spec de IMPLEMENTACIÓN con las 2 decisiones (objective_by_platform jsonb + migrar texto Y visual a embeddings). Detalle en session_log §9 (24-jun b).

### Bloqueos que requieren ACCIÓN DE SAM
| # | Acción de Sam | Desbloquea |
|---|---|---|
| ✅ Vertex creds en Supabase (22-jun) | 3 secrets cargados | 5e-2/5e-3 |
| ✅ Secrets auth Sembrador (26-jun) | ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET | front IID Seeds (HECHO) |
| Rotar contraseñas temporales Sembrador | script local, recargar secret usuarios | producción real Marisol |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar | crescendo Scheduler |
| brand_topics 6 marcas Marisol (#45) | Decidir domains por marca en sesión propia | Sembrador produce para NSCF/Patricia |
| Aprobar learnings Professor | (5 del 25-jun b pendientes + 7 del 26-jun ✅ + 5 del 27-jun a pendientes + 5 del 27-jun b #47 pendientes) | Professor |

---

## ✅ #5i — GENOMA v1.0 DE LUCIEN — CERRADO (19-jun)
Destilado por muestreo (8/10 marcadas Lucien). core_move reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (lucien_editorial + lucien_social). 3 angles corregidos. Professor: 6 learnings. Validación pendiente: 2-3 piezas IID real post-R4B.

---

## 🟢 LISTO PARA CC
| 1 | luciensael.com repo+Vercel+DNS | Lucien |
| 2 | UNRLVL Field Notes push | UNRLVL |

---

## 🔴 CRÍTICO — Esta semana (resto)
| # | Item | Marca | Blocker |
|---|---|---|---|
| 5p-b | Lucien necesita preset imagelab (caso sin-preset no probado con imagen real) | Lucien | — |
| 6 | Voice Genome Fase 5 — OnboardingApp. signature_closer por voz. | UNRLVL | — |
| 7 | fphs-formalize sprint | ForumPHs | DF, 13 errores |
| 8 | Verificar unidades Luxor 300 | ForumPHs | Acta 129 |
| 9 | DF QA 3 votaciones+13 errores | ForumPHs | — |
| 10 | Ayra Sprint 0 ⚠️ VENCIDO (5 Jun) | UNRLVL | Reprogramar |

---

## 🟡 Esta quincena
| 5c | IID propios de Lucien. Liga 5i. | Lucien |
| 5d | Destino 14 IID-* viejos | UNRLVL |
| 5f | Quitar .limit(1) — SOLO tras publicación real | UNRLVL |
| 5m | Borrar EFs efímeras (stubs 410) | UNRLVL |
| 5n | Barrer to: sam@ hardcodeado | UNRLVL/multi |
| 12 | NSCF-Console Fase 3 — PRÓXIMO FOCO NSCF | NeuroneSCF |
| 13 | NSCF Shopify infra SESIÓN DEDICADA | NeuroneSCF |
| 14 | SocialLab dual-mode re-test | UNRLVL |
| 15 | Cuentas Lucien/SamPublisher | Lucien/SamPublisher |
| 16 | Context System refactor — RIESGO ALTO | UNRLVL |
| 17 | VideoLab launch (videolab active=false) | UNRLVL |
| 18 | TikTok Pixel duplicado NSCF | NeuroneSCF |
| 19 | Meta MCP fix v21 | UNRLVL |
| 20 | Portal Iván sprint 2 | NeuroneSCF |
| 21 | Klaviyo flows NSCF | NeuroneSCF |
| 40 | Klaviyo key hardcodeada | NeuroneSCF |
| 41 | Verificar keys Resend | ForumPHs/UNRLVL |
| 42 | model ID hardcodeado + 13 EFs one-off (content-run-stage loguea modelId viejo en telemetría) | UNRLVL/NeuroneSCF |
| 22 | Genoma UNRLVL social | UNRLVL |
| 24 | Email marketing FPHs (cada marca su key) | ForumPHs |
| 25 | ForumPHs creación cuentas | ForumPHs |
| 35 | CLAUDE.md repos restantes | UNRLVL |
| 49 | **`unrlvl-supabase-mcp:get_logs` ROTO** — 404 (Cannot POST .../analytics/endpoints/logs.all). Impide leer logs de EF por MCP desde Claude Chat. | UNRLVL |

---

## 🔵 Próximas semanas
| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp | UNRLVL |
| 28 | NSCF blog reescritura | NeuroneSCF |
| 29 | NSCF Dispatch Portal | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA | UNRLVL |
| 31 | GRAN BLOQUE SocialLab/IID | UNRLVL |
| 32 | lucien_video | Lucien |
| 33 | Validar genomas. lucien v1.0, unrlvl_default v1.0. | Lucien/SamPublisher |
| 34 | unrlvl-CRM multimarca | UNRLVL |
| 36 | unrlvl-SMA multimarca | UNRLVL |
| 37 | Drift detector | UNRLVL |
| 38 | Reconciliación ecosystem_graph (+ conteo agentes 28/29/30 con sentinela) | UNRLVL |
| 39 | .github/CLAUDE.md repetido | UNRLVL |
| 43 | **Versionar EFs del IID en repo (deuda sin-repo §1)** — PARCIALMENTE saldado (iid-inbound versionado en unrlvl-iid-functions, PRs #1-#5). Falta el resto de EFs IID (iid-core, fanout.ts, content-*, etc.) → mismo repo. NOTA: la EF de #47 (iid-expert-ocr, E3) nace versionada en este repo. | UNRLVL |
| 44 | **Eje B implementación** — regenerar spec con 2 decisiones (objective_by_platform + embeddings texto/visual) → Ruta B + Gate 7 + Gate 8 greenfield | UNRLVL |
| 45 | **Sembrar brand_topics de las 6 marcas de Marisol (BLOQUEANTE del Sembrador para NSCF/Patricia)** — VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF existen en public.brands pero NO tienen topics/domains en intel.brand_topics. Sin esto, capture destila pero approve falla con "domain sin suscriptores" → status=failed. Decisión de arquitectura de contenido (qué domains por marca), NO mecánica → sesión propia con HRD. PRÓXIMO FOCO tras #47. | NeuroneSCF/UNRLVL |
| 46 | **Tab "Topic Proposals" en IID Intel (post-#45, ligado)** — captura ESTRUCTURADA de criterio de Marisol (preguntas guiadas por marca → tabla iid_topic_proposals borrador → Sam revisa y convierte en domains reales → CC inserta bajo brief). Marisol-alimenta / Sam-diseña / CC-escribe. Es el CÓMO se recoge el material de #45. | NeuroneSCF/UNRLVL |
| 47 | 🔵 **Modo Expert/Boids DISEÑADO y cerrado (27-jun) · E1 LIVE · construyendo E2-E8** — subsistema de onboarding de marcas, 2 fases (captura+OCR+análisis se construye E1-E8; calibración=skill genome-calibration). Tabla captured_techniques precursora de brand_voice_genome (E1 LIVE). OCR-only sin Whisper. Marisol captura+calibra en scope, Sam firma genoma. Ver bloque SPRINT #47 + session_log §9 (27-jun b). | UNRLVL |
| 48 | ✅ **Approval por email — COMPLETO y verificado en vivo (27-jun).** iid-inbound v9, notifyGate inline en capture, email a content-approval@ con enlace al Orchestrator. Ver bloque SPRINT SEMBRADOR + session_log §9 (27-jun). | UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 (CLAUDE.md repos restantes) + #39 (.github/CLAUDE.md repetido). Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Es ley activa de CC → cuesta en cada sesión mientras esté incompleta. Trabajo propio con foco, NO dentro de un sprint de producto.

---

## ✅ Resuelto recientemente
- ✅ **#47 Expert/Boids DISEÑADO y cerrado + E1 construido (27-jun b).** Sesión de diseño anclada en código real (verificados: voice-reference-extractor skill, front IID Seeds, esquema iid_seeds, brand_voice_genome). Subsistema de onboarding de marcas en 2 fases. 6 decisiones cerradas con Sam (OCR-only, tabla nueva precursora, calibración scope-gated, skill para Fase 2, EF en unrlvl-iid-functions, Storage solo-frames). Plan E1-E8. **E1 ejecutado: `intel.captured_techniques` LIVE (17 cols, 2 CHECKs, GRANT service_role, 2 índices).** Professor: 5 learnings. — 2026-06-27
- ✅ **#48 Approval por email COMPLETO y verificado en vivo (27-jun).** iid-inbound v9 (+notifyGate inline en capture). Email a content-approval@ con enlace al Orchestrator al entrar a awaiting_approval (sin resumen, anti-IP). Patrón Resend de content-run-stage (RESEND_UNRLVL_KEY, NO nscf-mailer). Fire-and-forget. Asunto=neutral_topic con etiqueta pendiente/sin-mapear. 5 verificaciones pasadas (stub temporal + curl local Sam; stub borrado). Corrección v8→v9 (v8 era redeploy benigno idéntico al git). PR #5 mergeado. Deuda nueva: get_logs del MCP roto (#49). Professor: 5 learnings. — 2026-06-27
- ✅ **IID Sembrador T4 COMPLETO (26-jun).** Front IID Seeds LIVE en Orchestrator (login+gating por rol seeder/admin, captura razonada, cola de approve con corrección inline). Auth dos ejes (rol + scope gerente-de-cuentas, patrón nscf-b2b-approve) en iid-inbound v7. Repo nuevo unrlvl-iid-functions (iid-inbound versionado + migraciones, PRs #1-#4). Descubrimiento mayor: dos modos de semilla (Basic LIVE / Expert-Boids próximo sprint #47). Professor: 7 learnings aprobados. — 2026-06-26
- ✅ **IID Sembrador T4 brief definitivo (26-jun).** Verificado en código real, secret naming ORCHESTRATOR_NSCF_IID_INTEL_*, scope gerente-de-cuentas, tab topic-proposals diferido (#46). — 2026-06-26
- ✅ **IID Sembrador CONSTRUIDO T1-T3 (25-jun b).** Fan-out multimarca iid-core v22 (fanout.ts, mata default_voice). Cerebro iid-inbound v1. Tabla iid_seeds + IID-SEEDER. 4 aserciones verdes. — 2026-06-25
- ✅ **IID Fase 3 transporte REPARADO (25-jun a).** dispatcher v26→v27, cron 29 reactivado. algorithm-mechanics abierto en brand_topics (UNRLVL phase 2). — 2026-06-25
- ✅ Eje B diseño (24-jun b): matriz estímulo validada + Ruta B + Gate 7/8 + 2 decisiones. — 2026-06-24
- ✅ ImageLab migración Imagen→Gemini (24-jun) + BGRemover mergeado. — 2026-06-24
- ✅ R4B Chat 2 — DDL + calidad output + extracción Watcher (20-jun). — 2026-06-20
- ✅ Arquitectura híbrida queue + #5i frontera (20-jun). — 2026-06-20
- ✅ Cadencia Lucien + UNRLVL poblada (19-jun). #5i GENOMA v1.0 LUCIEN CERRADO. — 2026-06-19
- ✅ IID OUTPUT QUALITY LOTE A (18-jun). IID #5b end-to-end (17-jun). Builder Convergido + Watcher LIVE (16-jun).
- ✅ NSCF Resend hardening / Fase 2 / PR #2 (13-16 jun). Genomas v0.5 (1-2 jun). Gobernanza CC (6-7 jun).

---

## Notas de contexto

**#47 Expert/Boids — estado 2026-06-27 (DISEÑADO + E1):** subsistema PERMANENTE de onboarding de marcas. Dos fases: Fase 1 (captura+OCR+análisis) se construye E1-E8; Fase 2 (calibración por convergencia = método 10 textos de Lucien) = skill conversacional `genome-calibration`, no código. Tabla `intel.captured_techniques` (LIVE E1) precursora de brand_voice_genome. OCR-only de frames server-side (sin Whisper — navegador no instala en máquina cliente, Whisper revienta EF; Boids se resolvió con OCR). Storage solo-frames retención cortísima. Marisol captura Y calibra en su scope (6 marcas), NUNCA Lucien/UNRLVL; Sam firma el INSERT a brand_voice_genome. EF iid-expert-ocr nace versionada en unrlvl-iid-functions. E3/E4 → sesión CC en unrlvl-iid-functions; E5 → sesión CC en Orchestrator (allowlist se fija al arrancar, 2 tramos).

**IID Sembrador — estado 2026-06-27 (#48 COMPLETO):** front IID Seeds LIVE + notificación por email. iid-inbound **v9** (auth dos ejes + notifyGate #48). Al entrar una semilla a awaiting_approval → email a content-approval@ con enlace a la raíz del Orchestrator (sin resumen, anti-IP, asunto=neutral_topic etiqueta pendiente/sin-mapear). Patrón Resend de content-run-stage. BLOQUEANTE producción para marcas Marisol = #45 (brand_topics sin sembrar). Contraseñas temporales a rotar antes de producción.

**IID Sembrador — estado 2026-06-26 (T4):** front IID Seeds LIVE. Marisol (seeder, 6 marcas scope) captura razonada; Sam (admin) aprueba con corrección inline. Auth dos ejes en iid-inbound v7. iid-inbound versionado en unrlvl-iid-functions.

**IID — estado 2026-06-25 a:** content-dispatcher v27 (.limit(1) intacto, transporta domain) → content-run-stage v41 → content-watcher v5 (6 gates; Gate 7/8 eje B NO implementados) → approve-piece v14. Modelo claude-sonnet-4-6.

**Marcas (public.brands) — referencia scope:** las 6 de Marisol = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF. brand_topics SOLO pobladas para LucienSael + UnrealvilleStudio.

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; AQUÍ vive credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23.

**Genoma Lucien v1.0 (19-jun):** 2 voces (editorial+social). core_move generativo/constructor.

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for en queue. Ventanas ET, jitter ±45min. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768.

**Radar pgvector:** instalado pero SIN materializar. Gate 8 visual del eje B = greenfield de embeddings.

**Patrones gobernanza:** spec sin fuente=suposiciones; IID EFs sin repo → direct-on-prod (EXCEPCIÓN: iid-inbound + iid-expert-ocr versionadas por llevar auth/lógica de producto); CHECK de tablas core son enums cerrados; acople-por-contrato (4B); auth multi-usuario = patrón nscf-b2b-approve (bcryptjs@2.4.3 cost 10, JWT HS256 djwt, usuarios en secret JSON, matriz PERMISSIONS fail-closed, sin short-circuit); scope de marca = modelo gerente-de-cuentas (regla dura server-side, NO filtro de UI); calibración de voz también scope-gated (quien califica una voz debe ser experto de dominio; Marisol sí sus 6 marcas, nunca Lucien/UNRLVL; Sam firma el INSERT); EF sin fuente git = pedir el código al humano, no reconstruir del ESZIP; GRANT service_role aplica también a tablas viejas leídas por EF nueva; disciplina sesión-nueva CC (verificar rama base, no arrastrar ramas claude/* viejas); **versión del deploy NO vive en el código (header dice v2.0) — vive en Supabase; nunca asumir git vN == deploy vN, verificar con get_edge_function antes de bumpear**; **allowlist de repos de CC se fija al ARRANCAR la sesión (apuntada al working dir), no se amplía en caliente; habilitar el connector de GitHub a nivel cuenta NO la cambia; tell de arranque: primer get_file_contents al target devuelve archivo, si 403 parar**; **Claude Chat sandbox sin egress a *.supabase.co — no puede invocar/curl-ear EFs; el disparo de verificación viene de afuera (Sam curl local)**; **navegador no puede detectar/instalar software en máquina del cliente (sandbox browser); Whisper revienta EF de Supabase → procesamiento pesado de video = OCR-only de frames livianos o API externa, nunca Whisper en EF**.

**Resend (patrón confirmado #48):** cada marca su key. UNRLVL = `RESEND_UNRLVL_KEY` (from content@unrealvillestudio.com → content-approval@unrealvillestudio.com). NSCF = RESEND_API_KEY (from noreply@neuronescflorida.com). NUNCA clonar el de nscf-mailer para emails UNRLVL (bug histórico). Patrón canónico UNRLVL = content-run-stage.

**Secrets:** cada marca su key Resend. Vertex SA en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.

**Estado publicación:** UNREALville E2E. Lucien/SamPublisher NO E2E (liga 5b). Publicación real bloqueada por ANTISPAM_CONTRACT §6 hasta R4B.

**Anti-IP (dos modos de semilla):** Basic = material nunca leído, tema neutro. Expert/Boids = material es insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir (análogo frame Nietzsche de Lucien: motor interno, nunca citado). En Expert el video ajeno NUNCA persiste — solo frames efímeros que se borran tras extraer el texto-método.

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
