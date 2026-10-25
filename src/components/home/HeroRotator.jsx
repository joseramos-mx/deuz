"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import CTAButton from "@/components/system/CTAButton";
import RedBlock from "@/components/system/RedBlock";
import ScrambleText from "@/components/system/ScrambleText";
import StepIndicator from "@/components/system/StepIndicator";

const INTERVALO = 6000;

/**
 * Parte animada de la hero: fondo por slide y bloque rojo con indicador.
 * La rotación se pausa con hover/foco y si el usuario prefiere menos movimiento.
 */
export default function HeroRotator({ slides, titulo, ctaPrimario, ctaSecundario, microtexto }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const auto = !paused && !reduced;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % slides.length), INTERVALO);
    return () => clearTimeout(t);
  }, [auto, active, slides.length]);

  const select = useCallback((i) => setActive(i), []);
  const slide = slides[active];

  return (
    <>
      {/* Fondos por slide en escala de grises */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <Image
            key={s.imagen}
            src={s.imagen}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover grayscale transition-opacity duration-700 ${
              i === active ? "opacity-25" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-deuz-bg via-deuz-bg/70 to-deuz-bg/30" />
      </div>

      <div
        className="relative w-full max-w-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <RedBlock cut="tr" className="pt-7 sm:pt-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/85" aria-live="polite">
              0{active + 1} / 0{slides.length} · <ScrambleText text={slide.division.toUpperCase()} />
            </p>
            <StepIndicator
              count={slides.length}
              active={active}
              onSelect={select}
              duration={auto ? INTERVALO : undefined}
              labels={slides.map((s) => s.division)}
            />
          </div>

          <h1 className="mt-6 text-balance text-[2.6rem] font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
            {titulo}
          </h1>
          <p key={active} className="animate-deuz-fade-up mt-5 max-w-lg text-base text-white/90 md:text-lg">
            {slide.texto}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={ctaPrimario.href} variant="inverse" size="lg">
              {ctaPrimario.label}
            </CTAButton>
            <CTAButton href={ctaSecundario.href} variant="secondary" size="lg" arrow={false}>
              {ctaSecundario.label}
            </CTAButton>
          </div>
          <p className="mt-4 text-[13px] text-white/80">{microtexto}</p>
        </RedBlock>
      </div>
    </>
  );
}
