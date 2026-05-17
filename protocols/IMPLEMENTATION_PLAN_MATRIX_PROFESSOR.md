# PLAN DE IMPLEMENTACIÓN
## DECISION_MATRIX + PROFESSOR SYSTEM
## Unreal>ille Studio — Ecosistema UNRLVL
_Generado: 2026-05-17 · Versión: 1.0 · Estado: Pendiente implementación_

---

## CONTEXTO Y DECISIONES TOMADAS

### Lo que resuelve este sistema
1. **DECISION_MATRIX:** Elimina decisiones tomadas sin base lógica. Provee criterios objetivos ponderados para que Claude evalúe antes de ejecutar — especialmente en outputs externos, decisiones irreversibles, y situaciones de riesgo.

2. **Professor:** Convierte aprendizajes de sesión en conocimiento institucional operativo. Evita que el mismo problema se resuelva dos veces desde cero. Calibra la DECISION_MATRIX con casos reales.

3. **Supabase como backend:** Los pesos, casos, variables y aprendizajes viven en tablas consultables en tiempo real — no en archivos estáticos que requieren commit para actualizarse.

4. **Conteo de mensajes como trigger:** Cada 10 mensajes Claude ejecuta un micro-checkpoint del Professor — captura aprendizajes del bloque sin interrumpir el flujo.

---

## ARQUITECTURA COMPLETA

```
┌─────────────────────────────────────────────────────────┐
│                    INICIO DE SESIÓN                      │
│  protocolo actualización                                  │
│    → ecosystem.json + AGENDA.md + skills/INDEX.md        │
│    → DECISION_MATRIX.md (Vercel — narrativo)             │
│    → professor_weights (Supabase — operativo)            │
│    → professor_platform_variables (Supabase)             │
│    → professor_learnings pending (Supabase)              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  DURANTE LA SESIÓN                       │
│                                                          │
│  DECISION_MATRIX — silenciosa, siempre activa           │
│    → se aplica antes de cada output relevante           │
│    → declara el resultado cuando activa flag            │
│                                                          │
│  PROFESSOR CHECKPOINT — cada 10 mensajes               │
│    → micro-revisión del bloque                          │
│    → captura candidatos a aprendizaje                   │
│    → acumula en lista temporal del contexto             │
│                                                          │
│  "Professor, anota" — trigger manual de Sam             │
│    → captura el contexto inmediato                      │
│    → añade a lista temporal                             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 FINAL DE SESIÓN                          │
│                                                          │
│  Comando: Actualiza                                      │
│    → Social Media Agent check                           │
│    → session_log.md actualizado                         │
│    → archivos operativos generados                      │
│    → mensaje de commit                                  │
│                                                          │
│  Comando: Professor                                      │
│    → consolida lista temporal de checkpoints            │
│    → aplica filtro de relevancia (3 criterios)          │
│    → propone lista para aprobación de Sam               │
│    → Sam aprueba/rechaza cada ítem                      │
│    → inserta aprobados en Supabase                      │
│    → genera archivos Markdown aprobados                 │
│                                                          │
│  Commit único: session_log + archivos + knowledge       │
└─────────────────────────────────────────────────────────┘
```

---

## FASE 1 — SUPABASE SCHEMA

### Tablas a crear

