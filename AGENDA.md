# AGENDA — Unrealville Studio
_Actualizada: 2026-06-26 · v2026-06-26-v2 (IID Sembrador T4 COMPLETO: front IID Seeds LIVE + auth dos ejes rol/scope + iid-inbound versionado en unrlvl-iid-functions · próximo: #45 brand_topics 6 marcas Marisol + sprint modo Expert/Boids + email-approval · base previa v2026-06-26-v1)_

---

## 🔴🔴 FOCO INMEDIATO — Sprint IID Sembrador (CERRADO) + R4B + arranque marcas Marisol

## 🟢🟢🟢 SPRINT SEMBRADOR — COMPLETO (T1-T4 cerradas, 26-jun)

**El Sembrador está LIVE end-to-end CON FRONT:** Marisol (rol seeder) captura semillas razonadas en el Orchestrator → destilado anti-IP → gate de Sam (rol admin) con corrección inline → handoff a iid-core → fan-out multimarca v22. Dos gates en serie. Auth de dos ejes (rol + scope gerente-de-cuentas). iid-inbound versionado en git.

| # | Tarea Sembrador | Estado |
|---|---|---|
| T1 | Limpieza test F3 | ✅ VERDE |
| T2 | Fan-out multimarca iid-core v22 + fanout.ts | ✅ HECHO |
| T3 | Cerebro: iid_seeds + EF iid-inbound v1 + IID-SEEDER | ✅ HECHO |
| **T4** | **Front IID Seeds + auth rol/scope + iid-inbound versionado** | ✅ **COMPLETO (26-jun)** |

**T4 entregado:**
- **Repo nuevo `unrealvillestudio-hub/unrlvl-iid-functions`** (private) — iid-inbound versionado (PR#1) + auth dos ejes (PR#2) + migraciones (PR#3) + seeder_brand_suggestion (PR#4). Todos mergeados. iid-inbound **v7** live. Salda parcialmente deuda §43 para esta EF.
- **Auth dos ejes en iid-inbound** (patrón nscf-b2b-approve): bcryptjs@2.4.3 cost 10, JWT HS256 djwt 8h, matriz PERMISSIONS fail-closed. Login solo contraseña. Scope = modelo gerente-de-cuentas (regla dura server-side). Marisol = seeder, 6 marcas. Secrets ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.
- **Front IID Seeds (Orchestrator, PR#1 mergeado):** login+ojo, gating por rol (seeder solo ve IID Seeds), captura razonada (seeder_rationale + seeder_brand_suggestion required como sugerencia), cola de approve admin (corrección inline domain/brand, maneja failed, out_of_scope). Verificado por Sam en Vercel Preview antes de merge.
- **iid_seeds +2 columnas:** seeder_rationale, seeder_brand_suggestion. GRANT SELECT brands→service_role (fix patrón recurrente).

**⚠️ Pendientes operativos de Sam (no bloquean):**
- **Rotar las 2 contraseñas temporales** (TempSam2026!/TempMari2026!) antes de que Marisol entre en producción real (pasaron por el chat). Opción limpia: script local sin compartir → regenerar JSON → recargar solo secret de usuarios (JWT secret no se toca).
- Byte-parity dura de iid-inbound cuando haya supabase CLI (functions download + git diff). Riesgo bajísimo (solo comentarios).

## 🔴 BLOQUEANTE — #45 brand_topics de las 6 marcas de Marisol (PRÓXIMO FOCO)
Sin esto el Sembrador NO produce para las marcas de Patricia: capture destila pero approve falla con "domain sin suscriptores". Es la siguiente decisión de arquitectura de contenido (qué domains por marca), NO mecánica → sesión propia con HRD. Ver detalle en tabla #45.

**Carril paralelo (no bloquea):** voz hermana pedagógica UNRLVL+Lucien. Campo `iid_seeds.lane` (standard|pedagogical) ya preparado. `iid_content_queue.psycho_preset` SIN CHECK → basta preset pedagógico sin tabla nueva.

**Notas del Sembrador:**
- Multimarca por construcción: sumar marca a un domain = INSERT en brand_topics + 1 línea en CHECK de iid_content_queue.voice. Cero código.
- Gobernanza: iid-inbound AHORA versionado (excepción a "EFs IID direct-on-prod" por llevar auth de producción). Resto de EFs IID siguen sin repo (deuda §43).
- Acople 4B: iid-inbound→iid-core por HTTP (contrato duro). Si iid-core cambia su body, revisar iid-inbound.

---

## 🔵🔵 PRÓXIMO SPRINT — Modo Expert/Boids (construcción de marcas y genomas)

**Qué es:** segundo modo de captura del Sembrador, para construir marcas/genomas con análisis profundo de técnica de creadores (el método del caso boids original que produjo la voz educativa de Lucien). Uso INTENSIVO ahora (mientras se construyen las marcas de Patricia), casi nulo después (cuando el batallón de IIDs ya traiga todo).

| # | Item | Estado |
|---|---|---|
| EXP-1 | Sub-pestaña: renombrar "Capturar"→"Basic" + crear "Expert" en IID Seeds | 🔵 mapeado |
| EXP-2 | Upload de video/imagen descargada (no solo link) | 🔵 mapeado |
| EXP-3 | Pipeline framing + OCR + análisis de tono/estructura/técnica (skill voice-reference-extractor como base) | 🔵 mapeado |
| EXP-4 | Seed pedagógico (lane=pedagogical, ya preparado; psycho_preset pedagógico sin tabla nueva) | 🔵 mapeado |
| EXP-5 | Anti-IP: el material es insumo de aprendizaje de TÉCNICA/MÉTODO, nunca fuente a reescribir (análogo frame Nietzsche de Lucien) | 🔵 regla dura |

**Approval por email (tarea aparte, post-T4):** email a content-approval@unrealvillestudio.com, SIN resumen, solo enlace directo a la pestaña "Cola de revisión" del Orchestrator. Disparado en awaiting_approval. EF tipo nscf-mailer. No descarta el approve dentro del Orchestrator (canal preferido = email; el approve sigue en el Orchestrator).

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
| Aprobar learnings Professor | (5 del 25-jun b pendientes + 7 del 26-jun ✅ aprobados) | Professor |

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
| 43 | **Versionar EFs del IID en repo (deuda sin-repo §1)** — PARCIALMENTE saldado en T4 (iid-inbound versionado en unrlvl-iid-functions). Falta el resto de EFs IID (iid-core, fanout.ts, content-*, etc.) → mismo repo. | UNRLVL |
| 44 | **Eje B implementación** — regenerar spec con 2 decisiones (objective_by_platform + embeddings texto/visual) → Ruta B + Gate 7 + Gate 8 greenfield | UNRLVL |
| 45 | **Sembrar brand_topics de las 6 marcas de Marisol (BLOQUEANTE del Sembrador para NSCF/Patricia)** — VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF existen en public.brands pero NO tienen topics/domains en intel.brand_topics. Sin esto, capture destila pero approve falla con "domain sin suscriptores" → status=failed. Decisión de arquitectura de contenido (qué domains por marca), NO mecánica → sesión propia con HRD. PRÓXIMO FOCO post-T4. | NeuroneSCF/UNRLVL |
| 46 | **Tab "Topic Proposals" en IID Intel (post-#45, ligado)** — captura ESTRUCTURADA de criterio de Marisol (preguntas guiadas por marca → tabla iid_topic_proposals borrador → Sam revisa y convierte en domains reales → CC inserta bajo brief). Marisol-alimenta / Sam-diseña / CC-escribe. NO Claude-abierto sin contexto. Es el CÓMO se recoge el material de #45. | NeuroneSCF/UNRLVL |
| 47 | **Sprint modo Expert/Boids** — segundo modo de captura del Sembrador (sub-pestaña Basic/Expert + upload video/imagen + framing/OCR/análisis de técnica + seed pedagógico lane). Construcción de marcas/genomas (el método del caso boids). Uso intensivo ahora, nulo después. Detalle en bloque "PRÓXIMO SPRINT". | UNRLVL |
| 48 | **Approval por email** — enlace simple a "Cola de revisión" del Orchestrator (sin resumen), disparado en awaiting_approval. EF tipo nscf-mailer a content-approval@unrealvillestudio.com. No descarta el approve en Orchestrator. | UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 (CLAUDE.md repos restantes) + #39 (.github/CLAUDE.md repetido). Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Es ley activa de CC → cuesta en cada sesión mientras esté incompleta. Trabajo propio con foco, NO dentro de un sprint de producto.

---

## ✅ Resuelto recientemente
- ✅ **IID Sembrador T4 COMPLETO (26-jun).** Front IID Seeds LIVE en Orchestrator (login+gating por rol seeder/admin, captura razonada, cola de approve con corrección inline). Auth dos ejes (rol + scope gerente-de-cuentas, patrón nscf-b2b-approve) en iid-inbound v7. Repo nuevo unrlvl-iid-functions (iid-inbound versionado + migraciones, PRs #1-#4). Hallazgos: Orchestrator no tenía auth; patrón NSCF=EF Supabase; iid-inbound sin fuente git (Sam la proveyó); 6 marcas Marisol sin brand_topics (#45 bloqueante). Descubrimiento mayor: dos modos de semilla (Basic LIVE / Expert-Boids próximo sprint #47). Professor: 7 learnings aprobados. — 2026-06-26
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

**IID Sembrador — estado 2026-06-26 (T4 COMPLETO):** front IID Seeds LIVE en Orchestrator. Marisol (seeder, 6 marcas scope) captura razonada (seeder_rationale + seeder_brand_suggestion); Sam (admin) aprueba con corrección inline. Auth dos ejes en iid-inbound v7 (bcrypt+JWT+matriz fail-closed+scope gerente-de-cuentas server-side). iid-inbound versionado en unrlvl-iid-functions. BLOQUEANTE producción para marcas Marisol = #45 (brand_topics sin sembrar). Próximo: #45 → sprint Expert/Boids (#47) → email-approval (#48). Contraseñas temporales a rotar antes de producción.

**IID Sembrador — estado 2026-06-25 b:** LIVE end-to-end (sin front). iid-inbound v1, iid_seeds, IID-SEEDER sentinela. Pecado original muerto. Contrato autopublish = score>=85 AND brand_topics.auto_approve.

**IID — estado 2026-06-25 a:** content-dispatcher v27 (.limit(1) intacto, transporta domain) → content-run-stage v41 → content-watcher v5 (6 gates; Gate 7/8 eje B NO implementados) → approve-piece v14. Modelo claude-sonnet-4-6.

**Marcas (public.brands) — referencia scope:** las 6 de Marisol = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF. brand_topics SOLO pobladas para LucienSael + UnrealvilleStudio.

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; AQUÍ vive credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23.

**Genoma Lucien v1.0 (19-jun):** 2 voces (editorial+social). core_move generativo/constructor.

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for en queue. Ventanas ET, jitter ±45min. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768.

**Radar pgvector:** instalado pero SIN materializar. Gate 8 visual del eje B = greenfield de embeddings.

**Patrones gobernanza:** spec sin fuente=suposiciones; IID EFs sin repo → direct-on-prod (EXCEPCIÓN: iid-inbound versionado en T4 por llevar auth); CHECK de tablas core son enums cerrados; acople-por-contrato (4B); auth multi-usuario = patrón nscf-b2b-approve (bcryptjs@2.4.3 cost 10, JWT HS256 djwt, usuarios en secret JSON, matriz PERMISSIONS fail-closed, sin short-circuit); scope de marca = modelo gerente-de-cuentas (regla dura server-side, NO filtro de UI); EF sin fuente git = pedir el código al humano, no reconstruir del ESZIP; GRANT service_role aplica también a tablas viejas leídas por EF nueva; disciplina sesión-nueva CC (verificar rama base, no arrastrar ramas claude/* viejas).

**Secrets:** cada marca su key Resend. Vertex SA en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.

**Estado publicación:** UNREALville E2E. Lucien/SamPublisher NO E2E (liga 5b). Publicación real bloqueada por ANTISPAM_CONTRACT §6 hasta R4B.

**Anti-IP (dos modos de semilla):** Basic = material nunca leído, tema neutro. Expert/Boids = material es insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir (análogo frame Nietzsche de Lucien: motor interno, nunca citado).

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
