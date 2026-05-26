# Session Log — Unrealville Studio
_Fecha: 2026-05-26 · Ecosistema v2026-05-26-v19 · Claude Sonnet 4.6_

---

## RESUMEN EJECUTIVO

Sesión de arquitectura de context system e infraestructura. Trabajo principal: diseño e implementación del `ecosystem_graph.json` (v1 identificativo → v2 → v3 contextual ground-truth via audit real de código). Establecimiento del workflow Claude Chat + Claude Code para actualizaciones de ecosistema. Creación del skill `ecosystem-updater`. Corrección crítica de BlueprintLab (es la capa de autoría de identidades para los labs AI, no solo un gestor de datos).

---

## DECISIONES TOMADAS

| Decisión | Resultado |
|---|---|
| Obsidian para contextos .md | Sí si hay fricción en edición. Plugin Git obligatorio. No mejora mi comprensión — eso es el graph. |
| Knowledge Graph (`ecosystem_graph.json`) | **Implementado v3.** Para mí (impact analysis, routing). Visual humano bajo demanda. |
| Agent-browser skill | Mantener dormido hasta caso de uso declarado. |
| Frontend skill (nuevo, separado de ui-ux-layer) | **Aprobado — diferido a próxima sesión.** Stack UNRLVL: Vite+React+Tailwind+Vercel constraints. |
| Workflow actualización ecosystem | Chat audit (MCPs) → instrucciones → Claude Code edita → commit. No automatizar hasta Ayra Sprint 1. |
| ecosystem-updater skill | **Creado y commiteado.** v1.0. Proceso completo + prompt Claude Code parametrizado. |
| Claude Code: modelo + effort | **Sonnet 4.6 + High — correcto.** Opus innecesario para edición de archivos y commits. |

---

## TRABAJO REALIZADO

### ecosystem_graph.json — evolución completa

**v1 (identificativo):** 41 nodos, 51 edges. Construido desde ecosystem.json. Relaciones inferidas — varios edges incorrectos.

**v2 (contextual):** Audit completo ejecutado. Correcciones principales:
- Orchestrator: edge hardcodeado → lee `lab_configs` dinámicamente
- ImageLab: AI-GEMINI → AI-IMAGEN (Imagen 3.0, no Gemini text)
- SocialLab: edge → Meta MCP directo añadido
- VoiceLab: Claude + Gemini + ElevenLabs
- Nodos undocumented detectados: `lab-worker v11`, `claude-lab-bridge v6`, `nscf-mailer v13`
- Tablas nuevas: `lab_configs`, `lab_jobs` (ya existen), `scheduled_posts`, `imagelab_presets`, etc.

**v3 (corrección BlueprintLab):** Lectura de `App.tsx` (83KB) + `blueprintLabLoader.ts`:
- BlueprintLab es la **capa de autoría de identidades** para los labs AI
- 4 schemas: BP_PERSON_1.0 → ImageLab/VideoLab/VoiceLab · BP_LOCATION_1.0 → ImageLab/VideoLab · BP_PRODUCT_1.0 → ImageLab · BP_COPY_1.0 (= brand_copy_profiles) → CopyLab
- Nuevos edges: `TBL-BLUEPRINT-DATA → IMAGELAB / VIDEOLAB / VOICELAB / COPYLAB` (provides_params_to)
- Chain: BlueprintLab authora → TBL-BLUEPRINT-DATA → labs AI consumen → producción con identidad correcta

### Ecosystem Audit Contextual — hallazgos clave
- 93 EFs reales vs 67 documentadas (26 undocumented)
- `lab_jobs` + `lab_configs` YA EXISTEN en producción (Ayra Sprint 0 más simple)
- Orchestrator: descubrimiento dinámico via `lab_configs`, no hardcoded
- BlueprintLab: sin AI directo pero upstream de todos los labs AI

### Archivos commiteados

| Commit | Mensaje | Archivos |
|---|---|---|
| `288ad37` | Update ecosystem_graph.json | `ecosystem_graph.json` v1 |
| `86e8d92` | ecosystem: audit contextual 2026-05-26 · 93 EFs | `ecosystem.json` v19 |
| `0d6b836` | skills: ecosystem-updater v1.0 · INDEX v1.2 | `skills/ecosystem-updater/SKILL.md` · `skills/INDEX.md` |
| `013fc39` | session: 2026-05-26 ecosystem graph v2 | `brands/UnrealvilleStudio/session_log.md` |
| **pendiente** | ecosystem_graph.json v3 + session_log final | `ecosystem_graph.json` · `brands/UnrealvilleStudio/session_log.md` |

---

## PROFESSOR — LEARNINGS SUBMITIDOS

| ID | Learning | Score | Estado |
|---|---|---|---|
| `2d96e6ad` | BlueprintLab sin AI backend directo (incompleto — ver bd720832) | 5 | pendiente aprobación |
| `60d08045` | Orchestrator descubre labs via lab_configs dinámicamente | 5 | pendiente aprobación |
| `a5ea5804` | lab_jobs + lab_configs ya existen en prod | 4 | pendiente aprobación |
| `bd720832` | BlueprintLab = capa de autoría de identidades para labs AI (corrección completa) | 5 | pendiente aprobación |

**Acción próxima sesión:** Aprobar los 4. `bd720832` es la versión correcta y completa de `2d96e6ad`.

---

## PRÓXIMA SESIÓN — AGENDA ACORDADA

**Inicio (5-10 min):**
1. Aprobar 4 Professor learnings
2. Crear `skills/frontend/SKILL.md` — diferido hoy, acordado como primer item

**Prioridades operativas:**
3. Ayra Sprint 0 — deadline 5 Jun 🔴
4. NSCF meta_accounts — blocker Meta Ads
5. EFs undocumented — investigar lab-worker v11 + claude-lab-bridge v6

---

## SMA — NOVEDADES

Sin actividad nueva. Último log relevante: 2026-05-11 (Laura — Meta tokens NSCF).

---

_Session Log · UnrealvilleStudio · 2026-05-26 completo · Claude Sonnet 4.6_
