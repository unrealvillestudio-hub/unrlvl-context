# SKILL — ads-mcp v1.0
_Unrealville Studio · Meta Ads + TikTok Ads via MCP · Análisis + Gestión_
_Versión: 1.0 · 2026-05-10_

---

## INSTRUCCIÓN DE CARGA

Cargar cuando Sam indica trabajo con campañas de ads:
- "analiza las campañas de NeuroneSCF"
- "qué está pasando con los Meta Ads"
- "optimiza el budget de [campaña]"
- "crea campaña / ad set / creative"
- cualquier reporting o gestión de paid media

---

## DOS CONECTORES DISPONIBLES

### Conector 1 — Meta Oficial (`mcp.facebook.com/ads`)
**URL:** `https://mcp.facebook.com/ads`
**Estado:** Open beta (lanzado 2026-04-29) · Requiere Claude Pro+
**Cubre:** Facebook + Instagram Ads (misma Marketing API)
**29 tools** incluyendo: `ads_get_ad_entities`, performance data, campañas, ad sets, ads, audiencias, creatives

**Setup:** Settings → Connectors → Add → URL: `https://mcp.facebook.com/ads` → OAuth con Meta BM de Patricia

**Limitación real:** Rollout gradual — algunas cuentas muestran "disabled" post-setup. Si falla, usar Pipeboard.

---

### Conector 2 — Pipeboard (Meta + TikTok + Google)
**URL Meta:** `https://meta-ads.mcp.pipeboard.co/`
**URL TikTok:** `https://tiktok-ads.mcp.pipeboard.co/`
**Estado:** Más maduro que el oficial · Badged Meta Business Partner
**Ventaja:** Cubre Meta + TikTok + Google en un solo workspace · Cross-platform analysis

**Setup:** pipeboard.co → conectar cuenta → obtener token → Settings → Connectors → URL con token

---

## CAPACIDADES REALES

### Lo que puedo hacer con ads MCP

| Capacidad | Disponible |
|-----------|-----------|
| Leer performance (ROAS, CTR, CPC, frecuencia, CPM) | ✅ |
| Análisis por campaña / ad set / ad | ✅ |
| Breakdowns: edad, género, placement, país, dispositivo | ✅ |
| Detectar anomalías (CPM spike, creative fatigue, frequency creep) | ✅ |
| Ver errores de delivery bloqueantes | ✅ |
| Crear campaña nueva | ✅ (con aprobación) |
| Actualizar budget | ✅ (con aprobación, max +20% por cambio) |
| Pausar / activar ads | ✅ (con aprobación) |
| Crear audiencias lookalike | ✅ |
| Duplicar ad sets | ✅ |

### Lo que NO puedo hacer con ads MCP

| Limitación | Por qué |
|-----------|---------|
| Setup inicial de Business Manager | Manual en Meta BM UI |
| Crear System User / tokens desarrollador | Manual en Meta Developers |
| Vincular Instagram → Facebook Page | Manual en Instagram app |
| Verificar dominio en Meta | Manual (Sam via Cloudflare TXT) |
| Publicaciones orgánicas | Diferente API (Graph API orgánica) |

---

## REGLAS DE SEGURIDAD — CRÍTICAS

Usar con extrema cautela para evitar flags en la cuenta:

1. **Nunca automatizar cambios sin que Sam apruebe el diff primero**
2. **Budget changes: máximo +20% en un solo movimiento**
3. **No ejecutar en paralelo** — las calls API en burst son el trigger #1 de bans
4. **Modo read-only primero** — analizar antes de tocar
5. **Una cuenta a la vez** — nunca múltiples cuentas en la misma sesión de cambios

```
ORDEN CORRECTO:
1. Leer performance actual
2. Identificar oportunidad de optimización
3. Mostrar propuesta con impacto estimado
4. Sam aprueba
5. Aplicar cambio
6. Verificar resultado
```

---

## PARA NSCF — ESTADO ACTUAL

Patricia tiene activa la cuenta publicitaria en Meta BM pero:
- **Connector no está activo** — setup pendiente por Patricia
- **Prerequisito:** Shopify Payments activo ✅ · Tracking pixels pendientes ❌
- **Recomendación:** No activar campañas paid hasta tener Meta Pixel + TikTok Pixel instalados en la tienda

Cuando los pixels estén instalados y el conector activo, el workflow es:
```
ads-mcp analiza performance
  → Orchestrator orquesta → CopyLab genera copy → Higgsfield genera creative
  → ads-mcp crea/actualiza campaña con aprobación de Sam
```

---

## RELACIÓN CON SOCIALAPP + ORCHESTRATOR

**No es reemplazo — es integración:**

| Herramienta | Rol |
|-------------|-----|
| SocialApp + Orchestrator | Contenido orgánico · publicación · calendario |
| ads-mcp | Campañas pagadas · reporting · optimización |
| Higgsfield MCP | Generación de creatives (imágenes/video para ads) |

El Orchestrator puede llamar ads-mcp como un tool más en el pipeline de campaña.

---

_SKILL ads-mcp v1.0 · Unrealville Studio · Meta Ads + TikTok Ads · Read + Write con aprobación_
