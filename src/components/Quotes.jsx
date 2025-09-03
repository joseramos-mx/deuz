"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Buildings, Factory, House, Lightning, RoadHorizon, Tree, Truck, Wrench, Crane } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// --- Opciones y tarifas base por m² (ejemplo) ---
const OBRA_OPTS = [
  { id: "urb", label: "Urbanización y terracerías", icon: Tree, rate: 450 },
  { id: "obra", label: "Obra pública y privada", icon: Buildings, rate: 680 },
  { id: "energia", label: "Energía y electrificación", icon: Lightning, rate: 720 },
  { id: "pav", label: "Concretos y asfaltos", icon: RoadHorizon, rate: 520 },
  { id: "mat", label: "Materiales y suministros ind.", icon: Wrench, rate: 300 },
  { id: "vivienda", label: "Casas habitación", icon: House, rate: 580 },
  { id: "vertical", label: "Edificación vertical", icon: Crane, rate: 790 },
  { id: "naves", label: "Naves industriales", icon: Factory, rate: 740 },
  { id: "logistica", label: "Logística / maquinaria", icon: Truck, rate: 260 },
];

const NIVEL_OPTS = [
  { id: "basic", label: "Básico", mult: 1.0 },
  { id: "standard", label: "Estándar", mult: 1.15 },
  { id: "premium", label: "Premium", mult: 1.35 },
];

function currency(n) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

