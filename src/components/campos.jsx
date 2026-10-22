import React, { useState } from 'react';
import { MapPin, LocateFixed, ExternalLink, CircleAlert, CircleCheck } from 'lucide-react';
import { ESTADOS_MX, ESTADOS_COBERTURA } from '../data/estados';

// Piezas compartidas por los formularios de Empresas, Hogar y Eventos:
// campo con error, selector de estado, coordenadas con GPS y validaciones de contacto.

// Acepta "19.4326, -99.1332", grados-minutos-segundos o enlaces de Google Maps con coordenadas
const NUM = '(-?\\d{1,3}(?:\\.\\d+)?)';
const PATRONES = [
  new RegExp(`!3d${NUM}!4d${NUM}`),
  new RegExp(`@${NUM},${NUM}`),
  new RegExp(`[?&](?:q|query|ll|destination|center)=${NUM},\\s*${NUM}`),
  new RegExp(`^${NUM}\\s*[,;\\s]\\s*${NUM}$`),
];
const DMS = /(\d{1,3})°\s*(\d{1,2})['′]\s*([\d.]+)["″]?\s*([NS])[\s,]+(\d{1,3})°\s*(\d{1,2})['′]\s*([\d.]+)["″]?\s*([EOW])/i;

export function leerCoordenadas(texto) {
  const t = texto.trim();
  const valida = (lat, lng) => (Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null);
  const dms = t.match(DMS);
  if (dms) {
    const g = (d, m, s, h) => (+d + +m / 60 + +s / 3600) * (/[SWO]/i.test(h) ? -1 : 1);
    return valida(g(dms[1], dms[2], dms[3], dms[4]), g(dms[5], dms[6], dms[7], dms[8]));
  }
  for (const re of PATRONES) {
    const m = t.match(re);
    if (m) return valida(+m[1], +m[2]);
  }
  return null;
}

const enMexico = ({ lat, lng }) => lat >= 14 && lat <= 33 && lng >= -119 && lng <= -86;
const fmtCoord = ({ lat, lng }) => `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
const esEnlace = (t) => /^https?:\/\//i.test(t.trim());

// Error de formato del campo de coordenadas (vacío es válido: es opcional)
export function errorCoordenadas(texto) {
  if (!texto.trim() || esEnlace(texto) || leerCoordenadas(texto)) return undefined;
  return 'No reconocemos el formato. Usa "19.4326, -99.1332" o pega el enlace de Google Maps.';
}

// Texto para el mensaje: coordenadas normalizadas con enlace al mapa, o el enlace tal cual
export function textoCoordenadas(texto) {
  const c = texto.trim() ? leerCoordenadas(texto) : null;
  return c ? `${fmtCoord(c)} (https://maps.google.com/?q=${c.lat.toFixed(6)},${c.lng.toFixed(6)})` : texto.trim();
}

export const correoValido = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.trim());

// Mensaje de error del correo con la causa concreta. El autollenado del navegador a veces
// agrega un segundo dominio (nombre@mail@empresa.mx), por eso se avisa de la @ repetida.
export function errorCorreo(c, obligatorio) {
  const t = c.trim();
  if (!t) return obligatorio ? 'Escribe tu correo para enviarte la propuesta.' : undefined;
  if ((t.match(/@/g) || []).length > 1) return 'Tu correo tiene más de una @. Revisa que el navegador no le haya agregado otro dominio.';
  if (/\s/.test(t)) return 'El correo no lleva espacios.';
  return correoValido(t) ? undefined : 'Revisa el correo, por ejemplo: nombre@empresa.com';
}
export const telefonoValido = (t) => t.replace(/\D/g, '').length >= 10;

// Campo con etiqueta, mensaje de error y atributos de accesibilidad
export function Campo({ id, label, error, ayuda, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <span id={`${id}-err`} className="field-error"><CircleAlert size={14} aria-hidden="true" /> {error}</span>
      ) : ayuda ? (
        <span className="field-help">{ayuda}</span>
      ) : null}
    </div>
  );
}

// Atributos aria para un campo con error (el id del mensaje es `${id}-err`)
export const ariaError = (id, error) => (error ? { 'aria-invalid': true, 'aria-describedby': `${id}-err` } : {});

export function SelectEstado({ id, value, onChange, error }) {
  return (
    <select id={id} className="select" value={value} onChange={onChange} autoComplete="address-level1" {...ariaError(id, error)}>
      <option value="">Selecciona…</option>
      <optgroup label="Cobertura directa">
        {ESTADOS_COBERTURA.map((e) => <option key={e} value={e}>{e}</option>)}
      </optgroup>
      <optgroup label="Resto del país">
        {ESTADOS_MX.filter((e) => !ESTADOS_COBERTURA.includes(e)).map((e) => <option key={e} value={e}>{e}</option>)}
      </optgroup>
    </select>
  );
}

// Coordenadas o enlace de Google Maps, con botón para tomar la ubicación del GPS
export function CampoCoordenadas({ id, value, onChange, error, ayuda, boton = 'Estoy en el lugar', label = 'Coordenadas o enlace de Google Maps' }) {
  const [ubicando, setUbicando] = useState(false);
  const [errorGps, setErrorGps] = useState('');
  const coords = value.trim() ? leerCoordenadas(value) : null;

  const usarUbicacion = () => {
    setErrorGps('');
    if (!navigator.geolocation) { setErrorGps('Tu navegador no permite obtener la ubicación.'); return; }
    setUbicando(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUbicando(false);
        onChange(fmtCoord({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
      },
      () => { setUbicando(false); setErrorGps('No pudimos obtener tu ubicación. Escribe las coordenadas o pega el enlace del mapa.'); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <Campo
      id={id}
      label={label}
      error={error || errorGps || undefined}
      ayuda={!coords && !esEnlace(value) ? ayuda : undefined}
    >
      <div className="ev-coords">
        <span className="ev-coords-icon"><MapPin size={18} aria-hidden="true" /></span>
        <input
          id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="19.4326, -99.1332 o https://maps.google.com/…" {...ariaError(id, error)}
        />
        <button type="button" className="btn btn-outline btn-sm" onClick={usarUbicacion} disabled={ubicando}>
          <LocateFixed size={15} /> {ubicando ? 'Ubicando…' : boton}
        </button>
      </div>
      {coords && (
        <span className={`ev-coords-ok${enMexico(coords) ? '' : ' is-warn'}`}>
          {enMexico(coords) ? <CircleCheck size={14} aria-hidden="true" /> : <CircleAlert size={14} aria-hidden="true" />}
          {enMexico(coords) ? `Ubicación detectada: ${fmtCoord(coords)}` : `Estas coordenadas (${fmtCoord(coords)}) quedan fuera de México; revísalas.`}
          {' '}
          <a className="link" href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`} target="_blank" rel="noopener noreferrer">
            Ver en mapa <ExternalLink size={12} />
          </a>
        </span>
      )}
      {!coords && esEnlace(value) && (
        <span className="ev-coords-ok"><CircleCheck size={14} aria-hidden="true" /> Enviaremos el enlace del mapa con tu solicitud.</span>
      )}
    </Campo>
  );
}
