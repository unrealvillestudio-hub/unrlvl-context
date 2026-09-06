# BP_BRAND_CONTEXT — Neurone South & Central Florida
**Schema:** BP_BRAND_1.1  
**Versión:** 2026-09-06-v1.2 · base previa 2026-08-08-v1.1 · 2026-05-19-v1.0  
**Fuentes:** BP_BRAND_NeuroneSCF_v1.0.json (historial WebLab 2026-03-23) + brand.json v11 + humanize_profiles + brand_voice_genome po_consumer v0.6 + Shopify B2C auditado 2026-05-19  
**Mantenido por:** Claude / Unrealville Studio

---

## 🆕 COLOR — el terracota canónico es `#C4622D` (2026-09-06)

**El naranja terracota B2C/editorial de NeuroneSCF es `#C4622D`.** Decisión de Sam del 2026-09-06, tomada contra la fuente: es el color del enlace de menú **Rituals & Kits** en el tema Shopify de la tienda B2C (`egdk1n-gt`, tema `192983662919`, `sections/nc-header.liquid` → `.nc-nav-link--kits`). **El sitio es la referencia y este documento se corrige para coincidir con él.**

**Este documento declaraba antes `#D4622A`**, en cuatro puntos. Ese valor queda archivado al final y **no es operativo**. Los dos hex difieren solo en el primer y el último carácter, que es como pudieron convivir sin detectarse.

**Dónde vive el dato operativo:** `public.brand_palette`, fila `brand_id='NeuroneSCF'` · `role='accent_warm'` ("Terracota Rituals & Kits"). Es el color del **filete y de la identidad lateral** del overlay de imagen, y el compositor lo resuelve **por rol en runtime**: el hex no está cableado en ningún código (`MULTIBRAND_RULE`).

**Comparte hex con el rol `terra` de ForumPHs, y es coincidencia aceptada.** Son dos filas independientes, una por marca: ninguna lee la de la otra, y tocar una no toca la otra. Lo que sí estaba mal —y `BRIEF-N01` corrigió— era que NeuroneSCF **tomara prestado el rol** de ForumPHs en lugar de tener el suyo.

**La regla de canal no cambia:** `#C4622D` es B2C únicamente; `#0076A8` es B2B/Pro únicamente. Entre las 11:43 y las 13:36 UTC del 2026-09-06, `BRIEF-N01` dejó 33 piezas B2C pintadas con el azul B2B — violación de esa regla, corregida el mismo día.

---

## 🆕 VOZ EDITORIAL — `nscf_editorial` v1.0 (2026-08-08)

`nscf_editorial` v1.0 quedó **activa y operativa**. Se calibró en un bucle Boids de 10 turnos en chat, convergido (últimos 3 SÍ), con el eje reescrito 3 veces en vivo.

**Construcción propia de la voz: el par cerrado con llave de diagnóstico** — la firma de forma de `nscf_editorial`, el modo en que cierra y remata. No se hereda de `po_consumer` ni de la conversión: es de la voz editorial.

- **4 topics de blog** sembrados en AUTHORITY.
- **Cableado:** fila propia en `content_type_registry` y en `creative_compatibility_rules` (parte de las 14 filas de cableado de voces del ecosistema, 2026-08-08).
- **`nscf_professional` EN PAUSA** por decisión de Sam hasta que Patricia Osorio tenga lista esa línea de negocio — la bloquea el negocio, no el pipeline.
- **`po_consumer`**: activa con 0 topics; decisión registrada = no hacer nada.

**Pendientes de marca:** hueco de frecuencias (cadencia editorial por definir) · header del blog NSCF, que arrastra la violación "sin promesas vacías" del 2026-07-11 (la voz DEMUESTRA, no declara).

---

## IDENTIDAD DE MARCA

| Campo | Valor |
|---|---|
| **Nombre oficial** | Neurone South & Central Florida |
| **brand_id** | NeuroneSCF |
| **Dominio** | neuronescflorida.com |
| **Mercado primario** | South & Central Florida, USA (Miami-Dade, Broward, Palm Beach) |
| **Slogan** | ⚠️ PENDIENTE DEFINICIÓN — actualmente en página: "Cuidado Capilar profesional que miami" (incompleto — corregir) · slogan histórico candidato: "La ciencia capilar que Miami necesitaba." |
| **Tagline editorial interno** | "La ciencia trabaja para ti — te explicamos cómo." |
| **Posicionamiento** | Distribuidora exclusiva Neurone South & Central FL · Autoridad técnica capilar con raíces en la comunidad hispana de Miami |
| **Arquitectura** | Dual: B2C (consumidor final) + Portal Pro B2B (estilistas, salones, distribuidores) |
| **Modelo de negocio** | E-commerce Shopify B2C + Shopify B2B · Joint venture con distribuidora local (Laura) · 3PL para logística |

