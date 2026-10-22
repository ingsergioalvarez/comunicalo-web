import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Wifi, Tv, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, CreditCard, Wrench } from 'lucide-react';
import { Link, Ext } from '../router';
import { SectionHead, Checklist, Faq, PlanCard } from '../components/ui';
import ListaPlanes from '../components/ListaPlanes';
import FormMaxvision from '../components/FormMaxvision';
import { whatsappUrl, AREAS, TELEFONOS, LINKS } from '../data/site';
import {
  PLANES_MAXICOM,
  PLANES_TRIPLE_PLAY,
  PLAN_TV,
  COBERTURA_MAXVISION,
  BARRA_CANALES,
  formatoPrecio
} from '../data/planes';
import { FAQ_MAXVISION } from '../data/maxvision';
import { imgResp } from '../imagenes';

function BarraCanalesMaxvision() {
  const categorias = Object.keys(BARRA_CANALES);
  const [cat, setCat] = useState(categorias[0]);
  return (
    <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span className="badge" style={{ background: 'var(--mx)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}>
          <Tv size={15} /> Señal digital en toda la red de Otumba y Axapusco
        </span>
        <span className="small muted">70 canales de programación familiar, deportes, cine, infantiles y noticias</span>
      </div>
      <div className="chips mb-3" role="tablist" aria-label="Categorías de canales">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${cat === c ? 'chip-active chip-mx-active' : ''}`}
            role="tab"
            aria-selected={cat === c}
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="tv-list">
        {BARRA_CANALES[cat].map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="xs muted mt-3">
        Programación registrada ante el IFT y sujeta a cambios por el programador.
      </p>
    </div>
  );
}

// Contactos propios de MAXVISION: solo viven en esta página (oferta regional)
const WA_MAXVISION = 'Hola MAXVISION, quiero información sobre la cobertura y paquetes en Otumba y Axapusco.';

function ContactoMaxvision() {
  return (
    <div className="stack">
      <div className="card">
        <h3 className="h4 mx-contacto-titulo"><Phone size={18} aria-hidden="true" /> Ventas y administración</h3>
        <p className="small muted mt-1">Contrataciones, pagos, saldos y aclaraciones.</p>
        <div className="mx-contacto-acciones">
          <a className="btn btn-wa btn-block" target="_blank" rel="noopener noreferrer" href={whatsappUrl(WA_MAXVISION, AREAS.ventasMaxvision.wa)}>
            <MessageCircle size={18} /> WhatsApp {TELEFONOS.maxvisionCel.num}
          </a>
          <a className="btn btn-outline btn-block" href={TELEFONOS.maxvisionFijo.href}><Phone size={18} /> {TELEFONOS.maxvisionFijo.num}</a>
        </div>
      </div>
      <div className="card">
        <h3 className="h4 mx-contacto-titulo"><Wrench size={18} aria-hidden="true" /> Atención a fallas</h3>
        <p className="small muted mt-1">¿Sin internet, lento o sin señal de TV? Repórtalo y te ayudamos.</p>
        <div className="mx-contacto-acciones">
          <a className="btn btn-outline btn-block" href={TELEFONOS.soporteHogar.href}><Phone size={18} /> {TELEFONOS.soporteHogar.num}</a>
          <a className="btn btn-outline btn-block" href={`mailto:${AREAS.soporteHogar.email}`}><Mail size={18} /> {AREAS.soporteHogar.email}</a>
        </div>
      </div>
    </div>
  );
}

// Oferta comercial en un solo contenedor: el selector cambia entre los tres tipos de servicio
const OFERTAS = [
  {
    id: 'internet', tab: 'Internet + teléfono', corto: 'Internet + tel.', iconos: [Wifi, Phone], eyebrow: 'MaxiCom · Doble Play Registrado IFT',
    titulo: 'Internet de Alta Velocidad + Línea Telefónica',
    texto: 'Planes de 10 a 100 Mbps prepago con recargas cada 30 días, minutos incluidos y módem WiFi en comodato.',
  },
  {
    id: 'tv', tab: 'Internet + teléfono + TV', corto: 'Con TV', iconos: [Wifi, Phone, Tv], eyebrow: 'TriPP · Triple Play Registrado IFT',
    titulo: 'Internet + Telefonía Fija + Televisión (70 canales)',
    texto: 'Disponible en toda la red de MAXVISION en Otumba y Axapusco. Todo en una sola factura con módem WiFi y decodificador digital.',
  },
  {
    id: 'solo-tv', tab: 'Solo TV', corto: 'Solo TV', iconos: [Tv], eyebrow: 'Solo Televisión',
    titulo: '¿Buscas únicamente señal de televisión en tu domicilio?',
    texto: 'Programación nacional, cine, infantiles, deportes y música con decodificador digital.',
  },
];

export default function Maxvision() {
  const [oferta, setOferta] = useState('tv');
  const o = OFERTAS.find((x) => x.id === oferta);

  // "Me interesa" en una tarjeta preselecciona el paquete en el formulario y baja a él
  const [planElegido, setPlanElegido] = useState('');
  const elegir = (p) => {
    setPlanElegido(p.id);
    document.getElementById('contratar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* HERO MAXVISION */}
      <section className="page-hero page-hero--foto page-hero--alto mx">
        <img {...imgResp('/img/maxvision-familia.webp', 'portada')} alt="" className="page-hero-foto" width={1024} height={372} fetchpriority="high" decoding="async" />
        <div className="container">
          <div>
            <p className="crumbs"><Link to="/hogar">Hogar</Link> › MAXVISION</p>
            <span className="mx-logo">
              <img src="/img/logo-maxvision.webp" alt="MAXVISION" width={545} height={96} fetchpriority="high" decoding="async" />
            </span>
            <h1 className="h1">
              Internet, telefonía y TV en Otumba y Axapusco
            </h1>
            <p className="lead">
              Conexión de alta velocidad con <strong>televisión disponible en toda la red</strong>. Elige entre paquetes Triple Play con 70 canales (TriPP), Doble Play (MaxiCom) o servicio de televisión con decodificador digital.
            </p>

            <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <span className="small muted" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={16} /> Cobertura total en:
              </span>
              <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'default', fontWeight: 600 }}>
                Otumba (Edo. Méx.)
              </span>
              <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'default', fontWeight: 600 }}>
                Axapusco (Edo. Méx.)
              </span>
              <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'default' }}>
                📺 TV disponible en toda la red
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: OFERTA COMERCIAL (un contenedor con selector de tipo de servicio) */}
      <section className="section section--planes" id="paquetes">
        <div className="container">
          <div className="mx-selector">
            <div className="seg-tabs seg-tabs--claro" role="tablist" aria-label="Tipo de servicio">
              {OFERTAS.map((x) => (
                <button key={x.id} type="button" role="tab" aria-selected={oferta === x.id} aria-controls="mx-oferta" aria-label={x.tab} onClick={() => setOferta(x.id)}>
                  <span className="mx-tab-iconos" aria-hidden="true">{x.iconos.map((I, i) => <I key={i} size={15} />)}</span>
                  {/* En celular va el texto corto para que las tres opciones quepan en una línea */}
                  <span className="mx-tab-largo">{x.tab}</span>
                  <span className="mx-tab-corto" aria-hidden="true">{x.corto}</span>
                </button>
              ))}
            </div>
          </div>
          <div id="mx-oferta" role="tabpanel">
            <SectionHead eyebrow={o.eyebrow} title={o.titulo}>{o.texto}</SectionHead>
            {oferta === 'tv' && <ListaPlanes key="tv" planes={PLANES_TRIPLE_PLAY} tv mx onElegir={elegir} etiqueta="Paquetes Triple Play TriPP" />}
            {oferta === 'internet' && <ListaPlanes key="internet" planes={PLANES_MAXICOM} mx onElegir={elegir} etiqueta="Planes Doble Play MaxiCom" />}
            {oferta === 'solo-tv' && (
              <div style={{ maxWidth: 420, margin: '0 auto' }}>
                <PlanCard
                  tv
                  onElegir={elegir}
                  plan={{
                    ...PLAN_TV,
                    bajada: PLAN_TV.canales,
                    canales: PLAN_TV.canales,
                    ideal: 'Programación nacional, cine, infantiles, deportes y música con decodificador digital',
                    destacado: true,
                    badge: 'Solo TV · 79 Canales',
                    marca: 'MAXVISION',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: BARRA DE CANALES (solo con paquetes que incluyen TV) */}
      {oferta !== 'internet' && (
        <section className="section section--alt" id="canales">
          <div className="container">
            <SectionHead
              eyebrow="Guía de canales"
              title="Conoce la programación incluida en MAXVISION"
            >
              Canales nacionales en alta definición, canales deportivos, cine de estreno y las mejores caricaturas.
            </SectionHead>
            <BarraCanalesMaxvision />
          </div>
        </section>
      )}

      {/* SECCIÓN 3: CONTRATACIÓN (formulario y contactos propios de MAXVISION) */}
      <section className="section" id="contratar">
        <div className="container">
          <SectionHead eyebrow="Contrata MAXVISION" title="Conéctate hoy en Otumba y Axapusco" center>
            Déjanos tus datos y validamos cobertura en tu domicilio para programar tu instalación.
          </SectionHead>
          <div className="split" style={{ alignItems: 'start' }}>
            <ContactoMaxvision />
            <div className="card">
              <FormMaxvision planInicial={planElegido} />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: PREGUNTAS FRECUENTES MAXVISION */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas sobre el servicio en Otumba y Axapusco" center />
          <Faq items={FAQ_MAXVISION} />
        </div>
      </section>

    </>
  );
}
