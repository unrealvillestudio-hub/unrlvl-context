# ECOSISTEMA UNRLVL — Radiografía Completa
**Generado:** 2026-04-02 | **Audit completado por:** Claude Sonnet 4.6
**Fuente:** Lectura directa de código de 16 repos + 2 archivos standalone

---

## SEPARACIÓN FUNDAMENTAL

El ecosistema UNRLVL tiene dos capas con propósitos distintos que deben tratarse por separado:

**CAPA A — PRODUCCIÓN:** Labs, agentes y repos que producen outputs para marcas y clientes.
**CAPA B — OPERATIVO/INTERNO:** Herramientas de gestión, contexto y coordinación entre Sam y Claude.

---

# CAPA A — ECOSISTEMA DE PRODUCCIÓN

## 1. SUPABASE — El Sistema Nervioso Central

Antes de los labs: Supabase es la base de datos que los alimenta a todos. Schema v1.5 con 29 tablas.

**Tablas críticas para generación de contenido:**

| Tabla | Labs que la leen | Estado |
|---|---|---|
| `brands` | TODOS (11 labs) | ✅ Activa — datos incompletos en varias marcas |
| `humanize_profiles` | CopyLab, WebLab, SocialLab | ⚠️ Solo DEFAULT + NeuroneSCF completos |
| `compliance_rules` | CopyLab, WebLab, ImageLab | ✅ Activa |
| `output_templates` | CopyLab | ✅ Activa |
| `canal_blocks` | CopyLab | ✅ Activa |
| `keywords` | CopyLab | ✅ Activa — parcial por marca |
| `ctas` | CopyLab | ✅ Activa |
| `geomix` | CopyLab, ImageLab | ⚠️ Solo DiamondDetails + NeuroneSCF |
| `product_blueprints` | WebLab, ImageLab | ✅ Activa — 39 SKUs Neurone completos |
| `person_blueprints` | VideoLab, VoiceLab, ImageLab | ⚠️ Tabla existe, datos pendientes de migrar |
| `brand_goals` | CopyLab (pendiente) | ❌ Tabla creada, sin datos |
| `brand_personas` | CopyLab (pendiente) | ❌ Tabla creada, sin datos |
| `brand_palette` | Todo (pendiente) | ❌ Solo sugerencias Claude — sin hex reales |
| `brand_typography` | Todo (pendiente) | ❌ Vacía en mayoría de marcas |

**Patrón unificado de acceso:** fetch nativo sin SDK. Todas las apps usan `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`. CopyLab es la implementación de referencia (21 queries en paralelo).

---

## 2. ONBOARDING APP
**URL:** `unrlvl-onboarding-app.vercel.app` | **LLM:** Claude Sonnet 4

El pipeline de entrada de datos de marca. Convierte un brief narrativo libre en datos estructurados escritos directamente en Supabase. Es la herramienta que desbloquea todo el ecosistema — cada marca que pasa por aquí mejora el output de todos los labs.

**Flujo:** Brief libre (Phase 1) → Claude estructura en JSON (Phase 2) → Gap interview (Phase 3) → Write a Supabase 5 tablas (Phase 4)

**Tablas que escribe:** `brands`, `humanize_profiles`, `compliance_rules`, `brand_palette`, `brand_typography`

**Pendiente conectar:** `geomix`, `brand_services`, `brand_goals`, `brand_personas`

**ChatPanel:** drawer lateral con contexto real de la marca activa (humanize + goals + personas) — Claude como asistente contextual mientras se trabaja el onboarding.

---

## 3. COPYLAB
**URL:** `unrlvl-copy-lab.vercel.app` | **LLM:** Claude Sonnet 4 | **Estado:** PASSED v7

El motor de copy más maduro del ecosistema. 100% Supabase-driven desde v7 — cero hardcode de marcas. Lee 21 tablas en paralelo para ensamblar un prompt por capas.

