# PLAYBOOK — Propuesta de administración a un PH prospecto

**Marca:** ForumPHs · **Versión:** 2026-09-21-v2 · **Origen:** sesiones del 2026-09-08 al 2026-09-21
**Uso:** cualquier sesión que reciba una solicitud de cotización de una junta directiva sigue este procedimiento de principio a fin. Está escrito para que otra sesión lo ejecute sin contexto previo.

> **Regla de privacidad que gobierna todo el playbook.** Lo que se lee del buzón de un cliente o prospecto —vía el MCP de correo— se usa en el chat y no se escribe en ningún archivo, context file, Professor, AGENDA ni session_log. Este documento contiene método, no datos de ningún prospecto.

---

## 0 · El principio

ForumPHs no vende trámites: **administra patrimonio**. Toda la propuesta se construye para que el prospecto vea el valor antes que el precio, y para que cada cifra se pueda auditar.

Tres reglas que atraviesan todo:

1. **El valor llega antes que el número.** El precio que aparece después del análisis se compara con el análisis; el que aparece primero se compara con la tarifa de otro.
2. **Toda cifra dice de dónde sale.** `medido`, `reportado` o `deducido`, y nunca una proyección presentada como hecho.
3. **Toda tabla de costos dice quién absorbe la diferencia.** No basta con mostrar cuánto cambia el margen.

---

## 1 · Primer contacto y levantamiento

**Qué se envía:** acuerdo de confidencialidad y formulario de levantamiento. El formulario explica, bloque por bloque, por qué se pide cada dato.

**Qué se pide, separado por propósito.** Nunca como un bloque único de requisitos:

| Para qué | Qué se pide |
|---|---|
| Cotizar la limpieza | Metraje de áreas comunes, personas, turnos, régimen (planilla o empresa) |
| El plan de recuperación | EEFF del año anterior y del corriente, reporte de morosidad por antigüedad |
| Cotizar la administración | **Nada adicional** — alcanza con el número de unidades |

**Si el prospecto pide «de forma abreviada» lo que ya estaba en el formulario**, suele significar que el adjunto no se abrió o que hay que reenviarlo a un comité. La audiencia pasa a ser la junta.

**Si el prospecto no llena el formulario:** se adjunta sin mencionarlo.

---

## 2 · Dimensionar al prospecto sin datos internos

Con fuentes públicas —listados inmobiliarios del edificio— se obtiene:

- **Metraje por unidad** → rango y promedio.
- **Metraje privado total** = unidades × promedio.
- **Tarifa de cuota vigente**: una cuota publicada dividida entre el metraje de esa unidad da la tarifa por m².
- **Presupuesto anual estimado** = metraje × tarifa × 12.
- **Edad y altura del edificio**, que indican qué gastos mayores se acercan.

**Lectura crítica:** si la tarifa del prospecto ya está por encima de la media del portafolio, su problema no es de tarifa sino de cobro y de gasto. **La propuesta no debe insinuar subir la cuota.**

Todo esto es `deducido` y se presenta como estimación («unos»).

---

## 3 · Costeo

### 3.1 · Fuente: los EEFF de la operadora

El costo sale de los estados financieros de PH Administradores & Servicios, S.A. —estado de resultado, balance y flujo conciliado—, **nunca** del tarifario. El tarifario v4 se construyó sobre dos meses y subestimaba el costo real un 18.6%.

Partidas que el tarifario omitía y **deben** entrar: reservas laborales del período y liquidaciones pagadas.

### 3.2 · La unidad de costo correcta

| Servicio | Métrica correcta | Por qué |
|---|---|---|
| **Administración** | **Costo por unidad inmobiliaria** | El trabajo lo generan los propietarios: correos, mora, consultas, actas, votaciones |
| **Limpieza** | **Costo por m² de áreas comunes** | El trabajo lo genera la superficie |

Costear administración por m² encarece sin razón operativa a los edificios de unidades grandes. **Denominador:** el padrón real contado en base de datos, no el campo `total_units` ni el supuesto del tarifario.

