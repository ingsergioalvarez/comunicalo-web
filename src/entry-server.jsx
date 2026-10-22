import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { RUTAS_PRERENDER } from './App';
import { ROUTES, TITULO_PESTANA } from './routes';

export function render(path) {
  return renderToString(<App initialPath={path} />);
}

export { RUTAS_PRERENDER, ROUTES, TITULO_PESTANA };
