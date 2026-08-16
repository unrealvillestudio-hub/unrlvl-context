/**
 * UNRLVL Brand Cache Endpoint v2.0 — LECTOR (ya no constructor)
 * GET /api/brand-cache?brand_id=X                 → sirve el snapshot persistido
 * GET /api/brand-cache?brand_id=X&refresh=true    → delega la reconstrucción en la EF y relee
 * GET /api/brand-cache?brand_id=X&debug=true      → añade _debug con el detalle del detector
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * v2.0 — 2026-08-16 — CAMBIO DE ROL, no de features. `unrlvl-context` dejó de ser constructor.
 *
 *   POR QUÉ: hasta hoy había TRES constructores del snapshot de marca — este archivo (8 tablas,
 *   en vivo, sin persistir), `CopyLab/api/brand-cache.js` (30 tablas, ya degradado a lector el
 *   2026-08-16) y la EF `brand-snapshot-builder` (30 tablas, con cron cada 3 h). El eje —componer
 *   el contexto de una marca— es del sistema, no de cada lab que lo necesita. Con este cambio
 *   quedan tres constructores reducidos a UNO: la EF.
 *
 *   LO QUE ESTE ENDPOINT SERVÍA MAL. v1.2 consultaba 8 tablas: brand_personas,
 *   brand_copy_profiles, humanize_profiles, compliance_rules, brand_goals, geomix,
 *   psycho_presets y channel_prompt_rules. Frente a las 30 del canónico faltaban, entre otras:
 *     - brand_voice_genome            — el ADN ejecutable de voz. Sin esto no hay voz de marca.
 *     - creative_vectors, tension_architectures, aggro_presets,
 *       creative_compatibility_rules — el motor creativo completo.
 *     - pipeline_skills, content_type_registry — el cableado del registro.
 *     - platform_canal_map, canal_blocks, output_templates, brand_languages,
 *       brand_services, keywords, ctas y el resto.
 *   O sea: todo caller de este endpoint venía operando con contexto empobrecido. Leer el snapshot
 *   no sólo elimina la duplicación: las 8 claves viejas siguen ahí —el consumidor las encuentra
 *   donde siempre— y además llegan las otras 22.
 *
 *   EL FAIL-SILENT QUE SE ELIMINA. v1.2, ante un status ≠ 200 en cualquier tabla, hacía
 *   `cache[table] = []` y ocultaba el error salvo que se pasara `&debug=true`. Es exactamente el
 *   patrón que hizo que la primera corrida del builder devolviera 200 OK con 22 de 30 capas
 *   vacías. Acá lo reemplaza el detector de degradación de abajo: log ruidoso + headers, siempre.
 *
 *   ── EL PATRÓN ────────────────────────────────────────────────────────────
 *   Un lab LEE el snapshot. Ningún lab lo CONSTRUYE.
 *
 *     brand-snapshot-builder (EF, ecosistema)  ← ÚNICO escritor de brand_cache_snapshots
 *             ↓
 *        public.brand_cache_snapshots
 *             ↓ leen
 *     CopyLab · unrlvl-context · VideoLab · ImageLab · SocialLab
 *
 *   Sin TABLES_INCLUDED, sin buildSnapshot, sin service_role en ningún lector.
 *
 *   Cambios concretos:
 *     - ELIMINADOS: BRAND_TABLES, GLOBAL_TABLES, ACTIVE_FILTER_TABLES y toda la lógica de
 *       construcción. Mientras existieran, alguien las volvía a llamar.
 *     - refresh=true deja de significar "bypass del CDN": delega en la EF y relee el snapshot
 *       persistido. PROHIBIDO construir por cuenta propia como fallback — eso reintroduce la
 *       duplicación por la puerta de atrás.
 *     - debug=true se conserva, pero ya no reporta errores de consulta (no ocurren): reporta el
 *       fallo de delegación y el detalle del detector, bajo la clave `_debug`.
 *     - Cache-Control pasa de `s-maxage=3600` a `no-store`. El snapshot ES el cache, con su
 *       propio `stale_after`; una capa de CDN encima enmascararía tanto la frescura real como los
 *       headers de degradación. La lectura es un SELECT indexado por PK — barato.
 *     - Los headers `X-Cache-Refreshed` y `X-Errors` desaparecen: describían la construcción.
 *       Ningún consumidor los lee (los tres verificados consumen sólo el cuerpo JSON).
 *     - Se necesita IID_CRON_SECRET como env var nueva en el proyecto Vercel. Sin ella, la
 *       delegación lanza con mensaje nominal y una lectura con snapshot stale se sirve gritando
 *       (X-Cache: STALE) en vez de romperse: el cron del builder corre cada 3 h contra un
 *       stale_after de 4 h, así que el camino normal es HIT y no necesita delegar.
 *
 *   Degradación con la EF caída (stale no es vacío — un snapshot de 5 h tiene el genoma, las
 *   reglas creativas y los vectores reales):
 *     - hay snapshot stale → se sirve con X-Cache: STALE + X-Snapshot-Refresh: FAILED + error log
 *     - no hay snapshot    → 502 nominal: no hay nada que servir
 *     - refresh=true       → 502 aunque exista stale: el caller pidió fresco, devolverle viejo
 *                            contradice lo que pidió
 *
 * ── HISTORIA (el rol de constructor descrito abajo ya NO aplica desde v2.0) ──
 *
 * v1.2: on-demand, 8 tablas, sin persistir, CDN cache s-maxage=3600 /
 *       stale-while-revalidate=86400. Los errores de consulta se tragaban en `[]` y sólo
 *       aparecían con &debug=true.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const config = { runtime: 'edge' };

const SB_URL      = () => process.env.SUPABASE_URL      ?? '';
const SB_KEY      = () => process.env.SUPABASE_ANON_KEY ?? '';
// Credencial para invocar al constructor. La EF acepta IID_CRON_SECRET o service_role; se usa el
// PRIMERO a propósito: un lab que necesita service_role para tener contexto está mal cableado.
const CRON_SECRET = () => process.env.IID_CRON_SECRET   ?? '';

// El constructor, a nivel ecosistema. NO vive en este repo y no debe volver a vivir acá.
const BUILDER_FN = 'brand-snapshot-builder';

// Las capas GLOBALES: exactamente las que el builder consulta SIN predicado de marca alguno.
// Son el detector de degradación, y el criterio es binario, no porcentual: una global vacía es
// SIEMPRE un fallo del sistema (GRANT ausente, RLS, tabla despoblada), porque su contenido no
// depende de qué marca se pida. Una capa por marca vacía puede ser dato ausente legítimo — una
// marca de servicios legales no tiene keywords ni ctas. Un umbral por porcentaje confunde ambas
// cosas: se traga una global vacía suelta (justo el modo de fallo que ya ocurrió: creative_vectors
// presente y vacío durante semanas) y a la vez grita por marcas legítimamente flacas.
//
// PARIDAD CON EL BUILDER: si brand-snapshot-builder suma una tabla global, va también acá, o el
// detector queda ciego en la capa nueva. Las tres claves que mezclan mitad global/DEFAULT con
// mitad de marca quedan FUERA de esta lista y se cubren aparte, con SENTINELS.
const GLOBAL_LAYERS = [
  'psycho_presets',
  'channel_prompt_rules',
  'output_templates',
  'canal_blocks',
  'platform_canal_map',
  'blueprint_schemas',
  'creative_vectors',
  'tension_architectures',
  'aggro_presets',
  'creative_compatibility_rules',
  'pipeline_skills',
  'content_type_registry',
];

// Los CENTINELAS: la segunda categoría del detector, separada de GLOBAL_LAYERS a propósito.
// Estas tres claves mezclan una mitad global/DEFAULT con una mitad de marca, así que su vacío
// TOTAL no es diagnóstico —una marca sin presets propios se ve igual que un fallo del sistema— y
// tampoco alcanza con que la clave venga poblada: puede traer sólo filas de la marca y ninguna de
// la mitad global. Lo que sí es diagnóstico es la presencia de la fila centinela, la que NO
// depende de la marca pedida. Si falta, la mitad global no llegó.
//
// NO se chequea la clave entera: se chequea la presencia del centinela.
const SENTINELS = [
  { layer: 'humanize_profiles', label: "humanize_profiles[brand_id='DEFAULT']", match: (r) => r?.brand_id === 'DEFAULT' },
  { layer: 'compliance_rules',  label: "compliance_rules[brand_id='DEFAULT']",  match: (r) => r?.brand_id === 'DEFAULT' },
  // OJO — falso positivo posible, único de los tres. Las otras dos claves son concatenación
  // ([...DEFAULT, ...marca]): la fila DEFAULT siempre sobrevive si se leyó. imagelab_presets NO:
  // el builder mergea global y marca en un Map keyed por (canal ?? preset_id) y la fila de marca
  // PISA a la global con la misma clave. Una marca que defina un preset por cada canal global deja
  // el array sin ninguna fila brand_id=null aunque la mitad global se haya leído perfecta.
  // Se reporta igual: es un centinela ausente de verdad, y el log dice cuál. Si aparece ruido por
  // esto, el arreglo es del lado del builder (emitir la mitad global sin pisar), no de acá.
  { layer: 'imagelab_presets',  label: 'imagelab_presets[brand_id=null]',       match: (r) => r?.brand_id === null },
];

// Sólo LECTURA. brand_cache_snapshots tiene RLS bcs_anon_read (SELECT/anon): alcanza y sobra.
// Este endpoint ya no escribe en Supabase — el único que escribe es el builder.
function sbHeaders() {
  return {
    apikey: SB_KEY(),
    Authorization: `Bearer ${SB_KEY()}`,
    'Content-Type': 'application/json',
  };
}

async function sbGetOne(path) {
  const res = await fetch(`${SB_URL()}/rest/v1/${path}`, { headers: sbHeaders() });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? (data[0] ?? null) : data;
}

// ── Leer snapshot desde brand_cache_snapshots ─────────────────────────────
async function readSnapshot(brandId) {
  try {
    const row = await sbGetOne(
      `brand_cache_snapshots?brand_id=eq.${encodeURIComponent(brandId)}&select=cache_data,stale_after,built_at,version&limit=1`
    );
    if (!row) return null;
    const isStale = new Date(row.stale_after) < new Date();
    return { data: row.cache_data, isStale, builtAt: row.built_at, version: row.version ?? null };
  } catch { return null; }
}

// ── Delegar la construcción en la EF ──────────────────────────────────────
// Único camino de reconstrucción que le queda a este endpoint. Lanza si falla: el llamador decide
// si eso es un 502 o una degradación servible. Lo que NUNCA hace es construir por su cuenta.
async function invokeBuilder(brandId) {
  const secret = CRON_SECRET();
  if (!secret) {
    throw new Error(
      `[brand-cache] IID_CRON_SECRET no definida: no se puede delegar en ${BUILDER_FN}. ` +
      'unrlvl-context dejó de ser constructor el 2026-08-16 y no construye como fallback — ' +
      'definir IID_CRON_SECRET en el entorno.'
    );
  }
  const res = await fetch(`${SB_URL()}/functions/v1/${BUILDER_FN}`, {
    method: 'POST',
    // x-cron-secret y no Authorization: la EF lee `x-cron-secret ?? authorization`, y mandar un
    // Bearer con la anon key haría fallar su comprobación (no contiene el secreto) → 401.
    headers: { 'Content-Type': 'application/json', 'x-cron-secret': secret },
    body: JSON.stringify({ brand_id: brandId }),
  });
  const text = await res.text().catch(() => '');
  let parsed = null;
  try { parsed = JSON.parse(text); } catch { /* cuerpo no-JSON: se reporta crudo */ }
  // La EF devuelve 207 (res.ok true) cuando alguna marca falló, con ok:false. Un 207 no es éxito.
  if (!res.ok || parsed?.ok === false) {
    throw new Error(`[brand-cache] ${BUILDER_FN} falló para ${brandId}: HTTP ${res.status} ${text.slice(0, 300)}`);
  }
  return parsed;
}

