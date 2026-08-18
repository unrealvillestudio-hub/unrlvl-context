# PLAN — Sesión Context System Refactor

**Estado:** BOCETO — no ejecutar hasta sesión dedicada
**Fecha boceto:** 2026-05-31 · **Última ampliación:** 2026-06-29 (Mejora 5)
**Riesgo:** ALTO — toca la fuente de verdad y el arranque de sesiones. Hacer con foco, no al vuelo.
**Primer paso obligatorio de la sesión:** `ecosystem audit` (modo identificativo) para mapear qué consume cada archivo ANTES de tocar un campo.

---

## OBJETIVO

Mejoras independientes pero relacionadas:
1. **Adelgazar `ecosystem.json`** separando estado estructural (permanente) de estado volátil (caduca).
2. **Catálogo de Capacidades** en el arranque — Claude sabe qué herramientas existen y cómo invocarlas, sin cargarlas todas. *(Parcialmente hecho — ver nota de estado.)*
3. **Estándar de nomenclatura de entregables** (HRD_ACTUALIZA).
4. **Rediseño del modelo de entidades, tipos y relaciones.**
5. **Sincronización derivada-de-sesión + fuente de verdad de la agenda + Professor + contradicción de protocolos.** *(Añadido 2026-06-29.)*

> **Nota de secuencia transversal (2026-06-29):** la Mejora 5 reabre una pregunta que afecta a la Mejora 1 (¿`next_session_agenda` sale del JSON?) y a la 3 (¿la nomenclatura de entregables sobrevive si CC escribe los context files directo?). El orden de ejecución al final del documento ya está reordenado para que la 5 se decida ANTES de ejecutar la 1.

---

# MEJORA 1 — Refactor ecosystem.json

## Diagnóstico
El ecosystem.json mezcla 3 vidas útiles:
- **Estructural permanente** (cambia poco): studio, brands identidad, labs+vercel_id, infra, supabase, flujo pipeline, agents.
- **Volátil operativo** (caduca rápido): pending_fixes, key_achievements por sesión, gaps por marca, scores con fecha, to-dos.
- **Agenda** (DESINCRONIZADA con AGENDA.md — ver Mejora 5): next_session_agenda.

El archivo es append-only disfrazado de snapshot. Por eso crece y acumula obsoleto (ej. histórico: blocker fantasma NSCF, pending_fixes ya resueltos marcados ✅ RESUELTO pero aún presentes).

## Principio de separación POR VIDA ÚTIL

| Tipo de dato | Hoy vive en | Debe vivir en |
|---|---|---|
| Labs, vercel_ids, MCPs, repos, flujo pipeline | ecosystem.json | ecosystem.json (se queda — es la columna vertebral) |
| Identidad de marca (mercado, dominio, tipo) | ecosystem.json | ecosystem.json (se queda, sin el to-do) |
| pending_fixes / gaps por marca | ecosystem.json | `brands/[Marca]/session_log.md` |
| key_achievements de cada sesión | ecosystem.json `_meta` | `protocols/session_log.md` + session_log de marca |
| next_session_agenda | ecosystem.json + AGENDA.md | **PENDIENTE DECISIÓN — ver Mejora 5** (no asumir "solo AGENDA.md" hasta resolver fuente de verdad) |
| Scores de auditoría con fecha | ecosystem.json | session_log de la marca |

> **Corrección 2026-06-29:** la fila `next_session_agenda` decía "debe vivir solo en AGENDA.md". Eso prejuzga la decisión de la Mejora 5 (la agenda podría derivarse de la sesión, no vivir estática en el .md). Queda como decisión abierta hasta cerrar la Mejora 5.

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

> **ESTADO 2026-06-29:** PARCIALMENTE HECHO. `CAPABILITIES.md` ya existe y ya se carga en el arranque (Paso 1 del PROTOCOLO DE CARGA de SESSION_PROTOCOL lo incluye; la confirmación de arranque ya dice "Catálogo de capacidades disponible"). Lo que queda por verificar: que su contenido cubra todo lo de la estructura propuesta abajo (auditores, MCPs, flujos, skills, agentes) y que no haya quedado a medias. Revisar el archivo real antes de dar la Mejora 2 por cerrada.

## Diagnóstico
El SESSION_PROTOCOL ya tiene las piezas pero DISPERSAS en 5 secciones (Paso 4 skills, HRDs, COMANDOS, AGENTES, REFERENCIA URLs). Falta UNA vista unificada "qué tengo y cómo lo invoco". Y faltan capacidades sin catalogar: los MCPs (Meta, Shopify, Supabase) y los flujos del pipeline como capacidad invocable.

