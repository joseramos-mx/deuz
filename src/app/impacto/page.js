import Image from "next/image";
import { PageHero, container, section } from "@/components/system";
import FinalCTA from "@/components/home/FinalCTA";
import { impacto } from "@/data/empresa";

export const metadata = {
  title: "Impacto social",
  description: "DEUZ reinvierte el 60% en desarrollo social en las comunidades donde construye.",
  alternates: { canonical: "/impacto" },
};

export default function ImpactoPage() {
  return (
    <main>
      <PageHero title={`${impacto.titulo}.`} intro={impacto.texto} />

      <section className={section}>
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
          <p aria-hidden className="text-[clamp(7rem,26vw,20rem)] font-medium leading-[0.8] tracking-tighter text-deuz-red lg:col-span-6">
            {impacto.porcentaje}
          </p>
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-6">
            <Image src="/photos/IMG_8774.webp" alt="Entrega de vivienda a una familia" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {impacto.caso && (
        <section className={section}>
          <div className={container}>
            <p className="max-w-3xl border-l-2 border-deuz-red pl-6 text-2xl leading-snug text-deuz-text">{impacto.caso}</p>
          </div>
        </section>
      )}

      <FinalCTA />
    </main>
  );
}
