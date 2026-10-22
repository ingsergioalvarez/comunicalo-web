import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { useRouter } from '../router';
import { whatsappUrl, mailtoUrl, AREAS } from '../data/site';
import {
  Campo, ariaError, SelectEstado, CampoCoordenadas, errorCoordenadas, textoCoordenadas, errorCorreo, telefonoValido,
} from './campos';
import { useAsistente, BarraPasos, AvisoContacto, ErroresPaso, NavPasos } from './asistente';

// Formulario de cotización de eventos: tipo, ubicación (estado, municipio, coordenadas),
// aforo de hasta 100,000 usuarios simultáneos, capacidad, servicios y contacto.
// Envía la solicitud por WhatsApp (con respaldo por correo).
// Acepta ?evento=<id>&usuarios=<n> en la URL (desde las tarjetas de /eventos).
// Va por pasos: primero contacto y tipo de evento (se guarda de inmediato) y luego los
// detalles, que se van guardando como atributos del prospecto aunque no termine.

const PASOS = [
  { titulo: 'Tus datos', campos: ['tipo', 'nombre', 'telefono', 'correo'] },
  { titulo: 'Detalles', campos: ['fecha', 'usuarios'] },
  { titulo: 'Ubicación', campos: ['estado', 'municipio', 'ubicacion'] },
  { titulo: 'Servicios', campos: [] },
];

const MAX_USUARIOS = 100000;
const MIN_USUARIOS = 10;

// Escala del deslizador: pasos finos en eventos chicos y gruesos en masivos
function rango(desde, hasta, paso) {
  const r = [];
  for (let v = desde; v <= hasta; v += paso) r.push(v);
  return r;
}
const ESCALA = [...rango(50, 1000, 50), ...rango(1500, 10000, 500), ...rango(12500, MAX_USUARIOS, 2500)];
const MARCAS = [50, 1000, 10000, 50000, MAX_USUARIOS];
const indiceCercano = (v) => ESCALA.reduce((mejor, x, i) => (Math.abs(x - v) < Math.abs(ESCALA[mejor] - v) ? i : mejor), 0);

function escalaEvento(n) {
  if (n <= 500) return 'Evento pequeño · WiFi de alta densidad';
  if (n <= 5000) return 'Evento mediano · varios puntos de acceso y enlace dedicado';
  if (n <= 20000) return 'Evento grande · diseño de red y visita técnica';
  return 'Evento masivo · ingeniería dedicada y enlaces redundantes';
}

export const CAPACIDADES_EVENTO = ['Asesórenme', '50 Mbps', '100 Mbps', '200 Mbps', '500 Mbps', '1 Gbps', 'Más de 1 Gbps'];

const NECESIDADES = [
  { id: 'wifi-publico', label: 'WiFi para asistentes' },
  { id: 'staff', label: 'Red para staff y prensa' },
  { id: 'cableado', label: 'Puntos de red cableados' },
  { id: 'stream', label: 'Transmisión en vivo' },
  { id: 'cobro', label: 'Terminales de cobro' },
  { id: 'accesos', label: 'Control de accesos / boletaje' },
  { id: 'telefonia', label: 'Líneas telefónicas' },
  { id: 'cctv', label: 'Cámaras de seguridad' },
  { id: 'sin-internet', label: 'El recinto no tiene internet' },
  { id: 'exterior', label: 'Espacio abierto / exterior' },
];

const hoy = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const INICIAL = {
  tipo: '', nombreEvento: '', fecha: '', dias: 1, usuarios: 500, capacidad: CAPACIDADES_EVENTO[0],
  estado: '', municipio: '', recinto: '', ubicacion: '',
  necesidades: [], nombre: '', empresa: '', telefono: '', correo: '', comentarios: '', sitio_web: '',
};

