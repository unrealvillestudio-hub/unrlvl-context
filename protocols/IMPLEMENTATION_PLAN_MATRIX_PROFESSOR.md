# PLAN DE IMPLEMENTACIÓN
## DECISION_MATRIX + PROFESSOR SYSTEM
## Unreal>ille Studio — Ecosistema UNRLVL
_Generado: 2026-05-17 · Versión: 1.1 · Estado: Implementado — Sprints 1-4 completados_

---

## CONTEXTO Y DECISIONES TOMADAS

### Lo que resuelve este sistema

1. **DECISION_MATRIX:** Elimina decisiones tomadas sin base lógica. Provee criterios objetivos ponderados para que Claude evalúe antes de ejecutar — especialmente en outputs externos, decisiones irreversibles, y situaciones de riesgo.

2. **Professor:** Convierte aprendizajes de sesión en conocimiento institucional operativo. Evita que el mismo problema se resuelva dos veces desde cero. Calibra la DECISION_MATRIX con casos reales.

3. **Supabase como backend:** Los pesos, casos, variables y aprendizajes viven en tablas consultables en tiempo real — no en archivos estáticos que requieren commit para actualizarse.

4. **Cache con TTLs diferenciados:** Los datos que raramente cambian (pesos, veto rules, variables de plataforma) se cachean 24h. Los datos semi-frecuentes (casos recientes, learnings pendientes) se cachean 1h. Los datos que deben ser inmediatos (bypasses, log de decisiones) nunca se cachean.

5. **Conteo de mensajes como trigger:** Cada 10 mensajes Claude ejecuta un micro-checkpoint del Professor — captura aprendizajes del bloque sin interrumpir el flujo.

---

## ARQUITECTURA COMPLETA

```
┌─────────────────────────────────────────────────────────┐
│                    INICIO DE SESIÓN                      │
│  protocolo actualización                                  │
│    → ecosystem.json + AGENDA.md + skills/INDEX.md        │
│    → professor-get-context EF (con cache)                │
│        TTL 24h: weights + veto_rules + criteria          │
│                 + platform_variables                     │
│        TTL 1h:  recent_cases + pending_learnings_count   │
│        Real-time: sam_bypasses (nunca cacheado)          │
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
│    → acumula en professor_learnings (filter_passed)     │
│                                                          │
│  "Professor, anota" — trigger manual de Sam             │
│    → captura el contexto inmediato                      │
│    → llama professor-submit-learning EF                 │
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
│    → consolida lista de professor_learnings             │
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

### Estado: ✅ IMPLEMENTADO — 2026-05-17

### Tablas creadas (9 + 1 cache)

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
  code TEXT NOT NULL,
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
  dimensions_activated TEXT[],
  veto_triggered TEXT,
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
  markdown_path TEXT,
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
  checkpoint_number INTEGER,
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

### Índices

```sql
CREATE INDEX idx_decision_cases_brand ON professor_decision_cases(brand_id);
CREATE INDEX idx_decision_cases_date ON professor_decision_cases(date);
CREATE INDEX idx_learnings_session ON professor_learnings(session_date);
CREATE INDEX idx_learnings_approved ON professor_learnings(approved_by_sam);
CREATE INDEX idx_errors_platform ON professor_errors_known(platform);
CREATE INDEX idx_platform_vars ON professor_platform_variables(platform, brand_id);
CREATE INDEX idx_weights_active ON professor_weights(active);
```

### GRANTs y RLS

Todas las tablas `professor_*` tienen RLS habilitado con política `service_only`:
```sql
-- Patrón aplicado a las 9 tablas:
ALTER TABLE professor_[tabla] ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_only" ON professor_[tabla]
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
GRANT ALL ON professor_[tabla] TO service_role;
```

---

### CACHE STRATEGY

#### Por qué cache

`professor-get-context` se llama al inicio de cada sesión. Los datos que devuelve cambian con frecuencia muy distinta: los pesos y veto rules raramente cambian (cada semanas o meses), los casos recientes cambian varias veces al día. Sin cache, cada apertura de sesión hace 5-6 queries a Supabase. Con cache, la mayoría de aperturas son una sola query a `professor_cache`.

#### Tabla de cache

```sql
CREATE TABLE professor_cache (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  hit_count   INTEGER DEFAULT 0
);

