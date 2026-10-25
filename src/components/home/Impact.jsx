import { CTAButton, container, section } from "@/components/system";
import { impacto } from "@/data/empresa";

export default function Impact({ impactoHref }) {
  return (
    <section id="impacto" className={section}>
      <div className={`${container} grid items-end gap-10 lg:grid-cols-12`}>
        <p
          aria-hidden
          className="text-[clamp(6rem,22vw,16rem)] font-medium leading-[0.8] tracking-tighter text-deuz-accent lg:col-span-6"
        >
          {impacto.porcentaje}
        </p>
        <div className="lg:col-span-6">
          <h2 className="text-3xl font-medium leading-[1.05] tracking-tight text-deuz-text md:text-4xl">
            {impacto.titulo}.
          </h2>
          <p className="mt-5 max-w-xl text-deuz-muted md:text-lg">{impacto.texto}</p>
          {impacto.caso && (
            <p className="mt-6 border-l-2 border-deuz-red pl-4 text-deuz-text">{impacto.caso}</p>
          )}
          {impactoHref && (
            <CTAButton href={impactoHref} variant="secondary" className="mt-8">
              Conocer el programa
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  );
}
