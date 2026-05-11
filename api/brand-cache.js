/**
 * UNRLVL Brand Cache Endpoint v1.2
 * GET /api/brand-cache?brand_id=NeuroneSCF
 * GET /api/brand-cache?brand_id=NeuroneSCF&refresh=true   → bypass CDN cache
 * GET /api/brand-cache?brand_id=NeuroneSCF&debug=true     → muestra errores Supabase raw
 *
 * Returns consolidated brand intelligence for the content pipeline (L0).
 * Stable tables only. Operational data (keywords, seo_meta, pipeline_results)
 * is queried directly from Supabase by each lab/agent.
 *
 * Cache: s-maxage=3600 (1h fresh), stale-while-revalidate=86400 (24h stale)
 */

export const config = { runtime: 'edge' };

// Brand-specific tables (filtered by brand_id)
const BRAND_TABLES = [
  'brand_personas',
  'brand_copy_profiles',
  'humanize_profiles',
  'compliance_rules',
  'brand_goals',
  'geomix',
];

// Global tables (no brand filter — channel/system-level data)
const GLOBAL_TABLES = [
  'psycho_presets',
  'channel_prompt_rules',
];

// Tables where we filter active=is.true
const ACTIVE_FILTER_TABLES = ['brand_personas', 'brand_copy_profiles', 'geomix'];

export default async function handler(req) {
  const url = new URL(req.url);
  const brandId = url.searchParams.get('brand_id');
  const refresh = url.searchParams.get('refresh') === 'true';
  const debug = url.searchParams.get('debug') === 'true';

  if (!brandId) {
    return json({ error: 'brand_id is required. Example: /api/brand-cache?brand_id=NeuroneSCF' }, 400);
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return json({ error: 'SUPABASE_URL or SUPABASE_ANON_KEY env vars not configured' }, 500);
  }

  const sbHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  const base = `${SUPABASE_URL}/rest/v1`;

  try {
    // Brand-specific fetches
    const brandFetches = BRAND_TABLES.map(async table => {
      let q = `${base}/${table}?brand_id=eq.${encodeURIComponent(brandId)}&select=*`;
      if (ACTIVE_FILTER_TABLES.includes(table)) q += '&active=is.true';
      if (table === 'brand_personas') q += '&order=priority.asc';
      const res = await fetch(q, { headers: sbHeaders });
      const data = await res.json();
      return [table, res.status, data];
    });

    // Global fetches (no brand filter)
    const globalFetches = GLOBAL_TABLES.map(async table => {
      const res = await fetch(`${base}/${table}?select=*`, { headers: sbHeaders });
      const data = await res.json();
      return [table, res.status, data];
    });

    const results = await Promise.all([...brandFetches, ...globalFetches]);

    const cache = {
      _meta: {
        brand_id: brandId,
        generated_at: new Date().toISOString(),
        ttl_seconds: 3600,
        brand_tables: BRAND_TABLES,
        global_tables: GLOBAL_TABLES,
        note: 'Operational data (keywords, seo_meta, pipeline_results) queries Supabase directly.',
      },
    };

    const errors = {};

    for (const [table, status, data] of results) {
      if (status === 200 && Array.isArray(data)) {
        cache[table] = data;
      } else {
        cache[table] = [];
        errors[table] = { status, response: data };
      }
    }

    if (debug && Object.keys(errors).length > 0) {
      cache._errors = errors;
    }

    const cacheControl = refresh
      ? 'no-store'
      : 's-maxage=3600, stale-while-revalidate=86400';

    return new Response(JSON.stringify(cache, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControl,
        'Access-Control-Allow-Origin': '*',
        'X-Brand-Id': brandId,
        'X-Cache-Refreshed': refresh ? 'true' : 'false',
        'X-Errors': Object.keys(errors).length > 0 ? Object.keys(errors).join(',') : 'none',
      },
    });
  } catch (err) {
    return json({ error: err.message, brand_id: brandId }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
