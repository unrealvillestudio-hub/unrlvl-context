# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-11_

---

## SESIÓN 2026-05-11 — Blog Hair Intelligence · Signature UNRLVL · Bilingual Full (Sam)

### COMPLETADO

**UNRLVL Signature ✅**
- Snippet `snippets/unrlvl-signature.liquid` creado en B2C y B2B
- `sections/nc-footer.liquid` actualizado en ambas tiendas con `{%- render 'unrlvl-signature' -%}`
- B2B: STUDIO color corregido a `#1A1A1A` (era rgba blanco — BP_BRAND §05 violation)
- Supabase `brands` table: columnas `unrlvl_signature_enabled` + `unrlvl_signature_position` añadidas
- 12 marcas del ecosistema marcadas `unrlvl_signature_enabled = true`
- JSON de spec descargable generado: `unrlvl-signature.json`

**Blog "Hair Intelligence" — LIVE ✅**
- Blog creado en Shopify B2C: ID `126248255815`, handle `hair-intelligence-1`
- URL: `neuronescflorida.com/blogs/hair-intelligence-1`
- 4 artículos publicados en ES + traducciones EN registradas

| Art | Pilar | ID Shopify | Handle ES | Handle EN |
|---|---|---|---|---|
| 01 | Color Intelligence | 613706334535 | color-capilar-se-va-rapido-miami | why-hair-color-fades-faster-miami |
| 02 | Hair Science | 613706662215 | cabello-seco-acondicionador-reconstruccion | conditioner-dry-hair-reconstruction |
| 03 | Miami Hair | 613706694983 | sal-cloro-sol-cabello-miami | salt-chlorine-sun-miami-hair-protocol |
| 04 | Rituals | 613706727751 | rutina-capilar-sur-florida-protocolo | hair-ritual-south-florida |

**Art 02 v2 — Corrección técnica crítica ✅**
- Error original: "acondicionador con proteínas" confundido con reconstructor
- Corrección: reconstructor ≠ acondicionador — productos distintos, funciones distintas
- Nano Tribología integrada en contexto correcto (penetra córtex, no solo cubre)
- QA re-pasado: PASS

**Blog Templates ✅**
- `sections/nc-blog-index.liquid` — pillar cards (recuadros), 5 cards, colores por pilar, bilingual
- `templates/blog.json` — blog landing template
- `templates/article.liquid` — article reading page, bilingual, Patricia author section

**Blog Nav ✅**
- `sections/nc-header.liquid` actualizado: "Hair Intelligence" en desktop + mobile
- Tratamiento: separador vertical `rgba(255,255,255,0.14)` antes del link (editorial/product split)
- Mobile: línea horizontal separadora
- Activo con underline estándar cuando en blogs

**Pillar Cards — Option A → Recuadros ✅**
- Evolucionado de pestañas (Option A) a recuadros (cards)
- 5 cards: Todos + 4 pilares
- Borde superior en color del pilar
- Active state: fondo tintado + border lateral activado + elevación
- Taglines: "La ciencia detrás del cabello", "El clima. La fibra. El protocolo.", etc.
- Bilingual: is_en detection en todas las strings

