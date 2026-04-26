# Session Log — UnrealvilleStudio / IID Content Engine
_Last updated: 2026-04-26 · Modo: Production Ready for Business_

---

## 🚀 PRÓXIMA SESIÓN — PLAN DE EJECUCIÓN INMEDIATA

> Brief técnico ejecutable. La próxima instancia arranca aquí directamente.
> Orden obligatorio — cada paso desbloquea el siguiente.

---

### PASO 1 — TEST APPROVAL FLOW (30 min) · BLOQUEANTE

**Por qué primero:** hay un piece en `awaiting_approval`. Si el botón PUBLICAR del email no funciona, el loop completo está roto y no lo sabemos hasta que importa.

**Verificar piece activo:**
```sql
SELECT j.id, j.approval_token, j.status, p.id as piece_id, p.status as piece_status
FROM content.orchestrator_jobs j
JOIN content.content_pieces p ON p.id = j.piece_id
WHERE j.piece_id = 'e75bdb73-bba8-4ba9-8341-2c971bd785f8';
```

**Llamar approve manualmente con el token:**
```
GET https://orchestrator-unrlvl.vercel.app/api/approve-job?token={TOKEN}&action=approve
```

**Verificar en DB:**
```sql
SELECT id, status FROM content.content_pieces
WHERE id = 'e75bdb73-bba8-4ba9-8341-2c971bd785f8';
-- Debe ser: published
```

**Si falla:** auditar `Orchestrator/api/approve-job.ts` vía `https://unrlvl-tools.vercel.app/api/gh?repo=Orchestrator&path=api/approve-job.ts`

---

### PASO 2 — IMAGELAB DIRECTO DESDE EF (45 min)

**Pre-requisito:** verificar `GEMINI_API_KEY` en Supabase Dashboard → Edge Functions → Secrets. Si no está, Sam lo añade desde aistudio.google.com.

**Deploy content-run-stage v1.10** — reemplazar bloque imagelab en runStage:

Añadir función `callImagenDirect`:
```typescript
async function callImagenDirect(bc: any, copyText: string, canal: string, psychoPreset: string | null): Promise<string> {
  const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
  if (!GEMINI_KEY) throw new Error("GEMINI_API_KEY not set");

  const brandName = bc?.identity?.display_name ?? "brand";
  const palette   = (bc?.palette ?? []).map((c: any) => c.hex).join(", ");
  const style     = "commercial photography, high quality, sharp focus";

  // Step 1: Gemini 2.5 Flash para prompt visual (~3s)
  const promptRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${GEMINI_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text:
        `Generate a concise Imagen 3 prompt for a ${canal} post.
