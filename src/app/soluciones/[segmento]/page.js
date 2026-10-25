import { notFound } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { CaseCard, CTAButton, PageHero, SectionHeading, container, section } from "@/components/system";
import Process from "@/components/home/Process";
import Cotizador from "@/components/cotizador/Cotizador";
import { segmentos, getSegmento, CONSULTORIA } from "@/data/soluciones";
import { proyectosPorSegmento } from "@/data/proyectos";
import { directorHref } from "@/lib/canales";
import JsonLd from "@/components/JsonLd";
import { schemaFaq, schemaMigas } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return segmentos.map((s) => ({ segmento: s.slug }));
}

export async function generateMetadata({ params }) {
  const s = getSegmento((await params).segmento);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: `/soluciones/${s.slug}` },
    openGraph: { title: s.seo.title, description: s.seo.description },
  };
}

export default async function SolucionPage({ params }) {
  const s = getSegmento((await params).segmento);
  if (!s) notFound();
  const casos = proyectosPorSegmento(s.slug);

  return (
    <main>
      <JsonLd data={schemaFaq(s.faq)} />
      <JsonLd data={schemaMigas([["Inicio", "/"], ["Soluciones", "/#soluciones"], [s.nombre, `/soluciones/${s.slug}`]])} />
      <PageHero title={s.nombre} intro={s.valor}>
        <CTAButton href="#cotizar" size="lg">
          {s.cta}
        </CTAButton>
        <CTAButton href={directorHref()} variant="secondary" size="lg" arrow={false}>
          Hablar con un director
        </CTAButton>
      </PageHero>

      <section className={section}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <SectionHeading title="Alcance" intro="Un solo contrato, un solo responsable, con estructura propia en cada frente." />
          </div>
          <ul className="grid gap-px self-start border border-deuz-line bg-deuz-line sm:grid-cols-2 lg:col-span-7">
            {[...s.servicios, CONSULTORIA].map((sv, i, arr) => (
              <li key={sv} className="flex items-start gap-3 bg-deuz-bg p-5">
                {i === arr.length - 1 ? (
                  <Plus aria-hidden className="mt-0.5 size-4 shrink-0 text-deuz-accent" />
                ) : (
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-deuz-accent" />
                )}
                <span className="text-deuz-text">{sv}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <SectionHeading
            title={`Proyectos de ${s.nombre.toLowerCase()}`}
            action={
              <CTAButton href="/proyectos" variant="secondary">
                Ver todos los proyectos
              </CTAButton>
            }
          />
          {casos.length > 0 ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {casos.map((p) => (
                <CaseCard key={p.slug} proyecto={p} href={`/proyectos/${p.slug}`} />
              ))}
            </div>
          ) : (
            <p className="mt-8 max-w-xl text-deuz-muted">
              Estamos documentando los casos de esta división. Pide referencias durante la visita técnica.
            </p>
          )}
        </div>
      </section>

      <Process />

      <section className={section}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <SectionHeading title="Preguntas frecuentes" />
          </div>
          <div className="border-t border-deuz-line lg:col-span-8">
            {s.faq.map((f) => (
              <details key={f.p} className="group border-b border-deuz-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg text-deuz-text [&::-webkit-details-marker]:hidden">
                  {f.p}
                  <Plus aria-hidden className="size-5 shrink-0 text-deuz-accent transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="pb-6 pr-10 text-deuz-muted">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizar" className={`${section} scroll-mt-16`}>
        <div className={container}>
          <SectionHeading title={`Cotiza tu proyecto de ${s.nombre.toLowerCase()}`} intro="Tres pasos y recibes tu pre-propuesta con folio." />
          <div className="mt-12">
            <Cotizador tipoInicial={s.tipoCotizador} origen="solucion" />
          </div>
        </div>
      </section>
    </main>
  );
}
