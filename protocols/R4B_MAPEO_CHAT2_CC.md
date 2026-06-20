# R4B + OBSERVABILIDAD — MAPEO PARA CHAT 2 + CC
### Paquete de arranque paralelo. Todo MENOS #5i (que se trabaja en el chat principal). Estado vivo verificado 2026-06-19.
_Autor: Claude (chat principal) · Destinatarios: Chat 2 (dirige) + CC (ejecuta) · Marca: UNRLVL/Lucien (IID core)_

---

## 0. CONTEXTO Y REGLA DE ORO

R4B = **Scheduler + endurecimiento del Watcher + deuda de flujo + observabilidad de output**. El motor de generación (Builder+Watcher+output Lote A) ya está cerrado y validado. Esto construye la capa que decide QUÉ se publica, CUÁNDO, y endurece el guardia de calidad.

**REGLA DE ORO DEL SCHEDULER (decisión Sam, 2026-06-19 — Interpretación A):**
> La cadencia es **por-marca-por-plataforma**, NO por-dominio. `brand_topics.cadence` define el VOLUMEN TOTAL de esa marca en esa plataforma (ej. "Lucien en meta_ig mes 1 = 2x/semana"). Los múltiples dominios de una marca **ROTAN dentro** de esos slots, no los multiplican. El Scheduler lee la cadencia UNA vez por (marca, plataforma, fase) y reparte los dominios activos en los slots disponibles. NUNCA suma cadencia entre dominios.

Ejemplo: Lucien tiene 3 dominios (ai-cognition, ai-identity, human-essence) y meta_ig 2x/semana en mes 1 → el Scheduler publica 2 posts/semana en IG de Lucien TOTAL, rotando entre los 3 dominios (~cada dominio sale 1 vez cada 1.5 sem). NO 6 posts/semana.

**Nota de modelado:** hoy `cadence` está replicada idéntica en cada fila de dominio de `brand_topics` (a propósito, fase de pruebas). El Scheduler debe leerla como valor de marca, no multiplicar. Refactor futuro (post-pruebas): mover cadence a tabla `brand_cadence` (brand_id+plataforma+fase→freq). NO hacer el refactor ahora — no bloquear julio.

---

## 1. ESTADO VIVO VERIFICADO (2026-06-19, chat principal)

**Disparo actual (cron.job):**
- **jobid 29** = `content-dispatcher` cada 30 min (`*/30 * * * *`) — tiene el `.limit(1)`. Dispara lo que haya en queue SIN criterio de cadencia/timing. **Aquí se inserta R4B.**
- jobids 2-28 = crons IID research/process (alimentan la queue con findings). NO tocar.
- jobid 30 = copylab-processor cada minuto. jobid 32 = unrlvl-media cleanup (12 días, Lote A). NO tocar.

**brand_topics (insumo del Scheduler) — cadence 100% poblado en las 9 filas activas fase 1:**
- LucienSael: ai-cognition, ai-identity, human-essence. Plataformas: x, meta_fb, meta_ig, tiktok, blog. Cadence crescendo: blog 1x/1x/2x · x 2x/3x/4x · meta_fb 2x/3x/4x · meta_ig 2x/3x/4x · tiktok 1x/2x/3x (mes1/mes2/mes3+). **tiktok preparado pero arranca 1a semana julio (VideoLab).**
- UnrealvilleStudio: ai-cognition + 5 Tier1 (ai-industrialization, brand-voice-systems, context-engineering, cro-psychology, signal-learning-loops). Plataformas: linkedin, meta_fb, meta_ig. Cadence 2x/3x/4x todas.
- UNRLVL/system-proof: rollout_phase=2, active=false (no entra hasta fase 2).
- `sibling_stagger=true` SOLO en ai-cognition (Lucien + UNRLVL) — es el par hermano a desfasar.
- 2 angles NULL en Lucien (ai-identity, human-essence) → eso es #5i, NO lo toca chat 2.

**Watcher actual (intel.watcher_log):** embebido en `content-run-stage` stage 5. result ∈ {PASS, REJECT}. Columnas: job_id, queue_id, brand_id, domain, voice_id, result, failed_gate, gate_detail(jsonb). Histórico: 5 PASS, 4 REJECT evidence, 1 REJECT duplication.

