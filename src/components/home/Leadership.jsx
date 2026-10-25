import Image from "next/image";
import { CTAButton, SectionHeading, container, section } from "@/components/system";
import { socios } from "@/data/empresa";

export default function Leadership({ grupoHref }) {
  return (
    <section id="grupo" className={section}>
      <div className={container}>
        <SectionHeading
          title="Socios que responden por cada obra."
          intro="La dirección participa directamente en los proyectos: hablas con quien decide."
          action={
            grupoHref && (
              <CTAButton href={grupoHref} variant="secondary">
                Conocer al grupo
              </CTAButton>
            )
          }
        />

        <ul className="mt-14 grid grid-cols-2 gap-px border border-deuz-line bg-deuz-line lg:grid-cols-4">
          {socios.map((s) => (
            <li key={s.nombre} className="group bg-deuz-bg">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={s.foto}
                  alt={s.nombre}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-medium text-deuz-text">{s.nombre}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-muted">{s.cargo}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
