import { PageHero, container } from "@/components/system";

/** Plantilla de páginas legales: secciones [{ titulo, parrafos: [] }]. */
export default function Legal({ titulo, actualizado, secciones }) {
  return (
    <main>
      <PageHero title={titulo} intro={`Última actualización: ${actualizado}`} />
      <article className={`${container} max-w-3xl py-14 md:py-20`}>
        {secciones.map((s) => (
          <section key={s.titulo} className="border-b border-deuz-line py-8 first:pt-0">
            <h2 className="text-xl font-medium text-deuz-text">{s.titulo}</h2>
            {s.parrafos.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-deuz-muted">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
