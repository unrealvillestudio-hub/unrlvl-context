# IID — Intelligence Insights Developers

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.

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
- **`objective_by_platform`** (jsonb, añadida 17-jul con el Eje B) — el OBJETIVO psicológico declarado por plataforma. Determina la FAMILIA de psycho-preset (CONVERSION / COMMUNITY / AUTHORITY / BRIDGE) y el `angle` desempata determinísticamente DENTRO de esa familia (Ruta B en `fanout.ts`): **coherencia primero, variedad después.** Default `AUTHORITY` cuando la marca no lo declaró — a propósito el más conservador: si no sabemos qué busca la marca, se establece criterio, no se empuja a comprar. Alimenta el gate7 (objetivo↔estímulo) del Watcher. **ESTADO 18-jul: NULL en las 16 filas existentes** → gate7 informativo hasta poblarlo en ≥1 marca. Los 13 psycho-presets viven en `public.psycho_presets` (NO en `intel`); el mapeo objetivo→familia vive en `TAG_TO_FAMILY` dentro de `fanout.ts` (repo `unrlvl-iid-functions`), no en la DB.

Marcas activas hoy (fase 1): **LucienSael** (3 dominios: ai-cognition, ai-identity, human-essence) + **UnrealvilleStudio** (ai-cognition + 5 dominios Tier1 + **algorithm-mechanics** en fase 2, abierto 25-jun).

### El filo — dos modelos, ambos correctos (M-12·A, 2026-07-31)

El `filo` (cuán cortante es la pieza) se declara en **dos sitios**, según sea constante de marca o variable de tema — y ambos modelos son correctos:

- **De VOZ** — cuando el filo es constante de la marca, vive en el genoma: `brand_voice_genome.emotional_register.the_edge`. LucienSael `9 of 10`, UnrealvilleStudio `5 of 10`, NeuroneSCF `5 de 10 instrumental`. [LEÍDO: `brand_voice_genome`, 2026-07-31]
- **De TEMA** — cuando varía por dominio, vive en `brand_topics.hard_rules.filo`. ForumPHs y NeuroneSCF van de `3/10` (educativa: agresión baja, no voltaje) a `7/10` (editorial: controversial sin amarillismo) según el dominio. [LEÍDO: `brand_topics.hard_rules`, 2026-07-31]

El resolvedor de params los cubre **por registro, no por código**: `intel.rule_param_sources` declara, como dato, las fuentes de cada `{{param}}` y su precedencia (topic 30 > genoma 10 → un tema puede sobreescribir el filo-constante de la voz). El valor viaja **crudo** al juez —nunca se parsea— porque el juez es multilingüe y lee igual `"9 of 10."` que `"7/10 controversial sin amarillismo"`; extraer el número reintroduciría la dependencia de idioma. Antes del registro, `injectRuleParams` sólo miraba `hard_rules` y descartaba `HR-GEN-04` para las marcas de filo-de-voz: **Lucien no era juzgado por su propio filo.** (`rule_param_sources` en `unrlvl-iid-functions`; M-12·A.)

### El canon de idiomas (M-12·B, 2026-07-31)

El idioma es **dato de marca, nunca dimensión del código.** Vive en `public.brand_languages` (por marca: `idioma_id`, `mercado`, `is_primary`, `active`) y —con M-12·B— se proyecta a `brand_topics.languages` (`text[]`, activos, primario primero), que el fan-out consume como **eje ortogonal**: una fila de queue por (plataforma × voz × idioma). Se publica en `meta_ig` en ES y en EN — misma plataforma, dos piezas.

- **Por defecto `es-NEUTRO` / `en-NEUTRO`** — neutro internacional sin regionalismos, generados por separado (no traducidos). UnrealvilleStudio, NeuroneSCF, VizosCosmetics, PatriciaOsorioVizosSalon.
- **Regional sólo cuando el mercado lo exige** — `es-PA` (ForumPHs · Panamá), `ES` (D7Herbal, VivoseMask · España), `EN-UK` + `VAL` (DiamondDetails · UK + Comunitat Valenciana).
- **La excepción — Patricia Osorio · Conectando** (el espacio de comunidad íntima): `es-FL` / `en-FL` / Spanglish, **no** el neutro. Razón, del **aprendizaje del Professor del 2026-07-06**: la comunidad es íntima y homogénea; el neutro traicionaría la intimidad. Es la única marca que rompe el default a propósito — por eso se documenta con su razón, para que no se "corrija" a neutro por error. (Brand IDs de la persona: `PatriciaOsorioConectando` / `PatriciaOsorioComunidad`; filas de excepción vivas en `brand_languages`.) [LEÍDO: `brand_languages`, 2026-07-31]

Añadir un idioma —o una marca en valenciano— es un `INSERT`, jamás un PR: por eso ningún idioma se enumera en código.

### Hashtags y firma — LucienSael (M-15, 2026-07-31)

LucienSael era **la única marca de 10 sin perfiles de copy y humanización.** M-15 los sembró en `public.brand_copy_profiles` (política de copy por plataforma: hashtags, firma/sign-off, longitud, tono de cierre) y `public.humanize_profiles` (parámetros de humanización), y M-16 (iid-functions) los cableó para que el **Builder los lea** — cierra el mismo patrón de la sesión: el dato existía sólo cuando el consumidor lo consulta.

- **La fuente de verdad es la tabla, no este documento:** los valores exactos (qué hashtags, con qué firma, por plataforma) viven en `brand_copy_profiles`/`humanize_profiles`. Cambiarlos es un `UPDATE`, jamás un PR — mismo canon que el idioma y el filo.
- **La disciplina de marca manda sobre la de plataforma:** coherente con el genoma de LucienSael (`the_unit_is_the_blow`, `length_discipline` ≤280 como ancla de IDENTIDAD, no de plataforma), la política de hashtags y firma es **austera** — la firma no sobreseñaliza y los hashtags no diluyen el golpe. La marca decide cuánto sostiene; la plataforma no le impone su convención.
- **Por qué se documenta aquí:** para que la ausencia de un hashtag ruidoso o de una firma florida no se "corrija" por error a la convención genérica de la plataforma — es política deliberada, igual que la excepción de Conectando en el canon de idiomas.

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
7. content-run-stage (deploy build _50 al 17-jul; era v37 al fundarse este doc) — EL ORQUESTADOR DE PRODUCCIÓN:
     ├─ Builder el generador local (stage 1): lee brand_topics + brand_voice_genome,
     │     arma el prompt jerárquico, llama a CopyLab
     ├─ AIFE filter (aife-filter EF): control de calidad/seguridad de marca
     ├─ ImageLab: genera imagen (Vertex) → sube a Storage unrlvl-media (CDN)
     ├─ SocialLab: arma el post por plataforma
     └─ callWatcher → content-watcher (v2, deploy build _14): 8 gates (similarity,
           sibling-window, cadence, evidence, duplication, hard-rules + gate7
           objective_stimulus + gate8 visual_sibling) → PASS / REJECT / RESCHEDULE
                     ▼
8. content_pieces (status awaiting_approval) + email a content-approval@unrealvillestudio.com
                     ▼
9. ORCHESTRATOR (orchestrator-unrlvl.vercel.app) — front de aprobación humana (Sam)
                     ▼
10. approve-piece (v14): al aprobar → publica (Meta) + move-to-permanent (imagen temp→permanente)
                          al rechazar → status failed (HOY sin rejected_reason → AGENDA 5r)
