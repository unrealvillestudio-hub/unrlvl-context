/**
 * /api/cf.js — Cloudflare API Proxy
 * Unreal>ille Studio · unrlvl-context
 *
 * Exposes Cloudflare zone operations via authenticated proxy.
 * CF_API_TOKEN and CF_ZONE_ID live in Vercel env vars — never in the chat.
 *
 * Actions:
 *   zones          → list all zones in account
 *   dns_list       → list DNS records for zone
 *   dns_create     → create a DNS record
 *   dns_update     → update a DNS record
 *   dns_delete     → delete a DNS record
 *   rules_list     → list redirect rules
 *   rules_create   → create a redirect rule
 *   rules_delete   → delete a redirect rule
 *   ssl_settings   → get SSL settings
 *   ssl_update     → update SSL/HTTPS settings
 *   email_list     → list email routing rules
 *   email_create   → create email routing rule (alias)
 *   settings_get   → get zone settings
 *   settings_update → update a zone setting
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.CF_API_TOKEN;
  const defaultZone = process.env.CF_ZONE_ID;

  if (!token) return res.status(500).json({ error: 'CF_API_TOKEN not configured' });

  const { action, zone_id, ...params } = req.method === 'POST'
    ? req.body
    : req.query;

  const zone = zone_id || defaultZone;

  const cfFetch = async (path, method = 'GET', body = null) => {
    const url = `https://api.cloudflare.com/client/v4${path}`;
    const opts = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(url, opts);
    return r.json();
  };

  try {
    let result;

    switch (action) {

      case 'zones':
        result = await cfFetch('/zones');
        break;

      case 'dns_list':
        result = await cfFetch(`/zones/${zone}/dns_records`);
        break;

      case 'dns_create':
        result = await cfFetch(`/zones/${zone}/dns_records`, 'POST', {
          type: params.type,
          name: params.name,
          content: params.content,
          ttl: params.ttl || 1,
          proxied: params.proxied !== undefined ? params.proxied : false,
        });
        break;

      case 'dns_update':
        result = await cfFetch(`/zones/${zone}/dns_records/${params.record_id}`, 'PATCH', {
          ...(params.type && { type: params.type }),
          ...(params.name && { name: params.name }),
          ...(params.content && { content: params.content }),
          ...(params.proxied !== undefined && { proxied: params.proxied }),
        });
        break;

      case 'dns_delete':
        result = await cfFetch(`/zones/${zone}/dns_records/${params.record_id}`, 'DELETE');
        break;

      // ── PAGE RULES (redirect www → apex) ─────────────────
      case 'rules_list':
        result = await cfFetch(`/zones/${zone}/pagerules?status=active`);
        break;

      case 'rules_create':
        result = await cfFetch(`/zones/${zone}/pagerules`, 'POST', {
          targets: [{
            target: 'url',
            constraint: { operator: 'matches', value: params.match },
          }],
          actions: [{
            id: 'forwarding_url',
            value: {
              url: params.target,
              status_code: params.status_code || 301,
            },
          }],
          status: 'active',
          priority: params.priority || 1,
        });
        break;

      case 'rules_delete':
        result = await cfFetch(`/zones/${zone}/pagerules/${params.rule_id}`, 'DELETE');
        break;

      // ── SSL / HTTPS ────────────────────────────────────────
      case 'ssl_settings':
        result = await cfFetch(`/zones/${zone}/settings/ssl`);
        break;

      case 'ssl_update':
        result = await cfFetch(`/zones/${zone}/settings/ssl`, 'PATCH', {
          value: params.value || 'flexible',
        });
        break;

      case 'https_always': {
        result = await cfFetch(`/zones/${zone}/settings/always_use_https`, 'PATCH', {
          value: params.value || 'on',
        });
        break;
      }

      // ── EMAIL ROUTING ──────────────────────────────────────
      case 'email_list':
        result = await cfFetch(`/zones/${zone}/email/routing/rules`);
        break;

      case 'email_create':
        result = await cfFetch(`/zones/${zone}/email/routing/rules`, 'POST', {
          name: params.name || params.alias,
          enabled: true,
          matchers: [{ type: 'literal', field: 'to', value: params.alias }],
          actions: [{ type: 'forward', value: [params.destination] }],
        });
        break;

      // ── ZONE SETTINGS ──────────────────────────────────────
      case 'settings_get':
        result = await cfFetch(`/zones/${zone}/settings`);
        break;

      case 'settings_update':
        result = await cfFetch(`/zones/${zone}/settings/${params.setting}`, 'PATCH', {
          value: params.value,
        });
        break;

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    return res.status(200).json({ action, zone, result });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
