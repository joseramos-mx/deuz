import { MexicoMap, SectionHeading, container, section } from "@/components/system";
import { estadosConObra } from "@/data/empresa";
import PresenceInteractive from "./PresenceInteractive";

export default function Presence() {
  const obrasPorEstado = Object.fromEntries(estadosConObra.map((e) => [e.nombre, e.obras]));

  return (
    <section id="presencia" className={section}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <SectionHeading
            title={`Obra en ${estadosConObra.length} estados.`}
            intro="Desde Durango operamos frentes de obra en el norte y el sureste del país."
          />
          <ul className="mt-8 border-t border-deuz-line">
            {estadosConObra.map((e) => (
              <li key={e.nombre} className="flex items-center justify-between border-b border-deuz-line py-3">
                <span className="flex items-center gap-3 text-deuz-text">
                  <span aria-hidden className="size-1.5 bg-deuz-red" />
                  {e.nombre}
                </span>
                {e.obras != null && <span className="font-mono text-xs text-deuz-muted">{e.obras} obras</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <PresenceInteractive obrasPorEstado={obrasPorEstado}>
            <MexicoMap
              activos={estadosConObra.map((e) => e.nombre)}
              title={`Estados con obra de DEUZ: ${estadosConObra.map((e) => e.nombre).join(", ")}`}
              className="pt-8"
            />
          </PresenceInteractive>
        </div>
      </div>
    </section>
  );
}
