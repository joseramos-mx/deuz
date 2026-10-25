// Datos corporativos de DEUZ. TODO DEUZ: validar todo lo marcado.

export const FUNDACION = null; // TODO DEUZ: año de fundación (ej. 1994)

export const stats = [
  { valor: "+30", etiqueta: "Años de experiencia" },
  { valor: "+7,000", etiqueta: "Proyectos entregados" }, // TODO DEUZ: aclarar si incluye suministros y añadir `nota`
  { valor: "+130", etiqueta: "Máquinas especializadas propias" },
  { valor: "+150", etiqueta: "Ferreteras abastecidas" },
  { valor: "+500", etiqueta: "Colaboradores" },
  { valor: "12", etiqueta: "Empresas" },
];

// Estados con obra. `obras`: número de obras en el estado (TODO DEUZ); null = no se muestra.
export const estadosConObra = [
  { nombre: "Durango", obras: null },
  { nombre: "Chihuahua", obras: null },
  { nombre: "Coahuila", obras: null },
  { nombre: "Sinaloa", obras: null },
  { nombre: "Tabasco", obras: null },
  { nombre: "Quintana Roo", obras: null },
];

// Logos de CLIENTES autorizados (no de empresas propias). Vacío = la franja se oculta.
// TODO DEUZ: agregar { nombre, logo: "/clientes/archivo.svg" }
export const clientes = [];

export const modeloIntegrado = [
  {
    titulo: "Insumos propios",
    texto: "Control de calidad y precio desde el origen, sin depender de terceros.",
  },
  {
    titulo: "Maquinaria propia",
    cifra: "+130",
    texto: "Disponibilidad inmediata y sin costos de renta.",
  },
  {
    titulo: "Personal propio",
    texto: "Misma cuadrilla de principio a fin, responsabilidad directa.",
  },
  {
    titulo: "Entrega llave en mano",
    texto: "Un solo responsable del proyecto, desde el terreno hasta el acta de entrega.",
  },
];

// TODO DEUZ: beneficio cuantificado real, ej. "hasta 15% menos costo que esquemas subcontratados". null = se oculta.
export const beneficioModelo = null;

export const proceso = [
  { fase: "Visita técnica", entregable: "Diagnóstico de sitio" },
  { fase: "Anteproyecto y presupuesto", entregable: "Propuesta con cronograma" },
  { fase: "Contrato y fianzas", entregable: "Garantías formales" },
  { fase: "Ejecución", entregable: "Reporte semanal con fotos y avance" },
  { fase: "Entrega", entregable: "Acta de entrega y planos as-built" },
  { fase: "Garantía", entregable: "Soporte posterior" },
];

// Respaldo y cumplimiento. `confirmado: false` = no se muestra hasta que DEUZ lo valide,
// para no publicar sellos o certificaciones que no se tienen.
export const respaldo = [
  { titulo: "Fianzas de cumplimiento", texto: "Garantía formal de cumplimiento en cada contrato.", confirmado: true },
  { titulo: "Seguro de responsabilidad civil", texto: "Cobertura ante daños a terceros durante la obra.", confirmado: false },
  { titulo: "REPSE", texto: "Registro de prestadoras de servicios especializados.", confirmado: false },
  { titulo: "Padrón de contratistas estatal", texto: "Registro vigente para obra pública estatal.", confirmado: false },
  { titulo: "Padrón de contratistas federal", texto: "Registro vigente para obra pública federal.", confirmado: false },
  { titulo: "Afiliación CMIC", texto: "Cámara Mexicana de la Industria de la Construcción.", confirmado: false },
  { titulo: "Certificación ISO 9001", texto: "Sistema de gestión de calidad.", confirmado: false },
].filter((r) => r.confirmado);

export const socios = [
  {
    nombre: "Manuel Bueno",
    cargo: "Director General y socio",
    foto: "/socios/manuel.jpeg",
    bio: "Más de 15 años liderando proyectos de infraestructura, vivienda y obra industrial a gran escala, con foco en transparencia y ejecución impecable.",
  },
  {
    nombre: "José Ramón Sida",
    cargo: "Socio fundador",
    foto: "/socios/sida.jpeg",
    bio: "Especialista en planeación y gestión de costos. Impulsa la innovación y la productividad en cada frente de obra.",
  },
  {
    nombre: "Cruz Arreola",
    cargo: "Socio fundador",
    foto: "/socios/cruz.jpeg",
    bio: "Experto en dirección de obras urbanas y eléctricas. Integra equipos multidisciplinarios para entregar valor en tiempo y forma.",
  },
  {
    nombre: "Rodolfo Arellano",
    cargo: "Socio fundador",
    foto: "/socios/arellano.jpeg",
    bio: "Estratega de alto impacto. Alinea visión comercial y operación para escalar proyectos con estándares de clase mundial.",
  },
];

// Empresas del grupo (nombres leídos de los logos). TODO DEUZ: confirmar nombres y giros,
// y completar las 12 empresas del organigrama.
export const empresasGrupo = [
  { nombre: "Ferretera Rodo", giro: "Ferretería y materiales", logo: "/logos/1.jpeg" },
  { nombre: "Electromateriales Prome", giro: "Material eléctrico", logo: "/logos/2.jpeg" },
  { nombre: "GL Asfaltos y Triturados", giro: "Asfaltos y agregados", logo: "/logos/3.jpeg" },
  { nombre: "Dgo Block", giro: "Block y prefabricados", logo: "/logos/4.jpeg" },
  { nombre: "LOGO Concretos", giro: "Concreto premezclado", logo: "/logos/5.jpeg" },
  { nombre: "Maelsa", giro: "Maquinaria y construcciones eléctricas", logo: "/logos/6.jpeg" },
  { nombre: "Cruza Tractoservicios", giro: "Logística y transporte", logo: "/logos/7.jpeg" },
  { nombre: "LOGO Concretos Mazatlán", giro: "Concreto premezclado", logo: "/logos/8.jpeg" },
  { nombre: "LOGO Viviendas", giro: "Vivienda", logo: "/logos/9.jpeg" },
  { nombre: "GCL", giro: "Urbanizaciones", logo: "/logos/10.jpeg" },
  { nombre: "LOGO Grupo Constructor", giro: "Construcción", logo: "/logos/11.jpeg" },
];

export const impacto = {
  porcentaje: "60%",
  titulo: "Reinvertimos el 60% en desarrollo social",
  texto:
    "Cada obra que construimos financia programas en las comunidades donde trabajamos: vivienda, espacios públicos y oportunidades de empleo local.",
  // TODO DEUZ: caso concreto real (nombre del programa, comunidad, cifra, foto)
  caso: null,
};

// TODO DEUZ: misión y visión oficiales (texto provisional)
export const mision =
  "Construir obras llave en mano que trasciendan, con estructura propia, transparencia en costos y compromiso con las comunidades.";
export const vision =
  "Ser el grupo constructor de referencia en el norte de México por escala, cumplimiento e impacto social.";
