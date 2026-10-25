import Image from "next/image";
import { PageHero, SectionHeading, StatBar, container, section } from "@/components/system";
import FinalCTA from "@/components/home/FinalCTA";
import { socios, empresasGrupo, historia, mision, vision, stats } from "@/data/empresa";

export const metadata = {
  title: "Grupo",
  description:
    "DEUZ es un grupo empresarial de Durango con más de 30 años, 12 empresas y más de 500 colaboradores dedicados a la construcción llave en mano.",
  alternates: { canonical: "/grupo" },
};

export default function GrupoPage() {
  return (
    <main>
      <PageHero
        title="Un grupo, doce empresas, un solo responsable."
        intro="DEUZ es un holding mexicano de construcción e ingeniería. Integramos insumos, maquinaria y personal propios para entregar obra de alto impacto."
      />

      <section className="py-12">
        <div className={container}>
          <StatBar items={stats} />
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <div className="grid gap-px border border-deuz-line bg-deuz-line md:grid-cols-2">
            <div className="bg-deuz-bg p-8 md:p-12">
              <h2 className="text-2xl font-medium text-deuz-text">Misión</h2>
              <p className="mt-4 text-lg leading-relaxed text-deuz-muted">{mision}</p>
            </div>
            <div className="bg-deuz-bg p-8 md:p-12">
              <h2 className="text-2xl font-medium text-deuz-text">Visión</h2>
              <p className="mt-4 text-lg leading-relaxed text-deuz-muted">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {historia.length > 0 && (
        <section className={section}>
          <div className={container}>
            <SectionHeading title="Historia" />
            <ol className="mt-10 border-t border-deuz-line">
              {historia.map((h) => (
                <li key={h.anio} className="grid gap-2 border-b border-deuz-line py-5 sm:grid-cols-[140px_1fr]">
                  <span className="font-mono text-sm text-deuz-accent">{h.anio}</span>
                  <span className="text-deuz-text">{h.hito}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className={section}>
        <div className={container}>
          <SectionHeading title="Socios" intro="La dirección participa directamente en cada proyecto." />
          <ul className="mt-12 grid gap-px border border-deuz-line bg-deuz-line sm:grid-cols-2">
            {socios.map((s) => (
              <li key={s.nombre} className="grid grid-cols-[120px_1fr] gap-5 bg-deuz-bg p-5 md:grid-cols-[160px_1fr] md:p-6">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={s.foto} alt={s.nombre} fill sizes="160px" className="object-cover grayscale" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-deuz-text">{s.nombre}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-accent">{s.cargo}</p>
                  <p className="mt-4 text-sm leading-relaxed text-deuz-muted">{s.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <SectionHeading
            title="Empresas del grupo"
            intro="Cada empresa cubre un eslabón de la obra: insumos, maquinaria, logística y ejecución."
          />
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-deuz-line md:grid-cols-3 lg:grid-cols-4">
            {empresasGrupo.map((e) => (
              <li key={e.nombre} className="flex flex-col border-r border-b border-deuz-line p-5">
                <div className="relative h-20 bg-white">
                  <Image src={e.logo} alt={e.nombre} fill sizes="240px" className="object-contain p-3" />
                </div>
                <h3 className="mt-4 font-medium text-deuz-text">{e.nombre}</h3>
                <p className="mt-1 text-sm text-deuz-muted">{e.giro}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
