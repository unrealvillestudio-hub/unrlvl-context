// api/gh.js — GitHub API proxy for Claude
// Reads GH_PAT from Vercel Environment Variables
// Actions: tree | file | repos | file_delete | file_write | file_move | tree_sha

const ORG = 'unrealvillestudio-hub';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.GH_PAT;
  if (!token) return res.status(500).json({ error: 'GH_PAT not configured' });

  // Support both GET params and POST body
  const params = req.method === 'POST'
    ? req.body
    : req.query;

  const { repo, path = '/', action = 'tree', branch = 'main', ...rest } = params;

  const ghHeaders = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'UNRLVL-Context-System',
    'Content-Type': 'application/json',
  };

  const ghFetch = async (url, method = 'GET', body = null) => {
    const opts = { method, headers: ghHeaders };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(url, opts);
    const data = await r.json();
    return { ok: r.ok, status: r.status, data };
  };

  // Helper: get file SHA from Contents API
  const getFileSha = async (repoName, filePath, ref = 'main') => {
    const url = `https://api.github.com/repos/${ORG}/${repoName}/contents/${filePath.replace(/^\//, '')}?ref=${ref}`;
    const { ok, data } = await ghFetch(url);
    if (!ok) return null;
    return data.sha;
  };

  try {

    // ── READ ACTIONS ──────────────────────────────────────────

    if (action === 'repos') {
      const url = `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,organization_member`;
      const { ok, status, data } = await ghFetch(url);
      if (!ok) return res.status(status).json({ error: `GitHub ${status}` });
      const filtered = data.filter(r => r.owner.login === ORG);
      return res.status(200).json({
        org: ORG, count: filtered.length,
        repos: filtered.map(r => ({ name: r.name, private: r.private, updated: r.updated_at, default_branch: r.default_branch, description: r.description }))
      });
    }

    if (!repo) return res.status(400).json({ error: 'repo param required' });

    if (action === 'file') {
      const url = `https://api.github.com/repos/${ORG}/${repo}/contents${path.startsWith('/') ? path : '/' + path}?ref=${branch}`;
      const { ok, status, data } = await ghFetch(url);
      if (!ok) return res.status(status).json({ error: `GitHub ${status}`, path });
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return res.status(200).json({ repo, path, content, sha: data.sha, size: data.size });
    }

    if (action === 'tree') {
      const url = `https://api.github.com/repos/${ORG}/${repo}/git/trees/${branch}?recursive=1`;
      const { ok, status, data } = await ghFetch(url);
      if (!ok) return res.status(status).json({ error: `GitHub ${status}`, repo });
      const files = data.tree.filter(f => f.type === 'blob').map(f => ({ path: f.path, size: f.size, sha: f.sha }));
      return res.status(200).json({ repo, branch, count: files.length, files });
    }

    // ── WRITE ACTIONS ─────────────────────────────────────────

    if (action === 'file_delete') {
      // Delete a file. Gets SHA automatically.
      const filePath = (rest.file_path || path).replace(/^\//, '');
      const message = rest.message || `chore: delete ${filePath}`;

      const sha = await getFileSha(repo, filePath, branch);
      if (!sha) return res.status(404).json({ error: `File not found: ${filePath}` });

      const url = `https://api.github.com/repos/${ORG}/${repo}/contents/${filePath}`;
      const { ok, status, data } = await ghFetch(url, 'DELETE', { message, sha, branch });
      if (!ok) return res.status(status).json({ error: `GitHub ${status}`, detail: data });
      return res.status(200).json({ deleted: filePath, repo, commit: data.commit?.sha });
    }

    if (action === 'file_write') {
      // Create or update a file
      const filePath = (rest.file_path || path).replace(/^\//, '');
      const message = rest.message || `chore: update ${filePath}`;
      const content = Buffer.from(rest.content || '').toString('base64');

      // Check if file exists to get SHA for update
      const existingSha = await getFileSha(repo, filePath, branch);

      const body = { message, content, branch };
      if (existingSha) body.sha = existingSha;

      const url = `https://api.github.com/repos/${ORG}/${repo}/contents/${filePath}`;
      const { ok, status, data } = await ghFetch(url, 'PUT', body);
      if (!ok) return res.status(status).json({ error: `GitHub ${status}`, detail: data });
      return res.status(200).json({ written: filePath, repo, commit: data.commit?.sha, action: existingSha ? 'updated' : 'created' });
    }

    if (action === 'file_move') {
      // Move = read content + write to new path + delete old path
      const fromPath = (rest.from_path || path).replace(/^\//, '');
      const toPath = (rest.to_path || '').replace(/^\//, '');
      if (!toPath) return res.status(400).json({ error: 'to_path required for file_move' });
      const message = rest.message || `chore: move ${fromPath} → ${toPath}`;

      // Read source
      const srcUrl = `https://api.github.com/repos/${ORG}/${repo}/contents/${fromPath}?ref=${branch}`;
      const { ok: srcOk, data: srcData } = await ghFetch(srcUrl);
      if (!srcOk) return res.status(404).json({ error: `Source not found: ${fromPath}` });

      // Write to destination
      const destExistingSha = await getFileSha(repo, toPath, branch);
      const destBody = { message: `${message} [write]`, content: srcData.content.replace(/\n/g, ''), branch };
      if (destExistingSha) destBody.sha = destExistingSha;

      const destUrl = `https://api.github.com/repos/${ORG}/${repo}/contents/${toPath}`;
      const { ok: destOk, status: destStatus, data: destData } = await ghFetch(destUrl, 'PUT', destBody);
      if (!destOk) return res.status(destStatus).json({ error: `Failed to write destination: ${destStatus}`, detail: destData });

      // Delete source
      const delUrl = `https://api.github.com/repos/${ORG}/${repo}/contents/${fromPath}`;
      const { ok: delOk, data: delData } = await ghFetch(delUrl, 'DELETE', { message: `${message} [delete source]`, sha: srcData.sha, branch });
      if (!delOk) return res.status(500).json({ error: 'Written to dest but failed to delete source', detail: delData });

      return res.status(200).json({ moved: true, from: fromPath, to: toPath, repo, commit: delData.commit?.sha });
    }

    if (action === 'file_delete_batch') {
      // Delete multiple files at once
      const files = rest.files ? (typeof rest.files === 'string' ? JSON.parse(rest.files) : rest.files) : [];
      const results = [];
      for (const filePath of files) {
        const cleanPath = filePath.replace(/^\//, '');
        const sha = await getFileSha(repo, cleanPath, branch);
        if (!sha) { results.push({ path: cleanPath, status: 'not_found' }); continue; }
        const url = `https://api.github.com/repos/${ORG}/${repo}/contents/${cleanPath}`;
        const { ok, data } = await ghFetch(url, 'DELETE', { message: `chore: cleanup - delete ${cleanPath}`, sha, branch });
        results.push({ path: cleanPath, status: ok ? 'deleted' : 'error', commit: data.commit?.sha });
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 300));
      }
      return res.status(200).json({ repo, results, deleted: results.filter(r => r.status === 'deleted').length, errors: results.filter(r => r.status === 'error').length });
    }

    return res.status(400).json({ error: 'action must be: tree | file | repos | file_delete | file_write | file_move | file_delete_batch' });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
