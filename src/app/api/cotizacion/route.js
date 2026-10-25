import { NextResponse } from "next/server";
import { cotizacionSchema, estimar, leadScore, generarFolio, proyectosSimilares, leyenda } from "@/lib/cotizacion";
import { getTipo } from "@/data/cotizador";

export const runtime = "nodejs";

const mostrarMontos = () => process.env.MOSTRAR_MONTOS === "true";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = cotizacionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", campos: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const datos = parsed.data;

  let folio = generarFolio();
  const estimacion = estimar(datos, { mostrarMontos: mostrarMontos() });
  const { score, clase } = leadScore(datos);
  const similares = proyectosSimilares(datos).map((p) => p.slug);

  // El webhook (n8n) se encarga de CRM, aviso al director para leads A y seguimiento.
  // Si falla, se registra y el usuario recibe su resultado igual.
  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folio,
          fecha: new Date().toISOString(),
          datos: { ...datos, tipoLabel: getTipo(datos.tipo).label },
          estimacion,
          score,
          clase,
          similares,
        }),
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`Webhook HTTP ${res.status}`);
      // Si el webhook devuelve un folio consecutivo, se usa ese.
      const json = await res.json().catch(() => null);
      if (json?.folio && typeof json.folio === "string") folio = json.folio;
    } catch (err) {
      console.error("[cotizacion] webhook falló", folio, err);
    }
  } else {
    console.warn("[cotizacion] LEAD_WEBHOOK_URL no configurada; lead no enviado", folio);
  }

  return NextResponse.json({ folio, estimacion, similares, leyenda: leyenda() });
}
