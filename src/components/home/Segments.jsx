import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading, SpotlightCard, container, section } from "@/components/system";
import { segmentos, CONSULTORIA } from "@/data/soluciones";
import { soluciones as navSoluciones } from "@/data/navegacion";

export default function Segments() {
  return (
    <section id="soluciones" className={section}>
      <div className={container}>
        <SectionHeading
          title="¿Qué vas a construir?"
          intro={`Cuatro divisiones con un mismo modelo integrado. ${CONSULTORIA} incluida en todas.`}
        />

        <div className="mt-14 grid gap-px border border-deuz-line bg-deuz-line md:grid-cols-2">
          {segmentos.map((s, i) => (
            <SpotlightCard
              key={s.slug}
              href={navSoluciones[i]?.href ?? `/soluciones/${s.slug}`}
              className="group flex flex-col bg-deuz-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-deuz-red"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={s.imagen}
                  alt=""
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deuz-bg to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-xs text-white">0{i + 1}</span>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="flex items-start justify-between gap-4 text-2xl font-medium tracking-tight text-deuz-text md:text-3xl">
                  {s.nombre}
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-6 shrink-0 text-deuz-dim transition group-hover:text-deuz-red"
                  />
                </h3>
                <p className="mt-3 max-w-md text-deuz-muted">{s.valor}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {s.servicios.map((sv) => (
                    <li
                      key={sv}
                      className="border border-deuz-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-deuz-muted"
                    >
                      {sv}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
