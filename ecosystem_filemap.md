# UNRLVL ECOSYSTEM — Filemap & Dependencias
_Generado desde ecosystem.json · 2026-04-14 · Claude Sonnet 4.6_

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

forumphs-speaks.vercel.app
  └─→ Supabase: fphs-session v6 + fphs-chat v5
        └─→ Anthropic API (Claude Sonnet 4)

unrlvl-social-media-agent.vercel.app
  └─→ Anthropic API + @vercel/kv (90 días)
  └─→ [GAP] no lee session_log desde Context System

orchestrator.vercel.app
  └─→ /api/execute → CopyLab / WebLab / ImageLab / SocialLab
```

---

## FLUJOS ROTOS / BLOQUEADOS

```
VideoLab → /api/execute → HeyGen API ← KEY PENDIENTE
VoiceLab → ElevenLabs → voice_ids ← PENDIENTE
SocialLab → Meta/TikTok OAuth ← PENDIENTE
NeuroneSCF → Meta BM ← info empresa incompleta (Laura/PO)
unrealvillestudio.com → formulario contacto ← backend sin conectar
speaks.forumphs.com ← CNAME Cloudflare pendiente
```

---

## ESTRUCTURA DE REPOS

```
unrealvillestudio-hub/
  ├── unrlvl-context/          ← Source of truth ecosystem
  │   ├── ecosystem.json
  │   ├── ecosystem.md
  │   ├── ecosystem_filemap.md
  │   ├── brands/
  │   │   └── NeuroneSCF/session_log.md
  │   ├── protocols/SESSION_PROTOCOL.md
  │   └── agents/social-media-agent/session_log.md
  ├── forumphs-document-factory/  ← CERRADO v1.4
  ├── forumphs-speaks/
  ├── BluePrints/
  │   └── brands/[Brand]/assets/
  ├── CopyLab / WebLab / ImageLab / SocialLab
  ├── AgentLab / BlueprintLab / OnboardingApp
  ├── Orchestrator / VideoLab / VoiceLab
  ├── CoreProject (unrealvillestudio.com)
  └── Tools (private)
```

---

## ROADMAP PRIORIZADO

| # | Tarea | Tipo | Esfuerzo |
|---|---|---|---|
| 1 | speaks.forumphs.com CNAME | DNS | 5 min |
| 2 | Foto Ivette en Speaks | Asset | 15 min |
| 3 | Meta BM info empresa (Laura/PO Miami) | Cliente | — |
| 4 | unrealvillestudio.com contacto + redirects | Dev | 1 sprint |
| 5 | BP_COPY_1.0 NeuroneSCF + ForumPHs + UNRLVL | Datos | 1 sprint |
| 6 | Onboarding ForumPHs, VivoseMask, PO x3 | Datos | 1 sprint |
| 7 | WebLab: Objectives Window + plantillas | Dev | 1 sprint |
| 8 | ElevenLabs + HeyGen + Kling cuentas | Cuentas | — |
| 9 | VideoLab API keys → activar | Dev | rápido |
| 10 | Meta/TikTok OAuth → SocialLab real | Dev | 1 sprint |
