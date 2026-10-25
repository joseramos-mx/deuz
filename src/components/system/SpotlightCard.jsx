"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Contenedor con un halo que sigue al cursor sobre el borde y el fondo
 * (inspirado en SpotlightCard de React Bits). Sin cursor no se ve nada.
 * Con `href` se renderiza como enlace.
 */
export default function SpotlightCard({ as = "div", href, color = "229, 9, 20", className, children, ...props }) {
  const ref = useRef(null);
  const Tag = href ? Link : as;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      href={href}
      onPointerMove={onMove}
      className={cn("group/spot relative isolate", className)}
      style={{ "--spot-color": color }}
      {...props}
    >
      {/* Halo de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--spot-x) var(--spot-y), rgba(var(--spot-color), 0.10), transparent 70%)",
        }}
      />
      {/* Borde iluminado */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(220px circle at var(--spot-x) var(--spot-y), rgba(var(--spot-color), 0.9), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </Tag>
  );
}
