"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
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
  X,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

/** Data */
const SERVICES = [
  {
    id: "urb",
    title: "Urbanización y terracerías",
    desc: "Movimiento de tierras, nivelaciones, drenajes pluviales y vialidades listas para construir.",
    icon: <Tree size={26} weight="duotone" />,
    tags: ["Infraestructura"],
    images: ["/photos/IMG_8790.webp", "/photos/IMG_8784.webp"],
  },
  {
    id: "obra",
    title: "Obra pública y privada",
    desc: "Ejecución integral con control de calidad, normativa y seguimiento presupuestal.",
    icon: <Buildings size={26} weight="duotone" />,
    tags: ["Construcción"],
    images: ["/photos/IMG_8782.webp", "/photos/IMG_8790.jpg"],
  },
  {
    id: "energia",
    title: "Energía y electrificación",
    desc: "Suministro y montaje de infraestructura eléctrica en media y baja tensión.",
    icon: <Lightning size={26} weight="duotone" />,
    tags: ["Energía"],
    images: ["/photos/ilu.jpg", "/photos/ener.jpg", "/photos/durango-sala-de-espera-2.jpg"],
  },
  {
    id: "pav",
    title: "Concretos y asfaltos",
    desc: "Pavimentaciones, losas industriales y recarpeteos con procesos certificados.",
    icon: <RoadHorizon size={26} weight="duotone" />,
    tags: ["Infraestructura"],
    images: ["/photos/IMG_8785.webp", "/photos/IMG_8798.webp"],
  },
  {
    id: "mat",
    title: "Materiales y suministros industriales",
    desc: "Abastecimiento confiable de insumos, aceros, prefabricados y consumibles.",
    icon: <Wrench size={26} weight="duotone" />,
    tags: ["Suministros"],
    images: ["/photos/IMG_8794.webp", "/photos/IMG_8793.webp"],
  },
  {
    id: "vivienda",
    title: "Casas habitación",
    desc: "Infonavit, vivienda media y residencial con enfoque en tiempos y acabados.",
    icon: <House size={26} weight="duotone" />,
    tags: ["Construcción"],
    images: ["/photos/IMG_8774.webp", "/photos/IMG_8780.webp"],
  },
  {
    id: "vertical",
    title: "Edificación vertical",
    desc: "Estructuras y superestructuras para edificios de uso mixto y comercial.",
    icon: <Crane size={26} weight="duotone" />,
    tags: ["Construcción"],
    images: ["/photos/IMG_8797.webp"],
  },
  {
    id: "naves",
    title: "Naves industriales",
    desc: "Proyectos llave en mano para uso logístico, manufactura y almacenamiento.",
    icon: <Factory size={26} weight="duotone" />,
    tags: ["Industrial"],
    images: ["/photos/IMG_8792.webp"],
  },
  {
    id: "consultoria",
    title: "Consultoría técnica y presupuestal",
    desc: "Ingeniería de costos, planeación y value engineering para optimizar tu inversión.",
    icon: <ClipboardText size={26} weight="duotone" />,
    tags: ["Consultoría"],
    images: ["/photos/consultoria-1.jpg"],
  },
  {
    id: "logistica",
    title: "Logística y maquinaria pesada",
    desc: "Gestión de equipo especializado y movimiento de carga para obras de gran escala.",
    icon: <Truck size={26} weight="duotone" />,
    tags: ["Logística"],
    images: ["/photos/IMG_8775.webp", "/photos/IMG_8776.webp", "/photos/IMG_8777.webp", "/photos/IMG_8799.webp"],
  },
];

const FILTERS = [
  "Todos",
  "Construcción",
  "Infraestructura",
  "Energía",
  "Industrial",
  "Suministros",
  "Consultoría",
  "Logística",
];

/* ---------- Lightbox / Modal ---------- */
function Lightbox({ open, service, onClose }) {
  const [index, setIndex] = useState(0);

  const images = service?.images ?? [];
  const hasImages = open && images.length > 0;

  // Reset index when service changes
  useEffect(() => {
    setIndex(0);
  }, [service?.id]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, images.length, onClose]);

  // Lock scroll
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const prev = useCallback(() => {
    if (!images.length) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    if (!images.length) return;
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-[#0B0E0C] ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-xs text-white/60">{service?.title}</p>
            <h3 className="truncate text-base font-semibold text-white">
              Galería del servicio
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Imagen */}
        <div className="relative aspect-[16/9] bg-black">
          {hasImages ? (
            <img
              key={images[index]}
              src={images[index]}
              alt={`${service?.title} ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center text-white/60">
              Sin imágenes
            </div>
          )}

          {/* Controles */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70"
                aria-label="Anterior"
              >
                <CaretLeft size={22} weight="bold" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70"
                aria-label="Siguiente"
              >
                <CaretRight size={22} weight="bold" />
              </button>
            </>
          )}

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer (opcional: descripción) */}
        <div className="border-t border-white/10 px-4 py-3 text-sm text-white/70 sm:px-5">
          {service?.desc}
        </div>
      </div>
    </div>
  );
}

/* ---------- Services Section ---------- */
export default function ServicesSection() {
  const [active, setActive] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const filtered = useMemo(() => {
    if (active === "Todos") return SERVICES;
    return SERVICES.filter((s) => s.tags.includes(active));
  }, [active]);

  const handleOpen = (service) => {
    setCurrentService(service);
    setOpen(true);
  };

  return (
    <section id="servicios" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-10 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-sm font-semibold text-neutral-500">photos</p>
            <h2 className="mt-2 font-sans text-4xl font-black leading-tight text-neutral-900 md:text-5xl">
              Elevamos <span className="font-sans italic font-medium">cada experiencia</span>
              <span className="text-red-500">.</span>
            </h2>
            <p className="mt-3 max-w-xl text-neutral-600">
              Simplificamos tus necesidades del día a día con ejecución impecable, transparencia y un espíritu de servicio constante.
            </p>
          </div>

          {/* Filtros */}
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
              <button
                onClick={() => handleOpen(s)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-red-600"
              >
                Ver fotos <ArrowRight size={16} weight="bold" />
              </button>

              {/* halo sutil al hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-red-200" />
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox open={open} service={currentService} onClose={() => setOpen(false)} />
    </section>
  );
}