// ── Salvaguarda de degradación ────────────────────────────────────────────
// Un snapshot que llega con creative_vectors:[] pasaba como éxito — pasó: la primera corrida del
// builder devolvió 200 OK con 22 de 30 capas vacías por GRANT ausente a service_role. Esta
// comprobación es lo único que separa "el lab tiene contexto" de "el lab cree que tiene contexto".
// El veredicto lo dan las GLOBALES (ver GLOBAL_LAYERS); el conteo total va como panorama.
const isEmptyLayer = (v) => v == null || (Array.isArray(v) && v.length === 0);

function inspectSnapshot(snap) {
  const declared  = snap?._meta?.tables_included?.length ?? 0;
  const populated = Object.entries(snap ?? {})
    .filter(([k, v]) => k !== '_meta' && !isEmptyLayer(v)).length;
  const globalsMissing = GLOBAL_LAYERS.filter((k) => isEmptyLayer(snap?.[k]));
  const sentinelsMissing = SENTINELS
    .filter(({ layer, match }) => !(Array.isArray(snap?.[layer]) && snap[layer].some(match)))
    .map(({ label }) => label);
  return {
    declared,
    populated,
    globalsMissing,
    globalsOk: GLOBAL_LAYERS.length - globalsMissing.length,
    sentinelsMissing,
    sentinelsOk: SENTINELS.length - sentinelsMissing.length,
  };
}

