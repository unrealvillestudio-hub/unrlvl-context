# SESSION LOG — Neurone South & Central Florida (NeuroneSCF)
_Mantenido por: Claude | Actualizado: 2026-05-10_

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

## SESIÓN 2026-05-10 — About Page Corrections ES+EN (Sam)

Correcciones vía EF `nscf-about-fix` v2:
- ES: "técnica en colorimetría y tratamiento capilar" (no "Técnica en Química")
- EN: Venezuela eliminado → Colombia/Panamá/EEUU/Europa
- EN: Vizos Salón = salón (no laboratorio)
- EN: Unicode crítico resuelto (U+2019, U+201C) — patrón documentado

---

## SESIÓN 2026-05-10 — CRO Polish & DY Fazza Diagnosis (Sam)

- Spacing precios · Savings block #9a9690 · Terra accent #D4622A en product+card
- DY Fazza: NLSDYLS-1-1.webp es Dyfensor SF → imagen correcta pendiente asignación API (NSCF-TR-013 + NSCF-BTP-003)

---

## SESIÓN 2026-05-10 — Kit Naming, CRO Layer & Store Cleanup (Sam)

- Kit Naming: 12 nombres finales cerrados
- SOS variant title corregido (1× no 6×)
- CRO Layer 12/12: compare_at_price + savings HTML + shipping anchor
- Spearheads: M1 KT-101P+KT-SDUO · M2 KT-103V · M3 KT-102P

---

## SESIÓN 2026-05-10 — Kit Images Sprint (Sam)

- Pipeline: Remove.bg + Affinity Photo (Drop Shadow = Layer Effects > Outer Shadow)
- 4/12 punta kits listos originalmente · **12/12 completados esta sesión ✅**

---

## SESIÓN 2026-05-07 — Shopify B2C Sprint 3 (Sam)

**locale_root — REGLA PERMANENTE:**
```liquid
{%- assign locale_root = request.locale.root_url | append: '/' | replace: '//', '/' -%}
```
NUNCA `if blank`. Geo-redirect: Online Store → Preferences → OFF.

---

## REFERENCIA TÉCNICA

**Addresses:**
- Legal/Refunds: 12951 Biscayne Blvd, North Miami FL 33181 (Prestige Beauty Global Distribution)
- 3PL/Shipping/Contact: 3028 NW 72nd Ave #4, Miami FL 33122

**IDs B2C:**
```
Theme:     192983662919
About:     162313142599
La Ciencia:162313175367
FAQ:       162313208135
Contacto:  162313273671
```

---

## PENDIENTES ACTIVOS

### 🔴 PRIORIDAD ALTA
- [ ] **Tracking pixels** — Meta + TikTok + Google (0/10) — SIGUIENTE SESIÓN
- [ ] **CRO Checkout** — Bundle configurar + apps CRO
- [ ] **DY Fazza imagen** — Sam sube foto correcta → API asigna
- [ ] **shopify-auto-translate EF bug** — EN descriptions 42 productos bloqueadas

### 🟠 PRIORIDAD MEDIA
- [ ] Re-run audit (esperado ~157+/200 post-fixes)
- [ ] Shipping zones configurar en Admin
- [ ] SP metafield fix 3 productos (proxy route)
- [ ] EN translation La Ciencia
- [ ] B2B SEO-003 COLOR titles
- [ ] Meta Developer App + System User tokens (sesión dedicada PO)

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

---

## HISTORIAL COMPLETADO

OAuth B2B+B2C+write_legal_policies ✅ · Audit v16.1 · Fix v15 · Compliance v2 · SP pool 80 cards ✅ · **Kit Naming ✅ · Kit Images 12/12 ✅** · CRO Layer ✅ · CRO Polish ✅ · Collections 7/7 · SEO titles 37/42 · About page ES+EN ✅ · Policies 4/4 ✅ · Precios ✅ · Shopify Payments ✅ · 42/42 desc ES ✅ · Kit Composición fix ✅ · EN translations ✅ · Language switcher ✅ · translate-proxy.js ✅ · Contact page ✅

---
_Próxima sesión: Tracking pixels — Meta + TikTok + Google. CRO Checkout + Bundle._
