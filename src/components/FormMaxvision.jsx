import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { whatsappUrl, mailtoUrl, AREAS } from '../data/site';
import { PLANES_TRIPLE_PLAY, PLANES_MAXICOM, PLAN_TV, COBERTURA_MAXVISION, formatoPrecio } from '../data/planes';
import {
  Campo, ariaError, CampoCoordenadas, errorCoordenadas, textoCoordenadas, errorCorreo, telefonoValido,
} from './campos';
import { useAsistente, BarraPasos, AvisoContacto, ErroresPaso, NavPasos } from './asistente';

// Contratación MAXVISION (Otumba y Axapusco). Es una oferta regional: este formulario solo
// vive en /maxvision y llega al WhatsApp de ventas MAXVISION, no al de Comunícalo Hogar.
// Mismos pasos que FormHogar: contacto y municipio, paquete y domicilio.

const SIN_PAQUETE = 'asesoria';

const GRUPOS = [
  { titulo: 'Triple Play · Internet + teléfono + TV', planes: PLANES_TRIPLE_PLAY },
  { titulo: 'Doble Play MaxiCom · Internet + teléfono', planes: PLANES_MAXICOM },
  { titulo: 'Solo televisión', planes: [PLAN_TV] },
];
const PAQUETES = GRUPOS.flatMap((g) => g.planes);

const descripcion = (p) => (p.id === PLAN_TV.id
  ? `${p.canales} canales con decodificador digital`
  : [`${p.bajada} Megas`, p.canales ? `TV ${p.canales} canales` : null, 'telefonía fija'].filter(Boolean).join(' · '));

const PASOS = [
  { titulo: 'Tus datos', campos: ['municipio', 'nombre', 'telefono', 'correo'] },
  { titulo: 'Tu paquete', campos: [] },
  { titulo: 'Domicilio', campos: ['colonia', 'cp', 'calle', 'ubicacion'] },
];

const inicial = (planId) => ({
  municipio: '', paquete: planId || '', colonia: '', calle: '', cp: '', ubicacion: '',
  nombre: '', telefono: '', correo: '', comentarios: '', sitio_web: '',
});

