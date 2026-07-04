# AGENDA — Unrealville Studio
_Actualizada: 2026-07-04 · v2026-07-04-b (#47 E5b BACKEND EN PRODUCCIÓN: D1 (intel.calibration_sessions + calibration_turns) + D2 (/api/calibrate.ts endpoint del bucle Boids, 3 acciones, generador claude-sonnet-5) construidos, verificados end-to-end y MERGEADOS. interpret-intent.ts revivido de paso (estaba ROTO en prod por firma Web). GOTCHAS nuevos: firma Web-standard cuelga en Vercel→Node-native; claude-sonnet-5 antepone bloque thinking→concatenar bloques text. Items nuevos: #65 front E5b, #66 skill verificación de versiones, #67 barrido endpoints firma Web, #68 RLS calibration_*. base previa v2026-07-04-a: ForumPHs DF R5/Bloque 2 MERGEADO (PR #14) pero INERTE — marcas ICR no aparecen: /api/generate recibe icr_findings=[] (page.tsx runGenerate(blocks,[]) hardcodeado) + findings internos con location "Cuerpo del acta" no matchean findingsForSection. SPRINT PARSER MULTI-PLATAFORMA completo: primer paquete no-Venezia (Lefevre 75/TOC) expuso parser Venezia-céntrico. PR-A #15 (skeleton: PH/tipo/fecha + "Joseph Ayala"→"PH Ayala" fix + cross-check filename), PR-B #16 (detectPlatform auto por df_platform_parsing_config + segmentación TOC prose_paragraph + fix xlsx header), PR-C #17 (fix detectHeaderRow coords + colaterales + migración claude-sonnet-5). CAUSA RAÍZ del "degrada a Hypal": GRANT SELECT faltante a service_role en df_platform_parsing_config (42501→403). RESUELTO por GRANT + ALTER DEFAULT PRIVILEGES. DF MULTI-PLATAFORMA VIVO: Lefevre detecta TOC, 117 asistentes, Sonnet 5, ICR 14 hallazgos (4 críticos, BLOQUEADO correctamente). base previa v2026-07-03-c: Bloque 1 + R4 + EF v39)_

---

## 🔴🔴 FOCO INMEDIATO — #47 E5b FRONT (#65, backend ✅ en prod) + #45 brand_topics 5 marcas restantes (NSCF ✅ hecha) + R4B

## 🟢 E5b BACKEND — bucle Boids en producción (D1 + D2) (2026-07-04)

**El backend del text window de calibración está VIVO y verificado end-to-end.** Falta solo el front (#65) para que Marisol lo use.

- **D1 — tablas** `intel.calibration_sessions` (cabecera: brand_id, intent_label, target_voice_id nullable, entry_gate, founder_axis jsonb, status, operator, FK a captured_techniques) + `intel.calibration_turns` (proposed_text, technique_used, verdict_voice, notes_intent, is_convergence_marker, FK CASCADE). Opción B normalizada, GRANTs service_role, trigger updated_at. Decisión: el voice_id técnico es SALIDA (emerge al converger), no entrada; la sesión se ancla en brand_id + intent_label.
- **D2 — endpoint** `/api/calibrate.ts` (Orchestrator): 3 acciones (start/verdict/status), stateful vía D1 (Opción X: lee estado de la DB en cada llamada), generador con **claude-sonnet-5**, convergencia leída de DB (10+3SÍ), memoria anti-repetición (technique_used autodeclarado). Verificado: start crea sesión+turno, verdict genera turno con técnica distinta, status reconstruye. **Round-trip PostgREST con Accept-Profile:intel confirmado** (HTTP + MCP). PR #8 merged.
- **interpret-intent.ts revivido** (PR #7): estaba ROTO en prod (colgaba por firma Web, ni llegaba al fallback 0.3). Migrado a Node-native + claude-sonnet-5. Ahora responde confidence real.
- **Gotchas nuevos:** firma Web-standard `(req: Request): Promise<Response>` CUELGA en este Vercel (504) → usar Node-native `(req, res)`. claude-sonnet-5 antepone bloque `thinking` → concatenar todos los bloques `type:text`, no leer content[0]. Prefill da 400.
- **Professor:** 7 learnings (4-jul). Deudas nuevas #66/#67/#68.

## 🟢 E6 + #45 NeuroneSCF — genoma de conversión + topics (2026-07-02)

**NeuroneSCF quedó OPERABLE end-to-end por el IID** (primera marca de Marisol operable): tiene VOZ (`nscf_conversion` v0.5 activa) + TOPICS (5 brand_topics). El pipeline puede researchear y generar con la voz de la marca, entrando al gate de Sam (auto_approve=false).

- **E6 — genoma `nscf_conversion` v0.5** escrito y activo en `public.brand_voice_genome` (12 dimensiones espejadas de unrlvl_default). Voz de CONVERSIÓN destilada del bucle Boids del 2-jul. 1 de 3 hermanas (+ editorial + professional pendientes, #54). TikTok añadido como capa de texto (guion hablado → futuro nscf_video). Escrito en el CHAT Sam-Claude bajo HRD, no en UI — confirma el circuito E6 diseñado.
- **#45 fase 1 — 5 brand_topics de NSCF** en `intel.brand_topics`: frizz-humidity, color-fade, damage-repair (priority 100) + chlorine-sun, fine-fragile (priority 90). Todos → nscf_conversion, platforms=[meta_fb, meta_ig, tiktok], auto_approve=false, cadencia crescendo. **Arquitectura:** topics de marca de producto/conversión se mapean a PROBLEMAS/PERSONAS reales (brand_personas), no a research abstracto como UNRLVL/Lucien.
- **Professor:** 4 learnings (2-jul, voice_genome). Total del día: 12.
- **Distinción de marca:** NeuroneSCF ≠ Patricia Osorio (PO). Dos marcas distintas de Patricia. Ver deuda #53.

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
| **E5b** | **Text window calibración (bucle Boids)** | **BACKEND EN PRODUCCIÓN (4-jul):** D1 (calibration_sessions + calibration_turns) + D2 (/api/calibrate.ts, 3 acciones, claude-sonnet-5) verificados end-to-end. FALTA el FRONT (#65: text window UI + 2 puertas + reubicar/conectar enlace gold). | 🟡 **backend ✅ · falta front #65** |
| E6 | Aprobación/escritura genoma | mecánica scope-gated + firma Sam en INSERT, en el CHAT Sam-Claude (no UI). **EJERCIDO por 1ª vez con nscf_conversion (2-jul).** | ✅ **probado (2-jul, NSCF)** |
| E7 | Skill | `skills/genome-calibration/SKILL.md` v1.0 — el Tratado. Protocolo del bucle Boids + gate Sam-Claude. | ✅ **ESCRITO + pusheado (2-jul)** |
| E8 | Resumen retomable | render de `technique_summary` como handoff Fase 1→Fase 2 | 🔵 mapeado |

**Descubrimiento de diseño E5a:** Basic y Expert NO son dos modos — la captura es idéntica; solo difiere el DESTINO (Seed→contenido / Genoma→voz), elegido al final. Por eso una sola pestaña. Corrección anti-IP: la regla es "no republicar el post", NO "no leer el post" — leer el OCR para aprender tema+método está permitido (insumo de aprendizaje). Ambos destinos procesan OCR.

**Contrato E5a (2 sesiones CC paralelas, acople-por-contrato):** iid-expert-ocr gana flag `persist` (true=persiste captured_techniques / false=devuelve ocr_text sin persistir, para Seed); iid-inbound capture acepta `ocr_text`+`capture_intent`; migración aditiva iid_seeds. Genoma→iid-expert-ocr(persist:true); Seed→iid-expert-ocr(persist:false)→iid-inbound capture.

**Orden CC:** E5b → sesión apuntada a `Orchestrator` (+ posible EF si el bucle necesita backend de estado). El allowlist se fija al arrancar.

## 🟡 #45 brand_topics de las marcas de Marisol — PARCIAL (NeuroneSCF hecha; faltan 5 + default)
**NeuroneSCF ya OPERABLE (2-jul):** 5 topics sembrados → nscf_conversion. Ya no está dormida. **Faltan:** las otras 5 marcas de Marisol (VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando) + la persona `default` de NSCF. Sin topics, capture destila pero approve falla con "domain sin suscriptores"; sin genoma (E5b/E6) el agente produce off-brand. Arquitectura confirmada: topics de producto/conversión → personas reales (brand_personas), no research abstracto. Sesión propia con HRD por marca. Ver #45.

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
| ✅ PUSH Tratado genome-calibration v1.0 + INDEX v1.6 + session_logs (2-jul) | pusheados y verificados vivos | E7 ✅ |
| ✅ MERGEAR PR #7 (interpret-intent fix) + PR #8 (calibrate) — E5b backend (4-jul) | merged; verificados end-to-end en Preview; CC limpió sesiones de prueba | E5b backend ✅ |
| ✅ DF: crear UNRLVL_SUPABASE_URL + GRANT service_role (4-jul) | env var Prod+Preview + GRANT SELECT df_platform_parsing_config → detectPlatform lee config | DF multi-plataforma |
| 🔴 DF: re-deploy EF fphs-formalize con verify_jwt:false si Sonnet 5 la tocó (4-jul) | el cambio de modelo puede requerir re-deploy; el default verify_jwt:true rompe con 401 | formalización DF |
| 🔴 ROTAR contraseñas temporales Sembrador (SUBE PRIORIDAD) | la registrada no coincide con la real; expuestas en sesiones. JWT secret en 2 lugares (Supabase+Vercel) → rotar en ambos | producción real Marisol |
| 🟡 Rotar STORAGE_SWEEP_SECRET | se pegó en chat 1-jul (blast radius mínimo); regenerar + actualizar command de crons 35/36 | higiene |
| 🟡 DEUDA: migrar service key a SUPABASE_SECRET_KEYS nueva | cuando Storage acepte el formato nuevo; NO deshabilitar legacy | limpieza |
| 🟡 DEUDA naming: ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET | arrastra "NSCF", gobierna toda la auth IID; renombrar junto con rotación | limpieza |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar | crescendo Scheduler |
| brand_topics 5 marcas restantes de Marisol (#45) | Decidir domains por marca (NeuroneSCF ✅ hecha 2-jul) | Sembrador produce para Patricia |
| Aprobar learnings Professor | ✅ 28 (24+27-jun) + 6 E3b-1 + 3 (28-jun b) + 14 (1-jul) + 12 (2-jul) + 9 (3-jul DF) + 10 (4-jul DF multi-plataforma) + 7 (4-jul E5b backend) aprobados · 22 pendientes (mayo) | Professor |

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
| 7 | ✅ **DF análisis de regresión + Bloque 1 + R4 (PR #13 merged, EF v39) — CERRADO 3-jul.** 5 regresiones mapeadas con causa en código. R2 reorden (orden cronológico Opción A) + R4 numeración (1.–8. + QUÓRUM con tilde) + R1 (falso positivo de R2, confirmado: Ivette también conserva los 2 momentos) + R3 fragmentos (EF fphs-formalize v39, acta -21%) resueltos. Barrido único en UI (0/1/2). Principio: dedup se marca no se corrige. Ver session_log 3-jul. | ForumPHs | HECHO |
| 8 | ✅ **DF Bloque 2 (R5) — MERGEADO (PR #14) 4-jul, pero INERTE.** Marcas ICR inline construidas correctamente PERO no aparecen en el .docx: (a) page.tsx `runGenerate(blocks, [])` pasa icr_findings=[] a /api/generate (el auditor /api/icr corre DESPUÉS); (b) findings internos tienen location "Cuerpo del acta" no "sección N" → findingsForSection no matchea. El anexo ICR viejo tampoco se renderizaba nunca (misma causa). Anexo eliminado OK, warning dedup OK. Ver #57. | ForumPHs | mergeado pero inerte → #57 |
| 8b | ✅ **DF SPRINT PARSER MULTI-PLATAFORMA — CERRADO 4-jul.** Primer paquete no-Venezia (Lefevre 75/TOC) expuso parser calibrado 100% a Hypal/Venezia. PR-A #15 skeleton (extractPHName reconoce "PROPIEDAD HORIZONTAL"+ancla real anti-"Joseph Ayala"; extractAssemblyType contempla "GENERAL EXTRAORDINARIA" sin default silencioso; extractDate ancla a "celebrada el"; cross-check filename↔contenido). PR-B #16 (detectPlatform auto-detección leyendo df_platform_parsing_config; segmentación TOC prose_paragraph; fix xlsx). PR-C #17 (fix detectHeaderRow coords colapsado→absoluto; banners visibles; logging degradación; copy sin "Hypal"; migración claude-sonnet-5 thinking:disabled). Los 3 PRs mergeados. Verificado vivo: Lefevre → TOC detectada, 117 asistentes, Sonnet 5, ICR 14 hallazgos. | ForumPHs | HECHO |
| 9 | DF: pre-flight de Ivette — input donde declara representantes de admin de ESA asamblea antes de generar → alimenta classifyRoles paso 2 como dato verificado → reduce [ROL NO VERIFICADO] | ForumPHs | diseño aparte |
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
| 49 | **`unrlvl-supabase-mcp:get_logs` ROTO** — 404 (verificado sigue roto 4-jul, no momentáneo). Workaround: conector Supabase genérico get_logs con project_id amlvyycfepwhiindxgzw. OJO: solo trae logs de EDGE FUNCTIONS, no de rutas Next.js/Vercel (esas van a los logs de Vercel). | UNRLVL |
| 50 | **DF: ledger de costos** — una fila/acta en `ops_token_sessions` (cost=(in/1M*3)+(out/1M*15)); fphs-formalize debe DEVOLVER tokens y dejar de escribir por su cuenta (neutralizar `logTokensBatch` doble-conteo). PR #5 CERRADO sin merge (approach UNRLVL_SERVICE_KEY-en-DF abandonado). | ForumPHs |
| 51 | **DF: soporte multi-candidato VotationRecord** — elección Tesorero hoy queda `[ELECCIÓN MULTI-CANDIDATO — PENDIENTE DE PROCESAR]`. | ForumPHs |
| 52 | **DF: reemplazar `/api/icr` "Claude open" por Agente Experto permanente** — auditoría Ley 284 embebida + curaduría visual de imágenes (corrección tipo-$300M y validación de identidad = criterio legal, viven aquí). | ForumPHs |
| 53 | **DEUDA `po_consumer` mal asignado (2-jul)** — fila po_consumer v0.6 activa bajo brand_id=NeuroneSCF probablemente es voz de PO-persona (asesora "no convence, clarifica"), no de la distribuidora Neurone. NeuroneSCF ≠ marca personal de Patricia. Verificar y reasignar brand_id a la marca de PO correspondiente. También verificar si PO como marca tiene brand_topics propios en Meta+TikTok (si no → revisión). NO tocada (fila activa). | NeuroneSCF/PatriciaOsorio |
| 55 | **DF deuda R4 (3-jul):** colisión de nº de sección si una convocatoria NO empieza por quórum (el punto 1 de agenda y la sección hardcodeada de quórum podrían chocar en el nº 1; invisible antes de R4 porque los números estaban ocultos). Señalado, no arreglado para no regresar el caso estándar Venezia. | ForumPHs |
| 56 | **DF: "APROBACIÓN DEL ORDEN DEL DÍA" sin header propio (3-jul)** — el parser (extractAgendaItems) no la extrae como agenda_item; el ICR la marca ALTO/Estructura (la numeración salta 1→3). Fix en parseResumen/parseTranscripcion, PR futuro. | ForumPHs |
| 57 | **DF: cablear ICR→generate (R5 quedó inerte) — SPRINT NUEVO (4-jul).** page.tsx debe correr /api/icr ANTES de /api/generate (o regenerar tras el ICR) para que icr_findings llegue poblado; y los findings (internos + auditor) deben traer nº de sección o findingsForSection debe matchear "Cuerpo del acta". Sin esto, las marcas ICR inline de R5 nunca aparecen. | ForumPHs |
| 58 | **DF: QA↔ICR desconectados — DEUDA CONOCIDA-Y-ACEPTADA (Sam 4-jul).** El QA da PASS/100%/lista sobre acta que el ICR declara BLOQUEADA (4 críticos). QA valida estructura, no contenido. Sam decide vivir con esto MIENTRAS el ICR atrape (el ICR es el que importa). Fix futuro: QA debe FAIL cuando ICR bloquea. NO urgente por decisión de Sam. | ForumPHs |
| 59 | **DF: marca [ICR] dentro del .docx — PENDIENTE (Sam 4-jul).** Ligado a #57 (sin cableado no hay marcas que mostrar). Dejado como pendiente aceptado. | ForumPHs |
| 60 | **DF: segmentación TOC de baja densidad (4-jul).** Transcripción TOC real casi sin cues de locutor (7 bloques/426 párrafos). El DF avisa (gap no-bloqueante) y no pierde texto, pero la calidad depende del export del proveedor TOC. Ivette solicita a HIF/TOC export con etiquetas de hablante. No es bug del DF. | ForumPHs |
| 61 | **DF: SDK @anthropic-ai/sdk@0.24.3 viejo (4-jul)** — predata el param thinking (se usa passthrough runtime). Actualizar el SDK en algún momento. | ForumPHs |
| 62 | **DF: campos hardcodeados Venezia en UI (4-jul)** — placeholders "ej: 30285586"/"ej: 8706" en PreflightForm (datos de Venezia). Barrer residuos Venezia-céntricos de la UI. | ForumPHs |
| 63 | **DF: normalización unidades formato "E 01A"/"O 01B" de Lefevre (4-jul)** (letra de sección + código). splitUnitTower puede no manejarlo. PR de normalización aparte. | ForumPHs |
| 64 | **DF: mover LOGISTICA_NAMES a config (4-jul)** (Daniel Puentes/Hypal, Paula Cebaros/TOC) a df_platform_parsing_config.extra para no hardcodear coordinadores por plataforma. | ForumPHs |
| 65 | **#47 E5b FRONT — text window del bucle Boids (NUEVO 4-jul, PRÓXIMO FOCO IID).** Backend (/api/calibrate.ts) ya en prod. Falta la UI en el Orchestrator: pantalla donde Claude propone texto → Marisol marca SÍ/NO + porqué → siguiente; 2 puertas (desde Genoma capturado / desde cero); mostrar convergencia (turnos + racha SÍ); reubicar+conectar el enlace gold (hoy inerte en IidSeedsUnified.tsx). Consume start/verdict/status. Brief de CC apuntado a Orchestrator. | UNRLVL |
| 66 | **Skill de verificación de versiones de modelo (NUEVO 4-jul).** Chequeo cada ~15 días de los model IDs en uso vs docs oficiales de Anthropic → warnings de IDs retirados. Nació de encontrar claude-sonnet-4-20250514 enquistado en interpret-intent (roto en prod). Diseño propio: qué fuentes consulta, cómo detecta drift, dónde corre el cron. | UNRLVL |
| 67 | **Barrer endpoints con firma Web colgados (NUEVO 4-jul).** interpret-intent estaba ROTO en prod silenciosamente por firma Web-standard (cuelga en este Vercel). Barrer si hay OTROS endpoints /api/* con la misma firma colgados. Familia higiene de infra. | UNRLVL |
| 68 | **RLS deshabilitado en intel.calibration_* (NUEVO 4-jul).** Detectado por advisory de Supabase en D1. Acceso 100% service_role server-side vía /api/calibrate.ts (cliente nunca toca las tablas) → riesgo bajo hoy. Endurecer (ENABLE RLS + policies) = decisión de Sam, familia deudas RLS/GRANT del IID. También: max_tokens:1024 del generador quedó justo con el bloque thinking de sonnet-5 por delante — vigilar truncado con piezas largas. | UNRLVL |

---

## 🔵 Próximas semanas
| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp | UNRLVL |
| 28 | NSCF blog reescritura | NeuroneSCF |
| 29 | NSCF Dispatch Portal | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA | UNRLVL |
| 31 | GRAN BLOQUE SocialLab/IID | UNRLVL |
| 32 | lucien_video | Lucien |
| 33 | Validar genomas. lucien v1.0, unrlvl_default v1.0, nscf_conversion v0.5. | Lucien/SamPublisher/NeuroneSCF |
| 34 | unrlvl-CRM multimarca | UNRLVL |
| 36 | unrlvl-SMA multimarca | UNRLVL |
| 37 | Drift detector | UNRLVL |
| 38 | Reconciliación ecosystem_graph | UNRLVL |
| 39 | .github/CLAUDE.md repetido | UNRLVL |
| 43 | **Versionar EFs del IID en repo (deuda sin-repo §1)** — PARCIALMENTE saldado (iid-inbound + iid-expert-ocr + storage-orphan-sweep en unrlvl-iid-functions). Falta el resto (iid-core, fanout.ts, content-*, etc.). | UNRLVL |
| 44 | **Eje B implementación** — regenerar spec con 2 decisiones → Ruta B + Gate 7 + Gate 8 greenfield | UNRLVL |
| 45 | **Sembrar brand_topics de las marcas de Marisol — PARCIAL.** ✅ NeuroneSCF hecha (2-jul, 5 topics → nscf_conversion). Faltan 5 marcas (VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando) + persona default de NSCF. Arquitectura: topics de producto/conversión → personas reales (brand_personas), no research abstracto. Sesión propia con HRD por marca. | NeuroneSCF/UNRLVL |
| 46 | **Tab "Topic Proposals" en IID Intel (post-#45, ligado)** — captura estructurada de criterio de Marisol (preguntas guiadas → iid_topic_proposals → Sam convierte en domains → CC inserta). | NeuroneSCF/UNRLVL |
| 47 | ✅ **Modo Expert/Boids — Fase 1 COMPLETA + Fase 2 EN CURSO.** E3b + E5a cerradas, E4 absorbida. E7 (Tratado) 2-jul. E6 probado 2-jul. **E5b BACKEND (D1+D2) en prod 4-jul.** PRÓXIMO: E5b FRONT (#65). Luego E8. Ver session_log §9. | UNRLVL |
| 48 | ✅ **Approval por email — COMPLETO (27-jun).** iid-inbound v9, notifyGate inline. | UNRLVL |
| 54 | **nscf_editorial + nscf_professional — bucles propios pendientes.** editorial = Hair Intelligence (molde real: artículo "por qué el acondicionador no basta"); professional = B2B dato-primero. Cada uno su pasada de bucle Boids. | NeuroneSCF |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 + #39. Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Ley activa de CC → cuesta en cada sesión mientras esté incompleta.

---

## ✅ Resuelto recientemente
- ✅ **#47 E5b BACKEND — bucle Boids en producción (D1+D2) (4-jul).** D1: tablas intel.calibration_sessions + calibration_turns (Opción B, FK CASCADE, GRANTs service_role, trigger updated_at; voice_id técnico = salida no entrada). D2: /api/calibrate.ts en Orchestrator (3 acciones start/verdict/status, stateful vía DB Opción X, generador claude-sonnet-5, convergencia 10+3SÍ leída de DB, anti-repetición de técnicas). Verificado end-to-end: round-trip PostgREST Accept-Profile:intel confirmado por HTTP + MCP. interpret-intent.ts revivido (estaba ROTO en prod por firma Web). PRs #7+#8 merged, CC limpió sesiones de prueba. GOTCHAS: firma Web cuelga en Vercel→Node-native; claude-sonnet-5 antepone bloque thinking→concatenar bloques text; prefill da 400. Model ID canónico jul-2026 = claude-sonnet-5 (verificado docs oficiales). Professor: 7 learnings. Deudas #65 (front) #66 (skill versiones) #67 (barrer firma Web) #68 (RLS). — 2026-07-04
- ✅ **ForumPHs DF — R5 inerte + parser multi-plataforma + GRANT fix + Sonnet 5 (4-jul).** R5/Bloque 2 mergeado (PR #14) pero INERTE (marcas ICR no aparecen: /api/generate recibe icr_findings=[] por runGenerate(blocks,[]) hardcodeado + findings internos con location "Cuerpo del acta" no matchean findingsForSection → #57). Sprint parser multi-plataforma completo: primer paquete no-Venezia (Lefevre 75/TOC) expuso parser Venezia-céntrico. PR-A #15 skeleton (fix "Joseph Ayala"→"PH Ayala", "GENERAL EXTRAORDINARIA", fecha-de-asamblea, cross-check filename). PR-B #16 (detectPlatform auto por df_platform_parsing_config, segmentación TOC prose_paragraph, fix xlsx). PR-C #17 (fix detectHeaderRow coords colapsado↔absoluto, banners visibles, logging, copy sin Hypal, migración claude-sonnet-5 thinking:disabled). CAUSA RAÍZ "degrada a Hypal" = GRANT SELECT faltante a service_role en df_platform_parsing_config (42501→403); resuelto por GRANT + ALTER DEFAULT PRIVILEGES. DF MULTI-PLATAFORMA VIVO: Lefevre → TOC detectada, 117 asistentes, Sonnet 5, ICR 14 hallazgos (4 CRÍTICOS → BLOQUEADO correctamente). QA↔ICR desconectados (deuda aceptada #58). tabla nueva df_platform_parsing_config (UNRLVL). Professor: 10 learnings. Deudas #57-#64. — 2026-07-04
- ✅ **ForumPHs DF — análisis de regresión + Bloque 1 + R4 + EF v39 (3-jul).** Acta del DF (Venezia OR 1-2026) comparada contra la corregida por Ivette → 5 regresiones con causa-raíz en código. R2 reorden (sectionAssigner umbral 0.4→0.7 + sortByTimestamp compartido generate/actaBuilder; orden cronológico Opción A dentro de cada punto del orden del día). R4 numeración restaurada (1.–8. + QUÓRUM con tilde). R1 = falso positivo de R2 (Ivette también conserva los 2 momentos del $2,269; el dedup acertó al no marcarlos). R3 fragmentos triviales resuelto EF-side (fphs-formalize v39, TRIVIAL_MIN_WORDS=5): acta 4263→3370 (-21%), triviales 25→1, ROL NO VERIFICADO 98→46, ICR ALTO 6→4. Barrido único en UI (0/1/2, retryAttempt fijo). Principio nuevo: "dedup se marca no se corrige" (parser sobre text_raw crudo, marca possible_duplicate, ICR MEDIO; instrumento forense origen Hypal vs doble barrido). PR #13 merged. Deploy EF v38→v39 con verify_jwt:false explícito (proyecto amlvyycfepwhiindxgzw). Deudas: #55 colisión numeración, #56 orden-del-día sin header, warning temprano dedup (Bloque 2). Professor: 9 learnings. Próximo: Bloque 2 (R5). — 2026-07-03
- ✅ **E6 + #45 NeuroneSCF (2-jul).** Genoma nscf_conversion v0.5 escrito y activo en brand_voice_genome (12 dimensiones, +TikTok capa texto). 5 brand_topics sembrados → nscf_conversion (Meta+TikTok). NeuroneSCF operable end-to-end por el IID (primera marca de Marisol). Distinción de marca NSCF≠PO registrada; deuda po_consumer (#53). Professor: 4 learnings. — 2026-07-02
- ✅ **#47 Calibración de voz NSCF + Tratado genome-calibration v1.0 (2-jul).** Bucle Boids validado en vivo (Sam×Claude, 10 piezas). Genoma de conversión convergido. Eje moral (autoridad-por-contraste, blanco=asesoramiento genérico, filo 5/10 instrumental), capa científica, reglas de forma. Voz vs intención = ejes distintos. Skill genome-calibration v1.0 (Tratado, E7) escrito y pusheado + INDEX v1.6. Professor: 8 learnings. — 2026-07-02
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

**Genomas de NeuroneSCF (2-jul):** 3 voces hermanas planificadas, núcleo común (Patricia percibida no declarada + Neurone solución + adversario del consejo genérico-conveniente + lectora protagonista + ES/EN neutros sin regionalismos generados por separado). (1) **nscf_conversion v0.5 ACTIVA** — marketing directo, filo 5/10 instrumental, escena→giro→tuteo→cierre en Neurone/CTA, plataformas Meta+TikTok(texto)+email. (2) **nscf_editorial** — Hair Intelligence, enseña/recluta, invoca la ciencia, molde real existente, pendiente de bucle (#54). (3) **nscf_professional** — B2B dato-primero, fuera de mapa (#54). DEUDA: po_consumer v0.6 bajo NeuroneSCF probablemente mal asignado (es PO-persona, #53). NeuroneSCF ≠ marca personal de Patricia.

**Calibración de genoma — método (skill genome-calibration v1.0):** 2 ramas (Voz Extraída / Voz Diseñada) · 2 ejes (voz vs intención, no fundir) · triangulación de fuentes obligatoria · eje fundador embebido en material de arranque · bucle Boids (Claude propone, operador juzga SÍ/NO + porqué, converge 10+3SÍ) · destilación al genoma bajo HRD en el chat (quirúrgico, nunca en UI) · voces hermanas · reglas transversales (bilingüe reescritura no traducción; cita-por-destino; motor filosófico interno nunca se nombra) · techo de producción (voz constante, técnica variable con memoria). Anexo NSCF como ejemplar.

**ForumPHs DF — estado 2026-07-04 (multi-plataforma + Sonnet 5):** El DF dejó de ser Venezia-céntrico. Primer paquete no-Venezia (Lefevre 75, plataforma TOC/HIF) expuso que el parser asumía formato Hypal/Zoom en todo (skeleton, transcripción, xlsx). Sprint de 3 PRs (todos mergeados): PR-A #15 skeleton multi-formato + cross-check filename↔contenido; PR-B #16 auto-detección de plataforma vía tabla df_platform_parsing_config (UNRLVL) + segmentación TOC prose_paragraph; PR-C #17 fix detectHeaderRow (bug coords colapsado↔absoluto) + colaterales + migración a claude-sonnet-5 (thinking:disabled). **Config por plataforma = DATA no code:** tabla `df_platform_parsing_config` (UNRLVL amlvyycfepwhiindxgzw), 2 filas: hypal (speaker_colon, priority 10, header offset 0) y toc (prose_paragraph, priority 5, header offset 3, 7 turn-cues). Auto-detección por señales del texto, sin selector manual. **CAUSA RAÍZ del bug "degrada a Hypal":** la tabla nueva no tenía GRANT SELECT a service_role → PostgREST 42501 permission denied → 403 → fallback silencioso. Resuelto con GRANT SELECT + ALTER DEFAULT PRIVILEGES (futuras tablas). Verificado vivo: Lefevre → "Plataforma detectada: TOC", 117 asistentes, Sonnet 5, ICR 14 hallazgos (4 CRÍTICOS: porcentajes sobre bases distintas, quórum contradictorio 117 vs 23, fechas discordantes, roles no verificados) → BLOQUEADO correctamente. **R5 quedó inerte** (marcas ICR no aparecen, #57). **QA↔ICR desconectados** (#58, deuda aceptada). Modelo del DF ahora claude-sonnet-5 (era claude-sonnet-4-6). Transcripción TOC de baja densidad de locutor = material del proveedor, no bug (#60).

**ForumPHs DF — estado 2026-07-03 (regresión + Bloque 1 + R4):** el DF genera actas legales de asamblea PH (Ley 284) desde ZIP de Hypal. Pipeline: ZIP→parse→PreflightForm→fphs-formalize (EF, redacta bloque×bloque en 3ª persona)→generate (ensambla DOCX + QA)→/api/icr (auditor)→icr-apply→DOCX final. Repo `forumphs-document-factory` (público). EF `fphs-formalize` vive en proyecto UNRLVL `amlvyycfepwhiindxgzw`, NO en FPHS `tajuoqdbnsnzkhyqvdgs`. **Sesión de hoy:** análisis de regresión contra el acta corregida por Ivette → 5 R's. **Decisión de orden cronológico Opción A:** se agrupa por punto del orden del día (PASO 3) y DENTRO se ordena por timestamp global (sortByTimestamp compartido generate↔actaBuilder, para que docx/acta_text/ICR queden idénticos). **Principio dedup:** vive en parseTranscripcion (más temprano, text_raw crudo), MARCA possible_duplicate (Jaccard≥0.85, no-adyacente) y nunca borra; generate empuja ICR MEDIO; instrumento forense de origen (Hypal vs doble barrido). **Barrido único** en UI (selector 0/1/2 → retryAttempt fijo SYS0/1/2; se descubrió que la UI vieja NO acumulaba, la duplicación venía de input doblado a nivel ZIP). **R3 EF-side** (TRIVIAL_MIN_WORDS=5, skip <5 palabras sustantivas, todos los niveles). Los ICR ALTO restantes (ACTA No sin número, Daniel Puentes/admin sin rol, género Greyz) = criterio legal de Ivette, NO regresiones = techo de lo automatizable. **PRÓXIMO Bloque 2 (R5):** marcas ICR visuales inline por gravedad + `ICR N` (texto resaltado, no comentarios anclados) + MANTENER reporte externo + QUITAR ANEXO ICR embebido degradado + warning temprano de dedup en UI de parsing. Deudas #55 (colisión numeración R4) + #56 (orden-del-día sin header).

**#47 E5b — backend en producción (estado 2026-07-04):** el bucle Boids ya tiene backend vivo. **D1** = `intel.calibration_sessions` (id, brand_id, intent_label, target_voice_id nullable, entry_gate ∈ {from_genome,from_scratch}, founder_axis jsonb, source_technique_id FK→captured_techniques, status ∈ {active,converged,abandoned}, operator, resulting_voice_id) + `intel.calibration_turns` (session_id FK CASCADE, turn_number, proposed_text, technique_used, verdict_voice ∈ {si,no}, notes_intent, is_convergence_marker). GRANTs service_role, trigger updated_at. **D2** = `/api/calibrate.ts` (Orchestrator, Node-native): acción `start` (crea sesión + turno 1), `verdict` (persiste SÍ/NO + notes_intent, evalúa convergencia 10+3SÍ, genera turno siguiente), `status` (reconstruye para reanudar). Generador Opción X: lee founder_axis + intent_label + turnos previos + técnicas ya usadas de la DB, genera con claude-sonnet-5, devuelve {proposed_text, technique_used autodeclarado}. generation_failed → 502, sesión intacta y reintentable. **Falta el FRONT (#65).** El endpoint alimenta E6 (destilación al genoma en el chat), ya probado manualmente con nscf_conversion.

**#47 Expert/Boids — estado 2026-07-01 b (Fase 1 captura COMPLETA):** subsistema PERMANENTE de onboarding. 2 fases: Fase 1 (captura+OCR) E1-E5a COMPLETA; Fase 2 (calibración) = E5b (bucle Boids en UI) + E6 (aprobación en chat) + E7 (skill) + E8 (resumen). **Pestaña única IID Seeds** (E5a): Marisol sube post (imagen/video, drag&drop) → OCR → 3 preguntas (checkboxes tema/método, marca, por qué importa) → bifurcador Seed/Genoma. Seed→iid_seeds (pipeline contenido); Genoma→captured_techniques (calibración voz). El mount temporal "Expert (prueba)" murió. **Arquitectura captura:** video → sign-upload→extract-frames (ffmpeg server-side, cualquier códec); imagen → FileReader.readAsDataURL directo al OCR (bypass ffmpeg, la imagen ya es el frame). Ambos → iid-expert-ocr (flag persist: true=Genoma persiste / false=Seed devuelve ocr_text). Anti-IP: video transita segundos y se borra (+cron storage-orphan-sweep); la regla es "no republicar", leer OCR para aprender tema/método está permitido. **PRÓXIMO: E5b** — text window de calibración (Claude genera textos por API, Marisol juzga SÍ/NO, regla 10 textos mín + 3 SÍ consecutivos para converger; 2 puertas: desde Genoma capturado / desde cero; reubicar+conectar enlace gold). Fase 2 aprobación de genomas vive en el CHAT Sam-Claude (checkpoint HRD → INSERT a brand_voice_genome); el Orchestrator nunca escribe genomas. Propósito: el genoma da voz al IID Agent de cada marca (sin él, output off-brand). Las 6 marcas de Marisol necesitan genoma (E5b) + topics (#45) para ser operables por el IID.

**Storage barrido (infra primaria, 1-jul):** EF `storage-orphan-sweep` (genérica, bucket+older_than_minutes+prefix). REST-only (trigger protect_objects_delete bloquea DELETE FROM storage.objects con 42501). List folder-aware → recorrido recursivo. Auth header x-sweep-secret (verify-JWT OFF). Crons jobid 35 (iid-expert 1h) + 36 (unrlvl-media 3AM, reemplaza el 32 roto).

**IID Sembrador — estado 2026-06-27 (#48):** iid-inbound v9 (auth dos ejes + notifyGate). Email a content-approval@ al entrar a awaiting_approval. BLOQUEANTE producción marcas Marisol = #45.

**IID — estado 2026-06-25 a:** content-dispatcher v27 → content-run-stage v41 → content-watcher v5 (6 gates) → approve-piece v14. Modelo claude-sonnet-4-6. **NOTA 1-jul: el cron que invoca content-dispatcher (jobid 29) está ROTO desde 17-jun (ver INCIDENTE R4B) — la EF sana pero no se dispara.**

**Marcas (public.brands) — scope:** las 6 de Marisol = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF. brand_topics pobladas para LucienSael + UnrealvilleStudio + **NeuroneSCF (5 topics, 2-jul)**. Faltan las otras 5 de Marisol.

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23.

**Genoma Lucien v1.0 (19-jun):** 2 voces. core_move generativo/constructor. Es el MODELO del bucle Boids (E5b/E7).

**Genomas activos:** lucien_editorial v1.0 + lucien_social v1.0 · unrlvl_default v1.0 · **nscf_conversion v0.5 (2-jul)** · po_consumer v0.6 (bajo NeuroneSCF, revisar brand_id #53). El método está codificado en genome-calibration v1.0.

**Model IDs canónicos (verificado docs oficiales Anthropic, jul-2026):** claude-sonnet-5, claude-opus-4-8, claude-opus-4-7, claude-sonnet-4-6, claude-haiku-4-5. RETIRADOS (abr-2026): claude-sonnet-4-* y claude-opus-4-* gen ≤4. Formato sin fecha desde 4.6 = snapshot fijo, NO alias evergreen. El generador de /api/calibrate.ts y el DF usan claude-sonnet-5. Regla: verificar contra docs antes de asumir de memoria (un ID retirado enquistado rompe en prod silenciosamente) — origen del skill #66.

**DF — bases de datos (aclaración 4-jul):** el DF apunta a DOS bases. **FPHS** (`tajuoqdbnsnzkhyqvdgs`) = datos sensibles de propiedades (propietarios, fincas, unidades, personal); se accede con FPHS_SUPABASE_URL + FPHS_SERVICE_KEY. **UNRLVL** (`amlvyycfepwhiindxgzw`) = operativa del propio DF (df_jobs, professor_learnings, df_platform_parsing_config, EF fphs-formalize); se accede con UNRLVL_SUPABASE_URL + unrlvl_service_role. El bug "degrada a Hypal" fue que UNRLVL_SUPABASE_URL no estaba en Vercel (solo la de FPHS) + faltaba el GRANT.

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for. Ventanas ET, jitter ±45min. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768.

**Radar pgvector:** instalado sin materializar. Gate 8 visual = greenfield embeddings.

**Patrones gobernanza:** spec sin fuente=suposiciones; IID EFs sin repo → direct-on-prod (EXCEPCIÓN: iid-inbound + iid-expert-ocr + storage-orphan-sweep versionadas); CHECK de tablas core = enums cerrados; acople-por-contrato (4B; E5a lo usó para 2 sesiones CC paralelas front↔EF); auth multi-usuario = patrón nscf-b2b-approve; scope de marca = modelo gerente-de-cuentas (regla dura server-side); calibración de voz scope-gated (experto de dominio; Marisol sus 6 marcas, nunca Lucien/UNRLVL; Sam firma el INSERT en el chat, NO en UI); EF sin fuente git = pedir código al humano; GRANT service_role aplica a tablas viejas leídas por EF nueva; disciplina sesión-nueva CC (verificar rama base, no arrastrar ramas claude/* viejas); **versión del deploy vive en Supabase, no en el código — verificar con get_edge_function antes de bumpear**; **allowlist de repos de CC se fija al ARRANCAR (apuntada al working dir), no se amplía en caliente; tell: primer get_file_contents devuelve archivo, si 403 parar; 2 sesiones en repos distintos = paralelo real sin colisión, contra un contrato cerrado de antemano**; **Claude Chat sandbox sin egress a *.supabase.co — no invoca/curl-ea EFs; disparo desde afuera (Sam curl) o net.http_post desde Postgres (asíncrono: request_id → net._http_response)**; **runtime EF Supabase: sin subprocess + cap 2s CPU + bundle 20MB → CPU-pesado va al navegador o API externa**; **OAuth2 SA en EF: des-escapar \\n de la private_key antes de importKey**; **extracción de frames en navegador (canvas) frágil por códec (HEVC falla en Chrome) → server-side ffmpeg; handler Node nativo VercelRequest/VercelResponse (Web API ignora maxDuration→504); video sube por signed URL, no por la function**; **GOTCHA ffmpeg con imagen: extract-frames busca pista de VIDEO; una imagen fija da 0 frames → 500. Fix: imagen no pasa por ffmpeg — se lee con FileReader.readAsDataURL y va directo al OCR como frame único (iid-expert-ocr acepta data URLs)**; **GOTCHA signed upload: endpoint upload/sign (Fastify) rechaza 400 "Body cannot be empty when content-type is application/json" si mandas Content-Type:application/json sin body → quitar el header**; **GOTCHA Storage DELETE: trigger protect_objects_delete bloquea DELETE FROM storage.objects (42501) → borrar por Storage API REST**; **GOTCHA Storage list: object/list es folder-aware/no recursivo → recorrido recursivo (descender en id===null)**; **PATRÓN verify-JWT: EF con auth propia → toggle Verify-JWT OFF; con ON necesita Authorization Bearer o da 401 del gateway (aplica también a fphs-formalize: deploy con verify_jwt:false explícito, el front del DF llama sin Authorization)**; **GOTCHA secret cross-platform: chars especiales (%$&^) se interpretan distinto Vercel↔Supabase → secret ALFANUMÉRICO PURO**; **GOTCHA service_role Storage: la key nueva sb_secret_ NO sirve para bucket privado → usar legacy eyJ (key_len 219 vs 40)**; **GOTCHA cron trigger_iid_agent: 2 overloads (text)/(text,jsonb); literal sin cast da "function is not unique", cron falla en silencio → castear a ::text**; **GOTCHA merge=deploy: mergear PR a main deploya a PRODUCCIÓN en Vercel (no hay staging) → probar Preview antes de mergear; y merge de PR ≠ deploy de EF (el EF se despliega aparte, explícitamente, tras el merge)**; **Claude Chat NO sube binarios a Storage (los sube Sam por Studio); NUNCA pasar service role key a CC por chat**; **GRANT service_role en tabla nueva (REFUERZO 4-jul): CREATE TABLE por apply_migration NO otorga grants a los roles de la API — toda tabla nueva leída por el DF vía PostgREST necesita GRANT SELECT ON <tabla> TO service_role en la MISMA migración. RLS off es irrelevante: PostgREST chequea GRANTs a nivel tabla ANTES que policies, y BYPASSRLS omite policies no GRANTs. Síntoma: 42501→403→fallback silencioso. Fix permanente aplicado: ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO service_role**; **migración claude-sonnet-5: drop-in de 4-6 pero (1) thinking ON por defecto cuenta contra max_tokens → thinking:{type:disabled} para tareas deterministas; (2) tokenizer +30%; (3) sampling params no-default dan 400; (4) SDK 0.24.3 predata thinking → passthrough runtime o fetch crudo**; **parser multi-plataforma: client/platform-specific knowledge = DATA (df_platform_parsing_config) no code; auto-detección por señales; regex de nombre con ancla real de palabra, no \\b (matcheó "ph" dentro de "Joseph")**; **xlsx detectHeaderRow: índice colapsado (blankrows:false) usado como range absoluto = bug con filas de título → calcular en coords absolutas**.

**Resend (patrón #48):** cada marca su key. UNRLVL = RESEND_UNRLVL_KEY (content@ → content-approval@). NSCF = RESEND_API_KEY. NUNCA clonar el de nscf-mailer para UNRLVL. Canónico UNRLVL = content-run-stage.

**Secrets:** cada marca su key Resend. Vertex SA en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET. Barrido: STORAGE_SWEEP_SECRET (rotar — se expuso 1-jul). DF: UNRLVL_SUPABASE_URL + unrlvl_service_role + FPHS_SUPABASE_URL + FPHS_SERVICE_KEY (4-jul).

**Estado publicación:** UNREALville E2E. Lucien/SamPublisher NO E2E (liga 5b). Publicación real bloqueada por ANTISPAM §6 hasta R4B.

**Anti-IP (dos modos):** Basic/Seed = tema neutro destilado del OCR+visión de Marisol (leer para aprender, no republicar). Expert/Genoma = material insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir. El video ajeno transita el bucket segundos (ffmpeg lo lee y borra + cron huérfanos) — TRANSITA, no PERSISTE; solo persiste texto-método. La regla precisa es "no REPUBLICAR el post", no "no leer el post".

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**
