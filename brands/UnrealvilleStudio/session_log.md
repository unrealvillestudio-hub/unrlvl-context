# Session Log — UnrealvilleStudio

## 2026-06-05 · Skill voice-reference-extractor + cierre de previews pendientes

**Conducido por:** Claude Opus 4.8 (chat) + Claude Code (ejecución)
**Foco:** validación de pipeline de extracción de voz · merge de previews Vercel pendientes · integración de skill huérfano

**SMA check:** Sin novedades del agente — export retornó contenido NSCF de sesiones anteriores (última actividad 2026-05-11), sin entradas nuevas desde el último Actualiza.

### Key achievements

- **Skill `voice-reference-extractor` v1.0 creado e integrado a `skills/` (PR #2 → merge `3b65596`).**
  Pipeline determinístico local: videos TikTok descargados → ffmpeg (audio) → Whisper (transcripción) → Tesseract (OCR on-screen) → consolidado `.md` + `.json` por cuenta. NO hace análisis de voice (eso es trabajo de chat). Idempotente por hash SHA-256. Limitación documentada: descargas TikTok ~18-20s → transcripción parcial, OCR compensa.
- **INDEX.md `v1.2 → v1.3 → v1.4` en la jornada.** v1.3 (supabase-auditor + security v1.1) entró con el merge de SamPublisher; v1.4 (voice-reference-extractor) reconcilió limpio sin pisar supabase-auditor.
- **PR #1 SamPublisher mergeado a producción (`585d447`).** Genoma `sam_personal v0.5` health green, coherente en `brands[]` + `brand_voice_genome.rows_SamPublisher` + `_meta 2026-06-02-v2`. Nota fantasma de lucien_editorial confirmada eliminada en producción.
- **Ensayo de pipeline validado end-to-end en CC (Windows).** Entorno completo instalado: ffmpeg 8.1.1, tesseract 5.4.0 + tessdata spa/eng (vía AppData sin admin), openai-whisper. 2 videos de prueba transcritos + OCR correcto.

### Decisiones

- **Proyecto "registro BTS de tono/disciplina" → DESCARTADO (decisión Sam).** Evaluado y matado por tibio: "mostrar las horas/rigor" pide permiso a la audiencia y roza el género grindset que UNRLVL no es. Principio retenido: operar a un nivel donde el rigor es obvio en el output, no narrarlo. NOT FOR EVERYONE no explica. El skill de extracción sobrevive como herramienta reusable; el caso de uso original murió.
- **División de trabajo voice-research formalizada:** CC = extracción determinística (audio + OCR, batch, local). Chat = análisis de voice iterativo contra brand. No automatizar el análisis en un skill rígido.

### Hallazgos técnicos (→ Professor)

- **CC crea skills en worktrees aislados** (`.claude/worktrees/<random>/`) que NO llegan a main — riesgo de skill huérfano si no se rastrea. El skill de esta sesión quedó atrapado ahí; recuperado e integrado por PR. Mitigación estándar: integrar siempre por PR a `skills/`.
- **Entorno de Claude.ai no descarga modelos ML** (Whisper desde Azure/HuggingFace = fuera de allowlist, 403). Transcripción de audio va sí o sí por CC local.

### Pendientes / housekeeping

- **Worktree huérfano** `.claude/worktrees/quirky-jones-aad3e8/` — desregistrado de git y branch borrada, pero el directorio físico persiste (handle de sesión CC). Borrar con `rmdir /s /q` desde terminal nueva al cerrar CC.
- **🔴 Ayra Sprint 0 — VENCIDO (deadline 5 jun).** No tocado esta sesión.

---

## 2026-05-31 — Field Notes + fix pipeline v22 + diseño Voice Genome · Sam + Claude

### Resumen
Sesión densa: blog "Field Notes" para UNRLVL, fix del bug de publicación del flujo v22, diagnóstico completo del subsistema IID, y diseño de la Fase Voice Genome para la OnboardingApp.

### Web — Field Notes (pendiente deploy a CoreProject)
- `blog/index.html` — índice "Field Notes", estética terminal/tech (void/cyan/amber, Bebas+Space Mono, crosshair, code-rain).
- `blog/brand-intelligence-infrastructure.html` — artículo 01, molde canónico.
- Pendiente: añadir `<a href="/blog/" class="nav-link">Field Notes</a>` al nav en `/index.html` y `/es/index.html`.
- **Posicionamiento:** UNRLVL es escaparate reservado ("not for everyone"). AIID en goteo bajo de autoridad, NO motor SEO. Lucien es el activo prioritario para posicionamiento orgánico.

### Fix de publicación — flujo v22
**Bug:** el test b93627b6 (29-may) generó copy+imagen+aprobación pero no publicó. Causa raíz = **brand_id mismatch**: pipeline usa "UnrealvilleStudio", `meta_accounts` solo tenía "UNREALville".
**FIX APLICADO:** insertada fila `meta_accounts` brand_id=`UnrealvilleStudio` duplicando assets/token de UNREALville.
**Nota:** el constraint `lab_jobs_status_check` YA incluye `published` (el learning del 29-may que lo reportaba faltante está obsoleto).
**DEUDA:** dos convenciones de nombres conviven (UnrealvilleStudio vs UNREALville). Normalizar a futuro o tabla de alias.

### Limpieza DB
- 11 `lab_jobs` en `pending_approval` (teasers "Great things coming") → borrados.
- 19 piezas `unrlvl/expertise` del queue IID → brand_id seteado a `UnrealvilleStudio`, siguen pending (on-brand, rescatables).
- Preservados: 40 `unrlvl/trend_signal` + 6 `tool_review` pending (triar después).
- Basura no urgente en lab_jobs: 21 failed, 6 pending, 2 processing (27-28 may).

### Diagnóstico IID (subsistema completo)
- Vive en schema `intel` (NO public). 14 agentes por dominio de conocimiento, dual voice.
- Research funciona y corre diario. Ejecución (content-dispatcher `.limit(1)` debug + content-run-stage) congelada desde 26-abr. Failed = cadáveres de arquitectura vieja (timeout 30s), no de v22 (65s).
- Modelo brand_id acordado: research de plataforma compartido + intérprete por marca vía context-cache. Fuentes por vertical temático caso por caso.

### Diseño Voice Genome (entregable)
- `VOICE_GENOME_PHASE_SPEC.md` — spec de Fase 5 para la OnboardingApp existente.
- 2 ramas: Voz Extraída (persona real + material) vs Voz Diseñada (personaje, maturity v0.5 máx).
- Captura las 9 dimensiones de `brand_voice_genome`. Valida plataformas vs cuentas reales.
- **Decisión:** brand_adn = mother brief (artefacto-fuente), NO campo/tabla nuevo. Proyecta a tablas que los labs ya consumen.

### Pendientes UNRLVL
- [ ] Deploy Field Notes a CoreProject (2 archivos + nav en 2 index)
- [ ] Implementar Fase Voice Genome en OnboardingApp (Claude Code, desde la spec)
- [ ] Triar 40 trend_signal + 6 tool_review del queue
- [ ] Normalizar convención de nombres UnrealvilleStudio/UNREALville

### Estado genoma
UNRLVL tiene `brand_voice_genome` `unrlvl_default` v1.0 activo y completo (por eso su contenido sale on-brand). Es el ejemplo de oro para los prompts de la Fase Voice Genome.

---
*Session log · UnrealvilleStudio · 2026-05-31*
