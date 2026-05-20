// api/professor.js — Professor System proxy for Claude
// Reads PROFESSOR_SECRET from Vercel Environment Variables
// Forwards requests to Supabase Edge Functions with auth header
// Actions: ping | get-context | checkpoint | evaluate | log-case | submit-learning | approve-learning

const SB_PROJECT = 'amlvyycfepwhiindxgzw';
const SB_BASE    = `https://${SB_PROJECT}.supabase.co/functions/v1`;

const EF_MAP = {
  'ping':             { ef: 'professor-checkpoint', method: 'GET' },
  'get-context':      { ef: 'professor-get-context', method: 'GET' },
  'checkpoint':       { ef: 'professor-checkpoint', method: 'POST' },
  'evaluate':         { ef: 'professor-evaluate-decision', method: 'POST' },
  'log-case':         { ef: 'professor-log-case', method: 'POST' },
  'submit-learning':  { ef: 'professor-submit-learning', method: 'POST' },
  'approve-learning': { ef: 'professor-approve-learning', method: 'POST' },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const secret = process.env.PROFESSOR_SECRET;
  if (!secret) return res.status(500).json({ error: 'PROFESSOR_SECRET not configured' });

  const params  = req.method === 'POST' ? req.body : req.query;
  const { action, ...payload } = params;

  if (!action) return res.status(400).json({
    error: 'action required',
    available: Object.keys(EF_MAP),
  });

  const target = EF_MAP[action];
  if (!target) return res.status(400).json({
    error: `Unknown action: ${action}`,
    available: Object.keys(EF_MAP),
  });

  try {
    const opts = {
      method: target.method,
      headers: {
        'Authorization': `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
    };

    // Pass payload as body for POST actions
    if (target.method === 'POST' && Object.keys(payload).length > 0) {
      opts.body = JSON.stringify(payload);
    }

    const efRes  = await fetch(`${SB_BASE}/${target.ef}`, opts);
    const data   = await efRes.json().catch(() => ({}));

    if (!efRes.ok) {
      return res.status(efRes.status).json({
        error: `EF ${target.ef} returned ${efRes.status}`,
        detail: data,
      });
    }

    return res.status(200).json({ action, ef: target.ef, ...data });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
