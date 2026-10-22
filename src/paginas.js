// Cada página es un archivo JS aparte: el visitante descarga solo la que abre.
// La ruta se carga antes de hidratar (main.jsx), antes de prerenderizar (entry-server.jsx)
// y antes de navegar (router.jsx), así nunca se pinta una página a medias.

const MODULOS = import.meta.glob(['./pages/*.jsx', '!./pages/NotFound.jsx']);

// ruta → archivo en src/pages (el prerender lo usa para precargar el JS de cada página)
export const PAGINAS = {
  '/': 'Home',
  '/empresas': 'Empresas',
  '/hogar': 'Hogar',
  '/eventos': 'Eventos',
  '/maxvision': 'Maxvision',
  '/cobertura': 'Cobertura',
  '/cotizar': 'Cotizar',
  '/transparencia': 'Transparencia',
  '/contacto': 'Contacto',
};

const cargadas = {};
const pendientes = {};

export const paginaCargada = (path) => cargadas[path];

// Promesa que se resuelve cuando la página de `path` está lista (rutas desconocidas → NotFound, sin carga)
export function cargarPagina(path) {
  const nombre = PAGINAS[path];
  if (!nombre || cargadas[path]) return Promise.resolve();
  pendientes[path] ??= MODULOS[`./pages/${nombre}.jsx`]()
    .then((m) => { cargadas[path] = m.default; })
    .finally(() => { delete pendientes[path]; });
  return pendientes[path];
}
