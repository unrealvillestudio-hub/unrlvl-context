# BP_Brand_Context — ForumPHs
**Versión:** 2026-08-25 · base previa 2026-08-23 · base previa 2026-08-08 · base original 2026-03-22 | **Mantenido por:** Claude | **Lectura:** Inicio de cada sesión ForumPHs

---

## 🆕 LOS SEIS ÁNGULOS Y LA POLÍTICA DE ENLACES (2026-08-25)

_Adición al tope. Nada de lo anterior se borra — la sección de 2026-08-23 sigue vigente inmediatamente debajo._

### Los seis ángulos de ForumPHs — y qué voz admite cada uno

**Aprobados por Sam el 2026-08-25.** Sembrados en los **32 dominios** de `intel.brand_topics.angles`.

Un **ángulo** no es un tema ni un formato: es **desde dónde se agarra** un tema. El dominio dice
*de qué* habla la pieza; el ángulo dice *por dónde entra*. Son ejes independientes, y por eso el
mismo dominio puede producir seis piezas que no se repiten.

| Ángulo | educativa | editorial | conversión | Qué hace |
|---|:---:|:---:|:---:|---|
| `expertise` | ✅ | — | ✅ | Explica el mecanismo por dentro |
| `artefacto` | ✅ | ✅ | ✅ | Muestra qué contiene un documento bien hecho |
| `pregunta` | ✅ | ✅ | ✅ | El lector pregunta lo equivocado; se cambia el marco |
| `consecuencia` | — | ✅ | ✅ | El efecto que todavía no se ve |
| `contraste` | ✅ | ✅ | — | Dos formas de hacerlo: una sostiene, otra no |
| `secuencia` | ✅ | ✅ | — | El orden en que las cosas se detonan |

#### El criterio de las ausencias — esto es lo que hay que preservar

Las casillas vacías **no son huecos por llenar**. Cada una es una decisión editorial con motivo, y
llenarlas «para completar la matriz» rompería la separación de voces de la marca:

- **`expertise` no va a editorial.** `HR-FPHS-09` reserva a editorial **revelar la práctica** — cómo
  se hace de verdad, qué se ve desde adentro del oficio. No **enseñar qué es**. Un `expertise` en
  editorial convierte la columna de opinión en una clase, y la marca pierde el único lugar donde
  toma posición.
- **`consecuencia` no va a educativa.** Ahí se vuelve **alarmismo con bata de profesor**: la
  autoridad del registro didáctico prestada a un texto cuyo motor es el miedo a lo que todavía no se
  ve. La consecuencia es legítima cuando la marca **opina** o cuando **mueve a decidir**; no cuando
  enseña.
- **`contraste` y `secuencia` no van a conversión.** Los dos **construyen** hacia una comprensión —
  el lector termina entendiendo algo. Conversión debe **mover a decidir**. Un texto que construye y
  un texto que empuja tienen curvas incompatibles: el primero se gana el derecho a la conclusión, el
  segundo la pide desde el principio.

**Lo que la matriz abre, en números:** **15 combinaciones ángulo-voz** contra **la única** que el
ecosistema usó en **25 días y 250 filas**. La diversidad deja de depender del criterio del escritor
en cada corrida y pasa a ser **dato** (`intel.brand_topics.angles`).

### Política de enlaces — la fuente se nombra, nunca se enlaza

**Regla de marca:** en toda pieza pública de ForumPHs, **la fuente se nombra y nunca se enlaza.**
No hay enlaces salientes. La única excepción es el **dominio propio**.

- **Dónde vive la procedencia verificable:** en **`source_url` del hallazgo**, no en el cuerpo de la
  pieza. Quien audita la afirmación tiene la URL en el dato; quien lee la pieza tiene el nombre de
  quien lo dijo.
- **Por qué:** **el lector termina de leer en la pieza.** Un enlace saliente en una pieza de marca
  es una invitación a irse, y la marca paga el research para retener, no para derivar tráfico a un
  tercero. Nombrar la fuente da la misma credibilidad sin el costo.
- **Cómo se hace cumplir:** `HR-FPHS-16` (**nueva el 2026-08-25**) — sin enlaces salientes, exime el
  dominio propio. La política es de marca; la regla es su forma ejecutable.

---

## 🆕 CANALES, REGISTRO Y TEMAS PÚBLICOS (2026-08-23)

_Adición al tope. Nada de lo anterior se borra — la sección de 2026-08-08 sigue vigente inmediatamente debajo._

### Registro de lenguaje — USTED, y la regla vale para la instrucción

**Los `angle` de los frentes `influye` y `decide` van en USTED.** Ni tuteo ni voseo. La norma es
`HR-FPHS-07`, y lo que se corrigió el 2026-08-23 no fue el texto entregado sino **de dónde salía**:

> **`HR-FPHS-07` rige la INSTRUCCIÓN AL ESCRITOR, no sólo el texto entregado.**