```sql
-- 1. Criterios de la matriz (dimensiones A, B, C, D)
CREATE TABLE professor_decision_criteria (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  dimension CHAR(1) CHECK (dimension IN ('A','B','C','D')),
  description TEXT,
  weight_base NUMERIC(3,2),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Reglas de veto absoluto
CREATE TABLE professor_veto_rules (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL, -- V1, V2, V3, V4
  description TEXT NOT NULL,
  bypass_allowed BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Casos calibrados (historial de decisiones)
CREATE TABLE professor_decision_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  brand_id TEXT,
  session_description TEXT,
  context_description TEXT NOT NULL,
  dimensions_activated TEXT[], -- ['B2','C1','A3']
  veto_triggered TEXT, -- NULL o código de veto
  bypass_by_sam BOOLEAN DEFAULT false,
  bypass_justification TEXT,
  outcome TEXT,
  correct_decision BOOLEAN,
  lesson_learned TEXT,
  matrix_version TEXT DEFAULT 'v1.0',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Pesos dinámicos por contexto
CREATE TABLE professor_weights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_description TEXT,
  stakeholder TEXT CHECK (stakeholder IN ('A1','A2','A3','A4')),
  consequence_type TEXT CHECK (consequence_type IN ('B1','B2','B3','B4','B5')),
  reversibility TEXT CHECK (reversibility IN ('C1','C2','C3','C4')),
  horizon TEXT CHECK (horizon IN ('D1','D2','D3')),
  weight_value NUMERIC(3,2) NOT NULL,
  calibration_notes TEXT,
  version TEXT DEFAULT 'v1.0',
  active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Manuales del knowledge base
CREATE TABLE professor_manuals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('platform','client','ecosystem','core-business')),
  subcategory TEXT,
  brand_id TEXT,
  status TEXT CHECK (status IN ('draft','reviewed','approved','deprecated')) DEFAULT 'draft',
  version TEXT DEFAULT 'v1.0',
  content_summary TEXT,
  markdown_path TEXT, -- path en el repo Vercel
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Errores conocidos por plataforma
CREATE TABLE professor_errors_known (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manual_id UUID REFERENCES professor_manuals(id),
  platform TEXT NOT NULL,
  error_description TEXT NOT NULL,
  cause TEXT,
  solution TEXT NOT NULL,
  verified BOOLEAN DEFAULT true,
  brand_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Aprendizajes capturados (pipeline Professor)
CREATE TABLE professor_learnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_date DATE NOT NULL,
  brand_id TEXT,
  raw_learning TEXT NOT NULL,
  category TEXT,
  relevance_score INTEGER CHECK (relevance_score BETWEEN 1 AND 5),
  filter_passed BOOLEAN,
  filter_reason TEXT,
  converted_to_manual_id UUID REFERENCES professor_manuals(id),
  approved_by_sam BOOLEAN DEFAULT false,
  checkpoint_number INTEGER, -- en qué checkpoint fue capturado
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Variables de plataforma
CREATE TABLE professor_platform_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  brand_id TEXT,
  variable_key TEXT NOT NULL,
  variable_value TEXT NOT NULL,
  context TEXT,
  last_verified DATE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Bypasses de Sam (registro)
CREATE TABLE professor_sam_bypasses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  brand_id TEXT,
  decision_description TEXT NOT NULL,
  risk_declared TEXT NOT NULL,
  veto_rules_present TEXT[],
  outcome TEXT,
  added_to_matrix BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Índices para performance
```sql
CREATE INDEX idx_decision_cases_brand ON professor_decision_cases(brand_id);
CREATE INDEX idx_decision_cases_date ON professor_decision_cases(date);
CREATE INDEX idx_learnings_session ON professor_learnings(session_date);
CREATE INDEX idx_learnings_approved ON professor_learnings(approved_by_sam);
CREATE INDEX idx_errors_platform ON professor_errors_known(platform);
CREATE INDEX idx_platform_vars ON professor_platform_variables(platform, brand_id);
CREATE INDEX idx_weights_active ON professor_weights(active);
```

---

## FASE 2 — DATOS INICIALES

### Criterios de la matriz (seed data)

```sql
-- DIMENSIÓN A — Stakeholder
INSERT INTO professor_decision_criteria VALUES
('A1','Cliente final','A','Comprador o usuario del producto',0.35,true,NOW()),
('A2','Partner/asociado','A','Patricia, distribuidores, familia, socios',0.25,true,NOW()),
('A3','UNRLVL como negocio','A','Marca, activos, operación, reputación corporativa',0.25,true,NOW()),
('A4','Sam como persona','A','Reputación personal, responsabilidad legal, tiempo',0.15,true,NOW());

-- DIMENSIÓN B — Tipo de consecuencia
INSERT INTO professor_decision_criteria VALUES
('B1','Financiero','B','Pérdida monetaria directa, multa, valor de contrato',0.20,true,NOW()),
('B2','Legal/regulatorio','B','FDA, FTC, TOS de plataforma, contrato, normativa',0.30,true,NOW()),
('B3','Reputacional','B','Marca, relación, confianza pública o privada',0.20,true,NOW()),
('B4','Operativo','B','Flujo de trabajo, sistema, proceso, herramienta',0.15,true,NOW()),
('B5','Relacional','B','Vínculo humano, partnership de largo plazo',0.15,true,NOW());

