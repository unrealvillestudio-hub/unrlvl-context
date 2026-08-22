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
| Tipografía (3 familias) | `public.brand_typography` | ✅ **RESUELTO 2026-08-22** por ruling de Sam — entró por **dato**, no por DDL; ver abajo |
| Composición sobre imagen | `public.imagelab_overlay_tokens` | sembrada en BRIEF 8 con `display`/`body` + franja `ember` |
| Firma de cierre | `public.brand_voice_genome.application_constraints.signature_closer` | ✅ **RESUELTO 2026-08-22** por ruling de Sam — manda la DB; el documento se corrigió (§04/§05) |

### Dos divergencias detectadas al incorporar el documento

> **Estado al 2026-08-22 (corregido al cierre):** **las dos quedaron RESUELTAS** por ruling de Sam —
> cada una con su bloque de resolución debajo. El texto original de ambas se conserva íntegro.
>
> _La redacción previa de esta línea decía «la **1 sigue abierta**»: era **incorrecta**. CC verificó
> `brand_typography` de **ForumPHs**, no de **LucienSael**, y arrastró el diagnóstico anterior sin
> comprobarlo contra el registro de la marca. Corregido con la DB a la vista._

**1 · Los pesos declarados no están en el `css_import`.**
§02 declara display «300 · 300i · 600i», body «300 · 300i · 400 · 400i · 600i» y mono «300 · 400 ·
700». Los `css_import` vigentes traen display `400;500;600` sin itálica, body `400;500` y mono `400`.
Con eso es **imposible componer la marca con los pesos de su propia identidad**: el compositor elige
el peso más cercano disponible y no avisa. Corrección propuesta (aditiva y reversible) en
`unrlvl-iid-functions`, migración `20260822160000`.

> #### ✅ RESOLUCIÓN de la divergencia 1 — ruling de Sam, 2026-08-22
>
> **Ya estaba resuelta en el dato.** El cambio entró por **UPDATE directo el 22-ago bajo HRD**, con el
> ok de Sam, **no por DDL** — por eso la migración `20260822160000` no figura en el registry.
>
> **`css_import` vigente del rol `display`** (verificado contra `public.brand_typography` el 22-ago):
> `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap`
> — cubre 300, 600, 300i y 600i, que es lo que §02 declara para display.
>
> **El ruling de fondo:** *«los pesos van según el largo, no cerrados»*. La lista de §02 **no es un
> contrato cerrado**: se sirve el peso que el largo del texto pide. Eso disuelve la divergencia como
> contradicción — no era el documento contra la DB, era una lista leída como enumeración exhaustiva
> cuando nunca lo fue.
>
> **Estado verificado de los otros dos roles** (mismo chequeo, 22-ago), para que nadie lo reabra:
> `body` = `Crimson+Pro:wght@400;500` · `mono` = `JetBrains+Mono:wght@400`. **No se tocaron y no hace
> falta que se toquen**: bajo el ruling, no llevar cada peso declarado no es una divergencia.
>
> **La migración `20260822160000` NO se aplica** — duplicaría lo que ya está en el dato. Se
> **reclasifica como documento de la decisión**.

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

#### ✅ RESOLUCIÓN de la divergencia 2 — ruling de Sam, 2026-08-22

**Manda la decisión del 09-ago. El documento es lo que se corrige.**

- **«I build worlds. Some of them survive.» es el SLOGAN**, no la firma. Sigue siendo permanente,
  invariable y sin explicación — en **las superficies propias de Lucien**: footer web, byline
  editorial, email.
- **La FIRMA de una pieza distribuida —posts y ads— es `— Lucien Sael · Builder, Thinker, Operator`**,
  que es el `signature_closer` de `lucien_editorial` (y `— luciensael.com` en `lucien_social`). La
  estampa el sistema tras el PASS del Watcher; el copy nunca la escribe; no sustituye al CTA cuando
  el genoma dice que el CTA cierra la pieza.
- **Los tres títulos no son un rango corporativo.** «Builder, Thinker, Operator» nombran lo que hace.
  La prohibición de fondo del documento se mantiene intacta: **nunca** «CEO», «Founder»,
  «Strategist», «Consultant».

**Qué cambió y dónde:** `lucien-sael-brand-identity-v1.html` §04 lleva ahora el ruling en cabecera de
sección —gobierna todo el documento, incluidas las menciones de §03— y §04/§05 quedan reescritos
distinguiendo slogan de firma. **Nada se borró:** las redacciones v1.0 derogadas se conservan dentro
del propio documento bajo bloques `⛔ No operativo`.

**Qué NO cambia:** `signature_closer` en la DB **no se toca**. La contradicción se resolvió a favor
del sistema, así que no hay migración que hacer — sólo dejó de haber dos fuentes canónicas diciendo
cosas distintas.

> **La divergencia 1 también quedó resuelta** — ver su bloque de resolución arriba.
>
> **⛔ No operativo — redacción previa de esta nota, derogada el 2026-08-22:** *«La divergencia 1
> (pesos tipográficos) sigue abierta. La corrección aditiva propuesta en `unrlvl-iid-functions`,
> migración `20260822160000`, no se aplicó.»* Era **incorrecta**: el cambio ya había entrado **por
> dato** el mismo día. La migración no se aplica y se reclasifica como documento de la decisión.

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
