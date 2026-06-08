# AGENDA — Unrealville Studio
_Actualizada: 2026-06-08 · v2026-06-08-v1_

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
| 10 | **Ayra Sprint 0** — ⚠️ VENCIDO (deadline 5 Jun) — crear repo + Vercel + schema + env vars | UNRLVL | Reprogramar urgente |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 13 | **SocialLab dual-mode** — confirmar/implementar sync+async, re-test publicación post brand_id fix | UNRLVL |
| 14 | **Crear cuentas LinkedIn + X para Lucien** + **Meta(FB) + LinkedIn para SamPublisher** | Lucien Sael / SamPublisher |
| 15 | **Context System refactor** — SESIÓN DEDICADA (plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md). Adelgazar ecosystem.json + crear CAPABILITIES.md. RIESGO ALTO — hacer con foco. Modulariza archivos extensos → más caen en Ruta A del Actualiza. | UNRLVL |
| 16 | **VideoLab launch** — integrar Kling.ai token + grabaciones Patricia para voice genome | UNRLVL |
| 17 | **TikTok Pixel duplicado NSCF** — resolver antes de ads | NeuroneSCF |
| 18 | **Meta MCP** — fix fb_get_page_insights métricas deprecadas Graph API v21 | UNRLVL |
| 19 | **Portal Iván sprint 2** — dashboard pendientes + UPS API (developer.ups.com) | NeuroneSCF |
| 20 | **Klaviyo flows NSCF** — configurar 4 flows bilingüe en UI | NeuroneSCF |
| 21 | **Genoma UNRLVL social** — voz "we" con mismo modo vocería que sam_personal | UNRLVL |
| 22 | **SMA pulido (opcional)** — actualizar 4 hints viejos del front (App.tsx: Google Voice/WABA) por hints FPHs; opción agenda en portada sin escribir "hola"; decidir si reset.js queda permanente o se quita tras uso | ForumPHs |
| 23 | **Email marketing FPHs** — construir stack Resend + Supabase + Orchestrator (decisión tomada: NO Klaviyo para servicios). Diseñar disparo vía capa (endpoint/tabla eventos), NO hardcodeado, para que el CRM futuro se enchufe | ForumPHs |
| 24 | **ForumPHs — ejecución creación cuentas** — Ivette + Jesús siguen el SMA. Conseguir número panameño dedicado → activar WhatsApp Business → integrar ForumPHs Speaks | ForumPHs |
| 35 | **CLAUDE.md — completar repos restantes** — leyendo código real (un repo grande por tanda). Pendientes: AgentLab src/ orquestador completo, forumphs-speaks (index.html 284KB monolítico), WebLab, VoiceLab, VideoLab, SocialLab, BlueprintLab, OnboardingApp, CoreProject, DDMV-Assistant, unrlvl-ops, XMMs. Listos: unrlvl-context, Orchestrator, CopyLab, ImageLab, 4 MCP, AgentLab (parcial). | UNRLVL |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 25 | GitHub: unrlvl-supabase-mcp + unrlvl-meta-mcp (público o GitHub Pro) | UNRLVL |
| 26 | Normalizar convención nombres UnrealvilleStudio vs UNREALville en meta_accounts | UNRLVL |
| 27 | NSCF blog — Reescritura 4 artículos con L0+L3 HUMANIZE EMOTIONAL | NeuroneSCF |
| 28 | NSCF Dispatch Portal — crear proyecto Vercel nscf-dispatch + DNS Cloudflare CNAME | NeuroneSCF |
| 29 | Ecosystem Tools SESIÓN DEDICADA — MCPs + Skills + Agents + AgentLab orquestación multimarca | UNRLVL |
| 30 | **GRAN BLOQUE SocialLab/IID** — diagnosticar SocialLab → flujos IID con matriz de canales + regla de variabilidad de publicación (no siempre enlazar afuera) → testing → calendario → producción ICR → recién entonces integrar clientes (NSCF, FPHs) | UNRLVL |
| 31 | **lucien_video** (cuando VideoLab/Kling.ai) — gobierna guion hablado de TikTok/Reels | Lucien Sael |
| 32 | Validar genomas v0.5 contra outputs reales → promover a v1.0 (lucien_editorial, lucien_social, sam_personal) | Lucien / SamPublisher |
| 33 | **unrlvl-CRM multimarca** (ESTRATÉGICO) — capa de orquestación de relaciones que delega al motor de email correcto por marca (Klaviyo NSCF / Resend FPHs) sin fricción. NO construir hasta tener FPHs con leads reales por Resend + NSCF con flujo Klaviyo mapeado. El CRM sabe de clientes/estados/disparadores; los motores saben de envío. | UNRLVL |
| 34 | **unrlvl-SMA multimarca** (ESTRATÉGICO) — SMA lee contexto de marca desde Supabase (tabla `agents`, hoy vacía), reconoce marca por token, sin reescribir prompt. FPHs + NSCF como primeras marcas de prueba, una vez FPHs probado como molde. | UNRLVL |
| 36 | **Drift detector** (ESTRATÉGICO) — skill del ecosystem-auditor que lee el código real de cada repo vía gh-proxy, extrae campos objetivos (versión, modelo IA, env vars, endpoint, status) y los compara contra ecosystem_graph.json, reportando SOLO las discrepancias. Convierte la auditoría de "leer todo a mano" a "revisar lista de diferencias". Principio: cuando fuente derivada discrepa del código, gana el código y la fuente se corrige. Evolución futura: campos auto-extraídos (regenerados desde código, no a mano) → repos auto-documentados (/api/_meta por repo). | UNRLVL |
| 37 | **Reconciliación completa ecosystem_graph** — ecosystem audit contextual dedicado: leer código de TODOS los nodos y reconciliar vs grafo. Hoy (06-08) solo se parchearon 4 discrepancias puntuales (ImageLab, Orchestrator, CopyLab). Idealmente se ejecuta CON el drift detector (#36) ya construido. | UNRLVL |
| 38 | **Revisar `.github/CLAUDE.md` repetido** — template de 608 bytes (sha idéntico) en Orchestrator, CopyLab, AgentLab, fphs-speaks. Decidir si alinear con gobernanza nueva o eliminar. Limpiar `desktop.ini` en forumphs-speaks. | UNRLVL |

---

## ✅ Resuelto recientemente

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

**CLAUDE.md por repo (estado 2026-06-08):** estándar de dos capas — bloque de gobernanza CC arriba (3 niveles: crítico=unrlvl-context CC nunca escribe; alta-complejidad=labs pipeline verificación reforzada; estándar+MCP=no commitear tokens) + contexto propio del repo abajo (extraído del código real). Verificados contra código: unrlvl-context, Orchestrator, CopyLab, ImageLab, unrlvl-shopify-mcp, unrlvl-supabase-mcp, unrlvl-meta-mcp, fphs-mcp-proxy, AgentLab (parcial — falta src/ orquestador). Método: leer código real + triangular con ecosystem_graph y supabase_access_map; ante conflicto, gana el código. Pendientes de hacer: ítem #35.

**Fuentes de verdad — método (estado 2026-06-08):** ecosystem_graph.json y supabase_access_map.json son apoyo de triangulación pero DERIVAN del código y pueden quedar desactualizadas (deriva). Hoy se parchearon 4 campos a mano. El método confiable es el drift detector (#36): comparar código-vs-grafo automáticamente y reportar discrepancias. Reconciliación completa = #37.

**SMA ForumPHs (estado 2026-06-06):** operativo en producción. Mezcla: FB + IG + LinkedIn (perfil Ivette + Company Page) + Meta dev app + verificación negocio. WhatsApp EN PAUSA hasta número panameño dedicado. TikTok fuera. Identidad: Ivette clienta titular, Jesús operador del armado, sam@unrealvillestudio.com admin del BM. Aliases reales bajo forumphs.com → forumphs507@gmail.com (fb@, ig@, linkedin@, wa@ reservado, + funcionales). Email marketing FPHs = Resend+Supabase+Orchestrator (no Klaviyo).

**Gobernanza CC (estado 2026-06-07):** CC_PROTOCOL.md gobierna a CC en todos los repos. Regla suprema: context files nunca se reemplazan (UPDATE preservando historia). CC nunca pushea a unrlvl-context (solo Sam por GitHub Desktop) ni mergea PRs por su cuenta. CC limpia sus worktrees al cerrar PR. SESSION_PROTOCOL v16 define política de entrega por tamaño: Ruta A (Claude entrega listo con prefijo [carpeta]_, Sam renombra) / Ruta B (CC hace UPDATE in-place, informa éxito + commit para confirmar).

**Genomas del ecosistema propio (estado 2026-06-02):** 4 genomas activos en `brand_voice_genome` — `unrlvl_default` v1.0 (we/infraestructura), `lucien_editorial` v0.5 (ensayo/filo que respira), `lucien_social` v0.5 (golpe corto ≤280), `sam_personal` v0.5 (practicante que reflexiona + vocero). Modo vocería de Sam cita a Lucien por destino del enlace (social vs editorial). Pendiente: genoma UNRLVL social (mismo modo vocería, voz "we").

**SamPublisher:** persona publicadora, NO el humano Sam. Canales Meta(FB)+LinkedIn (cuentas pendientes de crear). Territorio propio (own_craft/own_thesis/own_trajectory) + vocería. Línea roja dura: nunca vende (eso es UNRLVL); no toca religión (válvula = Lucien).

**IID Subsystem:** Research vivo (iid_cron_runs diario). Ejecución congelada desde 26-abr. content-run-stage v22 reescrita con timeout 65s pero nunca re-corrida en limpio. Causa raíz (sin genoma) YA RESUELTA para Lucien. Fix restante: regenerar seeds → re-test.

**Estado publicación (dato Sam 06-01):** Meta + TikTok publican vía Orchestrator probado para UNREALville. LucienSael y SamPublisher NO probados end-to-end. Antes del primer publish de cada uno por pipeline: verificar/insertar fila en meta_accounts.

**Context System refactor:** Plan en protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md. Objetivo: ecosystem.json más delgado + CAPABILITIES.md separado. RIESGO ALTO — sesión dedicada. Beneficio adicional: modulariza archivos extensos → más caen en Ruta A del Actualiza.

**Ayra Sprint 0 🔴:** lab_jobs + lab_configs YA EXISTEN en prod. Pendiente: repo + Vercel + schema ayra + PROFESSOR árbol + env vars. Deadline: 5 Jun 2026 (VENCIDO).
