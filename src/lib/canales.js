import { contacto } from "@/data/contacto";

// Variables públicas (documentadas en .env.example). Vacías = el canal no se muestra.
export const WHATSAPP_DIRECTOR = process.env.NEXT_PUBLIC_WHATSAPP_DIRECTOR || contacto.whatsapp || "";
export const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL || "";

export function whatsappUrl(mensaje) {
  if (!WHATSAPP_DIRECTOR) return null;
  return `https://wa.me/${WHATSAPP_DIRECTOR}?text=${encodeURIComponent(mensaje)}`;
}

/** Destino de "Hablar con un director": agenda, luego WhatsApp, luego la página de contacto. */
export function directorHref() {
  return (
    CAL_URL ||
    whatsappUrl("Hola, me gustaría hablar con un director de DEUZ sobre un proyecto.") ||
    "/contacto"
  );
}
