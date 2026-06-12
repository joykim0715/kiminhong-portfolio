"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PRIMARY = { r: 95, g: 168, b: 163 };
    const SECONDARY = { r: 111, g: 174, b: 217 };

    let tick = 0;
    let raf: number;

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.38;
      const maxR = Math.min(canvas.width, canvas.height) * 0.55;

      for (let i = 0; i < 6; i++) {
        const phase = (tick * 0.004 + i * (1 / 6)) % 1;
        const radius = phase * maxR;
        const alpha = (1 - phase) * (1 - phase) * 0.28;

        const c = i % 2 === 0 ? PRIMARY : SECONDARY;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.45);
      const breathe = 0.14 + Math.sin(tick * 0.008) * 0.05;
      coreGlow.addColorStop(0, `rgba(${PRIMARY.r},${PRIMARY.g},${PRIMARY.b},${breathe})`);
      coreGlow.addColorStop(0.5, `rgba(${SECONDARY.r},${SECONDARY.g},${SECONDARY.b},${breathe * 0.45})`);
      coreGlow.addColorStop(1, `rgba(${PRIMARY.r},${PRIMARY.g},${PRIMARY.b},0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-soft-light"
    />
  );
}