function validar(f) {
  const e = {};
  if (!f.municipio) e.municipio = 'Elige tu municipio.';
  if (f.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre.';
  if (!telefonoValido(f.telefono)) e.telefono = 'Escribe un teléfono de 10 dígitos.';
  const eCorreo = errorCorreo(f.correo, false);
  if (eCorreo) e.correo = eCorreo;
  if (f.colonia.trim().length < 3) e.colonia = 'Escribe tu colonia o barrio.';
  if (f.calle.trim().length < 3) e.calle = 'Escribe calle y número.';
  if (f.cp && !/^\d{5}$/.test(f.cp)) e.cp = 'El código postal tiene 5 dígitos.';
  const eUbic = errorCoordenadas(f.ubicacion);
  if (eUbic) e.ubicacion = eUbic;
  return e;
}

// planInicial: paquete elegido en las tarjetas de la página ("Me interesa")
export default function FormMaxvision({ planInicial = '' }) {
  const [f, setF] = useState(() => inicial(planInicial));
  useEffect(() => {
    if (planInicial) setF((p) => ({ ...p, paquete: planInicial }));
  }, [planInicial]);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const errores = validar(f);

  const paquete = PAQUETES.find((p) => p.id === f.paquete);
  const paqueteTexto = paquete
    ? `${paquete.nombre} — ${descripcion(paquete)} — ${formatoPrecio(paquete.precio)}/mes`
    : 'Aún no lo decido, quiero asesoría';
  const domicilio = [f.calle.trim(), f.colonia.trim(), f.municipio, 'Estado de México', f.cp && `C.P. ${f.cp}`].filter(Boolean).join(', ');
  const coord = textoCoordenadas(f.ubicacion);
  const opcional = (dato, texto) => (dato ? [texto] : []);
  const mensaje = [
    'Hola MAXVISION, quiero contratar el servicio en mi casa.',
    '',
    `• Paquete: ${paqueteTexto}`,
    `• Domicilio: ${domicilio}`,
    ...opcional(coord, `• Coordenadas: ${coord}`),
    ...opcional(f.comentarios.trim(), `• Comentarios: ${f.comentarios.trim()}`),
    '',
    `Contacto: ${f.nombre.trim()} · ${f.telefono.trim()}${f.correo.trim() ? ` · ${f.correo.trim()}` : ''}`,
  ].join('\n');

  const asis = useAsistente({
    pasos: PASOS, errores, prefijo: 'mx',
    datosLead: () => ({
      origen: 'maxvision', area: 'ventasMaxvision', interes: paquete ? `MAXVISION: ${paquete.nombre}` : 'MAXVISION',
      nombre: f.nombre, telefono: f.telefono, correo: f.correo, zona: domicilio, mensaje, sitio_web: f.sitio_web,
      atributos: {
        Paquete: f.paquete ? paqueteTexto : '',
        Municipio: f.municipio,
        Colonia: f.colonia.trim(),
        Calle: f.calle.trim(),
        'Código postal': f.cp,
        Coordenadas: coord,
        Comentarios: f.comentarios.trim(),
      },
    }),
  });
  const { err, paso, enviado } = asis;
  const aria = (k) => ariaError(`mx-${k}`, err(k));

  const enviar = () => {
    window.open(whatsappUrl(mensaje, AREAS.ventasMaxvision.wa), '_blank', 'noopener');
    asis.completar();
  };

  return (
    <form ref={asis.formRef} className="form form-cot" onSubmit={asis.alEnviar(enviar)} noValidate aria-label="Contrata MAXVISION">
      <BarraPasos pasos={PASOS} paso={paso} />

      {paso === 0 && (
        <fieldset className="ev-fs">
          <legend><span>1</span> Tus datos y tu municipio</legend>
          <Campo id="mx-municipio" label="Municipio *" error={err('municipio')}>
            <select id="mx-municipio" className="select" value={f.municipio} onChange={set('municipio')} {...aria('municipio')}>
              <option value="">Selecciona tu municipio</option>
              {COBERTURA_MAXVISION.municipios.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Campo>
          <Campo id="mx-nombre" label="Nombre completo *" error={err('nombre')}>
            <input id="mx-nombre" className="input" autoComplete="name" value={f.nombre} onChange={set('nombre')} maxLength={80} {...aria('nombre')} />
          </Campo>
          <div className="form-row">
            <Campo id="mx-telefono" label="Teléfono / WhatsApp *" error={err('telefono')}>
              <input id="mx-telefono" className="input" type="tel" inputMode="tel" autoComplete="tel" value={f.telefono} onChange={set('telefono')} placeholder="55 1234 5678" maxLength={20} {...aria('telefono')} />
            </Campo>
            <Campo id="mx-correo" label="Correo" error={err('correo')}>
              <input id="mx-correo" className="input" type="email" autoComplete="email" value={f.correo} onChange={set('correo')} maxLength={120} {...aria('correo')} />
            </Campo>
          </div>
          <AvisoContacto />
        </fieldset>
      )}
      {paso === 1 && (
        <fieldset className="ev-fs">
          <legend><span>2</span> Tu paquete</legend>
          <div className="paq-list" role="radiogroup" aria-label="Paquete">
            {GRUPOS.map((g) => (
              <React.Fragment key={g.titulo}>
                <p className="paq-grupo">{g.titulo}</p>
                {g.planes.map((p) => (
                  <label key={p.id} className={`paq-opt${f.paquete === p.id ? ' is-activo' : ''}`}>
                    <input type="radio" name="mx-paquete" value={p.id} checked={f.paquete === p.id} onChange={set('paquete')} />
                    <span className="paq-info">
                      <strong>{p.nombre}</strong>
                      <span>{descripcion(p)}</span>
                    </span>
                    <span className="paq-precio">{formatoPrecio(p.precio)}<small>/mes</small></span>
                  </label>
                ))}
              </React.Fragment>
            ))}
            <label className={`paq-opt${f.paquete === SIN_PAQUETE ? ' is-activo' : ''}`}>
              <input type="radio" name="mx-paquete" value={SIN_PAQUETE} checked={f.paquete === SIN_PAQUETE} onChange={set('paquete')} />
              <span className="paq-info"><strong>Aún no lo decido</strong><span>Un asesor te recomienda el mejor paquete</span></span>
            </label>
          </div>
        </fieldset>
      )}
      {paso === 2 && (
        <fieldset className="ev-fs">
          <legend><span>3</span> Domicilio de instalación</legend>
          <div className="form-row">
            <Campo id="mx-colonia" label="Colonia o barrio *" error={err('colonia')}>
              <input id="mx-colonia" className="input" value={f.colonia} onChange={set('colonia')} autoComplete="address-level3" maxLength={100} {...aria('colonia')} />
            </Campo>
            <Campo id="mx-cp" label="Código postal" error={err('cp')}>
              <input id="mx-cp" className="input" inputMode="numeric" autoComplete="postal-code" value={f.cp} onChange={set('cp')} maxLength={5} {...aria('cp')} />
            </Campo>
          </div>
          <Campo id="mx-calle" label="Calle y número *" error={err('calle')}>
            <input id="mx-calle" className="input" value={f.calle} onChange={set('calle')} autoComplete="address-line1" maxLength={120} {...aria('calle')} />
          </Campo>
          <CampoCoordenadas
            id="mx-ubicacion" label="Ubicación en el mapa" boton="Estoy en mi casa"
            value={f.ubicacion} onChange={(v) => setF((p) => ({ ...p, ubicacion: v }))} error={err('ubicacion')}
            ayuda="Opcional: nos ayuda a confirmar la cobertura más rápido."
          />
          <Campo id="mx-comentarios" label="Comentarios">
            <textarea id="mx-comentarios" className="textarea" rows={2} value={f.comentarios} onChange={set('comentarios')} maxLength={400} placeholder="Horario para la instalación, referencias del domicilio…" />
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
          Abrimos WhatsApp con tu solicitud. ¿No se abrió? <a className="link" href={mailtoUrl('Contratación MAXVISION', mensaje, AREAS.ventasMaxvision.email)}><Mail size={14} /> Envíala por correo</a>
        </p>
      )}
      <p className="form-note">Requisitos: INE y comprobante de domicilio.</p>
    </form>
  );
}
