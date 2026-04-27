# Session Log — UnrealvilleStudio / IID Content Engine
_Last updated: 2026-04-26 · Modo: Production Ready for Business_

---

## 🚀 PRÓXIMA SESIÓN — PLAN DE EJECUCIÓN INMEDIATA

> Brief técnico ejecutable. Arrancar aquí directamente. Orden obligatorio.

---

### PASO 1 — TEST APPROVAL FLOW (30 min) · BLOQUEANTE

```sql
SELECT j.id, j.approval_token, j.status, p.id as piece_id, p.status as piece_status
FROM content.orchestrator_jobs j
JOIN content.content_pieces p ON p.id = j.piece_id
WHERE j.piece_id = 'e75bdb73-bba8-4ba9-8341-2c971bd785f8';
```
Llamar manualmente: `GET https://orchestrator-unrlvl.vercel.app/api/approve-job?token={TOKEN}&action=approve`  
Verificar `piece.status = 'published'`. Si falla: auditar `Orchestrator/api/approve-job.ts` vía GitHub Auditor.

---

### PASO 2 — IMAGELAB DIRECTO DESDE EF (45 min)

Pre-requisito: verificar `GEMINI_API_KEY` en Supabase Dashboard → Edge Functions → Secrets.  
Si no está: añadir desde aistudio.google.com.

Deploy content-run-stage **v1.10** — reemplazar bloque imagelab en runStage por llamada directa a Gemini 2.5 Flash (~3s) + Imagen 3 (~22s). Patrón idéntico a `callClaudeDirect`.

```typescript
async function callImagenDirect(bc, copyText, canal, psychoPreset) {
  const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
  // Step 1: Gemini 2.5 Flash → visual prompt
  // Step 2: Imagen 3 predict → base64 image
  // return `data:image/jpeg;base64,${b64}`
}
```
Tiempo esperado post-fix: ~25s. Pipeline total: ~50s.

---

### PASO 3 — CREAR CUENTA FAL.AI + API KEY (15 min)

- Crear cuenta en fal.ai
- Generar API key en dashboard
- Añadir `FAL_API_KEY` a Supabase EF secrets (Supabase Dashboard → Edge Functions → Secrets)
- Esto desbloquea VideoLab, y permite migrar ImageLab a fal.ai en una sesión posterior

---

### PASO 4 — OAUTH SOCIAL MEDIA (2-3 horas)

#### Migración DB primero:
```sql
CREATE TABLE IF NOT EXISTS public.brand_oauth_tokens (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id           text NOT NULL,
  persona            text NOT NULL,        -- 'unrlvl' | 'lucien'
  platform           text NOT NULL,        -- 'INSTAGRAM' | 'LINKEDIN' | 'TIKTOK' | 'X' | 'THREADS'
  access_token       text,
  refresh_token      text,
  token_expires_at   timestamptz,
  page_id            text,
  ig_user_id         text,
  extra_data         jsonb DEFAULT '{}',
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now(),
  UNIQUE (brand_id, persona, platform)
);
ALTER TABLE public.brand_oauth_tokens ENABLE ROW LEVEL SECURITY;
```

#### Cuentas a conectar:
| Persona | Instagram | LinkedIn | TikTok | X |
|---|---|---|---|---|
| unrlvl | ❌ | ❌ | ❌ | ❌ |
| lucien | ❌ | ❌ | ❌ | ❌ |

#### Stack OAuth por plataforma:
- **Meta**: developers.facebook.com → App Business → permisos `instagram_basic`, `instagram_content_publish` → long-lived token 60 días
- **LinkedIn**: linkedin.com/developers → `w_member_social` (Lucien) o `w_organization_social` (UNRLVL)
- **TikTok**: developers.tiktok.com → Content Posting API → `video.upload`, `video.publish`
- **X**: developer.twitter.com → Essential access → OAuth 2.0 PKCE

#### EF social-publisher (nuevo):
Cron cada 15 min → lee `scheduled_posts WHERE status='pending_oauth'` → llama API con token de `brand_oauth_tokens` → actualiza status a `published` o `failed`.

---

### PASO 5 — LABS TESTS SUITE