CREATE INDEX idx_professor_cache_expires ON professor_cache(expires_at);

ALTER TABLE professor_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_only" ON professor_cache
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
GRANT ALL ON professor_cache TO service_role;

-- Función de limpieza de entradas expiradas
CREATE OR REPLACE FUNCTION professor_cache_cleanup()
RETURNS INTEGER AS $$
DECLARE deleted_count INTEGER;
BEGIN
  DELETE FROM professor_cache WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
```

#### TTLs diferenciados

| Dataset | Cache key | TTL | Razón |
|---|---|---|---|
| `professor_veto_rules` | `veto_rules` | **24h** | Cambia solo cuando Sam añade veto nuevo |
| `professor_decision_criteria` | `criteria` | **24h** | Taxonomía A/B/C/D — raramente cambia |
| `professor_weights` | `weights` | **24h** | Pesos base — se actualizan con calibración manual |
| `professor_platform_variables` | `platform_vars_[brand_id\|global]` | **24h** | Variables de plataforma confirmadas — estables |
| `professor_decision_cases` recientes | `recent_cases_[brand_id\|global]` | **1h** | Nuevos casos se añaden durante sesiones activas |
| `professor_learnings` pendientes (count) | `pending_learnings_count` | **1h** | Cambia cuando Sam aprueba o llega checkpoint |

#### Sin cache — real-time siempre

| Dataset | Razón |
|---|---|
| `professor_sam_bypasses` | Cada bypass se registra al instante — debe ser visible inmediatamente |
| Escrituras a `professor_decision_cases` | Escritura inmediata via `professor-log-case`, nunca pasa por cache |

#### Invalidación manual

`professor-get-context` acepta `{ force_refresh: true }` para invalidar el cache y recargar todo desde las tablas. Usar cuando:
- Sam añade nuevas variables de plataforma en sesión
- Se actualiza un peso de la matriz
- Se añade un veto rule nuevo

#### Limpieza de entradas expiradas

```sql
SELECT professor_cache_cleanup(); -- devuelve número de filas eliminadas
```

---

### Seed data inicial (inserción 2026-05-17)

**Criterios — 16 rows** (A1-A4, B1-B5, C1-C4, D1-D3)
**Veto rules — 4 rows** (V1-V4, bypass_allowed=false en todos)
**Casos calibrados — 2 rows** (reviews falsas NeuroneSCF + content pipeline sin skill)
**Platform variables — 9 rows** (Klaviyo ×4, Judge.me ×2, agent-browser ×2, Shopify ×1)

**Manuales — 5 rows** (Klaviyo, Judge.me, agent-browser, Shopify, NeuroneSCF Platform Notes)
**Errores conocidos — 10 rows** (distribuidos entre los 4 manuales de plataforma)

---

## FASE 2 — EDGE FUNCTIONS

### Estado: ✅ IMPLEMENTADO — 2026-05-17

### EFs deployadas (6) — proyecto `amlvyycfepwhiindxgzw`

| EF | Versión | Tipo | Claude API | Descripción |
|---|---|---|---|---|
| `professor-get-context` | v3 | Lectura + Cache | ❌ | Carga contexto completo al inicio de sesión. Cache TTL 24h/1h. |
| `professor-evaluate-decision` | v1 | Lógica determinista | ❌ | Evalúa dimensiones contra la matriz. Detecta vetos. Calcula score. |
| `professor-log-case` | v1 | Escritura | ❌ | Registra casos en `professor_decision_cases`. Auto-registra en `professor_sam_bypasses` si hay bypass. |
| `professor-submit-learning` | v1 | Filtro F1→F2→F3 | ✅ Haiku | Procesa aprendizaje candidato con scoring. Guarda en `professor_learnings`. |
| `professor-approve-learning` | v1 | Escritura | ❌ | Sam aprueba/rechaza ítem. Actualiza `approved_by_sam`. Crea manual si hay `manual_path`. |
| `professor-checkpoint` | v1 | Detección automática | ✅ Haiku | Cada 10 mensajes. Escanea bloque. Guarda candidatos score ≥ 3. |

### Autenticación

Todas las EFs usan `verify_jwt: false` + custom secret via header `Authorization`.
Secret: variable de entorno `PROFESSOR_SECRET` en Supabase → Settings → Edge Functions → Secrets.
**El secret debe configurarse manualmente en el Dashboard — no requiere redeploy de EFs.**

### Llamadas desde Claude en sesión

```
Inicio de sesión:
  POST .../professor-get-context
  Body: { brand_id?: string, force_refresh?: boolean }

