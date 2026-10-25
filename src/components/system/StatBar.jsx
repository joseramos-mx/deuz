import { cn } from "@/lib/utils";

/**
 * Franja de cifras.
 * items: [{ valor: "+30", etiqueta: "Años de experiencia", nota?: "Incluye suministros" }]
 */
export default function StatBar({ items, className }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 border-t border-l border-deuz-line md:grid-cols-3 lg:grid-cols-6",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.etiqueta}
          className="flex flex-col-reverse justify-end gap-3 border-r border-b border-deuz-line p-5 md:p-6"
        >
          <dt className="font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-deuz-muted">
            {item.etiqueta}
            {item.nota && <span className="mt-1 block normal-case tracking-normal text-deuz-dim">{item.nota}</span>}
          </dt>
          <dd className="text-3xl font-medium leading-none tracking-tight text-deuz-text md:text-4xl">
            {item.valor}
          </dd>
        </div>
      ))}
    </dl>
  );
}
