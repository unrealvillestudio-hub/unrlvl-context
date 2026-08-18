# SKILL — ui-ux-layer · CORE
_UNRLVL Brand Visual Reference · Multimarca · B2C/B2B · Supabase-powered_
_Versión: 3.1 · 2026-05-22_
_Capas: Comunicación · Geometría · Psicología Visual · Instinto Fotográfico · Disrupción · **Vida y Movimiento**_

---

## INSTRUCCIÓN DE CARGA

Al inicio de cualquier sesión que produzca HTML / CSS / JS / React, Claude:

1. Lee este CORE completo
2. Identifica el `brand_id` activo — variante `_B2C` / `_B2B` si aplica
3. Consulta la TABLA DE ACTIVACIÓN DE MÓDULOS (abajo) y carga las extensiones necesarias
4. Carga paleta y tipografía desde Supabase (Sección 2)
5. Responde las 4 preguntas de comunicación (Sección 9) antes de diseñar
6. Elige la arquitectura de tensión (Sección 14) antes de hacer el layout
7. **Aplica al menos 3 ítems de SECCIÓN 17 (Vida y Movimiento) — OBLIGATORIO desde v3.1**

**Regla absoluta:** Nunca hardcodear colores ni fuentes sin pasar por este protocolo.
**Regla v3.0:** Nunca generar un output visual sin definir primero QUÉ comunica y QUÉ reacción busca provocar.
**Regla v3.1:** Nunca entregar un output visualmente correcto pero plano. Todo output tiene vida propia.

---

## TABLA DE ACTIVACIÓN DE MÓDULOS

| Proyecto | motion | 3d-spatial | mobile-ux | design-tokens | a11y |
|---|---|---|---|---|---|
| Dashboard web (DF, BI) | med | ❌ | ❌ | ❌ | med |
| Suite HTML report | med | ❌ | ❌ | ❌ | ❌ |
| App móvil campo (OPS) | ✅ | med | ✅ | ✅ | ✅ |
| App propietario (portal) | ✅ | med | ✅ | ✅ | ✅ |
| App calidad (IF/Sam/Irja) | med | ❌ | ✅ | med | med |
| Landing / propuesta cliente | ✅ | ✅ | med | ❌ | med |
| Portada acta / documento | ❌ | ❌ | ❌ | ❌ | ❌ |
| Email (mora / gestión) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Componente React/Next.js | med | med | med | ✅ | ✅ |
| App nativa (RN / Swift) | ✅ | med | ✅ | ✅ | ✅ |
| Momento hero / marketing | ✅ | ✅ | med | ❌ | med |

**Leyenda:** ✅ Cargar completo · med Cargar si el output lo justifica · ❌ No aplicable

---

## SECCIÓN 1 — UNRLVL DEFAULTS (Capa Base)

```css
:root {
  --bg-primary:    #080808;
  --bg-secondary:  #0F0F0F;
  --bg-tertiary:   #1A1A1A;
  --text-primary:  #F2F0EC;
  --text-secondary:#C8C4BC;
  --dust:          #6B6B6B;
  --accent:        #00FFD1;
  --accent-2:      #FFB800;
  --success:       #00FF88;
  --error:         #FF3B3B;
  --border-dim:    1px solid rgba(255,255,255,0.06);
  --border-mid:    1px solid rgba(255,255,255,0.12);
  --border-accent: 2px solid var(--accent);
  --font-display:  'Bebas Neue', Impact, sans-serif;
  --font-mono:     'Space Mono', 'Courier New', monospace;
  --font-body:     'Libre Baskerville', Georgia, serif;
}
```

---

## SECCIÓN 2 — MODELO DE HERENCIA B2C / B2B

```
Capa 0: UNRLVL defaults     (fallback final)
    ↓
Capa 1: brand_id base       ('NeuroneSCF')
    ↓
Capa 2: brand_id variante   ('NeuroneSCF_B2C' o 'NeuroneSCF_B2B')
    ↓
CSS vars finales del output
```

---

## SECCIÓN 3 — DATOS REALES POR MARCA

### ForumPHs — Amatista Carbon (COMPLETO)