`skills/INDEX.md` ya es medio catálogo pero solo cubre skills.

## Propuesta: archivo `CAPABILITIES.md` cargado en arranque
Liviano, solo punteros (qué + cuándo + dónde + qué preguntar). NO carga contenido. Una línea por capacidad. Se carga en el arranque (ya integrado).

### Estructura del CAPABILITIES.md

```
## AUDITORES (preguntar modo antes de ejecutar)
| Capacidad | Disparador | Pregunta obligatoria | Dónde |
| gh-auditor | "revisa repo / archivos" | "¿identificativo o contextual?" | skills/github-auditor |
| ecosystem-auditor | "ecosystem scan/audit" | "¿identificativo o contextual?" | skills/ecosystem-auditor |
| shopify-auditor | "audita tienda" | (severo — corre full) | skills/shopify-auditor |
| supabase-auditor | "auditor / supabase audit" | "¿identificativo o contextual?" | skills/supabase-auditor |

## MCPs CONECTADOS (server-side, ya disponibles)
| MCP | Para qué | Notas |
| Meta MCP | publicar IG/FB, ads, insights | brand_id mapping; list_brands |
| Shopify MCP | productos, colecciones, temas, órdenes | B2C token real |
| Supabase MCP | SQL, EFs, schemas, logs | proyecto amlvyycfepwhiindxgzw |

## FLUJOS OPERATIVOS (cómo funcionan, no cargar hasta usar)
| Flujo | Qué hace | Disparo |
| Pipeline | Claude→lab_jobs→lab-worker→CopyLab+ImageLab→approve→Meta MCP | INSERT lab_jobs |
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

> **Corrección 2026-06-29:** añadido `supabase-auditor` a la tabla de auditores (existe desde 2026-06-03, ver Anexo D) y quitadas las versiones de pipeline ("v22") del catálogo — un catálogo de capacidades no debe llevar números de versión volátiles (se desactualizan, que es justo lo que el refactor combate).

## Integración en el arranque
Ya integrado: el Paso 1 de carga incluye CAPABILITIES.md y la confirmación lo menciona. **Pendiente:** verificar que el contenido real esté completo.

## Por qué archivo aparte y no meter en INDEX o ecosystem
- INDEX.md es solo skills — ampliar su scope lo desvirtúa.
- ecosystem.json es estructural y queremos adelgazarlo, no engordarlo con un catálogo operativo.
- CAPABILITIES.md tiene un trabajo claro: "qué puede hacer Claude y cómo se invoca". Vive aparte, se carga liviano.

---

# MEJORA 3 — Estándar de nomenclatura de entregables (HRD_ACTUALIZA)

> **ESTADO 2026-06-29:** PARCIALMENTE HECHO. La política de entrega por tamaño (Ruta A / Ruta B) y la nomenclatura con prefijo `[carpeta]_archivo.ext` YA están codificadas en SESSION_PROTOCOL (COMANDO "Actualiza" punto 3, v16). Lo que queda: la "tabla de mapeo origen→destino obligatoria" del punto 2 abajo, y verificar interacción con la Mejora 5 (si CC escribe los context files directo, ¿sigue haciendo falta la nomenclatura prefijada de entrega? Ver Mejora 5).

## Problema
Cuando un paquete de "Actualiza" tiene varios `session_log.md` en subcarpetas distintas, Sam los ve todos con el mismo nombre y debe abrir cada uno para saber su destino. Esto causó el 2026-05-31 que un session_log se ubicara mal (terminó en protocols/ contenido de OPS) y que Claude generara un protocols/session_log.md inexistente.

## Regla a estandarizar en HRD_ACTUALIZA
1. **Prefijo de carpeta destino en el nombre del entregable.** `[carpeta]_[archivo]`, ej: `LucienSael_session_log.md`. Sam renombra quitando el prefijo antes de subir. *(YA CODIFICADO en v16.)*
2. **Tabla de mapeo origen→destino obligatoria** en el README del paquete: archivo del paquete | renombrar a | carpeta destino | acción (crear/append/reemplazar). *(PENDIENTE.)*
3. **Nunca generar un archivo sin verificar primero su destino real** en el repo (leer el existente antes de asumir estructura). *(PENDIENTE de codificar como regla dura.)*

## Por qué importa
El sistema no debe depender de que Claude "tenga un buen día" con el mapeo. La nomenclatura prefijada + tabla de mapeo hace el destino inequívoco y el error estructuralmente difícil.

---

# MEJORA 4 · Rediseño del modelo de entidades, tipos y relaciones

**Riesgo:** MUY ALTO — toca brand_id (de los que cuelgan genomas, EFs, queue, meta_accounts, session_logs) y el campo type.
**Regla absoluta:** lienzo en blanco + AUDIT REAL primero. NO ejecutar nada sin mapear dependencias.

## ORIGEN
Sesión 2026-06-01: al crear SamPublisher salieron a la luz inconsistencias en el modelo de entidades que estaban latentes. NO se resolvieron en caliente (decisión correcta de Sam) — se elevan al refactor para hacerse bien, desde cero, con audit.

## PROBLEMAS DETECTADOS (no resueltos — para el refactor)

### 1. El tipo `type='person'` es engañoso
- `LucienSael` está como `type='person'`, pero Lucien NO es persona — es personaje sintético. La etiqueta sugiere humano real (lo contrario de lo que es).
- `SamPublisher` (marca personal de una persona real) quedó como `personal_brand`.
- Resultado: la etiqueta "person" está sobre lo NO-persona (Lucien), y la persona real (Sam) bajo "personal_brand". Está invertido respecto a lo intuitivo.
- Propuesta a evaluar: eliminar `person`; unificar bajo `personal_brand` toda voz de individuo (real o sintético) gestionada como marca (Lucien, facetas de Patricia, SamPublisher). PERO verificar antes qué depende de type='person' (¿algún lab/EF/pipeline filtra por type?). Cambiar a ciegas puede alterar comportamiento en producción.

> **Verificación 2026-06-29 contra ecosystem.json real:** en el JSON actual, `LucienSael` NO aparece como entrada de `brands[]` con `type='person'` — vive en su propia clave raíz `lucien_sael`. `SamPublisher` SÍ está en `brands[]` como `type='personal_brand'`, y `PatriciaOsorioPersonal` como `personal_brand`. Es decir: el `type='person'` que describe este problema puede haber cambiado o estar en otra representación. **El audit identificativo debe primero confirmar dónde y cómo existe cada entidad HOY antes de rediseñar** — la descripción de 2026-06-01 puede estar parcialmente desactualizada.

### 2. Tipos repartidos sin criterio escrito
- Facetas de Patricia: criterio dispar (algunas `personal_brand`, alguna `brand`). Misma persona, criterio dispar. Definir criterio EXPLÍCITO: personal_brand (voz de individuo) vs brand (entidad comercial sin rostro individual) vs studio vs ecommerce vs system.

### 3. Nomenclatura de identificadores
- Sam DESCARTÓ su propia propuesta de esquema [persona]+[marca]+[comunidad] (peligroso, asimétrico, codificaba falsedades).
- Sam PREFIERE la nomenclatura identificativa actual (prefijo codifica pertenencia y es legible).
- DECISIÓN: mantener nomenclatura con prefijo. NO renombrar a id suelto. Si algún día se modela pertenencia, será con campo explícito, no renombrando (renombrar brand_id rompe todas las referencias en otras tablas).

## MODELO CONCEPTUAL REAL (aclarado por Sam 2026-06-01 — para diseñar bien el refactor)
- **UnrealvilleStudio** = la agencia/estudio. Es a la vez entidad Y marca. Será negocio legalizado en Florida. Es el PARAGUAS.
- Bajo el paraguas, ACTIVOS PROPIOS: SamPublisher, LucienSael, futuras tiendas, etc.
- UnrealvilleStudio también tiene CLIENTES: Patricia Osorio (persona) con sus propias marcas (VizosSalon, Conectando, Comunidad, Personal).
- **Neurone es de Patricia** (NO de UNRLVL). Sam en proceso de entrar como socio; Patricia en proceso de entrar a UNRLVL. Laura = operaria/asistente de Patricia.
- Cada marca (propia o de cliente) tiene sus particularidades, assets, genomas.
- El humano "Sam" NO es entidad en brands; es el operador. SamPublisher (su marca personal) sí es entidad.

Implicación: el modelo NO es persona→marcas→comunidad (descartado). Es: STUDIO (paraguas) → { activos propios } + { clientes (personas) → sus marcas }. PROPUESTA INICIAL a validar en el refactor, no diseño final.

> **Inconsistencia activa detectada 2026-06-29:** el modelo declara "Neurone es de Patricia, no de UNRLVL", pero el ecosystem.json lista `NeuroneSCF` como brand con infraestructura propia de UNRLVL colgando (NSCF-Console, fulfillment portal, ~varias EFs nscf-*, embajadoras, integrity cron). El modelo conceptual y la representación real divergen. Esto es exactamente lo que la Mejora 4 debe reconciliar — pero anótese que la divergencia es real y está en producción: el audit debe mapear qué cuelga de NeuroneSCF antes de re-modelar la pertenencia.

## PRIMER PASO OBLIGATORIO DEL REFACTOR (entidades)
1. `ecosystem audit` identificativo → mapear qué consume brand_id y type: qué EFs, labs, pipeline, joins, tablas (genomas, queue, meta_accounts, session_logs, humanize_profiles, etc.) referencian cada brand_id y filtran por type.
2. SOLO con ese mapa, diseñar: criterio de types, si se elimina 'person', cómo se modela la relación studio→activos→clientes (campo nuevo, no renombrado).
3. Plan de migración con referencias (nunca cambiar un id/type sin migrar lo que cuelga).

## DEFINITION OF DONE (Mejora 4)
- [ ] Audit de dependencias de brand_id y type completo.
- [ ] Criterio de types escrito y aplicado consistente.
- [ ] Decisión sobre type='person' (mantener/eliminar) tomada CON datos del audit.
- [ ] Modelo studio→activos→clientes definido (si se implementa, con campo de relación).
- [ ] Nomenclatura con prefijo confirmada como estándar.
- [ ] Divergencia NeuroneSCF (pertenencia declarada vs infra real) reconciliada.
- [ ] Cero referencias huérfanas tras cualquier cambio.

---

# MEJORA 5 · Sincronización derivada-de-sesión, fuente de verdad de la agenda, Professor y contradicción de protocolos
_Añadido 2026-06-29 — el desfase AGENDA.md ↔ ecosystem.json expuso la causa raíz._

**Riesgo:** ALTO — toca el modelo de cierre de sesión, ambos protocolos (SESSION + CC) y el flujo Professor a la vez.

## Hallazgo disparador
AGENDA.md y `ecosystem.json.next_session_agenda` están desincronizados hace días. El .md tiene trabajo (#47, #48, Sembrador) ausente en el JSON; el JSON está en `2026-06-25-v1` y la AGENDA en `2026-06-28`. La regla "AGENDA.md se genera desde ecosystem.json, nunca se edita a mano" (SESSION_PROTOCOL) NO se cumple en la práctica: la agenda se viene editando directo. **El desfase es síntoma, no problema.**

## Causa raíz identificada
1. **CONTRADICCIÓN ENTRE PROTOCOLOS:** SESSION_PROTOCOL dice que AGENDA.md se REGENERA desde ecosystem.json ("nunca se edita manualmente, generado por Claude desde ecosystem.json"). CC_PROTOCOL §0 la lista como context file que se EDITA preservando historia ("nuevo al tope, anterior archivado debajo"). Dos leyes incompatibles sobre el mismo archivo → en la práctica gana la de menos trabajo (editar directo) → desfase garantizado por diseño.
2. **PREMISA FALSA DEL MODELO JSON/MD:** el .json se justificó como "lo digerible por Claude" y el .md como "legible para Sam". Falso: Claude lee markdown sin problema (de hecho la AGENDA se auditó entera sin tocar el JSON). Mantener dos representaciones del mismo dato (agenda) sin generación automática entre ellas SIEMPRE desincroniza. Es física, no disciplina.
3. **FUENTE DE VERDAD MAL UBICADA:** la fuente de verdad real de qué cambió no es el JSON ni el MD — es **LA SESIÓN**. AGENDA, session_logs, ecosystem, filemap son todos DERIVADOS de lo que ocurrió en el chat. Hoy esa derivación es manual y desacoplada (cada archivo se toca a mano y por separado), por eso se saltan pasos y se desincroniza.

## DECISIONES DE DISEÑO PENDIENTES (no resueltas — requieren la sesión)
- [ ] **Fuente de verdad de la agenda:** ¿vive en AGENDA.md (sale del JSON) o se genera desde la sesión? Análisis: la agenda es documento de trabajo humano, no dato estructural → sacarla del JSON. Opción superior: "derivada de sesión" (la sesión declara qué se cerró/abrió y de ahí se actualiza AGENDA + lo demás).
- [ ] **Modelo de cierre de sesión:** que "Actualiza" genere/actualice TODOS los archivos afectados (AGENDA, session_logs, ecosystem, filemap) en UN acto derivado de la sesión, en vez de tocar cada uno a mano. Esta es la corrección de raíz del desfase.
- [ ] **Resolver la contradicción SESSION_PROTOCOL vs CC_PROTOCOL §0** sobre AGENDA.md: elegir UNA ley (regenerar XOR editar-preservando) y que ambos protocolos la reflejen igual.
- [ ] **¿`next_session_agenda` sale del ecosystem.json?** (liga directo con Mejora 1 — su fila de agenda quedó abierta a propósito esperando esta decisión).
- [ ] **Estructura de archivado de agenda:** in-file (`## ARCHIVO HISTÓRICO` estilo §0) vs archivo separado (`historical_AGENDA.md`). Hoy 2026-06-29 NO se creó historical_AGENDA.md para no prejuzgar esto.