**Arquitectura SMPC (10 capas en orden):**
Brand Block → Idioma (prioridad absoluta) → Canal → Humanize F2.5 → GeoMix → Keywords → CTA → Compliance → Notas extra → Template con variables

**Temperatura por template:** 0.5 (Ads) → 0.6 (Email/Landing) → 0.7 (SEO) → 1.0 (Social/TikTok/Storytelling)

**7 packs:** Social Post, Ad Copy Full, SEO Meta, YouTube Full, Email Campaign, Blog Article, VideoPodcast Script

**VideoPodcast export:** genera JSON estructurado (HOST/GUEST por bloque) para handoff a VideoLab.

**Gap crítico:** `brand_goals` + `brand_personas` existen en Supabase pero no están conectados al motor. El modelo genera sin ICP ni objetivos de campaña explícitos.

---

## 4. WEBLAB
**URL:** `web-lab.vercel.app` | **LLM:** Claude Sonnet 4 | **Estado:** Active

Generador de copy web (HTML/Liquid) para 10 marcas. Push directo a Shopify.

**4 módulos:** Web Corporativa, Landing, E-Commerce (con producto selector), Blog

**Diferencia vs CopyLab:** WebLab aún tiene `brandContexts.tsx`, `humanizeConfig.ts` y `brandBlueprints.ts` hardcoded — la migración a Supabase está pendiente (solo `product_blueprints` migrado). CopyLab ya completó esa migración.

**Supabase:** Solo lee `product_blueprints`. Escribe `description_enhanced` al repo BluePrints via GitHub API.

**Super Aggro Mode:** copy de alta presión psicológica. Warning banner obligatorio en export antes de publicar.

**Shopify integration activa:** push directo de páginas, secciones Liquid y catálogo de productos con imágenes al CDN de Shopify.

---

## 5. IMAGELAB
**URL:** `image-lab-unrlvl.vercel.app` | **LLM:** Google Imagen 3 + Gemini 2.5 Flash Image | **Estado:** Active ICR v1.0

El único lab del ecosistema que usa Google Gemini en lugar de Claude. Genera imágenes de marketing con compositing determinista canvas-side.

**2 paths de generación:**
- Path 1: Imagen 3 (text-only) — JPEG, alta calidad
- Path 2: Gemini 2.5 Flash (multimodal) — PNG, con imágenes de referencia → fallback automático si falla Imagen 3

**Asset Library (6 slots):** sourceA (sujeto principal), sourceB (fondo/secundario), sourceC (terciario), ref1/2/3 (referencias de estilo). Alpha detection automática al subir.

**Compositing engine:** Canvas API nativa. 4 capas: background → cast shadow → ambient occlusion → producto. Debug mode con HUD.

**6 packs:** Landing Conv, Landing Aggr, Web Institucional, E-Commerce, Instagram Organic (Feed+Reels), YouTube

**Gaps críticos:** NeuroneSCF no configurada como marca. Sin Supabase. Marcas hardcoded en `brands.ts`.

---

## 6. VIDEOLAB
**Estado:** Building — storyboard builder operativo, generación de video NO implementada

Storyboard builder para planificación de producción de video. Permite definir marca, archetype (studio/car/street/salon/event/talking_head), personas (HOST/GUEST), locación, y construir frame a frame con motion style.

**Lo que NO hace:** el botón "Generate Prompts" usa `setTimeout(2000)` — no llama a ninguna API. HeyGen y Kling están planificados pero no integrados.

**Export VP_1.0:** JSON `StoryboardExport` listo para cuando se integre HeyGen/Kling. Es el protocolo de handoff desde CopyLab.

**Gap:** Marcas son 3 placeholders genéricos (CyberEdge, Lumina, Terra) — ninguna marca UNRLVL real configurada.

---

## 7. VOICELAB
**Estado:** Scaffolding — script builder operativo, síntesis de voz NO implementada. **Bloqueante:** Voice IDs todos `TBD_*`

Genera scripts de voz por bloques para 9 packs (commercial, narration, podcast, videopodcast). Muestra preview del payload ElevenLabs/TenzorArt pero no sintetiza audio.

