// Tarifas oficiales y planes residenciales registrados ante el IFT (PDF en public/docs/tarifas).
// Todos son prepago: recarga mensual con vigencia de 30 días (salvo Plan Inteligente con plazo 12 meses).
import { doc } from './documentos';

// ==========================================
// 1. COMUNÍCALO - COBERTURA Y REGLAS HOGAR
// ==========================================
// Cobertura Comunícalo Hogar:
// - Hidalgo: Tizayuca y Tolcayuca.
// - Estado de México: Zumpango, Coacalco, Tlalnepantla y Nopaltepec.
// NOTA CRÍTICA DE NEGOCIO:
// La televisión en Comunícalo está disponible ÚNICAMENTE en el Fraccionamiento Villa Magna (Tizayuca, Hgo).
// En el resto de la red Comunícalo NO se comercializa televisión.

export const COBERTURA_COMUNICALO = {
  hidalgo: ['Tizayuca', 'Tolcayuca'],
  edomex: ['Zumpango', 'Coacalco', 'Tlalnepantla', 'Nopaltepec'],
  tvExclusiva: 'Fraccionamiento Villa Magna (Tizayuca, Hidalgo)',
};

// Plan de entrada: Solo Internet Fijo
export const PLAN_SOLO_INTERNET = {
  id: 'plan-inteligente',
  nombre: 'Plan Inteligente',
  marca: 'Comunícalo',
  servicio: 'Solo Internet fijo',
  bajada: 20,
  subida: 10,
  precio: 320,
  permanencia: 12,
  folio: '1244978',
  pdf: doc('tarifas/plan-inteligente.pdf'),
  ideal: 'Navegación estable, videollamadas, streaming HD y tareas sin línea telefónica',
  destacado: false,
};

// Planes PAQ D de Comunícalo (Telefonía + Internet)
export const PLANES_COMUNICALO_PAQD = [
  {
    id: 'paq-d-30',
    nombre: 'PAQ D-30',
    marca: 'Comunícalo',
    servicio: 'Internet + telefonía fija',
    bajada: 30,
    subida: 6,
    precio: 350,
    folio: '1457569',
    pdf: doc('tarifas/paq-d-30.pdf'),
    telefonia: '3,000 min fijos nac. + 3,000 min celular + 500 min EUA/Canadá',
    ideal: 'Home office, clases en línea y llamadas ilimitadas para el hogar',
    destacado: false,
  },
  {
    id: 'paq-d-50',
    nombre: 'PAQ D-50',
    marca: 'Comunícalo',
    servicio: 'Internet + telefonía fija',
    bajada: 50,
    subida: 10,
    precio: 500,
    folio: '1457585',
    pdf: doc('tarifas/paq-d-50.pdf'),
    telefonia: '3,000 min fijos nac. + 3,000 min celular + 500 min EUA/Canadá',
    ideal: 'Familias con múltiples dispositivos, streaming HD simultáneo',
    destacado: true,
    badge: 'Más popular',
  },
  {
    id: 'paq-d-100',
    nombre: 'PAQ D-100',
    marca: 'Comunícalo',
    servicio: 'Internet + telefonía fija',
    bajada: 100,
    subida: 20,
    precio: 800,
    folio: '1457597',
    pdf: doc('tarifas/paq-d-100.pdf'),
    telefonia: '3,000 min fijos nac. + 3,000 min celular + 500 min EUA/Canadá',
    ideal: 'Hogares hiperconectados, descargas pesadas y gaming sin lag',
    destacado: false,
  },
];

