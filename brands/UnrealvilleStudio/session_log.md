# Session Log — UnrealvilleStudio

## 2026-06-16 · IID Builder Convergido + Watcher LIVE · causa raíz del freeze identificada

**Conducido por:** Claude Opus 4.8 (chat, diseño + decisiones + DB directa) + Claude Code (ejecución de EFs)
**Foco:** ejecutar los pendientes 🔴 de ayer — Builder convergido + Watcher — y dejar el motor IID produciendo on-brand y anti-spam antes de la corrida real.

### Lo más importante: el freeze de abril tenía una cuarta causa que nunca diagnosticamos

El pipeline IID no estaba solo "off-brand desde abril" — estaba **muerto en seco**. El model ID `claude-sonnet-4-20250514` hardcodeado en `content-run-stage` se retiró (deprecación 15-jun-2026) → la llamada a Claude daba 404 → el pipeline moría en stage 1 (copylab). Los 3 bugs de brand/voice/genoma eran reales pero **secundarios**: aunque se arreglaran, sin modelo vivo no salía nada. Reemplazo verificado con ping HTTP 200 real (no inferido): `claude-sonnet-4-6`. Lección: un model ID hardcodeado es deuda con fecha de caducidad; pipeline congelado sin error visible → revisar model ID antes que la lógica.

### Key achievements

