# ForumPHs — Session Log

## 2026-07-03 — DF Análisis de REGRESIÓN Venezia (acta corregida por Ivette) + Bloque 1 + R4 (PR #13 merged) + EF fphs-formalize v39 (R3)

### CONTEXTO — por qué esta sesión
Sam cargó la última acta del DF (Venezia OR 1-2026) **ya corregida por Ivette** para mapear
regresiones: cosas que sprints previos ya habían superado y volvieron a romperse. Diagnóstico
hecho con **lectura de código real** (no solo del output), y corregido dos veces contra la
hipótesis inicial de Sam. Resultado: 5 regresiones identificadas, causa-raíz en código, y
resueltas o dejadas en su estado correcto por diseño.

### LAS 5 REGRESIONES — diagnóstico con causa-raíz en código
- **R1 — duplicación aparente** → **FALSO POSITIVO de R2.** La misma deliberación (sistema húmedo
  $2,269/$2,978, Hilda Lorena + Greyz + ADM) aparecía en 2 lugares a ~2000 líneas. NO era doble
  input: era el reorden (R2) haciendo que **dos momentos temporales legítimos** parecieran
  duplicados por estar en secciones equivocadas. **PRUEBA:** Ivette también los conserva en 2
  lugares (líneas 941 y 1123 de su acta). El dedup acertó al NO marcarlos.
- **R2 — reorden temporal** → causa: `sectionAssigner` reasignaba bloques por keyword-match débil
  (`>0.4`) y `generate` los renderizaba **agrupados por `agenda_section`, nunca por timestamp**.
  Un bloque de presupuesto caía bajo el header "Elección" por coincidencia léxica.
- **R3 — fragmentos vacíos** → causa: `fphs-formalize` SYS1/SYS2 con `forceInclude` prohíben NULL
  → formalizan ruido oral ("tomó nota", "respondió negativamente") como intervenciones.
- **R4 — numeración de secciones eliminada** → causa: `sectionTitle()` en `generate` **quitaba el
  prefijo numérico a propósito** (comentario "removed number prefix (Ivette canonical format)") —
  malinterpretación: el acta real de Ivette **sí numera** (1.–8.). Regresión contra PASO 3/4.2.
- **R5 — ANEXO ICR embebido degradado** → sigue en `generate` (banners inline + anexo). NO se tocó
  esta sesión (es Bloque 2). El anexo embebido usa `icrFindings` local (pobre, 2 hallazgos) vs el
  reporte externo de `/api/icr` (rico, 16-19). Dos motores ICR distintos.

**HALLAZGO de lectura de código que corrigió la hipótesis de Sam:** la UI de barridos **NO
acumulaba** — React remonta `ProcessingPipeline` con `key=formalize-${retry}`, siempre parte de
`parsed.debates`, y `runGenerate` reemplaza (no concatena). Por eso la duplicación **no venía de
correr 2 barridos en la UI**, sino de **input doblado a nivel ZIP/transcripción sin capa de dedup**
(`consolidate()` solo une turnos consecutivos del mismo hablante).

### CONSTRUIDO — PR #13 (merged por Sam) — Bloque 1 + R4
Un solo PR, 7 archivos. Build+typecheck verde local, Vercel Preview verde. CC declaró 2 archivos
extra fuera de la lista (justificados: `QAReport.tsx` por el barrido único, tilde QUÓRUM en
`actaBuilder.ts` por el `acta_text` que audita el ICR).
1. **`lib/types.ts`** — `DebateBlock` += `possible_duplicate?` + `duplicate_of?` (opcionales).
2. **`parseTranscripcion.ts`** — dedup **como MARCA** (no borra): firma hablante+contenido
   normalizado no-consecutivo, Jaccard ≥0.85 → `possible_duplicate=true` + `duplicate_of`.
3. **`sectionAssigner.ts`** — umbral keyword `0.4→0.7` (deja de teletransportar) + exporta
   `sortByTimestamp` (fallback estable a índice si falta timestamp).
4. **`generate/route.ts`** — ordena secciones por `sortByTimestamp` · empuja ICR MEDIO de
   duplicados marcados · **R4:** restaura `1./2./3.` en `sectionTitle` + QUÓRUM con tilde.
5. **`actaBuilder.ts`** — mismo `sortByTimestamp` en `buildDebateSections` (docx↔acta_text↔ICR
   en orden idéntico).
6. **`app/page.tsx` + `ProcessingPipeline.tsx`** — barrido **único** con selector de nivel:
   **"0 (mínimo)" / "1 (intermedio)" / "2 (literal)"** → `retryAttempt` fijo (SYS0/1/2). Se
   eliminó la lógica de sweeps acumulativos.
7. **`supabase/functions/fphs-formalize/index.ts`** — R3: `TRIVIAL_MIN_WORDS=5`, skip de
   fragmentos con <5 palabras sustantivas ANTES del modelo, aplica en todos los niveles.

