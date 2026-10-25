import { abs } from "@/lib/seo";
import { segmentos } from "@/data/soluciones";
import { proyectos } from "@/data/proyectos";

const ESTATICAS = [
  ["/", 1, "weekly"],
  ["/cotizador", 0.9, "monthly"],
  ["/proyectos", 0.8, "weekly"],
  ["/grupo", 0.7, "monthly"],
  ["/capacidades", 0.7, "monthly"],
  ["/respaldo", 0.7, "monthly"],
  ["/impacto", 0.5, "monthly"],
  ["/contacto", 0.6, "yearly"],
  ["/proveedores", 0.3, "yearly"],
  ["/trabajo", 0.3, "monthly"],
  ["/terminos", 0.1, "yearly"],
  ["/privacidad", 0.1, "yearly"],
];

export default function sitemap() {
  const ahora = new Date();
  return [
    ...ESTATICAS.map(([path, priority, changeFrequency]) => ({ url: abs(path), lastModified: ahora, changeFrequency, priority })),
    ...segmentos.map((s) => ({ url: abs(`/soluciones/${s.slug}`), lastModified: ahora, changeFrequency: "monthly", priority: 0.9 })),
    ...proyectos.map((p) => ({
      url: abs(`/proyectos/${p.slug}`),
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.6,
      images: p.imagenes.map((i) => abs(i)),
    })),
  ];
}
