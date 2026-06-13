# SESSION LOG — NeuroneSCF B2B
_Actualizado: 2026-06-13 (sesión 4)_

---

## ⏸️ RETOMAR EN PRÓXIMO CHAT (prioridad)

Orden sugerido (ver razonamiento en novedades sesión 4):
1. **Resend hardening** (corto, seguridad) — mover key Resend de hardcoded a secret `RESEND_API_KEY` en Supabase + **rotar la key** + versionar `nscf-mailer` en el repo (hoy es deploy-only sin trazabilidad git). No depende de nada. Hacer antes de Fase 3.
2. **Sesión Shopify infra** — app dedicada de commerce (`UNRLVL Commerce` o similar) con `write_customers`/`write_draft_orders`/`write_orders` + decidir cómo `shopify.stores` maneja múltiples tokens por tienda (hoy: 1 token por (brand_id, store_type)). Desbloquea Fase 2.5 (automatizar creación del customer al aprobar). NO mezclar con sprint de producto.
3. **NSCF-Console Fase 3** — elevar a superuser console: roles por nivel de auth (embajadora PIN = B2C sin cambios; PO/superuser login fuerte = aprobaciones + vista B2B + inventarios de ambas tiendas vía Shopify MCP/API). Funciones sensibles NUNCA tras el PIN. NO depende de Shopify infra (puede ir antes), pero la automatización del customer (Fase 2.5) sí.

**Pendiente manual inmediato (cierre Fase 2):** ~~crear el proyecto Vercel de `nscf-console`~~ HECHO — deploy LIVE `console-pro-neuronescf.vercel.app` (root `nscf-console`, Vite, sin env vars), probado OK. Mergear PR #3 (HECHO). Borrar PNGs huérfanos del bucket (HECHO). **Fase 2 100% completa y en producción.**

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

## DEUDA TÉCNICA / PENDIENTES (acumulada)
- [ ] **Resend hardening** (ver prioridad 1 arriba): key → secret + rotación + versionar `nscf-mailer`.
- [x] **Proyecto Vercel `nscf-console`** — HECHO, LIVE en `console-pro-neuronescf.vercel.app` (root `nscf-console`, Vite, sin env vars).
- [ ] **Confirmar URL real de login passwordless PRO** — el mailer usa `nj5ybc-n1.myshopify.com/account` por defecto; Sam confirmó que la URL funciona.
- [ ] **Corregir drift `shopify.stores` VIEW→BASE TABLE** y drift `/api/professor` en fuente de verdad (ecosystem learnings / HRD_PROTOCOL).
- [ ] Config Vercel Parte C: "Include files outside root" → OFF en kiosko y dispatch (de s2).
- [ ] **Cutover de dominio** `pro.neuronescflorida.com` → landing (de s2).
- [ ] **Política de privacidad B2B** — `PRIVACY_URL` apunta a la de B2C; crear la B2B (de s2).
- [ ] **`NeuroneSCF_B2B` sin paleta en Supabase** (de sesiones previas).
- [ ] **Imágenes de producto Neurone defectuosas** (de sesiones previas).

---

## NOVEDADES SESIÓN ANTERIOR (2026-06-13 sesión 3) — Sales Pager Salones v18: cierre y entrega

### COMPLETADO — One-pager B2B salones (el "pendiente" de sesión 2, RESUELTO)

#### Entregables
- **`NSCF_SalesPager_Salones.html` (v18)** — pager completo, todas las imágenes reales incrustadas (base64, archivo autónomo): hero, Packs de tinte 24/36, sección Solo Color, sección Alizzanti (Dúo/Trío), grid "Tú eliges", CTA WhatsApp, footer.
- **`NSCF_SalesPager_Alizzanti_general.html`** — versión derivada solo-Alizzanti (hero "Lanza tu promo de alisado", sin tintes/peróxidos/cartilla). NOTA: resultó redundante — los kits Alizzanti del pager completo ya estaban separados de tintes y peróxidos desde el inicio (ver learning 6). Queda como pieza independiente por si PO la quiere para presentar a otros salones (ej. Johanna).

