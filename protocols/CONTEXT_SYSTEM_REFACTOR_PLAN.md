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


ESTA PARTE COMPLEMENTA ESTE PLAN

# REFACTOR — MEJORA 4 · Rediseño del modelo de entidades, tipos y relaciones

**Añadir a:** `protocols/CONTEXT_SYSTEM_REFACTOR_PLAN.md` (es la 4ª mejora del refactor)
**Riesgo:** MUY ALTO — toca brand_id (de los que cuelgan genomas, EFs, queue, meta_accounts, session_logs) y el campo type.
**Regla absoluta:** lienzo en blanco + AUDIT REAL primero. NO ejecutar nada sin mapear dependencias.

---

## ORIGEN
Sesión 2026-06-01: al crear SamPublisher salieron a la luz inconsistencias en el
modelo de entidades que estaban latentes. NO se resolvieron en caliente (decisión
correcta de Sam) — se elevan al refactor para hacerse bien, desde cero, con audit.

## PROBLEMAS DETECTADOS (no resueltos — para el refactor)

### 1. El tipo `type='person'` es engañoso
- `LucienSael` está como `type='person'`, pero Lucien NO es persona — es personaje
  sintético. La etiqueta sugiere humano real (lo contrario de lo que es).
- `SamPublisher` (marca personal de una persona real) quedó como `personal_brand`.
- Resultado: la etiqueta "person" está sobre lo NO-persona (Lucien), y la persona
  real (Sam) bajo "personal_brand". Está invertido respecto a lo intuitivo.
- Propuesta a evaluar: eliminar `person`; unificar bajo `personal_brand` toda voz
  de individuo (real o sintético) gestionada como marca (Lucien, facetas de
  Patricia, SamPublisher). PERO verificar antes qué depende de type='person'
  (¿algún lab/EF/pipeline filtra por type?). Cambiar a ciegas puede alterar
  comportamiento en producción.

### 2. Tipos repartidos sin criterio escrito
- Facetas de Patricia: 3 como `personal_brand`, 1 (Conectando) como `brand`. Misma
  persona, criterio dispar. Hay lógica intuible (Conectando = negocio; las otras =
  facetas personales) pero no está escrita → se aplicó despareja.
- Definir criterio EXPLÍCITO: personal_brand (voz de individuo) vs brand (entidad
  comercial sin rostro individual) vs studio vs ecommerce vs system.

### 3. Nomenclatura de identificadores
- Sam DESCARTÓ su propia propuesta de esquema de relaciones [persona]+[marca]+
  [comunidad] (peligroso, asimétrico, codificaba falsedades).
- Sam PREFIERE la nomenclatura identificativa actual (PatriciaOsorioVizosSalon,
  PatriciaOsorioConectando) — el prefijo codifica pertenencia y es legible.
- DECISIÓN: mantener nomenclatura con prefijo. NO renombrar a VizosSalon suelto
  (perdería la señal de pertenencia y obligaría a un modelo de relaciones que Sam
  descartó). Si algún día se modela pertenencia, será con campo explícito, no
  renombrando (renombrar brand_id rompe todas las referencias en otras tablas).

## MODELO CONCEPTUAL REAL (aclarado por Sam 2026-06-01 — para diseñar bien el refactor)

- **UnrealvilleStudio** = la agencia/estudio. Es a la vez entidad Y marca. Será
  negocio legalizado en Florida. Es el PARAGUAS.
- Bajo el paraguas, ACTIVOS PROPIOS de UnrealvilleStudio: SamPublisher,
  LucienSael, futuras tiendas, etc. (marcas/canales/assets propios).
- UnrealvilleStudio también tiene CLIENTES: Patricia Osorio (persona) con sus
  propias marcas (VizosSalon, Conectando, Comunidad, Personal).
- **Neurone es de Patricia** (NO de UNRLVL). Sam en proceso de entrar como socio;
  Patricia en proceso de entrar a UNRLVL. Laura = operaria/asistente de Patricia,
  nada más. (Corrige el ecosystem si dice otra cosa.)
