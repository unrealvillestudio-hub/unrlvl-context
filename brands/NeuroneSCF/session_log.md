# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-12_

---

## SESIÓN 2026-05-12 — Artículos Blog v4 + PO Voice + Content Pipeline Skill v2.4 + Compliance Ecosystem (Sam)

### COMPLETADO

**4 Artículos Blog Hair Intelligence — ES v4 ✅ PUBLICADOS EN SHOPIFY**
- Pipeline: Content Pipeline v2.4 · L0→L7 · QA PASS
- Publicados vía REST PUT · updated_at confirmado en los 4

| Art | ID | Handle | Updated |
|---|---|---|---|
| ¿Por qué el color de tu cabello se va tan rápido en Florida? | 613706334535 | color-capilar-se-va-rapido-miami | 2026-05-12 17:22 |
| Por qué el acondicionador no le basta al cabello seco | 613706662215 | cabello-seco-acondicionador-reconstruccion | 2026-05-12 17:23 |
| Sal, cloro y sol: lo que le hacen a tu cabello en Florida | 613706694983 | sal-cloro-sol-cabello-miami | 2026-05-12 17:23 |
| La rutina capilar para Florida: por qué el orden sí importa | 613706727751 | rutina-capilar-sur-florida-protocolo | 2026-05-12 17:24 |

