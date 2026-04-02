# ECOSYSTEM FILEMAP — Mapa de Dependencias y Gaps
**Generado:** 2026-04-02 | **Propósito:** Arquitectura operativa + gaps vs propuesta Neurone SCF (319 outputs/mes)

---

## SEPARACIÓN PRODUCCIÓN / INTERNO

### PRODUCCIÓN (sirven a marcas y clientes)
```
Labs de generación:  CopyLab · WebLab · ImageLab · VideoLab · VoiceLab · SocialLab · Orchestrator · BlueprintLab · AgentLab · OnboardingApp
Agentes standalone:  Social Media Agent · ForumPHs Speaks
Asset repos:         BluePrints · Shopify
```

### INTERNO / OPERATIVO (uso Sam + Claude + equipo)
```
Contexto:       Context System (INFRA-CTX) · Session Protocol · UNRLVL-PROJECT Dashboard
Gestión:        UNRLVL-OPS · Historical Context Builder · Ecosystem Auditor
Proyectos:      Financial Intelligence Engine · CoreProject
```

---

## MAPA DE DEPENDENCIAS — FLUJOS ACTIVOS HOY

### Flujo 1: CopyLab → copy de marca
```
OnboardingApp ──────────────────────────────────────────┐
    [brand.json, brief, gaps]                            │
                                                         ▼
Supabase ──── fetchBrandContext (21 queries) ────► CopyLab
[brands, humanize, compliance,                    buildCopyPrompt()
output_templates, canal_blocks,                   ← SMPC 10 capas
keywords, ctas, geomix, personas...]              ↓
                                                  Claude Sonnet 4
                                                  ↓
                                              Copy listo para publicar
                                                  ↓
                                              [manual → SocialLab queue]
```

### Flujo 2: WebLab → páginas web / Shopify
```
Supabase ─── product_blueprints ──► WebLab
BluePrints repo ─── Raw URLs ────►  buildSectionPrompt()
[product images]                    ← 12 capas
brandContexts.tsx (hardcoded) ────► Claude Sonnet 4
                                    ↓
                                shopify.ts proxy
                                    ↓
                            Shopify tienda (push directo)
                                    ↓ (también)
                            Shopify repo (manual commit)
```

### Flujo 3: ImageLab → assets visuales
```
BluePrints repo ──── fotos PO (manual upload) ──► ImageLab Slot A
BluePrints repo ──── fotos VizosSalon ──────────► ImageLab Slot B
                                                   Gemini Imagen 3
                                                   ↓
                                               imagen generada
                                                   ↓
                                           [descarga manual]
                                           [→ SocialLab media]
                                           [→ Shopify via WebLab]
```

### Flujo 4: Social Media Agent → setup infraestructura NeuroneSCF
```
Context System ─── NeuroneSCF/session_log.md ──► Social Media Agent
                                                  Claude Sonnet 4
                                                  + System Prompt
                                                  [Ley Meta/TikTok/WABA]
                                                  ↓
                                           @vercel/kv historial
                                                  ↓
                                           Respuesta a Laura/PO
                                                  ↓ [cmd: Actualiza]
                                           agents/social-media-agent/
                                           session_log.md → commit
```

### Flujo 5: Session context loop (Sam ↔ Claude)
```
Sam abre nuevo chat
    ↓
Claude: "Hola Sam, ¿con qué marca?"
    ↓
Vercel:web_fetch_vercel_url
← ecosystem.json
← brands/[Marca]/brand.json
← brands/[Marca]/BP_Brand_Context.md
← brands/[Marca]/session_log.md
    ↓
Trabajo de la sesión
    ↓
Sam: "Actualiza"
    ↓
Claude verifica /api/export del SMA
Claude genera outputs descargables
    ↓
Sam arrastra a repo local
GitHub Desktop commit → push
Vercel redesploya (30s)
Claude verifica y confirma
```

---

## MAPA DE DEPENDENCIAS — FLUJOS PARCIALES O ROTOS

### Flujo roto A: CopyLab → VideoLab (VideoPodcast)
```
CopyLab ─── video_podcast_script pack ─── Export JSON ──► ???
            { label, speaker, content }[]

VideoLab ─── StoryboardExport VP_1.0 ─── ???
             { frames[], personas, location }

GAP: Falta función de transformación CopyLab JSON → StoryboardFrame[]
ESFUERZO: ~2h. La pieza más fácil con mayor impacto en el flujo de video.
```

### Flujo roto B: ImageLab → Todos los labs
```
ImageLab genera imagen
    ↓ descarga manual (no hay endpoint)
    ↓
[copiar manualmente a SocialLab como adjunto]
[copiar manualmente a WebLab como extra context]

GAP: Sin API/endpoint de ImageLab. Sin integración con SocialLab ni WebLab.
```

