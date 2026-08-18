# ui-ux-layer · MÓDULO: motion
_Animación · Microinteracciones · Gestures · Feedback táctil visual_
_Versión: 1.0 · 2026-05-21_

## CUÁNDO CARGAR ESTE MÓDULO
Apps móviles · Componentes interactivos · Onboarding · Transiciones entre pantallas
Cualquier output donde el movimiento sea parte del feedback al usuario.

---

## PRINCIPIO RECTOR

El movimiento comunica. Una transición de 200ms dice algo diferente que una de 400ms.
Un botón que no da feedback visual se siente roto. En mobile, el movimiento ES la experiencia.

**Regla:** Cada animación debe tener un propósito comunicativo específico.
Sin propósito → sin animación. La animación vacía es ruido visual.

---

## SECCIÓN M1 — CURVAS DE EASING (el lenguaje del movimiento)

```css
/* Curvas estándar del sistema */
:root {
  --ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);   /* entra rápido, frena suave — natural */
  --ease-in:      cubic-bezier(0.4, 0.0, 1, 1);      /* arranca lento, sale rápido — salida */
  --ease-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1);   /* Material Design standard */
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot — feedback de éxito */
  --ease-sharp:   cubic-bezier(0.4, 0, 0.6, 1);      /* cambios bruscos intencionales */
}
```

**Cuándo usar cada curva:**
| Curva | Uso |
|---|---|
| `--ease-out` | Elementos que entran a pantalla (el usuario espera la llegada) |
| `--ease-in` | Elementos que salen de pantalla (el usuario no espera la salida) |
| `--ease-in-out` | Movimientos internos (drag, reordenamiento) |
| `--ease-spring` | Confirmaciones de éxito, checkmarks, estados positivos |
| `--ease-sharp` | Cambios de estado discretos (toggle, switch) |

---

## SECCIÓN M2 — DURACIONES (el ritmo del sistema)

```css
:root {
  --dur-instant:  100ms;  /* feedback táctil inmediato — botones, toggles */
  --dur-fast:     200ms;  /* microinteracciones — hover, focus, estados */
  --dur-normal:   300ms;  /* transiciones de pantalla, modales, drawers */
  --dur-slow:     500ms;  /* animaciones de entrada complejas, onboarding */
  --dur-deliberate:800ms; /* momentos de marca, celebración de logro */
}
```

**Regla de duración:** A mayor distancia de movimiento → mayor duración.
Un elemento que cruza 20px puede ser 150ms. Uno que cruza la pantalla necesita 300ms+.

**Regla mobile:** En mobile, las duraciones se sienten más largas que en desktop.
Reducir en 15-20% para mantener la misma percepción de velocidad.

---

## SECCIÓN M3 — MICROINTERACCIONES

Las microinteracciones son el lenguaje de feedback del sistema. Cada acción del usuario merece una respuesta visual.

### Botones

```css
/* Tap feedback — la respuesta más importante en mobile */
.btn-interactive {
  transition: transform var(--dur-instant) var(--ease-out),
              opacity var(--dur-instant) var(--ease-out),
              background var(--dur-fast) var(--ease-out);
}
.btn-interactive:active {
  transform: scale(0.96);
  opacity: 0.85;
}

/* Success state — spring para celebrar */
.btn-success {
  animation: btn-success-pulse var(--dur-normal) var(--ease-spring);
}
@keyframes btn-success-pulse {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.06); }
  100% { transform: scale(1); }
}

/* Loading state en botón */
.btn-loading {
  position: relative;
  color: transparent; /* ocultar texto */
  pointer-events: none;
}
.btn-loading::after {
  content: '';
  position: absolute; inset: 0;
  margin: auto;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin var(--dur-normal) linear infinite;
}
```

### Inputs y formularios

