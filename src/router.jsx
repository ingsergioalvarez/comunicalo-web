import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Router mínimo basado en History API. Funciona en servidor (prerender) y cliente.

const RouterContext = createContext({ path: '/', search: '', navigate: () => {} });

export const normalizar = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

function scrollAlAncla(hash) {
  const el = hash && document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.scrollTo(0, 0);
}

export function Router({ initialPath, initialSearch = '', children }) {
  const [loc, setLoc] = useState({ path: normalizar(initialPath), search: initialSearch });

  useEffect(() => {
    const onPop = () => setLoc({ path: normalizar(location.pathname), search: location.search });
    window.addEventListener('popstate', onPop);
    // El prerender no conoce la query (?servicio=...): se aplica después de hidratar
    if (location.search) onPop();
    if (location.hash) setTimeout(() => scrollAlAncla(location.hash.slice(1)), 60);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, location.origin);
    const path = normalizar(url.pathname);
    const mismaRuta = path === normalizar(location.pathname) && url.search === location.search;
    if (!mismaRuta || url.hash !== location.hash) {
      history[replace ? 'replaceState' : 'pushState']({}, '', path + url.search + url.hash);
    }
    setLoc({ path, search: url.search });
    const hash = url.hash.slice(1);
    // Espera a que la nueva página se pinte antes de hacer scroll
    requestAnimationFrame(() => requestAnimationFrame(() => scrollAlAncla(hash)));
  }, []);

  return <RouterContext.Provider value={{ ...loc, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter();
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

// Enlace externo seguro
export function Ext({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
