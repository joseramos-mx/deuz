import { cn } from "@/lib/utils";

const TONES = {
  muted: "text-deuz-muted",
  light: "text-white",
  red: "text-deuz-accent",
  dark: "text-neutral-900",
};

/** Etiqueta técnica: `◆ TEXTO` en monoespaciada, mayúsculas y tracking amplio. */
export default function TechLabel({
  as: Tag = "p",
  tone = "muted",
  marker = true,
  className,
  children,
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase leading-none tracking-[0.18em] sm:text-xs",
        TONES[tone],
        className
      )}
    >
      {marker && (
        <span aria-hidden className={tone === "muted" ? "text-deuz-accent" : undefined}>
          ◆
        </span>
      )}
      <span>{children}</span>
    </Tag>
  );
}
