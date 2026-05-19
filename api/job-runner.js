/**
 * UNRLVL Job Runner v1.0
 * GET /api/job-runner
 *
 * Vercel Cron — se ejecuta cada minuto y procesa lab_jobs pendientes.
 * También invocable manualmente via GET con el secret para testing.
 *
 * Es el jobRunner de Ayra Sprint 2 — procesa 1 job a la vez, en orden FIFO.
 * Timeout: 300s (Vercel Pro) — suficiente para CopyLab + Claude.
 *
 * Flujo:
 *   1. Lee el job pendiente más antiguo de lab_jobs
 *   2. Lo marca como 'processing'
 *   3. Carga brand context desde /api/brand-cache
 *   4. Construye payload y llama al lab
 *   5. Parsea el output
 *   6. Si dry_run=false: guarda en content_sequence_pieces + deploya a Klaviyo
 *   7. Marca job como completed | failed
 */

export const config = {
  runtime: 'edge',
  maxDuration: 300,
};

const SB_URL       = () => process.env.SUPABASE_URL      ?? '';
const SB_ANON      = () => process.env.SUPABASE_ANON_KEY ?? '';
const RUNNER_SECRET = () => process.env.CLAUDE_BRIDGE_SECRET ?? '';
const SELF_URL     = 'https://unrlvl-context.vercel.app';

// ── Supabase helpers ──────────────────────────────────────────────────────

function sbHeaders() {
  return {
    apikey: SB_ANON(),
    Authorization: `Bearer ${SB_ANON()}`,
    'Content-Type': 'application/json',
  };
}

async function sbGet(path) {
  const res = await fetch(`${SB_URL()}/rest/v1/${path}`, { headers: sbHeaders() });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data[0] ?? null : data;
}

