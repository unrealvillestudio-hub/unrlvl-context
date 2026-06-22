# AGENDA — Unrealville Studio
_Actualizada: 2026-06-20 · v2026-06-20-v1 (CONSOLIDADO 3 frentes: #5i genoma v1.0 CERRADO · R4B Chat 2 parcial · arquitectura híbrida queue resuelta · Scheduler especificado-bloqueado)_

---

## 🔴🔴 FOCO INMEDIATO — R4B (cierre, deadline 1ª sem julio)

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
| 42 | model ID hardcodeado + 13 EFs one-off | UNRLVL/NeuroneSCF |
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

## ✅ Resuelto recientemente
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

Genoma Lucien v1.0 (19-jun): 2 voces (editorial+social, NO 3). core_move generativo/constructor. Firmas: ❯ Unrealville Studio / --- LucienSael: Builder, Thinker, Operator. Patrón en Professor (13 rasgos): generativo no reactivo, figura concreta, filo material/presente sin salida digna, comprime en imagen-sentencia, garbo no crudeza, constructor>destructor, reclutar afines, contención munición pesada, cierre reposiciona+recluta, pregunta-cuchillo baja frecuencia, registro culto sin ancla nacional, científico-psicológico en ai-cognition, libros/ecosystem sin nombrar.

Arquitectura queue híbrida (20-jun): Builder escribe brand_id+domain en iid_content_queue (puente, ya en v37); Scheduler mapea (brand_id+domain)→brand_topics, lee platforms/cadence/rollout ahí. Interpretación A: cadencia por-marca-por-plataforma, dominios rotan, NUNCA multiplican.

Decisiones R4B congeladas (20-jun): Scheduler EF+cron 1×/día ET. scheduled_for en queue (NULL=no dispares). Ventanas ET, jitter ±45min. Colisión intra-marca cross-plataforma=regla dura. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768 Matryoshka. rollout en intel.brand_rollout.

Costeo IID: PAUSADO (Sam) — se implementa con todos los labs en secuencia cuando estén operativos. Instrumentación tokens (5e-6) diferida.

Patrones gobernanza (18-20 jun): spec sin fuente=suposiciones que el código desmiente; reescritura EF no hereda side-effects; match-exacto por código no prompt; spec puede asumir estado inexistente (verificar vivo); error_log=[] puede ser corte humano de otra EF; ante bloqueo de gobernanza pivotar método no pedir excepción; no asumir proveedor (heredar stack); slug ≠ concepto visual.

Secrets: cada marca su key Resend. Vertex Service Account en Vercel image-lab-unrlvl, falta en Supabase EF (acción Sam).

Estado publicación: UNREALville E2E. Lucien/SamPublisher NO E2E — verificar meta_accounts antes (liga 5b).

Ayra Sprint 0 🔴 VENCIDO (5 Jun).