**DECISIÓN de arquitectura (Sam) — Opción A cronológica:** se mantiene la agrupación por punto del
orden del día (PASO 3), pero DENTRO de cada sección se ordena por timestamp global. NO cronológico
absoluto (rompería PASO 3 y no reproduciría a Ivette).

**PRINCIPIO (Sam) — "dedup se marca, NO se corrige":** extensión del principio ICR. El dedup vive
en el parser (punto más temprano, sobre `text_raw` crudo). Detecta y MARCA, nunca borra. Beneficio
forense: si con barrido ÚNICO el ICR aún marca duplicados → la fuente es Hypal (upstream); si no →
era el doble barrido manual. El reporte ICR se vuelve instrumento de diagnóstico de origen.

### DEPLOY EF — fphs-formalize v38 → v39 (yo, vía Supabase MCP, con confirmación de Sam)
- Proyecto **UNRLVL `amlvyycfepwhiindxgzw`** (el EF vive aquí, NO en FPHS `tajuoqdbnsnzkhyqvdgs`).
- **`verify_jwt: false` explícito** — el front llama sin `Authorization`; el default `true` habría
  roto la formalización con 401. **GOTCHA registrado.**
- Capturé v38 con `get_edge_function` antes de desplegar (confirmé que la v38 era pre-R3). Post-deploy
  verificado: **v39 ACTIVE**, contiene `TRIVIAL_MIN_WORDS` + skip trivial, `verify_jwt=false` preservado.
- **Merge del PR ≠ deploy del EF** — el EF está versionado en el repo pero el deploy a Supabase es
  paso aparte. Se hizo explícito tras el merge.

### VERIFICACIÓN — comparación peras con peras (3 corridas, todas nivel 2 literal)
| Métrica | DF1 (original) | DF2 (post-merge, EF v38) | **DF3 (EF v39)** | Ivette |
|---|---|---|---|---|
| Líneas | 4105 | 4263 | **3370** ↓ | 2573 |
| Fragmentos triviales | ~25 | 25 | **1** ✅ | 0 |
| ROL NO VERIFICADO | 98 | 98 | **46** ↓ | 0 |
| ICR ALTO | 6 | — | **4** ↓ | — |

- **R2** ✅ bajo header "Elección" ahora hay contenido de elección (no de presupuesto).
- **R4** ✅ secciones 1./3./4./5./6./7./8. + QUÓRUM con tilde.
- **R1** ✅ falso positivo confirmado; los 2 momentos del $2,269 coinciden con Ivette.
- **R3** ✅ EF v39: acta −21% (4263→3370), triviales 25→1, SIN perder contenido sustantivo.
- Los ICR ALTO restantes (ACTA No sin número, Daniel Puentes/admin sin rol, género Greyz) son
  **criterio legal de Ivette, NO regresiones** = techo de lo automatizable.

### PENDIENTE — próximo chat
1. **R5 (Bloque 2)** — marcas ICR **visuales inline** dentro del `.docx`: resaltado en color de
   gravedad + referencia `ICR N` (decisión de Sam: texto resaltado, Ivette borra ~7 chars; NO
   comentarios anclados) + **mantener** el reporte ICR externo + **QUITAR el ANEXO ICR embebido**
   (degradado) y sus rastros. Autocontenido.
2. **Warning temprano de dedup (idea de Sam)** — exponer `possible_duplicate` como aviso
   NO-bloqueante en la fase de parsing de la UI, además del hallazgo ICR. Convierte el parseo en
   punto de diagnóstico de ORIGEN (Hypal vs doble barrido). El dedup ya lo calcula; falta el surface.
3. **Deuda R4:** colisión de número de sección si una convocatoria NO empieza por quórum (el punto 1
   de agenda y la sección hardcodeada de quórum podrían chocar en el nº 1). Señalado, no arreglado
   para no regresar el caso estándar Venezia.
4. **"APROBACIÓN DEL ORDEN DEL DÍA" sin header propio** — el parser no la extrae como agenda_item;
   el ICR la marca ALTO/Estructura (numeración salta 1→3). Fix requiere trabajo en parseResumen.
5. Calibrar `TRIVIAL_MIN_WORDS=5` si llegara a cortar intervenciones cortas válidas.
6. Verificar R3 en nivel 0 (encoge aún más, más cerca de Ivette).

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- **EF fphs-formalize: v38 → v39** (fix R3), `verify_jwt=false`, proyecto `amlvyycfepwhiindxgzw`.
- Sin cambios de esquema/tablas. Sin migraciones.
- **Professor: 9 learnings** (session_date 2026-07-03, brand_id ForumPHs, `approved_by_sam=true`):
  5 con relevance_score 5 (R1 falso positivo / principio dedup-marca / gotcha verify_jwt / orden
  cronológico Opción A / cierre sprint) + 4 con score 4 (R3 EF-side / barrido único / deuda R4 /
  idea warning temprano).

