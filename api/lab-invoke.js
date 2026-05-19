/**
 * UNRLVL Lab Invoke Gateway v1.0
 * GET /api/lab-invoke
 *
 * Permite a Claude invocar cualquier lab del ecosistema via GET con timeout 60s.
 * El endpoint pre-carga el brand cache para reducir el tiempo de generación en CopyLab.
 *
 * PARÁMETROS (query string):
 *   lab          string   Lab a invocar. Default: copylab
 *   brand        string   brand_id (ej: NeuroneSCF). Requerido.
 *   pack         string   Pack del lab (ej: email_sequence_abandoned_cart)
 *   position     number   Posición en la secuencia (1=Cart A, 2=Cart B). Default: 1
 *   language     string   ES | EN. Default: ES
 *   persona      string   persona_key (ej: b2c_default, b2c_color_fade)
 *   sequence_type string  Tipo de secuencia (ej: abandoned_cart, welcome)
 *   utm_content  string   UTM content del ad (ej: color-fade)
 *   dry_run      boolean  true = solo output, no guarda ni deploya. Default: true
 *   seq_id       string   sequence_id para Cart B del mismo run
 *   secret       string   CLAUDE_BRIDGE_SECRET para autenticación
 *
 * EJEMPLOS:
 *   /api/lab-invoke?lab=copylab&brand=NeuroneSCF&pack=email_sequence_abandoned_cart&position=1&language=ES&persona=b2c_default&dry_run=true
 *   /api/lab-invoke?lab=copylab&brand=NeuroneSCF&pack=email_sequence_abandoned_cart&position=2&language=ES&persona=b2c_default&seq_id=UUID&dry_run=true
 *
 * FLUJO INTERNO:
 *   1. Valida parámetros + secret
 *   2. Carga brand context desde /api/brand-cache (CDN cache 1h) → reduce queries Supabase
 *   3. Lee lab endpoint desde Supabase lab_configs
 *   4. Construye payload completo para el lab
 *   5. POST al lab con el payload
 *   6. Si dry_run=false: guarda en content_sequence_pieces + deploya a Klaviyo
 *   7. Retorna output parseado
 *
 * Cache: no-store en el gateway (cada llamada genera copy nuevo)
 * Timeout: Edge runtime Vercel Pro → hasta 60s
 */

export const config = { runtime: 'edge' };

const SELF_URL    = 'https://unrlvl-context.vercel.app';
const SB_URL_ENV  = () => process.env.SUPABASE_URL      ?? '';
const SB_KEY_ENV  = () => process.env.SUPABASE_ANON_KEY ?? '';
const BRIDGE_SECRET = () => process.env.CLAUDE_BRIDGE_SECRET ?? '';

