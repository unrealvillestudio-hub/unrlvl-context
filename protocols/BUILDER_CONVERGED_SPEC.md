# BUILDER CONVERGIDO — Spec de ejecución para Claude Code

> **Nota A3 (2026-08-18).** El generador local de `content-run-stage` —el motor de escritura que vivía
> dentro de la EF— se retiró; el generador del carril es CopyLab, vía `execLab` + `builder_input`. Las
> menciones de abajo son registro histórico y describen el estado de entonces; el identificador que tuvo
> aparece acá como `generadorLocal` y su historia completa queda en el cuerpo del PR de A3.

### Reescritura in-place de `callClaudeDirect → generadorLocal()` dentro de `content-run-stage`
_Versión 1.0 · 2026-06-16 · Autor: Claude (chat) · Ejecutor: Claude Code · Marca: LucienSael + UnrealvilleStudio (piloto)_

---

> **ESTADO 2026-08-01 — SUPERSEDIDA PARCIALMENTE.** Esta spec creó `generadorLocal`, que sigue vivo y en producción. CopyLab Fase A (PRs #8–#13) trasladó su gobierno al lab vía el contrato `builder_input`; Fase B retira `generadorLocal` del carril. **Los parámetros de modelo de §3 están caducados y NO deben seguirse:** `claude-sonnet-4-20250514` está retirado, `temperature` con cualquier valor no-default hace fallar a Sonnet 5 con 400, y los techos vigentes son 4000 editorial / 640 social. La lógica de resolución de §2 (marca, tema, voz híbrida por destino, genoma) sigue siendo canónica y es la que Fase B extrae a `buildBuilderInput()`.

---

## 0. CONTEXTO Y DECISIÓN DE ARQUITECTURA

**Decisión tomada (Sam, 2026-06-16): A1 — cirugía in-place.**
NO se crea EF nueva. Se reescribe **solo** la función `callClaudeDirect` (stage 1 = copylab) dentro de la EF `content-run-stage`, renombrándola a `generadorLocal`. El resto de la máquina de stages (aife, imagelab, sociallab, email Resend, logging) queda **intacto**.

**Por qué importa:** el "builder convergido" del que habla `ecosystem.json` es conceptual (un solo builder que lee `intel.brand_topics` e inyecta `brand_voice_genome`), no una topología nueva. Mínimo blast radius.

**Estado del código real (verificado 2026-06-16 leyendo la EF deployada):**
- EF `content-run-stage` — **deployed version 25** (el comentario de cabecera dice `v1.11`, es drift de comentario; la versión real del runtime es 25).
- `callClaudeDirect(brandId, bc, pack, canal, extraInstructions)` está en stage 1 (`lab.lab_key === "copylab"`).
- Hoy arma el prompt desde `context-cache` (identity/humanize/copy_profile del sistema VIEJO `content.brand_voices`). Busca la voz con `brandContext.voices.find(v => v.slug === job.voice)` — esto NO es el genoma bueno.
- **NO lee** `intel.brand_topics`. **NO lee** `brand_voice_genome`. **NO inyecta** lexicón/sintaxis firmados.

**Los 3 bugs que esta spec mata (con números reales de la queue, 2026-06-16):**
1. `brand_id=null` en 277/296 filas (94%). `content-run-stage` hace `brandId = job.brand_id ?? "UnrealvilleStudio"` → todo lo no-UNRLVL se funde en UNRLVL silenciosamente.
2. `voice` guarda literales `lucien`/`unrlvl`, nunca un `voice_id` resoluble (0/296). `callClaudeDirect` no resuelve a genoma.
3. El builder no lee `brand_topics` ni inyecta genoma → causa raíz del off-brand.

---

## 1. ALCANCE EXACTO (qué se toca y qué NO)

### SÍ se toca
- La rama `if (lab.lab_key === "copylab")` dentro de `runStage()` en `content-run-stage`.
- La función `callClaudeDirect` → se reemplaza por `generadorLocal`.
- Se añaden 2 helpers nuevos: `resolveVoiceDestination()` y `loadBrandTopic()` + `loadVoiceGenome()`.

### NO se toca (fuera de alcance, NO modificar)
- `content-dispatcher` (incluido el `.limit(1)` — ver §6, lo quita Sam tras dry-run).
- Stages aife / imagelab / sociallab.
- El bloque de INSERT en `content_pieces` + email Resend (eso lo modifica la **spec del Watcher**, no esta).
- `getBrandContext` / `context-cache` (se mantiene como fuente de personas/compliance; el genoma se suma encima).

---

## 2. NUEVA LÓGICA DE RESOLUCIÓN (el corazón del fix)

### 2.1 Resolución de marca
El `job.brand_id` viene del dispatcher. Para el piloto **debe estar poblado** (LucienSael / UnrealvilleStudio). 

**Regla dura nueva:** si `job.brand_id` es `null` → **NO** hacer fallback silencioso a UnrealvilleStudio. En su lugar: marcar el stage como `failed` con `errorMsg = "brand_id null — builder convergido requiere brand_id explícito"` y abortar la pieza. El fallback silencioso era el bug #1; matarlo es parte del fix.

### 2.2 Resolución de tema (`brand_topics`)
```
loadBrandTopic(brandId, domain):
  SELECT * FROM intel.brand_topics
  WHERE brand_id = :brandId AND domain = :domain AND active = true
  LIMIT 1
```
El `domain` sale del finding/queue. Hoy la queue NO tiene columna `domain` explícita — el dominio del tema se infiere del `iid_source_tag` o del agente que generó el finding. 

**Para el piloto (modo semi-manual):** el `domain` se pasa **explícito** en el job. Ver §5 (el INSERT de prueba lo setea a mano). En R4B el Scheduler lo resolverá desde `brand_topics` como fuente de verdad.

Si no hay fila en `brand_topics` para ese `(brand_id, domain)` → `failed`, `errorMsg = "sin suscripción brand_topics"`. NO inventar voz.

### 2.3 Resolución de voz por destino — **HÍBRIDA (decisión B-ajuste de Sam)**

`brand_topics.voice_by_destination` = `{ "social": "...", "editorial": "..." }`.

**La regla decide el destino (`social` | `editorial`) así, EN ESTE ORDEN:**

```
resolveVoiceDestination(format, platform):
  // PASO 1 — el FORMAT manda primero
  if format in ('article','long','essay','longform','blog_long')  → 'editorial'
  if format in ('post','short','knife','reactive','social_post')   → 'social'

  // PASO 2 — format ambiguo/desconocido → la PLATAFORMA desempata
  // (solo se llega aquí si el format no cayó arriba)
  if platform in ('blog','linkedin')                  → 'editorial'
  if platform in ('x','meta_fb','meta_ig','tiktok')   → 'social'

  // PASO 3 — fallback seguro
  default → 'social'   // el registro corto es el menos arriesgado para cuentas nuevas
```

**Por qué híbrida y no por-plataforma pura:** el genoma de Lucien distingue editorial vs social por **respiración**, no por canal. Un post largo nativo de LinkedIn es *editorial* aunque LinkedIn sea "social". Un knife de ≤280 en el blog es *social*. El `format` captura la respiración; la plataforma solo desempata cuando el format no la declara.

Resuelto el destino:
```
voiceId = brand_topic.voice_by_destination[destination]
// p.ej. LucienSael + editorial → 'lucien_editorial'
//       LucienSael + social    → 'lucien_social'
//       UnrealvilleStudio + *  → 'unrlvl_default' (no tiene voces hermanas)
```

### 2.4 Carga del genoma
```
loadVoiceGenome(brandId, voiceId):
  SELECT identity_anchors, lexicon_signature, lexicon_forbidden,
         syntactic_signatures, argumentative_architecture, relational_stance,
         emotional_register, prohibited_registers, application_constraints,
         version
  FROM brand_voice_genome
  WHERE brand_id = :brandId AND voice_id = :voiceId AND active = true
  ORDER BY version DESC LIMIT 1
```
Si no hay genoma activo → `failed`, `errorMsg = "sin brand_voice_genome activo para {brandId}/{voiceId}"`. NO degradar al sistema viejo `content.brand_voices`. (El piloto exige genoma; las 4 voces necesarias YA existen y están active=true: `lucien_editorial`, `lucien_social`, `unrlvl_default`.)

---

## 3. CONSTRUCCIÓN DEL PROMPT (`generadorLocal`)

Reemplaza la firma vieja. Nueva firma sugerida:
```ts
async function generadorLocal(
  brandId: string,
  domain: string,
  format: string,
  platform: string,
  iidBrief: string,        // research neutro (qItem.aife_output...)
  brandContext: any        // sigue viniendo de context-cache: personas, compliance, goals
): Promise<{ text, input_tokens, output_tokens, voice_id, destination, voice_version }>
```

### Capas del prompt (orden obligatorio — refleja content-pipeline L0→L1.5)

1. **L0 contexto de audiencia** (de `brandContext`): personas, pain points, goals, compliance hard/soft, idioma. (Esto ya existía en `callClaudeDirect`, se conserva.)

2. **ÁNGULO ESTRUCTURAL** (NUEVO, de `brand_topic.angle`): se inyecta como **eje de construcción, no como tono**. Texto literal:
   > `EJE ESTRUCTURAL (no es tono — es desde dónde se construye la pieza): {brand_topic.angle}`
   
   Esto es lo que garantiza la divergencia entre marcas hermanas (contrato §2.1). Para `ai-cognition`: Lucien entra filosófico/cultural, UNRLVL entra técnico-operativo con números. Deben producir piezas que un humano NO percibiría como relacionadas.

3. **L1.5 INYECCIÓN DE GENOMA** (NUEVO, de `brand_voice_genome`):
   - `identity_anchors` → quién habla, qué autoridad invoca.
   - `relational_stance` → tú/usted/vos, sujeto principal, opening_stance.
   - `lexicon_signature` → inyectar 1–3 signature_words MÁX por pieza; `trademark_word` MÁX 1; signature_phrases MÁX 1. (Regla anti-patrón del skill: firma ≠ fórmula.)
   - `syntactic_signatures` → estructuras firmadas, MÁX 1 cada una por pieza.
   - `argumentative_architecture` → el `default_pattern` del genoma gobierna la estructura del argumento.
   - `lexicon_forbidden` + `prohibited_registers` → lista negra dura.
   - `emotional_register` → registro afectivo.

4. **HARD RULES del tema** (NUEVO, de `brand_topic.hard_rules`): inyectar **todas** como restricciones absolutas. Para Lucien/ai-cognition incluye: `ubermensch_frame` (motor interno, nunca manifiesto), `books_confidential` (los libros no existen públicamente), `edge_safety_rail` (quema el patrón/arquetipo, nunca persona real nombrada), `linkedin` (no es destino de Lucien). **Estas reglas las re-valida el Watcher en stage 5 (gate 4 y 6) — el builder las respeta, el Watcher las verifica.**

5. **BRIEF DE RESEARCH** (de `iidBrief`): el hallazgo neutro como materia prima. El builder lo interpreta a través del ángulo + genoma; NO lo copia.

6. **Instrucción de formato** según `format`/destination (editorial = ensayo que respira; social = golpe corto ≤ límite de plataforma).

### Parámetros del modelo
- Mantener `claude-sonnet-4-20250514` (ya en la EF) salvo que Sam indique upgrade.
- `temperature`: editorial 0.85 / social 0.9 (el social tolera más filo).
- `max_tokens`: editorial 1500 / social 400.

### Salida
Devuelve también `voice_id`, `destination`, `voice_version` para que se persistan en `content_pieces` (campo `voice` debe guardar el `voice_id` REAL, no el literal viejo) y para el AUTO-CHECK del Watcher.

---

## 4. CAMBIOS DE PERSISTENCIA

En el INSERT final de `content_pieces` (que hoy hace `content-run-stage`):
- `voice` → guardar `voice_id` resuelto (`lucien_editorial`, etc.), NO el literal.
- Añadir al `assets` un bloque `builder_meta`: `{ domain, angle_used, voice_id, destination, voice_version, brand_topic_id }`. Esto da trazabilidad y alimenta al Watcher.

> **NOTA:** el cambio del `status` final (`awaiting_approval`) y la inserción del email NO se tocan aquí — los gobierna la spec del Watcher (stage 5). Esta spec deja la pieza construida; el Watcher decide si avanza.

---

## 5. CRITERIOS DE VALIDACIÓN OBJETIVOS (qué debe devolver para considerarse OK)

CC debe poder afirmar, con query/log concreto, que tras el deploy:

1. Un job con `brand_id='LucienSael'`, `domain='ai-cognition'`, `format='article'` → el log muestra `destination=editorial`, `voice_id=lucien_editorial`, `voice_version=0.5`.
2. El mismo finding con `brand_id='UnrealvilleStudio'`, `domain='ai-cognition'`, `format='post'` → `destination=social→` (UNRLVL no tiene hermana, resuelve `unrlvl_default`), y el texto es técnico-operativo con números.
3. Un job con `brand_id=null` → `failed` con el errorMsg exacto, **sin** fallback a UNRLVL.
4. `content_pieces.voice` contiene `lucien_editorial` / `unrlvl_default`, nunca `lucien` / `unrlvl`.
5. `assets.builder_meta` poblado.

---

## 6. REGLA DE LANZAMIENTO (NO violar)

- **NO tocar el `.limit(1)` de `content-dispatcher`** en esta tarea. Se queda hasta que el dry-run (ver plan aparte) valide Builder + Watcher. Quitarlo antes = procesar ~283 filas viejas (cadáveres con brand_id=null) de golpe.
- El primer publish real NO ocurre hasta que Builder + Watcher estén operativos (contrato §6).
- CC entrega vía Ruta B (UPDATE in-place de la EF), informa éxito, presenta el cambio para que Sam confirme. NO auto-mergea.

---

## 7. ORDEN DE TRABAJO PARA CC

1. Leer la EF `content-run-stage` v25 deployada (fuente de verdad, no git si hay drift).
2. Añadir helpers `loadBrandTopic`, `loadVoiceGenome`, `resolveVoiceDestination`.
3. Reescribir la rama `copylab` para llamar `generadorLocal` en vez de `callClaudeDirect`.
4. Matar el fallback silencioso `?? "UnrealvilleStudio"`.
5. Persistir `voice_id` real + `builder_meta`.
6. Deploy a la EF viva (es inerte hasta que el dispatcher con `.limit(1)` dispare un job de prueba controlado — patrón preview/live aceptado).
7. Reportar contra los 5 criterios de §5.

_FIN — Builder Converged Spec v1.0_
