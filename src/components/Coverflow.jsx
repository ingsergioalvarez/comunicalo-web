import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from '../router';

// Carrusel tipo "coverflow": la tarjeta activa queda al frente y las vecinas
// se ven detrás, inclinadas y oscurecidas. Es circular, responde a flechas,
// puntos, teclado, arrastre/swipe y a los enlaces con #<id> de cada tarjeta.
//
// items:       arreglo con { id, titulo, ... }
// renderSlide: (item, esActivo) => contenido de la tarjeta
// inicial:     índice de la tarjeta que arranca al frente (0 por defecto)
// tabIndex de los enlaces internos debe ser -1 cuando !esActivo.

// Posición relativa más corta en un carrusel circular (…-2, -1, 0, 1, 2…)
function offsetCircular(i, activo, n) {
  let d = i - activo;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

export default function Coverflow({ items, etiqueta, renderSlide, inicial = 0, className = '', slideClassName = '' }) {
  const n = items.length;
  const [activo, setActivo] = useState(inicial);
  const router = useRouter();
  const arrastre = useRef(null);
  const huboSwipe = useRef(false);

  const ir = useCallback((i) => setActivo(((i % n) + n) % n), [n]);

  // Centra la tarjeta indicada en el hash (al cargar y en cada navegación interna)
  useEffect(() => {
    const centrar = () => {
      const idx = items.findIndex((it) => it.id === location.hash.slice(1));
      if (idx >= 0) setActivo(idx);
    };
    centrar();
    window.addEventListener('hashchange', centrar);
    return () => window.removeEventListener('hashchange', centrar);
  }, [router, items]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(activo - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(activo + 1); }
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    arrastre.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const ini = arrastre.current;
    arrastre.current = null;
    if (!ini) return;
    const dx = e.clientX - ini.x;
    huboSwipe.current = Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - ini.y);
    if (huboSwipe.current) ir(activo + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      className={`svc-carousel ${className}`}
      role="region"
      aria-roledescription="carrusel"
      aria-label={etiqueta}
      onKeyDown={onKeyDown}
    >
      <div className="svc-viewport">
        <div
          className="svc-stage"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { arrastre.current = null; }}
        >
          {items.map((it, i) => {
            const off = offsetCircular(i, activo, n);
            const esActivo = off === 0;
            return (
              <article
                key={it.id}
                id={it.id}
                className={`card svc-slide ${slideClassName}${esActivo ? ' is-active' : ''}${Math.abs(off) > 1 ? ' is-far' : ''}`}
                style={{ '--off': off, '--abs': Math.abs(off) }}
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${n}: ${it.titulo}`}
                aria-hidden={esActivo ? undefined : 'true'}
                onClick={esActivo ? undefined : () => { if (!huboSwipe.current) ir(i); }}
              >
                {renderSlide(it, esActivo)}
              </article>
            );
          })}
        </div>
        <button type="button" className="svc-arrow svc-arrow--prev" onClick={() => ir(activo - 1)} aria-label="Anterior">
          <ChevronLeft size={22} />
        </button>
        <button type="button" className="svc-arrow svc-arrow--next" onClick={() => ir(activo + 1)} aria-label="Siguiente">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="svc-controls">
        <div className="svc-dots" role="group" aria-label="Elegir tarjeta">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              className={`svc-dot${i === activo ? ' is-active' : ''}`}
              onClick={() => ir(i)}
              aria-label={it.titulo}
              aria-current={i === activo ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{items[activo].titulo}</p>
    </div>
  );
}
