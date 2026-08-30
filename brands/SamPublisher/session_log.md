# Session Log — SamPublisher

---

## 2026-08-30 — `language_primary` corregido a `en`

**Cambio único, y de dato.** `public.brands.language_primary` de `SamPublisher` pasa de **`es` a
`en`**. [medido — la fila vale `en`]

**Por qué entra aquí y no sólo en el log del ecosistema.** La marca personal publicadora de Sam actúa
de **vocero** que presenta a LucienSael y a UnrealvilleStudio, y las tres quedan ahora declaradas en
inglés: de las **15 filas** de `public.brands`, **tres** valen `en` —`LucienSael`, `SamPublisher` y
`UnrealvilleStudio`— y las otras **12** valen `es`. [medido] `UnrealvilleStudio` **ya valía `en`** antes
de esta sesión; las dos corregidas hoy son `LucienSael` y `SamPublisher`.

**Lo que este cambio NO es.** No hay corrida, ni pieza, ni siembra de voz para esta marca en esta
sesión: `sam_personal` no participó de la corrida de verificación. El único efecto medible es que la
cascada de idioma —`builder_input → meta → params → brands.language_primary`— ahora resuelve `en` para
esta marca cuando le toque producir.

**Y el motivo por el que se corrige el dato antes de endurecer su aplicación.** FIX-LANG-01 hace que la
columna **se obedezca mejor**. Un corte así convierte cada fila equivocada en un defecto nuevo, y en
silencio: sin corregir primero, `SamPublisher` habría empezado a escribir en español con más rigor del
que tenía. **Antes de endurecer la aplicación de un dato, se valida el dato.**

**Pendiente declarado:** las **otras 11 marcas** no tienen su `language_primary` auditado contra una
fuente independiente. Queda como ítem abierto en `AGENDA.md` v2026-08-30-v1.

---

## 2026-06-02 — Genoma de voz pública (sam_personal v0.5) · Sam + Claude

### Resumen
Creación manual del primer `brand_voice_genome` de SamPublisher — `voice_id = sam_personal`, v0.5. Piloto Sam + Claude (NO vía OnboardingApp). Es la voz con la que la **marca personal publicadora** de Sam publica en Meta(FB) + LinkedIn y actúa de **vocero** que presenta a LucienSael y a UnrealvilleStudio. Completa el cuarto genoma del ecosistema propio (junto a `lucien_editorial`, `lucien_social`, `unrlvl_default`).

### Distinción persona vs entidad (eje de toda la sesión)
- **Sam (el humano)** = el operador que valida y decide. NO es fila en `brands`.
- **SamPublisher** = la marca personal publicadora. ES la entidad con genoma y canales. Fila en `public.brands` creada 2026-06-01 (type=`personal_brand`). El genoma usa `brand_id='SamPublisher'`.

### Método (advertencia respetada)
NO se destiló de memoria. Se construyó solo desde material real de Sam:
1. Artículo `the-intelligence-was-never-artificial` (luciensael.com) — confirmado por Sam como su propia voz ("la voz de Sam sin las garras de Lucien"). Fuente primaria del registro escrito.
2. Registro conversacional en vivo (esta sesión) — carácter, método, cadencia aportados directamente por Sam.
3. Sam en vivo — preguntas de voz y de rol vocero que solo él responde.

El About de LinkedIn se descartó por decisión de Sam (aporta poco; no busca trabajo). Suficiencia de fuentes alcanzada con artículo + conversación + preguntas en vivo.