**orchestrator_jobs + content_pieces (content schema) — para 5e-5:**
- NINGUNA tiene columna `domain` (vive en assets.builder_input.domain jsonb).
- NINGUNA tiene columna `scheduled_for` — **el Scheduler la necesita para poder desfasar/programar. Hallazgo: hay que añadirla.**
- orchestrator_jobs: queue_id, finding_id, brand_id, voice, platform, status, created_at.
- content_pieces: + queue_id, finding_id, brand_id, voice, platform, status, created_at, assets(jsonb), published_at, post_url, icr_passed, aife_passed.

---

## 2. SPRINT R4B — 5 ÍTEMS (orden recomendado)

### 5e-1 — SCHEDULER R4B CORE (el cerebro · prioridad máxima)
**Qué hace:** decide qué (marca, dominio, plataforma) se encola y para cuándo, respetando cadence + jitter + sibling_stagger + crescendo. Se inserta ANTES del content-dispatcher (jobid 29).

**Lógica requerida:**
1. **Lee `brand_topics`** filas active=true + rollout_phase ≤ fase_actual.
2. **Resuelve la fase temporal de cada marca** (mes 1/2/3+) desde una fecha de inicio de rollout por marca (NUEVO dato — ver §2.bis). Selecciona el bloque de cadence correspondiente (month_1/month_2/month_3plus).
3. **Aplica Interpretación A:** por cada (marca, plataforma), lee la cadencia UNA vez (no por dominio). Calcula cuántos slots/semana tocan.
4. **Reparte los dominios activos de esa marca** en los slots (rotación equitativa; lleva control de cuál dominio salió por última vez para no repetir).
5. **Jitter:** no programa a horas redondas. Aplica desfase aleatorio (ej. ±X min/horas dentro de una ventana de publicación natural por plataforma).
6. **sibling_stagger:** para topics con sibling_stagger=true (ai-cognition Lucien+UNRLVL), garantiza que las dos marcas NO publiquen el mismo finding/tema en la misma ventana — separa por un mínimo configurable (ej. ≥48h).
7. **Crescendo:** el aumento mes→mes lo da el bloque de cadence (month_1→2→3plus); el Scheduler solo selecciona el bloque por fecha. No hardcodear el crescendo.
8. **Escribe `scheduled_for`** en orchestrator_jobs (o en la queue) para cada pieza programada. El content-dispatcher (jobid 29) recoge solo las que tienen scheduled_for ≤ now().

**Decisiones para Chat 2 (NO asumir):**
- D-A: ¿el Scheduler es una EF nueva (`content-scheduler`) disparada por su propio cron, o lógica SQL en una función? Recomendación: EF propia + cron dedicado (separación de responsabilidades, testeable).
- D-B: ¿`scheduled_for` va en orchestrator_jobs o en la iid_content_queue? Recomendación: en la queue (el dispatcher ya lee de ahí).
- D-C: ventanas de publicación natural por plataforma (ej. LinkedIn L-V 8-10am; IG mediodía/tarde). Chat 2 define con criterio de Sam (publicista).

**Criterio objetivo:** dado brand_topics actual, el Scheduler genera un calendario semanal donde cada (marca,plataforma) tiene exactamente los slots de su cadence (no ×dominios), los dominios rotan, ningún par sibling_stagger colisiona, y los horarios tienen jitter.

### 2.bis — DATO NUEVO REQUERIDO: fecha de inicio de rollout por marca
El crescendo (mes 1/2/3+) necesita saber CUÁNDO empezó cada marca. NO existe hoy. Añadir `rollout_started_at` (timestamptz, nullable) a brand_topics O una tabla `brand_rollout`. Sam fijará la fecha = 1a semana julio 2026 para el arranque real. Mientras es NULL → modo pruebas (sin crescendo, o mes_1 fijo). **Chat 2 decide dónde vive el dato.**

### 5e-2 — WATCHER gate1+gate5 → pgvector
Migrar similarity (gate1) y duplication (gate5) de cálculo en memoria a pgvector (extensión vector en Supabase). Genera/almacena embeddings de piezas para comparación eficiente. Hoy el cálculo en memoria no escala con volumen. Verificar si pgvector ya está habilitado (`list_extensions`).