## CORRECCIÓN DE PROTOCOLO: CC escribe context files (NO es violación de §7)
- **Malentendido aclarado:** §7.1 prohíbe a CC usar WORKTREE en unrlvl-context, NO le prohíbe ESCRIBIR los context files. Razón de §7.1: unrlvl-context se pushea por GitHub Desktop (Sam), no por branch+PR+merge, así que un worktree no aporta y deja huérfanos (defecto que §7 combate).
- **Objetivo de Sam (válido y ya compatible):** que CC escriba los archivos de contexto Y los grandes desde las instrucciones de Claude, para eliminar el error humano de edición manual de Sam.
- **Mecanismo correcto (sin romper §7):** CC escribe directo en el working tree PRINCIPAL de unrlvl-context, preservando historia (§0). Sam revisa el DIFF en GitHub Desktop antes de pushear. Esa revisión = el control que Sam buscaba con "worktree que yo reviso", sin la capa de worktree.
- [ ] **PENDIENTE diseño:** codificar en SESSION_PROTOCOL/CC_PROTOCOL que la ruta por defecto de los context files (incluso medianos, no solo los grandes de Ruta B) sea "CC escribe → Sam revisa diff en GitHub Desktop → Sam pushea", reduciendo la edición manual de Sam a cero. Revisar si esto REEMPLAZA o CONVIVE con la Ruta A actual (Claude entrega el archivo) y con la nomenclatura prefijada de la Mejora 3.

