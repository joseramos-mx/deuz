import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Retícula fina con cruces decorativas (`+`) cada `crossEvery` celdas.
 * Se coloca dentro de un contenedor `relative`.
 */
export default function GridBackground({
  cell = 64,
  crossEvery = 4,
  fade = true,
  className,
}) {
  const id = useId().replace(/[^\w-]/g, "");
  const tile = cell * crossEvery;
  const c = cell; // las cruces caen sobre una intersección de la retícula

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage: "radial-gradient(ellipse at 50% 40%, #000 40%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 40%, transparent 85%)",
            }
          : undefined
      }
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={`${id}-cell`} width={cell} height={cell} patternUnits="userSpaceOnUse">
            <path d={`M ${cell} 0 L 0 0 0 ${cell}`} fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
          <pattern id={`${id}-cross`} width={tile} height={tile} patternUnits="userSpaceOnUse">
            <path
              d={`M ${c - 6} ${c} H ${c + 6} M ${c} ${c - 6} V ${c + 6}`}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}-cell)`} />
        <rect width="100%" height="100%" fill={`url(#${id}-cross)`} />
      </svg>
    </div>
  );
}
