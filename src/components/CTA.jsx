"use client";

import { ArrowRight, Phone, EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";

export default function CTASection() {
  return (
    <section className="relative isolate bg-[#0B0E0C] py-20 text-white">
      {/* Gradients de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(900px_500px_at_50%_10%,rgba(229,9,20,0.28),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(6,7,7,0.85),rgba(6,7,7,0.98)),radial-gradient(1200px_700px_at_90%_-10%,rgba(7,40,20,0.18),transparent_70%)]"
      />

      {/* Líneas decorativas (grid) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 top-16 h-px bg-white/10" />
            <div className="absolute left-0 right-0 bottom-16 h-px bg-white/30" />

      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Panel */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          {/* Glow sutil */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_80%_at_30%_-30%,rgba(255,255,255,.08),transparent_60%)]" />

          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            {/* Texto */}
            <div>
              <p className="mb-2 inline-flex rounded-full border border-red-800/40 bg-red-900/30 px-3 py-1 text-[11px] font-medium tracking-wide text-red-200">
                ¿Listos para empezar?
              </p>
              <h2 className="text-balance text-3xl font-black leading-tight md:text-5xl">
                Elevemos tu proyecto <span className="italic font-medium">con propósito</span>
                <span className="text-red-500">.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-zinc-300 md:text-base">
                Experiencia, transparencia en costos y ejecución impecable en cada obra. 
                Cotiza hoy y obtén una estimación clara y competitiva.
              </p>

              {/* Bullets rápidos */}
              <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="text-green-400" size={18} />
                  Cronograma y costos transparentes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="text-green-400" size={18} />
                  Acompañamiento técnico en todo el proceso
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="text-green-400" size={18} />
                  Calidad y seguridad en sitio
                </li>
              </ul>

              {/* Botones */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#cotizador"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E50914] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(229,9,20,.65)] transition hover:bg-[#cf0711]"
                >
                  Cotizar ahora <ArrowRight size={18} weight="bold" />
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Conocer más
                </a>
              </div>
            </div>

            {/* Tarjeta de contacto rápida */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_80%_-10%,rgba(229,9,20,.18),transparent_60%)]" />
              <div className="relative space-y-4">
                <h3 className="text-lg font-semibold">¿Prefieres hablar con nosotros?</h3>
                <p className="text-sm text-zinc-300">
                  Agenda una llamada y cuéntanos sobre tu obra. Te orientamos desde el primer minuto.
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <a
                    href="tel:+520000000000"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <Phone size={18} /> Llamar
                  </a>
                  <a
                    href="mailto:contacto@tu-dominio.com"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <EnvelopeSimple size={18} /> Escribir
                  </a>
                </div>

                {/* Mini footer de confianza */}
                <div className="pt-4 text-xs text-zinc-400">
                  Respuesta en menos de 24h. Sin compromiso.
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
        </div>
        
      </div>
    </section>
  );
}
