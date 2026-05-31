# PLAN — Sesión Context System Refactor

**Estado:** BOCETO — no ejecutar hasta sesión dedicada
**Fecha boceto:** 2026-05-31
**Riesgo:** ALTO — toca la fuente de verdad y el arranque de sesiones. Hacer con foco, no al vuelo.
**Primer paso obligatorio de la sesión:** `ecosystem audit` (modo identificativo) para mapear qué consume cada archivo ANTES de tocar un campo.

---

## OBJETIVO

Dos mejoras independientes pero relacionadas:
1. **Adelgazar `ecosystem.json`** separando estado estructural (permanente) de estado volátil (caduca).
2. **Catálogo de Capacidades** en el arranque — Claude sabe qué herramientas existen y cómo invocarlas, sin cargarlas todas.

---

# MEJORA 1 — Refactor ecosystem.json

## Diagnóstico
El ecosystem.json (19KB) mezcla 3 vidas útiles:
- **Estructural permanente** (cambia poco): studio, brands identidad, labs+vercel_id, infra, supabase, flujo pipeline, agents.
- **Volátil operativo** (caduca rápido): pending_fixes, key_achievements por sesión, gaps por marca, scores con fecha, to-dos.
- **Agenda** (duplicada en AGENDA.md): next_session_agenda.

El archivo es append-only disfrazado de snapshot. Por eso crece y acumula obsoleto (hoy: blocker fantasma NSCF, pending_fixes ya resueltos).

## Principio de separación POR VIDA ÚTIL

| Tipo de dato | Hoy vive en | Debe vivir en |
|---|---|---|
| Labs, vercel_ids, MCPs, repos, flujo pipeline | ecosystem.json | ecosystem.json (se queda — es la columna vertebral) |
| Identidad de marca (mercado, dominio, tipo) | ecosystem.json | ecosystem.json (se queda, sin el to-do) |
| pending_fixes / gaps por marca | ecosystem.json | `brands/[Marca]/session_log.md` |
| key_achievements de cada sesión | ecosystem.json `_meta` | `protocols/session_log.md` + session_log de marca |
| next_session_agenda | ecosystem.json + AGENDA.md | solo `AGENDA.md` |
| Scores de auditoría con fecha | ecosystem.json | session_log de la marca |

## ecosystem.json objetivo (estructura adelgazada)

```
_meta            → version, previous, last_session (SOLO fecha + 1 línea de status, SIN key_achievements largos)
studio           → permanente
lucien_sael      → identidad permanente (sin web_status volátil — eso a session_log)
brands[]         → SOLO: id, name, type, market, domain, status, health, + IDs estables (vercel/meta/shopify)
                   NADA de: pending, gaps, scores con fecha, notas de sesión
labs{}           → permanente: url, repo, framework, ai, status, version, vercel_id
pipeline_orchestrator → flujo + estado estructural (sin pending_fixes resueltos)
iid_subsystem    → estructura permanente (schema, tablas, EFs) sin conteos volátiles
supabase{}       → IDs + schemas (sin "new_2026-XX" que caduca)
infrastructure[] → permanente
agents{}         → permanente
ayra{}           → sprints (es plan, semi-permanente)
```

Todo lo que sale de ecosystem.json NO se borra — se mueve a su session_log correspondiente, donde su caducidad no contamina la fuente estructural.

## CAUTELA CRÍTICA
- El skill `ecosystem-updater` asume la estructura actual → **hay que actualizarlo** o rompe "Actualiza".
- El HRD de arranque carga ecosystem.json → verificar que la estructura nueva siga sirviendo al arranque.
- Regenerar ecosystem.md / filemap / graph desde la estructura nueva.

---

# MEJORA 2 — Catálogo de Capacidades en arranque

## Diagnóstico
El SESSION_PROTOCOL ya tiene las piezas pero DISPERSAS en 5 secciones (Paso 4 skills, HRDs, COMANDOS, AGENTES, REFERENCIA URLs). Falta UNA vista unificada "qué tengo y cómo lo invoco". Y faltan capacidades sin catalogar: los MCPs (Meta, Shopify, Supabase) y los flujos del pipeline como capacidad invocable.

`skills/INDEX.md` ya es medio catálogo pero solo cubre skills.

## Propuesta: archivo nuevo `CAPABILITIES.md` cargado en arranque

Liviano, solo punteros (qué + cuándo + dónde + qué preguntar). NO carga contenido. Una línea por capacidad. Se carga como paso 3.5 del arranque (después de INDEX, antes de la pregunta de marca).

### Estructura del CAPABILITIES.md

