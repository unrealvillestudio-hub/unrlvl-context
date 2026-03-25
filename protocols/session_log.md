# Session Log — UNRLVL Ecosystem (Cross-brand)
**Archivo:** `session_log.md` (nivel ecosistema)
**Ruta en repo:** `protocols/ecosystem_session_log.md`

---

## [2026-03-25] — Auditoría DB_VARIABLES_v6_4 + Mapa de Labs

### Qué se hizo
- Auditoría completa de DB_VARIABLES_v6_4 (40 hojas leídas directamente del archivo)
- Auditoría de proyectos Vercel via MCP (6 proyectos ecosystem + 2 personales ignorados)
- Lectura de commits history de ImageLab, AgentLab, WebLab, Orchestrator
- Lectura de código fuente de BlueprintLab (App.tsx completo)
- Discusión y decisión de taxonomía del ecosistema
- Discusión de creatividad vs estructura en DB_VARIABLES
- DB_VARIABLES declarada FROZEN en v6_4
- Generación de UNRLVL_Ecosystem_Vision.md v4.0

### Hallazgos críticos

**1. BP_COPY_1.0 no estaba documentado en DB_VARIABLES**
Existe en BlueprintLab como schema completo (voz, tono, estilo, canales primarios/secundarios/excluidos, compliance, hooks, frases firma). CopyLab lo consume. Gap en DB_VARIABLES.

**2. Patricia Osorio tiene 3 brand_ids canónicos separados**
- `PatriciaOsorioPersonal` — marca personal
- `PatriciaOsorioComunidad` — comunidad / emprendedoras
- `PatriciaOsorioVizosSalon` — contexto Vizos Salón Miami
DB_VARIABLES actual solo tiene `PatriciaOsorio` genérico. INCONSISTENCIA CRÍTICA.

**3. HUMANIZE F2.5 — capa no documentada anteriormente**
Sistema transversal de autenticidad inyectado automáticamente en cada prompt del ecosistema.
Pattern: `brand_id × medium → humanize_instructions`
DEFAULT + 7 overrides activos por marca/medium.
Tabla Supabase candidata: `humanize_rules(brand_id, medium, is_override, instructions)`

**4. BlueprintLab NO está en Vercel**
Deploy en Google AI Studio. Usa `window.storage` (Claude artifact API) para persistencia.
Tiene 4 schemas activos: BP_PERSON_1.0, BP_LOCATION_1.0, BP_PRODUCT_1.0, BP_COPY_1.0.

**5. Taxonomía corregida — 4 tipos distintos**
- `lab` — plataforma reutilizable multi-marca (ImageLab, WebLab, AgentLab, etc.)
- `agent_deployment` — instancia de AgentLab por cliente (ForumPHs Speaks, Social Media Agent)
- `skill` — capacidad en Claude sin infraestructura (Document Factory, FIE)
- `local_tool` — corre en máquina de Sam (VoiceLab/ElevenLabs)

**6. WebLab es más de lo esperado**
Generador de temas Shopify multi-marca con push directo a Admin API.
6 variantes de tema activas. 6 serverless functions. Genera Liquid sections.

**7. DB_VARIABLES: 5 decisiones arquitectónicas pendientes para Supabase**
1. ¿`brands` monolítica o normalizada?
2. ¿Output_Templates/Canal_Blocks en Supabase o en código?
3. ¿HUMANIZE tabla propia o JSONB?
4. ¿DV_* como tablas o enums?
5. ¿ForumPHs/NeuroneSCF se integran a DB_VARIABLES?

### Decisiones tomadas

| Decisión | Resolución |
|---|---|
| DB_VARIABLES v6_4 | FROZEN — nada nuevo entra en Sheets |
| Migración a Supabase | Después de que los 3 labs estén validados |
| ICR QA exposición | 100% interno — usuario/cliente nunca ve FAIL |
| Creatividad vs estructura | Angle Randomizer + temperature variable + log de ángulos usados |
| GitHub MCP | Activado pero no funcional en este chat — retomar en chat nuevo |

### Gaps pendientes de cierre

| Gap | Impacto | Prioritario |
|---|---|---|
| Voice IDs todos TBD_* | VoiceLab bloqueado | Sí |
| has_reference_photos = false en todos | ImageLab baja fidelidad locación | Parcial |
| K>PO solo 22 keywords incompletas | CopyLab incompleto para PO | Sí |
| BP_COPY_1.0 no en DB_VARIABLES | Gap de datos maestros | Sí |
| Patricia Osorio: 1 brand_id vs 3 canónicos | Inconsistencia crítica en stack | Sí |
| GeoMix solo para Diamond y D7H | 4 marcas sin geo matrix | Parcial |

### Labs leídos en esta sesión

| Lab | Fuente | Nivel de comprensión |
|---|---|---|
| BlueprintLab | App.tsx completo | ✅ Completo |
| ImageLab | Commits history | ✅ Arquitectura clara |
| AgentLab | Commits history | ✅ Auth + persistencia + roles |
| WebLab | Commits history | ✅ Shopify theme generator |
| Orchestrator | Commits history | ⚠️ Solo inicializado |
| VideoLab | DB_VARIABLES | 🔲 Código no leído |
| CopyLab | DB_VARIABLES | 🔲 Código no leído |
| VoiceLab | DB_VARIABLES | 🔲 Local, código no leído |

### Agenda próximo chat

1. Conectar GitHub MCP → leer código de VideoLab, CopyLab y repos pendientes
2. Diseñar schema completo Supabase (tablas, tipos, relaciones, RLS)
3. Tomar las 5 decisiones arquitectónicas pendientes
4. Definir plan de migración Sheets → Supabase
5. Iniciar implementación

### Outputs generados esta sesión

- `ecosystem.json` — v2026-03-25 (actualización mayor)
- `UNRLVL_Ecosystem_Vision.md` — v4.0 (basado en DB_VARIABLES real)
- `session_log.md` — este archivo

---
