// Carrusel de la sección "Clientes Hogar" (página Hogar).
// Las dos primeras tarjetas invitan a usar el chatbot de WhatsApp. Para publicar un
// comunicado importante agrégalo a COMUNICADOS; se inserta al inicio del carrusel.
//
// Campos de cada tarjeta:
//   id        identificador único
//   etiqueta  texto corto arriba del título (p. ej. 'Aviso importante')
//   titulo    encabezado
//   texto     descripción breve (1 o 2 renglones)
//   imagen    ruta en /public, sin texto en la imagen (1600 × 900 recomendado)
//   cta       { label, wa }   → abre el chatbot con ese mensaje
//             { label, href } → enlace externo
//   puntos    (opcional) lista corta de lo que puede hacer el cliente

export const COMUNICADOS = [
  // {
  //   id: 'mantenimiento-noviembre',
  //   etiqueta: 'Aviso importante',
  //   titulo: 'Mantenimiento programado en Tizayuca',
  //   texto: 'El 15 de noviembre de 2:00 a 5:00 h podrías notar intermitencias en tu servicio.',
  //   imagen: '/img/hogar/comunicado-mantenimiento.webp',
  // },
];

export const SLIDES_CHATBOT = [
  {
    id: 'chatbot-atencion',
    etiqueta: 'Chatbot Comunícalo · 24/7',
    titulo: 'Resuelve sin esperar en línea',
    texto: 'Escríbele a nuestro asistente por WhatsApp a cualquier hora.',
    imagen: '/img/hogar/chatbot-atencion.webp',
    puntos: ['Levanta aclaraciones', 'Registra quejas', 'Da seguimiento a tu folio'],
    cta: { label: 'Abrir chatbot', wa: 'Hola, quiero levantar una aclaración o queja.' },
  },
  {
    id: 'chatbot-cuenta',
    etiqueta: 'Chatbot Comunícalo · 24/7',
    titulo: 'Tu cuenta en un mensaje',
    texto: 'Paga tu servicio y consulta tu información sin salir de WhatsApp.',
    imagen: '/img/hogar/chatbot-cuenta.webp',
    puntos: ['Paga tu servicio', 'Conoce tu saldo', 'Recibe tu estado de cuenta'],
    cta: { label: 'Consultar mi cuenta', wa: 'Hola, quiero consultar mi saldo y estado de cuenta.' },
  },
];