-- DIMENSIÓN C — Reversibilidad
INSERT INTO professor_decision_criteria VALUES
('C1','Irreversible','C','No se puede deshacer bajo ninguna circunstancia',1.0,true,NOW()),
('C2','Reversible con costo alto','C','Se puede revertir pero con pérdida significativa',0.65,true,NOW()),
('C3','Reversible con costo bajo','C','Corrección posible con esfuerzo menor',0.30,true,NOW()),
('C4','Completamente reversible','C','Sin consecuencia si se corrige',0.10,true,NOW());

-- DIMENSIÓN D — Horizonte temporal
INSERT INTO professor_decision_criteria VALUES
('D1','Impacto inmediato','D','Horas o días',0.40,true,NOW()),
('D2','Impacto medio plazo','D','Semanas o meses',0.35,true,NOW()),
('D3','Impacto largo plazo','D','Años o permanente',0.25,true,NOW());
```

### Reglas de veto absoluto

```sql
INSERT INTO professor_veto_rules VALUES
('V1','LEGAL_IRREVERSIBLE',
 'Consecuencia legal irreversible — B2 + C1 activos simultáneamente',
 false, true, NOW()),
('V2','HARM_VULNERABLE',
 'Daño a menor, persona vulnerable o tercero sin capacidad de consentir',
 false, true, NOW()),
('V3','COMPLIANCE_HARD',
 'Violación de compliance hard declarado de una marca (FDA, FTC, TOS)',
 false, true, NOW()),
('V4','SAM_EXPLICIT_LIMIT',
 'Acción que Sam ha declarado explícitamente fuera de límites en sesión activa',
 false, true, NOW());
```

### Casos calibrados iniciales (de esta sesión)

```sql
INSERT INTO professor_decision_cases VALUES
(gen_random_uuid(), '2026-05-17', 'NeuroneSCF',
 'Sesión Klaviyo + DECISION_MATRIX',
 'Sam solicitó crear reviews falsas para Judge.me',
 ARRAY['B2','B3','C1','D3'],
 'V1', false, NULL,
 'Claude rechazó correctamente. FTC Florida multas reales. Judge.me ban de cuenta.',
 true,
 'Reviews falsas activan V1 (B2+C1) independientemente de quien lo pida. Bypass de Sam no aplica cuando hay veto absoluto.',
 'v1.0', NOW()),

(gen_random_uuid(), '2026-05-17', 'NeuroneSCF',
 'Sesión Klaviyo + DECISION_MATRIX',
 'Content pipeline ejecutado sin skill cargado — templates Klaviyo con copy deficiente',
 ARRAY['A1','B3','C2','D2'],
 NULL, false, NULL,
 'Templates entregados con copy de calidad media. Sam detectó el problema y lo señaló.',
 false,
 'Cuando skill no está disponible (contexto incompleto) y output va a cliente externo, DECLARAR el gap y esperar confirmación. No proceder con aproximación.',
 'v1.0', NOW());
```

### Variables de plataforma conocidas

```sql
INSERT INTO professor_platform_variables VALUES
(gen_random_uuid(), 'klaviyo', 'NeuroneSCF', 
 'public_api_key', 'UNF8Ee', 
 'Site ID para tracking script', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'klaviyo', NULL,
 'api_limitation_delete_templates', 'true',
 'Public API key no permite DELETE en templates ni rename', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'klaviyo', NULL,
 'api_limitation_create_flows', 'true',
 'REST API no permite crear flow actions — solo crear flows vacíos', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'klaviyo', NULL,
 'money_filter_incompatible', 'true',
 'Filtro Liquid | money de Shopify no funciona en templates Klaviyo — usar {{ item.price }} directamente', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'judge_me', 'NeuroneSCF',
 'badge_metafield_key', 'judgeme.badge',
 'El metafield correcto para el badge es badge, NO preview_badge', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'judge_me', 'NeuroneSCF',
 'badge_display_none', 'true',
 'El metafield badge tiene style=display:none inline — stripear con Liquid replace antes de renderizar', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'agent_browser', NULL,
 'windows_requires_separate_terminal', 'true',
 'En Windows, npx agent-browser-mcp debe correr en terminal separada y mantenerse activo mientras Claude Code opera', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'agent_browser', NULL,
 'claudeai_local_mcp_not_supported', 'true',
 'claude.ai web no soporta MCP servers locales stdio — solo remote HTTP. agent-browser solo funciona desde Claude Code CLI', '2026-05-17', true, NOW()),

