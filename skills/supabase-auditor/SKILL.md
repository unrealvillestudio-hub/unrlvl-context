# SKILL — Supabase Auditor
_Versión: 1.0 · 2026-06-03 · Mantenido por: Claude_

---

## QUÉ ES ESTE SKILL

Auditor de la capa de acceso a Supabase. Cruza el estado REAL de la base de datos (ACLs, policies, SECURITY DEFINER, advisors — leídos vía MCP) contra el código REAL que la consume (repos leídos vía github-auditor), y produce/actualiza `supabase_access_map.json`: el mapa de quién llama a qué objeto, con qué credencial, y si ese acceso es intencional.

**El problema que resuelve:** el Security Advisor de Supabase solo ve la base de datos. No puede saber si un grant `anon` sobre una función es parte del diseño dual-mode (intencional) o un agujero. Eso solo se sabe leyendo el código que la llama. Sin este cruce, hasta el `security` skill saca conclusiones equivocadas (ej: marcó `ops_costs` anon como crítico cuando es el mecanismo real de la app interna de costos).

**El valor diferencial sobre el advisor nativo:**
- Detecta **grants vestigiales**: objeto con grant anon que NINGÚN código usa -> revocar seguro.
- Detecta **bugs latentes**: código que llama con anon algo que asume service_role.
- Distingue **WARN de diseño** (intencional, dual-mode) de **agujero real**.

---

## INSTRUCCIÓN DE CARGA

Cargar cuando:
- Sam invoca el **protocolo auditor** (ver AUDITOR_PROTOCOL.md / userPreferences).
- Sam dice "supabase audit", "audita la db", "cruza código y db".
- El `ecosystem-auditor` recomienda correrlo (detectó cambios en un repo que toca Supabase).
- Después de una sesión de arquitectura que tocó tablas/funciones/policies/Edge Functions.

**NO se carga proactivamente** en cada `Actualiza` — el cruce código↔DB es caro (lee múltiples repos vía gh-auditor, consume rate limit del PAT). Solo bajo demanda del protocolo auditor.

**Skills previos a cargar:**
```
vercel/SKILL.md           ← fetch de URLs Vercel (incluido el proxy gh)
github-auditor/SKILL.md   ← lectura de repos
security/SKILL.md          ← estándares de RLS por tipo de tabla (clasificación heredada)
```

---

## RELACIÓN CON OTROS SKILLS

- **security/SKILL.md**: hereda de él la clasificación de tablas (brand/cliente/agente/ops) y el patrón de RLS "correcto" por tipo. El auditor verifica que la realidad cumpla ese estándar; cuando no lo cumple pero es intencional, lo anota en el map en vez de marcarlo como violación.
- **ecosystem-updater/SKILL.md**: mismo patrón de operación (síntesis en Chat, commit vía Claude Code, versión `YYYY-MM-DD-vN`, regenerar JSON completo nunca edición parcial). El supabase_access_map es un archivo derivado análogo a ecosystem_graph.
- **ecosystem-auditor/SKILL.md**: complementario. ecosystem-auditor detecta drift de topología de negocio; este detecta drift de topología de acceso. ecosystem-auditor puede recomendar correr este.
- **github-auditor**: dependencia dura. Sin el proxy `/api/gh` no hay cruce con código.

---

## ARQUITECTURA DEL PROCESO

```
Claude Chat (este skill)              Claude Code (repo local)
─────────────────────────            ─────────────────────────
Fase 1: Lectura DB (MCP)        →     Fase 4: Edición + commit
Fase 2: Lectura código (gh)            - Escribe supabase_access_map.json
Fase 3: Cruce + diff + síntesis        - Regenera ecosystem_graph.json (si cambió link)
                                       - Valida JSON · commit · push
```

**Por qué la división:** el cruce requiere síntesis entre Supabase real + repos, que funciona mejor en Chat con los MCPs. La escritura del archivo y el commit son mecánicos -> Claude Code. (El proxy `/api/gh` es solo lectura; no se puede commitear desde Chat.)

