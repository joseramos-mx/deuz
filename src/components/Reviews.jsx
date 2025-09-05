"use client";

import Image from "next/image";
import { CheckCircle, XLogo } from "@phosphor-icons/react";

/* === Datos de ejemplo: cámbialos por los tuyos === */
const TESTS = [
  {
    name: "Briar Martin",
    handle: "@neilstellar",
    avatar: "/people/1.jpg",
    date: "April 20, 2025",
    text:
      "Radiant made undercutting all of our competitors an absolute breeze.",
    verified: true,
  },
  {
    name: "Avery Johnson",
    handle: "@averywrites",
    avatar: "/people/2.jpg",
    date: "May 10, 2025",
    text:
      "Transparencia de costos y ejecución impecable. 10/10.",
    verified: true,
  },
  {
    name: "Jordan Lee",
    handle: "@jordantalks",
    avatar: "/people/3.jpg",
    date: "June 5, 2025",
    text:
      "Comunicación clara y resultados arriba del estándar. Excelente equipo.",
    verified: true,
  },
  {
    name: "María Gómez",
    handle: "@maria.builds",
    avatar: "/people/4.jpg",
    date: "March 30, 2025",
    text:
      "Desde la ingeniería hasta el acabado: consistencia total.",
    verified: true,
  },
  {
    name: "Luis Cabrera",
    handle: "@luis_ops",
    avatar: "/people/5.jpg",
    date: "Jan 9, 2025",
    text:
      "Su logística y control de obra marcaron la diferencia.",
    verified: false,
  },
];

/* ==== Tarjeta estilo Tweet ==== */
function TweetCard({ t }) {
  return (
    <article className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      {/* header */}
      <div className="flex items-center gap-3">
        <div className="relative size-10 overflow-hidden rounded-full ring-1 ring-black/5">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <p className="truncate text-[15px] font-semibold text-neutral-900">{t.name}</p>
            {t.verified && <CheckCircle size={16} weight="fill" className="text-sky-500" />}
          </div>
          <p className="truncate text-sm text-neutral-500">{t.handle}</p>
        </div>
      </div>

      {/* body */}
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
        {t.text}
      </p>

      {/* footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <span className="opacity-70">Posted on</span>
          
        </span>
        <span>{t.date}</span>
      </div>
    </article>
  );
}

/* ==== Fila deslizante con fade en los lados ==== */
function Row({ items, reverse = false, speed = 36 }) {
  return (
    <div className="group relative my-6 overflow-hidden">
      {/* Fades laterales (mismo color que el fondo blanco) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(to_right,#ffffff_0%,#ffffff_18%,transparent_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(to_left,#ffffff_0%,#ffffff_18%,transparent_60%,transparent_100%)]" />

      {/* Pista animada (duplicada para loop perfecto) */}
      <div
        className="flex w-max items-stretch gap-6 motion-reduce:animate-none"
        style={{
          animation: `${reverse ? "marqueeR" : "marquee"} ${speed}s linear infinite`,
          animationPlayState: "running",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <TweetCard key={`${t.handle}-${i}`} t={t} />
        ))}
      </div>

      {/* Pausa la animación al hover en desktop */}
      <style jsx>{`
        .group:hover > div:first-of-type {
          /* overlay left: sin cambios, solo mantiene capa encima */
        }
        .group:hover > div ~ div {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeR {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ==== Sección completa ==== */
export default function TestimonialsStream() {
  // Para variedad, divide en dos filas con distinta velocidad
  const rowA = TESTS;
  const rowB = [...TESTS].reverse();

  return (
    <section className="relative isolate bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-neutral-500">Testimonios</p>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900">
            Clientes felices <span className="text-red-600">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Opiniones reales de nuestros clientes sobre transparencia, ejecución y calidad de entrega.
          </p>
        </div>
      </div>

      {/* Full-bleed suave: filas ocupan el ancho del viewport */}
      <div className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6 md:px-8">
        <Row items={rowA} speed={42} />
        <Row items={rowB} reverse speed={36} />
      </div>
    </section>
  );
}