**Paleta:**
| Nombre | Hex | CSS var | Uso |
|---|---|---|---|
| Amatista | `#5C3472` | `--am` / `--accent` | Primario institucional · CTAs · KPIs |
| Amatista Dark | `#3A1F4A` | `--am-d` | Headers premium · Footer |
| Amatista Tint | `#EAD9F5` | `--am-l` | KPI bg · Firma email |
| Forum Terra | `#C4622D` | `--terra` / `--accent-2` | Acento humano · Wordmark PH+s · **Tabs activos** |
| Carbon | `#1C2233` | `--carbon` | UI surface · Cards |
| Carbon Deep | `#0E1018` | `--carbon-d` | App bg · Hero bg |
| Ink | `#1A1612` | `--ink` | Texto sobre claro |
| Stone | `#6B6460` | `--stone` | Labels secundarios |
| Dust | `#B8B0A8` | `--dust` | Texto muy sutil |
| Parchment | `#F0EDE8` | `--parch` | Documentos · Actas |

```css
:root {
  --am:#5C3472; --am-d:#3A1F4A; --am-l:#EAD9F5; --am-footer:#E4D6F0;
  --terra:#C4622D;
  --carbon:#1C2233; --carbon-d:#0E1018;
  --ink:#1A1612; --stone:#6B6460; --dust:#B8B0A8; --parch:#F0EDE8;
  --accent:var(--am); --accent-2:var(--terra);
  --bg-primary:var(--carbon-d); --bg-secondary:var(--carbon);
  --text-primary:var(--parch); --text-secondary:var(--dust);
}
```

**Tipografía — 4 voces:**
| Familia | Peso | Rol |
|---|---|---|
| EB Garamond | 400/500/italic | Display institucional · Wordmark "Forum" · Headlines |
| Cormorant Garamond | 300/400/italic | Eyebrows · Citas · Texto ceremonial |
| Cinzel | 400/600 | Labels · Tags · Section headers |
| DM Sans | 300–700 | Cuerpo · UI · "PH"+"s" wordmark · Botones |

**Wordmark (siempre HTML/CSS — nunca imagen):**
```html
<span style="display:inline-flex;align-items:baseline;gap:0;line-height:1">
  <span style="font-family:'EB Garamond',serif;font-weight:400;color:#fff">Forum</span>
  <span style="font-family:'DM Sans',sans-serif;font-weight:700;color:var(--terra);letter-spacing:.06em">PH</span>
  <span style="font-family:'DM Sans',sans-serif;font-weight:700;color:var(--terra);letter-spacing:.04em">s</span>
</span>
```

---

## SECCIÓN 4 — MAPA DE ROLES → CSS VARS

| Role Supabase | CSS var | Fallback |
|---|---|---|
| `bg_primary` | `--bg-primary` | `#080808` |
| `accent` / `am` | `--accent` | `#00FFD1` |
| `accent_2` / `terra` | `--accent-2` | `#FFB800` |
| `display` | `--font-display` | `'Bebas Neue'` |
| `body` | `--font-body` | `'Libre Baskerville'` |

---

## SECCIÓN 5 — REGLAS INVARIANTES

- Footer: `border-top: 2px solid var(--accent)` — inviolable en todos los outputs
- Wordmark ForumPHs: siempre HTML/CSS. Nunca PNG.
- Tabs activos ForumPHs: siempre `color: var(--terra)` — nunca amatista
- Nunca mezclar paletas de marcas distintas en el mismo output

---

## SECCIÓN 6 — COMPONENTES BASE (multimarca)

```css
.btn-primary {
  font-family:var(--font-display); font-size:.875rem; letter-spacing:.1em;
  text-transform:uppercase; color:var(--bg-primary); background:var(--accent);
  border:none; padding:.75rem 1.5rem; cursor:pointer;
  transition:filter .15s, transform .1s;
}
.btn-primary:hover { filter:brightness(1.1); transform:translateY(-1px); }
.btn-secondary {
  color:var(--text-primary); background:transparent;
  border:1px solid rgba(255,255,255,0.2); padding:.75rem 1.5rem; cursor:pointer;
  transition:border-color .15s, color .15s;
}
.btn-secondary:hover { border-color:var(--accent); color:var(--accent); }
footer { border-top:2px solid var(--accent); padding:1.5rem 2rem; }
```

---

## SECCIÓN 7 — REFERENCIA brand_id

| brand_id | Acento | Supabase |
|---|---|---|
| `UnrealvilleStudio` | `#00FFD1` | ✅ |
| `NeuroneSCF` | `#0076A8` | ✅ |
| `ForumPHs` | `#5C3472` | ⚠️ pendiente |
| `LucienSael` | `#D4622A` | ⚠️ hardcoded |