### 3.3 · Reconstruir metraje cuando el padrón no lo tiene

Si el PH cobra por m², la cuota es `metraje × tarifa`, así que **`metraje = cuota ÷ tarifa`**, y la cuota está en el export de Sage.

**Validación obligatoria:** una misma unidad que aparezca con cuota antes y después de un cambio de tarifa debe dar el mismo metraje por ambas vías. Proyectado al total, contrastar contra el metraje que se deduzca del acta de asamblea (recaudación anual ÷ 12 ÷ tarifa). Referencia: Lefevre dio 0.1% de desvío.

**Verificar antes la base de cálculo:** hay PH que cobran monto fijo por tipo de unidad (cifras redondas) y ahí el método no aplica.

### 3.4 · Contratación compartida

Si el nuevo PH requiere contratar a alguien que se reparte entre varias administraciones en la misma ubicación:

> costo marginal = fracción de la persona + estructura compartida por unidad × unidades

La estructura compartida es todo lo que no es planilla de administradoras, dividido entre las unidades administradas.

### 3.5 · La tabla de precio

Para cada precio candidato: margen en monto y porcentaje, **$ por unidad** y su posición en la cartera, y **% del presupuesto anual del PH**. La diferencia entre dos precios se lee en ese porcentaje: si es marginal, el problema es de valor, no de dinero.

### 3.6 · Costo de la mora — y quién lo paga

La mora se mide **en dólares**, no en unidades: recaudación esperada contra recaudada, y debajo la cartera por antigüedad (30, 60, 90+). Las unidades aparecen sólo en el desglose por antigüedad.

La tabla de impacto debe decir explícitamente que **el PH paga lo mismo en todos los escenarios y que la caída de margen la absorbe ForumPHs.**

---

## 4 · El modelo comercial

**Servicio, no horas hombre.** Tabla a tener a mano: administradora dedicada 8 horas, media jornada 4 horas, servicio compartido. Con costos laborales panameños completos —CSS, décimo, vacaciones, prima— la dedicada cuesta más que el honorario y la media jornada deja un margen residual. Bajo modelo de horas, cada mejora de eficiencia se convierte en pérdida.

**Tres tarifas**, que dependen sólo del número de unidades y del metraje de áreas comunes, con **servicios idénticos en las tres**. Eso cierra la negociación antes de que se abra.

**Cartera:**
- Recuperación incluida, sin costo adicional, hasta los 90 días de atraso.
- A partir de 90 días: ForumPHs recomienda la vía legal y entrega el expediente completo, sin costo. La gestión pasa a la Junta y su abogado.
- **Sin comisión sobre lo recuperado en ninguna etapa.**
- ForumPHs no asume representación judicial: quien administra el patrimonio no debe cobrar por litigar sobre él.
- Ninguna comisión por referir abogados.

**No se maneja el dinero del cliente:** los cobros van por ACH directo a la cuenta del PH y entran a Sage 50.

**Se vende la medición y el informe, no un porcentaje.** El umbral interno existe como barra de gestión y entra al contrato cuando haya histórico.

**Denominaciones:** «hasta cincuenta horas anuales de asesoría legal idónea». Título: «Abogada Especialista en Régimen de Propiedad Horizontal».

---

## 5 · El material de muestra: la Suite por enlace con token

### 5.1 · Anonimización — checklist

Revisar **texto visible y JavaScript** (las etiquetas de las gráficas no aparecen en una búsqueda de texto):

- [ ] Nombre del PH
- [ ] Códigos de unidad
- [ ] Metraje total y tarifa por m²
- [ ] Cuota por unidad — es la misma cifra dicha de otra forma
- [ ] Número de pisos y número de unidades
- [ ] Barrio, zona o cualquier asociación geográfica
- [ ] Recomendaciones que **no aplican al receptor** (p. ej. subir la cuota cuando el prospecto ya la tiene alta). Se conservan expresadas como resultado, no como cifra

### 5.2 · Publicación

