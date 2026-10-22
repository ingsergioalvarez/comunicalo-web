import React, { useState } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { whatsappUrl, mailtoUrl, AREAS } from '../data/site';
import {
  Campo, ariaError, SelectEstado, CampoCoordenadas, errorCoordenadas, textoCoordenadas, errorCorreo, telefonoValido,
} from './campos';
import { useAsistente, BarraPasos, AvisoContacto, ErroresPaso, NavPasos } from './asistente';

// Cotización empresarial: servicio con su capacidad o dimensión, ubicación completa
// (estado, municipio, colonia, coordenadas) y contacto con correo para la propuesta formal.
// Va por pasos: primero contacto y servicio (se guarda de inmediato) y luego los detalles,
// que se van guardando como atributos del prospecto aunque no termine.

const PASOS = [
  { titulo: 'Tus datos', campos: ['nombre', 'empresa', 'telefono', 'correo'] },
  { titulo: 'Detalles', campos: ['cantidad'] },
  { titulo: 'Ubicación', campos: ['estado', 'municipio', 'colonia', 'ubicacion', 'puntoB', 'ubicacionB'] },
];

export const SERVICIOS_EMPRESA = [
  { id: 'internet-dedicado', label: 'Internet dedicado (fibra o microondas)', capacidad: true },
  { id: 'lan-to-lan', label: 'Enlace LAN to LAN (punto a punto)', capacidad: true, puntoB: true },
  { id: 'vpn', label: 'Enlaces entre sucursales / VPN', capacidad: true, cantidad: { label: 'Número de sedes', min: 1, def: 3 } },
  { id: 'telefonia-ip', label: 'Telefonía IP / conmutador', cantidad: { label: 'Extensiones', min: 1, def: 10 } },
  { id: 'redes-wifi', label: 'Redes, WiFi empresarial o cableado', cantidad: { label: 'Superficie aproximada (m²)', min: 10, def: 500 } },
  { id: 'cctv', label: 'Cámaras y monitoreo C2', cantidad: { label: 'Número de cámaras', min: 1, def: 8 } },
  { id: 'ciberseguridad', label: 'Ciberseguridad / firewall' },
  { id: 'data-center', label: 'Data center / hospedaje de equipos' },
  { id: 'otro', label: 'Otro proyecto' },
];

export const CAPACIDADES_EMPRESA = ['Asesórenme', '10 Mbps', '20 Mbps', '50 Mbps', '100 Mbps', '200 Mbps', '500 Mbps', '1 Gbps', '10 Gbps'];

const inicial = (servicio) => ({
  servicio, capacidad: CAPACIDADES_EMPRESA[0], cantidad: '',
  estado: '', municipio: '', colonia: '', calle: '', ubicacion: '',
  puntoB: '', ubicacionB: '',
  nombre: '', empresa: '', puesto: '', telefono: '', correo: '', comentarios: '', sitio_web: '',
});