**Cambios v4 sobre v3:**
- Sugerencias ChatGPT: 7 aceptadas/contrapropuestas, 4 rechazadas (ver aprendizaje #31)
- "conserve mejor su intensidad entre lavados" (Art 01)
- "apoyar la fibra más allá de la hidratación superficial" (Art 01 suggest)
- "Florida, donde conviven el cabello latino, anglosajón y europeo como en pocos lugares del país" (Art 01 — contrapropuesta que conserva posicionamiento)
- "Para la mayoría del cabello tratado [...] es parte del mantenimiento básico" (Art 02 — cita Patricia)
- "disminuye mucho" en vez de "no existe" para Minneapolis (Art 03)
- "La exposición solar sigue siendo relevante durante gran parte del año" (Art 03)
- "conserve mejor su condición semana tras semana" (Art 04)
- "reducir su impacto paso a paso" (Art 04 suggest)
- Defendidos: "Florida concentra esos tres mundos como ningún otro estado" · "converge con" · "uno de los pasos que más puede ayudar" (over-hedging sin razón de compliance)

---

**PO_VOICE_ARTICLES.md v1.0 ✅ — nuevo documento**
- Ruta canónica: `brands/NeuroneSCF/PO_VOICE_ARTICLES.md`
- 10 principios del voice de Patricia Osorio para artículos de blog
- Instrucciones específicas para agents IID (WRITE, H+AIFE, HUMANIZE, QA)
- Test de la Silla del Salón como verificación definitiva
- Generado desde sesión real — no es documento teórico
- Ver detalle completo en el archivo

---

**Content Pipeline Skill v2.4 ✅ — pushed**
- Compliance architecture: L1 pre-filtro (hard) + L5 shaping (soft) + L7 QA
- Compliance Scope Rule: mecanismo vs. experiencial
- City rotation rule: pool 25+ ciudades USA
- BLOCK behavior documentado

---

**Compliance Ecosystem — Supabase ✅**
- NeuroneSCF: Miami → Florida en hard y soft
- 9 nuevas rows: UnrealvilleStores · PatriciaOsorioComunidad · PatriciaOsorioVizosSalon · PatriciaOsorioPersonal (hard) · UnrealvilleStudio
- ForumPHs: BLOCK total — setup completo requerido
- Soft gap pendiente: D7Herbal · DiamondDetails · VivoseMask · VizosCosmetics

---

**Mensaje WA Patricia — estrategia Florida-first ✅**
- Explicación de por qué Florida primero, USA después
- Listo para copiar/pegar

---

_sma_etag: "W/\"ab5b-LKbnVrE2RoXcukAtcZQZjS3bNSg\""_ — Sin novedades nuevas (última actividad: 2026-05-11).

---

## AGENDA MAÑANA — 2026-05-13

### 🔴 PRIORIDAD 0 — Imágenes del blog
Crear imágenes para los 4 artículos publicados. Briefing: estética Neurone SCF, cabello femenino latino en contexto Florida.

### 🔴 PRIORIDAD 1 — Tracking pixels
Sam tiene usuario Meta y TikTok ✅. GA4 pendiente confirmación esta noche.
- Meta Pixel → Shopify
- TikTok Pixel → Shopify
- GA4 → Shopify (en cuanto Sam confirme credenciales)

### 🟠 PRIORIDAD 2 — Re-audit (~160+/200 esperado)
### 🟠 PRIORIDAD 3 — CRO Checkout
### 🟠 PRIORIDAD 4 — DY Fazza imagen (NSCF-TR-013 + NSCF-BTP-003)
### 🟠 PRIORIDAD 5 — shopify-auto-translate EF bug (42 EN descriptions)
### 🟠 Compliance soft gap — D7Herbal · DiamondDetails · VivoseMask · VizosCosmetics
### 🟠 ForumPHs — setup completo en Supabase

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
26. **"Neurone nació para South Florida":** NUNCA usar. Limita geo y no es cierto. La línea es versátil. El protocolo SCF sí es para Florida.
27. **Vizos Cosmetics – The Healing Systems:** Casa Diseñadora de Belleza Capilar · +10 años · diseñó los Rituals & Kits de NSCF. Mencionar al hablar de la autoridad detrás de las recomendaciones.
28. **compliance_rules jsonb:** `applies_to` es tipo jsonb — usar `'["copy","video"]'::jsonb`, no `ARRAY[...]`.
29. **ForumPHs:** no existe en Supabase. BLOCK total. Requiere setup desde cero.
30. **SMA ETag check:** HEAD check antes de cargar export. Si ETag igual al registrado → "Sin novedades", no generar archivo. Registrar ETag nuevo al final del bloque de sesión.
31. **Sugerencias de ChatGPT sobre artículos:** útil para compliance técnico (hedging de mecanismos), pero tiende a over-hedgear lenguaje experiencial y debilitar copy con fuerza emocional donde no hay riesgo real. Evaluar sugerencia por sugerencia aplicando Compliance Scope Rule. Defender: imágenes vividas ("el viernes se parece al lunes"), posicionamiento geográfico ("Florida concentra esos tres mundos como ningún otro estado"), verbos precisos ("converge" no "se une").
32. **PO Voice Articles:** voice de Patricia para blog documentado en `brands/NeuroneSCF/PO_VOICE_ARTICLES.md`. 10 principios operativos. Test: la Silla del Salón. Cargar antes de cualquier pipeline de artículos para NeuroneSCF. Aplica a Claude en sesión Y a agents IID cuando se activen.

---

## REFERENCIA TÉCNICA

**Brand Cache:** `https://unrlvl-context.vercel.app/api/brand-cache?brand_id=NeuroneSCF`
**IDs B2C:** Theme `192983662919` · Blog `126248255815` · Arts `613706334535/662215/694983/727751`
**Addresses:** Legal `12951 Biscayne Blvd North Miami FL 33181` · 3PL `3028 NW 72nd Ave #4 Miami FL 33122`

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C ✅ · Audit v16.1 · Compliance ✅ · SP Pool 80 cards ✅ · Kit Naming ✅ · Kit Images 12/12 ✅ · CRO Layer ✅ · Collections 7/7 · About ES+EN ✅ · Policies 4/4 ✅ · Payments ✅ · 42/42 desc ES ✅ · Language switcher ✅ · Contact page ✅ · UNRLVL Signature B2C+B2B ✅ · Blog Hair Intelligence LIVE ✅ · Blog templates ✅ · Pillar cards bilingual ✅ · Patricia suggest blocks 4/4 ✅ · ImageLab presets 4/4 ✅ · **Content Pipeline Skill v2.4 ✅** · **Brand Cache LIVE ✅** · **pipeline_skills v2.0 ✅** · **RLS 4 tablas ✅** · **Compliance Ecosystem 10 marcas ✅** · **4 artículos ES v4 PUBLICADOS ✅** · **PO_VOICE_ARTICLES v1.0 ✅** · **Mensaje WA Patricia Florida-first ✅**

---
_Próxima sesión: Imágenes blog · Pixels (Meta/TikTok/GA4) · CRO Checkout_
