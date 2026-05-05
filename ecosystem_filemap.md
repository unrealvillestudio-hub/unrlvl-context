# UNRLVL Ecosystem — File Map
_Version: 2026-05-06-v1_

## Estructura del Repositorio unrlvl-context

```
/
├── ecosystem.json          ← Estado completo del ecosistema (fuente de verdad)
├── ecosystem.md            ← Resumen legible generado desde ecosystem.json
├── ecosystem_filemap.md    ← Este archivo
│
├── brands/
│   └── NeuroneSCF/
│       ├── brand.json              ← Brand context (keywords, buyer_type, market, etc.)
│       ├── BP_Brand_Context.md     ← Brand context legible
│       └── session_log.md          ← Log de sprints (más reciente al tope)
│
├── skills/
│   └── CONTENT_PIPELINE_SKILLS.md ← ICR pipeline: Write→H+AIFE→PSYCHO→CRO→QA
│
├── protocols/
│   └── SESSION_PROTOCOL.md         ← Protocolo de sesión completo
│
└── agents/
    └── social-media-agent/
        └── session_log.md          ← Log del agente social media
```

## Archivos por Sección

### Ecosistema (raíz)
| Archivo | Descripción | Última actualización |
|---|---|---|
| `ecosystem.json` | Estado completo: marcas, EFs, scores, tech debt, agenda | 2026-05-06-v1 |
| `ecosystem.md` | Resumen legible generado desde ecosystem.json | 2026-05-06-v1 |
| `ecosystem_filemap.md` | Este archivo | 2026-05-06-v1 |

### NeuroneSCF (brands/NeuroneSCF/)
| Archivo | Descripción | Estado |
|---|---|---|
| `brand.json` | Brand context: keywords, voice, market, buyer_type | ACTIVE |
| `BP_Brand_Context.md` | Brand context legible con guías de tono | ACTIVE |
| `session_log.md` | Sprint log con novedades al tope | 2026-05-06 |

### Skills (skills/)
| Archivo | Descripción | Estado |
|---|---|---|
| `CONTENT_PIPELINE_SKILLS.md` | Pipeline ICR: 5 layers + QA | ACTIVE |

### Agents (agents/social-media-agent/)
| Archivo | Descripción | Estado |
|---|---|---|
| `session_log.md` | Log de infraestructura Neurone SCF (Laura/PO/Sam) | Sin novedades 2026-05-06 |

---

## Infraestructura Supabase (amlvyycfepwhiindxgzw)

### Edge Functions clave
| EF slug | Versión | Propósito |
|---|---|---|
| `shopify-audit` | v16.1 (sb:30) | Auditor principal — 23 módulos, 200pts |
| `shopify-fix` | v15 (sb:15) | Fixer — post-write verification, sp_scan/sp_fix |
| `sp-fix-targeted` | v1 (sb:1) | Fix SP cards incorrectos (3 productos) ⚠️ proxy pendiente |
| `seo-audit-check` | v1 (sb:1) | GraphQL truth checker SEO |
| `sp-reader-full` | v2 (sb:2) | Lee todos los SP metafields |
| `shopify-audit-orchestrator` | v1 (sb:1) | Agent network parallel runner |
| `shopify-theme-analyzer` | v1 (sb:1) | Liquid static analysis |
| `shopify-link-crawler` | v1 (sb:1) | Sitemap + HEAD checks |

### Proxies Vercel (unrlvl-tools.vercel.app/api/)
| Proxy | EF destino | Notas |
|---|---|---|
| `api/fix-proxy.js` | shopify-fix | GET → shopify-fix EF. fix_type=sp_scan/sp_fix disponibles |
| `api/audit-proxy.js` | shopify-audit (v9-fresh) | ⚠️ versión diferente al HTML — inconsistencia |
| `api/pipeline-proxy.js` | shopify-content-pipeline | Fire-and-store |
| `api/sp-reader-proxy.js` | social-proof-reader | ⚠️ PENDIENTE DE PUSH |

---

## Reglas de Nomenclatura

**CRÍTICO:** Los outputs deben generarse con el nombre EXACTO del archivo en el repo.
Sin prefijos de marca. Sin variaciones. GitHub Desktop crea archivos nuevos si el nombre difiere.

✅ Correcto: `session_log.md`, `brand.json`, `ecosystem.json`  
❌ Incorrecto: `NeuroneSCF_session_log.md`, `brands_ecosystem.json`

**Rutas:**
- Archivos de marca → `brands/[Marca]/`
- Archivos de ecosistema → `/` (raíz)
- Agente → `agents/social-media-agent/`
- Protocolos → `protocols/`
- Skills → `skills/`