| Test | Pass condition | Bloqueante |
|---|---|---|
| T1: Approval flow | piece.status = 'published' | Sí |
| T2: Pipeline con imagen | imagelab:ok, image URL en piece | No |
| T3: Publicación real | post visible en plataforma | No |
| T4: Cache invalidation | dirty=true tras UPDATE en brands | No |
| T5: Autopublish | piece.status='published' sin email (score≥85, urgency='breaking') | No |
| T6: social-publisher | scheduled_posts.status='published' en <15min | No |
| T7: VideoLab | videolab:ok, video URL en piece | No (Fase 2) |

---

## ESTADO ACTUAL (post 2026-04-26)

### Pipeline IID — content-run-stage v1.9
```
copylab:   ✅ Claude directo EF (~9s)
aife:      ✅ Vercel AIFE (~4s)
imagelab:  ⚠️  Vercel 50s AbortSignal → fix en PASO 2
sociallab: ✅ Claude directo EF + Supabase write (~8s)
Total pipeline: ~71s · Piezas producidas: 1 · Email confirmado recibido
```

### Infraestructura activa
| Componente | ID/URL | Estado |
|---|---|---|
| Supabase project | amlvyycfepwhiindxgzw | ✅ Free plan (150s wall clock) |
| content-run-stage | EF version 12 (v1.9) | ✅ ACTIVE |
| context-cache | EF v4 | ✅ ACTIVE |
| content-dispatcher | EF | ✅ ACTIVE |
| aife | EF | ✅ ACTIVE |
| CopyLab | unrlvl-copy-lab.vercel.app | ✅ v8.1 maxDuration=60 |
| ImageLab | image-lab-unrlvl.vercel.app | ⚠️ maxDuration=60 pero timeout |
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
| **GEMINI_API_KEY** | ❌ PENDIENTE verificar/añadir |
| **FAL_API_KEY** | ❌ PENDIENTE crear cuenta fal.ai |
| **ELEVENLABS_API_KEY** | ⏳ Fase 3 |
| **HEYGEN_API_KEY** | ⏳ Fase 4 |
| **CREATOMATE_API_KEY** | ⏳ Fase 5 |

### Content pieces disponibles para tests
```sql
SELECT p.id, p.status, p.voice, p.platform, j.approval_token
FROM content.content_pieces p
JOIN content.orchestrator_jobs j ON j.piece_id = p.id
WHERE p.status = 'awaiting_approval';

-- Queue para nuevos runs
SELECT id, voice, angle FROM intel.iid_content_queue
WHERE orchestrator_status = 'pending' ORDER BY created_at;
```

### Supabase Plan Alert
Free: 150s wall clock. Pipeline actual: ~71s ✓. Con VideoLab async (fal-poller), el stage retorna en ~2s → problema resuelto por arquitectura. Upgrade a Pro ($25/mes) cuando el volumen de jobs lo justifique.

---

## AI LABS STRATEGY — REFERENCIA PERMANENTE

Documento completo: `docs/UNRLVL_Labs_Strategy.html` (también generado como HTML interactivo).

### Ecosistema completo de Labs

| Stage | Lab | Provider | Estado | Costo/pieza |
|---|---|---|---|---|
| 01 | CopyLab | Claude Sonnet 4 (directo) | ✅ Live | ~$0.015 |
| 02 | AIFE | Claude Sonnet 4 (directo) | ✅ Live | ~$0.008 |
| 03 | ImageLab | fal.ai / Imagen 3 | ⚠️ Fix pendiente | ~$0.05 |
| 04 | SocialLab | Claude Sonnet 4 (directo) | ✅ Live | ~$0.008 |
| 05 | VideoLab | fal.ai / Kling 2.5 Turbo Pro | 🔲 Fase 2 | $0.07/seg |
| 06 | VoiceLab | ElevenLabs API | 🔲 Fase 3 | ~$0.15/min |
| 07 | AvatarLab | HeyGen API | 🔲 Fase 4 | ~$0.08/seg |
| 08 | PodcastLab | Multi-lab + Creatomate | 🔲 Fase 5 | ~$4.00/ep |

