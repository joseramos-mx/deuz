import { PageHero, SectionHeading, container, section } from "@/components/system";
import Formulario from "@/components/Formulario";
import { giros } from "@/lib/formularios";
import { estadosMexico } from "@/data/cotizador";

export const metadata = {
  title: "Registro de proveedores",
  description: "Registra a tu empresa como proveedor de DEUZ Grupo Empresarial.",
  alternates: { canonical: "/proveedores" },
};

export default function ProveedoresPage() {
  return (
    <main>
      <PageHero
        title="Sé proveedor de DEUZ."
        intro="Buscamos proveedores confiables de materiales, equipo y servicios especializados para nuestras obras en todo el país."
      />
      <section className={section}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <SectionHeading title="Registro" intro="Nuestro equipo de compras revisa cada solicitud y te contacta si hay oportunidad." />
          </div>
          <div className="lg:col-span-8">
            <Formulario
              origen="proveedor"
              enviar="Enviar registro"
              campos={[
                { id: "empresa", label: "Empresa", autoComplete: "organization" },
                { id: "contacto", label: "Nombre de contacto", autoComplete: "name" },
                { id: "correo", label: "Correo", type: "email", autoComplete: "email" },
                { id: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
                { id: "giro", label: "Giro", opciones: giros },
                { id: "estado", label: "Estado", opciones: estadosMexico },
                { id: "mensaje", label: "Productos o servicios", multiline: true, opcional: true },
              ]}
              exito={{ titulo: "Registro recibido.", texto: "Gracias. Compras revisará tu información y te contactará si hay oportunidad." }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
