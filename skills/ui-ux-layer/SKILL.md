# SKILL — ui-ux-layer · CORE
_UNRLVL Brand Visual Reference · Multimarca · B2C/B2B · Supabase-powered_
_Versión: 3.0 · 2026-05-21_
_Capas: Comunicación · Geometría · Psicología Visual · Instinto Fotográfico · Disrupción_

---

## INSTRUCCIÓN DE CARGA

Al inicio de cualquier sesión que produzca HTML / CSS / JS / React, Claude:

1. Lee este CORE completo
2. Identifica el `brand_id` activo — variante `_B2C` / `_B2B` si aplica
3. Consulta la TABLA DE ACTIVACIÓN DE MÓDULOS (abajo) y carga las extensiones necesarias
4. Carga paleta y tipografía desde Supabase (Sección 2)
5. Responde las 4 preguntas de comunicación (Sección 9) antes de diseñar
6. Elige la arquitectura de tensión (Sección 14) antes de hacer el layout

**Regla absoluta:** Nunca hardcodear colores ni fuentes sin pasar por este protocolo.
**Regla nueva v3.0:** Nunca generar un output visual sin definir primero QUÉ comunica y QUÉ reacción busca provocar.

---

## TABLA DE ACTIVACIÓN DE MÓDULOS

Cargar extensiones según el tipo de proyecto. El CORE siempre activo.

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

Aplican siempre. Fallback final para cualquier marca sin datos en Supabase.

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

Queries Supabase — herencia completa:
```sql
-- 1. Paleta variante
SELECT role, hex FROM brand_palette WHERE brand_id = 'NeuroneSCF_B2C';
-- 2. Completar roles del base que falten en la variante
SELECT role, hex FROM brand_palette WHERE brand_id = 'NeuroneSCF'
  AND role NOT IN (SELECT role FROM brand_palette WHERE brand_id = 'NeuroneSCF_B2C');
-- 3. Tipografía (igual lógica)
SELECT role, font_family, css_import FROM brand_typography
  WHERE brand_id = 'NeuroneSCF_B2C';
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
| Forum Terra | `#C4622D` | `--terra` / `--accent-2` | Acento humano · Wordmark PH+s |
| Carbon | `#1C2233` | `--carbon` | UI surface · Cards |
| Carbon Deep | `#0E1018` | `--carbon-d` | App bg · Hero bg |
| Ink | `#1A1612` | `--ink` | Texto sobre claro |
| Stone | `#6B6460` | `--stone` | Labels secundarios |
| Dust | `#B8B0A8` | `--dust` | Texto muy sutil |
| Parchment | `#F0EDE8` | `--parch` | Documentos · Actas |
| Email Footer Tint | `#E4D6F0` | `--am-footer` | Footer email |

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
| EB Garamond | 400/500/italic | Display institucional · Wordmark "Forum" · Headlines · Subject email |
| Cormorant Garamond | 300/400/italic | Eyebrows · Nombre PH portadas · Citas · Texto ceremonial |
| Cinzel | 400/600 | Labels · Tags · Section headers · Caps institucionales |
| DM Sans | 300–700 | Cuerpo · UI · "PH"+"s" wordmark · Botones · Datos numéricos |

Google Fonts:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cinzel:wght@400;600&family=DM+Sans:wght@300;400;500;600;700&display=swap
```

**Wordmark (siempre HTML/CSS — nunca imagen):**
```html
<span style="display:inline-flex;align-items:baseline;gap:0;line-height:1">
  <span style="font-family:'EB Garamond',serif;font-weight:400;color:#fff">Forum</span>
  <span style="font-family:'DM Sans',sans-serif;font-weight:700;color:var(--terra);letter-spacing:.06em">PH</span>
  <span style="font-family:'DM Sans',sans-serif;font-weight:700;color:var(--terra);letter-spacing:.04em">s</span>
