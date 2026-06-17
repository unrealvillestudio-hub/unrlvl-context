# Session Log — UnrealvilleStudio

## 2026-06-17 · #5b VALIDADO end-to-end · contrato de voice afinado · pendientes de calidad de output

**Conducido por:** Claude Opus 4.8 (chat, diseño + decisiones + DB directa) + Claude Code (ejecución de EFs)
**Foco:** correr la corrida real del piloto IID (#5b) hasta el final, destapar y arreglar lo que la cadena completa revelara, afinar el contrato de voice de las marcas, y dejar el motor validado hasta R4B.

### Lo más importante: la cadena completa funciona end-to-end, con 2 piezas en aprobación

RUN4 (final): Lucien (editorial) y UNRLVL (social) sobre el mismo finding real de reasoning **atravesaron los 5 stages** (copylab → aife → imagelab Vertex → sociallab → Watcher), **ambas PASS**, ambas a `awaiting_approval`, y **ambas dispararon email real a content-approval@unrealvillestudio.com**. Sam recibió y revisó los dos emails con botones PUBLICAR/RECHAZAR. Modo c2 respetado: NO se publicó a Meta (la publicación real es fase siguiente, en chat dedicado). El motor IID completo (Builder convergido + 5 stages + Watcher de 6 gates + imagen Vertex + email de aprobación) está validado.

### El piloto destapó 5 fallos ocultos que el dry-run jamás habría encontrado

El dry-run siempre cortaba tras copylab, así que aife/imagelab/sociallab/email nunca se ejercitaban. La corrida real los rompió uno por uno, y los arreglamos en cascada:

1. **Model ID retirado = patrón de ecosistema (24 EFs).** `claude-sonnet-4-20250514` (retirado 15-jun) estaba en `aife-filter` + 9 EFs de flujo vivo (6 iid-*, fphs-chat, brand-context-builder, unrlvl-profiler — todas arregladas a `claude-sonnet-4-6` + hardening labelClaudeError) + 13 one-off (shopify/seo/nscf, en AGENDA). Era la causa del freeze de abril en realidad: el pipeline moría en seco con 404, no solo off-brand.
2. **imagelab apuntaba a fal.ai, no al crédito Google.** El stage estaba hardcodeado a `fal.run/fal-ai/imagen3` salteándose `lab_configs`. CC lo redirigió a `image-lab-unrlvl.vercel.app` (Vertex AI / imagen-3.0 / crédito GCP de Sam). Ahora usa el crédito correcto.
3. **Gate evidence caricaturizado.** Usaba `has_numbers:true/false` para UNRLVL — una caricatura. Reescrito a check semántico vía Claude que evalúa comprensión de la maquinaria, leyendo `proof_mode`.
4. **Email mudo por key cruzada.** `RESEND_API_KEY` era de la cuenta Resend de NeuroneSCF (sin unrealvillestudio.com verificado) → Resend 403 → sin try/catch, fallo mudo. Fix: secret dedicado `RESEND_UNRLVL_KEY` + envío en try/catch. Sam seteó la key. Validado: email llega.
5. **Builder UNRLVL alucina métricas.** Generó "2048 veces/s" (inventado) → REJECT correcto del gate. Fix de procedencia de cifras (3 niveles). RUN4: generó "512 tokens / 96 capas de atención" + "geometría del espacio de embeddings" → PASS.

### Contrato de voice afinado (sin tocar genomas — estaban sanos)

La caricatura "UNRLVL=números / Lucien=sin cifras" vivía en 3 capas encima de un genoma sano. Corregidas en `intel.brand_topics`:
- **proof_mode UNRLVL**: de "show the system doing it now" → "Depth of comprehension IS the proof. Numbers welcome when real, never required, never invented."
- **angle UNRLVL**: técnico-estructural / blueprint, no estadística. La matemática y arquitectura aplicada detrás de lo que el usuario común da por sentado.
- **angle Lucien**: la geometría del pensamiento — qué le exige a un humano trasladar su mente a un sistema sintético; el malnombrar que revela algo sobre nosotros (anclado a su core_move real).
- **Genomas: intactos** (la caricatura nunca estuvo ahí; el genoma UNRLVL pide "specific and verifiable" + léxico de arquitectura).

### Divergencia multimarca confirmada visualmente

Mismo finding (Reasoning Models). UNRLVL: *"calcula la distribución de probabilidad sobre el siguiente token, 512 veces, geometría del espacio de embeddings, 96 capas de atención"* (la maquinaria). Lucien: *"hay una palabra que todos usan y nadie examina... el lugar exacto donde el pensamiento se detiene... confundir el parecido del resultado con la identidad del proceso"* (la geometría del pensamiento). Similitud de cuerpo 0.07. Un humano no los relaciona por el cuerpo.

### Estado de EFs (verificado)

`content-run-stage` v33 (Builder convergido + Watcher + 6 fixes + imagelab Vertex + RESEND_UNRLVL_KEY). `content-dispatcher` v21 (`.limit(1)` intacto). `aife-filter` v15. 9 EFs de flujo vivo en `claude-sonnet-4-6`.

### PENDIENTE — Calidad de output (capa distinta del flujo, que ya funciona)

Sam identificó que el flujo está resuelto pero los outputs necesitan trabajo. A resolver en sesión(es) dedicada(s), NO en este sprint:

- [ ] 🔴 **Title compartido delata a las hermanas.** Ambas piezas usan el title del finding crudo ("Reasoning Models Fundamentally Shift..."). El cuerpo diverge (0.07) pero el title las relaciona — anti-autobaneo comprometido. El Builder debe generar title propio por marca. PRIORIDAD ALTA.
- [ ] 🔴 **Angle de Lucien sobre-especificado = fórmula.** "Geometría del pensamiento" + "malnombrar" se volvió regla dura: Lucien SIEMPRE sale igual, no se ve `psychological` u otras facetas. El angle por-dominio + core_move del genoma se refuerzan en exceso. Rebalancear angle vs genoma para dar rango a Lucien. (Origen: el angle lo escribimos Sam+Claude muy específico; se convirtió en molde.)
- [ ] 🟡 **Email no muestra imagen** (base64 inline stripeado por Gmail) **ni copy completo** (truncado en buildEmail). Fix template: subir imagen a Storage + mostrar copy completo o link.
- [ ] 🟡 **Markdown crudo visible** en outputs (`**> Forward.**` con asteriscos). El render no procesa markdown.
- [ ] 🟡 **resend_id null en la pieza** aunque email_sent=true (se guarda en job, no en pieza). Capturar id de Resend en content_pieces.
- [ ] 🟢 **"> Forward."** confirmado como cierre de marca UNRLVL correcto (chevron = dirección del genoma); solo el formato markdown crudo es el bug.

### PENDIENTE — Infraestructura/limpieza

- [ ] Borrar del dashboard Supabase las EFs efímeras: `model-ping`, `env-probe`, `resend-test` (neutralizadas como stubs 410, falta borrarlas).
- [ ] Barrer `to: sam@unrealvillestudio.com` hardcodeado en otras EFs (SMA FPHs, nscf-mailer, etc.) y decidir cuáles migran a `content-approval@` u otro alias por función.
- [ ] 13 EFs one-off con model ID retirado (shopify/seo/nscf) — deuda de mantenimiento, arreglar cuando se use cada una.
- [ ] **Publicación real (push a Meta)** — fase siguiente, CHAT DEDICADO. Verificar cuentas Meta de Lucien/SamPublisher (no probadas E2E) antes del primer push de cada marca.

### Deuda R4B (Scheduler)

- base64 inline de imagen → subir a Supabase Storage y guardar URL (Gmail stripea; Meta necesita URL hospedada).
- Editorial largo (~8000 chars) recorre stages lento (~90s total) — vigilar timeouts en modo autónomo.
- Gates 2/3 (sibling-window, cadence) pasan de informativos a bloqueantes; gate 1/5 a pgvector; extraer Watcher a EF C2.

### Pendientes IID (orden post-piloto, sin cambios)

- [ ] 🟡 IID propios de Lucien (materia filosófica — hoy inexistentes)
- [ ] 🟡 Destino de los 14 IID-* viejos
- [ ] 🟡 Scheduler R4B
- [ ] 🟡 Quitar `.limit(1)` (cadáveres ya cuarentenados; solo tras publicación validada)

---

## 2026-06-16 · IID Builder Convergido + Watcher LIVE · causa raíz del freeze identificada

**Conducido por:** Claude Opus 4.8 (chat, diseño + decisiones + DB directa) + Claude Code (ejecución de EFs)
**Foco:** ejecutar los pendientes 🔴 — Builder convergido + Watcher — y dejar el motor IID produciendo on-brand y anti-spam antes de la corrida real.

### Lo más importante: el freeze de abril tenía una cuarta causa que nunca diagnosticamos

El pipeline IID no estaba solo "off-brand desde abril" — estaba **muerto en seco**. El model ID `claude-sonnet-4-20250514` hardcodeado en `content-run-stage` se retiró (deprecación 15-jun-2026) → la llamada a Claude daba 404 → el pipeline moría en stage 1 (copylab). Los 3 bugs de brand/voice/genoma eran reales pero **secundarios**. Reemplazo verificado con ping HTTP 200 real: `claude-sonnet-4-6`.

### Key achievements

- **Builder Convergido LIVE** (`content-run-stage` v25→v31, cirugía in-place A1). `callClaudeDirect` → `buildFromGenome`: lee `intel.brand_topics` + `brand_voice_genome`, resuelve marca + voz **híbrida** (format manda, plataforma desempata), inyecta genoma + ángulo + hard_rules, **mató el fallback silencioso `?? "UnrealvilleStudio"`**, persiste `voice_id` real.
- **Watcher LIVE** (stage 5, decisión C1). 6 gates modulares, gate previo a `awaiting_approval`, tabla `intel.watcher_log` auditable.
- **Guard dry-run** (`assets.builder_input.dry_run`) — corta tras copylab sin cascada/email/publish.
- **`intel.brand_topics.angle` de LucienSael/ai-cognition poblado** (era null — blocker del caso multimarca).

### Divergencia multimarca VALIDADA objetivamente

Mismo tema `ai-cognition`: Lucien (editorial, filosófico) vs UNRLVL (social, técnico). **Similitud semántica: 0.07** (umbral REJECT 0.80). Duplicado forzado: **1.0** → rechazado. Gates 4/6 cazan UNRLVL-sin-números y Lucien-tease-de-libro.

### Limpieza + cuarentena

- **293 cadáveres** de `intel.iid_content_queue` (274 brand_id=null + 19 brand_id hardcoded) → `failed` + tag `ARCHIVED_LEGACY_20260616`. Decisión Sam: quemar todo lo viejo.
- **Migraciones tracked:** GRANT SELECT a roles PostgREST en `brand_topics` + `brand_voice_genome`; DROP de `content_pieces_voice_check` obsoleto; DDL `intel.watcher_log` con grants.

### Patrón confirmado 3x

"Artefacto nuevo sin permisos = fallo silencioso": tabla nueva con RLS sin GRANT → supabase-js null; CHECK obsoleto → INSERT mudo. Regla: tabla nueva = GRANT + reload cache en la misma migración; INSERT crítico chequea error; antes de ampliar enum/CHECK estático preguntar si debería existir.

### Pendientes (resueltos en sesión 06-17)

- [x] CC: Builder convergido — HECHO
- [x] CC: Watcher 6 gates — HECHO
- [x] Corrida real piloto — HECHO (#5b validado 06-17)

---

## 2026-06-15 · Replanteamiento IID + brand_topics + 14 IID UNRLVL + anti-spam contract

**Conducido por:** Claude Opus 4.8 (chat) + DB directa
**Foco:** corregir el modelo del IID de raíz · diseñar la capa marca↔temas · replantear qué investiga UNRLVL · blindar anti-baneo multimarca

### El giro conceptual

- **MODELO CORREGIDO:** la **marca declara qué temas consume y con qué voz por destino**; el IID investiga temas **neutros**. Antes el agente cargaba `default_voice` y decidía la voz — esa era la causa raíz del off-brand.
- **3 sistemas de voz aclarados:** `brand_voice_genome` (editorial ejecutable), `content.brand_voices` (editorial viejo IID con ICR/AIFE), `voicelab_params` (sonora ElevenLabs, independiente).

### Key achievements

- **`intel.brand_topics` creada y extendida** (m:n marca↔tema; 5 ejes: rollout_phase, purpose, cadence, angle, sibling_stagger).
- **14 IID nuevos `UNRLVL-*`** en 3 tiers. hard_rule: numérico + desarrollo. Los 14 viejos `IID-*` intactos.
- **Naming normalizado.** `UNREALville` eliminado de `meta_accounts` (dup de `UnrealvilleStudio`).
- **Anti-spam contract v1.0** con **Watcher** (6 gates) como prerequisito de publicación.

### Enfoque UNRLVL

- Los IID investigan el **CÓMO industrial del mercado**, no releases. Todo parte de profundidad matemática/de desarrollo. (NOTA 06-17: "matemático" se redefinió como profundidad de comprensión de la maquinaria, NO dígitos obligatorios.)

### Anti-baneo

- Las 3 marcas publican con el mismo token/Business Portfolio Meta. Blindaje 3 capas: divergencia por ángulo (builder), jitter + desfase (scheduler), Watcher gate final.

### Confidenciales Lucien

- Frame Nietzsche/übermensch = motor interno, NUNCA en output. Libros NO existen públicamente hasta lanzamiento.

---

## 2026-06-05 · Skill voice-reference-extractor + cierre de previews pendientes

**Conducido por:** Claude Opus 4.8 (chat) + Claude Code
**Foco:** validación de pipeline de extracción de voz · merge de previews Vercel · integración de skill huérfano

### Key achievements

- **Skill `voice-reference-extractor` v1.0** integrado a `skills/` (PR #2 → `3b65596`). Pipeline determinístico: TikTok → ffmpeg → Whisper → Tesseract → consolidado. NO hace análisis de voice. Idempotente por SHA-256.
- **INDEX.md v1.2 → v1.4** en la jornada.
- **PR #1 SamPublisher mergeado** (`585d447`). Genoma `sam_personal v0.5` health green.
- **Ensayo de pipeline validado E2E en CC (Windows).**

### Decisiones

- **Proyecto "registro BTS de tono/disciplina" → DESCARTADO** (Sam). Tibio, roza grindset. El skill sobrevive como herramienta; el caso de uso murió.
- **División voice-research:** CC = extracción determinística; Chat = análisis iterativo.

### Hallazgos técnicos

- CC crea skills en worktrees aislados que NO llegan a main — integrar siempre por PR.
- Entorno Claude.ai no descarga modelos ML (Whisper 403) → CC local.

### Pendientes / housekeeping

- Worktree huérfano `quirky-jones-aad3e8/` — borrar físicamente.
- 🔴 Ayra Sprint 0 — VENCIDO (5 jun).

---

## 2026-05-31 — Field Notes + fix pipeline v22 + diseño Voice Genome · Sam + Claude

### Resumen
Blog "Field Notes" para UNRLVL, fix del bug de publicación v22, diagnóstico IID, diseño Fase Voice Genome.

### Fix de publicación v22
**Bug:** brand_id mismatch (pipeline "UnrealvilleStudio" vs meta_accounts "UNREALville"). FIX: insertada fila meta_accounts brand_id=UnrealvilleStudio. DEUDA: normalizar nombres (resuelto 06-15).

### Diagnóstico IID
- Schema `intel`. Research funciona; ejecución congelada desde 26-abr. (NOTA 06-16: la causa real era el model ID retirado.)

### Diseño Voice Genome
- `VOICE_GENOME_PHASE_SPEC.md` — Fase 5 para OnboardingApp. 2 ramas: Voz Extraída vs Diseñada.

### Pendientes UNRLVL
- [ ] Deploy Field Notes a CoreProject
- [ ] Implementar Fase Voice Genome en OnboardingApp
- [ ] Normalizar nombres (HECHO 06-15)

---
*Session log · UnrealvilleStudio*
