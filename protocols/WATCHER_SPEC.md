# WATCHER — Spec de ejecución para Claude Code
### Stage 5 en `content-run-stage` · Gate obligatorio previo a `pending_approval` · 6 gates del ANTISPAM_CONTRACT
_Versión 1.0 · 2026-06-16 · Autor: Claude (chat) · Ejecutor: Claude Code · Prerequisito DURO del primer publish_

---

## 0. CONTEXTO Y DECISIÓN DE ARQUITECTURA

**Decisión tomada (Sam, 2026-06-16): C1 — Watcher como stage 5 en la máquina de stages existente.**
NO se crea EF separada en el piloto. El Watcher corre **dentro de `content-run-stage`**, después de sociallab (stage 4) y **antes** del INSERT de `content_pieces` + email Resend. Los 6 gates se implementan como **funciones modulares** para poder extraerse a una EF `content-watcher` dedicada (C2) cuando llegue R4B/Scheduler.

**Regla rectora del contrato:** ninguna pieza llega a `pending_approval` (bandeja de Sam) sin pasar el Watcher. El Watcher es lo que evita el autobaneo multimarca. Preferimos no publicar a publicar algo que nos banee.

**Estado verificado (2026-06-16):** no existe ninguna EF Watcher. `content_pieces` no tiene columna de watcher. Greenfield.

**Riesgo que mitiga (contrato §1):** las 3 marcas publican desde el MISMO Business Portfolio Meta y el MISMO System User token (verificado). Cuentas nuevas (0–3 meses) = escrutinio máximo. Dos hermanas publicando contenido percibido como duplicado en ventana cercana puede arrastrar varias cuentas a la vez.

---

## 1. UBICACIÓN EN EL FLUJO

```
stage 1 copylab  → buildFromGenome (ver Builder spec)
stage 2 aife
stage 3 imagelab
stage 4 sociallab
stage 5 WATCHER  ← NUEVO. 6 gates. Decide si la pieza avanza.
   ├─ PASS       → INSERT content_pieces (status=awaiting_approval) + email Resend a Sam   [flujo actual]
   ├─ REJECT     → NO inserta como awaiting. Marca pieza/queue para regeneración. NO email.
   └─ RESCHEDULE → pieza válida, timing no. Marca para que el Scheduler la reubique. NO email aún.
```

**Cambio de control:** hoy `content-run-stage`, al terminar el último stage, inserta `content_pieces` con `status=awaiting_approval` y manda email. **Ese bloque pasa a ejecutarse SOLO si el Watcher devuelve PASS.** El Builder spec deja la pieza construida en `assets`; el Watcher decide.

---

## 2. PERSISTENCIA NUEVA

### 2.1 Tabla de log del Watcher (auditable — contrato §4.3)
Crear `intel.watcher_log`:
```
id              uuid pk default gen_random_uuid()
job_id          uuid              -- content.orchestrator_jobs.id
queue_id        uuid
brand_id        text
domain          text
voice_id        text
result          text              -- 'PASS' | 'REJECT' | 'RESCHEDULE'
failed_gate     text              -- null si PASS; nombre del gate que falló
gate_detail     jsonb             -- resultado por gate (los 6), con score/razón
created_at      timestamptz default now()
```
Todo paso por el Watcher se loguea, gane o pierda. Sin esto no hay auditoría.

### 2.2 Estado en la pieza
Cuando REJECT/RESCHEDULE: NO insertar en `content_pieces` como `awaiting_approval`. Marcar `intel.iid_content_queue.orchestrator_status`:
- REJECT → `watcher_rejected`
- RESCHEDULE → `watcher_rescheduled`
- PASS → sigue el flujo normal (`complete` tras insertar pieza).

---

## 3. LOS 6 GATES (orden obligatorio, contrato §4.2)

Cada gate es una función pura `gateX(piece, ctx) → { pass: bool, detail: {...} }`. Se ejecutan en orden; **el primer REJECT corta** (no se siguen evaluando los siguientes, pero se loguea cuál cortó). RESCHEDULE no corta similarity/evidence pero sí desvía al final.

### Gate 1 — Similarity (R1) — **check semántico vía Claude (decisión Sam)**
- Compara la pieza nueva contra piezas recientes de **marcas hermanas sobre el mismo `domain`** (ventana: últimos 14 días; fuente: `content_pieces` PASS + agendadas).
- Método piloto: llamada a Claude con system "evaluá si estas dos piezas serían percibidas por un humano como el mismo contenido/estructura. Devolvé SOLO un número 0.00–1.00 de similitud percibida y una razón de ≤15 palabras."
- Umbral: **> 0.80 → REJECT** (regenerar con ángulo más divergente).
- Si no hay piezas hermanas en ventana → PASS automático (nada con qué chocar).
- **pgvector/embeddings queda explícitamente para R4B.** En piloto el volumen es bajo (1 pieza por corrida) y el check semántico es suficiente.