```

### Los tres PromptBuilders (historia importante)
En el diagnóstico de junio se descubrieron **tres PromptBuilders distintos** conviviendo: el de CopyLab (front), el de CopyLab (`api/execute.ts`), y el del propio IID (versión degradada que NO leía el genoma). La corrección fue `generadorLocal` dentro de content-run-stage, con jerarquía de prompt canónica de 6 capas: instrucción arriba → hard rules → brand voice (genoma) → brand+audience context → creative direction → guidance/reference. Se evaluó y RECHAZÓ la idea de una "capa LLM rewriter" a favor de `formatForEngine()` determinístico por motor + jerarquía estructural.

> **Nota 2026-07-31 (ver §9 y `ecosystem.json`):** `generadorLocal` resolvió la fragmentación del prompt, pero al hacerlo **reconstruyó el motor de CopyLab localmente** en `content-run-stage` en vez de llamar a CopyLab por su `api_endpoint` (`lab_configs` lo declara y nadie lo invoca; igual con sociallab / `runSocialLabDirect`). Tiene gobierno pero ningún ángulo creativo. Es un **⚠️ DESVÍO a corregir, NO arquitectura** — converge con el Proyecto UNIFICACIÓN (BLOQUEANTE R4B). Regla de nomenclatura inviolable: ningún carril construye el motor de un lab existente; lo llama por su endpoint. Ver `ecosystem.json → labs._note` / `labs_wiring`.

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
- content-run-stage **v37 (runtime; deploy build _50)** — orquestador de producción (Builder + labs + callWatcher + domain-write a jobs/pieces/queue). Lee `domain` de `job.assets.builder_input.domain`. **17-jul: +pending_publish, +image_url, catch del INSERT propagado, ctx de gate7/gate8.**
- content-watcher **v2 (deploy build _14)** — los gates extraídos a EF propia (5e-4). **8 gates: los 6 originales (similarity, sibling-window, cadence, evidence, duplication, hard-rules) + gate7 objective_stimulus + gate8 visual_sibling, ambos blocking — implementados y deployados 17-jul.**
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

## §7 — ESTADO ACTUAL

> **⚠️ ACTUALIZACIÓN 2026-07-18.** El bloque de abajo es la foto del **25-jun** y se conserva como referencia histórica, pero está superado. Estado real al 18-jul:
>
> - **Fase 1 del Sembrador COMPLETA** (T1-T4 + #48). **Fase 2 (calibración) en producción:** E5b backend + front, E5c (convergencia extensible, el operador cierra), E7 (GenomePromptBuilder — el generador lee el contexto REAL de la marca desde Supabase, mata la alucinación de ingredientes).
> - **Eje B VIVO en prod (17-jul):** `objective_by_platform` en `brand_topics`, `content-watcher` v2 con **8 gates** (se sumaron gate7 objective↔stimulus y gate8 visual-sibling, ambos bloqueantes), Ruta B en `fanout.ts` (el preset se deriva del objetivo declarado, no de un hash sesgado → los 13 presets se usan, antes 5 estaban muertos). PENDIENTE: `objective_by_platform` nace NULL — sigue NULL en las 16 filas, así que gate7 es informativo hasta poblarlo en ≥1 marca.
> - **Modelo canónico: `claude-sonnet-5`** en todo el pipeline (era `claude-sonnet-4-6`).
> - **Genomas activos: 8** (no 2, como se creía hasta el 10-jul). Destilados nuevos: `nscf_conversion` v0.5, `d7herbal_conversion` v1.0. Convergida sin destilar: VivoseMask (15 turnos). **7 sesiones de calibración activas** esperando a Marisol.
> - **Familia VOICE de skills (13-18 jul):** `genome-calibration` (método del bucle) + `r4b-genome-calibration` v1.1 (orquestador de-cero-a-R4B) + `voice-craft` (oficio) + `comm-arsenal` (repertorio de técnicas) + `voice-conversion` (perfil). Regla dura: voice-craft y comm-arsenal se cargan JUNTOS.
> - **Sprint CRAFT-01 EN CURSO (18-jul):** lleva ese arsenal al runtime del bucle. 3 columnas nuevas en `calibration_sessions` aplicadas en prod; PR #13 abierto y BLOQUEADO por módulos vacíos.
> - **Cron `content-dispatcher-poll` REPARADO (17-jul)** — llevaba 3859 fallos consecutivos por el overload de `trigger_iid_agent`.
> - **Bloqueo operativo persistente:** rotar contraseña de Marisol + ampliar su `brand_scope`. Ambas cosas viven en el secret `USERS_RAW` de la EF `iid-inbound`, **no en la DB**. Sin eso Marisol no corre los 7 bucles pendientes.
>
> Detalle de cada punto en las entradas de §9.

### Foto del 2026-06-25 (histórica)

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
- **16-17 jun** — Builder convergido + Watcher LIVE. el generador local (cirugía in-place). Watcher como stage 5, 6 gates, similitud semántica vía Claude (no pgvector aún). Primeras piezas UNRLVL+Lucien a awaiting_approval. Se corrige: imagelab hardcodeado a fal.ai (debía usar lab_configs→Vertex); email mudo por RESEND_API_KEY de NSCF (correcto: RESEND_UNRLVL_KEY); evidence gate usaba has_numbers boolean (caricatura del contrato de marca). Sam aclara: "matemático" para UNRLVL = profundidad de comprensión de la maquinaria, no dígitos literales.
- **18-jun** — Lote A. 5 bugs de calidad de output. content-run-stage v34→v35, approve-piece v13→v14. Firmas de cierre desde genoma.
- **19-jun** — Genoma v1.0 de Lucien por muestreo (8/10). core_move de reactivo/léxico → generativo/constructor. Principio madre: el angle es territorio, no mirada; codificar el core_move como receta literal colapsa la voz en fórmula. Cadencia poblada (Interpretación A).
- **20-jun** — R4B Chat 2 (DDL, v36, v37, content-watcher v1) + arquitectura híbrida de la queue (Chat 1). Hallazgo: la queue tenía 3 generaciones conviviendo; el supuesto del spec R4B era falso.
- **22-jun** — Vertex desbloqueado (creds a Supabase). Nombre canónico fijado: **Intelligence Insights Developers**. Fundado este repo de contexto.
- **15-17 jul** — Tanda técnica IID (5 frentes). B.1 overload de `trigger_iid_agent` cerrado (3859 fallos→succeeded; DROP+recreate porque Postgres no quita DEFAULT con CREATE OR REPLACE). B.4 causa raíz de publicación: SocialLab escribía `pending_oauth` (nadie lo drenaba) en vez de `pending_publish`; catch del INSERT mudo (ledger success con 0 filas). Eje B VIVO en prod: migración `objective_by_platform`, gate7 (objective_stimulus) + gate8 (visual_sibling) blocking, Ruta B (preset derivado del objetivo, no hash sesgado). Migración de las 3 EFs de modelo a claude-sonnet-5 (sin temperature, thinking:disabled, max_tokens +30%). Firma Web→Node-native en 4 labs (approve-job/trigger-job estaban muertos; trigger-job nunca vivió en prod). **HALLAZGO: mergear a main NO deploya las EFs de Supabase — es paso manual aparte; versión real = entrypoint_path, no el contador.** 6 EFs deployadas y verificadas en prod. Frente de seguridad 🟠 (schema intel expuesto pero latente: auth.users vacía) diferido a ventana propia. Professor: 18 learnings.

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

## 2026-08-26 — Carril IID: PUB-01, P3 y RESEARCH-01 cerrados; tres marcas sembradas

En una línea: **los tres bloqueantes rojos del 2026-08-25 quedan cerrados y verificados en
producción, el Scheduler pasa de una marca a cuatro, y dos marcas nuevas producen su primer material
real.** El costo de la sesión también se dice sin adorno: **dos divergencias entre producción y
`main` por despliegues fuera de orden**, la segunda silenciosa, que se llevó **tres corridas de
research completas**.

> Cifras verificadas contra producción el 2026-08-26/27 con la herramienta, no deducidas
> (HRD-R13). Professor se cerró **antes** de este Actualiza: **15 learnings** en
> `public.professor_learnings`, `session_date = 2026-08-26`, los quince con
> `approved_by_sam = true`. **Orden cumplido: Professor → Actualiza.** **SMA no se consultó** — Sam
> no lo mencionó. Sólo context files: el código, las DDL, los deploys y las corridas se ejecutaron
> **antes** de este Actualiza, en sus propios PRs y bajo HRD. CC no mergea — Sam revisa, mergea y
> borra la rama. Lo previo se conserva íntegro debajo.

### 🟢 Cerrado y verificado en producción

- **PUB-01 — `content-scheduler` v6.** El drenaje comprueba **el EFECTO contra la fila de
  `scheduled_posts`**, no el código HTTP. `publishAndVerify` con cuatro veredictos —
  `PUBLISH_UNVERIFIABLE`, `PUBLISH_UNPROVEN`, `PUBLISH_FAILED`, `PUBLISH_NOOP` — y
  `recordPublicationProof` guardando `assets.publication`. **PR #98.** Es la aplicación literal de
  **HRD-R11**: un `200` no es una publicación.
- **P3 — `content-run-stage` v94.** El juez recibe **`social.adapted`**, no `aife_filtered`.
  `pickJudgedText`, `syncJudgedAdapted`, y `adapted_pre_judgment` guardado **como evidencia sin
  firmar**. **PR #99.** Cierra el rojo *«el juez aprueba un texto y sale otro»*.
- **RESEARCH-01 — `iid-research` v45 · `iid-process` v48.** Techo por **cascada** sobre
  `intel.iid_research_ceilings` (fila BASE, `max_tokens = 16000`, `agent_name` y `brand_id` nulos —
  default **declarado como dato**, no literal) y **`truncated` como columna GENERADA** desde
  `stop_reason`: `NOT (stop_reason IS DISTINCT FROM 'max_tokens')`. **PRs #100 y #101.**
- **BLOG-01 PR-1** — `forumphs-com` **#6**: `discarded_at` filtrado en las **tres** rutas, **410** en
  artículo descartado, paquete SEO completo.
- **BLOG-01 PR-2** — repo **nuevo** `unrlvl-blog` **#1**: renderizador extraído, `blog_path` **como
  dato** con router propio, tema y copia por canal.
- **BP-01/02/03** — `BluePrints` **#2 y #3**: blueprint de LucienSael creado (JSON + HTML + 2 SVG
  vectorizados); `BP_BRAND_UNRLVL` a **v1.5**.

### 📊 Los números medidos, contra los del brief

Verificado con `execute_sql` contra `amlvyycfepwhiindxgzw` el 2026-08-27. **Donde el brief y la
medición discrepan manda la medición** — es exactamente lo que HRD-R13 viene a impedir que se
repita:

| Objeto | Medido | Decía el brief |
|---|---|---|
| `intel.brand_rollout` sembradas hoy | **3** | 3 ✅ |
| `intel.brand_cadence` sembradas hoy | **39** (Lucien 15 · NSCF 12 · UNRLVL 12) | 33 ⚠️ |
| `intel.brand_publish_channels` sembrados hoy | **14** (Lucien 5 · NSCF 5 · UNRLVL 4) | 14 ✅ |
| `intel.brand_topic_platform_mode` sembradas hoy | **63** (UNRLVL 24 · Lucien 20 · NSCF 19) | 63 ✅ |
| `intel.content_angles` (catálogo nuevo) | **10**, todos `active` | 10 ✅ |
| Dominios con `angles` en las marcas nuevas | **19** (NSCF 9 · UNRLVL 6 · Lucien 4) | 19 ✅ |
| Dominios de ForumPHs que suman `objecion` | **11** | 11 ✅ |
| `iid-process` en producción | **49** | 48 ⚠️ |

Las dos discrepancias se anotan, no se corrigen a mano: **39 filas de cadencia** contra las 33
declaradas, y **`iid-process` v49** contra la v48 que dejó RESEARCH-01. La v49 es **posterior** al
brief; qué la desplegó **no consta en esta sesión** y queda abierto en `AGENDA.md`.

### 🌱 Lo sembrado — tres marcas entran al Scheduler

`rollout_started_at = 2026-08-26` para **UnrealvilleStudio**, **LucienSael** y **NeuroneSCF**;
ForumPHs sigue con el suyo del **2026-08-22**. Cuatro marcas en el carril donde ayer había una.

- **`intel.content_angles` es catálogo nuevo:** diez ángulos con `label` y `definition`, y con **el
  límite escrito en la propia definición** — `consecuencia` avisa que linda con urgencia y miedo y
  que una voz que prohíbe escasez **no debería declararlo**; `caso` y `dato` exigen fuente real;
  `expertise` exige credencial propia. El ángulo dejó de ser criterio del escritor: es **dato con
  contrato**.
- **`objecion` entra en los 11 dominios de conversión de ForumPHs** — los `-jd` y los `-doliente`,
  con la terna `expertise · artefacto · pregunta · consecuencia` ya sembrada el 25-ago. Es ángulo de
  venta: sirve a voces que mueven a una decisión, y por eso **no** entra en los editoriales.
- **`theme` y `fonts_href` como dato del canal**, en `brand_publish_channels.config`, para ForumPHs
  (*Amatista Carbon*), UnrealvilleStudio (*VOID SYSTEM*) y LucienSael (*EMBER SYSTEM*). El
  renderizador deja de cablear paleta: la lee.
- **`blog_label` y `blog_path` desacoplados a propósito** — UNRLVL rotula *Field Notes* y sirve en
  `/blog`; Lucien rotula *Writing* y sirve en `/blog`; ForumPHs rotula *Sin tecnicismos* y sirve en
  `/blog`. El rótulo es de marca, la ruta es URL indexada.
- **UNRLVL pasa de 14 agentes a 6.** Verificado: `intel.iid_agents` con `brand_id =
  'UnrealvilleStudio'` devuelve **6 filas, las 6 activas**.

### 🧹 Limpieza

8 agentes fantasma de UNRLVL · **170 + 3** filas de cola fallida · **268** `orchestrator_jobs` ·
**71** findings de un carril que ya no existe. `public.scheduled_posts` quedó **en cero filas**:
el residuo se fue entero.

### 🖊️ Corregido fuera del repo

Firma canónica de UNRLVL en el tema Shopify de NSCF — `snippets/unrlvl-signature.liquid`, checksum
final `51c2af2e…` — y dirección **12951 Biscayne Blvd, Suite 1 · North Miami, FL 33181** en
`sections/nc-footer.liquid`. **Nota:** la dirección ahora lleva `Suite 1`, que
`brands/UnrealvilleStudio/brand.json` **no** declara; queda anotado, no se toca el JSON sin Sam.

### 🆕 Primer material real de dos marcas nuevas

Los dos memos salieron **íntegros**, `stop_reason = 'end_turn'`, `truncated = false`,
`max_tokens = 16000` con `max_tokens_source = 'base'` — la cascada de RESEARCH-01 funcionando:

| Agente | Caracteres | `output_tokens` | Hora UTC |
|---|---|---|---|
| `LUCIEN-BEHAVIORAL-SCIENCE` | **25.162** | 7.587 | 23:33:35 |
| `UNRLVL-AI-COGNITION-TECH` | **24.897** | 7.365 | 23:33:33 |

Y **las dos primeras piezas de LucienSael de esta sesión** — `blog` y `meta_ig`, ambas
`pass_type = 'clean'` en `awaiting_approval`, creadas 2026-08-27 00:00:58 y 00:00:59 UTC.
**Precisión sobre el brief:** no son las dos primeras piezas de la historia de la marca — ya había
**dos** del 2026-07-31 (`x` y `tiktok`), también `clean` en `awaiting_approval`. Sí son **el primer
research de la historia de Lucien** y **el primer material producido bajo el carril completo**.

### 💸 El costo de la sesión, dicho sin adorno

**Dos divergencias entre producción y `main` por despliegues fuera de orden. La segunda fue
silenciosa** — la EF seguía devolviendo `200`, guardando el memo y marcando el truncamiento: todo
parecía correcto y **el arreglo no estaba puesto**. El rastro quedó en `intel.iid_research_raw` y es
inapelable:

| Hora UTC | Agente | `stop_reason` | `max_tokens` | `truncated` |
|---|---|---|---|---|
| 18:05:59 | `UNRLVL-SIGNAL-LEARNING-LOOPS` | `max_tokens` | `NULL` | ✅ |
| 19:01:10 | `UNRLVL-SIGNAL-LEARNING-LOOPS` | `max_tokens` | `5200` (`agent`) | ✅ |
| 19:03:06 | `UNRLVL-SIGNAL-LEARNING-LOOPS` | `end_turn` | `16000` (`base`) | ❌ |
| 23:06:56 | `UNRLVL-AI-COGNITION-TECH` | `max_tokens` | `NULL` | ✅ |
| 23:07:01 | `LUCIEN-BEHAVIORAL-SCIENCE` | `max_tokens` | `NULL` | ✅ |
| 23:33:33 / 23:33:35 | ambos | `end_turn` | `16000` (`base`) | ❌ |

**Tres corridas de research completas perdidas.** De aquí sale **HRD-R14**, y de las cuatro
afirmaciones sin verificar de la misma jornada sale **HRD-R13**.

### 🔻 Abre — con su evidencia medida

- 🔴 **P1 · `judged_source` llega NULL.** Medido: las **4** piezas vivas de LucienSael tienen
  `assets.watcher` presente y `assets.watcher.judged_source` **NULL** — incluidas las dos que
  corrieron sobre `content-run-stage` **v94**. **No se puede afirmar que el juez leyó el adaptado**,
  que es lo único que P3 vino a garantizar. **Bloquea toda generación nueva.**
- 🔴 **P2 · Las tres reglas con falso positivo medido.** Recontado sobre `intel.judge_calibration`,
  **9 arbitrajes**: `HR-FPHS-15` **3/3 = 100 %** · `HR-FPHS-13` **2/2 = 100 %** · `HR-LEGAL-01`
  **3/4 = 75 %**. **Es la condición para encender el cron 66.**
- 🟠 **P3 · `IID_FANOUT_EMPTY`** en un finding de LucienSael: *«1 suscriptor activo pero 0 encolado
  en `domain=behavioral-science`»*. El fail-loud funcionó; **falta la causa**. Reportado por el
  brief; no se localizó su fila en esta pasada — se anota como **pendiente de localizar**, no como
  medido.
- 🟠 **P4 · El fan-out encola para plataformas sin proveedor.** Medido en `intel.iid_content_queue`,
  lote `2026-08-26 23:57:26.167661+00`: **3 filas `failed`** (`tiktok`, `x`, `meta_fb`) y **1
  `complete`** (`meta_ig`). El fan-out **no mira si el canal está activo**.
- 🟠 **P5 · El adaptador no lee el genoma.** El conteo de hashtags por plataforma es **campo del
  genoma** y no regla del Watcher: el juez **no puede medirlo** aunque ahora lo vea.
- ⚠️ **`iid-process` v49 sin origen conocido** — la medición dice 49, el brief dice 48. Qué
  desplegó la v49 y cuándo **no consta**.

---

## 2026-08-22 — EL PRIMER PUBLISH DE LA HISTORIA DEL SISTEMA: el carril entrega, el día que el proveedor de texto se cayó

**12:44:41 UTC en Facebook. 12:45:06 UTC en Instagram.** Dos piezas de ForumPHs, con título
gobernado, imagen compuesta y sello de marca, en un canal público. Es la primera vez —desde que el
IID existe— que algo recorre el carril entero y **sale**. Todo lo anterior murió en la DB.

Y salió el día que el tanque de texto se secó a dos horas del estreno.

Lo que es de marca vive en `brands/ForumPHs/session_log.md` (2026-08-22); acá va el carril.

> **Base de las cifras.** Los ids de publicación están verificados contra Meta (`fb_get_posts` /
> `ig_get_media`) y contra `assets.publication` en `content.content_pieces`. Los PRs, contra el
> historial de los tres repos. Los cron, contra `cron.job`.

### 🧱 BRIEF 8 — el título entra al carril, en tres PRs sobre tres repos

Hasta hoy el título era un accesorio: se generaba si sobraba, nadie lo juzgaba y el compositor lo
pedía sin garantía de recibirlo. Brief 8 lo convierte en **parte gobernada de la pieza**, y para eso
había que tocar los tres eslabones a la vez.

| Corte | Repo · PR | Qué cambia |
|---|---|---|
| **A** | `CopyLab` **#35** — *«el título se escribe: obligatorio, con oficio y con presupuesto»* | El título deja de ser opcional. El escritor lo produce **con oficio** (es una pieza de redacción, no una etiqueta) y **con presupuesto de caracteres**, igual que el cuerpo. |
| **B/C** | `unrlvl-iid-functions` **#78** — *«el juez ve el título y el título tiene presupuesto»* (merge 08:02:45 UTC) | **El juez ve el título.** Antes juzgaba el cuerpo y el título pasaba sin que nada lo mirara — el mismo defecto de clase que G1: juzgar con parte del objeto oculta. |
| **D** | `ImageLab` **#12** — *«BRIEF 7 + BRIEF 8 · D: la franja de identidad»* (merge 08:02:36 UTC) | La **franja de identidad `edge_left`**, `full_bleed`, **por el lado corto**, en el `primary` de la marca. Identifica sin competir con la escena. |

**Por qué el título en la imagen y el título juzgado tienen que ser el mismo dato:** el compositor
estampa lo que el juez aprobó, o el sistema publica dos mensajes distintos —uno auditado y otro no—
sobre la misma pieza.

Dos protecciones que se sostuvieron bajo presión de deadline:

- **`OVERLAY_TEXT_MISSING` protegió por diseño.** Sin título gobernado, el compositor **no compone**.
  Hubo tentación de saltarlo con el reloj encima; la regla aguantó y esa es la prueba de que sirve.
- **El compositor lee `copy.title` del JOB** (`orchestrator_jobs.assets`), **no** de
  `content_pieces.assets`. Para intervención manual, el dato viaja **por el job** — quedó anotado
  porque costó descubrirlo en caliente.

### 🔬 Forense del commit colgante — la D se fugó del merge

La franja de identidad estaba mergeada y **no aparecía en producción**. Una hora de forense para una
causa que no estaba en el código:

> **Un PR mergeado captura la rama AL MOMENTO DEL MERGE.** Los commits que se empujan **después** a
> esa misma rama van a *preview* y **jamás a `main`**, aunque GitHub siga mostrando el PR como
> mergeado y la rama como actualizada.

Eso le pasó al corte D del Brief 8. La reparación fue `ImageLab` **#13** (merge **10:45:00 UTC**),
sobre la misma rama `claude/image-compositor-deterministic-o6ymv2`.

**La regla que queda:** la verdad del deploy **no** es el estado del PR en GitHub — es el **sha del
deployment de PRODUCCIÓN en Vercel**. Verificarlo post-merge pasa a ser paso obligatorio del
protocolo de entrega (ítem de AGENDA, Fase 3).

### 🚨 El incidente del 400 — y la exoneración de #35

Poco después de mergear `CopyLab` **#35**, `callClaude` empezó a devolver **400 de forma súbita y
sistemática**. La hipótesis obvia —el PR recién mergeado— consumió otra hora.

**No era #35. Era el crédito de Anthropic agotado.** #35 queda **exonerado**.

Dos cosas de esto, y las dos son de método:

1. **Un 400 súbito y sistemático con código sin cambios puede ser saldo, no bug.** Revisar el saldo
   **ANTES** de cazar código.
2. **`callClaude` debe loguear el body del error antes de tirar.** Anthropic **nombra la causa ahí**.
   La ceguera de hoy costó una hora de forense sobre un error que venía con su propia explicación
   adjunta. Fix en AGENDA, Fase 3.

### 🔤 Vocabulario de canal en `imagelab_presets` — FEED, no LANDING/META

Dos vocabularios de canal conviven en la tabla:

- **Filas viejas:** `LANDING` · `META` · `TIKTOK` · `WEB`.
- **Lo que ImageLab realmente consulta** (verificado en logs `[sb]`): `FACEBOOK_FEED` ·
  `INSTAGRAM_FEED` · `INSTAGRAM_STORY` · `BLOG_FEATURED` · `LINKEDIN_FEED` · `EMAIL_HEADER`.

Una siembra copiada de las filas existentes produce presets que **el código nunca lee** — y como no
hay preset, ImageLab cae al builder genérico **sin avisar**: el síntoma no es un error, es una
imagen que no se parece a la marca. Fue exactamente la causa de la escena fuera de tema que Sam
rechazó. Sembradas las 6 filas `FEED` de ForumPHs; las 4 viejas se conservan.

> **Regla:** toda siembra de presets usa **el canal que el código consulta, verificado en logs** —
> jamás copiado de filas existentes. Es la misma clase de defecto que `AUDIENCE_CTA` con claves
> legacy: un eje migrado en la columna sin migrar a sus consumidores (`MULTIBRAND_RULE.md` §13).

### 🆘 La publicación de emergencia — títulos extractivos y compositor de cómputo propio

Con el saldo de texto en cero y el estreno a dos horas, no había forma de **generar** títulos nuevos.
La salida:

- **Título extractivo como recurso de emergencia.** Un título tomado **verbatim o casi-verbatim del
  cuerpo ya juzgado** hereda la gobernanza de ese cuerpo; con **aprobación humana explícita** es
  legítimo. **Jamás un título inventado sin juez ni humano** — la excepción es la herencia, no la
  improvisación.
- **El compositor no necesita al proveedor de texto.** Es **cómputo propio**: tipografía, franja,
  scrim y encaje se resuelven en casa. Con el texto ya aprobado y Vertex vivo, el único eslabón
  caído era el que ya no hacía falta.

**Lo que esto dice de la arquitectura:** *tener herramientas no es tener infraestructura.* La
infraestructura es la que **amortigua la falla de un proveedor** — y hoy amortiguó una caída total
del generador de texto a dos horas del primer lanzamiento de la historia del sistema.

### 📅 Los 6 agentes de ForumPHs, ya en cron

`cron.job` **52–63**: research + process por agente. Weekly los dos `tier1`
(`FPHS-CUOTA-POR-DENTRO` lunes, `FPHS-ASAMBLEA` jueves), biweekly los cuatro `tier2`.
**21 corridas/mes.** Tres agentes ya rindieron su primer `last_run_at` el 22-ago
(`FPHS-ASAMBLEA` y `FPHS-CUOTA-POR-DENTRO` 07:25, `FPHS-ACTA-INSTRUMENTO` 10:01); los otros tres
esperan su fecha de calendario. **La ola 2 va a producir más rápido de lo que hoy se revisa** — el
drenaje es ítem de Fase 1.

### 🧭 Calibración — 9 filas nuevas en `intel.approval_calibration`

Ventana 21-ago 23:54 → 22-ago 09:40 UTC, todas `evaluated_by: sam`: **3 `approved`, 6 `rejected`**.
De ahí salen las **tres reglas de Sam** (títulos · texto · voz FPHs), detalladas en
`brands/ForumPHs/session_log.md`. Las tres **todavía no están en el sistema**: viven en la tabla de
calibración y en Professor. Llevarlas al **prompt de título** y a **`intel.watcher_rules`** es ítem
de AGENDA (Fase 3) — mientras dependan de la memoria del escritor, van a volver a fallar.

### 🕳️ Puntos ciegos que esta sesión dejó nombrados

- **Diacríticos perdidos** — defecto **intermitente** del generador (mismo `raw`, misma corrida,
  unas piezas bien y otras sin una sola tilde). El Watcher **no lo ve**. Corrección acordada:
  **check determinístico** pre-juicio (regex es-sin-tildes), **no** una regla LLM — un defecto
  mecánico no se juzga, se detecta.
- **Claims normativos plausibles pero falsos para la jurisdicción** — el caso del voto ponderado
  (ver el log de ForumPHs). Ni el Watcher ni la doctrina los detectan. Requiere **research con
  verificación contra fuente primaria** y **gate experto humano** en piezas con afirmaciones legales.
- **`compose-step` después de `regenerate`** — hoy una pieza regenerada no vuelve a componerse
  automáticamente. En AGENDA, Fase 3.

---

## 2026-08-20/21 — Reparación integral del carril: el juez deja de juzgar a ciegas, la regla declara dónde aplica, y el escritor tiene una segunda oportunidad

Tres días de **reparación**, no de construcción: el carril ya corría end-to-end desde el 18-ago
(CopyLab generador, cuatro labs, ledger asentando). Lo que no funcionaba era el **juicio** — 0 %
de PASS sostenido — y la causa no era una, eran seis, cada una tapando a la siguiente. Se
atacaron en orden de dependencia: primero darle al juez el contexto que le faltaba (G1), después
volver informativo lo que rechazaba sin criterio (G2-A), después convertir la aplicabilidad de una
regla en dato (G2-E), y por último dejar que el escritor corrija cuando el rechazo es corregible
(G2-F). El resultado se midió sobre ForumPHs, que es la marca que entra a publicar el 22-ago.

Lo que es de marca vive en `brands/ForumPHs/session_log.md` (2026-08-20/21); acá va el carril.

> **Base de las cifras.** Todo número de esta entrada está verificado contra la DB al cierre de la
> sesión (21-ago ~21:00 UTC) y medido sobre `gate_detail`, nunca sobre `failed_gate` — la regla que
> quedó abierta el 18-ago. Donde una cifra viene del brief y no de la DB, se dice.

### G1 — El juez juzgaba una pieza sin saber dónde se publica

Tres cortes del mismo defecto: el Watcher recibía el texto y **no** el contexto de publicación,
así que juzgaba contra un destino imaginario.

- **G1-B — contexto de publicación al `ctx` del juez.** `audience_frame` y `platform_key` viajan
  ahora al juez. Verificado en `gate_detail`: los gates `evidence`, `hard_rules` y
  `objective_stimulus` asientan `platform_key` y `audience_frame` en cada juicio
  (`"audience_frame": "decide"`, `"platform_key": "blog_forumphs"`). Era el ítem que el 18-ago
  quedó abierto como *«`audience_frame` al `ctx` del juez — mismo camino que G1-B»*. **Cerrado.**
- **G1-C — el techo se aplica.** El techo de tokens por destino existía en `execute.ts` desde
  v9.7 y **no se estaba aplicando** en el carril. Ahora sí.
- **G1-D — presupuesto de longitud al escritor.** El escritor recibe el presupuesto en vez de
  descubrirlo por truncado. Ratio medido en la sesión: **3:1** entre lo que el escritor producía y
  lo que el destino admite (cifra del brief, no remedida acá).

**Por qué importa más de lo que parece:** un juez sin destino no rechaza *mal*, rechaza *sin
poder acertar*. Cada uno de los tres cortes elimina una clase entera de rechazo que no era del
escritor.

### G2-A — `objective_stimulus` (gate7) pasa a informativo, pero deja constancia

El gate7 rechazaba al **79 %** inventando su propia taxonomía (REACH / RETENTION / RESOLVE —
ninguna de las tres existe en el sistema). Estaba abierto sin fecha desde el 18-ago.

La reparación **no** lo apaga: lo vuelve `blocking: false` **conservando el veredicto** en
`gate_detail` con `would_reject`. Verificado en producción:

```json
"objective_stimulus": {
  "blocking": false, "informative": true, "would_reject": true,
  "criteria": ["objetivo_estimulo", "audience_frame"],
  "objective": "TRUST", "objective_label": "jd__convertir_profundo",
  "stimulus_source": "declared", "audience_frame": "decide",
  "verdict": "FALLA: audience_frame — ..."
}
```

**El patrón es el aporte, no el gate.** Un gate que se apaga deja de medir; un gate informativo
con `would_reject` **sigue midiendo mientras deja pasar** — y el día que su taxonomía viva en
tabla, volver a `blocking: true` es un flip, no una reconstrucción. `cadence` y `sibling_window`
ya declaraban `would_reject` con el mismo patrón; ahora son tres. La taxonomía de
`objective_stimulus` como dato en tabla **sigue abierta** — esto compra tiempo, no la resuelve.

### G2-E — `applies_when`: la aplicabilidad de una regla es dato, y se filtra antes del juez

Columna nueva `intel.watcher_rules.applies_when` (jsonb). Antes, **toda** regla activa se le
mandaba al LLM y era el LLM quien decidía si aplicaba — con lo que una regla de blog se evaluaba
contra un post de Meta y a veces la daba por violada. Ahora el filtro es **determinístico y
previo**: la regla declara dónde vive y el carril la descarta antes de gastar un token.

Sembradas en esta pasada — 4 reglas, verificadas en DB:

| Regla | `applies_when` |
|---|---|
| `HR-FPHS-08` (`blog_enlace_interno`) | `{"platform_in": ["blog_forumphs"]}` |
| `HR-GEN-08` (`desarrollo_con_ejemplos`) | `{"platform_not_in": ["meta_fb","meta_ig","x","tiktok"]}` |
| `HR-FPHS-11` (`cifra_de_fuente_declarada`) | `{"exempt_if_piece_matches": "imagin\|supongamos\|caso t[ií]pico\|escenario"}` |
| `HR-GEN-02` (`dato_fabricado`) | `{"exempt_if_piece_matches": "imagin\|supongamos\|caso t[ií]pico\|escenario"}` |

**Es la Regla Multimarca aplicada al juicio.** El eje —"una regla puede no aplicar"— va en el
código; la instancia —"esta regla no aplica en Meta"— va en el dato. Antes, la única forma de que
una regla no aplicara en una plataforma era **no escribirla**, o escribir la excepción dentro del
`statement` y confiar en que el LLM la leyera. La marca N+1 hereda el mecanismo sin tocar código.

### La doctrina del escenario declarado

Las dos filas `exempt_if_piece_matches` de arriba son una **doctrina**, no un parche de regex.

`HR-GEN-02` (dato fabricado) y `HR-FPHS-11` (cifra sin fuente declarada) existen para impedir que
la pieza invente números y los presente como hechos. Pero un contenido educativo **necesita**
ilustrar con cifras: *"imaginemos un PH de 80 unidades con una cuota de $95"*. Sin la excepción,
enseñar era indistinguible de mentir, y el gate rechazaba correctamente una pieza que estaba bien.

La doctrina: **el escenario declarado no es un dato fabricado — es una hipótesis marcada como
tal.** Lo que la regla persigue es la cifra que se hace pasar por real; una cifra que se anuncia
como supuesto no engaña a nadie. La marca (`imaginemos`, `supongamos`, `caso típico`, `escenario`)
es lo que separa una de otra, y por eso vive en el dato: cada marca la calibra en su idioma y su
registro.

### G2-F — Bucle de reparación acotado: un reintento, dirigido

Un rechazo del juez terminaba la vida de la pieza. Ahora, cuando el rechazo es **corregible**, el
carril devuelve el veredicto al escritor con la violación concreta y pide **una** corrección —
**un solo reintento, dirigido**, y si vuelve a fallar, se acabó.

Verificado en el ledger: `output_type: "repair"`, lab `copylab`, **19 asientos** entre las
17:59 y las 18:32 UTC del 21-ago, **$0,7146**. El asiento propio es deliberado: la reparación
cuesta y **se ve** — no se esconde dentro del costo del `post`.

**Acotado es la palabra.** Sin techo, un bucle de reparación es un bucle de gasto: el escritor
corrige, el juez rechaza por otra cosa, y el par se persigue hasta agotar el presupuesto. Uno
dirigido convierte el rechazo en información sin convertirlo en deuda.

### Brief 6 — El carril completo asienta costo, y lo desconocido se declara NULL

Tres `output_kind` nuevos en `public.ops_output_kinds` (sembrados 21-ago 20:52 UTC):

| `output_kind` | lab | Unidad |
|---|---|---|
| `research` | `iid-research` | por invocación, con `usage` real |
| `finding_process` | `iid-process` | por hallazgo |
| `embedding` | `watcher` | caracteres embebidos (Vertex `gemini-embedding-001`, 768d) |

Y el RPC `public.ops_log_generation` extendido a **27 argumentos**, el último `p_billable` —
la facturabilidad deja de inferirse del `output_type` y pasa a declararse en el asiento.

**Estado real al cierre:** `embedding` ya asienta (**56 filas** desde el 18-ago, $0,0034) y
`repair` también (19 filas, arriba). **`research` y `finding_process` tienen el kind sembrado y
cero filas** — las tres capas del IID se instrumentaron, pero los asientos de investigación y
proceso entran en la próxima corrida. No es un fallo: es el orden en que se desplegó.

> ⚠️ **Corrección pendiente de una sola línea.** La `description` de `finding_process` dice
> *"Asienta por hallazgo"* y la unidad acordada es **por invocación**. Va a AGENDA como ítem (j).

**Costo desconocido = NULL, nunca 0.** La regla de la sesión. Un costo que no se pudo resolver
se asienta `NULL`, no cero: cero es una afirmación ("esto fue gratis") y `NULL` es la verdad
("no lo sabemos"). Un cero falso se suma en silencio a todos los promedios y no vuelve a
detectarse jamás; un `NULL` aparece en cualquier conteo que lo busque.

**Política de costos: precio de lista.** El costo se asienta al precio público del proveedor, sin
descuentos, créditos ni tarifas negociadas. El motivo es que el ledger sirve para **decidir**
—cuánto cuesta una pieza, qué lab conviene, qué margen deja una marca— y una tarifa negociada
contamina esa decisión con una condición que puede vencer. El descuento es un hecho de tesorería,
no de arquitectura.

### Deuda declarada por CC en esta sesión — `web_search` server-side

Las búsquedas server-side de `iid-research` **no se asientan**. Anthropic las cobra aparte
(**$0,01 por búsqueda**) y las reporta en `usage.server_tool_use`, que hoy el carril ignora. Con
seis semillas por corrida y varias búsquedas por semilla, no es ruido. **CC lo declara como deuda,
no lo repara** — no estaba en el encargo. Va a AGENDA como ítem (i).

### El `CHECK` multimarca de `iid_agents`

`iid_agents_default_voice_check` **enumeraba voces**. Una tabla compartida con la lista de voces
del ecosistema escrita dentro de la restricción: alta de marca nueva = ALTER TABLE. Corregido al
eje: la restricción ahora sólo exige que la voz **exista y no esté vacía**.

```
CHECK ((default_voice IS NOT NULL) AND (length(TRIM(BOTH FROM default_voice)) > 0))
```

Es exactamente `MULTIBRAND_RULE.md` §8 en una restricción de base de datos: el eje —"un agente
tiene voz"— en el esquema; la instancia —"la voz es `fphs_educativa`"— en la fila. Sin esto, los 6
agentes de ForumPHs no se podían dar de alta.

### La corrida: Vía C sobre ForumPHs, y las primeras PASS de la marca

**6 semillas → 6 hallazgos → 27 piezas → las primeras PASS de ForumPHs.** Verificado:

- **6 `intel.iid_seeds`**, `lane: standard`, `status: dispatched`, despachadas entre las 10:17 y
  las 10:20 UTC del 21-ago, **las 6 con `finding_id`** — ninguna se perdió en el camino.
- **27 filas en `intel.iid_content_queue`**, `brand_id: ForumPHs`, **6 dominios**.
- **`intel.watcher_log`: 187 juicios sobre 27 piezas distintas** (el exceso son los reintentos de
  G2-F y las variantes por destino). **9 juicios PASS sobre 8 piezas distintas.**
- **Ratio final por pieza: 7 de 27 = 25,9 %** midiendo el **último** veredicto de cada pieza. El
  brief declara ~22–24 %; la diferencia es el corte temporal, no el dato. **De 0 % a un cuarto en
  tres días.**

Rechazos por gate (sobre los 178 juicios REJECT): `hard_rules` **114** · `evidence` **62** ·
`duplication` **2**. El gate7, ya informativo, no figura — pero sigue midiendo con `would_reject`.

### El camino al 90 %, diagnosticado

El 25 % no es el techo del sistema; es lo que rinde el sistema **sin las tres piezas que faltan**.
Diagnóstico de la sesión, en orden de rendimiento esperado:

1. **Material de research.** `evidence` rechaza 62 veces porque la pieza no tiene con qué
   sustentarse. No es un problema del escritor ni del juez: es que el hallazgo llega pobre. Los
   briefs de los 6 agentes nuevos ya piden **2+ casos con fuente** — la corrección está sembrada
   aguas arriba y todavía no rindió.
2. **Override.** Un juez sin apelación es un juez que se equivoca en firme. El sprint de override
   —y su learning de cierre— es el ítem (b) de la AGENDA.
3. **Varianza del juez.** El mismo texto juzgado dos veces no siempre da el mismo veredicto. Hasta
   medirla no se sabe qué parte del 75 % restante es pieza mala y qué parte es juez inestable.

**La afirmación que esta sesión sí deja probada:** el carril produce piezas que pasan. Lo que
queda es subir el rendimiento, no demostrar que puede.

## 2026-08-18 — El carril async cerrado end-to-end: CopyLab es el generador y el motor local ya no existe

Sesión de **cierre de carril**. Lo que es de marca vive en `brands/ForumPHs/session_log.md`
(2026-08-18); acá va el carril.

### Lo que se mergeó

En `unrlvl-iid-functions`: **#62** (recolección de `source_urls` en `iid-research`) · **#63**
(`FUENTES DEL HALLAZGO` a los gates 4 y 6, `PIECE_TEXT_CAP` a 2500) · **#64** (A1, el cable de
CopyLab + B1 `claims` y hardcode de marca + B2 parser del juez) · **#65** (observabilidad:
`builder_dispatch`, `api_key_ref` `EXTERNAL:`) · **#66** (C1, brief de escritura: `claims`,
`mechanism`, `case_example`) · **#67** (techo `STRUCTURE_MAX_TOKENS` 12000 y fail-loud
`STRUCTURE_TRUNCATED`) · **#68** (A3, el retiro del generador local; su contraparte documental es
`unrlvl-context` **#51**) · **#69** y **#70** (D1 casos múltiples, D2 modo escritura) · **#71**
(guarda de casos sin título e instrumentación) · **#73** (G1-A auditoría + G1-B plataforma al juez).

En `CopyLab`: **#26** (A2, canal por `platform_canal_map`) · **#27** y **#28** (claims) · **#29** y
**#30** (D1 y D2, contraparte de los de arriba) · **#31** (G1-C, techo aplicado).

### CopyLab es el generador efectivo del carril — verificado en producción

`builder_meta.generator: "copylab"` · **diez capas aplicadas** · `cache_mode: v2.0_per_slice` ·
`output_template_id: SMPC_full` · ledger asentando `api_key_ref: EXTERNAL:copylab`.

**El generador local está retirado del ecosistema.** El `grep -ri` de su identificador da **cero**
sobre los tres repos.

> **Nota de nomenclatura.** El brief de esta sesión nombra el literal del identificador retirado.
> Acá se escribe `generadorLocal`, que es la sustitución que A3 instaló (`unrlvl-context` #51) en
> todos los context files; el literal queda en el cuerpo de aquel PR. Escribirlo acá habría
> invalidado la misma verificación que este párrafo reporta.

### Mediciones

| Corrida | Piezas | PASS |
|---|---|---|
| 15-ago — línea base | 12 | 0 |
| 18-ago — 63 piezas / 4 dominios | 63 | 1 |
| 18-ago — post-techos | 48 | 0 |

Sobre esas 48 piezas, medido **por `gate_detail`** y nunca por `failed_gate`:

| Gate | Rechazo |
|---|---|
| `objective_stimulus` | **79 %** |
| `hard_rules` | 43 piezas |
| `evidence` | 7 |
| `duplication` | 4 |

**El contrafáctico del informe de auditoría:** sin `objective_stimulus` bloqueante y sin
`HR-GEN-08`, **17 de 48 pasaban (35 %)**.

### DDL aplicada en producción

| Objeto | Cambio |
|---|---|
| `intel.iid_findings` | `claims` jsonb · `mechanism` text · `case_example` jsonb · `case_examples` jsonb |
| `intel.iid_agents` | `brand_id` text |
| `intel.iid_research_raw` | `structure_output_raw` text |
| `intel.watcher_rules` | `instruction` text |
| `public.content_type_registry` | `platform` text, y los 2 índices únicos reemplazados por **4 parciales** — uno por nivel de la cascada |

### Siembras (Claude.ai, SQL bajo HRD)

- **`intel.iid_agents.brand_id`** — 15 agentes: los 14 `UNRLVL-*` a UnrealvilleStudio y
  `LUCIEN-BEHAVIORAL-SCIENCE` a LucienSael. Los 15 `IID-*` genéricos quedan en **NULL a propósito**.
- **`creative_compatibility_rules`** — `fphs_conversion` y `fphs_editorial` × `email_divulgacion`,
  heredando el perfil de `editorial_post`.
- **`intel.brand_topic_platform_mode`** — **135 filas** para ForumPHs, `cadence_mode: rotating`,
  `anchor` en **NULL deliberadamente**.
- **`intel.watcher_rules.instruction`** — `HR-GEN-08`, `HR-UNRLVL-03`, `HR-GEN-03`, `HR-GEN-01`.
- **`HR-GEN-08`** — `meta_fb` y `meta_ig` pasan a formato corto, con la evidencia en `notes`.
- **`HR-FPHS-10`** — migrada al eje canónico `decide`/`influye` + `instruction`.
- **`content_type_registry`** — 6 filas BASE por plataforma: linkedin 700 · meta_ig 500 ·
  meta_fb 320 · tiktok 150 · x 100 · blog 1400.

### Lo que queda abierto, y por qué muerde

- **`AUDIENCE_CTA` en CopyLab sigue con claves legacy** — bloqueante del **22-ago**. 18 topics
  activos de ForumPHs con el escritor **sin instrucción de CTA**. **Prohibido reponer alias**: la
  regla general quedó escrita en `protocols/MULTIBRAND_RULE.md` **§13**. Handoff propio.
- **`audience_frame` no llega al `ctx` del juez** — mismo camino que G1-B. Bloqueante del 22-ago.
- **`objective_stimulus` no tiene taxonomía como dato.** El gate rechaza al 79 % inventando la suya
  (REACH, RETENTION, RESOLVE — **ninguna de las tres existe en el sistema**). Debe resolverse por
  marca y plataforma, en tabla.
- **`evidence_required` sigue sin leerse. NO se cierra**, aunque el resto de su frente sí.
- **El RPC `intel.match_content_embeddings` no está migrado.** `duplication` compara texto por LLM
  mientras se pagan embeddings a Vertex que **nadie consulta** (47 filas).
- **`sociallab` sigue armando su post con `runSocialLabDirect`** — el último lab del carril que
  construye el motor de un lab existente en vez de llamarlo por su endpoint (regla LABS). De los
  cuatro labs invocados, **tres llaman al lab**.
- **`MODEL` hardcodeado** en `iid-research` e `iid-process`, línea 6 · **`stop_reason: "refusal"`**
  en `iid-process`, misma clase que el truncado · **`search_config` no leído**
  (`evidence_required`, `hard_rule`, `dev_depth`).

## 2026-08-16 — Tres constructores a uno, el cron que nunca existió, y un `verify_jwt` que no dejaba llegar al código

Sesión de **construcción y corrección de diagnóstico**. Lo de marca vive en
`brands/ForumPHs/session_log.md` (2026-08-16); acá va el carril.

### Frente de snapshots — TRES constructores reducidos a UNO

Había **tres** implementaciones construyendo el snapshot de marca, desalineadas entre sí:

| Constructor | Tablas | Estado tras esta sesión |
|---|---|---|
| EF `brand-snapshot-builder` v1 | 30 | ✅ **el único constructor** |
| `CopyLab/api/brand-cache.js` | 30 | v2.4 → **v3.0 LECTOR** |
| `unrlvl-context/api/brand-cache.js` | 8 | v1.2 → **v2.0 LECTOR** |

**Ninguno de los dos labs construye ya.** El eje —componer el contexto de una marca— es del
sistema, no de cada lab que lo necesita. El de `unrlvl-context` era además el peor de los tres:
consultaba **8 tablas** frente a las 30 del canónico, sin `brand_voice_genome` ni el motor
creativo — o sea, todo caller suyo venía operando con contexto empobrecido y sin saberlo.

**Deuda abierta:** retirar `action=build_all` de CopyLab, que hoy responde **410 con puntero**.
Va en un **tercer PR**, no en éste.

### El cron de `build_all` nunca existió

La AGENDA declaraba, desde el 2026-08-14: *"el cron nunca ha corrido"*. Verificado contra
`cron.job`, el diagnóstico era **incorrecto en su forma más cara**: no era un cron que fallaba,
**era un cron ausente**. No había nada que depurar.

Creado: **jobid 51**, `brand-snapshot-build-all-3h`, `0 */3 * * *`. Cobertura **9/13 → 13/13**.

> **El método que lo encontró** es el de `skills/context-resolver/SKILL.md` §3: preguntarle al
> sistema si el problema todavía existe, en vez de leer el ítem. Un ítem que dice "falla" y una
> fuente que dice "no existe" no son el mismo pendiente, y no se arreglan igual.

### `content-scheduler` v2.1 — y el gotcha que cuesta una tarde

5e-1 cerrado por vía alterna: **construido** (PR #57), **corregido** (#59, #60), **desplegado v2.1**.

> **⚠️ `verify_jwt: false`.** Se desplegó primero con `true` y **el gateway rechazaba antes de
> llegar al código**: `UNAUTHORIZED_NO_AUTH_HEADER`. Este carril autentica por header
> **`x-cron-secret`**, no por JWT. Con `verify_jwt: true` **no hay código que pueda arreglarlo** —
> el request nunca llega. Se anota como gotcha porque el síntoma (401) apunta al lugar equivocado.

**Deuda menor:** `scheduledRows.push` no lleva `voice`, así que la pieza recién colocada **no
cuenta en el filtro por voz** de los grupos posteriores de la misma corrida.

**Pendiente:** el **alta del cron**, tras verificación con candidatas reales.

### Modelo de cadencia — corregido

Tablas nuevas en `intel`: **`brand_rollout`**, **`brand_cadence`**, **`brand_topic_platform_mode`**.
La última es el ajuste de **granularidad del eje**: el modo es por `(topic, plataforma)`, no por
marca — regla instalada en `protocols/MULTIBRAND_RULE.md` → "Granularidad del eje".

Quedan **3 alias legacy** vivos a propósito, para retirar en el **paso 3**: `brand_topics.cadence`,
`brand_cadence.cadence_mode`/`.anchor` y `brand_rollout.max_rotation_weeks`. Se retiran
**contando** `class_source_counts` y `max_rotation_weeks_source` del reporte — no a ojo.

### El hallazgo del GRANT

`intel.content_embeddings` creada: **`vector(768)`** (`gemini-embedding-001 @768`, **no 1536** como
decía el spec original) + índice **HNSW** + **GRANT `service_role`**.

> **El GRANT no es un detalle de checklist.** Una tabla creada sin él existe, responde a
> `information_schema` y **falla en runtime** desde el carril, que corre como `service_role`. Es
> exactamente la clase de fallo que se ve como "la tabla no existe" y no lo es. Va como paso fijo
> del DDL, no como recordatorio.

**5e-2 sigue ABIERTO.** La tabla existe; **los gates 1 y 5 del Watcher siguen resolviendo por
`semanticSimilarity` contra Claude**. El cableado cambia **una llamada LLM por un operador `<=>`**
— y hasta que ocurra, esto es **parcial, y parcial es abierto**.

### El hallazgo de compliance

Las reglas **globales `hard`** se heredan y **ganan** sobre las de marca. ForumPHs pasó de 9 a 11
por herencia, sin que nadie sembrara nada en la marca. Consecuencia de método: **contar las reglas
efectivas de una marca leyendo sólo sus filas da un número menor que el real.**

### `LAB-AUDIENCE-BRIEF` — desactivado

El stage 0 huérfano tenía tres salidas: cablearlo, desactivarlo, o dejarlo activo-y-muerto (la
peor). Se tomó la segunda: **`active=false`, `supports_iid=false`**. La fila estaba **malformada y
nunca funcionó**. Cadena IID: **CopyLab (1) → AIFE (2) → ImageLab (3) → SocialLab (4)**.

> **Residuo, anotado para que no se dé por cerrado de más:** el `stage_order: 1` sigue
> **hardcodeado** en `content-dispatcher`. Desactivar la fila quita la trampa, **no el literal**.

### Regla nueva — no hardcodear modelos

`claude-sonnet-5` literal en `content-run-stage`, `calibrate.ts` y `_craftModules.ts`;
`gemini-2.5-flash-image` en ImageLab. **`ops_lab_rates` ya resuelve el PRECIO por `model_id`; lo que
falta es que resuelva QUÉ MODELO.** Media vuelta dada, media pendiente. Instalada en
`protocols/MULTIBRAND_RULE.md` → "Modelos y versiones".

### Fase B — sin cambios esta sesión

Los **6 ítems de cableado** de CopyLab siguen **abiertos y bloqueantes** del run 100 % del carril
async. Nada de esta sesión los tocó. Se anota explícitamente para que el volumen de lo cerrado hoy
no se lea como avance en ese frente.

### 🔴 Seguridad — `IID_CRON_SECRET` repartido

Vive en **4 lugares sin fuente única**, uno de ellos **en claro en `intel.iid_scheduler_config`**.
**Rotarlo exige tocar los 4**, y no hay nada que garantice que se toquen los 4.

---

## 2026-08-14 — Reconciliación de estado: CopyLab ya estaba listo y nadie lo había escrito

**Objetivo declarado:** validar el **carril async del AIID**, no correr ForumPHs. ForumPHs fue el
banco de pruebas, no el fin. La sesión terminó siendo de **descubrimiento**: los context files
declaraban pendiente lo que estaba cerrado, cerrado lo que seguía abierto, y omitían lo que se
descubrió. Ninguna mutación de producción salvo la siembra del snapshot de ForumPHs — todo lo
demás fueron lecturas.

**La corrección de encuadre de Sam.** Durante la sesión el trabajo derivó hacia "arreglar
`generadorLocal`". Sam lo reencuadró: **CopyLab es el generador único**; `generadorLocal` deja
de ser un camino a mejorar y pasa a ser un **donante** — se le extraen las capas de gobierno que
sí aporta y se retira. La pregunta correcta no es "¿cómo hago que el motor local genere mejor?"
sino "¿qué le falta al cable para que el lab que ya existe reciba lo que necesita?".

### Lo que se descubrió: CopyLab v9.7 ya tiene el modo carril completo

`CopyLab/api/execute.ts` (97.749 b, `main`). **Es el hecho más importante de la sesión y no
estaba en ningún context file.**

- **Contrato:** `interface BuilderInput { domain, voice_id, destination, platform, language,
  psycho_preset, rules[], iid_brief, angle, audience_frame }` — **top-level**. Su presencia
  activa el modo carril; su ausencia deja el modo UI intacto. Un endpoint, dos modos.
- **Validación fail-fast**, sin defaults silenciosos: `COPYLAB_DESTINATION_REQUIRED`,
  `COPYLAB_VOICE_ID_REQUIRED`, `COPYLAB_IID_BRIEF_REQUIRED`, `COPYLAB_VOICE_NOT_FOUND` (nombra
  las voces disponibles, **nunca** cae a `[0]`), `COPYLAB_PSYCHO_PRESET_NOT_FOUND`,
  `COPYLAB_LANGUAGE_UNRESOLVED`.
- **Respuesta carril:** `{ status, title, body, signature, usage, meta:{ voice_id,
  voice_version, language, psycho_preset, platform_key, copy_profile_id, humanize_profile_id,
  rules_injected, rules_skipped, rules_count, creative_seed, cache_mode, layers_applied,
  output_template_id, template_vars_unresolved(+_compliance) } }`.
- **Techo de tokens por destino** (`maxTokensFor`): editorial 4000 · social 640 · UI 1600.
- **La firma viaja sin estampar** (`deriveSignature`): la estampa el carril en `finalizePiece`,
  post-Watcher PASS.

**Conclusión:** el generador unificado que pedía la Fase 3 del Proyecto UNIFICACIÓN **ya
existe**. Falta el **cable** (Fase B), no el diseño.

### La desviación, con alcance verificado línea a línea

Sobre `unrlvl-iid-functions/supabase/functions/content-run-stage/index.ts` (`main`, 167.492 b,
2.499 líneas). La desviación sigue siendo cierta; esto la **precisa**:

- `L2201-2203` — el stage lee `lab_configs` **incluyendo `api_endpoint`** para todos los labs.
- `L2233` → `L2252` — rama `copylab`: llama a `generadorLocal(...)` **local**.
  `lab.api_endpoint` está cargado y **nunca se usa** en esa rama.
- `L919` `generadorLocal` → `L1115` `fetch("https://api.anthropic.com/v1/messages")` directo ·
  `L174` `CLAUDE_MODEL_ID = "claude-sonnet-5"`.
- `L2424-2427` — rama `sociallab`: `runSocialLabDirect(...)` → `L1377`, también directo a
  `api.anthropic.com`.
- **Contraste:** `L2310` aife → `execLab(lab.api_endpoint, ...)` ✅ · `L2362` imagelab →
  `execLab(lab.api_endpoint, ...)` ✅ · `L2336` imagelab && `canalForPlatform(platform1) ===
  CANAL_NONE` → salta imagen (email).

De cuatro labs que el stage invoca, **dos llaman al lab y dos reconstruyen su motor**.

### Los dos bloqueantes reales de la Fase B

No son rediseño. Son dos líneas:

1. **`execLab` no puede transportar `builder_input`.** Firma en `L442`:
   `(endpoint, path, brandId, stage, params, previousOutputs, timeoutMs)`. CopyLab lo espera
   top-level, hermano de `brandId`/`stage`/`params`/`previousOutputs` — **no** dentro de
   `params`.
2. **`previousOutputs.brandContext` impide que CopyLab lea su snapshot.** `L1565` mete
   `brandContext` en el `po`; CopyLab hace
   `req.previousOutputs.brandContext ?? await fetchBrandCache(brandId)` y **el `??` corta
   antes**. CopyLab recibiría el `context_json` pobre y los 8 slices del motor creativo,
   registro, canal y geomix caerían a query directa. **Correría otra vez amputado, por un
   `??`.**

Inventario completo (6 ítems) en `PROYECTO_COPYLAB_hereda_y_profilaxis.md` §"Fase B —
inventario cerrado".

### Siembra del snapshot de ForumPHs — la única mutación

`brand_cache_snapshots` v2.4, `built_at` 2026-08-14 21:16 UTC, `manual_refresh`. Verificado con
todas las capas pobladas: 44 `creative_vectors` · 10 `tension_architectures` · 5
`aggro_presets` · 18 `creative_compatibility_rules` · 3 genomas · 24 `content_type_registry` ·
9 `platform_canal_map` · 12 `pipeline_skills` · brand presente.

**Hallazgo colateral:** ninguna fila de la tabla tiene `built_by='build_all'`. **El cron diario
que `brand-cache.js` documenta nunca ha corrido con éxito.** Con `CACHE_TTL_HOURS = 4`, todos
los snapshots están **stale de forma permanente**. Faltan 4 de 13 marcas elegibles:
DiamondDetails, PatriciaOsorioPersonal, SamPublisher, UnrealvilleStores.

### El gap cuantificado: 22 de 32 topics con el motor creativo degradado

`fphs_conversion` **no tiene fila en `creative_compatibility_rules` en ningún content_type**, y
gobierna 11 topics activos en `editorial` y 11 en `social` — **22 de los 32 topics activos** de
ForumPHs. Como `editorial_post` **no tiene fila BASE** (las cuatro existentes llevan
`voice_id`), `selectCompatRule` devuelve `source='none'`, `applyCreativeLogic` recibe
`rule=null` y filtra sólo por `aggro_min/max`: quedan elegibles casi los 44 vectores de
e-commerce. En `social_post` sí hay BASE, así que degrada a `source='base'` con warn nominal.

Esto no lo destapó una auditoría de campos: lo destapó **contar filas contra topics**. Una
tabla con 18 filas parece sembrada hasta que se pregunta *qué voz gobierna cuántos temas*.

### Dos violaciones multimarca registradas (no corregidas)

Corregirlas es PR de código aparte, y va **código primero, DDL después**. Se registran con
comentario en el propio código:

- **`CARRIL_EDITORIAL_CANAL`** en `CopyLab/api/execute.ts` — `blog_forumphs` es un literal de
  marca en capa compartida. Lo agudo: **el eje correcto ya existe como dato** y el archivo lo
  usa unas líneas más abajo (`platform_canal_map` + `resolveCanalBlockId`). El camino bueno y el
  malo conviven en el mismo archivo.
- **`SOURCES_MAP`** en `brand-context-builder/index.ts` — marcas y rutas de archivo como
  código. Test N+1: meter una marca nueva exige tocar el archivo.

### Otros hallazgos registrados

- **`audience_brief` stage 0 huérfano.** Declarado en `lab_configs` con `iid_stage_order = 0` y
  `active = true`, y **nunca se ejecuta**: `content-dispatcher` dispara
  `{ job_id, stage_order: 1 }` **hardcodeado**. Y `content-run-stage` no tiene rama para él: si
  se disparara caería al `else` de `L2467` con `isCritical=false`, dejando el job en
  `processing` sin llamar a `fireNextStage` — **stall silencioso**. Trampa latente, no fallo
  activo.
- **Las cuatro voces de ForumPHs verificadas.** `fphs_conversion` v1.1 activa desde 2026-08-09
  (la ficha decía "SIN calibrar: 11 topics / 0 filas" — era el estado del 08-08 y caducó al día
  siguiente), `fphs_educativa` v1.1 (10-ago), `fphs_editorial` v1.1 (11-ago), las tres con
  `signature_closer`. `fphs_institucional` v0.5 **inactiva** existía y no figuraba en ningún
  context file.
- **`await` de `upsertSnapshot` — ya estaba cerrado.** Se corrigió en `brand-cache.js` v2.1
  (`await`, 31-jul) y v2.3 (`service_role` + fail-loud, 02-ago), **después** de que el documento
  que lo pedía como condición previa se escribiera. Un pendiente puede morir sin que nadie
  levante el acta.
- **Vencimiento del introductorio de Sonnet 5 — cancelado.** Anthropic confirmó el 12-ago que
  $2/M input · $10/M output es permanente. Las proyecciones (acta ~$0,72 · suite FIE ~$0,57)
  conservan su cifra y pierden su fecha. Revisar `ops_lab_rates` por filas `previsto` sembradas
  para el flip del 31-ago, antes de que el cron 38 las promueva solo.
- **`getBrandContext` fail-silent** (`L419-429`): `if (!res.ok) return null` +
  `catch { return null }`. Si `context-cache` falla, el Builder escribe sin genoma y sin gritar.

### La lección de la sesión

Tres de los pendientes que este Actualiza cierra **ya estaban cerrados en el código** y seguían
abiertos en los context files; uno de los que estaba "cerrado" (el catálogo de vectores) seguía
abierto, sólo que por otra razón que la escrita. **Un context file que no se reconcilia contra
el código deja de describir el sistema y empieza a describir el recuerdo de una sesión.** El
coste no es cosmético: se planifica Fase B como si faltara diseñar un generador que ya está en
producción.

## 2026-08-01 — CopyLab Fase A cerrada (PRs #8–#13)

CopyLab pasó de motor sin gobierno a lab con contrato. Cuatro contratos del modo carril: `builder_input` como transporte único, response con `title`/`body` separados, firma **sin estampar** y `usage` real, normalización de `brandContext` con supresión **por rebanada**, y disciplina fail-loud en `sb`/`sbArray`.

El harness destapó dos defectos vivos que se habían mergeado: el desajuste de clave `brand` (escritor v2.1) contra `brands` (lector), causa raíz del literal `'ES'` hardcodeado que hacía generar en español a marcas EN-primarias; y la precedencia de `humanize_profiles`, donde `[0]` sobre un array que mergea DEFAULT primero hacía que **siete marcas** generaran con textura ajena. Se sumó un tercero que nadie había reportado: el modo literal conservaba el `[0]` del genoma, así que teasers y announcements de LucienSael salían con la voz que el array trajera primero.

Estado final: `main` @ `e7d517c`, 23 tests verdes, dos goldens anclados a `da182aa` (43.056 b), CI en GitHub Actions — antes no había nada verificando ningún PR.

Pendiente Fase B: mapa `destination`/`platform` → `content_type` (hoy toda pieza cae en `social_post` por el default del pack), no-repeat de vectores muerto (`buildPreviousOutputs` nunca setea `last_creative_vector`), `brandContext` del stage, y retiro de `generadorLocal`.

**Versiones de EFs corregidas en `ecosystem.json`.** El registro vivo `edge_functions` estaba desfasado: `content-run-stage`, `iid-core`, `content-watcher` y `content-dispatcher` decían v57/v36/v18/v36; las reales son **74/47/29/47**, verificadas con `list_edge_functions` (el contador `version` coincide exacto con el sufijo de `entrypoint_path` — **ése es el marcador confiable de versión**). Se corrigieron **solo las 4 entradas del registro vivo**; las menciones fechadas (p.ej. `key_changes_2026-07-25`, que dice v52) **no se tocan**: son historia — registran qué era cierto ese día y explican por qué el registro vivo subió (la EF se redeployó varias veces entre esa fecha y hoy). Regla #1 del repo.

Hallazgo que abre frente propio: `src/lib/buildCopyPrompt.ts` (21.799 b) es un **tercer armador de prompt** en el front-end de CopyLab. Mientras exista, "CopyLab es el único generador" es falso dentro de CopyLab mismo.

## 2026-08-01 — Regla de nomenclatura de labs registrada · `_naming_rule` unificada en `_note` · contradicción del `flow` corregida

**Estado:** persistido en `ecosystem.json` v2026-08-01-v1 (+ derivados) y este log. Rama `ctx/labs-son-apps`; PR contra `main` abierto por CC. **CC no mergea.**

**Qué se registró.** La regla de nomenclatura de los labs pasa a ser texto canónico e **INVIOLABLE** en `ecosystem.json → labs._note`: cuando Sam dice **CopyLab, ImageLab, SocialLab, VideoLab, VoiceLab, WebLab, AgentLab o BlueprintLab** se refiere SIEMPRE a **estas apps** —repo propio, UI para trabajo humano, modo dual `sync` (UI) + `async` (carril)—, **nunca** a un servicio genérico, una función, un stage del pipeline ni un módulo interno. Un lab es una aplicación con **superficie humana**; el motor que lleva dentro es intercambiable, el lab no. Si un carril necesita la capacidad de un lab, **lo llama por su `api_endpoint`** — no construye su propio motor. Precedente vivo: `generadorLocal`, motor duplicado dentro de `content-run-stage` que dejó a CopyLab fuera del carril async durante meses (ver la entrada del 2026-07-31, *el desvío el generador local*).

**Unificación `_naming_rule` → `_note`.** La clave `_naming_rule` (introducida el 2026-07-31) existía **sólo** en `ecosystem.json` — barrido del árbol + `grep`: ningún `api/*.js` la consumía. Se **eliminó** y su contenido, reescrito, vive ahora dentro de `labs._note`. Una sola fuente de la regla.

**Contradicción del `flow` corregida.** En `iid_subsystem.pipeline.flow`, el fragmento `Builder el generador local ⚠️DESVIACIÓN` se reemplazó por una nota que lo nombra **desvío a corregir, NO arquitectura**, describe el síntoma (el stage `copylab` ignora su `api_endpoint` de `lab_configs` y usa un motor local; lo mismo `sociallab`/`runSocialLabDirect`) y remite a `labs_wiring`, que sí declara la arquitectura correcta.

**Brief de CopyLab persistido.** `PROYECTO_COPYLAB_hereda_y_profilaxis.md` (raíz) recoge las tres fases: **A** — las 5 capas de gobierno que el generador único hereda de CopyLab (de ellas, voz-por-destino y reglas del Watcher son **portación real**), más 2 correcciones propias (`packInstructions` fuerza CTA; idioma ignorado) y 2 abiertas (falta el `await` de `upsertSnapshot`; catálogo de 44 vectores aún monoindustria); **B** — `execLab` en el stage `copylab`, `generadorLocal` se retira **sólo** con las 5 capas presentes y una corrida verificada; **C** — SocialLab, mismo patrón. Principio de cierre: **ningún carril construye el motor de un lab que ya existe.**

**Confirmación de nomenclatura** añadida a la respuesta de apertura de `HRD_PROTOCOLO_ACTUALIZACION` (los labs son apps del ecosistema, no servicios genéricos).

**Pendiente dedicado nuevo — discrepancia estático↔repo.** El `ecosystem.json`/`AGENDA.md` **servidos por Vercel** difieren en bytes de los de `main`. Diagnóstico parcial de esta sesión: el árbol de trabajo local está en **CRLF** (`core.autocrlf=true`) y el blob de git en **LF** (`ecosystem.json`: blob 48.180 b / árbol 48.890 b, delta exacto = 1 CR por línea) — normalización de fin de línea, esperada en Windows y **no** corrupción. **Pero** los tamaños del brief (54.681 / 172.440) no coinciden ni con el blob ni con el árbol local, así que **falta confirmar contra el estático realmente servido por Vercel**. Se deja como **ventana dedicada**, no resuelta en este PR.

## 2026-07-31 — Instrumentación de costo end-to-end, el Builder lee las reglas que lo juzgan, y el desvío el generador local identificado

**Estado:** aplicado y verificado en producción. **16 migraciones**, todas desplegadas y verificadas:

- **M-0** — GRANTs + precio de Sonnet 5 sembrado (la tarifa vive en `ops_lab_rates`, nunca literal en código; ver skill `cost-layer`).
- **M-4** — ledger contable (`ops_generation_ledger` como fuente de asientos) + `ops_lab_rates` con vigencia (`status ∈ {vigente, previsto, historico}`, `effective_from`/`valid_to`/`auto_promote`).
- **M-4c / M-4d** — el asiento congela la tarifa al momento (uuid de la fila de `ops_lab_rates` guardado en la referencia); precedencia **lab-específico > genérico** (`lab IS NULL` aplica a copylab/aife/sociallab/watcher por igual — todos pagan el mismo precio de Anthropic; una fila lab-específica sólo existe con precio propio real, p. ej. `imagelab/gemini`). Reparación de `ops_log_generation`, que estaba rota tras eliminar la firma de 4 args de `ops_compute_cost`.
- **M-6** — `ops_promote_rates` + `ops_rate_transitions` + cron 38 a las **06:00 UTC**, con `auto_promote=false` en el flip de gemini (no se auto-promueve; se revisa a mano).
- **M-7** — `voice_id`, `source_app`, `api_key_ref` + vistas `v_cost_pivot`, `v_cost_por_dimension`, `v_rate_gaps`.
- **M-8b / M-8d** — `ops_invoice_by_app` sin escritura anónima + `v_reconciliacion` + `api_key_ref` en `ops_token_sessions`.
- **M-10 / M-11 / M-12** — filo de UNRLVL `5/10` en el genoma, canon de idiomas **NEUTRO** con la excepción de **Conectando**, `intel.rule_param_sources`, y el eje `languages`.
- **M-14** — 5 reglas reescritas por procedimiento + `HR-GEN-06/07/08` de gramática.
- **M-15** — perfiles de copy y humanización de **LucienSael** (`brand_copy_profiles` + `humanize_profiles`): era la única marca de 10 sin ellos. Incluye su política de hashtags y firma (ver §4).

**PRs mergeados y desplegados:** #41 #42 #43 #44 #45 #46 #47 #48 #49 #50 #52 (iid-functions) · #1 #2 (unrlvl-ops) · #22 (context) · ImageLab #10 · CopyLab #6.

**Primera medición real del carril** (fin del "full_scan nunca fue el riesgo, medímoslo"): **5 piezas, 5 PASS, $0,0681 por pieza publicada.** Reparto por lab:

| Lab | % del costo por pieza |
|---|---|
| imagelab | 58,7 % |
| copylab | 28,4 % |
| aife | 5,6 % |
| sociallab | 3,7 % |
| watcher | 3,5 % |

Confirma con dato lo que era estimación: **full_scan nunca fue el riesgo; la imagen es el 59 %** del costo por pieza y sigue siendo constante sin medir. (Cifras del método de reconciliación jul-2026; la tarifa canónica sigue viviendo en `ops_lab_rates` vía `ops_resolve_rate`.)

**Coste de prueba separado** (para no contaminar la línea de producción): `source_app='iid-carril-test'` — 40 asientos / $0,6030, distinguible de $1,0626 de producción y $2,7192 de línea base. El eje `source_app` (M-7) es lo que permite aislar el costo de las pruebas del costo real.

**El hallazgo mayor — el desvío `generadorLocal`.** El carril async escribe con `generadorLocal`, **motor local en `content-run-stage`**, mientras `lab_configs` declara `copylab → unrlvl-copy-lab.vercel.app` y **nunca lo invoca**. Lo mismo con sociallab (`runSocialLabDirect`). Prueba comparativa del 31-jul con CopyLab entero: **ninguno gana completo** — CopyLab tiene motor creativo y cero gobierno; `generadorLocal` tiene gobierno y ningún ángulo. **CopyLab es el ganador porque es el lab:** UI, modo dual, superficie humana. La regla de nomenclatura inviolable queda fijada (ver `ecosystem.json → labs._note` y `labs_wiring`): **ningún carril construye el motor de un lab existente — lo llama por su `api_endpoint`.** `generadorLocal` es el precedente del desvío, marcado en `ecosystem.json` con ⚠️ DESVIACIÓN a corregir (NO arquitectura). La corrección converge con el Proyecto UNIFICACIÓN (BLOQUEANTE R4B).

**En §4:** los dos modelos de filo, el canon de idiomas con la excepción de PatriciaOsorioConectando (aprendizaje del Professor 6-jul), y la política de hashtags y firma de LucienSael.

## 2026-07-31 — El Builder lee las reglas que lo juzgan · el filo por registro · el idioma como eje (M-9 + M-12)

**Estado:** tres frentes cerrados sobre el mismo patrón de fondo. Tres PRs en `unrlvl-iid-functions` (A y B) + esta doc en `unrlvl-context` (C). CC no mergea; deploy manual posterior.

**El patrón, repetido tres veces esta sesión.** El dato existía; el consumidor no lo consultaba.
1. **M-9 (PR #48, MERGEADO):** P3 (27-jul) migró el Watcher a `intel.watcher_rules`, pero el Builder siguió leyendo `topic.hard_rules` → prescriptor y juez sobre catálogos distintos. 7 de 8 piezas rechazadas por reglas que el Builder nunca vio. Ahora `generadorLocal` recibe las MISMAS reglas que el juez (misma precedencia, filtradas a las imperativas) con el **código visible**: si el Watcher cita `HR-LUC-07` y el Builder lo tenía, incumplió; si no lo tenía, falló el sistema.
2. **M-12·A (PR #49):** `injectRuleParams` resolvía `{{filo}}` sólo contra `hard_rules` → Lucien (filo-de-voz, en el genoma) no era juzgado por su propio filo. Ahora `intel.rule_param_sources` declara las fuentes por dato; el resolvedor recorre por precedencia (topic 30 > genoma 10) y el valor viaja **crudo** (el juez es multilingüe). Ver §4 → *El filo — dos modelos*.
3. **M-12·B (PR #50):** `public.brand_languages` existía (9 marcas, hasta 3 idiomas) y el carril nunca la leía. Ahora el idioma es **eje ortogonal** del fan-out: una fila por (plataforma × voz × idioma), transportada por `brand_topics.languages` → `iid_content_queue.language` → `builder_input.language` → IDIOMA OBLIGATORIO del Builder. Retrocompat total: `NULL` → comportamiento de hoy. Ver §4 → *El canon de idiomas*.

**El principio transversal (nuevo canon):** **el idioma es dato de marca, nunca dimensión del código.** Ningún idioma se enumera en `.ts`; una marca nueva en valenciano es un `INSERT`. Su **corolario**, que esta sesión demostró tres veces: **toda regla debe declarar quién la lee.** Una regla, un filo o un idioma que el consumidor no consulta es exactamente lo mismo que no existir — y el fallo es silencioso, que es el peor modo de fallar (patrón #97, ya con 3 réplicas).

**Advertencia de volumen (M-12·B, al poblar `brand_topics.languages`):** UnrealvilleStudio y NeuroneSCF ×2 (3→6 piezas/finding); ForumPHs ×1 (1 idioma); LucienSael ×1 (0 idiomas activos); DiamondDetails ×3 hipotético (3 idiomas, aún sin `brand_topics`). Sin scheduler, el único control de cadencia es el número de findings. Poblar es un acto por marca, reversible.

**Fuera de alcance (los tres frentes):** el Watcher, la precedencia de `watcher_rules`, `psycho_presets`, y poblar `languages` en marcas de producción.

**PRs:** iid-functions #48 (M-9, mergeado), #49 (M-12·A), #50 (M-12·B) · unrlvl-context (M-12·C, esta doc).

## 2026-07-29 — Watcher: reglas enumeradas, precedencia por sector y full_scan

**Estado:** Watcher cerrado como instrumento. Carril vacío y armado, esperando activación de agentes IID.

**Punto de partida:** `gate6HardRules` guardaba prosa del modelo como si fueran códigos de regla —el parser partía por comas el texto libre— y `gate4Evidence` estaba cableado a UnrealvilleStudio y LucienSael, devolviendo `pass:true` para el resto: ForumPHs y NeuroneSCF cruzaron 7 corridas por un gate que no las juzgaba.

**Entregado:**
- `intel.watcher_rules` — 54 reglas enumeradas con código citable. Columnas `subject` (materia, eje de agregación del corpus), `sector`, `scope` (GENERATED: brand/sector/gen).
- `intel.brand_sector` — 9 marcas. Sectores RETAIL, LEGAL, PERSONA. UnrealvilleStudio sin sector: es la casa.
- Precedencia por `subject`: brand > sector > gen. Verificada contra datos vivos — 2 desplazamientos, ambos intencionales.
- Códigos atómicos: `HR-FPHS-11` partida en `HR-FPHS-11/12/13/14`; `HR-NSCF-08` acotada al mecanismo.
- Parámetros `{{clave}}` desde `brand_topics.hard_rules`. Sin resolver → regla omitida y registrada en `skipped_unresolved`, jamás enviada cruda.
- `HR-GEN-01` completitud: rescatada del cableado de Lucien a transversal. Cazó una pieza truncada en su primera salida.
- `watcher_full_scan` — flag global en `intel.iid_scheduler_config`. **ENCENDIDO.**
- Badge de bandeja + `intel.approval_calibration.watcher_rules` / `watcher_rules_evaluated`.

**PRs:** iid-functions #37, #38, #40 · Orchestrator #17, #18.
**Deploys:** `content-run-stage` _53 → _57 · `content-watcher` _17 → _18. Byte-identidad verificada.

**Cobertura ganada:** D7Herbal, VizosCosmetics, VivoseMask y DiamondDetails pasaron de 0 reglas a 6 de texto y 6 de imagen heredando de RETAIL, sin calibración manual. D7Herbal —ingerible— queda cubierta por `claim_medico` por pertenencia al sector.

**Carril vaciado:** 7 queue, 4 findings, 2 piezas, 7 jobs, 17 `watcher_log`, 2 `scheduled_posts`, 36 objetos de storage. Preservadas las 132 filas de `ops_generation_ledger` como línea base de costo. `intel.approval_calibration` estaba en 0: no se perdió ningún veredicto.

**Hallazgos abiertos:**
- Solo `iid-brief-biweekly` (jobid 2) está activo de 27 agentes IID. Sin activación manual no hay tanda hasta el 1-ago 07:00 UTC.
- 2 `scheduled_posts` quedaron en `pending_publish` 24 h después de su hora: el publicador no corrió o falló en silencio.
- FK circular `orchestrator_jobs.piece_id` ↔ `content_pieces.job_id`: ningún orden de borrado funciona sin NULL previo.
- 12 reglas `IMG-*` sembradas sin gate que las lea. Diferido a la decisión sobre ImageLab.
- `professor_learnings.category` tiene 150+ valores distintos mezclando idioma y capitalización.

## Sesión 2026-07-25b — R4B calibración de aprobación + diagnóstico de unificación

**B4 fase 1 (calibración de aprobación) — validado end-to-end:**
- Bandeja de calibración "ve TODO" operativa (PR #14 + #15 mergeados). Fuente única content.orchestrator_jobs; orchestrator_jobs.id = piece_id del corpus. Muestra aprobadas (awaiting_approval) + rechazadas por watcher (failed + assets.watcher.result=REJECT), con veredicto del watcher visible. Corpus intel.approval_calibration guarda doble veredicto (Sam + watcher: columnas watcher_result/watcher_gate).
- EF iid-approval-digest v2 + cron diario 7am ET (from: Content Queue <content@unrealvillestudio.com>).
- Fixes de render: bucket unrlvl-media acepta text/html; render vía iframe srcdoc (Supabase sirve público como text/plain+nosniff).
- 2 findings de calibración sembrados (FPHs el-futuro-de-tu-patrimonio-jd, NSCF frizz-humidity) → 7 piezas (2 PASS + 5 REJECT-watcher con copy real). Tag [CAL-01].

**Cura de hardcode:** CHECK iid_content_queue_voice_check (6 voces hardcoded) → reemplazado por trigger dinámico intel.validate_queue_voice() que valida contra brand_voice_genome activo. Migración iid_queue_voice_validation_dynamic. Desbloqueó 5 voces.

**Diagnóstico mayor (bloqueante R4B):** 3 generadores de brand-cache desalineados + 2 generadores de texto duplicados; capa creativa de CopyLab nunca ejecutada en el carril. Ver proyecto de unificación (abajo).

**Hallazgo:** el Builder del carril async es el generador local LOCAL en content-run-stage (no CopyLab externo, que queda como lab sync/duplicado). El watcher juzga copy, no imagen.

**Professor:** 6 learnings capturados (approved_by_sam), session_date 2026-07-25.

### 2026-07-25 — R4B carril async: deploys verificados + smoke test PASS

**Deploys (byte a byte contra main):** iid-core v35→v36 (#93 fan-out multimarca, sin generación de copy), content-dispatcher v35→v36 (B2 agenda + B3 limit=5), content-run-stage v51→v52 (#95-D email_propietarios sin imagen). Drift repo↔deploy del carril CERRADO. Transporte del index.ts de 92KB resuelto: Sam sube el archivo, normalización CRLF→LF con Python, verificación de git blob sha1 idéntico a main antes de deployar.

**Hallazgo bloqueante corregido:** el smoke destapó que `service_role` (rol de las EF) no tenía GRANT sobre 3 tablas de `public` — bloqueante latente de TODO el fan-out (`FANOUT_PRESETS_FAILED: permission denied for table psycho_presets`). El fail-loud funcionó (gritó en vez de fallar en silencio). Migración `grant_service_role_public_iid_carril`: SELECT en psycho_presets, SELECT+INSERT en scheduled_posts, SELECT+UPDATE en ops_generation_ledger. Learning de calibración: verificar grants de service_role sobre tablas nuevas de public es check obligatorio.

**Smoke test end-to-end: PASS.** 2 findings sintéticos (LucienSael ai-cognition + ForumPHs el-futuro-de-tu-patrimonio-jd), ya limpiados. Validado en vivo: #93 fan-out (Lucien+UNRLVL comparten ai-cognition → 8 filas; FPHs → 4), brief neutro en aife_output.content.content (no copy de iid-core), U4 una fila por plataforma, Ruta B/C.3 preset-por-objetivo (mapeo jd exacto: blog_forumphs→PSY-TRUST, linkedin→PSY-AUTHORITY, meta→PSY-CURIOSITY), B2/B3 dispatcher limit=5 (3 corridas para 12 filas), builder desde genoma con títulos de marca propios, canales visuales correctos (#95-D: FACEBOOK_FEED/X_FEED/INSTAGRAM_FEED), Watcher discriminando: LucienSael lucien_social ×4 PASS, UNRLVL 1 PASS + 2 REJECT(evidence), FPHs fphs_conversion ×4 REJECT(hard_rules). Los REJECT son de MARCA sobre briefs sintéticos pobres — el gate haciendo su trabajo, no fallo técnico (labs_status entero ok, error_log vacío). REJECT de marca no dispara alarma Watcher-ciego.

**Mecanismo de invocación documentado:** iid-core NO exige secreto (IID_CORE_SECRET no seteado en entorno EF). content-dispatcher SÍ exige IID_CRON_SECRET (401 sin él); vía canónica desde Postgres: `SELECT intel.trigger_iid_agent('content-dispatcher')` (SECURITY DEFINER, lee secreto de intel.iid_scheduler_config, header x-cron-secret; misma que usa el cron jobid 29). Secretos EF NO están en Vault. Ningún cron drena scheduled_posts → escribir pending_publish no publica en redes por sí solo.

**Hallazgos pendientes:** (1) D7Herbal genoma huérfano — d7herbal_conversion v1.0 activo pero cero filas en brand_topics, no puede correr el carril async; (2) B4 cadencia sigue bloqueante para R4B pleno (ejecutor de agenda sobre pg_cron, requiere siembra de dato inexistente); (3) objective_by_platform NULL en topics de Lucien/NSCF/UVS + imagelab_visual_identity NULL en ForumPHs (imagen genérica).

**Mañana:** encender R4B para evaluación funcional + calidad ICR (Industrial Consistency Ready) sobre resultados que Sam pueda evaluar.

## 2026-07-20/21 · CRAFT-01 CERRADO Y MERGEADO — el arsenal opera en el runtime · 9 módulos canónicos · truncado por `thinking` descubierto y corregido

**Conducido por:** Claude Opus 4.8 (coordinación, diseño, briefs, verificación) + chat auxiliar (redacción de los 9 módulos) + Claude Code (implementación y QA en vivo) + Sam (decisiones y merge)
**Resultado:** **PR #13 MERGEADO.** El arsenal de comunicación se inyecta en cada turno del bucle de calibración, en el chat y en el Seeder por igual. La brecha que `comm-arsenal` §12 declaraba —"los skills solo operan cuando Claude escribe en el chat"— está cerrada.

---

### 1 · Los 9 módulos de runtime — escritos y canónicos

Escritos en chat auxiliar, pusheados por Sam a `unrlvl-context/skills/comm-arsenal/runtime/`:

| Módulo | Bytes | Tokens (est. +30% tokenizer) |
|---|---|---|
| `core.md` | 2.316 | ~714 |
| `structure.md` | 2.155 | ~718 |
| `written.md` | 2.166 | ~746 |
| `oral.md` | 2.280 | ~777 |
| `psy_CONVERSION.md` | 1.106 | ~369 |
| `psy_COMMUNITY.md` | 1.113 | ~382 |
| `psy_AUTHORITY.md` | 1.379 | ~417 |
| `psy_BRIDGE.md` | 1.192 | ~411 |
| `profile_conversion.md` | 2.350 | ~827 |

**Qué SON estos módulos (decisión de diseño, no negociable):** NO son un resumen del skill. Son las **REGLAS EJECUTABLES**; el skill es su **EXPLICACIÓN**. Dos artefactos distintos, no el mismo en dos tamaños. Redactados como **restricciones y prohibiciones**, nunca como recetas — ese es el antídoto contra el riesgo de que el generador produzca texto que suene a manual de copywriting (`comm-arsenal` §9.1).

**Tres decisiones tomadas con el contrato a la vista:**
- **`psy_BRIDGE` NO hereda de AUTHORITY.** La familia es excluyente (solo se carga una), así que heredar habría significado duplicar texto de AUTHORITY dentro de BRIDGE — exactamente lo que "orquestar, no duplicar" prohíbe.
- **Reparto PSY vs profile:** el PSY lleva la **restricción de estímulo** (qué siente el lector); el profile lleva la **parametrización de voz** (filo, cierre, blanco) y sus técnicas propias. Un módulo responde "qué empuja", el otro "cómo suena quien empuja".
- **NO se copió `injection_copy` de `psycho_presets`.** Esa tabla la consume `fanout.ts`; una copia en el módulo sería una segunda fuente que se desincroniza al primer UPDATE. Es el mismo fallo silencioso que el sprint perseguía.

**Los 4 psy quedaron por debajo del piso de 600 tokens (369-417) — a propósito.** Cada uno es una restricción de estímulo, no un cuerpo de doctrina; lo transversal ya vive en `core` y `structure`. **Corolario inverso, útil como alarma:** si un psy creciera a 700, habría que sospechar duplicación.

**Restricción de formato que el brief no tenía:** `stripProvenanceHeaders` borra **TODO** comentario HTML (`/<!--[\s\S]*?-->/g`), no solo la cabecera. Ningún módulo puede usar comentarios HTML internamente. Y si tras limpiar queda vacío → `errors`.

---

### 2 · El hallazgo que casi cierra el sprint en falso: TRUNCADO POR `thinking`

**El QA en vivo reveló que el feature no producía turnos utilizables.** Dos de los tres casos daban 502:

- **Camino feliz** (5 módulos, prefijo 6.046 tok): `stop=max_tokens out=2048 blocks=[thinking]` → el bloque de thinking consumió **el presupuesto entero**, cero bloques de texto → `generation_failed` ("Anthropic sin texto").
- **NeuroneSCF degradado** (2 módulos, prefijo 8.295 tok): el texto arrancó pero se cortó → **JSON inválido**.
- **D7Herbal degradado** (prefijo 3.627) sí generaba.

**Causa raíz:** el bloque `thinking` de `claude-sonnet-5` **cuenta contra `max_tokens`**, y `max_tokens: 2048` era insuficiente cuando el prompt real crecía.

**Fix aplicado** (commit `2811bb7`): `thinking: { type: 'disabled' }` — la tarea es **determinista** (generar una pieza siguiendo restricciones declaradas), no exploratoria — **más** `max_tokens: 2048 → 4096` por margen.

**Re-QA: los tres casos verdes.**

| Caso | `injected` | `stop_reason` | `out=` |
|---|---|---|---|
| 5 — sin selectores (D7Herbal) | `[core, structure]` · skipped 3 · errors 0 | `end_turn` | 209 |
| 6 — NeuroneSCF NULL (peor prefijo) | `[core, structure]` · skipped 3 · errors 0 | `end_turn` | 472 |
| Camino feliz — 5 módulos | `[core, structure, written, psy_CONVERSION, profile_conversion]` · skipped 0 · errors 0 | `end_turn` | 157 |

El Caso 6 corrió sobre **la misma sesión de NeuroneSCF que truncaba antes** — la prueba más fuerte de que el fix funciona.

---

### 3 · Números reales medidos (reemplazan las estimaciones del diseño, que erraban al 50%)

| Métrica | Estimado (18-jul) | Real medido |
|---|---|---|
| Prefijo estable, camino feliz | ~3.400 tok | **6.046 tok** |
| Prefijo, degradado D7Herbal | — | **3.627 tok** |
| Prefijo, degradado NeuroneSCF | — | **8.295 tok** |
| `cache_read_input_tokens` turno 2 | — | **3.627** (caching CONFIRMADO) |
| Salida por turno | — | **157-472 tok** (techo 4.096) |

**El factor dominante NO son los módulos: es `brandKnowledge`.** NeuroneSCF llega a 8.295 con solo 2 módulos porque su contexto de marca pesa 7.362. Los 3 módulos extra del camino feliz aportan 2.419.

**Y eso está BIEN.** Se propuso un ítem #78 para "acotar `buildBrandKnowledge`" y **se retiró tras el cuestionamiento de Sam**: `max_tokens` limita solo la SALIDA (los `out=` reales son 157-472 contra techo 4.096); el input tiene la ventana del modelo (~200K) como límite, o sea **dos órdenes de magnitud de margen**. Además el prefijo grande es el que se **cachea**. Acotarlo habría degradado la generación para ahorrar centavos. Un contexto de marca grande es señal de marca bien poblada, no un problema.

El **#79** propuesto ("fallback ante prompt sobredimensionado") también se retiró: no hubo tal problema — hubo un problema de `thinking`, ya resuelto. La vigilancia queda cubierta pasivamente por la instrumentación de logging.

---

### 4 · Deuda #75 cerrada — y el arreglo fue QUITAR código

`craftWarnings()` traducía los `SkipRecord` a frases en minúscula antes de mandarlas al front, que las volvía a mapear. Dos capas de traducción encadenadas: tocar la frase intermedia rompía el mapa **en silencio**.

Al leer el código se verificó que **`SkipRecord` ya expone `module` y `reason` por separado** — el código estable ya viajaba y se estaba descartando. El fix: dejar de traducir en el backend; el front mapea **una sola vez sobre `reason`** (`ARTEFACTO NO DECLARADO`, `MODO NO DECLARADO`, `FAMILIA NO DECLARADA`, `TIPO DE VOZ NO DECLARADO`), con fallback pass-through para razones sin mapa.

**Verificado en vivo** en las ramas normales de `start` **y** `verdict`.

---

### 5 · Instrumentación permanente (desviación de CC, aceptada)

CC detectó que `usage` y `stop_reason` de Anthropic eran **inobservables desde fuera** y añadió una línea de log en `generateTurn`, fuera del brief.

**Sin esa línea, el re-QA habría reportado verde con el feature roto.** Se decidió que **queda como instrumentación permanente**, no como andamio de QA, y su comentario se reformuló en ese sentido. Es el mismo principio que separar `skipped` de `errors`: lo que no se puede ver no se puede diagnosticar.

---

### 6 · Estado final del sprint

**MERGEADO.** `api/craft-modules/` y `api/_craftModules.ts` vivos en `main` de Orchestrator. 7 commits en el PR.

- 3 columnas en `intel.calibration_sessions` (`voice_type`, `target_artifact`, `psy_family`) — aplicadas en prod, 10 filas existentes en NULL = modo degradado.
- Front del Seeder con 3 selectores + aviso no bloqueante + 3 ajustes de UX (la jerga de Claude salió de la interfaz).
- Prompt caching funcionando.
- **Marisol puede calibrar con el arsenal operando en el runtime.**

**Pendientes que deja abiertos:**
- **#77** — perfiles `profile_editorial` / `profile_educative` / `profile_professional` no existen. Al declarar esas voces, el módulo cae a ENOENT → `errors` (no `skipped`), y el operador ve un warning de fallo de LECTURA cuando en realidad es contenido no escrito. No tumba el turno (core+structure entran igual), pero ensucia `errors` y **entrena al operador a ignorarlo** — justo lo que el sprint quería evitar. Impacto en calidad: esas voces se calibran sin su parametrización.
- **#76** — sacar la advertencia de asimetría de `r4b-genome-calibration` §3: dejó de ser cierta con el merge.
- La UI no distingue "no escrito todavía" de "ilegible" — ambos colapsan en `errors`.

---

### 7 · Aprendizajes del tramo (7 learnings en Professor)

**Críticos:**
1. **Confundí el límite de input con el de output** y construí una deuda de arquitectura falsa encima. Sam lo cuestionó con la pregunta correcta: *¿por qué acotar aunque no genere bien?* Un número estimado no fundamenta una deuda; se mide primero.
2. **`thinking` de sonnet-5 compite por `max_tokens`.** En toda llamada con tarea determinista y prompt grande debe ir explícitamente `disabled` — el default lo habilita.

**Altos:**
3. **La degradación elegante NO protege del tamaño del prompt.** Son dos fallos distintos que yo había mezclado: cubre la ausencia de datos, no el volumen. Al diseñar un fallback, nombrar de qué protege y de qué NO.
4. **La instrumentación que hace visible el fallo es parte del feature**, no andamio.
5. **Leer el código antes de diseñar el arreglo** — el dato correcto puede estar ya presente y descartándose (#75). Corolario: el gh proxy acepta `?branch=`, así que se puede leer código de una rama de PR sin pedirle `cat` a CC.
6. **Placeholder vacío = fallback que no dispara** (confirmado en la práctica). Razón concreta de que la definition of done fuera "módulos reales + QA en vivo", no "build verde".

---

## 2026-07-18 · comm-arsenal + r4b v1.1 + INDEX v1.9 · Sprint CRAFT-01 (el arsenal llega al runtime) · UX del Seeder

**Conducido por:** Claude Opus 4.8 (chat: diseño, skills, briefs, verificación) + Claude Code (implementación) + Sam (decisiones y merges)
**Foco:** cerrar la familia VOICE de skills, y después resolver el problema que esos skills declaraban pero no resolvían — que solo operan cuando Claude escribe en el chat.

---

### 1 · comm-arsenal v1.0 — el cuerpo de técnicas (PR #9 mergeado)

**Por qué nació:** `voice-craft` §2 exige "operar el arsenal con oficio" pero **no entrega el arsenal** — da cinco principios de ejecución y ocho recursos sintácticos. Es el mismo defecto que `voice-craft` diagnosticó en `calibrate.ts` (*enumera, no opera*), un nivel más arriba. `comm-arsenal` es el cuerpo que faltaba.

**Arquitectura:** UN SOLO skill con separación interna oral/escrito. El repertorio (estructuras persuasivas, niveles de conciencia, jerarquía de objeciones, prueba, apertura, cierre, reencuadre, contraste, analogía) es IDÉNTICO en ambos canales; lo que difiere es la EJECUCIÓN (redundancia, respiración, ausencia de scroll, puntuación vs pausa). Eso es parametrización, no cuerpo distinto. Dos skills habrían duplicado el núcleo y se habrían desincronizado.

**Contenido (12 secciones):** estructuras persuasivas con tabla de selección · niveles de conciencia del mercado · repertorio de aperturas con sus fallos por canal + tabla de aperturas PROHIBIDAS con su alternativa demostrativa · jerarquía de prueba (6 escalones, el 6º —credencial declarada— PROHIBIDO) · manejo de objeciones (raíz vs satélites) · contraste/analogía/especificidad/reencuadre · tipología de cierres · ritmo y forma de la frase · ejecución escrita (§7) · ejecución oral (§8, incluye §8.7 "por qué un texto escrito leído en voz alta casi siempre falla" con test verificable) · anti-patrones · checklist.

**Dos disciplinas de diseño que lo gobiernan:**
- **FILTRO obligatorio (§0.2):** ninguna técnica entra "limpia". Las que violan las reglas duras del ecosistema entran MARCADAS COMO PROHIBIDAS con su alternativa demostrativa — porque están en todos los manuales y un generador las produciría por defecto si no se las nombra para vetarlas.
- **ANTI-ENCICLOPEDIA (§0.3):** una técnica entra solo si CAMBIA UNA DECISIÓN CONCRETA AL ESCRIBIR. Quedaron fuera: taxonomías de figuras retóricas, Cialdini como catálogo (ya vive operativo en los 13 psycho_presets), historia del copywriting, viaje del héroe.

**Dos correcciones de Sam antes de subirlo:** (a) la fila "Muy consciente" de §2 llevaba "urgencia legítima" sin restricción → se le añadió la de §0.2.5 (no romper calidez, no prometer, no inventar cifras); (b) la tabla de estructuras era tan clara que invitaba a ejecutarla como receta de frases → línea dura al pie: *"La estructura ordena los MOVIMIENTOS; jamás dicta las FRASES. Si dos piezas comparten estructura, deben ser irreconocibles entre sí."*

**Contradicción aparente marcada a propósito:** §4.5 (especificidad: el dato exacto ES la credencial) vs §8.6 (léxico oral: "casi tres de cada cuatro" retiene mejor que "73,8%"). No es inconsistencia — es la misma regla ejecutada en un canal donde el oyente no puede releer. Señalado en el texto para que nadie "corrija" uno de los dos.

---

### 2 · r4b-genome-calibration v1.0 → v1.1 (mismo PR)

El skill se escribió el 13-jul, ANTES de que existieran `voice-craft`, `voice-conversion` y `comm-arsenal`, y no los mencionaba — mientras el INDEX v1.8 ya declaraba que los invoca en la fase de voz. **Skill e INDEX contradictorios = el anti-patrón de dos vocabularios**, el mismo que este ecosistema ya pagó caro.

Corregido en 3 puntos, todo lo demás intacto:
- **§3** — carga obligatoria de la familia voice + **advertencia de asimetría**: el camino "Sam en el chat" carga los skills, el camino "delegado vía Seeder" NO (calibrate.ts no lee skills) → las dos vías no producen la misma calidad. *Sale cuando el sprint CRAFT-01 esté mergeado.*
- **§7** — la delegación de método se reparte: MÉTODO del bucle en `genome-calibration`; OFICIO en `voice-craft`; REPERTORIO en `comm-arsenal`; PARAMETRIZACIÓN por tipo de voz en los perfiles.
- **§8.3** — orden de ejecución actualizado.

**INDEX v1.9** con la regla de carga dura: **`voice-craft` + `comm-arsenal` SE CARGAN JUNTOS, SIEMPRE.** Cargar uno sin el otro reproduce el defecto que ambos diagnostican: principios sin cuerpo.

---

### 3 · Sprint CRAFT-01 — diseño de cómo el arsenal llega al runtime

**El problema declarado por los propios skills:** los 3 skills de voz (~50KB) solo operan cuando Claude escribe en el chat. El carril automático y Marisol (Seeder) no cargan skills. **Cada mejora a los skills AMPLÍA la brecha.**

**Lo que el código real reveló** (leídos `_genomePromptBuilder.ts` y `calibrate.ts` completos):

1. **La infraestructura de inyección YA EXISTE y está bien hecha.** `buildBrandKnowledge()` es función pura de solo lectura con lector inyectado, degradación elegante y log de trazabilidad. No había que construir el mecanismo — había que agregarle una fuente. Abarató el sprint sustancialmente.
2. **`buildSystemPrompt` ya tenía el hueco señalado.** El bloque `TECHO DE PRODUCCIÓN` decía: *"Elige una técnica DISTINTA (escena, contraste, analogía, dato-ancla, reencuadre, objeción anticipada, testimonio, diagnóstico, principio invertido, etc.)"*. Once nombres y un "etc.". El lugar del arsenal estaba marcado y vacío.
3. **HALLAZGO — el artefacto de destino NO EXISTE en el esquema.** `calibration_sessions` no tiene canal, ni formato, ni extensión; el prompt tampoco. **El párrafo largo para feed de IG del 17-jul no fue descuido del operador: el sistema no tenía dónde declararlo.** `voice-craft` §3 lo había puesto como regla dura, pero era incumplible por diseño.
4. **HALLAZGO — no se puede derivar el objetivo desde `brand_topics` en calibración.** `objective_by_platform` sigue NULL en las 16 filas, y **ninguna marca de Marisol tiene topics** — la fila ni siquiera existe. Razón estructural: en calibración la marca todavía no tiene topics, se están calibrando justamente para poder sembrarlos después. `brand_topics` es la fuente del PIPELINE, no del bucle.

**Diseño elegido — Opción B: destilación MODULAR seleccionada por contexto.** Descartadas: el skill completo (~50KB, insostenible), la destilación única (mezcla oral/escrito y conversión/editorial), y los módulos en DB (el contenido saldría del repo y se volvería invisible al PR — el drift entre repo y DB es peor que entre dos archivos, porque un lado no se revisa nunca).

**Sobre el DRIFT — la parte central del diseño.** La pregunta "¿quién mantiene la destilación sincronizada con el skill?" tiene respuesta incómoda: nadie puede de forma fiable, **y por eso la destilación NO debe ser un resumen del skill.** Los módulos de runtime son las REGLAS EJECUTABLES; el skill es su EXPLICACIÓN. No es el mismo contenido en dos tamaños — son dos cosas distintas. El módulo dice *"nunca abras con una pregunta que pueda responderse en contra"*; el skill explica por qué, da el ejemplo y lo sitúa en el repertorio. Viven en el mismo repo (`skills/comm-arsenal/runtime/`) y el SKILL.md los referencia por sección: un PR que toca una regla y no toca su módulo es visible en el diff.

**Los 6 módulos:** `core` (filtro + anti-patrones, SIEMPRE) · `structure` (estructuras + niveles de conciencia, SIEMPRE) · `written` (§7) · `oral` (§8) · `psy_<FAMILIA>` (×4) · `profile_<tipo>` (hoy solo conversion). Presupuesto típico: ~3.500-4.500 tokens/turno; con prompt caching, ~400-600 efectivos tras el primero.

**Costo (no fue el factor decisivo):** con caché, ~$0,12 por bucle de 15 turnos vs ~$0,09 hoy. Siete bucles de Marisol: veinte centavos de diferencia. Lo decisivo es el tiempo de implementación y la superficie de riesgo.

---

### 4 · Sprint CRAFT-01 — ejecución (PR #13, ABIERTO)

**DDL APLICADO EN PRODUCCIÓN** (con OK de Sam, una sentencia por llamada): 3 columnas aditivas nullable en `intel.calibration_sessions` — `voice_type` (text), `target_artifact` (jsonb, incluye `mode: written|oral`), `psy_family` (text). Verificado: las 10 filas existentes quedan NULL → modo degradado, como se diseñó. Sin CHECK constraint (los 3 perfiles que faltan lo bloquearían al crearlos); validación en el endpoint.

**Construido por CC:** `api/_craftModules.ts` (builder puro/síncrono, hermano de `_genomePromptBuilder`) · 9 archivos placeholder en `api/craft-modules/` con cabecera de provenencia canónica · wiring en `calibrate.ts` (validación, persistencia, prompt reordenado, caching, log, `craft_warnings`) · `vercel.json` con `includeFiles` · front del Seeder (3 selectores + aviso + warnings) · migration file.

**Técnica de carga elegida:** `fs.readFileSync(join(process.cwd(), 'api/craft-modules', file))` + `includeFiles` en vercel.json (precedente: ffmpeg-static). Evita `__dirname` (no existe bajo ESM nodenext) y una llamada de red por turno. Los .md quedan como fuente editable, sin build step.

**Degradación con columnas NULL — el requisito central.** Las columnas van a estar NULL en la MAYORÍA de sesiones durante la transición (las 10 existentes + toda sesión previa al front), no en una minoría. Regla: **degradación elegante, NUNCA inferencia.** Sin artefacto → solo `core`+`structure`, jamás adivinar el canal. Sin `psy_family` → sin módulo PSY, **no caer a AUTHORITY** (en `fanout.ts` ese default es correcto porque es decisión de publicación; en calibración sería fabricar un objetivo que nadie declaró). Sin `voice_type` → sin perfil, no derivar de `intent_label` por heurística de texto.

**Log que distingue ausencia de fallo.** Heredado del bug de `order=is_primary`, que se escondió días porque `safeRead` tragaba el 400 y `hasFormula=false` era idéntico a "no hay blueprints". El nuevo log separa `skipped` (ausencia DECLARADA) de `errors` (fallo de LECTURA) y **lista lo omitido, no solo lo inyectado** — la diferencia entre encontrar el bug en diez minutos o en días.

**Condición dura de merge (§1 del brief):** el PR no se mergea sin los 3 selectores del Seeder operativos. Razón: un backend que lee 3 columnas NULL es indistinguible de uno que no las lee; ningún test de humo falla. Precedente exacto: `objective_by_platform`, vivo desde el 17-jul y NULL en las 16 filas porque nadie construyó el productor. **Aprendizaje: reordenar los pasos no protege — la definition of done explícita + confirmación obligatoria en el reporte, sí.**

**QA:** casos 1-4 verdes (22/22 assertions), typecheck API + build front OK. **Casos 5-6 (live) PENDIENTES** — requieren Preview deploy; CC los declaró "verificados por construcción", que es honesto pero no es verificado.

**⚠️ EL PR NO ESTÁ LISTO PARA MERGE.** Dos bloqueos: los 9 placeholders vacíos y los QA 5-6. **Desplegar con placeholders deja el sistema PEOR que antes:** el placeholder se lee correctamente (va a `injected`, no a `errors`), así que el fallback no dispara, y el `craftBlock` vacío REEMPLAZA el paréntesis enumerativo que sí existía.

---

### 5 · UX del Seeder — 3 ajustes de etiquetas (mismo PR #13)

Los selectores funcionaban y escribían bien, pero eran **inusables para Marisol**: valores crudos en inglés (`CONVERSION`, `BRIDGE`, `educative`) y vocabulario de diseño filtrado a la interfaz ("artefacto de destino", "afina el arsenal", "modo degradado", "dimensión", "piso del arsenal").

- **Ajuste 1** — etiquetas en español con glosa breve para Tipo de voz y Objetivo psicológico; canales con marca de cuáles son orales; ayuda contextual bajo cada selector.
- **Ajuste 2** — `ARTEFACTO DE DESTINO` → `DÓNDE SE PUBLICA`; ayuda reescrita; placeholders sin `≤` (se lee como error de codificación); `CONTEXTO DE LA PIEZA — afina el arsenal` → `CONTEXTO — ayuda al generador a afinar`. **`EJE FUNDADOR` conservado**: es término del método, vive en el Tratado y en la DB, y Marisol ya lo usa.
- **Ajuste 3** — aviso de modo degradado reescrito sin jerga; `craft_warnings` mapeados a texto legible; barrido de "pieza→texto" en microcopy preexistente.

**REGLA DURA en los 3: solo cambian las etiquetas visibles. Los valores enviados a la DB no se tocan** (`psy_family` sigue mandando `CONVERSION` en mayúsculas porque lo espera `TAG_TO_FAMILY` en `fanout.ts`).

**El criterio que ordenó los tres:** *lo que lee el operador va en su idioma; lo que leemos nosotros en logs se queda en vocabulario del sistema.* Dos audiencias distintas — se estaban mezclando. **Test: si para saber qué poner en un campo hay que haber leído un skill, la etiqueta está mal.**

CC distinguió bien dos sentidos de la misma palabra: cambió "pieza→texto" en el formulario y **conservó "piezas del pipeline"** en el stub de `from_genome`, donde significa otra cosa. Un buscar-y-reemplazar habría roto el segundo.

---

### 6 · Deuda detectada — `craft_warnings` mapea frase→frase

El front NO recibe los códigos crudos (`ARTEFACTO NO DECLARADO`): el backend ya los reduce a frases en `craftWarnings()`, y el front mapea frase→frase. **Si alguien toca la frase intermedia, el mapa deja de acertar en silencio** y el operador ve el texto intermedio. Nada rompe, nada se loguea — el mismo patrón de fallo enmascarado que perseguimos todo el sprint.

CC lo detectó, propuso la corrección y **no la hizo porque el brief decía "backend fuera de alcance"**. Comportamiento correcto de su parte; el error de alcance fue de Claude. **Regla: mapear siempre sobre el CÓDIGO estable, nunca sobre texto legible intermedio.** Se corrige en el mismo PR donde se sustituyan los placeholders (ahí ya se toca `api/`, coste marginal cero).

---

### 7 · Hallazgos de infraestructura

- **`api/` NO está en el grafo de `tsc -b`** del Orchestrator: ningún tsconfig lo cubre → `npm run build` **no typechequea los endpoints**. Todo cambio en `api/*` necesita typecheck standalone, con `--lib` que incluya DOM (los tipos de `fetch`/`Response.json()` lo requieren).
- **El proxy `/api/professor` YA EXISTE y funciona** (`HRD_PROTOCOL` lo daba como "PENDIENTE DE CONSTRUIR"). GOTCHA: `action=ping` no es acción válida y devuelve 500 → **el paso 1 del HRD_PROFESSOR, que verifica con ping, concluye erróneamente que el proxy no existe.** Verificar con `action=checkpoint`. Actualizar HRD_PROTOCOL.
- **`psycho_presets` vive en `public`, no en `intel`** (el insumo decía `intel.psycho_presets`). 13 filas activas. El mapeo objetivo→familia vive en `TAG_TO_FAMILY` de `fanout.ts`, no en la DB.
- **RLS — alcance preciso: 6 tablas** sin RLS en `intel` (`brand_topics`, `calibration_sessions`, `calibration_turns`, `captured_techniques`, `iid_seeds`, `watcher_log`); las 7 `iid_*` sí lo tienen. Refina #68 y la ventana de seguridad del 17-jul. **La superficie CRECIÓ hoy:** `calibration_sessions` sumó 3 columnas que exponen criterio de voz de marcas de clientes. Sigue LATENTE (`auth.users` vacía).

---

### 8 · Estado al cierre y qué falta para R4B del sprint

**Mergeado:** PR #9 (comm-arsenal + r4b v1.1 + INDEX v1.9).
**Abierto:** PR #13 (Orchestrator) — código completo, DDL aplicado, **bloqueado por módulos vacíos + QA 5-6**.
**Marisol NO puede trabajar con esto todavía.** Sigue calibrando como hasta ahora.

**Secuencia hasta R4B:**
1. Claude escribe los 6 módulos de runtime (~4.000 palabras de destilación — sesión propia).
2. Sam los coloca en `unrlvl-context/skills/comm-arsenal/runtime/` y pushea.
3. Brief corto a CC: copiar los contenidos reales sobre los 9 placeholders + corregir `craft_warnings` a códigos crudos. Mismo PR.
4. QA 5-6 en Preview (Claude, con la URL).
5. Sam revisa la UX del Preview con ojo de operadora y mergea.
6. Cierre: sacar la advertencia de asimetría de `r4b-genome-calibration` §3 (deja de ser cierta al mergear).

**Riesgo del paso 1 (~25%):** que los módulos, al ser prescriptivos, produzcan texto que suene a manual de copywriting — técnica visible, justo lo que `comm-arsenal` §9.1 prohíbe. Mitigación: redactarlos como restricciones y prohibiciones, no como sugerencias de qué hacer. Se detecta en los primeros 3 turnos de la primera calibración.

**Professor:** 12 learnings (3 críticos score 5, 4 altos score 4, 5 medios).

---

## 2026-07-17 — TANDA TÉCNICA IID: 5 frentes de deuda + Eje B VIVO + causa raíz de publicación + 6 EFs deployadas a prod

Sesión larga de ejecución (CC + Claude-chat), forense y deploy. Cierra el grueso de la deuda técnica del carril IID que venía arrastrándose. Al final: los 6 Edge Functions tocados quedaron **deployados y verificados en producción** (no solo mergeados) — con el hallazgo de gobernanza que lo enmarca.

### HALLAZGO DE GOBERNANZA (el más importante de la tanda)
**Mergear un PR a `main` NO deploya las Edge Functions de Supabase.** `main` solo actualiza el repo. El deploy de cada EF es un paso manual aparte (`supabase functions deploy` o `deploy_edge_function` vía MCP). Vercel SÍ auto-deploya al mergear (SocialLab, Orchestrator); las EFs de Supabase NO. Corolario: **un PR de EF mergeado ≠ EF viva en prod.** Esto casi hace que el Actualiza registrara Eje B como "vivo" cuando el código estaba en el repo pero las EFs corriendo eran las viejas. Regla nueva: tras mergear un PR que toca EFs, deployarlas explícitamente y verificar el build real por `entrypoint_path`.

### Los 6 deploys (Claude-chat, MCP, bajo HRD, cola seca)
Leídos de `main` vía gh proxy, deployados en orden de dependencia (modelos → Eje B → orquestador). Build real verificado por `entrypoint_path` (no el contador `version`, que incrementa en cada llamada a deploy sin importar si el contenido cambió):
- **aife-filter** `_15`→`_28` — Sonnet 5, max_tokens 2600, thinking disabled
- **brand-context-builder** `_6`→`_19` — Sonnet 5, 10400
- **iid-inbound** `_9`→`_14` — Sonnet 5, 910
- **content-watcher** `_13`→`_14` — **8 gates** (6 + gate7 objective_stimulus + gate8 visual_sibling)
- **iid-core** `_31`→`_32` — **Ruta B** (index.ts + fanout.ts juntos)
- **content-run-stage** `_49`→`_50` — pending_publish + image_url + catch propagado + gate7/8 ctx

### FRENTE A — línea de montaje (parcial, lo humano diferido)
A.4 (IID Agents parametrizados data-driven) decidido: 1 EF data-driven. A.2/A.3 (destilar marcas + topics con Marisol) = trabajo humano, DIFERIDO.

### FRENTE B — scheduler + dispatcher + publicación
- **B.1 overload CERRADO (causa raíz del cron muerto):** `intel.trigger_iid_agent` tenía dos overloads `(text)` + `(text, jsonb DEFAULT '{}')` → la llamada 1-arg matcheaba ambos → "function is not unique". Postgres NO deja quitar un DEFAULT con `CREATE OR REPLACE FUNCTION` → hubo que DROP + recreate del overload de 2 args SIN el DEFAULT, en transacción. Verificado: cron jobid 29 pasó de **3859 fallos consecutivos a `succeeded` sostenido**. Ambos overloads quedaron con `pronargdefaults=0`. Esto cierra el INCIDENTE R4B del content-dispatcher-poll.
- **B.4 causa raíz de publicación (forense):** SocialLab escribía `scheduled_posts` con status `pending_oauth`, un callejón sin salida que ningún worker leía. El único status que drena `publish.ts` es `pending_publish`. Los tokens Meta viven en `meta_accounts`, no falta OAuth. Además el catch del INSERT se tragaba el error en una etiqueta `queued_local` que nadie miraba → el ledger registraba `success` con 0 filas en tabla. Fix (en content-run-stage v37 + SocialLab): status `pending_publish`, propagar `image_url`, y el catch del INSERT lanza+loguea entero, propagándose al call-site (labs_status.failed + error_log + ledger failed). El carril de publicación estaba **frío, no roto**.

### FRENTE C — calidad Eje B (VIVO en prod)
- **Migración `objective_by_platform jsonb`** aplicada a `intel.brand_topics` (nullable, nace NULL, GRANTs heredados a nivel tabla). Rollback: DROP COLUMN.
- **gate7 (objective_stimulus)** y **gate8 (visual_sibling)** — ambos blocking, nacen VIVOS porque el ctx trae el dato: gate7 exige `topic.objective_by_platform` en el select de loadBrandTopic; gate8 exige `piece.image_prompt` + `siblingPieces[].image_prompt` (loadRecentPieces ya traía `assets`, solo los descartaba en el map). Sin esos 3 cambios de datos (cero lógica), los gates nacían muertos/informativos para siempre.
- **Ruta B (fanout.ts):** el psycho_preset se DERIVA del objetivo declarado, no de un hash fijo por ángulo. El mapa viejo (PSYCHO_BY_ANGLE) tenía sesgo (PSY-TRUST ×4, fallback ciego a AUTHORITY) y catálogo congelado (8 de 13 presets; urgency/belonging/fomo/aspiration/reciprocity nunca salían). Ahora: `objective_tag` → familia (4/3/3/3, ningún preset fuera) → el ángulo desempata dentro de la familia. `DEFAULT_OBJECTIVE=AUTHORITY` (el más conservador: sin objetivo declarado se establece criterio, no se empuja a comprar). Verificado por simulación: 13/13 presets usados. **Decisión:** marcas hermanas con mismo objetivo+ángulo+voz obtienen mismo preset — NO se diferencia en origen; la diferenciación la hace el Watcher (gate1+gate8). Diseño de dos capas correcto (Builder prescribe, Watcher valida).

### FRENTE D — gobernanza
- **D.1 versionado:** regla de versión real = número al final de `entrypoint_path`, no el campo `version`. Carril viejo (iid-research, iid-ecommerce*, iid-brief-generator, iid-process) = dejar morir sin versionar.
- **D.4 migración de modelo:** las 3 EFs de modelo (aife-filter, brand-context-builder, iid-inbound) migradas a `claude-sonnet-5`. Patrón: (1) sin `temperature` (Sonnet 5 no tiene default → 400); (2) `thinking:{type:disabled}` reemplaza el determinismo de temperature:0; (3) max_tokens +30% (el tokenizer emite más tokens; un techo justo trunca a media frase y el truncado se propaga como output bueno o revienta el JSON.parse del consumidor).
- **D.5/D.6 typecheck labs + firma:** las 4 sesiones de Sesión 1 (SocialLab, iid-functions, CopyLab, ImageLab) migraron endpoints de firma Web `(req:Request):Promise<Response>` a Node-native `(req,res)` — la firma Web CUELGA en este Vercel (`req.headers.get is not a function`). approve-job y trigger-job del Orchestrator estuvieron MUERTOS por esto desde antes del primer post (trigger-job **nunca vivió en prod**). Gates `tsc` agregados a CopyLab e ImageLab destaparon deuda de tipos preexistente (bundle hash idéntico = prueba de que no se cambió comportamiento). **CORRECCIÓN registrada:** tipar los params NO caza el bug de firma — el código viejo roto pasa el typecheck limpio; lo único que lo cazaría es `const handler: VercelApiHandler = …` (TS2322). La migración es correcta igual; la guarda de typecheck que creíamos ganar no existe sin esa anotación.

### FRENTE seguridad (🟠 LATENTE — ventana propia, NO ejecutado)
Cadena de 3 eslabones confirmada contra DB viva pero **latente, no activa**: (1) schema `intel` expuesto por PostgREST + anon/authenticated con USAGE; (2) `iid_scheduler_config` con policy `USING(true)` para authenticated → lee `iid_cron_secret`+`vercel_bypass_secret` en texto plano; (3) `trigger_iid_agent` SECURITY DEFINER con EXECUTE a PUBLIC. **MITIGANTE CRÍTICO: `auth.users` tiene CERO usuarios/identidades/sesiones** → nadie tiene rol `authenticated` hoy → el vector "usuario logueado lee secretos" es latente. Baja de 🔴 a 🟠. El vector `anon` SÍ vive (la anon key va en el bundle del frontend), pero leer los secretos requiere `authenticated`. El toggle de signup no es leíble por SQL; cero identidades históricas sugiere cerrado. Cierre transversal futuro (REVOKE USAGE anon/authenticated sobre intel + sacar intel de PostgREST + REVOKE EXECUTE trigger_iid_agent + secretos a Vault + rotar iid_cron_secret/vercel_bypass_secret/x-sweep-secret) **no toca ningún lab** — los labs no leen intel por anon key, el pipeline corre por service_role dentro de las EFs. Las UIs (Orchestrator, labs) no tienen auth de usuario (seguridad por oscuridad de URL); meter login por UI sería frágil, el arreglo correcto es cerrar la superficie de DB. Auditar antes si alguna UI lee intel/content por anon key. Ventana propia con Sam presente.

### Deudas menores diferidas (próxima tanda)
- Bug muerto CopyLab: `buildCopyPrompt()` nunca reenvía `wordCountMin/Max` al prompt aunque el OutputTemplate los trae → "Extensión X-Y palabras" nunca entra. Fix 1 línea.
- `tsconfig.api.json` falta en Orchestrator (el gate tsc no cubre `api/`, por eso sobrevivió el bug de firma).
- Alias `@` de ImageLab reapuntar a src/ (hoy apunta a raíz = trampa que vuelve código muerto en aparentemente-vivo).
- Worktrees huérfanos (ImageLab 3; Orchestrator goofy-cori-9be76d + keen-mahavira-8d8269, confirmados muertos por CC, esperan OK de Sam para borrar).

### Verificaciones pendientes de Sam (solo él, son llamadas reales a prod)
3 checks de SocialLab publish.ts ("No pending posts" ~200ms no 504); execute real con copy (confirmar Sonnet 5 no degrada en silencio en adaptForPlatform); re-sondeo approve-job/trigger-job Orchestrator; poblar `objective_by_platform` en ≥1 marca y probar gate7/gate8 con dato real.

### Professor
18 learnings capturados y aprobados en bulk (session_date 2026-07-17): 5 debugging (B.1, firma Web-vs-Node, tipar-no-caza-el-bug, causa raíz B.4, bug muerto CopyLab), 3 security (frente latente, toggle signup + UIs sin auth, anon key en bundle), 2 iid_design (dos capas Builder/Watcher + gates vivos, Ruta B), 3 process (gate tsc destapa deuda, typecheck con resolución entre archivos, esquema real de professor_learnings), 2 supabase_edge_functions (merge-no-deploya-EFs, versión real = entrypoint_path), 1 architecture (FAIL-LOUD), 1 model-migration (patrón Sonnet 5), 1 governance (AGENDA:303 desactualizado).

### PRs mergeados esta tanda (Sam)
#1 (SocialLab), #12 (Orchestrator/Sesión 3), #14 (D.1 versionado), #15 (iid-functions Sesión 1), #16 (Eje B); ImageLab #4/#5; CopyLab #4/#5. Todos + los 6 deploys de EF = parte técnica del IID COMPLETA.

## 2026-07-13 (tarde) — Skill r4b-genome-calibration + fórmula marca↔persona + corrección rol Ivette

Sesión de arquitectura de marca + creación de herramienta. Preparación para llevar ForumPHs/Ivette de cero a R4B en un chat limpio.

### La fórmula marca↔persona (formalizada, validada 2 veces)
Neurone↔Patricia fue el primer par; ForumPHs↔Ivette es el segundo. Misma estructura → fórmula reproducible, no caso a medida:
- La MARCA (sistema/producto) lleva Conversión + Educativa + Editorial. NO lleva Profesional: se disuelve (el "currículum" de una empresa ES su Conversión; su criterio sobre el oficio ES su Editorial; el desdoblamiento Profesional existe en una PERSONA, no en una empresa).
- La PERSONA (la figura que encarna) lleva Profesional + Educativa + Editorial.
- 3 VERBOS que separan las voces de marca sin solape: Conversión VENDE (al decisor: Junta, comprador); Educativa ENSEÑA (al que VIVE/USA — el "doliente", el propietario bajo régimen de PH, la clienta — NO necesariamente el decisor); Editorial OPINA (del oficio/mercado, crítica y posición, no currículum).
- FRONTERAS (la parte más valiosa; sin ellas 6 voces suenan igual): la marca no hace el trabajo de la persona y viceversa; la persona cita la marca como obra propia pero no la vende; FRONTERA DE RESPONSABILIDAD cuando la persona es profesional regulado — Ivette (Abogada) INTERPRETA el marco legal / ForumPHs (empresa) OPERA el sistema; cruzarlas es riesgo legal (la empresa daría consejo legal, o la jurista vendería servicio y perdería independencia), no solo estético.

### Skill r4b-genome-calibration v1.0 (orquestador, delega — no duplica)
Creado y pusheado por Sam a skills/r4b-genome-calibration/SKILL.md; registrado en INDEX v1.7. Lleva una marca de cero a R4B (Ready for Business): genoma(s) activo(s) + parche de datos + brand_topics + agentes + SCHEDULER del Orchestrator establecido = listo para publicar. Fases: 0 (revisar lo que hay, innegociable) → 1 (arquitectura de voz / fórmula marca↔persona) → 2 (siembra de ejes) → 3 (bucle Boids, DELEGA a genome-calibration §4) → 4 (destilación E6 + parche de marca, checkpoint doble) → 5 (brand_topics) → 6 (agentes + scheduler → R4B).
PATRÓN DE DISEÑO: orquestar, no duplicar. La voz vive en genome-calibration (el Tratado, fuente única); r4b lo INVOCA. Duplicarlo generaría dos vocabularios desincronizados (el mismo anti-patrón del bug del psycho). Antes de escribir el orquestador se LEYÓ el Tratado completo para no duplicar/contradecir.
Lo que r4b agrega sobre el Tratado (todo posterior al 2-jul): Fase 0, la fórmula marca↔persona, la regla dura generalizada (la voz demuestra nunca declara — ni promesas ni credenciales autodeclaradas; el dato/título verificable ES la credencial), el patrón alias, el rol anclado al dominio, y las fases post-voz. Método base Sam×Claude en chat; el Seeder de Marisol es una opción de DELEGACIÓN de la Fase 3, no el método base.
NOTA: v1.0 se refinará al ejecutar ForumPHs de punta a punta (primera prueba de fuego real).

### Corrección del rol de Ivette Flores (mutación en prod)
Ivette corrigió: se la vendía como "Experta en Ley 284", pero cuando esa ley se derogue la credencial caduca. Rol correcto: "Abogada y Especialista en Régimen de Propiedad Horizontal". La ley es una INSTANCIA; el régimen es el DOMINIO. Dos matices: (1) "Abogada Y Especialista" (conjunción que suma dos calificaciones) — "Abogada" es título habilitante VERIFICABLE (hecho afirmable, cumple la regla dura), "especialista" se demuestra; la combinación da piso legal + profundidad. (2) es el MISMO rol que ejerce en ForumPHs — NO "Gerente General"; esto refuerza la frontera marca↔persona (ForumPHs pone SU criterio jurídico al servicio del cliente).
Aplicado a public.brands (ForumPHs): positioning + brand_context corregidos, criterio anclado al régimen. PENDIENTE (#73): el genoma fphs_institucional v0.5 aún dice "Abogada Ley 284" → se corrige al recalibrar (será fphs_conversion v1.0, heredera de la v0.5, cuya arquitectura estado→sin sistema→Ley 284→ForumPHs→prueba es claramente la voz de Conversión de marca).

### Estado tras la sesión
- Skill r4b-genome-calibration v1.0 vivo y registrado (INDEX v1.7).
- Fórmula marca↔persona formalizada en el skill.
- Rol de Ivette corregido en public.brands; deuda en el genoma v0.5 (#73).
- PRÓXIMO: ForumPHs de cero a R4B en chat nuevo (skill cargado). 6 voces (3 marca + 3-4 Ivette), marca primero, ~2 voces por sesión.
- Professor: 4 learnings (13-jul).


## 2026-07-11 — Siembra de 4 ejes fundadores + PatriciaOsorio.com (alias) + REGLA DURA DE VOZ

Sesión sin código: DB + criterio. Se sembraron los ejes que faltaban para que Marisol pueda seguir, se creó la marca que cierra el recorrido de autoridad, y se destiló una regla de voz transversal a todo el ecosistema.

### La regla dura (Sam) — transversal, embebida en los 4 ejes
LA VOZ DEMUESTRA, NUNCA DECLARA. Dos prohibiciones que son la misma trampa:
(a) NUNCA nombrar promesa / garantía / milagro / devolución — NI SIQUIERA PARA NEGARLAS. "Sin promesas vacías" le INSTALA la promesa al lector y le hace pedirla (después pide garantía, devolución...). Mismo principio que "no preguntes lo que no querés que te respondan en contra".
(b) NUNCA declarar autoridad ("+35 años", "experta reconocida", "líder"). Quien anuncia su autoridad está PIDIENDO que le crean, y pedirlo admite que podría no ser creíble.
Ambas fallan por lo mismo: intentan DECIR lo que deberían DEMOSTRAR. EL DATO PRECISO ES LA CREDENCIAL. Corolario: nunca construir por oposición ni definirse por lo que NO se es.
VIOLACIONES EN PRODUCCIÓN detectadas: header del blog NSCF ("Sin promesas vacías — solo lo que realmente funciona") y genoma po_consumer (authority_invoked_by: ["trayectoria 35 años"]). Ambas quedan como deuda de corrección.

### Los 4 ejes sembrados (todos active, 0 turnos, operator Sam)
1. **D7Herbal editorial** (35c39b4c) — "ciencia botánica accesible, comprensión con fundamento". Hermana de la conversión ya destilada. Equilibrio fijado por Sam: NI herbolario sin rigor (pierde autoridad) NI paper académico (pierde al lector). D7H tiene fórmula y ciencia real detrás; la voz la hace ACCESIBLE. Busca COMPRENSIÓN, no aprendizaje. El producto no es el punto: cierra en entendimiento.
2. **NSCF editorial "Hair Intelligence"** (7aeea69d) — DESTILADO DE LOS 4 ARTÍCULOS REALES del blog (neuronescflorida.com/blogs/hair-intelligence-1, 11-may-2026). Arquitectura extraída de los ejemplares: (i) abrir DESMONTANDO LA ATRIBUCIÓN EQUIVOCADA ("la mayoría culpa a la fórmula o al salón; casi nunca es eso") → (ii) mecanismo real a nivel de fibra CON DATO DURO (74% humedad → la cutícula no cierra → el pigmento migra) → (iii) la solución es de SECUENCIA/PROTOCOLO, no de producto ("reconstructor primero, acondicionador segundo, sellador último") → (iv) el producto entra TARDE, como consecuencia del principio → (v) frecuencia concreta y accionable → (vi) cierre aforístico en cursiva. 4 PILARES conservados (Hair Science / Miami Hair / Color Intelligence / Rituals) + invitación cruzada artículo→artículo ("Patricia recomienda", nunca a producto). BADGE DE PATRICIA como PUERTA: nombre + rol funcional, SIN currículum; su función no es respaldar el texto (el texto se respalda con su precisión) sino despertar "¿quién es esta que sabe tanto?" — el que se lo pregunta busca y llega a PatriciaOsorio.com POR SU PROPIO PIE. REGLA DEL RECORRIDO: el badge JAMÁS señaliza; si señaliza, es publicidad y muere. El recorrido se DESCUBRE.
3. **NSCF professional "la Técnica de marca"** — el rol que el gremio CONOCE Y ESPERA: la profesional que llega al salón, enseña la técnica, hace la demo y USA LOS PRODUCTOS DE LA MARCA QUE REPRESENTA. No esconde el producto: es su INSTRUMENTO. Balance 70/30 (70% oficio, 30% producto-como-instrumento — NO 30% de venta). TEST DE HONESTIDAD: el 70% debe ser útil INCLUSO SIN COMPRAR NADA. Nunca precio/descuento/oferta (eso vive en el Portal PRO). Alcance temático amplio: tratamiento, colorimetría, corte, acabado, peinado, fantasía. Registro técnico entre pares (léxico del oficio sin traducir — simplificar sería insultarlo). CONTEXTO: 0 salones B2B registrados → esta voz NO le habla a una cartera, LA ESTÁ CONSTRUYENDO.
   INSIGHT CLAVE (resolvió la línea difusa): la diferencia entre editorial y professional NO es cuánto producto aparece sino QUÉ PAPEL JUEGA. En editorial el producto es una CONCLUSIÓN (el lector llega a él; si aparece antes, rompe la confianza). En professional es el INSTRUMENTO de la enseñanza (está sobre la mesa desde el principio porque así se enseña de verdad).
4. **PatriciaOsorio.com** (brand_id técnico PatriciaOsorioPersonal) — ver abajo.

### PatriciaOsorio.com — creada vía ALIAS (patrón que desactiva la parte peligrosa de #69)
Patricia pidió una marca de perfil profesional internacional (salones, marcas, distribuidores). Se resolvió SIN reestructurar: se REUTILIZÓ la fila `PatriciaOsorioPersonal` (verificado antes: sin genoma, sin topics, sin sesión, url_base='https://TBD' → NADIE la usaba). UPDATE de contenido: display_name='Patricia Osorio', domain='patriciaosorio.com', mercado internacional, tono NEUTRO (ya no es-FL/Spanglish), brand_context/brand_story/icp reescritos. **EL ID TÉCNICO NO SE RENOMBRÓ** → cero FKs repuntadas, cero archivos de código tocados.
PRINCIPIO (transferible): desacoplar la CLAVE TÉCNICA del NOMBRE PÚBLICO. El ID de una fila es una clave interna; no tiene por qué coincidir con el dominio público. La "suciedad" cosmética (el ID no se lee bonito) se cambia por SEGURIDAD OPERATIVA. Mismo principio que "Ron" (nombre público) vs "Alcohol Denat." (INCI). **CONSECUENCIA: #69 pierde su parte peligrosa** — ya no hace falta repuntar 28 FKs + 8 archivos en 7 repos; basta alias + display_name. Lo que queda es UPDATE de contenido, manejable en chat bajo HRD.

IDENTIDAD (extraída de CVs 2014-2016 + bio que Sam encontró, FILTRANDO el registro de currículum):
Patricia NO es una estilista que enseña — es una EDUCADORA DE INDUSTRIA que también está detrás de la silla. Su autoridad es la del que ENSEÑÓ A LOS QUE ENSEÑAN: Directora de Educación regional desde Panamá para marcas líderes del sector; desarrollo de producto y mercado para LATAM (16 países + Caribe) para multinacionales; instructora en shows por toda América; formada por las escuelas que formaron el oficio; criada dentro de un salón; compitió y ganó; formación de negocio (Marketing). Fundó salones — y REGALÓ algunos porque miraba más allá (CARÁCTER, no anécdota: construye y suelta porque lo que le interesa está adelante).
PROPÓSITO DECLARADO POR ELLA (el corazón de la marca, lo detectó Claude en el bio y Sam lo validó como invaluable): CONECTAR. "Conectar con las personas, conectar a las personas entre sí, para que historias que valen la pena se conozcan." NO quiere ser autoridad que enseña desde arriba: quiere ser UN NODO DE CONEXIÓN, el cruce donde las personas valiosas se encuentran. Esto permite que la voz sea AMPLIA (4 públicos: profesionales, marcas, distribuidores, público general) sin diluirse: NO LES HABLA A LOS CUATRO — LOS REÚNE. La marca no es un pedestal: es un cruce de caminos.
DESCARTADO del material: todo el registro de carta de presentación ("líder nata", "memoria fotográfica", "talento natural empresarial", "productora de ventas superior") = autodeclaración pura, exactamente lo que la regla dura prohíbe. Las marcas para las que trabajó son SUSTANCIA pero se tratan con DISCRECIÓN (en la web pueden figurar; en los textos, referencia funcional, no listado de logos — nombrarlas gratuitamente = declarar autoridad por asociación, la misma trampa por otra puerta).
EL ROL EN EL RECORRIDO: es el DESTINO, no una parada. El badge del blog despierta la pregunta; el que busca llega acá — y ACÁ TIENE QUE ENCONTRAR PROFUNDIDAD, NO UN FOLLETO. Si fuera una página de "sobre mí" con logros, el recorrido MORIRÍA AL LLEGAR. Tiene que ser MÁS DE LO MISMO QUE LO TRAJO: más criterio, más evidencia.
NOTA (Sam): el propósito de CONECTAR conecta con PatriciaOsorioConectando (sembrada el 6-jul, antes de encontrar el bio). Mismo propósito en dos registros: PatriciaOsorio.com = conectar PROFESIONALMENTE (marcas, distribuidores, gremio); Conectando = conectar HUMANAMENTE (mujeres, comunidad, historias). El recorrido completo: artículo NSCF → badge → PatriciaOsorio.com (autoridad) → Conectando (la persona). Autoridad primero, intimidad después. Nada señalizado, todo se descubre.

### Hallazgos operativos
- **VIVOSEMASK CONVERGIÓ** (15 turnos, converged) — Marisol la corrió. Genoma candidato PENDIENTE DE DESTILAR (E6, chat, HRD Sam). Segunda marca en converger.
- **⚠️ EL BRAND_SCOPE DE LOS SEEDERS NO VIVE EN LA DB.** La EF `iid-inbound` carga los usuarios desde el SECRET de entorno `USERS_RAW` (JSON array con {sub, role, brand_scope, hash}) — no hay tabla de usuarios del IID (auth.users está vacía). CONSECUENCIA: sembrar una marca en brands + calibration_sessions NO la hace visible al seeder. **Marisol NO ve PatriciaOsorio.com hasta que se agregue `PatriciaOsorioPersonal` a su array brand_scope en ese secret** (dashboard Supabase → Edge Functions → Secrets). Las voces nuevas de NSCF/D7H SÍ las verá (esas marcas ya están en su scope; el front lista sesiones activas de la marca elegida). Falla silenciosa: no da error, el operador simplemente nunca ve la marca. **Rotar pwd de Marisol + ampliar su scope se tocan en el MISMO lugar → HACERLAS JUNTAS.**
- **MÉTODO VALIDADO: el material real publicado vence a la teoría de tablas.** El eje de NSCF editorial salió MUY superior al de D7H por una sola razón: existían 4 artículos reales que se pudieron leer. La arquitectura editorial se destiló de ellos, no se dedujo. REGLA: antes de teorizar un eje, buscar material publicado de la marca y leerlo. (Mismo principio que E7 aplicado al diseño de voz.)

### Estado tras la sesión
- **Sesiones activas: 7** — D7Herbal editorial, NSCF editorial, NSCF professional, PatriciaOsorio.com, VizosCosmetics, PO·VizosSalón, PO·Conectando. Todas con E7 (leen contexto real desde turno 1) y E5c (el operador cierra cuando quiere).
- **Convergida sin destilar: 1** — VivoseMask (15 turnos).
- **Destiladas: 2** — D7Herbal conversión (genoma activo), NSCF conversión (previa).
- **#54 CUBIERTO** (ejes sembrados). **#69 REDUCIDA** (el alias desactivó lo peligroso).
- **GATE:** rotar pwd Marisol + agregar PatriciaOsorio.com a su brand_scope (secret USERS_RAW, mismo lugar). Sin esto, los 7 bucles esperan.
- **Deudas nuevas:** corregir header del blog NSCF ("sin promesas vacías" viola la regla dura); revisar genoma po_consumer (invoca "35 años", contradice la regla).
- Professor: 8 learnings (5 críticos).

## 2026-07-10 — Bucle Boids: E7 GenomePromptBuilder + E5c convergencia extensible + GENOMA D7Herbal (1ª marca calibrada end-to-end)

Sesión larga operando el bucle Boids con Marisol. Empezó como "revisar un bucle" y produjo 3 hitos + el primer genoma completo del sistema.

### Contexto: el bucle de D7Herbal reveló el problema
Al retomar el bucle de D7Herbal (sesión fb0b08ab), los turnos 1-4 alucinaban ingredientes (Serenoa repens 32%, Ortiga, Ginkgo) — ninguno de D7H. Marisol (experta de dominio) los rechazó: "NO SABES CUÁLES SON LOS COMPONENTES, BÚSCALOS EN LA DB". Causa: el generador solo consumía founder_axis (temperamento de voz) sin el CUERPO de datos de la marca. La fórmula real vivía en product_blueprints y el generador nunca la leía.

### E7 — GenomePromptBuilder (PR #10 MERGEADO)
Diseño (con Sam): el generador debe ensamblar el contexto COMPLETO de la marca desde Supabase, agnóstico al tipo de marca. Módulo nuevo api/_genomePromptBuilder.ts: buildBrandKnowledge(brandId, sbSelectPublic) con 5 capas (identidad brands / voz brand_copy_profiles / fórmula product_blueprints / servicios brand_services / dirección founder_axis), degradación elegante (cada capa opcional se omite si falta; brand_context es piso garantizado). Bloque "CONOCIMIENTO REAL" con regla dura de veracidad (prohibido inventar fuera de lo listado). Integración en calibrate.ts: +sbSelectPublic (Accept-Profile:public, sin tocar el de intel), contextBlock inyectado antes del eje con jerarquía (conocimiento=hechos, eje=hipótesis ajustable), max_tokens 1024→2048.

Verificación por marca reveló datos heterogéneos: D7H/Vivosé tienen blueprint; VizosCosmetics es maison sin SKU (voz+servicios); Conectando solo brand_context. El builder degrada bien en todos.

DOS bugs encontrados y resueltos (CC leyó el error real, no obedeció el diagnóstico inicial de Claude Chat que estaba equivocado):
1. CRASH FUNCTION_INVOCATION_FAILED: el import `from './_genomePromptBuilder'` sin extensión .js. package.json es "type":"module" → @vercel/node compila bajo NodeNext → extensionless no resuelve → TS2835 (build NO falla, queda READY) → lambda muere al cargar con ERR_MODULE_NOT_FOUND antes del handler → FUNCTION_INVOCATION_FAILED en TODAS las acciones. Fix: './_genomePromptBuilder.js'. (Diagnóstico inicial de Claude Chat —includeFiles en vercel.json— era ERRÓNEO; CC probó que no funcionaría: Node no importa .ts crudo.)
2. CAPA DE FÓRMULA MUDA: tras arreglar el crash, start daba 200 pero "7 extractos" sin nombrar ninguno. Log: product_blueprints falló con order=is_primary.desc.nullslast → PostgREST 400. product_blueprints NO tiene is_primary (brand_services SÍ — la cláusula se copió entre capas). safeRead lo tragó → formula=false. Fix: order=name.asc. (Claude Chat había fencado calibrate.ts como "correcto, no tocar" — falsado por evidencia de runtime.)
GRANT SELECT product_blueprints + brand_services → service_role (faltaban 2 de 4; el builder lee las 4). Smoke verde: D7H nombra Romero/Anís/Quina con su rol real del blueprint, cero alucinación, formula=true, contexto 1866→3419 chars.

MÉTODO: Sam frenó dos veces ("QA antes de darlo por corregido"); CC leyó el error literal en vez de obedecer el brief. Ningún error de diagnóstico llegó a prod. La gobernanza (Preview antes de merge, CC rompe la cerca del brief cuando la evidencia manda, firma de Sam) atrapó cada fallo en la capa correcta.

### E5c — convergencia extensible (PR #11 MERGEADO 10-jul)
Observación de Sam en el bucle de D7H: convergió al turno 10 y cerró solo, pero él quería explorar más cómo el generador convertía promesas en testimonios. La regla dura casi lo empuja a votar NO a un buen turno solo para seguir. Decisión (Opción B): el umbral 10+3SÍ deja de CERRAR, pasa a SUGERIR (flag can_converge en progress). El bucle sigue active y generando mientras el operador juzgue; cerrar es acción explícita (converge) con guardia de umbral (409 si no se cumple). El "¿cerrás o 3 más?" vive en el front (aviso suave + botón), no en la máquina de estados. Backend sigue siendo autoridad de QUÉ es cerrable; operador decide CUÁNDO. Quién cerró → notes jsonb (columna existente, sin crear nueva). Gotcha (CC lo cazó): la racha de SÍ debe calcularse sobre turnos JUZGADOS, ignorando el turno propuesto pendiente que el bucle genera al alcanzar umbral (si no, ese turno con verdict null rompe la racha y el guardia rechaza el cierre legítimo). Smoke verde a nivel API en Preview (sesiones throwaway D7Herbal, limpiadas al final; las 5 originales + fb0b08ab intactas). MERGEADO por Sam (PR #11, 10-jul).

### GENOMA D7Herbal (chat, HRD, escrito a prod)
Bucle fb0b08ab convergido: 10 turnos, 4 SÍ (5/8/9/10). Turnos 1-4 pre-E7 (alucinados, rechazados); 5-10 con fórmula real → calibraron la voz. Marisol como calibradora experta: notas de dirección editorial precisa ("menos ansioso con disclaimers", "convierte promesas en testimonios", "días no semanas", "CTA + marca ×2").

Aprendizaje de VOZ (identidad del genoma): la honestidad de D7H se encarna en la ESTRUCTURA (testimonio, progresión temporal en días, ingrediente real por beneficio), NO en un disclaimer defensivo. Trasladar promesa a testimonio ("una usuaria dice a los 15 días" ≠ "D7H promete a los 15 días"). El testimonio es, tras los ingredientes, la mayor fuerza de venta.

Escritura a prod (HRD transaccional, 2 rollbacks evitables por no verificar esquema primero — updated_at inexistente, relational_stance/emotional_register son jsonb no text; ambos rollback atómico, sin estado a medias):
- Parche blueprint: Ron reclasificado como 7º activo botánico (era "Alcohol Denat." sin common → +common:"Ron"). Resuelve la discrepancia marketing("7 extractos") vs blueprint(6 con nombre): el 7º estaba cargado como excipiente. Ficha oficial confirmó 7 + epítetos por ingrediente. Sirve a todo lo que lea product_blueprints, no solo IID.
- INSERT genoma d7herbal_conversion v1.0 ACTIVO en brand_voice_genome: identity_anchors (7 activos con rol+epíteto), lexicon_signature, lexicon_forbidden (+disclaimers defensivos, +promesas en voz de marca), argumentative_architecture (promesa→testimonio), source_evidence (sesión fb0b08ab, turnos SÍ 5/8/9/10). D7H = 1ª marca calibrada end-to-end por el sistema completo (sembrada por Sam → calibrada por Marisol contra fórmula real → convergida → destilada → ratificada).

### Descubrimientos operativos
- 8 genomas activos (no 2): UnrealvilleStudio, LucienSael×2, SamPublisher, NeuroneSCF×2 (nscf_conversion + po_consumer #53), ForumPHs, D7Herbal(nuevo). "Agente IID" por marca = genoma activo + brand_topics; NO un agente instanciado. El pipeline lee ambos por brand_id. Multimarca por construcción.
- El bucle como DETECTOR de desalineación de datos: destapó marketing vs fórmula vs ficha. El parche-de-marca en la aprobación del genoma es el momento de reconciliar. La calibración densifica el conocimiento de marca, no solo produce voz.
- Nueva capacidad de plataforma: Claude Code ahora tiene browser (navega/clic/screenshot). Cerraría el smoke de UI logueada que hasta ahora quedaba pendiente por Vercel SSO. Gobernanza CC debe extenderse: no clics de escritura en prod sin firma de Sam.

### Estado tras la sesión
- E7 en prod. E5c MERGEADO (PR #11, 10-jul).
- D7Herbal: genoma activo, falta brand_topics (#45) para operabilidad plena.
- Pendiente carril Marisol: correr 4 bucles restantes (Vizos/Vivosé/VizosSalon/Conectando) con E7 vivo + #54 NSCF. Gate: rotar pwd Marisol.
- Pendiente carril Sam: sembrar ejes #54, destilar genomas + parches, #45 topics, deudas #69+#68+#67.
- Professor: 10 learnings (5 críticos).

## 2026-07-06 — #47 E5b FRONT (#65) CERRADO: text window del bucle Boids en producción

**Qué se cerró:** la UI de calibración de voz que faltaba para que Marisol opere el bucle Boids desde el Seeder. Backend ya estaba en prod (4-jul); esta sesión entregó el front + dos cambios de backend aditivos.

### Verificación previa (código vivo, antes de escribir el brief de CC)
Se leyó contra main: contrato de api/calibrate.ts (start/verdict/status), IidSeedsUnified.tsx (enlace gold inerte en bloque 6), patrón callApi de iidExpert.ts (rutas /api/* Node-native, IidError por status), iidInbound.ts (IidSession: role/brand_scope/sub; listOptions filtra por scope), App.tsx (SeederShell monta solo IidSeedsUnified sin tabs). Hallazgos que cambiaron el diseño: (1) el endpoint NO tenía acción list → las 5 sembradas eran inaccesibles desde UI; (2) verdict_operator no existía en calibration_turns; (3) el scope-gating no vive en calibrate.ts (service_role sin JWT) sino en el front.

### Decisiones de alcance (con Sam)
- Opción A: solo from_scratch; from_genome queda como stub honesto (depende de endpoint de captured_techniques inexistente + E8 technique_summary). No reabrir el backend verde por una puerta no lista aguas arriba.
- from_scratch tiene dos sub-casos: crear sesión nueva (captura founder_axis en vivo) y retomar sembrada (las 5 del 6-jul). El front DEBE listar/retomar sesiones active → obligó a la acción list.
- Sesiones sembradas: solo Retomar, sin editar founder_axis desde el front (los ejes se diseñan en el chat con criterio; degradarlos desde UI no).
- Enlace gold → lleva al selector de marca/sesión (no a una sesión concreta).
- Convergencia = solo reflejo visual (turnos + racha SÍ del server); la regla 10+3SÍ vive server-side, el front nunca calcula ni bloquea.
- verdict_operator (plan A): el operador que JUZGA el turno (Marisol) se registra en el turno, distinto de session.operator (quién sembró = Sam). Va en el veredicto, no en el turno genérico (el turno lo genera Claude, lo juzga el operador). Orden: DDL primero verificada → handleVerdict lee/persiste → front lo manda desde session.sub. handleStart NO se toca (turno 1 sin veredicto).

### Entregado por CC (PR #9 Orchestrator, merged, branch borrado)
- DDL: intel.calibration_turns + verdict_operator text nullable (migración add_verdict_operator_to_calibration_turns), verificada antes del front.
- Backend api/calibrate.ts: +case 'list'/handleList (brand_id + status opcional default active; devuelve id, brand_id, intent_label, entry_gate, status, operator, has_founder_axis, turn_count, created_at; turn_count vía 2º select agregado, NO count embebido de PostgREST que suele venir OFF; nunca devuelve turnos ni founder_axis completo). handleVerdict persiste verdict_operator desde el body (opcional, null si no viene). No se tocó handleStart/handleStatus/generador/convergencia.
- Front: src/services/iidCalibrate.ts (cliente tipado, patrón callApi de iidExpert, IidError reutilizado, distinción por status: 502 generation_failed reintentable / 409 invalid_state / 404 / 400). src/modules/iid/CalibrationConsole.tsx (selector marca scope-gated vía listOptions + lista de sesiones para retomar + form from_scratch nuevo con captura de eje + bucle veredicto + convergencia + banner reintento 502). App.tsx SeederShell: toggle Capturar/Calibrar (pill-tabs). IidSeedsUnified.tsx: enlace gold activo → onGoCalibrate (quitado disabled/"Disponible pronto").

### Validación
- tsc -b && vite build limpio; tsc --strict sobre api/calibrate.ts (Vercel compila /api fuera del proyecto front).
- Preview autenticado (share-link) smoke real: list D7Herbal → 200 con sesión sembrada (has_founder_axis:true, turn_count:0, founder_axis no expuesto); start (nueva throwaway) → turno 1; verdict(si) → turno 2 + progress {turns_done:1, consecutive_si:1} del server; DB confirmó verdict_operator='smoke-marisol' ≠ session operator='smoke-sam'. Datos throwaway (SMOKE_E5b_DELETEME) borrados; 5 sembradas intactas, 0 turnos totales.
- Verificado en vivo por Sam con capturas: (1) select lista solo las 6 marcas de Marisol (D7Herbal, Neurone S&C Florida, PO·Conectando, PO·Vizos Salón, Vivosé Mask, Vizos Cosmetics) — cero Lucien/UNRLVL/SamPublisher → scope-gating OK; (2) D7Herbal muestra sesión sembrada "sembrada · 0 turnos" + "eje fundador ✓" + Retomar + Crear nueva + stub honesto from_genome; (3) turno 1 generado desde el founder_axis de D7Herbal — la pieza ES la voz sembrada (pregunta acusadora, contención como autoridad, botánica con nombre y origen, cierre "Confianza, no variable").

### Gotchas / aprendizajes (3 a Professor)
1. Scope-gating de calibración vive en el FRONT, no en calibrate.ts (service_role sin JWT → el <select> limitado a listOptions es la única barrera). Patrón: todo endpoint service_role sin JWT delega gating al front.
2. DDL en PR de front = cambio de prod inmediato (DB única Preview↔prod). Ventana schema-vs-código; inocua si nullable y solo se llena; mergear pronto.
3. count embebido de PostgREST (tabla(count)) suele venir deshabilitado → 400 en runtime aunque compile; usar 2º select agregado.

### Estado de la actividad IID Seeds tras esta sesión
- 5 sesiones sembradas (6-jul) YA retomables desde la UI de Marisol. Próximo: Marisol corre los 5 bucles → convergen → Sam destila cada genoma (E6, chat, HRD).
- #54 (nscf_editorial + nscf_professional) operable por Marisol vía Seeder, PERO falta sembrar los 2 ejes de NSCF en intel.calibration_sessions (hoy 0 filas; verificado). El eje lo formula Sam en chat.
- #45 fase 2: sembrar brand_topics de las 5 marcas + persona default NSCF (sin topics el approve falla "domain sin suscriptores").
- Deudas DB agrupadas para sesión conjunta: #69 (consolidación IDs PO, superficie alta) + #68 (RLS calibration_* + vigilar max_tokens:1024 del generador con el bloque thinking de sonnet-5 por delante) + #67 (barrer firma Web). #66 (skill versiones) y #46 (tab Topic Proposals, diferido) por separado.
- Nota: api/professor.js está desplegado en unrlvl-context (la agenda decía "pendiente de construir" — desactualizado). Vía primaria; INSERT directo = fallback.

## 2026-07-06 · Siembra de EJES FUNDADORES desde la DB — 5 marcas de Marisol · Sam + Claude (Chat) + CC

**Estado:** método nuevo validado y 5 ejes fundadores sembrados en intel.calibration_sessions, listos para correr el bucle Boids. Resuelve el hueco from_genome de #65 por otro camino: no hace falta que Marisol capture una técnica — la DB ya tiene el material de arranque.

### El método (intuición de Sam)
Las marcas de Marisol ya tienen datos ricos en Supabase (public.brands.positioning/brand_context/tono_base + brand_copy_profiles + humanize_profiles + brand_services) de cuando Sam diseñó el ecosistema. Esos datos SON el punto de partida del bucle. Flujo: Claude lee las tablas → propone eje fundador → Sam corrige con criterio → se siembra como fila en calibration_sessions (founder_axis jsonb, status active, 0 turnos). CLAVE: la DB da el PUNTO DE PARTIDA, NO el genoma — ese sigue necesitando el criterio de Sam en el bucle (lo que ninguna columna tiene).

### 5 ejes sembrados (mapa de voces diferenciadas)
- **D7Herbal** (fb0b08ab) — botánica honesta al consumidor escéptico, CONTENCIÓN como autoridad (opuesto al filo de NSCF), adversario=exageración del mercado, compliance cosmético estricto.
- **VizosCosmetics** (ad03ff4e) — maison INSTITUCIONAL caleña de savoir-faire heredado (Dora→Patricia→Marisol), NO vende legitima, Healing Systems innegociable, solo orgánico, orgullo en equilibrio + proyección internacional. + DB CORREGIDA (era falsa: laboratorio/fabrica/ads/naturales → casa diseñadora).
- **VivoseMask** (4ccc4f74) — SENSORIAL/conversión, ritual de transformación, hermana de casa de D7H pero VOZ PROPIA (no gemela), ads+performance.
- **VizosSalon** (455ab6ce, sembrada bajo id PatriciaOsorioVizosSalon) — la casa física de Patricia, imán=Patricia estilista COMPLETA, profesional-anfitriona, showroom/pickup de Neurone, idioma NEUTRO por clientela multicultural.
- **PatriciaOsorioConectando** — Patricia-mujer íntima, comunidad latina, 5 pilares, regla anti-plantilla, idioma es-FL (excepción por comunidad homogénea), scope dual Marisol-seedea/Patricia-personaliza.

### Principios nuevos
- Cada marca = temperamento distinto; NUNCA se funden aunque compartan casa/persona/categoría (extensión de NSCF≠PO).
- El idioma sigue a la AUDIENCIA: neutro default (VizosSalon multicultural), es-FL solo si comunidad íntima homogénea (Conectando).
- La DB puede estar DESALINEADA, no solo incompleta (Vizos era falsa) → el método siembra-desde-DB REQUIERE el gate de criterio de Sam.

### Enredo de IDs PO resuelto (Sam 6-jul) → Operación B (#69)
PatriciaOsorioComunidad ERA Conectando; PatriciaOsorioVizosSalon ES VizosSalon; PatriciaOsorioPersonal no se usa. CC mapeó la cirugía (solo lectura): superficie DB doble (public.brands 28 FKs + crm.orgs 7 FKs, todas ON UPDATE NO ACTION) + 8 archivos de código en 7 repos en 2 casings. Runbook pendiente.

### Escrituras
intel.calibration_sessions (+5 filas) · public.brands + brand_copy_profiles + humanize_profiles (Vizos corregida) · professor_learnings (+7). Todo verificado por MCP.

### Pendiente
Correr los bucles Boids → genomas (chat o front #65). Operación B (consolidación IDs). Sembrar brand_topics de las 5. Conectando entra a scope Marisol con matiz (Patricia personaliza).

---

## 2026-07-04 · E5b BACKEND CONSTRUIDO — bucle Boids en producción (D1 + D2) · Sam + Claude (Chat) + CC

**Estado:** el backend del text window de calibración está VIVO y verificado end-to-end en producción. Falta solo el FRONT (#65) para que Marisol lo use. Cierra el diseño técnico D1-D4 que quedó pendiente el 2-jul; la mecánica del bucle ya estaba validada en vivo.

### D1 — tablas de persistencia (Opción B, normalizada)
Aplicadas por MCP (apply_migration), verificadas:
- `intel.calibration_sessions` — id uuid, brand_id, **intent_label** (descripción libre de la voz buscada, ancla humana de entrada), **target_voice_id nullable** (el voice_id técnico es SALIDA, emerge al converger — no se exige al abrir), entry_gate ∈ {from_genome, from_scratch}, founder_axis jsonb, source_technique_id (FK→captured_techniques ON DELETE SET NULL), status ∈ {active, converged, abandoned}, converged_at, resulting_voice_id, operator, notes, created_at/updated_at.
- `intel.calibration_turns` — id, session_id (FK→sessions ON DELETE CASCADE), turn_number, proposed_text, technique_used, verdict_voice ∈ {si, no} (null mientras espera), notes_intent, is_convergence_marker, created_at. UNIQUE(session_id, turn_number).
- GRANTs SELECT/INSERT/UPDATE/DELETE a service_role en ambas (RLS sola no basta). 4 índices. Trigger updated_at.
- **Decisión de diseño (Sam):** el voice_id NO se pide al abrir la sesión — el usuario interactúa con Claude que lo guía; el nombre técnico se construye durante/al converger. La sesión se ancla en brand_id (obligatorio) + intent_label (texto libre).
- **Solo service_role:** todo pasa por /api/calibrate.ts server-side; el front nunca toca las tablas.

### D2 — endpoint /api/calibrate.ts (Orchestrator, Node-native)
- 3 acciones discriminadas por body.action: **start** (valida, INSERT sesión, genera turno 1, persiste, devuelve session_id + turno), **verdict** (UPDATE turno con verdict_voice + notes_intent, recalcula convergencia, si converge → status converged sin generar más; si no → genera turno siguiente), **status** (devuelve sesión + todos los turnos para reanudar tras cerrar el navegador).
- **Opción X (stateful vía DB):** el endpoint no tiene memoria propia; lee founder_axis + intent_label + turnos previos + técnicas ya usadas de la DB en cada llamada, arma el prompt, genera, persiste.
- **Generador con claude-sonnet-5:** system prompt con eje fundador + intención + material capturado (si from_genome) + historia del bucle (turnos previos con veredicto y notes_intent) + techo de producción (voz constante, técnica variable, lista de técnicas a NO repetir). Devuelve JSON {proposed_text, technique_used autodeclarado}.
- **Convergencia leída de DB:** mín 10 turnos con veredicto + últimos 3 SÍ consecutivos.
- **Resiliencia:** generation_failed → HTTP 502 (no 200), sesión intacta y reintentable. start acepta session_id opcional para reintentar el turno 1 sin crear sesiones huérfanas (desviación aditiva del brief, aprobada).

### interpret-intent.ts revivido (PR #7)
Estaba ROTO en producción silenciosamente: colgaba por firma Web-standard, ni siquiera alcanzaba el fallback confidence 0.3. El brief D2 lo había designado como molde — molde defectuoso. Migrado a Node-native + claude-sonnet-5. Ahora responde confidence real (0.85 en prueba). Lección: verificar que el MOLDE funciona, no solo leer su código.

### Gotchas nuevos (capturados en Professor)
1. **Firma de handler Vercel:** `(req: Request): Promise<Response>` (Web-standard) CUELGA en este proyecto (504, incluso en GET que debería dar 405 antes de tocar nada). El patrón que funciona es Node-native `(req: VercelRequest, res: VercelResponse)` con res.status().json() — el de sign-upload/trigger-job/extract-frames. Extiende el gotcha previo de extract-frames (Web API ignora maxDuration).
2. **claude-sonnet-5 antepone bloque thinking:** leer solo content[0].text da VACÍO → concatenar TODOS los bloques type:text. Prefill de assistant ("{") da 400. (Nota: para tareas deterministas, el DF usa thinking:{type:disabled}; el generador de voz SÍ quiere thinking, por eso concatena en vez de desactivar.)
3. **Model ID canónico jul-2026:** claude-sonnet-5 (verificado docs oficiales). Retirados claude-sonnet-4-* / claude-opus-4-* gen ≤4.

### Verificación (Camino 3: CC prueba HTTP + Claude verifica DB por MCP)
CC ejecutó start→verdict→status contra el Preview con bypass de auth. **Round-trip PostgREST con Accept-Profile:intel confirmado en vivo** (el riesgo que llevaba 3 intentos sin descartar). Claude verificó por MCP: sesión de smoke (022bf9da) con 2 turnos, técnicas distintas (turno1 "objeción anticipada", turno2 "contraste" — anti-repetición funciona), notes_intent persistido, convergencia correcta. Ambos PRs (#7 interpret-intent, #8 calibrate) merged. CC limpió las 5 sesiones de prueba.

### Depuración en cadena (el smoke destapó bugs por capas)
Migrar a Node-native destapó generation_failed → causa: bloque thinking → fix concatenar bloques → intento de prefill (400) → revertir a extracción robusta. Cada capa ocultaba la siguiente. Lección: la validación DB (build/tsc/INSERT-ROLLBACK) NO sustituye el smoke en vivo — transporte HTTP y shape real de la respuesta del modelo solo se ven ejecutando.

### Escrituras
intel.calibration_sessions + calibration_turns (DDL, D1) · /api/calibrate.ts (nuevo) + interpret-intent.ts (fix) en Orchestrator, PRs #7+#8 merged · professor_learnings (+7, 4-jul).

### Deudas nuevas mapeadas (AGENDA)
#65 front E5b (PRÓXIMO foco) · #66 skill verificación de versiones de modelo · #67 barrer otros endpoints con firma Web colgados · #68 RLS deshabilitado en calibration_* + max_tokens:1024 justo.

### Pendiente inmediato
**E5b FRONT (#65):** text window en el Orchestrator que consume /api/calibrate.ts (start/verdict/status), 2 puertas de entrada (desde Genoma capturado / desde cero), mostrar convergencia, reubicar+conectar el enlace gold. Brief de CC apuntado a Orchestrator.

---

## 2026-07-02 (cont.) · E6 + #45 NeuroneSCF — primera marca de Marisol OPERABLE end-to-end · Sam + Claude

**Estado:** NeuroneSCF quedó operable por el IID: tiene VOZ (genoma nscf_conversion v0.5 activo) + TOPICS (5 brand_topics). El pipeline ya puede researchear estos territorios y generar con la voz de la marca, entrando al gate de Sam (auto_approve=false). Continuación directa del ejercicio de calibración del mismo día.

### E6 — genoma escrito (no en UI, en el chat bajo HRD)
`brand_voice_genome`: nscf_conversion v0.5 active, brand_id=NeuroneSCF. 12 dimensiones espejadas de unrlvl_default. Destilado del bucle Boids validado ese día. Es la voz de CONVERSIÓN (1 de 3 hermanas: + editorial + professional pendientes). TikTok añadido como capa de texto. Confirma el circuito E6 diseñado: el genoma se escribe en el chat Sam-Claude, el Orchestrator nunca lo escribe.

### #45 (fase 1) — brand_topics de NSCF (avance del BLOQUEANTE)
5 topics sembrados (frizz-humidity, color-fade, damage-repair @100 + chlorine-sun, fine-fragile @90), todos → nscf_conversion, Meta FB/IG + TikTok. #45 pasa de BLOQUEANTE total a PARCIAL: NeuroneSCF ya no está dormida; faltan las otras 5 marcas de Marisol y la persona default de NSCF.

**Aprendizaje de arquitectura para el resto de #45:** los topics de una marca de producto/conversión se mapean a PROBLEMAS/PERSONAS reales (brand_personas), no a research abstracto como UNRLVL/Lucien. El angle sale del tone_for_segment/copy_hooks/avoid de cada persona. Esto define cómo sembrar las 5 marcas restantes.

### Validación cruzada del método E5b (por qué importa para la construcción)
E6 se hizo con material producido por el bucle Boids validado en vivo — confirma que la cadena bucle→destilación→genoma funciona de punta a punta ANTES de construir E5b en la UI. Cuando se construya E5b (`/api/calibrate.ts`), su output alimenta exactamente este paso E6, ya probado manualmente.

### Deuda mapeada (NO tocada)
`po_consumer` v0.6 activo bajo brand_id=NeuroneSCF probablemente mal asignado (voz de PO-persona, no de la distribuidora). NeuroneSCF ≠ marca personal de Patricia. A verificar/reasignar. Ver AGENDA #50.

### Escrituras
brand_voice_genome (+1 fila, +1 UPDATE) · intel.brand_topics (+5) · professor_learnings (+4). Todo verificado por MCP.

---

## 2026-07-02 · E5b — Mecánica del bucle VALIDADA en vivo (banco de pruebas NSCF) · Sam + Claude

**Estado:** mecánica del bucle Boids confirmada con un ejercicio real Sam×Claude sobre NeuroneSCF. Alimenta el diseño de `/api/calibrate.ts`. Diseño técnico D1–D4 aún pendiente (sesión siguiente).

### Qué se validó
La mecánica real del bucle (corrige el diseño previo que decía ambiguamente "Claude genera / el operador juzga"):
1. Claude PROPONE el texto (hipótesis de voz desde el eje fundador + veredictos previos).
2. Claude pregunta "¿es [marca]? SÍ/NO".
3. Operador responde SÍ/NO + su VISIÓN del porqué (criterio, no reescritura).
4. Claude recalibra y propone el siguiente.
5. Convergencia = mín 10 textos + últimos 3 SÍ consecutivos.

Quien genera es Claude SIEMPRE. El operador aporta criterio, no prosa — esto hace viable a Marisol como operador (reconoce/explica con autoridad de dominio; no necesita escribir voz).

### Decisiones D1–D4 confirmadas por Sam (para el diseño técnico pendiente)
- **D1 Persistir:** sí. Tabla `intel.calibration_sessions` (greenfield). Doble propósito: no perder trabajo + caja negra del genoma para diagnóstico/corrección.
- **D2:** `/api/calibrate.ts` en el Orchestrator, molde de `interpret-intent.ts` (fetch directo a Anthropic, key server-side). OJO: NO heredar el model ID retirado `claude-sonnet-4-20250514` de interpret-intent — usar el modelo canónico vigente.
- **D3:** mecánica = la validada arriba. El eje fundador está embebido en el material de arranque (OCR de `captured_techniques` en puerta "desde Genoma"; texto/posts semilla en "desde cero"), no en una fase 0 de preguntas.
- **D4:** persistir sesión completa (textos + `verdict_voice` + `notes_intent` + recalibraciones + flag convergencia).

### Nuevo requisito de diseño emergente
El bucle captura DOS señales, no una: `verdict_voice` (SÍ/NO de sonido de marca) y `notes_intent` (observación estratégica). La convergencia de voz no cierra el genoma; la intención es eje aparte. El esquema de `calibration_sessions` debe reflejar ambas.

### Techo de producción (para el prompt del generador)
Voz constante, TÉCNICA variable pieza a pieza. El generador porta el arsenal del comunicador experto (ES+EN, vocabulario rico) y no reincide en técnica — exige memoria de lo ya generado (`creative_seed`/`loadRecentPieces` del eje B).

### Método completo
Codificado en el skill `genome-calibration` v1.0 (el "Tratado"), redactado esta sesión. Es la fuente única del método; `/api/calibrate.ts` lo implementa y el OnboardingApp lo consumirá. Pendiente de push por Sam.

### Pendiente inmediato
Diseño técnico D1–D4: DDL de `intel.calibration_sessions` + endpoint `/api/calibrate.ts` + prompt del generador anclado en la mecánica validada.

---

### 2026-07-01 (sesión b) — #47 E5a CERRADO: pestaña única IID Seeds (captura OCR unificada + Seed/Genoma) + E4 absorbida + diseño E5b/Fase 2 cerrado · Sam + Claude (Chat 1) + CC (2 sesiones paralelas)

**Qué pasó:** se construyó y cerró E5a — la pestaña única "IID Seeds" que reemplaza el toggle temporal Basic/Expert con captura OCR unificada y bifurcador de destino Seed/Genoma. Dos sesiones CC en paralelo (front + EFs) contra un contrato cerrado de antemano. E4 se cerró como ABSORBIDA (sin código). Se cerró el diseño completo de E5b (bucle Boids en la UI) y de la Fase 2 (aprobación de genomas en el chat), pendientes de construir.

---

**DESCUBRIMIENTO DE DISEÑO (la simplificación que ordenó todo):** Basic y Expert NO son dos modos — la captura es IDÉNTICA (mismo post, mismo OCR, mismas 3 preguntas). Lo único que difiere es el DESTINO de lo capturado, que se elige al final con dos botones. Por eso: UNA pestaña "IID Seeds", no dos. El mount temporal "Expert (prueba)" murió.

**Estructura de la pestaña única (E5a):**
- Post — drag&drop (imagen O video) + file picker → OCR (obligatorio en ambos destinos).
- "¿Qué querés capturar?" → checkboxes Tema / Método de comunicación (`capture_intent`).
- "¿Para qué marca lo ves?" → dropdown de scope.
- "¿Por qué importa?" (requerido) → la visión de Marisol (`raw_signal`).
- Destino → botones "Guardar como Seed" (primario) / "Calibrar Genoma" (secundario).
- Enlace gold "¿No tenés un post de modelo? Entrá directo a calibrar y hablemos" — VISIBLE pero inerte en E5a (su destino, el text window, nace en E5b).
- ELIMINADOS del front (anti-IP / no aportan): link de referencia, cuenta/handle, tags, caption, criterio-opcional separado.

**Corrección conceptual anti-IP importante:** la regla NO era "no leer el post" sino "no republicar el post". Leer el OCR para aprender tema+método está permitido (es insumo de aprendizaje, como el frame Nietzsche de Lucien); copiar para publicar no. Por eso ambos destinos (Seed y Genoma) procesan el OCR. El Seed siempre fue manual (Marisol transcribía a mano) NO por diseño sino por limitación (sin acceso a plataformas para leer el post); el drag&drop+OCR resuelve esa limitación histórica.

---

**E4 — ABSORBIDA (cerrada sin código):** el plan preveía acciones `expert_*` en iid-inbound. Pero `iid-expert-ocr` ya hace la captura Expert de forma autónoma (auth propia, scope-check, OCR, persiste). Meter `expert_*` en iid-inbound sería duplicar. E4 se cierra como "absorbida". El approve/reject de técnicas Expert NO es E4 — es parte del flujo de Fase 2 (calibración).

---

**CONTRATO E5a (acople-por-contrato, 2 sesiones CC paralelas):**
- **Sesión A → Orchestrator (front):** pestaña única, formulario, drag&drop, bifurcación. PR #5 mergeado. Hallazgo bueno de CC: `IidSeedsCapture.tsx` (Basic viejo) lo usa TAMBIÉN el admin (`IidSeedsAdmin`) → creó `IidSeedsUnified.tsx` nuevo en vez de reescribir, evitando regresión no anticipada por el brief. Conservó "Mis semillas" (read-only) — dropearla era regresión.
- **Sesión B → unrlvl-iid-functions (EFs):** el flag `persist` + campos OCR. PR #9 mergeado + deployado.
- **El contrato:**
  1. `iid-expert-ocr` gana flag `persist` (default true=persiste en captured_techniques como hoy; false=hace OCR y DEVUELVE `ocr_text` sin persistir — para Seed).
  2. `iid-inbound` capture acepta `ocr_text` + `capture_intent` (aditivos, retrocompatibles); `distill()` los usa con `DISTILL_SYSTEM` extendido (OCR_TEXT es disparador anti-IP, no reproducir; capture_intent orienta tema/método).
  3. Migración aditiva `iid_seeds`: `ocr_text text` + `capture_intent text[]`.
- **Hallazgo verificado (corrige modelo previo):** `iid-expert-ocr` NO borra video — recibe frames YA extraídos en el body (época canvas), solo memoria de invocación; el borrado del video lo hace `/api/extract-frames` en Orchestrator. Por eso el early-return `persist:false` es seguro.

**Enrutamiento por destino:**
- Genoma → `iid-expert-ocr` (persist:true) → captured_techniques.
- Seed → `iid-expert-ocr` (persist:false) → `ocr_text` → `iid-inbound` capture → iid_seeds.

---

**FIX de imagen (E5a-fix, PR #6 mergeado):** al probar en Preview, imagen (PNG/JPG) daba 500 en `/api/extract-frames`: `"ffmpeg no produjo frames (video sin pista de video legible?)"`. Causa: extract-frames usa ffmpeg para extraer frames por intervalos de un VIDEO; una imagen fija no tiene pista de video → 0 frames → 500. El supuesto "ffmpeg trata imagen como 1 frame" no se sostuvo. **FIX (Opción B):** el front bifurca por `file.type` — video va server-side (sign-upload→extract-frames); IMAGEN se lee con `FileReader.readAsDataURL` y va DIRECTO al OCR como frame único (iid-expert-ocr ya acepta data URLs). La imagen ya ES el frame, no necesita ffmpeg. Bonus: imagen casi instantánea vs video ~40-60s.

**PRUEBA E2E (Sam, Preview):** las 4 combinaciones verdes — imagen y video × Seed y Genoma. Verificado por Claude por MCP: seeds destilados correctos (ej. post del zorro "Fishing For Customers" → neutral_topic "captación de clientes vía prueba social"; video haircare → "condiciones climáticas extremas como variable de segmentación"). Genoma → captured_techniques.

**GOTCHA merge=deploy + migración aparte (2 lecciones):**
1. En repos conectados a Vercel, mergear PR a main deploya a PRODUCCIÓN automáticamente (no hay staging). → probar en Preview ANTES de mergear. El PR #5 se fue a prod antes de probar (sin daño, solo Marisol lo usa).
2. Mergear el PR de EFs NO aplica sus migraciones SQL. Las columnas `ocr_text`/`capture_intent` no existían tras mergear+deployar las EFs porque la migración quedó sin aplicar → la destilación funcionaba pero esos 2 campos no se persistían. Claude aplicó la migración por MCP bajo HRD. Regla: tras mergear PR con migración, aplicarla explícitamente.

---

**DISEÑO E5b + FASE 2 (cerrado, PENDIENTE de construir) — el bucle Boids en la UI:**
- **Qué es:** el text window donde Marisol calibra la voz de una marca. El corazón de Genoma. Decisión B: el bucle vive DENTRO de la UI de Marisol (Claude por API), no en chat aparte.
- **Método Boids replicado:** CLAUDE genera textos uno por uno; el OPERADOR (Marisol para sus marcas scope-gated; Sam para Lucien) juzga SÍ/NO. En NO, se le pide "¿cómo lo escribirías vos/la marca?" (convierte el rechazo en insumo para ajustar el siguiente). Los textos los genera CLAUDE, no el operador.
- **Regla de convergencia:** MÍNIMO 10 textos Y los últimos 3 deben ser SÍ consecutivos (obliga a 8,9,10=SÍ en el mejor caso). Si nunca hay 3 SÍ seguidos → no hay definición real de la marca (resultado válido, no fracaso).
- **Dos puertas de entrada:** desde un Genoma capturado en E5a, o desde CERO (sin post — la intuición de Marisol; la mejor forma de que entienda el proceso).
- **Fix del enlace gold (mapeado a E5b):** hoy está dentro del panel que solo abre tras subir post → "sin post" queda escondido detrás de "subí post". En E5b se reubica a la zona de captura inicial (visible sin subir nada) Y se conecta al text window.

**PROPÓSITO (IID Agents) — el para qué de todo:** el genoma existe para que el IID Agent de una marca produzca contenido con SU voz (sin genoma = output genérico/off-brand, el pecado original default_voice). Las 6 marcas de Marisol hoy no tienen genoma NI brand_topics (#45). Este trabajo las hace operables por el IID: primero genoma (voz, vía Expert), después topics (qué consume, #45).

**GATE DE APROBACIÓN DE GENOMAS (Fase 2, vive en el chat Sam-Claude, no en UI):**
- Circuito: Marisol converge el genoma en el text window → status listo, email AVISO a Sam (solo id + marca, sin el trabajo). Sam viene al chat con el id → Claude trae todo → discuten, ajustan → al coincidir "¿Apruebas?" (checkpoint HRD) → Claude dispara INSERT/UPDATE a `brand_voice_genome` desde el chat. El Orchestrator NUNCA escribe genomas.
- Sam NO vuelve a la UI ni al email para aprobar (el trabajo real pasó en el chat).
- El modelo del gate ya existe en el ejercicio Boids-Lucien → se replica en el skill (E7), no es infra nueva.
- El gate de Seeds también puede escalar (táctico=post para la marca vs estratégico=¿este territorio merece un agente IID nuevo?) — también vía el skill, en el ejercicio Sam-Claude.

---

**Estado neto de #47:** E1 tabla LIVE · E2 bucket LIVE · E3-EF LIVE · E3b-1/2/3/4 cerradas · **E5a CERRADO (pestaña única, Seed+Genoma, imagen+video, en producción)** · E4 ABSORBIDA. **PENDIENTE: E5b (text window / bucle Boids + reubicar enlace gold) + E6 (mecánica de aprobación scope-gated, ya diseñada: vive en chat) + E7 (skill genome-calibration) + E8 (technique_summary retomable).** Fase 1 de captura COMPLETA; Fase 2 (calibración) es lo que sigue.

**Inventario de objetos nuevos/cambiados:**
- `Orchestrator`: `IidSeedsUnified.tsx` (nuevo), `App.tsx` (SeederShell sin toggle), `iidExpert.ts` (ocrOnly persist:false + captureSeed), `iidInbound.ts` (capture + ocr_text/capture_intent), `ExpertCapture.tsx` jubilado. PRs #5 + #6 mergeados.
- `unrlvl-iid-functions`: `iid-expert-ocr` (flag persist) + `iid-inbound` (ocr_text/capture_intent en capture + distill). PR #9 mergeado + deployado.
- Migración aplicada (por Claude/MCP): `iid_seeds` + `ocr_text text` + `capture_intent text[]`.

**Deudas vivas (no bloquean):**
- 🟡 Reubicar + conectar el enlace gold "sin post, hablemos" → parte de E5b.
- 🟡 Rotar `STORAGE_SWEEP_SECRET` (se pegó en chat 1-jul).
- 🔴 Rotar contraseñas temporales Sembrador antes de producción real de Marisol.
- 🟡 Renombrar ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET (arrastra "NSCF", gobierna toda la auth IID).
- 🟡 Migrar service key a SUPABASE_SECRET_KEYS nueva cuando Storage la acepte.
- Los 2 seeds de prueba de hoy tienen ocr_text/capture_intent vacíos (se guardaron pre-migración) — no importa, son pruebas.
- Professor: 22 learnings de mayo pendientes.

**Professor:** 6 learnings del 1-jul (sesión b) APROBADOS (E5a cerrado; gotcha imagen/ffmpeg; contrato paralelo A/B; gotcha merge=deploy+migración; diseño E5b/bucle Boids; propósito IID Agents + gate de aprobación). Total del 1-jul: 14 learnings.

**Próximo (orden):** (1) **E5b** — text window de calibración (bucle Boids, Claude por API, 2 puertas, regla 10/3-SÍ) + reubicar enlace gold. Sesión CC apuntada a Orchestrator (+ posible EF si el bucle necesita backend). (2) **E7** — skill `genome-calibration` (protocolo del bucle + gate de aprobación Sam-Claude). (3) **E6/E8**. En paralelo, prerequisito de producción real: **#45 brand_topics de las 6 marcas**. Incidente dispatcher → chat R4B.

---

### 2026-07-01 — #47 E3b-2/3/4 CERRADAS: E3 (captura Expert) COMPLETO end-to-end + EF genérica de barrido de Storage + INCIDENTE dispatcher detectado · Sam + Claude (Chat 1) + CC

**Qué pasó:** se cerraron las tres etapas que faltaban del carril server-side de #47 (E3b-2 front signed upload, E3b-3 cron de huérfanos, E3b-4 prueba real de Marisol), dejando **E3 (captura Expert) COMPLETO y verificado end-to-end**. Marisol capturó una técnica desde SU dispositivo con su video HEVC, desde cero, verde. En paralelo se construyó una EF genérica de barrido de huérfanos de Storage (infra primaria reutilizable) y se detectó un **incidente serio no relacionado**: el cron `content-dispatcher-poll` lleva 592 fallos consecutivos desde el 17-jun (dominio R4B, dejado a su chat, no tocado desde acá).

---

**E3b-2 — front signed upload (CC, repo Orchestrator, PR #4 MERGEADO):**
- **Decisión de diseño cerrada:** la subida del video de Marisol al bucket privado se resolvió con **signed upload URL firmada server-side con service_role** (NO policy anon-insert, que abriría el bucket privado a cualquiera con la anon key pública). Se descartó explícitamente la policy porque la auth del IID no es auth de Supabase (es JWT propio HS256), así que una policy `authenticated` no reconocería a Marisol.
- **Verificación previa que cambió el brief:** el repo Orchestrator **NO tiene `@supabase/supabase-js`** (verificado en package.json) → todo Storage se habla por **REST crudo con fetch** (patrón A1), igual que `extract-frames`. No se agregó el SDK.
- **Pieza nueva `/api/sign-upload.ts`:** función Vercel Node-native, espejo de `extract-frames` (reusa `normalizeSupabaseUrl`, `SB_URL`, `SB_KEY`, `verifyToken` HMAC, `objectUrl`). Valida token seeder fail-closed → genera signed upload URL vía `POST /storage/v1/object/upload/sign/{bucket}/{path}` con service_role legacy → devuelve al navegador. Path con UUID: `expert/{seeder}/{timestamp}_{uuid}.{ext}` (sanitizado por UUID, no por limpieza de nombre — solo se conserva la extensión).
- **`ExpertCapture.tsx` reescrito:** se jubiló toda la maquinaria canvas (extractFrames/waitFor/etc.). Flujo nuevo: elegir/soltar video (drag&drop + file picker dual) → pedir signed URL → PUT directo del video a Storage → llamar `/api/extract-frames` → recibir frames → preview → `submitExpertCapture` (intacto). Indicadores de fase (subiendo/extrayendo/leyendo) para el flujo de ~40-60s.
- **`vercel.json`:** entry opcional para sign-upload con maxDuration 15, SIN includeFiles (no lleva ffmpeg). No hereda la config de extract-frames (el mapa functions es por-función explícito).

**GOTCHA signed upload (bug encontrado en la prueba, corregido en la misma rama):** el primer disparo dio **502 / sign_failed**. Causa: el endpoint de firma de Storage (Fastify) rechaza con 400 `"Body cannot be empty when content-type is set to 'application/json'"` si se manda header `Content-Type: application/json` SIN body. El endpoint de firma no lleva body (el path va en la URL). **Fix:** quitar el header `Content-Type` de esa llamada (no mandar body vacío disfrazado) — coherente con cómo extract-frames habla con Storage en sus GET/DELETE (solo apikey + Authorization). El fetch del PUT del navegador SÍ conserva su Content-Type real (file.type) — es correcto y distinto.

**PRUEBA E2E E3b-2 (Sam, desde Vercel Preview con el HEVC real de Marisol):** verde. sign → PUT → extract → OCR corrió completo, consola sin errores. Fila `785af870` en captured_techniques (captured_by marisol, scope NeuroneSCF, awaiting_review, 15 frames, 594 OCR chars, cloud_vision). Bucket en 0 tras la extracción (video borrado, anti-IP cumplido). `toAbsoluteUploadUrl()` (el punto de incertidumbre del shape de Storage) funcionó a la primera, sin segundo ajuste. PR #4 mergeado por Sam, rama borrada.

---

**E3b-3 — EF genérica de barrido de huérfanos (CC, repo unrlvl-iid-functions, PR #8 MERGEADO + deployada):**
- **Decisión de arquitectura forzada por un hallazgo:** NO se puede usar `DELETE FROM storage.objects` directo (el brief original lo proponía). El schema storage tiene un trigger ACTIVO **`protect_objects_delete`** (función `storage.protect_delete`) que bloquea todo DELETE directo con excepción 42501 (*"Direct deletion from storage tables is not allowed. Use the Storage API instead. This prevents accidental data loss from orphaned objects."*), salvo que se setee `storage.allow_delete_query='true'`. → el borrado DEBE ir por la Storage API REST, igual que `extract-frames.deleteVideo()`. Consistencia total primario↔backup.
- **Hallazgo colateral:** el job 32 `unrlvl-media-temp-cleanup` usaba exactamente ese `DELETE FROM storage.objects` bloqueado → **fallaba en silencio en cada corrida**, dejando 11 huérfanos acumulados en unrlvl-media/temp/ (los más viejos de mayo). "active:true" no significa "funcionando".
- **EF `storage-orphan-sweep`** (genérica, parametrizable — infra primaria de barrido para TODOS los buckets temporales del ecosistema): body `{bucket, older_than_minutes, prefix?}`. Auth D3 fail-closed por header `x-sweep-secret` (timing-safe SHA-256) vs secret `STORAGE_SWEEP_SECRET`, NO JWT de usuario (la invoca cron/máquina). Service_role legacy para buckets privados. Topes de seguridad por corrida (MAX_SCANNED 1000, MAX_LIST_REQS 300, reporta truncated:true).
- **GOTCHA CRÍTICO que CC detectó probando en vivo (y corrigió el diseño):** el endpoint `object/list/{bucket}` es **folder-aware / NO recursivo** (delimitado por `/`). Listar `prefix='temp/'` devuelve SOLO placeholders de subcarpeta (id:null, created_at:null), no los archivos anidados. Los objetos de unrlvl-media viven en `temp/{owner}/{uuid}/{file}.png` (3 niveles). Un barrido plano con prefix+offset (como pedía el brief) habría borrado 0 objetos ahí — repitiendo el mismo fallo silencioso del job 32 que la EF viene a matar. CC lo cambió a **recorrido recursivo** (BFS por cola de prefijos, desciende en cada entrada id===null), con los topes globales cortando cualquier recursión patológica sin necesitar tope de profundidad explícito. `name` es leaf-relative al prefix (path completo = prefix + name).
- **Revisión de código de Claude Chat (contra el index.ts real):** tope de recursión sólido (corte por conteo global vía MAX_LIST_REQS), auth fail-closed validada ANTES de leer el body, REST-only respeta el trigger, distinción id===null correcta. Observaciones menores no bloqueantes: borrado secuencial (irrelevante para el volumen real; el batch {prefixes} sería la optimización si algún bucket crece) y `body: any` (validado campo a campo después). Aprobado.

**PRUEBA E2E E3b-3 (Claude Chat por MCP, sobre unrlvl-media como banco de pruebas real):** verde. Disparo vía `net.http_post` desde Postgres con `{bucket:'unrlvl-media', older_than_minutes:17280, prefix:'temp/'}`. Resultado: `scanned:11, deleted:10` — barrió los 10 viejos (>12 días) y **respetó el reciente** (25-jun, ~6 días). Verificado contra DB: bucket pasó de 11 a 1 objeto (el reciente). El borrado REST liberó físico+metadata (pasó el trigger). El recorrido recursivo alcanzó los 3 niveles de anidamiento.

**Deploy y config:** EF deployada por Sam vía Dashboard. Secret `STORAGE_SWEEP_SECRET` cargado (64 chars alfanuméricos de Bitwarden). **Verify-JWT toggle OFF** en la EF — es la config CORRECTA para una EF con auth propia (es la recomendación de Supabase: "OFF with JWT and custom auth logic in your function code"). Con verify-JWT ON, `net.http_post` con JWT inválido da 401 `UNAUTHORIZED_LEGACY_JWT` del gateway antes de ejecutar la EF.

**Crons creados (Claude Chat por MCP, bajo checkpoint HRD):**
- **`iid-expert-orphan-sweep`** (jobid 35) · `0 * * * *` (cada hora) → net.http_post a la EF con `{bucket:'iid-expert-uploads', older_than_minutes:60}`. El backup del borrado inline de extract-frames.
- **`unrlvl-media-temp-cleanup`** (jobid 36, reemplaza el 32 roto) · `0 3 * * *` (3 AM diario) → net.http_post a la EF con `{bucket:'unrlvl-media', older_than_minutes:17280, prefix:'temp/'}`. El job 32 roto quedó unscheduled; el nombre es idéntico.
- Ambos llevan el `x-sweep-secret` en claro en el command (queda visible en cron.job). Aceptado para este secret (blast radius = disparar un barrido; no da acceso a datos).

---

**E3b-4 — prueba real de Marisol (GATE DE CIERRE DE E3, VERDE):**
- Marisol capturó una técnica desde SU dispositivo, con su video HEVC, desde cero. Fila `3c40f492` en captured_techniques: captured_by marisol, applies_to_brands [NeuroneSCF], status awaiting_review, 15 frames, 601 OCR chars, cloud_vision, creado 1-jul 11:27. Bucket iid-expert-uploads en 0 tras la extracción (video borrado).
- **El caso HEVC que rompía el canvas ahora funciona en el equipo real de Marisol vía server-side.** Es la validación operativa que E3b-1/2/3 (probadas desde el entorno de Sam) no cubrían. E3 cerrado.
- Distinción registrada: la prueba de Sam desde Preview valida el código; la de Marisol desde su equipo valida el caso de uso real (su dispositivo, su red, su archivo crudo). Ambas verdes.

---

**INCIDENTE detectado (dominio R4B/dispatcher — NO tocado desde este chat, dejado a su chat con brief):**
- `content-dispatcher-poll` (cron jobid 29, cada 30 min) lleva **592 fallos consecutivos desde 17-jun 10:00**, cero éxitos en 14 días. También `iid-brief-biweekly` (jobid 2) falló hoy 1-jul 7:00 AM.
- **Causa raíz:** `intel.trigger_iid_agent` tiene DOS overloads — `(text)` y `(text, jsonb)`. Los crons la llaman con literal sin cast: `trigger_iid_agent('content-dispatcher')`. Postgres tipa el literal como `unknown` y no puede elegir → excepción `is not unique` → el job no dispara. El overload `(text,jsonb)` se agregó ~17-jun (coincide con el inicio de los fallos).
- **Implicación:** la EF content-dispatcher (v27) está sana pero **nadie la invoca** hace 2 semanas → el carril automático de contenido está parado. El contexto decía "cron 29 activo" sin capturar que fallaba en cada corrida.
- **Fix (no aplicado desde acá):** castear el literal a `::text`. Los ~24 crons `iid-*-research/process` (active:false) tienen el mismo bug latente. Bajo checkpoint HRD (mutación de cron.job en producción, dominio R4B). Brief entregado a Sam para su chat del dispatcher.

---

**Estado neto de #47 (Expert/Boids):** E1 tabla LIVE · E2 bucket LIVE (protagonista) · E3-EF iid-expert-ocr v1 LIVE (INTACTA) · **E3b-1/2/3/4 CERRADAS → E3 (captura Expert) COMPLETO end-to-end**. Marisol puede capturar técnicas en producción desde su dispositivo. Pendiente de Fase 1: **E5** (front Expert completo que reemplaza el mount temporal "Expert (prueba)") + **decisión E4** (absorber o no, ya que iid-expert-ocr hace la captura). Fase 2 (E6 calibración scope-gated + E7 skill genome-calibration + E8 resumen retomable) es otra cosa, no bloquea captura.

**Inventario de objetos nuevos/cambiados:**
- `Orchestrator`: `/api/sign-upload.ts` (nueva) + `ExpertCapture.tsx` (reescrito) + `iidExpert.ts` (helpers signUpload/uploadToSignedUrl/extractFrames) + vercel.json. PR #4 mergeado.
- `unrlvl-iid-functions`: EF `storage-orphan-sweep` (nueva, genérica). PR #8 mergeado + deployada.
- Secret nuevo en Supabase: `STORAGE_SWEEP_SECRET`.
- Crons: jobid 35 nuevo (iid-expert-orphan-sweep) + jobid 36 (unrlvl-media-temp-cleanup, reemplaza el 32 roto).
- Verify-JWT OFF en storage-orphan-sweep.

**Deudas vivas (no bloquean):**
- 🟡 **Rotar `STORAGE_SWEEP_SECRET`** — se pegó en el chat durante la prueba (blast radius mínimo). Higiene: regenerar → secrets set → actualizar command de jobid 35 y 36.
- 🔴 **Rotar contraseñas temporales Sembrador** antes de producción real (arrastrada de sesiones previas; el JWT secret vive en Supabase + Vercel → rotar en ambos).
- 🟡 Renombrar `ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET` (arrastra "NSCF" pero gobierna toda la auth IID) — mini-proyecto junto con la rotación.
- 🟡 Migrar service key a SUPABASE_SECRET_KEYS nueva cuando Storage la acepte (NO deshabilitar legacy).
- Limpiar filas de prueba viejas en captured_techniques (ca298046 D7Herbal 28-jun, 785af870 29-jun) antes de producción real, pendiente OK de Sam.
- Professor: 22 learnings de mayo pendientes (sessions 2026-05-26 y 2026-05-29).

**Professor:** 8 learnings del 1-jul APROBADOS por Sam (E3b-2 signed upload; gotcha content-type en sign; E3b-3 EF genérica; gotcha protect_delete trigger; gotcha list no-recursivo; incidente dispatcher; patrón verify-JWT en EF con auth propia; E3 cerrado end-to-end).

**Próximo (orden):** (1) **E5** — front Expert completo (sub-pestaña Basic/Expert que envuelve E3b-2 y reemplaza el mount temporal "Expert (prueba)"). Sesión CC apuntada a Orchestrator. (2) **Decisión E4** (absorber o mantener). (3) Fase 2: E6/E7/E8. En paralelo: **#45 brand_topics de las 6 marcas de Marisol** (BLOQUEANTE de producción — sin esto captura entra pero approve falla con "domain sin suscriptores"). El incidente del dispatcher lo resuelve el chat de R4B.

---

### 2026-06-28 (sesión c) — #47 E3b-1 CERRADO: ffmpeg server-side decodifica HEVC en producción · Sam + Claude (Chat 1) + CC

**Qué pasó:** se construyó y probó E3b-1 (`/api/extract-frames`), la pieza de mayor riesgo del rediseño server-side. ffmpeg decodificó el video HEVC REAL de Marisol en la Lambda de Vercel → 15 frames + borrado del video. La Vía D server-side está confirmada en producción-Preview. El camino tuvo una cadena larga de blockers de credenciales, todos resueltos a certeza.

**E3b-1 — `/api/extract-frames` (CC, repo Orchestrator, PR #3):**
- Serverless function Node nativo (`@vercel/node`, VercelRequest/VercelResponse), maxDuration=60, ffmpeg-static bundleado vía includeFiles.
- Contrato: recibe `{session_token, video_path}` → valida auth (token seeder, mismo JWT_SECRET) → descarga video del bucket (service role) a /tmp → ffmpeg extrae 15 frames ~720px JPEG → devuelve base64 → BORRA el video del bucket. Errores 200/400/401/404.
- Commits: fa4be2f (función) · 13dc2e0 (fix 2 errores TS: ffmpeg-static default import + proc.stderr null guard) · ca371e2 (trim defensivo secret) · 2497e4e (diagnóstico temporal key_len/sb_body) · 2c818c4 (fix mapeo 404 + limpieza del diagnóstico).
- Fix de contrato que CC observó: Supabase Storage devuelve HTTP 400 (body statusCode 404) para objeto faltante, así que el mapeo a 404 video_not_found no disparaba → normalizado.

**SMOKE E2E VERDE (Preview, commit 2c818c4):** con la service_role legacy en Vercel (key_len 40→219):
- Video HEVC real de Marisol (VID_20260628_043003_494.mp4, hvc1 1080×1920 43.28s): HTTP 200, 27.0s, ok:true, frame_count:15, duration_sec:43.28, video_deleted:true, 15/15 JPEG válidos (~1.46 MB).
- **ffmpeg decodificó el HEVC en la Lambda → justo lo que Chrome no podía.**
- Video borrado: verificado por SQL aparte (iid-expert-uploads = 0 objetos) — confirmado también por Claude Chat vía MCP.
- Contrato completo: 200 (15 frames+borrado) · 404 video_not_found (path inexistente) · 401 (token malo) · 400 (falta video_path).

**Cadena de blockers de credenciales resueltos (todos config de Sam):**
1. **env var faltante:** ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET no estaba en Vercel → 503 config_missing (fail-closed funcionó). Sam la agregó.
2. **JWT secret no matcheaba (401):** el secret regenerado tenía chars especiales (%, $, &, ^) que se interpretan distinto entre Vercel (Windows) y Supabase al pegar → valores efectivamente distintos aunque "copiados idéntico". CC lo diagnosticó a certeza (token válido contra iid-expert-ocr pero rechazado en Vercel; .trim() no ayudó → no era whitespace). Solución: regenerar ALFANUMÉRICO PURO (sin símbolos) y sincronizar Supabase+Vercel. Auth OK.
3. **Storage "Bucket not found" (key_len 40):** la SUPABASE_SERVICE_ROLE_KEY en Vercel era formato nuevo (sb_secret_, ~40c). PostgREST la acepta (queries andan) pero el Storage API NO la honra como service_role para bucket privado → bucket invisible. CC lo probó: misma URL con anon legacy da "Object not found" (bucket resuelve), con la key de Vercel da "Bucket not found". Solución: service_role LEGACY (eyJ... ~219c) de Settings>API Keys>pestaña "Legacy anon, service_role". key_len saltó 40→219. Reconfirma el learning ya registrado del ecosistema.

**Aclaración importante (Sam preguntó):** ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET es la columna vertebral de la auth IID (lo comparten iid-inbound, iid-expert-ocr, el front del Orchestrator y /api/extract-frames), NO solo de la function nueva. Cambiarlo invalida todos los tokens → re-login + sincronizar en ambas plataformas. Quedó resuelto (alfanumérico), NO se toca más. El proyecto Supabase migró a JWT Signing Keys; las legacy keys siguen activas y NO se deben deshabilitar (varias cosas las usan).

**Video al bucket:** lo subió Sam por Supabase Studio (Claude Chat no puede subir binarios: MCP solo SQL+EF, sandbox sin egress a supabase.co; service role key NUNCA circula por chat). video_path = VID_20260628_043003_494.mp4.

**Decisión que E3b-1 reveló para E3b-2:** el bucket iid-expert-uploads NO tiene policy de anon-insert → el navegador de Marisol no podrá subir directo con la anon key (solo service_role escribe ahí). Opciones para E3b-2: (a) policy de Storage para seeders autenticados; (b) signed upload URL generada por una /api con service role (probable mejor opción, evita límite de payload). A cerrar al diseñar E3b-2.

**Professor:** 6 learnings APROBADOS (E3b-1 cerrado; gotcha JWT secret chars especiales; gotcha service_role legacy para Storage; el JWT secret es columna vertebral de auth IID; Claude Chat no sube binarios a Storage; decisión de upload pendiente para E3b-2).

**Estados:** E1 tabla LIVE · E2 bucket LIVE (protagonista del flujo) · E3-EF iid-expert-ocr v1 LIVE+smoke verde (INTACTA) · E3b-1 cerrado (PR #3 a mergear). E3-FRONT-canvas (PR #2) obsoleto, reemplazado por server-side.

**Próximo (orden):** (1) Sam mergea PR #3. (2) **E3b-2 (front)** — reescribir ExpertCapture.tsx: subir video al bucket (DECISIÓN: signed upload URL vs policy) → llamar extract-frames → pasar frames a la EF. Sesión CC apuntada a Orchestrator. (3) E3b-3 cron huérfanos. (4) E3b-4 prueba real de Marisol desde su dispositivo (cierra E3). Luego E4 (revisar) → E5-E8. Pendiente seguridad: rotar contraseñas temporales (ahora el JWT secret vive en 2 lugares). Deudas: migrar a service key nueva cuando Storage la acepte; renombrar el secret (quitar NSCF).

---

### 2026-06-28 (sesión b) — #47 E3-FRONT-canvas FALLÓ con HEVC → REDISEÑO server-side · Sam + Claude (Chat 1)

**Qué pasó:** la prueba de E3-FRONT desde el equipo de Marisol FALLÓ — su video era HEVC/H.265 y Chrome no lo decodifica, así que la extracción canvas (Vía D) no pudo sacar frames. Se diagnosticó con VLC, se confirmó el códec, y se rediseñó la extracción a SERVER-SIDE con ffmpeg. Diseño cerrado con Sam (4 decisiones), consolidado en DISENO_E3_server_side.md. Pendiente construcción E3b-1..4.

**El fallo (diagnóstico completo):**
- Marisol probó desde su equipo (Acer, Chrome) con un video real → mensaje de error de decodificación del componente ("Este formato de video no se pudo leer en tu navegador") + Network tab mostró blobs a 0.0 kB (el componente manejó el fallo bien, no crasheó).
- VLC → Información del códec: **MPEG-H Part2/HEVC (H.265) (hvc1)**, 1080×1920, 43s, 30fps, audio AAC.
- Chrome en el equipo de Marisol NO decodifica HEVC → canvas no extrae frames.
- El video de Sam (que funcionó el 28-jun a) era H.264. **El peso NO era el problema** (el de Marisol pesaba menos). Era el códec.
- Leffón: extracción en el navegador depende del soporte de códec del navegador del usuario → frágil/impredecible para producto operado por no-técnicos. Pedirle al usuario convertir a mano (VLC) = la fricción que el diseño debe evitar.

**Rediseño — SERVER-SIDE TOTAL (4 decisiones cerradas con Sam):**
1. **Server-side total, NO híbrido.** Un solo camino: todos los videos a ffmpeg server-side, sin importar códec. El canvas se jubila. (Híbrido descartado: casos borde feos como frames negros en iOS en vez de fallo limpio.)
2. **El servicio Vercel SOLO extrae frames.** La EF iid-expert-ocr (probada, smoke verde) sigue con OCR+persistencia+scope. No se reimplementa nada de la EF.
3. **Flujo A — el navegador orquesta, la EF NO se toca.** Navegador: sube video al bucket → llama al servicio ffmpeg → recibe frames → los pasa a iid-expert-ocr (igual que hoy). La EF recibe frames en el body como ya está probada.
4. **ffmpeg como `/api` DENTRO del Orchestrator** (NO proyecto nuevo, NO ImageLab). Razón: es de ese dominio, CC ya tiene el repo, evita infra nueva para algo efímero; ffmpeg aislado en /api (el front no lo importa) mitiga el acople. (Sam cuestionó bien por qué mezclarlo con ImageLab; la respuesta correcta no era ni ImageLab ni proyecto nuevo, sino /api del propio Orchestrator.)

**Sub-decisiones:** el servicio ffmpeg borra el video del bucket apenas extrae frames + cron de huérfanos (barre videos > 1h). Bucket iid-expert-uploads (E2) pasa de "candidato a limpieza" a PROTAGONISTA.

**Cambio de postura anti-IP (explícito):** Vía D prometía "el video NUNCA toca la infra". Server-side total: el video SÍ sube al bucket, transita segundos, se borra. TRANSITA, no PERSISTE; solo persiste texto-método. Precio de soportar HEVC sin pedirle nada al usuario. El bucket E2 que NO se borró (red de seguridad) resultó ser justo lo que la solución necesitaba.

**Patrones cicatriz a respetar (en el diseño desde el inicio):**
- Handler Vercel Node nativo (VercelRequest/VercelResponse) — el formato Web API ignora maxDuration → 504. ffmpeg tarda más que una request normal.
- VITE_* env vars son build-time → undefined en runtime serverless. La function /api no usa prefijo VITE_ para secrets.
- Video sube DIRECTO al bucket por signed URL (no por la function, por límite de payload). La function recibe el path, no el video.
- Verificar (CC, antes de construir): ffmpeg-static entra en límites de bundle de Vercel; runtime soporta handler Node nativo.

**Plan de construcción (E3b, orden estricto):**
- E3b-1: `Orchestrator/api/extract-frames` (ffmpeg-static, handler Node nativo, borra video). Smoke con el MISMO video HEVC de Marisol.
- E3b-2: front ExpertCapture.tsx reescrito (sube a bucket → llama extract-frames → pasa frames a la EF intacta). Rama+PR+Preview.
- E3b-3: cron de limpieza de huérfanos.
- E3b-4: prueba real de Marisol con el MISMO video HEVC que falló → debe pasar E2E. Gate de cierre E3.
- Todo en repo Orchestrator (front + /api) → 1 sola sesión CC apuntada a Orchestrator. La EF NO se toca.

**Qué sigue intacto:** EF iid-expert-ocr v1 (smoke verde), tabla captured_techniques (E1), bucket iid-expert-uploads (E2, ahora protagonista). El PR #2 (canvas) quedó mergeado pero el canvas se reemplaza.

**Professor:** 3 learnings (extracción navegador frágil por códec/HEVC; solución server-side total + ubicación /api Orchestrator; cambio anti-IP documentado + valor de dejar redes de seguridad). Esperan aprobación de Sam.

**Próximo:** construir E3b-1 (/api/extract-frames). Luego E3b-2..4. Pendiente seguridad: rotar contraseñas temporales. E4 a revisar.

---

### 2026-06-28 — #47 E3-FRONT construido + prueba E2E exitosa desde Preview (Sam) · Sam + Claude (Chat 1) + CC (front)

**Qué pasó:** se construyó E3-FRONT (extracción de frames en el navegador, Vía D) y Sam lo probó end-to-end desde el Vercel Preview con un video real — extracción + OCR + persistencia TODO verde. Queda solo la prueba real desde el dispositivo de Marisol (desde cero, prog. 28-jun) para cerrar E3 formalmente. Sin learnings nuevos: la prueba confirma learnings ya aprobados (Vía D funciona, PEM des-escapado necesario, Vision lee texto útil).

**E3-FRONT (CC, repo Orchestrator, PR #2):**
- Sesión CC apuntada a `Orchestrator` (allowlist correcto, tell de arranque OK). Rama+PR+Preview, NO merge propio.
- `src/services/iidExpert.ts` (nuevo) — cliente de la EF iid-expert-ocr (patrón SB_URL + IidError de iidInbound.ts).
- `src/modules/iid/ExpertCapture.tsx` (nuevo) — núcleo: input video → extracción canvas NATIVA (sin librerías: `<video>` + seek + `<canvas>.drawImage` → JPEG ~720px) → preview thumbnails → envío a la EF con session_token. Parámetros tuneables al tope: MAX_FRAMES=15, TARGET_WIDTH=720, JPEG_QUALITY=0.8, SEEK_TIMEOUT_MS=8000.
- `src/App.tsx` (mod) — mount TEMPORAL "Expert (prueba)" en SeederShell para que Marisol (seeder) alcance el Expert en Preview. **Marcado como reemplazable por E5** (la sub-pestaña Expert completa). NO dejar en producción tal cual.
- Build verde (tsc -b + vite). package-lock.json restaurado (drift ajeno, fuera de scope).

**Ajuste caption (mismo PR #2):** el componente mandaba `captions` como campo suelto que la EF ignora → se perdía. Claude detectó la pérdida silenciosa. Fix: el caption va dentro de `source_refs` como elemento del array (`['<link>', { caption: '<texto>' }]`). CC verificó contra el código deployado de la EF que `source_refs` se persiste con `Array.isArray(source_refs) ? source_refs : []` → un objeto suelto se descartaría a `[]`; la opción (a) (caption como elemento del array) pasa el guard. Sin tocar la EF (source_refs es jsonb libre).

**PRUEBA E2E (Sam, desde el Vercel Preview — NO aún desde dispositivo de Marisol):**
- Video real `VID_...mp4` (720×1280, ~30s, 1057 KB) → **15 frames extraídos** (canvas funcionó en el navegador de Sam — el ~20% de riesgo de Vía D superado en este entorno).
- Cloud Vision leyó **1115 caracteres de calidad** (un Reel sobre edge AI; la estructura de divulgación fenómeno→arquitectura→demo→lección visible en el OCR — exactamente la materia prima que la Fase 2 destila).
- Fila persistida: `captured_by: marisol`, `applies_to_brands: [NeuroneSCF]` (scope validado server-side), `status: awaiting_review`, `raw_material` con ocr_consolidated + frame_count + ocr_engine.
- Confirma el pipeline completo de Fase 1 con datos reales (no el smoke sintético).
- **Fila de prueba BORRADA** (era de tech/AI, no de marcas de Patricia; mañana se prueba desde cero). Tabla captured_techniques en 0 filas.

**Observaciones honestas:**
- `source_refs` salió `[]` en la prueba porque Sam no pegó caption ni link → el mecanismo del caption NO se ejercitó (funcionó con campos vacíos como debía, pero falta una captura CON caption para confirmar que se guarda).
- El email de #48 NO llega en modo Expert — correcto por diseño: notifyGate vive en iid-inbound (Sembrador Basic), no en iid-expert-ocr. La técnica queda en awaiting_review para Fase 2, no es gate urgente. Si se quiere notificación para Expert, es decisión aparte.
- El contenido fue tech/AI (prueba técnica válida); el uso real será material de haircare/salón de las marcas de Patricia.

**Sin email de notificación en Expert / sobre iPhone:** Sam preguntó si Marisol puede trabajar desde iPhone. Respuesta: la mitad fácil (subir/enviar) sí; la extracción canvas en Safari iOS tiene riesgo conocido (autoplay/decode restringido → frames negros; requiere playsinline+muted; límites de memoria más estrictos). NO verificado — si Marisol usa iPhone, la prueba debe correr en iPhone y conviene endurecer para iOS antes. Pendiente según el dispositivo real de uso.

**PENDIENTE para cerrar E3 (gate real):** prueba desde el dispositivo de Marisol, desde cero (prog. 28-jun). Valida el navegador/dispositivo real. Verde → Vía D confirmada → **limpiar bucket E2** (`DELETE FROM storage.buckets WHERE id='iid-expert-uploads';`). Falla (códec/payload/iOS) → plan B (bucket E2 ya existe). E2 se mantiene como red de seguridad hasta entonces (un bucket vacío no cuesta).

**Professor:** sin learnings nuevos (la prueba confirma learnings ya aprobados, no agrega conocimiento — capturar "lo confirmado" sería ruido).

**Próximo (orden):** (1) Sam mergea PR #2 (tras verificar Preview). (2) **Prueba real de Marisol** desde su dispositivo (cierra E3, decide E2). (3) E4 (revisar si E3-EF la absorbe — `iid-expert-ocr` ya hace la captura). (4) E5 (sub-pestaña Expert completa, reemplaza el mount temporal) → E6 calibración → E7 skill genome-calibration → E8 resumen retomable. Luego #45 brand_topics 6 marcas Marisol. Pendiente seguridad: rotar contraseñas temporales antes de producción real.

---

### 2026-06-27 (sesión c) — #47 E1+E2+E3-EF construidos y verificados (Vía D) · Sam + Claude (Chat 1) + CC (informe + EF + smoke)

**Qué pasó:** se construyó y verificó el tramo servidor del modo Expert (Fase 1). El informe de factibilidad de CC mató la arquitectura EF-self-contained y reorientó a **Vía D** (frames extraídos en el navegador + OCR por Cloud Vision). E1 (tabla), E2 (bucket), E3-EF (la EF `iid-expert-ocr` v1) construidos, deployados y con smoke verde. Queda E3-FRONT (extracción canvas en Orchestrator) + prueba real de Marisol.

**Informe E3-exploratorio (CC, read-only) — mató la EF self-contained:**
- Runtime de EF Supabase (Deno isolate): **NO permite subprocess** (`"spawning subprocesses is not allowed"`) → ffmpeg/tesseract como binarios imposible. **Cap 2s CPU** → OCR pesado in-EF imposible aunque sea WASM. **Bundle 20MB** → ffmpeg.wasm (~31MB) no cabe. Verificado contra docs oficiales, supuestos abiertos declarados.
- Recomendación de CC: EF orquestadora + lab Vercel. Claude reabrió la opción descartada (frames en cliente) corrigiendo el criterio: extraer frames en el navegador NO necesita ffmpeg.wasm — el canvas nativo ya decodifica video, gratis, sin instalar nada. Eso parte el problema: extracción (navegador, trivial) + OCR (API externa).

**Decisión de arquitectura — Vía D (cerrada con Sam):**
- Navegador de Marisol extrae frames con canvas nativo → redimensiona ~720px JPEG → manda en el body a la EF → EF hace OCR vía **Cloud Vision** (DOCUMENT_TEXT_DETECTION) reusando la **credencial Vertex existente** (GOOGLE_SERVICE_ACCOUNT_KEY, proyecto gen-lang-client-0491381650; cero proveedor nuevo) → consolida texto (dedupe) → persiste solo texto en captured_techniques.
- **Anti-IP máximo:** el video ajeno NUNCA toca la infra (se queda en el navegador). Solo suben frames-imagen, que la EF OCRea y descarta. Persiste solo texto-método.
- OCR vía Vision: Sam confirmó por captura que la **Cloud Vision API está habilitada** en el proyecto y el SA `imagelab-vercel` es compatible (paso de Sam, distinto de tener la credencial Vertex — son APIs distintas del mismo proyecto).
- Frames en el body (no bucket), redimensionados — probamos la vía simple; si el payload no cabe en la prueba, se ajusta antes de reintroducir bucket.

**E1 (tabla) — LIVE:** `intel.captured_techniques` (17 cols, precursora de brand_voice_genome, 2 CHECKs lane/status, GRANT service_role, 2 índices). Aplicada por Claude vía apply_migration. (registrada en sesión b)

**E2 (bucket) — LIVE CONDICIONAL:** bucket privado `iid-expert-uploads` (50MB, MIME video+imagen). Creado por Claude vía migración. NOTA: con Vía D el video no necesita subir (frames en body) → **el bucket queda candidato a LIMPIEZA tras la prueba real de Marisol**. Es la red de seguridad por si la extracción canvas falla en su navegador (plan B: video al bucket). Rollback: `DELETE FROM storage.buckets WHERE id='iid-expert-uploads';`.

**E3-EF (la EF) — v1 LIVE + smoke verde:**
- `iid-expert-ocr` v1 (231 líneas, nueva). Auth dos ejes reusada de iid-inbound (mismo JWT_SECRET, rol seeder/admin, scope server-side fail-closed). OAuth2 del SA (PKCS8 → RS256 JWT → access_token) → Cloud Vision batch ≤16 → consolida → persiste raw_material en awaiting_review. NO analiza técnica (Fase 2). NO guarda imagen ni video.
- **PR #6** (CC, en unrlvl-iid-functions) mergeado. Pre-flight verificó esquema real de captured_techniques.
- **Fix PEM (PR #7):** Claude detectó al revisar el código que `pemToPkcs8` asumía saltos reales en la private_key, pero el JSON del SA trae `\n` ESCAPADOS como secret. CC añadió des-escapado defensivo (`replace(/\\n/g,"\n")` antes de limpiar la PEM) por PR — NO Claude inyectándolo en el deploy (eso reintroduciría el desfase git↔deploy de #48). Sam mergeó.
- **Deploy:** Claude deployó por MCP el contenido EXACTO de main (con el fix) → v1, paridad git↔deploy desde el minuto uno. verify_jwt=false.
- **Smoke (CC, entorno local de Sam — tiene red a supabase.co que el sandbox de Claude Chat no):** CC generó imagen de prueba, se logueó como seeder, disparó la EF. Happy-path: `ok:true`, chars_extracted=59, **texto OCR coincide exacto con la imagen** (PEM→Vision→insert sano — confirma que el fix de PEM era necesario). Scope 403 (marca fuera de scope rechazada). Body vacío 400. Filas de prueba borradas. Gobernanza limpia.

**HALLAZGO DE SEGURIDAD (smoke E3):** la contraseña temporal de Marisol registrada en el contexto (`TempMari2026!`) NO coincide con la real (la que funcionó en login). El contexto registra una credencial incorrecta Y expuesta. Doble problema: credenciales en texto en el contexto + la registrada ni funciona. **Acción: rotar las contraseñas temporales del Sembrador antes de producción real de Marisol (sube prioridad), vía script local sin pasar por chat, regenerar JSON de ORCHESTRATOR_NSCF_IID_INTEL_USERS, recargar solo ese secret. Limpiar la referencia del contexto.** (Nunca debe haber credenciales en el contexto.)

**Revisión pendiente — ¿E4 sigue siendo necesaria?** El plan original tenía E4 = acciones `expert_*` en iid-inbound. Pero E3-EF (`iid-expert-ocr`) ya hace la captura completa como EF propia. Evaluar al llegar a E4 si se absorbe o se mantiene separada. No bloquea E3-FRONT.

**Inventario nuevo/cambiado:** `intel.captured_techniques` (E1) · bucket `iid-expert-uploads` (E2, condicional) · EF `iid-expert-ocr` v1 (E3-EF, PRs #6+#7 en unrlvl-iid-functions). Vision API habilitada en GCP. iid-inbound confirmado deploy v9.

**Professor:** 6 learnings nuevos (runtime EF sin subprocess/2s CPU → trabajo pesado fuera; Vía D frames-navegador+Vision; des-escapado PEM del SA; paridad git↔deploy en deploy por MCP; smoke E2E local por CC; deuda seguridad contraseña). 28 learnings de la ventana IID (24+27-jun) APROBADOS por Sam. 22 de mayo pendientes (listados, a criterio de Sam).

**Próximo (orden):** (1) **E3-FRONT** — extracción de frames con canvas en `Orchestrator` (sesión CC apuntada a ESE repo; allowlist se fija al arrancar). Construir el módulo de extracción aislado y probarlo antes de envolver la UI Expert completa. (2) **Prueba real de Marisol** desde su computadora — cierra E3, valida el navegador, **decide el destino de E2** (verde → limpiar bucket; falla → plan B). (3) E4 (revisar necesidad) → E5-E8. Luego #45 brand_topics 6 marcas Marisol (bloqueante de producción).

---

### 2026-06-27 (sesión b) — #47 Expert/Boids DISEÑADO y cerrado + E1 construido (anclado en código real) · Sam + Claude (Chat 1)

**Qué pasó:** sesión de DISEÑO de #47 (segundo modo de captura del Sembrador) + ejecución de E1. Se cerraron las 6 decisiones que el contexto marcaba como "tomar con Sam ANTES de construir, no asumir". Cada decisión se ancló verificando código/esquema real, no supuestos. E1 (DDL) ejecutado y verde. Plan E1-E8 listo; E2-E8 para próximos tramos. No se tocó producción salvo el DDL de E1 (aditivo, reversible) y Professor INSERT.

**Reframe central (corrige el mapeo previo del contexto):** el mapeo asumía que Expert produce un "seed pedagógico" (lane=pedagogical) que va a fan-out. FALSO, verificado contra esquema de iid_seeds: su forma (neutral_topic/mapped_domain/finding_id/dispatched_at) es para temas que van a publicar. Expert produce ANÁLISIS DE MÉTODO — materia prima para construir una voz, no un tema. Forzarlo en iid_seeds repetiría el pecado original. → Expert necesita tabla propia `intel.captured_techniques`. El lane=pedagogical sigue vivo pero para el carril paralelo (técnica ya convertida en voz que genera contenido), no para almacenar el análisis.

**Distinción que Sam aportó y reorganizó el diseño:** efímero por-marca ≠ efímero para UNRLVL. Expert es infraestructura PERMANENTE de onboarding — se usa en ráfagas al inicio de cada marca/cliente, pero se reusa con cada cliente nuevo. Eso sube #47 de "sprint con UI ligera" a subsistema con tabla + UI operada por delegado + persistencia del método.

**Las 6 decisiones cerradas:**
1. **A — OCR-only, sin Whisper.** Sam corrigió: navegador no puede detectar/instalar software en máquina del cliente (sandbox browser por diseño); Whisper revienta EF Supabase (mismo muro que en sandbox Claude Chat); Boids se resolvió con OCR de frames. Clips ~15s + captions exigibles + ffmpeg fps=1 → Tesseract server-side. Audio se ignora deliberadamente (on-screen + caption alcanza para leer técnica).
2. **B — tabla `intel.captured_techniques`** diseñada mapeando campo-a-campo a brand_voice_genome real (verificado vía information_schema + fila Lucien editorial poblada). divulgation_structure (fenómeno→modelo→reglas→proyección, forma que reveló Boids) → argumentative_architecture. technique_summary (prosa retomable) → notes + handoff Fase1→2.
3. **C — dos fases.** Fase 1 (captura+OCR+análisis) se construye. Fase 2 (calibración por convergencia) es SKILL conversacional. El método de Lucien (Claude genera tentativas, Sam juzga "¿es Lucien? sí/no/por qué", converge a textos limpios; con Lucien fueron 10 textos, últimos 3 limpios) es juicio irreducible → no se automatiza, se codifica como protocolo (`genome-calibration`).
4. **Quién opera — calibración scope-gated.** Sam pidió que Marisol calibre para ahorrar tiempo de Sam. Claude frenó condicionalmente: quien calibra debe ser experto de dominio (la señal sí/no vale lo que vale el juez). Marisol PUEDE calibrar sus 6 marcas (experta haircare), NUNCA Lucien/UNRLVL. Candados: scope server-side (gerente-de-cuentas) + INSERT a brand_voice_genome lo firma SIEMPRE Sam. El gate de Sam pasa de proceso (cada texto) a producto (voz convergida). Sam aceptó con ambos candados.
5. **EF OCR en `unrlvl-iid-functions`** (versionada, como iid-inbound — lleva lógica de producto operada por cliente, merece versión).
6. **Storage solo-frames.** Sam mejoró la propuesta: guardar SOLO los frames (no el video), retención cortísima, borrar tras extraer. El video ajeno nunca persiste → anti-IP reducido a casi cero (solo persiste texto-método destilado).

**Fase 2 = Skill (decisión de Sam):** el bucle de calibración es protocolo conversacional, no software → `skills/genome-calibration/SKILL.md`, carga bajo demanda. Codifica: cómo retomar desde technique_summary, generar tentativas, registrar señal sí/no, declarar convergencia, cerrar con INSERT a brand_voice_genome. Repetible para cada marca sin reinventar el método.

**Verificaciones contra código real (lo que afiló el diseño):**
- `voice-reference-extractor` skill: ya hace OCR+Whisper LOCAL y se autodescribe como "paso 1 de construcción de brand_voice_genome" con paso 2 = "chat con Claude". El flujo de Expert ya existía como concepto; #47 le da UI + persistencia.
- Front IID Seeds (Orchestrator): ya existen IidSeedsCapture/Approve/iidInbound/LoginScreen/gating en App.tsx. "Renombrar Capturar→Basic + crear Expert" = selector de modo + IidSeedsExpert.tsx nuevo, reusando auth/scope entero.
- iid_seeds esquema + CHECKs: lane ∈ {standard,pedagogical} confirmado; status hasta dispatched; forma para temas-a-publicar (no para método).
- brand_voice_genome esquema + fila Lucien editorial: 18 columnas jsonb (identity_anchors, argumentative_architecture, lexicon_signature/forbidden, syntactic_signatures, relational_stance, emotional_register, source_evidence...). La tabla captured_techniques se diseñó como su precursora.

**E1 EJECUTADO (verde, 27-jun):** migración `captured_techniques_t1_expert_boids` aplicada. `intel.captured_techniques` LIVE — 17 columnas (id, creator_handle, source_refs jsonb, raw_material jsonb, technique_summary, divulgation_structure jsonb, register_notes jsonb, lexicon_observed jsonb, applies_to_brands text[], tags text[], captured_by, lane, status, resulting_voice_id, rejected_reason, created_at, updated_at). 2 CHECKs: lane ∈ {standard,pedagogical}; status ∈ {awaiting_review,approved,in_calibration,genome_built,rejected,archived}. GRANT ALL service_role. 2 índices (status, captured_by). Rollback: `DROP TABLE IF EXISTS intel.captured_techniques;`. Aditivo, no tocó iid_seeds ni el Sembrador.

**Plan de construcción (E1-E8, orden estricto, cada uno verde antes del siguiente):** E1 ✅ DDL captured_techniques · E2 bucket Storage frames · E3 EF iid-expert-ocr (unrlvl-iid-functions) · E4 iid-inbound acciones expert_* · E5 front sub-pestaña Expert (Orchestrator) · E6 calibración scope-gated · E7 skill genome-calibration · E8 resumen retomable. E1 fue DDL puro (sin sesión CC apuntada). E3/E4 → sesión CC en unrlvl-iid-functions; E5 → sesión CC en Orchestrator (allowlist se fija al arrancar — dos tramos).

**Professor:** 5 learnings capturados, esperando aprobación de Sam (Expert=2 fases no seed pedagógico / calibración por convergencia=juicio irreducible=skill / calibración scope-gated requiere experto de dominio / Whisper inviable→OCR-only / tabla precursora se diseña leyendo forma destino).

**Próximo:** construir E2-E8 de #47. Luego #45 brand_topics 6 marcas Marisol (bloqueante de producción). Carril paralelo: voz hermana pedagógica (lane ya listo).

---

### 2026-06-27 — #48 Approval por email COMPLETO y verificado en vivo + corrección v8→v9 · Sam + Claude (Chat 1) + CC (PR)

**Qué pasó:** se diseñó, construyó y verificó end-to-end **#48 (notificación de gate por email)**. Cuando una semilla entra a `awaiting_approval`, `iid-inbound` dispara un email a `content-approval@unrealvillestudio.com` con enlace a la raíz del Orchestrator — sin resumen, anti-IP. Deploy v9 LIVE, las 5 verificaciones pasadas. Quedó pendiente solo #47 (Expert/Boids) y #45 (bloqueante) para sesiones propias.

**Decisiones de diseño (cerradas con Sam):**
- **A1 — envío INLINE en `iid-inbound` capture** (no EF separada). Replica el patrón Resend de `content-run-stage`, no el de `nscf-mailer`. Argumento: single-responsibility no paga su costo para un fetch de una línea; content-run-stage (orquestador pesado) ya manda su email inline — coherencia, no deuda.
- **B1 — email en TODO `awaiting_approval`** (con o sin `mapped_domain`). NO en `failed` (esa rama retorna 502 antes de llegar a notifyGate). La semilla sin domain es justo la que más necesita atención de Sam (asignar domain en el approve) → no se filtra.
- **Asunto = neutral_topic** con distinción por mapeo: `[IID Seed · pendiente] {topic}` si hay domain, `[IID Seed · sin mapear] {topic}` si null. Distingue de un vistazo cuáles requieren que Sam asigne domain a mano.
- **Fire-and-forget con await:** el await garantiza el despacho antes de que el runtime de la EF mate el proceso; el helper traga su propio error (nunca lanza) → cumple "nunca tumba el capture". Trade-off aceptado: añade la latencia del fetch a Resend al response del capture (~200-600ms). Si molesta en la mano de Marisol, fix trivial post-merge (quitar await + .catch). Se dejó con await por fiabilidad del email > latencia.
- **Enlace solo a raíz del Orchestrator** (`orchestrator-unrlvl.vercel.app`): verificado que el Orchestrator es estado React puro SIN routing por URL — no existe deep-link a la cola. Coincide con lo pedido ("solo enlace, sin resumen").

**Patrón Resend confirmado (verificado contra código real):**
- Correcto = `content-run-stage` v33+: key `RESEND_UNRLVL_KEY`, from `Content Queue <content@unrealvillestudio.com>`, to `content-approval@unrealvillestudio.com`.
- Trampa evitada = `nscf-mailer`: usa `RESEND_API_KEY` (cuenta NSCF) + from `noreply@neuronescflorida.com` — clonarlo sería reincidir en el bug histórico (cada marca su key Resend). `notifyGate` NO clonó nscf-mailer.
- `RESEND_UNRLVL_KEY` confirmada existente en el store de secrets del proyecto (Sam: emails de piezas llegan hoy; además hay un `[TEST UNRLVL] Canal de aprobación — RESEND_UNRLVL_KEY OK` del 17-jun en la bandeja).

**CORRECCIÓN MAYOR — v8 fantasma (desfase numeración git↔deploy):**
- El brief decía bump v7→v8. CC reportó que el deploy YA estaba en v8 (26-jun 20:24 UTC) sin #48. Claude verificó: comparó cabecera + constantes + rama capture del bundle v8 deployado contra el git source (sha ce0e29b) → **funcionalmente IDÉNTICOS** (solo difiere la re-serialización del bundler). El v8 fue un **redeploy benigno sin cambio de código** (probable recarga de secret al cierre de T4, o desfase git↔deploy: cada `deploy_edge_function` incrementa versión aunque el contenido no cambie).
- **No hay deuda ni código perdido.** El git refleja fielmente lo que corría. #48 entró como **v9**, no v8.
- Lección durable: la versión del deploy NO vive en el código (el header dice v2.0); vive en Supabase. Nunca asumir git vN == deploy vN; verificar con `get_edge_function` antes de bumpear.

**Gobernanza / acceso (CC):**
- CC se topó con el allowlist de repos pinneado a `unrlvl-context` — no podía leer/escribir/PR en `unrlvl-iid-functions` (403 en MCP y git clone). Habilitar el connector de GitHub a nivel cuenta NO amplía el allowlist de una sesión ya iniciada; hay que ARRANCAR la sesión apuntada al repo. CC actuó correctamente: se negó a rodear el límite vía el proxy Vercel api/gh. Tell de arranque establecido: el primer `get_file_contents` sobre el target debe devolver el archivo; si da 403, parar.
- En la sesión correcta (apuntada a `unrlvl-iid-functions`) CC aplicó las 4 inserciones, verificó el ancla idéntica, confirmó blob LF-clean (working-tree CRLF por `core.autocrlf=true` es solo artefacto), y abrió **PR #5** en `unrlvl-iid-functions`. Sam mergeó y borró la rama.

**Implementación (`supabase/functions/iid-inbound/index.ts`, +42 líneas, 0 borrados, sha 88f4609):**
- Constantes `RESEND_KEY`, `ORCH_URL`, `APPROVAL_TO`, `APPROVAL_FROM` tras `CLAUDE_MODEL`.
- Helper `notifyGate(neutralTopic, mappedDomain)` tras `subscribers(...)`.
- Llamada `await notifyGate(...)` en la rama capture, entre el `update` a awaiting_approval y el `return` (solo caso éxito).
- Entrada de cabecera `2026-06-27 (CC · #48)`.

**Deploy + verificación (Claude, MCP):**
- Deploy v9 ACTIVE desde el main mergeado (vía `deploy_edge_function`, LF limpio). Confirmado `version: 9`, status ACTIVE.
- **Verificación vía EF-stub de diagnóstico temporal `iid-notify-test`** (aísla la lógica de notifyGate; necesario porque el sandbox de Claude Chat NO tiene `*.supabase.co` en su allowlist de egress — no puede invocar EFs ni curl-ear directamente; y `get_logs` del MCP está roto con 404). Sam disparó los 3 tests con curl local (CMD Windows: comandos en una línea, comillas dobles escapadas):
  - **Test 1 (con domain):** `ok:true`, status 200, Resend id, asunto `[IID Seed · pendiente] Adopción de agentes autónomos en pymes [PRUEBA #48]`. Email LLEGÓ. ✅ (verif #1)
  - **Test 2 (sin mapear):** `ok:true`, status 200, asunto `[IID Seed · sin mapear] Técnica de retención capilar post-tratamiento [PRUEBA #48]`. Email LLEGÓ con etiqueta correcta. ✅ (verif #2, confirma B1)
  - **Test 3 (sin key):** `ok:false`, `detail:"no-key (esperado)"`, status 200, sin crash, **email NO llegó**. ✅ (verif #4 fire-and-forget no tumba)
  - **Verif #3 (failed-no-email):** por lectura de código — la rama failed retorna 502 antes de notifyGate. ✅
  - **Verif #5 (enlace):** el HTML del email muestra botón "Abrir Cola de revisión →" a `orchestrator-unrlvl.vercel.app`. ✅
- Stub `iid-notify-test` BORRADO por Sam tras los tests (higiene; no tocaba iid_seeds → cola de Marisol limpia, sin filas de prueba que borrar).

**Inventario de objetos nuevos/cambiados:**
- `iid-inbound` **v9** (= v7 funcional + notifyGate #48). PR #5 en `unrlvl-iid-functions` mergeado.
- Stub temporal `iid-notify-test` creado y borrado (no deja rastro).
- Sin cambios de DDL, sin secrets nuevos (RESEND_UNRLVL_KEY ya existía).

**Deuda nueva registrada:**
- **`unrlvl-supabase-mcp:get_logs` ROTO** — devuelve 404 (`Cannot POST .../analytics/endpoints/logs.all`). Impide leer logs de EF por MCP desde Claude Chat. Workaround usado: stub + disparo externo + confirmación por bandeja.
- **Sandbox de Claude Chat sin egress a `*.supabase.co`** — Claude no puede invocar/curl-ear EFs; el disparo de tráfico de verificación debe venir de afuera (Sam curl local).

**Professor:** 5 learnings capturados (desfase numeración git↔deploy / allowlist de sesión CC no amplía en caliente / limitaciones entorno Claude Chat: egress + get_logs roto / CMD Windows backslash+comillas / #48 patrón email-approval completo).

**Próximo (orden):** (1) **#45 sembrar brand_topics de las 6 marcas de Marisol** — BLOQUEANTE de producción, decisión de arquitectura de contenido, sesión propia con HRD. (2) **Sprint modo Expert/Boids (#47)** — segundo modo de captura (sub-pestaña Basic/Expert + upload + framing/OCR/análisis de técnica + seed pedagógico). Requiere decisiones de diseño con Sam antes de construir (dónde corre el análisis, cómo se persiste el output del método, dónde se almacena el upload). (3) **#46 tab Topic Proposals**. Carril paralelo: voz hermana pedagógica (lane ya listo).

---

### 2026-06-26 — IID Sembrador T4 COMPLETO: front IID Seeds + auth rol/scope + iid-inbound versionado · Sam + Claude (Chat 1) + CC (ejecución)

**Qué pasó:** se ejecutó y cerró T4 del Sembrador en orden estricto (E1→E4, cada etapa verifica verde antes de la siguiente). El front IID Seeds está LIVE en el Orchestrator con auth de dos ejes (rol + scope de marca), y `iid-inbound` quedó versionado en git por primera vez. Varias decisiones de diseño se tomaron sobre código real, no sobre supuestos del brief (el Orchestrator NO tenía auth; el patrón NSCF es EF de Supabase, no /api/*; iid-inbound no tenía fuente en git). Se descubrieron y mapearon dos modos de semilla (Basic vs Expert/Boids) que redefinen el roadmap del Sembrador.

**Hallazgos sobre código real (corrigieron supuestos del brief):**
- **El Orchestrator NO tenía NINGÚN auth** (sin login/roles/JWT/guards) — App.tsx renderizaba todo abierto. El brief asumía "extender" un auth tipo NSCF; la realidad fue construirlo desde cero.
- **El patrón NSCF-Console real** (verificado en `nscf-b2b-approve`): NO vive en /api/* de Vercel sino en una EF de Supabase. Usuarios en secret JSON `[{sub,role,hash}]`, bcryptjs@2.4.3 cost 10, JWT HS256 djwt v3.0.2, matriz PERMISSIONS fail-closed, sin short-circuit en el compare (anti-timing). Se replicó este patrón en `iid-inbound`.
- **`iid-inbound` no tenía fuente en git** (ningún repo). El ESZIP del deploy no es TS legible → la fuente limpia para el commit-cero la proveyó Sam (el index.ts que tenía), NO una reconstrucción del runtime.
- **6 marcas de Marisol existen en `public.brands` pero NO en `intel.brand_topics`** → captura destila pero approve daría "domain sin suscriptores". BLOQUEANTE de producción = #45 (sembrar sus topics, sesión propia de arquitectura de contenido). El sistema queda DORMIDO para ellas hasta entonces.

**E1 — Versionar iid-inbound en git (sin cambios funcionales):** repo nuevo dedicado **`unrealvillestudio-hub/unrlvl-iid-functions`** (private) creado por Sam — infraestructura UNRLVL-core, NO de cliente (descartado meterlo en NeuroneSCF o Orchestrator). Estructura `supabase/functions/iid-inbound/`. Commit-cero = el index.ts real provisto por Sam. PR#1 mergeado. Salda parcialmente la deuda §1/§43 (versionar EFs del IID) para esta EF; el resto de EFs IID siguen direct-on-prod.

**E2 — DDL `seeder_rationale`:** columna aditiva en `intel.iid_seeds` (criterio del seeder, captura razonada). Rollback capturado. Sin CHECK que tocar; RLS deshabilitado.

**E3 — Auth de dos ejes en iid-inbound (VERDE):**
- Patrón `nscf-b2b-approve`: login solo-contraseña → recorre usuarios, compara bcrypt, emite JWT 8h con `{sub, role, brand_scope}`. Matriz PERMISSIONS: `capture` (seeder+admin), `list` (seeder solo lo suyo / admin todo), `approve`/`reject` (admin), `list_options` (filtrado por scope).
- **Scope de marca = eje NUEVO, ortogonal al rol (modelo gerente-de-cuentas):** cada usuario solo ve/toca SUS marcas, garantizado server-side en la EF (no en UI). Marisol scope = VivoseMask, D7Herbal, VizosCosmetics, PatriciaOsorioVizosSalon, PatriciaOsorioConectando, NeuroneSCF (6 id reales). Nuevo usuario futuro = su brand_scope en el secret, cero código.
- Secrets en Supabase: `ORCHESTRATOR_NSCF_IID_INTEL_USERS` (JSON bcrypt+rol+scope) + `ORCHESTRATOR_NSCF_IID_INTEL_JWT_SECRET`. PR#2 mergeado.
- **2 bugs hallados y corregidos en la verificación:** (1) `list_options` pedía `brands.name` (no existe; es `display_name`) → alias `name:display_name`. (2) `service_role` NO tenía SELECT sobre `public.brands` (lo tenían anon/authenticated) — nueva instancia del patrón recurrente "faltan GRANTs", esta vez en tabla VIEJA consultada por EF nueva. Fix: `GRANT SELECT ON public.brands TO service_role` (migración aditiva/reversible).
- **Verificación (token de seeder real):** seeder `approve`→403, `reject`→403, `list`→solo lo suyo, `list_options`→solo sus 6 marcas (no las ~13). login wrong-pw/sin-token/acción-desconocida → 401/401/403 fail-closed. Modelo gerente-de-cuentas confirmado funcionando.
- **Migraciones versionadas:** PR#3 añadió `supabase/migrations/` al repo con las 3 migraciones aplicadas (iid_seeds, seeder_rationale, grant brands), cada una con rollback. Byte-parity git↔prod establecido por identidad de contenido (sha-diff automático no posible sin supabase CLI — prueba dura pendiente, riesgo bajísimo: solo comentarios).

**E4 — Front IID Seeds en Orchestrator (LIVE, mergeado):**
- Repo `Orchestrator` (rama+PR+Vercel Preview, gobernanza correcta — a diferencia de las EFs IID, este repo SÍ tiene repo). PR#1 (Orchestrator) mergeado tras validación de Sam en el Preview.
- **Auth gating (`App.tsx`):** sesión en memoria (re-login al refrescar); sin sesión → LoginScreen (un password, con toggle ojo). `role==='seeder'` → NAV reducida a SOLO "IID Seeds" captura (Hub/Launchpad/Monitor/resto NO renderizan ni alcanzables); `role==='admin'` → NAV completa + subpestaña "IID Seeds" (cola/approve) en IID Intel.
- **Servicio `src/services/iidInbound.ts`:** fetch directo a la EF con `{action, session_token}` (patrón SB_URL existente, sin /api/* intermedio).
- **Captura (seeder+admin):** source_url (reetiquetado "Link de referencia — no se procesa", anti-IP visible), raw_signal, seeder_rationale (criterio de Marisol), **"¿Para qué marca lo ves?" REQUIRED** (select con solo las marcas del scope; `seeder_brand_suggestion` — sugerencia, NO mapeo; Sam decide el ruteo real), handle?. Confirmación "pendiente de revisión de Sam"; lista "mis semillas" read-only; banner honesto #45.
- **Approve (solo admin):** cola awaiting_approval + toggle failed; cards con seeder_rationale / seeder_brand_suggestion ("pista, no ruteo") / neutral_topic / distill_notes(summary+confianza) / mapeo / captured_by; corrección inline con select domain+brand desde list_options; Aprobar → finding_id+queue_entries; Rechazar (motivo obligatorio); aviso out_of_scope.
- **Ajuste post-validación (3 cambios):** toggle ojo en password (#1); campo marca-sugerida required (#2, columna `seeder_brand_suggestion` añadida a iid_seeds vía PR#4 en unrlvl-iid-functions → EF v7); reetiquetar source_url (#3). iid-inbound EF: v6→**v7** (acepta+devuelve seeder_brand_suggestion), verify_jwt:false preservado.
- **Verificación (Sam en Preview):** login con ojo, scope de Marisol (solo 6 marcas, required), gating (seeder solo ve IID Seeds), card de approve con sugerencia de marca. Todo verde → merge.

**Qué es el "Destilado IID" (aclarado a Sam):** NO es post/prompt/contenido — es un **tema de investigación neutro** (el concepto abstracto que el IID investiga desde cero, anti-IP). Aprobar hace handoff a iid-core → finding → fan-out a marcas suscritas → entra al pipeline normal (NO dispara copylab/imagelab directamente; el contenido viene mucho después con sus gates). El "confianza X%" = confianza del destilador en el mapeo a domain (dio 5% en prueba porque las marcas de Marisol no tienen topics aún — el sistema diciendo la verdad). El link es rastro de procedencia, el sistema NO lo lee/procesa (anti-IP: la semilla es disparador, no material).

**DESCUBRIMIENTO MAYOR — dos modos de semilla (redefine roadmap):**
- **Modo BASIC (el actual, LIVE):** link + frase → tema neutro → research desde cero. Anti-IP duro (material nunca leído). Régimen PERMANENTE.
- **Modo EXPERT/BOIDS (próximo sprint):** subir video/imagen descargada → análisis profundo de técnica del creador (framing + OCR + tono/estructura narrativa) → seed que captura el MÉTODO para construir genomas/voces propias. Es lo que produjo el hallazgo de la voz educativa de Lucien (caso boids original). Uso INTENSIVO durante construcción de marcas/genomas; casi nulo después (cuando el batallón de IIDs ya traiga todo). El anti-IP se respeta: material = insumo de aprendizaje de técnica, NUNCA fuente a reescribir (análogo al frame Nietzsche de Lucien: motor interno, nunca citado). Sam corrigió la sobre-cautela de Claude: ni el tema UNRLVL ni el Lucien del caso boids tocaron el anti-IP. Implementación: sub-pestaña nueva, renombrar "Capturar"→"Basic" + crear "Expert", upload, pipeline de análisis, seed pedagógico (campo `lane` ya preparado).

**Inventario de objetos nuevos/cambiados:**
- Repo nuevo **`unrlvl-iid-functions`** (iid-inbound versionado + migraciones). PRs #1-#4 mergeados.
- `iid-inbound` **v7** (auth dos ejes + seeder_rationale + seeder_brand_suggestion). `intel.iid_seeds` +2 columnas (seeder_rationale, seeder_brand_suggestion). GRANT SELECT brands→service_role.
- `Orchestrator`: front IID Seeds (8 archivos, login+gating+captura+approve). PR#1 mergeado.
- Secrets nuevos en Supabase: ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET.

**Pendientes operativos de Sam (no bloquean cierre):** rotar las 2 contraseñas temporales (TempSam2026!/TempMari2026!) antes de producción real (pasaron por el chat) — opción limpia: script local sin compartir, regenerar JSON + recargar secret de usuarios (JWT secret no se toca). Byte-parity dura de iid-inbound cuando haya supabase CLI.

**Professor:** 7 learnings aprobados (Orchestrator sin auth; patrón auth NSCF=EF Supabase; scope=eje ortogonal/gerente-de-cuentas; EF sin fuente=el humano la tiene; GRANT service_role en tabla vieja; disciplina sesión-nueva CC; dos modos de semilla Basic/Expert).

**Próximo (orden):** (1) **#45 sembrar brand_topics de las 6 marcas de Marisol** (BLOQUEANTE de producción — sin esto captura en vacío; decisión de arquitectura de contenido). (2) **Sprint modo Expert/Boids** (sub-pestaña + upload + framing/OCR/análisis de técnica + seed pedagógico — herramienta de construcción de marcas). (3) **Approval por email** (enlace simple a "Cola de revisión", sin resumen, EF tipo nscf-mailer, disparado en awaiting_approval). (4) **#46 tab Topic Proposals** (captura estructurada de criterio de Marisol → borradores → gate de Sam). Carril paralelo: voz hermana pedagógica (lane ya listo).

---

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

**DECISIÓN — Ruta B confirmada:** portar el motor creativo (creative_vectors 44 + tension_architectures 10 + aggro_presets 5 + psycho_presets 10) al Builder interno el generador local, con selección DETERMINÍSTICA por brand_topics (no el pickRandom del CopyLab externo). Ruta A descartada: CopyLab usa pickRandom uniforme (genera patrón), psycho solo en email, modelo retirado, perdería features del Builder. Ruta B elimina 1 de los 3 sistemas de generación.

**MODELO DE DOS CAPAS REFLEJADAS (confirmado por Sam):** Builder = capa prescriptiva (inyecta criterio antes de generar, pide pero no verifica). Watcher = capa validadora (juzga después, único con dientes, rechaza). Lo que el Builder prescribe, el Watcher valida → el eje B AÑADE 2 gates al Watcher:
- Gate 7 — coherencia objetivo↔estímulo (que pieza de autoridad no contenga lenguaje de conversión). Debe ser LLM (determinístico daría falsos positivos).
- Gate 8 — similitud VISUAL entre hermanas (extiende R1 del ANTISPAM_CONTRACT al plano visual; el contrato solo cubría texto).

**FACTIBILIDAD (CC informe #5, read-only contra código vivo):**
- Ruta B: ✅ factible, aditiva no estructural. el generador local ya arma prompt por capas; añadir vector/tensión/aggro/psycho = 3 capas más. applyCreativeLogic de CopyLab (~40 líneas) portable; solo reemplazar pickRandom por selector con memoria. Features del Builder (título/firma/cifras/hard_rules) NO se rompen (verificado).
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
- Hay DOS sistemas de generación: el Builder interno `generadorLocal` (que usa el IID) y el CopyLab externo (unrlvl-copy-lab.vercel.app). El IID tiene CopyLab configurado en lab_configs pero lo SALTEA — genera in-process con el generador local.
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

**Decisión de arquitectura pendiente (eje B):** para llevar psycho/tensión al texto IID — Ruta A (re-rutear a CopyLab externo) vs Ruta B (portar el motor al generador local con selección DETERMINÍSTICA por brand_topics, no el pickRandom actual de CopyLab). Claude recomienda Ruta B (determinística encaja con marca↔tema/antibaneo). Tres arreglos de higiene previos: unificar IDs psycho (iid-core emita PSY-*), corregir ImageLab línea 238, sacar CopyLab del modelo retirado.

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