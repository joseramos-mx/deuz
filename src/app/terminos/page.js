import Legal from "@/components/Legal";

export const metadata = {
  title: "Términos y condiciones",
  alternates: { canonical: "/terminos" },
};

// TODO DEUZ: BORRADOR. Debe revisarlo el área legal antes de producción.
export default function TerminosPage() {
  return (
    <Legal
      titulo="Términos y condiciones"
      actualizado="octubre de 2026"
      secciones={[
        {
          titulo: "Uso del sitio",
          parrafos: [
            "Al utilizar este sitio aceptas estos términos. El contenido tiene fines informativos sobre los servicios de DEUZ Grupo Empresarial y puede cambiar sin previo aviso.",
          ],
        },
        {
          titulo: "Cotizador y pre-propuestas",
          parrafos: [
            "Las estimaciones, rangos de inversión y plazos que genera el cotizador son preliminares y referenciales. No constituyen una oferta vinculante ni un contrato; están sujetos a visita técnica, proyecto ejecutivo y propuesta formal firmada por DEUZ. Cada pre-propuesta tiene una vigencia de 15 días naturales.",
          ],
        },
        {
          titulo: "Propiedad intelectual",
          parrafos: [
            "Las marcas, logotipos, fotografías y textos de este sitio son propiedad de DEUZ o de sus respectivos titulares y no pueden reproducirse sin autorización por escrito.",
          ],
        },
        {
          titulo: "Responsabilidad",
          parrafos: [
            "DEUZ procura que la información del sitio sea correcta y esté actualizada, pero no garantiza que esté libre de errores. DEUZ no será responsable por decisiones tomadas únicamente con base en la información de este sitio.",
          ],
        },
        {
          titulo: "Legislación aplicable",
          parrafos: ["Estos términos se rigen por las leyes de los Estados Unidos Mexicanos."],
        },
      ]}
    />
  );
}
