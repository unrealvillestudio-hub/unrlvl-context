# AGENDA — Unrealville Studio
_Actualizada: 2026-05-25 · v15 · Generada desde ecosystem.json v17_

---

## 🔴 URGENTE — Esta semana

| # | Item | Marca | Blocker |
|---|---|---|---|
| 1 | **AYRA Sprint 0** — crear repo + Vercel + schema + env vars | UNRLVL | Deadline 5 Jun |
| 2 | **Meta MCP** — `SUPABASE_SERVICE_ROLE_KEY` en Vercel env → fix `list_brands` | UNRLVL | list_brands falla |
| 3 | **Meta MCP** — confirmar parámetro `brandId` via inputSchema en audit page | UNRLVL | todos los tools fallan |
| 4 | **Meta MCP** — insertar NSCF en `meta_accounts` (page_id + ig_user_id + ad_account_id + token) | NeuroneSCF | sin acceso Meta desde MCP |
| 5 | **TikTok Pixel NSCF** — eliminar duplicado D832THJC77UATASL0OO0 | NeuroneSCF | bloquea ads TikTok |
| 6 | **PROFESSOR árbol** — PROFESSOR_CORE + nodos (parte de Sprint 0) | UNRLVL | Ayra sin cerebro |

---

## 🟡 Esta quincena

| # | Item | Marca |
|---|---|---|
| 7 | GTM + GA4 verificar via Preview + DebugView | NeuroneSCF |
| 8 | compatibility_rules product_description_b2c → creative_seed + voice_genome en kits | NeuroneSCF |
| 9 | Klaviyo flows — configurar 4 flows bilingüe en UI | NeuroneSCF |
| 10 | lab_jobs migration — renombrar copylab_jobs → lab_jobs + campo lab_id | UNRLVL |
| 11 | PO Agent — prioridad alta, sin él no se pueden hacer promesas de respuesta en email flows | NeuroneSCF |
| 12 | Restore Therapy Plus v4 → aplicar a Shopify + escalar a 11 kits restantes | NeuroneSCF |

---

## 🔵 Próximas semanas

| # | Item | Marca |
|---|---|---|
| 13 | Legal — Stripe Atlas LLC Delaware ($500) | UNRLVL |
| 14 | Voice Genome — capturar 3-5 audios PO adicionales → v1.0 mature | NeuroneSCF |
| 15 | ForumPHs — propuesta Star & Herald (aprobación IF pendiente) | ForumPHs |
| 16 | ForumPHs — datos Ene-Abr IF (bloquea BI + Tracker) | ForumPHs |
| 17 | ForumPHs Speaks — `ANTHROPIC_API_KEY` pendiente configurar | ForumPHs |
| 18 | ForumPHs OPS — 3 routes sin commit (bloquea Home) | ForumPHs |
| 19 | luciensael.com — DNS apuntar al deploy existente (10 min) | Lucien Sael |
| 20 | ImageLab fix — VercelRequest/VercelResponse + maxDuration (receta en ASYNC_LAB_PIPELINE) | UNRLVL |
| 21 | connectivity-test EF — eliminar (era solo diagnóstico) | UNRLVL |
| 22 | Professor — revisar learnings pendientes (0 pending tras sesión hoy) | UNRLVL |

---

## ✅ Completado recientemente

- Meta MCP CORS fix — `middleware.ts` deployado ✅ 2026-05-25
- Meta MCP audit page — `app/page.tsx` same-origin ✅ 2026-05-25
- Professor learnings — 13 aprobados + 4 nuevos de hoy ✅ 2026-05-25
- CopyLab async pipeline OPERACIONAL ✅ 2026-05-21
- Brand cache NeuroneSCF v2.0 ✅ 2026-05-21
- Professor proxy LIVE ✅ 2026-05-20
- NSCF Blog LIVE 4 artículos ES+EN ✅
- NSCF Meta Pixel + Klaviyo + Judge.me ✅

---

## Notas de contexto

**Meta MCP (INFRA-META-MCP):** Servidor LIVE, 23 tools operativos. Tres blockers pendientes: (1) SERVICE_ROLE_KEY para list_brands, (2) parámetro brandId por confirmar, (3) NSCF no está en meta_accounts. En el próximo chat el MCP estará cargado en tools list — la prueba irá centrada en el MCP directamente.

**Ayra Sprint 0:** El flujo async Claude→copylab_jobs→pg_cron→copylab-processor→CopyLab está arquitectónicamente completo y validado en producción. Sprint 0 debe incluir: PROFESSOR árbol navegable + migración copylab_jobs→lab_jobs.

**NSCF TikTok:** Pixel ID activo: D866BMBC77UBK82UUH50. Eliminar: D832THJC77UATASL0OO0. Resolver ANTES de cualquier campaña TikTok.