---
*ForumPHs · DF análisis de regresión + Bloque 1 + R4 (PR #13) + EF v39 · 2026-07-03*

## 2026-06-19 — DF Quality Sprint: CIERRE DE GENERACIÓN (5 gaps merged) + corridas finales Venezia + feature reporte ICR .docx (PR #12) + mapa de pendientes

### EN PRODUCCIÓN (mergeado a main, verificado)
- **5 GENERATION GAPS CERRADOS** — PRs #6–#11 mergeados a main. Venezia OR 1-2026 pasó de
  🛑 BLOQUEADO → ❌ REQUIERE CORRECCIÓN con **0 CRÍTICOS**. Nivel comparable a Castilla (98%).
  - **#6** fphs-formalize v23 (ruido oral/género/warnings ICR) → desplegado como EF **v28**
    (verify_jwt:false, model claude-sonnet-4-6, key Deno.env `forumphs_document_factory`).
  - **#7** votaciones (classifyVote + try-catch DB + scan dinámico + placeholder multi-candidato).
  - **#8** ingesta asistencia (`lib/parsers/parseAsistencia.ts`): raíz quórum-0 = header mismatch
    (parser buscaba `Unidad`/`Asistencia`, Hypal trae `Unidades`/`Asistente`). Fix = matching
    TOLERANTE (normHeader + pickField por stem) + tower-from-suffix. 161 registros → quórum 88.46%.
  - **#9** render (route.ts + actaBuilder.ts): Gap1 quórum duplicado (`isQuorumSectionTitle()` omite
    heading de agenda) + Gap4 `{.mark}` residual (`stripInlineMarkup()` preserva `[FINCA PENDIENTE]`).
  - **#10** generador: Gap2 reproceso (`lib/processors/reprocessPending.ts`, reintenta solo bloques
    pendientes, nunca claude_null/logistica/empty/agent_error) + Gap3 género-por-persona
    (`genderConsolidation.ts`, mayoría por speaker_name, admin excluido, nunca por diccionario).
  - **#11** Gap5 roles (`classifyRoles.ts`, determinista): unidad en padrón→propietario; sin unidad +
    match exacto en acta_admin_personnel→admin; ninguno→`[ROL NO VERIFICADO]` + ICRFinding.
    AJUSTE de Sam: ELIMINADO match por nombre parcial ("Lorena"→Hilda era adivinar disfrazado).
  - Conflictos en route.ts resueltos por CC vía rebase #6→#11. Sam autorizó merge directo "solo por esta vez".

### CORRIDAS FINALES VENEZIA (2 ejecuciones, post-5-gaps) — la mejor acta que el DF ha producido
- **Gap 5 funcionó en AMBAS corridas:** `[ROL NO VERIFICADO]` correcto en Patricia Navajas Navarro,
  Sadia De Gonzalez, Tate, Yara, Rocío, Alejandra, [Nombre], Administración. Crucial: **"Lorena"
  (barbacoa/gastos legales) NO se resolvió a Hilda Lorena** — principio respetado. Propietarios con
  unidad (Greyz 13H, Celia Local A, Adnan Mauricio 9H) bien clasificados. Ivette/Daniel → admin.
- **ICR completo (runtime, separado) = el bueno:** corrida 1 → 19 hallazgos (0/4/10/5);
  corrida 2 → 17 hallazgos (0/6/8/3). **0 críticos en ambas.**
- **$300M:** corrida 1 lo dejó ~354,000; corrida 2 transcribió el error oral literal 300,554,673
  con aclaración parentética. ICR lo marca ALTO/a-verificar, NO auto-corrige (correcto).
- **Riesgo legal detectado por ICR corrida 2:** "Mercedes 62 puntos" para Tesorero cuando XLSX
  registra 0/0 NO APROBADO → marcado riesgo potencial CRITICAL para Ivette. Elección Tesorero sigue
  `[ELECCIÓN MULTI-CANDIDATO — PENDIENTE DE PROCESAR]` (honesto, no inventa).
- **Conclusión:** Venezia llegó al TECHO de lo automatizable. Lo que queda es criterio legal de Ivette,
  no errores del sistema.

### FEATURE: reporte ICR como .docx (PR #12 — ⏸ PARADO EN PR, esperando merge de Sam)
- CC construyó `lib/generators/icrReportDocx.ts` (serializador con shading w:shd por severidad:
  CRÍTICO #C00000 / ALTO #E36C09 / MEDIO #BF9000 / BAJO #808080; nota a Ivette; tabla resumen;
  hallazgos Crítico→Bajo con Hallazgo:/Recomendación:; $354,000 como "valor a verificar", nunca afirmado)
  + `app/api/icr-docx/route.ts` + botón "Descargar reporte ICR (.docx)" en page.tsx. Build 19/19.
