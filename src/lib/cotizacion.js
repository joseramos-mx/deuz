// Lógica del cotizador compartida entre la API y la generación del PDF.
import { z } from "zod";
import { costoBase, factorRegional, rendimientoSemanal, margenRango } from "@/data/costos";
import {
  tiposObra,
  getTipo,
  especificaciones,
  etapas,
  terrenos,
  inicios,
  financiamientos,
  rangosInversion,
  estadosMexico,
  UNIDADES,
} from "@/data/cotizador";
import { proyectos } from "@/data/proyectos";

z.config(z.locales.es());

const ids = (arr) => arr.map((o) => o.id);
const enumDe = (arr) => z.enum(ids(arr));

export const cotizacionSchema = z
  .object({
    tipo: enumDe(tiposObra),
    estado: z.enum(estadosMexico),
    municipio: z.string().trim().min(2).max(80),
    unidad: z.enum(Object.keys(UNIDADES)).optional(),
    magnitud: z.coerce.number().positive().max(1e9).optional(),
    viviendas: z.coerce.number().int().positive().max(1e6).optional(),
    m2Promedio: z.coerce.number().positive().max(1e5).optional(),
    descripcion: z.string().trim().max(1000).optional(),
    especificacion: enumDe(especificaciones),
    etapa: enumDe(etapas),
    terreno: enumDe(terrenos),
    inicio: enumDe(inicios),
    financiamiento: enumDe(financiamientos),
    inversion: enumDe(rangosInversion),
    nombre: z.string().trim().min(2).max(100),
    empresa: z.string().trim().min(1).max(120),
    cargo: z.string().trim().min(2).max(80),
    whatsapp: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{10,20}$/, "WhatsApp inválido"),
    correo: z.string().trim().email(),
    privacidad: z.literal(true),
    origen: z.enum(["cotizador", "solucion", "dossier"]).default("cotizador"),
  })
  .superRefine((d, ctx) => {
    const tipo = getTipo(d.tipo);
    if (tipo.magnitud === "unidades") {
      if (!d.unidad || !tipo.unidades.includes(d.unidad))
        ctx.addIssue({ code: "custom", path: ["unidad"], message: "Unidad inválida" });
      if (!d.magnitud) ctx.addIssue({ code: "custom", path: ["magnitud"], message: "Indica la magnitud" });
    }
    if (tipo.magnitud === "viviendas") {
      if (!d.viviendas) ctx.addIssue({ code: "custom", path: ["viviendas"], message: "Indica el número de viviendas" });
      if (!d.m2Promedio) ctx.addIssue({ code: "custom", path: ["m2Promedio"], message: "Indica los m² promedio" });
    }
    if (tipo.magnitud === "libre" && !d.descripcion)
      ctx.addIssue({ code: "custom", path: ["descripcion"], message: "Describe lo que necesitas" });
  });

/** Magnitud normalizada a la unidad de costo: { valor, unidad } o null si es descripción libre. */
export function magnitudDe(d) {
  const tipo = getTipo(d.tipo);
  if (tipo.magnitud === "viviendas") return { valor: d.viviendas * d.m2Promedio, unidad: "m2" };
  if (tipo.magnitud === "unidades") return { valor: d.magnitud, unidad: d.unidad };
  return null;
}

export const leyenda = () =>
  `Estimación preliminar ±${Math.round(margenRango * 100)}%, sujeta a visita técnica y proyecto ejecutivo.`;

/**
 * Estimación paramétrica. `montos` es null si MOSTRAR_MONTOS no está activo o si el
 * costo del tipo sigue en 0; `plazo` es null si no hay rendimiento cargado.
 */
export function estimar(d, { mostrarMontos }) {
  const mag = magnitudDe(d);
  if (!mag) return { montos: null, plazo: null, magnitud: null };

  const costo = costoBase[d.tipo]?.[mag.unidad]?.[d.especificacion] ?? 0;
  const factor = factorRegional[d.estado] ?? factorRegional.Otro;
  let montos = null;
  if (mostrarMontos && costo > 0) {
    const base = mag.valor * costo * factor;
    montos = { min: base * (1 - margenRango), max: base * (1 + margenRango), base };
  }

  const rend = rendimientoSemanal[d.tipo]?.[mag.unidad] ?? 0;
  let plazo = null;
  if (rend > 0) {
    const semanas = mag.valor / rend;
    plazo = {
      min: Math.max(1, Math.round(semanas * (1 - margenRango))),
      max: Math.max(2, Math.ceil(semanas * (1 + margenRango))),
    };
  }

  return { montos, plazo, magnitud: mag };
}

const PUNTOS = {
  inversion: { mas50: 40, "10a50": 30, "2a10": 15, menos2: 5, definir: 0 },
  inicio: { menos3: 25, "3a6": 15, "6a12": 5, mas12: 0 },
  etapa: { permisos: 20, ejecutivo: 15, anteproyecto: 8, idea: 2 },
};
const CARGO_DECISOR = /director|duen[oa]|gerente|socio|ceo/;

export function leadScore(d) {
  const cargo = d.cargo.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const score =
    PUNTOS.inversion[d.inversion] +
    PUNTOS.inicio[d.inicio] +
    PUNTOS.etapa[d.etapa] +
    (CARGO_DECISOR.test(cargo) ? 15 : 0);
  const clase = score >= 70 ? "A" : score >= 40 ? "B" : "C";
  return { score, clase };
}

/**
 * Folio legible y ordenable por tiempo, ej. DEUZ-2026-MB3K9Q.
 * TODO: para un consecutivo real (DEUZ-2026-0142) se necesita un contador persistente
 * (base de datos o KV); el webhook puede devolver uno en `folio` y la API lo respeta.
 */
export function generarFolio(fecha = new Date()) {
  const sufijo = (fecha.getTime() % 36 ** 6).toString(36).toUpperCase().padStart(6, "0");
  return `DEUZ-${fecha.getFullYear()}-${sufijo}`;
}

/** Dos proyectos del mismo segmento, priorizando magnitud cercana; completa con destacados. */
export function proyectosSimilares(d, n = 2) {
  const { segmento } = getTipo(d.tipo);
  const mag = magnitudDe(d);
  const cercania = (p) =>
    mag && p.magnitud && p.magnitud.unidad === mag.unidad
      ? Math.abs(Math.log(p.magnitud.valor / mag.valor))
      : Infinity;

  const mismos = proyectos.filter((p) => p.segmento === segmento).sort((a, b) => cercania(a) - cercania(b));
  const resto = proyectos.filter((p) => p.segmento !== segmento && p.destacado);
  return [...mismos, ...resto].slice(0, n);
}