// Serie L de Comunícalo (Planes Registrados de Alta Capacidad)
export const PLANES_COMUNICALO_L = [
  {
    id: 'l-30',
    nombre: 'L-30',
    marca: 'Comunícalo',
    servicio: 'Telefonía + Internet',
    bajada: 30,
    subida: 6,
    precio: 400,
    folio: '1376655',
    pdf: doc('tarifas/l-30.pdf'),
    ideal: 'Conexión residencial robusta con línea fija',
  },
  {
    id: 'l-50',
    nombre: 'L-50',
    marca: 'Comunícalo',
    servicio: 'Telefonía + Internet',
    bajada: 50,
    subida: 10,
    precio: 600,
    folio: '1377627',
    pdf: doc('tarifas/l-50.pdf'),
    ideal: 'Trabajo remoto y alta transferencia de datos',
  },
  {
    id: 'l-100',
    nombre: 'L-100',
    marca: 'Comunícalo',
    servicio: 'Telefonía + Internet',
    bajada: 100,
    subida: 20,
    precio: 900,
    folio: '1377699',
    pdf: doc('tarifas/l-100.pdf'),
    ideal: 'Máxima tasa de transferencia y estabilidad total',
  },
];

export const INCLUIDO_COMUNICALO_HOGAR = [
  'Módem WiFi de alta potencia en comodato',
  'Línea telefónica fija con minutos incluidos',
  'Conexión sobre red propia de fibra óptica',
  'Soporte técnico local y atención rápida',
];

// ==========================================
// 2. MAXVISION - COBERTURA Y PLANES EXCLUSIVOS
// ==========================================
// Cobertura MAXVISION:
// - Estado de México: Otumba y Axapusco.
// NOTA: En MAXVISION la televisión está disponible en TODA la red.

export const COBERTURA_MAXVISION = {
  municipios: ['Otumba', 'Axapusco'],
  estado: 'Estado de México',
  tvEnTodaLaRed: true,
};

// Planes MaxiCom (Doble play de MAXVISION)
export const PLANES_MAXICOM = [
  {
    id: 'maxicom-10',
    nombre: 'MaxiCom 10',
    marca: 'MAXVISION',
    bajada: 10,
    subida: 3,
    precio: 350,
    instalacion: 700,
    folio: '1465559',
    pdf: doc('tarifas/maxicom-10.pdf'),
    ideal: 'Navegar, redes sociales y tareas básicas',
  },
  {
    id: 'maxicom-20',
    nombre: 'MaxiCom 20',
    marca: 'MAXVISION',
    bajada: 20,
    subida: 4,
    precio: 420,
    instalacion: 700,
    folio: '1465847',
    pdf: doc('tarifas/maxicom-20.pdf'),
    ideal: 'Familias y streaming en varias pantallas',
  },
  {
    id: 'maxicom-50',
    nombre: 'MaxiCom 50',
    marca: 'MAXVISION',
    bajada: 50,
    subida: 7,
    precio: 520,
    instalacion: 700,
    folio: '1465892',
    pdf: doc('tarifas/maxicom-50.pdf'),
    ideal: 'Home office y videollamadas fluidas',
    destacado: true,
    badge: 'Más vendido en Otumba y Axapusco',
  },
  {
    id: 'maxicom-100',
    nombre: 'MaxiCom 100',
    marca: 'MAXVISION',
    bajada: 100,
    subida: 10,
    precio: 600,
    instalacion: 700,
    folio: '1465933',
    pdf: doc('tarifas/maxicom-100.pdf'),
    ideal: 'Hogares hiperconectados, gaming y 4K',
  },
];

// Alias para compatibilidad con módulos existentes
export const PLANES_INTERNET_TELEFONIA = PLANES_MAXICOM;

// Planes TriPP de MAXVISION (Triple play con TV en Otumba y Axapusco)
export const PLANES_TRIPLE_PLAY = [
  { id: 'tripp-bas1', nombre: 'TriPP Básico 1', marca: 'MAXVISION', bajada: 10, subida: 3, canales: 70, precio: 600, instalacion: 700, folio: '1467715', pdf: doc('tarifas/maxicom-tripp-bas1.pdf') },
  { id: 'tripp-bas2', nombre: 'TriPP Básico 2', marca: 'MAXVISION', bajada: 20, subida: 5, canales: 70, precio: 670, instalacion: 700, folio: '1467718', pdf: doc('tarifas/maxicom-tripp-bas2.pdf') },
  { id: 'tripp-familiar', nombre: 'TriPP Familiar', marca: 'MAXVISION', bajada: 30, subida: 5, canales: 70, precio: 700, instalacion: 700, folio: '1467719', pdf: doc('tarifas/maxicom-tripp-familiar.pdf'), destacado: true, badge: 'Mejor valor' },
  { id: 'tripp-ejecutivo', nombre: 'TriPP Ejecutivo', marca: 'MAXVISION', bajada: 50, subida: 10, canales: 70, precio: 750, instalacion: 700, folio: '1467721', pdf: doc('tarifas/maxicom-tripp-ejecutivo.pdf') },
  { id: 'tripp-premium', nombre: 'TriPP Premium', marca: 'MAXVISION', bajada: 100, subida: 15, canales: 70, precio: 900, instalacion: 700, folio: '1467722', pdf: doc('tarifas/maxicom-tripp-premium.pdf') },
];