async function sbPatch(path, body) {
  const res = await fetch(`${SB_URL()}/rest/v1/${path}`, {
    method: 'PATCH',
    headers: sbHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error(`[job-runner] sbPatch ${path} → ${res.status}`, await res.text());
}

async function getLabEndpoint(labKey) {
  const res = await fetch(
    `${SB_URL()}/rest/v1/lab_configs?lab_key=eq.${labKey}&active=eq.true&select=api_endpoint,execute_path&limit=1`,
    { headers: sbHeaders() }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.length ? { url: data[0].api_endpoint, path: data[0].execute_path } : null;
}

// ── Brand cache ──────────────────────────────────────────────────────────

async function getBrandCache(brandId) {
  try {
    const res = await fetch(`${SELF_URL}/api/brand-cache?brand_id=${encodeURIComponent(brandId)}`);
    return res.ok ? await res.json() : null;
  } catch { return null; }
}

// ── Email helpers ─────────────────────────────────────────────────────────

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
  };
}

function getPsychoPresets(seqType, position) {
  const map = {
    abandoned_cart: { 1: ['PSY-TRUST','PSY-AUTHORITY','PSY-FOMO'], 2: ['PSY-SOCIAL-PROOF','PSY-SCARCITY','PSY-BELONGING'] },
    welcome:        { 1: ['PSY-BELONGING','PSY-ASPIRATION','PSY-TRUST'] },
    post_purchase:  { 1: ['PSY-BELONGING','PSY-IDENTITY','PSY-ASPIRATION'] },
    review_request: { 1: ['PSY-SOCIAL-PROOF','PSY-BELONGING'] },
    win_back:       { 1: ['PSY-SOCIAL-PROOF','PSY-SCARCITY','PSY-IDENTITY'] },
  };
  return map[seqType]?.[position] ?? ['PSY-TRUST'];
}

function getMechanism(seqType, position) {
  const map = {
    abandoned_cart: { 1: 'authority_problem_reveal', 2: 'social_proof_opportunity_scarcity' },
    welcome:        { 1: 'belonging_aspiration' },
    post_purchase:  { 1: 'education_belonging' },
    review_request: { 1: 'social_proof_community' },
    win_back:       { 1: 'urgency_social_proof' },
  };
  return map[seqType]?.[position] ?? 'authority';
}

async function getPreviousMechanism(seqId, position, language) {
  if (!seqId || position <= 1) return null;
  const res = await fetch(
    `${SB_URL()}/rest/v1/content_sequence_pieces?sequence_id=eq.${seqId}&position=eq.${position-1}&language=eq.${language}&select=mechanism_primary&limit=1`,
    { headers: sbHeaders() }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data[0]?.mechanism_primary ?? null;
}

async function initSequenceRun(brandId, seqType, language) {
  const res = await fetch(`${SB_URL()}/rest/v1/rpc/rotate_sequence_current`, {
    method: 'POST',
    headers: sbHeaders(),
    body: JSON.stringify({ p_brand_id: brandId, p_sequence_type: seqType, p_language: language }),
  });
  return res.ok ? await res.json() : null;
}

async function savePiece(sequenceId, parsed, meta) {
  const res = await fetch(`${SB_URL()}/rest/v1/content_sequence_pieces`, {
    method: 'POST',
    headers: { ...sbHeaders(), Prefer: 'return=representation' },
    body: JSON.stringify({
      sequence_id:         sequenceId,
      position:            meta.position     ?? 1,
      language:            meta.language     ?? 'ES',
      klaviyo_template_id: meta.klaviyo_template_id ?? null,
      subject:             parsed.subject,
      preview_text:        parsed.preview,
      body_html:           parsed.body,
      cta_text:            parsed.cta,
      psycho_presets:      meta.psycho_presets ?? [],
      mechanism_primary:   meta.mechanism_primary ?? null,
      status:              'ready',
      generated_by:        'job_runner',
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data[0]?.id : data?.id ?? null;
}

async function deployToKlaviyo(brandId, templateId, parsed) {
  const res = await fetch(`${SB_URL()}/functions/v1/klaviyo-templates-v2`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SB_ANON()}` },
    body: JSON.stringify({
      brand_id:     brandId,
      template_id:  templateId,
      subject:      parsed.subject,
      preview_text: parsed.preview,
      html_body:    parsed.body,
      cta_text:     parsed.cta,
    }),
  });
  return res.ok;
}

// ── Process one job ───────────────────────────────────────────────────────

async function processJob(job) {
  const jobId = job.id;
  console.log(`[job-runner] Processing ${jobId} — ${job.sequence_type} pos.${job.position} ${job.language}`);

  await sbPatch(`lab_jobs?id=eq.${jobId}`, {
    status: 'processing',
    claimed_at: new Date().toISOString(),
  });

  try {
    const [brandContext, endpoint] = await Promise.all([
      getBrandCache(job.brand_id),
      getLabEndpoint(job.lab),
    ]);

    if (!endpoint) throw new Error(`Lab '${job.lab}' no encontrado en lab_configs`);

    const previousMechanism = job.seq_id
      ? await getPreviousMechanism(job.seq_id, job.position, job.language)
      : null;

    const payload = {
      brandId: job.brand_id,
      stage: {
        labId:       job.lab,
        label:       `${job.sequence_type} pos.${job.position} ${job.language}`,
        description: `Email sequence ${job.sequence_type} — position ${job.position}`,
        order:       job.position,
      },
      params: {
        pack:   job.pack,
        canal:  'email',
        idioma: job.language,
      },
      meta: {
        motor:              'claude',
        sequence_type:      job.sequence_type,
        position:           job.position,
        language:           job.language,
        persona_key:        job.persona_key,
        psycho_presets:     getPsychoPresets(job.sequence_type, job.position),
        mechanism_primary:  getMechanism(job.sequence_type, job.position),
        utm_content:        job.utm_content ?? null,
        previous_mechanism: previousMechanism,
      },
      previousOutputs: {
        ...(brandContext ? { brandContext } : {}),
        ...(job.seq_id  ? { sequence_id: job.seq_id } : {}),
      },
    };

    console.log(`[job-runner] → ${endpoint.url}${endpoint.path}`);
    const labRes = await fetch(`${endpoint.url}${endpoint.path}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!labRes.ok) throw new Error(`Lab ${labRes.status}: ${(await labRes.text()).slice(0, 400)}`);

    const labData   = await labRes.json();
    const rawOutput = labData.output ?? '';
    const isEmail   = rawOutput.includes('---SUBJECT---');
    const parsed    = isEmail ? parseEmailOutput(rawOutput) : null;

    console.log(`[job-runner] Output received. isEmail=${isEmail} subject="${parsed?.subject?.slice(0, 50)}"`);

    let sequenceId  = job.seq_id ?? null;
    let pieceId     = null;
    let klaviyoOk   = false;

    if (!job.dry_run && isEmail && parsed) {
      if (!sequenceId) sequenceId = await initSequenceRun(job.brand_id, job.sequence_type, job.language);
      if (sequenceId) {
        pieceId = await savePiece(sequenceId, parsed, {
          position:            job.position,
          language:            job.language,
          klaviyo_template_id: job.klaviyo_template_id,
          psycho_presets:      getPsychoPresets(job.sequence_type, job.position),
          mechanism_primary:   getMechanism(job.sequence_type, job.position),
        });
      }
      if (job.klaviyo_template_id && parsed) {
        klaviyoOk = await deployToKlaviyo(job.brand_id, job.klaviyo_template_id, parsed);
      }
    }

    await sbPatch(`lab_jobs?id=eq.${jobId}`, {
      status:       'completed',
      output_raw:   rawOutput,
      output_parsed: parsed ? {
        subject:          parsed.subject,
        preview:          parsed.preview,
        body:             parsed.body,
        cta:              parsed.cta,
        sequence_id:      sequenceId,
        piece_id:         pieceId,
        klaviyo_deployed: klaviyoOk,
      } : labData,
      completed_at: new Date().toISOString(),
    });

    return {
      success: true,
      jobId,
      summary: parsed
        ? `✅ ${job.sequence_type} pos.${job.position} ${job.language} — "${parsed.subject.slice(0, 60)}"`
        : `✅ Job completado sin email output`,
    };

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[job-runner] ❌ ${msg}`);
    await sbPatch(`lab_jobs?id=eq.${jobId}`, {
      status:       'failed',
      error_msg:    msg,
      completed_at: new Date().toISOString(),
    });
    return { success: false, jobId, summary: `❌ ${msg}` };
  }
}

// ── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req) {
  const CORS = {
    'Content-Type':                'application/json',
    'Cache-Control':               'no-store',
    'Access-Control-Allow-Origin': '*',
  };

  // Auth — acepta el secret de Vercel Cron o el CLAUDE_BRIDGE_SECRET
  const url    = new URL(req.url);
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')
    ?? url.searchParams.get('secret')
    ?? '';

  const isCronRequest = req.headers.get('x-vercel-cron') === '1';

  if (!isCronRequest && RUNNER_SECRET() && secret !== RUNNER_SECRET()) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS });
  }

  // Leer el job pendiente más antiguo
  const job = await sbGet(
    'lab_jobs?status=eq.pending&order=created_at.asc&limit=1'
  );

  if (!job) {
    return new Response(JSON.stringify({ status: 'idle', message: 'No hay jobs pendientes' }), {
      status: 200,
      headers: CORS,
    });
  }

  const result = await processJob(job);

  return new Response(JSON.stringify(result), { status: 200, headers: CORS });
}
