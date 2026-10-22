import { Mic, Video, Store, Users, Building2, Music } from 'lucide-react';

// Tipos de evento del carrusel. "imagen" es opcional: { src, alt }.
// Si falta o el archivo aún no existe en /public, se muestra una ilustración de referencia con el "tono" del evento.
export const TIPOS_EVENTO = [
  {
    id: 'evento-congresos', imagen: { src: '/img/eventos/congresos.webp', alt: 'Plenaria de un congreso con asistentes conectados' }, icon: Building2, tono: '#3B82F6',
    titulo: 'Congresos y convenciones', badge: 'Alta densidad',
    texto: 'Cientos de asistentes conectados al mismo tiempo en plenarias y salones simultáneos, sin que se caiga el registro ni las presentaciones.',
    puntos: [
      'WiFi de alta densidad para plenarias y salones simultáneos',
      'Red dedicada para registro, gafetes y app del evento',
      'Ancho de banda reservado para ponentes y videoconferencias',
      'Nombre de red personalizado con la marca del evento',
    ],
    conecta: ['Registro', 'Ponentes', 'Asistentes', 'Prensa'],
  },
  {
    id: 'evento-expos', imagen: { src: '/img/eventos/expos.webp', alt: 'Pasillo de una expo comercial con stands' }, icon: Store, tono: '#F2A516',
    titulo: 'Expos y ferias comerciales', badge: 'Internet por stand',
    texto: 'Cada expositor con su conexión y terminales de cobro estables para que ninguna venta se pierda en el piso de exhibición.',
    puntos: [
      'Conexión cableada o WiFi por stand',
      'Red aislada para terminales de cobro y punto de venta',
      'Cobertura en piso de exhibición, salas y áreas de carga',
      'Altas de última hora durante el montaje',
    ],
    conecta: ['Expositores', 'Cobro', 'Registro', 'Visitantes'],
  },
  {
    id: 'evento-conciertos', imagen: { src: '/img/eventos/conciertos.webp', alt: 'Público en un festival de música frente al escenario' }, icon: Music, tono: '#A855F7',
    titulo: 'Conciertos y festivales', badge: 'Gran aforo',
    texto: 'Producción, accesos y boletaje conectados aun en explanadas y espacios abiertos sin infraestructura.',
    puntos: [
      'Enlaces por fibra o microondas en espacios abiertos',
      'Red para control de accesos y lectura de boletos',
      'Red privada para producción, backstage y staff',
      'Ingenieros en sitio de montaje a desmontaje',
    ],
    conecta: ['Accesos', 'Producción', 'Cobro', 'Prensa'],
  },
  {
    id: 'evento-streaming', imagen: { src: '/img/eventos/streaming.webp', alt: 'Cabina de producción de una transmisión en vivo' }, icon: Video, tono: '#EF4444',
    titulo: 'Transmisiones en vivo', badge: 'Streaming',
    texto: 'Ancho de banda dedicado y ruta de respaldo para que tu transmisión no se congele ni se corte al aire.',
    puntos: [
      'Subida simétrica dedicada solo a la transmisión',
      'Enlace de respaldo para evitar cortes al aire',
      'Conexión cableada directa a la mesa de producción',
      'Monitoreo del enlace durante toda la transmisión',
    ],
    conecta: ['Streaming', 'Videollamadas', 'Producción'],
  },
  {
    id: 'evento-corporativos', imagen: { src: '/img/eventos/corporativos.webp', alt: 'Foro corporativo con ponente y videoconferencia' }, icon: Mic, tono: '#14B8A6',
    titulo: 'Foros y eventos corporativos', badge: 'Ejecutivo',
    texto: 'Reuniones de consejo, lanzamientos y foros híbridos con la imagen impecable que tu empresa necesita.',
    puntos: [
      'WiFi seguro para directivos e invitados',
      'Videoconferencias híbridas sin congelamientos',
      'Redes separadas para staff, prensa e invitados',
      'Instalación discreta que no interfiere con el montaje',
    ],
    conecta: ['Directivos', 'Invitados', 'Prensa', 'Staff'],
  },
  {
    id: 'evento-sociales', imagen: { src: '/img/eventos/sociales.webp', alt: 'Salón de una boda con invitados' }, icon: Users, tono: '#EC4899',
    titulo: 'Eventos sociales', badge: 'Bodas · XV años · Galas',
    texto: 'Internet para invitados y proveedores en jardines, haciendas y salones, incluso donde no hay señal.',
    puntos: [
      'WiFi para invitados con nombre y contraseña personalizados',
      'Conexión para fotógrafos, DJ, video y proveedores',
      'Ideal para jardines y haciendas sin internet',
      'Montaje discreto acorde a la decoración',
    ],
    conecta: ['Invitados', 'Proveedores', 'Fotografía', 'Música'],
  },
];
