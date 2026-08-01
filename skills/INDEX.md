# SKILLS INDEX — Unrealville Studio
_Versión: 1.10 · 2026-07-26 · Mantenido por: Claude_

---

## INSTRUCCIÓN DE CARGA

Este archivo se carga siempre, inmediatamente después de ecosystem.json y AGENDA.md. Inmediatamente después se carga CAPABILITIES.md (catálogo de herramientas/MCPs/flujos/auditores). Ambos antes de preguntar con qué marca/proyecto trabajar.

Es liviano — solo la tabla de decisión. Los skills individuales se cargan bajo demanda según el trabajo declarado.

---

## TABLA DE DECISIÓN

| Skill | Ubicación | Cargar cuando... | Audiencia |
|-------|-----------|-----------------|-----------| 
| `shopify-auditor` | `skills/shopify-auditor/SKILL.md` | Audit, fix, onboarding de tienda Shopify | Servicio UNRLVL + clientes |
| `shopify-mcp` | `skills/shopify-mcp/SKILL.md` | Trabajo directo en Shopify via conector MCP | Interno — NeuroneSCF (activo), futuras marcas |
| `ui-ux-layer` | `skills/ui-ux-layer/SKILL.md` | Cualquier output HTML / CSS / React / visual | Multimarca — todo output visual |
| `content-pipeline` | `skills/content-pipeline/SKILL.md` | **Cualquier texto público** — blog, producto, ad, social, landing, email, script | Multimarca — todo output de texto |
| `voice-craft` | `skills/voice-craft/SKILL.md` | **CAPA PRIMARIA — siempre que se calibre o genere CUALQUIER voz.** Oficio comunicacional transversal: arsenal operado, artefacto de destino, ejemplo-como-mecanismo, capas PSY/AIFE/Watcher declaradas, reparto genoma↔angle, triage técnica/intención | Multimarca — toda voz |
| `comm-arsenal` | `skills/comm-arsenal/SKILL.md` | **SE CARGA JUNTO CON `voice-craft`** — es el arsenal que `voice-craft` §2 exige operar. Cuerpo de técnicas de comunicación oral y escrita: estructuras persuasivas, niveles de conciencia, aperturas por canal, prueba/objeción/contraste/analogía/especificidad/reencuadre, tipología de cierres, ritmo micro, ejecución escrita vs oral, anti-patrones | Multimarca — toda redacción y todo guion |
| `voice-conversion` | `skills/voice-conversion/SKILL.md` | Calibrar o generar una voz de CONVERSIÓN (la que VENDE al decisor). Perfil secundario delgado — **invoca `voice-craft`** | Multimarca — marcas de producto/servicio |
| `genome-calibration` | `skills/genome-calibration/SKILL.md` | Crear/calibrar/diagnosticar un `brand_voice_genome` — bucle Boids, calibración de voz de marca, entrada E5b (UI Marisol), Tratado de genomas | Interno — voice research / IID Fase 2 |
| `r4b-genome-calibration` | `skills/r4b-genome-calibration/SKILL.md` | Llevar una marca de cero a R4B, o recalibrar una marca completa (voz + parche + topics + agentes + scheduler). Orquesta el ciclo completo; delega la voz a genome-calibration | Interno — Sam×Claude, brand onboarding |
| `nscf-pricing` | `skills/nscf-pricing/SKILL.md` | Pricing B2B/B2C NSCF, cotizaciones, Custom Kits, márgenes, rentabilidad de producto | Exclusivo NeuroneSCF |
| `acta-repair` | `skills/acta-repair/SKILL.md` | Reparar o auditar un acta de asamblea de PH Panamá — output defectuoso del Document Factory, o revisión previa a la firma de Ivette. **NO para generar actas en volumen** (eso es el DF) | Exclusivo ForumPHs |
| `agent-builder` | `skills/agent-builder/SKILL.md` | Crear, configurar o deployar agentes | UNRLVL + clientes |
| `copylab-reference` | `skills/copylab-reference/SKILL.md` | Sesiones con CopyLab, plantillas, contenido por canal | UNRLVL + clientes |
| `image-processing` | `skills/image-processing/SKILL.md` | Imágenes, LoRA prep, pipeline visual | UNRLVL + clientes |
| `cost-layer` | `skills/cost-layer/SKILL.md` | Costos de compute, márgenes por cliente, eficiencia | UNRLVL interno — OPS |
| `security` | `skills/security/SKILL.md` | Cualquier nuevo deployment productivo | UNRLVL infra — todo deploy |
| `github-auditor` | `skills/github-auditor/SKILL.md` | Cualquier trabajo con repos GitHub | UNRLVL infra |
| `vercel` | `skills/vercel/SKILL.md` | Fetch de URLs Vercel, deploys, proyectos | UNRLVL infra — siempre disponible |
| `ads-mcp` | `skills/ads-mcp/SKILL.md` | Campañas Meta Ads, TikTok Ads, reporting, optimización | NeuroneSCF + futuros clientes con ads |
| `higgsfield` | `skills/higgsfield/SKILL.md` | Generación de imágenes o video vía MCP | UNRLVL + clientes — VideoLab/ImageLab vía MCP |
| `agent-browser` | `skills/agent-browser/SKILL.md` | Automatización de browser, scraping, testing web | UNRLVL infra — Claude Code principalmente |
| `ecosystem-auditor` | `skills/ecosystem-auditor/SKILL.md` | Audit profundo del ecosistema — detectar drift entre código real y ecosystem.json | UNRLVL infra — bajo demanda |
| `ecosystem-updater` | `skills/ecosystem-updater/SKILL.md` | Actualizar ecosystem.json + ecosystem_graph.json post-audit | UNRLVL infra — bajo demanda |
| `supabase-auditor` | `skills/supabase-auditor/SKILL.md` | Protocolo auditor — cruzar código↔DB, producir/actualizar supabase_access_map.json, detectar vestigiales/bugs/agujeros | UNRLVL infra — bajo demanda |
| `voice-reference-extractor` | `skills/voice-reference-extractor/SKILL.md` | Pipeline local: videos TikTok → transcripción Whisper + OCR on-screen → consolidado .md/.json por cuenta. Paso 1 de construcción de voice genome. | UNRLVL interno — voice research |

