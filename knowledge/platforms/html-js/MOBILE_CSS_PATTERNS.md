# Mobile CSS Patterns
_Actualizado: 2026-05-20_

## Touch events en elementos no-button

`onclick` en `div`, `card` u otros elementos no-button **no se dispara** en iOS/Android sin:

```css
.mi-elemento-clickeable {
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  cursor: pointer;
}
```

**Obligatorio** en cualquier elemento clickeable que no sea `<button>` o `<a>`.

---

## Flex panels — min-height:0

`tab-panel.active` dentro de un flex container necesita `flex:1` **y** `min-height:0`:

```css
.tab-panel { display: none; }
.tab-panel.active {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  min-height: 0; /* crítico — sin esto el panel colapsa */
}
```

---

## Posicionamiento — position:static fuera del #app

Elementos con `position:static` colocados fuera del `#app` aparecen en posiciones inesperadas cuando `#app` tiene `display:none` por defecto. Regla: todo elemento que forme parte de la UI del app debe estar **dentro** del contenedor `#app`, o usar `position:fixed`.

---

## Input que sube con teclado virtual

`position:fixed` en el input **no se mueve** cuando aparece el teclado virtual en mobile.

Solución correcta — layout flex nativo:

```css
#app {
  display: flex;
  flex-direction: column;
  height: 100dvh; /* dvh = dynamic viewport height */
  overflow: hidden;
}
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.messages { flex: 1; overflow-y: auto; min-height: 0; }
.input-area { flex-shrink: 0; } /* static, al fondo del flex */
```

El teclado reduce `100dvh` y el flex se adapta automáticamente. Sin `position:fixed`.
