import { cn } from "@/lib/utils";

/** Encabezado de sección: titular y bajada opcional. */
export default function SectionHeading({ title, intro, action, as: Tag = "h2", className }) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        <Tag className="text-balance text-3xl font-medium leading-[1.05] tracking-tight text-deuz-text sm:text-4xl md:text-5xl">
          {title}
        </Tag>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-deuz-muted md:text-lg">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8";
export const section = "relative border-t border-deuz-line py-20 md:py-28";
