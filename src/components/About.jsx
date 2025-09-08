"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowRight, Asterisk } from "@phosphor-icons/react";

const teamImages = [
  {
    src: "/socios/manuel.jpg",
    alt: "Manuel Bueno",
    name: "Manuel Bueno",
    role: "Director General",
    bio: "Más de 15 años liderando proyectos de infraestructura, vivienda y obra industrial a gran escala, con foco en transparencia y ejecución impecable.",
  },
  {
    src: "/socios/sida.jpg",
    alt: "José Ramón Sida",
    name: "José Ramón Sida",
    role: "Socio fundador",
    bio: "Especialista en planeación y gestión de costos. Impulsa la innovación y la productividad en cada frente de obra.",
  },
  {
    src: "/socios/arreola.jpg",
    alt: "Cruz Arreola",
    name: "Cruz Arreola",
    role: "Socio fundador",
    bio: "Experto en dirección de obras urbanas y eléctricas. Integra equipos multidisciplinarios para entregar valor en tiempo y forma.",
  },
  {
    src: "/socios/nuevo.jpg",
    alt: "Nuevo Integrante",
    name: "Nuevo Integrante",
    role: "Socio fundador",
    bio: "Estratega de alto impacto. Alinea visión comercial y operación para escalar proyectos con estándares de clase mundial.",
  },
];

export default function TeamSectionVisionaries() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null); // objeto de la persona seleccionada

  // Bloquea scroll cuando modal está abierto y cierra con ESC
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

  const openProfile = (p) => {
    setCurrent(p);
    setOpen(true);
  };

  return (
    <section id="nosotros" className="relative bg-white">
      {/* líneas decorativas */}
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
            <span className="font-bold">DEUZ GROUP</span> es una comercializadora nacional que agrupa a Grupo Logo (construcción e infraestructura) y Maelsa (electrificación e ingeniería eléctrica), liderada por tres socios. Operamos como un holding sin carga operativa directa, centralizando ventas y distribución de proyectos con aliados estratégicos.
          </p>

          <a
            href="#about"
            className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-neutral-900 hover:text-red-600"
          >
            Más sobre nosotros <ArrowRight size={18} weight="bold" />
          </a>
        </div>

        {/* Columna derecha: GRID 2×2 */}
<div className="md:col-span-7 lg:col-span-8 h-full">
  <div className="grid grid-cols-2 gap-4 h-full">
    {teamImages.map((img) => (
      <button
        key={img.name}
        onClick={() => openProfile(img)}
        className="group relative h-[200px] overflow-hidden rounded-xl bg-neutral-100 focus:outline-none"
        aria-label={`Ver perfil de ${img.name}`}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition scale-[1.02] group-hover:scale-105 aspect-square"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
          <h3 className="text-white font-semibold">{img.name}</h3>
          <p className="text-white/80 text-sm">{img.role}</p>
        </div>
        {/* halo sutil al hover */}
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-red-300/60" />
      </button>
    ))}
  </div>
</div>

      </div>

      {/* ---- MODAL PERFIL ---- */}
      {open && current && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Fondo + glow */}
          <div className="absolute inset-0 bg-black/70" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_5%,rgba(229,9,20,.14),transparent_60%)]" />

          {/* Card */}
          <div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_50px_120px_-40px_rgba(0,0,0,.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Foto */}
              <div className="relative md:col-span-2 aspect-[4/5] md:aspect-auto">
                <Image src={current.src} alt={current.alt} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="md:col-span-3 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Perfil</p>
                    <h3 className="mt-1 text-2xl md:text-3xl font-black text-neutral-900">
                      {current.name} <span className="text-red-600">.</span>
                    </h3>
                    <p className="text-neutral-500 font-medium">{current.role}</p>
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    className="rounded-md p-2 text-neutral-500 hover:text-red-600"
                  >
                    <X size={22} weight="bold" />
                  </button>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  {current.bio}
                </p>

                {/* Extras opcionales */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium">
                    Dirección estratégica
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium">
                    Gestión de obra
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium">
                    Costos y planeación
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center rounded-md bg-[#E50914] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_22px_2px_rgba(229,9,20,0.45)] hover:shadow-[0_0_26px_4px_rgba(229,9,20,0.6)] transition"
                  >
                    Contactar
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
