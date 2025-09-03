"use client";

import { Handshake, SealCheck, Hammer, ShieldCheck } from "@phosphor-icons/react";

const values = [
  {
    title: "Espíritu de servicio",
    icon: <Handshake size={32} weight="duotone" className="text-red-500" />,
  },
  {
    title: "Transparencia en costos",
    icon: <SealCheck size={32} weight="duotone" className="text-red-500" />,
  },
  {
    title: "Ejecución impecable",
    icon: <Hammer size={32} weight="duotone" className="text-red-500" />,
  },
  {
    title: "Confianza y ética",
    icon: <ShieldCheck size={32} weight="duotone" className="text-red-500" />,
  },
];

export default function ValuesGrid() {
  return (
    <section id="valores" className="relative bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-black text-neutral-900">
          Nuestros <span className="italic font-medium">valores</span>
          <span className="text-red-500">.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
                {val.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{val.title}</h3>

              {/* Decor glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-red-50 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
