// Tarifas oficiales y planes residenciales registrados ante el IFT (PDF en public/docs/tarifas).
// Todos son prepago: recarga mensual con vigencia de 30 días (salvo Plan Inteligente con plazo 12 meses).
import { doc } from './documentos';

// ==========================================
// 1. COMUNÍCALO - TARIFAS HOGAR POR MUNICIPIO
// ==========================================
// Fuente: Tarifas.xlsx (raíz del proyecto). Cada serie aplica en municipios específicos.
// La TV de Comunícalo solo se ofrece en Fracc. Villa Magna (Tizayuca) y en Nopaltepec.

export const COBERTURA_COMUNICALO = {
  hidalgo: ['Tizayuca', 'Tolcayuca'],
  edomex: ['Tecámac', 'Zumpango', 'Coacalco', 'Tlalnepantla', 'Nopaltepec'],
};

// Plan de entrada: aplica en cualquier municipio
export const PLAN_SOLO_INTERNET = {
  id: 'plan-inteligente',
  nombre: 'Plan Inteligente',
  marca: 'Comunícalo',
  servicio: 'Internet + telefonía fija',
  bajada: 10,
  precio: 320,
  permanencia: 12,
  folio: '1244978',
  pdf: doc('tarifas/plan-inteligente.pdf'),
  telefonia: 'Línea telefónica fija incluida',
  ideal: 'Navegación, redes sociales y videollamadas al mejor precio',
};

const IDEAL = {
  30: 'Home office, clases en línea y llamadas para el hogar',
  50: 'Familias con múltiples dispositivos, streaming HD simultáneo',
  100: 'Hogares hiperconectados, descargas pesadas y gaming sin lag',
  200: 'Máxima capacidad para casas con muchos usuarios y 4K',
};
const MINUTOS = '3,000 min fijos nac. + 3,000 min celular + 500 min EUA/Canadá';
const TELEFONIA = 'Línea telefónica fija incluida';

const plan = (id, nombre, bajada, precio, folio, extra = {}) => ({
  id, nombre, bajada, precio, folio: String(folio),
  marca: 'Comunícalo',
  servicio: 'Internet + telefonía fija',
  telefonia: TELEFONIA,
  ideal: IDEAL[bajada],
  ...extra,
});

// Paquete con TV: mismo plan de internet + TV para 1, 2 o 3 televisores.
const planTv = (base, tvs, nombre, precio, folio) =>
  plan(`${base.id}-tv${tvs}`, nombre, base.bajada, precio, folio, {
    servicio: 'TV + internet + telefonía fija',
    tvs,
    canales: base.canales,
    pdf: base.pdfTv,
  });

// PAQ D — Tizayuca y Tecámac
export const PLANES_COMUNICALO_PAQD = [
  plan('paq-d-30', 'PAQ D-30', 30, 350, 1457569, { subida: 6, pdf: doc('tarifas/paq-d-30.pdf'), telefonia: MINUTOS }),
  plan('paq-d-50', 'PAQ D-50', 50, 500, 1457585, { subida: 10, pdf: doc('tarifas/paq-d-50.pdf'), telefonia: MINUTOS }),
  plan('paq-d-100', 'PAQ D-100', 100, 800, 1457597, { subida: 20, pdf: doc('tarifas/paq-d-100.pdf'), telefonia: MINUTOS }),
];

// Serie L — Tolcayuca y Zumpango
export const PLANES_COMUNICALO_L = [
  plan('l-30', 'L-30', 30, 400, 1376655, { subida: 6, pdf: doc('tarifas/l-30.pdf'), telefonia: MINUTOS }),
  plan('l-50', 'L-50', 50, 600, 1377627, { subida: 10, pdf: doc('tarifas/l-50.pdf'), telefonia: MINUTOS }),
  plan('l-100', 'L-100', 100, 900, 1377699, { subida: 20, pdf: doc('tarifas/l-100.pdf'), telefonia: MINUTOS }),
];

// Serie MET — Coacalco y Tlalnepantla
export const PLANES_COMUNICALO_MET = [
  plan('met-50', 'MET-50', 50, 400, 1559462),
  plan('met-100', 'MET-100', 100, 600, 1559464),
  plan('met-200', 'MET-200', 200, 900, 1559490),
];