Antes de acción relevante:
  POST .../professor-evaluate-decision
  Body: { context_description, dimensions: string[], brand_id? }

Al rechazar o ejecutar acción con riesgo:
  POST .../professor-log-case
  Body: { context_description, dimensions_activated[], veto_triggered?,
          bypass_by_sam?, outcome?, correct_decision?, lesson_learned? }

"Professor, anota" (manual):
  POST .../professor-submit-learning
  Body: { raw_learning, brand_id?, session_date?, checkpoint_number? }

Cada 10 mensajes (automático):
  POST .../professor-checkpoint
  Body: { messages_block: string[], brand_id?, checkpoint_number }

Sam aprueba aprendizaje:
  POST .../professor-approve-learning
  Body: { learning_id, approved: boolean, manual_path? }
```

---

## FASE 3 — ARCHIVOS VERCEL (knowledge/)

### Estado: ✅ IMPLEMENTADO — 2026-05-17

### Estructura creada en `unrlvl-context`

```
knowledge/
  _templates/
    MANUAL_TEMPLATE.md          ← template universal para manuales
    CASE_TEMPLATE.md            ← template para casos calibrados

  ecosystem/
    decision-matrix/
      DECISION_MATRIX.md        ← documento narrativo operativo completo
      CHANGELOG.md              ← historial de versiones de la matriz
    professor/
      PROFESSOR_PROTOCOL.md     ← protocolo completo del sistema Professor
      CHECKPOINT_RULES.md       ← reglas del checkpoint automático

  platforms/
    shopify/MANUAL.md           ← limitaciones de plan, variables de tiendas
    klaviyo/MANUAL.md           ← limitaciones API, flow bilingüe, templates
    judge-me/MANUAL.md          ← metafields correctos, dark theme, display:none
    agent-browser/MANUAL.md     ← stdio vs HTTP, Windows terminal separada

  clients/
    NeuroneSCF/
      PLATFORM_NOTES.md         ← config específica: Klaviyo keys, Pixel ID, pendientes
```

### Archivos pendientes de crear (crecen con el uso)

```
knowledge/
  ecosystem/
    decision-matrix/
      CASES.md                  ← generado cuando hay ≥5 casos calibrados
  core-business/
    email-marketing/MANUAL.md   ← cuando haya patrones transversales de email
    ecommerce-patterns/MANUAL.md
    content-pipeline/MANUAL.md
  clients/
    ForumPHs/PLATFORM_NOTES.md  ← cuando haya sesión dedicada con errores conocidos
