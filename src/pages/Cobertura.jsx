import React from 'react';
import { Activity, Globe } from 'lucide-react';
import { SectionHead, CtaBand } from '../components/ui';
import MapaCobertura from '../components/MapaCobertura';
import { imgResp } from '../imagenes';

const PASOS_FACTIBILIDAD = [
  { titulo: 'Nos compartes tu ubicación', texto: 'Envíanos las coordenadas, el enlace de Google Maps o la dirección del sitio que quieres conectar.' },
  { titulo: 'Validamos la solución idónea', texto: 'Revisamos qué llega a ese punto: red propia, cobertura extendida, alianzas de conectividad, LTE o satelital.' },
  { titulo: 'Trabajo consultivo', texto: 'Un ingeniero entiende tu operación (usuarios, aplicaciones, respaldo) para dimensionar el servicio correcto.' },
  { titulo: 'Propuesta a tu medida', texto: 'Recibes una propuesta formal por escrito y, en proyectos especiales, agendamos visita técnica.' },
];

export default function Cobertura() {
  return (
    <>
      {/* HERO DE COBERTURA NACIONAL */}
      <section className="page-hero page-hero--foto page-hero--alto hero-cobertura">
        <img
          {...imgResp('/img/hero-cobertura.webp', 'portada')}
          alt="Infraestructura de telecomunicaciones en México: racks de fibra óptica, NOC y torres de microondas"
          className="page-hero-foto"
          width={1600}
          height={900}
          fetchpriority="high"
          decoding="async"
        />
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 999, marginBottom: 12 }}>
            <Globe size={16} className="hl" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Red Carrier Nacional · Concesión Federal Única · 32 Estados
            </span>
          </div>
          <h1 className="h1 mt-1">Cobertura Nacional 100%: Fibra Óptica, Microondas, Satelital y LTE</h1>
          <p className="lead">
            Operamos <strong>red propia de alta capacidad</strong> en la Zona Centro (Morelos, Estado de México, Ciudad de México, Puebla, Hidalgo y Tlaxcala) con fibra directa y microondas. Y llegamos a <strong>cada rincón de los 32 estados de la República Mexicana</strong> mediante nuestra <strong>cobertura extendida</strong>, alianzas de conectividad, conectividad LTE y enlaces satelitales.
          </p>
        </div>
      </section>

      {/* SECCIÓN DEL MAPA DE COBERTURA 3D ESTILO NEÓN */}
      <section className="section" id="mapa-red">
        <div className="container">
          <div className="mapa-cyber-section">
            <div className="mapa-cyber-header">
              <span className="mapa-cyber-badge">
                <Activity size={15} /> Topología Nacional Multi-Tecnología · 32 Estados Conectados
              </span>
              <h2 className="h2" style={{ color: '#fff', textShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                Red propia, cobertura extendida y cobertura nacional
              </h2>
              <p className="lead" style={{ color: '#C9D8EA' }}>
                Mapa de infraestructura en los 32 estados de México: 6 estados centrales con <strong>Red Propia</strong> directa de fibra y microondas, <strong>cobertura extendida</strong> de fibra y microondas en 19 estados, alianzas de conectividad donde no llegamos directo, y LTE y satelital en todo el país.
              </p>
            </div>

            {/* MÉTRICAS DE LA RED */}
            <div className="mapa-metrics-grid">
              <div className="mapa-metric-card">
                <div className="mapa-metric-val">32 / 32</div>
                <div className="mapa-metric-lbl">Estados con cobertura nacional activa</div>
              </div>
              <div className="mapa-metric-card">
                <div className="mapa-metric-val">4 Tecnologías</div>
                <div className="mapa-metric-lbl">Fibra Óptica · Microondas · Satelital · LTE</div>
              </div>
              <div className="mapa-metric-card">
                <div className="mapa-metric-val">6 Estados</div>
                <div className="mapa-metric-lbl">Red Propia directa (CDMX, Edomex, Hgo, Pue, Mor, Tlax)</div>
              </div>
              <div className="mapa-metric-card">
                <div className="mapa-metric-val">99.95%</div>
                <div className="mapa-metric-lbl">SLA de disponibilidad garantizado NOC 24/7</div>
              </div>
            </div>

            <MapaCobertura />

          </div>
        </div>
      </section>


      {/* CÓMO VALIDAMOS TU FACTIBILIDAD (el formulario vive en /cotizar) */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Proceso de factibilidad" title="¿Cómo validamos tu factibilidad técnica?" center>
            No te vendemos un paquete genérico: hacemos un trabajo consultivo para ofrecerte la mejor solución posible en tu ubicación.
          </SectionHead>
          <ol className="steps">
            {PASOS_FACTIBILIDAD.map((p) => (
              <li key={p.titulo} className="step">
                <h3 className="h3">{p.titulo}</h3>
                <p className="small muted mt-1">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <CtaBand title="Valida la factibilidad en tu ubicación" text="Compártenos tu dirección o coordenadas y un ingeniero te propone la solución idónea, sin costo." />
        </div>
      </section>
    </>
  );
}
