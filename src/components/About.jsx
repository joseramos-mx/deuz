"use client";

import Image from "next/image";
import { ArrowRight, Asterisk } from "@phosphor-icons/react";

const teamImages = [
    {
      src: "/socios/manuel.jpg",
      alt: "Manuel Bueno",
      name: "Manuel Bueno",
      role: "Operaciones",
    },
    {
      src: "/socios/sida.jpg",
      alt: "José Ramón Sida",
      name: "José Ramón Sida",
      role: "Director General",
    },
    {
      src: "/socios/arreola.jpg",
      alt: "Cruz Arreola",
      name: "Cruz Arreola",
      role: "Proyectos",
    },
  ];
  

export default function TeamSectionVisionaries() {
  return (
    <section id="equipo" className="relative bg-white">
      {/* líneas decorativas (igual que antes) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-20 top-0 bottom-0 w-px bg-neutral-200" />
        <div className="absolute right-20 top-0 bottom-0 w-px bg-neutral-200" />
        <div className="absolute left-0 right-0 top-24 h-px bg-neutral-200" />
        <div className="absolute left-20 top-24 -translate-x-1/2 -translate-y-1/2">
          <div className="relative size-3">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-400" />
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-neutral-400" />
          </div>
        </div>
        <div className="absolute right-20 top-24 translate-x-1/2 -translate-y-1/2">
          <div className="relative size-3">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-400" />
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-neutral-400" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-8">
        {/* Columna izquierda: texto */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-neutral-600">
            <Asterisk size={14} weight="bold" className="text-red-500" /> Equipo
          </div>

          <h2 className="text-[clamp(32px,6vw,56px)] leading-[0.95] font-black text-neutral-900">
            Detrás de
            <br />
            <span className="italic font-medium">Nuestra visión</span>
            <span className="text-red-500">.</span>
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">
          <span className="font-bold">DEUZ GROUP</span> es una comercializadora nacional que agrupa a Grupo Logo (construcción e infraestructura) y Maelsa (electrificación e ingeniería eléctrica), liderada por tres socios: Cruz Arreola, José Ramón Sida y Manuel Bueno. Su objetivo es expandir la operación de estas empresas a nivel nacional bajo una misma bandera comercial, operando como un holding sin carga operativa directa, que centraliza las ventas y distribución de proyectos, subcontratando a sus empresas aliadas para la ejecución.
          </p>

          <a
            href="#about"
            className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-neutral-900 hover:text-red-600"
          >
            Más sobre nosotros <ArrowRight size={18} weight="bold" />
          </a>
        </div>

        {/* Columna derecha: imágenes */}
        <div className="md:col-span-7 lg:col-span-8">
          {/* MOBILE: carrusel horizontal con snap */}
          <div className="md:hidden -mx-6 px-6">
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              {teamImages.map((img, i) => (
                <div
                  key={i}
                  className="relative snap-start shrink-0 w-[80%] aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP: tres columnas que igualan la altura del texto */}
          <div className="hidden md:flex gap-4 h-full">
            {teamImages.map((img, i) => (
              <div key={i} className="relative flex-1 overflow-hidden rounded-md bg-neutral-100">
                {/* hace que cada columna llene la altura del contenedor */}
                <div className="absolute inset-0">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{img.name}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">{img.role}</p>
                </div>
                </div>
                {/* para asegurar altura mínima si el texto es muy corto en pantallas grandes */}
                <div className="invisible">.</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
