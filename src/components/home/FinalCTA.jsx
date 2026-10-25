import { Phone, MessageCircle } from "lucide-react";
import { CTAButton, GridBackground, RedBlock, container } from "@/components/system";
import { ctaCotizar } from "@/data/navegacion";
import { contacto } from "@/data/contacto";
import { directorHref } from "@/lib/canales";

export default function FinalCTA() {
  return (
    <section id="contacto" className="relative isolate overflow-hidden border-t border-deuz-line py-20 md:py-28">
      <GridBackground className="-z-10" />
      <div className={container}>
        <RedBlock cut="br" className="px-6 py-14 sm:px-10 md:px-16 md:py-20">
          <h2 className="max-w-4xl text-balance text-4xl font-medium leading-[1] tracking-tight sm:text-5xl md:text-7xl">
            Elevemos tu proyecto con propósito.
          </h2>
          <p className="mt-6 max-w-xl text-white md:text-lg">
            Cuéntanos qué vas a construir y recibe una pre-propuesta con rango de inversión y plazo estimado.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton href={ctaCotizar.href} variant="inverse" size="lg">
              {ctaCotizar.label}
            </CTAButton>
            <CTAButton href={directorHref()} variant="secondary" size="lg" arrow={false}>
              <MessageCircle aria-hidden className="size-4" /> Hablar con un director
            </CTAButton>
            {contacto.telefono && (
              <CTAButton href={`tel:${contacto.telefono}`} variant="secondary" size="lg" arrow={false}>
                <Phone aria-hidden className="size-4" /> Llamar
              </CTAButton>
            )}
          </div>
          <p className="mt-5 text-[13px] text-white">Respuesta de un ingeniero en menos de 24 h.</p>
        </RedBlock>
      </div>
    </section>
  );
}
