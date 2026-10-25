import { ogImagen, OG_SIZE } from "@/lib/og";
import { proyectos, getProyecto } from "@/data/proyectos";

export const alt = "DEUZ Grupo Empresarial · Caso de estudio";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const p = getProyecto((await params).slug);
  return ogImagen({
    titulo: p.titulo,
    etiqueta: `CASO DE ESTUDIO · ${p.estado.toUpperCase()}`,
    pie: p.etiquetas.join(" · ").toUpperCase(),
  });
}
