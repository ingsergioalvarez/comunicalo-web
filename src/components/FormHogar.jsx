import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { whatsappUrl, mailtoUrl, AREAS } from '../data/site';
import { ZONAS_HOGAR, PLAN_SOLO_INTERNET, formatoPrecio } from '../data/planes';
import {
  Campo, ariaError, SelectEstado, CampoCoordenadas, errorCoordenadas, textoCoordenadas, errorCorreo, telefonoValido,
} from './campos';
import { useAsistente, BarraPasos, AvisoContacto, ErroresPaso, NavPasos } from './asistente';

// Contratación Hogar: municipio del tarifario, paquete con precio y descripción,
// domicilio con coordenadas y contacto. Si el municipio no está en la lista se pide
// estado y municipio a mano para validar cobertura.
// Va por pasos: primero contacto y municipio (se guarda de inmediato) y luego paquete y
// domicilio, que se van guardando como atributos del prospecto aunque no termine.

const PASOS = [
  { titulo: 'Tus datos', campos: ['zona', 'estadoOtro', 'municipioOtro', 'nombre', 'telefono', 'correo'] },
  { titulo: 'Tu paquete', campos: [] },
  { titulo: 'Domicilio', campos: ['colonia', 'cp', 'calle', 'ubicacion'] },
];

const SIN_PAQUETE = 'asesoria';

// Paquetes disponibles en una zona: Plan Inteligente (aplica en todas), internet y, si hay, TV
export function paquetesZona(zona) {
  if (!zona) return [];
  return [PLAN_SOLO_INTERNET, ...zona.planes, ...(zona.planesTv || [])];
}

const descripcion = (p) => [
  `${p.bajada} Megas`,
  p.tvs ? `TV para ${p.tvs} ${p.tvs === 1 ? 'televisor' : 'televisores'}${p.canales ? ` (${p.canales} canales)` : ''}` : null,
  'Internet + telefonía fija',
].filter(Boolean).join(' · ');

const inicial = (zonaId, planId) => ({
  zona: zonaId, paquete: planId || '', estadoOtro: '', municipioOtro: '',
  colonia: '', calle: '', cp: '', ubicacion: '',
  nombre: '', telefono: '', correo: '', comentarios: '', sitio_web: '',
});

