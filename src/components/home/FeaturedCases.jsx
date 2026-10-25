import { CaseCard, CTAButton, SectionHeading, container, section } from "@/components/system";
import { proyectosDestacados } from "@/data/proyectos";

// `conRutas`: true cuando ya existen /proyectos y /proyectos/[slug] (etapa 4)
export default function FeaturedCases({ conRutas = false }) {
  const casos = proyectosDestacados().slice(0, 4);

  return (
    <section id="proyectos" className={section}>
      <div className={container}>
        <SectionHeading
          title="¿Ya hicimos algo como lo tuyo?"
          intro="Una muestra de obra entregada en energía, vivienda, industria e infraestructura."
          action={
            conRutas && (
              <CTAButton href="/proyectos" variant="secondary">
                Ver todos los proyectos
              </CTAButton>
            )
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {casos.map((p, i) => (
            <CaseCard
              key={p.slug}
              proyecto={p}
              href={conRutas ? `/proyectos/${p.slug}` : undefined}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