**Discrepancia API:** `ecosystem.json` dice TenzorArt, el código muestra ElevenLabs (`eleven_multilingual_v2`). Necesita confirmación de Sam.

**El activo más rico:** `personBlueprints.ts` contiene 10 blueprints con campos imagelab + voicelab + archetypes compatibles. Es el nodo de conexión entre VideoLab, ImageLab y VoiceLab. Debe migrar a Supabase.

**Script engine:** string replace con templates, sin LLM. Para producción real debe llamar a Claude (patrón de CopyLab).

---

## 8. SOCIALLAB
**Estado:** Building — UI completa + generación real con Gemini, publicación en MOCK

Post builder para 6 plataformas (Instagram, Facebook, TikTok, LinkedIn, YouTube, Threads). **El único lab "building" con AI real activa** — Gemini 2.0 Flash genera copy de verdad.

**4 funciones AI:**
1. `generateSocialCopy()` — desde brief → copy optimizado por plataforma
2. `enhanceCopy()` — reescribe y optimiza copy existente
3. `suggestHashtags()` — estratégico por plataforma (IG: 8-15 mix, TikTok: 3-6 trending)
4. `adaptCopyForPlatform()` — reinterpretación nativa cross-platform

**Humanize F2.5:** versión más completa del ecosistema — 5 medios completos + 5 overrides de marca. Debería ser la fuente de verdad para todos los labs.

**Pendiente crítico:** API key de Gemini expuesta client-side (`VITE_GEMINI_API_KEY`). Debe migrarse a proxy serverless.

**Publicación:** mock layer (92% success simulado). Meta/TikTok/LinkedIn API no integradas.

---

## 9. ORCHESTRATOR
**URL:** `orchestrator.vercel.app` | **Estado:** Scaffolding — interpretación real con Gemini, ejecución MOCK

El director de orquesta del ecosistema. Permite describir en lenguaje natural lo que se quiere producir → Gemini interpreta → genera pipeline de labs → ejecuta secuencialmente con checkpoints de aprobación humana.

**Lo que hace real:** Gemini 2.0 Flash interpreta el prompt y genera el plan (marca, plataformas, etapas, compliance flags, DB_VARIABLES keys) con precisión. Temperatura 0.3.

**Lo que es mock:** `executeStage()` usa setTimeout + textos predefinidos. No llama a ningún lab.

**Checkpoint gates:** pausa la ejecución en stages con `requiresApproval: true`, espera ThumbsUp/ThumbsDown de Sam. Si rechaza → flujo se detiene. Este es el feature más valioso — supervisi humana integrada en el flujo.

**Gap arquitectónico central:** los labs no exponen APIs. Para conectarlo: Opción A — cada lab expone endpoints serverless. Opción B (más rápida) — el Orchestrator llama a Claude directamente con los system prompts de cada lab usando el contexto de Supabase.

---

## 10. BLUEPRINTLAB
**Deploy:** Google AI Studio | **Estado:** Active v1.2

Herramienta de administración de datos maestros. Crea, valida y exporta los Blueprint JSON que alimentan todos los labs. 4 módulos: Registry, Builder, Export, Validate.

**4 schemas:**
- `BP_PERSON_1.0` — unifica identidad visual (imagelab) + identidad de voz (voicelab) en un objeto
- `BP_LOCATION_1.0` — espacios físicos con parámetros visuales
- `BP_PRODUCT_1.0` — parámetros de compositing para ImageLab
- `BP_COPY_1.0` — ⭐ voz de escritura completa: canales, tono, hooks, frases firma, compliance

**BP_COPY no está conectado a ningún lab.** Es el schema más estratégico y el más ignorado — define exactamente lo que CopyLab necesita pero nadie lo consume.

**Persistencia:** `window.storage` de Google AI Studio — datos se pierden fuera del entorno. Debe migrar a Supabase.

---

