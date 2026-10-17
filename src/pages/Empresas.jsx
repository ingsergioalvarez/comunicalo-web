import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Link } from '../router';
import Icon from '../components/Icon';
import { SectionHead, Checklist, CtaBand, LeadForm, Foto } from '../components/ui';
import { DIVISIONES } from '../data/servicios';
import { TELEFONOS, whatsappUrl } from '../data/site';

export default function Empresas() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Soluciones para empresas</span>
          <h1 className="h1 mt-1">Internet, TI y seguridad con un solo proveedor</h1>
          <p className="lead">
            Diseñamos, instalamos y operamos la infraestructura de telecomunicaciones de tu empresa: desde el enlace a internet
            hasta las cámaras de tu almacén. Con concesión federal y soporte los 365 días.
          </p>
          <div className="btn-row mt-3">
            <Link to="/cotizar?servicio=internet-dedicado" className="btn btn-accent btn-lg">Solicitar cotización <ArrowRight size={18} /></Link>
            <a href={TELEFONOS.empresas.href} className="btn btn-ghost-light btn-lg"><Phone size={18} /> {TELEFONOS.empresas.num}</a>
          </div>
        </div>
      </section>

      <div className="section--tight" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <nav className="division-nav" aria-label="Divisiones">
            {DIVISIONES.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="chip"><Icon name={d.icono} size={16} /> {d.nombre}</a>
            ))}
          </nav>
        </div>
      </div>

      {DIVISIONES.map((d, i) => (
        <section key={d.id} id={d.id} className={`section${i % 2 ? ' section--alt' : ''}`}>
          <div className="container">
            {d.imagen ? (
              <div className="division-head">
                <SectionHead eyebrow={d.nombre} title={d.pitch} />
                <Foto {...d.imagen} className={d.imagen.banner ? 'foto-banner' : 'foto-wide'} />
              </div>
            ) : (
              <SectionHead eyebrow={d.nombre} title={d.pitch} />
            )}
            <div className="grid grid-2">
              {d.servicios.map((s) => (
                <article key={s.id} id={s.id} className="card svc">
                  <div className="svc-head">
                    <span className="icon-box"><Icon name={s.icono} /></span>
                    <div>
                      <span className="badge">{s.badge}</span>
                      <h3 className="h3 mt-1">{s.titulo}</h3>
                    </div>
                  </div>
                  <p className="muted">{s.resumen}</p>
                  <Checklist items={s.beneficios} />
                  <div className="svc-meta">
                    <strong>Ideal para:</strong> {s.idealPara}
                  </div>
                  <div className="btn-row">
                    <Link to={`/cotizar?servicio=${s.id}`} className="btn btn-primary btn-sm">Cotizar <ArrowRight size={14} /></Link>
                    <a
                      href={whatsappUrl(`Hola Comunícalo, quiero información de ${s.titulo} para mi empresa.`)}
                      target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm"
                    >
                      <MessageCircle size={14} /> Preguntar
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Proyectos a la medida</span>
            <h2 className="h2 mt-1">¿Tienes un proyecto especial?</h2>
            <p className="lead mt-2">
              Plantas industriales, fraccionamientos, hospitales, escuelas o corporativos: hacemos una visita técnica,
              diseñamos la solución y te entregamos una propuesta integral.
            </p>
            <div className="mt-3">
              <Checklist items={['Visita técnica de factibilidad', 'Propuesta integral con un solo contrato', 'Instalación con personal propio', 'Mesa de ayuda y monitoreo continuo']} />
            </div>
          </div>
          <div className="card">
            <LeadForm interesInicial="internet-dedicado" titulo="Agenda una visita técnica" boton="Solicitar visita por WhatsApp" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <CtaBand title="Hablemos de tu conectividad" text="Un ingeniero te asesora sin costo para elegir la solución adecuada." />
        </div>
      </section>
    </>
  );
}
