# ui-ux-layer · MÓDULO: mobile-ux
_Ergonomía física · Thumb zone · Touch targets · Safe areas · PWA vs React Native_
_Versión: 1.0 · 2026-05-21_

## CUÁNDO CARGAR ESTE MÓDULO
Cualquier proyecto con output que se usa en un dispositivo móvil.
OPS app campo · Portal propietario · Quality Dashboard móvil · Apps nativas futuras.

---

## PRINCIPIO RECTOR

En mobile, el diseño tiene física. El pulgar alcanza ciertos puntos y no otros.
El admin de campo está parado en el lobby del edificio, con el teléfono en una mano,
bajo el sol, con los guantes puestos. El diseño tiene que funcionar en ese contexto.

**Regla:** Diseñar para el peor escenario de uso, no para el ideal.

---

## SECCIÓN MOB-1 — ERGONOMÍA FÍSICA (Thumb Zone)

Basado en el estudio de Steven Hoober (2013, 2017) — comportamiento real de uso de teléfonos.

```
ZONA VERDE  — cómodo con el pulgar, un solo intento, sin error
ZONA AMARILLA — alcanzable con ajuste de agarre o extensión del pulgar
ZONA ROJA    — requiere dos manos o reposicionamiento del dispositivo

Layout de 360px (teléfono estándar):
┌──────────────────────────┐ ← top
│  ← ROJA (navegación)    │  0-120px: difícil con pulgar derecho
│                          │
│  ← AMARILLA             │  120-240px: alcanzable con esfuerzo
│                          │
│  ← VERDE ★              │  240-480px: zona de oro del pulgar
│                          │
│  ← VERDE ★              │  480-640px: zona de oro del pulgar
│                          │
│  ── SAFE AREA BOTTOM ──  │  gesture bar / home indicator
└──────────────────────────┘
```

**Implicaciones de diseño:**

```css
/* CTAs principales — SIEMPRE en zona verde */
.cta-primary {
  position: fixed;
  bottom: calc(24px + env(safe-area-inset-bottom));
  left: 16px; right: 16px;
  /* En la zona más alcanzable del pulgar */
}

/* Navegación inferior — en la zona de más fácil acceso */
.bottom-nav {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  /* La tab bar es el elemento más importante de la app — debe ser fácil de alcanzar */
}

/* Evitar acciones críticas en la parte superior de la pantalla */
/* Si DEBE estar arriba (back button, menu), usar gestures como alternativa */
```

**Para el OPS app de campo (ForumPHs):**
- El botón de "Tomar foto" va en la zona verde inferior
- El checklist scrollea verticalmente — los checkboxes deben ser alcanzables desde el centro
- El botón "Cerrar turno" es la acción más crítica — siempre en zona verde, tamaño 56px minimum

---

## SECCIÓN MOB-2 — TOUCH TARGETS (el tamaño importa)

```css
/* Estándares mínimos de la industria */
:root {
  --touch-target-min-ios:      44px;  /* Apple Human Interface Guidelines */
  --touch-target-min-material: 48px;  /* Google Material Design */
  --touch-target-comfortable:  56px;  /* Para contextos de campo / guantes / estrés */
  --touch-target-hero:         64px;  /* Para la acción MÁS importante de la pantalla */
}

/* REGLA: el área táctil SIEMPRE >= 44px, aunque el elemento visual sea más pequeño */
.touch-target-small {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* El ícono puede ser 20px pero el área táctil es 44px */
}

/* Para la OPS app — contextos de campo */
.touch-target-field {
  min-width: 56px;
  min-height: 56px;
  /* Admin con guantes, bajo el sol, moviendo el teléfono */
}

/* Spacing entre targets — evitar taps accidentales */
.touch-spacing { margin: 8px; } /* mínimo 8px entre targets adyacentes */
```

**Checklist de touch targets para cada pantalla:**
- [ ] Todos los botones ≥ 44px de altura
- [ ] Todos los botones ≥ 44px de anchura
- [ ] Separación mínima de 8px entre targets
- [ ] La acción más crítica ≥ 56px
- [ ] Los checkboxes de la OPS app ≥ 48px touch area

---

## SECCIÓN MOB-3 — SAFE AREAS (notch, Dynamic Island, home indicator)

