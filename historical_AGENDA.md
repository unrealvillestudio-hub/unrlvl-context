# AGENDA HISTÓRICA — Unrealville Studio
_Archivo de ítems completados. Movidos desde AGENDA.md. Nuevo al tope._
_Primera migración: 2026-06-28_

---

> **Cómo se mantiene este archivo.** Poblado por el **barrido de archivado** del HRD_ACTUALIZA (paso 10 de `protocols/HRD_PROTOCOL.md`). Un ítem llega acá solo si cumple LAS TRES condiciones: (1) completado, (2) hace más de 30 días, (3) sin referencias activas. El texto se mueve **íntegro** — nunca se resume ni se reescribe. Las migraciones se apilan con la **más reciente al tope**; las anteriores no se tocan nunca.
>
> **Historia de este archivo:** creado el 2026-06-28 con la primera migración. Quedó sin commitear en un worktree y se perdió durante tres semanas porque ningún paso del protocolo lo invocaba. **Rescatado el 2026-07-18** e integrado al HRD_ACTUALIZA como paso fijo, precisamente para que eso no vuelva a pasar.

---

## Migración 2026-07-21
_Primera ejecución del barrido automático del HRD_ACTUALIZA paso 10 (protocolo v1.3, creado 18-jul). Criterio aplicado: completado ✅ + más de 30 días (corte 2026-06-21) + sin referencias activas. Aprobado por Sam antes de mover._
### #5i — GENOMA v1.0 DE LUCIEN — CERRADO (19-jun)
Destilado por muestreo (8/10 marcadas Lucien). core_move reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (lucien_editorial + lucien_social). Professor: 6 learnings. Validación pendiente: 2-3 piezas IID real post-R4B. NOTA: el gate Boids-Lucien (Claude propone, Sam juzga SÍ/NO, converge) es el MODELO del bucle E5b y del skill E7.
### Resueltos comprimidos del 13 al 24-jun
- ✅ Eje B diseño (24-jun b). ImageLab Imagen→Gemini (24-jun). R4B Chat 2 (20-jun). #5i GENOMA v1.0 LUCIEN (19-jun). IID QUALITY LOTE A (18-jun). Builder+Watcher LIVE (16-jun). NSCF Resend/Fase 2 (13-16 jun).
---
## Migración 2026-06-28

## 🟢🟢🟢 SPRINT SEMBRADOR — COMPLETO (T1-T4 + #48 cerradas)

**El Sembrador está LIVE end-to-end CON FRONT + notificación por email:** Marisol (rol seeder) captura semillas razonadas en el Orchestrator → destilado anti-IP → gate de Sam (rol admin) con corrección inline → handoff a iid-core → fan-out multimarca v22. Dos gates en serie. Auth de dos ejes (rol + scope gerente-de-cuentas). iid-inbound versionado en git. **#48: al entrar a awaiting_approval, email a content-approval@ con enlace al Orchestrator (sin resumen, anti-IP).**

| # | Tarea Sembrador | Estado |
|---|---|---|
| T1 | Limpieza test F3 | ✅ VERDE |
| T2 | Fan-out multimarca iid-core v22 + fanout.ts | ✅ HECHO |
| T3 | Cerebro: iid_seeds + EF iid-inbound v1 + IID-SEEDER | ✅ HECHO |
| T4 | Front IID Seeds + auth rol/scope + iid-inbound versionado | ✅ COMPLETO (26-jun) |
| **#48** | **Approval por email (notifyGate en capture)** | ✅ **COMPLETO + verificado en vivo (27-jun)** |

**#48 entregado (27-jun):**
- **`iid-inbound` v9** (+`notifyGate`, +42 líneas). Email inline en la rama capture al entrar a awaiting_approval. Patrón Resend de content-run-stage (`RESEND_UNRLVL_KEY` + from content@unrealvillestudio.com → content-approval@unrealvillestudio.com), NO el de nscf-mailer. Fire-and-forget (await + catch que traga; nunca tumba el capture). Asunto = neutral_topic con etiqueta `[IID Seed · pendiente]` (con domain) / `[IID Seed · sin mapear]` (sin domain). Enlace a raíz del Orchestrator (no hay routing por URL).
- **PR #5** en `unrlvl-iid-functions` mergeado (Sam). Rama borrada. Versionado mantenido.
- **5 verificaciones pasadas** (vía stub temporal `iid-notify-test` + curl local de Sam; stub borrado): con-domain ✅, sin-mapear ✅, failed-no-email ✅, fire-and-forget-no-tumba ✅, enlace correcto ✅.
- **Corrección v8→v9:** el deploy ya estaba en v8 (redeploy benigno sin cambio de código, idéntico al git sha ce0e29b). #48 entró como v9. El contexto registraba v7 — desfase numeración git↔deploy, sin pérdida.

