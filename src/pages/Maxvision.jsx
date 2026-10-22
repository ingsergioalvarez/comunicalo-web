import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Wifi, Tv, Phone, MapPin, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { Link, Ext } from '../router';
import { SectionHead, Checklist, Faq, CtaBand, PlanCard } from '../components/ui';
import ListaPlanes from '../components/ListaPlanes';
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

export default function Maxvision() {
  return (
    <>
      {/* HERO MAXVISION */}
      <section className="page-hero page-hero--foto page-hero--alto mx">
        <img src="/img/maxvision-familia.webp" alt="" className="page-hero-foto" width={1024} height={372} fetchpriority="high" decoding="async" />
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

            <div className="btn-row mt-3">
              <a href="#triple-play" className="btn btn-mx btn-lg">Ver paquetes con TV <ArrowRight size={18} /></a>
              <a href="#maxicom" className="btn btn-ghost-light btn-lg">Planes MaxiCom</a>
              <a href={whatsappUrl('Hola MAXVISION, quiero información sobre la cobertura y paquetes en Otumba y Axapusco.', AREAS.ventasHogar.wa)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-lg">
                <MessageCircle size={18} /> Pregúntanos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SUBNAV DE SECCIONES MAXVISION */}
      <nav className="subnav" aria-label="Secciones de MAXVISION">
        <div className="container division-nav">
          <a href="#triple-play" className="chip"><Tv size={15} /> Triple Play (Internet + TV + Teléfono)</a>
          <a href="#maxicom" className="chip">Doble Play MaxiCom (Internet + Teléfono)</a>
          <a href="#solo-tv" className="chip">Solo Televisión ($280)</a>
          <a href="#canales" className="chip">Guía de Canales</a>
          <Link to="/hogar" className="chip" style={{ marginLeft: 'auto' }}>
            ← Ver cobertura Comunícalo (Tizayuca, Tolcayuca, Zumpango, Coacalco...)
          </Link>
        </div>
      </nav>

      {/* SECCIÓN 1: TRIPLE PLAY (TRIPP CON TV EN TODA LA RED DE OTUMBA Y AXAPUSCO) */}
      <section className="section section--planes" id="triple-play">
        <div className="container">
          <SectionHead
            eyebrow="TriPP · Triple Play Registrado IFT"
            title="Internet + Telefonía Fija + Televisión (70 canales)"
          >
            Disponible en <strong>toda la red de MAXVISION en Otumba y Axapusco</strong>. Todo en una sola factura con módem WiFi y decodificador digital.
          </SectionHead>
          <ListaPlanes planes={PLANES_TRIPLE_PLAY} tv mx etiqueta="Paquetes Triple Play TriPP" />
        </div>
      </section>

      {/* SECCIÓN 2: DOBLE PLAY (MAXICOM - INTERNET + TELEFONÍA) */}
      <section className="section section--planes section--alt" id="maxicom">
        <div className="container">
          <SectionHead
            eyebrow="MaxiCom · Doble Play Registrado IFT"
            title="Internet de Alta Velocidad + Línea Telefónica"
          >
            Planes de 10 a 100 Mbps prepago con recargas cada 30 días, minutos incluidos y módem WiFi en comodato.
          </SectionHead>
          <ListaPlanes planes={PLANES_MAXICOM} mx etiqueta="Planes Doble Play MaxiCom" />
        </div>
      </section>

      {/* SECCIÓN 3: SOLO TELEVISIÓN */}
      <section className="section section--planes" id="solo-tv">
        <div className="container">
          <SectionHead eyebrow="Solo Televisión" title="¿Buscas únicamente señal de televisión por cable en tu domicilio?" />
          <div style={{ maxWidth: 420, margin: '0 auto' }}>
            <PlanCard
              tv
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
        </div>
      </section>

      {/* SECCIÓN 4: BARRA DE CANALES */}
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

      {/* SECCIÓN 5: PREGUNTAS FRECUENTES MAXVISION */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas sobre el servicio en Otumba y Axapusco" center />
          <Faq items={FAQ_MAXVISION} />
        </div>
      </section>

      {/* SECCIÓN 6: CTA BAND */}
      <section className="section section--alt">
        <div className="container">
          <CtaBand
            to="/cotizar?para=hogar"
            mx
            title="Conéctate hoy a MAXVISION en Otumba y Axapusco"
            text="Escríbenos por WhatsApp con tu calle y colonia para validar cobertura y programar tu instalación."
          />
        </div>
      </section>
    </>
  );
}
