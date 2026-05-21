# ui-ux-layer · MÓDULO: design-tokens
_Arquitectura primitive → semantic → component · Multi-plataforma · Dark/Light Mode_
_Versión: 1.0 · 2026-05-21_

## CUÁNDO CARGAR ESTE MÓDULO
Cualquier proyecto que va a múltiples plataformas · Sistemas con dark/light mode
Componentes React reutilizables · Apps React Native o nativas futuras.

---

## PRINCIPIO RECTOR

Un design token es una decisión de diseño almacenada como dato.
La arquitectura de 3 capas permite que el mismo diseño se exprese en cualquier plataforma
sin duplicar decisiones ni mantener inconsistencias.

**Regla:** Cambiar el valor de un primitive token propaga el cambio a todas las plataformas.
**Regla:** Nunca hardcodear un valor que ya existe como token.

---

## SECCIÓN DT-1 — ARQUITECTURA DE 3 CAPAS

```
CAPA 1 — PRIMITIVE TOKENS (los valores raw)
  Son los valores base sin semántica. No se usan directamente en componentes.
  Solo sirven como fuente de verdad de los valores posibles.
  
  color-amatista-500: #5C3472
  color-terra-600: #C4622D
  size-4: 16px
  font-weight-bold: 700

CAPA 2 — SEMANTIC TOKENS (los que tienen significado)
  Hacen referencia a primitives. Dan significado de uso.
  Son los que cambian entre dark mode / light mode / marca.
  
  color-interactive-primary: → color-amatista-500
  color-interactive-primary-hover: → color-amatista-400
  color-text-default: → color-parchment-100
  spacing-component-padding: → size-4

CAPA 3 — COMPONENT TOKENS (específicos de un componente)
  Hacen referencia a semantic tokens. Solo existen si un componente
  tiene una necesidad muy específica.
  
  btn-primary-background: → color-interactive-primary
  btn-primary-padding-x: → spacing-component-padding
  card-border-color: → color-border-subtle
```

---

## SECCIÓN DT-2 — PRIMITIVE TOKENS FORUMPHS

```javascript
// tokens/primitives.js — la fuente de verdad
export const primitives = {
  // ── COLOR ──────────────────────────────────────────────────
  color: {
    // Familia Amatista
    amatista: {
      900: '#1A0A26',
      800: '#280F3A',
      700: '#3A1F4A',   // --am-d
      600: '#4A2860',
      500: '#5C3472',   // --am (principal)
      400: '#7A4A94',
      300: '#A07AB8',
      200: '#C8A8D8',
      100: '#EAD9F5',   // --am-l
      50:  '#F5EEFA',
    },
    // Familia Terra
    terra: {
      700: '#8B3A14',
      600: '#A84B1E',
      500: '#C4622D',   // --terra (principal)
      400: '#D4804A',
      300: '#E4A07A',
      200: '#F0C0A0',
      100: '#FFF0E8',
    },
    // Familia Carbon (escala de grises con tinte azul)
    carbon: {
      950: '#080810',
      900: '#0E1018',   // --carbon-d
      800: '#14182A',
      700: '#1C2233',   // --carbon
      600: '#262D42',
      500: '#343C52',
      400: '#4A5268',
      300: '#6B7490',
      200: '#9098B0',
      100: '#C0C6D8',
    },
    // Familia Ink/Parchment (para documentos)
    parchment: {
      900: '#1A1612',   // --ink
      700: '#3A3430',
      500: '#6B6460',   // --stone
      300: '#B8B0A8',   // --dust
      100: '#F0EDE8',   // --parch
      50:  '#F8F5F2',
    },
    // Estados del sistema
    success: '#4ADE80',
    error:   '#F07A7A',
    warning: '#F5C07A',
    info:    '#7AB8F5',
    // UNRLVL accent
    teal:    '#00FFD1',
  },

  // ── TIPOGRAFÍA ──────────────────────────────────────────────
  fontFamily: {
    display:   "'EB Garamond', serif",
    editorial: "'Cormorant Garamond', serif",
    utility:   "'DM Sans', sans-serif",
    structural:"'Cinzel', serif",
    mono:      "'Space Mono', monospace",
  },

  fontSize: {
    xs:    '11px',
    sm:    '13px',
    md:    '14px',
    base:  '15px',
    lg:    '17px',
    xl:    '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '34px',
    '5xl': '43px',
    '6xl': '54px',
    '7xl': '72px',
    '8xl': '96px',
  },

  fontWeight: {
    light:   '300',
    regular: '400',
    medium:  '500',
    semibold:'600',
    bold:    '700',
  },

  lineHeight: {
    tight:   '1.1',
    snug:    '1.3',
    normal:  '1.5',
    relaxed: '1.7',
    loose:   '1.9',
  },

  letterSpacing: {
    tight:   '-0.02em',
    normal:  '0',
    wide:    '0.04em',
    wider:   '0.08em',
    widest:  '0.2em',
    cinzel:  '0.28em',  /* Cinzel section labels */
  },

  // ── ESPACIADO (escala Fibonacci) ────────────────────────────
  spacing: {
    1:  '4px',
    2:  '8px',
    3:  '12px',
    4:  '16px',
    5:  '20px',
    6:  '24px',
    7:  '28px',
    8:  '32px',
    9:  '40px',
    10: '48px',
    11: '56px',
    12: '64px',
    13: '80px',
    14: '96px',
    15: '120px',
    16: '160px',
  },

  // ── BORDES ──────────────────────────────────────────────────
  borderRadius: {
    sm:  '4px',
    md:  '8px',
    lg:  '12px',
    xl:  '16px',
    '2xl': '24px',
    full: '9999px',
  },

  // ── SOMBRAS ─────────────────────────────────────────────────
  shadow: {
    sm:  '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
    md:  '0 3px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2)',
    lg:  '0 8px 16px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
    xl:  '0 16px 32px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.25)',
    am:  '0 4px 16px rgba(92,52,114,0.25)',
    terra:'0 4px 16px rgba(196,98,45,0.2)',
  },

  // ── MOTION ──────────────────────────────────────────────────
  duration: {
    instant:   '100ms',
    fast:      '200ms',
    normal:    '300ms',
    slow:      '500ms',
    deliberate:'800ms',
  },

  easing: {
    out:     'cubic-bezier(0.0, 0.0, 0.2, 1)',
    in:      'cubic-bezier(0.4, 0.0, 1, 1)',
    inOut:   'cubic-bezier(0.4, 0.0, 0.2, 1)',
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};
```

