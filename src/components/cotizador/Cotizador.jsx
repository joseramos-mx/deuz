"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import CTAButton from "@/components/system/CTAButton";
import StepIndicator from "@/components/system/StepIndicator";
import {
  tiposObra,
  getTipo,
  especificaciones,
  etapas,
  terrenos,
  inicios,
  financiamientos,
  rangosInversion,
  estadosMexico,
  UNIDADES,
} from "@/data/cotizador";
import { track } from "@/lib/analytics";
import { Opciones, Campo, Selector, AreaTexto, Error } from "./campos";
import Resultado from "./Resultado";

const FASES = ["El proyecto", "La etapa", "Contacto"];
const STORAGE = "deuz-cotizador-v1";

const VACIO = {
  tipo: "",
  estado: "",
  municipio: "",
  unidad: "",
  magnitud: "",
  viviendas: "",
  m2Promedio: "",
  descripcion: "",
  especificacion: "",
  etapa: "",
  terreno: "",
  inicio: "",
  financiamiento: "",
  inversion: "",
  nombre: "",
  empresa: "",
  cargo: "",
  whatsapp: "",
  correo: "",
  privacidad: false,
};

const REQ = "Campo obligatorio";

function validar(fase, d) {
  const e = {};
  if (fase === 0) {
    if (!d.tipo) e.tipo = "Elige el tipo de obra";
    if (!d.estado) e.estado = REQ;
    if (d.municipio.trim().length < 2) e.municipio = REQ;
    const tipo = getTipo(d.tipo);
    if (tipo?.magnitud === "unidades" && !(+d.magnitud > 0)) e.magnitud = "Indica una cantidad mayor a 0";
    if (tipo?.magnitud === "viviendas") {
      if (!(+d.viviendas > 0)) e.viviendas = "Indica el número de viviendas";
      if (!(+d.m2Promedio > 0)) e.m2Promedio = "Indica los m² promedio";
    }
    if (tipo?.magnitud === "libre" && !d.descripcion.trim()) e.descripcion = "Cuéntanos qué necesitas";
    if (tipo && tipo.magnitud !== "libre" && !d.especificacion) e.especificacion = "Elige un nivel";
  }
  if (fase === 1) {
    for (const k of ["etapa", "terreno", "inicio", "financiamiento", "inversion"]) if (!d[k]) e[k] = "Elige una opción";
  }
  if (fase === 2) {
    if (d.nombre.trim().length < 2) e.nombre = REQ;
    if (!d.empresa.trim()) e.empresa = REQ;
    if (d.cargo.trim().length < 2) e.cargo = REQ;
    if (!/^\+?[\d\s()-]{10,20}$/.test(d.whatsapp.trim())) e.whatsapp = "Escribe un número de 10 dígitos";
    if (!/^\S+@\S+\.\S+$/.test(d.correo.trim())) e.correo = "Correo inválido";
    if (!d.privacidad) e.privacidad = "Debes aceptar el aviso de privacidad";
  }
  return e;
}

const CAMPOS_FASE = [
  ["tipo", "estado", "municipio", "unidad", "magnitud", "viviendas", "m2Promedio", "descripcion", "especificacion"],
  ["etapa", "terreno", "inicio", "financiamiento", "inversion"],
  ["nombre", "empresa", "cargo", "whatsapp", "correo", "privacidad"],
];

function payload(d, origen) {
  const tipo = getTipo(d.tipo);
  const num = (v) => (v === "" ? undefined : Number(v));
  return {
    ...d,
    origen,
    especificacion: d.especificacion || "estandar",
    unidad: tipo.magnitud === "unidades" ? d.unidad : undefined,
    magnitud: tipo.magnitud === "unidades" ? num(d.magnitud) : undefined,
    viviendas: tipo.magnitud === "viviendas" ? num(d.viviendas) : undefined,
    m2Promedio: tipo.magnitud === "viviendas" ? num(d.m2Promedio) : undefined,
    descripcion: d.descripcion || undefined,
  };
}

/**
 * Cotizador en 3 fases con pre-propuesta y folio.
 * `tipoInicial` lo prellena (páginas de solución); `origen` se envía al CRM.
 */
