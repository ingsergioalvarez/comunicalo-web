import React, { useState } from 'react';
import { CircleCheck, ChevronDown, MessageCircle, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { whatsappUrl, mailtoUrl, registrarLead, areaDeInteres, AREAS, TELEFONOS } from '../data/site';
import { formatoPrecio, INCLUIDO_HOGAR } from '../data/planes';
import { PlanIcon, PlanFeature } from './PlanIcons';
import { imgResp } from '../imagenes';

export const OPCIONES_INTERES = [
  { id: 'hogar', label: 'Internet para mi casa' },
  { id: 'internet-dedicado', label: 'Internet dedicado para empresa' },
  { id: 'internet-eventos', label: 'Internet para un evento' },
  { id: 'telefonia-ip', label: 'Telefonía IP / conmutador' },
  { id: 'redes-wifi', label: 'Redes, WiFi o cableado' },
  { id: 'lan-to-lan', label: 'Enlaces entre sucursales / VPN' },
  { id: 'cctv', label: 'Cámaras y monitoreo C2' },
  { id: 'ciberseguridad', label: 'Ciberseguridad / data center' },
  { id: 'otro', label: 'Otro' },
];

// Imagen ligera con carga diferida. "ilustrativa" agrega la leyenda correspondiente.
export function Foto({ src, alt, width, height, ilustrativa = true, prioridad = false, className = '' }) {
  return (
    <figure className={`foto ${className}`}>
      <img {...imgResp(src, 'contenido')} alt={alt} width={width} height={height} loading={prioridad ? 'eager' : 'lazy'} decoding="async" />
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
export function LeadForm({ interesInicial = 'hogar', titulo = 'Recibe tu cotización', subtitulo, extra = '', boton = 'Enviar por WhatsApp', conMensaje = false, ocultarTitulo = false }) {
  const [f, setF] = useState({ nombre: '', telefono: '', zona: '', interes: interesInicial, mensaje: '', sitio_web: '' });
  const [enviado, setEnviado] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const interesLabel = OPCIONES_INTERES.find((o) => o.id === f.interes)?.label || f.interes;
  const area = areaDeInteres(f.interes);
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
    window.open(whatsappUrl(texto, AREAS[area].wa), '_blank', 'noopener');
    registrarLead({
      origen: 'cotizacion', area, interes: interesLabel, nombre: f.nombre, telefono: f.telefono,
      zona: f.zona, mensaje: [extra && `Detalle: ${extra}`, f.mensaje].filter(Boolean).join('\n'), sitio_web: f.sitio_web,
    });
  };

  return (
    <form className="form" onSubmit={enviar} aria-label={titulo}>
      {!ocultarTitulo && (
        <div>
          <h2 className="h3">{titulo}</h2>
          {subtitulo && <p className="small muted mt-1">{subtitulo}</p>}
        </div>
      )}
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
      {conMensaje && (
        <div className="field">
          <label htmlFor="lf-mensaje">¿En qué te ayudamos?</label>
          <textarea id="lf-mensaje" className="textarea" rows={4} placeholder="Cuéntanos brevemente qué necesitas: número de sucursales, velocidad, fecha del evento, falla que presentas…" value={f.mensaje} onChange={set('mensaje')} />
        </div>
      )}
      {/* Campo trampa contra bots: oculto para personas */}
      <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="campo-trampa" value={f.sitio_web} onChange={set('sitio_web')} />
      <button type="submit" className="btn btn-wa btn-lg btn-block"><MessageCircle size={18} /> {boton}</button>
      {enviado && (
        <p className="alert" role="status">
          Abrimos WhatsApp con tu solicitud. ¿No se abrió? <a className="link" href={mailtoUrl(`Cotización: ${interesLabel}`, texto, AREAS[area].email)}><Mail size={14} /> Envíala por correo</a>
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

export function CtaBand({ title, text, mx, to = '/cotizar' }) {
  return (
    <div className={`cta-band${mx ? ' band-mx' : ''}`}>
      <div>
        <h2 className="h2">{title}</h2>
        {text && <p className="lead">{text}</p>}
      </div>
      <div className="btn-row">
        <Link to={to} className={`btn btn-lg ${mx ? 'btn-mx' : 'btn-accent'}`}>Cotizar ahora <ArrowRight size={18} /></Link>
        <a href={TELEFONOS.empresas.href} className="btn btn-lg btn-ghost-light"><Phone size={18} /> {TELEFONOS.empresas.num}</a>
      </div>
    </div>
  );
}

// Tarjeta de plan residencial estilo Totalplay con datos del registro IFT
// precioOculto: id del elemento al que lleva el botón para elegir zona; mientras tanto el precio va difuminado.
export function PlanCard({ plan, tv, precioOculto, onElegir }) {
  const marca = plan.marca || 'Comunícalo';
  const esMx = marca === 'MAXVISION';
  const tvTexto = plan.tvs ? `TV para ${plan.tvs} ${plan.tvs === 1 ? 'televisor' : 'televisores'}` : '';
  const msg = `Hola ${marca}, quiero contratar el plan ${plan.nombre} (${plan.bajada} Megas${tv && plan.canales ? ` + ${plan.canales} canales` : ''}${tvTexto ? ` + ${tvTexto}` : ''}, ${formatoPrecio(plan.precio)} al mes). ¿Hay cobertura en mi domicilio?`;

  // Asignación de gradiente según velocidad y tipo de plan estilo Totalplay
  let headerGradient = 'plan-header-blue';
  if (esMx) {
    headerGradient = tv ? 'plan-header-mx' : (plan.bajada >= 50 ? 'plan-header-magenta' : 'plan-header-blue');
  } else {
    if (tv) headerGradient = 'plan-header-purple';
    else if (plan.bajada >= 100) headerGradient = 'plan-header-orange';
    else if (plan.bajada >= 50) headerGradient = 'plan-header-magenta';
    else if (plan.bajada >= 30) headerGradient = 'plan-header-blue';
    else headerGradient = 'plan-header-cyan';
  }

  // Miniatura de equipo según servicio
  const deviceImg = tv ? '/img/equipo-tv-box.webp' : '/img/equipo-modem-wifi6.webp';
  const badgeText = plan.destacado ? (plan.badge || 'Échale un ojo a este paquete ✨') : plan.badge;

  return (
    <article className={`plan ${plan.destacado ? 'plan--featured' : ''} ${esMx ? 'plan--mx' : ''} ${tv ? 'plan--tv' : ''}`}>
      {badgeText && (
        <div className={`plan-badge-tp ${esMx ? 'badge-mx-tp' : ''}`}>
          <span>{badgeText}</span>
        </div>
      )}

      {/* Header bar estilo Totalplay */}
      <div className={`plan-header-tp ${headerGradient}`}>
        <div className="plan-header-info">
          <span className="plan-name-tag">
            {tv && <PlanIcon name="tv" size={13} />}
            {plan.nombre}
          </span>
          <div className="plan-header-speed">{plan.bajada || 20} Megas</div>
          <div className="plan-header-sub">
            {tv ? (plan.canales ? `TV (${plan.canales} canales) + Teléfono` : 'TV + Internet + Teléfono') : (plan.telefonia ? 'Internet + Telefonía Fija' : 'Internet Fijo')}
          </div>
        </div>
        <img
          {...imgResp(deviceImg, 'equipo')}
          alt={tv ? 'Decodificador Digital 4K' : 'Módem WiFi 6 Gigabit'}
          className="plan-header-device"
          loading="lazy"
          width={70}
          height={70}
        />
      </div>

      {/* Cuerpo de la tarjeta con pills de servicios */}
      <div className="plan-body-tp">
        <ul className="plan-features-tp">
          {tv && (
            <PlanFeature icono="tv">
              {plan.canales ? <><strong>{plan.canales} Canales de TV</strong> con decodificador digital</> : <strong>Televisión con decodificador digital</strong>}
              {tvTexto && <> · {tvTexto}</>}
            </PlanFeature>
          )}
          <PlanFeature icono="wifi"><strong>Módem WiFi de alta potencia</strong> en comodato</PlanFeature>
          {plan.telefonia ? (
            <PlanFeature icono="telefono">
              {plan.telefonia.includes('min') ? <><strong>Telefonía fija:</strong> 3,000 min a fijos y celular</> : <><strong>Línea telefónica fija</strong> incluida</>}
            </PlanFeature>
          ) : (
            <PlanFeature icono="subida"><strong>Subida de {plan.subida} Mbps</strong> para videollamadas</PlanFeature>
          )}
          <PlanFeature icono={plan.ideal ? 'ideal' : 'soporte'}>{plan.ideal || 'Soporte técnico preferente en tu municipio'}</PlanFeature>
        </ul>

        <div className="plan-cta">
          {/* Fila de precio */}
          <div className="plan-price-row">
            {precioOculto ? (
              <div className="plan-price-tp plan-price-locked" aria-hidden="true">
                <span className="plan-price-val">$000</span>
                <span className="plan-price-period">/ mes</span>
              </div>
            ) : (
              <div className="plan-price-tp">
                <span className="plan-price-val">{formatoPrecio(plan.precio)}</span>
                <span className="plan-price-period">/ mes</span>
              </div>
            )}
            <span className="badge" style={{ fontSize: '0.74rem' }}>
              {plan.permanencia ? `${plan.permanencia} meses` : 'Prepago 30 días'}
            </span>
          </div>

          {precioOculto ? (
            <a href={`#${precioOculto}`} className={`btn-neon-action ${esMx ? 'btn-neon-mx' : ''}`}>
              Ver mi precio <ArrowRight size={17} />
            </a>
          ) : onElegir ? (
            <button type="button" onClick={() => onElegir(plan)} className={`btn-neon-action ${esMx ? 'btn-neon-mx' : ''}`}>
              Me interesa <ArrowRight size={17} />
            </button>
          ) : (
            <a
              href={whatsappUrl(msg, AREAS.ventasHogar.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-neon-action ${esMx ? 'btn-neon-mx' : ''}`}
            >
              Me interesa <ArrowRight size={17} />
            </a>
          )}
        </div>

        <p className="plan-legal-tp">
          {precioOculto ? 'Precio y folio IFT según tu fraccionamiento.' : (
            <>
              {plan.instalacion ? `Instalación ${formatoPrecio(plan.instalacion)}. ` : ''}Folio IFT {plan.folio}.
              {plan.pdf && <>{' '}<a href={plan.pdf} target="_blank" rel="noopener">Ficha oficial</a></>}
            </>
          )}
        </p>
      </div>
    </article>
  );
}
