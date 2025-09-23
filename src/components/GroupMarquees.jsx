"use client";

import Image from "next/image";

const ROW_A = [
  { src: "/logos/1.jpeg" },
  { src: "/logos/2.jpeg" },
  { src: "/logos/3.jpeg" },
  { src: "/logos/4.jpeg" },
  { src: "/logos/5.jpeg" },
  { src: "/logos/11.jpeg" },
];

const ROW_B = [
  { src: "/logos/6.jpeg" },
  { src: "/logos/7.jpeg" },
  { src: "/logos/8.jpeg" },
  { src: "/logos/9.jpeg" },
  { src: "/logos/10.jpeg" },
  { src: "/logos/10.jpeg" },
];

function LogosRow({ items }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 bg-white py-6">
      {items.map((logo, i) => (
        <div
          key={i}
          className="relative h-20 w-40 shrink-0 rounded-lg bg-[#F7F7F7] p-3 shadow-sm"
        >
          <Image
            src={logo.src}
            alt={`logo-${i}`}
            fill
            className="object-contain"
            sizes="160px"
          />
        </div>
      ))}
    </div>
  );
}

export default function LogosPanel() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Panel redondeado */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-[#141414] text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,.5)]">
          {/* glow suave */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,.08),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

          {/* Título y subtítulo dentro */}
          <div className="relative z-10 px-6 py-8 text-center">
            <p className="text-sm font-semibold text-red-500">Grupo</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-white">
              Nuestras <span className="italic font-medium">12 empresas</span>
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">+500 colaboradores</p>
            <p className="mt-3 text-sm text-white/60">
              Nuestros productos y servicios son utilizados por algunas de las principales compañías del mundo.
            </p>
          </div>

          {/* Logos fijos en dos filas */}
          <div className="relative z-10 divide-y divide-neutral-200/60">
            <LogosRow items={ROW_A} />
            <LogosRow items={ROW_B} />
          </div>
        </div>
      </div>
    </section>
  );
}
