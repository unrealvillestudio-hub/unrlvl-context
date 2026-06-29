# AGENDA — Unrealville Studio
_Actualizada: 2026-06-28 · v2026-06-28-v3 (#47 Expert/Boids: E3b-1 CERRADO — /api/extract-frames decodifica HEVC con ffmpeg en Lambda, probado E2E con el video real de Marisol [15 frames + borrado]. Próximo: E3b-2 front [decisión: cómo sube Marisol el video] · base previa v2026-06-28-v2)_

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
- **A — Vía D: frames en el navegador + Cloud Vision OCR.** El informe E3-exploratorio mató la EF self-contained (runtime sin subprocess + cap 2s CPU + bundle 20MB → ffmpeg/tesseract in-EF imposible). Solución: el navegador de Marisol extrae frames con **canvas nativo** (sin instalar nada, el browser ya decodifica video), redimensiona ~720px JPEG, los manda en el body a la EF, que hace OCR vía **Google Cloud Vision** (DOCUMENT_TEXT_DETECTION) reusando la **credencial Vertex existente** (cero proveedor nuevo). El video ajeno NUNCA toca la infra (se queda en el navegador) → anti-IP máximo.
- **B — tabla `intel.captured_techniques`** (NO iid_seeds con lane). Precursora de `brand_voice_genome` (mapeo campo-a-campo verificado). ✅ LIVE E1.
- **C — dos fases.** Fase 1 (captura+OCR) se CONSTRUYE. Fase 2 (calibración por convergencia = método de los 10 textos de Lucien) es un SKILL conversacional (`genome-calibration`), no código.
- **Quién opera:** Marisol captura en Expert (scope: sus 6 marcas) Y calibra dentro de su scope (es experta de dominio). Candados duros: scope server-side (NUNCA Lucien/UNRLVL); el INSERT a brand_voice_genome lo dispara SIEMPRE la aprobación de Sam.
- **Resumen retomable (`technique_summary`):** handoff Fase 1→Fase 2.

| E | Etapa | Entregable | Estado |
|---|---|---|---|
| E1 | DDL | `intel.captured_techniques` + GRANT service_role + 2 índices + rollback | ✅ **LIVE (27-jun)** |
| E2 | Storage | bucket `iid-expert-uploads` privado (CONDICIONAL — candidato a limpieza tras prueba de Marisol) | ✅ **LIVE condicional (27-jun)** |
| E3-EF | EF OCR | `iid-expert-ocr` v1 en `unrlvl-iid-functions` (Vía D: frames del navegador + Cloud Vision). Smoke verde | ✅ **v1 LIVE + smoke (27-jun)** |
| E3-FRONT | Front extracción | ❌ canvas en navegador — **FALLÓ con HEVC en equipo de Marisol (28-jun)**. Chrome no decodifica H.265. PR #2 mergeado pero el canvas se jubila. | ❌ **obsoleto → server-side** |
| **E3b** | **Server-side (rediseño post-HEVC)** | extracción con ffmpeg server-side. Diseño cerrado (ver DISENO_E3_server_side + session_log 28-jun b) | 🔵 **construyendo** |
| E3b-1 | /api ffmpeg | `Orchestrator/api/extract-frames` (ffmpeg-static, handler Node nativo, borra video) | ✅ **CERRADO — E2E verde con video HEVC real (28-jun)** |
| E3b-2 | front | `ExpertCapture.tsx` reescrito: sube video al bucket → llama extract-frames → pasa frames a la EF (intacta). **DECISIÓN PENDIENTE: cómo sube Marisol el video (anon no puede escribir al bucket → signed upload URL probable)** | 🔵 PRÓXIMO (requiere diseño) |
| E3b-3 | cron huérfanos | barre videos del bucket > 1h (backup del borrado) | 🔵 mapeado |
| E3b-4 | prueba Marisol | con el MISMO video HEVC que falló → debe pasar E2E desde su dispositivo. Gate de cierre E3 | 🔵 mapeado |
| E4 | iid-inbound | acciones `expert_*` — REVISAR: E3-EF ya hace la captura, evaluar si E4 sigue siendo necesaria o se absorbe | 🔵 a revisar |
| E5 | Front Expert | sub-pestaña Basic/Expert completa (envuelve E3b-2, reemplaza mount temporal). Rama+PR+Preview | 🔵 mapeado |
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
| ✅ Cloud Vision API habilitada (27-jun) | proyecto gen-lang-client-0491381650, SA imagelab-vercel compatible | E3 OCR (smoke verde) |
| ✅ JWT secret alfanumérico sincronizado Supabase+Vercel (28-jun) | el viejo tenía chars especiales %$&^ → no matcheaba cross-platform | auth E3b-1 |
| ✅ service_role LEGACY (eyJ) en Vercel (28-jun) | la nueva sb_secret_ no sirve para Storage privado | E3b-1 Storage |
| 🔴 ROTAR contraseñas temporales Sembrador (SUBE PRIORIDAD) | la registrada en contexto NO coincide con la real (hallazgo smoke E3); credenciales expuestas en sesiones. Script local, recargar secret usuarios. NOTA: el JWT secret ahora vive en 2 lugares (Supabase+Vercel) — rotar en ambos | producción real Marisol |
| 🟡 DEUDA: migrar service key a SUPABASE_SECRET_KEYS nueva | cuando se confirme que el Storage API acepta el formato nuevo; NO deshabilitar legacy keys (varias cosas las usan) | limpieza credenciales |
| 🟡 DEUDA naming: ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET | arrastra "NSCF" pero gobierna toda la auth IID; renombrar junto con rotación | limpieza |
| ✅ MERGEAR PR #3 (E3b-1) | Preview verde verificado; Sam mergea | E3b-1 a main |
| 🔵 PRUEBA REAL desde el dispositivo de Marisol (E3b-4, cierra E3) | tras E3b-2 (front) → Marisol prueba desde SU dispositivo con su video HEVC, desde cero. Verde → limpiar bucket E2 (o queda como protagonista del flujo server-side) | cierre E3 |
| rollout_started_at | Fijar fecha 1ª sem julio en intel.brand_rollout al lanzar | crescendo Scheduler |
| brand_topics 6 marcas Marisol (#45) | Decidir domains por marca en sesión propia | Sembrador produce para NSCF/Patricia |
| Aprobar learnings Professor | ✅ 28 ventana IID (24+27-jun) + 6 de E3b-1 (+ 3 28-jun b) (28-jun c) aprobados · 22 pendientes (mayo) | Professor |

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
| 47 | 🔵 **Modo Expert/Boids — E3b-1 CERRADO: ffmpeg server-side decodifica HEVC (28-jun c)** — `/api/extract-frames` probada E2E con el video HEVC real de Marisol (15 frames + borrado). PR #3 a mergear. Próximo: E3b-2 front (decisión: cómo sube Marisol el video → signed upload URL probable) → E3b-3 cron → E3b-4 prueba Marisol. E1+E2+E3-EF LIVE. Ver session_log §9 (28-jun c) + DISENO_E3_server_side.md. | UNRLVL |
| 48 | ✅ **Approval por email — COMPLETO y verificado en vivo (27-jun).** iid-inbound v9, notifyGate inline en capture, email a content-approval@ con enlace al Orchestrator. Ver bloque SPRINT SEMBRADOR + session_log §9 (27-jun). | UNRLVL |

---

## 🟠 FOCO PROPIO — CLAUDE.md (sesión dedicada · Sam la retoma pronto)
Consolida #35 (CLAUDE.md repos restantes) + #39 (.github/CLAUDE.md repetido). Resolver duplicado `/CLAUDE.md` (8.4KB) vs `/.github/CLAUDE.md` (608b), definir canónico, cerrar gobernanza CC a medias. Es ley activa de CC → cuesta en cada sesión mientras esté incompleta. Trabajo propio con foco, NO dentro de un sprint de producto.

---

## ✅ Resuelto recientemente
- ✅ **#47 Expert/Boids — E3b-1 CERRADO: ffmpeg server-side decodifica HEVC (28-jun c).** `/api/extract-frames` (Orchestrator, Vercel serverless Node + ffmpeg-static) probada E2E en Preview con el video HEVC REAL de Marisol que rompía Chrome (hvc1 1080×1920 43.28s): 200, 15/15 JPEG 720px válidos, video borrado (bucket 0 objetos, verificado SQL), contrato 200/400/401/404. maxDuration=60 holgado (27s real). PR #3 (rama claude/e3b-1-extract-frames, commits fa4be2f/13dc2e0/ca371e2/2497e4e/2c818c4). Resueltos 2 gotchas de credenciales (ver bloqueos): JWT secret chars especiales → alfanumérico; service_role nuevo no sirve Storage → legacy eyJ (key_len 40→219). Professor: 6 learnings aprobados. PENDIENTE: mergear PR #3. — 2026-06-28
- ⚠️ **#47 Expert/Boids — E3-FRONT-canvas FALLÓ con HEVC → rediseño server-side (28-jun b).** La prueba desde el equipo de Marisol expuso que su video era HEVC/H.265 (hvc1) y Chrome no lo decodifica → la extracción canvas (Vía D) falló. El peso no era el problema (el de Sam funcionó por ser H.264). Decisión: **server-side total** — ffmpeg extrae frames (cualquier códec) como `/api/extract-frames` DENTRO del Orchestrator (ni proyecto nuevo ni ImageLab), Flujo A (navegador orquesta, EF iid-expert-ocr INTACTA hace OCR+persiste). Anti-IP ajustado (video transita el bucket segundos, se borra). 4 decisiones cerradas con Sam. Diseño consolidado en DISENO_E3_server_side.md. Plan E3b-1..4 (prueba final = el MISMO video HEVC de Marisol). Professor: 3 learnings. — 2026-06-28
- ✅ **#47 Expert/Boids — E3-FRONT construido + E2E verde desde Preview (28-jun).** Componente canvas en Orchestrator (PR #2), probado E2E por Sam desde Preview (15 frames, 1115 chars OCR). NOTA: este canvas quedó obsoleto al día siguiente por el fallo HEVC en el equipo de Marisol (ver entrada 28-jun b). El PR #2 está mergeado; el canvas se reemplaza por server-side. — 2026-06-28
- ✅ **#47 Expert/Boids — E1+E2+E3-EF construidos y verificados (27-jun c).** Informe E3-exploratorio mató la EF self-contained → **Vía D** (frames del navegador + Cloud Vision OCR). E1 tabla LIVE. E2 bucket condicional. E3-EF `iid-expert-ocr` v1 LIVE (PR #6) + fix PEM (PR #7) + smoke verde. Vision habilitada. Hallazgo seguridad: contraseña Marisol del contexto no coincide con la real. Professor: 6 learnings (+28 aprobados). — 2026-06-27
- ✅ **#47 Expert/Boids DISEÑADO y cerrado + E1 construido (27-jun b).** Sesión de diseño anclada en código real. Subsistema de onboarding de marcas en 2 fases. 6 decisiones cerradas con Sam. Plan E1-E8. Professor: 5 learnings. — 2026-06-27
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

**#47 Expert/Boids — estado 2026-06-28 c (E3b-1 CERRADO, ffmpeg server-side verde):** subsistema PERMANENTE de onboarding. 2 fases: Fase 1 (captura+OCR) E1-E8; Fase 2 (calibración) = skill `genome-calibration`. **Arquitectura server-side (post-HEVC):** navegador sube video al bucket `iid-expert-uploads` (E2) → `/api/extract-frames` (ffmpeg-static en Orchestrator/Vercel, Flujo A) decodifica CUALQUIER códec → frames → EF `iid-expert-ocr` v1 INTACTA → OCR Cloud Vision → persiste captured_techniques. ffmpeg borra el video tras extraer + cron huérfanos (pendiente E3b-3). Anti-IP: video TRANSITA (segundos), no persiste. **E3b-1 PROBADO E2E** con video HEVC real de Marisol (15 frames, video borrado, contrato completo). Estados: E1 tabla LIVE, E2 bucket LIVE (protagonista), E3-EF v1 LIVE+smoke verde (INTACTA), E3b-1 cerrado (PR #3 a mergear). **PRÓXIMO: E3b-2 (front) con DECISIÓN abierta — cómo sube Marisol el video (anon no escribe al bucket → signed upload URL probable).** Luego E3b-3 (cron) → E3b-4 (prueba Marisol desde su dispositivo, cierra E3). Marisol captura Y calibra en su scope, NUNCA Lucien/UNRLVL; Sam firma el INSERT.

**IID Sembrador — estado 2026-06-27 (#48 COMPLETO):** front IID Seeds LIVE + notificación por email. iid-inbound **v9** (auth dos ejes + notifyGate #48). Al entrar una semilla a awaiting_approval → email a content-approval@ con enlace a la raíz del Orchestrator (sin resumen, anti-IP, asunto=neutral_topic etiqueta pendiente/sin-mapear). Patrón Resend de content-run-stage. BLOQUEANTE producción para marcas Marisol = #45 (brand_topics sin sembrar). Contraseñas temporales a rotar antes de producción.

**IID Sembrador — estado 2026-06-26 (T4):** front IID Seeds LIVE. Marisol (seeder, 6 marcas scope) captura razonada; Sam (admin) aprueba con corrección inline. Auth dos ejes en iid-inbound v7. iid-inbound versionado en unrlvl-iid-functions.

**IID — estado 2026-06-25 a:** content-dispatcher v27 (.limit(1) intacto, transporta domain) → content-run-stage v41 → content-watcher v5 (6 gates; Gate 7/8 eje B NO implementados) → approve-piece v14. Modelo claude-sonnet-4-6.

**Marcas (public.brands) — referencia scope:** las 6 de Marisol = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF. brand_topics SOLO pobladas para LucienSael + UnrealvilleStudio.

**Stack labs:** copylab=unrlvl-copy-lab · imagelab=image-lab-unrlvl (gemini-2.5-flash-image; AQUÍ vive credencial Vertex) · sociallab=social-lab-flame · videolab=unrlvl-video-lab (active=false). lab-worker v23.

**Genoma Lucien v1.0 (19-jun):** 2 voces (editorial+social). core_move generativo/constructor.

**Decisiones R4B congeladas (20-jun):** Scheduler EF+cron 1×/día ET. scheduled_for en queue. Ventanas ET, jitter ±45min. Sibling-stagger ≥48h. Embeddings Vertex gemini-embedding-001 @768.

**Radar pgvector:** instalado pero SIN materializar. Gate 8 visual del eje B = greenfield de embeddings.

**Patrones gobernanza:** spec sin fuente=suposiciones; IID EFs sin repo → direct-on-prod (EXCEPCIÓN: iid-inbound + iid-expert-ocr versionadas por llevar auth/lógica de producto); CHECK de tablas core son enums cerrados; acople-por-contrato (4B); auth multi-usuario = patrón nscf-b2b-approve (bcryptjs@2.4.3 cost 10, JWT HS256 djwt, usuarios en secret JSON, matriz PERMISSIONS fail-closed, sin short-circuit); scope de marca = modelo gerente-de-cuentas (regla dura server-side, NO filtro de UI); calibración de voz también scope-gated (quien califica una voz debe ser experto de dominio; Marisol sí sus 6 marcas, nunca Lucien/UNRLVL; Sam firma el INSERT); EF sin fuente git = pedir el código al humano, no reconstruir del ESZIP; GRANT service_role aplica también a tablas viejas leídas por EF nueva; disciplina sesión-nueva CC (verificar rama base, no arrastrar ramas claude/* viejas); **versión del deploy NO vive en el código (header dice v2.0) — vive en Supabase; nunca asumir git vN == deploy vN, verificar con get_edge_function antes de bumpear**; **allowlist de repos de CC se fija al ARRANCAR la sesión (apuntada al working dir), no se amplía en caliente; habilitar el connector de GitHub a nivel cuenta NO la cambia; tell de arranque: primer get_file_contents al target devuelve archivo, si 403 parar**; **Claude Chat sandbox sin egress a *.supabase.co — no puede invocar/curl-ear EFs; el disparo de verificación viene de afuera (Sam curl local)**; **navegador no puede detectar/instalar software en máquina del cliente (sandbox browser); Whisper revienta EF de Supabase → procesamiento pesado de video = OCR-only de frames livianos o API externa, nunca Whisper en EF**; **runtime de EF Supabase: sin subprocess (no ffmpeg/tesseract binarios) + cap 2s CPU + bundle 20MB → trabajo CPU-pesado va al navegador (canvas decodifica video nativo, gratis) o API externa; la EF queda orquestadora delgada (solo I/O = wall-clock)**; **OAuth2 de Service Account en EF: la private_key del JSON del SA trae \\n ESCAPADOS como secret → des-escapar (replace(/\\\\n/g,"\\n")) ANTES de atob/importKey o la clave RSA no carga (confirmado en smoke E3); fix defensivo (no-op si ya son reales)**; **extracción de frames en el NAVEGADOR (canvas) es frágil por códec: depende del soporte del navegador del usuario; HEVC/H.265 falla en Chrome de muchos equipos (confirmado: video de Marisol). Procesamiento de video que dependa del códec del cliente NO sirve para producto operado por no-técnicos → extracción server-side con ffmpeg. Patrón cicatriz Vercel: handler Node nativo VercelRequest/VercelResponse (Web API ignora maxDuration → 504); video sube directo al bucket por signed URL (no por la function, límite de payload)**; **GOTCHA secret cross-platform: un secret con chars especiales (%, $, &, ^) se interpreta distinto entre Vercel (Windows) y Supabase al pegar → no matchea aunque se copie idéntico (síntoma: "copié idéntico pero da 401"). Solución: secret ALFANUMÉRICO PURO (sin símbolos). El .trim() no alcanza**; **GOTCHA service_role para Storage: Supabase migró a JWT Signing Keys; la key nueva (sb_secret_, ~40c) la acepta PostgREST pero NO el Storage API de bucket privado → "Bucket not found". Usar la service_role LEGACY (eyJ... ~219c) de Settings>API Keys>pestaña Legacy. key_len 40 vs 219 lo confirma. NO deshabilitar legacy keys. Ya registrado antes, reconfirmado en E3b-1**; **Claude Chat NO puede subir binarios a Storage (MCP solo SQL+EF, sandbox sin egress a supabase.co) → los sube Sam por Studio; NUNCA pasar service role key a CC por chat**.

**Resend (patrón confirmado #48):** cada marca su key. UNRLVL = `RESEND_UNRLVL_KEY` (from content@unrealvillestudio.com → content-approval@unrealvillestudio.com). NSCF = RESEND_API_KEY (from noreply@neuronescflorida.com). NUNCA clonar el de nscf-mailer para emails UNRLVL (bug histórico). Patrón canónico UNRLVL = content-run-stage.

**Secrets:** cada marca su key Resend. Vertex SA en Vercel image-lab + Supabase EF. Auth Sembrador: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.

**Estado publicación:** UNREALville E2E. Lucien/SamPublisher NO E2E (liga 5b). Publicación real bloqueada por ANTISPAM_CONTRACT §6 hasta R4B.

**Anti-IP (dos modos de semilla):** Basic = material nunca leído, tema neutro. Expert/Boids = material es insumo de aprendizaje de TÉCNICA, nunca fuente a reescribir (análogo frame Nietzsche de Lucien: motor interno, nunca citado). En Expert (server-side post-HEVC) el video ajeno SÍ transita el bucket privado unos segundos (ffmpeg lo lee y lo borra tras extraer frames + cron de huérfanos) — TRANSITA, no PERSISTE. Solo persiste texto-método consolidado. Cambio explícito vs. la postura Vía D ("nunca toca la infra"): es el precio de soportar cualquier códec sin pedirle nada al usuario.

**Ayra Sprint 0 🔴 VENCIDO (5 Jun).**