export default function QuoteWizard() {
  const [step, setStep] = useState(1); // 1..6
  const [obra, setObra] = useState(OBRA_OPTS[0].id);
  const [area, setArea] = useState(500); // m2
  const [nivel, setNivel] = useState("standard");
  const [ubicacion, setUbicacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const obraInfo = OBRA_OPTS.find((o) => o.id === obra) || null;
  const nivelInfo = NIVEL_OPTS.find((n) => n.id === nivel) || null;
  

  // Cálculo simple: rate base * m² * multiplicador nivel
  const estimate = useMemo(() => {
    const base = obraInfo.rate * area;
    const total = Math.round(base * nivelInfo.mult);
    return { base, total };
  }, [obraInfo, area, nivelInfo]);

  const pct = Math.round(((step - 1) / 5) * 100); // barra de progreso (5 pasos antes de contacto)

  function next() {
    setStep((s) => Math.min(6, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <section id="cotizador" className="relative bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {/* Encabezado */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-neutral-500">Cotizador</p>
            <h2 className="mt-1 text-3xl md:text-4xl font-black text-neutral-900">
              Solicita tu <span className="italic font-medium">cotización</span>
              <span className="text-red-600">.</span>
            </h2>
          </div>
          <div className="hidden w-44 shrink-0 md:block">
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-right text-xs text-neutral-500">Paso {step} de 6</p>
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          {/* Paso 1 */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">1) ¿Qué tipo de obra quieres cotizar?</h3>
              <p className="mt-1 text-sm text-neutral-600">Selecciona una opción.</p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {OBRA_OPTS.map((o) => {
                  const Icon = o.icon;
                  const active = obra === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setObra(o.id)}
                      className={`group relative flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                        active ? "border-red-600 bg-red-50" : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <span className={`grid size-10 place-items-center rounded-lg ${active ? "bg-red-600 text-white" : "bg-neutral-100 text-neutral-700"}`}>
                        <Icon size={22} weight="duotone" />
                      </span>
                      <span className="text-sm font-medium text-neutral-900 leading-snug">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Paso 2 */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">2) ¿Cuál es la superficie estimada?</h3>
              <p className="mt-1 text-sm text-neutral-600">Indica los metros cuadrados aproximados.</p>

              <div className="mt-8">
                <Label htmlFor="area" className="text-neutral-700">Superficie (m²)</Label>
                <div className="mt-3">
                  <Slider
                    id="area"
                    defaultValue={[area]}
                    value={[area]}
                    onValueChange={(v) => setArea(v[0])}
                    min={50}
                    max={10000}
                    step={10}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                  <span>50 m²</span>
                  <span className="font-semibold text-neutral-900">{area.toLocaleString()} m²</span>
                  <span>10,000 m²</span>
                </div>
              </div>
            </div>
          )}

          {/* Paso 3 */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">3) Nivel de servicio / acabado</h3>
              <p className="mt-1 text-sm text-neutral-600">Elige el estándar deseado.</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {NIVEL_OPTS.map((n) => {
                  const active = nivel === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => setNivel(n.id)}
                      className={`rounded-xl border p-4 text-center text-sm font-semibold transition ${
                        active ? "border-red-600 bg-red-50 text-red-700" : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      {n.label}
                      <div className="mt-1 text-xs font-normal text-neutral-600">x{n.mult}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Paso 4 */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">4) Ubicación del proyecto</h3>
              <p className="mt-1 text-sm text-neutral-600">Ciudad/Estado o dirección aproximada.</p>

              <div className="mt-6 max-w-xl">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input
                  id="ubicacion"
                  placeholder="Ej. Durango, Dgo."
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Paso 5 */}
          {step === 5 && (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">5) Resumen y estimado</h3>
              <p className="mt-1 text-sm text-neutral-600">Revisa el cálculo aproximado con base en tus selecciones.</p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-neutral-200 p-4">
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <dt className="text-neutral-500">Tipo de obra</dt>
                    <dd className="text-right font-medium text-neutral-900">{obraInfo.label}</dd>
                    <dt className="text-neutral-500">Superficie</dt>
                    <dd className="text-right font-medium text-neutral-900">{area.toLocaleString()} m²</dd>
                    <dt className="text-neutral-500">Nivel</dt>
                    <dd className="text-right font-medium text-neutral-900">{nivelInfo.label}</dd>
                    <dt className="text-neutral-500">Tarifa base</dt>
                    <dd className="text-right font-medium text-neutral-900">{currency(obraInfo.rate)} / m²</dd>
                  </dl>
                </div>

                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="text-sm text-neutral-600">Estimación</div>
                  <div className="mt-2 text-3xl font-black tracking-tight text-neutral-900">{currency(estimate.total)}</div>
                  <div className="mt-1 text-xs text-neutral-500">
                    * Referencia no vinculante. El monto final se determina con visita y levantamiento.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso 6 (Final): datos de contacto) */}
          {step === 6 && (
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">Tus datos de contacto</h3>
              <p className="mt-1 text-sm text-neutral-600">Envíanos tu información y te contactamos con una propuesta formal.</p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:max-w-xl">
                <div>
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="correo">Correo electrónico</Label>
                  <Input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="mt-2" />
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-neutral-200 p-4 text-sm">
                <div className="text-neutral-600">Resumen</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <span className="text-neutral-500">Obra</span>
                  <span className="text-right font-medium">{obraInfo.label}</span>
                  <span className="text-neutral-500">Superficie</span>
                  <span className="text-right font-medium">{area.toLocaleString()} m²</span>
                  <span className="text-neutral-500">Nivel</span>
                  <span className="text-right font-medium">{nivelInfo.label}</span>
                  <span className="text-neutral-500">Ubicación</span>
                  <span className="text-right font-medium">{ubicacion || "—"}</span>
                  <span className="text-neutral-500">Estimado</span>
                  <span className="text-right font-bold text-neutral-900">{currency(estimate.total)}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="rounded-full bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    // Aquí puedes integrar el envío a tu backend / API / email.
                    console.log({ obra, area, nivel, ubicacion, nombre, correo, estimate });
                    alert("¡Gracias! Recibimos tu solicitud. Te contactaremos a la brevedad.");
                  }}
                >
                  Enviar solicitud
                </Button>
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" className="rounded-full" onClick={prev} disabled={step === 1}>
              <ArrowLeft size={16} className="mr-2" /> Anterior
            </Button>

            {step < 6 ? (
              <Button className="rounded-full bg-red-600 hover:bg-red-700" onClick={next}>
                Siguiente <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <div className="text-sm text-neutral-500">Paso final</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