## REGLAS DE LEARNING DEL PROFESSOR (se creían claras — no lo están)
- **Problema:** el Professor capta trivialidades y el listado al cierre es inconsistente (a veces lista learnings, a veces no; a veces Sam aprueba cosas triviales sabiendo que lo son).
- **Causa:** el protocolo define mecánica (checkpoint cada 10 msgs, score 1-5, solo score 5 visible) pero NO define QUÉ MERECE ser learning. Sin umbral de relevancia, captura ruido. Y el listado de cierre depende de que se dispare "Professor" manualmente → inconsistente.
- [ ] **PENDIENTE diseño:** definir CRITERIO de qué ES learning (patrón reusable, cicatriz operativa, decisión arquitectónica, regla que evita repetir un error) vs qué NO (hecho puntual de una tarea, estado momentáneo, dato que ya vive en un context file).
- [ ] **PENDIENTE diseño:** hacer el listado de learnings del CIERRE DE SESIÓN obligatorio y determinista (no dependiente de que Claude dispare el paso), e integrarlo al nuevo modelo de cierre derivado-de-sesión.

## NOTA DE SECUENCIA
Hasta resolver lo anterior, NO crear historical_AGENDA.md ni reescribir las reglas de generación: cualquier cambio estructural a la agenda debe salir del diseño Mejora 5 cerrado, no de parches sueltos. La limpieza de AGENDA.md del 2026-06-29 fue deliberadamente conservadora (solo separar vivo de done, sin estructura nueva) para mantener esta libertad.