---

## SECCIÓN DT-3 — SEMANTIC TOKENS (dark mode — default ForumPHs)

```javascript
// tokens/semantic.dark.js
export const semanticDark = {
  color: {
    // Backgrounds
    bg: {
      default:   primitives.color.carbon[900],  // #0E1018
      subtle:    primitives.color.carbon[800],  // #14182A
      surface:   primitives.color.carbon[700],  // #1C2233
      elevated:  primitives.color.carbon[600],  // #262D42
      overlay:   'rgba(0,0,0,0.5)',
    },
    // Texto
    text: {
      default:   primitives.color.parchment[100], // #F0EDE8
      subtle:    primitives.color.parchment[300],  // #B8B0A8
      muted:     primitives.color.carbon[200],     // dimmer
      onAccent:  '#ffffff',
      onDocument:primitives.color.parchment[900],  // sobre fondo claro
    },
    // Bordes
    border: {
      subtle: 'rgba(255,255,255,0.06)',
      default:'rgba(255,255,255,0.12)',
      strong: 'rgba(255,255,255,0.2)',
      accent: primitives.color.amatista[500],
    },
    // Interactivos
    interactive: {
      primary:        primitives.color.amatista[500], // #5C3472
      primaryHover:   primitives.color.amatista[400],
      primaryPressed: primitives.color.amatista[600],
      secondary:      primitives.color.terra[500],    // #C4622D
      secondaryHover: primitives.color.terra[400],
    },
    // Feedback
    feedback: {
      success: primitives.color.success,
      error:   primitives.color.error,
      warning: primitives.color.warning,
      info:    primitives.color.info,
    },
    // ForumPHs específicos
    fphs: {
      mora: {
        alDia:    primitives.color.success,
        faseI:    primitives.color.amatista[200],
        faseII:   primitives.color.warning,
        faseIII:  primitives.color.error,
        faseIV:   '#E05050',
      },
      kpi: {
        number: primitives.color.amatista[500],
        label:  primitives.color.parchment[500],
      },
    },
  },
  // Spacing semántico
  spacing: {
    componentPaddingX: primitives.spacing[4],  // 16px
    componentPaddingY: primitives.spacing[3],  // 12px
    sectionGap:        primitives.spacing[10], // 48px
    cardPadding:       primitives.spacing[6],  // 24px
  },
};
```

