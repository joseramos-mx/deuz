"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

const NAV = [
  { label: "Inicio", href: "#inicio", emphasize: true },
  { label: "Nosotros", href: "#nosotros"},
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto", emphasize: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // lee hash actual y escucha cambios (para resaltar el activo)
  useEffect(() => {
    const setFromHash = () => setActive(window.location.hash || null);
    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, []);

  // Bloquea scroll y ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#040505]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-[18px] md:px-8">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="DEUZ Logo" width={110} height={35} priority />
        </a>

        {/* Botón móvil */}
        <button
          className="p-2 text-white hover:text-red-500 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <List size={32} />
        </button>

        {/* Links desktop (puedes brutalizarlos luego si quieres mantener coherencia) */}
        <nav className="hidden md:flex items-center gap-8 text-white text-[14px] font-sans">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:text-red-500 ${
                item.emphasize ? "text-red-500" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Menú Fullscreen móvil - estilo brutalista */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] md:hidden"
          onClick={() => setOpen(false)}
        >
          {/* Fondo oscuro detrás */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Panel */}
          <div
            className="
              absolute inset-0 min-h-svh 
              bg-[#0B0E0C] text-white 
              flex flex-col
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* decor: glow y líneas verticales/horizontales */}
            {/* Líneas brutalistas */}


            {/* Header del panel */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4">
              <Image src="/logo.svg" alt="DEUZ Logo" width={110} height={35} />
              <button
                className="rounded-md p-2 text-white hover:text-red-500"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            {/* Contenido brutalista */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 pt-8 pb-12">
              <nav className="mx-auto flex max-w-[680px] flex-col divide-y divide-white/10">
                {NAV.map((item, idx) => {
                  const isActive = active === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`
                        group relative flex items-center justify-between 
                        py-5 md:py-7
                        font-sans tracking-tight
                        text-[15vw] leading-none sm:text-[7vw] md:text-[44px] 
                        
                        ${item.emphasize ? "text-red-500" : "text-white"}
                        hover:bg-white/5
                        transition
                      `}
                    >
                      {/* Nombre de sección grande */}
                      <span className="block">
                        {item.label}
                        {/* Punto rojo si está activo */}
                        <span
                          className={`inline-block translate-y-[-0.25em] align-baseline text-red-600 transition-opacity ${
                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                          }`}
                        >
                          &nbsp;•
                        </span>
                      </span>

                      {/* Indicador brutalista (rectángulo) al pasar/activo */}
                      <span
                        className={`
                          hidden sm:block h-6 w-10 rounded-sm 
                          border ${isActive ? "border-red-600 bg-red-600/30" : "border-white/20"}
                          transition
                          group-hover:border-red-600 group-hover:bg-red-600/20
                        `}
                        aria-hidden
                      />
                    </a>
                  );
                })}
              </nav>

              {/* líneas inferiores decorativas */}
              
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