- **PATH B confirmado** para entregar a Ivette: mergear #12 → correr Venezia → clic en botón →
  baja REPORTE_ICR_ACTA_OR_1-2026_PH_VENEZIA_TOWER_E.docx con los findings reales (no fabricados).
- **Bloqueo de PATH A (pegar JSON):** el ICR NO se persiste — re-confirmado por SQL esta sesión que
  NO existe tabla icr/findings ni en UNRLVL (amlvyycfepwhiindxgzw) ni en FPHS (tajuoqdbnsnzkhyqvdgs).
  ICR es runtime puro (vive solo en pantalla). Claude no puede generar el .docx desde su contexto y
  no fabrica findings (violaría el principio del ICR).

### DEFECTO PERSISTENTE — ANEXO ICR pobre embebido en el .docx (FIX PENDIENTE, PR limpio aparte)
- Confirmado en LAS 2 corridas: cada acta (pre-#12) incrusta en su cuerpo un "ANEXO ICR — REVISIÓN
  DE CONSISTENCIA LEGAL" DEGRADADO (corrida 1: 4 hallazgos con "ADM"/guion colgante; corrida 2: solo
  2 hallazgos). En paralelo el reporte separado tiene 19/17. → El ICR NO debe vivir incrustado en el
  acta legal (mezcla documento legal con auditoría interna y entrega a Ivette un anexo contradictorio).
- **#12 separa el reporte en archivo propio pero NO quita el anexo.** FIX pendiente: remover el ANEXO
  del cuerpo del acta (route.ts/actaBuilder.ts). NO es backlog cómodo — se repite cada corrida.

