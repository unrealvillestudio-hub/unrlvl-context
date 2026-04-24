# SKILL — ui-ux-layer v2.1
_UNRLVL Brand Visual Reference · Multimarca · B2C/B2B · Supabase-powered_
_Versión: 2.1 · 2026-04-24_

---

## INSTRUCCIÓN DE CARGA

Al inicio de cualquier sesión que produzca HTML / CSS / JS / React, Claude:

1. Lee este skill completo
2. Identifica el `brand_id` activo — incluyendo variante si aplica (`_B2C` / `_B2B`)
3. Ejecuta las queries de Supabase con el modelo de herencia (Sección 2)
4. Genera CSS vars finales con el sistema de merge (Sección 3)
5. Todo output visual usa esas vars — sin improvisar colores ni tipografías

**Regla absoluta:** Nunca hardcodear colores ni fuentes sin pasar por este protocolo.

---

## SECCIÓN 1 — UNRLVL DEFAULTS (Capa Base)

Aplican siempre para outputs de Unreal>ille Studio y como fallback final.

**Paleta real (Supabase — brand_id = 'UnrealvilleStudio'):**

| Rol | CSS var | Hex | Uso |
|---|---|---|---|
| bg_primary | `--bg-primary` | `#080808` | Fondo dominante |
| bg_secondary | `--bg-secondary` | `#0F0F0F` | Footer, panels |
| bg_tertiary | `--bg-tertiary` | `#1A1A1A` | Cards, layers |
| text_primary | `--text-primary` | `#F2F0EC` | Texto principal |
| accent_primary | `--accent` | `#00FFD1` | Único acento UNRLVL |

**Tipografía real (Supabase — brand_id = 'UnrealvilleStudio'):**

| Rol | CSS var | Font | css_import |
|---|---|---|---|
| display | `--font-display` | Bebas Neue | `family=Bebas+Neue` |
| mono | `--font-mono` | Space Mono | `family=Space+Mono:ital,wght@0,400;0,700;1,400` |
| body | `--font-body` | Libre Baskerville | `family=Libre+Baskerville:ital,wght@0,400;0,700;1,400` |

```css
/* UNRLVL defaults completos */
:root {
  --bg-primary:   #080808;
  --bg-secondary: #0F0F0F;
  --bg-tertiary:  #1A1A1A;
  --text-primary: #F2F0EC;
  --text-secondary:#C8C4BC;
  --dust:         #6B6B6B;
  --accent:       #00FFD1;
  --accent-2:     #FFB800;
  --success:      #00FF88;
  --error:        #FF3B3B;
  --border-dim:   1px solid rgba(255,255,255,0.06);
  --border-mid:   1px solid rgba(255,255,255,0.12);
  --border-accent:2px solid var(--accent);
  --font-display: 'Bebas Neue', Impact, sans-serif;
  --font-mono:    'Space Mono', 'Courier New', monospace;
  --font-body:    'Libre Baskerville', Georgia, serif;
}
```

---

## SECCIÓN 2 — MODELO DE HERENCIA B2C / B2B

### El problema que resuelve

Una marca como NeuroneSCF tiene contextos distintos:
- **B2C** — tienda pública, consumidor final, acento azul, tono aspiracional
- **B2B** — portal profesional, salones y distribuidores, acento navy oscuro, tono técnico-autoridad

La mayoría de los datos son compartidos (productos, compliance, keywords, historia). Solo cambian los datos visuales y de tono. Duplicar todo sería costoso de mantener.

### La solución: herencia en 3 capas

```
Capa 0: UNRLVL defaults          (fallback final — este skill)
    ↓
Capa 1: brand_id base            (ej: 'NeuroneSCF' — shared data)
    ↓
Capa 2: brand_id variante        (ej: 'NeuroneSCF_B2C' o 'NeuroneSCF_B2B' — overrides)
    ↓
CSS vars finales
```

### Queries con herencia

```sql
-- PASO 1: cargar paleta de la variante (ej: NeuroneSCF_B2C)
SELECT role, hex, name, usage
FROM public.brand_palette
WHERE brand_id = 'NeuroneSCF_B2C'
ORDER BY role;

-- PASO 2: si algún rol no existe en la variante, cargar del brand base
SELECT role, hex, name, usage
FROM public.brand_palette
WHERE brand_id = 'NeuroneSCF'
AND role NOT IN (
  SELECT role FROM public.brand_palette WHERE brand_id = 'NeuroneSCF_B2C'
)
ORDER BY role;

-- PASO 3: mismo patrón para tipografía
SELECT role, font_family, css_import, fallback
FROM public.brand_typography
WHERE brand_id = 'NeuroneSCF_B2C';

-- Si vacío, usar base:
SELECT role, font_family, css_import, fallback
FROM public.brand_typography
WHERE brand_id = 'NeuroneSCF';
```

