import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Wifi, Tv, Phone, MapPin, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { Link, Ext } from '../router';
import { SectionHead, Checklist, Faq, CtaBand, Foto, PlanCard } from '../components/ui';
import { whatsappUrl, TELEFONOS, LINKS } from '../data/site';
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
      <section className="page-hero mx">
        <div className="container split" style={{ alignItems: 'center' }}>
          <div>
            <p className="crumbs"><Link to="/hogar">Hogar</Link> › MAXVISION</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: 999, marginBottom: 12 }}>
              <Tv size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                MAXVISION · Otumba y Axapusco
              </span>
            </div>
            <h1 className="h1 mt-1">
              Internet, telefonía y televisión para tu hogar en Otumba y Axapusco
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
              <a href={whatsappUrl('Hola MAXVISION, quiero información sobre la cobertura y paquetes en Otumba y Axapusco.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-lg">
                <MessageCircle size={18} /> Pregúntanos por WhatsApp
              </a>
            </div>
          </div>
          <Foto src="/img/maxvision-hogar.webp" alt="Familia viendo televisión en una sala en Otumba" width={720} height={401} className="foto-wide" prioridad />
        </div>
      </section>

      {/* SUBNAV DE SECCIONES MAXVISION */}
      <nav className="subnav" aria-label="Secciones de MAXVISION">
        <div className="container division-nav" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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
      <section className="section" id="triple-play">
        <div className="container">
          <SectionHead
            eyebrow="TriPP · Triple Play Registrado IFT"
            title="Internet + Telefonía Fija + Televisión (70 canales)"
          >
            Disponible en <strong>toda la red de MAXVISION en Otumba y Axapusco</strong>. Todo en una sola factura con módem WiFi y decodificador digital.
          </SectionHead>
          <div className="plans plans-5">
            {PLANES_TRIPLE_PLAY.map((p) => (
              <PlanCard key={p.id} plan={p} tv />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: DOBLE PLAY (MAXICOM - INTERNET + TELEFONÍA) */}
      <section className="section section--alt" id="maxicom">
        <div className="container">
          <SectionHead
            eyebrow="MaxiCom · Doble Play Registrado IFT"
            title="Internet de Alta Velocidad + Línea Telefónica"
          >
            Planes de 10 a 100 Mbps prepago con recargas cada 30 días, minutos incluidos y módem WiFi en comodato.
          </SectionHead>
          <div className="plans plans-4">
            {PLANES_MAXICOM.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SOLO TELEVISIÓN */}
      <section className="section" id="solo-tv">
        <div className="container">
          <SectionHead eyebrow="Solo Televisión" title="¿Buscas únicamente señal de televisión por cable en tu domicilio?" />
          <div style={{ maxWidth: 650, margin: '0 auto' }}>
            <article className="plan plan--featured" style={{ textAlign: 'center' }}>
              <span className="badge badge-top" style={{ background: 'var(--mx)', color: '#fff' }}>Folio IFT: {PLAN_TV.folio}</span>
              <span className="icon-box mx" style={{ margin: '0 auto' }}><Tv size={24} /></span>
              <div className="plan-name mt-2">{PLAN_TV.nombre}: Televisión Restringida</div>
              <div className="plan-speed">{PLAN_TV.canales}<small> canales</small></div>
              <div className="xs muted">Programación nacional, cine, infantiles, deportes y música</div>
              <div className="plan-price mt-2"><b>{formatoPrecio(PLAN_TV.precio)}</b><span>/mes</span></div>
              <Checklist
                items={[
                  '1 decodificador digital incluido',
                  `Decodificador adicional disponible por solo ${formatoPrecio(PLAN_TV.decodificadorAdicional)}/mes`,
                  'Sin plazo forzoso',
                  'Cobertura en Otumba y Axapusco',
                ]}
              />
              <div className="plan-foot mt-3">
                <a
                  className="btn btn-mx btn-lg btn-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={whatsappUrl(`Hola MAXVISION, quiero contratar ${PLAN_TV.nombre} (${PLAN_TV.canales} canales) por ${formatoPrecio(PLAN_TV.precio)} al mes en Otumba/Axapusco.`)}
                >
                  Contratar MaxiCom TV <ArrowRight size={16} />
                </a>
                <p className="plan-legal mt-2">
                  Prepago. Instalación {formatoPrecio(PLAN_TV.instalacion)}, provisión de equipo {formatoPrecio(PLAN_TV.decodificador)}. <a href={PLAN_TV.pdf} target="_blank" rel="noopener">Ficha oficial IFT (PDF)</a>
                </p>
              </div>
            </article>
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
            mx
            title="Conéctate hoy a MAXVISION en Otumba y Axapusco"
            text="Escríbenos por WhatsApp con tu calle y colonia para validar cobertura y programar tu instalación."
          />
        </div>
      </section>
    </>
  );
}
