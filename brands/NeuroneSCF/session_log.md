# SESSION LOG — NeuroneSCF B2C
_Última actualización: 2026-05-12_

---

## SESIÓN 2026-05-12 (tarde) — Serums + Rituals & Kits collection pages

### COMPLETADO

**Línea Serums — collection page con nurture**
- Creado `templates/collection.serums.json` con `nc-linea-intro`
- `templateSuffix: "serums"` asignado a collection `672557465927`
- Copy: "TRATAMIENTO EN ESTADO PURO." · 5 features: concentración de activos, penetración profunda, Nano Tribología, Florida, exclusividad
- Tagline: "Concentrado. Preciso. Sin relleno."

**Rituals & Kits — sección y template dedicados**
- Creado `sections/nc-rituals-kits-intro.liquid` — sección propia, NO usa nc-linea-intro
- Diferencias vs otras líneas:
  - Color terracota `#C4622D` (no azul Neurone) — señal visual de categoría distinta
  - Bloque de autoría dedicado: medallón + Patricia Osorio + Vizos Cosmetics – The Healing Systems + credenciales completas + cita directa
  - Copy enfocado en protocolo vs bundle, autoría profesional, curación experta
- Creado `templates/collection.ritual-kits.json`
- `templateSuffix: "ritual-kits"` asignado a collection `672207995207`
- Hero: "NO SON BUNDLES. / SON PROTOCOLOS."
- Author block: Patricia Osorio · Técnica Especializada en Colorimetría · Vizos Cosmetics – The Healing Systems · Sur/Centro/Norte América · Europa · Florida
- Quote: "Diseñé estos kits porque ninguno de los que existían en el mercado respondía a lo que veo todos los días en el cabello de Florida."
- Features: Diseñados desde el salón / Protocolo con secuencia / Ciencia curada por manos expertas / Kit SOS / 12 kits. Cero de relleno.

---

## SESIÓN 2026-05-12 (mañana) — Sales Layer fix + Collection Nurture todas las líneas

### COMPLETADO

**Arquitectura Sales Layer**
- Fix `nc-sales-layer.liquid`: `section.settings.content` → `{{ page.content }}`
- Decisión: nav apunta al collection directo. Sales Layer = asset de ads/email.

**Moisture page — template propio**
- `templates/page.moisture.json` — NUEVO (3 secciones Liquid dedicadas)
- `nc-page-moisture-hero.liquid` — reescrito: dark, Florida, hero full-width
- `nc-page-moisture-caracteristicas.liquid` — reescrito: dark, Florida
- Page `linea-moisture` template_suffix: `sales-layer` → `moisture`

**Collection nurture — 6 líneas**
- `templates/collection.moisture-collection.json` — reordenado hero→features→products
- `sections/nc-linea-intro.liquid` — NUEVA sección genérica reutilizable

| Template | Collection ID | templateSuffix | Headline |
|---|---|---|---|
| `collection.color-rescue.json` | 668458516807 | color-rescue | TU COLOR / NO PERDONA. |
| `collection.restore.json` | 668458418503 | restore | DAÑO CAPILAR / TIENE SOLUCIÓN. |
| `collection.scalp.json` | 668458549575 | scalp | CUERO CABELLUDO / SANO, PELO SANO. |
| `collection.styling.json` | 668458484039 | styling | ESTILO SIN / SACRIFICIOS. |
| `collection.serums.json` | 672557465927 | serums | TRATAMIENTO / EN ESTADO PURO. |
| `collection.ritual-kits.json` | 672207995207 | ritual-kits | NO SON BUNDLES. / SON PROTOCOLOS. |

**Claude in Chrome activado** — deviceId `40a2de31-3a0c-4e84-a2cc-d156534db164`. QA visual en vivo: moisture ✅ color-rescue ✅ ritual-kits ✅

---

### ASSETS TEMA (192983662919) — RESUMEN COMPLETO

| Archivo | Tipo | Estado |
|---|---|---|
| `sections/nc-page-moisture-hero.liquid` | section | modificado |
| `sections/nc-page-moisture-caracteristicas.liquid` | section | modificado |
| `sections/nc-linea-intro.liquid` | section | NUEVO |
| `sections/nc-rituals-kits-intro.liquid` | section | NUEVO |
| `templates/page.moisture.json` | template | NUEVO |
| `templates/collection.moisture-collection.json` | template | modificado |
| `templates/collection.color-rescue.json` | template | NUEVO |
| `templates/collection.restore.json` | template | NUEVO |
| `templates/collection.scalp.json` | template | NUEVO |
| `templates/collection.styling.json` | template | NUEVO |
| `templates/collection.serums.json` | template | NUEVO |
| `templates/collection.ritual-kits.json` | template | NUEVO |

---

### PENDIENTES ACTIVOS

- ⚠️ `/pages/linea-color-rescue` — body_html paste manual pendiente
- ⚠️ `/pages/linea-styling` — sin contenido body_html
- ❌ Tracking pixels Meta + TikTok + Google: 0/10
- ❌ CRO Checkout — Bundle sin configurar
- ❌ EN descriptions bug (shopify-auto-translate EF)
- ❌ Social Media Agent: WABA en progreso. Tokens API bloqueados. Sin novedades desde 2026-03-23.
- ⏳ Video Patricia Kit SOS — asset urgente TikTok, no grabado

---

### DECISIONES ARQUITECTÓNICAS

1. Nav → Collection directo. Sales Layer para ads/email únicamente.
2. Nurture integrado en collection page: hero + features + productos.
3. `nc-linea-intro` genérica para 5 líneas. `nc-rituals-kits-intro` dedicada para R&K.
4. Rituals & Kits en terracota `#C4622D` — diferenciación visual del resto del catálogo.
5. Bloque de autoría Patricia como diferenciador kits vs productos sueltos.

---

### APRENDIZAJES PERMANENTES (añadir al log principal)

31. **nc-rituals-kits-intro pattern:** colecciones con historia de autoría/curación humana merecen sección dedicada con bloque de persona. Color distinto refuerza diferenciación en nav.
32. **Collections templateSuffix:** `collectionUpdate(input: {id, templateSuffix})` — múltiples mutations en un solo GraphQL query.
33. **Claude in Chrome:** Requiere `select_browser` por deviceId + permiso de dominio activo. Se desconecta en sesiones largas — re-seleccionar con `tool_search`.

---

### SOCIAL MEDIA AGENT — Sin novedades
ETag sin cambios. Último estado registrado: 2026-03-23.

---

_NeuroneSCF B2C · Unrealville Studio · session_log v2026-05-12-v2_
