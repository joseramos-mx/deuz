import { cn } from "@/lib/utils";
import { MAPA_VIEWBOX, estadosMx } from "@/data/mapa-mx";

/**
 * Mapa de México en wireframe con puntos rojos pulsantes en los estados con obra.
 * Se renderiza en servidor; los estados activos llevan `data-estado` para que un
 * contenedor cliente pueda añadir interacción (ver home/Presence).
 */
export default function MexicoMap({ activos = [], pulse = true, className, title = "Mapa de México" }) {
  const set = new Set(activos);

  return (
    <svg viewBox={MAPA_VIEWBOX} role="img" aria-label={title} className={cn("h-auto w-full", className)}>
      {estadosMx.map((e) => {
        const activo = set.has(e.nombre);
        return (
          <path
            key={e.nombre}
            d={e.d}
            data-estado={activo ? e.nombre : undefined}
            className={cn(
              "transition-colors duration-200",
              activo
                ? "cursor-pointer fill-deuz-red/15 stroke-deuz-red/70 hover:fill-deuz-red/35 data-[on=true]:fill-deuz-red/35"
                : "fill-transparent stroke-white/15"
            )}
            strokeWidth={activo ? 1.2 : 0.8}
            strokeLinejoin="round"
          />
        );
      })}

      {estadosMx
        .filter((e) => set.has(e.nombre))
        .map((e) => (
          <g key={`p-${e.nombre}`} className="pointer-events-none">
            {pulse && (
              <circle
                cx={e.cx}
                cy={e.cy}
                r={9}
                className="animate-deuz-pulse fill-deuz-red [transform-box:fill-box] [transform-origin:center]"
              />
            )}
            <circle cx={e.cx} cy={e.cy} r={5} className="fill-deuz-red" />
          </g>
        ))}
    </svg>
  );
}
