import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "DEUZ Grupo Empresarial · Obras llave en mano que trascienden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CELL = 60;
const LINE = "rgba(255,255,255,0.08)";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#0A0A0A" }}>
        {/* Retícula */}
        {Array.from({ length: Math.ceil(size.width / CELL) }, (_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: i * CELL, width: 1, background: LINE }} />
        ))}
        {Array.from({ length: Math.ceil(size.height / CELL) }, (_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: i * CELL, height: 1, background: LINE }} />
        ))}

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse no admite next/image */}
        <img src={logoSrc} width={160} height={60} style={{ position: "absolute", top: 60, left: 60 }} alt="" />

        <div
          style={{
            position: "absolute",
            top: 78,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#A3A3A3",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          <div style={{ width: 12, height: 12, background: "#E50914", transform: "rotate(45deg)" }} />
          GRUPO EMPRESARIAL · DURANGO, MX
        </div>

        {/* Bloque rojo */}
        <div
          style={{
            position: "absolute",
            left: 60,
            bottom: 60,
            width: 780,
            display: "flex",
            flexDirection: "column",
            padding: "44px 48px",
            background: "#E50914",
            color: "#FFFFFF",
          }}
        >
          <div style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2 }}>
            Obras llave en mano que trascienden.
          </div>
          <div style={{ marginTop: 24, fontSize: 24, letterSpacing: 3, opacity: 0.9 }}>
            INFRAESTRUCTURA · INDUSTRIA · VIVIENDA · ENERGÍA
          </div>
        </div>
      </div>
    ),
    size
  );
}