---

## IDENTIDAD VISUAL

### Paleta de colores

| Color | Hex | Nombre | Contexto de uso |
|---|---|---|---|
| **Negro Neurone** | `#000000` | Negro obsidian | Dominante · fondos principales · headers · texto sobre claro · universal B2C+B2B |
| **Blanco Neurone** | `#FAFAFA` | Blanco | Fondos claros · espacio negativo · texto sobre oscuro · universal B2C+B2B |
| **Azul Neurone** (B2B/Pro) | `#0076A8` | Azul Pantone 7546 | Portal Pro B2B · contexto profesional · autoridad técnica · datos · CTAs del portal B2B |
| **Navy Pro Salon** | `#003A70` | Navy Pro Salon | Portal B2B profundo · línea Pro Salon · autoridad máxima |
| **Naranja Terracota** (B2C/Editorial) | `#C4622D` | Naranja editorial NSCF | B2C únicamente · CTAs · pricing highlights · acento cálido · voz de PO · énfasis en copy |
| Terracota Restore | `#C27D5B` | Terracota Editorial | Línea Restore · acento editorial secundario B2C |
| Burdeos Color Rescue | `#41273B` | Burdeos | Línea Color Rescue |
| Grafito Styling | `#3F3E3F` | Grafito | Línea Styling |

**Regla crítica de color:**
- `#C4622D` → B2C únicamente (consumer page, copy, pricing)
- `#0076A8` → B2B/Pro únicamente (portal profesional)
- `#000000` + `#FAFAFA` → universal en ambos canales
- Nunca mezclar colores de canal en un mismo output

### Tipografía

| Rol | Familia | Peso | Uso |
|---|---|---|---|
| **Headlines** | PT Sans Narrow | Bold | H1, H2, nombre de marca, CTAs principales, nombres de líneas · siempre UPPERCASE en contexto de marca |
| **Body / UI** | Montserrat | Light / Regular / SemiBold | Cuerpo de texto, descripciones, emails, slogan |
| **Editorial / Slogan** | Montserrat Italic | Light | Slogan · pulls editoriales · voz de PO |
| **Técnico** | Monospace | Regular | Referencias internas: IDs, SKUs, datos técnicos |

**Reglas tipográficas:**
- Nunca usar tipografías fuera de PT Sans Narrow + Montserrat en materiales de marca
- PT Sans Narrow Bold para todos los títulos — siempre uppercase en contexto de marca
- Fallbacks: PT Sans Narrow → Arial Narrow, sans-serif · Montserrat → Helvetica Neue, sans-serif

### Líneas de producto — color coding

| Línea | Color | Hex |
|---|---|---|
| Restore | Terracota | `#C27D5B` |
| Moisture | Azul | `#0076A8` |
| Scalp | Blanco | `#FAFAFA` |
| Styling | Grafito | `#3F3E3F` |
| Pro Salon | Navy | `#003A70` |
| Color Rescue | Burdeos | `#41273B` |

---

## VOZ EDITORIAL

### Arquetipo
`EXPERT_EDUCATOR_LOCAL` — Autoridad técnica capilar con calidez de salón local. No vendedora. Diagnosticadora.

### Pilares de tono (universal)
- **Educativo** — explicamos la ciencia antes de vender
- **Cercano** — somos el colorista de confianza en Miami, no una corporación
- **Experto** — 35+ años de experiencia respaldan cada recomendación
- **Honesto** — si un producto no es para ti, te lo decimos

### Voz B2C — Consumidor final

**Registro:** Cálido, educativo, aspiracional. Spanglish Miami natural cuando corresponde, sin forzar.

**Persona vocera:** Patricia Osorio — técnica capilar 35+ años, fundadora Vizos Cosmetics - The Healing Systems, diseñadora de los Rituals & Kits, Vizos Salón South Florida.

**Voice Genome operativo:** `brand_voice_genome.po_consumer v0.6` en Supabase (consumido en L1.5 del pipeline).

