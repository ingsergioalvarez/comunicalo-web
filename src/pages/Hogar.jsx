import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, Tv, Wifi, FileText, CreditCard, MapPin, MessageCircle, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link, Ext, useRouter } from '../router';
import { SectionHead, Checklist, Faq, Foto } from '../components/ui';
import { BannerCotizar, urlCotizar } from '../components/Cotiza';
import ListaPlanes from '../components/ListaPlanes';
import CarruselAvisos from '../components/CarruselAvisos';
import { TELEFONOS, LINKS, AREAS, WHATSAPP_BOT_HOGAR, whatsappUrl } from '../data/site';
import { COMUNICADOS, SLIDES_CHATBOT } from '../data/comunicados';
import { doc } from '../data/documentos';
import {
  ZONAS_HOGAR,
  PLANES_HOGAR_DEFAULT,
  PLAN_SOLO_INTERNET,
  BARRA_CANALES,
  formatoPrecio
} from '../data/planes';
import { FAQ_GENERAL } from '../data/comercial';
import { imgResp } from '../imagenes';

function BarraCanalesVillaMagna() {
  const categorias = Object.keys(BARRA_CANALES);
  const [cat, setCat] = useState(categorias[0]);
  return (
    <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}>
          <Tv size={15} /> Canales en Fracc. Villa Magna (Tizayuca)
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
        Programación registrada ante el IFT y sujeta a cambios por el programador. <a className="link" href={doc('barra-canales-tizayuca.pdf')} target="_blank" rel="noopener">Ver barra completa oficial (PDF)</a>
      </p>
    </div>
  );
}

// Panel destacado para elegir municipio: es el primer paso para ver el precio.
function SelectorZona({ zonaId, onChange }) {
  const estados = [...new Set(ZONAS_HOGAR.map((z) => z.estado))];
  const zona = ZONAS_HOGAR.find((z) => z.id === zonaId);
  return (
    <div className={`zona-picker${zona ? ' is-set' : ''}`}>
      <span className="zona-picker-icon">
        {zona ? <CheckCircle2 size={24} aria-hidden="true" /> : <MapPin size={24} aria-hidden="true" />}
      </span>
      <div className="zona-picker-body">
        <label htmlFor="zona-hogar" className="zona-picker-label">
          {zona ? 'Tu municipio' : 'Paso 1 · ¿En qué municipio vives?'}
        </label>
        <p className="zona-picker-status" aria-live="polite">
          {zona ? (
            <>Precios para <strong>{zona.nombre}</strong>, {zona.estado}.{zona.planesTv ? ' Aquí también tenemos televisión.' : ''}</>
          ) : zonaId === 'otra' ? (
            <>Escríbenos y te confirmamos cobertura y precio.{' '}
              <a className="link" target="_blank" rel="noopener noreferrer" href={whatsappUrl('Hola Comunícalo, mi municipio no aparece en la lista. Vivo en...', AREAS.ventasHogar.wa)}>Consultar por WhatsApp</a>
            </>
          ) : (
            'Elígelo para ver el precio que te corresponde.'
          )}
        </p>
      </div>
      <select id="zona-hogar" className="select zona-picker-select" style={{ scrollMarginTop: 140 }} value={zonaId} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecciona tu municipio</option>
        {estados.map((e) => (
          <optgroup key={e} label={e}>
            {ZONAS_HOGAR.filter((z) => z.estado === e).map((z) => (
              <option key={z.id} value={z.id}>{z.nombre}{z.planesTv ? ' · Internet + TV' : ''}</option>
            ))}
          </optgroup>
        ))}
        <option value="otra">Mi municipio no aparece</option>
      </select>
    </div>
  );
}

