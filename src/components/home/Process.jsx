import { SectionHeading, container, section } from "@/components/system";
import { proceso } from "@/data/empresa";

export default function Process({ title = "Seis fases, un entregable en cada una." }) {
  return (
    <section id="proceso" className={section}>
      <div className={container}>
        <SectionHeading
          title={title}
          intro="Sabes en todo momento en qué etapa está tu obra y qué documento la respalda."
        />

        <ol className="mt-14 grid border-t border-l border-deuz-line sm:grid-cols-2 lg:grid-cols-6">
          {proceso.map((p, i) => (
            <li key={p.fase} className="flex flex-col border-r border-b border-deuz-line p-5 md:p-6">
              <span className="font-mono text-xs text-deuz-accent">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-medium leading-snug text-deuz-text lg:min-h-[3.5rem]">{p.fase}</h3>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-dim">Entregable</p>
              <p className="mt-1 text-sm text-deuz-muted">{p.entregable}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