## AUDITORÍA DE HISTORIA DISPERSA + PUNTO DE PARTIDA NUEVO (añadido 2026-06-29)

**Hallazgo (2026-06-29):** al buscar agenda histórica anterior a mayo, se confirmó que NO existe ningún archivo de agenda archivada (`historical_AGENDA.md` no existe; AGENDA.md es el único, 31KB, solo mayo-junio). La historia anterior NO se perdió, pero está DISPERSA y sin índice: vive en session_logs de tamaño desigual (`IID/session_log.md` 102KB, `NeuroneSCF` 39KB, `ForumPHs` 17KB, etc.), en master plans (`AYRA_MASTER_PLAN.md` 91KB, `UNRLVL_Ecosystem_Vision.md` 32KB, varios más), en los 65 learnings del Professor, y en el historial de commits de Git (única fuente de versiones viejas de AGENDA.md). No hay un punto único desde donde leer "qué pasó y qué quedó pendiente" a lo largo del año.

**Síntomas del crecimiento sin pausa (~1 año):**
- Carpetas duplicadas: `brands/Unrealville/` Y `brands/UnrealvilleStudio/` coexisten (brand.json idéntico, sha `91c11f77...` en ambos) → un id viejo y uno nuevo sin consolidar.
- `CAPABILITIES.md` existe DOS veces: raíz (`CAPABILITIES.md` 7.5KB) y `protocols/CAPABILITIES.md` 6.4KB → ¿cuál carga el arranque? Posible drift.
- `db/UNRLVL_Supabase_Schema.md` desactualizado (ya anotado en Anexo E) + `db/SESSION_HANDOFF.md` y `db/DB_VARIABLES_audit_summary.md` de vidas útiles dudosas.
- session_logs de tamaño extremo (IID 102KB) que mezclan documento fundacional + log creciente sin corte.

