// api/send-email.js — Envío de correo genérico vía Resend
// Contrato: POST { to, subject, html | text, from? }
// Lee RESEND_API_KEY (obligatoria) y RESEND_FROM (remitente por defecto) de Vercel Env Vars.
//
// REGLA MULTIMARCA: este endpoint es EJE (la capacidad de enviar correo), no INSTANCIA.
// No conoce marcas, personas, dominios ni casos de uso. El remitente es DATO: llega en el
// cuerpo (`from`) o en la env var `RESEND_FROM`. Si no llega por ninguna vía, falla fuerte
// (400) en vez de degradar a un literal — un default cableado sería la marca N+1 rota.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Validación mínima: presencia de una arroba con algo a cada lado y sin espacios.
// El rechazo real lo hace Resend; esto solo evita llamadas obviamente inútiles.
const looksLikeEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Acepta un destinatario o una lista. Devuelve { list } o { error }.
function normalizeRecipients(to) {
  const list = Array.isArray(to) ? to : [to];
  if (list.length === 0) return { error: 'to: lista vacía' };
  if (list.length > 50) return { error: 'to: máximo 50 destinatarios por llamada' };

  // Un remitente puede venir como "Nombre <buzon@dominio>": se valida la parte entre ángulos.
  const invalid = list.filter((v) => !looksLikeEmail(v) && !looksLikeEmail(String(v).replace(/^.*<|>.*$/g, '')));
  if (invalid.length > 0) return { error: `to: direcciones inválidas: ${invalid.join(', ')}` };

  return { list: list.map((v) => String(v).trim()) };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', allowed: ['POST', 'OPTIONS'] });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'RESEND_API_KEY not configured' });

  const body = typeof req.body === 'string'
    ? (() => { try { return JSON.parse(req.body); } catch { return null; } })()
    : req.body;

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'body JSON inválido o ausente' });
  }

  const { to, subject, html, text, from } = body;

  if (!to)      return res.status(400).json({ error: 'to requerido' });
  if (!subject) return res.status(400).json({ error: 'subject requerido' });
  if (!html && !text) return res.status(400).json({ error: 'html o text requerido (al menos uno)' });

  const recipients = normalizeRecipients(to);
  if (recipients.error) return res.status(400).json({ error: recipients.error });

  // El remitente es dato, nunca literal de código. Sin `from` ni RESEND_FROM → fail-loud.
  const sender = from || process.env.RESEND_FROM;
  if (!sender) {
    return res.status(400).json({
      error: 'from requerido: no llegó en el cuerpo y RESEND_FROM no está configurada',
    });
  }

  const payload = { from: sender, to: recipients.list, subject };
  if (html) payload.html = html;
  if (text) payload.text = text;

  try {
    const resendRes = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await resendRes.json().catch(() => ({}));

    if (!resendRes.ok) {
      // Se propaga el detalle de Resend, nunca la clave.
      return res.status(resendRes.status).json({
        error: `Resend devolvió ${resendRes.status}`,
        detail: data,
      });
    }

    return res.status(200).json({
      sent: true,
      id: data.id || null,
      to: recipients.list,
      subject,
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
