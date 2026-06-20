# R4B — PAQUETE DE SPECS PARA CC (alcance Chat 2 acotado)
### Estado vivo verificado 2026-06-20. Gobernanza idéntica a Lote A.
_Autor: Claude (Chat 2) · Ejecuta: CC · Dirige/verifica: Sam · Marca: UNRLVL/Lucien (IID core)_
_Ruta canónica destino: `protocols/R4B_SPECS_CC.md` (Sam renombra al colocar)_

---

## 0. ALCANCE Y LO QUE NO ENTRA

**Entra (Chat 2):** DDL (domain en content-schema + pgvector + índice), extracción del Watcher a EF, gates a pgvector y bloqueantes, fixes de calidad de output 5o/5p/5q + captura de error.

**NO entra (queda a Chat 1 / #5i — ver `R4B_HANDOFF_CHAT1.md`):** construir el Scheduler `content-scheduler`, cerrar `platforms=[]` en la queue, vínculo queue→domain editorial, parche del filtro temporal al dispatcher, poblar `brand_rollout`, angles NULL + genoma Lucien, limpieza de queue.

**Hechos verificados que CC debe asumir como ciertos (no re-litigar):**
- pgvector NO está habilitado (solo pg_cron 1.6.4, pg_net 0.20.0). `CREATE EXTENSION` necesario.
- `content.orchestrator_jobs` y `content.content_pieces` NO tienen `domain`. El valor vive en `assets->'builder_input'->>'domain'` (verificado: `ai-cognition`).
- `scheduled_for` YA existe en `intel.iid_content_queue`. NO crear.
- El flujo corre end-to-end hasta approval; imagen SÍ se genera (`assets.image.url` poblado, bucket unrlvl-media). Los jobs `failed` de junio se cortaron a propósito en approval. NO es bug de imagen.
- El title de marca correcto YA existe en `assets.copy.title` (verificado: _"El modelo no adivina. Muestrea."_). El problema 5o es de RENDER, no de dato.

---

## 1. GOBERNANZA (idéntica a Lote A — INVIOLABLE)
- **Ruta B:** UPDATE in-place de EFs deployadas. Fuente de verdad = EF deployada. Confirmar legibilidad vía `get_edge_function` al abrir (en Lote A fue legible).
- **DDL:** migration con ALTER + backfill + GRANT explícito. **Presentar a Sam ANTES de aplicar.** RLS: política sola no basta.
- **NO** auto-mergear. **NO** escribir en unrlvl-context. **NO** quitar el `.limit(1)` (es #5f).
- **NO tocar** `iid_content_queue` (filas/estructura), Builder, `brand_topics`, genoma. Frontera con #5i.
- Cada I/O externo en try/catch con captura a `error_log`.
- Reportar contra criterios objetivos con query/log por ítem. Sam confirma antes de cerrar cada uno.
- `deploy_edge_function`: `files` = array `{name, content}`; preservar `verify_jwt=false` (`--no-verify-jwt`); re-fetch tras deploy para confirmar versión y estado ACTIVE.

---

## 2. ORDEN DE EJECUCIÓN
1. **5e-5-bis (DDL)** — domain + pgvector + índice. Desbloquea el resto. Presentar a Sam.
2. **5o + 5p + 5q** (calidad de output) — paralelizables, independientes entre sí.
3. **5e-4** (extraer content-watcher) → **5e-2** (gates a pgvector) → **5e-3** (gates bloqueantes). En bloque, en ese orden.

---

## 3. SPECS

### 5e-5-bis — DDL (domain en content-schema + pgvector + índice)
**Migration única. Presentar a Sam antes de aplicar.**

```sql
-- 1. domain como columna (fuente de verdad indexable; hoy en jsonb)
ALTER TABLE content.orchestrator_jobs ADD COLUMN IF NOT EXISTS domain text;
ALTER TABLE content.content_pieces   ADD COLUMN IF NOT EXISTS domain text;

-- 2. backfill desde el jsonb (ruta verificada)
UPDATE content.orchestrator_jobs
   SET domain = assets->'builder_input'->>'domain'
 WHERE domain IS NULL AND assets ? 'builder_input';
UPDATE content.content_pieces
   SET domain = assets->'builder_input'->>'domain'
 WHERE domain IS NULL AND assets ? 'builder_input';

-- 3. pgvector (NO habilitado hoy)
CREATE EXTENSION IF NOT EXISTS vector;

-- 4. índice para el futuro filtro temporal del dispatcher (lo usará Chat 1)
CREATE INDEX IF NOT EXISTS idx_iid_queue_status_sched
    ON intel.iid_content_queue (orchestrator_status, scheduled_for);

-- 5. GRANT explícito (RLS no basta) — ajustar rol al usado por las EFs
GRANT SELECT, UPDATE ON content.orchestrator_jobs TO service_role;
GRANT SELECT, UPDATE ON content.content_pieces   TO service_role;
```
**Criterio objetivo:** `domain` poblado en todas las filas con `builder_input.domain`; `SELECT extname FROM pg_extension WHERE extname='vector'` devuelve 1 fila; índice existe; query de verificación de backfill devuelve 0 filas con domain NULL donde el jsonb sí lo tenía.
**NO** añadir `scheduled_for` (existe). **NO** añadir `domain` a la queue (eso es #5i).

---

### 5o — Title viejo en el render de la Content Queue (FRONTEND/EMAIL)
**Causa raíz localizada (verificada 2026-06-20):** el title que se muestra en la aprobación NO viene del Orchestrator frontend (`JobMonitorModule.tsx` usa `flow.interpretedIntent`; `api/approve-job.ts` solo muestra páginas de estado). **NO existe un mailer separado** (`content-mailer` da 404; el dispatcher `content-dispatcher` solo invoca `content-run-stage` y no maneja Resend ni remitente — solo lee SUPABASE_URL/SERVICE_ROLE_KEY/IID_CRON_SECRET). El email de aprobación se arma y envía **dentro de `content-run-stage`**, en su stage final (ahí vive el subject/cuerpo y la llamada a Resend con remitente `content-approval@unrealvillestudio.com`). Ese email usa el title del FINDING (inglés) en lugar de `assets.copy.title`. **CC: no busques un mailer aparte — el title está dentro de `content-run-stage`.**
**Tarea CC:**
1. `get_edge_function content-run-stage`, grep por el bloque que construye el `subject`/cuerpo del email de aprobación (busca `finding.title`, `subject:`, `iid_findings`).
2. Apuntar el title del email a `assets.copy.title` con fallback al finding si null: `const emailTitle = piece?.assets?.copy?.title ?? finding.title;`
3. UPDATE in-place, re-deploy, re-fetch para confirmar versión.
**Criterio objetivo:** un email de aprobación de prueba muestra el title de marca en español (ej. _"El modelo no adivina. Muestrea."_), no el finding inglés.
**Nota:** si tras inspección el title resultara renderizarse en otro punto (ej. una vista web de cola), reportar a Sam la ubicación real antes de editar — no asumir.

---

### 5p — Prompt de imagen desconectado + captura de error (QUALITY)
**Causa raíz verificada:** la imagen SÍ se genera, pero `prompt_summary` muestra `Preset: (none) (used=false)` — el prompt NO está anclado al contenido. Resultado: imagen genérica respecto al copy/tema.
**Tarea CC (2 partes):**
1. **Anclar prompt al contenido.** En el stage imagelab de `content-run-stage` (o en ImageLab repo `image-lab-unrlvl`, función que construye `image.prompt`), pasar como seed del prompt el `copy.title` + `domain` + un resumen semántico del copy, no solo el preset/canal. Revisar cómo se construye hoy `image.prompt_summary` y de dónde sale el prompt real.
2. **Captura de error (deuda aprobada por Sam).** Envolver la llamada a imagelab en try/catch; ante fallo, escribir el error real en `orchestrator_jobs.error_log` (hoy queda `[]` aunque el job se marque failed). Aplica el patrón a todo I/O externo del stage.
**Criterio objetivo:** (a) una pieza nueva de prueba produce imagen cuyo prompt referencia el tema (no atril/laptop genérico); (b) un fallo forzado de imagelab deja un registro legible en `error_log`, no `[]`.

---

### 5q — Idioma title vs cuerpo (liga 5o)
**Tarea CC:** se resuelve con 5o (el title ES de marca ya existe en `assets.copy.title`). Verificación adicional: confirmar que el Builder nunca emita `copy.title` en idioma distinto al cuerpo. Probablemente 0 trabajo extra tras 5o.
**Criterio objetivo:** title y cuerpo en el mismo idioma en 3 piezas de prueba consecutivas.

---

### 5e-4 — Extraer Watcher a EF propia `content-watcher`
**Hoy:** embebido en `content-run-stage` stage 5. **Objetivo:** EF independiente `content-watcher` que `content-run-stage` invoca.
**Tarea CC:**
1. Localizar el bloque del Watcher (los 6 gates: similarity, sibling-window, cadence, evidence, duplication, hard-rules) en `content-run-stage`.
2. Crear EF `content-watcher` con los **6 gates idénticos** (no cambiar lógica aquí). Entrada: pieza + contexto; salida: `{result, failed_gate, gate_detail}` igual que hoy escribe en `intel.watcher_log`.
3. `content-run-stage` stage 5 pasa a invocar `content-watcher` vía fetch interno y consumir su resultado.
4. `verify_jwt=false`. Re-fetch ambas tras deploy.
**Criterio objetivo:** una pieza que antes daba PASS sigue dando PASS vía la nueva EF; una que daba REJECT evidence sigue dando REJECT evidence; `watcher_log` recibe filas idénticas en forma.

---

### 5e-2 — Gate1 (similarity) + Gate5 (duplication) a pgvector
**Prerequisito:** 5e-5-bis (pgvector habilitado) + 5e-4 (watcher extraído).
**Decisión cerrada (Claude, Chat 2):** embeddings en **tabla aparte `intel.content_embeddings`**, NO como columna en la pieza/queue. Razón: el embedding es artefacto derivado; como columna inflaría cada row con cientos de floats cargados en todo SELECT del Watcher/dispatcher, y ataría el esquema al modelo de embedding. Tabla aparte = índice vectorial propio sin tocar la tabla caliente + versionado del modelo + recálculo independiente. Coste = un JOIN, trivial.
**DDL (presentar a Sam con la migración de 5e-5-bis o aparte):**
```sql
CREATE TABLE IF NOT EXISTS intel.content_embeddings (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  piece_ref   uuid NOT NULL,              -- FK lógica a la pieza/queue evaluada
  brand_id    text,
  domain      text,
  embedding   vector(1536) NOT NULL,      -- ajustar dim al modelo real usado
  model       text NOT NULL,              -- versiona el modelo de embedding
  created_at  timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_content_embeddings_hnsw
  ON intel.content_embeddings USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_content_embeddings_piece
  ON intel.content_embeddings (piece_ref);
GRANT SELECT, INSERT, DELETE ON intel.content_embeddings TO service_role;
```
**Tarea CC:**
1. Aplicar DDL (CC confirma la **dimensión real** del modelo de embedding antes de fijar `vector(1536)` — no asumir; ajustar al proveedor que ya use el ecosistema).
2. Generar embedding por pieza al pasar por el Watcher e INSERT en `content_embeddings`; gate1 (similarity) y gate5 (duplication) calculan distancia vía pgvector (`<=>` cosine) en vez de en memoria.
3. Umbral de similitud/duplicación: preservar el de hoy (extraer del código actual, no inventar). Reportar a Sam el valor encontrado.
**Criterio objetivo:** gate1/gate5 producen el mismo veredicto que la versión en memoria sobre el histórico conocido (5 PASS / 4 REJECT evidence / 1 REJECT duplication), ahora vía pgvector.

---

### 5e-3 — Gates 2/3 (sibling-window, cadence) de informativos a BLOQUEANTES
**Hoy:** informan, no bloquean. **Objetivo:** REJECT cuando fallan.
**Tarea CC:** en `content-watcher`, cambiar gate2 (sibling-window) y gate3 (cadence) para que devuelvan REJECT (no solo log) al fallar, con `failed_gate` correspondiente.
**ADVERTENCIA de dependencia:** estos gates solo tienen sentido pleno CON el Scheduler (que es de Chat 1). El gate cadence valida que no se exceda la cadencia; sibling-window que las hermanas no colisionen. **Hasta que el Scheduler exista, estos gates pueden producir REJECT sobre datos incompletos (ej. platforms=[]).** Recomendación: implementarlos bloqueantes PERO con un flag de activación (`GATES_2_3_BLOCKING=false` por defecto) que Sam/Chat 1 enciende cuando el Scheduler esté vivo. Así el código queda listo sin romper el flujo actual.
**Criterio objetivo:** con flag ON, una pieza que viola cadencia o colisiona con su hermana da REJECT con el `failed_gate` correcto; con flag OFF, comportamiento actual intacto.

---

## 4. RESUMEN DE CRITERIOS DE CIERRE (Sam confirma cada uno)
| Ítem | Criterio | Estado |
|---|---|---|
| 5e-5-bis | domain backfilled + pgvector ON + índice + GRANT | ☐ |
| 5o | email muestra title de marca ES | ☐ |
| 5p-a | prompt imagen anclado al tema | ☐ |
| 5p-b | error real en error_log, no [] | ☐ |
| 5q | title y cuerpo mismo idioma | ☐ |
| 5e-4 | content-watcher EF con 6 gates idénticos | ☐ |
| 5e-2 | gate1/gate5 vía pgvector, veredicto idéntico | ☐ |
| 5e-3 | gates 2/3 bloqueantes con flag, OFF por defecto | ☐ |

_FIN — R4B Specs CC · 2026-06-20_