### 5e-3 — Gates 2/3 (sibling-window, cadence) de informativos a BLOQUEANTES
Hoy informan, no bloquean. Pasarlos a REJECT cuando fallan. OJO: esto se vuelve crítico CON el Scheduler — el gate cadence valida que no se exceda la cadencia; el sibling-window que las hermanas no colisionen. Son la red de seguridad del Scheduler.

### 5e-4 — Extraer Watcher a EF propia `content-watcher`
Hoy embebido en content-run-stage stage 5. Sacarlo a EF independiente (C2 del plan). content-run-stage la invoca. Preserva los 6 gates idénticos. Beneficio: testeable, versionable, reusable por el Scheduler para pre-chequeo.

### 5e-5 — Promover `domain` a columna + añadir `scheduled_for`
- `domain` text → columna en orchestrator_jobs + content_pieces (hoy en assets.builder_input.domain). Backfill desde el jsonb. El Scheduler y los gates lo necesitan como fuente de verdad indexable.
- `scheduled_for` timestamptz → en la queue/orchestrator_jobs (requerido por 5e-1).
- DDL: ALTER TABLE + backfill + GRANT explícito (RLS: política sola no basta — lección documentada).

---

## 3. OBSERVABILIDAD / CALIDAD DE OUTPUT — 5o/5p/5q (no son R4B, paralelizables)

### 5o — Title viejo en el render de la Content Queue (🟡 ALTA)
**Síntoma:** la pantalla de aprobación muestra el title del FINDING crudo (inglés), no `assets.copy.title` (el title propio por marca que SÍ existe en DB tras Lote A #5h).
**Tarea:** localizar el componente de la Content Queue (frontend, repo Orchestrator/Vercel) que renderiza el title → apuntarlo a `assets.copy.title` con fallback al finding si null. Es fix de FRONTEND, no de EF.
**Criterio:** la cola muestra "El modelo no piensa. Distribuye probabilidad." (title de marca), no el finding inglés.

### 5p — Imagen desconectada del contenido (🟡)
**Síntoma:** imagelab produce imagen (CDN OK) pero el PROMPT de imagen no está anclado al contenido → genérica (atril de laptop para post de reasoning models).
**Tarea:** en el stage imagelab de content-run-stage, anclar el prompt de imagen al copy/título/dominio de la pieza (pasar el título o un resumen semántico como seed del prompt, no solo el preset). Revisar cómo se construye hoy image.prompt_summary.
**Criterio:** la imagen refleja el tema de la pieza, no un genérico de stock.

### 5q — Idioma title vs cuerpo (🟢, liga 5o)
**Síntoma:** title render inglés (finding) vs cuerpo español.
**Tarea:** se resuelve solving 5o (el title ES propio ya existe). Verificar adicionalmente que el Builder nunca emita title en idioma distinto al cuerpo. Probablemente 0 trabajo extra tras 5o.

---

## 4. GOBERNANZA PARA CC (idéntica a Lote A)
- Ruta B: UPDATE in-place de EFs deployadas (fuente de verdad = EF deployada; resultó LEGIBLE vía get_edge_function en Lote A, confirmar de nuevo).
- DDL (5e-5): migration con ALTER + backfill + GRANT explícito. Presentar a Sam antes de aplicar.
- NO auto-mergear. NO escribir en unrlvl-context. NO quitar el `.limit(1)` (eso es #5f, solo tras publicación real).
- Cada I/O externo en try/catch con captura a error_log.
- Reportar contra criterios objetivos con query/log por ítem. Sam confirma antes de cerrar.

## 5. ORDEN SUGERIDO DE EJECUCIÓN
1. 5e-5 primero (DDL: domain + scheduled_for) — desbloquea al Scheduler y a los gates.
2. 5e-1 Scheduler core (el grueso).
3. 5e-4 extraer content-watcher + 5e-2 pgvector + 5e-3 gates bloqueantes (endurecimiento, en bloque).
4. 5o/5p/5q en paralelo (frontend 5o + imagelab 5p son independientes del Scheduler).

**NADA de esto toca el genoma de Lucien ni los angles NULL — eso es #5i, chat principal. Cero colisión de superficie: R4B toca Scheduler/Watcher/columnas/frontend; #5i toca brand_topics.angle + brand_voice_genome de Lucien.**

_FIN — R4B Mapeo Chat 2 + CC · 2026-06-19_
