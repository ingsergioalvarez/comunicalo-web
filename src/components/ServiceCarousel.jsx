import React, { useState } from 'react';
import { ArrowRight, MessageCircle, ImageIcon } from 'lucide-react';
import { Link } from '../router';
import Icon from './Icon';
import Coverflow from './Coverflow';
import { Checklist } from './ui';
import { whatsappUrl, AREAS } from '../data/site';
import { imgResp } from '../imagenes';

// Servicios empresariales en carrusel coverflow (enlaces /empresas#<id-servicio>).

function MediaServicio({ s }) {
  const [fallo, setFallo] = useState(false);
  if (s.imagen?.src && !fallo) {
    return (
      <figure className="svc-media">
        <img {...imgResp(s.imagen.src, 'servicio')} alt={s.imagen.alt} loading="lazy" decoding="async" onError={() => setFallo(true)} />
      </figure>
    );
  }
  // Marcador de posición hasta que se defina la imagen del servicio
  return (
    <figure className="svc-media svc-media--placeholder" aria-hidden="true">
      <Icon name={s.icono} size={40} />
      <figcaption><ImageIcon size={14} /> Imagen de referencia · 1200 × 675</figcaption>
    </figure>
  );
}

export default function ServiceCarousel({ servicios, etiqueta }) {
  return (
    <Coverflow
      items={servicios}
      etiqueta={etiqueta}
      slideClassName="svc"
      renderSlide={(s, esActivo) => (
        <>
          <MediaServicio s={s} />
          <div className="svc-body">
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
              <Link to={s.id === 'internet-eventos' ? '/cotizar?para=evento' : `/cotizar?para=empresa&servicio=${s.id}`} tabIndex={esActivo ? undefined : -1} className="btn btn-primary btn-sm">Cotizar <ArrowRight size={14} /></Link>
              <a
                href={whatsappUrl(`Hola Comunícalo, quiero información de ${s.titulo} para mi empresa.`, AREAS.ventasEmpresas.wa)}
                target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm"
                tabIndex={esActivo ? undefined : -1}
              >
                <MessageCircle size={14} /> Preguntar
              </a>
            </div>
          </div>
        </>
      )}
    />
  );
}
