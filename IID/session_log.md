# IID — Intelligence Insights Developers
### Documento fundacional + session_log del repo IID de UNRLVL
_Fundado: 2026-06-22 · Mantenido por Sam (push) + Claude (redacción) · Marca raíz: UnrealvilleStudio · Multimarca_

> **Regla de mantenimiento:** este archivo es UPDATE in-place. Las novedades de sesión van AL TOPE de la sección SESSION LOG (§9), nunca se reemplaza el cuerpo. Las secciones §1–§8 son el cuerpo de conocimiento estable; se editan quirúrgicamente cuando la realidad cambia, preservando lo válido.

---

## §0 — QUÉ ES ESTE DOCUMENTO

Este es el hogar de contexto del IID, el workstream más activo y de mayor valor de marketing del ecosistema UNRLVL. Hasta 2026-06-22 el IID vivió **solo en Supabase** (sin carpeta ni archivo en GitHub); su historia estaba dispersa entre la AGENDA y protocols sueltos. Este documento funda su contexto: qué es, por qué se llama así, cómo funciona en profundidad, su cableado con el resto del ecosistema, su estado y su historia de decisiones.

---

## §1 — NOMBRE Y SIGNIFICADO (canónico)

**IID = Intelligence Insights Developers.**

**UNRLVL-IID** = los IID de UNRLVL (no es otro nombre; es el prefijo de pertenencia: los IID que son de Unrealville).

### Nota sobre la deriva del nombre (importante, documentada para que no se repita)
Las siglas "IID" sufrieron **deriva de reinterpretación**: al reducir el sistema a tres letras, en sesiones sucesivas Claude reinterpretó qué podían significar, y se perdió el original. Variantes que aparecieron en resúmenes y notas: *Intelligent Intelligence Dispatcher*, *Intelligent Insight Distribution*, *Intelligent Content Distribution*. **Ninguna es canónica.** El nombre real, fijado por Sam el 2026-06-22, es **Intelligence Insights Developers** — el más acorde con la realidad de lo que el sistema hace: desarrolla insights de inteligencia (de mercado, plataformas, LLMs, e-commerce) para uso dual. Cualquier documento o resumen que use otra expansión está desactualizado.

---

## §2 — ORIGEN CONCEPTUAL Y PROPÓSITO (el porqué)

El IID **no nació como un distribuidor de contenido.** Nació (abril 2026, en la sesión del Shopify Auditor) como **motor de inteligencia de marketing**: una red de agentes que investigan qué pasa en el mundo relevante para UNRLVL — releases de LLMs, mecánica de plataformas (Meta, Google, TikTok, X, LinkedIn), e-commerce, mercados (Florida, Latam), wholesale, dropshipping.

El **insight fundacional de Sam** fue el que define todo el sistema:

> La investigación que UNRLVL hace para ser mejor en su negocio es **exactamente el mismo material** que la posiciona como experta ante el mundo. Cero desperdicio. Máximo leverage.

De ahí el **doble uso** que es el ADN del IID:

```
IID Network (investiga dominios)
        ↓
Hallazgos filtrados por relevancia
        ↓
        ├──→ Mejora interna del ecosystem (los labs, las marcas, las operaciones)
        └──→ Posicionamiento público (contenido UNRLVL + Lucien como expertos)
```

### El propósito multimarca (la entrada de Lucien)
El IID se construyó originalmente como motor de inteligencia de **marketing** — alimentando a UNRLVL/Sam, que hablan de eso con autoridad. Cuando **Lucien entró al mapa**, Sam estableció algo que en ese momento él veía y Claude no: **el IID debía ser multimarca**, no solo de UNRLVL. Esa es la dirección en la que se ha trabajado desde entonces.

**El pecado original (documentado para entender los bugs de junio):** Lucien se *encajó a la fuerza* sobre la estructura de marketing existente — se puso `default_voice='lucien'` encima de agentes que investigaban marketing/plataformas/industria, no los temas filosóficos de Lucien (ai-cognition, ai-identity, human-essence). Esto causó el output off-brand que se diagnosticó y corrigió en junio (ver §8). La lección estructural quedó: **la marca declara qué consume y con qué voz; el agente investiga temas neutros.** El `default_voice` del agente NO debe decidir la voz (esa fue la raíz del bug).

### Estado de pruebas
**UnrealvilleStudio y Lucien funcionan como conejillos de indias** del IID hasta que quede **R4B** (el Scheduler + endurecimiento del Watcher). Una vez R4B esté cerrado y validado con estas dos marcas, el sistema se extiende al resto del ecosistema multimarca.

---

## §3 — ARQUITECTURA DE AGENTES (`intel.iid_agents`)

29 agentes activos al 2026-06-22. Cada agente tiene: `tier`, `domain`, `default_voice`, `lucien_angle_affinity[]`, `run_frequency`, `is_active`, `search_config` (jsonb que define QUÉ investiga), `last_run_at`.

### Core (1)
- **IID-CORE** — tier `core`, domain `orchestration`. El coordinador.

### Legacy IID-* (los originales — SÍ están corriendo)
Estos son los agentes del diseño original (motor de marketing). Tienen `last_run_at` reciente → están activos en producción.

| Agente | Tier | Domain | default_voice | last_run |
|---|---|---|---|---|
| IID-IMAGE | tier1 | image-ai | unrlvl | 18-jun |
| IID-LLM | tier1 | llm | **lucien** | 09-jun |
| IID-VIDEO | tier1 | video-ai | unrlvl | 18-jun |
| IID-VOICE | tier1 | voice-ai | unrlvl | 19-jun |
| IID-GOOGLE | tier2 | google | unrlvl | 20-jun |
| IID-LINKEDIN | tier2 | linkedin | **lucien** | 21-jun |
| IID-META | tier2 | meta-platforms | unrlvl | 17-jun |
| IID-TIKTOK | tier2 | tiktok | unrlvl | 19-jun |
| IID-X | tier2 | x-twitter | **lucien** | 21-jun |
| IID-ECOMMERCE | tier3 | ecommerce | unrlvl | 24-abr |
| IID-FLORIDA | tier3 | florida-latam | unrlvl | 15-jun |
| IID-PERSONAL-BRAND | tier3 | personal-brand | **lucien** | 09-jun |
| IID-WHOLESALE | tier3 | wholesale | unrlvl | 22-jun |

> Los 4 agentes con default_voice='lucien' (IID-LLM, IID-LINKEDIN, IID-X, IID-PERSONAL-BRAND) son el legado del encaje a la fuerza de Lucien. Su `search_config` investiga marketing/industria, NO los temas filosóficos de Lucien — de ahí el mismatch histórico. Decisión de destino pendiente (AGENDA 5d).

### UNRLVL-* nuevos (14, creados 15-jun, en 3 tiers — aún SIN ejecutar)
Creados en el replanteamiento del 15-jun. `last_run_at: null` (creados, no corridos todavía). **Hard rule de los 14: todo respaldado por números y profundidad de código; nada filosófico (eso es territorio de Lucien).**

- **Tier 1 — el CÓMO industrial:** UNRLVL-AI-INDUSTRIALIZATION, UNRLVL-BRAND-VOICE-SYSTEMS, UNRLVL-CONTEXT-ENGINEERING, UNRLVL-CRO-PSYCHOLOGY, UNRLVL-SIGNAL-LEARNING-LOOPS
- **Tier 2 — superusuario deep-stack:** UNRLVL-ALGORITHM-MECHANICS, UNRLVL-GOOGLE-DEEP-STACK, UNRLVL-META-DEEP-STACK
- **Tier 3 — mercado con números:** UNRLVL-ECOMMERCE-DEEP, UNRLVL-SHOPIFY-STACK, UNRLVL-MARKET-FLORIDA, UNRLVL-DROPSHIP-REALITY, UNRLVL-WHOLESALE-LOGISTICS-FL, UNRLVL-CREATOR-MACRO-ECONOMY

