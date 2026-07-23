# ESTADO REAL + HANDOFF — sesión 2026-07-23 (FPHs · genoma de conversión)

> Documento de traspaso. Verificado contra DB y contra `list_edge_functions` el 2026-07-23.
> No contiene supuestos: lo que no se verificó está marcado `[NV]`.

---

## ⚠️ ADENDA DE ESTADO — posterior a la redacción de este documento

**P1 (deploy de las 3 EFs) está CERRADO.** Verificado por CC contra `list_edge_functions` el
2026-07-23, después de que se escribiera §0:

| EF | entrypoint al escribir el doc | entrypoint verificado ahora |
|---|---|---|
| `iid-core` | `_32` | **`_33`** ✅ |
| `content-watcher` | `_14` | **`_16`** ✅ |
| `content-run-stage` | `_50` | **`_51`** ✅ |

Los 4 PRs (#23, #24, #25, #26) **sí están corriendo en producción**. Todo lo que este documento
dice más abajo sobre "nada está desplegado" describe el estado al momento de redactarlo y se
conserva íntegro como registro — **no se borra, se corrige aquí**.

**P2 también quedó CERRADO el mismo día.** `platforms_by_destination` sembrado en **las 48 filas**,
por Claude bajo HRD. Exhaustividad verificada en ambas direcciones:
`platforms ⊆ union(social, editorial)` en **48/48** y `union ⊆ platforms` en **48/48** → cero
plataformas huérfanas (que dejarían de publicarse sin warn) y cero literales fantasma.

**`email_propietarios` resuelto — destino `editorial`.** Deja de ser `[NV]`. Razón: está en
`PLATFORM_NO_ADAPT`, su objetivo declarado es `relacion_de_confianza` (→ `trust`), y un email
educativo respira largo — mandarlo a `social` lo empujaría a "pieza corta y filosa".

Reparto sembrado, para el registro:

| marca | filas | `social` | `editorial` |
|---|---|---|---|
| LucienSael ⚠️ **split real** | 3 | `x`, `meta_fb`, `meta_ig`, `tiktok` | `blog` |
| FPHs Educativa | 7 | `meta_fb`, `meta_ig`, `linkedin` | `blog_forumphs`, `email_propietarios` |
| FPHs Editorial + Conversión | 25 | `meta_fb`, `meta_ig`, `linkedin` | `blog_forumphs` |
| NeuroneSCF | 5 | `meta_fb`, `meta_ig`, `tiktok` | _(idéntico)_ |
| UnrealvilleStudio | 8 | `linkedin`, `meta_fb`, `meta_ig` | _(idéntico)_ |

**Consecuencia:** el frente activo pasa a **P3 · U4** (fan-out parte por plataforma), que va junto
con **P4** en un mismo PR: el sembrado de P2 le dio a LucienSael un **split real**, su fila
editorial materializa `blog` como `platforms[0]`, y sin P4 ese ensayo entraría al adaptador con
reglas de Instagram.

Pendiente de correr: el **smoke test** post-deploy descrito en P1 (pieza `doliente` → CTA de
exigencia; `stimulus_source` = `"declared"`). Sam decide el momento — requiere generar pieza real.

---

## 0 · LA LÍNEA QUE IMPORTA

**Nada de lo mergeado hoy está corriendo.** Cuatro PRs entraron a `main` (#23, #24, #25, #26)
y las tres Edge Functions afectadas siguen sirviendo código viejo. El pipeline en producción
hoy se comporta exactamente como ayer.

| EF | entrypoint vivo | contiene | le falta |
|---|---|---|---|
| `iid-core` | `_32` | — | #23 (PBD) · #24 (mapeo etiquetas + fail-loud) |
| `content-watcher` | `_14` | — | #24 (gate7 frente) · #25 (gate5 variante) |
| `content-run-stage` | `_50` | — | #25 (datos al ctx) · #26 (U2+U3) |

**Consecuencia:** las 32 filas de ForumPHs están sembradas y correctas, pero si el cron corre
hoy, el fan-out usa el código viejo. `objective_by_platform` y `audience_frame` se ignoran.

> _Superado por la ADENDA de arriba: las tres EFs quedaron en `_33` / `_16` / `_51` el mismo día._

---

## 1 · LO QUE SÍ QUEDÓ CERRADO (verificado en DB)

### 1.1 · Datos — `intel.brand_topics`
| marca | filas | `objective_by_platform` | `audience_frame` | `platforms_by_destination` |
|---|---|---|---|---|
| ForumPHs | 32 | 32 ✅ | 18 ✅ | **0 ❌** |
| LucienSael | 3 | 0 | 0 | **0 ❌** |
| NeuroneSCF | 5 | 0 | 0 | **0 ❌** |
| UnrealvilleStudio | 8 | 0 | 0 | **0 ❌** |

- 18 topics `fphs_conversion` sembrados (9 dominios × 2 frentes: 9 `jd` + 9 `doliente`).
- Las 32 filas FPHs tienen `blog_enlace` en `hard_rules` (enlace interno obligatorio en blog).
- Las 18 de conversión referencian `brand-intel/forumphs/bi_2025.json` en `hard_rules.fuente_bi`.

### 1.2 · Migraciones aplicadas hoy (vía MCP, registradas en `schema_migrations`)
| version | nombre |
|---|---|
| `20260722123606` | `add_audience_frame_to_brand_topics` |
| `20260723132411` | `widen_iid_content_queue_voice_check_fphs` |
| `20260723185304` | `brand_topics_platforms_by_destination` |

`intel.iid_content_queue.voice` CHECK admite ahora 6 voces:
`lucien_social`, `lucien_editorial`, `unrlvl_default`, `fphs_conversion`, `fphs_educativa`, `fphs_editorial`.

### 1.3 · Storage
Bucket **`brand-intel`** creado (privado, MIME `application/json` + `text/html`).
- `brand-intel/forumphs/bi_2025.json` — 7 hallazgos financistas destilados del BI real
- `brand-intel/forumphs/bi_2025_source.html` — fuente-verdad original

> El bucket `iid-expert-uploads` **no sirve** para esto: su `allowed_mime_types` es solo
> video/imagen. Fue el error que llevó a crear `brand-intel`.

### 1.4 · `public.brands` (ForumPHs) — Ley 284 erradicada
Corregidos 5 campos. El más grave era `extra_instructions`, que **ordenaba** *"Citar Ley 284
cuando relevante"* — contradecía frontalmente la regla dura de marca.

| campo | estado |
|---|---|
| `key_messages[2]` | ✅ → "Criterio jurídico especializado en Régimen de Propiedad Horizontal en cada decisión" |
| `agent_value_prop` | ✅ |
| `territory` | ✅ |
| `differentiators[2]` y `[5]` | ✅ (incluye rol canónico de Ivette) |
| `extra_instructions` | ✅ ahora prohíbe explícitamente citar Ley 284 |
| `brand_context` | ⬜ intacto a propósito — explica *por qué* no se cita |

Genoma y `brand_topics`: sus menciones de "284" son **reglas prohibitivas**, correctas. No tocar.
`fphs_institucional` (v0.5, **inactivo**) sí tiene menciones-violación en `lexicon_signature`
y `argumentative_architecture` — irrelevante mientras siga inactivo.

### 1.5 · Sitio forumphs.com
`index.html` corregido y **subido a GitHub por Sam**. 25 ediciones:
- 9 × Ley 284 → Régimen de PH
- 4 × rol Ivette → "Abogada · Especialista en Régimen de Propiedad Horizontal"
- 9 × oposicionales eliminadas (incluido `no un intermediario` del **hero**)
- Hero reescrito con el slogan invariable; About reanclado al oficio (no a 2015)
- Datos: 8 PH activos · +10 años de oficio · ~1.500 unidades
- Sección nueva **"Inteligencia financiera"** con 4 quotes BI + nav
- FAQ nuevo del **frente doliente**
- Fecha fija → "Último período"

---

## 2 · PENDIENTES — ordenados por bloqueo real

### ✅ P1 · DEPLOY de las 3 EFs — **CERRADO** (ver ADENDA)
Desplegadas y verificadas: `iid-core` `_33` · `content-watcher` `_16` · `content-run-stage` `_51`.
Queda por correr el **smoke test** descrito abajo. El texto original se conserva como referencia
del procedimiento:

> Sin esto, los 4 PRs mergeados no existen para el pipeline.
>
> **Orden obligatorio** (la migración PBD ya está aplicada, así que el riesgo 42703 está resuelto):
> 1. `iid-core` (dir completo: `index.ts` + `fanout.ts`)
> 2. `content-watcher`
> 3. `content-run-stage`
>
> **Reglas:**
> - El deploy manda el **directorio entero** de la EF, no el archivo.
> - Snapshot antes de deploy.
> - La versión real desplegada es el sufijo de `entrypoint_path`, **no** el contador `version`.
> - `deploy_edge_function` incrementa el contador en cada llamada aunque no cambie contenido:
>   verificar siempre con `get_edge_function` antes de asignar número.

**Smoke test post-deploy (PENDIENTE):** una pieza `doliente` debe generar CTA de exigencia (no
"contáctenos"); `gate_detail.objective_stimulus.stimulus_source` debe decir `"declared"`, no
`"inferred"`.

### ✅ P2 · Sembrar `platforms_by_destination` — **CERRADO** (48/48, ver ADENDA)
Sembrado por Claude bajo HRD el 2026-07-23. Exhaustividad verificada en ambas direcciones (48/48
en cada una). `email_propietarios` → `editorial`. El reparto por marca está en la ADENDA.
El texto original se conserva porque la trampa que documenta sigue siendo la regla al tocar la
columna:

> La columna existe y el código de #23 la consume, pero **nadie la sembró**. El propio PR la
> declaró fuera de alcance ("lo ejecuta Claude con Sam bajo HRD").

**Trampa documentada en #23 — el split es EXHAUSTIVO:** una plataforma que está en `platforms`
pero no aparece en ningún destino **deja de publicarse, sin warn**. La unión de los dos arrays
debe cubrir `platforms` completo salvo baja deliberada.

Vocabulario real por marca (verificado):
| literal | filas | marcas |
|---|---|---|
| `meta_fb` | 48 | FPHs, Lucien, NSCF, UNRLVL |
| `meta_ig` | 48 | FPHs, Lucien, NSCF, UNRLVL |
| `linkedin` | 40 | FPHs, UNRLVL |
| `blog_forumphs` | 32 | ForumPHs |
| `tiktok` | 8 | Lucien, NSCF |
| `email_propietarios` | 7 | ForumPHs (voz educativa) |
| `x` | 3 | LucienSael |
| `blog` | 3 | LucienSael |

Propuesta para FPHs (las 32 filas, misma voz en ambos destinos → recibe la unión):
`{"social": ["meta_fb","meta_ig","linkedin"], "editorial": ["blog_forumphs"]}`
~~Las 7 con `email_propietarios` necesitan decisión: ¿editorial o canal aparte? **[NV]**~~
→ **RESUELTO: `editorial`** (está en `PLATFORM_NO_ADAPT`, objetivo `relacion_de_confianza` → `trust`,
y un email educativo respira largo; `social` lo empujaría a pieza corta y filosa).

### 🟠 P3 · U4 — fan-out parte por plataforma (`platforms = [p]`) ← FRENTE ACTIVO
**Los 3 prerrequisitos ya están en `main`:** U1 (#25), U2+U3 (#26), D1+D2 (datos).
Decisión de arquitectura tomada el 21-jul: **Corte A**. Con `platforms=[p]` de un elemento,
P2/P4/P5/P6 quedan correctos sin tocar una línea.

**U4 cierra por diseño el defecto de `platforms[0]`** que detecté hoy: hoy 25 de 32 filas FPHs
resuelven su preset desde `linkedin` (su `platforms[0]`), así que el caption de Meta hereda voz
de LinkedIn. Con una fila por plataforma, `platforms[0]` **es** la plataforma de destino.
No escribir parche intermedio: U4 lo tira.

### 🟠 P4 · `blog` de LucienSael en `PLATFORM_NO_ADAPT`
CC metió `blog_forumphs` y `email_propietarios`. **`blog` (3 filas, LucienSael) quedó fuera** y
sigue recibiendo reglas de Instagram. Es una línea. Preguntar a CC antes de dar #26 por cerrado.

### 🟡 P5 · Registro de migraciones divergido
3 de 6 migraciones del repo no están en `schema_migrations`:
- `20260716220000_brand_topics_objective_by_platform` — no registrada
- `20260701120000_iid_seeds_add_ocr_text_capture_intent` — no registrada
- `20260626190000_...seeder_brand_suggestion` — registrada con otro version (`20260626202248`)

**Consecuencia operativa: `supabase db push` NO es fiable en este proyecto.** Usar
`apply_migration` del MCP, que sí registra correctamente (las 3 de hoy quedaron bien).
Ventana propia de saneamiento.

### 🟡 P6 · Umbral de gate5 no es comparable entre marcas
Hallazgo de M1: 0.80 no significa lo mismo por marca — UNRLVL ~0.88 por repetición de
esqueleto; Lucien ~0.72. Deuda anotada, no resuelta.

### 🟡 P7 · Voice sibling `Ivette-persona`
Requiere sesión de calibración (bucle Boids), no es trabajo de CC.

### 🟢 P8 · BI como imán de conversión (sitio)
Decisión tomada: el BI completo **no** va en la home (mata la curiosidad y regala metodología).
Dos caminos abiertos para otra sesión:
- **A** — reescribir el CTA del diagnóstico para prometer un informe como el BI + capturas parciales
- **B** — página `/inteligencia` dedicada, enlazada desde la sección de quotes

### 🟢 P9 · Seguridad `intel` (🟠 latente, no activo)
Sin cambios hoy. `intel` expuesto vía PostgREST; `iid_scheduler_config` con `USING(true)`;
`trigger_iid_agent` EXECUTE a PUBLIC. Mitigante: `auth.users` tiene cero usuarios.

---

## 3 · DECISIONES TOMADAS HOY (no reabrir)

| decisión | resolución |
|---|---|
| ¿9 topics o 18? | **18** — un dominio × frente real. Los 9 tienen doble frente. |
| ¿`audience_frame` como columna? | **Sí**, con CHECK `IN ('jd','doliente','general')`. Patrón reusable para marcas con decisor≠usuario. |
| Frente `doliente`: ¿qué voz? | `fphs_conversion` con CTA de exigencia. **No** es educativa. |
| Plataformas por frente | **Las 4 en ambos frentes.** La plataforma no segmenta audiencia: segmenta *función*. Meta recluta → LinkedIn/blog convierte. |
| Cadence del blog | `on_supply` — sin tope de frecuencia. |
| ¿BI completo en el sitio? | **No.** As bajo la manga; punto de cierre, no de entrada. |
| ¿`email_propietarios` en PR aparte? | **No.** Mismo bug, misma línea. Va con `blog_forumphs`. |
| ¿Parche a `platforms[0]`? | **No.** U4 lo resuelve por diseño. |

---

## 4 · REGLAS DE VOZ NUEVAS (aplican a TODO el ecosistema, no solo FPHs)

1. **Fechas siempre relativas.** "Al tercer año", "dentro de cinco años" — nunca "2028".
   Un año fijo caduca solo y pierde urgencia cuando el lector lo ve pasada la fecha.
2. **"cuota extraordinaria" completo**, nunca "la extraordinaria" como sustantivo suelto.
3. **Cadena de consecuencia encadenada** (mecanismo del BI, enseñado por Sam):
   dato → lectura superficial → lectura del financista → eslabones que suben la apuesta →
   remate con el gasto futuro que se cae. Cada cifra reencuadra la anterior.
4. **Reflexión-espejo**: la pregunta que el lector nunca se hizo sobre *su propio* caso.
5. **El vacío habla solo.** No acusar: dar la herramienta y dejar que la ausencia de
   respuesta sea el hallazgo.
6. **Blog nunca es callejón sin salida** — toda pieza cierra invitando a otro artículo.
7. **Cifras reales sin atribuir origen.** El candado no es no-usar-cifras: es no-decir-de-quién.

---

## 5 · INSTRUCCIONES PARA EL PRÓXIMO CHAT

### Apertura
```
protocolo actualización
```
Marca/proyecto: **ForumPHs** (o "IID pipeline" si el foco es deploy).

### Lo primero que hay que hacer, sin preguntar
**Verificar el estado de deploy** antes de cualquier otra cosa:
```
Supabase:list_edge_functions → leer el sufijo de entrypoint_path de
iid-core, content-watcher, content-run-stage
```
Si siguen en `_32` / `_14` / `_50`, **P1 sigue abierto y bloquea todo**.
_(Al 2026-07-23 quedaron en `_33` / `_16` / `_51` → P1 cerrado. La verificación sigue siendo el
primer paso: confirma que nadie redeployó código viejo encima.)_

### Orden de trabajo sugerido
1. ~~**P1 deploy** (3 EFs, orden estricto)~~ ✅ hecho — falta solo el **smoke test** (Sam elige cuándo)
2. ~~**P2 sembrar `platforms_by_destination`**~~ ✅ hecho, 48/48 verificadas en ambas direcciones
3. **P3 (U4) + P4 en un mismo PR** ← frente activo. Van juntos porque el split real de LucienSael
   materializa `blog` como `platforms[0]` y sin P4 ese ensayo entra al adaptador con reglas de IG
4. Lo demás según prioridad de Sam

### Lo que NO hay que volver a discutir
Todo lo de §3. Están decididas y verificadas.

### Cómo trabaja Sam (recordatorio operativo)
- Decisiones son suyas, pero **solo llegan a él si el análisis no las resuelve**.
- **Nunca ofrecer una opción que uno mismo va a desaconsejar.** Si el análisis ya concluyó,
  presentar la conclusión, no un menú.
- **Leer la fuente antes de escribir sobre ella.** Nunca asumir estructura de archivo o tabla.
- Fail-loud sobre degradación silenciosa, en todo el ecosistema.
- CC ejecuta y abre PR; **nunca mergea ni despliega**. Sam mergea.
- Escrituras a `intel.brand_topics` las hace Claude con Sam bajo HRD — **no CC**.
- Respuestas breves y directas. Pushback honesto, sin adulación.

---

## 6 · GOTCHAS DE HERRAMIENTA CONFIRMADAS HOY

- `execute_sql`: schema-qualified obligatorio (`intel.brand_topics`). VALUES, no INSERT…SELECT.
  Angle brackets en literales rompen el parser. Textos largos → tandas de ~6 filas.
- `apply_migration` **sí** registra en `schema_migrations`. `supabase db push` **no** es fiable acá.
- El MCP de Supabase **no tiene** herramienta de Storage upload. Subida por dashboard o CC con
  `SUPABASE_SERVICE_ROLE_KEY` en env (CC no la tiene hoy — se detuvo correctamente).
- Proxy `unrlvl-context.vercel.app/api/gh` lee **solo `main`**. Ramas de PR no accesibles:
  para revisar un PR abierto hay que pedirle el contenido a CC o a Sam.
- Buckets con `allowed_mime_types` restrictivo rechazan silenciosamente por tipo: verificar
  antes de subir.

### Añadidas el 2026-07-24 (incidente de deploy de `iid-core` — falsa alarma, ver abajo)

- **La transcripción manual queda DESCARTADA como método de deploy** para archivos de este tamaño.
  **Incluye la vía MCP:** `deploy_edge_function` exige `files:[{name, content}]`, o sea que el
  contenido pasa **escrito** por quien llama — 45 KB entre `index.ts` y `fanout.ts` por un canal
  que no garantiza fidelidad. Aplica a cualquier EF del ecosistema, no solo a `iid-core`.
- **Canal correcto: `supabase` CLI** (v2.109.1, instalada y logueada el 24-jul). Los bytes van de
  la API al disco y del disco al diff, sin intermediario que los reescriba:
  `supabase functions download <slug> --project-ref <ref> --use-api` (el `--use-api` evita Docker)
  y `supabase functions deploy <slug>` para subir desde disco.
- **`diff --strip-trailing-cr` es OBLIGATORIO** al comparar repo contra deploy: el repo está en
  CRLF y el deploy en LF puro. Sin eso el diff sale 100 % falso positivo.
- **Invocar una EF y ver que responde NO verifica su contenido.** Una variable sin declarar es
  `ReferenceError` en *ejecución*, no error de parseo — Deno hace type-stripping, no type-check:
  la función arranca igual y devuelve su 400 de validación sin tocar nunca la rama rota. Misma
  familia de falso-verde que el `node --check` (que además no corre sobre `.ts`). Para verificar
  contenido: leer el bundle con `get_edge_function`, y para cerrarlo, paridad byte a byte.
- **Un `ezbr_sha256` que no cambia entre dos deploys NO significa "no entró el cambio"** — significa
  "el segundo deploy no cambió nada". `deploy_edge_function` incrementa el contador `version` en
  cada llamada aunque el contenido sea idéntico. Leer el sufijo de `entrypoint_path`, no el contador.
