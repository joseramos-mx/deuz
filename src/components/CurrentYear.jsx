"use client";

import { useEffect, useState } from "react";

// La página se prerenderiza en el build: `initial` llega del servidor (año del build)
// para que la hidratación coincida, y el efecto lo corrige al año actual.
export default function CurrentYear({ initial }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
