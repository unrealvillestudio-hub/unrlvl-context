# Session Log — Unrealville Studio
_Marca interna · Sam (owner) · Actualizado: 2026-04-14_

---

## 2026-04-14 — Sesión de arquitectura de negocio y web

### Resuelto esta sesión

**Brand context creado:**
- `brand.json` — identidad completa, colores, tipografía, logotipo, footer, assets, output standards
- `BP_Brand_Context.md` — ADN narrativo completo con checklist HTML, reglas absolutas del chevron, LoRA assets
- Fuente: `BluePrints/brands/Unrealville/` — BP_BRAND_UNRLVL_v1.2.json + brand.json
- Nota de nomenclatura: carpeta en BluePrints = `Unrealville` / carpeta en context system = `UnrealvilleStudio`

**GitHub proxy skill documentado:**
- `skills/github-auditor/SKILL.md` — documenta el proxy `/api/gh` en unrlvl-context
- Proxy activo y verificado: 21 repos accesibles, BluePrints árbol completo leído
- PAT vive en Vercel env var `GH_PAT` — nunca en el chat

**SESSION_PROTOCOL.md actualizado a v8:**
- Skill GitHub añadido al protocolo de carga
- UnrealvilleStudio brand context añadido a tabla de referencias
- `/api/gh` documentado como endpoint de lectura de repos

**Pricing architecture completada:**
- Tiers: SIGNAL ($3,500/mo) / PULSE ($6,500/mo) / ORBIT ($12,000/mo)
- E-Commerce add-on: Signal +$2,000 / Pulse +$3,500 / Orbit +$4,500 por marca
- Setup fee = 1 mes de retainer por módulo activo
- Revenue sharing 10% sobre ventas atribuibles desde mes 13
- Documentos generados: `UNRLVL_PriceList_v1.2.html` + `UNRLVL_Pricing_Costs_v1.0.html`
- Amber (`#FFB020`) añadido al brand palette para distinciones de pricing

**Color amber propuesto para BP_BRAND_UNRLVL:**
```json
"amber": {
  "hex": "#FFB020",
  "role": "Secondary accent — setup fees, pricing distinctions. Never primary. Max 10% visual weight.",
  "variants": { "amber_20": "rgba(255,176,32,0.20)", "amber_08": "rgba(255,176,32,0.08)" }
}
```

### Pendiente de esta sesión (continuación inmediata)

- **Psycho Layer section** — sección web `unrealvillestudio.com` con demo interactivo (7 estímulos, mismo producto transformándose en tiempo real)
- **Profiler Agent** — reemplaza formulario estático `#select` en `index.html`. Conversación en inglés/español, 5 etapas, scoring interno, brief para Sam, datos a Supabase
- **Push a CoreProject** — una vez construidos ambos, push directo vía bash

### Web pendientes (unrealvillestudio.com)

- [x] Site LIVE — 2026-04-10
- [ ] Cloudflare setup
- [ ] Redirect rules
- [ ] Aliases email (desde Cloudflare)
- [ ] Formulario contacto → **Profiler Agent** (en construcción)
- [ ] Sección **Psycho Layer** (en construcción)

### Decisiones de negocio tomadas hoy

- Mercado: USA + LATAM únicamente. España/Europa fuera del mapa por ahora.
- Tiers nombrados Signal / Pulse / Orbit — no categorías jerárquicas
- Blueprint (no Brand DNA) como término oficial
- Revenue share desde mes 13 — los 12 primeros meses son de prueba y construcción de dependencia
- E-Commerce no se vende sin Media & Brand
- Ad spend siempre en cuentas del cliente — UNRLVL gestiona, nunca financia
- Sin proyectos puntuales sin retainer
- Aprobaciones vía sistema estructurado — cambios fuera de proceso: $150/hr
- "Account Manager" en materiales externos — no mencionar a Sam por nombre
