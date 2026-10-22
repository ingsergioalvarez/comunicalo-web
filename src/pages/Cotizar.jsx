import React, { useState } from 'react';
import { Phone, MapPin, CreditCard } from 'lucide-react';
import { Link, Ext, useRouter } from '../router';
import { Checklist } from '../components/ui';
import { SelectorTipo, TIPOS_COTIZACION } from '../components/Cotiza';
import FormEmpresa from '../components/FormEmpresa';
import FormHogar from '../components/FormHogar';
import PlaneadorEvento from '../components/PlaneadorEvento';
import { TELEFONOS, LINKS } from '../data/site';
import { TODOS_LOS_SERVICIOS } from '../data/servicios';
import { TIPOS_EVENTO } from '../data/eventos';

// Cotizador único: aquí viven los formularios de Empresas, Hogar y Eventos.
// Parámetros: ?para=empresa|hogar|evento, y según el caso ?servicio=, ?zona=&plan=, ?evento=&usuarios=

// Mapea los ids de servicio del catálogo (?servicio=...) a las opciones del formulario empresarial
const A_SERVICIO = {
  'internet-dedicado': 'internet-dedicado', microondas: 'internet-dedicado',
  'lan-to-lan': 'lan-to-lan', vpn: 'vpn', 'telefonia-ip': 'telefonia-ip', 'redes-wifi': 'redes-wifi', cableado: 'redes-wifi',
  ciberseguridad: 'ciberseguridad', 'data-center': 'data-center',
  cctv: 'cctv', 'monitoreo-c2': 'cctv', 'analitica-lpr': 'cctv', 'mantenimiento-cctv': 'cctv',
};

function paraInicial(q) {
  const para = q.get('para');
  if (TIPOS_COTIZACION.some((t) => t.id === para)) return para;
  const servicio = q.get('servicio');
  if (servicio === 'hogar') return 'hogar';
  if (servicio === 'internet-eventos') return 'evento';
  return 'empresa';
}

function Empresa({ q }) {
  const servicio = q.get('servicio');
  const detalle = A_SERVICIO[servicio] ? TODOS_LOS_SERVICIOS.find((s) => s.id === servicio)?.titulo || '' : '';
  return (
    <div className="split" style={{ alignItems: 'start' }}>
      <div className="stack">
        <div className="card">
          <h2 className="h3 mb-2">Tu cotización incluye</h2>
          <Checklist items={['Asesoría técnica sin costo', 'Validación de factibilidad en tu ubicación', 'Propuesta formal por escrito a tu correo', 'Visita técnica para proyectos especiales', 'Sin compromiso de contratación']} />
          <p className="small muted mt-2">¿Prefieres hablar? <a className="link" href={TELEFONOS.empresas.href}><Phone size={14} /> {TELEFONOS.empresas.num}</a></p>
        </div>
      </div>
      <div className="card">
        <FormEmpresa servicioInicial={A_SERVICIO[servicio] || 'internet-dedicado'} detalle={detalle} titulo="Datos de tu cotización" />
      </div>
    </div>
  );
}

function Hogar({ q }) {
  return (
    <div className="split" style={{ alignItems: 'start' }}>
      <div className="stack">
        <div className="card">
          <h2 className="h3 mb-2">Así de fácil</h2>
          <Checklist items={[
            'Requisitos: INE y comprobante de domicilio',
            'Instalación de 5 a 10 días hábiles con cuadrilla propia',
            'Módem WiFi en comodato y línea telefónica incluidos',
            'Prepago cada 30 días, sin plazo forzoso',
          ]} />
          <p className="small muted mt-2">¿Prefieres hablar? <a className="link" href={TELEFONOS.hogar.href}><Phone size={14} /> {TELEFONOS.hogar.num}</a></p>
        </div>
        <div className="card">
          <h3 className="h4" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={18} className="hl" /> Cobertura Comunícalo Hogar</h3>
          <p className="small muted mt-1">
            <strong>Hidalgo:</strong> Tizayuca (incluido Fracc. Villa Magna) y Tolcayuca.<br />
            <strong>Estado de México:</strong> Tecámac, Zumpango, Coacalco, Tlalnepantla y Nopaltepec.
          </p>
          <p className="xs muted mt-2">¿Vives en Otumba o Axapusco? Tu servicio es con <Link className="link" to="/maxvision">MAXVISION</Link>.</p>
        </div>
        <Ext href={LINKS.pagos} className="cot-otro">
          <span className="cot-otro-icon"><CreditCard size={22} aria-hidden="true" /></span>
          <span className="cot-otro-body"><strong>¿Ya eres cliente?</strong><span>Paga tu servicio en el portal de pagos.</span></span>
        </Ext>
      </div>
      <div className="card">
        <FormHogar zonaInicial={q.get('zona') || ''} planInicial={q.get('plan') || ''} titulo="Datos de tu contratación" />
      </div>
    </div>
  );
}

const FORMULARIOS = {
  empresa: Empresa,
  hogar: Hogar,
  evento: () => <PlaneadorEvento tipos={TIPOS_EVENTO} />,
};

export default function Cotizar() {
  const { search } = useRouter();
  const q = new URLSearchParams(search);
  const [para, setPara] = useState(() => paraInicial(q));

  // Cambiar de pestaña actualiza la URL sin recargar ni mover el scroll
  const elegir = (id) => {
    setPara(id);
    history.replaceState(history.state, '', `/cotizar?para=${id}`);
  };
  const Formulario = FORMULARIOS[para];

  return (
    <>
      <section className="page-hero cz-hero">
        <div className="container">
          <span className="eyebrow">Cotizador</span>
          <h1 className="h1 mt-1">Cotiza en minutos, sin compromiso</h1>
          <p className="lead">Elige qué quieres conectar, llena los datos y un asesor te responde por WhatsApp con tu propuesta.</p>
          <div className="mt-3">
            <SelectorTipo activo={para} onElegir={elegir} compacto />
          </div>
        </div>
      </section>

      <section className="section" role="tabpanel" aria-label={TIPOS_COTIZACION.find((t) => t.id === para).titulo}>
        <div className="container">
          {/* Con la query de origen solo en la primera pestaña: al cambiar se parte de cero */}
          <Formulario q={para === paraInicial(q) ? q : new URLSearchParams()} />
        </div>
      </section>
    </>
  );
}
