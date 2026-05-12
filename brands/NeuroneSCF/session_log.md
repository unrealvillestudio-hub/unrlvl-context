# SESSION LOG — NeuroneSCF B2C
_Última actualización: 2026-05-12_

---

## SESIÓN 2026-05-12 (noche) — Hotfix CTA Rituals & Kits + correcciones menores

### COMPLETADO

**Hotfix CTA contraste `nc-rituals-kits-intro.liquid`**
- Diagnóstico vía JS: `a[href*="ritual-kits"]` en el tema pintaba todos los links a esa URL con color terracota (#C4622D) — mismo color que el fondo del botón, texto invisible.
- Solución: `style="color:#FAFAFA !important;"` inline en el `<a>` — gana sobre cualquier selector de hoja de estilos.
- Verificado en vivo con Claude in Chrome: "VER LOS RITUALS & KITS →" visible en blanco ✅

**Fix "Diseñado por" — unicode literal en Liquid**
- `\u00f1` en Liquid no se parsea (a diferencia de JSON) — salía como texto literal.
- Corregido a carácter UTF-8 directo: `Diseñado por` ✅

**Fix typo "cabéllo" → "cabello"** en author_quote del template JSON ✅

**Aclaración ortográfica**
- `"porqué"` al final de la cita de Patricia ("Cada secuencia tiene un porqué") es sustantivo — correcto sin cambios.
- `"por qué"` con espacio aplica solo en interrogativo/exclamativo — ya estaba correcto en feat_eyebrow.

### APRENDIZAJE PERMANENTE (añadir al log)
34. **Tema NSCF — selectores `a[href*="handle"]`:** el tema tiene reglas que pintan links según el handle de la colección destino. Si un CTA sobre fondo de ese color queda invisible, aplicar `style="color:#FAFAFA !important;"` inline directamente en el `<a>`. Verificar siempre con JS: `getComputedStyle(btn).color` + `matchingRules`.

---

## SESIÓN 2026-05-12 (tarde) — Serums + Rituals & Kits collection pages

### COMPLETADO

**Línea Serums — collection page con nurture**
- `templates/collection.serums.json` — NUEVO con `nc-linea-intro`
- `templateSuffix: "serums"` → collection `672557465927`
- Copy: "TRATAMIENTO EN ESTADO PURO." · Tagline: "Concentrado. Preciso. Sin relleno."

**Rituals & Kits — sección y template dedicados**
- `sections/nc-rituals-kits-intro.liquid` — NUEVA sección propia (no nc-linea-intro)
- Color terracota `#C4622D` — diferenciación visual de categoría
- Bloque de autoría: Patricia Osorio · Vizos Cosmetics – The Healing Systems · credenciales completas · cita directa
- `templates/collection.ritual-kits.json` — NUEVO
- `templateSuffix: "ritual-kits"` → collection `672207995207`
- Hero: "NO SON BUNDLES. / SON PROTOCOLOS."

---

## SESIÓN 2026-05-12 (mañana) — Sales Layer fix + Collection Nurture todas las líneas

### COMPLETADO

**Arquitectura Sales Layer**
- Fix `nc-sales-layer.liquid`: `section.settings.content` → `{{ page.content }}`
- Decisión: nav apunta al collection directo. Sales Layer = asset de ads/email.

**Moisture — template propio**
- `templates/page.moisture.json` — NUEVO
- `nc-page-moisture-hero.liquid` — reescrito: dark, Florida, hero full-width
- `nc-page-moisture-caracteristicas.liquid` — reescrito: dark, Florida
- Page `linea-moisture` template_suffix: `sales-layer` → `moisture`

**Collection nurture — 6 líneas**
- `sections/nc-linea-intro.liquid` — NUEVA sección genérica
- `templates/collection.moisture-collection.json` — reordenado hero→features→products

| Template | Collection ID | Headline |
|---|---|---|
| `collection.color-rescue.json` | 668458516807 | TU COLOR / NO PERDONA. |
| `collection.restore.json` | 668458418503 | DAÑO CAPILAR / TIENE SOLUCIÓN. |
| `collection.scalp.json` | 668458549575 | CUERO CABELLUDO / SANO, PELO SANO. |
| `collection.styling.json` | 668458484039 | ESTILO SIN / SACRIFICIOS. |
| `collection.serums.json` | 672557465927 | TRATAMIENTO / EN ESTADO PURO. |
| `collection.ritual-kits.json` | 672207995207 | NO SON BUNDLES. / SON PROTOCOLOS. |

---

### ASSETS TEMA (192983662919) — RESUMEN COMPLETO SESIÓN

| Archivo | Estado |
|---|---|
| `sections/nc-page-moisture-hero.liquid` | modificado |
| `sections/nc-page-moisture-caracteristicas.liquid` | modificado |
| `sections/nc-linea-intro.liquid` | NUEVO |
| `sections/nc-rituals-kits-intro.liquid` | NUEVO |
| `templates/page.moisture.json` | NUEVO |
| `templates/collection.moisture-collection.json` | modificado |
| `templates/collection.color-rescue.json` | NUEVO |
| `templates/collection.restore.json` | NUEVO |
| `templates/collection.scalp.json` | NUEVO |
| `templates/collection.styling.json` | NUEVO |
| `templates/collection.serums.json` | NUEVO |
| `templates/collection.ritual-kits.json` | NUEVO |

---

### PENDIENTES ACTIVOS

- ⚠️ `/pages/linea-color-rescue` — body_html paste manual pendiente
- ⚠️ `/pages/linea-styling` — sin contenido body_html
- ❌ Tracking pixels Meta + TikTok + Google: 0/10
- ❌ CRO Checkout — Bundle sin configurar
- ❌ EN descriptions bug (shopify-auto-translate EF)
- ❌ Social Media Agent: WABA en progreso. Tokens API bloqueados. Sin novedades.
- ⏳ Video Patricia Kit SOS — asset urgente TikTok, no grabado

---

### DECISIONES ARQUITECTÓNICAS

1. Nav → Collection directo. Sales Layer para ads/email únicamente.
2. Nurture integrado en collection page: hero + features + productos.
3. `nc-linea-intro` genérica para 5 líneas. `nc-rituals-kits-intro` dedicada para R&K.
4. Rituals & Kits en terracota `#C4622D` — diferenciación visual del resto del catálogo.
5. Bloque de autoría Patricia como diferenciador kits vs productos sueltos.

---

### APRENDIZAJES PERMANENTES (todos los de esta sesión)

31. **nc-rituals-kits-intro pattern:** colecciones con autoría/curación humana merecen sección dedicada con bloque de persona. Color distinto refuerza diferenciación en nav.
32. **Collections templateSuffix:** `collectionUpdate(input: {id, templateSuffix})` — múltiples mutations en un solo GraphQL query.
33. **Claude in Chrome:** Requiere `select_browser` por deviceId + permiso de dominio activo. Se desconecta en sesiones largas — re-seleccionar con `tool_search`.
34. **Tema NSCF — selectores `a[href*="handle"]`:** tema pinta links según handle de colección destino. CTA invisible = aplicar `style="color:#FAFAFA !important;"` inline. Diagnosticar con `getComputedStyle(btn).color` + matchingRules via JS.

---

### SOCIAL MEDIA AGENT — Sin novedades
Sin actividad nueva desde 2026-03-23.

---

_NeuroneSCF B2C · Unrealville Studio · session_log v2026-05-12-v3_
