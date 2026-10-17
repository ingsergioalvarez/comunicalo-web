import React, { useState } from 'react';
import { ArrowRight, Phone, MessageCircle, Mic, Video, Store, Users, Building2, Music } from 'lucide-react';
import { SectionHead, Checklist, Faq, CtaBand, Foto } from '../components/ui';
import { TELEFONOS, whatsappUrl } from '../data/site';

const TIPOS = [
  { icon: Building2, t: 'Congresos y convenciones', d: 'Registro, apps del evento y presentaciones sin interrupciones.' },
  { icon: Store, t: 'Expos y ferias comerciales', d: 'Internet por stand y terminales de cobro estables.' },
  { icon: Music, t: 'Conciertos y festivales', d: 'Producción, accesos y prensa conectados en todo momento.' },
  { icon: Video, t: 'Transmisiones en vivo', d: 'Ancho de banda dedicado para streaming en alta calidad.' },
  { icon: Mic, t: 'Foros y eventos corporativos', d: 'Videoconferencias, votaciones y WiFi para invitados.' },
  { icon: Users, t: 'Eventos sociales', d: 'Conectividad para proveedores, fotógrafos e invitados.' },
];

const FAQ_EVENTOS = [
  { p: '¿Con cuánta anticipación debo reservar?', r: 'Entre más pronto mejor: necesitamos validar la factibilidad del recinto y, en su caso, hacer una visita técnica. Para eventos grandes recomendamos al menos 2 a 3 semanas.' },
  { p: '¿Pueden conectar un recinto sin internet?', r: 'Sí. Llevamos el enlace por fibra óptica o microondas según la ubicación y montamos la red WiFi dentro del recinto.' },
  { p: '¿Hay soporte durante el evento?', r: 'Sí, nuestros ingenieros permanecen en sitio para monitorear la red y resolver cualquier incidencia al momento.' },
  { p: '¿Puedo separar la red del público de la de producción?', r: 'Sí. Creamos redes independientes para staff, prensa, cobro, transmisión y asistentes, cada una con su propio ancho de banda.' },
];

function Planeador() {
  const [dias, setDias] = useState(2);
  const [asistentes, setAsistentes] = useState(300);
  const [stream, setStream] = useState(true);
  const [fecha, setFecha] = useState('');
  const [lugar, setLugar] = useState('');

  const resumen = `Internet para evento: ${dias} día(s), ~${asistentes} asistentes conectados${stream ? ', con transmisión en vivo' : ''}${fecha ? `, fecha ${fecha}` : ''}${lugar ? `, en ${lugar}` : ''}.`;

  return (
    <div className="card">
      <h2 className="h3">Planea tu evento</h2>
      <p className="small muted mt-1">Ajusta los datos y envíanos tu solicitud. Te respondemos con propuesta y disponibilidad.</p>
      <div className="form mt-3">
        <div className="field">
          <label htmlFor="ev-dias">Duración: <strong className="hl">{dias} día{dias > 1 ? 's' : ''}</strong></label>
          <input id="ev-dias" className="range" type="range" min="1" max="15" value={dias} onChange={(e) => setDias(+e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ev-asis">Asistentes conectados: <strong className="hl">{asistentes.toLocaleString('es-MX')}</strong></label>
          <input id="ev-asis" className="range" type="range" min="50" max="5000" step="50" value={asistentes} onChange={(e) => setAsistentes(+e.target.value)} />
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="ev-fecha">Fecha</label>
            <input id="ev-fecha" className="input" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="ev-lugar">Recinto o ciudad</label>
            <input id="ev-lugar" className="input" value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder="Ej. centro de convenciones, ciudad" />
          </div>
        </div>
        <label className="small" style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700 }}>
          <input type="checkbox" checked={stream} onChange={(e) => setStream(e.target.checked)} style={{ width: 20, height: 20, accentColor: 'var(--brand)' }} />
          Habrá transmisión en vivo
        </label>
        <div className="alert"><strong>Resumen:</strong> {resumen}</div>
        <a className="btn btn-wa btn-lg btn-block" target="_blank" rel="noopener noreferrer" href={whatsappUrl(`Hola Comunícalo, quiero cotizar ${resumen}`)}>
          <MessageCircle size={18} /> Solicitar propuesta
        </a>
      </div>
    </div>
  );
}

export default function Eventos() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Internet para eventos</span>
          <h1 className="h1 mt-1">Que tu evento no dependa del WiFi del recinto</h1>
          <p className="lead">
            Llevamos internet dedicado de alta capacidad a congresos, expos, conciertos y transmisiones, con WiFi de alta
            densidad e ingenieros en sitio. Más de 5 años en eventos empresariales, sociales y masivos.
          </p>
          <div className="btn-row mt-3">
            <a href="#planear" className="btn btn-accent btn-lg">Cotizar mi evento <ArrowRight size={18} /></a>
            <a href={TELEFONOS.empresas.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {TELEFONOS.empresas.num}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="division-head">
            <SectionHead eyebrow="Para cualquier formato" title="Conectamos todo tipo de eventos">
              Desde una junta de consejo hasta una expo con miles de asistentes: dimensionamos la red para tu público.
            </SectionHead>
            <Foto src="/img/eventos.webp" alt="Auditorio de congreso con escenario y pantallas" width={250} height={300} className="foto-retrato" />
          </div>
          <div className="grid grid-3">
            {TIPOS.map((x) => (
              <div key={x.t} className="card">
                <span className="icon-box"><x.icon size={22} aria-hidden="true" /></span>
                <h3 className="h3 mt-2">{x.t}</h3>
                <p className="small muted mt-1">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="planear">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow="Qué incluye" title="Llave en mano, de la visita técnica al desmontaje" />
            <Checklist items={[
              'Visita técnica al recinto y diseño de la red',
              'Enlace dedicado por fibra óptica o microondas',
              'WiFi de alta densidad para miles de dispositivos',
              'Redes separadas para staff, prensa, cobro y público',
              'Ancho de banda reservado para transmisiones',
              'Ingenieros en sitio durante todo el evento',
              'Montaje y desmontaje sin complicaciones',
            ]} />
          </div>
          <Planeador />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Preguntas frecuentes" title="Sobre internet para eventos" center />
          <Faq items={FAQ_EVENTOS} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <CtaBand title="Aparta tu fecha" text="Entre más pronto nos contactes, más fácil es asegurar equipo e ingenieros para tu fecha." />
        </div>
      </section>
    </>
  );
}
