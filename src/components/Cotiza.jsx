import React from 'react';
import { Building2, House, CalendarDays, ArrowRight, Check, Phone, Clock, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Link } from '../router';
import { TELEFONOS } from '../data/site';

// Piezas para invitar a cotizar. Todos los formularios viven en /cotizar?para=empresa|hogar|evento.

export const TIPOS_COTIZACION = [
  { id: 'empresa', icon: Building2, titulo: 'Empresas', texto: 'Internet dedicado, LAN to LAN, telefonía, redes y CCTV', cta: 'Cotizar para mi empresa', tel: TELEFONOS.empresas },
  { id: 'hogar', icon: House, titulo: 'Hogar', texto: 'Internet y TV para tu casa, con precio por municipio', cta: 'Cotizar internet para mi casa', tel: TELEFONOS.hogar },
  { id: 'evento', icon: CalendarDays, titulo: 'Eventos', texto: 'WiFi de alta densidad e ingenieros en sitio', cta: 'Cotizar mi evento', tel: TELEFONOS.empresas },
];

export const urlCotizar = (para, extra = {}) => `/cotizar?${new URLSearchParams({ para, ...extra })}`;

// Tres opciones grandes; la activa queda resaltada. Se usa en el inicio y en /cotizar.
export function SelectorTipo({ activo, onElegir, compacto = false }) {
  return (
    <div className={`cz-opciones${compacto ? ' cz-opciones--compacto' : ''}`} role="tablist" aria-label="¿Qué quieres cotizar?">
      {TIPOS_COTIZACION.map(({ id, icon: I, titulo, texto }) => (
        <button key={id} type="button" role="tab" aria-selected={activo === id} className="cz-opcion" onClick={() => onElegir(id)}>
          <span className="cz-opcion-icon"><I size={22} aria-hidden="true" /></span>
          <span className="cz-opcion-body">
            <strong>{titulo}</strong>
            <span>{texto}</span>
          </span>
          <span className="cz-opcion-check" aria-hidden="true"><Check size={14} /></span>
        </button>
      ))}
    </div>
  );
}

// Tarjeta del hero de inicio: siempre mide lo mismo, solo cambia la opción resaltada y el botón.
export function CotizaHero({ activo, onElegir }) {
  const tipo = TIPOS_COTIZACION.find((t) => t.id === activo);
  return (
    <div className="cz-card">
      <span className="cz-badge"><span className="cz-badge-dot" aria-hidden="true" /> Cotiza en 1 minuto</span>
      <h2 className="cz-titulo">¿Qué quieres conectar?</h2>
      <SelectorTipo activo={activo} onElegir={onElegir} />
      <Link to={urlCotizar(activo)} className="btn btn-accent btn-lg btn-block cz-cta">
        {tipo.cta} <ArrowRight size={18} />
      </Link>
      <ul className="cz-trust">
        <li><Clock size={14} aria-hidden="true" /> Respuesta el mismo día hábil</li>
        <li><ShieldCheck size={14} aria-hidden="true" /> Sin compromiso</li>
      </ul>
    </div>
  );
}

// Banner para las páginas de Empresas, Hogar y Eventos en lugar del formulario
export function BannerCotizar({ para, id, eyebrow, titulo, texto, puntos = [], extra }) {
  const tipo = TIPOS_COTIZACION.find((t) => t.id === para);
  const I = tipo.icon;
  return (
    <div className={`cz-banner cz-banner--${para}`} id={id}>
      <span className="cz-banner-deco" aria-hidden="true"><I size={220} strokeWidth={1} /></span>
      <div className="cz-banner-body">
        <span className="cz-badge"><span className="cz-badge-dot" aria-hidden="true" /> {eyebrow}</span>
        <h2 className="h2">{titulo}</h2>
        {texto && <p className="cz-banner-texto">{texto}</p>}
        {puntos.length > 0 && (
          <ul className="cz-banner-puntos">
            {puntos.map((p) => <li key={p}><BadgeCheck size={16} aria-hidden="true" /> {p}</li>)}
          </ul>
        )}
      </div>
      <div className="cz-banner-acciones">
        <Link to={urlCotizar(para, extra)} className="btn btn-accent btn-lg btn-block">{tipo.cta} <ArrowRight size={18} /></Link>
        <a href={tipo.tel.href} className="btn btn-ghost-light btn-lg btn-block"><Phone size={18} /> {tipo.tel.num}</a>
        <p className="cz-banner-nota"><Clock size={14} aria-hidden="true" /> Toma 2 minutos · Respuesta el mismo día hábil</p>
      </div>
    </div>
  );
}