### La red especializada imaginada (visión, abril)
La intención original de Sam: una red de agentes con foco quirúrgico, cada uno experto en su dominio, que de paso son material de posicionamiento. Dominios visionados: Image Generation, E-Commerce, Video/Avatar, Products Distribution, Florida/Latam markets, Wholesale, Dropshipping, Marcas Personales/Propias, Meta/Meta Ads, TikTok/TikTok Ads, Google, LinkedIn, X. Buena parte ya existe como agentes; el resto es roadmap.

---

## §4 — GOBIERNO DE VOZ Y TEMA (`intel.brand_topics`)

La corrección estructural del bug fundacional vive aquí. **La MARCA declara qué temas consume y con qué voz por destino; el agente IID investiga temas neutros.** `brand_topics` es la fuente de verdad de la distribución.

Ejes de la tabla (por fila marca+dominio):
- **`domain`** — el dominio editorial (ej. ai-cognition). Distinto del domain de research del agente.
- **`angle`** — el TERRITORIO temático (qué/dónde), nunca la voz (cómo). Regla angle=territorio: el angle NO debe repetir el core_move del genoma (si lo hace, colapsa la voz en fórmula — ver §8).
- **`voice_by_destination`** — qué genoma se usa según destino (X/Meta/TikTok → social; blog/LinkedIn long-form → editorial).
- **`platforms`** — las plataformas de esa marca/dominio.
- **`cadence`** — crescendo por mes y plataforma. **Interpretación A:** la cadencia es por-marca-por-plataforma (volumen total); los dominios ROTAN dentro de los slots, NO multiplican.
- **`rollout_phase`** — fase de activación.
- **`sibling_stagger`** — flag para marcas hermanas que comparten un tema (Lucien+UNRLVL en ai-cognition); fuerza desfase ≥48h.

Marcas activas hoy (fase 1): **LucienSael** (3 dominios: ai-cognition, ai-identity, human-essence) + **UnrealvilleStudio** (ai-cognition + 5 dominios Tier1 + **algorithm-mechanics** en fase 2, abierto 25-jun).

---

## §5 — EL PIPELINE (flujo CLAUDE → ORCHESTRATOR → labs → publicación)

### Flujo de datos completo
```
1. CRON (jobids 2-28) dispara intel.trigger_iid_agent(slug, {agent_name})
                     │  (función SQL que inyecta x-cron-secret y llama a la EF)
                     ▼
2. iid-research  ──→ iid_research_raw   (investigación cruda del dominio)
                     ▼
3. iid-process   ──→ iid_findings       (hallazgos filtrados por relevancia)
                     ▼
4. (brief)       ──→ iid_briefs          (iid-brief-generator, 1 y 15 de mes)
                     ▼
5. encolado      ──→ iid_content_queue   (lo listo para producir; lleva brand_id + domain)
                     ▼
6. CRON jobid 29 (cada 30min) ──→ content-dispatcher (.limit(1))
                     │   selecciona UNA pieza pendiente de la queue
                     ▼
7. content-run-stage (v37) — EL ORQUESTADOR DE PRODUCCIÓN:
     ├─ Builder buildFromGenome (stage 1): lee brand_topics + brand_voice_genome,
     │     arma el prompt jerárquico, llama a CopyLab
     ├─ AIFE filter (aife-filter EF): control de calidad/seguridad de marca
     ├─ ImageLab: genera imagen (Vertex) → sube a Storage unrlvl-media (CDN)
     ├─ SocialLab: arma el post por plataforma
     └─ callWatcher → content-watcher (v1): 6 gates (similarity, sibling-window,
           cadence, evidence, duplication, hard-rules) → PASS / REJECT / RESCHEDULE
                     ▼
8. content_pieces (status awaiting_approval) + email a content-approval@unrealvillestudio.com
                     ▼
9. ORCHESTRATOR (orchestrator-unrlvl.vercel.app) — front de aprobación humana (Sam)
                     ▼
10. approve-piece (v14): al aprobar → publica (Meta) + move-to-permanent (imagen temp→permanente)
                          al rechazar → status failed (HOY sin rejected_reason → AGENDA 5r)
```

### Los tres PromptBuilders (historia importante)
En el diagnóstico de junio se descubrieron **tres PromptBuilders distintos** conviviendo: el de CopyLab (front), el de CopyLab (`api/execute.ts`), y el del propio IID (versión degradada que NO leía el genoma). La corrección fue `buildFromGenome` dentro de content-run-stage, con jerarquía de prompt canónica de 6 capas: instrucción arriba → hard rules → brand voice (genoma) → brand+audience context → creative direction → guidance/reference. Se evaluó y RECHAZÓ la idea de una "capa LLM rewriter" a favor de `formatForEngine()` determinístico por motor + jerarquía estructural.

### La jerarquía del prompt (canónica)
1. Instrucción (identidad del builder: "construyes la pieza ENCARNANDO el genoma")
2. L0: marca/mercado/idioma/objetivos/audiencia/compliance
3. EJE ESTRUCTURAL (el angle del brand_topic — territorio, no voz)
4. GENOMA DE VOZ (ejecutar, no mencionar) — incluye argumentative_architecture
5. anti-formula, title rule, closer rule, hard rules, number rule
6. BRIEF de research (materia prima neutra — interpretar, no copiar)

---

## §6 — CABLEADO: SUPABASE + VERCEL + LABS

### Supabase (proyecto `amlvyycfepwhiindxgzw`)
**Schema `intel.*`:** iid_agents, brand_topics, iid_briefs, iid_content_queue, iid_cron_runs, iid_findings, iid_research_raw, iid_scheduler_config, watcher_log.
**Schema `content.*`:** brand_context_cache, brand_voices, content_calendar, content_performance, content_pieces, orchestrator_jobs.
**Schema `public.*` relevante:** brand_voice_genome (genomas de voz por marca), lab_configs, lab_jobs.

**EFs del pipeline (versiones al 2026-06-25):**
- content-dispatcher **v27** (verificado 2026-06-25) — cron cada 30min, tiene el `.limit(1)` (NO tocar hasta publicación real). HOY ignora `scheduled_for`. **v27 (25-jun): transporta `domain` de la queue al job (`assets.builder_input.domain`).**
- content-run-stage **v41** (verificado 2026-06-25) — orquestador de producción (Builder + labs + callWatcher + domain-write a jobs/pieces/queue). Lee `domain` de `job.assets.builder_input.domain`.
- content-watcher **v5** — los 6 gates extraídos a EF propia (5e-4). **Nota: v5 sigue siendo lógica v1 — 6 gates. Gate 7 (objetivo↔estímulo) y Gate 8 (similitud visual) del diseño eje B NO implementados.**
- approve-piece **v14** — aprobación: publish Meta + move-to-permanent.
- aife-filter — control de calidad/seguridad.
- lab-worker **v23** — orquestador VIEJO (dual-mode, lab_jobs). Llama a los labs por HTTP vía lab_configs. NO tiene credenciales Vertex (solo SUPABASE + ANTHROPIC).
- copylab-processor, brand-context-builder, context-cache — soporte.

**Función SQL clave:** `intel.trigger_iid_agent(slug, payload)` — inyecta el `x-cron-secret` server-side y hace el net.http_post a la EF correspondiente. Es el puente cron→EF.

**Config (`intel.iid_scheduler_config`):**
- orchestrator_url = `https://orchestrator-unrlvl.vercel.app`
- vercel_bypass_secret = aplica a CopyLab, ImageLab, SocialLab (Protection Bypass)
- iid_cron_secret = secret compartido cron↔EFs

### Vercel — los Labs (`public.lab_configs`)
Cada lab es un servicio Vercel independiente con endpoint `/api/execute`. content-run-stage / lab-worker los llaman por HTTP.

