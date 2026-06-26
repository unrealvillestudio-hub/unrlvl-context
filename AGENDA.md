# AGENDA — Unrealville Studio
_Actualizada: 2026-06-26 · v2026-06-26-v1 (IID Sembrador T4 EN CURSO: brief definitivo sobre código real — versionar iid-inbound + auth dos ejes rol/scope + front IID Seeds; pendientes #45 brand_topics 6 marcas Marisol + #46 tab Topic Proposals · base previa v2026-06-25-v1: Sembrador CONSTRUIDO T1-T3)_

---

## 🔴🔴 FOCO INMEDIATO — Sprint IID Sembrador + R4B (cierre, deadline 1ª sem julio)

## 🟢🟢🟢 SPRINT SEMBRADOR — T1-T3 CERRADAS (25-jun b) · T4 EN CURSO (26-jun)

**El Sembrador está LIVE end-to-end:** semilla humana (link+frase) → destilado anti-IP → gate temprano de Sam → handoff a iid-core → fan-out multimarca v22. Dos gates en serie. Pecado original (default_voice→marca) muerto en el origen.

| # | Tarea Sembrador | Estado |
|---|---|---|
| T1 | Limpieza test F3 | ✅ VERDE (ya estaba) |
| T2 | Fan-out multimarca iid-core v22 + fanout.ts + migración CHECK voice→voice_id | ✅ HECHO · verificado (3 filas ai-cognition / 0 filas llm) |
| T3 | Cerebro: tabla iid_seeds + EF iid-inbound v1 + agente IID-SEEDER | ✅ HECHO · 4 aserciones verdes |
| **T4** | **Front IID Seeds + auth rol/scope. BRIEF DEFINITIVO ENTREGADO (26-jun) sobre código real de iid-inbound.** | 🟡 **EN CURSO (CC)** |

**T4 — alcance fijado (26-jun):**
- **Versionar `iid-inbound` real en git** (`Orchestrator/supabase/functions/iid-inbound/`) ANTES del auth. Código real provisto por Sam (NO reconstrucción). Salda parcialmente #43 para esta EF.
- **Auth A1 dos ejes (rol + scope de marca)** patrón `nscf-b2b-approve`: bcryptjs@2.4.3 cost 10, JWT HS256 djwt 8h, matriz PERMISSIONS fail-closed. Login SOLO contraseña. Secrets `ORCHESTRATOR_NSCF_IID_INTEL_USERS` + `ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET` (en Supabase, la EF autentica).
- **Scope = modelo gerente de cuentas (regla dura transversal):** cada usuario solo ve/toca SUS marcas, garantizado server-side en la EF, no en UI. Marisol scope = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF (6 id reales). Nuevo ayudante futuro = su propio brand_scope, cero código.
- **Cambios menores iid-inbound:** columna `seeder_rationale` (captura razonada — Marisol aporta criterio) + persistir en `capture` con `captured_by=jwt.sub` + añadir `distill_notes`/`seeder_rationale`/`rejected_reason` al select de `list`. Scores sintéticos y handoff a iid-core INTACTOS.
- **Front:** login + captura razonada + cola de approve (corrección inline domain/brand v1, maneja estado `failed`). Habla directo a la EF (patrón NSCF, sin /api/* intermedio). Banner honesto anti-captura-en-vacío mientras #45 pendiente.
- **Gobernanza:** Orchestrator SÍ tiene repo → Rama+PR+Preview verificado por Sam. Deploy EF ≠ merge (acciones separadas). EF verde ANTES del merge del front.

**Carril paralelo (no bloquea):** voz hermana pedagógica UNRLVL+Lucien (~27-jun). Material: Reel enjambres ya procesado (técnica: gancho histórico→desmontar intuición→revelar mecanismo→expandir). Campo `iid_seeds.lane` (standard|pedagogical) ya preparado. `iid_content_queue.psycho_preset` SIN CHECK → basta para preset pedagógico, NO requiere tabla nueva.

**Notas del Sembrador (para T4 y futuro):**
- Multimarca probado por construcción: sumar NSCF/FPHs = INSERT fila en `brand_topics(domain)` + 1 línea en el CHECK de `iid_content_queue.voice`. Cero código. **PERO las 6 marcas de Marisol AÚN NO tienen topics → ver #45 (bloqueante de producción).**
- Acople 4B aceptado: iid-inbound→iid-core por HTTP (contrato duro fijado). Si iid-core cambia su body, revisar iid-inbound.
- Gobernanza IID EFs (sin repo): patrón canónico = direct-on-prod staged+reversible con cleanup. EXCEPCIÓN T4: iid-inbound SÍ se versiona (lleva auth de producción; auth sin git es frágil).

---

## 🔴🔴🔴 R4B — RECONEXIÓN FASE 3 + endurecimiento Watcher (paralelo al Sembrador)

**Estado base:** Fase 3 transporte REPARADO y verde (dispatcher v27 transporta domain, cron 29 activo). Modelo nuevo conectado. El Sembrador alimenta la queue por el carril humano; R4B cierra el carril automático + publicación real.

| # | Item | Estado | Dueño |
|---|---|---|---|
| 5e-1 | Scheduler content-scheduler (EF+cron 1×/día ET). Mapea (brand_id+domain)→brand_topics, Interpretación A, jitter ±45min, ventanas ET, sibling-stagger ≥48h, escribe scheduled_for | 🔴 ESPECIFICADO, desbloqueable (write ya en v41) | Chat 1 |
| 5e-2 | gate1+gate5 → pgvector (Vertex gemini-embedding-001 @768) | 🟢 DESBLOQUEADO (Vertex creds en Supabase) | Chat 2 |
| 5e-3 | Gates 2/3 → BLOQUEANTES (flag OFF) | ⏳ tras 5e-2 | Chat 2 |
| 5e-4-disp | Parche dispatcher: AND scheduled_for <= now(). NO tocar .limit(1) | ⏳ acoplado al Scheduler | Chat 1 |
| 5b | IID publicación real (Meta) — CHAT DEDICADO. Verificar cuentas Meta Lucien/SamPublisher. Gatilla approve-piece v14. | 🔴 | Lucien/UNRLVL |
| 5r | rejected_reason en approve-piece — rechazos manuales se pierden | 🔴 | UNRLVL/Lucien |

**Eje B (post-Sembrador / dentro de R4B):** matriz estímulo (artefacto×objetivo) validada + Ruta B confirmada + Gate 7 (objetivo↔estímulo) + Gate 8 (similitud visual, GREENFIELD embeddings). Spec `IID_SPEC_EJE-B_estimulo-matriz-watcher.md` verificada de factibilidad; pendiente regenerar como spec de IMPLEMENTACIÓN con las 2 decisiones (objective_by_platform jsonb + migrar texto Y visual a embeddings). Detalle en session_log §9 (24-jun b).

### Bloqueos que requieren ACCIÓN DE SAM
| # | Acción de Sam | Desbloquea |
|---|---|---|
| ✅ Vertex creds en Supabase (22-jun) | 3 secrets cargados | 5e-2/5e-3 |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar | crescendo Scheduler |
| ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET | Cargar en Supabase al desplegar T4 (CC entrega script de hashes con self-test) | auth del front IID Seeds |
| brand_topics 6 marcas Marisol (#45) | Decidir domains por marca en sesión propia (arquitectura de contenido) | Sembrador produce para NSCF/Patricia |
| Aprobar 5 learnings Professor (2 T2 + 3 T3) | b85ac073, d588ce0c, 983ac335, 4a47ff92, d5748e60 | Professor |

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
| 43 | **Versionar EFs del IID en repo (deuda sin-repo §1)** — habilita que iid-inbound reuse fanout.ts "de una sola fuente" sin duplicar; separa del sprint de producto. PARCIALMENTE saldado en T4 (iid-inbound versionado). Falta el resto de EFs IID. | UNRLVL |
| 44 | **Eje B implementación** — regenerar spec con 2 decisiones (objective_by_platform + embeddings texto/visual) → Ruta B + Gate 7 + Gate 8 greenfield | UNRLVL |
| 45 | **Sembrar brand_topics de las 6 marcas de Marisol (BLOQUEANTE del Sembrador para NSCF/Patricia)** — VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF NO tienen topics/domains en intel.brand_topics (solo LucienSael+UnrealvilleStudio los tienen). Sin esto, capture destila pero approve falla con "domain sin suscriptores" → status=failed. T4 cablea el scope con los 6 id reales pero el sistema queda DORMIDO para ellas hasta sembrar. Decisión de arquitectura de contenido (qué domains por marca), NO mecánica → sesión propia con HRD. | NeuroneSCF/UNRLVL |
| 46 | **Tab "Topic Proposals" en IID Intel (post-T4, ligado a #45)** — módulo de captura ESTRUCTURADA de criterio de dominio de Marisol (NO creación libre con Claude-abierto). Marisol responde preguntas guiadas por marca → se guardan en tabla nueva iid_topic_proposals (estado borrador) → Sam revisa en su gate y convierte en domains reales de brand_topics → CC hace el INSERT bajo brief. Modelo: Marisol-alimenta / Sam-diseña / CC-escribe. NO dar a Marisol escritura de arquitectura ni Claude sin contexto de ecosistema. Es el CÓMO se recoge el material de #45. | NeuroneSCF/UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 (CLAUDE.md repos restantes) + #39 (.github/CLAUDE.md repetido). Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Es ley activa de CC → cuesta en cada sesión mientras esté incompleta. Trabajo propio con foco, NO dentro de un sprint de producto.

---

## ✅ Resuelto recientemente
- ✅ **IID Sembrador T4 brief definitivo (26-jun).** Verificado en código real: Orchestrator SIN auth (se construye desde cero, no se extiende); patrón NSCF-Console = EF de Supabase (nscf-b2b-approve) con usuarios en secret JSON bcrypt+JWT+matriz fail-closed, NO /api/* Vercel. iid-inbound NO tenía fuente en git → Sam proveyó index.ts real → se versiona tal cual antes del auth. 6 marcas de Marisol existen en public.brands pero NO en brand_topics → #45 bloqueante. Scope = modelo gerente de cuentas (regla dura transversal). Tab topic-proposals diferido (#46). — 2026-06-26
- ✅ **IID Sembrador CONSTRUIDO T1-T3 (25-jun b).** Fan-out multimarca iid-core v22 (módulo fanout.ts, mata default_voice, migración CHECK voice→voice_id). Cerebro iid-inbound v1 (capture/approve/reject/list, destilado anti-IP + gate temprano + handoff 4B). Tabla iid_seeds + agente sentinela IID-SEEDER. Verificado: 3 filas ai-cognition / 0 filas llm; 4 aserciones T3 verdes; artefactos limpios; cron 29 restaurado. Dos gates en serie. Multimarca por construcción. Falta T4 (front). — 2026-06-25
- ✅ **IID Fase 3 transporte REPARADO (25-jun a).** dispatcher v26→v27 (transporta domain queue→job), cron 29 reactivado, pieza de prueba a awaiting_approval verde. Bug "sin suscripción brand_topics" resuelto. Dominio algorithm-mechanics abierto en brand_topics (UNRLVL, phase 2). — 2026-06-25
- ✅ Eje B diseño (24-jun b): matriz estímulo validada celda-por-celda + Ruta B confirmada + Gate 7/8 + 2 decisiones (objective_by_platform + embeddings). Factibilidad CC#5. — 2026-06-24
- ✅ ImageLab migración Imagen→Gemini (24-jun) + BGRemover mergeado. — 2026-06-24
- ✅ R4B Chat 2 — DDL + calidad output + extracción Watcher (20-jun). — 2026-06-20
- ✅ Arquitectura híbrida queue + #5i frontera (20-jun). — 2026-06-20
- ✅ Cadencia Lucien + UNRLVL poblada (19-jun). #5i GENOMA v1.0 LUCIEN CERRADO. — 2026-06-19
- ✅ IID OUTPUT QUALITY LOTE A (18-jun). IID #5b end-to-end (17-jun). Builder Convergido + Watcher LIVE (16-jun).
- ✅ NSCF Resend hardening / Fase 2 / PR #2 (13-16 jun). Genomas v0.5 (1-2 jun). Gobernanza CC (6-7 jun).

---

## Notas de contexto

**IID Sembrador — estado 2026-06-26 (T4 en curso):** brief definitivo entregado a CC sobre código real. iid-inbound se versiona (Orchestrator/supabase/functions/iid-inbound/) + auth dos ejes (rol seeder/admin + scope gerente-de-cuentas) + columna seeder_rationale + front IID Seeds. Login solo contraseña. Secrets ORCHESTRATOR_NSCF_IID_INTEL_USERS/_JWT_SECRET en Supabase. BLOQUEANTE producción para marcas de Marisol: #45 (brand_topics sin sembrar). Diferido: #46 tab topic-proposals.

**IID Sembrador — estado 2026-06-25 b:** LIVE end-to-end. iid-inbound v1 (capture destila anti-IP + mapea brand_topics → awaiting_approval → approve handoff a iid-core → fan-out v22). iid_seeds (rastro+lane+status). IID-SEEDER sentinela (ce44ac81, is_active=false). 29 agentes = 28 research + 1 sentinela. Pecado original muerto: el fan-out lee brand_topics, NO default_voice. Contrato autopublish = score>=85 AND brand_topics.auto_approve (urgency dropeado). Falta T4 (front + rol SEEDER + secret).

**IID — estado 2026-06-25 a:** content-dispatcher v27 (.limit(1) intacto, transporta domain) → content-run-stage v41 (Builder+aife+imagelab→CDN+sociallab+callWatcher+domain-write) → content-watcher v5 (6 gates, lógica v1; Gate 7/8 eje B NO implementados) → approve-piece v14. Modelo claude-sonnet-4-6.

**Marcas (public.brands) — referencia scope:** las 6 de Marisol = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF. Otras activas: LucienSael, UnrealvilleStudio, UnrealvilleStores, ForumPHs, SamPublisher, PatriciaOsorioComunidad, PatriciaOsorioPersonal, DiamondDetails, DEFAULT. brand_topics SOLO pobladas para LucienSael + UnrealvilleStudio.

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; AQUÍ vive credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23 (sin creds Vertex).

**Genoma Lucien v1.0 (19-jun):** 2 voces (editorial+social). core_move generativo/constructor. Patrón en Professor (13 rasgos).

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for en queue (NULL=no dispares). Ventanas ET, jitter ±45min. Colisión intra-marca cross-plataforma=regla dura. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768 Matryoshka. rollout en intel.brand_rollout.

**Radar pgvector:** instalado pero SIN materializar (cero columnas vector). Gates de texto usan Claude-semántico. Gate 8 visual del eje B = greenfield de embeddings, NO índice al lado de uno existente.

**Patrones gobernanza:** spec sin fuente=suposiciones; reescritura EF no hereda side-effects; IID EFs sin repo → direct-on-prod staged+reversible (NO Rama+PR+Preview) — EXCEPCIÓN: iid-inbound se versiona en T4 por llevar auth; CHECK de tablas core son enums cerrados (verificar antes de insertar valor nuevo; fixture que no corre = enum válido + notes, no alterar constraint); acople-por-contrato (4B) = fijar contrato duro de la EF destino + registrar dependencia; auth multi-usuario = patrón nscf-b2b-approve (bcryptjs@2.4.3 cost 10, JWT HS256 djwt, usuarios en secret JSON, matriz PERMISSIONS fail-closed, sin short-circuit en compare); scope de marca = modelo gerente-de-cuentas (regla dura server-side, no filtro de UI).

**Secrets:** cada marca su key Resend. Vertex Service Account en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.

**Estado publicación:** UNREALville E2E. Lucien/SamPublisher NO E2E — verificar meta_accounts antes (liga 5b). Publicación real bloqueada por ANTISPAM_CONTRACT §6 hasta R4B.

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