### En JavaScript (para artifacts con runtime):

```javascript
async function loadBrandVisuals(brandId) {
  // Extraer base si hay variante (NeuroneSCF_B2C → NeuroneSCF)
  const baseBrandId = brandId.includes('_B2C') || brandId.includes('_B2B')
    ? brandId.split('_')[0]
    : brandId;

  const [variantPalette, basePalette, variantTypo, baseTypo] = await Promise.all([
    fetchSupabase(`brand_palette?brand_id=eq.${brandId}`),
    fetchSupabase(`brand_palette?brand_id=eq.${baseBrandId}`),
    fetchSupabase(`brand_typography?brand_id=eq.${brandId}`),
    fetchSupabase(`brand_typography?brand_id=eq.${baseBrandId}`)
  ]);

  // Merge: variante sobrescribe base
  const paletteRoles = new Map();
  basePalette.forEach(r => paletteRoles.set(r.role, r));
  variantPalette.forEach(r => paletteRoles.set(r.role, r)); // override

  const typoRoles = new Map();
  baseTypo.forEach(r => typoRoles.set(r.role, r));
  variantTypo.forEach(r => typoRoles.set(r.role, r)); // override

  return {
    palette: [...paletteRoles.values()],
    typography: [...typoRoles.values()]
  };
}
```

---

## SECCIÓN 3 — DATOS REALES POR MARCA

### NeuroneSCF — brand base (shared)

Paleta compartida B2C + B2B:
- `primary` → `#000000` Negro Neurone
- `neutral` → `#FAFAFA` Blanco Neurone
- `editorial` → `#C27D5B` Terracota (voz PO)
- Líneas de producto: moisture `#0076A8`, restore `#C27D5B`, color_rescue `#41273B`, pro_salon `#003A70`, styling `#3F3E3F`, scalp `#FAFAFA`

### NeuroneSCF_B2C — Consumer (override)

```css
/* Override B2C sobre base NeuroneSCF */
--accent:      #0076A8;   /* Azul Neurone — CTAs, links, acción */
--accent-pro:  #C27D5B;   /* Terracota — calidez, voz PO */
/* bg, text → del brand base */
```
Tipografía: PT Sans Narrow (display) + Montserrat (body) — del brand base
Tono: consumer, aspiracional, bilingual ES/EN

### NeuroneSCF_B2B — Professional Portal (override)

```css
/* Override B2B — UI distinta del B2C */
--accent:       #003A70;  /* Navy Pro Salon — autoridad técnica */
--accent-2:     #0076A8;  /* Azul como secundario en B2B */
--bg-primary:   #000000;  /* más oscuro, más serio */
--text-primary: #FAFAFA;
```
Tipografía: puede heredar del base o tener pesos más bold
Tono: técnico-profesional, B2B authority, precio/volumen

### Agregar a Supabase cuando Sam confirme datos B2B

```sql
-- brand_palette override B2B
INSERT INTO public.brand_palette (brand_id, role, name, hex, usage) VALUES
('NeuroneSCF_B2B', 'accent', 'Navy Pro', '#003A70', 'Acento principal portal B2B'),
('NeuroneSCF_B2B', 'accent_secondary', 'Azul Neurone', '#0076A8', 'Acento secundario B2B');

-- brands row para que el FK sea válido
INSERT INTO public.brands (id, display_name, type, status) VALUES
('NeuroneSCF_B2C', 'Neurone SCF — Consumer', 'brand_variant', 'active'),
('NeuroneSCF_B2B', 'Neurone SCF — Professional', 'brand_variant', 'active');
```

---

## SECCIÓN 4 — MAPA DE ROLES → CSS VARS

| Role Supabase | CSS var | Fallback |
|---|---|---|
| `bg_primary` / `primary` | `--bg-primary` | `#080808` |
| `bg_secondary` | `--bg-secondary` | `#0F0F0F` |
| `bg_tertiary` | `--bg-tertiary` | `#1A1A1A` |
| `text_primary` / `neutral` | `--text-primary` | `#F2F0EC` |
| `text_secondary` | `--text-secondary` | `#C8C4BC` |
| `accent` / `accent_primary` | `--accent` | `#00FFD1` |
| `accent_secondary` | `--accent-2` | `#FFB800` |
| `pro` / `accent_pro` | `--accent-pro` | `--accent` |
| `editorial` | `--accent-editorial` | `--accent-2` |
| `linea_*` | `--linea-[nombre]` | ninguno |
| `display` / `headline` | `--font-display` | `'Bebas Neue'` |
| `mono` | `--font-mono` | `'Space Mono'` |
| `body` | `--font-body` | `'Libre Baskerville'` |

