import { renderToBuffer } from "@react-pdf/renderer";
import { cotizacionSchema, estimar } from "@/lib/cotizacion";
import PrePropuesta from "@/lib/pdf/PrePropuesta";

export const runtime = "nodejs";

const FOLIO = /^DEUZ-\d{4}-[A-Z0-9-]{3,12}$/;

// Recalcula la estimación en servidor a partir de los datos capturados; nunca confía en montos del cliente.
export async function POST(req) {
  const body = await req.json().catch(() => null);
  const parsed = cotizacionSchema.safeParse(body?.datos);
  if (!parsed.success || !FOLIO.test(body?.folio ?? "")) {
    return Response.json({ error: "Datos inválidos" }, { status: 422 });
  }

  const estimacion = estimar(parsed.data, { mostrarMontos: process.env.MOSTRAR_MONTOS === "true" });
  const pdf = await renderToBuffer(
    <PrePropuesta folio={body.folio} datos={parsed.data} estimacion={estimacion} />
  );

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="pre-propuesta-${body.folio}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