---

## NOTAS DE VERSIÓN v1.10

**Cambios respecto a v1.9:**
- `acta-repair` → skill nuevo · v1.0 · 2026-07-26 · **camino de reparación forense de actas de asamblea de PH Panamá.** Nace de una reparación real: el Document Factory produjo un acta con el PH inventado (tomó el nombre de la ley por nombre del edificio), la finca de otro cliente, el tipo y la modalidad de asamblea equivocados y el umbral legal del artículo equivocado. Alcance deliberadamente acotado — **reparar y auditar, nunca generar a escala**; un modo `generar` en un skill de chat nace muerto porque generar con UI para Ivette es del DF y siempre lo será. Abre con **Regla 0: nunca se entrega un acta sin su reporte ICR**, incluso cuando no hay hallazgos (estado `APTO PARA FIRMA`) — el reporte es el acto de haber revisado, no la lista de defectos; la regla existe porque se violó en la sesión que originó el skill y lo detectó el cliente, no el sistema. Contiene: **las tres magnitudes** (total de unidades ≠ unidades al día ≠ unidades presentes) con el artículo que gobierna cada una, que es el error más caro del dominio · arts. 62/67/68/73/74/83/90 de la Ley 284 · jerarquía de fuentes con la DB FPHs mandando siempre · las cuatro trampas verificadas del padrón (`total_units` que miente, unidades comerciales ausentes, `full_name` con notas operativas embebidas, fincas que rompen el patrón de longitud) · reconciliación de hablantes contra diarización no confiable · OCR de resultados en captura con sus trampas duras · los 8 gates deterministas · reglas duras del acta (anexo solo con presentes y representados, personal de plataforma omitido, Ivette nunca propietaria, sin footer) · formato del reporte ICR con su taxonomía de severidades · checklist de cierre.
- **§2 del skill es el texto canónico del rulebook Ley 284.** Decisión que corrige a `actaConfig.ts` del DF, que declaraba la ley *"embebida en el agente por ser común a todo PH"*. La sesión probó que estaba mal: al rulebook embebido le faltaba el art. 74, **nadie podía verlo**, y el error se propagó al generador y al auditor a la vez — cuando ambos comparten la misma laguna, la revisión no revisa nada. Común y estable no significa "va en código": significa que es dato de **jurisdicción**, no de cliente. **Una fuente, dos consumidores** — el PR-4 del runbook de fix del DF implementa desde el skill, no reescribe.