### La decisión central: fal.ai como Media Bus
Una sola API key, 50+ modelos de imagen/video/audio/avatar. Cambiar de modelo = cambiar un string en `lab_configs.default_params`. No hay deployment, no hay código nuevo.

**VideoLab arquitectura async obligatoria:**
- Stage runner envía POST a fal.ai → recibe `{ request_id }` en 2s, retorna
- EF `fal-poller` (cron 30s) consulta status → cuando listo, actualiza piece con URL
- Resuelve definitivamente el problema de wall clock para generación de video

**Árbol de decisión:**
- Texto/copy → Claude (Anthropic directo)
- Imagen estática → fal.ai (Imagen 3 o FLUX)
- Video social <30s → fal.ai / Kling Turbo Pro
- Talking head / presenter → HeyGen API
- Voz de marca → ElevenLabs API
- Composición multi-modal larga → PodcastLab + Creatomate
- Nuevo tipo de contenido → verificar en fal.ai primero

### Stack de suscripciones por fase

| Servicio | Plan | $/mes | Fase | URL |
|---|---|---|---|---|
| Anthropic API | Pay-per-use | ~$50-100 | ✓ Activo | console.anthropic.com |
| fal.ai | Pay-per-use | ~$15-50 | → Fase 1 | fal.ai |
| Google AI Studio | Pay-per-use | ~$5-15 | → Fase 1 | aistudio.google.com |
| Supabase | Pro | $25 | → Fase 2 | supabase.com |
| Resend | Pay-per-use | ~$5 | ✓ Activo | resend.com |
| ElevenLabs | Creator | $22 | → Fase 3 | elevenlabs.io |
| HeyGen | Business | $89 | → Fase 4 | heygen.com |
| Creatomate | Starter | $49 | → Fase 5 | creatomate.com |
| **Total Fase 5** | | **$255-340** | | |

### Tiers de producto para clientes
- **Básico** — Social Content Engine: Copy+AIFE+Image+Social → ~$0.08/pieza → alto margen
- **Estándar** — Video Social Engine: +VideoLab → ~$0.77/pieza
- **Premium** — Brand Presence Engine: +Voice+Avatar → ~$3.17/pieza
- **Flagship** — Authority Content Engine: +PodcastLab → ~$4/episodio (vs $200-2000 producción tradicional)

### Regla de oro: cuándo cambiar un modelo
Un modelo se reemplaza SOLO cuando:
1. Nuevo modelo ≥20% mejor en calidad para el caso de uso específico
2. Nuevo modelo ≥30% más económico a igual calidad
3. Provider tiene incidente crítico (downtime, pricing shock, API break)
4. A/B pipeline muestra preferencia estadística por el nuevo modelo

No se cambia por hype, por novedad, ni porque "salió una versión nueva".

---

## ROADMAP COMPLETO

| Fase | Nombre | Objetivo | KPI |
|---|---|---|---|
| 0 | ✅ Completado | Core pipeline funcionando | Email recibido |
| 1 | Production Ready Core | Pipeline publicable + OAuth | 10 piezas publicadas |
| 2 | Video Social | VideoLab + async fal.ai | Primer TikTok via pipeline |
| 3 | Identidad Sonora | VoiceLab + voz Lucien clonada | Pieza con voz de Lucien |
| 4 | Identidad Visual | AvatarLab + avatar Lucien | Talking head video publicado |
| 5 | Flagship Product | PodcastLab + The Unrealville Intel Brief | Primer episodio publicado |

---

## HISTORIAL COMPRIMIDO

**2026-04-26** Pipeline IID end-to-end funcionando. Email recibido. Fix: Vercel→Anthropic latency resuelto con llamadas directas desde EF en copylab y sociallab. BUG FIX: labs_status persiste en failure path. imagelab: 50s AbortSignal, skip no-crítico. AI Labs Strategy definida: 8 labs, 5 fases, fal.ai como media bus, stack de suscripciones por fase.

**2026-04-25** Stage runner sync architecture. v1.8 con copylab direct. Primer copylab:ok real.

**2026-04-24** context-cache EF v4. brand_context_cache table. 11 triggers. compile_brand_context().

**2026-04-23 y antes** Dispatcher, lab_configs, pipeline architecture, CopyLab v8.1 context integration.
