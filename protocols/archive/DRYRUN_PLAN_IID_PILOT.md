# PLAN DE DRY-RUN — Builder + Watcher (piloto Lucien + UNRLVL)
### Validación controlada ANTES de tocar el `.limit(1)` del dispatcher
_Versión 1.0 · 2026-06-16 · Caso de prueba: multimarca ai-cognition (Lucien filosófico ↔ UNRLVL técnico)_

---

## 0. PRINCIPIO RECTOR

**El `.limit(1)` de `content-dispatcher` NO se toca hasta que este dry-run pase entero.**
Quitarlo antes = el dispatcher procesa los ~283 cadáveres viejos de la queue (filas con `brand_id=null`, `voice='lucien'/'unrlvl'` literal) de golpe → desastre. El dry-run usa **jobs controlados insertados a mano**, no la queue vieja.

Orden obligatorio (Sam, 2026-06-16): **Builder primero → validar con dry-run → Watcher**. El Watcher necesita piezas reales del Builder para calibrar similarity. NO construir en paralelo.

---

## FASE 1 — Builder solo (Watcher aún no existe)

### 1.1 Preparar 2 jobs de prueba controlados
Insertar manualmente en `content.orchestrator_jobs` (NO vía dispatcher, NO desde la queue vieja) DOS jobs sobre el MISMO finding de `ai-cognition`:

| Job | brand_id | domain | format | platform | destino esperado | voice esperada |
|-----|----------|--------|--------|----------|------------------|----------------|
| A | LucienSael | ai-cognition | article | blog | editorial | lucien_editorial |
| B | UnrealvilleStudio | ai-cognition | post | linkedin | social→ (sin hermana) | unrlvl_default |

Usar un `finding_id` real de `intel.iid_findings` sobre cognición IA (o sembrar uno neutro de prueba). `approval_status='pending'`.

### 1.2 Disparar stage 1 manualmente
Invocar `content-run-stage` con `{job_id, stage_order:1}` para cada job. Dejar correr toda la cadena hasta el INSERT de `content_pieces` (Watcher aún no intercepta).

### 1.3 Criterios de PASS de Fase 1 (verificar a ojo + query)
1. Job A log: `destination=editorial`, `voice_id=lucien_editorial`, `voice_version=0.5`. Texto = ensayo filosófico/cultural que respira. NO técnico, NO números. NO menciona libros, NO nombra übermensch.
2. Job B log: `voice_id=unrlvl_default`. Texto = lectura técnico-operativa con números. NO filosófico.
3. **Divergencia a ojo:** las dos piezas NO se perciben como relacionadas (mismo tema, universos distintos). Este es el test que valida los 3 bugs de un golpe — si las piezas salen on-brand y divergentes, el Builder lee brand_topics, resuelve brand+voz, e inyecta genoma correctamente.
4. `content_pieces.voice` = `lucien_editorial` / `unrlvl_default` (NO literales).
5. Job con `brand_id=null` de prueba → `failed`, sin fallback a UNRLVL.

**Si Fase 1 falla** → iterar Builder. NO avanzar a Watcher.

---

## FASE 2 — Watcher (tras Fase 1 verde)

### 2.1 Construir Watcher (spec aparte) y re-correr los mismos 2 jobs
Ahora con stage 5 activo.

### 2.2 Criterios de PASS de Fase 2
1. Ambas piezas (A y B) → **PASS** gate 1 (similitud < 0.80 entre hermanas). Confirma divergencia objetivamente.
2. `intel.watcher_log` tiene 2 filas PASS con `gate_detail` de los 6 gates poblado.
3. Email Resend llega a Sam SOLO para las que pasaron.

### 2.3 Pruebas negativas (forzar REJECT)
4. Duplicar el texto de A en una marca hermana → segunda pieza REJECT gate 1, `failed_gate='similarity'`.
5. Job UNRLVL con texto sin números (forzado) → REJECT gate 4.
6. Job Lucien con tease de libro (forzado) → REJECT gate 6.
7. Verificar: ninguna pieza REJECT generó email ni quedó como `awaiting_approval`.

**Si Fase 2 verde** → Builder + Watcher operativos. Recién aquí se cumple el prerequisito de lanzamiento del contrato.

---

## FASE 3 — Primera corrida real semi-manual (piloto)

Flujo `Sam → Claude → IID → Watcher → aprobación`, sin tocar `.limit(1)` todavía:
- Sam elige un finding real de `ai-cognition`.
- Se insertan jobs Lucien + UNRLVL (caso multimarca con sibling_stagger).
- Gate 2 (sibling-window) debe disparar RESCHEDULE en una de las dos (no publican el mismo día) → validar que el desfase 48–72h se respeta.
- Sam aprueba manual desde el email. Publicación manual (sin Scheduler).

---

## FASE 4 — Limpieza del `.limit(1)` (SOLO tras Fase 3 verde)

1. **Antes de quitarlo:** limpiar/cuarentenar los ~283 cadáveres viejos de la queue (filas `brand_id=null`). NO dejarlos: marcar `orchestrator_status='archived_legacy'` o equivalente para que el dispatcher no los tome.
2. Quitar `.limit(1)` de `content-dispatcher`.
3. Re-test con 2–3 items reales para confirmar que el batch no dispara spam.
4. Recién entonces el dispatcher procesa la queue limpia en volumen.

---

## RESUMEN DE GATES DE SEGURIDAD

| Hito | No avanzar hasta... |
|------|---------------------|
| Builder → Watcher | Fase 1 verde (divergencia a ojo confirmada) |
| Watcher → corrida real | Fase 2 verde (PASS + REJECTs forzados funcionan) |
| Corrida real → quitar limit(1) | Fase 3 verde + cadáveres viejos cuarentenados |
| Cualquier publish real | Builder + Watcher operativos (contrato §6) |

_FIN — Plan de dry-run v1.0_
