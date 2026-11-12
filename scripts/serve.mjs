import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const port = Number(process.env.PORT || 4173);
const server = createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    const clean = decodeURIComponent(url.pathname);
    const relative = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
    let file = path.resolve(root,relative);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
    if (!path.extname(file)) file += '.html';
    let status = 200;
    try { if (!(await stat(file)).isFile()) throw new Error('Not a file'); } catch { file = path.join(root,'404.html'); status = 404; }
    res.writeHead(status,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-store'});
    res.end(await readFile(file));
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(port,'127.0.0.1',()=>console.log(`DACI preview: http://127.0.0.1:${port}`));
