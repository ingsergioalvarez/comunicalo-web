import React from 'react';
import { Phone, Mail, MapPin, Clock, CreditCard, Gauge, MessageCircle, FileText, LifeBuoy } from 'lucide-react';
import { Link, Ext } from '../router';
import { SectionHead, LeadForm } from '../components/ui';
import { doc } from '../data/documentos';
import { EMPRESA, TELEFONOS, EMAIL_VENTAS, LINKS, whatsappUrl } from '../data/site';

function Tarjeta({ icon: I, titulo, children }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 14 }}>
      <span className="icon-box"><I size={22} aria-hidden="true" /></span>
      <div className="stack-sm">
        <h3 className="h3">{titulo}</h3>
        {children}
      </div>
    </div>
  );
}

export default function Contacto() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contacto y soporte</span>
          <h1 className="h1 mt-1">Estamos para ayudarte</h1>
          <p className="lead">Ventas, soporte técnico, pagos y aclaraciones. Elige el canal que prefieras.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <Tarjeta icon={Phone} titulo="Empresas">
              <p><a className="link" href={TELEFONOS.empresas.href}>{TELEFONOS.empresas.num}</a></p>
              <p><a className="link" href={TELEFONOS.empresas2.href}>{TELEFONOS.empresas2.num}</a></p>
            </Tarjeta>
            <Tarjeta icon={Phone} titulo="Hogar">
              <p><a className="link" href={TELEFONOS.hogar.href}>{TELEFONOS.hogar.num}</a></p>
              <p className="small muted">Contrataciones y soporte residencial</p>
            </Tarjeta>
            <Tarjeta icon={MessageCircle} titulo="WhatsApp">
              <p><a className="btn btn-wa btn-sm" target="_blank" rel="noopener noreferrer" href={whatsappUrl('Hola Comunícalo, necesito ayuda.')}>Escríbenos</a></p>
            </Tarjeta>
            <Tarjeta icon={LifeBuoy} titulo="Aclaraciones, quejas y pagos">
              <p><a className="link" href={TELEFONOS.atencion.href}>{TELEFONOS.atencion.num}</a></p>
              <p className="small muted"><a className="link" href={doc('tabla-escalacion-residencial.pdf')}>Tabla de escalación</a> · <a className="link" href={doc('tabla-bonificaciones-por-falla.pdf')}>Bonificaciones por falla</a></p>
            </Tarjeta>
            <Tarjeta icon={CreditCard} titulo="Paga tu servicio de Hogar">
              <p><Ext className="btn btn-primary btn-sm" href={LINKS.pagos}>Portal de pagos</Ext></p>
              <p><Ext className="link small" href={LINKS.speedtest}><Gauge size={14} /> Prueba tu velocidad</Ext></p>
            </Tarjeta>
            <Tarjeta icon={Mail} titulo="Correo">
              <p><a className="link" href={`mailto:${EMAIL_VENTAS}`}>{EMAIL_VENTAS}</a></p>
              <p className="small muted"><Link className="link" to="/transparencia"><FileText size={14} /> Documentos IFT y PROFECO</Link></p>
            </Tarjeta>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow="Oficinas" title="Visítanos" />
            <div className="stack">
              <p style={{ display: 'flex', gap: 10 }}><MapPin size={20} className="hl" style={{ flexShrink: 0, marginTop: 3 }} /> {EMPRESA.direccion}</p>
              <p style={{ display: 'flex', gap: 10 }}><Clock size={20} className="hl" style={{ flexShrink: 0, marginTop: 3 }} /> {EMPRESA.horario}</p>
              <Ext className="btn btn-outline" href={EMPRESA.mapa}><MapPin size={16} /> Cómo llegar</Ext>
            </div>
          </div>
          <div className="card">
            <LeadForm interesInicial="internet-dedicado" titulo="Escríbenos" boton="Enviar mensaje por WhatsApp" />
          </div>
        </div>
      </section>
    </>
  );
}
