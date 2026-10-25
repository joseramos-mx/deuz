// Segmentos de negocio (DESIGN.md §4.3 y §5.1). Cada uno genera /soluciones/[slug].

export const CONSULTORIA = "Consultoría técnica y presupuestal";

export const segmentos = [
  {
    slug: "vivienda",
    nombre: "Vivienda y desarrollo",
    corto: "Vivienda",
    valor: "Fraccionamientos y vivienda vertical entregados llave en mano, con insumos propios.",
    servicios: ["Casas habitación", "Edificación vertical", "Urbanización y terracerías"],
    imagen: "/photos/IMG_8781.webp",
    tipoCotizador: "casa_habitacion",
    seo: {
      title: "Construcción de vivienda y fraccionamientos en Durango",
      description:
        "Casas habitación, edificación vertical y urbanización llave en mano para desarrolladores inmobiliarios en Durango y todo México.",
    },
    faq: [
      // TODO DEUZ: validar respuestas
      {
        p: "¿Construyen para desarrolladores o también para particulares?",
        r: "Trabajamos principalmente con desarrolladores inmobiliarios en proyectos de vivienda en serie y edificación vertical.",
      },
      {
        p: "¿Incluyen la urbanización del fraccionamiento?",
        r: "Sí. Podemos ejecutar terracerías, redes, vialidades y edificación como un solo contrato llave en mano.",
      },
      {
        p: "¿Cómo garantizan tiempos en vivienda en serie?",
        r: "Con insumos de plantas propias, maquinaria propia y cuadrillas fijas, sin depender de la disponibilidad de terceros.",
      },
    ],
  },
  {
    slug: "industrial",
    nombre: "Naves e industria",
    corto: "Industrial",
    valor: "Naves y losas industriales con maquinaria propia y control del concreto desde la planta.",
    servicios: ["Naves industriales", "Concretos y asfaltos (losas industriales)", "Materiales y suministros"],
    imagen: "/photos/IMG_8792.webp",
    tipoCotizador: "nave_industrial",
    seo: {
      title: "Construcción de naves industriales en Durango",
      description:
        "Naves industriales, losas de concreto y suministro de materiales llave en mano para plantas, centros logísticos y corporativos.",
    },
    faq: [
      {
        p: "¿Hacen el proyecto ejecutivo de la nave?",
        r: "Sí. Podemos partir de tu idea o de un anteproyecto y desarrollar el proyecto ejecutivo junto con el presupuesto.",
      },
      {
        p: "¿Producen el concreto de las losas?",
        r: "Contamos con plantas propias de concreto, lo que nos permite controlar calidad y programa de colados.",
      },
      {
        p: "¿Trabajan fuera de Durango?",
        r: "Sí. Tenemos obra en varios estados del norte y sureste del país.",
      },
    ],
  },
  {
    slug: "infraestructura",
    nombre: "Infraestructura y obra pública",
    corto: "Infraestructura",
    valor: "Vialidades, pavimentos y urbanización con flota propia de maquinaria pesada.",
    servicios: [
      "Obra pública y privada",
      "Urbanización",
      "Concretos y asfaltos (pavimentos)",
      "Logística y maquinaria pesada",
    ],
    imagen: "/photos/IMG_8785.webp",
    tipoCotizador: "urbanizacion",
    seo: {
      title: "Infraestructura, pavimentos y obra pública en Durango",
      description:
        "Urbanización, vialidades, pavimentos de concreto y asfalto y obra pública con maquinaria pesada propia en Durango y México.",
    },
    faq: [
      {
        p: "¿Participan en licitaciones públicas?",
        r: "Sí. Ejecutamos obra pública y privada. Consulta nuestro respaldo documental en la sección de cumplimiento.",
      },
      {
        p: "¿Cuentan con maquinaria propia?",
        r: "Sí, más de 130 máquinas especializadas propias, lo que elimina costos de renta y tiempos de espera.",
      },
      {
        p: "¿Producen asfalto y concreto?",
        r: "Contamos con plantas de insumos propias para pavimentos de concreto y asfalto.",
      },
    ],
  },
  {
    slug: "energia",
    nombre: "Energía y electrificación",
    corto: "Energía",
    valor: "Media y baja tensión, líneas y alumbrado para industria, carreteras y desarrollos.",
    servicios: ["Media tensión", "Baja tensión", "Líneas de distribución", "Alumbrado público y vial"],
    imagen: "/photos/ilu.jpg",
    tipoCotizador: "energia",
    seo: {
      title: "Electrificación en media y baja tensión en Durango",
      description:
        "Electrificación en media y baja tensión, líneas de distribución y alumbrado para parques industriales, carreteras y desarrollos.",
    },
    faq: [
      {
        p: "¿Qué tipo de proyectos eléctricos realizan?",
        r: "Electrificación en media y baja tensión, líneas de distribución, subestaciones y alumbrado público, vial y deportivo.",
      },
      {
        p: "¿Hacen trámites ante CFE?",
        r: "Te acompañamos en el proceso técnico. Confírmalo con nuestro equipo durante la visita técnica.",
      },
      {
        p: "¿Trabajan en carreteras y túneles?",
        r: "Sí, por ejemplo en la electrificación de la carretera Durango–Mazatlán.",
      },
    ],
  },
];

export const getSegmento = (slug) => segmentos.find((s) => s.slug === slug);
