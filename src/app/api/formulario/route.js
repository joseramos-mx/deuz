import { NextResponse } from "next/server";
import { esquemas } from "@/lib/formularios";

export const runtime = "nodejs";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const esquema = esquemas[body?.origen];
  if (!esquema) return NextResponse.json({ error: "Formulario desconocido" }, { status: 400 });

  const parsed = esquema.safeParse(body.datos);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", campos: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origen: body.origen, fecha: new Date().toISOString(), datos: parsed.data }),
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`Webhook HTTP ${res.status}`);
    } catch (err) {
      console.error(`[formulario:${body.origen}] webhook falló`, err);
    }
  } else {
    console.warn(`[formulario:${body.origen}] LEAD_WEBHOOK_URL no configurada`);
  }

  // El dossier se entrega en cuanto se registra el lead (si ya hay archivo publicado).
  const dossierUrl = body.origen === "dossier" ? process.env.NEXT_PUBLIC_DOSSIER_URL || null : null;
  return NextResponse.json({ ok: true, dossierUrl });
}