// ── Helpers ──────────────────────────────────────────────────────────────────

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type':  'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function getLabEndpoint(labKey) {
  const res = await fetch(
    `${SB_URL_ENV()}/rest/v1/lab_configs?lab_key=eq.${labKey}&active=eq.true&select=api_endpoint,execute_path&limit=1`,
    { headers: { apikey: SB_KEY_ENV(), Authorization: `Bearer ${SB_KEY_ENV()}` } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.length) return null;
  return { url: data[0].api_endpoint, path: data[0].execute_path };
}

function parseEmailOutput(raw) {
  const extract = (marker, next) => {
    const start = raw.indexOf(`---${marker}---`);
    if (start === -1) return '';
    const from = start + `---${marker}---`.length;
    const end  = next ? raw.indexOf(`---${next}---`, from) : raw.length;
    return (end === -1 ? raw.slice(from) : raw.slice(from, end)).trim();
  };
  return {
    subject:  extract('SUBJECT', 'PREVIEW'),
    preview:  extract('PREVIEW', 'BODY'),
    body:     extract('BODY',    'CTA'),
    cta:      extract('CTA',     'END'),
    raw,
  };
}

async function getBrandCache(brandId) {
  try {
    const res = await fetch(`${SELF_URL}/api/brand-cache?brand_id=${encodeURIComponent(brandId)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function getPreviousMechanism(sequenceId, position, language) {
  if (!sequenceId || position <= 1) return null;
  try {
    const res = await fetch(
      `${SB_URL_ENV()}/rest/v1/content_sequence_pieces?sequence_id=eq.${sequenceId}&position=eq.${position - 1}&language=eq.${language}&select=mechanism_primary&limit=1`,
      { headers: { apikey: SB_KEY_ENV(), Authorization: `Bearer ${SB_KEY_ENV()}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0]?.mechanism_primary ?? null;
  } catch { return null; }
}

async function initSequenceRun(brandId, sequenceType, language) {
  try {
    const res = await fetch(
      `${SB_URL_ENV()}/rest/v1/rpc/rotate_sequence_current`,
      {
        method:  'POST',
        headers: { apikey: SB_KEY_ENV(), Authorization: `Bearer ${SB_KEY_ENV()}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({ p_brand_id: brandId, p_sequence_type: sequenceType, p_language: language }),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function savePiece(sequenceId, parsed, meta) {
  try {
    const res = await fetch(
      `${SB_URL_ENV()}/rest/v1/content_sequence_pieces`,
      {
        method:  'POST',
        headers: {
          apikey: SB_KEY_ENV(), Authorization: `Bearer ${SB_KEY_ENV()}`,
          'Content-Type': 'application/json', Prefer: 'return=representation',
        },
        body: JSON.stringify({
          sequence_id:         sequenceId,
          position:            meta.position   ?? 1,
          language:            meta.language   ?? 'ES',
          klaviyo_template_id: meta.klaviyo_template_id ?? null,
          subject:             parsed.subject,
          preview_text:        parsed.preview,
          body_html:           parsed.body,
          cta_text:            parsed.cta,
          psycho_presets:      meta.psycho_presets ?? [],
          mechanism_primary:   meta.mechanism_primary ?? null,
          status:              'ready',
          generated_by:        'claude_lab_gateway',
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data[0]?.id : data?.id ?? null;
  } catch { return null; }
}

async function deployToKlaviyo(brandId, templateId, parsed) {
  try {
    const res = await fetch(
      `${SB_URL_ENV()}/functions/v1/klaviyo-templates-v2`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SB_KEY_ENV()}` },
        body: JSON.stringify({
          brand_id:     brandId,
          template_id:  templateId,
          subject:      parsed.subject,
          preview_text: parsed.preview,
          html_body:    parsed.body,
          cta_text:     parsed.cta,
        }),
      }
    );
    return res.ok;
  } catch { return false; }
}

// PSYCHO preset defaults por sequence_type + position
function getPsychoPresets(sequenceType, position) {
  const map = {
    abandoned_cart: {
      1: ['PSY-TRUST', 'PSY-AUTHORITY', 'PSY-FOMO'],
      2: ['PSY-SOCIAL-PROOF', 'PSY-SCARCITY', 'PSY-BELONGING'],
    },
    welcome:        { 1: ['PSY-BELONGING', 'PSY-ASPIRATION', 'PSY-TRUST'] },
    post_purchase:  { 1: ['PSY-BELONGING', 'PSY-IDENTITY', 'PSY-ASPIRATION'] },
    review_request: { 1: ['PSY-SOCIAL-PROOF', 'PSY-BELONGING'] },
    win_back:       { 1: ['PSY-SOCIAL-PROOF', 'PSY-SCARCITY', 'PSY-IDENTITY'] },
  };
  return map[sequenceType]?.[position] ?? ['PSY-TRUST'];
}

// mechanism_primary defaults
function getMechanism(sequenceType, position) {
  const map = {
    abandoned_cart: { 1: 'authority_problem_reveal', 2: 'social_proof_opportunity_scarcity' },
    welcome:        { 1: 'belonging_aspiration' },
    post_purchase:  { 1: 'education_belonging' },
    review_request: { 1: 'social_proof_community' },
    win_back:       { 1: 'urgency_social_proof' },
  };
  return map[sequenceType]?.[position] ?? 'authority';
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' },
    });
  }

  const url = new URL(req.url);
  const p   = url.searchParams;

  // ── Auth ──
  const secret = p.get('secret') ?? '';
  if (BRIDGE_SECRET() && secret !== BRIDGE_SECRET()) {
    return json({ error: 'Unauthorized — secret inválido o ausente' }, 401);
  }

  // ── Parámetros ──
  const lab          = p.get('lab')           ?? 'copylab';
  const brandId      = p.get('brand')         ?? '';
  const pack         = p.get('pack')          ?? 'email_sequence_abandoned_cart';
  const position     = parseInt(p.get('position') ?? '1', 10);
  const language     = p.get('language')      ?? 'ES';
  const personaKey   = p.get('persona')       ?? 'b2c_default';
  const sequenceType = p.get('sequence_type') ?? 'abandoned_cart';
  const utmContent   = p.get('utm_content')   ?? null;
  const dryRun       = p.get('dry_run') !== 'false';   // default true
  const seqIdOverride = p.get('seq_id')       ?? null;
  const klaviyoTemplateId = p.get('klaviyo_template_id') ?? null;

  if (!brandId) return json({ error: 'brand es requerido. Ej: ?brand=NeuroneSCF' }, 400);

  // ── Obtener endpoint del lab ──
  const endpoint = await getLabEndpoint(lab);
  if (!endpoint) return json({ error: `Lab '${lab}' no encontrado o inactivo en lab_configs` }, 404);

  // ── Brand cache (reduce queries en CopyLab) ──
  const brandContext = await getBrandCache(brandId);

  // ── Sequence awareness: leer mechanism de pieza anterior ──
  let previousMechanism = null;
  if (position > 1 && seqIdOverride) {
    previousMechanism = await getPreviousMechanism(seqIdOverride, position, language);
  }

  // ── Construir payload ──
  const payload = {
    brandId,
    stage: {
      labId:       lab,
      label:       `${sequenceType} pos.${position} ${language}`,
      description: `Email sequence ${sequenceType} — position ${position} — ${language}`,
      order:       position,
    },
    params: {
      pack,
      canal:   'email',
      idioma:  language,
    },
    meta: {
      motor:             'claude',
      sequence_type:     sequenceType,
      position,
      language,
      persona_key:       personaKey,
      psycho_presets:    getPsychoPresets(sequenceType, position),
      mechanism_primary: getMechanism(sequenceType, position),
      utm_content:       utmContent,
      previous_mechanism: previousMechanism,
    },
    previousOutputs: {
      ...(brandContext ? { brandContext } : {}),
      ...(seqIdOverride ? { sequence_id: seqIdOverride } : {}),
    },
  };

  // ── Llamar al lab ──
  let labData;
  try {
    const labRes = await fetch(`${endpoint.url}${endpoint.path}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!labRes.ok) {
      const errText = await labRes.text();
      return json({
        error:        `Lab respondió ${labRes.status}`,
        detail:       errText.slice(0, 800),
        lab,
        brand:        brandId,
        pack,
        position,
        language,
      }, 502);
    }

    labData = await labRes.json();
  } catch (err) {
    return json({ error: `Error llamando a ${lab}: ${err.message}` }, 500);
  }

  const rawOutput = labData.output ?? '';
  const isEmail   = rawOutput.includes('---SUBJECT---');
  const parsed    = isEmail ? parseEmailOutput(rawOutput) : null;

  // ── DRY RUN: solo retornar ──
  if (dryRun || !isEmail) {
    return json({
      status:      'ok',
      dry_run:     true,
      brand:       brandId,
      lab,
      pack,
      position,
      language,
      persona:     personaKey,
      sequence_type: sequenceType,
      lab_status:  labData.status,
      output:      rawOutput,
      parsed,
      cache_hit:   !!brandContext,
    });
  }

  // ── LIVE: guardar + deployar ──
  const sequenceId = seqIdOverride ?? await initSequenceRun(brandId, sequenceType, language);

  let pieceId = null;
  if (sequenceId && parsed) {
    pieceId = await savePiece(sequenceId, parsed, {
      position,
      language,
      klaviyo_template_id:  klaviyoTemplateId,
      psycho_presets:       getPsychoPresets(sequenceType, position),
      mechanism_primary:    getMechanism(sequenceType, position),
    });
  }

  let klaviyoDeployed = false;
  if (klaviyoTemplateId && parsed) {
    klaviyoDeployed = await deployToKlaviyo(brandId, klaviyoTemplateId, parsed);
  }

  return json({
    status:            'ok',
    dry_run:           false,
    brand:             brandId,
    lab,
    pack,
    position,
    language,
    persona:           personaKey,
    sequence_type:     sequenceType,
    sequence_id:       sequenceId,
    piece_id:          pieceId,
    klaviyo_deployed:  klaviyoDeployed,
    klaviyo_template:  klaviyoTemplateId,
    output:            rawOutput,
    parsed,
    cache_hit:         !!brandContext,
  });
}