---

## NOTAS DE VERSIÓN v1.9

**Cambios respecto a v1.8:**
- `comm-arsenal` → skill nuevo · v1.0 · 2026-07-18 · **el CUERPO DE TÉCNICAS de comunicación (oral y escrita).** Nace de un defecto de `voice-craft`: su §2 exige "operar el arsenal con oficio" pero no entrega el arsenal — solo principios y ocho recursos sintácticos. Es el mismo defecto que `voice-craft` diagnosticó en `calibrate.ts` ("enumera, no opera"), un nivel más arriba. UN SOLO skill con separación interna oral/escrito: el repertorio es idéntico en ambos canales y lo que difiere es la EJECUCIÓN (redundancia, respiración, ausencia de scroll, puntuación vs pausa) — parametrización, no cuerpo distinto. Contiene: estructuras persuasivas completas con tabla de selección, niveles de conciencia del mercado, repertorio de aperturas con sus fallos por canal (+ tabla de aperturas PROHIBIDAS con su alternativa demostrativa), jerarquía de prueba, manejo de objeciones, contraste/analogía/especificidad/reencuadre, tipología de cierres, ritmo y forma de la frase, ejecución escrita (§7), ejecución oral (§8, incluye por qué un texto escrito leído en voz alta casi siempre falla), y anti-patrones. **Filtro obligatorio:** toda técnica entra con las reglas duras del ecosistema puestas; las que las violan entran MARCADAS COMO PROHIBIDAS con su alternativa. **Disciplina anti-enciclopedia:** una técnica entra solo si cambia una decisión concreta al escribir. Fuente: el cuerpo de conocimiento del oficio, no la DB de UNRLVL; el criterio de Sam actúa como FILTRO.
- `r4b-genome-calibration` → **v1.0 → v1.1** · sincronización con la familia voice. El skill se escribió antes de que existieran `voice-craft`, `voice-conversion` y `comm-arsenal`, y no los mencionaba, mientras el INDEX v1.8 ya declaraba que los invoca — dos vocabularios desincronizados. Se corrige en §3 (carga obligatoria de la familia voice + advertencia de asimetría chat vs Seeder), §7 (reparto de la delegación de método) y §8.3 (orden de ejecución). El resto intacto.

---

## NOTAS DE VERSIÓN v1.8