---

## DOS MODOS (como ecosystem-auditor)

### Modo identificativo (rápido, barato)
Lista cruda: para cada objeto con grant anon/PUBLIC, ¿hay un caller en código? Sin interpretar intencionalidad. Responde "¿qué objetos anon NO tienen caller conocido?" (candidatos vestigiales) y "¿qué cambió desde el último map?" (diff). Útil para chequeo rápido post-deploy.

### Modo contextual (profundo, caro)
Lee el código de cada caller, determina la credencial real, evalúa si el acceso es intencional según los design_principles, y puebla `intentional` (true/false/debatable) con `verified_in`. Es el que genera el map completo. Se corre en la primera pasada y tras cambios de arquitectura.

**Siempre preguntar a Sam:** "¿Lo querés identificativo o contextual?" antes de ejecutar.

---

## FASE 1 — LECTURA DE LA DB (MCP, barato)

```
Supabase:get_advisors (type=security)        → lista de WARN/ERROR actuales
Supabase:list_tables                          → tablas reales + RLS status
Supabase:execute_sql                          → ACLs y policies precisas:
```

Consulta canónica de ACLs (quién puede ejecutar cada función SECURITY DEFINER):
```sql
SELECT n.nspname AS schema, p.proname,
  CASE
    WHEN p.proacl IS NULL THEN 'PUBLIC'
    WHEN EXISTS (SELECT 1 FROM aclexplode(p.proacl) a WHERE a.grantee=0 AND a.privilege_type='EXECUTE') THEN 'PUBLIC'
    WHEN EXISTS (SELECT 1 FROM aclexplode(p.proacl) a JOIN pg_roles r ON r.oid=a.grantee WHERE r.rolname='anon' AND a.privilege_type='EXECUTE') THEN 'anon-explicit'
    ELSE 'restricted'
  END AS who_can_execute
FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
WHERE p.prosecdef=true AND n.nspname IN ('public','shopify','content')
ORDER BY who_can_execute;
```
> Usar `aclexplode` con `grantee=0` es la forma canónica de detectar PUBLIC. Es más fiable que parsear `proacl` a mano.

Policies permisivas:
```sql
SELECT tablename, policyname, cmd, array_to_string(roles,'+') AS roles, qual, with_check
FROM pg_policies WHERE schemaname='public' ORDER BY tablename;
```

---

## FASE 2 — LECTURA DEL CÓDIGO (gh-auditor, caro)

Para cada repo en scope, el patrón de detección de credencial es:
```
GET /api/gh?action=tree&repo=[REPO]
GET /api/gh?action=file&repo=[REPO]&path=/src/lib/supabaseClient.ts   (o equivalente)
```

**Señales a buscar en el código:**
- `VITE_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY` -> credencial **anon** (frontend/serverless sujeto a RLS).
- `SUPABASE_SERVICE_ROLE_KEY` -> credencial **service_role** (bypasea RLS).
- `rpc/[nombre]` en un fetch -> llamada a función. Anotar credencial del header `apikey`/`Authorization`.
- `/rest/v1/[tabla]` -> acceso directo a tabla. Anotar operación (GET/POST/PATCH/DELETE).
- `/functions/v1/[ef]` sin apikey -> el front llama una Edge Function (la EF tiene su propia credencial; seguir el rastro a la EF).

**Edge Functions** se leen con `unrlvl-supabase-mcp:get_edge_function` (resultado grande -> guardar a archivo y grep).

**Repos que tocan Supabase (scope típico):** CopyLab, ImageLab, VideoLab, SocialLab, Orchestrator, WebLab, VoiceLab, AgentLab, BlueprintLab, OnboardingApp, NeuroneSCF (kiosko + nscf-dispatch), unrlvl-ops, CoreProject, los MCP (shopify/supabase/meta), forumphs-*, DDMV-Assistant.

---

## FASE 3 — CRUCE Y SÍNTESIS