1. El HTML fuente se interioriza —fuentes y Chart.js locales, favicon declarado— con `scripts/vendor-collateral.mjs` del repo `forumphs-com`.
2. Se sube a `collateral/{brand_id}/{nombre}.html` (bucket privado).
3. **Verificación sin abrir el enlace:** comparar el tamaño en bytes de `storage.objects` con el archivo local.

### 5.3 · Emisión y seguimiento del enlace

- Una fila en `public.collateral_links` por destinatario, token de 22 caracteres base62, vencimiento a 30 días.
- Consultar `open_count`, `first_opened_at`, `last_opened_at` para saber si se abrió.
- **En pruebas no abrir el enlace real**: cada apertura cuenta. Si hay que hacerlo, anotar cuántas son propias.
- Revocar: `UPDATE … SET revoked_at = now()`; surte efecto en la siguiente petición.

---

## 6 · La imagen de correo

**Por qué existe:** un enlace al final de un correo no se abre. El valor tiene que llegar dentro del cuerpo.

**Estructura narrativa, en este orden:**
1. Pregunta patrimonial: *¿la administración de su edificio protege o erosiona el valor de sus unidades?*
2. Índice de Salud Patrimonial y sus cinco dimensiones, con la marca de zona verde
3. Lectura de ForumPHs, sin cifras identificables
4. Morosidad: porcentaje en tramo crítico, probabilidad de recuperación por tramo, pérdida sin gestión
5. Proyección: de hoy a zona verde con plazo, y el plan en una frase
6. Los componentes del análisis completo, como gancho — la imagen termina aquí

**Reglas:**
- Una sola imagen; adelanto, no contenido completo.
- **Sin plazo de vencimiento dentro**, para que sea reutilizable. El plazo va en el texto.
- **Sin botón dibujado.** Un botón dentro de la imagen desaparece cuando el cliente bloquea imágenes, y no se puede hacer clicable.
- **La imagen NO es clicable.** Si lo es, quien hace clic cree que la imagen es el informe, aunque debajo diga lo contrario — observado en el primer envío.
- **El botón real, en HTML, va inmediatamente debajo y es la única llamada a la acción.** Se ve siempre, con o sin imágenes.

**Pipeline:**
1. HTML a 600 px de ancho CSS con las fuentes de marca.
2. Render con Playwright, `device_scale_factor=2` → 1200 px reales.
3. **Exportar PNG a todo color.** La reducción a 256 colores degrada los verdes y los degradados.
4. Subir a `brand-assets/{brand_id}/email/` (bucket público).
5. **Cada versión con nombre nuevo** (`_v2`, `_v3`…), sin sobrescribir: Gmail guarda en caché las imágenes por URL y podría mostrar la versión anterior.

---

## 7 · El correo

**Asunto:** «{PH} — Propuesta de administración patrimonial», o se conserva el del hilo si es respuesta.

**Orden:**
1. Agradecimiento breve y «antes del número, quiero plantear algo»
2. Reencuadre patrimonial: lo que el PH administra al año y la edad del edificio
3. La imagen, sin enlace
4. El botón, y debajo el vencimiento del enlace en texto
5. El honorario, cómo se llegó a él y las tres tarifas
6. Qué incluye
7. Tres puntos que distinguen: servicio no horas (con el riesgo laboral de contratar propio), no manejamos su dinero, recuperación sin costo adicional
8. Lo que falta, con su motivo separado
9. Acuerdo de confidencialidad adjunto
10. Cierre corto

**Envío:** desde el buzón de Gmail de la marca, **«Responder a todos»** sobre el último mensaje del prospecto, para que llegue a la Junta y se conserve el hilo. **No por Resend**, que es para correo de sistema. **No por el conector de Gmail**, que elimina las imágenes alojadas y envía desde otra cuenta.

**Entregables para el envío** — la sesión entrega tres piezas:

