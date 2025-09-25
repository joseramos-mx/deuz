"use client";

import { Factory, Crane, UsersThree, Heart } from "@phosphor-icons/react";

/** Paleta de gradientes rojos (se alternan por card) */
const GRADS = [
  "from-[#C3162A] via-[#B0121F] to-[#8F0F18]",
  "from-[#E21D2F] via-[#C81926] to-[#9D131D]",
  "from-[#FF2A2A] via-[#D21414] to-[#A10D0D]",
  "from-[#D51F1F] via-[#B41717] to-[#8A1010]",
];

const values = [
  {
    title: "Fabricamos nuestros propios insumos",
    icon: <Factory size={28} weight="duotone" className="text-red-500" />,
  },
  {
    title: "Usamos nuestra propia maquinaria",
    icon: <Crane size={28} weight="duotone" className="text-red-500" />,
  },
  {
    title: "Construimos con nuestros colaboradores",
    icon: <UsersThree size={28} weight="duotone" className="text-red-500" />,
  },
  {
    title: "Reinvertimos el 60% en desarrollo social",
    icon: <Heart size={28} weight="duotone" className="text-red-500" />,
  },
];

export default function ValuesGrid() {
  return (
    <section id="valores" className="relative bg-white py-16">
      {/* Fondo decorativo sutil (líneas + glow) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* líneas verticales */}
        <div className="absolute inset-y-0 left-[12%] w-px bg-neutral-200/50" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-200/40" />
        <div className="absolute inset-y-0 right-[12%] w-px bg-neutral-200/30" />
        {/* halo rojo muy suave */}
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff2a2a]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-black text-neutral-900">
          Oferta de <span className="italic font-medium">valor</span>
          <span className="text-red-500">.</span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
          Operamos con estructura propia para entregar costos competitivos, control y
          compromiso social en cada proyecto.
        </p>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, i) => (
            <div
              key={i}
              className={`
                group relative overflow-hidden rounded-2xl border border-red-500/20
                bg-gradient-to-b ${GRADS[i % GRADS.length]}
                text-white shadow-[0_20px_40px_-20px_rgba(229,9,20,0.35)]
                transition-transform duration-300 ease-out
                hover:-translate-y-1
              `}
            >
              {/* brillo / glow detrás del icono */}
              <div className="pointer-events-none absolute -top-6 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-white/20 blur-2xl" />
              {/* borde animado suave */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />

              {/* “sheen” al hover */}
              <span className="pointer-events-none absolute -left-20 top-0 h-full w-24 -skew-x-12 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="grid size-14 place-items-center rounded-full bg-white/90 backdrop-blur-sm ring-1 ring-white/20">
                  {val.icon}
                </div>

                <h3 className="text-lg font-semibold leading-snug">{val.title}</h3>

                {/* base/foot con divisoria sutil */}
                <div className="mt-3 h-px w-12 bg-white/20" />
                <p className="text-xs text-white/80">
                  Eficiencia, control y trazabilidad desde el origen.
                </p>
              </div>

              {/* glow exterior al hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition duration-300 group-hover:opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