Resumen operativo del genoma:
- **Protagonista:** el TÚ del cliente y su cabello — nunca el producto, nunca la marca
- **Apertura típica:** "Mira…", "Déjame contarte…" — conversación directa, no editorial
- **Arquitectura argumentativa:** DIAGNOSIS → PRESCRIPTION (regla d7h) → CONSEQUENCE → CLOSING honesto
- **Cierre canonical:** honestidad radical — "este kit es para ti si X; si Y, no es este"
- **Trademark word:** "delicado" — MAX 1 vez por pieza, solo donde encaja naturalmente
- **Firma sintáctica:** triplicación enfática — MAX 1 vez por pieza, solo cuando el contenido lo justifica
- **Prohibido:** jargon químico (Daltons, biomimetic, peptide bridges), metáforas decorativas (elixir, magia, renacer), lenguaje de Sephora, presión comercial directa

**Ejemplo de apertura correcta B2C:**
> *"Mira, cuando tu cabello pasó por color, decolorante y plancha — uno detrás del otro, sin pausa — lo notas en las manos antes que en el espejo."*

**Ejemplo de apertura incorrecta B2C:**
> ~~"Restore Therapy Plus es un sistema avanzado de reparación para cabello sensibilizado que penetra hasta el córtex..."~~

### Voz B2B — Profesionales / Portal Pro

**Registro:** Colega de negocio, no vendedor. Respeta la experiencia del profesional. Datos primero.

**Persona vocera:** Patricia Osorio en modo técnico-profesional (voice genome `po_b2b` — pendiente captura).

**Tono:** Directo, entre pares. Sin la calidez emocional del B2C. Márgenes, exclusividad territorial, soporte técnico.

**Ejemplo de apertura correcta B2B:**
> "Esto es lo que te da ventaja en la silla. Los números lo respaldan."

**Prohibido en B2B:** consumer language, promesas emocionales, voz de salón, diminutivos.

---

## REGLAS DE MARCA

### Heredadas de Neurone global (no modificar)
- Logotipo Neurone — tipografía, casing y proporción exacta del logo global
- Claims de producto aprobados por Neurone global (neurocosmética, nano tribología)
- Nomenclatura oficial de líneas: Restore, Moisture, Styling, Scalp, Color Rescue, Pro Salon
- Paleta primaria: negro + azul #0076A8 + blanco (base universal)

### Propias del operador / distribuidor NSCF
- Voz editorial local — tono, calidez de PO, Spanglish Miami cuando corresponde
- Slogan territorial: **[PENDIENTE DEFINICIÓN]** — ver arriba
- Color editorial B2C: `#C4622D` (adicional al sistema global, solo canal consumer)
- Énfasis en distribución exclusiva South & Central Florida como diferenciador
- Arquitectura dual B2C / Portal Pro — entrada "Soy profesional" siempre visible
- Fotografía: editorial warm Miami, mujeres reales de la comunidad, cabello con textura auténtica
- Compliance FL_US activo (hard + soft) — ver `compliance_rules` en Supabase

---

## PERSONAS B2C (segmentadas por dolor)

| persona_key | Dolor principal |
|---|---|
| `b2c_color_fade` | Tinte se desvanece antes de tiempo |
| `b2c_damage_repair` | Cabello procesado, decolorado, sensibilizado por calor |
| `b2c_frizz_humidity` | Frizz por humedad de Florida |
| `b2c_chlorine_sun` | Daño por cloro, sal, sol |
| `b2c_fine_fragile` | Cabello fino, sin volumen, quebradizo |
| `b2c_scalp_health` | Cuero cabelludo sensible o con problemas |
| `b2c_default` | Fallback sin segmentación UTM |

**UTM mapping:** `utm_content` → `persona_key` (ej: `damage-repair` → `b2c_damage_repair`)

---

## PERSONAS B2B

| persona_key | Perfil |
|---|---|
| `b2b_salon_owner` | Dueño/a de salón — foco en márgenes, exclusividad, ROI |
| `b2b_colorist` | Colorista profesional — foco en calidad técnica, rendimiento del producto, resultados para sus clientes |

---

## INFRAESTRUCTURA DE MARCA

### Shopify
- **B2C:** `egdk1n-gt.myshopify.com` · `neuronescflorida.com` · theme_id: 192983662919
- **B2B:** `nj5ybc-n1.myshopify.com`
- **Productos activos B2C:** 41 · **Kits:** 12

