# UNRLVL ECOSYSTEM — Filemap & Dependencias
_Generado desde ecosystem.json · 2026-04-14c · Claude Sonnet 4.6_

---

## FLUJOS ACTIVOS

```
ZIP (local extractor)
  └─→ forumphs-document-factory.vercel.app
        ├─→ /api/parse
        ├─→ Supabase: fphs-formalize v7 (17 agentes × grupos 6)
        ├─→ /api/generate (docx + icr_findings opcional)
        ├─→ /api/qa
        ├─→ /api/icr (maxDuration 120s)
        ├─→ /api/icr-apply → Supabase: fphs-icr-apply v1
        └─→ Descarga limpia + Descarga con anotaciones ICR

forumphs-speaks.vercel.app / speaks.forumphs.com
  └─→ Supabase: fphs-session v6 + fphs-chat v5
        └─→ Anthropic API (Claude Sonnet 4)

unrlvl-social-media-agent.vercel.app
  └─→ Anthropic API + @vercel/kv (90 días)
  └─→ [GAP] no lee session_log desde Context System

orchestrator.vercel.app
  └─→ /api/execute → CopyLab / WebLab / ImageLab / SocialLab

Claude (chat)
  └─→ unrlvl-context.vercel.app/api/gh (GitHub Proxy)
        └─→ GitHub API → unrealvillestudio-hub repos privados
              └─→ PAT: GH_PAT en Vercel env vars
```

---

## FLUJOS ROTOS / BLOQUEADOS

```
VideoLab → /api/execute → HeyGen API ← KEY PENDIENTE
VoiceLab → ElevenLabs → voice_ids ← PENDIENTE
SocialLab → Meta/TikTok OAuth ← PENDIENTE
NeuroneSCF → Meta BM ← info empresa incompleta (Laura/PO)
unrealvillestudio.com → #select ← formulario estático (Profiler Agent DISEÑADO, pendiente)
unrealvillestudio.com → Psycho Layer section ← DISEÑADA, pendiente implementar
unrealvillestudio.com → Cloudflare ← no configurado
```

---

## ESTRUCTURA DE REPOS

```
unrealvillestudio-hub/
  ├── unrlvl-context/              ← Source of truth ecosistema
  │   ├── ecosystem.json
  │   ├── ecosystem.md
  │   ├── ecosystem_filemap.md
  │   ├── api/
  │   │   └── gh.js               ← GitHub Proxy (PAT en Vercel env)
  │   ├── brands/
  │   │   ├── UnrealvilleStudio/  ← NUEVO 2026-04-14
  │   │   │   ├── brand.json
  │   │   │   ├── BP_Brand_Context.md
  │   │   │   └── session_log.md
  │   │   ├── NeuroneSCF/
  │   │   │   └── session_log.md
  │   │   ├── ForumPHs/
  │   │   │   └── session_log.md
  │   │   └── VizosCosmetics/
  │   ├── skills/
  │   │   └── github-auditor/     ← NUEVO 2026-04-14
  │   │       └── SKILL.md
  │   ├── agents/
  │   │   └── social-media-agent/
  │   │       └── session_log.md
  │   └── protocols/
  │       └── SESSION_PROTOCOL.md (v8)
  ├── BluePrints/
  │   └── brands/
  │       ├── Unrealville/        ← BP_BRAND_UNRLVL_v1.2
  │       ├── NeuroneSCF/
  │       └── ForumPHs/
  ├── CoreProject/                ← unrealvillestudio.com
  │   └── index.html              ← Psycho Layer + Profiler Agent PENDIENTES
  ├── forumphs-document-factory/  ← CERRADO v1.4
  ├── forumphs-speaks/
  ├── CopyLab / WebLab / ImageLab / SocialLab
  ├── AgentLab / BlueprintLab / OnboardingApp
  ├── Orchestrator / VideoLab / VoiceLab
  └── Tools (private)
```

---

## ROADMAP PRIORIZADO

| # | Tarea | Tipo | Esfuerzo |
|---|---|---|---|
| 1 | Profiler Agent — implementar en web | Dev | 1 sprint |
| 2 | Psycho Layer section — implementar en web | Dev | 1 sprint |
| 3 | SMA: inyectar URL session_log en system prompt | Dev | 15 min |
| 4 | Cloudflare setup + redirects + email aliases | DNS/Config | 1h |
| 5 | Meta BM info empresa (Laura/PO Miami) | Cliente | — |
| 6 | NeuroneSCF precios reales + 87 SKUs | Datos | 1 sprint |
| 7 | BP_COPY_1.0 NeuroneSCF + ForumPHs + UNRLVL | Datos | 1 sprint |
| 8 | BP_BRAND_UNRLVL: añadir amber al palette | Data | 10 min |
| 9 | WebLab: Objectives Window + plantillas | Dev | 1 sprint |
| 10 | ElevenLabs + HeyGen + Kling cuentas | Cuentas | — |
| 11 | VideoLab API keys → activar | Dev | rápido |
| 12 | Meta/TikTok OAuth → SocialLab real | Dev | 1 sprint |
| 13 | Psycho Layer extensión: CopyLab + SocialLab + VideoLab + VoiceLab | Dev | 2 sprints |
