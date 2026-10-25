// Eventos de analítica (DESIGN.md §6). Envía a GTM (dataLayer), gtag o Vercel Analytics
// si alguno está cargado; sin proveedor configurado no hace nada.
export function track(evento, props = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event: evento, ...props });
    window.gtag?.("event", evento, props);
    window.va?.("event", { name: evento, data: props });
  } catch {
    // la analítica nunca debe romper la experiencia
  }
}
