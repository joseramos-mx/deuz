"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
// Asegúrate de importar ShinyText correctamente desde donde lo tengas guardado
import ShinyText from "@/components/ShinyText"; 


export default function Hero() {
  return (
    <section 
      id="inicio" 
      className="relative isolate overflow-hidden bg-[#141414] min-h-screen flex flex-col justify-center items-center"
    >
      
      {/* --- VIDEO DE FONDO --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-50 h-full w-full object-cover" 
      >
        <source 
          src="https://ik.imagekit.io/0i4our85y/introvideo.mp4?updatedAt=1764700051165" 
          type="video/mp4" 
        />
      </video>

      {/* --- Overlay Oscuro --- */}
      <div
        aria-hidden
        className="overflow-hidden absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(3,4,4,0.3),rgba(3,4,4,0.8)),radial-gradient(1200px_600px_at_90%_-10%,rgba(7,40,20,0.2),transparent_70%)]"
      />

      {/* --- background gradients (Rojo) --- */}
      <div
        aria-hidden
        className="overflow-hidden absolute inset-0 -z-20 bg-[radial-gradient(900px_500px_at_50%_55%,rgba(255,0,32,0.3),transparent_60%)]"
      />

      {/* --- content --- */}
      <div className="relative mx-auto max-w-7xl px-6 py-12 text-center md:px-8">
        
        {/* Banda con logo */}
        <div className="mx-auto w-fit flex flex-col items-center">
          <Image
            src="/logo.svg" 
            alt="Logo DEUZ"
            width={140}
            height={50}
            priority
          />
          <p className="mt-2 text-sm font-medium tracking-wide text-red-200 uppercase drop-shadow-md">
            Grupo empresarial
          </p>
        </div>

        {/* --- TÍTULOS CON SHINY TEXT (Corregidos) --- */}
        {/* --- TÍTULOS CON SHINY TEXT (Responsive Ajustado) --- */}
        <h1 className="mt-6 leading-[0.95] tracking-tight drop-shadow-2xl flex flex-col items-center w-full max-w-full">
          
          {/* 1. OBRAS */}
          {/* Reduje el tamaño base a text-4xl para que no rompa en móviles pequeños */}
          <ShinyText 
            text="OBRAS" 
            variant="silver" 
            speed={3} 
            className="text-center text-4xl sm:text-6xl md:text-7xl font-sans uppercase font-bold" 
          />
          
          {/* 2. LLAVE EN MANO QUE */}
          {/* Agregué 'text-center' y 'max-w-xs sm:max-w-none' para controlar el salto de línea en móvil */}
          <ShinyText 
            text="LLAVE EN MANO QUE" 
            variant="silver" 
            speed={3} 
            className="text-center text-2xl sm:text-5xl md:text-7xl font-sans uppercase font-bold py-2 leading-tight" 
          />

          {/* 3. TRASCIENDEN */}
          {/* Ajusté a text-4xl en móvil. 'break-all' es un seguro por si la palabra es más ancha que la pantalla */}
          <ShinyText 
            text="TRASCIENDEN" 
            variant="silver" 
            speed={3} 
            className="text-center text-4xl sm:text-7xl md:text-8xl font-sans font-black uppercase pb-2 break-words" 
          />
          
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-balance text-sm sm:text-base md:text-lg text-zinc-200 drop-shadow-md">
          De planos a realidad, con propósito y excelencia.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button className="rounded-md bg-[#E50914] px-6 py-6 text-base font-semibold text-white hover:bg-[#cf0711] shadow-lg shadow-red-900/20 transition-all hover:scale-105">
            Cotizar ahora
          </Button>
          <Button
            variant="outline"
            className="rounded-md border-white/30 bg-white/10 px-6 py-6 text-base text-white hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105"
          >
            Conocer más
          </Button>
        </div>

      </div>
    </section>
  );
}