(gen_random_uuid(), 'shopify', 'NeuroneSCF',
 'checkout_branding_api_requires_plus', 'true',
 'checkoutBrandingUpsert requiere plan Plus o Development store — no disponible en Basic', '2026-05-17', true, NOW());
```

---

## FASE 3 — EDGE FUNCTIONS

### EF 1: `professor-get-context`
Carga al inicio de sesión. Devuelve pesos activos + variables relevantes.

```typescript
// Input: { brand_id?: string }
// Output: { weights, veto_rules, platform_variables, pending_learnings_count }
```

### EF 2: `professor-evaluate-decision`
Evalúa una decisión contra la matriz.

```typescript
// Input: { context_description, dimensions: string[], brand_id?: string }
// Output: { veto_triggered, veto_code, recommendation, similar_cases, score }
```

### EF 3: `professor-log-case`
Registra un caso calibrado.

```typescript
// Input: { brand_id, context_description, dimensions, veto_triggered, 
//          bypass_by_sam, outcome, correct_decision, lesson_learned }
// Output: { id, created }
```

### EF 4: `professor-submit-learning`
Procesa un aprendizaje candidato con el filtro de relevancia.

```typescript
// Input: { raw_learning, brand_id, session_date, checkpoint_number }
// Output: { relevance_score, filter_passed, filter_reason, category, suggested_path }
```

### EF 5: `professor-approve-learning`
Marca un aprendizaje como aprobado por Sam.

```typescript
// Input: { learning_id, approved: boolean, manual_path?: string }
// Output: { updated, markdown_generated }
```

### EF 6: `professor-checkpoint`
Ejecutado cada 10 mensajes. Revisa el bloque y captura candidatos.

```typescript
// Input: { messages_block: string[], brand_id?: string, checkpoint_number: int }
// Output: { candidates: Learning[], count: number }
```

---

## FASE 4 — ARCHIVOS VERCEL (MARKDOWN)

### Estructura de directorios a crear

```
knowledge/
  _templates/
    MANUAL_TEMPLATE.md
    CASE_TEMPLATE.md
  
  ecosystem/
    decision-matrix/
      DECISION_MATRIX.md       ← narrativo completo
      CHANGELOG.md
    professor/
      PROFESSOR_PROTOCOL.md
      CHECKPOINT_RULES.md
  
  platforms/
    shopify/MANUAL.md
    klaviyo/MANUAL.md
    judge-me/MANUAL.md
    agent-browser/MANUAL.md
    supabase/MANUAL.md
    meta-ads/MANUAL.md
  
  clients/
    NeuroneSCF/
      PLATFORM_NOTES.md        ← variaciones específicas
  
  core-business/
    email-marketing/MANUAL.md
    ecommerce-patterns/MANUAL.md
    content-pipeline/MANUAL.md
```

### MANUAL_TEMPLATE.md

```markdown
# [TÍTULO DEL MANUAL]
_Categoría: [platform|client|ecosystem|core-business]_
_Plataforma/Cliente: [nombre]_
_Versión: v1.0 · Fecha: [fecha] · Estado: [draft|approved]_
_ID Supabase: [manual_id]_

## QUÉ ES
Una línea. Sin ambigüedad.

## CUÁNDO USAR
Condiciones específicas que activan este manual.
Lista concisa.

## PRE-REQUISITOS
Lo que debe existir antes de ejecutar.

## LIMITACIONES CONOCIDAS
Lo que NO puede hacer esta solución.
Especialmente: limitaciones de API, plan, permisos.

## PROCEDIMIENTO
Pasos exactos en orden.
Incluir comandos reales donde aplica.

## ERRORES CONOCIDOS
| Error | Causa | Solución |
|-------|-------|---------|
| [error] | [causa] | [solución exacta] |

## CASOS CALIBRADOS
Referencias a professor_decision_cases en Supabase.