**T4 entregado (26-jun):**
- **Repo `unrealvillestudio-hub/unrlvl-iid-functions`** (private) — iid-inbound versionado (PRs #1-#5) + `supabase/migrations/`. Salda parcialmente deuda §43 para esta EF.
- **Auth dos ejes en iid-inbound** (patrón nscf-b2b-approve): bcryptjs@2.4.3 cost 10, JWT HS256 djwt 8h, matriz PERMISSIONS fail-closed. Login solo contraseña. Scope = modelo gerente-de-cuentas (regla dura server-side). Marisol = seeder, 6 marcas. Secrets ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET en Supabase.
- **Front IID Seeds (Orchestrator, mergeado):** login+ojo, gating por rol, captura razonada (seeder_rationale + seeder_brand_suggestion), cola de approve admin (corrección inline, failed, out_of_scope). Verificado por Sam en Preview.
- **iid_seeds +2 columnas:** seeder_rationale, seeder_brand_suggestion. GRANT SELECT brands→service_role.

**⚠️ Pendientes operativos de Sam (no bloquean):**
- **Rotar las 2 contraseñas temporales** (TempSam2026!/TempMari2026!) antes de que Marisol entre en producción real. Opción limpia: script local sin compartir → regenerar JSON → recargar solo secret de usuarios.
- Byte-parity dura de iid-inbound cuando haya supabase CLI (functions download + git diff). Riesgo bajísimo (solo comentarios).

---

## ✅ Filas done movidas de "Bloqueos que requieren ACCIÓN DE SAM" (tabla dentro de R4B)

| # | Acción de Sam | Desbloquea |
|---|---|---|
| ✅ Vertex creds en Supabase (22-jun) | 3 secrets cargados | 5e-2/5e-3 |
| ✅ Secrets auth Sembrador (26-jun) | ORCHESTRATOR_NSCF_IID_INTEL_USERS + _JWT_SECRET | front IID Seeds (HECHO) |
| ✅ Cloud Vision API habilitada (27-jun) | proyecto gen-lang-client-0491381650, SA imagelab-vercel compatible | E3 OCR (smoke verde) |

---

## ✅ #5i — GENOMA v1.0 DE LUCIEN — CERRADO (19-jun)
Destilado por muestreo (8/10 marcadas Lucien). core_move reactivo/léxico → generativo/constructor. 8 campos nuevos. version 0.5→1.0 (lucien_editorial + lucien_social). 3 angles corregidos. Professor: 6 learnings. Validación pendiente: 2-3 piezas IID real post-R4B.

---

## ✅ Fila #48 movida de la tabla "🔵 Próximas semanas"

| # | Item | Marca |
|---|---|---|
| 48 | ✅ **Approval por email — COMPLETO y verificado en vivo (27-jun).** iid-inbound v9, notifyGate inline en capture, email a content-approval@ con enlace al Orchestrator. Ver bloque SPRINT SEMBRADOR + session_log §9 (27-jun). | UNRLVL |

---

## ✅ Resuelto recientemente
- ⚠️ **#47 Expert/Boids — E3-FRONT-canvas FALLÓ con HEVC → rediseño server-side (28-jun b).** La prueba desde el equipo de Marisol expuso que su video era HEVC/H.265 (hvc1) y Chrome no lo decodifica → la extracción canvas (Vía D) falló. El peso no era el problema (el de Sam funcionó por ser H.264). Decisión: **server-side total** — ffmpeg extrae frames (cualquier códec) como `/api/extract-frames` DENTRO del Orchestrator (ni proyecto nuevo ni ImageLab), Flujo A (navegador orquesta, EF iid-expert-ocr INTACTA hace OCR+persiste). Anti-IP ajustado (video transita el bucket segundos, se borra). 4 decisiones cerradas con Sam. Diseño consolidado en DISENO_E3_server_side.md. Plan E3b-1..4 (prueba final = el MISMO video HEVC de Marisol). Professor: 3 learnings. — 2026-06-28
- ✅ **#47 Expert/Boids — E3-FRONT construido + E2E verde desde Preview (28-jun).** Componente canvas en Orchestrator (PR #2), probado E2E por Sam desde Preview (15 frames, 1115 chars OCR). NOTA: este canvas quedó obsoleto al día siguiente por el fallo HEVC en el equipo de Marisol (ver entrada 28-jun b). El PR #2 está mergeado; el canvas se reemplaza por server-side. — 2026-06-28
- ✅ **#47 Expert/Boids — E1+E2+E3-EF construidos y verificados (27-jun c).** Informe E3-exploratorio mató la EF self-contained → **Vía D** (frames del navegador + Cloud Vision OCR). E1 tabla LIVE. E2 bucket condicional. E3-EF `iid-expert-ocr` v1 LIVE (PR #6) + fix PEM (PR #7) + smoke verde. Vision habilitada. Hallazgo seguridad: contraseña Marisol del contexto no coincide con la real. Professor: 6 learnings (+28 aprobados). — 2026-06-27
- ✅ **#47 Expert/Boids DISEÑADO y cerrado + E1 construido (27-jun b).** Sesión de diseño anclada en código real. Subsistema de onboarding de marcas en 2 fases. 6 decisiones cerradas con Sam. Plan E1-E8. Professor: 5 learnings. — 2026-06-27
- ✅ **#48 Approval por email COMPLETO y verificado en vivo (27-jun).** iid-inbound v9 (+notifyGate inline en capture). Email a content-approval@ con enlace al Orchestrator al entrar a awaiting_approval (sin resumen, anti-IP). Patrón Resend de content-run-stage (RESEND_UNRLVL_KEY, NO nscf-mailer). Fire-and-forget. Asunto=neutral_topic con etiqueta pendiente/sin-mapear. 5 verificaciones pasadas (stub temporal + curl local Sam; stub borrado). Corrección v8→v9 (v8 era redeploy benigno idéntico al git). PR #5 mergeado. Deuda nueva: get_logs del MCP roto (#49). Professor: 5 learnings. — 2026-06-27
- ✅ **IID Sembrador T4 COMPLETO (26-jun).** Front IID Seeds LIVE en Orchestrator (login+gating por rol seeder/admin, captura razonada, cola de approve con corrección inline). Auth dos ejes (rol + scope gerente-de-cuentas, patrón nscf-b2b-approve) en iid-inbound v7. Repo nuevo unrlvl-iid-functions (iid-inbound versionado + migraciones, PRs #1-#4). Descubrimiento mayor: dos modos de semilla (Basic LIVE / Expert-Boids próximo sprint #47). Professor: 7 learnings aprobados. — 2026-06-26
- ✅ **IID Sembrador T4 brief definitivo (26-jun).** Verificado en código real, secret naming ORCHESTRATOR_NSCF_IID_INTEL_*, scope gerente-de-cuentas, tab topic-proposals diferido (#46). — 2026-06-26
- ✅ **IID Sembrador CONSTRUIDO T1-T3 (25-jun b).** Fan-out multimarca iid-core v22 (fanout.ts, mata default_voice). Cerebro iid-inbound v1. Tabla iid_seeds + IID-SEEDER. 4 aserciones verdes. — 2026-06-25
- ✅ **IID Fase 3 transporte REPARADO (25-jun a).** dispatcher v26→v27, cron 29 reactivado. algorithm-mechanics abierto en brand_topics (UNRLVL phase 2). — 2026-06-25
- ✅ Eje B diseño (24-jun b): matriz estímulo validada + Ruta B + Gate 7/8 + 2 decisiones. — 2026-06-24
- ✅ ImageLab migración Imagen→Gemini (24-jun) + BGRemover mergeado. — 2026-06-24
- ✅ R4B Chat 2 — DDL + calidad output + extracción Watcher (20-jun). — 2026-06-20
- ✅ Arquitectura híbrida queue + #5i frontera (20-jun). — 2026-06-20
- ✅ Cadencia Lucien + UNRLVL poblada (19-jun). #5i GENOMA v1.0 LUCIEN CERRADO. — 2026-06-19
- ✅ IID OUTPUT QUALITY LOTE A (18-jun). IID #5b end-to-end (17-jun). Builder Convergido + Watcher LIVE (16-jun).
- ✅ NSCF Resend hardening / Fase 2 / PR #2 (13-16 jun). Genomas v0.5 (1-2 jun). Gobernanza CC (6-7 jun).

---
