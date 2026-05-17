# KLAVIYO — Manual de Plataforma
_Categoría: platform_
_Versión: v1.0 · 2026-05-17 · Estado: approved_

---

## QUÉ ES
Plataforma de email marketing y automatización. UNRLVL la usa para flows de email transaccional y de marketing para marcas cliente. Integrada con Shopify.

---

## CUÁNDO USAR ESTE MANUAL
- Configurar Klaviyo en una tienda nueva
- Crear o modificar templates de email
- Configurar flows de automatización
- Diagnosticar problemas de integración Shopify-Klaviyo

---

## PRE-REQUISITOS
- Cuenta Klaviyo con plan activo (mínimo Email $20/mes para flows)
- Integración Shopify conectada y activa
- Dominio de email verificado (DNS: NS + DKIM + SPF + DMARC)
- Public API Key disponible

---

## CONFIGURACIÓN NeuroneSCF (referencia)
- Plan: Email $20/mes
- Public API Key: `UNF8Ee`
- Dominio verificado: `neuronescflorida.com`
- Script instalado en: `layout/theme.liquid`

---

## LIMITACIONES CONOCIDAS

| Limitación | Causa | Workaround |
|---|---|---|
| No se pueden eliminar ni renombrar templates via API | Public API key no tiene permisos de DELETE | Borrar manualmente en UI de Klaviyo |
| No se pueden crear flow actions via REST API | La API solo permite crear flows vacíos, no añadir actions | Configurar la estructura de actions manualmente en la UI |
| Filtro Liquid `\| money` de Shopify no funciona en templates Klaviyo | Klaviyo no ejecuta filtros Liquid de Shopify | Usar `{{ item.price }}` directamente |
| Trigger "Added to Cart" requiere configuración especial | Evento no estándar en Shopify-Klaviyo sync | Usar "Checkout Started" como alternativa (igual o mejor — cliente ya escribió email) |
| Image URL en line_items: nombre de propiedad variable | Puede ser `image_url` o `ImageUrl` según la versión | Usar conditional: `{% if item.image_url %}...{% elsif item.ImageUrl %}...{% endif %}` |

---

## PROCEDIMIENTO — Template con imagen de producto

```html
{% if item.image_url %}
  <img src="{{ item.image_url }}" width="80" style="border-radius:4px;">
{% elsif item.ImageUrl %}
  <img src="{{ item.ImageUrl }}" width="80" style="border-radius:4px;">
{% else %}
  <!-- fallback: logo o imagen por defecto de la marca -->
{% endif %}
```

---

## PROCEDIMIENTO — Flow bilingüe ES/EN

Estructura estándar para flows con audiencia Shopify:

```
Trigger (ej: Checkout Started)
  → Delay [tiempo]
  → Conditional Split: $locale = es-US
      YES → Email ES
      NO  → Email EN (cubre EN + RU + FR + todos los demás)
```

**Regla de split:** ES = es-US · EN = todo lo demás. Simplifica vs. split por idioma.

---

## PROCEDIMIENTO — Flows requeridos NeuroneSCF

| Flow | Trigger | Delay | Emails |
|---|---|---|---|
| Abandoned Cart | Checkout Started | 1h | Email A · +23h → Email B |
| Post Purchase | Placed Order | 2 días | 1 email |
| Review Request | Placed Order | 14 días | 1 email |
| Welcome | List join | Inmediato | 1 email |

**PENDIENTE configuración manual en UI** (API no permite añadir actions a flows).

---

## ERRORES CONOCIDOS

| Error | Causa | Solución |
|---|---|---|
| Template duplicado en Klaviyo sin ID visible | Klaviyo crea duplicados al hacer push via API si el nombre ya existe | Borrar manualmente los duplicados sin ID en el nombre desde la UI |
| Precios muestran valor sin formato (ej: "2000" en vez de "$20.00") | Filtro Liquid `\| money` no funciona en Klaviyo | Usar `{{ item.price }}` y formatear en el template HTML |
| Flow no envía emails | Actions no configuradas — la API crea el flow vacío | Abrir el flow en Klaviyo UI y añadir las actions manualmente |

---

## VARIACIONES POR CLIENTE

**NeuroneSCF:** Public Key `UNF8Ee` · plan Email · dominio `neuronescflorida.com` · 10 templates activos (5 EN + 5 ES) con IDs documentados en `brands/NeuroneSCF/session_log.md`

---

## CHANGELOG

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-05-17 | Creación inicial — limitaciones API documentadas, flow bilingüe, template imagen |