```css
/* iOS safe areas — variables nativas del sistema */
:root {
  /* Estas variables se calculan automáticamente en iOS */
  /* fallback para dispositivos sin notch */
}

/* Aplicación correcta */
.app-layout {
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}

/* Header — respeta el notch/Dynamic Island */
.app-header {
  padding-top: calc(16px + env(safe-area-inset-top));
  height: calc(56px + env(safe-area-inset-top));
}

/* Bottom navigation — respeta el home indicator */
.bottom-nav {
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  height: calc(56px + env(safe-area-inset-bottom));
}

/* Bottom sheet / modal */
.bottom-sheet {
  padding-bottom: calc(24px + env(safe-area-inset-bottom));
  border-radius: 16px 16px 0 0;
}

/* Full-screen como el visor de cámara en OPS app */
.fullscreen-camera {
  position: fixed; inset: 0;
  /* El contenido va al borde — la cámara usa toda la pantalla */
  /* PERO los controles respetan safe areas */
}
.camera-controls-bottom {
  position: absolute;
  bottom: calc(24px + env(safe-area-inset-bottom));
  left: 0; right: 0;
}
```

### Dispositivos de referencia

| Dispositivo | safe-area-inset-top | safe-area-inset-bottom | Notas |
|---|---|---|---|
| iPhone SE (3rd) | 20px | 0px | Sin notch ni Dynamic Island |
| iPhone 15 / Pro | 59px | 34px | Dynamic Island |
| iPhone 15 Pro Max | 59px | 34px | Dynamic Island, pantalla más grande |
| Android estándar | variable | variable | Usar `env()` — varía por fabricante |
| PWA en Android | 0 (browser) | variable | Depende del sistema |

---

## SECCIÓN MOB-4 — VIEWPORT Y ESCALADO

```html
<!-- Meta viewport correcto para apps mobile -->
<meta name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- viewport-fit=cover es OBLIGATORIO para que env(safe-area-*) funcione -->
```

```css
/* Evitar zoom al enfocar inputs en iOS */
input, select, textarea {
  font-size: 16px; /* iOS hace zoom si font-size < 16px en inputs */
}

/* Altura real del viewport en mobile (100vh no funciona bien en mobile) */
:root {
  --vh: 1vh; /* se actualiza con JS */
}
.full-height { height: calc(var(--vh, 1vh) * 100); }
```

```javascript
// Calcular altura real del viewport — evita el bug del browser bar
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH);

// También: dvh (dynamic viewport height) — nueva unidad CSS, soportada desde 2023
// .full-height { height: 100dvh; } — sin necesidad del hack JS en navegadores modernos
```

---

## SECCIÓN MOB-5 — PATRONES DE NAVEGACIÓN MOBILE

### Bottom Tab Bar — el patrón principal de ForumPHs apps

```css
.bottom-tab-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: calc(56px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(14,16,24,0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  gap: 4px;
  color: rgba(240,237,232,0.35);
  transition: color 0.15s ease;
  cursor: pointer;
}
.tab-item.active { color: var(--am); }
.tab-item.active .tab-icon { filter: drop-shadow(0 0 4px rgba(92,52,114,0.5)); }
.tab-label { font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 0.04em; }

/* Badge de notificación */
.tab-badge {
  position: absolute;
  top: 6px; right: calc(50% - 16px);
  min-width: 16px; height: 16px;
  background: var(--terra);
  border-radius: 8px;
  font-size: 9px; font-weight: 700;
  color: white;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--carbon-d);
}
```

### Bottom Sheet — para acciones contextuales

```css
.bottom-sheet-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 200;
  animation: fadeIn 0.2s ease;
}

.bottom-sheet {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: var(--carbon);
  border-radius: 16px 16px 0 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 12px 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 201;
  animation: slideUp 0.3s cubic-bezier(0.4,0,0.2,1);
}

/* Drag handle */
.sheet-handle {
  width: 36px; height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  margin: 0 auto 16px;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
```

---

## SECCIÓN MOB-6 — DENSIDAD Y LEGIBILIDAD EN MOBILE

