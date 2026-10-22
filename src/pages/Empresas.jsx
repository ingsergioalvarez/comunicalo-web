import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from '../router';
import Icon from '../components/Icon';
import ServiceCarousel from '../components/ServiceCarousel';
import { SectionHead, Checklist, Foto } from '../components/ui';
import { BannerCotizar } from '../components/Cotiza';
import { DIVISIONES } from '../data/servicios';
import { TELEFONOS } from '../data/site';

export default function Empresas() {
  return (
    <>
      <section className="page-hero page-hero--foto page-hero--alto page-hero--entera">
        <img src="/img/empresas-hero.webp" alt="" className="page-hero-foto" width={1600} height={893} fetchpriority="high" decoding="async" />
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
            <ServiceCarousel servicios={d.servicios} etiqueta={`Servicios de ${d.nombre}`} />
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <BannerCotizar
            para="empresa"
            id="cotizar"
            eyebrow="Proyectos a la medida"
            titulo="¿Tienes un proyecto especial?"
            texto="Plantas industriales, fraccionamientos, hospitales, escuelas o corporativos: hacemos una visita técnica, diseñamos la solución y te entregamos una propuesta integral."
            puntos={['Visita técnica de factibilidad', 'Propuesta integral con un solo contrato', 'Instalación con personal propio', 'Mesa de ayuda y monitoreo continuo']}
          />
        </div>
      </section>
    </>
  );
}
