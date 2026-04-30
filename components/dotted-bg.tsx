"use client";

import { useEffect, useRef } from "react";

/**
 * Background ambient: malla de puntos en negro que se ondula con sine
 * waves lentas. Da textura sin competir con el contenido. Respeta
 * prefers-reduced-motion (queda estática) y pausa cuando la tab oculta.
 */
export default function DottedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let raf = 0;
    let time = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Reset transform por si dpr cambia
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function draw() {
      if (!ctx) return;
      // Fondo opaco — sustituye al body bg, así controlamos todo desde el canvas
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      const isMobile = width < 768;
      const spacing = isMobile ? 28 : 22;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const offsetX = (width % spacing) / 2 - spacing;
      const offsetY = (height % spacing) / 2 - spacing;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * spacing + offsetX;
          const baseY = j * spacing + offsetY;

          // Doble onda sinusoidal: una por columna y otra por fila,
          // desfasadas. Crea la sensación de tela en movimiento.
          const wave =
            Math.sin(i * 0.18 + time) * 6 +
            Math.sin(j * 0.13 + time * 0.7) * 5;

          const x = baseX;
          const y = baseY + wave;

          // Fade radial desde el centro: el contenido respira sin competir
          const dx = (x - width / 2) / width;
          const dy = (y - height / 2) / height;
          const dist = Math.hypot(dx, dy);
          const fade = Math.max(0, 1 - dist * 1.3);

          // Acento lime cada N dots (evita uniformidad blanca)
          const isLime = (i * 7 + j * 11) % 73 === 0;

          ctx.beginPath();
          ctx.arc(x, y, isLime ? 1.4 : 1, 0, Math.PI * 2);

          if (isLime) {
            ctx.fillStyle = `rgba(132, 204, 22, ${0.55 * fade})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.18 * fade})`;
          }
          ctx.fill();
        }
      }
    }

    function tick() {
      // Avanzamos el tiempo solo si no hay preferencia de reduce motion.
      // Aun así dibujamos para mostrar el patrón estático.
      if (!reduceMotion) {
        time += 0.008;
      }
      // Throttle a ~30fps para ahorrar batería en móvil
      frame = (frame + 1) % 2;
      if (frame === 0 || reduceMotion) {
        draw();
      }
      raf = requestAnimationFrame(tick);
    }

    function onResize() {
      resize();
      draw();
    }
    function onVis() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(tick);
      }
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