#### Framework de venta de salón (DEFINITIVO — referencia permanente)
- El salón vende el **SERVICIO** (color, alisado, tratamiento) con producto incluido en la aplicación; **NO revende producto**.
- Matiz: presentaciones **400ml** a veces SÍ se revenden al cliente final (retail); las **1L** son uso en cabina. En este pager los 400ml van solo listados, sin pitch.
- **Único producto con argumento de venta = Alizzanti** (facturación por servicio). Tinte/shampoo/mask solo se listan.
- Decisión Sam: NO mencionar formato 1L de shampoo/mask (no hay en inventario), NO decir "quiero que lo pruebes" (lo hace PO en persona), NO llamar "insumo de cabina" al shampoo/mask (lo decide cada salón).

#### Pricing (confirmado)
- **Kits tinte:** Pack 24 ~~$340~~→$289 + 2 peróxidos GRATIS (ahorro $73, margen 47.8%); Pack 36 ~~$460~~→$395 + 3 peróxidos GRATIS (ahorro $98, margen 44.7%). Redondeo hacia arriba a número limpio.
- **Kits Alizzanti (Opción B — anchor B2B ~$74.99/Alizzanti, NO sobre PVP $99.99):** Dúo ~~$310~~→$259 (+Shine $289); Trío ~~$640~~→$545 (+Shine $589). Márgenes 59–61%. Opción A (anchor PVP) RECHAZADA por thin/alta para B2B.
- **Dato campo PO:** 1 botella Alizzanti ≈ 5 alisados; salón cobra $200–350/servicio → factura $1,000–1,750/botella. Pager usa piso conservador ($200 → "$1,000+").

#### Cambios de copy y assets aplicados
- Voz neutra (ES/EN internacional): eliminado voseo "elevá"→"eleva".
- "sin costo"→"GRATIS" (x4); "a precio especial"→"con la promoción de este mes"; "el peróxido va incluido"→"Peróxido GRATIS".
- Shampoos/masks con "400 ml" (solo el formato); eliminado todo "1 L"/"1 Litro" de shampoo/mask (no hay en inventario). Conservados: tinte 90ml, peróxido 2/3 L, Alizzanti 1 L.
- **CTA → WhatsApp** `wa.me/13057489101` (PO +1 305 748-9101) con mensaje pre-cargado; email `hello-pro@neuronescflorida.com` como respaldo. `mailto:` descartado (frágil, ver learning 4).
- Footer: eliminados menús "Catálogo" e "Información"; conservado solo "Contacto" (email).
- Imágenes incrustadas: Alizzanti (NEALIZZ-2), tinte caja azul (NCOLOR), peróxidos (NCNEU-6), Resplander Shine (NERESPSH, en add-on), icon PRO en cartilla + favicon.
- **Icon PRO transparente:** subió flateado a JPEG con fondo negro; recuperado con flood-fill desde bordes (preserva la N negra interior) + recorte bbox + PNG RGBA (ver learning 5).

---

## NOVEDADES SESIÓN (2026-06-12 sesión 2) — NSCF PRO Fase 1: Registro de Salones B2B

### COMPLETADO Y EN PRODUCCIÓN

#### Estrategia del gate (plan de PO, validado)
- **Gate total** del portal PRO: visitante ve preview de marca **sin precios** + banner casi pantalla-completa "Sitio exclusivo para profesionales / ¿Eres profesional? Regístrate". Nota "hasta 24 horas" para aprobación.
- El gate total **elimina el problema de bloqueo de pasarela de pago** — Shopify queda simple, solo entran customers ya aprobados. Login passwordless (New Customer Accounts ya activo en tienda PRO).
- Registro = **declaración voluntaria**: el usuario declara datos reales + autoriza verificación; Sam/NSCF no son autoridad. Esfuerzo real de PO = leer el documento adjunto y ver si parece una licencia legítima.
- **Campos requeridos:** email, móvil, nº de licencia, upload del documento de licencia, dirección física. **NO se pide Tax ID.**
- 2 checkboxes obligatorios: (1) declaración jurada de veracidad + autorización a verificar; (2) consentimiento de tratamiento de datos (link a política de privacidad).
- **Aprobación manual de PO** al inicio (Fase 2). Automatización de verificación documental = futuro, solo si el volumen lo pide.

