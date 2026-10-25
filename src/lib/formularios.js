// Formularios secundarios (dossier, proveedores, bolsa de trabajo). Todos llegan al
// mismo webhook que el cotizador, distinguidos por `origen`.
import { z } from "zod";
import { estadosMexico } from "@/data/cotizador";

z.config(z.locales.es());

const texto = (min = 2, max = 120) => z.string().trim().min(min).max(max);
const telefono = z.string().trim().regex(/^\+?[\d\s()-]{10,20}$/, "Teléfono inválido");
const correo = z.string().trim().email();

export const giros = [
  "Materiales de construcción",
  "Acero y estructuras",
  "Material eléctrico",
  "Maquinaria y refacciones",
  "Combustibles y lubricantes",
  "Servicios especializados",
  "Otro",
];

export const areas = ["Ingeniería y obra", "Operación de maquinaria", "Administración", "Ventas", "Logística", "Otra"];

export const esquemas = {
  dossier: z.object({
    nombre: texto(),
    empresa: texto(1),
    correo,
    privacidad: z.literal(true),
  }),
  proveedor: z.object({
    empresa: texto(1),
    contacto: texto(),
    correo,
    telefono,
    giro: z.enum(giros),
    estado: z.enum(estadosMexico),
    mensaje: z.string().trim().max(1500).optional(),
    privacidad: z.literal(true),
  }),
  trabajo: z.object({
    nombre: texto(),
    correo,
    telefono,
    area: z.enum(areas),
    cv: z.string().trim().url("Pega un enlace válido (LinkedIn, Drive, etc.)").optional().or(z.literal("")),
    mensaje: z.string().trim().max(1500).optional(),
    privacidad: z.literal(true),
  }),
};
