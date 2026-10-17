import React, { useMemo, useState } from 'react';
import { Search, MapPin, ArrowRight, Factory, Home } from 'lucide-react';
import { SectionHead, LeadForm } from '../components/ui';
import { whatsappUrl } from '../data/site';
import { COBERTURA } from '../data/comercial';

const sinAcentos = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Cobertura() {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('todas');

  const zonas = useMemo(() => {
    const n = sinAcentos(q.trim());
    return COBERTURA.flatMap((r) => r.zonas.map((z) => ({ zona: z, region: r.region })))
      .filter((x) => (region === 'todas' || x.region === region) && (!n || sinAcentos(`${x.zona} ${x.region}`).includes(n)));
  }, [q, region]);

  const consultar = (zona) =>
    window.open(whatsappUrl(`Hola Comunícalo, quiero validar cobertura en: ${zona}. ¿Tienen servicio?`), '_blank', 'noopener');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Cobertura</span>
          <h1 className="h1 mt-1">¿Hay Comunícalo en tu zona?</h1>
          <p className="lead">Busca tu municipio o colonia. Si no aparece, escríbenos: validamos factibilidad en tu domicilio exacto y, si es necesario, hacemos una visita técnica.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card mb-3">
            <form className="form" onSubmit={(e) => { e.preventDefault(); consultar(q || 'mi domicilio'); }}>
              <div className="search">
                <Search size={18} aria-hidden="true" />
                <label htmlFor="cob-q" className="sr-only">Municipio o colonia</label>
                <input id="cob-q" className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ej. Tlalnepantla, Tizayuca, Vallejo…" />
              </div>
              <div className="chips">
                {['todas', ...COBERTURA.map((r) => r.region)].map((r) => (
                  <button type="button" key={r} className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
                    {r === 'todas' ? 'Todas' : r}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary btn-lg" type="submit">Validar mi domicilio por WhatsApp <ArrowRight size={18} /></button>
            </form>
          </div>

          <p className="small muted mb-2" aria-live="polite">
            {zonas.length ? `${zonas.length} zona(s) con presencia de red. Toca una para confirmar tu domicilio.` : 'No encontramos esa zona en la lista, pero podemos validarla: envíanos tu domicilio.'}
          </p>
          <div className="grid grid-3">
            {zonas.map((x) => (
              <button key={x.zona} className="zone" onClick={() => consultar(`${x.zona}, ${x.region}`)}>
                <span><strong>{x.zona}</strong><small>{x.region}</small></span>
                <MapPin size={18} className="hl" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow="Factibilidad" title="Cómo validamos tu cobertura" />
            <div className="grid">
              <div className="card" style={{ display: 'flex', gap: 14 }}>
                <span className="icon-box"><Home size={22} /></span>
                <div><h3 className="h3">Hogares y fraccionamientos</h3><p className="small muted mt-1">Revisamos si tu calle o privada ya está conectada a nuestra red y te damos fecha de instalación.</p></div>
              </div>
              <div className="card" style={{ display: 'flex', gap: 14 }}>
                <span className="icon-box"><Factory size={22} /></span>
                <div><h3 className="h3">Empresas y parques industriales</h3><p className="small muted mt-1">Si no hay fibra cercana, evaluamos un enlace por microondas. Hacemos visita técnica sin costo para proyectos empresariales.</p></div>
              </div>
            </div>
          </div>
          <div className="card">
            <LeadForm interesInicial="hogar" titulo="Valida tu domicilio" subtitulo="Escribe tu colonia y municipio para revisar la factibilidad." />
          </div>
        </div>
      </section>
    </>
  );
}
