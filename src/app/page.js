import Hero from "@/components/home/Hero";
import Scale from "@/components/home/Scale";
import Segments from "@/components/home/Segments";
import IntegratedModel from "@/components/home/IntegratedModel";
import FeaturedCases from "@/components/home/FeaturedCases";
import Process from "@/components/home/Process";
import Compliance from "@/components/home/Compliance";
import Presence from "@/components/home/Presence";
import Leadership from "@/components/home/Leadership";
import Impact from "@/components/home/Impact";
import FinalCTA from "@/components/home/FinalCTA";
import QuoteWizard from "@/components/Quotes";

// Orden de la home = orden de las preguntas del cliente: escala, prueba, respaldo, cotización.
export default function Home() {
  return (
    <main>
      <Hero />
      <Scale />
      <Segments />
      <IntegratedModel />
      <FeaturedCases />
      <Process />
      <Compliance />
      <Presence />
      <Leadership />
      <Impact />
      {/* Provisional hasta la etapa 3 (cotizador nuevo en /cotizador) */}
      <QuoteWizard />
      <FinalCTA />
    </main>
  );
}
