import { Suspense } from "react";
import Cotizador from "@/components/cotizador/Cotizador";
import CotizadorDesdeUrl from "@/components/cotizador/CotizadorDesdeUrl";
import { GridBackground, container } from "@/components/system";

export const metadata = {
  title: "Cotizador de obra",
  description:
    "Cotiza tu obra en 2 minutos y recibe una pre-propuesta con folio, plazo estimado y proyectos similares. Naves, vivienda, infraestructura y energía.",
  alternates: { canonical: "/cotizador" },
};

// Acepta ?tipo=nave_industrial para prellenar desde enlaces de WhatsApp o campañas.
export default function CotizadorPage() {
  return (
    <main className="relative isolate overflow-hidden pt-16">
      <GridBackground className="-z-10" />
      <div className={`${container} py-14 md:py-20`}>
        <div className="max-w-3xl">
          <h1 className="text-balance text-4xl font-medium leading-[1] tracking-tight text-deuz-text md:text-6xl">
            Cotiza tu proyecto.
          </h1>
          <p className="mt-5 max-w-2xl text-deuz-muted md:text-lg">
            Tres pasos, menos de dos minutos. Recibes una pre-propuesta con folio, alcance y proyectos similares, y un
            ingeniero te contacta en menos de 24 h.
          </p>
        </div>
        <div className="mt-12">
          <Suspense fallback={<Cotizador />}>
            <CotizadorDesdeUrl />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