// Capa sobre los paquetes: invita a elegir municipio para conocer la oferta y el precio de la zona.
function ZonaGate({ zonaId, onChange }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const estados = [...new Set(ZONAS_HOGAR.map((z) => z.estado))];

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="zona-gate" ref={ref}>
      <div className={`zona-gate-card${visible ? ' is-visible' : ''}`}>
        <div className="zona-gate-head">
          <span className="zona-gate-icon"><MapPin size={20} aria-hidden="true" /></span>
          <div>
            <p className="zona-gate-step">Paso 1</p>
            <p className="zona-gate-title">Elige tu municipio para ver tu precio</p>
          </div>
        </div>
        <label htmlFor="zona-gate-select" className="sr-only">Municipio</label>
        <select id="zona-gate-select" className="select" value={zonaId} onChange={(e) => onChange(e.target.value)}>
          <option value="">Selecciona tu municipio</option>
          {estados.map((e) => (
            <optgroup key={e} label={e}>
              {ZONAS_HOGAR.filter((z) => z.estado === e).map((z) => (
                <option key={z.id} value={z.id}>{z.nombre}{z.planesTv ? ' · Internet + TV' : ''}</option>
              ))}
            </optgroup>
          ))}
          <option value="otra">Mi municipio no aparece</option>
        </select>
        <p className="zona-gate-tv"><Tv size={15} aria-hidden="true" /> Paquetes con televisión en {ZONAS_HOGAR.filter((z) => z.planesTv).map((z) => z.nombre.replace(/^.*— /, '')).join(' y ')}</p>
        {zonaId === 'otra' && (
          <a className="btn btn-wa btn-sm btn-block" target="_blank" rel="noopener noreferrer" href={whatsappUrl('Hola Comunícalo, mi municipio no aparece en la lista. Vivo en...', AREAS.ventasHogar.wa)}>
            <MessageCircle size={16} /> Consultar cobertura por WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function SelectorTv({ conTv, setConTv, tvs, setTvs }) {
  return (
    <div className="tv-switch">
      <div className="tv-switch-opts" role="group" aria-label="Tipo de paquete">
        <button type="button" className="tv-opt" aria-pressed={conTv} onClick={() => setConTv(true)}>
          <span className="tv-opt-icon"><Tv size={22} aria-hidden="true" /></span>
          <span><strong>Internet + TV + Teléfono</strong><span>Televisión digital con decodificador</span></span>
          <span className="tv-opt-badge">Disponible en tu zona</span>
        </button>
        <button type="button" className="tv-opt" aria-pressed={!conTv} onClick={() => setConTv(false)}>
          <span className="tv-opt-icon"><Wifi size={22} aria-hidden="true" /></span>
          <span><strong>Internet + Teléfono</strong><span>Solo conectividad</span></span>
        </button>
      </div>
      {conTv && (
        <div className="tv-switch-tvs">
          <span className="small">¿Cuántas televisiones?</span>
          <div className="chips" role="group" aria-label="Número de televisores">
            {[1, 2, 3].map((n) => (
              <button key={n} type="button" className="chip" aria-pressed={tvs === n} onClick={() => setTvs(n)}>
                <Tv size={14} /> {n} {n === 1 ? 'TV' : 'TVs'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Hogar() {
  const [zonaId, setZonaId] = useState('');
  const [conTv, setConTv] = useState(false);
  const [tvs, setTvs] = useState(1);
  const { search, navigate } = useRouter();
  const zona = ZONAS_HOGAR.find((z) => z.id === zonaId);
  const elegirZona = (id) => {
    setZonaId(id);
    setConTv(!!ZONAS_HOGAR.find((z) => z.id === id)?.planesTv);
  };
  // "Me interesa" lleva al cotizador con el municipio y el paquete ya elegidos
  const elegirPlan = (p) => navigate(urlCotizar('hogar', { zona: zonaId, plan: p.id }));

  // ?zona=<id> preselecciona el municipio (enlaces externos o campañas)
  useEffect(() => {
    const id = new URLSearchParams(search).get('zona');
    if (id && (id === 'otra' || ZONAS_HOGAR.some((z) => z.id === id))) elegirZona(id);
  }, [search]);
  const verTv = conTv && !!zona?.planesTv;
  const planesZona = verTv
    ? zona.planesTv.filter((p) => p.tvs === tvs)
    : (zona?.planes || PLANES_HOGAR_DEFAULT);
  // El Plan Inteligente aplica en todos los municipios: va primero en los paquetes de internet.
  const destacadoId = planesZona[1]?.id;
  const planes = (verTv ? planesZona : [PLAN_SOLO_INTERNET, ...planesZona]).map((p) => ({
    ...p,
    destacado: p.id === destacadoId,
    badge: p.id === destacadoId ? 'Más popular' : (p.id === PLAN_SOLO_INTERNET.id ? 'El más económico' : undefined),
  }));
  // El precio se revela solo con un municipio de la lista; "otra" o sin elegir lo deja difuminado.
  const precioOculto = zona ? undefined : 'zona-hogar';

  return (
    <>
      {/* HERO COMUNÍCALO HOGAR */}
      <section className="page-hero page-hero--foto page-hero--alto">
        <img {...imgResp('/img/hogar-familia.webp', 'portada')} alt="" className="page-hero-foto" width={1600} height={567} fetchpriority="high" decoding="async" />
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
              Edo. Méx.: Tecámac, Zumpango, Coacalco, Tlalnepantla y Nopaltepec
            </span>
          </div>

          <div className="btn-row mt-3">
            <a href="#planes" className="btn btn-accent btn-lg">Ver planes Comunícalo <ArrowRight size={18} /></a>
            <a href={TELEFONOS.hogar.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {TELEFONOS.hogar.num}</a>
            <Ext href={LINKS.pagos} className="btn btn-ghost-light btn-lg"><CreditCard size={18} /> Pagar mi servicio</Ext>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: PAQUETES INTERNET + TELEFONÍA (TARIFA D o L SEGÚN FRACCIONAMIENTO) */}
      <section className="section section--planes" id="planes">
        <div className="container">
          <SectionHead
            eyebrow="Tarifas oficiales Comunícalo · Registro IFT"
            title="Paquetes de Internet de Alta Velocidad + Telefonía Fija"
          >
            Planes prepago con recargas cada 30 días y módem WiFi incluido. El precio depende de tu municipio.
          </SectionHead>

          <div className="mb-3">
            <SelectorZona zonaId={zonaId} onChange={elegirZona} />
          </div>

          {zona?.planesTv && (
            <div className="mb-3">
              <SelectorTv conTv={conTv} setConTv={setConTv} tvs={tvs} setTvs={setTvs} />
            </div>
          )}

          <div className={`plans-gate${zona ? '' : ' is-locked'}`}>
            <div className="plans-gate-content" inert={zona ? undefined : ''} aria-hidden={zona ? undefined : true}>
              <ListaPlanes planes={planes} tv={verTv} precioOculto={precioOculto} onElegir={elegirPlan} />
            </div>
            {!zona && <ZonaGate zonaId={zonaId} onChange={elegirZona} />}
          </div>

          {/* Con un municipio con TV elegido se muestra la barra de canales */}
          {zona?.planesTv && (
            <div className="mt-3">
              <BarraCanalesVillaMagna />
            </div>
          )}

          <div className="alert mt-3" style={{ background: 'var(--surface)' }}>
            <strong>¿Qué incluye cada paquete?</strong> Módem WiFi de alta potencia en comodato y línea telefónica fija. Prepago con recargas cada 30 días, sin plazo forzoso.
          </div>

          {/* Banner de TV: solo aplica a Villa Magna y Nopaltepec, por eso va compacto */}
          {!zona?.planesTv && (
            <div className="tv-banner mt-2" id="villa-magna">
              <span className="tv-banner-icon"><Tv size={22} aria-hidden="true" /></span>
              <p>
                <strong>¿Vives en Fracc. Villa Magna o en Nopaltepec?</strong>{' '}
                Agrega televisión a tu paquete para 1, 2 o 3 televisores.
              </p>
              <div className="tv-banner-acciones">
                {[['tizayuca-villa-magna', 'Villa Magna'], ['nopaltepec', 'Nopaltepec']].map(([id, nombre]) => (
                  <button
                    key={id} type="button" className="btn btn-accent btn-sm"
                    onClick={() => { elegirZona(id); document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    {nombre} <ArrowRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CLIENTES HOGAR: CHATBOT + COMUNICADOS Y PORTAL DE PAGOS */}
      <section className="section" id="clientes">
        <div className="container">
          <SectionHead eyebrow="Clientes Comunícalo Hogar" title="Tu servicio, a un mensaje o un clic" center>
            Atiende tus pagos, dudas y trámites cuando quieras, sin filas ni llamadas en espera.
          </SectionHead>
          <div className="cli-grid">
            <CarruselAvisos
              slides={[...COMUNICADOS, ...SLIDES_CHATBOT]}
              waNum={WHATSAPP_BOT_HOGAR}
              etiqueta="Chatbot y comunicados para clientes"
            />

            <article className="cli-portal">
              <img {...imgResp('/img/hogar/portal-pagos.webp', 'contenido')} alt="" className="cli-portal-img" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="cli-portal-body">
                <span className="cli-etiqueta"><ShieldCheck size={14} aria-hidden="true" /> Portal de pagos en línea</span>
                <h3 className="h2">Paga y administra tu cuenta</h3>
                <p>Paga con tarjeta de crédito o débito desde nuestras pasarelas seguras y lleva el control de tu servicio.</p>
                <ul className="cli-puntos">
                  {[
                    'Pago con tarjeta de crédito o débito',
                    'Consulta tu saldo e historial de pagos',
                    'Descarga tu estado de cuenta',
                    'Levanta aclaraciones',
                    'Solicita devoluciones',
                  ].map((p) => <li key={p}><CheckCircle2 size={16} aria-hidden="true" /> {p}</li>)}
                </ul>
                <Ext href={LINKS.pagos} className="btn btn-accent btn-lg"><CreditCard size={18} /> Pagar mi servicio</Ext>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: PUENTE COMERCIAL HACIA MAXVISION (OTUMBA Y AXAPUSCO) */}
      <section className="section section--alt" id="maxvision-bridge">
        <div className="container">
          <div className="cta-band band-mx band-foto" style={{ borderRadius: 16 }}>
            <img {...imgResp('/img/maxvision-familia.webp', 'contenido')} alt="" className="band-foto-img" width={1024} height={372} loading="lazy" decoding="async" />
            <div>
              <span className="mx-logo mx-logo--sm">
                <img src="/img/logo-maxvision.webp" alt="MAXVISION" width={545} height={96} loading="lazy" decoding="async" />
              </span>
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

      {/* SECCIÓN 6: INVITACIÓN A CONTRATAR (el formulario vive en /cotizar) */}
      <section className="section" id="contratar">
        <div className="container">
          <BannerCotizar
            para="hogar"
            eyebrow="Contratación rápida"
            titulo="Te confirmamos cobertura en tu domicilio"
            texto="Elige tu paquete, déjanos tu dirección y agendamos la instalación con nuestra cuadrilla."
            puntos={[
              'Requisitos: INE y comprobante de domicilio',
              'Instalación de 5 a 10 días hábiles',
              'Módem WiFi y línea telefónica incluidos',
              'Sin plazo forzoso',
            ]}
            extra={zona ? { zona: zonaId } : {}}
          />
          <p className="xs muted mt-2 text-center">
            <FileText size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Tarifas registradas ante el IFT. Consulta folios y contratos en el <Link className="link" to="/transparencia">Centro de transparencia</Link>.
          </p>
        </div>
      </section>

      {/* SECCIÓN 7: PREGUNTAS FRECUENTES */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas habituales sobre el servicio para el hogar" center />
          <Faq
            items={[
              {
                p: '¿Cuáles son las zonas con cobertura de Comunícalo Residencial?',
                r: 'Contamos con infraestructura propia en Tizayuca y Tolcayuca (Hidalgo), así como en Tecámac, Zumpango, Coacalco, Tlalnepantla y Nopaltepec (Estado de México). Si vives en Otumba o Axapusco, tu servicio opera bajo nuestra marca hermana MAXVISION.'
              },
              {
                p: '¿En qué zonas se puede contratar servicio de televisión con Comunícalo?',
                r: 'En la red de Comunícalo, la televisión se ofrece en el Fraccionamiento Villa Magna (Tizayuca, Hidalgo) y en Nopaltepec (Estado de México), con paquetes para 1, 2 o 3 televisores. En el resto de zonas ofrecemos internet de alta velocidad y telefonía fija.'
              },
              {
                p: '¿Los paquetes de Internet + Teléfono tienen plazo forzoso?',
                r: 'No. Los paquetes de Internet + Teléfono son bajo modalidad de prepago con recargas cada 30 días, lo que te da total libertad y control de tu presupuesto. El único plan con permanencia mínima de 12 meses es el Plan Inteligente ($320/mes).'
              },
              {
                p: '¿Qué incluye la línea telefónica fija?',
                r: 'Todos los paquetes incluyen línea telefónica fija. En los paquetes PAQ D y L incluye 3,000 minutos a números fijos nacionales, 3,000 minutos a celulares de México y 500 minutos a Estados Unidos y Canadá. Los minutos de cada paquete vienen en su ficha registrada ante el IFT.'
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