## 11. AGENTLAB
**URL:** `unrlvl-agent-lab.vercel.app` | **Estado:** Builder scaffolding / Social Media Agent en producción

Dos capas en el mismo repo:

**Capa 1 — Builder:** UI para crear agentes (WhatsApp/WebChat/Voice) con templates, flujos conversacionales y DB Variables. Scaffolding — sin backend real. `cdn.unrlvl.io` y `api.unrlvl.io` son dominios que no existen.

**Capa 2 — Social Media Agent** (`unrlvl-social-media-agent.vercel.app`): Agente real en producción que guía a Patricia Osorio y Laura en el setup de infraestructura digital Neurone SCF (Meta BM, WhatsApp Business API, TikTok). *Nota: el nombre "Social Media Agent" es engañoso — no genera ni publica contenido, guía setup técnico.*
- Claude Sonnet 4 server-side
- @vercel/kv para historial por token (90 días TTL)
- 3 roles: admin (Sam), po (Patricia), ops (Laura)
- Compresión automática de historial largo
- Comando "Actualiza" → genera log estructurado → exportable por Sam

---

## 12. FORUMPHS SPEAKS
**Estado:** v2 checkpoint — funcional, testing con Ivette Flores

Asistente legal conversacional especializado en la Ley 284 de 2022 (Propiedad Horizontal, Panamá). Un archivo HTML standalone.

**Conocimiento:** Junta de Propietarios, quórum, administrador, cuotas, fondo de reserva, morosidad, sanciones, reglamentos anteriores.

**Problema:** API key de Anthropic ingresada por el usuario → expuesta en browser. Funciona para testing interno con Ivette. No apto para producción pública.

**Próximo paso:** migrar a `apps/forumphs-speaks/` en AgentLab. El system prompt está validado — la migración técnica son ~2-3h.

---

## 13. REPOSITORIOS DE ASSETS

### BluePrints repo (`unrealvillestudio-hub/BluePrints`)
337 archivos. Custodia BPs JSON + assets visuales.

**BPs activos:** 3 BP_BRAND (ForumPHs, NeuroneSCF, UNRLVL), 3 BP_PERSON (Patricia Osorio ×3), 3 BP_LOCATION (VizosSalon, MiamiBeach, MiamiStreets), 39 BP_PRODUCT (Neurone SCF completo).

**Assets visuales de alto valor:**
- ~100 fotos Patricia Osorio (JPEG + PNG alpha) — todas las poses y contextos
- 36 fotos Vizos Salón (exterior + interior completo)
- 50 fotos Miami (Ocean Drive + I-95/Brickell/Coconut Grove)
- 39 productos Neurone en 3 versiones (standard/dark/alpha)

### Shopify repo (`unrealvillestudio-hub/Shopify`)
15 archivos. Custodia outputs web para tiendas Shopify/WordPress.

**Activo:** 4 emails B2B transaccionales para Neurone SCF (flujo profesional completo). Todo lo demás vacío.
**Pendiente:** sections, pages, blog para Neurone + assets para demás marcas.
**Dominio placeholder** en los emails — bloqueante antes de activar el flujo B2B real.

### CoreProject (`unrealvillestudio-hub/CoreProject`)
Repositorio operativo. Pipeline de deploy activo (`deploy-vizos-wp.yml` → vizoscosmetics.com via FTP). Templates de CI/CD para WP y Vercel. Protocolos operativos. ForumPHs Suite Financiera (Luxor Tower 300 activo, 5 PHs pendientes).

---

# CAPA B — HERRAMIENTAS INTERNAS Y OPERATIVAS

## Context System (INFRA-CTX)
**URL:** `unrlvl-context.vercel.app`

Sitio estático Vercel que sirve archivos JSON/MD con CORS abierto y cache deshabilitado. Es la memoria persistente del ecosistema entre sesiones de Claude. Sam commitea → GitHub → Vercel redesploya en 30s → Claude lee en el siguiente chat.