---

## SECCIÓN 5 — REGLAS INVARIANTES

Estas reglas nunca cambian independientemente de la marca o contexto:

- Footer: `border-top: 2px solid var(--accent)` — inviolable
- Logotipo UNRLVL con chevron-blink solo en outputs del studio
- Spacing scale, border vars, status colors son universales
- `--font-mono` como fallback para UI técnica aunque la marca no defina mono
- Nunca mezclar paletas de marcas distintas en el mismo output
- Paleta Lucien Sael nunca mezclada con paleta UNRLVL

---

## SECCIÓN 6 — LUCIEN SAEL (standalone)

```css
:root {
  --bg-primary:    #0D0D0B;
  --bg-secondary:  #1C1C1A;
  --text-primary:  #EDE8DF;
  --text-secondary:#C4BDB0;
  --accent:        #D4622A;  /* ember */
  --accent-2:      #B8922A;  /* gold */
  --font-display:  'Cormorant Garamond', serif;
  --font-body:     'Crimson Pro', serif;
  --font-mono:     'JetBrains Mono', monospace;
}
```

---

## SECCIÓN 7 — COMPONENTES (usan vars genéricas — multimarca)

```css
.btn-primary {
  font-family: var(--font-display); font-size:.875rem;
  letter-spacing:.1em; text-transform:uppercase;
  color:var(--bg-primary); background:var(--accent);
  border:none; padding:.75rem 1.5rem; cursor:pointer;
  transition:filter .15s,transform .1s;
}
.btn-primary:hover { filter:brightness(1.1); transform:translateY(-1px); }

.btn-secondary {
  font-family:var(--font-display); letter-spacing:.08em; text-transform:uppercase;
  color:var(--text-primary); background:transparent;
  border:1px solid rgba(255,255,255,0.2); padding:.75rem 1.5rem; cursor:pointer;
  transition:border-color .15s,color .15s;
}
.btn-secondary:hover { border-color:var(--accent); color:var(--accent); }

.card { background:var(--bg-secondary); border:var(--border-dim); padding:1.5rem; }
.card-accent { border-left:2px solid var(--accent); }
.card:hover  { border-color:rgba(255,255,255,.12); }

.input {
  font-family:var(--font-body); font-size:.875rem;
  color:var(--text-primary); background:var(--bg-secondary);
  border:1px solid rgba(255,255,255,.1); padding:.75rem 1rem; width:100%; outline:none;
}
.input:focus { border-color:var(--accent); }
.input::placeholder { color:var(--dust,#6B6B6B); }

footer {
  border-top:2px solid var(--accent);
  padding:1.5rem 2rem; background:var(--bg-primary);
  font-family:var(--font-display); font-size:.875rem;
}

@keyframes chevron-blink { 0%,100%,65%{opacity:1} 50%,60%{opacity:0} }
```

---

## SECCIÓN 8 — REFERENCIA RÁPIDA brand_id

| brand_id | Marca | Acento | Hereda de | Supabase |
|---|---|---|---|---|
| `UnrealvilleStudio` | UNRLVL | `#00FFD1` | — | ✅ completo |
| `NeuroneSCF` | Neurone base | `#0076A8` | — | ✅ palette completa |
| `NeuroneSCF_B2C` | Neurone Consumer | `#0076A8` | NeuroneSCF | ⚠️ pendiente fila en brands |
| `NeuroneSCF_B2B` | Neurone Pro | `#003A70` | NeuroneSCF | ⚠️ pendiente confirmar datos B2B |
| `LucienSael` | Lucien Sael | `#D4622A` | — | ⚠️ hardcoded (no en Supabase aún) |
| `DiamondDetails` | Diamond Details | — | — | ❌ pendiente |
| `VizosCosmetics` | Vizos | — | — | ❌ pendiente |
| `D7Herbal` | D7 Herbal | — | — | ❌ pendiente |
| `ForumPHs` | ForumPHs | — | — | ❌ pendiente |

---

## SECCIÓN 9 — CHECKLIST ICR

- [ ] `brand_id` identificado — incluyendo variante `_B2C` / `_B2B` si aplica
- [ ] Herencia resuelta: variante → base → UNRLVL defaults
- [ ] Google Fonts import generado desde `css_import` real de Supabase
- [ ] Cero hex hardcodeados en componentes — todo via `var(--*)`
- [ ] `--accent` único acento primario por contexto
- [ ] Footer con `border-top: 2px solid var(--accent)` presente
- [ ] No se mezclan paletas de marcas o contextos distintos
- [ ] Hover states definidos en todos los interactivos

---

_SKILL ui-ux-layer v2.1 · Unreal>ille Studio · Multimarca · B2C/B2B inheritance · Supabase-powered_