</span>
```

**Superficies:**
| Contexto | bg | text |
|---|---|---|
| App / UI dark | `--carbon-d` | `--parch` |
| Cards UI | `--carbon` | `--parch` |
| Documentos / Actas | `--parch` | `--ink` |
| Email main | `#F8F5F2` | `--ink` |
| Email top strip | `--carbon` | `#fff` |
| Email KPIs | `#F0ECF8` | `--am` |
| Email firma | `--am-l` | `--am` |

---

### NeuroneSCF B2C / B2B
B2C: `--accent: #0076A8` · PT Sans Narrow + Montserrat
B2B: `--accent: #003A70`, `--bg-primary: #000000`

### Lucien Sael
```css
--bg-primary:#0D0D0B; --accent:#D4622A; --accent-2:#B8922A;
--font-display:'Cormorant Garamond',serif; --font-body:'Crimson Pro',serif;
```

---

## SECCIÓN 4 — MAPA DE ROLES → CSS VARS

| Role Supabase | CSS var | Fallback |
|---|---|---|
| `bg_primary` | `--bg-primary` | `#080808` |
| `bg_document` | `--bg-document` | `#F0EDE8` |
| `accent` / `am` | `--accent` | `#00FFD1` |
| `accent_2` / `terra` | `--accent-2` | `#FFB800` |
| `am_d` | `--am-d` | `#3A1F4A` |
| `am_l` | `--am-l` | `#EAD9F5` |
| `display` | `--font-display` | `'Bebas Neue'` |
| `body` | `--font-body` | `'Libre Baskerville'` |
| `mono` | `--font-mono` | `'Space Mono'` |

---

## SECCIÓN 5 — REGLAS INVARIANTES

- Footer: `border-top: 2px solid var(--accent)` — inviolable en todos los outputs del studio
- Wordmark ForumPHs: siempre HTML/CSS. Nunca PNG.
- Nunca mezclar paletas de marcas distintas en el mismo output
- Paleta Lucien Sael aislada del resto del ecosistema

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
  font-family:var(--font-display); letter-spacing:.08em; text-transform:uppercase;
  color:var(--text-primary); background:transparent;
  border:1px solid rgba(255,255,255,0.2); padding:.75rem 1.5rem; cursor:pointer;
  transition:border-color .15s, color .15s;
}
.btn-secondary:hover { border-color:var(--accent); color:var(--accent); }

.card { background:var(--bg-secondary); border:var(--border-dim); padding:1.5rem; }
.card-accent { border-left:2px solid var(--accent); }
.input {
  font-family:var(--font-body); color:var(--text-primary);
  background:var(--bg-secondary); border:1px solid rgba(255,255,255,.1);
  padding:.75rem 1rem; outline:none; width:100%;
}
.input:focus { border-color:var(--accent); }
footer { border-top:2px solid var(--accent); padding:1.5rem 2rem; }
```

---

## SECCIÓN 7 — REFERENCIA brand_id

| brand_id | Acento | Supabase |
|---|---|---|
| `UnrealvilleStudio` | `#00FFD1` | ✅ |
| `NeuroneSCF` | `#0076A8` | ✅ |
| `ForumPHs` | `#5C3472` | ⚠️ pendiente insertar tablas UNRLVL |
| `LucienSael` | `#D4622A` | ⚠️ hardcoded |

---

## SECCIÓN 8 — LOADING STATES Y FEEDBACK DE ESTADO

Todo output interactivo debe tener los 4 estados visualizados. La ausencia de feedback es percibida como error.

```css
/* Skeleton shimmer — para carga de datos */
.skeleton {
  background: linear-gradient(90deg,
    rgba(92,52,114,0.08) 25%,
    rgba(92,52,114,0.18) 50%,
    rgba(92,52,114,0.08) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

/* Spinner — para operaciones activas */
.spinner {
  width: 24px; height: 24px;
  border: 2px solid rgba(92,52,114,0.2);
  border-top-color: var(--am);
  border-radius: 50%;
  animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Progress bar — para uploads / procesos largos */
.progress-track { height: 3px; background: rgba(92,52,114,0.2); border-radius:2px; overflow:hidden; }
.progress-fill { height:100%; background: var(--am); border-radius:2px;
  transition: width .3s ease; }

/* Success state */
.state-success { color: #4ADE80; border-color: rgba(74,222,128,0.3); }
/* Error state */
.state-error { color: #F07A7A; border-color: rgba(240,122,122,0.3); }
/* Empty state */
.state-empty {
  text-align: center; padding: 64px 32px;
  color: rgba(240,237,232,0.25);
  font-family: 'EB Garamond', serif; font-size: 18px; font-style: italic;
}
```

