import { cn } from "@/lib/utils";

const CUT = 28; // px de la esquina recortada

const CLIPS = {
  none: undefined,
  tr: `polygon(0 0, calc(100% - ${CUT}px) 0, 100% ${CUT}px, 100% 100%, 0 100%)`,
  br: `polygon(0 0, 100% 0, 100% calc(100% - ${CUT}px), calc(100% - ${CUT}px) 100%, 0 100%)`,
};

/** Bloque rojo sólido de marca, con esquina recortada opcional (`cut="tr" | "br"`). */
export default function RedBlock({ as: Tag = "div", cut = "none", className, style, children }) {
  return (
    <Tag
      className={cn("relative bg-deuz-red p-6 text-white sm:p-8 md:p-10", className)}
      style={{ clipPath: CLIPS[cut], ...style }}
    >
      {children}
    </Tag>
  );
}