function validar(f, svc) {
  const e = {};
  if (svc.cantidad && f.cantidad !== '' && Number(f.cantidad) < svc.cantidad.min) e.cantidad = `Mínimo ${svc.cantidad.min}.`;
  if (!f.estado) e.estado = 'Elige el estado.';
  if (f.municipio.trim().length < 3) e.municipio = 'Escribe el municipio o alcaldía.';
  if (f.colonia.trim().length < 3) e.colonia = 'Escribe la colonia o parque industrial.';
  const eUbic = errorCoordenadas(f.ubicacion);
  if (eUbic) e.ubicacion = eUbic;
  if (svc.puntoB) {
    if (f.puntoB.trim().length < 5) e.puntoB = 'Indica la dirección del segundo punto.';
    const eB = errorCoordenadas(f.ubicacionB);
    if (eB) e.ubicacionB = eB;
  }
  if (f.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre.';
  if (f.empresa.trim().length < 2) e.empresa = 'Escribe el nombre de la empresa.';
  if (!telefonoValido(f.telefono)) e.telefono = 'Escribe un teléfono de 10 dígitos.';
  const eCorreo = errorCorreo(f.correo, true);
  if (eCorreo) e.correo = eCorreo;
  return e;
}

export default function FormEmpresa({ servicioInicial = 'internet-dedicado', detalle = '', titulo = 'Solicita tu cotización', subtitulo, boton = 'Enviar cotización por WhatsApp' }) {
  const [f, setF] = useState(() => inicial(SERVICIOS_EMPRESA.some((s) => s.id === servicioInicial) ? servicioInicial : 'internet-dedicado'));

  const svc = SERVICIOS_EMPRESA.find((s) => s.id === f.servicio);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const setValor = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const errores = validar(f, svc);

  const opcional = (dato, texto) => (dato ? [texto] : []);
  const domicilio = [f.calle.trim(), f.colonia.trim(), f.municipio.trim(), f.estado].filter(Boolean).join(', ');
  const coordA = textoCoordenadas(f.ubicacion);
  const coordB = textoCoordenadas(f.ubicacionB);
  const mensaje = [
    `Hola Comunícalo, quiero cotizar: ${svc.label}.`,
    '',
    ...opcional(detalle, `• Servicio de interés: ${detalle}`),
    ...opcional(svc.capacidad, `• Capacidad: ${f.capacidad}`),
    ...opcional(svc.cantidad && f.cantidad, `• ${svc.cantidad?.label}: ${Number(f.cantidad).toLocaleString('es-MX')}`),
    `• ${svc.puntoB ? 'Punto A' : 'Domicilio'}: ${domicilio}`,
    ...opcional(coordA, `• Coordenadas${svc.puntoB ? ' punto A' : ''}: ${coordA}`),
    ...opcional(svc.puntoB, `• Punto B: ${f.puntoB.trim()}`),
    ...opcional(svc.puntoB && coordB, `• Coordenadas punto B: ${coordB}`),
    ...opcional(f.comentarios.trim(), `• Comentarios: ${f.comentarios.trim()}`),
    '',
    `Contacto: ${f.nombre.trim()}${f.puesto.trim() ? `, ${f.puesto.trim()}` : ''} (${f.empresa.trim()}) · ${f.telefono.trim()} · ${f.correo.trim()}`,
  ].join('\n');

  const asis = useAsistente({
    pasos: PASOS, errores, prefijo: 'em',
    datosLead: () => ({
      origen: 'empresa', area: 'ventasEmpresas', interes: svc.label, nombre: f.nombre, empresa: f.empresa, telefono: f.telefono,
      correo: f.correo, zona: domicilio, mensaje, sitio_web: f.sitio_web,
      atributos: {
        'Servicio de interés': detalle,
        Puesto: f.puesto.trim(),
        Capacidad: svc.capacidad ? f.capacidad : '',
        [svc.cantidad?.label || 'Cantidad']: svc.cantidad ? f.cantidad : '',
        Estado: f.estado,
        Municipio: f.municipio.trim(),
        Colonia: f.colonia.trim(),
        Calle: f.calle.trim(),
        Coordenadas: coordA,
        'Punto B': svc.puntoB ? f.puntoB.trim() : '',
        'Coordenadas punto B': svc.puntoB ? coordB : '',
        Comentarios: f.comentarios.trim(),
      },
    }),
  });
  const { err, paso, enviado } = asis;
  const aria = (k) => ariaError(`em-${k}`, err(k));

  const enviar = () => {
    window.open(whatsappUrl(mensaje, AREAS.ventasEmpresas.wa), '_blank', 'noopener');
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
          <legend><span>1</span> Tus datos y lo que necesitas</legend>
          <Campo id="em-servicio" label="¿Qué necesitas? *">
            <select id="em-servicio" className="select" value={f.servicio} onChange={(e) => setF((p) => ({ ...p, servicio: e.target.value, cantidad: '' }))}>
              {SERVICIOS_EMPRESA.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </Campo>
          <div className="form-row">
            <Campo id="em-nombre" label="Nombre *" error={err('nombre')}>
              <input id="em-nombre" className="input" autoComplete="name" value={f.nombre} onChange={set('nombre')} maxLength={80} {...aria('nombre')} />
            </Campo>
            <Campo id="em-puesto" label="Puesto">
              <input id="em-puesto" className="input" autoComplete="organization-title" value={f.puesto} onChange={set('puesto')} maxLength={80} />
            </Campo>
          </div>
          <Campo id="em-empresa" label="Empresa *" error={err('empresa')}>
            <input id="em-empresa" className="input" autoComplete="organization" value={f.empresa} onChange={set('empresa')} maxLength={120} {...aria('empresa')} />
          </Campo>
          <div className="form-row">
            <Campo id="em-telefono" label="Teléfono / WhatsApp *" error={err('telefono')}>
              <input id="em-telefono" className="input" type="tel" inputMode="tel" autoComplete="tel" value={f.telefono} onChange={set('telefono')} placeholder="55 1234 5678" maxLength={20} {...aria('telefono')} />
            </Campo>
            <Campo id="em-correo" label="Correo *" error={err('correo')}>
              <input id="em-correo" className="input" type="email" autoComplete="email" value={f.correo} onChange={set('correo')} maxLength={120} {...aria('correo')} />
            </Campo>
          </div>
          <AvisoContacto />
        </fieldset>
      )}
      {paso === 1 && (
        <fieldset className="ev-fs">
          <legend><span>2</span> Detalles del servicio</legend>
          {(svc.capacidad || svc.cantidad) && (
            <div className="form-row">
              {svc.capacidad && (
                <Campo id="em-capacidad" label="Capacidad simétrica">
                  <select id="em-capacidad" className="select" value={f.capacidad} onChange={set('capacidad')}>
                    {CAPACIDADES_EMPRESA.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Campo>
              )}
              {svc.cantidad && (
                <Campo id="em-cantidad" label={svc.cantidad.label} error={err('cantidad')}>
                  <input
                    id="em-cantidad" className="input" type="number" inputMode="numeric" min={svc.cantidad.min}
                    placeholder={`Ej. ${svc.cantidad.def}`} value={f.cantidad} onChange={set('cantidad')} {...aria('cantidad')}
                  />
                </Campo>
              )}
            </div>
          )}
          <Campo id="em-comentarios" label="Comentarios">
            <textarea id="em-comentarios" className="textarea" rows={3} value={f.comentarios} onChange={set('comentarios')} maxLength={600} placeholder="Proveedor actual, fecha en que lo necesitas, equipos que ya tienes…" />
          </Campo>
        </fieldset>
      )}
      {paso === 2 && (
        <fieldset className="ev-fs">
          <legend><span>3</span> {svc.puntoB ? 'Punto A (sitio principal)' : 'Ubicación del servicio'}</legend>
          <div className="form-row">
            <Campo id="em-estado" label="Estado *" error={err('estado')}>
              <SelectEstado id="em-estado" value={f.estado} onChange={set('estado')} error={err('estado')} />
            </Campo>
            <Campo id="em-municipio" label="Municipio o alcaldía *" error={err('municipio')}>
              <input id="em-municipio" className="input" value={f.municipio} onChange={set('municipio')} autoComplete="address-level2" maxLength={80} {...aria('municipio')} />
            </Campo>
          </div>
          <div className="form-row">
            <Campo id="em-colonia" label="Colonia o parque industrial *" error={err('colonia')}>
              <input id="em-colonia" className="input" value={f.colonia} onChange={set('colonia')} autoComplete="address-level3" maxLength={100} {...aria('colonia')} />
            </Campo>
            <Campo id="em-calle" label="Calle y número">
              <input id="em-calle" className="input" value={f.calle} onChange={set('calle')} autoComplete="address-line1" maxLength={120} />
            </Campo>
          </div>
          <CampoCoordenadas
            id="em-ubicacion" value={f.ubicacion} onChange={setValor('ubicacion')} error={err('ubicacion')}
            ayuda="Con la ubicación exacta validamos si llegamos por fibra o por microondas."
          />
          {svc.puntoB && (
            <>
              <Campo id="em-puntoB" label="Punto B: dirección del segundo sitio *" error={err('puntoB')}>
                <input id="em-puntoB" className="input" value={f.puntoB} onChange={set('puntoB')} placeholder="Calle, colonia, municipio y estado" maxLength={200} {...aria('puntoB')} />
              </Campo>
              <CampoCoordenadas
                id="em-ubicacionB" label="Coordenadas del punto B" boton="Usar mi ubicación"
                value={f.ubicacionB} onChange={setValor('ubicacionB')} error={err('ubicacionB')}
              />
            </>
          )}
        </fieldset>
      )}

      <ErroresPaso n={asis.nErroresPaso} />
      {/* Campo trampa contra bots: oculto para personas */}
      <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="campo-trampa" value={f.sitio_web} onChange={set('sitio_web')} />
      <NavPasos paso={paso} esUltimo={asis.esUltimo} atras={asis.atras}>
        <button type="submit" className="btn btn-wa btn-lg"><MessageCircle size={18} /> {boton}</button>
      </NavPasos>
      {enviado && (
        <p className="alert" role="status">
          Abrimos WhatsApp con tu solicitud. ¿No se abrió? <a className="link" href={mailtoUrl(`Cotización: ${svc.label}`, mensaje, AREAS.ventasEmpresas.email)}><Mail size={14} /> Envíala por correo</a>
        </p>
      )}
      <p className="form-note">Te enviamos la propuesta formal a tu correo. Sin compromiso.</p>
    </form>
  );
}
