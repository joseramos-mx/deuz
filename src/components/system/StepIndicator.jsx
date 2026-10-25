import { cn } from "@/lib/utils";

/**
 * Indicador de pasos: puntos + píldora alargada para el activo.
 * Con `onSelect` los pasos son botones navegables; sin él, solo indican.
 * Con `duration` (ms) la píldora activa se rellena como barra de progreso,
 * útil para slides que rotan solos (hero).
 */
export default function StepIndicator({
  count,
  active = 0,
  onSelect,
  labels = [],
  tone = "light",
  duration,
  className,
}) {
  const on = tone === "light" ? "bg-white" : "bg-deuz-red";
  const track = tone === "light" ? "bg-white/40" : "bg-white/25";
  const off = tone === "light" ? "bg-white/40 hover:bg-white/70" : "bg-white/25 hover:bg-white/50";

  return (
    <ol className={cn("flex items-center", onSelect ? "-mx-[9px]" : "gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === active;
        const label = labels[i] ?? `Paso ${i + 1} de ${count}`;
        const dot = (
          <span
            className={cn(
              "relative block h-1.5 overflow-hidden rounded-full transition-all duration-300",
              isActive ? cn(duration ? "w-8" : "w-6", duration ? track : on) : cn("w-1.5", off)
            )}
          >
            {isActive && duration && (
              <span
                // key reinicia la animación en cada cambio de paso
                key={active}
                className={cn("absolute inset-y-0 left-0 rounded-full", on)}
                style={{ animation: `deuz-progress ${duration}ms linear forwards` }}
              />
            )}
          </span>
        );

        return (
          <li key={i} className="flex">
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={label}
                aria-current={isActive ? "step" : undefined}
                className="p-[9px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {dot}
              </button>
            ) : (
              <span aria-current={isActive ? "step" : undefined}>
                {dot}
                <span className="sr-only">{label}</span>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
