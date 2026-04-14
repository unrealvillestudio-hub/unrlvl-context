# BP BRAND CONTEXT — Unreal>ille Studio
_Generado desde BluePrints/brands/Unrealville/ · 2026-04-14 · Claude Sonnet 4.6_
_Fuente canónica: BP_BRAND_UNRLVL_v1.2.json_

---

## QUÉ ES ESTA MARCA

Unreal>ille Studio es la agencia inhouse de Sam. No es una agencia pública. Es el cerebro operativo, creativo y tecnológico detrás de un ecosistema de negocios basado en Miami. Produce marca, marketing, publicidad, estrategia y tecnología para sus propios proyectos y los de su familia. **"Not for everyone."** no es un slogan — es una declaración de posicionamiento que define a quién no se dirige.

El nombre se escribe **Unreal>ille** — con el chevron `>` como separador activo. En mayúsculas: **UNREAL>ILLE STUDIO**. El chevron parpadea siempre. Sin excepciones.

---

## IDENTIDAD VISUAL — Reglas absolutas

### El chevron `>`
- Color: `#00FFD1` (cyan)
- **Parpadea SIEMPRE** — animación `prompt-blink 1.1s step-end infinite`
- No solo en hover. No solo en active. **Permanentemente.**
- Nombres deprecados (nunca usar): `chevron-blink`, `chev-listen`
- Transform: `scaleY(1.45) scaleX(0.72)` — estirado vertical, comprimido horizontal

### Sufijo STUDIO
- Color: `rgba(242,240,236,0.32)` — 0.32 opacity máximo
- **Siempre visualmente más apagado** que UNREAL>ILLE — nunca el mismo peso ni color
- Font-size: 0.72em relativo al logotipo wrapper

### Paleta
| Token | Valor | Uso |
|---|---|---|
| `cyan` | `#00FFD1` | Único color de acento. Chevron, footer border, highlights, ICR text |
| `carbon` | `#0F0F0F` | Fondo primario. Footer siempre |
| `void` | `#080808` | Fondo de página (más profundo) |
| `graphite` | `#1A1A1A` | Superficie elevada |
| `chalk` | `#F2F0EC` | Texto primario sobre oscuro |
| `chalk_72` | `rgba(242,240,236,0.72)` | Texto secundario |
| `chalk_42` | `rgba(242,240,236,0.42)` | Texto muted / STUDIO |
| `chalk_06` | `rgba(242,240,236,0.06)` | Bordes sutiles / nav separator |
| `error` | `#FF4444` | Errores / don'ts únicamente |

### Tipografía
| Rol | Familia | Uso |
|---|---|---|
| Display | Bebas Neue | Logotipo, headings, STUDIO suffix, firma |
| Mono | Space Mono | Labels, metadata, tags, badges, código, footer |
| Body | Libre Baskerville | Copy largo, texto editorial |

Import Google Fonts:
```
https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap
```

---

## LOGOTIPO — Markup canónico

```html
<span class="lt-logotype">
  <span class="lt-un">UNREAL</span>
  <span class="lt-chevron">></span>
  <span class="lt-ille">ILLE</span>
  <span class="lt-studio">STUDIO</span>
</span>
```

```css
@keyframes prompt-blink {
  0%, 49%  { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.lt-logotype { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; line-height: 1; white-space: nowrap; }
.lt-un, .lt-ille { color: #F2F0EC; }
.lt-chevron { color: #00FFD1; animation: prompt-blink 1.1s step-end infinite; display: inline-block; transform: scaleY(1.45) scaleX(0.72); transform-origin: center; letter-spacing: 0; margin: 0 -0.01em; }
.lt-studio { color: rgba(242,240,236,0.32); font-size: 0.72em; letter-spacing: 0.14em; margin-left: 0.18em; }
.lt-logotype.size-nav    { font-size: 20px; }
.lt-logotype.size-footer { font-size: 28px; }
.lt-logotype.size-inline { font-size: 16px; }
```

---

## FOOTER — Estándar BP_BRAND_UNRLVL_v1.2

Aplica a **TODOS** los outputs — propios y de clientes, internos y externos.

