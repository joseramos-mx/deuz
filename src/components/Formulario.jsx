"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Download, Loader2 } from "lucide-react";
import CTAButton from "@/components/system/CTAButton";
import { Campo, Selector, AreaTexto, Error } from "@/components/cotizador/campos";
import { track } from "@/lib/analytics";

/**
 * Formulario simple que envía a /api/formulario.
 * campos: [{ id, label, type?, opciones?, multiline?, opcional?, ancho?: "full" }]
 */
export default function Formulario({ origen, campos, enviar = "Enviar", exito, evento }) {
  const inicial = Object.fromEntries(campos.map((c) => [c.id, ""]));
  const [d, setD] = useState({ ...inicial, privacidad: false });
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error
  const [dossierUrl, setDossierUrl] = useState(null);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setD((p) => ({ ...p, [k]: v }));
    setErrores((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    for (const c of campos) if (!c.opcional && !String(d[c.id]).trim()) e[c.id] = "Campo obligatorio";
    if (!d.privacidad) e.privacidad = "Debes aceptar el aviso de privacidad";
    setErrores(e);
    if (Object.keys(e).length) return;

    setEstado("enviando");
    try {
      const datos = Object.fromEntries(Object.entries(d).filter(([, v]) => v !== ""));
      const res = await fetch("/api/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origen, datos }),
      });
      const json = await res.json();
      if (res.status === 422 && json.campos) {
        setErrores(Object.fromEntries(Object.entries(json.campos).map(([k, v]) => [k, v[0]])));
        setEstado("idle");
        return;
      }
      if (!res.ok) throw new Error(json.error);
      if (evento) track(evento, { origen });
      setDossierUrl(json.dossierUrl);
      setEstado("ok");
    } catch (err) {
      console.error(err);
      setEstado("error");
    }
  };

  if (estado === "ok") {
    return (
      <div role="status" className="animate-deuz-fade-up border border-deuz-line bg-deuz-elev p-6 md:p-8">
        <Check className="size-6 text-deuz-red" />
        <p className="mt-4 text-xl font-medium text-deuz-text">{exito.titulo}</p>
        <p className="mt-2 text-deuz-muted">{dossierUrl ? exito.conArchivo ?? exito.texto : exito.texto}</p>
        {dossierUrl && (
          <CTAButton href={dossierUrl} className="mt-6" arrow={false} download>
            <Download className="size-4" /> Descargar dossier
          </CTAButton>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 border border-deuz-line bg-deuz-bg p-5 sm:grid-cols-2 md:p-8">
      {campos.map((c) => {
        const props = {
          id: c.id,
          label: c.opcional ? `${c.label} (opcional)` : c.label,
          value: d[c.id],
          onChange: set(c.id),
          error: errores[c.id],
          className: c.ancho === "full" || c.multiline ? "sm:col-span-2" : undefined,
        };
        if (c.opciones) return <Selector key={c.id} {...props} opciones={c.opciones} placeholder="Selecciona" />;
        if (c.multiline) return <AreaTexto key={c.id} {...props} />;
        return <Campo key={c.id} {...props} type={c.type ?? "text"} autoComplete={c.autoComplete} />;
      })}

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-deuz-muted">
          <input type="checkbox" checked={d.privacidad} onChange={set("privacidad")} className="mt-0.5 size-4 shrink-0 accent-deuz-red" />
          <span>
            Acepto el{" "}
            <Link href="/privacidad" target="_blank" className="text-deuz-text underline underline-offset-2">
              aviso de privacidad
            </Link>
            .
          </span>
        </label>
        <Error msg={errores.privacidad} />
      </div>

      <div className="sm:col-span-2">
        <CTAButton type="submit" disabled={estado === "enviando"} arrow={estado !== "enviando"} className="disabled:opacity-70">
          {estado === "enviando" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Enviando
            </>
          ) : (
            enviar
          )}
        </CTAButton>
        {estado === "error" && <Error msg="No pudimos enviar el formulario. Inténtalo de nuevo." />}
      </div>
    </form>
  );
}