### Gate 2 — Sibling-window (R1+R3)
- Solo aplica si `brand_topic.sibling_stagger = true` para ese `(brand_id, domain)`.
- Verifica que NO haya otra pieza de **marca hermana** sobre el mismo `domain` publicada o agendada dentro de **48–72h**.
- Si la hay → **RESCHEDULE** (no REJECT — la pieza es buena, el timing no).
- En piloto (sin Scheduler) RESCHEDULE = marcar `watcher_rescheduled` y avisar a Sam en el reporte; Sam decide cuándo.

### Gate 3 — Cadence (R5)
- Verifica que publicar esta pieza no exceda la cadencia de la fase/plataforma (`brand_topic.cadence`, tabla del contrato §3.4).
- En piloto, sin Scheduler corriendo cadencia automática, este gate es **informativo**: loguea si excedería, pero no bloquea (PASS con flag). En R4B se vuelve bloqueante → RESCHEDULE.

### Gate 4 — Evidence (marca-específico)
- **UNRLVL:** la pieza DEBE contener datos/números (no opinión suelta). Heurística piloto: detectar presencia de cifras/porcentajes/métricas; si cero → REJECT. (Refuerza `hard_rule.evidence_principle`.)
- **Lucien:** verificar que NO viole sus hard_rules → frame übermensch nunca manifiesto, cero mención/tease de libros. Esto se valida vía check semántico de Claude contra `brand_topic.hard_rules`. Violación → REJECT.

### Gate 5 — Duplication (R4)
- Verifica que el mismo `domain` no se haya publicado con texto similar (de la **misma marca**) en la ventana de no-repetición (sugerido: 3 semanas).
- Método: igual que gate 1 pero contra la propia marca. > 0.80 → REJECT.

### Gate 6 — Hard-rules (contrato §4.2.6)
- Valida **todas** las `hard_rules` del `brand_topic` de esa marca/tema (confidencialidades, anti-política, edge_safety_rail, linkedin-no-es-destino-de-Lucien, etc.).
- Esto solapa parcialmente con gate 4 para Lucien — está bien, gate 6 es el catch-all exhaustivo. Una violación de cualquier hard_rule → REJECT.
- Método: check semántico vía Claude, pasando la pieza + el objeto `hard_rules` completo, pidiendo lista de reglas violadas (vacía = PASS).

---

## 4. SALIDAS (contrato §4.3)

```
PASS       → la pieza avanza: INSERT content_pieces (awaiting_approval) + email Resend. [flujo actual intacto]
REJECT     → vuelve al builder (regenerar). Loguear failed_gate + razón. Queue → 'watcher_rejected'. NO email.
RESCHEDULE → válida, timing no. Queue → 'watcher_rescheduled'. NO email aún. Reporte a Sam.
```
Todo resultado se escribe en `intel.watcher_log` con el detalle por gate.

---

## 5. CRITERIOS DE VALIDACIÓN OBJETIVOS

CC debe poder demostrar con query/log:
1. Una pieza on-brand y divergente (Lucien filosófico vs UNRLVL técnico sobre ai-cognition) → ambas PASS gate 1 (similitud < 0.80). **Este es el corazón del piloto: prueba que el Builder diverge y el Watcher lo confirma.**
2. Dos piezas casi idénticas forzadas → la segunda REJECT en gate 1, con `failed_gate='similarity'` en `watcher_log`.
3. Una pieza UNRLVL sin números → REJECT gate 4.
4. Una pieza Lucien que mencione/tease un libro → REJECT gate 6 (o 4).
5. `intel.watcher_log` tiene una fila por cada paso, con `gate_detail` poblado.
6. Ninguna pieza llega a `content_pieces.status='awaiting_approval'` sin una fila PASS en `watcher_log`.

---

## 6. MODULARIDAD PARA R4B (C2)

Los 6 gates se escriben como funciones independientes con firma uniforme `(piece, ctx) → {pass, detail}`, sin estado compartido, para que en R4B se extraigan tal cual a una EF `content-watcher` que el Scheduler invoque. En esa fase:
- Gate 1 y 5 migran de check semántico a pgvector/embeddings.
- Gate 2 y 3 se vuelven bloqueantes reales (RESCHEDULE efectivo, no informativo).
- El Watcher sigue siendo gate obligatorio incluso en modo autónomo (contrato §5).

---

## 7. REGLA DE LANZAMIENTO

- El Watcher es **prerequisito duro**: el primer publish real NO ocurre sin él operativo (contrato §6).
- Se construye DESPUÉS del Builder (necesita piezas reales del Builder para calibrar el umbral de similarity).
- CC entrega vía Ruta B (UPDATE in-place + DDL de `watcher_log` por migración), informa éxito, presenta para confirmación de Sam. NO auto-mergea.

_FIN — Watcher Spec v1.0_