---

## SECCIÓN 9 — PROTOCOLO DE COMUNICACIÓN PUBLICITARIA

**Principio rector:** Si no comunica, no existe. El diseño es el vehículo — la comunicación es el destino.

### 9.1 — Preguntas obligatorias antes de diseñar

1. **¿QUÉ mensaje central queda grabado?** (Una frase. Si no cabe en una frase, el concepto no está claro.)
2. **¿QUÉ reacción busca provocar?** (Confianza · Urgencia · Deseo · Curiosidad · Respeto · Sorpresa)
3. **¿QUIÉN lo ve y en qué estado emocional llega?** (JD frustrada con mora · Propietario confundido · IF a las 11pm)
4. **¿QUÉ acción concreta toma después?** (Descargar · Aprobar · Contactar · Seguir leyendo)

### 9.2 — Jerarquía de atención

```
Nivel 1 — ANCHOR (0.3s)   → UN solo elemento por pantalla. El número grande, el titular.
Nivel 2 — CONTEXT (1-2s)  → Explica el anchor. Label, período, subtítulo.
Nivel 3 — DETAIL (5-30s)  → El resto. Mora por fase, narrativa, tablas.
Nivel 4 — ACTION          → El CTA. Nunca compite con el anchor.
```

### 9.3 — Triggers emocionales ForumPHs

| Trigger | Expresión visual |
|---|---|
| Confianza | Serif · Espacios amplios · Amatista dominante · Datos precisos |
| Urgencia calibrada | Terra 15-20% · Bordes alerta · DM Sans Bold 700 |
| Respeto patrimonial | Cormorant display · Carbon Deep · Slogan completo |
| Claridad | SVG charts limpios · Labels Cinzel · Sin ornamentación |
| Pertenencia | Nombre del edificio prominente · Datos específicos del PH |

### 9.4 — Reglas de copywriting aplicadas al diseño

- El titular dice el beneficio, no la función. "Su edificio recaudó 94.3%" vs "Informe de Gestión"
- Un elemento visual = un mensaje. Tres cosas compitiendo = cero cosas comunicando
- El blanco es silencio que hace que lo importante se oiga
- Amatista dice "institución seria". Terra dice "hay un humano aquí". Nunca los dos en el mismo elemento

---

## SECCIÓN 10 — GEOMETRÍA Y TENSIÓN VISUAL

### 10.1 — Sistemas de proporción

```
Regla áurea (φ = 1.618):  altura_menor = altura_mayor / 1.618
Proporción 3:2:            cards, imágenes, thumbnails
Regla de tercios:          el anchor visual en uno de los 4 puntos de intersección — nunca centrado
Escala modular (1.25):     base 14px → 11 / 14 / 17.5 / 22 / 27.5 / 34 / 43px
```

### 10.2 — Simetría vs Asimetría

```
SIMETRÍA → confianza, autoridad, equilibrio
  Usar en: portadas institucionales, confirmaciones, grids de KPIs del mismo peso

ASIMETRÍA → movimiento, tensión, modernidad
  Usar en: landings, propuestas, dashboards con jerarquía clara
  Regla: 38/62 (proporción áurea) — no 50/50 ni 80/20

DESEQUILIBRIO CONTROLADO: diferencia deliberada de ~30-40%
```

### 10.3 — Técnicas de tensión geométrica

