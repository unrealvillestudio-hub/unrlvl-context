# SESSION LOG — NeuroneSCF B2B
_Actualizado: 2026-06-13 (sesión 5)_

---

## ⏸️ RETOMAR EN PRÓXIMO CHAT (prioridad)

**De sesión 5 (pricing + assets):**
1. **Custom Kit de prueba (Orlando)** — armar kit real con `nscf-pricing` y las 3 vistas, como validación del skill en uso.
2. **Mini-proyecto CC: poblar `product-assets`** — brief listo (`CC_BRIEF_poblar_product-assets.md`). Fuente: repo blueprints `brands/NeuroneSCF/assets/products/`. Vía correcta = raw.githubusercontent (NO el proxy). Subir + conectar `brand_assets` + corregir flateados/fondos.
3. **ui-ux-layer — completar resolución de assets (multimarca, Sam+Claude)** — documentar patrón raw.githubusercontent por `brand_id`, genérico. NO hardcodear ninguna marca. Es mejora del core UNRLVL, beneficia a todas.

**De sesión 4 (NSCF-Console) — vigente:**
4. **Resend hardening** (corto, seguridad) — key Resend hardcoded → secret `RESEND_API_KEY` + rotar + versionar `nscf-mailer`. Antes de Fase 3.
5. **Sesión Shopify infra** — app dedicada commerce con `write_customers`/`write_draft_orders`/`write_orders`; decidir multi-token por tienda en `shopify.stores`. Desbloquea Fase 2.5.
6. **NSCF-Console Fase 3** — superuser console, roles por nivel de auth.

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

## DEUDA TÉCNICA / PENDIENTES (acumulada)
- [ ] **Resend hardening** (ver prioridad arriba): key → secret + rotación + versionar `nscf-mailer`.
- [x] **Proyecto Vercel `nscf-console`** — HECHO, LIVE en `console-pro-neuronescf.vercel.app` (root `nscf-console`, Vite, sin env vars).
- [ ] **Confirmar URL real de login passwordless PRO** — el mailer usa `nj5ybc-n1.myshopify.com/account` por defecto; Sam confirmó que la URL funciona.
- [ ] **Corregir drift `shopify.stores` VIEW→BASE TABLE** y drift `/api/professor` en fuente de verdad (ecosystem learnings / HRD_PROTOCOL).
- [ ] Config Vercel Parte C: "Include files outside root" → OFF en kiosko y dispatch (de s2).
- [ ] **Cutover de dominio** `pro.neuronescflorida.com` → landing (de s2).
- [ ] **Política de privacidad B2B** — `PRIVACY_URL` apunta a la de B2C; crear la B2B (de s2).
- [ ] **`NeuroneSCF_B2B` sin paleta en Supabase** (de sesiones previas).
- [ ] **Imágenes de producto Neurone defectuosas** (de sesiones previas — relacionado con poblar product-assets, s5).

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
_Unreal>ille · NeuroneSCF · 2026-06-13 sesión 5_