---

## SECCIÓN 8 — LOADING STATES Y FEEDBACK

```css
.skeleton {
  background: linear-gradient(90deg,
    rgba(92,52,114,0.08) 25%, rgba(92,52,114,0.18) 50%, rgba(92,52,114,0.08) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.spinner {
  width:24px; height:24px;
  border:2px solid rgba(92,52,114,0.2); border-top-color:var(--am);
  border-radius:50%; animation:spin .8s linear infinite;
}
@keyframes spin { to { transform:rotate(360deg); } }
.state-empty {
  text-align:center; padding:64px 32px;
  color:rgba(240,237,232,0.25);
  font-family:'EB Garamond',serif; font-size:18px; font-style:italic;
}
```

---

## SECCIÓN 9 — PROTOCOLO DE COMUNICACIÓN PUBLICITARIA

### 9.1 — Preguntas obligatorias antes de diseñar

1. **¿QUÉ mensaje central queda grabado?**
2. **¿QUÉ reacción busca provocar?** (Confianza · Urgencia · Deseo · Curiosidad · Respeto)
3. **¿QUIÉN lo ve y en qué estado emocional llega?**
4. **¿QUÉ acción concreta toma después?**

### 9.2 — Jerarquía de atención

```
Nivel 1 — ANCHOR (0.3s)   → UN solo elemento. El número grande, el titular.
Nivel 2 — CONTEXT (1-2s)  → Explica el anchor.
Nivel 3 — DETAIL (5-30s)  → El resto.
Nivel 4 — ACTION          → El CTA.
```

### 9.3 — Triggers emocionales ForumPHs

| Trigger | Expresión visual |
|---|---|
| Confianza | Serif · Espacios amplios · Amatista dominante |
| Urgencia calibrada | Terra 15-20% · DM Sans Bold 700 |
| Respeto patrimonial | Cormorant display · Carbon Deep |
| Claridad | SVG charts limpios · Labels Cinzel |

### 9.4 — Reglas de copy

- El titular dice el beneficio, no la función
- Un elemento visual = un mensaje
- El blanco es silencio que hace que lo importante se oiga

---

## SECCIÓN 10 — GEOMETRÍA Y TENSIÓN VISUAL

### 10.1 — Sistemas de proporción

```
Regla áurea (φ = 1.618):  altura_menor = altura_mayor / 1.618
Escala modular (1.25):     base 14px → 11/14/17.5/22/27.5/34/43px
Fibonacci spacing:         8 13 21 34 55 89px
```

### 10.2 — Simetría vs Asimetría

```
SIMETRÍA   → confianza, autoridad. Portadas, confirmaciones, grids KPIs.
ASIMETRÍA  → movimiento, tensión. 38/62 — no 50/50.
```

### 10.3 — Técnicas de tensión geométrica

```css
/* Ghost number — matemáticas como textura */
.with-ghost::before {
  content: attr(data-number); position:absolute;
  font-size:240px; font-weight:700; color:rgba(92,52,114,0.04);
  top:-40px; right:-20px; pointer-events:none;
}
/* Overlap */
.overlap-kpi { margin-top:-24px; position:relative; z-index:2; }
/* Badge rotado */
.badge-rotated { transform:rotate(-2deg); }
```

---

## SECCIÓN 11 — PROTOCOLO ANTI-GENÉRICO

### 11.1 — Checklist (mínimo 3 de estos por output)

- [ ] Escala inesperada
- [ ] Asimetría deliberada
- [ ] Color inesperado en lugar inesperado
- [ ] Tipografía de contraste extremo — Cormorant 72px junto a DM Sans 9px
- [ ] Espacio vacío agresivo
- [ ] Elemento que sangra
- [ ] Densidad variable
- [ ] Movimiento implícito

### 11.2 — Proporciones de uso de color ForumPHs

```
80% Carbon Deep + Carbon
12% Parchment + Dust
5%  Amatista + Tint
3%  Forum Terra — el ojo va directo ahí
```

### 11.3 — Instinto fotográfico en UI

```
Profundidad de campo: elementos secundarios opacity 0.35-0.45
Luz y sombra: radial-gradient top-right amatista
Leading lines: border-left terra → apunta al CTA
```

---

## SECCIÓN 12 — CHECKLIST ICR v3.1

**Comunicación:**
- [ ] Mensaje central en una frase
- [ ] Reacción objetivo definida
- [ ] Jerarquía anchor / context / detail / action trazada

