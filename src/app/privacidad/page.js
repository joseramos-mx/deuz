import Legal from "@/components/Legal";

export const metadata = {
  title: "Aviso de privacidad",
  alternates: { canonical: "/privacidad" },
};

// TODO DEUZ: BORRADOR. Debe revisarlo el área legal y completarse con razón social,
// domicilio y correo del responsable antes de producción (LFPDPPP).
export default function PrivacidadPage() {
  return (
    <Legal
      titulo="Aviso de privacidad"
      actualizado="octubre de 2026"
      secciones={[
        {
          titulo: "Responsable",
          parrafos: [
            "DEUZ Grupo Empresarial (en adelante, “DEUZ”), con operaciones en Durango, México, es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
          ],
        },
        {
          titulo: "Datos que recabamos",
          parrafos: [
            "Datos de identificación y contacto (nombre, empresa, cargo, teléfono, WhatsApp y correo electrónico) y datos del proyecto que nos compartes (tipo de obra, ubicación, magnitud, etapa, fechas y rango de inversión). No recabamos datos personales sensibles.",
          ],
        },
        {
          titulo: "Finalidades",
          parrafos: [
            "Finalidades primarias: atender tu solicitud de cotización, elaborar la pre-propuesta, contactarte para dar seguimiento, agendar visitas técnicas y, en su caso, formalizar la relación contractual; evaluar registros de proveedores y postulaciones de empleo.",
            "Finalidades secundarias: enviarte información sobre nuestros servicios y proyectos. Puedes oponerte a ellas en cualquier momento escribiéndonos por los medios de contacto de este sitio.",
          ],
        },
        {
          titulo: "Transferencias",
          parrafos: [
            "Tus datos pueden compartirse con las empresas del grupo DEUZ para atender tu solicitud, y con proveedores que nos prestan servicios de almacenamiento, gestión de clientes y comunicación, quienes están obligados a tratarlos con confidencialidad. No vendemos tus datos personales.",
          ],
        },
        {
          titulo: "Derechos ARCO",
          parrafos: [
            "Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos, así como revocar tu consentimiento, enviando una solicitud por los medios de contacto publicados en este sitio, indicando tu nombre, el derecho que deseas ejercer y un medio para responderte.",
          ],
        },
        {
          titulo: "Cookies y tecnologías similares",
          parrafos: [
            "Este sitio puede utilizar cookies y herramientas de analítica para conocer cómo se usa y mejorar la experiencia. El progreso del cotizador se guarda solo en tu navegador. Puedes deshabilitar las cookies desde la configuración de tu navegador.",
          ],
        },
        {
          titulo: "Cambios al aviso",
          parrafos: ["Cualquier cambio a este aviso se publicará en esta misma página."],
        },
      ]}
    />
  );
}