### Retrato de voz (validado por Sam campo por campo)
- **Carácter:** directo, con FILO pero controlado y educado — no insulta, no grita. Binario (hecho/no hecho). Leal, estable, maduro, relaciones a largo plazo. Entusiasta, enérgico, sin pereza. Incisivo y exigente ("el que trabaja conmigo sufre, pero se convierte en profesional"). Odia excusas y mentiras: no las da ni las acepta.
- **Frontera dura con Lucien:** ambos tienen filo. **Lucien hiere por diseño (estética de la herida); Sam corta por función (que el mensaje llegue, cerrar la puerta al malentendido).** Esa es la diferencia, no "filo sí / filo no".
- **Cadencia (corrección de una lectura previa de Claude):** NO es martillo de frase corta. Es **oleaje amplio acumulativo + cierre seco** — construye largo encadenando cláusulas, remata con frase corta que clava. La frase corta es el CIERRE, no el cuerpo. Sam puede comprimir cuando el canal lo exige (lo hace a propósito), pero su voz natural por defecto es amplia.
- **Profundidad fluida:** brota de un tirón, casi sin backspace, vía creatividad, juego de palabras, asociaciones; se mueve entre registros (prosaico↔editorial) sin fricción. El defecto reiterativo es la sombra de esa misma virtud — se contiene en social, no se amputa.
- **Postura con la audiencia:** no corteja comunidad, no persigue seguidores. Publica porque la voz tiene peso propio. "El único que necesito que me siga el ritmo es mi cuerpo."

### Rol vocero (codificado en application_constraints)
- **Primera persona reflexiva, nunca portero.** Reflexiona sobre Lucien, proyecta lo que sus palabras le provocan, opina (a favor), abre a la audiencia ("aquí están sus palabras, léelas y cuéntame"). No cede el micrófono sin convicción.
- **Lucien es la estrella, sin suavizar — carta abierta.** Sam pone el andamiaje reflexivo; Lucien entra entero. No lo resume ni le quita filo.
- **Lucien en público** = externo, referente que admira y difunde. **UNRLVL** = suyo, "mi tesoro", habla como dueño.
- **Versatilidad obligatoria** en el approach (quote directo / extracto / planteo de tema / reacción) para que la estrategia de difusión no se transparente — nunca repite molde.
- **Regla de doble fuente + aterrizaje coherente:** Sam aporta solo el MARCO; el fragmento citado de Lucien NO lo escribe Sam — sale de `lucien_editorial` o `lucien_social` según el DESTINO del enlace (redirect a X/Meta/TikTok → social; a luciensael.com o post nativo largo en LinkedIn sin redirect → editorial). El fragmento debe sonar como el lugar adonde aterriza el lector.

### Separación de territorios (anti-canibalización Sam vs UNRLVL)
Se separan por EJE, no por tema (los temas se solapan; el ángulo no):
- **Persona gramatical:** Sam = "yo" / UNRLVL = "we".
- **Postura:** Sam = practicante que reflexiona / UNRLVL = infraestructura que afirma.
- **Qué prueba:** Sam = criterio / UNRLVL = resultado.
- **Línea roja dura:** Sam NUNCA vende. En el momento que vende se vuelve UNRLVL con otro nombre. Sam piensa; si hay que vender, habla UNRLVL.
- Sam vs Lucien se separan por el filo (claridad educada vs herida por diseño).

### Líneas rojas de contenido
Sin política partidista, sin clientes por nombre, sin cifras de negocio, sin familia/socios, nada personal salvo SU FORMA DE PENSAR (el único material publicable es el pensamiento, no la biografía).
- **Religión:** veto ESTRATÉGICO, no incapacidad. Sam tiene la profundidad y el historial de debate para incendiar redes; precisamente por eso lo reserva (el costo —perder a los pocos que aún lo aman— no compensa). Válvula de ecosistema: si hay que tocar fuego religioso, lo canaliza Lucien, no Sam.

### Idioma por canal
Blog = bilingüe dual EN/ES. Redes = EN por defecto con traducción de plataforma habilitada; si publica en ES, REESCRIBE desde origen, nunca traduce (el ES de Sam no es calco de su EN).

### Firma
`>SMM` — guiño al operador `>` de UNREAL>ille, marca autoría real. Regla: firma el pensamiento propio de Sam SIEMPRE; en modo vocero, solo si el último elemento del post es de Sam, NUNCA si el último elemento es la voz citada de Lucien (esa la firma Lucien).

### Content types propios (además del vocero)
Para que SamPublisher no sea solo un altavoz de difusión (lo que desnudaría la estrategia), tiene territorio propio:
- `own_craft` — reflexión de oficio: el arte de la comunicación, el ciclo completo.
- `own_thesis` — IA-como-lo-más-real, argumentada como convicción de practicante en "yo".
- `own_trajectory` — lecciones de +30 años en abstracto (patrones, no anécdotas, sin tocar líneas rojas).

