import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { RUTAS_PRERENDER } from './App';
import { cargarPagina, PAGINAS } from './paginas';
import { ROUTES, TITULO_PESTANA } from './routes';

export async function render(path) {
  await cargarPagina(path);
  return renderToString(<App initialPath={path} />);
}

export { RUTAS_PRERENDER, ROUTES, TITULO_PESTANA, PAGINAS };
