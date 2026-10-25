import { PageHero, container } from "@/components/system";
import ProyectosFiltro from "@/components/ProyectosFiltro";
import FinalCTA from "@/components/home/FinalCTA";
import { proyectos } from "@/data/proyectos";

export const metadata = {
  title: "Proyectos",
  description:
    "Portafolio de obra entregada por DEUZ: electrificación, vivienda, naves industriales, infraestructura y logística en Durango y México.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <main>
      <PageHero
        title="Obra entregada."
        intro="Filtra por segmento y estado para encontrar proyectos parecidos al tuyo."
      />
      <section className="py-14 md:py-20">
        <div className={container}>
          <ProyectosFiltro proyectos={proyectos} />
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
