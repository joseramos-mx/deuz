import { PageHero, SectionHeading, container, section } from "@/components/system";
import Formulario from "@/components/Formulario";
import { areas } from "@/lib/formularios";

export const metadata = {
  title: "Bolsa de trabajo",
  description: "Únete a los más de 500 colaboradores de DEUZ Grupo Empresarial.",
  alternates: { canonical: "/trabajo" },
};

export default function TrabajoPage() {
  return (
    <main>
      <PageHero
        title="Construye con nosotros."
        intro="Más de 500 colaboradores en ingeniería, operación de maquinaria, logística y administración. Déjanos tus datos y te buscamos cuando haya una vacante para ti."
      />
      <section className={section}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <SectionHeading title="Postúlate" intro="Si tienes CV en línea (LinkedIn, Drive), pega el enlace." />
          </div>
          <div className="lg:col-span-8">
            <Formulario
              origen="trabajo"
              enviar="Enviar postulación"
              campos={[
                { id: "nombre", label: "Nombre completo", autoComplete: "name" },
                { id: "correo", label: "Correo", type: "email", autoComplete: "email" },
                { id: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
                { id: "area", label: "Área de interés", opciones: areas },
                { id: "cv", label: "Enlace a tu CV", type: "url", opcional: true, ancho: "full" },
                { id: "mensaje", label: "Cuéntanos de tu experiencia", multiline: true, opcional: true },
              ]}
              exito={{ titulo: "Postulación recibida.", texto: "Gracias. Recursos Humanos te contactará cuando haya una vacante acorde a tu perfil." }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