- `border-top: 2px solid #00FFD1` — siempre, sin excepciones
- `background: #0F0F0F` — independiente del fondo del documento
- Grid: 3 columnas

| Columna | Outputs propios | Outputs para clientes |
|---|---|---|
| Col 1 | Logotipo Unrealville (.size-footer, chevron parpadeando) | **Logo del CLIENTE** — NUNCA logo Unrealville aquí |
| Col 2 | © [año] [Brand] — [Título] · [tipo] · [distribución] | Igual |
| Col 3 | "Designed & Developed by Unreal>ille Studio" (Bebas Neue, siempre en inglés) | Igual |

Línea adicional: `unrealvillestudio.com · North Miami, FL 33181`

**Golden rule:** En cualquier entregable PARA un cliente, Col 1 = logo del cliente. Siempre. Sin excepciones.

---

## ICR BADGE

```html
<span class="icr-badge"><span class="icr-dot"></span>ICR Standard Active</span>
```

- Punto animado (pulse) + label Space Mono
- **OBLIGATORIO** en footer de cada documento output — sin excepciones
- Placement: footer, siempre

---

## CHECKLIST OBLIGATORIO — Cada output HTML

Claude DEBE verificar antes de entregar:

- [ ] `favicon <link>` en `<head>` — primer elemento, antes de stylesheets
- [ ] `@keyframes prompt-blink` en `<style>` (NO chevron-blink, NO chev-listen — deprecated)
- [ ] `.lt-chevron` con `animation: prompt-blink 1.1s step-end`
- [ ] `.lt-studio` con `color: rgba(242,240,236,0.32)` — visualmente mucho más apagado
- [ ] ICR badge visible en footer
- [ ] `.lt-logotype.size-nav` en header (20px)
- [ ] `.lt-logotype.size-footer` en footer (28px)
- [ ] Footer: Col1 correcto según regla propia/cliente, Col2 derechos, Col3 firma EN

---

## ASSETS

Ruta base en BluePrints: `brands/Unrealville/assets/`

| Asset | Archivo | Uso |
|---|---|---|
| Favicon | `UNRLVL_Favicon.svg` | Chevron > solo. prompt-blink embedded. Base64 en `<head>` de cada HTML. |
| Logo oscuro | `UNRLVL_Logo_drk.svg` | Fill `#1A1A1A` — sobre fondos claros |
| Logo claro | `UNRLVL_Logo_lght.svg` | Fill `#F2F0EC` — sobre fondos oscuros |

---

## DATOS OPERATIVOS

- **Owner:** Sam
- **HQ:** 12951 Biscayne Blvd · North Miami, FL 33181 (co-located con Vizos Cosmetics)
- **Operado desde:** España / Panamá (próximamente)
- **Web:** unrealvillestudio.com — LIVE desde 2026-04-10
- **Mercado:** Florida USA + LATAM + España
- **Vercel team:** `unrealvillestudio-projects`
- **GitHub org:** `unrealvillestudio-hub`
- **Plan Vercel:** Pro

---

## WEB PENDIENTES (unrealvillestudio.com)

1. Cloudflare setup
2. Redirect rules
3. Aliases email (desde Cloudflare)
4. Formulario contacto → Profiler Agent
5. Sección Psycho Layer como diferenciador de venta

---

## REFS DE REPO

| Archivo | Ruta |
|---|---|
| Blueprint JSON | `BluePrints/brands/Unrealville/BP_BRAND_UNRLVL_v1.2.json` |
| Blueprint HTML ES | `BluePrints/brands/Unrealville/BP_BRAND_UnrealilleStudio_v1_2.html` |
| Blueprint HTML EN | `BluePrints/brands/Unrealville/BP_BRAND_UnrealilleStudio_v1_2_EN.html` |
| brand.json (context) | `unrlvl-context/brands/UnrealvilleStudio/brand.json` |
| Este archivo | `unrlvl-context/brands/UnrealvilleStudio/BP_Brand_Context.md` |

**Nota de nomenclatura:** La carpeta en BluePrints es `Unrealville`. La carpeta en el context system es `UnrealvilleStudio`. Son la misma marca.
