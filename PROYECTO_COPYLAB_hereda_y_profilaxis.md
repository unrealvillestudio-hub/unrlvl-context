# PROYECTO CopyLab — el generador hereda, no reconstruye · profilaxis del desvío

_Persiste el brief de CopyLab (sesión previa) · Rama `ctx/labs-son-apps` · v2026-08-01-v1_
_Documento de plan. No es fuente de verdad de estado — el estado vive en `ecosystem.json`, `IID/session_log.md` §9 y `AGENDA.md`._

---

## Contexto en una frase

El carril async **no llama a CopyLab**: arma el copy con `buildFromGenome`, un motor **local** dentro de
`content-run-stage`, mientras `lab_configs` declara `copylab → unrlvl-copy-lab.vercel.app` y nunca lo
invoca (lo mismo con `sociallab` / `runSocialLabDirect`). Eso es una **⚠️ DESVIACIÓN a corregir, NO
arquitectura** (ver `ecosystem.json → labs._note`, `iid_subsystem.pipeline.flow` y `labs_wiring`). Este
documento es el plan para corregirla sin perder gobierno: el generador **hereda** las capas que hoy
gobiernan la pieza y **vuelve a llamar al lab** por su `api_endpoint`, en lugar de mantener un motor
duplicado.

**El principio que ordena todo el proyecto:** _ningún carril construye el motor de un lab que ya existe._

---

## Fase A — el generador hereda las 5 capas de gobierno

La corrección no puede degradar la calidad: `buildFromGenome` **sí** aporta gobierno (lo que no aporta es
ángulo creativo, que es justamente lo que tiene CopyLab). Por eso el generador unificado debe **heredar
las 5 capas de gobierno** antes de que `buildFromGenome` pueda retirarse.

De esas 5 capas, **dos son portación real** — código de gobierno que se trae desde/hacia CopyLab en este
frente, no algo que ya estuviera resuelto:

1. **Voz por destino** (`voice_by_destination`) — la voz la decide la marca por destino
   (`intel.brand_topics`), no un `default_voice` de agente. Es la raíz del bug off-brand ya diagnosticado:
   la marca declara qué consume y con qué voz; el agente investiga neutro.
