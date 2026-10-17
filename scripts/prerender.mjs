// Genera HTML estático por ruta (SEO + carga instantánea), sitemap.xml, robots.txt y 404.html.
// Se ejecuta después de "vite build" y "vite build --ssr".
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(raiz, 'dist');
const ssrDir = path.join(raiz, '.ssr');
const SITE = 'https://comunicalo.mx';

const { render, RUTAS_PRERENDER, ROUTES } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const plantilla = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Comunícalo de México',
  legalName: 'Comunícalo de México S.A. de C.V.',
  url: SITE,
  logo: `${SITE}/img/logo-comunicalo.png`,
  image: `${SITE}/img/logo-comunicalo.png`,
  email: 'ventas@comunicalo.mx',
  telephone: '+52-55-2601-4888',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Convento de Churubusco #4, Col. Jardines de Santa Mónica',
    addressLocality: 'Tlalnepantla de Baz',
    addressRegion: 'Estado de México',
    postalCode: '54050',
    addressCountry: 'MX',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  areaServed: ['Ciudad de México', 'Estado de México', 'Hidalgo'],
  sameAs: ['https://www.facebook.com/Comun%C3%ADcalo-de-M%C3%A9xico-834196273400398/', 'https://twitter.com/ComunicaloMx'],
};

function pagina(ruta, meta, html) {
  const canonical = `${SITE}${ruta === '/' ? '/' : ruta}`;
  let out = plantilla
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(meta.description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(meta.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(meta.description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${canonical}"`)
    .replace('<!--head-->', `<meta property="og:url" content="${canonical}" />${ruta === '/' ? `\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}`)
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-route="${ruta}">${html}</div>`);
  return out;
}

for (const ruta of RUTAS_PRERENDER) {
  const html = pagina(ruta, ROUTES[ruta], render(ruta));
  const destino = ruta === '/' ? path.join(dist, 'index.html') : path.join(dist, ruta.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, html);
  console.log(`  prerender ${ruta.padEnd(16)} ${(html.length / 1024).toFixed(1)} KB`);
}

// 404: se sirve con contenido de "no encontrado"; el cliente re-renderiza según la URL real
// (así también funcionan las redirecciones de URLs antiguas).
const html404 = pagina('/404', { title: 'Página no encontrada | Comunícalo', description: 'La página que buscas no existe.' }, render('/404'))
  .replace('data-route="/404"', 'data-route=""')
  .replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />');
fs.writeFileSync(path.join(dist, '404.html'), html404);

const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${RUTAS_PRERENDER.map(
    (r) => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc><lastmod>${hoy}</lastmod><priority>${r === '/' ? '1.0' : '0.8'}</priority></url>`
  ).join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`  ✓ ${RUTAS_PRERENDER.length} páginas + 404, sitemap.xml y robots.txt`);
