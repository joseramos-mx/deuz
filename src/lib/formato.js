import { UNIDADES } from "@/data/cotizador";

export const fmtMXN = (n) =>
  n >= 1e6
    ? `$${(n / 1e6).toLocaleString("es-MX", { maximumFractionDigits: 1 })} MDP`
    : n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export const fmtMagnitud = (m) => (m ? `${m.valor.toLocaleString("es-MX")} ${UNIDADES[m.unidad]}` : null);
