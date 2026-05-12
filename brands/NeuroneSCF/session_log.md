# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-12_

---

## SESIÓN 2026-05-12 — Artículos Blog v3 + Content Pipeline Skill v2.4 + Compliance Ecosystem (Sam)

### COMPLETADO

**4 Artículos Blog Hair Intelligence — ES v3 ✅**
- Reescritura completa incorporando feedback de Patricia + análisis ChatGPT
- Pipeline: Content Pipeline v2.4 · L0→L7 · Persona b2c_latina_color · QA PASS
- Output: `NeuroneSCF_Blog_HairIntelligence_ES_v3.docx`

| Art | Pilar | ID | Contraste climático v3 |
|---|---|---|---|
| 01 | Color Intelligence | 613706334535 | Denver (calor seco) + Seattle (lluvia sin calor) |
| 02 | Hair Science | 613706662215 | Atlanta + Charlotte (húmedos con invierno — el cabello tiene pausa) |
| 03 | Miami Hair | 613706694983 | Philadelphia + Minneapolis (pool estacional vs. todo el año) |
| 04 | Rituals | 613706727751 | Nashville (rutina estacional) + Phoenix (calor seco — vs. combo constante Florida) |

**Correcciones aplicadas en todos los artículos:**
- Geo: Florida (no solo South Florida / Miami)
- "Neurone nació para South Florida" → eliminado. Reemplazado por protocolo Patricia para condiciones de Florida
- Línea Neurone: múltiples tipos de cabello y entornos — versátil
- Perfil Patricia: Técnica Especializada en Colorimetría y Químicos · Sur/Centro/Norte América + Europa · habitat natural Florida
- Vizos Cosmetics – The Healing Systems · +10 años · Rituals & Kits como convergencia de bagaje + ciencia
- Compliance Scope Rule: hedging solo en claims de mecanismo; copy experiencial intacto
- Patricia quotes: "En mi experiencia..." en lugar de absolutos

**Pendiente aprobación Patricia → cuando apruebe: generar EN → REST PUT + translationsRegister**

---

**Content Pipeline Skill v2.4 ✅ — pushed**
- Compliance architecture: L1 pre-filtro (hard) + L5 shaping (soft) + L7 QA
- Compliance Scope Rule: mecanismo vs. experiencial
- City rotation rule: pool 25+ ciudades USA, nunca fijar trío por defecto
- BLOCK behavior: sin compliance_rules → preguntar antes de generar
- Tabla de cobertura ecosistema actualizada

---

**Compliance Ecosystem — Supabase ✅**

NeuroneSCF: Miami → Florida en hard y soft.

9 nuevas rows insertadas:

| Marca | Hard | Soft | Estado |
|---|---|---|---|
| UnrealvilleStores | ✅ US | ✅ US (bilingüe + FL) | ✅ Ready |
| PatriciaOsorioComunidad | ✅ FL_US | ✅ FL_US | ✅ Ready |
| PatriciaOsorioVizosSalon | ✅ FL_US | ✅ FL_US | ✅ Ready |
| PatriciaOsorioPersonal | ✅ FL_US (nueva) | ya existía | ✅ Ready |
| UnrealvilleStudio | ✅ global | ✅ global | ✅ Ready |

**ForumPHs:** no existe en Supabase (0 rows en todas las tablas). BLOCK total — setup completo requerido.

**Soft gap pendiente:** D7Herbal · DiamondDetails · VivoseMask · VizosCosmetics

---

_sma_etag: "W/\"ab5b-CUIgypqYf3FhHAqBmUwtIsTnvGQ\""_ — Sin novedades del SMA en esta sesión.

---

## PENDIENTE — PRÓXIMA SESIÓN

### 🔴 PRIORIDAD 0 — Aprobación artículos ES v3 → publicación
Pendiente revisión Patricia → aprobación → generar EN → REST PUT + translationsRegister

### 🔴 PRIORIDAD 1 — Tracking pixels (0/10)
Meta Pixel + TikTok Pixel + Google Analytics — requiere Sam en Shopify Admin

### 🔴 PRIORIDAD 2 — CRO Checkout
Bundle configurar + apps CRO

### 🟠 PRIORIDAD 3 — Re-audit (~160+/200 esperado)
### 🟠 PRIORIDAD 4 — DY Fazza imagen (NSCF-TR-013 + NSCF-BTP-003)
### 🟠 PRIORIDAD 5 — shopify-auto-translate EF bug (42 EN descriptions)
### 🟠 Compliance soft gap — D7Herbal · DiamondDetails · VivoseMask · VizosCosmetics
### 🟠 ForumPHs — setup completo en Supabase (todas las tablas)

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
10. **Patricia Osorio:** colorimetría + químicos. Nunca solo "South Florida". Trayectoria internacional Sur/Centro/Norte América + Europa. Florida = habitat natural por concentración de mercados.
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
24. **Compliance Scope Rule:** compliance filtra CLAIMS DE MECANISMO, no lenguaje experiencial. "El viernes se parece al lunes" = experiencial → sin hedging. Claims de mecanismo → hedging aplicado.
25. **City rotation rule:** comparaciones climáticas rotan entre 25+ ciudades USA. Nunca fijar NY/Chicago/Houston por defecto. Elegir según argumento del artículo, temporada y audiencia.
26. **"Neurone nació para South Florida":** NUNCA usar. Limita geo y no es cierto. La línea es versátil — múltiples tipos de cabello y climas. El protocolo SCF sí es para Florida.
27. **Vizos Cosmetics – The Healing Systems:** Casa Diseñadora de Belleza Capilar · +10 años · diseñó los Rituals & Kits de NSCF. Mencionar al hablar de la autoridad detrás de las recomendaciones.
28. **compliance_rules jsonb:** `applies_to` es tipo jsonb — usar `'["copy","video"]'::jsonb`, no `ARRAY[...]`.
29. **ForumPHs:** no existe en Supabase. BLOCK total. Requiere setup desde cero.
30. **SMA ETag check:** HEAD check antes de cargar export completo. Si ETag igual al registrado → "Sin novedades del SMA", no generar archivo. Registrar ETag en session_log al final del bloque de sesión.

---

## REFERENCIA TÉCNICA

**Brand Cache:** `https://unrlvl-context.vercel.app/api/brand-cache?brand_id=NeuroneSCF`

**IDs B2C:** Theme `192983662919` · Blog `126248255815` · Arts `613706334535/662215/694983/727751`

**Addresses:** Legal `12951 Biscayne Blvd North Miami FL 33181` · 3PL `3028 NW 72nd Ave #4 Miami FL 33122`

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C ✅ · Audit v16.1 · Compliance ✅ · SP Pool 80 cards ✅ · Kit Naming ✅ · Kit Images 12/12 ✅ · CRO Layer ✅ · Collections 7/7 · About ES+EN ✅ · Policies 4/4 ✅ · Payments ✅ · 42/42 desc ES ✅ · Language switcher ✅ · Contact page ✅ · UNRLVL Signature B2C+B2B ✅ · Blog Hair Intelligence LIVE ✅ · 4 artículos ES+EN ✅ · Blog templates ✅ · Pillar cards bilingual ✅ · Patricia suggest blocks 4/4 ✅ · ImageLab presets 4/4 ✅ · **Content Pipeline Skill v2.4 ✅** · **Brand Cache LIVE ✅** · **pipeline_skills v2.0 ✅** · **RLS 4 tablas ✅** · **Compliance Ecosystem 10 marcas ✅** · **4 artículos ES v3 listos para aprobación ✅**

---
_Próxima sesión: Aprobación artículos ES → EN → publicación · Pixels · CRO Checkout_