**Actividad a incluir en el #16 — Auditoría de context files + reset de punto de partida:**
- [ ] Correr `ecosystem audit` identificativo SOBRE EL PROPIO REPO de contexto (no solo sobre el ecosistema técnico): inventariar todos los context files, su tamaño, su última modificación real, y si su contenido sigue vivo o es sedimento.
- [ ] Resolver duplicados estructurales: `Unrealville/` vs `UnrealvilleStudio/`, `CAPABILITIES.md` raíz vs `protocols/` (decidir canónico, archivar el otro preservando historia).
- [ ] Decidir el "punto de partida nuevo": definir, para cada tipo de context file, qué es estado-vivo (se queda) y qué es historia (se archiva a un destino de historia explícito y único, no disperso). Esto incluye decidir si se crea por fin una convención de archivado de historia (el `historical_*` o equivalente) que hoy NO existe.
- [ ] Indexar la historia dispersa: que exista UN puntero (en CAPABILITIES.md o un índice nuevo) que diga "la historia profunda de X vive en Y", para que el pasado sea recuperable sin adivinar.
- [ ] NO reconstruir el pasado borrado de la AGENDA desde Git salvo que se decida que aporta valor — el costo/beneficio se evalúa en la sesión. El default es: aceptar mayo-junio como el horizonte de la AGENDA y construir el archivado correcto de aquí en adelante, no excavar hacia atrás.

**Principio rector de esta actividad:** no se trata de recuperar todo el pasado, sino de establecer un punto de partida limpio y un mecanismo de archivado que impida que el sedimento se vuelva a acumular. El año de crecimiento es el contexto, no una deuda a saldar entera.

## DEFINITION OF DONE (Mejora 5)
- [ ] Auditoría de context files del repo completa (inventario vivo vs sedimento).
- [ ] Duplicados estructurales resueltos (Unrealville/UnrealvilleStudio, CAPABILITIES.md ×2).
- [ ] Punto de partida nuevo definido + convención de archivado de historia establecida.
- [ ] Índice de historia dispersa creado (puntero único a dónde vive cada cosa).
- [ ] Fuente de verdad de la agenda decidida y documentada.
- [ ] Modelo de cierre de sesión derivado-de-sesión diseñado.
- [ ] Contradicción SESSION_PROTOCOL ↔ CC_PROTOCOL §0 resuelta (una sola ley, reflejada en ambos).
- [ ] Ruta "CC escribe context files → Sam revisa diff → pushea" codificada, con su relación a Ruta A/B aclarada.
- [ ] Criterio de learning del Professor escrito; listado de cierre vuelto determinista.
- [ ] Decisión next_session_agenda en/fuera del JSON tomada (cierra el hueco de Mejora 1).

---

## ORDEN DE EJECUCIÓN (sesión delicada) — reordenado 2026-06-29

