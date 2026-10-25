import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-deuz-red text-white hover:bg-deuz-red-dark focus-visible:outline-white",
  secondary:
    "border border-white/80 text-white hover:bg-white hover:text-deuz-bg focus-visible:outline-white",
  // Para usar encima de un RedBlock
  inverse: "bg-white text-deuz-bg hover:bg-neutral-200 focus-visible:outline-white",
};

const SIZES = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

/** Botón de acción. Con `href` renderiza un enlace; sin él, un `<button>`. */
export default function CTAButton({
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-[2px] font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
    VARIANTS[variant],
    SIZES[size],
    className
  );
  const content = (
    <>
      <span className="relative block overflow-hidden">
        <span className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex items-center gap-2 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    return external ? (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