// Sin la edad, "STALE" no distingue 5 horas de 3 semanas — y hubo snapshots de 288 h.
// El consumidor decide con el número delante.
function ageHours(builtAt) {
  if (!builtAt) return null;
  const ms = Date.now() - new Date(builtAt).getTime();
  if (!Number.isFinite(ms)) return null;
  return Math.round((ms / 3_600_000) * 10) / 10;
}

// ── Handler ───────────────────────────────────────────────────────────────
function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // El snapshot ES el cache y trae su propio stale_after. Un s-maxage encima serviría cuerpos
      // viejos con headers de degradación congelados del primer request.
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      ...extra,
    },
  });
}

// Cuerpo idéntico al de siempre (el cache_data crudo): el contrato de lectura no cambia. Las 8
// claves que emitía v1.2 son un subconjunto del snapshot. Lo que se agrega es diagnóstico, y va
// en headers — salvo con debug=true, que lo suma al cuerpo bajo `_debug` (igual que v1.2 sumaba
// `_errors`), sin tocar el objeto persistido.
function serveSnapshot(brandId, snapshot, cacheState, { debug = false, delegationError = null, extra = {} } = {}) {
  const report = inspectSnapshot(snapshot.data);
  const { declared, populated, globalsOk, globalsMissing, sentinelsOk, sentinelsMissing } = report;

  if (globalsMissing.length) {
    console.error(
      `[brand-cache] snapshot DEGRADADO ${brandId}: ${globalsMissing.length} capa(s) GLOBAL(es) vacía(s) ` +
      `[${globalsMissing.join(', ')}] — una global vacía es fallo del sistema, no dato ausente de la marca. ` +
      `Globales ${globalsOk}/${GLOBAL_LAYERS.length}, capas pobladas ${populated}/${declared}.`
    );
  }
  if (sentinelsMissing.length) {
    console.error(
      `[brand-cache] snapshot DEGRADADO ${brandId}: falta(n) ${sentinelsMissing.length} centinela(s) ` +
      `[${sentinelsMissing.join(', ')}] — la mitad global/DEFAULT de esas capas no llegó, ` +
      `esté la clave poblada o no. Centinelas ${sentinelsOk}/${SENTINELS.length}.`
    );
  }

  const age  = ageHours(snapshot.builtAt);
  const body = debug
    ? {
        ...snapshot.data,
        _debug: {
          cache_state:        cacheState,
          built_at:           snapshot.builtAt ?? null,
          snapshot_version:   snapshot.version,
          age_hours:          age,
          is_stale:           snapshot.isStale,
          layers:             `${populated}/${declared}`,
          globals:            `${globalsOk}/${GLOBAL_LAYERS.length}`,
          globals_missing:    globalsMissing,
          sentinels:          `${sentinelsOk}/${SENTINELS.length}`,
          sentinels_missing:  sentinelsMissing,
          delegation_error:   delegationError?.message ?? null,
        },
      }
    : snapshot.data;

  return json(body, 200, {
    'X-Cache': cacheState,
    'X-Built-At': snapshot.builtAt ?? '',
    'X-Brand-Id': brandId,
    'X-Snapshot-Globals': `${globalsOk}/${GLOBAL_LAYERS.length}`,
    'X-Snapshot-Sentinels': `${sentinelsOk}/${SENTINELS.length}`,
    'X-Snapshot-Layers': `${populated}/${declared}`,
    'X-Snapshot-Age-Hours': age === null ? 'unknown' : String(age),
    ...extra,
  });
}

