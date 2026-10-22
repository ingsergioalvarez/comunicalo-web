// Cobertura por estado. Para mover un estado de nivel, cambia su "nivel" aquí.
// Las imágenes de cada nivel viven en /public/img/cobertura/ y comparten encuadre con base.webp.

export const NIVELES = {
  propia: {
    nombre: 'Red propia',
    color: '#10B981',
    img: '/img/cobertura/propia.webp',
    tecnologia: 'Fibra óptica + microondas',
    texto: 'Infraestructura operada directamente por Comunícalo.',
  },
  extendida: {
    nombre: 'Cobertura extendida',
    color: '#F2A516',
    img: '/img/cobertura/extendida.webp',
    tecnologia: 'Fibra óptica / microondas',
    texto: 'Enlaces de fibra y microondas a través de nuestra cobertura extendida.',
  },
  interconexion: {
    nombre: 'Interconexión con carriers',
    color: '#E2ECF8',
    img: '/img/cobertura/interconexion.webp',
    tecnologia: 'Según el carrier disponible en la zona',
    texto: 'Validamos tu enlace mediante nuestras interconexiones con carriers.',
  },
};

// Capa nacional: no es un nivel de estado, cubre los 32
export const CAPA_LTE = {
  nombre: 'LTE y satelital',
  color: '#38BDF8',
  img: '/img/cobertura/lte-satelital.webp',
  tecnologia: 'LTE y enlace satelital',
  texto: 'Cobertura en los 32 estados mediante LTE y satelital, también como respaldo automático.',
};

export const MAPA_BASE = '/img/cobertura/base.webp';

export const ESTADOS = [
  { nombre: 'Aguascalientes', nivel: 'extendida' },
  { nombre: 'Baja California', nivel: 'extendida' },
  { nombre: 'Baja California Sur', nivel: 'interconexion' },
  { nombre: 'Campeche', nivel: 'extendida' },
  { nombre: 'Chiapas', nivel: 'extendida' },
  { nombre: 'Chihuahua', nivel: 'extendida' },
  { nombre: 'Ciudad de México', nivel: 'propia' },
  { nombre: 'Coahuila', nivel: 'extendida', ciudades: ['Torreón', 'Saltillo', 'Piedras Negras'] },
  { nombre: 'Colima', nivel: 'interconexion' },
  { nombre: 'Durango', nivel: 'extendida' },
  { nombre: 'Estado de México', nivel: 'propia' },
  { nombre: 'Guanajuato', nivel: 'extendida' },
  { nombre: 'Guerrero', nivel: 'interconexion' },
  { nombre: 'Hidalgo', nivel: 'propia' },
  { nombre: 'Jalisco', nivel: 'extendida', ciudades: ['Guadalajara'] },
  { nombre: 'Michoacán', nivel: 'interconexion' },
  { nombre: 'Morelos', nivel: 'propia' },
  { nombre: 'Nayarit', nivel: 'interconexion' },
  { nombre: 'Nuevo León', nivel: 'extendida' },
  { nombre: 'Oaxaca', nivel: 'interconexion' },
  { nombre: 'Puebla', nivel: 'propia' },
  { nombre: 'Querétaro', nivel: 'extendida' },
  { nombre: 'Quintana Roo', nivel: 'extendida' },
  { nombre: 'San Luis Potosí', nivel: 'extendida' },
  { nombre: 'Sinaloa', nivel: 'extendida' },
  { nombre: 'Sonora', nivel: 'extendida', ciudades: ['San Luis Río Colorado', 'Hermosillo', 'Nogales'] },
  { nombre: 'Tabasco', nivel: 'interconexion' },
  { nombre: 'Tamaulipas', nivel: 'extendida' },
  { nombre: 'Tlaxcala', nivel: 'propia' },
  { nombre: 'Veracruz', nivel: 'extendida' },
  { nombre: 'Yucatán', nivel: 'extendida', ciudades: ['Mérida'] },
  { nombre: 'Zacatecas', nivel: 'extendida' },
];
