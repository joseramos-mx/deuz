"use client";

import { useMemo, useState } from "react";
import {
  Buildings,
  Factory,
  House,
  Truck,
  RoadHorizon,
  Wrench,
  Tree,
  Lightning,
  ClipboardText,
  Crane,
  ArrowRight,
} from "@phosphor-icons/react";

/** Data */
const SERVICES = [
  {
    id: "urb",
    title: "Urbanización y terracerías",
    desc: "Movimiento de tierras, nivelaciones, drenajes pluviales y vialidades listas para construir.",
    icon: <Tree size={26} weight="duotone" />,
    tags: ["Infraestructura"],
  },
  {
    id: "obra",
    title: "Obra pública y privada",
    desc: "Ejecución integral con control de calidad, normativa y seguimiento presupuestal.",
    icon: <Buildings size={26} weight="duotone" />,
    tags: ["Construcción"],
  },
  {
    id: "energia",
    title: "Energía y electrificación",
    desc: "Suministro y montaje de infraestructura eléctrica en media y baja tensión.",
    icon: <Lightning size={26} weight="duotone" />,
    tags: ["Energía"],
  },
  {
    id: "pav",
    title: "Concretos y asfaltos",
    desc: "Pavimentaciones, losas industriales y recarpeteos con procesos certificados.",
    icon: <RoadHorizon size={26} weight="duotone" />,
    tags: ["Infraestructura"],
  },
  {
    id: "mat",
    title: "Materiales y suministros industriales",
    desc: "Abastecimiento confiable de insumos, aceros, prefabricados y consumibles.",
    icon: <Wrench size={26} weight="duotone" />,
    tags: ["Suministros"],
  },
  {
    id: "vivienda",
    title: "Casas habitación",
    desc: "Infonavit, vivienda media y residencial con enfoque en tiempos y acabados.",
    icon: <House size={26} weight="duotone" />,
    tags: ["Construcción"],
  },
  {
    id: "vertical",
    title: "Edificación vertical",
    desc: "Estructuras y superestructuras para edificios de uso mixto y comercial.",
    icon: <Crane size={26} weight="duotone" />,
    tags: ["Construcción"],
  },
  {
    id: "naves",
    title: "Naves industriales",
    desc: "Proyectos llave en mano para uso logístico, manufactura y almacenamiento.",
    icon: <Factory size={26} weight="duotone" />,
    tags: ["Industrial"],
  },
  {
    id: "consultoria",
    title: "Consultoría técnica y presupuestal",
    desc: "Ingeniería de costos, planeación y value engineering para optimizar tu inversión.",
    icon: <ClipboardText size={26} weight="duotone" />,
    tags: ["Consultoría"],
  },
  {
    id: "logistica",
    title: "Logística y maquinaria pesada",
    desc: "Gestión de equipo especializado y movimiento de carga para obras de gran escala.",
    icon: <Truck size={26} weight="duotone" />,
    tags: ["Logística"],
  },
];

const FILTERS = ["Todos", "Construcción", "Infraestructura", "Energía", "Industrial", "Suministros", "Consultoría", "Logística"];

export default function ServicesSection() {
  const [active, setActive] = useState("Todos");

  const filtered = useMemo(() => {
    if (active === "Todos") return SERVICES;
    return SERVICES.filter((s) => s.tags.includes(active));
  }, [active]);

  return (
    <section id="servicios" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header: título + subtítulo */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-10 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-sm font-semibold text-neutral-500">Servicios</p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black font-sans leading-tight text-neutral-900">
              Elevamos <span className="italic font-medium font-sans">cada experiencia</span>
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 max-w-xl text-neutral-600 ">
              Simplificamos tus necesidades del día a día con ejecución impecable, transparencia y un espíritu de servicio constante.
            </p>
          </div>

          {/* Filtros (píldoras) */}
          <div className="md:col-span-6 lg:col-span-7 md:justify-self-end">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const activeStyle =
                  f === active
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-neutral-700 hover:text-neutral-900";
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium transition ${activeStyle}`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid de cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.id}
              className="group relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              {/* Ícono */}
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                {s.icon}
              </div>

              {/* Título y descripción */}
              <h3 className="text-lg font-semibold text-neutral-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>

              {/* CTA */}
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-red-600">
                Más detalles <ArrowRight size={16} weight="bold" />
              </button>

              {/* halo sutil al hacer hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-red-200" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
