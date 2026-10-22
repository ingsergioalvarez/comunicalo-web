import { useEffect, useState } from 'react';

// true en pantallas de celular (< 640px). En el prerender arranca en false.
export default function useEsMovil() {
  const [movil, setMovil] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const actualizar = () => setMovil(mq.matches);
    actualizar();
    mq.addEventListener('change', actualizar);
    return () => mq.removeEventListener('change', actualizar);
  }, []);
  return movil;
}
