// Metadatos SEO por página. Se usan en el prerender y al navegar.
// "title" va en buscadores y al compartir; la pestaña del navegador siempre muestra TITULO_PESTANA.

export const TITULO_PESTANA = 'Comunícalo';

export const ROUTES = {
  '/': {
    title: 'Comunícalo de México | Internet empresarial, hogar y eventos',
    description: 'Internet dedicado por fibra óptica para empresas, internet y telefonía para el hogar desde $350, internet para eventos, telefonía IP, redes, CCTV y monitoreo C2. Concesionario federal en CDMX, Edomex e Hidalgo.',
  },
  '/empresas': {
    title: 'Internet dedicado y soluciones TI para empresas | Comunícalo',
    description: 'Internet dedicado simétrico con IP fija, enlaces LAN to LAN, VPN, microondas, telefonía IP, redes WiFi, cableado, ciberseguridad, data center, CCTV y monitoreo C2.',
  },
  '/hogar': {
    title: 'Internet y teléfono para tu casa desde $350 | Comunícalo',
    description: 'Planes de internet con línea telefónica para el hogar de 10 a 100 Mbps, paquetes con televisión de 70 canales y sin plazo forzoso. Tarifas registradas ante el IFT.',
  },
  '/eventos': {
    title: 'Internet para eventos, expos y congresos | Comunícalo',
    description: 'Internet temporal de alta capacidad y WiFi de alta densidad para congresos, ferias, conciertos y transmisiones en vivo, con ingenieros en sitio.',
  },
  '/maxvision': {
    title: 'MAXVISION TV | Televisión en streaming en todas tus pantallas',
    description: 'Canales en vivo, deportes, cine y series en tu Smart TV, Roku, Fire TV o celular. Contrátalo solo o en combo con internet Comunícalo.',
  },
  '/cobertura': {
    title: 'Cobertura de red en CDMX, Edomex e Hidalgo | Comunícalo',
    description: 'Consulta si tenemos cobertura de fibra óptica y microondas en tu zona de Ciudad de México, Estado de México e Hidalgo.',
  },
  '/cotizar': {
    title: 'Cotiza tu servicio en línea | Comunícalo',
    description: 'Arma tu cotización de internet dedicado, eventos, hogar, telefonía IP, redes o CCTV y recíbela por WhatsApp en minutos.',
  },
  '/transparencia': {
    title: 'Centro de transparencia IFT y PROFECO | Comunícalo',
    description: 'Tarifas registradas, Carta de derechos mínimos, contratos de adhesión PROFECO, código de prácticas comerciales, aviso de privacidad y título de concesión.',
  },
  '/contacto': {
    title: 'Contacto, soporte y pagos | Comunícalo',
    description: 'Teléfonos de ventas y soporte, WhatsApp, portal de pagos y oficinas en Cd. Satélite, Naucalpan, Estado de México.',
  },
};

export const NOT_FOUND = {
  title: 'Página no encontrada | Comunícalo',
  description: 'La página que buscas no existe.',
};

// Redirecciones de las URLs del sitio anterior (index.php?accion=... y *.html)
const LEGADO = {
  'Por-que-nosotros': '/',
  'Productos-y-Servicios': '/empresas',
  'Internet-Empresarial': '/empresas#internet-dedicado',
  'Internet-Eventos': '/eventos',
  'Telefonia-IP': '/empresas#telefonia-ip',
  'Telefonía-IP': '/empresas#telefonia-ip',
  'Servicios-LAN-to-LAN': '/empresas#lan-to-lan',
  'Servicios-VPN': '/empresas#vpn',
  'Redes-y-Wifi': '/empresas#redes-wifi',
  'Servidores-Data-Center': '/empresas#data-center',
  Contacto: '/contacto',
  'Atencion-clientes': '/contacto',
  Escalacion: '/contacto',
  EscalacionR: '/contacto',
  MCR: '/cobertura',
  Residencial: '/cobertura',
};

export function rutaLegada(pathname, search) {
  const accion = new URLSearchParams(search).get('accion');
  if (accion) return LEGADO[accion] || '/transparencia';
  const m = pathname.match(/([^/]+)\.html$/);
  if (m) return LEGADO[decodeURIComponent(m[1])] || '/';
  if (/^\/(OTE|TB)\/?$/i.test(pathname)) return '/transparencia';
  return null;
}
