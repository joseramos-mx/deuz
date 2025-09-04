"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PROJECTS = [
  { title: "Parque Industrial San Ignacio", subtitle: "Nave + urbanización / 42,000 m²", image: "/projects/21.jpg", tags: ["Obra privada","Estructura","Concreto"] },
  { title: "Fraccionamiento Los Sauces", subtitle: "Torre de 22 niveles / 18,500 m²", image: "/projects/21.jpg", tags: ["Vertical","Premium"] },
  { title: "Reencarpetamiento Carretera Mezquital", subtitle: "Urbanización + vialidades / 9.2 km", image: "/projects/21.jpg", tags: ["Urbanización","Asfalto","Drenaje"] },
  { title: "Planta Fotovoltaica Maelsa", subtitle: "Generación distribuida / 7.6 MW", image: "/projects/21.jpg", tags: ["Energía","Electrificación"] },
];

export default function ProjectsCarousel() {
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("[data-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(Number(v.target.getAttribute("data-index")));
      },
      { root: el, threshold: [0.6] }
    );
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(`[data-index="${i}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-sm font-semibold text-neutral-500">Proyectos</p>
        <h2 className="mb-6 text-3xl md:text-4xl font-black text-neutral-900">
          Destacados <span className="text-red-600">.</span>
        </h2>
      </div>

      {/* full-bleed scroller */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6 md:px-8"
      >
        {PROJECTS.map((p, i) => (
          <article
            key={p.title + i}
            data-card
            data-index={i}
            className="relative aspect-[16/9] min-w-[90vw] md:min-w-[74vw] lg:min-w-[40vw] overflow-hidden rounded-[28px] bg-neutral-900 text-white"
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              priority={i === 0}
              sizes="(min-width:1024px) 68vw, (min-width:768px) 74vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
              <div className="mb-3 flex flex-wrap gap-2">
                {p.tags?.map(t => (
                  <span key={t} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight">{p.title}</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">{p.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a proyecto ${i + 1}`}
            className={`h-2 w-2 rounded-full transition ${i === active ? "bg-neutral-900 w-4" : "bg-neutral-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
