// Navegación principal (DESIGN.md §3).
import { segmentos } from "./soluciones";

export const soluciones = segmentos.map((s) => ({
  label: s.nombre,
  descripcion: s.valor,
  href: `/soluciones/${s.slug}`,
}));

export const navPrincipal = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Grupo", href: "/grupo" },
  { label: "Respaldo", href: "/respaldo" },
  { label: "Contacto", href: "/contacto" },
];

// Páginas secundarias (footer)
export const navSecundaria = [
  { label: "Capacidades", href: "/capacidades" },
  { label: "Impacto social", href: "/impacto" },
  { label: "Proveedores", href: "/proveedores" },
  { label: "Bolsa de trabajo", href: "/trabajo" },
];

export const ctaCotizar = {
  label: "Cotizar proyecto",
  href: "/cotizador",
};

export const navLegal = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Aviso de privacidad", href: "/privacidad" },
];
