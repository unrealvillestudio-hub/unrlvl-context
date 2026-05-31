# Session Log — UnrealvilleStudio

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
