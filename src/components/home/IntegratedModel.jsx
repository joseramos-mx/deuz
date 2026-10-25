import { SectionHeading, container, section } from "@/components/system";
import { modeloIntegrado, beneficioModelo } from "@/data/empresa";

export default function IntegratedModel() {
  return (
    <section id="modelo" className={section}>
      <div className={container}>
        <SectionHeading
          title="Todo lo hacemos con estructura propia."
          intro="Sin subcontratar lo crítico: el precio, la calidad y el plazo dependen de nosotros, no de terceros."
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Línea conectora */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-deuz-line-strong md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto"
          />
          {modeloIntegrado.map((n, i) => {
            const ultimo = i === modeloIntegrado.length - 1;
            return (
              <li key={n.titulo} className="relative pl-10 md:pl-0 md:pt-12">
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 grid size-[15px] place-items-center border ${
                    ultimo ? "border-deuz-red bg-deuz-red" : "border-deuz-line-strong bg-deuz-bg"
                  }`}
                >
                  <span className={`size-[5px] ${ultimo ? "bg-white" : "bg-deuz-red"}`} />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-deuz-dim">
                  0{i + 1}
                  {!ultimo && <span className="ml-2 hidden text-deuz-red md:inline">→</span>}
                </p>
                <h3 className="mt-3 text-xl font-medium text-deuz-text">
                  {n.cifra && <span className="text-deuz-red">{n.cifra} </span>}
                  {n.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-deuz-muted">{n.texto}</p>
              </li>
            );
          })}
        </ol>

        {beneficioModelo && (
          <p className="mt-14 border-l-2 border-deuz-red pl-5 text-xl font-medium text-deuz-text md:text-2xl">
            {beneficioModelo}
          </p>
        )}
      </div>
    </section>
  );
}
