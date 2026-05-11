# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-11_

---

## SESIÓN 2026-05-11 — Blog Hair Intelligence + Content Pipeline v2.1 + Brand Cache (Sam)

### COMPLETADO

**UNRLVL Signature ✅**
- `snippets/unrlvl-signature.liquid` B2C + B2B
- `sections/nc-footer.liquid` actualizado en ambas tiendas
- Supabase `brands`: columnas `unrlvl_signature_enabled` + `unrlvl_signature_position`

**Blog "Hair Intelligence" — LIVE ✅**
- Blog ID `126248255815`, handle `hair-intelligence-1`
- 4 artículos ES publicados + traducciones EN registradas

| Art | Pilar | ID | Handle ES | Handle EN |
|---|---|---|---|---|
| 01 | Color Intelligence | 613706334535 | color-capilar-se-va-rapido-miami | why-hair-color-fades-faster-miami |
| 02 | Hair Science | 613706662215 | cabello-seco-acondicionador-reconstruccion | conditioner-dry-hair-reconstruction |
| 03 | Miami Hair | 613706694983 | sal-cloro-sol-cabello-miami | salt-chlorine-sun-miami-hair-protocol |
| 04 | Rituals | 613706727751 | rutina-capilar-sur-florida-protocolo | hair-ritual-south-florida |

**Blog templates + nav + pillar cards + suggest blocks ✅**
- `sections/nc-blog-index.liquid` — pillar cards bilingüe, 5 cards, colores por pilar
- `templates/blog.json` + `templates/article.liquid` — bilingual completo
- `sections/nc-header.liquid` — Hair Intelligence en nav con separador editorial
- Patricia suggest blocks 4/4 ES+EN (Art01→03, 02→04, 03→01, 04→02)
- ImageLab presets NSCF-BLOG × 4 en Supabase

**Content Pipeline Skill v2.1 ✅**
- Consolida y reemplaza `CONTENT_PIPELINE_SKILLS.md` v1.1 + `aife/SKILL.md` v1.1
- `skills/content-pipeline/SKILL.md` — 8 layers operativos
- `skills/INDEX.md` v1.1 — aife deprecado, content-pipeline cubre todo texto público
- L4 PSYCHO: 4 campos injection documentados (copy/visual/video/voice)
- `pipeline_skills` Supabase: 8 rows v2.0
- `lab_configs` Supabase: AUDIENCE_BRIEF stage 0 añadido

**Brand Cache Endpoint ✅ LIVE**
- URL: `https://unrlvl-context.vercel.app/api/brand-cache?brand_id=NeuroneSCF`
- 8 tablas: brand_personas · brand_copy_profiles · humanize_profiles · compliance_rules · brand_goals · geomix · psycho_presets · channel_prompt_rules
- `?refresh=true` bypass CDN · `?debug=true` errores raw
- Grants anon SELECT añadidos en 5 tablas

**RLS — 4 tablas cerradas ✅**
- `pipeline_skills`: anon SELECT · service_role ALL
- `pipeline_results`: authenticated SELECT · service_role ALL
- `ops_lab_rates`: authenticated SELECT · service_role ALL
- `shopify_enrich_jobs`: service_role ALL

---

## PENDIENTE — PRÓXIMA SESIÓN

### 🔴 PRIORIDAD 0 — Reescritura 4 artículos con L0+L3

**Fórmula:** DOLOR RECONOCIBLE → MECANISMO (una línea) → BENEFICIO SENTIDO

**Persona:** `b2c_latina_color` — Mujer Latina Cabello Teñido, 30-45, Miami
- Pain points: "Cabello teñido que se destiñe rápido" · "Frizz clima Miami" · "Productos que prometen y no cumplen"
- Objeciones CRO: precio > supermercado · no conoce la marca · desconfía e-commerce
- Tono: Cercano, técnico-accesible, Spanglish natural
- Test: ¿sonaría en la silla del salón entre Patricia y una clienta de 35 años?

**Por artículo:**

| Art | Dolor a anclar (primeros 100 palabras) | Foco del cambio |
|---|---|---|
| 01 Color Intelligence | "¿Tu color se ve vivo el lunes y opaco el jueves?" | Primer párrafo técnico → ancla emocional del jueves |
| 02 Hair Science | "Cabello seco que no mejora con el acondicionador" | Reconstructor vs acondicionador → frustración concreta |
| 03 Miami Hair | "Tres días después de nadar, sin brillo sin razón" | Sal/cloro/UV → cada mecanismo a un momento vivido |
| 04 Rituals | "La última vez que tu cabello se sostuvo vibrante toda la semana" | Protocolo → antes/después como experiencia sentida |

