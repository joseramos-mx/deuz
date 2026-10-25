import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseCard, PageHero, SectionHeading, StatBar, container, section } from "@/components/system";
import FinalCTA from "@/components/home/FinalCTA";
import { proyectos, getProyecto } from "@/data/proyectos";
import { getSegmento } from "@/data/soluciones";
import { fmtMagnitud } from "@/lib/formato";

export const dynamicParams = false;

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = getProyecto((await params).slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumen,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: { title: p.titulo, description: p.resumen, images: p.imagenes.slice(0, 1).map((url) => ({ url })) },
  };
}

export default async function ProyectoPage({ params }) {
  const p = getProyecto((await params).slug);
  if (!p) notFound();

  const segmento = getSegmento(p.segmento);
  const ficha = [
    ["Segmento", segmento?.nombre],
    ["Ubicación", [p.municipio, p.estado].filter(Boolean).join(", ")],
    ["Año", p.anio],
    ["Magnitud", fmtMagnitud(p.magnitud)],
    ["Cliente", p.cliente],
    ["Ejecuta", p.ejecuta],
    ["Inversión", p.rangoInversion],
    ["Servicios", p.etiquetas.join(", ")],
  ].filter(([, v]) => v);

  const cifras = [
    p.magnitud && { valor: p.magnitud.valor.toLocaleString("es-MX"), etiqueta: fmtMagnitud(p.magnitud).split(" ").slice(1).join(" ") },
    p.plazoComprometidoSemanas && { valor: `${p.plazoComprometidoSemanas} sem`, etiqueta: "Plazo comprometido" },
    p.plazoRealSemanas && { valor: `${p.plazoRealSemanas} sem`, etiqueta: "Plazo real" },
    p.anio && { valor: String(p.anio), etiqueta: "Año de entrega" },
  ].filter(Boolean);

  const relacionados = proyectos
    .filter((o) => o.slug !== p.slug)
    .sort((a, b) => (b.segmento === p.segmento) - (a.segmento === p.segmento))
    .slice(0, 3);

  return (
    <main>
      <PageHero title={p.titulo} intro={p.resumen} />

      <div className="relative aspect-[21/9] min-h-64 w-full overflow-hidden border-b border-deuz-line">
        <Image src={p.imagenes[0]} alt={p.titulo} fill priority sizes="100vw" className="object-cover" />
      </div>

      {cifras.length > 0 && (
        <section className="py-12">
          <div className={container}>
            <StatBar items={cifras} className="lg:grid-cols-4" />
          </div>
        </section>
      )}

      <section className={section}>
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <div className="space-y-12 lg:col-span-7">
            <div>
              <h2 className="text-2xl font-medium text-deuz-text md:text-3xl">Reto</h2>
              <p className="mt-4 text-lg leading-relaxed text-deuz-muted">{p.reto}</p>
            </div>
            <div>
              <h2 className="text-2xl font-medium text-deuz-text md:text-3xl">Solución</h2>
              <p className="mt-4 text-lg leading-relaxed text-deuz-muted">{p.solucion}</p>
            </div>
            {p.testimonio && (
              <figure className="border-l-2 border-deuz-red pl-6">
                <blockquote className="text-xl leading-snug text-deuz-text md:text-2xl">“{p.testimonio.texto}”</blockquote>
                <figcaption className="mt-4 text-sm text-deuz-muted">
                  {p.testimonio.autor}, {p.testimonio.cargo}
                </figcaption>
              </figure>
            )}
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-2xl font-medium text-deuz-text">Ficha técnica</h2>
            <table className="mt-6 w-full border-t border-deuz-line text-sm">
              <tbody>
                {ficha.map(([k, v]) => (
                  <tr key={k} className="border-b border-deuz-line">
                    <th scope="row" className="w-2/5 py-3 pr-4 text-left font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-deuz-dim">
                      {k}
                    </th>
                    <td className="py-3 text-deuz-text">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </aside>
        </div>
      </section>

      {p.imagenes.length > 1 && (
        <section className={section}>
          <div className={container}>
            <SectionHeading title="Galería" />
            <div className="mt-10 grid gap-2 sm:grid-cols-2">
              {p.imagenes.slice(1).map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden bg-deuz-elev">
                  <Image src={src} alt={`${p.titulo}, imagen ${i + 2}`} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.lineaTiempo?.length > 0 && (
        <section className={section}>
          <div className={container}>
            <SectionHeading title="Línea de tiempo" />
            <ol className="mt-10 border-t border-deuz-line">
              {p.lineaTiempo.map((h) => (
                <li key={h.hito} className="grid gap-2 border-b border-deuz-line py-4 sm:grid-cols-[180px_1fr]">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-deuz-red">{h.fecha}</span>
                  <span className="text-deuz-text">{h.hito}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className={section}>
        <div className={container}>
          <SectionHeading title="Proyectos relacionados" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((r) => (
              <CaseCard key={r.slug} proyecto={r} href={`/proyectos/${r.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