| Pieza | Qué es |
|---|---|
| **Cuerpo en `.docx`** | El texto completo ya formateado, con los marcadores `[IMAGEN]` y `[BOTÓN]` en su lugar exacto |
| **Botón en `.html`** | Una página que contiene sólo el botón, con el enlace del destinatario |
| **URL de la imagen** | La dirección pública en `brand-assets` |

**Procedimiento de armado en Gmail:**
1. Abrir la respuesta con **«Responder a todos»** sobre el último mensaje del prospecto.
2. Abrir el `.docx`, copiar todo y pegar en el cuerpo.
3. En `[IMAGEN]`: borrar el marcador → *Insertar foto → Dirección web (URL)* → pegar la URL. **No enlazarla.**
4. En `[BOTÓN]`: abrir el `.html` del botón en Chrome, seleccionar el botón, copiar, y pegar sobre el marcador.
5. Adjuntar el NDA y revisar la firma.

**Por qué así, `medido` el 2026-09-21:** pegar en Gmail un HTML completo **rompe la lectura en el móvil**. El editor descarta el ancho adaptable y la imagen de 600 px obliga a reducir todo el correo; hay que ampliar con los dedos para leer. Pasar el texto por Word lo normaliza a un formato que Gmail interpreta de forma nativa. El botón, en cambio, sí se pega bien desde HTML: conserva color, forma y enlace.

**Prueba:** enviarse el correo a uno mismo **desde el mismo buzón** y **abrirlo en el móvil**, no sólo en el escritorio. Es la única prueba que valida lo que recibirá el prospecto. No hacer clic en el botón durante la prueba: cada apertura cuenta en el registro.

---

## 8 · El acuerdo de confidencialidad

- Partir del modelo estándar aprobado por la asesoría legal.
- **Los datos de ForumPHs** —razón social, RUC, representante, cargo— son fijos y se completan en todas las copias. Se toman del último NDA completado, no se escriben en context files.
- Los datos del PH quedan en blanco para que los complete el prospecto; la fecha, al firmar.
- **Completar por posición**, no por texto: el mismo marcador se repite con distintos significados. Listar antes todas las apariciones con su contexto.
- **Retirar las notas de borrador** antes de enviar.
- Jurisdicción: mediación interna entre ForumPHs y la Junta Directiva; si no hay acuerdo, vía judicial competente de la República de Panamá.
- Notificaciones de ForumPHs: `admin@forumphs.com`.
- Pesa ~890 KB porque incrusta las fuentes de marca: es intencional.

---

## 9 · Checklist antes de enviar

- [ ] Precio decidido y respaldado por la tabla de §3.5
- [ ] Suite anonimizada según §5.1, subida y verificada por bytes
- [ ] Enlace vigente y con fecha de vencimiento correcta en el texto
- [ ] Imagen alojada con nombre de versión nuevo, a todo color, **sin enlace**
- [ ] Botón pegado desde el `.html`, con el enlace del destinatario
- [ ] NDA con los datos de ForumPHs completos y sin notas de borrador
- [ ] Prueba enviada desde el mismo buzón y **revisada en el móvil**
- [ ] Envío como respuesta a todos en el hilo
- [ ] No haber abierto el enlace real, o anotar las aperturas propias

---

## 10 · Artefactos de referencia

| Artefacto | Dónde |
|---|---|
| Suite de muestra interiorizada | `collateral/ForumPHs/suite-gestion-financiera.html` |
| Imagen de correo | `brand-assets/ForumPHs/email/ForumPHs_Suite_Extracto_Correo.png` |
| Ruta de enlaces | `forumphs.com/bim/{token}` · tabla `public.collateral_links` |
| Interiorizador | `forumphs-com/scripts/vendor-collateral.mjs` |
| Emisión de enlaces | `forumphs-com/scripts/collateral-link.mjs` |
| Modelo de NDA | Sales-Kit · modelo estándar |
| Protocolo de transición | Sales-Kit · modelo estándar |
| Documentos de decisión internos | Decisión de precio y cartera · Modelo de servicio vs. horas (sesión 2026-09-21) |

---

*ForumPHs · Playbook de propuesta a prospecto · 2026-09-21*
