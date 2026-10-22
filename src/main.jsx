import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { normalizar } from './router';
import { cargarPagina } from './paginas';
import './styles/main.css';

const root = document.getElementById('root');
const path = normalizar(location.pathname);
const app = <App initialPath={path} />;

// Hidrata solo si el HTML prerenderizado corresponde a esta ruta;
// si el servidor devolvió el index de respaldo (404/URL antigua), renderiza desde cero.
// Primero espera el JS de la página; si falla, queda visible el HTML prerenderizado.
cargarPagina(path).then(() => {
  if (root.hasChildNodes() && root.dataset.route === path) {
    hydrateRoot(root, app);
  } else {
    root.textContent = '';
    createRoot(root).render(app);
  }
}, () => {});
