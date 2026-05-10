# SESSION LOG — Social Media Agent
_Repo: `unrlvl-context` · Ruta: `agents/social-media-agent/session_log.md`_
_Última actualización: 2026-05-10_

---

## ESTADO ACTUAL — INFRAESTRUCTURA DIGITAL NEURONE SCF

### COMPLETADO ✅

| Item | Detalle |
|------|---------|
| Correos corporativos | 7 aliases bajo neuronescflorida.com: admin, ig, waba, tiktok, ads, support, hello |
| Número comercial | T-Mobile dedicado de Patricia — activo y verificado |
| Meta Business Manager | Configurado. Información de empresa completa. Verificación de dominio pendiente. |
| Facebook Page | "Neurone South & Central Florida" — creada en BM |
| Instagram Business | @neuronescflorida — creado con ig@neuronescflorida.com, categoría Belleza |
| TikTok for Business | @neuronescflorida — creado con tiktok@neuronescflorida.com, cuenta Pro/Empresa |
| Estrategia de compliance | Número personal PO intocable · Un BM por marca · Tokens via System User |

---

### EN PROCESO ⏳

| Item | Estado | Blocker |
|------|--------|---------|
| Instagram → Facebook Page link | Parcial — opción visible pero no confirmada | Laura necesita confirmar desde app |
| WABA (WhatsApp Business API) | Setup iniciado en Meta BM | Pendiente confirmación configuración final |
| Meta System User token | Bloqueado | Meta requiere crear App primero en developers.facebook.com |
| App en Meta for Developers | Pendiente | Patricia necesita crearla en developers.facebook.com con email admin@neuronescflorida.com |

---

### PENDIENTE ❌

| Item | Notas |
|------|-------|
| Meta App en developers.facebook.com | Nombre sugerido: "Neurone SCF API" · Tipo: Empresa |
| Meta System User token (UNRLVL-Orchestrator) | Depende de App creada · Permisos: pages_manage_posts, ads_management, instagram_content_publish |
| TikTok Access Token | Desde ads.tiktok.com · Operador Sam · Duración 365 días |
| Verificación dominio neuronescflorida.com | Método DNS TXT (Laura no tiene acceso al hosting — Sam debe coordinar) |
| Logos y assets oficiales | Pendiente de Neurone Cosmética o UNRLVL · Necesario para completar perfiles |
| Foto de perfil todas las cuentas | Mismo blocker que logos |
| WABA confirmación final | Confirmar número T-Mobile registrado correctamente en BM |

---

## PRÓXIMOS PASOS CONCRETOS

**Orden de ejecución sugerido:**

1. **Patricia crea Meta App** en developers.facebook.com (30 min con guía del agente)
2. **Con App creada** → generar System User token UNRLVL-Orchestrator → enviar a Sam por canal seguro
3. **Confirmar link Instagram → Facebook Page** desde app Patricia
4. **Sam coordina** verificación dominio neuronescflorida.com (acceso hosting)
5. **TikTok access token** — Sam en ads.tiktok.com como Operador

---

## USUARIOS ACTIVOS

| Usuario | Rol | Estado | Última sesión |
|---------|-----|--------|--------------|
| Sam | admin | Activo | 2026-05-04 |
| Laura | ops | Activo | 2026-05-04 |
| Paty | po | Activo | 2026-04-06 |

---

## HISTORIAL DE SESIONES

| Fecha | Usuario | Avance |
|-------|---------|--------|
| 2026-03-23 | Sam | Definición aliases email + estrategia números + compliance Meta |
| 2026-04-06 | Laura | TikTok Shop requirements. Meta BM parcialmente configurado. |
| 2026-04-06 | Sam | Verificación de estado del agente. Session log no accesible desde agente. |
| 2026-04-06 | Paty | Primera sesión. Checklist de prerequisitos. |
| 2026-04-10 | Laura | Continuación setup Meta BM — información de empresa completada. |
| 2026-04-10 | Sam | Confirmación de estructura de correos. |
| 2026-04-15 | Laura | Verificación campos Meta BM. Dominio sin verificar. |
| 2026-04-17 | Laura | Facebook Page creada. Instagram Business iniciado. |
| 2026-04-18 | Laura | Instagram Business completado. TikTok for Business completado. WABA setup iniciado. |
| 2026-05-04 | Laura | Sam solicita API tokens. Meta requiere App primero — proceso iniciado. |

---

## NOTAS TÉCNICAS

**Meta System User — nombre:** `UNRLVL-Orchestrator` · Rol: Empleado (nunca Admin)
**Permisos requeridos:** `pages_manage_posts` · `pages_read_engagement` · `pages_manage_metadata` · `ads_management` · `ads_read` · `instagram_basic` · `instagram_content_publish`
**Token delivery:** Canal seguro (Bitwarden Send o Signal) — nunca WhatsApp/email

**TikTok token:** Access Token vía ads.tiktok.com · Duración 365 días · Refresh token 365 días
**WABA:** Número T-Mobile Patricia · No reutilizable · Tier 1: 1,000 conversaciones/día

---

_Social Media Agent · Unreal>ille Studio · 2026-05-10_