**Cambios respecto a v1.7:**
- `voice-craft` → skill nuevo · v1.0 · 2026-07-18 · **CAPA PRIMARIA COMPARTIDA de oficio comunicacional.** Destilado de `IID/CALIBRATOR_MINDSET.md` (triangulación de 4 calibraciones reales: Lucien editorial, NSCF conversión, D7Herbal conversión, ForumPHs conversión). Contiene lo TRANSVERSAL (~80%): los 9 modos, el arsenal OPERADO (no enumerado), la regla dura de voz, las capas del pipeline DECLARADAS (13 psycho_presets / 4 familias CONVERSION-COMMUNITY-AUTHORITY-BRIDGE, AIFE, Watcher 8 gates, `objective_by_platform`), el reparto genoma↔angle, el triage error-de-técnica vs error-de-intención, y el techo de producción (voz constante / técnica variable + memoria). **Dos reglas duras nuevas** que nacen del fracaso de calibración del 17-jul: (a) **declarar el artefacto de destino ANTES de generar** — canal + formato + extensión; un texto sin destino sale genérico (se escribió un párrafo largo para un feed de IG); (b) **el ejemplo es MECANISMO, no molde** — de un texto de referencia se extrae lo que lo hace funcionar, jamás su forma literal. Declara además 5 deudas abiertas que afectan a toda calibración (`calibrate.ts` no lee PSY, no opera el arsenal, no pausa para conversar el eje; `objective_by_platform` NULL; AIFE fuera del bucle).
- `voice-conversion` → skill nuevo · v1.0 · 2026-07-18 · **perfil SECUNDARIO delgado** de la voz que VENDE al decisor. Lleva solo su parametrización (filo 5/10 instrumental · audiencia perdida se minimiza · cierre CTA/marca · familia PSY CONVERSION · blanco = el patrón) y sus técnicas propias (escena-no-pregunta, desplazamiento de protagonista, punto de no retorno, presunción de compañía, falso binario con remate, reencuadre patrimonial, el test de VENDER). **Invoca `voice-craft` para todo lo común — no duplica el núcleo.** Ejemplares: nscf_conversion, d7herbal_conversion, fphs_conversion (po_consumer en revisión por #72).
- **Patrón de diseño aplicado: ORQUESTAR, no duplicar.** `genome-calibration` (el Tratado) sigue siendo la fuente única del MÉTODO del bucle; `voice-craft` es su hermano y le aporta la capa de comunicación/arsenal/PSY que le faltaba al generador. Los otros 3 perfiles (`voice-editorial`, `voice-educative`, `voice-professional`) se escribirán cuando toque calibrar esa voz, con casos reales — no se especulan.

---

## NOTAS DE VERSIÓN v1.7

**Cambios respecto a v1.6:**
- `r4b-genome-calibration` → skill nuevo · v1.0 · 2026-07-13 · orquestador "de cero a R4B" (Ready for Business). Conduce a Sam×Claude por el ciclo completo de una marca: Fase 0 (revisar lo que hay) → arquitectura de voz (fórmula marca↔persona) → siembra de ejes → bucle Boids → destilación + parche de marca → brand_topics → agentes + scheduler del Orchestrator. DELEGA la parte de voz a `genome-calibration` (no la duplica; el Tratado sigue siendo la fuente única del método de voz). Agrega sobre el Tratado: la fórmula marca↔persona con sus fronteras, la regla dura generalizada, el patrón alias, el rol anclado al dominio, y las fases post-voz hasta R4B. Método base Sam×Claude en chat; la UI del Seeder es una opción de delegación de la Fase 3.

---

## NOTAS DE VERSIÓN v1.6

**Cambios respecto a v1.5:**
- `genome-calibration` → skill nuevo · v1.0 · 2026-07-02 · el "Tratado" de creación de genomas. Protocolo convocable que conduce a un operador (Sam/Marisol/delegado) por la creación completa de un `brand_voice_genome`: triangulación de fuentes → eje fundador → bucle Boids (Claude propone, operador juzga SÍ/NO + porqué, converge a 10+3SÍ) → destilación bajo HRD. Fuente única del método; lo consumen el bucle E5b (`/api/calibrate.ts`) y el OnboardingApp (Fase Voice Genome). Incluye anexo NeuroneSCF como ejemplar de referencia. Se relaciona con `voice-reference-extractor` (paso 1, research local) — este skill es la Fase 2 (calibración/destilación).

---

## NOTAS DE VERSIÓN v1.5

**Cambios respecto a v1.4:**
- `nscf-pricing` → skill nuevo · v1.0 · 2026-06-13 · pricing B2B/B2C NSCF, Custom Kits (3 vistas), rentabilidad, análisis. Lógica pura — delega render a `ui-ux-layer`. Fuente de verdad: xlsx que Sam sube por sesión (v18). Exclusivo NeuroneSCF.

---

## NOTAS DE VERSIÓN v1.4

**Cambios respecto a v1.3:**
- `voice-reference-extractor` → skill nuevo · v1.0 · 2026-06-05 · pipeline local TikTok → Whisper + OCR → consolidado .md/.json

---

## NOTAS DE VERSIÓN v1.3

**Cambios respecto a v1.2:**
- `supabase-auditor` → nuevo skill v1.0 · 2026-06-03 · cruce código↔DB, mantiene supabase_access_map.json
- `security` → actualizado a v1.1 (corrige drift ops_costs + tokens Shopify; delega fuente de verdad de acceso a supabase_access_map.json)

---

## NOTAS DE VERSIÓN v1.2

**Cambios respecto a v1.1:**
- `ecosystem-auditor` → añadido a la tabla de decisión (ya existía el skill, faltaba en el INDEX)
- `ecosystem-updater` → skill nuevo · v1.0 · 2026-05-26 · proceso audit-en-chat + edición-vía-Claude-Code

---

## NOTAS DE VERSIÓN v1.1

**Cambios respecto a v1.0:**
- `content-pipeline` → nuevo path canónico: `skills/content-pipeline/SKILL.md`
- `aife` → **DEPRECADO** como skill independiente. Integrado en `content-pipeline` como LAYER 2 (H+AIFE). Eliminar `skills/aife/SKILL.md` y `skills/CONTENT_PIPELINE_SKILLS.md` del repo.
- `content-pipeline` ahora cubre TODO output de texto público — no solo pipeline IID. Incluye: blog, producto, ad, social, landing, email, script, contenido UNRLVL/Lucien.

---

## REGLAS DE CARGA

**Siempre activos (no requieren declaración):**
- `vercel` — infra base de todo el stack
- `github-auditor` — acceso a repos en cualquier momento
- `security` — se activa automáticamente en cualquier sesión con deploys

**Se activan por contexto declarado:**
- Sam dice "Shopify B2C / audit / fix" → `shopify-auditor` + `shopify-mcp`
- Sam dice "HTML / componente / diseño" → `ui-ux-layer`
- Sam dice "copy / contenido / post / artículo / descripción / ad" → `content-pipeline` + **`voice-craft`** + **`comm-arsenal`** + el perfil de voz del tipo declarado
- Sam dice "genoma / calibrar voz / bucle Boids / Tratado de genomas / crear la voz de [marca]" → `genome-calibration` + **`voice-craft`** + **`comm-arsenal`** (siempre) + el perfil secundario del tipo de voz
- Sam dice "marca nueva de cero a R4B / recalibrar marca completa / llevar [marca] a R4B / montar el ecosistema de voz de [marca]" → `r4b-genome-calibration` (invoca `genome-calibration` + `voice-craft` + perfil en la fase de voz)
- Sam dice "voz de conversión / la voz que vende / calibrar [marca]_conversion" → `voice-conversion` (+ `voice-craft` obligatorio)
- Sam dice "pricing / cotización / kit B2B / margen / rentabilidad NSCF" → `nscf-pricing` + `ui-ux-layer` (para output visual)
- Sam dice "acta / reparar acta / auditar acta / ICR / el DF sacó mal el acta" → `acta-repair` (+ skill `docx` para generar el entregable)
- Sam dice "agente / WhatsApp / bot" → `agent-builder` + `security`
- Sam dice "imagen / video / LoRA" → `image-processing` (+ `higgsfield` si hay MCP activo)
- Sam dice "ads / campaña / Meta / TikTok" → `ads-mcp`
- Sam dice "costos / margen / tokens" → `cost-layer`
- Sam dice "pipeline / IID / Orchestrator" → `content-pipeline`
- Sam dice "actualiza graph / actualiza ecosystem / ecosystem desactualizado" → `ecosystem-auditor` + `ecosystem-updater`
- Sam dice "ecosystem audit" o "ecosystem scan" → `ecosystem-auditor` (ver también HRD_ECOSYSTEM_AUDIT en userPreferences)
- Sam dice "videos TikTok / transcribir / OCR / voice genome / referencia de cuenta" → `voice-reference-extractor` (research local, paso 1) → `genome-calibration` (calibración, paso 2)

**Regla de carga de la familia VOICE (v1.9):**
- **`voice-craft` + `comm-arsenal` SE CARGAN JUNTOS, SIEMPRE**, en toda calibración o generación de voz. No son alternativas ni opcionales entre sí: `voice-craft` es el oficio (qué hace bueno a un texto) y `comm-arsenal` es el repertorio que ese oficio ejecuta. Cargar `voice-craft` sin `comm-arsenal` reproduce exactamente el defecto que ambos diagnostican: principios sin cuerpo.
- Se suman a `genome-calibration` (método del bucle) y/o `content-pipeline` (output).
- **Los perfiles secundarios se cargan por TIPO DE VOZ declarado**, uno a la vez: `voice-conversion` (existe) · `voice-editorial` / `voice-educative` / `voice-professional` (pendientes).
- Si el tipo de voz no tiene perfil escrito, se calibra con `voice-craft` + `comm-arsenal` + el cuadro de parametrización de `IID/CALIBRATOR_MINDSET.md` §4, y se documenta el caso.

**Nunca se cargan proactivamente sin declaración:**
- `ads-mcp` — solo si hay campaña activa en esa sesión
- `higgsfield` — solo si hay generación visual en agenda
- `agent-browser` — solo si hay tarea de automatización de browser
- `ecosystem-auditor` / `ecosystem-updater` — solo bajo demanda explícita
- `supabase-auditor` — solo bajo demanda del protocolo auditor (el cruce código↔DB es caro)
- `voice-reference-extractor` — solo cuando hay carpeta de videos lista para procesar
- `acta-repair` — solo cuando hay un acta concreta que reparar o auditar

---

## SKILLS PENDIENTES DE CREAR

| Skill | Estado | Prerequisito |
|-------|--------|-------------|
| `voice-editorial` | Pendiente | Escribir cuando toque calibrar una voz editorial con caso real (base: Lucien, ya calibrado — parametrización en CALIBRATOR_MINDSET §4) |
| `voice-educative` | Pendiente | Escribir cuando toque calibrar una voz educativa con caso real (candidatos: NSCF editorial "Hair Intelligence", D7Herbal editorial — ejes ya sembrados) |
| `voice-professional` | Pendiente | Escribir cuando toque calibrar una voz profesional con caso real (candidatos: NSCF professional "la Técnica de marca", Ivette Flores) |
| `tiktok-mcp` | Pendiente | OAuth TikTok for Business completado (PO) |
| `meta-organic` | Pendiente | IG→FB link + tokens completados (PO) |
| `wordpress-mcp` | Pendiente | MCP WordPress construido |
| `elevenlabs` | Pendiente | Voice IDs PO configurados |
| `weblab-shopify` | Pendiente | ShopifyPushModule probado en NSCF |
| `brand-cache` | Pendiente | Endpoint Vercel `/brand-cache/[brand_id].json` implementado |

---

## UBICACIÓN DE ARCHIVOS DE MARCA (no son skills)

Los archivos específicos de cliente viven en `brands/[Marca]/`, no en `skills/`:
- `brands/NeuroneSCF/SHOPIFY_ARCHITECTURE.md` — arquitectura Shopify NSCF
- `brands/UnrealvilleStudio/PLAN_MAESTRO_LABS_SKILLS.md` — roadmap de labs
- `brands/UnrealvilleStudio/PARTNERSHIP_STRUCTURE_SAM_PO.md` — estructura legal
- `TIERS.md` — pricing (carga cuando hay conversación con prospectos)

---

_INDEX v1.10 · Unreal>ille Studio · Carga obligatoria en apertura de sesión_
