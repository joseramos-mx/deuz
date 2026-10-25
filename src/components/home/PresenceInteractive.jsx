"use client";

import { useRef, useState } from "react";

/**
 * Añade interacción al MexicoMap renderizado en servidor: al pasar el cursor
 * (o tocar) un estado con obra, muestra su nombre y número de obras.
 */
export default function PresenceInteractive({ obrasPorEstado, children }) {
  const [activo, setActivo] = useState(null);
  const prev = useRef(null);

  const marcar = (el) => {
    if (prev.current && prev.current !== el) prev.current.removeAttribute("data-on");
    if (el) el.setAttribute("data-on", "true");
    prev.current = el;
    setActivo(el?.dataset.estado ?? null);
  };

  const onPointer = (e) => marcar(e.target.closest?.("[data-estado]") ?? null);

  const obras = activo ? obrasPorEstado[activo] : null;

  return (
    <div className="relative" onPointerOver={onPointer} onPointerDown={onPointer} onPointerLeave={() => marcar(null)}>
      <p
        aria-live="polite"
        className="absolute left-0 top-0 min-h-5 font-mono text-[11px] uppercase tracking-[0.18em] text-deuz-text"
      >
        {activo ? (
          <>
            <span className="text-deuz-accent">◆</span> {activo}
            {obras != null && <span className="text-deuz-muted"> · {obras} obras</span>}
          </>
        ) : (
          <span className="text-deuz-dim">Toca o pasa el cursor sobre un estado</span>
        )}
      </p>
      {children}
    </div>
  );
}
