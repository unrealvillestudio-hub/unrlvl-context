# Unrealville Studio — Ecosistema
_Generado desde ecosystem.json v2026-06-24-v1 · No editar manualmente · ImageLab v7 (migración Imagen→Gemini) + BGRemover actualizados al estado vivo 2026-06-24; secciones IID/genomas/NSCF preservadas del 2026-06-22 · regla de nomenclatura de labs y corrección del flow (buildFromGenome) sincronizadas desde ecosystem.json v2026-08-01-v1 · versiones del registro edge_functions sincronizadas al estado real (list_edge_functions) 2026-08-01: content-run-stage v74 · iid-core v47 · content-watcher v29 · content-dispatcher v47 (menciones fechadas preservadas) · capa de instrumentación de costo (ops_*) 2ª ola sincronizada desde ecosystem.json v2026-08-04-v1: ops_services (20) · ops_credits · billable en ops_costs+ops_generation_ledger · ops_token_sessions→ops_token_sessions_retired · v_cost_pivot 31 col · capa de costo 3ª ola sincronizada desde ecosystem.json v2026-08-05-v1: ops_cost_residual + v_cost_residual_vigente (residuo de brecha ledger↔Console por scope: document-factory 12% · fie 3,5%) · REGLA MULTIMARCA instalada 2026-08-07: sección propia + clave `multibrand_rule` sincronizada desde ecosystem.json (adición aditiva, sin bump de _meta.version) · HRD_ACTUALIZA 2026-08-08 sincronizada desde ecosystem.json v2026-08-08-v1: `nscf_editorial` v1.0 (AUTHORITY, 4 topics) y `fphs_conversion` reactivada (abandoned→active) registradas en `brand_topics.subscriptions` · `content_type_registry` (+`max_tokens`, +`format_instruction` por (content_type, voice_id)) listada en tables.content · `multibrand_rule` 4/5 casos pagados (pendiente `OBJECTIVE_LABEL_TO_TAG`) · HRD_ACTUALIZA 2026-08-13 sincronizada desde ecosystem.json v2026-08-13-v1: sesión de posicionamiento y web pública (tesis canónica de marca sellada; la web vive en `CoreProject`, PR #3) — ningún nodo del JSON cambia salvo `_meta` (`version`→2026-08-13-v1, `previous`→2026-08-08-v1, `last_session` 2026-08-08 movido a `previous_sessions`); el cuerpo de este derivado se conserva íntegro. Adición aditiva, historia preservada_

---

## Regla Multimarca — INVIOLABLE (vigente desde 2026-08-07)

El **EJE** es del sistema y va en el **CÓDIGO**. La **INSTANCIA** es de la marca y va en el **DATO**. Ninguna capa compartida hardcodea `brand_id`, dominio, jurisdicción ni vocabulario de cliente. Que hoy una sola marca use un eje **NO** lo convierte en suyo.

- **Fuente:** `protocols/MULTIBRAND_RULE.md`
- **Gate:** Test de la marca N+1 respondido en todo brief y PR que produzca código, migración o siembra.
- **Orden de migración:** hardcode existente → PR de código primero, DDL después (al revés rompe producción).
- **Deuda conocida:** 5 casos verificados el 2026-08-07 — ver anexo del protocolo.
- **Deuda 2026-08-08:** 4 de 5 casos pagados (PR mergeado + DDL post-merge): `voice_by_destination` (Object.keys) · `max_tokens`+`format_instruction` en `content_type_registry` · `EMAIL→CANAL_NONE` · `AUDIENCE_FRAMES` a `decide`/`influye`/`general` (alias legacy `jd`/`doliente`) + CHECK `intel.brand_topics.audience_frame` a 5 valores + 18 filas FPHs migradas. Quinto pendiente: `OBJECTIVE_LABEL_TO_TAG` (PR propio).

---

## Studio

**Unrealville Studio** — Brand Intelligence Infrastructure
_"Not for everyone."_
Fundador público: Lucien Sael · Owner: Sam
GitHub: unrealvillestudio-hub · Web: unrealvillestudio.com (LIVE EN+ES)
HQ: 12951 Biscayne Blvd · North Miami, FL 33181

**Lucien Sael** — Seudónimo profesional público de Sam
- web: luciensael.com — BLOG v1.0 BUILT (home+blog+1 artículo molde) · GREENFIELD: sin repo/Vercel/DNS · Paquete listo para Claude Code
- voice_genome: ✅ **2 VOCES ACTIVAS** en brand_voice_genome **v1.0** (subido de v0.5 el 2026-06-19) — `lucien_editorial` (919e3707 · blog/ensayo/long-form) + `lucien_social` (5b571b08 · Meta FB/IG + TikTok texto + X · golpe ≤280). **core_move generativo/constructor** (parte de su mirada, aporta, construye — NO reactivo/léxico). 8 campos destilados por muestreo (#5i): closing_repositions, purpose_and_audience, restraint_as_power, the_edge_lands_in, compression_over_explanation, the_accusing_question, elegance_is_the_blade, thematic_gravity. Mismo temperamento (filo, übermensch motor interno nunca citado), distinta respiración (editorial respira largo / social muerde corto).
- platforms: Meta (FB+IG) token a nivel ecosystem pero canal LucienSael NO probado en pipeline (manual-until-verified) · TikTok solo texto · X apertura escalonada anti-baneo (manual, sin API) · LinkedIn NO es plataforma de Lucien (solo cita vía voceros Sam/UNRLVL)
- ⚠️ RIESGO ~80%: primer publish LucienSael por Orchestrator tocará blocker brand_id mapping (tipo b93627b6) — verificar/insertar fila LucienSael en meta_accounts antes
- Pendiente: validar v1.0 con IID real · `lucien_video` futuro (guion hablado TikTok/Reels) cuando VideoLab

---

## Marcas activas

| Marca | Mercado | Estado |
|---|---|---|
| **NeuroneSCF** | South & Central Florida, USA | 🟢 Activo — Console Fase 3 LIVE |
| **DiamondDetails** | Alicante, España | ✅ Activo |
| **VizosCosmetics** | Miami + España | ✅ Activo |
| **D7Herbal** | Alicante, España | ✅ Activo |
| **VivoseMask** | España | ✅ Activo |
| **Patricia Osorio** · patriciaosorio.com _(id: PatriciaOsorioPersonal)_ | Internacional — salones, marcas, distribuidores | ✅ Activo |
| **ForumPHs** | Panamá | ✅ Activo |
| **SamPublisher** | Global — Meta(FB) + LinkedIn | 🟢 Activo |
| **UnrealvilleStudio** | Global — HQ Miami FL | ✅ Activo |

---

## NeuroneSCF — Estado detallado

**Shopify B2C** `egdk1n-gt.myshopify.com` → `neuronescflorida.com`
- 41 productos activos · Theme 192983662919
- Blog LIVE: 4 artículos ES+EN · Hair Intelligence — pendiente reescritura L0+L3 HUMANIZE EMOTIONAL
- Pixel Meta ✅ (1348252664025025) · GTM+GA4 instalado ✅ · Klaviyo ✅
- Checkout: pickup ❌ deshabilitado (2026-05-29) · delivery ✅ desde 3PL · Kiosk: delivery ❌ / pickup ✅ solo Vizos
- ⚠️ TikTok Pixel DUPLICADO — bloquea ads
- ⚠️ Klaviyo flows pendiente configurar en UI
- ✅ Meta MCP: NSCF en meta_accounts con token OK (verificado 2026-05-31)

**Shopify B2B** `nj5ybc-n1.myshopify.com`
- Theme 149164392526 · Audit score 133 · REVISAR — store_type pendiente verificar · token SIN read_locations

**Fulfillment** — 2toner Express (Iván) `2tonerexpress@gmail.com`
- Portal LIVE ✅ 2026-05-29 · `dispatch.neuronescflorida.com/portal` (dominio custom ⏳ pendiente Vercel+DNS)
- EF: nscf-fulfillment-portal v2 · nscf-mailer v27

**NSCF-Console (superuser interno)** — ✅ **FASE 3 LIVE — 2026-06-20**
- Repo nscf-console (Vercel front) · Auth multi-rol ADMIN/OPS (bcrypt+JWT, NO usa el PIN del kiosko)
- EFs: nscf-b2b-approve v8 (código v4: ambassadors_report_email +rows, inventory_view 3 columnas por location_id) · nscf-mailer v27 (commissions_report con detalle venta-a-venta)
- Reporte comisiones: per-embajadora, detalle venta-a-venta, calculado sobre Shopify **subtotal** (sin tax/shipping), redondeo half-up `.toFixed(2)`. Entran como pending; Patricia aprueba (aprobadora única)
- Toggle ventana: este mes / mes anterior / ambos · Inventario 3 columnas: B2C Bodega1 (3PL Iván) | B2C Bodega2 Vizos | B2B Vizos
- Atribución: nscf-attribution v14 = webhook orders/paid; comisión = `order.subtotal_price * base_commission_rate`
- Integridad: nscf-integrity-check v1 + cron job 34 (dom 04:00 UTC) — marca drafts fantasma `voided_test`, no toca comisiones
- Deuda: PIN texto plano en nscf_embajadoras · read_locations al token B2B · lista de precios admin-only (futuro)

**Tracking** — Meta Pixel ✅ · GTM+GA4 ✅ · Klaviyo 10 templates ES+EN ✅ · TikTok ⚠️ DUPLICADO

---

## UnrealvilleStudio — Brand Context

- voice_genome: `unrlvl_default v1.0` — Defiant precision, EN default, ES mismo tono
- meta_mcp_brand_id: `UnrealvilleStudio` (normalizado) — UNREALville eliminado de meta_accounts 2026-06-15 (era dup exacto, mismo page_id/token)
- page_id 1050792034789886 · ig_user_id 17841429817593693 · ad_account act_1506214917803847
- Primer post publicado ✅ 2026-05-29

---

## Voces de marca (brand_voice_genome)

Una marca puede tener varias **voces hermanas** (distinto `voice_id`) que comparten temperamento y difieren en respiración. Unique `(brand_id, voice_id, version)`.

| brand_id | voice_id | versión | scope | estado |
|---|---|---|---|---|
| LucienSael | `lucien_editorial` | **v1.0** | blog / ensayo / long-form | ✅ active (919e3707) |
| LucienSael | `lucien_social` | **v1.0** | Meta FB/IG + TikTok (texto) + X · golpe ≤280 | ✅ active (5b571b08) |
| SamPublisher | `sam_personal` | v0.5 | Meta(FB) + LinkedIn · personal + vocero Lucien/UNRLVL | ✅ active |
| UnrealvilleStudio | `unrlvl_default` | v1.0 | infra / B2B | ✅ active |
| NeuroneSCF | `nscf_editorial` | **v1.0** | blog / AUTHORITY (4 topics) · par cerrado con llave de diagnóstico | ✅ active (2026-08-08) |
| NeuroneSCF | `nscf_conversion` | v1.0 | b2c (5 topics · frizz/color/damage/chlorine/fine) | ✅ active |
| ForumPHs | `fphs_conversion` | — | conversión (eje 13 claves) · reactivada abandoned→active | 🟠 en calibración (11 topics / 0 filas) |

**Genoma Lucien v1.0 (2026-06-19):** destilado por muestreo (8/10 piezas marcadas Lucien por Sam). El `core_move` pasó de reactivo/léxico ("desmonta la palabra equivocada") a **generativo/constructor** (Lucien parte de su mirada, aporta, construye; el filo sirve a la construcción, no es el fin). Patrón: generativo no reactivo · figura concreta · filo material/presente sin salida digna · comprime en imagen-sentencia · hiere con garbo no crudeza · constructor>destructor · reclutar afines no humillar · contención de munición pesada · cierre que reposiciona y recluta · pregunta-cuchillo de baja frecuencia · registro culto sin ancla nacional · científico-psicológico en ai-cognition · libros/ecosystem presentes sin nombrarse.

**Lucien — regla cita-por-destino (vocería en LinkedIn):** Lucien no publica en LinkedIn (sin cuenta, por diseño). Llega solo citado por voceros (Sam / UNRLVL). El genoma del fragmento citado lo elige el **destino del redirect**: a X/Meta/TikTok → `lucien_social`; a luciensael.com o post nativo sin redirect → `lucien_editorial`.

---

## Labs

| Lab | URL | Estado |
|---|---|---|
| **Orchestrator** v4.1 | orchestrator-unrlvl.vercel.app | ✅ LIVE — front de aprobación IID |
| **CopyLab** v9.7 | unrlvl-copy-lab.vercel.app | ✅ LIVE · async ✅ |
| **ImageLab** v7 | image-lab-unrlvl.vercel.app | ✅ OPERACIONAL — gemini-2.5-flash-image (Vertex, migrado 24-jun) + BGRemover live |
| **SocialLab** | social-lab-flame.vercel.app | ✅ LIVE — dual-mode pendiente confirmar |
| **WebLab** | web-lab-unrlvl.vercel.app | ✅ LIVE |
| **AgentLab** | agent-lab-unrlvl.vercel.app | ✅ LIVE |
| **BlueprintLab** | unrlvl-blueprint-lab.vercel.app | ✅ LIVE |
| **VideoLab** | unrlvl-video-lab.vercel.app | ✅ LIVE — LAUNCH PENDIENTE (active=false en lab_configs) |
| **VoiceLab** | unrlvl-voice-lab.vercel.app | ✅ LIVE |
| **OnboardingApp** | unrlvl-onboarding-app.vercel.app | ✅ LIVE — voice_genome_gap Fase 5 pendiente |
| **SignalLab** | — | ⏳ No deployado |

**ImageLab v7 (24-jun):** migrado de Vertex Imagen 3.0 (apagado 24-jun) a **gemini-2.5-flash-image** vía `:generateContent` — único punto de generación de imagen vivo (lab-worker + content-run-stage delegan por `/api/execute`). Suma **BGRemover** (ex-ProductShots; composición de catálogo descartada por límite luz-coherencia): herramienta de remoción de fondo vía remove.bg, 3 pasos, cutout cap 2400px lado mayor. Nueva env `REMOVEBG_API_KEY`.
**SocialLab:** vía de publicación al público. Debe operar dual-mode (sync UI + async Orchestrator) igual que CopyLab/ImageLab. Re-test publicación pendiente tras fix brand_id.
**OnboardingApp:** v1.0 puebla 5 tablas pero NO captura brand_voice_genome. Spec Fase 5 lista. Permitir derivar voz social desde editorial + capturar modo cita para voceros.
**Regla de nomenclatura (INVIOLABLE, `ecosystem.json → labs._note`):** los labs (CopyLab / ImageLab / SocialLab / VideoLab / VoiceLab / WebLab / AgentLab / BlueprintLab) son APPS del ecosistema —repo propio, UI para trabajo humano, modo dual sync (UI) + async (carril)—, nunca un servicio genérico, una función, un stage ni un módulo interno. Si un carril necesita la capacidad de un lab, lo llama por su `api_endpoint` (`lab_configs`); no construye su propio motor.
**⚠️ Desvío buildFromGenome (a corregir, NO arquitectura):** el carril async NO invoca a CopyLab ni a SocialLab — arma el copy con `buildFromGenome` y el post con `runSocialLabDirect`, motores LOCALES en `content-run-stage`, aunque `lab_configs` los declara. Sólo ImageLab se llama de verdad por su endpoint. Corrección en `PROYECTO_COPYLAB_hereda_y_profilaxis.md`; ver `ecosystem.json → labs_wiring`.

---

## IID Subsystem — Intelligence Insights Developers

**Status:** ✅ **OPERACIONAL** · Builder+Watcher LIVE · **R4B carril async validado** (smoke test PASS 2026-07-25: iid-core v36 + content-dispatcher v36 + content-run-stage v52 desplegados y verificados byte a byte) · mañana se enciende R4B para evaluación funcional + ICR (Industrial Consistency Ready)
**Repo de contexto:** `IID/session_log.md` (fundado 2026-06-22 — documento fundacional §1-§8 + session log §9)
**Nombre:** IID = **Intelligence Insights Developers**. UNRLVL-IID = los IID de UNRLVL. (Variantes previas — Intelligent Intelligence Dispatcher / Insight Distribution / Content Distribution — fueron deriva de reinterpretación al reducir a siglas; NO canónicas.)
**Schema:** `intel` (NO public)

**Origen:** nació (abril 2026) como motor de inteligencia de marketing (investiga LLMs/plataformas/e-commerce/mercados). Doble uso: mejora interna del ecosystem + posicionamiento público de UNRLVL/Lucien como expertos ("cero desperdicio, máximo leverage"). Lucien se encajó después sobre la estructura de marketing → causó el bug off-brand. Su entrada estableció que el IID debía ser MULTIMARCA.

**Modelo de gobierno:** la MARCA declara qué temas consume y con qué voz por destino (`intel.brand_topics`). El IID investiga temas NEUTROS. El `default_voice` del agente NO decide voz (raíz del bug off-brand). `angle` = territorio (qué/dónde); genoma = ejecución (cómo). Cadencia Interpretación A: por-marca-por-plataforma, los dominios rotan dentro de los slots, NO multiplican.

**Agentes (`intel.iid_agents`, 29 activos):**
- 29 = 1 core (IID-CORE) + 13 legacy IID-* (corriendo, last_run reciente) + 14 UNRLVL-* (creados 15-jun, last_run NULL — sin ejecutar aún) + 1 sentinela IID-SEEDER (ce44ac81, is_active=false, satisface FK de iid-inbound, NO corre research). El fan-out v36 YA NO usa default_voice (la voz sale de brand_topics).
- Legacy IID-*: IMAGE, LLM*, VIDEO, VOICE, GOOGLE, LINKEDIN*, META, TIKTOK, X*, ECOMMERCE, FLORIDA, PERSONAL-BRAND*, WHOLESALE (* = default_voice lucien, legado del encaje a la fuerza)
- UNRLVL-* en 3 tiers: Tier1 método (CONTEXT-ENGINEERING, BRAND-VOICE-SYSTEMS, AI-INDUSTRIALIZATION, CRO-PSYCHOLOGY, SIGNAL-LEARNING-LOOPS) · Tier2 deep-stack (META-DEEP-STACK, GOOGLE-DEEP-STACK, ALGORITHM-MECHANICS) · Tier3 mercado (ECOMMERCE-DEEP, SHOPIFY-STACK, MARKET-FLORIDA, DROPSHIP-REALITY, WHOLESALE-LOGISTICS-FL, CREATOR-MACRO-ECONOMY)
- Decisión pendiente: destino de los 14 UNRLVL-* sin correr + de los IID-* legacy de voz Lucien

**Pipeline:**
```
CRON (jobids 2-28, trigger_iid_agent) → iid-research → iid_research_raw → iid-process → iid_findings
  → iid_content_queue (brand_id+domain) → content-dispatcher v36 (jobid 29, cada 30min, .limit(5) DISPATCH_LIMIT, lee scheduled_for)
  → content-run-stage v57 [Builder buildFromGenome ⚠️DESVIACIÓN + AIFE + ImageLab→CDN + SocialLab(runSocialLabDirect) ⚠️DESVIACIÓN + callWatcher]
  → content-watcher v18 (8 gates) → content_pieces awaiting_approval
  → email content-approval@unrealvillestudio.com → Orchestrator (aprobación Sam)
  → approve-piece v14 (publish Meta + move-to-permanent)
```

**Edge Functions:** content-dispatcher v47 (B2: lee scheduled_for + .or(is.null,lte.now); B3: DISPATCH_LIMIT=5) · content-run-stage v74 (#95-D bloque CANAL: email_propietarios saltea imagen) · content-watcher v29 (8 gates: +gate7 objective_stimulus +gate8 visual_sibling; reglas por código desde intel.watcher_rules, precedencia brand>sector>gen; watcher_full_scan ON) · approve-piece v14 (reject sin rejected_reason → #5r) · aife-filter · lab-worker v23 (no tiene creds Vertex) · **iid-core v47 (#93 fan-out multimarca; deja de generar copy, brief neutro en aife_output.content.content; body.domain override)** · **iid-inbound v1 (cerebro del Sembrador: capture/approve/reject/list, verify_jwt=false)** · **iid-approval-digest v2 (creada 26-jul; digest diario 7am ET del corpus de calibración de aprobación, lee intel.approval_calibration)**

**Sembrador (CONSTRUIDO 25-jun b · falta T4 front):** post IG (link + frase humana) → iid-inbound `capture` (destila a TEMA NEUTRO, anti-IP: la semilla es disparador, nunca material a reescribir) → mapea a `brand_topics` → `iid_seeds` awaiting_approval → GATE TEMPRANO Sam (`approve`, puede corregir mapeo) → handoff HTTP a iid-core (4B, una sola fuente del fan-out) → fan-out v22 → N filas queue → pipeline normal → approve-piece (2º gate). Tabla `intel.iid_seeds`. Agente sentinela IID-SEEDER. 2 gates en serie, nunca publish directo.

**Arquitectura híbrida queue (2026-06-20):** la queue lleva brand_id + domain (puente, escrito por el Builder en v37); `brand_topics` es fuente única de platforms/cadence/rollout (leída por el Scheduler).

**Vertex (desbloqueado 2026-06-22):** GOOGLE_SERVICE_ACCOUNT_KEY + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION en Supabase Secrets. Proyecto gen-lang-client-0491381650 (SA imagelab-vercel). Embeddings gemini-embedding-001 @768 (Matryoshka).

**R4B (deadline 1ª sem julio):**
- HECHO: **carril async multimarca (iid-core v36 + dispatcher v36 + run-stage v52) validado end-to-end por smoke test PASS 2026-07-25**, GRANT service_role sobre 3 tablas de public del carril (migración grant_service_role_public_iid_carril), 5e-5 DDL (domain+pgvector v0.8.0), 5o/5p-a/5q (v36), 5e-4 content-watcher v1 (v37), arquitectura híbrida queue, #5i genoma v1.0 Lucien, Vertex desbloqueado
- PENDIENTE: **encender R4B para evaluación funcional + ICR (mañana)**, **D7Herbal sembrar fila brand_topics (genoma huérfano)**, **B4 cadencia (ejecutor de agenda sobre pg_cron — requiere siembra de dato inexistente)**, 5e-1 Scheduler content-scheduler, 5e-2/5e-3 embeddings+gates (Chat 2), parche dispatcher scheduled_for (B2 hecho 2026-07-25), 5b publicación real Meta, 5r rejected_reason, 5s limpieza queue, validación genoma v1.0 con IID real, rollout_started_at (1ª sem julio)

---

## Supabase — unrlvl-db `amlvyycfepwhiindxgzw`

ACTIVE_HEALTHY · us-east-1
- **public:** 80 tablas · ~95 Edge Functions · nuevas: nscf_fulfillment_log, nscf_fulfillment_log_archive, nscf_integrity_log
- **intel (IID):** iid_agents (29), brand_topics, iid_content_queue (+ domain), iid_findings, iid_research_raw, iid_cron_runs, iid_briefs, iid_scheduler_config, watcher_log, iid_seeds (semillas humanas del Sembrador, 25-jun), watcher_rules (54 reglas por código HR-*/IMG-*; subject/sector/scope; precedencia brand>sector>gen; 29-jul), brand_sector (9 marcas→RETAIL/LEGAL/PERSONA; UnrealvilleStudio sin sector; 29-jul)
- **content:** orchestrator_jobs (+ domain), content_pieces (+ domain), content_calendar, content_performance, brand_context_cache, brand_voices · pgvector v0.8.0 instalado
- **shopify:** stores, audit_runs, fix_log + otras

**brand_voice_genome:**
- LucienSael / `lucien_editorial` **v1.0** (919e3707) — blog/ensayo/long-form — active
- LucienSael / `lucien_social` **v1.0** (5b571b08) — Meta FB/IG + TikTok texto + X, golpe ≤280 — active
- SamPublisher / `sam_personal` v0.5 — Meta(FB) + LinkedIn — active
- UnrealvilleStudio / `unrlvl_default` v1.0 — Defiant precision — active

**meta_accounts:**
- `UnrealvilleStudio` ✅ completo (page + ig + ad_account + token) — UNREALville eliminado (dup) 2026-06-15
- `LucienSael` ⏳ verificar antes del primer publish por pipeline (riesgo blocker brand_id)
- `NeuroneSCF` ✅ token OK (verificado 2026-05-31)

---

## Capa de instrumentación de costo (ops_*)

_LIVE (2026-07-31) — capa `ops_*` instrumentada end-to-end (16 migraciones M-0..M-16). **2ª ola 2026-08-04** sincronizada desde `ecosystem.json` v2026-08-04-v1 · **3ª ola 2026-08-05** (residuo de brecha ledger↔Console), ambas verificadas contra `information_schema` de `amlvyycfepwhiindxgzw`. Fuente ÚNICA de tarifa = `public.ops_lab_rates` vía `ops_resolve_rate`; CERO precios literales._

**Tablas:**
- `ops_generation_ledger` — asientos, línea base de costo (+`billable` 2026-08-04)
- `ops_cost_residual` — residuo de brecha ledger↔Console por scope (`scope_type`/`scope_value`/`residual_pct`/`measured_gap_pct`/`valid_from`/`valid_to`/`rationale`; vigente = `valid_to IS NULL`); 2 filas: document-factory **12%** · fie **3,5%** (2026-08-05)
- `ops_lab_rates` — tarifa por (lab, model_id, unit_type) con vigencia (vigente/previsto/historico)
- `ops_model_pricing` — catálogo descriptivo (NO fuente de precio)
- `ops_token_sessions_retired` — RETIRADA/renombrada 2026-08-04 (ex `ops_token_sessions`, +api_key_ref M-8d)
- `ops_rate_transitions` (M-6) · `ops_invoice_by_app` (M-8b, sin escritura anónima)
- `ops_costs` — costo mensual por servicio/lab/marca (14 cols incl. `billable` + `amount_original` + `currency_orig`, 2026-08-04)
- `ops_credits` — créditos/saldos por servicio (3 filas, 2026-08-04)
- `ops_services` — catálogo de **20** servicios/proveedores (2026-08-04)

**Vistas:** `v_cost_pivot` (**31 columnas**, 2026-08-04) · `v_cost_por_dimension` · `v_rate_gaps` · `v_reconciliacion` · `v_cost_residual_vigente` (residuos vigentes, `valid_to IS NULL`, 2026-08-05)

**ops_services (20):** api = anthropic, anthropic_plan, creatomate, elevenlabs, fal_ai, google_ai, klaviyo, resend, runway, tenzorart, twilio, vertex · database = supabase · domain = cloudflare · ecommerce = shopify · hosting = github, hostinger, vercel · media = heygen · custom = custom

**Primera medición (2026-07-31):** 5 piezas / 5 PASS / **$0,0681** por pieza (imagelab 58,7 % · copylab 28,4 % · aife 5,6 % · sociallab 3,7 % · watcher 3,5 %).

---

## Agentes

| Agente | Canal | Estado |
|---|---|---|
| **Social Media Agent** | interno (EF Supabase, sin repo) | ✅ OPERATIONAL |
| **DDMV Assistant** | WhatsApp Twilio | ⚠️ FIX NEEDED |
| **ForumPH Speaks** | web | ✅ OPERATIONAL |
| **ForumPH Document Factory** | web | ✅ OPERATIONAL — fphs-formalize sprint pendiente |

**ForumPH Document Factory — Next Sprint:** fphs-formalize quality sprint — replicar calidad acta manual (98% Ivette). Referencia: ACTA_No1-2026_PH_LUXOR_300.docx. Pendientes: 3 votaciones QA + 13 errores primera persona + imágenes acta.

---

## AYRA 🔴 Sprint 0 VENCIDO (5 Jun — reprogramar)

Milestone v1.0: 31 Agosto 2026

| Sprint | Fecha | Estado |
|---|---|---|
| **Sprint 0** 🔴 | ANTES 5 Jun | VENCIDO — reprogramar |
| Sprint 1 | Jun 5-15 | Planned |
| Sprint 2 | Jun 16-30 | Planned |
| Sprint 3 | Jul 1-14 | Planned |
| Sprint 4 | Jul 15-31 | Planned |
| Sprint 5 | Ago 1-31 | AYRA v1.0 |

---

## Professor

OPERATIONAL v1.0 · Proxy `https://unrlvl-context.vercel.app/api/professor` ✅ LIVE
Learnings: base previa + 18 (19-jun, #5i + Lote A) + 15 (20-jun, R4B) — todos aprobados. Escala relevance_score 1–5.

---

## Infraestructura

| ID | Nombre | URL | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | ✅ LIVE |
| INFRA-META-MCP | Meta MCP | unrlvl-meta-mcp.vercel.app | ✅ ACTIVE — UNRLVL + NSCF ✅ · fb_get_page_insights deprecado ⚠️ |
| INFRA-SHOPIFY-MCP | Shopify MCP | unrlvl-shopify-mcp.vercel.app | ✅ ACTIVE · write_orders ✅ |
| INFRA-NSCF-DISPATCH | NSCF Dispatch Portal | dispatch.neuronescflorida.com/portal | ⏳ PENDIENTE — Vercel + DNS |
| INFRA-SB-MCP | Supabase MCP | unrlvl-supabase-mcp.vercel.app | ✅ ACTIVE v1.2.1 |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | ✅ LIVE EN+ES |

**Staging workflow:** ✅ ESTABLECIDO 2026-05-30 — 15 repos, 13 con branch protection (2 bloqueados: repos privados GitHub Free).

**⚠️ ecosystem_graph.json:** PENDIENTE `ecosystem audit` — datos del 05-26 (dice IID frozen/14 agentes/v22, ya falso).

---

## Agenda — próxima sesión

Ver [AGENDA.md](AGENDA.md) para prioridades completas.

Top inmediatos (R4B, deadline 1ª sem julio):
1. 🔴 5e-2/5e-3 embeddings pgvector + gates bloqueantes (Chat 2 — Vertex ya desbloqueado)
2. 🔴 Scheduler content-scheduler (5e-1, especificado, desbloqueado — write ya en v37) + parche dispatcher
3. 🔴 IID publicación real Meta (5b, chat dedicado) — valida genoma v1.0 + gatilla move-to-permanent
4. 🟢 Deploy luciensael.com (repo+Vercel+DNS) + UNRLVL Field Notes

✅ Completado 19-22 jun: genoma v1.0 Lucien (muestreo) · R4B Chat 2 (v37, content-watcher v1) · arquitectura híbrida queue · Vertex desbloqueado · repo IID fundado · nombre canónico fijado.