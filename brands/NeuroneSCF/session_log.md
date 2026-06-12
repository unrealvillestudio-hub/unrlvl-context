# SESSION LOG — NeuroneSCF B2B
_Actualizado: 2026-06-12 (sesión 2)_

---

## ⏸️ RETOMAR EN PRÓXIMO CHAT (prioridad)

1. **One-pager — PAUSA con trabajo pendiente.** Hay más que resolver sobre el one-pager (Sam lo flaggeó al cierre de esta sesión). Retomar como primer tema del próximo chat. _Contexto: existen versiones previas (PRINT Legal 8.5×14 y DARK 680px) en sesión 2026-05-30; y el Sales Pager Salones de hoy. Falta definir qué exactamente queda abierto — preguntarle a Sam al retomar._
2. **NSCF-Console — Fases 2 y 3 (pendientes del proyecto PRO).**
   - **Fase 2 = Módulo de aprobación de PO.** PO revisa solicitudes `pending` en `nscf_b2b_salones`, abre el doc de licencia (vía signed URL del bucket privado), aprueba/rechaza. Al aprobar → crea/etiqueta el customer en Shopify PRO vía API (tag `salon-aprobado`) + email de bienvenida. Incluye botón "registro asistido" (PO crea cuenta manual para salón ya tocado).
   - **Fase 3 = Elevar el kiosk a "NSCF Console" superuser.** Misma app, roles separados por nivel de auth: **embajadora (PIN)** = B2C venta actual, sin cambios; **PO/superuser (login fuerte, no PIN)** = desbloquea aprobaciones de salones + vista B2B + inventarios de ambas tiendas (B2C y PRO vía Shopify MCP/API). Las funciones sensibles NUNCA detrás del PIN de 4 dígitos.

---

## NOVEDADES ESTA SESIÓN (2026-06-12 sesión 2) — NSCF PRO Fase 1: Registro de Salones B2B

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
- PR #2 (`worktree-nscf-pro-gateway` → main): "Ready to merge", 3 commits (86cde2f, dfab9a4, 6fe9952). **Pendiente: Sam mergea por GitHub Desktop + CC limpia worktree.**

### BUG RESUELTO — 500 en el registro (causa: GRANT faltante, NO el código)
- Síntoma: form devolvía 500, tabla vacía, INSERT manual funcionaba.
- **Causa real: `code 42501 permission denied for table nscf_b2b_salones`** — `service_role` sin GRANT sobre la tabla nueva. (RLS sin policies bloquea anon pero NO concede service_role.)
- Fix: `GRANT SELECT, INSERT, UPDATE, DELETE ON public.nscf_b2b_salones TO service_role` — aplicado + versionado en migración separada. EF restaurada a v3.
- **REINCIDENTE:** ya pasó en el kiosko. Toda tabla NSCF nueva con RLS necesita GRANT explícito a service_role. → Professor (rel 5).

### Config Vercel (drift de routing — parcialmente resuelto)
- Creado proyecto `nscf-pro-gateway` (root `pro-gateway`, Vite, sin env vars). Production Branch fijada a `main`. "Include files outside root" → OFF.
- **PENDIENTE manual de Sam (no bloquea merge):** en `nscf-kiosko` y `nscf-dispatch` → apagar "Include files outside the root directory" (siguen ON → rebuildean PRs ajenos). "Skip deployments" ya activado en ambos.

---

## DEUDA TÉCNICA / PENDIENTES (2026-06-12 s2)
- [ ] **Mergear PR #2** a main (Sam, GitHub Desktop) + cleanup worktree (CC).
- [ ] Config Vercel Parte C: "Include files outside root" → OFF en kiosko y dispatch.
- [ ] **Cutover de dominio** `pro.neuronescflorida.com` → apuntar a la landing (hoy va a la tienda Shopify). Decisión + ejecución de Sam, cuando todo esté validado. El día del switch, la entrada del portal cambia en producción.
- [ ] **Política de privacidad B2B:** hoy `PRIVACY_URL` apunta a la de B2C (`neuronescflorida.com/policies/privacy-policy`). Crear la de B2B y actualizar el link (1 línea hardcodeada en App.jsx). Verificar que la página actual tenga contenido real (cobertura del checkbox de consentimiento).
- [ ] Objeto(s) de prueba huérfano(s) en bucket `nscf-licenses` (PNGs de prueba) — borrar desde Storage UI o dejar (bucket privado, sin riesgo).
- [ ] Avisar a PO: ignorar emails de prueba B2B ("PRUEBA CC — ignorar" + "BlackOut Salon").
- [ ] **`NeuroneSCF_B2B` sin paleta en Supabase** (de sesión anterior, sigue): identidad B2B vive solo en portal deployado. Cargar a Supabase.
- [ ] **Imágenes de producto Neurone defectuosas** (de sesión anterior): PNGs del laboratorio con bloques negros/blancos. Las 2 `_alpha` (Humit) sí están bien. Para landing/uso ampliado, set de PNGs transparentes limpios.

---

## NOVEDADES SESIÓN ANTERIOR (2026-06-12 sesión 1) — Kiosk: Cobro en Efectivo + Sales Pager

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
_Unreal>ille · NeuroneSCF · 2026-06-12 sesión 2_
