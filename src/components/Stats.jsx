"use client";

function Kpi({ value, top, bold }) {
  return (
    <div className="text-center">
      <div className="text-[34px] sm:text-[40px] md:text-[44px] leading-none font-sans tracking-tight text-neutral-900">
        {value}
      </div>
      <div className="mt-2 text-sm sm:text-base leading-tight text-neutral-600">
        {top}
        <br />
        <span className="font-extrabold text-neutral-900">{bold}</span>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    
    <section className="relative bg-white h-[300px] pt-[100px]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
          <Kpi value="+1k"    top="Proyectos"                     bold="entregados" />
          <Kpi value="+100"   top="Clientes"                      bold="satisfechos" />
          <Kpi value="+300km" top="de construcción"               bold="finalizados" />
          <Kpi value="+4000m²" top="Construidos"                  bold="excelente" />
        </div>
      </div>
    </section>
  );
}
