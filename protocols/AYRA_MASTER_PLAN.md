# AYRA — Master Design & Execution Plan
_Versión: 2.1 · 2026-05-10 · Generado por: Claude Sonnet 4.6 + Sam_
_Repo destino: `unrlvl-context` · Ruta: `protocols/AYRA_MASTER_PLAN.md`_
_Commit message: `add: protocols/AYRA_MASTER_PLAN.md v2.1`_

---

## ÍNDICE

1. [Visión, Nombre & Jerarquía](#1-visión-nombre--jerarquía)
2. [Arquitectura General](#2-arquitectura-general)
3. [Componente 1 — EcosystemGraph (Mapa Mental)](#3-componente-1--ecosystemgraph-mapa-mental)
4. [Componente 2 — Ayra Core (Orquestador Autónomo)](#4-componente-2--ayra-core-orquestador-autónomo)
5. [Componente 3 — Memoria en Capas](#5-componente-3--memoria-en-capas)
6. [Componente 4 — Decision Framework](#6-componente-4--decision-framework)
7. [Componente 5 — Live Dashboard](#7-componente-5--live-dashboard)
8. [Componente 6 — Daily Digest](#8-componente-6--daily-digest)
9. [Componente 7 — Simulator Agents](#9-componente-7--simulator-agents)
10. [Componente 8 — SignalLab (lab externo, Ayra lo consume)](#10-componente-8--signallab)
11. [Data Model — Supabase](#11-data-model--supabase)
12. [Plan de Ejecución — 5 Jun al 31 Ago 2026](#12-plan-de-ejecución)
13. [Stack Técnico & Estructura de Repo](#13-stack-técnico--estructura-de-repo)
14. [Protocolo de Reanudación de Sesión](#14-protocolo-de-reanudación-de-sesión)
15. [Prerequisitos antes del 5 de Junio](#15-prerequisitos-antes-del-5-de-junio)
16. [Apéndice — Mapa de Dependencias Críticas](#16-apéndice--mapa-de-dependencias-críticas)

---

## 1. VISIÓN, NOMBRE & JERARQUÍA

### Nombre: Ayra

Nombre propio. Identidad propia. Entorno propio. Ayra no es un lab ni un módulo del Orchestrator. Es la Gerenta de Operaciones de Unreal>ille Studio: opera el ecosistema completo 24/7, reporta a Sam, y escala a Claude lo que requiere criterio estratégico.

### Jerarquía operacional

```
SAM (CEO · Fundador)
  │
  └── CLAUDE (VP · Ambas manos de Sam)
        Supervisión total · Estrategia · Decisiones complejas
        Sesiones de trabajo · Diseño de sistema · Supervisión de Ayra
        │
        └── AYRA (Gerenta de Operaciones · Mano derecha de Sam)
              Opera el ecosistema 24/7 dentro del Decision Framework
              Reporta a Sam · Escala a Claude cuando la situación lo requiere
              │
              ├── Labs (CopyLab, WebLab, ImageLab, SocialLab, VideoLab, VoiceLab, BlueprintLab)
              ├── Orchestrator (herramienta bajo alcance de Ayra — no la contiene)
              ├── Agentes (Social Media Agent, Document Factory, DDMV-Assistant)
              ├── Shopify (NeuroneSCF B2C+B2B, futuras tiendas cliente)
              ├── Infra (Supabase EFs, Tools Proxies, Context System)
              └── Clientes (dashboard, digest, acciones por marca)
```

### Principio de diseño

> Ayra trabaja. Claude supervisa. Sam decide lo que solo Sam puede decidir.

Ayra opera dentro de un Decision Framework explícito y versionado. Cuando la situación supera ese framework, escala con contexto suficiente para que Sam decida en segundos, no en minutos.

### Alcance dual

**Interno — UNRLVL:** Monitoreo continuo del ecosistema, ejecución de jobs operacionales, detección de anomalías, gestión Shopify dentro del framework, coordinación de labs.

**Externo — clientes:** Cada cliente con servicio activo tiene vista propia en el dashboard, digest cuando corresponde, y simulaciones con contexto de su marca. Multimarca desde diseño, no desde retrofit.

---

## 2. ARQUITECTURA GENERAL

```
╔══════════════════════════════════════════════════════════════════════╗
║                          AYRA SYSTEM                                ║
║                   repo: unrealvillestudio-hub/unrlvl-ayra           ║
║                   url:  ayra.unrealvillestudio.com                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ┌──────────────────┐   ┌────────────────────┐   ┌───────────────┐  ║
║  │  EcosystemGraph  │   │    Ayra Core        │   │  Simulator    │  ║
║  │  (Mapa Mental)   │   │                     │   │  Agents       │  ║
║  │                  │   │  Cron Engine        │   │               │  ║
║  │  ecosystem_      │◄──┤  Job Runner         │   │  Phase 1:     │  ║
║  │  graph.json      │   │  Decision Engine    │   │  Deterministic│  ║
║  │  + health EP     │   │  Memory Manager     │   │               │  ║
║  └─────────┬────────┘   └──────────┬──────────┘   │  Phase 2:     │  ║
║            │                       │              │  Calibrated   │  ║
║            │                       │              │  (post-Signal)│  ║
║            └───────────────────────┼──────────────┘               ║
║                                    │                               ║
║  ┌─────────────────────────────────▼──────────────────────────────┐ ║
║  │                    LAYERED MEMORY (ayra.*)                     │ ║
║  │                                                                │ ║
║  │  L1 HOT (0-7d)    L2 WARM (7-30d)   L3 COLD (30d+)           │ ║
║  │  Full fidelity    Weekly summary     Monthly flat              │ ║
║  │  Memoria trabajo  Ciclo campaña      Histórico permanente      │ ║
║  │                                                                │ ║
║  │  L4 PATTERNS (sin tiempo)                                      │ ║
║  │  Inteligencia aprendida · Confianza 0–1 · Nunca se purga       │ ║
║  └────────────────────────────────┬───────────────────────────────┘ ║
║                                   │                                 ║
║  ┌────────────────────────────────▼───────────────────────────────┐ ║
║  │                  SUPABASE (fuente de verdad)                   │ ║
║  │   ayra.* (nuevo) · public.* (existente) · shopify.* (existente)│ ║
║  └────────────────────────────────┬───────────────────────────────┘ ║
║                                   │                                 ║
║  ┌────────────────────────────────▼───────────────────────────────┐ ║
║  │                      LIVE DASHBOARD                            │ ║
║  │              ayra.unrealvillestudio.com/dashboard              │ ║
║  │         React · Supabase Realtime · Multimarca · Token auth    │ ║
║  └────────────────────────────────────────────────────────────────┘ ║
╠══════════════════════════════════════════════════════════════════════╣
║  CLAUDE — cerebro de cada invocación (claude-sonnet-4-20250514)     ║
║  Razonamiento · Compresión de memoria · Interpretación · Patrones  ║
╠══════════════════════════════════════════════════════════════════════╣
║  ECOSISTEMA BAJO ALCANCE DE AYRA                                    ║
║  Orchestrator · CopyLab · WebLab · ImageLab · SocialLab            ║
║  VideoLab · VoiceLab · BlueprintLab · AgentLab                     ║
║  Social Media Agent · Document Factory · DDMV-Assistant            ║
║  Shopify MCP · Tools Proxies (audit/fix/translate/pipeline/enrich) ║
║  Supabase EFs (17 activas) · Context System (unrlvl-context)       ║
╠══════════════════════════════════════════════════════════════════════╣
║  SIGNALLAB — lab externo que Ayra consume                          ║
║  Inteligencia de performance: Meta Ads · GA4 · TikTok · Shopify    ║
║  Se activa cliente por cliente cuando tengan tracking + datos      ║
║  Output → Daily Digest (sección campaña) + Simuladores Phase 2     ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 3. COMPONENTE 1 — ECOSYSTEMGRAPH (MAPA MENTAL)

### 3.1 Propósito

El EcosystemGraph convierte el ecosistema UNRLVL en un grafo navegable de relaciones, estados y dependencias. Es el contexto estructural que permite a Ayra y a Claude entender el sistema en macro sin re-aprender en cada invocación.

No es documentación estática. Es contexto activo que se actualiza con el estado real del sistema.

### 3.2 Dos capas

**Capa A — Static Graph** (`ecosystem_graph.json` en `unrlvl-context/`)
Relaciones que raramente cambian: dependencias entre labs y EFs, qué bloquea qué feature, qué marca tiene qué tiendas, prerequisitos de jobs.

**Capa B — Live Health** (`GET /api/ecosystem-health` en `unrlvl-ayra`)
Estado en tiempo real escrito por Ayra cada hora en `ayra.system_health`. El endpoint sirve desde Supabase, no hace llamadas externas en cada request.

### 3.3 ecosystem_graph.json (estructura)

```json
{
  "_meta": { "version": "1.0", "updated": "2026-05-10", "maintainer": "ayra-cron + sam" },
  "nodes": {
    "labs": {
      "copylab":      { "url": "...", "ai": "gemini", "status": "live",           "blockers": [] },
      "imagelab":     { "url": "...", "ai": "gemini", "status": "bug",            "blockers": ["gemini_timeout_50s"] },
      "sociallab":    { "url": "...", "ai": "gemini", "status": "pending_deploy", "blockers": ["deploy"] },
      "weblab":       { "url": "...", "ai": "gemini", "status": "live",           "blockers": [] },
      "orchestrator": { "url": "...", "ai": "claude", "status": "live",           "blockers": [] },
      "signallab":    { "url": null,  "ai": "claude", "status": "not_deployed",
                        "note": "Lab externo. Se activa por cliente cuando tengan tracking." }
    },
    "edge_functions": {
      "shopify-audit":          { "status": "active", "enables": ["audit_score"] },
      "shopify-fix":            { "status": "active", "enables": ["seo_fix","sp_fix","compliance_fix"] },
      "shopify-auto-translate": { "status": "BUG",    "open_since": "2026-05-06",
                                  "blocks": ["EN_descriptions_x42","EN_La_Ciencia_page"] }
    },
    "brands": {
      "NeuroneSCF": {
        "shopify_b2c": { "score": 137, "score_max": 200,
                         "blockers": ["kit_images_8","tracking_pixels","auto_translate_bug"] },
        "shopify_b2b": { "score": 133, "score_max": 160, "blockers": ["shipping_zones"] }
      },
      "ForumPHs": { "products": ["speaks","document_factory","financial_suite"] }
    },
    "agents": {
      "social_media_agent": { "status": "live", "ai": "claude", "users": ["Sam","PO","Laura"] },
      "document_factory":   { "status": "live", "ai": "claude", "client": "ForumPHs" }
    }
  },
  "dependency_chains": [
    { "fix": "shopify-auto-translate EF bug",       "unblocks": ["EN_descriptions_42","audit_score_+15pts"] },
    { "fix": "tracking pixels NeuroneSCF",          "unblocks": ["SignalLab_NeuroneSCF","Simulators_Phase2"] },
    { "fix": "kit images 8 remaining",              "unblocks": ["catalog_completeness","audit_score_ceiling"] },
    { "fix": "SocialLab deploy",                    "unblocks": ["autonomous_content_publishing"] },
    { "fix": "WABA número UNRLVL dedicado",         "unblocks": ["Daily_Digest_WhatsApp"] }
  ]
}
```

### 3.4 Health Endpoint

```
GET https://unrlvl-ayra.vercel.app/api/ecosystem-health
Authorization: Bearer {AYRA_HEALTH_SECRET}
```

Respuesta: estado de labs, EFs, marcas, agentes y jobs de Ayra — actualizado cada hora desde Supabase.

### 3.5 Cómo se usa

**Claude en sesión (protocolo actualización):** carga `ecosystem_graph.json` + `/api/ecosystem-health`. Puede reportar estado real de cada componente sin que Sam lo describa.

**Ayra en cada job (`contextLoader`):** carga el subgrafo relevante para el job en curso + memoria L1/L2/L4 de esa marca. El grafo define el perímetro de lo que Ayra puede tocar antes de actuar.

---

## 4. COMPONENTE 2 — AYRA CORE (ORQUESTADOR AUTÓNOMO)

### 4.1 Repositorio propio

```
Repo:     unrealvillestudio-hub/unrlvl-ayra   (nuevo — privado)
Vercel:   proyecto unrlvl-ayra
URL:      ayra.unrealvillestudio.com
AI:       Claude Sonnet 4 en todas las invocaciones internas
```

El Orchestrator existente (OR_1.1) es una herramienta del ecosistema que Ayra puede invocar — no vive dentro de ella. Ayra puede tener jobs sobre el propio Orchestrator: detectar si está caído, triggear flows, reportar su estado.

### 4.2 Estructura del repo

```
unrlvl-ayra/
│
├── api/
│   ├── ayra-cron.ts          ← Motor de todos los jobs programados
│   ├── ayra-trigger.ts       ← Trigger manual desde chat o dashboard
│   ├── ayra-status.ts        ← Estado actual para dashboard
│   ├── ecosystem-health.ts   ← Sirve desde ayra.system_health
│   ├── simulator.ts          ← Simulator Agents endpoint
│   └── digest-send.ts        ← Entrega de digest (WhatsApp/email)
│
├── lib/
│   ├── contextLoader.ts      ← Carga grafo + health + memoria antes de cada job
│   ├── decisionEngine.ts     ← AUTONOMOUS / NOTIFY / ESCALATE
│   ├── jobRunner.ts          ← Ejecuta jobs contra labs, proxies, EFs, agentes
│   ├── memoryManager.ts      ← Lee/escribe L1-L4. Promueve capas.
│   ├── patternExtractor.ts   ← Detecta patrones para L4 (Claude-powered)
│   ├── digestBuilder.ts      ← Genera Daily Digest desde Supabase
│   ├── notifier.ts           ← Entrega por canal (WhatsApp / email)
│   └── supabase.ts           ← Cliente Supabase (schema ayra.*)
│
├── src/                      ← Dashboard React
│   └── modules/
│       ├── EcosystemMap/     ← Visualización grafo + health realtime
│       ├── JobMonitor/       ← Jobs activos, historial, errores
│       ├── DecisionQueue/    ← Decisiones pendientes de Sam
│       ├── MemoryExplorer/   ← L1/L2/L3/L4 navegables (admin only)
│       ├── Simulators/       ← UI para correr simulaciones
│       ├── SignalPanel/      ← Datos SignalLab por marca (cuando activo)
│       └── BrandView/        ← Vista cliente por marca (rol restringido)
│
├── vercel.json               ← Cron schedule
└── README.md
```

### 4.3 Cron Schedule

```json
{
  "crons": [
    { "path": "/api/ayra-cron?job=health_update",      "schedule": "0 * * * *"   },
    { "path": "/api/ayra-cron?job=lab_ping",           "schedule": "0 */2 * * *" },
    { "path": "/api/ayra-cron?job=shopify_audit",      "schedule": "0 6 * * *"   },
    { "path": "/api/ayra-cron?job=social_export",      "schedule": "0 7 * * *"   },
    { "path": "/api/ayra-cron?job=signal_fetch",       "schedule": "0 8 * * *"   },
    { "path": "/api/ayra-cron?job=daily_digest",       "schedule": "0 11 * * *"  },
    { "path": "/api/ayra-cron?job=memory_promote_l1",  "schedule": "0 0 * * 0"   },
    { "path": "/api/ayra-cron?job=memory_promote_l2",  "schedule": "0 0 1 * *"   },
    { "path": "/api/ayra-cron?job=pattern_extract",    "schedule": "0 1 * * 0"   }
  ]
}
```

_(Horarios UTC. 11:00 UTC = 7:00am ET)_

### 4.4 Job Lifecycle

```
TRIGGER (cron / evento Supabase / Sam manual / Ayra interna)
    │
    ▼
contextLoader()
  ├── ecosystem_graph.json       (estático)
  ├── ecosystem-health EP        (live desde ayra.system_health)
  ├── memory L1                  (últimos 7d relevantes a job + marca)
  ├── memory L2                  (últimas 4 semanas relevantes)
  ├── memory L4                  (patrones aplicables a este job)
  └── brand context              (BP de la marca si aplica)
    │
    ▼
Claude API — analiza contexto, determina acción óptima
    │
    ▼
decisionEngine()
  ├── Consulta ayra.decision_framework
  ├── Determina: AUTONOMOUS / NOTIFY / ESCALATE
  └── Verifica L4: ¿hay patrón que modifique la decisión?
    │
    ├── AUTONOMOUS ──► jobRunner()
    │                      ├── Ejecuta (proxy / lab / EF / agente)
    │                      ├── Escribe en ayra.jobs + ayra.log
    │                      └── memoryManager.write(L1, type: operational)
    │
    ├── NOTIFY ──► ayra.decisions (status: pending)
    │              Dashboard: alerta visual
    │              Incluye en próximo Daily Digest
    │              notifier() si prioridad = critical
    │
    └── ESCALATE ──► ayra.decisions (prioridad: high/critical)
                     notifier() inmediato a Sam
                     Dashboard: alerta prominente
```

### 4.5 Jobs autónomos v1

| Job | Trigger | Acción |
|-----|---------|--------|
| `health_update` | Cron 1h | Ping labs + EFs, escribe system_health |
| `lab_ping` | Cron 2h | GET /health a cada lab endpoint activo |
| `shopify_audit` | Cron 6am | audit-proxy por cada tienda activa |
| `social_export` | Cron 7am | Procesa raw_log Social Media Agent |
| `signal_fetch` | Cron 8am | GET SignalLab cuando activo por marca |
| `seo_fix_empty` | Post-audit trigger | fix-proxy: titles/descriptions vacíos |
| `compliance_scan` | Cron diario | Escanea claims vs compliance_rules |
| `content_publish` | Post-aprobación | Publica en SocialLab si status=approved |

### 4.6 Nunca autónomo

Precios · Añadir/eliminar productos · Deploy de código · Modificar themes · Crear campañas · Modificar env variables · Credenciales de cliente · Acciones irreversibles sin backup.

---

## 5. COMPONENTE 3 — MEMORIA EN CAPAS

### 5.1 Las cuatro capas

```
╔══════════════╦════════════╦══════════════════╦════════════════════════════╗
║  CAPA        ║ VENTANA    ║ GRANULARIDAD      ║ PROPÓSITO                  ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L1 — HOT     ║ 0–7 días   ║ Full fidelity     ║ Memoria de trabajo.        ║
║              ║            ║ Cada evento       ║ Ayra sabe qué pasó         ║
║              ║            ║                   ║ esta semana.               ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L2 — WARM    ║ 7–30 días  ║ Resumen semanal   ║ Ciclo de campaña.          ║
║              ║            ║ Claude-compressed  ║ 4 semanas = 1 ciclo        ║
║              ║            ║                   ║ completo de cliente.       ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L3 — COLD    ║ 30d+       ║ Resumen mensual   ║ Histórico permanente.      ║
║              ║            ║ Flat append-only  ║ Alinea con cierres         ║
║              ║            ║                   ║ mensuales de campaña.      ║
╠══════════════╬════════════╬══════════════════╬════════════════════════════╣
║ L4 — PATTERNS║ Sin tiempo ║ Condicionales     ║ Inteligencia aprendida.    ║
║              ║            ║ con confianza 0-1 ║ Extraída de L1→L3 por      ║
║              ║            ║                   ║ Claude. Nunca se purga.    ║
╚══════════════╩════════════╩══════════════════╩════════════════════════════╝
```

### 5.2 Tipos de entrada de memoria

| `memory_type` | Qué registra | Capas |
|---------------|-------------|-------|
| `operational` | Job ejecutado, resultado, duración, tokens | L1, L2, L3 |
| `decision` | Elección de Sam sobre una escalada | L1, L2, L3 |
| `brand_state` | Estado acumulado de marca (score trend, blockers) | L1, L2, L3 |
| `anomaly` | Evento anómalo detectado | L1, L2, L3 |
| `failure` | Error + resolución si ocurrió | L1, L2, L3 |
| `signal` | Performance externo de SignalLab (cuando activo) | L1, L2, L3 |
| `pattern` | Comportamiento aprendido con nivel de confianza | L4 exclusivo |

### 5.3 Promoción entre capas (inteligente, no mecánica)

**L1 → L2 cada domingo 00:00 UTC**
Claude lee L1 de los últimos 7 días. Genera resumen estructurado por marca + tipo. Identifica señales de patrón. Escribe en L2. Pasa señales a `patternExtractor`. Marca L1 como promovido (no borra — conserva para auditoría).

**L2 → L3 el día 1 de cada mes 00:30 UTC**
Claude lee L2 del mes anterior (4 semanas). Genera el resumen mensual: logros, issues resueltos, issues abiertos, tendencias, tokens, decisions tomadas. Escribe en L3 append-only. Genera `monthly_report_{YYYY-MM}.md` disponible en dashboard. Alinea con ciclo de cierre de campañas.

**Extracción de patrones → L4 cada domingo 01:00 UTC**
`patternExtractor` analiza L1 + L2 de las últimas 4 semanas. Busca repeticiones, correlaciones, respuestas de Sam. Para cada patrón con confianza ≥ 0.65: si existe en L4, actualiza confianza; si es nuevo, crea entrada. Notifica a Sam si el patrón es crítico.

**La compresión es inteligente:** un bug resuelto se comprime; un patrón recurrente se extrae a L4 antes de comprimir; una decisión de Sam que establece precedente se conserva y se marca para L4.

### 5.4 Ejemplo de patrón L4

```json
{
  "id": "pat_nscf_001",
  "title": "Score NeuroneSCF baja lunes → theme update el viernes anterior",
  "condition": "brand=NeuroneSCF AND job=shopify_audit AND score_drop>8 AND day=Monday",
  "hypothesis": "Updates de theme del viernes rompen settings SEO que el audit detecta el lunes.",
  "recommended_action": "Antes de audit lunes: verificar si hubo theme update viernes previo.",
  "confidence": 0.78,
  "observed_count": 3,
  "applies_to": ["shopify_audit", "seo_fix_empty"],
  "brand_id": "NeuroneSCF",
  "sam_confirmed": false
}
```

### 5.5 Interacción de Sam con L4 (Memory Explorer en dashboard)

- **Confirmar** patrón → confianza = 1.0, Ayra lo trata como regla fija.
- **Descartar** → confianza = 0, Ayra deja de aplicarlo.
- **Editar** acción recomendada → Ayra actualiza su comportamiento.
- Ayra notifica a Sam cada vez que un patrón nuevo supera confianza 0.75.

---

## 6. COMPONENTE 4 — DECISION FRAMEWORK

### 6.1 Principio

El Decision Framework es el contrato explícito entre Sam y Ayra. Almacenado en `ayra.decision_framework` en Supabase. Versionado. Editable desde el dashboard. Ayra lo ejecuta literalmente — la interpretación de casos ambiguos es responsabilidad de Claude en sesión.

### 6.2 Framework v1.0

| Categoría | Acción | Autonomía | Condición |
|-----------|--------|-----------|-----------|
| **SEO** | Fix title vacío o < 10 chars | ✅ AUTÓNOMO | Solo null o claramente roto |
| **SEO** | Fix description vacía | ✅ AUTÓNOMO | Solo null o < 20 chars |
| **SEO** | Reescribir title existente | ❌ ESCALA | Siempre revisión humana |
| **Precios** | Detectar precio $0.00 | ⚠️ NOTIFICA | Alerta inmediata, no toca |
| **Precios** | Cualquier cambio de precio | ❌ ESCALA | Nunca autónomo |
| **Shopify** | Ejecutar audit diario | ✅ AUTÓNOMO | Cron 6am, todas las tiendas |
| **Shopify** | Fix compliance claim conocido | ✅ AUTÓNOMO | Solo claims en lista negra probada |
| **Shopify** | Modificar theme | ❌ ESCALA | Siempre revisión humana |
| **Shopify** | Añadir / eliminar producto | ❌ ESCALA | Siempre revisión humana |
| **Imágenes** | Detectar producto sin imagen | ⚠️ NOTIFICA | Alerta en digest |
| **Imágenes** | Subir o modificar imagen | ❌ ESCALA | Sam decide |
| **Contenido** | Publicar post status=approved | ✅ AUTÓNOMO | Requiere SocialLab deploy |
| **Contenido** | Crear nuevo contenido | ❌ ESCALA | Requiere brief de Sam |
| **Labs** | Ping de salud cada 2h | ✅ AUTÓNOMO | Siempre |
| **Labs** | Reiniciar o redeploy | ❌ ESCALA | Requiere autorización |
| **Infra** | Deploy de código | ❌ ESCALA | Nunca autónomo |
| **Infra** | Modificar env variables | ❌ ESCALA | Nunca autónomo |
| **Campañas** | Detectar quema de budget | ⚠️ NOTIFICA + pausa 30min | Pausa si Sam no responde |
| **Campañas** | Crear o modificar campaña | ❌ ESCALA | Requiere brief aprobado |
| **Memoria** | Escribir L1, L2, L3, L4 | ✅ AUTÓNOMO | Siempre — operación interna |
| **Memoria** | Confirmar / descartar patrón L4 | ⚠️ NOTIFICA | Sam confirma desde dashboard |
| **Compute** | Tokens > $5/semana | ⚠️ NOTIFICA | Threshold v1, configurable |
| **Signal** | Fetch datos SignalLab | ✅ AUTÓNOMO | Cuando lab activo para esa marca |
| **Signal** | Aplicar rewrite de copy sugerido | ⚠️ NOTIFICA | Sam aprueba antes de publicar |

---

## 7. COMPONENTE 5 — LIVE DASHBOARD

### 7.1 Descripción

React app en `ayra.unrealvillestudio.com/dashboard`. Lectura en tiempo real via Supabase Realtime. Auth token-based con roles: `admin` (Sam — ve todo), `brand_manager` (equipo UNRLVL), `client` (solo su marca).

### 7.2 Layout vista admin (Sam)

```
╔══════════════════════════════════════════════════════════════════════╗
║  AYRA DASHBOARD                              Dom 05 Jun · 07:02am   ║
╠══════════════════════════════════════════════════════════════════════╣
║  ECOSYSTEM HEALTH                                                    ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ ║
║  │ Labs     │  │ EFs      │  │ Brands   │  │ Ayra jobs hoy        │ ║
║  │ 7/9 ✅   │  │ 16/17 ✅ │  │🟢🟢🟡🟢 │  │ 8 done · 0 err      │ ║
║  │ imagelab │  │ translate│  │          │  │ 0 running · 2 queued │ ║
║  │ ⚠️ bug   │  │ 🔴 bug   │  │          │  │                      │ ║
║  └──────────┘  └──────────┘  └──────────┘  └──────────────────────┘ ║
║                                                                      ║
║  PENDING DECISIONS (requieren Sam)                    2 pendientes  ║
║  ┌──────────────────────────────────────────────────────────────┐   ║
║  │ 🔴 NeuroneSCF: auto-translate bug 31d abierto               │   ║
║  │    ¿Autorizo investigar fix?  [Sí] [No] [Ver contexto]      │   ║
║  │                                                              │   ║
║  │ ⚠️ ImageLab: 3 fallos consecutivos                          │   ║
║  │    ¿Investigar o esperar sesión?  [Investigar] [Esperar]    │   ║
║  └──────────────────────────────────────────────────────────────┘   ║
║                                                                      ║
║  LAST 24H ACTIVITY              ECOSYSTEM MAP                        ║
║  ✅ shopify_audit NSCF B2C      [Grafo visual nodos                  ║
║     Score: 157/200 (+3)          con estado en tiempo real]          ║
║  ✅ shopify_audit NSCF B2B                                           ║
║     Score: 133/160 (=)          SIGNAL (por marca)                  ║
║  ✅ social_export: 3 sessions   NeuroneSCF: ⏳ tracking pendiente   ║
║  ⚠️ imagelab: timeout x3        ForumPHs: N/A                       ║
║                                                                      ║
║  [Simulators]  [Memory Explorer]  [Brands]  [Digests]  [Patterns]  ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 7.3 Vista cliente

- Score Shopify actual + trend 30 días
- Últimas 10 acciones de Ayra sobre su cuenta
- Pendientes que requieren acción del cliente
- Historial de simulaciones de su marca
- Sección Signal cuando activo

### 7.4 Ecosystem Map

Visualización D3/Cytoscape del `ecosystem_graph.json` + health live. Nodos coloreados por estado (verde/amarillo/rojo). Click en nodo: status, última actividad, blockers, jobs relacionados. Esta es la materialización visual del Mapa Mental.

---

## 8. COMPONENTE 6 — DAILY DIGEST

### 8.1 Mecánica

Cron 11:00 UTC (7:00am ET). `digestBuilder` consulta Supabase (ayra.jobs, ayra.decisions, ayra.log, system_health) del período anterior. Claude genera el digest como informe ejecutivo. Se escribe en dashboard. Se entrega por canal.

### 8.2 Estructura

```markdown
## AYRA DAILY DIGEST — Lun 09 Jun 2026 · 07:00am ET

**HICE ESTO:**
- ✅ Audit NeuroneSCF B2C: 157/200 (+3). Mejora sostenida 3ª semana.
- ✅ Fix SEO: 2 titles vacíos corregidos (Kerasin HB, Humit Moisture Mask).
- ✅ Social Agent: 3 sesiones procesadas. PO completó paso 6 de infraestructura.
- ✅ Health: todos los sistemas OK excepto ImageLab.

**ENCONTRÉ:**
- ⚠️ ImageLab: timeout 3 veces consecutivas desde el viernes.
- ℹ️ NeuroneSCF B2C: 4 kits aún sin imagen (~8pts de score bloqueados).
- 🔴 auto-translate: bug abierto 31 días — 42 descripciones EN bloqueadas.

**NECESITO TU DECISIÓN:**
1. ¿Autorizo investigar auto-translate bug? (~2-3h sesión con Claude)
2. ¿Investigamos ImageLab timeout o esperas sesión?

**SISTEMA:** Jobs: 8 · Errores: 1 · Tokens: ~$0.19 · Score NeuroneSCF: ↑ tendencia

[Dashboard] [Responder decisiones]
---
*Ayra · Unreal>ille Studio · Próximo digest mañana 07:00am*
```

### 8.3 Sección Signal (cuando activo por marca)

```markdown
**SIGNAL — NeuroneSCF:**
- Meta Ads: CTR 2.1% (+0.3% vs semana anterior). Kit Kerasin lidera.
- ROAS semana: 3.2x. Dentro del objetivo.
- ⚠️ TikTok: alcance -18% en reels de producto. Ver SignalPanel.
```

### 8.4 Canal de entrega

| Fase | Canal | Prerequisito |
|------|-------|-------------|
| v1 Sprint 3 | Dashboard | Deploy Ayra |
| v2 | Email Sam | `notifier.ts` email setup |
| v3 | WhatsApp Sam | WABA número UNRLVL dedicado |

---

## 9. COMPONENTE 7 — SIMULATOR AGENTS

### 9.1 Propósito

Agentes Claude especializados que producen análisis estructurado de impacto y predicciones dado el contexto de una marca + escenario. Accesibles desde dashboard y desde Claude en sesión.

**Endpoint:** `POST https://unrlvl-ayra.vercel.app/api/simulator`

### 9.2 Fase 1 — Deterministas (sin historial — desde Sprint 4)

| Simulador | Input | Confianza base |
|-----------|-------|---------------|
| `margin_calculator` | Catálogo + precios + costos | Alta (cálculo puro) |
| `campaign_budget` | Marca + objetivo + budget + benchmarks industria | Media |
| `onboarding_readiness` | Brand context completo | Alta (análisis estructural) |
| `content_calendar` | Marca + plataformas + objetivos | Media |
| `ecosystem_impact` | Cambio propuesto en el stack | Alta (análisis de grafo) |
| `lab_dependency` | Tarea objetivo | Alta (análisis de grafo) |

### 9.3 Fase 2 — Calibrados (cuando SignalLab tiene 60+ días de datos por marca)

| Simulador | Qué añade |
|-----------|----------|
| `campaign_performance` | ROAS predictivo con intervalo de confianza real |
| `conversion_optimizer` | CRO con impacto estimado desde datos propios |
| `content_impact` | Predicción alcance/conversión por tipo de contenido |
| `budget_optimizer` | Distribución óptima cross-canal basada en historial |

### 9.4 Respuesta tipo

```typescript
interface SimulatorResponse {
  simulator_type: string;
  brand_id: string;
  confidence: number;                    // 0-1
  data_source: 'deterministic' | 'industry_benchmarks' | 'signal_calibrated';
  predictions: { metric: string; value: number | string; range?: [number, number] }[];
  recommendations: { priority: 'critical'|'high'|'medium'; action: string; expected_impact: string }[];
  assumptions: string[];
  limitations: string[];
  signal_data_available: boolean;
  signal_data_days?: number;
}
```

### 9.5 Flujo en sesión con Claude

```
Sam: "Simula qué pasa si bajo los kits punta de $89 a $79"
    │
    ▼
Claude llama /api/simulator
  { type: "margin_calculator", brand_id: "NeuroneSCF",
    scenario: { sku_group: "kits_punta", price_change: -10 } }
    │
    ▼
Simulador carga catálogo NeuroneSCF (BluePrints + Supabase)
Calcula márgenes actuales vs propuestos
Analiza impacto en revenue, margen bruto, AOV
    │
    ▼
Claude interpreta + genera recomendación ejecutiva para Sam
Escribe en ayra.simulations para referencia futura
```

---

## 10. COMPONENTE 8 — SIGNALLAB

### 10.1 Qué es SignalLab y qué NO es

**SignalLab es inteligencia de performance externo:** lo que el mercado respondió a las acciones de cada cliente. Meta Ads API, GA4, TikTok Ads, Shopify Analytics. Analiza qué funcionó. Propone o aplica (con aprobación) rewrites de copy, ajustes de creative brief, optimizaciones de campaña. Tiene capacidad de mejora continua activa.

**NO es la Memoria de Ayra.** La Memoria L1-L4 registra operaciones internas de UNRLVL. SignalLab registra la respuesta del mercado a esas operaciones. Son capas distintas y complementarias que se potencian mutuamente.

```
Ayra Memory (L1-L4)         SignalLab
══════════════════          ══════════════════
"Corrimos audit B2C"  +     "CTR del creativo A fue 2.3%"
"Fix SEO aplicado"    +     "Conversión subió 8% post-fix"
"Publicamos post X"   +     "Post X generó 4x engagement normal"
        │                           │
        └──────────────┬────────────┘
                       │
                  DAILY DIGEST
              + SIMULADORES FASE 2
```

### 10.2 Posición en el ecosistema

```
SignalLab es un lab autónomo. Ayra lo consume como fuente de datos.

SignalLab → /api/signal-data → Ayra Core (job signal_fetch, cron 8am)
                                    │
                          ┌─────────┴──────────┐
                          │                    │
                   Daily Digest         Simuladores Fase 2
                (sección Signal)       (datos reales de marca)
                          │
                    Memory L1 (type: signal)
                    → L2 semanal → L3 mensual
                    → L4 patrones de correlación contenido→conversión
```

### 10.3 Activación por cliente (no bloquea Ayra v1)

SignalLab se activa cliente por cliente cuando ese cliente tiene:
- Pixels instalados y verificados (Meta, TikTok, Google)
- Mínimo 30 días de datos acumulados
- Cuentas de ads conectadas (OAuth por plataforma)

Orden esperado de activación: NeuroneSCF primero (cuando tracking esté listo), luego cada cliente nuevo onboarded con tracking desde día 1.

### 10.4 Lo que SignalLab añade cuando está activo

| Área | Sin SignalLab | Con SignalLab activo |
|------|--------------|---------------------|
| Simuladores | Benchmarks industria (~0.6 confianza) | Datos propios calibrados (~0.85) |
| Digest | Sin sección de campaign performance | Sección Signal con ROAS, CTR, tendencias |
| Memoria L4 | Patrones operacionales | + Patrones contenido→conversión |
| Autonomía | Escala siempre lo de campaña | Detecta anomalías y notifica proactivamente |

---

## 11. DATA MODEL — SUPABASE

### 11.1 Schema `ayra` — tablas nuevas

```sql
-- Estado de todos los componentes del ecosistema
CREATE TABLE ayra.system_health (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_type  TEXT NOT NULL,  -- 'lab'|'ef'|'agent'|'brand'|'proxy'
  component_id    TEXT NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('ok','warning','error','unknown')),
  detail          TEXT,
  metadata        JSONB,
  last_checked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (component_type, component_id)
);

-- Historial de ejecución de todos los jobs
CREATE TABLE ayra.jobs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type     TEXT NOT NULL,
  brand_id     TEXT,
  status       TEXT NOT NULL CHECK (status IN ('queued','running','completed','failed','skipped')),
  trigger      TEXT NOT NULL,  -- 'cron'|'manual'|'event'|'ayra'
  input        JSONB,
  output       JSONB,
  error        TEXT,
  tokens_used  INTEGER,
  started_at   TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Decisiones pendientes de Sam
CREATE TABLE ayra.decisions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type         TEXT NOT NULL,  -- 'approval'|'choice'|'information'
  priority     TEXT NOT NULL CHECK (priority IN ('critical','high','medium','low')),
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  options      JSONB,
  context      JSONB,
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','resolved','dismissed')),
  resolved_by  TEXT,
  resolution   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  resolved_at  TIMESTAMPTZ
);

-- Audit trail completo
CREATE TABLE ayra.log (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id     UUID REFERENCES ayra.jobs(id),
  level      TEXT NOT NULL CHECK (level IN ('info','warning','error','success')),
  message    TEXT NOT NULL,
  brand_id   TEXT,
  component  TEXT,
  metadata   JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- El contrato de autonomía (editable por Sam)
CREATE TABLE ayra.decision_framework (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category              TEXT NOT NULL,
  action                TEXT NOT NULL,
  autonomy              TEXT NOT NULL CHECK (autonomy IN ('autonomous','notify','escalate')),
  condition_description TEXT,
  notify_window_minutes INTEGER,
  active                BOOLEAN DEFAULT true,
  version               TEXT DEFAULT '1.0',
  updated_by            TEXT DEFAULT 'sam',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- L1 — Hot Memory (0-7 días, full fidelity)
CREATE TABLE ayra.memory_hot (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id    TEXT,
  memory_type TEXT NOT NULL,  -- operational|decision|brand_state|anomaly|failure|signal
  title       TEXT NOT NULL,
  content     JSONB NOT NULL,
  promoted    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- L2 — Warm Memory (7-30 días, resumen semanal)
CREATE TABLE ayra.memory_warm (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id         TEXT,
  week_start       DATE NOT NULL,
  week_end         DATE NOT NULL,
  summary          TEXT NOT NULL,
  highlights       JSONB,
  pattern_signals  JSONB,
  promoted         BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- L3 — Cold Memory (30d+, mensual append-only)
CREATE TABLE ayra.memory_cold (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id   TEXT,
  month      TEXT NOT NULL,  -- 'YYYY-MM'
  summary    TEXT NOT NULL,
  metrics    JSONB,
  report_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- L4 — Patterns (sin tiempo, inteligencia aprendida)
CREATE TABLE ayra.memory_patterns (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title              TEXT NOT NULL,
  pattern_type       TEXT NOT NULL,  -- 'correlation'|'behavior'|'preference'|'anomaly'
  condition_text     TEXT NOT NULL,
  hypothesis         TEXT NOT NULL,
  recommended_action TEXT NOT NULL,
  confidence         DECIMAL(3,2) NOT NULL CHECK (confidence BETWEEN 0 AND 1),
  observed_count     INTEGER DEFAULT 1,
  applies_to         TEXT[],
  brand_id           TEXT,
  sam_confirmed      BOOLEAN DEFAULT false,
  sam_dismissed      BOOLEAN DEFAULT false,
  first_detected     TIMESTAMPTZ DEFAULT NOW(),
  last_updated       TIMESTAMPTZ DEFAULT NOW()
);

-- Historial de simulaciones
CREATE TABLE ayra.simulations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  simulator_type TEXT NOT NULL,
  brand_id       TEXT NOT NULL,
  input          JSONB NOT NULL,
  output         JSONB NOT NULL,
  confidence     DECIMAL(3,2),
  data_source    TEXT,
  created_by     TEXT DEFAULT 'sam',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.2 Tablas existentes que Ayra lee (sin modificar schema)

| Tabla | Schema | Uso |
|-------|--------|-----|
| `brands` | public | Contexto de marca para jobs |
| `lab_configs` | public | Endpoints de labs para jobRunner |
| `humanize_profiles` | public | Voz de marca para jobs de contenido |
| `compliance_rules` | public | Reglas para compliance_scan |
| `shopify_stores` | shopify | Credenciales tiendas para jobs Shopify |

---

## 12. PLAN DE EJECUCIÓN

### SPRINT 0 — PREREQUISITOS (antes del 5 Jun)

**Decisiones de Sam:**

| Prioridad | Decisión | Recomendación |
|-----------|----------|--------------|
| 🔴 Alta | Dominio dashboard | `ayra.unrealvillestudio.com` |
| 🔴 Alta | Canal notificación v1 | Email (más rápido de implementar) |
| 🟡 Media | Primer cliente externo en dashboard | ForumPHs (más simple) |
| 🟡 Media | Threshold compute semanal | $5/semana (ajustable) |

**Acciones técnicas antes del 5 Jun:**
- [ ] Crear repo `unrealvillestudio-hub/unrlvl-ayra` (privado)
- [ ] Crear proyecto Vercel `unrlvl-ayra`, conectar al repo
- [ ] Configurar dominio `ayra.unrealvillestudio.com` en DNS + Vercel
- [ ] `CREATE SCHEMA ayra;` en Supabase `amlvyycfepwhiindxgzw`
- [ ] Env vars en Vercel: `AYRA_HEALTH_SECRET`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
- [ ] Commit de este archivo: `protocols/AYRA_MASTER_PLAN.md` en `unrlvl-context`

---

### SPRINT 1 — FUNDACIÓN: AYRA TIENE OJOS (5–15 Jun)

**Objetivo:** Ayra puede ver el estado real del ecosistema. Claude puede cargarlo en sesión.

- [ ] Supabase: schema `ayra` + 9 tablas creadas y migradas
- [ ] `ecosystem_graph.json` v1.0 → commit `unrlvl-context/ecosystem_graph.json`
- [ ] `api/ecosystem-health.ts` → deployado, sirve desde `ayra.system_health`
- [ ] `lib/contextLoader.ts` v1 → carga grafo + health
- [ ] Job `health_update` → cron 1h, escribe `ayra.system_health`
- [ ] Job `lab_ping` → cron 2h, verifica endpoints activos
- [ ] `ayra.decision_framework` seed → 24 reglas v1.0 insertadas
- [ ] Dashboard v0.1 → pantalla de health (solo lectura)
- [ ] Protocolo Claude actualizado: carga `ecosystem_graph.json` + health en apertura

**Validación:** Claude reporta estado de cada lab sin que Sam lo describa. Dashboard muestra health actualizado < 1h.

---

### SPRINT 2 — AYRA TRABAJA: PRIMEROS JOBS (16–30 Jun)

**Objetivo:** Ayra ejecuta sus primeros 5 jobs autónomos sin intervención de Sam.

- [ ] `lib/jobRunner.ts` → integra Tools proxies + Shopify MCP
- [ ] `lib/decisionEngine.ts` → consulta `ayra.decision_framework`
- [ ] `lib/memoryManager.ts` v1 → escritura + lectura en L1
- [ ] Job `shopify_audit` → cron 6am, audit-proxy por tienda
- [ ] Job `social_export` → cron 7am, procesa raw_log Social Media Agent
- [ ] Job `seo_fix_empty` → triggereable post-audit si hay títulos vacíos
- [ ] `api/ayra-trigger.ts` → trigger manual desde chat de Sam
- [ ] `ayra.decisions` activo → Ayra escala issues detectados
- [ ] Dashboard v0.2 → jobs 24h + decisions pending + badge contador

**Validación:** Ayra corre audit NeuroneSCF sin instrucción de Sam. Issues en `ayra.decisions` antes de que Sam los reporte.

---

### SPRINT 3 — DAILY DIGEST: AYRA REPORTA (1–14 Jul)

**Objetivo:** Sam recibe informe diario automático. "¿Cómo va?" tiene respuesta inmediata.

- [ ] `lib/digestBuilder.ts` → markdown estructurado desde Supabase
- [ ] Job `daily_digest` → cron 7am ET, genera + escribe
- [ ] `lib/notifier.ts` v1 → email setup
- [ ] Dashboard: sección "Digests" con historial navegable
- [ ] Comando en sesión: "Ayra estado" → Claude carga health + decisions + digest
- [ ] Auth dashboard v1: tokens con roles admin + brand_manager
- [ ] `contextLoader.ts` v2 → incluye lectura de L1 en cada job

**Validación:** Sam recibe digest antes de las 7:05am. Incluye: hice / encontré / decido.

---

### SPRINT 4 — SIMULADORES FASE 1 (15–31 Jul)

**Objetivo:** Ayra puede simular escenarios. "¿Qué pasa si...?" en < 30s.

- [ ] `api/simulator.ts` → endpoint deployado con routing por tipo
- [ ] 6 simuladores Fase 1 implementados y testeados
- [ ] Dashboard: panel Simulators con UI + historial de resultados
- [ ] Claude en sesión: llama simuladores y presenta resultado a Sam
- [ ] `ayra.simulations` activo → historial completo

**Validación:** "Simula campaña Meta $500 NeuroneSCF" → análisis ejecutivo en < 30s con supuestos y limitaciones visibles.

---

### SPRINT 5 — MEMORIA & AUTONOMÍA EXPANDIDA (1–31 Ago)

**Objetivo:** Ayra aprende. Ejecuta más jobs sin intervención. Dashboard listo para cliente.

- [ ] `memoryManager.ts` v3 → promoción L1→L2 (cron dominical)
- [ ] `memoryManager.ts` v4 → promoción L2→L3 (cron día 1 del mes)
- [ ] `patternExtractor.ts` → extracción L4 (cron dominical post-L1→L2)
- [ ] Dashboard: Memory Explorer (L1/L2/L3 navegables, L4 confirm/dismiss)
- [ ] Job `compliance_scan` → autónomo por marca
- [ ] Job `content_publish` → si SocialLab deployado
- [ ] Decision Framework v1.1 → refinado con 30 días de uso real
- [ ] Auth dashboard v2 → rol `client` con vista de marca propia
- [ ] Pilot cliente (ForumPHs o NeuroneSCF) con vista restringida
- [ ] `ecosystem_graph.json` v1.1 → actualizado con nuevas conexiones
- [ ] Signal Panel → placeholder con status SignalLab por marca

**Validación:** L4 tiene ≥ 1 patrón con confianza > 0.65. Un cliente puede ver su dashboard. Sam puede confirmar/descartar un patrón.

---

### MILESTONE — 31 AGOSTO 2026: AYRA v1.0

```
✅ Monitoreo 24/7 del ecosistema completo
✅ 7+ jobs autónomos en cron
✅ Dashboard live multimarca con auth por roles
✅ Daily Digest automático a las 7am ET
✅ 6 simuladores Fase 1 operativos
✅ Decision Framework activo con audit trail
✅ Memoria L1 + L2 + L4 funcionando
✅ ≥ 1 patrón L4 detectado y validado
✅ 1 cliente con vista propia en dashboard

Pendiente v2 (Sep–Dic 2026):
  → L3 activo (primer mes completo en octubre)
  → SignalLab NeuroneSCF (cuando tracking esté ok)
  → Simuladores Fase 2 calibrados
  → Digest por WhatsApp cuando WABA UNRLVL activo
  → Dashboard white-label para clientes externos
```

---

## 13. STACK TÉCNICO & ESTRUCTURA DE REPO

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| AI engine | Claude Sonnet 4 (`claude-sonnet-4-20250514`) | Toda Ayra corre en Claude. Consistencia total. |
| Runtime | Vercel Serverless + Vercel Cron | Stack existente del ecosistema. |
| DB | Supabase `amlvyycfepwhiindxgzw` | Ya existe. Schema `ayra` es aditivo. |
| Realtime | Supabase Realtime (websockets) | Dashboard live sin polling. |
| Frontend | React 18 + TypeScript + Vite + Tailwind | Stack del ecosistema. |
| Charts | Recharts | Ya en AgentLab y unrlvl-ops. |
| Graph viz | D3.js o Cytoscape.js | Para EcosystemMap visual interactivo. |
| Notificaciones | Email v1 → WABA v2 | WABA cuando número UNRLVL dedicado activo. |
| Auth | Token-based (patrón Social Media Agent) | Consistencia. Sin OAuth complejo en v1. |
| Estado persistente | Supabase `ayra.*` | KV es solo del Social Media Agent — no compartir. |

---

## 14. PROTOCOLO DE REANUDACIÓN DE SESIÓN

Cuando Sam indique trabajo sobre Ayra, Claude ejecuta en este orden:

```
1. Vercel:web_fetch_vercel_url
   → https://unrlvl-context.vercel.app/protocols/AYRA_MASTER_PLAN.md

2. Vercel:web_fetch_vercel_url
   → https://unrlvl-context.vercel.app/ecosystem.json

3. Vercel:web_fetch_vercel_url
   → https://unrlvl-context.vercel.app/ecosystem_graph.json
     (cuando exista — post Sprint 1)

4. Vercel:web_fetch_vercel_url
   → https://unrlvl-ayra.vercel.app/api/ecosystem-health
     (cuando esté deployado — post Sprint 1)

5. Verificar sprint actual vs plan. Último entregable completado.
   Decisiones pendientes de Sam.

6. Confirmar a Sam:
   "Cargado. Estamos en Sprint X. Último completado: [Y].
    Próximo: [Z]. ¿Arrancamos?"
```

**Archivos de contexto Ayra en `unrlvl-context`:**
```
protocols/
  AYRA_MASTER_PLAN.md          ← este archivo (siempre cargar primero)
  AYRA_DECISION_FRAMEWORK.md   ← detalle operacional del framework (Sprint 1)
  AYRA_SPRINT_LOG.md           ← registro de avance por sprint (desde Sprint 1)

ecosystem_graph.json            ← raíz del repo (Sprint 1)
```

---

## 15. PREREQUISITOS ANTES DEL 5 DE JUNIO

### Decisiones de Sam (sin código requerido)

| Prioridad | Decisión | Recomendación |
|-----------|----------|--------------|
| 🔴 Alta | Dominio del dashboard | `ayra.unrealvillestudio.com` |
| 🔴 Alta | Canal notificación v1 | Email (implementación más directa) |
| 🟡 Media | Primer cliente externo (Agosto) | ForumPHs (más sencillo de onboardear) |
| 🟡 Media | Threshold compute semanal | $5/semana — ajustable post Sprint 2 |

### Acciones técnicas (Sam + Claude en una sesión de ~30min)

- [ ] Crear repo `unrealvillestudio-hub/unrlvl-ayra` (privado) en GitHub
- [ ] Crear proyecto Vercel `unrlvl-ayra` → conectar al repo → configurar dominio
- [ ] Ejecutar `CREATE SCHEMA ayra;` en Supabase principal
- [ ] Añadir env vars en Vercel: `AYRA_HEALTH_SECRET`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
- [ ] Commit este archivo: `protocols/AYRA_MASTER_PLAN.md` en `unrlvl-context`

### Tracking pixels (no bloquea Ayra v1 — pero cada día sin datos es un día menos de historial para Simuladores Fase 2)

- [ ] Meta pixel NeuroneSCF B2C: instalar antes de activar campañas activas
- [ ] Google Analytics 4: ídem
- [ ] TikTok pixel: ídem
- [ ] SignalLab repo: push con README de arquitectura aunque el código esté vacío

---

## 16. APÉNDICE — MAPA DE DEPENDENCIAS CRÍTICAS

```
[Sprint 1 — ecosystem_graph.json + health EP]
    └──► [Claude tiene mapa real en cada sesión desde el día 1]
              └──► [Calidad de análisis mejora inmediatamente]

[Sprint 2 — shopify_audit cron]
    └──► [Score actualizado diario sin Sam]
              └──► [seo_fix_empty autónomo]
                        └──► [Score NeuroneSCF mejora semana a semana]

[Sprint 3 — Daily Digest]
    └──► [Sam recibe informe 7am sin abrir chat]
              └──► [Visibilidad total del ecosistema desde el móvil]

[Sprint 5 — Memoria L4]
    └──► [Ayra detecta su primer patrón]
              └──► [Decisiones mejoran con el tiempo]
                        └──► [Autonomía se expande de forma controlada y auditable]

[Tracking pixels NeuroneSCF]
    └──► [SignalLab NeuroneSCF activo]
              └──► [Simuladores Fase 2 calibrados]
                        └──► [ROAS predictivo real]
                                  └──► [Autonomía parcial en campañas]

[shopify-auto-translate EF fix]
    └──► [42 descripciones EN completadas]
              └──► [Score B2C +~15pts]
                        └──► [Catálogo completo EN]

[SocialLab deploy]
    └──► [Job content_publish autónomo]
              └──► [Publicación de contenido aprobado sin intervención de Sam]

[WABA número UNRLVL dedicado]
    └──► [Daily Digest por WhatsApp]
              └──► [Visibilidad desde móvil sin abrir dashboard ni chat]
```

---

_AYRA_MASTER_PLAN.md · Unreal>ille Studio · v2.1 · 2026-05-10_
_Próxima revisión: cierre Sprint 1 → `protocols/AYRA_SPRINT_LOG.md`_
_Commit destino: `unrlvl-context/protocols/AYRA_MASTER_PLAN.md`_
