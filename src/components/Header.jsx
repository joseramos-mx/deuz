"use client";

import Image from "next/image";
import { List } from "@phosphor-icons/react"; // ícono del menú (hamburger)

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#040505] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4.5 md:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg" // 👈 pon aquí tu logo
            alt="DEUZ Logo"
            width={110}
            height={35}
            priority
          />
        </div>

        {/* Menú */}
        <button className="p-2 text-white hover:text-red-500 md:hidden">
          <List size={32} weight="bold" />
        </button>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8 text-white font-medium">
          <a href="#nosotros" className="hover:text-red-500">Nosotros</a>
          <a href="#proyectos" className="hover:text-red-500">Proyectos</a>
          <a href="#contacto" className="hover:text-red-500">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
