import { cn } from "@/lib/utils";
import GridBackground from "./GridBackground";

/** Encabezado corto de páginas internas. */
export default function PageHero({ title, intro, children, className }) {
  return (
    <header className={cn("relative isolate overflow-hidden border-b border-deuz-line pt-16", className)}>
      <GridBackground className="-z-10" />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <h1 className="max-w-4xl text-balance text-4xl font-medium leading-[1] tracking-tight text-deuz-text sm:text-5xl md:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-deuz-muted md:text-lg">{intro}</p>}
        {children && <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>}
      </div>
    </header>
  );
}
