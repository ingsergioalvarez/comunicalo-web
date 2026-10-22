// Datos generales de contacto y enlaces. Edita aquí y se actualiza todo el sitio.

export const SITE_URL = 'https://comunicalo.mx';

export const EMPRESA = {
  nombre: 'Comunícalo de México',
  razonSocial: 'Comunícalo de México S.A. de C.V.',
  concesion: 'Título de Concesión Única otorgado por el Gobierno Federal (IFT)',
  // Oficina comercial (la que se muestra en el sitio y en el mapa)
  direccion: 'Circuito Poetas 7, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.',
  direccionCorta: 'Cd. Satélite, Naucalpan, Edo. de México',
  mapa: 'https://share.google/bKjvF8KcWP3Mi8B4o',
  // Domicilio fiscal: solo para documentos legales, no se muestra como oficina
  direccionFiscal: 'Convento de Churubusco #4, Col. Jardines de Santa Mónica, Tlalnepantla, Estado de México, C.P. 54050',
  horario: 'Lunes a viernes de 9:00 a 18:00 h',
  experiencia: 'Socios y directivos con más de 30 años en telecomunicaciones',
};

export const TELEFONOS = {
  empresas: { label: 'Empresas y Eventos', num: '55 2601 4888', href: 'tel:+525526014888' },
  empresas2: { label: 'Empresas y Eventos', num: '55 5239 4748', href: 'tel:+525552394748' },
  hogar: { label: 'Servicios residenciales', num: '55 2601 4010', href: 'tel:+525526014010' },
  // Líneas directas por área. La coma en href es una pausa: el teléfono marca la extensión u opción solo.
  ventasEmpresas: { label: 'Oficina', num: '55 2601 4888 ext. 354', href: 'tel:+525526014888,354' },
  ventasEmpresasCel: { label: 'Celular y WhatsApp', num: '55 2572 7241', href: 'tel:+525525727241' },
  noc: { label: 'Teléfono 24/7', num: '55 2601 4888 opción 1 › 1', href: 'tel:+525526014888,1,1' },
  facturacion: { label: 'Teléfono', num: '55 5239 4748 ext. 318', href: 'tel:+525552394748,318' },
  ventasHogar: { label: 'Teléfono', num: '55 2601 4010 opción 1', href: 'tel:+525526014010,1' },
  ventasHogarCel: { label: 'Celular y WhatsApp', num: '55 1802 0595', href: 'tel:+525518020595' },
  soporteHogar: { label: 'Teléfono', num: '55 2601 4010 opción 2', href: 'tel:+525526014010,2' },
  cobranzaHogar: { label: 'Teléfono', num: '55 2601 4010 opción 3', href: 'tel:+525526014010,3' },
  // Del diagrama oficial de contratación: aclaraciones, quejas y pagos
  atencion: { label: 'Atención y pagos', num: '55 5239 4748 ext. 320', href: 'tel:+525552394748,320' },
};

export const EMAIL_VENTAS = 'ventas@comunicalo.mx';

export const WHATSAPP_NUM = '525526014888';
// Bot de WhatsApp de Hogar (quejas, pagos, saldos y estados de cuenta): +52 1 55 7877 0441
export const WHATSAPP_BOT_HOGAR = '525578770441';

// A dónde llega cada solicitud según el área. Los formularios y botones de cotización
// toman de aquí el WhatsApp y el correo; lead.php usa la misma clave para el aviso por correo.
export const AREAS = {
  ventasEmpresas: { wa: '525525727241', email: 'comercialempresarial@comunicalo.mx' },
  noc: { wa: '525610685395', email: 'noc@comunicalo.mx' },
  facturacion: { email: 'facturacion@comunicalo.mx' },
  // Ventas Hogar no tiene correo propio: su "Envíala por correo" cae en ventas@ (valor por omisión de mailtoUrl)
  ventasHogar: { wa: '525518020595' },
  soporteHogar: { email: 'residencial@comunicalo.mx' },
  cobranzaHogar: { wa: WHATSAPP_BOT_HOGAR, email: 'residencial@comunicalo.mx' },
  quejasHogar: { wa: WHATSAPP_BOT_HOGAR, email: 'atc_clientes@comunicalo.mx' },
};

// Intereses del formulario general que atiende Ventas Hogar; el resto va a Ventas Empresas.
const INTERESES_HOGAR = ['hogar', 'maxvision'];
export function areaDeInteres(interes) {
  return INTERESES_HOGAR.includes(interes) ? 'ventasHogar' : 'ventasEmpresas';
}

export const LINKS = {
  pagos: 'https://comunicalodemexico.com.mx:10443/portal/login',
  speedtest: 'https://www.speedtest.net/',
  facebook: 'https://www.facebook.com/Comun%C3%ADcalo-de-M%C3%A9xico-834196273400398/',
  twitter: 'https://twitter.com/ComunicaloMx',
  maxvisionSitio: 'https://maxvision.tv',
  iftComparador: 'https://comparador.ift.org.mx/',
  profeco: 'https://www.gob.mx/profeco',
};

export function whatsappUrl(mensaje, num = WHATSAPP_NUM) {
  return `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
}

export function mailtoUrl(asunto, cuerpo, email = EMAIL_VENTAS) {
  return `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

// Guarda el lead en el servidor (MySQL + aviso por correo) en segundo plano.
// No se espera la respuesta para que el navegador no bloquee la ventana de WhatsApp.
export function registrarLead(datos) {
  try {
    fetch('/api/lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...datos, pagina: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* sin conexión o navegador antiguo: WhatsApp sigue funcionando */ }
}