### Flujo roto C: BlueprintLab → Labs
```
BlueprintLab crea BP_COPY_1.0
    ↓ Export manual JSON
    ↓ commit manual a BluePrints repo
    ↓ CopyLab... no lo lee

GAP: BP_COPY existe, es rico, nadie lo consume.
ACCIÓN: Migrar BP_COPY a Supabase tabla brand_copy_profiles → CopyLab lee.
```

### Flujo roto D: Orchestrator → Labs
```
Orchestrator interpreta prompt (Gemini real)
    ↓ genera plan con stages
    ↓ "ejecuta" cada stage
    ↓ setTimeout(2s) + texto hardcoded

GAP: executeStage() es mock. Labs no exponen APIs.
OPCIONES:
  A) Serverless endpoints por lab (más trabajo, más correcto)
  B) Orchestrator llama Claude directamente con system prompts de Supabase (más rápido)
```

### Flujo roto E: WebLab → Supabase (brandContexts)
```
WebLab ─── brandContexts.tsx (hardcoded)
           humanizeConfig.ts (hardcoded)
           brandBlueprints.ts (hardcoded)

CopyLab ─── Supabase 21 tablas en paralelo ✅

GAP: WebLab no completó la migración que CopyLab sí completó.
ACCIÓN: Refactor webEngine.ts para leer brandContexts/humanize desde Supabase.
```

---

## GAPS VS PROPUESTA DE SERVICIO NEURONE SCF (319 outputs/mes)

### Desglose de los 319 outputs comprometidos

| Tipo | Pack CopyLab | Volumen/mes | Estado hoy |
|---|---|---|---|
| Posts orgánicos IG/TikTok | social_post_pack | ~120 (40 posts ×3 vars) | ✅ Generables |
| Ads Meta | ad_copy_pack | ~100 (10 camps ×10 piezas) | ✅ Generables |
| SEO + Blog | seo_meta + blog_pack | ~40 (20 pág + 4 arts) | ✅ Generables |
| Email campaigns | email_pack | ~44 (4 camps ×11 piezas) | ✅ Generables |
| Scripts video | video_podcast_script | ~15 (3 ep ×5 piezas) | ✅ Generables |
| Assets visuales (IG/Ads) | ImageLab | ~170 imágenes | ❌ NeuroneSCF no configurada |
| Publicación automática | SocialLab → Meta API | 319 posts | ❌ Mock API |

### Gaps críticos para escalar a 319/mes

**GAP 1 — NeuroneSCF en ImageLab (blocking para assets visuales)**
- NeuroneSCF no existe en `brands.ts` de ImageLab
- Las 100 fotos de Patricia Osorio y 39 productos están en BluePrints repo pero ImageLab no los carga
- FIX: Añadir NeuroneSCF a brands.ts (30 min) → INMEDIATO
- FIX completo: migrar ImageLab a Supabase (patrón CopyLab) → 2-3 días

**GAP 2 — Meta API para publicación (blocking para automatización)**
- SocialLab tiene Mock API (92% simulado)
- OAuth por marca × plataforma no implementado
- FIX: implementar OAuth Meta + `callMetaAPI()` en socialEngine.ts
- El propio código documenta exactamente qué hacer — es el único archivo que cambia

**GAP 3 — brand_goals + brand_personas vacíos**
- CopyLab genera sin ICP ni objetivos de campaña explícitos
- OnboardingApp ya los lee pero no los escribe en Phase 4
- FIX: añadir al gap interview + brandWriter.ts → 3-4h

**GAP 4 — Flujo CopyLab → SocialLab desconectado**
- El copy se genera en CopyLab y se publica en SocialLab pero no hay puente
- Sam copia manualmente entre labs
- FIX: función de importación CopyLab outputs → SocialLab queue

**GAP 5 — VideoLab sin motor real**
- Los 15 scripts de video podcast se generan en CopyLab
- VideoLab puede hacer storyboard pero no genera video
- HeyGen/Kling no integrados
- FIX a corto plazo: usar CopyLab scripts como input manual en VideoLab

---

## ROADMAP DE DESARROLLO — PRIORIDADES POR IMPACTO

### Inmediato (horas) — Desbloquear Neurone SCF
1. **NeuroneSCF en ImageLab brands.ts** (30 min) → 170 assets visuales/mes disponibles
2. **ForumPHs Speaks → AgentLab** (2-3h) → sistema prompt listo, solo migrar arquitectura
3. **CopyLab → SocialLab puente** (2-4h) → eliminar copia manual de outputs

