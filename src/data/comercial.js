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
    region: 'Ciudad de México (Red Propia)',
    id: 'cdmx',
    red: 'propia',
    zonas: ['Vallejo', 'Azcapotzalco', 'Polanco', 'Paseo de la Reforma', 'Insurgentes', 'Santa Fe', 'Cuauhtémoc', 'Benito Juárez', 'Álvaro Obregón', 'Iztapalapa', 'Coyoacán'],
  },
  {
    region: 'Estado de México (Red Propia)',
    id: 'edomex',
    red: 'propia',
    zonas: ['Tlalnepantla', 'Naucalpan', 'Atizapán', 'Cuautitlán Izcalli', 'Tultitlán', 'Ecatepec', 'Coacalco', 'Zumpango', 'Nopaltepec', 'Otumba (MAXVISION)', 'Axapusco (MAXVISION)', 'Lerma', 'Toluca Industrial'],
  },
  {
    region: 'Hidalgo (Red Propia)',
    id: 'hidalgo',
    red: 'propia',
    zonas: ['Tizayuca (incl. Fracc. Villa Magna)', 'Tolcayuca', 'Pachuca de Soto', 'Mineral de la Reforma', 'Zapotlán de Juárez'],
  },
  {
    region: 'Puebla (Red Propia)',
    id: 'puebla',
    red: 'propia',
    zonas: ['Puebla Capital', 'San Andrés Cholula', 'Parque Industrial FINSA', 'Cuautlancingo', 'Amozoc'],
  },
  {
    region: 'Morelos (Red Propia)',
    id: 'morelos',
    red: 'propia',
    zonas: ['Cuernavaca', 'Jiutepec', 'CIVAC Parque Industrial', 'Temixco', 'Emiliano Zapata'],
  },
  {
    region: 'Tlaxcala (Red Propia)',
    id: 'tlaxcala',
    red: 'propia',
    zonas: ['Tlaxcala Capital', 'Apizaco', 'Ciudad Industrial Xicohténcatl I, II y III', 'Huamantla', 'Chiautempan'],
  },
  {
    region: 'Querétaro (Red con Aliados)',
    id: 'queretaro',
    red: 'aliados',
    zonas: ['Querétaro Capital', 'El Marqués', 'Parque Industrial Bernardo Quintana', 'San Juan del Río', 'Corregidora'],
  },
  {
    region: 'Guanajuato (Red con Aliados)',
    id: 'guanajuato',
    red: 'aliados',
    zonas: ['León', 'Guanajuato Puerto Interior', 'Silao', 'Irapuato', 'Celaya'],
  },
  {
    region: 'Jalisco (Red con Aliados)',
    id: 'jalisco',
    red: 'aliados',
    zonas: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tlajomulco', 'Corredor Industrial El Salto'],
  },
  {
    region: 'Nuevo León (Red con Aliados)',
    id: 'nuevoleon',
    red: 'aliados',
    zonas: ['Monterrey', 'San Pedro Garza García', 'Apodaca', 'Guadalupe', 'Santa Catarina', 'San Nicolás'],
  },
  {
    region: 'Veracruz (Red con Aliados)',
    id: 'veracruz',
    red: 'aliados',
    zonas: ['Puerto de Veracruz', 'Boca del Río', 'Xalapa', 'Córdoba', 'Orizaba', 'Coatzacoalcos'],
  },
  {
    region: 'Tamaulipas (Red con Aliados)',
    id: 'tamaulipas',
    red: 'aliados',
    zonas: ['Tampico', 'Altamira Industrial', 'Reynosa', 'Nuevo Laredo', 'Matamoros', 'Ciudad Victoria'],
  },
  {
    region: 'Baja California y BCS (Fibra, Microondas & Satelital)',
    id: 'bajas',
    red: 'aliados',
    zonas: ['Tijuana', 'Mexicali', 'Ensenada', 'Tecate', 'La Paz (BCS)', 'Los Cabos (BCS)', 'San José del Cabo', 'Todos Santos'],
  },
  {
    region: 'Occidente y Bajío (Red con Aliados)',
    id: 'occidente-bajio',
    red: 'aliados',
    zonas: ['Aguascalientes Capital', 'Zacatecas Capital', 'Fresnillo', 'Morelia (Michoacán)', 'Lázaro Cárdenas', 'Tepic (Nayarit)', 'Bahía de Banderas', 'Colima Capital', 'Manzanillo (Puerto)'],
  },
  {
    region: 'Sureste: Península y Golfo (Red con Aliados)',
    id: 'sureste',
    red: 'aliados',
    zonas: ['Mérida', 'Cancún', 'Playa del Carmen', 'Riviera Maya', 'Chetumal', 'Campeche', 'Ciudad del Carmen', 'Villahermosa (Tabasco)', 'Tuxtla Gutiérrez (Chiapas)', 'Tapachula'],
  },
  {
    region: 'Norte y Pacífico (Red con Aliados)',
    id: 'norte-pacifico',
    red: 'aliados',
    zonas: ['Ciudad Juárez', 'Chihuahua Capital', 'Hermosillo', 'Guaymas', 'Culiacán', 'Mazatlán', 'Durango Capital', 'Saltillo', 'Torreón / La Laguna', 'San Luis Potosí'],
  },
  {
    region: 'Cobertura Nacional 100% (Enlaces Satelitales & LTE Industrial)',
    id: 'satelital-lte',
    red: 'aliados',
    zonas: ['Conectividad Satelital Empresarial en las 32 Entidades', 'Enlaces Móviles LTE / 4G / 5G para Zonas Rurales y Parques Aislados', 'Redundancia Backup Satelital Automático'],
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
