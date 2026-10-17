import React, { useState } from 'react';
import { ArrowRight, Phone, Tv, Wifi, FileText, CreditCard, MapPin, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { Link, Ext } from '../router';
import { SectionHead, Checklist, LeadForm, Faq, PlanCard, Foto } from '../components/ui';
import { TELEFONOS, LINKS, whatsappUrl } from '../data/site';
import {
  PLANES_COMUNICALO_PAQD,
  PLANES_COMUNICALO_L,
  PLAN_SOLO_INTERNET,
  COBERTURA_COMUNICALO,
  BARRA_CANALES,
  formatoPrecio
} from '../data/planes';
import { FAQ_GENERAL } from '../data/comercial';

function BarraCanalesVillaMagna() {
  const categorias = Object.keys(BARRA_CANALES);
  const [cat, setCat] = useState(categorias[0]);
  return (
    <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}>
          <Tv size={15} /> Exclusivo Fracc. Villa Magna (Tizayuca)
        </span>
        <span className="small muted">79 canales con señal digital de alta definición</span>
      </div>
      <div className="chips mb-3" role="tablist" aria-label="Categorías de canales">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${cat === c ? 'chip-active' : ''}`}
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
        Programación registrada ante el IFT y sujeta a cambios por el programador. <a className="link" href="/docs/barra-canales-tizayuca.pdf" target="_blank" rel="noopener">Ver barra completa oficial (PDF)</a>
      </p>
    </div>
  );
}

export default function Hogar() {
  const [tabPlanes, setTabPlanes] = useState('paqd');

  return (
    <>
      {/* HERO COMUNÍCALO HOGAR */}
      <section className="page-hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 999, marginBottom: 12 }}>
            <Wifi size={16} className="hl" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Internet Residencial Comunícalo
            </span>
          </div>
          <h1 className="h1 mt-1">
            Internet de fibra óptica para tu hogar desde <span className="hl">{formatoPrecio(PLAN_SOLO_INTERNET.precio)}</span> al mes
          </h1>
          <p className="lead">
            Conexión rápida, estable y sin plazos forzosos para navegar, estudiar y trabajar. Red propia con soporte técnico en tu zona.
          </p>

          {/* BADGE DE COBERTURA EN HERO */}
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <span className="small muted" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={16} className="hl" /> Cobertura directa en:
            </span>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', cursor: 'default' }}>
              Hidalgo: Tizayuca y Tolcayuca
            </span>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', cursor: 'default' }}>
              Edo. Méx.: Zumpango, Coacalco, Tlalnepantla y Nopaltepec
            </span>
          </div>

          <div className="btn-row mt-3">
            <a href="#planes" className="btn btn-accent btn-lg">Ver planes Comunícalo <ArrowRight size={18} /></a>
            <a href={TELEFONOS.hogar.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {TELEFONOS.hogar.num}</a>
            <Ext href={LINKS.pagos} className="btn btn-ghost-light btn-lg"><CreditCard size={18} /> Pagar mi servicio</Ext>
          </div>
        </div>
      </section>

      {/* SUBNAV DE SECCIONES */}
      <nav className="subnav" aria-label="Secciones de Hogar">
        <div className="container division-nav" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a href="#planes" className="chip">Planes PAQ D (Internet + Teléfono)</a>
          <a href="#plan-inteligente" className="chip">Plan Inteligente ($320)</a>
          <a href="#serie-l" className="chip">Serie L Residencial</a>
          <a href="#villa-magna" className="chip"><Tv size={15} /> TV en Villa Magna</a>
          <Link to="/maxvision" className="chip chip-mx" style={{ marginLeft: 'auto' }}>
            <Tv size={15} /> ¿Vives en Otumba o Axapusco? Ver MAXVISION
          </Link>
        </div>
      </nav>

      {/* SECCIÓN 1: PLANES PRINCIPALES PAQ D (INTERNET + TELEFONÍA) */}
      <section className="section" id="planes">
        <div className="container">
          <SectionHead
            eyebrow="Tarifas oficiales Comunícalo · Registro IFT"
            title="Paquetes PAQ D: Internet de Alta Velocidad + Telefonía Fija"
          >
            Planes prepago con recargas cada 30 días, módem WiFi incluido y 3,000 minutos a números fijos y celulares.
          </SectionHead>

          <div className="plans plans-3">
            {PLANES_COMUNICALO_PAQD.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>

          <div className="alert mt-3" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', background: 'var(--surface)' }}>
            <div>
              <strong>¿Qué incluye cada paquete PAQ D?</strong> Módem WiFi de alta potencia en comodato, telefonía fija con 3,000 min fijos nacionales, 3,000 min a celular y 500 min a EUA y Canadá. Sin plazo forzoso.
            </div>
            <a href="#villa-magna" className="link small">Ver disponibilidad de TV en Fracc. Villa Magna <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: PLAN INTELIGENTE (SOLO INTERNET FIJO POR $320) */}
      <section className="section section--alt" id="plan-inteligente">
        <div className="container">
          <div className="split" style={{ alignItems: 'center', gap: '2.5rem' }}>
            <div>
              <span className="eyebrow">Solo Internet Fijo · Sin Línea Telefónica</span>
              <h2 className="h2 mt-1">Plan Inteligente: Conéctate por solo <span className="hl">{formatoPrecio(PLAN_SOLO_INTERNET.precio)}</span> al mes</h2>
              <p className="lead">
                Ideal para quienes solo necesitan navegar, hacer home office, tareas escolares o ver series sin contratar telefonía fija.
              </p>
              <Checklist
                items={[
                  `Velocidad de ${PLAN_SOLO_INTERNET.bajada} Mbps de bajada y ${PLAN_SOLO_INTERNET.subida} Mbps de subida`,
                  'Módem WiFi en comodato incluido sin costo de renta',
                  `Plazo mínimo de permanencia de ${PLAN_SOLO_INTERNET.permanencia} meses`,
                  'Soporte técnico preferente en tu municipio',
                ]}
              />
              <div className="btn-row mt-3">
                <a
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={whatsappUrl(`Hola Comunícalo, me interesa contratar el ${PLAN_SOLO_INTERNET.nombre} de ${formatoPrecio(PLAN_SOLO_INTERNET.precio)} al mes. Mi domicilio está en...`)}
                >
                  Contratar Plan Inteligente <ArrowRight size={18} />
                </a>
                <span className="small muted" style={{ alignSelf: 'center' }}>
                  Folio IFT: {PLAN_SOLO_INTERNET.folio} · <a href={PLAN_SOLO_INTERNET.pdf} target="_blank" rel="noopener" className="link">Ficha IFT (PDF)</a>
                </span>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', border: '2px solid var(--accent)', position: 'relative' }}>
              <span className="badge badge-accent badge-top">Tarifa IFT: 1244978</span>
              <span className="icon-box"><Wifi size={24} /></span>
              <h3 className="h3 mt-2">{PLAN_SOLO_INTERNET.nombre}</h3>
              <div className="plan-speed mt-1">{PLAN_SOLO_INTERNET.bajada}<small> Mbps</small></div>
              <div className="small muted">Bajada {PLAN_SOLO_INTERNET.bajada} Mbps · Subida {PLAN_SOLO_INTERNET.subida} Mbps</div>
              <div className="plan-price mt-2">
                <b>{formatoPrecio(PLAN_SOLO_INTERNET.precio)}</b><span>/mes</span>
              </div>
              <p className="small muted mt-2">
                Conexión continua sobre infraestructura propia de Comunícalo en Hidalgo y Estado de México.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SERIE L RESIDENCIAL */}
      <section className="section" id="serie-l">
        <div className="container">
          <SectionHead
            eyebrow="Planes Serie L · Comunícalo"
            title="Alternativas Residenciales de Mayor Transferencia"
          >
            Planes registrados ante el IFT para usuarios que demandan estabilidad y capacidad sostenida.
          </SectionHead>

          <div className="plans plans-3">
            {PLANES_COMUNICALO_L.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: INFORMACIÓN CRÍTICA DE TELEVISIÓN EN COMUNÍCALO (EXCLUSIVO VILLA MAGNA) */}
      <section className="section section--alt" id="villa-magna">
        <div className="container">
          <div className="cta-band" style={{ background: 'linear-gradient(135deg, rgba(20,42,68,0.95), rgba(15,30,50,0.98))', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <span className="badge badge-accent mb-2" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Tv size={15} /> Aviso Oficial de Televisión Comunícalo
              </span>
              <h2 className="h2 mt-1">Servicio de Televisión: Exclusivo en Fraccionamiento Villa Magna</h2>
              <p className="lead" style={{ maxWidth: 680 }}>
                En la red de Comunícalo, el servicio de televisión por cable se ofrece <strong>de manera exclusiva para los residentes del Fraccionamiento Villa Magna en Tizayuca, Hidalgo</strong>.
              </p>
              <p className="small muted mt-1">
                En el resto de los municipios de la red Comunícalo (Tolcayuca, Zumpango, Coacalco, Tlalnepantla y Nopaltepec) nos enfocamos en proveer internet de fibra óptica y telefonía fija de alta fidelidad.
              </p>
              <div className="btn-row mt-3">
                <a
                  href={whatsappUrl('Hola Comunícalo, soy vecino de Fracc. Villa Magna en Tizayuca y me interesa contratar el servicio de televisión e internet.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-lg"
                >
                  Soy de Villa Magna y quiero informes <ArrowRight size={18} />
                </a>
              </div>
            </div>
            <div style={{ flex: '1 1 360px' }}>
              <BarraCanalesVillaMagna />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: PUENTE COMERCIAL HACIA MAXVISION (OTUMBA Y AXAPUSCO) */}
      <section className="section" id="maxvision-bridge">
        <div className="container">
          <div className="cta-band band-mx" style={{ borderRadius: 16 }}>
            <div>
              <span className="eyebrow" style={{ color: '#FF8FA8' }}>Marca Aliada · Estado de México</span>
              <h2 className="h2 mt-1">¿Te encuentras en Otumba o Axapusco?</h2>
              <p className="lead">
                Tu servicio residencial opera a través de nuestra marca <strong>MAXVISION</strong>, con cobertura completa de Internet Doble Play, paquetes Triple Play y televisión disponible en toda la red de la región.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1rem' }}>
                <span className="chip" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', cursor: 'default' }}>
                  ✓ MaxiCom 10, 20, 50 y 100 Mbps
                </span>
                <span className="chip" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', cursor: 'default' }}>
                  ✓ Triple Play TriPP con 70 canales
                </span>
                <span className="chip" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', cursor: 'default' }}>
                  ✓ Televisión disponible en toda la red
                </span>
              </div>
            </div>
            <div className="stack" style={{ minWidth: 280 }}>
              <Link to="/maxvision" className="btn btn-mx btn-lg btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Ver planes MAXVISION <ArrowRight size={18} />
              </Link>
              <p className="xs muted text-center">Consulta tarifas registradas MaxiCom y TriPP</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: PROCESO DE CONTRATACIÓN Y FORMULARIO */}
      <section className="section section--alt">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Contratación rápida" title="Te confirmamos cobertura en tu domicilio" />
            <Checklist
              items={[
                'Requisitos sencillos: Identificación oficial (INE) y comprobante de domicilio',
                'Instalación estándar de 5 a 10 días hábiles por cuadrilla técnica propia',
                'Opciones de pago: en línea, transferencia o sucursal autorizada',
                'Soporte técnico cercano y atención telefónica local',
              ]}
            />
            <div className="card mt-3" style={{ background: 'var(--surface)', padding: '1.25rem' }}>
              <h4 className="h4" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={18} className="hl" /> Municipios con Cobertura Comunícalo
              </h4>
              <p className="small muted mt-1">
                <strong>Hidalgo:</strong> Tizayuca (incluido Fracc. Villa Magna) y Tolcayuca.<br />
                <strong>Estado de México:</strong> Zumpango, Coacalco, Tlalnepantla y Nopaltepec.
              </p>
              <p className="xs muted mt-2">
                <FileText size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Todas nuestras tarifas residenciales se encuentran debidamente registradas ante el Instituto Federal de Telecomunicaciones (IFT).
                Consulta folios y contratos en el <Link className="link" to="/transparencia">Centro de transparencia</Link>.
              </p>
            </div>
          </div>
          <div className="card">
            <LeadForm interesInicial="hogar" titulo="Quiero internet Comunícalo en mi casa" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: PREGUNTAS FRECUENTES */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas habituales sobre el servicio para el hogar" center />
          <Faq
            items={[
              {
                p: '¿Cuáles son las zonas con cobertura de Comunícalo Residencial?',
                r: 'Contamos con infraestructura propia en Tizayuca y Tolcayuca (Hidalgo), así como en Zumpango, Coacalco, Tlalnepantla y Nopaltepec (Estado de México). Si vives en Otumba o Axapusco, tu servicio opera bajo nuestra marca hermana MAXVISION.'
              },
              {
                p: '¿En qué zonas se puede contratar servicio de televisión con Comunícalo?',
                r: 'En la red de Comunícalo, el servicio de televisión restringida por cable se ofrece exclusivamente dentro del Fraccionamiento Villa Magna en Tizayuca, Hidalgo. Para el resto de zonas ofrecemos internet de alta velocidad y telefonía fija.'
              },
              {
                p: '¿Los paquetes PAQ D tienen plazo forzoso?',
                r: 'No. Los paquetes PAQ D y Serie L son bajo modalidad de prepago con recargas cada 30 días, lo que te da total libertad y control de tu presupuesto. El único plan con permanencia mínima de 12 meses es el Plan Inteligente ($320/mes).'
              },
              {
                p: '¿Qué incluye la línea telefónica fija?',
                r: 'Incluye 3,000 minutos a números fijos nacionales, 3,000 minutos a teléfonos celulares de México y 500 minutos para llamadas internacionales a Estados Unidos y Canadá.'
              },
              {
                p: '¿Cuánto tiempo tarda la instalación?',
                r: 'Una vez validada la cobertura técnica en tu domicilio, la instalación se agenda y completa en un plazo habitual de 5 a 10 días hábiles.'
              }
            ]}
          />
        </div>
      </section>
    </>
  );
}
