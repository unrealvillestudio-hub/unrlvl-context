# Session Log — UnrealvilleStudio / IID Content Engine
_Last updated: 2026-04-26_

---

## SESIÓN 2026-04-26 — IID CONTENT ENGINE: PIPELINE COMPLETO ✅

### Logro principal
**Primera ejecución end-to-end exitosa del IID Content Engine.** El pipeline genera copy real, lo filtra con AIFE, encola posts sociales, crea el content piece y envía el email de aprobación. Email confirmado recibido.

### Arquitectura final del pipeline (content-run-stage v1.9)
```
iid_content_queue (pending)
→ content-dispatcher (pg_net trigger)
→ content-run-stage v1.9 (Supabase EF)
  → copylab:   Claude directo desde EF (~9s)   ✅
  → aife:      Vercel AIFE (~4s)               ✅
  → imagelab:  Vercel Imagen 3 (50s timeout)   ⚠️ non-critical skip
  → sociallab: Claude directo desde EF (~8s)   ✅
→ content_pieces (awaiting_approval) → email Resend → approve-job
```

**Tiempo total pipeline:** ~71 segundos para un post completo.

### Causa raíz resuelta
Vercel→Anthropic API latency >60s consistente desde iad1. Fix definitivo: Anthropic se llama directamente desde el Supabase EF (igual que iid-core, que completa en ~16s). Se aplicó a copylab y sociallab.

### Fixes desplegados hoy
| Componente | Fix | Estado |
|---|---|---|
| content-run-stage v1.9 | copylab: direct Anthropic call desde EF | ✅ deployed |
| content-run-stage v1.9 | sociallab: direct Anthropic call + direct Supabase write | ✅ deployed |
| content-run-stage v1.9 | BUG FIX: labs_status persisted en failure path (faltaba en v1.8) | ✅ deployed |
| content-run-stage v1.9 | imagelab: AbortSignal 50s, pipeline continúa si falla | ✅ deployed |
| content-run-stage v1.9 | Last-stage fallback: crea piece aunque último lab falle | ✅ deployed |
| CopyLab/vercel.json | maxDuration=60 | ✅ committed |
| ImageLab/vercel.json | maxDuration=60 (warnings en build) | ✅ deployed con warnings |
| SocialLab/vercel.json | maxDuration=60 | ✅ deployed |

### Primer content piece producido
- **Job:** `055c4ee6-fceb-490d-ad1f-6c5c5e5b7ec9`
- **Piece ID:** `e75bdb73-bba8-4ba9-8341-2c971bd785f8`
- **Status:** awaiting_approval → email recibido ✅
- **Labs:** copylab:ok · aife:ok · imagelab:failed(skip) · sociallab:ok
- **Copy:** Post sobre X algorithm pay-to-play, voz lucien, LinkedIn

### Infraestructura context cache
- Tabla `content.brand_context_cache` activa con 11 triggers
- context-cache EF v4: ~500ms cache HIT
- Brand context UnrealvilleStudio: 7,969 bytes · voice_count=0 (voices no populados aún)

---

## PENDIENTE — PRÓXIMA SESIÓN (prioridades ordenadas)

### P1 — OAuth Social Media (bloqueante para publicación real)
Conectar cuentas de marca de Unrealville Studio y Lucien Sael para que `scheduled_posts` pueda auto-publicar. Actualmente todos los posts quedan en `status: 'pending_oauth'`.

**Plataformas a conectar por marca:**
| Marca | Instagram | LinkedIn | TikTok | X/Twitter | Threads |
|---|---|---|---|---|---|
| Unrealville Studio | ❌ | ❌ | ❌ | ❌ | ❌ |
| Lucien Sael | ❌ | ❌ | ❌ | ❌ | ❌ |

**Stack técnico requerido:**
- Meta Business OAuth (Instagram + Threads) — Long-lived access tokens
- LinkedIn API OAuth 2.0
- TikTok for Developers — Content Posting API
- X/Twitter API v2 — Write access
- Tabla `brand_oauth_tokens` en Supabase (brand_id, platform, access_token, refresh_token, expires_at)
- Edge Function `social-publisher` que lea `scheduled_posts` y publique vía tokens

### P2 — ImageLab Fix (call Imagen 3 directo desde EF)
Misma solución que copylab: eliminar el hop Vercel→Google y llamar Imagen 3 directamente desde el stage EF.

