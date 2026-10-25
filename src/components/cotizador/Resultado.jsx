"use client";

import { useState } from "react";
import { CalendarCheck, Check, Download, Loader2, MessageCircle, X } from "lucide-react";
import CaseCard from "@/components/system/CaseCard";
import RedBlock from "@/components/system/RedBlock";
import { alcance, siguientesPasos, getTipo, VALIDEZ_DIAS } from "@/data/cotizador";
import { getProyecto } from "@/data/proyectos";
import { fmtMXN, fmtMagnitud } from "@/lib/formato";
import { CAL_URL, whatsappUrl } from "@/lib/canales";
import { track } from "@/lib/analytics";

const btn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[2px] px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Resultado({ folio, estimacion, similares, leyenda, datos }) {
  const [agenda, setAgenda] = useState(false);
  const [pdf, setPdf] = useState("idle"); // idle | cargando | error
  const tipo = getTipo(datos.tipo);
  const wa = whatsappUrl(
    `Hola, soy ${datos.nombre} de ${datos.empresa}. Acabo de cotizar en el sitio con el folio ${folio} (${tipo.label} en ${datos.municipio}, ${datos.estado}) y me gustaría hablar con un director.`
  );
  const proyectos = similares.map(getProyecto).filter(Boolean);

  const descargar = async () => {
    setPdf("cargando");
    try {
      const res = await fetch("/api/pre-propuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folio, datos }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const url = URL.createObjectURL(await res.blob());
      const a = Object.assign(document.createElement("a"), { href: url, download: `pre-propuesta-${folio}.pdf` });
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      track("pdf_descargado", { folio });
      setPdf("idle");
    } catch (err) {
      console.error(err);
      setPdf("error");
    }
  };

  return (
    <div className="animate-deuz-fade-up space-y-px border border-deuz-line bg-deuz-line">
      <RedBlock cut="tr" className="md:p-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
          Pre-propuesta · Folio <span className="text-white">{folio}</span>
        </p>
        <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          {datos.nombre.split(" ")[0]}, tu proyecto ya está en manos de un ingeniero.
        </h2>
        <p className="mt-4 max-w-2xl text-white/90">
          Te contactaremos en menos de 24 h. Mientras tanto, esta es la estimación preliminar de tu proyecto de{" "}
          {tipo.label.toLowerCase()} en {datos.municipio}, {datos.estado}.
        </p>
      </RedBlock>

      <div className="grid gap-px sm:grid-cols-3">
        <Cifra
          k="Rango estimado"
          v={estimacion.montos ? `${fmtMXN(estimacion.montos.min)} a ${fmtMXN(estimacion.montos.max)}` : "Se define en visita técnica"}
          destacado={!!estimacion.montos}
        />
        <Cifra
          k="Plazo estimado"
          v={estimacion.plazo ? `${estimacion.plazo.min} a ${estimacion.plazo.max} semanas` : "Se define en visita técnica"}
          destacado={!!estimacion.plazo}
        />
        <Cifra k="Magnitud" v={fmtMagnitud(estimacion.magnitud) ?? "Según descripción"} />
      </div>

      <div className="grid gap-px md:grid-cols-2">
        <Lista titulo="Qué incluye" items={alcance.incluye} icono={<Check className="size-4 text-deuz-red" />} />
        <Lista titulo="Qué no incluye" items={alcance.noIncluye} icono={<X className="size-4 text-deuz-dim" />} />
      </div>

      {/* Acciones */}
      <div className="bg-deuz-bg p-6 md:p-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {CAL_URL && (
            <button
              type="button"
              onClick={() => {
                setAgenda((v) => !v);
                if (!agenda) track("visita_agendada", { folio });
              }}
              aria-expanded={agenda}
              className={`${btn} bg-deuz-red text-white hover:bg-deuz-red-dark`}
            >
              <CalendarCheck className="size-4" /> Agendar visita técnica
            </button>
          )}
          <button
            type="button"
            onClick={descargar}
            disabled={pdf === "cargando"}
            className={`${btn} border border-white/80 text-white hover:bg-white hover:text-deuz-bg disabled:opacity-60`}
          >
            {pdf === "cargando" ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Descargar pre-propuesta PDF
          </button>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { folio, origen: "resultado" })}
              className={`${btn} border border-white/80 text-white hover:bg-white hover:text-deuz-bg`}
            >
              <MessageCircle className="size-4" /> Hablar por WhatsApp con un director
            </a>
          )}
        </div>
        {pdf === "error" && (
          <p role="alert" className="mt-3 text-xs text-[#FF6B6B]">
            No se pudo generar el PDF. Inténtalo de nuevo en unos segundos.
          </p>
        )}
        {agenda && CAL_URL && (
          <iframe
            src={`${CAL_URL}${CAL_URL.includes("?") ? "&" : "?"}embed=true&name=${encodeURIComponent(datos.nombre)}&email=${encodeURIComponent(datos.correo)}&notes=${encodeURIComponent(`Folio ${folio}`)}`}
            title="Agendar visita técnica"
            className="mt-6 h-[640px] w-full border border-deuz-line bg-white"
          />
        )}
      </div>

      {proyectos.length > 0 && (
        <div className="bg-deuz-bg p-6 md:p-8">
          <h3 className="text-xl font-medium text-deuz-text">Proyectos similares que ya entregamos</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {proyectos.map((p) => (
              <CaseCard key={p.slug} proyecto={p} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-deuz-bg p-6 md:p-8">
        <h3 className="text-xl font-medium text-deuz-text">Siguientes pasos</h3>
        <ol className="mt-6 grid gap-px border border-deuz-line bg-deuz-line sm:grid-cols-4">
          {siguientesPasos.map((p, i) => (
            <li key={p.paso} className="bg-deuz-bg p-4">
              <span className="font-mono text-xs text-deuz-red">0{i + 1}</span>
              <p className="mt-3 text-sm text-deuz-text">{p.paso}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-dim">{p.plazo}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-relaxed text-deuz-dim">
          {leyenda} Vigencia de {VALIDEZ_DIAS} días.
        </p>
      </div>
    </div>
  );
}

function Cifra({ k, v, destacado }) {
  return (
    <div className="bg-deuz-bg p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-deuz-dim">{k}</p>
      <p className={`mt-3 text-xl font-medium md:text-2xl ${destacado ? "text-deuz-text" : "text-deuz-muted"}`}>{v}</p>
    </div>
  );
}

function Lista({ titulo, items, icono }) {
  return (
    <div className="bg-deuz-bg p-6 md:p-8">
      <h3 className="font-medium text-deuz-text">{titulo}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-sm text-deuz-muted">
            <span aria-hidden className="mt-0.5">{icono}</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
