import React, { useState } from 'react';
import { CircleCheck, ChevronDown, MessageCircle, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { whatsappUrl, mailtoUrl, TELEFONOS } from '../data/site';
import { formatoPrecio, INCLUIDO_HOGAR } from '../data/planes';

export const OPCIONES_INTERES = [
  { id: 'hogar', label: 'Internet para mi casa' },
  { id: 'internet-dedicado', label: 'Internet dedicado para empresa' },
  { id: 'internet-eventos', label: 'Internet para un evento' },
  { id: 'telefonia-ip', label: 'Telefonía IP / conmutador' },
  { id: 'redes-wifi', label: 'Redes, WiFi o cableado' },
  { id: 'lan-to-lan', label: 'Enlaces entre sucursales / VPN' },
  { id: 'cctv', label: 'Cámaras y monitoreo C2' },
  { id: 'ciberseguridad', label: 'Ciberseguridad / data center' },
  { id: 'maxvision', label: 'MAXVISION TV' },
  { id: 'otro', label: 'Otro' },
];

// Imagen ligera con carga diferida. "ilustrativa" agrega la leyenda correspondiente.
export function Foto({ src, alt, width, height, ilustrativa = true, prioridad = false, className = '' }) {
  return (
    <figure className={`foto ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading={prioridad ? 'eager' : 'lazy'} decoding="async" />
      {ilustrativa && <figcaption>Imagen ilustrativa</figcaption>}
    </figure>
  );
}

export function SectionHead({ eyebrow, title, children, center }) {
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {children && <p className="lead">{children}</p>}
    </div>
  );
}

export function Checklist({ items }) {
  return (
    <ul className="checklist">
      {items.map((t) => (
        <li key={t}><CircleCheck size={17} aria-hidden="true" /> <span>{t}</span></li>
      ))}
    </ul>
  );
}

// Formulario de prospecto: arma el mensaje y lo abre en WhatsApp (o correo).
export function LeadForm({ interesInicial = 'hogar', titulo = 'Recibe tu cotización', subtitulo, extra = '', boton = 'Enviar por WhatsApp' }) {
  const [f, setF] = useState({ nombre: '', telefono: '', zona: '', interes: interesInicial, mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const interesLabel = OPCIONES_INTERES.find((o) => o.id === f.interes)?.label || f.interes;
  const texto = [
    `Hola Comunícalo, me interesa: ${interesLabel}.`,
    extra && `Detalle: ${extra}.`,
    f.nombre && `Nombre: ${f.nombre}.`,
    f.telefono && `Teléfono: ${f.telefono}.`,
    f.zona && `Zona: ${f.zona}.`,
    f.mensaje && `Comentarios: ${f.mensaje}`,
  ].filter(Boolean).join(' ');

  const enviar = (e) => {
    e.preventDefault();
    setEnviado(true);
    window.open(whatsappUrl(texto), '_blank', 'noopener');
  };

  return (
    <form className="form" onSubmit={enviar} aria-label={titulo}>
      <div>
        <h2 className="h3">{titulo}</h2>
        {subtitulo && <p className="small muted mt-1">{subtitulo}</p>}
      </div>
      <div className="field">
        <label htmlFor="lf-interes">¿Qué necesitas?</label>
        <select id="lf-interes" className="select" value={f.interes} onChange={set('interes')}>
          {OPCIONES_INTERES.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="lf-nombre">Nombre o empresa *</label>
          <input id="lf-nombre" className="input" required autoComplete="name" value={f.nombre} onChange={set('nombre')} />
        </div>
        <div className="field">
          <label htmlFor="lf-tel">Teléfono / WhatsApp *</label>
          <input id="lf-tel" className="input" type="tel" required inputMode="tel" autoComplete="tel" pattern="[0-9 +()-]{8,}" value={f.telefono} onChange={set('telefono')} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="lf-zona">Colonia o municipio</label>
        <input id="lf-zona" className="input" placeholder="Ej. Tlalnepantla, Tizayuca, Azcapotzalco" value={f.zona} onChange={set('zona')} />
      </div>
      <button type="submit" className="btn btn-wa btn-lg btn-block"><MessageCircle size={18} /> {boton}</button>
      {enviado && (
        <p className="alert" role="status">
          Abrimos WhatsApp con tu solicitud. ¿No se abrió? <a className="link" href={mailtoUrl(`Cotización: ${interesLabel}`, texto)}><Mail size={14} /> Envíala por correo</a>
        </p>
      )}
      <p className="form-note">Te respondemos en horario de oficina. Sin compromiso.</p>
    </form>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((q) => (
        <details key={q.p}>
          <summary>{q.p} <ChevronDown size={18} aria-hidden="true" /></summary>
          <p>{q.r}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title, text, mx }) {
  return (
    <div className={`cta-band${mx ? ' band-mx' : ''}`}>
      <div>
        <h2 className="h2">{title}</h2>
        {text && <p className="lead">{text}</p>}
      </div>
      <div className="btn-row">
        <Link to="/cotizar" className={`btn btn-lg ${mx ? 'btn-mx' : 'btn-accent'}`}>Cotizar ahora <ArrowRight size={18} /></Link>
        <a href={TELEFONOS.empresas.href} className="btn btn-lg btn-ghost-light"><Phone size={18} /> {TELEFONOS.empresas.num}</a>
      </div>
    </div>
  );
}

// Tarjeta de plan residencial con datos del registro IFT
export function PlanCard({ plan, tv }) {
  const marca = plan.marca || 'Comunícalo';
  const msg = `Hola ${marca}, quiero contratar el plan ${plan.nombre} (${plan.bajada} Mbps${tv ? ` + ${plan.canales} canales` : ''}, ${formatoPrecio(plan.precio)} al mes). ¿Hay cobertura en mi domicilio?`;
  return (
    <article className={`plan${plan.destacado ? ' plan--featured' : ''}`}>
      {plan.badge && <span className="badge badge-accent badge-top">{plan.badge}</span>}
      <div className="plan-name">{plan.nombre}</div>
      <div className="plan-speed">{plan.bajada}<small> Mbps</small></div>
      <div className="xs muted">Bajada {plan.bajada} Mbps · Subida {plan.subida} Mbps</div>
      <div className="plan-price"><b>{formatoPrecio(plan.precio)}</b><span>/mes</span></div>
      <Checklist
        items={[
          ...(tv ? [`Televisión con ${plan.canales} canales`] : []),
          ...(plan.telefonia ? [plan.telefonia] : INCLUIDO_HOGAR.slice(0, tv ? 3 : 4)),
          ...(plan.ideal ? [plan.ideal] : []),
        ]}
      />
      <div className="plan-foot">
        <a href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer" className={`btn btn-block ${plan.destacado ? 'btn-primary' : 'btn-outline'}`}>
          Lo quiero <ArrowRight size={16} />
        </a>
        <p className="plan-legal">
          Prepago, recarga cada 30 días. {plan.instalacion ? `Instalación ${formatoPrecio(plan.instalacion)}. ` : ''}Folio IFT {plan.folio}. <a href={plan.pdf}>Ficha oficial</a>
        </p>
      </div>
    </article>
  );
}
