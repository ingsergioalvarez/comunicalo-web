import React, { useState } from 'react';
import { Building2, Home as HomeIcon, Calendar, ShieldCheck, Award, Headphones, MapPin, ArrowRight, Phone, Network, Activity, Gauge, Handshake, Satellite, Cctv, Globe } from 'lucide-react';
import { Link } from '../router';
import Icon from '../components/Icon';
import Coverflow from '../components/Coverflow';
import useEsMovil from '../components/useEsMovil';
import { SectionHead, Faq, CtaBand } from '../components/ui';
import { CotizaHero } from '../components/Cotiza';
import { TELEFONOS } from '../data/site';
import { PASOS_CONTRATACION, FAQ_GENERAL } from '../data/comercial';
import { imgResp } from '../imagenes';

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
    fondo: '/img/inicio-empresas.webp',
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
    fondo: '/img/hogar-familia.webp',
  },
  evento: {
    tab: 'Eventos',
    icon: Calendar,
    eyebrow: 'Congresos · Expos · Conciertos · Streaming',
    titulo: <>Internet para eventos <span className="hl">que sí aguanta</span> a tu público</>,
    texto: 'Conectividad temporal de alta capacidad y WiFi de alta densidad con ingenieros en sitio. Más de 10 años conectando eventos empresariales, sociales y masivos.',
    puntos: ['Ancho de banda dedicado para transmisiones', 'Redes separadas para staff, prensa, cobro y público', 'Ingenieros en sitio de principio a fin'],
    cta: { to: '/eventos', label: 'Conectividad para eventos' },
    tel: TELEFONOS.empresas,
    fondo: '/img/inicio-eventos.webp',
  },
};

// Mosaico de soluciones: "tam" agranda la tarjeta (xl = 2×2, wide = 2×1)
const SOLUCIONES = [
  { to: '/empresas#internet-dedicado', icon: 'zap', tam: 'xl', tag: 'Empresas', img: '/img/empresas/internet-dedicado.webp', titulo: 'Internet dedicado', texto: 'Fibra óptica simétrica 1:1 con IP fija para tu empresa.' },
  { to: '/hogar', icon: 'home', tam: 'wide', tag: 'Hogar', img: '/img/hogar-familia.webp', titulo: 'Internet para el hogar', texto: 'Internet de fibra óptica para tu casa desde $320 al mes.' },
  { to: '/eventos', icon: 'calendar', tag: 'Eventos', img: '/img/empresas/internet-eventos.webp', titulo: 'Internet para eventos', texto: 'WiFi de alta densidad e ingenieros en sitio.' },
  { to: '/empresas#telefonia-ip', icon: 'phone', tag: 'Empresas', img: '/img/empresas/telefonia-ip.webp', titulo: 'Telefonía IP', texto: 'Conmutador en la nube y ahorro en llamadas.' },
  { to: '/empresas#lan-to-lan', icon: 'share', tag: 'Empresas', img: '/img/empresas/lan-to-lan.webp', titulo: 'LAN to LAN y VPN', texto: 'Conecta tus sucursales en una red privada.' },
  { to: '/empresas#redes-wifi', icon: 'wifi', tag: 'Empresas', img: '/img/empresas/redes-wifi.webp', titulo: 'Redes, WiFi y cableado', texto: 'Diseño e instalación llave en mano.' },
  { to: '/empresas#cctv', icon: 'camera', tag: 'Seguridad', img: '/img/empresas/cctv.webp', titulo: 'CCTV y monitoreo C2', texto: 'Cámaras con vigilancia activa 24/7.' },
  { to: '/empresas#data-center', icon: 'database', tag: 'Seguridad', img: '/img/empresas/data-center.webp', titulo: 'Data center y ciberseguridad', texto: 'Housing, firewall administrado y respaldo.' },
];

// Fortalezas de la red: mismas cifras que se publican en /cobertura
const FORTALEZAS = [
  { icon: Network, dato: '6 estados', titulo: 'Red propia de fibra y microondas', texto: 'Fibra óptica y microondas directos en CDMX, Edomex, Morelos, Puebla, Hidalgo y Tlaxcala.' },
  { icon: Activity, dato: '24/7', titulo: 'NOC propio', texto: 'Monitoreamos cada enlace en tiempo real y actuamos antes de que notes una falla.' },
  { icon: Gauge, dato: '99.95%', titulo: 'SLA de disponibilidad', texto: 'Disponibilidad garantizada por contrato en enlaces dedicados.' },
  { icon: Handshake, dato: '32 / 32', titulo: 'Cobertura extendida con aliados', texto: 'Red de carriers aliados para llevar tus enlaces a cualquier estado del país.' },
  { icon: Satellite, dato: 'Respaldo', titulo: 'Satelital y LTE / 5G', texto: 'Enlaces de respaldo automático para zonas rurales, parques aislados y continuidad de negocio.' },
  { icon: Cctv, dato: 'C2', titulo: 'Centro de Comando y Control', texto: 'Monitoreo de video 24/7 con protocolos de respuesta ante incidentes.' },
];

