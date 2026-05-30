# Session Log — ForumPHs + Ecosystem Infra
**Fecha:** 2026-05-30
**Duración:** Full day
**Conducido por:** Claude Sonnet 4.6 + Claude Code (Opus 4.8)

---

## LOGROS DE LA SESIÓN

### ForumPHs — Document Factory (DF)
- **Diagnóstico completo** del DF post-upgrade BI/FIE: 5 bugs identificados y corregidos
- **zipExtractor.ts** — extractLooseFiles() + smart fallback + isTranscripcion con keyword "acta"
- **UploadZone.tsx** — acepta ZIP de cualquier origen + archivos sueltos (.docx/.xlsx/.vtt/.txt)
- **parseAsistencia.ts** — aliases columnas Luxor (Número, Estado, Resultado) + parseVotaciones multi-sheet
- **parseResumen.ts** — extractAssemblyType default ORDINARIA + convocatoria parsing
- **parseTranscripcion.ts** — speaker_unit tower-first T3 29D + admin/entidad classifiers
- **PreflightForm** — overrides manuales para total_units, date_str, time_start (confirmed_*)
- **QA re-run progresivo** — barridas con tolerancia creciente restauradas (MAX_SWEEPS=4)
- **Wiring pipeline completo** — page.tsx rewired: upload→parse→preflight→formalize→generate→QA→ICR→download
- **Acta Luxor 300 generada manualmente** con todos los datos correctos (ACTA_No1-2026_PH_LUXOR_300.docx)
- **Documentos ForumPHs para Ivette** — Informe explicativo + Contrato Bullet-proof v2 (21 cláusulas, 12 gaps cerrados)
- Commits: 0a7ea8c · 6afc6a8 · 3889092 · 5cd7d76 · 89b093c — todos READY en Vercel

### Ecosystem Infra — Branch Protection + Staging Workflow
- **15 repos del Grupo A** configurados con branch protection + PR template + WORKFLOW.md + CLAUDE.md
- 13/15 branch protections activas (2 repos privados en plan GitHub Free — pendiente Pro o hacer públicos)
- Disciplina establecida: nunca pushear directo a main, todo por PR con Vercel Preview URL
- **Pendiente registrado:** sesiones dedicadas para Ecosystem Tools (MCPs, Skills, Agents, AgentLab)

### Otros
- Spam en forumphs.com identificado y descartado (bot search-register.live)

---

## DECISIONES TOMADAS

- Modelo Claude Code para tareas de ejecución: **Sonnet 4.6** (Opus solo para diagnóstico/arquitectura)
- Staging workflow: feature branch → Vercel Preview → prueba con ZIP real → merge a main
- ICRResolution deferred: tema de colores light/dark para sprint separado
- Ecosystem Tools (MCPs + Agents): sesiones analíticas dedicadas, NO mezclar con sprints de producto

---

## PENDIENTES CRÍTICOS

- 🔴 **DF — 3 votaciones faltantes** en QA: "opciones cuál aprueba", "personas a quién esco", "tiempo aprueba el pago" → prompt CC pendiente
- 🔴 **DF — Primera persona** 13 errores en Edge Function fphs-formalize (S4 speaker classifier)
- 🔴 **DF — Imágenes incorrectas** en acta (screenshots Hypal vs gráficos de votaciones)
- 🟡 **GitHub Pro** o repos públicos para unrlvl-supabase-mcp + unrlvl-meta-mcp (branch protection bloqueada)
- 🟡 **unrlvl-social-media-agent** — no existe como repo en org, corre como EF en Supabase — remover de Grupo A
- 🟡 **Ivette reunion** — revisar 7 decisiones pendientes del Contrato v2 (WhatsApp number, gasto emergencia, etc.)

---

## PRÓXIMA SESIÓN

1. Prompt CC — 3 votaciones faltantes DF
2. Ecosystem Tools sessions planning (MCPs + Agents + AgentLab)
3. Agenda prioridades del ecosystem.json next_session_agenda

---
*ForumPHs · Unrealville Studio · Sam · 2026-05-30*
