# AGENDA — Unrealville Studio
_Actualizada: 2026-06-16 · v2026-06-16-v2 (IID Builder+Watcher LIVE)_

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
| 5b | **IID — Corrida real semi-manual (piloto)** `Sam→Claude→IID→Watcher→aprobación`. Caso multimarca `ai-cognition`. Validar gate2 sibling-window (RESCHEDULE 48-72h) en vivo + resolver tensión `proof_mode`↔UNRLVL (ver Notas). NO se toca `.limit(1)` hasta que esto pase. | Lucien Sael / UNRLVL | Builder+Watcher LIVE ✅ — listo para correr |
| 6 | **Voice Genome Fase 5** — implementar en OnboardingApp (spec lista: VOICE_GENOME_PHASE_SPEC.md) | UNRLVL | Sin esto nuevas marcas no capturan voz editorial |
| 7 | **fphs-formalize sprint** — replicar calidad acta manual (98% Ivette). Comparar ACTA_No1-2026 vs ACTA_OR_1-2026 | ForumPHs | DF fragmenta intervenciones, 13 errores primera persona |
| 8 | **Verificar unidades Luxor 300** — si ≤127 unidades, regenerar acta con % correcto | ForumPHs | Acta actual usa 129 |
| 9 | **DF QA** — 3 votaciones faltantes + 13 errores primera persona | ForumPHs | Calidad acta |
| 10 | **Ayra Sprint 0** — ⚠️ VENCIDO (deadline 5 Jun) — crear repo + Vercel + schema + env vars | UNRLVL | Reprogramar urgente. Ver enfoque staging-loop abajo (Notas). |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 5c | **IID — Plantear IID propios de Lucien** — su materia filosófica (ai-cognition/ai-identity/human-essence) hoy NO tiene agentes IID dedicados. Sesión de diseño con cabeza fresca. | Lucien Sael |
| 5d | **IID — Decidir destino de los 14 IID-* viejos** — reasignar a UNRLVL/Sam o descartar. | UNRLVL |
| 5e | **IID — Scheduler R4B** — jitter + desfase de hermanas + crescendo, leyendo `cadence`/`rollout_phase` de `brand_topics`. Automatiza lo que en piloto se hace manual. Consume `intel.brand_topics` como input. Migra gate1/gate5 del Watcher a pgvector; gates 2/3 pasan de informativos a bloqueantes; extrae los 6 gates a EF `content-watcher` (C2). | UNRLVL |
| 5f | **IID — Quitar `.limit(1)` de content-dispatcher** — SOLO tras corrida real (#5b) verde. Cadáveres ya cuarentenados (06-16). Re-test con 2-3 items reales antes de batch. | UNRLVL |
| 5g | **IID — Promover columna `domain` a tabla** — hoy viaja en `assets.builder_input.domain` (jobs manuales). R4B debe promoverla a columna real en `orchestrator_jobs` + `content_pieces` (decisión 06-16: sin DDL en piloto, mínimo blast radius). | UNRLVL |
| 12 | **NSCF-Console Fase 3** — superuser console: roles por auth (embajadora PIN=B2C sin cambios; PO/superuser login fuerte=aprobaciones+vista B2B+inventarios ambas tiendas). Funciones sensibles nunca tras PIN. Auth Fase 2 ya diseñada para evolucionar a roles. NO depende de Shopify infra. **Prerrequisito Resend hardening YA hecho (06-16). PRÓXIMO FOCO NSCF.** Al arrancar: leer `nscf-console/src/App.jsx` + `nscf-b2b-approve` para ubicar hook de auth. | NeuroneSCF |
| 13 | **NSCF Sesión Shopify infra** — app dedicada de commerce (`write_customers`/`write_draft_orders`/`write_orders`) separada de `UNRLVL Auditor` + modelo multi-token en `shopify.stores` (hoy 1 token/(brand,store)). ~~Desbloquea Fase 2.5~~ → **Fase 2.5 PARQUEADA (06-16): volumen no la amerita, customer manual hasta nuevo aviso.** SESIÓN DEDICADA — no mezclar con producto. | NeuroneSCF |
| 14 | **SocialLab dual-mode** — confirmar/implementar sync+async, re-test publicación post brand_id fix | UNRLVL |
| 15 | **Crear cuentas LinkedIn + X para Lucien** + **Meta(FB) + LinkedIn para SamPublisher** | Lucien Sael / SamPublisher |
| 16 | **Context System refactor** — SESIÓN DEDICADA (plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md). Adelgazar ecosystem.json + crear CAPABILITIES.md. RIESGO ALTO — hacer con foco. Modulariza archivos extensos → más caen en Ruta A del Actualiza. | UNRLVL |
| 17 | **VideoLab launch** — integrar Kling.ai token + grabaciones Patricia para voice genome | UNRLVL |
| 18 | **TikTok Pixel duplicado NSCF** — resolver antes de ads | NeuroneSCF |
| 19 | **Meta MCP** — fix fb_get_page_insights métricas deprecadas Graph API v21 | UNRLVL |
| 20 | **Portal Iván sprint 2** — dashboard pendientes + UPS API (developer.ups.com) | NeuroneSCF |
| 21 | **Klaviyo flows NSCF** — configurar 4 flows bilingüe en UI | NeuroneSCF |
| 40 | **Klaviyo key hardcodeada** — `pk_UNF8Ee…` en `klaviyo-setup` (y prob. otras `klaviyo-*`) → mover a secret + rotar. Mismo patrón que Resend hardening (06-16). Aplicar lección: deploy ANTES de revocar. | NeuroneSCF |
| 41 | **Verificar exposición keys Resend** — confirmar que `FPHS_RESEND_API_KEY` (Supabase) y `RESEND_API_KEY` de Vercel/forumphs-com no estén en claro en repos/logs. Va con sesión ForumPHs. | ForumPHs/UNRLVL |
| 42 | **IID — model ID hardcodeado (deuda latente)** — `content-run-stage` usa `claude-sonnet-4-6` hardcodeado. Lección 06-16: model IDs caducan (4-20250514 retirado 15-jun congeló el pipeline desde abril). Considerar leer model ID de config/secret en vez de hardcode, o documentar revisión periódica. | UNRLVL |
| 22 | **Genoma UNRLVL social** — voz "we" con mismo modo vocería que sam_personal | UNRLVL |
| 23 | **SMA pulido (opcional)** — actualizar 4 hints viejos del front (App.tsx: Google Voice/WABA) por hints FPHs; opción agenda en portada sin escribir "hola"; decidir si reset.js queda permanente o se quita tras uso | ForumPHs |
| 24 | **Email marketing FPHs** — construir stack Resend + Supabase + Orchestrator (decisión tomada: NO Klaviyo para servicios). Diseñar disparo vía capa (endpoint/tabla eventos), NO hardcodeado, para que el CRM futuro se enchufe | ForumPHs |
| 25 | **ForumPHs — ejecución creación cuentas** — Ivette + Jesús siguen el SMA. Conseguir número panameño dedicado → activar WhatsApp Business → integrar ForumPHs Speaks | ForumPHs |
| 35 | **CLAUDE.md — completar repos restantes** — leyendo código real (un repo grande por tanda). Pendientes: AgentLab src/ orquestador completo, forumphs-speaks (index.html 284KB monolítico), WebLab, VoiceLab, VideoLab, SocialLab, BlueprintLab, OnboardingApp, CoreProject, DDMV-Assistant, unrlvl-ops, XMMs. Listos: unrlvl-context, Orchestrator, CopyLab, ImageLab, 4 MCP, AgentLab (parcial). | UNRLVL |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp (público o GitHub Pro) | UNRLVL |
| 27 | Normalizar convención nombres UnrealvilleStudio vs UNREALville en meta_accounts | UNRLVL |
| 28 | NSCF blog — Reescritura 4 artículos con L0+L3 HUMANIZE EMOTIONAL | NeuroneSCF |
| 29 | NSCF Dispatch Portal — crear proyecto Vercel nscf-dispatch + DNS Cloudflare CNAME | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA — MCPs + Skills + Agents + AgentLab orquestación multimarca | UNRLVL |
| 31 | **GRAN BLOQUE SocialLab/IID** — diagnosticar SocialLab → flujos IID con matriz de canales + regla de variabilidad de publicación (no siempre enlazar afuera) → testing → calendario → producción ICR → recién entonces integrar clientes (NSCF, FPHs). **NOTA 06-16: Builder+Watcher ya resuelven la generación on-brand + anti-spam; este bloque ahora es sobre canales/calendario/clientes, no sobre el motor.** | UNRLVL |
| 32 | **lucien_video** (cuando VideoLab/Kling.ai) — gobierna guion hablado de TikTok/Reels | Lucien Sael |
| 33 | Validar genomas v0.5 contra outputs reales → promover a v1.0 (lucien_editorial, lucien_social, sam_personal). **NOTA 06-16: lucien_editorial v0.5 y unrlvl_default v1.0 ya produjeron output real validado (divergencia 0.07) — insumo directo para esta promoción.** | Lucien / SamPublisher |
| 34 | **unrlvl-CRM multimarca** (ESTRATÉGICO) | UNRLVL |
| 36 | **unrlvl-SMA multimarca** (ESTRATÉGICO) | UNRLVL |
| 37 | **Drift detector** (ESTRATÉGICO) — skill del ecosystem-auditor. **Drifts conocidos pendientes: `shopify.stores` VIEW→BASE TABLE; `/api/professor` ya existe (HRD lo marca pendiente); `content-run-stage` comentario de cabecera dice v1.11 pero runtime es v31; `fphs_institucional` v0.5 genoma activo no listado en ecosystem.json (5 genomas, no 4).** | UNRLVL |
| 38 | **Reconciliación completa ecosystem_graph** — ecosystem audit contextual dedicado. Idealmente con drift detector (#37) construido. | UNRLVL |
| 39 | **Revisar `.github/CLAUDE.md` repetido** — template 608 bytes en Orchestrator, CopyLab, AgentLab, fphs-speaks. Limpiar `desktop.ini` en forumphs-speaks. | UNRLVL |

---

## ✅ Resuelto recientemente

- ✅ **IID Builder Convergido + Watcher LIVE** (#4, #5) — la sesión grande de 06-16. `content-run-stage` v25→v31: (1) Builder convergido `buildFromGenome` lee `intel.brand_topics` + `brand_voice_genome`, resuelve brand+voz híbrida (format manda, plataforma desempata), inyecta genoma+ángulo+hard_rules, mató el fallback silencioso `?? UnrealvilleStudio`, persiste voice_id real + builder_meta; (2) Watcher como stage 5, 6 gates modulares, gate previo a `awaiting_approval`, tabla `intel.watcher_log` auditable. **Divergencia multimarca validada objetivamente: Lucien↔UNRLVL sobre ai-cognition = 0.07 similitud (umbral REJECT 0.80); duplicado = 1.0 rechazado.** Gates 4/6 semánticos cazan UNRLVL-sin-números y Lucien-tease-de-libro. **CAUSA RAÍZ DEL FREEZE DE ABRIL IDENTIFICADA: model ID `claude-sonnet-4-20250514` retirado (404) → pipeline muerto en seco, no solo off-brand. Reemplazo verificado 200: `claude-sonnet-4-6`.** Specs en protocols/. Pendiente: corrida real (#5b). — 2026-06-16
- ✅ **IID — Cuarentena de cadáveres** — 293 filas legacy de `iid_content_queue` (274 brand_id=null + 19 brand_id hardcoded del test viejo) → `failed` + tag `ARCHIVED_LEGACY_20260616`. Cron `content-dispatcher-poll` deja de morder basura. Decisión Sam: quemar todo lo viejo, regenerar limpio cuesta menos que reparar. — 2026-06-16
- ✅ **IID — angle Lucien/ai-cognition poblado** — `brand_topics.angle` filosófico/cultural (era null, blocker del caso multimarca). Par divergente completo: Lucien filosófico ↔ UNRLVL técnico. — 2026-06-16
- ✅ **NSCF Resend hardening** (#11) — key Resend hardcodeada (`re_bYa36…`) → secret `RESEND_API_KEY`; key rotada; `nscf-mailer` v23 lee env + guarda 503 + versionada en GitHub. Verificado E2E. Fase 2.5 parqueada. Lección: push≠deploy; revocar key vieja SIEMPRE post-deploy+prueba. — 2026-06-16
- ✅ **NSCF-Console Fase 2 (Módulo aprobación PO)** — EF `nscf-b2b-approve` v1 + `nscf-mailer` v19 + frontend `nscf-console/` + policy RLS explícita. E2E 10/10. Auth password hasheado (bcryptjs). PR #3 mergeado. Deploy LIVE: `console-pro-neuronescf.vercel.app`. — 2026-06-13
- ✅ **NSCF PR #2 (pro-gateway Fase 1)** mergeado a main — 2026-06-13
- ✅ **NSCF Sales Pager Salones v18** — pager B2B completo + versión Alizzanti — 2026-06-13
- ✅ **CLAUDE.md críticos + pipeline consolidados** — verificado leyendo código real: unrlvl-context, Orchestrator (v4.1), CopyLab (v9.7), ImageLab, 4 MCP, AgentLab (parcial). Pusheados — 2026-06-08
- ✅ **ecosystem_graph.json corregido** — 4 discrepancias código-vs-grafo parcheadas — 2026-06-08
- ✅ **Protocolos en custom instructions** (#11) — userPreferences alineadas con SESSION_PROTOCOL v16 — 2026-06-08
- ✅ **EXPORT_SECRET limpieza** (#12) — secret viejo removido; Sam rotó en Vercel — 2026-06-08
- ✅ **Professor** — 13 learnings (06-06/08) + 5 nuevos registrados y aprobados — 2026-06-08
- ✅ **SMA reapuntado a ForumPHs** — operativo en producción. Roles client/ops/admin; PRs #1 y #2 mergeados — 2026-06-06
- ✅ **Gobernanza CC creada** — CC_PROTOCOL.md + SESSION_PROTOCOL v15→v16 — 2026-06-06/07
- ✅ **session_log NSCF restaurado** — historial recuperado de git tras incidente de reemplazo por CC — 2026-06-06
- ✅ **Skill `voice-reference-extractor` v1.0** creado e integrado — PR #2 mergeado — 2026-06-05
- ✅ **brands/SamPublisher/** carpeta + brand.json + session_log.md (PR #1) — 2026-06-05
- ✅ **INDEX.md v1.4** — voice-reference-extractor + supabase-auditor — 2026-06-05
- ✅ **Genoma SamPublisher** (sam_personal v0.5) — 4º genoma del ecosistema propio — 2026-06-02
- ✅ **SamPublisher health** yellow → green — 2026-06-02
- ✅ **Deuda Lucien** — nota fantasma eliminada de lucien_editorial.notes — 2026-06-02
- ✅ **Genoma lucien_social** (v0.5) — voz corta/reactiva ≤280 — 2026-06-02
- ✅ **Genoma lucien_editorial** (v0.5) — desbloquea IID — 2026-06-01
- ✅ **luciensael.com blog** construido — 2026-05-31
- ✅ **UNRLVL Field Notes** construido — 2026-05-31
- ✅ **FIX publicación v22** — fila meta_accounts brand_id=UnrealvilleStudio — 2026-05-31
- ✅ **IID diagnóstico completo** — causa raíz identificada (sin voice genome) — 2026-05-31
- ✅ **Meta MCP LIVE** — UNREALville + NSCF tokens activos — 2026-05-29
- ✅ **Pipeline End-to-End OPERACIONAL** — primer post publicado IG+FB — 2026-05-29

---

## Notas de contexto

**IID Builder+Watcher (estado 2026-06-16) — REEMPLAZA "IID Subsystem" viejo:**
Pipeline de ejecución vivo en 3 EFs: `content-dispatcher` v21 (lee queue, `.limit(1)` debug INTACTO a propósito) → `content-run-stage` v31 (Builder convergido stage 1 + stages aife/imagelab/sociallab + Watcher stage 5). Builder: `buildFromGenome` lee `brand_topics`+`brand_voice_genome`, resuelve voz híbrida (format→plataforma desempata), inyecta genoma+ángulo+hard_rules, persiste voice_id real. Watcher: 6 gates modulares (1 similarity semántico vía Claude, 2 sibling-window INFORMATIVO en piloto, 3 cadence INFORMATIVO, 4 evidence, 5 duplication semántico, 6 hard-rules catch-all), gate previo a `awaiting_approval`, log en `intel.watcher_log`. Guard dry-run (`assets.builder_input.dry_run`) corta tras copylab sin cascada/email/publish; deja job en `complete` + `builder_meta.dry_run_stopped=true`. Modelo: `claude-sonnet-4-6` (hardcodeado — deuda #42). `domain` viaja en `assets.builder_input.domain` (R4B lo promueve a columna — #5g). Specs: protocols/BUILDER_CONVERGED_SPEC.md, WATCHER_SPEC.md, DRYRUN_PLAN_IID_PILOT.md.

**TENSIÓN ABIERTA proof_mode↔UNRLVL (06-16):** en el dry-run, una pieza UNRLVL divergente y con números (pasó gate1=0.07 y gate4=evidence) fue RECHAZADA por gate6 hard_rule `proof_mode` ("describe capacidad en teoría, nunca muestra el sistema ejecutándose ahora"). Builder y Watcher discrepan sobre qué es on-brand para UNRLVL. Hipótesis: artefacto del test (finding sembrado sin producto real). A RESOLVER EN CORRIDA REAL (#5b): si `proof_mode` sigue bloqueando UNRLVL conceptual en producción → decidir entre ajustar genoma UNRLVL (incluir evidencia de ejecución) o reclasificar `proof_mode` de bloqueante a advertencia. NO resuelto.

**Orden IID post-piloto (06-16):** corrida real semi-manual (#5b) → IID propios de Lucien (#5c) → destino 14 IID viejos (#5d) → Scheduler R4B (#5e) → quitar .limit(1) (#5f). El Watcher es prerequisito DURO del primer publish real (ANTISPAM_CONTRACT §6) — ya cumplido. Scheduler puede esperar (en piloto se aprueba manual).

**NSCF-Console (estado 2026-06-13):** Fase 1+2 completas y en producción. Deploy LIVE: `console-pro-neuronescf.vercel.app`. Shopify customer creation MANUAL — Fase 2.5 PARQUEADA (06-16). `nscf-mailer` v24. Auth PO = password hasheado server-side, evoluciona a roles en Fase 3 (#12). Secrets: `PO_CONSOLE_PASSWORD_HASH`, `PO_CONSOLE_JWT_SECRET`. (Nota: `nscf-b2b-approve` v5 actualizada 06-16 — verificar qué cambió si se retoma.)

**Patrón CC preview/live (aceptado 2026-06-13):** CC despliega EFs al proyecto Supabase vivo cuando son inertes hasta cargar secrets, señalándolo. Sam lo acepta mientras sea consciente.

**Patrón "artefacto nuevo sin permisos = fallo silencioso" (confirmado 3x el 06-16):** toda tabla nueva con RLS nace sin GRANT a roles PostgREST → supabase-js devuelve null (no excepción) → errores engañosos. CHECK obsoletos rechazan INSERT en silencio. Regla: tabla nueva = GRANT explícito + reload cache PostgREST en la misma migración; INSERT crítico chequea su error; antes de ampliar enum/CHECK estático preguntar si debería existir (si hay tabla canónica de verdad, el CHECK estático es deuda).

**Ayra — enfoque staging-loop (discutido 2026-06-13):** delegar a CC construcción en staging (Supabase branch + Vercel preview + schema `ayra` aislado), criterios de validación objetivos por fase escritos de antemano, Claude audita por sesión. Cuello de botella = decisiones de diseño, no código.

**CLAUDE.md por repo (estado 2026-06-08):** estándar dos capas (gobernanza CC arriba + contexto repo abajo). Pendientes: ítem #35.

**Fuentes de verdad — método (estado 2026-06-08):** ecosystem_graph.json y supabase_access_map.json DERIVAN del código y pueden tener deriva. Método confiable = drift detector (#37). **Drifts conocidos: `shopify.stores` VIEW vs BASE TABLE; `/api/professor` ya existe; content-run-stage comentario v1.11 vs runtime v31; fphs_institucional v0.5 genoma no listado.**

**SMA ForumPHs (estado 2026-06-06):** operativo. FB+IG+LinkedIn. WhatsApp EN PAUSA hasta número panameño. Email marketing FPHs = Resend+Supabase+Orchestrator.

**Gobernanza CC (estado 2026-06-07):** CC_PROTOCOL.md. Regla suprema: context files nunca se reemplazan. CC nunca pushea a unrlvl-context ni mergea PRs. SESSION_PROTOCOL v16: Ruta A / Ruta B.

**Genomas del ecosistema propio (estado 2026-06-16):** activos en `brand_voice_genome` — `unrlvl_default` v1.0, `lucien_editorial` v0.5, `lucien_social` v0.5, `sam_personal` v0.5, **+ `fphs_institucional` v0.5 (no listado antes — drift)**. lucien_editorial v0.5 y unrlvl_default v1.0 ya produjeron output real validado (divergencia 0.07).

**SamPublisher:** persona publicadora, NO el humano Sam. Canales Meta(FB)+LinkedIn (pendientes). Nunca vende (eso es UNRLVL); no toca religión (válvula = Lucien).

**Estado publicación (dato Sam 06-01):** Meta+TikTok publican vía Orchestrator probado para UNREALville. LucienSael y SamPublisher NO probados E2E. Antes del primer publish de cada uno: verificar/insertar fila en meta_accounts.

**Context System refactor:** Plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md. RIESGO ALTO — sesión dedicada.

**Ayra Sprint 0 🔴:** lab_jobs + lab_configs YA EXISTEN en prod. Pendiente: repo + Vercel + schema ayra + env vars. Deadline VENCIDO (5 Jun). Ver staging-loop arriba.