### Corto plazo (días) — Conectar el ecosistema
4. **BP_COPY → Supabase** (1 día) → la voz de marca en todos los labs
5. **brand_goals + brand_personas en OnboardingApp** (3-4h) → ICP real en CopyLab
6. **Transformación CopyLab → VideoLab** (2h) → flujo de video podcast completo
7. **Meta OAuth en SocialLab** (1-2 días) → publicación real

### Medio plazo (semanas) — Cerrar la arquitectura
8. **WebLab brandContexts → Supabase** (2-3 días) → consistencia con CopyLab
9. **ImageLab → Supabase** (2-3 días) → marcas dinámicas, no hardcoded
10. **Orchestrator → llamadas reales** (1 semana) → Opción B: Claude con system prompts Supabase
11. **Voice IDs reales** (requiere decisión ElevenLabs/TenzorArt) → desbloquea VoiceLab

### Largo plazo (meses) — El ecosistema completo
12. **PersonBlueprints → Supabase** → sincroniza VideoLab, ImageLab, VoiceLab
13. **VideoLab HeyGen/Kling** → generación real de video
14. **SocialLab completo** (IG + TikTok + LinkedIn + YouTube) → publicación multi-canal
15. **AnalyticsLab** → retroalimenta keywords y formatos desde performance real

---

## CONVENCIONES DE NAMING — TODOS LOS REPOS

| Patrón | Ejemplo | Repo/ubicación |
|---|---|---|
| `BP_BRAND_[Marca]_v[N].json` | BP_BRAND_ForumPHs_v1.0.json | BluePrints/brands/ |
| `BP_BRAND_[Marca]_v[N].html` | BP_BRAND_UnrealilleStudio_v1.1.html | CoreProject/brands/ |
| `BP_PERSON_[Initials]_[Context]_[N].json` | BP_PERSON_PO_Patricia_Salon_1.0.json | BluePrints/persons/ |
| `BP_LOCATION_[Name]_[N].json` | BP_LOCATION_VizosSalon_1.0.json | BluePrints/locations/ |
| `BP_PRODUCT_[Marca]_[SKU]_[N].json` | BP_PRODUCT_Neurone_HUMIT-MASK_1.0.json | BluePrints/products/ |
| `ecosystem_radiografia_[Lab].md` | ecosystem_radiografia_CopyLab.md | output del audit |
| `[marca]-v[N].html` | vizoscosmetics-v8.html | CoreProject/sites/ |
| `[marca]-ops-[tema].html` | unrlvl-ops-redes-sociales.html | CoreProject/protocols/internal/ |
| `brands/[BrandId]/brand.json` | brands/NeuroneSCF/brand.json | unrlvl-context repo |
| `brands/[BrandId]/session_log.md` | brands/NeuroneSCF/session_log.md | unrlvl-context repo |
| `apps/[nombre-kebab]/` | apps/forumphs-speaks/ | AgentLab repo |

---

## IDs CANÓNICOS DE MARCA

| ID canónico | Nombre visible | Labs donde está configurado |
|---|---|---|
| `NeuroneSCF` | Neurone South & Central Florida | CopyLab, WebLab, SocialLab, Supabase, Context System |
| `ForumPHs` | ForumPHs | CopyLab, WebLab, SocialLab, Supabase, Context System |
| `DiamondDetails` | Diamond Details | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `VizosCosmetics` | Vizos Cosmetics | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `D7Herbal` | D7 Herbal | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `VivoseMask` | Vivosé Mask | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `PatriciaOsorioPersonal` | Patricia Osorio · Personal | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `PatriciaOsorioComunidad` | Patricia Osorio · Comunidad | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `PatriciaOsorioVizosSalon` | Patricia Osorio · Vizos Salón | CopyLab, WebLab, ImageLab, SocialLab, Supabase |
| `UnrealvilleStudio` | Unreal>ille Studio | Supabase, Context System |
| `UnrealvilleStores` | Unrealville Stores | Supabase |

**PHAS** (PH Administradores) — en SocialLab pero no confirmado como brand_id canónico.

---

## INVENTARIO DE BRAND IDS INCONSISTENTES ENTRE LABS

| Lab | ID usado | ID canónico | Diferencia |
|---|---|---|---|
| AgentLab Builder | `unrealille-studio`, `d7-herbal` | `UnrealvilleStudio`, `D7Herbal` | guiones vs camelCase |
| VideoLab | CyberEdge, Lumina, Terra | — | Marcas genéricas placeholder, no reales |
| VoiceLab ScriptModule | `diamond_details`, `patricia_osorio` | `DiamondDetails`, `PatriciaOsorioPersonal` | underscore vs camelCase |
| ecosystem.json | `neuroneCosmetics` (WebLab map) | `NeuroneSCF` | alias distinto |

**Regla:** el ID canónico es el que usa Supabase como PK. Cualquier discrepancia rompe el stack.
