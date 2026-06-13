# AGENDA — Unrealville Studio
_Actualizada: 2026-06-13 · v2026-06-13-v1_

---

## 🟢 LISTO PARA EJECUTAR — Claude Code

| # | Item | Marca | Acción |
|---|---|---|---|
| 1 | **luciensael.com** — repo GREENFIELD + Vercel + DNS | Lucien Sael | `claudecode: repo + deploy + DNS` |
| 2 | **UNRLVL Field Notes** — push a CoreProject | UNRLVL | `claudecode: push blog` |

---

## 🔴 CRÍTICO — Esta semana

| # | Item | Marca | Blocker |
|---|---|---|---|
| 4 | **IID FIX** — regenerar seeds #7/#8/#14 con voz correcta (lucien_editorial v0.5 YA existe) | Lucien Sael | Desbloqueado — genoma existe desde 06-01 |
| 5 | **IID FIX** — re-test pipeline publicación (remover .limit(1), re-correr content-run-stage v22) | Lucien Sael | Depende de #4 |
| 6 | **Voice Genome Fase 5** — implementar en OnboardingApp (spec lista: VOICE_GENOME_PHASE_SPEC.md) | UNRLVL | Sin esto nuevas marcas no capturan voz editorial |
| 7 | **fphs-formalize sprint** — replicar calidad acta manual (98% Ivette). Comparar ACTA_No1-2026 vs ACTA_OR_1-2026 | ForumPHs | DF fragmenta intervenciones, 13 errores primera persona |
| 8 | **Verificar unidades Luxor 300** — si ≤127 unidades, regenerar acta con % correcto | ForumPHs | Acta actual usa 129 |
| 9 | **DF QA** — 3 votaciones faltantes + 13 errores primera persona | ForumPHs | Calidad acta |
| 10 | **Ayra Sprint 0** — ⚠️ VENCIDO (deadline 5 Jun) — crear repo + Vercel + schema + env vars | UNRLVL | Reprogramar urgente. Ver enfoque staging-loop abajo (Notas). |
| 11 | **NSCF Resend hardening** — key Resend de hardcoded → secret `RESEND_API_KEY` + ROTAR key + versionar `nscf-mailer` en repo (hoy deploy-only) | NeuroneSCF | Seguridad. No depende de nada. Hacer antes de Fase 3. |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 12 | **NSCF-Console Fase 3** — superuser console: roles por auth (embajadora PIN=B2C sin cambios; PO/superuser login fuerte=aprobaciones+vista B2B+inventarios ambas tiendas). Funciones sensibles nunca tras PIN. Auth Fase 2 ya diseñada para evolucionar a roles. NO depende de Shopify infra. | NeuroneSCF |
| 13 | **NSCF Sesión Shopify infra** — app dedicada de commerce (`write_customers`/`write_draft_orders`/`write_orders`) separada de `UNRLVL Auditor` + modelo multi-token en `shopify.stores` (hoy 1 token/(brand,store)). Desbloquea Fase 2.5 (automatizar creación customer al aprobar). SESIÓN DEDICADA — no mezclar con producto. | NeuroneSCF |
| 14 | **SocialLab dual-mode** — confirmar/implementar sync+async, re-test publicación post brand_id fix | UNRLVL |
| 15 | **Crear cuentas LinkedIn + X para Lucien** + **Meta(FB) + LinkedIn para SamPublisher** | Lucien Sael / SamPublisher |
| 16 | **Context System refactor** — SESIÓN DEDICADA (plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md). Adelgazar ecosystem.json + crear CAPABILITIES.md. RIESGO ALTO — hacer con foco. Modulariza archivos extensos → más caen en Ruta A del Actualiza. | UNRLVL |
| 17 | **VideoLab launch** — integrar Kling.ai token + grabaciones Patricia para voice genome | UNRLVL |
| 18 | **TikTok Pixel duplicado NSCF** — resolver antes de ads | NeuroneSCF |
| 19 | **Meta MCP** — fix fb_get_page_insights métricas deprecadas Graph API v21 | UNRLVL |
| 20 | **Portal Iván sprint 2** — dashboard pendientes + UPS API (developer.ups.com) | NeuroneSCF |
| 21 | **Klaviyo flows NSCF** — configurar 4 flows bilingüe en UI | NeuroneSCF |
| 22 | **Genoma UNRLVL social** — voz "we" con mismo modo vocería que sam_personal | UNRLVL |
| 23 | **SMA pulido (opcional)** — actualizar 4 hints viejos del front (App.tsx: Google Voice/WABA) por hints FPHs; opción agenda en portada sin escribir "hola"; decidir si reset.js queda permanente o se quita tras uso | ForumPHs |
| 24 | **Email marketing FPHs** — construir stack Resend + Supabase + Orchestrator (decisión tomada: NO Klaviyo para servicios). Diseñar disparo vía capa (endpoint/tabla eventos), NO hardcodeado, para que el CRM futuro se enchufe | ForumPHs |
| 25 | **ForumPHs — ejecución creación cuentas** — Ivette + Jesús siguen el SMA. Conseguir número panameño dedicado → activar WhatsApp Business → integrar ForumPHs Speaks | ForumPHs |
| 35 | **CLAUDE.md — completar repos restantes** — leyendo código real (un repo grande por tanda). Pendientes: AgentLab src/ orquestador completo, forumphs-speaks (index.html 284KB monolítico), WebLab, VoiceLab, VideoLab, SocialLab, BlueprintLab, OnboardingApp, CoreProject, DDMV-Assistant, unrlvl-ops, XMMs. Listos: unrlvl-context, Orchestrator, CopyLab, ImageLab, 4 MCP, AgentLab (parcial). | UNRLVL |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 26 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp (público o GitHub Pro) | UNRLVL |
| 27 | Normalizar convención nombres UnrealvilleStudio vs UNREALville en meta_accounts | UNRLVL |
| 28 | NSCF blog — Reescritura 4 artículos con L0+L3 HUMANIZE EMOTIONAL | NeuroneSCF |
| 29 | NSCF Dispatch Portal — crear proyecto Vercel nscf-dispatch + DNS Cloudflare CNAME | NeuroneSCF |
| 30 | Ecosystem Tools SESIÓN DEDICADA — MCPs + Skills + Agents + AgentLab orquestación multimarca | UNRLVL |
| 31 | **GRAN BLOQUE SocialLab/IID** — diagnosticar SocialLab → flujos IID con matriz de canales + regla de variabilidad de publicación (no siempre enlazar afuera) → testing → calendario → producción ICR → recién entonces integrar clientes (NSCF, FPHs) | UNRLVL |
| 32 | **lucien_video** (cuando VideoLab/Kling.ai) — gobierna guion hablado de TikTok/Reels | Lucien Sael |
| 33 | Validar genomas v0.5 contra outputs reales → promover a v1.0 (lucien_editorial, lucien_social, sam_personal) | Lucien / SamPublisher |
| 34 | **unrlvl-CRM multimarca** (ESTRATÉGICO) — capa de orquestación de relaciones que delega al motor de email correcto por marca (Klaviyo NSCF / Resend FPHs) sin fricción. NO construir hasta tener FPHs con leads reales por Resend + NSCF con flujo Klaviyo mapeado. El CRM sabe de clientes/estados/disparadores; los motores saben de envío. | UNRLVL |
| 36 | **unrlvl-SMA multimarca** (ESTRATÉGICO) — SMA lee contexto de marca desde Supabase (tabla `agents`, hoy vacía), reconoce marca por token, sin reescribir prompt. FPHs + NSCF como primeras marcas de prueba, una vez FPHs probado como molde. | UNRLVL |
| 37 | **Drift detector** (ESTRATÉGICO) — skill del ecosystem-auditor que lee el código real de cada repo vía gh-proxy, extrae campos objetivos (versión, modelo IA, env vars, endpoint, status) y los compara contra ecosystem_graph.json, reportando SOLO las discrepancias. Convierte la auditoría de "leer todo a mano" a "revisar lista de diferencias". Principio: cuando fuente derivada discrepa del código, gana el código y la fuente se corrige. Evolución futura: campos auto-extraídos (regenerados desde código, no a mano) → repos auto-documentados (/api/_meta por repo). **Captura aquí los drifts conocidos: `shopify.stores` VIEW→BASE TABLE; `/api/professor` ya existe (HRD lo marca pendiente).** | UNRLVL |
| 38 | **Reconciliación completa ecosystem_graph** — ecosystem audit contextual dedicado: leer código de TODOS los nodos y reconciliar vs grafo. Hoy (06-08) solo se parchearon 4 discrepancias puntuales (ImageLab, Orchestrator, CopyLab). Idealmente se ejecuta CON el drift detector (#37) ya construido. | UNRLVL |
| 39 | **Revisar `.github/CLAUDE.md` repetido** — template de 608 bytes (sha idéntico) en Orchestrator, CopyLab, AgentLab, fphs-speaks. Decidir si alinear con gobernanza nueva o eliminar. Limpiar `desktop.ini` en forumphs-speaks. | UNRLVL |

---

## ✅ Resuelto recientemente

- ✅ **NSCF-Console Fase 2 (Módulo aprobación PO)** — EF `nscf-b2b-approve` v1 + `nscf-mailer` v19 (3 types b2b) + frontend `nscf-console/` + índice parcial + policy RLS explícita. E2E 10/10 en vivo. Auth password hasheado (bcryptjs, server-side). Shopify manual (sin write_customers, bloque copia-pega). PR #3 mergeado. Deploy Vercel LIVE: `console-pro-neuronescf.vercel.app` (probado OK). 7 learnings en Professor — 2026-06-13
- ✅ **NSCF PR #2 (pro-gateway Fase 1)** mergeado a main — 2026-06-13
- ✅ **NSCF Sales Pager Salones v18** — pager B2B completo con imágenes reales incrustadas + versión Alizzanti — 2026-06-13
- ✅ **CLAUDE.md críticos + pipeline consolidados** — gobernanza inyectada preservando contexto, verificado leyendo código real: unrlvl-context (crítico), Orchestrator (v4.1, approve-job corregido), CopyLab (v9.7, motor de capas), ImageLab (Vertex+SA corregido), 4 MCP (shopify/supabase/meta/fphs-proxy), AgentLab (parcial). Pusheados — 2026-06-08
- ✅ **ecosystem_graph.json corregido** — 4 discrepancias código-vs-grafo parcheadas vía CC UPDATE in-place: ImageLab auth/modelo (Vertex+SA, no GEMINI_API_KEY) + status live, Orchestrator v4.1, CopyLab v9.7 — 2026-06-08
- ✅ **Protocolos en custom instructions** (#11) — userPreferences de Sam alineadas con SESSION_PROTOCOL v16 (SMA fuera de Actualiza por defecto, política de entrega por tamaño, gobernanza CC) — 2026-06-08
- ✅ **EXPORT_SECRET limpieza** (#12) — secret viejo removido de custom instructions; v16 ya lo trae como placeholder. Sam rotó en Vercel — 2026-06-08
- ✅ **Professor** — 13 learnings (06-06/08) + 5 nuevos (consolidación CLAUDE.md) registrados y aprobados — 2026-06-08
- ✅ **SMA reapuntado a ForumPHs** — operativo en producción. Roles client/ops/admin; aliases de correo reales; prerrequisito Gmail; saludo con agenda por rol (funciona, personaliza); historial KV reseteado a cero (12 keys); PRs #1 y #2 mergeados — 2026-06-06
- ✅ **Gobernanza CC creada** — CC_PROTOCOL.md + SESSION_PROTOCOL v15→v16 (política de entrega por tamaño: Ruta A Claude / Ruta B CC). Regla suprema: context files nunca se reemplazan — 2026-06-06/07
- ✅ **session_log NSCF restaurado** — historial recuperado de git y archivado tras incidente de reemplazo por CC — 2026-06-06
- ✅ **Skill `voice-reference-extractor` v1.0** creado e integrado — pipeline local TikTok → Whisper + OCR → consolidado .md/.json, PR #2 mergeado — 2026-06-05
- ✅ **brands/SamPublisher/** carpeta creada + brand.json + session_log.md pushed (PR #1) — 2026-06-05
- ✅ **INDEX.md v1.4** — voice-reference-extractor + supabase-auditor — 2026-06-05
- ✅ **Genoma SamPublisher** (sam_personal v0.5) creado — voz pública + modo vocero, 4º genoma del ecosistema propio — 2026-06-02
- ✅ **SamPublisher health** yellow → green (genoma existe) — 2026-06-02
- ✅ **Deuda Lucien** — nota fantasma "brands table did not return a row" eliminada de lucien_editorial.notes — 2026-06-02
- ✅ **Genoma lucien_social** (v0.5) creado — voz corta/reactiva, ≤280, terreno propio — 2026-06-02
- ✅ **Genoma lucien_editorial** (v0.5) creado — desbloquea IID — 2026-06-01
- ✅ **luciensael.com blog** construido (home+blog+1 artículo molde bilingüe) — 2026-05-31
- ✅ **UNRLVL Field Notes** construido (índice + artículo molde, estética terminal) — 2026-05-31
- ✅ **FIX publicación v22** — insertada fila meta_accounts brand_id=UnrealvilleStudio — 2026-05-31
- ✅ **IID diagnóstico completo** — causa raíz identificada (sin voice genome) — 2026-05-31
- ✅ **Meta MCP LIVE** — UNREALville + NSCF tokens activos — 2026-05-29
- ✅ **Pipeline End-to-End OPERACIONAL** — primer post publicado IG+FB — 2026-05-29

---

## Notas de contexto

**NSCF-Console (estado 2026-06-13):** Fase 1 (registro pro-gateway) + Fase 2 (aprobación PO) completas y en producción. Deploy LIVE: `console-pro-neuronescf.vercel.app` (root `nscf-console`, Vite, sin env vars). Fase 2 entregó EF `nscf-b2b-approve` (login/list_pending/approve/reject/needs_info/assisted_register), frontend `nscf-console/`, `nscf-mailer` v19. Shopify customer creation es MANUAL hasta tener `write_customers` (Fase 2.5, depende de #13 Shopify infra). Auth PO = password hasheado server-side, evoluciona a roles en Fase 3 (#12). La Console solo consulta `status=pending`. Secrets en Supabase: `PO_CONSOLE_PASSWORD_HASH`, `PO_CONSOLE_JWT_SECRET`. Endpoint EF hardcodeado en App.jsx:5 (sin env vars, a propósito).

**Patrón CC preview/live (aceptado 2026-06-13):** CC despliega EFs al proyecto Supabase vivo (no rama aislada) cuando son inertes hasta cargar secrets, señalándolo. Sam lo acepta como válido mientras sea consciente y solutivo. Registrado en Professor.

**Ayra — enfoque staging-loop (discutido 2026-06-13):** opción de delegar a CC la construcción en un entorno de staging que replique el ecosystem (Supabase branch/proyecto espejo + Vercel preview + schema `ayra` aislado), con criterios de validación objetivos por fase escritos de antemano (qué query/endpoint/fila debe devolver qué), para que Claude audite cada fase contra criterios duros y solo se promueva a producción lo que pasa. El autónomo del loop es CC entre sesiones; Claude no es persistente, valida por sesión. El cuello de botella de Ayra son las decisiones de diseño aún no tomadas, no el código. NO es "casi sin intervención humana" — eso es marketing de demo.

**CLAUDE.md por repo (estado 2026-06-08):** estándar de dos capas — bloque de gobernanza CC arriba (3 niveles: crítico=unrlvl-context CC nunca escribe; alta-complejidad=labs pipeline verificación reforzada; estándar+MCP=no commitear tokens) + contexto propio del repo abajo (extraído del código real). Verificados contra código: unrlvl-context, Orchestrator, CopyLab, ImageLab, unrlvl-shopify-mcp, unrlvl-supabase-mcp, unrlvl-meta-mcp, fphs-mcp-proxy, AgentLab (parcial — falta src/ orquestador). Método: leer código real + triangular con ecosystem_graph y supabase_access_map; ante conflicto, gana el código. Pendientes de hacer: ítem #35.

**Fuentes de verdad — método (estado 2026-06-08):** ecosystem_graph.json y supabase_access_map.json son apoyo de triangulación pero DERIVAN del código y pueden quedar desactualizadas (deriva). Hoy se parchearon 4 campos a mano. El método confiable es el drift detector (#37): comparar código-vs-grafo automáticamente y reportar discrepancias. Reconciliación completa = #38. **Drifts conocidos pendientes: `shopify.stores` documentado VIEW pero es BASE TABLE; `/api/professor` documentado pendiente pero ya existe.**

**SMA ForumPHs (estado 2026-06-06):** operativo en producción. Mezcla: FB + IG + LinkedIn (perfil Ivette + Company Page) + Meta dev app + verificación negocio. WhatsApp EN PAUSA hasta número panameño dedicado. TikTok fuera. Identidad: Ivette clienta titular, Jesús operador del armado, sam@unrealvillestudio.com admin del BM. Aliases reales bajo forumphs.com → forumphs507@gmail.com (fb@, ig@, linkedin@, wa@ reservado, + funcionales). Email marketing FPHs = Resend+Supabase+Orchestrator (no Klaviyo).

**Gobernanza CC (estado 2026-06-07):** CC_PROTOCOL.md gobierna a CC en todos los repos. Regla suprema: context files nunca se reemplazan (UPDATE preservando historia). CC nunca pushea a unrlvl-context (solo Sam por GitHub Desktop) ni mergea PRs por su cuenta. CC limpia sus worktrees al cerrar PR. SESSION_PROTOCOL v16 define política de entrega por tamaño: Ruta A (Claude entrega listo con prefijo [carpeta]_, Sam renombra) / Ruta B (CC hace UPDATE in-place, informa éxito + commit para confirmar).

**Genomas del ecosistema propio (estado 2026-06-02):** 4 genomas activos en `brand_voice_genome` — `unrlvl_default` v1.0 (we/infraestructura), `lucien_editorial` v0.5 (ensayo/filo que respira), `lucien_social` v0.5 (golpe corto ≤280), `sam_personal` v0.5 (practicante que reflexiona + vocero). Modo vocería de Sam cita a Lucien por destino del enlace (social vs editorial). Pendiente: genoma UNRLVL social (mismo modo vocería, voz "we").

**SamPublisher:** persona publicadora, NO el humano Sam. Canales Meta(FB)+LinkedIn (cuentas pendientes de crear). Territorio propio (own_craft/own_thesis/own_trajectory) + vocería. Línea roja dura: nunca vende (eso es UNRLVL); no toca religión (válvula = Lucien).

**IID Subsystem:** Research vivo (iid_cron_runs diario). Ejecución congelada desde 26-abr. content-run-stage v22 reescrita con timeout 65s pero nunca re-corrida en limpio. Causa raíz (sin genoma) YA RESUELTA para Lucien. Fix restante: regenerar seeds → re-test.

**Estado publicación (dato Sam 06-01):** Meta + TikTok publican vía Orchestrator probado para UNREALville. LucienSael y SamPublisher NO probados end-to-end. Antes del primer publish de cada uno por pipeline: verificar/insertar fila en meta_accounts.

**Context System refactor:** Plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md. Objetivo: ecosystem.json más delgado + CAPABILITIES.md separado. RIESGO ALTO — sesión dedicada. Beneficio adicional: modulariza archivos extensos → más caen en Ruta A del Actualiza.

**Ayra Sprint 0 🔴:** lab_jobs + lab_configs YA EXISTEN en prod. Pendiente: repo + Vercel + schema ayra + PROFESSOR árbol + env vars. Deadline: 5 Jun 2026 (VENCIDO). Ver enfoque staging-loop arriba.