```css
/* Tamaños mínimos de fuente para legibilidad mobile */
:root {
  --text-mobile-xs:  11px;  /* labels, badges — mínimo absoluto */
  --text-mobile-sm:  13px;  /* metadata, timestamps */
  --text-mobile-md:  15px;  /* texto de cuerpo móvil */
  --text-mobile-lg:  17px;  /* texto de cuerpo principal iOS */
  --text-mobile-xl:  20px;  /* subtítulos */
  --text-mobile-2xl: 24px;  /* títulos de sección */
  --text-mobile-3xl: 32px;  /* títulos principales */
}

/* Line height para mobile — más generoso que desktop */
body { line-height: 1.6; }              /* vs 1.5 en desktop */
p    { line-height: 1.75; }             /* párrafos necesitan más aire en pantalla pequeña */

/* Contraste mínimo — legibilidad bajo el sol */
.text-readable {
  color: rgba(240,237,232,0.9);         /* casi blanco, no blanco puro */
  text-shadow: 0 1px 2px rgba(0,0,0,0.3); /* mejora legibilidad sobre fondos variables */
}

/* Inputs — tamaño específico mobile */
.input-mobile {
  height: 48px;          /* más alto que desktop (40px) */
  font-size: 16px;       /* evita zoom en iOS */
  padding: 0 16px;       /* más padding que desktop */
  border-radius: 10px;   /* más redondeado = más "touchable" visualmente */
}
```

---

## SECCIÓN MOB-7 — PWA vs REACT NATIVE vs NATIVA (decisión de stack)

| Criterio | PWA (Next.js) | React Native | Swift/Kotlin nativo |
|---|---|---|---|
| Velocidad de desarrollo | ★★★★★ | ★★★★ | ★★★ |
| Performance | ★★★ | ★★★★ | ★★★★★ |
| Acceso a hardware (cámara, GPS) | ★★★ | ★★★★ | ★★★★★ |
| App Store distribution | ❌ (limitado) | ✅ | ✅ |
| Actualizaciones sin App Store | ✅ | ✅ (CodePush) | ❌ |
| Costo de mantenimiento | Bajo | Medio | Alto |
| Diseño nativo (gestures, haptics) | Limitado | Bueno | Perfecto |

**Recomendación para ForumPHs:**
- **OPS app campo**: React Native — acceso a cámara nativa (calidad OCR), GPS para photos, gestures nativos. La calidad de la foto del recibo impacta directamente la precisión del OCR de Claude Vision.
- **Portal propietario**: PWA — uso ocasional, no necesita store distribution, Next.js puede reusar código del DF.
- **Quality Dashboard**: PWA responsive — uso en tablet/desktop por IF y Sam principalmente.

**CSS para PWA que se instala como app:**
```html
<!-- Manifest para PWA instalable -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0E1018">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="ForumPHs OPS">
```

```json
// manifest.json
{
  "name": "ForumPHs OPS",
  "short_name": "FPHs OPS",
  "theme_color": "#0E1018",
  "background_color": "#0E1018",
  "display": "standalone",
  "scope": "/ops/",
  "start_url": "/ops/",
  "icons": [...]
}
```

---

## SECCIÓN MOB-8 — PATRONES ESPECÍFICOS OPS APP CAMPO

La OPS app tiene un usuario muy específico: admin de campo del edificio, en movimiento, posiblemente bajo el sol, con una mano ocupada.

```css
/* Pantalla de checklist — optimizada para uso con una mano */
.checklist-screen {
  padding: 16px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom)); /* espacio para el CTA fijo */
}

.checklist-item {
  display: flex;
  align-items: center;
  min-height: 56px;           /* touch target generoso */
  padding: 12px 16px;
  background: rgba(28,34,51,0.6);
  border-radius: 10px;
  margin-bottom: 8px;
  gap: 16px;
  border: 1px solid rgba(255,255,255,0.06);
  transition: background 0.15s ease, border-color 0.15s ease;
}
.checklist-item.completed {
  background: rgba(74,222,128,0.08);
  border-color: rgba(74,222,128,0.2);
}
.checklist-item.failed {
  background: rgba(240,122,122,0.08);
  border-color: rgba(196,98,45,0.3);
}

/* Checkbox grande — fácil de tocar */
.check-area {
  width: 48px; height: 48px;   /* más grande que el mínimo */
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.check-area.checked {
  background: var(--am);
  border-color: var(--am);
}

/* Botón de foto — el más importante de la app */
.photo-capture-btn {
  width: 72px; height: 72px;   /* grande y visible */
  border-radius: 50%;
  background: var(--am);
  border: 3px solid rgba(234,217,245,0.3);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  box-shadow: 0 0 0 8px rgba(92,52,114,0.15);
}
.photo-capture-btn:active {
  transform: scale(0.94);
  box-shadow: 0 0 0 4px rgba(92,52,114,0.25);
}
```

---

_mobile-ux.md v1.0 · ui-ux-layer extension · Unreal>ille Studio · 2026-05-21_
