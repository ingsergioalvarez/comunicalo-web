import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CircleAlert } from 'lucide-react';
import { registrarLead } from '../data/site';
import { doc } from '../data/documentos';

// Formularios por pasos (Empresas, Hogar y Eventos): se muestra un bloque a la vez y
// al avanzar solo se valida ese bloque. El paso 1 pide contacto y la solución general;
// al pasarlo el prospecto se guarda como "incompleto" y cada paso siguiente actualiza
// sus atributos (mismo folio). Si abandona la página se avisa a ventas para no perderlo.
//
// pasos:     [{ titulo, campos: ['nombre', …] }] — campos son las claves de `errores`
// errores:   objeto { campo: mensaje } con la validación completa del formulario
// prefijo:   prefijo de los id de los campos (p. ej. 'em' → #em-nombre)
// datosLead: () => datos para registrarLead (sin folio ni etapa); `atributos` es un
//            objeto { 'Etiqueta': valor } con el detalle, los vacíos no se envían
export function useAsistente({ pasos, errores, prefijo, datosLead }) {
  const [paso, setPaso] = useState(0);
  const [intento, setIntento] = useState(false);
  const [parcial, setParcial] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [folio] = useState(() => (globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`));
  const formRef = useRef(null);
  const datosRef = useRef(datosLead);
  datosRef.current = datosLead;

  const erroresDe = (i) => pasos[i].campos.filter((k) => errores[k]);
  const enfocar = (k) => setTimeout(() => document.getElementById(`${prefijo}-${k}`)?.focus(), 30);

  const mover = (i) => {
    setPaso(i);
    setIntento(false);
    // Si el inicio del formulario quedó arriba de la pantalla, se regresa a él
    const top = formRef.current?.getBoundingClientRect().top;
    if (top < 0) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const guardar = (etapa) => {
    const { atributos = {}, ...datos } = datosRef.current();
    const llenos = Object.fromEntries(Object.entries(atributos).filter(([, v]) => v !== '' && v != null));
    registrarLead({ ...datos, atributos: llenos, folio, ...(etapa ? { etapa } : {}) });
  };

  const siguiente = () => {
    const malos = erroresDe(paso);
    if (malos.length) {
      setIntento(true);
      enfocar(malos[0]);
      return;
    }
    if (!enviado) {
      guardar('parcial');
      setParcial(true);
    }
    mover(paso + 1);
  };

  // Valida todo antes de enviar; si falta algo en otro paso, lleva a ese paso
  const validarTodo = () => {
    for (let i = 0; i < pasos.length; i++) {
      const malos = erroresDe(i);
      if (malos.length) {
        if (i !== paso) setPaso(i);
        setIntento(true);
        enfocar(malos[0]);
        return false;
      }
    }
    return true;
  };

  // Envío final: marca el prospecto como completo (actualiza el mismo folio)
  const completar = () => {
    setEnviado(true);
    guardar();
  };

  // Abandono: al cerrar o salir de la página (o del formulario) sin enviar, se avisa a ventas
  // (con refs: el aviso solo sale al salir de verdad, no cuando cambia el estado al enviar)
  const pendienteRef = useRef(false);
  pendienteRef.current = parcial && !enviado;
  const avisadoRef = useRef(false);
  useEffect(() => {
    const avisar = () => {
      if (!pendienteRef.current || avisadoRef.current) return;
      avisadoRef.current = true;
      guardar('abandono');
    };
    window.addEventListener('pagehide', avisar);
    return () => {
      window.removeEventListener('pagehide', avisar);
      avisar();
    };
  }, []);

  return {
    paso, intento, enviado, formRef,
    esUltimo: paso === pasos.length - 1,
    err: (k) => (intento ? errores[k] : undefined),
    nErroresPaso: intento ? erroresDe(paso).length : 0,
    siguiente, atras: () => mover(paso - 1), validarTodo, completar,
    // onSubmit del <form>: Enter o "Siguiente" avanzan; en el último paso se envía
    alEnviar: (enviar) => (e) => {
      e.preventDefault();
      if (paso < pasos.length - 1) siguiente();
      else if (validarTodo()) enviar();
    },
  };
}

export function BarraPasos({ pasos, paso }) {
  const sigue = pasos[paso + 1];
  return (
    <div className="asis-barra">
      <p className="asis-barra-texto">
        <strong>Paso {paso + 1} de {pasos.length}</strong>
        {sigue ? <span>Sigue: {sigue.titulo}</span> : <span>¡Último paso!</span>}
      </p>
      <div className="asis-barra-segmentos" aria-hidden="true">
        {pasos.map((p, i) => <span key={p.titulo} className={i <= paso ? 'is-on' : ''} />)}
      </div>
    </div>
  );
}

// Aviso del paso de contacto: se guardan los datos para dar seguimiento aunque no termine
export function AvisoContacto() {
  return (
    <p className="asis-aviso">
      Al continuar aceptas nuestro <a className="link" href={doc('aviso-de-privacidad.pdf')} target="_blank" rel="noopener">aviso de privacidad</a>.
      Si no terminas, un asesor puede contactarte con estos datos.
    </p>
  );
}

export function ErroresPaso({ n }) {
  if (!n) return null;
  return (
    <p className="alert ev-alert-error" role="alert">
      <CircleAlert size={16} aria-hidden="true" /> Revisa {n === 1 ? 'el campo marcado' : `los ${n} campos marcados`} para continuar.
    </p>
  );
}

// Botones Atrás / Siguiente; en el último paso se muestra el botón de envío (children)
export function NavPasos({ paso, esUltimo, atras, children }) {
  return (
    <div className="asis-nav">
      {paso > 0 && (
        <button type="button" className="btn btn-outline btn-lg" onClick={atras}><ArrowLeft size={18} /> Atrás</button>
      )}
      {esUltimo ? children : (
        <button type="submit" className="btn btn-primary btn-lg">Siguiente <ArrowRight size={18} /></button>
      )}
    </div>
  );
}
