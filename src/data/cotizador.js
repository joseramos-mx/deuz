// Opciones del cotizador (DESIGN.md §6). Los `id` se usan en la API y en costos.js.

export const UNIDADES = { m2: "m²", km: "km", kVA: "kVA" };

// modo de magnitud: "unidades" (elige unidad), "viviendas" (número × m² promedio), "libre" (sin estimación)
export const tiposObra = [
  { id: "urbanizacion", label: "Urbanización y terracerías", segmento: "infraestructura", magnitud: "unidades", unidades: ["m2", "km"] },
  { id: "obra_publica", label: "Obra pública y privada", segmento: "infraestructura", magnitud: "unidades", unidades: ["m2", "km"] },
  { id: "energia", label: "Energía y electrificación", segmento: "energia", magnitud: "unidades", unidades: ["kVA", "km"] },
  { id: "concretos_asfaltos", label: "Concretos y asfaltos", segmento: "infraestructura", magnitud: "unidades", unidades: ["m2", "km"] },
  { id: "materiales", label: "Materiales y suministros", segmento: "industrial", magnitud: "libre" },
  { id: "casa_habitacion", label: "Casas habitación", segmento: "vivienda", magnitud: "viviendas", unidades: ["m2"] },
  { id: "edificacion_vertical", label: "Edificación vertical", segmento: "vivienda", magnitud: "unidades", unidades: ["m2"] },
  { id: "nave_industrial", label: "Naves industriales", segmento: "industrial", magnitud: "unidades", unidades: ["m2"] },
  { id: "logistica", label: "Logística y maquinaria", segmento: "infraestructura", magnitud: "libre" },
];

export const getTipo = (id) => tiposObra.find((t) => t.id === id);

export const especificaciones = [
  { id: "estandar", label: "Estándar", detalle: "Funcional y eficiente en costo" },
  { id: "medio", label: "Medio", detalle: "Mejores acabados y equipamiento" },
  { id: "premium", label: "Premium", detalle: "Máxima especificación" },
];

export const etapas = [
  { id: "idea", label: "Idea" },
  { id: "anteproyecto", label: "Anteproyecto" },
  { id: "ejecutivo", label: "Proyecto ejecutivo" },
  { id: "permisos", label: "Permisos listos" },
];

export const terrenos = [
  { id: "si", label: "Sí" },
  { id: "no", label: "No" },
  { id: "proceso", label: "En proceso" },
];

export const inicios = [
  { id: "menos3", label: "Menos de 3 meses" },
  { id: "3a6", label: "3 a 6 meses" },
  { id: "6a12", label: "6 a 12 meses" },
  { id: "mas12", label: "Más de 12 meses" },
];

export const financiamientos = [
  { id: "propios", label: "Recursos propios" },
  { id: "credito", label: "Crédito" },
  { id: "licitacion", label: "Licitación pública" },
  { id: "definir", label: "Por definir" },
];

export const rangosInversion = [
  { id: "menos2", label: "Menos de 2 MDP" },
  { id: "2a10", label: "2 a 10 MDP" },
  { id: "10a50", label: "10 a 50 MDP" },
  { id: "mas50", label: "Más de 50 MDP" },
  { id: "definir", label: "Por definir" },
];

export const estadosMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
  "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero",
  "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro",
  "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
  "Yucatán", "Zacatecas",
];

// TODO DEUZ: validar alcance estándar por tipo de obra
export const alcance = {
  incluye: [
    "Visita técnica y diagnóstico de sitio",
    "Proyecto ejecutivo y presupuesto detallado",
    "Insumos de plantas propias",
    "Maquinaria y personal propios",
    "Reporte semanal con fotos y avance",
    "Acta de entrega y planos as-built",
  ],
  noIncluye: [
    "Compra del terreno",
    "Derechos, licencias y pagos a dependencias",
    "Mobiliario y equipamiento no especificado",
    "Cambios de alcance posteriores al contrato",
  ],
};

export const siguientesPasos = [
  { paso: "Llamada con un ingeniero", plazo: "Menos de 24 h" },
  { paso: "Visita técnica al sitio", plazo: "Semana 1" },
  { paso: "Propuesta formal con cronograma", plazo: "Semana 2 a 3" },
  { paso: "Contrato y fianzas", plazo: "Al aprobar" },
];

export const VALIDEZ_DIAS = 15;