2. **Reglas del Watcher** — el generador se juzga con las **mismas** reglas que el juez
   (`intel.watcher_rules`, con su precedencia `brand > sector > gen` y el **código de regla** visible).
   Prescriptor y juez sobre el **mismo** catálogo; el patrón de M-9 ("el Builder lee las reglas que lo
   juzgan"), llevado al generador unificado.

Las **tres capas restantes** son gobierno que el motor ya carga hoy y que el generador unificado debe
**conservar** al heredar (L0 marca/mercado, eje estructural/`angle`, y genoma de marca — la enumeración
canónica de las 5 vive en el brief de origen). El criterio es el mismo para todas: se heredan, no se
reimplementan.

### Dos correcciones propias (defectos de CopyLab, a arreglar en la herencia)

- **`packInstructions` fuerza CTA.** CopyLab impone un CTA aunque la pieza no lo pida. Al heredar, el
  generador **no** debe arrastrar esa imposición: el CTA es del objetivo/plataforma, no un default del
  empaquetador.
- **Idioma ignorado.** CopyLab vosea pese al parámetro de idioma. El eje idioma (M-12·B: fila por
  plataforma × voz × idioma, `brand_topics.languages → iid_content_queue.language → builder_input.language`)
  debe ser **obligatorio** también aquí; retrocompat `NULL → comportamiento de hoy`.

### Dos abiertas (no bloquean, pero se registran)

- **Falta el `await` de `upsertSnapshot` en CopyLab.** Sin el `await`, el snapshot puede no persistir. A
  cerrar antes de confiar el carril a CopyLab.
- **Catálogo de vectores aún monoindustria.** Los 44 vectores creativos son de una sola industria; el
  generador multiindustria necesita el set editorial/por-industria. Converge con la UNIFICACIÓN
  (cache por marca con capas por industria).

---

## Fase B — `execLab` en el stage `copylab`, y retiro seguro del motor local

El stage `copylab` del carril deja de usar el motor local y pasa a **`execLab`**: llama a CopyLab por su
`api_endpoint` de `lab_configs` (`unrlvl-copy-lab.vercel.app /api/execute`), como ya se hace con ImageLab
(el único lab que hoy el carril invoca de verdad por su endpoint).

**Condición de retiro — dura:** `buildFromGenome` se retira **sólo** cuando (a) las **5 capas de gobierno**
están heredadas y verificadas en el generador unificado, y (b) hay una **corrida verificada** end-to-end
que confirma paridad de gobierno + ángulo. Hasta entonces, el motor local se conserva: la calibración
sigue con `buildFromGenome` y **no** se bloquea por este frente.

---

## Fase C — SocialLab, el mismo patrón

`sociallab` repite la desviación: el carril arma el post con `runSocialLabDirect` (local) mientras
`lab_configs` declara `sociallab → social-lab-flame.vercel.app` y no lo invoca. La corrección es idéntica
a la de la Fase B: el stage vuelve a **llamar al lab** por su `api_endpoint` (`/api/execute` + `/api/publish`),
con la misma condición de retiro (capacidad heredada + corrida verificada) antes de apagar el motor local.
SocialLab es la vía de publicación **única** al público y debe operar dual-mode (`sync` vía UI + `async`
vía Orchestrator) igual que CopyLab e ImageLab.

---

## Principio de cierre

Ningún carril construye el motor de un lab que ya existe. Si un carril necesita la capacidad de un lab, lo
**llama por su `api_endpoint`**. Un lab es una aplicación con superficie humana; el motor que lleva dentro
es intercambiable, el lab no. Esta corrección **converge con el Proyecto UNIFICACIÓN** (cache + generador),
que es BLOQUEANTE de R4B — pero la calibración no depende de ella.

---

## Cierre — 2026-08-01

**Fase A ejecutada y cerrada** en los PRs #8–#13 (CopyLab @ `main` `e7d517c`). El **diagnóstico de este
documento se mantiene como registro** — no se reescribe. El **estado vigente** de CopyLab vive en
`knowledge/ecosystem/labs/COPYLAB_NOTES.md`; la **continuación** (Fase B: `execLab` en el stage `copylab`,
retiro seguro de `buildFromGenome`) va al handoff de Fase B.

---

## Actualización de estado — 2026-08-14 (verificada por código)

Las dos "abiertas" de la Fase A quedan reconciliadas contra el código en `main`:

- **`await` de `upsertSnapshot` — CERRADO.** `CopyLab/api/brand-cache.js` está en v2.4 con
  `await upsertSnapshot(...)`, escritura con `SUPABASE_SERVICE_ROLE_KEY` vía `sbWriteHeaders()`
  (que LANZA si la key no está definida, en vez de caer a anon en silencio), y comprobación de
  `res.ok` con throw nominal (status + cuerpo). Se corrigió en v2.1 (2026-07-31, el `await`) y
  v2.3 (2026-08-02, service_role + fail-loud), es decir DESPUÉS de que este documento se
  escribiera. Ya NO es condición previa para confiar el carril a CopyLab.
- **Catálogo de vectores monoindustria — MATIZADO, sigue abierto.** Los 44 `creative_vectors`
  siguen siendo globales e idénticos para todas las marcas. Pero la capa que decide la
  ELEGIBILIDAD por voz sí está sembrada para dos de las tres voces de ForumPHs:
  `creative_compatibility_rules` tiene filas para `editorial_post` (fphs_editorial,
  fphs_educativa, lucien_editorial, nscf_editorial), `email_divulgacion` (fphs_educativa) y
  `social_post` (BASE, fphs_editorial, fphs_educativa, nscf_conversion), todas con notas de
  criterio de genoma. El comentario del header de `CopyLab/api/execute.ts` que declara
  "editorial_post/email_divulgacion aún no tienen fila en creative_compatibility_rules" está
  DESACTUALIZADO (ver §5.3 de este Actualiza).
  **El gap real y cuantificado:** `fphs_conversion` NO tiene fila en ningún content_type, y
  gobierna 11 topics activos en `editorial` y 11 en `social` — 22 de los 32 topics activos de
  ForumPHs. Como `editorial_post` no tiene fila BASE (las cuatro llevan `voice_id`),
  `selectCompatRule` devuelve `source='none'` y `applyCreativeLogic` recibe `rule=null`:
  filtra sólo por `aggro_min/max` y deja elegibles casi los 44 vectores de e-commerce. En
  `social_post` sí hay BASE, así que degrada a `source='base'` con warn nominal.
  **PENDIENTE:** sembrar `fphs_conversion` × `editorial_post` y × `social_post`, al nivel de
  criterio de las filas vecinas (leer el genoma, no improvisar).
- **No-repeat del vector creativo — CONFIRMADO ROTO en el carril.** `content-run-stage`
  `L1563-1569` `buildPreviousOutputs` no setea `last_creative_vector`, así que
  `applyCreativeLogic` no tiene con qué filtrar y el mismo vector puede repetirse
  indefinidamente. Ítem de Fase B.

### Fase B — inventario cerrado de lo que falta

Verificado por código. Ninguno es rediseño; todos son cableado:

1. **`execLab` no puede transportar `builder_input`.** Firma en `content-run-stage` `L442`:
   `(endpoint, path, brandId, stage, params, previousOutputs, timeoutMs)`. CopyLab lo espera
   TOP-LEVEL, hermano de `brandId/stage/params/previousOutputs` — no dentro de `params`.
   Hay que extender la firma.
2. **`previousOutputs.brandContext` impide que CopyLab lea el snapshot.** `L1565` mete
   `brandContext` en el `po`; CopyLab hace
   `req.previousOutputs.brandContext ?? await fetchBrandCache(brandId)` y el `??` corta antes.
   Resultado: CopyLab recibe el `context_json` pobre (identity/goals/personas/compliance) y los
   8 slices del motor creativo, registro, canal y geomix caen a query directa. Correría otra vez
   amputado, por un `??`.
3. **Timeout.** `execLab` default 65.000 ms; CopyLab declara `maxDuration = 300`. Un editorial
   de 4000 tokens necesita techo explícito mayor.
4. **`last_creative_vector`** — ver arriba.
5. **Mapeo de la respuesta** a `assets.copy` + `assets.builder_meta`. CopyLab NO devuelve
   `destination`, `destination_source`, `angle_used`, `brand_topic_id` ni `audience_frame`:
   esos ya los tiene el carril (viajan EN el `builder_input`, y `brand_topic_id` sale de
   `loadBrandTopic`), así que se escriben desde el carril sin pedírselos al lab.
6. **Ledger.** `logGen` para copylab pasa a leer `usage.input_tokens` / `usage.output_tokens`
   de la respuesta de CopyLab, no de `buildFromGenome`.

**Condición de retiro de `buildFromGenome` — sin cambios:** sólo tras corrida verificada
end-to-end con paridad de gobierno + ángulo. Se retira en un PR posterior, nunca en el mismo
que introduce el cable.