Brand: ${brandName}. Style: ${style}. Palette: ${palette}.
Copy theme: ${copyText.slice(0, 150)}
Psycho preset: ${psychoPreset ?? "authority"}.
Return ONLY the prompt text, no explanation, max 100 words.` }] }] }) }
  );
  if (!promptRes.ok) throw new Error(`Gemini error: ${promptRes.status}`);
  const promptData = await promptRes.json();
  const visualPrompt = promptData.candidates?.[0]?.content?.parts?.[0]?.text
    ?? `${brandName} product, ${style}, 8k`;

  // Step 2: Imagen 3 (~22s)
  const aspectRatio = (canal.includes("tiktok") || canal.includes("reel")) ? "9:16" : "1:1";
  const imgRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_KEY}`,
    { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt: visualPrompt }],
        parameters: { sampleCount: 1, aspectRatio, safetyFilterLevel: "BLOCK_ONLY_HIGH", personGeneration: "ALLOW_ADULT" }
      }) }
  );
  if (!imgRes.ok) throw new Error(`Imagen 3 error: ${imgRes.status}`);
  const imgData = await imgRes.json();
  const b64 = imgData.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("Imagen 3: no image returned");
  return `data:image/jpeg;base64,${b64}`;
}
```

En el bloque `imagelab`:
```typescript
} else if (lab.lab_key === "imagelab") {
  try {
    const rawCopy = (assets.copy?.aife_filtered ?? assets.copy?.raw ?? "") as string;
    const imageDataUrl = await callImagenDirect(brandContext, rawCopy, platform1, qItem?.psycho_preset ?? null);
    assets.image = { url: imageDataUrl, prompt_summary: "[Imagen 3 direct EF]" };
    ls[lab.lab_key] = "ok";
    success = true;
    console.log(`[v1.10] imagelab OK via direct Imagen 3`);
  } catch (e) {
    errorMsg = String(e);
    ls[lab.lab_key] = "failed";
    console.error(`[v1.10] imagelab direct FAILED: ${errorMsg}`);
  }
  await ccClient.from("orchestrator_jobs").update({ labs_status: ls, assets }).eq("id", job_id);
```

**Tiempo esperado post-fix:** ~25s (Gemini ~3s + Imagen 3 ~22s). Pipeline total: ~50s.

---

### PASO 3 — OAUTH SOCIAL MEDIA (2-3 horas)

#### 3a. Migración DB — ejecutar primero
```sql
CREATE TABLE IF NOT EXISTS public.brand_oauth_tokens (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id           text NOT NULL,
  persona            text NOT NULL,        -- 'unrlvl' | 'lucien'
  platform           text NOT NULL,        -- 'INSTAGRAM' | 'LINKEDIN' | 'TIKTOK' | 'X' | 'THREADS'
  access_token       text,
  refresh_token      text,
  token_expires_at   timestamptz,
  page_id            text,                 -- Facebook Page ID
  ig_user_id         text,                 -- Instagram Business Account ID
  extra_data         jsonb DEFAULT '{}',
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now(),
  UNIQUE (brand_id, persona, platform)
);
ALTER TABLE public.brand_oauth_tokens ENABLE ROW LEVEL SECURITY;
```

#### 3b. Cuentas a conectar (objetivo de sesión)
| Persona | Instagram | LinkedIn | TikTok | X/Twitter |
|---|---|---|---|---|
| unrlvl | ❌ | ❌ | ❌ | ❌ |
| lucien | ❌ | ❌ | ❌ | ❌ |

#### 3c. Stack técnico por plataforma

**Meta (Instagram + Threads):**
- developers.facebook.com → crear App tipo Business
- Permisos: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`
- Token exchange: `GET https://graph.facebook.com/v18.0/oauth/access_token`
- Publicar imagen: `POST /{ig-user-id}/media` → `POST /{ig-user-id}/media_publish`
- Long-lived token dura 60 días → refresh cron cada 45 días

**LinkedIn:**
- linkedin.com/developers → crear App → Products: Share on LinkedIn, Sign In with LinkedIn
- Permisos: `w_member_social` (Lucien personal) o `w_organization_social` (UNRLVL page)
- Publicar: `POST https://api.linkedin.com/v2/ugcPosts`

**TikTok:**
- developers.tiktok.com → crear App → Content Posting API
- Permisos: `video.upload`, `video.publish`
- Publicar: `POST https://open.tiktokapis.com/v2/post/publish/video/init/`

**X/Twitter:**
- developer.twitter.com → Essential access (free tier)
- OAuth 2.0 PKCE
- Publicar: `POST https://api.twitter.com/2/tweets`

#### 3d. EF social-publisher (nuevo)
```
Nombre: social-publisher
Trigger: cron cada 15 min (o llamado desde stage runner)
Lógica:
  1. SELECT from scheduled_posts WHERE status='pending_oauth' AND scheduled_at <= now()
  2. Para cada post: GET token de brand_oauth_tokens WHERE persona=post.persona AND platform=post.platform
  3. Call platform API con token
  4. UPDATE scheduled_posts SET status='published' (o 'failed')
```

#### 3e. OAuth UI
Añadir page `/oauth` en Orchestrator con botones por plataforma que inicien el flow y guarden token en `brand_oauth_tokens` via callback.

---

### PASO 4 — VIDEOLAB (1.5 horas)

**Auditar primero:**
```
https://unrlvl-tools.vercel.app/api/gh?repo=VideoLab&action=tree&branch=main
```
Vercel project: `prj_R0t1QvEnagCNn71Qq4iBLwgxy1MJ`

**API:** RunwayML Gen-3 Alpha
- Account: runwayml.com → crear cuenta + API key
- Endpoint text-to-video: `POST https://api.runwayml.com/v1/text_to_image` (Gen-3)
- Endpoint image-to-video: `POST https://api.runwayml.com/v1/image_to_video`
- Costo: ~$0.05/seg → 5s clip = $0.25
- Tiempo: ~60-90s generación

**Criterio de activación en lab_configs:**
```sql
INSERT INTO public.lab_configs (lab_key, api_endpoint, execute_path, iid_stage_order, active, default_params)
VALUES ('videolab', 'https://video-lab-unrlvl.vercel.app', '/api/execute', 5, false, '{"min_score": 85, "platforms": ["TIKTOK", "INSTAGRAM_REELS"]}');
-- active=false hasta que esté probado
```

**Variables a añadir a Supabase EF secrets:** `RUNWAY_API_KEY`

**CRÍTICO:** VideoLab también llamará la API directamente desde EF (mismo patrón que copylab/imagelab). Añadir `callRunwayDirect()` en stage v1.10 o v1.11.

**vercel.json:** `maxDuration: 300`

---

### PASO 5 — LABS TESTS SUITE (ejecutar en orden)

| Test | Condición de pass | Bloqueante si falla |
|---|---|---|
| T1: Approval flow | piece.status = 'published' tras click approve | Sí |
| T2: Pipeline con imagen | imagelab:ok, image URL en piece.assets | No |
| T3: Pipeline con publicación real | post aparece en plataforma | No (hasta OAuth listo) |
| T4: Cache invalidation | dirty=true tras UPDATE en brands | No |
| T5: Autopublish | piece.status='published' sin email, score≥85, urgency='breaking' | No |
| T6: social-publisher cron | scheduled_posts.status='published' en <15min | No |
| T7: VideoLab | videolab:ok, video URL en piece.assets | No |

---

## ESTADO ACTUAL DEL SISTEMA (post 2026-04-26)

### Pipeline IID — content-run-stage v1.9
```
copylab:   ✅ Claude directo EF (~9s)
aife:      ✅ Vercel AIFE (~4s)
imagelab:  ⚠️  Vercel 50s timeout → fix en PASO 2
sociallab: ✅ Claude directo EF + Supabase write (~8s)
Total pipeline: ~71s | Piezas producidas hoy: 1
```

### Infraestructura
| Componente | ID/URL | Estado |
|---|---|---|
| Supabase project | amlvyycfepwhiindxgzw | ✅ Free plan |
| content-run-stage | EF version 12 | ✅ v1.9 ACTIVE |
| context-cache | EF | ✅ v4 ACTIVE |
| content-dispatcher | EF | ✅ ACTIVE |
| aife | EF | ✅ ACTIVE |
| CopyLab | unrlvl-copy-lab.vercel.app | ✅ v8.1 |
| ImageLab | image-lab-unrlvl.vercel.app | ⚠️ maxDuration=60 activo |
| SocialLab | social-lab-flame.vercel.app | ✅ maxDuration=60 (bypassed) |
| Orchestrator | orchestrator-unrlvl.vercel.app | ✅ |
| GitHub Auditor | unrlvl-tools.vercel.app/api/gh | ✅ |
| Context system | unrlvl-context.vercel.app | ✅ |
| Vercel team | team_fEH94Irp6BAI9YGm4btGna5n | ✅ |

### Secrets en Supabase EF
| Variable | Estado |
|---|---|
| ANTHROPIC_API_KEY | ✅ activa |
| RESEND_API_KEY | ✅ activa |
| IID_CRON_SECRET | ✅ activa |
| SUPABASE_SERVICE_ROLE_KEY | ✅ activa |
| ORCHESTRATOR_URL | ✅ activa |
| VERCEL_BYPASS_SECRET | ✅ activa |
| **GEMINI_API_KEY** | ❌ **PENDIENTE verificar/añadir** |
| **RUNWAY_API_KEY** | ❌ **PENDIENTE crear cuenta RunwayML** |

### Supabase Plan Alert
Free plan wall clock: 150s. Pipeline actual: ~71s ✓. Con VideoLab activo (~120-180s generación de video), se superará el límite. Evaluar Supabase Pro ($25/mes) al incorporar VideoLab.

### Content pieces para tests
```sql
-- Piezas disponibles para aprobación
SELECT p.id, p.status, p.voice, p.platform, j.approval_token
FROM content.content_pieces p
JOIN content.orchestrator_jobs j ON j.piece_id = p.id
WHERE p.status = 'awaiting_approval';

-- Queue disponible para nuevos runs
SELECT id, voice, angle FROM intel.iid_content_queue
WHERE orchestrator_status = 'pending'
ORDER BY created_at;
```

---

## HISTORIAL COMPRIMIDO

**2026-04-26** Pipeline end-to-end funcionando. Email recibido. Fix: Vercel→Anthropic latency resuelto con llamadas directas desde EF en copylab y sociallab. BUG FIX: labs_status ahora persiste en failure path. imagelab 50s AbortSignal, skip no-crítico.

**2026-04-25** Stage runner sync architecture. v1.8 con copylab direct. Primer copylab:ok real.

**2026-04-24** context-cache EF v4. brand_context_cache table. 11 triggers. compile_brand_context().

**2026-04-23 y antes** Dispatcher, lab_configs, pipeline architecture, CopyLab v8.1 context integration.