- Cada marca (propia o de cliente) tiene sus particularidades, assets, genomas.
- El humano "Sam" NO es entidad en brands; es el operador. SamPublisher (su marca
  personal) sí es entidad.

Implicación: el modelo NO es persona→marcas→comunidad (descartado). Es más bien:
STUDIO (paraguas) → { activos propios } + { clientes (personas) → sus marcas }.
Pero esto es PROPUESTA INICIAL a validar en el refactor, no diseño final.

## PRIMER PASO OBLIGATORIO DEL REFACTOR (entidades)
1. `ecosystem audit` identificativo → mapear qué consume brand_id y type:
   ¿qué EFs, labs, pipeline, joins, tablas (genomas, queue, meta_accounts,
   session_logs, humanize_profiles, etc.) referencian cada brand_id y filtran por type?
2. SOLO con ese mapa, diseñar: criterio de types, si se elimina 'person', cómo se
   modela la relación studio→activos→clientes (campo nuevo, no renombrado).
3. Plan de migración con referencias (nunca cambiar un id/type sin migrar lo que cuelga).

## DEFINITION OF DONE (Mejora 4)
- [ ] Audit de dependencias de brand_id y type completo.
- [ ] Criterio de types escrito y aplicado consistente.
- [ ] Decisión sobre type='person' (mantener/eliminar) tomada CON datos del audit.
- [ ] Modelo studio→activos→clientes definido (si se implementa, con campo de relación).
- [ ] Nomenclatura con prefijo confirmada como estándar.
- [ ] Cero referencias huérfanas tras cualquier cambio.
```

---

# ANEXO — Capa de Seguridad & Auditoría Supabase
_Añadido: 2026-06-03 · Origen: sesión de remediación de seguridad Supabase_

---

## A. WARNINGS COSMÉTICOS PENDIENTES (Supabase unrlvl-db)

Sin riesgo de explotación hoy; limpieza de prolijidad. Aplicar en una migración dedicada (no urgente):

1. **`function_search_path_mutable`** — ~22 funciones sin `search_path` fijo. Riesgo teórico de search_path injection. Fix: `ALTER FUNCTION public.[fn]([args]) SET search_path = public;` (ajustar schemas por función — las de `content` necesitan `public, content`).
2. **`pg_net` en schema `public`** — debería moverse a otro schema. CUIDADO: pg_net es usada por el pipeline (lab_jobs trigger -> lab-worker). Mover requiere actualizar referencias. Bajo riesgo, alto cuidado.
3. **Bucket `unrlvl-media`** — tiene una SELECT policy amplia (`public-read-unrlvl-media`) que permite listar todos los archivos. Los buckets públicos no necesitan esto para servir URLs. Acotar.
4. **`ops_generation_ledger`** — policy `service_role_all_ledger` mal nombrada (rol = public en vez de service_role). anon sin grants de tabla -> no explotable hoy, solo cosmético. Renombrar/recrear.

## B. DEUDA DE DISEÑO (requiere decisión de Sam, no es fix de seguridad)

- **`ops_costs` anon write/delete** — la app interna de costos (`unrlvl-ops`, Vercel) escribe y borra costos con anon key. Funciona pero es discutible para una tabla financiera. Opciones: (a) migrar a un endpoint serverless con service_role; (b) añadir auth a la app; (c) aceptar el riesgo (es interna). Decisión pendiente.
- **Cifrado en reposo de tokens Shopify** — `shopify.stores.access_token` está en texto plano. La fuga vía vista anon se cerró, pero el cifrado en columna sigue pendiente.

## C. ESTADO POST-SESIÓN 2026-06-03 (resuelto, para registro)

- Vista `shopify_stores`: fuga de tokens anon cerrada (security_invoker + revoke).
- ~20 funciones SECURITY DEFINER: EXECUTE de PUBLIC revocado, service_role conservado.
- `nscf_draft_orders`: policies anon (lectura pública de datos de clientas) eliminadas.
- 8 tablas cubeta A: RLS habilitada.
- Confirmados INTENCIONALES (dual-mode, no tocar): `upsert_brand_cache`, `rotate_sequence_current`, `copylab_jobs`.

---

## D. PROPUESTA — PROTOCOLO AUDITOR + supabase_access_map

### D.1 supabase_access_map.json (CREADO 2026-06-03)
Mapa de topología de acceso a Supabase: para cada objeto (tabla/función/vista), qué app lo llama, con qué credencial, en qué operación, y si es intencional. Generado y mantenido por el `supabase-auditor`. Estado inicial: `coverage: partial` (solo subsistema auditado el 2026-06-03). Ruta: `supabase_access_map.json` (raíz del repo).

**Link con ecosystem_graph (referencia, NO merge):**
- `ecosystem_graph.json` = topología de negocio (qué lab alimenta a cuál).
- `supabase_access_map.json` = topología de acceso (credencial -> objeto -> operación).
- Se enlazan por `caller.repo` ↔ nodos LAB-*/APP-* del graph. Se versionan por separado porque tienen ciclos de vida distintos.

### D.2 Skill supabase-auditor (CREADO 2026-06-03)
Cruza DB real (MCP) contra código real (gh-auditor), produce/actualiza el map, detecta vestigiales/bugs latentes/agujeros. Dos modos: identificativo (rápido) y contextual (profundo). Hereda patrón de ecosystem-updater (síntesis en Chat, commit vía Claude Code). Ubicación: `skills/supabase-auditor/SKILL.md`.

### D.3 Protocolo AUDITOR (formalizar en userPreferences)
Análogo a PROFESSOR y ACTUALIZA. Invocable bajo demanda — NO en cada Actualiza (el cruce código↔DB es caro: consume rate limit del PAT leyendo múltiples repos).

**Decisión tomada (2026-06-03):** el cruce código↔DB corre SOLO bajo demanda del protocolo auditor. El `Actualiza` diario NO lo ejecuta.

**Diseño de detección retroactiva (clave):** el auditor NO depende de "¿hubo sesión de arquitectura?" como memoria. Compara el estado real contra el último `supabase_access_map.json` guardado; el diff revela todo lo cambiado desde la última corrida. El protocolo es el gatillo de EJECUCIÓN; el map versionado es la MEMORIA. (Patrón git.)

**Gatillos sugeridos:**
- Comando explícito de Sam ("auditor", "supabase audit").
- Recomendación del `ecosystem-auditor` cuando detecte cambio en un repo que toca Supabase.
- Tras cualquier sesión de arquitectura que tocó tablas/funciones/policies/EFs.

**Borrador de texto para userPreferences (cuando se formalice):**
```
Cuando Sam escriba "auditor" o "supabase audit" → HRD_SUPABASE_AUDIT:
1. Cargar skills/supabase-auditor/SKILL.md vía Vercel:web_fetch_vercel_url
2. Preguntar: "¿Lo querés identificativo o contextual?"
3. Cargar supabase_access_map.json como baseline para el diff
4. Ejecutar el modo indicado; reportar diff + acciones propuestas (HRD antes de aplicar)
```

## E. NOTA SOBRE LA CARPETA unrlvl-context/db/

`db/UNRLVL_Supabase_Schema.md` (2026-03-25) está DESACTUALIZADO. Es un documento de diseño previo a la implementación: describe 23 tablas y brand_ids canónicos (`DiamondDetails`, `NeuroneCosmetics`, `MASTER`) que no coinciden con la DB real. No es la realidad y no contiene la dimensión de acceso.

**Recomendación:** o marcarlo como histórico/deprecated, o que el `supabase-auditor` lo regenere desde la DB real (`list_tables`) en su primera corrida completa — opción preferida. El INDEX no lista `db/`; drift menor, no requiere cirugía.

---

## F. PENDIENTE OPERATIVO NO-SUPABASE

- **GH_PAT expira ~2026-06-09.** Regenerar en github.com/settings/tokens?type=beta y actualizar en Vercel env (donde vive para el proxy /api/gh) y en cualquier MCP que lo use. Sin esto, el github-auditor (y por tanto el supabase-auditor en modo contextual) deja de funcionar.

---
_Anexo de seguridad · Unreal>ille Studio · 2026-06-03_
