# LucienSael — Identidad visual · fuente canónica

**Incorporado:** 2026-08-22 · **Estado:** CANÓNICO
**Documento maestro:** [`lucien-sael-brand-identity-v1.html`](./lucien-sael-brand-identity-v1.html) — Brand Identity System v1.0

Este directorio es la **fuente de verdad de la identidad visual de Lucien Sael**. Ante cualquier
discrepancia entre estos archivos y otra copia del ecosistema (una web, un preset, una tabla),
manda lo que dice acá — o se corrige acá primero y después se propaga.

---

## Los archivos

| archivo | qué es |
|---|---|
| `lucien-sael-brand-identity-v1.html` | El sistema completo: paleta (8 roles), tipografía (3 familias), logotipo, firma y reglas de uso. Autocontenido salvo la carga de Google Fonts. |
| `LucienSael_logotype_dark-bg.svg` | Logotipo sobre fondo oscuro — `bone` upright + `ember` itálica. **Variante primaria.** |
| `LucienSael_logotype_light-bg.svg` | Logotipo sobre fondo claro — `carbon` upright + `ember` itálica. Uso infrecuente (§03). |

### Cómo se generaron los dos SVG

Los logotipos **no se dibujaron aparte**: se extrajeron del propio documento maestro (§03 Logotype),
que los lleva embebidos, con **una diferencia deliberada**.

Los SVG del documento resuelven las letras con `<text>` + `@import` de Google Fonts. Eso funciona en
un navegador con red y **falla en todo lo demás**: como archivo suelto en Illustrator, Figma o
InDesign, en un email, en un favicon o en cualquier rasterizador sin acceso a la hoja de estilos, el
`@import` no carga y las letras caen a Georgia — el logotipo se dibuja con otra fuente **sin avisar**.

Un asset canónico no puede depender de la red para tener la forma correcta. Por eso estos dos
archivos llevan las letras como **trazados** (`<path>`), generados desde la fuente real (Cormorant
Garamond Light 300, normal e itálica) respetando la construcción declarada al pie:

```
viewBox 0 0 320 96 · Cormorant Garamond 300 · letter-spacing .12em
"Lucien" upright  x=2  y=39   ·  "Sael" itálica  x=2  y=80
```

Verificados rasterizando ambas variantes sobre `obsidian` y sobre `bone`.

> **Si el logotipo cambia**, se cambia en el documento maestro y se regeneran los dos SVG desde ahí.
> Nunca al revés: un SVG editado a mano que no coincida con §03 es una tercera versión de la marca.

---

## Cómo se consume esta identidad en el ecosistema

La identidad **no se lee de este HTML en runtime**. El pipeline la consume desde Supabase, y estas
tablas tienen que reflejar lo que dice el documento:

| qué | dónde vive en la DB | estado al 2026-08-22 |
|---|---|---|
| Paleta (8 roles) | `public.brand_palette` | ✅ los 8 roles y los 8 hex coinciden exactamente |
| Tipografía (3 familias) | `public.brand_typography` | ⚠️ familias correctas, **pesos no** — ver abajo |
| Composición sobre imagen | `public.imagelab_overlay_tokens` | sembrada en BRIEF 8 con `display`/`body` + franja `ember` |
| Firma de cierre | `public.brand_voice_genome.application_constraints.signature_closer` | ⚠️ **contradice al documento** — ver abajo |

### ⚠️ Dos divergencias detectadas al incorporar el documento

**1 · Los pesos declarados no están en el `css_import`.**
§02 declara display «300 · 300i · 600i», body «300 · 300i · 400 · 400i · 600i» y mono «300 · 400 ·
700». Los `css_import` vigentes traen display `400;500;600` sin itálica, body `400;500` y mono `400`.
Con eso es **imposible componer la marca con los pesos de su propia identidad**: el compositor elige
el peso más cercano disponible y no avisa. Corrección propuesta (aditiva y reversible) en
`unrlvl-iid-functions`, migración `20260822160000`.

**2 · La firma que se estampa no es la del documento.**
§04 dice que la frase «I build worlds. Some of them survive.» es la firma permanente y que
**reemplaza cualquier título o descriptor**; §05 lo refuerza: *«Never "CEO", "Founder", "Strategist",
"Consultant" — la frase reemplaza todos los títulos»*. Hoy `lucien_editorial` estampa
`— Lucien Sael · Builder, Thinker, Operator`: tres títulos, en mayúsculas.

**No es un error del pipeline**: es una decisión registrada en `session_log.md` el **2026-08-09**
(política de idioma, firmas por voz), anterior a este documento. Son dos fuentes canónicas que dicen
cosas distintas, y **la decisión es de Sam**, no del sistema:

- si manda el documento → `signature_closer.text/text_en` de `lucien_editorial` pasa a la frase, y
  `lucien_social` (`— luciensael.com`) hay que revisarlo con el mismo criterio;
- si manda la decisión del 09-ago → el documento se corrige en §04/§05 para que deje de contradecirla.

Lo que no puede quedar es la contradicción viva: es exactamente lo que un documento canónico existe
para impedir.

---

## Reglas duras que este documento fija (resumen operativo)

- **Colores:** nunca cyan, blanco puro ni azul — «those are UNRLVL's world». `ember` para el elemento
  más importante de cada vista; `gold` para énfasis secundario.
- **Tipografía:** nunca Bebas Neue ni Space Mono (son de UNRLVL). Sin fuentes de sistema. Sin
  sans-serif en contextos editoriales.
- **Logotipo:** «Lucien» nunca en itálica; «Sael» nunca en un color que no sea `ember` (fondo oscuro)
  o `carbon` (fondo claro); `gold` **jamás** en el logotipo; nunca la frase de firma pegada al
  logotipo; mínimo 16 px; aire mínimo = 1× la altura de caja de «Lucien».
- **Relación con UNRLVL:** Lucien Sael es la **persona**; Unreal>ille Studio es uno de sus **mundos**.
  Nunca afiliación ni empleador.
