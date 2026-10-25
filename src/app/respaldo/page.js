import { ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading, container, section } from "@/components/system";
import Process from "@/components/home/Process";
import Formulario from "@/components/Formulario";
import { respaldo } from "@/data/empresa";

export const metadata = {
  title: "Respaldo y cumplimiento",
  description:
    "Fianzas, documentación legal y registros de DEUZ Grupo Empresarial. Descarga el dossier corporativo para tu área de compras o comité de licitación.",
  alternates: { canonical: "/respaldo" },
};

export default function RespaldoPage() {
  return (
    <main>
      <PageHero
        title="Respaldo y cumplimiento."
        intro="Lo que tu área de compras, jurídico o comité de licitación necesita revisar antes de firmar."
      />

      <section className={section}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <SectionHeading title="Garantías y documentación" intro="Cada contrato se respalda con garantías formales." />
          </div>
          <ul className="grid gap-px self-start border border-deuz-line bg-deuz-line sm:grid-cols-2 lg:col-span-7">
            {respaldo.map((r) => (
              <li key={r.titulo} className="flex gap-4 bg-deuz-bg p-6">
                <ShieldCheck aria-hidden className="size-5 shrink-0 text-deuz-red" />
                <div>
                  <h3 className="font-medium text-deuz-text">{r.titulo}</h3>
                  <p className="mt-1 text-sm text-deuz-muted">{r.texto}</p>
                </div>
              </li>
            ))}
            <li className="flex gap-4 bg-deuz-bg p-6">
              <span aria-hidden className="mt-0.5 font-mono text-sm text-deuz-red">◆</span>
              <div>
                <h3 className="font-medium text-deuz-text">Expediente completo bajo solicitud</h3>
                <p className="mt-1 text-sm text-deuz-muted">Acta constitutiva, opiniones de cumplimiento y estados financieros.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="dossier" className={`${section} scroll-mt-16`}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <SectionHeading
              title="Dossier corporativo"
              intro="Presentación del grupo, capacidades, proyectos y documentación de cumplimiento en un solo PDF."
            />
          </div>
          <div className="lg:col-span-7">
            <Formulario
              origen="dossier"
              evento="dossier_descargado"
              enviar="Obtener dossier"
              campos={[
                { id: "nombre", label: "Nombre", autoComplete: "name" },
                { id: "empresa", label: "Empresa", autoComplete: "organization" },
                { id: "correo", label: "Correo", type: "email", autoComplete: "email", ancho: "full" },
              ]}
              exito={{
                titulo: "Gracias, ya tienes acceso.",
                conArchivo: "Descarga el dossier aquí. Un director te contactará si necesitas información adicional.",
                texto: "Te enviaremos el dossier por correo en breve.",
              }}
            />
          </div>
        </div>
      </section>

      <Process title="Garantías en cada fase de la obra." />
    </main>
  );
}
