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
