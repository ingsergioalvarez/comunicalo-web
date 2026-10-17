import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { useRouter } from '../router';
import { LeadForm, OPCIONES_INTERES, Checklist } from '../components/ui';
import { TELEFONOS } from '../data/site';
import { TODOS_LOS_SERVICIOS } from '../data/servicios';

// Mapea los ids de servicio del catálogo a las opciones del formulario
const A_INTERES = {
  'internet-dedicado': 'internet-dedicado', microondas: 'internet-dedicado', 'internet-eventos': 'internet-eventos',
  'lan-to-lan': 'lan-to-lan', vpn: 'lan-to-lan', 'telefonia-ip': 'telefonia-ip', 'redes-wifi': 'redes-wifi',
  cableado: 'redes-wifi', ciberseguridad: 'ciberseguridad', 'data-center': 'ciberseguridad', cctv: 'cctv',
  'monitoreo-c2': 'cctv', 'analitica-lpr': 'cctv', 'mantenimiento-cctv': 'cctv', hogar: 'hogar', maxvision: 'maxvision',
};

// Parámetro principal a configurar por tipo de interés
const PARAMS = {
  'internet-dedicado': { label: 'Velocidad simétrica', min: 20, max: 1000, step: 20, def: 100, fmt: (v) => `${v} Mbps` },
  'lan-to-lan': { label: 'Sedes a conectar', min: 2, max: 20, step: 1, def: 2, fmt: (v) => `${v} sedes` },
  'telefonia-ip': { label: 'Extensiones', min: 2, max: 200, step: 1, def: 10, fmt: (v) => `${v} extensiones` },
  'redes-wifi': { label: 'Superficie aproximada', min: 100, max: 20000, step: 100, def: 500, fmt: (v) => `${v.toLocaleString('es-MX')} m²` },
  cctv: { label: 'Cámaras', min: 2, max: 200, step: 1, def: 8, fmt: (v) => `${v} cámaras` },
  'internet-eventos': { label: 'Asistentes conectados', min: 50, max: 5000, step: 50, def: 300, fmt: (v) => `${v.toLocaleString('es-MX')} asistentes` },
};

export default function Cotizar() {
  const { search } = useRouter();
  const servicio = new URLSearchParams(search).get('servicio');
  const inicial = A_INTERES[servicio] || 'internet-dedicado';
  const [interes, setInteres] = useState(inicial);
  const [valores, setValores] = useState({});

  const param = PARAMS[interes];
  const valor = param ? valores[interes] ?? param.def : null;
  const nombreServicio = TODOS_LOS_SERVICIOS.find((s) => s.id === servicio)?.titulo;
  const extra = [nombreServicio && A_INTERES[servicio] === interes ? nombreServicio : null, param ? `${param.label}: ${param.fmt(valor)}` : null].filter(Boolean).join(', ');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Cotizador</span>
          <h1 className="h1 mt-1">Arma tu cotización en minutos</h1>
          <p className="lead">Elige el servicio, ajusta lo que necesitas y envíanos tu solicitud. Un asesor te responde con propuesta y disponibilidad.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="stack">
            <div>
              <h2 className="h3 mb-2">1. ¿Qué servicio te interesa?</h2>
              <div className="chips">
                {OPCIONES_INTERES.filter((o) => o.id !== 'otro').map((o) => (
                  <button key={o.id} type="button" className="chip" aria-pressed={interes === o.id} onClick={() => setInteres(o.id)}>{o.label}</button>
                ))}
              </div>
            </div>

            {param && (
              <div className="card">
                <h2 className="h3">2. {param.label}: <span className="hl">{param.fmt(valor)}</span></h2>
                <input
                  className="range mt-2" type="range" aria-label={param.label}
                  min={param.min} max={param.max} step={param.step} value={valor}
                  onChange={(e) => setValores({ ...valores, [interes]: +e.target.value })}
                />
                <div className="xs muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{param.fmt(param.min)}</span><span>{param.fmt(param.max)}+</span>
                </div>
              </div>
            )}

            <div className="card">
              <h2 className="h3 mb-2">Tu cotización incluye</h2>
              <Checklist items={['Asesoría técnica sin costo', 'Validación de factibilidad', 'Propuesta formal por escrito', 'Sin compromiso de contratación']} />
              <p className="small muted mt-2">¿Prefieres hablar? <a className="link" href={TELEFONOS.empresas.href}><Phone size={14} /> {TELEFONOS.empresas.num}</a></p>
            </div>
          </div>

          <div className="card">
            <LeadForm key={interes} interesInicial={interes} extra={extra} titulo="3. Tus datos" boton="Enviar cotización por WhatsApp" />
          </div>
        </div>
      </section>
    </>
  );
}