```css
/* 1. Diagonal implícita — 3 elementos en diagonal crean movimiento */
.diagonal-group { transform: translateY(-8px); }

/* 2. Overlap — elemento que sale de su contenedor */
.overlap-kpi { margin-top: -24px; position: relative; z-index: 2; }

/* 3. Ángulo — rotación mínima para energía sin caos */
.badge-rotated { transform: rotate(-2deg); }

/* 4. Fragmentación — algo cortado por el borde implica "hay más" */
.fragment-container { overflow: hidden; }

/* 5. Ghost number — matemáticas como textura de fondo */
.with-ghost::before {
  content: attr(data-number);
  position: absolute; font-size: 240px; font-weight: 700;
  color: rgba(92,52,114,0.04); line-height: 1;
  top: -40px; right: -20px; pointer-events: none;
  font-family: 'DM Sans', sans-serif;
}
```

### 10.4 — Grid systems con propósito

```css
.layout-golden { display:grid; grid-template-columns:1fr 1.618fr; gap:clamp(24px,3vw,48px); }
.grid-thirds { display:grid; grid-template-columns:repeat(3,1fr); }
/* Anchor siempre en grid-column: span 2 para peso visual 2x */
.grid-fib { grid-template-columns:1fr 1fr 2fr 3fr; }
/* Fibonacci: 8 13 21 34 55px — spacing con ritmo */
```

---

## SECCIÓN 11 — PROTOCOLO ANTI-GENÉRICO

**El problema:** AI tiende hacia lo seguro. Layouts de 4 cards iguales, gradientes de arriba a abajo, headers centrados. Todo igual = nada comunica.

### 11.1 — Checklist (mínimo 3 de estos por output)

- [ ] Escala inesperada — un elemento significativamente más grande o pequeño de lo convencional
- [ ] Asimetría deliberada — algo conscientemente fuera de la grid perfecta
- [ ] Color inesperado en lugar inesperado — Terra donde nadie lo esperaría
- [ ] Tipografía de contraste extremo — Cormorant 72px junto a DM Sans 9px
- [ ] Espacio vacío agresivo — zona intencionalmente vacía que hace respirar lo importante
- [ ] Elemento que sangra — algo que sale del contenedor o se corta en el borde
- [ ] Densidad variable — zona muy densa junto a zona muy sparse
- [ ] Movimiento implícito — diagonal, progresión, algo que guía el ojo de A a B

### 11.2 — Proporciones de uso de color ForumPHs

```
80% superficie:   Carbon Deep + Carbon (el silencio que hace resaltar todo)
12% contenido:    Parchment + Dust (lo legible)
5%  jerarquía:    Amatista + Amatista Tint (estructura institucional)
3%  ruptura:      Forum Terra (el ojo va directo ahí — úsalo para lo más importante)

EXCEPCIÓN urgencia (F-III/F-IV): Terra → 15-20%
EXCEPCIÓN propuesta nuevo cliente: Terra → 10-12%
```

### 11.3 — Instinto fotográfico en UI

```
Profundidad de campo: elementos secundarios en opacity 0.35-0.45 — el anchor al 100%
Luz y sombra:  radial-gradient(circle at 80% 10%, rgba(92,52,114,0.15), transparent 60%)
Leading lines: border-left de 2px en --terra que recorre la columna → apunta al CTA
Contraste de textura: Cormorant trazo fino + DM Sans 700 en el mismo bloque
Encuadre dentro del encuadre: card → número grande → separador interno = 3 capas de profundidad
```

---

## SECCIÓN 12 — CHECKLIST ICR v3.0

**Comunicación (PRIMERO):**
- [ ] Mensaje central en una frase
- [ ] Reacción objetivo definida
- [ ] Audiencia y estado emocional mapeados
- [ ] Acción concreta post-visualización definida
- [ ] Jerarquía anchor / context / detail / action trazada

**Brand compliance:**
- [ ] brand_id identificado con variante
- [ ] Google Fonts desde css_import real
- [ ] Cero hex hardcodeados — todo via var(--)
- [ ] Footer con border-top: 2px solid var(--accent)

**Geometría:**
- [ ] Proporción del layout definida
- [ ] Simetría vs asimetría justificada
- [ ] Al menos un elemento de tensión geométrica

**Psicología + Tensión:**
- [ ] Presets VISUAL_PSYCHO correctos para este output type
- [ ] Arquitectura de tensión T1-T10 elegida
- [ ] Proporciones de color ajustadas según presets

