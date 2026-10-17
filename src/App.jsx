import React, { useEffect } from 'react';
import { Router, useRouter } from './router';
import { ROUTES, NOT_FOUND, rutaLegada } from './routes';
import Layout from './components/Layout';
import Home from './pages/Home';
import Empresas from './pages/Empresas';
import Hogar from './pages/Hogar';
import Eventos from './pages/Eventos';
import Maxvision from './pages/Maxvision';
import Cobertura from './pages/Cobertura';
import Cotizar from './pages/Cotizar';
import Transparencia from './pages/Transparencia';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

const PAGINAS = {
  '/': Home,
  '/empresas': Empresas,
  '/hogar': Hogar,
  '/eventos': Eventos,
  '/maxvision': Maxvision,
  '/cobertura': Cobertura,
  '/cotizar': Cotizar,
  '/transparencia': Transparencia,
  '/contacto': Contacto,
};

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function Paginas() {
  const { path, search, navigate } = useRouter();

  // Redirige URLs del sitio anterior (index.php?accion=..., *.html)
  useEffect(() => {
    const destino = rutaLegada(location.pathname, location.search);
    if (destino) navigate(destino, { replace: true });
  }, [navigate]);

  const Pagina = PAGINAS[path] || NotFound;
  const meta = ROUTES[path] || NOT_FOUND;

  useEffect(() => {
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', `https://comunicalo.mx${path === '/' ? '/' : path}`);
  }, [meta, path]);

  // El cotizador se reinicia si cambia el servicio en la URL
  return <Pagina key={path === '/cotizar' ? search : path} />;
}

export default function App({ initialPath = '/', initialSearch = '' }) {
  return (
    <Router initialPath={initialPath} initialSearch={initialSearch}>
      <Layout>
        <Paginas />
      </Layout>
    </Router>
  );
}

export const RUTAS_PRERENDER = Object.keys(PAGINAS);
