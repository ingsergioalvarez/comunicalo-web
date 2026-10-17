// Servidor estático para revisar /dist igual que en producción (nginx/Apache):
// archivo → ruta/index.html → 404.html. Uso: npm run preview  (PORT=4280 por defecto)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT) || 4280;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.pdf': 'application/pdf', '.mp3': 'audio/mpeg', '.xml': 'application/xml', '.txt': 'text/plain',
};

function resolver(urlPath) {
  const limpio = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  for (const c of [limpio, path.join(limpio, 'index.html')]) {
    const f = path.join(dist, c);
    if (f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://x');
  const archivo = resolver(pathname);
  const destino = archivo || path.join(dist, '404.html');
  const tamano = fs.statSync(destino).size;
  const tipo = TIPOS[path.extname(destino)] || 'application/octet-stream';
  const rango = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (archivo && rango) {
    const ini = Number(rango[1] || 0), fin = rango[2] ? Number(rango[2]) : tamano - 1;
    res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${ini}-${fin}/${tamano}`, 'Accept-Ranges': 'bytes', 'Content-Length': fin - ini + 1 });
    return fs.createReadStream(destino, { start: ini, end: fin }).pipe(res);
  }
  res.writeHead(archivo ? 200 : 404, { 'Content-Type': tipo, 'Content-Length': tamano, 'Accept-Ranges': 'bytes' });
  fs.createReadStream(destino).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Sitio en http://127.0.0.1:${port}`));
