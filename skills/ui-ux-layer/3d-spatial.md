# ui-ux-layer · MÓDULO: 3d-spatial
_CSS 3D · Glassmorphism · Profundidad Material · WebGL / Three.js heroes_
_Versión: 1.0 · 2026-05-21_

## CUÁNDO CARGAR ESTE MÓDULO
Landings con momento hero de impacto · Apps con profundidad visual de marca
Onboardings premium · Portadas de propuestas a nuevos clientes
Three.js solo para momentos de marca — nunca en UI funcional.

---

## PRINCIPIO RECTOR

El 3D en UI no es decoración de lujo. Es comunicación de profundidad y jerarquía espacial.
Las capas que se superponen con profundidad real guían al ojo mejor que la jerarquía tipográfica sola.

**Regla:** CSS 3D para profundidad funcional. Glassmorphism para capas de información.
Three.js/WebGL solo para momentos ceremoniales de marca — portada, hero, onboarding.

---

## SECCIÓN 3D-1 — CSS 3D FUNDAMENTALS

```css
/* Setup de escena 3D */
.scene {
  perspective: 1000px;           /* distancia del ojo al plano 0 */
  perspective-origin: 50% 30%;  /* punto de fuga — ligeramente arriba del centro */
}

.scene-deep { perspective: 600px; }   /* más dramático — objetos grandes */
.scene-subtle { perspective: 1400px; } /* más sutil — para UI que no quiere distraer */

/* Contenedor que preserva 3D para hijos */
.preserve-3d {
  transform-style: preserve-3d;
  will-change: transform;
}

/* Backface — el "dorso" de elementos que voltean */
.face { backface-visibility: hidden; }
.face-back { transform: rotateY(180deg); }
```

### Card Flip — patrón de revelación

```css
/* Card que voltea para revelar información adicional */
.flip-card {
  perspective: 800px;
  cursor: pointer;
}
.flip-card-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.flip-card:hover .flip-card-inner,
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  position: absolute; inset: 0;
}
.flip-card-back { transform: rotateY(180deg); }

/* Uso ForumPHs: KPI card que voltea para mostrar detalle de mora
   Frente: % cobro + número grande
   Dorso: breakdown F-I / F-II / F-III / F-IV */
```

### Tilt interactivo — depth on hover

```javascript
// Tilt suave que responde al cursor — profundidad sin flipear
function setupTilt(element, intensity = 10) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -intensity;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensity;
    element.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  });
  element.addEventListener('mouseleave', () => {
    element.style.transform = '';
    element.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
}
/* Aplicar a cards de propuesta, covers de informe, elementos hero */
```

### Pila de tarjetas (Stack)

```css
/* Cards apiladas con profundidad — para mostrar múltiples informes / actas */
.stack { position: relative; }
.stack-item { position: absolute; }
.stack-item:nth-child(1) { z-index:3; transform: translateZ(0); }
.stack-item:nth-child(2) { z-index:2; transform: translateZ(-12px) scale(0.97) translateY(6px); opacity:.85; }
.stack-item:nth-child(3) { z-index:1; transform: translateZ(-24px) scale(0.94) translateY(12px); opacity:.65; }
```

---

## SECCIÓN 3D-2 — GLASSMORPHISM (profundidad por transparencia)

El lenguaje visual de iOS/iPadOS desde 2020. Comunica "soy una capa sobre otra capa".
En dark mode (ForumPHs) es especialmente potente — el blur sobre el Carbon crea profundidad sin peso visual.

```css
/* Glass base — el patrón fundamental */
.glass {
  background: rgba(28, 34, 51, 0.65);  /* --carbon con 65% opacidad */
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Glass Amatista — para elementos de acción principal */
.glass-am {
  background: rgba(92, 52, 114, 0.35);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  border: 1px solid rgba(92, 52, 114, 0.4);
  box-shadow:
    0 8px 32px rgba(58, 31, 74, 0.4),
    inset 0 1px 0 rgba(234, 217, 245, 0.1);
}

/* Glass light — sobre fondos claros (Parchment) */
.glass-light {
  background: rgba(240, 237, 232, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

/* Glass frosted — máxima opacidad, para modales importantes */
.glass-frosted {
  background: rgba(14, 16, 24, 0.85);
  backdrop-filter: blur(40px) saturate(2);
  -webkit-backdrop-filter: blur(40px) saturate(2);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Glass navigation — nav/header flotante */
.glass-nav {
  background: rgba(14, 16, 24, 0.8);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

### Capas de profundidad con glass

```css
/* Sistema de capas explícitas — cuanto más al frente, más opaco */
.layer-bg     { background: var(--carbon-d); }          /* Z-0: fondo */
.layer-base   { background: rgba(28,34,51,0.4); }       /* Z-1: contenido base */
.layer-mid    { background: rgba(28,34,51,0.65); }      /* Z-2: cards */
.layer-top    { background: rgba(28,34,51,0.85); }      /* Z-3: modales, popovers */
.layer-overlay{ background: rgba(14,16,24,0.92); }      /* Z-4: fullscreen overlays */

/* Efecto "flotante" sobre el fondo */
.floating-card {
  background: rgba(28, 34, 51, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.2),
    0 24px 48px rgba(0,0,0,0.3);
  /* Tres capas de sombra = profundidad real */
}
```

### Compatibilidad y fallback

```css
/* Siempre proveer fallback para navegadores sin backdrop-filter */
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgba(28, 34, 51, 0.95); }
  .glass-am { background: rgba(58, 31, 74, 0.95); }
}

