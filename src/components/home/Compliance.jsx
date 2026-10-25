import { ShieldCheck } from "lucide-react";
import { CTAButton, SectionHeading, container, section } from "@/components/system";
import { respaldo } from "@/data/empresa";

export default function Compliance({ dossierHref = "/#contacto" }) {
  return (
    <section id="respaldo" className={section}>
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <SectionHeading
            title="Garantías formales en cada contrato."
            intro="Documentación legal, fianzas y registros disponibles para tu área de compras, jurídico o comité de licitación."
          />
          <CTAButton href={dossierHref} className="mt-8">
            Descargar dossier corporativo
          </CTAButton>
        </div>

        <ul className="grid gap-px self-start border border-deuz-line bg-deuz-line sm:grid-cols-2 lg:col-span-7">
          {respaldo.map((r) => (
            <li key={r.titulo} className="flex gap-4 bg-deuz-bg p-6">
              <ShieldCheck aria-hidden className="size-5 shrink-0 text-deuz-accent" />
              <div>
                <h3 className="font-medium text-deuz-text">{r.titulo}</h3>
                <p className="mt-1 text-sm text-deuz-muted">{r.texto}</p>
              </div>
            </li>
          ))}
          <li className="flex gap-4 bg-deuz-bg p-6">
            <span aria-hidden className="mt-0.5 font-mono text-sm text-deuz-accent">◆</span>
            <div>
              <h3 className="font-medium text-deuz-text">Expediente completo bajo solicitud</h3>
              <p className="mt-1 text-sm text-deuz-muted">Acta constitutiva, opiniones de cumplimiento y estados financieros.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