- **Builder Convergido LIVE** (`content-run-stage` v25→v31, cirugía in-place A1). `callClaudeDirect` → `buildFromGenome`: lee `intel.brand_topics` + `brand_voice_genome`, resuelve marca + voz **híbrida** (format manda: article/long→editorial, short/post→social; plataforma desempata solo si format ambiguo), inyecta genoma + ángulo + hard_rules, **mató el fallback silencioso `?? "UnrealvilleStudio"`** (bug #1), persiste `voice_id` real en `content_pieces.voice` + `assets.builder_meta`. Resto de stages (aife/imagelab/sociallab/email) intacto.
- **Watcher LIVE** (stage 5 de `content-run-stage`, decisión C1). 6 gates modulares `(piece, ctx)→{pass, detail}`, gate previo a `awaiting_approval`: (1) similarity semántico vía Claude >0.80→REJECT, (2) sibling-window 48-72h INFORMATIVO en piloto, (3) cadence INFORMATIVO, (4) evidence (UNRLVL sin números / Lucien viola hard_rules → REJECT), (5) duplication semántico, (6) hard-rules catch-all. Tabla `intel.watcher_log` auditable (una fila por paso). El bloque INSERT `content_pieces` + email Resend ahora corre SOLO si Watcher=PASS.
- **Guard dry-run** (`assets.builder_input.dry_run=true`) — corta tras copylab sin cascada/INSERT/email/publish. Necesario: UnrealvilleStudio está en `meta_accounts`, un click accidental en PUBLICAR habría publicado prueba en la página Meta real. El "fue dry-run" se registra en `builder_meta.dry_run_stopped=true` (metadata), no en `status` (máquina de estados).
- **`intel.brand_topics.angle` de LucienSael/ai-cognition poblado** (era null — blocker del caso multimarca). Par divergente completo.

### Divergencia multimarca VALIDADA objetivamente (corazón del piloto)

Mismo tema `ai-cognition`, dos marcas hermanas:
- **Lucien** (`lucien_editorial` v0.5, editorial): ensayo filosófico/cultural, ~5400 chars, cero cifras, übermensch no manifiesto, sin mención de libros.
- **UNRLVL** (`unrlvl_default` v1.0, social): técnico-operativo, ~450 chars, +18%/3x/30-40%, "Forward".
- **Similitud semántica medida: 0.07** (umbral REJECT 0.80). Duplicado forzado: **1.0** → rechazado. Gates 4/6 cazan UNRLVL-sin-números y Lucien-tease-de-libro con razón textual. El motor anti-autobaneo funciona y es medible.

### Limpieza + cuarentena

- **293 cadáveres** de `intel.iid_content_queue` (274 brand_id=null + 19 brand_id hardcoded del test viejo b93627b6) → `failed` + tag `ARCHIVED_LEGACY_20260616`. Decisión Sam: quemar todo lo viejo (incluido lo que tenía brand_id) — regenerar limpio cuesta menos que reparar tokens ya gastados mal. El cron `content-dispatcher-poll` (cada 30 min) deja de morder basura. `.limit(1)` INTACTO (se quita solo tras corrida real).
- **Migraciones tracked aplicadas:** GRANT SELECT a roles PostgREST en `brand_topics` + `brand_voice_genome` (eran tablas nuevas sin grants → PostgREST 404 → "sin suscripción" engañoso); DROP de `content_pieces_voice_check` obsoleto (enumeraba {unrlvl,lucien} a mano, rechazaba voice_id del genoma en silencio); DDL `intel.watcher_log` con grants.
- **EF efímera `model-ping`** (usada para verificar model IDs sin exponer la key, vía pg_net) borrada del dashboard por Sam.

### Tensión arquitectónica ABIERTA (a resolver en corrida real)

`proof_mode` ↔ UNRLVL: una pieza UNRLVL divergente y con números (pasó gate1=0.07 y gate4) fue RECHAZADA por gate6 hard_rule `proof_mode` ("describe capacidad en teoría, nunca muestra el sistema ejecutándose ahora"). Builder y Watcher discrepan sobre qué es on-brand para UNRLVL. Hipótesis: artefacto del test (finding sembrado sin producto real). Si en producción sigue bloqueando UNRLVL conceptual → decidir entre ajustar genoma UNRLVL o reclasificar `proof_mode` de bloqueante a advertencia. NO resuelto.

### Patrón confirmado 3x en la sesión (→ Professor)

"Artefacto nuevo sin permisos = fallo silencioso": tabla nueva con RLS sin GRANT → supabase-js devuelve null (no excepción); CHECK obsoleto → INSERT falla en silencio. Regla reforzada: tabla nueva = GRANT explícito + reload cache PostgREST en la misma migración; INSERT crítico chequea su error; antes de ampliar enum/CHECK estático preguntar si debería existir (si hay tabla canónica, el CHECK estático es deuda).

### Estado de EFs (verificado)

`content-dispatcher` v21 (`.limit(1)` intacto). `content-run-stage` v31 (Builder+Watcher, modelo `claude-sonnet-4-6`). Comentario de cabecera dice v1.11 — drift cosmético, runtime es 31 (anotado para drift detector).

### Pendientes (→ próxima sesión)

- [ ] 🔴 Corrida real semi-manual piloto `Sam→Claude→IID→Watcher→aprobación` (caso ai-cognition). Validar gate2 sibling-window en vivo + resolver tensión proof_mode.
- [ ] 🟡 Crear IID propios de Lucien (materia filosófica — hoy inexistentes)
- [ ] 🟡 Decidir destino de los 14 IID-* viejos
- [ ] 🟡 Scheduler R4B (jitter + desfase + crescendo; consume brand_topics; migra gate1/5 a pgvector; gates 2/3 a bloqueantes; extrae Watcher a EF C2)
- [ ] 🟡 Quitar `.limit(1)` de content-dispatcher (solo tras corrida real; cadáveres ya cuarentenados)
- [ ] 🟡 Promover `domain` a columna en orchestrator_jobs + content_pieces (R4B)
- [ ] 🟡 Deuda: model ID hardcodeado en content-run-stage (considerar leerlo de config/secret)

### Drifts detectados (→ #37 drift detector)

`api/professor.js` ya existe (HRD lo marca pendiente); `content-run-stage` comentario v1.11 vs runtime v31; `fphs_institucional` v0.5 genoma activo no listado en ecosystem.json (5 genomas propios, no 4); `nscf-b2b-approve` v5 actualizada hoy (fuera de alcance, verificar si se retoma NSCF).

---

## 2026-06-15 · Replanteamiento IID + brand_topics + 14 IID UNRLVL + anti-spam contract

**Conducido por:** Claude Opus 4.8 (chat) + DB directa (gobernanza ajustada: cambios de DB ejecutados por Claude, no CC)
**Foco:** corregir el modelo del IID de raíz · diseñar la capa marca↔temas · replantear qué investiga UNRLVL · blindar anti-baneo multimarca

### El giro conceptual (lo más importante)

- **MODELO CORREGIDO:** la **marca declara qué temas consume y con qué voz por destino**; el IID investiga temas **neutros** (sin marca, sin voz). Antes el agente cargaba `default_voice` y decidía la voz — esa era la causa raíz del off-brand (junto a `brand_id=null` en jobs y al builder que ignoraba `brand_voice_genome`). Si una marca necesita un tema que ningún IID cubre → se crea el IID.
- **3 sistemas de voz aclarados (no duplicados):** `brand_voice_genome` (editorial ejecutable), `content.brand_voices` (editorial viejo IID con ICR/AIFE), `voicelab_params` (sonora ElevenLabs, independiente). El recuerdo de "brand_voices = ElevenLabs" era incorrecto; la sonora es otra tabla.

### Key achievements

- **`intel.brand_topics` creada y extendida.** m:n marca↔tema. Campos: core (brand_id, domain, voice_by_destination, platforms, hard_rules, auto_approve, active, priority) + añadidos (rollout_phase, purpose, cadence crescendo, angle, sibling_stagger).
- **14 IID nuevos `UNRLVL-*` creados desde cero.** Tier1 (5, método/CÓMO industrial), Tier2 (3, deep-stack superuser), Tier3 (6, mercado con números). hard_rule: principio numérico + desarrollo. Los 14 viejos `IID-*` intactos (destino pendiente).
- **Naming normalizado.** `UNREALville` eliminado de `meta_accounts` (era dup exacto de `UnrealvilleStudio` — mismo page_id/token; confirmado por imagen Meta que Lucien y Studio son marcas distintas con page_id propio). `content.brand_voices.brand_id` corregido: lucien→LucienSael, unrlvl→UnrealvilleStudio.
- **Suscripciones poblpadas.** Lucien: 3 temas activos con confidencialidades como hard_rules. UNRLVL: 5 Tier1 fase 1 (publish+internal, crescendo). Caso multimarca: `ai-cognition` compartido Lucien↔UNRLVL con `sibling_stagger=true`.
- **Anti-spam contract v1.0** (`protocols/ANTISPAM_CONTRACT.md`) con **Watcher** (6 gates) como prerequisito de publicación.

### Enfoque UNRLVL (replanteado)

- Los IID de UNRLVL investigan el **CÓMO industrial del mercado**, no releases ("hablar de la nueva función de un modelo" está saturado). Cada dominio espejo de una capacidad propia (context-engineering↔sistema de contexto, signal-learning-loops↔SignalLab, etc.).
- **Todo parte de profundidad matemática/numérica/de desarrollo. Nada filosófico ni opinión sin números.** Filtro marca: numérico→UNRLVL, condición humana→Lucien (opuestos complementarios).
- Stance: que el cliente se pregunte si SU agencia opera a este nivel (reclutamiento por contraste).
- Correcciones de Sam: fuera LATAM/comunidad latina; Shopify sube a stack técnico propio; Florida general (no latino); SignalLab (no el loop de Professor).

### Anti-baneo (verificado y blindado)

- **Las 3 marcas publican con el mismo token/Business Portfolio Meta** (prefijo token idéntico). Riesgo real ≠ volumen → es publicar *lo mismo en sincronía* desde cuentas que Meta sabe que son la misma mano (spam coordinado puede arrastrar varias cuentas).
- Blindaje 3 capas: divergencia por ángulo (builder), jitter + desfase de hermanas (scheduler), **Watcher** gate final de 6 checks antes de aprobación.
- Cadencia cuentas nuevas: crescendo gradual (LI 2→3→4-5/sem, X 3→5→1día, Meta 2→3→4-5/sem). El patrón importa más que el número.

### Pendientes (→ próxima sesión)

- [ ] 🔴 CC: Builder convergido que lea `brand_topics` + inyecte genoma (mata default_voice + callClaudeDirect)
- [ ] 🔴 CC: Watcher (6 gates) — prerequisito del primer publish
- [ ] 🟢 Primera corrida real piloto Lucien (caso multimarca ai-cognition)
- [ ] 🟡 Crear IID propios de Lucien (materia filosófica — hoy inexistentes)
- [ ] 🟡 Decidir destino de los 14 IID-* viejos
- [ ] 🟡 Scheduler R4B (jitter + desfase + crescendo)

### Confidenciales Lucien (reglas duras registradas)

- Frame Nietzsche/übermensch = motor interno, **NUNCA** manifestado en output.
- Los libros de LucienSael **no existen públicamente** hasta lanzamiento; `human-essence` recluta lectores sin revelarlos.

---

## 2026-06-05 · Skill voice-reference-extractor + cierre de previews pendientes

**Conducido por:** Claude Opus 4.8 (chat) + Claude Code (ejecución)
**Foco:** validación de pipeline de extracción de voz · merge de previews Vercel pendientes · integración de skill huérfano

**SMA check:** Sin novedades del agente — export retornó contenido NSCF de sesiones anteriores (última actividad 2026-05-11), sin entradas nuevas desde el último Actualiza.

### Key achievements

- **Skill `voice-reference-extractor` v1.0 creado e integrado a `skills/` (PR #2 → merge `3b65596`).**
  Pipeline determinístico local: videos TikTok descargados → ffmpeg (audio) → Whisper (transcripción) → Tesseract (OCR on-screen) → consolidado `.md` + `.json` por cuenta. NO hace análisis de voice (eso es trabajo de chat). Idempotente por hash SHA-256. Limitación documentada: descargas TikTok ~18-20s → transcripción parcial, OCR compensa.
- **INDEX.md `v1.2 → v1.3 → v1.4` en la jornada.** v1.3 (supabase-auditor + security v1.1) entró con el merge de SamPublisher; v1.4 (voice-reference-extractor) reconcilió limpio sin pisar supabase-auditor.
- **PR #1 SamPublisher mergeado a producción (`585d447`).** Genoma `sam_personal v0.5` health green, coherente en `brands[]` + `brand_voice_genome.rows_SamPublisher` + `_meta 2026-06-02-v2`. Nota fantasma de lucien_editorial confirmada eliminada en producción.
- **Ensayo de pipeline validado end-to-end en CC (Windows).** Entorno completo instalado: ffmpeg 8.1.1, tesseract 5.4.0 + tessdata spa/eng (vía AppData sin admin), openai-whisper. 2 videos de prueba transcritos + OCR correcto.

### Decisiones

- **Proyecto "registro BTS de tono/disciplina" → DESCARTADO (decisión Sam).** Evaluado y matado por tibio: "mostrar las horas/rigor" pide permiso a la audiencia y roza el género grindset que UNRLVL no es. Principio retenido: operar a un nivel donde el rigor es obvio en el output, no narrarlo. NOT FOR EVERYONE no explica. El skill de extracción sobrevive como herramienta reusable; el caso de uso original murió.
- **División de trabajo voice-research formalizada:** CC = extracción determinística (audio + OCR, batch, local). Chat = análisis de voice iterativo contra brand. No automatizar el análisis en un skill rígido.

### Hallazgos técnicos (→ Professor)

- **CC crea skills en worktrees aislados** (`.claude/worktrees/<random>/`) que NO llegan a main — riesgo de skill huérfano si no se rastrea. El skill de esta sesión quedó atrapado ahí; recuperado e integrado por PR. Mitigación estándar: integrar siempre por PR a `skills/`.
- **Entorno de Claude.ai no descarga modelos ML** (Whisper desde Azure/HuggingFace = fuera de allowlist, 403). Transcripción de audio va sí o sí por CC local.

### Pendientes / housekeeping

- **Worktree huérfano** `.claude/worktrees/quirky-jones-aad3e8/` — desregistrado de git y branch borrada, pero el directorio físico persiste (handle de sesión CC). Borrar con `rmdir /s /q` desde terminal nueva al cerrar CC.
- **🔴 Ayra Sprint 0 — VENCIDO (deadline 5 jun).** No tocado esta sesión.

---

## 2026-05-31 — Field Notes + fix pipeline v22 + diseño Voice Genome · Sam + Claude

### Resumen
Sesión densa: blog "Field Notes" para UNRLVL, fix del bug de publicación del flujo v22, diagnóstico completo del subsistema IID, y diseño de la Fase Voice Genome para la OnboardingApp.

### Web — Field Notes (pendiente deploy a CoreProject)
- `blog/index.html` — índice "Field Notes", estética terminal/tech (void/cyan/amber, Bebas+Space Mono, crosshair, code-rain).
- `blog/brand-intelligence-infrastructure.html` — artículo 01, molde canónico.
- Pendiente: añadir `<a href="/blog/" class="nav-link">Field Notes</a>` al nav en `/index.html` y `/es/index.html`.
- **Posicionamiento:** UNRLVL es escaparate reservado ("not for everyone"). AIID en goteo bajo de autoridad, NO motor SEO. Lucien es el activo prioritario para posicionamiento orgánico.

### Fix de publicación — flujo v22
**Bug:** el test b93627b6 (29-may) generó copy+imagen+aprobación pero no publicó. Causa raíz = **brand_id mismatch**: pipeline usa "UnrealvilleStudio", `meta_accounts` solo tenía "UNREALville".
**FIX APLICADO:** insertada fila `meta_accounts` brand_id=`UnrealvilleStudio` duplicando assets/token de UNREALville.
**Nota:** el constraint `lab_jobs_status_check` YA incluye `published` (el learning del 29-may que lo reportaba faltante está obsoleto).
**DEUDA:** dos convenciones de nombres conviven (UnrealvilleStudio vs UNREALville). Normalizar a futuro o tabla de alias.

### Limpieza DB
- 11 `lab_jobs` en `pending_approval` (teasers "Great things coming") → borrados.
- 19 piezas `unrlvl/expertise` del queue IID → brand_id seteado a `UnrealvilleStudio`, siguen pending (on-brand, rescatables).
- Preservados: 40 `unrlvl/trend_signal` + 6 `tool_review` pending (triar después).
- Basura no urgente en lab_jobs: 21 failed, 6 pending, 2 processing (27-28 may).

### Diagnóstico IID (subsistema completo)
- Vive en schema `intel` (NO public). 14 agentes por dominio de conocimiento, dual voice.
- Research funciona y corre diario. Ejecución (content-dispatcher `.limit(1)` debug + content-run-stage) congelada desde 26-abr. Failed = cadáveres de arquitectura vieja (timeout 30s), no de v22 (65s).
- Modelo brand_id acordado: research de plataforma compartido + intérprete por marca vía context-cache. Fuentes por vertical temático caso por caso.

### Diseño Voice Genome (entregable)
- `VOICE_GENOME_PHASE_SPEC.md` — spec de Fase 5 para la OnboardingApp existente.
- 2 ramas: Voz Extraída (persona real + material) vs Voz Diseñada (personaje, maturity v0.5 máx).
- Captura las 9 dimensiones de `brand_voice_genome`. Valida plataformas vs cuentas reales.
- **Decisión:** brand_adn = mother brief (artefacto-fuente), NO campo/tabla nuevo. Proyecta a tablas que los labs ya consumen.

### Pendientes UNRLVL
- [ ] Deploy Field Notes a CoreProject (2 archivos + nav en 2 index)
- [ ] Implementar Fase Voice Genome en OnboardingApp (Claude Code, desde la spec)
- [ ] Triar 40 trend_signal + 6 tool_review del queue
- [ ] Normalizar convención de nombres UnrealvilleStudio/UNREALville

### Estado genoma
UNRLVL tiene `brand_voice_genome` `unrlvl_default` v1.0 activo y completo (por eso su contenido sale on-brand). Es el ejemplo de oro para los prompts de la Fase Voice Genome.

---
*Session log · UnrealvilleStudio · 2026-05-31*
