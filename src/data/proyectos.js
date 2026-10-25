// Portafolio de proyectos (DESIGN.md §5.2). Agregar un caso = agregar un objeto aquí.
// TODO DEUZ: completar fichas reales (año, municipio, magnitud, plazos, rango de inversión,
// testimonio y galería). Los campos vacíos simplemente no se muestran.

/**
 * @typedef {Object} Proyecto
 * @property {string} slug
 * @property {string} titulo
 * @property {'vivienda'|'industrial'|'infraestructura'|'energia'} segmento
 * @property {string[]} etiquetas
 * @property {string} estado
 * @property {string} [municipio]
 * @property {number} [anio]
 * @property {{ valor: number, unidad: 'm2'|'km'|'kVA'|'viviendas' }} [magnitud]
 * @property {number} [plazoComprometidoSemanas]
 * @property {number} [plazoRealSemanas]
 * @property {string} [rangoInversion]   solo si DEUZ lo autoriza
 * @property {string} [cliente]
 * @property {string} [ejecuta]          empresa del grupo que ejecutó la obra
 * @property {string} resumen
 * @property {string} reto
 * @property {string} solucion
 * @property {{ texto: string, autor: string, cargo: string }} [testimonio]
 * @property {{ fecha: string, hito: string }[]} [lineaTiempo]
 * @property {string[]} imagenes
 * @property {boolean} destacado
 */

/** @type {Proyecto[]} */
export const proyectos = [
  {
    slug: "electrificacion-clid",
    titulo: "Electrificación CLID, centro logístico industrial",
    segmento: "energia",
    etiquetas: ["Electrificación", "Iluminación"],
    estado: "Durango",
    municipio: "Durango",
    resumen: "Infraestructura eléctrica e iluminación para un parque logístico industrial.",
    reto: "Dotar de energía e iluminación a un centro logístico industrial en desarrollo, coordinando la obra eléctrica con la urbanización del parque.",
    solucion: "Suministro y montaje de infraestructura eléctrica en media y baja tensión y alumbrado de vialidades, con maquinaria y personal propios.",
    imagenes: ["/photos/4985824.jpg"],
    destacado: true,
  },
  {
    slug: "electrificacion-carretera-durango-mazatlan",
    titulo: "Electrificación carretera Durango–Mazatlán",
    segmento: "energia",
    etiquetas: ["Electrificación", "Carreteras"],
    estado: "Durango",
    resumen: "Electrificación e iluminación de tramos de la autopista Durango–Mazatlán.",
    reto: "Trabajar en una de las carreteras de montaña más complejas del país, con túneles y frentes de obra de difícil acceso.",
    solucion: "Instalación eléctrica e iluminación en tramos carreteros y túneles, con logística propia para mover equipo y material a cada frente.",
    imagenes: ["/photos/ener.jpg", "/photos/mezquital.jpg"],
    destacado: true,
  },
  {
    slug: "construccion-2500-viviendas",
    titulo: "Construcción de +2,500 viviendas",
    segmento: "vivienda",
    etiquetas: ["Vivienda", "Construcción"],
    estado: "Durango",
    magnitud: { valor: 2500, unidad: "viviendas" },
    ejecuta: "LOGO Viviendas", // TODO DEUZ: confirmar
    resumen: "Desarrollo de vivienda con urbanización, edificación y entrega llave en mano.",
    reto: "Entregar miles de viviendas con calidad constante y en los tiempos comprometidos con las familias y los desarrolladores.",
    solucion: "Modelo integrado: concreto y block de plantas propias, maquinaria propia para urbanización y cuadrillas propias de principio a fin.",
    imagenes: ["/photos/IMG_8781.webp", "/photos/IMG_8774.webp", "/photos/IMG_8780.webp"],
    destacado: true,
  },
  {
    slug: "distribucion-cementos-moctezuma",
    titulo: "Distribución de Cementos Moctezuma en Durango y Mazatlán",
    segmento: "infraestructura",
    etiquetas: ["Logística", "Materiales"],
    estado: "Durango",
    cliente: "Cementos Moctezuma", // TODO DEUZ: confirmar autorización para mostrar al cliente
    resumen: "Logística y distribución de cemento en Durango y Mazatlán con flota propia.",
    reto: "Abastecer de forma continua a obras y distribuidores en dos plazas separadas por la sierra.",
    solucion: "Flota propia de tractocamiones y operación logística dedicada, con trazabilidad de cada entrega.",
    imagenes: ["/photos/IMG_8775.webp", "/photos/IMG_8776.webp"],
    destacado: true,
  },
];

export const getProyecto = (slug) => proyectos.find((p) => p.slug === slug);

export const proyectosPorSegmento = (segmento) => proyectos.filter((p) => p.segmento === segmento);

export const proyectosDestacados = () => proyectos.filter((p) => p.destacado);
