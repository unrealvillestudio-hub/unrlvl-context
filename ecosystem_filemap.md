# UNRLVL ECOSYSTEM — Filemap & Dependencias
_Generado desde ecosystem.json · 2026-04-14d · Claude Sonnet 4.6_

---

## FLUJOS ACTIVOS

```
ZIP (local extractor)
  └─→ forumphs-document-factory.vercel.app → Supabase → ICR → descarga

forumphs-speaks.vercel.app / speaks.forumphs.com
  └─→ Supabase: fphs-session v6 + fphs-chat v5 → Anthropic API

unrlvl-social-media-agent.vercel.app
  └─→ Anthropic API + @vercel/kv
  └─→ [GAP] no lee session_log desde Context System

orchestrator.vercel.app
  └─→ CopyLab / WebLab / ImageLab / SocialLab

unrealvillestudio.com (#select)
  └─→ Profiler Agent (Supabase Edge Function unrlvl-profiler v3)
        ├─→ Anthropic API (conversación + brief)
        ├─→ Resend → leads@unrealvillestudio.com (brief completo)
        └─→ profiler_sessions → trigger → crm_contacts (auto-sync)

Claude (chat) → unrlvl-context.vercel.app/api/gh
  └─→ GitHub API → unrealvillestudio-hub repos (GH_PAT en Vercel env)
```

---

## FLUJOS ROTOS / BLOQUEADOS

```
VideoLab → HeyGen API ← KEY PENDIENTE
VoiceLab → ElevenLabs → voice_ids ← PENDIENTE
SocialLab → Meta/TikTok OAuth ← PENDIENTE
NeuroneSCF → Meta BM ← info empresa incompleta
unrealvillestudio.com → index.html nuevo ← PENDIENTE PUSH (PAT)
unrealvillestudio.com → /es ← PENDIENTE CONSTRUIR
UNRLVL CRM → dashboard ← PENDIENTE CONSTRUIR
```

---

## ESTRUCTURA DE REPOS

```
unrealvillestudio-hub/
  ├── unrlvl-context/
  │   ├── ecosystem.json / ecosystem.md / ecosystem_filemap.md
  │   ├── api/gh.js               ← GitHub Proxy
  │   ├── brands/
  │   │   ├── UnrealvilleStudio/  ← brand.json + BP_Brand_Context.md + session_log.md
  │   │   ├── NeuroneSCF/         ← session_log.md
  │   │   ├── ForumPHs/           ← session_log.md
  │   │   └── VizosCosmetics/
  │   ├── skills/github-auditor/  ← SKILL.md
  │   ├── agents/social-media-agent/ ← session_log.md
  │   └── protocols/SESSION_PROTOCOL.md (v8)
  ├── BluePrints/
  │   └── brands/Unrealville/     ← BP_BRAND_UNRLVL_v1.2.json (amber pendiente)
  ├── CoreProject/                ← unrealvillestudio.com
  │   └── index.html              ← NUEVA VERSION pendiente push
  ├── forumphs-document-factory/  ← CERRADO v1.4
  ├── forumphs-speaks/
  └── [Labs] CopyLab/WebLab/ImageLab/SocialLab/AgentLab/...
```

---

## SUPABASE — TABLAS NUEVAS (2026-04-14)

```
profiler_sessions          ← conversaciones del Profiler Agent
crm_contacts               ← pipeline de clientes UNRLVL
crm_activities             ← actividades e interacciones
crm_stage_history          ← historial de cambios de etapa
trigger: sync_profiler_to_crm ← auto-sync cuando profiler captura email
```

---

## ROADMAP PRIORIZADO

| # | Tarea | Tipo | Esfuerzo |
|---|---|---|---|
| 1 | Push index.html a CoreProject | DevOps | 5 min (PAT) |
| 2 | Versión /es del sitio | Dev | 1 sprint |
| 3 | UNRLVL CRM dashboard | Dev | 1 sprint |
| 4 | Cloudflare redirect rules | DNS | 15 min |
| 5 | SMA: inyectar URL session_log | Dev | 15 min |
| 6 | Flujo email prospecto calificado | Dev | 1 sprint |
| 7 | Meta BM info empresa (NeuroneSCF) | Cliente | — |
| 8 | 87 SKUs + precios Shopify | Datos | 1 sprint |
| 9 | BP_BRAND_UNRLVL: amber palette | Data | 10 min |
| 10 | BP_COPY_1.0 x3 marcas | Datos | 1 sprint |
| 11 | VideoLab API keys | Dev | rápido |
| 12 | OAuth Meta/TikTok → SocialLab | Dev | 1 sprint |
| 13 | Psycho Layer: CopyLab + SocialLab + VideoLab + VoiceLab | Dev | 2 sprints |