Una regla que sólo se aplica en el juicio llega tarde: el escritor la incumple porque **nunca la
recibió**, y el juez lo castiga por algo que el sistema le ocultó. Los **12 `angle`** de esos dos
frentes estaban en tuteo y se reescribieron a usted **conservando ángulo, cifras y stake** — el
`angle` es el eje estructural anti-duplicación, y tocarlo de fondo habría cambiado **de qué** habla
la marca, no **cómo** lo dice.

**Verificado:** 0 pronombres de tuteo y 0 desinencias de voseo en los **32 dominios**. La corrida
siguiente del mismo dominio dio **0 marcas de tuteo, 10 de usted y PASS**; las dos piezas anteriores
tenían **16 y 7 marcas de voseo y cero de usted**.

### Canales de publicación — el canal es dato

Viven en `intel.brand_publish_channels`: el eje es *«una marca publica por algún canal»*; **cuál**
canal es instancia.

| Canal | Estado | Detalle |
|---|---|---|
| **Blog** | ✅ **OPERATIVO** desde 2026-08-23 | `forumphs.com/blog`, provider **`vercel_html`**. HTML servido por función serverless, **SEO-first**. **2 artículos publicados.** Desbloquea `HR-FPHS-08` (`blog_enlace_interno`) |
| **Email** | ⛔ **DECLARADO Y NO OPERATIVO** | **Klaviyo**, lista **`VWwDjP`**, `active = false`. Falta **DKIM/SPF** de `envios.forumphs.com` con routing **Dynamic** y los CNAMEs en DNS. **Se activa cuando la autenticación complete, no antes** — un canal de email activo sin DKIM/SPF no falla ruidosamente: entrega a spam |

**Superficie del blog, fijada:** rótulo del menú **«Sin tecnicismos»** · H1 **«Hablemos sin
tecnicismos»** · **URL fija en `/blog`**. El rótulo y el H1 son decisiones de marca; **la ruta no
cambia con ellos**, y `content.content_pieces.slug` da la URL estable de cada pieza — **cambiarlo
rompe URLs indexadas**.

**Regla editorial del blog:** *un dominio, un artículo* — canibalización SEO.

### Los 5 temas públicos

`intel.brand_topics.theme_key` / `public_label` agrupan **por encima del dominio**: **32 dominios en
5 temas**.

`dinero-y-cuotas` · `asamblea-y-actas` · `administracion` · `patrimonio` · `derechos-y-regimen`

El **dominio** sigue siendo el eje anti-duplicación del carril; el **tema** es lo que ve el lector.
Son dos capas, no dos nombres de la misma cosa.

---

## 🆕 POSICIÓN DE VOZ Y CONTENIDO (2026-08-08)

**Posición ratificada con Ivette.** La voz publica el ESTÁNDAR, nunca instrumenta al lector: **se publica la pregunta, jamás la carta.** Asistir a los propietarios en su conflicto convertiría a la marca en parte del conflicto — y la Junta Directiva, que firma el contrato, es quien se pierde. Se enseña a VER los números; no se dirige contra quién ni hacia dónde actuar.

**Familia de voces:** `fphs_educativa` (ENSEÑA cómo funciona el patrimonio) · `fphs_editorial` (REVELA cómo opera el oficio) · `fphs_conversion` **reactivada** (`abandoned` → `active`, eje de 13 claves, SIN calibrar: 11 topics / 0 filas).

**`audience_frame` — eje del poder de contratación:** `decide` / `influye` / `general` (alias legacy `jd` / `doliente`). Reparto de los 18 topics: **9 `decide`** en conversión, **7 `influye` → `fphs_educativa`** (su ángulo ya era educativo), **2** quedan en conversión. DDL post-merge por Claude.ai: CHECK ampliado a los 5 valores + 18 filas migradas (`jd→decide`, `doliente→influye`).

**Filtro de psycho-presets:** solo `PSY-URGENCY`, y calibrada por **dato patrimonial** — la urgencia se sostiene en la cifra del patrimonio, nunca en presión emocional.

**Cableado de voces (2026-08-08):** `content_type_registry` + `creative_compatibility_rules` para `fphs_editorial` y `fphs_educativa`; las de `fphs_educativa` corregidas por criterio de Sam — educar como estrategia sí es UNRLVL, educar por pedagogía no.

**Pendiente:** `fphs_conversion` sin calibrar · el ángulo `profesionalizar-sin-perder-el-control-doliente` está **mal planteado** (mezcla el frente del decisor con el del doliente y termina instrumentando) — reescribir.

---

## CAPA A — ADN DE MARCA

### Qué es ForumPHs
Empresa de administración de propiedades horizontales en Panamá. Opera bajo la Ley 284 de 2022 (Propiedad Horizontal). Su propuesta de valor no es administrar edificios — es gestionar el patrimonio de los propietarios. La distinción no es semántica: determina el pricing, el posicionamiento y el tipo de cliente que atrae.

