# SKILL: NSCF-PRICING

**Dominio:** NeuroneSCF — pricing B2B/B2C, Custom Kits, análisis de rentabilidad.
**Owner:** Sam · Precios de lista: decisión PO + Sam.
**Versión:** v1 · 2026-06-13.
**Naturaleza:** skill de LÓGICA. No renderiza. Delega todo output visual a `ui-ux-layer`.

---

## QUÉ HACE
Convierte productos del catálogo NeuroneSCF en cotizaciones B2B, arma Custom Kits, calcula rentabilidad real y produce análisis. Funciona como sesión de trabajo: **debatir → opciones → decidir → output**. Sin límite analítico.

## SEPARACIÓN DE RESPONSABILIDADES (regla dura)
- **NSCF-PRICING = lógica.** Produce DATOS estructurados (kit, precios, márgenes, flags). NO conoce colores, fuentes ni CSS.
- **ui-ux-layer = render.** Para cualquier output HTML, este skill invoca `ui-ux-layer` con `brand_id = NeuroneSCF_B2B`. El pricing NUNCA hardcodea CSS.
- Flujo: NSCF-PRICING calcula → entrega estructura → ui-ux-layer compone el HTML con identidad NSCF (paleta Supabase, vida y movimiento, etc.).

## FUENTE DE VERDAD — PRECIOS (regla dura)
- Archivo base: **`RES-Neurone_Pricing_v18_B2B_B2C.xlsx`** (o versión vigente). **Sam lo sube en cada sesión.**
- **PROHIBIDO alterar el xlsx** salvo orden explícita de Sam (ej: el re-write v17→v18 de col O: tintes $9.99, Alizzanti $99.99).
- **Columna O (Precio en Shopify / PVP):** precio de lista PO+Sam. Ancla. **Nunca se recalcula.** Solo sugerencias.
- Si no está el archivo, pedirlo. No inventar costos.

## FUENTE DE VERDAD — IMÁGENES
- **Repo `blueprints`, ruta `brands/NeuroneSCF/assets/products/`** (fuente real, confirmada 2026-06-13):
  - `products/*.png|*.webp` — ~40 imágenes de producto (light). Resolver por basename (algunas son .webp aunque el blueprint diga .png).
  - `products/dark_versions/*_dark.png` — versión sobre fondo oscuro (usar en outputs dark B2B).
  - `products/alpha_dark/*_alpha.png` — 6 con alpha recuperado (Humit/Dyfensor/Kerasin/Dyfazza).
  - Logos/icons: `brands/NeuroneSCF/assets/brand/NeuroneSCF/` (NSCF_Logo_*, N_SCF_icon_c.png) y `.../brand/NeuroneCosmetica/`.
  - Fetch: usar **`https://raw.githubusercontent.com/unrealvillestudio-hub/blueprints/main/brands/NeuroneSCF/assets/products/<archivo>`** (raw directo — verificado 2026-06-13). NO usar el proxy `/api/gh?action=file` para imágenes: devuelve base64 en JSON y hace timeout en binarios grandes. El proxy es solo para archivos de texto.
- Registro maestro de nombres: `public.product_blueprints.image_filename` (39/51 NSCF mapeados).
- **Bucket Supabase `product-assets` y tabla `brand_assets`: VACÍOS** a 2026-06-13 → por eso ui-ux-layer no traía imágenes. Mini-proyecto aparte (CC) los poblará desde el repo blueprints.
- Mientras tanto, para outputs: tomar imágenes directo del repo blueprints (proxy Vercel) o Sam las sube al chat. Cuando el bucket se pueble, ui-ux-layer las tomará por URL — sin tocar este skill.

## FÓRMULAS (verificadas contra el archivo — no cambiar sin orden de Sam)
```
Precio c/Arancel      = Compra_LATAM × 1.20
Costo Total Real B2C  = Compra×1.20 + LOGISTICA + TRANSACCION + MARKETING + OPERATIVOS   (overhead ≈ $23.5951)
Costo Total Real B2B  = Compra×1.20 + TRANSACCION + OPERATIVOS                            (overhead ≈ $2.5987)
Precio MÍNIMO  = Costo / 0.6   (margen 40%)
Precio DESEADO = Costo / 0.5   (margen 50%)
Precio ÓPTIMO  = Costo / 0.4   (margen 60%)
```
Overheads se LEEN en runtime de LOGISTICA!E17, TRANSACCION!E15, MARKETING!E25, OPERATIVOS!E19 (no hardcode).

## CASO DE USO CENTRAL: productos B2C → kits B2B
Clientes B2B piden presentaciones del catálogo B2C (400ml, 100ml, kits) que NO existen como SKU B2B (1L). Conversión correcta:
1. Tomar `Compra_LATAM` del producto.
2. Recalcular costo con **overhead B2B** (NO el B2C — es 9× menor).
3. Aplicar margen.
NUNCA convertir descontando sobre el PVP B2C (arrastra overhead de e-commerce que no aplica a B2B).

## CUSTOM KITS — TRES VISTAS (siempre las tres)
1. **Suma de ítems @ margen** — cada ítem a su precio MIN/DES/OPT, sumado.
2. **Margen de kit completo** — precio = costo_total / factor.
3. **Descuento sobre PVP de lista** — estilo Alizzanti: suma de col O − descuento%.
Mostrar por vista: precio, costo, utilidad $, margen %.

## CAPACIDAD ANALÍTICA (sin límite)
- Flag cuando PVP de lista (col O) < precio MÍNIMO calculado (overhead fijo aplasta productos baratos — caso tinte/peróxido).
- Señalar productos donde overhead B2B > 40% del costo.
- Escenarios, sensibilidad, break-even, MOV, recomendaciones estratégicas con probabilidades.

## MOTOR
`nscf_pricing.py` — clases `Producto`, `Kit` (vista_suma_items / vista_margen_kit / vista_descuento_pvp), `read_overheads()`, `costo_total_real()`. Importable.

## OUTPUTS
- Análisis/tablas → en chat.
- **.xlsx** calculadora interactiva (kit builder + rentabilidad).
- **HTML presentable** → SIEMPRE vía ui-ux-layer (brand_id NeuroneSCF_B2B). Entregar con prefijo de carpeta.

## NO HACER
- No alterar el xlsx fuente ni la columna O.
- No usar overhead B2C para precios B2B.
- No hardcodear CSS — delegar a ui-ux-layer.
- No inventar costos ni imágenes faltantes — pedirlos a Sam.
- No asumir lecturas ambiguas de pedidos manuscritos — confirmar.
