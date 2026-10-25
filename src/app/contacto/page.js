import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CTAButton, PageHero, SectionHeading, container, section } from "@/components/system";
import { contacto } from "@/data/contacto";
import { ctaCotizar } from "@/data/navegacion";
import { CAL_URL, whatsappUrl } from "@/lib/canales";

export const metadata = {
  title: "Contacto",
  description: "Habla con un ingeniero o director de DEUZ. Teléfono, WhatsApp, correo y agenda de visita técnica.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  const wa = whatsappUrl("Hola, me gustaría hablar con DEUZ sobre un proyecto.");
  const canales = [
    contacto.telefono && { icono: Phone, k: "Teléfono", v: contacto.telefono, href: `tel:${contacto.telefono}` },
    wa && { icono: MessageCircle, k: "WhatsApp", v: "Escríbenos", href: wa },
    contacto.correo && { icono: Mail, k: "Correo", v: contacto.correo, href: `mailto:${contacto.correo}` },
    contacto.direccion && { icono: MapPin, k: "Oficinas", v: contacto.direccion },
  ].filter(Boolean);

  return (
    <main>
      <PageHero
        title="Hablemos de tu proyecto."
        intro="La forma más rápida de avanzar es el cotizador: en dos minutos recibes una pre-propuesta y un ingeniero te contacta en menos de 24 h."
      >
        <CTAButton href={ctaCotizar.href} size="lg">
          {ctaCotizar.label}
        </CTAButton>
      </PageHero>

      {canales.length > 0 && (
        <section className={section}>
          <div className={container}>
            <ul className="grid gap-px border border-deuz-line bg-deuz-line sm:grid-cols-2 lg:grid-cols-4">
              {canales.map(({ icono: Icono, k, v, href }) => {
                const contenido = (
                  <>
                    <Icono aria-hidden className="size-5 text-deuz-accent" />
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-dim">{k}</p>
                    <p className="mt-1 text-deuz-text">{v}</p>
                  </>
                );
                return (
                  <li key={k} className="bg-deuz-bg">
                    {href ? (
                      <a href={href} className="block p-6 transition-colors hover:bg-deuz-elev">
                        {contenido}
                      </a>
                    ) : (
                      <div className="p-6">{contenido}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {CAL_URL && (
        <section className={section}>
          <div className={container}>
            <SectionHeading title="Agenda una visita técnica" />
            <iframe src={`${CAL_URL}${CAL_URL.includes("?") ? "&" : "?"}embed=true`} title="Agenda" loading="lazy" className="mt-10 h-[680px] w-full border border-deuz-line bg-white" />
          </div>
        </section>
      )}

      {contacto.direccion && (
        <section className={section}>
          <div className={container}>
            <SectionHeading title="Dónde estamos" intro={contacto.direccion} />
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(contacto.direccion)}&output=embed`}
              title="Mapa de oficinas"
              loading="lazy"
              className="mt-10 h-[420px] w-full border border-deuz-line grayscale invert-[0.9]"
            />
          </div>
        </section>
      )}
    </main>
  );
}
