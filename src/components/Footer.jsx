"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  XLogo,
  InstagramLogo,
  LinkedinLogo,
  Globe,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="relative isolate bg-[#0B0E0C] text-white">
      {/* decor lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-20 top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute right-20 top-0 bottom-0 w-px bg-white/10" />
      </div>

      {/* top grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-8">
        {/* CTA */}
        <div className="md:col-span-4 space-y-6">
          <h3 className="text-2xl md:text-3xl font-black leading-tight text-white">
            Eleva tu proyecto con nosotros.
          </h3>
          <p className="text-sm text-zinc-300 max-w-sm">
            Experiencia, transparencia y ejecución impecable en cada obra.
          </p>

          <Link
            href="#contacto"
            className="inline-flex items-center gap-3 group"
          >
            <span className="grid size-12 place-items-center rounded-full border border-white/30 bg-white/5 transition group-hover:bg-white/10">
              <ArrowRight size={20} weight="bold" />
            </span>
            <span className="border-b border-red-600/60 pb-0.5 text-red-400 group-hover:text-red-300">
              Agenda una llamada
            </span>
          </Link>
        </div>

        {/* Vertical logo center */}
        <div className="md:col-span-2 hidden md:flex justify-center">
          {/* Cambia la ruta del logo a tu archivo */}
          <div className="relative h-40 w-10">
          <span className="text-6xl font-black font-sans text-white [writing-mode:vertical-rl] rotate-180">
  DEUZ
</span>


          </div>
        </div>

        {/* Link columns */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-zinc-200">Important</h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            <li><Link href="#servicios" className="hover:text-white">Servicios</Link></li>
            <li><Link href="#portfolio" className="hover:text-white">Proyectos</Link></li>
            <li><Link href="#precios" className="hover:text-white">Precios</Link></li>
            <li><Link href="#nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="#reviews" className="hover:text-white">Reseñas</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-zinc-200">Legal</h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            <li><Link href="/terminos" className="hover:text-white">Términos & condiciones</Link></li>
            <li><Link href="/privacidad" className="hover:text-white">Aviso de privacidad</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contáctanos</Link></li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          {/* Socials */}
          <div>
            <p className="text-sm text-zinc-400 mb-3">Síguenos</p>
            <div className="flex items-center gap-3">
              <Link href="https://x.com" className="grid size-9 place-items-center rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10">
                <XLogo size={18} weight="bold" />
              </Link>
              <Link href="https://instagram.com" className="grid size-9 place-items-center rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10">
                <InstagramLogo size={18} weight="bold" />
              </Link>
              <Link href="https://linkedin.com" className="grid size-9 place-items-center rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10">
                <LinkedinLogo size={18} weight="bold" />
              </Link>
              <Link href="https://deuz.mx" className="grid size-9 place-items-center rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10">
                <Globe size={18} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} DEUZ — Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
