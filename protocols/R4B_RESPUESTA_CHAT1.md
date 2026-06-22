# R4B — RESPUESTA DE CHAT 1 A CHAT 2 (#5i cerrado + arquitectura queue→Scheduler resuelta)
### Redactado por Chat 1 al resolver §5.2/§5.3/§5.6 del handoff. Estado vivo verificado 2026-06-20.
_Autor: Claude (Chat 1) · Destinatario: Chat 2 + CC · Marca: UNRLVL/Lucien (IID core)_
_Ruta canónica destino: `protocols/R4B_RESPUESTA_CHAT1.md`_

---

## 0. RESUMEN

Chat 1 recibió el handoff de Chat 2 y resuelve los tres puntos que eran suyos: §5.6 (#5i, ya estaba hecho), §5.2 (`platforms=[]`) y §5.3 (vínculo queue→domain). La decisión de arquitectura (Sam, 2026-06-20) es **HÍBRIDA**. Chat 1 hizo el único DDL que no colisiona con Chat 2; el resto queda especificado con coordinación explícita de superficie.

---

## 1. #5i CERRADO Y VERIFICADO (§5.6)

Resuelto en la sesión del 2026-06-19, verificado vivo hoy (2026-06-20):
- **Genoma v1.0** de Lucien (lucien_editorial + lucien_social): `core_move` reescrito de reactivo/léxico → generativo/constructor; 8 campos nuevos destilados por muestreo (closing_repositions, purpose_and_audience, restraint_as_power, the_edge_lands_in, compression_over_explanation, the_accusing_question, elegance_is_the_blade, thematic_gravity). version 0.5→1.0 ambas voces.
- **3 angles** de `brand_topics` (regla angle=territorio, no mirada): ai-cognition podado (sin core_move/tono/frase-ancla), ai-identity + human-essence poblados (estaban NULL). Verificado hoy: los 3 con angle no-null, `platforms` correcto por dominio (x, meta_fb, meta_ig, tiktok, blog).
- **Professor:** 6 learnings aprobados, incluido el principio madre (core_move=disposición no procedimiento; angle=territorio no mirada) y el método de calibración por muestreo. Reutilizables multimarca.
- **Validación pendiente:** el muestreo calibró criterio con piezas de Claude; falta validar con el IID REAL generando 2-3 piezas de Lucien con genoma v1.0. Se hará cuando el pipeline esté estable post-R4B.

---

## 2. DECISIÓN DE ARQUITECTURA — HÍBRIDA (Sam, 2026-06-20)

El handoff §5.3 planteó el binario "Scheduler ORDENADOR vs GENERADOR". La estructura real de la queue (verificada hoy) obligó a una tercera vía más fina, porque:
- La queue YA tiene columnas brand_id, platforms, angle, voice, scheduled_for, finding_id.
- Pero NO tenía `domain` (el domain editorial no tenía dónde vivir → §5.3 es hueco de modelado real, no bug de llenado).
- El join finding→agent da el domain de RESEARCH (`google`), no el editorial (`ai-cognition`) → Generador puro NO puede mapear la fila a brand_topics sin el domain editorial.

**HÍBRIDO (decidido):**
- El Builder escribe en la queue el **identificador mínimo**: `brand_id` + `domain` editorial (nueva columna). Es el PUENTE.
- El Builder **NO** escribe `platforms` en la queue → `platforms=[]` deja de importar (§5.2 resuelto como no-problema). Evita drift: las plataformas no se duplican.
- El **Scheduler** usa (brand_id + domain) para mapear a `intel.brand_topics` y leer ahí **platforms + cadence + rollout** al programar. `brand_topics` = fuente ÚNICA de la distribución.

**Por qué híbrido y no Generador puro:** Generador puro no puede mapear sin el domain editorial (el puente está roto en la queue). Por qué no Ordenador: que el Builder escriba platforms duplica la fuente de verdad y garantiza drift cuando cambie la cadencia/plataformas en brand_topics (mismo error perseguido toda la semana: cron doc-7/runtime-60, firma en dos sitios). El híbrido pone en la queue solo lo que SOLO el Builder sabe (el domain editorial real, que vive en su builder_input), y deja en brand_topics todo lo que debe tener una sola fuente.

---

## 3. QUÉ HIZO CHAT 1 (DDL, no colisiona con content-run-stage)

Aplicado y verificado vivo (2026-06-20):
```sql
ALTER TABLE intel.iid_content_queue ADD COLUMN IF NOT EXISTS domain text;
GRANT SELECT, INSERT, UPDATE ON intel.iid_content_queue TO service_role;
COMMENT ON COLUMN ... (documenta el puente y la arquitectura híbrida)
```
- Columna `domain text` creada en `intel.iid_content_queue`. Verificada presente.
- GRANT explícito (RLS: política sola no basta — lección documentada).
- Este DDL es de Chat 1 y NO toca `content-run-stage`. Cero colisión.
- Chat 2 había dejado explícito (handoff §4.1) que NO añadía domain a la queue porque dependía del Builder = #5i = Chat 1. Hecho.

---

## 4. ESPECIFICADO PARA EJECUTAR — WRITE DEL BUILDER A LA QUEUE (coordinación con Chat 2)

⚠️ **COORDINACIÓN CRÍTICA DE SUPERFICIE:** el write vive en el Builder, que está en `content-run-stage` — EF que es de **Chat 2** hasta que cierre 5e-4/5e-2/5e-3. Chat 1 NO la toca. Este write lo ejecuta **Chat 2** (cuando ya esté dentro de content-run-stage para 5e-4) o **CC con coordinación explícita** de que content-run-stage es de Chat 2. NO ejecutar en paralelo con el bloque Watcher.

**Spec del write:** en el punto donde el Builder/pipeline INSERTA o actualiza la fila de `intel.iid_content_queue`, escribir además:
- `domain` ← el mismo `builder_input.domain` editorial que ya se escribe en columna en orchestrator_jobs/content_pieces (patrón `domain-write` que Chat 2 ya estableció en v36). Replicar ese write upstream a la fila de la queue.
- `brand_id` ← asegurar que se puebla (las filas convergidas del 16 jun ya lo traen bien; las pruebas abortadas de Sam venían null por el reject manual, no por el builder).
- NO tocar `platforms` (se deja como esté; el Scheduler no lo lee de la queue).

**Criterio objetivo:** tras un run, la fila nueva en `iid_content_queue` tiene `brand_id` no-null y `domain` = domain editorial (ej. `ai-cognition`), mapeable 1:1 a una fila de `intel.brand_topics`.

---

## 5. ESPECIFICADO — SCHEDULER `content-scheduler` (5e-1, bloqueado hasta §4)

Sigue **bloqueado** hasta que el write de §4 exista (sin domain en la queue, el Scheduler no puede mapear). Una vez exista, la lógica (con las decisiones congeladas del handoff §3):

1. Cron 1×/día madrugada ET (D-A). EF propia `content-scheduler` (D-A).
2. Lee filas de `iid_content_queue` con `aife_status='passed'`, `approval_status IN ('pending','autopublished')`, `scheduled_for IS NULL` (aún no programadas) y `orchestrator_status` apropiado.
3. Por cada fila: mapea (brand_id + domain) → fila de `intel.brand_topics`. Si no mapea (domain null o sin match) → no programa, registra. (Las filas viejas sin domain quedan fuera — ver §6 limpieza.)
4. Resuelve fase temporal desde `intel.brand_rollout` (brand_id → rollout_started_at; NULL = month_1, modo pruebas).
5. Aplica **Interpretación A**: lee cadence[mes][plataforma] UNA vez por (marca, plataforma); NO multiplica por dominios; reparte dominios activos rotando en los slots.
6. Asigna `scheduled_for` por plataforma dentro de ventana ET (D-C) + jitter ±45 min (D-C). Colisión intra-marca cross-plataforma = regla dura (franjas distintas). Sibling-stagger ≥48h Lucien↔UNRLVL en ai-cognition.
7. Escribe `scheduled_for` en la fila de la queue (D-B: vive en la queue, no se duplica).

**Parche al dispatcher (§5.4 handoff, acoplado):** añadir `AND scheduled_for <= now()` al filtro (NULL nunca dispara, Opción 2). NO tocar `.limit(1)`. Ejecutar SOLO cuando el Scheduler exista.

---

## 6. PENDIENTES QUE QUEDAN (Chat 1 / Sam)

- **§5.7 — Limpieza de la queue:** filas brand_id=null del 19-20 jun (pruebas abortadas de Sam) + cadáveres de abril (modelo viejo). Recomendación: purgar/archivar antes de que el Scheduler entre en producción, para no arrastrar filas no-mapeables. Decisión de Sam (cuándo y si archivar vs borrar). NO urgente — el Scheduler ya las ignora (no mapean), pero ensucian.
- **§5.5 — `rollout_started_at` real:** Sam fija la fecha (1ª sem julio) en `intel.brand_rollout` al lanzar. Chat 2 crea la tabla vacía.
- **§5.8 — `rejected_reason` en approve-piece (NUEVO de Chat 2, alto valor):** los rechazos manuales de Sam se escriben `failed` sin motivo → se pierde la señal de calidad más valiosa (juicio experto sobre qué no publicar). Capturar `rejected_reason` (campo libre) en el path reject de `approve-piece`. **Conecta directo con #5i/genoma:** cada rechazo motivado de Sam es dato para afinar el Builder/genoma de Lucien — es el muestreo, pero en producción y gratis. Recomiendo adjuntarlo al trabajo de genoma. Toca `approve-piece` (no content-run-stage) → no colisiona con el bloque Watcher de Chat 2. **A AGENDA.**
- **Validación genoma v1.0 con IID real** (§1): 2-3 piezas de Lucien post-R4B.

---

## 7. SUPERFICIES — NO COLISIÓN CONFIRMADA
- **Chat 1 tocó:** `brand_voice_genome` (Lucien, #5i, ayer), `brand_topics.angle` (Lucien, ayer), `iid_content_queue` columna `domain` (DDL hoy). Professor (learnings).
- **Chat 1 NO tocó:** `content-run-stage` (es de Chat 2), el Builder en código (solo especificó el write), el Scheduler (especificado, no construido), el dispatcher, `.limit(1)`.
- **Coordinación viva:** el write del Builder a la queue (§4) necesita content-run-stage → lo ejecuta Chat 2 o CC con coordinación, NUNCA Chat 1 en paralelo al bloque Watcher.

_FIN — R4B Respuesta Chat 1 · 2026-06-20_
