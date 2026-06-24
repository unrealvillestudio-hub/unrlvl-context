# AGENDA — Unrealville Studio
_Actualizada: 2026-06-24 · v2026-06-24-v1 (ImageLab migración P0 Imagen→Gemini CERRADA + BGRemover mergeado · base previa v2026-06-20-v1: #5i genoma v1.0 · R4B Chat 2 parcial · arquitectura híbrida queue · Scheduler especificado-bloqueado)_

---

## 🔴🔴 FOCO INMEDIATO — R4B (cierre, deadline 1ª sem julio)

# BLOQUE PARA AGENDA — insertar al tope del FOCO INMEDIATO

## 🔴🔴🔴 FOCO — IID FASE 3: RECONEXIÓN DEL FLUJO (próximo chat dedicado)

**Estado: IID limpio y DETENIDO tras tabla rasa (2026-06-23).** Modelo viejo eliminado. Modelo nuevo intacto pero desconectado del disparo. Handoff completo sin gaps: `IID/FASE_3_HANDOFF.md`.

| # | Fase 3 — construir | Estado |
|---|---|---|
| F3.1 | Disparo de los 14 agentes UNRLVL-* (cron/orquestador). Research que escribe brand_id+domain mapeables a brand_topics | 🔴 por construir |
| F3.2 | Research/process nuevo puebla el puente (brand_id+domain) desde el ORIGEN, no solo en finalizePiece | 🔴 por construir |
| F3.3 | Re-incorporar contrato de scoring (content_score>=85 → autopublish) al modelo nuevo, condicionado a brand_topics.auto_approve (DOBLE LLAVE) | 🔴 DEUDA EXPLÍCITA — conservar |
| F3.4 | Reactivar dispatcher (jobid 29) + parche scheduled_for. NO tocar .limit(1) hasta publicación real | 🔴 tras F3.1-2 |
| F3.5 | Scheduler content-scheduler (5e-1) — depende de F3.1-2 (necesita filas mapeables) | 🔴 desbloqueado, depende |
| F3.6 | PRIMER RUN validación genoma v1.0 Lucien con IID real (el objetivo original) | 🟢 tras F3.1-4 |

**Contrato de scoring (NO PERDER):** content_score>=85 → autopublish vive en iid-process. El modelo nuevo lo re-incorpora con doble llave (score Y auto_approve por marca). Hoy auto_approve=false en todas = nada se auto-publica sin Sam.

**Drift a corregir cuando se toque:** content-dispatcher es v26 (doc decía v22), content-run-stage es v41 (doc decía v37). SocialLab usa modelo retirado claude-sonnet-4-20250514 (ítem 42).

**5s limpieza queue: ✅ HECHO** (tabla rasa). **5e-2/5e-3:** ahora en chat principal (no Chat 2), Vertex ya desbloqueado.

**Verificación (c) migración Gemini en ImageLab — DIFERIDA a Fase 3:** cuando el IID se reconecte (hoy DETENIDO tras tabla rasa 23-jun), confirmar en el PRIMER run que la pieza llega con `assets.image.url` poblada en `content.content_pieces` (valida la cadena de imagen sobre gemini-2.5-flash-image en producción IID). **No observable hasta la reconexión — NO hay cron corriendo que observar; la verificación se hace en el primer run natural de Fase 3.**

### Bloqueos que requieren ACCIÓN DE SAM
| # | Acción de Sam | Desbloquea |
|---|---|---|
| ✅ Vertex creds EN SUPABASE (22-jun, Sam) | Cargados los 3 secrets: GOOGLE_SERVICE_ACCOUNT_KEY (JSON completo del SA imagelab-vercel@gen-lang-client-0491381650), GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION. Nombres verificados por Chat 1. Pendiente: validar formato del JSON en el primer run de embeddings (modo de fallo: salto de linea en private_key). DESBLOQUEA 5e-2/5e-3. | ✅ → Chat 2 |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar. | crescendo Scheduler |

### R4B — estado por ítem
| # | Item | Estado | Dueño |
|---|---|---|---|
| 5e-5 | DDL domain en orchestrator_jobs+content_pieces + pgvector v0.8.0 + índice + GRANT | ✅ HECHO | Chat 2 |
| 5e-5-bis | domain columna en iid_content_queue (puente) + GRANT | ✅ HECHO | Chat 1 |
| 5o/5p-a/5q | content-run-stage v36: email title=copy.title; seed imagen=título+copy; domain-write | ✅ deployado (falta run E2E) | Chat 2 |
| 5e-4 | Watcher → EF content-watcher v1. content-run-stage v37 callWatcher AbortController(90s) fail-closed=REJECT + domain-write queue | ✅ HECHO | Chat 2 |
| 5e-2 | gate1+gate5 → pgvector (Vertex gemini-embedding-001 @768) | 🟢 DESBLOQUEADO (creds en Supabase 22-jun) — listo para Chat 2 | Chat 2 |
| 5e-3 | Gates 2/3 → BLOQUEANTES (flag OFF) | ⏳ tras 5e-2 | Chat 2 |
| 5e-1 | Scheduler content-scheduler (EF+cron 1×/día ET). Mapea (brand_id+domain)→brand_topics, Interpretación A, jitter ±45min, ventanas ET, sibling-stagger ≥48h, escribe scheduled_for | 🔴 ESPECIFICADO, desbloqueable (write ya en v37) | Chat 1 |
| 5e-4-disp | Parche dispatcher: AND scheduled_for <= now(). NO tocar .limit(1) | ⏳ acoplado al Scheduler | Chat 1 |

Arquitectura híbrida queue (Sam 20-jun): queue lleva brand_id+domain (puente, escrito por Builder); brand_topics fuente ÚNICA de platforms/cadence/rollout. platforms=[] = no-problema. Evita drift. Detalle: protocols/R4B_RESPUESTA_CHAT1.md.

---

## ✅ #5i — GENOMA v1.0 DE LUCIEN — CERRADO (19-jun)
Destilado por muestreo (8/10 marcadas Lucien). core_move reescrito reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (lucien_editorial + lucien_social). 3 angles corregidos (ai-cognition podado; ai-identity + human-essence poblados). Professor: 6 learnings (principio madre + método calibración por muestreo). Validación pendiente: 2-3 piezas IID real post-R4B.

---

## 🟢 LISTO PARA CC
| 1 | luciensael.com repo+Vercel+DNS | Lucien |
| 2 | UNRLVL Field Notes push | UNRLVL |

---

## 🔴 CRÍTICO — Esta semana (resto)
| # | Item | Marca | Blocker |
|---|---|---|---|
| 5b | IID publicación real (Meta) — CHAT DEDICADO. Verificar cuentas Meta Lucien/SamPublisher. Gatilla §5.4 (approve-piece v14). Cierra run E2E que valida 5o/5p-a/5q. | Lucien/UNRLVL | Cuentas Meta (Vertex ya resuelto) |
| 5r | rejected_reason en approve-piece (NUEVO) — rechazos manuales de Sam se pierden (failed sin motivo). Capturar campo libre. Alimenta genoma Lucien con muestreo de producción gratis. No colisiona (toca approve-piece). Adjuntar a genoma. | UNRLVL/Lucien | — |
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
| 5g | ✅ RESUELTO (domain a columna = 5e-5) | — |
| 5m | Borrar EFs efímeras (stubs 410) | UNRLVL |
| 5n | Barrer to: sam@ hardcodeado | UNRLVL/multi |
| 5s | Limpieza queue (NUEVO) — filas no-mapeables (abril cadáveres + 19-20jun pruebas abortadas). Purgar antes de producción Scheduler. | UNRLVL |
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
| 42 | model ID hardcodeado + 13 EFs one-off · content-run-stage loguea modelId 'imagen-3.0-fast-generate-001' en telemetría (logGen ~L742/752/760) → misatribuye modelo/costo post-migración Gemini (solo string contable, no rompe) | UNRLVL/NeuroneSCF |
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
| 37 | Drift detector. Drifts: shopify.stores VIEW→BASE; /api/professor existe; content-run-stage v37; fphs_institucional v0.5 no en ecosystem.json; cron unrlvl-media 12d; get_edge_function LEGIBLE para content-run-stage pero ESZIP para lab-worker (mixto). | UNRLVL |
| 38 | Reconciliación ecosystem_graph | UNRLVL |
| 39 | .github/CLAUDE.md repetido | UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida y eleva #35 (CLAUDE.md repos restantes) + #39 (.github/CLAUDE.md repetido). **SESIÓN DEDICADA CLAUDE.md** — resolver el duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir el canónico, cerrar la gobernanza CC a medias. Es **ley activa de CC** (no historia pasiva) → cuesta en cada sesión mientras esté incompleta. Trabajo propio con foco, NO dentro de un sprint de producto.

---

## ✅ Resuelto recientemente
- ✅ ImageLab migración P0 Imagen→Gemini (24-jun). Todos los Vertex Imagen apagados 24-jun. api/execute.ts → gemini-2.5-flash-image vía :generateContent (endpoint+body+parsing+multimodal distintos, no string-swap). PR #2 merged (6d04556), producción verificada. Drift cerrado: execute.ts único punto imagen vivo. + BGRemover (ex-ProductShots, composición descartada por límite luz-coherencia) MERGEADO a main (merge commit a1b2a1a) — herramienta de remoción de fondo remove.bg, 3 pasos, cap 2400px. — 2026-06-24
- ✅ R4B Chat 2 — DDL + calidad output + extracción Watcher (20-jun). DDL 5e-5 (domain + pgvector v0.8.0 + índice + GRANT). content-run-stage v35→v36 (5o/5p-a/5q + domain-write) → v37 (5e-4 callWatcher fail-closed + domain-write queue). content-watcher v1 (6 gates, verificado aislado). Decisiones D-A/B/C + ventanas ET + jitter ±45min. Bloqueos: 5e-2 (Vertex creds) → 5e-3 espera. — 2026-06-20
- ✅ Arquitectura híbrida queue + #5i frontera (20-jun, Chat 1). queue=brand_id+domain (puente), brand_topics=fuente única. DDL domain en iid_content_queue. Scheduler especificado, write ya en v37. protocols/R4B_RESPUESTA_CHAT1.md. — 2026-06-20
- ✅ Cadencia Lucien + UNRLVL poblada (19-jun). Interpretación A. Lucien blog 1/1/2 · x/fb/ig 2/3/4 · tiktok 1/2/3. 9/9 filas fase 1 con cadence. — 2026-06-19
- ✅ #5i GENOMA v1.0 LUCIEN CERRADO (19-jun). — 2026-06-19
- ✅ IID OUTPUT QUALITY LOTE A (18-jun). content-run-stage v34→v35, approve-piece v13→v14. — 2026-06-18
- ✅ IID #5b end-to-end (17-jun). — 2026-06-17
- ✅ Builder Convergido + Watcher LIVE (16-jun). Cuarentena 293 cadáveres.
- ✅ NSCF Resend hardening / Fase 2 / PR #2 (13-16 jun). Genomas v0.5 (1-2 jun). Gobernanza CC (6-7 jun).

---

## Notas de contexto

IID — estado 2026-06-20: content-dispatcher v22 (.limit(1) intacto, IGNORA scheduled_for) → content-run-stage v37 (Builder+aife+imagelab→CDN+sociallab+callWatcher+domain-write jobs/pieces/queue) → content-watcher v1 (6 gates) → approve-piece v14 (publish Meta + move-to-permanent + reject SIN rejected_reason → #5r). Modelo claude-sonnet-4-6. Imagen unrlvl-media CDN. pgvector v0.8.0. Pendiente: Vertex creds, Scheduler (desbloqueable), parche dispatcher, publicación real (5b).

Stack labs (lab_configs 20-jun): copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (AQUÍ vive credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23 llama por HTTP vía lab_configs; NO tiene creds Vertex (solo SUPABASE/ANTHROPIC).

ImageLab (24-jun): v7 sobre gemini-2.5-flash-image vía :generateContent (Vertex Imagen apagado 24-jun; execute.ts único punto de imagen vivo). BGRemover (rama clever-bell-293d56) MERGEADO a main (merge commit a1b2a1a); removeBackground.ts (root+src) confirmado AUSENTE en origin/main. Nueva env REMOVEBG_API_KEY en Vercel image-lab. Cabos operativos no-repo: carpeta física del worktree CC bloqueada por Windows hasta cierre de sesión; main local de Sam aún en 198be69 → pull/GitHub Desktop para traer la feature.

Genoma Lucien v1.0 (19-jun): 2 voces (editorial+social, NO 3). core_move generativo/constructor. Firmas: ❯ Unrealville Studio / --- LucienSael: Builder, Thinker, Operator. Patrón en Professor (13 rasgos): generativo no reactivo, figura concreta, filo material/presente sin salida digna, comprime en imagen-sentencia, garbo no crudeza, constructor>destructor, reclutar afines, contención munición pesada, cierre reposiciona+recluta, pregunta-cuchillo baja frecuencia, registro culto sin ancla nacional, científico-psicológico en ai-cognition, libros/ecosystem sin nombrar.

Arquitectura queue híbrida (20-jun): Builder escribe brand_id+domain en iid_content_queue (puente, ya en v37); Scheduler mapea (brand_id+domain)→brand_topics, lee platforms/cadence/rollout ahí. Interpretación A: cadencia por-marca-por-plataforma, dominios rotan, NUNCA multiplican.

Decisiones R4B congeladas (20-jun): Scheduler EF+cron 1×/día ET. scheduled_for en queue (NULL=no dispares). Ventanas ET, jitter ±45min. Colisión intra-marca cross-plataforma=regla dura. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768 Matryoshka. rollout en intel.brand_rollout.

Costeo IID: PAUSADO (Sam) — se implementa con todos los labs en secuencia cuando estén operativos. Instrumentación tokens (5e-6) diferida.

Patrones gobernanza (18-20 jun): spec sin fuente=suposiciones que el código desmiente; reescritura EF no hereda side-effects; match-exacto por código no prompt; spec puede asumir estado inexistente (verificar vivo); error_log=[] puede ser corte humano de otra EF; ante bloqueo de gobernanza pivotar método no pedir excepción; no asumir proveedor (heredar stack); slug ≠ concepto visual.

Secrets: cada marca su key Resend. Vertex Service Account en Vercel image-lab-unrlvl, falta en Supabase EF (acción Sam).

Estado publicación: UNREALville E2E. Lucien/SamPublisher NO E2E — verificar meta_accounts antes (liga 5b).

Ayra Sprint 0 🔴 VENCIDO (5 Jun).