function TileSolucion({ x, tab, eager }) {
  return (
    <Link to={x.to} tabIndex={tab} className={`sol-tile${x.tam ? ` sol-tile--${x.tam}` : ''}`}>
      <img {...imgResp(x.img, x.tam === 'xl' ? 'tarjetaXl' : x.tam === 'wide' ? 'tarjetaAncha' : 'tarjeta')} alt="" className="sol-tile-img" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <span className="sol-tile-tag">{x.tag}</span>
      <div className="sol-tile-body">
        <span className="sol-tile-icon"><Icon name={x.icon} size={20} /></span>
        <h3 className="sol-tile-title">{x.titulo}</h3>
        <p className="sol-tile-text">{x.texto}</p>
        <span className="sol-tile-cta">Conocer más <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}

function TarjetaInfra({ f }) {
  return (
    <article className="infra-card">
      <div className="infra-card-top">
        <span className="infra-icon"><f.icon size={22} aria-hidden="true" /></span>
        <b className="infra-dato">{f.dato}</b>
      </div>
      <h3 className="infra-card-title">{f.titulo}</h3>
      <p>{f.texto}</p>
    </article>
  );
}

export default function Home() {
  const [seg, setSeg] = useState('empresa');
  // Fondos ya pedidos: los de las otras pestañas se descargan hasta que el usuario las apunta o elige
  const [fondos, setFondos] = useState({ empresa: true });
  const pedirFondo = (id) => setFondos((f) => (f[id] ? f : { ...f, [id]: true }));
  const esMovil = useEsMovil();

  return (
    <>
      <section className="hero">
        {/* Fondo de cada pestaña: se cruzan con un desvanecido al cambiar */}
        {Object.entries(SEGMENTOS).map(([id, v]) => (
          fondos[id] && <img key={id} {...imgResp(v.fondo, 'portada')} alt="" className={`hero-fondo${seg === id ? ' is-activo' : ''}`} decoding="async" fetchpriority={id === 'empresa' ? 'high' : undefined} />
        ))}
        <div className="container">
          <div>
            <div className="seg-tabs" role="tablist" aria-label="¿Para quién es?">
              {Object.entries(SEGMENTOS).map(([id, v]) => (
                <button key={id} role="tab" aria-selected={seg === id} onClick={() => { pedirFondo(id); setSeg(id); }} onMouseEnter={() => pedirFondo(id)} onFocus={() => pedirFondo(id)} onTouchStart={() => pedirFondo(id)}>
                  <v.icon size={16} aria-hidden="true" /> {v.tab}
                </button>
              ))}
            </div>
            {/* Los tres textos se apilan en la misma celda: el hero mide lo que el más largo y no brinca al cambiar de pestaña */}
            <div className="hero-segs">
              {Object.entries(SEGMENTOS).map(([id, v]) => {
                const activo = seg === id;
                const Titulo = activo ? 'h1' : 'p';
                return (
                  <div key={id} className={`hero-seg${activo ? ' is-activo' : ''}`} aria-hidden={!activo} inert={activo ? undefined : ''}>
                    <span className="eyebrow">{v.eyebrow}</span>
                    <Titulo className="h1 mt-1">{v.titulo}</Titulo>
                    <p className="lead">{v.texto}</p>
                    <ul className="hero-points">
                      {v.puntos.map((p) => <li key={p}><ShieldCheck size={18} aria-hidden="true" /> {p}</li>)}
                    </ul>
                    <div className="btn-row">
                      <Link to={v.cta.to} className="btn btn-accent btn-lg">{v.cta.label} <ArrowRight size={18} /></Link>
                      <a href={v.tel.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {v.tel.num}</a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="trust">
              <span><Award size={16} /> Concesión Única del IFT</span>
              <span><Headphones size={16} /> Soporte 365 días</span>
              <span><MapPin size={16} /> CDMX · Edomex · Hidalgo</span>
            </div>
          </div>
          <div>
            <CotizaHero activo={seg} onElegir={setSeg} />
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="stats">
            <div className="stat"><b>+30 años</b><span>de experiencia de nuestros socios y directivos</span></div>
            <div className="stat"><b>Concesión IFT</b><span>Red pública de telecomunicaciones autorizada</span></div>
            <div className="stat"><b>365 días</b><span>de soporte técnico especializado</span></div>
            <div className="stat"><b>+10 años</b><span>conectando eventos de todo tipo</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Soluciones" title="Todo lo que tu empresa o tu casa necesita para estar conectada" center>
            Un solo proveedor para internet, voz, redes, seguridad y entretenimiento.
          </SectionHead>
          {esMovil ? (
            <Coverflow
              items={SOLUCIONES.map((x) => ({ ...x, id: `sol-${x.icon}` }))}
              etiqueta="Soluciones"
              className="tiles-carousel"
              slideClassName="tile-slide"
              renderSlide={(x, esActivo) => <TileSolucion x={x} tab={esActivo ? undefined : -1} eager />}
            />
          ) : (
            <div className="sol-mosaico">
              {SOLUCIONES.map((x) => <TileSolucion key={x.titulo} x={x} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section infra">
        <div className="container">
          <div className="infra-head">
            <span className="infra-badge"><span className="infra-pulso" aria-hidden="true" /> Red propia · Concesión IFT · NOC en vivo</span>
            <h2 className="infra-title">
              No revendemos internet.<br />
              <span className="infra-grad">Somos el carrier.</span>
            </h2>
            <p className="infra-lead">
              Operamos nuestra propia red, la vigilamos desde un NOC las 24 horas, la conectamos al mundo con
              salidas internacionales y la extendemos a todo el país con aliados.
            </p>
            <div className="btn-row infra-ctas">
              <Link to="/cotizar?servicio=internet-dedicado" className="btn btn-accent btn-lg infra-cta">Cotizar mi enlace <ArrowRight size={18} /></Link>
              <Link to="/cobertura" className="btn btn-ghost-light btn-lg"><MapPin size={18} /> Ver mapa de red</Link>
            </div>
          </div>

          <div className="infra-carrier">
            <span className="infra-carrier-icon"><Globe size={34} aria-hidden="true" /></span>
            <div>
              <span className="infra-carrier-tag">Carrier de carriers</span>
              <h3 className="infra-carrier-title">Salidas internacionales propias</h3>
              <p>
                Damos capacidad y tránsito a otros operadores e ISP, además de a empresas y hogares.
                Con presencia en <strong>KIO Data Centers</strong>.
              </p>
            </div>
            <Link to="/contacto" className="btn btn-lg infra-carrier-btn">Soy operador / ISP <ArrowRight size={18} /></Link>
          </div>

          {esMovil ? (
            <Coverflow
              items={FORTALEZAS.map((f, i) => ({ ...f, id: `infra-${i}` }))}
              etiqueta="Nuestra red"
              className="tiles-carousel tiles-carousel--infra"
              slideClassName="tile-slide"
              renderSlide={(f) => <TarjetaInfra f={f} />}
            />
          ) : (
            <div className="infra-grid">
              {FORTALEZAS.map((f) => <TarjetaInfra key={f.titulo} f={f} />)}
            </div>
          )}
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
        <div className="container">
          <div className="cob-banner">
            <img {...imgResp('/img/mapa-cobertura-azul.webp', 'contenido')} alt="" className="cob-banner-mapa" loading="lazy" />
            <div className="cob-banner-body">
              <span className="cob-banner-eyebrow"><MapPin size={15} /> Cobertura</span>
              <h2 className="h2 mt-1">¿Ya llega Comunícalo a tu domicilio?</h2>
              <p className="lead mt-2">Red propia en <strong className="cob-banner-estado">Estado de México</strong>, <strong className="cob-banner-estado">CDMX</strong>, <strong className="cob-banner-estado">Puebla</strong>, <strong className="cob-banner-estado">Hidalgo</strong> y <strong className="cob-banner-estado">Tlaxcala</strong> para hogares, fraccionamientos y parques industriales. ¿Estás fuera de esta región? También llegamos a otros estados mediante estudio de factibilidad.</p>
              <Link to="/cobertura" className="cob-banner-search">
                <MapPin size={20} className="cob-banner-pin" />
                <span>Busca tu municipio o colonia</span>
                <span className="btn btn-accent btn-sm">Consultar <ArrowRight size={16} /></span>
              </Link>
              <ul className="cob-banner-stats">
                <li><strong>6 estados</strong> con red propia</li>
                <li><strong>32 / 32</strong> estados con cobertura nacional</li>
                <li><strong>99.95%</strong> de disponibilidad</li>
              </ul>
            </div>
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