| Lab | Endpoint | Estado | Función |
|---|---|---|---|
| **CopyLab** | unrlvl-copy-lab.vercel.app | active | Genera el copy/texto de la pieza desde el prompt del Builder |
| **ImageLab** | image-lab-unrlvl.vercel.app | active | Genera imagen vía **Vertex AI** (Imagen 3.0 fast-generate-001 + capability-001) con Service Account `imagelab-vercel@gen-lang-client-0491381650`. **Aquí vive la credencial Vertex** (GOOGLE_SERVICE_ACCOUNT_KEY). Facturado a crédito GCP. |
| **SocialLab** | social-lab-flame.vercel.app | active | Arma el post por plataforma; tiene /api/execute y /api/publish |
| **VideoLab** | unrlvl-video-lab.vercel.app | **active=false** | Video/avatar — pendiente de lanzar (depende de VideoLab real, Kling.ai) |

- **Orchestrator** (orchestrator-unrlvl.vercel.app): front de aprobación humana donde Sam aprueba/rechaza las piezas en `awaiting_approval`.
- **Context System** (unrlvl-context.vercel.app): no es un lab, pero el pipeline lo consulta para brand-cache (`/api/brand-cache`).

### El crédito Vertex (resuelto 2026-06-22)
La credencial Vertex (Service Account JSON) vivía SOLO en el Vercel de ImageLab. Para que las EFs de Supabase (content-watcher embeddings, 5e-2) pudieran usar Vertex, Sam cargó en Supabase Secrets: `GOOGLE_SERVICE_ACCOUNT_KEY` + `GOOGLE_CLOUD_PROJECT` + `GOOGLE_CLOUD_LOCATION`. Proyecto GCP: `gen-lang-client-0491381650`.

---

## §7 — ESTADO ACTUAL (2026-06-25)

**Operativo:** la red de agentes legacy investiga en cadencia (crons activos, last_run reciente). El pipeline produce piezas end-to-end para UNRLVL y Lucien que llegan a `awaiting_approval` con email confirmado. Genoma v1.0 de Lucien en producción. **Tramo queue→approval REPARADO (25-jun): el transporte de `domain` ya no muere en "sin suscripción brand_topics".**

**En curso — R4B** (deadline 1ª sem julio): Scheduler (content-scheduler, especificado, desbloqueado) + endurecimiento del Watcher (pgvector embeddings, gates bloqueantes) + observabilidad. Detalle en `protocols/R4B_*`.

**Hitos recientes:**
- Lote A (18-jun): calidad de output (imagen CDN, title por marca, firma desde genoma).
- Genoma v1.0 Lucien (19-jun): destilado por muestreo, generativo/constructor.
- R4B Chat 2 (20-jun): DDL, content-run-stage v37, content-watcher v1.
- Arquitectura híbrida de la queue (20-jun): queue lleva brand_id+domain (puente); brand_topics fuente única de platforms/cadence/rollout.
- Vertex desbloqueado (22-jun).
- **Fase 3 transporte (25-jun): dispatcher v27 transporta domain, cron 29 reactivado, pieza de prueba a awaiting_approval verde.**

**Pendientes mayores:** Scheduler 5e-1, embeddings 5e-2/5e-3, publicación real Meta (5b), rejected_reason (5r), validación genoma v1.0 con IID real, destino de los 14 UNRLVL-* sin correr y los IID-* legacy de voz Lucien. **Sembrador IID CONSTRUIDO (fan-out v22 + iid-inbound + iid_seeds, 25-jun b) — falta front (T4).**

---

## §8 — HISTORIA Y DECISIONES (cronología de aprendizajes)

- **Abril 2026** — Nace UNRLVL-IID como #7 del roadmap (post Cost Layer, depende de schema intel.*). Sam articula el doble uso (investigación = posicionamiento). Visión de red de agentes especializados.
- **15-jun** — Replanteamiento. Diagnóstico de 3 bugs: brand_id=null en todos los jobs, voice="lucien" sin resolver a genoma, el builder IID nunca leía brand_voice_genome. Se descubre el encaje a la fuerza de Lucien. Se crea `intel.brand_topics` (la marca declara, no el agente). Se crean los 14 UNRLVL-* en 3 tiers. Causa raíz adicional: `claude-sonnet-4-20250514` (retirado 15-jun) hardcodeado en 24 EFs.
- **16-17 jun** — Builder convergido + Watcher LIVE. buildFromGenome (cirugía in-place). Watcher como stage 5, 6 gates, similitud semántica vía Claude (no pgvector aún). Primeras piezas UNRLVL+Lucien a awaiting_approval. Se corrige: imagelab hardcodeado a fal.ai (debía usar lab_configs→Vertex); email mudo por RESEND_API_KEY de NSCF (correcto: RESEND_UNRLVL_KEY); evidence gate usaba has_numbers boolean (caricatura del contrato de marca). Sam aclara: "matemático" para UNRLVL = profundidad de comprensión de la maquinaria, no dígitos literales.
- **18-jun** — Lote A. 5 bugs de calidad de output. content-run-stage v34→v35, approve-piece v13→v14. Firmas de cierre desde genoma.
- **19-jun** — Genoma v1.0 de Lucien por muestreo (8/10). core_move de reactivo/léxico → generativo/constructor. Principio madre: el angle es territorio, no mirada; codificar el core_move como receta literal colapsa la voz en fórmula. Cadencia poblada (Interpretación A).
- **20-jun** — R4B Chat 2 (DDL, v36, v37, content-watcher v1) + arquitectura híbrida de la queue (Chat 1). Hallazgo: la queue tenía 3 generaciones conviviendo; el supuesto del spec R4B era falso.
- **22-jun** — Vertex desbloqueado (creds a Supabase). Nombre canónico fijado: **Intelligence Insights Developers**. Fundado este repo de contexto.

### Principios destilados (resumen; el detalle vive en professor_learnings)
- La marca declara qué consume y con qué voz; el agente investiga neutro. El default_voice del agente NO decide voz.
- El angle = territorio (qué/dónde); el genoma = ejecución (cómo). Un angle que repite el core_move mata el rango.
- El core_move es disposición, no procedimiento. Receta literal = fórmula muerta.
- Verificar estado vivo antes de construir sobre un supuesto del spec.
- No asumir proveedor: heredar del stack (Vertex, no OpenAI).
- Un slug técnico no es concepto visual.
- error_log=[] puede ser corte humano de otra EF, no bug.
- Ante bloqueo de gobernanza, pivotar el método, no pedir excepción.

---

## §9 — SESSION LOG (novedad al tope)

### 2026-06-25 (sesión b) — IID Sembrador CONSTRUIDO (T1–T3): fan-out multimarca v22 + cerebro iid-inbound + iid_seeds · Sam + Claude (Chat 1) + CC (ejecución)

**Qué pasó:** se ejecutó el sprint Sembrador en orden estricto (cada tarea verifica verde antes de la siguiente). T1-T3 cerradas y aceptadas; T4 (front) queda como próximo. El "pecado original" (default_voice→marca) quedó MUERTO en el origen del encolado.

**T1 — Limpieza test F3 (VERDE, ya estaba):** los 5 artefactos de la sesión a (pieza 10cda1d1, job f0e06d12, queue 4bd4843f, finding 795799ea, scheduled_posts) ya habían sido borrados por CC. Verificado en DB: content_pieces/orchestrator_jobs/iid_content_queue/iid_findings/scheduled_posts todas en 0; dispatchable_now=0; cron 29 active=true. Sin FK que romper.

