# SESSION LOG — NeuroneSCF B2B
_Actualizado: 2026-08-09 · base previa 2026-08-08 (base previa 2026-06-16, sesión 7)_

---

## 2026-08-09 — Firmas sembradas y política de idioma aplicada

`signature_closer` sembrado en `nscf_conversion` y `nscf_editorial` con variante bilingüe (`text` + `text_en`). Ninguna voz de NSCF lo tenía: las tres activas publicaban sin firma.

**Reparto decidido con Sam e invertido** respecto de la propuesta inicial: conversión lleva la firma sustantiva ("Ciencia capilar aplicada al clima de la Florida"), editorial lleva el sello ("HAIR INTELLIGENCE"). Un nombre de línea no dice nada a quien no conoce la marca; en conversión el lector todavía no la conoce. "Florida" sobre "Miami" por consistencia con `neuronescflorida.com` y con el nombre de marca.

**Idioma:** `voicelab_language` de `es-FL` a `es`; `icp` y `voicelab_compliance_rules` reescritos sin spanglish.

**PENDIENTE:**
- `po_consumer` sin firma (`null` declarado) — está bajo `brand_id='NeuroneSCF'` pero es voz de Patricia Osorio (aplica a `product_description_b2c`, `post_purchase`, `abandoned_cart`; NO aplica a B2B). **Asignación de marca a revisar.**
- `nscf_professional` declarada con sesión `active` de 0 turnos y **sin genoma**.
- `nscf_conversion` es v0.5 **activa sin calibrar**.
- `nscf_editorial` con `target_artifact` en forma vieja y `channel:"Blog"` que no joinea contra `platform_canal_map` (clave real: `blog`).

## 2026-08-08 — Voz editorial `nscf_editorial` v1.0 activa + cableado de voces

**Conducido por:** Sam × Claude.ai (calibración) + CC (Actualiza). **Marca:** NeuroneSCF. Bloque ecosistémico en `brands/UnrealvilleStudio/session_log.md` (2026-08-08). Este PR sólo toca context files; el cableado en DB (`content_type_registry` / `creative_compatibility_rules`) lo aplicó Claude.ai fuera de PR.

### `nscf_editorial` v1.0 — calibrada y operativa
- Bucle Boids de 10 turnos en chat, convergida (últimos 3 SÍ). El eje se reescribió 3 veces en vivo.
- **Construcción propia hallada: el par cerrado con llave de diagnóstico** — la firma de forma de esta voz.
- Activa en `brand_voice_genome` (v1.0). Fila propia en `content_type_registry` y en `creative_compatibility_rules` (parte de las 14 filas de cableado de voces del ecosistema; ver bloque ecosistémico).
- **4 topics de blog sembrados en AUTHORITY.**

### `nscf_professional` — EN PAUSA
Por decisión de Sam, hasta que PO tenga lista esa línea de negocio. No es deuda del sistema: la bloquea el negocio, no el pipeline.

### `po_consumer`
Activa con 0 topics. Decisión registrada: **no hacer nada** (estado, no pendiente accionable).

### Pendientes de marca
- **Hueco de frecuencias NSCF** — cadencia editorial por definir.
- **Header del blog NSCF** — pendiente; arrastra la violación de voz registrada el 2026-07-11 ("sin promesas vacías" en el header: la voz DEMUESTRA, no declara).

---

## 2026-07-02 (cont.) · NSCF — E6 genoma nscf_conversion ESCRITO + #45 brand_topics sembrados · Sam + Claude

**Conducido por:** Claude Opus 4.8 (chat) + MCP (Supabase) · **Marca:** NeuroneSCF
**Estado:** ✅ E6 cerrado (genoma de conversión vivo y activo) + #45 fase 1 cerrado (5 topics). NeuroneSCF quedó OPERABLE end-to-end por el IID (voz + topics). Professor: 4 learnings nuevos. Continuación directa del ejercicio de calibración del mismo día.

### E6 — genoma `nscf_conversion` v0.5 (INSERT verificado)
- `public.brand_voice_genome`: brand_id=NeuroneSCF, voice_id=**nscf_conversion**, version 0.5, maturity v0.5, active=true. 12 dimensiones JSONB, formato espejado de `unrlvl_default` v1.0.
- Contenido destilado del bucle Boids: eje moral (autoridad-por-contraste, blanco=asesoramiento genérico-conveniente, prohibición de absolver), filo 5/10 instrumental, estructura canónica (escena tercero→giro tuteo→mercado falla→Neurone→cierre), reglas de forma (regla de oro, desplazamiento de protagonista, presunción de compañía, precisión sin "casi", tuteo desde el giro, ley del cierre, variación de técnica), capa científica Neurone, Patricia percibida no declarada.
- **Idioma:** ES-neutro + EN-neutro sin regionalismos, generados por separado (no traducir). Contexto temático = Florida; registro lingüístico = neutro.
- **TikTok añadido** a application_constraints como CAPA DE TEXTO (caption/on-screen); guion hablado reservado a futuro `nscf_video` (frontera de genoma, patrón Lucien).
- version 0.5 porque calibra criterio, no valida producción; sube a v1.0 tras outputs reales del IID.

### #45 (fase 1) — 5 brand_topics de NeuroneSCF (INSERT verificado)
`intel.brand_topics`, todos voice_by_destination={social/editorial: nscf_conversion}, platforms=[meta_fb, meta_ig, tiktok], purpose=[publish,internal], auto_approve=false, active=true, rollout_phase=1, cadencia crescendo:
- **frizz-humidity** (priority 100) — persona b2c_frizz_humidity
- **color-fade** (priority 100) — persona b2c_color_fade
- **damage-repair** (priority 100) — persona b2c_damage_repair
- **chlorine-sun** (priority 90) — persona b2c_chlorine_sun
- **fine-fragile** (priority 90) — persona b2c_fine_fragile

Cada `angle` se nutre del tone_for_segment/copy_hooks/avoid de su persona en `brand_personas`. `hard_rules` de cada uno lleva el eje moral + idioma neutro + reveal tardío + filo 5/10.

**Aprendizaje de arquitectura:** los topics de una marca de PRODUCTO/CONVERSIÓN (NSCF) se mapean a PROBLEMAS/PERSONAS reales (los del clima de Florida ya poblados en brand_personas), NO a territorios de research abstracto como las marcas de AUTORIDAD (UNRLVL/Lucien → ai-cognition, etc.).

### Distinción de marca crítica (registrada)
NeuroneSCF ≠ Patricia Osorio (PO). Son DOS marcas distintas de Patricia. PO = marca personal (PatriciaOsorioConectando, comunidad); NeuroneSCF = e-commerce/distribuidora de productos Neurone. Relación: PO es parte de Neurone pero no ES Neurone; Neurone es parte de PO pero no ES PO. No se colapsan.

### DEUDA detectada — `po_consumer` mal asignado (a verificar, NO tocado)
Existe fila `po_consumer` v0.6 ACTIVA bajo brand_id=**NeuroneSCF** que probablemente está MAL ASIGNADA: es voz de PO-persona (asesora, "no convence, clarifica", honestidad clínica), no de la distribuidora Neurone. Acción pendiente: verificar y reasignar brand_id a la marca de PO correspondiente. NO se tocó (fila activa en producción). También verificar si PO como marca tiene sus propios brand_topics en Meta+TikTok (si no, va a revisión).