export default function Cotizador({ tipoInicial = "", origen = "cotizador" }) {
  const [d, setD] = useState(() => ({ ...VACIO, tipo: tipoInicial, unidad: getTipo(tipoInicial)?.unidades?.[0] ?? "" }));
  const [fase, setFase] = useState(0);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [resultado, setResultado] = useState(null);
  const iniciado = useRef(false);
  const raiz = useRef(null);
  const cargado = useRef(false);

  // Retomar progreso guardado (no aplica si la página prellena otro tipo)
  useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(STORAGE) ?? "null");
      if (guardado && (!tipoInicial || guardado.d.tipo === tipoInicial)) {
        setD({ ...VACIO, ...guardado.d });
        setFase(Math.min(guardado.fase ?? 0, 2));
      }
    } catch {}
    cargado.current = true;
  }, [tipoInicial]);

  useEffect(() => {
    if (!cargado.current || resultado) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ d: { ...d, privacidad: false }, fase }));
    } catch {}
  }, [d, fase, resultado]);

  const set = (k) => (v) => {
    if (!iniciado.current) {
      iniciado.current = true;
      track("cotizador_inicio", { origen });
    }
    setD((prev) => {
      const next = { ...prev, [k]: v };
      if (k === "tipo") {
        const t = getTipo(v);
        next.unidad = t.unidades?.[0] ?? "";
        if (t.magnitud === "libre") next.especificacion = "";
      }
      return next;
    });
    setErrores((e) => ({ ...e, [k]: undefined }));
  };
  const setInput = (k) => (e) => set(k)(e.target.type === "checkbox" ? e.target.checked : e.target.value);

  const irA = (f) => {
    setFase(f);
    raiz.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const siguiente = () => {
    const e = validar(fase, d);
    setErrores(e);
    if (Object.keys(e).length) return;
    track(`cotizador_fase_${fase + 1}`, { tipo: d.tipo });
    irA(fase + 1);
  };

  const enviar = async (ev) => {
    ev.preventDefault();
    const e = validar(2, d);
    setErrores(e);
    if (Object.keys(e).length) return;

    setEnviando(true);
    setErrorEnvio("");
    try {
      const datos = payload(d, origen);
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (res.status === 422 && json.campos) {
        const campos = Object.fromEntries(Object.entries(json.campos).map(([k, v]) => [k, v[0]]));
        setErrores(campos);
        const f = CAMPOS_FASE.findIndex((cs) => cs.some((c) => campos[c]));
        if (f >= 0) irA(f);
        return;
      }
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      track("cotizador_completado", { tipo: d.tipo, folio: json.folio });
      try {
        localStorage.removeItem(STORAGE);
      } catch {}
      setResultado({ ...json, datos });
      raiz.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error(err);
      setErrorEnvio("No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  if (resultado) return <div ref={raiz} className="scroll-mt-24"><Resultado {...resultado} /></div>;

  const tipo = getTipo(d.tipo);

  return (
    <div ref={raiz} className="scroll-mt-24 border border-deuz-line bg-deuz-bg">
      <div className="flex items-center justify-between gap-4 border-b border-deuz-line px-5 py-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-deuz-muted">
          Fase {fase + 1} de 3 · <span className="text-deuz-text">{FASES[fase]}</span>
        </p>
        <StepIndicator count={3} active={fase} tone="red" labels={FASES} />
      </div>

      <form onSubmit={enviar} noValidate className="space-y-10 px-5 py-8 md:px-8 md:py-10">
        {fase === 0 && (
          <>
            <Opciones
              name="tipo"
              legend="¿Qué vas a construir?"
              opciones={tiposObra}
              value={d.tipo}
              onChange={set("tipo")}
              error={errores.tipo}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Selector
                id="estado"
                label="Estado"
                placeholder="Selecciona"
                opciones={estadosMexico}
                value={d.estado}
                onChange={setInput("estado")}
                error={errores.estado}
              />
              <Campo
                id="municipio"
                label="Municipio"
                autoComplete="address-level2"
                value={d.municipio}
                onChange={setInput("municipio")}
                error={errores.municipio}
              />
            </div>

            {tipo?.magnitud === "unidades" && (
              <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                <Campo
                  id="magnitud"
                  label={`Magnitud aproximada (${UNIDADES[d.unidad] ?? ""})`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={d.magnitud}
                  onChange={setInput("magnitud")}
                  error={errores.magnitud}
                  hint={d.unidad === "m2" ? "Metros cuadrados de construcción" : undefined}
                />
                {tipo.unidades.length > 1 && (
                  <Opciones
                    name="unidad"
                    legend="Unidad"
                    opciones={tipo.unidades.map((u) => ({ id: u, label: UNIDADES[u] }))}
                    value={d.unidad}
                    onChange={set("unidad")}
                    cols="grid-cols-2"
                  />
                )}
              </div>
            )}

            {tipo?.magnitud === "viviendas" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo
                  id="viviendas"
                  label="Número de viviendas"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={d.viviendas}
                  onChange={setInput("viviendas")}
                  error={errores.viviendas}
                />
                <Campo
                  id="m2Promedio"
                  label="m² promedio por vivienda"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  value={d.m2Promedio}
                  onChange={setInput("m2Promedio")}
                  error={errores.m2Promedio}
                />
              </div>
            )}

            {tipo?.magnitud === "libre" && (
              <AreaTexto
                id="descripcion"
                label="Describe lo que necesitas"
                placeholder="Materiales, volúmenes, periodo, destino…"
                value={d.descripcion}
                onChange={setInput("descripcion")}
                error={errores.descripcion}
              />
            )}

            {tipo && tipo.magnitud !== "libre" && (
              <Opciones
                name="especificacion"
                legend="Nivel de especificación"
                opciones={especificaciones}
                value={d.especificacion}
                onChange={set("especificacion")}
                cols="sm:grid-cols-3"
                error={errores.especificacion}
              />
            )}
          </>
        )}

        {fase === 1 && (
          <>
            <Opciones name="etapa" legend="¿En qué etapa está el proyecto?" opciones={etapas} value={d.etapa} onChange={set("etapa")} cols="grid-cols-2 lg:grid-cols-4" error={errores.etapa} />
            <Opciones name="terreno" legend="¿Cuentas con terreno propio?" opciones={terrenos} value={d.terreno} onChange={set("terreno")} cols="grid-cols-3" error={errores.terreno} />
            <Opciones name="inicio" legend="¿Cuándo quieres iniciar?" opciones={inicios} value={d.inicio} onChange={set("inicio")} cols="grid-cols-2 lg:grid-cols-4" error={errores.inicio} />
            <Opciones name="financiamiento" legend="Financiamiento" opciones={financiamientos} value={d.financiamiento} onChange={set("financiamiento")} cols="grid-cols-2 lg:grid-cols-4" error={errores.financiamiento} />
            <Opciones name="inversion" legend="Rango de inversión previsto" opciones={rangosInversion} value={d.inversion} onChange={set("inversion")} cols="grid-cols-2 lg:grid-cols-5" error={errores.inversion} />
          </>
        )}

        {fase === 2 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Campo id="nombre" label="Nombre" autoComplete="name" value={d.nombre} onChange={setInput("nombre")} error={errores.nombre} />
              <Campo id="empresa" label="Empresa" autoComplete="organization" value={d.empresa} onChange={setInput("empresa")} error={errores.empresa} />
              <Campo id="cargo" label="Cargo" autoComplete="organization-title" value={d.cargo} onChange={setInput("cargo")} error={errores.cargo} />
              <Campo id="whatsapp" label="WhatsApp" type="tel" autoComplete="tel" inputMode="tel" placeholder="618 123 4567" value={d.whatsapp} onChange={setInput("whatsapp")} error={errores.whatsapp} />
              <Campo id="correo" label="Correo" type="email" autoComplete="email" value={d.correo} onChange={setInput("correo")} error={errores.correo} className="sm:col-span-2" />
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-deuz-muted">
                <input
                  type="checkbox"
                  checked={d.privacidad}
                  onChange={setInput("privacidad")}
                  className="mt-0.5 size-4 shrink-0 accent-deuz-red"
                />
                <span>
                  Acepto el{" "}
                  <Link href="/privacidad" target="_blank" className="text-deuz-text underline underline-offset-2">
                    aviso de privacidad
                  </Link>{" "}
                  y que DEUZ me contacte sobre este proyecto.
                </span>
              </label>
              <Error msg={errores.privacidad} />
            </div>
          </>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-deuz-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {fase > 0 ? (
            <button
              type="button"
              onClick={() => irA(fase - 1)}
              className="inline-flex h-11 items-center gap-2 text-sm text-deuz-muted hover:text-white"
            >
              <ArrowLeft className="size-4" /> Anterior
            </button>
          ) : (
            <span className="text-xs text-deuz-dim">Toma menos de 2 minutos.</span>
          )}

          {fase < 2 ? (
            <CTAButton onClick={siguiente}>Continuar</CTAButton>
          ) : (
            <CTAButton type="submit" disabled={enviando} arrow={!enviando} className="disabled:opacity-70">
              {enviando ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generando pre-propuesta
                </>
              ) : (
                "Ver mi pre-propuesta"
              )}
            </CTAButton>
          )}
        </div>
        <Error msg={errorEnvio} />
      </form>
    </div>
  );
}
