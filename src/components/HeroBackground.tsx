"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";
import styles from "./HeroBackground.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  layer: 0 | 1;
  colorIndex: number;
};

const PARTICLE_RGB = [
  [95, 168, 163],
  [111, 174, 217],
  [107, 131, 144],
] as const;

function particleCount(width: number) {
  if (width < 480) return 12;
  if (width < 1024) return 18;
  return 24;
}

function createParticles(width: number, height: number): Particle[] {
  const count = particleCount(width);
  return Array.from({ length: count }, () => {
    const layer = Math.random() > 0.55 ? 1 : 0;
    const speed = layer === 0 ? 0.012 + Math.random() * 0.018 : 0.006 + Math.random() * 0.01;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: layer === 0 ? 0.6 + Math.random() * 1.1 : 1 + Math.random() * 1.6,
      opacity: layer === 0 ? 0.12 + Math.random() * 0.14 : 0.08 + Math.random() * 0.1,
      layer: layer as 0 | 1,
      colorIndex: Math.floor(Math.random() * PARTICLE_RGB.length),
    };
  });
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;

        const [r, g, b] = PARTICLE_RGB[p.colorIndex];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={styles.heroBg} aria-hidden="true">
      <div className={styles.base} />
      <div className={styles.grid} />
      <div className={styles.gridSecondary} />
      <canvas ref={canvasRef} className={styles.particles} />
      <div className={styles.overlay} />
    </div>
  );
}