**Anti-genérico:**
- [ ] Al menos 3 ítems del checklist 11.1 presentes
- [ ] Al menos un principio fotográfico aplicado

---

## SECCIÓN 13 — VISUAL_PSYCHO · 10 Presets Psicológicos

Los triggers operan en arquitectura invisible. Nunca se nombran en el output.

| Preset | Expresión visual | Usar en | Evitar en |
|---|---|---|---|
| PSY-TRUST | Serif · espacio amplio · Amatista · datos precisos · layout simétrico | Informes JD · EEFF · Gestión ordinaria | Con Terra como dominante |
| PSY-URGENCY | Terra 15-20% · bordes `--terra` · DM Sans Bold · densidad alta | Mora F-III/F-IV · Alertas críticas | Informes rutinarios |
| PSY-AUTHORITY | Cormorant display · Wordmark prominente · Carbon Deep · Cinzel en labels | Propuestas · Portadas · Credenciales | Con colores claros |
| PSY-SOCIAL-PROOF | Números históricos + actuales · tendencias · comparativas | Dashboards · Comparativas de período | Primeras pantallas sin contexto |
| PSY-BELONGING | Nombre del edificio prominent · datos específicos del PH · Wordmark visible | Portal propietario · Comunicaciones personalizadas | Outputs genéricos del portfolio |
| PSY-ASPIRATION | Espacio generoso · verde en números altos · slogan completo visible | Propuestas · Landings · Marketing | Alertas y urgencias |
| PSY-CURIOSITY | Fragmentación · datos sin label completo · ghost numbers · open loops | Heroes · Dashboards progresivos | Documentos formales |
| PSY-IDENTITY | "Su edificio" · datos de JD específicos · métricas que reflejan sus decisiones | Informes de logros · Comparativas positivas | Primeras interacciones |
| PSY-FOMO | Comparativa con/sin ForumPHs · costo de mora sin gestión · portfolio de clientes | Propuestas nuevo cliente | Clientes actuales |
| PSY-SCARCITY | Oportunidad perdida por tiempo · cada día sin gestión = problema acumulado | Cart abandonment · Propuesta con deadline | Contextos institucionales |

**Combinaciones por output type:**
| Output | Primarios | Apoyo | Evitar |
|---|---|---|---|
| Informe mensual JD | TRUST + AUTHORITY | SOCIAL-PROOF | URGENCY dominante |
| Alerta mora F-IV | URGENCY | AUTHORITY | BELONGING |
| Propuesta cliente | AUTHORITY + ASPIRATION | FOMO + SOCIAL-PROOF | TRUST primario |
| Portal propietario | BELONGING + TRUST | CURIOSITY | URGENCY sin alerta real |
| Dashboard IF/Sam | AUTHORITY + CURIOSITY | SOCIAL-PROOF | — |
| Email mora F-I | TRUST + BELONGING | FOMO implícito | URGENCY explícito |
| Email mora F-IV | URGENCY + AUTHORITY | FOMO | BELONGING |

---

## SECCIÓN 14 — VISUAL_TENSION_ARCHITECTURE · T1-T10

La arquitectura se elige ANTES de diseñar el layout. Un output tiene UNA arquitectura dominante.