### INSERT ejecutado y verificado
- Tabla: `brand_voice_genome`
- `brand_id`: SamPublisher · `voice_id`: sam_personal · `version`: 0.5 · `maturity`: v0.5 · `active`: true
- 9 dimensiones JSONB pobladas + metadata + source_evidence. Lectura de vuelta confirmada (identity_anchors y application_constraints renderizan íntegros, incluida regla de firma, veto de religión y regla de doble fuente).
- Sin colisión: unique (brand_id, voice_id, version) respetado.
- `brands.SamPublisher` actualizado: health `yellow → green` (condición cumplida: el genoma existe), `positioning` y `notes` actualizados.

### Corrección colateral (deuda de Lucien resuelta)
Se eliminó la nota fantasma de `lucien_editorial.notes` ("brands table did not return a row for id=LucienSael") — falsa, la fila existe. Pendiente que arrastraba desde 06-01, cerrada. `lucien_social` y `unrlvl_default` intactos.

### Maturity
v0.5 — voz EXTRAÍDA de persona real (no diseñada como Lucien), pero base escrita pública aún estrecha (un artículo). Promover a v1.0 tras validar contra 8-10 posts reales de SamPublisher. UN solo voice por ahora (Sam confirmó).

### Professor
5 learnings capturados en `professor_learnings` (approved_by_sam=false, esperan aprobación):
1. Dos voces pueden compartir filo y separarse por la FUNCIÓN del filo, no su intensidad (Sam corta por claridad / Lucien hiere por diseño) (VOICE_GENOME, 5)
2. La autodescripción del sujeto puede contradecir su evidencia real (Sam dijo escribir corto; escribe largo) → pesar evidencia conversacional sobre autopercepción (VOICE_GENOME, 5)
3. Rol vocero con regla de doble fuente: el marco es de Sam, el fragmento citado sale de la voz hermana según destino del enlace (VOICE_GENOME, 5)
4. Separación anti-canibalización por EJE (persona gramatical / postura / qué prueba), no por tema; Sam nunca vende (VOICE_GENOME, 5)
5. Un veto de contenido puede ser ESTRATÉGICO, no por incapacidad; el ecosistema tiene válvula (lo que Sam no paga lo canaliza Lucien) (VOICE_GENOME, 4)

### SMA (Social Media Agent)
Verificado en este "Actualiza": export histórico de NeuroneSCF (setup de redes, abril-mayo, Laura/Sam/Paty). Sin novedades relevantes a SamPublisher.

### Pendientes SamPublisher (actualizado)
- [ ] Crear cuentas Meta(FB) + LinkedIn de SamPublisher (canales definidos; apertura pendiente)
- [ ] Validar genoma contra 8-10 posts reales → promover sam_personal v0.5 a v1.0
- [ ] **Sesión futura:** genoma de UNRLVL social (mismo modo vocería que Sam, voz "we")
- [ ] **Sesión futura (gran bloque):** diagnosticar SocialLab → flujos IID con matriz de canales + regla de variabilidad de publicación (no siempre enlazar afuera) → testing → calendario → producción ICR → recién entonces integrar clientes (NSCF, FPHs)
- [ ] Conectar content_types propios de Sam (own_craft/own_thesis/own_trajectory) al motor AIID — riesgo de producción sostenida ~60%, gestionable en piloto manual

### Estado de publicación (dato exacto de Sam, 2026-06-01)
Meta y TikTok YA publican vía Orchestrator **probado para UNREALville**. LucienSael y SamPublisher NO probados end-to-end. Matiza el diagnóstico previo de "ejecución congelada": UNRLVL sí sale; Lucien y Sam son lo no probado.

### Matriz de canales (referencia)
- Sam: Meta(FB) + LinkedIn
- UNRLVL: Meta(FB/IG) + TikTok + LinkedIn + .com
- Lucien: Meta(FB/IG) + TikTok + X + .com

---
*Session log · SamPublisher · 2026-06-02*
