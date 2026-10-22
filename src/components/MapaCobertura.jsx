import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Satellite, Layers, Search, ArrowRight, Pause, Play } from 'lucide-react';
import { NIVELES, CAPA_LTE, MAPA_BASE, ESTADOS } from '../data/cobertura';
import { Link } from '../router';

// Vistas del mapa: "todas" apila las tres capas de estado (mix-blend: lighten)
const VISTAS = [
  { id: 'todas', label: 'Todo el país' },
  ...Object.entries(NIVELES).map(([id, n]) => ({ id, label: n.nombre, color: n.color })),
  { id: 'lte', label: CAPA_LTE.nombre, color: CAPA_LTE.color },
];
const RECORRIDO = ['propia', 'extendida', 'interconexion', 'lte', 'todas'];

function contar(id) {
  if (id === 'todas' || id === 'lte') return ESTADOS.length;
  return ESTADOS.filter((e) => e.nivel === id).length;
}

export default function MapaCobertura() {
  const [vista, setVista] = useState('todas');
  const [auto, setAuto] = useState(true);
  const [estado, setEstado] = useState(null);

  // Recorrido automático por las capas hasta que el visitante interactúa
  useEffect(() => {
    if (!auto) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setAuto(false); return undefined; }
    const t = setInterval(() => {
      setVista((v) => RECORRIDO[(RECORRIDO.indexOf(v) + 1) % RECORRIDO.length]);
    }, 3200);
    return () => clearInterval(t);
  }, [auto]);

  const elegirVista = (id) => { setAuto(false); setVista(id); setEstado(null); };
  const elegirEstado = (nombre) => {
    const e = ESTADOS.find((x) => x.nombre === nombre);
    if (!e) return;
    setAuto(false);
    setEstado(e);
    setVista(e.nivel);
  };

  const visibles = (id) => (vista === 'todas' ? id !== 'lte' : vista === id);
  const info = estado ? NIVELES[estado.nivel] : (vista === 'lte' ? CAPA_LTE : NIVELES[vista]);
  const lista = useMemo(
    () => (vista === 'todas' || vista === 'lte' ? [] : ESTADOS.filter((e) => e.nivel === vista)),
    [vista],
  );

  return (
    <div className="cobmap">
      <div className="cobmap-chips" role="tablist" aria-label="Tipo de cobertura">
        {VISTAS.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={vista === v.id}
            className={`cobmap-chip${vista === v.id ? ' is-on' : ''}`}
            style={v.color ? { '--chip': v.color } : undefined}
            onClick={() => elegirVista(v.id)}
          >
            {v.id === 'lte' ? <Satellite size={15} aria-hidden="true" /> : v.color ? <span className="cobmap-dot" aria-hidden="true" /> : <Layers size={15} aria-hidden="true" />}
            {v.label} <span className="cobmap-count">{contar(v.id)}</span>
          </button>
        ))}
        <button className="cobmap-chip cobmap-auto" onClick={() => setAuto((a) => !a)} aria-label={auto ? 'Pausar recorrido' : 'Reproducir recorrido'}>
          {auto ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      <div className="cobmap-grid">
        <div className="cobmap-stage">
          <img src={MAPA_BASE} alt="" className="cobmap-img" width={1600} height={1195} />
          {Object.entries(NIVELES).map(([id, n]) => (
            <img key={id} src={n.img} alt="" className={`cobmap-img cobmap-capa${visibles(id) ? ' is-on' : ''}`} width={1600} height={1195} loading="lazy" />
          ))}
          <img src={CAPA_LTE.img} alt="" className={`cobmap-img cobmap-capa cobmap-capa--lte${visibles('lte') ? ' is-on' : ''}`} width={1600} height={1195} loading="lazy" />
          <ul className="cobmap-leyenda" aria-hidden="true">
            {Object.values(NIVELES).map((n) => (
              <li key={n.nombre}><span style={{ background: n.color }} /> {n.nombre}</li>
            ))}
            <li><span style={{ background: CAPA_LTE.color }} /> {CAPA_LTE.nombre}</li>
          </ul>
        </div>

        <aside className="cobmap-panel" aria-live="polite">
          <label className="cobmap-buscar">
            <Search size={18} aria-hidden="true" />
            <select value={estado?.nombre || ''} onChange={(e) => elegirEstado(e.target.value)} aria-label="Busca tu estado">
              <option value="" disabled>Busca tu estado…</option>
              {ESTADOS.map((e) => <option key={e.nombre} value={e.nombre}>{e.nombre}</option>)}
            </select>
          </label>

          {estado ? (
            <div className="cobmap-info">
              <span className="cobmap-badge" style={{ '--chip': info.color }}>{info.nombre}</span>
              <h3 className="cobmap-titulo"><MapPin size={22} aria-hidden="true" /> {estado.nombre}</h3>
              <dl className="cobmap-datos">
                <div><dt>Tecnología</dt><dd>{info.tecnologia}</dd></div>
                {estado.ciudades && (
                  <div><dt>Cobertura en</dt><dd>{estado.ciudades.join(', ')}. Otras zonas del estado, por factibilidad.</dd></div>
                )}
                <div><dt>También disponible</dt><dd>LTE y satelital</dd></div>
              </dl>
              <p className="cobmap-texto">{info.texto}</p>
            </div>
          ) : vista === 'todas' ? (
            <div className="cobmap-info">
              <span className="cobmap-badge" style={{ '--chip': CAPA_LTE.color }}>32 / 32 estados</span>
              <h3 className="cobmap-titulo">Cobertura en todo México</h3>
              <ul className="cobmap-resumen">
                {Object.entries(NIVELES).map(([id, n]) => (
                  <li key={id}><button type="button" onClick={() => elegirVista(id)}><span style={{ background: n.color }} /> <b>{contar(id)}</b> {n.nombre}</button></li>
                ))}
                <li><button type="button" onClick={() => elegirVista('lte')}><span style={{ background: CAPA_LTE.color }} /> <b>32</b> {CAPA_LTE.nombre}</button></li>
              </ul>
              <p className="cobmap-texto">Elige tu estado para ver con qué tecnología te conectamos.</p>
            </div>
          ) : (
            <div className="cobmap-info">
              <span className="cobmap-badge" style={{ '--chip': info.color }}>{contar(vista)} estados</span>
              <h3 className="cobmap-titulo">{info.nombre}</h3>
              <p className="cobmap-texto">{info.texto}</p>
              {lista.length > 0 && (
                <ul className="cobmap-estados">
                  {lista.map((e) => (
                    <li key={e.nombre}><button type="button" onClick={() => elegirEstado(e.nombre)}>{e.nombre}</button></li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Link to="/cotizar" className="btn btn-accent btn-lg cobmap-cta">
            Validar cobertura <ArrowRight size={18} />
          </Link>
          <p className="cobmap-aviso">*Todos nuestros servicios están sujetos a factibilidad técnica.</p>
        </aside>
      </div>

      {/* Lista accesible y para buscadores */}
      <details className="cobmap-detalle">
        <summary>Ver la lista completa de estados por tipo de cobertura</summary>
        {Object.entries(NIVELES).map(([id, n]) => (
          <p key={id}><strong>{n.nombre}:</strong> {ESTADOS.filter((e) => e.nivel === id).map((e) => e.nombre).join(', ')}.</p>
        ))}
        <p><strong>{CAPA_LTE.nombre}:</strong> los 32 estados.</p>
      </details>
    </div>
  );
}
