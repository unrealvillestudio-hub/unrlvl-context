# SKILLS INDEX — Unrealville Studio
_Versión: 1.3 · 2026-06-03 · Mantenido por: Claude_

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
- Sam dice "copy / contenido / post / artículo / descripción / ad" → `content-pipeline`
- Sam dice "agente / WhatsApp / bot" → `agent-builder` + `security`
- Sam dice "imagen / video / LoRA" → `image-processing` (+ `higgsfield` si hay MCP activo)
- Sam dice "ads / campaña / Meta / TikTok" → `ads-mcp`
- Sam dice "costos / margen / tokens" → `cost-layer`
- Sam dice "pipeline / IID / Orchestrator" → `content-pipeline`
- Sam dice "actualiza graph / actualiza ecosystem / ecosystem desactualizado" → `ecosystem-auditor` + `ecosystem-updater`
- Sam dice "ecosystem audit" o "ecosystem scan" → `ecosystem-auditor` (ver también HRD_ECOSYSTEM_AUDIT en userPreferences)

**Nunca se cargan proactivamente sin declaración:**
- `ads-mcp` — solo si hay campaña activa en esa sesión
- `higgsfield` — solo si hay generación visual en agenda
- `agent-browser` — solo si hay tarea de automatización de browser
- `ecosystem-auditor` / `ecosystem-updater` — solo bajo demanda explícita
- `supabase-auditor` — solo bajo demanda del protocolo auditor (el cruce código↔DB es caro)

---

## SKILLS PENDIENTES DE CREAR

| Skill | Estado | Prerequisito |
|-------|--------|-------------|
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

_INDEX v1.2 · Unreal>ille Studio · Carga obligatoria en apertura de sesión_
