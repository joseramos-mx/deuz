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
          <Kpi value="+30"      top="Años de"                      bold="experiencia" />
          <Kpi value="+7,000"   top="Proyectos"                    bold="entregados" />
          <Kpi value="+130"     top="de máquinas especializadas"   bold="propias" />
          <Kpi value="+150"  top="ferreteras"                  bold="abastecidas" />
        </div>
      </div>
    </section>
  );
}