### Lo que la marca protege (invariable)
- **El slogan es invariable:** *"Construiste tu patrimonio. Nosotros le construimos un sistema."* — la estructura paralela construiste/construimos es una decisión creativa deliberada. No se altera jamás.
- **Estándar único:** No existe un servicio de nivel bajo. El precio varía por complejidad del PH, nunca por calidad del administrador.
- **Clientes actuales protegidos:** Los contratos vigentes no se renegocian por imposición. La migración al nuevo modelo es voluntaria y por valor demostrado.
- **Referidos por reputación, no por incentivos:** No se pagan comisiones a JDs por referidos.

### Territorio de marca
- Patrimonio · Confianza · Sistema · Precisión · Transparencia financiera
- **Evitar:** lenguaje de conserjería, de mantenimiento reactivo, de administración genérica

### Wordmark
Puramente tipográfico. Sin PNG, sin raster, sin logo independiente del tipo.

### Paleta Amatista Carbon
- Amatista `#5C3472` — color primario, autoridad
- Carbon Profundo `#1C2233` — fondos, estructura
- Terra `#C4622D` — acento, acción, urgencia
- Tipografía: EB Garamond (voz institucional) · DM Sans (operativa) · Cormorant Garamond (tono editorial)

---

## CAPA B — CONTEXTO RELACIONAL

### Sam — Socio
Sam no es cliente de ForumPHs — es socio. Unrealville Studio gestiona la marca y la tecnología, pero la relación con el negocio es de co-propiedad. Esto significa que el crecimiento de ForumPHs es un interés directo de Sam, no solo un encargo. Las decisiones estratégicas se toman con esa perspectiva.

ForumPHs es también el **laboratorio** donde Unrealville Studio desarrolla y afina metodologías (Financial Intelligence Engine, Document Factory, actas automatizadas) antes de exportarlas al ecosistema o usarlas como filtro de onboarding de clientes UNRLVL.

### Ivette Flores — Gerente General
- Abogada especialista en propiedad horizontal. Su perspectiva es siempre legal primero.
- Toma decisiones con rigor pero puede necesitar tiempo para procesar propuestas complejas — no por indecisión sino por minuciosidad.
- Aprecia la transparencia total y la documentación formal.
- Es el único firmante con autoridad plena en contratos — hay un umbral (aún no definido) por encima del cual requiere aprobación de asamblea para firmar independientemente.
- La "wishlist de IF" que generó la sección 8 del Plan Estratégico v3 revela su prioridad real: sostenibilidad interna de la empresa antes que crecimiento agresivo.

### El "olfato" de Sam — Capa no automatizable
Existe una capa de filtro en las decisiones comerciales y estratégicas de UNRLVL/ForumPHs que no se captura en métricas ni en análisis financiero. Sam la llama "olfato" — en dos sentidos: el del shark que detecta oportunidad, y el del protector que prevé variables de personalidad y calidad humana. Esta capa es deliberadamente no documentada en detalle. Claude no intenta sistematizarla ni cuantificarla. Se respeta como criterio soberano de Sam.

### Clientes actuales — Sensibilidad
Los 8 PHs actuales llegaron bajo PHAS (nombre anterior). La transición a ForumPHs es un proceso gradual. Algunos propietarios y JDs pueden no haber procesado completamente el cambio de marca. Las comunicaciones deben ser consistentes con el nuevo nombre pero no agresivas en el rebranding.

### Proveedores y aliados clave
- **CPA Marlene Molina** (PE-11-2157, CPA 0488-2020) — Contadora externa. Preparó EEFF 2025 no auditados. Relación formal, no de confianza ciega — los EEFF 2025 tienen la línea 172 (reservas laborales) en $0, lo que confirma que el pasivo histórico nunca fue provisionado.
- **MUNILY** — Plataforma de comunicación con propietarios. Ya activa. Maximizar uso.

---

## CAPA C — FINANCIAL INTELLIGENCE (específica de esta marca)

ForumPHs fue el primer caso de implementación del Financial Intelligence Engine. Los outputs generados:

| Archivo | Descripción | Estado |
|---|---|---|
| `ForumPHs_BI_2026.html` | BI 7 paneles + simulador timing | Entregado |
| `ForumPHs_EEFF_2026_v1.html` | Análisis EEFF Ene-Feb 2026 | Entregado |
| `FPHs_Business_Intelligence_2025.html` | BI original 2025 | Entregado |
| `ForumPHs_Plan_Estrategico_v3.docx` | Plan estratégico con 4 fondos | Pendiente aprobación IF |

**El número que gobierna 2026:** $20,500/mes — umbral donde todos los fondos son absorbibles sin tensión. Brecha actual: $3,193/mes = 1 PH mediano nuevo.

**Escenario óptimo:** 4 PHs nuevos antes de junio 2026 → $50k ahorro + $50k inversión en julio–agosto 2028.