export default async function handler(req) {
  const url     = new URL(req.url);
  const p       = url.searchParams;
  const brandId = p.get('brand_id') ?? '';
  const refresh = p.get('refresh') === 'true';
  const debug   = p.get('debug') === 'true';

  if (!brandId) {
    return json({ error: 'brand_id is required. Example: /api/brand-cache?brand_id=<BRAND_ID>' }, 400);
  }
  if (!SB_URL() || !SB_KEY()) {
    return json({ error: 'SUPABASE_URL or SUPABASE_ANON_KEY env vars not configured' }, 500);
  }

  const snapshot = await readSnapshot(brandId);

  // 1. Snapshot fresco y nadie pidió refresh → se sirve tal cual. 0 queries al resto de Supabase.
  if (!refresh && snapshot && !snapshot.isStale) {
    return serveSnapshot(brandId, snapshot, 'HIT', { debug });
  }

  // 2. Ausente, stale, o refresh forzado → DELEGAR. Nunca construir acá.
  let delegationError = null;
  try {
    await invokeBuilder(brandId);
    const rebuilt = await readSnapshot(brandId);
    if (rebuilt) {
      return serveSnapshot(brandId, rebuilt, 'MISS', { debug, extra: { 'X-Snapshot-Refresh': 'OK' } });
    }
    delegationError = new Error(
      `[brand-cache] ${BUILDER_FN} reportó ok para ${brandId} pero el snapshot no se pudo releer`
    );
  } catch (e) {
    delegationError = e;
  }

  // 3. La delegación falló.
  //    refresh=true explícito → 502 aunque exista una stale: el caller pidió fresco, devolverle
  //    viejo con un header contradice lo que pidió.
  if (refresh) {
    return json({ error: 'Bad Gateway', brand_id: brandId, message: delegationError.message }, 502);
  }
  //    Lectura normal con snapshot stale disponible → se sirve, gritando. Stale no es vacío: un
  //    snapshot de 5 h tiene el genoma, las reglas creativas y los vectores reales. Negarle
  //    contexto a un lab por antigüedad es peor que dárselo con la etiqueta puesta.
  if (snapshot) {
    console.error(`[brand-cache] refresh FALLIDO ${brandId}, se sirve stale: ${delegationError.message}`);
    return serveSnapshot(brandId, snapshot, 'STALE', {
      debug, delegationError, extra: { 'X-Snapshot-Refresh': 'FAILED' },
    });
  }
  //    Sin snapshot no hay nada que servir.
  return json({ error: 'Bad Gateway', brand_id: brandId, message: delegationError.message }, 502);
}
