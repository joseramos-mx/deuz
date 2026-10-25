import { ogImagen, OG_SIZE } from "@/lib/og";

export const alt = "DEUZ Grupo Empresarial · Obras llave en mano que trascienden";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImagen({ titulo: "Obras llave en mano que trascienden." });
}