#### Arquitectura (Opción A — landing custom, NO la tienda Shopify directa)
- `pro.neuronescflorida.com` será una **landing propia** (Vercel), no la tienda. "Acceder" → login passwordless real de Shopify PRO (`https://shopify.com/73329803342/account`). Registro → form custom → Supabase.
- **Tabla `nscf_b2b_salones`** (NUEVA, B2B pura, SEPARADA de `nscf_salones` que es B2C/embajadoras/kiosko/comisiones). Cols: id (`b2bsalon_*`), salon_name, contact_email, mobile, license_number, license_doc_path, physical_address, status (pending/approved/rejected/needs_info), declaration_accepted+_at, data_consent_accepted+_at, linked_salon_id (FK→nscf_salones, para Fase 2), shopify_customer_id, reviewed_at/_by, notes, created_at. RLS habilitado (solo service_role). Índices status+email.
- **Bucket privado `nscf-licenses`** (`public=false`, 10MB, jpg/png/pdf). Uploads server-side con service role; acceso futuro vía signed URL. **Los buckets existentes (product-assets, unrlvl-media) son PÚBLICOS — las licencias NO van ahí.**
- **EF `nscf-b2b-register` v3** (verify_jwt=false): valida campos + ambos checkboxes; honeypot anti-bot (`company_website`); rate-limit 3/email; sube licencia a `licenses/<id>/<file>`; INSERT `pending` sellando consentimientos con `now()`; dispara email vía `nscf-mailer`.
- **EF `nscf-mailer` v18** (deploy-only, no versionada por Resend key): nuevo type `b2b_registration_received` (confirmación bilingüe ES/EN al solicitante + aviso a ops/PO).
- **Landing `pro-gateway/`** (React+Vite, repo NeuroneSCF): 3 pantallas (gateway / formulario / confirmación). Paleta B2B real (near-black + gold #C9A227 + terracota). Logo blanco-alpha con swirl terracota. Sin env vars (todo hardcodeado: API_REGISTER, SHOPIFY_LOGIN, PRIVACY_URL).

#### Verificado E2E (Preview)
Registro real "BlackOut Salon" → "Solicitud recibida" + email bilingüe recibido → fila `pending` con consentimientos sellados + doc en bucket privado (`licenses/b2bsalon_*/...`). Datos de prueba limpiados.

#### Gobernanza
- PR #2 (`worktree-nscf-pro-gateway` → main): **MERGEADO** (Sam confirmó en sesión 4). 3 commits (86cde2f, dfab9a4, 6fe9952).

### BUG RESUELTO — 500 en el registro (causa: GRANT faltante, NO el código)
- Síntoma: form devolvía 500, tabla vacía, INSERT manual funcionaba.
- **Causa real: `code 42501 permission denied for table nscf_b2b_salones`** — `service_role` sin GRANT sobre la tabla nueva. (RLS sin policies bloquea anon pero NO concede service_role.)
- Fix: `GRANT SELECT, INSERT, UPDATE, DELETE ON public.nscf_b2b_salones TO service_role` — aplicado + versionado en migración separada. EF restaurada a v3.
- **REINCIDENTE:** ya pasó en el kiosko. Toda tabla NSCF nueva con RLS necesita GRANT explícito a service_role. → Professor (rel 5).

### Config Vercel (drift de routing — parcialmente resuelto)
- Creado proyecto `nscf-pro-gateway` (root `pro-gateway`, Vite, sin env vars). Production Branch fijada a `main`. "Include files outside root" → OFF.
- **PENDIENTE manual de Sam (no bloquea merge):** en `nscf-kiosko` y `nscf-dispatch` → apagar "Include files outside the root directory" (siguen ON → rebuildean PRs ajenos). "Skip deployments" ya activado en ambos.

---

## DEUDA TÉCNICA / PENDIENTES (2026-06-12 s2 — histórico, ver lista acumulada arriba)
- [x] **Mergear PR #2** a main — HECHO (sesión 4).
- [ ] Config Vercel Parte C: "Include files outside root" → OFF en kiosko y dispatch.
- [ ] **Cutover de dominio** `pro.neuronescflorida.com` → apuntar a la landing.
- [ ] **Política de privacidad B2B.**
- [x] Objetos de prueba huérfanos en bucket `nscf-licenses` — borrados (sesión 4).
- [ ] Avisar a PO: ignorar emails de prueba B2B.
- [ ] **`NeuroneSCF_B2B` sin paleta en Supabase.**
- [ ] **Imágenes de producto Neurone defectuosas.**

---

## NOVEDADES SESIÓN (2026-06-12 sesión 1) — Kiosk: Cobro en Efectivo + Sales Pager

### COMPLETADO

#### Kiosk — Camino de cobro en EFECTIVO (Opción 2: confirmación + spinner)
**Dos caminos de cobro (referencia permanente):**
- **EFECTIVO** → embajadora toca "Cobrar en efectivo" → modal "¿Recibiste el pago en efectivo? $XX" → la EF completa el draft order como **Paid** vía `draftOrderComplete(paymentPending:false)`. **NO genera QR.** El efectivo lo cierra la embajadora presencialmente; nunca toca el checkout web público.
- **TARJETA / DIGITAL** → "Crear checkout QR" → EF crea draft + `invoice_url` → **QR** → clienta paga desde su móvil.

**EF `nscf-kiosko-draft` v10 → v13:**
- v11: campo `payment_method` (default `"qr"`, backward-compatible). Path cash completa draft + tags `efectivo,cash,kiosko` + nota de atribución + `display_name` en SELECT.
- v12: fix race condition `"This order has not finished calculating"` — retry backoff 1500ms ×3, reintenta solo si message incluye `"calculat"`.
- v13: fix `.catch is not a function` — query builder supabase-js no es Promise; `await` + `{ error }`. Update a DB best-effort, nunca bloquea la respuesta de éxito.

**Front `kiosko/src/App.jsx`:** botón "Cobrar en efectivo" + modal confirmación + spinner "Procesando pago…" + nueva `PaidScreen`. Descuento two-tier (hasta 40% Patricia/Vizos) aplica igual en cash.

**Verificado E2E:** orden #1027 Paid, tags + nota correctos. PR #1 mergeado. Órdenes de prueba canceladas.
**Deuda cerrada:** EF `nscf-kiosko-draft` ahora versionada en `NeuroneSCF/supabase/functions/`.

#### Sales Pager Salones (venta directa PO)
- One-pager comercial: Pack Completo (3) $289/$389 + Solo Color (1B) $240/$360, peróxido gratis + cartilla 1ª compra como "GRAN NOTICIA". Shampoo+mask a elegir. Paleta B2B real. Footer pro + CTA → `hello-pro@neuronescflorida.com`. File: `NSCF_SalesPager_Salones.html`

---

## MODELO DE FULFILLMENT NSCF (referencia permanente)
**Flujo 100% automático. Sam NO marca fulfilled manualmente.**
1. Cliente web paga → webhook `orders/paid` (`nscf-fulfillment-watcher`) encola con delay 1h.
2. Pasada 1h → `nscf-fulfillment-processor` (cron 1min) toma cola, crea fila en `nscf_fulfillment_log` + avisa a Iván vía `nscf-mailer`.
3. Iván (portal `nscf-fulfillment-portal`): confirma recibido + carrier + tracking.
4. Al meter tracking → 4 notificaciones (Iván/Ops/PO/cliente) + crea fulfillment en Shopify.
- Kiosk Pickup (`source='kiosko'`) NO entra a este flujo — va por comisión embajadora.

---

## DECISIONES ARCHIVADAS (previas)
- Cron pg_cron: nunca `current_setting()` sin verificar; preferir URL hardcodeada. (Fix crítico job 31 fulfillment-processor — 2026-06-06.)
- QR NSCF dorado de marca = #AD9614. Verificar escaneo con cv2.
- SMA `/api/export`: secret por header `x-export-secret`, no query param.
- Pricing v17 (2026-05-30): shampoos $28.99 (48-50% margen), peróxidos $13.99-15.99, masks $34.99-39.99, Dyfensor SF $33.99. Kits A $99 / B $169 / C $229 + Dyfensor add-on. Cyan #2A8CC4 = accent secundario, Gold #B8892A = primario.
- Peróxido no se vende standalone — solo en kits/promos.
- Marketing B2B = $0 ads en fase lanzamiento presencial.

---
_Unreal>ille · NeuroneSCF · 2026-06-13 sesión 4_
