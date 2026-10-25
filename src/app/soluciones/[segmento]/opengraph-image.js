import { ogImagen, OG_SIZE } from "@/lib/og";
import { segmentos, getSegmento } from "@/data/soluciones";

export const alt = "DEUZ Grupo Empresarial · Soluciones";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return segmentos.map((s) => ({ segmento: s.slug }));
}

export default async function Image({ params }) {
  const s = getSegmento((await params).segmento);
  return ogImagen({ titulo: s.nombre, etiqueta: "SOLUCIONES · DEUZ", pie: s.servicios.join(" · ").toUpperCase() });
}
