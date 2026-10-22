import React, { useState } from 'react';
import { FileText, Volume2, ExternalLink, MapPin } from 'lucide-react';
import { SectionHead } from '../components/ui';
import { Ext } from '../router';
import { LINKS, EMPRESA } from '../data/site';
import { GRUPOS_DOCUMENTOS } from '../data/documentos';
import {
  PLANES_MAXICOM,
  PLANES_TRIPLE_PLAY,
  PLAN_TV,
  TARIFAS_COMUNICALO_HOGAR,
  formatoPrecio
} from '../data/planes';

function Documento({ d }) {
  const [audio, setAudio] = useState(false);
  return (
    <li className="doc">
      <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: '1 1 260px' }}>
        <FileText size={18} className="hl" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden="true" /> {d.titulo}
      </span>
      <span className="doc-actions">
        <a className="btn btn-outline btn-sm" href={d.pdf} target="_blank" rel="noopener">PDF</a>
        {d.audio && (
          <button className="btn btn-outline btn-sm" onClick={() => setAudio(!audio)} aria-expanded={audio}>
            <Volume2 size={14} /> Versión audible
          </button>
        )}
      </span>
      {audio && <audio controls preload="none" src={d.audio} aria-label={`Audio: ${d.titulo}`} />}
    </li>
  );
}

export default function Transparencia() {
  const [filtro, setFiltro] = useState('todas');

  const tarifasMaxvision = [
    ...PLANES_MAXICOM.map((p) => ({ ...p, servicio: 'Internet + telefonía', marca: 'MAXVISION' })),
    ...PLANES_TRIPLE_PLAY.map((p) => ({ ...p, servicio: `Internet + telefonía + TV (${p.canales} canales)`, marca: 'MAXVISION' })),
    { ...PLAN_TV, servicio: `Televisión restringida (${PLAN_TV.canales} canales)`, marca: 'MAXVISION' },
  ];

  const tarifasComunicalo = TARIFAS_COMUNICALO_HOGAR;

  const todasLasTarifas = [
    ...tarifasMaxvision,
    ...tarifasComunicalo,
  ];

  const tarifasFiltradas = filtro === 'comunicalo'
    ? tarifasComunicalo
    : filtro === 'maxvision'
    ? tarifasMaxvision
    : todasLasTarifas;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">IFT · PROFECO</span>
          <h1 className="h1 mt-1">Centro de transparencia</h1>
          <p className="lead">
            Consulta nuestras tarifas registradas, contratos de adhesión, la Carta de derechos mínimos de los usuarios y demás
            información que {EMPRESA.nombre} pone a tu disposición conforme a la regulación vigente del Instituto Federal de Telecomunicaciones.
          </p>
        </div>
      </section>

      <section className="section" id="tarifas">
        <div className="container">
          <SectionHead eyebrow="Registro público de tarifas" title="Tarifas residenciales registradas ante el IFT">
            Todas las tarifas son prepago con vigencia de 30 días (Plan Inteligente con plazo de 12 meses). Descarga el formato oficial de información simplificada de cada una.
          </SectionHead>

          <div className="chips mb-3" role="tablist" aria-label="Filtrar por marca">
            <button
              className={`chip ${filtro === 'todas' ? 'chip-active' : ''}`}
              role="tab"
              aria-selected={filtro === 'todas'}
              onClick={() => setFiltro('todas')}
            >
              Todas las tarifas registradas ({todasLasTarifas.length})
            </button>
            <button
              className={`chip ${filtro === 'comunicalo' ? 'chip-active' : ''}`}
              role="tab"
              aria-selected={filtro === 'comunicalo'}
              onClick={() => setFiltro('comunicalo')}
            >
              Comunícalo Hogar (Tizayuca, Tolcayuca, Zumpango, Coacalco...)
            </button>
            <button
              className={`chip ${filtro === 'maxvision' ? 'chip-active' : ''}`}
              role="tab"
              aria-selected={filtro === 'maxvision'}
              onClick={() => setFiltro('maxvision')}
            >
              MAXVISION (Otumba y Axapusco)
            </button>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Tarifa</th>
                  <th>Marca / Cobertura</th>
                  <th>Servicio</th>
                  <th>Velocidad (bajada/subida)</th>
                  <th>Precio mensual</th>
                  <th>Folio IFT</th>
                  <th>Ficha oficial</th>
                </tr>
              </thead>
              <tbody>
                {tarifasFiltradas.map((t) => (
                  <tr key={t.id || t.folio || t.nombre}>
                    <td><strong>{t.nombre}</strong></td>
                    <td>
                      <span className={`badge ${t.marca === 'MAXVISION' ? '' : 'badge-accent'}`} style={t.marca === 'MAXVISION' ? { background: 'var(--mx)', color: '#fff' } : {}}>
                        {t.marca}
                      </span>
                    </td>
                    <td>{t.servicio}</td>
                    <td>{t.bajada ? (t.subida ? `${t.bajada} / ${t.subida} Mbps` : `${t.bajada} Mbps`) : 'N/A'}</td>
                    <td><strong>{formatoPrecio(t.precio)}</strong></td>
                    <td><code>{t.folio}</code></td>
                    <td>
                      {t.pdf ? (
                        <a className="link" href={t.pdf} target="_blank" rel="noopener">
                          PDF
                        </a>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small muted mt-2">
            Compara tarifas de todos los operadores en el <Ext className="link" href={LINKS.iftComparador}>Comparador oficial del IFT <ExternalLink size={13} /></Ext>.
          </p>
        </div>
      </section>

      <section className="section section--alt" id="documentos">
        <div className="container">
          <SectionHead eyebrow="Documentos" title="Contratos, derechos y políticas" />
          <div className="grid grid-2">
            {GRUPOS_DOCUMENTOS.map((g) => (
              <div key={g.grupo} className="card">
                <h3 className="h3">{g.grupo}</h3>
                <ul className="mt-1">
                  {g.documentos.map((d) => <Documento key={d.pdf} d={d} />)}
                </ul>
              </div>
            ))}
          </div>
          <div className="alert mt-3">
            <strong>Quejas y aclaraciones:</strong> comunícate al 55 5239 4748 ext. 320. También puedes acudir a la{' '}
            <Ext className="link" href={LINKS.profeco}>PROFECO</Ext>.
          </div>
        </div>
      </section>
    </>
  );
}
