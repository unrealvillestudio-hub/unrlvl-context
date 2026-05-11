/**
 * UNRLVL Brand Cache Endpoint
 * GET /api/brand-cache?brand_id=NeuroneSCF
 * GET /api/brand-cache?brand_id=NeuroneSCF&refresh=true  → bypass CDN cache
 *
 * Returns consolidated brand intelligence for the content pipeline (L0).
 * Covers stable tables only. Operational data (keywords, seo_meta, etc.)
 * is queried directly from Supabase by each lab/agent.
 *
 * Cache strategy:
 *   - CDN: s-maxage=3600 (1h fresh), stale-while-revalidate=86400 (24h stale)
 *   - ?refresh=true: no-store (bypass CDN, forces fresh fetch)
 */

export const config = { runtime: 'edge' };

const STABLE_TABLES = [
  'brand_personas',
  'brand_copy_profiles',
  'humanize_profiles',
  'compliance_rules',
  'brand_goals',
  'geomix',
  'channel_prompt_rules',
];

// Global presets — not brand-specific, fetch all rows
const GLOBAL_TABLES = [
  'psycho_presets',
];

export default async function handler(req) {
  const url = new URL(req.url);
  const brandId = url.searchParams.get('brand_id');
  const refresh = url.searchParams.get('refresh') === 'true';

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
    // Fetch stable brand-specific tables in parallel
    const brandFetches = STABLE_TABLES.map(table => {
      let query = `${base}/${table}?brand_id=eq.${encodeURIComponent(brandId)}&select=*`;
      // Add active filter where applicable
      if (['brand_personas', 'brand_copy_profiles', 'geomix'].includes(table)) {
        query += '&active=eq.true';
      }
      // Sort personas by priority
      if (table === 'brand_personas') {
        query += '&order=priority.asc';
      }
      return fetch(query, { headers: sbHeaders })
        .then(r => r.json())
        .then(data => [table, data]);
    });

    // Fetch global presets (no brand filter)
    const globalFetches = GLOBAL_TABLES.map(table =>
      fetch(`${base}/${table}?select=*`, { headers: sbHeaders })
        .then(r => r.json())
        .then(data => [table, data])
    );

    const results = await Promise.all([...brandFetches, ...globalFetches]);

    // Build response object
    const cache = {
      _meta: {
        brand_id: brandId,
        generated_at: new Date().toISOString(),
        ttl_seconds: 3600,
        stable_tables: STABLE_TABLES,
        global_tables: GLOBAL_TABLES,
        note: 'Operational data (keywords, seo_meta, pipeline_results) is not cached here. Query Supabase directly.',
      },
    };

    for (const [table, data] of results) {
      cache[table] = Array.isArray(data) ? data : [];
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
