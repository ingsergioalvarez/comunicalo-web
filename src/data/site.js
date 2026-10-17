// Datos generales de contacto y enlaces. Edita aquí y se actualiza todo el sitio.

export const SITE_URL = 'https://comunicalo.mx';

export const EMPRESA = {
  nombre: 'Comunícalo de México',
  razonSocial: 'Comunícalo de México S.A. de C.V.',
  concesion: 'Título de Concesión Única otorgado por el Gobierno Federal (IFT)',
  direccion: 'Convento de Churubusco #4, Col. Jardines de Santa Mónica, Tlalnepantla, Estado de México, C.P. 54050',
  direccionCorta: 'Tlalnepantla, Edo. de México',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Convento+de+Churubusco+4+Jardines+de+Santa+Monica+Tlalnepantla',
  horario: 'Lunes a viernes de 9:00 a 18:00 h',
  experiencia: 'Socios y directivos con más de 30 años en telecomunicaciones',
};

export const TELEFONOS = {
  empresas: { label: 'Empresas', num: '55 2601 4888', href: 'tel:+525526014888' },
  empresas2: { label: 'Empresas', num: '55 5239 4748', href: 'tel:+525552394748' },
  hogar: { label: 'Hogar', num: '55 2601 4010', href: 'tel:+525526014010' },
  // Del diagrama oficial de contratación: aclaraciones, quejas y pagos
  atencion: { label: 'Atención y pagos', num: '55 5239 4748 ext. 320', href: 'tel:+525552394748,320' },
};

export const EMAIL_VENTAS = 'ventas@comunicalo.mx';

export const WHATSAPP_NUM = '525526014888';

export const LINKS = {
  pagos: 'https://comunicalodemexico.com.mx:10443/portal/login',
  speedtest: 'https://www.speedtest.net/',
  facebook: 'https://www.facebook.com/Comun%C3%ADcalo-de-M%C3%A9xico-834196273400398/',
  twitter: 'https://twitter.com/ComunicaloMx',
  maxvisionSitio: 'https://maxvision.tv',
  iftComparador: 'https://comparador.ift.org.mx/',
  profeco: 'https://www.gob.mx/profeco',
};

export function whatsappUrl(mensaje) {
  return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;
}

export function mailtoUrl(asunto, cuerpo) {
  return `mailto:${EMAIL_VENTAS}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
