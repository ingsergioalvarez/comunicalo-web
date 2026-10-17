import React, { useState } from 'react';
import { Building2, Home as HomeIcon, Calendar, ShieldCheck, Award, Headphones, MapPin, ArrowRight, Phone, Tv } from 'lucide-react';
import { Link } from '../router';
import Icon from '../components/Icon';
import { SectionHead, Checklist, LeadForm, Faq, CtaBand, PlanCard, Foto } from '../components/ui';
import { TELEFONOS } from '../data/site';
import { PLANES_INTERNET_TELEFONIA } from '../data/planes';
import { USOS_INTERNET_DEDICADO } from '../data/servicios';
import { PASOS_CONTRATACION, FAQ_GENERAL, COBERTURA } from '../data/comercial';

const SEGMENTOS = {
  empresa: {
    tab: 'Empresas',
    icon: Building2,
    eyebrow: 'Internet dedicado · Telefonía IP · Redes · Seguridad',
    titulo: <>Conectividad que <span className="hl">no detiene</span> tu negocio</>,
    texto: 'Internet dedicado simétrico por fibra óptica con IP fija, enlaces entre sucursales, telefonía IP, WiFi empresarial y monitoreo de cámaras desde nuestro Centro C2.',
    puntos: ['Misma velocidad de subida y bajada, sin compartir', 'IP fijas homologadas y soporte los 365 días', 'Un solo proveedor para internet, voz, redes y seguridad'],
    cta: { to: '/empresas', label: 'Ver soluciones para empresas' },
    tel: TELEFONOS.empresas,
    interes: 'internet-dedicado',
  },
  hogar: {
    tab: 'Hogar',
    icon: HomeIcon,
    eyebrow: 'Internet residencial · Red propia Comunícalo',
    titulo: <>Internet de alta velocidad en casa <span className="hl">desde $320</span> al mes</>,
    texto: 'Planes residenciales con fibra óptica y telefonía fija para navegar, estudiar y trabajar. Cobertura en Hidalgo y Estado de México.',
    puntos: ['Planes desde $320/mes con módem WiFi incluido', 'Paquetes PAQ D con telefonía fija ilimitada', 'Servicio técnico local y atención cercana'],
    cta: { to: '/hogar', label: 'Ver planes para el hogar' },
    tel: TELEFONOS.hogar,
    interes: 'hogar',
  },
  evento: {
    tab: 'Eventos',
    icon: Calendar,
    eyebrow: 'Congresos · Expos · Conciertos · Streaming',
    titulo: <>Internet para eventos <span className="hl">que sí aguanta</span> a tu público</>,
    texto: 'Conectividad temporal de alta capacidad y WiFi de alta densidad con ingenieros en sitio. Más de 5 años conectando eventos empresariales, sociales y masivos.',
    puntos: ['Ancho de banda dedicado para transmisiones', 'Redes separadas para staff, prensa, cobro y público', 'Ingenieros en sitio de principio a fin'],
    cta: { to: '/eventos', label: 'Conectividad para eventos' },
    tel: TELEFONOS.empresas,
    interes: 'internet-eventos',
  },
};

const SOLUCIONES = [
  { to: '/empresas#internet-dedicado', icon: 'zap', titulo: 'Internet dedicado', texto: 'Fibra óptica simétrica 1:1 con IP fija para tu empresa.' },
  { to: '/hogar', icon: 'home', titulo: 'Internet para el hogar', texto: 'Internet de fibra óptica para tu casa desde $320 al mes.' },
  { to: '/eventos', icon: 'calendar', titulo: 'Internet para eventos', texto: 'WiFi de alta densidad e ingenieros en sitio.' },
  { to: '/empresas#telefonia-ip', icon: 'phone', titulo: 'Telefonía IP', texto: 'Conmutador en la nube y ahorro en llamadas.' },
  { to: '/empresas#lan-to-lan', icon: 'share', titulo: 'LAN to LAN y VPN', texto: 'Conecta tus sucursales en una red privada.' },
  { to: '/empresas#redes-wifi', icon: 'wifi', titulo: 'Redes, WiFi y cableado', texto: 'Diseño e instalación llave en mano.' },
  { to: '/empresas#cctv', icon: 'camera', titulo: 'CCTV y monitoreo C2', texto: 'Cámaras con vigilancia activa 24/7.' },
  { to: '/empresas#data-center', icon: 'database', titulo: 'Data center y ciberseguridad', texto: 'Housing, firewall administrado y respaldo.' },
];

