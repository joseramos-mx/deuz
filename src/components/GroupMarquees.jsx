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
];

function RowMarquee({ items, reverse = false, speed = 28 }) {
  return (
    <div className="relative overflow-hidden bg-white h-[100px] mb-10">
      {/* Fade a los lados: del color del panel (neutral-900) hacia transparente */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-[linear-gradient(to_right,#141414_0%,#141414_5%,transparent_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-[linear-gradient(to_left,#141414_0%,#141414_5%,transparent_70%,transparent_100%)]" />

      {/* Banda blanca completa (sin mask) */}
      <div
        className="flex items-center gap-10 bg-white h-[100px] py-10"
        style={{ animation: `${reverse ? "marqueeR" : "marquee"} ${speed}s linear infinite` }}
      >
        {[...items, ...items].map((logo, i) => (
          <div
            key={i}
            className="relative h-20 w-40 shrink-0 rounded-lg bg-white p-3 "
          >
            <Image src={logo.src} alt="logo" fill className="object-contain" sizes="160px" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeR {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
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
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1  ring-white/10" />

          {/* Título y subtítulo dentro */}
          <div className="relative z-10 px-6 py-8 text-center">
            <p className="text-sm font-semibold text-red-500">Grupo</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-white">
              Nuestras <span className="italic font-medium">10 empresas</span>
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">+500 colaboradores</p>
            <p className="mt-3 text-sm text-white/60">
              Nuestros productos y servicios son utilizados por algunas de las principales compañías del mundo.
            </p>
          </div>

          {/* Bandas + separador grueso */}
          <div className="relative z-10">
            <RowMarquee items={ROW_A} speed={24} />
            {/* Separador central más grueso */}
            <div className="h-3 " />
            <RowMarquee items={ROW_B} reverse speed={28} />
          </div>
        </div>
      </div>
    </section>
  );
}
