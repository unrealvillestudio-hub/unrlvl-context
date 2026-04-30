# SESSION LOG — Unrealville Studio
_Última actualización: 2026-04-30_

---

## SESIÓN 2026-04-30 — SPRINT IID + LUCIEN IDENTITY + SOCIAL MEDIA

### COMPLETADO

**IID Pipeline:**
- ✅ `content-run-stage v1.11` deployado — ImageLab pipeline completo portado al EF: carga `brands (imagelab_*)` + `imagelab_presets (brand+canal+GLOBAL fallback)` + `psycho_presets.injection_visual` → `buildVisualPrompt()` → `fal.ai/imagen3` (~10s, sin timeout Vercel)
- ✅ `FAL_API_KEY` confirmado en Supabase EF secrets
- ✅ EF `approve-piece v1.0` deployada — fix content schema no expuesto en PostgREST
- ✅ `approve-job.ts v2.0` generado para Orchestrator — delega a EF, fix 504
- ✅ `brand_oauth_tokens` tabla creada en Supabase (RLS + trigger + index)

**Webs:**
- ✅ `unrealvillestudio.com` index v3 generado — footer legal (Privacy · Terms · Lucien Sael link) + `UNREALville` en sección The Name (Bebas Neue UNREAL + VILLE chalk, no italic) + CSS correcciones
- ✅ `luciensael.com` index v3 generado — legal links → local pages propias
- ✅ Legal pages UNRLVL: `legal/terms.html` + `legal/privacy.html` (design system UNRLVL)
- ✅ Legal pages Lucien: `legal/terms.html` + `legal/privacy.html` (design system Lucien — obsidian, ember, Cormorant Garamond)
- ✅ `vercel.json` con rewrites para legal pages
- ✅ DNS fix identificado: www.unrealvillestudio.com → CNAME `cname.vercel-dns.com`, proxy OFF en Cloudflare

**Lucien Sael — Identity:**
- ✅ `BP_Brand_Person_id.md v1.0` — documento canónico completo: físico, ajuar canon, vestuario, voz specs, ImageLab params, prompt MJ completo
- ✅ `brands` table Supabase — record `LucienSael` creado con imagelab + voicelab params
- ✅ Ajuar canon definido: Movado Museum acero·cromado, 2 ear pins oro blanco 0.03ct, colgante cadena oro blanco 1.2mm+pieza geométrica con espinela negra/rubí/amatista. Negro absoluto. Zapatilla cuero tipo Hugo Boss. Sin cuello alto.
- ✅ Ruta avatar: MJ Basic $10/mes (permanente para ecosistema) → LoRA fal.ai → ElevenLabs voice design-from-scratch

**Social Media:**
- ✅ Aliases email creados: ig/fb/tiktok/linkedin/x @unrealvillestudio.com + @luciensael.com → forwarding a ambos gmails
- ✅ Meta Business Manager UNRLVL configurado
- ✅ Meta Developer App creada — Instagram Graph API + Pages API
- ✅ Instagram @unrealvillestudio creado (Business)
- ✅ Facebook Page Lucien creada + Instagram Lucien (baneada — re-crear pendiente)
- ✅ TikTok UNRLVL Business creado (Content Posting API draft — requiere LoginKit)
- ✅ TikTok Lucien Creator creado

### PENDIENTE DEPLOY

| Archivo | Repo | Ruta |
|---|---|---|
| `unrlvl-index-v3.html` → `index.html` | CoreProject | raíz |
| `vercel.json` | CoreProject | raíz |
| `legal/terms.html` | CoreProject | `legal/` |
| `legal/privacy.html` | CoreProject | `legal/` |
| `luciensael-index-v3.html` → `index.html` | LucienSael | raíz |
| `legal/terms.html` (Lucien) | LucienSael | `legal/` |
| `legal/privacy.html` (Lucien) | LucienSael | `legal/` |
| `vercel.json` | LucienSael | raíz |
| `BP_Brand_Person_id.md` | Context repo | `brands/Lucien/` |

### PENDIENTE ACCIONES

- DNS: Cloudflare `unrealvillestudio.com` → CNAME `www` → `cname.vercel-dns.com`, proxy OFF
- DNS: Cloudflare `luciensael.com` → A record → `76.76.21.21`, añadir dominio en Vercel nuevo proyecto
- TikTok: Completar LoginKit + video demo para activar Content Posting API
- LinkedIn + X: Crear cuentas UNRLVL y Lucien
- OAuth: /oauth page Orchestrator + EF oauth-exchange + EF social-publisher
- MJ: Abrir cuenta Basic, generar master shot Lucien (prompt en BP_Brand_Person_id sección 07)
- ElevenLabs: Voice design Lucien (params en BP_Brand_Person_id sección 05)

---

## SESIÓN 2026-04-26 — IID PIPELINE OPERACIONAL

- ✅ Bug `dispatcher → stage runner` resuelto (EdgeRuntime.waitUntil → arquitectura síncrona)
- ✅ Pipeline end-to-end confirmado: copylab:ok + aife:ok + imagelab:skip + sociallab:ok (~71s)
- ✅ Primer email de aprobación confirmado — piece `e75bdb73`
- ✅ `content-run-stage v1.10` con direct EF calls + auto cost logging
- ✅ OPS cost tracking: ops_generation_ledger + ops_lab_rates + 8 KPI views
- ✅ AI Labs Strategy definida: fal.ai como media bus, 8 labs, 5 fases
- ✅ GitHub Auditor fixed v2026-04-25
- ✅ OR_1.1 Orchestrator LIVE — 4 tabs, approve-job + trigger-job

---