export default function Home() {
  const [seg, setSeg] = useState('empresa');
  const s = SEGMENTOS[seg];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <div className="seg-tabs" role="tablist" aria-label="¿Para quién es?">
              {Object.entries(SEGMENTOS).map(([id, v]) => (
                <button key={id} role="tab" aria-selected={seg === id} onClick={() => setSeg(id)}>
                  <v.icon size={16} aria-hidden="true" /> {v.tab}
                </button>
              ))}
            </div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h1 className="h1 mt-1">{s.titulo}</h1>
            <p className="lead">{s.texto}</p>
            <ul className="hero-points">
              {s.puntos.map((p) => <li key={p}><ShieldCheck size={18} aria-hidden="true" /> {p}</li>)}
            </ul>
            <div className="btn-row">
              <Link to={s.cta.to} className="btn btn-accent btn-lg">{s.cta.label} <ArrowRight size={18} /></Link>
              <a href={s.tel.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {s.tel.num}</a>
            </div>
            <div className="trust">
              <span><Award size={16} /> Concesión Única del IFT</span>
              <span><Headphones size={16} /> Soporte 365 días</span>
              <span><MapPin size={16} /> CDMX · Edomex · Hidalgo</span>
            </div>
          </div>
          <div className="lead-card">
            <LeadForm key={seg} interesInicial={s.interes} titulo="Cotiza en 1 minuto" subtitulo="Déjanos tus datos y un asesor te contacta por WhatsApp." />
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="stats">
            <div className="stat"><b>+30 años</b><span>de experiencia de nuestros socios y directivos</span></div>
            <div className="stat"><b>Concesión IFT</b><span>Red pública de telecomunicaciones autorizada</span></div>
            <div className="stat"><b>365 días</b><span>de soporte técnico especializado</span></div>
            <div className="stat"><b>+5 años</b><span>conectando eventos de todo tipo</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Soluciones" title="Todo lo que tu empresa o tu casa necesita para estar conectada" center>
            Un solo proveedor para internet, voz, redes, seguridad y entretenimiento.
          </SectionHead>
          <div className="grid grid-4">
            {SOLUCIONES.map((x) => (
              <Link key={x.titulo} to={x.to} className="card card-link">
                <span className="icon-box"><Icon name={x.icon} /></span>
                <h3 className="h3 mt-2">{x.titulo}</h3>
                <p className="small muted mt-1">{x.texto}</p>
                <span className="link small mt-2">Conocer más <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Para tu casa" title="Internet + teléfono sin plazo forzoso">
            Elige tu velocidad. Todos los planes incluyen línea telefónica y módem WiFi.
          </SectionHead>
          <div className="plans plans-4">
            {PLANES_INTERNET_TELEFONIA.map((p) => <PlanCard key={p.id} plan={p} />)}
          </div>
          <div className="btn-row mt-3">
            <Link to="/hogar#triple-play" className="btn btn-outline"><Tv size={18} /> Ver paquetes con televisión</Link>
            <Link to="/cobertura" className="btn btn-outline"><MapPin size={18} /> ¿Hay cobertura en mi zona?</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Para empresas</span>
            <h2 className="h2 mt-1">Internet dedicado: la misma velocidad de subida y bajada, garantizada</h2>
            <p className="lead mt-2">
              Ofrecemos y garantizamos calidad, disponibilidad y ancho de banda con IP fijas homologadas.
              Tu empresa deja de competir por la conexión con los vecinos.
            </p>
            <div className="mt-3">
              <Checklist items={['Servicio simétrico e integral', 'Soporte técnico especializado los 365 días', 'Reducción de costos y aumento en productividad', 'Servicio personalizable, flexible y seguro']} />
            </div>
            <div className="btn-row mt-3">
              <Link to="/cotizar?servicio=internet-dedicado" className="btn btn-primary btn-lg">Cotizar internet dedicado</Link>
              <Link to="/empresas" className="btn btn-outline btn-lg">Ver todos los servicios</Link>
            </div>
          </div>
          <div className="stack">
          <Foto src="/img/data-center.webp" alt="Pasillo de racks de servidores en un centro de datos" width={720} height={401} className="foto-wide" />
          <div className="card">
            <h3 className="h3">Lo que puedes correr sobre tu enlace</h3>
            <div className="grid grid-2 mt-2">
              {USOS_INTERNET_DEDICADO.map((u) => (
                <div key={u} className="alert" style={{ fontWeight: 700 }}>{u}</div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split">
          <Foto src="/img/monitoreo-c2.webp" alt="Monitoristas frente a un muro de video en un centro de monitoreo" width={720} height={283} className="foto-banner" />
          <div>
            <span className="eyebrow">Seguridad electrónica</span>
            <h2 className="h2 mt-1">Cámaras vigiladas en tiempo real, no solo grabando</h2>
            <p className="lead mt-2">Instalamos tu CCTV y lo monitoreamos 24/7 desde nuestro Centro de Comando y Control (C2), con protocolos de respuesta ante cualquier incidente.</p>
            <div className="btn-row mt-3">
              <Link to="/empresas#monitoreo-c2" className="btn btn-primary btn-lg">Conocer el monitoreo C2 <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Así de fácil" title="Contrata en 4 pasos" center />
          <ol className="steps">
            {PASOS_CONTRATACION.map((p) => (
              <li key={p.titulo} className="step">
                <h3 className="h3">{p.titulo}</h3>
                <p className="small muted mt-1">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Cobertura</span>
            <h2 className="h2 mt-1">Red propia en el Valle de México e Hidalgo</h2>
            <p className="lead mt-2">Presencia en zonas residenciales, fraccionamientos y parques industriales. Te confirmamos factibilidad en tu domicilio.</p>
            <Link to="/cobertura" className="btn btn-primary btn-lg mt-3">Consultar mi zona <ArrowRight size={18} /></Link>
          </div>
          <div className="grid">
            {COBERTURA.map((r) => (
              <div key={r.region} className="card">
                <h3 className="h3" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><MapPin size={18} className="hl" /> {r.region}</h3>
                <p className="small muted mt-1">{r.zonas.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" center />
          <Faq items={FAQ_GENERAL} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBand title="¿Listo para conectarte?" text="Cotiza sin compromiso y recibe respuesta de un asesor hoy mismo." />
        </div>
      </section>
    </>
  );
}