### Direcciones
- **Legal/devoluciones:** 12951 Biscayne Blvd, North Miami, FL 33181 (Prestige Beauty Global Distribution)
- **Ops/3PL:** 3028 NW 72nd Ave #4, Miami FL 33122

### Social
- Instagram: `@neuronescflorida`
- TikTok: `@neuronescflorida`
- Facebook Page: Neurone South & Central Florida

### Socio operativo
- **Laura** — distribuidora local Miami · joint venture · infraestructura local · operaciones presenciales
- **Patricia Osorio** — voz de marca, expertise técnico, diseñadora de los Rituals & Kits

---

## NOTAS IMPORTANTES PARA CLAUDE

1. **Slogan:** el que aparece en la página actual está incompleto y no es el definitivo. No usarlo como referencia. Usar el tagline editorial: *"La ciencia trabaja para ti — te explicamos cómo."* hasta que Sam defina el slogan oficial.

2. **Voice Genome:** el ADN operativo de la voz de PO B2C está en `brand_voice_genome.po_consumer v0.6` en Supabase. Este BP_Brand_Context es el complemento visual e identitario. Los dos juntos son el ADN completo de la marca.

3. **Color en copy:** siempre `#C4622D` en outputs B2C (HTML, descripciones, emails consumer). Nunca `#0076A8` en copy consumer — ese es el canal Pro.

4. **Compliance:** antes de cualquier output de copy para NSCF, cargar `compliance_rules` desde Supabase (FL_US hard + soft). No asumir que se recuerda — siempre cargar.

5. **Trayectoria de PO — dato correcto es +35 años.** En algún lugar de la tienda aparece "+20 años" — es incorrecto y debe corregirse. El dato canónico es **35+ años** (confirmado por PO, reflejado en voice_genome, SKILL v2.6 y todos los outputs de copy). Cualquier output nuevo debe usar 35+. Fix pendiente en la tienda.

6. **Regla d7h:** en descripciones de producto multi-componente, cada ingrediente/componente debe aparecer con [nombre] + [rol funcional] + [efecto reconocible]. No descripciones genéricas.

7. **ES y EN siempre desde origen** — nunca traducir. EN se escribe como si PO le hablara a su clientela anglo en el salón.

8. **UNRLVL-AUDITOR es herramienta inhouse exclusivamente** — no tiene, no ha tenido ni tendrá relación con clientes o consumidores. Si aparece alguna referencia visible a UNRLVL-AUDITOR en cualquier canal de cara al público (tienda, kiosk, emails, redes), es un error y debe eliminarse. Fix pendiente: texto "UNRLVL-AUDITOR" visible en el Kiosk (detectado 2026-05-19).

---

## ESTADO DEL SISTEMA (2026-05-19)

| Componente | Estado |
|---|---|
| `brand_voice_genome.po_consumer` | ✅ v0.6 activo en Supabase |
| `content-pipeline SKILL` | ✅ v2.6 live en unrlvl-context |
| `output_templates.prompt_Product_Description_B2C` | ✅ v1.2 activo en Supabase |
| `creative_compatibility_rules.product_description_b2c` | ✅ activo en Supabase |
| Slogan oficial | ❌ PENDIENTE DEFINICIÓN |
| Voice genome `po_b2b` | ❌ PENDIENTE CAPTURA |
| BP_BRAND assets visuales (logos, URLs) | ⚠️ Pendiente entrega de Neurone Cosmética |

---

## ARCHIVO HISTÓRICO — naranja terracota `#D4622A` (archivado 2026-09-06)

> **⛔ NO OPERATIVO — registro histórico únicamente.** Derogado por la sección «COLOR — el terracota canónico es `#C4622D`» del tope de este documento. Se conserva por trazabilidad (`CC_PROTOCOL` §0): los context files no se reemplazan, se archivan. Si algo de aquí contradice el cuerpo vivo, manda el cuerpo vivo.

Hasta el 2026-09-06 este documento declaraba el naranja terracota B2C/editorial como **`#D4622A`** ("Naranja editorial NSCF"), en cuatro puntos: la tabla de paleta de IDENTIDAD VISUAL (§ Paleta de colores), la «Regla crítica de color», la línea de color editorial B2C del bloque de sistema visual, y la nota 3 de NOTAS IMPORTANTES PARA CLAUDE.

El valor vigente es **`#C4622D`**, medido contra el tema Shopify de la tienda B2C. `#D4622A` no debe usarse en ningún output nuevo.