### PRÓXIMO CHAT — lo primero que haga Claude (orden sugerido)
1. **Mergear PR #12** (bajo riesgo: archivos nuevos + botón). Verificar en main + /api/icr-docx registrado.
2. **Correr Venezia final** con #12 en main (última de verdad — #12 no cambia el acta, solo agrega botón).
3. **Clic "Descargar reporte ICR (.docx)"** → entregar a Ivette: acta + reporte ICR (17 hallazgos, el bueno).
4. **FIX ANEXO embebido** (PR limpio, separado de #12): quitar el ANEXO ICR del cuerpo del acta.
5. **Pre-flight de Ivette** (diseño aparte): input en DF donde Ivette declara los representantes de admin
   de ESA asamblea antes de generar → alimenta classifyRoles paso 2 como dato verificado → reduce
   `[ROL NO VERIFICADO]`. Principio: conocimiento asamblea-específico = DATO humano, no inferencia de código.

### BACKLOG (no urgente, arrastrado)
- **Ledger de costos del DF** (instrucciones `CC_INSTRUCCIONES_ledger_costos_DF.md` ya en mano de Sam):
  una fila por acta en `ops_token_sessions`, cost = (in/1M*3)+(out/1M*15). fphs-formalize debe DEVOLVER
  tokens y dejar de escribir por su cuenta (hoy `logTokensBatch` duplica — NEUTRALIZAR al conectar ledger).
  PR #5 fue CERRADO sin merge (approach UNRLVL_SERVICE_KEY-en-DF abandonado). `ops_token_sessions`:
  session_type/input_tokens/output_tokens son NOT NULL (usar 0, nunca null).
- Soporte completo VotationRecord multi-candidato (Tesorero hoy placeholder).
- Reemplazar `/api/icr` "Claude open" por Agente Experto permanente (auditoría Ley 284 embebida +
  curaduría visual de imágenes; la corrección tipo-$300M y validación de identidad son criterio legal,
  pueden vivir aquí). Reglamento como 2º artefacto del DF. Cargar locales L01–L06 Castilla (fincas).
- Warning ICR de fincas faltantes (si fincaPendientes.length>0 → MEDIUM/DATA_MISMATCH no bloqueante).
- Mejora ICR "sugerir patrón de normalización" para alta de PH (sesión Agente Experto).

### REGLAS DB / DEPLOYS DE ESTA SESIÓN
- Sin cambios de DB esta sesión (todo fue código vía PR + verificación). EF fphs-formalize confirmada
  en **v28** (= patch v23). Professor: 3 learnings checkpoint 13 (approved_by_sam=true).

---
*ForumPHs · DF cierre de generación + corridas finales Venezia + PR #12 reporte ICR .docx · 2026-06-19*

## 2026-06-08 — Fincas Castilla + ledger de costos + warning ICR (mapeo para próximo chat)

### EN PRODUCCIÓN (aplicado y verificado)
- **Fix finca Torres de Castilla** — VALIDADO live por Sam: 237 fincas pobladas, solo
  los 6 locales no cargados quedan [FINCA PENDIENTE] (correcto). Causa raíz: la única
  regla era `explicit` esperando "5-E" con torre aparte, pero Hypal trae torre embebida
  sin columna ("TA 05E"=Torre A) y cero a la izquierda en el piso, mientras canonical_key
  es "A|5-E" sin cero. Fix = DATA: dos reglas `embedded_prefix` priority 90 (piso 0[1-9])
  y 95 (piso [1-9][0-9]) en `building_normalization` FPHS. Sin deploy.
- **Tarifa Sonnet registrada** en `ops_lab_rates` (UNRLVL): lab='document-factory',
  model_id='claude-sonnet-4-6', input $3/1M, output $15/1M. Base lista para el ledger.

### DECISIONES DE ARQUITECTURA
- **Rechazada la regla de normalización universal**: los formatos de PHs son mutuamente
  ambiguos ("TA 05E" Castilla vs "T3 44A" Luxor); una regla que adivine haría matches de
  finca incorrectos (peor que un hueco visible). Se mantiene formato-como-DATA por PH
  (1-2 INSERT sin deploy). Mejora futura: que el ICR DETECTE formato no contemplado y
  SUGIERA el patrón (alta de PH = un clic).
- **Ledger de costos del DF — Opción 1**: una fila agregada por acta (no por llamada),
  en `ops_token_sessions` (UNRLVL), cost_usd = (in/1M*3)+(out/1M*15).

### PENDIENTE — PRÓXIMO CHAT (lo primero que haga Claude)
> **Un solo PR de CC, toca solo `/api/generate`** (instrucciones ya entregadas a Sam:
> `CC_INSTRUCCIONES_ledger_costos_DF.md`, actualizado con los dos cambios):
> 1. **Ledger de costos del DF**: acumular usage de todas las llamadas Anthropic del job
>    (formalize + QA + ICR Mano A + Vision Mano B) → una fila en `ops_token_sessions`
>    con cost_usd calculado, escrita por `/api/generate` al cerrar el job. La EF
>    fphs-formalize debe DEVOLVER sus tokens (hoy solo los loguea) y dejar de escribir
>    por su cuenta (evitar doble conteo). **CC debe verificar que ICR/Vision devuelvan
>    bloque `usage`.**
> 2. **Warning ICR de fincas faltantes**: si `fincaPendientes.length>0`, push ICRFinding
>    MEDIUM / DATA_MISMATCH (campo `suggestion`), no bloqueante. Usa el `fincaPendientes[]`
>    que el lookup ya recolecta.
>
> Estado al cerrar: Sam le pasa las instrucciones a CC. Claude del próximo chat debe
> (a) verificar si el PR ya se abrió/mergeó (revisar main del repo + ops_token_sessions),
> (b) si está mergeado, validar una fila de costo real en ops_token_sessions tras un acta,
> (c) registrar cierre en Professor.

### OTROS PENDIENTES (no urgentes)
- Mejora ICR "sugerir patrón de normalización" para PH nuevo (sesión Agente Experto).
- 6 locales L01–L06 de Castilla no están en `units` (deuda de datos — cargar fincas).
- Re-smoke completo de Vision en Luxor (el 413 ya está resuelto; falta confirmar Mano B
  clasificando con un ZIP image-heavy en producción).

### REGLAS DB APLICADAS ESTA SESIÓN (registro — la DB es la fuente de verdad)
- FPHS `building_normalization`: +2 reglas Torres de Castilla (priority 90, 95).
- UNRLVL `ops_lab_rates`: +2 filas tarifa Sonnet document-factory (input/output).

---
[⬇ historial anterior preservado: sesiones 2026-06-04, 2026-06-01 ...]

# ForumPHs — Session Log

> Repo: `unrlvl-context/brands/ForumPHs/session_log.md`
> Las novedades más recientes van al tope.

---

## 2026-06-06 — SMA reapuntado a ForumPHs · creación de cuentas RRSS (Ivette + Jesús)

**Objetivo de la sesión:** reconfigurar el Social Media Agent (antes de NeuroneSCF) para que guíe la **creación de las cuentas de RRSS de ForumPHs**, ejecutada por Jesús (operador del armado) + Ivette Flores (clienta titular). Manejo continuo posterior: UNRLVL vía dev apps + flujos/labs. **SMA terminado y operativo en producción.**

### Decisiones de plataformas (aprobadas)
- **Mezcla:** Facebook (Página + grupos) + Instagram + LinkedIn (perfil de Ivette + Company Page) + Meta dev app + verificación de negocio. **WhatsApp Business EN PAUSA** hasta número móvil panameño dedicado. **TikTok fuera** (no encaja con servicio legal-administrativo).
- **LinkedIn doble activo:** perfil personal de Ivette (autoridad, ~70-80% del esfuerzo, alcance algorítmico) + Company Page (legitimidad institucional, permanencia). Patrón "persona al frente, marca detrás".
- **Autoridad alimentada por:** blog en forumphs.com + LinkedIn vía Agentes IID; orgánico + ads vía Orchestrator.

### Arquitectura de identidad (crítica)
- Persona real detrás de todas las cuentas: **Ivette Flores** (clienta titular). Desde su perfil personal de Facebook se crea el Business Manager; todo cuelga de ahí.
- **sam@unrealvillestudio.com** = admin de UNRLVL en el BM (control sin titularidad).
- Jesús ejecuta el armado junto a Ivette; los activos son siempre de ForumPHs.

### Orden de creación (10 pasos, BM primero, verificación como prerrequisito)
Correos → número (pausado, solo WhatsApp) → Facebook de Ivette → Business Manager → verificación de negocio Meta → Facebook Page → Instagram → WhatsApp (pausado) → Meta dev app → LinkedIn.

### Correos — aliases reales YA creados (forumphs.com → forumphs507@gmail.com)
- Plataforma: `fb@`, `ig@`, `linkedin@`, `wa@` (reservado). Funcionales: `forumphs@`, `ivetteflores@`, `contacto@`, `info@`, `admin@`, `irja@`.
- **Prerrequisito bloqueante:** Ivette debe tener `forumphs507@gmail.com` agregado y funcionando en teléfono Y compu antes de crear cuentas (las verificaciones llegan ahí).

### Política de seguridad de acceso (empujada por el agente)
- **Passkeys primero** en compu y móvil. **Evitar 2FA opcional** por ahora (hasta estabilizar acceso remoto; solo si la plataforma lo obliga). **Bitwarden** con mini-tutorial para contraseñas que existan.
- Número personal de Ivette aceptable provisional para FB/IG/LinkedIn/BM (teléfono editable); solo WhatsApp exige el dedicado (en WhatsApp el número ES la identidad de la cuenta).

### Roles del SMA (tokens)
- `admin` (Sam/UNRLVL), `client` (Ivette, clienta titular — antes `po`), `ops` (Jesús). Tokens en Vercel: SAMDEV/IVETTE/JESUS.

### Saludo con agenda por rol — funciona
- Al escribir "hola", el agente saluda y despliega la agenda filtrada por rol (verificado: Ivette ve segunda persona "tu cuenta", Sam ve vista admin). La portada de bienvenida es estática (front); la agenda real aparece en la primera respuesta del modelo.

### Estado técnico
- PR #1 (reapuntado) + PR #2 (ajustes: aliases, prerrequisito Gmail, saludo con agenda, endpoint reset) — ambos mergeados a main de AgentLab, desplegados en producción.
- **Historial KV reseteado a cero** vía `/api/reset` (12 keys borradas: 5 chats, 5 raw logs, registry, agent_log). Todos los tokens arrancan limpios.
- **EXPORT_SECRET rotado** por Sam (quedó expuesto en chat durante el reset). Pendiente: actualizarlo en el protocolo Actualiza y userPreferences (ver AGENDA).
- `reset.js` quedó en el repo como herramienta reutilizable (decisión pendiente: dejarlo o quitarlo tras uso).

### Email marketing (decisión tomada)
- FPHs usa **stack nativo Resend + Supabase + Orchestrator** (servicios), NO Klaviyo (que es para e-commerce, NSCF). Diseñar el email de FPHs "CRM-ready" desde el inicio para que el futuro unrlvl-CRM multimarca se enchufe sin reescribir.

### Próximos pasos ForumPHs (cuando Sam decida)
- [ ] Pulido SMA opcional: actualizar los 4 hints viejos (Google Voice/WABA) por hints de FPHs; opción de agenda en portada sin escribir "hola".
- [ ] Conseguir número panameño dedicado → activar WhatsApp Business → integrar ForumPHs Speaks.
- [ ] Ivette + Jesús ejecutan la creación de cuentas siguiendo el SMA.
- [ ] (Pendiente del sprint anterior) fphs-formalize quality sprint 90→98 — sin arrancar.

### SMA (comando Actualiza)
- A partir de v15 del protocolo, el SMA NO se consulta por defecto en Actualiza. Solo si Sam lo pide explícitamente.

---
*ForumPHs · SMA reapuntado + creación de cuentas RRSS · 2026-06-06*

---

## 2026-06-01 — fphs-formalize quality sprint · DIAGNÓSTICO + DISEÑO (sin construir aún)

**Sprint:** llevar el Document Factory del 90% (efectividad Ivette) al 98% (nivel alcanzado manualmente por Claude en el acta del Luxor 300). Sam pidió diagnóstico completo y diseño antes de tocar código. **No se construyó nada todavía** — esta sesión es plano + decisión de arquitectura.

### Panorama del pipeline (mapeado y verificado, no asumido)

```
ZIP → /api/parse (parsers + zipExtractor)
    → PreflightForm (overrides Sam)
    → ProcessingPipeline → fphs-formalize EF (workers async, redacta bloque×bloque)
    → /api/generate (ensambla DOCX + corre runQAScan)  ──→ QAReportView
    → /api/icr (Claude auditor lee acta, emite findings)  ──→ ICRReportView
    → /api/icr-apply → fphs-icr-apply EF (aplica decisiones de Ivette)
    → DOCX final
```

- Repo DF: `github.com/unrealvillestudio-hub/forumphs-document-factory` (PÚBLICO, clonable sin auth).
- Vercel proj: `forumphs-document-factory` (`prj_AUHgIP7cuc95dLz7vbj2P4piinlz`), team `team_fEH94Irp6BAI9YGm4btGna5n`.
- EFs en UNRLVL Supabase (`amlvyycfepwhiindxgzw`): `fphs-formalize` v20, `fphs-icr-apply` v11.

### HALLAZGO CLAVE: nada está roto
- **QA (`lib/processors/qaScanner.ts`)** — intacto y bien hecho. 2 capas: completeness estructural (0-100) + text-quality (regex 1ª persona, oral, género, formato números). Re-run progresivo (commit `89b093c`) funciona.
- **ICR (`/api/icr`)** — es la "capa Claude open" a convertir en Agente Experto. Tiene fallback que nunca tira 500.
- **Anexo ICR visual en DOCX (`/api/generate`)** — banners de color por sección + página anexo con severidad. Intacto (es lo que a Ivette le encanta).
- **`fphs-icr-apply`** — aplica decisiones apply/edit/ignore. Intacto.
- Lo que el session_log previo marcó "roto" era el frontend desconectado (`/api/actas/generate` 404), YA arreglado ayer por commits `6afc6a8` (rewire) + `89b093c` (sweeps).

### Los 5 gaps reales 90→98 (con ubicación en código)
1. **Números en letras** — NO existe. `actaBuilder` + `/api/generate` imprimen dígitos crudos (`${vote.yes_votes} votos`, `${pct}%`). Falta `numeroALetras()` determinística. Gap visual más grande vs acta manual.
2. **`fphs-formalize` formaliza fragmentos aislados** → repite identificación de hablante. NO tocar reparto async (decisión Sam, sólida: un fallo aguas arriba contamina todo lo demás). Afinar prompt: regla números en letras, quitar tope 150-200 palabras, subir `max_tokens` (hoy 400, corta intervenciones largas).
3. **Fallback inyecta 1ª persona** = fuente de los "13 errores". En `fphs-formalize`, si la API falla → `text_formal: t` (texto CRUDO). `templateFormalize` mete cita literal entre comillas. Cada fallo de red = 1 error de 1ª persona.
4. **Imágenes: mete TODAS las del paquete** — `/api/generate` bloque IMAGES APPENDIX vuelca `parsed.images` completo (incluye screenshots de Zoom). → resolver con curaduría visual del Agente.
5. **Matcher de votaciones** — `matchVoteToSection` casa por keywords; votaciones tipo "cuál opción/ a quién se escoge/ tiempo de pago" quedan huérfanas → faltan en QA.

### TOLERANCIA INICIAL (decisión Sam, corregido mi modelo mental)
- Problema real: `attempt 0` es DEMASIADO estricto → formaliza poco contenido → QA e ICR corren con poca info → resultado malo. Aflojar NO es trampa de score: deja pasar MÁS contenido formalizado a las etapas siguientes, que es lo que Claude+QA+ICR necesitan para trabajar. Lo ausente no lo arregla nadie aguas abajo.
- **Cambio:** el comportamiento del `attempt 1` actual pasa a ser el run inicial (`attempt 0`). "Tu segundo run de hoy = tu primer run de mañana".
- **Matiz a implementar:** subir el nivel de FORMALIZACIÓN al de attempt 1 (más contenido pasa) pero dejar el GATE de evaluación honesto, para que el score que ve Ivette no se infle.
- **Bug UI:** el botón de re-run DESAPARECIÓ de la UI (`page.tsx`/`QAReportView` reciben attempt/maxAttempts pero el botón no renderiza). Hay que devolverlo, recontando `MAX_SWEEPS` desde la nueva base.

### AGENTE EXPERTO ForumPHs (reemplaza el `/api/icr` genérico) — 2 manos de criterio
- **Mano A — Auditoría legal Ley 284**: lo que hace hoy el ICR, pero con conocimiento Ley 284 embebido + reglas del acta GOAL. Permanente, registrado (AgentLab), invocado en cada corrida. Alimenta los banners de color.
- **Mano B — Curaduría visual de imágenes**: recibe `parsed.images` (base64), decide con visión cuáles pertenecen al acta (gráfico de votación SÍ, screenshot Zoom NO, convocatoria del ascensor quizá), en qué orden, y genera caption legal de cada una. Resuelve Gap 4 de raíz (mejor que filtro por nombre/tipo, que es frágil).
- Regla del sprint: **dato exacto que existe → determinístico/SQL (nunca agente); criterio/interpretación/visión → Agente.**

### LOOKUP DE FINCA → 4º (5º) fix determinístico + cierre con Agente
- Ley 284: cada unidad lleva su finca individual (finca hija de la matriz). Ivette hoy lo hace a mano = error de input a eliminar.
- **NO lo hace el agente** (Sam lo propuso, Claude corrigió a favor): un JOIN no alucina; un agente sí podría "completar" una finca inexistente = reintroduce el error. Lookup SQL exacto. Si null → `[FINCA PENDIENTE]` → **ICR lo levanta como warning** (cierra el lazo, Ivette lo ve).

### DECISIÓN DE ARQUITECTURA PERMANENTE — normalización unidad→finca
> Sam: "toma la decisión correcta para no volver a trabajar sobre esto, no un parche."

- **(1) Clave canónica GUARDADA** en `units.canonical_key` (no al vuelo), con **índice único `(building_id, canonical_key)`** que mata a nivel DB el bug de duplicados de Torres de Castilla. Una sola `normalizeUnit()` puebla la columna; el lookup siempre lee la columna persistida (auditable). El "al vuelo" queda sólo como función de generación, no como ruta de lookup.
- **(2) Patrones de descomposición por-edificio en TABLA DE CONFIG `building_normalization`** (`source_pattern` regex con grupos nombrados, `tower_strategy` explicit|embedded_prefix|none, `canonical_template`), editable sin deploy. **Sumar un PH nuevo = INSERT de una fila, NO código ni deploy.**
- **PRINCIPIO DE ECOSISTEMA derivado:** conocimiento específico-por-cliente vive como DATOS (config en DB), no como código. Aplica a futuras plantillas de acta, reglas de quórum, etc.
- Auto-diagnosticante: lo que no normaliza (fórmulas Excel de Venezia, etc.) falla en voz alta → warning ICR, en vez de devolver finca equivocada en silencio.

### DB ForumPHs (datos sensibles) — `tajuoqdbnsnzkhyqvdgs` (`forumphs-db`)
- Arquitectura de datos: **UNRLVL = operaciones** (apps, DF, jobs, labs) · **FPHS = datos sensibles** (propietarios, fincas, PHs, JDs). El DF vive en UNRLVL y llama a FPHS cuando necesita datos de propietarios.
- El proxy `fphs-mcp-proxy` permite datos pero requiere el project_id correcto (`tajuoqdbnsnzkhyqvdgs`, NO el de UNRLVL). Proyecto se pausa por inactividad (INACTIVE) — requiere reactivación manual de Sam en dashboard.
- Tabla `units`: campos `unit_code`, `tower`, `floor`, `finca`, `building_id`, `metraje`, `maintenance_fee`. Relación propietario↔unidad en `owner_units`.

### HALLAZGOS DE INTEGRIDAD DE DATOS (registrados en Professor) — NO son del sprint, son deuda de capa de datos
| PH | Formato unit_code | Torre | Cobertura finca |
|---|---|---|---|
| Firenze Tower | `06-A` | — | 80/80 ✅ |
| Lefevre 75 | `01-E-A`, `01-O-B` | — | 184/186 ⚠️ |
| Los Álamos | `C-001` | — | **227/329** 🔴 (102 faltan) |
| **Luxor Towers 300** | `T3 01-OF` | — | 143/143 ✅ (caso validación) |
| Parque Central | `1-001` | — | 82/82 ✅ |
| Plaza España | `1-1A` | — | 70/70 ✅ |
| Torres de Castilla | `10-A` **dup por torre** | A/B | 306/306 (códigos repetidos) |
| Venezia Tower | `=SUM(A10)+1` 🔴🔴 | — | 182/364 (CORRUPTA) |

- **Venezia CRÍTICO:** unit_code son fórmulas Excel sin evaluar; 364 = duplicado ×2 del real 182. Requiere REIMPORTACIÓN.
- **Luxor 300 = caso de validación del sprint** (datos sanos, finca 143/143).

### Próximos pasos (sin arrancar — esperan decisión de orden de Sam)
- [ ] Tolerancia inicial recalibrada + botón re-run restaurado
- [ ] Agente Experto (legal + visual + warning de finca)
- [ ] Fixes determinísticos generador (números en letras, fallback sin 1ª persona, matcher votaciones, lookup finca)
- [ ] Migración DB: `units.canonical_key` + índice único + tabla `building_normalization`
- [ ] (Deuda datos, aparte) Reimportar Venezia; completar fincas Los Álamos/Lefevre

### SMA (comando Actualiza)
- Sin novedades del agente para ForumPHs (el export del SMA corresponde a NeuroneSCF, otra marca).

---
*ForumPHs · fphs-formalize sprint · 2026-06-01 · diagnóstico + diseño, sin construcción*