**Formato de ejecución:** REST PUT ES · translationsRegister EN · QA checklist v2.0

---

### 🔴 PRIORIDAD 1 — Tracking pixels (0/10)
Meta Pixel + TikTok Pixel + Google Analytics — requiere Sam en Shopify Admin

### 🔴 PRIORIDAD 2 — CRO Checkout
Bundle configurar + apps CRO

### 🟠 PRIORIDAD 3 — Re-audit (~160+/200 esperado)
### 🟠 PRIORIDAD 4 — DY Fazza imagen (NSCF-TR-013 + NSCF-BTP-003)
### 🟠 PRIORIDAD 5 — shopify-auto-translate EF bug (42 EN descriptions)
### 🟠 Infra — Brand cache otras marcas del ecosistema

---

## APRENDIZAJES PERMANENTES

1. **locale_root:** `append | replace` único método fiable. `if blank` falla.
2. **Policies API:** `write_legal_policies` scope → OAuth reinstal. `shopPoliciesUpdate` GraphQL.
3. **shopify-auto-translate:** Proxy ✅ deployed. EF bug token lookup pendiente fix Supabase.
4. **Kit images:** Remove.bg + Affinity. Drop Shadow = Layer > Layer Effects > Outer Shadow.
5. **CRO inventory_policy:** `deny` o `continue` (no `ALLOW`).
6. **SOS variant title:** siempre 1×.
7. **Terra precio kits:** `#D4622A` en `nc-product-detail` y `nc-product-card`.
8. **DY Fazza imagen:** `NLSDYLS-1-1.webp` es Dyfensor SF.
9. **Page corrections Unicode:** U+2019, U+201C. EF `nscf-about-fix` como patrón.
10. **Patricia Osorio:** colorimetría. Nunca química. Nunca Venezuela. Cali, Colombia. +35 años.
11. **SP pool architecture:** pool JS global en `assets/`. Previene patrones percibibles.
12. **Product descriptions:** body_html siempre en locale default (ES).
13. **Addresses:** Prestige/legal = 12951 Biscayne · 3PL/ops = 3028 NW 72nd Ave #4.
14. **UNRLVL Signature:** snippet Liquid. BP_BRAND v1.2 fuente de verdad.
15. **Blog bilingual:** patrón `is_en` con `request.locale.iso_code == 'en'` para texto hardcodeado.
16. **translationsRegister digest:** re-fetch obligatorio si ES canonical fue modificado.
17. **Pillar cards:** recuadros > pestañas para blog navigation.
18. **reconstructor ≠ acondicionador:** crítico para contenido NSCF. Nano Tribología = fibra level.
19. **Content pipeline L0:** brand_personas tiene `objections` — crítico para CRO. Incluir siempre.
20. **Supabase anon key:** requiere RLS policy + GRANT SELECT. Policy sin grant = 42501 silencioso.
21. **PostgREST boolean:** `active=is.true` no `active=eq.true`.
22. **Brand cache:** tablas estables → Vercel TTL. Operacionales → Supabase directo.
23. **psycho_presets:** 4 campos — injection_copy/visual/video/voice. Cada lab consume el suyo.

---

## REFERENCIA TÉCNICA

**Brand Cache:** `https://unrlvl-context.vercel.app/api/brand-cache?brand_id=NeuroneSCF`

**IDs B2C:** Theme `192983662919` · Blog `126248255815` · Arts `613706334535/662215/694983/727751`

**Addresses:** Legal `12951 Biscayne Blvd North Miami FL 33181` · 3PL `3028 NW 72nd Ave #4 Miami FL 33122`

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C ✅ · Audit v16.1 · Compliance ✅ · SP Pool 80 cards ✅ · Kit Naming ✅ · Kit Images 12/12 ✅ · CRO Layer ✅ · Collections 7/7 · About ES+EN ✅ · Policies 4/4 ✅ · Payments ✅ · 42/42 desc ES ✅ · Language switcher ✅ · Contact page ✅ · UNRLVL Signature B2C+B2B ✅ · Blog Hair Intelligence LIVE ✅ · 4 artículos ES+EN ✅ · Blog templates ✅ · Pillar cards bilingual ✅ · Patricia suggest blocks 4/4 ✅ · ImageLab presets 4/4 ✅ · **Content Pipeline Skill v2.1 ✅** · **Brand Cache LIVE ✅** · **pipeline_skills v2.0 ✅** · **RLS 4 tablas ✅**

---
_Próxima sesión: Reescritura 4 artículos (brief arriba) → Pixels → CRO Checkout_