Para cada objeto de la DB, clasificar:

| Situación | Veredicto |
|---|---|
| Grant anon + caller anon en código + coherente con dual_mode | `intentional: true` — NO tocar (será WARN perpetuo) |
| Grant anon + NINGÚN caller en código | `intentional: false` — VESTIGIAL, candidato a revocar |
| Grant service_role + caller service_role | `intentional: true` — correcto |
| Código llama con anon algo que asume service_role | **BUG LATENTE** — flag rojo |
| Grant anon + caller anon pero patrón discutible (ej. DELETE financiero) | `intentional: debatable` — revisar diseño, no urgencia |
| Objeto sensible (tokens, datos cliente) legible por anon | **AGUJERO** — cerrar ya |

**Detección retroactiva (clave):** comparar el estado real contra el `supabase_access_map.json` guardado. El *diff* revela todo lo que cambió desde la última corrida, sin importar en cuántas sesiones ocurrió ni si se invocó el protocolo. El map versionado ES la memoria; el protocolo es solo el gatillo de ejecución. (Patrón git: `diff` contra el último estado conocido muestra todos los commits sin auditar.)

Producir diff estructurado:
```
NUEVOS (objeto/caller no estaba en el map):
- ...
CAMBIADOS (cambió credencial/operación/intencionalidad):
- ...
VESTIGIALES (grant sin caller -> revocar):
- ...
BUGS LATENTES (anon llamando algo que asume service_role):
- ...
AGUJEROS (sensible expuesto a anon):
- ...
```

---

## FASE 4 — PROMPT PARA CLAUDE CODE

```
Repo local unrlvl-context sincronizado con main.

TAREA: Actualizar supabase_access_map.json con la auditoría del [FECHA].

1. _meta.version → "[FECHA]-v[N]"
   _meta.previous → "[VERSIÓN ANTERIOR]"
   _meta.coverage → "[partial|full]"

2. access_entries → [reemplazos/adiciones con objeto exacto]

3. Si cambió el link con ecosystem_graph → regenerar ecosystem_graph.json completo.

VALIDACIÓN: parse JSON de ambos archivos antes del commit.

COMMIT: "supabase-audit: [FECHA] · [resumen 5-7 palabras]"
Archivos: supabase_access_map.json (+ ecosystem_graph.json si cambió)
```

Reglas: rutas exactas, regenerar JSON completo nunca edición parcial, un commit por auditoría, validación JSON obligatoria.

---

## OUTPUT AL FINAL DE CADA CORRIDA

Reportar a Sam:
1. Diff (nuevos/cambiados/vestigiales/bugs/agujeros).
2. Acciones de seguridad propuestas (REVOKE/DROP/ALTER) — NUNCA aplicar sin confirmación HRD.
3. Estado de cobertura (partial/full) y qué repos faltan.
4. Actualización propuesta para `security/SKILL.md` si la auditoría reveló drift en sus "ISSUES ACTIVOS".

---

## REGLA DE ORO

El map desactualizado es PEOR que no tener map: genera confianza falsa. Por eso `coverage` siempre refleja la verdad (`partial` hasta que se hayan leído todos los repos del scope) y cada entrada lleva `last_verified_sha`/fecha. Nunca marcar `intentional: true` sin `verified_in` apuntando al archivo de código que lo prueba.

---

## HISTORIAL DE AUDITS

| Fecha | Versión map | Modo | Cobertura | Hallazgos clave |
|---|---|---|---|---|
| 2026-06-03 | v1 | contextual (parcial) | partial | Fuga tokens shopify_stores cerrada · ~20 funciones SECURITY DEFINER restringidas · nscf_draft_orders cerrada · rotate_sequence_current + upsert_brand_cache + copylab_jobs confirmados intencionales (dual-mode) · ops_costs anon=debatable |

---

_Supabase Auditor SKILL v1.0 · Unrealville Studio · 2026-06-03_
_Ubicación canónica: `skills/supabase-auditor/SKILL.md`_