// Solo TV de MAXVISION
export const PLAN_TV = {
  id: 'maxicom-tv',
  nombre: 'MaxiCom TV',
  marca: 'MAXVISION',
  canales: 79,
  precio: 280,
  instalacion: 249,
  decodificador: 149,
  decodificadorAdicional: 280,
  folio: '1027843',
  pdf: doc('tarifas/maxicom-tv.pdf'),
};

// Tarifas adicionales registradas ante el IFT
export const OTRAS_TARIFAS = [
  { nombre: 'PAQ D-30', bajada: 30, subida: 6, precio: 350, folio: '1457569', pdf: doc('tarifas/paq-d-30.pdf') },
  { nombre: 'PAQ D-50', bajada: 50, subida: 10, precio: 500, folio: '1457585', pdf: doc('tarifas/paq-d-50.pdf') },
  { nombre: 'PAQ D-100', bajada: 100, subida: 20, precio: 800, folio: '1457597', pdf: doc('tarifas/paq-d-100.pdf') },
  { nombre: 'L-30', bajada: 30, subida: 6, precio: 400, folio: '1376655', pdf: doc('tarifas/l-30.pdf') },
  { nombre: 'L-50', bajada: 50, subida: 10, precio: 600, folio: '1377627', pdf: doc('tarifas/l-50.pdf') },
  { nombre: 'L-100', bajada: 100, subida: 20, precio: 900, folio: '1377699', pdf: doc('tarifas/l-100.pdf') },
];

export const INCLUIDO_HOGAR = [
  'Línea telefónica fija con minutos incluidos',
  'Módem WiFi en comodato',
  'Sin plazo forzoso',
  'Soporte técnico local',
];

// Barra de canales de televisión restringida (exclusiva Villa Magna en Comunícalo, y en toda la red para MAXVISION)
export const BARRA_CANALES = {
  'Abiertos y nacionales': ['Azteca 1', 'Las Estrellas', 'Imagen TV', 'Foro TV', 'Canal 5', 'Azteca 7', 'A+', 'Galavisión', 'La Octava', 'Canal 11', 'Once Niños', 'Canal 22', 'Mexiquense TV', 'ADN 40', 'Multimedios TV', 'TV UNAM', 'Canal del Congreso'],
  'Cine y series': ['TNT', 'TNT Series', 'TCM', 'Paramount Channel', 'Space', 'Golden', 'Edge', 'Platino', 'De Película', 'Cine Mexicano', 'TBS', 'Distrito Comedia', 'Comedy Central', 'TL Novelas', 'Pánico'],
  'Deportes': ['ESPN', 'ESPN 2', 'TUDN', 'TVC Deportes'],
  'Infantiles': ['Disney Channel', 'Disney Junior', 'Nickelodeon', 'Nick Jr.', 'Cartoon Network', 'Cartoonito'],
  'Noticias': ['Milenio TV', 'Excélsior TV', 'Telefórmula', 'Foro TV', 'ADN 40'],
  'Música y estilo de vida': ['Banda Max', 'Telehit', 'Telehit Música', 'MTV', 'MTV 00s', 'Beat Box', 'Glitz', 'Travel & Living', 'Discovery Home & Health', 'Investigation Discovery', 'Unicable', 'TVC'],
};

export const formatoPrecio = (n) => `$${Number(n).toLocaleString('es-MX')}`;
