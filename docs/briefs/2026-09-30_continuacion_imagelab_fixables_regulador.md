# BRIEF — Continuación: el carril ampliado a formatos, ImageLab y fixables

_Versión 2 · escrita por CC el 2026-09-29 al cierre de la sesión del 2026-09-28/29, a pedido de Sam
(«dime lo que queda pendiente de esta sesión incluyendo el brief corregido de la nueva»). **Sustituye
a la versión 1 como brief operativo**; la versión 1 queda íntegra debajo, bajo guard `⛔ NO
OPERATIVO`, porque la mitad de sus frentes ya se cerró en la misma sesión._

---

## 🟩 MENSAJE PARA SAM — Qué necesita esta sesión de ti

1. **Aprobar o corregir los learnings** de la sesión en Professor (listados en
   `brands/NeuroneSCF/session_log.md` 2026-09-29 v2). Van con `approved_by_sam = false` hasta que lo
   digas.
2. **Decisión: el mix de formatos por marca y canal** para la semana del 2026-10-05 (Sam, 29-sep:
   «el resto de esta semana se publiquen estos nuevos formatos y a partir de la próxima semana se
   mezclen»). CC propone el mix con datos; tú fijas las proporciones.
3. **Decisión: el velo de las láminas.** Los tokens `CAROUSEL` pasaron de velo sólido al 72 % a
   degradado inferior, para que se vea la imagen de cada lámina (el valor anterior está en
   `_previous`). ¿Se queda?
4. **Validar los modelos 9:16** (`docs/modelos_9x16/`, M1–M6): cuáles quedan, cuáles cambian y cuáles
   faltan. Sin tu validación no se vuelven dato.
5. **Revisar la bandeja** si al abrir quedan carruseles del 29 sin publicar (ver «Estado al cierre»).

---

## 🟧 MENSAJE PARA CC — Retomar la actividad

### Carga obligatoria al abrir
1. `protocols/CC_PROTOCOL.md`, `protocols/MULTIBRAND_RULE.md` y
   `protocols/DELIVERY_AND_VERIFICATION_RULE.md`, desde el repo. Vercel solo con la tool
   `Vercel:web_fetch_vercel_url`, nunca con `curl`.
2. **Skill de fixables:** `skills/sesion-de-fixables/SKILL.md` (v1.0), y su puntero en
   `skills/reparacion-de-carril/SKILL.md` §4 bis.
3. `skills/publicacion-operativa/SKILL.md` §C.7 y §C.8.
4. Marca: `brands/NeuroneSCF/brand.json`, `BP_Brand_Context.md` y `session_log.md` (entrada
   2026-09-29 v2).
5. `docs/modelos_9x16/README.md`.

### Frentes abiertos, en orden

