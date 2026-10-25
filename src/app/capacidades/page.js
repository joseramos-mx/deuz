import Image from "next/image";
import { CTAButton, PageHero, SectionHeading, StatBar, container, section } from "@/components/system";
import IntegratedModel from "@/components/home/IntegratedModel";
import FinalCTA from "@/components/home/FinalCTA";
import { plantas, maquinaria } from "@/data/empresa";
import { ctaCotizar } from "@/data/navegacion";

export const metadata = {
  title: "Capacidades",
  description:
    "Más de 130 máquinas especializadas propias, plantas de concreto, asfalto y block, y flota logística propia para obra en todo México.",
  alternates: { canonical: "/capacidades" },
};

export default function CapacidadesPage() {
  return (
    <main>
      <PageHero
        title="Capacidad propia para obra de gran escala."
        intro="Maquinaria, plantas de insumos y equipo técnico propios: disponibilidad inmediata y control de calidad desde el origen."
      >
        <CTAButton href={ctaCotizar.href} size="lg">
          {ctaCotizar.label}
        </CTAButton>
      </PageHero>

      <section className="py-12">
        <div className={container}>
          <StatBar
            className="lg:grid-cols-4"
            items={[
              { valor: "+130", etiqueta: "Máquinas especializadas propias" },
              { valor: String(plantas.length), etiqueta: "Líneas de insumos propias" },
              { valor: "+500", etiqueta: "Colaboradores" },
              { valor: "+150", etiqueta: "Ferreteras abastecidas" },
            ]}
          />
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <SectionHeading title="Plantas e insumos" intro="Producimos lo crítico para no depender de la disponibilidad ni del precio de terceros." />
          <ul className="mt-12 grid gap-px border border-deuz-line bg-deuz-line sm:grid-cols-2 lg:grid-cols-3">
            {plantas.map((p) => (
              <li key={p.nombre} className="group bg-deuz-bg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.foto}
                    alt={p.nombre}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-deuz-text">{p.nombre}</h3>
                  <p className="mt-2 text-sm text-deuz-muted">{p.detalle}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-dim">{p.empresa}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {maquinaria.length > 0 && (
        <section className={section}>
          <div className={container}>
            <SectionHeading title="Flota de maquinaria" />
            <table className="mt-10 w-full border-t border-deuz-line">
              <tbody>
                {maquinaria.map((m) => (
                  <tr key={m.categoria} className="border-b border-deuz-line">
                    <th scope="row" className="py-4 text-left font-normal text-deuz-text">{m.categoria}</th>
                    <td className="py-4 text-right font-mono text-deuz-red">{m.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <IntegratedModel />
      <FinalCTA />
    </main>
  );
}
