import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock, CreditCard, Gauge, MessageCircle, FileText, Receipt,
  Building2, House, Wrench, Wallet, MessageSquareWarning, Activity, ArrowRight, ArrowUpRight, Navigation, ShieldCheck, Zap, Send,
} from 'lucide-react';
import { Link, Ext } from '../router';
import { SectionHead, LeadForm } from '../components/ui';
import Coverflow from '../components/Coverflow';
import { doc } from '../data/documentos';
import { EMPRESA, TELEFONOS, AREAS, LINKS, whatsappUrl } from '../data/site';
import { imgResp } from '../imagenes';

const MAPA_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(EMPRESA.direccion)}&output=embed`;

// El mapa de Google pesa ~430 KB de JS: se muestra una imagen del mismo mapa (41 KB)
// y el mapa interactivo se carga solo cuando el usuario lo pide.
function MapaOficinas() {
  const [interactivo, setInteractivo] = useState(false);
  if (interactivo) {
    return <iframe title={`Mapa: ${EMPRESA.direccion}`} src={MAPA_EMBED} referrerPolicy="no-referrer-when-downgrade" />;
  }
  return (
    <button type="button" className="ct-mapa-vista" onClick={() => setInteractivo(true)} aria-label={`Ver mapa interactivo: ${EMPRESA.direccion}`}>
      <img {...imgResp('/img/mapa-oficinas.webp', 'contenido')} alt="" width={960} height={600} loading="lazy" decoding="async" />
      <span className="ct-mapa-cta"><MapPin size={16} aria-hidden="true" /> Ver mapa interactivo</span>
      <span className="ct-mapa-credito">Mapa © Google · INEGI</span>
    </button>
  );
}

// Canales por área, separados por segmento. Cada uno lleva sus teléfonos, WhatsApp y correo;
// el WhatsApp y el correo salen de AREAS (site.js) para que todo llegue al área correcta.
const CANALES = {
  empresas: [
    {
      icon: Building2, tono: '#3B82F6', eyebrow: 'Cotiza y contrata', titulo: 'Ventas Empresas y Eventos',
      texto: 'Internet dedicado, enlaces entre sucursales, telefonía IP, redes, CCTV e internet para eventos.',
      tels: [TELEFONOS.ventasEmpresas, TELEFONOS.ventasEmpresasCel],
      area: AREAS.ventasEmpresas,
      wa: 'Hola Comunícalo, quiero información de sus servicios para empresa.',
    },
    {
      icon: Activity, tono: '#22C55E', eyebrow: 'Soporte técnico', titulo: 'NOC Empresas 24/7',
      texto: '¿Falla tu enlace? Nuestro centro de operación de red te atiende las 24 horas.',
      tels: [TELEFONOS.noc],
      area: AREAS.noc,
      wa: 'Hola Comunícalo, quiero reportar una falla en mi enlace empresarial.',
    },
    {
      icon: Receipt, tono: '#A855F7', eyebrow: 'Administración', titulo: 'Facturación Empresas',
      texto: 'Facturas, complementos de pago, aclaraciones y estados de cuenta empresariales.',
      tels: [TELEFONOS.facturacion],
      area: AREAS.facturacion,
    },
  ],
  hogar: [
    {
      icon: House, tono: '#F2A516', eyebrow: 'Contratación', titulo: 'Ventas Hogar',
      texto: 'Contrata internet o TV para tu casa y consulta cobertura en tu fraccionamiento.',
      tels: [TELEFONOS.ventasHogar, TELEFONOS.ventasHogarCel],
      area: AREAS.ventasHogar,
      wa: 'Hola Comunícalo, quiero contratar internet para mi casa.',
    },
    {
      icon: Wrench, tono: '#22C55E', eyebrow: 'Soporte técnico', titulo: 'Soporte Hogar',
      texto: '¿Sin internet, lento o sin señal de TV? Repórtalo y te ayudamos a resolverlo.',
      tels: [TELEFONOS.soporteHogar],
      area: AREAS.soporteHogar,
    },
    {
      icon: Wallet, tono: '#3B82F6', eyebrow: 'Administración', titulo: 'Administración y cobranza',
      texto: 'Pagos, saldos, estados de cuenta y aclaraciones de cobro. Por WhatsApp (chatbot) paga y consulta tu saldo.',
      tels: [TELEFONOS.cobranzaHogar],
      area: AREAS.cobranzaHogar,
      wa: 'Hola Comunícalo, quiero consultar mi saldo de Hogar.',
      waLabel: 'Chatbot WhatsApp 55 7877 0441',
    },
    {
      icon: MessageSquareWarning, tono: '#A855F7', eyebrow: 'Atención a clientes', titulo: 'Cancelaciones y quejas',
      texto: 'Levanta una queja o solicita la cancelación de tu servicio; damos seguimiento a cada caso.',
      tels: [],
      area: AREAS.quejasHogar,
      wa: 'Hola Comunícalo, quiero levantar una queja de mi servicio de Hogar.',
      waLabel: 'Chatbot WhatsApp 55 7877 0441',
    },
  ],
};

const SEGMENTOS = [
  { id: 'empresas', label: 'Empresas y Eventos', icon: Building2 },
  { id: 'hogar', label: 'Hogar', icon: House },
];

// Panel del hero: solo los teléfonos generales de cada segmento.
const LINEAS = [
  { titulo: 'Servicio a Empresas y Eventos', icon: Building2, tels: [TELEFONOS.empresas, TELEFONOS.empresas2] },
  { titulo: 'Servicios residenciales', icon: House, tels: [TELEFONOS.hogar] },
];

const AUTOSERVICIO = [
  { icon: CreditCard, titulo: 'Paga tu servicio', texto: 'Portal de pagos Hogar', href: LINKS.pagos, ext: true },
  { icon: Gauge, titulo: 'Prueba tu velocidad', texto: 'Mide tu conexión', href: LINKS.speedtest, ext: true },
  { icon: FileText, titulo: 'Tabla de escalación', texto: 'Ruta de atención residencial', href: doc('tabla-escalacion-residencial.pdf') },
  { icon: ShieldCheck, titulo: 'Documentos IFT y PROFECO', texto: 'Contratos, bonificaciones y transparencia', to: '/transparencia' },
];

// Misma estética que el banner de cotizar (BannerCotizar): fondo marino, brillo del color del área e ícono de fondo.
// tab: -1 cuando la tarjeta está detrás en el carrusel, para que el teclado no entre a sus enlaces.
function Canal({ c, tab }) {
  const I = c.icon;
  const [usuario, dominio] = c.area.email?.split('@') || [];
  return (
    <article className="ct-canal" style={{ '--tono': c.tono }}>
      <span className="ct-canal-deco" aria-hidden="true"><I size={170} strokeWidth={1} /></span>
      <span className="cz-badge"><span className="cz-badge-dot" aria-hidden="true" /> {c.eyebrow}</span>
      <h3 className="h3">{c.titulo}</h3>
      <p className="ct-canal-text">{c.texto}</p>
      <div className="ct-canal-acciones">
        {c.tels.map((t) => (
          <a key={t.href} className="btn btn-ghost-light btn-block ct-canal-dato" href={t.href} tabIndex={tab}>
            <Phone size={18} aria-hidden="true" />
            <span><small>{t.label}</small>{t.num}</span>
          </a>
        ))}
        {c.area.email && (
          <a className="btn btn-ghost-light btn-block ct-canal-dato" href={`mailto:${c.area.email}`} tabIndex={tab}>
            <Mail size={18} aria-hidden="true" />
            {/* El correo solo se parte después de la @, nunca a media palabra */}
            <span><small>Correo</small>{usuario}@<wbr />{dominio}</span>
          </a>
        )}
        {c.wa && c.area.wa && (
          <a className="btn btn-wa btn-block" target="_blank" rel="noopener noreferrer" href={whatsappUrl(c.wa, c.area.wa)} tabIndex={tab}>
            <MessageCircle size={18} /> {c.waLabel || 'Escribir por WhatsApp'}
          </a>
        )}
      </div>
    </article>
  );
}

function Autoservicio({ a }) {
  const I = a.icon;
  const contenido = (
    <>
      <span className="ct-auto-icon"><I size={20} aria-hidden="true" /></span>
      <span className="ct-auto-body">
        <strong>{a.titulo}</strong>
        <span>{a.texto}</span>
      </span>
      <ArrowUpRight size={18} className="ct-auto-arrow" aria-hidden="true" />
    </>
  );
  if (a.to) return <Link className="ct-auto" to={a.to}>{contenido}</Link>;
  if (a.ext) return <Ext className="ct-auto" href={a.href}>{contenido}</Ext>;
  return <a className="ct-auto" href={a.href} target="_blank" rel="noopener">{contenido}</a>;
}

export default function Contacto() {
  const [segmento, setSegmento] = useState('empresas');
  return (
    <>
      <section className="ct-hero">
        <img {...imgResp('/img/contacto-soporte.webp', 'portada')} alt="" className="ct-hero-foto" width={1024} height={572} fetchpriority="high" decoding="async" />
        <div className="container ct-hero-grid">
          <div>
            <span className="ct-status"><span className="ct-status-dot" aria-hidden="true" /> Atención {EMPRESA.horario.toLowerCase()}</span>
            <h1 className="h1 mt-2">Hablemos. <span className="hl">Estamos para ayudarte.</span></h1>
            <p className="lead">Ventas, soporte técnico, pagos y aclaraciones en un solo lugar. Elige el canal que prefieras y un asesor real te responde.</p>
            <div className="btn-row mt-3">
              <a className="btn btn-accent btn-lg" href={TELEFONOS.empresas.href}><Phone size={18} /> Llamar ahora</a>
              <a className="btn btn-ghost-light btn-lg" href="#formulario"><Send size={18} /> Enviar mensaje</a>
            </div>
            <ul className="trust">
              <li><span><Zap size={16} /> Respuesta el mismo día hábil</span></li>
              <li><span><ShieldCheck size={16} /> Concesionario autorizado IFT</span></li>
              <li><span><MapPin size={16} /> {EMPRESA.direccionCorta}</span></li>
            </ul>
          </div>

          <aside className="ct-lineas" aria-label="Líneas directas">
            {LINEAS.map(({ titulo, icon: I, tels }) => (
              <div key={titulo} className="ct-lineas-grupo">
                <p className="ct-lineas-title"><I size={16} aria-hidden="true" /> {titulo}</p>
                {tels.map((t) => (
                  <a key={t.href} className="ct-linea" href={t.href}>
                    <span className="ct-linea-icon"><Phone size={18} aria-hidden="true" /></span>
                    <span className="ct-linea-body">
                      <span>Llámanos</span>
                      <strong>{t.num}</strong>
                    </span>
                    <ArrowRight size={18} className="ct-linea-call" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Canales de atención" title="¿Con quién quieres hablar?" center>
            Te conectamos directo con el área correcta para resolver más rápido.
          </SectionHead>
          <div className="ct-segmento">
            <div className="seg-tabs seg-tabs--claro" role="tablist" aria-label="Tipo de cliente">
              {SEGMENTOS.map(({ id, label, icon: I }) => (
                <button key={id} type="button" role="tab" aria-selected={segmento === id} aria-controls="ct-canales" onClick={() => setSegmento(id)}>
                  <I size={16} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
          </div>
          <div id="ct-canales" role="tabpanel">
            <Coverflow
              key={segmento}
              items={CANALES[segmento].map((c, i) => ({ ...c, id: `canal-${segmento}-${i}` }))}
              etiqueta="Áreas de atención"
              className="tiles-carousel ct-carousel"
              slideClassName="tile-slide"
              renderSlide={(c, esActivo) => <Canal c={c} tab={esActivo ? undefined : -1} />}
            />
          </div>
        </div>
      </section>

      <section className="section section--alt" id="formulario">
        <div className="container ct-main">
          <div className="ct-form">
            <div className="ct-form-head">
              <span className="eyebrow">Formulario de contacto</span>
              <h2 className="h2">Cuéntanos qué necesitas</h2>
              <p>Llena tus datos y te contactamos. Sin compromiso.</p>
              <ol className="ct-pasos">
                <li><span>1</span> Llena el formulario</li>
                <li><span>2</span> Se abre WhatsApp con tu mensaje</li>
                <li><span>3</span> Un asesor te responde</li>
              </ol>
            </div>
            <div className="ct-form-body">
              <LeadForm key={segmento} interesInicial={segmento === 'hogar' ? 'hogar' : 'internet-dedicado'} titulo="Formulario de contacto" boton="Enviar mensaje por WhatsApp" conMensaje ocultarTitulo />
            </div>
          </div>

          <aside className="ct-info">
            <div className="ct-info-body">
              <span className="eyebrow">Oficinas</span>
              <h2 className="h3 mt-1">Visítanos</h2>
              <ul className="ct-datos">
                <li><MapPin size={20} aria-hidden="true" /><span>{EMPRESA.direccion}</span></li>
                <li><Clock size={20} aria-hidden="true" /><span>{EMPRESA.horario}</span></li>
                <li><Building2 size={20} aria-hidden="true" /><span>Empresas: <a href={TELEFONOS.empresas.href}>{TELEFONOS.empresas.num}</a> · <a href={TELEFONOS.empresas2.href}>{TELEFONOS.empresas2.num}</a></span></li>
                <li><House size={20} aria-hidden="true" /><span>Hogar: <a href={TELEFONOS.hogar.href}>{TELEFONOS.hogar.num}</a></span></li>
              </ul>
            </div>
            <div className="ct-mapa">
              <MapaOficinas />
            </div>
            <div className="ct-info-body">
              <Ext className="btn btn-accent btn-block" href={EMPRESA.mapa}><Navigation size={16} /> Cómo llegar</Ext>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Autoservicio" title="Resuélvelo tú mismo en segundos" />
          <div className="ct-autos">
            {AUTOSERVICIO.map((a) => <Autoservicio key={a.titulo} a={a} />)}
          </div>
        </div>
      </section>
    </>
  );
}