**0 · Cierre de los carruseles del 29, si quedó algo** [`medido` al escribir, 16:55 UTC]
- **Publicado:** 6d24a1cd, como `CAROUSEL` de 6 (post `122130867860735330`).
- **Revisados y con el slot liberado:** f89f768b, 3735b1da, da5fe472 y 8e22fbae.
- **En composición al cierre:** 021dc019, cf57fe53 y babcc7de. A babcc7de le falta la lámina 6: tres
  bloqueos SAFETY por la vía `recompose`. Se genera con `carousel_slide` (#270).
- **Cómo se cierra:**
  - Revisar la hoja completa de cada uno.
  - Liberar su slot: `last_drain_check_at = null` en `intel.brand_publish_slots`.
  - Verificar en `scheduled_posts` que salió con `media_type = 'CAROUSEL'` y 6 URLs.
- **Limpieza:**
  - Cron `cc-laminas-componer-2026-09-29` (135), con `cron.unschedule`.
  - Tablas `intel.cc_laminas_2026_09_29` y `intel.cc_laminas_backup_2026_09_29`.
  - Funciones `intel.cc_laminas_paso()` e `intel.cc_laminas_componer_paso()`.
  - Tablas `intel.cc_carruseles_2026_09_29` e `intel.cc_hooks_2026_09_29`.
  - Verificar que `brand_persons` de NeuroneSCF quedó en `active = true` [`medido` 16:55 UTC: sí].

**1 · El carril ampliado a formatos** (Sam, 29-sep: «para mañana ya deberemos tener el carril
ampliado a los distintos formatos. No olvides que vienen los formatos de vídeo»)
- **Formato por franja como dato:** qué formato publica cada marca × canal y en qué proporción.
  `publish-slot-reserver` asigna el `format` a la franja y la pieza nace con él.
- **Texto de las láminas desde CopyLab:** hoy lo escribe CC a mano. Es un `content_type` de carrusel
  por voz en `content_type_registry`, con 5–7 láminas: gancho, desarrollo, producto, dato y cierre con
  CTA.
- **Imagen por lámina como defecto:** el orquestador llama a `carousel_slide` (#270) **una lámina por
  invocación y en serie**, con una directriz por tipo de lámina. `carousel` (misma escena) queda solo
  para composición barata.
- **Vídeo:** solo el plan (Reels y TikTok). No se construye sin QA-OBJETIVO con Sam.

**2 · Catálogo de layouts 1:1 y 4:5** a partir de los modelos 9:16 (Sam: «ese mismo mapeo debería
tenerlo los posts actuales»). Primero la validación de Sam (punto 4 de su bloque).

**3 · Fiabilidad de ImageLab** [`medido` el 29]
- **Cerca de la mitad de las generaciones** de la sesión necesitaron regenerarse.
- **Deriva de identidad** de Patricia.
- **El kit sale entero en la mano:** con persona debe viajar el producto ancla, no la foto de grupo.
- **Producto en la mano** aunque la directriz diga «sin producto».
- **Frasco sin etiqueta.**
- **«Espacio limpio a la izquierda»** tomado literal: sale una franja blanca.
- **Bloqueos SAFETY de Gemini** en escenas inocuas. **Deducido:** el disparador es el copy completo
  de la pieza, que `recompose` envía al constructor.
- Cada caso, con su pieza, está en `brands/NeuroneSCF/session_log.md` 2026-09-29 v2.

**4 · `recompose` acumula directrices** (`content-run-stage/index.ts`, `directivesOfImage` +
`appendDirective`) y el constructor elige entre ellas.
- Es diseño de BRIEF-IMG-01 fase 3, pero hizo que una corrección nueva devolviera la escena de una
  anterior.
- Proponer a Sam, con QA-OBJETIVO: que la última directriz mande o que la lista se pueda vaciar. No
  se cambia sin su decisión.

**5 · Corrector de producto** (plan antes que código):
- **6110a5a7:** tamaño.
- **6bb3ebc0:** etiqueta, con la técnica de Professor `75331271`.

**6 · Piezas aprobadas con el motor viejo** (`persona_used = null` y producto genérico): detectarlas
antes de que se publiquen. Hoy aparecieron 4 carruseles NSCF generados del 11 al 16 de septiembre.

**7 · Fixables pendientes:**
- 7 piezas retadas sin imagen limpia.
- **2293bf19:** el título nombra una marca competidora; se corrige.
- ForumPHs IG `cd8a6842`: el job falló; leer su error.

**8 · Limpieza y fechas:**
- Crons 119 y 121, con sus tablas y funciones.
- **2026-10-03:** `lab_configs` (`imagelab`) `default_params.image_calls_max` vuelve de 180 a 100.

### Estado al cierre [`medido` salvo donde se indica]
- **PR mergeados en la sesión** [`medido` por GitHub, o `reportado` por Sam donde lo dijo]:
  - `unrlvl-iid-functions` #266, #267, #268, #269 y #270; las EF, desplegadas por Sam.
  - `SocialLab` #6 y `unrlvl-meta-mcp` #5.
  - `unrlvl-context` #121 y #122.
- **Carrusel extremo a extremo:**
  - La pieza guarda sus láminas en `assets.carousel`.
  - `content-scheduler` las pasa a `scheduled_posts.media_type` / `media_urls`.
  - SocialLab publica en IG (contenedores hijos) y en FB (`fb_publish_photos`).
- **Umbral por suscripción:** `brand_topics.min_content_score`; ForumPHs en 60 (#268).
- **Regulador de entrada:** desplegado (#267).
- **Crons de UVS y Lucien:** reactivados por decisión de Sam.

### Reglas de esta actividad (no negociables)
- **Nada se publica ni vuelve a la bandeja sin revisión visual de CC.** Cada lámina se mira; la hoja
  completa también.
- **Una imagen a la vez:** Vertex devuelve 429 en paralelo.
- **Para retener una franja sin tocar su hora**, se usa `last_drain_check_at = now()`, que el drain
  respeta durante `drain_backoff_sin_publicador`. Se libera con `null`.
- **Patricia:**
  - Referencias: recortes de cara.
  - Cabello exacto.
  - Nunca seria; la mirada siempre tiene destino.
- **Texto de imagen:** abre la tensión y **el título le responde** (`HR-GEN-17`); nunca lo repite. _Corregido 2026-09-30 por Sam: antes decía «responde al título, nunca lo repite», dirección invertida._
- **Nunca** precios, marcas competidoras ni alusiones al dinero.
- «Nanotribología», con mayúscula.
- El diagnóstico con Patricia es gratuito.

### Test de la marca N+1
1. **¿Sobrevive a otra marca?** Sí. Formato por franja, texto de láminas, imagen por lámina y layouts
   son eje. Proporciones, voces y personas son dato por `brand_id`.
2. **¿El nombre describe la función?** Sí: `format`, `carousel_slide`, `image_per_slide` y catálogo de
   layouts.
3. **¿Eje o instancia?** El mecanismo es eje; el mix de cada marca es instancia.
4. **¿Cuántas marcas hay en la enumeración?** Ninguna enumeración nueva en código.

### QA
- **QA-ENCARGO:** confirmado por Sam el 2026-09-29.
- **QA-OBJETIVO:** validado para el frente 0. **Pendiente** para los frentes 1, 2, 4 y 5: se valida con
  Sam antes de producir.
- **QA-INFO:** faltan el mix de formatos (Sam) y la validación de los modelos 9:16 (Sam).
- **QA-PROP:**
  1. **Qué tiene que ser cierto:** que Sam fije el mix y valide los modelos; que `carousel_slide` se
     comporte en producción como en su PR. **Deducido:** su primera llamada real es babcc7de, lámina 6.
  2. **Medido o deducido:** declarado en cada punto.
  3. **Qué se rompe:** nada al leer este brief; cada frente declara lo suyo en su PR.
  4. **Cómo se revierte:** cada frente, en su PR. Los datos temporales, con su respaldo
     (`cc_laminas_backup_2026_09_29` y `_previous` en los tokens).
  5. **Efecto observable:** una pieza nueva nace con `format` según el mix de su franja y, si es un
     carrusel, se publica con una imagen distinta por lámina sin intervención de CC.

---

> ⛔ **NO OPERATIVO — versión 1 del brief (2026-09-29).** Se conserva íntegra por trazabilidad y **no
> se ejecuta**. Sus frentes 1 (9:16), 5 (decisiones de crons y umbral) y el despliegue de #267 se
> cerraron en la misma sesión. Lo que sigue abierto se trasladó a la versión 2, arriba.

# BRIEF — Continuación: sesión de ImageLab, fixables NSCF y regulador de entrada

_Escrito por CC el 2026-09-29 al cierre de la sesión del 2026-09-28/29, a pedido de Sam («deja un
brief, menciona el skill de fixables y lo que necesite una nueva sesión para retomar esta
actividad»). Para abrir sesión nueva y trabajar sin reconstruir la historia._

---

## 🟩 MENSAJE PARA SAM — Qué necesita esta sesión de ti

1. **Mergear [unrlvl-iid-functions#267](https://github.com/unrealvillestudio-hub/unrlvl-iid-functions/pull/267)
   y desplegar la EF `content-dispatcher`.** Sin ese despliegue el regulador de entrada existe en la
   base (la vista `intel.v_carril_entrada`) pero el dispatcher todavía no la consulta.
2. **Decisión:** reactivar o no los 22 crons de research/process de UnrealvilleStudio y LucienSael.
   Con el regulador desplegado, los hallazgos se acumulan pero no se producen sin cupo.
3. **Decisión:** umbral de hallazgos de ForumPHs (hoy 70). Con 60 entrarían 2 hallazgos más de los
   agentes nuevos.
4. **Aclaración:** «9:16 genera un modelo de referencia 9:16 desde cero» — la lectura de CC está en
   el punto 1 de la sección para CC; confirmarla o corregirla al abrir.
5. **Revisar la bandeja** (piezas listadas en «Estado al cierre»).

---

## 🟧 MENSAJE PARA CC — Retomar la actividad

### Carga obligatoria al abrir
1. `protocols/CC_PROTOCOL.md`, `protocols/MULTIBRAND_RULE.md`,
   `protocols/DELIVERY_AND_VERIFICATION_RULE.md` (desde el repo; Vercel sólo con la tool
   `Vercel:web_fetch_vercel_url`, nunca `curl`).
2. **Skill de fixables:** `skills/reparacion-de-carril/SKILL.md` **§ FIXABLES** (añadida en este
   Actualiza): cómo se corrige una pieza devuelta por Sam — leer el motivo, separar texto de imagen,
   directriz por pieza, cola de a una, revisión visual antes de devolver a la bandeja.
   Complementa `skills/publicacion-operativa/SKILL.md` §C.7 (qué hace cada clic de la bandeja) y
   §C.8 (el volumen).
3. Para el regulador: `CAPABILITIES.md` §«El regulador de entrada al carril».
4. Brand: `brands/NeuroneSCF/brand.json`, `BP_Brand_Context.md`, `session_log.md` (entrada 2026-09-29).

### Frentes abiertos, en orden

1. **Modelo de referencia 9:16 (ImageLab).** Sam: «9:16 genera un modelo de referencia 9:16 desde
   cero». Lectura de CC (**deducido**, confirmar con Sam): generar desde cero una imagen vertical de
   Patricia —con los recortes de cara como identidad y su descripción— que Sam valide y que pase a
   ser la referencia de los formatos verticales, en lugar de mandar recortes cuadrados a un lienzo
   9:16. Evidencia **medida**: con referencias, 2 de 2 verticales salieron con la persona copiada y
   una franja blanca o negra; una directriz de «una sola foto de borde a borde» lo corrigió 2 de 2.
2. **Corrector de producto (plan antes que código).** Dos casos:
   - **6110a5a7** — producto grande: borrar el envase pintado, rellenar el fondo y pegar el PNG real
     a escala de `product_blueprints.physical_size`.
   - **6bb3ebc0** — frasco de Velvety Control sin etiqueta en 2 intentos: pegar la etiqueta real con
     la técnica de a9ba1afa (Professor `75331271`).
   Entregar el plan a Sam con QA-OBJETIVO antes de construir.
3. **Cláusula del motor: lo que sostiene la persona es físicamente posible** (un producto en la
   mano, el resto del kit sobre una superficie). Hoy vive sólo como directriz por pieza (861681cd).
4. **ForumPHs IG `cd8a6842`**: el job de la cola falló (`orchestrator_jobs.status='failed'`); leer
   su error. La pieza FB hermana `54ac1010` salió bien. Además, el hallazgo cita una fuente de
   Medellín para una marca de Panamá: revisar si el agente `FPHS-PATRIMONIO-VS-APARTAMENTO` tiene la
   jurisdicción en su `search_config`.
5. **Limpieza de lo temporal** cuando Sam cierre las piezas: tabla `intel.cc_fix_48h_2026_09_28` +
   función `intel.cc_fix_48h_paso()` + cron **121**; tabla `intel.cc_pasada_nscf_2026_09_28` +
   función `intel.cc_pasada_nscf_paso` + cron **119** (pausado). Borrar con `cron.unschedule`, nunca
   `UPDATE cron.job`.
6. **2026-10-03:** `public.lab_configs` (`lab_key='imagelab'`) `default_params.image_calls_max`
   vuelve de **180** a **100** (el valor anterior está en `_previous`).

### Estado al cierre (medido el 2026-09-29)
- **En la bandeja, revisadas por CC:** 83b65e2f (cabello corregido), 5fcdc19d, 685d5275, 7c4c7240,
  844f834a, 861681cd, a719763b, fe6730dd, bea0754e, 2481d652, 1f81a727 (texto de imagen en diálogo).
- **En la cola 121 al cierre:** 6be0fe81 (blog sin imagen por 429 de Vertex).
- **Fixable pendiente de corrector:** 6bb3ebc0.
- **Regulador:** margen 3 en todos los canales activos; `intel.v_carril_entrada` aplicada;
  `content-dispatcher` v2.6 **sin desplegar** (#267).
- **Crons pausados:** 22 de UnrealvilleStudio y LucienSael (research y process).
- **ForumPHs:** 6 agentes nuevos semanales, crons 122–133.

### Reglas de esta actividad (no negociables)
- **Nada vuelve a la bandeja sin revisión visual de CC.**
- **Una imagen a la vez** (Vertex devuelve 429 en paralelo).
- **Patricia:** recortes de cara como referencia (nunca fotos completas); su cabello exacto (largo,
  capas, raya al costado, balayage caramelo y miel; nunca corto ni partido al medio); nunca seria;
  la mirada siempre con destino.
- **Texto de imagen:** responde al título, no lo repite (todos los canales en `dialogue`).
- **Nunca** precios, nombres de marcas competidoras ni hashtags de competidores; «Nanotribología» con
  mayúscula; el diagnóstico con Patricia es gratuito.

### Test de la marca N+1
1. **¿Sobrevive a otra marca?** Todo lo pendiente es eje (ImageLab, dispatcher, corrector) o
   instancia en dato (persona, producto). Nada se escribe con nombre de marca en código.
2. **¿Nombre por función?** Sí: corrector de producto, modelo de referencia vertical, cupo.
3. **¿Eje o instancia?** El corrector y la cláusula son eje; las referencias de cada persona son dato.
4. **¿Cuántas marcas en la enumeración?** Ninguna enumeración nueva.

### QA
- **QA-ENCARGO:** confirmado por Sam el 2026-09-29 (punto 8 de su mensaje).
- **QA-OBJETIVO:** pendiente para los frentes 1, 2 y 3 — se valida con Sam antes de producir.
- **QA-INFO:** falta la confirmación de la lectura del frente 1.
- **QA-PROP:**
  1. *Qué tiene que ser cierto:* que el despliegue de v2.6 ocurra tras el merge de #267; que Sam
     confirme la lectura del 9:16.
  2. *Medido / deducido:* declarado en cada punto.
  3. *Qué se rompe:* nada al leer este brief; cada frente declara lo suyo en su PR.
  4. *Cómo se revierte:* cada frente, en su PR.
  5. *Efecto observable:* la bandeja con las piezas corregidas aprobadas y el dispatcher reteniendo
     sin cupo (`held_by_entry_regulator`).
