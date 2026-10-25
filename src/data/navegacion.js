// Navegación principal (DESIGN.md §3).
// TODO etapa 4: mientras no existan las páginas internas, los enlaces apuntan a
// las secciones de la home. Al crear cada página, cambiar `href` por la ruta indicada.

export const soluciones = [
  {
    label: "Vivienda y desarrollo",
    descripcion: "Casas habitación, edificación vertical y urbanización.",
    href: "/#soluciones", // → /soluciones/vivienda
  },
  {
    label: "Naves e industria",
    descripcion: "Naves industriales, losas y suministro de materiales.",
    href: "/#soluciones", // → /soluciones/industrial
  },
  {
    label: "Infraestructura y obra pública",
    descripcion: "Vialidades, pavimentos, urbanización y maquinaria pesada.",
    href: "/#soluciones", // → /soluciones/infraestructura
  },
  {
    label: "Energía y electrificación",
    descripcion: "Media y baja tensión, líneas y alumbrado.",
    href: "/#soluciones", // → /soluciones/energia
  },
];

export const navPrincipal = [
  { label: "Proyectos", href: "/#proyectos" }, // → /proyectos
  { label: "Grupo", href: "/#grupo" }, // → /grupo
  { label: "Respaldo", href: "/#respaldo" }, // → /respaldo
  { label: "Contacto", href: "/#contacto" }, // → /contacto
];

export const ctaCotizar = {
  label: "Cotizar proyecto",
  href: "/#cotizador", // → /cotizador (etapa 3)
};

export const navLegal = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Aviso de privacidad", href: "/privacidad" },
];
