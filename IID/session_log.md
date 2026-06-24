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

Marcas activas hoy (fase 1): **LucienSael** (3 dominios: ai-cognition, ai-identity, human-essence) + **UnrealvilleStudio** (ai-cognition + 5 dominios Tier1).

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

**EFs del pipeline (versiones al 2026-06-22):**
- content-dispatcher **v22** — cron cada 30min, tiene el `.limit(1)` (NO tocar hasta publicación real). HOY ignora `scheduled_for`.
- content-run-stage **v37** — orquestador de producción (Builder + labs + callWatcher + domain-write a jobs/pieces/queue).
- content-watcher **v1** — los 6 gates extraídos a EF propia (5e-4).
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

## §7 — ESTADO ACTUAL (2026-06-22)

**Operativo:** la red de agentes legacy investiga en cadencia (crons activos, last_run reciente). El pipeline produce piezas end-to-end para UNRLVL y Lucien que llegan a `awaiting_approval` con email confirmado. Genoma v1.0 de Lucien en producción.

**En curso — R4B** (deadline 1ª sem julio): Scheduler (content-scheduler, especificado, desbloqueado) + endurecimiento del Watcher (pgvector embeddings, gates bloqueantes) + observabilidad. Detalle en `protocols/R4B_*`.

**Hitos recientes:**
- Lote A (18-jun): calidad de output (imagen CDN, title por marca, firma desde genoma).
- Genoma v1.0 Lucien (19-jun): destilado por muestreo, generativo/constructor.
- R4B Chat 2 (20-jun): DDL, content-run-stage v37, content-watcher v1.
- Arquitectura híbrida de la queue (20-jun): queue lleva brand_id+domain (puente); brand_topics fuente única de platforms/cadence/rollout.
- Vertex desbloqueado (22-jun).

**Pendientes mayores:** Scheduler 5e-1, embeddings 5e-2/5e-3, publicación real Meta (5b), rejected_reason (5r), validación genoma v1.0 con IID real, destino de los 14 UNRLVL-* sin correr y los IID-* legacy de voz Lucien.

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