**T2 — Fan-out multimarca en iid-core (v21→v22):** se mató el pecado original en el origen del encolado.
- **Diagnóstico (código vivo):** iid-core v21 hacía fan-out por VOZ hardcodeada (`primaryVoice=agent.default_voice`; `secondaryVoice` = el otro de unrlvl|lucien) e insertaba en queue SIN brand_id/domain. `brand_topics` aparecía 0 veces en el bundle.
- **Bloqueador duro hallado:** `iid_content_queue_voice_check` solo admitía `'unrlvl'|'lucien'` (residuo del modelo viejo). El fan-out por voice_id real lo reventaba.
- **Decisiones (Sam):** 1A (migrar `voice` a voice_id real, recrear CHECK) / 2A (verificar con finding sintético, sin crear agentes) / 3A (fan-out como módulo compartido, reusable por iid-inbound).
- **Ejecución (CC, direct-on-prod staged+reversible — el patrón Rama+PR+Preview NO aplica a EFs del IID por deuda sin-repo §sesión-a):**
  - Migración `iid_content_queue_voice_to_voiceid_eje_b`: DROP+ADD del CHECK de `voice` → ahora `voice ∈ {lucien_social, lucien_editorial, unrlvl_default}`. Rollback exacto capturado antes del ALTER: `CHECK (voice = ANY(ARRAY['unrlvl','lucien']))`. Tabla vacía → validó al instante. Extender el CHECK al sumar marcas (nota embebida).
  - `fanout.ts` (módulo compartido): `resolveSubscribers(supabase, domain)` (lee brand_topics WHERE domain AND active) + `fanOut(opts)` (1 fila por marca×voz-de-destino-distinta) + `voiceFamily()` + `assignPsychoPreset()`. iid-core v22.
  - Extirpados los 3 usos de `default_voice` en la ruta de encolado. `domain = body.domain ?? agent.domain`. Generador (llamada Claude) intacto.
  - **Cambio de contrato deliberado:** la llave de autopublish pasó de `score>=85 AND urgency==='breaking'` (vieja) a **`score>=85 AND brand_topics.auto_approve`** (nueva, por marca). auto_approve=false en todas → nada autopublica.
- **Verificación (cron 29 apagado durante el test):** Test 1 `ai-cognition` → **3 filas exactas**: LucienSael×2 (lucien_social+lucien_editorial) + UnrealvilleStudio×1 (unrlvl_default), todas platforms=[], brand_id/domain NOT NULL, pending. Test 2 `llm` (0 suscriptores) → **0 filas** + log "no subscribers". Artefactos limpiados; cron 29 restaurado.

**T3 — Cerebro del sembrador (iid_seeds + iid-inbound v1):** captura de semillas humanas → destilado anti-IP → gate temprano de Sam → handoff a iid-core.
- **Decisiones (Sam):** 1A (destilado por LLM en iid-inbound + persistencia) / 2A (gate temprano: destila, persiste awaiting_approval, SE DETIENE; no dispara research/fan-out hasta aprobación) / 3A-diferido (carril pedagógico solo como campo `lane`, sin lógica) / 4B (iid-inbound NO reimplementa fan-out — handoff HTTP a iid-core, una sola fuente).
- **Parte 0 — agente sentinela `IID-SEEDER` `ce44ac81-1ab6-4fd2-994e-71abae337228`** (is_active=false; satisface el FK agent_id sin correr research). DESVIACIÓN forzada: los CHECK de `iid_agents` rechazan tier='seed'/run_frequency='manual' (enums cerrados: tier core/tier1-3, run_frequency daily/weekly/biweekly/monthly) → se usó tier3/monthly nominales + nota; NO se alteró el CHECK de una tabla core con 28 agentes vivos por una etiqueta. El guard real es is_active=false.
- **Parte 1 — DDL `intel.iid_seeds`** (migración `iid_seeds_t3_sembrador_cerebro`): rastro completo (source_url, handle, raw_signal, captured_by, neutral_topic, mapped_brand_id, mapped_domain, distill_notes) + `lane` (standard|pedagogical, default standard) + `status` (captured→distilled→awaiting_approval→approved/rejected/dispatched/failed) + rejected_reason + finding_id + dispatched_at. GRANT ALL service_role + índices (status, captured_by). Rollback: `DROP TABLE intel.iid_seeds;`.
- **Parte 2 — EF `iid-inbound` v1** (verify_jwt=false): router capture/approve/reject/list. `capture` destila vía Claude con anti-IP DURO (la semilla es disparador, NUNCA reescribir/parafrasear/citar el original; extraer TEMA NEUTRO) + mapea a brand_topics + persiste awaiting_approval y SE DETIENE. `approve` (gate de Sam, puede corregir mapeo) → handoff HTTP a iid-core con el contrato duro (agent_id=sentinela, domain=mapped override, scores 2A) → fan-out v22. `reject` → rejected+reason. `list` para el front.
- **Verificación (4 aserciones, cron 29 apagado):** (1) capture seed ai-cognition → awaiting_approval, mapped_domain=ai-cognition, **neutral_topic ≠ raw_signal** (anti-IP funciona). (2) approve → finding + 3 filas (Lucien×2 + UNRLVL×1) + seed dispatched + trace bidireccional (finding.raw_data.seed_id ↔ seed). (3) negativo (override domain='llm', 0 subs) → failed, 0 findings/filas. (4) reject → rejected+reason. Artefactos limpiados; cron 29 restaurado; IID-SEEDER + tabla iid_seeds persisten.

**Estado neto:** el Sembrador está LIVE end-to-end (semilla humana → destilado anti-IP → gate temprano → handoff → fan-out multimarca v22). DOS gates en serie intactos: (1) tema/mapeo en iid-inbound, (2) approve-piece sobre piezas generadas. Multimarca probado por construcción: sumar NSCF/FPHs = insertar fila en brand_topics + 1 línea en el CHECK de voice. Sin tráfico real (no hay front aún ni publicación real — bloqueada por ANTISPAM_CONTRACT §6 hasta R4B).

**Inventario de objetos nuevos/cambiados (todos deploy directo Supabase, sin repo — deuda sin-repo persiste):**
- iid-core **v22** (+ módulo fanout.ts) · iid-inbound **v1** (nueva) · tabla **intel.iid_seeds** · agente **IID-SEEDER** · migración del CHECK de iid_content_queue.voice (voice_id real).
- Agentes ahora: **29 total = 28 de research (28 activos) + 1 sentinela (IID-SEEDER, inactivo)**.

**Riesgo aceptado (4B):** acople por contrato iid-inbound→iid-core. El contrato del body de iid-core quedó fijado como interfaz dura; si iid-core cambia su body, revisar iid-inbound (constantes hardcodeadas con comentario).

**Pendiente del sprint:** T4 — front/subpestaña "IID Seeds" en Orchestrator + control de acceso rol SEEDER (para Marisol) + cargar `IID_INBOUND_SECRET` al exponer el front. Carril paralelo (no bloquea): voz hermana pedagógica UNRLVL+Lucien (~27-jun; campo `lane` ya preparado; `iid_content_queue.psycho_preset` sin CHECK → basta para el preset pedagógico sin tabla nueva).

**Professor:** 5 learnings de esta sesión esperan aprobación de Sam — 2 de T2 (CC: b85ac073 patrón EF-change direct-on-prod; d588ce0c contrato autopublish) + 3 de T3 (Claude: 983ac335 Sembrador inbound→core; 4a47ff92 CHECK enums iid_agents; d5748e60 acople-por-contrato 4B).

**Hallazgo lateral confirmado (radar):** pgvector sigue instalado pero SIN materializar (cero columnas vector en toda la DB; los gates de texto del Watcher usan Claude-semántico). El Gate 8 visual del eje B será GREENFIELD de embeddings, no "un índice al lado del de texto". Coherente con deuda #11.

### 2026-06-25 — IID Sembrador (diseño) + Fase 3 transporte (REPARADO) + dominio algorithm-mechanics · Sam + Claude (Chat 1) + CC (informe read-only + ejecución)

