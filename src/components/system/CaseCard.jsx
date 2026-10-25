import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SpotlightCard from "./SpotlightCard";

const UNIDADES = { m2: "m²", km: "km", kVA: "kVA", viviendas: "viviendas" };

const SEGMENTOS = {
  vivienda: "Vivienda",
  industrial: "Industrial",
  infraestructura: "Infraestructura",
  energia: "Energía",
};

const fmt = new Intl.NumberFormat("es-MX");

/**
 * Tarjeta de proyecto con métricas. Recibe un `Proyecto` (DESIGN.md §5.2);
 * los campos opcionales que falten simplemente no se muestran.
 */
export default function CaseCard({ proyecto, href, priority = false, className }) {
  const {
    titulo,
    segmento,
    etiquetas = [],
    estado,
    municipio,
    anio,
    magnitud,
    plazoComprometidoSemanas,
    plazoRealSemanas,
    rangoInversion,
    imagenes = [],
  } = proyecto;

  const metricas = [
    (municipio || estado) && { k: "Ubicación", v: [municipio, estado].filter(Boolean).join(", ") },
    anio && { k: "Año", v: anio },
    magnitud && { k: "Magnitud", v: `${fmt.format(magnitud.valor)} ${UNIDADES[magnitud.unidad] ?? magnitud.unidad}` },
    plazoComprometidoSemanas && {
      k: "Plazo",
      v: plazoRealSemanas
        ? `${plazoRealSemanas} / ${plazoComprometidoSemanas} sem`
        : `${plazoComprometidoSemanas} sem`,
    },
    rangoInversion && { k: "Inversión", v: rangoInversion },
  ].filter(Boolean);

  const tags = [SEGMENTOS[segmento], ...etiquetas].filter(Boolean);

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-deuz-elev-2">
        {imagenes[0] && (
          <Image
            src={imagenes[0]}
            alt={titulo}
            fill
            priority={priority}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover grayscale-[35%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        )}
        {tags.length > 0 && (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li
                key={t}
                className="bg-deuz-bg/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <h3 className="flex items-start justify-between gap-4 text-lg font-medium leading-snug text-deuz-text">
          {titulo}
          {href && (
            <ArrowUpRight
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-deuz-muted transition group-hover:text-deuz-red"
            />
          )}
        </h3>

        {metricas.length > 0 && (
          <dl className="mt-auto grid grid-cols-2 gap-px border border-deuz-line bg-deuz-line">
            {metricas.map((m) => (
              <div key={m.k} className="bg-deuz-elev p-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-dim">{m.k}</dt>
                <dd className="mt-1 text-sm text-deuz-text">{m.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </>
  );

  const classes = cn(
    "group flex h-full flex-col border border-deuz-line bg-deuz-elev transition-colors duration-200 hover:border-deuz-line-strong",
    className
  );

  return href ? (
    <SpotlightCard
      href={href}
      className={cn(classes, "focus-visible:outline-2 focus-visible:outline-deuz-red")}
    >
      {body}
    </SpotlightCard>
  ) : (
    <SpotlightCard as="article" className={classes}>
      {body}
    </SpotlightCard>
  );
}