**Brand compliance:**
- [ ] brand_id identificado
- [ ] Google Fonts desde css_import real
- [ ] Footer con border-top: 2px solid var(--accent)
- [ ] Tabs activos con var(--terra)

**Geometría:**
- [ ] Proporción del layout definida
- [ ] Al menos un elemento de tensión geométrica

**Psicología + Tensión:**
- [ ] Arquitectura T1-T10 elegida
- [ ] Proporciones de color 80/12/5/3% respetadas

**Anti-genérico:**
- [ ] Al menos 3 ítems del checklist 11.1
- [ ] Al menos un principio fotográfico

**Vida y Movimiento (v3.1 — NUEVO):**
- [ ] Al menos 3 ítems de Sección 17
- [ ] Background no es un color plano
- [ ] Al menos 1 micro-interacción en elementos interactivos
- [ ] Al menos 1 animación ambient (glow, shimmer, breathe)
- [ ] Hover states definidos en TODO elemento clickeable

---

## SECCIÓN 13 — VISUAL_PSYCHO · 10 Presets

| Preset | Expresión visual | Usar en |
|---|---|---|
| PSY-TRUST | Serif · espacio amplio · Amatista | Informes JD · EEFF |
| PSY-URGENCY | Terra 15-20% · DM Sans Bold | Mora F-III/F-IV |
| PSY-AUTHORITY | Cormorant display · Carbon Deep | Propuestas · Portadas |
| PSY-SOCIAL-PROOF | Números históricos + comparativas | Dashboards |
| PSY-BELONGING | Nombre edificio prominente | Portal propietario |
| PSY-ASPIRATION | Espacio generoso · verde en números altos | Propuestas |
| PSY-CURIOSITY | Fragmentación · ghost numbers · open loops | Heroes |
| PSY-IDENTITY | "Su edificio" · métricas personalizadas | Informes logros |
| PSY-FOMO | Comparativa con/sin ForumPHs | Propuesta nuevo cliente |
| PSY-SCARCITY | Oportunidad perdida por tiempo | Cart abandonment |

---

## SECCIÓN 14 — VISUAL_TENSION_ARCHITECTURE · T1-T10

| Código | Nombre | Cuándo |
|---|---|---|
| T1 | INVERTED_PYRAMID | Informes · Dashboards |
| T2 | EARLY_SPIKE | Propuestas · Portadas |
| T3 | ESCALATING_LADDER | Suites HTML multi-panel |
| T4 | MICRO_TENSIONS | Dashboards multi-métrica |
| T5 | VALLEY_AND_PEAK | Informes largos |
| T6 | SUSTAINED_LOW_PRESSURE | Portales · Emails ordinarios |
| T7 | RELEASE_REBUILD | Comunicaciones mora multi-fase |
| T8 | COLD_OPEN_BURN | Covers de alto rendimiento |
| T9 | HEARTBEAT | Grid KPIs con dato crítico |
| T10 | QUIET_KNIFE | Alertas F-IV · Situaciones graves |

---

## SECCIÓN 15 — VISUAL_GENOME · 6 Firmas ForumPHs

```
FIRMA 1 — Número grande como protagonista · EB Garamond 80px+ · MAX 1 por output
FIRMA 2 — Radial gradient Amatista top-right · MAX 1 por output
FIRMA 3 — border-left: 3px solid var(--terra) · MAX 2 por output
FIRMA 4 — Divider 3px Amatista
FIRMA 5 — Labels Cinzel 8px / letter-spacing .2em
FIRMA 6 — Cormorant display momento editorial · MAX 1 por output
```

**Prohibiciones:**
```
❌ Gradientes en botones
❌ Sombras de colores (solo rgba negros)
❌ border-radius > 12px en cards principales
❌ Emojis en contextos institucionales
❌ Background plano sin textura ni profundidad (v3.1)
❌ Elementos interactivos sin hover state definido (v3.1)
```

---

## SECCIÓN 16 — ARQUITECTURA DE LAYERS

