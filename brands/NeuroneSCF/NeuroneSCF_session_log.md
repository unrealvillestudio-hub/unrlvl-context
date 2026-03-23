# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-03-23 — Social Media Agent: QA completo + fixes

### COMPLETADO HOY
- **Social Media Agent** — QA Passed y operativo:
  - Fix: validateToken sincronizado entre chat.js y history.js (bug de acceso bloqueado)
  - Fix: ROLE_CONTEXT admin — saluda por nombre sin pedir identificación
  - Fix: brand session_log de Sam eliminado del contexto del agente (memory bleed)
  - ROLE_MAP activo: SAM→admin, PATY→po, LAURA→ops
  - Aislamiento KV completo: chat:SAMDEV / chat:PATRICIA / chat:LAURA
  - Nudge desactivado para admin, activo para po/ops cada 10 mensajes
  - Protocolo "Actualiza" integrado en flujo "Actualiza" de Sam
  - SESSION_PROTOCOL v5 en repo unrlvl-context
  - Tokens: SAMDEV:Sam:SAM · PATRICIA:Patricia:PATY · LAURA:Laura:LAURA

- **Primera sesión de Sam en el agente (SAMDEV):**
  - 7 aliases de email definidos bajo neuronescflorida.com
  - Estrategia: número comercial dedicado separado del personal de PO
  - Compliance Meta verificado: un número por Business Manager
  - Decisión: OpenPhone o NumberBarn para número WABA

### EN CURSO / CALIENTE
- **Neurone_Pricing_v5.xlsx:** generado localmente — NO en repo. Riesgo de pérdida.
- **SKU definitivo:** pendiente. Bloquea Shopify.
- **Autorización marca Neurone dominio US:** bloqueada. Sin esto no lanza neuronescflorida.com.
- **17+ SKUs con stock 0:** marcar out_of_stock antes de lanzar.
- **Precios de venta:** $0.00 placeholder. Confirmar con PO.
- **Infraestructura digital (desde agente):**
  - Aliases email: pendiente crear en servidor
  - Número comercial: pendiente adquisición (OpenPhone/NumberBarn)
  - Meta BM, Instagram, WABA, TikTok: todos pendientes

### PRÓXIMA SESIÓN
- Subir Neurone_Pricing_v5.xlsx al repo BluePrints
- Decisión final SKU
- Seguimiento autorización marca
- Laura/PO: arrancar infraestructura digital con el agente

---

## 2026-03-22 — Estado inicial del sistema de contexto

### EN CURSO / CALIENTE
- **Neurone_Pricing_v5.xlsx:** modelo completo generado localmente — NO en repo. Riesgo de pérdida.
- **SKU definitivo:** decisión pendiente. Shopify bloqueado sin esto.
- **Autorización marca Neurone dominio US:** bloqueada.
- **17+ SKUs stock 0:** marcar out_of_stock antes de lanzar.
- **Precios:** $0.00 placeholder. Confirmar con PO.