**Origen de la sesión:** Sam preguntó por la viabilidad de un "sembrador de temas IID" — capturar posts de cuentas que sigue en Instagram (mayormente Reels/video) para que UNRLVL o Lucien generen contenido PROPIO sobre esos temas (no repost, no paráfrasis: el IID toma el tema, investiga por su cuenta, genera con voz de marca). Derivó en el descubrimiento y reparación de roturas del pipeline. **El sembrador NO se construyó — queda con el camino despejado.**

**Decisiones de diseño del sembrador (validadas, no construidas):**
- **No se necesita Composio ni ningún conector.** La Graph API de Meta no expone el feed de cuentas ajenas que uno sigue; ninguna herramienta lo resuelve (Composio usa la misma API). Scraping descartado (protege el Business Portfolio, activo del ANTISPAM_CONTRACT). **El humano es el sensor:** aporta link + su frase de qué trata; la máquina no lee IG.
- **Transcripción de video ajeno:** IG solo deja bajar ~15s; la API no da captions de cuentas ajenas. Pero para el objetivo no hace falta transcribir — el humano ya comprime el tema en una frase. Si se quiere rigor, el skill `voice-reference-extractor` (Whisper+OCR) procesa muestras cortas en local. (En esta sesión se procesó un Reel de prueba de 2:25 vía OCR de frames — pipeline de transcripción Whisper bloqueado por allowlist de red del sandbox; HuggingFace se habilitó a nivel cuenta pero el entorno ya estaba arrancado.)
- **Arquitectura del cerebro:** la semilla entra como `iid_findings` de **origen humano** (no directo a queue: `iid_content_queue.finding_id` es NOT NULL → cadena finding→queue obligatoria). Una semilla puede **bifurcar en N piezas** (una por marca suscrita al dominio). Tema y técnica de divulgación viajan en **carriles separados**.
- **Front:** se decidió **skill conversacional con escritura a Supabase** sobre UI con dropdowns (un delegado no-experto no sabe elegir domain/voice; el skill traduce lenguaje humano → mapeo por detrás). Para delegar (Marisol), el destino final es una **subpestaña "IID Seeds" en IID Intel del Orchestrator** (reusa el input de lenguaje natural ya existente, Image confirmada) + control de acceso por rol (rol SEEDER = solo IID Seeds). El "cerebro" corre como EF `iid-inbound`, no en chat. Pregunta al usuario SOLO lo que un humano que vio el post puede dar (link + su frase + marca en humano); el mapeo a domain/voz/brand_topics lo hace el skill. **Siempre termina en cola para aprobación de Sam, nunca publish directo.**
- **Captura de "registro/técnica de divulgación":** Sam quiere capturar también CÓMO un creador explica (ciencia psicológica "fresca, natural, aporta comprensión" — NO el filo comprimido habitual de Lucien). Es una **voz hermana** derivable del temperamento existente cambiando solo la respiración (no un Custom Job). Regla dura: capturar la TÉCNICA de divulgación (analogía antes que término, frase que aterriza, cero jerga sin traducir), **nunca clonar la voz del creador**. Agendado ~27-jun.

**Post de prueba procesado:** Reel @fryrsquared sobre murmuraciones de pájaros → modelo Boids (Reynolds 1986) → 3 reglas locales sin líder → aplica a robótica/multitudes/protestas/epidemias/rumores. Tema neutro destilado: **emergencia / comportamiento colectivo / orden sin control central a partir de reglas locales.** Bifurcación validada por Sam: UNRLVL (infraestructura: algoritmos de comportamiento colectivo para anticipar consumidor y gobernar ecosistemas de agentes) + Lucien (condición humana: coordinación sin autoridad, manada/contagio/turba).

**WRITE a producción — dominio nuevo:** INSERT en `intel.brand_topics` del dominio **`algorithm-mechanics`** para `UnrealvilleStudio` (id `287e4716-6a61-40a5-b0a7-c3e62ec20027`): phase 2, active, purpose [publish,internal], platforms [linkedin,meta_fb,meta_ig], voice unrlvl_default, hard_rules null. Resuelve drift histórico (el agente UNRLVL-ALGORITHM-MECHANICS existía sin dominio declarado en brand_topics). Angle clave: lectura técnico-estructural de comportamiento colectivo/emergencia; **la jerarquía la impone el diseño (corrección de Sam: NO es "sin jerarquía" — los agentes ejecutan su rol sin control central en ejecución, sin el "¿por qué?" humano que es territorio Lucien)**; barrera anti-colisión explícita con Lucien/human-essence. Phase 2 elegido sobre phase 1 para respetar el crescendo anti-spam (no abrir 7º territorio simultáneo en la primera ola).

**HALLAZGO MAYOR (CC informe read-only) — el pipeline tenía 3 roturas que mataban TODA pieza por el camino automático, no solo la semilla:**
- **Rotura 0:** cron jobid 29 (content-dispatcher) `active=false` desde la tabla rasa — nada disparaba el dispatcher.
- **Rotura 1:** iid-core (código de ABRIL, v1.1, anterior a brand_topics) NO escribe `brand_id`/`domain`/`iid_source_tag` en la queue, aunque las columnas existen (añadidas 20-jun).
- **Rotura 3 (la letal):** content-run-stage lee `domain` SOLO de `job.assets.builder_input.domain`, que el dispatcher dejaba en `{}` (no selecciona `queue.domain`, no escribe `builder_input`). → `loadBrandTopic(brandId, null)` → **throw "sin suscripción brand_topics"**. La generación moría en la primera etapa.