```
## AUDITORES (preguntar modo antes de ejecutar)
| Capacidad | Disparador | Pregunta obligatoria | Dónde |
| gh-auditor | "revisa repo / archivos" | "¿identificativo o contextual?" | skills/github-auditor |
| ecosystem-auditor | "ecosystem scan/audit" | "¿identificativo o contextual?" | skills/ecosystem-auditor |
| shopify-auditor | "audita tienda" | (severo — corre full) | skills/shopify-auditor |

## MCPs CONECTADOS (server-side, ya disponibles)
| MCP | Para qué | Notas |
| Meta MCP | publicar IG/FB, ads, insights | brand_id mapping; list_brands |
| Shopify MCP | productos, colecciones, temas, órdenes | B2C token real |
| Supabase MCP | SQL, EFs, schemas, logs | proyecto amlvyycfepwhiindxgzw |

## FLUJOS OPERATIVOS (cómo funcionan, no cargar hasta usar)
| Flujo | Qué hace | Disparo |
| Pipeline v22 | Claude→lab_jobs→lab-worker→CopyLab+ImageLab→approve→Meta MCP | INSERT lab_jobs |
| IID subsystem | research diario→queue→dispatch (schema intel) | cron (research) |
| Professor | learnings/checkpoint/decision-matrix | "Professor" |

## SKILLS (referencia rápida — detalle en INDEX.md)
content-pipeline · ui-ux-layer · agent-builder · security · cost-layer · image-processing · ads-mcp · higgsfield · agent-browser

## AGENTES AUTÓNOMOS
Social Media Agent · ForumPH Speaks · DDMV · ForumPH Document Factory

## REGLA
Claude NO carga ninguna de estas en el arranque. Solo SABE que existen.
Las carga/invoca cuando la tarea lo requiere, haciendo la pregunta obligatoria si la capacidad la tiene.
```

## Integración en el arranque (HRD_PROTOCOLO_ACTUALIZACION)
Paso 1 actual carga: ecosystem.json + AGENDA + INDEX.
**Añadir:** `4. CAPABILITIES.md` (liviano).
Confirmación de arranque pasa a mencionar: "Catálogo de capacidades disponible."

## Por qué archivo nuevo y no meter en INDEX o ecosystem
- INDEX.md es solo skills — ampliar su scope lo desvirtúa.
- ecosystem.json es estructural y queremos adelgazarlo, no engordarlo con un catálogo operativo.
- CAPABILITIES.md tiene un trabajo claro: "qué puede hacer Claude y cómo se invoca". Vive aparte, se carga liviano.

---

## ORDEN DE EJECUCIÓN (sesión delicada)

1. `ecosystem audit` identificativo → mapear dependencias reales.
2. Construir CAPABILITIES.md (Mejora 2 — más simple, menos riesgo, valor inmediato).
3. Actualizar HRD_PROTOCOLO_ACTUALIZACION para cargarlo.
4. Refactor ecosystem.json (Mejora 1 — mover volátil a session_logs).
5. Actualizar ecosystem-updater skill a la estructura nueva.
6. Regenerar derivados (ecosystem.md, filemap, graph, AGENDA).
7. Test de arranque: simular "protocolo actualización" y verificar que todo carga.

## DEFINITION OF DONE
- [ ] ecosystem.json adelgazado, solo estructural, valida.
- [ ] Volátil migrado a session_logs (nada perdido).
- [ ] CAPABILITIES.md vivo y cargado en arranque.
- [ ] ecosystem-updater actualizado a estructura nueva.
- [ ] Arranque probado end-to-end sin romperse.
- [ ] Derivados regenerados.

---

# MEJORA 3 — Estándar de nomenclatura de entregables (HRD_ACTUALIZA)

## Problema
Cuando un paquete de "Actualiza" tiene varios `session_log.md` en subcarpetas distintas, Sam los ve todos con el mismo nombre y debe abrir cada uno para saber su destino. Esto causó el 2026-05-31 que un session_log se ubicara mal (terminó en protocols/ contenido de OPS) y que Claude generara un protocols/session_log.md inexistente.

## Regla a estandarizar en HRD_ACTUALIZA
1. **Prefijo de carpeta destino en el nombre del entregable.** Cada archivo del paquete se nombra `[carpeta]_[archivo]`, ej: `LucienSael_session_log.md`, `protocols_session_log.md`. Sam renombra quitando el prefijo antes de subir.
2. **Tabla de mapeo origen→destino obligatoria** en el README del paquete: archivo del paquete | renombrar a | carpeta destino | acción (crear/append/reemplazar).
3. **Nunca generar un archivo sin verificar primero su destino real** en el repo (leer el existente antes de asumir estructura). Si no existe un archivo en esa ruta, confirmar que la ruta es correcta antes de crearlo.

## Por qué importa
El sistema no debe depender de que Claude "tenga un buen día" con el mapeo. La nomenclatura prefijada + tabla de mapeo hace el destino inequívoco y el error estructuralmente difícil.
```
