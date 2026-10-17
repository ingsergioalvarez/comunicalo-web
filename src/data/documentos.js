// Índice único de adjuntos (PDF y audios). Los archivos NO van en git: viven en
// public/docs/ (o en el servidor/CDN que indique VITE_DOCS_URL) y se suben aparte.
// Para agregar uno: copia el archivo a public/docs/ y regístralo aquí o con doc().
// "npm run docs:check" avisa si falta algún archivo o si sobra alguno sin usar.

export const DOCS_BASE = (import.meta.env.VITE_DOCS_URL || '/docs').replace(/\/$/, '');

/** URL pública de un adjunto, a partir de su ruta dentro de public/docs. */
export const doc = (ruta) => `${DOCS_BASE}/${ruta}`;

// Documentos regulatorios (IFT / PROFECO), recuperados del sitio anterior.
// "audio" es la versión audible accesible.

export const GRUPOS_DOCUMENTOS = [
  {
    grupo: 'Derechos del usuario',
    documentos: [
      { titulo: 'Carta de derechos mínimos de los usuarios', pdf: doc('carta-derechos-minimos.pdf'), audio: doc('audio/carta-derechos.mp3') },
      { titulo: 'Carta de derechos mínimos (versión DOF completa)', pdf: doc('carta-derechos-minimos-dof.pdf') },
      { titulo: 'Código de prácticas comerciales', pdf: doc('codigo-practicas-comerciales.pdf'), audio: doc('audio/codigo-practicas.mp3') },
      { titulo: 'Lineamientos de información transparente', pdf: doc('lineamientos-informacion-transparente.pdf') },
    ],
  },
  {
    grupo: 'Contratos de adhesión PROFECO',
    documentos: [
      { titulo: 'Contrato de adhesión 009-2024 (internet, telefonía y TV)', pdf: doc('contrato-adhesion-profeco-009-2024.pdf'), audio: doc('audio/contrato-adhesion.mp3') },
      { titulo: 'Contrato de servicio de internet', pdf: doc('contrato-profeco-internet.pdf') },
      { titulo: 'Contrato de servicio de telefonía', pdf: doc('contrato-profeco-telefonia.pdf'), audio: doc('audio/contrato-telefonia.mp3') },
      { titulo: 'Proceso de contratación', pdf: doc('proceso-contratacion.pdf') },
    ],
  },
  {
    grupo: 'Servicio y calidad',
    documentos: [
      { titulo: 'Políticas de gestión de tráfico y administración de red', pdf: doc('politicas-gestion-trafico-red.pdf') },
      { titulo: 'Tabla de bonificaciones por falla', pdf: doc('tabla-bonificaciones-por-falla.pdf') },
      { titulo: 'Tabla de escalación (clientes residenciales)', pdf: doc('tabla-escalacion-residencial.pdf') },
      { titulo: 'Formato de orden de trabajo empresarial', pdf: doc('formato-orden-trabajo-empresarial.pdf') },
      { titulo: 'Barra de canales (Tizayuca)', pdf: doc('barra-canales-tizayuca.pdf') },
    ],
  },
  {
    grupo: 'Legal y privacidad',
    documentos: [
      { titulo: 'Título de Concesión Única (IFT)', pdf: doc('titulo-concesion-unica-ift.pdf') },
      { titulo: 'Aviso de privacidad', pdf: doc('aviso-de-privacidad.pdf'), audio: doc('audio/aviso-privacidad.mp3') },
      { titulo: 'Colaboración con la justicia', pdf: doc('colaboracion-con-la-justicia.pdf'), audio: doc('audio/colaboracion-justicia.mp3') },
    ],
  },
];
