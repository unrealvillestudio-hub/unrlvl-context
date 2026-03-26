# HANDOFF — Sesión 2026-03-26 (Fase 5 infra CopyLab ✅)
**Para:** Próximo chat  
**Estado:** Fase 5 infra CopyLab COMPLETA — capa de datos Supabase lista  
**Próximo paso:** Integrar fetchBrandContext en buildCopyPrompt / SMPC

---

## ESTADO COPYLAB — POST FASE 5

| Componente | Estado |
|---|---|
| Repo | `unrealvillestudio-hub/CopyLab` |
| Vercel | `prj_5FebBMfTpo4aP5I7iJ98libUkTTe` · `unrlvl-copy-lab.vercel.app` |
| Commit activo | `7bb1adf` — "Create queries.ts" |
| `src/lib/supabaseClient.ts` | ✅ fetch nativo, sin SDK |
| `src/lib/queries.ts` | ✅ 15 funciones + `fetchBrandContext()` entry point |
| `src/lib/db/types.ts` | ✅ tipos completos del schema real |
| Env vars Vercel | ✅ `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` |
| RLS Supabase | ✅ 14 tablas con policy `copylab_read` |
| Build | ✅ `✓ 2101 modules transformed` — sin errores TS |

**Decisión técnica clave:** se usó `fetch` nativo contra la REST API de Supabase (PostgREST) en lugar de `@supabase/supabase-js` — evita cambios en `package.json` y `package-lock.json`.

---

## ESTADO FINAL DE SUPABASE

| Tabla | Rows | RLS | Notas |
|---|---|---|---|
| `brands` | 10 | ✅ | Ecosistema completo |
| `humanize_profiles` | 12 | ✅ | 5 DEFAULT + 7 overrides |
| `compliance_rules` | 10 | ✅ | 3 globales + 7 por marca |
| `imagelab_presets` | 7 | ✅ | W0101, L0101/0201, M0101/0201, T0101/0201 |
| `canal_blocks` | 13 | ✅ | 13 canales |
| `output_templates` | 16 | ✅ | SMPC completo |
| `keywords` | 444 | ✅ | Todas las marcas |
| `ctas` | 47 | ✅ | Por marca × servicio |
| `geomix` | 12 | ✅ | DD×5 + D7H×7 |
| `videolab_params` | 6 | — | No en scope CopyLab |
| `voicelab_params` | 8 | ✅ | TBD_* — VoiceLab bloqueado |
| `person_blueprints` | 5 | ✅ | |
| `location_blueprints` | 7 | ✅ | |
| `product_blueprints` | 2 | — | |
| `blueprint_schemas` | 4 | ✅ | BP_PERSON/LOCATION/PRODUCT/COPY |
| `brand_palette` | 0 | ✅ | ⏳ Vacía — esperando hexes |
| `brand_typography` | 0 | ✅ | ⏳ Vacía — esperando fuentes |

---

## FASE 5B — LO QUE FALTA: INTEGRAR EN EL SMPC

La capa de infraestructura está lista. Ahora hay que conectarla al código que genera copy.

**Entry point disponible:**
```typescript
import { fetchBrandContext } from '@/lib/queries'
const ctx = await fetchBrandContext('DiamondDetails')
// ctx.brand, ctx.humanize, ctx.output_templates, ctx.canal_blocks,
// ctx.keywords, ctx.ctas, ctx.geomix, ctx.imagelab_presets,
// ctx.compliance, ctx.persons, ctx.locations, ctx.palette, ctx.typography
```

**Trabajo pendiente:**
1. Localizar `buildCopyPrompt` (o equivalente SMPC) en el repo CopyLab
2. Reemplazar las llamadas actuales a DB_VARIABLES por `fetchBrandContext`
3. Mapear `BrandContext` → parámetros del prompt:
   - `output_templates` → estructura del output según template elegido
   - `canal_blocks` → instrucciones por canal (Meta, IG, TikTok, etc.)
   - `humanize` → capa de autenticidad (DEFAULT + override de marca)
   - `compliance` → reglas hard/soft a inyectar en el prompt
   - `keywords` → pool de keywords a integrar
   - `ctas` → CTAs por servicio e idioma
   - `geomix` → contexto geográfico y cultural
4. Implementar `creativity_protection`: Angle Randomizer + temperature variable

---

## PENDIENTES QUE NECESITAN DATOS DE SAM

1. `brand_palette` — hexes reales por marca (NO inferir)
2. `brand_typography` — fuentes reales por marca
3. INCI VivoseMask — llega con ficha de Vizos
4. Voice IDs — ElevenLabs (VoiceLab 100% bloqueado)
5. GeoMix para VizosCosmetics, PatriciaOsorio*, NeuroneCosmetics, VivoseMask

---

## CÓMO ARRANCAR EL PRÓXIMO CHAT

> **"Ecosistema — cargar handoff de sesión. CopyLab Fase 5b: integrar fetchBrandContext en buildCopyPrompt."**

Cargar: `ecosystem.json` + `db/SESSION_HANDOFF.md`  
Luego explorar estructura del repo CopyLab para localizar el SMPC/buildCopyPrompt.

---

## ARCHIVOS CLAVE

```
https://unrlvl-context.vercel.app/ecosystem.json                    ← v2026-03-26b
https://unrlvl-context.vercel.app/db/UNRLVL_Supabase_Schema.md      ← v1.1 DDL 23 tablas
https://unrlvl-context.vercel.app/db/SESSION_HANDOFF.md             ← este archivo
https://unrlvl-context.vercel.app/brands/ForumPHs/brand.json
https://unrlvl-context.vercel.app/brands/NeuroneSCF/brand.json
```

---
*Claude — Unreal>ille Studio · 2026-03-26 · unrlvl-context/db/SESSION_HANDOFF.md*
