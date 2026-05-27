# Session Log — Meta MCP + Pipeline Orgánico
_infrastructure/meta-mcp/session_log.md_
_Claude Sonnet 4.6 · UNRLVL Infraestructura_

---

## 2026-05-26 — Sesión 3 · Pipeline completo + Arquitectura async Claude↔Ecosistema

### Resumen ejecutivo
Sesión de máxima densidad técnica. Se completó el pipeline organic de publicación, se resolvió la arquitectura de comunicación nativa Claude↔Ecosistema via Supabase bus, y se identificó el bloqueante final (ImageLab timeout en Vercel Node.js serverless).

---

### Meta MCP — Fixes completados

**Page Access Token fix (lib/meta.ts):**
- Root cause: FB operations requieren Page Access Token, no System User Token
- Fix: función `getPageToken()` → GET /{page_id}?fields=access_token → cachea resultado
- Resultado: `fb_publish_post` UNREALville funcionando ✅ post_id 122108066852692054

**Supabase Storage unrlvl-media:**
- Bucket público creado con estructura: temp/ (cleanup 48h), published/, ads/, brand/
- pg_cron job #32 — cleanup temp/ diario 3am UTC
- Endpoint /api/upload en unrlvl-meta-mcp: acepta base64 o URL → devuelve public_url

**NeuroneSCF conectada:**
- page_id: 1128233510364834
- ig_user_id: 17841427409446294
- ad_account_id: act_917261428011667
- Token generado desde BM de Patricia con UNRLVL Publisher (32 scopes)
- IG pendiente hasta que Laura autorice (instagram account assignment)

**LucienSael:**
- ig_user_id actualizado: 17841433630854316
- ad_account_id: pendiente

---

### Orchestrator — QWs completados

| QW | Fix | Estado |
|---|---|---|
| QW1 | SocialLab CORS * | ✅ |
| QW2 | /api/publish worker → Meta MCP | ✅ |
| QW3 | meta LabId + publish_organic FlowObjective | ✅ |
| QW4 | lab_configs entrada meta | ✅ |
| QW5 | ImageLab maxDuration 300s | ✅ |

**Fixes adicionales:**
- HubModule brand selector dropdown (14 marcas desde Supabase)
- FlowExecutorModule: brandId + previousOutputs entre stages
- Fail-fast en pipeline si lab devuelve error
- Brand guardrails en interpret-intent desde Supabase (process.env correcto)
- Dual-mode /api/trigger-job v3.0 fire-and-forget (responde 202 inmediatamente)
- interpret-intent: imagelab omitido por defecto, solo si prompt lo pide explícitamente

---

### Arquitectura Claude↔Ecosistema — RESUELTA

**El bus nativo:**
```
Claude → INSERT lab_jobs → pg_net trigger → lab-worker EF → pipeline → resultado en lab_jobs
```

**Componentes:**
- `lab_jobs` tabla extendida: job_type, prompt, platforms, aspect_ratio, auto_publish
- Trigger `lab_jobs_trigger_worker` vía pg_net.http_post → lab-worker EF
- `lab-worker` v13 con EdgeRuntime.waitUntil (fire-and-forget para jobs long-running)
- `lab-worker` dispatcher: job_type=copylab → email pipeline original; job_type=orchestrator → trigger-job

**Validación:**
- pg_net activo (request_id 8538 confirmado)
- Trigger funciona: job `processing` en <5 segundos tras INSERT
- lab-worker recibe job, lo marca `processing`, lanza background task

**Bloqueante pendiente:**
- Vercel Node.js serverless mata Promise flotante al enviar response
- trigger-job necesita cambiar de Node.js a Edge Runtime para que ctx.waitUntil() funcione
- O: mover pipeline completo a lab-worker EF directamente (bypasa Vercel)

---

### Claude Code — Setup establecido

Flujo permanente validado:
1. Claude Chat genera archivos + instrucciones
2. Sam abre Claude Code desktop → repo → pega prompt + adjunta archivos
3. Claude Code edita → commit → push → Vercel deploya automáticamente
4. Primera sesión: auth issue resuelto con `gh auth login -w` → unrealvillestudio-hub

---

### AGENDA MAÑANA — continuar esta actividad

**PRIORIDAD 0 — CRÍTICO: Resolver Vercel Node.js → Edge Runtime para trigger-job**
- Cambiar `api/trigger-job.ts`: añadir `export const config = { runtime: 'edge' }` al inicio
- Con Edge Runtime, `ctx.waitUntil()` funciona y el pipeline corre sin timeout
- Esto desbloquea el flujo completo sin ImageLab primero, luego con ImageLab
- Claude Code: 1 línea + `export const config = { runtime: 'edge' }` al top del archivo

**PRIORIDAD 1 — Validar flujo sin ImageLab de punta a punta**
- Una vez resuelto Edge Runtime en trigger-job, insertar job sin imagen
- Verificar: INSERT lab_jobs → trigger → lab-worker → trigger-job (Edge) → CopyLab → SocialLab → Meta MCP → post publicado en IG+FB
- Leer resultado en lab_jobs.output_parsed desde Claude

**PRIORIDAD 2 — ImageLab async architecture**
- ImageLab no puede ser síncrono en ningún pipeline — tarda 120-300s
- Patrón: INSERT lab_jobs con job_type=imagelab → lab-worker procesa → escribe image_url en lab_jobs → pipeline continúa
- Implica: lab-worker needs imagelab handler + trigger-job needs to poll/wait for imagelab job
- VideoLab mismo patrón

**PRIORIDAD 3 — Test completo con imagen**
- Una vez ImageLab es async, insertar job con imagen
- Verificar flujo completo: copy → imagen → encolar → publicar IG+FB

**PRIORIDAD 4 — Privacidad/data-deletion en unrealvillestudio.com**
- Para Meta Dev App App Review: /privacy + /data-deletion pages
- Simple HTML estático, no bloquea operación actual pero si escalar a más clientes

**PRIORIDAD 5 — NeuroneSCF IG (Laura) + TikTok Pixel duplicate fix**

---

### Estado meta_accounts al cierre

| brand_id | FB | IG | Ads | Token |
|---|---|---|---|---|
| UNREALville | ✅ | ✅ | ✅ | ✅ renovado |
| LucienSael | ✅ | ✅ | ❌ pending | ✅ |
| NeuroneSCF | ✅ | ⚠️ (Laura) | ✅ | ✅ |

### Estado lab_jobs schema al cierre

Nuevas columnas: job_type, prompt, platforms, aspect_ratio, auto_publish
Trigger activo: lab_jobs_trigger_worker (pg_net → lab-worker EF)
lab-worker: v13 con EdgeRuntime.waitUntil

---

## 2026-05-25 — Sesiones 1 y 2 (ver versiones anteriores)