1. `ecosystem audit` identificativo → mapear dependencias reales (sirve a Mejoras 1, 4 y 5).
2. **Mejora 5 — decisiones de diseño primero** (fuente de verdad agenda + modelo de cierre + contradicción de protocolos). Va ANTES de la 1 porque define si `next_session_agenda` sale del JSON y cómo se generan los derivados.
3. **Mejora 2 — completar/verificar CAPABILITIES.md** (más simple, ya parcialmente hecho, valor inmediato).
4. **Mejora 3 — completar** tabla de mapeo + regla de verificación de destino (revisar contra decisión de la Mejora 5 sobre quién escribe).
5. Actualizar HRD_PROTOCOLO_ACTUALIZACION / SESSION_PROTOCOL / CC_PROTOCOL según 2-4.
6. **Mejora 1 — refactor ecosystem.json** (mover volátil a session_logs; aplicar decisión de agenda de la Mejora 5).
7. Actualizar `ecosystem-updater` skill a la estructura nueva.
8. **Mejora 4 — modelo de entidades** (la más riesgosa, con el audit del paso 1 ya en mano).
9. Regenerar derivados (ecosystem.md, filemap, graph, AGENDA).
10. Test de arranque: simular "protocolo actualización" y verificar que todo carga.

## DEFINITION OF DONE (global)
- [ ] ecosystem.json adelgazado, solo estructural, valida.
- [ ] Volátil migrado a session_logs (nada perdido).
- [ ] CAPABILITIES.md vivo, cargado en arranque y con contenido completo verificado.
- [ ] ecosystem-updater actualizado a estructura nueva.
- [ ] Contradicción de protocolos resuelta (Mejora 5).
- [ ] Modelo de cierre derivado-de-sesión operativo (Mejora 5).
- [ ] Professor con criterio de learning escrito (Mejora 5).
- [ ] Modelo de entidades reconciliado (Mejora 4).
- [ ] Arranque probado end-to-end sin romperse.
- [ ] Derivados regenerados.

---

# ANEXO — Capa de Seguridad & Auditoría Supabase
_Añadido: 2026-06-03 · Origen: sesión de remediación de seguridad Supabase_

---

## A. WARNINGS COSMÉTICOS PENDIENTES (Supabase unrlvl-db)
Sin riesgo de explotación hoy; limpieza de prolijidad. Aplicar en una migración dedicada (no urgente):
1. **`function_search_path_mutable`** — ~22 funciones sin `search_path` fijo. Fix: `ALTER FUNCTION public.[fn]([args]) SET search_path = public;` (ajustar schemas por función — las de `content` necesitan `public, content`).
2. **`pg_net` en schema `public`** — debería moverse a otro schema. CUIDADO: pg_net es usada por el pipeline (lab_jobs trigger → lab-worker). Mover requiere actualizar referencias. Bajo riesgo, alto cuidado.
3. **Bucket `unrlvl-media`** — SELECT policy amplia (`public-read-unrlvl-media`) que permite listar todos los archivos. Acotar.
4. **`ops_generation_ledger`** — policy `service_role_all_ledger` mal nombrada (rol = public en vez de service_role). anon sin grants → no explotable hoy, solo cosmético. Renombrar/recrear.

## B. DEUDA DE DISEÑO (requiere decisión de Sam, no es fix de seguridad)
- **`ops_costs` anon write/delete** — la app interna de costos (`unrlvl-ops`, Vercel) escribe y borra con anon key. Opciones: (a) endpoint serverless con service_role; (b) auth en la app; (c) aceptar (es interna). Decisión pendiente.
- **Cifrado en reposo de tokens Shopify** — `shopify.stores.access_token` en texto plano. La fuga vía vista anon se cerró, pero el cifrado en columna sigue pendiente.

## C. ESTADO POST-SESIÓN 2026-06-03 (resuelto, para registro)
- Vista `shopify_stores`: fuga de tokens anon cerrada (security_invoker + revoke).
- ~20 funciones SECURITY DEFINER: EXECUTE de PUBLIC revocado, service_role conservado.
- `nscf_draft_orders`: policies anon eliminadas.
- 8 tablas cubeta A: RLS habilitada.
- Confirmados INTENCIONALES (dual-mode, no tocar): `upsert_brand_cache`, `rotate_sequence_current`, `copylab_jobs`.

## D. PROPUESTA — PROTOCOLO AUDITOR + supabase_access_map

### D.1 supabase_access_map.json (CREADO 2026-06-03)
Mapa de topología de acceso a Supabase: para cada objeto, qué app lo llama, con qué credencial, en qué operación, y si es intencional. Generado/mantenido por el `supabase-auditor`. Estado inicial: `coverage: partial`. Ruta: `supabase_access_map.json` (raíz).