**Implementación:**
- Añadir `GEMINI_API_KEY` a los secrets del EF `content-run-stage` en Supabase
- Añadir función `callImagenDirect()` en v1.10 del stage (copiar patrón de `callClaudeDirect`)
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_KEY}`
- También requiere llamar Gemini 2.5 Flash primero para construir el visual prompt
- Tiempo esperado: ~25s (mismo orden que copylab desde EF)

**Nota:** ImageLab Vercel sigue útil para la UI manual — solo el pipeline IID lo bypasea.

### P3 — VideoLab: Crear y Conectar
- Proyecto Vercel `prj_R0t1QvEnagCNn71Qq4iBLwgxy1MJ` existe en el team pero sin implementación
- Auditar repo `unrlvl-video-lab` (o equivalente) con GitHub Auditor
- Definir API de video: RunwayML Gen-3, Kling AI, o Google Veo 2
- Crear `api/execute.ts` con misma interfaz que ImageLab
- Añadir entrada en `lab_configs` con `iid_stage_order=5`
- Necesita vercel.json con `maxDuration: 300` (video generation ~120-180s)
- CRÍTICO: VideoLab también deberá llamar la API de video directamente desde EF (misma razón que copylab)

### P4 — Cuentas UNRLVL para Modelos de Generación
**Image Generation:**
- Verificar que `GEMINI_API_KEY` esté en Supabase EF secrets para el stage
- Confirmar billing activo en Google AI Studio para Imagen 3
- Verificar quotas: Imagen 3 tiene límite de requests/día en tier gratuito

**Video Generation** (seleccionar API antes de implementar VideoLab):
- RunwayML: runway.ml/api — Gen-3 Alpha ~$0.05/sec
- Kling AI: klingai.com — alternativa más económica
- Google Veo 2: via Vertex AI — requiere Google Cloud billing
- Recomendación: RunwayML por madurez de API y calidad

### P5 — Labs Tests: Ecosystem Ready for Business
Suite de tests a ejecutar antes de onboarding de primer cliente:

**Test 1: Pipeline IID completo con imagen**
- Requiere P2 (ImageLab fix) completado
- Correr 5 jobs end-to-end, todos deben producir: copy + imagen + social posts + email

**Test 2: Pipeline IID completo con publicación real**
- Requiere P1 (OAuth) completado
- Correr job con cuenta OAuth conectada, verificar post en plataforma

**Test 3: Brand Context Cache stress test**
- Modificar brand data y verificar que dirty=true invalida cache correctamente
- Verificar que TTL 60min funciona

**Test 4: Multi-brand isolation**
- Crear segundo brand (Lucien Sael como marca separada si no existe)
- Correr job para cada marca, verificar que contexts no se mezclan

**Test 5: Content approval flow**
- Recibir email → click PUBLICAR → verificar que piece cambia a status=published
- Recibir email → click RECHAZAR → verificar que piece cambia a status=rejected

**Test 6: SocialLab scheduled_posts → publisher**
- Requiere P1 + P3 (social-publisher EF)
- Verificar que posts en scheduled_posts se publican a las scheduled_at

**Test 7: VideoLab integration**
- Requiere P3 (VideoLab) completado
- Correr job completo con stage videolab activo

**Test 8: Queue health (autopublish)**
- Crear finding con content_score ≥ 85 y urgency="breaking"
- Verificar que piece se crea con status=published sin pasar por approval

---

## HISTORIAL DE SESIONES ANTERIORES

### SESIÓN 2026-04-25 — Stage Runner debugging + first copylab:ok
- Identificado: waitUntil blocks external HTTP (EF-to-Vercel)
- Fix: arquitectura synchronous (no waitUntil)
- content-run-stage v1.8 deployed con copylab direct Claude call
- Primer copylab:ok real (11s)
- imagelab y sociallab: timeout Vercel pendientes

### SESIÓN 2026-04-24 — IID Core + Context Cache
- iid-core v1.1 deployed: ecosystem_status watchlist band (50-69)
- context-cache EF v4 deployed con brand_context_cache table
- 11 triggers para dirty flag
- compile_brand_context() SQL function

### SESIÓN ANTERIOR — Ecosystem & Pipeline Setup
- Dispatcher → stage pipeline arquitectura definida
- lab_configs table: copylab/aife/imagelab/sociallab configurados
- content-run-stage v1.0→v1.7: múltiples iteraciones
- CopyLab v8.1: brandContext cache integration
