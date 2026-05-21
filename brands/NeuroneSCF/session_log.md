# SESSION LOG — NeuroneSCF / CopyLab Async Sprint
_Sesión: 2026-05-21 | Duración: ~8h | Estado: EN CURSO_

---

## RESUMEN EJECUTIVO

Sprint para implementar modo async en CopyLab (jobs procesados en background sin bloquear el browser).
Bloqueado por incompatibilidad estructural pg_net → Vercel. Solución definitiva: EF processor + pg_cron.
Bonus no planeado: construcción del custom MCP `unrlvl-supabase-mcp` para control total del proyecto Supabase.

---

## ESTADO ACTUAL AL CIERRE DE SESIÓN

### ✅ COMPLETADO
- `copylab_jobs` tabla creada en Supabase (`amlvyycfepwhiindxgzw`)
- `execute.ts` v9.4.1 deployado — async mode con `createJob` + 202 response
- `vercel.json` con `fluid: false` + `maxDuration: 300`
- `unrlvl-supabase-mcp` deployado en Vercel y conectado en Claude.ai
  - URL: `https://unrlvl-supabase-mcp.vercel.app/api/mcp/mcp`
  - Repo: `unrealvillestudio-hub/unrlvl-supabase-mcp`
  - 7 tools: execute_sql, apply_migration, deploy_edge_function, list_edge_functions, get_edge_function, get_logs, list_tables
- Professor actualizado: 6 learnings + 1 manual + 5 errores conocidos

### 🔴 PENDIENTE CRÍTICO (próximo chat)

#### 1. UNRLVL_SB_ACCESS_TOKEN — BLOQUEANTE
El env var en Vercel contiene un **service_role JWT**, NO un PAT.
La Management API de Supabase requiere Personal Access Token (`sbp_...`).
**Fix:** supabase.com/dashboard/account/tokens → Generate new token → pegar en Vercel → `UNRLVL_SB_ACCESS_TOKEN` → Save → Redeploy `unrlvl-supabase-mcp`.

#### 2. DEPLOY copylab-processor — BLOQUEADO por punto 1
Una vez el PAT esté correcto, usar el MCP desde Claude.ai:
```
deploy_edge_function(
  name: "copylab-processor",
  verify_jwt: false,
  files: [{ name: "index.ts", content: [ver código abajo] }]
)
```

#### 3. PG_CRON setup — DESPUÉS del punto 2
```sql
SELECT cron.schedule(
  'copylab-processor-1min',
  '* * * * *',
  $$
  SELECT net.http_post(
    url := 'https://amlvyycfepwhiindxgzw.supabase.co/functions/v1/copylab-processor',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb,
    timeout_milliseconds := 145000
  );
  $$
);
```

#### 4. execute.ts — CLEANUP (baja prioridad)
Remover `'Connection': 'close'` del CORS object — es forbidden header, genera warning en Vercel logs pero no bloquea nada.

#### 5. EMAIL SEQUENCES Cart A + Cart B ES — objetivo original del sprint
Una vez el processor esté activo, generar via browser → CopyLab → async mode.

---

## CÓDIGO copylab-processor (listo para deploy)