```

---

## FASE 4 — INTEGRACIÓN SESSION_PROTOCOL

### Estado: ✅ IMPLEMENTADO — 2026-05-17

### SESSION_PROTOCOL.md v12 — cambios respecto a v11

1. **Paso 1 del protocolo de carga** — añadida llamada a `professor-get-context` EF al inicio
2. **Sección DECISION_MATRIX** — documenta que opera en background, cuándo se anuncia, formato de declaración
3. **Sección COMANDOS PROFESSOR** — `"Professor, anota"` + checkpoint automático cada 10 mensajes + `"Professor"` al final de sesión
4. **Comando `ecosystem scan`** — pregunta obligatoria antes de ejecutar: `"Sam, lo quieres identificativo o también contextual?"`
5. **Sección CIERRE DE SESIÓN** — orden correcto: Actualiza → Professor → commit único
6. **Regla de nomenclatura** — añadidos `MANUAL.md`, `DECISION_MATRIX.md`, `PROFESSOR_PROTOCOL.md`
7. **URLs de referencia rápida** — añadidas rutas a DECISION_MATRIX y PROFESSOR_PROTOCOL

---

## NOTAS DE IMPLEMENTACIÓN

### Secret PROFESSOR_SECRET

**Cómo configurarlo:**
Supabase Dashboard → proyecto `amlvyycfepwhiindxgzw` → Settings → Edge Functions → Secrets → Add new secret:
- Name: `PROFESSOR_SECRET`
- Value: string seguro de tu elección

Las EFs leen `Deno.env.get("PROFESSOR_SECRET")` automáticamente. No requiere redeploy. El nombre debe coincidir exactamente.

**⚠️ Si el secret no está configurado:** las EFs responden a cualquier request sin autenticación. Configurarlo es el primer paso antes de usar el sistema en producción.

### Instrucciones para Claude (operativas)

1. **La DECISION_MATRIX no se anuncia cuando todo está bien.** Solo declara `[Matriz]: ...` cuando activa PARAR, DECLARAR gap, o registra bypass.

2. **El checkpoint es completamente silencioso** salvo score = 5, donde inserta una línea: `[Professor: anotado — título]`.

3. **El Professor no publica nada sin aprobación de Sam.** Siempre propone → Sam decide → Claude ejecuta.

4. **Vetos V1-V4 no tienen bypass.** Ni Sam puede anularlos. Si Sam insiste, Claude explica el veto y no ejecuta.

5. **`force_refresh: true`** en `professor-get-context` cuando se actualicen pesos, veto rules, o platform variables en sesión — para que la próxima carga no sirva datos stale del cache.

### Comandos de mantenimiento Supabase

```sql
-- Ver estado del cache
SELECT key, expires_at, hit_count,
       expires_at > NOW() AS active
FROM professor_cache ORDER BY expires_at;

-- Limpiar entradas expiradas
SELECT professor_cache_cleanup();

-- Ver aprendizajes pendientes de aprobación
SELECT id, session_date, brand_id, raw_learning, relevance_score, category
FROM professor_learnings
WHERE filter_passed = true AND approved_by_sam = false
ORDER BY relevance_score DESC, session_date DESC;

-- Ver errores conocidos por plataforma
SELECT platform, error_description, solution
FROM professor_errors_known
ORDER BY platform, created_at;
```

---

## ESTADO FINAL DEL SISTEMA

| Componente | Estado | Detalles |
|---|---|---|
| 9 tablas professor_* | ✅ LIVE | RLS + GRANTs + 7 índices |
| professor_cache | ✅ LIVE | TTL 24h/1h + cleanup function |
| Seed data | ✅ LIVE | 16 criterios + 4 vetos + 2 casos + 9 vars + 5 manuales + 10 errores |
| 6 Edge Functions | ✅ LIVE | professor-get-context v3 con cache |
| knowledge/ estructura | ✅ PENDIENTE COMMIT | 11 archivos generados — Sam commitea vía GitHub Desktop |
| SESSION_PROTOCOL v12 | ✅ PENDIENTE COMMIT | Comandos Professor + ecosystem scan + cierre sesión |
| PROFESSOR_SECRET | ⏳ PENDIENTE SAM | Configurar en Supabase Dashboard antes de usar en producción |
| ecosystem.json | ⏳ PENDIENTE | Actualizar: 63 EFs, nscf-kiosko, sección professor |

---

_IMPLEMENTATION_PLAN_MATRIX_PROFESSOR.md · Unreal>ille Studio · v1.1 · 2026-05-17_
_v1.0 → v1.1: Cache Strategy añadida (professor_cache + TTLs) · professor-get-context v3 · Sprints 1-4 completados_