**Hallazgos secundarios confirmados (CC):**
- El scoring NO es gate de dispatch. El dispatcher solo filtra `orchestrator_status='pending'` + `aife_status='passed'` + `approval_status ∈ {pending,autopublished}`. Una fila con score NULL avanza igual.
- El estado "listo para aprobación de Sam" = **`content_pieces.status='awaiting_approval'`** (+ email vía approve-piece), NO `approval_status='pending'`.
- `iid_content_queue.voice` tiene CHECK que solo acepta `'unrlvl'`/`'lucien'` (voz base) — NO el genome id. El Builder deriva el genoma real de `brand_topics.voice_by_destination`. El Builder consume su material crudo de `aife_output.content.content`.
- get_edge_function del MCP devuelve el bundle ESZIP compilado, no fuente legible (deuda #1: EFs IID sin repo).
- El mapeo agente→marca es **uno-a-muchos** (iid_agents NO tiene brand_id; un dominio como ai-cognition pertenece a 2 marcas). Poblar brand_id en iid-core NO es transporte sino **fan-out** por brand_topics.domain (1 finding → N filas queue) — es diseño de ORIGEN, pertenece al sembrador. Mapear default_voice→brand reintroduce el pecado original (descartado).
- content-watcher: 6 gates (v5 = lógica v1). Gate 7/8 del eje B NO existen. Solo juzga el copy; imagen y scheduled_posts no pasan por él.

**FIX FASE 3 EJECUTADO (Opción C — transporte puro, fan-out de origen diferido):** CC paró correctamente en pre-flight al detectar que el "Fix 1" original (poblar brand_id en iid-core) era ORIGEN, no transporte, y contradecía el scope. Se difirió al sembrador. Fixes aplicados:
- **content-dispatcher v26→v27** (deploy directo): select de queue +`domain`; INSERT orchestrator_jobs `assets: {builder_input:{domain: queue.domain}}` (antes `{}`). brand_id ya se copiaba. Scoring/voz/.limit(1)/verify_jwt sin tocar.
- **content-run-stage v41:** SIN cambio (ya lee `job.assets.builder_input.domain`; el fix 2 lo alimenta). No se redeployó la función crítica por cero ganancia.
- **iid-core:** NO tocado (fan-out diferido).
- **cron jobid 29:** reactivado `active=false→true`. Research crons 3-28 NO tocados.

**TEST E2E (cron apagado) — VERDE:** fila de prueba (algorithm-mechanics/UnrealvilleStudio/unrlvl_default) → pieza `10cda1d1-1cbb-4c8a-855b-b1329fb97c4e` llegó a `content_pieces.status='awaiting_approval'`, Watcher PASS (6 gates), labs todos ok, `domain` transportado correctamente, voz UNRLVL correcta sobre mérito (copy real sobre position bias/propensity weighting). **Bug "sin suscripción brand_topics" RESUELTO.** Confirma además que abrir el dominio en brand_topics produce voz correcta, no solo encaje mecánico. (Email de aprobación real enviado a content-approval@ — pieza de prueba, a rechazar.)

**Limpieza:** artefactos de prueba (pieza 10cda1d1, job f0e06d12, queue 4bd4843f, finding 795799ea, scheduled_posts) pendientes de borrado por CC (instrucción dada; resolver FK circular como en la tabla rasa).

**Nota de gobernanza:** content-dispatcher v27 es deploy directo a Supabase — NO hay nada que pushear por GitHub Desktop para ese cambio (deuda #1: EFs IID sin repo). El único push de esta sesión es este session_log.

**Professor:** 6 learnings aprobados (ESZIP/sin-repo; las 3 roturas; mapeo agente→marca uno-a-muchos=fan-out; estado awaiting_approval + scoring no-gate; CHECK voice + aife_output.content.content; fix F3 validado).

**Próximo (orden estricto, cada uno verifica verde antes del siguiente):** (1) limpieza test F3; (2) SEMBRADOR — fan-out multimarca en iid-core (ex-Fix 1) + briefing CC; (3) CEREBRO del sembrador (destilado link+frase→tema→mapeo→anti-IP) + DDL `iid_seeds` + EF `iid-inbound`; (4) front IID Seeds + control de acceso por rol. Carril paralelo (no bloquea): voz hermana pedagógica UNRLVL+Lucien (~27-jun; material: Reel enjambres ya procesado; revisar si `iid_content_queue.psycho_preset` basta vs tabla nueva).

### 2026-06-24 (sesión b) — Diseño del eje B: matriz validada + 2 decisiones de arquitectura + factibilidad CC#5 · Sam + Claude (Chat 1) + CC (informe #5 read-only)

**Objetivo:** convertir la investigación del flujo (sesión a) en diseño accionable del eje B (mapeo marca↔tema con perfil de estímulo). Validación celda por celda de la matriz + decisión Ruta A/B + verificación de factibilidad contra código real.

**MATRIZ DE ESTÍMULOS VALIDADA (artefacto × objetivo) — celda por celda con Sam:**
- 3 artefactos (texto/imagen/video) × 3 objetivos (vender-ad/comunidad-orgánico/autoridad-IID) = 9 perfiles. WebLab FUERA (landings/webs/e-commerce/themes vía sync/UI, trabajo humano). VideoLab DENTRO (dormida hoy, misma lógica que ImageLab).
- 4 familias psycho: CONVERSIÓN (scarcity/urgency/fomo/aspiration), COMUNIDAD (belonging/identity), AUTORIDAD (authority/trust), PUENTE (curiosity/social-proof).
- Celda 1 (puente): CURIOSITY aplica a los 3 objetivos; SOCIAL-PROOF a comunidad+ventas, NO autoridad (abarataría el artículo). Modo: disponible/variable ANTIPATRÓN (no por defecto, no pickRandom — variación con memoria). SOCIAL-PROOF con candado: solo dato real verificable, nunca inventado.
- Celda 2 (comunidad en ads): SÍ disponible, IDENTITY especialmente (vende identidad, no producto).
- Celda 3 (autoridad en comunidad): SÍ disponible, TRUST encaja, AUTHORITY uso cuidadoso (no disparar forma dura: credencial/didáctico).
- Celda 4 (Watcher en imagen/video): gate visual COMPLETO dentro del eje B, CON similitud visual entre hermanas desde ya (Sam rechazó acotarlo).
- Principio: los objetivos NO son compartimentos estancos — familia base + préstamo de otras como vehículo.

**DECISIÓN — Ruta B confirmada:** portar el motor creativo (creative_vectors 44 + tension_architectures 10 + aggro_presets 5 + psycho_presets 10) al Builder interno buildFromGenome, con selección DETERMINÍSTICA por brand_topics (no el pickRandom del CopyLab externo). Ruta A descartada: CopyLab usa pickRandom uniforme (genera patrón), psycho solo en email, modelo retirado, perdería features del Builder. Ruta B elimina 1 de los 3 sistemas de generación.

**MODELO DE DOS CAPAS REFLEJADAS (confirmado por Sam):** Builder = capa prescriptiva (inyecta criterio antes de generar, pide pero no verifica). Watcher = capa validadora (juzga después, único con dientes, rechaza). Lo que el Builder prescribe, el Watcher valida → el eje B AÑADE 2 gates al Watcher:
- Gate 7 — coherencia objetivo↔estímulo (que pieza de autoridad no contenga lenguaje de conversión). Debe ser LLM (determinístico daría falsos positivos).
- Gate 8 — similitud VISUAL entre hermanas (extiende R1 del ANTISPAM_CONTRACT al plano visual; el contrato solo cubría texto).

**FACTIBILIDAD (CC informe #5, read-only contra código vivo):**
- Ruta B: ✅ factible, aditiva no estructural. buildFromGenome ya arma prompt por capas; añadir vector/tensión/aggro/psycho = 3 capas más. applyCreativeLogic de CopyLab (~40 líneas) portable; solo reemplazar pickRandom por selector con memoria. Features del Builder (título/firma/cifras/hard_rules) NO se rompen (verificado).
- 3 fixes de higiene: triviales (1 función / 1 línea / 1 línea).
- Gate 7: ✅ factible, LLM, ~30 líneas, mismo patrón que gate4.
- Gate 8: ⚠️ factible pero GREENFIELD — estrena toda la infra de embeddings (ver decisión embeddings). Modelo Vertex multimodalembedding@001, tabla+índice HNSW nuevos.
- Variación-con-memoria: ✅ sin tabla nueva — leer piezas recientes (loadRecentPieces 21d ya existe) + persistir creative_seed en builder_meta (campo jsonb existente).
- Orden del flujo: ⚠️ moderado — SocialLab encola scheduled_posts ANTES del Watcher; conviene correr gates bloqueantes pre-social o insertar como draft. Refactor de fireNextStage.

**2 DECISIONES DE ARQUITECTURA TOMADAS POR SAM:**
1. **objective_by_platform** (jsonb): el objetivo se declara en brand_topics por PLATAFORMA real (x, meta_ig, linkedin), NO por destino social/editorial (el objetivo es ortogonal al destino) NI reutilizando purpose (= publish/internal, doble-uso del IID). Una columna nueva, respeta "una fila por marca+dominio". El artefacto no se declara: imagen/video hereda el objetivo del output que acompaña.
2. **Migrar texto Y visual a embeddings** (no solo visual). Para antibaneo no desmejora — mejora consistencia/costo/velocidad. Cierra el R4B 5e-2/5e-3 pendiente. Opción híbrida disponible (embedding filtra, Claude juzga zona gris).

**WRINKLES resueltos (CC los detectó contra código):** (a) objetivo es ortogonal al destino → por plataforma; (b) brand_topics.purpose ya existe y significa otra cosa → campo propio; (c) creative_compatibility_rules keyeada por content_type, no por objetivo → añadir filas por objetivo (data, no esquema).

**SECUENCIA DE IMPLEMENTACIÓN (próxima sesión, CC ya no read-only):** (1) 3 fixes de higiene; (2) DDL objective_by_platform + poblar plataformas de Lucien/UNRLVL; (3) Ruta B + Gate 7 (comparten el dato objetivo); (4) Gate 8 + embeddings texto/visual + reordenamiento del flujo (frente caro/greenfield). Completar esta secuencia = reconexión Fase 3 = R4B (habilita primer publish real por ANTISPAM_CONTRACT §6).

**Estado spec:** IID_SPEC_EJE-B_estimulo-matriz-watcher.md entregada como read-only de factibilidad y verificada. Pendiente: regenerar como spec de IMPLEMENTACIÓN con las 2 decisiones incorporadas (próxima sesión).

### 2026-06-24 — Investigación profunda del flujo de calidad + matriz de estímulos (artefacto × objetivo) · Sam + Claude (Chat 1) + CC (4 informes read-only)

**Objetivo de la sesión:** antes de diseñar el eje B (mapeo marca↔tema), mapear a fondo cómo se evalúa la calidad del output en TODO el flujo del IID, no solo el scoring. Cuatro informes de CC (read-only estricto) + revisión de DB/graph por Claude.

**HALLAZGO MAYOR — el "calificador" que Sam recordaba son DOS cosas distintas que el sistema fundía:**
- El **content_score (el "85")** es una **autonota del LLM** (claude-sonnet-4-6) en el prompt STRUCTURE_SYSTEM de iid-process. Cada sub-criterio tiene una sola cláusula de una línea (`c1_novelty (0-25): how new or emerging`). NO hay rúbrica de adjudicación fina, NO hay validaciones determinísticas. iid-core solo SUMA los sub-scores (`?? 0`), sin clamping ni validación.
- El **calificador real con validaciones = content-watcher (6 gates)**. Es el único juez de calidad con dientes. Mixto: orquestación determinística (umbrales 0.80, ventanas 14d/21d, blocking flags) + juicio LLM por gate. Opera sobre el TEXTO generado, no sobre el número.

**Regla del autopublish (corregida vs memoria del equipo):** NO es solo `content_score>=85`. Es DOBLE: `content_score >= 85 && urgency === "breaking"`. La urgency es un enum que rellena el LLM SIN criterio definido (no hay clasificador de "breaking"). El 85+breaking solo salta el EMAIL a Sam; NO salta el Watcher. Toda pieza pasa los 6 gates igual. → El verdadero juez de "suficientemente bueno" es el Watcher, no el 85.

**HALLAZGO DE GOBERNANZA (primer orden):** NO existe fuente versionada de NINGUNA EF del IID en toda la org (29 repos escaneados, todas las ramas). supabase/functions/ solo existe para nscf-* y fphs-formalize. Las EF del IID (iid-core, iid-process, content-dispatcher, content-run-stage, content-watcher, aife-filter) viven SOLO en el deploy de Supabase. Tell: las versionadas conservan entrypoint .../source/supabase/functions/<slug>/index.ts; las del IID tienen .../source/index.ts plano (deploy directo vía MCP/CLI). Esto explica el drift de versiones. ES DEUDA: el corazón del IID no tiene fuente de verdad recuperable.

**El psycho/tension layer NO toca el texto IID hoy (doble bypass):**
- Hay DOS sistemas de generación: el Builder interno `buildFromGenome` (que usa el IID) y el CopyLab externo (unrlvl-copy-lab.vercel.app). El IID tiene CopyLab configurado en lab_configs pero lo SALTEA — genera in-process con buildFromGenome.
- Todo el aparato psico/tensión rico vive en el CopyLab externo: `psycho_presets` (10, multimodal: injection_copy/visual/video), `aggro_presets` (5 niveles WHISPER→FULL_AGGRO), `tension_architectures` (curvas T1-T10). El Builder interno NO lee ninguna.
- El `psycho_preset` (etiqueta de iid-core) solo viaja a ImageLab y SOLO modula imagen — y ahí está DOBLEMENTE roto: (1) mismatch de ID (iid-core emite `curiosity_gap`, la tabla tiene `PSY-CURIOSITY`); (2) mismatch de columna (ImageLab línea 238 lee `visual_injection`, la columna real es `injection_visual`). → ni siquiera la imagen recibe psycho.
- CopyLab externo está en modelo RETIRADO `claude-sonnet-4-20250514` (fallaría si se revive).

**AIFE — el graph MENTÍA:** aife-filter SOLO reescribe (borra huella de IA, estilístico). NO filtra off-brand, NO juzga, NO toca DB (no tiene createClient — verificado por imports). La nota del ecosystem_graph ("filtra off-brand content") es FALSA. El off-brand filtering real vive en: (a) genoma pre-generación (lexicon_forbidden, prohibited_registers como listas negras) y (b) Watcher post-generación (gates evidence + hard_rules).

**Huecos de antibaneo detectados:** imagen y adaptaciones sociales (SocialLab) NO pasan por ningún gate de calidad. El Watcher solo juzga el copy editorial (aife_filtered). Orden subóptimo: el Watcher (único validador) corre AL FINAL, después de generar imagen (ya en CDN-temp) y encolar scheduled_posts (quedan huérfanas en pending_oauth si REJECT).

**DESENREDO CENTRAL — la matriz de estímulos (artefacto × objetivo):** Sam identificó que el sistema mezcla DOS ejes independientes que nadie había separado: (1) ARTEFACTO (texto/imagen/video) × (2) OBJETIVO (vender-ad / comunidad-orgánico / autoridad-IID). Los estímulos de una imagen para un artículo ≠ los de un ad ≠ los de un orgánico de comunidad. Claude leyó las 10 filas de psycho_presets y las clasificó en FAMILIAS por objetivo:
- CONVERSIÓN (ads): PSY-SCARCITY, PSY-URGENCY, PSY-FOMO, PSY-ASPIRATION
- COMUNIDAD (orgánico): PSY-BELONGING, PSY-IDENTITY
- AUTORIDAD (IID/artículo): PSY-AUTHORITY, PSY-TRUST
- PUENTE (varios objetivos): PSY-CURIOSITY, PSY-SOCIAL-PROOF
→ La pregunta "¿aplica psycho al IID?" era equivocada. La correcta: "¿qué FAMILIA aplica a este objetivo?". El IID (autoridad) usa AUTHORITY/TRUST, NUNCA conversión.

**REGLA RECTORA PROPUESTA (para el modelo nuevo / eje B):** el perfil de estímulo NO lo decide el lab ni el stage — lo decide la combinación (artefacto × objetivo) declarada en brand_topics. Extender brand_topics para declarar también "objetivo por destino" (hoy solo declara voz por destino). Principio madre del IID extendido: "la marca declara qué consume, con qué voz Y QUÉ OBJETIVO de estímulo por destino".

**Alcance de labs (fijado):** WebLab queda FUERA de esta matriz — genera landings/webs/e-commerce/themes (WordPress/Shopify) vía sync (UI), trabajo humano. VideoLab SÍ entra como tercer artefacto (hoy dormida, pronto activa para posts/ads dual async/sync, misma lógica que ImageLab: estímulo según objetivo del output que acompaña).

**Estado de la matriz:** construida y validada conceptualmente por Sam (100% de acuerdo). Queda fijar las celdas "a veces/según" (psycho-puente, psycho-comunidad en ads) celda por celda en la sesión del eje B. La matriz NO se implementa aún — es el corazón del eje B, no un preámbulo. Implementarla bien = reconectar Fase 3.

**Decisión de arquitectura pendiente (eje B):** para llevar psycho/tensión al texto IID — Ruta A (re-rutear a CopyLab externo) vs Ruta B (portar el motor a buildFromGenome con selección DETERMINÍSTICA por brand_topics, no el pickRandom actual de CopyLab). Claude recomienda Ruta B (determinística encaja con marca↔tema/antibaneo). Tres arreglos de higiene previos: unificar IDs psycho (iid-core emita PSY-*), corregir ImageLab línea 238, sacar CopyLab del modelo retirado.

**Versiones EF verificadas vivas:** iid-core v21 · iid-process v19 · content-dispatcher v26 · content-run-stage v41.

**Método/roles confirmados:** CC ejecuta (caja de herramientas completa, lee fuente real, transcribe literal, read-only estricto); Claude diseña (la mente). Claude revisa primero lo barato (DB, graph) para afilar los briefings de CC.

**Próximo:** Professor + Actualiza (esta entrega) → sesión de diseño del eje B (validar matriz celda por celda + decidir Ruta A/B + releer ANTISPAM_CONTRACT) → instrucciones a CC sin ambigüedad → reconexión Fase 3.

**Deuda técnica / gobernanza registrada (para tracking):**
1. NO existe fuente versionada de las EF del IID (solo deploy Supabase) — deuda de primer orden.
2. ecosystem_graph.json desactualizado y con datos FALSOS: AIFE "filtra off-brand"=falso; versiones v22; estado "frozen"; 14 agentes (son 28). Regenerar tras Fase 3.
3. Bugs ImageLab psycho (server-path): mismatch ID (curiosity_gap vs PSY-CURIOSITY) + mismatch columna (línea 238: visual_injection → injection_visual).
4. content-dispatcher: `.limit(1)` de testing sigue en producción.
5. CopyLab externo en modelo retirado claude-sonnet-4-20250514.
6. Huecos antibaneo: imagen y adaptaciones sociales sin gate de calidad.
7. Orden subóptimo: Watcher (único validador) corre al final; scheduled_posts huérfanas si REJECT.
8. cron jobid 2 (iid-brief-biweekly) sigue active:true — se dispara 1 julio. Decidir destino antes.
9. urgency ("breaking") sin clasificador — gatillo de autopublish sin contrato. Definir en modelo nuevo.
10. Discrepancia en el conteo de agentes activos: claude.ai cuenta **28**, la lectura viva de CC dio **29**. El propio doc lo arrastra (§3 encabeza "29" pero el desglose suma 28: 1 CORE + 13 legacy + 14 UNRLVL-*). Irrelevante por ahora; reconciliar al regenerar ecosystem_graph tras Fase 3.
11. NO existen embeddings en el sistema (pgvector 0.8.0 instalado, cero columnas vector). Los gates de texto usan Claude-semantic. El R4B 5e-2/5e-3 nunca se materializó — se cierra con la migración a embeddings del eje B.
12. creative_compatibility_rules keyeada por content_type, no por objetivo — requiere filas nuevas por objetivo para Ruta B.
13. Asimetría a eliminar: texto Claude-semantic vs visual pgvector → resuelta por decisión de migrar ambos a embeddings.
14. Coordinación content-run-stage ↔ content-watcher para pasar imagen+hermanas visuales al Gate 8; ambas EF sin fuente versionada (deuda #1) → cada cambio es deploy directo sin PR.

### 2026-06-23 — Reparación definitiva del flujo: tabla rasa del modelo viejo · Sam + Claude (Chat 1)

**Qué pasó:** al intentar el primer run de validación del genoma v1.0 de Lucien se descubrió que el flujo IID estaba roto en su raíz — el modelo nuevo (brand_topics + genoma v1.0 + arquitectura híbrida) se construyó pero NUNCA se migró el disparo del viejo al nuevo. Los crons activos alimentaban la queue con findings legacy (brand_id=null, voice plano, domain de research). Ninguna fila era mapeable a brand_topics. Ningún run podía validar nada.

**Diagnóstico (causa raíz):** construir el modelo nuevo no basta; hay que MIGRAR el disparo y APAGAR el viejo. Los 14 agentes UNRLVL-* nuevos no tienen cron (last_run=null) — modelo nuevo construido pero desconectado del disparo. Los crons activos (3-28) seguían apuntando a los agentes legacy.

**Contrato de scoring mapeado (a conservar):** content_score>=85 en iid-process → fila nace autopublished → dispatcher salta aprobación. content-run-stage/SocialLab solo leen el score. SocialLab /api/execute adapta copy → scheduled_posts (pending_publish); /api/publish drena vía Meta MCP. El modelo nuevo tiene doble llave: score>=85 Y brand_topics.auto_approve (hoy false en todas = seguro). Regla rectora preservada: nada llega a publicar sin pasar el Watcher; el piloto operó en modo c2 (sin publicar real).

**Acción ejecutada (decisión de Sam: tabla rasa, no archivar):**
- Crons 2-29 DESACTIVADOS (reversibles): research/process legacy + dispatcher + brief-generator.
- Borrado total del contenido del modelo viejo: orchestrator_jobs 48→0, content_pieces 8→0, iid_content_queue 340→0, iid_findings 363→0, iid_research_raw 87→0, iid_briefs 1→0. (FK circular orchestrator_jobs↔content_pieces resuelta con UPDATE=NULL previo.)

**Estado neto:** IID limpio y detenido. Modelo nuevo intacto (brand_topics, genoma v1.0, 29 agentes, EFs, Vertex, pgvector). Drift detectado: dispatcher v26 (no v22), content-run-stage v41 (no v37).

**Próximo:** Fase 3 — reconexión del flujo al modelo nuevo (handoff completo en IID/FASE_3_HANDOFF.md). Construir disparo de los 14 agentes nuevos + research que pobla brand_id+domain desde origen + re-incorporar scoring + reactivar dispatcher + primer run de validación del genoma v1.0.

**Professor:** 5 learnings aprobados (causa raíz migración disparo; contrato scoring; regla Watcher/modo c2; FK circular borrado; drift versiones+ESZIP).

### 2026-06-22 — Fundación del repo IID + Vertex desbloqueado · Sam + Claude (Chat 1)
- Nombre canónico fijado: **IID = Intelligence Insights Developers**. Documentada la deriva de siglas (variantes previas = reinterpretación, no canónicas). UNRLVL-IID = los IID de UNRLVL.
- Fundado este documento de contexto (de 0 a 100) leyendo el cableado vivo: 29 agentes en intel.iid_agents, crons 2-28 (research/process por agente) + 29 (dispatcher), schema intel.*+content.*, lab_configs (4 labs), iid_scheduler_config (orchestrator-unrlvl.vercel.app + bypass secret), EFs del pipeline con versiones.
- Vertex desbloqueado: Sam cargó GOOGLE_SERVICE_ACCOUNT_KEY + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION en Supabase Secrets → 5e-2/5e-3 listos para Chat 2.
- Confirmado el propósito multimarca y el estado de pruebas (UNRLVL + Lucien como conejillos de indias hasta cerrar R4B).

### 2026-06-19/20 — #5i genoma v1.0 + R4B (3 frentes paralelos) · Sam + Claude (Chat 1 + Chat 2 + CC)
- **#5i:** Genoma v1.0 de Lucien destilado por muestreo (8/10 marcadas Lucien). core_move reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (editorial + social). 3 angles corregidos (ai-cognition podado; ai-identity + human-essence poblados). Diagnóstico de codificación por CC (read-only): core_move duplicado angle+genoma inyectado como regla dura.
- **R4B Chat 2:** DDL 5e-5 (domain columnas + pgvector v0.8.0 + índice + GRANT). content-run-stage v35→v36 (5o/5p-a/5q + domain-write) → v37 (5e-4 callWatcher fail-closed + domain-write queue). content-watcher v1 (6 gates, verificado aislado). Decisiones D-A/B/C congeladas.
- **Arquitectura híbrida queue (Chat 1):** queue lleva brand_id+domain (puente); brand_topics fuente única de platforms/cadence/rollout. DDL domain en iid_content_queue. Scheduler especificado, write ya en v37.
- **Bloqueo (resuelto 22-jun):** 5e-2 esperaba creds Vertex.
- **Professor:** 6 learnings #5i + 15 del 20-jun, todos aprobados.
- Versiones EF al cierre: content-dispatcher v22 · content-run-stage v37 · content-watcher v1 · approve-piece v14 · lab-worker v23.

---
_(Documento fundado 2026-06-22. Histórico anterior a esta fecha reconstruido de session logs y verificación de estado vivo en Supabase. Las novedades futuras van al tope de §9.)_