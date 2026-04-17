# UNRLVL Ecosystem
_Generado desde ecosystem.json · 2026-04-17b · No editar directamente_

---

## Studio

**Unrealville Studio** · Owner: Sam · "Not for everyone."
- Vercel org: `unrealvillestudio-projects` · GitHub: `unrealvillestudio-hub`
- HQ: 12951 Biscayne Blvd · North Miami, FL 33181
- Web: unrealvillestudio.com — **LIVE 2026-04-10** · Plan: Pro

---

## Costos Operativos · $457–507/mes

| Categoría | Total |
|---|---|
| AI Production | $398–452 |
| Infraestructura | $20 |
| E-commerce | $39 |

**AI:** Claude Pro Max x5 (~$115) · Anthropic API ($40-60) · HeyGen (~$166) · Kling ($20-25) · Fal.ai ($15-20) · ElevenLabs ($22) · Gemini ($15-20) · Chatterbox ($5-10)

---

## Marcas Activas

| Marca | Mercado | Salud | Notas |
|---|---|---|---|
| Diamond Details | Alicante, ES | 🟢 | |
| Vizos Cosmetics | Miami + ES | 🟢 | |
| D7 Herbal | Alicante, ES | 🟢 | |
| Vivose Mask | España | 🟡 | |
| Patricia Osorio · Personal | Miami, FL | 🟢 | Copy DONE |
| Patricia Osorio · Comunidad | Miami, FL | 🟢 | Copy DONE |
| Patricia Osorio · Vizos Salon | Miami, FL | 🟢 | Copy DONE |
| Neurone SCF | South & Central FL | 🟡 | Meta BM ✅ · FB Page ✅ · Instagram pendiente |
| ForumPHs | Panamá | 🟢 | Document Factory v1.5 READY |
| Unrealville Studio | FL + LATAM + ES | 🟢 | BP_BRAND v1.2 COMPLETO |
| Unrealville Stores | Florida USA | 🟢 | |

---

## Labs

| ID | Nombre | URL | Estado |
|---|---|---|---|
| LAB-CPL | CopyLab | unrlvl-copy-lab.vercel.app | ✅ PASSED v8.0 |
| LAB-WL | WebLab | web-lab.vercel.app | ✅ PASSED |
| LAB-IL | ImageLab | image-lab-unrlvl.vercel.app | ✅ PASSED ICR v1.0 |
| LAB-AL | AgentLab | agent-lab-unrlvl.vercel.app | ✅ PASSED |
| LAB-BPL | BlueprintLab | unrlvl-blueprint-lab.vercel.app | ✅ PASSED |
| LAB-ORCH | Orchestrator | orchestrator.vercel.app | ✅ 4 labs activos |
| LAB-SL | SocialLab | social-lab-flame.vercel.app | ✅ CopyLabBridge DONE |
| LAB-VL | VideoLab | unrlvl-video-lab.vercel.app | ⚠ UI PASSED · generación bloqueada |
| LAB-VOL | VoiceLab | unrlvl-voice-lab.vercel.app | ⚠ UI PASSED · bloqueado voice_ids |
| LAB-OPS | UNRLVL-OPS | — | ✅ producción |
| LAB-OBD | Onboarding App | unrlvl-onboarding-app.vercel.app | ✅ Phase 4 · 8 tablas |

---

## Agent Deployments

### Social Media Agent
- URL: `unrlvl-social-media-agent.vercel.app`
- Marca: NeuroneSCF · Operador: Laura Rodriguez
- Engine: Claude Sonnet 4 + @vercel/kv 90 días
- Estado: **ACTIVO** · FB Page ✅ · Instagram pendiente · TikTok pendiente
- ⚠ Gap: no accede a session_log del context system

### ForumPHs Speaks
- URL: `forumphs-speaks.vercel.app` · Custom domain: `speaks.forumphs.com`
- Engine: Claude Sonnet 4 via Supabase Edge Functions
- Estado: **PRODUCCIÓN LIVE**
- Pendiente: foto Ivette

### ForumPHs Document Factory
- URL: `forumphs-document-factory.vercel.app`
- Repo: `unrealvillestudio-hub/forumphs-document-factory`
- Engine: Claude Sonnet 4.6 via Supabase Edge Functions + Next.js 14
- Estado: **PRODUCCIÓN — v1.5 READY FOR BUSINESS**
- Pipeline: ZIP (extracción local) → Confirmación stats → Pre-flight → Paso 0.5 → Generar → QA → ICR (Anexo) → Descarga
- Edge Functions: `fphs-formalize` v9 · `fphs-icr-apply` v1
- Sprints cerrados: FPH-013 · FPH-014 · FPH-015 · FPH-016
- Pendiente: ImageRun type fix (1 línea)

---

## Infraestructura

| ID | Nombre | URL / ID | Estado |
|---|---|---|---|
| INFRA-CTX | Context System | unrlvl-context.vercel.app | ✅ active |
| INFRA-SB | Supabase DB | amlvyycfepwhiindxgzw | ✅ MCP connected · 37 tablas |
| INFRA-WEB | unrealvillestudio.com | unrealvillestudio.com | ✅ LIVE |
| INFRA-TOOLS | Tools + GitHub Auditor | unrlvl-tools.vercel.app | ✅ /api/gh operativo |

**GitHub Auditor Proxy:**
- Endpoint: `https://unrlvl-tools.vercel.app/api/gh`
- Tool: `Vercel:web_fetch_vercel_url` — NUNCA `web_fetch`
- Tree: `?repo=REPO&action=tree&branch=main`
- File: `?path=/repos/unrealvillestudio-hub/REPO/git/blobs/SHA`
- Env: `GH_PAT` en Vercel proyecto tools

---

## Próxima Sesión

1. ForumPHs: ImageRun type fix (1 línea) — `type:'png'/'jpg'` en generate/route.ts ~488
2. ForumPHs: foto Ivette para Speaks
3. NeuroneSCF: Instagram Business — celular Patricia Miami
4. NeuroneSCF: TikTok for Business
5. NeuroneSCF: WhatsApp Business API
6. NeuroneSCF: verificación dominio (hosting)
7. SMA: URL session_log en system prompt
8. unrealvillestudio.com: redirect rules + formulario backend
9. WebLab: Objectives Window + plantillas institucionales
10. DATOS: BP_COPY_1.0 NeuroneSCF + ForumPHs + UnrealvilleStudio
