// Genera src/data/mapa-mx.js a partir de public/mx.json:
// proyecta los estados a trazos SVG ligeros para no descargar el GeoJSON en el cliente.
// Uso: node scripts/generar-mapa.mjs
import { readFile, writeFile } from "node:fs/promises";
import { geoMercator, geoPath } from "d3-geo";

const W = 1000;
const H = 640;
const MIN_DIST = 2.5; // px: descarta puntos más cercanos que esto (simplificación)

const fc = JSON.parse(await readFile(new URL("../public/mx.json", import.meta.url), "utf8"));
const proj = geoMercator().fitSize([W, H], fc);

function ring(coords) {
  const out = [];
  for (const c of coords) {
    const [x, y] = proj(c);
    const last = out[out.length - 1];
    if (!last || Math.hypot(x - last[0], y - last[1]) >= MIN_DIST) out.push([x, y]);
  }
  if (out.length < 3) return "";
  return "M" + out.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z";
}

function toPath(geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  return polys.flatMap((p) => p.map(ring)).join("");
}

const path = geoPath(proj);
const estados = fc.features.map((f) => {
  const [cx, cy] = path.centroid(f);
  return { nombre: f.properties.name, d: toPath(f.geometry), cx: +cx.toFixed(1), cy: +cy.toFixed(1) };
});

const src = `// Archivo generado por scripts/generar-mapa.mjs. No editar a mano.
export const MAPA_VIEWBOX = "0 0 ${W} ${H}";
export const estadosMx = ${JSON.stringify(estados)};
`;
await writeFile(new URL("../src/data/mapa-mx.js", import.meta.url), src);
console.log(`ok · ${estados.length} estados · ${(src.length / 1024).toFixed(0)} KB`);
