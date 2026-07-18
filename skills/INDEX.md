# SKILLS INDEX — Unrealville Studio
_Versión: 1.8 · 2026-07-18 · Mantenido por: Claude_

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
| `voice-conversion` | `skills/voice-conversion/SKILL.md` | Calibrar o generar una voz de CONVERSIÓN (la que VENDE al decisor). Perfil secundario delgado — **invoca `voice-craft`** | Multimarca — marcas de producto/servicio |
| `genome-calibration` | `skills/genome-calibration/SKILL.md` | Crear/calibrar/diagnosticar un `brand_voice_genome` — bucle Boids, calibración de voz de marca, entrada E5b (UI Marisol), Tratado de genomas | Interno — voice research / IID Fase 2 |
| `r4b-genome-calibration` | `skills/r4b-genome-calibration/SKILL.md` | Llevar una marca de cero a R4B, o recalibrar una marca completa (voz + parche + topics + agentes + scheduler). Orquesta el ciclo completo; delega la voz a genome-calibration | Interno — Sam×Claude, brand onboarding |
| `nscf-pricing` | `skills/nscf-pricing/SKILL.md` | Pricing B2B/B2C NSCF, cotizaciones, Custom Kits, márgenes, rentabilidad de producto | Exclusivo NeuroneSCF |
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
- Sam dice "copy / contenido / post / artículo / descripción / ad" → `content-pipeline` + **`voice-craft`** + el perfil de voz del tipo declarado
- Sam dice "genoma / calibrar voz / bucle Boids / Tratado de genomas / crear la voz de [marca]" → `genome-calibration` + **`voice-craft`** (siempre) + el perfil secundario del tipo de voz
- Sam dice "marca nueva de cero a R4B / recalibrar marca completa / llevar [marca] a R4B / montar el ecosistema de voz de [marca]" → `r4b-genome-calibration` (invoca `genome-calibration` + `voice-craft` + perfil en la fase de voz)
- Sam dice "voz de conversión / la voz que vende / calibrar [marca]_conversion" → `voice-conversion` (+ `voice-craft` obligatorio)
- Sam dice "pricing / cotización / kit B2B / margen / rentabilidad NSCF" → `nscf-pricing` + `ui-ux-layer` (para output visual)
- Sam dice "agente / WhatsApp / bot" → `agent-builder` + `security`
- Sam dice "imagen / video / LoRA" → `image-processing` (+ `higgsfield` si hay MCP activo)
- Sam dice "ads / campaña / Meta / TikTok" → `ads-mcp`
- Sam dice "costos / margen / tokens" → `cost-layer`
- Sam dice "pipeline / IID / Orchestrator" → `content-pipeline`
- Sam dice "actualiza graph / actualiza ecosystem / ecosystem desactualizado" → `ecosystem-auditor` + `ecosystem-updater`
- Sam dice "ecosystem audit" o "ecosystem scan" → `ecosystem-auditor` (ver también HRD_ECOSYSTEM_AUDIT en userPreferences)
- Sam dice "videos TikTok / transcribir / OCR / voice genome / referencia de cuenta" → `voice-reference-extractor` (research local, paso 1) → `genome-calibration` (calibración, paso 2)

**Regla de carga de la familia VOICE (nueva v1.8):**
- **`voice-craft` es PRIMARIO: se carga SIEMPRE que haya calibración o generación de voz**, junto con `genome-calibration` (método) y/o `content-pipeline` (output). Nunca se usa un perfil secundario sin él.
- **Los perfiles secundarios se cargan por TIPO DE VOZ declarado**, uno a la vez: `voice-conversion` (existe) · `voice-editorial` / `voice-educative` / `voice-professional` (pendientes de escribir con casos reales).
- Si el tipo de voz no tiene perfil escrito, se calibra con `voice-craft` + el cuadro de parametrización de `IID/CALIBRATOR_MINDSET.md` §4, y se documenta el caso para escribir el perfil después.

**Nunca se cargan proactivamente sin declaración:**
- `ads-mcp` — solo si hay campaña activa en esa sesión
- `higgsfield` — solo si hay generación visual en agenda
- `agent-browser` — solo si hay tarea de automatización de browser
- `ecosystem-auditor` / `ecosystem-updater` — solo bajo demanda explícita
- `supabase-auditor` — solo bajo demanda del protocolo auditor (el cruce código↔DB es caro)
- `voice-reference-extractor` — solo cuando hay carpeta de videos lista para procesar

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

_INDEX v1.8 · Unreal>ille Studio · Carga obligatoria en apertura de sesión_