**Contenido activo:** `ecosystem.json` (estado global), `brands/[Marca]/` (3 archivos por marca: brand.json + session_log.md + BP_Brand_Context.md), `agents/social-media-agent/session_log.md`, `protocols/SESSION_PROTOCOL.md`.

## UNRLVL-PROJECT Dashboard
**URL:** `unrlvl-context.vercel.app/dashboard.html`

HTML standalone que consume el Context System en tiempo real. Muestra el estado de todas las marcas (proyectos activos, session_log parseado, decisiones pendientes) + proyectos cross-brand. Sin framework, sin backend propio.

## UNRLVL-OPS
**Repo:** `unrealvillestudio-hub/OPS` | **Estado:** PASSED — en producción

Dashboard de gestión de costos operativos. Lee 3 tablas Supabase (`ops_services`, `ops_costs`, `ops_thresholds`). Dashboard con tendencia de 6 meses + breakdown por servicio/lab/marca + sistema de alertas configurables. Admin para registro manual de costos.

## UNRLVL Ecosystem Auditor
No es una app — es el protocolo de trabajo que estamos ejecutando: Sam provee repos → Claude genera radiografías → se consolida en `ecosystem.md` + `ecosystem_filemap.md`. Documentado en `protocols/ECOSYSTEM_AUDIT.md`.

## Historical Context Builder
**Archivo:** `Tools/historical_context_builder.html`

Herramienta para destilar chats largos en `historical_context.md` estructurado. Anthropic API + Google Drive integration. Uso principal: recuperación de contexto histórico cuando el Context System no tiene toda la historia.

## Financial Intelligence Engine (PROJ-FIE)
Herramienta que transforma EEFF en BI interactivo con simulador de timing. HTML + Chart.js. Activo como servicio manual para ForumPHs ($400-800/análisis). Roadmap a app semi-automatizada (nivel 2) y SaaS (nivel 3).

---

# ESTADO GLOBAL POR MARCA

| Marca | Supabase | CopyLab | WebLab | ImageLab | SocialLab |
|---|---|---|---|---|---|
| NeuroneSCF | ✅ Completo | ✅ Operativo | ✅ Activo | ❌ No configurada | ⚠️ Mock |
| ForumPHs | ✅ Completo | ✅ Operativo | ✅ Activo | ❌ No configurada | ⚠️ Mock |
| PatriciaOsorio ×3 | ⚠️ Parcial | ⚠️ Parcial | ✅ Activo | ✅ Configurada | ⚠️ Mock |
| DiamondDetails | ⚠️ Parcial | ✅ Operativo | ✅ Activo | ✅ Configurada | ⚠️ Mock |
| D7Herbal | ⚠️ Parcial | ✅ Operativo | ✅ Activo | ✅ Configurada | ⚠️ Mock |
| VizosCosmetics | ⚠️ Parcial | ⚠️ Parcial | ✅ Activo | ✅ Configurada | ⚠️ Mock |
| VivoseMask | ⚠️ Parcial | ⚠️ Parcial | ✅ Activo | ✅ Configurada | ⚠️ Mock |

---

# LOS 3 GAPS QUE BLOQUEAN EL CRECIMIENTO

**Gap 1 — Datos de marca incompletos en Supabase**
`brand_goals`, `brand_personas`, `brand_palette` vacíos para la mayoría de marcas. OnboardingApp los puede llenar. Sin esto, CopyLab genera sin ICP ni objetivos.

**Gap 2 — Labs no conectados entre sí**
CopyLab y WebLab no se hablan. ImageLab no sabe que existen Supabase ni BluePrints. VideoLab no puede ejecutar. VoiceLab no tiene voice IDs. El Orchestrator los ve a todos pero no puede llamar a ninguno.

**Gap 3 — NeuroneSCF incompleta en los labs visuales**
El cliente principal no está en ImageLab ni VideoLab. Sus 39 productos y ~100 fotos de Patricia Osorio están en el repo BluePrints pero ningún lab los consume automáticamente.