```typescript
/**
 * copylab-processor v1.0
 * Triggered by pg_cron every minute.
 * Reads queued jobs from copylab_jobs → calls CopyLab sync → updates job.
 */

const SB_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SB_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const COPYLAB_URL = 'https://unrlvl-copy-lab.vercel.app';
const MAX_ATTEMPTS = 3;
const BATCH_SIZE = 2;

const SB_HEADERS = {
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
  'Content-Type': 'application/json',
};

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

async function patchJob(id: string, patch: Record<string, unknown>) {
  await fetch(`${SB_URL}/rest/v1/copylab_jobs?id=eq.${id}`, {
    method: 'PATCH',
    headers: SB_HEADERS,
    body: JSON.stringify(patch),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  const startedAt = new Date().toISOString();
  console.log(`[copylab-processor] invoked at ${startedAt}`);

  const jobsRes = await fetch(
    `${SB_URL}/rest/v1/copylab_jobs?status=eq.queued&attempt_count=lt.${MAX_ATTEMPTS}&order=created_at.asc&limit=${BATCH_SIZE}`,
    { headers: SB_HEADERS }
  );

  if (!jobsRes.ok) {
    const err = await jobsRes.text();
    return new Response(JSON.stringify({ error: 'fetch_jobs_failed', detail: err }), { status: 500, headers: CORS });
  }

  const jobs: any[] = await jobsRes.json();
  console.log(`[copylab-processor] ${jobs.length} queued job(s) found`);

  if (!jobs.length) {
    return new Response(JSON.stringify({ status: 'no_jobs', ts: startedAt }), { status: 200, headers: CORS });
  }

  const results: any[] = [];

  for (const job of jobs) {
    const jobStart = Date.now();
    console.log(`[copylab-processor] processing job ${job.id} brand=${job.brand_id} pack=${job.pack} attempt=${job.attempt_count + 1}`);

    await patchJob(job.id, {
      status: 'processing',
      started_at: new Date().toISOString(),
      attempt_count: job.attempt_count + 1,
    });

    try {
      const labRes = await fetch(`${COPYLAB_URL}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job.input),
        signal: AbortSignal.timeout(140_000),
      });

      const elapsed = Date.now() - jobStart;
      console.log(`[copylab-processor] job ${job.id} responded ${labRes.status} in ${elapsed}ms`);

      if (!labRes.ok) {
        const errText = await labRes.text();
        await patchJob(job.id, {
          status: job.attempt_count + 1 >= MAX_ATTEMPTS ? 'error' : 'queued',
          error: `lab_${labRes.status}: ${errText.slice(0, 400)}`,
          completed_at: new Date().toISOString(),
        });
        results.push({ job_id: job.id, status: 'error', code: labRes.status });
        continue;
      }

      const labData = await labRes.json();

      await patchJob(job.id, {
        status: 'done',
        output: labData.output ?? null,
        output_parsed: labData.meta ?? labData,
        completed_at: new Date().toISOString(),
        error: null,
      });

      console.log(`[copylab-processor] job ${job.id} DONE in ${Date.now() - jobStart}ms`);
      results.push({ job_id: job.id, status: 'done', ms: Date.now() - jobStart });

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const isTimeout = msg.includes('timed out') || msg.includes('AbortError');
      console.error(`[copylab-processor] job ${job.id} exception: ${msg}`);
      await patchJob(job.id, {
        status: isTimeout && job.attempt_count + 1 < MAX_ATTEMPTS ? 'queued' : 'error',
        error: msg.slice(0, 500),
        completed_at: new Date().toISOString(),
      });
      results.push({ job_id: job.id, status: 'error', detail: msg.slice(0, 100) });
    }
  }

  return new Response(
    JSON.stringify({ processed: results.length, results, ts: startedAt }),
    { status: 200, headers: CORS }
  );
});
```

---

## DECISIONES TÉCNICAS TOMADAS

| Decisión | Razón |
|----------|-------|
| pg_net NO llama Vercel nunca | Incompatibilidad estructural TCP/HTTP. pg_net espera cierre de conexión, Vercel usa keep-alive. |
| EF processor llama Vercel sync | Deno fetch maneja HTTP largo sin problema. EF 150s > Claude 30-90s. |
| pg_cron cada 1 min (no 30s) | Mínimo de pg_cron es 1 minuto. Suficiente para el uso case. |
| BATCH_SIZE = 2 | EF 150s / ~60s por job = 2 jobs seguros por invocación. |
| unrlvl-supabase-mcp sin Next.js | Next.js 15.3.x tiene CVE activo. @vercel/node puro = sin problemas. |
| PAT no service_role | Management API Supabase requiere `sbp_...` token, no JWT. |

---

## IDS Y REFERENCIAS CLAVE

| Recurso | ID / URL |
|---------|----------|
| Supabase proyecto | `amlvyycfepwhiindxgzw` |
| Vercel team | `team_fEH94Irp6BAI9YGm4btGna5n` |
| CopyLab Vercel | `prj_5FebBMfTpo4aP5I7iJ98libUkTTe` |
| unrlvl-supabase-mcp Vercel | `prj_svtqNxIlwRvzMFYKmnOCAyK7GcQP` |
| CopyLab URL | `https://unrlvl-copy-lab.vercel.app` |
| MCP URL | `https://unrlvl-supabase-mcp.vercel.app/api/mcp/mcp` |
| CopyLab último deploy | `dpl_4VEtXo2ryavYkZATbtRVvNagFHUz` (Connection:close, fluid:false) |
| CLAUDE_BRIDGE_SECRET | `3Oll9BRBBXGeR9QGa1iI0uyGDsV1QzeU` |

---

## PRIMER MENSAJE DEL PRÓXIMO CHAT

"Protocolo actualización — continuar sprint CopyLab async. Cargar este session_log. Primer paso: verificar UNRLVL_SB_ACCESS_TOKEN en Vercel (debe ser PAT sbp_..., no service_role). Una vez confirmado, deploy copylab-processor + pg_cron."
