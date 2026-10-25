// Motor de estimación del cotizador (DESIGN.md §6).
// TODO DEUZ: reemplazar TODOS los valores por costos reales validados antes de producción.
// Mientras un costo esté en 0, el resultado se muestra sin montos para ese tipo.

// MXN por unidad, por nivel de especificación
export const costoBase = {
  nave_industrial: { m2: { estandar: 0, medio: 0, premium: 0 } },
  edificacion_vertical: { m2: { estandar: 0, medio: 0, premium: 0 } },
  casa_habitacion: { m2: { estandar: 0, medio: 0, premium: 0 } },
  urbanizacion: {
    m2: { estandar: 0, medio: 0, premium: 0 },
    km: { estandar: 0, medio: 0, premium: 0 },
  },
  obra_publica: {
    m2: { estandar: 0, medio: 0, premium: 0 },
    km: { estandar: 0, medio: 0, premium: 0 },
  },
  concretos_asfaltos: {
    m2: { estandar: 0, medio: 0, premium: 0 },
    km: { estandar: 0, medio: 0, premium: 0 },
  },
  energia: {
    kVA: { estandar: 0, medio: 0, premium: 0 },
    km: { estandar: 0, medio: 0, premium: 0 },
  },
};

export const factorRegional = {
  Durango: 1,
  Chihuahua: 1,
  Coahuila: 1,
  "Quintana Roo": 1,
  Tabasco: 1,
  Sinaloa: 1,
  Otro: 1,
};

// Unidades ejecutadas por semana, para estimar plazo. 0 = el plazo se define en visita técnica.
export const rendimientoSemanal = {
  nave_industrial: { m2: 0 },
  edificacion_vertical: { m2: 0 },
  casa_habitacion: { m2: 0 },
  urbanizacion: { m2: 0, km: 0 },
  obra_publica: { m2: 0, km: 0 },
  concretos_asfaltos: { m2: 0, km: 0 },
  energia: { kVA: 0, km: 0 },
};

export const margenRango = 0.2;
