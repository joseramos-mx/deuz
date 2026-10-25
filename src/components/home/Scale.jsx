import Image from "next/image";
import Marquee from "react-fast-marquee";
import { StatBar, container } from "@/components/system";
import { stats, clientes } from "@/data/empresa";

export default function Scale() {
  return (
    <section aria-label="Escala" className="relative border-t border-deuz-line bg-deuz-bg py-16 md:py-20">
      <div className={container}>
        <StatBar items={stats} />
      </div>

      {clientes.length > 0 && (
        <div className="mt-16">
          <div className={container}>
            <h2 className="text-sm text-deuz-muted">Han confiado en nosotros</h2>
          </div>
          <Marquee autoFill speed={30} pauseOnHover gradient gradientColor="#0A0A0A" className="mt-8">
            {clientes.map((c) => (
              <div key={c.nombre} className="relative mx-8 h-12 w-36">
                <Image
                  src={c.logo}
                  alt={c.nombre}
                  fill
                  sizes="144px"
                  className="object-contain opacity-60 grayscale invert transition hover:opacity-100"
                />
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