```
L0  BRIEF VISUAL          → QUÉ comunica · QUÉ reacción · QUIÉN · QUÉ acción
L1  BRAND COMPLIANCE      → Paleta · Tipografía · CSS vars
L2  JERARQUÍA             → Anchor / Context / Detail / Action
L3  GEOMETRÍA             → Proporción · Grid · Tensión
L4  VISUAL_PSYCHO         → Presets psicológicos
L5  VISUAL_TENSION        → Arquitectura T1-T10
L6  VISUAL_GENOME         → 6 Firmas ejecutables
L7  RIESGO VISUAL         → Checklist anti-genérico
L8  LOADING STATES        → Skeleton · Spinner · Success/Error
L9  ICR                   → Checklist completo
L10 VIDA Y MOVIMIENTO     → Sección 17 — NUEVO v3.1
```

---

## SECCIÓN 17 — VIDA Y MOVIMIENTO (v3.1 — NUEVO)

**Principio rector:** Un output visualmente correcto pero sin vida es un output a medias.
El diferenciador de marca no está solo en los colores o la tipografía —
está en los micro-momentos que hacen que el usuario sienta que el producto respira.

### 17.1 — Por qué importa

Un output plano comunica mediocridad aunque el contenido sea excelente.
Los micro-detalles de movimiento operan en la percepción subconsciente:
- Grain sutil → textura = profundidad = calidad artesanal
- Glow ambient → luz viva = el sistema está activo, no estático
- Dot que respira → feedback de "estoy aquí" sin texto
- Shimmer en separadores → invitación implícita a moverse, a seguir
- Hover que responde → señal de que el objeto es interactivo antes del click

### 17.2 — Recursos gráficos de background (mínimo 1 por output UI)

**A. Grain / Noise (textura artesanal)**
```css
/* Grain SVG inline — cero dependencias, peso ~0.3kb */
body::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat; background-size: 180px 180px;
}
/* Opacidad: 0.03-0.05 oscuro · 0.02-0.04 claro · > 0.07 = visible → reducir */
```

**B. Vignette (profundidad perimetral)**
```css
body::after {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 120% 80% at 50% 50%,
    transparent 40%, rgba(8,6,14,0.45) 100%);
}
```

**C. Ambient glow (luz que respira)**
```css
/* Amatista — profundidad institucional */
.glow-am {
  position: fixed; top: -120px; right: -80px;
  width: 480px; height: 480px; border-radius: 50%;
  background: radial-gradient(circle, rgba(92,52,114,0.12) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
  animation: glow-drift 12s ease-in-out infinite alternate;
}
/* Terra — calidez humana, siempre más pequeño y sutil que el amatista */
.glow-terra {
  position: fixed; bottom: -100px; left: -60px;
  width: 320px; height: 320px; border-radius: 50%;
  background: radial-gradient(circle, rgba(196,98,45,0.07) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
  animation: glow-drift 16s ease-in-out infinite alternate-reverse;
}
@keyframes glow-drift {
  0%   { transform: translate(0,0) scale(1); opacity: .8; }
  100% { transform: translate(20px,30px) scale(1.08); opacity: 1; }
}
```

**D. Grid lines (estructura invisible)**
```css
.app-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(92,52,114,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(92,52,114,0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  /* Fade en los bordes — no cuadrícula abrupta */
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
}
/* Nota: solo visible si el bg es muy oscuro. En Carbon (#1C2233) no hace falta. */
```

**E. Scanlines (textura técnica — para dashboards BI)**
```css
.scanlines::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(92,52,114,0.015) 2px, rgba(92,52,114,0.015) 4px
  );
}
```

**Reglas de uso:**
- Grain + Vignette: siempre juntos. Uno sin el otro se ve incompleto.
- Ambient glow: uno Amatista (grande) + uno Terra (más pequeño, opuesto). Nunca dos del mismo color.
- Grid lines: solo en dashboards / UI técnica. No en documentos ni emails.
- Scanlines: solo en panels de datos, nunca en navegación ni formularios.
- **Todo en `z-index: 0` · Todo el contenido en `z-index: 1`**

### 17.3 — Animaciones de UI (micro-interacciones)

**A. Shimmer en separadores / líneas de acento**
```css
/* Top edge del navbar, dividers importantes */
.shimmer-line {
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(196,98,45,0.55) 30%,
    rgba(92,52,114,0.65) 65%,
    transparent 100%);
  animation: shimmer-pan 4s ease-in-out infinite;
}
@keyframes shimmer-pan {
  0%,100% { opacity: .2; } 50% { opacity: .65; }
}
```

**B. Dot que respira (indicador de estado activo)**
```css
/* En tabs activos, estados live, indicadores de conexión */
.dot-breathe {
  animation: dot-breathe 2.5s ease-in-out infinite;
}
@keyframes dot-breathe {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: .5; transform: scale(0.65); }
}
```