---

## SECCIÓN DT-4 — SEMANTIC TOKENS (light mode — para documentos/actas)

```javascript
// tokens/semantic.light.js — para Parchment surfaces
export const semanticLight = {
  color: {
    bg: {
      default:  primitives.color.parchment[100], // #F0EDE8
      subtle:   primitives.color.parchment[50],  // #F8F5F2
      surface:  '#ffffff',
      elevated: '#ffffff',
    },
    text: {
      default:   primitives.color.parchment[900], // #1A1612 (--ink)
      subtle:    primitives.color.parchment[500],  // #6B6460 (--stone)
      muted:     primitives.color.parchment[300],
      onAccent:  '#ffffff',
    },
    border: {
      subtle:  'rgba(26,22,18,0.08)',
      default: 'rgba(26,22,18,0.15)',
      strong:  'rgba(26,22,18,0.25)',
      accent:  primitives.color.amatista[500],
    },
    interactive: {
      primary:      primitives.color.amatista[700],  // más oscuro sobre claro
      primaryHover: primitives.color.amatista[600],
      secondary:    primitives.color.terra[500],
    },
  },
};
```

---

## SECCIÓN DT-5 — GENERACIÓN CSS VARS DESDE TOKENS

```javascript
// Función que convierte semantic tokens a CSS vars
function tokensToCSS(tokens, prefix = '') {
  const lines = [];
  function flatten(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = `--${prefix}${path}-${key}`.replace(/--$/, '--')
        .replace(/(-)+/g, '-').replace(/^-+/, '');
      if (typeof value === 'string') {
        lines.push(`  ${varName}: ${value};`);
      } else {
        flatten(value, path ? `${path}-${key}` : key);
      }
    }
  }
  flatten(tokens);
  return `:root {\n${lines.join('\n')}\n}`;
}

// Output generado para dark mode
// --color-bg-default: #0E1018;
// --color-text-default: #F0EDE8;
// --color-interactive-primary: #5C3472;
// etc.

// En globals.css:
// @import 'generated/dark.css';
// [data-theme="light"] { @import 'generated/light.css'; }
```

---

## SECCIÓN DT-6 — REACT NATIVE (cuando llegue el momento)

```javascript
// tokens/native.js — para React Native StyleSheet
// Los tokens se convierten a los tipos correctos de RN

export const nativeTokens = {
  colors: {
    backgroundDefault: '#0E1018',
    textDefault: '#F0EDE8',
    interactivePrimary: '#5C3472',
    interactiveSecondary: '#C4622D',
    // ... etc
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
  },
  typography: {
    // RN no usa font-family strings directamente — requiere setup de fuente
    // Cormorant y EB Garamond requieren expo-font o react-native-fonts
    sizes: { xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 24 },
    weights: { regular: '400', medium: '500', bold: '700' },
  },
  // Sombras en RN son objetos, no strings CSS
  shadows: {
    sm: {
      shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2, shadowRadius: 3, elevation: 2,
    },
    md: {
      shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25, shadowRadius: 6, elevation: 4,
    },
    am: {
      shadowColor: '#5C3472', shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25, shadowRadius: 16, elevation: 6,
    },
  },
};
```

---

## SECCIÓN DT-7 — DARK/LIGHT MODE COMO SISTEMA

```css
/* Approach 1: CSS custom properties con media query */
:root {
  color-scheme: dark light;
}

/* Dark mode — default de ForumPHs */
:root,
:root[data-theme="dark"] {
  --bg-default: #0E1018;
  --text-default: #F0EDE8;
  --interactive-primary: #5C3472;
}

/* Light mode — para documentos, impresión */
:root[data-theme="light"],
@media (prefers-color-scheme: light) {
  --bg-default: #F0EDE8;
  --text-default: #1A1612;
  --interactive-primary: #3A1F4A;  /* más oscuro sobre claro */
}

/* Print — siempre light */
@media print {
  :root {
    --bg-default: #ffffff;
    --text-default: #1A1612;
    --interactive-primary: #3A1F4A;
  }
}
```

**Regla de transición:**
```css
/* Transición suave al cambiar tema */
*, *::before, *::after {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.2s ease;
}
/* EXCEPTO durante el cambio de tema — evitar flash */
.no-transition * { transition: none !important; }
```

---

_design-tokens.md v1.0 · ui-ux-layer extension · Unreal>ille Studio · 2026-05-21_