```css
/* Focus expansion — el campo "respira" al enfocarse */
.input-animated {
  transition: border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.input-animated:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(92,52,114,0.15);
  transform: translateY(-1px);
}

/* Label flotante — para inputs con label que sube al enfocarse */
.floating-label {
  position: relative;
}
.floating-label label {
  position: absolute; left: 12px; top: 50%;
  transform: translateY(-50%);
  transition: all var(--dur-fast) var(--ease-out);
  pointer-events: none;
  color: var(--stone);
  font-size: 14px;
}
.floating-label input:focus ~ label,
.floating-label input:not(:placeholder-shown) ~ label {
  top: -8px; font-size: 11px;
  color: var(--am); background: var(--carbon);
  padding: 0 4px;
}

/* Error shake — comunicar validación fallida */
.input-error { animation: shake var(--dur-normal) var(--ease-sharp); }
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-6px); }
  40%     { transform: translateX(6px); }
  60%     { transform: translateX(-4px); }
  80%     { transform: translateX(4px); }
}
```

### Cards y elementos de lista

```css
/* Card hover — profundidad que responde */
.card-interactive {
  transition: transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out);
}
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
  border-color: rgba(92,52,114,0.35);
}

/* Card selected — estado activo en lista */
.card-selected {
  border-color: var(--am);
  background: rgba(92,52,114,0.1);
  animation: card-select var(--dur-fast) var(--ease-spring);
}
@keyframes card-select {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

### Checkboxes y toggles

```css
/* Toggle switch — feedback claro de estado binario */
.toggle {
  width: 44px; height: 24px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-sharp);
}
.toggle.active { background: var(--am); }
.toggle::after {
  content: '';
  position: absolute;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: white;
  top: 2px; left: 2px;
  transition: transform var(--dur-fast) var(--ease-spring),
              box-shadow var(--dur-fast) var(--ease-out);
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
.toggle.active::after {
  transform: translateX(20px);
  box-shadow: 0 1px 6px rgba(0,0,0,0.4);
}

/* Checkmark animado */
.checkmark-path {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset var(--dur-normal) var(--ease-spring);
}
.checked .checkmark-path { stroke-dashoffset: 0; }
```

---

## SECCIÓN M4 — TRANSICIONES DE PANTALLA / VISTAS

```css
/* Fade — transición más segura, funciona siempre */
.page-enter { opacity: 0; }
.page-enter-active {
  opacity: 1;
  transition: opacity var(--dur-normal) var(--ease-out);
}
.page-exit { opacity: 1; }
.page-exit-active {
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-in);
}

/* Slide up — modal, drawer, bottom sheet */
.slide-up-enter { transform: translateY(100%); opacity: 0; }
.slide-up-enter-active {
  transform: translateY(0); opacity: 1;
  transition: transform var(--dur-normal) var(--ease-out),
              opacity var(--dur-normal) var(--ease-out);
}

/* Slide right — navegación forward (siguiente paso) */
.slide-right-enter { transform: translateX(100%); }
.slide-right-enter-active {
  transform: translateX(0);
  transition: transform var(--dur-normal) var(--ease-out);
}

/* Scale up — modal que emerge desde un elemento */
.scale-enter { transform: scale(0.9); opacity: 0; }
.scale-enter-active {
  transform: scale(1); opacity: 1;
  transition: transform var(--dur-normal) var(--ease-spring),
              opacity var(--dur-normal) var(--ease-out);
}
```

---

## SECCIÓN M5 — ANIMACIONES DE ENTRADA DE CONTENIDO

```css
/* Fade in from below — entrada natural de contenido */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in-up {
  animation: fadeInUp var(--dur-normal) var(--ease-out) both;
}

/* Stagger — lista de items que entran secuencialmente */
.stagger-item { opacity: 0; animation: fadeInUp var(--dur-normal) var(--ease-out) both; }
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 60ms; }
.stagger-item:nth-child(3) { animation-delay: 120ms; }
.stagger-item:nth-child(4) { animation-delay: 180ms; }
/* Patrón: delay += 60ms por cada item */

/* Número que "cuenta" — para KPIs que se revelan */
/* Implementar en JS — requestAnimationFrame para suavidad */
function animateNumber(el, from, to, duration) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

---

## SECCIÓN M6 — GESTURES (vocabulario táctil para mobile)

