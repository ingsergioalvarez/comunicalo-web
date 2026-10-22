import React, { useState } from 'react';
import { ArrowRight, Phone, MessageCircle, ImageIcon } from 'lucide-react';
import { Link } from '../router';
import { SectionHead, Checklist, Faq } from '../components/ui';
import Coverflow from '../components/Coverflow';
import { BannerCotizar, urlCotizar } from '../components/Cotiza';
import { TELEFONOS, AREAS, whatsappUrl } from '../data/site';
import { TIPOS_EVENTO as TIPOS } from '../data/eventos';

const CIFRAS_EVENTOS = [
  { v: '+10 años', l: 'conectando eventos empresariales, sociales y masivos' },
  { v: 'Hasta 100,000', l: 'usuarios conectados al mismo tiempo' },
  { v: 'Fibra o microondas', l: 'llegamos aunque el recinto no tenga internet' },
  { v: 'En sitio', l: 'ingenieros de montaje a desmontaje' },
];

function IlustracionEvento({ x }) {
  const [fallo, setFallo] = useState(false);
  if (x.imagen && !fallo) {
    return (
      <figure className="svc-media">
        <img src={x.imagen.src} alt={x.imagen.alt} loading="lazy" decoding="async" onError={() => setFallo(true)} />
      </figure>
    );
  }
  // Ilustración de referencia hasta tener la foto del evento
  return (
    <figure className="svc-media ev-media" aria-hidden="true">
      <span className="ev-media-ondas"><i /><i /><i /></span>
      <x.icon size={44} className="ev-media-icon" />
      <figcaption><ImageIcon size={14} /> Imagen de referencia · 1200 × 675</figcaption>
    </figure>
  );
}

function TarjetaEvento(x, esActivo) {
  const tab = esActivo ? undefined : -1;
  return (
    <div className="ev-card" style={{ '--tono': x.tono }}>
      <IlustracionEvento x={x} />
      <div className="svc-body">
        <div className="svc-head">
          <span className="icon-box ev-icon"><x.icon size={22} aria-hidden="true" /></span>
          <div>
            <span className="badge ev-badge">{x.badge}</span>
            <h3 className="h3 mt-1">{x.titulo}</h3>
          </div>
        </div>
        <p className="muted">{x.texto}</p>
        <Checklist items={x.puntos} />
        <div className="svc-meta ev-conecta">
          <strong>Conectamos:</strong>
          {x.conecta.map((c) => <span key={c} className="ev-tag">{c}</span>)}
        </div>
        <div className="btn-row">
          <Link to={urlCotizar('evento', { evento: x.id })} className="btn btn-primary btn-sm" tabIndex={tab}>
            Cotizar este evento <ArrowRight size={14} />
          </Link>
          <a
            href={whatsappUrl(`Hola Comunícalo, quiero internet para un evento: ${x.titulo}.`, AREAS.ventasEmpresas.wa)}
            target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" tabIndex={tab}
          >
            <MessageCircle size={14} /> Preguntar
          </a>
        </div>
      </div>
    </div>
  );
}

const FAQ_EVENTOS = [
  { p: '¿Con cuánta anticipación debo reservar?', r: 'Entre más pronto mejor: necesitamos validar la factibilidad del recinto y, en su caso, hacer una visita técnica. Para eventos grandes recomendamos al menos 2 a 3 semanas.' },
  { p: '¿Pueden conectar un recinto sin internet?', r: 'Sí. Llevamos el enlace por fibra óptica o microondas según la ubicación y montamos la red WiFi dentro del recinto.' },
  { p: '¿Hay soporte durante el evento?', r: 'Sí, nuestros ingenieros permanecen en sitio para monitorear la red y resolver cualquier incidencia al momento.' },
  { p: '¿Puedo separar la red del público de la de producción?', r: 'Sí. Creamos redes independientes para staff, prensa, cobro, transmisión y asistentes, cada una con su propio ancho de banda.' },
];

export default function Eventos() {
  return (
    <>
      <section className="page-hero page-hero--foto page-hero--alto">
        <img src="/img/eventos/conciertos.webp" alt="" className="page-hero-foto" width={1200} height={675} fetchpriority="high" decoding="async" />
        <div className="container">
          <span className="eyebrow">Internet para eventos</span>
          <h1 className="h1 mt-1">Que tu evento no dependa del WiFi del recinto</h1>
          <p className="lead">
            Llevamos internet dedicado de alta capacidad a congresos, expos, conciertos y transmisiones, con WiFi de alta
            densidad e ingenieros en sitio. Más de 10 años en eventos empresariales, sociales y masivos.
          </p>
          <div className="btn-row mt-3">
            <Link to={urlCotizar('evento')} className="btn btn-accent btn-lg">Cotizar mi evento <ArrowRight size={18} /></Link>
            <a href={TELEFONOS.empresas.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {TELEFONOS.empresas.num}</a>
          </div>
        </div>
      </section>

      <section
        className="section ev-showcase"
        aria-labelledby="ev-titulo"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty('--spot-x', `${x}%`);
          e.currentTarget.style.setProperty('--spot-y', `${y}%`);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.setProperty('--spot-x', '-100%');
          e.currentTarget.style.setProperty('--spot-y', '-100%');
        }}
      >
        <div className="ev-luces" aria-hidden="true"><span /><span /><span /></div>
        <div className="container">
          <header className="ev-head">
            <span className="ev-live"><span className="ev-live-dot" /> En vivo · Internet para eventos</span>
            <h2 id="ev-titulo" className="ev-title">
              Tu evento, conectado <span className="ev-title-hl">sin cortes</span> de principio a fin
            </h2>
            <p className="ev-lead">
              Desde una junta de consejo hasta un festival con miles de asistentes: diseñamos, montamos y operamos la red
              para que tu público, tu producción y tus ventas nunca se desconecten.
            </p>
          </header>
          <ul className="ev-cifras">
            {CIFRAS_EVENTOS.map((c) => (
              <li key={c.v}><strong>{c.v}</strong><span>{c.l}</span></li>
            ))}
          </ul>
          <Coverflow items={TIPOS} etiqueta="Tipos de evento" className="ev-carousel" slideClassName="ev-slide" renderSlide={TarjetaEvento} />
        </div>
      </section>

      <section className="section section--alt" id="planear">
        <div className="container">
          <BannerCotizar
            para="evento"
            eyebrow="Llave en mano"
            titulo="De la visita técnica al desmontaje, nosotros nos encargamos"
            texto="Cuéntanos fecha, lugar y cuántas personas se conectarán; te enviamos propuesta técnica y disponibilidad."
            puntos={[
              'Enlace dedicado por fibra o microondas',
              'WiFi de alta densidad',
              'Redes separadas para staff, prensa y público',
              'Ingenieros en sitio todo el evento',
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Sobre internet para eventos" center />
          <Faq items={FAQ_EVENTOS} />
        </div>
      </section>
    </>
  );
}