// Nopaltepec — internet + telefonía
export const PLANES_COMUNICALO_NOPALTEPEC = [
  plan('agil-30', 'ÁGIL-30', 30, 350, 2231816),
  plan('potente-50', 'POTENTE-50', 50, 500, 2231817),
  plan('dinamico-100', 'DINÁMICO-100', 100, 800, 2231811),
];

// TV D — Fracc. Villa Magna (Tizayuca), 79 canales. Mismo folio para 1, 2 y 3 TVs.
const [D30, D50, D100] = PLANES_COMUNICALO_PAQD.map((p) => ({ ...p, canales: 79 }));
export const PLANES_COMUNICALO_TV_D = [
  planTv(D30, 1, 'TV D-30', 450, 1373228), planTv(D30, 2, 'TV D-30 2 TV', 480, 1373228), planTv(D30, 3, 'TV D-30 3 TV', 500, 1373228),
  planTv(D50, 1, 'TV D-50', 600, 1375076), planTv(D50, 2, 'TV D-50 2 TV', 630, 1375076), planTv(D50, 3, 'TV D-50 3 TV', 650, 1375076),
  planTv(D100, 1, 'TV D-100', 900, 1375136), planTv(D100, 2, 'TV D-100 2 TV', 920, 1375136), planTv(D100, 3, 'TV D-100 3 TV', 950, 1375136),
];

// TV Nopaltepec
const [AG, PO, DI] = PLANES_COMUNICALO_NOPALTEPEC;
export const PLANES_COMUNICALO_TV_NOPALTEPEC = [
  planTv(AG, 1, 'ÁGIL 30 TV1', 400, 2232431), planTv(AG, 2, 'ÁGIL 30 TV2', 450, 2232432), planTv(AG, 3, 'ÁGIL 30 TV3', 500, 2232441),
  planTv(PO, 1, 'POTENTE 50 TV1', 550, 2232447), planTv(PO, 2, 'POTENTE 50 TV2', 600, 2232450), planTv(PO, 3, 'POTENTE 50 TV3', 650, 2232457),
  planTv(DI, 1, 'DINÁMICO 100 TV1', 850, 2232463), planTv(DI, 2, 'DINÁMICO 100 TV2', 900, 2232468), planTv(DI, 3, 'DINÁMICO 100 TV3', 950, 2232471),
];

// Opciones del selector "¿Dónde vives?" en /hogar. Tizayuca se divide porque la TV solo llega a Villa Magna.
export const ZONAS_HOGAR = [
  { id: 'tizayuca-villa-magna', nombre: 'Tizayuca — Fracc. Villa Magna', estado: 'Hidalgo', planes: PLANES_COMUNICALO_PAQD, planesTv: PLANES_COMUNICALO_TV_D },
  { id: 'tizayuca', nombre: 'Tizayuca — otras colonias', estado: 'Hidalgo', planes: PLANES_COMUNICALO_PAQD },
  { id: 'tolcayuca', nombre: 'Tolcayuca', estado: 'Hidalgo', planes: PLANES_COMUNICALO_L },
  { id: 'tecamac', nombre: 'Tecámac', estado: 'Estado de México', planes: PLANES_COMUNICALO_PAQD },
  { id: 'zumpango', nombre: 'Zumpango', estado: 'Estado de México', planes: PLANES_COMUNICALO_L },
  { id: 'coacalco', nombre: 'Coacalco de Berriozábal', estado: 'Estado de México', planes: PLANES_COMUNICALO_MET },
  { id: 'tlalnepantla', nombre: 'Tlalnepantla de Baz', estado: 'Estado de México', planes: PLANES_COMUNICALO_MET },
  { id: 'nopaltepec', nombre: 'Nopaltepec', estado: 'Estado de México', planes: PLANES_COMUNICALO_NOPALTEPEC, planesTv: PLANES_COMUNICALO_TV_NOPALTEPEC },
];

// Planes que se dibujan difuminados antes de elegir zona (los más vendidos).
export const PLANES_HOGAR_DEFAULT = PLANES_COMUNICALO_PAQD;

// Todas las tarifas Comunícalo Hogar (Centro de transparencia)
export const TARIFAS_COMUNICALO_HOGAR = [
  PLAN_SOLO_INTERNET,
  ...PLANES_COMUNICALO_PAQD,
  ...PLANES_COMUNICALO_L,
  ...PLANES_COMUNICALO_MET,
  ...PLANES_COMUNICALO_NOPALTEPEC,
  ...PLANES_COMUNICALO_TV_D,
  ...PLANES_COMUNICALO_TV_NOPALTEPEC,
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