## VARIACIONES POR CLIENTE
Solo si aplica. Diferencias específicas.

## CHANGELOG
| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | [fecha] | Creación inicial |
```

---

## FASE 5 — DECISION_MATRIX.md COMPLETO

```markdown
# DECISION_MATRIX v1.0
_Unreal>ille Studio · Operativo desde: 2026-05-17_
_Backend: Supabase professor_weights + professor_veto_rules_

## MECANISMO DE EVALUACIÓN

Antes de ejecutar cualquier output relevante, evalúo:

### PASO 1 — VETO ABSOLUTO (no se pondera, es binario)
Si cualquiera de estas condiciones está presente → PARAR sin cálculo:

| Código | Condición | Bypass Sam |
|--------|-----------|------------|
| V1 | Consecuencia legal irreversible (B2 + C1) | NO |
| V2 | Daño a persona vulnerable | NO |
| V3 | Violación compliance hard de marca | NO |
| V4 | Acción explícitamente fuera de límites por Sam | NO |

### PASO 2 — BYPASS DE SAM
Si Sam declara explícitamente:
- Conoce el riesgo
- Asume la consecuencia
- La decisión NO activa veto absoluto
→ EJECUTAR y registrar en professor_sam_bypasses

### PASO 3 — TAXONOMÍA (identificar dimensiones activas)

**DIMENSIÓN A — Stakeholder primario afectado**
- A1: Cliente final
- A2: Partner/asociado (Patricia, distribuidores, familia)
- A3: UNRLVL como negocio
- A4: Sam como persona

**DIMENSIÓN B — Tipo de consecuencia**
- B1: Financiero
- B2: Legal/regulatorio ⚠️
- B3: Reputacional
- B4: Operativo
- B5: Relacional

**DIMENSIÓN C — Reversibilidad**
- C1: Irreversible ⚠️
- C2: Reversible con costo alto
- C3: Reversible con costo bajo
- C4: Completamente reversible

**DIMENSIÓN D — Horizonte temporal**
- D1: Impacto inmediato
- D2: Impacto medio plazo
- D3: Impacto largo plazo

### PASO 4 — DECISIÓN

Consulto professor_weights en Supabase con las dimensiones activas.

| Score | Acción |
|-------|--------|
| Bajo | PROCEDER con autonomía |
| Medio-bajo | PROCEDER declarando limitación |
| Medio-alto | CONSULTAR a Sam antes de ejecutar |
| Alto | PARAR. No ejecutar hasta tener contexto completo |

### CÓMO LO DECLARO EN CONVERSACIÓN
"[Matriz]: contexto [dimensiones] → [acción] — [razón en una línea]"

Ejemplos:
"[Matriz]: B2+C1 → VETO V1 activo → PARAR"
"[Matriz]: skill incompleto + output externo → DECLARAR gap antes de ejecutar"
"[Matriz]: Sam bypass activo → EJECUTAR + registrar"

## CASOS CALIBRADOS
Ver professor_decision_cases en Supabase.
Ver también: knowledge/ecosystem/decision-matrix/CASES.md

## VERSIONES
| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Creación inicial — taxonomía A+B+C+D + vetos + bypass Sam |
```

---

## FASE 6 — PROFESSOR_PROTOCOL.md

```markdown
# PROFESSOR PROTOCOL v1.0
_Unreal>ille Studio · Operativo desde: 2026-05-17_

## COMANDOS

### Durante la sesión
- `"Professor, anota"` → captura contexto inmediato + añade a lista temporal
- Checkpoint automático cada 10 mensajes → micro-revisión silenciosa

### Final de sesión
1. `Actualiza` → archivos operativos + session_log
2. `Professor` → consolida aprendizajes + propone lista para aprobación Sam
3. Commit único

## FILTRO DE RELEVANCIA (3 criterios en cascada)

**F1 — ¿Es reproducible?**
¿Útil en situación futura similar, en este u otro cliente?
NO → descartar · SÍ → F2

**F2 — ¿Corrige error o establece patrón?**
Error corregido → CASES de DECISION_MATRIX
Patrón nuevo → MANUAL nuevo
Optimización → actualizar MANUAL existente

**F3 — ¿Específico de cliente o transversal?**
Específico → knowledge/clients/[Cliente]/
Transversal → knowledge/core-business/[categoría]/
Plataforma → knowledge/platforms/[plataforma]/

