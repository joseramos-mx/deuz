"use client";

import { useMemo, useState } from "react";
import CaseCard from "@/components/system/CaseCard";
import { cn } from "@/lib/utils";

const SEGMENTOS = [
  { id: "todos", label: "Todos" },
  { id: "vivienda", label: "Vivienda" },
  { id: "industrial", label: "Industrial" },
  { id: "infraestructura", label: "Infraestructura" },
  { id: "energia", label: "Energía" },
];

function Chips({ legend, opciones, value, onChange }) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{legend}</legend>
      {opciones.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "h-9 rounded-[2px] px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            value === o.id ? "bg-deuz-red text-white" : "bg-deuz-elev-2 text-deuz-text hover:bg-[#2A2A2A]"
          )}
        >
          {o.label}
        </button>
      ))}
    </fieldset>
  );
}

export default function ProyectosFiltro({ proyectos }) {
  const [segmento, setSegmento] = useState("todos");
  const [estado, setEstado] = useState("todos");

  const estados = useMemo(
    () => [{ id: "todos", label: "Todos los estados" }, ...[...new Set(proyectos.map((p) => p.estado))].sort().map((e) => ({ id: e, label: e }))],
    [proyectos]
  );
  const segmentos = SEGMENTOS.filter((s) => s.id === "todos" || proyectos.some((p) => p.segmento === s.id));

  const lista = proyectos.filter(
    (p) => (segmento === "todos" || p.segmento === segmento) && (estado === "todos" || p.estado === estado)
  );

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Chips legend="Segmento" opciones={segmentos} value={segmento} onChange={setSegmento} />
        {estados.length > 2 && <Chips legend="Estado" opciones={estados} value={estado} onChange={setEstado} />}
      </div>
      <p aria-live="polite" className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-deuz-dim">
        {lista.length} {lista.length === 1 ? "proyecto" : "proyectos"}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p, i) => (
          <CaseCard key={p.slug} proyecto={p} href={`/proyectos/${p.slug}`} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
