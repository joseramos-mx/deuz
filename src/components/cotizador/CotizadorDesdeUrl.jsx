"use client";

import { useSearchParams } from "next/navigation";
import { getTipo } from "@/data/cotizador";
import Cotizador from "./Cotizador";

// Lee ?tipo= en el cliente para que /cotizador pueda ser estática.
export default function CotizadorDesdeUrl() {
  const tipo = useSearchParams().get("tipo") ?? "";
  const tipoInicial = getTipo(tipo) ? tipo : "";
  return <Cotizador key={tipoInicial} tipoInicial={tipoInicial} />;
}
