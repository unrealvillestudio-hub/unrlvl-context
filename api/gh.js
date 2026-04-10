// api/gh.js — GitHub API proxy for Claude
// Reads GH_PAT from Vercel Environment Variables

const ORG = 'unrealvillestudio-hub';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token = process.env.GH_PAT;
  if (!token) return res.status(500).json({ error: 'GH_PAT not configured' });

  const { repo, path = '/', action = 'tree', branch = 'main' } = req.query;

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'UNRLVL-Context-System'
  };

  try {
    // List all repos — no repo param needed
    if (action === 'repos') {
      const url = `https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=updated`;
      const r = await fetch(url, { headers });
      if (!r.ok) return res.status(r.status).json({ error: `GitHub ${r.status}` });
      const data = await r.json();
      return res.status(200).json({
        org: ORG,
        repos: data.map(r => ({ name: r.name, private: r.private, updated: r.updated_at, default_branch: r.default_branch }))
      });
    }

    // All other actions require repo
    if (!repo) return res.status(400).json({ error: 'repo param required' });

    if (action === 'file') {
      const url = `https://api.github.com/repos/${ORG}/${repo}/contents${path}?ref=${branch}`;
      const r = await fetch(url, { headers });
      if (!r.ok) return res.status(r.status).json({ error: `GitHub ${r.status}`, path });
      const data = await r.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return res.status(200).json({ repo, path, content, sha: data.sha, size: data.size });
    }

    if (action === 'tree') {
      const url = `https://api.github.com/repos/${ORG}/${repo}/git/trees/${branch}?recursive=1`;
      const r = await fetch(url, { headers });
      if (!r.ok) return res.status(r.status).json({ error: `GitHub ${r.status}`, repo });
      const data = await r.json();
      const files = data.tree
        .filter(f => f.type === 'blob')
        .map(f => ({ path: f.path, size: f.size }));
      return res.status(200).json({ repo, branch, count: files.length, files });
    }

    return res.status(400).json({ error: 'action must be: tree | file | repos' });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
