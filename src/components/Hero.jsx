"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-[#141414]">
      {/* --- background gradients --- */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(900px_500px_at_50%_55%,rgba(255,0,32,0.35),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(3,4,4,0.9),rgba(3,4,4,0.98)),radial-gradient(1200px_600px_at_90%_-10%,rgba(7,40,20,0.25),transparent_70%)]"
      />

      {/* --- transición blanca al fondo --- */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 -z-10 bg-gradient-to-t from-white via-white/70 to-transparent"
      />

      {/* --- decorative lines --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 top-20 h-px bg-white/10" />
        <div className="absolute left-[11rem] top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute right-[11rem] top-0 bottom-0 w-px bg-white/10" />
      </div>

      {/* --- content --- */}
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-8 text-center md:px-8 lg:pt-36">
        <Badge className="mx-auto w-fit rounded-full border border-red-800/40 bg-red-900/30 px-3 py-1 text-[13px] font-medium tracking-wide text-red-200">
          La constructora #1 en Durango
        </Badge>

        <h1 className="mt-6 leading-[0.95] tracking-tight text-white">
          <span className="block text-4xl sm:text-6xl md:text-7xl font-sans">Obras que</span>
          <span className="block bg-gradient-to-b from-[#FF2A2A] to-[#B00012] bg-clip-text text-transparent text-5xl sm:text-7xl md:text-8xl font-sans font-black">
            trascienden
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-balance text-sm sm:text-base md:text-lg text-zinc-300">
          De planos a realidad, con propósito y excelencia.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button className="rounded-md bg-[#E50914] px-5 py-5 text-sm font-semibold text-white hover:bg-[#cf0711]">
            Cotizar ahora
          </Button>
          <Button
            variant="outline"
            className="rounded-md border-white/20 bg-white/10 px-5 py-5 text-sm text-white hover:bg-white/15"
          >
            Conocer más
          </Button>
        </div>

        {/* hero image */}
        <div className="relative mx-auto mt-16 w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] ring-1 ring-white/10">
            <Image
              src="/photos/IMG_8799.webp"
              alt="retroexcavadora en servicio de construcción"
              width={2400}
              height={800}
              priority
              className="h-[400px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
