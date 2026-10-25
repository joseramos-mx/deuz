import { CTAButton, GridBackground, TechLabel } from "@/components/system";
import { ctaCotizar } from "@/data/navegacion";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-deuz-bg pt-16">
      <GridBackground className="-z-10" />
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 md:px-8">
        <TechLabel>Error 404</TechLabel>
        <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-deuz-text md:text-6xl">
          Esta página no existe o sigue en construcción.
        </h1>
        <p className="mt-6 max-w-xl text-deuz-muted">
          Estamos ampliando el sitio. Mientras tanto, puedes volver al inicio o cotizar tu proyecto.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <CTAButton href={ctaCotizar.href}>{ctaCotizar.label}</CTAButton>
          <CTAButton href="/" variant="secondary" arrow={false}>
            Volver al inicio
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
