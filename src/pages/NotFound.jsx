import React from 'react';
import { Link } from '../router';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center" style={{ maxWidth: 640 }}>
        <span className="eyebrow">Error 404</span>
        <h1 className="h1 mt-1">Esta página no existe</h1>
        <p className="lead mt-2">Es posible que el enlace haya cambiado con nuestro nuevo sitio.</p>
        <div className="btn-row mt-3" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">Ir al inicio</Link>
          <Link to="/contacto" className="btn btn-outline btn-lg">Contacto</Link>
        </div>
      </div>
    </section>
  );
}
