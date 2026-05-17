# JUDGE.ME — Manual de Plataforma
_Categoría: platform_
_Versión: v1.0 · 2026-05-17 · Estado: approved_

---

## QUÉ ES
App de reviews para Shopify. UNRLVL la usa para mostrar reseñas de productos en tiendas cliente. Se instala via Shopify App Store. Ofrece widget de reviews y badge de rating.

---

## CUÁNDO USAR ESTE MANUAL
- Implementar Judge.me en una tienda Shopify
- Diagnosticar problemas con el badge o widget de reviews
- Personalizar la apariencia para un tema dark
- Manejar el estado "sin reviews aún"

---

## PRE-REQUISITOS
- Judge.me instalado desde Shopify App Store
- Acceso al editor de tema Shopify (archivos `.liquid`)
- Snippets de Judge.me disponibles: `judgeme_widgets.liquid`

---

## VARIABLES CRÍTICAS

| Variable | Valor correcto | ⚠️ Error común |
|---|---|---|
| Metafield badge | `product.metafields.judgeme.badge` | ❌ No usar `preview_badge` |
| Metafield widget | `product.metafields.judgeme.widget` | — |
| Namespace | `judgeme` | ❌ No usar `judge.me` ni `judgeme_widget` |

---

## LIMITACIONES CONOCIDAS

| Limitación | Causa | Workaround |
|---|---|---|
| El metafield badge llega con `style='display:none'` inline | Judge.me lo oculta por defecto hasta que su JS lo muestra | Stripear con Liquid: `{{ product.metafields.judgeme.badge.value \| replace: "style='display:none'", "" }}` |
| El widget tiene un `<style class='jdgm-temp-hiding-style'>` | Mismo patrón de ocultación del badge | Stripear antes de renderizar |
| En temas dark el CSS de Judge.me gana al del tema | Judge.me inyecta CSS desde CDN con alta especificidad | Usar `element.style.setProperty(prop, value, 'important')` en JS |
| `data-auto-install='true'` sobreescribe el estado "sin reviews" con empty state propio de Judge.me | Judge.me detecta 0 reviews y reemplaza el HTML | No usar `data-auto-install='true'` cuando hay estado sin reviews custom |

---

## PROCEDIMIENTO — Implementación con dark theme

```liquid
{% comment %} Badge — con reviews {% endcomment %}
{% assign badge_html = product.metafields.judgeme.badge.value %}
{% if badge_html != blank %}
  {% assign badge_clean = badge_html
    | replace: "style='display:none'", ""
    | replace: 'style="display:none"', "" %}
  {{ badge_clean }}
{% else %}
  {% comment %} Sin reviews — badge custom {% endcomment %}
  <div class="jdgm-badge-no-reviews">
    ★★★★★ <span>Sin reseñas aún</span>
  </div>
{% endif %}
```

**Dark theme override en JS:**
```javascript
document.querySelectorAll('.jdgm-star').forEach(el => {
  el.style.setProperty('color', '#C4622D', 'important');
});
```

---

## PROCEDIMIENTO — Widget de reseñas (tab)

```liquid
{% comment %} Widget — con reviews {% endcomment %}
{% assign widget_html = product.metafields.judgeme.widget.value %}
{% if widget_html != blank %}
  {% assign widget_clean = widget_html
    | replace: "<style class='jdgm-temp-hiding-style'>", ""
    | replace: "</style>", "" %}
  {{ widget_clean }}
{% else %}
  {% comment %} Sin reviews — HTML custom (NO usar Judge.me JS — sobreescribiría) {% endcomment %}
  <div class="reviews-empty-state">
    <p>Sé el primero en dejar tu reseña.</p>
  </div>
{% endif %}
```

---

## ERRORES CONOCIDOS

| Error | Causa | Solución |
|---|---|---|
| Badge no aparece aunque hay reviews | Metafield key incorrecto (`preview_badge` en vez de `badge`) | Cambiar a `product.metafields.judgeme.badge` |
| Badge visible pero con `display:none` | El metafield incluye el style inline | Stripear con Liquid replace antes de renderizar |
| Widget vacío en estado sin reviews | `data-auto-install='true'` activo + 0 reviews | Remover el atributo y usar HTML custom propio |
| Stars sin color en dark theme | CSS de CDN de Judge.me tiene alta especificidad | Usar `setProperty` con `'important'` en JS |

---

## VARIACIONES POR CLIENTE

**NeuroneSCF B2C:** implementación completa con dark theme (#C4622D naranja). Snippets en `snippets/judgeme_widgets.liquid` v15. Estado sin reviews: 5 estrellas sólidas + texto "Sin reseñas aún".

---

## CHANGELOG

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-17 | Creación inicial — metafields correctos, dark theme override, strip display:none |
