// Contenido comercial editable: promociones, cobertura, preguntas frecuentes.

// Promociones de la franja superior. Pon "activo: false" para ocultar una.
export const PROMOCIONES = [
  {
    id: 'hogar-50',
    activo: true,
    texto: 'Internet + teléfono en casa desde $350 al mes, sin plazo forzoso',
    cta: 'Ver planes',
    to: '/hogar',
  },
  {
    id: 'empresas',
    activo: true,
    texto: 'Internet dedicado simétrico para tu empresa con IP fija y soporte 365 días',
    cta: 'Cotizar',
    to: '/cotizar?servicio=internet-dedicado',
  },
  {
    id: 'eventos',
    activo: true,
    texto: '¿Tienes un evento? Internet de alta capacidad con ingenieros en sitio',
    cta: 'Reservar fecha',
    to: '/eventos',
  },
];

export const COBERTURA = [
  {
    region: 'Ciudad de México',
    id: 'cdmx',
    zonas: ['Vallejo', 'Azcapotzalco', 'Polanco', 'Paseo de la Reforma', 'Insurgentes', 'Santa Fe', 'Cuauhtémoc', 'Benito Juárez', 'Álvaro Obregón', 'Iztapalapa', 'Coyoacán'],
  },
  {
    region: 'Estado de México',
    id: 'edomex',
    zonas: ['Tlalnepantla', 'Naucalpan', 'Atizapán', 'Cuautitlán Izcalli', 'Tultitlán', 'Ecatepec', 'Coacalco', 'Zumpango', 'Nopaltepec', 'Otumba (MAXVISION)', 'Axapusco (MAXVISION)', 'Lerma', 'Toluca Industrial'],
  },
  {
    region: 'Hidalgo',
    id: 'hidalgo',
    zonas: ['Tizayuca (incl. Fracc. Villa Magna)', 'Tolcayuca', 'Pachuca de Soto', 'Mineral de la Reforma', 'Zapotlán de Juárez'],
  },
  {
    region: 'Querétaro',
    id: 'queretaro',
    zonas: ['Querétaro Capital', 'El Marqués', 'Parque Industrial Bernardo Quintana', 'San Juan del Río', 'Corregidora'],
  },
  {
    region: 'Guanajuato',
    id: 'guanajuato',
    zonas: ['León', 'Guanajuato Puerto Interior', 'Silao', 'Irapuato', 'Celaya'],
  },
  {
    region: 'Puebla',
    id: 'puebla',
    zonas: ['Puebla Capital', 'San Andrés Cholula', 'Parque Industrial FINSA', 'Cuautlancingo'],
  },
  {
    region: 'Veracruz',
    id: 'veracruz',
    zonas: ['Puerto de Veracruz', 'Boca del Río', 'Xalapa', 'Córdoba', 'Orizaba', 'Coatzacoalcos'],
  },
  {
    region: 'Nuevo León',
    id: 'nuevoleon',
    zonas: ['Monterrey', 'San Pedro Garza García', 'Apodaca', 'Guadalupe', 'Santa Catarina', 'San Nicolás'],
  },
  {
    region: 'Jalisco',
    id: 'jalisco',
    zonas: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tlajomulco', 'Corredor Industrial El Salto'],
  },
  {
    region: 'Tamaulipas',
    id: 'tamaulipas',
    zonas: ['Tampico', 'Altamira Industrial', 'Reynosa', 'Nuevo Laredo', 'Matamoros'],
  },
  {
    region: 'Sureste (Yucatán y Quintana Roo)',
    id: 'sureste',
    zonas: ['Mérida', 'Cancún', 'Playa del Carmen', 'Riviera Maya', 'Chetumal', 'Campeche'],
  },
  {
    region: 'Salida Internacional NAP',
    id: 'internacional',
    zonas: ['Miami (NAP de las Américas - Interconexión Tier-1)', 'Dallas (Peering Internacional)'],
  },
];

export const PASOS_CONTRATACION = [
  { titulo: 'Factibilidad', texto: 'Validamos cobertura en tu domicilio o empresa; si hace falta, con una visita técnica.' },
  { titulo: 'Contrato', texto: 'Firmas con tu identificación y comprobante de domicilio (o acta constitutiva si eres empresa).' },
  { titulo: 'Instalación', texto: 'Programamos la instalación en un plazo de 5 a 10 días hábiles.' },
  { titulo: '¡Conectado!', texto: 'Te entregamos el servicio y el equipo en comodato funcionando.' },
];

export const FAQ_GENERAL = [
  {
    p: '¿Comunícalo es un proveedor autorizado?',
    r: 'Sí. Somos concesionarios con Título de Concesión Única otorgado por el Gobierno Federal para instalar, operar y explotar una red pública de telecomunicaciones. Puedes consultarlo en el Centro de transparencia.',
  },
  {
    p: '¿Los planes de hogar tienen plazo forzoso?',
    r: 'Los planes MaxiCom y TriPP no tienen plazo mínimo de permanencia: son de recarga mensual con vigencia de 30 días. El Plan Inteligente tiene permanencia de 12 meses.',
  },
  {
    p: '¿Cuánto tarda la instalación?',
    r: 'Una vez confirmada la factibilidad y firmado el contrato, la instalación se programa en 5 a 10 días hábiles. Para eventos trabajamos con la fecha de tu montaje.',
  },
  {
    p: '¿Qué diferencia hay entre internet dedicado e internet de hogar?',
    r: 'El internet dedicado empresarial es simétrico (misma velocidad de subida y bajada), no se comparte con otros clientes e incluye IP fija. Los planes de hogar están optimizados para descarga y tienen un precio más accesible.',
  },
  {
    p: '¿Cómo pago mi servicio?',
    r: 'Si tienes un plan de Hogar, paga desde el Portal de pagos en línea o llamando al 55 5239 4748 ext. 320.',
  },
  {
    p: '¿Qué hago si tengo una falla?',
    r: 'Llama a soporte o escríbenos por WhatsApp. Si la falla es atribuible a nosotros aplican las bonificaciones de la tabla publicada en el Centro de transparencia.',
  },
];
