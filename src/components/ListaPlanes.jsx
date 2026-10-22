import React from 'react';
import { PlanCard } from './ui';
import Coverflow from './Coverflow';
import useEsMovil from './useEsMovil';

// Con pocos paquetes se muestran en cuadrícula; si la oferta crece, pasan a carrusel.
// En celular siempre es carrusel para no apilar tarjetas largas.
const MAX_PLANES_EN_REJILLA = 4;

// planes: arreglo ya listo para PlanCard (con destacado/badge resueltos)
// mx:     colores MAXVISION en flechas y puntos del carrusel
// onElegir: si se indica, "Me interesa" llama a onElegir(plan) en lugar de abrir WhatsApp
export default function ListaPlanes({ planes, tv, precioOculto, mx, onElegir, etiqueta = 'Paquetes disponibles' }) {
  const esMovil = useEsMovil();

  if (planes.length > MAX_PLANES_EN_REJILLA || (esMovil && planes.length > 1)) {
    // El carrusel arranca en el paquete destacado para que quede al centro
    const inicial = Math.max(0, planes.findIndex((p) => p.destacado));
    return (
      <Coverflow
        items={planes.map((p) => ({ ...p, titulo: `${p.nombre} · ${p.bajada} Megas` }))}
        etiqueta={etiqueta}
        inicial={inicial}
        className={`plans-carousel${mx ? ' is-mx' : ''}`}
        slideClassName="plan-slide"
        renderSlide={(p) => <PlanCard plan={p} tv={tv} precioOculto={precioOculto} onElegir={onElegir} />}
      />
    );
  }
  return (
    <div className={`plans ${planes.length === 4 ? 'plans-4' : 'plans-3'}`}>
      {planes.map((p) => <PlanCard key={p.id} plan={p} tv={tv} precioOculto={precioOculto} onElegir={onElegir} />)}
    </div>
  );
}
