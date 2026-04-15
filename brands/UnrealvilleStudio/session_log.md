# Session Log — Unrealville Studio
_Marca interna · Sam (owner) · Actualizado: 2026-04-15_

---

## 2026-04-15 — Sesión de infraestructura completa

### Resuelto hoy

**Cloudflare setup completo via proxy `/api/cf`:**
- Always HTTPS: ON · www→apex redirect (301) activos
- Proxy CF creado en unrlvl-context, opera los 6 dominios via API

**CoreProject limpieza (51→37 archivos):**
- PDFs financieros ForumPHs eliminados (eran públicamente accesibles — riesgo seguridad)
- DB_VARIABLES_v6.xlsx, ContextoTemp.md, brand book v1.1, sites/ completa eliminados
- GitHub proxy `/api/gh` v2 con soporte de escritura

**Web unrealvillestudio.com — LIVE completo:**
- EN: index.html con Psycho Layer + Profiler Agent + amber LIVE
- ES: es/index.html traducción completa LIVE
- Language switcher EN↔ES + hreflang SEO
- Vizos WF corregido — no falla cuando no hay archivos Vizos

**Profiler Agent v5 LIVE:**
- Senior strategist, bar conversation energy
- Conocimiento marketing/publicidad/consumer behavior embebido
- NO revela: nombres de labs, % AI, precios de tiers
- Brief enriquecido con tone_read + flags

**Auditoría completa de labs:**
- CopyLab: motor 13 capas, BP_COPY_1.0 pendiente 3 marcas
- WebLab: módulo Shopify completo (nc-* Liquid, ThemeDeployModule, ShopifyPushModule)
- ImageLab: gaps — background removal básico, sin LoRA Prep
- AgentLab: 6 módulos + apps/assistant (proyecto personal madre de Sam)
- Orchestrator: Claude intent interpreter → plan JSON → ejecuta labs
- BlueprintLab: 4 schemas activos

**Plan Maestro creado:**
Archivo `PLAN_MAESTRO_LABS_SKILLS.md` en context system — roadmap detallado de labs, skills permanentes, LoRA pipeline, roadmap priorizado por trimestre

**Skills permanentes — estrategia definitiva (6 skills, ninguno duplica labs):**
1. `ui-ux-layer` — Prioridad 1
2. `image-processing` — Prioridad 2 (incluye pipeline LoRA Prep)
3. `agent-builder` — Prioridad 3
4. `copylab-reference` — Prioridad 4
5. `weblab-shopify-reference` — Prioridad 5
6. `security` — Prioridad 6

**LoRA Prep pipeline diseñado:**
Face detection → Smart crop 1024×1024 → Fal.ai birefnet → Quality filter → Claude Vision captions → ZIP para FLUX Dreambooth
BlueprintLab llama a ImageLab para procesamiento de fotos de personas reales (piloto: Patricia Osorio)

**UNRLVL CRM v1.0 schema activo en Supabase:**
Tablas: crm_contacts, crm_activities, crm_stage_history
Trigger: sync_profiler_to_crm activo
Dashboard: PENDIENTE CONSTRUIR (próxima actividad)

### Pendiente próxima sesión

1. **UNRLVL CRM dashboard** — gestión pipeline leads para Sam
2. Push index.html a CoreProject (PAT)
3. Skill `ui-ux-layer` (primera sesión dedicada)
4. NeuroneSCF: Meta BM + 87 SKUs + precios
5. SMA: URL session_log en system prompt

### Decisiones importantes

- apps/assistant = proyecto personal madre de Sam. Patrón técnico reutilizable.
- BlueprintLab es punto de entrada LoRA workflow → llama a ImageLab
- Fal.ai birefnet para background removal real (reemplazar color-matching básico)
- CoreProject = repo del sitio web UNRLVL, no almacenamiento general
- PDFs financieros de clientes → Supabase Storage privado, NUNCA repos públicos
- Orchestrator system prompt necesita actualización cuando LoRA Prep esté listo
