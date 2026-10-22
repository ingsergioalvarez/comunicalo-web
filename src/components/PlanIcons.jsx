import React from 'react';

// Íconos propios de los paquetes (trazo fino, esquinas redondeadas).
// Cada uno tiene su tono en CSS (.pf-<nombre>) para distinguir el servicio de un vistazo.
const TRAZOS = {
  // Pantalla con botón de reproducir y base
  tv: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2.5" />
      <path d="M9 21h6M12 17v4" />
      <path d="M10.5 8.6v4.8l4-2.4z" fill="currentColor" stroke="none" />
    </>
  ),
  // Módem con señal saliendo hacia arriba
  wifi: (
    <>
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 17h.01M10 17h.01" strokeWidth="2.6" />
      <path d="M9 9.8a4.2 4.2 0 0 1 6 0" />
      <path d="M6.3 7a8 8 0 0 1 11.4 0" />
      <path d="M12 12.4v1.6" />
    </>
  ),
  // Auricular de teléfono fijo
  telefono: (
    <path d="M6 3.5h2.6l1.5 4.2-2.1 1.4a11 11 0 0 0 6.9 6.9l1.4-2.1 4.2 1.5V18a2.5 2.5 0 0 1-2.6 2.5A16 16 0 0 1 3.5 6.1 2.5 2.5 0 0 1 6 3.5z" />
  ),
  // Flecha de subida sobre una base (velocidad de carga)
  subida: (
    <>
      <path d="M12 17V5" />
      <path d="M7 10l5-5 5 5" />
      <path d="M5 20.5h14" />
    </>
  ),
  // Diadema de técnico (soporte)
  soporte: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.6" />
      <path d="M19 19a3 3 0 0 1-3 3h-2.5" />
    </>
  ),
  // Destello: lo ideal del paquete
  ideal: (
    <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" />
  ),
};

export function PlanIcon({ name, size = 18 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      {TRAZOS[name]}
    </svg>
  );
}

// Renglón de beneficio de un paquete: ícono con su color + texto.
export function PlanFeature({ icono, children }) {
  return (
    <li className={`plan-feat-pill pf-${icono}`}>
      <span className="plan-feat-ico"><PlanIcon name={icono} /></span>
      <span>{children}</span>
    </li>
  );
}
