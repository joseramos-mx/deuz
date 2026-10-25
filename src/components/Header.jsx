"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { soluciones, navPrincipal, ctaCotizar } from "@/data/navegacion";
import CTAButton from "@/components/system/CTAButton";
import GridBackground from "@/components/system/GridBackground";
import TechLabel from "@/components/system/TechLabel";

const navBtn =
  "inline-flex h-9 items-center gap-1.5 rounded-[2px] bg-deuz-elev-2 px-4 text-[13px] font-medium text-deuz-text transition-colors duration-200 hover:bg-[#2A2A2A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const solRef = useRef(null);
  const pathname = usePathname();

  // Cierra todo al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
    setSolOpen(false);
  }, [pathname]);

  // Dropdown de soluciones: cierra con clic fuera o ESC
  useEffect(() => {
    if (!solOpen) return;
    const onClick = (e) => !solRef.current?.contains(e.target) && setSolOpen(false);
    const onKey = (e) => e.key === "Escape" && setSolOpen(false);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [solOpen]);

  // Menú móvil: bloquea scroll y cierra con ESC
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-deuz-line bg-deuz-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 md:px-8">
          <Link href="/" className="shrink-0" aria-label="DEUZ, ir al inicio">
            <Image src="/logo.svg" alt="DEUZ" width={96} height={36} priority />
          </Link>

          {/* Desktop */}
          <nav aria-label="Principal" className="hidden items-center gap-1.5 lg:flex">
            <div ref={solRef} className="relative">
              <button
                type="button"
                className={navBtn}
                aria-expanded={solOpen}
                aria-controls="menu-soluciones"
                onClick={() => setSolOpen((v) => !v)}
              >
                Soluciones
                <ChevronDown
                  aria-hidden
                  className={cn("size-3.5 transition-transform duration-200", solOpen && "rotate-180")}
                />
              </button>

              {solOpen && (
                <div
                  id="menu-soluciones"
                  className="animate-deuz-fade-up absolute left-0 top-full mt-2 w-[420px] border border-deuz-line-strong bg-deuz-elev"
                >
                  <ul className="divide-y divide-deuz-line">
                    {soluciones.map((s, i) => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          onClick={() => setSolOpen(false)}
                          className="group flex gap-4 p-4 transition-colors hover:bg-deuz-elev-2 focus-visible:bg-deuz-elev-2 focus-visible:outline-none"
                        >
                          <span className="font-mono text-[11px] text-deuz-dim group-hover:text-deuz-red">
                            0{i + 1}
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-deuz-text">{s.label}</span>
                            <span className="mt-1 block text-[13px] text-deuz-muted">{s.descripcion}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {navPrincipal.map((item) => (
              <Link key={item.label} href={item.href} className={navBtn}>
                {item.label}
              </Link>
            ))}

            <CTAButton href={ctaCotizar.href} size="sm" className="ml-1.5">
              {ctaCotizar.label}
            </CTAButton>
          </nav>

          {/* Móvil */}
          <button
            type="button"
            className="-mr-2 p-2 text-deuz-text lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-7" />
          </button>
        </div>
      </header>

      {/* CTA fijo abajo en móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-deuz-line bg-deuz-bg/90 p-3 backdrop-blur-md lg:hidden">
        <CTAButton href={ctaCotizar.href} className="w-full">
          {ctaCotizar.label}
        </CTAButton>
      </div>

      {/* Menú móvil a pantalla completa */}
      {menuOpen && (
        <div
          id="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-[60] flex flex-col bg-deuz-bg lg:hidden"
        >
          <GridBackground />

          <div className="relative flex h-16 items-center justify-between border-b border-deuz-line px-4 sm:px-6">
            <Image src="/logo.svg" alt="DEUZ" width={96} height={36} />
            <button
              type="button"
              className="-mr-2 p-2 text-deuz-text"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-7" />
            </button>
          </div>

          <nav aria-label="Principal" className="relative flex-1 overflow-y-auto px-4 py-8 sm:px-6">
            <TechLabel>Soluciones</TechLabel>
            <ul className="mt-4 border-t border-deuz-line">
              {soluciones.map((s, i) => (
                <li key={s.label} className="border-b border-deuz-line">
                  <Link
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-4 text-lg font-medium text-deuz-text"
                  >
                    <span className="font-mono text-[11px] text-deuz-red">0{i + 1}</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-10 border-t border-deuz-line">
              {navPrincipal.map((item) => (
                <li key={item.label} className="border-b border-deuz-line">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-3xl font-medium tracking-tight text-deuz-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative border-t border-deuz-line p-3">
            <CTAButton href={ctaCotizar.href} className="w-full" onClick={() => setMenuOpen(false)}>
              {ctaCotizar.label}
            </CTAButton>
          </div>
        </div>
      )}
    </>
  );
}
