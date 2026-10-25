"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789◆+/-";

/**
 * Texto que se "descifra" letra por letra al montarse o cuando cambia `text`
 * (inspirado en DecryptedText de React Bits). Pensado para etiquetas cortas en mono.
 */
export default function ScrambleText({ text, duration = 600, className }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const fixed = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) => (i < fixed || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}