/* Performance: activar solo cuando el elemento es visible */
.glass-lazy { backdrop-filter: none; }
.glass-lazy.visible { backdrop-filter: blur(20px); transition: backdrop-filter 0.3s; }
```

---

## SECCIÓN 3D-3 — PROFUNDIDAD MATERIAL SIN 3D

Profundidad creada con sombras, gradientes y opacidad — sin transform 3D real.
Más performante, más compatible, correcto para 90% de los casos.

```css
/* Sistema de elevaciones (Material Design adaptado a Amatista Carbon) */
:root {
  --elevation-0: none;
  --elevation-1: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15);
  --elevation-2: 0 3px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2);
  --elevation-3: 0 8px 16px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2);
  --elevation-4: 0 16px 32px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.25);
  --elevation-5: 0 32px 64px rgba(0,0,0,0.4), 0 16px 32px rgba(0,0,0,0.3);

  /* Elevaciones con tinte Amatista — para elementos interactivos */
  --elevation-am-1: 0 2px 8px rgba(92,52,114,0.2);
  --elevation-am-2: 0 4px 16px rgba(92,52,114,0.25);
  --elevation-am-3: 0 8px 32px rgba(92,52,114,0.3);
}

.card-e1 { box-shadow: var(--elevation-1); }
.card-e2 { box-shadow: var(--elevation-2); }
.card-e3 { box-shadow: var(--elevation-3); }
.card-am { box-shadow: var(--elevation-am-2); }

/* Hover: subir elevación */
.card-interactive:hover {
  box-shadow: var(--elevation-3);
  transform: translateY(-2px);
}
```

---

## SECCIÓN 3D-4 — THREE.JS / WEBGL (momentos ceremoniales)

**Cuándo usar:** Portadas de propuestas a nuevos clientes · Onboarding de la OPS app · 
Pantalla de bienvenida del Quality Dashboard · Momentos de celebración (% cobro 100%)

**Cuándo NO usar:** En ningún componente de UI funcional. En ningún elemento que el usuario
vea repetidamente. Three.js es para el primer impacto — no para el día a día.

```javascript
// Setup básico — compatible con React/Next.js como componente
import * as THREE from 'three';

class ForumPHsHero {
  constructor(canvas) {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera — perspectiva para profundidad real
    this.camera = new THREE.PerspectiveCamera(60, canvas.width/canvas.height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    
    // Renderer con alpha para transparencia sobre el fondo CSS
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // transparente
    
    this.setupScene();
    this.animate();
  }
  
  setupScene() {
    // Partículas Amatista — el "universo" de la marca
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 20;
      positions[i*3+1] = (Math.random() - 0.5) * 20;
      positions[i*3+2] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x5C3472,     // --am
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
    
    // Aro Terra — el acento que orbita
    const torusGeo = new THREE.TorusGeometry(2, 0.008, 8, 120);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xC4622D,  // --terra
      transparent: true,
      opacity: 0.4,
    });
    this.ring = new THREE.Mesh(torusGeo, torusMat);
    this.ring.rotation.x = Math.PI * 0.3;
    this.scene.add(this.ring);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.particles.rotation.y += 0.0003;
    this.particles.rotation.x += 0.0001;
    this.ring.rotation.z += 0.002;
    this.renderer.render(this.scene, this.camera);
  }
  
  // Llamar al navegar fuera del hero — liberar GPU
  dispose() {
    this.renderer.dispose();
    this.scene.clear();
  }
}

// En React — cleanup obligatorio
useEffect(() => {
  const hero = new ForumPHsHero(canvasRef.current);
  return () => hero.dispose(); // cleanup al desmontar
}, []);
```

### Reglas de performance para Three.js

```
1. Dispose siempre al desmontar el componente — BufferGeometry, Material, Renderer
2. devicePixelRatio máximo 2 — en pantallas 3x no es necesario y cuesta el doble
3. No más de 5000 vértices en escenas hero — sobre todo en mobile
4. Pausar el loop de animación cuando el canvas no es visible (IntersectionObserver)
5. Nunca en el critical path de carga — usar dynamic import() para Three.js
6. Siempre fallback CSS para cuando Three.js no carga o el device no puede
```

---

## SECCIÓN 3D-5 — PATRONES DE PROFUNDIDAD PARA FORUMPHS

### Dashboard con profundidad

```css
/* Fondo con radial gradient que simula fuente de luz */
.dashboard-bg {
  background:
    radial-gradient(ellipse at 70% 0%, rgba(92,52,114,0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 100%, rgba(196,98,45,0.08) 0%, transparent 40%),
    var(--carbon-d);
}

/* KPI cards con elevación progresiva según importancia */
.kpi-primary   { box-shadow: var(--elevation-am-3); z-index: 3; }
.kpi-secondary { box-shadow: var(--elevation-am-2); z-index: 2; }
.kpi-tertiary  { box-shadow: var(--elevation-am-1); z-index: 1; }
```

### Mobile OPS app — profundidad funcional

```css
/* Capas de la app de campo — la cámara "flota" sobre el contenido */
.camera-overlay {
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(0); /* sin blur — claridad para captura */
}
.camera-controls {
  background: rgba(14,16,24,0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  /* Los controles flotan sobre la preview de la cámara */
}

/* Checklist que "vuela" sobre la foto de inspección */
.checklist-overlay {
  background: rgba(28,34,51,0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255,255,255,0.08);
  /* Bottom sheet sobre la inspección visual */
}
```

---

_3d-spatial.md v1.0 · ui-ux-layer extension · Unrealville Studio · 2026-05-21_
