import { VARIANTES } from './data/variantes';

// Ancho con que se muestra cada tipo de imagen (medido en el sitio); con esto el navegador
// elige la versión más chica que se vea nítida en esa pantalla.
export const TAM = {
  // Fondos a todo lo ancho. En celular van al 35 % de opacidad, así que basta la versión chica.
  portada: '100vw',
  tarjeta: '(min-width: 1100px) 280px, (min-width: 640px) 46vw, 60vw',
  tarjetaXl: '(min-width: 1100px) 570px, (min-width: 640px) 94vw, 80vw',
  tarjetaAncha: '(min-width: 1100px) 640px, 420px',
  servicio: '(min-width: 640px) 300px, 80vw',
  contenido: '(min-width: 1100px) 620px, 94vw',
  mapa: '(min-width: 1100px) 730px, 90vw',
  equipo: '44px',
};

// Atributos src/srcSet/sizes para <img>. Las versiones chicas las genera
// scripts/imagenes-responsivas.py; si una imagen no tiene, se usa solo el original.
export function imgResp(src, tam) {
  const v = VARIANTES[src];
  if (!v) return { src };
  return { src, srcSet: v.map(([w, s]) => `${s} ${w}w`).join(', '), sizes: TAM[tam] };
}
