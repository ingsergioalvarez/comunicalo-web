// Compara los adjuntos usados en el código (doc('...')) con los archivos de public/docs.
// Uso: npm run docs:check   → sale con código 1 si falta algún archivo.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const DOCS = join(raiz, 'public', 'docs');
const SRC = join(raiz, 'src');

const listar = (dir) => {
  try {
    return readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? listar(p) : [p];
    });
  } catch {
    return [];
  }
};

const usados = new Set();
for (const archivo of listar(SRC).filter((f) => /\.(jsx?|tsx?)$/.test(f))) {
  for (const m of readFileSync(archivo, 'utf8').matchAll(/\bdoc\(\s*['"`]([^'"`]+)['"`]\s*\)/g)) usados.add(m[1]);
}
const existentes = new Set(listar(DOCS).map((f) => relative(DOCS, f).split(sep).join('/')));

const faltan = [...usados].filter((u) => !existentes.has(u)).sort();
const sobran = [...existentes].filter((e) => !usados.has(e)).sort();

console.log(`Adjuntos usados en el código: ${usados.size} · archivos en public/docs: ${existentes.size}`);
if (sobran.length) console.log(`\nSin usar (puedes borrarlos o indexarlos):\n  ${sobran.join('\n  ')}`);
if (faltan.length) {
  console.error(`\nFALTAN en public/docs (los enlaces darían 404):\n  ${faltan.join('\n  ')}`);
  process.exit(1);
}
console.log('\nOK: todos los adjuntos referenciados existen.');