function validar(f) {
  const e = {};
  if (!f.zona) e.zona = 'Elige tu municipio.';
  if (f.zona === 'otra') {
    if (!f.estadoOtro) e.estadoOtro = 'Elige el estado.';
    if (f.municipioOtro.trim().length < 3) e.municipioOtro = 'Escribe tu municipio.';
  }
  if (f.colonia.trim().length < 3) e.colonia = 'Escribe tu colonia o fraccionamiento.';
  if (f.calle.trim().length < 3) e.calle = 'Escribe calle y número.';
  if (f.cp && !/^\d{5}$/.test(f.cp)) e.cp = 'El código postal tiene 5 dígitos.';
  const eUbic = errorCoordenadas(f.ubicacion);
  if (eUbic) e.ubicacion = eUbic;
  if (f.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre.';
  if (!telefonoValido(f.telefono)) e.telefono = 'Escribe un teléfono de 10 dígitos.';
  const eCorreo = errorCorreo(f.correo, false);
  if (eCorreo) e.correo = eCorreo;
  return e;
}

export default function FormHogar({ zonaInicial = '', planInicial = '', titulo = 'Quiero internet Comunícalo en mi casa', subtitulo }) {
  const [f, setF] = useState(() => inicial(zonaInicial, planInicial));

  // La página de Hogar comparte el municipio y el paquete elegidos arriba; se respetan los demás datos ya escritos
  useEffect(() => {
    if (!zonaInicial) return;
    const z = ZONAS_HOGAR.find((x) => x.id === zonaInicial);
    setF((p) => {
      const valido = (id) => paquetesZona(z).some((x) => x.id === id);
      return { ...p, zona: zonaInicial, paquete: valido(planInicial) ? planInicial : (valido(p.paquete) ? p.paquete : '') };
    });
  }, [zonaInicial, planInicial]);

  const zona = ZONAS_HOGAR.find((z) => z.id === f.zona);
  const paquetes = paquetesZona(zona);
  const paquete = paquetes.find((p) => p.id === f.paquete);
  const estados = [...new Set(ZONAS_HOGAR.map((z) => z.estado))];

  // Filtro de la lista: 0 = internet + teléfono; 1, 2 o 3 = con TV para ese número de televisores.
  // Sigue al paquete elegido (p. ej. cuando llega preseleccionado desde las tarjetas de la página).
  const [filtroTv, setFiltroTv] = useState(0);
  useEffect(() => {
    if (paquete) setFiltroTv(paquete.tvs || 0);
  }, [paquete?.id]);
  const visibles = zona?.planesTv ? paquetes.filter((p) => (p.tvs || 0) === filtroTv) : paquetes;

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const errores = validar(f);

  // Al cambiar de municipio se conserva el paquete solo si existe en la nueva zona
  const elegirZona = (e) => {
    const id = e.target.value;
    const nueva = ZONAS_HOGAR.find((z) => z.id === id);
    setF((p) => ({ ...p, zona: id, paquete: paquetesZona(nueva).some((x) => x.id === p.paquete) ? p.paquete : '' }));
  };

  const municipio = zona ? zona.nombre : f.municipioOtro.trim();
  const estado = zona ? zona.estado : f.estadoOtro;
  const domicilio = [f.calle.trim(), f.colonia.trim(), municipio, estado, f.cp && `C.P. ${f.cp}`].filter(Boolean).join(', ');
  const coord = textoCoordenadas(f.ubicacion);
  const paqueteTexto = paquete
    ? `${paquete.nombre} — ${descripcion(paquete)} — ${formatoPrecio(paquete.precio)}/mes`
    : (zona ? 'Aún no lo decido, quiero asesoría' : 'Quiero conocer cobertura y precios');
  const opcional = (dato, texto) => (dato ? [texto] : []);
  const mensaje = [
    'Hola Comunícalo, quiero contratar internet para mi casa.',
    '',
    `• Paquete: ${paqueteTexto}`,
    `• Domicilio: ${domicilio}`,
    ...opcional(coord, `• Coordenadas: ${coord}`),
    ...opcional(f.comentarios.trim(), `• Comentarios: ${f.comentarios.trim()}`),
    '',
    `Contacto: ${f.nombre.trim()} · ${f.telefono.trim()}${f.correo.trim() ? ` · ${f.correo.trim()}` : ''}`,
  ].join('\n');

  const asis = useAsistente({
    pasos: PASOS, errores, prefijo: 'ho',
    datosLead: () => ({
      origen: 'hogar', area: 'ventasHogar', interes: paquete ? `Hogar: ${paquete.nombre}` : 'Hogar', nombre: f.nombre, telefono: f.telefono,
      correo: f.correo, zona: domicilio, mensaje, sitio_web: f.sitio_web,
      atributos: {
        Paquete: f.paquete ? paqueteTexto : '',
        Estado: estado,
        Municipio: municipio,
        Colonia: f.colonia.trim(),
        Calle: f.calle.trim(),
        'Código postal': f.cp,
        Coordenadas: coord,
        Comentarios: f.comentarios.trim(),
      },
    }),
  });
  const { err, paso, enviado } = asis;
  const aria = (k) => ariaError(`ho-${k}`, err(k));

  const enviar = () => {
    window.open(whatsappUrl(mensaje, AREAS.ventasHogar.wa), '_blank', 'noopener');
    asis.completar();
  };

  return (
    <form ref={asis.formRef} className="form form-cot" onSubmit={asis.alEnviar(enviar)} noValidate aria-label={titulo}>
      <div>
        <h2 className="h3">{titulo}</h2>
        {subtitulo && <p className="small muted mt-1">{subtitulo}</p>}
      </div>
      <BarraPasos pasos={PASOS} paso={paso} />

      {paso === 0 && (
        <fieldset className="ev-fs">
          <legend><span>1</span> Tus datos y tu zona</legend>
          <Campo id="ho-zona" label="Municipio *" error={err('zona')}>
            <select id="ho-zona" className="select" value={f.zona} onChange={elegirZona} {...aria('zona')}>
              <option value="">Selecciona tu municipio</option>
              {estados.map((e) => (
                <optgroup key={e} label={e}>
                  {ZONAS_HOGAR.filter((z) => z.estado === e).map((z) => (
                    <option key={z.id} value={z.id}>{z.nombre}{z.planesTv ? ' · Internet + TV' : ''}</option>
                  ))}
                </optgroup>
              ))}
              <option value="otra">Mi municipio no aparece</option>
            </select>
          </Campo>

          {f.zona === 'otra' && (
            <div className="form-row">
              <Campo id="ho-estadoOtro" label="Estado *" error={err('estadoOtro')}>
                <SelectEstado id="ho-estadoOtro" value={f.estadoOtro} onChange={set('estadoOtro')} error={err('estadoOtro')} />
              </Campo>
              <Campo id="ho-municipioOtro" label="Municipio *" error={err('municipioOtro')}>
                <input id="ho-municipioOtro" className="input" value={f.municipioOtro} onChange={set('municipioOtro')} autoComplete="address-level2" maxLength={80} {...aria('municipioOtro')} />
              </Campo>
            </div>
          )}
          <Campo id="ho-nombre" label="Nombre completo *" error={err('nombre')}>
            <input id="ho-nombre" className="input" autoComplete="name" value={f.nombre} onChange={set('nombre')} maxLength={80} {...aria('nombre')} />
          </Campo>
          <div className="form-row">
            <Campo id="ho-telefono" label="Teléfono / WhatsApp *" error={err('telefono')}>
              <input id="ho-telefono" className="input" type="tel" inputMode="tel" autoComplete="tel" value={f.telefono} onChange={set('telefono')} placeholder="55 1234 5678" maxLength={20} {...aria('telefono')} />
            </Campo>
            <Campo id="ho-correo" label="Correo" error={err('correo')}>
              <input id="ho-correo" className="input" type="email" autoComplete="email" value={f.correo} onChange={set('correo')} maxLength={120} {...aria('correo')} />
            </Campo>
          </div>
          <AvisoContacto />
        </fieldset>
      )}
      {paso === 1 && (
        <fieldset className="ev-fs">
          <legend><span>2</span> Tu paquete</legend>
          {zona?.planesTv && (
            <div className="chips" role="group" aria-label="Tipo de paquete">
              {[[0, 'Internet + teléfono'], [1, 'Con TV · 1 tele'], [2, 'Con TV · 2 teles'], [3, 'Con TV · 3 teles']].map(([n, label]) => (
                <button key={n} type="button" className="chip" aria-pressed={filtroTv === n} onClick={() => setFiltroTv(n)}>{label}</button>
              ))}
            </div>
          )}

          {zona && (
            <div className="paq-list" role="radiogroup" aria-label="Paquete">
              {visibles.map((p) => (
                <label key={p.id} className={`paq-opt${f.paquete === p.id ? ' is-activo' : ''}`}>
                  <input type="radio" name="ho-paquete" value={p.id} checked={f.paquete === p.id} onChange={set('paquete')} />
                  <span className="paq-info">
                    <strong>{p.nombre}</strong>
                    <span>{descripcion(p)}</span>
                    {p.ideal && <span className="paq-ideal">{p.ideal}</span>}
                  </span>
                  <span className="paq-precio">{formatoPrecio(p.precio)}<small>/mes</small></span>
                </label>
              ))}
              <label className={`paq-opt${f.paquete === SIN_PAQUETE ? ' is-activo' : ''}`}>
                <input type="radio" name="ho-paquete" value={SIN_PAQUETE} checked={f.paquete === SIN_PAQUETE} onChange={set('paquete')} />
                <span className="paq-info"><strong>Aún no lo decido</strong><span>Un asesor te recomienda el mejor paquete</span></span>
              </label>
            </div>
          )}
          {f.zona === 'otra' && <p className="small muted">Te confirmamos si hay cobertura en tu domicilio y qué paquetes aplican.</p>}
        </fieldset>
      )}
      {paso === 2 && (
        <fieldset className="ev-fs">
          <legend><span>3</span> Domicilio de instalación</legend>
          <div className="form-row">
            <Campo id="ho-colonia" label="Colonia o fraccionamiento *" error={err('colonia')}>
              <input id="ho-colonia" className="input" value={f.colonia} onChange={set('colonia')} autoComplete="address-level3" maxLength={100} {...aria('colonia')} />
            </Campo>
            <Campo id="ho-cp" label="Código postal" error={err('cp')}>
              <input id="ho-cp" className="input" inputMode="numeric" autoComplete="postal-code" value={f.cp} onChange={set('cp')} maxLength={5} {...aria('cp')} />
            </Campo>
          </div>
          <Campo id="ho-calle" label="Calle y número *" error={err('calle')}>
            <input id="ho-calle" className="input" value={f.calle} onChange={set('calle')} autoComplete="address-line1" maxLength={120} {...aria('calle')} />
          </Campo>
          <CampoCoordenadas
            id="ho-ubicacion" label="Ubicación en el mapa" boton="Estoy en mi casa"
            value={f.ubicacion} onChange={(v) => setF((p) => ({ ...p, ubicacion: v }))} error={err('ubicacion')}
            ayuda="Opcional: nos ayuda a confirmar la cobertura más rápido."
          />
          <Campo id="ho-comentarios" label="Comentarios">
            <textarea id="ho-comentarios" className="textarea" rows={2} value={f.comentarios} onChange={set('comentarios')} maxLength={400} placeholder="Horario para la instalación, referencias del domicilio…" />
          </Campo>
        </fieldset>
      )}

      <ErroresPaso n={asis.nErroresPaso} />
      {/* Campo trampa contra bots: oculto para personas */}
      <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="campo-trampa" value={f.sitio_web} onChange={set('sitio_web')} />
      <NavPasos paso={paso} esUltimo={asis.esUltimo} atras={asis.atras}>
        <button type="submit" className="btn btn-wa btn-lg"><MessageCircle size={18} /> Solicitar instalación por WhatsApp</button>
      </NavPasos>
      {enviado && (
        <p className="alert" role="status">
          Abrimos WhatsApp con tu solicitud. ¿No se abrió? <a className="link" href={mailtoUrl('Contratación Hogar', mensaje, AREAS.ventasHogar.email)}><Mail size={14} /> Envíala por correo</a>
        </p>
      )}
      <p className="form-note">Requisitos: INE y comprobante de domicilio. Instalación de 5 a 10 días hábiles.</p>
    </form>
  );
}