function validar(f) {
  const e = {};
  if (!f.tipo) e.tipo = 'Elige el tipo de evento.';
  if (!f.fecha) e.fecha = 'Indica la fecha de inicio.';
  else if (f.fecha < hoy()) e.fecha = 'La fecha no puede ser anterior a hoy.';
  if (!Number.isFinite(f.usuarios) || f.usuarios < MIN_USUARIOS || f.usuarios > MAX_USUARIOS) {
    e.usuarios = `Indica entre ${MIN_USUARIOS} y ${MAX_USUARIOS.toLocaleString('es-MX')} usuarios.`;
  }
  if (!f.estado) e.estado = 'Elige el estado.';
  if (f.municipio.trim().length < 3) e.municipio = 'Escribe el municipio o alcaldía.';
  const eUbic = errorCoordenadas(f.ubicacion);
  if (eUbic) e.ubicacion = eUbic;
  if (f.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre.';
  if (!telefonoValido(f.telefono)) e.telefono = 'Escribe un teléfono de 10 dígitos.';
  const eCorreo = errorCorreo(f.correo, true);
  if (eCorreo) e.correo = eCorreo;
  return e;
}

export default function PlaneadorEvento({ tipos }) {
  const { search } = useRouter();
  const [f, setF] = useState(INICIAL);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const errores = validar(f);

  // Tipo de evento y aforo que llegan en la URL
  useEffect(() => {
    const q = new URLSearchParams(search);
    const tipo = q.get('evento');
    const usuarios = Number(q.get('usuarios'));
    setF((p) => ({
      ...p,
      ...(tipo && (tipos.some((t) => t.id === tipo) || tipo === 'otro') ? { tipo } : {}),
      ...(usuarios >= MIN_USUARIOS && usuarios <= MAX_USUARIOS ? { usuarios } : {}),
    }));
  }, [search, tipos]);

  const toggleNecesidad = (id) => setF((p) => ({
    ...p,
    necesidades: p.necesidades.includes(id) ? p.necesidades.filter((n) => n !== id) : [...p.necesidades, id],
  }));

  const tipoLabel = tipos.find((t) => t.id === f.tipo)?.titulo || (f.tipo === 'otro' ? 'Otro' : '');
  const fechaLabel = f.fecha ? new Date(`${f.fecha}T12:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const ubicacionTexto = textoCoordenadas(f.ubicacion);

  // Renglones opcionales: solo se incluyen si tienen dato
  const opcional = (dato, texto) => (dato ? [texto] : []);
  const mensaje = [
    'Hola Comunícalo, quiero cotizar internet para un evento.',
    '',
    `• Tipo de evento: ${tipoLabel}${f.nombreEvento.trim() ? ` — ${f.nombreEvento.trim()}` : ''}`,
    `• Fecha: ${fechaLabel} · ${f.dias} día${f.dias > 1 ? 's' : ''}`,
    `• Usuarios simultáneos: ${Number.isFinite(f.usuarios) ? f.usuarios.toLocaleString('es-MX') : ''}`,
    `• Ancho de banda: ${f.capacidad}`,
    `• Ubicación: ${f.municipio.trim()}, ${f.estado}`,
    ...opcional(f.recinto.trim(), `• Recinto / dirección: ${f.recinto.trim()}`),
    ...opcional(ubicacionTexto, `• Coordenadas: ${ubicacionTexto}`),
    ...opcional(f.necesidades.length, `• Servicios: ${NECESIDADES.filter((n) => f.necesidades.includes(n.id)).map((n) => n.label).join(', ')}`),
    ...opcional(f.comentarios.trim(), `• Comentarios: ${f.comentarios.trim()}`),
    '',
    `Contacto: ${f.nombre.trim()}${f.empresa.trim() ? ` (${f.empresa.trim()})` : ''} · ${f.telefono.trim()} · ${f.correo.trim()}`,
  ].join('\n');

  const asis = useAsistente({
    pasos: PASOS, errores, prefijo: 'ev',
    datosLead: () => ({
      origen: 'evento', area: 'ventasEmpresas', interes: `Evento: ${tipoLabel}`, nombre: f.nombre, empresa: f.empresa,
      telefono: f.telefono, correo: f.correo, zona: [f.recinto.trim(), f.municipio.trim(), f.estado].filter(Boolean).join(', '), mensaje, sitio_web: f.sitio_web,
      atributos: {
        'Nombre del evento': f.nombreEvento.trim(),
        Fecha: fechaLabel,
        'Días': f.dias,
        'Usuarios simultáneos': Number.isFinite(f.usuarios) ? f.usuarios : '',
        'Ancho de banda': f.capacidad,
        Estado: f.estado,
        Municipio: f.municipio.trim(),
        Recinto: f.recinto.trim(),
        Coordenadas: ubicacionTexto,
        Servicios: NECESIDADES.filter((n) => f.necesidades.includes(n.id)).map((n) => n.label).join(', '),
        Comentarios: f.comentarios.trim(),
      },
    }),
  });
  const { err, paso, enviado } = asis;
  const aria = (k) => ariaError(`ev-${k}`, err(k));

  const enviar = () => {
    window.open(whatsappUrl(mensaje, AREAS.ventasEmpresas.wa), '_blank', 'noopener');
    asis.completar();
  };

  return (
    <form ref={asis.formRef} className="card ev-form" onSubmit={asis.alEnviar(enviar)} noValidate aria-labelledby="ev-form-titulo">
      <div className="ev-form-head">
        <h2 id="ev-form-titulo" className="h3">Planea tu evento</h2>
        <p className="small muted">Completa los datos y te respondemos con propuesta técnica y disponibilidad. Los campos con * son obligatorios.</p>
      </div>

      <div className="form mt-3">
        <BarraPasos pasos={PASOS} paso={paso} />
        <div>
          {paso === 0 && (
            <fieldset className="ev-fs">
              <legend><span>1</span> Tus datos y tu evento</legend>
              <Campo id="ev-tipo" label="Tipo de evento *" error={err('tipo')}>
                <select id="ev-tipo" className="select" value={f.tipo} onChange={set('tipo')} {...aria('tipo')}>
                  <option value="">Selecciona…</option>
                  {tipos.map((t) => <option key={t.id} value={t.id}>{t.titulo}</option>)}
                  <option value="otro">Otro</option>
                </select>
              </Campo>
              <div className="form-row">
                <Campo id="ev-nombre" label="Nombre *" error={err('nombre')}>
                  <input id="ev-nombre" className="input" autoComplete="name" value={f.nombre} onChange={set('nombre')} maxLength={80} {...aria('nombre')} />
                </Campo>
                <Campo id="ev-empresa" label="Empresa u organizador">
                  <input id="ev-empresa" className="input" autoComplete="organization" value={f.empresa} onChange={set('empresa')} maxLength={80} />
                </Campo>
              </div>
              <div className="form-row">
                <Campo id="ev-telefono" label="Teléfono / WhatsApp *" error={err('telefono')}>
                  <input id="ev-telefono" className="input" type="tel" inputMode="tel" autoComplete="tel" value={f.telefono} onChange={set('telefono')} placeholder="55 1234 5678" maxLength={20} {...aria('telefono')} />
                </Campo>
                <Campo id="ev-correo" label="Correo *" error={err('correo')}>
                  <input id="ev-correo" className="input" type="email" autoComplete="email" value={f.correo} onChange={set('correo')} maxLength={120} {...aria('correo')} />
                </Campo>
              </div>
              <AvisoContacto />
            </fieldset>
          )}
          {paso === 1 && (
            <fieldset className="ev-fs">
              <legend><span>2</span> Detalles del evento</legend>
              <Campo id="ev-nombreEvento" label="Nombre del evento">
                <input id="ev-nombreEvento" className="input" value={f.nombreEvento} onChange={set('nombreEvento')} placeholder="Ej. Expo Industrial 2027" maxLength={120} />
              </Campo>
              <div className="form-row">
                <Campo id="ev-fecha" label="Fecha de inicio *" error={err('fecha')}>
                  <input id="ev-fecha" className="input" type="date" min={hoy()} value={f.fecha} onChange={set('fecha')} {...aria('fecha')} />
                </Campo>
                <Campo id="ev-dias" label={<>Duración: <strong className="hl">{f.dias} día{f.dias > 1 ? 's' : ''}</strong></>}>
                  <input id="ev-dias" className="range" type="range" min="1" max="30" value={f.dias} onChange={(e) => setF((p) => ({ ...p, dias: +e.target.value }))} />
                </Campo>
              </div>

              <Campo
                id="ev-usuarios"
                label={<>Usuarios conectados al mismo tiempo *</>}
                error={err('usuarios')}
                ayuda={escalaEvento(f.usuarios || 0)}
              >
                <div className="ev-aforo">
                  <input
                    className="range" type="range" min="0" max={ESCALA.length - 1} aria-label="Usuarios simultáneos (deslizador)"
                    value={indiceCercano(f.usuarios || 0)}
                    aria-valuetext={`${ESCALA[indiceCercano(f.usuarios || 0)].toLocaleString('es-MX')} usuarios`}
                    onChange={(e) => setF((p) => ({ ...p, usuarios: ESCALA[+e.target.value] }))}
                  />
                  <input
                    id="ev-usuarios" className="input ev-aforo-num" type="number" inputMode="numeric"
                    min={MIN_USUARIOS} max={MAX_USUARIOS} step="1"
                    value={Number.isFinite(f.usuarios) ? f.usuarios : ''}
                    onChange={(e) => setF((p) => ({ ...p, usuarios: e.target.value === '' ? NaN : Math.round(+e.target.value) }))}
                    {...aria('usuarios')}
                  />
                </div>
                <div className="ev-aforo-marcas" aria-hidden="true">
                  {MARCAS.map((m) => (
                    <span key={m} style={{ left: `${(indiceCercano(m) / (ESCALA.length - 1)) * 100}%` }}>{m.toLocaleString('es-MX')}</span>
                  ))}
                </div>
              </Campo>

              <Campo id="ev-capacidad" label="Ancho de banda que necesitas" ayuda="Si no lo sabes, lo calculamos con el número de usuarios y lo que transmitirás.">
                <select id="ev-capacidad" className="select" value={f.capacidad} onChange={set('capacidad')}>
                  {CAPACIDADES_EVENTO.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Campo>
            </fieldset>
          )}
          {paso === 2 && (
            <fieldset className="ev-fs">
              <legend><span>3</span> Ubicación</legend>
              <div className="form-row">
                <Campo id="ev-estado" label="Estado *" error={err('estado')}>
                  <SelectEstado id="ev-estado" value={f.estado} onChange={set('estado')} error={err('estado')} />
                </Campo>
                <Campo id="ev-municipio" label="Municipio o alcaldía *" error={err('municipio')}>
                  <input id="ev-municipio" className="input" value={f.municipio} onChange={set('municipio')} placeholder="Ej. Tlalnepantla" autoComplete="address-level2" maxLength={80} {...aria('municipio')} />
                </Campo>
              </div>
              <Campo id="ev-recinto" label="Recinto o dirección">
                <input id="ev-recinto" className="input" value={f.recinto} onChange={set('recinto')} placeholder="Ej. Centro de Convenciones, calle y número" maxLength={160} />
              </Campo>
              <CampoCoordenadas
                id="ev-ubicacion" value={f.ubicacion} onChange={(v) => setF((p) => ({ ...p, ubicacion: v }))} error={err('ubicacion')}
                ayuda="Ayuda a nuestros ingenieros a validar si llegamos por fibra o microondas."
              />
            </fieldset>
          )}
          {paso === 3 && (
            <fieldset className="ev-fs">
              <legend><span>4</span> ¿Qué servicios necesitas?</legend>
              <div className="chips" role="group" aria-label="Servicios para el evento">
                {NECESIDADES.map((n) => (
                  <button key={n.id} type="button" className="chip" aria-pressed={f.necesidades.includes(n.id)} onClick={() => toggleNecesidad(n.id)}>
                    {n.label}
                  </button>
                ))}
              </div>
              <Campo id="ev-comentarios" label="Comentarios">
                <textarea id="ev-comentarios" className="textarea" rows={3} value={f.comentarios} onChange={set('comentarios')} maxLength={600} placeholder="Horarios de montaje, número de salones, redes separadas, plataforma de streaming…" />
              </Campo>
            </fieldset>
          )}
        </div>

        <div className="ev-form-footer">
          <ErroresPaso n={asis.nErroresPaso} />
          <div className="ev-form-submit">
            <p className="form-note">Respondemos en horario de oficina. Para eventos de más de 20,000 usuarios agendamos visita técnica.</p>
            {/* Campo trampa contra bots: oculto para personas */}
            <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="campo-trampa" value={f.sitio_web} onChange={set('sitio_web')} />
            <NavPasos paso={paso} esUltimo={asis.esUltimo} atras={asis.atras}>
              <button type="submit" className="btn btn-wa btn-lg"><MessageCircle size={18} /> Solicitar propuesta</button>
            </NavPasos>
          </div>
          {enviado && (
            <p className="alert" role="status">
              Abrimos WhatsApp con tu solicitud. ¿No se abrió?{' '}
              <a className="link" href={mailtoUrl(`Cotización internet para evento: ${tipoLabel}`, mensaje, AREAS.ventasEmpresas.email)}><Mail size={14} /> Envíala por correo</a>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
