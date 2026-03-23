# Session Log — Neurone SCF
**Formato:** entradas cronológicas · las más recientes arriba · nunca se borra, se marca como cerrado

---

## 2026-03-23 — Social Media Agent: protocolo contextual completo

### COMPLETADO HOY
- **Social Media Agent** (`unrlvl-social-media-agent.vercel.app`) — agente de asistencia a Laura/PO para creación de infraestructura digital de Neurone SCF
  - Contexto de marca NeuroneSCF + PO inyectado en system prompt
  - Persistencia KV (Upstash Redis, región iad1, TTL 90 días) activa
  - Historial cross-device por usuario (Laura: BETA9X · PO: ALPHA7K)
  - Protocolo "Actualiza": nudge cada 10 mensajes → genera agent_log estructurado en KV
  - Fetch dinámico de `brands/NeuroneSCF/session_log.md` en cada sesión → agente siempre conoce estado actual del proyecto
  - `/api/export` protegido con EXPORT_SECRET → Sam lo llama al ejecutar "Actualiza"
  - SESSION_PROTOCOL v5 actualizado → verifica agent log en cada "Actualiza" de Sam
  - `agents/social-media-agent/session_log.md` creado en repo unrlvl-context

### EN CURSO / CALIENTE
- **Neurone_Pricing_v5.xlsx:** modelo completo generado localmente — **NO está en ningún repo todavía.** Riesgo de pérdida si no se sube pronto.
- **SKU definitivo:** decisión pendiente entre SKU proveedor (L014, T025...) vs SKU modelo (L034, T068...). Shopify no puede activarse sin esta decisión.
- **Autorización marca Neurone para dominio US:** sigue bloqueada. Sin esto no se puede lanzar neuronescflorida.com.
- **17+ SKUs con stock 0:** identificados en análisis de inventario. Deben marcarse out_of_stock en Shopify antes de lanzar.
- **Precios de venta:** todos en $0.00 placeholder. Confirmar con PO.

### PRÓXIMA SESIÓN Neurone — continuar con:
- Subir Neurone_Pricing_v5.xlsx al repo BluePrints
- Decisión final sobre sistema SKU
- Seguimiento autorización marca
- Laura/PO: primera sesión con Social Media Agent para arrancar infraestructura digital