## FORMATO DE PROPUESTA AL FINAL DE SESIÓN

"Sam, estos son los aprendizajes de hoy:

[1] APROBAR / RECHAZAR / MODIFICAR
Aprendizaje: [descripción en una línea]
Categoría: [platform|client|ecosystem|core-business]
Destino: [path exacto en knowledge/]
Tipo: [error_known|pattern|manual_new|manual_update|decision_case]

[2] ..."

## ESTRUCTURA knowledge/ (por prioridad de consulta)

knowledge/
  _templates/          ← templates universales
  ecosystem/           ← soluciones inhouse UNRLVL
  platforms/           ← herramientas de terceros
  clients/             ← específico por cliente
  core-business/       ← conocimiento transversal

## CHECKPOINT CADA 10 MENSAJES

Claude ejecuta silenciosamente:
1. Revisa los últimos 10 mensajes
2. Aplica F1 → si no hay nada reproducible, continúa sin output
3. Si hay candidatos: añade a lista temporal interna
4. No interrumpe el flujo de trabajo
5. Lista se consolida en comando Professor final
```

---

## FASE 7 — INTEGRACIÓN EN SESSION_PROTOCOL

### Cambios al SESSION_PROTOCOL.md existente

**Añadir al inicio (después de carga de ecosystem.json):**
```
4. Edge Function: professor-get-context → carga pesos + variables activas
5. Confirmar: "Contexto operativo cargado. [N] variables de plataforma. 
   [N] aprendizajes pendientes de aprobación."
```

**Añadir sección de comandos:**
```
## COMANDOS PROFESSOR
- "Professor, anota" → captura aprendizaje inmediato
- "Professor" (final sesión) → consolida + propone lista
- Checkpoint automático cada 10 mensajes (silencioso)
```

**Añadir al final (después de "Actualiza"):**
```
## CIERRE DE SESIÓN
1. Actualiza → archivos operativos
2. Professor → aprendizajes (Sam aprueba/rechaza)
3. Commit único con todos los archivos
```

---

## ORDEN DE IMPLEMENTACIÓN

### Sprint 1 — Base de datos (1 sesión)
- [ ] Crear 9 tablas en Supabase con schema completo
- [ ] Insertar seed data: criterios, vetos, casos iniciales, variables conocidas
- [ ] Verificar índices y performance

### Sprint 2 — Edge Functions (1 sesión)
- [ ] professor-get-context
- [ ] professor-evaluate-decision
- [ ] professor-log-case
- [ ] professor-submit-learning
- [ ] professor-approve-learning
- [ ] professor-checkpoint

### Sprint 3 — Archivos Vercel (1 sesión)
- [ ] Crear estructura knowledge/
- [ ] MANUAL_TEMPLATE.md + CASE_TEMPLATE.md
- [ ] DECISION_MATRIX.md completo
- [ ] PROFESSOR_PROTOCOL.md
- [ ] Primeros manuales: agent-browser, klaviyo, judge-me, shopify

### Sprint 4 — Integración SESSION_PROTOCOL (1 sesión)
- [ ] Actualizar SESSION_PROTOCOL.md con nuevos comandos
- [ ] Actualizar ecosystem.json con nuevas rutas
- [ ] Test completo del flujo inicio→durante→final
- [ ] Primera sesión real con sistema activo

---

## NOTAS IMPORTANTES PARA IMPLEMENTACIÓN

1. **Contexto limpio:** Iniciar cada sprint en sesión nueva con este plan como primer documento cargado.

2. **GRANTs Supabase:** Aplicar `GRANT ALL ON professor_* TO service_role` después de crear tablas.

3. **No mezclar sprints:** Cada sprint tiene un entregable concreto y verificable antes de pasar al siguiente.

4. **El Professor no es autónomo en publicación:** Siempre propone, Sam aprueba. La autonomía está en la detección y el formateo.

5. **Veto absoluto no se negocia:** V1-V4 no tienen bypass, ni siquiera Sam puede anularlos.

6. **Bypass de Sam se registra siempre:** Incluso cuando Sam asume el riesgo conscientemente, queda en professor_sam_bypasses para calibración futura.