**Link con ecosystem_graph (referencia, NO merge):**
- `ecosystem_graph.json` = topología de negocio (qué lab alimenta a cuál).
- `supabase_access_map.json` = topología de acceso (credencial → objeto → operación).
- Se enlazan por `caller.repo` ↔ nodos LAB-*/APP-* del graph. Se versionan por separado (ciclos de vida distintos).

### D.2 Skill supabase-auditor (CREADO 2026-06-03)
Cruza DB real (MCP) contra código real (gh-auditor), produce/actualiza el map, detecta vestigiales/bugs latentes/agujeros. Dos modos: identificativo y contextual. Hereda patrón de ecosystem-updater. Ubicación: `skills/supabase-auditor/SKILL.md`.

### D.3 Protocolo AUDITOR (formalizar en userPreferences)
Invocable bajo demanda — NO en cada Actualiza (el cruce código↔DB es caro: consume rate limit del PAT leyendo múltiples repos).

**Decisión tomada (2026-06-03):** el cruce código↔DB corre SOLO bajo demanda del protocolo auditor. El `Actualiza` diario NO lo ejecuta.

**Detección retroactiva (clave):** el auditor compara el estado real contra el último `supabase_access_map.json` guardado; el diff revela todo lo cambiado desde la última corrida. El protocolo es el gatillo de EJECUCIÓN; el map versionado es la MEMORIA. (Patrón git.)

**Gatillos sugeridos:** comando explícito ("auditor", "supabase audit") · recomendación del ecosystem-auditor cuando detecte cambio en repo que toca Supabase · tras cualquier sesión de arquitectura que tocó tablas/funciones/policies/EFs.

**Borrador para userPreferences (cuando se formalice):**
```
Cuando Sam escriba "auditor" o "supabase audit" → HRD_SUPABASE_AUDIT:
1. Cargar skills/supabase-auditor/SKILL.md vía Vercel:web_fetch_vercel_url
2. Preguntar: "¿Lo querés identificativo o contextual?"
3. Cargar supabase_access_map.json como baseline para el diff
4. Ejecutar el modo indicado; reportar diff + acciones propuestas (HRD antes de aplicar)
```

## E. NOTA SOBRE LA CARPETA unrlvl-context/db/
`db/UNRLVL_Supabase_Schema.md` (2026-03-25) está DESACTUALIZADO. Documento de diseño previo a la implementación: describe 23 tablas y brand_ids (`DiamondDetails`, `NeuroneCosmetics`, `MASTER`) que no coinciden con la DB real. **Recomendación:** marcarlo deprecated, o que el `supabase-auditor` lo regenere desde la DB real (`list_tables`) en su primera corrida completa — opción preferida. El INDEX no lista `db/`; drift menor.

## F. PENDIENTE OPERATIVO NO-SUPABASE
- **GH_PAT — VERIFICAR ESTADO.** El boceto original (2026-06-03) anotó expiración ~2026-06-09. Esa fecha ya pasó; el proxy `/api/gh` sigue operativo (verificado 2026-06-29 al cargar archivos de contexto), así que o se regeneró o la fecha era otra. **Acción:** confirmar fecha real de expiración del PAT beta en github.com/settings/tokens y dejarla anotada; si está por vencer, regenerar y actualizar en Vercel env (proxy /api/gh) + cualquier MCP que lo use. Sin PAT válido, el github-auditor (y el supabase-auditor en modo contextual) dejan de funcionar.

---

## G. INCONSISTENCIAS DE METADATOS DETECTADAS 2026-06-29 (propagar fuera de este plan)
Detectadas al cotejar este plan + custom instructions contra el ecosystem.json real (v2026-06-25-v1). No son del refactor en sí, pero conviene corregirlas en sus archivos fuente:
1. **Professor proxy:** custom instructions y secciones de SESSION_PROTOCOL lo dan como "PENDIENTE DE CONSTRUIR / fallback". El ecosystem.json actual lo marca `LIVE ✅ / OPERATIONAL v1.0` (`https://unrlvl-context.vercel.app/api/professor`). Actualizar las custom instructions y el SESSION_PROTOCOL para reflejar que el proxy ya existe (o confirmar cuál fuente es la verdadera si hay duda).
2. **CAPABILITIES.md:** referido en partes como "a crear"; ya existe y se carga en arranque. Alinear redacción.
3. **AGENDA ↔ JSON:** desincronización documentada en Mejora 5 (no re-explicar aquí).

---
_Anexo de seguridad · Unrealville Studio · 2026-06-03 · ampliado 2026-06-29_