**C. Heartbeat KPI (T9 — el dato crítico late)**
```css
/* Solo en UN card por grid. El resto estático. */
.kpi-heartbeat {
  animation: hb-pulse 3s ease-in-out infinite;
}
@keyframes hb-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(92,52,114,0); }
  30%     { box-shadow: 0 0 0 6px rgba(92,52,114,0.18); }
  60%     { box-shadow: 0 0 0 12px rgba(92,52,114,0); }
}
```

**D. KPI reveal (entrada de números)**
```css
.kpi-reveal {
  animation: kpi-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
}
@keyframes kpi-in {
  from { opacity:0; transform:translateY(10px) scale(0.97); }
  to   { opacity:1; transform:none; }
}
```

**E. Fade-in de contenido**
```css
.fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in {
  from { opacity:0; transform:translateY(8px); }
  to   { opacity:1; transform:none; }
}
```

**F. Entrada snap (elementos secundarios con resorte)**
```css
.snap-in {
  animation: snap-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
}
@keyframes snap-in {
  from { opacity:0; transform:scale(0.92); }
  to   { opacity:1; transform:none; }
}
```

### 17.4 — Hover states (TODOS los elementos interactivos)

Regla: **si es clickeable, tiene hover**. Sin excepción.

```css
/* Patrón mínimo para cualquier elemento interactivo */
.interactive {
  transition: all 0.15s ease;
  cursor: pointer;
}
/* Cards */
.card:hover {
  border-color: rgba(92,52,114,0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
/* Botones — nunca gradiente, siempre brightness */
.btn:hover:not(:disabled) {
  filter: brightness(1.12);
  transform: translateY(-1px);
}
/* Links de nav */
.nav-link:hover {
  color: rgba(240,237,232,0.7);
  background: rgba(196,98,45,0.08);
  border-color: rgba(196,98,45,0.25);
}
/* Rows de tabla */
.table-row:hover { background: rgba(92,52,114,0.06); }
/* Tags / badges */
.badge:hover { filter: brightness(1.1); }
```

### 17.5 — Reglas de proporción y control

```
AMBIENT (grain, glow, grid):
  Siempre en position:fixed · z-index:0
  Todo contenido en z-index:1 o superior
  prefers-reduced-motion: grain off · glow animation off

ANIMACIONES:
  Duración: 150ms (micro) · 250-400ms (transición) · 2-4s (ambient/breathe)
  Easing: ease-out para entradas · cubic-bezier(0.34,1.56,0.64,1) para snaps
  Nunca más de 2 animaciones de entrada simultáneas en la misma pantalla

OUTPUTS EXCLUIDOS:
  ❌ Documentos / Actas (superficie Parchment — sin grain, sin glow)
  ❌ Emails — sin animaciones CSS
  ❌ PDFs — sin animaciones
  ✅ UI apps, dashboards, suites HTML, landings, NavTabs

CHECKLIST MÍNIMO (3 de estos por output UI):
  [ ] Background con grain o glow (no plano)
  [ ] Al menos 1 shimmer en separador o línea de acento
  [ ] Hover states en todos los elementos clickeables
  [ ] Al menos 1 animación de entrada (fade-in, kpi-reveal, snap-in)
  [ ] Dot/indicador que respira si hay estado "activo"
  [ ] Heartbeat en el KPI más crítico (si aplica T9)
  [ ] Transición definida en todos los cambios de estado
```

### 17.6 — El "toque especial" — qué es y cómo se aplica

Un output con "toque especial" tiene:

1. **Una textura** — el fondo no es un flat color, respira con grain o glow
2. **Una luz** — ambient glow en la esquina correcta que da profundidad sin distracción
3. **Un guiño** — shimmer, dot que respira, o heartbeat que le dice al usuario "esto está vivo"
4. **Una invitación** — hover states que anticipan antes del click
5. **Una entrada** — al menos el elemento principal entra con animación (no aparece sin más)

La diferencia entre bonito-y-plano y bonito-con-carácter es exactamente esto:
el usuario no puede nombrar qué es diferente, pero lo siente. Esa sensación ES la marca.

---

_ui-ux-layer CORE v3.1 · Unrealville Studio · 2026-05-22_
_Extensiones: motion.md · 3d-spatial.md · mobile-ux.md · design-tokens.md · a11y.md_
