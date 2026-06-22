# SESSION LOG — IID (Intelligent Content Distribution)
_Novedad al tope. Histórico preservado abajo._

---

## 2026-06-19/20 — #5i genoma v1.0 + R4B (Chat 1 + Chat 2 + CC, paralelo) · Sam + Claude

### Qué se hizo (3 frentes en paralelo)

**Frente A — #5i Genoma v1.0 de Lucien (Chat 1, 19-jun):**
Destilado por MUESTREO (no por especificación): base v0.6 descontaminada → 10 piezas → Sam marcó 8/10 como Lucien → patrón extraído de las marcas de Sam, no de teoría. core_move reescrito de reactivo/léxico ("desmonta la palabra") a generativo/constructor ("parte de su mirada, aporta, construye"). 8 campos nuevos en brand_voice_genome (lucien_editorial + lucien_social, v0.5→1.0): closing_repositions, purpose_and_audience, restraint_as_power, the_edge_lands_in, compression_over_explanation, the_accusing_question, elegance_is_the_blade, thematic_gravity. 3 angles de brand_topics corregidos (regla angle=territorio, no mirada): ai-cognition podado, ai-identity + human-essence poblados (estaban NULL). Diagnóstico de codificación por CC (read-only, content-run-stage v35): confirmó core_move duplicado (angle + genoma) inyectado en system como regla dura. Validación pendiente: IID real post-R4B.

**Frente B — R4B infra (Chat 2 + CC, 20-jun):**
- DDL 5e-5: domain en orchestrator_jobs + content_pieces (backfill COALESCE), pgvector v0.8.0, índice (orchestrator_status,scheduled_for), GRANT.
- content-run-stage v35→v36: 5o (email title=copy.title), 5q (cae con 5o), 5p-a (seed imagen=título+copy, no slug), domain-write a jobs/pieces.
- content-watcher v1: EF nueva, 6 gates verbatim, verificada aislada (PASS / REJECT-dup / REJECT-evidence).
- content-run-stage v36→v37: 5e-4 (callWatcher AbortController 90s, fail-closed=REJECT watcher_unreachable) + domain-write a iid_content_queue (arquitectura híbrida).
- Hallazgo: queue de 3 generaciones (abril null / 16-jun convergida platforms=[] / 19-20jun pruebas abortadas null). scheduled_for ya existía. dispatcher ignora scheduled_for. error_log=[] mudo venía del reject manual en approve-piece, no de imagelab.

**Frente C — Arquitectura queue + frontera (Chat 1, 20-jun):**
Decisión HÍBRIDA: queue lleva brand_id+domain (puente, escrito por Builder en v37); brand_topics fuente única de platforms/cadence/rollout (leída por Scheduler). Resuelve platforms=[] como no-problema, evita drift. DDL domain en iid_content_queue (Chat 1). Scheduler 5e-1 especificado, bloqueado hasta el write (ahora desbloqueable: write ya en v37). Cadencia Lucien+UNRLVL poblada (Interpretación A).

### Bloqueos (resueltos)
- ✅ 5e-2 DESBLOQUEADO (22-jun): Vertex creds cargados en Supabase por Sam — GOOGLE_SERVICE_ACCOUNT_KEY (JSON del SA imagelab-vercel@gen-lang-client-0491381650) + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION. Nombres verificados por Chat 1. Pendiente solo validar formato del JSON en el primer run de embeddings (modo de fallo: salto de linea en private_key). 5e-2 (pgvector gemini-embedding-001 @768) + 5e-3 listos para Chat 2.

### Pendientes
Scheduler 5e-1 (desbloqueable), parche dispatcher (scheduled_for), publicación real 5b (cierra run E2E + gatilla §5.4), #5r rejected_reason, 5p-b preset Lucien, 5s limpieza queue, validación genoma v1.0 con IID real, rollout_started_at (1ª sem julio).

### Professor
19-jun: 6 learnings #5i (principio madre core_move=disposición no procedimiento; método calibración por muestreo). 20-jun: 15 learnings (8 ya insertados por Chat 2 + 7 insertados por Chat 1 hoy) (spec asume estado inexistente; pgvector dims/Matryoshka; heredar proveedor del stack; slug≠concepto visual; error_log=[] corte humano; rejected_reason señal de calidad; pivotar método ante bloqueo de gobernanza). Todos aprobados.

### Versiones EF al cierre
content-dispatcher v22 · content-run-stage v37 · content-watcher v1 · approve-piece v14 · lab-worker v23.

---

_(histórico anterior preservado en el archivo canónico del repo — esta entrada va AL TOPE)_