**Cross-article Patricia suggest blocks ✅**
- Art 01 → Art 03 (Miami Hair): color es una pieza del problema climático mayor
- Art 02 → Art 04 (Rituals): del entendimiento a la práctica
- Art 03 → Art 01 (Color Intelligence): UV = impacto más visible en cabello con color
- Art 04 → Art 02 (Hair Science): la rutina funciona porque reconstructor ≠ acondicionador
- Aplicados en ES (REST PUT) y EN (translationsRegister)
- Style: fondo elevado, borde izquierdo terra (#C4622D), label "Patricia recomienda"

**ImageLab presets — Supabase ✅**
- 4 presets creados en `imagelab_presets`:
  - `NSCF-BLOG-SCIENCE`: cinematic, 85mm portrait, shallow DOF, warm indoor
  - `NSCF-BLOG-MIAMI`: outdoor Miami, high humidity 0.72, tropical warm
  - `NSCF-BLOG-COLOR`: salon editorial, rich warm, color depth
  - `NSCF-BLOG-RITUALS`: bathroom morning light, warm intimate
- Cada preset incluye negative_prompt, aspect_ratio 1200x628, compliance rules

**Convención de títulos aplicada (Sam) ✅**
- "qué" en minúscula en interrogativos indirectos
- Signos de interrogación de apertura y cierre: ¿...?
- Sufijo SEO: "Neurone S&C Florida" → recomendación "Neurone South & Central Florida" para SEO
- "Rutina Capilar" capitalizado (referencia a categoría Rituals & Kits)
- Meta titles corregidos en todos los artículos

**RLS Security warning 🟠**
- 4 tablas Supabase sin RLS: `ops_lab_rates`, `shopify_enrich_jobs`, `pipeline_skills`, `pipeline_results`
- NO ejecutado automáticamente (habilitar RLS sin policies bloquea acceso)
- Pendiente: sesión de infra para añadir policies correctas

### APRENDIZAJES PERMANENTES NUEVOS

14. **UNRLVL Signature:** snippet Liquid en tema → `{%- render 'unrlvl-signature' -%}`. No modificar HTML directo. BP_BRAND v1.2 es la fuente de verdad.
15. **Supabase brands:** `unrlvl_signature_enabled` boolean controla si el skill ui-ux-layer inyecta signature.
16. **Blog index bilingual:** `{%- assign is_en = false -%}{%- if request.locale.iso_code == 'en' -%}{%- assign is_en = true -%}{%- endif -%}` — patrón permanente para secciones con texto hardcodeado.
17. **translationsRegister digest:** el digest de `body_html` cambia cada vez que se actualiza el ES canonical. Re-fetch obligatorio antes de registrar traducción EN si el ES cambió.
18. **Pillar card recuadros:** `border-top: 2px solid [color]` + `::before` para fondo tintado en active. Sin dots, sin tabs. Recuadros con tagline dan señal de navegación.
19. **Art 02 técnica:** reconstructor (proteínas hidrolizadas, penetra córtex) ≠ acondicionador (humectante, actúa en cutícula). Nano Tribología = acción a nivel de fibra.

---

## SESIÓN 2026-05-10 — Kits 100% + Skills Sprint + Roadmap Lanzamiento (Sam)

### COMPLETADO

**Kits — 100% CERRADO ✅**
- 12/12 imágenes subidas y asignadas en Shopify B2C
- Kit Naming System: 12 nombres finales cerrados
- Kit Composición theme fix: eyebrow oculto cuando única opción
- Savings HTML + compare_at_price + terra accent precio (#D4622A)
- Catálogo de kits completamente operativo

**Skills System v1.0 — infra completada ✅**
- 16 skills en `skills/[nombre]/SKILL.md`
- INDEX.md creado — tabla de decisión
- SESSION_PROTOCOL.md v10
- Custom Instructions actualizadas con AGENDA+INDEX en carga base

### ROADMAP CONFIRMADO
1. 🔴 **Tracking pixels** — Meta + TikTok + Google (siguiente sesión)
2. 🔴 **CRO Checkout** — Bundle (instalada, sin configurar) + apps CRO
3. 🔴 **Audit** — re-run completo post-fixes (esperado ~157+/200)
4. 🔴 **Ads** — lanzamiento paid media

---

## SESIÓN 2026-05-09 — Legal Sprint · SP Pool · Kit Fix · Descriptions ES · Language Switcher (Sam) ← RECUPERADA 2026-05-10

> Esta sesión no fue actualizada al agotarse el contexto del chat. Recuperada desde transcript en 2026-05-10.

### TRABAJO REALIZADO

#### 1. LEGAL POLICIES — 4/4 COMPLETADAS

| Policy | Estado |
|--------|--------|
| Terms of Service | ✅ Prestige Beauty Global Distribution · placeholders limpios |
| Refund Policy | ✅ 12951 Biscayne Blvd, North Miami FL 33181 |
| Shipping Policy | ✅ 3028 NW 72nd Ave #4, Miami FL 33122 |
| Privacy Policy | ✅ Fecha actualizada · auto-managed desactivado |

EN translations: TOS ✅ · Refund ✅ · Shipping ✅ · Contact ✅ · FAQ ✅

#### 2. CONTACT PAGE ✅
Handle: `contacto` · email + tel · sin form · EN translation registrada

#### 3. KIT COMPOSICIÓN — THEME FIX ✅
`display:none` cuando `option.values.size == 1` · label Contenido/Contents

#### 4. PRODUCT DESCRIPTIONS — 42/42 ES ✅
41/42 body_html reescritos. 2 correcciones críticas: HYALONEURINE FACE & HAIR (barba/bigote → capilar) · GREEN 100 (color → sérum).

#### 5. SOCIAL PROOF — POOL ARCHITECTURE ✅
80 cards · 8s ±800ms · no float · IG gradiente · TikTok bg diferenciado · 6 home slots · buffer 45%

#### 6. ABOUT PAGE ✅
+35 años · Colombia/Panamá/EEUU/Europa · Patricia = colorimetría · Vizos Salón = salón · vizoscosmetics.com · PO Conectando IG+TT · Prestige mencionado

#### 7. LANGUAGE SWITCHER ✅
Pill EN/ES header desktop + mobile

#### 8. PRECIOS Y PAYMENTS ✅
Shopify Payments activo · Precios $0.00 resueltos · Translate & Adapt desinstalado

---

## REFERENCIA TÉCNICA

**Addresses:**
- Legal/Refunds: 12951 Biscayne Blvd, North Miami FL 33181 (Prestige Beauty Global Distribution)
- 3PL/Shipping/Contact: 3028 NW 72nd Ave #4, Miami FL 33122

**IDs B2C:**
```
Theme:        192983662919
About:        162313142599
La Ciencia:   162313175367
FAQ:          162313208135
Contacto:     162313273671
Blog ID:      126248255815
Blog handle:  hair-intelligence-1
```

**Article IDs:**
```
Art 01 Color Intelligence: 613706334535
Art 02 Hair Science:       613706662215
Art 03 Miami Hair:         613706694983
Art 04 Rituals:            613706727751
```

---

## PENDIENTES ACTIVOS

### 🔴 PRIORIDAD ALTA
- [ ] **Tracking pixels** — Meta + TikTok + Google (0/10) — SIGUIENTE SESIÓN
- [ ] **CRO Checkout** — Bundle configurar + apps CRO
- [ ] **DY Fazza imagen** — Sam sube foto correcta → API asigna
- [ ] **shopify-auto-translate EF bug** — EN descriptions 42 productos bloqueadas

### 🟠 PRIORIDAD MEDIA
- [ ] Re-run audit (esperado ~160+/200 post-fixes)
- [ ] Shipping zones configurar en Admin
- [ ] SP metafield fix 3 productos (proxy route)
- [ ] EN translation La Ciencia
- [ ] B2B SEO-003 COLOR titles
- [ ] Meta Developer App + System User tokens (sesión dedicada PO)
- [ ] Supabase RLS fix: 4 tablas sin RLS (sesión de infra)
- [ ] ImageLab timeout fix Vercel (50s) — prerrequisito para imágenes del blog

### 🟡 BLOG — SIGUIENTE CICLO
- [ ] Artículos 05-08 — próximas 4 semanas
- [ ] Imágenes reales vía ImageLab (post timeout fix)
- [ ] Suscripciones email → blog connection
- [ ] IID agents pipeline activation (Sprint 1 EF shopify-content-pipeline)
- [ ] Art 02-04 .docx v2 para PO (con invitaciones añadidas)

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
9. **Page corrections Unicode:** U+2019 (`'`), U+201C (`"`). EF `nscf-about-fix` como patrón.
10. **Patricia Osorio:** colorimetría. Nunca química. Nunca Venezuela. Cali, Colombia. +35 años.
11. **SP pool architecture:** pool JS global en `assets/`. Previene patrones percibibles.
12. **Product descriptions:** body_html siempre en locale default (ES).
13. **Addresses:** Prestige/legal = 12951 Biscayne · 3PL/ops = 3028 NW 72nd Ave #4.
14. **UNRLVL Signature:** snippet Liquid. BP_BRAND v1.2 fuente de verdad. `unrlvl_signature_enabled` en Supabase.
15. **Blog bilingual:** patrón `is_en` con `request.locale.iso_code == 'en'` para texto hardcodeado.
16. **translationsRegister digest:** re-fetch obligatorio si ES canonical fue modificado.
17. **Pillar cards:** recuadros > pestañas para blog navigation. Tagline comunica sección.
18. **reconstructor ≠ acondicionador:** crítico para contenido NSCF. Nano Tribología = fibra level.

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C+write_legal_policies ✅ · Audit v16.1 · Fix v15 · Compliance v2 · SP pool 80 cards ✅ · **Kit Naming ✅ · Kit Images 12/12 ✅** · CRO Layer ✅ · CRO Polish ✅ · Collections 7/7 · SEO titles 37/42 · About page ES+EN ✅ · Policies 4/4 ✅ · Precios ✅ · Shopify Payments ✅ · 42/42 desc ES ✅ · Kit Composición fix ✅ · EN translations ✅ · Language switcher ✅ · translate-proxy.js ✅ · Contact page ✅ · **UNRLVL Signature B2C+B2B ✅** · **Blog Hair Intelligence LIVE ✅** · **4 artículos ES+EN ✅** · **Blog templates ✅** · **Hair Intelligence en nav ✅** · **Pillar cards bilingual ✅** · **Patricia suggest blocks 4/4 ✅** · **ImageLab presets 4/4 ✅**

---

_Próxima sesión: Tracking pixels Meta + TikTok. CRO Checkout. Re-audit._
