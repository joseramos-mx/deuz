"use client";

import { useEffect, useMemo, useState } from "react";
import * as d3 from "d3-geo";

const ESTADOS_CON_OBRA = new Set([
  "Durango",
  "Chihuahua",
  "Coahuila",
  "Quintana Roo", // Cancún está en Quintana Roo
  "Tabasco",
]);

export default function MapaMexico() {
  const [fc, setFc] = useState(null);
  const [hoverName, setHoverName] = useState(null);

  const width = 900;
  const height = 540;

  useEffect(() => {
    (async () => {
      try {
        // Asegúrate de que mx.json esté en /public/data/mx.json (o ajusta la ruta)
        const res = await fetch("/mx.json");
        if (!res.ok) throw new Error(`GeoJSON HTTP ${res.status}`);
        const data = await res.json();
        setFc(data);
      } catch (e) {
        console.error("Error cargando el GeoJSON:", e);
      }
    })();
  }, []);

  const { path, features } = useMemo(() => {
    if (!fc) return { path: null, features: [] };

    const proj = d3.geoMercator();
    const p = d3.geoPath(proj);

    // Encaja todo el FeatureCollection al SVG
    try {
      proj.fitSize([width, height], fc);
    } catch (e) {
      console.warn("No se pudo ajustar la proyección:", e);
    }

    return { path: p, features: fc.features || [] };
  }, [fc]);

  return (
    <section className="bg-white py-12">
        <h2 className="text-center text-4xl md:text-5xl font-black text-neutral-900 mb-12">
  Obras realizadas en <span className="italic font-medium">México</span>
  <span className="text-red-500">.</span>
</h2>
<p className="text-center text-sm md:text-base text-neutral-600 -mt-8 mb-10">
  Presencia en distintos estados con proyectos de calidad y propósito.
</p>

      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 px-6 md:grid-cols-12 md:px-8">
        {/* Mapa */}
        <div className="md:col-span-8">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[60vh] max-h-[560px]">
              {features.map((f, i) => {
                const props = f.properties || {};
                // Cambia la clave según el GeoJSON que estés usando:
                const nombre =
                  props.nom_ent || props.NOMGEO || props.NAME_1 || props.name || `E${i}`;

                const tieneObra = ESTADOS_CON_OBRA.has(nombre);
                const d = path ? path(f) : "";

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHoverName(nombre)}
                    onMouseLeave={() => setHoverName(null)}
                    onTouchStart={() => setHoverName(nombre)}
                  >
                    <path
                      d={d}
                      fill={tieneObra ? "#fee2e2" : "#f8fafc"}
                      stroke="#cbd5e1"
                      strokeWidth={1}
                    />
                    {tieneObra && (
                      <path
                        d={d}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={2}
                        opacity={0.6}
                      />
                    )}
                  </g>
                );
              })}

              {hoverName && (
                <text x={16} y={28} fontSize={14} fontWeight={600} fill="#111827">
                  {hoverName}
                </text>
              )}
            </svg>
          </div>
        </div>

        {/* Leyenda */}
        <aside className="md:col-span-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900">Estados con obra</h3>
            <ul className="mt-3 space-y-2 text-neutral-700">
              {[...ESTADOS_CON_OBRA].map((n) => (
                <li key={n} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                  {n}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              Pasa el cursor sobre el mapa (o toca en móvil) para ver el nombre del estado.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