| Código | Nombre | En diseño | Cuándo |
|---|---|---|---|
| T1 | INVERTED_PYRAMID | Dato crítico arriba, detalle abajo. KPI grande en hero. | Informes · Dashboards de cobro |
| T2 | EARLY_SPIKE | Elemento gigante o inesperado en el fold, luego estructura convencional | Propuestas · Portadas de marketing |
| T3 | ESCALATING_LADDER | Pantalla 1 simple → pantalla 5 rica. Densidad crece con el scroll | Suites HTML 5 paneles · Presentaciones |
| T4 | MICRO_TENSIONS | Grid de KPIs donde cada card crea/resuelve su propia tensión | Dashboards multi-métrica |
| T5 | VALLEY_AND_PEAK | Zonas densas alternadas con zonas de respiro generoso | Informes largos · Suites multi-sección |
| T6 | SUSTAINED_LOW_PRESSURE | Layout limpio, predecible, sin picos. Confianza por coherencia | Portales · Emails gestión ordinaria |
| T7 | RELEASE_REBUILD | Alta tensión → resolución → nueva tensión mayor | Comunicaciones mora multi-fase |
| T8 | COLD_OPEN_BURN | El dato crítico sin contexto — el cerebro busca el contexto solo | Covers de reportes de alto rendimiento |
| T9 | HEARTBEAT | Grid regular con UN elemento que "late" — diferente en escala o color | Grids KPIs con dato crítico del día |
| T10 | QUIET_KNIFE | Layout casi vacío. Un solo elemento que corta. Silencio + un dato | Alertas F-IV · Situaciones financieras graves |

**Combinaciones ForumPHs:**
| Contexto | Arquitectura |
|---|---|
| Informe mensual | T1 + T4 |
| Suite HTML 5 paneles | T3 |
| Alerta mora F-III/IV | T10 |
| Propuesta nuevo cliente | T2 |
| Dashboard IF/Sam/Irja | T4 + T9 |
| Email mora F-I | T6 |
| Email mora F-IV | T7 → T10 |

---

## SECCIÓN 15 — VISUAL_GENOME · Firmas Ejecutables ForumPHs

```
FIRMA 1 — Número grande como protagonista
  EB Garamond 80px+ en KPI principal. El número ES forma visual, no solo dato.
  MAX: 1 número a esta escala por output.

FIRMA 2 — Radial gradient Amatista (esquina superior derecha)
  background: radial-gradient(circle at 80% 10%, rgba(92,52,114,0.18), transparent 60%)
  MAX: 1 por output. Solo en contenedor principal.

FIRMA 3 — Borde izquierdo Terra como marcador de importancia
  border-left: 3px solid var(--terra)
  MAX: 2 elementos con esta firma por output.

FIRMA 4 — Divider 3px Amatista (transición Carbon → Parchment)
  height: 3px; background: var(--am)
  Usado en emails y outputs con ambas superficies.

FIRMA 5 — Labels Cinzel 8px / letter-spacing .2em
  El sello institucional. Solo para labels — nunca en cuerpo de texto.

FIRMA 6 — Cormorant en display como momento editorial
  font-size: 60px+; font-weight: 300
  MAX: 1 momento Cormorant por output.
```

**Prohibiciones:**
```
❌ Gradientes en botones — planos, color sólido
❌ Sombras de colores — solo rgba(0,0,0,x)
❌ border-radius > 12px en cards principales
❌ Animaciones de entrada llamativas
❌ Emojis en contextos institucionales
❌ Amatista como color de error — Terra es la alerta
❌ Slogan partido en jerarquías distintas
```

---

## SECCIÓN 16 — ARQUITECTURA DE LAYERS (Referencia Rápida)

```
L0  BRIEF VISUAL          → QUÉ comunica · QUÉ reacción · QUIÉN lo ve · QUÉ acción
L1  BRAND COMPLIANCE      → Paleta Supabase · Tipografía · CSS vars · Herencia
L2  JERARQUÍA DE ATENCIÓN → Anchor / Context / Detail / Action
L3  GEOMETRÍA             → Proporción · Simetría/asimetría · Grid · Tensión
L4  VISUAL_PSYCHO         → Presets psicológicos (Sección 13)
L5  VISUAL_TENSION        → Arquitectura T1-T10 (Sección 14)
L6  VISUAL_GENOME         → Firmas ejecutables de marca (Sección 15)
L7  RIESGO VISUAL         → Checklist anti-genérico (Sección 11)
L8  LOADING STATES        → Skeleton · Spinner · Progress · Success/Error
L9  ICR                   → Checklist completo (Sección 12)
```

---

_ui-ux-layer CORE v3.0 · Unreal>ille Studio · 2026-05-21_
_Extensiones: motion.md · 3d-spatial.md · mobile-ux.md · design-tokens.md · a11y.md_
