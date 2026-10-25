import { GridBackground, MexicoMap, TechLabel } from "@/components/system";
import { ctaCotizar } from "@/data/navegacion";
import { estadosConObra, FUNDACION } from "@/data/empresa";
import { directorHref } from "@/lib/canales";
import HeroRotator from "./HeroRotator";

const SLIDES = [
  {
    division: "Infraestructura y urbanización",
    texto: "Vialidades, pavimentos y urbanización con flota propia de maquinaria pesada.",
    imagen: "/photos/IMG_8785.webp",
  },
  {
    division: "Naves e industria",
    texto: "Naves y losas industriales con concreto de nuestras propias plantas.",
    imagen: "/photos/4985824.jpg",
  },
  {
    division: "Vivienda y desarrollo",
    texto: "Fraccionamientos y vivienda vertical, de planos a realidad, llave en mano.",
    imagen: "/photos/IMG_8797.webp",
  },
  {
    division: "Energía y electrificación",
    texto: "Media y baja tensión, líneas y alumbrado para industria y carreteras.",
    imagen: "/photos/ilu.jpg",
  },
];

export default function Hero() {
  const desde = FUNDACION ? `Desde ${FUNDACION}` : "+30 años";

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deuz-bg pt-16">
      <GridBackground className="-z-10" fade={false} />

      {/* Mapa wireframe */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 top-20 -right-[30%] w-[130%] opacity-60 sm:-right-[10%] sm:w-[95%] lg:top-1/2 lg:right-[-4%] lg:w-[62%] lg:-translate-y-1/2 lg:opacity-100"
      >
        <MexicoMap activos={estadosConObra.map((e) => e.nombre)} />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-24 pt-24 sm:px-6 md:px-8 lg:pb-16">
        <TechLabel tone="light" className="mb-5 text-white/80">
          Grupo empresarial · Durango, MX · {desde}
        </TechLabel>
        <HeroRotator
          slides={SLIDES}
          titulo="Obras llave en mano que trascienden."
          ctaPrimario={ctaCotizar}
          ctaSecundario={{ label: "Hablar con un director", href: directorHref() }}
          microtexto="Respuesta de un ingeniero en menos de 24 h."
        />
      </div>
    </section>
  );
}
