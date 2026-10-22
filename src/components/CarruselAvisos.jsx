import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowUpRight, CircleCheck, Pause, Play } from 'lucide-react';
import { Ext } from '../router';
import { whatsappUrl } from '../data/site';
import { imgResp } from '../imagenes';

// Carrusel con desvanecido que avanza solo cada `intervalo` ms. Se pausa al pasar
// el mouse, al enfocar con teclado, con el botón de pausa o si el usuario prefiere
// menos movimiento. Si una imagen no existe queda el degradado de fondo.

function Slide({ s, activo, waNum }) {
  const [sinImagen, setSinImagen] = useState(false);
  const tab = activo ? undefined : -1;
  return (
    <article
      className={`cli-slide${activo ? ' is-activo' : ''}`}
      aria-hidden={!activo}
      aria-roledescription="diapositiva"
    >
      {s.imagen && !sinImagen && (
        <img {...imgResp(s.imagen, 'contenido')} alt="" className="cli-slide-img" loading="lazy" decoding="async" onError={() => setSinImagen(true)} />
      )}
      <div className="cli-slide-body">
        <span className="cli-etiqueta">{s.etiqueta}</span>
        <h3 className="h2">{s.titulo}</h3>
        <p>{s.texto}</p>
        {s.puntos && (
          <ul className="cli-puntos">
            {s.puntos.map((p) => <li key={p}><CircleCheck size={16} aria-hidden="true" /> {p}</li>)}
          </ul>
        )}
        {s.cta?.wa && (
          <a className="btn btn-wa" target="_blank" rel="noopener noreferrer" href={whatsappUrl(s.cta.wa, waNum)} tabIndex={tab}>
            <MessageCircle size={18} /> {s.cta.label}
          </a>
        )}
        {s.cta?.href && (
          <Ext className="btn btn-accent" href={s.cta.href} tabIndex={tab}>
            {s.cta.label} <ArrowUpRight size={18} />
          </Ext>
        )}
      </div>
    </article>
  );
}

export default function CarruselAvisos({ slides, waNum, etiqueta, intervalo = 7000 }) {
  const n = slides.length;
  const [activo, setActivo] = useState(0);
  const [pausaUsuario, setPausaUsuario] = useState(false);
  const [encima, setEncima] = useState(false);

  const ir = useCallback((i) => setActivo(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (n < 2 || pausaUsuario || encima) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      if (!document.hidden) setActivo((a) => (a + 1) % n);
    }, intervalo);
    return () => clearInterval(t);
  }, [n, pausaUsuario, encima, intervalo, activo]);

  return (
    <section
      className="cli-carrusel"
      aria-roledescription="carrusel"
      aria-label={etiqueta}
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocus={() => setEncima(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setEncima(false); }}
      style={{ '--intervalo': `${intervalo}ms` }}
    >
      <div className="cli-slides">
        {slides.map((s, i) => <Slide key={s.id} s={s} activo={i === activo} waNum={waNum} />)}
      </div>

      {n > 1 && (
        <div className="cli-controles">
          <button type="button" className="cli-btn" onClick={() => ir(activo - 1)} aria-label="Anterior"><ChevronLeft size={18} /></button>
          <div className="cli-puntos-nav">
            {slides.map((s, i) => (
              <button
                key={s.id} type="button" onClick={() => ir(i)}
                className={`cli-dot${i === activo ? ' is-activo' : ''}${pausaUsuario || encima ? ' is-pausa' : ''}`}
                aria-label={`Ir a: ${s.titulo}`} aria-current={i === activo ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="cli-btn" onClick={() => ir(activo + 1)} aria-label="Siguiente"><ChevronRight size={18} /></button>
          <button type="button" className="cli-btn" onClick={() => setPausaUsuario(!pausaUsuario)} aria-label={pausaUsuario ? 'Reanudar' : 'Pausar'}>
            {pausaUsuario ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      )}
    </section>
  );
}
