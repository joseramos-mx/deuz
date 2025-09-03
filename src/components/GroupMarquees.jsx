"use client";

import Image from "next/image";

const ROW_A = [
  { src: "/logos/1.svg" },
  { src: "/logos/2.svg" },
  { src: "/logos/3.svg" },
  { src: "/logos/4.svg" },
  { src: "/logos/5.svg" },
];

const ROW_B = [
  { src: "/logos/6.svg" },
  { src: "/logos/7.svg" },
  { src: "/logos/8.svg" },
  { src: "/logos/9.svg" },
  { src: "/logos/6.svg" },
];

function RowMarquee({ items, reverse = false, speed = 28 }) {
  return (
    <div className="relative overflow-hidden">
      {/* máscara para desvanecer orillas */}
      <div className="pointer-events-none absolute inset-0 z-10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />
      <div
        className="flex items-center gap-10 py-10"
        style={{ animation: `${reverse ? "marqueeR" : "marquee"} ${speed}s linear infinite` }}
      >
        {[...items, ...items].map((logo, i) => (
          <div key={i} className="relative h-8 w-[120px] shrink-0 opacity-90 md:h-9 md:w-[200px]">
            <Image src={logo.src} alt="logo" fill className="object-contain" sizes="140px" />
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
        {/* Panel redondeado completo */}
        <div className="relative rounded-3xl border border-neutral-200/60 bg-neutral-900 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,.5)] overflow-hidden">
          {/* efecto glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,.08),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

          {/* Título y subtítulo dentro */}
          <div className="relative z-10 text-center px-6 py-10">
            <p className="text-sm font-semibold text-red-500">Grupo</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-white">
              Nuestras <span className="italic font-medium">10 empresas</span>
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">+380 colaboradores</p>
            <p className="mt-4 text-sm text-white/60">
              Nuestros productos y servicios son utilizados por algunas de las principales compañías del mundo.
            </p>
          </div>

          {/* filas de logos */}
          <div className="relative z-10 px-2 pb-10">
            <RowMarquee items={ROW_A} speed={26} />
            <RowMarquee items={ROW_B} reverse speed={30} />
          </div>
        </div>
      </div>
    </section>
  );
}
