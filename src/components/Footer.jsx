import Image from "next/image";
import Link from "next/link";
import { soluciones, navPrincipal, ctaCotizar, navLegal } from "@/data/navegacion";
import { contacto, redes } from "@/data/contacto";
import { GridBackground, TechLabel } from "@/components/system";
import CurrentYear from "@/components/CurrentYear";

const linkCls = "text-sm text-deuz-muted transition-colors hover:text-white";

function Column({ title, children }) {
  return (
    <div>
      <TechLabel as="h2">{title}</TechLabel>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const datosContacto = [
    contacto.telefono && { label: contacto.telefono, href: `tel:${contacto.telefono}` },
    contacto.whatsapp && { label: "WhatsApp", href: `https://wa.me/${contacto.whatsapp}` },
    contacto.correo && { label: contacto.correo, href: `mailto:${contacto.correo}` },
  ].filter(Boolean);

  return (
    // pb extra en móvil para no quedar debajo del CTA fijo
    <footer className="relative isolate overflow-hidden border-t border-deuz-line bg-deuz-bg pb-[68px] text-deuz-text lg:pb-0">
      <GridBackground className="-z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Navegación */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Image src="/logo.svg" alt="DEUZ" width={120} height={45} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-deuz-muted">
              Obras llave en mano con insumos, maquinaria y personal propios.
            </p>
            {contacto.direccion && (
              <address className="mt-5 text-sm not-italic text-deuz-muted">{contacto.direccion}</address>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1 md:col-span-3">
            <Column title="Soluciones">
              {soluciones.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className={linkCls}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </Column>
          </div>

          <div className="md:col-span-2">
            <Column title="Empresa">
              {navPrincipal.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ctaCotizar.href} className={linkCls}>
                  Cotizador
                </Link>
              </li>
            </Column>
          </div>

          <div className="md:col-span-3">
            <Column title="Legal">
              {navLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </Column>

            {datosContacto.length > 0 && (
              <div className="mt-10">
                <Column title="Contacto">
                  {datosContacto.map((d) => (
                    <li key={d.href}>
                      <a href={d.href} className={linkCls}>
                        {d.label}
                      </a>
                    </li>
                  ))}
                </Column>
              </div>
            )}
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col gap-4 border-t border-deuz-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-deuz-dim md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear initial={new Date().getFullYear()} /> DEUZ · Todos los derechos reservados
          </p>
          {redes.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {redes.map((r) => (
                <li key={r.red}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {r.red} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