### Deudas relacionadas mapeadas
- Persona `default` de NSCF sin topic (fase 2 de #45).
- `nscf_editorial` (Hair Intelligence) y `nscf_professional` (B2B) pendientes de sus propios bucles.
- `es-FL` de brand_personas/humanize_profiles a neutralizar a ES-neutro (contradice el idioma unificado).

### Escrituras en DB
- `brand_voice_genome`: 1 fila nueva (nscf_conversion v0.5) + 1 UPDATE (TikTok en application_constraints). Verificadas.
- `intel.brand_topics`: 5 filas nuevas. Verificadas.
- `professor_learnings`: 4 learnings nuevos 2026-07-02, category voice_genome, approved_by_sam=true.

---

## 2026-07-02 · NSCF — Calibración de VOZ / Genoma (bucle Boids en vivo) · Sam + Claude

**Conducido por:** Claude Opus 4.8 (chat) + MCP (Supabase) · **Marca:** NeuroneSCF
**Estado:** ✅ Genoma de CONVERSIÓN convergido (bucle 10 piezas, últimas 3 SÍ). Profesor: 8 learnings escritos y aprobados. Tratado (skill genome-calibration v1.0) redactado para push. Genomas editorial y B2B identificados, pendientes de su propia pasada.
**Contexto:** este ejercicio nació como banco de pruebas de la mecánica del bucle E5b (IID #47) antes de codificar `/api/calibrate.ts`. Sam sembró el eje fundador de NSCF y corrimos el bucle en vivo. Doble entregable: validar la mecánica + destilar el genoma real de NSCF.

### Mecánica validada (corrige el diseño previo de E5b)
Claude PROPONE el texto; Claude pregunta "¿es NSCF? SÍ/NO"; Sam responde SÍ/NO + su VISIÓN del porqué; Claude recalibra y propone el siguiente. Quien genera es Claude, siempre. Convergencia = 10 mín + últimos 3 SÍ. Detalle completo del método en el skill `genome-calibration` (Tratado).

### Hallazgo estructural: NSCF tiene MÍNIMO 3 genomas hermanos
Mismo núcleo, distinta respiración (patrón análogo a Lucien editorial/social):
- **`nscf_conversion`** — marketing directo (escena→giro→tuteo→cierre en Neurone/CTA). **ÚNICO CALIBRADO** en esta sesión.
- **`nscf_editorial`** — Hair Intelligence: enseña, respira largo, recluta lectoras→futuras clientas, invoca la CIENCIA Neurone como prueba, cierra en firma de autoridad / siguiente artículo. Molde real existente (artículo "por qué el acondicionador no basta"). Pendiente de bucle propio.
- **`nscf_professional`** — B2B, dato primero, entre pares. Declarado en `brand_personas`, fuera de mapa por ahora.

Fuente ya existente de la voz: `brand_personas` (9 personas activas) + `humanize_profiles` (no `brand_voice_genome`, donde el IID la busca). El genoma debe UNIFICAR y elevar lo ya destilado en esas tablas.

### Eje moral de NSCF (lo más profundo del ejercicio — 3 campos)
1. **Autoridad-por-contraste:** la marca nace de hacer lo que los demás no hacen — asesorar personalizado frente al clima real de Florida.
2. **Blanco = asesoramiento genérico y conveniente** (el consejo sesgado por la renta del salón). FENÓMENO, nunca la clienta, nunca el estilista como persona ni guerra abierta al B2B.
3. **Prohibición:** nunca absolver la falla genérica ("tu colorista hizo su parte" prohibido), ni personalizarla.

### Correcciones duras de Sam (permanentes)
- **Target:** el cliente INVIERTE, NO compra en el súper. "El producto del súper" la insulta y la pierde. Adversario = el consejo genérico, no el gasto bajo.
- **Filo 5/10 instrumental:** corta para mover, no para herir; convierte por diseño; nunca burdo ni corriente.
- **Capa científica:** Neurone = "la ciencia detrás de…" (neurocosmética, nanotribología, acción multinivel, 40+ años). La calidez la da Patricia; la autoridad última la da la ciencia.
- **Bilingüe:** ES y EN neutros SIN regionalismos, generados por separado, nunca traducidos.
- **Dominio correcto:** `neuronescflorida.com`.

### Reglas de forma destiladas (microtécnica)
Regla de oro (no preguntar lo que responde en contra) · desplazamiento de protagonista (tercero → ella → Neurone) · presunción de compañía · precisión sin "casi" · tuteo directo desde el giro · ley del cierre (lo último = Neurone) · estructura mínima 3 partes · CTA puede ser servicio (diagnóstico con PO). Todo codificado en el Tratado §9.

### Voz vs Intención (aprendizaje de método)
El bucle converge VOZ; la INTENCIÓN estratégica es un eje aparte. Un texto puede sonar 100% a la marca y fallar en intención (la 10/10 fue "SÍ pero" y ese "pero" produjo el eje moral). `/api/calibrate.ts` debe capturar dos señales: `verdict_voice` + `notes_intent`.

### Escrituras en DB
- `public.professor_learnings`: 8 filas nuevas `session_date=2026-07-02`, category `voice_genome`, score 5, `approved_by_sam=true` (3 de método bajo UnrealvilleStudio, 5 de genoma bajo NeuroneSCF). Verificadas.
- Ninguna escritura a `brand_voice_genome` todavía — la destilación al genoma (E6) es paso posterior bajo HRD.

### Pendientes generados
- [ ] E6: destilar `nscf_conversion` a `brand_voice_genome` (chat Sam×Claude, HRD, método quirúrgico).
- [ ] Bucle propio para `nscf_editorial` (usar el artículo Hair Intelligence como semilla — caso ideal de la puerta "desde Genoma capturado").
- [ ] Decisión E6: ¿el `es-FL` de `brand_personas`/`humanize_profiles` se neutraliza a ES neutro sin regionalismos? (marcado, no tocado).
- [ ] Diseño técnico D1–D4 de E5b (`intel.calibration_sessions` + `/api/calibrate.ts` + prompt del generador) — sesión siguiente, ahora anclado en la mecánica validada.

---

## 2026-06-20 (cont.) · NSCF — Cron de integridad Shopify↔Supabase + limpieza fantasmas

**Conducido por:** Claude Opus 4.8 (chat) + MCP (Supabase) + CC (deploy EF + cleanup repo)
**Marca:** NeuroneSCF
**Estado:** ✅ CERRADO — EF integridad LIVE, cron activo, 2 fantasmas limpiadas. (Decisión cron = caso de uso real identificado en sesión previa de hoy.)

### Limpieza de drafts fantasma
- #1003 (Martha, yts-cw-martha) y #1007 (Patricia, vizos-patricia): drafts status=completed con shopify_order_id que NO existe en Shopify (verificado: order(id) → null en B2C y B2B). Origen: modo prueba del checkout.
- Marcados `status='voided_test'` en nscf_draft_orders (de 'completed'). Dejan de aparecer como huérfanos. Verificado: 0 huérfanas reales restantes.
- NO se borran del disco/tabla — quedan como registro auditado.

### Cron de integridad (Capa 5, alcance correcto = integridad de datos, NO recálculo de comisiones)
- **Tabla nueva `public.nscf_integrity_log`**: id, draft_id, shopify_order_id, shopify_order_number, ambassador_id, issue_type ('phantom_no_shopify_order'), detail, resolved, detected_at. GRANT ALL a service_role + postgres.
- **EF `nscf-integrity-check` v1** (verify_jwt:false, deployada por CC con token fresco, fuente=disco byte-exacto): lee token Shopify B2C de shopify.stores.access_token en runtime; por cada draft completed con shopify_order_id sin comisión, hace GET orders/{id}.json contra Shopify (API 2024-10); si 404 → marca voided_test + inserta en nscf_integrity_log. Status ≠200/404 → no concluye (no marca). NO toca nscf_commissions.
- **Cron pg_cron job 34 `nscf-integrity-check-weekly`**: '0 4 * * 0' (domingos 04:00 UTC) → net.http_post a la EF (patrón jobs 30/31, timeout 120s). Activo. Sin duplicados.
- Primera corrida real: domingo (no se invocó manualmente; las 2 fantasmas actuales ya estaban limpiadas a mano).

### Repo NeuroneSCF (cleanup, vía CC — pusheado por Sam GitHub Desktop)
- supabase/functions/nscf-integrity-check/index.ts (EF, nuevo).
- supabase/.gitignore creado (.temp, .branches, .env*).
- supabase/.temp/{cli-latest, linked-project.json} des-trackeados (git rm --cached, siguen en disco) — metadata CLI que había entrado por error.

### Pendiente: rotar SUPABASE_ACCESS_TOKEN usado en el deploy (sbp_1547…, queda en chat; expira ~1h por sí solo).

---

## 2026-06-20 · NSCF — Console Fase 3 mejoras LIVE + sincronización comisiones con Shopify (fuente de verdad)

**Conducido por:** Claude Opus 4.8 (chat) + MCP (Shopify, Supabase) + CC (deploy EFs)
**Marca:** NeuroneSCF
**Estado:** ✅ CERRADO — 3 archivos deployados, 6 comisiones reconciliadas contra Shopify, 2 ventas cash creadas con flujo real, 8 learnings Professor aprobados.

### A. NSCF-Console Fase 3 — 4 mejoras deployadas (LIVE, verificadas web+mobile por Sam)
- **nscf-mailer v26→v27** (prod version 27, verify_jwt:false): `commissionsReportHTML` ahora pinta detalle venta-a-venta como estado de cuenta secuencial (por embajadora: fila totalizada + tabla de sus ventas del período). Recibe `rows` en el payload.
- **nscf-b2b-approve v3→v4** (prod version 8, verify_jwt:false): (1) `ambassadors_report_email` añade `rows` al payload del mailer; (2) `inventory_view` REFACTORIZADO a 3 columnas — separa B2C por location_id en `b2c_bodega1`/`b2c_bodega2` + `b2b`, sin sumar total B2C. Constantes B2C_BODEGA1_ID=110732378439, B2C_BODEGA2_ID=110733263175.
- **nscf-console/src/App.jsx**: (1) toggle de ventana en AmbassadorsScreen — "Este mes" (default) / "Mes anterior" / "Ambos", total recalcula; (2) InventoryScreen 3 columnas con títulos golden terra (#C4622D/--pro-gold) y fondos diferenciados. El toggle usa el `month_key` que la EF ya aceptaba (sin cambio de motor).
- **Deploy:** vía CC con SUPABASE_ACCESS_TOKEN, orden mailer→approve, `--no-verify-jwt` preservado. Front por GitHub Desktop (auto-deploy Vercel). Token venció naturalmente (~50 min), sin acción de rotación necesaria.

### B. Reconciliación de comisiones huérfanas contra Shopify (fuente de verdad)
Se detectaron 6 drafts `completed` en Supabase con comisión nunca creada. **Regla aplicada: Shopify es la fuente de verdad — comparar antes de insertar.**
- **2 NO EXISTEN en Shopify** (#1003 Martha, #1007 Patricia) → drafts de "modo prueba" del checkout que quedaron en Supabase. NO se pagan. DESCARTADAS. → Identifican el caso de uso REAL del cron de integridad (ver AGENDA).
- **4 REALES confirmadas en Shopify** → insertadas en `nscf_commissions` como `pending`:
  - #1008 Patricia/vizos $85.00 → $8.50 (may)
  - #1009 Diana/yts-nm $99.99 → $8.00 (may, cliente Nora, línea HUMIT)
  - #1010 Diana/yts-nm $99.99 → $8.00 (may, cliente Xiomara, línea KERASIN) — NO duplicado de #1009 (distinto cliente/producto/minuto)
  - #1028 Diana/yts-nm $83.99 → $6.72 (jun, custom kit 40% autorizado por PO)
- Total recuperado: $31.22.

### C. 3 ventas cash sin registrar (Patricia) — backfill con flujo real
PO reportó 3 ventas cash de cuando no sabían registrarlas. Creadas como órdenes Shopify B2C reales (draftOrderCreate + appliedDiscount FIXED_AMOUNT + customAttributes kiosko + draftOrderComplete). El webhook nscf-attribution creó las comisiones solo.
- **#1031** Kit cash Patricia: Capissen Shampoo + Capissen Lotion + DY Fazza Color 200ml + Total Violet Mask. Lista $189.96, 40% off → $113.98. Comisión $11.40.
- **#1032** Kit Kerasin Patricia: Shampoo Kerasin HB + Kerasin HB Mask + DY Fazza Color 200ml. Lista $144.97, 31% off → $99.99. Comisión $10.00.
- **Venta 3 (Controller) NO creada**: "Control Gel" = CONTROLLER 300gr NSCF-ST-001, producto solo-Vizos que NUNCA estuvo en Shopify por diseño (gel styling caro, baja rotación online). No se puede crear orden real para un producto inexistente en catálogo. Si se quiere pagar la comisión de Patricia ($6.90 sobre $69.00), requeriría inserción manual sin orden — queda anotado, sin resolver.
- Nota: órdenes salieron con fecha de hoy (20-jun), no del 1-10 jun (draftOrderComplete no permite backdatear vía API). Irrelevante para comisión (month_key=junio).

### D. Aclaraciones de Sam (capturadas como learnings)
- Redondeo de comisiones = half-up a 2 decimales (`.toFixed(2)` del webhook ya lo hace). No es decisión de negocio, es "se paga en centavos". El centavo de #1024 era subtotal_price Shopify ≠ discounted_total draft.
- Las fantasma #1003/#1007 nacieron en modo prueba del checkout. → justifica cron de integridad Shopify↔Supabase (NO recalcular comisiones).
- #1028: Diana no tiene rol para 40%; la venta se hizo desde perfil de Patricia (autoriza, max_discount_pct=40) pero atribuida a Diana (la generó). El ~40% = beneficio de compra por kit, vía PO only.

### E. Hallazgos de infra verificados
- **nscf-attribution v14** = webhook Shopify `orders/paid` (NO flujo kiosko). Lee note_attributes, calcula sobre `order.subtotal_price × base_commission_rate` con `.toFixed(2)`, marca draft completed, dispara mailer. El flujo de junio (#1021+) crea comisiones en tiempo real — el agujero histórico ya no sangra.
- Catálogo B2C: kits custom se arman line-item por SKU + descuento de orden. DY Fazza Color 200ml NSCF-TR-015 $44.99 (vs 400ml NSCF-BTP-004 $49.99).

### Professor: 8 learnings aprobados (governance/data/infra/business). Ver professor_learnings 2026-06-20.

### Pendientes a AGENDA (no construidos):
- Cron de integridad Shopify↔Supabase (detecta drafts completed sin orden real — las fantasma de modo prueba).
- Limpieza de las 2 fantasma (#1003/#1007) en nscf_draft_orders (borrar o marcar test/voided).
- Decisión sobre comisión del Controller (venta cash #2, $6.90).

---

## ⏸️ RETOMAR EN PRÓXIMO CHAT (prioridad)

**De sesión 7 (NSCF-Console Fase 3 — capas pendientes):**
1. **Capa 5 — Cron de reconciliación (EL IMPORTANTE).** Tapa la causa raíz: el kiosko escribe el draft una vez y nunca reconcilia. Un `pg_cron` + EF que corra el MISMO cruce de `ambassadors_report` cada X horas y **detecte y avise** (NO repare dinero automáticamente): comisión sobre orden cancelada, `ambassador_id` inexistente en maestro, venta completed sin comisión, `amount_mismatch`. Las correcciones que tocan dinero quedan como **acción asistida en consola** para que admin (Patricia) apruebe con clic. Webhook `orders/cancelled` como mejora de latencia posterior. **La lógica del cruce YA existe** en la acción `ambassadors_report` de `nscf-b2b-approve` v5 — reusarla.
2. **Capa 3 — Reporte por Resend.** Tipo `ambassador_report` en `nscf-mailer` (v24). **Body HTML enriquecido, sin adjunto.** Destinatarios: **Sam + Patricia + Diana** (`sam@unrealvillestudio.com`, `patriciaosorio@neuronescflorida.com`, `dianaespinosa_8709@icloud.com`). El botón "Enviarme el reporte" de la consola (hoy stubbeado/deshabilitado) lo dispara. Reusa el cruce de `ambassadors_report`.
3. **Capa 4 — Inventario Shopify (dos tiendas).** Acción `inventory_view` (`['admin','ops']`). **DESBLOQUEADA:** verificado que ambas tiendas (B2C `egdk1n-gt` y B2B `nj5ybc-n1`) tienen token activo vía RPC `get_shopify_store`. Activa el tile "Inventario" que hoy está deshabilitado/"próximamente".
4. **Console — próximo update (a dimensionar, pedido de Sam s7):**
   - **Tabla de precios** — vista de precios en la consola (definir si editable o solo consulta).
   - **Informe de ventas y profit** con selector **"este mes" / "mes anterior"**. NOTA: "profit" exige conocer **costos** (no solo ventas) → arrastra una fuente de datos de costos que hoy quizá no está estructurada en consola. Dimensionar al llegar (como se hizo con ambassadors).
   - **Toggle de "ojo" en el password** del login de consola — EN CURSO (spec dada a CC fin de s7).

**De sesión 5 (pricing + assets) — sigue pendiente:**
5. **Custom Kit de prueba (Orlando)** — armar kit real con `nscf-pricing` y las 3 vistas.
6. **Mini-proyecto CC: poblar `product-assets`** — brief listo. Fuente: repo blueprints. Vía = raw.githubusercontent (NO el proxy).
7. **ui-ux-layer — completar resolución de assets** (multimarca, patrón raw.githubusercontent por `brand_id`, genérico, NO hardcodear marca).

**De sesión 6 — backlog seguridad:**
8. **Klaviyo key hardcodeada** + verificar exposición keys Resend FPHS. Agrupar en "sesión de seguridad" (aplicar lección: deploy ANTES de revocar).

**De sesión 4 — diferido (NO bloquea):**
9. **Sesión Shopify infra** — app dedicada commerce, multi-token por tienda. Fase 2.5 PARQUEADA (volumen no la amerita).

---

## NOVEDADES ESTA SESIÓN (2026-06-16 sesión 7) — NSCF-Console Fase 3 (Capas 1+2) + Limpieza de comisiones + botón Console en kiosko

### BLOQUE A — Limpieza y reconciliación de comisiones de embajadoras (May–Jun 2026)

**Disparador:** Sam pidió el reporte de ventas de embajadoras May + lo que va de Jun. Auditando Shopify ↔ Supabase aparecieron errores reales que afectaban el cobro.

#### Auditoría manual completa (21 órdenes #1008–#1028, Shopify = fuente de verdad)
Se leyó cada orden por sus `customAttributes` (cliente/embajadora viven en Notes/atributos, NO en campos estándar). Hallazgos y correcciones (7 escrituras a `nscf_commissions`/`nscf_draft_orders`):

- **#1026, #1027** — comisiones de Patricia sobre órdenes **canceladas en Shopify** (mismo producto 2 veces, doble intento). → `status='cancelled'` (no borradas, preservan auditoría). −$22.00 comisión que no correspondía.
- **#1008** (Patricia), **#1009, #1010** (Diana) — **ventas completed SIN comisión** (un mes sin registrarse). → comisiones creadas.
- **#1028** — atributo Shopify corrupto `vizos-Diana` (id inexistente). La vendió **Diana** con el user de Patricia (porque aplicó descuento 40% que solo Patricia puede). → draft reasignado a `yts-nm-diana`/`yts-nm`; comisión creada para Diana. **Había además una comisión DUPLICADA** de Patricia ($8.40) creada por el kiosko el 13-jun → **eliminada** (error de diagnóstico de Claude detectado y corregido en verificación: #1028 SÍ tenía comisión, mal asignada).

#### Base de cálculo unificada (DECISIÓN PERMANENTE de Sam)
- **Comisión = SUBTOTAL de producto en Shopify** (sin tax ni shipping). Confirmado por Sam: "Shopify es la fuente sobre subtotal porque perdemos rastro de comisiones y gastos/costos."
- **La diferencia Shopify-vs-Supabase era el SALES TAX.** Verificado orden por orden: `subtotalPrice` Shopify = monto guardado en Supabase; `totalPrice` = subtotal + tax. Las comisiones VIEJAS estaban bien (sobre subtotal); las 4 que Claude creó al inicio estaban infladas (usó `totalPrice`) → **recalculadas a subtotal**. Sistema quedó consistente.

#### Resultado final (cuadrado contra DB)
- **Patricia:** 8 ventas pendientes, comisión **$95.92** (10%); 2 canceladas excluidas. *(Nota: tras eliminar la duplicada de #1028, el detalle por venta y los totales quedaron consistentes; cifra final verificada en DB.)*
- **Diana:** 10 ventas, comisión sobre subtotal (8%).
- **Laura:** sin ventas en el período (activa como embajadora, sin órdenes).
- Reporte xlsx entregado (Resumen / Detalle / Canceladas / Correcciones).

#### Corte de salón de Diana (yts-nm → vizos) — punto y seguido
- Diana dejó de trabajar en Yodi (yts-nm) y pasó a **Vizos** con Patricia; tendrá rol más amplio (ampliación de embajadoras a **Orlando**, apoyo al educador NSCF).
- **Opción A aplicada:** `UPDATE nscf_embajadoras SET salon_id='vizos' WHERE id='yts-nm-diana'`. Histórico de comisiones **intacto** (cada fila conserva su `salon_id='yts-nm'` real). El maestro mira al futuro (vizos).
- **Regla nueva (reporte):** agrupar comisiones por `ambassador_id` (identidad), NO por `salon_id`. Mostrar salón actual del maestro en summary, salón histórico en detalle.
- **Deuda anotada:** el `id` sigue siendo `yts-nm-diana` aunque trabaje en vizos (cosmético). Rediseño futuro: tabla `nscf_embajadora_salon` (embajadora_id, salon_id, desde, hasta) para modelar movimientos sin perder rastro. Hacer cuando el volumen de movimientos lo pida.

### BLOQUE B — NSCF-Console Fase 3, Capas 1+2 (DESPLEGADO Y VERIFICADO EN VIVO)

#### Modelo de roles (confirmado por Sam)
- **2 roles, hash por persona, sin tabla de usuarios** (config en secret). ADMIN = Patricia (Sam usa su login cuando hace falta). OPS = Laura + Diana.
- ADMIN: único que aprueba salones; ve todo. OPS: NO aprueba salones; ve comisiones (+ inventario futuro). Vista de ambassadors muestra TODAS las embajadoras para ambos roles (el rol habilita el acceso, no recorta filas).
- **Regla dura preservada:** funciones sensibles (aprobar, B2B, inventario) NUNCA detrás del PIN del kiosko. Consola = password fuerte. PIN = solo POS del kiosko.

#### EF `nscf-b2b-approve` v1 → v5 (desplegada a prod, verify_jwt=false)
- `loadUsers()` lee secret **`NSCF_CONSOLE_USERS`** (JSON: sub/role/hash por persona). Fallback a `PO_CONSOLE_PASSWORD_HASH` SOLO si el secret no está (deploy sin outage). **Sin centinela** (Sam pegó el hash real de Patricia en el JSON; enfoque de centinela descartado por seguridad). Filtro: descarta entradas con hash que no empiece por `$2`. Rechazo de password vacío ANTES de `compareSync` (doble cinturón).
- `issueToken(sub, role)` — el claim `role` (que Fase 2 dejó plantado siempre = 'po') ahora se decide en login.
- Matriz `PERMISSIONS` **fail-closed**: salones=['admin']; `ambassadors_report`=['admin','ops']. Guarda por acción → 403 si el rol no aplica.
- Acción nueva **`ambassadors_report`** (read-only): cruce `nscf_commissions` × `nscf_embajadoras` × Shopify B2C (vía RPC `get_shopify_store`). 4 clases de discrepancia: `commission_on_cancelled`, `orphan_ambassador`, `sale_without_commission`, `amount_mismatch`. Degradación elegante si Shopify falla (devuelve resumen Supabase con `shopify_checked:false`).
- Tokens viejos Fase 2 (`role:'po'`) → mapeados a admin (no rompe sesiones).

#### Secret `NSCF_CONSOLE_USERS` — cargado por Sam (Supabase EF secrets, NO en repo)
- Patricia (admin, hash real) + Laura `ops@neuronescflorida.com` (ops) + Diana `dianaespinosa_8709@icloud.com` (ops). Hashes Diana/Laura generados por CC (bcrypt cost 10, prefijo `$2b$` — compatible con `$2a$` de Patricia vía compareSync).

#### Front `nscf-console/src/App.jsx`
- Login pasa `role`; routing por rol (admin ve Salones+Comisiones; ops solo Comisiones). NavBar+Workspace. `AmbassadorsScreen` nueva (resumen + banner de discrepancias en rojo, read-only). ListScreen `embedded`. Textos de login neutros ("Console · Uso interno").
- Botón "Enviarme el reporte" (Resend) presente pero **stubbeado/deshabilitado** hasta Capa 3.

#### Verificación E2E en vivo (HRD-style, pasó completa)
login Diana/Laura → 200 ops ✅ · password vacío → 400 ✅ · password incorrecto → 401 ✅ · ops→approve forzado → **403** ✅ · `ambassadors_report` (ops) → 200 ✅ · token viejo → admin ✅. **Login de Patricia probado por Sam → entra como admin, ve Salones+Comisiones ✅.** Las 3 usuarias probadas en la consola live.

#### Capas pendientes (ver "RETOMAR"): 3 (Resend), 4 (inventario), 5 (cron). Capa 6 (salones gated a admin) = resuelta gratis por la matriz.

### BLOQUE C — Infra Vercel: un proyecto por app + botón Console en kiosko

#### Lío de despliegue resuelto (causa raíz: root directory)
- El repo `NeuroneSCF` tiene varias apps en subcarpetas (`kiosko/`, `nscf-console/`, `pro-gateway/`, `nscf-dispatch/`, `supabase/`). **Cada app necesita su propio proyecto Vercel con su Root Directory.**
- El commit de Fase 3 no se veía porque el proyecto que existía apuntaba a la carpeta del kiosko, no a `nscf-console`. Se creó/configuró el proyecto **`nscf-kiosk-console`** (root `nscf-console`, Vite).
- **Duplicado eliminado:** había DOS proyectos sirviendo la consola desde el mismo repo/rama/commit — `neurone-scf` (dominio `console-pro-neuronescf.vercel.app`) y `nscf-kiosk-console`. Sam **borró `neurone-scf`** (sin env vars, nada único que perder; el historial de código vive en GitHub, no en Vercel).
- **Dominio oficial de la consola: `nscf-kiosk-console.vercel.app`** (Sam descartó "console-pro-neuronescf" porque "pro" es engañoso — la consola no es solo de PRO; y porque se abre desde el kiosko).

#### Botón "CONSOLE" en el kiosko (`kiosko/src/App.jsx`)
- Enlace de navegación a `https://nscf-kiosk-console.vercel.app`, **pestaña nueva** (`target="_blank"` + `rel="noreferrer"`).
- Reubicado: de la pantalla de selección de salón → a la pantalla de **selección de embajadora SOLO de Vizos** (`salon.id === 'vizos'`), debajo de Diana/Laura/Patricia. NO aparece en los salones Yodi.
- Estilo: botón sólido **naranja `--nc-orange`** (visible, no el tenue `--nc-dim` inicial). Texto "CONSOLE ↗".
- **Regla dura intacta:** `<a>` puro, pre-PIN (el paso 'ambassador' es anterior al 'pin'), no pasa PIN ni token; la consola pide su password fuerte.

#### Incidente evitado: `.gitignore` faltante en kiosko
- Al validar el build, el clon del kiosko generó `node_modules/` y `dist/` → GitHub Desktop iba a commitear **2.295 archivos**. Sam frenó a tiempo. CC creó `kiosko/.gitignore` (excluye `node_modules/`, `dist/`, etc.) en commit `4ff07df`. Diffs siguientes verificados = 1 archivo.

### Gobernanza (toda la sesión)
- CC preparó archivos en el clon local; **Sam commitea/pushea/mergea por GitHub Desktop.** CC no pushea.
- Deploy de la EF v5 a prod: autorizado explícitamente por Sam, ejecutado por CC vía MCP.
- Escrituras a `nscf_commissions`/`nscf_draft_orders`/`nscf_embajadoras`: verificadas con Sam antes de ejecutar (HRD-style), una a una.

---

## PROFESSOR — LEARNINGS FIJADOS (sesión 7)

1. **CAUSA RAÍZ del kiosko: escritura sin reconciliación.** El kiosko escribe el draft→Supabase UNA vez y nunca vuelve: no propaga cancelaciones de Shopify, no valida `ambassador_id` contra `nscf_embajadoras`, y el paso draft→comisión falla en silencio. Produjo comisiones fantasma sobre canceladas, ventas sin comisión, id corrupto (`vizos-Diana`) y una duplicada. **Sigue vivo — el cron de reconciliación (Capa 5) es el antídoto.** Hasta entonces, se depende de mirar la vista de discrepancias a mano.
2. **Base de comisión = SUBTOTAL de producto (Shopify), sin tax/shipping.** Fuente de verdad. La discrepancia con Supabase era el sales tax.
3. **Corte de embajadora entre salones = punto y seguido.** Cambiar `salon_id` en el maestro; NUNCA tocar el `salon_id` de las comisiones históricas (es su realidad). Agrupar reportes por identidad (`ambassador_id`), no por salón.
4. **Un proyecto Vercel por app, cada uno con su Root Directory.** Un repo monorepo con varias apps en subcarpetas necesita un proyecto Vercel por subcarpeta. Síntoma de root mal apuntado: el commit se sube pero "no se ve" el cambio. "Skip deployments" por carpeta evita builds cruzados.
5. **Trampa `node_modules`/`dist` sin `.gitignore`** al validar builds en clones nuevos. Verificar SIEMPRE el conteo de archivos del diff antes de commitear; debe ser el nº de archivos realmente tocados.
6. **El hash de un secret de Supabase es opaco** (no se puede leer vía MCP). Para JSON de usuarios: Sam pega el hash real al cargar el secret; nada de centinelas con hash vacío (riesgo en `compareSync`).

---

## DEUDA TÉCNICA / PENDIENTES (acumulada)
- [ ] **Capa 5 cron de reconciliación** (s7) — EL importante; tapa la causa raíz.
- [ ] **Capa 3 Resend** `ambassador_report` (s7) — body HTML, a Sam+Patricia+Diana.
- [ ] **Capa 4 inventario Shopify** (s7) — desbloqueada (ambas tiendas con token).
- [ ] **Toggle ojo en password de consola** (s7) — spec dada a CC, en curso.
- [ ] **Rediseño identidad/salón** `nscf_embajadora_salon` (s7) — cuando haya más movimientos; resuelve el `id` cosmético de Diana.
- [ ] **Rate-limit de login de consola** sigue in-memory (endurecer si el volumen lo pide).
- [ ] **Fallback `PO_CONSOLE_PASSWORD_HASH`** = código muerto una vez cargado `NSCF_CONSOLE_USERS`; retirar en limpieza.
- [x] **Resend hardening** (s6): key rotada, secret, v23 versionada, E2E Inbox.
- [x] **Proyecto Vercel consola** (s7): consolidado en `nscf-kiosk-console`, duplicado `neurone-scf` borrado.
- [ ] **Klaviyo key hardcodeada** + verificar keys Resend FPHS (backlog seguridad, s6).
- [ ] **Confirmar URL login passwordless PRO** (s6).
- [ ] **Corregir drift `shopify.stores` VIEW→BASE TABLE** y drift `/api/professor` en fuente de verdad.
- [ ] Config Vercel: "Include files outside root" → OFF en kiosko y dispatch (de s2).
- [ ] **Cutover dominio** `pro.neuronescflorida.com` → landing (de s2).
- [ ] **Política de privacidad B2B** (de s2).
- [ ] **`NeuroneSCF_B2B` sin paleta en Supabase.**
- [ ] **Imágenes de producto Neurone defectuosas** (relacionado poblar product-assets, s5).

---

## NOVEDADES SESIÓN (2026-06-16 sesión 6) — Resend Hardening + nscf-mailer versionada

### COMPLETADO Y VERIFICADO E2E (envío real al Inbox)

#### Resend hardening (deuda #4 de s4 — CERRADA)
- **`nscf-mailer` v21 → v23.** Key Resend hardcodeada (`re_bYa36…`) eliminada del código → ahora lee `const RESEND = Deno.env.get('RESEND_API_KEY')`. Añadida **guarda inerte** al inicio del handler: si falta el secret → 503 `Mailer no configurado: falta RESEND_API_KEY` (patrón de `nscf-b2b-approve`). Resto byte-equivalente (9 message types, todos los templates HTML, constantes). Limpiado el `// TODO Sam` de `PRO_LOGIN`. Catch final ya no loguea "v19" → neutro `nscf-mailer error`.
- **`nscf-mailer` por fin VERSIONADA en GitHub** (`NeuroneSCF/supabase/functions/nscf-mailer/index.ts`). Antes era deploy-only justamente por la key hardcodeada; cerrada la deuda de raíz.
- **Rotación de key:** nueva key `nscf-mailer-prod` en Resend (token `re_UFmLRB9r…`) → cargada en secret `RESEND_API_KEY` de Supabase (sobrescribió el valor; el secret estaba huérfano). Key vieja `re_bYa36…` **revocada/eliminada** en Resend.
- **Deploy v23 hecho por Claude** vía MCP `deploy_edge_function` (verify_jwt=false). Verificado: lee env ✅, key vieja ausente ✅, guarda presente ✅.
- **Prueba E2E:** envío `b2b_approved` a `sam@unrealvillestudio.com` → **llegó al Inbox** (no spam), desde `noreply@neuronescflorida.com`, template correcto. Cadena completa confirmada: código → secret → Resend → dominio verificado → entrega.

#### Decisión de scope
- **Fase 2.5 (creación automática de customer Shopify) PARQUEADA** — el volumen no la amerita; se sigue manual (bloque copia-pega de PO) hasta que el volumen lo justifique, si llega. El `// TODO FASE-2.5 [write_customers]` queda en código como marcador.

### INCIDENTE OPERATIVO (resuelto, con lección)
- Sam revocó la key vieja **antes** de que la EF nueva estuviera desplegada → el mailer quedó **caído unos minutos** (la v22 activa aún usaba la key hardcodeada que ya no existía). Se resolvió desplegando v23 de inmediato. **Lección fijada (Professor): el push a GitHub NO despliega la EF a Supabase — son acciones separadas. Orden seguro de rotación: generar nueva → cargar secret → deploy EF → PROBAR → recién entonces revocar la vieja.**

### ACLARACIÓN DE ARQUITECTURA (registrada)
- **Dos secrets `RESEND_API_KEY` homónimos pero independientes:**
  - **Vercel / `forumphs-com`** → lo lee `api/contact.js` (CTA de contacto de forumphs.com, `from: noreply@forumphs.com` → `info@forumphs.com`). **Intocable; no se tocó.**
  - **Supabase `amlvyycfepwhiindxgzw`** → lo lee `nscf-mailer`. Es el que se actualizó.
  - Mismo nombre de env var, **keys físicas de Resend distintas.** Documentar para no volver a confundirlas.
- **`fphs-session`** usa una variable **distinta**: `FPHS_RESEND_API_KEY` (`from: speaks@forumphs.com`), apunta al proyecto Supabase propio de FPHS para datos. No toca `RESEND_API_KEY`.
- **Arquitectura FPHS confirmada:** FPHS tiene DB propia (datos sensibles de propietarios) pero **apps/EFs/secrets viven en infra UNRLVL** (Supabase `amlvyycfepwhiindxgzw`). Por eso se ven EFs/secrets `fphs-*` y `forumphs_*` en el proyecto de UNRLVL.
- **Punto único de envío NSCF:** `nscf-mailer` es el ÚNICO que envía vía Resend directo. `nscf-b2b-approve`, `nscf-b2b-register`, `nscf-fulfillment-watcher`/`-processor` **delegan** en él (fetch a `functions/v1/nscf-mailer`).

### DEUDAS NUEVAS DETECTADAS (no resueltas — backlog seguridad)
- [ ] **Klaviyo key hardcodeada** (`pk_UNF8Ee…`) en `klaviyo-setup` y probablemente las otras `klaviyo-*`. Mismo patrón de hardening pendiente (aplicar lección: deploy antes de revocar). Klaviyo usa su propia API (no Resend).
- [ ] **Verificar exposición** de `FPHS_RESEND_API_KEY` y de la key Vercel/forumphs-com — confirmar que ninguna esté en claro en repos/logs. Va con sesión ForumPHs.

---

## NOVEDADES SESIÓN (2026-06-13 sesión 5) — Skill NSCF-PRICING + hallazgo de assets

### COMPLETADO

#### Skill NSCF-PRICING v1 (nuevo)
- Archivos: `skills/nscf-pricing/SKILL.md` + `nscf_pricing.py` (motor) + calculadora `.xlsx`. Registrado en `skills/INDEX.md` **v1.5**.
- **Naturaleza:** lógica pura de pricing. NO renderiza — delega output HTML a `ui-ux-layer` (multimarca de UNRLVL) con brand_id NeuroneSCF_B2B. NSCF-PRICING es exclusivo NSCF (de ahí el nombre); cuidar de NO meter nada de NSCF dentro de ui-ux-layer.
- **Fórmulas verificadas contra el xlsx:** B2C = compra×1.20 + LOG+TR+MK+OP (overhead $23.5951) · B2B = compra×1.20 + TR+OP (overhead $2.5987) · MÍN /0.6 (40%) · DES /0.5 (50%) · ÓPT /0.4 (60%).
- **Columna O = precio de lista PO+Sam. Ancla intocable.**
- **Caso central:** productos B2C (400ml, kits) → kits B2B. Recalcular con overhead B2B (9× menor), NUNCA descontar sobre PVP B2C.
- **Custom Kits = 3 vistas:** suma de ítems @ margen · margen de kit completo · descuento sobre PVP (estilo Alizzanti).
- Fuente de precios: xlsx que Sam sube por sesión (no vive en repo). Versión vigente: **v18**.

#### Re-write v17→v18 del xlsx de pricing (autorizado por Sam)
- Col O: 17 tonos tinte $8.99→$9.99; Alizzanti $74.99→$99.99. 1492 fórmulas recalc, 0 errores. Costos/márgenes intactos (col O no alimenta fórmulas).
- Efecto: tinte $9.99 ya supera su MÍN ($8.51); Alizzanti $99.99 ≈ 55% margen real.

#### Pedido Orlando (PO) — prueba del motor
- 10 tintes + 3 peróxidos (vol 10/20/30) + Humit Mask + Green 100 + Dyfensor SF + Hyaloneurine + Humit Shampoo.
- Costo real $131.90 · DESEADO (50%) $263.80 · ÓPTIMO (60%) $329.75.
- Cliente estratégico: candidato a distribuidor/educador en Orlando con pared exclusiva Neurone.

### HALLAZGO CRÍTICO — por qué ui-ux-layer nunca trajo imágenes (RESUELTO)
- Bucket Supabase `product-assets` y tabla `brand_assets`: **VACÍOS**. (brand_palette NSCF: 11 OK; product_blueprints: 51 productos, 39 con image_filename, + kit_components/kit_value/kit_savings.)
- El proxy `/api/gh?action=file` **NO sirve para imágenes** (base64 en JSON → timeout en binarios). Solo texto.
- **Vía correcta (verificada E2E, multimarca):** `raw.githubusercontent.com/unrealvillestudio-hub/blueprints/main/brands/<Marca>/assets/products/<archivo>`. Probado: imagen real de Neurone Color incrustada en output sin subirla a mano.
- Imágenes fuente en repo `blueprints`: `brands/NeuroneSCF/assets/products/` (~40 light + `dark_versions/` + `alpha_dark/` 6 + logos en `assets/brand/NeuroneSCF/`).

### FLAG ANALÍTICO ESTRUCTURAL (decisión pendiente)
Overhead B2B fijo ($2.60/ud) aplasta productos de bajo costo (tinte, peróxido). Opción: prorratear overhead por valor en vez de fijo.

### DEUDA s5
- [ ] Subir skill nscf-pricing al repo + INDEX v1.5 (Sam, GitHub Desktop).
- [ ] Poblar product-assets (brief CC).
- [ ] Completar ui-ux-layer patrón raw multimarca (Sam+Claude).
- [ ] Custom Kit Orlando de prueba.

---

## NOVEDADES ESTA SESIÓN (2026-06-13 sesión 4) — NSCF-Console Fase 2: Módulo de Aprobación de PO

### COMPLETADO Y VERIFICADO EN VIVO (E2E 10/10)

#### Qué se entregó
- **EF nueva `nscf-b2b-approve` v1** (verify_jwt=false, auth propia): acciones `login` / `list_pending` / `get_license_url` / `approve` / `reject` / `needs_info` / `assisted_register`. Inerte hasta cargar secrets (responde 503 sin ellos). Replica patrón de `nscf-b2b-register` (CORS, service_role, helpers, fetch a `nscf-mailer`). Auth = bcryptjs@2.4.3 compareSync + djwt HS256, sesión 8h.
- **`nscf-mailer` v18 → v19** (deploy-only, NO versionada por key Resend hardcodeada): +3 types bilingües `b2b_approved` / `b2b_rejected` / `b2b_needs_info` con `notes` escapado (HTML). Verificado **byte-idéntico** a v18 (CC trajo el código desplegado de vuelta y comparó: acentos, emoji y los 6 templates previos intactos) → sin regresión en emails B2C/embajadoras/despacho.
- **Frontend `nscf-console/`** (nuevo subdir en repo NeuroneSCF, Vite+React espejo de `pro-gateway`): login PO, lista de pendientes, "Ver licencia" (signed URL fresca ≤300s), aprobar con confirmación + **bloque copia-pega** (email/nombre/teléfono/tag `salon-aprobado` + enlace a Customers→Add de la tienda PRO), rechazar/pedir info con `notes`, registro asistido. Build `vite build` → `dist/` OK. **Sin env vars** (endpoint EF hardcodeado en `App.jsx:5`, a propósito: toda la auth es server-side).
- **Migración** `supabase/migrations/20260613140000_nscf_b2b_pending_index.sql` — índice parcial propuesto.

#### Decisiones de diseño (DEFINITIVAS)
- **Fase 2 sin Shopify automático.** El token actual (app `UNRLVL Auditor`) solo tiene `read_customers`, no `write_customers`. La creación del customer en Shopify PRO la hace **PO a mano**, asistida por el bloque copia-pega. Punto de inserción del automático marcado en código `// TODO FASE-2.5 [write_customers]`.
- **La Console solo consulta `status=pending`.** No lee histórico. Tras aprobar, la fila desaparece de la vista (se conserva en DB + bucket como respaldo de due diligence, NO se borra). Superficie de datos mínima — riesgo de exposición controlado (los datos los provee el propio cliente con consentimiento, para revisión).
- **Datos del customer = los del registro** (ya en `nscf_b2b_salones` desde Fase 1). Sin segundo formulario.
- **Auth de PO:** password fuerte hasheado server-side (no el PIN del kiosko). Diseñado para evolucionar a roles en Fase 3 sin reescribir. Secrets: `PO_CONSOLE_PASSWORD_HASH` + `PO_CONSOLE_JWT_SECRET` (cargados por Sam).
- **Verificación humana obligatoria:** aprobar exige que PO abra el doc de licencia primero. Es el único control real del sistema B2B.

#### DB — aplicado vía MCP esta sesión (autorizado por Sam)
- `CREATE POLICY "service_only"` sobre `nscf_b2b_salones` (FOR ALL, `auth.role()='service_role'` en USING+CHECK). Hace explícito lo que era implícito (RLS on + 0 policies) → elimina el WARN `rls_enabled_no_policy`. Comportamiento idéntico (anon ya bloqueado).
- `CREATE INDEX idx_nscf_b2b_salones_pending` (parcial: `created_at DESC WHERE status='pending'`).
- Verificado: columnas Fase 2 ya existían, CHECK con los 4 status OK, GRANTs service_role OK (del fix de Fase 1).

#### Verificación E2E (10/10 en vivo)
login ✅ · list_pending+signed URL ✅ · approve ✅ · reject ✅ · needs_info ✅ · registro asistido ✅ · re-aprobar resuelta → 409 sin doble email ✅ · kiosko B2C intacto ✅ · anon NO lee la tabla (401 permission denied) ✅ · advisors sin nuevos críticos ✅. Los 3 emails recibidos por Sam con enlaces funcionando ✅. Datos de prueba limpiados (tabla en 0; 4 carpetas PNG huérfanas del bucket borradas por Sam).

#### Gobernanza
- **PR #3** (rama feat → main): **mergeado por Sam** (GitHub Desktop). Worktree de sesión `blissful-agnesi-20e2cf` se limpia al cerrar PR.
- Hash bcrypt de PO generado por CC con misma lib que la EF, self-test ✅, devuelto sin persistir.

### PATRÓN ACEPTADO — CC preview/live (registrado en Professor)
CC desplegó las EFs al proyecto Supabase **vivo** (no rama aislada), razonando que son inertes hasta cargar secrets y señalándolo conscientemente. 2ª ocurrencia; ambas resueltas y no negligentes. **Sam lo acepta como modo de trabajo válido de CC** mientras sea consciente y solutivo. No es bug.

### DRIFTS DETECTADOS (registrados en Professor, pendientes de corregir en fuente de verdad)
- `shopify.stores` documentado como VIEW en un learning previo; al 2026-06-13 es **BASE TABLE**.
- `HRD_PROFESSOR` marca `/api/professor` como "PENDIENTE DE CONSTRUIR" pero el proxy **ya existe y responde** (action=checkpoint → 200). El learning del ecosystem que decía que el proxy no existía quedó obsoleto.

---

## NOVEDADES SESIÓN ANTERIOR (2026-06-13 sesión 3) — Sales Pager Salones v18: cierre y entrega

### COMPLETADO — One-pager B2B salones (el "pendiente" de sesión 2, RESUELTO)

#### Entregables
- **`NSCF_SalesPager_Salones.html` (v18)** — pager completo, todas las imágenes reales incrustadas (base64, archivo autónomo): hero, Packs de tinte 24/36, sección Solo Color, sección Alizzanti (Dúo/Trío), grid "Tú eliges", CTA WhatsApp, footer.
- **`NSCF_SalesPager_Alizzanti_general.html`** — versión derivada solo-Alizzanti. Queda como pieza independiente por si PO la quiere para presentar a otros salones (ej. Johanna).

#### Framework de venta de salón (DEFINITIVO — referencia permanente)
- El salón vende el **SERVICIO** con producto incluido; **NO revende producto**.
- Matiz: 400ml a veces SÍ se revenden retail; 1L es uso en cabina. En el pager los 400ml van solo listados.
- **Único producto con pitch = Alizzanti** (facturación por servicio). Tinte/shampoo/mask solo se listan.

#### Pricing (confirmado)
- **Kits tinte:** Pack 24 ~~$340~~→$289 + 2 peróxidos GRATIS; Pack 36 ~~$460~~→$395 + 3 peróxidos GRATIS.
- **Kits Alizzanti (Opción B):** Dúo ~~$310~~→$259 (+Shine $289); Trío ~~$640~~→$545 (+Shine $589). Márgenes 59–61%.
- **Dato campo PO:** 1 botella Alizzanti ≈ 5 alisados; cobra $200–350/servicio → factura $1,000–1,750/botella.

#### Cambios de copy y assets
- Voz neutra: "elevá"→"eleva". "sin costo"→"GRATIS"; "a precio especial"→"con la promoción de este mes"; "el peróxido va incluido"→"Peróxido GRATIS".
- Shampoos/masks con "400 ml"; eliminado "1 L"/"1 Litro" de shampoo/mask. Conservados: tinte 90ml, peróxido 2/3 L, Alizzanti 1 L.
- **CTA → WhatsApp** `wa.me/13057489101` con mensaje pre-cargado; email respaldo. `mailto:` descartado (frágil).
- Footer: eliminados menús Catálogo e Información; solo Contacto.
- **Icon PRO transparente:** flateado a JPEG fondo negro → recuperado con flood-fill desde bordes + PNG RGBA.

---

## NOVEDADES SESIÓN (2026-06-12 sesión 2) — NSCF PRO Fase 1: Registro de Salones B2B

### COMPLETADO Y EN PRODUCCIÓN
- **Gate total** del portal PRO; registro = declaración voluntaria; aprobación manual de PO.
- **Tabla `nscf_b2b_salones`** (B2B pura, separada de `nscf_salones`). RLS service_role.
- **Bucket privado `nscf-licenses`** (public=false). Los buckets product-assets y unrlvl-media son PÚBLICOS — licencias NO van ahí.
- **EF `nscf-b2b-register` v3** + **`nscf-mailer` v18** (type `b2b_registration_received`).
- **Landing `pro-gateway/`** (React+Vite). Paleta B2B (near-black + gold #C9A227 + terracota).
- PR #2 MERGEADO (sesión 4).

### BUG RESUELTO — 500 (GRANT faltante, NO el código)
- `code 42501 permission denied` — service_role sin GRANT sobre tabla nueva. RLS sin policies bloquea anon pero NO concede service_role. **Toda tabla NSCF nueva con RLS necesita GRANT explícito a service_role.**

---

## NOVEDADES SESIÓN (2026-06-12 sesión 1) — Kiosk: Cobro en Efectivo + Sales Pager

### COMPLETADO
#### Kiosk — cobro EFECTIVO (referencia permanente)
- **EFECTIVO** → modal confirmación → EF completa draft como Paid (`paymentPending:false`), tags `efectivo,cash,kiosko`. NO genera QR.
- **TARJETA/DIGITAL** → draft + `invoice_url` → QR.
- EF `nscf-kiosko-draft` v10→v13 (payment_method, fix race "calculating", fix `.catch`). PR #1 mergeado.

---

## MODELO DE FULFILLMENT NSCF (referencia permanente)
**Flujo 100% automático. Sam NO marca fulfilled manualmente.**
1. Cliente paga → webhook `orders/paid` (`nscf-fulfillment-watcher`) encola delay 1h.
2. Pasada 1h → `nscf-fulfillment-processor` (cron 1min) → fila en `nscf_fulfillment_log` + avisa a Iván.
3. Iván (portal `nscf-fulfillment-portal`): confirma + carrier + tracking.
4. Tracking → 4 notificaciones + crea fulfillment en Shopify.
- Kiosk Pickup (`source='kiosko'`) NO entra — va por comisión embajadora.

---

## DECISIONES ARCHIVADAS (previas)
- Cron pg_cron: nunca `current_setting()` sin verificar; preferir URL hardcodeada.
- QR NSCF dorado de marca = #AD9614.
- SMA `/api/export`: secret por header `x-export-secret`.
- Pricing v17 (2026-05-30): shampoos $28.99, peróxidos $13.99-15.99, masks $34.99-39.99, Dyfensor SF $33.99.
- Peróxido no se vende standalone — solo en kits/promos.
- Marketing B2B = $0 ads en fase lanzamiento presencial.

---
_Unrealville · NeuroneSCF · 2026-06-16 sesión 7_