```javascript
// Swipe to dismiss / delete — patrón de iOS/Android
class SwipeHandler {
  constructor(el, onSwipe) {
    let startX, startY;
    el.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    el.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - startX;
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (Math.abs(dx) > dy) { // swipe horizontal predomina
        el.style.transform = `translateX(${dx}px)`;
        el.style.opacity = `${1 - Math.abs(dx) / 200}`;
      }
    }, { passive: true });
    
    el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 80) { onSwipe(dx > 0 ? 'right' : 'left'); }
      else { // snap back
        el.style.transition = `transform var(--dur-normal) var(--ease-spring)`;
        el.style.transform = 'translateX(0)';
        el.style.opacity = '1';
      }
    });
  }
}

// Pull to refresh — patrón estándar mobile
// Long press — para acciones contextuales
// Pinch to zoom — para mapas y fotos de inspección en OPS app
```

**Reglas de gesture:**
- Todo gesture tiene un feedback visual inmediato (<100ms)
- El threshold de activación es siempre mayor que el de "deslizado accidental" (mínimo 80px)
- Siempre hay una animación de "snap back" si el gesture no se completa
- En contextos de formulario, swipe horizontal nunca compite con el scroll vertical

---

## SECCIÓN M7 — FEEDBACK DE PROCESOS ASÍNCRONOS

```css
/* Upload de recibo (OPS app) — el proceso más crítico de ForumPHs */
.upload-progress {
  position: relative;
  overflow: hidden;
}
.upload-progress::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; height: 100%; width: 100%;
  background: linear-gradient(90deg, transparent, rgba(92,52,114,0.15), transparent);
  animation: upload-sweep 1.5s ease-in-out infinite;
}
@keyframes upload-sweep {
  0%   { left: -100%; }
  100% { left: 100%; }
}

/* OCR processing — Claude Vision analizando el recibo */
.processing-state {
  border: 1px solid rgba(92,52,114,0.3);
  position: relative;
}
.processing-state::before {
  content: '';
  position: absolute; top: -1px; left: -1px; right: -1px; height: 2px;
  background: linear-gradient(90deg, transparent, var(--am), transparent);
  animation: scan-line 2s ease-in-out infinite;
}
@keyframes scan-line {
  0%,100% { opacity: 0; transform: translateY(0); }
  50%     { opacity: 1; transform: translateY(calc(100% + 2px)); }
}

/* Success — el recibo fue procesado correctamente */
.success-burst {
  animation: success-burst var(--dur-deliberate) var(--ease-spring);
}
@keyframes success-burst {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(74,222,128,0.2); }
  60%  { transform: scale(0.98); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 transparent; }
}
```

---

## SECCIÓN M8 — PREFERENCIAS DE MOVIMIENTO (accesibilidad)

```css
/* Siempre respetar la preferencia del sistema */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .skeleton { animation: none; background: rgba(92,52,114,0.1); }
}
```

---

## SECCIÓN M9 — PERFORMANCE DE ANIMACIONES

```
PROPIEDADES QUE SE PUEDEN ANIMAR SIN COSTO (GPU):
  transform: translate / scale / rotate / skew
  opacity

PROPIEDADES QUE CUESTAN (CPU — evitar en mobile):
  width / height / top / left / margin / padding
  background (cambios de color OK, gradientes animados costosos)
  box-shadow (animar opacity de pseudo-elemento en su lugar)

TRUCO PARA BOX-SHADOW:
  Crear pseudo-elemento con la sombra target y animar su opacity en lugar de la sombra.
  Costo 0 vs costo alto.

.card-shadow-trick {
  position: relative;
}
.card-shadow-trick::after {
  content: '';
  position: absolute; inset: 0;
  box-shadow: 0 16px 32px rgba(0,0,0,0.4);
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-out);
}
.card-shadow-trick:hover::after { opacity: 1; }

WILL-CHANGE — usar con moderación:
  Solo en elementos que van a animarse definitivamente.
  Nunca en elementos estáticos. Consume memoria GPU.
  will-change: transform; /* en el elemento antes de la animación */

COMPOSITE LAYERS:
  transform: translateZ(0); o translate3d(0,0,0) fuerza GPU layer.
  Usar solo cuando hay jank real verificado — no profilácticamente.
```

---

_motion.md v1.0 · ui-ux-layer extension · Unrealville Studio · 2026-05-21_
