# AGENDA — Unrealville Studio
_Actualizada: 2026-07-01 · v2026-07-01-b (#47 Expert/Boids: E5a CERRADO — pestaña única IID Seeds (captura OCR unificada + bifurcador Seed/Genoma), imagen+video × Seed+Genoma verdes en producción. E4 ABSORBIDA. Diseño E5b (bucle Boids en la UI) + Fase 2 (aprobación de genomas en el chat) cerrados, pendientes de construir. Próximo: E5b text window. · base previa v2026-07-01)_

---

## 🔴🔴 FOCO INMEDIATO — #47 E5b (bucle Boids) + #45 brand_topics Marisol (BLOQUEANTE) + R4B

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

## 🔵🔵 SPRINT #47 — Modo Expert/Boids — E1-E3b + E5a CONSTRUIDOS · Fase 1 captura COMPLETA · Fase 2 (calibración) PRÓXIMA

**Qué es:** subsistema PERMANENTE de onboarding de marcas (efímero por-marca, reusable para UNRLVL con cada cliente nuevo). Construir voces/genomas a partir de análisis de técnica de creadores (método Boids). Dos fases.

**Diseño cerrado (decisiones con Sam, ancladas en código real verificado):**
- **A — Vía D → server-side (post-HEVC): frames con ffmpeg en el servidor + Cloud Vision OCR.** El canvas en el navegador falló con HEVC → `/api/extract-frames` (ffmpeg server-side, cualquier códec). Video sube al bucket vía signed upload URL, transita segundos, se borra. OCR vía Google Cloud Vision reusando la credencial Vertex.
- **B — tabla `intel.captured_techniques`** (Genoma). Precursora de `brand_voice_genome`. ✅ LIVE E1.
- **C — dos fases.** Fase 1 (captura+OCR) CONSTRUIDA. Fase 2 (calibración por convergencia = bucle Boids) = E5b (UI, Claude por API) + skill `genome-calibration` (E7).
- **Quién opera:** Marisol captura Y calibra dentro de su scope (experta de dominio). Candados: scope server-side (NUNCA Lucien/UNRLVL); el INSERT a brand_voice_genome lo dispara SIEMPRE Sam en el chat.

| E | Etapa | Entregable | Estado |
|---|---|---|---|
| E1 | DDL | `intel.captured_techniques` + GRANT + índices | ✅ **LIVE (27-jun)** |
| E2 | Storage | bucket `iid-expert-uploads` privado (protagonista server-side) | ✅ **LIVE (27-jun)** |
| E3-EF | EF OCR | `iid-expert-ocr` (Vía D: frames + Cloud Vision) — ahora con flag `persist` (E5a) | ✅ **LIVE** |
| E3b | Server-side | extract-frames ffmpeg (E3b-1) + signed upload (E3b-2) + cron huérfanos (E3b-3) + prueba Marisol (E3b-4) | ✅ **COMPLETO (1-jul)** |
| E4 | iid-inbound expert_* | **ABSORBIDA — NO se construye.** iid-expert-ocr ya hace la captura Expert autónoma; expert_* sería duplicación. El approve de técnicas Expert es Fase 2, no E4. | ✅ **cerrada (absorbida, 1-jul)** |
| **E5a** | **Pestaña única IID Seeds** | captura OCR unificada + bifurcador Seed/Genoma. PRs #5 (front) + #9 (EFs) + #6 (fix imagen) mergeados. Migración iid_seeds aplicada. | ✅ **CERRADO — imagen+video × Seed+Genoma verdes en producción (1-jul)** |
| **E5b** | **Text window calibración (bucle Boids)** | el corazón de Genoma: Claude genera textos por API, Marisol juzga, converge (regla 10/3-SÍ). 2 puertas (desde Genoma capturado / desde cero). Reubicar+conectar enlace gold. **PRÓXIMO FOCO de #47.** | 🔵 **PRÓXIMO — diseño cerrado** |
| E6 | Aprobación genoma | mecánica scope-gated + firma Sam en INSERT. **Ya diseñada: vive en el CHAT Sam-Claude, no en UI.** El Orchestrator nunca escribe genomas. | 🔵 diseñado |
| E7 | Skill | `skills/genome-calibration/SKILL.md` — protocolo del bucle Boids + gate de aprobación Sam-Claude (táctico vs estratégico→agente) | 🔵 mapeado |
| E8 | Resumen retomable | render de `technique_summary` como handoff Fase 1→Fase 2 | 🔵 mapeado |

**Descubrimiento de diseño E5a:** Basic y Expert NO son dos modos — la captura es idéntica; solo difiere el DESTINO (Seed→contenido / Genoma→voz), elegido al final. Por eso una sola pestaña. Corrección anti-IP: la regla es "no republicar el post", NO "no leer el post" — leer el OCR para aprender tema+método está permitido (insumo de aprendizaje). Ambos destinos procesan OCR.

**Contrato E5a (2 sesiones CC paralelas, acople-por-contrato):** iid-expert-ocr gana flag `persist` (true=persiste captured_techniques / false=devuelve ocr_text sin persistir, para Seed); iid-inbound capture acepta `ocr_text`+`capture_intent`; migración aditiva iid_seeds. Genoma→iid-expert-ocr(persist:true); Seed→iid-expert-ocr(persist:false)→iid-inbound capture.

**Orden CC:** E5b → sesión apuntada a `Orchestrator` (+ posible EF si el bucle necesita backend de estado). El allowlist se fija al arrancar.

## 🔴 BLOQUEANTE — #45 brand_topics de las 6 marcas de Marisol (prerequisito de producción real)
Sin esto el Sembrador NO produce para las marcas de Patricia: capture destila pero approve falla con "domain sin suscriptores". Además, sin genoma (E5b) el agente produce off-brand. Los dos (genoma + topics) hacen a las marcas operables por el IID. Decisión de arquitectura de contenido → sesión propia con HRD. Ver #45.

**Notas del Sembrador:**
- Multimarca por construcción: sumar marca a un domain = INSERT en brand_topics + 1 línea en CHECK. Cero código.
- Gobernanza: iid-inbound + iid-expert-ocr + storage-orphan-sweep versionadas. Resto de EFs IID sin repo (deuda §43).
- Acople 4B: iid-inbound→iid-core por HTTP (contrato duro).

---

## 🔴🔴🔴 R4B — RECONEXIÓN FASE 3 + endurecimiento Watcher (paralelo al Sembrador)

**Estado base:** Fase 3 transporte REPARADO (dispatcher v27 transporta domain). El Sembrador alimenta la queue por el carril humano; R4B cierra el carril automático + publicación real.

| # | Item | Estado | Dueño |
|---|---|---|---|
| 5e-1 | Scheduler content-scheduler (EF+cron 1×/día ET). Mapea (brand_id+domain)→brand_topics, Interpretación A, jitter ±45min, ventanas ET, sibling-stagger ≥48h, escribe scheduled_for | 🔴 ESPECIFICADO, desbloqueable (write ya en v41) | Chat 1 |
| 5e-2 | gate1+gate5 → pgvector (Vertex gemini-embedding-001 @768) | 🟢 DESBLOQUEADO | Chat 2 |
| 5e-3 | Gates 2/3 → BLOQUEANTES (flag OFF) | ⏳ tras 5e-2 | Chat 2 |
| 5e-4-disp | Parche dispatcher: AND scheduled_for <= now(). NO tocar .limit(1) | ⏳ acoplado al Scheduler | Chat 1 |
| 5b | IID publicación real (Meta) — CHAT DEDICADO. Verificar cuentas Meta Lucien/SamPublisher. Gatilla approve-piece v14. | 🔴 | Lucien/UNRLVL |
| 5r | rejected_reason en approve-piece — rechazos manuales se pierden | 🔴 | UNRLVL/Lucien |

**Eje B (post-Sembrador / dentro de R4B):** matriz estímulo validada + Ruta B + Gate 7 (objetivo↔estímulo) + Gate 8 (similitud visual, GREENFIELD embeddings). Pendiente regenerar como spec de IMPLEMENTACIÓN con 2 decisiones (objective_by_platform jsonb + migrar texto Y visual a embeddings). Detalle en session_log §9 (24-jun b).

### 🔴🔴 INCIDENTE ACTIVO — content-dispatcher-poll roto (detectado 1-jul, dominio R4B)
`content-dispatcher-poll` (cron jobid 29) lleva **592 fallos consecutivos desde 17-jun 10:00**, cero éxitos en 14 días. `iid-brief-biweekly` (jobid 2) falló 1-jul 7AM. **Causa raíz:** `intel.trigger_iid_agent` tiene dos overloads (text) y (text,jsonb); los crons la llaman con literal sin cast → `function is not unique` → el job no dispara. Carril automático de contenido PARADO hace 2 semanas (la EF content-dispatcher v27 sana, pero nadie la invoca). **Fix:** castear literal a `::text`; recrear crons. Los ~24 crons iid-*-research/process (active:false) tienen el mismo bug latente. Bajo checkpoint HRD. **Dejado al chat de R4B/dispatcher (brief entregado 1-jul).** LECCIÓN: "active:true" ≠ "funcionando".

### Bloqueos que requieren ACCIÓN DE SAM
| # | Acción de Sam | Desbloquea |
|---|---|---|
| ✅ Vertex creds en Supabase (22-jun) | 3 secrets cargados | 5e-2/5e-3 |
| ✅ Secrets auth Sembrador (26-jun) | ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET | front IID Seeds |
| ✅ Cloud Vision API habilitada (27-jun) | proyecto gen-lang-client-0491381650 | E3 OCR |
| ✅ JWT secret alfanumérico sincronizado (28-jun) | chars especiales no matcheaban cross-platform | auth E3b-1 |
| ✅ service_role LEGACY (eyJ) en Vercel (28-jun) | la nueva sb_secret_ no sirve para Storage privado | E3b-1 Storage |
| ✅ MERGEAR PR #3 (E3b-1) + #4 (E3b-2) + #8 (E3b-3) | mergeados 1-jul | E3b |
| ✅ PRUEBA REAL de Marisol (E3b-4) | VERDE 1-jul (fila 3c40f492). E3 CERRADO. | cierre E3 ✅ |
| ✅ MERGEAR PR #5+#6 (E5a front) + #9 (E5a EFs) + aplicar migración iid_seeds | mergeados 1-jul; migración aplicada por MCP; E5a en producción | E5a ✅ |
| 🔴 ROTAR contraseñas temporales Sembrador (SUBE PRIORIDAD) | la registrada no coincide con la real; expuestas en sesiones. JWT secret en 2 lugares (Supabase+Vercel) → rotar en ambos | producción real Marisol |
| 🟡 Rotar STORAGE_SWEEP_SECRET | se pegó en chat 1-jul (blast radius mínimo); regenerar + actualizar command de crons 35/36 | higiene |
| 🟡 DEUDA: migrar service key a SUPABASE_SECRET_KEYS nueva | cuando Storage acepte el formato nuevo; NO deshabilitar legacy | limpieza |
| 🟡 DEUDA naming: ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET | arrastra "NSCF", gobierna toda la auth IID; renombrar junto con rotación | limpieza |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar | crescendo Scheduler |
| brand_topics 6 marcas Marisol (#45) | Decidir domains por marca en sesión propia | Sembrador produce para NSCF/Patricia |
| Aprobar learnings Professor | ✅ 28 (24+27-jun) + 6 E3b-1 + 3 (28-jun b) + 14 (1-jul: 8 E3b + 6 E5a) aprobados · 22 pendientes (mayo) | Professor |

---

## ✅ #5i — GENOMA v1.0 DE LUCIEN — CERRADO (19-jun)
Destilado por muestreo (8/10 marcadas Lucien). core_move reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (lucien_editorial + lucien_social). Professor: 6 learnings. Validación pendiente: 2-3 piezas IID real post-R4B. NOTA: el gate Boids-Lucien (Claude propone, Sam juzga SÍ/NO, converge) es el MODELO del bucle E5b y del skill E7.

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
| 42 | model ID hardcodeado + 13 EFs one-off | UNRLVL/NeuroneSCF |
| 22 | Genoma UNRLVL social | UNRLVL |
| 24 | Email marketing FPHs (cada marca su key) | ForumPHs |
| 25 | ForumPHs creación cuentas | ForumPHs |
| 35 | CLAUDE.md repos restantes | UNRLVL |
| 49 | **`unrlvl-supabase-mcp:get_logs` ROTO** — 404. Impide leer logs de EF por MCP desde Claude Chat. | UNRLVL |

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
| 38 | Reconciliación ecosystem_graph | UNRLVL |
| 39 | .github/CLAUDE.md repetido | UNRLVL |
| 43 | **Versionar EFs del IID en repo (deuda sin-repo §1)** — PARCIALMENTE saldado (iid-inbound + iid-expert-ocr + storage-orphan-sweep en unrlvl-iid-functions). Falta el resto (iid-core, fanout.ts, content-*, etc.). | UNRLVL |
| 44 | **Eje B implementación** — regenerar spec con 2 decisiones → Ruta B + Gate 7 + Gate 8 greenfield | UNRLVL |
| 45 | **Sembrar brand_topics de las 6 marcas de Marisol (BLOQUEANTE producción NSCF/Patricia)** — existen en public.brands pero SIN topics/domains en intel.brand_topics. Sin esto capture destila pero approve falla ("domain sin suscriptores"). Con genoma (E5b) + topics (#45), las marcas quedan operables por el IID. Sesión propia con HRD. | NeuroneSCF/UNRLVL |
| 46 | **Tab "Topic Proposals" en IID Intel (post-#45, ligado)** — captura estructurada de criterio de Marisol (preguntas guiadas → iid_topic_proposals → Sam convierte en domains → CC inserta). | NeuroneSCF/UNRLVL |
| 47 | ✅ **Modo Expert/Boids — Fase 1 captura COMPLETA (1-jul).** E3b-1/2/3/4 + E5a cerradas, E4 absorbida. Marisol captura Seed y Genoma (imagen+video) en producción. PRÓXIMO: E5b (bucle Boids). Ver session_log §9 (1-jul b). | UNRLVL |
| 48 | ✅ **Approval por email — COMPLETO (27-jun).** iid-inbound v9, notifyGate inline. | UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 + #39. Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Ley activa de CC → cuesta en cada sesión mientras esté incompleta.

---

## ✅ Resuelto recientemente
- ✅ **#47 Expert/Boids — E5a CERRADO: pestaña única IID Seeds (1-jul b).** Captura OCR unificada + bifurcador Seed/Genoma reemplaza el toggle Basic/Expert. Descubrimiento: Basic/Expert no son modos, solo difiere el destino. 2 sesiones CC paralelas contra contrato cerrado (front PR #5+#6, EFs PR #9). Fix imagen: bypass de ffmpeg (imagen→data URL→OCR directo; ffmpeg solo para video). Gotchas: merge=deploy a producción en Vercel (probar Preview antes); merge de EFs ≠ aplicar migración (columnas ocr_text/capture_intent aplicadas por MCP tras el hecho). E4 ABSORBIDA (iid-expert-ocr ya hace la captura). Probado E2E: imagen+video × Seed+Genoma verdes. Diseño E5b (bucle Boids en UI) + Fase 2 (aprobación en chat) cerrados. Professor: 6 learnings. Próximo: E5b. — 2026-07-01
- ✅ **#47 Expert/Boids — E3 CAPTURA COMPLETO end-to-end (1-jul).** E3b-2 (front signed upload URL, PR #4) + E3b-3 (EF genérica storage-orphan-sweep, REST-only por trigger protect_delete, recorrido recursivo, PR #8 + crons 35/36) + E3b-4 (Marisol desde su dispositivo, fila 3c40f492). Gotcha: sign-upload rechazaba 400 por Content-Type sin body. Hallazgo: trigger protect_delete bloquea DELETE FROM storage.objects (job 32 fallaba en silencio). Incidente dispatcher detectado (dejado a R4B). Professor: 8 learnings. — 2026-07-01
- ✅ **#47 Expert/Boids — E3b-1 CERRADO: ffmpeg server-side decodifica HEVC (28-jun c).** `/api/extract-frames` probada E2E con el HEVC real de Marisol (hvc1 1080×1920 43.28s): 15/15 JPEG, video borrado. PR #3. 2 gotchas de credenciales resueltos (JWT chars especiales; service_role legacy). Professor: 6 learnings. — 2026-06-28
- ⚠️ **#47 — E3-FRONT-canvas FALLÓ con HEVC → rediseño server-side (28-jun b).** Chrome no decodifica H.265 → canvas falló. Decisión: server-side total (ffmpeg). Professor: 3 learnings. — 2026-06-28
- ✅ **#47 — E3-FRONT canvas construido + E2E Preview (28-jun).** PR #2 (obsoleto al día siguiente por HEVC). — 2026-06-28
- ✅ **#47 — E1+E2+E3-EF construidos (27-jun c).** Vía D (frames navegador + Cloud Vision). iid-expert-ocr v1 (PR #6+#7 fix PEM). Professor: 6 learnings. — 2026-06-27
- ✅ **#47 DISEÑADO + E1 (27-jun b).** Subsistema onboarding 2 fases. 6 decisiones. Professor: 5. — 2026-06-27
- ✅ **#48 Approval por email COMPLETO (27-jun).** iid-inbound v9 notifyGate. PR #5. Deuda get_logs (#49). Professor: 5. — 2026-06-27
- ✅ **IID Sembrador T4 COMPLETO (26-jun).** Front IID Seeds LIVE, auth dos ejes, repo unrlvl-iid-functions. Dos modos de semilla (Basic/Expert). Professor: 7. — 2026-06-26
- ✅ **IID Sembrador T4 brief (26-jun).** scope gerente-de-cuentas, tab topic-proposals diferido (#46). — 2026-06-26
- ✅ **IID Sembrador CONSTRUIDO T1-T3 (25-jun b).** Fan-out iid-core v22 (fanout.ts). Cerebro iid-inbound v1. — 2026-06-25
- ✅ **IID Fase 3 transporte REPARADO (25-jun a).** dispatcher v26→v27. — 2026-06-25
- ✅ Eje B diseño (24-jun b). ImageLab Imagen→Gemini (24-jun). R4B Chat 2 (20-jun). #5i GENOMA v1.0 LUCIEN (19-jun). IID QUALITY LOTE A (18-jun). Builder+Watcher LIVE (16-jun). NSCF Resend/Fase 2 (13-16 jun).

---

## Notas de contexto

**#47 Expert/Boids — estado 2026-07-01 b (Fase 1 captura COMPLETA):** subsistema PERMANENTE de onboarding. 2 fases: Fase 1 (captura+OCR) E1-E5a COMPLETA; Fase 2 (calibración) = E5b (bucle Boids en UI) + E6 (aprobación en chat) + E7 (skill) + E8 (resumen). **Pestaña única IID Seeds** (E5a): Marisol sube post (imagen/video, drag&drop) → OCR → 3 preguntas (checkboxes tema/método, marca, por qué importa) → bifurcador Seed/Genoma. Seed→iid_seeds (pipeline contenido); Genoma→captured_techniques (calibración voz). El mount temporal "Expert (prueba)" murió. **Arquitectura captura:** video → sign-upload→extract-frames (ffmpeg server-side, cualquier códec); imagen → FileReader.readAsDataURL directo al OCR (bypass ffmpeg, la imagen ya es el frame). Ambos → iid-expert-ocr (flag persist: true=Genoma persiste / false=Seed devuelve ocr_text). Anti-IP: video transita segundos y se borra (+cron storage-orphan-sweep); la regla es "no republicar", leer OCR para aprender tema/método está permitido. **PRÓXIMO: E5b** — text window de calibración (Claude genera textos por API, Marisol juzga SÍ/NO, regla 10 textos mín + 3 SÍ consecutivos para converger; 2 puertas: desde Genoma capturado / desde cero; reubicar+conectar enlace gold). Fase 2 aprobación de genomas vive en el CHAT Sam-Claude (checkpoint HRD → INSERT a brand_voice_genome); el Orchestrator nunca escribe genomas. Propósito: el genoma da voz al IID Agent de cada marca (sin él, output off-brand). Las 6 marcas de Marisol necesitan genoma (E5b) + topics (#45) para ser operables por el IID.

**Storage barrido (infra primaria, 1-jul):** EF `storage-orphan-sweep` (genérica, bucket+older_than_minutes+prefix). REST-only (trigger protect_objects_delete bloquea DELETE FROM storage.objects con 42501). List folder-aware → recorrido recursivo. Auth header x-sweep-secret (verify-JWT OFF). Crons jobid 35 (iid-expert 1h) + 36 (unrlvl-media 3AM, reemplaza el 32 roto).

**IID Sembrador — estado 2026-06-27 (#48):** iid-inbound v9 (auth dos ejes + notifyGate). Email a content-approval@ al entrar a awaiting_approval. BLOQUEANTE producción marcas Marisol = #45.

**IID — estado 2026-06-25 a:** content-dispatcher v27 → content-run-stage v41 → content-watcher v5 (6 gates) → approve-piece v14. Modelo claude-sonnet-4-6. **NOTA 1-jul: el cron que invoca content-dispatcher (jobid 29) está ROTO desde 17-jun (ver INCIDENTE R4B) — la EF sana pero no se dispara.**

**Marcas (public.brands) — scope:** las 6 de Marisol = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF. brand_topics SOLO pobladas para LucienSael + UnrealvilleStudio.

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23.

**Genoma Lucien v1.0 (19-jun):** 2 voces. core_move generativo/constructor. Es el MODELO del bucle Boids (E5b/E7).

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for. Ventanas ET, jitter ±45min. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768.

**Radar pgvector:** instalado sin materializar. Gate 8 visual = greenfield embeddings.

**Patrones gobernanza:** spec sin fuente=suposiciones; IID EFs sin repo → direct-on-prod (EXCEPCIÓN: iid-inbound + iid-expert-ocr + storage-orphan-sweep versionadas); CHECK de tablas core = enums cerrados; acople-por-contrato (4B; E5a lo usó para 2 sesiones CC paralelas front↔EF); auth multi-usuario = patrón nscf-b2b-approve; scope de marca = modelo gerente-de-cuentas (regla dura server-side); calibración de voz scope-gated (experto de dominio; Marisol sus 6 marcas, nunca Lucien/UNRLVL; Sam firma el INSERT en el chat, NO en UI); EF sin fuente git = pedir código al humano; GRANT service_role aplica a tablas viejas leídas por EF nueva; disciplina sesión-nueva CC (verificar rama base, no arrastrar ramas claude/* viejas); **versión del deploy vive en Supabase, no en el código — verificar con get_edge_function antes de bumpear**; **allowlist de repos de CC se fija al ARRANCAR (apuntada al working dir), no se amplía en caliente; tell: primer get_file_contents devuelve archivo, si 403 parar; 2 sesiones en repos distintos = paralelo real sin colisión, contra un contrato cerrado de antemano**; **Claude Chat sandbox sin egress a *.supabase.co — no invoca/curl-ea EFs; disparo desde afuera (Sam curl) o net.http_post desde Postgres (asíncrono: request_id → net._http_response)**; **runtime EF Supabase: sin subprocess + cap 2s CPU + bundle 20MB → CPU-pesado va al navegador o API externa**; **OAuth2 SA en EF: des-escapar \\n de la private_key antes de importKey**; **extracción de frames en navegador (canvas) frágil por códec (HEVC falla en Chrome) → server-side ffmpeg; handler Node nativo VercelRequest/VercelResponse (Web API ignora maxDuration→504); video sube por signed URL, no por la function**; **GOTCHA ffmpeg con imagen: extract-frames busca pista de VIDEO; una imagen fija da 0 frames → 500. Fix: imagen no pasa por ffmpeg — se lee con FileReader.readAsDataURL y va directo al OCR como frame único (iid-expert-ocr acepta data URLs)**; **GOTCHA signed upload: endpoint upload/sign (Fastify) rechaza 400 "Body cannot be empty when content-type is application/json" si mandas Content-Type:application/json sin body → quitar el header**; **GOTCHA Storage DELETE: trigger protect_objects_delete bloquea DELETE FROM storage.objects (42501) → borrar por Storage API REST**; **GOTCHA Storage list: object/list es folder-aware/no recursivo → recorrido recursivo (descender en id===null)**; **PATRÓN verify-JWT: EF con auth propia → toggle Verify-JWT OFF; con ON necesita Authorization Bearer o da 401 del gateway**; **GOTCHA secret cross-platform: chars especiales (%$&^) se interpretan distinto Vercel↔Supabase → secret ALFANUMÉRICO PURO**; **GOTCHA service_role Storage: la key nueva sb_secret_ NO sirve para bucket privado → usar legacy eyJ (key_len 219 vs 40)**; **GOTCHA cron trigger_iid_agent: 2 overloads (text)/(text,jsonb); literal sin cast da "function is not unique", cron falla en silencio → castear a ::text**; **GOTCHA merge=deploy: mergear PR a main deploya a PRODUCCIÓN en Vercel (no hay staging) → probar Preview antes de mergear; y merge de EFs ≠ aplicar migración SQL (aplicarla explícitamente tras el merge)**; **Claude Chat NO sube binarios a Storage (los sube Sam por Studio); NUNCA pasar service role key a CC por chat**.

**Resend (patrón #48):** cada marca su key. UNRLVL = RESEND_UNRLVL_KEY (content@ → content-approval@). NSCF = RESEND_API_KEY. NUNCA clonar el de nscf-mailer para UNRLVL. Canónico UNRLVL = content-run-stage.

**Secrets:** cada marca su key Resend. Vertex SA en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET. Barrido: STORAGE_SWEEP_SECRET (rotar — se expuso 1-jul).

**Estado publicación:** UNREALville E2E. Lucien/SamPublisher NO E2E (liga 5b). Publicación real bloqueada por ANTISPAM §6 hasta R4B.

**Anti-IP (dos modos):** Basic/Seed = tema neutro destilado del OCR+visión de Marisol (leer para aprender, no republicar). Expert/Genoma = material insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir. El video ajeno transita el bucket segundos (ffmpeg lo lee y borra + cron huérfanos) — TRANSITA, no PERSISTE; solo persiste texto-método. La regla precisa es "no REPUBLICAR el post", no "no leer el post".

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
